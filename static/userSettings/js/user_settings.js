exclusivity('.radio span') // 单选框样式切换

selectfn('.ll_content .time .fixed_select li', '.ll_content .time .label_right', '.ll_content .time .fixed_select') // 标签类型下拉选择
selectfn('.ll_content .function .fixed_select li', '.ll_content .function .label_right', '.ll_content .function .fixed_select') // 标签类型下拉选择
bios_echSwitch('.left_switch li', '.right_switch>.right', '.left_switch li') // tab切换
auto.popup('.dele_pop', '.mailbox .change_phone', '.dele_pop .determine', '.dele_pop .cancel') // 更换手机号


function cancelfn() { // 点击取消按钮
    var content = $('.set_up .describe').text(); // 获取描述的内容
    $('.verifying_btn .cancel').click(function () { // 注册点击取消时的事件
        if ($('.set_up .describe').css('display') === 'none') {
            $('.set_up .describe').css('display', 'block')
        }

        $('.set_up .vc_box').remove(); // 删除新增的元素
        $('.set_up .describe').text(content); // 还原描述的文字
        $('.verifying_mailbox').css('display', 'inline-block'); // 隐藏当前标签
        index = 0; // 重置点击次数记录
    })
}

$('.verifying_mailbox').click(function () { // 点击验证邮箱
    var index = 0; // 记录点击的次数
    $('.set_up .describe').text('旧邮箱：1870256215@qq.com，验证邮件已发出，去查收或再发一次。'); // 修改描述的文字
    $(this).css('display', 'none'); // 隐藏当前标签
    // 添加元素
    $(this).parent().append(
        '<div class="vc_box"><span>验证码：</span><div class="box_text"> <input type="text"> </div> <div class="verifying_btn"> <button class="next">下一步</button> <button class="cancel">取消</button> </div> </div>'
    );

    cancelfn() // 注册点击取消时的事件

    $('.verifying_btn .next').click(function () { // 注册点击下一步的事件
        if (index === 2) { // 第二次点击下一步
            var if_ok = true; // 返回验证码是否正确存放在这
            // $.ajax({
            //     url: '',
            //     type: '',
            //     dataType: 'jsonp',
            //     data: $('.box_text input').text(),
            //     success: function() {
            //         $('.set_up .describe').css('display', 'none');
            //         $('.vc_box span').text('新邮箱 : ')
            //     },
            //     error: function() {

            //     }
            // })

            if (if_ok) {
                $('body').append(
                    '<div class="success_pop"> <div class="deel_box"> <h1><i class="iconfont icon-zhengque" style="color: #29f340;"></i> 修改成功</h1> <h2>恭喜您！成功修改邮箱，可以通过邮箱登录。</h2> <div class="btn_box"> <a href="#" class="dele_ok">返回</a> </div> <div class="dele_colse"> <i class="iconfont icon-icon-"></i> </div> </div> </div>'
                )
                $('.success_pop .icon-icon-').click(function () { // 关闭弹窗
                    $('.success_pop').remove();
                })
                $('.success_pop .dele_ok').click(function () { // 关闭弹窗
                    $('.success_pop').remove();
                })

                $('.verifying_btn .cancel').click() // 还原
            } else {
                $('body').append(
                    '<div class="success_pop"> <div class="deel_box"> <h1><i class="iconfont icon-guanbi1" style="color: red;"></i> 错误</h1> <h2>验证码不正确，请输入有效验证码。</h2> <div class="btn_box"> <a href="#" class="dele_ok">确定</a> </div> <div class="dele_colse"> <i class="iconfont icon-icon-"></i> </div> </div> </div>'
                )
                $('.success_pop .icon-icon-').click(function () { // 关闭弹窗
                    $('.success_pop').remove();
                    cancelfn() // 注册点击取消时的事件
                })
                $('.success_pop .dele_ok').click(function () { // 关闭弹窗
                    $('.success_pop').remove();
                    cancelfn() // 注册点击取消时的事件
                })
            }
        } else if (index == 0) { // 第一次点击下一步
            $('.set_up .describe').css('display', 'none');
            $('.vc_box span').text('新邮箱 : ')
            $('.vc_box .box_text').after('<div class="error clearfix" style="margin-left: 0px;"> <i class="iconfont icon-tishi"></i><span>邮箱未注册或格式不正确</span> </div>')
            $('.vc_box .box_text').css('border-color', '#f27a7a')
            $('.vc_box .box_text').after(' <i class="iconfont icon-zhengque" style="color: #02ffd0;"></i>')
        } else {
            var mailbox = '1870256215@qq.com';
            $('.set_up .describe').text("新邮箱：" + mailbox + "，验证邮件已发出，去查收或再发一次。"); // 修改描述的文字
            $('.vc_box span').text('验证码 : ')
            $('.set_up .describe').css('display', 'block');
        }

        index++
    })
})


// 右边联系的小图标效果(滑入滑出)
auto.iconSlideEffect()


$('.hand_box ul button').click(function() { // 更换头像
    $('.right>.hand_box').css('display', 'none')
    $('.right>table').css('display', 'none')
    $('.right>.last_login').css('display', 'none')
    $('.right_switch .change_head').css('display', 'block')
    $('.change_head .cancel').click(function() {
        $('.right>.hand_box').css('display', 'block')
        $('.right>table').css('display', 'block')
        $('.right>.last_login').css('display', 'block')
        $('.right_switch .change_head').css('display', 'none')
    })
})
