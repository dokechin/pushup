#!/bin/bash
source ~/.bash_profile
psql -d pushup -h localhost -f export.sql
