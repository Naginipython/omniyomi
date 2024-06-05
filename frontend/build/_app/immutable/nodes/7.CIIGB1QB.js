import{s as He,h as J,r as Je,n as Ke,a as Ne}from"../chunks/scheduler.B8cUhyJv.js";import{S as Qe,i as Re,e as f,s as C,x as Oe,t as y,c as m,a as _,d as p,f as T,y as ze,b as j,k as ge,l as c,u as ne,g as P,h as o,z as Ue,m as R,j as W,r as Se,p as qe,A as Le,o as Ae,n as We}from"../chunks/index.DY94jAkc.js";import{e as Fe}from"../chunks/each.D6YF6ztN.js";import{F as Me,f as Xe,i as Ye}from"../chunks/fa-layers-text.svelte_svelte_type_style_lang.gXEXufag.js";import{b as Ze,a as $e}from"../chunks/common.CF3d71wm.js";import{a as et}from"../chunks/main.OBH_UArE.js";import{g as ve}from"../chunks/entry.C_ODg16e.js";const tt=!1;function lt({params:i}){return{id:i.manga,manga_index:i.chapter}}const vt=Object.freeze(Object.defineProperty({__proto__:null,load:lt,prerender:tt},Symbol.toStringTag,{value:"Module"}));function Ge(i,s,e){const l=i.slice();return l[12]=s[e],l[14]=e,l}function st(i){let s,e=i[0].number+"",l,a,r=i[0].title+"",t;return{c(){s=y("Chapter "),l=y(e),a=y(": "),t=y(r)},l(n){s=j(n,"Chapter "),l=j(n,e),a=j(n,": "),t=j(n,r)},m(n,d){P(n,s,d),P(n,l,d),P(n,a,d),P(n,t,d)},p(n,d){d&1&&e!==(e=n[0].number+"")&&W(l,e),d&1&&r!==(r=n[0].title+"")&&W(t,r)},d(n){n&&(p(s),p(l),p(a),p(t))}}}function at(i){let s,e=i[0].number+"",l;return{c(){s=y("Chapter "),l=y(e)},l(a){s=j(a,"Chapter "),l=j(a,e)},m(a,r){P(a,s,r),P(a,l,r)},p(a,r){r&1&&e!==(e=a[0].number+"")&&W(l,e)},d(a){a&&(p(s),p(l))}}}function rt(i){let s,e=Fe(i[3]),l=[];for(let a=0;a<e.length;a+=1)l[a]=xe(Ge(i,e,a));return{c(){for(let a=0;a<l.length;a+=1)l[a].c();s=Ae()},l(a){for(let r=0;r<l.length;r+=1)l[r].l(a);s=Ae()},m(a,r){for(let t=0;t<l.length;t+=1)l[t]&&l[t].m(a,r);P(a,s,r)},p(a,r){if(r&282){e=Fe(a[3]);let t;for(t=0;t<e.length;t+=1){const n=Ge(a,e,t);l[t]?l[t].p(n,r):(l[t]=xe(n),l[t].c(),l[t].m(s.parentNode,s))}for(;t<l.length;t+=1)l[t].d(1);l.length=e.length}},d(a){a&&p(s),We(l,a)}}}function nt(i){let s,e="loading";return{c(){s=f("p"),s.textContent=e,this.h()},l(l){s=m(l,"P",{style:!0,"data-svelte-h":!0}),ge(s)!=="svelte-12bicli"&&(s.textContent=e),this.h()},h(){ne(s,"color","white"),ne(s,"font-size","xx-large")},m(l,a){P(l,s,a)},p:Ke,d(l){l&&p(s)}}}function xe(i){let s,e,l,a,r;return{c(){s=f("img"),this.h()},l(t){s=m(t,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){c(s,"class",e=J(i[14]==i[1]?"visible":"invisible")+" svelte-1mepkjr"),Ne(s.src,l=i[12])||c(s,"src",l),c(s,"alt",i[14]+" - "+i[4].title)},m(t,n){P(t,s,n),a||(r=R(s,"load",i[8]),a=!0)},p(t,n){n&2&&e!==(e=J(t[14]==t[1]?"visible":"invisible")+" svelte-1mepkjr")&&c(s,"class",e),n&8&&!Ne(s.src,l=t[12])&&c(s,"src",l)},d(t){t&&p(s),a=!1,r()}}}function it(i){let s,e,l,a,r,t,n,d,g,B,X=i[4].title+"",A,F,v,k,M,G,S,ie,D,ke="<",oe,q,ce,V,be=">",ue,L,N,K=i[1]+1+"",Y,pe,Q=i[2].length+"",Z,fe,E,O,me,$,de,ee,z,_e,te,U,he,ye;n=new Me({props:{icon:Xe}});function je(u,h){return u[0].title==""?at:st}let le=je(i),w=le(i);S=new Me({props:{icon:Ze}});function Ee(u,h){return u[0].length==0?nt:rt}let se=Ee(i),I=se(i);return{c(){s=f("div"),e=f("div"),l=f("div"),a=C(),r=f("div"),t=f("button"),Oe(n.$$.fragment),d=C(),g=f("div"),B=f("p"),A=y(X),F=C(),v=f("p"),w.c(),k=C(),M=f("div"),G=f("button"),Oe(S.$$.fragment),ie=C(),D=f("button"),D.textContent=ke,oe=C(),q=f("button"),ce=C(),V=f("button"),V.textContent=be,ue=C(),L=f("div"),N=f("p"),Y=y(K),pe=y("/"),Z=y(Q),fe=C(),E=f("div"),O=f("p"),me=y("previous chapter?"),de=C(),I.c(),ee=C(),z=f("p"),_e=y("next chapter?"),this.h()},l(u){s=m(u,"DIV",{});var h=_(s);e=m(h,"DIV",{id:!0,style:!0,class:!0});var b=_(e);l=m(b,"DIV",{class:!0}),_(l).forEach(p),a=T(b),r=m(b,"DIV",{id:!0,class:!0});var x=_(r);t=m(x,"BUTTON",{class:!0});var we=_(t);ze(n.$$.fragment,we),we.forEach(p),d=T(x),g=m(x,"DIV",{id:!0,class:!0});var ae=_(g);B=m(ae,"P",{class:!0});var Ie=_(B);A=j(Ie,X),Ie.forEach(p),F=T(ae),v=m(ae,"P",{style:!0,class:!0});var Ce=_(v);w.l(Ce),Ce.forEach(p),ae.forEach(p),k=T(x),M=m(x,"DIV",{class:!0});var Te=_(M);G=m(Te,"BUTTON",{class:!0});var Be=_(G);ze(S.$$.fragment,Be),Be.forEach(p),Te.forEach(p),x.forEach(p),ie=T(b),D=m(b,"BUTTON",{id:!0,class:!0,"data-svelte-h":!0}),ge(D)!=="svelte-vjovet"&&(D.textContent=ke),oe=T(b),q=m(b,"BUTTON",{id:!0,class:!0}),_(q).forEach(p),ce=T(b),V=m(b,"BUTTON",{id:!0,class:!0,"data-svelte-h":!0}),ge(V)!=="svelte-qzxv8c"&&(V.textContent=be),ue=T(b),L=m(b,"DIV",{id:!0,class:!0});var Pe=_(L);N=m(Pe,"P",{class:!0});var re=_(N);Y=j(re,K),pe=j(re,"/"),Z=j(re,Q),re.forEach(p),Pe.forEach(p),b.forEach(p),fe=T(h),E=m(h,"DIV",{class:!0});var H=_(E);O=m(H,"P",{id:!0,class:!0});var De=_(O);me=j(De,"previous chapter?"),De.forEach(p),de=T(H),I.l(H),ee=T(H),z=m(H,"P",{id:!0,class:!0});var Ve=_(z);_e=j(Ve,"next chapter?"),Ve.forEach(p),H.forEach(p),h.forEach(p),this.h()},h(){c(l,"class","menu-background svelte-1mepkjr"),c(t,"class","chap-snack-item svelte-1mepkjr"),c(B,"class","svelte-1mepkjr"),ne(v,"font-size","x-small"),c(v,"class","svelte-1mepkjr"),c(g,"id","chap-snack-text"),c(g,"class","svelte-1mepkjr"),c(G,"class","chap-snack-item svelte-1mepkjr"),c(M,"class","chap-snack-right svelte-1mepkjr"),c(r,"id","chap-snackbar"),c(r,"class","svelte-1mepkjr"),c(D,"id","prev"),c(D,"class","arrow svelte-1mepkjr"),c(q,"id","show-arrow"),c(q,"class","svelte-1mepkjr"),c(V,"id","next"),c(V,"class","arrow svelte-1mepkjr"),c(N,"class","svelte-1mepkjr"),c(L,"id","page-num"),c(L,"class","svelte-1mepkjr"),c(e,"id","chap-menu"),ne(e,"opacity","0"),c(e,"class","svelte-1mepkjr"),c(O,"id","prev-chapter"),c(O,"class",$=J(i[1]==-1?"visible":"invisible")+" svelte-1mepkjr"),c(z,"id","next-chapter"),c(z,"class",te=J(i[1]==i[0].page?"visible":"invisible")+" svelte-1mepkjr"),c(E,"class","center-img-div svelte-1mepkjr")},m(u,h){P(u,s,h),o(s,e),o(e,l),o(e,a),o(e,r),o(r,t),Ue(n,t,null),o(r,d),o(r,g),o(g,B),o(B,A),o(g,F),o(g,v),w.m(v,null),o(r,k),o(r,M),o(M,G),Ue(S,G,null),o(e,ie),o(e,D),o(e,oe),o(e,q),o(e,ce),o(e,V),o(e,ue),o(e,L),o(L,N),o(N,Y),o(N,pe),o(N,Z),o(s,fe),o(s,E),o(E,O),o(O,me),o(E,de),I.m(E,null),o(E,ee),o(E,z),o(z,_e),U=!0,he||(ye=[R(t,"click",i[5]),R(D,"click",i[7]),R(q,"click",ot),R(V,"click",i[6])],he=!0)},p(u,[h]){le===(le=je(u))&&w?w.p(u,h):(w.d(1),w=le(u),w&&(w.c(),w.m(v,null))),(!U||h&2)&&K!==(K=u[1]+1+"")&&W(Y,K),(!U||h&4)&&Q!==(Q=u[2].length+"")&&W(Z,Q),(!U||h&2&&$!==($=J(u[1]==-1?"visible":"invisible")+" svelte-1mepkjr"))&&c(O,"class",$),se===(se=Ee(u))&&I?I.p(u,h):(I.d(1),I=se(u),I&&(I.c(),I.m(E,ee))),(!U||h&3&&te!==(te=J(u[1]==u[0].page?"visible":"invisible")+" svelte-1mepkjr"))&&c(z,"class",te)},i(u){U||(Se(n.$$.fragment,u),Se(S.$$.fragment,u),U=!0)},o(u){qe(n.$$.fragment,u),qe(S.$$.fragment,u),U=!1},d(u){u&&p(s),Le(n),w.d(),Le(S),I.d(),he=!1,Je(ye)}}}function ot(){document.getElementById("chap-menu").style.opacity=="1"?document.getElementById("chap-menu").style.opacity="0":document.getElementById("chap-menu").style.opacity="1"}function ct(i,s,e){let{data:l}=s,a=$e(l.id),r=a.chapters[l.manga_index],t=0,n=-1,d=[];g(r.page-1);async function g(k){e(3,d=[]),e(2,n=document.getElementsByTagName("img")),e(3,d=await et(a.extention,r.id)),r.completed&&k!=1/0?e(1,t=0):k==1/0?e(1,t=d.length-1):e(1,t=k)}async function B(){await Ye("update_lib",{item:a}),ve(`/manga/${l.id}`)}window.addEventListener("keydown",X);function X(k){switch(k.keyCode){case 39:case"d":case 32:A();break;case 37:case"a":F();break}}function A(){t<n.length-1?(e(1,t++,t),e(0,r.page=t+1,r),v()):t==n.length-1?(e(1,t++,t),v()):ve(`/manga/${l.id}/reader/${parseInt(l.manga_index)-1}`).then(()=>{B(),g(0)})}function F(){t>0?(e(1,t--,t),e(0,r.page=t+1,r),v()):t==0?e(1,t--,t):ve(`/manga/${l.id}/reader/${parseInt(l.manga_index)+1}`).then(()=>{B(),g(1/0)})}window.addEventListener("resize",v);function v(){n[t]!=null&&(n[t].height>n[t].width?(e(2,n[t].style.height="100vh",n),e(2,n[t].style.width="auto",n)):(e(2,n[t].style.height="auto",n),e(2,n[t].style.width="100vw",n)))}return i.$$set=k=>{"data"in k&&e(9,l=k.data)},i.$$.update=()=>{i.$$.dirty&7&&n.length>0&&!r.completed&&(t>=n.length-1?e(0,r.completed=!0,r):e(0,r.completed=!1,r))},[r,t,n,d,a,B,A,F,v,l]}class gt extends Qe{constructor(s){super(),Re(this,s,ct,it,He,{data:9})}}export{gt as component,vt as universal};
