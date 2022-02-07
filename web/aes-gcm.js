
var Module = (() => {
  var _scriptDir = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : undefined;
  if (typeof __filename !== 'undefined') _scriptDir = _scriptDir || __filename;
  return (
function(Module) {
  Module = Module || {};

var Module=typeof Module!=="undefined"?Module:{};var objAssign=Object.assign;var readyPromiseResolve,readyPromiseReject;Module["ready"]=new Promise(function(resolve,reject){readyPromiseResolve=resolve;readyPromiseReject=reject});var moduleOverrides=objAssign({},Module);var arguments_=[];var thisProgram="./this.program";var quit_=(status,toThrow)=>{throw toThrow};var ENVIRONMENT_IS_WEB=typeof window==="object";var ENVIRONMENT_IS_WORKER=typeof importScripts==="function";var ENVIRONMENT_IS_NODE=typeof process==="object"&&typeof process.versions==="object"&&typeof process.versions.node==="string";var scriptDirectory="";function locateFile(path){if(Module["locateFile"]){return Module["locateFile"](path,scriptDirectory)}return scriptDirectory+path}var read_,readAsync,readBinary,setWindowTitle;function logExceptionOnExit(e){if(e instanceof ExitStatus)return;let toLog=e;err("exiting due to exception: "+toLog)}var fs;var nodePath;var requireNodeFS;if(ENVIRONMENT_IS_NODE){if(ENVIRONMENT_IS_WORKER){scriptDirectory=require("path").dirname(scriptDirectory)+"/"}else{scriptDirectory=__dirname+"/"}requireNodeFS=function(){if(!nodePath){fs=require("fs");nodePath=require("path")}};read_=function shell_read(filename,binary){var ret=tryParseAsDataURI(filename);if(ret){return binary?ret:ret.toString()}requireNodeFS();filename=nodePath["normalize"](filename);return fs.readFileSync(filename,binary?null:"utf8")};readBinary=function readBinary(filename){var ret=read_(filename,true);if(!ret.buffer){ret=new Uint8Array(ret)}return ret};readAsync=function readAsync(filename,onload,onerror){var ret=tryParseAsDataURI(filename);if(ret){onload(ret)}requireNodeFS();filename=nodePath["normalize"](filename);fs.readFile(filename,function(err,data){if(err)onerror(err);else onload(data.buffer)})};if(process["argv"].length>1){thisProgram=process["argv"][1].replace(/\\/g,"/")}arguments_=process["argv"].slice(2);process["on"]("uncaughtException",function(ex){if(!(ex instanceof ExitStatus)){throw ex}});process["on"]("unhandledRejection",function(reason){throw reason});quit_=((status,toThrow)=>{if(keepRuntimeAlive()){process["exitCode"]=status;throw toThrow}logExceptionOnExit(toThrow);process["exit"](status)});Module["inspect"]=function(){return"[Emscripten Module object]"}}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WORKER){scriptDirectory=self.location.href}else if(typeof document!=="undefined"&&document.currentScript){scriptDirectory=document.currentScript.src}if(_scriptDir){scriptDirectory=_scriptDir}if(scriptDirectory.indexOf("blob:")!==0){scriptDirectory=scriptDirectory.substr(0,scriptDirectory.replace(/[?#].*/,"").lastIndexOf("/")+1)}else{scriptDirectory=""}{read_=function(url){try{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.send(null);return xhr.responseText}catch(err){var data=tryParseAsDataURI(url);if(data){return intArrayToString(data)}throw err}};if(ENVIRONMENT_IS_WORKER){readBinary=function(url){try{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}catch(err){var data=tryParseAsDataURI(url);if(data){return data}throw err}}}readAsync=function(url,onload,onerror){var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=function(){if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response);return}var data=tryParseAsDataURI(url);if(data){onload(data.buffer);return}onerror()};xhr.onerror=onerror;xhr.send(null)}}setWindowTitle=(title=>document.title=title)}else{}var out=Module["print"]||console.log.bind(console);var err=Module["printErr"]||console.warn.bind(console);objAssign(Module,moduleOverrides);moduleOverrides=null;if(Module["arguments"])arguments_=Module["arguments"];if(Module["thisProgram"])thisProgram=Module["thisProgram"];if(Module["quit"])quit_=Module["quit"];var wasmBinary;if(Module["wasmBinary"])wasmBinary=Module["wasmBinary"];var noExitRuntime=Module["noExitRuntime"]||true;if(typeof WebAssembly!=="object"){abort("no native wasm support detected")}var wasmMemory;var ABORT=false;var EXITSTATUS;function assert(condition,text){if(!condition){abort(text)}}function getCFunc(ident){var func=Module["_"+ident];return func}function ccall(ident,returnType,argTypes,args,opts){var toC={"string":function(str){var ret=0;if(str!==null&&str!==undefined&&str!==0){var len=(str.length<<2)+1;ret=stackAlloc(len);stringToUTF8(str,ret,len)}return ret},"array":function(arr){var ret=stackAlloc(arr.length);writeArrayToMemory(arr,ret);return ret}};function convertReturnValue(ret){if(returnType==="string")return UTF8ToString(ret);if(returnType==="boolean")return Boolean(ret);return ret}var func=getCFunc(ident);var cArgs=[];var stack=0;if(args){for(var i=0;i<args.length;i++){var converter=toC[argTypes[i]];if(converter){if(stack===0)stack=stackSave();cArgs[i]=converter(args[i])}else{cArgs[i]=args[i]}}}var ret=func.apply(null,cArgs);function onDone(ret){if(stack!==0)stackRestore(stack);return convertReturnValue(ret)}ret=onDone(ret);return ret}function cwrap(ident,returnType,argTypes,opts){argTypes=argTypes||[];var numericArgs=argTypes.every(function(type){return type==="number"});var numericRet=returnType!=="string";if(numericRet&&numericArgs&&!opts){return getCFunc(ident)}return function(){return ccall(ident,returnType,argTypes,arguments,opts)}}var UTF8Decoder=typeof TextDecoder!=="undefined"?new TextDecoder("utf8"):undefined;function UTF8ArrayToString(heap,idx,maxBytesToRead){var endIdx=idx+maxBytesToRead;var endPtr=idx;while(heap[endPtr]&&!(endPtr>=endIdx))++endPtr;if(endPtr-idx>16&&heap.subarray&&UTF8Decoder){return UTF8Decoder.decode(heap.subarray(idx,endPtr))}else{var str="";while(idx<endPtr){var u0=heap[idx++];if(!(u0&128)){str+=String.fromCharCode(u0);continue}var u1=heap[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}var u2=heap[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u0=(u0&7)<<18|u1<<12|u2<<6|heap[idx++]&63}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}}return str}function UTF8ToString(ptr,maxBytesToRead){return ptr?UTF8ArrayToString(HEAPU8,ptr,maxBytesToRead):""}function stringToUTF8Array(str,heap,outIdx,maxBytesToWrite){if(!(maxBytesToWrite>0))return 0;var startIdx=outIdx;var endIdx=outIdx+maxBytesToWrite-1;for(var i=0;i<str.length;++i){var u=str.charCodeAt(i);if(u>=55296&&u<=57343){var u1=str.charCodeAt(++i);u=65536+((u&1023)<<10)|u1&1023}if(u<=127){if(outIdx>=endIdx)break;heap[outIdx++]=u}else if(u<=2047){if(outIdx+1>=endIdx)break;heap[outIdx++]=192|u>>6;heap[outIdx++]=128|u&63}else if(u<=65535){if(outIdx+2>=endIdx)break;heap[outIdx++]=224|u>>12;heap[outIdx++]=128|u>>6&63;heap[outIdx++]=128|u&63}else{if(outIdx+3>=endIdx)break;heap[outIdx++]=240|u>>18;heap[outIdx++]=128|u>>12&63;heap[outIdx++]=128|u>>6&63;heap[outIdx++]=128|u&63}}heap[outIdx]=0;return outIdx-startIdx}function stringToUTF8(str,outPtr,maxBytesToWrite){return stringToUTF8Array(str,HEAPU8,outPtr,maxBytesToWrite)}function writeArrayToMemory(array,buffer){HEAP8.set(array,buffer)}function alignUp(x,multiple){if(x%multiple>0){x+=multiple-x%multiple}return x}var buffer,HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateGlobalBufferAndViews(buf){buffer=buf;Module["HEAP8"]=HEAP8=new Int8Array(buf);Module["HEAP16"]=HEAP16=new Int16Array(buf);Module["HEAP32"]=HEAP32=new Int32Array(buf);Module["HEAPU8"]=HEAPU8=new Uint8Array(buf);Module["HEAPU16"]=HEAPU16=new Uint16Array(buf);Module["HEAPU32"]=HEAPU32=new Uint32Array(buf);Module["HEAPF32"]=HEAPF32=new Float32Array(buf);Module["HEAPF64"]=HEAPF64=new Float64Array(buf)}var INITIAL_MEMORY=Module["INITIAL_MEMORY"]||16777216;var wasmTable;var __ATPRERUN__=[];var __ATINIT__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;var runtimeKeepaliveCounter=0;function keepRuntimeAlive(){return noExitRuntime||runtimeKeepaliveCounter>0}function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function initRuntime(){runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__)}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}function addOnInit(cb){__ATINIT__.unshift(cb)}function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}}function removeRunDependency(id){runDependencies--;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}Module["preloadedImages"]={};Module["preloadedAudios"]={};function abort(what){{if(Module["onAbort"]){Module["onAbort"](what)}}what="Aborted("+what+")";err(what);ABORT=true;EXITSTATUS=1;what+=". Build with -s ASSERTIONS=1 for more info.";var e=new WebAssembly.RuntimeError(what);readyPromiseReject(e);throw e}var dataURIPrefix="data:application/octet-stream;base64,";function isDataURI(filename){return filename.startsWith(dataURIPrefix)}function isFileURI(filename){return filename.startsWith("file://")}var wasmBinaryFile;wasmBinaryFile="data:application/octet-stream;base64,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";if(!isDataURI(wasmBinaryFile)){wasmBinaryFile=locateFile(wasmBinaryFile)}function getBinary(file){try{if(file==wasmBinaryFile&&wasmBinary){return new Uint8Array(wasmBinary)}var binary=tryParseAsDataURI(file);if(binary){return binary}if(readBinary){return readBinary(file)}else{throw"both async and sync fetching of the wasm failed"}}catch(err){abort(err)}}function getBinaryPromise(){if(!wasmBinary&&(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER)){if(typeof fetch==="function"&&!isFileURI(wasmBinaryFile)){return fetch(wasmBinaryFile,{credentials:"same-origin"}).then(function(response){if(!response["ok"]){throw"failed to load wasm binary file at '"+wasmBinaryFile+"'"}return response["arrayBuffer"]()}).catch(function(){return getBinary(wasmBinaryFile)})}else{if(readAsync){return new Promise(function(resolve,reject){readAsync(wasmBinaryFile,function(response){resolve(new Uint8Array(response))},reject)})}}}return Promise.resolve().then(function(){return getBinary(wasmBinaryFile)})}function createWasm(){var info={"a":asmLibraryArg};function receiveInstance(instance,module){var exports=instance.exports;Module["asm"]=exports;wasmMemory=Module["asm"]["c"];updateGlobalBufferAndViews(wasmMemory.buffer);wasmTable=Module["asm"]["j"];addOnInit(Module["asm"]["d"]);removeRunDependency("wasm-instantiate")}addRunDependency("wasm-instantiate");function receiveInstantiationResult(result){receiveInstance(result["instance"])}function instantiateArrayBuffer(receiver){return getBinaryPromise().then(function(binary){return WebAssembly.instantiate(binary,info)}).then(function(instance){return instance}).then(receiver,function(reason){err("failed to asynchronously prepare wasm: "+reason);abort(reason)})}function instantiateAsync(){if(!wasmBinary&&typeof WebAssembly.instantiateStreaming==="function"&&!isDataURI(wasmBinaryFile)&&!isFileURI(wasmBinaryFile)&&typeof fetch==="function"){return fetch(wasmBinaryFile,{credentials:"same-origin"}).then(function(response){var result=WebAssembly.instantiateStreaming(response,info);return result.then(receiveInstantiationResult,function(reason){err("wasm streaming compile failed: "+reason);err("falling back to ArrayBuffer instantiation");return instantiateArrayBuffer(receiveInstantiationResult)})})}else{return instantiateArrayBuffer(receiveInstantiationResult)}}if(Module["instantiateWasm"]){try{var exports=Module["instantiateWasm"](info,receiveInstance);return exports}catch(e){err("Module.instantiateWasm callback failed with error: "+e);return false}}instantiateAsync().catch(readyPromiseReject);return{}}function callRuntimeCallbacks(callbacks){while(callbacks.length>0){var callback=callbacks.shift();if(typeof callback=="function"){callback(Module);continue}var func=callback.func;if(typeof func==="number"){if(callback.arg===undefined){getWasmTableEntry(func)()}else{getWasmTableEntry(func)(callback.arg)}}else{func(callback.arg===undefined?null:callback.arg)}}}var wasmTableMirror=[];function getWasmTableEntry(funcPtr){var func=wasmTableMirror[funcPtr];if(!func){if(funcPtr>=wasmTableMirror.length)wasmTableMirror.length=funcPtr+1;wasmTableMirror[funcPtr]=func=wasmTable.get(funcPtr)}return func}function _emscripten_memcpy_big(dest,src,num){HEAPU8.copyWithin(dest,src,src+num)}function emscripten_realloc_buffer(size){try{wasmMemory.grow(size-buffer.byteLength+65535>>>16);updateGlobalBufferAndViews(wasmMemory.buffer);return 1}catch(e){}}function _emscripten_resize_heap(requestedSize){var oldSize=HEAPU8.length;requestedSize=requestedSize>>>0;var maxHeapSize=2147483648;if(requestedSize>maxHeapSize){return false}for(var cutDown=1;cutDown<=4;cutDown*=2){var overGrownHeapSize=oldSize*(1+.2/cutDown);overGrownHeapSize=Math.min(overGrownHeapSize,requestedSize+100663296);var newSize=Math.min(maxHeapSize,alignUp(Math.max(requestedSize,overGrownHeapSize),65536));var replacement=emscripten_realloc_buffer(newSize);if(replacement){return true}}return false}var ASSERTIONS=false;function intArrayToString(array){var ret=[];for(var i=0;i<array.length;i++){var chr=array[i];if(chr>255){if(ASSERTIONS){assert(false,"Character code "+chr+" ("+String.fromCharCode(chr)+")  at offset "+i+" not in 0x00-0xFF.")}chr&=255}ret.push(String.fromCharCode(chr))}return ret.join("")}var decodeBase64=typeof atob==="function"?atob:function(input){var keyStr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";var output="";var chr1,chr2,chr3;var enc1,enc2,enc3,enc4;var i=0;input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");do{enc1=keyStr.indexOf(input.charAt(i++));enc2=keyStr.indexOf(input.charAt(i++));enc3=keyStr.indexOf(input.charAt(i++));enc4=keyStr.indexOf(input.charAt(i++));chr1=enc1<<2|enc2>>4;chr2=(enc2&15)<<4|enc3>>2;chr3=(enc3&3)<<6|enc4;output=output+String.fromCharCode(chr1);if(enc3!==64){output=output+String.fromCharCode(chr2)}if(enc4!==64){output=output+String.fromCharCode(chr3)}}while(i<input.length);return output};function intArrayFromBase64(s){if(typeof ENVIRONMENT_IS_NODE==="boolean"&&ENVIRONMENT_IS_NODE){var buf=Buffer.from(s,"base64");return new Uint8Array(buf["buffer"],buf["byteOffset"],buf["byteLength"])}try{var decoded=decodeBase64(s);var bytes=new Uint8Array(decoded.length);for(var i=0;i<decoded.length;++i){bytes[i]=decoded.charCodeAt(i)}return bytes}catch(_){throw new Error("Converting base64 string to bytes failed.")}}function tryParseAsDataURI(filename){if(!isDataURI(filename)){return}return intArrayFromBase64(filename.slice(dataURIPrefix.length))}var asmLibraryArg={"b":_emscripten_memcpy_big,"a":_emscripten_resize_heap};var asm=createWasm();var ___wasm_call_ctors=Module["___wasm_call_ctors"]=function(){return(___wasm_call_ctors=Module["___wasm_call_ctors"]=Module["asm"]["d"]).apply(null,arguments)};var _test_gcm_crypt_and_tag=Module["_test_gcm_crypt_and_tag"]=function(){return(_test_gcm_crypt_and_tag=Module["_test_gcm_crypt_and_tag"]=Module["asm"]["e"]).apply(null,arguments)};var _create_ctx=Module["_create_ctx"]=function(){return(_create_ctx=Module["_create_ctx"]=Module["asm"]["f"]).apply(null,arguments)};var _create=Module["_create"]=function(){return(_create=Module["_create"]=Module["asm"]["g"]).apply(null,arguments)};var _update=Module["_update"]=function(){return(_update=Module["_update"]=Module["asm"]["h"]).apply(null,arguments)};var _final=Module["_final"]=function(){return(_final=Module["_final"]=Module["asm"]["i"]).apply(null,arguments)};var stackSave=Module["stackSave"]=function(){return(stackSave=Module["stackSave"]=Module["asm"]["k"]).apply(null,arguments)};var stackRestore=Module["stackRestore"]=function(){return(stackRestore=Module["stackRestore"]=Module["asm"]["l"]).apply(null,arguments)};var stackAlloc=Module["stackAlloc"]=function(){return(stackAlloc=Module["stackAlloc"]=Module["asm"]["m"]).apply(null,arguments)};var _malloc=Module["_malloc"]=function(){return(_malloc=Module["_malloc"]=Module["asm"]["n"]).apply(null,arguments)};var _free=Module["_free"]=function(){return(_free=Module["_free"]=Module["asm"]["o"]).apply(null,arguments)};Module["ccall"]=ccall;Module["cwrap"]=cwrap;var calledRun;function ExitStatus(status){this.name="ExitStatus";this.message="Program terminated with exit("+status+")";this.status=status}dependenciesFulfilled=function runCaller(){if(!calledRun)run();if(!calledRun)dependenciesFulfilled=runCaller};function run(args){args=args||arguments_;if(runDependencies>0){return}preRun();if(runDependencies>0){return}function doRun(){if(calledRun)return;calledRun=true;Module["calledRun"]=true;if(ABORT)return;initRuntime();readyPromiseResolve(Module);if(Module["onRuntimeInitialized"])Module["onRuntimeInitialized"]();postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout(function(){setTimeout(function(){Module["setStatus"]("")},1);doRun()},1)}else{doRun()}}Module["run"]=run;if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}run();


  return Module.ready
}
);
})();
if (typeof exports === 'object' && typeof module === 'object')
  module.exports = Module;
else if (typeof define === 'function' && define['amd'])
  define([], function() { return Module; });
else if (typeof exports === 'object')
  exports["Module"] = Module;
