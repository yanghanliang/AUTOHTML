// 创建父类(公共)构造函数
var PublicFunction = function () {
    this.topHeadPortraitEffect() // 顶部头像效果
}

// 创建父类原型方法-start

/*
    简单提示弹窗
    show        点击这个元素创建"简单提示弹窗"-必选项
    h1          主标题-可选项
    h2          副标题-可选项
    open        自动弹窗-可选项(调用该方法时自动弹窗)
    callback    可执行自己的代码逻辑, 参数类型是函数(方法)-可选项
*/
PublicFunction.prototype.popup_delete = function (show, h1, h2, open, callback) {
    function logic() {
        var title = h1 ? h1 : '是否确认删除该工作流？'
        var subtitle = h2 ? h2 : '你是否确认删除该工作流，删除之后不可恢复！'
        // html 的基本结构
        var html_str =
            '<div class="dele_pop">\
            <div class="deel_box">\
                <h1>' +
            title + '</h1>\
                <h2>' + subtitle +
            '</h2>\
                <div class="btn_box">\
                    <a href="#" class="dele_colse">取消</a>\
                    <a href="#" class="dele_ok">确认</a>\
                </div>\
                <div class="dele_colse">\
                    <i class="iconfont icon-guanbi"></i>\
                </div>\
            </div>\
        </div>'

        $('body').append(html_str)

        var box = $('.dele_pop')
        var dele_colse = $('.dele_pop .dele_colse') // 取消
        var dele_ok = $('.dele_pop .dele_ok') // 确定

        box.css('display', 'block') // 显示
        dele_colse.click(function () { // 点击取消按钮
            box.remove() // 删除弹窗
            callback ? callback() : '' // 有则执行
            return false // 阻止默认行为防止页面再次刷新,导致滚动条置顶
        })

        dele_ok.click(function () { // 点击取消按钮
            box.remove()
            return false
        })
    }

    if (open === 'ok') {
        logic()
    } else {
        $(show).click(function () {
            logic()
        })
    }
}

// 顶部头像效果
PublicFunction.prototype.topHeadPortraitEffect = function () {
    // 顶部头像的滑入滑出效果 -satrt
    $('.banner .top_right .t_one').mouseenter(function () {
        $('.top_right .t_one .personal').css('display', 'block')
    })

    $('.banner>.top').mouseleave(function () {
        $('.top_right .t_one .personal').css('display', 'none')
    })
    // 顶部头像的滑入滑出效果 -end
}

// 弹窗
PublicFunction.prototype.popup = function (ele, show, hide1, hide2, preservation) {
    $(show).click(function () { // 点击添加显示弹窗 '.add'
        var win_width = $('html').width();
        var win_height = $('html').height();

        $(ele).css({
            'display': 'block',
            'width': win_width,
            'height': win_height
        }); // '.popup' 弹窗的元素
    })

    $(hide1).click(function () { // 点击隐藏弹窗 '.close'
        $(ele).css('display', 'none');
        return false; // 阻止默认行为
    })

    $(hide2).not('.popup').click(function () { // 点击隐藏弹窗 '.close2'
        $(ele).css('display', 'none');
        return false; // 阻止默认行为
    })

    if (preservation) {
        $(preservation).click(function () { // 点击隐藏弹窗 '.close2'
            if (event.target === this) {
                $(ele).css('display', 'none');
                return false; // 阻止默认行为
            }
        })
    }
}

// 图标滑动效果
PublicFunction.prototype.iconSlideEffect = function () { // 右边联系的小图标效果(滑入滑出)
    var lock = true; // 设置锁

    $('.contact').mouseenter(function () { // 右边联系的小图标效果(滑入滑出)
        if (lock) {
            lock = false; // 关锁
            $('.contact>i').removeClass('icon-ai-message').addClass('icon-icon-'); // 切换图标
            $('.contact .close').animate({ // 滑出
                width: 120
            }, 300, function() {
                lock = true;
            })
        }
    });

    $('.contact').mouseleave(function () { // 右边联系的小图标效果(滑入滑出)
        if(lock) {
            $('.contact>i').removeClass('icon-icon-').addClass('icon-ai-message'); // 切换图标
            $('.contact .close').animate({ // 滑入
                width: 0
            }, 300, function() {
                lock = true;
            })
        }
    });
}

