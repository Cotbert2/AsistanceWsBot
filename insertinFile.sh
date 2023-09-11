#!/bin/bash
name=$(echo $1 | cut -d " " -f 1)
lastName=$(echo $2 | cut -d " " -f 2)
fullName="$lastName $name"

echo "$fullName" >> $3