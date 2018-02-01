
Description
-----------
This document describe how to get new 200 qrcode.
-------------
### 1. Request URI: /uinfo/createNewQrcode
### 2. Request Method: POST
### 3. Support Format: JSON
### 4. Request Data:
```
{
	"goodNum": <number>,
	"goodInfo": {
		"user": <user>,
		"useDepartment": <useDepartment>,
		"areastr": <areastr>,
		"date": <date>
	}
}
```
### 5. Response Data:
* if success. it will response as follow.
```
{
    "status": "success"
}
```
* if failed. it will response as follow.
```
{
	"status": "failed",
	"reason": ...
}
```

id = 1: qrcode = "yzy_yzy1";
