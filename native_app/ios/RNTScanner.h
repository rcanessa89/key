//
//  RNTScanner.h
//  native_app
//
//  Created by Joseph Monge on 8/17/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RNTMapManager.h"

@interface RNTScanner : UIView

@property (nonatomic, copy) RCTBubblingEventBlock onScanChange;
- (id)initWithManager:(RNTMapManager*)manager;

@end
