#!/bin/bash
export PATH=/usr/local/bin:$PATH
export TZ=Asia/Tokyo
cd `dirname $0`
exec  ~/.ndenv/shims/node app.js
