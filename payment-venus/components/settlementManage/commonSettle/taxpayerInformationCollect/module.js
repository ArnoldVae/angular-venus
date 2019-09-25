
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
        var userPath = 'components/settlementManage/commonSettle/taxpayerInformationCollect';
        $stateProvider

        //联供保结算
            .state('taxpayerInformationCollect', {
                url: '/taxpayerInformationCollect',
                cache:false,
                multiEditor: {
                    multiple: false,
                    label: '购方纳税人信息采集'
                },
                resolve: {
                    dummy: $couchPotatoProvider.resolveDependencies([
                        userPath+'/controller/taxpayerInformationCollect.ctrl',
                        userPath+'/factory/taxpayerInformationCollect'
                    ])
                },
                views: {
                    'main': {
                        templateUrl: userPath+'/tpl/taxpayerInformationCollect.tpl.html',
                        controller: 'taxpayerInformationCollectCtrl'
                    }
                }
            })



    };

    /*模块定义*/
    var taxpayerInformationCollect = angular.module('business.settlementManage.commonSettle.taxpayerInformationCollect', []);
    taxpayerInformationCollect.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
        function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
            taxpayerInformationCollect.controller = $controllerProvider.register;
            taxpayerInformationCollect.directive = $compileProvider.directive;
            taxpayerInformationCollect.filter = $filterProvider.register;
            taxpayerInformationCollect.factory = $provide.factory;
            taxpayerInformationCollect.service = $provide.service;
            taxpayerInformationCollect.constant = $provide.constant;
        }]);

    /*定义路由*/
    taxpayerInformationCollect.config(['$stateProvider','$couchPotatoProvider', routerFn]);
    return taxpayerInformationCollect;
});
