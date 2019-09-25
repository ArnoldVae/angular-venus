/**
 * Created by martin on 2017/4/10.
 * 综合查询模块
 */
define([
    'angular',
    'components/statistics/statisticInstant/module',
    'components/statistics/instantPayment/module',
    'components/statistics/taxStatements/module',
    'components/statistics/premiumStatements/module',
    'components/statistics/costStatements/module',
    'components/statistics/outputIncomeBill/module',
    'components/statistics/diurnalInformationQuery/module'
],function (angular) {
    'use strict';
    return angular.module('business.statistics', [
        'business.statistics.statisticInstant',
        'business.statistics.instantPayment',
        'business.statistics.taxStatements',
        'business.statistics.premiumStatements',
        'business.statistics.costStatements',
        'business.statistics.outputIncomeBill',
        'business.statistics.diurnalInformationQuery'
    ])

});
