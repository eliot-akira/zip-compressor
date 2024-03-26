import * as ZipStream from './index'

declare var window: {
  ZipStream: typeof ZipStream
}

window.ZipStream = ZipStream
