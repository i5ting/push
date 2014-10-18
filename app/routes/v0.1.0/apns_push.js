var express = require('express');
var router = express.Router();
var apn = require('apn');

var apnConnection;

// APNS推送默认项
// 
// this.options = {
// 		cert: 'cert.pem',
// 		key: 'key.pem',
// 		ca: null,
// 		pfx: null,
// 		passphrase: null,
// 		production: (process.env.NODE_ENV === "production"),
// 		address: null,
// 		port: 2195,
// 		rejectUnauthorized: true,
// 		enhanced: true,
// 		cacheLength: 1000,
// 		autoAdjustCache: true,
// 		maxConnections: 1,
// 		connectTimeout: 10000,
// 		connectionTimeout: 0,
// 		connectionRetryLimit: 10,
// 		buffersNotifications: true,
// 		fastMode: false,
// 		legacy: false,
// 		disableNagle: false,
// 		disableEPIPEFix: false
// }

/*
如何去掉pem的密码
➜  conf git:(master) ✗   openssl rsa -in key.pem -out keyout.pem
Enter pass phrase for key.pem:
writing RSA key
*/
var options = {
	cert: '/Users/sang/workspace/github/push/app/routes/conf/cert.pem',
	key:  '/Users/sang/workspace/github/push/app/routes/conf/keyout.pem'
};


/**
 * 推送请求
 *
 *  post http://127.0.0.1:3000/api/v0.1.0/push
 *
 * @param token {String}
 * @param alert {String}
 * @param payload {String}
 * @param badge {String}
 * @param sound {String}
 * @param expiry {String}
 */ 
router.post('/', function(req, res) {
	apnConnection = new apn.Connection(options);
	
	var token = ''
	
	if(req.body.token == undefined){
		return res.json({
		  status:{
			  code: 0,
			  msg : '您的推送已失败，请检查是否配置token'
		  }
		});	
	}
	
	token = req.body.token;
	var myDevice = new apn.Device(token);
	console.log('[LOG][PUSH TOKEN] '+token);
	
	var alert_title = "\uD83D\uDCE7 \u2709 You have a new message";
	if(req.body.alert != undefined){
		alert_title = req.body.alert;
	}
	
	console.log('alert_title=' + alert_title);
	
	var payload = {}
	if(req.body.payload != undefined){
		eval('new_payload='+ req.body.payload)
		if(new_payload == undefined){	
			new_payload = {}
			console.log('[FATAL LOG]/api/v0.1.0/push payload 参数不合法，不是合法对象');
		}
		payload = new_payload;
	}
	
	var sound = "ping.aiff";
	if(req.body.sound != undefined){
		sound = req.body.sound;
	}
	
	var badge = 1;
	if(req.body.badge != undefined){
		badge = req.body.badge;
	} 

	var note = new apn.Notification();
	
	note.expiry = Math.floor(Date.now() / 1000);
	note.badge = badge;
	note.sound = sound;
	note.alert = alert_title;
	note.payload = payload;

	// 此处有超时需要处理 
	apnConnection.pushNotification(note, myDevice);
	
	res.json({
		data:note,
	  status:{
		  code: 0,
		  msg : '您的推送已经成功放到后台进行推送了，稍等'
	  }
	});	 
});


router.post('/api', function(req, res) {

	
	console.log('AAAPI = ');
	console.log('AAAPI = '+JSON.stringify(req.body.token));
	
	apnConnection = new apn.Connection(options);
	
	var token = ''
	
	if(req.body.token == undefined){
		return res.json({
		  status:{
			  code: 0,
			  msg : '您的推送已失败，请检查是否配置token'
		  }
		});	
	}
	
	token = req.body.token;
	var myDevice = new apn.Device(token);
	console.log('[LOG][PUSH TOKEN] '+token);
	
	var alert_title = "\uD83D\uDCE7 \u2709 You have a new message";
	if(req.body.alert != undefined){
		alert_title = req.body.alert;
	}
	
	console.log('alert_title=' + alert_title);
	
	var payload = {}
	if(req.body.payload != undefined){
		eval('new_payload='+ req.body.payload)
		if(new_payload == undefined){	
			new_payload = {}
			console.log('[FATAL LOG]/api/v0.1.0/push payload 参数不合法，不是合法对象');
		}
		payload = new_payload;
	}
	
	var sound = "ping.aiff";
	if(req.body.sound != undefined){
		sound = req.body.sound;
	}
	
	var badge = 1;
	if(req.body.badge != undefined){
		badge = req.body.badge;
	} 

	var note = new apn.Notification();
	
	note.expiry = Math.floor(Date.now() / 1000);
	note.badge = badge;
	note.sound = sound;
	note.alert = alert_title;
	note.payload = payload;

	// 此处有超时需要处理 
	apnConnection.pushNotification(note, myDevice);
	
	res.json({
		data:note,
	  status:{
		  code: 0,
		  msg : '您的推送已经成功放到后台进行推送了，稍等'
	  }
	});	 
});
module.exports = router;
