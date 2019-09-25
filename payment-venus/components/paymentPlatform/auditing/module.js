/**
 * 送支付平台审核
 */
define(['angular'],function (angular) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/paymentPlatform/auditing';
        $stateProvider

        //日结
            .state('auditing', {
                url: '/auditing',
                cache:false,
                multiEditor: {
                    multiple: false,
                    label: '送支付平台审核'
                },
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/auditing.ctrl',
                        userPath+'/factory/auditing.serv'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/auditing.main.tpl.html',
                        controller: 'AuditingCtrl'
                    }
                }
            });

    };

    /*模块定义*/
    var auditing = angular.module('business.paymentPlatform.auditing', []);
    auditing.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            auditing.controller = $controllerProvider.register;
            auditing.directive = $compileProvider.directive;
            auditing.filter = $filterProvider.register;
            auditing.factory = $provide.factory;
            auditing.service = $provide.service;
            auditing.constant = $provide.constant;
        }]);

    /*定义路由*/
    auditing.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return auditing;
});


