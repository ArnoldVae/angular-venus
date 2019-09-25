/**
 * 银行代发模板导出模块
 */
define(['../module','config'], function (moduleApp,config) {
    'use strict';
    function bankTemplatesExportHandler($http,$$adapter,ApiPath) {
        console.log('银行代发模板导出模块api...');
        var findBankTemplates=function(keywords,options,pagination){
            console.log('银行代发模板导出查询');
            var _data={
                "contractNo": keywords.contractNo||'',
                "payFlag": keywords.payFlag||'',
                "comCode": keywords.comCode||'',
                "handler1Code": keywords.handler1Code||'',
                "agentCode": keywords.agentCode||'',
                "businessNature": keywords.businessNature||'',
                "startDate": keywords.startDate||'',
                "packDate": keywords.packDate||'',
                "settleApplyCode": keywords.settleApplyCode||'',
                "pageNo":pagination.pageNo||'',
                "pageSize":pagination.pageSize||'',
                "webUserCode":keywords.webUserCode||'',//当前登录人代码
                "webComCode":keywords.webComCode||'',//当前登录机构代码
                "webCenterCode":keywords.webCenterCode||'',//当前核算单位代码
                "webTaskCode":'payment.paymanager.commission.bankexport'//当前操作菜单代码
            };
            config.httpPackage.data = $$adapter.exports('findBankTemplates', _data);
            config.httpPackage.url =  ApiPath.api.findBankTemplatesDto;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('findBankTemplates', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var downLoadTable=function(_data, options){
            console.log('银行代发模板导出');
            config.httpPackage.data = $$adapter.exports('downLoadTable', _data);
            config.httpPackage.url =  ApiPath.api.downLoadTableDto;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('downLoadTable', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var bankTemplatesExport = function () {
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
            this.reparationsCondition = {
                "contractNo":""
            };
            this.showButton = false;
            this.planFeeNum = "";
            this.taxDisFeeNum = "";
            this.contractNo = "";//结算单批次号
            this.moreFlag = false;
        };
        return {
            findBankTemplates:function(keywords,options,pagination) {
                return findBankTemplates(keywords,options,pagination)
            },
            downLoadTable:function(_data,options,keywords) {
                return downLoadTable(_data,options,keywords)
            },
            bankTemplatesExport:function () {
                return new bankTemplatesExport()
            }
        }
    }
    moduleApp.factory('$$bankTemplatesExport',['$http','$$adapter','ApiPath',bankTemplatesExportHandler]);
});