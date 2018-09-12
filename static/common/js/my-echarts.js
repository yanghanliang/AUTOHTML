/*
工作流任务数目统计信息-start
*/

function task_num() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));

    var gain = 0.9;
    var gap = 0;
    var myColor = ['#e63810', '#ff6b00', '#e3b61f', '#13b5b1'];
    var myBgColor = ['rgba(230,56,16,0.2)', 'rgba(255,107,0,0.2)', 'rgba(227,182,31,0.2)', 'rgba(19,181,177,0.2)'];
    //柱子数据
    var data = [8, 15, 10, 6];
    var option = {
        backgroundColor: 'rgba(0,0,0,0.8)',
        grid: {
            left: '3%',
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
                data: [33, 33, 33, 33]
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
                data: data
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}

/*
工作流任务数目统计信息-end
*/




/*
工作流状态统计信息-start
*/

function task_state() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main2'));

    function deepCopy(obj) {
        if (typeof obj !== 'object') {
            return obj;
        }
        var newobj = {};
        for (var attr in obj) {
            newobj[attr] = obj[attr];
        }
        return newobj;
    }
    var xData = [],
        yData = [];
    var data = [{
        "name": "notbuilt\n35%",
        "value": 1895457
    }, {
        "name": "building\n15%",
        "value": 722232
    }, {
        "name": "failure\n35%",
        "value": 1723130
    }, {
        "name": "success\n15%",
        "value": 854920
    }]
    data.map((a, b) => {
        xData.push(a.name);
        yData.push(a.value);
    });
    var startColor = ['#0157be', '#7a18ed', '#00bbce', '#ea865a'];
    var endColor = ['#0367d4', '#2743ed', '#00c4a5', '#ea2e41'];
    var borderStartColor = ['#05acff', '#ee36ff', '#05fcfb', '#ffa597'];
    var borderEndColor = ['#09c1ff', '#8171ff', '#05ffff', '#ff6584'];
    var RealData = [];
    var borderData = [];
    data.map((item, index) => {
        var newobj = deepCopy(item);
        var newobj1 = deepCopy(item);
        RealData.push(newobj);
        borderData.push(newobj1);
    });
    RealData.map((item, index) => {
        item.itemStyle = {
            normal: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0,
                        color: startColor[index] // 0% 处的颜色
                    }, {
                        offset: 1,
                        color: endColor[index] // 100% 处的颜色
                    }],
                    globalCoord: false // 缺省为 false
                },
            }
        }
    });
    borderData.map((item, index) => {
        item.itemStyle = {
            normal: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0,
                        color: borderStartColor[index] // 0% 处的颜色
                    }, {
                        offset: 1,
                        color: borderEndColor[index] // 100% 处的颜色
                    }],
                    globalCoord: false // 缺省为 false
                },
            }
        }
    });
    option = {
        backgroundColor: "#08275b",
        series: [
            // 主要展示层的
            {
                radius: ['33%', '61%'],
                center: ['50%', '50%'],
                type: 'pie',
                label: {
                    normal: {
                        // show: false，
                        color: '#69b1ff',
                        padding: [0, -25] // 修改提示文字的位置
                    },
                    emphasis: {
                        show: false
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false
                    }
                },
                name: "民警训练总量",
                data: RealData,
                tooltip: {
                    formatter: "{a}：<br/>{b}: {c}人"
                }
            },
            // 边框的设置
            {
                radius: ['31%', '34%'],
                center: ['50%', '50%'],
                type: 'pie',
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false
                    }
                },
                animation: false,
                tooltip: {
                    show: false
                },
                data: borderData
            },
            // 中心的圆圈
            {
                radius: ['26%', '31%'],
                center: ['50%', '50%'],
                type: 'pie',
                label: {
                    normal: {
                        position: 'center',
                        formatter: [
                            '工作流状态',
                            '统计信息'
                        ].join('\n'),
                        fontSize: 18,
                        color: '#69b1ff',
                        rich: {
                            c: {
                                fontWeight: 'bold',
                                color: '#fff',
                                fontSize: 40
                            },
                            text: {
                                color: '#5B7DA3'
                            }
                        }
                    },
                    emphasis: {
                        show: false
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false
                    }
                },
                tooltip: {
                    show: false
                },
                data: [{
                    value: 100,
                    name: '民警训练总量',
                    itemStyle: {
                        normal: {
                            color: '#3d3d6b',
                        }
                    }
                }],
                animation: false
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}
/*
工作流状态统计信息-end
*/


/*
Slave节点列表信息-start
*/

