#include <stdio.h>
#include <stdlib.h>
#include <emscripten.h>
#include <sanitizer/lsan_interface.h>

#include "./include/gcm.h" // define the various AES-GCM library functions
#include "./include/detect_platform.h"

#ifdef __cplusplus
extern "C"
{
#endif

	EMSCRIPTEN_KEEPALIVE gcm_context *create_ctx()
	{
		gcm_context _ctx;
		gcm_context *ctx;
		ctx = &_ctx;
		return ctx;
	}

	EMSCRIPTEN_KEEPALIVE void create(gcm_context *ctx, int mode, uchar *key, size_t key_len, uchar *iv, size_t iv_len, uchar* aad, size_t aad_len)
	{
		gcm_initialize();
		gcm_setkey(ctx, key, (const uint)key_len); // setup our AES-GCM key
		gcm_start(ctx, mode, iv, iv_len, aad, aad_len);
	}

	EMSCRIPTEN_KEEPALIVE void update(gcm_context *ctx, size_t length, uchar *input, uchar *output)
	{
		gcm_update(ctx, length, input, output);
	}

	EMSCRIPTEN_KEEPALIVE void final(gcm_context *ctx, uchar *tag, size_t tag_len)
	{
		gcm_finish(ctx, tag, tag_len);
		gcm_zero_ctx(ctx);
	}

#ifdef __cplusplus
}
#endif