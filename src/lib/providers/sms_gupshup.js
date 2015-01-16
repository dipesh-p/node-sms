"use strict"
var Exception=require('../exception.js');
function SMS_GUPSHUP(){}
SMS_GUPSHUP.getBalance=function(username,password,callback){
	var url="https://enterprise.smsgupshup.com/apps/apis/accInfo?method=balanceCheck";
	url+="&userid="+username+"&password="+password;

	var request= require('request');
	request(
		{
			method:'GET',
			url:url,
		},
		function (error, response, body){
			if(error) {
				if(error.code=="ENOTFOUND")
					callback(new Exception('DomainLookupFailed',{domain:'enterprise.smsgupshup.com'}));
				else{
					callback(new Exception('ExternalAPIFault',{code:error.code,number:error.errno}));
				}
				return;
			} else {
				if(response.statusCode==200){
					if(body.indexOf("Balance")==0){
						var balance=body.replace("Balance : ","");
						callback(null,balance);			   		
					}else{
						callback(new Exception("AuthenticationFailed"));
					}
				}else{
					switch(response.statusCode){
						case 404: callback(new Exception('NotFound',body));break;
						default: callback(new Exception('ExternalAPIFault',body));break;
					}
				}
				
			}
		}
	);	
};

SMS_GUPSHUP.sendTextMessage=function(username,password,to,message,sender_id,callback){
	if(username=="" || password==""){
		callback(new Exception("AuthenticationError"));
		return;
	}
	var url="https://enterprise.smsgupshup.com/GatewayAPI/rest?";
	var qs={
		method:'SendMessage',
		userid:username,
		password:password,
		send_to:to,
		msg:message,
		msg_type:'TEXT',
		v:'1.1',
		format:'json',
		mask:sender_id
	}
	var request= require('request');
	request(
		{
			method:'GET',
			url:url,
			qs:qs
		},
		function (error, response, body){
			if(error) {
				if(error.code=="ENOTFOUND")
					callback(new Exception('DomainLookupFailed',{domain:'enterprise.smsgupshup.com'}));
				else{
					callback(new Exception('ExternalAPIFault',{code:error.code,number:error.errno}));
				}
				return;
			} else {
				console.log(body);
				if(response.statusCode==200){
					var resp=JSON.parse(body);
					var status=resp.response.status;
					if(status=="success"){
						callback(null,{Phone:resp.response.phone,Id:resp.response.id});
					}else{
						if(resp.response.id==175)
							callback(new Exception('InternationalSMSNotAllowed',resp.response.details));
						else if(resp.response.id==105)
							callback(new Exception('InvalidMobileNumber',{mobile_number:to}));
						else
							callback(new Exception('FailedToSend',resp.response.details));
					}
				}else{
					switch(response.statusCode){
						case 404: callback(new Exception('NotFound',body));break;
						default: callback(new Exception('ExternalAPIFault',body));break;
					}
				}
				
			}
		}
	);	
};

module.exports=SMS_GUPSHUP;