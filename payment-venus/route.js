/**
 * 路由模块
 */
define([
    'app',
    'frame/menu/menu.ctrl',
    'frame/header/header.ctrl'
], function (app) {

    app.registerProvider('route', [
        '$stateProvider',
        '$urlRouterProvider',
        '$couchPotatoProvider',
        '$locationProvider',
        '$provide',
        function ($stateProvider,
                  $urlRouterProvider,
                  $couchPotatoProvider) {
            this.$get = function () {
                return {};
            };

            $urlRouterProvider
                .when('', '/');

            $urlRouterProvider.otherwise('/dashboard');

            $stateProvider


                //工作台(登陆后主页)
                // .state('dashboard', {
                //     url: '/dashboard',
                //     resolve: {
                //         dummy: $couchPotatoProvider.resolveDependencies(['components/dashboard/controller/dashboard.ctrl']),
                //         access:function($$user){ return $$user.isAuthenticated()}
                //     },
                //     views: {
                //         'main': {
                //             templateUrl: 'components/dashboard/tpl/dashboard.tpl.html',
                //             controller: 'DashboardCtrl'
                //         }
                //     }
                // })
                ////收款确认
                //.state('collection', {
                //    url: '/collection',
                //    resolve: {
                //        dummy: $couchPotatoProvider.resolveDependencies(['components/collection/main/controller/collection.ctrl'])
                //    },
                //    views: {
                //        'main': {
                //            templateUrl: 'components/collection/main/tpl/collection.tpl.html',
                //            controller: 'CollectionCtrl'
                //        }
                //    }
                //})
                // //付款确认
                // .state('payment', {
                //     url: '/payment',
                //     resolve: {
                //         dummy: $couchPotatoProvider.resolveDependencies(['components/payment/main/controller/payment.ctrl'])
                //     },
                //     views: {
                //         'main': {
                //             templateUrl: 'components/payment/main/tpl/payment.tpl.html',
                //             controller: 'PaymentCtrl'
                //         }
                //     }
                // })
                //日结
                // .state('daily', {
                //     url: '/daily',
                //     resolve: {
                //         dummy: $couchPotatoProvider.resolveDependencies(['components/daily/controller/daily.ctrl'])
                //     },
                //     views: {
                //         'main': {
                //             templateUrl: 'components/daily/tpl/daily.tpl.html',
                //             controller: 'DailyCtrl'
                //         }
                //     }
                // })
                //催收管理
                // .state('press',{
                //     url: '/press',
                //     resolve: {
                //         dummy: $couchPotatoProvider.resolveDependencies(['components/press/main/controller/press.ctrl'])
                //     },
                //     views: {
                //         'main': {
                //             templateUrl: 'components/press/main/tpl/press.tpl.html',
                //             controller: 'PressCtrl'
                //         }
                //     }
                // })
                ////综合查询
                //.state('statistics',{
                //    url: '/statistics',
                //    resolve: {
                //        dummy: $couchPotatoProvider.resolveDependencies(['components/statistics/main/controller/statistics.main.ctrl'])
                //    },
                //    views: {
                //        'main': {
                //            templateUrl: 'components/statistics/main/tpl/statistics.main.tpl.html',
                //            controller: 'StatisticsCtrl'
                //        }
                //    }
                //})
                ////台账
                //.state('billsManage',{
                //    url: '/billsManage',
                //    resolve: {
                //        dummy: $couchPotatoProvider.resolveDependencies(['components/billsManage/main/controller/billsManage.main.ctrl'])
                //    },
                //    views: {
                //        'main': {
                //            templateUrl: 'components/billsManage/main/tpl/billsManage.main.tpl.html',
                //            controller: 'BillsManageCtrl'
                //        }
                //    }
                //})
                //数据质量管理
                .state('information',{
                    url: '/information',
                    resolve: {
                        dummy: $couchPotatoProvider.resolveDependencies(['components/information/main/controller/information.main.ctrl'])
                    },
                    views: {
                        'main': {
                            templateUrl: 'components/information/main/tpl/information.tpl.html',
                            controller: 'InformationCtrl'
                        }
                    }
                })
                ////监控管理
                //.state('monitor',{
                //    url: '/monitor',
                //    resolve: {
                //        dummy: $couchPotatoProvider.resolveDependencies(['components/monitor/main/controller/monitor.ctrl'])
                //    },
                //    views: {
                //        'main': {
                //            templateUrl: 'components/monitor/main/tpl/monitor.tpl.html',
                //            controller: 'MonitorCtrl'
                //        }
                //    }
                //})
                //设置
                .state('setup',{
                    url: '/setup',
                    resolve: {
                        dummy: $couchPotatoProvider.resolveDependencies(['components/setup/main/controller/setup.ctrl'])
                    },
                    views: {
                        'main': {
                            templateUrl: 'components/setup/main/tpl/setup.tpl.html',
                            controller: 'SetupCtrl'
                        }
                    }
                })
                //demo
                .state('demo',{
                    url: '/demo',
                    resolve: {
                        // dummy: $couchPotatoProvider.resolveDependencies(['components/demo/controller/demo.ctrl'])
                    },
                    views: {
                        'main': {
                            templateUrl: 'components/demo/tpl/demo.tpl.html'
                            // controller: 'DemoCtrl'
                        }
                    }
                })
                //.state('banktest',{
                //    url: '/banktest',
                //    resolve: {
                //         dummy: $couchPotatoProvider.resolveDependencies(['components/banktest/bankStatementImportent/controller/bankStatementImportent.ctrl','components/banktest/bankStatementImportent/factory/bankStatementImportent'])
                //    },
                //    views: {
                //        'main': {
                //            templateUrl: 'components/banktest/bankStatementImportent/tpl/bankStatementImportent.tpl.html',
                //             controller: 'BankStatementImportentCtrl',
                //            factory:'BankStatementImportent'
                //        }
                //    }
                //})

                //收付引擎
                .state('paymentEngine', {
                    url: '/paymentEngine',
                    resolve: {
                        dummy: $couchPotatoProvider.resolveDependencies(['components/paymentEngine/controller/paymentEngine.ctrl'])
                    },
                    views: {
                        'main': {
                            templateUrl: 'components/paymentEngine/tpl/paymentEngine.tpl.html',
                            controller: 'PaymentEngineCtrl'
                        }
                    }
                })
                //车船税管理
                .state('carShipTax', {
                    url: '/carShipTax',
                    resolve: {
                        dummy: $couchPotatoProvider.resolveDependencies(['components/carShipTax/main/controller/carShipTax.main.ctrl'])
                    },
                    views: {
                        'main': {
                            templateUrl: 'components/settlementManage/carShipTax/main/tpl/carShipTax.main.tpl.html',
                            controller: 'CarShipCtrl'
                        }
                    }
                })
                //银行流水管理
                // .state('bank', {
                //     url: '/bank',
                //     resolve: {
                //         dummy: $couchPotatoProvider.resolveDependencies(['components/bankManage/main/controller/bankManage.main.ctrl'])
                //     },
                //     views: {
                //         'main': {
                //             templateUrl: 'components/bankManage/main/tpl/bankManage.main.tpl.html',
                //             controller: 'BankManageCtrl'
                //         }
                //     }
                // })
                //打印
                .state('print', {
                    url: '/print',
                    resolve: {
                        dummy: $couchPotatoProvider.resolveDependencies(['components/demo/print/printTest.ctrl'])
                    },
                    views: {
                        'main': {
                            templateUrl: 'components/demo/print/printTest.html',
                            controller: 'PrintCtrl'
                        }
                    }
                })
                //无单预收管理
                .state('noreceipt', {
                    url: '/noreceipt',
                    resolve: {
                        dummy: $couchPotatoProvider.resolveDependencies(['components/noreceipt/main/controller/noreceipt.ctrl'])
                    },
                    views: {
                        'main': {
                            templateUrl: 'components/noreceipt/main/tpl/noreceipt.tpl.html',
                            controller: 'noreceiptCtrl'
                        }
                    }
                })
                //支付平台
                // .state('paymentPlatform', {
                //     url: '/paymentPlatform',
                //     resolve: {
                //         dummy: $couchPotatoProvider.resolveDependencies(['components/paymentPlatform/main/controller/paymentPlatform.ctrl'])
                //     },
                //     views: {
                //         'main': {
                //             templateUrl: 'components/paymentPlatform/main/tpl/paymentPlatform.tpl.html',
                //             controller: 'paymentPlatformCtrl'
                //         }
                //     }
                // })
                //认领管理
                .state('claim', {
                    url: '/claim',
                    resolve: {
                        dummy: $couchPotatoProvider.resolveDependencies(['components/claim/main/controller/claim.ctrl'])
                    },
                    views: {
                        'main': {
                            templateUrl: 'components/claim/main/tpl/claim.tpl.html',
                            controller: 'claimCtrl'
                        }
                    }
                })
                //手续费及佣金管理
                .state('poundage', {
                    url: '/poundage',
                    resolve: {
                        dummy: $couchPotatoProvider.resolveDependencies(['components/poundage/main/controller/poundage.ctrl'])
                    },
                    views: {
                        'main': {
                            templateUrl: 'components/poundage/main/tpl/poundage.tpl.html',
                            controller: 'poundageCtrl'
                        }
                    }
                })
                //进项发票管理
                .state('inputInvoice', {
                    url: '/inputInvoice',
                    resolve: {
                        dummy: $couchPotatoProvider.resolveDependencies(['components/inputInvoice/main/controller/inputInvoice.ctrl'])
                    },
                    views: {
                        'main': {
                            templateUrl: 'components/inputInvoice/main/tpl/inputInvoice.tpl.html',
                            controller: 'inputInvoiceCtrl'
                        }
                    }
                })

        }
    ]);

});