/**
 *红冲业务信息
 */
define(['angular'],function (angular) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/redFlush/redFlushBusinessInf';
        $stateProvider

            .state('redFlushBusinessInf', {
                url: '/redFlushBusinessInf',
                cache:false,
                multiEditor:{
                    multiple:false,
                    label:'业务红冲信息'
                },
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/redFlushBusinessInf.ctrl',
                        userPath+'/factory/redFlushBusinessInf.serv'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/redFlushBusinessInf.tpl.html',
                        controller: 'redFlushBusinessInfCtrl'
                    }
                }
            });

    };
    /*模块定义*/
    var redFlushBusinessInf = angular.module('business.redFlush.redFlushBusinessInf', []);
    redFlushBusinessInf.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            redFlushBusinessInf.controller = $controllerProvider.register;
            redFlushBusinessInf.directive = $compileProvider.directive;
            redFlushBusinessInf.filter = $filterProvider.register;
            redFlushBusinessInf.factory = $provide.factory;
            redFlushBusinessInf.service = $provide.service;
            redFlushBusinessInf.constant = $provide.constant;
        }]);
    /*定义路由*/
    redFlushBusinessInf.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return redFlushBusinessInf;
});
















