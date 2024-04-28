# Zip Compressor

Encode and decode zip files with [CompressionStream](https://developer.mozilla.org/en-US/docs/Web/API/Compression_Streams_API), well-supported natively in browsers and server-side JavaScript engines

**[Documentation - API](https://eliot-akira.github.io/zip-compressor/api) · [Source](https://eliot-akira.github.io/zip-compressor)**

## Changes

This project is based on a fork of [`@php-wasm/stream-compression`](https://github.com/WordPress/wordpress-playground/tree/trunk/packages/php-wasm/stream-compression).

- [ ] Remove polyfills and dependencies
  - [x] `@php-wasm/node-polyfills`
  - [x] `@php-wasm/util`
  - [ ] Replace polyfill of ReadableStream with standalone async iterator - [API](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream#async_iteration), [browser compatibility](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream/ReadableStream#browser_compatibility)

- [x] Refactor as its own library
  - [x] Format
  - [x] Build
  - [x] Test

## How it started

### Cloning a subdirectory of a monorepo into its own repository

```sh
git clone --depth 1 --single-branch --branch trunk https://github.com/WordPress/wordpress-playground zip-compressor

cd zip-compressor
git remote remove origin
git remote add upstream https://github.com/WordPress/wordpress-playground
git branch -m trunk upstream-trunk

git subtree split --prefix=packages/php-wasm/stream-compression/src -b zip-compressor
git checkout zip-compressor

git checkout -b main
```

To keep this fork synced with upstream changes:

```sh
git checkout upstream-trunk
git pull

git subtree split --prefix=packages/php-wasm/stream-compression/src --onto zip-compressor -b zip-compressor

git checkout main
git rebase zip-compressor
```

### Reference

- [git-subtree - Merge subtrees together and split repository into subtrees](https://github.com/apenwarr/git-subtree/blob/master/git-subtree.txt)
