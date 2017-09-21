//
//  RTNMap.h
//  native_app
//
//  Created by Joseph Monge on 8/17/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTViewManager.h>
#import <ZXingObjC/ZXingObjC.h>

@interface RNTMapManager : RCTViewManager

@property (nonatomic, strong) ZXCapture *capture;

- (void)startSession;
- (void)stopSession;

@end
