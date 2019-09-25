/**
 * 银行代发模板导出
 */
define(['angular'],function (angular) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/payment/bankTemplatesExport';
        $stateProvider

        //日结
            .state('bankTemplatesExport', {
                url: '/bankTemplatesExport',
                cache:false,
                multiEditor: {
                    multiple: false,
                    label: '银行代发模板导出'
                },
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/bankTemplatesExport.ctrl',
                        userPath+'/factory/bankTemplatesExport.serv'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/bankTemplatesExport.tpl.html',
                        controller: 'BankTemplatesExportCtrl'
                    }
                }
            });

    };

    /*模块定义*/
    var bankTemplatesExport = angular.module('business.payment.bankTemplatesExport', []);
    bankTemplatesExport.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            bankTemplatesExport.controller = $controllerProvider.register;
            bankTemplatesExport.directive = $compileProvider.directive;
            bankTemplatesExport.filter = $filterProvider.register;
            bankTemplatesExport.factory = $provide.factory;
            bankTemplatesExport.service = $provide.service;
            bankTemplatesExport.constant = $provide.constant;
        }]);

    /*定义路由*/
    bankTemplatesExport.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return bankTemplatesExport;
});