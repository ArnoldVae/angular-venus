/**
 * 银行信息补录核心逻辑
 */
define(['../module','config','constants'], function (moduleApp,config,constants) {
    'use strict';
    function bankInfoAdditionalHandler($http,$$adapter,ApiPath) {
        angular.extend(constants.TARGET, constants.FINDERCONFIG.TARGET);
        var submitSupplementData=function(_data, options, keywords){
            console.log('银行信息补录提交');
            config.httpPackage.data = $$adapter.exports('submitSupplementData', _data);
            config.httpPackage.url =  ApiPath.api.submitSupplementDto;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('submitSupplementData', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        //导入目标银行账号-币别
        var queryBankAcount=function(_data,options,pagination){
            var _data={
                "centerCode":_data||'',
            };
            config.httpPackage.data= $$adapter.exports('queryBankAcount', _data);
            config.httpPackage.url= ApiPath.api.queryBankAcount;
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
        var bankInfoAdditional=function(){
            // 分页信息
            this.pagination={
                totalItems:'',//总数
                pageIndex:'1',//当前页面
                pageSize:'15',//显示条数
                maxSize:'5',//最大页数
                numPages:'',//共有多少页
                previousText: config.pagination.previousText,
                nextText: config.pagination.nextText,
                firstText: config.pagination.firstText,
                lastText: config.pagination.lastText
            };
            // 状态
            this.status={
                "moreFlag":false,//展开高级查询flag
                "CheckedAll":false//全选flag
            };
            this.supplementList=[];// 列表数据
            //查询条件
            this.supplementCondition={};
        };
        return {
            submitSupplementData:function(_data, options, keywords){
                return submitSupplementData(_data, options, keywords);
            },
            queryBankAcount: function (_data,options,pagination) {
                return queryBankAcount(_data,options,pagination);
            },
            bankInfoAdditional:function(){
                return new bankInfoAdditional();
            },
            find: function (target, keywords, options, pagination) {
                if(target==constants.TARGET.SEARCHSUPPLEMENT){
                    console.log('银行流水补录查询');
                    var _data={
                        "comCode":keywords.comCode||'',
                        "unifySerialNum":keywords.unifySerialNum||'',
                        "serialNum":keywords.serialNum||'',
                        "bankAccount":keywords.bankAccount||'',
                        "paymentName":keywords.paymentName||'',
                        "currency":keywords.currency||'',
                        "amount":keywords.amount||'',
                        "amountEnd":keywords.amountEnd||'',
                        "claimStatus":keywords.claimStatus||'',
                        "transDate":keywords.transDate||'',
                        "transDateEnd":keywords.transDateEnd||'',
                        "globalUserCode":keywords.globalUserCode||'',
                        "pageNo":pagination.pageNo||'',
                        "pageSize":pagination.pageSize||''
                    };
                    config.httpPackage.data = $$adapter.exports(constants.TARGET.SEARCHSUPPLEMENT, _data);
                    config.httpPackage.url =  ApiPath.api.searchSupplementDto;
                    $http(config.httpPackage)
                        .success(function (data) {
                            data = $$adapter.imports(constants.TARGET.SEARCHSUPPLEMENT, data);
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
    moduleApp.factory('$$bankInfoAdditional',['$http','$$adapter','ApiPath',bankInfoAdditionalHandler]);

});
