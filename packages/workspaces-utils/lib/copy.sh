#!/usr/bin/env bash
FILE=$1
DIRS="$2/**/"
echo "Copied $FILE to $DIRS"
echo $DIRS | xargs -n 1 cp $FILE
