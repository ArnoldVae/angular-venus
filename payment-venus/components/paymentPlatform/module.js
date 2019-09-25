/**
 * 银联支付平台
 */
define([
    'angular',
    'components/paymentPlatform/paymentPlatformApplication/module',
    'components/paymentPlatform/auditing/module',
    'components/paymentPlatform/approvalConfiguration/module',
    'components/paymentPlatform/accountCheckingConfig/module',
    'components/paymentPlatform/accountInfoModification/module',
    'components/paymentPlatform/queryAccountInfoTrajectory/module'
],function (angular) {
    'use strict';
    /*清分异常处理*/
    return angular.module('business.paymentPlatform', [
        'business.paymentPlatform.paymentPlatformApplication',//送支付平台申请
        'business.paymentPlatform.auditing',//送支付平台审核
        'business.paymentPlatform.approvalConfiguration',//审批权限配置
        'business.paymentPlatform.accountCheckingConfig',//账户校验配置
        'business.paymentPlatform.accountInfoModification',//账户信息修改
        'business.paymentPlatform.queryAccountInfoTrajectory'//账户信息修改轨迹查询
    ])

});
