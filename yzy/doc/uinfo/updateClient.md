
Description
-----------
This document describe how to get new 200 qrcode.
-------------
### 1. Request URI: /uinfo/updateClientInfo
### 2. Request Method: GET
### 3. Support Format: JSON
### 4. Request Data: NONE
### 5. Response Data:
* if success. it will response as follow.
```
{	
	"error": 1
	"data":{
	    "goodsData": [
	    	{
		    	"id": <goodID>,
		    	"goodsName": <goodsName>,
		    	"goodsImg": <imgName>,
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
			...
	    ],
	    "financeData": [
			{
				"access": <access>,
				"ustatus": <ustatus>,
				"nowprice": <nowprice>,
				"primnum": <primnum>,
				"subjectcode": <subjectcode>,
				"recordednum": <recordednum>,
				"abstracts": <abstracts>,
				"recorddate": <recorddate>,
				"fored": <fored>,
				"area": <area>,
				"certificate": <certificate>,
				"itemcode": <itemcode>,
				"accountingnum": <accountingnum>,
				"models": <models>,
				"primprice": <primprice>,
				"bookedicon": <bookedicon>,
				"nownum": <nownum>,
				"assetname": <assetname>,
				"id": <id>,
				"nullifyicon": <nullifyicon>,
				"recordman": <recordman>,
				"udepartment": <udepartment>,
				"fdepartment": <fdepartment>,
				"saveman": <saveman>,
				"orderno": <orderno>,
				"assetnum": <assetnum>,
				"primamount": <primamount>,
				"mdepartment": <mdepartment>,
				"usefixedyear": <usefixedyear>,
				"sourcemd": <sourcemd>,
				# this three argument is not useful for you.
		 		"user1": <user1>,
		 		"user2": <user2>,
		 		"user3": <user3>
		 	},
		 	...
	    ],
	    "manageDepartment": <manageDepartment>,
        "instruction": <instruction>
	}

}
```