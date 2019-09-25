/**
 * 手续费进项发票控制器
 */
define([
    '../module'
],function (moduleApp) {
    'use strict';
    var settlementInvoiceCondition=function($scope,$$settlementInvoice,$modal,FileUploader,$$venus,$timeout,mcMultiEditorCacheService){
        /**
         * 获取上次数据
         */
        var getLastData = function(){
            var localDada=mcMultiEditorCacheService.localData('settlementInvoice');//获取上次数据
            if(localDada){
                $scope.feeInputInvoiceCondition=localDada;
            }
        };
        /**
         * 存储当前页面数据和状态
         */
        var saveData = function(){
            mcMultiEditorCacheService.localData('settlementInvoice',$scope.feeInputInvoiceCondition);//存储数据
        };
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
            //分页信息
            $scope.paginationRegister = {
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
            $scope.feeInputInvoiceCondition = {};
            $scope.auditingCondition = {};
            $scope.invoiceConditionSearch = {};
            $scope.PrpJCommBillDto = [];
            //实例化对象
            $scope.confirmation=$$settlementInvoice.Account();
            $scope.infoToView=$scope.confirmation.infoToView;
            $scope.feeInputInvoiceCondition=$scope.infoToView.confirmQuery;
            getLastData();//获取上次数据
            saveData();//储存数据
        };
        init();
        /**
         * tab切换
         * @type {string}
         */
        $scope.tapFlag = '1';
        $scope.tapName = [
            {
                'title': '理赔费用发票查询',
                'index': '1',
                'active': true,
                "btnStyle":{"width":"150px"}
            },
            {
                'title': '理赔发票查询',
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
         * 查询
         */
        $scope.searchReparations = function (target) {
            //权限配置
            $scope.feeInputInvoiceCondition.webUserCode=$scope.usercode;
            $scope.feeInputInvoiceCondition.webComCode=$scope.comCode;
            $scope.feeInputInvoiceCondition.webCenterCode=$scope.centerCode;
            $scope.feeInputInvoiceCondition.webTaskCode='payment.inputinvoice.claim';
            //先验证焦点定位
                        $scope.queryNum=0;
                        $scope.selectedNum=0;
                        $scope.selectedPay=0;
                        if(target!='page'){
                            $scope.pagination.pageIndex=1;
                        }
            $$settlementInvoice.queryLossPlanForInvoice($scope.feeInputInvoiceCondition,{
                            success: function (data) {
                                $scope.confirmList=data.content.content;
                                if($scope.confirmList.length<1){
                                    layerMsg('暂无数据！');
                                    return false
                                }
                                $scope.pagination.totalItems=data.content.content.length;
                                angular.forEach($scope.confirmList,function(data){
                                    $scope.queryNum++;
                                    data.checked=false;
                                    data.selectedClass='';
                                    $scope.infoToView.checkStatus.checkedAccountAll=$scope.confirmList.every(function(item,index,array){
                                        return item.checked;
                                    })
                                })
                            },
                            error: function (e) {
                            }
                        },{
                            "pageNo":$scope.pagination.pageIndex,
                            "pageSize":$scope.pagination.pageSize
                        })
                    }
        /**
         * 重置
         */
        $scope.resetReparations = function () {
            $scope.feeInputInvoiceCondition = {};
            $scope.invoiceConditionSearch = {};
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
                $scope.infoToView.checkStatus.checkedAccountAll=$scope.confirmList.every(function(item,index,array){
                    return item.checked;
                })
            };
        /**
         * 勾选改变状态
         */
        $scope.selectedChangeClass=function(){
            var selectedNum=0.00;
            angular.forEach($scope.confirmList,function(data){
                if(data.checked){
                    data.selectedClass='venus_table_check';
                    selectedNum++
                }
                else {
                    data.selectedClass=''
                }
            });
            $scope.selectedNum=selectedNum;
        };
        /**
         * 发票登记
         */
        $scope.invoiceRegistration = function(){
            $scope.PrpJCommBillDto=[];
            if($scope.confirmList == undefined || $scope.confirmList.length==0){
                layerMsg('请选择！');
                return false;
            }
            $.each($scope.confirmList,function (index,item) {
                if(item.checked){
                    $scope.PrpJCommBillDto.push(item)
                }
            });
            if($scope.PrpJCommBillDto.length==0){
                layerMsg('请选择！');
                return false;
            }
            $modal.open({
                templateUrl: 'components/inputInvoice/settlementInvoice/tpl/modal/settlementInvoiceinvoiceRegistration.html',
                resolve: {
                    PrpJCommBillDto:function () {
                        return $scope.PrpJCommBillDto
                    },
                    userCode:function () {
                        return $scope.usercode
                    },
                    centerCode:function () {
                        return $scope.centerCode
                    }
                },
                controller: function ($scope, $modalInstance,PrpJCommBillDto,userCode,centerCode) {
                    $scope.newPrpJCommBillDto=PrpJCommBillDto;
                    $scope.saveCollectionData = [];
                    //初始化页面增加一行
                    $scope.auditingConditions = [{invoiceCode:'',invoiceNo:'',authCode:'',invoiceType:'01',billingDate:'',sumFee:'',sumNoTaxFee:'',sumTaxFee:''}];
                    $scope.userCode=userCode;
                    $scope.centerCode=centerCode;
                    $scope.batchServicePayment = function(){
                        $$settlementInvoice.payComInfo($scope.newPrpJCommBillDto,{
                            success:function (data) {
                                $scope.paymentLis = data.content;
                                $scope.paymentList = data.content.prpJlossPlanDtoList;
                                $scope.parrSum = 0;
                            },
                            error:function () {
                            }
                        })
                    };
                    $scope.batchServicePayment();
                    $scope.addTr =function(){
                        $scope.auditingConditions.push({registerCode:$scope.registerCode,invoiceCode:'',invoiceNo:'',authCode:'',invoiceType:'01',billingDate:'',sumFee:'',sumNoTaxFee:'',sumTaxFee:''})
                    };
                    //输入数字，根据规则变化
                    //$scope.whriteData=function(){
                    //    $scope.parrSum = 0;
                    //    $scope.parrNum=0;
                    //    $.each($scope.auditingConditions,function (index,item) {
                    //        $scope.parrSum+=parseFloat(item.sumTaxFee);
                    //    });
                    //    //当赔款计算书为一条记录时，进项税额为下方所有发票的合计税额之和
                    //    if($scope.paymentList.length==1){
                    //        $scope.paymentList[0].taxFee = $scope.parrSum;
                    //        //各条计算书的进项税额应按付款金额所占所有赔款计算书的总金额比例进行分摊，
                    //        // 注意：除了最后一条赔款计算书的进项税额应为第一条赔款计算书的付款金额与总金额的比例，下方所有发票的合计税额之和；
                    //        // 最后一条赔款计算书的进项税额应为下方所有发票的合计税额之和减去前面所有赔款计算书的进项税额
                    //    }else if($scope.paymentList.length > 1){
                    //        for(var i=0;i<$scope.paymentList.length-1;i++){
                    //            $scope.paymentList[i].taxFee =$scope.paymentList[i].planFee/$scope.paymentLis.sumPlanFee*$scope.parrSum;
                    //            $scope.parrNum = $scope.paymentList[i].taxFee+$scope.parrNum;
                    //        }
                    //        $scope.paymentList[$scope.paymentList.length-1].taxFee =$scope.parrSum-$scope.parrNum;
                    //    }
                    //};
                    /**
                     * 页面切换单选框时，切换汇率
                     * @param taxRate
                     */
                    $scope.changeTaxRate=function (taxRate) {
                        if(taxRate=='3%' || taxRate=='6%'){
                            $.each($scope.paymentList,function (index,item) {
                                item.taxRate=taxRate;
                            })
                        }else if(taxRate=='0'){
                            $.each($scope.paymentList,function (index,item) {
                                item.taxRate='';
                            })
                        }
                    };
                    //含税金额自动带出
                    $scope.whriteData = function(){
                        for(var i=0;i<$scope.auditingConditions.length;i++){
                            if(Number($scope.auditingConditions[i].sumNoTaxFee)<Number($scope.auditingConditions[i].sumTaxFee)){
                                layer.msg("所有发票的税额合计的和必须小于不含税金额合计");
                                $scope.auditingConditions[i].sumTaxFee=0;
                                return false;
                            }
                            $scope.auditingConditions[i].sumFee =Number($scope.auditingConditions[i].sumNoTaxFee)+Number($scope.auditingConditions[i].sumTaxFee)
                        }
                    }
                    ////抵扣税金带出税额
                    //$scope.whriteDatas = function(){
                    //    for(var i=0;i<$scope.paymentList.length;i++){
                    //            $scope.auditingCondition[i].sumTaxFee =Number($scope.paymentList[i].taxfeeByHand);
                    //    }
                    //}
                    //关闭模态框
                    $scope.cancel = function () {
                        $modalInstance.dismiss();
                    };
                    //插入多条发票数据
                    $scope.confirmAuditing = function () {
                        var planFeeSum=0;//付款金额
                        var taxFeeSum=0;//进项税
                        var sumFeeSum=0;//含税金额
                        var sumTaxFeeSum=0;//税额
                        var sumNoTaxFeeSum=0;//不含税金额
                        var taxfeeByHandSum=0;//抵扣金额
                        $scope.nextpayLoss = true;
                        $.each($scope.paymentList,function (index,item) {
                            planFeeSum+=parseFloat(item.planFee);//付款金额
                            taxFeeSum+=parseFloat(item.taxFee);//进项税
                            if(item.taxfeeByHand==''||item.taxfeeByHand==undefined){
                                item.taxfeeByHand = 0;
                            }
                            taxfeeByHandSum+=Number(item.taxfeeByHand);//抵扣金额
                        });
                        //添加校检
                        $.each($scope.auditingConditions,function (index,item) {
                            if(item.invoiceType=='01'){
                                if(item.invoiceCode == undefined||item.invoiceCode == ''){
                                    layer.msg("请录入发票代码");
                                    $scope.nextpayLoss = false;
                                    return false;
                                }else if(item.invoiceNo == undefined||item.invoiceNo == ''){
                                    layer.msg("请录入发票号码");
                                    $scope.nextpayLoss = false;
                                    return false;
                                }else if(item.billingDate == undefined||item.billingDate == ''){
                                    layer.msg("请录入开票日期");
                                    $scope.nextpayLoss = false;
                                    return false;
                                }else if(item.sumFee == undefined||item.sumFee == ''){
                                    layer.msg("请录入含税金额");
                                    $scope.nextpayLoss = false;
                                    return false;
                                }else if(item.sumNoTaxFee == undefined||item.sumNoTaxFee == ''){
                                    layer.msg("请录入不含税金额");
                                    $scope.nextpayLoss = false;
                                    return false;
                                }else if(item.sumTaxFee == undefined||item.sumTaxFee == ''){
                                    layer.msg("请录入合计税额");
                                    $scope.nextpayLoss = false;
                                    return false;
                                }
                                if(item.invoiceCode.length != 10 ||item.invoiceCode.length==undefined){
                                    layer.msg("发票代码10位数字");
                                    $scope.nextpayLoss = false;
                                    return false;
                                }else if(item.invoiceNo.length!= 8 ||item.invoiceNo.length==undefined){
                                    layer.msg("发票号码8位数字");
                                    $scope.nextpayLoss = false;
                                    return false;
                                }
                            }

                            if(parseFloat(item.sumFee)!=parseFloat(item.sumNoTaxFee)+parseFloat(item.sumTaxFee)){
                                layer.msg("含税金额必须等于不含税金额与税额之和");
                                $scope.nextpayLoss = false;
                                return false;
                            }
                            sumFeeSum+=parseFloat(item.sumFee);//含税金额
                            sumNoTaxFeeSum+=parseFloat(item.sumNoTaxFee);//不含税金额
                            sumTaxFeeSum+=parseFloat(item.sumTaxFee);//税额
                        });
                        if($scope.nextpayLoss){
                            if(parseFloat(sumNoTaxFeeSum)<parseFloat(sumTaxFeeSum)){
                                layer.msg("所有发票的税额合计的和必须小于不含税金额合计");
                                return false;
                            };
                            if(parseFloat(sumFeeSum) != parseFloat($scope.paymentLis.sumPlanFee)){
                                layer.msg("发票合计含税金额不等于业务单合计应付金额");
                                return false;
                            };
                            if(parseFloat(planFeeSum) < parseFloat(taxfeeByHandSum)){
                                layer.msg("抵扣税金之和必须小于等于本次付款金额之和");
                                return false;
                            };
                            if(sumTaxFeeSum !=taxfeeByHandSum){
                                layer.msg("发票合计税额不等于业务单合计实际抵扣金额");
                                return false;
                            };
                            $modalInstance.dismiss();
                            var result={
                                "comCode":$scope.comCode,
                                "webUserCode":$scope.userCode,
                                "webComCode":$scope.comCode,
                                "webCenterComCode":$scope.centerCode,
                                "prpJIncomeInvoiceInfoDtoList":$scope.auditingConditions,
                                "prpJlossPlanDtoList":$scope.paymentList
                            };
                            $.each(result.prpJlossPlanDtoList,function (index,item) {
                                if(item.taxRate){
                                    var index=item.taxRate.indexOf('%');
                                    if(index>=0){
                                        item.taxRate = parseFloat(item.taxRate.substring(0,item.taxRate.indexOf('%')));
                                    }
                                }
                            });
                            result.prpJIncomeInvoiceInfoDtoList[0].registerCode=userCode;
                            $$settlementInvoice.payComVerify(result,{
                                success: function (data) {
                                    if(data.content.resultCode == '0000' ){
                                        if(data.content.resultCode=='0000') {
                                            layer.alert('理赔进项发票登记成功，登记号为：' + data.content.invoiceRegistNo+'<br>'+'凭证号：'+data.content.voucherNo, {
                                                icon: 1
                                            });
                                        }else{
                                            layer.alert('理赔进项发票登记失败', {
                                                icon: 2
                                            });
                                        }
                                    }else if(data.content.resultCode == '9999'){
                                        layer.alert(data.content.resultMsg,{icon:2})
                                        return;
                                    }
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
            $scope.queryNum=0;
            $scope.selectedNum=0;
            $scope.selectedPay=0;
            if(target!='page'){
                $scope.paginationRegister.pageIndex=1;
            }
            //添加权限配置
            $scope.invoiceConditionSearch.webUserCode=$scope.usercode;
            $scope.invoiceConditionSearch.webComCode=$scope.comCode;
            $scope.invoiceConditionSearch.webCenterCode=$scope.centerCode;
            $scope.invoiceConditionSearch.webTaskCode='payment.inputinvoice.claim';
            $$settlementInvoice.findAllInvoiceForCompensate($scope.invoiceConditionSearch,{
                success: function (data) {
                    $scope.confirmListfindAll=data.content.content;
                    if($scope.confirmListfindAll.length<1){
                        layerMsg('暂无数据！')
                        return false
                    }
                    $scope.paginationRegister.totalItems=data.content.content.length;
                    angular.forEach($scope.confirmListfindAll,function(data){
                        $scope.queryNum++;
                        data.checked=false;
                        data.selectedClass=''
                    })
                },
                error: function (e) {
                }
            },{
                "pageNo":$scope.paginationRegister.pageIndex- 1,
                "pageSize":$scope.paginationRegister.pageSize
            })
        }
    };
    moduleApp.controller('SettlementInvoiceCtrl',['$scope','$$settlementInvoice','$modal','FileUploader','$$venus','$timeout','mcMultiEditorCacheService', settlementInvoiceCondition])
});