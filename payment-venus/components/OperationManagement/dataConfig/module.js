/**
 * 运维管理-数据源信息配置————国寿poc
 */
define([
    'angular'
],function (angular
) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/OperationManagement/dataConfig';

        $stateProvider

            //数据源信息配置
            .state('dataConfig', {
                url: '/dataConfig',
                cache:false,
                multiEditor: {
                    multiple: false,
                    label: '数据源信息配置'
                },
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/dataConfig.ctrl',
                        userPath+'/factory/dataConfig'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/dataConfig.tpl.html',
                        controller: 'DataConfigCtrl'
                    }
                }
            })
    };

    /*模块定义*/
    var dataConfig = angular.module('business.OperationManagement.dataConfig', []);
    dataConfig.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            dataConfig.controller = $controllerProvider.register;
            dataConfig.directive = $compileProvider.directive;
            dataConfig.filter = $filterProvider.register;
            dataConfig.factory = $provide.factory;
            dataConfig.service = $provide.service;
            dataConfig.constant = $provide.constant;
        }]);

    /*定义路由*/
    dataConfig.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return dataConfig;
});
