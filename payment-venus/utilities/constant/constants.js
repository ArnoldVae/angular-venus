define({
    EVENTS: {
        APP_READY: 'event:app-ready',
        LOADCODETYPE: 'event:codes-ready',//数据字典加载完毕
        VENUS_READY: 'event:venus-ready',//
        SYSTEM_INIT_END: 'systemm_init_end',//系统初始化结束
        HTTP_WAIT: 'event:http-wait',//http请求中
        BACKEND_EXCEPTION: 'event:backend-exception',//接口没有返回数据
        AUTH_VALID_FAIL: 'event:valid-fail',//身份验证失败
        AUTH_VALID: 'event:auth-valid', //登录成功
        LOGOUT_SUCCESS: 'event:logout-success', //注销成功
        AUTH_REJECT: 'event:auth-reject' //权限不够
    },

    FINDERCONFIG:{
        TARGET: {
            COMMON:'common',//公共
            GETMENUS: 'getMenus',   //投保单列表查询
            PROPOSAL: 'proposal',   //投保单列表查询
            VOUCHERQUERY:'voucherQuery',//凭证查询
            ACCOUNTQUERY:'accountQuery',//收保费查询
            CHECKSQUERY:'checksQuery',//支票到账确认查询
            CLAIMQUERY:'claimQuery',//理赔收款查询1
            GETCLAIMDETAIL:'getClaimDetail',//获取付赔款信息1
            CLAIMSUBMIT:'claimSubmit',//付赔款到账确认1
            COMMONQUERY: 'commonQuery',//共保业务查询
            CHECKQUERY:'checkQuery',//刷卡凭证查询
            PAYMENTREASON:'paymentReason',//收付原因查询
            PAYMENTTYPE:'paymentType',//收付类型查询
            PAYMENTWAY:'paymentWay',//收付方式查询
            VOUCHERTEMPLATE:'voucherTemplate',//凭证模板设置查询
            PAYLISTQUERY:'payListQuery',//生成结缴单查询
            SETTLEMENTQUERY:'settlementQuery',//结算单查询
            PAYTAXQUERY:'payTaxQuery',//税务结缴查询
            ACCOUNTGROUP:'accountGroup',//会计科目树查询
            SEARCHACCOUNT:'searchAccount',//会计科目树形菜单查询
            BANKGROUP:'bankGroup',//银行机构查询
            BANKACCOUNT:'bankAccount',//银行账号查询
            AGERANGE:'ageRange',//账龄区间查询
            PAYMENTAPPROVAL:'paymentApproval',//收付审核查询
            PAYMENTREGISTER:'paymentRegister',//收付登记，确认查询
            PAYINDEMNITY:'payIndemnity',//付赔款查询
            OVERDUE:'overdue',//逾期查询
            PRESSSETUP:'pressSetup',//催收设置
            ACCOUNTITEMGROUP:'accountItemGroup',//辅助核算项目维护树查询
            QUERYACCOUNT:'queryAccount',//辅助核算项目维护树形菜单查询
            SEARCHSUCCESSDTO:'searchSuccessDto',//收银台核算成功查询
            SEARCHFAILDTO:'searchFailDto',//收银台核算失败查询
            EXCHANGERATE:'exchangeRate',//兑换率设置查询
            BANKMERCHANT:'bankMerchant',//银行商户查询
            DAILY:'daily',//日结
            CASHMEMBER:'cashMember',//收付员设置查询
            REVISESEARCHCASH:'reviseSearchCash',//收付员设置修改查询
            ACCOUNTPERIOD:'accountPeriod',//会计期间查询
            CASHFLOWDATA:'cashFlowData',//现金流量查询
            CHECKTIME:'checkTime',//互联网碎片化时间查询
            CREDITFUNCTIONDTO:'creditFunctionDto',//挂账功能查询
            HEADERDTO:'headerDto',//头部下拉查询
            CODES:'codes',//数据字典
            SEARCHACCESSLIST:'searchAccessList',//无单预收存取查询
            SEARCHREPARATIONS:'searchReparations',//送支付平台查询
            SEARCHAUDITING:'searchAuditing',//待审批记录查询
            SEARCHAPPROVED:'searchApproved',//已审批记录查询
            SEARCHADVICEOFSETTLEMENT:'searchAdviceOfSettlementList',//生成结算单查询
            SEARCHTAXRATE:"searchTaxRate",//税率维护查询
            SEARCHSETTLEMENTFORM:"searchSettlementForm",//结算单支付申请查询
            SEARCHTAXCHECK:"searchTaxCheck",//税金复核查询
            SEARCHSERIAL:'searchSerial',//银行流水查询
            SEARCHSUPPLEMENT:'searchSupplement',//银行流水补录查询
            PAYMENTINSTITUTIONS:'paymentInstitutions',//收付机构查询
            OPERATOR:'operator',//操作人员查询
            PERMISSIONS:'permissions',//权限管理查询
            POSTMANAGE:'postManage',//权限管理-岗位配置查询
            SEARCHPOSTMANGE:'searchPostManage',//岗位管理-查询
            GETPOSTDETAILSTREE:'getPostDetailsTree',//岗位管理-岗位详情查询
            SEARCHCOLLECTIONREG:'searchCollectionReg',//非见费业务缴费查询
            SEARCHCOLLECTIONREGADD:'searchCollectionRegAdd',//非见费业务缴费--新增查询
            NOBILLSEARCH:'noBillSearch',//非见费业务缴费--无单预收查询
            TOPAYMENTWAY:'toPaymentWay',//非见费业务缴费--无单预收查询
            GETPAYURL:'getPayUrl',//非见费业务缴费--无单预收查询
            QUERYWITHHOLDINGSTATEMENTS:'queryWithHoldingStatements',//代扣代缴报表--条件查询接口
            GENEREPORTS:'geneReports',//代扣代缴报表--生成报表接口
            INVALIDSTATEMENT:'invalidStatement',//代扣代缴报表--作废接口
            PRINTONE:'printOne',//代扣代缴报表--打印接口
            EXPORTMODEL:'exportModel',//代扣代缴报表--报表导出接口
            QUERYBYCONDITIONS:'queryByConditions',//代扣代缴实付--条件查询接口
            PAYMENTVERIFYQUERY:'paymentVerifyQuery',//代扣代缴实付--确认查询接口
            PAYMENTVERIFYRESULTQUERY:'/paymentVerifyResultQuery',//代扣代缴实收--查询结果确认接口
            VOUCHERREVIEW:'voucherReview',//代扣代缴实收--凭证复核接口
            VOUCHERCANCEL:'voucherCancel',//代扣代缴实收--凭证取消接口
            QUERYINFO:'queryInfo',//代扣代缴实付信息查询--查询信息接口
            SHOWREINSWITHHOIDINGTAXQUERYDETAILO:'showReinsWithHoIdingTaxQueryDetailo',//代扣代缴实付信息查询--结果列表页凭证明细查看接口
            EXPORTDATATOEXCEL:'exportDataToExcel',//代扣代缴实付信息查询--结果列表页导出接口
            SHOWSETTLEDETAIL:'showSettleDetail',//代扣代缴实付信息查询--结果展示页面结算单查看接口
            EXPORTSETTLEFILE:'exportSettleFile',//代扣代缴实付信息查询--结算单查看页面结算单信息导出接口
            TRANSACCOUNT:'transaccount',//运维管理-挂帐管理-应收保费挂帐
            INFORMATIONQUERY:'InformationQuery',//保单收付信息查询
            FINDDETAIL:'findDetail',//保单收付详细信息
            QUERYCHECKCONDITION:'queryCheckCondition',//凭证信息
            CANCELROQUERY:'cancelROQuery',//取消进项查询
            CANCELOUT:'cancelOut',//取消进项转出
            INVOICEOUTQUERY:'invoiceOutQuery',//发票转出全部--查询
            INVOICEOUTCONFIRM:'invoiceOutConfirm',//发票转出全部确认
            INVOICEOUTSOMECONFIRM:'invoiceOutSomeConfirm',//发票转出部分确认
            INVOICEOUTSEARCH:'invoiceOutsearch',//发票转出查询
            INVOICEREGISTERQUERY:'invoiceRegisterQuery',//发票登记查询
            DOWNEXCEL:'downExcel',//发票登记导出excel
            CONFIRM:'confirm',//发票登记确定
            SEARCH:'search',//发票登记modal查询
            DEDUCTION:'deduction',//抵扣
            PRODUCE:'produce',//生成进项税抵扣凭证
            REDINVOICEQUERY:'redInvoiceQuery',//红票查询
            CHECKREDINVOICESUBMIT:'checkRedInvoiceSubmit',//红票确认
            BLUEINVOICESUBMITMODAL:'blueInvoiceSubmitModal',//红票、蓝票提交申请
            DATACONFIGSEARCH:'dataConfigSearch',//数据源配置查询
            DATACONFIGREMOVE:'dataConfigRemove',//数据源配置删除
            DATACONFIGMODIFY:'dataConfigModify',//数据源配置修改
            DATACONFIGSAVE:'dataConfigSave',//数据源配置保存
            ENTRUSTAPPLYQUERY:'entrustApplyQuery',//代收代付申请查询
            ENTRUSTAPPLYVIEW:'entrustApplyView',//代收代付申请
            ENTRUSTAPPLYCONFIRM:'entrustApplyConfirm',//代收代付申请-详情-确定
            ENTRUSTCANCELQUERY:'entrustCancelQuery',//代收代付撤销查询
            ENTRUSTCANCELCONFIRM:'entrustCancelConfirm',//代收代付撤销
            TEMPORARY:'temporary',//账户信息
            QUERYCUSTOMERINFO:'queryCustomerInfo'//客户化查询
        },
    },

    HEADERS:{
        AUTH_URL_NAME:'AuthLocation',
        REDIRECT_URL_NAME:'RedirectLocation',
        RESP_MSG_NAME:'RetMsg'
    },


    AUTH: {
        OK: 200,                //正常
        UNAUTHORIZED: 401,      //没有登录
        FORBIDDEN: 403          //没有权限
    },

    ROLE: {
        NB: '001'               //投保
    },

    STATUS: {},
    TARGET: {},
    BizType:{},                 //单子类型
    TYPE: {},

    //本地缓存
    LOCALSTORAGE: {
        nowDate: "nowDate",//当前系统时间
        USER:'user'
    }
});