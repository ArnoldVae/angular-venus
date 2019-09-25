/**
 * Created by Administrator on 2017/9/20 0020.
 */
/**
 *  联共保结算
 */
define([
    '../module',
    'app',
    'config'
], function (moduleApp,app,config) {
    'use strict';
    var batchBlueInvoiceIssued = function ($scope, $$taxpayerInformationCollect,$modal, $state) {
        /**
         * 导入批量开票申请
         */
        $scope.batchImport=function () {
            var keywords={
                "taxFlag":$scope.batch.taxFlag,//应税/免税标识
                "certiNoList":$scope.batch.certiNoList,//保/批单号列表
                "userCode":$scope.user.userCode,//当前用户代码
                "webUserCode":$scope.usercode,//权限配置
                "webComCode":$scope.comCode,
                "webCenterCode":$scope.centerCode,
                "webTaskCode":'payment.invoice.batchticket'
            };
            $$taxpayerInformationCollect.batchImport(keywords,{
                success: function (data) {
                    $scope.batchList=data.prpJUnionVATInvoiceDtoList || [];
                    $scope.batchCancel=data;
                    $scope.payInfoDto=data.prpdCustomerTaxPayInfoDto || {};
                    if($scope.batchCancel.appliName=='' || $scope.batchCancel.appliName==undefined){
                        $scope.batchCancel.invoiceObjectType='4';
                    }else{
                        $scope.batchCancel.invoiceObjectType='1';
                    }
                    if($scope.batchList.length<1){
                        layerMsg('暂无数据！');
                        return false
                    }
                    $scope.hideFlag=true;
                    $scope.batchCancel.invoiceType='2';
                },
                error: function (e) {
                }
            });
        };
        /**
         * 调接口查数据
         */
        var getInvoiceData=function () {
            if($scope.batchCancel.invoiceObjectCode=='' || $scope.batchCancel.invoiceObjectCode==undefined){
                $scope.payInfoDto={};
            }else{
                $$taxpayerInformationCollect.blueChangeInfo($scope.batchCancel.invoiceObjectCode,{
                    success:function (data) {
                        $scope.payInfoDto=data.content;
                    }
                })
            }
        };
        /**
         * 开票对象改变联调
         */
        $scope.changeInfo=function (flag) {
            if(flag=='1'){
                $scope.batchCancel.invoiceObjectCode=$scope.batchList[0].appliCode;
                $scope.batchCancel.appliName=$scope.batchList[0].appliName;
                getInvoiceData();
            }else if(flag=='4'){
                $scope.batchCancel.invoiceObjectCode='';
                $scope.batchCancel.appliName='';
                getInvoiceData();
            }
        };
        /**
         * 重置批量开票申请
         */
        $scope.batchReset=function () {
            $scope.batch={};
        };
        /**
         * 返回
         */
        $scope.batchInvoiceCancel=function () {
            $scope.hideFlag=false;
        };
        /**
         * 成功失败清单
         */
        var init=function () {
            $scope.batch={};
            $scope.batchCancel={};
            $scope.batchCancel.invoiceType='2';
            $scope.batch.taxFlag='1';
            $scope.payInfoDto={};
        };
        init();
        /**
         * 打印申请
         */
        $scope.batchSubmit=function (payInfoDto) {
            if(payInfoDto.taxPayerNo==''){
                layerMsg('购方纳税人识别号/统一社会信用代码不能为空','error');
                return
            }else if(payInfoDto.address==''){
                layerMsg('购方地址不能为空','error');
                return
            }else if(payInfoDto.phoneNo==''){
                layerMsg('购方电话不能为空','error');
                return
            }else if(payInfoDto.bankName==''){
                layerMsg('购方开户银行不能为空','error');
                return
            }else if(payInfoDto.accountCode==''){
                layerMsg('购方银行账号不能为空','error');
                return
            }
            var keywords={
                "currency":$scope.batchCancel.currency,
                "batchNo":$scope.batchCancel.batchNo,
                "visaFee":$scope.batchCancel.visaFee,
                "taxRate":$scope.batchCancel.taxRate,
                "notVisaFee":$scope.batchCancel.notVisaFee,
                "strUserName":$scope.batchCancel.strUserName,
                "strUserCode":$scope.batchCancel.strUserCode,
                "taxFee":$scope.batchCancel.taxFee,
                "invoiceObjectType":$scope.batchCancel.invoiceObjectType,
                "invoiceType":$scope.batchCancel.invoiceType,
                "appliName":$scope.batchCancel.appliName,
                "taxPayer":$scope.batchCancel.taxPayer,
                "taxPayerNo":payInfoDto.taxPayerNo || '',
                "address":payInfoDto.address || '',
                "phoneNo":payInfoDto.phoneNo || '',
                "bankName":payInfoDto.bankName || '',
                "accountCode":payInfoDto.accountCode || '',
                "remark":$scope.batchCancel.remark,
                "email":$scope.batchCancel.email,
                "phoneForReceivingMessage":$scope.batchCancel.phoneForReceivingMessage
            };
            $$taxpayerInformationCollect.batchSubmit(keywords,{
                success: function (data) {
                    if(data.code=='0000'){
                        layerMsg('申请成功'+ "交易流水号为：" + data.content.batchNo,'success');
                    }
                },
                error: function (e) {
                }
            });
        };
    };
    moduleApp.controller('batchBlueInvoiceIssuedCtrl', ['$scope', '$$batchBlueInvoiceIssued','$modal','$state', batchBlueInvoiceIssued]);

});
