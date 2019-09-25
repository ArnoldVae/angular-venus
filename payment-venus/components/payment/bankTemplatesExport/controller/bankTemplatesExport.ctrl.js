/**
 * 银行代发模板导出控制器
 */
define([
    '../module',
    'config'
], function (moduleApp, config) {
    'use strict';
    var BankTemplatesExportCtrl = function ($scope, $$bankTemplatesExport,mcMultiEditorCacheService) {
        console.log('银行代发模板导出控制器...');
        /**
         * 重置
         */
        $scope.resetForm = function () {
            $scope.bankTemplatesExport.reparationsCondition = {};
        };

        /**
         * 查询
         */
        $scope.searchList = function (target) {
            if(target!='page'){
                $scope.bankTemplatesExport.pagination.pageIndex=1;
            }
            if ($scope.bankTemplatesExport.reparationsCondition.contractNo == "") {
                layerMsg("请输入结算单批次号!");
                return false
            }
            if($scope.bankTemplatesExport.reparationsCondition.startDate!=""&&$scope.bankTemplatesExport.reparationsCondition.packDate!=""&&$scope.bankTemplatesExport.reparationsCondition.startDate>$scope.bankTemplatesExport.reparationsCondition.packDate){
                layerMsg("起始日期不能大于终止日期!");
                return false
            }
            $scope.bankTemplatesExport.reparationsCondition.webUserCode = $scope.usercode;
            $scope.bankTemplatesExport.reparationsCondition.webComCode = $scope.comCode;
            $scope.bankTemplatesExport.reparationsCondition.webCenterCode = $scope.centerCode;
            $$bankTemplatesExport.findBankTemplates($scope.bankTemplatesExport.reparationsCondition, {
                success: function (data) {
                    $scope.bankTemplatesExport.bankList = data.content.content;
                    if($scope.bankTemplatesExport.bankList.length==0){
                        layerMsg("暂无数据！");
                        return false
                    }
                    $scope.bankTemplatesExport.contractNo = $scope.bankTemplatesExport.reparationsCondition.contractNo;
                    $scope.bankTemplatesExport.pagination.totalItems = data.content.totalCount;
                    if (data.content.content[0].showSign == 1) {
                        $scope.bankTemplatesExport.showButton = true;
                    }
                    $scope.addFee();
                },
                error: function (e) {
                }
            },{
                "pageNo": $scope.bankTemplatesExport.pagination.pageIndex-1,
                "pageSize": $scope.bankTemplatesExport.pagination.pageSize
            })

        };
        /**
         * 累加金额
         */
        $scope.addFee = function () {
            var planFeeNum = 0.00;
            var taxDisFeeNum = 0.00;
            angular.forEach($scope.bankTemplatesExport.bankList, function (data) {
                planFeeNum += Number(data.planFee);
                taxDisFeeNum += Number(data.taxDisFee);
            });
            $scope.bankTemplatesExport.planFeeNum = planFeeNum.toFixed(2);
            $scope.bankTemplatesExport.taxDisFeeNum = taxDisFeeNum.toFixed(2);
        };
        /**
         * 导出
         */
        $scope.export = function () {
            $$bankTemplatesExport.downLoadTable($scope.bankTemplatesExport.reparationsCondition, {
                success: function (data) {
                    if(data.content.resultCode=="0000"){
                        window.open("/comm-fileserver/downloadFile?fileId="+data.content.fileId);
                    }else {
                        layerMsg(data.content.resultMsg)
                    }
                },
                error: function (e) {
                }
            });
        };
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
        $scope.printMessage=function(){
            _printData  = $scope.bankTemplatesExport;
            $scope.url = 'components/payment/bankTemplatesExport/tpl/print/printTest.html';
            printer = window.open($scope.url);
        };
        /**
         * 获取上次数据
         */
        var getLastData = function(){
            var localDada=mcMultiEditorCacheService.localData('bankTemplatesExport');//获取上次数据
            if(localDada){
                $scope.bankTemplatesExport=localDada;
            }
        };
        /**
         * 存储当前页面数据和状态
         */
        var saveData = function(){
            mcMultiEditorCacheService.localData('bankTemplatesExport',$scope.bankTemplatesExport);//存储数据
        };
        /**
         * 业务部门改变清空业务员
         */
        $scope.clearOperator=function () {
            $scope.bankTemplatesExport.reparationsCondition.handler1Code='';
            $scope.bankTemplatesExport.reparationsCondition.businessMan=''
        };
        /**
         * 初始化
         */
        var init = function () {
            $scope.bankTemplatesExport = $$bankTemplatesExport.bankTemplatesExport();
            getLastData();
            saveData();
        };
        init();
    };
    moduleApp.controller('BankTemplatesExportCtrl', ['$scope', '$$bankTemplatesExport','mcMultiEditorCacheService', BankTemplatesExportCtrl]);
});