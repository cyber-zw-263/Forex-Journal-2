(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,5766,e=>{"use strict";let t,r;var a,s=e.i(71645);let i={data:""},o=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,l=/\/\*[^]*?\*\/|  +/g,n=/\n+/g,d=(e,t)=>{let r="",a="",s="";for(let i in e){let o=e[i];"@"==i[0]?"i"==i[1]?r=i+" "+o+";":a+="f"==i[1]?d(o,i):i+"{"+d(o,"k"==i[1]?"":t)+"}":"object"==typeof o?a+=d(o,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=o&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=d.p?d.p(i,o):i+":"+o+";")}return r+(t&&s?t+"{"+s+"}":s)+a},c={},u=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+u(e[r]);return t}return e};function g(e){let t,r,a=this||{},s=e.call?e(a.p):e;return((e,t,r,a,s)=>{var i;let g=u(e),x=c[g]||(c[g]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(g));if(!c[x]){let t=g!==e?e:(e=>{let t,r,a=[{}];for(;t=o.exec(e.replace(l,""));)t[4]?a.shift():t[3]?(r=t[3].replace(n," ").trim(),a.unshift(a[0][r]=a[0][r]||{})):a[0][t[1]]=t[2].replace(n," ").trim();return a[0]})(e);c[x]=d(s?{["@keyframes "+x]:t}:t,r?"":"."+x)}let m=r&&c.g?c.g:null;return r&&(c.g=c[x]),i=c[x],m?t.data=t.data.replace(m,i):-1===t.data.indexOf(i)&&(t.data=a?i+t.data:t.data+i),x})(s.unshift?s.raw?(t=[].slice.call(arguments,1),r=a.p,s.reduce((e,a,s)=>{let i=t[s];if(i&&i.call){let e=i(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":d(e,""):!1===e?"":e}return e+a+(null==i?"":i)},"")):s.reduce((e,t)=>Object.assign(e,t&&t.call?t(a.p):t),{}):s,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||i})(a.target),a.g,a.o,a.k)}g.bind({g:1});let x,m,p,h=g.bind({k:1});function b(e,t){let r=this||{};return function(){let a=arguments;function s(i,o){let l=Object.assign({},i),n=l.className||s.className;r.p=Object.assign({theme:m&&m()},l),r.o=/ *go\d+/.test(n),l.className=g.apply(r,a)+(n?" "+n:""),t&&(l.ref=o);let d=e;return e[0]&&(d=l.as||e,delete l.as),p&&d[0]&&p(l),x(d,l)}return t?t(s):s}}var f=(e,t)=>"function"==typeof e?e(t):e,y=(t=0,()=>(++t).toString()),v=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},k="default",j=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:a}=t;return j(e,{type:+!!e.toasts.find(e=>e.id===a.id),toast:a});case 3:let{toastId:s}=t;return{...e,toasts:e.toasts.map(e=>e.id===s||void 0===s?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},N=[],w={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},D={},E=(e,t=k)=>{D[t]=j(D[t]||w,e),N.forEach(([e,r])=>{e===t&&r(D[t])})},T=e=>Object.keys(D).forEach(t=>E(e,t)),C=(e=k)=>t=>{E(t,e)},$={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},S=e=>(t,r)=>{let a,s=((e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||y()}))(t,e,r);return C(s.toasterId||(a=s.id,Object.keys(D).find(e=>D[e].toasts.some(e=>e.id===a))))({type:2,toast:s}),s.id},O=(e,t)=>S("blank")(e,t);O.error=S("error"),O.success=S("success"),O.loading=S("loading"),O.custom=S("custom"),O.dismiss=(e,t)=>{let r={type:3,toastId:e};t?C(t)(r):T(r)},O.dismissAll=e=>O.dismiss(void 0,e),O.remove=(e,t)=>{let r={type:4,toastId:e};t?C(t)(r):T(r)},O.removeAll=e=>O.remove(void 0,e),O.promise=(e,t,r)=>{let a=O.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let s=t.success?f(t.success,e):void 0;return s?O.success(s,{id:a,...r,...null==r?void 0:r.success}):O.dismiss(a),e}).catch(e=>{let s=t.error?f(t.error,e):void 0;s?O.error(s,{id:a,...r,...null==r?void 0:r.error}):O.dismiss(a)}),e};var A=1e3,I=h`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,M=h`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,F=h`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,L=b("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${I} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${M} 0.15s ease-out forwards;
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
    animation: ${F} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,P=h`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,z=b("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${P} 1s linear infinite;
`,Y=h`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,R=h`
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
}`,_=b("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Y} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${R} 0.2s ease-out forwards;
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
`,H=b("div")`
  position: absolute;
`,U=b("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,W=h`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,q=b("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${W} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,B=({toast:e})=>{let{icon:t,type:r,iconTheme:a}=e;return void 0!==t?"string"==typeof t?s.createElement(q,null,t):t:"blank"===r?null:s.createElement(U,null,s.createElement(z,{...a}),"loading"!==r&&s.createElement(H,null,"error"===r?s.createElement(L,{...a}):s.createElement(_,{...a})))},K=b("div")`
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
`,J=b("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,V=s.memo(({toast:e,position:t,style:r,children:a})=>{let i=e.height?((e,t)=>{let r=e.includes("top")?1:-1,[a,s]=v()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*r}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*r}%,-1px) scale(.6); opacity:0;}
`];return{animation:t?`${h(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${h(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},o=s.createElement(B,{toast:e}),l=s.createElement(J,{...e.ariaProps},f(e.message,e));return s.createElement(K,{className:e.className,style:{...i,...r,...e.style}},"function"==typeof a?a({icon:o,message:l}):s.createElement(s.Fragment,null,o,l))});a=s.createElement,d.p=void 0,x=a,m=void 0,p=void 0;var Z=({id:e,className:t,style:r,onHeightUpdate:a,children:i})=>{let o=s.useCallback(t=>{if(t){let r=()=>{a(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return s.createElement("div",{ref:o,className:t,style:r},i)},G=g`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,Q=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:a,children:i,toasterId:o,containerStyle:l,containerClassName:n})=>{let{toasts:d,handlers:c}=((e,t="default")=>{let{toasts:r,pausedAt:a}=((e={},t=k)=>{let[r,a]=(0,s.useState)(D[t]||w),i=(0,s.useRef)(D[t]);(0,s.useEffect)(()=>(i.current!==D[t]&&a(D[t]),N.push([t,a]),()=>{let e=N.findIndex(([e])=>e===t);e>-1&&N.splice(e,1)}),[t]);let o=r.toasts.map(t=>{var r,a,s;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||$[t.type],style:{...e.style,...null==(s=e[t.type])?void 0:s.style,...t.style}}});return{...r,toasts:o}})(e,t),i=(0,s.useRef)(new Map).current,o=(0,s.useCallback)((e,t=A)=>{if(i.has(e))return;let r=setTimeout(()=>{i.delete(e),l({type:4,toastId:e})},t);i.set(e,r)},[]);(0,s.useEffect)(()=>{if(a)return;let e=Date.now(),s=r.map(r=>{if(r.duration===1/0)return;let a=(r.duration||0)+r.pauseDuration-(e-r.createdAt);if(a<0){r.visible&&O.dismiss(r.id);return}return setTimeout(()=>O.dismiss(r.id,t),a)});return()=>{s.forEach(e=>e&&clearTimeout(e))}},[r,a,t]);let l=(0,s.useCallback)(C(t),[t]),n=(0,s.useCallback)(()=>{l({type:5,time:Date.now()})},[l]),d=(0,s.useCallback)((e,t)=>{l({type:1,toast:{id:e,height:t}})},[l]),c=(0,s.useCallback)(()=>{a&&l({type:6,time:Date.now()})},[a,l]),u=(0,s.useCallback)((e,t)=>{let{reverseOrder:a=!1,gutter:s=8,defaultPosition:i}=t||{},o=r.filter(t=>(t.position||i)===(e.position||i)&&t.height),l=o.findIndex(t=>t.id===e.id),n=o.filter((e,t)=>t<l&&e.visible).length;return o.filter(e=>e.visible).slice(...a?[n+1]:[0,n]).reduce((e,t)=>e+(t.height||0)+s,0)},[r]);return(0,s.useEffect)(()=>{r.forEach(e=>{if(e.dismissed)o(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[r,o]),{toasts:r,handlers:{updateHeight:d,startPause:n,endPause:c,calculateOffset:u}}})(r,o);return s.createElement("div",{"data-rht-toaster":o||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...l},className:n,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(r=>{let o,l,n=r.position||t,d=c.calculateOffset(r,{reverseOrder:e,gutter:a,defaultPosition:t}),u=(o=n.includes("top"),l=n.includes("center")?{justifyContent:"center"}:n.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:v()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${d*(o?1:-1)}px)`,...o?{top:0}:{bottom:0},...l});return s.createElement(Z,{id:r.id,key:r.id,onHeightUpdate:c.updateHeight,className:r.visible?G:"",style:u},"custom"===r.type?f(r.message,r):i?i(r):s.createElement(V,{toast:r,position:n}))}))};e.s(["Toaster",()=>Q,"default",()=>O],5766)},68577,e=>{"use strict";var t=e.i(43476),r=e.i(92199),a=e.i(22016);function s({onThemeToggle:e,currentTheme:s}){return(0,t.jsx)("header",{className:"sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 shadow-sm",children:(0,t.jsxs)("div",{className:"container mx-auto px-4 py-4 max-w-7xl",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between",children:[(0,t.jsxs)(a.default,{href:"/",className:"flex items-center gap-3 hover:opacity-80 transition-opacity",children:[(0,t.jsx)("div",{className:"text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent",children:"📊"}),(0,t.jsxs)("div",{children:[(0,t.jsx)("h1",{className:"text-2xl font-bold text-gray-900 dark:text-white",children:"Young Money"}),(0,t.jsx)("p",{className:"text-xs text-gray-500 dark:text-gray-400",children:"Trading Journal & Portfolio"})]})]}),(0,t.jsxs)("div",{className:"flex items-center gap-4",children:[(0,t.jsxs)("nav",{className:"hidden md:flex gap-6",children:[(0,t.jsx)(a.default,{href:"/",className:"text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors",children:"Dashboard"}),(0,t.jsx)(a.default,{href:"/analytics",className:"text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors",children:"Analytics"}),(0,t.jsx)(a.default,{href:"/calendar",className:"text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors",children:"Calendar"}),(0,t.jsx)(a.default,{href:"/planning",className:"text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors",children:"Planning"}),(0,t.jsx)(a.default,{href:"/insights",className:"text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors",children:"Insights"}),(0,t.jsx)(a.default,{href:"/review",className:"text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors",children:"Review"})]}),(0,t.jsx)("button",{onClick:e,className:"p-2 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors","aria-label":"Toggle theme",children:"dark"===s?(0,t.jsx)(r.FiSun,{className:"w-5 h-5"}):(0,t.jsx)(r.FiMoon,{className:"w-5 h-5"})})]})]}),(0,t.jsxs)("nav",{className:"md:hidden flex gap-3 mt-4 flex-wrap",children:[(0,t.jsx)(a.default,{href:"/",className:"text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 bg-gray-100 dark:bg-slate-800 px-3 py-1 rounded",children:"Dashboard"}),(0,t.jsx)(a.default,{href:"/analytics",className:"text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 bg-gray-100 dark:bg-slate-800 px-3 py-1 rounded",children:"Analytics"}),(0,t.jsx)(a.default,{href:"/calendar",className:"text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 bg-gray-100 dark:bg-slate-800 px-3 py-1 rounded",children:"Calendar"}),(0,t.jsx)(a.default,{href:"/planning",className:"text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 bg-gray-100 dark:bg-slate-800 px-3 py-1 rounded",children:"Planning"}),(0,t.jsx)(a.default,{href:"/insights",className:"text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 bg-gray-100 dark:bg-slate-800 px-3 py-1 rounded",children:"Insights"}),(0,t.jsx)(a.default,{href:"/review",className:"text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 bg-gray-100 dark:bg-slate-800 px-3 py-1 rounded",children:"Review"})]})]})})}e.s(["default",()=>s])},3510,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(68577),s=e.i(9876),i=e.i(5766);function o(){let{theme:e,toggleTheme:o}=(0,s.useTheme)(),[l,n]=(0,r.useState)(!1),[d,c]=(0,r.useState)([]),[u,g]=(0,r.useState)(new Date),[x,m]=(0,r.useState)(null);(0,r.useEffect)(()=>{n(!0)},[]),(0,r.useEffect)(()=>{l&&(async()=>{try{let e=await fetch("/api/trades",{headers:{"x-user-id":"demo-user"}}),t=await e.json();c(t)}catch(e){console.error("Error fetching trades:",e)}})()},[l]);let p=(0,r.useMemo)(()=>{let e={};return d.forEach(t=>{let r=new Date(t.entryTime).toISOString().split("T")[0];e[r]||(e[r]=[]),e[r].push(t)}),e},[d]),h=Array.from({length:new Date(u.getFullYear(),u.getMonth()+1,0).getDate()},(e,t)=>t+1),b=[...Array.from({length:new Date(u.getFullYear(),u.getMonth(),1).getDay()},(e,t)=>null),...h],f=x&&p[x]||[];return l?(0,t.jsxs)("div",{className:"min-h-screen bg-white dark:bg-slate-950",children:[(0,t.jsx)(a.default,{onThemeToggle:o,currentTheme:e}),(0,t.jsxs)("main",{className:"container mx-auto px-4 py-8 max-w-6xl",children:[(0,t.jsxs)("div",{className:"mb-8",children:[(0,t.jsx)("h1",{className:"text-3xl font-bold text-gray-900 dark:text-white mb-2",children:"Trading Calendar"}),(0,t.jsx)("p",{className:"text-gray-600 dark:text-gray-400",children:"View your trades by day"})]}),(0,t.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-8",children:[(0,t.jsxs)("div",{className:"lg:col-span-2 bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between mb-6",children:[(0,t.jsx)("h2",{className:"text-lg font-bold text-gray-900 dark:text-white",children:u.toLocaleString("default",{month:"long",year:"numeric"})}),(0,t.jsxs)("div",{className:"flex gap-2",children:[(0,t.jsx)("button",{onClick:()=>g(new Date(u.getFullYear(),u.getMonth()-1)),className:"px-3 py-2 rounded-lg bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors",children:"← Prev"}),(0,t.jsx)("button",{onClick:()=>g(new Date),className:"px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors text-sm font-semibold",children:"Today"}),(0,t.jsx)("button",{onClick:()=>g(new Date(u.getFullYear(),u.getMonth()+1)),className:"px-3 py-2 rounded-lg bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors",children:"Next →"})]})]}),(0,t.jsx)("div",{className:"grid grid-cols-7 gap-2 mb-2",children:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(e=>(0,t.jsx)("div",{className:"text-center font-semibold text-gray-700 dark:text-gray-300 text-xs p-2",children:e},e))}),(0,t.jsx)("div",{className:"grid grid-cols-7 gap-2",children:b.map((e,r)=>{let a,s,i;if(null===e)return(0,t.jsx)("div",{className:"aspect-square"},`empty-${r}`);let o=new Date(u.getFullYear(),u.getMonth(),e).toISOString().split("T")[0],l=(s=(a=p[new Date(u.getFullYear(),u.getMonth(),e).toISOString().split("T")[0]]||[]).reduce((e,t)=>e+(t.profitLoss||0),0),i=a.filter(e=>"WIN"===e.outcome).length,{count:a.length,pnl:s,wins:i}),n=x===o;return(0,t.jsxs)("button",{onClick:()=>m(n?null:o),className:`aspect-square p-2 rounded-lg border-2 transition-colors text-xs font-semibold ${n?"bg-blue-600 border-blue-600 text-white dark:bg-blue-700 dark:border-blue-700":l.count>0?l.pnl>=0?"bg-green-100 border-green-300 dark:bg-green-900/30 dark:border-green-700 text-green-900 dark:text-green-100":"bg-red-100 border-red-300 dark:bg-red-900/30 dark:border-red-700 text-red-900 dark:text-red-100":"bg-gray-100 border-gray-300 dark:bg-slate-700 dark:border-slate-600 text-gray-600 dark:text-gray-400"}`,children:[(0,t.jsx)("div",{children:e}),l.count>0&&(0,t.jsxs)("div",{className:"text-[10px]",children:[l.count,"T"]})]},e)})}),(0,t.jsxs)("div",{className:"mt-6 flex flex-wrap gap-4 text-xs",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("div",{className:"w-4 h-4 bg-green-100 dark:bg-green-900/30 rounded border-2 border-green-300 dark:border-green-700"}),(0,t.jsx)("span",{className:"text-gray-700 dark:text-gray-300",children:"Winning Day"})]}),(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("div",{className:"w-4 h-4 bg-red-100 dark:bg-red-900/30 rounded border-2 border-red-300 dark:border-red-700"}),(0,t.jsx)("span",{className:"text-gray-700 dark:text-gray-300",children:"Losing Day"})]}),(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("div",{className:"w-4 h-4 bg-gray-100 dark:bg-slate-700 rounded border-2 border-gray-300 dark:border-slate-600"}),(0,t.jsx)("span",{className:"text-gray-700 dark:text-gray-300",children:"No Trades"})]})]})]}),(0,t.jsxs)("div",{className:"bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700 h-fit",children:[(0,t.jsx)("h2",{className:"text-lg font-bold text-gray-900 dark:text-white mb-4",children:x?new Date(x+"T00:00:00").toLocaleDateString():"Select a date"}),f.length>0?(0,t.jsx)("div",{className:"space-y-3",children:f.map(e=>(0,t.jsxs)("div",{className:"bg-gray-50 dark:bg-slate-700 p-3 rounded-lg",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between mb-1",children:[(0,t.jsx)("span",{className:"font-semibold text-gray-900 dark:text-white text-sm",children:e.pair}),(0,t.jsx)("span",{className:`text-xs font-semibold px-2 py-1 rounded ${"WIN"===e.outcome?"bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400":"bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"}`,children:e.outcome||"Open"})]}),(0,t.jsxs)("div",{className:"flex items-center justify-between text-xs",children:[(0,t.jsx)("span",{className:"text-gray-600 dark:text-gray-400",children:e.direction}),(0,t.jsx)("span",{className:e.profitLoss&&e.profitLoss>=0?"text-green-600 dark:text-green-400":"text-red-600 dark:text-red-400",children:void 0!==e.profitLoss?`${e.profitLoss>=0?"+":""}${e.profitLoss.toFixed(2)}`:"N/A"})]})]},e.id))}):(0,t.jsx)("p",{className:"text-sm text-gray-500 dark:text-gray-400",children:x?"No trades on this date":"Select a date to view trades"})]})]})]}),(0,t.jsx)(i.Toaster,{position:"bottom-right"})]}):(0,t.jsx)("div",{className:"min-h-screen bg-white dark:bg-slate-950"})}e.s(["default",()=>o])}]);