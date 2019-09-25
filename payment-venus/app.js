define([
    'jquery',
    'angular',
    'angular-couch-potato',
    // 'md5',
    'plupload',
    'angular-ui-router',
    'angular-ui-router-styles',
    'angular-local-storage',
    'ui-bootstrap',
    'mc-bakery',
    'angular-jedate',
    'angular-sanitize',
    'ui-select',
    'backend-mocks',

    'angular-ui-tree',
    'angular-file-uplaod',
    'eChart',
    'ngTranslate',
    'ngTranslateLoaderPartial',
    'ngTranslateMessageFormat',
    'ngTranslateLoaderStaticFiles',
    'ngTranslateStorageLocal',
    'ngTranslateStorageCookie',
    'i18n',

    'framework',
    'utility',
    'widget',
    'business'
], function ($, angular, couchPotato) {

    'use strict';

    /**
     * @desc 创建主模块,注入配置模块
     * @type {module}
     */
    var app = angular.module('mc.venus', [
        'scs.couch-potato',
        'ui.router',
        'uiRouterStyles',
        'LocalStorageModule',
        'ui.bootstrap',
        'mc.bakery',
        'angular-jedate',
        'ngSanitize',
        'ui.select',
        'backend-mocks',
        'ui.tree',
        'angularFileUpload',
        'pascalprecht.translate',
        'mc.i18n',

        'framework',//框架模块
        'utilities',//公共模块
        'widgets',//指令模块
        'business'//业务模块
    ]);
    app.factory('Excel', function ($window) {
        var uri = 'data:application/vnd.ms-excel;base64,',
            template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
            base64 = function (s) { return $window.btoa(unescape(encodeURIComponent(s))); },
            format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) };
        return {
            tableToExcel: function (tableId, worksheetName) {
                var table = $(tableId),
                    ctx = { worksheet: worksheetName, table: table.html() },
                    href = uri + base64(format(template, ctx));
                return href;
            }
        };
    })
    couchPotato.configureApp(app);

    return app;

});