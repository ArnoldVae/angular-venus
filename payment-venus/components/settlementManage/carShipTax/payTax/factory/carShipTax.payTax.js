/**
 * Created by Administrator on 2017/5/8 0008.
 */
/**
 * 税务结缴Api
 */

define(['../module','config'], function (moduleApp,config) {
    'use strict';
    function payTaxHandler($http,$$adapter,ApiPath) {
        var PayTax=function(){
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
                "checkAll":false,//全选标志
                "queryConditions":{ //会计期间查询条件
                    "settlementNo":'',
                    "payrefnoStart":"",
                    "payrefnoEnd":"",
                    "payrefnoLists":"",
                    "currency":"",
                    "centercode":"",
                    "packagecode":"",
                    "earlierMonth":"",
                    "laterMonth":"",
                    "centerflag":"",
                    "flag":"1",
                    "payrefflag":"",
                },
                "queryList":[],//业务单查询结果存储
                "_queryList":[]//存储勾选业务单数据
            }
        }
        var taxDetail=function(_data,options){
            console.log('结算单详情');
            var _data={
                "payrefno":_data.payrefno||''
            };
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url:ApiPath.api.taxDetail,
                headers: {},
                data: _data
            })
                .success(function (data) {
                    data = $$adapter.imports('taxDetail', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })
        };
        var payTaxSearch=function(keywords,options,pagination){
            console.log('结算单查询');
            var _data={
                "payrefnoStart":keywords.payrefnoStart||'',
                "payrefnoEnd":keywords.payrefnoEnd||'',
                "payrefnoLists":keywords.payrefnoLists||'',
                "currency":keywords.currency||'',
                "centercode":keywords.centerCode||'',
                "packagecode":keywords.packagecode||'',
                "earlierMonth":keywords.earlierMonth||'',
                "laterMonth":keywords.laterMonth||'',
                "centerflag":keywords.centerflag||'',
                "globalUserCode":keywords.globalUserCode||'',
                "powerSystemCode":keywords.powerSystemCode||'',
                "taskCode":"payment.unionpay.appliypayment",
                "flag":keywords.flag||'',
                "pageNo":pagination.pageIndex-1,
                "pageSize":pagination.pageSize||''
            };
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.payTaxQuery,
                headers: {},
                data: _data
            })
                .success(function (data) {
                    data = $$adapter.imports('payTaxSearch', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })
        }
        var taxDelete=function(_data,options){
            console.log('结算单作废');
            var _data={
                "payrefno":_data.payrefNo||''
            }
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.taxDelete,
                headers: {},
                data: _data
            })
                .success(function (data) {
                     data = $$adapter.imports('taxDelete', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        return {
            PayTax:function(){
                return new PayTax()
            },
            payTaxSearch:function(keyWords,options,pagination){
                return payTaxSearch(keyWords,options,pagination);
            },
            taxDetail:function(_data,options){
                return taxDetail(_data,options);
            },
            taxDelete:function(_data,options){
                return taxDelete(_data,options);
            }
        }

    }
    moduleApp.factory('$$payTax',['$http','$$adapter','ApiPath',payTaxHandler]);

});
