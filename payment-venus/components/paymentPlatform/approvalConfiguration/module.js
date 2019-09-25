/**
 * 审批权限配置
 */
define(['angular'],function (angular) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/paymentPlatform/approvalConfiguration';
        $stateProvider

            .state('approvalConfiguration', {
                url: '/approvalConfiguration',
                cache:false,
                multiEditor: {
                    multiple: false,
                    label: '审批权限配置'
                },
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/approvalConfiguration.ctrl',
                        userPath+'/factory/approvalConfiguration'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/approvalConfigOrg.tpl.html',
                        controller: 'ApprovalConfigurationCtrl'
                    }
                }
            });

    };

    /*模块定义*/
    var approvalConfiguration = angular.module('business.paymentPlatform.approvalConfiguration', []);
    approvalConfiguration.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            approvalConfiguration.controller = $controllerProvider.register;
            approvalConfiguration.directive = $compileProvider.directive;
            approvalConfiguration.filter = $filterProvider.register;
            approvalConfiguration.factory = $provide.factory;
            approvalConfiguration.service = $provide.service;
            approvalConfiguration.constant = $provide.constant;
        }]);

    /*定义路由*/
    approvalConfiguration.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return approvalConfiguration;
});


