import * as ZipStream from '../src'

const {
  StreamedFile,
  collectBytes,
  collectFile,
  decodeRemoteZip,
  decodeZip,
  encodeZip,
  iteratorToStream
} = ZipStream

console.log('ZipStream', ZipStream)
