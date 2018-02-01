$(function(){
	
	// $("#loginForm #username,#loginForm #userpwd").on("focusout",function(event){
 //   		event.stopPropagation();
 //   		if(/^\s*$/.test($(this).val())){
 //   			$(this).parent().css("borderColor","red");
 //   		}else{
 //   			$(this).parent().css("borderColor","#dedede");
 //   		}
 //  	 });
	 
  //修改密码点击事件
  $(".loginContent .loginFormWrap .changePassword p").unbind("click");
  $(".loginContent .loginFormWrap .changePassword p").click(function(event){
      event.stopPropagation();
      $(".loginContent .loginFormWrap .loginWaring").add($(".loginContent .loginFormWrap .normalShow")).hide();
      $(".loginContent .loginFormWrap .changeNameWrap").show();
      // $(".loginContent .loginFormWrap label span").text("新密码")
  })

  $(".loginContent .loginFormWrap input").focus(function(){
      $(this).parent().css("borderColor","#2e8fff");
  })

    $(".loginContent .loginFormWrap input").focusout(function(){
      $(this).parent().css("borderColor","#dedede");
  })
  //修改密码操作
  $(".loginContent .loginFormWrap .changeNameWrap .changeNameClose").unbind("click");
  $(".loginContent .loginFormWrap .changeNameWrap .changeNameClose").click(function(event){
    event.stopPropagation();
    $(".loginContent .loginFormWrap .changeNameWrap label input").val("");
    $(".loginContent .loginFormWrap .changeNameWrap").add($(".loginContent .loginFormWrap .changeNameWrap .changeNameWaring")).hide();
    $(".loginContent .loginFormWrap .normalShow").show();

  })


  $(".loginContent .loginFormWrap .changeNameWrap .changeNameBtn").unbind("click");
  $(".loginContent .loginFormWrap .changeNameWrap .changeNameBtn").click(function(event){
     event.stopPropagation();
      //判断两次密码是否输入一致
      if($(".loginContent .loginFormWrap .changeNameWrap #changeNameHandle").val() != $(".loginContent .loginFormWrap .changeNameWrap #changeNameNew").val()){
        $(".loginContent .loginFormWrap .changeNameWrap .changeNameWaring").show().text("两次密码输入不一致");
        return;
      }
   
    $.ajax({
        url:"/uinfo/changepwd",
        type:"POST",
        data:"json",
        contentType:"application/json; charset=utf-8",
        data:JSON.stringify({"username":"admin","newpwd":$(".loginContent .loginFormWrap .changeNameWrap #changeNameHandle").val()}),
        success:function(data){
            if(data["status"] == "success"){
                $(".loginContent .loginFormWrap .changeNameWrap .changeNameClose").trigger("click");
                $(".loginContent .loginFormWrap .changeNameWrap .changeNameWaring").hide();
            }else{
                $(".loginContent .loginFormWrap .changeNameWrap .changeNameWaring").show().text("修改密码失败");
            }
           }
      });
  })

  //登录按钮
  $(".loginContent .loginFormWrap .loginBtn").unbind("click");
	$(".loginContent .loginFormWrap .loginBtn").click(function(event) {
      if($("#loginForm #username").val() == "" || $("#loginForm #userpwd").val() == ""){
          $(".loginContent .loginFormWrap .loginWaring").show().text("用户名密码不能为空");
          return;
      }
      if($("#loginForm #username").val() != "admin"){
         $(".loginContent .loginFormWrap .loginWaring").show().text("用户名密码错误");
         return;
      }

      
      $.ajax({
              url:"/uinfo/adminLogin",
              type:"POST",
              contentType:"application/json; charset=utf-8",
              data:"json",
              // processData: false,
              // contentType:false,
              data:JSON.stringify({"password":$("#loginForm #userpwd").val()}),
              success:function(data){
                  if(data["status"] == "success"){
                    $(".loginContent .loginFormWrap .loginWaring").hide();
                    window.location.href='/uinfo/index';
                  }else{
                    $(".loginContent .loginFormWrap .loginWaring").show().text("密码错误");
                  }
                 }
            });
   	 });
    
})
