/**
 * 收款模块-批量收款查询
 */
define(['../module','config'], function (moduleApp,config) {
    'use strict';
    function batchCollectionSearchHandler($http,$$adapter,ApiPath) {
        var collectionSearchs=function(keywords,options,pagination){
            var _data={
                "pageNo":pagination.pageNo||'',
                "pageSize":pagination.pageSize||'',
                "inputDate":keywords.startDate||'',//导入时间
                "endDate":keywords.endDate||'',//导入时间
                "numMin":keywords.numMin||'',//导入笔数
                "numMax":keywords.numMax||'',//导入笔数
                "earlierSumFee":keywords.amountMin||'',//导入金额
                "laterSumFee":keywords.amountMax||'',//导入金额
                "impDealRst":keywords.impDealRst||'',//处理结果
                "impFileNum":keywords.impFileNum||'',//导入文件名
                "operatorCode":keywords.operatorCode||"",//操作员代码
                "transactionNo":keywords.transactionNo||'',
                "webUserCode":keywords.webUserCode||'',
                "webComCode":keywords.webComCode||''

            };
            config.httpPackage.data= $$adapter.exports('collectionSearchs', _data);
            config.httpPackage.url= ApiPath.api.collectionSearchs;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('collectionSearchs', data);
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
                    pageIndex: '0',//当前页面
                    pageSize: '15',//显示条数
                    maxSize: '3',//最大页数
                    numPages: '',//共有多少页
                    previousText: config.pagination.previousText,
                    nextText: config.pagination.nextText,
                    firstText: config.pagination.firstText,
                    lastText: config.pagination.lastText
                },
                "moreFlag":false,//展示更多按钮
                "commonType":"0",
                "accountMenuFlag":'1',
                "claimsType":'0',
                //收保费查询条件
                "collectionSearchs":{
                    "impDealRst":'',//处理结果
                    "impFileNum":'',//导入文件名
                    "operatorCode":"",//操作员代码
                    "startDate":'',//导入时间
                    "endDate":'',//导入时间
                    "numMin":'',//导入笔数
                    "numMax":'',//导入笔数
                    "amountMin":'',//导入金额
                    "amountMax":''//导入金额
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
        //清单查看
        var showImptMassage=function(data, options, pagination){
            var _data={
                "pageNo":pagination.pageNo||'',
                "pageSize":pagination.pageSize||'',
                "impFileNum":data.impFileNum||"",
                "transactionNo":data.transactionNo||'',
                "sign":data.sign||''
            };
            config.httpPackage.data= $$adapter.exports('ShowImptMassage', _data);
            config.httpPackage.url= ApiPath.api.showImptMassage;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('ShowImptMassage', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        //删除单号
        var deleteMessage=function(data, options, pagination){
            var _data={
                "transactionNo":data
            };
            config.httpPackage.data= $$adapter.exports('deleteImp', _data);
            config.httpPackage.url= ApiPath.api.deleteImp;
            $http(config.httpPackage)
                .success(function (data) {
                     data = $$adapter.imports('deleteImp', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        return {
            collectionSearchs: function (keywords, options, pagination) {
                return collectionSearchs(keywords, options, pagination);
            },
            Account:function(){
                return new Account()
            },

            showImptMassage:function(data,options,pagination) {
                return showImptMassage(data, options,pagination)
            },
            deleteMessage:function(data,options,pagination) {
                return deleteMessage(data, options,pagination)
            }
        }
    }
    moduleApp.factory('$$batchCollectionSearch',['$http','$$adapter','ApiPath',batchCollectionSearchHandler]);

});
