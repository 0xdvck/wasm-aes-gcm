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

cipher
cipher
	.initialize()
	.then(() => {
		cipher.createCipherIv(key, iv);
		console.error('cipher', cipher.update(i1));
		cipher.final();
		console.error('tag', cipher.getAuthTag());
		cipher.clean();
	})
	.catch(console.error);

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