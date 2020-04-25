#!/bin/bash
#
# Returns true if node is actively validating 
# using the session keys saved in lastkeys.log file
#
# Author: Derfredy | @derfredy:matrix.org
#

LAST_KEY=`cat lastkeys.log`

curl --silent --location --request POST 'http://localhost:9933' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc": "2.0",
    "method": "author_hasSessionKeys",
    "params": ["'"$LAST_KEY"'"],
    "id": 1
}' | jq
