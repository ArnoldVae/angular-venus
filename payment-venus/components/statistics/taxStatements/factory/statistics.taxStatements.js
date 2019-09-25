/**
 * 查询统计-税务报表统计
 */

define(['../module','config'], function (moduleApp,config) {
    'use strict';
    function taxStatementsHandler($http) {
        console.log('税务报表Api');
        return {

        }

    }
    moduleApp.factory('$$taxStatements',['$http',taxStatementsHandler]);

});