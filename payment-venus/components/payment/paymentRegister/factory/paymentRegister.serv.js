/**
 * 结算单支付申请模块
 */
define(['../module','config','constants'], function (moduleApp,config,constants) {
    'use strict';
    function paymentRegisterHandler($http,$$adapter,ApiPath) {
        console.log('结算单支付申请api...');
        angular.extend(constants.TARGET, constants.FINDERCONFIG.TARGET);
        var confirmSettlementFormData=function(_data, options){
            console.log('结算单支付申请确认');
            config.httpPackage.data = $$adapter.exports('confirmSettlementFormData', _data);
            config.httpPackage.url =  ApiPath.api.confirmSettlementFormDto;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('confirmSettlementFormData', data);
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
        var paymentRegister = function () {
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
            this.settlementFormCondition = {};
            this.settlementFormList = [];
            this.status = {
                "settlementFormCheckedAll":false,
                "moreFlag":false,
                "disabledAll":false//全选flag
            }
        };
        return {
            confirmSettlementFormData:function(_data,options,keywords) {
                return confirmSettlementFormData(_data, options,keywords)
            },
            searchVisaSerialNoList:function(_data,options) {
                return searchVisaSerialNoList(_data, options)
            },
            paymentRegister:function () {
              return new paymentRegister()
            },
            find: function (target, keywords, options, pagination) {
                if (target == constants.TARGET.SEARCHSETTLEMENTFORM) {
                    console.log('结算单支付申请查询');
                    var _data = {
                        "comCode": keywords.comCode || '',
                        "visaSerialNoStart": keywords.visaSerialNoStart || '',
                        "visaSerialNoEnd": keywords.visaSerialNoEnd || '',
                        "handler1Code": keywords.handler1Code || '',
                        "agentCode": keywords.agentCode || '',
                        "businessNature": keywords.businessNature || '',
                        "certiType": keywords.certiType || '',
                        "visaSerialNoList": keywords.visaSerialNoList || '',
                        "packCode": keywords.packCode || '',
                        "packDateStart": keywords.packDateStart || '',
                        "packDateEnd": keywords.packDateEnd || '',
                        "pageNo": pagination.pageNo || '',
                        "pageSize": pagination.pageSize || '',
                        "webUserCode":keywords.webUserCode||'',//当前登录人代码
                        "webComCode":keywords.webComCode||'',//当前登录机构代码
                        "webCenterCode":keywords.webCenterCode||'',//当前核算单位代码
                        "webTaskCode":'payment.paymanager.commission.applysettlement'//当前操作菜单代码
                    };
                    config.httpPackage.data = $$adapter.exports(constants.TARGET.SEARCHSETTLEMENTFORM, _data);
                    config.httpPackage.url =  ApiPath.api.searchSettlementFormDto;
                    $http(config.httpPackage)
                        .success(function (data) {
                            data = $$adapter.imports(constants.TARGET.SEARCHSETTLEMENTFORM, data);
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
    moduleApp.factory('$$paymentRegister',['$http','$$adapter','ApiPath',paymentRegisterHandler]);
});