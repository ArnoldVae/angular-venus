/**
 * 账户信息修改轨迹查询
 */
define(['../module','config','constants'], function (moduleApp,config) {
    'use strict';
    function queryAccountInfoTrajectoryHandler($http,$$adapter,ApiPath) {
        var searchTrajector=function(keywords,options,pagination){
            console.log('账户信息修改轨迹查询');
            var _data={
                "payNo":keywords.payNo||'',
                "accountNo":keywords.accountNo||'',
                "accName":keywords.accName||'',
                "startChgDate":keywords.startChgDate||'',
                "endChgDate":keywords.endChgDate||'',
                "globalUserCode":keywords.globalUserCode||'',
                "powerSystemCode":keywords.powerSystemCode||'',
                "taskCode":keywords.taskCode||'',
                "pageNo":pagination.pageNo||'',
                "pageSize":pagination.pageSize||''
            };
            config.httpPackage.data = $$adapter.exports('searchTrajector', _data);
            config.httpPackage.url =  ApiPath.api.searchTrajectorDto;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('searchTrajector', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var queryTrajectorInfo=function(keywords,options,pagination){
            console.log('账户信息修改轨迹-详细信息');
            var _data={
                "payNo":keywords.payNo||'',
                "pageNo":pagination.pageNo||'',
                "pageSize":pagination.pageSize||''
            };
            config.httpPackage.data = $$adapter.exports('queryTrajectorInfo', _data);
            config.httpPackage.url =  ApiPath.api.queryTrajectorInfoDto;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('queryTrajectorInfo', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var accountInfoTrajectory = function () {
            //分页信息
            this.pagination = {
                totalItems: '',//总数
                pageIndex: '1',//当前页面
                pageSize: '15',//显示条数
                maxSize: '5',//最大页数
                numPages: '',//共有多少页
                previousText: '上一页',
                nextText: '下一页',
                firstText: '首页',
                lastText: '末页'
            };
            this.accountTrajectory = {
                "taskCode":"payment.unionpay.accounthisinfo"
            };
            this.accountTrajectoryList = [];
            this.moreFlag = false;
        };
        return {
            searchTrajector:function(keywords,options,pagination) {
                return searchTrajector(keywords,options,pagination)
            },
            queryTrajectorInfo:function(keywords,options,pagination) {
                return queryTrajectorInfo(keywords,options,pagination)
            },
            accountInfoTrajectory:function () {
                return new accountInfoTrajectory()
            }
        }
    }
    moduleApp.factory('$$queryAccountInfoTrajectory',['$http','$$adapter','ApiPath',queryAccountInfoTrajectoryHandler]);
});