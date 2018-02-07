//
//  RNDownloader.m
//  MapKeep
//
//  Created by Sergey Kryutsin on 2/7/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "RNDownloader.h"

@implementation RNDownloader

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}
RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(getJson: (NSString *) url resolver: (RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  NSURLSession *session = [NSURLSession sessionWithConfiguration:[NSURLSessionConfiguration defaultSessionConfiguration]];
  NSURLSessionDataTask *dataTask = [session dataTaskWithURL:[NSURL URLWithString:url] completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {
    if (error || !data) {
      reject(@"data_fetching", @"Can't fetch data", error);
      return;
    }
    NSDictionary *json = [NSJSONSerialization JSONObjectWithData:data options:0 error:nil];
    if (![json objectForKey:@"locations"]) {
      reject(@"data_fetching", @"No 'locations' field", nil);
      return;
    }
    if (![json objectForKey:@"updated"]) {
      reject(@"data_fetching", @"No 'updated' field", nil);
      return;
    }
    resolve(json);
  }];
  [dataTask resume];
}
@end
