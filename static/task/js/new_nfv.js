selectfn('.project .options_box li', '.project .select_box', '.project .options_box') // 项目名称的下拉选项
selectfn('.node .options_box li', '.node .select_box', '.node .options_box') // 节点名称的下拉选项

// 业务逻辑-start
var setTop = function (ele, box, offset) { // arr-鼠标移入的元素, ele-子级选择元素的盒子, offset-偏移量
    var arr = $(ele); // 获取第一层分类的所有选项
    // var ifAll = true; // 判断是否为全部选中
    // var checkbox;
    for (var i = 0; i < arr.length; i++) { // 循环每一个span标签,给他们注册事件
        $(arr[i]).on('click', function () {
            if ($('.sele_box3').css('display') == 'block') {
                $('.sele_box3').css('display', 'none');

            }

            $(box).css('display', 'block');
            var top = $(this).position().top; // 获取当前鼠标所在元素的top

            if (box == '.sele_box3') { // 判断是否是第三级
                var zj = $('.sele_box2').position().top;
                top = zj + top + 35;
            }
            var set_top = top - offset > 125 ? 125 : top - offset
            top - offset < 0 ? set_top = 0 : ''

            $(box).css('top', set_top); // 设置子级分类的top
            $(this).parents('.pid_box').find('span').removeClass()
            $(this).addClass('hover')
            var url = $(this).attr('v-url') // 获取当前点击的地址
            if (box === '.sele_box2') {
                select_model('pid_b', 'addpend', '.sele_box2 form', all_data[url], setTop,
                    '.sele_box2 .box span', '.sele_box3', 120)
            } else if (box === '.sele_box3') {
                select_model('pid_b', 'addpend', '.sele_box3 form', all_data[url])
            }
        })
    }
}

// temp         渲染模板      select_model
// insert_fn    插入的方式    after
// aft          插入的元素    .pop_line
// data         数据          models
// callback     函数          用于重新渲染页面
// cb_parameter 函数的参数
var select_model = function (temp, insert_fn, aft, data, callback, cb_parameter1, cb_parameter2,
    cb_parameter3) {
    var html = template(temp, data) // 进行模板渲染-选择测试类目板块
    if (insert_fn === 'after') { // 插入html结构的方式
        $(aft).after(html) // 追加到html结构中
    } else {
        $(aft).html(html)
    }

    if (callback) {
        callback(cb_parameter1, cb_parameter2, cb_parameter3)
    }

    if (aft === '.sele_box3 form') { // 三级分类
        all_select('.sele_box3') // 点击判断是否全选, 并默认全选
        pop_slide('.sele_box3 .min_sele', '.sele_box3 .sele_bottom') // 弹窗的滚动方法
    } else if (aft === '.sele_box2 form') { // 二级分类
        all_select('.sele_box2') // 点击判断是否全选, 并默认全选
        pop_slide('.sele_box2 .min_sele', '.sele_box2 .sele_bottom') // 弹窗的滚动方法
    } else { // 一级分类
        all_select('.sele_box') // 点击判断是否全选, 并默认全选
    }
}

var select_fn = function (ele) { // 添加或取消高亮
    var function_selects = $(ele) // 获取选项的元素
    for (var i = 0; i < function_selects.length; i++) {
        $(function_selects[i]).on('click', function () { // 给选项添加事件
            // $(this).removeClass().addClass('sign').siblings().removeClass()
            var if_select = $(this).hasClass('sign') // 判断当前选项是否被选中
            if (!if_select) { // 还未选中
                $(this).addClass('sign').siblings().removeClass('sign') // 选中
                var url = $(this).attr('v-url') // 获取当前的请求地址
                var all_ele = $('.sele_box .all_sele input') // 全选的元素

                select_model('pid_a', 'append', '.sele_box form', all_data[url], setTop,
                    '.sele_box .box span', '.sele_box2', 35)
            }

            // 判断第二层级和第三层级是否显示,显示则隐藏
            $('.sele_box2').css('display') === 'block' ? $('.sele_box2').css('display', 'none') :
                ''
            $('.sele_box3').css('display') === 'block' ? $('.sele_box3').css('display', 'none') :
                ''
        })
    }
}

