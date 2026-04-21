#!/bin/bash
set -euo pipefail

user=$1
host=csc391-vm1.eng.franciscan.edu
remote=$user@$host
projectDir=/srv/csc391web/team3/project

sed -i "s|export const DATA_PATH = \"/data\";|export const DATA_PATH = \"/team3/project/data\";|" ./js/recipe_data.js
npm run sass
npm run fmt
rsync --recursive \
 --compress \
 --progress \
 --perms \
 --chmod=Dug=rwx,Do=rx,Fug=rw,Fo=r \
 --chown=:csc391team3 \
 -- components css imgs js *.html README.md node_modules data "$remote":$projectDir
sed -i "s|export const DATA_PATH = \"/team3/project/data\";|export const DATA_PATH = \"/data\";|" ./js/recipe_data.js
