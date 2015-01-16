"use strict"

function NodeSMS(provider,username,password,sender_id){
	this.PROVIDER=provider;
	this.username=username;
	this.password=password;
	this.senderId=sender_id;

	var PROVIDER=require('./providers/'+this.PROVIDER.toLowerCase()+'.js');
	this.getBalance=function(callback){
		if(this.username=="" || this.password==""){
			callback(new Exception("ValidationError","Please provide username and password"));
			return;
		}
		
		PROVIDER.getBalance(this.username,this.password,function(err,balance){
			if(err){
				callback(err);
			}else{
				callback(null,balance);
			}
		});
	}
	this.sendTextMessage=function(to,message,callback){
		if(this.username=="" || this.password==""){
			callback(new Exception("ValidationError","Please provide username and password"));
			return;
		}
		if(to=="" || to==undefined || to==null){
			callback(new Exception("ValidationError","Please provide recepient mobile number"));
			return;	
		}
		if(message=="" || message==undefined || message==null){
			callback(new Exception("ValidationError","Please provide message to send"));
			return;	
		}

		PROVIDER.sendTextMessage(this.username,this.password,to,message,this.senderId,function(err,response){
			if(err){
				callback(err);
			}else{
				callback(null,response);
			}
		})
	}
}

NodeSMS.checkDND=function(phone,callback){
	var url="http://www.nccptrai.gov.in/nccpregistry/saveSearchSub.misc";
	var request= require('request');
	request(
	{
		method:'POST',
		url:url,
		form:{phoneno:phone}
	},
	function (error, response, body){
		if(error) {
			if(error.code=="ENOTFOUND")
				callback(new Exception('DomainLookupFailed',{domain:'www.nccptrai.gov.in'}));
			else{
				callback(new Exception('ExternalAPIFault',{code:error.code,number:error.errno}));
			}
			return;
		} else {
			// body=body.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,"");
			if(response.statusCode==200){
				if(body.indexOf("The number is registered in NCPR")>0){
					callback(null,"Registered");
				}else if(body.indexOf("The number De-activated from NCPR")>0){
					callback(null,"De Registered");
				}else if(body.indexOf("The number is not registered in NCPR")>0){
					callback(null,"Not Registered");
				}else{
					callback(null,"Unknown");
				}
			}else{
				switch(response.statusCode){
					case 404: callback(new Exception('NotFound',body));break;
					default: callback(new Exception('ExternalAPIFault',body));break;
				}
			}
			
		}
	});
}
var PROVIDERS={
	SMS_GUPSHUP:'SMS_GUPSHUP'
}

exports.NodeSMS=NodeSMS;
exports.PROVIDERS=PROVIDERS;