/**
 * 查询统计-保费查询api
 */

define(['../module','config'], function (moduleApp,config) {
    'use strict';
    function instantPaymentHandler($http,$$adapter) {

        console.log('保费查询Api');
        var InstantPayment=function(){
            this.infoToView={
                "instantMenu":'1',//查询类型
                "instantType":'0',//查询类型
                "instantQuery":'0',//保单号业务号
                "voucherNo":'',//凭证号
                "certiNo":'',//保/批单号
                "yearMonth":'',//会计月度
                "payRefNo":'',//收付确认号
                "centerCode":'',//核算单位编码
                "financeVoucherNo":'',
                "voucherList":[],
                "tapFlag":'1'
            }
        };
        var voucherQuery=function (keywords,options) {
            console.log('凭证查询');
            var _data={
                "voucherNo":keywords.voucherNo||'',
                "comCode":keywords.comCode||'',
                "certiNo":keywords.certiNo||'',
                "yearMonth":keywords.yearMonth||'',
                "payRefNo":keywords.payRefNo||'',
                "centerCode":keywords.centerCode||'',
                "financeVoucherNo":keywords.financeVoucherNo||''
            };
            _data = $$adapter.exports('voucherQuery', _data);
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: config.backend.ip + config.backend.voucherQuery,
                headers: {},
                data: _data
            })
                .success(function (data) {
                    data = $$adapter.imports('voucherQuery', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })
        }

        return {
            InstantPayment:function(){
                return new InstantPayment()
            },
            voucherQueryL:function (keywords,options) {
                return voucherQuery(keywords,options)
            }
        }

    }
    moduleApp.factory('$$instantPayment',['$http','$$adapter',instantPaymentHandler]);

});
