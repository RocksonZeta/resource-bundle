'use strict';
var fs = require('fs'),
util = require('util'),
path = require('path');

/**
@constructor ResourceBundle
@param {string} locale - the locale your selected , eg. en_US , en
@param {string} dir - resource root dir 
@param {string} baseName - resource base name , eg. message
*/
var ResourceBundle = function(locale,dir,baseName){
	this.locale = locale;
	this.dir = dir;
	this.baseName = baseName;
};

function fileExists(file){
	return function(done){
		fs.exists(file,function(x){
			done(null ,x);
		});
	};
}

ResourceBundle.prototype._select = function*(){
	var lan = this.locale.split('_')[0];
	var file = path.join(this.dir,this.baseName)+'_'+this.locale+'.js';
	if(yield fileExists(file))return file;
	file = path.join(this.dir,this.baseName)+'_'+this.locale+'.json';
	if(yield fileExists(file))return file;
	file = path.join(this.dir,this.baseName)+'_'+lan+'.js';
	if(yield fileExists(file))return file;
	file = path.join(this.dir,this.baseName)+'_'+lan+'.json';
	if(yield fileExists(file))return file;
	file = path.join(this.dir,this.baseName)+'.js';
	if(yield fileExists(file))return file;
	file = path.join(this.dir,this.baseName)+'.json';
	if(yield fileExists(file)){
		return file;
	}else{
		console.warn('no corresponding resource for '+this.baseName+" "+this.locale);
		return null;
	}
};


/**
get value from resource by a key
@param {string} - 
*/
ResourceBundle.prototype.get = function*(key){
	if(!this.resource){
		this.file = yield this._select();
		console.log(this.file);
		if(null === this.file){
			return null;
		}
		this.resource = require(this.file);
	}
	if(1>=arguments.length){
		return this.resource[key];
	}else{
		var params = Array.prototype.slice.call(arguments);
		params[0] = this.resource[key];
		return util.format.apply(util,params);
	}
};

module.exports = ResourceBundle;