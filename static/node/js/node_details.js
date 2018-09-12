 // 基于准备好的dom，初始化echarts实例
 var myChart = echarts.init(document.getElementById('slave1'));

 var gain = 0.9;
 var gap = 0;
 var myColor = ['#e63810', '#ff6b00', '#e3b61f', '#13b5b1'];
 var myBgColor = ['rgba(230,56,16,0.2)', 'rgba(255,107,0,0.2)', 'rgba(227,182,31,0.2)', 'rgba(19,181,177,0.2)'];

 //柱子数据
 var data = [8, 15, 10, 6];
 var option = {
     color: ['#4472C5', '#ED7C30', '#80FF80', '#FF8096', '#800080'],
     backgroundColor: 'rgba(0,0,0,0.8)',
     title: {
         text: '任务类型统计信息',
         textStyle: {
             color: '#fff',
             fontSize: 26
         },
         subtext: '各个任务类型所占比例信息统计',
         subtextStyle: {
             fontSize: 18
         },
         left: 608,
         top: 99
     },
     legend: {
         orient: 'horizontal',
         width: '100px',
         bottom: '5%',
         left: '60%',
         textStyle: {
             color: '#fff',
         },
         itemGap: 15,
         // data: ['a', 'b', 'c', 'd'],
         data: [{
                 name: 'a'
             },
             {
                 name: 'b'
             },
             {
                 name: 'c'
             },
             {
                 name: 'd'
             }
         ]

     },
     length: {
         type: 'plain',
         left: 609,
         top: 375,
     },
     grid: {
         x: 62,
         width: 500,
         left: '6%',
         top: '100',
         right: '2%',
         bottom: '5%',
         containLabel: true
     },
     xAxis: [{
         type: 'category',
         axisTick: {
             show: false
         },
         axisLine: {
             lineStyle: {
                 color: 'rgba(160,160,160,0.3)',
             }
         },
         axisLabel: {
             textStyle: {
                 color: function (param, index) {
                     return myColor[index]
                 },
                 fontSize: 13 * gain,
             }
         },
         data: ['01', '02', '03', '04']
     }, {
         type: 'category',
         axisLine: {
             show: false
         },
         axisTick: {
             show: false
         },
         axisLabel: {
             show: false
         },
         splitArea: {
             show: false
         },
         splitLine: {
             show: false
         },
         data: []
     }, ],
     yAxis: {
         type: 'value',
         name: '单位：件',
         nameGap: 35 + gap,
         nameTextStyle: {
             color: '#ffffff',
             fontSize: 16 * gain,
         },
         axisTick: {
             show: false
         },
         axisLine: {
             show: false
         },
         splitLine: {
             lineStyle: {
                 color: 'rgba(160,160,160,0.3)',
             }
         },
         axisLabel: {
             textStyle: {
                 color: 'rgba(255,255,255,0.8)',
                 fontSize: 14 * gain,
             }
         }
     },
     series: [{
             type: 'bar',
             xAxisIndex: 1,
             itemStyle: {
                 normal: {
                     show: true,
                     color: function (params) {
                         var num = myBgColor.length;
                         return myBgColor[params.dataIndex % num]
                     },
                     barBorderRadius: 50,
                     borderWidth: 0,
                     borderColor: '#333',
                 }
             },
             label: {
                 normal: {
                     show: true,
                     formatter: function (params) {
                         var stuNum = 0;
                         data.forEach(function (value, index, array) {
                             if (params.dataIndex == index) {
                                 stuNum = value;
                             }
                         })
                         return stuNum;
                     },
                     position: 'top',
                     textStyle: {
                         color: function (params) {
                             var num = myBgColor.length;
                             return myBgColor[params.dataIndex % num]
                         },
                         fontSize: 25 * gain,
                     }
                 }
             },
             barWidth: '25%',
             data: [33, 33, 33, 33],
             name: 'a'
         },
         {
             type: 'bar',
             itemStyle: {
                 normal: {
                     show: true,
                     color: function (params) {
                         var num = myColor.length;
                         return myColor[params.dataIndex % num]
                     },
                     barBorderRadius: 50,
                     borderWidth: 0,
                     borderColor: '#333',
                 }
             },
             label: {
                 normal: {
                     show: false,

                 }
             },
             barWidth: '25%',
             data: [13, 23, 6, 15],
             name: 'b'
         },
         {
             type: 'bar',
             itemStyle: {
                 normal: {
                     show: true,
                     color: function (params) {
                         var num = myColor.length;
                         return myColor[params.dataIndex % num]
                     },
                     barBorderRadius: 50,
                     borderWidth: 0,
                     borderColor: '#333',
                 }
             },
             label: {
                 normal: {
                     show: false,

                 }
             },
             barWidth: '-10%',
             data: [0, 0, 0, 0],
             name: 'c'
         },
         {
             type: 'bar',
             itemStyle: {
                 normal: {
                     show: true,
                     color: function (params) {
                         var num = myColor.length;
                         return myColor[params.dataIndex % num]
                     },
                     barBorderRadius: 50,
                     borderWidth: 0,
                     borderColor: '#333',
                 }
             },
             label: {
                 normal: {
                     show: false,

                 }
             },
             barWidth: '5%',
             data: [0, 0, 0, 0],
             name: 'd'
         }
     ]
 };

 // 使用刚指定的配置项和数据显示图表。
 myChart.setOption(option);






 // 基于准备好的dom，初始化echarts实例
 var myChart2 = echarts.init(document.getElementById('slave3'));

 var placeHolderStyle = {
     normal: {
         label: {
             show: false
         },
         labelLine: {
             show: false
         },
         color: "rgba(0,0,0,0)",
         borderWidth: 0
     },
     emphasis: {
         color: "rgba(0,0,0,0)",
         borderWidth: 0
     }
 };


 var dataStyle = {
     normal: {
         formatter: '{c}%',
         position: 'center',
         show: true,
         textStyle: {
             fontSize: '28',
             fontWeight: 'normal',
             color: '#666'
         }
     }
 };


 option = {
     backgroundColor: '#f2f6fc',
     title: [{
         text: 'Slave Node物理内存可利用率',
         left: '29.8%',
         top: '65%',
         textAlign: 'center',
         textStyle: {
             fontWeight: 'normal',
             fontSize: '16',
             color: '#333',
             textAlign: 'center',
         },
     }, {
         text: 'Slave Node Swap空间可利用率',
         left: '70%',
         top: '65%',
         textAlign: 'center',
         textStyle: {
             color: '#333',
             fontWeight: 'normal',
             fontSize: '16',
             textAlign: 'center',
         },
     }],
     series: [{
             type: 'pie',
             hoverAnimation: false, //鼠标经过的特效
             radius: ['25%', '31%'],
             center: ['30%', '50%'],
             startAngle: 225,
             labelLine: {
                 normal: {
                     show: false
                 }
             },
             label: {
                 normal: {
                     position: 'center'
                 }
             },
             data: [{
                     value: 75,
                     itemStyle: {
                         normal: {
                             color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                 offset: 0,
                                 color: '#99da69'
                             }, {
                                 offset: 1,
                                 color: '#01babc'
                             }]),
                         }
                     },
                     label: dataStyle,
                 }, {
                     value: 25,
                     itemStyle: placeHolderStyle,
                 },

             ]
         },
         {
             type: 'pie',
             hoverAnimation: false,
             radius: ['25%', '31%'],
             center: ['70%', '50%'],
             startAngle: 225,
             labelLine: {
                 normal: {
                     show: false
                 }
             },
             label: {
                 normal: {
                     position: 'center'
                 }
             },
             data: [{
                     value: 30,
                     itemStyle: {
                         normal: {
                             color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                 offset: 0,
                                 color: '#9f3edd'
                             }, {
                                 offset: 1,
                                 color: '#4897f6'
                             }]),
                         }
                     },
                     label: dataStyle,
                 }, {
                     value: 80,
                     itemStyle: placeHolderStyle,
                 },

             ]
         },

         //外圈的边框
         {
             // name: '总人数',
             type: 'pie',
             hoverAnimation: false, //鼠标经过的特效
             radius: ['31%', '32%'],
             center: ['30%', '50%'],
             startAngle: 225,
             labelLine: {
                 normal: {
                     show: false
                 }
             },
             label: {
                 normal: {
                     position: 'center'
                 }
             },
             data: [{
                     value: 75,
                     itemStyle: {
                         normal: {
                             color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                 offset: 0,
                                 color: '#01babc'
                             }, {
                                 offset: 1,
                                 color: '#99da69'
                             }]),
                         }
                     },
                 }, {
                     value: 25,
                     itemStyle: placeHolderStyle,
                 },

             ]
         },
         {
             type: 'pie',
             hoverAnimation: false,
             radius: ['31%', '32%'],
             center: ['70%', '50%'],
             startAngle: 225,
             labelLine: {
                 normal: {
                     show: false
                 }
             },
             label: {
                 normal: {
                     position: 'center'
                 }
             },
             data: [{
                     value: 75,
                     itemStyle: {
                         normal: {
                             color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                 offset: 0,
                                 color: '#4897f6'
                             }, {
                                 offset: 1,
                                 color: '#9f3edd'
                             }]),
                         }
                     },
                 }, {
                     value: 25,
                     itemStyle: placeHolderStyle,
                 },

             ]
         },
     ]
 };

 // 使用刚指定的配置项和数据显示图表。
 myChart2.setOption(option);