// jq自带的函数,能获取根路径
// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 调用 ajaxPrefilter 这个函数
//拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
  // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
  options.url = 'http://ajax.frontend.itheima.net' + options.url
  // 给权限借口设headers
  if (options.url.indexOf('/my/') !== -1) {
    options.headers = {
      Authorization: localStorage.getItem('token') || ''
    }
  }
  // 全局统一挂载complete回调函数
  options.complete = function (res) {
    console.log(res);
    // 用res.responseJSON拿到服务器相应的数据
    if (res.responseJSON.status === 1 && res.
      responseJSON.message === "身份认证失败！") {
      // 1. 清空本地token
      localStorage.removeItem('token')
      // 2. 重新跳转到登录
      location.href = '/login.html'
    }
  }
})
