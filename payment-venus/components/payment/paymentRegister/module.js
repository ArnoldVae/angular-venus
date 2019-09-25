/**
 * 结算单支付申请
 */
define(['angular'],function (angular) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/payment/paymentRegister';
        $stateProvider

        //日结
            .state('paymentRegister', {
                url: '/paymentRegister',
                cache:false,
                multiEditor: {
                    multiple: false,
                    label: '结算单支付申请'
                },
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/paymentRegister.ctrl',
                        userPath+'/factory/paymentRegister.serv'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/paymentRegister.tpl.html',
                        controller: 'PaymentRegisterCtrl'
                    }
                }
            });

    };

    /*模块定义*/
    var paymentRegister = angular.module('business.payment.paymentRegister', []);
    paymentRegister.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            paymentRegister.controller = $controllerProvider.register;
            paymentRegister.directive = $compileProvider.directive;
            paymentRegister.filter = $filterProvider.register;
            paymentRegister.factory = $provide.factory;
            paymentRegister.service = $provide.service;
            paymentRegister.constant = $provide.constant;
        }]);

    /*定义路由*/
    paymentRegister.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return paymentRegister;
});