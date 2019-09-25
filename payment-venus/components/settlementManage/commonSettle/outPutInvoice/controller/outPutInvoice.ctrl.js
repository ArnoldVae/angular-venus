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
    var outPutInvoice = function ($scope, $$outPutInvoice,$modal, $state,mcMultiEditorCacheService) {
        /**
         * 保存方法
         */
        $scope.outPutInvoiceSubmit=function () {
            if($scope.outPutInvoice.batchNo=='' || $scope.outPutInvoice.batchNo==undefined) {
                layerMsg('交易流水号不能为空','error');
                return;
            }else if($scope.outPutInvoice.invoiceType=='' || $scope.outPutInvoice.invoiceType==undefined) {
                layerMsg('发票类型不能为空','error');
                return;
            }else if($scope.outPutInvoice.visaSerialNo=='' || $scope.outPutInvoice.visaSerialNo==undefined) {
                layerMsg('发票号码不能为空','error');
                return;
            }else if($scope.outPutInvoice.invoiceCode=='' || $scope.outPutInvoice.invoiceCode==undefined) {
                layerMsg('发票代码不能为空','error');
                return;
            }else if($scope.outPutInvoice.visaPrintStatus=='' || $scope.outPutInvoice.visaPrintStatus==undefined) {
                layerMsg('票打印状态不能为空','error');
                return;
            }else if($scope.outPutInvoice.printerName=='' || $scope.outPutInvoice.printerName==undefined) {
                layerMsg('开票人名称不能为空','error');
                return;
            }else if($scope.outPutInvoice.operateDate=='' || $scope.outPutInvoice.operateDate==undefined) {
                layerMsg('开票日期不能为空','error');
                return;
            }
            $$outPutInvoice.outPutInvoiceSubmit($scope.outPutInvoice,{
                success: function (data) {
                    if(data.content.invoiceInfoXDtoList[0] && data.content.invoiceInfoXDtoList[0].batchNo){
                        layerMsg('成功！','success');
                    }else{
                        layerMsg('销项开票回写失败！','error');
                    }
                },
                error: function (e) {
                }
            });
        };
        /**
         * 重置方法
         */
        $scope.outPutInvoiceReset=function () {
            $scope.outPutInvoice={};
        };
        /**
         * 获取上次数据
         */
        var getLastData = function(){
            var localDada=mcMultiEditorCacheService.localData('outPutInvoice');//获取上次数据
            if(localDada){
                $scope.outPutInvoice=localDada;
            }
        };
        /**
         * 存储当前页面数据和状态
         */
        var saveData = function(){
            mcMultiEditorCacheService.localData('outPutInvoice',$scope.outPutInvoice);//存储数据
        };
        var init=function () {
            $scope.outPutInvoice=$$outPutInvoice.outPutInvoiceObject();
            getLastData();//获取上次数据
            saveData();//储存数据
        };
        init();
    };
    moduleApp.controller('outPutInvoiceCtrl', ['$scope', '$$outPutInvoice','$modal','$state','mcMultiEditorCacheService', outPutInvoice]);

});