// 选中的样式变化
function all_select(select_ele) { // 点击判断是否全选
    var box_inputs = $(select_ele).find('.box input') // 获取当前层级box下所有的复选框元素
    var all_ele = $(select_ele).find('.all_sele input') // 全选复选框的元素

    var prev_style = function (id, style) { // 修改上一级的样式
        if ($('.function span[v-url=' + id + ']').length === 1) { // 判断是否是第一层级
            var model_ele = $('.function span[v-url=' + id + ']')
            var record_id = model_ele.attr('v-url')
            all_data.models.forEach(function (x) {
                if (x.pid === record_id) {
                    x.class = style
                }
            })
        } else {
            var model_ele = $('input[id=' + id + ']') // 父级元素
            var record_id = model_ele.attr('record-id') // 获取父级id
            all_data[record_id].data[0].all_class = style // 记录全选复选框的样式(数据)
            all_data[record_id].data.forEach(function (x) { // 记录当前元素的样式(数据)
                if (x.pid === id) {
                    x.class = style
                }
            })
        }

        model_ele.removeClass().addClass(style) // 改变父级元素的样式
        var prev_ele = model_ele.parents('form').find('.all_sele input') // 父级元素的全选复选框
        if (prev_ele.length === 1) { // 如果找到了父级元素的全选复选框
            var whole = model_ele.parents('form').find('.box input')
            var checked = model_ele.parents('form').find('.box .all_sele')
            var part_sele = model_ele.parents('form').find('.box .part_sele')
            if (checked.length === whole.length) { // 所有的和选中的比较
                var css = 'all_sele'

            } else if (part_sele.length > 0 || checked.length > 0) {
                var css = 'part_sele'

            } else {
                var css = 'no_sele'
            }

            prev_ele.removeClass().addClass(css)
            var id = prev_ele.attr('v-pid')
            prev_style(id, css)
        }
    }

    all_ele.click(function () { // 点击全选使当前的所有复选框全选
        var id = $(this).attr('v-pid')
        var models_data = all_data[id].data[0].record_id
        var is_sele = $(this).attr('class')

        if (is_sele === '' || is_sele === 'no_sele') {
            var style = 'all_sele'
            // operation_data(data[id].data, 'add', style)
            all_data.models.forEach(function (x) {
                if (x.pid === models_data) {
                    x.class = style
                    operation_data(all_data[x.pid].data, 'add', style)
                }
            })
        } else {
            var style = 'no_sele'
            // operation_data(data[id].data, 'delete', style)
            all_data.models.forEach(function (x) {
                if (x.pid === models_data) {
                    x.class = style
                    operation_data(all_data[x.pid].data, 'delete', style)
                }
            })
        }

        operation_style(id, style)
    })

    // 修改全选复选框样式和值-start 以及父元素的样式
    // ele 当前层级的全选复选框
    var edit_style = function (ele, style) {
        ele.removeClass().addClass(style) // 修改全选复选框的样式
        var id = $(ele).attr('v-pid') // 获取全选复选框的v-pid 用于寻找父级元素
        all_data[id].data[0].all_class = style // 记录全选复选框的样式(数据)
        prev_style(id, style)
    }
    // 修改全选复选框样式-end

    var next_css = function (id, style) {
        var all_sele = $('input[v-pid=' + id + ']')
        all_sele.parents('form').find('input').removeClass().addClass(style)
        var hierarchy = all_sele.parents('.min_sele').parent().attr('class')
        if (hierarchy === 'sele_box2') {
            $('.sele_box3 input').removeClass().addClass(style)
        }
    }

    // 操作数据的方法
    // data         数据
    // operation    操作  添加 || 删除
    // style        样式
    // id           当前的
    var operation_data = function (data, operation, style, id) {
        data.forEach(function (x) {
            if (operation === 'delete') { // 删除已记录的样式(数据)
                if (id) {
                    if (x.pid === id) { // 记录当前点击的样式
                        delete x.class
                    }
                } else { // 记录下一级的样式
                    delete x.class
                    if (all_data[x.pid]) {
                        operation_data(all_data[x.pid].data, 'delete')
                    }
                }

            } else { // 记录样式(数据)
                if (id) {
                    if (x.pid === id) { // 记录当前点击的样式
                        x.class = style
                    }
                } else { // 记录下一级的样式
                    x.class = style
                    if (all_data[x.pid]) {
                        operation_data(all_data[x.pid].data, 'add', style)
                    }
                }
            }
        })
    }

    // 操作样式的方法
    var operation_style = function (id, style) {
        var prev_ele = $('input[v-pid=' + id + ']')
        var next_style = prev_ele.parents('.min_sele').parent().attr('class')

        prev_ele.parents('form').find('input').removeClass().addClass(style) // 当前

        if (all_data[id]) { // 上层
            var model_ele = $('.function').find('span[v-url=' + id + ']')
            if (model_ele.length === 1) {
                model_ele.removeClass().addClass(style)
            } else {
                var prev_ele = $('input[id=' + id + ']')
                prev_ele.trigger('click')
            }
        }

        if (next_style === 'sele_box') { // 下层
            $('.sele_box2 input').removeClass().addClass(style)
            $('.sele_box3 input').removeClass().addClass(style)
        } else if (next_style === 'sele_box2') {
            $('.sele_box3 input').removeClass().addClass(style)
        }
    }

    // 给每个复选框添加点击事件
    for (var i = 0; i < box_inputs.length; i++) {
        $(box_inputs[i]).click(function () {
            var sele_class = $(this).attr('class') // 获取当前点击复选框的类
            var record_id = $(this).attr('record-id') // 获取当前点击复选框记录的上一级id
            var id = $(this).attr('id') // 用于寻找下一级

            if (sele_class === 'part_sele' || sele_class === 'all_sele') { // 选中的
                $(this).removeClass().addClass('no_sele') // 让复选框取消选中状态(样式)
                operation_data(all_data[record_id].data, 'delete', '', id) // 操作数据,删除当前记录

                if (all_data[id]) { // 如果还有子级
                    operation_data(all_data[id].data, 'delete') // 操作数据,删除子级记录
                }
                operation_style(id, 'no_sele') // 修改样式

            } else {
                $(this).removeClass().addClass('all_sele') // 选中当前复选框
                operation_data(all_data[record_id].data, 'add', 'all_sele', id) // 记录当前点击的数据

                if (all_data[id]) { // 如果还有子级
                    operation_data(all_data[id].data, 'add', 'all_sele') // 记录子级的样式
                }
            }

            var all_sele = $(this).parents('form').find('.pid_box .all_sele') // 获取当前层级pid_box下所有全选中的复选框
            var part_sele = $(this).parents('form').find('.pid_box .part_sele') // 获取当前层级pid_box下所有选中的复选框
            var box_inputs = $(this).parents('form').find('.pid_box input') // 获取当前层级pid_box下所有的复选框
            var ase = $(this).parents('form').find('.all_sele input') // 当前层级的全选复选框 all_select_element

            if (all_sele.length === box_inputs.length) { // 所有的和选中的比较
                edit_style(ase, 'all_sele') // 修改全选复选框样式
                // console.log('全选')

            } else if (part_sele.length > 0 || all_sele.length > 0 && all_sele.length < box_inputs.length) {
                edit_style(ase, 'part_sele')
                next_css(id, $(this).attr('class'))
                // console.log('一部分')

            } else {
                edit_style(ase, 'no_sele')
                // console.log('没选')
            }
        })
    }
}
// 业务逻辑-start


