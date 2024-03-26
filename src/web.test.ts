import type * as ZipStream from './'

declare var window: {
  ZipStream: typeof ZipStream
}

console.log('ZipStream', window.ZipStream)
