
/**
 * 联共保结算模块
 */
define([
    'angular'
],function (angular
) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/settlementManage/commonSettle/theDifferential';
        $stateProvider

        //联供保结算
            .state('theDifferential', {
                url: '/theDifferential',
                cache:false,
                multiEditor: {
                    multiple: false,
                    label: '税会调差'
                },
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/theDifferential.ctrl',
                        userPath+'/factory/theDifferential'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/theDifferential.tpl.html',
                        controller: 'theDifferentialCtrl'
                    }
                }
            })



    };

    /*模块定义*/
    var theDifferential = angular.module('business.settlementManage.commonSettle.theDifferential', []);
    theDifferential.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            theDifferential.controller = $controllerProvider.register;
            theDifferential.directive = $compileProvider.directive;
            theDifferential.filter = $filterProvider.register;
            theDifferential.factory = $provide.factory;
            theDifferential.service = $provide.service;
            theDifferential.constant = $provide.constant;
        }]);

    /*定义路由*/
    theDifferential.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return theDifferential;
});
