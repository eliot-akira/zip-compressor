# Zip Stream

Encode and decode zip files with [CompressionStream](https://developer.mozilla.org/en-US/docs/Web/API/Compression_Streams_API), well-supported natively in browsers and server-side JavaScript engines

[Documentation - API](https://eliot-akira.github.io/zip-stream/api)

This project is based on a fork of [`@php-wasm/stream-compression`](https://github.com/WordPress/wordpress-playground/tree/trunk/packages/php-wasm/stream-compression).

## Changes

- [ ] Remove polyfills and dependencies
  - [x] `@php-wasm/node-polyfills`
  - [x] `@php-wasm/util`
  - [ ] Replace polyfill of ReadableStream with standalone async iterator - [API](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream#async_iteration), [browser compatibility](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream/ReadableStream#browser_compatibility)

- [ ] Refactor as its own library
  - [x] Format
  - [x] Build
  - [ ] Test

## Origin

### Cloning a subdirectory of a monorepo into its own repository

```sh
git clone --depth 1 --single-branch --branch trunk https://github.com/WordPress/wordpress-playground zip-stream

cd zip-stream
git remote remove origin
git remote add upstream https://github.com/WordPress/wordpress-playground
git branch -m trunk upstream-trunk

git subtree split --prefix=packages/php-wasm/stream-compression/src -b zip-stream
git checkout zip-stream

git checkout -b main
```

To keep this fork synced with upstream changes:

```sh
git checkout upstream-trunk
git pull

git subtree split --prefix=packages/php-wasm/stream-compression/src --onto zip-stream -b zip-stream

git checkout main
git rebase zip-stream
```

### Reference

- [git-subtree - Merge subtrees together and split repository into subtrees](https://github.com/apenwarr/git-subtree/blob/master/git-subtree.txt)
