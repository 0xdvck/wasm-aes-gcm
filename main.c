#include <emscripten.h>
#include <stdio.h>

#include "./include/gcm.h" // define the various AES-GCM library functions
#include "./include/detect_platform.h"

#ifdef __cplusplus
extern "C"
{
#endif

	struct aes_gcm
	{
		
		/* data */
	};
	

	EMSCRIPTEN_KEEPALIVE int test_gcm_crypt_and_tag(gcm_context *ctx, uchar *key, size_t key_len, uchar *iv, size_t iv_len, uchar *pt, uchar *ct_buf, size_t ct_len, uchar *tag_buf, size_t tag_len)
	{
		int ret = 0; // our return value
		uchar* aad = NULL;
		size_t aad_len = 0;

		gcm_initialize();
		gcm_setkey(ctx, key, (const uint)key_len); // setup our AES-GCM key

		// encrypt the NIST-provided plaintext into the local ct_buf and
		// tag_buf ciphertext and authentication tag buffers respectively.
		ret = gcm_crypt_and_tag(ctx, ENCRYPT, iv, iv_len, aad, aad_len,
														pt, ct_buf, ct_len, tag_buf, tag_len);

		gcm_zero_ctx(ctx); // not really necessary here, but good to do
		return ret;
	}

	EMSCRIPTEN_KEEPALIVE gcm_context *create_ctx()
	{
		gcm_context _ctx;
		gcm_context *ctx;
		ctx = &_ctx;
		return ctx;
	}

	EMSCRIPTEN_KEEPALIVE void create(gcm_context *ctx, int mode, uchar *key, size_t key_len, uchar *iv, size_t iv_len)
	{
		gcm_initialize();
		uchar* aad = NULL;
		size_t aad_len = 0;

		gcm_setkey(ctx, key, (const uint)key_len); // setup our AES-GCM key
		gcm_start(ctx, mode, iv, iv_len, aad, aad_len);
	}

	EMSCRIPTEN_KEEPALIVE void update(gcm_context *ctx, uchar *key, size_t key_len, size_t length, uchar *input, uchar *output)
	{
		gcm_initialize();
		// gcm_setkey(ctx, key, (const uint)key_len); // setup our AES-GCM keys
		gcm_update(ctx, length, input, output);
	}

	EMSCRIPTEN_KEEPALIVE void final(gcm_context *ctx,uchar *key, size_t key_len, uchar *tag, size_t tag_len)
	{
		gcm_initialize();
		gcm_finish(ctx, tag, tag_len);
		// gcm_zero_ctx(ctx);
	}

#ifdef __cplusplus
}
#endif