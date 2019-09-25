/**
 * 付手续费
 */
define(['angular'],function (angular) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/payment/payPoundage';
        $stateProvider

            .state('payPoundage', {
                url: '/payPoundage',
                cache:false,
                multiEditor: {
                    multiple: false,
                    label: '付手续费'
                },
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/payPoundage.ctrl',
                        userPath+'/factory/payPoundage.serv'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/payPoundage.tpl.html',
                        controller: 'PayPoundageCtrl'
                    }
                }
            });

    };

    /*模块定义*/
    var payPoundage = angular.module('business.payment.payPoundage', []);
    payPoundage.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            payPoundage.controller = $controllerProvider.register;
            payPoundage.directive = $compileProvider.directive;
            payPoundage.filter = $filterProvider.register;
            payPoundage.factory = $provide.factory;
            payPoundage.service = $provide.service;
            payPoundage.constant = $provide.constant;
        }]);

    /*定义路由*/
    payPoundage.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return payPoundage;
});





