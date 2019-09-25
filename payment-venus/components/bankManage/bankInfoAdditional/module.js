/**
 * Created by martin on 2017/4/13.
 * 银行流水管理-银行信息补录模块
 */
define(['angular'],function (angular) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/bankManage/bankInfoAdditional';
        $stateProvider

        //
            .state('bankInfoAdditional', {
                url: '/bankInfoAdditional',
                cache:false,
                multiEditor: {
                    multiple: false,
                    label: '银行流水修改'
                },
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/bankInfoAdditional.ctrl',
                        userPath+'/factory/bankInfoAdditional'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/bankInfoAdditional.tpl.html',
                        controller: 'BankInfoAdditionalCtrl'
                    }
                }
            });

    };

    /*模块定义*/
    var bankInfoAdditional = angular.module('business.bankManage.bankInfoAdditional', []);
    bankInfoAdditional.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            bankInfoAdditional.controller = $controllerProvider.register;
            bankInfoAdditional.directive = $compileProvider.directive;
            bankInfoAdditional.filter = $filterProvider.register;
            bankInfoAdditional.factory = $provide.factory;
            bankInfoAdditional.service = $provide.service;
            bankInfoAdditional.constant = $provide.constant;
        }]);

    /*定义路由*/
    bankInfoAdditional.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return bankInfoAdditional;
});










