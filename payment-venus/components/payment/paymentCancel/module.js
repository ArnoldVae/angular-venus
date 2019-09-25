/**
 * 结算单作废
 */
define(['angular'],function (angular) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/payment/paymentCancel';
        $stateProvider

        //结算单作废
            .state('paymentCancel', {
                url: '/paymentCancel',
                cache:false,
                multiEditor: {
                    multiple: false,
                    label: '结算单作废'
                },
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/paymentCancel.ctrl',
                        userPath+'/factory/paymentCancel.serv'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/paymentCancel.tpl.html',
                        controller: 'PaymentCancelCtrl'
                    }
                }
            });

    };

    /*模块定义*/
    var paymentCancel = angular.module('business.payment.paymentCancel', []);
    paymentCancel.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            paymentCancel.controller = $controllerProvider.register;
            paymentCancel.directive = $compileProvider.directive;
            paymentCancel.filter = $filterProvider.register;
            paymentCancel.factory = $provide.factory;
            paymentCancel.service = $provide.service;
            paymentCancel.constant = $provide.constant;
        }]);

    /*定义路由*/
    paymentCancel.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return paymentCancel;
});





