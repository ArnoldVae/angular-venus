/**
 * 业务红冲信息核心逻辑
 */
define(['../module','config'], function (moduleApp,config) {
    'use strict';
    function redFlushBusinessInfHandler($http,$$adapter,ApiPath) {
        var searchRedFlushInf=function(keywords,options,pagination){
            var _data={
                "pageNo":pagination.pageNo||'',
                "pageSize":pagination.pageSize||'',
                "payType":keywords.payType||'',
                "centerCode":keywords.centerCode||'',
                "voucherNo":keywords.voucherNo||'',
                "realPayRefNo":keywords.realPayRefNo||'',
                "voucherDateStart":keywords.voucherDateStart||'',
                "voucherDateEnd":keywords.voucherDateEnd||'',
                "webUserCode":keywords.webUserCode||'',//当前登录人代码
                "webComCode":keywords.webComCode||'',//当前登录机构代码
                "webCenterCode":keywords.webCenterCode||'',//当前核算单位代码
                "webTaskCode":'payment.reverse.reverseTypeCerti',//当前操作菜单代码
                "reverseType":'1'//红冲类型
            };
            config.httpPackage.data= $$adapter.exports('searchRedFlushInf', _data);
            config.httpPackage.url= ApiPath.api.searchRedFlushInfDto;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('searchRedFlushInf', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })

        };
        var confirmRedInf=function(_data, options){
            config.httpPackage.data = $$adapter.exports('queryConfirmRedInf', _data);
            config.httpPackage.url =  ApiPath.api.confirmRedInfDto;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('queryConfirmRedInf', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var redFlushConfirm=function(_data, options){
            config.httpPackage.data = $$adapter.exports('redFlushConfirmInf', _data);
            config.httpPackage.url =  ApiPath.api.redFlushConfirmDto;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('redFlushConfirmInf', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var redFlushInfCondition = function () {
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
            this.businessInfo = {};
            this.confirmList = [];
        };
        return {
            searchRedFlushInf: function (keywords, options, pagination) {
                return searchRedFlushInf(keywords, options, pagination);
            },
            confirmRedInf:function(_data,options){
                return confirmRedInf(_data,options);
            },
            redFlushConfirm:function(_data,options){
            return redFlushConfirm(_data,options);
            },
            redFlushInfCondition:function(){
                return new redFlushInfCondition()
            }
        }
    }
    moduleApp.factory('$$redFlushBusinessInf',['$http','$$adapter','ApiPath',redFlushBusinessInfHandler]);
})