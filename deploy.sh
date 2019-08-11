#!/bin/bash
#
# This script deploys master branch commits to gh-pages root directory and other branches to
# sub-directory /branches/<branch-name>.
#
# Rendered branches can be accessed via https://learn.libre.solar/branches/<branch-name>
#
# See here for documentation of Travis CI environment variables:
# https://docs.travis-ci.com/user/environment-variables/


# adjust link/directory settings in vuepress
if [ $TRAVIS_PULL_REQUEST != "false" ]; then
    printf "\nPreparing deployment for pull-request #$TRAVIS_PULL_REQUEST\n"
    sed -i -e "s/base: '\/'/base: '\/pr\/$TRAVIS_PULL_REQUEST\/'/g" docs/.vuepress/config.js
    sed -i -e "s^docsRepo: 'LibreSolar/learn.libre.solar'^docsRepo: '$TRAVIS_PULL_REQUEST_SLUG'^g" docs/.vuepress/config.js
    sed -i -e "s/docsBranch: 'master'/docsBranch: '$TRAVIS_BRANCH'/g" docs/.vuepress/config.js
elif [ $TRAVIS_BRANCH != "master" ]; then
    printf "\nPreparing deployment for branch $TRAVIS_BRANCH\n"
    sed -i -e "s/base: '\/'/base: '\/b\/$TRAVIS_BRANCH\/'/g" docs/.vuepress/config.js
    sed -i -e "s/docsBranch: 'master'/docsBranch: '$TRAVIS_BRANCH'/g" docs/.vuepress/config.js
else
    printf "\nPreparing deployment for master\n"
fi

# build the website
npm run docs:build
printf "\n\n"

# get previous gh-pages deployment including all PR and branch folders
rm -rf gh-pages
git clone -b gh-pages https://github.com/LibreSolar/learn.libre.solar gh-pages

# compile folders correctly
if [ $TRAVIS_PULL_REQUEST != "false" ]; then
    mkdir -p gh-pages/pr
    rm -rf "gh-pages/pr/$TRAVIS_PULL_REQUEST"
    cp -r docs/.vuepress/dist "gh-pages/pr/$TRAVIS_PULL_REQUEST"
elif [ $TRAVIS_BRANCH != "master" ]; then
    mkdir -p gh-pages/b
    rm -rf "gh-pages/b/$TRAVIS_BRANCH"
    cp -r docs/.vuepress/dist "gh-pages/b/$TRAVIS_BRANCH"
else
    if [ -d "gh-pages/b" ]; then
        mv gh-pages/pr docs/.vuepress/dist/
        mv gh-pages/b docs/.vuepress/dist/
    fi
    rm -rf gh-pages
    mv docs/.vuepress/dist gh-pages
fi

echo "Preparation and build done."

exit 0
