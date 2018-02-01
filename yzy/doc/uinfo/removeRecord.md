
Description
-----------
This document describe how to remove record by id.
-------------
### 1. Request URI: /uinfo/removeRecord
### 2. Request Method: POST
### 3. Support Format: JSON
### 4. Request Data:
```
{
	"id": <id>
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