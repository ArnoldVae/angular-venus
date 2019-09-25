/**
 * 付款单生成
 */
define(['angular'],function (angular) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/payment/paymentGenerate';
        $stateProvider

            .state('paymentGenerate', {
                url: '/paymentGenerate',
                cache:false,
                multiEditor: {
                    multiple: false,
                    label: '结算单生成'
                },
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/paymentGenerate.ctrl',
                        userPath+'/factory/paymentGenerate.serv'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/paymentGenerate.tpl.html',
                        controller: 'PaymentGenerateCtrl'
                    }
                }
            });

    };

    /*模块定义*/
    var paymentGenerate = angular.module('business.payment.paymentGenerate', []);
    paymentGenerate.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            paymentGenerate.controller = $controllerProvider.register;
            paymentGenerate.directive = $compileProvider.directive;
            paymentGenerate.filter = $filterProvider.register;
            paymentGenerate.factory = $provide.factory;
            paymentGenerate.service = $provide.service;
            paymentGenerate.constant = $provide.constant;
        }]);

    /*定义路由*/
    paymentGenerate.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return paymentGenerate;
});
