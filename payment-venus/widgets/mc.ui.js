define([
    'angular'
], function () {
    /**
     * @description
     * ui 指令
     *
     */
    angular.module('mc.ui', [])
        .controller('mcActionButtonCtrl', [function() {
            var ctrl = this;

            ctrl.callback = angular.noop();
            ctrl.confirmBeforeAction = false;   //是否要在执行action前再次确认
            ctrl.confirmDelay = undefined;           //延时几秒后取消确认
            ctrl.confirmTimeout = undefined;
            ctrl.confirmed = false;
            ctrl.confirmText = undefined;

            ctrl.originalText = '';
            ctrl.originalClasses = [];

        }])
        .directive('mcActionButton', ['$parse', '$compile', '$timeout', function($parse, $compile, $timeout) {

            return {
                restrict: 'A',
                require: 'mcActionButton',
                scope: true,
                controller: 'mcActionButtonCtrl',
                compile: function(tElement) {


                    return function(scope, element, attrs, ctrl) {

                        var cfg = {
                            spinnerTpl: '<span class="glyphicon"></span>',
                            priority: 0,
                            disableBtn: true,
                            confirmDelay: 3000,
                            confirmText: '确定',
                            btnLoadingClass: 'is-loading',
                            addClassToCurrentBtnOnly: false,
                            disableCurrentBtnOnly: false,
                            minDuration: false,
                            CLICK_EVENT: 'click',
                            CLICK_ATTR: 'ngClick',
                            SUBMIT_EVENT: 'submit',
                            SUBMIT_ATTR: 'ngSubmit',
                            BTN_SELECTOR: 'button'
                        };

                        var promiseWatcher;
                        var minDurationTimeout;
                        var minDurationTimeoutDone;
                        var promiseDone;

                        function initLoadingState(btnEl) {
                            if (cfg.btnLoadingClass && !cfg.addClassToCurrentBtnOnly) {
                                btnEl.addClass(cfg.btnLoadingClass);
                            }
                            if (cfg.disableBtn && !cfg.disableCurrentBtnOnly) {
                                btnEl.attr('disabled', 'disabled');
                            }
                        }

                        function appendSpinnerTpl(btnEl) {
                            btnEl.append($compile(cfg.spinnerTpl)(scope));
                        }

                        function handleLoadingFinished(btnEl) {
                            if ((!cfg.minDuration || minDurationTimeoutDone) && promiseDone) {
                                if (cfg.btnLoadingClass) {
                                    btnEl.removeClass(cfg.btnLoadingClass);
                                }
                                if (cfg.disableBtn) {
                                    btnEl.removeAttr('disabled');
                                }
                            }

                            if(ctrl.confirmBeforeAction) {
                                restoreOriginalButton(btnEl);
                            }

                        }

                        function initHandlingOfViewFunctionsReturningAPromise(eventToHandle, attrToParse, btnEl) {
                            // we need to use evalAsync here, as
                            // otherwise the click or submit event
                            // won't be ready to be replaced
                            scope.$evalAsync(function() {
                                ctrl.callback = $parse(attrs[attrToParse]);

                                // unbind original click event
                                element.unbind(eventToHandle);

                                // rebind, but this time watching it's return value
                                element.bind(eventToHandle, function(event) {
                                    // Make sure we run the $digest cycle
                                    scope.$apply(function() {
                                        // execute function on parent scope
                                        // as we're in an isolate scope here

                                        var promise = ctrl.callback(scope.$parent, {$event: event});

                                        // only init watcher if not done before
                                        if (!promiseWatcher) {
                                            promiseWatcher = initPromiseWatcher(function() {
                                                return promise;
                                            }, btnEl);
                                        }
                                    });
                                });
                            });
                        }

                        function initPromiseWatcher(watchExpressionForPromise, btnEl) {
                            // watch promise to resolve or fail
                            scope.$watch(watchExpressionForPromise, function(mVal) {
                                minDurationTimeoutDone = false;
                                promiseDone = false;

                                // create timeout if option is set
                                if (cfg.minDuration) {
                                    minDurationTimeout = $timeout(function() {
                                        minDurationTimeoutDone = true;
                                        handleLoadingFinished(btnEl);
                                    }, cfg.minDuration);
                                }

                                // for regular promises
                                if (mVal && mVal.then) {

                                    if(ctrl.confirmBeforeAction && !ctrl.confirmed) {
                                        mVal.cancel();
                                        setConfirmButton(btnEl);
                                    } else {
                                        initLoadingState(btnEl);
                                        mVal.then(function() {
                                                promiseDone = true;
                                                handleLoadingFinished(btnEl);
                                            },
                                            function() {
                                                promiseDone = true;
                                                handleLoadingFinished(btnEl);
                                            }
                                        );
                                    }
                                }
                            });
                        }

                        function addHandlersForCurrentBtnOnly(btnEl) {
                            // handle current button only options via click
                            if (cfg.addClassToCurrentBtnOnly) {
                                btnEl.on(cfg.CLICK_EVENT, function() {
                                    btnEl.addClass(cfg.btnLoadingClass);
                                });
                            }

                            if (cfg.disableCurrentBtnOnly) {
                                btnEl.on(cfg.CLICK_EVENT, function() {
                                    btnEl.attr('disabled', 'disabled');
                                });
                            }
                        }

                        function restoreOriginalButton(btnEl) {
                            ctrl.confirmed = false;
                            btnEl[0].innerText = ctrl.originalText;
                            btnEl.attr('class', ctrl.originalClasses);
                            addHandlersForCurrentBtnOnly(btnEl);
                            initHandlingOfViewFunctionsReturningAPromise(cfg.CLICK_EVENT, cfg.CLICK_ATTR, element)
                        }

                        function startConfirmTimeout(btnEl) {
                            ctrl.confirmTimeout = $timeout(function() {
                                restoreOriginalButton(btnEl);
                            }, ctrl.confirmDelay);
                        }

                        function setConfirmButton(btnEl) {
                            btnEl.addClass('btn-danger');
                            btnEl[0].innerText = ctrl.confirmText;
                            startConfirmTimeout(btnEl);
                            btnEl.bind(cfg.CLICK_EVENT, function() {
                                scope.$apply(function() {

                                    ctrl.confirmed = true;
                                    initLoadingState(btnEl);
                                    $timeout.cancel(ctrl.confirmTimeout);

                                    var promise = ctrl.callback(scope.$parent, {$event: event});

                                    // only init watcher if not done before
                                    if (!promiseWatcher) {
                                        promiseWatcher = initPromiseWatcher(function() {
                                            return promise;
                                        }, btnEl);
                                    }
                                })
                            })
                        }

                        ctrl.confirmBeforeAction = scope.$eval(attrs.confirm) || false;
                        ctrl.confirmDelay = scope.$eval(attrs.confirmDelay) || cfg.confirmDelay;

                       ctrl.originalClasses = attrs['class'];
                        ctrl.confirmText = attrs.confirmText || cfg.confirmText;

                        ctrl.originalText = element[0].innerText;

                        if(attrs.hasOwnProperty('ngClick')) {
                            appendSpinnerTpl(element);
                            addHandlersForCurrentBtnOnly(element);
                            initHandlingOfViewFunctionsReturningAPromise(cfg.CLICK_EVENT, cfg.CLICK_ATTR, element);
                        }

                        scope.$on('$destroy', function() {
                            $timeout.cancel(minDurationTimeout);
                        });
                    }
                }
            }
        }])

        .controller('mcDropdownCtrl', ['$scope', '$element', 'mcCodeSelectConfig', 'mcCodeRepeatParser', '$injector', '$timeout',
            function($scope, $element, mcCodeSelectConfig, RepeatParser, $injector, $timeout) {
                var ctrl = this;

                ctrl.open = false;
                ctrl.toggle = function() {
                    ctrl.open = !ctrl.open;

                };

            }])
        .directive('mcDropdown', ['$document', function($document) {

            return {
                restrict: 'A',
                require: 'mcDropdown',
                templateUrl: 'template/mc/dropdown/dropdown.tpl.html',
                scope: true,
                replace: true,
                transclude: true,
                controller: 'mcDropdownCtrl',
                controllerAs: '$dropdown',
                compile: function(tElement) {


                    return function(scope, element, attrs, $dropdown, transcludeFn) {

                        transcludeFn(scope, function(clone) {
                            clone.addClass('dropdown-menu');
                            element.append(clone);
                        });

                        function onDocumentClick(e) {
                            if (!$dropdown.open) return; //Skip it if dropdown is close

                            var contains = false;

                            if (window.jQuery) {
                                // Firefox 3.6 does not support element.contains()
                                // See Node.contains https://developer.mozilla.org/en-US/docs/Web/API/Node.contains
                                contains = window.jQuery.contains(element[0], e.target);
                            } else {
                                contains = element[0].contains(e.target);
                            }

                            if(!contains) {
                                close(e);
                            }

                        }

                        function close(e) {
                            $dropdown.open = false;
                            scope.$digest();
                        }

                        element.querySelectorAll('li').bind('click', close);

                        // See Click everywhere but here event http://stackoverflow.com/questions/12931369
                        $document.on('click', onDocumentClick);

                        scope.$on('$destroy', function() {
                            $document.off('click', onDocumentClick);
                            element.querySelectorAll('li').off('click', close)
                        });


                    }
                }

            }
        }])

        .directive('multipleForm', ['$compile', function ($compile) {
            return {
                restrict: 'AE',
                scope: {
                    isVerification: '='
                },
                compile: function () {
                    return function (scope, element, attrs) {

                        //是否修改输入框
                        var isChange = [];

                        /**
                         * 对象是否 存在
                         * @param str
                         * @returns {boolean}
                         */
                        function isObj(str) {
                            if (str == null || typeof(str) == 'undefined')
                                return false;
                            return true;
                        }

                        /**
                         * 去除字符串中的空格
                         * @param str
                         * @returns {*}
                         */
                        function strTrim(str) {
                            if (!isObj(str))
                                return 'undefined';
                            str = str.replace(/^\s+|\s+$/g, '');
                            return str;
                        }

                        /**
                         * 必需是整数
                         * @param str
                         * @returns {boolean}
                         */
                        function isInt(str) {
                            var reg = /^(-|\+)?\d+$/;
                            return str.match(reg);
                        }

                        /**
                         * 分离规则
                         * @param _rules
                         * @returns {Array}
                         */
                        function splitText(_rules) {
                            var myRules = [];
                            if (_rules) {
                                //根据“;”区分多个条件
                                var rules = _rules.split(';');
                                if (rules.length > 0) {
                                    //循环规则
                                    $.each(rules, function (index, rule) {
                                        //根据“:”区分规则头和内容
                                        var ruleContent = rule.split(':');
                                        //判断是否存在内容
                                        if (ruleContent.length > 1) {
                                            myRules.push({title: ruleContent[0], content: ruleContent[1]})
                                        } else if (ruleContent.length = 1) {
                                            myRules.push({title: ruleContent[0], content: ""})
                                        }
                                    });
                                }
                            }
                            return myRules;
                        }

                        /**
                         * 存储输入框是否通过验证
                         * @param myRules
                         * @param node
                         */
                        function getIsChange(myRules, node) {
                            //初始化判断是否有不能为空的
                            $.each(myRules, function (index, rule) {
                                if (rule.title == 'require') {//不能为空
                                    //给当前节点target赋值
                                    node.target = isChange.length;
                                    //存储是否修改书输入框
                                    isChange.push(false);
                                    return false;
                                }
                            });
                        }

                        /**
                         * 循环节点添加事件
                         * @param node
                         */
                        function chackNode(node) {
                            //节点是输入框
                            if (node.nodeName == 'INPUT' || node.nodeName == 'SELECT') {
                                if (node.attributes.length > 0) {
                                    //错误文字信息
                                    var errText;
                                    //循环节点属性
                                    $.each(node.attributes, function (index, attribute) {
                                        //添加错误提示文字
                                        if (attribute.name == 'err-text') {
                                            errText = $('<span style="color: red">' + attribute.value + '</span>');
                                        }
                                        //判断属性为rule
                                        if (attribute.name == 'rule') {
                                            //分离规则
                                            var myRules = splitText(attribute.value);
                                            //存储输入框是否通过验证
                                            getIsChange(myRules, node);
                                            //监听DOM事件，变化时修改变量值
                                            node.onkeyup = function (ev) {
                                                var isVerification = true;
                                                if (myRules.length > 0) {
                                                    //循环判断是否复核规则
                                                    $.each(myRules, function (index, rule) {
                                                        //有一个条件不满足就停止执行
                                                        if (!ruleJudge(node, rule, ev.target.value)) {
                                                            isVerification = false;
                                                            //添加错误提示文字
                                                            if (errText) {
                                                                errText.appendTo(node.parentElement);
                                                            }
                                                            return false;
                                                        }
                                                        //删除节点
                                                        if (errText) {
                                                            errText.remove();
                                                        }
                                                    });
                                                    scope.$apply(function () {
                                                        scope.isVerification = isVerification;
                                                    });
                                                }
                                            };
                                            //监听DOM事件，变化时修改变量值
                                            node.onblur = function (ev) {
                                                var isVerification = true;
                                                //输入框值发生改变需要判断是否通过验证
                                                //循环判断是否复核规则
                                                $.each(myRules, function (index, rule) {
                                                    //有一个条件不满足就停止执行
                                                    if (!ruleJudge(node, rule, ev.target.value)) {
                                                        isVerification = false;
                                                        return false;
                                                    }
                                                });
                                                //不是必填项可以不填
                                                if (node.target == undefined && strTrim(ev.target.value) == "") {
                                                   node.style.border = '';
                                                    isVerification = true;
                                                    //删除节点
                                                    if (errText) {
                                                        errText.remove();
                                                    }
                                                }
                                                //循环必填项判断是否填写完毕
                                                $.each(isChange, function (index, item) {
                                                    //仍旧存在未修改的输入框
                                                    if (!item) {
                                                        isVerification = false;
                                                        return false;
                                                    }
                                                });
                                                scope.$apply(function () {
                                                    scope.isVerification = isVerification;
                                                });
                                            };
                                        }
                                    });
                                }
                            } else if (node.childElementCount > 0) {//存在子节点
                                //循环子节点
                                $.each(node.children, function (index, childrenNode) {
                                    chackNode(childrenNode);
                                });
                            }
                        }

                        /**
                         * 判断规则
                         * @param node
                         * @param rule
                         * @param value
                         */
                        function ruleJudge(node, rule, value) {
                            //去除空格
                            value = strTrim(value);
                            //是否通过
                            var isPass;
                            //日期验证正则yyyy-mm-dd
                            var dateStr = "/^((?:19|20)\d\d)-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/";
                            //正整数
                            var numberIntStr = "^[0-9]*$";
                            //浮点数
                            var numberFloatStr = "^[0-9]+.?[0-9]*$";
                            switch (rule.title) {
                                case 'require'://不能为空
                                    if (value.length > 0) {
                                        isChange[node.target] = true;
                                        node.style.border = '';
                                        isPass = true;
                                    } else {
                                        isChange[node.target] = false;
                                        node.style.border = '1px red solid';
                                        isPass = false;
                                    }
                                    return isPass;
                                case 'maxLength'://最大长度
                                    if (value.length > parseInt(rule.content)) {
                                        if (node.target) {
                                            isChange[node.target] = false;
                                        }
                                        node.style.border = '1px red solid';
                                        isPass = false;
                                    } else {
                                        //是否存在target
                                        if (node.target) {
                                            isChange[node.target] = true;
                                        }
                                        node.style.border = '';
                                        isPass = true;
                                    }
                                    return isPass;
                                case 'minLength'://最小长度
                                    if (value.length < parseInt(rule.content)) {
                                        if (node.target) {
                                            isChange[node.target] = false;
                                        }
                                        node.style.border = '1px red solid';
                                        isPass = false;
                                    } else {
                                        //是否存在target
                                        if (node.target) {
                                            isChange[node.target] = true;
                                        }
                                        node.style.border = '';
                                        isPass = true;
                                    }
                                    return isPass;
                                case 'date'://日期格式
                                    if (!value.match(dateStr)) {
                                        if (node.target) {
                                            isChange[node.target] = false;
                                        }
                                        node.style.border = '1px red solid';
                                        isPass = false;
                                    } else {
                                        //是否存在target
                                        if (node.target) {
                                            isChange[node.target] = true;
                                        }
                                        node.style.border = '';
                                        isPass = true;
                                    }
                                    return isPass;
                                case 'number'://数字
                                    var numberStr;
                                    if (rule.content != "") {
                                        if ("int" == rule.content) {//整形
                                            numberStr = numberIntStr;
                                        } else if ("float" == rule.content) {//浮点类型
                                            numberStr = numberFloatStr;
                                        }
                                    } else {
                                        //为空时默认浮点类型
                                        numberStr = numberFloatStr;
                                    }
                                    if (!value.match(numberStr)) {
                                        if (node.target) {
                                            isChange[node.target] = false;
                                        }
                                        node.style.border = '1px red solid';
                                        isPass = false;
                                    } else {
                                        //是否存在target
                                        if (node.target) {
                                            isChange[node.target] = true;
                                        }
                                        node.style.border = '';
                                        isPass = true;
                                    }
                                    return isPass;
                                case 'bill'://账单期类型
                                    if (value == "月度" || value == "季度") {
                                        //是否存在target
                                        if (node.target) {
                                            isChange[node.target] = true;
                                        }
                                        node.style.border = '';
                                        isPass = true;
                                    } else {
                                        if (node.target) {
                                            isChange[node.target] = false;
                                        }
                                        node.style.border = '1px red solid';
                                        isPass = false;
                                    }
                                    return isPass;
                                default :
                                    node.style.border = '';
                                    return true;
                            }
                        }

                        //存在节点
                        if (element[0]) {
                            chackNode(element[0]);
                        }
                    };
                }
            }
        }]);
});
