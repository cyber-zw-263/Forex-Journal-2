(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,5766,e=>{"use strict";let t,a;var r,s=e.i(71645);let o={data:""},i=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,l=/\/\*[^]*?\*\/|  +/g,n=/\n+/g,d=(e,t)=>{let a="",r="",s="";for(let o in e){let i=e[o];"@"==o[0]?"i"==o[1]?a=o+" "+i+";":r+="f"==o[1]?d(i,o):o+"{"+d(i,"k"==o[1]?"":t)+"}":"object"==typeof i?r+=d(i,t?t.replace(/([^,])+/g,e=>o.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):o):null!=i&&(o=/^--/.test(o)?o:o.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=d.p?d.p(o,i):o+":"+i+";")}return a+(t&&s?t+"{"+s+"}":s)+r},c={},u=e=>{if("object"==typeof e){let t="";for(let a in e)t+=a+u(e[a]);return t}return e};function x(e){let t,a,r=this||{},s=e.call?e(r.p):e;return((e,t,a,r,s)=>{var o;let x=u(e),g=c[x]||(c[x]=(e=>{let t=0,a=11;for(;t<e.length;)a=101*a+e.charCodeAt(t++)>>>0;return"go"+a})(x));if(!c[g]){let t=x!==e?e:(e=>{let t,a,r=[{}];for(;t=i.exec(e.replace(l,""));)t[4]?r.shift():t[3]?(a=t[3].replace(n," ").trim(),r.unshift(r[0][a]=r[0][a]||{})):r[0][t[1]]=t[2].replace(n," ").trim();return r[0]})(e);c[g]=d(s?{["@keyframes "+g]:t}:t,a?"":"."+g)}let m=a&&c.g?c.g:null;return a&&(c.g=c[g]),o=c[g],m?t.data=t.data.replace(m,o):-1===t.data.indexOf(o)&&(t.data=r?o+t.data:t.data+o),g})(s.unshift?s.raw?(t=[].slice.call(arguments,1),a=r.p,s.reduce((e,r,s)=>{let o=t[s];if(o&&o.call){let e=o(a),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;o=t?"."+t:e&&"object"==typeof e?e.props?"":d(e,""):!1===e?"":e}return e+r+(null==o?"":o)},"")):s.reduce((e,t)=>Object.assign(e,t&&t.call?t(r.p):t),{}):s,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||o})(r.target),r.g,r.o,r.k)}x.bind({g:1});let g,m,h,p=x.bind({k:1});function b(e,t){let a=this||{};return function(){let r=arguments;function s(o,i){let l=Object.assign({},o),n=l.className||s.className;a.p=Object.assign({theme:m&&m()},l),a.o=/ *go\d+/.test(n),l.className=x.apply(a,r)+(n?" "+n:""),t&&(l.ref=i);let d=e;return e[0]&&(d=l.as||e,delete l.as),h&&d[0]&&h(l),g(d,l)}return t?t(s):s}}var f=(e,t)=>"function"==typeof e?e(t):e,y=(t=0,()=>(++t).toString()),v=()=>{if(void 0===a&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");a=!e||e.matches}return a},k="default",w=(e,t)=>{let{toastLimit:a}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,a)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return w(e,{type:+!!e.toasts.find(e=>e.id===r.id),toast:r});case 3:let{toastId:s}=t;return{...e,toasts:e.toasts.map(e=>e.id===s||void 0===s?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let o=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+o}))}}},j=[],N={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},C={},E=(e,t=k)=>{C[t]=w(C[t]||N,e),j.forEach(([e,a])=>{e===t&&a(C[t])})},P=e=>Object.keys(C).forEach(t=>E(e,t)),D=(e=k)=>t=>{E(t,e)},S={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},T=e=>(t,a)=>{let r,s=((e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(null==a?void 0:a.id)||y()}))(t,e,a);return D(s.toasterId||(r=s.id,Object.keys(C).find(e=>C[e].toasts.some(e=>e.id===r))))({type:2,toast:s}),s.id},A=(e,t)=>T("blank")(e,t);A.error=T("error"),A.success=T("success"),A.loading=T("loading"),A.custom=T("custom"),A.dismiss=(e,t)=>{let a={type:3,toastId:e};t?D(t)(a):P(a)},A.dismissAll=e=>A.dismiss(void 0,e),A.remove=(e,t)=>{let a={type:4,toastId:e};t?D(t)(a):P(a)},A.removeAll=e=>A.remove(void 0,e),A.promise=(e,t,a)=>{let r=A.loading(t.loading,{...a,...null==a?void 0:a.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let s=t.success?f(t.success,e):void 0;return s?A.success(s,{id:r,...a,...null==a?void 0:a.success}):A.dismiss(r),e}).catch(e=>{let s=t.error?f(t.error,e):void 0;s?A.error(s,{id:r,...a,...null==a?void 0:a.error}):A.dismiss(r)}),e};var $=1e3,O=p`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,z=p`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,I=p`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,F=b("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${O} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${z} 0.15s ease-out forwards;
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
    animation: ${I} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,M=p`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,R=b("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${M} 1s linear infinite;
`,_=p`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,H=p`
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
}`,L=b("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${_} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${H} 0.2s ease-out forwards;
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
`,U=b("div")`
  position: absolute;
`,W=b("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,B=p`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,G=b("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${B} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,K=({toast:e})=>{let{icon:t,type:a,iconTheme:r}=e;return void 0!==t?"string"==typeof t?s.createElement(G,null,t):t:"blank"===a?null:s.createElement(W,null,s.createElement(R,{...r}),"loading"!==a&&s.createElement(U,null,"error"===a?s.createElement(F,{...r}):s.createElement(L,{...r})))},Y=b("div")`
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
`,q=b("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,J=s.memo(({toast:e,position:t,style:a,children:r})=>{let o=e.height?((e,t)=>{let a=e.includes("top")?1:-1,[r,s]=v()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*a}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*a}%,-1px) scale(.6); opacity:0;}
`];return{animation:t?`${p(r)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${p(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},i=s.createElement(K,{toast:e}),l=s.createElement(q,{...e.ariaProps},f(e.message,e));return s.createElement(Y,{className:e.className,style:{...o,...a,...e.style}},"function"==typeof r?r({icon:i,message:l}):s.createElement(s.Fragment,null,i,l))});r=s.createElement,d.p=void 0,g=r,m=void 0,h=void 0;var X=({id:e,className:t,style:a,onHeightUpdate:r,children:o})=>{let i=s.useCallback(t=>{if(t){let a=()=>{r(e,t.getBoundingClientRect().height)};a(),new MutationObserver(a).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,r]);return s.createElement("div",{ref:i,className:t,style:a},o)},Z=x`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,Q=({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:r,children:o,toasterId:i,containerStyle:l,containerClassName:n})=>{let{toasts:d,handlers:c}=((e,t="default")=>{let{toasts:a,pausedAt:r}=((e={},t=k)=>{let[a,r]=(0,s.useState)(C[t]||N),o=(0,s.useRef)(C[t]);(0,s.useEffect)(()=>(o.current!==C[t]&&r(C[t]),j.push([t,r]),()=>{let e=j.findIndex(([e])=>e===t);e>-1&&j.splice(e,1)}),[t]);let i=a.toasts.map(t=>{var a,r,s;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(a=e[t.type])?void 0:a.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(r=e[t.type])?void 0:r.duration)||(null==e?void 0:e.duration)||S[t.type],style:{...e.style,...null==(s=e[t.type])?void 0:s.style,...t.style}}});return{...a,toasts:i}})(e,t),o=(0,s.useRef)(new Map).current,i=(0,s.useCallback)((e,t=$)=>{if(o.has(e))return;let a=setTimeout(()=>{o.delete(e),l({type:4,toastId:e})},t);o.set(e,a)},[]);(0,s.useEffect)(()=>{if(r)return;let e=Date.now(),s=a.map(a=>{if(a.duration===1/0)return;let r=(a.duration||0)+a.pauseDuration-(e-a.createdAt);if(r<0){a.visible&&A.dismiss(a.id);return}return setTimeout(()=>A.dismiss(a.id,t),r)});return()=>{s.forEach(e=>e&&clearTimeout(e))}},[a,r,t]);let l=(0,s.useCallback)(D(t),[t]),n=(0,s.useCallback)(()=>{l({type:5,time:Date.now()})},[l]),d=(0,s.useCallback)((e,t)=>{l({type:1,toast:{id:e,height:t}})},[l]),c=(0,s.useCallback)(()=>{r&&l({type:6,time:Date.now()})},[r,l]),u=(0,s.useCallback)((e,t)=>{let{reverseOrder:r=!1,gutter:s=8,defaultPosition:o}=t||{},i=a.filter(t=>(t.position||o)===(e.position||o)&&t.height),l=i.findIndex(t=>t.id===e.id),n=i.filter((e,t)=>t<l&&e.visible).length;return i.filter(e=>e.visible).slice(...r?[n+1]:[0,n]).reduce((e,t)=>e+(t.height||0)+s,0)},[a]);return(0,s.useEffect)(()=>{a.forEach(e=>{if(e.dismissed)i(e.id,e.removeDelay);else{let t=o.get(e.id);t&&(clearTimeout(t),o.delete(e.id))}})},[a,i]),{toasts:a,handlers:{updateHeight:d,startPause:n,endPause:c,calculateOffset:u}}})(a,i);return s.createElement("div",{"data-rht-toaster":i||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...l},className:n,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(a=>{let i,l,n=a.position||t,d=c.calculateOffset(a,{reverseOrder:e,gutter:r,defaultPosition:t}),u=(i=n.includes("top"),l=n.includes("center")?{justifyContent:"center"}:n.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:v()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${d*(i?1:-1)}px)`,...i?{top:0}:{bottom:0},...l});return s.createElement(X,{id:a.id,key:a.id,onHeightUpdate:c.updateHeight,className:a.visible?Z:"",style:u},"custom"===a.type?f(a.message,a):o?o(a):s.createElement(J,{toast:a,position:n}))}))};e.s(["Toaster",()=>Q,"default",()=>A],5766)},68577,e=>{"use strict";var t=e.i(43476),a=e.i(92199),r=e.i(22016);function s({onThemeToggle:e,currentTheme:s}){return(0,t.jsx)("header",{className:"sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 shadow-sm",children:(0,t.jsxs)("div",{className:"container mx-auto px-4 py-4 max-w-7xl",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between",children:[(0,t.jsxs)(r.default,{href:"/",className:"flex items-center gap-3 hover:opacity-80 transition-opacity",children:[(0,t.jsx)("div",{className:"text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent",children:"📊"}),(0,t.jsxs)("div",{children:[(0,t.jsx)("h1",{className:"text-2xl font-bold text-gray-900 dark:text-white",children:"Young Money"}),(0,t.jsx)("p",{className:"text-xs text-gray-500 dark:text-gray-400",children:"Trading Journal & Portfolio"})]})]}),(0,t.jsxs)("div",{className:"flex items-center gap-4",children:[(0,t.jsxs)("nav",{className:"hidden md:flex gap-6",children:[(0,t.jsx)(r.default,{href:"/",className:"text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors",children:"Dashboard"}),(0,t.jsx)(r.default,{href:"/analytics",className:"text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors",children:"Analytics"}),(0,t.jsx)(r.default,{href:"/calendar",className:"text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors",children:"Calendar"}),(0,t.jsx)(r.default,{href:"/planning",className:"text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors",children:"Planning"}),(0,t.jsx)(r.default,{href:"/insights",className:"text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors",children:"Insights"}),(0,t.jsx)(r.default,{href:"/review",className:"text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors",children:"Review"})]}),(0,t.jsx)("button",{onClick:e,className:"p-2 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors","aria-label":"Toggle theme",children:"dark"===s?(0,t.jsx)(a.FiSun,{className:"w-5 h-5"}):(0,t.jsx)(a.FiMoon,{className:"w-5 h-5"})})]})]}),(0,t.jsxs)("nav",{className:"md:hidden flex gap-3 mt-4 flex-wrap",children:[(0,t.jsx)(r.default,{href:"/",className:"text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 bg-gray-100 dark:bg-slate-800 px-3 py-1 rounded",children:"Dashboard"}),(0,t.jsx)(r.default,{href:"/analytics",className:"text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 bg-gray-100 dark:bg-slate-800 px-3 py-1 rounded",children:"Analytics"}),(0,t.jsx)(r.default,{href:"/calendar",className:"text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 bg-gray-100 dark:bg-slate-800 px-3 py-1 rounded",children:"Calendar"}),(0,t.jsx)(r.default,{href:"/planning",className:"text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 bg-gray-100 dark:bg-slate-800 px-3 py-1 rounded",children:"Planning"}),(0,t.jsx)(r.default,{href:"/insights",className:"text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 bg-gray-100 dark:bg-slate-800 px-3 py-1 rounded",children:"Insights"}),(0,t.jsx)(r.default,{href:"/review",className:"text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 bg-gray-100 dark:bg-slate-800 px-3 py-1 rounded",children:"Review"})]})]})})}e.s(["default",()=>s])},34285,e=>{"use strict";var t=e.i(43476),a=e.i(71645),r=e.i(68577),s=e.i(9876),o=e.i(5766),i=e.i(92199);function l(){let{theme:e,toggleTheme:l}=(0,s.useTheme)(),[n,d]=(0,a.useState)(!1),[c]=(0,a.useState)(new Date().toISOString().split("T")[0]),[u,x]=(0,a.useState)({date:c,goals:[],notes:""}),[g,m]=(0,a.useState)(""),[h,p]=(0,a.useState)(""),[b,f]=(0,a.useState)(""),[y,v]=(0,a.useState)("");(0,a.useEffect)(()=>{d(!0)},[]);let k=()=>{g.trim()&&(x(e=>({...e,goals:[...e.goals,g]})),m(""))},w=async()=>{try{o.default.success("Daily goals saved!")}catch(e){o.default.error("Failed to save goals")}};return n?(0,t.jsxs)("div",{className:"min-h-screen bg-white dark:bg-slate-950",children:[(0,t.jsx)(r.default,{onThemeToggle:l,currentTheme:e}),(0,t.jsxs)("main",{className:"container mx-auto px-4 py-8 max-w-4xl",children:[(0,t.jsxs)("div",{className:"mb-8",children:[(0,t.jsx)("h1",{className:"text-3xl font-bold text-gray-900 dark:text-white mb-2",children:"Trading Plan & Goals"}),(0,t.jsx)("p",{className:"text-gray-600 dark:text-gray-400",children:"Plan your trading day and track your progress"})]}),(0,t.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-8",children:[(0,t.jsxs)("div",{className:"bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700",children:[(0,t.jsx)("h2",{className:"text-lg font-bold text-gray-900 dark:text-white mb-4",children:"Today's Goals"}),(0,t.jsx)("p",{className:"text-xs text-gray-500 dark:text-gray-400 mb-4",children:c}),(0,t.jsxs)("div",{className:"flex gap-2 mb-4",children:[(0,t.jsx)("input",{type:"text",value:g,onChange:e=>m(e.target.value),onKeyPress:e=>"Enter"===e.key&&k(),placeholder:"Add a trading goal (e.g., 'Stick to 5 trades max')",className:"flex-1 px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"}),(0,t.jsx)("button",{onClick:k,className:"bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors",children:(0,t.jsx)(i.FiPlus,{className:"w-5 h-5"})})]}),(0,t.jsx)("div",{className:"space-y-2 mb-6",children:u.goals.map((e,a)=>(0,t.jsxs)("div",{className:"flex items-center justify-between bg-gray-50 dark:bg-slate-700 p-3 rounded-lg",children:[(0,t.jsx)("span",{className:"text-sm text-gray-900 dark:text-white",children:e}),(0,t.jsx)("button",{onClick:()=>{x(e=>({...e,goals:e.goals.filter((e,t)=>t!==a)}))},className:"text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 p-1 rounded",children:(0,t.jsx)(i.FiX,{className:"w-4 h-4"})})]},a))}),(0,t.jsxs)("div",{className:"mb-4",children:[(0,t.jsx)("label",{className:"block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2",children:"Notes"}),(0,t.jsx)("textarea",{value:u.notes,onChange:e=>x(t=>({...t,notes:e.target.value})),placeholder:"Additional notes for today...",className:"w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none h-20"})]}),(0,t.jsx)("button",{onClick:w,className:"w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors",children:"Save Daily Goals"})]}),(0,t.jsxs)("div",{className:"space-y-6",children:[(0,t.jsxs)("div",{className:"bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700",children:[(0,t.jsx)("h2",{className:"text-lg font-bold text-gray-900 dark:text-white mb-4",children:"Weekly Focus Area"}),(0,t.jsxs)("select",{value:h,onChange:e=>p(e.target.value),className:"w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none mb-4",children:[(0,t.jsx)("option",{children:"Select focus area..."}),(0,t.jsx)("option",{children:"Patience & Discipline"}),(0,t.jsx)("option",{children:"Risk Management"}),(0,t.jsx)("option",{children:"Entry Accuracy"}),(0,t.jsx)("option",{children:"Exit Strategy"}),(0,t.jsx)("option",{children:"Consistency"}),(0,t.jsx)("option",{children:"Emotional Control"})]}),(0,t.jsx)("p",{className:"text-xs text-gray-500 dark:text-gray-400",children:"Choose one area to focus on this week"})]}),(0,t.jsxs)("div",{className:"bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700",children:[(0,t.jsx)("h2",{className:"text-lg font-bold text-gray-900 dark:text-white mb-4",children:"Pre-Market Preparation"}),(0,t.jsx)("textarea",{value:b,onChange:e=>f(e.target.value),placeholder:"Economic events, key levels, pairs to watch...",className:"w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none h-24"})]}),(0,t.jsxs)("div",{className:"bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700",children:[(0,t.jsx)("h2",{className:"text-lg font-bold text-gray-900 dark:text-white mb-4",children:"Post-Session Review Prompts"}),(0,t.jsxs)("ul",{className:"space-y-2 text-xs text-gray-600 dark:text-gray-400",children:[(0,t.jsx)("li",{children:"✓ Did you hit your daily goal?"}),(0,t.jsx)("li",{children:"✓ What was your biggest win today?"}),(0,t.jsx)("li",{children:"✓ What mistake did you make?"}),(0,t.jsx)("li",{children:"✓ How was your emotional control?"}),(0,t.jsx)("li",{children:"✓ What will you improve tomorrow?"})]}),(0,t.jsx)("textarea",{value:y,onChange:e=>v(e.target.value),placeholder:"Your reflections...",className:"w-full mt-4 px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none h-24"})]})]})]})]}),(0,t.jsx)(o.Toaster,{position:"bottom-right"})]}):(0,t.jsx)("div",{className:"min-h-screen bg-white dark:bg-slate-950"})}e.s(["default",()=>l])}]);