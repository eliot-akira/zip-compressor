"use strict";(()=>{var v=Object.defineProperty;var q=(e,r)=>{for(var t in r)v(e,t,{get:r[t],enumerable:!0})};var I={};q(I,{StreamedFile:()=>U,collectBytes:()=>c,collectFile:()=>L,decodeRemoteZip:()=>O,decodeZip:()=>p,encodeZip:()=>P,iteratorToStream:()=>D});function b(...e){let r=new Uint8Array(e.reduce((n,a)=>n+a.length,0)),t=0;for(let n of e)r.set(n,t),t+=n.length;return r}function w(e){if(e===void 0){let r=new Uint8Array;return new TransformStream({transform(t){r=b(r,t)},flush(t){t.enqueue(r)}})}else{let r=new ArrayBuffer(e||0),t=0;return new TransformStream({transform(n){new Uint8Array(r).set(n,t),t+=n.byteLength},flush(n){n.enqueue(new Uint8Array(r))}})}}function S(e,r){if(r===0)return new ReadableStream({start(a){a.close()}});let t=e.getReader({mode:"byob"}),n=0;return new ReadableStream({async pull(a){let{value:i,done:o}=await t.read(new Uint8Array(r-n));if(o){t.releaseLock(),a.close();return}n+=i.length,a.enqueue(i),n>=r&&(t.releaseLock(),a.close())},cancel(){t.cancel()}})}async function c(e,r){return r!==void 0&&(e=S(e,r)),await e.pipeThrough(w(r)).getReader().read().then(({value:t})=>t)}async function L(e,r){return new File([await c(r)],e)}function D(e){if(e instanceof ReadableStream)return e;let r;return Symbol.asyncIterator in e?r=e[Symbol.asyncIterator]():Symbol.iterator in e?r=e[Symbol.iterator]():r=e,new ReadableStream({async pull(t){let{done:n,value:a}=await r.next();if(n){t.close();return}t.enqueue(a)}})}var U=class extends File{constructor(t,n,a){super([],n,{type:a});this.readableStream=t}slice(){throw new Error("slice() is not possible on a StreamedFile")}stream(){return this.readableStream}async text(){return new TextDecoder().decode(await this.arrayBuffer())}async arrayBuffer(){return(await c(this.stream())).buffer}};ReadableStream.prototype[Symbol.asyncIterator]||(ReadableStream.prototype[Symbol.asyncIterator]=async function*(){let e=this.getReader();try{for(;;){let{done:r,value:t}=await e.read();if(r)return;yield t}}finally{e.releaseLock()}},ReadableStream.prototype.iterate=ReadableStream.prototype[Symbol.asyncIterator]);function h(e){return new TransformStream({transform(r,t){e(r)&&t.enqueue(r)}})}function _(e){let r=!1;return new TransformStream({async transform(t,n){r||(r=!0,n.enqueue(e)),n.enqueue(t)}})}function F(e){return new TransformStream({async transform(r,t){t.enqueue(r)},async flush(r){r.enqueue(e)}})}function p(e,r){return z(e,r).pipeThrough(new TransformStream({async transform(t,n){let a=new File([t.bytes],new TextDecoder().decode(t.path),{type:t.isDirectory?"directory":void 0});n.enqueue(a)}}))}var Z=()=>!0;function z(e,r=Z){return new ReadableStream({async pull(n){let a=await H(e);if(!a){n.close();return}n.enqueue(a)}}).pipeThrough(h(({signature:n})=>n===67324752)).pipeThrough(h(r))}async function H(e){let t=new DataView((await c(e,4)).buffer).getUint32(0,!0);return t===67324752?await T(e,!0):t===33639248?await x(e,!0):t===101010256?await G(e,!0):null}async function T(e,r=!1){if(!r&&new DataView((await c(e,4)).buffer).getUint32(0,!0)!==67324752)return null;let t=new DataView((await c(e,26)).buffer),n=t.getUint16(22,!0),a=t.getUint16(24,!0),i={signature:67324752,version:t.getUint32(0,!0),generalPurpose:t.getUint16(2,!0),compressionMethod:t.getUint16(4,!0),lastModifiedTime:t.getUint16(6,!0),lastModifiedDate:t.getUint16(8,!0),crc:t.getUint32(10,!0),compressedSize:t.getUint32(14,!0),uncompressedSize:t.getUint32(18,!0)};i.path=await c(e,n),i.isDirectory=B(i.path),i.extra=await c(e,a);let o=S(e,i.compressedSize);if(i.compressionMethod===8){let s=new Uint8Array(10);s.set([31,139,8]);let l=new Uint8Array(8),u=new DataView(l.buffer);u.setUint32(0,i.crc,!0),u.setUint32(4,i.uncompressedSize%2**32,!0),o=o.pipeThrough(_(s)).pipeThrough(F(l)).pipeThrough(new DecompressionStream("gzip"))}return i.bytes=await o.pipeThrough(w(i.uncompressedSize)).getReader().read().then(({value:s})=>s),i}async function x(e,r=!1){if(!r&&new DataView((await c(e,4)).buffer).getUint32(0,!0)!==33639248)return null;let t=new DataView((await c(e,42)).buffer),n=t.getUint16(24,!0),a=t.getUint16(26,!0),i=t.getUint16(28,!0),o={signature:33639248,versionCreated:t.getUint16(0,!0),versionNeeded:t.getUint16(2,!0),generalPurpose:t.getUint16(4,!0),compressionMethod:t.getUint16(6,!0),lastModifiedTime:t.getUint16(8,!0),lastModifiedDate:t.getUint16(10,!0),crc:t.getUint32(12,!0),compressedSize:t.getUint32(16,!0),uncompressedSize:t.getUint32(20,!0),diskNumber:t.getUint16(30,!0),internalAttributes:t.getUint16(32,!0),externalAttributes:t.getUint32(34,!0),firstByteAt:t.getUint32(38,!0)};return o.lastByteAt=o.firstByteAt+32+n+i+a+o.compressedSize-1,o.path=await c(e,n),o.isDirectory=B(o.path),o.extra=await c(e,a),o.fileComment=await c(e,i),o}function B(e){return e[e.byteLength-1]==47}async function G(e,r=!1){if(!r&&new DataView((await c(e,4)).buffer).getUint32(0,!0)!==101010256)return null;let t=new DataView((await c(e,18)).buffer),n={signature:101010256,numberOfDisks:t.getUint16(0,!0),centralDirectoryStartDisk:t.getUint16(2,!0),numberCentralDirectoryRecordsOnThisDisk:t.getUint16(4,!0),numberCentralDirectoryRecords:t.getUint16(6,!0),centralDirectorySize:t.getUint32(8,!0),centralDirectoryOffset:t.getUint32(12,!0)},a=t.getUint16(16,!0);return n.comment=await c(e,a),n}var E=class{_running=0;concurrency;queue;constructor({concurrency:r}){this.concurrency=r,this.queue=[]}get running(){return this._running}async acquire(){for(;;)if(this._running>=this.concurrency)await new Promise(r=>this.queue.push(r));else{this._running++;let r=!1;return()=>{r||(r=!0,this._running--,this.queue.length>0&&this.queue.shift()())}}}async run(r){let t=await this.acquire();try{return await r()}finally{t()}}};var V=110*1024,Y=10*1024,W=1024*1024*1,$=new E({concurrency:10}),N=()=>!0;async function O(e,r=N){if(r===N){let m=await fetch(e);return p(m.body)}let t=await M(e);if(t<=W){let m=await fetch(e);return p(m.body)}let n=await fetch(e,{headers:{Range:"bytes=0-0","Accept-Encoding":"none"}}),[a,i]=n.body.tee(),o=a.getReader(),{value:s}=await o.read(),{done:l}=await o.read();if(o.releaseLock(),a.cancel(),!(s?.length===1&&l))return p(i);i.cancel();let y=await ee(e,t);return K(y).pipeThrough(h(r)).pipeThrough(J()).pipeThrough(Q(y))}function K(e){let r;return new ReadableStream({async start(){r=await j(e)},async pull(t){let n=await x(r);if(!n){t.close();return}t.enqueue(n)}})}async function j(e){let r=V,t=new Uint8Array,n=e.length;do{n=Math.max(0,n-r);let a=Math.min(n+r-1,e.length-1),i=await c(await e.streamBytes(n,a));t=b(i,t);let o=new DataView(i.buffer);for(let s=o.byteLength-4;s>=0;s--){if(o.getUint32(s,!0)!==101010256)continue;let u=s+12+4;if(t.byteLength<u+4)throw new Error("Central directory not found");let y=o.getUint32(u,!0);if(y<n){let m=await c(await e.streamBytes(y,n-1));t=b(m,t)}else y>n&&(t=t.slice(y-n));return new Blob([t]).stream()}}while(n>=0);throw new Error("Central directory not found")}function J(){let e=0,r=[];return new TransformStream({transform(t,n){t.firstByteAt>e+Y&&(n.enqueue(r),r=[]),e=t.lastByteAt,r.push(t)},flush(t){t.enqueue(r)}})}function Q(e){let r=!1,t=0,n,a=[],i=new WritableStream({write(s,l){s.length&&(++t,X(e,s).then(u=>{a.push([s,u])}).catch(u=>{l.error(u)}).finally(()=>{--t}))},abort(){r=!0,n.close()},async close(){r=!0}});return{readable:new ReadableStream({start(s){n=s},async pull(s){for(;;){if(r&&!a.length&&t===0){s.close();return}if(!a.length){await new Promise(R=>setTimeout(R,50));continue}let[y,m]=a[0],A=await T(m);if(!A){a.shift();continue}if(y.find(R=>R.path===A.path)){s.enqueue(A);break}}}}),writable:i}}async function X(e,r){let t=await $.acquire();try{let n=r[r.length-1];return await e.streamBytes(r[0].firstByteAt,n.lastByteAt)}finally{t()}}async function M(e){return await fetch(e,{method:"HEAD"}).then(r=>r.headers.get("Content-Length")).then(r=>{if(!r)throw new Error("Content-Length header is missing");let t=parseInt(r,10);if(isNaN(t)||t<0)throw new Error("Content-Length header is invalid");return t})}async function ee(e,r){return r===void 0&&(r=await M(e)),{length:r,streamBytes:async(t,n)=>await fetch(e,{headers:{Range:`bytes=${t}-${n-1}`,"Accept-Encoding":"none"}}).then(a=>a.body)}}function P(e){return D(e).pipeThrough(re())}function re(){let e=new Map,r=0;return new TransformStream({async transform(t,n){let a=new Uint8Array(await t.arrayBuffer()),i=await c(new Blob([a]).stream().pipeThrough(new CompressionStream("gzip"))),o=new DataView(i.buffer).getUint32(i.byteLength-8,!0);i=i.slice(10,i.byteLength-8);let s=new TextEncoder().encode(t.name),l={signature:67324752,version:2,generalPurpose:0,compressionMethod:t.type==="directory"||i.byteLength===0?0:8,lastModifiedTime:0,lastModifiedDate:0,crc:o,compressedSize:i.byteLength,uncompressedSize:a.byteLength,path:s,extra:new Uint8Array(0)};e.set(r,l);let u=ne(l);n.enqueue(u),r+=u.byteLength,n.enqueue(i),r+=i.byteLength},flush(t){let n=r,a=0;for(let[s,l]of e.entries()){let u={...l,signature:33639248,fileComment:new Uint8Array(0),diskNumber:1,internalAttributes:0,externalAttributes:0,firstByteAt:s},y=ae(u,s);t.enqueue(y),a+=y.byteLength}let i={signature:101010256,numberOfDisks:1,centralDirectoryOffset:n,centralDirectorySize:a,centralDirectoryStartDisk:1,numberCentralDirectoryRecordsOnThisDisk:e.size,numberCentralDirectoryRecords:e.size,comment:new Uint8Array(0)},o=ie(i);t.enqueue(o),e.clear()}})}function ne(e){let r=new ArrayBuffer(30+e.path.byteLength+e.extra.byteLength),t=new DataView(r);t.setUint32(0,e.signature,!0),t.setUint16(4,e.version,!0),t.setUint16(6,e.generalPurpose,!0),t.setUint16(8,e.compressionMethod,!0),t.setUint16(10,e.lastModifiedDate,!0),t.setUint16(12,e.lastModifiedTime,!0),t.setUint32(14,e.crc,!0),t.setUint32(18,e.compressedSize,!0),t.setUint32(22,e.uncompressedSize,!0),t.setUint16(26,e.path.byteLength,!0),t.setUint16(28,e.extra.byteLength,!0);let n=new Uint8Array(r);return n.set(e.path,30),n.set(e.extra,30+e.path.byteLength),n}function ae(e,r){let t=new ArrayBuffer(46+e.path.byteLength+e.extra.byteLength),n=new DataView(t);n.setUint32(0,e.signature,!0),n.setUint16(4,e.versionCreated,!0),n.setUint16(6,e.versionNeeded,!0),n.setUint16(8,e.generalPurpose,!0),n.setUint16(10,e.compressionMethod,!0),n.setUint16(12,e.lastModifiedDate,!0),n.setUint16(14,e.lastModifiedTime,!0),n.setUint32(16,e.crc,!0),n.setUint32(20,e.compressedSize,!0),n.setUint32(24,e.uncompressedSize,!0),n.setUint16(28,e.path.byteLength,!0),n.setUint16(30,e.extra.byteLength,!0),n.setUint16(32,e.fileComment.byteLength,!0),n.setUint16(34,e.diskNumber,!0),n.setUint16(36,e.internalAttributes,!0),n.setUint32(38,e.externalAttributes,!0),n.setUint32(42,r,!0);let a=new Uint8Array(t);return a.set(e.path,46),a.set(e.extra,46+e.path.byteLength),a}function ie(e){let r=new ArrayBuffer(22+e.comment.byteLength),t=new DataView(r);t.setUint32(0,e.signature,!0),t.setUint16(4,e.numberOfDisks,!0),t.setUint16(6,e.centralDirectoryStartDisk,!0),t.setUint16(8,e.numberCentralDirectoryRecordsOnThisDisk,!0),t.setUint16(10,e.numberCentralDirectoryRecords,!0),t.setUint32(12,e.centralDirectorySize,!0),t.setUint32(16,e.centralDirectoryOffset,!0),t.setUint16(20,e.comment.byteLength,!0);let n=new Uint8Array(r);return n.set(e.comment,22),n}window.ZipStream=I;})();
//# sourceMappingURL=web.js.map
