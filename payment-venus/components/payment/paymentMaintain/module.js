/**
 * 税率维护
 */
define(['angular'],function (angular) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/payment/paymentMaintain';
        $stateProvider

            .state('paymentMaintain', {
                url: '/paymentMaintain',
                cache:false,
                multiEditor: {
                    multiple: false,
                    label: '税率维护'
                },
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/paymentMaintain.ctrl',
                        userPath+'/factory/paymentMaintain.serv'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/paymentMaintain.tpl.html',
                        controller: 'PaymentMaintainCtrl'
                    }
                }
            });

    };

    /*模块定义*/
    var paymentMaintain = angular.module('business.payment.paymentMaintain', []);
    paymentMaintain.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            paymentMaintain.controller = $controllerProvider.register;
            paymentMaintain.directive = $compileProvider.directive;
            paymentMaintain.filter = $filterProvider.register;
            paymentMaintain.factory = $provide.factory;
            paymentMaintain.service = $provide.service;
            paymentMaintain.constant = $provide.constant;
        }]);

    /*定义路由*/
    paymentMaintain.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return paymentMaintain;
});
