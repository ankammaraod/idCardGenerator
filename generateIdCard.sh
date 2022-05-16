#! /bin/bash

function main(){
read -p "Enter Employee name: " name
read -p "Enter Employee id: " id
read -p "Enter Employee Blood Group: " bloodGroup
read -p "Enter path of image: " imagePath

echo -n "id|name|bloodGroup|imagePath">data1.csv
echo -en "\n${id}|${name}|${bloodGroup}|${imagePath}">>data.csv;
echo -en "\n${id}|${name}|${bloodGroup}|${imagePath}">>data1.csv;
node generateIds.js "data1.csv";
open index.html;
}

main
