/**
 * Created by Full Creators on 2017/11/13 0013.
 */
/**
 *  运维管理--数据源信息配置
 */
define([
    '../module',
    'app',
    'config'
], function (moduleApp) {
    'use strict';
    var DataConfigCtrl = function ($scope,$modal, $$dataConfig,mcMultiEditorCacheService) {
        /**
         * 修改
         */
        $scope.edit=function (id) {
            if($scope.dataConfig.editId){
                layer.alert('请保存上条记录！',{
                    icon:0
                });
            }else{
                $scope.dataConfig.noChage=angular.copy($scope.dataConfig.dataConfigList);
                $scope.dataConfig.editId=id;//是否可编辑
            }
        };
        /**
         * 返回
         */
        $scope.goBack=function () {
            $scope.dataConfig.editId='';
            $scope.dataConfig.dataConfigList=$scope.dataConfig.noChage
        };
        /**
         * 新增
         */
        $scope.dataConfigNew=function(){
            $modal.open({
                templateUrl:'components/OperationManagement/dataConfig/tpl/modal/dataConfigNew.modal.html',
                controller:function($scope,$modalInstance,$modal,$$dataConfig){
                    // 关闭弹窗
                    $scope.cancel = function () {
                        $modalInstance.dismiss();
                    };
                    //保存
                    $scope.dataConfigSave = function () {
                        if(!$scope.dataConfig.info.routingType ||!$scope.dataConfig.info.routingCondition||!$scope.dataConfig.info.routingVal||!$scope.dataConfig.info.valid||!$scope.dataConfig.info.routingLevel){
                            layerMsg('请录入以上所有选项！');
                        }else{
                            $$dataConfig.dataConfigSave($scope.dataConfig.info,{
                                success: function (data) {
                                    if(data && data.code){
                                        if(data.code=="0000"){
                                            layerMsg(data.message,'success');
                                            $scope.cancel();
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
                    $scope.reset = function () {
                        $scope.dataConfig= {
                            info: {
                                "routingType":"",
                                "routingCondition":"",
                                "routingVal":"",
                                "routingLevel":"",
                                "valid":""
                            }
                        };
                    };
                    //初始化
                    var init =function(){
                        $scope.dataConfig= {
                            info: {
                                "routingType":"",
                                "routingCondition":"",
                                "routingVal":"",
                                "routingLevel":"",
                                "valid":""
                            }
                        };
                    };
                    init();
                }
            })
        };
        //查询
        $scope.dataConfigSearch=function () {
            $scope.dataConfig.editId='';//是否可编辑
            $$dataConfig.dataConfigSearch($scope.dataConfig.info,{
                    success: function (data) {
                        $scope.dataConfig.dataConfigList=data.content;
                        if(!$scope.dataConfig.dataConfigList && !$scope.dataConfig.dataConfigList.length){
                            layerMsg('暂无数据！');
                            return false
                        }
                    },
                    error: function (e,code) {
                        if (options && options.error && typeof(options.error) == 'function')
                            options.error(e);
                    }
                });
            };
        /**
         * 删除
         */
        $scope.dataConfigRemove=function (dataInfo) {
            if($scope.dataConfig.editId){
                layer.alert('请保存上条记录！',{
                    icon:0
                });
            }else{
                $$dataConfig.dataConfigRemove(dataInfo.id,{
                    success: function (data) {
                        if(data && data.code){
                            if(data && data.code &&data.code=="0000"){
                                layer.msg('删除成功！', {icon: 1});
                                $scope.dataConfigSearch();//刷新数据
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
         * 修改保存
         */
        $scope.dataConfigModify=function (item) {
            if(!item.routingVal || !item.routingType || !item.valid || !item.routingCondition || !item.routingLevel){
                layerMsg("请录入完整信息！");
            }else{
                $$dataConfig.dataConfigModify(item,{
                    success: function (data) {
                        if(data && data.code && data.code=="0000"){
                            $scope.dataConfig.editId='';//是否可编辑
                            $scope.dataConfigSearch();//刷新数据
                            layerMsg(data.message,'success');
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
            $scope.dataConfig.info={
                "routingType":"",
                "routingCondition":"",
                "routingVal":"",
                "routingLevel":"",
                "valid":""
            }
        };
        /**
         * 获取上次数据
         */
        var getLastData = function(){
            var localDada=mcMultiEditorCacheService.localData('dataConfig');//获取上次数据
            if(localDada){
                $scope.dataConfig=localDada;
            }
        };
        /**
         * 存储当前页面数据和状态
         */
        var saveData = function(){
            mcMultiEditorCacheService.localData('dataConfig',$scope.dataConfig);//存储数据
        };
        /**
         * 初始化
         */
        var init =function(){
            //实例化对象
            $scope.dataConfig=$$dataConfig.dataConfig();
            getLastData();//获取上次数据
            saveData();
        };
        init();
    };

    moduleApp.controller('DataConfigCtrl', ['$scope','$modal', '$$dataConfig','mcMultiEditorCacheService', DataConfigCtrl]);

});
