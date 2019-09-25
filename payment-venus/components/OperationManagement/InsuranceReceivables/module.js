/**
 * Created by martin on 2017/11/14.
 * 运维管理-挂帐管理-应收保费挂帐
 */
define(['angular'],function (angular) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/OperationManagement/InsuranceReceivables';
        $stateProvider

            .state('InsuranceReceivables', {
                url: '/InsuranceReceivables',
                cache: false,
                multiEditor: {
                    multiple: false,
                    label: '应收保费挂帐'
                },
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/InsuranceReceivables.ctrl',
                        userPath+'/factory/InsuranceReceivables'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/InsuranceReceivables.tpl.html',
                        controller: 'InsuranceReceivablesCtrl'
                    }
                }
            });



    };

    /*模块定义*/
    var InsuranceReceivables = angular.module('business.OperationManagement.InsuranceReceivables', []);
    InsuranceReceivables.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            InsuranceReceivables.controller = $controllerProvider.register;
            InsuranceReceivables.directive = $compileProvider.directive;
            InsuranceReceivables.filter = $filterProvider.register;
            InsuranceReceivables.factory = $provide.factory;
            InsuranceReceivables.service = $provide.service;
            InsuranceReceivables.constant = $provide.constant;
        }]);

    /*定义路由*/
    InsuranceReceivables.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return InsuranceReceivables;
});
