
/**
 * 联共保结算-结算单查询模块
 */
define([
    'angular'
],function (angular
) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/settlementManage/commonSettle/payreCom';
        $stateProvider

        //联供保结算-结算单查询
            .state('payreCom', {
                url: '/payreCom',
                cache:false,
                multiEditor: {
                    multiple: false,
                    label: '联共保-结算单查询'
                },
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/payreCom.ctrl',
                        userPath+'/factory/payreCom'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/payreCom.tpl.html',
                        controller: 'PayreComCtrl'
                    }
                }
            })



    };

    /*模块定义*/
    var payreCom = angular.module('business.settlementManage.commonSettle.payreCom', []);
    payreCom.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            payreCom.controller = $controllerProvider.register;
            payreCom.directive = $compileProvider.directive;
            payreCom.filter = $filterProvider.register;
            payreCom.factory = $provide.factory;
            payreCom.service = $provide.service;
            payreCom.constant = $provide.constant;
        }]);

    /*定义路由*/
    payreCom.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return payreCom;
});
