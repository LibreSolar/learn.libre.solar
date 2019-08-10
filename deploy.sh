#!/bin/bash
#
# This script deploys master branch commits to gh-pages root directory and other branches to
# sub-directory /branches/<branch-name>.
#
# Rendered branches can be accessed via https://learn.libre.solar/branches/<branch-name>
#

#branch=`git rev-parse --abbrev-ref HEAD`
#branch=`git branch | grep \* | cut -d ' ' -f2`
branch="$TRAVIS_BRANCH"

if [ $branch != "master" ]; then
    # adjust directory used in links
    sed -i -e "s/base: '\/'/base: '\/branches\/$branch\/'/g" docs/.vuepress/config.js
    # make also github edit link work
    sed -i -e "s/docsBranch: 'master'/docsBranch: '$branch'/g" docs/.vuepress/config.js
fi

npm run docs:build

printf "\nPreparing deployment for branch $branch\n"

if [ -d "gh-pages" ]; then
    rm -rf gh-pages
fi
git clone -b gh-pages https://github.com/LibreSolar/learn.libre.solar gh-pages

if [ $branch == "master" ]; then
    if [ -d "gh-pages/branches" ]; then
        mv gh-pages/branches docs/.vuepress/dist/
    fi
    rm -rf gh-pages
    mv docs/.vuepress/dist gh-pages
else
    if [ -d "gh-pages/branches/$branch" ]; then
        rm -rf "gh-pages/branches/$branch"
    fi
    mkdir -p gh-pages/branches
    cp -r docs/.vuepress/dist "gh-pages/branches/$branch"
fi

echo "Preparation done."

exit 0
