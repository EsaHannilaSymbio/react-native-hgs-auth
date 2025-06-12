#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <AuthenticationServices/AuthenticationServices.h>

@interface HgsAuth : NSObject <RCTBridgeModule, ASWebAuthenticationPresentationContextProviding>
@end
