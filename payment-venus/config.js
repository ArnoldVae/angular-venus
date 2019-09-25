define({

    backend: {
        ip: "",
        dashboard: "/dashboard",
        collection: "/collection",
        payment: "/payment",
        login: "/login",
        logout: "/logout",
        userInfo:"/payment-web/login/userInfo",
        codes:"/payment-web/codes",
        accountQuery:'/payment-web/prpJVoucherController/queryPayRef',//收保费-查询
        accountSubmit:'/payment-web/prpJVoucherController/payRef',//收保费-提交
        claimQuery:'claimQuery',//理赔收款查询
        claimSubmit:'claimSubmit',//理赔收款提交
        commonQuery:'commonQuery',//共保业务查询
        commonSubmit:'commonSubmit',//共保业务提交
        checkQuery:'checkQuery',//刷卡凭证查询
        voucherSubmit:'voucherSubmit',//刷卡确认
        checksQuery:'/payment-web/prpJFeeBillController/query',//支票到账确认查询
        checksContinue:'/payment-web/prpJFeeBillController/queryContinue',//支票到账确认
        checksSubmit:'/payment-web/prpJVoucherController/payRef',//支票到账确认
        payListQuery:'payListQuery',//生成结缴单查询
        payLsitSubmit:'payLsitSubmit',//生成结缴单提交
        settlementQuery:'settlementQuery',//结算单查询
        settlementDelete:'settlementDelete',//结算单作废
        payTaxQuery:'payTaxQuery',//税务结缴查询
        payTaxSubmit:'payTaxSubmit',//税务结缴提交
        //sceneSearch:"/payment-web/accPayItemController/query",//收付场景--查询
        voucherQuery:'/payment-web/intfVoucherController/query',//凭证查询
        //addScene:"/payment-web/accPayItemController/add",//收付场景--新增
        //modifyScene:"/payment-web/accPayItemController/queryDetail",//收付场景--修改，核算详情
        //updateSceneSave:"/payment-web/accPayItemController/update",//收付场景--修改确认
        //deleteScene:"/payment-web/accPayItemController/delete",//收付场景--删除场景
        searchBankGroup:"/payment-web/accBankAccountController/queryPowerCompany",//银行机构查询
        searchBank:"/payment-web/accBankAccountController/query",//银行账号查询
        saveBank:"/payment-web/accBankAccountController/addOrUpdate",//银行账号保存
        deleteBank:"/payment-web/accBankAccountController/delete",//银行账号删除
        payReason:"/accCodeTrans/query",//收付原因查询
        addPayReason:"/accCodeTrans/save",//收付原因新增
        updatePayReason:"/accCodeTrans/modify",//收付原因修改
        deletePayReason:"/accCodeTrans/remove",//收付原因删除
        deleteType:"/accPayType/remove",//收付类型--删除
        typeQuery:"/accPayType/query",//收付类型--查询
        addType:"/accPayType/save",//收付类型--新增
        updateType:"/payment-web/accPayTypeController//queryDetail",//收付类型--修改
        updateTypeSave:"/accPayType/modify",//收付类型--修改确认
        delSupInfo:"/payment-web/accItemManageController/deleteItemArticle",//会计科目-辅助核算删除
        saveCenterCodeInf:"/payment-web/accItemManageController/updateArticleDetail",//核算项保存全部

        saveArticleCode:"/accArticleCode/save",//辅助核算项保存
        queryAccount:"/accArticleCode/queryByPK",//辅助核算项树形菜单数据查询
        accountItemGroup:"/accArticleCode/queryArticleCodes",//辅助核算树查询
        addScene:"/accPayItemInfo/save",//收付场景--新增
        sceneSearch:"/accPayItem/query",//收付场景--查询
        deleteScene:"/accPayItemInfo/remove",//收付场景--删除场景
        modifyScene:"/accPayItemInfo/query",//收付场景--修改，核算详情
        updateSceneSave:"/accPayItemInfo/modify",//收付场景--修改确认
        saveAccounting:"/accItemDefine/save",//会计科目保存
        saveSupAccount:"/accItemArticle/saveSupAccount",//会计科目-辅助核算保存
        accountGroup:"/accItemDefine/queryItems",//会计科目树查询
        searchAccount:"/accItemDefine/queryItemArticle",//会计科目树形菜单数据查询
        saveCenterAccount:"/payment-web/accItemManageController/addArticleDetail",//核算项保存
        delCenterInf:"/payment-web/accItemManageController/deleteArticleDetail",//核算项删除
        paymentApproval:"/payment-web/prpJVoucherController/queryPayment",//付款审核查询
        paymentRegister:"/payment-web/prpJVoucherController/queryActiviti",//付款登记、确认查询
        paymentActivity:"/payment-web/prpJVoucherController/queryActiviti",//收付确认
        payIndemnitySearch:"/payment-web/prpJVoucherController/payIndemnitySearch",//付款登记、确认查询
        overdueQuery:"payment-web/ColletionOverStatusController/queryOverStatus",//逾期查询
        pressSetupQuery:"/payment-web/collectionController/query",//催收设置查询
        addPressSetup:"/payment-web/collectionController/addRule",//催收设置添加
        overdueTreatment:"/payment-web/ColletionOverStatusController/addCollection",//逾期状况处理
        poundageSearch:"/payment-web/prpJVoucherController/poundageSearch",//付手续费查询
        payIndemnityActivity:"/payment-web/prpJVoucherController/payIndemnityActivity",//收付确认
        searchSuccessDto:"/payment-web/prpJPaymentTradingWaterController/querySuccessData",//收银台复核成功查询
        searchFailDto:"/payment-web/prpJPaymentTradingWaterController/query",//收银台复核失败查询
        searchExchangeDto:"/payment-web/prpdExchController/query",//兑换率查询
        dateMarkSearch:"/payment-web/daily/query",//兑换率查询
        saveNewExchange:"/payment-web/prpdExchController/add",//兑换率新增
        saveReviseExchange:"/payment-web/prpdExchController/update",//兑换率修改
        daily:"/payment-web/daily",//日结单查询
        dailySearch:"/payment-web/dailySearch",//日结标记查询
        dateErrorQuery:"/payment-web/intfmainvoucherController/failureCheck",//错误日结查询
        dailyUpdate:"/payment-web/intfmainvoucherController/autoUpdate",//日结更新
        searchCashDto:"/payment-web/vsInvoiceLevelController/query",//收付员设置查询
        saveNewCasher:"/payment-web/vsInvoiceLevelController/add",//收付员设置新增
        revisesearchCash:"/payment-web/vsInvoiceLevelController/prepareUpdate",//收付员设置修改查询
        saveReviseCasher:"/payment-web/vsInvoiceLevelController/update",//收付员修改保存
        delCashDto:"/payment-web/vsInvoiceLevelController/delete",//收付员设置删除
        initWorker:"/payment-web/workDayController/initWorkday",//工作日初始化
        searchAccountData:"/payment-web/accMonthTraceController/queryPage",//会计期间设置查询
        changeAccountDto:"/payment-web/accMonthTraceController/updateAccMonthTrace",//会计期间设置修改
        searchPaymentData:"/accPayWay/query",//收付方式查询
        saveNewPaymenter:"/accPayWay/save",//收付方式新增
        saveRevisePaymenter:"/accPayWay/modify",//收付方式修改
        delPaymentDto:"/accPayWay/remove",//收付方式删除
        cashFlowData:"/payment-web/prpJPaymentCashFlowServiceController/query",//现金流量查询
        saveNewCFDto:"/payment-web/prpJPaymentCashFlowServiceController/add",//现金流量新增
        saveReviseCFDto:"/payment-web/prpJPaymentCashFlowServiceController/update",//现金流量修改
        delCashFlowDto:"/payment-web/prpJPaymentCashFlowServiceController/delete",//现金流量删除
        checkTimeData:"/payment-web/prpJPaymentTradingWaterHisController/checkData",//互联网碎片化时间查询
        creditData:"/payment-web/prpJVoucherController/transAccount",//挂账功能查询
        headerData:"/payment-web/login/getLoginComCodes",//头部下拉查询
        submitWorkDay:"/payment-web/workDayController/updateWorkday",//工作日设置--提交
        searchWorkMonth:"/payment-web/workDayController/queryWorkday",//工作日设置--查询某月工作日
        resetWorkDayData:"/payment-web/workDayController/initWorkday",//工作日设置--重置
        searchAccessDto:"/payment-web/prpJPrePayMainController/findPrpJPrePayMainByConditions",//无单预收存取查询
        addNewAccess:"/payment-web/prpJPrePayMainController/saveCertify",//无单预收存取新增
        searchReparationsDto:"/payment-web/sendPayPlatformApplyController/findByCondition",//送支付平台查询
        sendPaymentPlatformData:"/payment-web/sendPayPlatformApplyController/sendToPlatform",//送支付平台
        searchAuditingDto:"/payment-web/actPaymentMaintenanceController/findByCondition",//待审批查询
        confirmAuditDto:"/payment-web/actPaymentMaintenanceController/updateActPaymentMaintenanceDto",//支付单审批
        lockingAuditDto:"/payment-web/actPaymentMaintenanceController/lockRelease",//支付单锁定与释放
        searchApprovedDto:"/payment-web/actPaymentMaintenanceController/findByCondition",//已审批记录查询
        submitApprovedData:"/payment-web/actPaymentMaintenanceController/synchronizationPlatform",//已审批记录查询--推送
        searchAdviceOfSettlementListDto:"/payment-web/commisionController/query",//生成结算单查询
        confirmAdviceOfSettlementDto:"payment-web/commisionController/findByPolicyNo",//确认生成结算单
        confirmSettlementDto:"/payment-web/commisionController/generateCommSettle",//手续费结算单生成
        searchTaxRateDto:"/payment-web/commisionRateController/query",//税率维护查询
        preservationTaxRateDto:"/payment-web/commisionRateController/update",//税率维护保存
        searchSettlementFormDto:"/payment-web/commisionController/applyCommissionFindByCondition",//结算单支付申请查询
        confirmSettlementFormDto:"/payment-web/commisionController/applyCommission",//结算单支付申请确认
        searchTaxCheckDto:"/payment-web/commisionController/queryTaxFeeApprove",//税金复核查询
        reviewTaxCheckDto:"/payment-web/commisionController/taxFeeApprove",//税金复核—复核
        submitImportDataAdd:"/payment-web/bankFlowManageController/add",//银行流水导入
        searchSerialDto:"/payment-web/bankFlowManageController/queryMain",//银行流水查询
        deleteSerialDto:"/payment-web/bankFlowManageController/deleteByFileNum",//银行流水查询删除
        searchSupplementDto:"/payment-web/bankFlowManageController/queryDetail",//银行信息补录查询
        submitSupplementDto:"/payment-web/bankFlowManageController/updateDetail",//银行信息补录提交
        getScenceDetail:'/api/power/getScenceDetail',//收付场景详情


    },

    //分页信息
    pagination: {
        pageSize: 15,
        previousText: '上一页',
        nextText: '下一页',
        firstText: '第一页',
        lastText: '最后一页'
    },

    httpPackage: {
        method: 'POST',
        dataType: 'json',
        url: '',
        contentType: 'application/json; charset=UTF-8',
        useDefaultXhrHeader: false,
        header: {},
        data: {},
        timeout: 20000
    },

    httpPackageGet: {
        method: 'GET',
        dataType: 'json',
        url: '',
        contentType: 'application/json; charset=UTF-8',
        useDefaultXhrHeader: false,
        header: {},
        data: {},
        timeout: 20000
    }
});