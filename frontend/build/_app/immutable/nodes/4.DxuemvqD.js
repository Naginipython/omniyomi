import{s as O,n as m,r as U}from"../chunks/scheduler.B8cUhyJv.js";import{S as $,i as w,e as p,s as v,c as f,a as E,k as x,f as C,d as b,l as h,g as F,h as c,m as _}from"../chunks/index.DY94jAkc.js";function L(o){let e,n,t="Upload source (.js):",r,s,u,l,g="Upload",d,y;return{c(){e=p("form"),n=p("label"),n.textContent=t,r=v(),s=p("input"),u=v(),l=p("button"),l.textContent=g,this.h()},l(i){e=f(i,"FORM",{});var a=E(e);n=f(a,"LABEL",{for:!0,"data-svelte-h":!0}),x(n)!=="svelte-d3rsbv"&&(n.textContent=t),r=C(a),s=f(a,"INPUT",{type:!0,id:!0}),u=C(a),l=f(a,"BUTTON",{type:!0,"data-svelte-h":!0}),x(l)!=="svelte-1h5utum"&&(l.textContent=g),a.forEach(b),this.h()},h(){h(n,"for","source"),h(s,"type","file"),h(s,"id","source"),h(l,"type","submit")},m(i,a){F(i,e,a),c(e,n),c(e,r),c(e,s),c(e,u),c(e,l),d||(y=[_(s,"change",o[2]),_(s,"change",o[3]),_(e,"submit",o[1])],d=!0)},p:m,i:m,o:m,d(i){i&&b(e),d=!1,U(y)}}}function j(o){if(o.name.split(".").pop().toLowerCase()!=="js")return alert("Only .js files are allowed!"),!1;const n=/export async function search\s*\(query\)/g;console.log(o);const t=rawHtml.match(n);if(t&&t[1]){const r=t[1];try{console.log(r)}catch(s){console.error("Error parsing JSON:",s)}}return!0}function N(o,e,n){let t;function r(){!t||!j(t[0])||console.log("File uploaded:",t[0])}function s(){t=this.files,n(0,t)}return[t,r,s,()=>j(t[0])]}class q extends ${constructor(e){super(),w(this,e,N,L,O,{})}}export{q as component};
