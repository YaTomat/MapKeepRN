package com.mapkeep.downloader;

import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.module.annotations.ReactModule;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonParseException;
import com.mapkeep.downloader.data.Location;
import com.mapkeep.downloader.data.LocationResponse;

import java.io.IOException;
import java.lang.annotation.Annotation;
import java.util.Map;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import okhttp3.ResponseBody;

/**
 * Created by sergey_kryutsin on 2/7/18.
 */

public class DownloadModule extends ReactContextBaseJavaModule {

    private final OkHttpClient client = new OkHttpClient();

    @Override
    public String getName() {
        return "RNDownloader";
    }

    @Override
    public boolean canOverrideExistingModule() {
        return false;
    }

    @Override
    public boolean hasConstants() {
        return false;
    }


    public DownloadModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @ReactMethod
    public void getJson(String uri, final Promise promise) {
        Request request = new Request.Builder()
                .url(uri)
                .build();

        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                Log.e(DownloadModule.class.getSimpleName(), "Client dont get data", e);
                promise.reject(e);
            }

            @Override
            public void onResponse(Call call, final Response response) throws IOException {
                if (!response.isSuccessful()) {
                    promise.reject(Integer.toString(response.code()), response.message());
                }
                Gson gson = new GsonBuilder().create();
                ResponseBody body = response.body();
                String locations = body == null ? null : body.string();
                if (locations != null) {
                    try {
                        LocationResponse locationResponse = gson.fromJson(locations, LocationResponse.class);
                        promise.resolve(mapToMap(locationResponse));
                    } catch (JsonParseException jsonException) {
                        Log.e(DownloadModule.class.getSimpleName(), "Wrong json data type", jsonException);

                        promise.reject("Wrong json data type", jsonException);
                    } catch (Exception exception) {
                        Log.e(DownloadModule.class.getSimpleName(), "Client dont get data", exception);

                        promise.reject(exception);
                    }

                } else {
                    promise.resolve(new Object());
                }
            }

        });
    }

    private static ReadableMap mapToMap(LocationResponse responsePojo) {
        WritableMap mainResult = new WritableNativeMap();
        WritableArray locationsArray = new WritableNativeArray();
        WritableMap locationMap;
        for (Location location : responsePojo.locations) {
            locationMap = new WritableNativeMap();
            locationMap.putString("name", location.name);
            locationMap.putDouble("lat", location.lat);
            locationMap.putDouble("lng", location.lng);
            locationsArray.pushMap(locationMap);
        }
        mainResult.putArray("locations", locationsArray);

        mainResult.putString("updated", responsePojo.updated);

        return mainResult;
    }
}
