/**
 * 赔款送支付平台控制器
 */
define([
    '../module',
    'config'
],function (moduleApp, config) {
    'use strict';
    var PaymentPlatformApplicationCtrl=function($scope,$$paymentPlatformApplication,mcMultiEditorCacheService){
        /**
         * 查询
         */
        $scope.searchReparations = function (target) {
            if(target!='page'){
                $scope.payApply.pagination.pageIndex=1;
            }
            $scope.payApply.reparationsCondition.certiType = "C";
            $$paymentPlatformApplication.find('searchReparations',{
                "compensateNo":$scope.payApply.reparationsCondition.compensateNo,
                "policyNo":$scope.payApply.reparationsCondition.policyNo,
                "compensateNoList":$scope.payApply.reparationsCondition.compensateNoList,
                "riskCode":$scope.payApply.reparationsCondition.riskCode,
                "currency1":$scope.payApply.reparationsCondition.currency1,
                "comCode":$scope.payApply.reparationsCondition.comCode,
                "handler1Code":$scope.payApply.reparationsCondition.handler1Code,
                "appliName":$scope.payApply.reparationsCondition.appliName,
                "insuredName":$scope.payApply.reparationsCondition.insuredName,
                "signFlag":$scope.payApply.reparationsCondition.signFlag,
                "certiType":$scope.payApply.reparationsCondition.certiType,
                "certiID":$scope.payApply.reparationsCondition.certiID,
                "globalUserCode":$scope.usercode,
                "powerSystemCode":$scope.comCode,
                "taskCode":"payment.unionpay.appliypayment"
            },{
                success: function (data) {
                    console.log(data);
                    $scope.payApply.reparationsList = data.content.content;
                    if(!target&&$scope.payApply.reparationsList.length==0){
                        layerMsg("暂无数据！")
                    }
                    $scope.changeReparationsClass();
                    $scope.payApply.pagination.totalItems = data.content.totalCount;
                    $scope.payApply.status.reparationsCheckedAll =false;
                    $scope.payApply.status.radio ="";//单选框
                },
                error: function (e) {
                }
            },{
                "pageNo": $scope.payApply.pagination.pageIndex-1,
                "pageSize": $scope.payApply.pagination.pageSize
            })
        };
        /**
         * 重置
         */
        $scope.resetReparations = function () {
            $scope.payApply.reparationsCondition = {};
        };
        /**
         * 送支付平台
         */
        $scope.sendPaymentPlatform = function () {
            $scope.sendreparations = {
                "globalUserCode":$scope.usercode,
                "powerSystemCode":$scope.centerCode,
                'prpJlossPlanDtoList':[]
            };
            var sign = false;
            var signCurry = false;
            angular.forEach($scope.payApply.reparationsList,function (data,index,array) {
                if (data.changeClass=='venus_table_check'){
                    if($scope.sendreparations.prpJlossPlanDtoList.length>0){
                        if(data.currency1!=$scope.sendreparations.prpJlossPlanDtoList[0].currency1){
                            signCurry = true;
                            return false
                        }
                    }
                    if(signCurry){
                        return false
                    }
                    if(data.signFlag!="0"){
                        sign = true;
                        return false
                    }
                    $scope.sendreparations.prpJlossPlanDtoList.push(array[index])
                }
            });
            if(signCurry){
                layerMsg("只能推送同币种的单子！");
                return false
            }
            if(sign){
                layerMsg("请选择支付状态是待处理的数据！");
                return false
            }
            if ($scope.sendreparations.prpJlossPlanDtoList.length == "0"){
                layerMsg("请勾选一条记录");
                return false
            }
            //todo 暂时添加的校验
            if($scope.sendreparations.prpJlossPlanDtoList[0].signFlag=="z"){
                layerMsg("勾选数据有误，请前往账户信息修改处修改！");
                return false
            }
            $$paymentPlatformApplication.sendPaymentPlatformDto($scope.sendreparations,{
                    success:function (data) {
                        console.log(data);
                        if(data.content.resultCode == "0000"){
                            layer.msg(data.content.resultMsg,{icon:1});
                            $scope.searchReparations(true);
                        }else {
                            layerMsg(data.content.resultMsg);
                            $scope.searchReparations(true);
                        }
                    },
                    error:function () {

                    }
                })

        };
        /**
         * 全选
         */
        $scope.checkedReparationsAll = function () {
            angular.forEach($scope.payApply.reparationsList,function (data) {
                if ($scope.payApply.reparationsCondition.reparationsCheckedAll){
                    data.checked = true
                }else {
                    data.checked = false
                }

            })
        };
        /**
         * 单选
         */
        $scope.checkedReparationsOne = function () {
            $scope.payApply.status.reparationsCheckedAll = $scope.payApply.reparationsList.every(function (data) {
                return data.checked;
            })
        };
        /**
         * 勾选改变状态
         */
        $scope.changeReparationsClass = function () {
            var selectReparationsNum = 0;
            var selectReparationsPay = 0.00;
            angular.forEach($scope.payApply.reparationsList,function (data) {
                if (data.checked){
                    data.changeClass = 'venus_table_check';
                    selectReparationsPay+=Number(data.planFee);
                    selectReparationsNum++
                }
                else{
                    data.changeClass =''
                }
            });
            $scope.selectReparationsNum = selectReparationsNum;
            $scope.selectReparationsPay = selectReparationsPay.toFixed(2);
        };
        //TODO 暂时单选
        //单选勾选
        $scope.changeOne = function (flag) {
            angular.forEach($scope.payApply.reparationsList, function (data,index) {
                if (flag == index) {
                    data.changeClass ='venus_table_check';
                }
                else {
                    data.changeClass = ''
                }
            });
        };
        /**
         * 业务部门改变清空业务员
         */
        $scope.clearOperator=function () {
            $scope.payApply.reparationsCondition.handler1Code='';
            $scope.payApply.reparationsCondition.businessMan=''
        };
        /**
         * 获取上次数据
         */
        var getLastData = function(){
            var localDada=mcMultiEditorCacheService.localData('paymentPlatformApplication');//获取上次数据
            if(localDada){
                $scope.payApply=localDada;
            }
        };
        /**
         * 存储当前页面数据和状态
         */
        var saveData = function(){
            mcMultiEditorCacheService.localData('paymentPlatformApplication',$scope.payApply);//存储数据
        };
        /**
         * 初始化函数
         */
        var init=function () {
            $scope.payApply = $$paymentPlatformApplication.paymentPlatformApplication();
            getLastData();
            saveData();
        };
        init();
    };
    moduleApp.controller('PaymentPlatformApplicationCtrl',['$scope','$$paymentPlatformApplication','mcMultiEditorCacheService','$modal',PaymentPlatformApplicationCtrl]);
});