// 创建父类原型方法-end

// 创建父类(公共)对象
var auto = new PublicFunction()






function footer() { // 判断页面高度，让footer始终在底部
    $(document).ready(function () {
        if ($(window).height() > $('html').height()) {
            $('footer').css({
                'bottom': 0,
                'position': 'fixed'
            })
        }
    })
}


function sliding_location(ele) { // nav的滑动定位效果(下滑置顶效果)
    var navTop = $(ele).offset().top; // 获取nav距离页面顶部的top值
    $(window).scroll(function () {
        if ($(this).scrollTop() >= navTop) {
            $(ele).css({ // '.nav'
                'top': 0,
                'position': 'fixed',
                'zIndex': 999
            });
        } else {
            $(ele).removeAttr("style"); // '.nav'
        }
    })
}

function nav_switch() { // nav 切换
    var arr = $('#tab_switch li'); // 获取需要切换的所有li元素
    var con_box = $('.nav_content .con_box'); // 获取所有需要切换的内容元素
    var index = 0; // 存储索引
    var length = arr.length; // 获取li的个数
    var nt = $('.nav').offset().top; // 获取nav距离页面顶部的top值

    for (var i = 0; i < length; i++) { // 设置点击tab实现切换
        $(arr[i]).click(change); // 给每一个li都添加点击-切换效果

        $(arr[i]).on('click', arr[i], function () { // 给所有的li'绑定'点击滑回nav的效果
            if ($(window).scrollTop() >= nt) { // 判断
                $('html, body').animate({ // 滑回
                    scrollTop: nt
                }, 1000);
            }
        })
    }

    function change() { // tab切换
        index = $(this).index(); // 存储索引
        tab_switch(index); // 调用切换tab的方法
        $(this).parent().children().removeClass(); // 去除所有li的类
        $(this).addClass('hover'); // 给当前元素添加类
    }


    function tab_switch(index) { // 内容的切换
        for (var i = 0; i < length; i++) {
            if ($(con_box[i]).index() == index) { // 找到对应的tab
                $(con_box[i]).css('display', 'block'); // 显示
            } else {
                $(con_box[i]).css('display', 'none'); // 隐藏
            }
        }
    }

    sliding_location('.nav') // nav的滑动定位效果(下滑置顶效果)
}

