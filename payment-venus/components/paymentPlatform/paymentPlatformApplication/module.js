/**
 * 赔款送支付平台
 */
define(['angular'],function (angular) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/paymentPlatform/paymentPlatformApplication';
        $stateProvider

        //日结
            .state('paymentPlatformApplication', {
                url: '/paymentPlatformApplication',
                cache:false,
                multiEditor: {
                    multiple: false,
                    label: '送支付平台申请查询'
                },
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/paymentPlatformApplication.ctrl',
                        userPath+'/factory/paymentPlatformApplication'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/paymentPlatformApplication.tpl.html',
                        controller: 'PaymentPlatformApplicationCtrl'
                    }
                }
            });

    };

    /*模块定义*/
    var paymentPlatformApplication = angular.module('business.paymentPlatform.paymentPlatformApplication', []);
    paymentPlatformApplication.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            paymentPlatformApplication.controller = $controllerProvider.register;
            paymentPlatformApplication.directive = $compileProvider.directive;
            paymentPlatformApplication.filter = $filterProvider.register;
            paymentPlatformApplication.factory = $provide.factory;
            paymentPlatformApplication.service = $provide.service;
            paymentPlatformApplication.constant = $provide.constant;
        }]);

    /*定义路由*/
    paymentPlatformApplication.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return paymentPlatformApplication;
});


