'use strict';
var fs = require('fs'),
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


ResourceBundle.prototype.get = function*(key){
	if(!this.resource){
		this.file = yield this._select();
		if(null === this.file){
			return null;
		}
		console.log("select file " ,this.file);
		this.resource = require(this.file);
	}
	return this.resource[key];
};

module.exports = ResourceBundle;