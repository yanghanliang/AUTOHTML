var all_data;

$.ajax({
    url: 'http://localhost:3000/all_data',
    type: 'get',
    dataType: 'jsonp',
    success: function (data) {
        all_data = data
    }
})
