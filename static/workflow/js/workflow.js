$('.tab_top .select').click(function () { // 过滤器
    $('.tab_top .options').css('display', 'block')
    var spans = $('.tab_top .options span')
    spans.click(function () {
        var v_url = $(this).attr('v-url')
        var top = parseInt($('.tab_top .options').css('height')) + 40 - parseInt($('.pid').css(
            'height'))
        var right = parseInt($('.tab_top .options').css('width'))
        $('.pid').css('top', top - 2)
        $('.pid').css('right', right)
        $('.pid').css('display', 'block')

        var lis = $('.pid li')
        lis.click(function () {
            var val = $(this).text()
            $('.select .sele_box span').text(val)
            $('.pid').css('display', 'none')
            $('.select .options').css('display', 'none')
        })
    })
})
$('.table td input').click(function () { // 复选框
    var sum = $('.table td input').length
    var checked = $('.table td input:checked').length
    if (sum === checked) { // 全选
        $('tr .all_select input').prop('checked', true)
    } else if (checked > 0) {
        $('tr .all_select input').prop('checked', false)
    }
})
$('tr .all_select input').click(function () { // 全选复选框
    if ($(this).prop('checked')) {
        $('.table td input').prop('checked', true)
    } else {
        $('.table td input').prop('checked', false)
    }
})

popup_delete('.reconstruction', '是否确认复建该任务？', '您是否确认复建该任务，复建之后不可恢复！') // 复建任务的弹窗

function structure(index) {
    $('.add .structure').click(function() { // 构建任务的弹窗
        var html = '<ul class="construction"><li>构建中…</li><li></li></ul>'
        var arr_ele = $('.pack td input:checked')
        if(arr_ele.length === 0) {
            popup_delete('.add .delete', '您还未选择构建的任务!', '请选择构建的任务后,重试...', 'ok') // 删除的弹窗
            return false
        }
        for(var i = 0; i < arr_ele.length; i++) {
            $(arr_ele[i]).parents('tr').find('td').eq(index).html(html)
        }
    })
}

$('.add .delete').click(function() { // 点击删除
    var checked = $('.pack td input:checked')
    if(checked.length === 0) {
        popup_delete('.add .delete', '您还未选择删除的任务!', '请选择删除的任务后,重试...', 'ok') // 删除的弹窗
    } else {
        popup_delete('.add .delete', '是否确认删除该任务？', '您是否确认删除该任务，删除之后不可恢复！', 'ok') // 删除的弹窗
    }
})