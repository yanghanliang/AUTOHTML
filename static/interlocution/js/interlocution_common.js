// function icon_switch() { // 右边联系的小图标效果(滑入滑出)
//     var lock = true; // 设置锁

//     $('.contact').mouseenter(function () { // 右边联系的小图标效果(滑入滑出)
//         if (lock) {
//             lock = false; // 关锁
//             $('.contact>i').removeClass('icon-ai-message').addClass('icon-icon-'); // 切换图标
//             $('.contact .close').animate({ // 滑出
//                 width: 120
//             }, 300, function() {
//                 lock = true;
//             })
//         }
//     });

//     $('.contact').mouseleave(function () { // 右边联系的小图标效果(滑入滑出)
//         if(lock) {
//             $('.contact>i').removeClass('icon-icon-').addClass('icon-ai-message'); // 切换图标
//             $('.contact .close').animate({ // 滑入
//                 width: 0
//             }, 300, function() {
//                 lock = true;
//             })
//         }
//     });
// }

function interlocution_public() {
    auto.iconSlideEffect() // 右边联系的小图标效果(滑入滑出)

    $(window).scroll(function () { // 置顶的小效果
        if ($(this).scrollTop() > 300) {
            $('.stick').css('display', 'block');
            $('.stick').click(function () {
                $(window).scrollTop(0)
            })
        } else {
            $('.stick').css('display', 'none');
        }
    });

    bios_echSwitch('.tab_switch>span', '.content>.w4 .box', '.tab_switch>span') // tab切换

    selectfn('.add_pop .label .fixed_select li', '.add_pop .label .label_right', '.add_pop .label .fixed_select') // 标签类型下拉选择

    selectfn('.add_pop .problem .fixed_select li', '.add_pop .problem .label_right', '.add_pop .problem .fixed_select') // 问题类型下拉选择
}