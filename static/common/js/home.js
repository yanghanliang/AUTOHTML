var t = n = 0,
    count;
$(document).ready(function () {
    count = $(".oUlplay li").length;
    $(".oUlplay li:not(:first-child)").hide();
    $("#banner li").click(function () {
        var i = ($(this).index() + 1) - 1;
        n = i;
        if (i >= count) {
            return;
        }
        $(".oUlplay li").filter(":visible").fadeOut(500).parent().children().eq(i).fadeIn(500);
        $(this).addClass("cur").siblings().removeClass("cur");
    });
    t = setInterval("showAuto()", 3000);
    $(".oUlplay").hover(function () {
        clearInterval(t);
    }, function () {
        t = setInterval("showAuto()", 3000);
    });
});

function showAuto() {
    n = n >= (count - 1) ? 0 : ++n;
    $("#banner li").eq(n).trigger('click');
}

function linkage_rolling() { // 联动滚动
    var switch_ele = $('.cm_right>ul li') // 移动的元素
    var switch_ele2 = $('.cm_left div')
    var se_box = $('.cm_right>ul') // 移动元素的盒子
    var se_box2 = $('.cm_left')
    var y = parseInt(switch_ele.css('height'))
    var y2 = parseInt(switch_ele2.css('height'))
    var top = $('.switch .btn_top') // 向上的按钮
    var bottom = $('.switch .btn_bottom') // 向下的按钮
    var i_ele = $('.btn_top i')[0] // 向上的i元素
    var i_ele2 = $('.btn_bottom i')[0] // 向下的i元素
    var mouse_ele = $('.content_middle') // 鼠标移入移出的元素
    var lock = true // 锁


    top.click(function () { // 点击向上移动
        if (lock) {
            lock = false // 关闭锁
            se_box.animate({ // 向上移动一个单位
                marginTop: -y
            }, 1000, function () {
                $('.cm_right>ul li').eq(0).appendTo(se_box) // 将第一个移动的元素放到最后面
                $(this).css('marginTop', 0) // 重置位置
            })

            se_box2.animate({
                marginTop: -y2
            }, 1000, function () {
                $('.cm_left div').eq(0).appendTo(se_box2)
                $(this).css('marginTop', 0)
                lock = true // 开启锁
            })
        }
    })

    bottom.click(function () { // 点击向下移动
        if (lock) {
            lock = false // 关闭锁
            var last_ele = $('.cm_right>ul li').eq(switch_ele.length - 1) // 获取最后一个元素
            var last_ele2 = $('.cm_left div').eq(switch_ele2.length - 1)
            $('.cm_right>ul li').first().before(last_ele) // 将最后一个元素放到第一个元素中
            se_box.css('marginTop', -y) // 向上定位一个单位(初始化位置)
            se_box.animate({
                marginTop: 0 // 向下移动(重置位置)
            }, 1000)

            $('.cm_left>div').first().before(last_ele2)
            se_box2.css('marginTop', -y2)
            se_box2.animate({
                marginTop: 0
            }, 1000, function () {
                lock = true // 开启锁
            })
        }
    })

    var timer = setInterval(function () { // 设置自动滚动的定时器
        top.trigger('click')
    }, 4000)

    mouse_ele.mouseenter(function () { // 鼠标移入
        if (event.target === i_ele || event.target === i_ele2) {
            return false // 兼容谷歌浏览器
        } else {
            top.css('display', 'block')
            bottom.css('display', 'block')
            clearInterval(timer) // 清除定时器
        }
    })

    mouse_ele.mouseleave(function () { // 鼠标移出
        if (event.target === i_ele || event.target === i_ele2) {
            return false // 兼容谷歌浏览器
        } else {
            top.css('display', 'none')
            bottom.css('display', 'none')
            timer = setInterval(function () { // 开启自动滚动的定时器
                top.trigger('click')
            }, 4000)
        }
    })
}

function roll() { // 滚动
    var switch_ele = $('.testimonials-list li') // 移动的元素
    var x = parseInt(switch_ele.css('width')) + 20
    var icon = $('.s-btn-sec li')
    var se_box = $('.testimonials-list') // 移动元素的盒子
    var index = 1
    var next = $('.next-btn')
    var prev = $('.prev-btn')
    var mouse_ele = $('.inner-con') // 鼠标移入移出元素
    var lock = true // 添加锁
    var icon_div = $('.prev-btn i')[0]
    var icon_div2 = $('.next-btn i')[0]
    next.click(function () {
        if (lock) {
            lock = false // 关闭锁
            $('.testimonials-list').animate({
                'marginLeft': -x
            }, 700, function () {
                $('.testimonials-list li').first().appendTo($(this))
                $(this).css('marginLeft', 20) // 重置样式
                lock = true // 开锁
            })
            index++
            index = index > 2 ? 0 : index
            icon.eq(index).addClass('cur').siblings().removeClass()
        }
    })

    prev.click(function () {
        if (lock) {
            lock = false // 关闭锁
            var last_ele = $('.testimonials-list li').last()
            $('.testimonials-list li').first().before(last_ele)
            se_box.css('marginLeft', -x)
            se_box.animate({
                'marginLeft': 20
            }, 1000, function () {
                lock = true
            })

            index--
            index = index < 0 ? 2 : index
            icon.eq(index).addClass('cur').siblings().removeClass()
        }
    })

    var timer = setInterval(function () {
        next.trigger('click')
    }, 2000)

    mouse_ele.mouseenter(function () {
        next.css('display', 'block')
        prev.css('display', 'block')
        clearInterval(timer)
    })

    mouse_ele.mouseleave(function () {
        if (event.target === icon_div || event.target === icon_div2) {
            return false // 兼容谷歌浏览器
        } else {
            next.css('display', 'none')
            prev.css('display', 'none')
            timer = setInterval(function () {
                next.trigger('click')
            }, 2000)
        }
    })
}