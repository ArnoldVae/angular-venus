/**
 * 共保进项发票控制器
 */
define([
    '../module'
],function (moduleApp) {
    'use strict';
    var feeInputInvoiceCondition=function($scope,$$coinsuranceInvoicesInvoice,$modal,FileUploader,$$venus,$timeout,mcMultiEditorCacheService){
        /**
         * 初始化
         */
        var init=function () {
            //分页信息
            $scope.pagination = {
                totalItems: '',//总数
                pageIndex: '1',//当前页面
                pageSize: '14',//显示条数
                maxSize: '3',//最大页数
                numPages: '',//共有多少页
                previousText: '上一页',
                nextText: '下一页',
                firstText: '首页',
                lastText: '末页'
            };
            //实例化对象
            //判断上次是否有数据如果有则取记录值
            if(getData()){
                $scope.infoToView=getData();
                $scope.pagination=$scope.infoToView.pagination;
            }else {
                $scope.infoToView=$$coinsuranceInvoicesInvoice.Account().infoToView;
            }
            $scope.tapName = $scope.infoToView.tapName;
            $scope.auditingConditions = [];
            $scope.PrpJCommBillDto = [];
        };
        /**
         * 临时数据管理
         * 存储临时数据
         */
        var saveData=function () {
            $scope.infoToView.pagination=$scope.pagination;//存取分页数据
            mcMultiEditorCacheService.localData('coinsuranceInvoices',$scope.infoToView);
        };
        /**
         * 获取存储数据
         */
        var getData=function () {
            return mcMultiEditorCacheService.localData('coinsuranceInvoices');
        };
        /**
         * 记录调用
         */
        $scope.saveInputData=function () {
            saveData();
        }
        $scope.newsaveInputData=function () {
            saveData();
        }
        $scope.tapFlag = '1';
        $scope.tapName = [
            {
                'title': '共保保费发票查询',
                'index': '1',
                'active': true,
                "btnStyle":{"width":"150px"}
            },
            {
                'title': '手续费发票查询',
                'index': '2',
                'active': false,
                "btnStyle":{"width":"150px"}

            }
        ];
        /**
         * tap切换
         */
        $scope.changeTap = function (index) {
            $scope.infoToView.tapFlag = index;
            $scope.pagination.totalItems = 0;
            $scope.infoToView.checkStatus.checkedAccountAll='';
            saveData();
        };
        /**
         * 查询
         */
        $scope.searchReparations = function (target) {
            //先验证焦点定位
            if(target!='page'){
                $scope.pagination.pageIndex=1;
            }
            //if($scope.infoToView.feeInputInvoiceCondition.certiNoList != undefined){
            //    $scope.infoToView.feeInputInvoiceCondition.certiNoList = $scope.infoToView.feeInputInvoiceCondition.certiNoList.replace(/\n/g,",");
            //}
            $scope.infoToView.feeInputInvoiceCondition.webUserCode = $scope.usercode;
            $scope.infoToView.feeInputInvoiceCondition.webComCode = $scope.comCode;
            $scope.infoToView.feeInputInvoiceCondition.webCenterCode = $scope.centerCode;
            $scope.infoToView.feeInputInvoiceCondition.webTaskCode = 'payment.inputinvoice.coin';
            $$coinsuranceInvoicesInvoice.searchReparations($scope.infoToView.feeInputInvoiceCondition,{
                success: function (data) {
                    $scope.infoToView.confirmList=data.content.content;
                    if($scope.infoToView.confirmList.length<1){
                        layerMsg('暂无数据！')
                        return false
                    }
                    $scope.pagination.totalItems=data.content.totalCount;
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
                "pageNo":$scope.pagination.pageIndex-1,
                "pageSize":$scope.pagination.pageSize
            })
        }
        /**
         * 重置
         */
        $scope.resetReparations = function () {
            $scope.infoToView.feeInputInvoiceCondition = {};
            $scope.infoToView.invoiceConditionSearch = {};
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
            })
        };
        /**
         * 发票登记
         */
        $scope.invoiceRegistration = function(){
            var newArray=[];
            var certiId=[];
            $scope.checkComCode = $scope.centerCode;
            $scope.registerCode = '';
            $scope.registerCode = $scope.usercode;
            angular.forEach($scope.infoToView.confirmList,function(data,index,array){
                if(data.checked){
                    $scope.PrpJCommBillDto.push(array[index])
                }
            });
            if($scope.PrpJCommBillDto.length==0){
                layerMsg('请选择！');
                return false;
            }
            $scope.invoiceTypeFlag = false;
            $modal.open({
                templateUrl: 'components/inputInvoice/coinsuranceInvoices/tpl/modal/invoiceRegistration.html',
                resolve: {
                    PrpJCommBillDto:function () {
                        return $scope.PrpJCommBillDto
                    },
                    registerCode:function () {
                        return $scope.registerCode
                    },
                    checkComCode:function () {
                        return $scope.checkComCode
                    }
                },
                controller: function ($scope, $modalInstance,PrpJCommBillDto,registerCode,checkComCode) {
                    $scope.newPrpJCommBillDto=PrpJCommBillDto;
                    $scope.registerCode = registerCode;
                    $scope.checkComCode = checkComCode;
                    $scope.saveCollectionData = [];
                    $scope.auditingConditions=[];
                    $scope.auditingConditions = [{registerCode:$scope.registerCode,invoiceCode:'',invoiceNo:'',invoiceType:'',billingDate:'',sumFee:'',sumNoTaxFee:'',taxFee:'0',authCode:''}];
                    $scope.addTr =function(){
                        $scope.auditingConditions.push({registerCode:$scope.registerCode,invoiceCode:'',invoiceNo:'',invoiceType:'',billingDate:'',sumFee:'',sumNoTaxFee:'',taxFee:'0',authCode:''})
                    }
                    $scope.batchServicePayment = function(){
                        angular.forEach($scope.newPrpJCommBillDto,function(data,index,array){
                            $scope.saveCollectionData.push({certiId:array[index].certiId});
                        })
                        $$coinsuranceInvoicesInvoice.payLossInfo($scope.saveCollectionData,{
                            success:function (data) {
                                $scope.paymentLis = data.content;
                                $scope.paymentList = data.content.prpJcoinsSettlePlanDtoList;
                            },
                            error:function () {

                            }
                        })
                    }
                    //删除
                    $scope.deleteMessage = function (index){
                        $scope.auditingConditions.splice(index, 1);
                    };
                    $scope.batchServicePayment();
                    $scope.myFunc = function(){
                        $.each($scope.auditingConditions,function(index,data){
                            if(data.invoiceType=='02'||data.invoiceType=='03'){
                                $scope.invoiceTypeFlag = true;
                                return false;
                            }else{
                                $scope.invoiceTypeFlag = false;
                            }
                        });
                    }
                    //关闭
                    $scope.cancel = function () {
                        $modalInstance.dismiss();
                    };
                    //插入多条发票数据
                    $scope.confirmAuditing = function () {
                        $scope.cmomCode = '';
                        $scope.auditingCondition2 = [];
                        angular.forEach($scope.paymentList,function(data,index,array){
                            $scope.auditingCondition2.push({certiId:array[index].certiId});
                        })
                        $scope.cmomCode = $scope.comCode;
                        $scope.sumFeeSum = 0;
                        $scope.taxPlanFeeSum = 0;
                        angular.forEach($scope.paymentList,function(data,index,array){
                            $scope.taxPlanFeeSum += Number(data.taxPlanFee);
                        });
                        angular.forEach($scope.auditingConditions,function(data,index,array){
                            if(data.invoiceCode.length!=10){
                                layer.msg("请录入10位长度的发票代码");
                                $scope.nextpayLoss = false;
                                return false;
                            }
                            if(data.invoiceNo.length!=8){
                                layer.msg("请录入8位长度的发票号码");
                                $scope.nextpayLoss = false;
                                return false;
                            }
                            if(data.invoiceType==''){
                                layer.msg("请录入发票类型");
                                $scope.nextpayLoss = false;
                                return false;
                            }
                            if(data.invoiceType=='02'||data.invoiceType=='03'){
                                data.taxFee = 0;
                                if(data.invoiceCode == undefined||data.invoiceCode == ''){
                                    layer.msg("请录入发票代码");
                                    $scope.nextpayLoss = false;
                                    return false;
                                }else if(data.invoiceNo == undefined||data.invoiceNo == ''){
                                    layer.msg("请录入发票号码");
                                    $scope.nextpayLoss = false;
                                    return false;
                                }else {
                                    $scope.nextpayLoss = true;
                                }
                            }
                            if(data.invoiceType=='01'){
                                if(data.invoiceCode == undefined||data.invoiceCode == ''){
                                    layer.msg("请录入发票代码");
                                    $scope.nextpayLoss = false;
                                    return false;
                                }else if(data.invoiceNo == undefined||data.invoiceNo == ''){
                                    layer.msg("请录入发票号码");
                                    $scope.nextpayLoss = false;
                                    return false;
                                }else if(data.billingDate == undefined||data.billingDate == ''){
                                    layer.msg("请录入开票日期");
                                    $scope.nextpayLoss = false;
                                    return false;
                                }else if(data.sumFee == undefined||data.sumFee == ''){
                                    layer.msg("请录入含税金额");
                                    $scope.nextpayLoss = false;
                                    return false;
                                }else if(data.sumNoTaxFee == undefined||data.sumNoTaxFee == ''){
                                    layer.msg("请录入不含税金额");
                                    $scope.nextpayLoss = false;
                                    return false;
                                }else if(data.taxFee == undefined||data.taxFee == ''){
                                    layer.msg("请录入合计税额");
                                    $scope.nextpayLoss = false;
                                    return false;
                                }else if(data.authCode == undefined||data.authCode == ''){
                                    layer.msg("请录入发票认证人");
                                    $scope.nextpayLoss = false;
                                    return false;
                                }else{
                                    $scope.nextpayLoss = true;
                                }
                            }
                            $scope.sumFeeSum += Number(data.sumFee);
                        });
                        if($scope.nextpayLoss) {
                            if ($scope.sumFeeSum != $scope.taxPlanFeeSum) {
                                layer.msg("所有发票的含税金额合计与应付金额之和相等");
                                return false;
                            }
                            $modalInstance.dismiss();
                            $$coinsuranceInvoicesInvoice.payLossVerify($scope.cmomCode,$scope.auditingConditions,$scope.auditingCondition2,{
                                success: function (data) {
                                    if(data.content.resultCode=='0000'){
                                        layer.alert('发票登记号：'+data.content.invoiceRegistNo,{icon:1})
                                    }else{
                                        layer.alert(data.content.resultMsg,{icon:2})
                                        return;
                                    }
                                    //$modal.open({
                                    //    templateUrl: 'components/inputInvoice/coinsuranceInvoices/tpl/modal/coinsuranceReSuccess.html',
                                    //    controller: function ($scope, $modalInstance) {
                                    //        $scope.resultCode = data.content.resultCode;
                                    //        if(data.content.resultCode=='0000'){
                                    //            $scope.confirmLists=data.content.invoiceRegistNo;
                                    //        }else{
                                    //            $scope.confirmLists=data.content.resultMsg;
                                    //            return;
                                    //        }
                                    //    }
                                    //})
                                },
                                error: function (e) {
                                }
                            })
                        }
                    }
                }
            })
        };
        //发票查询
        $scope.findAllInvoice = function (target) {
            //先验证焦点定位
            if(target!='page'){
                $scope.pagination.pageIndex=1;
            }
            $scope.infoToView.invoiceConditionSearch.webUserCode = $scope.usercode;
            $scope.infoToView.invoiceConditionSearch.webComCode = $scope.comCode;
            $scope.infoToView.invoiceConditionSearch.webCenterCode = $scope.centerCode;
            $scope.infoToView.invoiceConditionSearch.webTaskCode = 'payment.inputinvoice.coin';
            $$coinsuranceInvoicesInvoice.findAllInvoice($scope.infoToView.invoiceConditionSearch,{
                success: function (data) {
                    $scope.infoToView.confirmListfindAll=data.content.content;
                    if($scope.infoToView.confirmListfindAll.length<1){
                        layerMsg('暂无数据！')
                        return false
                    }
                    $scope.pagination.totalItems=data.content.totalCount;
                    saveData();
                },
                error: function (e) {
                }
            },{
                "pageNo":$scope.pagination.pageIndex-1,
                "pageSize":$scope.pagination.pageSize
            })
        }
        init();
    }
    moduleApp.controller('CoinsuranceInvoicesCtrl',['$scope','$$coinsuranceInvoicesInvoice','$modal','FileUploader','$$venus','$timeout','mcMultiEditorCacheService',feeInputInvoiceCondition])
})