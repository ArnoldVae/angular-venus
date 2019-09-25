/**
 * 税金复核
 */
define(['angular'],function (angular) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/payment/paymentTaxCheck';
        $stateProvider

        //日结
            .state('paymentTaxCheck', {
                url: '/paymentTaxCheck',
                cache:false,
                multiEditor: {
                    multiple: false,
                    label: '税金复核'
                },
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/paymentTaxCheck.ctrl',
                        userPath+'/factory/paymentTaxCheck.serv'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/paymentTaxCheck.tpl.html',
                        controller: 'PaymentTaxCheckCtrl'
                    }
                }
            });

    };

    /*模块定义*/
    var paymentTaxCheck = angular.module('business.payment.paymentTaxCheck', []);
    paymentTaxCheck.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            paymentTaxCheck.controller = $controllerProvider.register;
            paymentTaxCheck.directive = $compileProvider.directive;
            paymentTaxCheck.filter = $filterProvider.register;
            paymentTaxCheck.factory = $provide.factory;
            paymentTaxCheck.service = $provide.service;
            paymentTaxCheck.constant = $provide.constant;
        }]);

    /*定义路由*/
    paymentTaxCheck.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return paymentTaxCheck;
});