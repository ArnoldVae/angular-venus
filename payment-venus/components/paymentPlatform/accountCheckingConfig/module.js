/**
 * 账户校验配置
 */
define(['angular'],function (angular) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/paymentPlatform/accountCheckingConfig';
        $stateProvider

            .state('accountCheckingConfig', {
                url: '/accountCheckingConfig',
                cache:false,
                multiEditor: {
                    multiple: false,
                    label: '账户校验配置'
                },
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/accountCheckingConfig.ctrl',
                        userPath+'/factory/accountCheckingConfig'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/accountCheckingConfig.tpl.html',
                        controller: 'accountCheckingConfigCtrl'
                    }
                }
            });

    };

    /*模块定义*/
    var accountCheckingConfig = angular.module('business.paymentPlatform.accountCheckingConfig', []);
    accountCheckingConfig.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            accountCheckingConfig.controller = $controllerProvider.register;
            accountCheckingConfig.directive = $compileProvider.directive;
            accountCheckingConfig.filter = $filterProvider.register;
            accountCheckingConfig.factory = $provide.factory;
            accountCheckingConfig.service = $provide.service;
            accountCheckingConfig.constant = $provide.constant;
        }]);

    /*定义路由*/
    accountCheckingConfig.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return accountCheckingConfig;
});


