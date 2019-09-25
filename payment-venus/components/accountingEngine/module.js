/**
 * Created by martin on 2017/4/13.
 * 核算引擎模块
 */
define(['angular'],function (angular) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/accountingEngine';
        $stateProvider

            //日结
            .state('accountingEngine', {
                url: '/accountingEngine',
                cache:false,
                multiEditor: {
                    multiple: false,
                    label: '核算引擎'
                },
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/accountingEngine.ctrl',
                        userPath+'/factory/accountingEngine'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/accountingEngine.tpl.html',
                        controller: 'AccountingEngineCtrl'
                    }
                },
                data:{
                    css:'css/accountingEngine.css'
                }
            });

    };

    /*模块定义*/
    var accountingEngine = angular.module('business.accountingEngine', []);
    accountingEngine.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            accountingEngine.controller = $controllerProvider.register;
            accountingEngine.directive = $compileProvider.directive;
            accountingEngine.filter = $filterProvider.register;
            accountingEngine.factory = $provide.factory;
            accountingEngine.service = $provide.service;
            accountingEngine.constant = $provide.constant;
        }]);

    /*定义路由*/
    accountingEngine.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return accountingEngine;
});




