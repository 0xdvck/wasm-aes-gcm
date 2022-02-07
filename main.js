const Module = require("../emsdk/upstream/emscripten/a.out");

var ppCtx = Module._malloc(4); //defined pointer with sizeof type

var pInput = Module._malloc(5 * 1);
var input = new Uint8Array([72, 101, 108, 108, 111]);
Module['HEAPU8'].set(input, pInput);

var pKey = Module._malloc(32 * 1);
var key = new Uint8Array( [233,110,93,93,62,228,246,166,70,37,231,4,104,78,71,58,49,118,251,194,52,188,111,85,52,189,95,10,34,220,8,201])
Module.HEAPU8.set(key, pKey);


var pIv = Module._malloc(12 * 1);
var iv = new Uint8Array([222, 222, 232, 77, 137, 47, 251, 146, 119, 83, 32, 1])
Module['HEAPU8'].set(iv, pIv);


var resultArray = new Uint8Array(Module['HEAPU8'].buffer, ptr, ptr_size);


function getValue(ptr, type, noSafe) {
  type = type || 'i8';
  if (type.charAt(type.length-1) === '*') type = 'i32';
    switch (type) {
      case 'i1': return HEAP8[((ptr)>>0)];
      case 'i8': return HEAP8[((ptr)>>0)];
      case 'i16': return HEAP16[((ptr)>>1)];
      case 'i32': return HEAP32[((ptr)>>2)];
      case 'i64': return HEAP32[((ptr)>>2)];
      case 'float': return HEAPF32[((ptr)>>2)];
      case 'double': return Number(HEAPF64[((ptr)>>3)]);
      default: abort('invalid type for getValue: ' + type);
    }
  return null;
}

function setValue(ptr, value, type, noSafe) {
  type = type || 'i8';
  if (type.charAt(type.length-1) === '*') type = 'i32';
    switch (type) {
      case 'i1': HEAP8[((ptr)>>0)] = value; break;
      case 'i8': HEAP8[((ptr)>>0)] = value; break;
      case 'i16': HEAP16[((ptr)>>1)] = value; break;
      case 'i32': HEAP32[((ptr)>>2)] = value; break;
      case 'i64': (tempI64 = [value>>>0,(tempDouble=value,(+(Math.abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? ((Math.min((+(Math.floor((tempDouble)/4294967296.0))), 4294967295.0))|0)>>>0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)],HEAP32[((ptr)>>2)] = tempI64[0],HEAP32[(((ptr)+(4))>>2)] = tempI64[1]); break;
      case 'float': HEAPF32[((ptr)>>2)] = value; break;
        
      default: abort('invalid type for setValue: ' + type);
    }
}