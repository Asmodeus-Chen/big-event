$(function () {
    // 调用获取用户信息函数
    getUserInfo()
    var layer = layui.layer
    $('#btnLogout').on('click', function () {
        // console.log('ok');
        // 提示用户退出
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            console.log('ok');
            //do something
            // 1. 清空本地token
            localStorage.removeItem('token')
            // 2. 重新跳转到登录
            location.href = '/login.html'
            // 关闭询问框
            layer.close(index)
        })
    })
})

// 定义获取用户信息函数
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // 请求头  
        // headers: {
        // Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('失败了')
            }
            // 渲染头像
            renderAvatar(res.data)
        },
        // 无论成败最后都有complete函数,不让他在地址栏跳转
        // complete: function (res) {
        // console.log(res);
        // 用res.responseJSON拿到服务器相应的数据
        // // if (res.responseJSON.status === 1 && res.responseJSON.message === '身份验证失败!') {
        // 1. 清空本地token
        // localStorage.removeItem('token')
        // 2. 重新跳转到登录
        // location.href = '/login.html'
        // }
        // }
    })
}

// 定义渲染头像函数
function renderAvatar(user) {
    // 1.获取名
    var name = user.nickname || user.username
    // 2.欢迎文字
    $('#welcome').html('欢迎&nbsp;&nbsp' + name)
    // 3.判断
    if (user.user_pic !== null) {
        // 图片
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 文本头
        $('.layui-nav-img').hide()
        // 第一个字母大写
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}