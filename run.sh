#!/bin/bash
export PATH=/usr/local/bin:$PATH
cd `dirname $0`
exec -l ~/.ndenv/shims/node app.js
