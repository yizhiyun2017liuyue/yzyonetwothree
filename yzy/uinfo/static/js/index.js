	$(function(){

		$("#panel .mainContent").css("height",($("body").outerHeight() || $(document).outerHeight()) - 54 + "px");
		$("#panel .mainContent .rightHandleModule .didRecordGoodList,#panel .mainContent .rightHandleModule .financialTableShow,#panel .mainContent .rightHandleModule .addfinancialHandle").height($("#panel .mainContent").height() - 91);
		$("#panel .mainContent .rightHandleModule .rightHandleTitle").width($("#panel .mainContent .rightHandleModule").width());
		//退出系统点击事件
		$("#panel .topFlagModule .closePage").unbind("click");
		$("#panel .topFlagModule .closePage").click(function(event){
			event.stopPropagation();
			window.location.href='adminLoginer';
		})

		Date.prototype.Format = function (fmt) { //author: meizz 
	    var o = {
	        "M+": this.getMonth() + 1, //月份 
	        "d+": this.getDate(), //日 
	        "h+": this.getHours(), //小时 
	        "m+": this.getMinutes(), //分 
	        "s+": this.getSeconds(), //秒 
	        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
	        "S": this.getMilliseconds() //毫秒 
	    };
	    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	    for (var k in o)
	    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	    return fmt;
	}

		// 加载进度条
		var opts = {
			lines: 11, // The number of lines to draw
			length: 8, // The length of each line
			width: 5, // The line thickness
			radius: 14, // The radius of the inner circle
			scale: 1, // Scales overall size of the spinner
			corners: 1, // Corner roundness (0..1)
			color: '#ffffff', // CSS color or array of colors
			fadeColor: 'red', // CSS color or array of colors
			opacity: 0.25, // Opacity of the lines
			rotate: 0, // The rotation offset
			direction: 1, // 1: clockwise, -1: counterclockwise
			speed: 0.9, // Rounds per second
			trail: 41, // Afterglow percentage
			fps: 20, // Frames per second when using setTimeout() as a fallback in IE 9
			zIndex: 2e9, // The z-index (defaults to 2000000000)
			className: 'spinner', // The CSS class to assign to the spinner
			top: '50%', // Top position relative to parent
			left: '50%', // Left position relative to parent
			// shadow: "none", // Box-shadow for the lines
			position: 'absolute' // Element positioning
		};

        var spinner = new Spinner(opts);

        //二维码表格字段名
        var saveColumns = [{"data":"recorder","title":"记录人"},{"data":"color","title":"颜色"},{"data":"recordDate","title":"记录日期"},{"data":"modelNum","title":"型号"},{"data":"id","title":"物品id"},{"data":"financeRecord","title":"财务记录"},{"data":"user","title":"使用人"},{"data":"manageDepartment","title":"管理部门"},{"data":"useDepartment","title":"使用部门"},{"data":"goodsImg","title":"商品图片"},{"data":"area","title":"所在位置"},{"data":"goodsName","title":"商品名称"},{"data":"size","title":"尺寸"},{"data":"manager","title":"管理人"},{"data":"icon","title":"单位名称"}]

        //财务报告字段名
        var financialTableName = [{"data":"id","title":"编号"},{"data":"certificate","title":"凭证号"},{"data":"assetnum","title":"资产编号"},{"data":"subjectcode","title":"科目编码"},{"data":"assetname","title":"资产名称"},{"data":"recorddate","title":"登记日期"},{"data":"models","title":"规格型号"},{"data":"abstracts","title":"摘要"},{"data":"primprice","title":"原始单价"},{"data":"primnum","title":"原始数量"},{"data":"primamount","title":"原始金额"},{"data":"access","title":"获取方式"},{"data":"mdepartment","title":"管理部门"},{"data":"fdepartment","title":"财务部门"},{"data":"udepartment","title":"使用部门"},{"data":"ustatus","title":"使用状况"},{"data":"saveman","title":"保管人"},{"data":"orderno","title":"通知单号"},{"data":"usefixedyear","title":"使用年限"},{"data":"nownum","title":"现有数量"},{"data":"nowprice","title":"现有价值"},{"data":"fored","title":"经费科目"},{"data":"accountingnum","title":"会计凭证号"},{"data":"bookedicon","title":"入账标志"},{"data":"nullifyicon","title":"作废标志"},{"data":"recordman","title":"登记人"},{"data":"sourcemd","title":"原管理部门"},{"data":"area","title":"所在位置"},{"data":"itemcode","title":"物品编码"}];

        var tempDataArr = [{data:"selectyzy"},{"data":"id","title":"编号"},{"data":"assetnum","title":"资产编号"},{"data":"assetname","title":"资产名称"},{"data":"recorddate","title":"登记日期"},{"data":"primnum","title":"原始数量"},{"data":"primamount","title":"原始金额"},{"data":"mdepartment","title":"管理部门"},{"data":"udepartment","title":"使用部门"},{"data":"saveman","title":"保管人"},{"data":"recordednum","title":"已录入量"}];
      	
        //开启加载进度条、
        function openLoadingHandle(){
        	var target = $("body").get(0);
	     	spinner.spin(target);
	     	$(".markLine").show();
        }

        function closeLodingHandle(){
        	spinner.stop();
        	$(".markLine").hide();
        }


        // 创建新增财务信息的输入框
        for(var z = 0; z <financialTableName.length; z++){
        	if(z == 0){
        		continue;
        	}
        	var tempElement = $("<label><span>"+financialTableName[z]["title"]+" : </span><input type='text' class="+financialTableName[z]["data"]+" name="+financialTableName[z]["data"]+"></label>");
        	$("#panel .mainContent .rightHandleModule .addfinancialHandle").append(tempElement);
        	if(financialTableName[z]["title"] == "登记日期"){
        		tempElement.children("input").attr("type","date");
        	}
        	if(financialTableName.length -1 == z){
        		tempElement.css("paddingBottom","20px");
        		$("#panel .mainContent .rightHandleModule .addfinancialHandle").append($("<div class='addfinancialHandleWaring'></div>"));
        	}

        }



        //记录请求下来的图片
        var saveHandleImageSrcArr = {};
        var haveClickOne = true;
        var thisImgText = null;
        var thisClickImageChange;
        var haveGetClick = true;

        function imageOnload(empty){
	        	var img = new Image();
				img.src = saveHandleImageSrcArr[thisImgText];
				img.onload = function(){
       				$("#panel .mainContent .didRecordGoodList-img-show").show();
       				$("#panel .mainContent .didRecordGoodList-img-show img").attr("src",saveHandleImageSrcArr[thisImgText]).removeClass().addClass("animated zoomIn active");
       				if(empty != "empty"){
       					$("#panel .mainContent .didRecordGoodList-img-show img").width($(".didRecordGoodList-img-show img").width()/$(".didRecordGoodList-img-show img").height()*$(".didRecordGoodList").height()-60);
       				}else{
       					$("#panel .mainContent .didRecordGoodList-img-show img").css({"width":"auto","height":"auto"})
       				}
       		}
        }
        //已录入信息表点击显示图片
        function didRecordGoodListShowImage(){
        	$(".didRecordGoodList tbody").unbind("click");
        	$(".didRecordGoodList tbody").on("click",'tr td:nth-child(10)',function(event){
        		event.stopPropagation();
        		$("#panel .mainContent  .didRecordGoodList-img-show .imageHandleCommon").show();
			    $("#panel .mainContent  .didRecordGoodList-img-show .fileShow").hide();
        		if($(this).text() != ""){
        			thisImgText = $(this).text();
        			thisClickImageChange = $(this);
        			if(saveHandleImageSrcArr[thisImgText]){
        				$(".markLine").show();
        				imageOnload();
   						if(haveClickOne){
		       				didTableShowData();
		       			}
        				return;
        			}
        			var getGoodsImg = {};
        			getGoodsImg['goodsid'] = Number($(this).parents().children("td").eq(4).text());
        			getGoodsImg["method"] = "img";
        			//从后台拿去图片路径
        			$.ajax({
        				url:"/uinfo/deleteGoodsOrShow",
        				type:"POST",
        				datatype:"json",
			        	contentType:"application/json; charset=utf-8",
			        	data:JSON.stringify(getGoodsImg),
			        	beforeSend:function(){
			        		openLoadingHandle();
			       		},
			       		success:function(data){
			       			if(data["status"] == "success"){
					       			var img = new Image();
					       			img.src = "../../../media/img/"+data.path+"";
					       			img.onload = function(){
					       				$("#panel .mainContent .didRecordGoodList-img-show").show();
					       				$("#panel .mainContent .didRecordGoodList-img-show img").attr("src","../../../media/img/"+data.path+"").width($(".didRecordGoodList-img-show img").width()/$(".didRecordGoodList-img-show img").height()*$(".didRecordGoodList").height()-60).removeClass().addClass("animated zoomIn active");
					    
					       				saveHandleImageSrcArr[thisImgText] = "../../../media/img/"+data.path+"";
					       				spinner.stop();

					       			}
					       			if(haveClickOne){
					       				didTableShowData();
					       			}
			       			}
			       					
			       			
			       		},
			       		error:function(){
			       			closeLodingHandle();
			       		}

        			});
        		}else{
        			thisClickImageChange = $(this);
        			thisImgText = ""+$(this).parent().find("td").eq(4).text()+"_empty";
        			if(!saveHandleImageSrcArr[thisImgText]){
        				saveHandleImageSrcArr[thisImgText] = "/static/img/details_icon_nophoto.png";
        			}
        			$(".markLine").show();
    				imageOnload("empty");
    				$(".deleteImage ").hide();
    				if(haveClickOne){
				       	didTableShowData();
				     }
        		}
        	})



        	//双击编辑表格
        	tableDbclickChangeData();


        	// haveGetClick = false;
        }



        //已录入信息表的查看
        function didTableShowData(){
		        // 点击隐藏图片
		        $("#panel .mainContent .didRecordGoodList-img-show img").unbind("click");
		        $("#panel .mainContent .didRecordGoodList-img-show img").click(function(event){
		        	event.stopPropagation();
		        	if($(this).hasClass("active")){
		        		$(this).removeClass().addClass("animated zoomOut");
		        		$(this).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',function(){
		        			$("#panel .mainContent .didRecordGoodList-img-show").add($(".markLine")).hide();
		        			$(this).removeClass().attr("src","").unbind("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend");
		        		})
		        		
		        	}
		        })

		        //删除
		        $("#panel .mainContent .didRecordGoodList-img-show .deleteImage").unbind("click");
		        $("#panel .mainContent .didRecordGoodList-img-show .deleteImage").click(function(event){
		        	event.stopPropagation();
		        	var deleteImgHandle = {};
		        	deleteImgHandle["goodsid"] = Number(thisImgText.split("_")[0]);
		        	deleteImgHandle["method"] = "img";
		        	deleteImgHandle["type"] = "remove";
		        	$.ajax({
		        		url:"/uinfo/deleteGoodsOrShow",
			       		type:"POST",
			        	datatype:"json",
			        	contentType:"application/json; charset=utf-8",	
			        	data:JSON.stringify(deleteImgHandle),
			        	beforeSend:function(){
			        		openLoadingHandle();
			        	},
			        	success:function(data){
			        		if(data["status"] == "success"){
			        				delete saveHandleImageSrcArr[thisClickImageChange.text()];
			        				thisClickImageChange.text("");
			        				$("#panel .mainContent .didRecordGoodList-img-show img").trigger("click");	
			        		}
			        		closeLodingHandle();
			        	},
			        	error:function(){
			        		closeLodingHandle();
			        	}
		        	});
		        })


		        //编辑
		         $("#panel .mainContent .didRecordGoodList-img-show .changeImageSrc").unbind("click");
		         $("#panel .mainContent .didRecordGoodList-img-show .changeImageSrc").click(function(event){
		         	event.stopPropagation();
		         	document.getElementById("changeImageInput").click();
		         	$("#changeImageInput").change(function(event){
		         		event.stopPropagation();
		         		openLoadingHandle();
		         		var filesHandle = document.getElementById("changeImageInput").files[0];
		         		//创建读取文件的对象
		         		var reader = new FileReader();
		         		var imgFile;
		         		reader.onload = function(e){
		         			imgFile = e.target.result;
		         			var img = new Image();
		         			img.src = imgFile;
		         			img.onload = function(){
		         				$("#panel .mainContent .didRecordGoodList-img-show img").attr("src",imgFile).width($(".didRecordGoodList-img-show img").width()/$(".didRecordGoodList-img-show img").height()*$(".didRecordGoodList").height()-60);
		         				spinner.stop();
			     			 	$("#panel .mainContent  .didRecordGoodList-img-show .imageHandleCommon").hide();
			     			 	$("#panel .mainContent  .didRecordGoodList-img-show .fileShow").show();
		         			}
		         			
		         		}

		         		reader.readAsDataURL(filesHandle)
		         	})
		         }) 

		         //上传图片事件

		         //取消
		          $("#panel .mainContent .didRecordGoodList-img-show .closeImageFile").unbind("click");
		          $("#panel .mainContent .didRecordGoodList-img-show .closeImageFile").click(function(event){
		          		event.stopPropagation();
		          		$(".markLine").show();
		          		$("#panel .mainContent  .didRecordGoodList-img-show .imageHandleCommon").show();
			     		$("#panel .mainContent  .didRecordGoodList-img-show .fileShow").hide();
			     		if(thisImgText == "empty"){
			     			$(".deleteImage ").hide();
			     			imageOnload("empty");
			     		}else{
			     			imageOnload();
			     		}
			     		

		          })


		         //确定
		          $("#panel .mainContent .didRecordGoodList-img-show .btnTrueFile").unbind("click");
		          $("#panel .mainContent .didRecordGoodList-img-show .btnTrueFile").click(function(event){
		          		event.stopPropagation();
          				var filesHandle = document.getElementById("changeImageInput").files[0];
          				var type = filesHandle["type"]       				
          				var nowDataHandle = thisImgText.split("_")[0]+"_"+new Date().getTime()+"."+type.split("/")[1]+"";
          				var changeNewFileName = new File([filesHandle],nowDataHandle,{type:type});
	        			var formData = new FormData();
	        			formData.append("changeImg",changeNewFileName);

		          		$.ajax({
		          			url:"/uinfo/updateServerImg",
        					type:"POST",
        					datatype:"json",
			        		contentType:false,
			        		processData:false,
			        		data:formData,
			        		beforeSend:function(){
			        			openLoadingHandle();
			        		},
			        		success:function(data){
			        			if(data["error"] == 1){
			        				if(thisClickImageChange.text() == ""){
			        					delete saveHandleImageSrcArr[thisImgText]
			        				}
			        				saveHandleImageSrcArr[nowDataHandle] = "../../../media/img/"+nowDataHandle+"";
			        				thisClickImageChange.html(nowDataHandle);
			        				$("#panel .mainContent .didRecordGoodList-img-show img").trigger("click");

			        			}
			        				closeLodingHandle();
			        			
			        		},
			        		error:function(){
			        			closeLodingHandle();
			        		}
		          		});
		          })


		         haveClickOne = false;     	
        }

        var languageData = {
		        "sProcessing": "处理中...",
		        "sLengthMenu": "显示 _MENU_ 项结果",
		        "sZeroRecords": "没有匹配结果",
		        "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
		        "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
		        "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
		        "sInfoPostFix": "",
		        "sSearch": "搜索:",
		        "sUrl": "",
		        "sEmptyTable": "表中数据为空",
		        "sLoadingRecords": "载入中...",
		        "sInfoThousands": ",",
		        "oPaginate": {
		            "sFirst": "首页",
		            "sPrevious": "上页",
		            "sNext": "下页",
		            "sLast": "末页"
		        },
		        "oAria": {
		            "sSortAscending": ": 以升序排列此列",
		            "sSortDescending": ": 以降序排列此列"
		        }
			}
	   	
	   	//单元格添加对应的class
	   	function everyTableTdGive(content){
	   		var requestData = [];
	   		var tempDict = {
				"render":function(data,type,row){
        		if(content == "didRecordGoodList"){
        				var newDate = new Date(row["recordDate"]); 
        				return newDate.Format("yyyy-MM-dd hh-mm-ss");
        		}
        	},
        	    "targets":2,
        		"className":"noEdit recordDate"
	   		};
	   		requestData.push(tempDict);

	   		saveColumns.forEach(function(v,i){
	   			if(i == 4 || i == 9 || i == 5){
	   				var tempHandleData = {"targets":i,"class":""+v["data"]+" noEdit"};
	   			}else if( i == 10){
	   				var tempHandleData = {"targets":i,"class":""+v["data"]+" areaChange"};
	   			}else{
	   				var tempHandleData = {"targets":i,"class":""+v["data"]+" nothing"};	
	   			}
	   			requestData.push(tempHandleData);
	   		})

	   		return requestData;
	   	}



		// 已录入信息查看
		function overWriteData(showArr,type,content){
				$.ajax({
			        url:"/uinfo/updateClientInfo",
			        type:"GET",
			        datatype:"json",
			        contentType:"application/json; charset=utf-8",
			        beforeSend:function(){
			        	openLoadingHandle();
			        },
			        success:function(data){

			        		$("#panel .mainContent .rightHandleModule ."+content+"").html('<table cellpadding="0" cellspacing="0" border="0" class="cell-border" id="'+content+'Table"></table>');
			        		var dataTablesDef = everyTableTdGive(content);
			        		if(content == "didRecordGoodList"){
			        			
								$('#'+content+"Table").dataTable( {
			        			    language: languageData,
						        	"data": data["data"][type],
						       		 select:true,
						    	 	"scrollY": $("#panel .mainContent").height() -220 ,
   									"scrollCollapse": "true",
     							 	"paging": "false",
						         	"columns": showArr,
						         	"columnDefs":dataTablesDef,
						    });
								if(haveGetClick){
									didRecordGoodListShowImage();
								}
			        		}else{
			        			tableHeaderHeight = 80;

			        			$('#'+content+"Table").dataTable( {
			        			    language:languageData,
							        "data": data["data"][type],
							       	 select:true,
							    	 "scrollY": $("#panel .mainContent").height() -300 ,
	   								 "scrollCollapse": "true",
	     							"paging": "false",
							        "columns": showArr,

						    });
			        		}


			        		closeLodingHandle();
			           },
			           error:function(){
			           		closeLodingHandle();
			           }
			      });
		}

		//录入信息保存按钮初始化
		function initSaveBtn(){
			$("#panel .mainContent .rightHandleModule .rightHandleTitle .didTableSaveData").add($(".markLine .didMoneyHandleBtn")).hide();
			$("#panel .mainContent .rightHandleModule .didMoneyHandleShow-wrap").hide().removeClass().addClass("didMoneyHandleShow-wrap");
				changeDataPostData = {};
				changeDataPostData["goodsData"] = [];
				changeDataPostData["areaData"] =[];
				changeDataSaveId = [];
		}
		initSaveBtn();

		//功能点击切换
		$("#panel .mainContent .leftNavModule .handleList li").unbind("click");
		$("#panel .mainContent .leftNavModule .handleList li").click(function(event){
			event.stopPropagation();
			if(!$(this).hasClass("active")){
				$(this).siblings("li").removeClass("active");
				$(this).addClass("active");
				initSaveBtn();
				switch($(this).attr("class"))
					{
						case "createNewInfo active":
							$("#panel .mainContent .rightHandleModule .addfinancialHandle").add($("#panel .mainContent .rightHandleModule .createNewUserHandle")).add($("#panel .mainContent .rightHandleModule .didRecordGoodList")).add($("#panel .mainContent .rightHandleModule .financialTableShow")).hide();
							$("#panel .mainContent .rightHandleModule .rightHandleTitle .rightHandleTitleData").text("二维码信息");
							$("#panel .mainContent .rightHandleModule .rightHandleTitle .rightHandleTitleBtn").text("生产并打印").show();
							$('#panel .mainContent .rightHandleModule .enterNewQR .enterNewQRWaring').add($("#panel .mainContent .rightHandleModule .createNewUserHandle .createNewUserWaring")).add($("#panel .mainContent .rightHandleModule .addfinancialHandle .addfinancialHandleWaring")).hide();
							$("#panel .mainContent .rightHandleModule .enterNewQR").show();
						break;
						case "lookRecordInfo active":
							$("#panel .mainContent .rightHandleModule .addfinancialHandle").add($("#panel .mainContent .rightHandleModule .createNewUserHandle")).add($("#panel .mainContent .rightHandleModule .enterNewQR")).add($("#panel .mainContent .rightHandleModule .financialTableShow")).hide();
							$('#panel .mainContent .rightHandleModule .enterNewQR .enterNewQRWaring').add($("#panel .mainContent .rightHandleModule .createNewUserHandle .createNewUserWaring")).hide();
							$("#panel .mainContent .rightHandleModule .rightHandleTitle .rightHandleTitleData").text("录入信息");
							$("#panel .mainContent .rightHandleModule .rightHandleTitle .rightHandleTitleBtn").text("删除选中行").show();
							$("#panel .mainContent .rightHandleModule .didRecordGoodList").show();
							overWriteData(saveColumns,"goodsData","didRecordGoodList");
						break;
						case "createNewUser active":
							$("#panel .mainContent .rightHandleModule .addfinancialHandle").add($("#panel .mainContent .rightHandleModule .didRecordGoodList")).add($("#panel .mainContent .rightHandleModule .enterNewQR")).add($("#panel .mainContent .rightHandleModule .financialTableShow")).hide();
							$("#panel .mainContent .rightHandleModule .rightHandleTitle .rightHandleTitleData").text("用户信息");
							$('#panel .mainContent .rightHandleModule .enterNewQR .enterNewQRWaring').add($("#panel .mainContent .rightHandleModule .createNewUserHandle .createNewUserWaring")).add($("#panel .mainContent .rightHandleModule .addfinancialHandle .addfinancialHandleWaring")).hide();
							$("#panel .mainContent .rightHandleModule .rightHandleTitle .rightHandleTitleBtn").text("确定").show();
							$("#panel .mainContent .rightHandleModule .createNewUserHandle").show();
						break;
						case "addfinancial active":
							$("#panel .mainContent .rightHandleModule .createNewUserHandle").add($("#panel .mainContent .rightHandleModule .didRecordGoodList")).add($("#panel .mainContent .rightHandleModule .enterNewQR")).add($("#panel .mainContent .rightHandleModule .financialTableShow")).hide();
							$("#panel .mainContent .rightHandleModule .rightHandleTitle .rightHandleTitleData").text("新增财务信息");
							$('#panel .mainContent .rightHandleModule .enterNewQR .enterNewQRWaring').add($("#panel .mainContent .rightHandleModule .createNewUserHandle .createNewUserWaring")).add($("#panel .mainContent .rightHandleModule .addfinancialHandle .addfinancialHandleWaring")).hide();
							$("#panel .mainContent .rightHandleModule .rightHandleTitle .rightHandleTitleBtn").text("确定").show();
							$("#panel .mainContent .rightHandleModule .addfinancialHandle").show();
						break;
						case "financialTable active":
							$("#panel .mainContent .rightHandleModule .createNewUserHandle").add($("#panel .mainContent .rightHandleModule .didRecordGoodList")).add($("#panel .mainContent .rightHandleModule .enterNewQR")).add($("#panel .mainContent .rightHandleModule .addfinancialHandle")).hide();
							$("#panel .mainContent .rightHandleModule .rightHandleTitle .rightHandleTitleData").text("所有财务记录");
							$('#panel .mainContent .rightHandleModule .enterNewQR .enterNewQRWaring').add($("#panel .mainContent .rightHandleModule .createNewUserHandle .createNewUserWaring")).add($("#panel .mainContent .rightHandleModule .addfinancialHandle .addfinancialHandleWaring")).hide();
							$("#panel .mainContent .rightHandleModule .rightHandleTitle .rightHandleTitleBtn").text("删除选中行").show();
							$("#panel .mainContent .rightHandleModule .financialTableShow").show();
							overWriteData(financialTableName,"financeData","financialTableShow");
						break;
					}
				}


		})


	var changeDataPostData = {};
	changeDataPostData["goodsData"] = [];
	changeDataPostData["areaData"] =[];

	var changeDataSaveId = [];
	var areaChangeSaveId = [];

	function areaHanleFun(ele,newDataName,thisRowData){
				var areaHanleList = {};
				areaHanleList["areastr"] = newDataName;
				areaHanleList["areadate"] = new Date().getTime();
				areaHanleList["goodsid"] = thisRowData["id"];
				changeDataPostData["areaData"].push(areaHanleList);
				areaChangeSaveId.push(thisRowData["id"]);

	}



	var didMoneyBool = true;
	//点击显示财务表内交互事件
	function didMoneyBtnFunction(element){
		$(".markLine .didMoneyHandleBtn").each(function(index,ele){
			$(ele).click(function(event){
				event.stopPropagation();
				 var table = $('#didMoneyHandleShowTable').DataTable();
				//清除搜索
				if($(ele).hasClass("clearSearch")){
					if($("#panel .mainContent .rightHandleModule .didMoneyHandleShow .dataTables_filter").find("input").val() == "") return;
		
					 table.search("").draw();
				}else if($(ele).hasClass("didMoneycloseHandle")){
					//取消
					$(".markLine").hide();
					$("#panel .mainContent .rightHandleModule .didMoneyHandleShow-wrap").removeClass("zoomIn").addClass("zoomOut");
					$("#panel .mainContent .rightHandleModule .didMoneyHandleShow-wrap").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',function(){
	        			$("#panel .mainContent .rightHandleModule .didMoneyHandleShow-wrap").hide().removeClass("zoomOut").css("zIndex","2");
	        			
	        		})
				}else if($(ele).hasClass("didMoneyOkBtn")){
					
					$("#panel .mainContent .rightHandleModule .rightHandleTitle .didTableSaveData").show();
					var tableFun = $("#didRecordGoodListTable").DataTable();
					var thisTr  = $(".didMoneyHandleShow table.dataTable tbody>tr.selected");
					var thisRowDataMoney = tableFun.data()[tableFun.row(element.parent("tr"))[0][0]];
					//确定
					if($.inArray(thisRowDataMoney["id"],changeDataSaveId) == -1){
							changeDataSaveId.push(thisRowDataMoney["id"]);
							if(thisTr.length == 0){
								thisRowDataMoney["financeRecord"] = null;
							}else{
								thisRowDataMoney["financeRecord"] = Number(table.data()[tableFun.row(thisTr)[0][0]]["id"]);
							}
							
							changeDataPostData["goodsData"].push(thisRowDataMoney);

					}else{

							changeDataPostData["goodsData"].forEach(function(v,i){
								if(v["id"] == thisRowDataMoney["id"]){
									if(thisTr.length == 0){
										v["financeRecord"] = null;
									}else{
										v["financeRecord"] = Number(table.data()[tableFun.row(thisTr)[0][0]]["id"]);
									}
								}
							})
					}

					if(thisTr.length == 0){
						$(element).text("");
					}else{
						$(element).text(Number(table.data()[tableFun.row(thisTr)[0][0]]["id"]));	
					}
					
					$(".markLine .didMoneycloseHandle").trigger("click");
				}
			})
		})


		didMoneyBool = false;
	}

	//创建财务记录表
	function createTableFinance(element){
		$(".markLine").show();
		$("#panel .mainContent .rightHandleModule .didMoneyHandleShow-wrap").show().removeClass("zoomOut").addClass("animated zoomIn");
		$("#panel .mainContent .rightHandleModule .didMoneyHandleShow-wrap").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',function(){
			$("#panel .mainContent .rightHandleModule .didMoneyHandleShow-wrap").removeClass("zoomIn");
		})
		$.ajax({
	        url:"/uinfo/updateClientInfo",
	        type:"GET",
	        datatype:"json",
	        contentType:"application/json; charset=utf-8",
	        beforeSend:function(){
	        	openLoadingHandle();
	        },
	        success:function(data){
	        		if(data["error"] == 1){
			        	$("#panel .mainContent .rightHandleModule .didMoneyHandleShow").html('<table cellpadding="0" cellspacing="0" border="0" class="cell-border" id="didMoneyHandleShowTable"></table>');
		        		$("#didMoneyHandleShowTable").dataTable({
		       			"initComplete": function () {
					            var api = this.api();
					            $("#panel .mainContent .rightHandleModule .didMoneyHandleShow-wrap table tbody").on("click",'tr td:not(".select-checkbox")',function(event){
					            	event.stopPropagation();
					            	var clickFunction = $(this).text();
					            	api.search(clickFunction).draw();
					            })
					        },
		        			    language:languageData,
		        			    scrollY:$("#panel .mainContent .rightHandleModule .didMoneyHandleShow-wrap").height() - 220,
						        scrollX:true,
						        "data": data["data"]["financeData"],
								 "scrollCollapse": "true",
	 							// "paging": false,
	 							// "searching":false,
	 							"autoWidth":false,
						        "columns": tempDataArr,
						        "processing":true,

						        "columnDefs": [{
						            orderable: false,
						            className: 'select-checkbox',
						            defaultContent:"",
						            targets:   0
						        }],
						        select: {
						            style:    'os',
						            selector: 'td:first-child'
						        },
						        order: [[ 1, 'asc' ]]

					    });
	        			$("#panel .mainContent .rightHandleModule .didMoneyHandleShow-wrap").css("zIndex","201");
	        			$("#panel .mainContent .rightHandleModule .didMoneyHandleShow-wrap table.dataTable tbody tr").removeClass("selected");
	        			$("#panel .mainContent .rightHandleModule .didMoneyHandleShow-wrap table.dataTable tbody tr").eq(Number($(element).text())-1).children("td").eq(0).trigger("click");
	        			$(".markLine .didMoneyHandleBtn").show();
	        			if(didMoneyBool){
	        				didMoneyBtnFunction(element);
	        			}
		        		}
		        		spinner.stop();

	           },
	           error:function(){
	           		closeLodingHandle();
	           }
	      });		
	}




	//点击表格编辑数据
	function tableDbclickChangeData(){
		$(".didRecordGoodList tbody").unbind("dblclick");

		//财务记录点击
		$(".didRecordGoodList tbody").on("dblclick",'tr td.financeRecord',function(event){
			event.stopPropagation();
			createTableFinance($(this));
		})




		$(".didRecordGoodList tbody").on("dblclick",'tr td:not(.noEdit)',function(event){
			event.stopPropagation();
			if($(this).children(".dblclickChange").length > 0) return;
			//记录当前数值
			var nowData = $(this).text();
			var thisWidth = $(this).width();
			var thisHeight = $(this).height();
			$(this).html("<input type='text' class='dblclickChange'/>");
			$(".dblclickChange").width(thisWidth).height(30).focus().val(nowData);	

			$(".dblclickChange").focusout(function(){
				var ctrl = $(this);
				var newDataName = $(this).val();
				if(nowData == newDataName){
					$(this).parent().text($(this).val())
					$(this).remove();
					return;	
				}else{
					$("#panel .mainContent .rightHandleModule .rightHandleTitle .didTableSaveData").show();
					var table = $('#didRecordGoodListTable').DataTable();
					var thisRowData = table.data()[table.row($(this).parent())[0][0]];

					if($.inArray(thisRowData["id"],changeDataSaveId) == -1){
							changeDataSaveId.push(thisRowData["id"]);
							changeDataPostData["goodsData"].push(thisRowData);
							if($(this).parent().hasClass("areaChange")){
								areaHanleFun(this,newDataName,thisRowData);	
							}
							
					}else{

						if(ctrl.parent().hasClass("areaChange")){
							if($.inArray(thisRowData["id"],areaChangeSaveId) == -1){
								areaHanleFun(ctrl,newDataName,thisRowData);
							}else{
								changeDataPostData["areaData"].forEach(function(v,i){
									if(v["goodsid"] == thisRowData["id"]){
										v["areastr"] = newDataName;
									}
								})								
							}

						}else{
							changeDataPostData["goodsData"].forEach(function(v,i){
								if(v["id"] == thisRowData["id"]){
									v[ctrl.parent().attr("class").replace(/^\s*/,"").split(" ")[0]] = newDataName;
								}
							})
						}

					}

					thisRowData[$(this).parent().attr("class").replace(/^\s*/,"").split(" ")[0]] = newDataName;
					$(this).parent().text($(this).val())
					$(this).remove();
					
				}

			})
		})



		//保存按钮点击事件
		$("#panel .mainContent .rightHandleModule .rightHandleTitle .didTableSaveData").unbind("click");
		$("#panel .mainContent .rightHandleModule .rightHandleTitle .didTableSaveData").click(function(event){
			event.stopPropagation();
			// ajax
			$.ajax({
				url:"/uinfo/updateServerInfo",
	       		type:"POST",
	        	datatype:"json",
	        	headers:{"contentType":"application/json; charset=utf-8","X-FROM":"l-web"},
	        	data:JSON.stringify(changeDataPostData),
	       	 	beforeSend:function(){
	       	 		openLoadingHandle();
	       	 	},
	       	 	success:function(data){
	       	 		if(data["error"] == 1){
	       	 			initSaveBtn();
	       	 		}
	       	 		closeLodingHandle();
	       	 	},
	       	 	error:function(){
	       	 		closeLodingHandle();
	       	 	}
			});

			// ------end
		})
	}


























		var postUrl = null;
		var handlePost = {};

		// 生产二维码按钮点击的时候
		$("#panel .mainContent .rightHandleModule .rightHandleTitle .rightHandleTitleBtn").unbind("click");
		$("#panel .mainContent .rightHandleModule .rightHandleTitle .rightHandleTitleBtn").click(function(event){

			event.stopPropagation();
			handlePost = {};
			if($("#panel .mainContent .leftNavModule .handleList .active").hasClass("createNewInfo")){
				if($("#panel .mainContent .rightHandleModule  .enterNewQR .goodNum").val() == "" || $("#panel .mainContent .rightHandleModule  .enterNewQR .userPeople").val() == "" || $("#panel .mainContent .rightHandleModule  .enterNewQR .userPartment").val() == "" || $("#panel .mainContent .rightHandleModule  .enterNewQR .areaInfo").val() == ""){
					$('#panel .mainContent .rightHandleModule .enterNewQR .enterNewQRWaring').text("输入内容不能为空").show();
					return;
				}
				theDate = new Date();
				
				postUrl = "/uinfo/createNewQrcode";
				handlePost  = {
					"goodNum":Number($("#panel .mainContent .rightHandleModule  .enterNewQR .goodNum").val()),
					"goodInfo":{
						"user":$("#panel .mainContent .rightHandleModule  .enterNewQR .userPeople").val(),
						"useDepartment":$("#panel .mainContent .rightHandleModule  .enterNewQR .userPartment").val(),
						"areastr":$("#panel .mainContent .rightHandleModule  .enterNewQR .areaInfo").val(),
						"date":theDate.getTime(),
						"icon":$("#panel .mainContent .rightHandleModule  .enterNewQR .icon").val()
					}
				}

			}else if($("#panel .mainContent .leftNavModule .handleList .active").hasClass("createNewUser")){
				if($("#panel .mainContent .rightHandleModule .createNewUserHandle label .createNewUserNewName").val() == "" || $("#panel .mainContent .rightHandleModule .createNewUserHandle label .createNewUserSecond").val() == "" || $("#panel .mainContent .rightHandleModule .createNewUserHandle label .createNewUserpw").val() == ""){
					$("#panel .mainContent .rightHandleModule .createNewUserHandle .createNewUserWaring").text("输入内容不能为空").show();
					return;
				}
				if($("#panel .mainContent .rightHandleModule .createNewUserHandle label .createNewUserSecond").val() != $("#panel .mainContent .rightHandleModule .createNewUserHandle label .createNewUserpw").val()){
					$("#panel .mainContent .rightHandleModule .createNewUserHandle .createNewUserWaring").text("两次密码输入不一致").show();
					return;
				}
				postUrl  = "/uinfo/createUserByAdmin";
				handlePost = {"username":$("#panel .mainContent .rightHandleModule .createNewUserHandle label .createNewUserNewName").val(),"password":$("#panel .mainContent .rightHandleModule .createNewUserHandle label .createNewUserSecond").val()};
			}else if($("#panel .mainContent .leftNavModule .handleList .active").hasClass("addfinancial")){
				postUrl = "/uinfo/addNewRecord";
				//遍历input
				$("#panel .mainContent .rightHandleModule .addfinancialHandle label input").each(function(index,ele){

					handlePost[$(ele).attr("name")] = $(ele).val()
				})

			}else if($("#panel .mainContent .leftNavModule .handleList .active").hasClass("financialTable")){
				if($(".financialTableShow table.dataTable tbody tr.selected").length == 0)return;
				 var table = $('#financialTableShowTable').DataTable();
				 var tempSaveArr = [];
				 postUrl = "/uinfo/removeRecord";

				for(var i = 0; i < table.rows(".selected").data().length; i++){
					tempSaveArr.push(table.rows(".selected").data()[i].id);
				}
				 handlePost["id"] = tempSaveArr;

			}else{
				//已录入信息表删除
				if($(".didRecordGoodList table.dataTable tbody tr.selected").length == 0)return;
				var table = $('#didRecordGoodListTable').DataTable();
				var tempSaveArr = null;
				postUrl = "/uinfo/deleteGoodsOrShow";

				for(var i = 0; i < table.rows(".selected").data().length; i++){
					tempSaveArr = table.rows(".selected").data()[i].id;
				}
				 handlePost["goodsid"] = Number(tempSaveArr);
				 handlePost["method"] = "remove" ;
			}


			$.ajax({
				url:postUrl,
				type:"POST",
	     		dataType:"json",
	      		contentType:"application/json; charset=utf-8",
	     		data:JSON.stringify(handlePost),
	     		beforeSend:function(){
	     			openLoadingHandle();
	     		},
	     		success:function(data){

	     			$('#panel .mainContent .rightHandleModule .enterNewQR .enterNewQRWaring').hide();

	     			if(data["status"] == "success"){
	     				closeLodingHandle();
	     				if($("#panel .mainContent .leftNavModule .handleList .active").hasClass("createNewUser")){
	     					$("#panel .mainContent .rightHandleModule .createNewUserHandle .createNewUserWaring").text("创建成功").show();
	     					$("#panel .mainContent .rightHandleModule .createNewUserHandle label input").val("");
	     					setTimeout(function(){
	     						$("#panel .mainContent .rightHandleModule .createNewUserHandle .createNewUserWaring").hide();
	     					},2000)
	     				}else if($("#panel .mainContent .leftNavModule .handleList .active").hasClass("createNewInfo")){
	     					$('#panel .mainContent .rightHandleModule .enterNewQR .enterNewQRWaring').text("打印成功").show();
	     					$("#panel .mainContent .rightHandleModule  .enterNewQR label input").val("");
	     					setTimeout(function(){
	     						$('#panel .mainContent .rightHandleModule .enterNewQR .enterNewQRWaring').hide();
	     					},2000)
	     				}else if($("#panel .mainContent .leftNavModule .handleList .active").hasClass("addfinancial")){

	     						$("#panel .mainContent .rightHandleModule .addfinancialHandle .addfinancialHandleWaring").text("新增成功").show();
	     						$("#panel .mainContent .rightHandleModule .addfinancialHandle label input").val("");

		     					setTimeout(function(){
		     						$("#panel .mainContent .rightHandleModule .addfinancialHandle .addfinancialHandleWaring").hide();
		     					},2000)
	     				}else if($("#panel .mainContent .leftNavModule .handleList .active").hasClass("financialTable")){
	     						 var table = $('#financialTableShowTable').DataTable();
	     						 table.rows(".selected").remove().draw(false);
	     				}else{
	     						 var table = $('#didRecordGoodListTable').DataTable();
	     						  table.rows(".selected").remove().draw(false);
	     				}
	     			}else{
	     				if($("#panel .mainContent .leftNavModule .handleList .active").hasClass("createNewUser")){
	     					$("#panel .mainContent .rightHandleModule .createNewUserHandle .createNewUserWaring").text("用户名已使用").show();
	     				}else if($("#panel .mainContent .leftNavModule .handleList .active").hasClass("addfinancial")){
	     					$("#panel .mainContent .rightHandleModule .addfinancialHandle .addfinancialHandleWaring").text("输入格式错误").show();
	     				}
	     				closeLodingHandle();
	     			}
	     		},
	     		error:function(){
	     			if($("#panel .mainContent .leftNavModule .handleList .active").hasClass("createNewUser")){
	     				$("#panel .mainContent .rightHandleModule .createNewUserHandle .createNewUserWaring").text("创建失败").show();
	     			}else if($("#panel .mainContent .leftNavModule .handleList .active").hasClass("addfinancial")){
	     				$("#panel .mainContent .rightHandleModule .addfinancialHandle .addfinancialHandleWaring").text("输入格式错误").show();
	     			}

	     			closeLodingHandle();
	     		}
			})
		});
	})