// 滑动效果的js-start
// element 卷曲的元素  '.sele_box .min_sele'
// bot_ele 底部触发向下滚动的元素  '.sele_box .sele_bottom'
var pop_slide = function (element, bot_ele) {
    var scroll_top = 0; // 存储卷曲的值
    var slide_ele = $(element).find('form') // 滑动的元素
    var form_height = slide_ele.height() // 获取内容的高度
    var element_height = $(element).height() // 获取固定高度
    var sele_top = $(element).prev()
    var remove_timer // 定时器

    $(element).scroll(function (e) {
        e.stopPropagation();
        var p = $(this).scrollTop()
        if (scroll_top >= p) { // 上滚
            // 上滚到最顶部时隐藏
            p === 0 ? $(this).prev().css('display', 'none') : ''
        } else { // 下滚
            $(this).prev().css('display', 'block') // 显示
        }
        scroll_top >= p ? '' : $(this).prev().css('display', 'block') // 显示

        scroll_top = $(this).scrollTop()
        return false
    })

    // ele      滚动的元素  element
    // sp       起始点位置  starting_position
    // target   目标位置
    // time     
    // callback
    var scroll_fn = function (ele, sp, target, time, callback) {
        var next_step = sp // 下一步的位置
        remove_timer = setInterval(function () {
            target > 0 ? next_step++ : next_step--
                if (sp === 0 && next_step >= target) { // 向下
                    clearInterval(remove_timer)
                    callback ? callback() : '' // 调用回调函数
                }

            if (sp >= 0 && next_step <= 0) { // 向上
                clearInterval(remove_timer)
                callback ? callback() : '' // 调用回调函数
            }
            $(ele).scrollTop(next_step)
        }, time)
    }

    $(bot_ele).mouseenter(function () {
        var sp = $(element).scrollTop() // 当前元素所在位置
        var distance = form_height - element_height - sp // 需要滑动的距离

        if (form_height > element_height && distance > 0) {
            scroll_fn(element, sp, distance, 10, function () {
                sele_top.css('display', 'block')
            })
        } else {
            // console.log('未超出')
        }
    })

    sele_top.mouseenter(function () {
        var sp = $(element).scrollTop() // 当前元素所在位置

        scroll_fn(element, sp, 0, 10, function () {
            sele_top.css('display', 'none')
        })
    })


    $(bot_ele).mouseleave(function () {
        clearInterval(remove_timer)
    })

    sele_top.mouseleave(function () {
        clearInterval(remove_timer)
    })
}
// 滑动效果的js-end

