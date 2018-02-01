
Description
-----------
This document describe how to delete a good info or show picture.
-------------
### 1. Request URI: /uinfo/deleteGoodsOrShow
### 2. Request Method: GET
### 3. Support Format: JSON
### 4. Request Data:
```
{
	"goodsid": <id>,
	"method": <remove/img>,
	# if u want to delete this picture
	"type": <remove>
}
```
### 5. Response Data:
* if method is remove and success. it will response as follow.
```
{
    "status": "success"
}
```
* elif method is img and success. it will response as follow.
```
{
	"status": "success",
	"path": "/path/to/img"
}
```
* elif method is img and field. it will response as follow.
{
	"status": "field",
	"reason": "......"
}