function sowing_map() { // 旋转木马
    var $a = $(".buttons a"); // 获取所有的a标签
    var $s = $(".buttons span"); // 获取所有的小按钮
    var cArr = ["p4", "p3", "p2"]; // 将所有图片的样式组成一个数组
    var index = 1; // 默认显示中间的图片

    // 上一张
    function previmg() {
        cArr.unshift(cArr[2]);
        cArr.pop();
        /* 
         * i是元素的索引，从0开始
         * e为当前处理的元素
         * each循环，当前处理的元素移除所有的class，然后添加数组索引i的class
         */
        $(".sowing_map li").each(function (i, e) {
            $(e).removeClass().addClass(cArr[i]);
        })
        index--;
        if (index < 0) {
            index = 2;
        }
        show();
    }

    // 下一张
    function nextimg() {
        lock = false; // 防止用户快速多次点击
        cArr.push(cArr[0]);
        cArr.shift();
        $(".sowing_map li").each(function (i, e) {
            $(e).removeClass().addClass(cArr[i]);
        })
        index++;
        if (index > 2) {
            index = 0;
        }
        show();
    }

    // 通过底下按钮点击切换
    $a.each(function () {
        $(this).click(function () {
            var myindex = $(this).index();
            var b = myindex - index;
            if (b == 0) {
                return;
            } else if (b > 0) {
                /*
                 * splice(0,b)的意思是从索引0开始,取出数量为b的数组
                 * 因为每次点击之后数组都被改变了,所以当前显示的这个照片的索引才是0
                 * 所以取出从索引0到b的数组,就是从原本的这个照片到需要点击的照片的数组
                 * 这时候原本的数组也将这部分数组进行移除了
                 * 再把移除的数组添加的原本的数组的后面
                 */
                var newarr = cArr.splice(0, b);
                cArr = $.merge(cArr, newarr);
                $(".sowing_map li").each(function (i, e) {
                    $(e).removeClass().addClass(cArr[i]);
                })
                index = myindex;
                show();
            } else if (b < 0) {
                /*
                 * 因为b<0,所以取数组的时候是倒序来取的,也就是说我们可以先把数组的顺序颠倒一下
                 * 而b现在是负值,所以取出索引0到-b即为需要取出的数组
                 * 也就是从原本的照片到需要点击的照片的数组
                 * 然后将原本的数组跟取出的数组进行拼接
                 * 再次倒序,使原本的倒序变为正序
                 */
                cArr.reverse();
                var oldarr = cArr.splice(0, -b)
                cArr = $.merge(cArr, oldarr);
                cArr.reverse();
                $(".sowing_map li").each(function (i, e) {
                    $(e).removeClass().addClass(cArr[i]);
                })
                index = myindex;
                show();
            }
        })
    })

    // 改变底下按钮的背景色
    function show() {
        $($s).eq(index).addClass("cont_color").parent().siblings().children().removeClass("cont_color");
    }

    // 点击class为p2的元素触发上一张照片的函数
    $(document).on("click", ".p2 img", function () {
        previmg();
        return false; //返回一个false值，让a标签不跳转
    });

    // 点击class为p4的元素触发下一张照片的函数
    $(document).on("click", ".p4 img", function () {
        nextimg();
        return false;
    });

    // 鼠标移入nc_bottom时清除定时器
    $(".nc_bottom").mouseover(function () {
        clearInterval(timer);
        // $('.btn').css('display', 'block');
    })

    // 鼠标移出nc_bottom时开始定时器
    $(".nc_bottom").mouseleave(function () {
        timer = setInterval(nextimg, 3000);
        // $('.btn').css('display', 'none');
    })

    // 进入页面自动开始定时器
    timer = setInterval(nextimg, 3000); // 旋转木马
}

// function popup(ele, show, hide1, hide2, preservation) { // 弹窗
//     $(show).click(function () { // 点击添加显示弹窗 '.add'
//         var win_width = $('html').width();
//         var win_height = $('html').height();

//         $(ele).css({
//             'display': 'block',
//             'width': win_width,
//             'height': win_height
//         }); // '.popup' 弹窗的元素
//     })

//     $(hide1).click(function () { // 点击隐藏弹窗 '.close'
//         $(ele).css('display', 'none');
//         return false; // 阻止默认行为
//     })

//     $(hide2).not('.popup').click(function () { // 点击隐藏弹窗 '.close2'
//         $(ele).css('display', 'none');
//         return false; // 阻止默认行为
//     })

//     if (preservation) {
//         $(preservation).click(function () { // 点击隐藏弹窗 '.close2'
//             if (event.target === this) {
//                 $(ele).css('display', 'none');
//                 return false; // 阻止默认行为
//             }
//         })
//     }
// }

/*
    简单提示弹窗
    show        点击这个元素创建"简单提示弹窗"-必选项
    h1          主标题-可选项
    h2          副标题-可选项
    open        自动弹窗-可选项(调用该方法时自动弹窗)
    callback    可执行自己的代码逻辑, 参数类型是函数(方法)-可选项
*/
// function popup_delete(show, h1, h2, open, callback) {
//     function logic() {
//         var title = h1 ? h1 : '是否确认删除该工作流？'
//         var subtitle = h2 ? h2 : '你是否确认删除该工作流，删除之后不可恢复！'
//         // html 的基本结构
//         var html_str =
//             '<div class="dele_pop">\
//             <div class="deel_box">\
//                 <h1>' +
//             title + '</h1>\
//                 <h2>' + subtitle +
//             '</h2>\
//                 <div class="btn_box">\
//                     <a href="#" class="dele_colse">取消</a>\
//                     <a href="#" class="dele_ok">确认</a>\
//                 </div>\
//                 <div class="dele_colse">\
//                     <i class="iconfont icon-guanbi"></i>\
//                 </div>\
//             </div>\
//         </div>'

