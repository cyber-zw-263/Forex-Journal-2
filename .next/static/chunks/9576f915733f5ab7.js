(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,5766,e=>{"use strict";let t,r;var a,s=e.i(71645);let i={data:""},o=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,l=/\/\*[^]*?\*\/|  +/g,n=/\n+/g,d=(e,t)=>{let r="",a="",s="";for(let i in e){let o=e[i];"@"==i[0]?"i"==i[1]?r=i+" "+o+";":a+="f"==i[1]?d(o,i):i+"{"+d(o,"k"==i[1]?"":t)+"}":"object"==typeof o?a+=d(o,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=o&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=d.p?d.p(i,o):i+":"+o+";")}return r+(t&&s?t+"{"+s+"}":s)+a},c={},u=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+u(e[r]);return t}return e};function x(e){let t,r,a=this||{},s=e.call?e(a.p):e;return((e,t,r,a,s)=>{var i;let x=u(e),g=c[x]||(c[x]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(x));if(!c[g]){let t=x!==e?e:(e=>{let t,r,a=[{}];for(;t=o.exec(e.replace(l,""));)t[4]?a.shift():t[3]?(r=t[3].replace(n," ").trim(),a.unshift(a[0][r]=a[0][r]||{})):a[0][t[1]]=t[2].replace(n," ").trim();return a[0]})(e);c[g]=d(s?{["@keyframes "+g]:t}:t,r?"":"."+g)}let p=r&&c.g?c.g:null;return r&&(c.g=c[g]),i=c[g],p?t.data=t.data.replace(p,i):-1===t.data.indexOf(i)&&(t.data=a?i+t.data:t.data+i),g})(s.unshift?s.raw?(t=[].slice.call(arguments,1),r=a.p,s.reduce((e,a,s)=>{let i=t[s];if(i&&i.call){let e=i(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":d(e,""):!1===e?"":e}return e+a+(null==i?"":i)},"")):s.reduce((e,t)=>Object.assign(e,t&&t.call?t(a.p):t),{}):s,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||i})(a.target),a.g,a.o,a.k)}x.bind({g:1});let g,p,m,h=x.bind({k:1});function f(e,t){let r=this||{};return function(){let a=arguments;function s(i,o){let l=Object.assign({},i),n=l.className||s.className;r.p=Object.assign({theme:p&&p()},l),r.o=/ *go\d+/.test(n),l.className=x.apply(r,a)+(n?" "+n:""),t&&(l.ref=o);let d=e;return e[0]&&(d=l.as||e,delete l.as),m&&d[0]&&m(l),g(d,l)}return t?t(s):s}}var b=(e,t)=>"function"==typeof e?e(t):e,y=(t=0,()=>(++t).toString()),v=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},j="default",k=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:a}=t;return k(e,{type:+!!e.toasts.find(e=>e.id===a.id),toast:a});case 3:let{toastId:s}=t;return{...e,toasts:e.toasts.map(e=>e.id===s||void 0===s?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},w=[],N={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},S={},P=(e,t=j)=>{S[t]=k(S[t]||N,e),w.forEach(([e,r])=>{e===t&&r(S[t])})},L=e=>Object.keys(S).forEach(t=>P(e,t)),E=(e=j)=>t=>{P(t,e)},T={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},C=e=>(t,r)=>{let a,s=((e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||y()}))(t,e,r);return E(s.toasterId||(a=s.id,Object.keys(S).find(e=>S[e].toasts.some(e=>e.id===a))))({type:2,toast:s}),s.id},D=(e,t)=>C("blank")(e,t);D.error=C("error"),D.success=C("success"),D.loading=C("loading"),D.custom=C("custom"),D.dismiss=(e,t)=>{let r={type:3,toastId:e};t?E(t)(r):L(r)},D.dismissAll=e=>D.dismiss(void 0,e),D.remove=(e,t)=>{let r={type:4,toastId:e};t?E(t)(r):L(r)},D.removeAll=e=>D.remove(void 0,e),D.promise=(e,t,r)=>{let a=D.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let s=t.success?b(t.success,e):void 0;return s?D.success(s,{id:a,...r,...null==r?void 0:r.success}):D.dismiss(a),e}).catch(e=>{let s=t.error?b(t.error,e):void 0;s?D.error(s,{id:a,...r,...null==r?void 0:r.error}):D.dismiss(a)}),e};var O=1e3,$=h`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,F=h`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,U=h`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,A=f("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${$} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${F} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${U} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,I=h`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,R=f("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${I} 1s linear infinite;
`,W=h`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,M=h`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,Q=f("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${W} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${M} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,z=f("div")`
  position: absolute;
`,q=f("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,B=h`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,_=f("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${B} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,G=({toast:e})=>{let{icon:t,type:r,iconTheme:a}=e;return void 0!==t?"string"==typeof t?s.createElement(_,null,t):t:"blank"===r?null:s.createElement(q,null,s.createElement(R,{...a}),"loading"!==r&&s.createElement(z,null,"error"===r?s.createElement(A,{...a}):s.createElement(Q,{...a})))},H=f("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,J=f("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,K=s.memo(({toast:e,position:t,style:r,children:a})=>{let i=e.height?((e,t)=>{let r=e.includes("top")?1:-1,[a,s]=v()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*r}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*r}%,-1px) scale(.6); opacity:0;}
`];return{animation:t?`${h(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${h(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},o=s.createElement(G,{toast:e}),l=s.createElement(J,{...e.ariaProps},b(e.message,e));return s.createElement(H,{className:e.className,style:{...i,...r,...e.style}},"function"==typeof a?a({icon:o,message:l}):s.createElement(s.Fragment,null,o,l))});a=s.createElement,d.p=void 0,g=a,p=void 0,m=void 0;var V=({id:e,className:t,style:r,onHeightUpdate:a,children:i})=>{let o=s.useCallback(t=>{if(t){let r=()=>{a(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return s.createElement("div",{ref:o,className:t,style:r},i)},Y=x`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,Z=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:a,children:i,toasterId:o,containerStyle:l,containerClassName:n})=>{let{toasts:d,handlers:c}=((e,t="default")=>{let{toasts:r,pausedAt:a}=((e={},t=j)=>{let[r,a]=(0,s.useState)(S[t]||N),i=(0,s.useRef)(S[t]);(0,s.useEffect)(()=>(i.current!==S[t]&&a(S[t]),w.push([t,a]),()=>{let e=w.findIndex(([e])=>e===t);e>-1&&w.splice(e,1)}),[t]);let o=r.toasts.map(t=>{var r,a,s;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||T[t.type],style:{...e.style,...null==(s=e[t.type])?void 0:s.style,...t.style}}});return{...r,toasts:o}})(e,t),i=(0,s.useRef)(new Map).current,o=(0,s.useCallback)((e,t=O)=>{if(i.has(e))return;let r=setTimeout(()=>{i.delete(e),l({type:4,toastId:e})},t);i.set(e,r)},[]);(0,s.useEffect)(()=>{if(a)return;let e=Date.now(),s=r.map(r=>{if(r.duration===1/0)return;let a=(r.duration||0)+r.pauseDuration-(e-r.createdAt);if(a<0){r.visible&&D.dismiss(r.id);return}return setTimeout(()=>D.dismiss(r.id,t),a)});return()=>{s.forEach(e=>e&&clearTimeout(e))}},[r,a,t]);let l=(0,s.useCallback)(E(t),[t]),n=(0,s.useCallback)(()=>{l({type:5,time:Date.now()})},[l]),d=(0,s.useCallback)((e,t)=>{l({type:1,toast:{id:e,height:t}})},[l]),c=(0,s.useCallback)(()=>{a&&l({type:6,time:Date.now()})},[a,l]),u=(0,s.useCallback)((e,t)=>{let{reverseOrder:a=!1,gutter:s=8,defaultPosition:i}=t||{},o=r.filter(t=>(t.position||i)===(e.position||i)&&t.height),l=o.findIndex(t=>t.id===e.id),n=o.filter((e,t)=>t<l&&e.visible).length;return o.filter(e=>e.visible).slice(...a?[n+1]:[0,n]).reduce((e,t)=>e+(t.height||0)+s,0)},[r]);return(0,s.useEffect)(()=>{r.forEach(e=>{if(e.dismissed)o(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[r,o]),{toasts:r,handlers:{updateHeight:d,startPause:n,endPause:c,calculateOffset:u}}})(r,o);return s.createElement("div",{"data-rht-toaster":o||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...l},className:n,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(r=>{let o,l,n=r.position||t,d=c.calculateOffset(r,{reverseOrder:e,gutter:a,defaultPosition:t}),u=(o=n.includes("top"),l=n.includes("center")?{justifyContent:"center"}:n.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:v()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${d*(o?1:-1)}px)`,...o?{top:0}:{bottom:0},...l});return s.createElement(V,{id:r.id,key:r.id,onHeightUpdate:c.updateHeight,className:r.visible?Y:"",style:u},"custom"===r.type?b(r.message,r):i?i(r):s.createElement(K,{toast:r,position:n}))}))};e.s(["Toaster",()=>Z,"default",()=>D],5766)},52683,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(9876),s=e.i(5766),i=e.i(92199);function o({onTradeAdded:e}){let[a,o]=(0,r.useState)(!1),[l,n]=(0,r.useState)({pair:"EUR/USD",direction:"LONG",entryPrice:"",exitPrice:"",quantity:"",entryTime:new Date().toISOString().slice(0,16),exitTime:"",outcome:"WIN",strategy:"",emotionalState:"calm",setupQuality:"3",notes:""}),d=e=>{let{name:t,value:r}=e.target;n(e=>({...e,[t]:r}))},c=async t=>{t.preventDefault();try{let t=l.exitPrice&&l.entryPrice&&l.quantity?(parseFloat(l.exitPrice)-parseFloat(l.entryPrice))*parseFloat(l.quantity):void 0;(await fetch("/api/trades",{method:"POST",headers:{"Content-Type":"application/json","x-user-id":"demo-user"},body:JSON.stringify({...l,profitLoss:t,entryPrice:parseFloat(l.entryPrice),exitPrice:l.exitPrice?parseFloat(l.exitPrice):null,quantity:parseFloat(l.quantity),setupQuality:parseInt(l.setupQuality)})})).ok&&(s.default.success("Trade added successfully!"),n({pair:"EUR/USD",direction:"LONG",entryPrice:"",exitPrice:"",quantity:"",entryTime:new Date().toISOString().slice(0,16),exitTime:"",outcome:"WIN",strategy:"",emotionalState:"calm",setupQuality:"3",notes:""}),o(!1),e())}catch(e){s.default.error("Failed to add trade"),console.error(e)}};return(0,t.jsxs)("div",{className:"bg-white dark:bg-slate-800 rounded-lg shadow-md border border-gray-200 dark:border-slate-700 p-6 sticky top-24",children:[(0,t.jsx)("h2",{className:"text-lg font-bold text-gray-900 dark:text-white mb-4",children:"Quick Add Trade"}),a?(0,t.jsxs)("form",{onSubmit:c,className:"space-y-4",children:[(0,t.jsxs)("div",{className:"grid grid-cols-2 gap-3",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2",children:"Pair"}),(0,t.jsxs)("select",{name:"pair",value:l.pair,onChange:d,className:"w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none",children:[(0,t.jsx)("option",{children:"EUR/USD"}),(0,t.jsx)("option",{children:"GBP/USD"}),(0,t.jsx)("option",{children:"USD/JPY"}),(0,t.jsx)("option",{children:"AUD/USD"}),(0,t.jsx)("option",{children:"USD/CAD"}),(0,t.jsx)("option",{children:"Other"})]})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2",children:"Direction"}),(0,t.jsxs)("select",{name:"direction",value:l.direction,onChange:d,className:"w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none",children:[(0,t.jsx)("option",{children:"LONG"}),(0,t.jsx)("option",{children:"SHORT"})]})]})]}),(0,t.jsxs)("div",{className:"grid grid-cols-2 gap-3",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2",children:"Entry Price"}),(0,t.jsx)("input",{type:"number",name:"entryPrice",step:"0.00001",placeholder:"1.0850",value:l.entryPrice,onChange:d,required:!0,className:"w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2",children:"Exit Price"}),(0,t.jsx)("input",{type:"number",name:"exitPrice",step:"0.00001",placeholder:"1.0865",value:l.exitPrice,onChange:d,className:"w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"})]})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2",children:"Quantity (Lots)"}),(0,t.jsx)("input",{type:"number",name:"quantity",step:"0.01",placeholder:"1.0",value:l.quantity,onChange:d,required:!0,className:"w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"})]}),(0,t.jsxs)("div",{className:"grid grid-cols-2 gap-3",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2",children:"Strategy"}),(0,t.jsx)("input",{type:"text",name:"strategy",placeholder:"Breakout, Scalp",value:l.strategy,onChange:d,className:"w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2",children:"State"}),(0,t.jsxs)("select",{name:"emotionalState",value:l.emotionalState,onChange:d,className:"w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none",children:[(0,t.jsx)("option",{children:"calm"}),(0,t.jsx)("option",{children:"rushed"}),(0,t.jsx)("option",{children:"frustrated"}),(0,t.jsx)("option",{children:"confident"})]})]})]}),(0,t.jsxs)("div",{className:"grid grid-cols-2 gap-3",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2",children:"Outcome"}),(0,t.jsxs)("select",{name:"outcome",value:l.outcome,onChange:d,className:"w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none",children:[(0,t.jsx)("option",{children:"WIN"}),(0,t.jsx)("option",{children:"LOSS"}),(0,t.jsx)("option",{children:"BREAKEVEN"})]})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2",children:"Setup Quality"}),(0,t.jsxs)("select",{name:"setupQuality",value:l.setupQuality,onChange:d,className:"w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none",children:[(0,t.jsx)("option",{value:"1",children:"⭐ 1"}),(0,t.jsx)("option",{value:"2",children:"⭐⭐ 2"}),(0,t.jsx)("option",{value:"3",children:"⭐⭐⭐ 3"}),(0,t.jsx)("option",{value:"4",children:"⭐⭐⭐⭐ 4"}),(0,t.jsx)("option",{value:"5",children:"⭐⭐⭐⭐⭐ 5"})]})]})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2",children:"Notes"}),(0,t.jsx)("textarea",{name:"notes",placeholder:"Trade notes...",value:l.notes,onChange:d,className:"w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none h-20"})]}),(0,t.jsxs)("div",{className:"flex gap-3 pt-4",children:[(0,t.jsx)("button",{type:"submit",className:"flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors",children:"Save Trade"}),(0,t.jsx)("button",{type:"button",onClick:()=>o(!1),className:"flex-1 bg-gray-200 dark:bg-slate-700 text-gray-900 dark:text-white font-semibold py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors",children:"Cancel"})]})]}):(0,t.jsxs)("button",{onClick:()=>o(!0),className:"w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors",children:[(0,t.jsx)(i.FiPlus,{className:"w-5 h-5"}),"Add New Trade"]})]})}function l({value:e=0}){let r=2*Math.PI*36,a=e/100*r;return(0,t.jsxs)("svg",{width:"84",height:"84",viewBox:"0 0 84 84",children:[(0,t.jsx)("defs",{children:(0,t.jsxs)("linearGradient",{id:"g1",x1:"0%",x2:"100%",children:[(0,t.jsx)("stop",{offset:"0%",stopColor:"#06b6d4"}),(0,t.jsx)("stop",{offset:"100%",stopColor:"#7c3aed"})]})}),(0,t.jsxs)("g",{transform:"translate(42,42)",children:[(0,t.jsx)("circle",{r:36,stroke:"#1f2937",strokeWidth:"12",fill:"none",opacity:"0.2"}),(0,t.jsx)("circle",{r:36,stroke:"url(#g1)",strokeWidth:"12",strokeLinecap:"round",fill:"none",strokeDasharray:`${a} ${r-a}`,transform:"rotate(-90)"}),(0,t.jsxs)("text",{x:"0",y:"6",fill:"#e6e6e6",fontSize:"16",fontWeight:"700",textAnchor:"middle",children:[e,"%"]})]})]})}function n({trades:e}){let a=(0,r.useMemo)(()=>{if(!e.length)return{totalPnL:0,winRate:0,totalTrades:0,consecutiveWins:0,avgWin:0,avgLoss:0,profitFactor:0};let t=e.reduce((e,t)=>e+(t.profitLoss||0),0),r=e.filter(e=>"WIN"===e.outcome).length;e.filter(e=>"LOSS"===e.outcome).length;let a=e.length>0?Math.round(r/e.length*100):0,s=e.filter(e=>e.profitLoss&&e.profitLoss>0),i=e.filter(e=>e.profitLoss&&e.profitLoss<0),o=s.length>0?s.reduce((e,t)=>e+(t.profitLoss||0),0)/s.length:0,l=i.length>0?i.reduce((e,t)=>e+Math.abs(t.profitLoss||0),0)/i.length:0,n=s.reduce((e,t)=>e+(t.profitLoss||0),0),d=i.reduce((e,t)=>e+Math.abs(t.profitLoss||0),0),c=0===d?n>0?1/0:0:Math.round(n/d*100)/100,u=0;for(let t of e)if("WIN"===t.outcome)u++;else break;return{totalPnL:t,winRate:a,totalTrades:e.length,consecutiveWins:u,avgWin:Math.round(100*o)/100,avgLoss:Math.round(100*l)/100,profitFactor:c}},[e]),s=({icon:e,label:r,value:a,unit:s="",isPositive:i=!0,children:o})=>(0,t.jsxs)("div",{className:"card-glass p-4 rounded-lg hover:shadow-lg transition-shadow",children:[(0,t.jsxs)("div",{className:"flex items-start justify-between",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"text-xs font-medium text-gray-400 uppercase tracking-wide",children:r}),(0,t.jsxs)("p",{className:`text-2xl font-bold mt-2 ${"Total P&L"===r?"grad-text":"text-gray-200"}`,children:[a," ",s]})]}),(0,t.jsx)("div",{className:`p-3 rounded-lg ${i?"bg-green-900/20 text-green-300":"bg-red-900/20 text-red-300"}`,children:(0,t.jsx)(e,{className:"w-5 h-5"})})]}),o]});return(0,t.jsx)(t.Fragment,{children:(0,t.jsxs)("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",children:[(0,t.jsx)(s,{icon:i.FiTrendingUp,label:"Total P&L",value:a.totalPnL.toFixed(2),unit:"USD",isPositive:a.totalPnL>=0}),(0,t.jsx)("div",{className:"lg:col-span-1",children:(0,t.jsxs)("div",{className:"card-glass p-4 rounded-lg flex items-center gap-4",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"text-xs text-gray-400 uppercase",children:"Win Rate"}),(0,t.jsx)("div",{className:"mt-2",children:(0,t.jsx)(l,{value:a.winRate})})]}),(0,t.jsxs)("div",{className:"ml-auto",children:[(0,t.jsx)("p",{className:"text-sm text-gray-400",children:"Total Trades"}),(0,t.jsx)("p",{className:"text-lg font-bold text-gray-200 mt-1",children:a.totalTrades})]})]})}),(0,t.jsx)(s,{icon:i.FiActivity,label:"Avg Win / Loss",value:`+${a.avgWin} / ${a.avgLoss}`,isPositive:a.avgWin>a.avgLoss}),(0,t.jsx)(s,{icon:i.FiTrendingDown,label:"Profit Factor",value:a.profitFactor===1/0?"∞":a.profitFactor,isPositive:a.profitFactor>=1})]})})}function d({trades:e,isLoading:r,onTradeDeleted:a}){let o=async e=>{if(confirm("Are you sure you want to delete this trade?"))try{(await fetch(`/api/trades/${e}`,{method:"DELETE",headers:{"x-user-id":"demo-user"}})).ok&&(s.default.success("Trade deleted"),a())}catch(e){s.default.error("Failed to delete trade")}};return r?(0,t.jsx)("div",{className:"bg-white dark:bg-slate-800 rounded-lg p-8 border border-gray-200 dark:border-slate-700",children:(0,t.jsx)("div",{className:"flex justify-center",children:(0,t.jsx)("div",{className:"animate-spin",children:"⏳"})})}):e.length?(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsx)("h2",{className:"text-lg font-bold text-gray-900 dark:text-white",children:"Recent Trades"}),(0,t.jsx)("div",{className:"space-y-3",children:e.map(e=>(0,t.jsx)("div",{className:"bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700 hover:shadow-md dark:hover:shadow-lg transition-shadow",children:(0,t.jsxs)("div",{className:"flex items-start justify-between",children:[(0,t.jsxs)("div",{className:"flex-1",children:[(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[(0,t.jsx)("div",{className:"text-lg font-bold text-gray-900 dark:text-white",children:e.pair}),(0,t.jsx)("span",{className:`px-2 py-1 rounded text-xs font-semibold ${"LONG"===e.direction?"bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400":"bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"}`,children:e.direction}),(0,t.jsx)("span",{className:`px-2 py-1 rounded text-xs font-semibold ${"WIN"===e.outcome?"bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400":"LOSS"===e.outcome?"bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400":"bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"}`,children:e.outcome||"Open"})]}),(0,t.jsxs)("div",{className:"mt-3 grid grid-cols-2 gap-4 text-sm",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"text-gray-500 dark:text-gray-400 text-xs",children:"Entry Price"}),(0,t.jsx)("p",{className:"font-semibold text-gray-900 dark:text-white",children:e.entryPrice.toFixed(5)})]}),e.exitPrice&&(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"text-gray-500 dark:text-gray-400 text-xs",children:"Exit Price"}),(0,t.jsx)("p",{className:"font-semibold text-gray-900 dark:text-white",children:e.exitPrice.toFixed(5)})]}),void 0!==e.profitLoss&&(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"text-gray-500 dark:text-gray-400 text-xs",children:"P&L"}),(0,t.jsxs)("p",{className:`font-semibold ${e.profitLoss>=0?"text-green-600 dark:text-green-400":"text-red-600 dark:text-red-400"}`,children:[e.profitLoss>=0?"+":"",e.profitLoss.toFixed(2)]})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"text-gray-500 dark:text-gray-400 text-xs",children:"Date"}),(0,t.jsx)("p",{className:"font-semibold text-gray-900 dark:text-white",children:new Date(e.entryTime).toLocaleDateString()})]})]}),e.strategy&&(0,t.jsxs)("p",{className:"mt-2 text-xs text-gray-600 dark:text-gray-400",children:["Strategy: ",(0,t.jsx)("span",{className:"font-semibold",children:e.strategy})]}),e.notes&&(0,t.jsx)("p",{className:"mt-2 text-xs text-gray-600 dark:text-gray-400 line-clamp-2",children:e.notes}),e.setupQuality&&(0,t.jsxs)("p",{className:"mt-2 text-xs text-gray-600 dark:text-gray-400",children:["Quality: ",["⭐","⭐⭐","⭐⭐⭐","⭐⭐⭐⭐","⭐⭐⭐⭐⭐"][e.setupQuality-1]]})]}),(0,t.jsx)("div",{className:"flex gap-2 ml-4",children:(0,t.jsx)("button",{onClick:()=>o(e.id),className:"p-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors",title:"Delete trade",children:(0,t.jsx)(i.FiTrash2,{className:"w-5 h-5"})})})]})},e.id))})]}):(0,t.jsx)("div",{className:"bg-white dark:bg-slate-800 rounded-lg p-8 border border-gray-200 dark:border-slate-700 text-center",children:(0,t.jsx)("p",{className:"text-gray-500 dark:text-gray-400",children:"No trades recorded yet. Add your first trade to get started!"})})}function c({trades:e,format:r}){return(0,t.jsxs)("button",{onClick:()=>{"csv"===r?(()=>{if(0===e.length)return s.default.error("No trades to export");let t=new Blob([[["Pair","Direction","Entry Price","Exit Price","P&L","Outcome","Entry Time","Strategy","Emotional State","Setup Quality","Notes"],...e.map(e=>[e.pair,e.direction,e.entryPrice,e.exitPrice||"",e.profitLoss||"",e.outcome||"",new Date(e.entryTime).toLocaleString(),e.strategy||"",e.emotionalState||"",e.setupQuality||"",e.notes||""])].map(e=>e.map(e=>`"${e}"`).join(",")).join("\n")],{type:"text/csv"}),r=URL.createObjectURL(t),a=document.createElement("a");a.href=r,a.download=`trades-${new Date().toISOString().split("T")[0]}.csv`,document.body.appendChild(a),a.click(),document.body.removeChild(a),URL.revokeObjectURL(r),s.default.success("Trades exported to CSV")})():(()=>{if(0===e.length)return s.default.error("No trades to export");let t=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),r=URL.createObjectURL(t),a=document.createElement("a");a.href=r,a.download=`trades-${new Date().toISOString().split("T")[0]}.json`,document.body.appendChild(a),a.click(),document.body.removeChild(a),URL.revokeObjectURL(r),s.default.success("Trades exported to JSON")})()},className:"flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors",children:[(0,t.jsx)(i.FiDownload,{className:"w-4 h-4"}),"Export ",r.toUpperCase()]})}function u(){let{theme:e,toggleTheme:i}=(0,a.useTheme)(),[l,u]=(0,r.useState)([]),[x,g]=(0,r.useState)(!1),p=async()=>{try{g(!0);let e=await fetch("/api/trades",{headers:{"x-user-id":"demo-user"}}),t=await e.json();u(t)}catch(e){console.error("Error fetching trades:",e)}finally{g(!1)}};return(0,r.useEffect)(()=>{p()},[]),(0,t.jsxs)("div",{className:"min-h-screen bg-slate-950 text-gray-200",children:[(0,t.jsxs)("main",{id:"main-content",className:"container mx-auto px-4 py-8 max-w-7xl",children:[(0,t.jsxs)("div",{className:"flex gap-2 mb-6",children:[(0,t.jsx)(c,{trades:l,format:"csv"}),(0,t.jsx)(c,{trades:l,format:"json"})]}),(0,t.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-4 gap-4 mb-8",children:(0,t.jsx)(n,{trades:l})}),(0,t.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-8",children:[(0,t.jsx)("div",{className:"lg:col-span-1",children:(0,t.jsx)(o,{onTradeAdded:p})}),(0,t.jsx)("div",{className:"lg:col-span-2",children:(0,t.jsx)(d,{trades:l,isLoading:x,onTradeDeleted:p})})]})]}),(0,t.jsx)(s.Toaster,{position:"bottom-right"})]})}function x(){let[e,a]=(0,r.useState)(!1);return((0,r.useEffect)(()=>{a(!0)},[]),e)?(0,t.jsx)(u,{}):(0,t.jsx)("div",{className:"min-h-screen bg-white dark:bg-slate-950"})}e.s(["default",()=>x],52683)}]);