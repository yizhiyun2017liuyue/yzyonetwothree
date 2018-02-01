
Description
-----------
This document describe how to get new 200 qrcode.
-------------
### 1. Request URI: /uinfo/updateServerImg
### 2. Request Method: POST
### 3. Request Data: FormFiles
### 4. Response Data:
* if success. it will response as follow:
```
{
    "error": 1
}
```
* if failed. it will response as follow:
```
{
	"error": 0,
	"reason": "..."
}
```


note:
imgName create by id + '_' + time
example: 1_1287232173.png
