/**
 * Created by martin on 2017/4/13.
 * 转换器
 */

define([
    'constants'
], function (constants) {
    'use strict';
    function adapterFactoryHandler($rootScope) {

        console.log('adapter.js加载玩完成');

        /**
         * 异常判断
         * @param data
         * @returns {boolean}
         */

        var hasException=function(data){
            var msgException="";//错误提示信息
            var errorSign = false;
            if(data){
                if(data.code!='0000'&&data.code){
                    msgException=data.message;
                    $rootScope.$broadcast(constants.EVENTS.BACKEND_EXCEPTION, {code:-2,message:msgException});
                    errorSign = true;
                }
                if(data.content&&data.content.status!=undefined){
                    msgException="服务异常，请联系管理员！";
                    $rootScope.$broadcast(constants.EVENTS.BACKEND_EXCEPTION, {code:-2,message:msgException});
                    errorSign = true;
                }
            }
            return errorSign
        };

        var importRules = {

            login:function(data){
                return data.data;
            },
            /**
             * 工作台-异常信息查询
             * @param data
             */
            abnormal:function(data){
                return data.content;
            },
            /**
             * 科目维护树菜单
             * @param data
             */
            subjectTreeMenu:function(data){
                return data.content

            },
            /**
             * 工作台-通知接口--日结失败提醒接口
             * @param data
             */
            queryDailyPaymentList:function(data){
                return data.content;
            },

            /**
             * 到款确认查询
             * @param data
             */
            confirmQuery:function(data){
                return data.content;
            },
            /**
             * 到款确认--提交信息
             * @param data
             */
            submitDetail:function(data){
                return data.content;
            },
            /**
             * 到款确认--收付方式
             * @param data
             */
            payWayQuery:function(data){
                return data.content;
            },
            /**
             * 到款确认-银行信息
             * @param data
             */
            confirmBank:function(data){
                return data.content;
            },
            /**
             *无单预收查询
             * @param data
             */
            temporary:function(data){
                return data
            },
            //手工转无单预收新增查询
            tonyisearchReparations:function(data){
                return data
            },
            //手工转无单预收提交选择
            noneusedie:function(data){
                return data
            },
            //手工转无单预收提交
            unifySerialNum:function(data){
                return data
            },
            //退无单预收查询
            tsearchReparations:function(data){
                return data
            },
            //退无单预收新增--查询
            addsearchReparations:function(data){
                return data
            },
            //退暂收款
            availableFee:function(data){
                return data
            },
            //退暂收款--提交
            lisr:function(data){
                return data
            },

            /**
             *批量业务缴费--查询
            * @param data
            */
            collectionSearchs:function(data){
                return data.content
            },
            /**
             *批量业务缴费--导入
             * @param data
             */
            importCondition:function(data){
                return data.content
            },
            /**
             *批量业务缴费--成功清单
             * @param data
             */
            ShowImptMassage:function(data){
                return data.content
            },
            /**
             *批量业务缴费--删除单号
             * @param data
             */
            deleteImp:function(data){
                return data
            },
            /**
             *手续费发票查询条件
             * @param data
             */
            searchReparations:function(data){
                return data
            },
            /**
             *手续费发票登记信息
             * @param data
             */
            payLossInfo:function(data){
                return data
            },
            //插入多条发票数据
            payLossVerify:function(data){
                return data
            },
            //发票查询
            findAllInvoice:function(data){
                return data
            },
            /**
             *共保支付单查询条件
             * @param data
             */
            queryCoinsSettlePlanForInvoice:function(data){
                return data
            },
            /**
             *共保发票登记信息
             * @param data
             */
            inToInvoiceCoinsSettlePlanView:function(data){
                return data
            },
            //插入多条共保发票数据
            saveCoinsSettlePlanInvoices:function(data){
                return data
            },
            //共保发票查询
            findAllInvoiceForCoinsSettlePlan:function(data){
                return data
            },
            /**
             *理赔费用发票查询条件
             * @param data
             */
            queryLossPlanForInvoice:function(data){
                return data
            },
            /**
             *理赔费用发票登记信息
             * @param data
             */
            payComInfo:function(data){
                return data
            },
            /**
             *理赔费用插入多条发票登记信息
             * @param data
             */
            payComVerify:function(data){
                return data
            },
            /**
             *理赔手续费发票查询
             * @param data
             */
            findAllInvoiceForCompensate:function(data){
                return data
            },
            /**
             *代收代付查询
             * @param data
             */
            entrustApplyQuery:function(data){
                return data
            },
            /**
             *代收代付申请登记
             * @param data
             */
            entrustApplyView:function(data){
                return data
            },
            /**
             *代收代付申请登记插入
             * @param data
             */
            entrustApplyConfirm:function(data){
                return data
            },
            /**
             *代收代付撤销查询
             * @param data
             */
            entrustCancelQuery:function(data){
                return data
            },
            /**
             *代收代付撤销
             * @param data
             */
            entrustCancelConfirm:function(data){
                return data
            },
            /**
             *日结主表查询
             * @param data
             */
            queryDailyPaymentMain:function(data){
                return data.content
            },
            /**
             *日结单汇总表查询
             * @param data
             */
            queryDailyPaymentSum:function(data){
                return data.content
            },
            /**
             *凭证查询
             * @param data
             */
            QueryVoucherDto:function(data){
                return data
            },
            /**
             *日结流水单查询
             * @param data
             */
            queryDailyPaymentDetail:function(data){
                return data.content
            },
            /**
             *自动日结查询
             * @param data
             */
            queryAutoDailyPSet:function(data){
                return data.content
            },
            /**
             *新增自动日结保存
             * @param data
             */
            save:function(data){
                return data.content
            },
            /**
             *日结单日结审核
             * @param data
             */
            preClaimModify:function(data){
                return data.content
            },
            /**
             *立即执行
             * @param data
             */
            immAutoDaily:function(data){
                return data.content
            },
            /**
             *凭证详情
             * @param data
             */
            queryCheckCondition:function(data){
                return data
            },
            /**
             *凭证分录信息查询
             * @param data
             */
            queryVoucherDetail:function(data){
                return data
            },
            /**
             *凭证复核查询
             * @param data
             */
            queryDailyPaymentCheck:function(data){
                return data.content
            },
            /**
             *点击凭证复核展示选中凭证详情
             * @param data
             */
            queryDailyPaymentVoucherCheckD:function(data){
                return data.content
            },
            /**
             *原始凭证复核
             * @param data
             */
            verifyVoucherNo:function(data){
                return data.content
            },
            /**
             *合并单证复核
             * @param data
             */
            verifyMergeVoucherNo:function(data){
                return data.content
            },
            /**
             *凭证合并
             * @param data
             */
            voucherCombine:function(data){
                return data.content
            },
            /**
             *取消凭证合并
             * @param data
             */
            cancelMergeVoucherNo:function(data){
                return data.content
            },
            /**
             *批量业务缴费--缴费
             * @param data
             */
            batchServicePayment:function(data){
                return data.resultObj
            },
            /**
             * 结算管理--车船税管理-生成结缴单
             */
            paySearCh:function(data){
                return data.content;
            },
            /**
             * 结算管理--车船税管理-结缴单管理
             */
            payTaxSearch:function(data){
                return data.content;
            },
            /**
             * 生成结缴单-提交
             */
            payLsitSubmit:function(data){
                return data.content;
            },
            /**
             * 车船税-导入
             */
            payListImport:function(data){
                return data.content;
            },
            /**
             * 结算单详情
             */
            taxDetail:function(data){
                return data.content;
            },
            /**
             * 结算单作废
             */
            taxDelete:function(data){
                return data.content;
            },
            /**
             * 税务结缴查询
             */
            settleSearch:function(data){
                return data.content;
            },
            /**
             * 税务结缴详情
             */
            settleDetail:function(data){
                return data.content.content[0];
            },
            /**
             * 税务结缴提交
             */
            settleSubmit:function(data){
                return data;
            },
            /**
             * 税务结缴提交信息展示
             */
            settleSubmitDetail:function(data){
                return data.content;
            },
            /**
             * 税务结缴银行信息
             */
            settleBankDetail:function(data){
                return data.content.content;
            },
            /**
             * 再保结算-结算单查询结算-查询
             */
            reinSearch:function(data){
                return data.content;
            },
            /**
             * 再保结算-结算单查询结算-详情
             */
            reinQueryDetail:function(data){
                return data.content;
            },
            /**
             * 再保结算-结算单查询结算-再保查询
             */
            reinDataQuery:function(data){
                return data.content;
            },
            /**
             * 再保结算-结算单查询结算-再保确认保存
             */
            settlementSave:function(data){
                return data;
            },
            /**
             * 再保结算-生成再保结算单-查询
             */
            reinCreateQuery:function(data){
                return data.content.content;
            },
            /**
             * 再保结算-生成再保结算单-详情
             */
            reinQueryData:function(data){
                return data.content;
            },
            /**
             * 再保结算-生成再保结算单-结付
             */
            reinPay:function(data){
                return data.content;
            },
            /**
             * 再保结算-生成再保结算单-结付确认
             */
            reinConfirm:function(data){
                return data.content;
            },
            /**
             *再保分出业务查询
             */
            exSettleSearch:function(data){
                return data.data;
            },
            /**
             * 再保分出业务详情
             */
            exportQueryDetail:function(data){
                return data.data
            },
            /**
             * 再保分出确认
             */
            exportSubmit:function(data){
                return data.data;
            },
            /**
             * 再保分入查询
             */
            imSettleSearch:function(data){
                return data.data;
            },
            /**
             * 收保费提交
             * @param data
             */
            accountSubmit:function(data){
                return data.content;
            },
            /**
             * 自动到款确认
             * @param data
             */
            paymentAndSpayCheck:function(data){
                return data.content;
            },
            /**
             * 付赔款查询
             * @param data
             */
            claimQuery:function(data){
                return data.content
            },
            /**
             *获取付赔款信息
             */
            getClaimDetail:function(data){
                return data.content;
            },

            /**
             * 理赔收款
             * @param data
             */
            claimSubmit:function(data){
                return data.content.returnContent
            },
            /**
             * 共保业务-查询
             * @param data
             */
            commonQuery:function(data){
                return data.content;
            },
            /**
             * 共保业务-提交
             */
            commSubmit:function(data){
                return data.content;
            },
            /**
             * 蓝票开具申请-查询
             * @param data
             */
            invoiceQuery:function(data){
                return data.content;
            },
            /*
             *  进项发票信息登记查询
             */
            invoiceRegisterQuery:function (data) {
                return data;
            },
            //代收代付--受托单位--双击域
            commissionedUnitList:function (data) {
                var _data=angular.copy(data.content.content);
                if(_data && _data.length){
                    $.each(_data,function (index,item) {
                        item.code=item.comCode||'';
                        item.value=item.comCName||'';
                    });
                }
              return _data;
            },
            //运维管理--数据源信息配置--修改保存--回参
            dataConfigModify:function (data) {
                return data;
            },
            //运维管理--数据源信息配置modal--保存--回参
            dataConfigSave:function (data) {
                return data;
            },
            //数据源信息配置--查询--回参
            dataConfigSearch:function (data) {
                return data;
            },
            /*
            进项发票信息导出--回参
             */
            downExcel:function (data) {
              return data;
            },
            //抵扣
            deduction:function (data) {
                return data;
            },
            /*
            进项发票信息modal--确定--回参
             */
            confirm:function (data) {
                return data;
            },
            /*
            进项发票信息modal2--查询--回参
             */
            search:function (data) {
                return data;
            },
            /*
             *  进项发票信息取消登记/转出查询--回参
             */
            cancelROQuery:function (data) {
                return data;
            },
            /*
            进项发票转出查询--回参
             */
            invoiceOutQuery:function(data){
                return data;
            },
            /*
            进项发票转出--全部--确认--回参
             */
            invoiceOutConfirm:function (data) {
                return data;
            },
            /*
            进项发票转出--modal--查询--回参
             */
            invoiceOutsearch:function (data) {
                return data;
            },
            /*
            进项发票转出部分确认--回参
             */
            invoiceOutSomeConfirm:function (data) {
                return data;
            },
            /*
            红票查询---回参
             */
            redInvoiceQuery:function (data) {
              return data;
            },
            //红票确认--回参
            checkRedInvoiceSubmit:function (data) {
                return data;
            },
            //生成进项税抵扣凭证--回参
            produce:function (data) {
                return data;
            },
            //运维管理--数据源信息配置--回参
            dataConfigRemove:function (data) {
                return data;
            },
            /**
             * 蓝票开具勾选 提交-查询
             * @param data
             */
            checkInvoiceSubmit:function(data){
                return data.content;
            },
            /**
             * 蓝票开具勾选 get
             * @param data
             */
            blueInvoiceSubmitModal:function(data){
                return data;
            },
            /**
             * change信息
             */
            blueChangeInfomation:function(data){
                return data;
            },
            /**
             * 判断是否可以勾选复选框
             */
            IsTrueSubmit:function(data){
                return data;
            },
            /**
             * 销项开票回写 get
             * @param data
             */
            outPutBuleInvoiceSubmit:function(data){
                return data;
            },
            /**
             * 税会调差
             */
            theDifferentialBlueInvoiceSubmit:function(data){
                return data;
            },
            /**
             * 购方纳税人采集-查询
             * @param data
             */
            taxpayerNext:function(data){
                return data;
            },
            /**
             * 批量蓝票开具-查询
             * @param data
             */
            batchInvoiceImport:function(data){
                return data.content;
            },
            /**
             * 批量蓝票开具-申请
             * @param data
             */
            batchInvoiceSubmit:function(data){
                return data;
            },
            /**
             * 购方纳税人保存-查询
             * @param data
             */
            taxpayerSubmit:function(data){
                return data;
            },
            /**
             * 已开发票信息-查询
             * @param data
             */
            invoiceInfoSelect:function(data){
                return data.content;
            },
            /**
             * 已开发票信息-明细
             * @param data
             */
            invoiceInfoDetailQuery:function (data) {
                return data.content;
            },
            /**
             * 共保业务-结算单查询
             */
            payreSearch:function(data){
                return data.content;
            },
            /**
             * 共保业务-支付前确认
             */
            payrefSubmitData:function(data){
                return data.content;
            },
            /**
             * 共保业务-结算单修改
             */
            payreModify:function(data){
                return data.content;
            },
            /**
             * 共保业务-结算单支付
             */
            payrefSubmit:function(data){
                return data.content;
            },
            /**
             * 综合查询-凭证查询
             * @param data
             */
            voucherQuery:function(data){
                return data.content
            },
            /**
             * 综合查询-业务信息查询
             * @param data
             */
            queryCertinoInfo:function(data){
                return data.content
            },
            /**
             * 支票到账确认-查询
             * @param data
             */
            checksQuery:function(data){
                return data.resultObj
            },
            /**
             * 支票到账确认-下一步
             * @param data
             */
            checksContinue:function(data){
                return data.resultObj
            },
            /**
             * 支票到账确认-提交
             * @param data
             */
            checksSubmit:function(data){
                return data.resultObj
            },
            /**
             * 刷卡凭证确认-查询
             * @param data
             */
            checkQuery:function(data){
                return data.resultObj
            },
            /**
             * 收付机构
             */
            paymentInstitutions:function(data){
                return data.content;
            },
            /**
             * 收付机构下拉查询
             */
            comSelectData:function(data){
                if(data.content.content){
                    $.each(data.content.content,function(index,target){
                        target.code=target.comCode;
                        target.value=target.comName
                    })
                }
                return data.content;
            },
            /**
             * 收付员双击
             */
            cashOwner:function (data) {
                if(data.content.content){
                    $.each(data.content.content,function(index,target){
                        target.code=target.userCode;
                        target.value=target.userName
                    })
                }
                return data.content.content;
            },
            /**
             * 收付机构详情
             */
            comDetail:function(data){
                return data.content.content;
            },
            /**
             * 收付机构检查
             */
            comCheck:function(data){
                return data.content;
            },
            /**
             * 收付方式-查询
             */
            paymentMode:function(data){
                return data.resultObj;
            },
            /**
             * 收付方式-新增
             */
            saveNewPay:function(data){
                return data;
            },
            /**
             * 收付方式-修改
             */
            saveRevisePay:function(data){
                return data;
            },
            /**
             * 收付方式查询1
             */
            searchPaymentData:function(data){
                return data.content;
            },
            /**
             * 修改场景或核算详情
             * @param data
             */
            sceneSearch:function(data){
                return data.content;
            },
            /**
             * 收付场景查询
             * @param data
             */
            modifyScene:function(data){
                return data.content;
            },
            /**
             * 新增场景
             * @param data
             */
            addType:function(data){
                return data.content;
            },
            /**
             * 收付类型查询
             * @param data
             */
            typeQuery:function(data){
                return data.content;
            },
            /**
             * 收付类型-新增
             * @param data
             */
            addAccountType:function(data){
                return data.resultObj;
            },
            /**
             * 收付场景-新增
             * @param data
             */
            addAccount:function(data){
                return data.resultObj
            },
            /**
             * 收付类型-修改
             * @param data
             */
            updateAccountType:function(data){
                return data.resultObj
            },
            /**
             * 收付场景-修改查询
             * @param data
             */
            updateScene:function(data){
                return data.resultObj
            },

            /**
             * 收付场景修改确认
             * @param data
             */
            updateSceneSave:function(data){
                return data;
            },
            /**
             * 收付场景删除
             * @param data
             */
            deleteScene:function(data){
                return data
            },
            /**
             * 收付原因查询
             * @param data
             */
            payReason:function(data){
                return data.content;
            },
            /**
             * 银行机构查询
             */
            searchBankGroup:function (data) {
              return data;
            },
            /*
            银行流水导入
                */
            submitImportDataAdd: function (data) {
                return data;
            },
            /*
             银行流水导入
             */
            submitImportDataAddV2X: function (data) {
                return data;
            },
            /*
             银行文件下载
             */
            queryMain: function (data) {
                return data;
            },
            //导入目标银行账号-币别
            queryBankAcount: function (data) {
                return data;
            },
            /**
             * 收付员-查询
             */
            cashMember:function(data){
                return data.content;
            },
            /**
             *收付员-新增
             */
            saveNewCh:function(data){
                return data.content;
            },
            /**
             * 收付员-联动
             */
            selChange:function(data){
                $.each(data.content,function(index,obj){
                    obj.code=obj.bankAccountNo;
                    obj.value=obj.bankAccountName;
                });
                return data.content;
            },
            /**
             *收付员-删除
             */
            cashMemberDel:function(data){
                return data.content;
            },
            /**
             * 收付员-修改查询
             */
            modifyCash:function(data){
                return data.content;
            },
            /**
             * 收付员-修改保存
             */
            saveRevise:function(data){
                return data.content;
            },
            /**
             * 账龄查询-
             */
            ageRange:function(data){
                return data.content;
            },
            /**
             * 账龄新增
             */
            agingAdd:function(data){
                return data;
            },
            /**
             * 账龄修改查询
             */
            agingModify:function(data){
                return data.content;
            },
            /**
             * 账龄修改保存
             */
            agingSave:function(data){
                return data;
            },
            /**
             * 账龄删除
             */
            ageRangeDel:function(data){
                return data.content;
            },
            //兑换率查询
            exchangeRate:function(data){
                return data.content;
            },
            //兑换率新增
            addNewExc:function(data){
                return data;
            },
            //兑换率修改
            modifyExc:function(data){
                return data;
            },
            //工作日初始化
            initWork:function(data){
                return data;
            },
            //工作日提交
            workDaySubmit:function(data){
                return data;
            },
            //工作日-重置
            workDatReset:function(data){
                return data;
            },
            //工作日-查询
            workDaySearch:function(data){
                return data;
            },
            /**
             *操作员查询
             */
            operator:function(data){
                return data.content;
            },
            /**
             *  权限管理查询
             */
            permissions:function(data){
                return data.content;
            },
            /**
             * 银行账号查询
             */
            bankAccount:function (data) {
                return data.content;
            },
            /**
             * 账号详情
             */
            bankDetail:function (data) {
                return data.content;
            },
            /**
             *银行账号新增
             */
            bankNewAdd:function(data){
                return data
            },
            /**
             *银行账号修改保存
             */
            bankNoSave:function(data){
                return data;
            },
            /**
             * 银行账号删除
             */
            bankAccountDel:function(data){
                return data.content;
            },
            /**
             * 基础设置--银行账户维护--银行商户信息查询
             */
            bankMerchant:function (data) {
                return data.content;
            },
            /**
             * 基础设置--银行账户维护--新增银行商户信息
             */
            operationBankMerchant:function (data) {
                return data.content;
            },
            /**
             * 岗位配置查询
             */
            postConfigQuery:function(data){
                return data.content.content[0];
            },
            /**
             * 岗位配置修改保存
             */
            savePostConfig:function(data){
                return data;
            },
            /**
             * 岗位管理查询
             */
            postManage:function(data){
                return data.content;
            },
            /**
             *岗位管理详情
             */
            postManageDetail:function(data){
                var retrunChecked=function (list) {
                    if(list.nodes){
                        list.checked=list.nodes.some(function(item,index,array) {
                            return item.checked;
                        })
                    }
                }
                if(data&&data.content){
                    if(data.content.content){
                        $.each(data.content.content,function (index,node) {
                            retrunChecked(node);
                            if(node.nodes&&node.nodes.length>0&&node.nodes[0]!=null){
                                retrunChecked(node.nodes);
                            }
                        })
                    }
                }
                return data.content;
            },
            /**
             * 岗位管理保存
             */
            savePostDetail:function(data){
                return data;
            },
            /**
             * 岗位管理删除
             */
            deletePost:function(data){
                return data;
            },
            /**
             * 删除场景1
             */
            accountGroup:function(data){
                return data.content;
            },
            /**
             * 修改场景确认1
             */
            updateTypeSave:function(data){
                return data.content;
            },
            /**
             * 会计科目树查询1
             */
            deleteType:function(data){
                return data.content;
            },
            /**
             * 收付方式新增1
             */
            saveNewPaymenter:function(data){
                return data.content;
            },
            /**
             * 收付方式修改1
             */
            saveRevisePaymenter:function(data){
                return data.content;
            },
            /**
             * 收付方式删除1
             */
            delPaymentDto:function(data){
                return data.content;
            },
            /**
             * 银行账号保存1
             */
            saveBank:function(data){
                return data.content;
            },
            /**
             * 银行账号删除1
             */
            deleteBank:function(data){
                return data.content;
            },
            /**
             * 收付原因增加1
             */
            addPayReason:function(data){
                return data.content;
            },
            /**
             * 收付原因修改1
             */
            updatePayReason:function(data){
                return data.content;
            },
            /**
             * 收付原因删除1
             */
            deletePayReason:function(data){
                return data.content;
            },
            /**
             * 会计科目保存1
             */
            saveAccounting:function(data){
                return data.content;
            },
            /**
             * 会计科目-辅助核算保存1
             */
            saveSupAccount:function(data){
                return data.content;
            },
            /**
             * 会计科目-新增弹框保存1
             */
            saveNewAccounting:function(data){
                return data.content;
            },
            /**
             * 辅助核算删除1
             */
            delSupInfo:function(data){
                return data.content;
            },
            /**
             * 核算项保存1
             */
            saveArticleCode:function(data){
                return data.content;
            },
            /**
             * 收付场景详情1
             */
            getScenceDetail:function(data){
                return data.content;
            },
            /**
             * 会计科目树数据查询
             */
            accSubjectsData:function(data){
                return data.resultObj;
            },
            /**
             * 凭证模版设置-文件上传
             */
            excelImport:function(data){
                return data.content;
            },
            /**
             * 核算项树查询1
             */
            accountItemGroup:function(data){
                return  data.content;
            },
            /**
             * 会计期间查询
             */
            accountPeriod:function (data) {
                return data.content;
            },
            /**
             * 会计期间修改
             */
            changeAccount:function(data){
                return data;
            },
            /**
             * 付款审核查询
             */
            paymentApproval:function (data) {
                return data;
            },
            /**
             * 付款登记，确认查询
             */
            paymentRegister:function (data) {
                return data;
            },
            /**
             * 逾期查询
             */
            overdueQuery:function (data) {
                return data;
            },
            /**
             * 会计科目树形菜单查询
             * @param data
             */
            searchAccount:function(data){
                return data.content;
            },
            /**
             * 辅助核算项目维护树形菜单查询1
             * @param data
             */
            queryAccount:function(data){
                return data.content;
            },
            /**
             * 税率维护保存
             */
            preservationTaxRateData:function (data) {
                return data;
            },
            /**
             * 税金计算
             */
            searchMoreAdviceOfSettlement:function (data) {
                return data;
            },
            /**
             * 手续费结算单生成
             */
            confirmSettlement:function (data) {
                return data;
            },
            /**
             * 税金复核
             */
            reviewTaxCheckData:function (data) {
                return data;
            },
            /**
             * 银行代发模板导出查询
             */
            findBankTemplates:function (data) {
                return data;
            },
            /**
             * 银行代发模板导出
             */
            downLoadTable:function (data) {
                return data;
            },
            /**
             * 结算单支付申请确认
             */
            confirmSettlementFormData:function (data) {
                return data;
            },
            /**
             * 送支付平台
             */
            sendPaymentPlatformDto:function (data) {
                return data;
            },
            /**
             * 支付单审批
             */
            confirmAudit:function (data) {
                return data;
            },
            /**
             * 支付单锁定与释放
             */
            lockingAudit:function (data) {
                return data;
            },
            /**
             * 已审批记录查询-推送
             */
            submitApproved:function (data) {
                return data;
            },
            /**
             * 结算单支付确认查询
             */
            paymentConfirmList:function (data) {
                return data;
            },
            /**
             * 结算单支付确认-确认通过
             */
            confirmPay:function (data) {
                return data;
            },
            /**
             * 结算单支付确认-打回
             */
            failPay:function (data) {
                return data;
            },
            /**
             * 结算单作废查询
             */
            searchCancelList:function (data) {
                return data;
            },
            /**
             * 结算单作废
             */
            cancelPay:function (data) {
                return data;
            },
            /**
             * 交易失败结算单查询
             */
            searchReapplyList:function (data) {
                return data;
            },
            /**
             * 交易失败结算单重新申请
             */
            payReapply:function (data) {
                return data;
            },
            /**
             * 单号作废
             */
            deleteNumMessage:function (data) {
                return data;
            },
            /**
             * 查看单号列表查询||修改保存
             */
            paymentNoticeListInfo:function (data) {
                return data;
            },
            /**
             * 非见费业务缴费--新增保存
             */
            saveCollectionDto:function (data) {
                return data;
            },
            /**
             * 非见费业务缴费--打印
             */
            paymentNoticeListPrint:function (data) {
                return data;
            },
            /**
             * 转账-认领操作
             */
            toPaymentWay:function (data) {
                return data;
            },
            /**
             * 获取收银台支付链接
             */
            getPayUrl:function (data) {
                return data;
            },
            /**
             * 缴费方式-无单预收
             */
            noBillPay:function (data) {
                return data;
            },
            /**
             * 缴费金额为负
             */
            negativePay:function (data) {
                return data;
            },
            /**
             * 预认领查询
             */
            searchPreClaim:function (data) {
                return data;
            },
            /**
             * 预认领--缴费通知单查询
             */
            searchPaymentNotice:function (data) {
                return data;
            },
            /**
             * 预认领--银行流水查询
             */
            searchBankFlow:function (data) {
                return data;
            },
            /**
             * 预认领-新增认领
             */
            confirmpreClaim:function (data) {
                return data;
            },
            /**
             * 修改预认领-修改
             */
            revisePreClaim:function (data) {
                return data;
            },
            /**
             * 预认领查看
             */
            lookPreClaim:function (data) {
                return data;
            },
            /**
             * 预认领修改查询
             */
            reviseLookPreClaim:function (data) {
                return data;
            },
            /**
             * 认领确认查询
             */
            searchClaimConfirm:function (data) {
                return data;
            },
            /**
             * 认领确认-详情
             */
            lookClaimConfirm:function (data) {
                return data;
            },
            /**
             * 确认认领
             */
            confirmClaim:function (data) {
                return data;
            },
            /**
             * 认领打回
             */
            claimRepulse:function (data) {
                return data;
            },
            /**
             * 仲裁管理查询
             */
            searchArbitrationManage:function (data) {
                return data;
            },
            /**
             * 仲裁确认
             */
            confirmArbitrationManage:function (data) {
                return data;
            },
            /**
             * 仲裁退回
             */
            returnArbitration:function (data) {
                return data;
            },
            /**
             * 仲裁撤销查询
             */
            searchArbitrationReturn:function (data) {
                return data;
            },
            /**
             * 撤销仲裁结果
             */
            arbitrationReturnResult:function (data) {
                return data;
            },
            /**
             * 认领变更查询
             */
            searchClaimChange:function (data) {
                return data;
            },
            /**
             * 认领变更-详情
             */
            lookClaimChange:function (data) {
                return data;
            },
            /**
             * 认领替换
             */
            changeClaim:function (data) {
                return data;
            },
            /**
             * 认领撤销
             */
            claimReturn:function (data) {
                return data;
            },
            /**
             * 应收保费挂账
             */
            transaccount:function(data){
                return data.content
            },
            /**
             * 应收保费挂账
             */
            payRefRecVouToFinance:function(data){
                return data.content
            },
            /**
             * 应收保费挂账
             */
            transAccVouToFinance:function(data){
                return data.content
            },
            /**
             * 保单收付信息查询
             */
            InformationQuery:function(data){
                return data
            },
            /**
             * 保单收付详细信息
             */
            findDetail:function(data){
                return data.content
            },
            /**
             * 代扣代缴报表--条件查询接口
             */
            queryWithHoldingStatements:function(data){
                return data.content
            },
            /**
             * 代扣代缴报表--生成报表接口
             */
            geneReports:function(data){
                return data.content
            },
            /**
             * 代扣代缴报表--作废接口
             */
            invalidStatement:function(data){
                return data.content
            },
            /**
             * 代扣代缴报表导出接口
             */
            exportModel:function(data){
                return data.content;
            },
            /**
             * 代扣代缴报表打印接口
             */
            printOne:function(data){
                return data.content;
            },
            /**
             * 代扣代缴实付--条件查询接口
             */
            queryByConditions:function(data){
                return data.content;
            },
            /**
             * 代扣代缴实付--确认查询接口
             */
            paymentVerifyQuery:function(data){
                return data.content;
            },
            /**
             * 代扣代缴实收--查询结果确认接口
             */
            paymentVerifyResultQuery:function(data){
                return data.content;
            },
            /**
             * //代扣代缴实收--凭证复核接口
             */
            voucherReview:function(data){
                return data.content
            },
            /**
             * 代扣代缴实收--凭证取消接口
             */
            voucherCancel:function(data){
                return data.content;
            },
            /**
             * 代扣代缴实付信息查询--查询信息接口
             */
            queryInfo:function(data){
                return data
            },
            /**
             * 代扣代缴实付信息查询--结果列表页凭证明细查看接口
             */
            showReinsWithHoidingTaxQueryDetail:function(data){
                return data.content
            },
            /**
             * 代扣代缴实付信息查询--结果列表页导出接口
             */
            exportDataToExcel:function(data){
                return data.content
            },
            /**
             * 代扣代缴实付信息查询--结果展示页面结算单查看接口
             */
            showSettleDetail:function(data){
                return data
            },
            /**
             * 客户化查询
             */
            queryCustomerInfo:function(data){
                return data
            },
            /**
             * 日结查询汇总信息
             */
            queryGroupByCondition:function(data){
                return data
            },
            /**
             * 日结联动凭证信息查询
             */
            queryAccMainvoucher:function(data){
                return data.content
            },
            /**
             * 凭证详细信息
             */
            queryDailyPaymentCheckCondition:function(data){
                return data
            },
            /**
             * 业务信息
             */
            queryCertinoInfo2:function(data){
                return data
            },
            /**
             * 收付员日结-日历初始化
             */
            initDaily:function (data) {
                return data.content;
            },
            /**
             * 收付员日结-失败清单查看错误日志表信息
             */
            queryDailyErrorMsg:function(data){
                return data.content;
            },
            /**
             * 收付员日结-立即日结
             */
            endDayDto:function (data) {
                return data.content;
            },
            /**
             * 收付员日结-取消日结
             */
            cancelDaily:function (data) {
                return data.content;
            },
            /**
             * 收付员日结-补充资料查询
             */
            queryDailyAddtional:function (data) {
                return data.content;
            },
            /**
             * 收付员日结-首页汇总——补充导出按钮
             */
            exportDailyAddtional:function (data) {
                return data.content;
            },
            /**
             * 收付员日结-查看流水单导出
             */
            exportDailyPaymentDetail:function (data) {
                return data.content;
            },
            /**
             * 账户信息修改-查询
             */
            searchAccountInfo:function (data) {
                return data;
            },
            /**
             * 账户信息修改-修改保存
             */
            saveAccountRevise:function (data) {
                return data;
            },
            /**
             * 账户信息修改轨迹查询
             */
            searchTrajector:function (data) {
                return data;
            },
            /**
             * 账户信息修改轨迹-详细信息
             */
            queryTrajectorInfo:function (data) {
                return data;
            },
            /**
             * 账户校验配置-查询
             */
            queryAccountCheck:function (data) {
                return data;
            },
            /**
             * 账户校验配置-保存
             */
            saveAccountCheck:function (data) {
                return data;
            },
            /**
             * 账户校验配置-详细信息
             */
            queryAccountCheckInfo:function (data) {
                return data;
            },
            /**
             * 审批权限配置-机构查询
             */
            searchApprovalConfig:function (data) {
                return data;
            },
            /**
             * 审批权限配置-自动审批新增
             */
            saveApprovalAuto:function (data) {
                return data;
            },
            /**
             * 审批权限配置-自动审批修改
             */
            reviseApprovalAuto:function (data) {
                return data;
            },
            /**
             * 审批权限配置-手动审批新增
             */
            saveManualApproval:function (data) {
                return data;
            },
            /**
             * 审批权限配置-手动审批修改
             */
            reviseApprovalManual:function (data) {
                return data;
            },
            /**
             * 审批权限配置-人员查询
             */
            searchApprovalStaff:function (data) {
                return data;
            },
            /**
             * 审批权限配置-人员新增
             */
            saveApprovalStaff:function (data) {
                return data;
            },
            /**
             * 审批权限配置-人员修改
             */
            reviseApprovalStaff:function (data) {
                return data;
            },
            /**
             * 缴费页面初始化查询
             */
            searchPaymentInfo:function (data) {
                return data.content;
            },
            /**
             * 生成现金流水号
             */
            createCashNum:function (data) {
                return data.content;
            },
            /**
             * 缴费-暂存||缴费-完成缴费
             */
            temporaryPay:function (data) {
                return data;
            },
            /**
             * 缴费-币种获取兑换率
             */
            findExchangeRate:function (data) {
                return data;
            },
            /**
             * 已审批记录查询--模拟支付成功
             */
            simulationSuccess:function (data) {
                return data;
            },
            /**
             * 已审批记录查询--模拟退票
             */
            simulationFail:function (data) {
                return data;
            },
            /**
             * 收付方式-获取银行账号
             */
            payWayAccount:function (data) {
                return data;
            },
            /**
             * 审批记录查询--支付单号详情查看
             */
            lookVisaSerialNo:function (data) {
                return data;
            },
            /**
             * 审批权限配置-删除
             */
            deleteApproval:function (data) {
                return data;
            },
            /**
             * 账户校验配置-删除
             */
            deleteCheck:function (data) {
                return data;
            },
            /**
             * 头部查询核算单位
             */
            queryCenterCode:function (data) {
                return data;
            },
            /**
             * 双击域
             * @param data
             */
            getCodeListLike:function(data){
                //codeCode=>code,codeCName=>value
                if(data.content){
                    $.each(data.content,function(index,target){
                        target.code=target.codeCode;
                        target.value=target.codeCName
                    })
                }
                return data.content;
            },
            /**
             * 机构、人员双击域
             * @param data
             */
            getCustomCodeList:function(data){
                //codeCode=>code,codeCName=>value
                if(data.content.content){
                    $.each(data.content.content,function(index,target){
                        target.code=target.comCode;
                        target.value=target.comCName
                    })
                }
                return data.content.content;
            },
            /**
             * 业务员 
             */
            operatorNameList:function (data) {
                if(data.content){
                    $.each(data.content,function(index,target){
                        target.code=target.userCode;
                        target.value=target.userName
                    })
                }
                return data.content;
            },
            /**
             * 业务部门
             */
            salesDepartment:function (data) {
                if(data.content){
                    $.each(data.content,function(index,target){
                        target.code=target.comCode;
                        target.value=target.comCName
                    })
                }
                return data.content;
            },
            /**
             * 登陆机构权限范围内的代理信息
             */
            queryAgent:function (data) {
                if(data.content){
                    $.each(data.content,function(index,target){
                        target.code=target.agentCode;
                        target.value=target.agentName
                    })
                }
                return data.content;
            },
            /**
             * 账户机构双击域
             * @param data
             */
            getCustomCodeList2:function(data){
                //codeCode=>code,codeCName=>value
                if(data.content.content){
                    $.each(data.content.content,function(index,target){
                        target.code=target.comCode;
                        target.value=target.comCName
                    })
                }
                return data.content.content;
            },
            /**
             * 银行账户机构双击域
             * @param data
             */
            getCustomCodeList3:function(data){
                //codeCode=>code,codeCName=>value
                if(data.content.accountList){
                    $.each(data.content.accountList,function(index,target){
                        target.code=target.bankAccountNo;
                        target.value=target.bankAccountName
                    })
                }
                return data.content.accountList;
            },
            /**
             * shufufangshi
             * @param data
             */
            getCustomCodeList4:function(data){
                //codeCode=>code,codeCName=>value
                if(data.content.content){
                    $.each(data.content.content,function(index,target){
                        target.code=target.payWayCode ;
                        target.value=target.payWayCName
                    })
                }
                return data.content.content;
            },
            /**
             * 数据字典
             * @param data
             */
            getCodeTypeList:function(data){
                return data.data.content;
            },
            /**
             * 账户校检配置
             */
            getAccountChecking:function (data) {
                return data.content
            },
            /**
             * 付手续费查询
             */
            searchPoundageList:function (data) {
                return data.content
            },
            /**
             * 结算单详情查询
             */
            searchVisaSerialNoList:function (data) {
                return data.content
            },
            /**
             * 付手续费确认
             */
            confirmPoundageInf:function (data) {
                return data
            },
            /**
             * 结算单批次号详情查询
             */
            searchContractNoList:function (data) {
                return data.content
            },
            /**
             * 保单详情查询
             */
            searchPolicyNoList:function (data) {
                return data.content
            },
            /**
             * 结算单生成--模板导入
             */
            paymentExcelImport:function(data){
                return data.content;
            },
            /**
             * 业务红冲信息查询
             */
            searchRedFlushInf:function (data) {
                return data.content
            },
            /**
             * 业务红冲信息-弹框信息确认
             */
            queryConfirmRedInf:function (data) {
                return data.content
            },
            /**
             * 业务红冲信息-确认红冲
             */
            redFlushConfirmInf:function (data) {
                return data
            }
        };

        var exportRules = {
            /**
             * 生成结缴单-提交
             */
            payLsitSubmit:function(list){
                var _data={
                    "prpJCSTaxSettlePlanDtoList":list.list
                };
                return _data;
            },
            /**
             * 税务结缴银行信息
             */
            settleBankDetail:function(data){
                return data.content.content;
            },
            /**
             * 进项发票转出--全部--确认--入参
             */
            invoiceOutConfirm:function (data) {
                var _data=angular.copy(data);
                if(_data.prpjInputInvoiceRegistMainDtoList && _data.prpjInputInvoiceRegistMainDtoList.length>0){
                        _data.prpjInputInvoiceRegistMainDtoList.forEach(function (list,ind,arr) {
                            _data.invoiceCode = list.invoiceCode || '';
                            _data.visaSerialNo = list.visaSerialNo || '';
                            _data.reverseInvoiceCode = list.reverseInvoiceCode || '';
                            _data.reverseVisaSerialNo = list.reverseVisaSerialNo || '';
                            _data.printDate = list.printDate || '';
                            _data.queryBatchNo = list.queryBatchNo || '';
                            delete _data.prpjInputInvoiceRegistMainDtoList;
                            delete _data.prpjInputInvoiceRegistLoanDtoList;
                            delete _data.attaches;
                            delete _data.mainCondition;
                    });
                }
                return _data;
            },
            /**
             *收付员-新增
             */
            saveNewCh:function(data){
                var _data={
                    "accountCode": "6",
                    "accountList":data.accountList,
                    "comCode": data.comCode,
                    "comName": data.comName,
                    "flag": data.flag,
                    "gdinvoicePassWord": "setGdinvoicePassWord",
                    "gdinvoicePassWord1": "setGdinvoicePassWord1",
                    "gdinvoiceUserCode1": "setGdinvoiceUsercode1",
                    "gdinvoiceUsercode": "setGdinvoiceUsercode",
                    "invalidDate": "",
                    "levelNo": 1,
                    "manageLevel": 1,
                    "startCloseDate":data.startCloseDate,
                    "unitCode": data.unitCode,
                    "unitName": data.unitName,
                    "unitType": data.unitType,
                    "validStatus": "1"
                };
                $.each(_data.accountList,function (index,obj) {
                    $.each(obj.accValueList,function (i,_obj) {
                        if(_obj.code==obj.accountCode){
                            obj.accountName=_obj.value;
                        }
                    })
                })
                _data.invalidDate=new Date( _data.startCloseDate).getTargetDate(1,0,0).dateConversion();
                return _data;
            },
            /**
             * 登陆机构权限范围内的代理信息
             */
            queryAgent:function (data) {
                var _data = data || {};
                _data.centerCode = $rootScope.user.centerCode;
                return _data;
            },
            /**
             * 岗位权限管理保存
             */
            savePostDetail:function (data) {
                var _data={
                    "gradeID":data.id,
                    "content":data.list
                };
                console.log(_data);
                return _data;
                
            }


        };



        return {

            /**
             * @ngdoc
             * @name $$venus.$$adapter#imports
             * @methodOf $$venus.$$adapter
             *
             * @description
             * 后转前适配处理
             * @example
             * $$adapter.imports(type,data)
             * @param {string} type 适配类型
             * @param {object} data 入参数据
             * @returns {object} data
             */
            imports:function(type,data){
                if(hasException(data))
                    return false;
                else{
                    if(importRules[type] && typeof(importRules[type])=='function')
                        return importRules[type](data);
                    else
                        return data;
                }
            },
            /**
             * @ngdoc
             * @name $$venus.$$adapter#exports
             * @methodOf $$venus.$$adapter
             *
             * @description
             * 前转后适配处理
             * @example
             * $$adapter.exports(type,data)
             * @param {string} type 适配类型
             * @param {object} data 入参数据
             * @returns {object} data
             */
            exports:function(type,data){
                if(exportRules[type] && typeof(exportRules[type])=='function'){
                    return exportRules[type](data);
                }else{
                    return data;
                }
            }

        };
    }

    return adapterFactoryHandler;
});
