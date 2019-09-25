/**
 * Created by DELL on 2017/9/26.
 */
/**
 * 手续费进项发票核心逻辑
 */
define(['../module','config'], function (moduleApp,config) {
    'use strict';
    function dailySetUpHandler($http,$$adapter,ApiPath) {
        var collectionSearchs=function(keywords,options,pagination){
            var _data={
                "pageNo":pagination.pageNo||'',
                "pageSize":pagination.pageSize||'',
                "unitType":keywords.unitType||'',
                "comcode":keywords.comcode||'',
                "unitcode":keywords.unitcode||'',
                "validStatus":keywords.validStatus||''

            };
            config.httpPackage.data= $$adapter.exports('queryAutoDailyPSet', _data);
            config.httpPackage.url= ApiPath.api.queryAutoDailyPSet;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('queryAutoDailyPSet', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })

        };
        var Account=function(){
            this.infoToView={
                "checkStatus":{
                    "checkedAccountAll":false,
                    "checkedClaimAll":false,
                    "checkedCommonAll":false,
                    "checkedChecksAll":false
                },
                "pagination" : {
                    totalItems: '',//总数
                    pageIndex: '1',//当前页面
                    pageSize: '15',//显示条数
                    maxSize: '3',//最大页数
                    numPages: '',//共有多少页
                    previousText: config.pagination.previousText,
                    nextText: config.pagination.nextText,
                    firstText: config.pagination.firstText,
                    lastText: config.pagination.lastText
                },
                "addFlag":false,
                "commonType":"0",
                "accountMenuFlag":'1',
                "claimsType":'0',
                //查询条件
                "dailyQuery":{
                    "unitType":'',
                    "comcode":'',
                    "unitcode":"",
                    "validStatus":''
                },
                "newdailyQuery":{
                    "webUserCode":'',
                    "comCode":'',
                    "webCenterComCode":"",
                    "claimBatchNo":'',
                    "serialNo":''
                },
                //弹框表格绑定
                "accountRecList":[
                    {
                        "currenCy2":'CNY',
                        "payWay":'01',
                        "accountNo":'',
                        "payrefFee":'',
                        "itemCode":"",
                        "centerCode":'11999000'
                    }
                ],
                //弹框表格绑定初始化
                "accountRecInitList":[
                    {
                        "currenCy2":'CNY',
                        "payWay":'01',
                        "accountNo":'',
                        "itemCode":"",
                        "payrefFee":'',
                        "centerCode":'11999000'
                    }
                ]
            }
        };
        var payLossInfo=function(keywords,options,pagination){
            var _data={
                "pageNo":pagination.pageNo||'',
                "pageSize":pagination.pageSize||'',
                "unitType":keywords.webUserCode||'',
                "comCode":keywords.comCode||'',
                "unitCode":keywords.webCenterComCode||'',
                "dailyCloseTime":'2017/08/07'+' '+keywords.claimBatchNo||'',
                "validStatus":keywords.serialNo||'',
            };
            config.httpPackage.data= $$adapter.exports('save', _data);
            config.httpPackage.url= ApiPath.api.save;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('save', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })

        };
        var immAutoDaily=function(keywords,options,pagination){
            var _data=keywords;
            config.httpPackage.data= $$adapter.exports('immAutoDaily', _data);
            config.httpPackage.url= ApiPath.api.immAutoDaily;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('immAutoDaily', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })

        };
        return {
            collectionSearchs: function (keywords, options, pagination) {
                return collectionSearchs(keywords, options, pagination);
            },
            Account:function(){
                return new Account()
            },
            payLossInfo: function (keywords,options,pagination) {
                return payLossInfo(keywords,options,pagination);
            },
            immAutoDaily: function (keywords,options,pagination) {
                return immAutoDaily(keywords,options,pagination);
            },
        }
    }
    moduleApp.factory('$$dailySetUpInvoice',['$http','$$adapter','ApiPath',dailySetUpHandler]);
})