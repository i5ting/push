QBasePush
=========

## start

```
./start.sh
```

使用3453端口

## tech stack

- express 
- apn


## features


### 定时推送		
http://42.62.8.172:7000/api/v0.1.0/tasks

post

x-www-form-urlencoded

参数

- time = 2014-10-17 20:43:44
- desc = desc
- callback_url = http://127.0.0.1:3453/api/v0.1.0/push/api
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


http://42.62.8.172:3453/api/v0.1.0/push

x-www-form-urlencoded

参数

- token = B1504D99F0C0DB8048709EC58BACD4A1054CB331C57627A042E72CE1DFC6873F
- alert = 这是我的消息,你妹啊1211221
- payload = {     "status": {         "dfsdsf": 0,         "msg": "success"     } }
- badge = 0


## 登陆

ssh deploy@42.62.8.172	

密码是snug
## 上传pem文件

scp pem_test.zip deploy@42.62.8.172:~

## 修改推送路径

vi /home/deploy/workspace/push/app/routes/v0.1.0/apns_push.js 

```
	/*
	如何去掉pem的密码
	➜  conf git:(master) ✗   openssl rsa -in key.pem -out keyout.pem
	Enter pass phrase for key.pem:
	writing RSA key
	*/
	var options = {
	  cert: '/home/deploy/pem_test/node/cert.pem',
	  key:  '/home/deploy/pem_test/node/key.pem'
	};
```

## 测试

安装上面的说明就可以

如果没有接口调用，可以使用postman进行模拟。

注意苹果打包证书是否已替换
