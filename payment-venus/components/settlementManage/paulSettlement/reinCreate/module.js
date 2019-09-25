/**
 * 结算管理-再保结算
 */
define(['angular'],function (angular) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/settlementManage/paulSettlement/reinCreate';
        $stateProvider

            //再保结算
            .state('reinCreate', {
                url: '/reinCreate',
                cache:false,
                multiEditor: {
                    multiple: false,
                    label: '生成再保结算单'
                },
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/reinCreate.ctrl',
                        userPath+'/factory/reinCreate'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/reinCreate.html',
                        controller: 'ReinCreateCtrl'
                    }
                }
            });

    };

    /*模块定义*/
    var reinCreate = angular.module('business.settlementManage.paulSettlement.reinCreate', []);
    reinCreate.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            reinCreate.controller = $controllerProvider.register;
            reinCreate.directive = $compileProvider.directive;
            reinCreate.filter = $filterProvider.register;
            reinCreate.factory = $provide.factory;
            reinCreate.service = $provide.service;
            reinCreate.constant = $provide.constant;
        }]);

    /*定义路由*/
    reinCreate.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return reinCreate;
});
