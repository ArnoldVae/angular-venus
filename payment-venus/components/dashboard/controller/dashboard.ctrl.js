/**
 * 工作台控制器
 */
define([
    '../module','eChart'
],function (moduleApp,eChart) {
    'use strict';
    var DashboardCtrl = function($scope,$$dashboard,$rootScope,$modal,$state){
        //通知信息滚动

        function Marquee(){
            var demo = document.getElementById("demo");
            if(!demo){
                return false
            }
            var demo1 = document.getElementById("demo1");
            if(!demo1){
                return false
            }
            var demo2 = document.getElementById("demo2");
            if(!demo2){
                return false
            }
            demo2.innerHTML=document.getElementById("demo1").innerHTML;
            if(demo.scrollLeft-demo2.offsetWidth>=0){
                demo.scrollLeft-=demo1.offsetWidth;
            }
            else{
                demo.scrollLeft++;
            }
        }
        var myvar;
        if(!$rootScope.isFirst) {
            myvar=setInterval(Marquee,30);
            $rootScope.isFirst = true;
        }

        // demo.onmouseout=function (){myvar=setInterval(Marquee,30);}
        // demo.onmouseover=function(){clearInterval(myvar);}

        $scope.abnormalQuery=function(){
            $$dashboard.abnormalQuery('',{
                success:function(data){
                    $scope.abnormals=data;
                },
                error:function(e){

                }
            })

        };

        /***
         * 工作台通知查询--日结失败提醒接口
        ***/
        $scope.DailyPaymentQuery=function(){
            $$dashboard.DailyPaymentQuery({handlerCode:$scope.usercode},{
                success:function(data){
                    console.log('工作台通知--日结失败提醒接口',data);
                    $scope.dailyFailNotice = data;
                },
                error:function(e){

                }
            })

        };
        $scope.DailyPaymentQuery();
        //todo 需要定时刷新数据规则
        $scope.abnormalQuery();

        /**
         * 查看所有的日结失败单
         */
        $scope.goAllDailyFailNotice = function () {
            $modal.open({
                templateUrl: 'components/dashboard/tpl/modal/AllDailyFailNotice.modal.tpl.html',
                resolve: {
                    dailyFailNotice: function () {
                        return $scope.dailyFailNotice || [];
                    }

                },
                controller: function ($scope, $modalInstance, dailyFailNotice) {
                    $scope.dailyFailNotice = dailyFailNotice;
                    //关闭弹窗
                    $scope.cancel = function () {
                        $modalInstance.dismiss();
                    };

                }
            });
        };

        /**
         * 右侧饼状图
         */
        var myChart = eChart.init(document.getElementById('main'));
        var option = {
            title : {
                text: '',
                subtext: '',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: []
            },
            series : [
                {
                    name: '',
                    type: 'pie',
                    radius : '40%',
                    center: ['50%', '50%'],
                    data:[
                        {value:1000, name:'收保费'},
                        {value:2000, name:'付赔款'}

                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur:10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        myChart.setOption(option);


        //任务类型数据
        $scope.getTasks = [
            {
                "id":"001",
                "text": "支付审核",//标题
                "actionURL": "",//路由
                "checked": true,
                "image": ""//图标
            },
            {
                "id":"002",
                "text": "退票处理",//标题
                "actionURL": "",//路由
                "checked": true,
                "image": ""//图标
            },
            {
                "id":"003",
                "text": "日结监控",//标题
                "actionURL": "",//路由
                "checked": true,
                "image": ""//图标
            },
            {
                "id":"004",
                "text": "工作台4",//标题
                "actionURL": "",//路由
                "checked": false,
                "image": ""//图标
            },
            {
                "id":"005",
                "text": "工作台5",//标题
                "actionURL": "",//路由
                "checked": false,
                "image": ""//图标
            }
        ];

        //快捷操作数据
        $scope.getHotKeys = [
            {
                "id":"001",
                "text": "立即日结",//标题
                "actionURL": "dailySetUp",//路由
                "checked": true,
                "image": "images/rijie.jpg"//图标
            },
            {
                "id":"002",
                "text": "蓝票申请",//标题
                "actionURL": "blueInvoiceIssued",//路由
                "checked": true,
                "image": "images/lanpiao.jpg"//图标
            },
            {
                "id":"003",
                "text": "收保费",//标题
                "actionURL": "auditing",//路由
                "checked": true,
                "image": "images/shoubaofei.jpg"//图标
            },
            {
                "id":"004",
                "text": "收付员日结",//标题
                "actionURL": "tellerDaily",//路由
                "checked": false,
                "image": "images/rijie.jpg"//图标
            }


        ];

        $scope.waitingTasks = [];
        //任务类型配置完成后回调函数-得到待办任务数据
        $scope.getCommission = function () {
            // TODO:后续通过接口获取waitingTasks数组
            var waitingTask1 = {
                    "id":"001",
                    "title":"支付审核任务	",
                    "list":[
                        {
                            "businessType":"付赔款",
                            "payNo":"ZC2017200000000530061",
                            "payCurrency":"CNY",
                            "paySum":"25680.00",
                            "paymentPerson":"赵光",
                            "paymentNo":"35672343423423",
                            "organization":"2110000",
                            "submitPerson":"张亮",
                            "submitTime":"2017-08-01 12:18"
                        },
                        {
                            "businessType":"付赔款",
                            "payNo":"ZC2017200000000530061",
                            "payCurrency":"CNY",
                            "paySum":"13680.00",
                            "paymentPerson":"赵光",
                            "paymentNo":"35672343423423",
                            "organization":"2110000",
                            "submitPerson":"张亮",
                            "submitTime":"2017-08-02 09:11"
                        },
                        {
                            "businessType":"付赔款",
                            "payNo":"ZC2017200000000530061",
                            "payCurrency":"CNY",
                            "paySum":"1080.00",
                            "paymentPerson":"赵光",
                            "paymentNo":"35672343423423",
                            "organization":"2110000",
                            "submitPerson":"张亮",
                            "submitTime":"2017-08-03 16:10"
                        }
                    ]
            };
            var waitingTask2 = {
                "id":"002",
                "title":"退票处理任务",
                "list":[
                    {
                        "businessType":"付赔款",
                        "payNo":"ZC2017200000000530061",
                        "payCurrency":"CNY",
                        "paySum":"10000.00",
                        "paymentPerson":"陈晨",
                        "paymentNo":"35672343423423",
                        "organization":"2110000",
                        "submitPerson":"张亮",
                        "submitTime":"2017-08-01 12:18"
                    },
                    {
                        "businessType":"付赔款",
                        "payNo":"ZC2017200000000530061",
                        "payCurrency":"CNY",
                        "paySum":"680.00",
                        "paymentPerson":"赵茜",
                        "paymentNo":"35672343423423",
                        "organization":"2110000",
                        "submitPerson":"张亮",
                        "submitTime":"2017-08-02 09:11"
                    },
                    {
                        "businessType":"付赔款",
                        "payNo":"ZC2017200000000530061",
                        "payCurrency":"CNY",
                        "paySum":"5080.00",
                        "paymentPerson":"赵光",
                        "paymentNo":"35672343423423",
                        "organization":"2110000",
                        "submitPerson":"张亮",
                        "submitTime":"2017-08-03 16:10"
                    }
                ]
            };

            if(!!$scope.getTasks && $scope.getTasks.length > 0){
                $.each($scope.getTasks, function (index, _obj) {
                    if(_obj.id == "001"){
                        if(_obj.checked){
                            if(!!$scope.waitingTasks && $scope.waitingTasks.length > 0){
                                var isFlag = true;
                                $.each($scope.waitingTasks, function (index, waitingTask) {
                                    if(waitingTask.id == "001"){
                                        isFlag  = false;
                                    }
                                });
                                if(isFlag){
                                    $scope.waitingTasks.push(waitingTask1);
                                }
                            } else {
                                $scope.waitingTasks.push(waitingTask1);
                            }
                        }else {
                            if(!!$scope.waitingTasks && $scope.waitingTasks.length > 0){
                                $.each($scope.waitingTasks, function (index, waitingTask) {
                                    if(waitingTask.id == "001"){
                                        $scope.waitingTasks.splice(index,1);
                                    }
                                })
                            }
                        }
                    }
                    if(_obj.id == "002"){
                        if(_obj.checked){
                            if(!!$scope.waitingTasks && $scope.waitingTasks.length > 0){
                                var isFlag = true;
                                $.each($scope.waitingTasks, function (index, waitingTask) {
                                    if(waitingTask.id == "002"){
                                        isFlag  = false;
                                    }
                                });
                                if(isFlag){
                                    $scope.waitingTasks.push(waitingTask2);
                                }
                            } else {
                                $scope.waitingTasks.push(waitingTask2);
                            }
                        }else {
                            if(!!$scope.waitingTasks && $scope.waitingTasks.length > 0){
                                $.each($scope.waitingTasks, function (index, waitingTask) {
                                    if(waitingTask.id == "002"){
                                        $scope.waitingTasks.splice(index,1);
                                    }
                                })
                            }
                        }
                    }
                })
            }
        };
        $scope.getCommission();

    };
    moduleApp.controller('DashboardCtrl',['$scope','$$dashboard','$rootScope','$modal','$state',DashboardCtrl]);

});