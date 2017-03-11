#!/bin/bash
# My first script

echo "Hello World!"

# pre-commit.sh
git stash -q --keep-index
 
RESULT=1
git stash pop -q
[ $RESULT -ne 0 ] && exit 1
exit 0