function slave1() {
    var myChart = echarts.init(document.getElementById('slave1'));

        function mapTooltipClick(name) {
            alert(name)
        }

        function tooltipCharts() {
            console.log(arguments[0]);
            var myChart = echarts.init(document.getElementById('tooltipBarId'));
            var option = {
                tooltip: {},
                dataset: {
                    source: [
                        ['xAxis', '201701', '201702', '201703', '201704', '201705', '201706', '201707',
                            '201708', '201709', '20170', '201710', '20170', '201801'
                        ],
                        ['amount', 41.1, 30.4, 65.1, 53.3, 83.8, 98.7, 65.1, 53.3, 41.1, 30.4, 53.3, 41.1, 53.3,
                            83.8
                        ]
                    ]
                },
                xAxis: {
                    type: 'category',
                    interval: true,
                    axisLabel: {
                        rotate: 45
                    },
                    axisTick: {
                        show: false
                    }
                },
                yAxis: {},
                color: ['#4FA8F9', '#F5A623'],
                grid: {
                    show: true,
                    backgroundColor: '#FAFAFA',
                    left: 30,
                    right: 20,
                    top: 20
                },
                series: [{
                    type: 'bar',
                    smooth: true,
                    seriesLayoutBy: 'row',
                    barWidth: 10
                }]
            };
            myChart.setOption(option);
        }
        option = {
            title: {
                text: 'Slave全国节点分布图',
                textStyle: {
                    color: '#333333',
                    fontSize: 26
                },
                subtext: '涵盖全国各个地方省会城市，节点分布\n数据展示',
                subtextStyle: {
                    color: '#666666',
                    fontSize: 18
                },
                left: 830,
                top: 99
            },
            visualMap: {
                min: 0,
                max: 1000,
                left: 'right',
                top: 'bottom',
                text: ['高', '低'],
                calculable: false,
                orient: 'horizontal',
                inRange: {
                    color: ['#e0ffff', '#006edd'],
                    symbolSize: [30, 100]
                }
            },
            tooltip: {
                padding: 0,
                enterable: true,
                transitionDuration: 1,
                textStyle: {
                    color: '#000',
                    decoration: 'none',
                },
                // position: function (point, params, dom, rect, size) {
                //   return [point[0], point[1]];
                // },
                formatter: function (params) {
                    // console.log(params)
                    var tipHtml = '';
                    tipHtml =
                        '<div style="height:160px;width:400px;border-radius:5px;background:#fff;box-shadow:0 0 6px #aaa">' +
                        '    <div style="height:50px;width:100%;border-radius:5px;background:#F8F9F9;border-bottom:1px solid #F0F0F0">' +
                        '        <span style="line-height:50px;margin-left:18px">' + params.name + '</span>' +
                        '        <span style="float:right;line-height:50px;margin-right:18px;color:#5396E3;cursor:pointer" onclick="mapTooltipClick(this);">点击查看详情</span>' +
                        '    </div>' +
                        '    <div style="height:110px;width:100%;background:#fff">' +
                        '        <div style="padding-left:18px;padding-top:22px">' +
                        '            <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:rgba(92,169,235,1)"></span> ' +
                        '            <span>上传表格数量</span>' +
                        '            <span style="float:right;margin-right:18px">' + params.data.tipData[0] +
                        '万</span>' +
                        '        </div>' +
                        '        <div style="padding-left:18px;padding-top:14px">' +
                        '            <span style="display:inline-block;margin-right:5px;width:10px;height:10px;background-color:rgba(92,169,235,1)"></span> ' +
                        '            <span>上传数据条数</span>' +
                        '            <span style="float:right;margin-right:18px">' + params.data.tipData[1] +
                        '条</span>' +
                        '        </div>' +
                        '    </div>' +
                        '    <div id="tooltipBarId" style="height:0px;width:100%;border-radius:0 0 5px 0;background:#fff"></div>' +
                        '</div>';
                    //setTimeout(function() {
                    //    tooltipCharts(params.name);
                    //}, 10);
                    return tipHtml;
                }
            },
            series: [{
                name: 'iphone4',
                type: 'map',
                mapType: 'china',
                itemStyle: {
                    normal: {
                        label: {
                            show: false
                        }
                    },
                    emphasis: {
                        label: {
                            show: true
                        }
                    }
                },
                data: [{
                        name: '北京',
                        value: Math.round(Math.random() * 1000),
                        tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
                    },
                    {
                        name: '天津',
                        value: Math.round(Math.random() * 1000),
                        tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
                    },
                    {
                        name: '上海',
                        value: Math.round(Math.random() * 1000),
                        tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
                    },
                    {
                        name: '重庆',
                        value: Math.round(Math.random() * 1000),
                        tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
                    },
                    {
                        name: '河北',
                        value: Math.round(Math.random() * 1000),
                        tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
                    },
                    {
                        name: '河南',
                        value: Math.round(Math.random() * 1000),
                        tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
                    },
                    {
                        name: '云南',
                        value: Math.round(Math.random() * 1000),
                        tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
                    },
                    {
                        name: '辽宁',
                        value: Math.round(Math.random() * 1000),
                        tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
                    },
                    {
                        name: '黑龙江',
                        value: Math.round(Math.random() * 1000),
                        tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
                    },
                    {
                        name: '湖南',
                        value: Math.round(Math.random() * 1000),
                        tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
                    },
                    {
                        name: '安徽',
                        value: Math.round(Math.random() * 1000),
                        tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
                    },
                    {
                        name: '山东',
                        value: Math.round(Math.random() * 1000),
                        tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
                    },
                    {
                        name: '新疆',
                        value: Math.round(Math.random() * 1000),
                        tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
                    },
                    {
                        name: '江苏',
                        value: Math.round(Math.random() * 1000),
                        tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
                    },
                    {
                        name: '浙江',
                        value: Math.round(Math.random() * 1000),
                        tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
                    },
                    {
                        name: '江西',
                        value: Math.round(Math.random() * 1000),
                        tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
                    },
                    {
                        name: '湖北',
                        value: Math.round(Math.random() * 1000),
                        tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
                    },
                    {
                        name: '广西',
                        value: Math.round(Math.random() * 1000),
                        tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
                    },
                    {
                        name: '甘肃',
                        value: Math.round(Math.random() * 1000),
                        tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
                    },
                    {
                        name: '山西',
                        value: Math.round(Math.random() * 1000),
                        tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
                    },
                    {
                        name: '内蒙古',
                        value: Math.round(Math.random() * 1000),
                        tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
                    },
                    {
                        name: '陕西',
                        value: Math.round(Math.random() * 1000),
                        tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
                    },
                    {
                        name: '吉林',
                        value: Math.round(Math.random() * 1000),
                        tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
                    },
                    {
                        name: '福建',
                        value: Math.round(Math.random() * 1000),
                        tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
                    },
                    {
                        name: '贵州',
                        value: Math.round(Math.random() * 1000),
                        tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
                    },
                    {
                        name: '广东',
                        value: Math.round(Math.random() * 1000),
                        tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
                    },
                    {
                        name: '青海',
                        value: Math.round(Math.random() * 1000),
                        tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
                    },
                    {
                        name: '西藏',
                        value: Math.round(Math.random() * 1000),
                        tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
                    },
                    {
                        name: '四川',
                        value: Math.round(Math.random() * 1000),
                        tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
                    },
                    {
                        name: '宁夏',
                        value: Math.round(Math.random() * 1000),
                        tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
                    },
                    {
                        name: '海南',
                        value: Math.round(Math.random() * 1000),
                        tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
                    },
                    {
                        name: '台湾',
                        value: Math.round(Math.random() * 1000),
                        tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
                    },
                    {
                        name: '香港',
                        value: Math.round(Math.random() * 1000),
                        tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
                    },
                    {
                        name: '澳门',
                        value: Math.round(Math.random() * 1000),
                        tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
                    },
                ]
            }, ]
        }
        var count = 0;
        var timeTicket = null;
        var dataLength = option.series[0].data.length;
        timeTicket && clearInterval(timeTicket);
        timeTicket = setInterval(function () {
            myChart.dispatchAction({
                type: 'downplay',
                seriesIndex: 0,
            });
            myChart.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: (count) % dataLength
            });
            myChart.dispatchAction({
                type: 'showTip',
                seriesIndex: 0,
                dataIndex: (count) % dataLength
            });
            count++;
        }, 1000);

        myChart.on('mouseover', function (params) {
            console.log(params)
            clearInterval(timeTicket);
            myChart.dispatchAction({
                type: 'downplay',
                seriesIndex: 0
            });
            myChart.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: params.dataIndex
            });
            myChart.dispatchAction({
                type: 'showTip',
                seriesIndex: 0,
                dataIndex: params.dataIndex,
            });
        });
        myChart.on('mouseout', function (params) {
            timeTicket && clearInterval(timeTicket);
            timeTicket = setInterval(function () {
                myChart.dispatchAction({
                    type: 'downplay',
                    seriesIndex: 0,
                });
                myChart.dispatchAction({
                    type: 'highlight',
                    seriesIndex: 0,
                    dataIndex: (count) % dataLength
                });
                myChart.dispatchAction({
                    type: 'showTip',
                    seriesIndex: 0,
                    dataIndex: (count) % dataLength
                });
                count++;
            }, 1000);
        });
        myChart.setOption(option);
}

/*
Slave节点列表信息-end
*/