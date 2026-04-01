#!/bin/bash
user=$1
host=csc391-vm1.eng.franciscan.edu
remote=$user@$host
projectDir=/srv/csc391web/team3/project
scp -r components css imgs js *.html README.md $remote:$projectDir
ssh $remote "chgrp -R csc391team3 $projectDir"
