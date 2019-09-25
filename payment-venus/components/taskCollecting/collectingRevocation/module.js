/**
 *代收代付撤销
 */
define(['angular'],function (angular) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/taskCollecting/collectingRevocation';
        $stateProvider

            //代收代付撤销
            .state('collectingRevocation', {
                url: '/collectingRevocation',
                cache:false,
                multiEditor:{
                    multiple:false,
                    label:'代收代付撤销'
                },
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/collectingRevocation.ctrl',
                        userPath+'/factory/collectingRevocation'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/collectingRevocation.tpl.html',
                        controller: 'collectingRevocationCtrl'
                    }
                }
            });

    };
    /*模块定义*/
    var collectingRevocation = angular.module('business.taskCollecting.collectingRevocation', []);
    collectingRevocation.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            collectingRevocation.controller = $controllerProvider.register;
            collectingRevocation.directive = $compileProvider.directive;
            collectingRevocation.filter = $filterProvider.register;
            collectingRevocation.factory = $provide.factory;
            collectingRevocation.service = $provide.service;
            collectingRevocation.constant = $provide.constant;
        }]);
    /*定义路由*/
    collectingRevocation.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return collectingRevocation;

});
















