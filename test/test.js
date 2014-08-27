'use strict';


var ResourceBundle = require('../index.js'),
co=require('co');
require('should');


describe('ResourceBundle' , function(){
	it("get message should be ok" , function(done){
		co(function*(){
			var bundle = new ResourceBundle('en_US',__dirname+'/resources','message');
			(yield bundle.get('name')).should.equal('jerry');	
			bundle = new ResourceBundle('en_GB',__dirname+'/resources','message');
			(yield bundle.get('name&age','jim',8)).should.equal('jim&8');
			bundle = new ResourceBundle('zh_CN',__dirname+'/resources','message');
			(yield bundle.get('name')).should.equal('chick');
			bundle = new ResourceBundle('',__dirname+'/resources','message');
			(yield bundle.get('name')).should.equal('tom');
			done();
		})();
	});
	it("these things must not to be ok" , function(done){
		co(function*(){
			var bundle = new ResourceBundle('ja_JP',__dirname+'/resources','message');
			(yield bundle.get('name')).should.not.equal('jerry');			
			bundle = new ResourceBundle('en_US',__dirname+'/resources','message1');
			require('assert').equal(null , yield bundle.get('name'));
			// bundle = new ResourceBundle('',__dirname+'/resources','message');
			// (yield bundle.get('name')).should.equal('tom');
			done();
		})();
	});
});