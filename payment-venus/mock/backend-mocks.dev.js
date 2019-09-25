/**
 * 模拟数据机制
 */
define([
    'angular-mocks',
    'config',
    'jsonDB',
    'jsonDB2'
], function (ngMock, config, jsonDB ,jsonDB2) {

    'use strict';

    angular.module('backend-mocks', ['ngMockE2E'])

        .run(['$httpBackend','ApiPath',function ($httpBackend,ApiPath) {

            console.log('DEV模拟后台启动....');
            //工作台-异常信息提示
            $httpBackend.whenPOST(ApiPath.api.Abnormal).respond(function (method, url, data) {
                console.log(data);
                return[200,jsonDB.Abnormal];
            });
            // 工作台日结失败通知
            $httpBackend.whenPOST(ApiPath.api.queryDailyPaymentList).respond(function (method, url, data) {
                return [200, jsonDB.DailyPaymentQuery];
            });

            //核算引擎双击域
            $httpBackend.whenPOST(ApiPath.api.getAccCodeListLike).respond(function (method, url, data) {
                console.log(data);
                return[200,jsonDB.GetAccCodeListLike];
            });
            //应收保费挂账查询
            $httpBackend.whenPOST(ApiPath.api.transaccount).respond(function (method, url, data) {
                console.log(data);
                return[200,jsonDB.Transaccount];
            });
            //客户化收付信息查询queryCustomerInfo
            $httpBackend.whenPOST(ApiPath.api.queryCustomerInfo).respond(function (method, url, data) {
                console.log(data);
                return[200,jsonDB.QueryCustomerInfo];
            });
            //宋知府平台查询
            $httpBackend.whenPOST(config.backend.ip+config.backend.searchReparationsDto).respond(function (method, url, data) {
                console.log(data);
                return[200,jsonDB.searchReparationsDto];
            });
            //批量业务缴费--查询
            $httpBackend.whenPOST(ApiPath.api.collectionSearchs).respond(function (method, url, data) {
               console.log(data);
               return [200, jsonDB.CollectionSearchs];
            });
            //无单预收查询
            $httpBackend.whenPOST(ApiPath.api.temporary).respond(function (method, url, data) {
                return [200, jsonDB.temporary];
            });
            //手工转无单预收提交
            $httpBackend.whenPOST(ApiPath.api.unifySerialNum).respond(function (method, url, data) {
                return [200, jsonDB.unifySerialNum];
            });
            //退无单预收查询
            $httpBackend.whenPOST(ApiPath.api.tsearchReparations).respond(function (method, url, data) {
                return [200, jsonDB.tsearchReparations];
            });
            //退无单预收新增--查询
            $httpBackend.whenPOST(ApiPath.api.addsearchReparations).respond(function (method, url, data) {
                return [200, jsonDB.addsearchReparations];
            });
            //退暂收款
            $httpBackend.whenPOST(ApiPath.api.availableFee).respond(function (method, url, data) {
                return [200, jsonDB.availableFee];
            });
            //退暂收款-提交
            $httpBackend.whenPOST(ApiPath.api.lisr).respond(function (method, url, data) {
                return [200, jsonDB.lisr];
            });
            //账户归属机构（成功）
            $httpBackend.whenPOST(ApiPath.api.queryAllCenter).respond(function (method, url, data) {
                return [200, jsonDB.queryAllCenter];
            });
            //导入目标银行账户（成功）
            $httpBackend.whenPOST(ApiPath.api.queryBankAcount).respond(function (method, url, data) {
                return [200, jsonDB.queryBankAcount];
            });
            //手工转无单预收新增查询
            $httpBackend.whenPOST(ApiPath.api.tonyisearchReparations).respond(function (method, url, data) {
                return [200, jsonDB.tonyisearchReparations];
            });
            //手工转无单预收提交选择
            $httpBackend.whenPOST(ApiPath.api.noneusedie).respond(function (method, url, data) {
                return [200, jsonDB.noneusedie];
            });
            //批量业务缴费--导入
            $httpBackend.whenPOST(ApiPath.api.importCondition).respond(function (method, url, data) {
               return [200, jsonDB.importCondition];
            });
            //批量业务缴费--成功清单查看列表
            $httpBackend.whenPOST(ApiPath.api.showImptMassage).respond(function (method, url, data) {
                return [200, jsonDB.ShowImptMassage];
            });
            //再保结算-结算单查询结算-查询
            $httpBackend.whenPOST(ApiPath.api.reinSearch).respond(function (method, url, data) {
                console.log(data);
                return[200,jsonDB.ReinSearch];
            });
            //再保结算-结算单查询结算-详情
            $httpBackend.whenPOST(ApiPath.api.reinQueryDetail).respond(function (method, url, data) {
                console.log(data);
                return[200,jsonDB.ReinQueryDetail];
            });
            //再保结算-结算单查询结算-再保查询
            $httpBackend.whenPOST(ApiPath.api.reinDataQuery).respond(function (method, url, data) {
                console.log(data);
                return[200,jsonDB.ReinDataQuery];
            });
            //再保结算-结算单查询结算-再保确认保存
            $httpBackend.whenPOST(ApiPath.api.settlementSave).respond(function (method, url, data) {
                console.log(data);
                return[200,jsonDB.SettlementSave];
            });
            //再保结算-生成再保结算单查询-查询
            $httpBackend.whenPOST(ApiPath.api.reinCreateQuery).respond(function (method, url, data) {
                console.log(data);
                return[200,jsonDB.ReinCreateQuery];
            });
            //再保结算-生成再保结算单查询-详情
            $httpBackend.whenPOST(ApiPath.api.reinQueryData).respond(function (method, url, data) {
                console.log(data);
                return[200,jsonDB.ReinQueryData];
            });
            //再保结算-生成再保结算单查询-结付
            $httpBackend.whenPOST(ApiPath.api.reinPay).respond(function (method, url, data) {
                console.log(data);
                return[200,jsonDB.ReinPay];
            });
            //再保结算-生成再保结算单查询-结付确认
            $httpBackend.whenPOST(ApiPath.api.reinConfirm).respond(function (method, url, data) {
                console.log(data);
                return[200,jsonDB.ReinConfirm];
            });
            //再保分入接口
            $httpBackend.whenPOST(ApiPath.api.imSettleSearch).respond(function (method, url, data) {
                console.log(data);
                return[200,jsonDB.ImSettleSearch];
            });
            //再保分入业务详情
            $httpBackend.whenPOST(ApiPath.api.importQueryDetail).respond(function (method, url, data) {
                console.log(data);
                return[200,jsonDB.ImportQueryDetail];
            });
            //再保分入提交接口
            $httpBackend.whenPOST(ApiPath.api.importSubmit).respond(function (method, url, data) {
                console.log(data);
                return[200,jsonDB.ImportSubmit];
            });
            //再保分出业务
            $httpBackend.whenPOST(ApiPath.api.exSettleSearch).respond(function (method, url, data) {
                console.log(data);
                return[200,jsonDB.ExSettleSearch];
            });
            //再保分出确认
            $httpBackend.whenPOST(ApiPath.api.exportSubmit).respond(function (method, url, data) {
                console.log(data);
                return[200,jsonDB.ExportSubmit];
            });

            //再保分出业务详情
            $httpBackend.whenPOST(ApiPath.api.exportQueryDetail).respond(function (method, url, data) {
                console.log(data);
                return[200,jsonDB.ExportQueryDetail];
            });
            //结算单详情
            $httpBackend.whenPOST(ApiPath.api.taxDetail).respond(function (method, url, data) {
                console.log(data);
                return[200,jsonDB.TaxDetail];
            });
            //批量业务缴费--删除
            $httpBackend.whenPOST(ApiPath.api.deleteImp).respond(function (method, url, data) {
                return [200, jsonDB.deleteImp];
            });
            //批量业务缴费--缴费
            $httpBackend.whenPOST(config.backend.ip+config.backend.batchServicePayment).respond(function (method, url, data) {
                return [200, jsonDB.batchServicePayment];
            });
            //银行流水导入
            $httpBackend.whenPOST(ApiPath.api.submitImportDataAdd).respond(function (method, url, data) {
                return [200, jsonDB.submitImportDataAdd];
            });
            //导入目标银行账号
            $httpBackend.whenPOST(ApiPath.api.queryBankAcount).respond(function (method, url, data) {
                return [200, jsonDB.queryBankAcount];
            });
            //银行文件下载
            //$httpBackend.whenPOST(ApiPath.api.queryMain).respond(function (method, url, data) {
            //    return [200, jsonDB.queryMain];
            //});
            //手续费发票查询条件
            $httpBackend.whenPOST(ApiPath.api.searchReparations).respond(function (method, url, data) {
               return [200, jsonDB.searchReparations];
            });
            //手续费发票登记信息
            $httpBackend.whenPOST(ApiPath.api.payLossInfo).respond(function (method, url, data) {
               return [200, jsonDB.payLossInfo];
            });
            //插入多条发票数据
            $httpBackend.whenPOST(ApiPath.api.payLossVerify).respond(function (method, url, data) {
               return [200, jsonDB.payLossVerify];
            });
            //发票查询
            $httpBackend.whenPOST(ApiPath.api.findAllInvoice).respond(function (method, url, data) {
               return [200, jsonDB.findAllInvoice];
            });
            // 进项发票信息登记查询
            $httpBackend.whenPOST(ApiPath.api.invoiceRegisterQuery).respond(function (method, url, data) {
               return [200, jsonDB.invoiceRegisterQuery];
            });
            // 进项发票信息取消登记/转出查询
            $httpBackend.whenPOST(ApiPath.api.cancelROQuery).respond(function (method, url, data) {
                return [200, jsonDB.cancelROQuery];
            });
            //进项发票信息登记导出
            $httpBackend.whenPOST(ApiPath.api.downExcel).respond(function (method, url, data) {
                return [200, jsonDB.downExcel];
            });
            // //进项发票信息登记modal
            $httpBackend.whenPOST(ApiPath.api.confirm).respond(function (method, url, data) {
                return [200, jsonDB.confirm];
            });
            // //进项发票信息登记modal2查询
            $httpBackend.whenPOST(ApiPath.api.search).respond(function (method, url, data) {
                return [200, jsonDB.search];
            });
            //取消进项发票信息登记转出
            $httpBackend.whenPOST(ApiPath.api.cancelOut).respond(function (method, url, data) {
                return [200, jsonDB.cancelOut];
            });
            // //进项发票信息转出全部--查询
            $httpBackend.whenPOST(ApiPath.api.invoiceOutQuery).respond(function (method, url, data) {
                return [200, jsonDB.invoiceOutQuery];
            });
            // //进项发票转出全部--确认
            $httpBackend.whenPOST(ApiPath.api.invoiceOutConfirm).respond(function (method, url, data) {
                return [200, jsonDB.invoiceOutConfirm];
            });
            //进项发票转出部分--modal--查询
            $httpBackend.whenPOST(ApiPath.api.invoiceOutsearch).respond(function (method, url, data) {
                return [200, jsonDB.invoiceOutsearch];
            });
            //进项发票转出部分--确认
            $httpBackend.whenPOST(ApiPath.api.invoiceOutSomeConfirm).respond(function (method, url, data) {
                return [200, jsonDB.invoiceOutSomeConfirm];
            });
            // 进项发票--抵扣
            $httpBackend.whenPOST(ApiPath.api.deduction).respond(function (method, url, data) {
                return [200, jsonDB.deduction];
            });
            // 生成进项税抵扣凭证
            $httpBackend.whenPOST(ApiPath.api.produce).respond(function (method, url, data) {
                return [200, jsonDB.produce];
            });
            //红票查询
            $httpBackend.whenPOST(ApiPath.api.redInvoiceQuery).respond(function (method, url, data) {
                return [200, jsonDB.redInvoiceQuery];
            });
            //红票开票确认
            $httpBackend.whenPOST(ApiPath.api.checkRedInvoiceSubmit).respond(function (method, url, data) {
                return [200, jsonDB.checkRedInvoiceSubmit];
            });
            //数据源信息配置--查询
            $httpBackend.whenPOST(ApiPath.api.dataConfigSearch).respond(function (method, url, data) {
                return [200, jsonDB.dataConfigSearch];
            });
            //数据源信息配置--删除
            $httpBackend.whenPOST(ApiPath.api.dataConfigRemove).respond(function (method, url, data) {
                return [200, jsonDB.dataConfigRemove];
            });
            //数据源信息配置--保存
            $httpBackend.whenPOST(ApiPath.api.dataConfigSave).respond(function (method, url, data) {
                return [200, jsonDB.dataConfigSave];
            });
            //数据源信息配置--修改保存
            $httpBackend.whenPOST(ApiPath.api.dataConfigModify).respond(function (method, url, data) {
                return [200, jsonDB.dataConfigModify];
            });
            //共保支付单查询条件
            $httpBackend.whenPOST(ApiPath.api.queryCoinsSettlePlanForInvoice).respond(function (method, url, data) {
                return [200, jsonDB.queryCoinsSettlePlanForInvoice];
            });
            //共保发票登记信息
            $httpBackend.whenPOST(ApiPath.api.inToInvoiceCoinsSettlePlanView).respond(function (method, url, data) {
               return [200, jsonDB.inToInvoiceCoinsSettlePlanView];
            });
            ////插入多条共保发票数据
            $httpBackend.whenPOST(ApiPath.api.saveCoinsSettlePlanInvoices).respond(function (method, url, data) {
               return [200, jsonDB.saveCoinsSettlePlanInvoices];
            });
            //共保发票查询
            $httpBackend.whenPOST(ApiPath.api.findAllInvoiceForCoinsSettlePlan).respond(function (method, url, data) {
               return [200, jsonDB.findAllInvoiceForCoinsSettlePlan];
            });
            //理赔费用发票查询条件
            $httpBackend.whenPOST(ApiPath.api.queryLossPlanForInvoice).respond(function (method, url, data) {
               return [200, jsonDB.queryLossPlanForInvoice];
            });
            //理赔费用发票登记信息
            $httpBackend.whenPOST(ApiPath.api.payComInfo).respond(function (method, url, data) {
               return [200, jsonDB.payComInfo];
            });
            //理赔费用插入多条发票登记信息
            $httpBackend.whenPOST(ApiPath.api.payComVerify).respond(function (method, url, data) {
               return [200, jsonDB.payComVerify];
            });
            //理赔手续费发票查询
            $httpBackend.whenPOST(ApiPath.api.findAllInvoiceForCompensate).respond(function (method, url, data) {
               return [200, jsonDB.findAllInvoiceForCompensate];
            });
            //代收代付任务处理
            $httpBackend.whenPOST(ApiPath.api.entrustApplyQuery).respond(function (method, url, data) {
               return [200, jsonDB.entrustApplyQuery];
            });
            //代收代付申请登记
            $httpBackend.whenPOST(ApiPath.api.entrustApplyView).respond(function (method, url, data) {
                return [200, jsonDB.entrustApplyView];
            });
            //代收代付申请登记插入
            $httpBackend.whenPOST(ApiPath.api.entrustApplyConfirm).respond(function (method, url, data) {
                return [200, jsonDB.entrustApplyConfirm];
            });
            //代收代付撤销查询
            $httpBackend.whenPOST(ApiPath.api.entrustCancelQuery).respond(function (method, url, data) {
                return [200, jsonDB.entrustCancelQuery];
            });
            //代收代付撤销
            $httpBackend.whenPOST(ApiPath.api.entrustCancelConfirm).respond(function (method, url, data) {
                return [200, jsonDB.entrustCancelConfirm];
            });
            // 代收代付双击域--受托单位
            $httpBackend.whenPOST(ApiPath.api.queryAllCenterUpByComCode).respond(function (method, url, data) {
                return [200, jsonDB.queryAllCenterUpByComCode];
            });
            // 收付员日结日历初始化
            $httpBackend.whenPOST(ApiPath.api.initDailyDto).respond(function (method, url, data) {
                return [200, jsonDB.initDailyDto];
            });
            // 收付员日结查询汇总+补充信息
            $httpBackend.whenPOST(ApiPath.api.queryDailyAddtional).respond(function (method, url, data) {
                return [200, jsonDB.queryDailyAddtional];
            });
            //收付员立即日结
            $httpBackend.whenPOST(ApiPath.api.endDayDto).respond(function (method, url, data) {
                return [200, jsonDB.endDayDto];
            });
            //收付员取消日结
            $httpBackend.whenPOST(ApiPath.api.cancelDailyDto).respond(function (method, url, data) {
                return [200, jsonDB.cancelDailyDto];
            });
            //日结失败清单-》查看错误详情信息
            $httpBackend.whenPOST(ApiPath.api.queryDailyErrorMsg).respond(function (method, url, data) {
                return [200, jsonDB.queryDailyErrorMsg];
            });
            //日结主表查询
            $httpBackend.whenPOST(ApiPath.api.queryDailyPaymentMain).respond(function (method, url, data) {
                return [200, jsonDB.queryDailyPaymentMain];
            });
            //日结单汇总表查询
            $httpBackend.whenPOST(ApiPath.api.queryDailyPaymentSum).respond(function (method, url, data) {
                return [200, jsonDB.queryDailyPaymentSum];
            });
            //日结流水单查询
            $httpBackend.whenPOST(ApiPath.api.queryDailyPaymentDetail).respond(function (method, url, data) {
                return [200, jsonDB.queryDailyPaymentDetail];
            });
            //凭证查询
            $httpBackend.whenPOST(ApiPath.api.QueryVoucherDto).respond(function (method, url, data) {
                return [200, jsonDB.QueryVoucherDto];
            });
            //凭证查询-业务信息
            $httpBackend.whenPOST(ApiPath.api.queryCertinoInfo).respond(function (method, url, data) {
                return [200, jsonDB.queryCertinoInfo];
            });
            //凭证查询-业务信息--综合
            $httpBackend.whenPOST(ApiPath.api.queryCertinoInfo2).respond(function (method, url, data) {
                return [200, jsonDB.queryCertinoInfo2];
            });
            //自动日结查询
            $httpBackend.whenPOST(ApiPath.api.queryAutoDailyPSet).respond(function (method, url, data) {
                return [200, jsonDB.queryAutoDailyPSet];
            });
            //新增自动日结保存
            $httpBackend.whenPOST(ApiPath.api.save).respond(function (method, url, data) {
                return [200, jsonDB.save];
            });
            //日结单日结审核
            $httpBackend.whenPOST(ApiPath.api.preClaimModify).respond(function (method, url, data) {
                return [200, jsonDB.preClaimModify];
            });
            //日结立即执行
            $httpBackend.whenPOST(ApiPath.api.immAutoDaily).respond(function (method, url, data) {
                return [200, jsonDB.immAutoDaily];
            });
            //凭证详情
            $httpBackend.whenPOST(ApiPath.api.queryCheckCondition).respond(function (method, url, data) {
                return [200, jsonDB.queryCheckCondition];
            });
            //凭证分录信息查询
            $httpBackend.whenPOST(ApiPath.api.queryVoucherDetail).respond(function (method, url, data) {
                return [200, jsonDB.queryVoucherDetail];
            });
            //凭证复核查询
            $httpBackend.whenPOST(ApiPath.api.queryDailyPaymentCheck).respond(function (method, url, data) {
                return [200, jsonDB.queryDailyPaymentCheck];
            });
            //点击凭证复核展示选中凭证详情
            $httpBackend.whenPOST(ApiPath.api.queryDailyPaymentVoucherCheckD).respond(function (method, url, data) {
                return [200, jsonDB.queryDailyPaymentVoucherCheckD];
            });
            //代理经纪人--双击域
            $httpBackend.whenPOST(ApiPath.api.queryAgent).respond(function (method, url, data) {
                return [200, jsonDB2.queryAgent];
            });
            //银行账户/转销信息
            $httpBackend.whenPOST(ApiPath.api.payWayAccountDto).respond(function (method, url, data) {
                return [200, jsonDB2.payWayAccountDto];
            });
            //原始凭证复核
            $httpBackend.whenPOST(ApiPath.api.verifyVoucherNo).respond(function (method, url, data) {
                return [200, jsonDB.verifyVoucherNo];
            });
            //合并单证复核
            $httpBackend.whenPOST(ApiPath.api.verifyMergeVoucherNo).respond(function (method, url, data) {
                return [200, jsonDB.verifyMergeVoucherNo];
            });
            //凭证合并
            $httpBackend.whenPOST(ApiPath.api.voucherCombine).respond(function (method, url, data) {
                return [200, jsonDB.voucherCombine];
            });
            //取消凭证合并
            $httpBackend.whenPOST(ApiPath.api.cancelMergeVoucherNo).respond(function (method, url, data) {
                return [200, jsonDB.cancelMergeVoucherNo];
            });
            //获取菜单
            $httpBackend.whenPOST(ApiPath.api.getMenus).respond(function (method, url, data) {
                console.log(data);
                return[200,jsonDB.getMenus];
            });
            //银行账号删除
            $httpBackend.whenPOST(config.backend.ip+config.backend.deleteBankNo).respond(function (method, url, data) {
                return [200, jsonDB.DeleteBank];
            });
            //车船税管理--生成结缴单
            $httpBackend.whenPOST(ApiPath.api.payListQuery).respond(function (method, url, data) {
                console.log(data);
                return[200,jsonDB.PayListSearch];
            });
            //车船税管理-上传
            $httpBackend.whenPOST(ApiPath.api.payListImport).respond(function (method, url, data) {
                console.log(data);
                return[200,jsonDB.PayListImport];
            });
            //支付平台审核
            $httpBackend.whenPOST(config.backend.ip+config.backend.searchApprovedDto).respond(function (method, url, data) {
                return[200,jsonDB.searchApproved];
            });
            //会计期间修改
            $httpBackend.whenPOST(ApiPath.api.changeAccountDto).respond(function (method, url, data) {
                return[200,jsonDB.ChangeAccountDto];
            });
            //工作日初始化
            $httpBackend.whenPOST(ApiPath.api.initWorker).respond(function (method, url, data) {
                return[200,jsonDB.InitWorker];
            });
            //工作日提交
            $httpBackend.whenPOST(ApiPath.api.submitWorkDay).respond(function (method, url, data) {
                return[200,jsonDB.SubmitWorkDay];
            });
            //权限管理查询
            $httpBackend.whenPOST(ApiPath.api.searchPriManDto).respond(function (method, url, data) {
                return[200,jsonDB.SearchPriMan];
            });
            //岗位配置查询
            $httpBackend.whenPOST(ApiPath.api.searchPostConfigDto).respond(function (method, url, data) {
                return[200,jsonDB.PostConfig];
            });
            //岗位配置修改保存
            $httpBackend.whenPOST(ApiPath.api.savePostConfigDto).respond(function (method, url, data) {
                return[200,jsonDB.SavePostConfig];
            });
            //岗位管理查询
            $httpBackend.whenPOST(ApiPath.api.searchPostManageDto).respond(function (method, url, data) {
                return[200,jsonDB.PostManage];
            });
            //岗位管理详情
            $httpBackend.whenPOST(ApiPath.api.getPostDetailsTreeDto).respond(function (method, url, data) {
                return[200,jsonDB2.PostDetails];
            });
            //岗位详情保存
            $httpBackend.whenPOST(ApiPath.api.savePostDetailsDto).respond(function (method, url, data) {
                return[200,jsonDB.SavePostDetails];
            });
            //岗位管理删除
            $httpBackend.whenPOST(ApiPath.api.deletePostManageDto).respond(function (method, url, data) {
                return[200,jsonDB.DeletePostManage];
            });
            //操作员查询
            $httpBackend.whenPOST(ApiPath.api.searchOperatorDto).respond(function (method, url, data) {
                return[200,jsonDB.SearchOperator];
            });
            //兑换率新增
            $httpBackend.whenPOST(ApiPath.api.saveNewExchange).respond(function (method, url, data) {
                return[200,jsonDB.SaveNewExchange];
            });
            //兑换率修改
            $httpBackend.whenPOST(ApiPath.api.saveReviseExchange).respond(function (method, url, data) {
                return[200,jsonDB.ModifyExc];
            });
            //收付员-新增
            $httpBackend.whenPOST(ApiPath.api.saveNewCasher).respond(function (method, url, data) {
                return[200,jsonDB.SaveNewCasher];
            });
            //收付员-联动
            $httpBackend.whenPOST(ApiPath.api.selChange).respond(function (method, url, data) {
                return[200,jsonDB.SelChange];
            });
            //收付员-删除
            $httpBackend.whenPOST(ApiPath.api.delCashDto).respond(function (method, url, data) {
                return[200,jsonDB.DelCash];
            });
            //收付员-修改查询
            $httpBackend.whenPOST(ApiPath.api.modifyCash).respond(function (method, url, data) {
                return[200,jsonDB.ModifyCash];
            });
            //收付员-修改保存
            $httpBackend.whenPOST(ApiPath.api.saveReviseCasher).respond(function (method, url, data) {
                return[200,jsonDB.SaveRevise];
            });
            //账龄查询
            $httpBackend.whenPOST(ApiPath.api.agingQuery).respond(function (method, url, data) {
                return[200,jsonDB.AgingQuery];
            });
            //账龄新增
            $httpBackend.whenPOST(ApiPath.api.agingAdd).respond(function (method, url, data) {
                return[200,jsonDB.AgingAdd];
            });
            //账龄删除
            $httpBackend.whenPOST(ApiPath.api.agingDelete).respond(function (method, url, data) {
                return[200,jsonDB.AgingDelete];
            });
            //账龄修改查询
            $httpBackend.whenPOST(ApiPath.api.agingModify).respond(function (method, url, data) {
                return[200,jsonDB.AgingModify];
            });
            //账龄修改保存
            $httpBackend.whenPOST(ApiPath.api.agingSave).respond(function (method, url, data) {
                return[200,jsonDB.AgingSave];
            });
            //银行账号详情
            $httpBackend.whenPOST(ApiPath.api.bankDetail).respond(function (method, url, data) {
                return [200, jsonDB.BankDetail];
            });
            //银行账号新增
            $httpBackend.whenPOST(ApiPath.api.bankNewAdd).respond(function (method, url, data) {
                return [200, jsonDB.BankNewAdd];
            });
            //银行账号修改保存
            $httpBackend.whenPOST(ApiPath.api.saveBank).respond(function (method, url, data) {
                return [200, jsonDB.SaveBank];
            });
            //银行账号删除
            $httpBackend.whenPOST(ApiPath.api.deleteBankNo).respond(function (method, url, data) {
                return [200, jsonDB.DeleteBank];
            });
            //基础设置--银行账户维护--银行商户信息查询
            $httpBackend.whenPOST(ApiPath.api.searchBankMerchant).respond(function (method, url, data) {
                return [200, jsonDB.searchBankMerchant];
            });
            //基础设置--银行账户维护--银行商户信息新增
            $httpBackend.whenPOST(ApiPath.api.operationBankMerchant).respond(function (method, url, data) {
                return [200, jsonDB.operationBankMerchant];
            });
            //综合查询-凭证查询
            $httpBackend.whenPOST(ApiPath.api.voucherQuery).respond(function (method, url, data) {
                return [200, jsonDB.VoucherQuery];
            });

            ////到款确认-查询
            $httpBackend.whenPOST(ApiPath.api.confirmQuery).respond(function (method, url, data) {
               console.log(data);
               return[200,jsonDB.ConfirmQuery];
            });
            ////到款确认-提交信息
            $httpBackend.whenPOST(ApiPath.api.submitDetail).respond(function (method, url, data) {
               console.log(data);
               return[200,jsonDB.SubmitDetail];
            });
            ////到款确认-收付方式
            $httpBackend.whenPOST(ApiPath.api.payWayQuery).respond(function (method, url, data) {
               console.log(data);
               return[200,jsonDB2.PayWayQuery];
            });
            ////到款确认-银行信息
            $httpBackend.whenPOST(ApiPath.api.confirmBankData).respond(function (method, url, data) {
               console.log(data);
               return[200,jsonDB.ConfirmBank];
            });
            //到款确认-提交
            $httpBackend.whenPOST(ApiPath.api.accountSubmit).respond(function (method, url, data) {
                console.log(data);
                return[200,jsonDB2.AccountSubmit];
            });
            ////自动到款确认
            $httpBackend.whenGET(ApiPath.api.paymentAndSpayCheck).respond(function (method, url, data) {
                return[200,jsonDB.paymentAndSpayCheck];
            });
            // 付赔款-查询
            $httpBackend.whenPOST(ApiPath.api.claimQuery).respond(function (method, url, data) {
                return [200, jsonDB2.ClaimQuery];
            });
            //付赔款信息
            $httpBackend.whenPOST(ApiPath.api.getClaimDetail).respond(function (method, url, data) {
                console.log(data);
                return[200,jsonDB2.GetClaimDetail];
            });
            //查询银行账号下拉列表
            $httpBackend.whenPOST(ApiPath.api.queryNoBillBankAcount).respond(function (method, url, data) {
                console.log(data);
                return[200,jsonDB2.QueryBankAcountOut];
            });
            //付赔款信息提交
            $httpBackend.whenPOST(ApiPath.api.claimSubmit).respond(function (method, url, data) {
                console.log(data);
                return[200,jsonDB2.ClaimSubmit];
            });
            //共保业务-查询
            $httpBackend.whenPOST(ApiPath.api.commonQuery).respond(function (method, url, data) {
                console.log(data);
                return[200,jsonDB.CommonQuery];
            });
            ///共保业务-提交
            $httpBackend.whenPOST(ApiPath.api.commSubmit).respond(function (method, url, data) {
                console.log(data);
                return[200,jsonDB.CommonSubmit];
            });
            //销项开票回写-查询
            $httpBackend.whenPOST(ApiPath.api.outPutBuleInvoiceSubmit).respond(function (method, url, data) {
                console.log(data);
                return[200,jsonDB.outPutBuleInvoiceSubmit];
            });
            //税会调差查询
            $httpBackend.whenPOST(ApiPath.api.theDifferentialBlueInvoiceSubmit).respond(function (method, url, data) {
                console.log(data);
                return[200,jsonDB.theDifferentialBlueInvoiceSubmit];
            });
            //蓝票开具申请-查询
            $httpBackend.whenPOST(ApiPath.api.invoiceQuery).respond(function (method, url, data) {
                console.log(data);
                return[200,jsonDB.invoiceQuery];
            });

            //蓝票开具申请-判断复选框是否可以勾选
            $httpBackend.whenPOST(ApiPath.api.IsTrueSubmit).respond(function (method, url, data) {
                console.log(data);
                return[200,jsonDB.IsTrueSubmit];
            });
            //蓝票开具申请-勾选提交
            $httpBackend.whenPOST(ApiPath.api.checkInvoiceSubmit).respond(function (method, url, data) {
                console.log(data);
                return[200,jsonDB.checkInvoiceSubmit];
            });
            //蓝票开具申请-打印申请
            $httpBackend.whenPOST(ApiPath.api.blueInvoiceSubmitModal).respond(function (method, url, data) {
                console.log(data);
                return[200,jsonDB.blueInvoiceSubmitModal];
            });
            //批量蓝票开具申请-查询
            $httpBackend.whenPOST(ApiPath.api.batchInvoiceImport).respond(function (method, url, data) {
                console.log(data);
                return[200,jsonDB.batchInvoiceImport];
            });
            //批量蓝票开具申请-申请
            $httpBackend.whenPOST(ApiPath.api.batchInvoiceSubmit).respond(function (method, url, data) {
                console.log(data);
                return[200,jsonDB.batchInvoiceSubmit];
            });
            //已开发票-查询
            $httpBackend.whenPOST(ApiPath.api.invoiceInfoSelect).respond(function (method, url, data) {
                console.log(data);
                return[200,jsonDB.invoiceInfoSelect];
            });
            //已开发票-明细
            $httpBackend.whenPOST(ApiPath.api.invoiceInfoDetailQuery).respond(function (method, url, data) {
                console.log(data);
                return[200,jsonDB.invoiceInfoDetailQuery];
            });
            //购方纳税人信息-查询
            $httpBackend.whenPOST(ApiPath.api.taxpayerNext).respond(function (method, url, data) {
                console.log(data);
                return[200,jsonDB.taxpayerNext];
            });
            //购方纳税人信息-保存
            $httpBackend.whenPOST(ApiPath.api.taxpayerSubmit).respond(function (method, url, data) {
                console.log(data);
                return[200,jsonDB.taxpayerSubmit];
            });
            //共保业务--结算单查询
            $httpBackend.whenPOST(ApiPath.api.payreSearch).respond(function (method, url, data) {
                console.log(data);
                return[200,jsonDB.PayreSearch];
            });
            //共保-结算单查询-详情
            $httpBackend.whenPOST(ApiPath.api.payComDetail).respond(function (method, url, data) {
                console.log(data);
                return[200,jsonDB.PayComDetail];
            });
            //共保业务-结算单修改
            $httpBackend.whenPOST(ApiPath.api.payreModify).respond(function (method, url, data) {
                console.log(data);
                return[200,jsonDB.PayreModify];
            });
            //共保业务-支付前确认
            $httpBackend.whenPOST(ApiPath.api.payrefSubmitData).respond(function (method, url, data) {
                console.log(data);
                return[200,jsonDB.PayrefSubmitData];
            });
            //共保业务-结算单支付
            $httpBackend.whenPOST(ApiPath.api.payrefSubmit).respond(function (method, url, data) {
                console.log(data);
                return[200,jsonDB.PayrefSubmit];
            });
            //支票到账确认-查询
            $httpBackend.whenPOST(config.backend.ip+config.backend.checksQuery).respond(function (method, url, data) {
                console.log(data);
                return[200,jsonDB.ChecksQuery];
            });
            $httpBackend.whenPOST(config.backend.ip+config.backend.checksContinue).respond(function (method, url, data) {
                console.log(data);
                return[200,jsonDB.ChecksContinue];
            });
            ///支票到账确认-提交
            $httpBackend.whenPOST(config.backend.ip+config.backend.checksSubmit).respond(function (method, url, data) {
                console.log(data);
                return[200,jsonDB.ChecksSubmit];
            });
            //刷卡凭证查询
            $httpBackend.whenPOST(config.backend.ip+config.backend.checkQuery).respond(function (method, url, data) {
                console.log(data);
                return[200,jsonDB.CheckQuery];
            });
            //刷卡凭证确认
            $httpBackend.whenPOST(config.backend.ip+config.backend.voucherSubmit).respond(function (method, url, data) {
                console.log(data);
                return[200,jsonDB.VoucherSubmit];
            });
            //查询统计-凭证查询
            $httpBackend.whenPOST(config.backend.ip+config.backend.voucherQuery).respond(function (method, url, data) {
                console.log(data);
                return[200,jsonDB.VoucherQuery];
            });
            //生成结缴单提交
            $httpBackend.whenPOST(ApiPath.api.payLsitSubmit).respond(function (method, url, data) {
                console.log(data);
                return[200,jsonDB.PayLsitSubmit];
            });
            //税务结缴查询
            $httpBackend.whenPOST(ApiPath.api.settlementQuery).respond(function (method, url, data) {
                console.log(data);
                return[200,jsonDB.SettlementQuery];
            });
            //税务结缴详情
            $httpBackend.whenPOST(ApiPath.api.settleDetail).respond(function (method, url, data) {
                console.log(data);
                return[200,jsonDB.SettleDetail];
            });
            //税务结缴提交
            $httpBackend.whenPOST(ApiPath.api.settleSubmitDetail).respond(function (method, url, data) {
                console.log(data);
                return[200,jsonDB.SettleSubmitDetail];
            });
            //税务结缴银行信息
            $httpBackend.whenPOST(ApiPath.api.settleBankDetail).respond(function (method, url, data) {
                console.log(data);
                return[200,jsonDB.SettleBankDetail];
            });
            //结算单作废
            $httpBackend.whenPOST(ApiPath.api.taxDelete).respond(function (method, url, data) {
                console.log(data);
                return[200,jsonDB.TaxDelete];
            });
            //结缴单管理查询
            $httpBackend.whenPOST(ApiPath.api.payTaxQuery).respond(function (method, url, data) {
                console.log(data);
                return[200,jsonDB.PayTaxQuery];
            });
            //税务结缴提交
            $httpBackend.whenPOST(config.backend.ip+config.backend.payTaxSubmit).respond(function (method, url, data) {
                console.log(data);
                return[200,jsonDB.PayTaxSubmit];
            });
            //收付场景--查询
            $httpBackend.whenPOST(ApiPath.api.sceneSearch).respond(function (method, url, data) {
                console.log(data);
                return[200,jsonDB.SceneSearch];
            });
            //收付场景--新增
            $httpBackend.whenPOST(ApiPath.api.addScene).respond(function (method, url, data) {
                console.log(data);
                return[200,jsonDB.AddScene];
            });
            //收付场景--修改
            $httpBackend.whenPOST(ApiPath.api.modifyScene).respond(function (method, url, data) {
                console.log(data);
                return[200,jsonDB.ModifyScene];
            });
            //收付场景--删除
            $httpBackend.whenPOST(ApiPath.api.deleteScene).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.DeleteScene];
            });
            //收付场景--修改确认
            $httpBackend.whenPOST(ApiPath.api.updateSceneSave).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.UpdateSceneSave];
            });
            //收付类型--修改确认
            $httpBackend.whenPOST(ApiPath.api.updateTypeSave).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.UpdateTypeSave];
            });

            //收付类型--查询
            $httpBackend.whenPOST(ApiPath.api.typeQuery).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.TypeQuery];
            });
            //收付类型--新增
            $httpBackend.whenPOST(ApiPath.api.addType).respond(function (method, url, data) {
                console.log(data);
                return[200,jsonDB.AddType];
            });
            //收付类型--修改
            $httpBackend.whenPOST(config.backend.ip+config.backend.updateType).respond(function (method, url, data) {
                console.log(data);
                return[200,jsonDB.UpdateType];
            });
            //收付类型--删除
            $httpBackend.whenPOST(ApiPath.api.deleteType).respond(function (method, url, data) {
                console.log(data);
                return[200,jsonDB.DeleteType];
            });
            //会计科目树查询(new)
            $httpBackend.whenPOST(ApiPath.api.accountGroup).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.accountGroupData];
            });
            //会计科目树形菜单查询(new)
            $httpBackend.whenPOST(ApiPath.api.searchAccount).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.SearchAccount];
            });
            //会计科目保存(new)
            $httpBackend.whenPOST(ApiPath.api.saveAccounting).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.saveAccounting];
            });
            //新增自动日结保存
            $httpBackend.whenPOST(ApiPath.api.save).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.save];
            });
            //会计科目-辅助核算保存(new)
            $httpBackend.whenPOST(ApiPath.api.saveSupAccount).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.saveSupAccount];
            });
            // 会计科目-辅助核算删除(调通)
            $httpBackend.whenPOST(config.backend.ip+config.backend.delSupInfo).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.DelSupInf];
            });
            //凭证模版设置-文件上传
            $httpBackend.whenPOST(ApiPath.api.excelImport).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.excelImport];
            });
            //核算项树查询(new)
            $httpBackend.whenPOST(ApiPath.api.accountItemGroup).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.accountItemGroupData];
            });
            // 辅助核算项维护树形菜单查询(new)
            $httpBackend.whenPOST(ApiPath.api.queryAccount).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.queryAccount];
            });
            // 辅助核算项--保存
            $httpBackend.whenPOST(ApiPath.api.saveArticleCode).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.saveArticleCode];
            });
            // 收付原因查询  (new)
            $httpBackend.whenPOST(ApiPath.api.payReason).respond(function (method, url, data) {
                return [200, jsonDB.PayReason];
            });
            // 银行账号查询  (完成)new
            $httpBackend.whenPOST(ApiPath.api.searchBank).respond(function (method, url, data) {
                return [200, jsonDB.SearchBank];
            });
            // 收付原因新增  (new)
            $httpBackend.whenPOST(ApiPath.api.addPayReason).respond(function (method, url, data) {
                return [200, jsonDB.AddPayReason];
            });
            // 收付原因修改  (new)
            $httpBackend.whenPOST(ApiPath.api.updatePayReason).respond(function (method, url, data) {
                return [200, jsonDB.updatePayReason];
            });
            // 收付原因删除 (new)
            $httpBackend.whenPOST(ApiPath.api.deletePayReason).respond(function (method, url, data) {
                return [200, jsonDB.DeletePayReason];
            });
            // 付款审核  (完成)
            $httpBackend.whenPOST(config.backend.ip+config.backend.paymentApproval).respond(function (method, url, data) {
                return [200, jsonDB.PaymentApproval];
            });
            // 付款确认，登记 (完成)
            $httpBackend.whenPOST(config.backend.ip+config.backend.paymentRegister).respond(function (method, url, data) {
                return [200, jsonDB.PaymentRegister];
            });
            // 付赔款查询  (完成)
            $httpBackend.whenPOST(config.backend.ip+config.backend.payIndemnitySearch).respond(function (method, url, data) {
                return [200, jsonDB.Indemnity];
            });
            // 付赔款确认  (完成)
            $httpBackend.whenPOST(config.backend.ip+config.backend.payIndemnityActivity).respond(function (method, url, data) {
                return [200, jsonDB.IndemnityConfirm];
            });
            // 逾期查询  (完成)
            $httpBackend.whenPOST(config.backend.ip+config.backend.overdueQuery).respond(function (method, url, data) {
                return [200, jsonDB.Indemnity];
            });
            //收银台复核成功查询
            $httpBackend.whenPOST(config.backend.ip+config.backend.searchSuccessDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.SearchSuccessDto];
            });
            //收银台失败成功查询(调通)
            $httpBackend.whenPOST(config.backend.ip+config.backend.searchFailDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.SearchFailDto];
            });
            //收付机构查询
            $httpBackend.whenPOST(ApiPath.api.searchPaymentInsDto).respond(function (method, url, data) {
               console.log(data);
               return [200, jsonDB.comSearch];
            });
             //收付机构下拉查询
             $httpBackend.whenPOST(ApiPath.api.comSelectData).respond(function (method, url, data) {
                 console.log(data);
                 return [200, jsonDB.ComSelectData];
             });
             //收付机构详情
             $httpBackend.whenPOST(ApiPath.api.comDetail).respond(function (method, url, data) {
                 console.log(data);
                 return [200, jsonDB.ComDetail];
             });
             //收付机构检查
             $httpBackend.whenPOST(ApiPath.api.comCheck).respond(function (method, url, data) {
                 console.log(data);
                 return [200, jsonDB.ComCheck];
             });
            //兑换率查询(调通)
            $httpBackend.whenPOST(ApiPath.api.searchExchangeDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.SearchExchangeDto];
            });
            //收付员设置查询(调通)
            $httpBackend.whenPOST(ApiPath.api.searchCashDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.SearchCashDto];
            });
            //收付员设置修改查询(调通)
            $httpBackend.whenPOST(config.backend.ip+config.backend.revisesearchCash).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.ReviseSearchCashDto];
            });
            //会计期间设置查询(new)
            $httpBackend.whenPOST(ApiPath.api.searchAccountData).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.SearchAccountData];
            });
            //收付方式查询(new)
            $httpBackend.whenPOST(ApiPath.api.searchPaymentData).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.SearchPaymentData];
            });
            //收付方式-新增（new）
            $httpBackend.whenPOST(ApiPath.api.saveNewPaymenter).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.SaveNewPaymenter];
            });
            //收付方式-删除（new）
            $httpBackend.whenPOST(ApiPath.api.delPaymentDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.DelPaymentDto];
            });
            //收付方式-修改（new）
            $httpBackend.whenPOST(ApiPath.api.saveRevisePaymenter).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.SaveRevisePayment];
            });
            //现金流量查询(调通)
            $httpBackend.whenPOST(config.backend.ip+config.backend.cashFlowData).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.CashFlowData];
            });
            //头部下拉查询(调通)
            $httpBackend.whenPOST(config.backend.ip+config.backend.headerData).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.HeaderData];
            });
            //工作日管理--查询
            $httpBackend.whenPOST(ApiPath.api.searchWorkMonth).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.SearchWorkMonth];
            });
            //工作日-重置resetWorkDayData
            $httpBackend.whenPOST(ApiPath.api.resetWorkDayData).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.ResetWorkDayData];
            });


            //日结日历标记查询
            $httpBackend.whenPOST(config.backend.ip+config.backend.dateMarkSearch).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.dateMarkSearch];
            });
            //错误日结查询
            $httpBackend.whenPOST(config.backend.ip+config.backend.dateErrorQuery).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.DateErrorQuery];
            });
            //日结更新
            $httpBackend.whenPOST(config.backend.ip+config.backend.dailyUpdate).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.DailyUpdate];
            });
            //日结日历标记查询
            $httpBackend.whenPOST(config.backend.ip+config.backend.dailySearch).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.dailySearch];
            });
            //银行流水查询
            $httpBackend.whenPOST(ApiPath.api.searchSerialDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.searchSerialDto];
            });
            //银行流水查询-删除
            $httpBackend.whenPOST(ApiPath.api.deleteSerialDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.deleteSerialDto];
            });
            //银行信息补录-查询
            $httpBackend.whenPOST(ApiPath.api.searchSupplementDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.searchSupplementDto];
            });
            //银行信息补录-提交
            $httpBackend.whenPOST(ApiPath.api.submitSupplementDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.submitSupplementDto];
            });
            //运维
            $httpBackend.whenPOST(ApiPath.api.payRefRecVouToFinance).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.payRefRecVouToFinance];
            });
            $httpBackend.whenPOST(ApiPath.api.transAccVouToFinance).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.transAccVouToFinance];
            });
            //非见费业务缴费查询
            $httpBackend.whenPOST(ApiPath.api.searchCollectionRegDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.searchCollectionRegDto];
            });
            //非见费业务缴费--新增查询
            $httpBackend.whenPOST(ApiPath.api.searchColRegAddDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.searchColRegAddDto];
            });
            //非见费业务缴费--作废
            $httpBackend.whenPOST(ApiPath.api.deleteCollectionDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.deleteCollectionDto];
            });
            //非见费业务缴费-新增保存
            $httpBackend.whenPOST(ApiPath.api.saveCollectionInfo).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.saveCollectionInfo];
            });
            //非见费业务缴费--查看详情列表
            $httpBackend.whenPOST(ApiPath.api.paymentNoticeListDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.searchColRegAddDto];
            });
            //非见费业务缴费-缴费方式|转账-现金
            $httpBackend.whenPOST(ApiPath.api.transferAccountsDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.transferAccountsDto];
            });
            //公共接口 缴费方式|转账||现金
            $httpBackend.whenPOST(ApiPath.api.toPaymentWay).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.toPaymentWay];
            });
            //公共接口 缴费方式|收银台
            $httpBackend.whenPOST(ApiPath.api.getPayUrl).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.getPayUrl];
            });
            //非见费业务缴费-缴费方式|收银台
            $httpBackend.whenPOST(ApiPath.api.cashierPayTypeDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.cashierPayTypeDto];
            });
            //非见费业务缴费--无单预收查询
            $httpBackend.whenPOST(ApiPath.api.searchNoBillDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.searchNoBillDto];
            });
            //非见费业务缴费--缴费金额为负
            $httpBackend.whenPOST(ApiPath.api.negativePayDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.saveCollectionInfo];
            });
            //预认领查询
            $httpBackend.whenPOST(ApiPath.api.searchPreClaimDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.searchPreClaimDto];
            });
            //预认领--缴费通知单查询
            $httpBackend.whenPOST(ApiPath.api.searchPaymentNoticeDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.searchPaymentNoticeDto];
            });
            //预认领--银行流水查询
            $httpBackend.whenPOST(ApiPath.api.searchBankFlowDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.searchBankFlowDto];
            });
            //预认领-新增认领
            $httpBackend.whenPOST(ApiPath.api.confirmpreClaimDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.confirmpreClaimDto];
            });
            //预认领查看
            $httpBackend.whenPOST(ApiPath.api.lookPreClaimDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.lookPreClaimDto];
            });
            //预认领修改查询
            $httpBackend.whenPOST(ApiPath.api.reviseLookPreClaimDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.reviseLookPreClaimDto];
            });
            //修改预认领-修改
            $httpBackend.whenPOST(ApiPath.api.revisePreClaimDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.revisePreClaimDto];
            });
            //认领确认查询
            $httpBackend.whenPOST(ApiPath.api.searchClaimConfirmDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.searchClaimConfirmDto];
            });
            //认领确认-详情
            $httpBackend.whenPOST(ApiPath.api.lookClaimConfirmDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.lookClaimConfirmDto];
            });
            //确认认领
            $httpBackend.whenPOST(ApiPath.api.confirmClaimDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.confirmClaimDto];
            });
            //认领打回
            $httpBackend.whenPOST(ApiPath.api.claimRepulseDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.claimRepulseDto];
            });
            //认领变更查询
            $httpBackend.whenPOST(ApiPath.api.searchClaimChangeDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.searchClaimChangeDto];
            });
            //认领变更-详情
            $httpBackend.whenPOST(ApiPath.api.lookClaimChangeDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.lookClaimChangeDto];
            });
            //认领替换
            $httpBackend.whenPOST(ApiPath.api.changeClaimDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.changeClaimDto];
            });
            //认领撤销
            $httpBackend.whenPOST(ApiPath.api.claimReturnDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.claimReturnDto];
            });
            //仲裁管理查询
            $httpBackend.whenPOST(ApiPath.api.searchArbitrationManageDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.searchArbitrationManageDto];
            });
            //仲裁确认
            $httpBackend.whenPOST(ApiPath.api.confirmArbitrationDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.confirmArbitrationDto];
            });
            //仲裁退回
            $httpBackend.whenPOST(ApiPath.api.returnArbitrationDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.returnArbitrationDto];
            });
            //仲裁撤销查询
            $httpBackend.whenPOST(ApiPath.api.searchArbitrationReturnDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.searchArbitrationReturnDto];
            });
            //撤销仲裁结果
            $httpBackend.whenPOST(ApiPath.api.arbitrationReturnResultDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.arbitrationReturnResultDto];
            });
            //追偿款处理查询
            $httpBackend.whenPOST(ApiPath.api.searchRecourseListDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.searchRecourseListDto];
            });
            //追偿款处理确认
            $httpBackend.whenPOST(ApiPath.api.confirmRecourseDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.confirmRecourseDto];
            });
            //送支付平台查询
            $httpBackend.whenPOST(ApiPath.api.searchReparationsDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.searchReparationsDto];
            });
            //送支付平台
            $httpBackend.whenPOST(ApiPath.api.sendPaymentPlatformData).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.sendPaymentPlatformData];
            });
            //待审批查询
            $httpBackend.whenPOST(ApiPath.api.searchAuditingDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.searchAuditingDto];
            });
            //已审批记录查询
            $httpBackend.whenPOST(ApiPath.api.searchApprovedDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.searchApprovedDto];
            });

            //手续费及佣金--税率维护查询
            $httpBackend.whenPOST(ApiPath.api.searchTaxRateDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.searchTaxRateDto];
            });
            //手续费及佣金--税率维护保存
            $httpBackend.whenPOST(ApiPath.api.preservationTaxRateDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.sendPaymentPlatformData];
            });
            //手续费及佣金--生成结算单查询
            $httpBackend.whenPOST(ApiPath.api.searchAdviceOfSettlementListDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.searchAdviceOfSettlementListDto];
            });
            //手续费及佣金--税金计算
            $httpBackend.whenPOST(ApiPath.api.taxCalculation).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.taxCalculation];
            });
            //手续费及佣金--手续费结算单生成
            $httpBackend.whenPOST(ApiPath.api.confirmSettlementDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.confirmSettlementDto];
            });
            //手续费及佣金--税金复核查询
            $httpBackend.whenPOST(ApiPath.api.searchTaxCheckDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.searchTaxCheckDto];
            });
            //手续费及佣金--税金复核
            $httpBackend.whenPOST(ApiPath.api.reviewTaxCheckDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.reviewTaxCheckDto];
            });
            //手续费及佣金--银行代发模板导出查询
            $httpBackend.whenPOST(ApiPath.api.findBankTemplatesDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.findBankTemplatesDto];
            });
            //手续费及佣金--结算单支付申请查询
            $httpBackend.whenPOST(ApiPath.api.searchSettlementFormDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.searchSettlementFormDto];
            });
            //手续费及佣金--结算单支付申请确认
            $httpBackend.whenPOST(ApiPath.api.confirmSettlementFormDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.confirmSettlementFormDto];
            });
            //手续费及佣金--结算单支付确认-查询
            $httpBackend.whenPOST(ApiPath.api.paymentConfirmListDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.paymentConfirmListDto];
            });
            //手续费及佣金--结算单支付确认-确认通过
            $httpBackend.whenPOST(ApiPath.api.confirmPayDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.confirmPayDto];
            });
            //手续费及佣金--结算单支付确认-打回
            $httpBackend.whenPOST(ApiPath.api.failPayDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.failPayDto];
            });
            //手续费及佣金--结算单作废查询
            $httpBackend.whenPOST(ApiPath.api.searchCancelListDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.searchCancelListDto];
            });
            //手续费及佣金--结算单作废
            $httpBackend.whenPOST(ApiPath.api.cancelPayDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.cancelPayDto];
            });
            //手续费及佣金--交易失败结算单查询
            $httpBackend.whenPOST(ApiPath.api.searchReapplyListDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.searchReapplyListDto];
            });
            //手续费及佣金--交易失败结算单重新申请
            $httpBackend.whenPOST(ApiPath.api.payReapplyDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.payReapplyDto];
            });
             //保单收付信息查询
             $httpBackend.whenPOST(ApiPath.api.InformationQuery).respond(function (method, url, data) {
                 console.log(data);
                 return [200, jsonDB.InformationQuery];
             });
            //保单收付详情信息
             $httpBackend.whenPOST(ApiPath.api.findDetail).respond(function (method, url, data) {
                 console.log(data);
                 return [200, jsonDB.findDetail];
             });
            //日结查询汇总信息
            $httpBackend.whenPOST(ApiPath.api.queryGroupByCondition).respond(function (method, url, data) {
                return [200, jsonDB.queryGroupByCondition];
            });
            //日结联动凭证信息查询
            $httpBackend.whenPOST(ApiPath.api.queryAccMainvoucher).respond(function (method, url, data) {
                return [200, jsonDB.queryAccMainvoucher];
            });
            //凭证详情--综合
            $httpBackend.whenPOST(ApiPath.api.queryDailyPaymentCheckCondition).respond(function (method, url, data) {
                return [200, jsonDB.queryDailyPaymentCheckCondition];
            });
            //再保代扣代缴--代扣代缴报表查询
            $httpBackend.whenPOST(ApiPath.api.queryWithHoldingStatements).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.queryWithHoldingStatements];
            });
            //代扣代缴报表--生成报表接口
            $httpBackend.whenPOST(ApiPath.api.geneReports).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.geneReports];
            });
            //代扣代缴报表--作废接口
            $httpBackend.whenPOST(ApiPath.api.invalidStatement).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.invalidStatement];
            });
            //代扣代缴报表--导出接口
            $httpBackend.whenPOST(ApiPath.api.exportModel).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.exportModel];
            });
            //代扣代缴报表--打印接口
            $httpBackend.whenPOST(ApiPath.api.printOne).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.printOne];
            });
            //代扣代缴实付--条件查询接口
            $httpBackend.whenPOST(ApiPath.api.queryByConditions).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.queryByConditions];
            });
            //代扣代缴实付--确认查询接口
            $httpBackend.whenPOST(ApiPath.api.paymentVerifyQuery).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.paymentVerifyQuery];
            });
            //代扣代缴实收--查询结果确认接口
            $httpBackend.whenPOST(ApiPath.api.paymentVerifyResultQuery).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.paymentVerifyResultQuery];
            });
            //代扣代缴实收--凭证复核接口
            $httpBackend.whenPOST(ApiPath.api.voucherReview).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.voucherReview];
            });
            //代扣代缴实收--凭证取消接口
            $httpBackend.whenPOST(ApiPath.api.voucherCancel).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.voucherCancel];
            });
            //代扣代缴实付信息查询--查询信息接口
            $httpBackend.whenPOST(ApiPath.api.queryInfo).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.queryInfo];
            });
            //代扣代缴实付信息查询--结果列表页凭证明细查看接口
            $httpBackend.whenPOST(ApiPath.api.showReinsWithHoidingTaxQueryDetail).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.showReinsWithHoidingTaxQueryDetail];
            });
            //代扣代缴实付信息查询--结果列表页导出接口
            $httpBackend.whenPOST(ApiPath.api.exportDataToExcel).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.exportDataToExcel];
            });
            //代扣代缴实付信息查询--结果展示页面结算单查看接口
            $httpBackend.whenPOST(ApiPath.api.showSettleDetail).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.showSettleDetail];
            });
            //代扣代缴实付信息查询--结算单查看页面结算单信息导出接口
            $httpBackend.whenPOST(ApiPath.api.exportSettleFile).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.exportSettleFile];
            });
            //账户校验配置-查询
            $httpBackend.whenPOST(ApiPath.api.queryAccountCheckData).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.queryAccountCheckData];
            });
            //账户校验配置-保存
            $httpBackend.whenPOST(ApiPath.api.saveAccountCheckData).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.saveAccountCheckData];
            });
            //账户校验配置-详细信息
            $httpBackend.whenPOST(ApiPath.api.queryAccountCheckInfoDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.queryAccountCheckInfoDto];
            });
            //审批权限配置-机构查询
            $httpBackend.whenPOST(ApiPath.api.searchApprovalConfigDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.searchApprovalConfigDto];
            });
            //审批权限配置-自动审批新增
            $httpBackend.whenPOST(ApiPath.api.saveApprovalAutoData).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.saveApprovalAutoData];
            });
            //审批权限配置-自动审批修改
            $httpBackend.whenPOST(ApiPath.api.reviseApprovalAutoData).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.saveApprovalAutoData];
            });
            //审批权限配置-手动审批新增
            $httpBackend.whenPOST(ApiPath.api.saveManualApprovalData).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.saveApprovalAutoData];
            });
            //审批权限配置-手动审批修改
            $httpBackend.whenPOST(ApiPath.api.reviseApprovalManualData).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.saveApprovalAutoData];
            });
            //审批权限配置-人员查询
            $httpBackend.whenPOST(ApiPath.api.searchApprovalStaffDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.searchApprovalStaffDto];
            });
            //审批权限配置-人员新增
            $httpBackend.whenPOST(ApiPath.api.saveApprovalStaffData).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.saveApprovalAutoData];
            });
            //审批权限配置-人员修改
            $httpBackend.whenPOST(ApiPath.api.reviseApprovalStaffData).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.saveApprovalAutoData];
            });
            //账户信息修改-查询
            $httpBackend.whenPOST(ApiPath.api.searchAccountInfoDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.searchAccountInfoDto];
            });
            //账户信息修改-修改保存
            $httpBackend.whenPOST(ApiPath.api.saveAccountReviseData).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.saveAccountReviseData];
            });
            //账户信息修改轨迹查询
            $httpBackend.whenPOST(ApiPath.api.searchTrajectorDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.searchTrajectorDto];
            });
            //账户信息修改轨迹-详细信息
            $httpBackend.whenPOST(ApiPath.api.queryTrajectorInfoDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.queryTrajectorInfoDto];
            });
            //缴费页面初始化查询
            $httpBackend.whenPOST(ApiPath.api.searchPaymentInfoDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.searchPaymentInfoDto];
            });
            //生成现金流水号
            $httpBackend.whenPOST(ApiPath.api.createCashNumDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.createCashNumDto];
            });
            //缴费-暂存||缴费-完成缴费
            $httpBackend.whenPOST(ApiPath.api.temporaryPayDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.createCashNumDto];
            });
            //缴费-币种获取兑换率
            $httpBackend.whenPOST(ApiPath.api.findExchangeRateDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.findExchangeRateDto];
            });
            //支付单号详情查看
            $httpBackend.whenPOST(ApiPath.api.lookVisaSerialNoDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.lookVisaSerialNoDto];
            });
            //审批权限配置-删除
            $httpBackend.whenPOST(ApiPath.api.deleteApprovalData).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.deleteApprovalData];
            });
            //账户校验配置-删除
            $httpBackend.whenPOST(ApiPath.api.deleteCheckDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.deleteApprovalData];
            });
            //付手续费查询
            $httpBackend.whenPOST(ApiPath.api.searchPoundageListDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.searchPoundageListDto];
            });
            //结算单详情查询
            $httpBackend.whenPOST(ApiPath.api.queryVisaSerialNoList).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.queryVisaSerialNoList];
            });
            //付手续费-确认
            $httpBackend.whenPOST(ApiPath.api.confirmPoundageDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.confirmPoundageDto];
            });
            //结算单批次号详情查询
            $httpBackend.whenPOST(ApiPath.api.queryContractNoList).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.queryVisaSerialNoList];
            });
            //保单详情查询
            $httpBackend.whenPOST(ApiPath.api.queryPolicyNoList).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.queryVisaSerialNoList];
            });
            //支付单审批
            $httpBackend.whenPOST(ApiPath.api.confirmAuditDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.confirmAuditDto];
            });
            //支付单锁定与释放
            $httpBackend.whenPOST(ApiPath.api.lockingAuditDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.lockingAuditDto];
            });
            //业务红冲-查询
            $httpBackend.whenPOST(ApiPath.api.searchRedFlushInfDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.searchRedFlushInfDto];
            });
            //业务红冲-弹框初始化查询
            $httpBackend.whenPOST(ApiPath.api.confirmRedInfDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.confirmRedInfDto];
            });
            //业务红冲--红冲确认
            $httpBackend.whenPOST(ApiPath.api.redFlushConfirmDto).respond(function (method, url, data) {
                console.log(data);
                return [200, jsonDB.redFlushConfirmDto];
            });
            //登陆
            $httpBackend.whenGET(ApiPath.api.getLoginUesr).respond(function (method, url, data) {
                return [200, jsonDB.userInfo];
                // return [401]
            });
            //头部下拉查询
            $httpBackend.whenGET(ApiPath.api.queryCenterCodeDto).respond(function (method, url, data) {
                return [200, jsonDB.queryCenterCodeDto];
                // return [401]
            });

            //获取用户信息
            $httpBackend.whenGET(config.backend.ip+config.backend.login).respond(function (method, url, data) {
                if(_data.userCode == '123' && _data.password=='123'){
                    return [200, jsonDB.login];
                }else return [404]
            });
            //退出
            $httpBackend.whenGET(config.backend.ip+config.backend.logout).respond(function (method, url, data) {
                return [404]
            });
            // 下拉域
            $httpBackend.whenPOST(ApiPath.api.getCodeTypeList).respond(function (method, url, data) {
                return [200, jsonDB.Codes];
            });

            // 双击域
            // $httpBackend.whenPOST(ApiPath.api.getCodeListLike).respond(function (method, url, data) {
            //     return [200, jsonDB.dblService];
            // });

            // 双击域--业务部门
            $httpBackend.whenPOST(ApiPath.api.AsalesDepartment).respond(function (method, url, data) {
                return [200, jsonDB.AsalesDepartment];
            });
            //双击域 业务员
            $httpBackend.whenPOST(ApiPath.api.queryOperatorName).respond(function (method, url, data) {
                return [200, jsonDB.QueryOperatorName];
            });

            $httpBackend.whenGET(/.*/).passThrough();
            $httpBackend.whenPOST(/.*/).passThrough();

        }])

});