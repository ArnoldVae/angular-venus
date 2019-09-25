/**
 * 车船税管理模块--生成结缴单
 */
define(['../module','config'], function (moduleApp,config) {
    'use strict';
    function payListHandler($http,$$adapter,ApiPath) {
        var PayList=function(){
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
                    "certinoStart":"",
                    "certinoEnd":"",
                    "centercode":"",
                    "comcode":"",
                    "certinoList":"",
                    "startdate":"",
                    "enddate":"",
                    "licenseno":"",
                    "identifynumber":"",
                    "globalUserCode":"",
                    "powerSystemCode":"",
                    "taskCode":'payment.unionpay.appliypayment'
                },
                "queryList":[],//业务单查询结果存储
                "_queryList":[]//存储勾选业务单数据
            }
        }
        var paySearCh=function(keyWords,options,pagination){
            console.log('生成结缴单查询');
            var _data={
                "certinoStart":keyWords.certinoStart||'',
                "certinoEnd":keyWords.certinoEnd||'',
                "centercode":keyWords.centercode||'',
                "comcode":keyWords.comcode||'',
                "certinoList":keyWords.certinoList||'',
                "startdate":keyWords.startdate||'',
                "earlierMonth":keyWords.earlierMonth||'',
                "laterMonth":keyWords.laterMonth||'',
                "enddate":keyWords.enddate||'',
                "licenseno":keyWords.licenseno||'',
                "attribute3":keyWords.attribute3||'',
                "identifynumber":keyWords.identifynumber||'',
                "globalUserCode":keyWords.globalUserCode||'',
                "powerSystemCode":keyWords.powerSystemCode||'',
                "taskCode":'payment.unionpay.appliypayment',
                "pageNo":pagination.pageIndex-1,
                "pageSize":pagination.pageSize||''
            };
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.payListQuery,
                headers: {},
                data: _data
            })
                .success(function (data) {
                    data = $$adapter.imports('paySearCh', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })
        };
        var payLsitSubmit=function(_data, options){
            console.log('生成结缴单提交');
            var data1 = $$adapter.exports('payLsitSubmit', _data);
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.payLsitSubmit,
                headers: {},
                data: data1
            })
                .success(function (data) {
                     data = $$adapter.imports('payLsitSubmit', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        //车船税导入
        var payListImport=function(_data,options){
            console.log('车船税导入上传');
            var data1 = $$adapter.exports('payListImport', _data);
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.payListImport,
                headers: {},
                data: data1
            })
                .success(function (data) {
                    data = $$adapter.imports('payListImport', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        return {
            PayList:function(){
                return new PayList()
            },
            payLsitSubmit:function(_data, options){
                return payLsitSubmit(_data, options);
            },
            paySearCh:function(keyWords,options,pagination){
                return paySearCh(keyWords,options,pagination);
            },
            payListImport:function(_data,options){
                return payListImport(_data,options)
            }
        }
    }
    moduleApp.factory('$$payList',['$http','$$adapter','ApiPath',payListHandler]);

});
