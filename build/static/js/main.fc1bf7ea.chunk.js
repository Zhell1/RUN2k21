(this["webpackJsonpmon-app"]=this["webpackJsonpmon-app"]||[]).push([[0],{311:function(e,t,n){"use strict";n.r(t);var r=n(0),c=n.n(r),a=n(9),o=n.n(a),i=(n(81),n(8)),s=n.n(i),u=n(14),l=(n(52),n(364)),p=n(362),d=n(363),f=n(356),h=n(19),j=n(353),b=n(359),g=n(365),x=n(352),O=n(351),m=n(350),v=n(22),w=n(2);function y(e){var t=c.a.useState(e.open),n=Object(h.a)(t,2),r=(n[0],n[1],Object(v.a)()),a=Object(m.a)(r.breakpoints.down("sm"));function o(){e.handleClose&&e.handleClose()}return Object(w.jsx)("div",{children:Object(w.jsxs)(g.a,{fullScreen:a,open:e.open,onClose:o,fullWidth:!0,"aria-labelledby":"responsive-dialog-title",keepMounted:!0,children:[Object(w.jsx)(O.a,{children:e.children}),Object(w.jsx)(x.a,{children:Object(w.jsx)(j.a,{onClick:o,color:"primary",autoFocus:!0,children:"Close"})})]})})}var k=n(355),S=n(354),C=n(360),P=n(361),_=n(367),T=n(358),E=n(366),R=n(357),B=n(44),I=n(36),D=n.n(I);function U(){return new Promise((function(e,t){console.log("fetching BSVUSD from Preev..."),function(){var e="https://api.preev.pro/v1/tickers/12eLTxv1vyUeJtp5zqWbqpdWvfLdZ7dGf8";return new Promise((function(t,n){D()(e).then((function(e){if(200===e.status)return e.json();n("Error while fetching Preev:",e.status)})).then((function(e){e&&e.p&&e.p.ppi&&e.p.ppi.l&&t(e.p.ppi.l),n("Error while parsing response from Preev price API, data=",e)})).catch(n)}))}().then(e).catch((function(n){console.log("Error while fetching BSV price from Preev",n),console.log("fetching BSVUSD from Cryptonator..."),function(){var e="https://api.cryptonator.com/api/ticker/bsv-usd";return new Promise((function(t,n){D()(e).then((function(e){if(200===e.status)return e.json();n("Error while fetching Cryptonator:",e.status)})).then((function(e){if(e.ticker&&e.ticker.price){var r=Number(e.ticker.price);if(r>0)return void t(r)}n("Error while parsing response from Crytponator price API, data=",e)})).catch(n)}))}().then(e).catch((function(n){console.log("Error while fetching BSV price from Cryptonator",n),console.log("fetching BSVUSD from CoinGecko..."),function(){var e="bitcoin-cash-sv",t="https://api.coingecko.com/api/v3/simple/price?ids="+e+"&vs_currencies=USD";return new Promise((function(n,r){D()(t).then((function(e){if(200===e.status)return e.json();r("Error while fetching CoinGecko: ",e.status)})).then((function(t){if(t[e]&&t[e].usd){var c=Number(t[e].usd);if(c>0)return void n(c)}r("Error while parsing response from coingecko price API, data=",t)})).catch(r)}))}().then(e).catch(t)}))}))}))}var V=3e4;function q(e,t,n){return A.apply(this,arguments)}function A(){return(A=Object(u.a)(s.a.mark((function e(t,n,r){var c,a,o,i=arguments;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:c=i.length>3&&void 0!==i[3]?i[3]:200,a=i.length>4&&void 0!==i[4]?i[4]:V,(o=i.length>5&&void 0!==i[5]?i[5]:null)||(o=Date.now(),console.log("set timestamp at ",o)),setTimeout(Object(u.a)(s.a.mark((function e(){var i,u,l;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return i=window.run,e.next=3,i.load(t+"_o1");case 3:return u=e.sent,e.next=6,u.sync();case 6:(l=u.value)?(console.log("success with value: myRequest=",u," \n\n value = ",l),r(l,u.location)):Date.now()-o>a?(console.log("timedout at ",Date.now()),n()):q(t,n,r,c,a,o);case 8:case"end":return e.stop()}}),e)}))),c);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var L=n(60),N=n.n(L);function F(e){var t=document.getElementById(e);t.select(),t.setSelectionRange(0,99999),document.execCommand("copy")}function J(e,t){var n=Object(B.b)().enqueueSnackbar,r=function(t){return function(){n("Copied "+e.copiedmess.substr(0,15)+"...",{variant:t})}};return Object(w.jsx)(c.a.Fragment,{children:Object(w.jsx)("span",{onClick:function(){return F(e.idtocopy)},children:Object(w.jsxs)(j.a,{variant:"outlined",size:"small",onClick:r("success"),children:[Object(w.jsx)(N.a,{size:"small",color:"primary"}),"\xa0 Copy origin"]})})})}var K=window.Run,M=Object(S.a)({root:{maxWidth:300,textAlign:"left",margin:"20px"}});function W(e){return G.apply(this,arguments)}function G(){return(G=Object(u.a)(s.a.mark((function e(t){var n,r;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=window.run,console.log("run = ",n),e.next=4,n.load(t);case 4:return r=e.sent,e.next=7,r.sync();case 7:return e.next=9,n.sync();case 9:return console.log("load_contracts(): contract = ",r,"for",t),e.abrupt("return",r);case 11:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function H(e){var t=M(),n=Object(r.useState)(!1),c=Object(h.a)(n,2),a=c[0],o=c[1],i=Object(r.useState)(null),l=Object(h.a)(i,2),p=l[0],d=l[1],g=Object(r.useState)(null),x=Object(h.a)(g,2),O=x[0],m=x[1],v=Object(r.useState)(),S=Object(h.a)(v,2),I=S[0],D=S[1],V=Object(r.useState)(),A=Object(h.a)(V,2),L=A[0],N=A[1];function F(){return(F=Object(u.a)(s.a.mark((function t(){var n;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.oracleOrigin){t.next=2;break}return t.abrupt("return");case 2:return t.next=4,W(e.oracleOrigin);case 4:return n=t.sent,console.log("my_oracleRequest = ",n),console.log("my_oracleRequest = ",n),d(n.location),t.next=10,n.sync();case 10:m(n.get_price_USD());case 11:case"end":return t.stop()}}),t)})))).apply(this,arguments)}a||(o(!0),function(){F.apply(this,arguments)}());var G=Object(r.useState)(!1),H=Object(h.a)(G,2),z=H[0],Q=H[1],Y=Object(r.useState)(!1),X=Object(h.a)(Y,2),Z=X[0],$=X[1],ee=function(){var t=Object(u.a)(s.a.mark((function t(){var n;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:$(!0),(n=window.run).purse.set_prestoWidget(e.widgetname,ce,n),ue("clicked");case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();function te(){ue("timedout")}function ne(e,t){return re.apply(this,arguments)}function re(){return(re=Object(u.a)(s.a.mark((function e(t,n){var r,c;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=window.run,console.log("updated_location   = ",n),e.next=4,r.load(n);case 4:c=e.sent,N(c.location),D(c.value),console.log("callback_successOracle(): jig value=",t," & callback value=",c.value),ue("response");case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function ce(e){return ae.apply(this,arguments)}function ae(){return(ae=Object(u.a)(s.a.mark((function e(t){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log("successCallback!! txid=",t),ue("paid"),$(!1),q(t,te,ne);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var oe=Object(r.useState)("init"),ie=Object(h.a)(oe,2),se=ie[0],ue=ie[1];function le(){return(le=Object(u.a)(s.a.mark((function e(){var t,n,r,c,a,o,i;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=window.run,p){e.next=3;break}return e.abrupt("return");case 3:return e.next=5,W(p);case 5:return n=e.sent,e.next=8,n.sync();case 8:return r=n,console.log("my_oracle 1 = ",r),e.next=12,r.sync();case 12:return e.next=14,U();case 14:return c=e.sent,a=parseInt(r.get_price_USD()/c*1e8,10),e.next=18,t.sync();case 18:return(o=new K.Transaction).update((function(){i=new n(a)})),e.next=22,o.export({pay:!0});case 22:e.sent,console.log("handleOpenPayPresto(): myRequest = ",i);case 24:case"end":return e.stop()}}),e)})))).apply(this,arguments)}"clicked"==se&&(ue("ready"),function(){le.apply(this,arguments)}());var pe,de=O?"$"+O:"loading";return Object(w.jsxs)(k.a,{className:t.root,children:[Object(w.jsxs)(y,{open:z,handleClose:function(){Q(!1)},children:[Object(w.jsx)(f.a,{variant:"h5",children:e.title}),Object(w.jsx)("br",{}),e.description,Object(w.jsx)("br",{}),Object(w.jsx)("br",{}),"Price ",de,"/call ",Object(w.jsx)("br",{}),Object(w.jsx)("br",{}),"init"==se?Object(w.jsx)(j.a,{variant:"contained",color:"primary",onClick:ee,children:"TEST ORACLE"}):"paid"==se?Object(w.jsxs)("div",{children:[Object(w.jsx)(E.a,{severity:"info",children:"Sent, waiting for Oracle now... "}),Object(w.jsx)(R.a,{})]}):"response"==se?Object(w.jsx)("div",{children:Object(w.jsxs)(E.a,{severity:"success",children:["Oracle responded with value: ",I,Object(w.jsx)("br",{}),Object(w.jsx)("br",{}),Object(w.jsx)("a",{href:"https://run.network/explorer/?query="+L+"&network=main",target:"_blank",children:"Click here to see your onchain updated jig"})]})}):"timedout"==se?Object(w.jsx)("div",{children:Object(w.jsxs)(E.a,{severity:"warning",children:["Request timed out after ",parseInt(30,10)," seconds, try again or contact admin."]})}):Object(w.jsx)(j.a,{variant:"contained",color:"primary",onClick:ee,children:"TEST ORACLE"}),Object(w.jsx)("br",{}),Object(w.jsx)("br",{}),"Origin to load:",Object(w.jsx)("br",{}),Object(w.jsx)("a",{href:(pe=e.oracleOrigin,"https://run.network/explorer/?query="+pe+"&network=main"),target:"_blank",rel:"noopener noreferrer",children:e.oracleOrigin}),Object(w.jsx)("input",{type:"text",value:e.oracleOrigin,readOnly:!0,id:"textToCopy_"+e.oracleOrigin,style:{opacity:"0"}}),Object(w.jsx)("br",{}),Object(w.jsx)(B.a,{maxSnack:3,children:Object(w.jsx)(J,{idtocopy:"textToCopy_"+e.oracleOrigin,copiedmess:e.oracleOrigin})}),Object(w.jsx)("br",{}),Object(w.jsx)("br",{}),"Example of use:",Object(w.jsx)("br",{}),Object(w.jsx)(_.a,{language:"javascript",style:T.a,wrapLongLines:"true",children:"class MysteriousEgg extends Jig\n{ \n  init(){ \n    this.randomValue = new RandomValue()\n  }\n  hatch(){\n    let x = this.randomValue.value\n    // rarity between 1-99 but we make it super rare to get one near 100\n    this.rarity = parseInt(power(100,x*x*x), 10)\n  }\n}\nMysteriousEgg.deps = { RandomValue, power }\n\n// Timestamp Oracle idea => make an egg that can only be hatched on full moon\n"}),Object(w.jsx)(b.a,{style:{padding:"0px 178px"},children:Object(w.jsx)("a",{href:"https://github.com/Zhell1/RUN2k21",style:{textDecoration:"none"},target:"_blank",rel:"noopener noreferrer",children:Object(w.jsx)(j.a,{variant:"contained",children:"See more on GitHub"})})}),Object(w.jsx)(y,{open:Z,handleClose:function(){$(!1)},children:Object(w.jsx)("div",{id:e.widgetname,className:e.widgetname})})]}),Object(w.jsx)(C.a,{onClick:function(){Q(!0)},children:Object(w.jsxs)(P.a,{children:[Object(w.jsx)(f.a,{gutterBottom:!0,variant:"h5",component:"h2",children:e.title}),Object(w.jsx)(f.a,{variant:"body2",color:"textSecondary",component:"p",children:e.description}),Object(w.jsx)("br",{}),Object(w.jsx)(f.a,{variant:"body2",color:"textSecondary",component:"p",children:Object(w.jsx)("span",{style:{background:"#3f51b5",borderRadius:"4px",color:"white",padding:"3px"},children:de})})]})})]})}var z,Q=n(65),Y=n(66),X=window.bsv,Z=(window.bsvjs,window.Run,window.Paypresto.Presto),$=window.Paypresto.embed,ee=function(){function e(){Object(Q.a)(this,e)}return Object(Y.a)(e,[{key:"set_prestoWidget",value:function(e,t,n){this.widgetname=e,this.successCallback=t,this.run=n}},{key:"pay",value:function(){var e=Object(u.a)(s.a.mark((function e(t,n){var r,c,a,o,i,l,p,d,f=this;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(r=new X.Transaction(t),c=[],a=0;a<r.inputs.length;a++)c.push({txid:r.inputs[a].prevTxId.toString("hex"),vout:r.inputs[a].outputIndex,satoshis:n[a].satoshis,script:n[a].script});for(o=X.Script(r.outputs[0].script).toASM().split(" "),i=[],l=2;l<o.length;l++)i.push(decodeURIComponent(o[l].replace(/\s+/g,"").replace(/[0-9a-f]{2}/g,"%$&")));for(p=[{data:i}],d=1;d<r.outputs.length;d++)p.push({satoshis:r.outputs[d].satoshis,to:X.Address.fromPublicKeyHash(new X.Script.fromBuffer(r.outputs[d]._scriptBuffer).getPublicKeyHash()).toString()});Z.create({key:"Kx2p4o7FYJYjEwufdYJLXjPtu2vaSpQ8mB7mjMJnaHnPSrGQ1nQk",description:"RUN2K21_Hackaton_RunCraft",outputs:p}).mount($("#"+this.widgetname,{style:["rounded","border-thick"]})).on("funded",function(){var e=Object(u.a)(s.a.mark((function e(t){var n,r,a,o,i;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(console.log("on funded..."),n=t.forge.inputs.pop(),c.forEach((function(e){return t.forge.addInput(e)})),t.forge.inputs.push(n),t.forge.build(),r=f.run,a=0;a<t.forge.inputs.length-1;a++)t.signTxIn(a,{keyPair:(new X.KeyPair).fromPrivKey((new X.PrivKey).fromString(r.owner.privkey))});return t.signTxIn(t.forge.inputs.length-1,{keyPair:t.keyPair}),o=t.getRawTx(),console.log("broadcasting tx=",t),e.next=12,r.blockchain.broadcast(o);case 12:i=e.sent,console.log("TX sent",i),f.successCallback(i);case 15:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).on("error",(function(e){console.log("Error: ",e)}));case 10:case"end":return e.stop()}}),e,this)})));return function(t,n){return e.apply(this,arguments)}}()}]),e}(),te=window.Run,ne=new ee,re="8bf48350464e32cd9eea006e6a7a9cea40358a457b2dd432da924d592b919ee7_o2";var ce=function(){function e(){return(e=Object(u.a)(s.a.mark((function e(){var t;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,z.load(re);case 2:return t=e.sent,console.log("jig = ",t),e.next=6,t.sync();case 6:console.log("jig = ",t);case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return z||(z=new te({network:"main",purse:ne,trust:"*",app:"runcraft.io"})),z.activate(),window.run=z,function(){e.apply(this,arguments)}(),Object(w.jsx)("div",{className:"App",children:Object(w.jsxs)("header",{className:"App-header",style:{display:"block"},children:[Object(w.jsx)(p.a,{position:"static",style:{marginBottom:"2em"},children:Object(w.jsx)(d.a,{children:Object(w.jsx)(f.a,{variant:"h5",children:"Oracles_v2_1"})})}),Object(w.jsxs)(l.a,{container:!0,direction:"row",justify:"space-evenly",alignItems:"flex-start",children:[Object(w.jsx)(H,{title:"Random Value Oracle",description:"This Oracle gives you a random value as a float between 0 and 1, same as Math.random() but for jigs.",widgetname:"oracle1",oracleOrigin:re}),Object(w.jsx)(H,{title:"BSV/USD Price Oracle",description:"This Oracle gives you the current BSV price in USD",price:.01,widgetname:"oracle2",oracleOrigin:"8eb566a8337b3fc3deb28f1a8829911fce8e2353c27407985b9630ab46f6c00c_o2"}),Object(w.jsx)(H,{title:"Timestamp Oracle",description:"This Oracle gives you the current timestamp in ms, same as Date.now() but for jigs.",price:.01,widgetname:"oracle3",oracleOrigin:"ec2425d007e792c9fc543cac51623f530338c347ca6f1dc53ab870a3996feac3_o2"}),Object(w.jsx)(H,{title:"BSV/EUR Oracle",description:"This Oracle gives you you the current BSV price in EUR",price:.01,widgetname:"oracle4",oracleOrigin:"8e9965b9653807a4a3bf3cfa2f20e247fdb14ded4de41e5209fadbf9d659ecca_o2"})]})]})})},ae=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,369)).then((function(t){var n=t.getCLS,r=t.getFID,c=t.getFCP,a=t.getLCP,o=t.getTTFB;n(e),r(e),c(e),a(e),o(e)}))};o.a.render(Object(w.jsx)(c.a.StrictMode,{children:Object(w.jsx)(ce,{})}),document.getElementById("root")),ae()},52:function(e,t,n){},81:function(e,t,n){}},[[311,1,2]]]);
//# sourceMappingURL=main.fc1bf7ea.chunk.js.map