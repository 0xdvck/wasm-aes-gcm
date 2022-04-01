

Compile command: 
//Production
./emcc C:/Users/LAP12633-local/Desktop/wasm-aes-gcm/main.c \
-I C:/Users/LAP12633-local/Desktop/wasm-aes-gcm/include/aes.h C:/Users/LAP12633-local/Desktop/wasm-aes-gcm/include/aes.c C:/Users/LAP12633-local/Desktop/wasm-aes-gcm/include/gcm.c C:/Users/LAP12633-local/Desktop/wasm-aes-gcm/include/aes-gcm.c \
-O3 -s WASM=1 -s MODULARIZE=1 \
-s EXPORTED_RUNTIME_METHODS="['ccall', 'cwrap']" \
-s EXPORTED_FUNCTIONS="['_malloc', '_free']" \
-s ALLOW_MEMORY_GROWTH=1 \
-s SINGLE_FILE=1 \
-o aes-gcm.js

//Mem Debug
./emcc C:/Users/LAP12633-local/Desktop/wasm-aes-gcm/main.c \
-I C:/Users/LAP12633-local/Desktop/wasm-aes-gcm/include/aes.h C:/Users/LAP12633-local/Desktop/wasm-aes-gcm/include/aes.c C:/Users/LAP12633-local/Desktop/wasm-aes-gcm/include/gcm.c C:/Users/LAP12633-local/Desktop/wasm-aes-gcm/include/aes-gcm.c \
-g2 -fsanitize=address -s WASM=1 -s MODULARIZE=1 \
-s EXPORTED_RUNTIME_METHODS="['ccall', 'cwrap']" \
-s EXPORTED_FUNCTIONS="['_malloc', '_free']" \
-s ALLOW_MEMORY_GROWTH=1 \
-s SINGLE_FILE=1 \
-o aes-gcm.js