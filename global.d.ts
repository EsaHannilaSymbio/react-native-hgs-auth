// global.d.ts

declare global {
  // Use typeof import(...) to get the actual constructor type
  var Buffer: typeof import('buffer').Buffer
  var crypto: Crypto
  var TextEncoder: {
    prototype: TextEncoder
    new (): TextEncoder
  }
}

export {}
