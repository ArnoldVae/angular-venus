/**
 * 交易失败结算单查询及支付申请
 */
define(['angular'],function (angular) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/payment/paymentReapply';
        $stateProvider

        //日结
            .state('paymentReapply', {
                url: '/paymentReapply',
                cache:false,
                multiEditor: {
                    multiple: false,
                    label: '交易失败结算单查询及支付申请'
                },
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/paymentReapply.ctrl',
                        userPath+'/factory/paymentReapply.serv'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/paymentReapply.tpl.html',
                        controller: 'PaymentReapplyCtrl'
                    }
                }
            });

    };

    /*模块定义*/
    var paymentReapply = angular.module('business.payment.paymentReapply', []);
    paymentReapply.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            paymentReapply.controller = $controllerProvider.register;
            paymentReapply.directive = $compileProvider.directive;
            paymentReapply.filter = $filterProvider.register;
            paymentReapply.factory = $provide.factory;
            paymentReapply.service = $provide.service;
            paymentReapply.constant = $provide.constant;
        }]);

    /*定义路由*/
    paymentReapply.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return paymentReapply;
});





