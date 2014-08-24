'use strict';


var ResourceBundle = require('../index.js'),
co=require('co');
require('should');


describe('ResourceBundle' , function(){
	it("get en_US message should be ok" , function(done){
		co(function*(){
			try{

			var bundle = new ResourceBundle('en_US','test/resources','message');
			(yield bundle.get('name')).equal('tom');
			done();
		}catch(e){
			console.log(e);
		}
		})();
	});
});