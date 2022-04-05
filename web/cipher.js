class WebCipherGCM {
	constructor() {}

	static TAG_LENGTH = 16;
	// static OUTPUT_LENGTH = 256;
	static ENCRYPT = 1;
	static DECRYPT = 0;

	//always call this 1st
	initialize() {
		return new Promise((res, rej) =>
			Module()
				.then((lib) => {
					this.lib = lib;
					res();
				})
				.catch(rej)
		);
	}

	createDecipherIv(key, iv, options) {
		this.createPtr(key,iv,options);
		// this.setAuthTag(options);
		this.createAuthTag(options);

		this.lib._create(this.pCtx,WebCipherGCM.DECRYPT,this.pKey, this.keyLength, this.pIv, this.ivLength, this.pAad, this.aadLength);
	}

	createCipherIv(key, iv, options) {
		this.createPtr(key,iv,options);
		this.createAuthTag(options);
		this.createAad(options);
	
		this.lib._create(this.pCtx,WebCipherGCM.ENCRYPT,this.pKey, this.keyLength, this.pIv, this.ivLength, this.pAad, this.aadLength);
	}


	//should check if tag exist or not
	setAuthTag(options) {
		this.tagLength = options && options.tag ? options.tag.byteLength : 0;
		this.pTag = this.lib._malloc(this.tagLength);
		this.lib.HEAPU8.set(Uint8Array.from(options.tag), this.pTag);	
	}

	createAuthTag(options) {
		this.tagLength = options && options.authTagLength ? options.authTagLength : WebCipherGCM.TAG_LENGTH;
		this.pTag = this.lib._malloc(this.tagLength);
		this.lib.HEAPU8.set(Uint8Array.from(new Array(this.tagLength).fill(0)), this.pTag);	
	}

	createAad(options) {
		this.aadLength = options && options.aad ? options.aad.byteLength : 0;
		this.pAad = this.lib._malloc(this.aadLength);
		this.lib.HEAPU8.set(Uint8Array.from(new Array(this.aadLength)), this.pAad)
	}

	createPtr(key, iv) {
		this.pCtx = this.lib._create_ctx();
		
		this.keyLength = key.byteLength;
		this.ivLength = iv.byteLength;

		this.pKey = this.lib._malloc(this.keyLength);
		this.pIv = this.lib._malloc(this.ivLength);

		this.lib.HEAPU8.set(key,this.pKey);
		this.lib.HEAPU8.set(iv, this.pIv);
	}

	update(input) {
			let pOutput = this.lib._malloc(input.byteLength);
			this.lib.HEAPU8.set(Uint8Array(new Array(input.byteLength).fill(0)), pOutput);
			
			let pInput = this.lib._malloc(input.byteLength);
			this.lib.HEAPU8.set(input, pInput);

			this.lib._update(this.pCtx,input.byteLength, pInput, this.pOutput);

			let chunk = new Uint8Array(this.lib.HEAPU8.buffer, pOutput, input.byteLength);
			
			this.lib._free(pInput);
			this.lib._free(pOutput);

			return Uint8Array.from(chunk);
	}

	final() {
		this.lib._final(this.pCtx, this.pTag, this.tagLength);
	}

	clean() {
		[this.pCtx,this.pIv,this.pKey,this.pTag].forEach(ptr => this.lib._free(ptr));
	}

	getAuthTag() {
		return Uint8Array.from(new Uint8Array(this.lib.HEAPU8.buffer, this.pTag, this.tagLength));
	}
}

window.WebCipherGCM = WebCipherGCM;
