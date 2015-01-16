module.exports={

	"ValidationError":{
		"name":"ValidationError",
		"code":"1001",
		"message":"Input praramter provided is not proper",
		"http_code":"400"
	},

	"AuthenticationFailed":{
		"name":"AuthenticationFailed",
		"code":"1002",
		"message":"Username/password is invalid",
		"http_code":"401"
	},
	"DomainLookupFailed":{
		"name":"DomainLookupFailed",
		"code":"1003",
		"message":"Unable to lookup IP Address for {domain}",
		"http_code":"501"	
	},
	"NotFound":{
		"name":"NotFound",
		"code":"1004",
		"message":"",
		"http_code":"404"		
	},
	"InSufficientBalance":{
		"name":"InSufficientBalance",
		"code":"1005",
		"message":"You don't have sufficient SMS Balance to send the message",
		"http_code":"400"		
	},
	"FailedToSend":{
		"name":"FailedToSend",
		"code":"1006",
		"message":"Falied to send SMS",
		"http_code":"501"		
	},
	"InternationalSMSNotAllowed":{
		"name":"InternationalSMSNotAllowed",
		"code":"1007",
		"message":"",
		"http_code":"501"
	},
	"InvalidMobileNumber":{
		"name":"InvalidMobileNumber",
		"code":"1008",
		"message":"The mobile number \"{mobile_number}\" is not a valid mobile number",
		"http_code":"501"
	},
	"ExternalAPIFault":{
		"name":"ExternalAPIFault",
		"code":"1099",
		"message":"Unknown error occurred, Code: {code}, Number:{number}",
		"http_code":"501"		
	}
};