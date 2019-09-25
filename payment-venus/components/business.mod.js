/**
 * Created by ZhangJiansen on 2016/9/18.
 * 业务模块总入口
 * 增加新业务模块请在此文件中增加依赖
 */
/*引入依赖模块的定义文件*/
define([
    'angular',
    'config',
    'components/dashboard/module',//工作台
    'components/setup/module',//基础信息配置
    'components/payment/module',//付款管理
    'components/collection/module',//收款管理
    'components/statistics/module', //综合查询
    'components/daily/module',//日结管理
   /* 'components/carShipTax/module',*/
    'components/bankManage/module',//银行流水管理
    'components/demo/module',
    'components/paymentPlatform/module',//银联支付平台
    'components/inputInvoice/module',//进项发票管理
    'components/taskCollecting/module',//代收代付任务管理
    'components/accountingEngine/module',//核算引擎
    'components/settlementManage/module',//结算管理
    'components/tellerDaily/module',//收付员日结
    'components/reinsuranceWithholding/module',//再保代扣代缴
    'components/OperationManagement/module',//运维管理
    'components/PolicyReceipt/module',//运维管理
    'components/redFlush/module',//红冲处理

],function (angular,config) {
    'use strict';
    console.log("load business module");
    /*增加模块依赖*/
    return angular.module('business',
        [
            'business.dashboard',
            'business.setup',
            'business.payment',
            'business.collection',
            'business.statistics',
            'business.daily',
            /*'business.carShipTax',*/
            'business.bankManage',
            'business.demo',
            'business.paymentPlatform',
            'business.inputInvoice',
            'business.taskCollecting',
            'business.accountingEngine',
            'business.settlementManage',
            'business.reinsuranceWithholding',
            'business.OperationManagement',
            'business.PolicyReceipt',
            'business.tellerDaily',
            'business.redFlushing',

        ]);
});