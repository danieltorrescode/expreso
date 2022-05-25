#!/bin/bash

echo 'entrypoint.sh'
npm install 
npm audit
exec "$@"