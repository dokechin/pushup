#!/bin/bash
export PATH=/usr/local/bin:$PATH
cd `dirname $0`
exec  - TZ=Asia/Tokyo ~/.ndenv/shims/node app.js
