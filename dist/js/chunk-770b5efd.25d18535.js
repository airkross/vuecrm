(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-770b5efd"],{c1dfc:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("div",{staticClass:"page-title"},[r("h3",[t._v(" "+t._s(t._f("localizeFilter")("Planning"))+" ")]),r("h4",[t._v(t._s(t._f("currencyFilter")(t.info.bill,"RUB")))])]),t.loading?r("app-loader"):t.categories.length?r("section",t._l(t.categories,(function(e){return r("div",{key:e.id},[r("p",[r("strong",[t._v(t._s(e.title)+" :")]),t._v("\n        "+t._s(t._f("currencyFilter")(e.spend,"RUB"))+" из "+t._s(t._f("currencyFilter")(e.limit,"RUB"))+"\n      ")]),r("div",{directives:[{name:"tooltip",rawName:"v-tooltip",value:e.tooltip,expression:"cat.tooltip"}],staticClass:"progress",attrs:{"data-position":"bottom"}},[r("div",{staticClass:"determinate",class:[e.progressColor],style:{width:e.progressPercent+"%"}})])])})),0):r("p",{staticClass:"center"},[t._v("\n    "+t._s(t._f("localizeFilter")("Warning_Category"))+"\n    "),r("router-link",{attrs:{to:"/categories"}},[t._v(" "+t._s(t._f("localizeFilter")("Create_Category"))+" ")])],1)],1)},i=[],o=(r("8e6e"),r("ac6a"),r("456d"),r("96cf"),r("3b8d")),c=r("bd86"),a=r("2f62"),s=r("5bb3"),l=r("e977");function u(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function p(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?u(r,!0).forEach((function(e){Object(c["a"])(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):u(r).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var f={name:"planing",metaInfo:function(){return{title:this.$title("Menu_Planning")}},data:function(){return{loading:!0,categories:[]}},computed:p({},Object(a["c"])(["info"])),mounted:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(){var e,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.$store.dispatch("fetchRecords");case 2:return e=t.sent,t.next=5,this.$store.dispatch("fetchCategories");case 5:r=t.sent,this.categories=r.map((function(t){var r=e.filter((function(e){return e.categoryId===t.id})).filter((function(t){return"outcome"===t.type})).reduce((function(t,e){return t+ +e.amount}),0),n=100*r/t.limit,i=n>100?100:n,o=n<60?"green":n<100?"yellow":"red",c=t.limit-r,a="".concat(c<0?"".concat(Object(l["a"])("Tooltip_Limit1")," ").concat(Object(s["a"])(c)," "):"".concat(Object(l["a"])("Tooltip_Limit2"),": ").concat(Object(s["a"])(c)," ")," ");return p({},t,{progressPercent:i,progressColor:o,spend:r,tooltip:a})})),this.loading=!1;case 8:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()},d=f,g=r("2877"),b=Object(g["a"])(d,n,i,!1,null,null,null);e["default"]=b.exports}}]);
//# sourceMappingURL=chunk-770b5efd.25d18535.js.map