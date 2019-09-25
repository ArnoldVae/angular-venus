/**
 * 结算管理-再保结算
 */

define(['../module','config'], function (moduleApp,config) {
    'use strict';
    function reinCreateHandler($http,$$adapter,ApiPath) {
        console.log('再保结算Api');
        var reinCreate=function(){
            this.infoToView={
                "pagination":{
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
                "mareFlag":false,//展示更多按钮
                "checkedAll":false,//全选标志
                "queryConditions":{ //会计期间查询条件
                    "accNo":'',
                    "comCode":'',
                    "payaccNo":'',
                    "reinsCode":'',
                    "reinsName":'',
                    "treatyNo":'',
                    "sectionNo":'',
                    "accPeriod":'',
                    "clossCode":'',
                    "riskCode":'',
                    "uwYear":'',
                    "accDate":'',
                    "currency1":'',
                    "accType":'',
                    "optType":'',
                    "settleStatus":''
                },
                "queryList":[],//业务单查询结果存储
                "_queryList":[]//存储勾选业务单数据
            }

        }
        /**
         * 生成再保结算单查询
         */
        var reinCreateQuery=function(keywords,options,pagination){
            console.log('生成再保结算单查询');
            var _data={
                "accNo":keywords.accNo||'',
                "comCode":keywords.comCode||'',
                "payaccNo":keywords.payaccNo||'',
                "reinsCode":keywords.reinsCode||'',
                "reinsName":keywords.reinsName||'',
                "treatyNo":keywords.treatyNo||'',
                "sectionNo":keywords.sectionNo||'',
                "accPeriod":keywords.accPeriod||'',
                "clossCode":keywords.clossCode||'',
                "riskCode":keywords.riskCode||'',
                "uwYear":keywords.uwYear||'',
                "accDate":keywords.accDate||'',
                "currency1":keywords.currency1||'',
                "accType":keywords.accType||'',
                "optType":keywords.optType||'',
                "settleStatus":keywords.settleStatus||'',
                "globalUserCode":"",
                "powerSystemCode":"",
                "pageNo":pagination.pageIndex-1,
                "pageSize":pagination.pageSize||''
            }
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.reinCreateQuery,
                headers: {},
                data: _data
            })
                .success(function (data) {
                    data = $$adapter.imports('reinCreateQuery', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })

        };
        /**
         * 生成再保结算单详情
         */
        var reinQueryData=function(_data,options){
            console.log('生成再保结算单详情');
            var _data={
                "accNo":_data.accNo||'',
                "payAccNo":_data.payAccNo||'',
                "payNo":_data.payNo||'',
            };
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.reinQueryData,
                headers: {},
                data: _data
            })
                .success(function (data) {
                    data = $$adapter.imports('reinQueryData', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })
        };
        /**
         * 再保结付
         */
        var reinPay=function(_data,options){
            console.log('再保结付确认信息');
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.reinPay,
                headers: {},
                data: _data
            })
                .success(function (data) {
                    data = $$adapter.imports('reinPay', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })
        };
        /**
         * 再保确认
         */
        var reinConfirm=function(_data,options){
            console.log('再保信息确认');
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.reinConfirm,
                headers: {},
                data: _data
            })
                .success(function (data) {
                    data = $$adapter.imports('reinConfirm', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })
        }
        return {
            reinCreateQuery:function(keywords,options,pagination){
                return  reinCreateQuery(keywords,options,pagination);
            },
            reinQueryData:function(_data,options){
                return  reinQueryData(_data,options);
            },
            reinPay:function(_data,options){
                return reinPay(_data,options);
            },
            reinConfirm:function(_data,options){
                return reinConfirm(_data,options)
            },
            reinCreate:function(){
                return  new reinCreate();
            }

        }

    }
    moduleApp.factory('$$reinCreate',['$http','$$adapter','ApiPath',reinCreateHandler]);

});