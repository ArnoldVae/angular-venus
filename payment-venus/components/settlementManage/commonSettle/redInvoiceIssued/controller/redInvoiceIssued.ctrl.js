/**
 * Created by Administrator on 2017/9/20 0020.
 */
/**
 *  联共保结算--红票开票
 */
define([
    '../module',
    'app',
    'config'
], function (moduleApp) {
    'use strict';
    var redInvoiceIssued = function ($scope, $$redInvoiceIssued,$modal, $state,mcMultiEditorCacheService) {
        /**
         *勾选改变状态
         */
        $scope.checkedBoxChanged=function(pay){
            changeCheckStatus(pay);//控制复选框可选状态
            cacutate();//计算汇总金额
        };
        /**
         * 判断复选框是否勾选
         */
        var checkedCurrency1 = function(item){
            return item.checked;
        };
        /**
         * 控制复选框可选状态
         */
        var changeCheckStatus = function(pay){
            if(pay){
                if(pay.checked){
                    $scope.redDataInvoice.status.taxRate=pay.taxRate;
                    $scope.redDataInvoice.status.appliName=pay.appliName;
                    $scope.redDataInvoice.status.disabled=false;
                }else if(!$scope.redDataInvoice.getPayList.some(checkedCurrency1)) {
                    $scope.redDataInvoice.status.disabled=true;
                }
            }
        };
        /**
         * 全选
         */
        $scope.selectedAll=function(){
            angular.forEach($scope.redDataInvoice.getPayList,function(data){
                if($scope.redDataInvoice.status.checkedAccountAll){
                    data.checked=true;
                }else {
                    data.checked=false;
                }
            });
            cacutate();
        };
        /**
         * 计算勾选保单数量和金额
         */
        var cacutate=function(){
            $scope.redDataInvoice.selectedPay=0;//勾选的总金额
            angular.forEach($scope.redDataInvoice.getPayList,function(target,index){
                if(target.checked)
                    $scope.redDataInvoice.selectedPay+=target.notVisaFee;
            });
        };
        /**
         * 单选
         */
        $scope.selectedOne=function(){
            $scope.redDataInvoice.status.checkedAccountAll=$scope.redDataInvoice.getPayList.every(function(item){
                return item.checked;
            });
        };
        /**
         * 查询所有 账单
         */
        $scope.queryList=function () {
            //菜单权限
            $scope.redDataInvoice.query.webCenterCode=$scope.centerCode;//核算机构
            $scope.redDataInvoice.query.webUserCode=$scope.usercode;//用户代码
            $scope.redDataInvoice.query.webComCode=$scope.comCode;//登陆机构
            $scope.redDataInvoice.query.webTaskCode="payment.invoice.redticket";
            $scope.redDataInvoice.status.checkedAccountAll=false;//全选框状态
            $$redInvoiceIssued.invoiceSearch($scope.redDataInvoice.query,{
                success: function (data) {
                    if(data && data.content && data.content.prpJVatInvoiceDtoList){
                        $scope.redDataInvoice.getPayList=data.content.prpJVatInvoiceDtoList;
                        $.each($scope.redDataInvoice.getPayList,function (index,item) {
                            if ($scope.redDataInvoice.getPayList[0].taxRate!=item.taxRate || $scope.redDataInvoice.getPayList[0].appliName!=item.appliName){
                                $scope.redDataInvoice.status.checkedClaimAll_disabled=true;
                            }
                        })
                    }
                    if($scope.redDataInvoice.getPayList.length<1){
                        layerMsg('暂无数据！');
                        return false
                    }
                },
                error: function (e,code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                }
            })
        };
        /**
         * 重置表单
         */
        $scope.resetList=function(){
            $scope.redDataInvoice.query={
                "certiNoE":'',
                "certiNoS":'',
                "certiNoList":'',
                "comCode":'',
                "handler1Code":'',
                "agentCode":'',
                "contractNo":'',
                "businessNature":'',
                "riskCode":'',
                "insuredName":'',
                "appliName":'',
                "agriType":'',
                "chargeType":'1'
            }
        };
        /**
         * 红票开具申请业务提交
         */
        $scope.redInvoiceSubmit=function(){
            var keyWords={
                "userCode":$scope.user.userCode,
                "userName":$scope.user.userName,
                "loginComCode":$scope.comCode,
                "comCode":$scope.comCode,
                "prpJVatInvoiceDtoList":$scope.redDataInvoice.getPayList
            };
            $.each(keyWords.prpJVatInvoiceDtoList,function (index,item) {
                if(item.checked){
                    item.checkFlag='Y';
                }else{
                    item.checkFlag='N';
                }
            });
            var invoiceData={};
            $$redInvoiceIssued.redInvoiceSubmit(keyWords,{
                success: function (data) {
                    invoiceData=data.content;
                    $modal.open({
                        templateUrl:'components/settlementManage/commonSettle/redInvoiceIssued/tpl/modal/redInvoiceIssued.modal.html',
                        resolve:{
                            arrayChecked:function () {
                                return invoiceData;
                            }
                        },
                        controller:function($scope,$modalInstance,$$redInvoiceIssued,arrayChecked) {
                            /**
                             * 全选
                             */
                            $scope.selectedAll=function(){
                                angular.forEach($scope.invoiceSelectList,function(data){
                                    if($scope.cck.checkOwn){
                                        data.checked=true;
                                    }else {
                                        data.checked=false;
                                    }
                                });
                            };
                            /**
                             *单选
                             */
                            $scope.selectedComOne = function () {
                                $scope.cck.checkOwn = $scope.invoiceSelectList.every(function (item, index, array) {
                                    return item.checked;
                                });
                            };
                            /**
                             *金额计算
                             */
                            $scope.calculateSum = function () {
                                $scope.prpJInvoiceMainDto.totalVisaFee=0;//开票含税金额
                                angular.forEach($scope.invoiceSelectList, function (data) {
                                    if (data.checked) {
                                        data.checkFlag='Y';
                                        //计算
                                        $scope.prpJInvoiceMainDto.totalVisaFee+=data.notVisaFee * 1;//开票含税
                                        $scope.prpJInvoiceMainDto.totalNtVisaFee = ($scope.prpJInvoiceMainDto.totalVisaFee/(1+$scope.invoiceSelectList[0].taxRate )).toFixed(2);//开票不含税
                                        $scope.prpJInvoiceMainDto.totalVaTaxFee=($scope.prpJInvoiceMainDto.totalVisaFee-$scope.prpJInvoiceMainDto.totalNtVisaFee).toFixed(2);//税额
                                    }
                                    else {
                                        //如果含税金额=0就要把不含税金额和税额至为0---全部不选
                                        if(!$scope.prpJInvoiceMainDto.totalVisaFee){
                                            $scope.prpJInvoiceMainDto.totalNtVisaFee=0;
                                            $scope.prpJInvoiceMainDto.totalVaTaxFee=0;
                                        }
                                        //勾选状态
                                        data.checkFlag='N';
                                    }
                                });
                            };
                            //确定打印申请
                            $scope.redInvoiceModalSubmit=function(){
                                var getFlag =false;//是否勾选开票信息
                                $.each($scope.invoiceSelectList,function (index,_list) {
                                    if(_list.checked){
                                        getFlag=true;
                                    }
                                });
                                if(!getFlag){
                                    layerMsg('请选择开票信息','error');
                                }else if(!$scope.prpJInvoiceMainDto.taxPayer){
                                    layerMsg('纳税人身份不能为空');
                                }else if($scope.prpJInvoiceMainDto.invoiceType=='3'){
                                    if(!$scope.prpJInvoiceMainDto.taxPayerNo || !$scope.prpJInvoiceMainDto.address || !$scope.prpJInvoiceMainDto.phoneNo || !$scope.prpJInvoiceMainDto.bankName || !$scope.prpJInvoiceMainDto.accountCode){
                                        layerMsg('请输入带红*的所有项！');
                                    }else{
                                        $scope.prpJInvoiceMainDto.invoiceHeader1=$scope.prpJInvoiceMainDto.payRefName;//付款人（发票抬头）
                                        var keyWord={
                                            "prpJVatInvoiceDtoList":$scope.invoiceSelectList,//列表
                                            "prpJInvoiceMainDto":$scope.prpJInvoiceMainDto, //对象
                                            "printType":'2',//区别蓝票1，红票2
                                            "dealTaxDiff":''//税额差计算
                                        };
                                        var notPayRefTaxFeeSum=0;
                                        $.each($scope.invoiceSelectList,function (index,list) {
                                            if(list.checkFlag=='Y'){
                                                notPayRefTaxFeeSum+=list.notPayRefTaxFee*1;
                                            }
                                        });
                                        keyWord.dealTaxDiff=(keyWord.prpJInvoiceMainDto.totalVaTaxFee-notPayRefTaxFeeSum).toFixed(2);//税额差计算
                                        $$redInvoiceIssued.redInvoiceModalSubmit(keyWord,{
                                            success: function (data) {
                                                if(data.code='0000'){
                                                    layerMsg("打印申请成功,"+ "交易流水号为：" +data.content.batchNo,'success');
                                                    $scope.cancel();//关闭
                                                }
                                            },
                                            error: function (e) {
                                            }
                                        });
                                    }
                                }else{
                                    $scope.prpJInvoiceMainDto.invoiceHeader1=$scope.prpJInvoiceMainDto.payRefName;//付款人（发票抬头）
                                    var keyWord={
                                        "prpJVatInvoiceDtoList":$scope.invoiceSelectList,//列表
                                        "prpJInvoiceMainDto":$scope.prpJInvoiceMainDto, //对象
                                        "printType":'2',//区别蓝票1，红票2
                                        "dealTaxDiff":''//税额差计算
                                    };
                                    var notPayRefTaxFeeSum=0;
                                    $.each($scope.invoiceSelectList,function (index,list) {
                                        if(list.checkFlag=='Y'){
                                            notPayRefTaxFeeSum+=list.notPayRefTaxFee*1;
                                        }
                                    });
                                    keyWord.dealTaxDiff=(keyWord.prpJInvoiceMainDto.totalVaTaxFee-notPayRefTaxFeeSum).toFixed(2);//税额差计算
                                    $$redInvoiceIssued.redInvoiceModalSubmit(keyWord,{
                                        success: function (data) {
                                            if(data.code='0000'){
                                                layerMsg("打印申请成功,"+ "交易流水号为：" +data.content.batchNo,'success');
                                                $modalInstance.close(data.code);
                                            }
                                        },
                                        error: function (e,code) {
                                            if (options && options.error && typeof(options.error) == 'function')
                                                options.error(e);
                                        }
                                    });
                                }
                            };
                            //关闭弹窗
                            $scope.cancel = function () {
                                $modalInstance.dismiss();
                            };
                            var init=function () {
                                if (arrayChecked.prpJVatInvoiceDtoList) {
                                    $scope.invoiceSelectList = arrayChecked.prpJVatInvoiceDtoList || [];
                                    $scope.prpJInvoiceMainDto = arrayChecked.prpJInvoiceMainDto || {};
                                }
                                //设置页面的默认值，根据需要稳当设置
                                $scope.prpJInvoiceMainDto.invoiceType=arrayChecked.prpJInvoiceMainDto.invoiceType || '2';//费用类型
                                $scope.prpJInvoiceMainDto.invoiceObjectType=arrayChecked.prpJInvoiceMainDto.invoiceObjectType || '1';//开票对象
                                $scope.prpJInvoiceMainDto.taxPayer=arrayChecked.prpJInvoiceMainDto.taxPayer || '';//纳税人
                                // 默认列表单选、全选、颜色
                                $.each($scope.invoiceSelectList,function (index,item) {
                                    item.checked=true;
                                });
                                $scope.cck={
                                    "checkOwn":true
                                };
                                //金额计算
                                $scope.calculateSum();
                            };
                            init();
                        }
                    }).result.then(function(recode){
                        clear(recode);
                    });
                    var clear=function (recode) {
                        if (recode='0000'){
                            //清空原界面数据
                            $scope.queryList();//获取上次数据之后重新查询一次列表，确保是最新数据
                            $scope.redDataInvoice.selectedPay=0;//勾选的总金额
                        }
                    }
                },
                error: function (e,code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                }
            });
        };
        /**
         * 获取上次数据
         */
        var getLastData = function(){
            var localDada=mcMultiEditorCacheService.localData('redInvoiceIssued');//获取上次数据
            if(localDada){
                $scope.redDataInvoice=localDada;
            }
        };
        /**
         * 存储当前页面数据和状态
         */
        var saveData = function(){
            mcMultiEditorCacheService.localData('redInvoiceIssued',$scope.redDataInvoice);//存储数据
        };

        var init =function(){
            $scope.redDataInvoice=$$redInvoiceIssued.redInvoice();
            getLastData();//获取数据
            saveData();
        };
        init();

    };

    moduleApp.controller('redInvoiceIssuedCtrl', ['$scope', '$$redInvoiceIssued','$modal','$state','mcMultiEditorCacheService', redInvoiceIssued]);

});
