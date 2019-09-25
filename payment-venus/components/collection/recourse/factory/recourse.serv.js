/**
 * 追偿款处理模块
 */
define(['../module','config'], function (moduleApp,config) {
    'use strict';
    function recourseHandler($http,$$adapter,ApiPath) {
        console.log('追偿款处理模块api...');
        var searchRecourseList=function(keywords, options, pagination){
            console.log('追偿款处理查询');
            var _data={
                "appliName": keywords.appliName||'',
                "insuredName": keywords.insuredName||'',
                "packCode": keywords.packCode||'',
                "packDate": keywords.packDate||'',
                "pageNo":pagination.pageNo||'',
                "pageSize":pagination.pageSize||''
            };
            config.httpPackage.data = $$adapter.exports('searchRecourseList', _data);
            config.httpPackage.url =  ApiPath.api.searchRecourseListDto;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('searchRecourseList', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var confirmRecourse=function(_data, options){
            console.log('追偿款处理确认');
            config.httpPackage.data = $$adapter.exports('confirmRecourse', _data);
            config.httpPackage.url =  ApiPath.api.confirmRecourseDto;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('confirmRecourse', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        return {
            searchRecourseList:function(keywords,options,pagination) {
                return searchRecourseList(keywords, options,pagination)
            },
            confirmRecourse:function(_data,options,keywords) {
                return confirmRecourse(_data, options,keywords)
            }
        }
    }
    moduleApp.factory('$$recourse',['$http','$$adapter','ApiPath',recourseHandler]);
});