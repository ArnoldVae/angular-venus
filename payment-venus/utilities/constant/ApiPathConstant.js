/**
 * 接口地址
 */
define([], function () {
    'use strict';
    //配置应用的path
    var app= {
        paymentWeb:"/api/payment",
        dms:'/api/dms',
        ims:'/api/ims',
        payment:'/payment',
        sso:'api/sso'
    };
    //配置公共模块服务的path
    var api={
        //框架使用api
        getLoginUesr:app.sso+"/api/userInfo",
        getMenus:app.ims+"/menu/getPaymentMenus",
        logout:app.sso+"/api/logout",

        //公共模块api
        getDictCode:app.paymentWeb+"/commonSelect/initSelectTag",
        getAccCodeListLike:app.paymentWeb+"/accCodeQuery/codeList",//核算引擎双击域模糊查询
        getCodeListLike:app.dms+"/code/codeListLike",//双击域模糊查询
        getCodeTypeList:app.dms+"/code/getCodeTypeList",//下拉域查询多个codeType
        toPaymentWay:app.paymentWeb+"/prpJTransactionMain/toPaymentWay",//转账--认领操作
        getPayUrl:app.paymentWeb+"/prpJTransactionMain/getPayUrl",//获取收银台缴费链接

        queryByUserCode:app.ims+"/utiiUserCompany/queryByUserCode",//人员双击域查询
        queryAllCompany:app.ims+"/company/queryAllCompany",//机构双击域查询
        queryAllCenter:app.ims+"/company/queryAllCenter",//查询账户归属机构
        //findBankAccount:app.payment+"/accBankAccount/findBankAccount",//查询银行账户归属机构
        queryOperatorName:app.ims+"/user/salesman",//业务员-到款确认
        AsalesDepartment:app.ims+"/user/salesDepartment",//业务部门-到款确认
        queryAllCenterUpByComCode:app.ims+"/company/queryAllCenterUpByComCode",//受托单位
        queryAgent:app.dms+"/prpDagent/queryAgent",//登陆机构权限范围内的代理信息

        queryCenterCodeDto:app.sso+"/api/getCenter",//查询头部核算单位


        //文件上传服务
        uploadFile: app.paymentWeb + "/uploadFile",
        downloadFile: app.paymentWeb + "/downloadFile",

        //文件下载服务
        downloadFileByShortLinkId: app.paymentWeb + "/downloadFileByShortLinkId",

        //工作台
        Abnormal: app.paymentWeb + "/Abnormal",//异常信息查询

        //工作台通知--日结失败提醒接口
        queryDailyPaymentList: '/api/payment/dailyPaymentMain/queryDailyPaymentList',

        // 基础信息配置模块
        getCifIdvList: app.paymentWeb + "/CIFCustomerInfo/getCifIdvList",
        getCifUnitList: app.paymentWeb + "/CIFCustomerInfo/getCifUnitList",

        // 收款管理模块
        /*非见费业务缴费*/
        searchCollectionRegDto:'/api/payment/prpJTransactionMain/queryByPrpJTransactionMain',//非见费业务缴费查询
        searchColRegAddDto:'/api/payment/prpJunjfcdplan/queryByPrpJunjfcdplan',//非见费业务缴费--新增查询
        searchNoBillDto:'/api/payment/prpJPrepayMain/queryByPrpJPrepayMainDto',//非见费业务缴费--无单预收查询
        deleteCollectionDto:'/api/payment/prpJTransactionMain/cancellationPrpJTransactionMain',//非见费业务缴费--作废
        paymentNoticeListDto:'/api/payment/prpJTransactionMain/saveOrModify',//非见费业务缴费--查看详情列表||修改保存
        saveCollectionInfo:'/api/payment/prpJTransactionMain/saveOrModify',//非见费业务缴费-新增保存
        paymentNoticeListPrint:'/api/payment/prpJTransactionMain/toPaymentWayDetails',//非见费业务缴费-打印
        transferAccountsDto:'/api/payment/prpJTransactionMain/toPaymentWay',//非见费业务缴费-缴费方式|转账-现金
        cashierPayTypeDto:'/api/payment/prpJTransactionMain/getPayUrl',//非见费业务缴费-缴费方式|收银台
        negativePayDto:'/api/payment/prpJTransactionMain/modify',//非见费业务缴费--缴费金额为负
        searchPaymentInfoDto:"/api/payment/prpJTransactionMain/prpJTransactionInfo",//缴费页面初始化查询
        createCashNumDto:"/api/payment/prpJTransactionMain/getSerialNo",//生成现金流水号
        temporaryPayDto:"/api/payment/prpJTransactionMain/prpJTransactionSave",//缴费-暂存||缴费-完成缴费
        findExchangeRateDto:"/api/payment/prpdExch/queryCurrentExchange",//缴费-币种获取兑换率
        payWayAccountDto:"/api/payment/prpJTransactionMain/print",//收付方式-获取银行账号

        /*认领管理*/
        searchPreClaimDto:'/api/payment/claimManage/preClaimQuery',//预认领查询
        searchPaymentNoticeDto:'/api/payment/prpJClaimTransactionMain/addPreClaimTransaQuery',//预认领--缴费通知单查询
        searchBankFlowDto:'/api/payment/prpJClaimBankFlowDetall/addPreClaimBankFlowQuery',//预认领--银行流水查询
        confirmpreClaimDto:'/api/payment/claimManage/addPreClaim',//预认领-新增认领
        lookPreClaimDto:'/api/payment/claimManage/preClaimView',//预认领查看
        reviseLookPreClaimDto:'/api/payment/claimManage/preClaimModifyView',//预认领修改查询
        revisePreClaimDto:'/api/payment/claimManage/preClaimModify',//修改预认领-修改
        cancelPreClaimDto:'/api/payment/cancelPreClaimDto',//修改预认领-取消
        searchClaimConfirmDto:'/api/payment/claimManage/confirmClaimQuery',//认领确认查询
        lookClaimConfirmDto:'/api/payment/claimManage/confirmClaimQueryView',//认领确认-详情
        confirmClaimDto:'/api/payment/claimManage/confirmClaim',//确认认领
        claimRepulseDto:'/api/payment/claimManage/backClaim',//认领打回
        searchClaimChangeDto:'/api/payment/claimManage/modifyClaimQuery',//认领变更查询
        lookClaimChangeDto:'/api/payment/claimManage/modifyClaimQueryView',//认领变更-详情
        changeClaimDto:'/api/payment/claimManage/replaceClaim',//认领替换
        claimReturnDto:'/api/payment/claimManage/cancelClaim',//认领撤销
        searchArbitrationManageDto:'/api/payment/searchArbitrationManageDto',//仲裁管理查询
        confirmArbitrationDto:'/api/payment/confirmArbitrationDto',//仲裁确认
        returnArbitrationDto:'/api/payment/returnArbitrationDto',//仲裁退回
        searchArbitrationReturnDto:'/api/payment/searchArbitrationReturnDto',//仲裁撤销查询
        arbitrationReturnResultDto:'/api/payment/arbitrationReturnResultDto',//撤销仲裁结果
        /*到款确认*/
        confirmQuery:"/api/payment/prpJTransactionMain/queryToConfirm",//到款确认-查询
        submitDetail:"/api/payment/prpJTransactionMain/paymentVerify",//到款确认-提交信息
        payWayQuery:"/api/payment/accPayWay/findPayWayNew",//到款确认-收付方式
        payWayQueryOld:"/api/payment/accPayWay/findPayWay",//到款确认-收付方式
        confirmBank:"/api/payment/accBankAccount/findBankAccount",//到款确认-银行信息
        confirmBankData:"/api/payment/prpJTransactionMain/print",//到款确认-银行信息(new)
        accountSubmit:"/api/payment/prpJTransactionMain/checkToConfirm",//到款确认-提交
        paymentAndSpayCheck:"/api/payment/prpJTransactionMain/paymentAndSpayCheck",//自动到款确认
        /*无单预收处理*/
        temporary:"/api/payment/prpJNoBillFeeMain/queryByContion",//无单预收查询
        unifySerialNum:"/api/payment/prpJNoBillFeeMain/bankFlowSave",//手工转无单预收提交
        tsearchReparations:"/api/payment/prpJNoBillFeeMain/backNoBillQuery",//退无单预收查询
        addsearchReparations:"/api/payment/prpJNoBillFeeMain/backNoBillAddQuery",//退无单预收新增--查询
        availableFee:"/api/payment/prpJNoBillFeeMain/backNoBill",//退暂收款
        lisr:"/api/payment/prpJNoBillFeeMain/backNoBillSave",//退暂收款-提交
        tonyisearchReparations:"/api/payment/prpJNoBillFeeMain/queryBankFlowByContion",//手工转无单预收新增查询
        noneusedie:"/api/payment/prpJNoBillFeeMain/bankFlowInfo",//手工转无单预收提交选择



        /*追偿款处理*/
        searchRecourseListDto:'/api/payment/searchRecourseListDto',//追偿款处理查询
        confirmRecourseDto:'/api/payment/confirmRecourseDto',//追偿款处理确认

        collectionSearchs:'/api/payment/prpJTransactionMain/queryImptTransactionMain',//批量业务缴费--查询
        importCondition:'/api/payment/prpJBatchPolicyImpt/readFile',//批量业务缴费--导入
        showImptMassage:'/api/payment/prpJBatchPolicyImpt/showImptMassage',//批量业务缴费--成功清单查看列表
        deleteImp:'/api/payment/prpJTransactionMain/deleteImp',//批量业务缴费--删除
        //batchServicePayment:'/api/payment/prpJBatchPolicyImpt/batchServicePayment',//批量业务缴费--缴费
        //searchReparations:'/api/payment/prpJlossPayment/queryLossPlanForPayRep',//手续费发票查询


        // 银行流水管理
        submitImportDataAdd:"/api/payment/prpJbankFlowMain/add",//银行流水导入
        submitImportDataAddV2X:"/api/payment/prpJbankFlowMain/addV2X",//银行流水导入
        searchSerialDto:"/api/payment/prpJbankFlowMain/queryMain",//银行流水查询
        deleteSerialDto:"/api/payment/prpJbankFlowMain/deleteByFileNum",//银行流水查询删除
        searchSupplementDto:"/api/payment/prpJbankFlowMain/queryDetail",//银行信息补录查询
        submitSupplementDto:"/api/payment/prpJbankFlowMain/updateDetail",//银行信息补录提交
        queryBankAcount:"/api/payment/prpJbankFlowMain/queryBankAcount",//导入目标银行账号-币别
        queryNoBillBankAcount:"/api/payment/accPayWay/queryBankAcountOut",//导入目标银行账号-币别|退无单预收



        // 付款管理
        claimQuery:app.paymentWeb+'/prpJlossPayment/queryLossPlanForPayRep',//付赔款查询
        getClaimDetail:app.paymentWeb+'/prpJlossPayment/payLossInfo',//付赔款查询
        claimSubmit:app.paymentWeb+'/prpJlossPayment/payLossVerify',//付赔款到账确认
        searchTaxRateDto:"/api/payment/prpJTaxRate/query",//税率维护查询
        preservationTaxRateDto:"/api/payment/prpJTaxRate/update",//税率维护保存
        searchAdviceOfSettlementListDto:"/api/payment/prpJCommPlan/query",//生成结算单查询
        taxCalculation:"/api/payment/prpJCommPlan/calculationTax",//税金计算
        confirmSettlementDto:"/api/payment/prpJCommPlan/generateCommSettle",//手续费结算单生成
        searchTaxCheckDto:"/api/payment/prpJCommBill/queryTaxFeeApprove",//税金复核查询
        reviewTaxCheckDto:"/api/payment/prpJCommBill/taxFeeApprove",//税金复核—复核
        findBankTemplatesDto:"/api/payment/prpJCommBill/queryBankModel",//银行代发模板导出查询
        downLoadTableDto:"/api/payment/prpJCommBill/exportBankModel",//银行代发模板导出
        searchSettlementFormDto:"/api/payment/prpJCommBill/applyCommissionFindByCondition",//结算单支付申请查询
        confirmSettlementFormDto:"/api/payment/prpJCommBill/applyCommission",//结算单支付申请-确认
        paymentConfirmListDto:"/api/payment/prpJCommBill/findByCondition",//结算单支付确认-查询
        confirmPayDto:"/api/payment/prpJCommBill/comfirmCommsionSuccess",//结算单支付确认-确认通过
        failPayDto:"/api/payment/prpJCommBill/comfirmCommsionFailure",//结算单支付确认-打回
        searchCancelListDto:"/api/payment/prpJCommBill/queryDropCommision",//结算单作废查询
        cancelPayDto:"/api/payment/prpJCommBill/dropCommision",//结算单作废
        searchReapplyListDto:"/api/payment/prpJCommBill/findFailureCommision",//交易失败结算单查询
        payReapplyDto:"/api/payment/prpJCommBill/applyCommission",//交易失败结算单重新申请
        searchPoundageListDto:"/api/payment/prpJCommPayment/queryCommision",//付手续费查询
        queryVisaSerialNoList:"/api/payment/prpJCommPayment/queryDetailCommision",//结算单详情查询
        confirmPoundageDto:"api/payment/prpJCommPayment/payCommVerify",//付手续费-确认
        queryContractNoList:"api/payment/prpJCommBill/queryDetailByPatchNo",//结算单批次号详情查询
        queryPolicyNoList:"api/payment/prpJCommPlan/queryDetailPolicy",//保单详情查询
        paymentImportExcel:"/api/payment/prpJCommPlan/excelImport",//手续费结算单生成--模板导入

        // 银企直联支付平台
        searchReparationsDto:"/api/payment/prpJlossPlan/queryByPrpJlossPlan",//送支付平台查询
        sendPaymentPlatformData:"/api/payment/prpJlossPlan/sendToCheck",//送支付平台
        searchAuditingDto:"/api/payment/actPaymentMaintenance/findNotByCondition",//待审批查询
        searchApprovedDto:"/api/payment/actPaymentMaintenance/findByCondition",//已审批记录查询
        confirmAuditDto:"/api/payment/actPaymentMaintenance/auditing",//支付单审批
        submitApprovedData:"/api/payment/actPaymentMaintenance/synchronizationPlatform",//已审批记录查询--推送
        lockingAuditDto:"/api/payment/actPaymentMaintenance/lockRelease",//支付单锁定与释放
        searchAccountInfoDto:"/api/payment/updateAccountController/queryAccountList",//账户信息修改-查询
        saveAccountReviseData:"api/payment/updateAccountController/payUpdateAccountData",//账户信息修改-修改保存
        searchTrajectorDto:"/api/payment//updateAccountController/queryAccountHistoryList",//账户信息修改轨迹查询
        queryTrajectorInfoDto:"/api/payment//updateAccountController/queryAccountHistoryDetailList",//账户信息修改轨迹-详细信息
        queryAccountCheckData:"/api/payment/prpJpayAccount/queryConfigByAccount",//账户校验配置-查询
        saveAccountCheckData:"/api/payment/prpJpayAccount/addConfigByAccount",//账户校验配置-保存
        queryAccountCheckInfoDto:"/api/payment/prpJpayAccount/queryPrpJAccountToView",//账户校验配置-详细信息
        searchApprovalConfigDto:"/api/payment/prpJAuditAmount/queryByCondition",//审批权限配置-机构查询
        saveApprovalAutoData:"/api/payment/prpJAuditAmount/save",//审批权限配置-自动审批新增
        reviseApprovalAutoData:"/api/payment/prpJAuditAmount/modify",//审批权限配置-自动审批修改
        saveManualApprovalData:"/api/payment/prpJAuditAmount/save",//审批权限配置-手动审批新增
        reviseApprovalManualData:"/api/payment/prpJAuditAmount/modify",//审批权限配置-手动审批修改
        searchApprovalStaffDto:"/api/payment/prpJAuditUser/queryByConditions",//审批权限配置-人员查询
        saveApprovalStaffData:"/api/payment/prpJAuditUser/save",//审批权限配置-人员新增
        reviseApprovalStaffData:"/api/payment/prpJAuditUser/modify",//审批权限配置-人员修改
        simulationSuccessDto:"/api/payment/actPaymentMaintenance/simulationSuccess",//已审批记录查询--模拟支付成功
        simulationFailDto:"/api/payment/actPaymentMaintenance/simulationFailure",//已审批记录查询--模拟退票
        lookVisaSerialNoDto:"/api/payment/prpJNewPayBankMain/queryVisaserialNoMsg",//支付单号详情查看
        deleteApprovalData:"/api/payment/prpJAuditAmount/delete",//审批权限配置-删除
        deleteCheckDto:"/api/payment/prpJpayAccount/deleteConfigAccount",//账户校验配置-删除
        // 结算管理
        commonQuery:'/api/payment/prpJcoinsSettlePlan/queryCertiNo',//联共保查询
        commSubmit:'/api/payment/prpJcoinsSettlePlan/createBill',//联共保提交
        invoiceQuery:'api/payment/prpJVatInvoice/blueTaxInvoiceQuery',//蓝票开具查询
        checkInvoiceSubmit:'api/payment/prpJVatInvoice/blueTaxInvoiceInfo',//蓝票开具勾选提交
        blueChangeInfomation:'api/payment/prpdCustomerTaxPayInfo/queryByPK',//改变开票对象，获取信息
        IsTrueSubmit:'api/payment/prpJpolicyPlan/checkCoinsVATInvoice',//判断是否可以勾选复选框
        blueInvoiceSubmitModal:'api/payment/prpJVatInvoice/taxInvoiceInfoAppl',//蓝票开具勾选打印申请
        outPutBuleInvoiceSubmit:'api/payment/prpJInvoiceDeductStatusRegist/invoiceStateReceived',//销项开票回写
        theDifferentialBlueInvoiceSubmit:'api/payment/prpJInvoiceLoanTemp/adjustTaxAndAccounting',//税会调差
        batchInvoiceImport:'api/payment/prpJUnionVATInvoice/query',//批量蓝票开具查询
        batchInvoiceSubmit:'api/payment/prpJUnionVATInvoice/print',//批量蓝票开具申请
        invoiceInfoSelect:'api/payment/prpJInvoiceMain/invoiceInfoQuery',//已开发票申请
        invoiceInfoDetailQuery:'api/payment/prpJVatInvoice/invoiceInfoDetailQuery',//已开发票申请明细
        taxpayerNext:'api/payment/prpdCustomerTaxPayInfo/customerInfoQuery',//纳税人信息查询
        taxpayerSubmit:'api/payment/prpdCustomerTaxPayInfo/save',//纳税人信息保存
        taxpayerUpdate:'api/payment/prpdCustomerTaxPayInfo/modify',//纳税人信息修改
        invoiceRegisterQuery:'/api/payment/prpjInputInvoiceRegistMain/inputInvoiceQuery',//进项发票信息登记查询
        invoiceOutQuery:'/api/payment/prpjInputInvoiceRegistMain/inputInvoiceFullTrans',//进项发票信息转出
        confirm:'/api/payment/prpjInputInvoiceRegistMain/inputTaxInvoiceRegist',//进项发票信息登记modal
        search:'/api/payment/prpjVatInputInvoice/toBeRegistQueryList',//进项发票信息登记modal2查询
        cancelOut:'/api/payment/prpjInputInvoiceRegistMain/cancleRigistOrTrans',//取消进项发票登记信息转出
        downExcel:'/api/payment/prpJcoinsSettlePlan/downExcel',//进项发票信息登记
        invoiceOutSomeConfirm:'/api/payment/prpjInputInvoiceRegistMain/inputTaxInvoiceRegist',//进项发票转出--部分--确认
        invoiceOutsearch:'/api/payment/prpjVatInputInvoice/toBeRegistQueryList',//进项转出部分modal查询
        invoiceOutConfirm:'/api/payment/prpjInputInvoiceRegistMain/inputTaxInvoiceRollOut',//进项发票转出--全部--确认
        cancelROQuery:'/api/payment/prpjInputInvoiceRegistMain/inputInvoiceCancleQuery',//进项发票信息取消登记/转出查询
        deduction:'api/payment/prpJInvoiceDeductStatusRegist/invoiceDeductStatusRegistReceived',//进项抵扣
        redInvoiceQuery:'api/payment/prpJVatInvoice/redTaxInvoiceQuery',//红票查询
        checkRedInvoiceSubmit:'api/payment/prpJVatInvoice/redTaxInvoiceInfo',//红票确认
        produce:'api/payment/prpJInvoiceDeductStatusRegist/coinsInputTaxDeduction',//生成进项税抵扣凭证
        dataConfigSearch:'api/payment/tDbRoutingConfig/queryByCondition',//数据源信息配置--查询
        dataConfigRemove:'api/payment/tDbRoutingConfig/remove',//数据源信息配置--删除
        dataConfigModify:'api/payment/tDbRoutingConfig/modify',//数据源信息配置--修改保存
        dataConfigSave:'api/payment/tDbRoutingConfig/save',//数据源信息配置modal--保存
        payreSearch:'/api/payment/prpJpaymentBill/billQuery',//联共保业务-结算单查询
        payComDetail:'/api/payment/prpJpaymentBill/paymentBillInfo',//共保结算单详情
        payrefSubmitData:'/api/payment/prpJpaymentBill/coinsSettleDeal',//共保支付前确认
        payreModify:'/api/payment/prpJpaymentBill/settleCoinsAccountModify',//联共保业务-结算单修改
        payrefSubmit:'/api/payment/prpJcoinsSettlePlan/payRefVerify',//联共保业务--结算单支付
        payListQuery:'/api/payment/prpJCSTaxSettlePlan/queryByPrpJCSTaxSettlePlanDto',//生成结缴单查询
        payLsitSubmit:'/api/payment/prpJCSTaxSettlePlan/createPrpJpaymentBill',//生成结缴单提交
        payListImport:'/api/payment/prpJCSTaxSettlePlan/importPrpJCSTaxSettlePlans',//生成结缴单-导入上传
        taxDetail:'/api/payment/prpJpaymentBill/queryByPrpJpaymentBillToDetail',//结缴单管理详情
        payTaxQuery:'/api/payment/prpJpaymentBill/queryByPrpJpaymentBillDto',//结缴单管理查询
        taxDelete:'/api/payment/prpJpaymentBill/cancellationByPrpJpaymentBillDto',//结缴单管理作废

        settlementQuery:'/api/payment/prpJpaymentBill/queryByPrpJpaymentBillSucceedDto',//税务结缴管理查询
        settleDetail:'/api/payment/prpJpaymentBill/queryByPrpJpaymentBillSucceedDetailDto',//税务结缴管理详情
        settleSubmitDetail:'/api/payment/prpJpaymentBill/affirmByPrpJpaymentBillSucceedToDetailDto',//税务结缴管理提交信息展示
        settleBankDetail:'/api/payment/prpJpaymentBill/queryByBankaccount',//税务结缴管理银行信息

        reinSearch:'/api/payment/prpJreinsPayment/queryCondition',//结算单查询结算-查询
        reinQueryDetail:'/api/payment/prpJreinsPaymentItem/queryDetail',//结算单查询结算-详情
        reinDataQuery:'/api/payment/prpJreinsPayment/queryBySettleNo',//结算单查询结算-再保查询
        settlementSave:'/api/payment/prpJreinsPayment/settlementSave',//结算单查询结算-再保确认保存
        reinCreateQuery:app.paymentWeb+'/prpJreinsFee/accQuery',//生成再保结算单-查询
        reinQueryData:app.paymentWeb+'/prpJreinsFee/accInfo',//生成再保结算单-详情
        reinPay:app.paymentWeb+'/prpJreinsFee/accSettle',//生成再保结算单-结付
        reinConfirm:app.paymentWeb+'/prpJreinsFee/accSettleSave',//生成再保结算单-结付确认
        exSettleSearch:'exSettleSearch',//再保分出业务查询
        exportQueryDetail:'exportQueryDetail',//再保分出业务详情
        exportSubmit:'exportSubmit',//再保分出登记确认
        imSettleSearch:'imSettleSearch',//再保分入业务查询
        importQueryDetail:'importQueryDetail',//再保分入业务详情
        importSubmit:'importSubmit',//再保分入业务登记确认
        // 进项发票管理
        searchReparations:'/api/payment/invoiceBizInfo/queryCommBillForInvoice',//手续费发票查询
        payLossInfo:'/api/payment/invoiceBizInfo/inToInvoiceRegistView',//手续费发票登记信息
        payLossVerify:'/api/payment/invoiceBizInfo/saveInvoices',//插入多条发票数据
        findAllInvoice:'/api/payment/invoiceInfo/findAllInvoice',//发票查询
        queryCoinsSettlePlanForInvoice:'/api/payment/invoiceBizInfo/queryCoinsSettlePlanForInvoice',//共保支付单查询
        inToInvoiceCoinsSettlePlanView:'/api/payment/invoiceBizInfo/inToInvoiceCoinsSettlePlanView',//共保发票登记信息
        saveCoinsSettlePlanInvoices:'/api/payment/invoiceBizInfo/saveCoinsSettlePlanInvoices',//插入多条共保发票数据
        findAllInvoiceForCoinsSettlePlan:'/api/payment/invoiceInfo/findAllInvoiceForCoinsSettlePlan',//共保发票查询
        queryLossPlanForInvoice:'/api/payment/invoiceBizInfo/queryLossPlanForInvoice',//理赔费用发票查询
        payComInfo:'/api/payment/invoiceBizInfo/inToInvoiceCompensateView',//理赔费用登记信息
        payComVerify:'/api/payment/invoiceBizInfo/saveCompensateInvoices',//理赔费用插入多条发票数据
        findAllInvoiceForCompensate:'/api/payment/invoiceInfo/findAllInvoiceForCompensate',//理赔手续费发票查询
        // 代收代付任务处理
        entrustApplyQuery:'/api/payment/entrust/entrustApplyQuery',//代收代付申请查询
        entrustApplyView:'/api/payment/entrust/entrustApplyView',//代收代付申请登记
        entrustApplyConfirm:'/api/payment/entrust/entrustApplyConfirm',//代收代付申请登记插入
        entrustCancelQuery:'/api/payment/entrust/entrustCancelQuery',//代收代付撤销查询
        entrustCancelConfirm:'/api/payment/entrust/entrustCancelConfirm',//代收代付撤销
        // 日结管理
        queryDailyPaymentMain:'/api/payment/dailyPaymentMain/queryDailyPaymentMain',//日结主表查询
        queryDailyPaymentSum:'/api/payment/dailyPaymentSum/queryDailyPaymentSum',//日结单汇总表查询
        QueryVoucherDto:'/api/payment/dailyPaymentMain/queryDailyPaymentVoucher',//凭证查询
        queryVoucherDetail:'/api/payment/dailyPaymentMain/queryVoucherDetail',//凭证分录信息查询
        queryCheckCondition:'/api/payment/dailyPaymentMain/queryDailyPaymentCheckCondition',//凭证详情
        queryDailyPaymentCheck:'/api/payment/dailyPaymentMain/queryDailyPaymentCheck',//凭证复核查询
        queryDailyPaymentDetail:'/api/payment/dailyPaymentDetail/queryDailyPaymentDetail',//日结流水单查询
        preClaimModify:'/api/payment/dailyPaymentMain/verifyDailyAccount',//日结单日结审核
        queryAutoDailyPSet:'/api/payment/autoDailyPSet/queryAutoDailyPSet',//自动日结查询
        save:'/api/payment/autoDailyPSet/saveAutoDailyPSet',//新增自动日结保存
        endDayDto:'/api/payment/dailyPaymentMain/createDailyPaymentMain',//立即日结
        cancelDailyDto:'/api/payment/dailyPaymentMain/cancelDailyPayment',//取消日结
        initDailyDto:'/api/payment/dailyPaymentMain/queryDateDailyPayment',//日历初始化
        queryDailyAddtional:'/api/payment/dailyPaymentSum/queryDailyAddtional',//补充资料查询
        exportDailyAddtional:'/api/payment/dailyPaymentSum/exportDailyAddtional ',//收付员日结首页面，汇总信息+补充资料 导出按钮
        exportDailyPaymentDetail:'/api/payment/dailyPaymentDetail/exportDailyPaymentDetail',//收付员日业务流水清单导出
        queryDailyPaymentVoucherCheckD:'/api/payment/dailyPaymentMain/queryDailyPaymentVoucherCheckDetail',//点击凭证复核展示选中凭证详情
        verifyVoucherNo:'/api/payment/dailyPaymentMain/verifyVoucherNo',//原始凭证复核
        verifyMergeVoucherNo:'/api/payment/dailyPaymentMain/verifyMergeVoucherNo',//合并单证复核
        voucherCombine:'/api/payment/dailyPaymentMain/voucherCombine',//凭证合并
        cancelMergeVoucherNo:'/api/payment/dailyPaymentMain/cancelMergeVoucherNo',//取消凭证合并
        queryDailyErrorMsg:'/api/payment/dailyErrorMsg/queryDailyErrorMsg',//业务员日结失败清单查看错误日志表信息
        immAutoDaily:'/api/payment//autoDailyPSet/immAutoDaily',//立即执行




        // 核算引擎
        // 会计科目
        accountGroup:app.paymentWeb + "/accItemDefine/queryItems",//会计科目树查询
        searchAccount:app.paymentWeb + "/accItemDefine/queryItemArticle",//会计科目树形菜单数据查询
        cashFlowData:app.paymentWeb + "/prpJPaymentCashFlowServiceController/query",//现金流量查询
        accSubjectsQuery:app.paymentWeb + "/accItemManageController/queryItem",//会计科目树查询
        accSubjectsData:app.paymentWeb + "/accItemManageController/queryItemArticle",//会计科目树数据查询
        saveAccounting:app.paymentWeb + "/accItemDefine/save",//会计科目树保存
        saveSupAccount:app.paymentWeb + "/accItemArticle/saveSupAccount",//会计科目核算树保存
        delSupInfo:app.paymentWeb + "/accItemManageController/deleteItemArticle",//会计科目-辅助核算删除
        excelImport:app.paymentWeb + "/accPayItemInfo/excelImport",//凭证模版设置-文件上传

        //辅助核算项
        saveArticleCode:app.paymentWeb + "/accArticleCode/save",//辅助核算项保存
        accountItemGroup:app.paymentWeb + "/accArticleCode/queryArticleCodes",//辅助核算树查询
        queryAccount:app.paymentWeb + "/accArticleCode/queryByPK",//辅助核算项树形菜单数据查询

        //收付方式
        searchPaymentData:app.paymentWeb + "/accPayWay/query",//收付方式查询
        saveNewPaymenter:app.paymentWeb + "/accPayWay/save",//收付方式新增
        saveRevisePaymenter:app.paymentWeb + "/accPayWay/modify",//收付方式修改
        delPaymentDto:app.paymentWeb + "/accPayWay/remove",//收付方式删除

        //收付类型
        deleteType:app.paymentWeb + "/accPayType/remove",//收付类型--删除
        typeQuery:app.paymentWeb + "/accPayType/query",//收付类型--查询
        addType:app.paymentWeb + "//accPayType/save",//收付类型--新增
        updateType:app.paymentWeb + "/accPayTypeController//queryDetail",//收付类型--修改
        updateTypeSave:app.paymentWeb + "/accPayType/modify",//收付类型--修改确认

        //收付原因
        payReason:app.paymentWeb + "/accCodeTrans/query",//收付原因查询
        addPayReason:app.paymentWeb + "/accCodeTrans/save",//收付原因新增
        updatePayReason:app.paymentWeb + "/accCodeTrans/modify",//收付原因修改
        deletePayReason:app.paymentWeb + "/accCodeTrans/remove",//收付原因删除

        //收付场景
        sceneSearch:app.paymentWeb + "/accPayItem/query",//收付场景--查询
        addScene:app.paymentWeb + "/accPayItemInfo/save",//收付场景--新增
        modifyScene:app.paymentWeb + "/accPayItemInfo/query",//收付场景--修改，核算详情
        updateSceneSave:app.paymentWeb + "/accPayItemInfo/modify",//收付场景--修改确认
        deleteScene:app.paymentWeb + "/accPayItemInfo/remove",//收付场景--删除场景
        getScenceDetail:app.paymentWeb + '/api/power/getScenceDetail',//收付场景详情





        // 综合查询
        "voucherQuery":app.paymentWeb+"/dailyPaymentMain/queryAccVoucher",//凭证查询
        "queryCertinoInfo":app.paymentWeb+"/dailyPaymentMain/queryCertinoInfo",//凭证查询

        // 催收管理

        // 运维
        transaccount:'/api/payment/transAccount/transaccount',
        payRefRecVouToFinance:'/api/payment/paymentToFinance/payRefRecVouToFinance',
        transAccVouToFinance:'/api/payment/paymentToFinance/transAccVouToFinance',
        //基础信息设置
        searchPaymentInsDto:'/api/ims/company/list',//收付机构查询
        comSelectData:'/api/ims/utiiUserCompany/queryByUserCode',//收付机构下拉查询
        comDetail:'/api/ims/company/detail',//收付机构详情
        comCheck:'/api/ims/company/checkComCode',//收付机构检查
        saveNewExchange:app.paymentWeb+'/prpdExch/add',//兑换率新增
        saveReviseExchange:app.paymentWeb+'/prpdExch/update',//兑换率修改
        searchCashDto:app.paymentWeb+'/vsInvoiceLevel/query',//收付员查询
        modifyCash:app.paymentWeb+'/vsInvoiceLevel/prepareUpdate',//收付员修改查询
        saveNewCasher:app.paymentWeb+'/vsInvoiceLevel/add',//收付员新增
        selChange:app.paymentWeb+'/accBankAccount/findLiandong',//收付员联动
        saveReviseCasher:app.paymentWeb+'/vsInvoiceLevel/update',//收付员修改保存
        initWorker:app.paymentWeb+'/workDay/initWorkday',//工作日初始化
        delCashDto:app.paymentWeb+'/vsInvoiceLevel/delete',//收付员删除
        searchAccountData:app.paymentWeb+'/accMonthTrace/queryPage',//会计期间查询
        changeAccountDto:app.paymentWeb+'/accMonthTrace/updateAccMonthTrace',//会计期间修改
        searchBank:app.paymentWeb+'/accBankAccount/queryPage',//银行账号查询
        bankDetail:app.paymentWeb+'/accBankAccount/prepareUpdate',//银行账号详情
        bankNewAdd:app.paymentWeb+'/accBankAccount/add',//银行账号新增
        saveBank:app.paymentWeb+'/accBankAccount/addOrUpdate',//银行账号修改
        deleteBankNo:app.paymentWeb+'/accBankAccount/delete',//银行账号删除
        deleteBank:"/payment-web/accBankAccountController/delete",//银行账号删除
        searchBankMerchant:app.paymentWeb+"/prpJSffBankMerchConfig/queryBankMerch",//银行账号--商户配置信息查询
        operationBankMerchant:app.paymentWeb+"/prpJSffBankMerchConfig/addBankMerch",//银行账号--新增add／删除delete／修改modifi商户配置信息操作
        // modifyBankMerchant:"/payment-web/prpJSffBankMerchConfig/queryBankMerch",//银行账号--修改商户配置信息
        // deleteBankMerchant:"/payment-web/prpJSffBankMerchConfig/deleteBankMerchant",//银行账号--删除商户配置信息
        agingQuery:app.paymentWeb+'/prpJAgingRegion/queryPage',//账龄查询
        agingAdd:app.paymentWeb+'/prpJAgingRegion/add',//账龄新增
        agingModify:app.paymentWeb+'/prpJAgingRegion/prepareUpdate',//账龄修改
        agingSave:app.paymentWeb+'/prpJAgingRegion/update',//账龄修改保存
        agingDelete:app.paymentWeb+'/prpJAgingRegion/delete',//账龄删除
        searchExchangeDto:app.paymentWeb+'/prpdExch/query',//兑换率查询
        submitWorkDay:app.paymentWeb+'/workDay/updateWorkday',//工作日更新
        searchWorkMonth:app.paymentWeb+'/workDay/queryWorkday',//工作日查询
        resetWorkDayData:app.paymentWeb+'/workDay/rebuildWorkday',//工作日重置
        searchOperatorDto:'/api/ims/user/list',//操作员查询
        searchPriManDto:'/api/ims/power/listUser',//权限管理查询
        searchPostConfigDto:'/api/ims/power/queryUserGrade',//岗位管理查询
        savePostConfigDto:'/api/ims/power/configUserGrade',//权限管理保存
        searchPostManageDto:'/api/ims/power/queryGrade',//岗位管理查询
        getPostDetailsTreeDto:'/api/ims/power/queryGradeWithTask',//岗位查询-详情
        deletePostManageDto:'/api/ims/power/deleteGrade',//岗位查询-详情
        savePostDetailsDto:'/api/ims/power/updateGradeWithTask',//岗位查询-保存
        queryWithHoldingStatements:'/api/payment/prpjReinsInputTaxRelatedMain/queryWithHoldingStatements',//代扣代缴报表--条件查询接口
        geneReports:'/api/payment/prpjReinsInputTaxRelatedMain/geneReports',//代扣代缴报表--生成报表接口
        invalidStatement:'/api/payment/prpjReinsInputTaxRelatedMain/invalidStatement',//代扣代缴报表--作废接口
        printOne:'/api/payment/prpjReinsInputTaxRelatedMain/printOne',//代扣代缴报表--打印接口
        exportModel:'/api/payment/prpjReinsInputTaxRelatedMain/exportModel',//代扣代缴报表--报表导出接口
        queryByConditions:'/api/payment/prpjReinsWithHoldingTax/queryByConditions',//代扣代缴实付--条件查询接口
        paymentVerifyQuery:'/api/payment/prpjReinsWithHoldingTax/paymentVerifyQuery',//代扣代缴实付--确认查询接口
        paymentVerifyResultQuery:'/api/payment/prpjReinsWithHoldingTax/withHoldConfirm',//代扣代缴实收--查询结果确认接口
        voucherReview:'/api/payment/prpjReinsWithHoldingTax/voucherReview',//代扣代缴实收--凭证复核接口
        voucherCancel:'/api/payment/prpjReinsWithHoldingTax/voucherCancel',//代扣代缴实收--凭证取消接口
        queryInfo:'/api/payment/prpjReinsWithHoldingTax/queryByConditions',//代扣代缴实付信息查询--查询信息接口
        showReinsWithHoidingTaxQueryDetail:'/api/payment/prpjReinsWithHoldingTax/findReinsWithHoidingTaxQueryDetail',//代扣代缴实付信息查询--结果列表页凭证明细查看接口
        exportDataToExcel:'/api/payment/prpjReinsWithHoldingTax/exportWithHoldingTaxModel',//代扣代缴实付信息查询--结果列表页导出接口
        showSettleDetail:'/api/payment/prpjReinsInputTaxRelatedMain/printOne',//代扣代缴实付信息查询--结果展示页面结算单查看接口
        exportSettleFile:'/api/payment/prpjReinsWithHoldingTax/exportSettleFile',//代扣代缴实付信息查询--结算单查看页面结算单信息导出接口
        InformationQuery:'api/payment/prpJpolicyPlan/findPrpJpayRefRecOrHisByPage',//保单收付信息查询
        findDetail:'api/payment/prpJPaymentSub/findDetail',//保单收付详细信息
        queryCustomerInfo:'api/dms/customer/queryCustomerInfo',//客户化查询
        queryGroupByCondition:'api/payment/prpJpaymentMain/queryGroupByCondition',//日结查询汇总信息
        queryAccMainvoucher:'api/payment/prpJpaymentMain/queryAccMainvoucher',//日结联动凭证信息查询
        queryDailyPaymentCheckCondition:'api/payment/dailyPaymentMain/queryDailyPaymentCheckCondition',//凭证详细信息
        queryCertinoInfo2:'api/payment/dailyPaymentMain/queryCertinoInfo',//业务信息

        //红冲处理
        searchRedFlushInfDto:'/api/payment/accMainVoucher/redQuery',//业务红冲-查询
        confirmRedInfDto:"/api/payment/accMainVoucher/reverseInfo",//业务红冲-弹框初始化查询
        redFlushConfirmDto:"/api/payment/accMainVoucher/reverseVeriry",//业务红冲-红冲确认
    };
    var exceptUrl=[
        app.paymentWeb + "/insured/queryImportResult"
    ];



    var ApiPathConstant = {
        app:app,
        api:api,
        exceptUrl:exceptUrl
    };

    return ApiPathConstant;
});