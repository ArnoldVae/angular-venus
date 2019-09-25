/**
 * Created by DELL on 2017/9/26.
 */
/**
 * 代收代付撤销
 */
define(['../module','config','constants'], function (moduleApp,config,constants) {
    'use strict';
    function collectingApplicationHandler($http,$$adapter,ApiPath) {
        var Account=function(){
            this.info={
                "transactionNo":'',
                "visaSerialNo":'',
                "certiType":'01',
                "entrustTimeFrom":'',
                "entrustTimeTo":''
            };
            this.status={
                "moreFlag":false
            };
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
        };
        //查询
        var searchRevocation=function(keywords,options,pagination){
            var _data={
                "visaSerialNo":keywords.visaSerialNo||'',
                "transactionNo":keywords.transactionNo||'',
                "entrustTimeFrom":keywords.entrustTimeFrom||'',
                "entrustTimeTo":keywords.entrustTimeTo||'',
                "certiType":keywords.certiType||'',
                "webComCode":keywords.webComCode||'',
                "webCenterCode":keywords.webCenterCode||'',
                "webTaskCode":keywords.webTaskCode||'',
                "webUserCode":keywords.webUserCode||'',
                "pageIndex":pagination.pageNo,
                "pageSize":pagination.pageSize||''
            };
            config.httpPackage.data= $$adapter.exports(constants.TARGET.ENTRUSTCANCELQUERY, _data);
            config.httpPackage.url= ApiPath.api.entrustCancelQuery;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports(constants.TARGET.ENTRUSTCANCELQUERY, data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })

        };
        //撤销
        var deleteMessage=function(_data, options){
            config.httpPackage.data= $$adapter.exports(constants.TARGET.ENTRUSTCANCELCONFIRM, _data);
            config.httpPackage.url= ApiPath.api.entrustCancelConfirm;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports(constants.TARGET.ENTRUSTCANCELCONFIRM, data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        return {
            Account:function(){
                return new Account()
            },
            searchRevocation: function (keywords, options, pagination) {
                return searchRevocation(keywords, options, pagination);
            },
            deleteMessage:function(_data,options) {
                return deleteMessage(_data, options)
            }
        }
    }
    moduleApp.factory('$$collectingRevocation',['$http','$$adapter','ApiPath',collectingApplicationHandler]);
});