resource-bundle
===============
[![Build Status](https://travis-ci.org/RocksonZeta/resource-bundle.svg?branch=master)](https://travis-ci.org/RocksonZeta/resource-bundle)
[![Coverage Status](https://img.shields.io/coveralls/RocksonZeta/resource-bundle.svg)](https://coveralls.io/r/RocksonZeta/resource-bundle)
[![NPM version](https://badge.fury.io/js/resource-bundle.svg)](http://badge.fury.io/js/resource-bundle)
[![Dependency Status](https://david-dm.org/RocksonZeta/resource-bundle.svg)](https://david-dm.org/RocksonZeta/resource-bundle)

resource-bundle is a locale-specific resource loader based on co.

## NOTE:
Resource-bundle must be used in [co](https://github.com/visionmedia/co) enviroment,such as [koa](https://github.com/koajs/koa).


##Installation
```
$ npm install resource-bundle
```

## Examples
```js
'use strict';
var co = require("co");
var ResourceBundle = require('resource-bundle');

var bundle = new ResourceBundle("en_US" ,__dirname+"/resources/i18n","message");

co(function*(){
	var value = yield bundle.get('key');
})();

```
`message_en_US.js` like this
```javascript
module.exports = {
	key:"value";
}
```

## ResourceBundle
### Constructor
```js
new ResourceBundle(locale,dir,baseName)
```
- `locale` - the locale of the resource. eg. "en_US",'zh_CN'.
- `dir` - specify the root dir of the resource file. It is best to use absolute path.
- `baseName` - the baseName of the resource.

Resource name should to be `baseName_en_US.js` or `baseName_en_US.json` or `baseName_en.js` or `baseName_en.json` or baseName.js or baseName.json format.
if no locale resource matched,it will use baseName.js or baseName.json by default.

### Methods

#### get(key,[...])
Returns a corresponding format value. format method ref [util.format](http://nodejs.org/api/util.html#util_util_format_format).