//         $('body').append(html_str)

//         var box = $('.dele_pop')
//         var dele_colse = $('.dele_pop .dele_colse') // 取消
//         var dele_ok = $('.dele_pop .dele_ok') // 确定

//         box.css('display', 'block') // 显示
//         dele_colse.click(function () { // 点击取消按钮
//             box.remove() // 删除弹窗
//             callback ? callback() : '' // 有则执行
//             return false // 阻止默认行为防止页面再次刷新,导致滚动条置顶
//         })

//         dele_ok.click(function () { // 点击取消按钮
//             box.remove()
//             return false
//         })
//     }

//     if(open === 'ok') {
//         logic()
//     } else {
//         $(show).click(function () {
//             logic()
//         })
//     }
// }


/*
工作流列表信息-satrt
*/
// box 放内容的盒子                                 '.ech_switch ul li'
// icon 上面的小图标                                '.ech_btn span'
// move 移动的元素                                  '.ech_switch ul'
// ech_right 右边切换按钮                           '.ech_right'
// ech_left 左边切换按钮                            '.ech_left'
// w 鼠标移入显示点击按钮，移出隐藏点击按钮的元素      '.w2'
// x 移动的单位位移
function ech_switch(box, icon, move, ech_right, ech_left, w, x) { // echarth图片切换, ech_box echarts的盒子
    var index = 0;
    var num = $(box).length;
    var ech_btn = $(icon); // 上面的小图标
    var lock = true; // 锁
    var displacement = x ? x : '-1160px'


    $(ech_right).click(function () {
        if (lock) {
            lock = false; // 关闭锁
            index++;
            index >= num ? index = 0 : '';
            $(ech_btn[index]).addClass('echbtn_one').siblings().removeClass('echbtn_one'); // echbtn_one 上面的小图标添加高亮的类

            $(move).animate({
                marginLeft: displacement
            }, 800, function () {
                $(box).eq(0).appendTo($(move));
                $(move).css('marginLeft', '0px');
                lock = true // 开锁
            });
        }
    })

    $(ech_left).click(function () {
        if (lock) {
            lock = false; // 关闭锁
            index <= 0 ? index = num : '';
            index--;
            $(ech_btn[index]).addClass('echbtn_one').siblings().removeClass('echbtn_one');

            $(move).css('marginLeft', displacement);
            $(box).eq(num - 1).prependTo($(move));
            $(move).animate({
                marginLeft: "0px"
            }, 600, function () {
                lock = true // 开锁
            });
        }
    });

    var timer = setInterval(function () {
        $(ech_right).trigger("click");
    }, 2000)

    $(w).mouseenter(function () {
        $(ech_left).css('display', 'block');
        $(ech_right).css('display', 'block');
        clearInterval(timer)
    })

    $(w).mouseleave(function () {
        if (event.target === this) {
            $(ech_left).css('display', 'none');
            $(ech_right).css('display', 'none');
            clearInterval(timer);
            timer = setInterval(function () {
                $(ech_right).click()
            }, 2000)
        }
    })
}
/*
工作流列表信息-end
*/


/*
bios-satrt
*/
function bios_echSwitch(ele, box, hover) { // bios的tab切换
    var tab_switch = $(ele); // 获取所有点击切换的元素 '.tab_switch .tabswit_ct'
    var content_switch = $(box); // 获取所有需要切换内容的元素 '.content>.w2'
    var class_border = $(hover); // 获取需要border-color的元素 '.tabswit_ct ul'
    var index = 0; // 存储索引

    for (var i = 0; i < tab_switch.length; i++) {
        $(tab_switch[i]).click(function () {
            display($(this).index()) // 找到对应的元素
            var url = $(this).attr('v-url');
            footer() // 判断页面高度，让footer始终在底部
        })
    }

    function display(index) {
        for (var j = 0; j < content_switch.length; j++) {
            if ($(content_switch[j]).index() === index) {
                $(content_switch[j]).css('display', 'block'); // 将当前元素显示
                $(class_border[j]).addClass('hover'); // 给当前元素添加边框颜色
            } else {
                $(content_switch[j]).css('display', 'none'); // 将其他元素隐藏
                $(class_border[j]).removeClass('hover'); // 将其他元素的边框颜色去掉
            }
        }
    }
}


