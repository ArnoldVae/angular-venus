/**
 * Created by martin on 2017/4/13.
 * 银行流水倒入模块
 */
define(['angular'],function (angular) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/bankManage/bankStatementImport';
        $stateProvider

        //银行流水导入
            .state('bankStatementImport', {
                url: '/bankStatementImport',
                cache:false,
                multiEditor:{
                    multiple:false,
                    label:'银行流水导入'
                },
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/bankStatementImport.ctrl',
                        userPath+'/factory/bankStatementImport'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/bankStatementImport.tpl.html',
                        controller: 'BankStatementImportCtrl'
                    }
                }
            });

    };

    /*模块定义*/
    var bankStatementImport = angular.module('business.bankManage.bankStatementImport', []);
    bankStatementImport.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            bankStatementImport.controller = $controllerProvider.register;
            bankStatementImport.directive = $compileProvider.directive;
            bankStatementImport.filter = $filterProvider.register;
            bankStatementImport.factory = $provide.factory;
            bankStatementImport.service = $provide.service;
            bankStatementImport.constant = $provide.constant;
        }]);

    /*定义路由*/
    bankStatementImport.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return bankStatementImport;
});







