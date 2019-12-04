$(function () {
    /*登录思路 
    1.给登录按钮注册点击事件
      * 注意点：表单按钮需要阻止默认跳转
    2.获取输入框数据
    3.非空判断
    4.ajax发送服务器
    5.数据响应之后 跳转首页
    */
    //1.给登录按钮注册点击事件
$('.input_sub').click(function (e) {
    // 表单按钮需要阻止默认跳转事件
    e.preventDefault();

    // 2.获取输入框输入数据
    var username = $('.input_txt').val();
    var password = $('.input_pass').val();

    // 3.非空判断
    if (username.length == 0 || password.length == 0) {
        // alert('请输入用户名和密码!!!');
        // (1) 设置模态框提示文本
        $('.modal-body>p').text('请输入用户名和密码');
        // (2) 弹出bootstarp模态框
        $('#myModal').modal();
        return;
    }

    // ajax 发送请求
    $.ajax({
        url:'http://localhost:8080/api/v1/admin/user/login',
        type:'post',
        dataType:'json',
        data:{
            username: username,
            password: password,
        },
        success: function(backData){
            console.log(backData);
            if (backData.code == 200) {
                // alert('登录成功');
                 //(1)设置模态框文本
              $('.modal-body>p').text('登录成功');
              //（2）弹出bootstrap模态框
              $('#myModal').modal();

              /* 
              细节: 模态框一出来页面就跳转<导致用户看不到模态框
              解决方案: 等模态框出来,用户点击模态框的确认按钮后再跳转
              */
             $('#myModal').on('hidden.bs.modal', function (e) {
                // do something...
                //跳转首页
                window.location.href = './index.html';
              })
            }else {
                // alert(backData.msg);
              //(1)设置模态框文本
              $('.modal-body>p').text(backData.msg);
              //（2）弹出bootstrap模态框
              $('#myModal').modal();
            }
        }
    });
})
  });
