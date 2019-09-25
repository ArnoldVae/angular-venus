/**
 * Created by martin on 2017/4/13.
 * 再保代扣代缴-代扣代缴报表模块
 */
define(['angular'],function (angular) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/reinsuranceWithholding/WithholdingStatement';
        $stateProvider

            .state('WithholdingStatement', {
                url: '/WithholdingStatement',
                cache: false,
                multiEditor: {
                    multiple: false,
                    label: '代扣代缴报表'
                },
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/WithholdingStatement.ctrl',
                        userPath+'/factory/WithholdingStatement'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/WithholdingStatement.tpl.html',
                        controller: 'WithholdingStatementCtrl'
                    }
                }
            });



    };

    /*模块定义*/
    var WithholdingStatement = angular.module('business.reinsuranceWithholding.WithholdingStatement', []);
    WithholdingStatement.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            WithholdingStatement.controller = $controllerProvider.register;
            WithholdingStatement.directive = $compileProvider.directive;
            WithholdingStatement.filter = $filterProvider.register;
            WithholdingStatement.factory = $provide.factory;
            WithholdingStatement.service = $provide.service;
            WithholdingStatement.constant = $provide.constant;
        }]);

    /*定义路由*/
    WithholdingStatement.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return WithholdingStatement;
});


