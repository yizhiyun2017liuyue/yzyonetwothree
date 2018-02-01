
Description
-----------
This document describe how to login user.
-------------
### 1. Request URI: /uinfo/loginByUser
### 2. Request Method: GET
### 3. Support Format: JSON
### 4. Request Data: None
### 5. Response Data:
* if success. it will response as follow:
```
{
    "error": 1,
    "data": [
		{
			"username": <username1>,
			"password": <password1>
		},
		{
			"username": <username2>,
			"password": <password2>
		},
		{
			"username": <username3>,
			"password": <password3>
		}
    ]
}
```
* if failed. it will response as follow:
```
{
	"error": 0
}
```



***
default admin users
username: admin
password: admin
