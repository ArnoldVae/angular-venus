/**
 * 结算管理模块
 */
define([
    'angular',
    'components/settlementManage/carShipTax/module',
    'components/settlementManage/paulSettlement/module',
    'components/settlementManage/commonSettle/module'
],function (angular) {
    'use strict';
    /*清分异常处理*/
    return angular.module('business.settlementManage', [
        'business.settlementManage.carShipTax',
        'business.settlementManage.paulSettlement',
        'business.settlementManage.commonSettle'
    ])

});
