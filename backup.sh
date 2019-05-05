#!/bin/bash
source ~/.bash_profile
psql -d pushup -h localhost -f /home/tatsumi/pushup/export.sql
