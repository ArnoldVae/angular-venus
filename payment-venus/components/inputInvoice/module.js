/**
 * 进项发票管理
 */
define([
    'angular',
    'components/inputInvoice/feeInputInvoice/module',
    'components/inputInvoice/coinsuranceInvoices/module',
    'components/inputInvoice/settlementInvoice/module'
],function (angular) {
    'use strict';
    /*清分异常处理*/
    return angular.module('business.inputInvoice', [
        'business.inputInvoice.feeInputInvoice',
        'business.inputInvoice.coinsuranceInvoices',
        'business.inputInvoice.settlementInvoice'
    ])

});
