Pod::Spec.new do |s|
  s.name = "HgsAuth"
  s.version = "0.1.7"
  s.summary = "Native Microsoft Auth for React Native"
  s.homepage = "https://github.com/EsaHannilaSymbio/react-native-hgs-auth"
  s.swift_versions = "5.0"
  s.license = { :type => "MIT", :text => "MIT License" }
  s.authors = { "Esa Hannila" => "esa@hannila.fi" }
  s.platform = :ios, "13.0"
  s.source = { :git => "https://github.com/EsaHannilaSymbio/react-native-hgs-auth", :tag => "#{s.version}" }
  s.source_files = "ios/**/*.{h,m,mm,swift}"
  s.requires_arc = true
  s.dependency "React-Core"
  s.dependency "React-Core/Bridge"
  s.dependency "React-RCTBridge"
  s.dependency "React-RCTUtils"
  s.dependency "ReactCommon"
  s.static_framework = true

  s.pod_target_xcconfig = {
    "HEADER_SEARCH_PATHS" => "\"${PODS_ROOT}/Headers/Public/**\" \"${PODS_ROOT}/React-Core/**\""
  }
end
