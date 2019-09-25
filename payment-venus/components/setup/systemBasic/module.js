/**
 * Created by martin on 2017/4/13.
 * 设置-系统设置模块
 */
define(['angular'],function (angular) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/setup/systemBasic';
        $stateProvider
            .state('systemBasicData', {
                url: '/systemBasicData',
                cache:false,
                multiEditor: {
                    multiple: false,
                    label: '系统基础数据设置'
                },
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/setup.systemBasic.ctrl',
                        userPath+'/factory/setup.systemBasic'
                    ])
                },
                data:{
                  css:"css/setup.css"
                },

                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/setup.systemBasic.systemData.tpl.html',
                        controller: 'SystemBasicCtrl'
                    }
                }
            })
            .state('busisBasicData', {
                url: '/busisBasicData',
                cache:false,
                multiEditor: {
                    multiple: false,
                    label: '业务基础数据设置'
                },
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/setup.systemBasic.ctrl',
                        userPath+'/factory/setup.systemBasic'
                    ])
                },
                data:{
                    css:"css/setup.css"
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/setup.systemBasic.businessData.tpl.html',
                        controller: 'SystemBasicCtrl'
                    }
                }
            })

    };

    /*模块定义*/
    var systemBasic = angular.module('business.setup.systemBasic', []);
    systemBasic.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            systemBasic.controller = $controllerProvider.register;
            systemBasic.directive = $compileProvider.directive;
            systemBasic.filter = $filterProvider.register;
            systemBasic.factory = $provide.factory;
            systemBasic.service = $provide.service;
            systemBasic.constant = $provide.constant;
        }]);

    /*定义路由*/
    systemBasic.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return systemBasic;
});













