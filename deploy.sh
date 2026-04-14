#!/bin/bash
set -euo pipefail

user=$1
host=csc391-vm1.eng.franciscan.edu
remote=$user@$host
projectDir=/srv/csc391web/team3/project

npm run sass
npm run fmt
scp -r components css imgs js ./*.html README.md node_modules data "$remote":$projectDir
# shellcheck disable=SC2029
ssh "$remote" \
 "chgrp -R csc391team3 $projectDir && find $projectDir -type d -exec chmod 775 {} \; && find $projectDir -type f -exec chmod 664 {} \;"
