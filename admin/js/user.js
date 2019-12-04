$(function () {
    /* 1.页面一加载:请求用户详细数据 */
    $.ajax({
        url: BigNew.user_detail,
        type: 'get',
        dataType: 'json',

        success: function (backData) {
            console.log(backData);
            // $('.username').val(backData.data.username);
            // $('.nickname').val(backData.data.nickname);
            // $('.email').val(backData.data.email);
            // $('.password').val(backData.data.password);
            // 服务器返回对象属性值 与 表单类名一致 ,可以使用遍历对象来快速赋值

            for(var key in backData.data){
                console.log(key);
                $('.' + key).val(backData.data[key])
            }
            $('.user_pic').attr('src', backData.data.userPic);
        }
    });

    // 2. 文件预览
    //1.给file表单元素注册onchange事件
    $('#exampleInputFile').change(function () {
        //1.2 获取用户选择的图片
        var file = this.files[0];
        //1.3 将文件转为src路径
        var url = URL.createObjectURL(file);
        //1.4 将url路径赋值给img标签的src
        $('.user_pic').attr('src', url);
    });

    // 3.文件上传
    $('.btn').on('click',function(e){
        //禁用表单默认提交事件
        e.preventDefault();
        //创建FormData对象：参数是表单dom对象
        var fd = new FormData($('#form')[0]);
        $.ajax({
            url:BigNew.user_edit,
            type:'post',
            dataType:'json',
            data:fd,
            contentType: false,
            processData: false,
            success: function(backData){
                console.log(backData);
                if (backData.code == 200) {
                    alert('修改成功!!!');
                    // 刷新首页
                    /* 
                    1. 发现问题:在user.html中如何刷新index.fa-html
                    2. 分析问题: user.html页面 的window.parent 就是 index.html页面
                    3. 解决问题: 刷新父窗口 window.parent.location.reload()
                    */
                //    window.parent.location.reload();
                      window.parent.location.reload();
                }
            }
        });
    });
})