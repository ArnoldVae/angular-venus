/**
 * 查询统计-往来账清单管理
 */
define(['../module','config'], function (moduleApp,config) {
    'use strict';
    function outputIncomeBillHandler($http) {
        console.log('税务报表Api');
        return {

        }

    }
    moduleApp.factory('$$outputIncomeBill',['$http',outputIncomeBillHandler]);

});