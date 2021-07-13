#!/bin/sh

## Substitutes env variables in main.*.js bundle
sed -i 's/${APP_CONFIG}/'"${APP_CONFIG}"'/' $(ls /usr/share/nginx/html/main*.js)

## Starts the application
nginx -g 'daemon off;'
