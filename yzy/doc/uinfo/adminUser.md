
Description
-----------
This document describe how to login admin.
-------------
### 1. Request URI: /uinfo/adminLogin
### 2. Request Method: POST
### 3. Support Format: JSON
### 4. Request Data:
```
{
	"password": <password>
}
```
### 5. Response Data:
* if success. it will response as follow:
```
{
    "status": "success"
}
```
* if failed. it will response as follow:
```
{
	"status": "failed"
}
```



-----------
This document describe how to create user by admin.
-------------
### 1. Request URI: /uinfo/createUserByAdmin
### 2. Request Method: POST
### 3. Support Format: JSON
### 4. Request Data:
```
{	
	"username": <username>
	"password": <password>
}
```
### 5. Response Data:
* if success. it will response as follow:
```
{
    "status": "success"
}
```
* if failed. it will response as follow:
```
{
	"status": "failed"
}
```




-----------
This document describe how to change user's password by admin.
-------------
### 1. Request URI: /uinfo/changepwd
### 2. Request Method: POST
### 3. Support Format: JSON
### 4. Request Data:
```
{	
	"username": <username>
	"newpwd": <newPassword>
}
```
### 5. Response Data:
* if success. it will response as follow:
```
{
    "status": "success"
}
```
* if failed. it will response as follow:
```
{
	"status": "failed"
}
```