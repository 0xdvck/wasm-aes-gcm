const ENCRYPT = 1;
const DECRYPT = 0;

Module().then((lib) => {
	var pCtx = lib._create_ctx();

	var pInput = lib._malloc(5 * 1);
	var input = new Uint8Array([72, 101, 108, 108, 111]); //"Hello"
	lib.HEAPU8.set(input, pInput);

	var pOutput = lib._malloc(256);
	var output = new Uint8Array(new Array(256).fill(0));
	lib.HEAPU8.set(output, pOutput);

	var pKey = lib._malloc(32);
	var key = new Uint8Array([
		233, 110, 93, 93, 62, 228, 246, 166, 70, 37, 231, 4, 104, 78, 71, 58, 49,
		118, 251, 194, 52, 188, 111, 85, 52, 189, 95, 10, 34, 220, 8, 201,
	]);
	lib.HEAPU8.set(key, pKey);

	var pIv = lib._malloc(12 * 1);
	var iv = new Uint8Array([
		222, 222, 232, 77, 137, 47, 251, 146, 119, 83, 32, 1,
	]);
	lib.HEAPU8.set(iv, pIv);

	var pAdd = lib._malloc(0);
	// lib.HEAPU8.set(pAdd, new Uint8Array([]));

	var pTag = lib._malloc(16);
	var tag = new Uint8Array(new Array(16).fill(0));
	lib.HEAPU8.set(tag, pTag);	

	lib._create(pCtx,ENCRYPT,pKey, 32, iv, 12);
	try {
		// lib._test_gcm_crypt_and_tag(pCtx, pKey,32,pIv,12,pInput,pOutput,5,pTag,16);
		lib._update(pCtx,pKey, 32, 5, pInput, pOutput);
		lib._final(pCtx,pKey, 32, pTag, 16);
	} catch(e) {
		console.error(e);
	}

	// const _tagView = new Uint8Array(lib.HEAPU8.buffer, pTag, 16);
	const _cipherView = new Uint8Array(lib.HEAPU8.buffer, pOutput, 5);

	const cipher = new Uint8Array(_cipherView);

	[pCtx, pInput, pIv, pKey, pOuput, pAdd].forEach((ptr) => lib._free(ptr));
});
