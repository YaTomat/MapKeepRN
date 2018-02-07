package com.mapkeep.downloader.data;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.List;

public class LocationResponse {
    @SerializedName("locations")
    @Expose
    public List<Location> locations = null;
    @SerializedName("updated")
    @Expose
    public String updated;
}
