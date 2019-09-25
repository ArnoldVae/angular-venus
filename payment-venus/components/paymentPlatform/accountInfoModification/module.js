/**
 * 账户信息修改
 */
define(['angular'],function (angular) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/paymentPlatform/accountInfoModification';
        $stateProvider

            .state('accountInfoModification', {
                url: '/accountInfoModification',
                cache:false,
                multiEditor: {
                    multiple: false,
                    label: '账户信息修改'
                },
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/accountInfoModification.ctrl',
                        userPath+'/factory/accountInfoModification'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/accountInfoModification.tpl.html',
                        controller: 'accountInfoModificationCtrl'
                    }
                }
            });

    };

    /*模块定义*/
    var accountInfoModification = angular.module('business.paymentPlatform.accountInfoModification', []);
    accountInfoModification.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            accountInfoModification.controller = $controllerProvider.register;
            accountInfoModification.directive = $compileProvider.directive;
            accountInfoModification.filter = $filterProvider.register;
            accountInfoModification.factory = $provide.factory;
            accountInfoModification.service = $provide.service;
            accountInfoModification.constant = $provide.constant;
        }]);

    /*定义路由*/
    accountInfoModification.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return accountInfoModification;
});


