/**
 * 付手续费
 */
define(['../module','config'], function (moduleApp,config) {
    'use strict';
    function payPoundageHandler($http,$$adapter,ApiPath) {
        console.log('付手续费api');
        var searchPoundageList=function(keywords, options, pagination){
            console.log('付手续费查询');
            var _data={
                "visaSerialNoStart": keywords.visaSerialNoStart||'',
                "visaSerialNoEnd": keywords.visaSerialNoEnd||'',
                "visaSerialNoList": keywords.visaSerialNoList,
                "comCode": keywords.comCode||'',
                "handler1Code": keywords.handler1Code||'',
                "agentCode": keywords.agentCode||'',
                "commisionType": keywords.commisionType,
                "currency2": keywords.currency2||'',
                "businessNature": keywords.businessNature||'',
                "appliCode": keywords.appliCode||'',
                "insuredCode": keywords.insuredCode,
                "packCode": keywords.packCode||'',
                "packDate": keywords.packDate,
                "contractNo": keywords.contractNo||'',
                "pageNo":pagination.pageNo||'',
                "pageSize":pagination.pageSize||'',
                "webUserCode":keywords.webUserCode||'',//当前登录人代码
                "webComCode":keywords.webComCode||'',//当前登录机构代码
                "webCenterCode":keywords.webCenterCode||'',//当前核算单位代码
                "webTaskCode":'payment.paymanager.paycommission'//当前操作菜单代码
            };
            config.httpPackage.data = $$adapter.exports('searchPoundageList', _data);
            config.httpPackage.url =  ApiPath.api.searchPoundageListDto;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('searchPoundageList', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var searchVisaSerialNoList=function(_data, options){
            console.log('结算单详情查询');
            config.httpPackage.data = $$adapter.exports('searchVisaSerialNoList', _data);
            config.httpPackage.url =  ApiPath.api.queryVisaSerialNoList;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('searchVisaSerialNoList', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        //收付方式查银行账号
        var queryNoBillBankAcount=function(_data,options){
            var _data={
                "centerCode":_data.centerCode||'',
                "webUserCode":_data.webUserCode||'',
                "currency":_data.currency||''
            };
            config.httpPackage.data= $$adapter.exports('queryBankAcount', _data);
            config.httpPackage.url= ApiPath.api.confirmBank;
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
        var confirmPoundageInf=function(_data, options){
            console.log('付手续费-确认');
            config.httpPackage.data = $$adapter.exports('confirmPoundageInf', _data);
            config.httpPackage.url =  ApiPath.api.confirmPoundageDto;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('confirmPoundageInf', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var payPoundage =function () {
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
            this.payPoundageCondition ={
                "contractNo":"",
                "visaSerialNoStart":"",
                "visaSerialNoEnd":"",
                "visaSerialNoList":"",
                "commisionType":"0"
            };
            this.status = {
                "allChecked":false,
                "moreFlag":false,
                "disabledAll":false
            };
            //查询列表
            this.payPoundageList = [];
            //记录勾选数据
            this.selectedList = [];
        };
        return {
            searchPoundageList:function(keywords,options,pagination) {
                return searchPoundageList(keywords, options,pagination)
            },
            searchVisaSerialNoList:function(_data,options) {
                return searchVisaSerialNoList(_data, options)
            },
            queryNoBillBankAcount:function(_data,options){
                return queryNoBillBankAcount(_data,options);
            },
            confirmPoundageInf:function(_data,options){
            return confirmPoundageInf(_data,options);
            },
            payPoundage:function () {
                return new payPoundage();
            }
        }
    }
    moduleApp.factory('$$payPoundage',['$http','$$adapter','ApiPath',payPoundageHandler]);
});