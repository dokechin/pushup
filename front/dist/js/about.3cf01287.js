(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["about"],{"2b3c":function(e,t,s){},"4ef5":function(e,t,s){"use strict";s.r(t);var n=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"example"},[s("div",[e._v("\n    読み上げ速度（読み上げ速度を省略した場合）\n    "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.speed,expression:"speed"}],attrs:{type:"radio",value:"30"},domProps:{checked:e._q(e.speed,"30")},on:{change:[function(t){e.speed="30"},e.updateSpeed]}}),s("label",{attrs:{for:"30"}},[e._v("30")]),s("input",{directives:[{name:"model",rawName:"v-model",value:e.speed,expression:"speed"}],attrs:{type:"radio",value:"40"},domProps:{checked:e._q(e.speed,"40")},on:{change:[function(t){e.speed="40"},e.updateSpeed]}}),s("label",{attrs:{for:"40"}},[e._v("40")]),s("input",{directives:[{name:"model",rawName:"v-model",value:e.speed,expression:"speed"}],attrs:{type:"radio",value:"50"},domProps:{checked:e._q(e.speed,"50")},on:{change:[function(t){e.speed="50"},e.updateSpeed]}}),s("label",{attrs:{for:"50"}},[e._v("50")]),s("input",{directives:[{name:"model",rawName:"v-model",value:e.speed,expression:"speed"}],attrs:{type:"radio",value:"60"},domProps:{checked:e._q(e.speed,"60")},on:{change:[function(t){e.speed="60"},e.updateSpeed]}}),s("label",{attrs:{for:"60"}},[e._v("60")])]),s("div",[e._v("\n    "+e._s(e.message)+"\n  ")])])},a=[],d=s("bc3a"),r=s.n(d),o={name:"BarExample",data:function(){return{speed:null,message:"",accessToken:""}},created:function(){var e=this,t=this;this.liff.init(function(s){return t.userId=s.context.userId,t.liff.getProfile().then(function(s){t.userId=s.userId,t.displayName=s.displayName;var n=t.liff.getAccessToken();if(n)return t.accessToken=n,r()({method:"GET",url:"https://dokechin-pushup.dokechin.com/setting",data:{},headers:{"Content-Type":"application/json",accessToken:n}}).then(function(t){e.speed=t.data.speed}).catch(function(e){t.message="Error\n"+e.code+"\n"+e.message});t.message="予期せぬエラー（トークン取得）"}).catch(function(e){t.message="Error\n"+e.code+"\n"+e.message})},function(e){t.message="Error\n"+e.code+"\n"+e.message})},methods:{updateSpeed:function(){var e=this.accessToken,t=this;r.a.post("https://dokechin-pushup.dokechin.com/setting",{},{headers:{"Content-Type":"application/x-www-form-urlencoded",accessToken:e,speed:t.speed}}).then(function(e){}).catch(function(e){t.message="Error\n"+e.code+"\n"+e.message})}}},c=o,i=s("2877"),p=Object(i["a"])(c,n,a,!1,null,null,null);t["default"]=p.exports},e76e:function(e,t,s){"use strict";var n=s("2b3c"),a=s.n(n);a.a},f820:function(e,t,s){"use strict";s.r(t);var n=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},a=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"about"},[s("h1",[e._v("筋トレ応援団")]),s("h2",[e._v("カウントインテント")]),s("p",[e._v("\n    種目＋回数で指示するとカウントアップする。　例）「プッシュアップを10回」\n  ")]),s("p",[e._v("\n    １分間のカウント速度を[30,40,50,60]から選べる。例）「プッシュアップをスピード60で30回\n  ")]),s("table",{staticClass:"blueTable"},[s("tr",[s("th",[e._v("No")]),s("th",[e._v("種目名")])]),s("tr",[s("td",[e._v("1")]),s("td",[e._v("プッシュアップ（腕立て）")])]),s("tr",[s("td",[e._v("2")]),s("td",[e._v("シットアップ（腹筋）")])]),s("tr",[s("td",[e._v("3")]),s("td",[e._v("バックエクステンション（背筋）")])]),s("tr",[s("td",[e._v("4")]),s("td",[e._v("スクワット")])]),s("tr",[s("td",[e._v("5")]),s("td",[e._v("クランチ")])]),s("tr",[s("td",[e._v("6")]),s("td",[e._v("バックキック")])]),s("tr",[s("td",[e._v("7")]),s("td",[e._v("ヒップリフト")])]),s("tr",[s("td",[e._v("8")]),s("td",[e._v("レッグレイズ")])]),s("tr",[s("td",[e._v("9")]),s("td",[e._v("カーフレイズ")])]),s("tr",[s("td",[e._v("10")]),s("td",[e._v("ランジ")])]),s("tr",[s("td",[e._v("11")]),s("td",[e._v("チンニング（懸垂）")])])]),s("h2",[e._v("集計インテント")]),s("p",[e._v("月単位で種目ごとのカウント数、偏差値を計算。LINEプッシュで通知する。例）5月の集計送って、先月の集計送って")]),s("h2",[e._v("筋トレ応援団ボット")]),s("p",[e._v("「今年」、「今月」、「今週」、「今日」と発言すると、カウント数を集計して返信します。")]),s("p",[e._v("「グラフ」と発言すると、グラフアプリを開くリンクを返信します。")]),s("footer",{staticClass:"serif"},[s("p",[e._v("COPYRIGHT © dokechin ALL RIGHTS RESERVED.\t")])])])}],d=(s("e76e"),s("2877")),r={},o=Object(d["a"])(r,n,a,!1,null,null,null);t["default"]=o.exports}}]);
//# sourceMappingURL=about.3cf01287.js.map