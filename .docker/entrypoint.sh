#!/bin/bash

echo 'entrypoint.sh';
npm install;
exec "$@"