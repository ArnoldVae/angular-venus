/**
 * Created by Administrator on 2017/9/20 0020.
 */
/**
 * 联共保Api
 */
define(['../module','config'], function (moduleApp,config) {
    'use strict';
    function invoiceInformationQuery($http,$$adapter, ApiPath) {
        /**
         *开票查询
         */
        var invoiceInfoQuery=function(keywords,options,pagination){
            var _data={
                "invoiceCode":keywords.invoiceCode||'',//发票代码
                "printApplyCode":keywords.printApplyCode||'',//开票申请人
                "startvisaSerialNo":keywords.startvisaSerialNo||'',//起始发票号码
                "endvisaSerialNo":keywords.endvisaSerialNo||'',//终止发票号码
                "certiNo":keywords.certiNo||'',//保/批单号
                "statusSub":keywords.statusSub||'',//发票状态
                "applyDateStart":keywords.applyDateStart||'',//开票申请起期
                "applyDateEnd":keywords.applyDateEnd||'',//开票申请止期
                "pageNo":pagination.pageIndex-1,//当前页码
                "pageSize":pagination.pageSize||'',//页码总数
                "webUserCode":keywords.webUserCode,//配置权限
                "webComCode":keywords.webComCode,
                "webCenterCode":keywords.webCenterCode,
                "webTaskCode":keywords.webTaskCode
            };
            console.log(_data);
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.invoiceInfoSelect,
                headers: {},
                data: _data
            })
                .success(function (data) {
                    data = $$adapter.imports('invoiceInfoSelect', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })
        };
        /**
         *开票明细
         */
        var invoiceInfoDetail=function(keywords,options){
            var _data={
            };
            console.log(_data);
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.invoiceInfoDetailQuery,
                headers: {},
                data: _data
            })
                .success(function (data) {
                    data = $$adapter.imports('invoiceInfoDetailQuery', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })
        };
        /**
         * 实例化对象
         */
        var invoiceInfoUser=function () {
            this.infos={
                "pagination": {
                    totalItems:'',//总数
                    pageIndex:'1',//当前页面
                    pageSize:'15',//显示条数
                    maxSize:'3',//最大页数
                    numPages:'',//共有多少页
                    previousText: config.pagination.previousText,
                    nextText: config.pagination.nextText,
                    firstText: config.pagination.firstText,
                    lastText: config.pagination.lastText
                },
                "invoiceQueryLists":[],
                "invoiceQuery":{}
            };
        }
        return {
            invoiceInfoQuery:function(keywords,options,pagination){
                return invoiceInfoQuery(keywords,options,pagination);
            },
            invoiceInfoDetail:function(keywords,options){
                return invoiceInfoDetail(keywords,options);
            },
            invoiceInfoUser:function(){
                return new invoiceInfoUser();
            }
        }
    }
    moduleApp.factory('$$invoiceInformationQuery',['$http','$$adapter','ApiPath',invoiceInformationQuery]);

});