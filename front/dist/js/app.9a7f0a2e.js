(function(e){function t(t){for(var a,i,s=t[0],c=t[1],u=t[2],d=0,p=[];d<s.length;d++)i=s[d],o[i]&&p.push(o[i][0]),o[i]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(e[a]=c[a]);l&&l(t);while(p.length)p.shift()();return r.push.apply(r,u||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],a=!0,i=1;i<n.length;i++){var c=n[i];0!==o[c]&&(a=!1)}a&&(r.splice(t--,1),e=s(s.s=n[0]))}return e}var a={},o={app:0},r=[];function i(e){return s.p+"js/"+({about:"about"}[e]||e)+"."+{about:"1a7bc4b4"}[e]+".js"}function s(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.e=function(e){var t=[],n=o[e];if(0!==n)if(n)t.push(n[2]);else{var a=new Promise(function(t,a){n=o[e]=[t,a]});t.push(n[2]=a);var r,c=document.createElement("script");c.charset="utf-8",c.timeout=120,s.nc&&c.setAttribute("nonce",s.nc),c.src=i(e),r=function(t){c.onerror=c.onload=null,clearTimeout(u);var n=o[e];if(0!==n){if(n){var a=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src,i=new Error("Loading chunk "+e+" failed.\n("+a+": "+r+")");i.type=a,i.request=r,n[1](i)}o[e]=void 0}};var u=setTimeout(function(){r({type:"timeout",target:c})},12e4);c.onerror=c.onload=r,document.head.appendChild(c)}return Promise.all(t)},s.m=e,s.c=a,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)s.d(n,a,function(t){return e[t]}.bind(null,a));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/liff/",s.oe=function(e){throw console.error(e),e};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],u=c.push.bind(c);c.push=t,c=c.slice();for(var d=0;d<c.length;d++)t(c[d]);var l=u;r.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var a=n("64a9"),o=n.n(a);o.a},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d");var a=n("2b0e"),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("div",{attrs:{id:"nav"}},[n("router-link",{attrs:{to:"/"}},[e._v("Home")]),e._v(" |\n    "),n("router-link",{attrs:{to:"/about"}},[e._v("About")])],1),n("router-view")],1)},r=[],i=(n("034f"),n("2877")),s={},c=Object(i["a"])(s,o,r,!1,null,null,null),u=c.exports,d=n("8c4f"),l=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"example"},[e.loading?n("div",[e._v("loading...")]):e._e(),n("datepicker",{attrs:{format:"yyyy-MM-dd"},on:{input:e.changeDate},model:{value:e.start,callback:function(t){e.start=t},expression:"start"}}),n("div",{staticStyle:{float:"left"}},[e._v("~")]),n("datepicker",{attrs:{format:"yyyy-MM-dd"},on:{input:e.changeDate},model:{value:e.end,callback:function(t){e.end=t},expression:"end"}}),n("div",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.mode,expression:"mode"}],attrs:{type:"radio",id:"day",value:"day"},domProps:{checked:e._q(e.mode,"day")},on:{checked:e.updateChart,change:function(t){e.mode="day"}}}),n("label",{attrs:{for:"day"}},[e._v("Dayly")]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.mode,expression:"mode"}],attrs:{type:"radio",id:"month",value:"month"},domProps:{checked:e._q(e.mode,"month")},on:{checked:e.updateChart,change:function(t){e.mode="month"}}}),n("label",{attrs:{for:"month"}},[e._v("Monthly")])]),n("apexchart",{attrs:{width:"640",height:"500",type:"bar",options:e.chartOptions,series:e.series}})],1)},p=[],f=(n("ac6a"),n("456d"),n("bc3a")),h=n.n(f),m={name:"BarExample",data:function(){return{chartOptions:{plotOptions:{bar:{horizontal:!1}},xaxis:{categories:[]}},series:[],mode:"day",message:"こんにちは",userId:"",displayName:"",accessToken:"",scope:"",client_id:"",expires_in:"",start:"",end:"",loading:!0}},created:function(){var e=this,t=this;this.liff.init(function(n){return t.userId=n.context.userId,t.message="初期化できたし",t.liff.getProfile().then(function(n){t.message="プロフィール採れたし",t.userId=n.userId,t.displayName=n.displayName;var a=t.liff.getAccessToken();if(a)return t.accessToken=a,t.message="トークン採れたし",h()({method:"POST",url:"https://dokechin-pushup.dokechin.com/api",data:{},headers:{"Content-Type":"application/json",accessToken:a}}).then(function(n){e.chartOptions={chart:{stacked:!0},plotOptions:{bar:{horizontal:!1}},xaxis:{categories:n.data.dates}};var a=Object.keys(n.data.sum),o=[];a.forEach(function(e){o.push({name:e,data:n.data.sum[e]})}),e.series=o,e.start=n.data.start,e.end=n.data.end,t.message="完了",t.loading=!1});t.message="アクセストークンを取得できません"}).catch(function(e){t.message="Error\n"+e.code+"\n"+e.message,t.loading=!1})},function(e){t.message="Error\n"+e.code+"\n"+e.message,t.loading=!1})},methods:{changeDate:function(){this.start>this.end&&(this.start=this.end),this.updateChart()},updateChart:function(){this.loading=!0;var e=this.accessToken,t=this;h.a.post("https://dokechin-pushup.dokechin.com/api",{},{headers:{"Content-Type":"application/x-www-form-urlencoded",accessToken:e,start:v(this.start),end:v(this.end),mode:this.mode}}).then(function(e){t.chartOptions={chart:{stacked:!0},plotOptions:{bar:{horizontal:!1}},xaxis:{categories:e.data.dates}};var n=Object.keys(e.data.sum),a=[];n.forEach(function(t){a.push({name:t,data:e.data.sum[t]})}),t.series=a,t.loading=!1,t.message="完了"}).catch(function(e){t.message="Error\n"+e.code+"\n"+e.message,t.loading=!1})}}};function v(e){var t=e.getDate(),n=e.getMonth()+1,a=e.getFullYear();return a+"-"+(n<=9?"0"+n:n)+"-"+(t<=9?"0"+t:t)}var g=m,y=Object(i["a"])(g,l,p,!1,null,null,null),b=y.exports;a["a"].use(d["a"]);var k=new d["a"]({mode:"history",base:"/liff/",routes:[{path:"/",name:"home",component:b},{path:"/about",name:"about",component:function(){return n.e("about").then(n.bind(null,"f820"))}}]}),x=n("2f62");a["a"].use(x["a"]);var w=new x["a"].Store({state:{},mutations:{},actions:{}}),_=n("1321"),O=n.n(_),j=n("fa33");a["a"].component("apexchart",O.a),a["a"].component("datepicker",j["a"]),a["a"].config.productionTip=!1,a["a"].prototype.liff=window.liff,new a["a"]({router:k,store:w,render:function(e){return e(u)}}).$mount("#app")},"64a9":function(e,t,n){}});
//# sourceMappingURL=app.9a7f0a2e.js.map