Pod::Spec.new do |s|
    s.name         = "react-native-hgs-auth"
    s.version      = "0.1.0"
    s.summary      = "Microsoft OAuth2 authentication with PKCE for React Native"
    s.license      = "MIT"
    s.author       = { "Your Name" => "your@email.com" }
    s.platform     = :ios, "12.0"
    s.source       = { :git => "https://github.com/your/repo.git", :tag => "#{s.version}" }
    s.source_files = "ios/**/*.{h,m,mm}"
    s.requires_arc = true
    s.dependency "React"
end
