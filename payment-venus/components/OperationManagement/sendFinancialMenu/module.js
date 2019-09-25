/**
 * Created by martin on 2017/11/14.
 * 运维管理-挂帐管理-应收保费挂帐
 */
define(['angular'],function (angular) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/OperationManagement/sendFinancialMenu';
        $stateProvider

            .state('sendFinancialMenu', {
                url: '/sendFinancialMenu',
                cache: false,
                multiEditor: {
                    multiple: false,
                    label: '送财务菜单'
                },
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/InsuranceReceivables.ctrl',
                        userPath+'/factory/InsuranceReceivables'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/sendFinancialMenu.html',
                        controller: 'InsuranceReceivablesCtrl'
                    }
                }
            });



    };

    /*模块定义*/
    var sendFinancialMenu = angular.module('business.OperationManagement.sendFinancialMenu', []);
    sendFinancialMenu.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            sendFinancialMenu.controller = $controllerProvider.register;
            sendFinancialMenu.directive = $compileProvider.directive;
            sendFinancialMenu.filter = $filterProvider.register;
            sendFinancialMenu.factory = $provide.factory;
            sendFinancialMenu.service = $provide.service;
            sendFinancialMenu.constant = $provide.constant;
        }]);

    /*定义路由*/
    sendFinancialMenu.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return sendFinancialMenu;
});
