'use strict';
var fs = require('fs'),
path = require('path'),
cofy = require('cofy');

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

ResourceBundle.prototype._select = function*(){
	console.log('select ');
	var co_exists = cofy(fs.exists);
	var file = path.join(this.dir,this.baseName)+'_'+this.locale+'.js';
	if(yield co_exists(file))return file;
	file = path.join(this.dir,this.baseName)+'_'+this.locale+'.json';
	if(yield co_exists(file))return file;
	file = path.join(this.dir,this.baseName)+'.js';
	if(yield co_exists(file))return file;
	file = path.join(this.dir,this.baseName)+'.json';
	if(yield co_exists(file)){
		return file;
	}else{
		throw new Error('no corresponding resource for '+path.join(this.dir,this.baseName)+" locale");
	}
	console.log('select '+file);
	if(!/^\/|[a-z]:/i.test(file)){
		file ="./"+file;
	}
	this.resource = require(file);
	this.file = file;
};


ResourceBundle.prototype.get = function*(key){
	if(!this.resource){
		yield this._select();
	}
	return this.resource[key];
};

module.exports = ResourceBundle;