function popup_copy(ele, show, hide1, hide2) { // 弹窗
    var submit_data = [] // 将最终数据存储在这
    
    $(show).click(function () { // 点击添加显示弹窗 '.add'
        var win_width = $('html').width();
        var win_height = $('html').height();

        $(ele).css({
            'display': 'block',
            'width': win_width,
            'height': win_height
        }); // '.popup' 弹窗的元素

        // 业务逻辑-start
        // 选择测试类目板块-start
        select_model('select_model', 'append', '.function', all_data, select_fn,
            '.add_pop .function span')
        // 选择测试类目板块-end

        // 一级分类-start
        var html = template('pid_a', all_data.a) // 进行模板渲染-选择测试类目板块
        $('.sele_box form').html(html) // 追加到html结构中
        pop_slide('.sele_box .min_sele', '.sele_box .sele_bottom') // 弹窗的滚动方法

        all_select('.sele_box') // 点击判断是否全选, 并默认全选

        setTop('.sele_box .box span', '.sele_box2', 25)
        // 一级分类-end
        // 业务逻辑-start

        submit_data = [] // 重置数据
    })

    $(hide1).click(function () { // 点击隐藏弹窗 '.close2'
        $(ele).css('display', 'none');
        return false; // 阻止默认行为
    })

    var get_data = function (data) { // 获取最终数据的方法
        data.forEach(function (x) {
            $('.sele_box2').css('display', 'none')
            $('.sele_box3').css('display', 'none')
            if ('class' in x) {
                if (x.class === 'all_sele') {
                    submit_data.push(x.pid)
                } else {
                    get_data(all_data[x.pid].data)
                }
            }
        })
    }

    $(hide2).click(function () { // 点击隐藏弹窗 '.confirm'
        $(ele).css('display', 'none');
        get_data(all_data.models)
        console.log(submit_data)
        return false; // 阻止默认行为
    })
}
popup_copy('.add_pop', '.file', '.close2', '.confirm') // 弹窗