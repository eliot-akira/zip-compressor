import * as ZipCompressor from './index'

declare var window: {
  ZipCompressor: typeof ZipCompressor
}

window.ZipCompressor = ZipCompressor
