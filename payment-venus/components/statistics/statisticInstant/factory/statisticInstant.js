/**
 * 查询统计-实时查询api
 */

define(['../module','config'], function (moduleApp,config) {
    'use strict';
    function statisticInstantHandler($http,$$adapter,ApiPath) {

        console.log('实时查询Api');
        /**
         * 实时查询Api
         * @constructor
         */
        var StatisticInstant=function(){
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
                "checkAll":false,//全选标志
                "mareFlag":false,//展示更多按钮
                "instantMenu":"1",//菜单显示
                "itemList":[],
                "_itemList":[],
                "queryConditions":{ //凭证查询条件
                    "queryType":"1",
                    "businessType":"1",
                    "typeKind":"1",
                    "No":"",
                    "certiNo":"",
                    "centerCode":"",
                    "accVoucherNo":"",
                    "realPayRefNo":"",
                    "yearMonth":"",
                    "itemCode":[],
                    "riskCode":"",
                    "comCode":'',
                    "shareHolderFlag":'',
                },
                "queryList":[],//凭证查询结果存储
            }
        };
        //通过业务号查询
        var voucherQuery=function (keywords,options,pagination) {
            console.log('凭证查询');
            var _data={
                "queryType":keywords.queryType||'',
                "businessType":keywords.businessType||'',
                "typeKind":keywords.typeKind||'',
                "no":keywords.No||'',
                "centerCode":keywords.centerCode||'',
                "accVoucherNo":keywords.accVoucherNo||'',
                "realPayRefNo":keywords.realPayRefNo||'',
                "yearMonth":keywords.yearMonth||'',//会计月度：
                "certificateStartDate":keywords.certificateStartDate||'',//凭证日期起期：
                "certificateEndDate":keywords.certificateEndDate||'',//凭证日期止期：
                "certificateNoList":keywords.certificateNoList||'',//临时凭证号列表：
                "newVoucherNo":keywords.newVoucherNo||'',
                "itemCode":keywords._itemCode||[],
                "riskCode":keywords.riskCode||'',
                "comCode":keywords.comCode||'',
                "shareHolderFlag":keywords.shareHolderFlag||'',
                "pageNo":pagination.pageNo||'',//当前页码
                "pageSize":pagination.pageSize||'',//页码总数
                "webUserCode":keywords.webUserCode||'',
                "webComCode":keywords.webComCode||'',
                "webCenterCode":keywords.webCenterCode||'',
                "webTaskCode":keywords.webTaskCode||'',
            };
            console.log(_data);
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.voucherQuery,
                headers: {},
                data: _data
            })
                .success(function (data) {
                    data = $$adapter.imports('voucherQuery', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })
            
        }
        //业务信息
        var searchBus=function (_data,options) {
            console.log('凭证查询');
            var _data={
                "no":_data.certificateNo||'',
                "businessType":_data.certificateType||''
            };
            console.log(_data);
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.queryCertinoInfo,
                headers: {},
                data: _data
            })
                .success(function (data) {
                    data = $$adapter.imports('queryCertinoInfo', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })
        };
        //业务信息
        var titleItem=function (options) {
            console.log('科目查询');
            var _data={};
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.accountGroup,
                headers: {},
                data: _data
            })
                .success(function (data) {
                    data = $$adapter.imports('accountGroup', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })
        };
        /**
         * 查询业务信息
         * @param _data
         * @param options
         */
        var payLossInfo=function(_data,options){
            var _data=_data;
            config.httpPackage.data= $$adapter.exports('queryCheckCondition', _data);
            config.httpPackage.url= ApiPath.api.queryCheckCondition;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('queryCheckCondition', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })
        };
        return {
            StatisticInstant:function(){
                return new StatisticInstant()
            },
            voucherSearch:function (keywords,options,pagination) {
                return voucherQuery(keywords,options,pagination)
            },
            payLossInfo:function (_data,options) {
                return payLossInfo(_data,options)
            },
            searchBus:function (_data,options) {
                return searchBus(_data,options)
            },
            titleItem:function (options) {
                return titleItem(options)
            }
        }

    }
    moduleApp.factory('$$statisticInstant',['$http','$$adapter','ApiPath',statisticInstantHandler]);

});
