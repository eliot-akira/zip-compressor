import { test, is, run } from 'testra'
import type * as ZipCompressorType from './'

declare var window: {
  ZipCompressor: typeof ZipCompressorType
}

const { ZipCompressor } = window
const { collectBytes, decodeZip, decodeRemoteZip, encodeZip } = ZipCompressor

console.log('ZipCompressor', ZipCompressor)

test('decodeRemoteZip', async () => {
  // const zipBytes = await readFile(__dirname + '/../docs/hello-dolly.zip')
  // const zipStream = decodeZip(new Blob([zipBytes]).stream())

  const zipStream = await decodeRemoteZip('hello-dolly.zip')

  const files = []
  for await (const file of zipStream) {
    files.push(file)
  }
  is(3, files.length, `total ${files.length} files`)

  let i = 0
  for (const [name, size] of [
    ['hello-dolly/'],
    ['hello-dolly/hello.php', 2593],
    ['hello-dolly/readme.txt', 624],
  ]) {
    is(name, files[i].name, `name: ${name}`)
    if (size) {
      is(size, files[i].size, `size: ${size}`)
    }
    i++
  }
})

test('encodeZip', async () => {
  const files: File[] = [
    new File([new Uint8Array([1, 2, 3, 4, 5])], 'wp-content/plugins/hello.php'),
    new File(
      [new Uint8Array([1, 2, 3, 4, 5])],
      'wp-content/plugins/hello/hello.php',
    ),
    new File(
      [new Uint8Array([1, 2, 3, 4, 5])],
      'wp-content/plugins/hello/hello2.php',
    ),
    new File(
      [new Uint8Array([1, 2, 3, 4, 5])],
      'wp-content/plugins/hello/hello3.php',
    ),
  ]

  const zipBytes = await collectBytes(encodeZip(files[Symbol.iterator]()))
  const zipStream = decodeZip(new Blob([zipBytes!]).stream())

  const reader = zipStream.getReader()
  let i = 0
  for (i = 0; i < files.length; i++) {
    const { value: receivedFile, done } = await reader.read()
    const receivedBytes = new Uint8Array(await receivedFile!.arrayBuffer())
    const expectedBytes = new Uint8Array(await files[i].arrayBuffer())
    is(expectedBytes, receivedBytes, files[i].name)
    is(false, done, 'not done')
  }
  is(files.length, i, `total ${files.length} files`)

  const { done } = await reader.read()
  is(true, done, 'done')
})

run()
