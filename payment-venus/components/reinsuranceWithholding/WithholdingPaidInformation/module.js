/**
 * Created by martin on 2017/4/13.
 * 再保代扣代缴-代扣代缴实付信息模块
 */
define(['angular'],function (angular) {
    'use strict';
    /*路由定义实现方法*/
    var routerFn = function ($stateProvider,$couchPotatoProvider) {
        var userPath = 'components/reinsuranceWithholding/WithholdingPaidInformation';
        $stateProvider

            .state('WithholdingPaidInformation', {
                url: '/WithholdingPaidInformation',
                cache: false,
                multiEditor: {
                    multiple: false,
                    label: '代扣代缴实付信息'
                },
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/WithholdingPaidInformation.ctrl',
                        userPath+'/factory/WithholdingPaidInformation'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/WithholdingPaidInformation.tpl.html',
                        controller: 'WithholdingPaidInformationCtrl'
                    }
                }
            });



    };

    /*模块定义*/
    var WithholdingPaidInformation = angular.module('business.reinsuranceWithholding.WithholdingPaidInformation', []);
    WithholdingPaidInformation.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            WithholdingPaidInformation.controller = $controllerProvider.register;
            WithholdingPaidInformation.directive = $compileProvider.directive;
            WithholdingPaidInformation.filter = $filterProvider.register;
            WithholdingPaidInformation.factory = $provide.factory;
            WithholdingPaidInformation.service = $provide.service;
            WithholdingPaidInformation.constant = $provide.constant;
        }]);

    /*定义路由*/
    WithholdingPaidInformation.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return WithholdingPaidInformation;
});
