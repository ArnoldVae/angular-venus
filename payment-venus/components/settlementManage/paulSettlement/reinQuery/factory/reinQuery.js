/**
 * 结算管理-再保结算
 */

define(['../module','config'], function (moduleApp,config) {
    'use strict';
    function reinQueryHandler($http,$$adapter,ApiPath) {
        console.log('再保结算Api');
        var reinQuery=function(){
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
                    "settleNo1":'',
                    "settleNo2":'',
                    "settleNoList":'',
                    "reinsCode":'',
                    "currency":'',
                    "operateDateStart":'',
                    "operateDateEnd":'',
                },
                "queryList":[],//业务单查询结果存储
                "_queryList":[]//存储勾选业务单数据
            }
        }
        /**
         * 再保结算单查询
         */
        var reinSearch=function(keywords,options,pagination){
            console.log('再保结算单查询');
            var _data={
                "settleNo1":keywords.settleNo1||'',
                "settleNo2":keywords.settleNo2||'',
                "settleNoList":keywords.settleNoList||'',
                "reinsCode":keywords.reinsCode||'',
                "currency":keywords.currency||'',
                "operateDateStart":keywords.operateDateStart||'',
                "operateDateEnd":keywords.operateDateEnd||'',
                "pageNo":pagination.pageIndex-1,
                "pageSize":pagination.pageSize||''
            };
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.reinSearch,
                headers: {},
                data: _data
            })
                .success(function (data) {
                    data = $$adapter.imports('reinSearch', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })

        };
        /**
         *再保结算单详情
         */
        var  reinQueryDetail=function(_data,options){
            console.log('再保结算单详情');
            var _data={
                "settleNo":_data.settleNo||''
            };
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.reinQueryDetail,
                headers: {},
                data: _data
            })
                .success(function (data) {
                    data = $$adapter.imports('reinQueryDetail', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })
        };
        /**
         * 再报查询
         */
        var reinDataQuery=function(_data,options){
            console.log('再保查询');
            var _data={
                "settleNo":_data.settleNo||'',
                "comCode":"04",
                "globalUserCode":"222"
            };
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.reinDataQuery,
                headers: {},
                data: _data
            })
                .success(function (data) {
                    data = $$adapter.imports('reinDataQuery', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })
        };
        /**
         * 再报确认保存
         */
        var settlementSave=function(_data,options){
            console.log('再保确认保存');
            var _data={
                "settleNo":_data.settleNo||'',
                "currency2": _data.currency2||'',
                "payRefFee": _data.payRefFee||'',
                "payType": _data.payType||'',
                "payWay": _data.payWay||'',
                "accountNo":_data.accountNo||'',
                "confirmCurrency": _data.confirmCurrency||'',
                "sumPayRefFee": _data.sumPayRefFee||'',
                "globalUserCode":_data.globalUserCode||''
            };
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.settlementSave,
                headers: {},
                data: _data
            })
                .success(function (data) {
                    data = $$adapter.imports('settlementSave', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })
        };
        //收付方式
        var paymentWay=function(_data,options){
            console.log('收付方式');
            var _data={
                "exceptCenterCode":"15100003",
                "permitPayType": "33",
                "payWay": "9"
            }
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.payWayQuery,
                headers: {},
                data: _data
            })
                .success(function (data) {
                    data = $$adapter.imports('payWayQuery', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        //银行信息
        var confirmBank=function(_data, options){
            console.log('收保费银行信息');
            var _data={
                "centerCode":"15100003",
                "currency":"CNY"
            }
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.confirmBank,
                headers: {},
                data: _data
            })
                .success(function (data) {
                    data = $$adapter.imports('confirmBank', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        }
        //收付方式查银行账号
        var queryNoBillBankAcount=function(_data,options){
            var _data={
                "centerCode":_data.centerCode||'',
                "webUserCode":_data.webUserCode||'',
                "currency":_data.currency||''
            };
            config.httpPackage.data= $$adapter.exports('queryBankAcount', _data);
            config.httpPackage.url= ApiPath.api.queryNoBillBankAcount;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('queryBankAcount', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })
        };
        return {
            reinQuery:function(){
                return new reinQuery();
            },
            reinSearch:function(keywords,options,pagination){
                return  reinSearch(keywords,options,pagination);
            },
            reinQueryDetail:function(_data,options){
                return  reinQueryDetail(_data,options);
            },
            reinDataQuery:function(_data,options){
                return reinDataQuery(_data,options);
            },
            settlementSave:function(_data,options){
                return settlementSave(_data,options);
            },
            confirmBank:function(_data, options){
                return confirmBank(_data, options)
            },
            paymentWay:function(_data,options){
                return paymentWay(_data, options);
            },
            queryNoBillBankAcount:function (data,options) {
                return queryNoBillBankAcount(data, options);
            }

        }

    }
    moduleApp.factory('$$reinQuery',['$http','$$adapter','ApiPath',reinQueryHandler]);

});