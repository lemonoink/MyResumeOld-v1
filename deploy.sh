#!/bin/bash
WEB_PATH='/home/ubuntu/wwwroot/www/resume.haotian.pub/MyResume'
echo "start deployment"
cd $WEB_PATH
echo "fetching from remote..."
git fetch --all
git reset --hard origin/gh-pages
git checkout gh-pages
echo "done"