'use strict';


var loader = require('../index.js'),
co=require('co');
require('should');


describe('ResourceBundle' , function(){
	it("get message should be ok" , function(done){
		co(function*(){
			var bundle = yield loader('en_US',__dirname+'/resources','message');
			// var bundle = new ResourceBundle('en_US',__dirname+'/resources','message');
			bundle.get('name').should.equal('jerry');	
			bundle = yield loader('en_GB',__dirname+'/resources','message');
			bundle.get('name&age','jim',8).should.equal('jim&8');
			bundle = yield loader('zh_CN',__dirname+'/resources','message');
			bundle.get('name').should.equal('chick');
			bundle = yield loader('',__dirname+'/resources','message');
			bundle.get('name').should.equal('tom');
			done();
		})();
	});
	it("these things must not to be ok" , function(done){
		co(function*(){
			var bundle = yield loader('ja_JP',__dirname+'/resources','message');
			bundle.get('name').should.not.equal('jerry');			
			bundle = yield loader('en_US',__dirname+'/resources','message1');
			require('assert').equal(null ,bundle);
			// bundle = new ResourceBundle('',__dirname+'/resources','message');
			// (yield bundle.get('name')).should.equal('tom');
			done();
		})();
	});
});