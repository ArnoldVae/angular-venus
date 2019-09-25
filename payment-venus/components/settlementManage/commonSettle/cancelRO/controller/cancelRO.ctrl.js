/**
 * Created by Administrator on 2017/9/20 0020.
 */
/**
 *  联共保结算--进项发票取消
 */
define([
    '../module',
    'app',
    'config'
], function (moduleApp) {
    'use strict';
    var CancelROCtrl = function ($scope, $$cancelRO,mcMultiEditorCacheService) {
        /**
         * 勾选全选
         */
        $scope.selectedPayAll = function () {
            angular.forEach($scope.cancelRO.cancelROList, function (data) {
                if($scope.cancelRO.status.checkAll) {
                    data.checked = true;
                } else {
                    data.checked = false;
                }
            });
        };
        /**
         *单选
         */
        $scope.selectedPayOne = function () {
            $scope.cancelRO.status.checkAll = $scope.cancelRO.cancelROList.every(function (item, index, array) {
                return item.checked;
            });
        };
        /**
         * 勾选条数
         */
        $scope.selectNum=function () {
            $scope.cancelRO.status.selectNum=0;
            $.each($scope.cancelRO.cancelROList,function (index,item) {
                if(item.checked){
                    $scope.cancelRO.status.selectNum++;
                }
            })
        };
        /**
         * 重置
         */
        $scope.cancelROReset=function () {
          $scope.cancelRO.cancelQuery={
              "invoiceCode":"",//发票代码
              "visaSerialNo":"",//发票号码
              "certiNo1":"",//从
              "certiNo2":"",//到
              "certiNoList":"",//保/批单号列表
              "chargeType":"ALL",//费用类型
              "invoiceRegistStartDate":"",//发票登记起期
              "invoiceRegistEndDate":""//发票登记止期
          }
        };
        /**
         *查询
         */
        $scope.cancelROQuery=function(){
            //菜单权限
            $scope.cancelRO.cancelQuery.webCenterCode=$scope.centerCode;
            $scope.cancelRO.cancelQuery.webUserCode=$scope.usercode;
            $scope.cancelRO.cancelQuery.webComCode=$scope.comCode;
            $scope.cancelRO.cancelQuery.webTaskCode="payment.invoice.everySettle.inputinvoicecancel";
            $scope.cancelRO.status.checkAll=false;
            if($scope.cancelRO.moreFlag){
                if($scope.cancelRO.cancelQuery.invoiceCode =='' && $scope.cancelRO.cancelQuery.visaSerialNo  =='' && $scope.cancelRO.cancelQuery.certiNo1 =='' && $scope.cancelRO.cancelQuery.certiNo2  ==''&& $scope.cancelRO.cancelQuery.certiNoList  ==''&& $scope.cancelRO.cancelQuery.invoiceRegistStartDate  ==''&& $scope.cancelRO.cancelQuery.invoiceRegistEndDate  ==''){
                    layerMsg('请输入带红*的任意一项！');
                }else if ($scope.cancelRO.cancelQuery.invoiceRegistStartDate < $scope.cancelRO.cancelQuery.invoiceRegistEndDate || $scope.cancelRO.cancelQuery.invoiceRegistEndDate == ''){
                    $$cancelRO.cancelROQuery($scope.cancelRO.cancelQuery,{
                        success: function (data) {
                            if(data && data.content && data.content.prpjInputInvoiceRegistMainDtoList){
                                $scope.cancelRO.cancelROList=data.content.prpjInputInvoiceRegistMainDtoList;
                                if($scope.cancelRO.cancelROList && $scope.cancelRO.cancelROList.length<1){
                                    layerMsg('暂无数据！');
                                    return false
                                }
                            }
                            $scope.selectedPayOne();//更新复选框状态
                        },
                        error: function (e,code) {
                            if (options && options.error && typeof(options.error) == 'function')
                                options.error(e);
                        }
                    })
                }else{
                    layerMsg('发票登记起期必须小于发票登记止期！');
                }
            }else{
                if($scope.cancelRO.cancelQuery.certiNo1){
                    $$cancelRO.cancelROQuery($scope.cancelRO.cancelQuery,{
                        success: function (data) {
                            if(data && data.content && data.content.prpjInputInvoiceRegistMainDtoList){
                                $scope.cancelRO.cancelROList=data.content.prpjInputInvoiceRegistMainDtoList;
                                if($scope.cancelRO.cancelROList && $scope.cancelRO.cancelROList.length<1){
                                    layerMsg('暂无数据！');
                                    return false
                                }
                            }
                            $scope.selectedPayOne();//更新复选框状态
                        },
                        error: function (e,code) {
                            if (options && options.error && typeof(options.error) == 'function')
                                options.error(e);
                        }
                    });
                }else{
                    layerMsg('请输入保/批单号！');
                }
            }
        };
        /**
         *转出
         */
        $scope.cancelOut = function () {
            $.each($scope.cancelRO.cancelROList,function (index,list) {
                if(list.checked){
                    $scope.cancelRO.select.prpjInputInvoiceRegistMainDtoList.push(list);
                }
            });
            $$cancelRO.cancelOut($scope.cancelRO.select,{
                success: function (data) {
                    if(data.code =='0000'){
                        layerMsg('成功','success');
                        return false
                    }
                },
                error: function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                }
            })
        };
        /**
         * 获取上次数据
         */
        var getLastData = function(){
            var localDada=mcMultiEditorCacheService.localData('cancelRO');//获取上次数据
            if(localDada){
                $scope.cancelRO=localDada;
            }
        };
        /**
         * 存储当前页面数据和状态
         */
        var saveData = function(){
            mcMultiEditorCacheService.localData('cancelRO',$scope.cancelRO);//存储数据
        };
        /**
         *初始化
         */
        var init =function(){
            $scope.cancelRO=$$cancelRO.Cancel();
            getLastData();
            saveData();
        };
        init();

    };

    moduleApp.controller('CancelROCtrl', ['$scope', '$$cancelRO','mcMultiEditorCacheService', CancelROCtrl]);

});
