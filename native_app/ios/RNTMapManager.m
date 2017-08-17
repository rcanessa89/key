//
//  RNTMapManager.m
//  native_app
//
//  Created by Jorge Valverde on 8/17/17.
//  Copyright © 2017 Facebook. All rights reserved.
//
// RNTMapManager.m
#import <MapKit/MapKit.h>

#import <React/RCTViewManager.h>

@interface RNTMapManager : RCTViewManager
@end

@implementation RNTMapManager

RCT_EXPORT_MODULE()

- (UIView *)view
{

  return [[MKMapView alloc] init ];
}

@end
