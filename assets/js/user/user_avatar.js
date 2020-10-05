$(function () {
  var layer = layui.layer
  // 复制粘贴的,按步骤粘
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比,1代表正方形区域(长宽比),下面数值可以改
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }
  // 1.3 创建裁剪区域
  $image.cropper(options)
  // 为上传按钮绑定点击事件
  $('#btnChooseImage').on('click', function () {
    $('#file').click()
  })
  // 为文件选择框绑定change事件
  $('#file').on('change', function (e) {
    // 获取用户文件,target属性里的files数组
    var filelist = e.target.files
    // console.log(filelist);
    // 长度0就是没选
    if (filelist.length === 0) {
      return layer.msg('请选择照片！')
    }
    // 参考cropper说明,复制粘贴
    // 1拿到用户选择的文件
    var file = e.target.files[0]
    // 2将文件转化为路径
    var imgURL = URL.createObjectURL(file)
    // 3. 重新初始化裁剪区域
    $image
      // 销毁旧的
      .cropper('destroy')
      // 重新设置路径
      .attr('src', imgURL)
      // 初始化区域
      .cropper(options)
  })

  // 为确定按钮，绑定点击事件
  $('#btnUpload').on('click', function () {
    // 1拿到裁剪后的头像,复制文档
    var dataURL = $image
      .cropper('getCroppedCanvas', {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
    // base64就是用字符串表示图片,减少图片请求
    // 缺点,体积大30%
    // 适用于一些小图片,头像什么的
    // 2调接口传到服务器
    $.ajax({
      method: 'POST',
      url: '/my/update/avatar',
      data: {
        avatar: dataURL
      },
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('更换头像失败')
        }
        layer.msg('更换头像成功！')
        // 又调用父页面函数,渲染头像
        window.parent.getUserInfo()
      }
    })
  })
})
