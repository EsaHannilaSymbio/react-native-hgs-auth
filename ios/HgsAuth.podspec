Pod::Spec.new do |s|
  s.name         = "HgsAuth"
  s.version      = "0.1.2"
  s.summary      = "Native Microsoft Auth for React Native"
  s.homepage     = "https://github.com/EsaHannilaSymbio/react-native-hgs-auth"
  s.license      = "MIT"
  s.authors      = { "Esa Hannila" => "esa@hannila.fi" }
  s.platform     = :ios, "13.0"
  s.source       = { :git => "https://github.com/EsaHannilaSymbio/react-native-hgs-auth", :tag => "#{s.version}" }
  s.source_files = "ios/**/*.{h,m,mm,swift}"
  s.requires_arc = true
  s.dependency   "React-Core"

  s.pod_target_xcconfig = {
    "HEADER_SEARCH_PATHS" => "\"${PODS_ROOT}/Headers/Public/**\" \"${PODS_ROOT}/React-Core/**\""
  }
end
