// const ENCRYPT = 1;
// const DECRYPT = 0;

// Module().then((lib) => {
// 	var pCtx = lib._create_ctx();

// 	var pInput = lib._malloc(16 * 1);
// 	var input = new Uint8Array([
// 			72, 101, 108, 108, 111, 87, 111, 114, 108, 100, 70, 114, 111, 109, 90, 80
// 		]); //"HelloWorldFromZP"
// 	lib.HEAPU8.set(input, pInput);

// 	var _pInput = lib._malloc(1 * 1);
// 	var _input = new Uint8Array([67]); //"C"
// 	lib.HEAPU8.set(_input, _pInput);

// 	var pOutput = lib._malloc(256);
// 	var output = new Uint8Array(new Array(256).fill(0));
// 	lib.HEAPU8.set(output, pOutput);

// 	var pKey = lib._malloc(32);
// 	var key = new Uint8Array([
// 		233, 110, 93, 93, 62, 228, 246, 166, 70, 37, 231, 4, 104, 78, 71, 58, 49,
// 		118, 251, 194, 52, 188, 111, 85, 52, 189, 95, 10, 34, 220, 8, 201,
// 	]);
// 	lib.HEAPU8.set(key, pKey);

// 	var pIv = lib._malloc(12 * 1);
// 	var iv = new Uint8Array([
// 		222, 222, 232, 77, 137, 47, 251, 146, 119, 83, 32, 1,
// 	]);
// 	lib.HEAPU8.set(iv, pIv);

// 	var pAdd = lib._malloc(0);
// 	// lib.HEAPU8.set(pAdd, new Uint8Array([]));

// 	var pTag = lib._malloc(16);
// 	var tag = new Uint8Array(new Array(16).fill(0));
// 	lib.HEAPU8.set(tag, pTag);

// 	try {
// 		lib._create(pCtx,ENCRYPT,pKey, 32, pIv, 12, pAdd, 0);
// 		lib._update(pCtx,pKey, 32, 16, pInput, pOutput);
// 		const _cipherView = new Uint8Array(lib.HEAPU8.buffer, pOutput, 16);
// 		const cipher = new Uint8Array(_cipherView);
// 		console.error('cipher1',cipher.reduce((_prev, _cur) => _prev + ' ' + _cur.toString(16),''));

// 		lib.HEAPU8.set(output, pOutput);
// 		lib._update(pCtx,pKey, 32, 1, _pInput, pOutput);
// 		const _cipherView2 = new Uint8Array(lib.HEAPU8.buffer, pOutput, 1);
// 		const cipher2 = new Uint8Array(_cipherView2);
// 		console.error('cipher2',cipher2.reduce((_prev, _cur) => _prev + ' ' + _cur.toString(16),''));

// 		lib._final(pCtx,pKey, 32, pTag, 16);
// 	} catch(e) {
// 		console.error(e);
// 	}

// 	const _tagView = new Uint8Array(lib.HEAPU8.buffer, pTag, 16);
// 	const authTag = new Uint8Array(_tagView);
// 	console.error('tag', authTag.reduce((_prev, _cur) => _prev + ' ' + _cur.toString(16),''));

// 	[pCtx, pInput, pIv, pKey, pOutput, pAdd].forEach((ptr) => lib._free(ptr));
// });

var key = new Uint8Array([
	233, 110, 93, 93, 62, 228, 246, 166, 70, 37, 231, 4, 104, 78, 71, 58, 49, 118,
	251, 194, 52, 188, 111, 85, 52, 189, 95, 10, 34, 220, 8, 201,
]);

var iv = new Uint8Array([222, 222, 232, 77, 137, 47, 251, 146, 119, 83, 32, 1]);

var i1 = new Uint8Array([
	72, 101, 108, 108, 111, 87, 111, 114, 108, 100, 70, 114, 111, 109, 90, 80,
]); //"HelloWorldFromZP"

var c1 = new Uint8Array([
	206, 85, 75, 136, 82, 200, 76, 20, 16, 248, 163, 28, 74, 190, 175, 18,
]);

var t1 = new Uint8Array([14, 188, 142, 106, 244, 36, 241, 158, 219, 157, 22, 171, 240, 251, 98, 60]);


let cipher = new window.WebCipherGCM();

//cipher
// cipher
// 	.initialize()
// 	.then(() => {
// 		cipher.createCipherIv(key, iv);
// 		console.error('cipher', cipher.update(i1));
// 		cipher.final();
// 		console.error('tag', cipher.getAuthTag());
// 		cipher.clean();
// 	})
// 	.catch(console.error);

cipher
	.initialize()
	.then(() => {
		cipher.createDecipherIv(key, iv);
		console.error('decipher', cipher.update(c1));
		cipher.final();
		console.error('tag', cipher.getAuthTag());
		cipher.clean();
	})
	.catch(console.error);