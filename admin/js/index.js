$(function () {


    // 1页面一加载显示顶部栏个人加载信息
    $.ajax({
        url:'http://localhost:8080/api/v1/admin/user/info',
        type:'get',
        dataType:'json',      
        success: function(backData){
        console.log(backData);
        $('.user_info>img').attr('src',backData.data.userPic);
        $('.user_center_link>img').attr('src',backData.data.userPic);
        $('.user_info>span').text(backData.data.nickname);
        }
    });

    // 2.退出登录:清除token,跳转登录页面
    $('.logout').click(function () {
        // 清除token
        localStorage.removeItem('token');
        // 跳转页面
        alert('确认退出???');
        window.location.href = './login.html'
    });

    // 3.左侧导航栏一级菜单点击高亮
    $('.level01').click(function () {
        // 1.排他思想修改样式
        $(this).addClass('active').siblings().removeClass('active');
        // 如果是文章管理div.还需要有下拉动画
        if ($(this).index() == 1) {
            // 上下滑动动画
            $('.level02').slideToggle();
            // 右侧向下旋转
            $('.icon-arrowdownl').toggleClass('rotate0');
            // 默认选中第一个: 主动触发第一个li元素点击事件
            $('.level02>li a:eq(0)')[0].click();//注意要选择a标签 以为a标签才有默认跳转的功能

        }else{//如果不是文章管理，默认取消所有二级菜单高亮
            $('.level02>li').removeClass('active');
        }
    });

    // 4.左侧导航栏二级菜单点击高亮
    $('.level02>li').click(function () {
        // 排他思想
        $(this).addClass('active').siblings().removeClass('active');
    })

    // -----------------------------------------------------
    // //(1).实例化ajax对象
    // var xhr = new XMLHttpRequest();
    // //(2).设置请求方法和地址
    // //get请求的数据直接添加在url的后面 格式是 url?key=value
    // xhr.open('get', 'http://localhost:8080/api/v1/admin/user/info');
    // // 发送token ,设置请求头Authorization
    // xhr.setRequestHeader('Authorization',localStorage.getItem('token'))
    // //(3).发送请求
    // xhr.send();
    // //(4).注册回调函数
    // xhr.onload = function() {
    //     console.log(xhr.responseText)
    // };
})