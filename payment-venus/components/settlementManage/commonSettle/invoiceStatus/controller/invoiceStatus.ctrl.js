/**
 * Created by Full Creators on 2017/11/13 0013.
 */
/**
 *  联共保结算--进项发票抵扣状态回写
 */
define([
    '../module',
    'app',
    'config'
], function (moduleApp) {
    'use strict';
    var InvoiceStatusCtrl = function ($scope, $$invoiceStatus,mcMultiEditorCacheService) {
        //抵扣
        $scope.deduction=function () {
            //菜单权限
            $scope.invoiceStatus.go.webCenterCode=$scope.centerCode;
            $scope.invoiceStatus.go.webUserCode=$scope.usercode;
            $scope.invoiceStatus.go.webComCode=$scope.comCode;
            $scope.invoiceStatus.go.webTaskCode="payment.invoice.everySettle.inputinvoiceback";
            if($scope.invoiceStatus.go.invoiceCode =='' || $scope.invoiceStatus.go.visaSerialNo  =='' || $scope.invoiceStatus.go.statusDate ==''){
                layerMsg('请输入带红*的所有项！')
            }else if($scope.invoiceStatus.go.visaStatus == '2' && $scope.invoiceStatus.go.errorText ==''){
                layerMsg('请输入带红*的所有项！')
            }else{
                $scope.invoiceStatus.obj.invoiceInfoList = [];//每次请求制空下数组,保证每次只传一条
                $scope.invoiceStatus.obj.invoiceInfoList.push($scope.invoiceStatus.go);
                $$invoiceStatus.deduction($scope.invoiceStatus.obj,{
                    success: function (data) {
                        if(data && data.code){
                            if(data.code=="0000"){
                                layerMsg(data.message,'success');
                            }else{
                                layerMsg("失败！");
                            }
                        }else{
                            layerMsg("失败！");
                        }
                    },
                    error: function (e,code) {
                        if (options && options.error && typeof(options.error) == 'function')
                            options.error(e);
                    }
                });
            }
        };
        /**
         * 重置
         */
        $scope.reset=function () {
            $scope.invoiceStatus.go={
                "invoiceCode":"",//发票代码
                "visaSerialNo":"",//发票号码
                "visaStatus":"1",//抵扣状态
                "errorText":"",//原因
                "statusDate":""//发票登记止期
            }
        };
        /**
         * 获取上次数据
         */
        var getLastData = function(){
            var localDada=mcMultiEditorCacheService.localData('invoiceStatus');//获取上次数据
            if(localDada){
                $scope.invoiceStatus=localDada;
            }
        };
        /**
         * 存储当前页面数据和状态
         */
        var saveData = function(){
            mcMultiEditorCacheService.localData('invoiceStatus',$scope.invoiceStatus);//存储数据
        };
        /**
         * 初始化
         */
        var init =function(){
            //实例化对象
            $scope.invoiceStatus=$$invoiceStatus.invoiceStatus();
            getLastData();//获取上次数据
            saveData();//储存数据
        };
        init();
    };

    moduleApp.controller('InvoiceStatusCtrl', ['$scope', '$$invoiceStatus','mcMultiEditorCacheService', InvoiceStatusCtrl]);

});
