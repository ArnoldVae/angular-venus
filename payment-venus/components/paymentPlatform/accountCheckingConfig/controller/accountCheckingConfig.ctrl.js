/**
 * 账户校验配置控制器
 */
define([
    '../module',
    'config'
],function (moduleApp, config) {
    'use strict';
    var accountCheckingConfigCtrl=function($scope,$$accountCheckingConfig,$modal,mcMultiEditorCacheService){
        /**
         * 查询
         */
        $scope.queryAccountCheck = function (target) {
            // if(target!='page'){
            //     $scope.pagination.pageIndex=1;
            // }
            $scope.accountConfig.accountCheckDto.operatorCode = $scope.usercode;
            $scope.accountConfig.accountCheckDto.operatorName = $scope.userName;
            $$accountCheckingConfig.queryAccountCheck($scope.accountConfig.accountCheckDto,{
                success: function (data) {
                    console.log(data);
                    $scope.accountConfig.accountCheckList = data.content.content;
                    if(!target&&$scope.accountConfig.accountCheckList.length==0){
                        layerMsg("暂无数据！")
                    }
                },
                error: function (e) {
                }
            })
        };
        /**
         * 新增
         */
        $scope.addConfig = function () {
            $modal.open({
                templateUrl:'components/paymentPlatform/accountCheckingConfig/tpl/modal/addConfig.modal.html',
                resolve:{
                    usercode:function () {
                        return $scope.usercode
                    },
                    userName:function () {
                        return $scope.userName
                    }
                },
                controller:function ($scope,$modalInstance,usercode,userName) {
                    $scope.changeRule=function () {
                        $$accountCheckingConfig.changeAccountRule($scope.accountCheckDto.fieldCode,{
                            success:function (data) {
                                $scope.accountConfigs=data;
                            },
                            error: function (e) {
                            }
                        });
                    };
                    $scope.cancel = function () {
                        $modalInstance.dismiss();
                    };
                    //保存
                    $scope.saveAccountCheck=function () {
                        $.each($scope.accountConfigs,function (index,item) {
                            item.fieldCode=$scope.accountCheckDto.fieldCode;
                            item.checkType=item.codeCode;
                            item.operatorCode=$scope.user.userCode;
                            item.operatorName=$scope.user.userName;
                        });
                        $$accountCheckingConfig.saveAccountCheck($scope.accountConfigs,{
                            success: function (data) {
                                console.log(data);
                                if(data.content.resultCode="0000"){
                                    layer.msg(data.content.resultMsg,{icon:1});
                                    $modalInstance.close(data);
                                }else{
                                    layerMsg(data.content.resultMsg)
                                }
                            },
                            error: function (e) {
                            }
                        })
                    };
                    var init=function () {
                        $scope.accountCheckDto={}
                    };
                    init();
                }
            }).result.then(function (data) {
                if(data){
                    $scope.queryAccountCheck()
                }
            })
        };
        /**
         * 查看
         */
        $scope.lookMessage = function (target) {
            var _target=target.fieldCode;
            $modal.open({
                templateUrl:'components/paymentPlatform/accountCheckingConfig/tpl/modal/lookConfig.modal.html',
                resolve:{
                    fieldCodeDetail:function () {
                        return _target;
                    }
                },
                controller:function ($scope,$modalInstance,fieldCodeDetail) {
                    $$accountCheckingConfig.queryAccountCheckInfo(target,{
                        success: function (data) {
                            $scope.accountConfigs = data.content;
                        },
                        error: function (e) {
                        }
                    });
                    $scope.cancel = function () {
                        $modalInstance.dismiss();
                    };
                    var init=function () {
                        $scope.accountCheckDto={};
                        $scope.accountCheckDto.fieldCode=fieldCodeDetail;
                    }
                    init();
                }
            })
        };
        /**
         * 修改
         */
        $scope.changeMessage = function (target) {
            var _target=target.fieldCode;
            $modal.open({
                templateUrl:'components/paymentPlatform/accountCheckingConfig/tpl/modal/reviseConfig.modal.html',
                resolve:{
                    usercode:function () {
                        return $scope.usercode
                    },
                    userName:function () {
                        return $scope.userName
                    },
                    fieldCodeDetail:function () {
                        return _target;
                    }
                },
                controller:function ($scope,$modalInstance,usercode,userName,fieldCodeDetail) {
                    $$accountCheckingConfig.queryAccountCheckInfo(target,{
                        success: function (data) {
                            console.log(data);
                            $scope.accountConfigs = data.content;
                        },
                        error: function (e) {
                        }
                    });
                    $scope.changeRule=function () {
                        $$accountCheckingConfig.changeAccountRule($scope.accountCheckDto.fieldCode,{
                            success:function (data) {
                                $scope.accountConfigs=data;
                            },
                            error: function (e) {
                            }
                        });
                    };
                    $scope.cancel = function () {
                        $modalInstance.dismiss();
                    };
                    //保存
                    $scope.saveAccountCheck=function () {
                        $.each($scope.accountConfigs,function (index,item) {
                            item.fieldCode=$scope.accountCheckDto.fieldCode;
                            item.checkType=item.codeCode;
                            item.operatorCode=$scope.user.userCode;
                            item.operatorName=$scope.user.userName;
                        });
                        $$accountCheckingConfig.saveAccountCheck($scope.accountConfigs,{
                            success: function (data) {
                                console.log(data);
                                if(data.content.resultCode="0000"){
                                    layer.msg(data.content.resultMsg,{icon:1})
                                    $modalInstance.close(data);
                                }else{
                                    layerMsg(data.content.resultMsg)
                                }
                            },
                            error: function (e) {
                            }
                        })
                    };
                    var init=function () {
                        $scope.accountCheckDto={};
                        $scope.accountCheckDto.fieldCode=fieldCodeDetail;
                    }
                    init();
                }
            }).result.then(function (data) {
                if(data){
                    $scope.queryAccountCheck()
                }
            })
        };
        /**
         *删除
         */
        $scope.deleteAccountCheck = function (target) {
            layer.confirm('确定删除吗?', {
                btn: ['确定','取消'] //按钮
            }, function(index) {
                layer.close(index);
                $$accountCheckingConfig.deleteCheck(target, {
                    success: function (data) {
                        console.log(data);
                        if(data.content.resultCode == "0000"){
                            layer.msg(data.content.resultMsg,{icon:1});
                            $scope.queryAccountCheck(true);
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
            var localDada=mcMultiEditorCacheService.localData('accountCheckingConfig');//获取上次数据
            if(localDada){
                $scope.accountConfig=localDada;
            }
        };
        /**
         * 存储当前页面数据和状态
         */
        var saveData = function(){
            mcMultiEditorCacheService.localData('accountCheckingConfig',$scope.accountConfig);//存储数据
        };
        /**
         * 初始化函数
         */
        var init=function () {
            $scope.accountConfig = $$accountCheckingConfig.accountCheckingConfig();
            getLastData();
            saveData();
        };
        init();
    };
    moduleApp.controller('accountCheckingConfigCtrl',['$scope','$$accountCheckingConfig','$modal','mcMultiEditorCacheService',accountCheckingConfigCtrl]);
});
