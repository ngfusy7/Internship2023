#
Frontend Starter

This is frontend starter template for the html team

## Requirements

* Nodejs \([https://nodejs.org/en/download/](https://nodejs.org/en/download/)\)
* On Windows - Install C++ Build Tools for Windows \(run command with administrator\)

```sh
npm install --global --production windows-build-tools
```

* Node.js native addon build tool \([https://github.com/nodejs/node-gyp](https://github.com/nodejs/node-gyp)\)

* Install the `Gulp CLI` command \(optional\):
\`\`\`sh
```
npm install --global gulp-cli
```

## Install
```sh
git clone https://git.9wdev.com/9thWonder/c8starter.git <projectname>
cd <projectname>
branch html
npm install

## Configuring the git and githook

###### Changing the origin

```sh
git remote set-url origin https://git.9wdev.com/9thWonder/<NEW_GIT_REPO>.git
git checkout -b html
```

###### Installing the githook \(comming soon\)

The `husky` module will install git hook for you and when you run git command, the husky will run the npm script for you

```sh
npm install husky --save-dev
```

## Development

###### Starting the server in development mode

```sh
npm start
gulp
```

###### Generating pages

```sh
# creating `src/html/{about-us.html, contact.html}`
npm run create-page -- -p 'about-us contact'
```

###### Generating modules \(html and css\)

```sh
# creating `src/html/modules/mod-banner.html` `src/assets/stylesheets/module/mod-banner.scss`
npm run create-module -- -m 'mod-banner' # seperating by comma
```

###### Generating module javascript

```sh
# creating `src/assets/javascripts/modules/modBanner.js`
npm run create-js -- -m 'mod-banner' # seperating by comma
```

## Production

###### Build

```sh
# build all image/fonts/js/css/html
npm run build
gulp build

# only build image
npm run img
gulp img

# only build html
npm run html
gulp html

# only build css
npm run css
gulp css

# only build js
npm run js
gulp css


# starting demo server
'npm run demo' after run cmd 'npm run build' or run cmd 'gulp production'
```

## Pushing to the git.9wdev.com

##### \#

```sh
git add .
git commit -m "message" # NOTE `PRECOMMIT HOOK` WILL RUN TO CHECK `JS LINT` AND `STYLELINT`
git push origin html
```

###### Build css inline

install node modules
```sh
npm i critical
```
find '/gulpfile.js/tasks/critical.js' and '/gulpfile.js/tasks/critical-inline.js'
open comment 'const critical = require('critical').stream'

run cmd build css inline
```sh
#  run cmd after build npm run build or npm run inline
npm run critical-inline 
```

#config visual studio code
- use editorconfig, stylelint, standard js format code.
- install extensions: Beautify, StandardJS, stylelint.

#Run sonal in source: cmd 'SonarScanner/bin/sonar-scanner'
# Checklist Frontend and Guide
 => https://9thwonder-my.sharepoint.com/:x:/p/duc_huynh/EQY5-LjCJGdLob_EBUYYyuQBp2A-MdMpYn13ov9xE1_FaA?e=Pe9AKL
 