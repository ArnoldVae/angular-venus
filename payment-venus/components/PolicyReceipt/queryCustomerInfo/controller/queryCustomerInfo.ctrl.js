/**
 * Created on 2017/11/20.
 *客户化查询、保单收付信息查询会调相同的接口、公用相同的页面
 */
define([
    '../module',
    'config'
],function (moduleApp,config) {
    'use strict';
    var queryCustomerInfo=function($scope,$modal,$$queryCustomerInfo,mcMultiEditorCacheService) {
        /**
         * 客户化查询
         */
        $scope.queryCustomerInfo = function (target) {
            if(target!='page'){
                $scope.queryCustomerInfoNew.pagination.pageIndex=1
            }
            $scope.queryCustomerInfoNew.info.comCode=$scope.comCode;
            $scope.queryCustomerInfoNew.info.userDto={
                "userCode":$scope.usercode,
                "userName":$scope.userName,
                "comCode":$scope.comCode
            };
            $$queryCustomerInfo.queryCustomerInfo($scope.queryCustomerInfoNew.info,{
                success: function (data) {
                    $scope.queryCustomerInfoNew.CustomerInfoList=data.content.content;
                    if(!$scope.queryCustomerInfoNew.CustomerInfoList){
                        layerMsg('暂无数据！');
                        return false
                    }
                    $scope.queryCustomerInfoNew.pagination.totalItems=data.content.totalCount;//列表总条数

                },
                error: function (e) {
                }
            },{
                "pageNo":$scope.queryCustomerInfoNew.pagination.pageIndex,
                "pageSize":$scope.queryCustomerInfoNew.pagination.pageSize
            })
        };
        //重置
        $scope.reset = function(){
            $scope.queryCustomerInfoNew.info={
                "comCode":$scope.comCode,
                "isHasLevel":"",
                "customerType":"",
                "customerKind":"",
                "customerCode":"",
                "customerName":"",
                "mobile":"",
                "appliName":"",
                "carId":"",
                "userDto":{
                    "userCode":$scope.usercode,
                    "userName":$scope.userName,
                    "comCode":$scope.comCode
                },
                "taskCode":'payment.integrated.customQuery'
            }
        };
        /**
         * 保单收付信息
         */
        $scope.PolicyInfoQuery = function (target) {
            var target = target;
            var obj = {};
            if (target.customerType = '0') {
                obj.appliCode = target.customerCode
            } else if (target.customerType = '1') {
                obj.insuredCode = target.customerCode
            } else if (target.customerType = '2') {
                obj.agentCode = target.customerCode
            } else if (target.customerType = '4') {
                obj.coinsCode = target.customerCode
            }
            obj.userDto={
                "userCode":$scope.usercode,
                "userName":$scope.userName,
                "comCode":$scope.comCode
            };
            obj.taskCode='payment.integrated.policypayment';
            $modal.open({
                templateUrl:"components/PolicyReceipt/queryCustomerInfo/tpl/modal/QueryCustomerInfo.modal.tpl.html",
                resolve:{
                    obj:function () {
                        return obj
                    }
                },
                controller:function ($scope,$modalInstance,obj) {
                    $scope.pagination={
                        totalItems:'',//总数
                        pageIndex:'1',//当前页面
                        pageSize:'15',//显示条数
                        numPages:'',//共有多少页
                        previousText: '上一页',
                        nextText: '下一页',
                        firstText: '第一页',
                        lastText: '最后一页'
                    };
                    //页面调用查询
                    $scope.PolicyInfoSearch=function (target) {
                        if(target!='page'){
                            $scope.pagination.pageIndex=1
                        }
                        $$queryCustomerInfo.PolicyInfoQuery(obj, {
                            success: function (data) {
                                $scope.PolicyReceiptList=data.content.content;
                                $scope.pagination.totalItems=data.content.totalCount;

                                if (!$scope.PolicyReceiptList) {
                                    layerMsg('暂无数据！');
                                    return false
                                }
                            },
                            error: function (e) {
                            }
                        }, {
                            "pageNo": $scope.pagination.pageIndex,
                            "pageSize": $scope.pagination.pageSize
                        })
                    };
                    //自动加载查询
                    $scope.PolicyInfoSearch();
                    $scope.cancel = function () {
                        $modalInstance.dismiss();
                    };
                    //保单收付信息详情
                    $scope.findDetail = function (target) {
                        $modal.open({
                            templateUrl:"components/PolicyReceipt/queryCustomerInfo/tpl/modal/Info.modal.tpl.html",
                            resolve:{
                                target:function () {
                                    return target;
                                }
                            },
                            controller:function ($scope,$modalInstance,target) {
                                $scope.policyNo=target;//页面上绑定的保单号
                                $$queryCustomerInfo.findDetail($scope.policyNo,{
                                    success:function (data) {
                                        $scope.Detail=data.policyBasicInfoDto;
                                        console.log($scope.Detail);
                                        if(!$scope.Detail){
                                            layerMsg('暂无数据！');
                                            return false
                                        }
                                    },
                                    error:function () {
                                    }
                                });
                                $scope.voucherList = function (target) {
                                    $modal.open({
                                        templateUrl: 'components/PolicyReceipt/queryCustomerInfo/tpl/modal/voucher.modal.tpl.html',
                                        resolve: {
                                            target:function () {
                                                return target
                                            }
                                        },
                                        controller: function ($scope, $modalInstance,target) {
                                            $scope.pagination={
                                                totalItems2:'',//总数
                                                pageIndex:'1',//当前页面
                                                pageSize:'15',//显示条数
                                                numPages:'',//共有多少页
                                                previousText: '上一页',
                                                nextText: '下一页',
                                                firstText: '第一页',
                                                lastText: '最后一页'
                                            };
                                            $scope.voucher=function(page){
                                                if(page!='page'){
                                                    $scope.pagination.pageIndex=1
                                                }
                                                $$queryCustomerInfo.payLossInfo(target,{
                                                    success:function (data) {
                                                        $scope.paymentList = data.content.dailyPaymentCheckList;
                                                        $scope.paymentList2 = data.content;
                                                        $scope.pagination.totalItems2=data.content.totalCount;
                                                    },
                                                    error:function () {

                                                    }
                                                },{
                                                    "pageNo": $scope.pagination.pageIndex-1,
                                                    "pageSize": $scope.pagination.pageSize
                                                })
                                            };
                                            $scope.voucher();
                                            $scope.cancel = function () {
                                                $modalInstance.dismiss();
                                            };
                                        }
                                    });
                                };
                                $scope.cancel = function () {
                                    $modalInstance.dismiss();
                                };
                            }
                        })
                    };
                }
            })
        };
        $scope.searchAdviceOfSettlement = function (target) {
            $modal.open({
                templateUrl:"components/PolicyReceipt/queryCustomerInfo/tpl/modal/AdviceOfSettlement.modal.tpl.html",
                resolve:{
                    target:function () {
                        return target;
                    }
                },
                controller:function ($scope,$modalInstance,target) {
                    $scope.pagination={
                        totalItems:'',//总数
                        pageIndex:'1',//当前页面
                        pageSize:'15',//显示条数
                        numPages:'',//共有多少页
                        previousText: '上一页',
                        nextText: '下一页',
                        firstText: '第一页',
                        lastText: '最后一页'
                    };
                    var obj={};
                    obj.customName = target.customerName;
                    obj.customCode = target.customerCode;
                    $scope.AdviceOfSettlementSearch=function (target) {
                        if(target!='page'){
                            $scope.pagination.pageIndex=1
                        }
                        $$queryCustomerInfo.searchReparations(obj, {
                            success: function (data) {
                                $scope.confirmList = data.content.content;
                                if (!$scope.confirmList) {
                                    layerMsg('暂无数据！');
                                    return false
                                }
                                $scope.pagination.totalItems = data.content.totalCount;
                            },
                            error: function (e) {
                            }
                        }, {
                            "pageNo": $scope.pagination.pageIndex-1,
                            "pageSize": $scope.pagination.pageSize
                        });
                    };
                    $scope.AdviceOfSettlementSearch();
                    $scope.cancel = function () {
                        $modalInstance.dismiss();
                    }
                }
            });
        };

        /**
         * 获取上次数据
         */
        var getLastData = function(){
            var localDada=mcMultiEditorCacheService.localData('CustomizedQuery');//获取上次数据
            if(localDada){
                $scope.queryCustomerInfoNew=localDada;
            }
        };
        /**
         * 存储当前页面数据和状态
         */
        var saveData = function(){
            mcMultiEditorCacheService.localData('CustomizedQuery',$scope.queryCustomerInfoNew);//存储数据
        };
        /**
         * 初始化函数
         */
        /**
         * 初始化函数
         */
        var init=function(){
            $scope.queryCustomerInfoNew=$$queryCustomerInfo.queryCustomerInfoNew();
            getLastData();
            saveData();
        };
        init();
    };
    moduleApp.controller('queryCustomerInfoCtrl',['$scope','$modal','$$queryCustomerInfo','mcMultiEditorCacheService',queryCustomerInfo]);
});
