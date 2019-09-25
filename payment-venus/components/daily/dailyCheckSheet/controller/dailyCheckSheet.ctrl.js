/**
 * Created by DELL on 2017/9/26.
 */
/**
 * 日结审核
 */
define([
    '../module'
],function (moduleApp) {
    'use strict';
    var dailyCheckSheetCondition=function($scope,$$dailyCheckSheetInvoice,$modal,FileUploader,$$venus,Excel,$timeout,mcMultiEditorCacheService){
        /**
         * 初始化函数
         */
            // Excel导出
        $scope.exportToExcel = function(tableId) {
            $scope.exportHref = Excel.tableToExcel(tableId, 'sheet name');
            $timeout(function() { location.href = $scope.exportHref; }, 100);
        }
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
                $scope.infoToView=$$dailyCheckSheetInvoice.Account().infoToView;
            }
            $scope.PrpJCommBillDto = [];
            $scope.checkSheetList = [];
            $scope.checkSheetFlag = false;
        };
        /**
         * 临时数据管理
         * 存储临时数据
         */
        var saveData=function () {
            $scope.infoToView.pagination=$scope.pagination;//存取分页数据
            mcMultiEditorCacheService.localData('dailyCheckSheet',$scope.infoToView);
        };
        /**
         * 获取存储数据
         */
        var getData=function () {
            return mcMultiEditorCacheService.localData('dailyCheckSheet');
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
        $scope.searcheckSheet = function (target) {
            //先验证焦点定位
            if(target!='page'){
                $scope.pagination.pageIndex=1;
            }
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
                        $$dailyCheckSheetInvoice.collectionSearchs($scope.infoToView.checkSheet,{
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
                                angular.forEach($scope.infoToView.confirmList,function(data){
                                    data.checked=false;
                                })
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
        /**
         *全选
         */
        $scope.checkedReparationsAll=function(allFlag,objList){
            $.each(objList,function(index,obj){
                if(allFlag){
                    obj.checked=true;
                }else obj.checked=false;
            });
        }
        /**
         * 单选
         */
        $scope.checkedReparationsOne=function(){
            $scope.infoToView.checkStatus.checkedAccountAll=$scope.infoToView.confirmList.every(function(item,index,array){
                return item.checked;
            });
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
                $$dailyCheckSheetInvoice.preClaimModify($scope,$scope.preBillNoList,{
                    success: function (data) {
                        if(data.resultCode == '0000'){
                            layerMsg(data.resultMsg,'success')
                            $scope.PrpJCommBillDto = [];
                            $scope.searcheckSheet();
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
        /*
         * 日结单信息
         */
        $scope.dailyStatement = function(daile){
            $scope.daile = daile;
            $modal.open({
                templateUrl: 'components/daily/dailyCheckSheet/tpl/modal/dailyStatement.tpl.html',
                resolve: {
                    pagination:function () {
                        return $scope.pagination
                    },
                    daile:function () {
                        return $scope.daile
                    }
                },
                controller: function ($scope, $modalInstance,pagination,daile) {
                    $scope.comCode = daile.comCode
                    $scope.pagination = pagination;
                    $scope.handlerCode = daile.handlerCode;
                    //字符戳转日期方法
                    $scope.balanceDate = new Date(daile.balanceDate).dateConversion();
                    $scope.dailyAccount = daile.dailyAccount;
                    $scope.currency = daile.currency;
                    $scope.batchServicePayment = function(){
                        $$dailyCheckSheetInvoice.payLossInfo($scope,{
                            success:function (data) {
                                $scope.paymentList = data.content;
                            },
                            error:function () {

                            }
                        },{
                            "pageNo": $scope.pagination.pageIndex,
                            "pageSize": $scope.pagination.pageSize
                        });
                        $$dailyCheckSheetInvoice.payLossInfo2($scope,{
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
                        $scope.url = 'components/daily/dailyCheckSheet/tpl/print/printTest.html';
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
                            templateUrl: 'components/daily/dailyCheckSheet/tpl/modal/flowList.tpl.html',
                            resolve: {
                                target:function () {
                                    return target
                                },
                                pagination:function () {
                                    return $scope.pagination
                                }
                                ,
                                handlerCode:function () {
                                    return $scope.handlerCode
                                }
                                ,
                                balanceDate:function () {
                                    return $scope.balanceDate
                                }
                                ,
                                currency:function () {
                                    return $scope.currency
                                }
                            },
                            controller: function ($scope, $modalInstance,target,pagination,handlerCode,balanceDate,currency) {
                                $scope.target = target;
                                $scope.handlerCode = handlerCode;
                                $scope.balanceDate = balanceDate;
                                $scope.currency = currency;
                                $scope.pagination = pagination;
                                $scope.batchServicePayment = function(){
                                    $$dailyCheckSheetInvoice.queryDailyPaymentDetail($scope.target,{
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
            $$dailyCheckSheetInvoice.queryVoucher($scope.tagert,{
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
        }
        $scope.resertVoucher = function(){
            $scope.infoToView.voucherFlag = false;
        }
        //凭证详细信息
        $scope.voucherDetailed = function(tagert){
            $scope.tagert = tagert;
            $modal.open({
                templateUrl: 'components/daily/dailyCheckSheet/tpl/modal/voucherDetailed.tpl.html',
                resolve: {
                    tagert:function () {
                        return $scope.tagert
                    },
                    pagination:function () {
                        return $scope.pagination
                    }
                },
                controller: function ($scope, $modalInstance,tagert,pagination) {
                    $scope.tagert = tagert
                    $scope.pagination = pagination
                    $scope.batchServicePayment = function(){
                        $$dailyCheckSheetInvoice.payLossInfo3($scope.tagert,{
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
    moduleApp.controller('DailyCheckSheetCtrl',['$scope','$$dailyCheckSheetInvoice','$modal','FileUploader','$$venus','Excel','$timeout','mcMultiEditorCacheService',dailyCheckSheetCondition])
})  