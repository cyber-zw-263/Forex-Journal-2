(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,5766,e=>{"use strict";let t,a;var r,s=e.i(71645);let i={data:""},l=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,o=/\/\*[^]*?\*\/|  +/g,d=/\n+/g,n=(e,t)=>{let a="",r="",s="";for(let i in e){let l=e[i];"@"==i[0]?"i"==i[1]?a=i+" "+l+";":r+="f"==i[1]?n(l,i):i+"{"+n(l,"k"==i[1]?"":t)+"}":"object"==typeof l?r+=n(l,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=l&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=n.p?n.p(i,l):i+":"+l+";")}return a+(t&&s?t+"{"+s+"}":s)+r},c={},u=e=>{if("object"==typeof e){let t="";for(let a in e)t+=a+u(e[a]);return t}return e};function x(e){let t,a,r=this||{},s=e.call?e(r.p):e;return((e,t,a,r,s)=>{var i;let x=u(e),m=c[x]||(c[x]=(e=>{let t=0,a=11;for(;t<e.length;)a=101*a+e.charCodeAt(t++)>>>0;return"go"+a})(x));if(!c[m]){let t=x!==e?e:(e=>{let t,a,r=[{}];for(;t=l.exec(e.replace(o,""));)t[4]?r.shift():t[3]?(a=t[3].replace(d," ").trim(),r.unshift(r[0][a]=r[0][a]||{})):r[0][t[1]]=t[2].replace(d," ").trim();return r[0]})(e);c[m]=n(s?{["@keyframes "+m]:t}:t,a?"":"."+m)}let g=a&&c.g?c.g:null;return a&&(c.g=c[m]),i=c[m],g?t.data=t.data.replace(g,i):-1===t.data.indexOf(i)&&(t.data=r?i+t.data:t.data+i),m})(s.unshift?s.raw?(t=[].slice.call(arguments,1),a=r.p,s.reduce((e,r,s)=>{let i=t[s];if(i&&i.call){let e=i(a),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":n(e,""):!1===e?"":e}return e+r+(null==i?"":i)},"")):s.reduce((e,t)=>Object.assign(e,t&&t.call?t(r.p):t),{}):s,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||i})(r.target),r.g,r.o,r.k)}x.bind({g:1});let m,g,h,p=x.bind({k:1});function b(e,t){let a=this||{};return function(){let r=arguments;function s(i,l){let o=Object.assign({},i),d=o.className||s.className;a.p=Object.assign({theme:g&&g()},o),a.o=/ *go\d+/.test(d),o.className=x.apply(a,r)+(d?" "+d:""),t&&(o.ref=l);let n=e;return e[0]&&(n=o.as||e,delete o.as),h&&n[0]&&h(o),m(n,o)}return t?t(s):s}}var f=(e,t)=>"function"==typeof e?e(t):e,y=(t=0,()=>(++t).toString()),v=()=>{if(void 0===a&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");a=!e||e.matches}return a},k="default",j=(e,t)=>{let{toastLimit:a}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,a)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return j(e,{type:+!!e.toasts.find(e=>e.id===r.id),toast:r});case 3:let{toastId:s}=t;return{...e,toasts:e.toasts.map(e=>e.id===s||void 0===s?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},w=[],N={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},S={},C=(e,t=k)=>{S[t]=j(S[t]||N,e),w.forEach(([e,a])=>{e===t&&a(S[t])})},E=e=>Object.keys(S).forEach(t=>C(e,t)),D=(e=k)=>t=>{C(t,e)},T={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},O=e=>(t,a)=>{let r,s=((e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(null==a?void 0:a.id)||y()}))(t,e,a);return D(s.toasterId||(r=s.id,Object.keys(S).find(e=>S[e].toasts.some(e=>e.id===r))))({type:2,toast:s}),s.id},$=(e,t)=>O("blank")(e,t);$.error=O("error"),$.success=O("success"),$.loading=O("loading"),$.custom=O("custom"),$.dismiss=(e,t)=>{let a={type:3,toastId:e};t?D(t)(a):E(a)},$.dismissAll=e=>$.dismiss(void 0,e),$.remove=(e,t)=>{let a={type:4,toastId:e};t?D(t)(a):E(a)},$.removeAll=e=>$.remove(void 0,e),$.promise=(e,t,a)=>{let r=$.loading(t.loading,{...a,...null==a?void 0:a.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let s=t.success?f(t.success,e):void 0;return s?$.success(s,{id:r,...a,...null==a?void 0:a.success}):$.dismiss(r),e}).catch(e=>{let s=t.error?f(t.error,e):void 0;s?$.error(s,{id:r,...a,...null==a?void 0:a.error}):$.dismiss(r)}),e};var F=1e3,P=p`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,R=p`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,L=p`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,A=b("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${P} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${R} 0.15s ease-out forwards;
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
    animation: ${L} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,I=p`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,M=b("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${I} 1s linear infinite;
`,z=p`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,U=p`
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
}`,B=b("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${z} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${U} 0.2s ease-out forwards;
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
`,Q=b("div")`
  position: absolute;
`,_=b("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,H=p`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,J=b("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${H} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,G=({toast:e})=>{let{icon:t,type:a,iconTheme:r}=e;return void 0!==t?"string"==typeof t?s.createElement(J,null,t):t:"blank"===a?null:s.createElement(_,null,s.createElement(M,{...r}),"loading"!==a&&s.createElement(Q,null,"error"===a?s.createElement(A,{...r}):s.createElement(B,{...r})))},K=b("div")`
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
`,W=b("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Y=s.memo(({toast:e,position:t,style:a,children:r})=>{let i=e.height?((e,t)=>{let a=e.includes("top")?1:-1,[r,s]=v()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*a}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*a}%,-1px) scale(.6); opacity:0;}
`];return{animation:t?`${p(r)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${p(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},l=s.createElement(G,{toast:e}),o=s.createElement(W,{...e.ariaProps},f(e.message,e));return s.createElement(K,{className:e.className,style:{...i,...a,...e.style}},"function"==typeof r?r({icon:l,message:o}):s.createElement(s.Fragment,null,l,o))});r=s.createElement,n.p=void 0,m=r,g=void 0,h=void 0;var q=({id:e,className:t,style:a,onHeightUpdate:r,children:i})=>{let l=s.useCallback(t=>{if(t){let a=()=>{r(e,t.getBoundingClientRect().height)};a(),new MutationObserver(a).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,r]);return s.createElement("div",{ref:l,className:t,style:a},i)},V=x`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,X=({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:r,children:i,toasterId:l,containerStyle:o,containerClassName:d})=>{let{toasts:n,handlers:c}=((e,t="default")=>{let{toasts:a,pausedAt:r}=((e={},t=k)=>{let[a,r]=(0,s.useState)(S[t]||N),i=(0,s.useRef)(S[t]);(0,s.useEffect)(()=>(i.current!==S[t]&&r(S[t]),w.push([t,r]),()=>{let e=w.findIndex(([e])=>e===t);e>-1&&w.splice(e,1)}),[t]);let l=a.toasts.map(t=>{var a,r,s;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(a=e[t.type])?void 0:a.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(r=e[t.type])?void 0:r.duration)||(null==e?void 0:e.duration)||T[t.type],style:{...e.style,...null==(s=e[t.type])?void 0:s.style,...t.style}}});return{...a,toasts:l}})(e,t),i=(0,s.useRef)(new Map).current,l=(0,s.useCallback)((e,t=F)=>{if(i.has(e))return;let a=setTimeout(()=>{i.delete(e),o({type:4,toastId:e})},t);i.set(e,a)},[]);(0,s.useEffect)(()=>{if(r)return;let e=Date.now(),s=a.map(a=>{if(a.duration===1/0)return;let r=(a.duration||0)+a.pauseDuration-(e-a.createdAt);if(r<0){a.visible&&$.dismiss(a.id);return}return setTimeout(()=>$.dismiss(a.id,t),r)});return()=>{s.forEach(e=>e&&clearTimeout(e))}},[a,r,t]);let o=(0,s.useCallback)(D(t),[t]),d=(0,s.useCallback)(()=>{o({type:5,time:Date.now()})},[o]),n=(0,s.useCallback)((e,t)=>{o({type:1,toast:{id:e,height:t}})},[o]),c=(0,s.useCallback)(()=>{r&&o({type:6,time:Date.now()})},[r,o]),u=(0,s.useCallback)((e,t)=>{let{reverseOrder:r=!1,gutter:s=8,defaultPosition:i}=t||{},l=a.filter(t=>(t.position||i)===(e.position||i)&&t.height),o=l.findIndex(t=>t.id===e.id),d=l.filter((e,t)=>t<o&&e.visible).length;return l.filter(e=>e.visible).slice(...r?[d+1]:[0,d]).reduce((e,t)=>e+(t.height||0)+s,0)},[a]);return(0,s.useEffect)(()=>{a.forEach(e=>{if(e.dismissed)l(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[a,l]),{toasts:a,handlers:{updateHeight:n,startPause:d,endPause:c,calculateOffset:u}}})(a,l);return s.createElement("div",{"data-rht-toaster":l||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...o},className:d,onMouseEnter:c.startPause,onMouseLeave:c.endPause},n.map(a=>{let l,o,d=a.position||t,n=c.calculateOffset(a,{reverseOrder:e,gutter:r,defaultPosition:t}),u=(l=d.includes("top"),o=d.includes("center")?{justifyContent:"center"}:d.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:v()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${n*(l?1:-1)}px)`,...l?{top:0}:{bottom:0},...o});return s.createElement(q,{id:a.id,key:a.id,onHeightUpdate:c.updateHeight,className:a.visible?V:"",style:u},"custom"===a.type?f(a.message,a):i?i(a):s.createElement(Y,{toast:a,position:d}))}))};e.s(["Toaster",()=>X,"default",()=>$],5766)},68577,e=>{"use strict";var t=e.i(43476),a=e.i(92199),r=e.i(22016);function s({onThemeToggle:e,currentTheme:s}){return(0,t.jsx)("header",{className:"sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 shadow-sm",children:(0,t.jsxs)("div",{className:"container mx-auto px-4 py-4 max-w-7xl",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between",children:[(0,t.jsxs)(r.default,{href:"/",className:"flex items-center gap-3 hover:opacity-80 transition-opacity",children:[(0,t.jsx)("div",{className:"text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent",children:"📊"}),(0,t.jsxs)("div",{children:[(0,t.jsx)("h1",{className:"text-2xl font-bold text-gray-900 dark:text-white",children:"Young Money"}),(0,t.jsx)("p",{className:"text-xs text-gray-500 dark:text-gray-400",children:"Trading Journal & Portfolio"})]})]}),(0,t.jsxs)("div",{className:"flex items-center gap-4",children:[(0,t.jsxs)("nav",{className:"hidden md:flex gap-6",children:[(0,t.jsx)(r.default,{href:"/",className:"text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors",children:"Dashboard"}),(0,t.jsx)(r.default,{href:"/analytics",className:"text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors",children:"Analytics"}),(0,t.jsx)(r.default,{href:"/calendar",className:"text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors",children:"Calendar"}),(0,t.jsx)(r.default,{href:"/planning",className:"text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors",children:"Planning"}),(0,t.jsx)(r.default,{href:"/insights",className:"text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors",children:"Insights"}),(0,t.jsx)(r.default,{href:"/review",className:"text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors",children:"Review"})]}),(0,t.jsx)("button",{onClick:e,className:"p-2 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors","aria-label":"Toggle theme",children:"dark"===s?(0,t.jsx)(a.FiSun,{className:"w-5 h-5"}):(0,t.jsx)(a.FiMoon,{className:"w-5 h-5"})})]})]}),(0,t.jsxs)("nav",{className:"md:hidden flex gap-3 mt-4 flex-wrap",children:[(0,t.jsx)(r.default,{href:"/",className:"text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 bg-gray-100 dark:bg-slate-800 px-3 py-1 rounded",children:"Dashboard"}),(0,t.jsx)(r.default,{href:"/analytics",className:"text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 bg-gray-100 dark:bg-slate-800 px-3 py-1 rounded",children:"Analytics"}),(0,t.jsx)(r.default,{href:"/calendar",className:"text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 bg-gray-100 dark:bg-slate-800 px-3 py-1 rounded",children:"Calendar"}),(0,t.jsx)(r.default,{href:"/planning",className:"text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 bg-gray-100 dark:bg-slate-800 px-3 py-1 rounded",children:"Planning"}),(0,t.jsx)(r.default,{href:"/insights",className:"text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 bg-gray-100 dark:bg-slate-800 px-3 py-1 rounded",children:"Insights"}),(0,t.jsx)(r.default,{href:"/review",className:"text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 bg-gray-100 dark:bg-slate-800 px-3 py-1 rounded",children:"Review"})]})]})})}e.s(["default",()=>s])},18924,e=>{"use strict";var t=e.i(43476),a=e.i(71645),r=e.i(68577),s=e.i(5766),i=e.i(92199);function l({onRecordingSaved:e}){let r=(0,a.useRef)(null),l=(0,a.useRef)([]),[o,d]=(0,a.useState)(!1),[n,c]=(0,a.useState)(0),[u,x]=(0,a.useState)([]),[m,g]=(0,a.useState)(null);(0,a.useEffect)(()=>{let e;return o&&(e=setInterval(()=>{c(e=>e+1)},1e3)),()=>clearInterval(e)},[o]);let h=async()=>{try{let t=await navigator.mediaDevices.getUserMedia({audio:!0});r.current=new MediaRecorder(t),l.current=[],r.current.ondataavailable=e=>{l.current.push(e.data)},r.current.onstop=()=>{let t=new Blob(l.current,{type:"audio/webm"}),a=URL.createObjectURL(t),r={id:Date.now().toString(),url:a,duration:n,timestamp:new Date};x(e=>[r,...e]),e?.(a)},r.current.start(),d(!0),c(0)}catch(e){s.default.error("Unable to access microphone"),console.error(e)}},p=e=>{let t=Math.floor(e/60);return`${t}:${(e%60).toString().padStart(2,"0")}`};return(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsxs)("div",{className:"bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700",children:[(0,t.jsx)("h3",{className:"text-lg font-bold text-gray-900 dark:text-white mb-4",children:"Voice Notes"}),(0,t.jsx)("div",{className:"flex items-center gap-4 mb-4",children:o?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("button",{onClick:()=>{r.current&&o&&(r.current.stop(),d(!1),r.current.stream.getTracks().forEach(e=>e.stop()))},className:"flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors",children:[(0,t.jsx)(i.FiStopCircle,{className:"w-5 h-5"}),"Stop"]}),(0,t.jsx)("div",{className:"text-lg font-bold text-red-600 dark:text-red-400",children:p(n)}),(0,t.jsx)("div",{className:"flex-1 h-1 bg-red-300 dark:bg-red-900 rounded-full relative overflow-hidden",children:(0,t.jsx)("div",{className:"h-full bg-red-600 animate-pulse",style:{width:"30%"}})})]}):(0,t.jsxs)("button",{onClick:h,className:"flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors",children:[(0,t.jsx)(i.FiMic,{className:"w-5 h-5"}),"Start Recording"]})}),u.length>0&&(0,t.jsxs)("div",{className:"space-y-3",children:[(0,t.jsx)("h4",{className:"text-sm font-semibold text-gray-700 dark:text-gray-300",children:"Recordings"}),u.map(e=>(0,t.jsxs)("div",{className:"flex items-center justify-between bg-gray-50 dark:bg-slate-700 p-3 rounded-lg",children:[(0,t.jsxs)("div",{className:"flex items-center gap-3 flex-1",children:[(0,t.jsx)("button",{onClick:()=>g(m===e.id?null:e.id),className:"p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors",children:(0,t.jsx)(i.FiPlay,{className:"w-4 h-4"})}),(0,t.jsxs)("div",{className:"flex-1",children:[(0,t.jsx)("p",{className:"text-sm font-medium text-gray-900 dark:text-white",children:e.timestamp.toLocaleTimeString()}),(0,t.jsx)("p",{className:"text-xs text-gray-500 dark:text-gray-400",children:p(e.duration)})]})]}),(0,t.jsx)("button",{onClick:()=>{var t;return t=e.id,void x(e=>e.filter(e=>e.id!==t))},className:"p-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors",children:(0,t.jsx)(i.FiTrash2,{className:"w-4 h-4"})})]},e.id))]})]}),m&&(0,t.jsx)("audio",{src:u.find(e=>e.id===m)?.url,autoPlay:!0,controls:!0,className:"w-full"},m)]})}function o({onScreenshotAdded:e}){let r=(0,a.useRef)(null),[l,o]=(0,a.useState)([]),[d,n]=(0,a.useState)(null),[c,u]=(0,a.useState)(""),x=async t=>{let a=t.currentTarget.files;if(a){for(let t of Array.from(a))try{let a=new FileReader;a.onload=t=>{let a=t.target?.result,r={id:Date.now().toString()+Math.random(),url:a,caption:"",timestamp:new Date};o(e=>[r,...e]),e?.(a),s.default.success("Screenshot uploaded")},a.readAsDataURL(t)}catch(e){s.default.error("Failed to upload screenshot"),console.error(e)}r.current&&(r.current.value="")}},m=(e,t)=>{o(a=>a.map(a=>a.id===e?{...a,caption:t}:a)),n(null)};return(0,t.jsx)("div",{className:"space-y-4",children:(0,t.jsxs)("div",{className:"bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700",children:[(0,t.jsx)("h3",{className:"text-lg font-bold text-gray-900 dark:text-white mb-4",children:"Trade Setup Screenshots"}),(0,t.jsxs)("div",{onClick:()=>r.current?.click(),className:"border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors",children:[(0,t.jsx)(i.FiUpload,{className:"w-8 h-8 mx-auto mb-2 text-gray-600 dark:text-gray-400"}),(0,t.jsx)("p",{className:"text-sm font-medium text-gray-900 dark:text-white",children:"Click to upload or drag & drop"}),(0,t.jsx)("p",{className:"text-xs text-gray-500 dark:text-gray-400",children:"PNG, JPG, GIF up to 10MB"}),(0,t.jsx)("input",{ref:r,type:"file",multiple:!0,accept:"image/*",onChange:x,className:"hidden"})]}),l.length>0&&(0,t.jsxs)("div",{className:"mt-6",children:[(0,t.jsx)("h4",{className:"text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4",children:"Uploads"}),(0,t.jsx)("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4",children:l.map(e=>(0,t.jsxs)("div",{className:"relative group bg-gray-100 dark:bg-slate-700 rounded-lg overflow-hidden",children:[(0,t.jsx)("img",{src:e.url,alt:"Trade setup",className:"w-full h-40 object-cover"}),(0,t.jsxs)("div",{className:"absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between p-2",children:[(0,t.jsx)("button",{onClick:()=>{var t,a;let r;return t=e.url,a=e.timestamp,void((r=document.createElement("a")).href=t,r.download=`trade-setup-${a.toISOString()}.png`,document.body.appendChild(r),r.click(),document.body.removeChild(r))},className:"p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors",title:"Download",children:(0,t.jsx)(i.FiDownload,{className:"w-4 h-4"})}),(0,t.jsx)("button",{onClick:()=>{var t;return t=e.id,void o(e=>e.filter(e=>e.id!==t))},className:"p-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors",title:"Delete",children:(0,t.jsx)(i.FiX,{className:"w-4 h-4"})})]}),(0,t.jsx)("div",{className:"p-3 bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-600",children:d===e.id?(0,t.jsx)("input",{autoFocus:!0,type:"text",value:c,onChange:e=>u(e.target.value),onBlur:()=>m(e.id,c),onKeyPress:t=>{"Enter"===t.key&&m(e.id,c)},placeholder:"Add caption...",className:"w-full px-2 py-1 border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 outline-none"}):(0,t.jsx)("p",{onClick:()=>{n(e.id),u(e.caption)},className:"text-xs text-gray-600 dark:text-gray-400 cursor-pointer hover:text-gray-900 dark:hover:text-white",children:e.caption||"Click to add caption..."})})]},e.id))})]})]})})}var d=e.i(9876);function n(){let{theme:e,toggleTheme:i}=(0,d.useTheme)(),[n,c]=(0,a.useState)(!1),[u,x]=(0,a.useState)(null),[m,g]=(0,a.useState)([]),[h,p]=(0,a.useState)({whatLearned:"",mistakes:[],emotionalState:"calm",setupQuality:3}),[b,f]=(0,a.useState)("");(0,a.useEffect)(()=>{c(!0)},[]),(0,a.useEffect)(()=>{n&&(async()=>{try{let e=await fetch("/api/trades",{headers:{"x-user-id":"demo-user"}}),t=await e.json();g(t)}catch(e){console.error("Error fetching trades:",e)}})()},[n]);let y=m.find(e=>e.id===u),v=async()=>{if(y)try{(await fetch(`/api/trades/${y.id}`,{method:"PUT",headers:{"Content-Type":"application/json","x-user-id":"demo-user"},body:JSON.stringify({whatLearned:h.whatLearned,mistakes:JSON.stringify(h.mistakes),emotionalState:h.emotionalState,setupQuality:h.setupQuality})})).ok&&(s.default.success("Review saved"),x(null))}catch(e){s.default.error("Failed to save review")}};return n?(0,t.jsxs)("div",{className:"min-h-screen bg-white dark:bg-slate-950",children:[(0,t.jsx)(r.default,{onThemeToggle:i,currentTheme:e}),(0,t.jsxs)("main",{className:"container mx-auto px-4 py-8 max-w-6xl",children:[(0,t.jsxs)("div",{className:"mb-8",children:[(0,t.jsx)("h1",{className:"text-3xl font-bold text-gray-900 dark:text-white mb-2",children:"Trade Reviews"}),(0,t.jsx)("p",{className:"text-gray-600 dark:text-gray-400",children:"Deep dive into your trades and learn from them"})]}),(0,t.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-8",children:[(0,t.jsxs)("div",{className:"bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700",children:[(0,t.jsx)("h2",{className:"text-lg font-bold text-gray-900 dark:text-white mb-4",children:"Recent Trades"}),(0,t.jsx)("div",{className:"space-y-2 max-h-96 overflow-y-auto",children:m.length>0?m.map(e=>(0,t.jsxs)("button",{onClick:()=>{x(e.id),p({whatLearned:e.whatLearned||"",mistakes:e.mistakes?JSON.parse(e.mistakes):[],emotionalState:e.emotionalState||"calm",setupQuality:e.setupQuality||3})},className:`w-full text-left p-3 rounded-lg transition-colors ${u===e.id?"bg-blue-600 text-white":"bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-600"}`,children:[(0,t.jsx)("div",{className:"font-semibold text-sm",children:e.pair}),(0,t.jsx)("div",{className:"text-xs opacity-75",children:new Date(e.entryTime).toLocaleDateString()})]},e.id)):(0,t.jsx)("p",{className:"text-sm text-gray-500 dark:text-gray-400 text-center py-4",children:"No trades yet"})})]}),y?(0,t.jsxs)("div",{className:"lg:col-span-2 space-y-6",children:[(0,t.jsxs)("div",{className:"bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700",children:[(0,t.jsxs)("h2",{className:"text-lg font-bold text-gray-900 dark:text-white mb-4",children:[y.pair," - ",y.direction]}),(0,t.jsxs)("div",{className:"grid grid-cols-2 gap-4 text-sm",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"text-gray-600 dark:text-gray-400",children:"Entry"}),(0,t.jsx)("p",{className:"font-semibold text-gray-900 dark:text-white",children:y.entryPrice.toFixed(5)})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"text-gray-600 dark:text-gray-400",children:"Exit"}),(0,t.jsx)("p",{className:"font-semibold text-gray-900 dark:text-white",children:y.exitPrice?.toFixed(5)||"Open"})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"text-gray-600 dark:text-gray-400",children:"P&L"}),(0,t.jsx)("p",{className:`font-semibold ${y.profitLoss>=0?"text-green-600 dark:text-green-400":"text-red-600 dark:text-red-400"}`,children:y.profitLoss?.toFixed(2)||"N/A"})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"text-gray-600 dark:text-gray-400",children:"Outcome"}),(0,t.jsx)("p",{className:"font-semibold text-gray-900 dark:text-white",children:y.outcome||"Open"})]})]})]}),(0,t.jsxs)("div",{className:"bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700",children:[(0,t.jsx)("h3",{className:"text-lg font-bold text-gray-900 dark:text-white mb-4",children:"Review Details"}),(0,t.jsxs)("div",{className:"mb-4",children:[(0,t.jsx)("label",{className:"block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2",children:"What I Learned"}),(0,t.jsx)("textarea",{value:h.whatLearned,onChange:e=>p(t=>({...t,whatLearned:e.target.value})),placeholder:"What did this trade teach you?",className:"w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none h-20"})]}),(0,t.jsxs)("div",{className:"mb-4",children:[(0,t.jsx)("label",{className:"block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2",children:"Emotional State"}),(0,t.jsxs)("select",{value:h.emotionalState,onChange:e=>p(t=>({...t,emotionalState:e.target.value})),className:"w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none",children:[(0,t.jsx)("option",{children:"calm"}),(0,t.jsx)("option",{children:"rushed"}),(0,t.jsx)("option",{children:"frustrated"}),(0,t.jsx)("option",{children:"confident"}),(0,t.jsx)("option",{children:"fearful"})]})]}),(0,t.jsxs)("div",{className:"mb-4",children:[(0,t.jsx)("label",{className:"block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2",children:"Setup Quality Rating"}),(0,t.jsxs)("select",{value:h.setupQuality,onChange:e=>p(t=>({...t,setupQuality:parseInt(e.target.value)})),className:"w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none",children:[(0,t.jsx)("option",{value:"1",children:"⭐ Poor"}),(0,t.jsx)("option",{value:"2",children:"⭐⭐ Below Average"}),(0,t.jsx)("option",{value:"3",children:"⭐⭐⭐ Average"}),(0,t.jsx)("option",{value:"4",children:"⭐⭐⭐⭐ Good"}),(0,t.jsx)("option",{value:"5",children:"⭐⭐⭐⭐⭐ Excellent"})]})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2",children:"Mistakes Made"}),(0,t.jsx)("div",{className:"grid grid-cols-2 gap-2",children:["Overtraded","Broke rules","Wrong entry point","Hesitated on trade","Exited too early","Exited too late","Ignored analysis","Bad position sizing","Emotion-driven"].map(e=>(0,t.jsxs)("label",{className:"flex items-center gap-2 cursor-pointer",children:[(0,t.jsx)("input",{type:"checkbox",checked:h.mistakes.includes(e),onChange:()=>{p(t=>({...t,mistakes:t.mistakes.includes(e)?t.mistakes.filter(t=>t!==e):[...t.mistakes,e]}))},className:"w-4 h-4 rounded border-gray-300 dark:border-slate-600"}),(0,t.jsx)("span",{className:"text-sm text-gray-700 dark:text-gray-300",children:e})]},e))})]})]}),(0,t.jsx)("button",{onClick:v,className:"w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors",children:"Save Review"})]}):(0,t.jsx)("div",{className:"lg:col-span-2 bg-white dark:bg-slate-800 rounded-lg p-12 text-center border border-gray-200 dark:border-slate-700",children:(0,t.jsx)("p",{className:"text-gray-600 dark:text-gray-400",children:"Select a trade to review"})})]}),y&&(0,t.jsxs)("div",{className:"mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8",children:[(0,t.jsx)(l,{}),(0,t.jsx)(o,{})]})]}),(0,t.jsx)(s.Toaster,{position:"bottom-right"})]}):(0,t.jsx)("div",{className:"min-h-screen bg-white dark:bg-slate-950"})}e.s(["default",()=>n],18924)}]);