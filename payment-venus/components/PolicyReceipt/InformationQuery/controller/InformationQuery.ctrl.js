/**
 * Created on 2017/11/19.
 *保单收付信息查询、客户化查询会调相同的接口、公用相同的页面
 */
define([
    '../module',
    'config'
],function (moduleApp,config) {
    'use strict';
    var InformationQuery=function($scope,$modal,$$InformationQuery,mcMultiEditorCacheService) {
        /**
         * 保单收付信息查询
         */
        $scope.InformationQuery = function (target) {
            if(target!='page'){
                $scope.informationQueryNew.pagination.pageIndex=1
            }
            $scope.informationQueryNew.info.userDto={
                "userCode":$scope.usercode,
                "userName":$scope.userName,
                "comCode":$scope.comCode
            };
            $$InformationQuery.InformationQuery($scope.informationQueryNew.info,{
                success: function (data) {
                    $scope.informationQueryNew.PolicyReceiptList=data.content.content;
                    if(!target && !$scope.informationQueryNew.PolicyReceiptList){
                        layerMsg('暂无数据！');
                        return false
                    }
                    $scope.informationQueryNew.pagination.totalItems=data.content.totalCount;//列表总条数

                },
                error: function (e) {
                }
            },{
                "pageNo":$scope.informationQueryNew.pagination.pageIndex,
                "pageSize":$scope.informationQueryNew.pagination.pageSize
            })
        };
        //重置
        $scope.reset = function(){
            $scope.informationQueryNew.info={
                "carId":"",
                "identifyNumber":"",
                "agentName":"",
                "certiNo":"",
                "certiNoList":"",
                "riskCode":"",
                "currency1":"",
                "comCode":"",
                "agentCode":"",
                "businessNature":"",
                "appliName":"",
                "insuredName":"",
                "contractNo":"",
                "startDate":"",
                "policyType":"",
                "userDto":{
                    "userCode":$scope.usercode,
                    "userName":$scope.userName,
                    "comCode":$scope.comCode
                },
                "handler1Name":"",
                "taskCode":'payment.integrated.policypayment'
            };
        };
        /**
         * 保单收付信息详情
         */
        $scope.findDetail = function (target) {
            $modal.open({
                templateUrl:"components/PolicyReceipt/InformationQuery/tpl/modal/InformationQuery.modal.tpl.html",
                resolve:{
                    target:function () {
                        return target;
                    }
                },
                controller:function ($scope,$modalInstance,target) {
                    $scope.policyNo=target;//页面上绑定的保单号
                    $$InformationQuery.findDetail($scope.policyNo,{
                        success:function (data) {
                            $scope.Detail=data.policyBasicInfoDto;
                            if(!$scope.Detail){
                                layerMsg('暂无数据！');
                                return false
                            }
                        },
                        error:function () {
                        }
                    });
                    //凭证信息
                    $scope.voucherList = function (target) {
                        $modal.open({
                            templateUrl: 'components/PolicyReceipt/queryCustomerInfo/tpl/modal/voucher.modal.tpl.html',
                            resolve: {
                                target:function () {
                                    return target
                                }
                            },
                            controller: function ($scope,$modalInstance,target) {
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
                                        $scope.pagination.pageIndex=1;
                                    }
                                    $$InformationQuery.payLossInfo(target,{
                                        success:function (data) {
                                            $scope.paymentList = data.content.dailyPaymentCheckList;
                                            $scope.paymentList2 = data.content;
                                            $scope.pagination.totalItems2= data.content.totalCount;
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
                        $modalInstance.close('search');
                    };

                }
            }).result.then(function(reword){
                if(reword=='search'){
                    $scope.InformationQuery('page');
                }
            })
        };
        /**
         * 获取上次数据
         */
        var getLastData = function(){
            var localDada=mcMultiEditorCacheService.localData('InformationQuery');//获取上次数据
            if(localDada){
                $scope.informationQueryNew=localDada;
            }
        };
        /**
         * 存储当前页面数据和状态
         */
        var saveData = function(){
            mcMultiEditorCacheService.localData('InformationQuery',$scope.informationQueryNew);//存储数据
        };
        /**
         * 初始化函数
         */
        var init=function(){
            $scope.informationQueryNew=$$InformationQuery.informationQueryNew();
            getLastData();
            saveData();
        };
        init();
    };
    moduleApp.controller('InformationQueryCtrl',['$scope','$modal','$$InformationQuery','mcMultiEditorCacheService',InformationQuery]);
});
