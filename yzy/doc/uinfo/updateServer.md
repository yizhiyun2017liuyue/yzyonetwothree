
Description
-----------
This document describe how to get new 200 qrcode.
-------------
### 1. Request URI: /uinfo/updateServerInfo
### 2. Request Method: POST
### 3. Support Format: JSON
### 4. Request Data:
```
{     
	"goodsData": [
		{
      		"id": <id>,
                  "goodsName": <goodsName>,
                  "manageDepartment": <manageDepartment>,
                  "useDepartment": <useDepartment>,
                  "manager": <manager>,
                  "user": <user>,
                  "recorder": <recorder>,
                  "recordDate": <recordDate>,
                  "size": <size>,
                  "color": <color>,
                  "modelNum": <modelNum>,
                  "area": <area>,
                  "financeRecord": <financeRecord>
		},
		...
	],
      "areaData": [
            {
                  "areastr": <areastr>,
                  "areadate": <areadate>,
                  "goodsid": <goodsid>
            }
      ]
}
```
### 5. Response Data:
* if success. it will response as follow:
```
{
    "error": 1
}
```
* if failed. it will response as follow:
```
{
	"error": 0
}
```
