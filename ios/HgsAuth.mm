#import "HgsAuth.h"
#import <UIKit/UIKit.h>

// 👇 Now you can include C++ headers
#include <iostream>
#include <string>

@interface HgsAuth ()
@property (nonatomic, strong) ASWebAuthenticationSession *authSession;
@end

@implementation HgsAuth

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(
  startAuth:(NSString *)clientId
  withRedirectUri:(NSString *)redirectUri
  withScopes:(NSString *)scopes
  withTenant:(NSString *)tenant
  withCodeChallenge:(NSString *)codeChallenge
  withResolver:(RCTPromiseResolveBlock)resolve
  withRejecter:(RCTPromiseRejectBlock)reject
) {
	// 👇 C++ string example
	std::string logMsg = "Starting Microsoft auth flow";
	std::cout << logMsg << std::endl;

	NSString *authUrlString = [NSString stringWithFormat:
		@"https://login.microsoftonline.com/%@/oauth2/v2.0/authorize?client_id=%@&response_type=code&redirect_uri=%@&scope=%@&code_challenge_method=S256&code_challenge=%@&response_mode=query",
		tenant, clientId, redirectUri, scopes, codeChallenge
	];

	NSURL *authURL = [NSURL URLWithString:authUrlString];
	if (!authURL) {
		reject(@"auth_url_error", @"Invalid authorization URL", nil);
		return;
	}

	self.authSession = [[ASWebAuthenticationSession alloc]
		initWithURL:authURL
		callbackURLScheme:redirectUri
		completionHandler:^(NSURL * _Nullable callbackURL, NSError * _Nullable error) {
		if (error) {
			reject(@"auth_error", error.localizedDescription, error);
			return;
		}
		if (!callbackURL) {
			reject(@"auth_callback_error", @"No callback URL", nil);
			return;
		}
		resolve(callbackURL.absoluteString);
		}
	];

	self.authSession.presentationContextProvider = self;
	[self.authSession start];
}

- (ASPresentationAnchor)presentationAnchorForWebAuthenticationSession:(ASWebAuthenticationSession *)session {
  	return [UIApplication sharedApplication].keyWindow;
}

@end
