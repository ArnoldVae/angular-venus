/**
 * Created by martin on 2017/4/13.
 * 银行流水查询模块
 */
define(['angular'],function (angular) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/bankManage/bankStatementSearch';
        $stateProvider

        //银行流水查询
            .state('bankStatementSearch', {
                url: '/bankStatementSearch',
                cache:false,
                multiEditor: {
                    multiple: false,
                    label: '银行流水查询'
                },
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/bankStatementSearch.ctrl',
                        userPath+'/factory/bankStatementSearch'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/bankStatementSearch.tpl.html',
                        controller: 'BankStatementSearchCtrl'
                    }
                }
            });

    };

    /*模块定义*/
    var bankStatementSearch = angular.module('business.bankManage.bankStatementSearch', []);
    bankStatementSearch.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            bankStatementSearch.controller = $controllerProvider.register;
            bankStatementSearch.directive = $compileProvider.directive;
            bankStatementSearch.filter = $filterProvider.register;
            bankStatementSearch.factory = $provide.factory;
            bankStatementSearch.service = $provide.service;
            bankStatementSearch.constant = $provide.constant;
        }]);

    /*定义路由*/
    bankStatementSearch.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return bankStatementSearch;
});


