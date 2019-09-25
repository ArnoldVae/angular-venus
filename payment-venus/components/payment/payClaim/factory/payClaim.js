/**
 *付赔款api
 */

define(['../module','config','constants'], function (moduleApp,config,constants) {
    'use strict';
    function payClaimHandler($http,$$adapter,ApiPath) {
        var Claim=function(){
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
                "checkedClaimAll":false,//全选flag
                "checkedClaimAll_disabled":false,//全选flag
                "moreFlag":false,//展开高级查询flag
                "currency1":"",//不同比别flag
                "disabled":true//复选框disabled flag
            };
            this.selectedPay=0;//勾选数据总和
            this.checkedRecords=[];// 勾选数据备份
            //理赔收款查询条件
            this.claimQuery={
                "compensateNo":"",
                "compensateNoList":"",
                "policyNo":"",
                "riskCode":"",
                "currency1":"",
                "currency1Name":"",
                "comCode":"",
                "handler1Code":"",
                "appliName":"",
                "insuredName":"",
                "endCaseDate":"",
                "underWriteDateFrom":"",
                "underWriteDateTo":"",
                "certiType":""
            };
            //弹框表格绑定初始化
            this.accountRecInitList=[
                {
                    "currenCy2":'CNY',
                    "payWay":'01',
                    "accountNo":'',
                    "itemCode":"",
                    "payrefFee":'',
                    "centerCode":'11999000'
                }
            ];
            //弹框表格绑定
            this.accountRecList=[
                {
                    "currenCy2":'CNY',
                    "payWay":'01',
                    "accountNo":'',
                    "payrefFee":'',
                    "itemCode":"",
                    "centerCode":'11999000'
                }
            ];
            //付赔款查询结果
            this.claimList=[];
        };
        //付赔款查询
        var claimQuery=function(keywords,options,pagination){
            console.log('付赔款查询');
            var _data={
                "compensateNo":keywords.compensateNo||'',//计算书号/赔案号1
                "compensateNoList":keywords.compensateNoList||'',//计算书号清单/赔案号清单
                "policyNo":keywords.policyNo||'',//保单号1
                "riskCode":keywords.riskCode||'',//险种
                "currency1":keywords.currency1||'',//币种
                "comCode":keywords.comCode||'',//业务部门
                "handler1Code":keywords.handler1Code||'',//业务员
                "appliName":keywords.appliName||'',//投保人名称
                "insuredName":keywords.insuredName||'',//被保人名称
                "endCaseDate":keywords.endCaseDate,//结案时间
                "underWriteDateFrom":keywords.underWriteDateFrom||'',//核赔时间从
                "underWriteDateTo":keywords.underWriteDateTo||'',//核赔时间到
                "certiType":keywords.certiType||'',//业务类型
                "pageNo": pagination.pageIndex-1||'',//页码
                "pageSize": pagination.pageSize||'',//每页条数

                //权限控制
                "webUserCode":keywords.webUserCode||'',//当前登录人代码
                "webComCode":keywords.webComCode||'',//当前登录机构代码
                "webCenterCode":keywords.webCenterCode||'',//当前核算单位代码
                "webTaskCode":'payment.paymanager.indemnity'//当前操作菜单代码

            };
            config.httpPackage.data = $$adapter.exports(constants.TARGET.CLAIMQUERY, _data);
            config.httpPackage.url = ApiPath.api.claimQuery;
            $http(config.httpPackage)

                .success(function (data) {
                    data = $$adapter.imports(constants.TARGET.CLAIMQUERY, data);
                    if (data && options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })

        };
        /**
         * 确认n笔收款
         * @param data
         * @param options
         */
        var getClaimDetail=function(data,options){

            config.httpPackage.data = $$adapter.exports(constants.TARGET.GETCLAIMDETAIL, data);
            config.httpPackage.url = ApiPath.api.getClaimDetail;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports(constants.TARGET.GETCLAIMDETAIL, data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })
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

        /**
         * 付赔款到账确认
         * @param data
         * @param options
         */
        var claimSubmit=function(data, options){
            console.log('付赔款到账确认');
            config.httpPackage.data = $$adapter.exports(constants.TARGET.CLAIMSUBMIT, data);
            config.httpPackage.url = ApiPath.api.claimSubmit;
            $http(config.httpPackage)

                .success(function (data) {
                    data = $$adapter.imports(constants.TARGET.CLAIMSUBMIT, data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };

        //缴费-币种获取兑换率
        /**
         * 付赔款-币种获取兑换率
         * @param _data
         * @param options
         */
        var findExchangeRate=function(_data, options){
            console.log('付赔款-币种获取兑换率');
            var _dto={
                "currenCY":_data.currency1||'',
                "currency2":_data.currency2||''
            };
            config.httpPackage.data = $$adapter.exports('findExchangeRate', _dto);
            config.httpPackage.url =  ApiPath.api.findExchangeRateDto;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('findExchangeRate', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        return {
            claimQuery:function(keywords,options,pagination){
              return claimQuery(keywords,options,pagination);
            },
            Claim:function(){
                return new Claim();
            },
            claimSubmit:function(_data, options, keywords){
                return claimSubmit(_data, options, keywords);
            },
            getClaimDetail:function(keywords,options){
                return getClaimDetail(keywords,options);

            },
            queryNoBillBankAcount:function(_data,options){
                return queryNoBillBankAcount(_data,options);

            },
            findExchangeRate:function(_data,options){
                return findExchangeRate(_data,options);

            }
        }
    }
    moduleApp.factory('$$payClaim',['$http','$$adapter','ApiPath', payClaimHandler]);

});
