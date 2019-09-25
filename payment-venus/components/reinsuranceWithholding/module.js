/**
 * Created by Administrator on 2017-10-24.
 * 再保代扣代缴
 */
define([
    'angular',
    'components/reinsuranceWithholding/WithholdingStatement/module',
    'components/reinsuranceWithholding/WithholdingPay/module',
    'components/reinsuranceWithholding/WithholdingPaidInformation/module'
],function (angular) {
    'use strict';
    /*清分异常处理*/
    return angular.module('business.reinsuranceWithholding', [
        'business.reinsuranceWithholding.WithholdingStatement',
        'business.reinsuranceWithholding.WithholdingPay',
        'business.reinsuranceWithholding.WithholdingPaidInformation'
    ])

});
