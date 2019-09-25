/**
 *代收代付申请
 */
define(['angular'],function (angular) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/taskCollecting/collectingApplication';
        $stateProvider

            //代收代付申请
            .state('collectingApplication', {
                url: '/collectingApplication',
                cache:false,
                multiEditor:{
                    multiple:false,
                    label:'代收代付申请'
                },
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/collectingApplication.ctrl',
                        userPath+'/factory/collectingApplication'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/collectingApplication.main.tpl.html',
                        controller: 'CollectingApplicationCtrl'
                    }
                }
            });

    };
    /*模块定义*/
    var applicationInvoice = angular.module('business.taskCollecting.collectingApplication', []);
    applicationInvoice.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            applicationInvoice.controller = $controllerProvider.register;
            applicationInvoice.directive = $compileProvider.directive;
            applicationInvoice.filter = $filterProvider.register;
            applicationInvoice.factory = $provide.factory;
            applicationInvoice.service = $provide.service;
            applicationInvoice.constant = $provide.constant;
        }]);
    /*定义路由*/
    applicationInvoice.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return applicationInvoice;

});
















