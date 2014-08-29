'use strict';
var fs = require('fs'),
util = require('util'),
path = require('path');

function fileExists(file){
	return function(done){
		fs.exists(file,function(x){
			done(null ,x);
		});
	};
}

/**
load resource and return a ResourceBundle object
@param {string} locale - the locale your selected , eg. en_US , en
@param {string} dir - resource root dir 
@param {string} baseName - resource base name , eg. message
@return ResourceBundle , if no resource matched ,it will return null;
*/
module.exports = function*(locale,dir,baseName){
	var lan = locale.split('_')[0];
	var prePath = path.join(dir,baseName);
	var file = "";
	var targetFiles = [
		prePath+'_'+locale+'.js',
		prePath+'_'+locale+'.json',
		prePath+'_'+lan+'.js',
		prePath+'_'+lan+'.json',
		prePath+'.js',
		prePath+'.json'
	];
	for(var i = 0 ; i< targetFiles.length ;i++){
		if(yield fileExists(targetFiles[i])){
			file = targetFiles[i];
			break;
		}
	}
	if(!file){
		return null;
	}
	return new ResourceBundle(require(file));
};

function ResourceBundle(resource){
	this.resource = resource;
}

/**
get value from resource by a key
@param {string} - 
*/
ResourceBundle.prototype.get = function(key){
	if(1>=arguments.length){
		return this.resource[key];
	}else{
		var params = Array.prototype.slice.call(arguments);
		params[0] = this.resource[key];
		return util.format.apply(util,params);
	}
};

module.exports.ResourceBundle = ResourceBundle;