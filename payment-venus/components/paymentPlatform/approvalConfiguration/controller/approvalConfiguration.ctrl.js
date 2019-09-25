/**
 * 审批权限配置控制器
 */
define([
    '../module',
    'config'
],function (moduleApp, config) {
    'use strict';
    var ApprovalConfigurationCtrl=function($scope,$$approvalConfiguration,$modal,mcMultiEditorCacheService){
        /**
         * 机构--自动审批查询
         */
        $scope.searchAutoApproval = function (target) {
            if(target!='page'){
                $scope.approvalConfig.pagination.pageIndex=1;
            }
            $scope.approvalConfig.autoApprovalDto.auditType = "01";
            $$approvalConfiguration.searchApprovalConfig($scope.approvalConfig.autoApprovalDto,{
                success: function (data) {
                    console.log(data);
                    $scope.approvalConfig.autoApprovalList = data.content.content;
                    if(!target&&$scope.approvalConfig.autoApprovalList.length==0){
                        layerMsg("暂无数据！")
                    }
                    $scope.approvalConfig.pagination.totalItems = data.content.totalCount;
                },
                error: function (e) {
                }
            },{
                "pageNo": $scope.approvalConfig.pagination.pageIndex-1,
                "pageSize": $scope.approvalConfig.pagination.pageSize
            })
        };
        /**
         *机构--自动审批新增
         */
        $scope.addApprovalAuto = function () {
            $modal.open({
                templateUrl:'components/paymentPlatform/approvalConfiguration/tpl/modal/addApprovalAuto.modal.html',
                resolve:{},
                controller:function ($scope,$modalInstance,$rootScope) {
                    $scope.centerCode = $rootScope.user.centerCode;
                    $scope.approvalAuto ={
                        "validStatus":"1",
                        "centerCode":"",
                        "centerName":"",
                        "businessType":"",
                        "amountUpper":"",
                        "auditType":"01",
                        "auditLevel":"9"
                    };
                    $scope.cancel = function () {
                        $modalInstance.dismiss();
                    };
                    //保存
                    $scope.saveApprovalAuto = function () {
                        if($scope.approvalAuto.centerCode==""||$scope.approvalAuto.centerName==""||$scope.approvalAuto.businessType==""||$scope.approvalAuto.amountUpper==""){
                            layerMsg("请录入完整信息！");
                            return false
                        }
                        $$approvalConfiguration.saveApprovalAuto($scope.approvalAuto,{
                            success: function (data) {
                                console.log(data);
                                if(data.content.resultCode=="0000"){
                                    layer.msg(data.content.resultMsg,{icon:1})
                                    $modalInstance.close(data);
                                }else {
                                    layerMsg(data.content.resultMsg)
                                }
                            },
                            error: function (e) {
                            }
                        })
                    };
                    //重置
                    $scope.resetApprovalAuto = function () {
                        $scope.approvalAuto ={
                            "validStatus":"1",
                            "centerCode":"",
                            "centerName":"",
                            "businessType":"",
                            "amountUpper":"",
                            "auditType":"01",
                            "auditLevel":"9"
                        };
                    }
                }
            }).result.then(function (record) {
                if(record){
                    $scope.searchAutoApproval();
                }
            })
        };
        /**
         *机构--自动审批修改
         */
        $scope.reviseAutoApproval = function (target) {
            $modal.open({
                templateUrl:'components/paymentPlatform/approvalConfiguration/tpl/modal/reviseApprovalAuto.modal.html',
                resolve:{
                    target:function () {
                        return target
                    }
                },
                controller:function ($scope,$modalInstance,$rootScope,target) {
                    $scope.centerCode = $rootScope.user.centerCode;
                    $scope.approvalAuto =angular.copy(target);
                    $scope.cancel = function () {
                        $modalInstance.dismiss();
                    };
                    //保存
                    $scope.saveApprovalAuto = function () {
                        if($scope.approvalAuto.centerCode==""||$scope.approvalAuto.centerName==""){
                            layerMsg("机构代码和机构名称不能为空！");
                            return false
                        }
                        if($scope.approvalAuto.amountUpper==""){
                            layerMsg("自动审批金额不能为空！");
                            return false
                        }
                        $$approvalConfiguration.reviseApprovalAuto($scope.approvalAuto,{
                            success: function (data) {
                                console.log(data);
                                if(data.content.resultCode=="0000"){
                                    layer.msg(data.content.resultMsg,{icon:1});
                                    $modalInstance.close(data.content.resultMsg);
                                }else {
                                    layerMsg(data.content.resultMsg)
                                }
                            },
                            error: function (e) {
                            }
                        })
                    };
                }
            }).result.then(function (record) {
                if(record){
                    $scope.searchAutoApproval();
                }
            })
        };
        /**
         * 机构--手动审批查询
         */
        $scope.searchHandApproval = function (target) {
            if(target!='page'){
                $scope.approvalConfig.paginationA.pageIndex=1;
            }
            $scope.manualApprovalDto.auditType = $scope.orgCondition.approvalFlag;
            $$approvalConfiguration.searchApprovalConfig($scope.manualApprovalDto,{
                success: function (data) {
                    console.log(data);
                    $scope.approvalManualList = data.content.content;
                    if($scope.approvalManualList.length==0){
                        layerMsg("暂无数据！")
                    }
                    $scope.approvalConfig.paginationA.totalItems = data.content.totalCount;
                },
                error: function (e) {
                }
            },{
                "pageNo": $scope.approvalConfig.paginationA.pageIndex-1,
                "pageSize": $scope.approvalConfig.paginationA.pageSize
            })
        };
        /**
         *机构--手动审批新增
         */
        $scope.addApprovalManual = function () {
            $modal.open({
                templateUrl:'components/paymentPlatform/approvalConfiguration/tpl/modal/addApprovalManual.modal.html',
                resolve:{},
                controller:function ($scope,$modalInstance) {
                    $scope.manualApproval ={
                        "auditLevel":"",
                        "centerCode":"",
                        "centerName":"",
                        "businessType":"",
                        "amountUpper":"",
                        "auditType":"02",
                        "validStatus":"1"
                    };
                    $scope.cancel = function () {
                        $modalInstance.dismiss();
                    };
                    //保存
                    $scope.saveManualApproval = function () {
                        if($scope.manualApproval.centerCode==""||$scope.manualApproval.centerName==""||$scope.manualApproval.businessType==""||$scope.manualApproval.amountUpper==""||$scope.manualApproval.auditLevel==""){
                            layerMsg("请录入完整信息！");
                            return false
                        }
                        $$approvalConfiguration.saveManualApproval($scope.manualApproval,{
                            success: function (data) {
                                console.log(data);
                                if(data.content.resultCode=="0000"){
                                    layer.msg(data.content.resultMsg,{icon:1});
                                    $modalInstance.close(data);
                                }else {
                                    layerMsg(data.content.resultMsg)
                                }
                            },
                            error: function (e) {
                            }
                        })
                    };
                    //重置
                    $scope.resetManualApproval = function () {
                        $scope.manualApproval ={
                            "auditLevel":"",
                            "centerCode":"",
                            "centerName":"",
                            "businessType":"",
                            "amountUpper":"",
                            "auditType":"02",
                            "validStatus":"1"
                        };
                    }
                }
            }).result.then(function (record) {
                if(record){
                    $scope.searchHandApproval();
                }
            })
        };
        /**
         *机构--手动审批修改
         */
        $scope.reviseManualApproval = function (target) {
            $modal.open({
                templateUrl:'components/paymentPlatform/approvalConfiguration/tpl/modal/reviseApprovalManual.modal.html',
                resolve:{
                    target:function () {
                        return target
                    }
                },
                controller:function ($scope,$modalInstance,target) {
                    $scope.manualApproval =target;
                    $scope.cancel = function () {
                        $modalInstance.dismiss();
                    };
                    //保存
                    $scope.saveManualApproval = function () {
                        $$approvalConfiguration.reviseApprovalManual($scope.manualApproval,{
                            success: function (data) {
                                console.log(data);
                                if(data.content.resultCode=="0000"){
                                    layer.msg(data.content.resultMsg,{icon:1});
                                    $modalInstance.close(data);
                                }else {
                                    layerMsg(data.content.resultMsg)
                                }
                            },
                            error: function (e) {
                            }
                        })
                    };
                }
            }).result.then(function (record) {
                if(record){
                    $scope.searchHandApproval();
                }
            })
        };
        /**
         *机构-删除
         */
        $scope.deleteAutoApproval = function (target) {
            layer.confirm('确定删除吗?', {
                btn: ['确定','取消'] //按钮
            }, function(index) {
                layer.close(index);
                $$approvalConfiguration.deleteApproval(target, {
                    success: function (data) {
                        console.log(data);
                        if(data.content.resultCode == "0000"){
                            layer.msg(data.content.resultMsg,{icon:1});
                            $scope.searchAutoApproval(true);
                        }else {
                            layerMsg(data.content.resultMsg)
                        }
                    }, error: function (e) {
                    }
                })
            });
        };
        /**
         * 获取上次数据
         */
        var getLastData = function(){
            var localDada=mcMultiEditorCacheService.localData('approvalConfiguration');//获取上次数据
            if(localDada){
                $scope.approvalConfig=localDada;
            }
        };
        /**
         * 存储当前页面数据和状态
         */
        var saveData = function(){
            mcMultiEditorCacheService.localData('approvalConfiguration',$scope.approvalConfig);//存储数据
        };
        /**
         * 初始化函数
         */
        var init=function () {
            $scope.approvalConfig = $$approvalConfiguration.approvalConfig();
            getLastData();
            saveData();
        };
        init();
    };
    moduleApp.controller('ApprovalConfigurationCtrl',['$scope','$$approvalConfiguration','$modal','mcMultiEditorCacheService',ApprovalConfigurationCtrl]);
});
