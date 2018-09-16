// 创建工作流构造函数
var Workflow = function() {
    var that = this
    $('.tab_top .select_box').click(that.filter)  // 过滤器
    $('.table td input').click(that.checkBox) // 复选框
    $('tr .all_select input').click(that.allCheckBox) // 全选复选框
    that.popup_delete('.reconstruction', '是否确认复建该任务？', '您是否确认复建该任务，复建之后不可恢复！') // 复建任务的弹窗
    $('.add .delete').click(that.deleteButton) // 点击删除
}

// 让工作流对象继承父类(公共)对象
Workflow.prototype = auto

// 过滤器
Workflow.prototype.filter = function () {
    $('.tab_top .options_box').css('display', 'block')
    var spans = $('.tab_top .options_box span')
    spans.click(function () {
        // var v_url = $(this).attr('v-url')
        var top = parseInt($('.tab_top .options_box').css('height')) + 40 - parseInt($('.pid').css(
            'height'))
        var right = parseInt($('.tab_top .options_box').css('width'))
        $('.pid').css('top', top - 2)
        $('.pid').css('right', right)
        $('.pid').css('display', 'block')

        var lis = $('.pid li')
        lis.click(function () {
            var val = $(this).text()
            $('.select .select_box span').text(val)
            $('.pid').css('display', 'none')
            $('.select .options_box').css('display', 'none')
        })
    })
}

// 复选框
Workflow.prototype.checkBox = function () {
    var sum = $('.table td input').length
    var checked = $('.table td input:checked').length
    if (sum === checked) { // 全选
        $('tr .all_select input').prop('checked', true)
    } else if (checked > 0) {
        $('tr .all_select input').prop('checked', false)
    }
}

// 全选复选框
Workflow.prototype.allCheckBox = function () {
    if ($(this).prop('checked')) {
        $('.table td input').prop('checked', true)
    } else {
        $('.table td input').prop('checked', false)
    }
}

// structure
// 构建任务的弹窗
Workflow.prototype.buildingTaskWindows = function (index) {
    var that = this
    $('.add .structure').click(function() {
        var html = '<ul class="construction"><li>构建中…</li><li></li></ul>'
        var arr_ele = $('.pack td input:checked')
        if(arr_ele.length === 0) {
            that.popup_delete('.add .delete', '您还未选择构建的任务!', '请选择构建的任务后,重试...', 'ok') // 删除的弹窗
            return false
        }
        for(var i = 0; i < arr_ele.length; i++) {
            $(arr_ele[i]).parents('tr').find('td').eq(index).html(html)
        }
    })
}

// 点击删除
Workflow.prototype.deleteButton = function() {
    var checked = $('.pack td input:checked')
    if(checked.length === 0) {
        auto.popup_delete('.add .delete', '您还未选择删除的任务!', '请选择删除的任务后,重试...', 'ok') // 删除的弹窗
    } else {
        auto.popup_delete('.add .delete', '是否确认删除该任务？', '您是否确认删除该任务，删除之后不可恢复！', 'ok') // 删除的弹窗
    }
}

// 创建工作流对象
var workflow = new Workflow()


// function structure(index) {
//     $('.add .structure').click(function() { // 构建任务的弹窗
//         var html = '<ul class="construction"><li>构建中…</li><li></li></ul>'
//         var arr_ele = $('.pack td input:checked')
//         if(arr_ele.length === 0) {
//             popup_delete('.add .delete', '您还未选择构建的任务!', '请选择构建的任务后,重试...', 'ok') // 删除的弹窗
//             return false
//         }
//         for(var i = 0; i < arr_ele.length; i++) {
//             $(arr_ele[i]).parents('tr').find('td').eq(index).html(html)
//         }
//     })
// }



