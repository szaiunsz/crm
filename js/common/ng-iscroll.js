angular.module('ng-iscroll', []).directive('ngIscroll', function ()
{
    return {
        replace: false,
        restrict: 'A',
        link: function (scope, element, attr)
        {

            // default timeout
            var ngiScroll_timeout = 5;

            var myScroll,pullDownEl, pullDownOffset,pullUpEl, pullUpOffset;
            pullDownEl = document.getElementById(attr.pullDownId);
            pullDownOffset = pullDownEl.offsetHeight;

            if (pullDownOffset == 0) {
                pullDownOffset = $(pullDownEl).height();
            }

            pullUpEl = document.getElementById(attr.pullUpId);
            pullUpOffset = pullUpEl.offsetHeight;

            // default options
            var ngiScroll_opts = {
                snap: false,
                momentum: true,
                hScrollbar: false,
                useTransition: true,
                topOffset: pullDownOffset,
                hideScrollbar: true,
                onRefresh: function () {
                    if (pullDownEl.className.match('loading')) {
                        pullDownEl.className = '';
                        pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新';
                    } else if (pullUpEl.className.match('loading')) {
                        pullUpEl.className = '';
                        pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更1';
                    }
                },
                onScrollMove: function () {
                    if (this.y > 5 && !pullDownEl.className.match('flip')) {
                        pullDownEl.className = 'flip';
                        var innerHTML = "";
                        if ("wrapper" == attr.id) {
                            var strDate = new Date();//localStorage.getItem(obje+"_list_refresh")||"";
                            innerHTML = '<span class="refreshTitle">上次更新时间</span><span class="refreshDate">'+strDate+'</span>';
                        } else {
                            innerHTML = "下拉刷新";
                        }
                        pullDownEl.querySelector('.pullDownLabel').innerHTML = innerHTML;
                        this.minScrollY = 0;
                    } else if (this.y < 5 && pullDownEl.className.match('flip')) {
                        pullDownEl.className = '';
                        pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新';
                        this.minScrollY = -pullDownOffset;
                    } else if (this.y < (this.maxScrollY - 15) && !pullUpEl.className.match('flip')) {
                        pullUpEl.className = 'flip';
                        pullUpEl.querySelector('.pullUpLabel').innerHTML = '松开加载更多';
                        this.maxScrollY = this.maxScrollY;
                    } else if (this.y > (this.maxScrollY + 15) && pullUpEl.className.match('flip')) {
                        pullUpEl.className = '';
                        pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多';
                        this.maxScrollY = pullUpOffset;
                    }
                },
                onScrollEnd: function () {
                    if (pullDownEl.className.match('flip')) {
                        pullDownEl.className = 'loading';
                        pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中···';
                        scope.$parent.myRefresh[attr.pullDownAction]();
                    } else if (pullUpEl.className.match('flip')) {
                        pullUpEl.className = 'loading';
                        pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中···2';
                        scope.$parent.myRefresh[attr.pullUpAction]();
                    }
                },
                onBeforeScrollStart:function (e) {
                    var target = e.target;
                    while (target.nodeType != 1) {
                        target = target.parentNode;
                    }
                    if (target.tagName != "SELECT" && target.tagName != "INPUT" && target.tagName != "TEXTAREA") {
                        e.preventDefault();
                    }
                }
            };

            // scroll key /id
            var scroll_key = attr.ngIscroll;

            if (scroll_key === '') {
                scroll_key = attr.id;
            }
            if (scope.$parent.myScroll === undefined) {
                scope.$parent.myScroll = [];
            }

            // if ng-iscroll-form='true' then the additional settings will be supported
            /*if (attr.ngIscrollForm !== undefined && attr.ngIscrollForm == 'true') {
                ngiScroll_opts.useTransform = false;
                ngiScroll_opts.onBeforeScrollStart = function (e)
                {
                    var target = e.target;
                    while (target.nodeType != 1) target = target.parentNode;

                    if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA')
                        e.preventDefault();
                };
            }*/

            if (scope.$parent.myScrollOptions) {
                for (var i in scope.$parent.myScrollOptions) {
                    if (i === scroll_key) {
                        for (var k in scope.$parent.myScrollOptions[i]) {
                            ngiScroll_opts[k] = scope.$parent.myScrollOptions[i][k];
                        }
                    } else {
                        ngiScroll_opts[i] = scope.$parent.myScrollOptions[i];
                    }
                }
            }

            // iScroll initialize function
            function setScroll()
            {
                if (scope.$parent.myScroll === undefined) {
                    scope.$parent.myScroll = [];
                }
                scope.$parent.myScroll[scroll_key] = new iScroll(scroll_key, ngiScroll_opts);
            }

            // new specific setting for setting timeout using: ng-iscroll-timeout='{val}'
            if (attr.ngIscrollDelay !== undefined) {
                ngiScroll_timeout = attr.ngIscrollDelay;
            }

            // watch for 'ng-iscroll' directive in html code
            scope.$watch(attr.ngIscroll, function ()
            {
                setTimeout(setScroll, ngiScroll_timeout);
            });

            // add ng-iscroll-refresher for watching dynamic content inside iscroll
            if(attr.ngIscrollRefresher !== undefined) {
                scope.$watch(attr.ngIscrollRefresher, function ()
                {
                    if(scope.$parent.myScroll[scroll_key] !== undefined) scope.$parent.myScroll[scroll_key].refresh();
                });
            }
        }
    };
});