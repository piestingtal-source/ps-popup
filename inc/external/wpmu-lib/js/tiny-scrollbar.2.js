/*! WPMU Dev code library - v2.0.3
 * http://premium.wpmudev.org/
 * Copyright (c) 2015; * Licensed GPLv2+ */
/*! tinyscrollbar - v2.1.7 - 2014-05-21
 * http://www.baijs.com/tinyscrollbar
 *
 * Copyright (c) 2014 Maarten Baijs <wieringen@gmail.com>;
 * Licensed under the MIT license */

! function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof exports ? a(require("jquery")) : a(jQuery)
}(function(a) {
    "use strict";

    function b(b, e) {
        function f() {
            return m.update(), h(), m
        }

        function g() {
            r.css(x, m.contentPosition / m.trackRatio), o.css(x, -m.contentPosition), p.css(w, m.trackSize), q.css(w, m.trackSize), r.css(w, m.thumbSize)
        }

        function h() {
            u ? n[0].ontouchstart = function(a) {
                1 === a.touches.length && (a.stopPropagation(), i(a.touches[0]))
            } : (r.bind("mousedown", i), q.bind("mousedown", k)), a(window).resize(function() {
                m.update("relative")
            }), m.options.wheel && window.addEventListener ? b[0].addEventListener(v, j, !1) : m.options.wheel && (b[0].onmousewheel = j)
        }

        function i(b) {
            a("body").addClass("noSelect"), s = t ? b.pageX : b.pageY, m.thumbPosition = parseInt(r.css(x), 10) || 0, u ? (document.ontouchmove = function(a) {
                a.preventDefault(), k(a.touches[0])
            }, document.ontouchend = l) : (a(document).bind("mousemove", k), a(document).bind("mouseup", l), r.bind("mouseup", l))
        }

        function j(c) {
            if (m.contentRatio < 1) {
                var d = c || window.event,
                    e = "delta" + m.options.axis.toUpperCase(),
                    f = -(d[e] || d.detail || -1 / 3 * d.wheelDelta) / 40;
                m.contentPosition -= f * m.options.wheelSpeed, m.contentPosition = Math.min(m.contentSize - m.viewportSize, Math.max(0, m.contentPosition)), b.trigger("move"), r.css(x, m.contentPosition / m.trackRatio), o.css(x, -m.contentPosition), (m.options.wheelLock || m.contentPosition !== m.contentSize - m.viewportSize && 0 !== m.contentPosition) && (d = a.event.fix(d), d.preventDefault())
            }
        }

        function k(a) {
            if (m.contentRatio < 1) {
                var c = t ? a.pageX : a.pageY,
                    d = c - s;
                m.options.scrollInvert && u && (d = s - c);
                var e = Math.min(m.trackSize - m.thumbSize, Math.max(0, m.thumbPosition + d));
                m.contentPosition = e * m.trackRatio, b.trigger("move"), r.css(x, e), o.css(x, -m.contentPosition)
            }
        }

        function l() {
            a("body").removeClass("noSelect"), a(document).unbind("mousemove", k), a(document).unbind("mouseup", l), r.unbind("mouseup", l), document.ontouchmove = document.ontouchend = null
        }
        this.options = a.extend({}, d, e), this._defaults = d, this._name = c;
        var m = this,
            n = b.find(".viewport"),
            o = b.find(".overview"),
            p = b.find(".scrollbar"),
            q = p.find(".track"),
            r = p.find(".thumb"),
            s = 0,
            t = "x" === this.options.axis,
            u = "ontouchstart" in document.documentElement,
            v = "onwheel" in document || document.documentMode >= 9 ? "wheel" : void 0 !== document.onmousewheel ? "mousewheel" : "DOMMouseScroll",
            w = t ? "width" : "height",
            x = t ? "left" : "top";
        return this.contentPosition = 0, this.viewportSize = 0, this.contentSize = 0, this.contentRatio = 0, this.trackSize = 0, this.trackRatio = 0, this.thumbSize = 0, this.thumbPosition = 0, this.update = function(a) {
            var b = w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
            switch (this.viewportSize = n[0]["offset" + b], this.contentSize = o[0]["scroll" + b], this.contentRatio = this.viewportSize / this.contentSize, this.trackSize = this.options.trackSize || this.viewportSize, this.thumbSize = Math.min(this.trackSize, Math.max(0, this.options.thumbSize || this.trackSize * this.contentRatio)), this.trackRatio = this.options.thumbSize ? (this.contentSize - this.viewportSize) / (this.trackSize - this.thumbSize) : this.contentSize / this.trackSize, p.toggleClass("disable", this.contentRatio >= 1), a) {
                case "bottom":
                    this.contentPosition = this.contentSize - this.viewportSize;
                    break;
                case "relative":
                    this.contentPosition = Math.min(Math.max(this.contentSize - this.viewportSize, 0), Math.max(0, this.contentPosition));
                    break;
                default:
                    this.contentPosition = parseInt(a, 10) || 0
            }
            return g(), m
        }, f()
    }
    var c = "tinyscrollbar",
        d = {
            axis: "y",
            wheel: !0,
            wheelSpeed: 40,
            wheelLock: !0,
            scrollInvert: !1,
            trackSize: !1,
            thumbSize: !1
        };
    a.fn[c] = function(d) {
        return this.each(function() {
            a.data(this, "plugin_" + c) || a.data(this, "plugin_" + c, new b(a(this), d))
        })
    }
});