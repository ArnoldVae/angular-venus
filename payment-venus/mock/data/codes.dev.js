define({

    //菜单
    "menus":[
        {"code": 'dashboard', "value": '工作台'},
        {"code": 'nonFeesCollection', "value": '非见费业务缴费'},
        {"code": 'batchCollectionImport', "value": '导入文件'},
        {"code": 'batchCollectionSearch', "value": '导入查询'},
        {"code": 'confirmation', "value": '到款确认'},
        {"code": 'preClaim', "value": '预认领'},
        {"code": 'claimConfirm', "value": '认领确认'},
        {"code": 'claimChange', "value": '认领变更'},
        {"code": 'arbitrationManage', "value": '仲裁管理'},
        {"code": 'recourse', "value": '追偿款处理'},
        {"code": 'bankStatementImport', "value": '银行流水导入'},
        {"code": 'bankStatementSearch', "value": '银行流水查询'},
        {"code": 'bankInfoAdditional', "value": '银行信息补录'},
        {"code": 'payClaim', "value": '付赔款'},
        {"code": 'paymentMaintain', "value": '税率维护'},
        {"code": 'paymentGenerate', "value": '生成结算单'},
        {"code": 'paymentTaxCheck', "value": '税金复核'},
        {"code": 'paymentRegister', "value": '结算单支付申请'},
        {"code": 'paymentConfirm', "value": '结算单支付确认'},
        {"code": 'bankTemplatesExport', "value": '银行代发模版导出'},
        {"code": 'paymentCancel', "value": '结算单作废'},
        {"code": 'paymentReapply', "value": '交易失败结算单处理'},
        {"code": 'paymentPlatformApplication', "value": '送支付平台申请'},
        {"code": 'auditing', "value": '送支付平台审核'},
        {"code": 'commonSettle', "value": '联共保'},
        {"code": 'payList', "value": '生成结缴单'},
        {"code": 'payTax', "value": '结缴单管理'},
    ],

    //性别
    "sex": [
        {"code": 'M', "value": '男'},
        {"code": 'F', "value": '女'}
    ],
    //开票对象类型
    "invoiceObjectType": [
        {"code": '1', "value": '投保人'},
        {"code": '2', "value": '被保险人'},
        {"code": '3', "value": '共保人'}
    ],
    //农险补贴类型
    "AgriType": [
        {"code": 'ALL', "value": '全部补贴'},
        {"code":'ZY',"value":'中央财政补贴'},
        {"code": 'SJ', "value": '省级财政补贴'},
        {"code": 'DS', "value": '地市财政补贴'},
        {"code": 'QX', "value": '区县财政补贴'},
        {"code": 'QT', "value": '其他财政补贴'},
        {"code": 'SY', "value": '商业补贴'}
    ],
    //费用类型
    "ChargeTypeInvoice": [
        {"code": '1', "value": '保费'},
        {"code": '2', "value": '出单费'},
        {"code": '3', "value": '退保手续费'},
        {"code": '4', "value": '收回代支手续费'},
        {"code": '5', "value": '收回代支理赔费用'},
        {"code": '6', "value": '投资金退保手续费'}
    ],
    //费用类型
    "accPayType": [
        {"code": 'GP01', "value": '付从共方保费结算'},
        {"code": 'GP02', "value": '付从共方保费结算'},
        {"code": 'GQ01', "value": '代收从共方保费确认'},
        {"code": 'JP01', "value": '再保结算'},
        {"code": 'JP02', "value": '再保代扣代缴'},
        {"code": 'JQ01', "value": '再保对内账'}
    ],
    //凭证合并类型
    "factor":[
        {
            code:"0",
            value:"POS机终端号"
        },
        {
            code:"1",
            value:"操作员"
        }
    ],
    //业务来源
    "SystemSource": [
        {"code": 'ALL', "value": '全部'},
        {"code": 'SQ', "value": '上汽对接'},
        {"code": 'FSQ', "value": '非上汽对接'}
    ],
    //收付员-币种
    "curValueList":[
        {
            code:"AUD",
            value:"澳大利亚元"
        },
        {
            code:"CAD",
            value:"加拿大元"
        },
        {
            code:"CNY",
            value:"人民币"
        },
        {
            code:"EUR",
            value:"欧元"
        },
        {
            code:"GBP",
            value:"英镑"
        },
        {
            code:"HKD",
            value:"港元"
        },
        {
            code:"JPY",
            value:"日元"
        },
        {
            code:"USD",
            value:"美元"
        }
    ],
    //费用性质
    "DFFlag": [
        {"code": 'ALL', "value": '全部'},
        {"code": '0', "value": '自缴'},
        {"code": '0', "value": '自缴'},
        {"code": ' ', "value": '非赠送业务'}
    ],
    //开票对象
    "InvoiceObjectType": [
        {"code": '1', "value": '投保人'},
        {"code": '2', "value": '被保险人'},
        {"code": '3', "value": '共保人'},
        {"code": '4', "value": '其他'}
    ],
    //差额科目--双击域
    "diffSubjectCodeAdd":[
        {
            "code":"6301070000",
            "value":"营业外收入-其他"
        }
    ],
    "diffSubjectCodeSub":[
        {
            "code":"营业外收入-其他",
            "value":"1"
        }
    ],
    //发票类型
    "InvoiceModalType": [
        {"code": '1', "value": '增值税电子普通发票'},
        {"code": '2', "value": '增值税普通发票'},
        {"code": '3', "value": '增值税专用发票'}
    ],
    //纳税人身份
    "modalTaxPayer": [
        {"code": '1', "value": '增值税一般纳税人'},
        {"code": '2', "value": '增值税小规模纳税人'},
        {"code": '5', "value": '个人'},
        {"code": '4', "value": '政府机关及无纳税识别号机构'}
    ],
    //险种
    "riskCode": [
        {"code": '000', "value": 'PUB'},
        {"code": '0000', "value": '通用险种'},
        {"code": '0011', "value": '虚拟险种'},
        {"code": '0101', "value": '财产基本险种'}
    ],
    //兑换币别：
    "exchCurrency": [
        {"code": 'AUD', "value": '澳大利亚元'},
        {"code": 'CAD', "value": '加拿大元'},
        {"code": 'CNY', "value": '人民币'},
        {"code": 'EUR', "value": '欧元'}
    ],
    //代理人/经纪人
    "agentCode": [
        {"code": '13000001', "value": '薛国生'},
        {"code": '13011112', "value": '程远'}
    ],
    //币种
    "currency": [
        {"code": 'AUD', "value": '澳大利亚元'},
        {"code": 'CAD', "value": '加拿大元'},
        {"code": 'CNY', "value": '人民币'},
        {"code": 'HKD', "value": '港币'}
    ],
    //币种
    "baseCurrency": [
        {"code": 'AUD', "value": '澳大利亚元'},
        {"code": 'CAD', "value": '加拿大元'},
        {"code": 'CNY', "value": '人民币'},
        {"code": 'EUR', "value": '欧元'},
        {"code": 'GBP', "value": '英镑'},
        {"code": 'JPY', "value": '日元'},
        {"code": 'USD', "value": '美元'},
        {"code": 'HKD', "value": '港元'}
    ],
    //应税/免税标识
    "TaxFlag": [
        {"code": '1', "value": '应税'},
        {"code": '0', "value": '免税'}
    ],
    //开票对象
    "batchInvoiceObjectType": [
        {"code": '1', "value": '投保人'},
        {"code": '4', "value": '其他'}
    ],
    //票打印状态：
    "visaPrintStatus":[
        {"code": '11', "value": '开票成功'}
    ],
    //缴费状态
    "CollectStatus":[
        {"code": '0', "value": '未缴费'},
        {"code": '1', "value": '缴费成功'},
        {"code": '2', "value": '缴费失败'},
        {"code": '3', "value": '交易作废'},
        {"code": '4', "value": '确认成功'},
        {"code": '5', "value": '缴费中'}
    ],
    //客户性质
    customerKind:[
        {code: '0',value: '个人'},
        {code: '1',value: '法人'},
    ],
    //客户性质
    ShareHolderflag:[
        {code: '0',value: '否'},
        {code: '1',value: '是'},
    ],

    //下拉域测试数据
    businessType: [
        {code: 'T',value: '比例合同'},
        {code: 'N',value: '非比例合同'},
        {code: 'F',value: '比例临分'},
        {code: 'X',value: '非比例临分'}
    ],

    orgType:[
        {code: '13000000',value: '河北分公司'},
        {code: '11000000',value: '北京分公司'}
    ],
    freinsSignType:[
        {code: '*',value: '*'},
        {code: '=',value: '='}
    ],
    //挂账类型
    insuranceBusinessType: [
        {code: 'RQ01-01',value: '应收保费挂账'},
        {code: 'RQ01-02',value: '预收保费挂账'},
        {code: 'TQ01-01',value: '车船税挂账'},
        {code: 'PQ01-01',value: '应付赔款挂账'},
        {code: 'YQ01-01',value: '预付赔款挂账'},
        {code: 'SQ01-01',value: '应付手续费挂账'},
        {code: 'SQ01-02',value: '预付手续费挂账'}
    ],
      //提醒次数
    TXtime:[
        {code: '01',value: '只提醒一次'},
        {code: '02',value: '每天一次至到期日'}
    ],
    //代收代付状态
    "collectingStatus":[
        {
            code:"0",
            value:"生成结算号"
        },
        {
            code:"1",
            value:"支付申请成功"
        },
        {
            code:"2",
            value:"支付确认成功"
        },
        {
            code:"3",
            value:"支付确认失败"
        }
    ],


     //操作符
    Sign:[
        {code: '>',value: '大于'},
        {code: '=',value: '等于'},
        {code: '<',value: '小于'}
    ],

    //催收方式
    "CertiType":[
        {code: '01',value: '短信催收'},
        {code: '02',value: '电话催收'},
        {code: '04',value: '委外催收'}
    ],
    //保单状态
    "policyType":[
        {code: '0',value: '未实收实付'},
        {code: '1',value: '已实收实付'},
    ],
    "ComCode": [
        {
            "codeCode": "0",
            "codeName": "操作员"
        },
        {
            "codeCode": "2",
            "codeName": "归属机构"
        }
    ],
    //机构代码--账龄区间
    "comCode": [
        {
            "code": "0000010101",
            "value": "机构代码名称"
        }
    ],
    //账龄区间类型--账龄区间
    "agingType":[
        {
            "code": "1",
            "value": "应收保费"
        },
        {
            "code": "2",
            "value": "应付赔款"
        },
        {
            "code": "3",
            "value": "应付手续费"
        }
    ],

    //银行流水管理--账户归属机构
    "UserComCode":[
        {
            code:"00001",
            value:"XX财险四川省宜宾市分公司"
        }

    ],
    //车队查询方式
    "QueryConfine1": [
        {
            code: "0",
            value: "操作员"
        },
        {
            code: "2",
            value: "归属机构"
        }
    ],
    //核算参数设置查询类型
    "ParameterType":[
        {
            code: "1",
            value: "会计科目维护"
        },
        {
            code: "2",
            value: "银行账号维护"
        },
        {
            code: "3",
            value: "收付原因维护"
        },
        {
            code: "4",
            value: "收付类型维护"
        },
        {
            code: "5",
            value: "收付场景维护"
        },
        {
            code: "6",
            value: "辅助核算项目维护"
        },

    ],
    //校验指标下拉数据
    "Quota":[
        {
            code: "0",
            value: "查询指标"
        },
        {
            code: "1",
            value: "校验结果查询"
        }

    ],
    //校验项管理
    "checkInf":[
        {
            code: "0",
            value: "查询校验项"
        },
        {
            code: "1",
            value: "校验结果查询"
        }
    ],
    "ValidStatus":[
        {
            code: "0",
            value: "失败"
        },
        {
            code: "1",
            value: "成功"
        },
        {
            code: "",
            value: "全部"
        }
    ],
    //判断是否标志
    "isFlag":[
        {
            code: "0",
            value: "否"
        },
        {
            code: "1",
            value: "是"
        },
        {
            code: "",
            value: "全部"
        }
    ],
    "payment":[
        {
            code: "0",
            value: "集中支付"
        },
        {
            code: "1",
            value: "付赔款"
        },
        {
            code: "2",
            value: "付手续费"
        },
        {
            code: "3",
            value: "再保结算"
        }
    ],


    //数据穿行校验
    "CheckDataThrough":[
        {
            code: "1",
            value: "数据导入"
        },
        {
            code: "2",
            value: "校验结果查询"
        }
    ],
    "AccountMenus":[
        {
            code: "1",
            value: "收保费"
        },
        {
            code: "2",
            value: "理赔收款"
        },
        {
            code: "3",
            value: "联共保业务"
        },
        {
            code: "4",
            value: "支票到账确认"
        },
        {
            code: "5",
            value: "批量收保费"
        }
    ],
    "Strategy":[
        {
            code: "R",
            value: "日结"
        }
    ],
    "MakeInvoice":[
        {
            code: "LP",
            value: "蓝票申请"
        },
        {
            code: "HP",
            value: "红票申请"
        },
        {
            code: "DZ",
            value: "电子红票申请"
        }
    ],
    "Currency":[
        {
            code: "ASF",
            value: "清算瑞士法郎"
        },
        {
            code: "ATS",
            value: "奥地利先令"
        },
        {
            code: "AUD",
            value: "澳大利亚元"
        },
        {
            code: "BEF",
            value: "比利时法郎"
        },
        {
            code: "CAD",
            value: "加拿大元"
        },
        {
            code: "CHF",
            value: "瑞士法郎"
        },
        {
            code: "CNY",
            value: "人民币"
        },
        {
            code: "DEM",
            value: "德国马克"
        },
        {
            code: "DKK",
            value: "丹麦克朗"
        },
        {
            code: "ECU",
            value: "欧洲通用货币"
        },
        {
            code: "ESP",
            value: "西班牙比塞塔"
        },
        {
            code: "EUR",
            value: "欧元"
        },
        {
            code: "FIM",
            value: "芬兰马克"
        },
        {
            code: "FRF",
            value: "法国法郎"
        },
        {
            code: "GBP",
            value: "英镑"
        },
        {
            code: "HKD",
            value: "港元"
        },
        {
            code: "ITL",
            value: "意大利里拉"
        },
        {
            code: "JPY",
            value: "日元"
        },
        {
            code: "KRF",
            value: "韩元"
        },
        {
            code: "TWD",
            value: "新台币"
        },
        {
            code: "USD",
            value: "美元"
        }
    ],
    "Payway": [
        {
            code: "1002010000 ",
            value: "银行存款"
        },
        {
            code: "3001000001",
            value: "系统往来-普通收支-收"
        },
        {
            code: "2241240000",
            value: "无单预收转销"
        },
        {
            code: "6711980000",
            value: "差额调整-营业外支出"
        }
    ],
    //无单预收
    "accountFlag":[
        {
            code:"00",
            value:"储蓄卡"
        },
        {
            code:"01",
            value:"存折"
        },
        {
            code:"02",
            value:"信用卡"
        },
        {
            code:"03",
            value:"对公账户"
        }
    ],
    //有效状态--银行账户维护
    "validStatus1":[
        {
            code:"0",
            value:"无效"
        },
        {
            code:"1",
            value:"有效"
        }
    ],
    //公私标志
    "accountType_company":[
        {
            code:"1",
            value:"个人"
        },
        {
            code:"2",
            value:"单位"
        }
    ],
    "AccuntNo":[
        {
            code: "622521542351215421",
            value: "622521542351215421刘XX011010	中国XX银行北京xx支行"
        },
        {
            code: "62252154235121523",
            value: "62252154235121523张XX011010	中国XX银行北京xx支行"
        }
    ],
    "InistantMenus":[
        {
            code: "1",
            value: "凭证号查询"
        },
        {
            code: "2",
            value: "业务号查询"
        }
    ],
    "itemCode":[
        {
            code: "1",
            value: "资产类"
        },
        {
            code: "2",
            value: "负债类"
        },
        {
            code: "3",
            value: "公共类"
        },
        {
            code: "4",
            value: "权益类"
        },
        {
            code: "5",
            value: "收入类"
        },
        {
            code: "6",
            value: "费用类"
        }
    ],
    //业务来源（数据穿行）
    "BussinessSource":[
        {
            code: "1",
            value: "保单"
        },
        {
            code: "2",
            value: "批单"
        },
        {
            code: "3",
            value: "实赔计算书"
        },
        {
            code: "4",
            value: "预算计算书"
        }
    ],
    //查询类型（数据穿行）
    "voiceType":[
        {
            code: "01",
            value: "增值税专用发票"
        },
        {
            code: "02",
            value: "增值税普通发票"
        },
        {
            code: "03",
            value: "非增值税发票"
        }
    ],
    //字段名称
    "checkType":[
        {
            code: "0001",
            value: "银行账号"
        },
        {
            code: "0002",
            value: "用户名称"
        }
    ],
    //赔付类型
    "inputPayRefReason":[
        {
            code: "lpfy",
            value: "理赔费用"
        },
        {
            code: "ypfy",
            value: "预赔费用"
        }
    ],
    //业务来源(数据穿行)
    "BussinessSource1":[
        {
            code: "1",
            value: "请选择业务类型"
        }
    ],
    //对账管理--险种类型
    "RiskType":[
        {
            code: "1",
            value: "农险"
        },
        {
            code: "2",
            value: "家财险"
        },
    ],
    //对账管理==科目名称
    "CourseName":[
        {
            code: "1",
            value: "请选择科目名称"
        }
    ],
    //对账管理，差异原因
    "DiferReason":[
        {
            code: "1",
            value: "请选择差异原因"
        }
    ],
    "Hander":[
        {
            code: "1",
            value: "请选择操作人"
        }
    ],
    //理赔状态
    "ClaimsType":[
        {
            code: "0",
            value: "待收款"
        },
        {
            code: "1",
            value: "已收款"
        }
    ],
    //凭证状态--凭证确认
    "ChecksType":[
        {
            code: "0",
            value: "未确认"
        },
        {
            code: "1",
            value: "已确认"
        },
        {
            code: "2",
            value: "财务已接收"
        }
    ],
    "VoucherMenu":[
        {
            code: "0",
            value: "刷卡凭证确认"
        },
    ],
    //凭证状态：1是待复核         2 已复核---综合查询
    "vouStatus":[
        {
            code: "1",
            value: "待复核"
        },
        {
            code: "2",
            value: "已复核"
        }
    ],
    //凭证查询-业务类型
    "InistantTypes":[
    {
        code: "1",
        value: "保单"
    },
    {
        code: "2",
        value: "批单"
    },
    {
        code: "3",
        value: "赔款"
    },
    {
        code: "4",
        value: "预赔"
    }
    ],
    "InstantQuery":[
        {
            code: "1",
            value: "业务单"
        },
        {
            code: "2",
            value: "保单"
        }
    ],
    /*基础数据配置--兑换率*/
    "exFlag":[
        {
            code: '0',
            value: '有效'
        },
        {
            code: '1',
            value:'无效'
        },
        {
            code: "",
            value: "全部"
        }
    ],
    "exCurrency":[
        {
            code: "ATS",
            value: "ATS-奥地利先令"
        },
        {
            code: "AUD",
            value: "AUD-澳大利亚元"
        },
        {
            code: "BEF",
            value: "BEF-比利时法郎"
        },
        {
            code: "CAD",
            value: "CAD-加拿大元"
        },
        {
            code: "CHF",
            value: "CHF-瑞士法郎"
        },
        {
            code: "DEM",
            value: "DEM-德国马克"
        },
        {
            code: "DKK",
            value: "DKK-丹麦克朗"
        },
        {
            code: "ECU",
            value: "ECU-欧洲通用货币"
        },
        {
            code: "ESP",
            value: "ESP-西班牙比塞塔"
        },
        {
            code: "EUR",
            value: "EUR-欧元"
        },
        {
            code: "FIM",
            value: "FIM-芬兰马克"
        },
        {
            code: "FRF",
            value: "FRF-法国法郎"
        },
        {
            code: "GBP",
            value: "GBP-英镑"
        },
        {
            code: "HKD",
            value: "HKD-港元"
        },
        {
            code: "ITL",
            value: "ITL-意大利里拉"
        },
        {
            code: "JPY",
            value: "JPY-日元"
        },
        {
            code: "MOP",
            value: "MOP-澳门元"
        },
        {
            code: "NLG",
            value: "NLG-荷兰盾"
        },
        {
            code: "NOK",
            value: "NOK-挪威克朗"
        },
        {
            code: "NTD",
            value: "NTD-新台币"
        },
        {
            code: "NZD",
            value: "NZD-新西兰元"
        },
        {
            code: "PHP",
            value: "PHP-菲律宾比索"
        },
        {
            code: "SDR",
            value: "SDR-特别提款权"
        },
        {
            code: "SEK",
            value: "SEK-瑞典克朗"
        },
        {
            code: "SGD",
            value: "SGD-新加坡元"
        },
        {
            code: "THB",
            value: "THB-泰国铢"
        },
        {
            code: "USD",
            value: "USD-美元"
        },
        {
            code: "ASF",
            value: "ASF-清算瑞士法郎"
        },
        {
            code: "CNY",
            value: "CNY-人民币"
        },
        {
            code: "MYR",
            value: "MYR-马来西亚林吉特"
        },
    ],
    /*基础数据配置--工作日*/
    "workDay":[
        {
            code: "1",
            value: "工作日初始化"
        },
        {
            code: "2",
            value: "工作日设置"
        }
    ],
    "workYear":[
        {
            code: "2017",
            value: "2017"
        },
        {
            code: "2018",
            value: "2018"
        },
        {
            code: "2019",
            value: "2019"
        },
        {
            code: "2020",
            value: "2020"
        },
        {
            code: "2021",
            value: "2021"
        },
        {
            code: "2022",
            value: "2022"
        },
        {
            code: "2023",
            value: "2023"
        },
        {
            code: "2024",
            value: "2024"
        },
        {
            code: "2025",
            value: "2025"
        },
        {
            code: "2026",
            value: "2026"
        },
        {
            code: "2027",
            value: "2027"
        },
    ],
    "workMonth":[
        {
            code: "0",
            value: "全年"
        },
        {
            code: "1",
            value: "1月"
        },
        {
            code: "2",
            value: "2月"
        },
        {
            code: "3",
            value: "3月"
        },
        {
            code: "4",
            value: "4月"
        },
        {
            code: "5",
            value: "5月"
        },
        {
            code: "6",
            value: "6月"
        },
        {
            code: "7",
            value: "7月"
        },
        {
            code: "8",
            value: "8月"
        },
        {
            code: "9",
            value: "9月"
        },
        {
            code: "10",
            value: "10月"
        },
        {
            code: "11",
            value: "11月"
        },
        {
            code: "12",
            value: "12月"
        }
    ],
    /*基础数据配置--收付员类型*/
    "unitCodeType":[
        {
            code: "0",
            value: "部门"
        },
        {
            code: "1",
            value: "员工"
        }
    ],
    "unitType":[
        {
            code: "0",
            value: "收付员"
        },
        {
            code: "1",
            value: "发票管理员"
        },
        {
            code: "2",
            value: "代理点收付员"
        },
        {
            code: "3",
            value: "集中支付岗"
        }
    ],
    /*基础数据配置--单位类型*/
    "unitCurrency":[
        {
            code: "CNY",
            value: "CNY-人民币"
        },
        {
            code: "USD",
            value: "USD-美元"
        }
    ],
    /*基础数据配置--会计期间设置*/
    "accountState":[
        {
            code:"999",
            value:"全部"
        },
        {
            code:"5",
            value:"开启"
        },
        {
            code:"3",
            value:"关闭"
        }
    ],
    //共保业务查询业务类型
    "BusinessType01":[
        {
            code:"0",
            value:"全部"
        },
        {
            code:"1",
            value:"保费"
        },
        {
            code:"2",
            value:"费用"
        },
        {
            code:"3",
            value:"手续费"
        },
        {
            code:"4",
            value:"赔款"
        }
    ],

    /*账龄区间设置*/
    "agingInt":[
        {code: '1',value: '应收保费'},
        {code: '2',value: '应付赔款'},
        {code: '3',value: '应付手续费'},
        {code: '4',value: '应收分保账款'},
        {code: '5',value: '应付分保账款'}
    ],

    //收付方式
    //收付方式-到款确认
    "paymentay-confirm":[
        {
            code:"01",
            value:"转账(认领银行流水)"
        },
        {
            code:"02",
            value:"微信"
        },
        {
            code:"03",
            value:"支付宝"
        },
        {
            code:"04",
            value:"银联网银(预留)"
        },
        {
            code:"05",
            value:"快钱网银(预留)"
        },
        {
            code:"06",
            value:"刷卡(pos)"
        },
        {
            code:"07",
            value:"现金"
        },
        {
            code:"08",
            value:"无单预收"
        },
        {
            code:"09",
            value:"其他"
        }
    ],
    //收付方式
    "paymentay":[
        {
            code:"1",
            value:"现金-收"
        },
        {
            code:"2",
            value:"无单证收"
        },
        {
            code:"3",
            value:"银行存款"
        },
        {
            code:"4",
            value:"预约协议"
        }
    ],
    //系统参数设置
    "systemParameterMenus":[
        {
            code:"1",
            value:"业务参数设置"
        },
        {
            code:"2",
            value:"接口服务参数设置"
        },
        {
            code:"3",
            value:"项目代码参数设置"
        },
        {
            code:"4",
            value:"刷新系统缓存"
        }
    ],
    //分摊方式
    "shareWay":[
        {
            code:"1",
            value:"比例分配"
        },
        {
            code:"2",
            value:"按均分配"
        }
    ],
    //送支付平台状态
    "sendSpay_signFlag":[
        {
            code:"0",
            value:"待处理"
        },
        {
            code:"1",
            value:"已审批"
        },
        {
            code:"2",
            value:"退票"
        },
        {
            code:"3",
            value:"待审批"
        },
        {
            code:"9",
            value:"支付成功"
        },
        {
            code:"z",
            value:"支付信息待修改"
        },
        {
            code:"n",
            value:"支付失败"
        }
    ],
    //送支付平台审核审批
    "approvalOpinions":[
        {
            code:"0",
            value:"同意"
        },
        {
            code:"1",
            value:"不同意"
        }
    ],
    //待审批记录查询-管控环节
    "send_pending_annulus":[
        {
            code:"0",
            value:"一级审批"
        },
        {
            code:"1",
            value:"二级审批"
        },
        {
            code:"3",
            value:"未审批"
        }
    ],
    //待审批记录查询-审批状态
    "auditingApproveStatus":[
        {
            code:"0",
            value:"已一级审核"
        },
        {
            code:"1",
            value:"已二级审核"
        },
        {
            code:"2",
            value:"已推送"
        },
        {
            code:"3",
            value:"未审批"
        }
    ],
    //已审批记录查询-审批状态
    "send_approveStatus":[
        {
            code:"0",
            value:"已一级审核"
        },
        {
            code:"1",
            value:"已二级审核"
        },
        {
            code:"2",
            value:"已推送"
        },
        {
            code:"3",
            value:"未审批"
        }
    ],
    //送支付平台审核-业务类型
    "send_businessType":[
        {
            code:"1",
            value:"赔款"
        },
        {
            code:"2",
            value:"手续费"
        },
        {
            code:"3",
            value:"绩效"
        },
        {
            code:"4",
            value:"大病即时即报"
        },
        {
            code:"5",
            value:"财政代打卡"
        },
        {
            code:"6",
            value:"保费"
        },
        {
            code:"7",
            value:"网销手续费"
        }
    ],
    //银行流水导入收款方式
    "bankImportFlag":[
        {
            code:"1",
            value:"POS机"
        },
        {
            code:"2",
            value:"转账"
        },
        {
            code:"3",
            value:"支票"
        }
    ],
    //银行流水查询处理状态
    "bankSerialFlag":[
        {
            code:"0",
            value:"未处理"
        },
        {
            code:"1",
            value:"已处理"
        }
    ],
    //岗位权限
    "postAuthorityFlag":[
        {
            code:"1",
            value:"权限管理"
        },
        {
            code:"2",
            value:"岗位管理"
        }
    ],

    //付款模块业务类型
    "paymentBusinessType":[
        {
            code:"0",
            value:"手续费"
        },
        {
            code:"1",
            value:"佣金"
        }
    ],
    //业务标识
    "businessIdentity":[
        {
            code:"1",
            value:"自动"
        },
        {
            code:"2",
            value:"手动"
        }
    ],

    //付款模块业务类型没有全部的
    "paymentBusinessType02":[
        {
            code:"1",
            value:"手续费"
        },
        {
            code:"2",
            value:"退保保费"
        },
        {
            code:"3",
            value:"赔款"
        }
    ],
    //付款模块业务类型没有全部的
    "paymentBusinessType03":[
        // {
        //     code:"R",
        //     value:"保费"
        // },
        // {
        //     code:"E",
        //     value:"批单"
        // },
        // {
        //     code:"G",
        //     value:"共保从方（我方为主方）"
        // },
        // {
        //     code:"L",
        //     value:"联保从方（我方为从方）"
        // },
        {
            code:"P",
            value:"赔款"
        },
        {
            code:"Y",
            value:"预赔"
        },
        {
            code:"D",
            value:"垫付"
        },
        {
            code:"Z",
            value:"追偿"
        },
        // {
        //     code:"T",
        //     value:"车船税"
        // },
        // {
        //     code:"S",
        //     value:"手续费"
        // },
        // {
        //     code:"J",
        //     value:"再保"
        // },
        // {
        //     code:"V",
        //     value:"增值税"
        // },
        // {
        //     code:"Z",
        //     value:"暂收款"
        // }
    ],

//    结算单状态
    "visaSerialStateType":[
        {
            code:"1",
            value:"全部"
        },
        {
            code:"2",
            value:"未审核"
        },
        {
            code:"3",
            value:"审核通过"
        },
        {
            code:"4",
            value:"审核不通过"
        }
    ],

    //付款模块银行代发结算单状态
    "paymentBankTemplatesExportSign":[
        {
            code:"0",
            value:"已申请未确认"
        },
        {
            code:"1",
            value:"已申请已确认"
        }
    ],

    //付款模块银行代发农／非农险标志
    "agriculturalInsuranceSign":[
        {
            code:"1",
            value:"全部"
        },
        {
            code:"2",
            value:"农险"
        },
        {
            code:"3",
            value:"非农险"
        }
    ],
    //结算单状态
    "settleStatus":[
        {
            code:"0",
            value:"正常"
        },
        {
            code:"1",
            value:"作废"
        }
    ],

    //付款模块银行代发结算标志
    "settlementSign":[
        {
            code:"0",
            value:"未结算"
        },
        {
            code:"1",
            value:"已结算"
        }
    ],

    //付款模块银行代发是否大鹏险
    "ROC":[
        {
            code:"1",
            value:"全部"
        },
        {
            code:"2",
            value:"是"
        },
        {
            code:"3",
            value:"否"
        }
    ],

    //付款模块银行代发是否大鹏险
    "widelyDispersed":[
        {
            code:"1",
            value:"全部"
        },
        {
            code:"2",
            value:"是"
        },
        {
            code:"3",
            value:"否"
        }
    ],
    //结算单状态
    "settlementStatuses":[
        {
            code:"0",
            value:"全部"
        },
        {
            code:"1",
            value:"已缴"
        },
        {
            code:"2",
            value:"未缴"
        }
    ],
    //台账切片
    "sliceUps":[
        {
            code:"0",
            value:"全部"
        },
        {
            code:"1",
            value:"直保应收保费"
        },
        {
            code:"2",
            value:"直保预收保费"
        },
        {
            code:"3",
            value:"直保应付手续费"
        },
        {
            code:"4",
            value:"直保预付手续费"
        },
        {
            code:"5",
            value:"应付赔款"
        },
        {
            code:"6",
            value:"预付赔款"
        },
        {
            code:"7",
            value:"再保应付分保费"
        },
        {
            code:"8",
            value:"再保应收分保费"
        }
    ],
    //台账切片分公司
    "childCompanies":[
        {
            code:"0",
            value:"11000000-北京分公司"
        },
        {
            code:"1",
            value:"31000000-上海分公司"
        }
    ],
    //账号归属机构
    "accountInstitution":[
        {
            code:"",
            value:"2110000-北京分公司"
        },
        {
            code:"",
            value:"2130000-河北分公司"
        }
    ],

    //业务类型  全部、保费、赔款、手续费、退保、共保、再保
    businessType02:[
        {
            code:"0",
            value:"全部"
        },
        {
            code:"1",
            value:"保费"
        },
        {
            code:"2",
            value:"赔款"
        },
        {
            code:"3",
            value:"手续费"
        },
        {
            code:"4",
            value:"退保"
        },
        {
            code:"5",
            value:"共保"
        },
        {
            code:"6",
            value:"再保"
        }
    ],
    //缴付费状态 全部、已缴费、未缴费
    "paymentStatus":[
        {
            code:"0",
            value:"全部"
        },
        {
            code:"1",
            value:"已缴费"
        },
        {
            code:"2",
            value:"未缴费"
        }
    ],
    //accountBill 全部、未对账、已对账、对账失败
    "accountBills":[
        {
            code:"0",
            value:"全部"
        },
        {
            code:"1",
            value:"未对账"
        },
        {
            code:"2",
            value:"已对账"
        },
        {
            code:"3",
            value:"对账失败"
        }
    ],
    //对账文件来源 全部、快钱、银联、微信、其他
    "accountFileResource":[
        {
            code:"0",
            value:"全部"
        },
        {
            code:"1",
            value:"快钱"
        },
        {
            code:"2",
            value:"银联"
        },
        {
            code:"3",
            value:"微信"
        },
        {
            code:"4",
            value:"其他"
        }
    ],
    //对账文件归属机构
    accountFileOrganizations:[
        {
            code:"11000000",
            value:"北京分公司"
        },
        {
            code:"1300000",
            value:"河北分公司"
        }
    ],
    //对账状态 全部、未对账、已对账、对账失败
    accountStatus:[
        {
            code:"0",
            value:"全部"
        },
        {
            code:"1",
            value:"未对账"
        },
        {
            code:"2",
            value:"已对账"
        },
        {
            code:"3",
            value:"对账失败"
        }
    ],
    //对账类型
    accountTypes:[
        {
            code:"0",
            value:"车船税"
        }
    ],
    //制证状态 全部、制证成功、制证失败
    createCardStatus:[
        {
            code:"0",
            value:"全部"
        },
        {
            code:"1",
            value:"制证成功"
        },
        {
            code:"2",
            value:"制证失败"
        }
    ],
    //农险非农险 全部”，“农险”，“非农险”
    isAgricultural:[
        {
            code:"0",
            value:"全部"
        },
        {
            code:"1",
            value:"农险"
        },
        {
            code:"2",
            value:"非农险"
        }
    ],
    //结算标志 全部”，“已结算”，“未结算”
    settlementFlag:[
        {
            code:"0",
            value:"全部"
        },
        {
            code:"1",
            value:"已结算"
        },
        {
            code:"2",
            value:"未结算"
        }
    ],
    //业务类型-银联支付 “全部”，“手续费”，“退保保费”、“赔款”
    businessType03:[
        {
            code:"0",
            value:"全部"
        },
        {
            code:"1",
            value:"手续费"
        },
        {
            code:"2",
            value:"退保保费"
        },
        {
            code:"3",
            value:"赔款"
        }
    ],
    // 认领状态
    claimStatus:[
        {
            code:"0",
            value:"未认领"
        },
        {
            code:"1",
            value:"认领中"
        },
        {
            code:"2",
            value:"认领完成"
        }
    ],
    //发票类型
    invoiceType:[
        {
            code:"01",
            value:"增值税专用发票"
        }
    ],
    //纳税人身份
    taxPayerStatus:[
        {
            code:"0",
            value:"增值税一般纳税人"
        }
    ],
    //开票对象
    whoInvoiced:[
        {
            code:"0",
            value:"投保人"
        },
        {
            code:"1",
            value:"被保险人"
        }
    ],
    //业务部门
    businessPart:[
        {
            code:"0000",
            value:"北京总公司"
        },
        {
            code:"0001",
            value:"成都分公司"
        },
    ],
    //打印标志
    "printFlag":[
        {
            code:"1",
            value:"已打印"
        },
        {
            code:"2",
            value:"未打印"
        }
    ],
    //处理结果
    "treatmentTesult":[
        {
            code:"1",
            value:"处理成功"
        },
        {
            code:"2",
            value:"处理失败"
        }
    ],
    //文件名
    "documentName":[
        {
            code:"1",
            value:"文件名"
        }
    ],
    //操作员代码
    "operatorCode":[
        {
            code:"1",
            value:"操作员代码"
        }
    ],
    //查询范围
    "Seek":[
        {
            code:"=",
            value:"="
        },
        {
            code:">",
            value:">"
        },
        {
            code:"<",
            value:"<"
        },
    ],
    //银行账号--银行账户维护
    "bankAccountNo":[
        {
            code:"0",
            value:"请选择银行账号"
        }
    ],
    //核算单位--银行账户维护
    "centerCode":[
        {
            code:"0",
            value:"请选择核算单位"
        }
    ],
    //存款性质--银行账户维护
    "saveNature":[
        {
            code:"0",
            value:"活期"
        },
        {
            code:"1",
            value:"死期"
        }
    ],
    //有效状态--银行账户维护
    "validStatus":[
        {
            code:"0",
            value:"请选择有效状态"
        }
    ],
    //账户类型--非见费业务缴费|无单预收
    "customtype":[
        {
            code:"0",
            value:"个人客户"
        },
        {
            code:"1",
            value:"团体客户"
        }
    ],
    //业务员
    "businessMan":[
        {
            code:"000000",
            value:"张铭"
        },
        {
            code:"000001",
            value:"李华"
        }
    ],
    //业务渠道
    "businessNature":[
        {
            code:"000000",
            value:"渠道1"
        },
        {
            code:"000001",
            value:"渠道2"
        }
    ],
    //手续费类型
    "poundageType":[
        {
            code:"0",
            value:"手续费"
        },
        {
            code:"1",
            value:"佣金"
        }
    ],
    //收付员-币种
    "curValueList":[
        {
            code:"AUD",
            value:"澳大利亚元"
        },
        {
            code:"CAD",
            value:"加拿大元"
        },
        {
            code:"CNY",
            value:"人民币"
        },
        {
            code:"EUR",
            value:"欧元"
        },
        {
            code:"GBP",
            value:"英镑"
        },
        {
            code:"HKD",
            value:"港元"
        },
        {
            code:"JPY",
            value:"日元"
        },
        {
            code:"USD",
            value:"美元"
        }
    ],
    //追偿款业务类型
    "recourseType":[
        {
            code:"0",
            value:"发起追偿"
        },
        {
            code:"1",
            value:"追回确认"
        }
    ],
    "authCode":[
        {
            code:"1",
            value:"认证人1"
        },
        {
            code:"2",
            value:"认证人2"
        }
    ],
    //记录状态
    "Itemstatus":[
        {
            code:"A0",
            value:"待发送资金"
        },
        {
            code:"A1",
            value:"已送资金"
        },
        {
            code:"A2",
            value:"资金支付成功"
        },
        {
            code:"A3",
            value:"资金支付失败"
        },
        {
            code:"A4",
            value:"资金退票"
        },
        {
            code:"A5",
            value:"资金红冲"
        }
    ],
    //有效标识
    "payTaxFlag":[
        {
            code:"0",
            value:"失效"
        },
        {
            code:"1",
            value:"有效"
        }
    ],
    "Uploadstatus":[
        {
            code:"0",
            value:"初始/取消/作废"
        },
        {
            code:"1",
            value:"完成预确认"
        },
        {
            code:"2",
            value:"完成确认"
        },
        {
            code:"3",
            value:"完成付款"
        }
    ],
    //核算标志（是否结算）
    "Centerflag":[
        {
            code:"0",
            value:"未结算"
        },
        {
            code:"1",
            value:"已结算"
        }
    ],
    //联共保-商户类型
    "Accounttype":[
        {
            code:"1",
            value:"集体账户"
        },
        {
            code:"2",
            value:"个人账户"
        }
    ],
    //再保结算-账单类型
    "AccType":[
        {
            code:"10",
            value:"临分"
        },
        {
            code:"12",
            value:"对外正式"
        },
        {
            code:"13",
            value:"超配正式账"
        }
    ],
    //再保结算-业务类型
    "OptType":[
        {
            code:"0",
            value:"分出业务"
        },
        {
            code:"1",
            value:"分入业务"
        }
    ],
    //再保结算-结算状态
    "SettleStatus":[
        {
            code:"0",
            value:"分出业务"
        },
        {
            code:"1",
            value:"分入业务"
        }
    ],
    //再保结算-表格结算状态
    "SettleStatus":[
        {
            code:"0",
            value:"未结算"
        },
        {
            code:"1",
            value:"已结算"
        }
    ],
    //再保结算-缴费方式
    "PayWay2":[
        {
            code:"1",
            value:"POS-银联"
        },
        {
            code:"2",
            value:"POS-农行"
        },
        {
            code:"3",
            value:"POS-快钱"
        },
        {
            code:"4",
            value:"POS-快钱-无线"
        },
        {
            code:"5",
            value:"收银平台"
        },
        {
            code:"6",
            value:"无单预收业务"
        },
        {
            code:"7",
            value:"网银电汇现金"
        },
        {
            code:"8",
            value:"支票"
        },
        {
            code:"9",
            value:"转账"
        }
    ],
    "IsValidStatus":[
        {
            code:"0",
            value:"无效"
        },
        {
            code:"1",
            value:"有效"
        }
    ],
    //进项发票信息登记--费用类型
    "typeOfExpense":[
        {
            code:"ALL",
            value:"全部"
        },
        {
            code:"1",
            value:"代收联/共保保费"
        },
        {
            code:'2',
            value:'出单费'
        },
        {
            code:'3',
            value:'从方支付手续费'
        }
    ],
    //运维管理--数据源信息配置--有效标示
    "validIdentification":[
        {
            code:'Y',
            value:'有效'
        },{
            code:'N',
            value:'无效'
        }
    ],
    //运维管理--数据源信息配置--配置结果值
    "configResult":[
        {
            code:'READ',
            value:'读'
        },{
            code:'WRITE',
            value:'写'
        }
    ],
    //运维管理--数据源信息配置--配置方式类型
    "configMold":[
        {
            code:"CLASSMETHOD",
            value:"类名+方法名"
        },{
            code:"METHOD",
            value:"方法名"
        }
    ],
    //进项发票信息登记--开票汇率
    "invoiceRate":[
        {
            code:"0.03",
            value:"3%"
        },
        {
            code:"O.O4",
            value:"4%"
        },
        {
            code:"0.05",
            value:"5%"
        },
        {
            code:"0.06",
            value:"6%"
        },
        {
            code:"0.11",
            value:"11%"
        },
        {
            code:"0.13",
            value:"13%"
        },
        {
            code:"0.17",
            value:"17%"
        }
    ],
    //进项发票信息登记--进项项目
    "inputProject":[
        {
            code:"金融保险服务的进项-6%",
            value:"金融保险服务的进项-6%"
        },{
            code:"金融保险服务的进项-3%",
            value:"金融保险服务的进项-3%"
        },{
            code:"其他类",
            value:"其他类"
        }
    ],
    //进项发发票会写状态--抵扣状态
    "status":[
        {
            code:"1",
            value:"抵扣成功"
        },{
            code:"2",
            value:"抵扣失败"
        }
    ],
    //预认领-认领状态
    "preClaimStatus":[
        {
            code:"1",
            value:"预认领"
        },
        {
            code:"3",
            value:"认领打回"
        }
    ],
    //认领变更-认领状态
    "claimChangeStatus":[
        {
            code:"2",
            value:"认领确认"
        },
        {
            code:"4",
            value:"认领替换"
        }
    ],
    //代扣代缴-费用类型
    "ChargeType":[
        {
            code:"4",
            value:"分出保费"
        },
        {
            code:"5",
            value:"经纪费"
        },
        {
            code:"6",
            value:"分入保费"
        }
    ],
    //审批权限配置
    "approvalConfigFlag":[
        {
            code:"01",
            value:"自动审批"
        },
        {
            code:"02",
            value:"手动审批"
        }
    ],
    //账户信息修改-银行名称
    "bankName":[
        {
            code:"1",
            value:"工商银行"
        },
        {
            code:"2",
            value:"建设银行"
        }
    ],
    //银行名称
    "bankType":[
        {
            code:"1",
            value:"工商银行"
        },
        {
            code:"2",
            value:"建设银行"
        }
    ],
    //账户信息修改-证件类型
    "IDTYPE":[
        {
            code:"01",
            value:"居民身份证"
        },
        {
            code:"02",
            value:"居民户口薄"
        },
        {
            code:"03",
            value:"驾驶证"
        },
        {
            code:"04",
            value:"军官证"
        }
    ],
    //账户信息修改-卡号标识
    "AccountFlag":[
        {
            code:"00",
            value:"储蓄卡"
        },
        {
            code:"01",
            value:"存折"
        },
        {
            code:"02",
            value:"信用卡"
        },
        {
            code:"03",
            value:"对公账户"
        }
    ],
    //账户信息修改-公私标识
    "AccountType":[
        {
            code:"1",
            value:"个人"
        },
        {
            code:"2",
            value:"单位"
        }
    ],
    //账户校验配置-账户名
    "accountFieldCode":[
        {
            code:"01",
            value:"账户名称"
        },
        {
            code:"02",
            value:"手机号"
        },
        {
            code:"03",
            value:"银行名称"
        },
        {
            code:"04",
            value:"省_市"
        },
        {
            code:"05",
            value:"开户银行"
        },
        {
            code:"06",
            value:"联行号"
        },
        {
            code:"07",
            value:"证件号码"
        },
        {
            code:"08",
            value:"账号/卡号"
        }
    ],
    //审批权限配置-业务类型
    "audit_businessType":[
        {
            code:"01",
            value:"赔款"
        },
        {
            code:"02",
            value:"保费"
        },
        {
            code:"03",
            value:"手续费"
        }
    ],
    //审批权限配置-审核级别
    "audit_auditLevel":[
        {
            code:"1",
            value:"一级"
        },
        {
            code:"2",
            value:"二级"
        },
        {
            code:"3",
            value:"三级"
        }
    ],



//会计引擎
    //是否关联科目
    "titleRelation":[
        {
            code: "1",
            value: "是"
        },
        {
            code: "0",
            value: "否"
        }
    ],
    //机构类型
    ComType:[
        {
            code:"0",
            value:"业务机构"
        },
        {
            code:"1",
            value:"收付机构"
        }
    ],
    //是否跨币别
    CrossCurrency:[
        {
            code:"0",
            value:"是"
        },
        {
            code:"1",
            value:"否"
        }
    ],
    //业务币/收付币
    BusinessCollectionCurrency:[
        {
            code:"0",
            value:"业务币"
        },
        {
            code:"1",
            value:"收付币"
        }
    ],
    //会计科目编码
    AccountObj:[
        {
            code:"0",
            value:"应收保费"
        },
        {
            code:"1",
            value:"预收保费"
        },
        {
            code:"2",
            value:"应付赔款"
        },
        {
            code:"3",
            value:"银存"
        },
        {
            code:"4",
            value:"保费收入"
        },
        {
            code:"5",
            value:"货币兑换"
        },
        {
            code:"6",
            value:"业务往来"
        }
    ],
    //场景状态
    "SceneStatus":[
        {
            code:"0",
            value:"未配置"
        },
        {
            code:"1",
            value:"已配置"
        }
    ],
    //收付员-收付方式
    "PayType":[
        {
            code:"01",
            value:"现金"
        },
        {
            code:"02",
            value:"转账"
        },
        {
            code:"03",
            value:"支票"
        },
        {
            code:"11",
            value:"现金等"
        },
        {
            code:"12",
            value:"转账等"
        },
        {
            code:"13",
            value:"支票等"
        }
    ],
    //收付员-业务类型
    "BusinessType":[
        {
            code:"01",
            value:"保费"
        },
        {
            code:"02",
            value:"赔款"
        },
        {
            code:"03",
            value:"手续费"
        },
        {
            code:"04",
            value:"绩效"
        },
        {
            code:"05",
            value:"出单费"
        }
    ],




    "accpaytypeCode":[
        {
            code:"01",
            value:"确认"
        },
        {
            code:"02",
            value:"结算"
        }
    ],
    //科目级别
    "ItemLevel":[
        {
            code:"1",
            value:"1"
        },
        {
            code:"2",
            value:"2"
        },
        {
            code:"3",
            value:"3"
        },
        {
            code:"4",
            value:"4"
        }
    ],
    //会计引擎-收付类型
    "paymentAccType":[
        {
            code:"01",
            value:"确认"
        },
        {
            code:"02",
            value:"结算"
        },
    ],
    //收付机构-机构级别
    "ComLevelList":[
        {
            code:"1",
            value:"总公司"
        },
        {
            code:"2",
            value:"省公司"
        },
        {
            code:"3",
            value:"地市"
        },
        {
            code:"4",
            value:"区县"
        },
        {
            code:"5",
            value:"科室"
        },
        {
            code:"6",
            value:"网点"
        }
    ],
    "titleCode":[
        {
            code:"1",
            value:"1"
        },
        {
            code:"2",
            value:"2"
        },
        {
            code:"3",
            value:"3"
        },
        {
            code:"4",
            value:"4"
        },
        {
            code:"5",
            value:"5"
        }
    ],
    "baseCurrency":[
        {
            code:"AUD",
            value:"澳大利亚元"
        },
        {
            code:"CAD",
            value:"加拿大元"
        },
        {
            code:"CNY",
            value:"人民币"
        },
        {
            code:"EUR",
            value:"欧元"
        },
        {
            code:"GBP",
            value:"英镑"
        }
    ],
    "customType":[
        {
            code:"0",
            value:"投保人个人"
        },
        {
            code:"1",
            value:"投保人团体"
        },
        {
            code:"2",
            value:"代理人/代理机构"
        },
        {
            code:"9",
            value:"其他"
        }
    ],
    "payMentFlag":[
        {
            code:"2",
            value:"退票"
        },
        {
            code:"z",
            value:"支付信息待修改"
        }
    ],
    "noBillSouce":[
        {
            code:"01",
            value:"银行流水转无单预收"
        },
        {
            code:"02",
            value:"溢额保费转无单预收"
        }
    ],
    //金额为负缴费-收付方式
    "payWayPayment":[
        {
            code:"111",
            value:"现金"
        },
        {
            code:"222",
            value:"银行存款"
        }
    ],
    //缴费查询银行流水-认领状态
    "claimStatusTwo":[
        {
            code:"0",
            value:"未认领"
        },
        {
            code:"1",
            value:"认领中"
        }
    ],
    //送支付平台-支付状态
    "sendEnd_approveStatus":[
        {
            code:"2",
            value:"退票"
        },
        {
            code:"z",
            value:"未支付"
        },
        {
            code:"9",
            value:"支付成功"
        },
        {
            code:"n",
            value:"支付失败"
        }
    ],
    //是否实付标识
    "payrefflag":[
        {
            code:"0",
            value:"未实付"
        },
        {
            code:"1",
            value:"已实付"
        }
    ],
    //会计引擎-收付类型-现金流代码
    "cashflowCode":[
        {
            "code": "CA00002",
            "value": "手续费结算类现金流"
        }, {
            "code": "CA00003",
            "value": "赔款结算类现金流"
        }, {
            "code": "CA00004",
            "value": "预赔结算类现金流"
        }, {
            "code": "CA00005",
            "value": "再保结算类现金流"
        }, {
            "code": "CA00006",
            "value": "再保代扣代缴类现金流"
        }, {
            "code": "CA00007",
            "value": "代收从共方保费结算类现金流"
        }, {
            "code": "CA00008",
            "value": "付从共方保费结算类现金流"
        }, {
            "code": "CA00009",
            "value": "代收从联方保费结算类现金流"
        }, {
            "code": "CA00010",
            "value": "付从联方保费结算类现金流"
        }, {
            "code": "CA00011",
            "value": "暂收款结算类现金流"
        }, {
            "code": "CA00012",
            "value": "车船税结算类现金流"
        }, {
            "code": "CA00001",
            "value": "保费收付类现金流"
        }
    ],
    //是否股东标识
    "shareHolderFlag":[
        {
            code:"1",
            value:"股东业务"
        },
        {
            code:"0",
            value:"非股东业务"
        }
    ],
    //基础信息配置--银行商户添加渠道类型
    "operationSign":[
        {
            code:"01",
            value:"转账（认领银行流水）"
        },
        {
            code:"02",
            value:"微信"
        },
        {
            code:"03",
            value:"支付宝"
        },
        {
            code:"04",
            value:"银联网银"
        },
        {
            code:"05",
            value:"快钱网银"
        },
        {
            code:"06",
            value:"pos刷卡"
        },
        {
            code:"07",
            value:"其他"
        }
    ],
    //付赔款--赔款类型
    "lossTypeSign":[
        {
            code:"01",
            value:"赔款"
        },
        {
            code:"02",
            value:"费用"
        }
    ],
    //业务红冲-收付类型
    "reverseTypeCerti":[
        {
            code:"53",
            value:"无单预收款结算"
        },
        {
            code:"43",
            value:"收追偿款"
        }
    ],
    //业务红冲-凭证状态
    "VouStatus":[
        {
            code:"0",
            value:"待复核"
        },
        {
            code:"1",
            value:"复核通过"
        },
        {
            code:"2",
            value:"无需复核"
        },
        {
            code:"3",
            value:"打回"
        }
    ],
    //业务红冲-送财务标识
    "transAccStatus":[
        {
            code:"0",
            value:"未送财务"
        },
        {
            code:"1",
            value:"送财务成功"
        },
        {
            code:"2",
            value:"送财务失败"
        }
    ]

});