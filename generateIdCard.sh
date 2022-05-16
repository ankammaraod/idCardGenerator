#! /bin/bash

function main(){
read -p "Enter Employee name: " name
read -p "Enter Employee id: " id
read -p "Enter Employee Blood Group: " bloodGroup
read -p "Enter path of image: " imagePath

echo -n "id|name|bloodGroup|imagePath">data.csv
echo -en "\n${id}|${name}|${bloodGroup}|${imagePath}">>data.csv
node generateIds.js;
open index.html;
}

main
