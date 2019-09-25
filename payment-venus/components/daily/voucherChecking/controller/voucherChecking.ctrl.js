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
    var voucherCheckingCondition=function($scope,$$voucherCheckingInvoice,$modal,FileUploader,$$venus,Excel,$timeout,mcMultiEditorCacheService){
        /**
         * 初始化函数
         */
            // Excel导出
        //$scope.exportToExcel = function(tableId) {
        //    $scope.exportHref = Excel.tableToExcel(tableId, 'sheet name');
        //    $timeout(function() { location.href = $scope.exportHref; }, 100);
        //}
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
                $scope.infoToView=$$voucherCheckingInvoice.Account().infoToView;
            }
            $scope.PrpJCommBillDto = [];
        };
        /**
         * 临时数据管理
         * 存储临时数据
         */
        var saveData=function () {
            $scope.infoToView.pagination=$scope.pagination;//存取分页数据
            mcMultiEditorCacheService.localData('voucherChecking',$scope.infoToView);
        };
        /**
         * 获取存储数据
         */
        var getData=function () {
            return mcMultiEditorCacheService.localData('voucherChecking');
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
                        if($scope.infoToView.checkSheet.certificateNoList != undefined){
                            $scope.infoToView.checkSheet.certificateNoList = $scope.infoToView.checkSheet.certificateNoList.replace(/\n/g,",");
                        }
                        if($scope.infoToView.checkSheet.certificateStartDate == undefined||$scope.infoToView.checkSheet.certificateStartDate == ''){
                            layer.msg("请选择凭证日期起期");
                            return false;
                        }else if($scope.infoToView.checkSheet.certificateEndDate == undefined||$scope.infoToView.checkSheet.certificateEndDate == ''){
                            layer.msg("请选择凭证日期止期");
                            return false;
                        }
                        $$voucherCheckingInvoice.collectionSearchs($scope.infoToView.checkSheet,{
                            success: function (data) {
                                $scope.infoToView.checkSheetFlag = true;
                                $scope.infoToView.confirmList=data.content;
                                if($scope.infoToView.confirmList.length<1){
                                    layerMsg('暂无数据！')
                                    return false
                                }
                                $scope.pagination.totalItems=data.totalCount;
                                angular.forEach($scope.infoToView.confirmList,function(data){
                                    data.checked=false;
                                    $scope.infoToView.checkStatus.checkedAccountAll=$scope.infoToView.confirmList.every(function(item,index,array){
                                        return item.checked;
                                    })
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
            if($scope.infoToView.voucherFlag){
                $scope.infoToView.checkStatus.checkedAccountAll=$scope.infoToView.comconfirmList.every(function(item,index,array){
                    return item.checked;
                });
            }else{
                $scope.infoToView.checkStatus.checkedAccountAll=$scope.infoToView.confirmList.every(function(item,index,array){
                    return item.checked;
                });
            }
        };
        /**
         * 凭证详情信息
         */
        $scope.dailyStatement = function(tagert){
            $modal.open({
                templateUrl: 'components/daily/voucherChecking/tpl/modal/dailyStatement.tpl.html',
                resolve: {
                    pagination:function () {
                        return $scope.pagination
                    }
                },
                controller: function ($scope, $modalInstance,pagination) {
                    $scope.pagination = pagination;
                    $scope.tagert = tagert;
                    $scope.batchServicePayment = function(){
                        $$voucherCheckingInvoice.payLossInfo($scope.tagert,{
                            success:function (data) {
                                $scope.paymentList = data.content.dailyPaymentCheckList;
                                $scope.paymentList2 = data.content;
                                $scope.pagination.totalItems2=$scope.paymentList.length;
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
        };
        //点击凭证复核展示选中凭证详情
        $scope.voucherInformation = function(tagert){
            $scope.tagert = tagert;
            $scope.PrpJCommBillDtolist = [];
            angular.forEach($scope.infoToView.confirmList,function(data,index,array){
                if(data.checked){
                    $scope.PrpJCommBillDto.push(array[index])
                }
            });
            angular.forEach($scope.PrpJCommBillDto,function(data,index,array){
                $scope.PrpJCommBillDtolist.push({voucherNo:array[index].voucherNo,realPayRefNo:array[index].realPayRefNo});
            })
            if($scope.PrpJCommBillDto.length==0){
                layerMsg('请选择！');
                return false;
            }else{
                $scope.infoToView.voucherFlag = true;
                $scope.PrpJCommBillDto = [];
            }
            $$voucherCheckingInvoice.queryVoucher($scope.PrpJCommBillDtolist,{
                success: function (data) {
                    $scope.infoToView.comconfirmList=data;
                    if($scope.infoToView.comconfirmList.length<1){
                        layerMsg('暂无数据！')
                        return false
                    }
                    angular.forEach($scope.infoToView.comconfirmList,function(data){
                        data.checked=false;
                        $scope.infoToView.checkStatus.checkedAccountAll=$scope.infoToView.comconfirmList.every(function(item,index,array){
                            return item.checked;
                        })
                    })
                    $scope.pagination.totalItems2=data.length;
                },
                error: function (e) {
                }
            })
        }
        $scope.returng = function(){
            $scope.infoToView.voucherFlag = false;
        }
        //原始凭证复核
        $scope.voucherDetailed = function(tagert){
            $scope.preBillNoList2 = [];
            var i=0;
            angular.forEach($scope.infoToView.comconfirmList,function(data,index,array){
                if(data.checked){
                    $scope.PrpJCommBillDto.push(array[index])
                    $scope.preBillNoList2[i]=array[index].voucherNo;
                    i++;
                }
            });
            if($scope.PrpJCommBillDto.length==0){
                layerMsg('请选择！');
                return false;
            }else{
                $$voucherCheckingInvoice.verifyVoucherNo($scope,{
                    success: function (data) {
                        if(data.resultCode == '0000'){
                            layer.msg('凭证复核成功', {icon: 1});
                            $scope.PrpJCommBillDto = [];
                            $scope.infoToView.comconfirmList = {};
                            $scope.infoToView.voucherFlag = false;
                        }else{
                            layer.msg(data.resultMsg, {icon: 1});
                            return;
                        }
                    },
                    error: function (e) {
                    }
                })
            }
        }
        //凭证合并
        $scope.voucherInhebing = function(tagert){
            $scope.PrpJCommBillDtolist3 = [];
            $scope.PrpJCommBillDto = [];
            $scope.posFactor = '0';
            $scope.userFactor = '1';
            angular.forEach($scope.infoToView.comconfirmList,function(data,index,array){
                if(data.checked){
                    $scope.PrpJCommBillDto.push(array[index])
                }
            });
            angular.forEach($scope.PrpJCommBillDto,function(data,index,array){
                $scope.PrpJCommBillDtolist3.push({voucherNo:array[index].voucherNo,realPayRefNo:array[index].realPayRefNo});
            });
            if($scope.infoToView.comconfirmList.processStatus == '0'){
                $scope.posFactor = '1';
                $scope.userFactor = '0';
            }else if($scope.infoToView.comconfirmList.processStatus == '1'){
                $scope.posFactor = '0';
                $scope.userFactor = '1';
            }else{
                $scope.posFactor = '0';
                $scope.userFactor = '0';
            }
            if($scope.PrpJCommBillDto.length==0){
                layerMsg('请选择！');
                return false;
            }else{
                $$voucherCheckingInvoice.voucherCombine($scope,{
                    success: function (data) {
                        if(data.resultCode == '0000'){
                            layer.msg('凭证合并成功', {icon: 1});
                            $scope.PrpJCommBillDto = [];
                            $scope.infoToView.comconfirmList = JSON.parse(data.resultMsg).checkRespDtos;
                            $scope.infoToView.fheFlag = false;
                            $scope.pagination.totalItems2=$scope.infoToView.comconfirmList.length;
                            angular.forEach($scope.infoToView.comconfirmList,function(data){
                                data.checked=false;
                                $scope.infoToView.checkStatus.checkedAccountAll=$scope.infoToView.comconfirmList.every(function(item,index,array){
                                    return item.checked;
                                })
                            })
                        }else{
                            layer.msg(data.resultMsg, {icon: 1});
                            return;
                        }
                    },
                    error: function (e) {
                    }
                })
            }
        }
        //合并单证复核
        $scope.verifyMergeVoucherNo = function(tagert){
            $scope.preBillNoList4 = [];
            var i=0;
            angular.forEach($scope.infoToView.comconfirmList,function(data,index,array){
                if(data.checked){
                    $scope.PrpJCommBillDto.push(array[index])
                    $scope.preBillNoList4[i]=array[index].voucherNo;
                    i++;
                }
            });
            if($scope.PrpJCommBillDto.length==0){
                layerMsg('请选择！');
                return false;
            }else{
                $$voucherCheckingInvoice.verifyMergeVoucherNo($scope,{
                    success: function (data) {
                        if(data.resultCode == '0000'){
                            layer.msg(data.resultMsg, {icon: 1});
                            $scope.PrpJCommBillDto = [];
                            $scope.infoToView.voucherFlag = false;
                        }else{
                            layer.msg(data.resultMsg, {icon: 1});
                            return;
                        }
                    },
                    error: function (e) {
                    }
                })
            }
        }
        //取消合并
        $scope.cancelMergeVoucherNo = function(tagert){
            $scope.preBillNoList5 = [];
            var i=0;
            angular.forEach($scope.infoToView.comconfirmList,function(data,index,array){
                if(data.checked){
                    $scope.PrpJCommBillDto.push(array[index])
                    $scope.preBillNoList5[i]=array[index].voucherNo;
                    i++;
                }
            });
            if($scope.PrpJCommBillDto.length==0){
                layerMsg('请选择！');
                return false;
            }else{
                $$voucherCheckingInvoice.cancelMergeVoucherNo($scope,{
                    success: function (data) {
                        if(data.resultCode == '0000'){
                            layer.msg(data.resultMsg, {icon: 1});
                            $scope.PrpJCommBillDto = [];
                            $scope.infoToView.comconfirmList = {};
                            $scope.infoToView.voucherFlag = false;
                            $scope.infoToView.fheFlag = true;
                        }else{
                            layer.msg(data.resultMsg, {icon: 1});
                            return;
                        }
                    },
                    error: function (e) {
                    }
                })
            }
        }
        init();
    }
    moduleApp.controller('VoucherCheckingCtrl',['$scope','$$voucherCheckingInvoice','$modal','FileUploader','$$venus','Excel','$timeout','mcMultiEditorCacheService',voucherCheckingCondition])
})