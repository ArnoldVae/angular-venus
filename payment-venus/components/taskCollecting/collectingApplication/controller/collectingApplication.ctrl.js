/**
 * Created by DELL on 2017/9/26.
 */
/**
 * 代收代付申请控制器
 */
define([
    '../module'
],function (moduleApp) {
    'use strict';
    var collectingApplication=function($scope,$$collectingInvoice,$modal,FileUploader,$$venus,$timeout,mcMultiEditorCacheService){
        /**
         * tap切换
         */
        $scope.changeTap = function (index) {
            $scope.confirmation.status.tapFlag = index;
        };
        /**
         * 保费查询
         */
        $scope.searchReparations = function (target) {
            if(target.premium == 'premium'){//保费查询
                if(!$scope.confirmation.status.moreFlag){
                    if (!$scope.confirmation.premiumQuery.transactionNo){
                        layer.msg('请输入缴费通知单号！', {icon: 2});
                        return false;
                    }
                }else if(!$scope.confirmation.premiumQuery.transactionNo &&!$scope.confirmation.premiumQuery.inputDate &&!$scope.confirmation.premiumQuery.transactionNoList){
                    layer.msg('请输入带红*的任意一项！', {icon: 2});
                    return false;
                }
                $scope.feeInputInvoiceCondition = $scope.confirmation.premiumQuery;
                $scope.confirmation.status.checkedAccountAll=false;
                if(target.page!='page') {
                    $scope.confirmation.pagination.pageIndex=1;
                }
                var page = {
                    "pageNo": $scope.confirmation.pagination.pageIndex-1,
                    "pageSize": $scope.confirmation.pagination.pageSize
                };
            }else if(target.commBill == 'commBill'){//手续费查询
                if(!$scope.confirmation.status.moreFlagT){
                    if (!$scope.confirmation.serviceQuery.visaSerialNo){
                        layer.msg('请输入手续费结算单号！', {icon: 2});
                        return false;
                    }
                }else if(!$scope.confirmation.serviceQuery.visaSerialNo &&!$scope.confirmation.serviceQuery.visaSerialNoList &&!$scope.confirmation.serviceQuery.inputDate){
                    layer.msg('请输入带红*的任意一项！', {icon: 2});
                    return false;
                }
                $scope.feeInputInvoiceCondition = $scope.confirmation.serviceQuery;
                $scope.confirmation.status.checkedAccountAllT=false;
                if(target.page!='page'){
                    $scope.confirmation.paginationT.pageIndex=1;
                }
                var page={
                    "pageNo":$scope.confirmation.paginationT.pageIndex-1,
                    "pageSize":$scope.confirmation.paginationT.pageSize
                };
            }
            $scope.feeInputInvoiceCondition.webUserCode = $scope.usercode;
            $scope.feeInputInvoiceCondition.webComCode = $scope.comCode;//登陆机构
            $scope.feeInputInvoiceCondition.webCenterCode=$scope.centerCode;
            $scope.feeInputInvoiceCondition.webTaskCode="payment.taskcollect.appliy";
            $$collectingInvoice.searchReparations($scope.feeInputInvoiceCondition,{
                success: function (data) {
                    if(target.premium == 'premium'){//保费反参
                        $scope.confirmation.premiumList=data.content.prpJTransactionMainDtoList;
                        $scope.confirmation.pagination.totalItems=data.content.totalCount;
                        $scope.select(target.premium,$scope.confirmation.premiumList);
                    }else if(target.commBill == 'commBill'){//手续费反参
                        $scope.confirmation.commBillList=data.content.prpJCommBillDtoList;
                        $scope.confirmation.paginationT.totalItems=data.content.totalCount;
                        $scope.select(target.commBill,$scope.confirmation.commBillList);
                    }
                    if(!$scope.confirmation.premiumList && !$scope.confirmation.commBillList){
                        layerMsg('暂无数据！');
                        return false
                    }

                },
                error: function (e) {
                }
            },page)
        };
        /**
         * 重置
         */
        $scope.resetReparations = function (cp) {
            if(cp == 'commBill'){//手续费重置
                $scope.confirmation.serviceQuery={
                    "visaSerialNo":"",
                    "visaSerialNoList":'',
                    "currency1":'',
                    "comCode":'',
                    "handler1Code":'',
                    "insuredCode":'',
                    "inputDate":'',
                    "certiType":'02'
                }
            }else{//保费重置
                $scope.confirmation.premiumQuery={
                    "transactionNo":'',
                    "transactionNoList":'',
                    "currency1":'',
                    "comCode":'',
                    "handler1Code":'',
                    "insuredCode":'',
                    "inputDate":'',
                    "certiType":'01'
                }
            }
        };

        /**
         *全选
         */
        $scope.checkedReparationsAll=function(cp){
            if(cp=='premium'){//保费全选
                angular.forEach($scope.confirmation.premiumList, function (data) {
                    if($scope.confirmation.status.checkedAccountAll) {
                        data.checked = true;
                    } else {
                        data.checked = false;
                    }
                });
            }else{//手续费全选
                angular.forEach($scope.confirmation.commBillList, function (data) {
                    if($scope.confirmation.status.checkedAccountAllT) {
                        data.checked = true;
                    } else {
                        data.checked = false;
                    }
                });
            }

        };
        /**
         * 单选
         */
        $scope.checkedReparationsOne=function(cp){
            if(cp=='premium'){//保费单选
                $scope.confirmation.status.checkedAccountAll = $scope.confirmation.premiumList.every(function (item, index, array) {
                    return item.checked;
                });
            }else{//手续费单选
                $scope.confirmation.status.checkedAccountAllT=$scope.confirmation.commBillList.every(function(item,index,array){
                    return item.checked;
                })
            }
        };
        /**
         * 底部申请弹框
         * @param target
         * @param list
         */
        $scope.select=function (target,list) {
            if(target=='premium'){//保费底部弹框
                $scope.confirmation.status.selectNum=0;
                $.each(list,function (index,item) {
                    if(item.checked){
                        $scope.confirmation.status.selectNum++;
                    }
                })
            }else{//手续费底部弹框
                $scope.confirmation.status.selectNumT=0;
                $.each(list,function (index,item) {
                    if(item.checked){
                        $scope.confirmation.status.selectNumT++;
                    }
                })
            }

        };
        /**
         * 申请登记
         */
        $scope.invoiceRegistration = function(target){
            $modal.open({
                templateUrl: 'components/taskCollecting/collectingApplication/tpl/modal/application.html',
                resolve: {
                    premiumList: function () {
                        return $scope.confirmation.premiumList;
                    },
                    commBillList: function () {
                        return $scope.confirmation.commBillList
                    },
                    centerCode: function () {
                        return $scope.centerCode;
                    },
                    usercode: function () {
                        return $scope.usercode;
                    }
                },
                controller: function ($scope, $modalInstance, premiumList, commBillList, centerCode, usercode) {
                    //保费、手续费-ceertiType:01、02
                    if (target.premium == 'premium') {
                        var cp = premiumList;
                        $.each(cp, function (index, item) {
                            item.certiType = '01';
                        });
                    } else {
                        var cp = commBillList;
                        $.each(cp, function (index, item) {
                            item.certiType = '02'
                        });
                    }
                    $scope.selectCp = [];
                    $.each(cp, function (index, item) {
                        if (item.checked) {
                            $scope.selectCp.push(item);
                        }
                    });
                    var _data = {
                        "prpJEntrustDtoList": $scope.selectCp,//已勾选
                        "handlerCode": usercode,//用户代码
                        "comCode": $scope.comCode,//登陆机构
                        "strCenterCode": centerCode//核算机构

                    };
                    $scope.batchServicePayment = function () {
                        $$collectingInvoice.payLossInfo(_data, {
                            success: function (data) {
                                $scope.auditingCondition = data.content;
                            },
                            error: function () {

                            }
                        })
                    };
                    $scope.batchServicePayment();
                    //关闭
                    $scope.cancel = function () {
                        $modalInstance.dismiss();
                    };
                    //插入多条发票数据
                    $scope.confirmAuditing = function () {
                        if (!$scope.auditingCondition.entrustedComCode || !$scope.auditingCondition.entrustedComCName) {
                            layer.msg('请输入受托单位！', {icon: 2});
                            return false;
                        }
                        $$collectingInvoice.payLossVerify($scope.auditingCondition, {
                            success: function (data) {
                                if (data && data.content && data.content.entrustConfirm) {
                                    layerMsg(data.content.entrustConfirm, 'success');
                                    $modalInstance.close(target);
                                }
                            },
                            error: function (e) {
                            }
                        })
                    };
                    var init = function () {
                        $scope.auditingCondition = {
                            "entrustedComCode": '',
                            "entrustedComCName": '',
                            "attribute2": '',
                            "attribute3": '',
                            "prpJEntrustDtoList": $scope.selectCp,
                            "entrustOperator": '',
                            "entrustComCode": '',
                            "entrustComCName": '',
                            "entrustText": ''
                        }
                    };
                    init();
                }
            }).result.then(function (target) {
                $scope.searchReparations(target);
            });
        };

        /**
         * 获取上次数据
         */
        var getLastData = function(){
            var localDada=mcMultiEditorCacheService.localData('collectingApplication');//获取上次数据
            if(localDada){
                $scope.confirmation=localDada;
            }
        };
        /**
         * 存储当前页面数据和状态
         */
        var saveData = function(){
            mcMultiEditorCacheService.localData('collectingApplication',$scope.confirmation);//存储数据
        };
        /**
         * 初始化
         */
        var init=function () {
            //实例化对象
            $scope.confirmation=$$collectingInvoice.Account();
            getLastData();
            saveData();
        };
        init();

    };
    moduleApp.controller('CollectingApplicationCtrl',['$scope','$$collectingInvoice','$modal','FileUploader','$$venus','$timeout','mcMultiEditorCacheService',collectingApplication])
});