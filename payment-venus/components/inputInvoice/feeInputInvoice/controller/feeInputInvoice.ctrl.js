/**
 * 手续费进项发票控制器
 */
define([
    '../module'
],function (moduleApp) {
    'use strict';
    var feeInputInvoiceCondition=function($scope,$$feeInputInvoice,$modal,FileUploader,$$venus,$timeout,mcMultiEditorCacheService){
        /**
         * 初始化
         */
        var init=function () {
            //分页信息
            $scope.pagination = {
                totalItems: '',//总数
                pageIndex: '1',//当前页面
                pageSize: '15',//显示条数
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
                $scope.infoToView=$$feeInputInvoice.Account().infoToView;
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
            mcMultiEditorCacheService.localData('feeInputInvoice',$scope.infoToView);
        };
        /**
         * 获取存储数据
         */
        var getData=function () {
            return mcMultiEditorCacheService.localData('feeInputInvoice');
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
                'title': '手续费发票登记查询',
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
            $scope.pagination.totalItems = 0;
            $scope.infoToView.tapFlag = index;
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
            //if($scope.infoToView.feeInputInvoiceCondition.visaSerialNoList != undefined){
            //    $scope.infoToView.feeInputInvoiceCondition.visaSerialNoList = $scope.infoToView.feeInputInvoiceCondition.visaSerialNoList.replace(/\n/g,",");
            //}
            $scope.infoToView.feeInputInvoiceCondition.webUserCode = $scope.usercode;
            $scope.infoToView.feeInputInvoiceCondition.webComCode = $scope.comCode;
            $scope.infoToView.feeInputInvoiceCondition.webCenterCode = $scope.centerCode;
            $scope.infoToView.feeInputInvoiceCondition.webTaskCode = 'payment.inputinvoice.fee';
                        $$feeInputInvoice.searchReparations($scope.infoToView.feeInputInvoiceCondition,{
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
                            "pageNo": $scope.pagination.pageIndex-1,
                            "pageSize": $scope.pagination.pageSize
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
            $scope.PrpJCommBillDto = [];
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

            $modal.open({
                templateUrl: 'components/inputInvoice/feeInputInvoice/tpl/modal/invoiceRegistration.html',
                resolve: {
                    PrpJCommBillDto:function () {
                        return $scope.PrpJCommBillDto
                    },
                    registerCode:function () {
                        return $scope.registerCode
                    },
                    checkComCode:function () {
                        return $scope.checkComCode
                    },
                    usercode:function () {
                        return $scope.usercode
                    },
                    centerCode:function () {
                        return $scope.centerCode
                    }
                },
                controller: function ($scope, $modalInstance,PrpJCommBillDto,registerCode,checkComCode,usercode,centerCode) {
                    $scope.newPrpJCommBillDto=PrpJCommBillDto;
                    $scope.registerCode=registerCode;
                    $scope.checkComCode = checkComCode;
                    $scope.usercode = usercode;
                    $scope.centerCode = centerCode;
                    $scope.saveCollectionData = [];
                    $scope.auditingConditions = [{registerCode:$scope.registerCode,invoiceCode:'',invoiceNo:'',authCode:'',invoiceType:'',billingDate:'',sumFee:'',sumNoTaxFee:'',sumTaxFee:'0'}];
                    $scope.addTr =function(){
                        $scope.auditingConditions.push({registerCode:$scope.registerCode,invoiceCode:'',invoiceNo:'',authCode:'',invoiceType:'',billingDate:'',sumFee:'',sumNoTaxFee:'',sumTaxFee:'0'})
                    }
                    $scope.batchServicePayment = function(){
                        angular.forEach($scope.newPrpJCommBillDto,function(data,index,array){
                            $scope.saveCollectionData.push({payrefno:array[index].payrefno});
                        })
                        $$feeInputInvoice.payLossInfo($scope.saveCollectionData,{
                            success:function (data) {
                                $scope.paymentLis = data.content;
                                $scope.paymentList = data.content.prpJpaymentBillDtoList;
                            },
                            error:function () {

                            }
                        })
                    }
                    $scope.batchServicePayment();
                    //删除
                    $scope.deleteMessage = function (index){
                        $scope.auditingConditions.splice(index,1);
                    };
                    $scope.myFunc = function(){
                        $.each($scope.auditingConditions,function(index,data){
                            if(data.invoiceType=='02'||data.invoiceType=='03'){
                                    $scope.auditingConditions[index].sumTaxFee = 0;
                                    $scope.auditingConditions[index].sumFee =Number($scope.auditingConditions[index].sumNoTaxFee)+Number($scope.auditingConditions[index].sumTaxFee);
                            }else{
                                $scope.auditingConditions[index].sumFee =Number($scope.auditingConditions[index].sumNoTaxFee)+Number($scope.auditingConditions[index].sumTaxFee);
                            }
                        });
                    }
                    //含税金额自动带出
                    $scope.whriteData = function(){
                        for(var i=0;i<$scope.auditingConditions.length;i++){
                            $scope.auditingConditions[i].sumFee =Number($scope.auditingConditions[i].sumNoTaxFee)+Number($scope.auditingConditions[i].sumTaxFee)
                        }
                    }
                    //关闭
                    $scope.cancel = function () {
                        $modalInstance.dismiss();
                    };
                    //插入多条发票数据
                    $scope.confirmAuditing = function () {
                        $scope.systemCmom = {};
                        $scope.auditingCondition2 = [];
                        angular.forEach($scope.paymentList,function(data,index,array){
                            $scope.auditingCondition2.push({payrefno:array[index].payrefno,taxfeeByHand:array[index].taxfeeByHand});
                        })
                        $scope.systemCmom.comCode = $scope.comCode;
                        $scope.systemCmom.webUserCode = $scope.usercode;
                        $scope.systemCmom.webComCode = $scope.comCode;
                        $scope.systemCmom.webCenterCode = $scope.centerCode;
                        $scope.sumNoTaxFeeSum = 0;
                        $scope.sumTaxFeeSum = 0;
                        $scope.sumFeeSum = 0;
                        $scope.payRefFeeSum = 0;
                        $scope.taxFeeSum = 0;
                        angular.forEach($scope.paymentList,function(data,index,array){
                            $scope.payRefFeeSum += Number(data.billfee);
                            if(data.taxfeeByHand==''||data.taxfeeByHand==undefined){
                                data.taxfeeByHand = 0;
                            }
                            $scope.taxFeeSum += Number(data.taxfeeByHand);
                        })
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
                                data.sumTaxFee = 0;
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
                                }else if(data.sumTaxFee == undefined||data.sumTaxFee == ''){
                                    layer.msg("请录入合计税额");
                                    $scope.nextpayLoss = false;
                                    return false;
                                } else if(data.authCode == undefined||data.authCode == ''){
                                    layer.msg("请录入发票认证人");
                                    $scope.nextpayLoss = false;
                                    return false;
                                }else{
                                    $scope.nextpayLoss = true;
                                }
                            }
                            $scope.sumNoTaxFeeSum += Number(data.sumNoTaxFee);
                            $scope.sumTaxFeeSum += Number(data.sumTaxFee);
                            $scope.sumFeeSum += Number(data.sumFee);
                        });
                        if($scope.nextpayLoss){
                            if($scope.sumNoTaxFeeSum<$scope.sumTaxFeeSum){
                                layer.msg("所有发票的税额合计的和必须小于不含税金额合计");
                                return false;
                            };
                            if($scope.sumNoTaxFeeSum + $scope.sumTaxFeeSum !=$scope.sumFeeSum){
                                layer.msg("所有发票的不含税金额合计与税额合计的和必须与含税金额合计相等");
                                return false;
                            };
                            if($scope.sumFeeSum != $scope.payRefFeeSum){
                                layer.msg("所有发票的含税金额合计与应付金额之和相等");
                                return false;
                            };
                            if($scope.sumTaxFeeSum != $scope.taxFeeSum){
                                layer.msg("发票合计税额应等于业务单合计实际抵扣金额");
                                return false;
                            };
                            if($scope.payRefFeeSum < $scope.taxFeeSum){
                                layer.msg("抵扣税金之和必须小于等于本次应付金额之和");
                                return false;
                            };
                            $modalInstance.dismiss();
                            $$feeInputInvoice.payLossVerify($scope.systemCmom,$scope.auditingConditions,$scope.auditingCondition2,{
                                success: function (data) {
                                    if(data.content.resultCode == '0000' ){
                                        if(data.content.voucherNo!=''&&data.content.voucherNo!=undefined){
                                            layer.alert('发票登记号：'+data.content.invoiceRegistNo+'<br>'+'凭证号：'+data.content.voucherNo,{icon:1})
                                        }else{
                                            layer.alert('未生成凭证',{icon:2})
                                            return;
                                        }
                                    }else if(data.content.resultCode == '9999'){
                                        layer.alert(data.content.resultMsg,{icon:2})
                                        return;
                                    }
                                    //$modal.open({
                                    //    templateUrl: 'components/inputInvoice/feeInputInvoice/tpl/modal/invoiveRegistrationSuccess.html',
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
            $scope.infoToView.invoiceConditionSearch.webTaskCode = 'payment.inputinvoice.fee';
            $$feeInputInvoice.findAllInvoice($scope.infoToView.invoiceConditionSearch,{
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
                "pageNo": $scope.pagination.pageIndex-1,
                "pageSize": $scope.pagination.pageSize
            })
        }
        init();
    }
    moduleApp.controller('FeeInputInvoiceCtrl',['$scope','$$feeInputInvoice','$modal','FileUploader','$$venus','$timeout','mcMultiEditorCacheService',feeInputInvoiceCondition])
})