function selectfn(spa, sele, option) { // 下拉选项框的方法
    var span = $(spa); // 获取所有的下拉选项 '.options span'
    // var select = $(sele); // 获取选项框 '.select'
    // var options = $(option); // 获取下拉框 '.options'
    var options = span.parent(); // 获取下拉框 '.options'
    var select = options.prev(); // 获取选项框 '.select'

    select.click(function () { // 给下拉选项添加一个点击事件
        var display = $(this).next().css('display'); // options元素的值
        if (display == 'none') { // 如果是隐藏，点击则显示，反之亦然
            $(this).next().css('display', 'block');
        } else {
            $(this).next().css('display', 'none');
        }
    })

    for (var i = 0; i < span.length; i++) {
        $(span[i]).click(function () {
            var content = $(this).text(); // 获取当前选项卡的内容
            $(this).parent().prev().find('span').text(content); // 将选择的内容展示到选项框中
            $(this).parent().css('display', 'none'); // 隐藏下拉框
        })
    }

    select.parent().mouseleave(function () { // 设置当鼠标移出时隐藏下拉选项
        $(this).children().eq(1).css('display', 'none');
    })
}
/*
bios-end
*/


function dropDownSelect(spa) { // 步骤中下拉选项框的方法
    var span = $(spa); // 获取所有的下拉选项 '.options span'
    var options = span.parent(); // 获取下拉框 '.options'
    var select = options.prev(); // 获取选项框 '.select'
    var selectClass = select.attr('class')
    var optionsClass = options.attr('class')
    var paren = options.parents(':eq(2)')
    var selectBox = select.parent()

    paren.on('click', select, function () { // 给下拉选项添加一个点击事件
        if ($(event.target).attr('class') === selectClass) { // 判断是否是select元素
            var display = $(event.target).next().css('display')
            if (display == 'none') { // 如果是隐藏，点击则显示，反之亦然
                $(event.target).next().css('display', 'block')
            } else {
                $(event.target).next().css('display', 'none')
            }
            console.log($(event.target).parent().next()[0])
        } else { // input_box
            var display = $(event.target).parent().next().css('display')
            if (display == 'none') { // 如果是隐藏，点击则显示，反之亦然
                $(event.target).parent().next().css('display', 'block')
            } else {
                $(event.target).parent().next().css('display', 'none')
            }
            console.log($(event.target).parent().next()[0])
        }
        // console.log(event.target)
        console.log(select)
    })

    paren.on('click', spa, function () {
        var content = $(this).text(); // 获取当前选项卡的内容
        $(this).parent().prev().find('span').text(content); // 将选择的内容展示到选项框中
        $(this).parent().css('display', 'none'); // 隐藏下拉框
    })

    paren.on('mouseleave', selectBox, function () { // 设置当鼠标移出时隐藏下拉选项
        if ($(event.target).attr('class') === selectClass) { // 判断当前点击的元素是否是select_box元素
            var display = $(event.target).next().css('display') // 获取当前点击的选项框
            if (display === 'block') {
                $(event.target).next().css('display', 'none'); // 隐藏选项框
            }
        } else if ($(event.target).parent().attr('class') === optionsClass) {
            var display = $(event.target).parent().css('display')
            if (display === 'block') {
                $(event.target).parent().css('display', 'none');
            }
        }
    })
}


/*
project-start
*/
function show_date(ele) {
    function getNowFormatDate() { // 获取当前时间
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
    }

    $(ele).text(getNowFormatDate()); // 显示当前时间
}
/*
project-end
*/
function exclusivity(ele, callback) { // 排他
    var spans = $(ele) // 获取所有需要点击的元素 '.add_pop .function span'
    for (var i = 0; i < spans.length; i++) { // 点谁谁高亮
        $(spans[i]).click(function () {
            $(this).addClass('hover').siblings().removeClass('hover')
            callback ? callback(this) : ''
        })
    }
}