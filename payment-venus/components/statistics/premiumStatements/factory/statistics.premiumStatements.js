/**
 * 查询统计-保费报表统计
 */
define(['../module','config'], function (moduleApp,config) {
    'use strict';
    function premiumStatementsHandler($http) {
        console.log('保费报表Api');
        return {

        }

    }
    moduleApp.factory('$$premiumStatements',['$http',premiumStatementsHandler]);

});