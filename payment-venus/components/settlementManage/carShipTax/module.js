/**
 * 结算管理-车船税模块
 */
define([
    'components/settlementManage/carShipTax/payList/module',
    'components/settlementManage/carShipTax/payTax/module',
    'components/settlementManage/carShipTax/settlement/module'
],function () {
    'use strict';
    /*清分异常处理*/
    return angular.module('business.settlementManage.carShipTax', [
        'business.settlementManage.carShipTax.payList',
        'business.settlementManage.carShipTax.payTax',
        'business.settlementManage.carShipTax.settlement'
    ])

});
