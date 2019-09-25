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
    var theDifferential = function ($scope, $$theDifferential,$modal, $state,mcMultiEditorCacheService) {
        /**
         * 保存方法
         */
        $scope.theDifferentialSubmit=function () {
            if($scope.theDifferential.date=='' || $scope.theDifferential.date==undefined){
                layer.alert('税会调差挂账日期不能为空', {icon: 0});
                return
            }else if($scope.theDifferential.centerCode=='' || $scope.theDifferential.centerCode==undefined){
                layer.alert('核算单位代码不能为空', {icon: 0});
                return
            }
            $$theDifferential.theDifferentialSubmit($scope.theDifferential,{
                success: function (data) {
                    if(data.content.errorCode=='UserException'){
                        layer.alert(data.content.errorDesc, {icon: 0});
                    }else{
                        if(data.content.vouResponseInfos && data.content.vouResponseInfos.length>0){
                            $scope.theDifferentialLists=data.content.vouResponseInfos;
                        }
                        $scope.Infos=data.content.batchNo;
                    }
                },
                error: function (e) {
                }
            });
        };
        /**
         * 重置方法
         */
        $scope.theDifferentialReset=function () {
            $scope.theDifferential={};
        };
        /**
         * 获取上次数据
         */
        var getLastData = function(){
            var localDada=mcMultiEditorCacheService.localData('theDifferential');//获取上次数据
            if(localDada){
                $scope.theDifferential=localDada;
            }
        };
        /**
         * 存储当前页面数据和状态
         */
        var saveData = function(){
            mcMultiEditorCacheService.localData('theDifferential',$scope.theDifferential);//存储数据
        };
        /**
         * 初始化数据
         */
        var init=function () {
            $scope.theDifferential=$$theDifferential.theDifferentialObject();
            $scope.theDifferentialLists=[];
            getLastData();//获取上次数据
            saveData();//储存数据
        };
        init();
    };
    moduleApp.controller('theDifferentialCtrl', ['$scope', '$$theDifferential','$modal','$state','mcMultiEditorCacheService', theDifferential]);

});
