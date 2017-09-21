//
//  RNTScanner.m
//  native_app
//
//  Created by Joseph Monge on 8/17/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import "RNTScanner.h"


@interface RNTScanner ()

@property (nonatomic, weak) RNTMapManager *manager;

@end

@implementation RNTScanner

- (id)initWithManager:(RNTMapManager*)manager {
  if ((self = [super init])) {
    self.manager = manager;
//    [self.manager initializeCaptureSessionInput:AVMediaTypeVideo];
    [self.manager startSession];
  }
  return self;
}

- (void)layoutSubviews
{
  //    NSLog(@"layoutSubviews...");

  [super layoutSubviews];
  self.manager.capture.layer.frame = self.bounds;
  self.manager.capture.layer.transform = CATransform3DScale(self.manager.capture.layer.transform, 1.5, 1.5, 1);

  [self setBackgroundColor:[UIColor blackColor]];
  [self.layer insertSublayer:self.manager.capture.layer atIndex:0];
}

- (void)removeFromSuperview
{
  //    NSLog(@"removeFromSuperview...");

  [self.manager stopSession];
  [super removeFromSuperview];
}


@end
