/**
 *仲裁管理控制器
 */
define([
    '../module'
], function (moduleApp) {
    'use strict';
    var arbitrationManage = function ($scope, $$arbitrationManage, $modal) {
        $scope.tapFlag = '1';
        $scope.tapName = [
            {
                'title': '仲裁管理',
                'index': '1',
                'active': true,
                "btnStyle":{"width":"150px"}
            },
            {
                'title': '仲裁撤销',
                'index': '2',
                'active': false,
                "btnStyle":{"width":"150px"}

            }
        ];
        /**
         * tap切换
         */
        $scope.changeTap = function (index) {
            $scope.tapFlag = index;
        };
        /**
         *查询
         */
        $scope.searchArbitrationManage = function () {
            $$arbitrationManage.searchArbitrationManage($scope.arbitrationManage,{
                success: function (data) {
                    console.log(data);
                    $scope.arbitrationManageList = data;
                    $scope.pagination.totalItems = data.content.totalCount;
                },
                error: function (e) {
                }
            },{
                "pageNo": $scope.pagination.pageIndex,
                "pageSize": $scope.pagination.pageSize
            });
        };
        /**
         *重置
         */
        $scope.resetArbitrationManage = function () {
            $scope.arbitrationManage = {};
        };
        /**
         *仲裁处理
         */
        $scope.arbitrationProcess = function (target) {
            $modal.open({
                templateUrl: 'components/collection/arbitrationManage/tpl/modal/arbitrationManage.modal.html',
                resolve: {
                    target:function () {
                        return target
                    }
                },
                controller: function ($scope, $modalInstance,target) {
                    //todo
                    $scope.modalArbitrationManage = {
                        "checked" :false,
                        "policyNo" :'102017082600005556',
                        "handler1Name" :'北京分公司',
                        "businessNature" :'62228452645',
                        "agentName" :'三井保险北京分公司',
                        "riskCode" :'62228157269',
                        "coinsName" :'赵光',
                        "startDate" :'2017-05-20 18:20:17',
                        "payNo" :'1',
                        "currency1" :'CNY',
                        "planFee" :'100.00',
                        "vatRate" :'6%',
                        "taxFee" :'0',
                        "changeClass" :'',
                        "businessType":'手续费',
                        "list":[
                            {
                                "checked" :false,
                                "policyNo" :'102017082600005534',
                                "handler1Name" :'北京分公司',
                                "businessNature" :'62228452632',
                                "agentName" :'三井保险北京分公司',
                                "riskCode" :'62228157234',
                                "coinsName" :'田苏',
                                "startDate" :'2017-05-20 18:20:17',
                                "payNo" :'1',
                                "currency1" :'CNY',
                                "planFee" :'100.00',
                                "vatRate" :'6%',
                                "taxFee" :'300',
                                "changeClass" :'',
                                "businessType":'手续费'
                            },
                            {
                                "checked" :false,
                                "policyNo" :'102017082600005456',
                                "handler1Name" :'北京分公司',
                                "businessNature" :'62228452098',
                                "agentName" :'三井保险北京分公司',
                                "riskCode" :'62228157098',
                                "coinsName" :'李季',
                                "startDate" :'2017-05-20 18:20:17',
                                "payNo" :'1',
                                "currency1" :'CNY',
                                "planFee" :'100.00',
                                "vatRate" :'3%',
                                "taxFee" :'330',
                                "changeClass" :'',
                                "businessType":'手续费'
                            }
                        ]
                    };
                    //关闭弹窗
                    $scope.cancel=function(){
                        $modalInstance.dismiss();
                    };
                    //全选
                    $scope.checkedAll = function () {
                        angular.forEach($scope.modalArbitrationManage.list,function (data) {
                            if ($scope.modalArbitrationManage.checkedAll){
                                data.checked = true
                            }else {
                                data.checked = false
                            }
                        })
                    };
                    //单选
                    $scope.checkedOne = function () {
                        $scope.modalArbitrationManage.checkedAll = $scope.modalArbitrationManage.list.every(function (data) {
                            return data.checked;
                        })
                    };
                    // 勾选改变状态
                    $scope.changeClass = function () {
                        angular.forEach($scope.modalArbitrationManage.list,function (data) {
                            if (data.checked){
                                data.changeClass = 'venus_table_check';
                            }
                            else{
                                data.changeClass =''
                            }
                        });
                    };
                    //仲裁确认
                    $scope.confirmArbitration = function () {
                        layer.confirm("确定仲裁当前信息？",{
                            btn: ['确定','取消'] //按钮
                        },function () {
                            layer.close();
                            $$arbitrationManage.confirmArbitrationManage($scope.modalArbitrationManage,{
                                success: function (data) {
                                    console.log(data);
                                    if (data.message == "成功"){
                                        layer.msg("仲裁确认成功！",{icon:1});
                                    }
                                },
                                error: function (e) {
                                    layer.msg("仲裁确认失败！",{icon:2})
                                }
                            });
                        })
                    };
                    //仲裁退回
                    $scope.returnArbitration = function () {
                        $$arbitrationManage.returnArbitration($scope.modalArbitrationManage,{
                            success: function (data) {
                                console.log(data);
                                if (data.message == "成功"){
                                    layer.msg("仲裁退回成功！",{icon:1});
                                }
                            },
                            error: function (e) {
                                layer.msg("仲裁退回失败！",{icon:2});
                            }
                        });
                    };
                }
            }).result.then(function (record) {
            });
        };
        /**
         *仲裁撤销查询
         */
        $scope.searchArbitrationReturn = function () {
            $$arbitrationManage.searchArbitrationReturn($scope.arbitrationReturn,{
                success: function (data) {
                    console.log(data);
                    $scope.arbitrationReturn = data;
                    $scope.pagination.totalItems = data.content.totalCount;
                },
                error: function (e) {
                }
            });
        };
        /**
         *撤销仲裁结果
         */
        $scope.arbitrationReturnResult = function () {
            $$arbitrationManage.arbitrationReturnResult($scope.arbitrationReturn,{
                success: function (data) {
                    console.log(data);
                    if (data.message == "成功"){
                        layer.msg("撤销成功！",{icon:1})
                    }
                },
                error: function (e) {
                }
            });
        };
        /**
         * 初始化函数
         */
        var init = function () {
            //分页信息
            $scope.pagination = {
                totalItems: '',//总数
                pageIndex: '0',//当前页面
                pageSize: '10',//显示条数
                maxSize: '8',//最大页数
                numPages: '',//共有多少页
                previousText: '上一页',
                nextText: '下一页',
                firstText: '首页',
                lastText: '末页'
            };
            $scope.arbitrationManage ={};
            $scope.arbitrationReturn = {};
        };
        init();
    };

    moduleApp.controller('ArbitrationManageCtrl', ['$scope', '$$arbitrationManage', '$modal', arbitrationManage]);

});
