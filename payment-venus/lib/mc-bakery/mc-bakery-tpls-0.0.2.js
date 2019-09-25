/*
 * mc.bakery
 * Version: 0.0.2 - 2017-06-06
 * License: MIT
 */
angular.module("mc.bakery", ["mc.bakery.tpls","mc.bakery.actionButton","mc.bakery.dropdown","mc.bakery.stepGuide","mc.bakery.toggle"]);
angular.module("mc.bakery.tpls", ["template/mc/dropdown/dropdown.tpl.html","template/mc/toggle/toggle.tpl.html","template/mc/stepGuide/step.guide.tpl.html","template/mc/stepGuide/step.tpl.html","template/mc/toggle/toggle.tpl.html"]);
angular.module('mc.bakery.actionButton', [])

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
            link: function(scope, element, attrs, ctrl) {

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
    }]);

angular.module('mc.bakery.dropdown', [])

    .controller('mcDropdownCtrl', [function() {
        var ctrl = this;

        ctrl.open = false;
        ctrl.toggle = function() {
            ctrl.open = !ctrl.open;
        };
        ctrl.menuToggle = function() {
            if(ctrl.isMenu){
                $('.menu'+ctrl.menuIndex).toggle();
                ctrl.open = !ctrl.open;
            }
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
            link: function(scope, element, attrs, $dropdown, transcludeFn) {
                $dropdown.isMenu = false;
                if(attrs.isMenu)
                    $dropdown.isMenu = true;

                if(attrs.menuIndex)
                    $dropdown.menuIndex =attrs.menuIndex;

                    transcludeFn(scope, function(clone) {
                        clone.addClass('dropdown-menu');
                        clone.addClass('menu'+$dropdown.menuIndex);
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

                    if(!$dropdown.isMenu){
                        // See Click everywhere but here event http://stackoverflow.com/questions/12931369
                        element.on('click', onDocumentClick);
                    }


                    scope.$on('$destroy', function() {
                        if(!$dropdown.isMenu){
                            $document.off('click', onDocumentClick);
                        }
                        element.querySelectorAll('li').off('click', close)
                    });

                }
            }
    }]);
angular.module('mc.bakery.stepGuide', [])

    .directive('mcStep', [function() {
        return {
            restrict: 'A',
            require: '^mcStepGuide',
            scope: {
                'stepIndex':'@',
                'stepLabel':'@'
            },
            templateUrl: 'template/mc/stepGuide/step.tpl.html',
            compile: function(tElement) {

                return function(scope, element, attrs, ctrl) {
                    scope.$steps = ctrl;
                }
            }
        }
    }])

    .directive('mcStepGuide', ['$compile', function($compile) {
        return {
            restrict: 'A',
            templateUrl: 'template/mc/stepGuide/step.guide.tpl.html',
            require: 'mcStepGuide',
            transclude: true,
            controller: function(){
                var ctrl = this;
                this.step = 0;
            },
            controllerAs: '$steps',
            replace: true,
            compile: function(tElement) {
                tElement.append('<div class="mc-step-line"></div>');

                return function(scope, element, attrs, ctrl, transcludeFn) {

                    var $steps = ctrl;

                    transcludeFn(scope, function(clone) {
                        var transcluded = angular.element('<div>').append(clone);

                        var steps = transcluded.querySelectorAll('li');

                        for(var i=0; i<steps.length; i++) {
                            var step = angular.element(steps[i]);
                            console.log(step[0].innerText);
                            step.attr('step-index', i+1);
                            step.attr('step-label', step[0].innerText);
                            step.attr('mc-step','');
                        }

                        element.append($compile(transcluded)(scope));
                    });

                    attrs.$observe('step', function(step) {
                        $steps.step = step;
                    });
                }
            }
        }
    }]);

angular.module('mc.bakery.toggle', [])

    .controller('toggleCtrl', [function() {

            var ctrl = this;

            ctrl.isOn = undefined;

            ctrl.toggle = function() {
                ctrl.isOn = !ctrl.isOn;
            }

    }])
    .directive('mToggle', [function () {
            return {
                require: ['mToggle', 'ngModel'],
                restrict: 'EA',
                templateUrl: 'template/mc/toggle/toggle.tpl.html',
                controller: 'toggleCtrl',
                controllerAs: '$toggle',
                link:function(scope, element, attrs, ctrls) {

                    var $toggle = ctrls[0];
                    var ngModel = ctrls[1];

                    ngModel.$render = function() {
                        $toggle.isOn = ngModel.$viewValue;
                    };

                    //Update viewValue if model change
                    scope.$watch('$toggle.isOn', function(newValue) {
                        if (ngModel.$viewValue !== newValue && angular.isDefined(newValue))
                            ngModel.$setViewValue(newValue);
                    });
                }
            }
    }])
    .directive('mcToggle', [function () {
            return {
                require: 'ngModel',
                restrict: 'EA',
                compile:function(tElement, tAttrs) {

                    tElement.after('<div m-toggle ng-model="' + tElement.attr("ng-model") + '"></div>');

                    return function(scope, element) {
                        element.remove();
                    }
                }
            }
    }]);

angular.module("template/mc/dropdown/dropdown.tpl.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("template/mc/dropdown/dropdown.tpl.html",
        "<div ng-mouseover=\"$dropdown.menuToggle()\" ng-mouseout=\"$dropdown.menuToggle()\"><div ng-if=\"!$dropdown.isMenu\" class=\"dropdown\" ng-class=\"{open: $dropdown.open}\">\n"+
        "<button id=\"dLabel\" type=\"button\" ng-click=\"$dropdown.toggle()\" class=\"btn btn-link\" aria-haspopup=\"true\" aria-expanded=\"false\">\n"+
        "<span class=\"glyphicon glyphicon-option-horizontal\"></span>\n"+
        "</button>\n"+
        "</div>\n"+
        "<div ng-if=\"$dropdown.isMenu\" class=\"dropdown\" ng-class=\"{open: $dropdown.open}\">\n"+
        "<button id=\"dLabel\" type=\"button\" class=\"btn btn-link\" aria-haspopup=\"true\" aria-expanded=\"false\">\n"+
        "<span class=\"glyphicon glyphicon-option-horizontal\"></span>\n"+
        "</button>\n"+
        "</div>\n"+
        "</div>\n"+
        "");
}]);
angular.module("template/mc/toggle/toggle.tpl.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("template/mc/toggle/toggle.tpl.html",
        "<div class=\"toggle toggle-sm toggle-off\" ng-class=\"{'toggle-on': $toggle.isOn, 'toggle-off': !$toggle.isOn}\" ng-click=\"$toggle.toggle()\">\n"+
        "<label class=\"toggle-radio\">\n"+
        "<div class=\"toggle-handle\"></div>\n"+
        "</label>\n"+
        "<label class=\"toggle-radio\"></label>\n"+
        "</div>\n"+
        "");
}]);
angular.module("template/mc/stepGuide/step.guide.tpl.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("template/mc/stepGuide/step.guide.tpl.html",
        "<div class=\"mc-step-wrapper\"></div>\n"+
        "");
}]);
angular.module("template/mc/stepGuide/step.tpl.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("template/mc/stepGuide/step.tpl.html",
        "<div class=\"mc-step\" ng-class=\"{'active':$steps.step>=stepIndex}\">{{stepIndex}}</div>\n"+
        "<div class=\"mc-step-label\">{{stepLabel}}</div>\n"+
        "");
}]);