/**
 * 收保费api
 */
define(['config'], function (config) {
    'use strict';
    function voucherHandler($http,$$adapter) {

        var Voucher=function(){
            this.infoToView={
                "voucherMenu":'0',
                "checksType":'0',
                "checkQuery":{
                    "voucherNo":""
                },
                "checkStatus":{
                    "checkedCheckAll":false
                }
            }
        };
        var checkQuery=function (keywords,options) {
            console.log('刷卡凭证查询');
            var _data={
                "voucherNo":keywords.voucherNo||''
            };
            _data = $$adapter.exports('checkQuery', _data);
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: config.backend.ip + config.backend.checkQuery,
                headers: {},
                data: _data
            })
                .success(function (data) {
                    data = $$adapter.imports('checkQuery', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })
        }
        var voucherSubmit=function(_data, options, keywords){
            console.log('刷卡凭证到账确认');
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: config.backend.ip + config.backend.voucherSubmit,
                headers: {},
                data: _data
            })
                .success(function (data) {
                    // data = $$adapter.imports('addView', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };

        return {
            Voucher:function(){
                return new  Voucher()
            },
            voucherSubmit:function(_data, options, keywords){
                return voucherSubmit(_data, options, keywords);
            },
            checkQuery:function (keywords,options) {
                return checkQuery(keywords,options)
            }


        }

    }
    return voucherHandler;
});
