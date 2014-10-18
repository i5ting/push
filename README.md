QBasePush
=========

## start

```
 cd app
 npm install
 npm start
```

## tech stack

- express 
- apn


## features


### 定时推送		
http://127.0.0.1:7000/api/v0.1.0/tasks

post

x-www-form-urlencoded

参数

- time = 2014-10-17 20:43:44
- desc = desc
- callback_url = http://127.0.0.1:3000/api/v0.1.0/push/api
- data = eyJ0b2tlbiI6IkIxNTA0RDk5RjBDMERCODA0ODcwOUVDNThCQUNENEExMDU0Q0IzMzFDNTc2MjdBMDQyRTcyQ0UxREZDNjg3M0YiLCJhbGVydCI6Iui

说明：

data是对象，转成string，然后base64获得的。具体算法如下：

```
		var d = { 	token:'B1504D99F0C0DB8048709EC58BACD4A1054CB331C57627A042E72CE1DFC6873F', 	alert:'这是我的消息,你妹啊1211221', 	payload:{     "status": {         "dfsdsf": 0,         "msg": "success"     } }, 	badge:'1' }
		//JSON.stringify(d) = {"token":"B1504D99F0C0DB8048709EC58BACD4A1054CB331C57627A042E72CE1DFC6873F","alert":"这是我的消息,你妹啊1211221","payload":{"status":{"dfsdsf":0,"msg":"success"}},"badge":"1"}

		var a = new Buffer(JSON.stringify(d)).toString('base64');
		// a= eyJ0b2tlbiI6IkIxNTA0RDk5RjBDMERCODA0ODcwOUVDNThCQUNENEExMDU0Q0IzMzFDNTc2MjdBMDQyRTcyQ0UxREZDNjg3M0YiLCJhbGVydCI6Iui/meaYr+aIkeeahOa2iOaBryzkvaDlprnllYoxMjExMjIxIiwicGF5bG9hZCI6eyJzdGF0dXMiOnsiZGZzZHNmIjowLCJtc2ciOiJzdWNjZXNzIn19LCJiYWRnZSI6IjEifQ==
```

### 实时推送


http://127.0.0.1:3000/api/v0.1.0/push

x-www-form-urlencoded

参数

- token = B1504D99F0C0DB8048709EC58BACD4A1054CB331C57627A042E72CE1DFC6873F
- alert = 这是我的消息,你妹啊1211221
- payload = {     "status": {         "dfsdsf": 0,         "msg": "success"     } }
- badge = 0



