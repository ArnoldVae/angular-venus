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
    var taxpayerInformationCollect = function ($scope, $$taxpayerInformationCollect,$modal, $state,mcMultiEditorCacheService) {
        /**
         * 重置
         */
        $scope.batchReset=function () {
            $scope.taxpayerCollect={};
        };
        /**
         * 纳税人下一步
         */
        $scope.nextTaxpayer=function () {
            /**
             * 校验是否为空
             */
            if(!$scope.taxpayerCollect.certiNo || $scope.taxpayerCollect.certiNo=='' || $scope.taxpayerCollect.certiNo==undefined){
                layerMsg('请输入保/批单号','error');
                return
            }
            if(!$scope.taxpayerCollect.handler1Code || $scope.taxpayerCollect.handler1Code=='' || $scope.taxpayerCollect.handler1Code==undefined){
                layerMsg('开票对象类型','error');
                return
            }
            //权限配置
            $scope.taxpayerCollect.webUserCode=$scope.usercode;
            $scope.taxpayerCollect.webComCode=$scope.comCode;
            $scope.taxpayerCollect.webCenterCode=$scope.centerCode;
            $scope.taxpayerCollect.webTaskCode='payment.invoice.taxpayerinfo';
            $$taxpayerInformationCollect.taxpayerNext($scope.taxpayerCollect,{
                success: function (data) {
                    if(data.code='0000'){
                        $scope.taxpayerBack=data.content.prpdCustomerTaxPayInfoDtoList;
                        if(!data.content.prpdCustomerTaxPayInfoDtoList || data.content.prpdCustomerTaxPayInfoDtoList.length==0){
                            layerMsg('暂无数据！');
                            return false
                        }
                        if($scope.taxpayerBack && $scope.taxpayerBack.length>0){
                            $.each($scope.taxpayerBack ,function (index,target) {
                                target.code=target.customerCode;
                                target.value=target.customerName;
                            })
                        }
                        $scope.taxpayerBackDemo=angular.copy($scope.taxpayerBack[0]);
                        $scope.moreFlag=true;
                        if($scope.taxpayerBackDemo.taxPayerNo!='' && $scope.taxpayerBackDemo.address!=''
                            && $scope.taxpayerBackDemo.phoneNo!='' && $scope.taxpayerBackDemo.bankName!=''
                            && $scope.taxpayerBackDemo.accountCode!=''){
                            $scope.accFlag=1;
                        }
                    }else{
                        layerMsg('请求失败！','error');
                    }
                },
                error: function (e) {
                }
            });
            /**
             * 联动
             */
            $scope.changeTaxpayerBackDemo=function () {
                $.each($scope.taxpayerBack,function (index,target) {
                    if($scope.taxpayerBackDemo.customerCode==target.customerCode){
                        $scope.taxpayerBackDemo=angular.copy(target);
                    }
                });
                if($scope.taxpayerBackDemo.taxPayerNo=='' && $scope.taxpayerBackDemo.address==''
                    && $scope.taxpayerBackDemo.phoneNo=='' && $scope.taxpayerBackDemo.bankName==''
                    && $scope.taxpayerBackDemo.accountCode==''){
                    $scope.accFlag=0;
                }else{
                    $scope.accFlag=1;
                }
            }
        };
        /**
         * 保存方法
         */
        $scope.taxpayerSubmit=function () {
            /**
             * 校验是否为空
             */
            if(!$scope.taxpayerBackDemo.customerCode || $scope.taxpayerBackDemo.customerCode=='' || $scope.taxpayerBackDemo.customerCode==undefined){
                layerMsg('请输入购方名称','error');
                return
            }
            if(!$scope.taxpayerBackDemo.taxPayerNo || $scope.taxpayerBackDemo.taxPayerNo=='' || $scope.taxpayerBackDemo.taxPayerNo==undefined){
                layerMsg('请输入纳税人识别号/统一社会信用代码','error');
                return
            }
            if(!$scope.taxpayerBackDemo.address || $scope.taxpayerBackDemo.address=='' || $scope.taxpayerBackDemo.address==undefined){
                layerMsg('请输入注册地址','error');
                return
            }
            if(!$scope.taxpayerBackDemo.phoneNo || $scope.taxpayerBackDemo.phoneNo=='' || $scope.taxpayerBackDemo.phoneNo==undefined){
                layerMsg('请输入注册电话','error');
                return
            }
            if(!$scope.taxpayerBackDemo.bankName || $scope.taxpayerBackDemo.bankName=='' || $scope.taxpayerBackDemo.bankName==undefined){
                layerMsg('请输入开户银行','error');
                return
            }
            if(!$scope.taxpayerBackDemo.accountCode || $scope.taxpayerBackDemo.accountCode=='' || $scope.taxpayerBackDemo.accountCode==undefined){
                layerMsg('请输入银行账号','error');
                return
            }
            $$taxpayerInformationCollect.taxpayerSubmit($scope.taxpayerBackDemo,{
                success: function (data) {
                    console.log(data);
                    if(data.code && data.code=='0000'){
                        layerMsg('成功！','success');
                    }
                },
                error: function (e) {
                }
            },$scope.accFlag);
        };
        /**
         * 重置方法
         */
        $scope.taxpayerReset=function () {
            $scope.taxpayerBackDemo={};
        };
        /**
         * 返回方法
         */
        $scope.taxpayerCancel=function () {
            $scope.moreFlag=false;
        };
        /**
         * 获取上次数据
         */
        var getLastData = function(){
            var localDada=mcMultiEditorCacheService.localData('taxpayerCollect');//获取上次数据
            if(localDada){
                $scope.taxpayerCollect=localDada;
            }
        };
        /**
         * 存储当前页面数据和状态
         */
        var saveData = function(){
            mcMultiEditorCacheService.localData('taxpayerCollect',$scope.taxpayerCollect);//存储数据
        };
        var init=function () {
            $scope.taxpayerCollect=$$taxpayerInformationCollect.taxpayerObject();
            getLastData();//获取上次数据
            saveData();//储存数据
            $scope.accFlag=0;
        };
        init();
    };
    moduleApp.controller('taxpayerInformationCollectCtrl', ['$scope', '$$taxpayerInformationCollect','$modal','$state','mcMultiEditorCacheService', taxpayerInformationCollect]);

});
