//
//  RTNMap.m
//  native_app
//
//  Created by Joseph Monge on 8/17/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import "RNTMapManager.h"

#import "RNTScanner.h"
#import "RCTSensorOrientationChecker.h"
#import <MapKit/MapKit.h>


@interface RNTMapManager () <ZXCaptureDelegate>

//@property (nonatomic, strong) RCTEventDispatcher *eventDispatcher;
@property (nonatomic, copy) RCTBubblingEventBlock onScanChange;

@end

@implementation RNTMapManager

- (id)init {
  if ((self = [super init])) {
    self.capture = [[ZXCapture alloc] init];
//    self.eventDispatcher = [RCTEventDispatcher new];
    self.capture.delegate = self;
    self.capture.camera = self.capture.back;
   self.capture.focusMode = AVCaptureFocusModeContinuousAutoFocus;
  }
  return self;
}

RCT_EXPORT_MODULE()
RCT_EXPORT_VIEW_PROPERTY(onScanChange, RCTBubblingEventBlock)

- (UIView *)view {
  RNTScanner *scanner = [[RNTScanner alloc] initWithManager:self];
  scanner.clipsToBounds = YES;

  return scanner;
}


- (void)startSession {
  [self.capture start];
}

- (void)stopSession {
  [self.capture stop];
}

- (NSString *)barcodeFormatToString:(ZXBarcodeFormat)format {
  switch (format) {
    case kBarcodeFormatAztec:
      return @"Aztec";

    case kBarcodeFormatCodabar:
      return @"CODABAR";

    case kBarcodeFormatCode39:
      return @"Code 39";

    case kBarcodeFormatCode93:
      return @"Code 93";

    case kBarcodeFormatCode128:
      return @"Code 128";

    case kBarcodeFormatDataMatrix:
      return @"Data Matrix";

    case kBarcodeFormatEan8:
      return @"EAN-8";

    case kBarcodeFormatEan13:
      return @"EAN-13";

    case kBarcodeFormatITF:
      return @"ITF";

    case kBarcodeFormatPDF417:
      return @"PDF417";

    case kBarcodeFormatQRCode:
      return @"QR Code";

    case kBarcodeFormatRSS14:
      return @"RSS 14";

    case kBarcodeFormatRSSExpanded:
      return @"RSS Expanded";

    case kBarcodeFormatUPCA:
      return @"UPCA";

    case kBarcodeFormatUPCE:
      return @"UPCE";

    case kBarcodeFormatUPCEANExtension:
      return @"UPC/EAN extension";
      
    default:
      return @"Unknown";
  }
}

- (void)captureResult:(ZXCapture *)capture result:(ZXResult *)result {
  if (!result) return;

  NSString *formatString = [self barcodeFormatToString:result.barcodeFormat];
  NSString *display = [NSString stringWithFormat:@"Scanned!\n\nFormat: %@\n\nContents:\n%lu", formatString, (unsigned long)result.text.length];
  NSLog(@"Result: %@", display);


  if (_onScanChange != nil) {
    _onScanChange(@{@"data": result.text});
  }

  // Vibrate
  AudioServicesPlaySystemSound(kSystemSoundID_Vibrate);

  [self.capture stop];

  dispatch_after(dispatch_time(DISPATCH_TIME_NOW, 2 * NSEC_PER_SEC), dispatch_get_main_queue(), ^{
    [self.capture start];
  });
}

@end
