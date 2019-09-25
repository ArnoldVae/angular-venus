/**
 * 付款单确认
 */
define(['angular'],function (angular) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/payment/paymentConfirm';
        $stateProvider

        //日结
            .state('paymentConfirm', {
                url: '/paymentConfirm',
                cache:false,
                multiEditor: {
                    multiple: false,
                    label: '结算单支付确认'
                },
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/paymentConfirm.ctrl',
                        userPath+'/factory/paymentConfirm.serv'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/paymentConfirm.tpl.html',
                        controller: 'PaymentConfirmCtrl'
                    }
                }
            });

    };

    /*模块定义*/
    var paymentConfirm = angular.module('business.payment.paymentConfirm', []);
    paymentConfirm.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            paymentConfirm.controller = $controllerProvider.register;
            paymentConfirm.directive = $compileProvider.directive;
            paymentConfirm.filter = $filterProvider.register;
            paymentConfirm.factory = $provide.factory;
            paymentConfirm.service = $provide.service;
            paymentConfirm.constant = $provide.constant;
        }]);

    /*定义路由*/
    paymentConfirm.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return paymentConfirm;
});





