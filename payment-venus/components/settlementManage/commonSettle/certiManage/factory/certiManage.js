/**
 * Created by Administrator on 2017/9/20 0020.
 */
/**
 * 联共保Api
 */
define(['../module','config'], function (moduleApp,config) {
    'use strict';
    function certiManageHandler($http,$$adapter, ApiPath) {
        var Common=function(){
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
                    "certiNo":"",
                    "comCode":"",
                    "certiNoStr":"",
                    "handler1Name":"",
                    "appliName":"",
                    "riskCode":"",
                    "insuredName":"",
                    "agentName":"",
                    "currency1":"",
                    "contractNo":"",
                    "coinsName":"",
                    "policyNo":"",
                    "businessNature":"",
                    "centerCode":"",
                    "startDate":"",
                    "endDate":"",
                    "startUnderwriteDate":"",
                    "endUnderwriteDate":"",
                },
                "queryList":[],//业务单查询结果存储
                "_queryList":[]//存储勾选业务单数据


            }
        }
        /**
         *税务结缴查询
         */
        var commonSearch=function(keywords,options,pagination){
            console.log('联共保业务查询');
            var _data={
                "certiNo":keywords.certiNo||'',
                "comCode":keywords.comCode||'',
                "certiNoStr":keywords.certiNoStr||'',
                "handler1Name":keywords.handler1Name||'',
                "appliName":keywords.appliName||'',
                "riskCode":keywords.riskCode||'',
                "insuredName":keywords.insuredname||'',
                "agentName":keywords.agentName||'',
                "currency1":keywords.currency1||'',
                "contractNo":keywords.contractNo||'',
                "coinsName":keywords.coinsName||'',
                "policyNo":keywords.policyNo||'',
                "businessNature":keywords.businessNature||'',
                "centerCode":keywords.centerCode||'',
                "startDate":keywords.startDate||'',
                "endDate":keywords.endDate||'',
                "startUnderwriteDate":keywords.startUnderwriteDate||'',
                "endUnderwriteDate":keywords.endUnderwriteDate||'',
                "pageNo":pagination.pageIndex-1,
                "pageSize":pagination.pageSize||''
            };
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.commonQuery,
                headers: {},
                data: _data
            })
                .success(function (data) {
                    data = $$adapter.imports('commonQuery', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })
        };

        var commSubmit=function(_data,options){
            console.log('联共保业务保存');

            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.commSubmit,
                headers: {},
                data: _data
            })
                .success(function (data) {
                    data = $$adapter.imports('commSubmit', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })
        }

        return {
            Common:function(){
                return new Common()
            },
            commonSearch:function(keywords,options,pagination){
                return commonSearch(keywords,options,pagination);
            },
            commSubmit:function(_data,options){
                return commSubmit(_data,options);
            }
        }

    }
    moduleApp.factory('$$certiManage',['$http','$$adapter','ApiPath',certiManageHandler]);

});
