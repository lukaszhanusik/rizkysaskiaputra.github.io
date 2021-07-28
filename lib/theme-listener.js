(function (global, factory) {
    typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() :
    typeof define === "function" && define.amd ? define(factory) :
    (global = global || self, global.Theme = factory());
}(this, function () { "use strict";

    var theme = function(){
        this.listen = this.library
    };
    theme.prototype.dark = function(scheme,theme){
        document.documentElement.setAttribute("color-scheme","dark");
        scheme.setAttribute("content","dark");
        theme.setAttribute("content","#000");
        localStorage.setItem("color-scheme","dark");
    };
    theme.prototype.light = function(scheme,theme){
        document.documentElement.setAttribute("color-scheme","light");
        scheme.setAttribute("content","light");
        theme.setAttribute("content","#fff");
        localStorage.setItem("color-scheme","light");
    };
    theme.prototype.library = function(){
        var scheme = document.querySelector("meta[name='color-scheme']"),
            theme = document.querySelector("meta[name='theme-color']"),
            local = localStorage.getItem("color-scheme");

        if(local === "dark"){this.dark(scheme,theme)}
        else{this.light(scheme,theme)};

        var query = window.matchMedia("(prefers-color-scheme: dark)");
        query.addEventListener("change",(event)=>{
            var detect = event.matches;
            if(detect){this.dark(scheme,theme)}
            else{this.light(scheme,theme)}
        });
    };
    return theme
}));
var theme = new Theme();
theme.listen();
