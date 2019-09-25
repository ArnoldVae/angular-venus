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
    var dailyQueryCondition=function($scope,$$dailyQueryInvoice,$modal,FileUploader,$$venus,$timeout,mcMultiEditorCacheService){
        /**
         * 初始化函数
         */
        var init=function () {
            //分页信息
            $scope.pagination = {
                totalItems: '',//总数
                pageIndex: '1',//当前页面
                pageSize: '15',//显示条数
                maxSize: '5',//最大页数
                numPages: '',//共有多少页
                previousText: '上一页',
                nextText: '下一页',
                firstText: '首页',
                lastText: '末页'
            };
            //判断上次是否有数据如果有则取记录值
            if(getData()){
                $scope.infoToView=getData();
                $scope.pagination=$scope.infoToView.pagination;
            }else {
                $scope.infoToView=$$dailyQueryInvoice.Account().infoToView;
            }
            $scope.checkSheetFlag = false;
            $scope.PrpJCommBillDto = [];
        };
        /**
         * 临时数据管理
         * 存储临时数据
         */
        var saveData=function () {
            $scope.infoToView.pagination=$scope.pagination;//存取分页数据
            mcMultiEditorCacheService.localData('dailyQuery',$scope.infoToView);
        };
        /**
         * 获取存储数据
         */
        var getData=function () {
            return mcMultiEditorCacheService.localData('dailyQuery');
        };
        /**
         * 记录调用
         */
        $scope.saveInputData=function () {
            saveData();
        }
        /**
         *查询
         */
        $scope.searchQuery = function (target) {
            if(target!='page'){
                $scope.pagination.pageIndex=1;
            }
            //先验证焦点定位
            $$venus.Focus(
                "premiumForm"
            ).then(
                function (Ele) {
                    if (angular.isDefined(Ele)) {
                        $timeout(function () {
                            Ele.focus();
                        },1000)
                    } else {
                        $scope.infoToView.checkSheet.comCodee = $scope.comCode;
                        $$dailyQueryInvoice.collectionSearchs($scope.infoToView.checkSheet,{
                            success: function (data) {
                                $scope.checkSheetFlag = true;
                                $scope.infoToView.confirmList=data.content;
                                if($scope.infoToView.confirmList.length<1){
                                    if(target=='noAlert'){
                                        layerMsg('暂无数据！')
                                    }
                                    return false
                                }
                                $scope.pagination.totalItems=data.totalCount;
                                saveData();
                            },
                            error: function (e) {
                            }
                        },{
                            "pageNo": $scope.pagination.pageIndex,
                            "pageSize": $scope.pagination.pageSize
                        })
                    }
                }
            );
        };
        /**
         *重置
         */
        $scope.resetcheckSheet = function () {
            $scope.infoToView.checkSheet = {};
        };
        //日结
        $scope.settlementConfirmation = function(){
            var i= 0;
            $scope.preBillNoList = [];
            angular.forEach($scope.infoToView.confirmList,function(data,index,array){
                if(data.checked){
                    $scope.PrpJCommBillDto.push(array[index])
                    $scope.preBillNoList[i]=array[index].dailyAccount;
                    i++;
                }
            });
            if($scope.PrpJCommBillDto.length==0){
                layerMsg('请选择！');
                return false;
            }else{
                $$dailyQueryInvoice.preClaimModify($scope.preBillNoList,{
                    success: function (data) {
                        if(data.resultCode == '0000'){
                            layerMsg(data.resultMsg,'success')
                            $scope.PrpJCommBillDto = [];
                            $scope.searchQuery();
                        }else{
                            layerMsg(data.resultMsg)
                            return false;
                        }
                    },
                    error: function (e) {
                    }
                })
            }
        }
        /**
         * 日结单信息
         */
        $scope.dailyStatement = function(daile){
            $scope.daile = daile;
            $modal.open({
                templateUrl: 'components/daily/dailyQuery/tpl/modal/dailyStatement.tpl.html',
                resolve: {
                    pagination:function () {
                        return $scope.pagination
                    },
                    daile:function () {
                        return $scope.daile
                    }
                },
                controller: function ($scope, $modalInstance,pagination,daile) {
                    $scope.pagination = pagination;
                    $scope.comCode = daile.comCode;
                    $scope.handlerCode = daile.handlerCode;
                    //字符戳转日期方法
                    $scope.balanceDate = new Date(daile.balanceDate).dateConversion();
                    $scope.dailyAccount = daile.dailyAccount;
                    $scope.currency = daile.currency;
                    $scope.batchServicePayment = function(){
                        $$dailyQueryInvoice.payLossInfo($scope,{
                            success:function (data) {
                                $scope.paymentList = data.content;
                            },
                            error:function () {

                            }
                        },{
                            "pageNo": $scope.pagination.pageIndex,
                            "pageSize": $scope.pagination.pageSize
                        });
                        $$dailyQueryInvoice.payLossInfo2($scope,{
                            success:function (data) {
                                $scope.bpaymentList = data[0].additionalInformDtos;
                            },
                            error:function () {

                            }
                        },{
                            "pageNo": $scope.pagination.pageIndex,
                            "pageSize": $scope.pagination.pageSize
                        })
                    }
                    /**
                     * 打印选择表单
                     * @param target
                     * @param proposalNo
                     */
                    var printer=undefined;
                    var _printData = undefined;
                    window.VENUS.feedbackData = function(){
                        if(printer)
                            printer.transmittingData(_printData);
                    };
                    $scope.printTest=function(){
                        _printData ={
                            test:$scope.paymentList,
                            testbpaymentList:$scope.bpaymentList,
                            testcomCode:$scope.comCode,
                            testhandlerCode:$scope.handlerCode,
                            testbalanceDate:$scope.balanceDate,
                            testcurrency:$scope.currency,
                        };
                        $scope.url = 'components/daily/dailyQuery/tpl/print/printTest.html';
                        printer = window.open($scope.url);
                    }
                    $scope.batchServicePayment();
                    //关闭
                    $scope.cancel = function () {
                        $modalInstance.dismiss();
                    };
                    //流水清单
                    $scope.dailyFlowList = function(target){
                        $modal.open({
                            templateUrl: 'components/daily/dailyQuery/tpl/modal/flowList.tpl.html',
                            resolve: {
                                target:function () {
                                    return target
                                },
                                pagination:function () {
                                    return $scope.pagination
                                },
                                handlerCode:function () {
                                    return $scope.handlerCode
                                },
                                balanceDate:function () {
                                    return $scope.balanceDate
                                },
                                currency:function () {
                                    return $scope.currency
                                }
                            },
                            controller: function ($scope, $modalInstance,target,pagination,handlerCode,balanceDate,currency) {
                                $scope.handlerCode = handlerCode;
                                $scope.balanceDate = balanceDate;
                                $scope.currency = currency;
                                $scope.batchServicePayment = function(){
                                    $scope.target = target;
                                    $scope.pagination = pagination;
                                    $$dailyQueryInvoice.queryDailyPaymentDetail($scope.target,{
                                        success:function (data) {
                                            $scope.paymentList2 = data.content;
                                        },
                                        error:function () {

                                        }
                                    },{
                                        "pageNo": $scope.pagination.pageIndex,
                                        "pageSize": $scope.pagination.pageSize
                                    })
                                }
                                /**
                                 * 打印选择表单
                                 * @param target
                                 * @param proposalNo
                                 */
                                var printer=undefined;
                                var _printData = undefined;
                                window.VENUS.feedbackData = function(){
                                    if(printer)
                                        printer.transmittingData(_printData);
                                };
                                $scope.printTest2=function(){
                                    _printData ={
                                        test:$scope.paymentList2,
                                        testhandlerCode:$scope.handlerCode,
                                        testbalanceDate:$scope.balanceDate,
                                        testcurrency:$scope.currency,
                                    };
                                    $scope.url = 'components/daily/dailyQuery/tpl/print2/printTest.html';
                                    printer = window.open($scope.url);
                                }
                                $scope.batchServicePayment();
                                //关闭
                                $scope.cancel = function () {
                                    $modalInstance.dismiss();
                                };
                            }
                        })
                    }
                }
            })
        };
        //凭证信息
        $scope.voucherInformation = function(tagert,page){
            if(page!='page'){
                $scope.pagination.pageIndex=1;
            }
            $scope.tagert = tagert;
            $$dailyQueryInvoice.queryVoucher($scope.tagert,{
                success: function (data) {
                    $scope.infoToView.vouconfirmList=data.content;
                    if($scope.infoToView.vouconfirmList.length<1){
                        layerMsg('暂无数据！')
                        return false
                    }
                    $scope.infoToView.voucherFlag = true;
                    $scope.pagination.totalItems2=data.content.totalCount;
                },
                error: function (e) {
                }
            },{
                "pageNo": $scope.pagination.pageIndex,
                "pageSize": $scope.pagination.pageSize
            })
            //$scope.voucherChecking = function(){
            //    $scope.voucherFlag = false;
            //}
        }
        $scope.resertVoucher = function(){
            $scope.infoToView.voucherFlag = false;
        }
        //凭证详细信息
        $scope.voucherDetailed = function(tagert){
            $scope.tagert = tagert
            $modal.open({
                templateUrl: 'components/daily/dailyQuery/tpl/modal/voucherDetailed.tpl.html',
                resolve: {
                    tagert:function () {
                        return $scope.tagert
                    },
                    pagination:function () {
                        return $scope.pagination
                    }
                },
                controller: function ($scope, $modalInstance,tagert,pagination) {
                    $scope.batchServicePayment = function(){
                        $scope.tagert = tagert
                        $scope.pagination = pagination
                        $$dailyQueryInvoice.payLossInfo3($scope.tagert,{
                            success:function (data) {
                                $scope.paymentList = data.content;
                            },
                            error:function () {

                            }
                        },{
                            "pageNo": $scope.pagination.pageIndex,
                            "pageSize": $scope.pagination.pageSize
                        })
                    }
                    $scope.batchServicePayment();
                    //关闭
                    $scope.cancel = function () {
                        $modalInstance.dismiss();
                    };
                }
            })
        }
        init();
    }
    moduleApp.controller('DailyQueryCtrl',['$scope','$$dailyQueryInvoice','$modal','FileUploader','$$venus','$timeout','mcMultiEditorCacheService',dailyQueryCondition])
})