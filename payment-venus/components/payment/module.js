/**
 * 付款管理模块
 */
define([
    'angular',
    'components/payment/bankTemplatesExport/module',
    'components/payment/paymentConfirm/module',
    'components/payment/paymentGenerate/module',
    'components/payment/paymentMaintain/module',
    'components/payment/paymentRegister/module',
    'components/payment/paymentTaxCheck/module',
    'components/payment/payClaim/module',
    'components/payment/paymentCancel/module',
    'components/payment/paymentReapply/module',
    'components/payment/payPoundage/module'
],function (angular) {
    'use strict';
    /*清分异常处理*/
    return angular.module('business.payment', [
        'business.payment.bankTemplatesExport',//银行代发模板导出
        'business.payment.paymentConfirm',//结算单支付确认
        'business.payment.paymentGenerate',//结算单生成
        'business.payment.paymentMaintain',//税率维护
        'business.payment.paymentRegister',//结算单支付申请
        'business.payment.paymentTaxCheck',//税金复核
        'business.payment.payClaim',//付赔款
        'business.payment.paymentCancel',//结算单作废
        'business.payment.paymentReapply',//交易失败结算单查询及支付申请
        'business.payment.payPoundage'//付手续费
    ])

});
