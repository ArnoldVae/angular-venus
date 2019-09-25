/**
 * 查询统计-费用报表统计
 */

define(['../module','config'], function (moduleApp,config) {
    'use strict';
    function costStatementsHandler($http) {
        console.log('税务报表Api');
        return {

        }

    }
    moduleApp.factory('$$costStatements',['$http',costStatementsHandler]);

});