/**
 * 付款单生成模块
 */
define(['../module','config','constants'], function (moduleApp,config,constants) {
    'use strict';
    function paymentGenerateHandler($http,$$adapter,ApiPath) {
        console.log('付款单生成模块api...');
        angular.extend(constants.TARGET, constants.FINDERCONFIG.TARGET);
        var searchMoreAdviceOfSettlement=function(_data, options){
            console.log('税金计算');
            config.httpPackage.data = $$adapter.exports('searchMoreAdviceOfSettlement', _data);
            config.httpPackage.url =  ApiPath.api.taxCalculation;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('searchMoreAdviceOfSettlement', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var confirmSettlement=function(_data, options){
            console.log('手续费结算单生成');
            config.httpPackage.data = $$adapter.exports('confirmSettlement', _data);
            config.httpPackage.url =  ApiPath.api.confirmSettlementDto;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('confirmSettlement', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var searchPolicyNoList=function(_data, options){
            console.log('保单详情查询');
            config.httpPackage.data = $$adapter.exports('searchPolicyNoList', _data);
            config.httpPackage.url =  ApiPath.api.queryPolicyNoList;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('searchPolicyNoList', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var excelImport=function(_data, options){
            console.log('手续费模板导入');
            config.httpPackage.data = $$adapter.exports('paymentExcelImport', _data);
            config.httpPackage.url =  ApiPath.api.paymentImportExcel;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('paymentExcelImport', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var paymentGenerate = function () {
          this.adviceOfSettlementCondition = {
              "currency1":"",
              "policyNoStart":"",
              "policyNoEnd":"",
              "commisionType":"1"
          };
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
          this.adviceOfSettlementList = [];
          this.status = {
              "moreFlag":false
          };
          this.importCondition={
            "localfileurl":""
          };
        };
        return {
            searchMoreAdviceOfSettlement:function(_data,options,keywords) {
                return searchMoreAdviceOfSettlement(_data, options,keywords)
            },
            confirmSettlement:function(_data,options,keywords) {
                return confirmSettlement(_data, options,keywords)
            },
            searchPolicyNoList:function(_data,options) {
                return searchPolicyNoList(_data, options)
            },
            excelImport:function(_data,options) {
                return excelImport(_data, options)
            },
            paymentGenerate:function () {
                return new paymentGenerate();
            },
            find: function (target, keywords, options, pagination) {
                if(target==constants.TARGET.SEARCHADVICEOFSETTLEMENT){
                    console.log('生成结算单查询');
                    var _data={
                        "policyNoStart":keywords.policyNoStart||'',
                        "policyNoEnd":keywords.policyNoEnd||'',
                        "policyNoList":keywords.policyNoList||'',
                        "comCode":keywords.comCode||'',
                        "businessCode":keywords.businessCode||'',
                        "agentCode":keywords.agentCode||'',
                        "contractNo":keywords.contractNo||'',
                        "businessNature":keywords.businessNature||'',
                        "currency1":keywords.currency1||'',
                        "appliName":keywords.appliName||'',
                        "insuredName":keywords.insuredName||'',
                        "riskCode":keywords.riskCode||'',
                        "statisticsDateStart":keywords.statisticsDateStart||'',
                        "statisticsDateEnd":keywords.statisticsDateEnd||'',
                        "pageNo":pagination.pageNo||'',
                        "pageSize":pagination.pageSize||'',
                        "webUserCode":keywords.webUserCode||'',//当前登录人代码
                        "webComCode":keywords.webComCode||'',//当前登录机构代码
                        "webCenterCode":keywords.webCenterCode||'',//当前核算单位代码
                        "webTaskCode":'payment.paymanager.commission.settlement'//当前操作菜单代码
                    };
                    config.httpPackage.data = $$adapter.exports(constants.TARGET.SEARCHADVICEOFSETTLEMENT, _data);
                    config.httpPackage.url =  ApiPath.api.searchAdviceOfSettlementListDto;
                    $http(config.httpPackage)
                        .success(function (data) {
                            data = $$adapter.imports(constants.TARGET.SEARCHADVICEOFSETTLEMENT, data);
                            if (options && options.success && typeof(options.success) == 'function')
                                options.success(data);
                        })
                        .error(function (e, code) {
                            if (options && options.error && typeof(options.error) == 'function')
                                options.error(e);
                        })
                }
            }
        }
    }
    moduleApp.factory('$$paymentGenerate',['$http','$$adapter','ApiPath',paymentGenerateHandler]);
});