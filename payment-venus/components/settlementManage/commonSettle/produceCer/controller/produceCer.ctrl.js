/**
 * Created by Full Creators on 2017/11/22 0022.
 */
/**
 *  联共保结算--生成进项税抵扣凭证
 */
define([
    '../module',
    'app',
    'config'
], function (moduleApp) {
    'use strict';
    var ProduceCerCtrl = function ($scope, $$produceCer,mcMultiEditorCacheService) {
        //生成进项税抵扣凭证
        $scope.produce=function () {
            if($scope.produceCer.go.date ==''){
                layerMsg('请输入生产凭证日期！')
            }else{
                $$produceCer.produce($scope.produceCer.go,{
                    success: function (data) {
                        if(data && data.code && data.code=='0000'){
                            if(data.content.errorCode=='UserException'){
                                layer.alert(data.content.errorDesc,{
                                    icon:0
                                });
                                return false
                            }else{
                                $scope.produceCerData=data.content;
                            }
                        }else{
                            layerMsg('失败！');
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
            $scope.produceCer.go={
                "date":""
            }
        };
        /**
         * 获取上次数据
         */
        var getLastData = function(){
            var localDada=mcMultiEditorCacheService.localData('produceCer');//获取上次数据
            if(localDada){
                $scope.produceCer=localDada;
            }
        };
        /**
         * 存储当前页面数据和状态
         */
        var saveData = function(){
            mcMultiEditorCacheService.localData('produceCer',$scope.produceCer);//存储数据
        };
        /**
         * 初始化
         */
        var init =function(){
            //实例化对象
            $scope.produceCer=$$produceCer.produceCer();
            getLastData();//获取上次数据
            saveData();//储存数据
        };
        init();
    };

    moduleApp.controller('ProduceCerCtrl', ['$scope', '$$produceCer','mcMultiEditorCacheService', ProduceCerCtrl]);

});
