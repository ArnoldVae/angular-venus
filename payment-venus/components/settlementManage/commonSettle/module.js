/**
 * 发票管理（其子菜单中均属于————国寿poc）
 */
define([
    'components/settlementManage/commonSettle/certiManage/module',
    'components/settlementManage/commonSettle/payreCom/module',
    'components/settlementManage/commonSettle/blueInvoiceIssued/module',
    'components/settlementManage/commonSettle/redInvoiceIssued/module',
    'components/settlementManage/commonSettle/taxpayerInformationCollect/module',
    'components/settlementManage/commonSettle/batchBlueInvoiceIssued/module',
    'components/settlementManage/commonSettle/invoiceInformationQuery/module',
    'components/settlementManage/commonSettle/invoiceRegister/module',
    'components/settlementManage/commonSettle/invoiceOut/module',
    'components/settlementManage/commonSettle/cancelRO/module',
    'components/settlementManage/commonSettle/invoiceStatus/module',
    'components/settlementManage/commonSettle/produceCer/module',
    'components/settlementManage/commonSettle/outPutInvoice/module',
    'components/settlementManage/commonSettle/theDifferential/module',
    'components/settlementManage/commonSettle/payreCom/module'
],function () {
    'use strict';
    /*清分异常处理*/
    return angular.module('business.settlementManage.commonSettle', [
        'business.settlementManage.commonSettle.certiManage',
        'business.settlementManage.commonSettle.invoiceRegister',
        'business.settlementManage.commonSettle.invoiceOut',
        'business.settlementManage.commonSettle.invoiceStatus',
        'business.settlementManage.commonSettle.cancelRO',
        'business.settlementManage.commonSettle.payreCom',
        'business.settlementManage.commonSettle.blueInvoiceIssued',
        'business.settlementManage.commonSettle.redInvoiceIssued',
        'business.settlementManage.commonSettle.produceCer',
        'business.settlementManage.commonSettle.taxpayerInformationCollect',
        'business.settlementManage.commonSettle.batchBlueInvoiceIssued',
        'business.settlementManage.commonSettle.outPutInvoice',
        'business.settlementManage.commonSettle.theDifferential',
        'business.settlementManage.commonSettle.invoiceInformationQuery'
    ]);

});
