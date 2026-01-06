(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,5766,e=>{"use strict";let t,r;var a,s=e.i(71645);let i={data:""},o=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,l=/\/\*[^]*?\*\/|  +/g,n=/\n+/g,d=(e,t)=>{let r="",a="",s="";for(let i in e){let o=e[i];"@"==i[0]?"i"==i[1]?r=i+" "+o+";":a+="f"==i[1]?d(o,i):i+"{"+d(o,"k"==i[1]?"":t)+"}":"object"==typeof o?a+=d(o,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=o&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=d.p?d.p(i,o):i+":"+o+";")}return r+(t&&s?t+"{"+s+"}":s)+a},c={},u=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+u(e[r]);return t}return e};function m(e){let t,r,a=this||{},s=e.call?e(a.p):e;return((e,t,r,a,s)=>{var i;let m=u(e),g=c[m]||(c[m]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(m));if(!c[g]){let t=m!==e?e:(e=>{let t,r,a=[{}];for(;t=o.exec(e.replace(l,""));)t[4]?a.shift():t[3]?(r=t[3].replace(n," ").trim(),a.unshift(a[0][r]=a[0][r]||{})):a[0][t[1]]=t[2].replace(n," ").trim();return a[0]})(e);c[g]=d(s?{["@keyframes "+g]:t}:t,r?"":"."+g)}let p=r&&c.g?c.g:null;return r&&(c.g=c[g]),i=c[g],p?t.data=t.data.replace(p,i):-1===t.data.indexOf(i)&&(t.data=a?i+t.data:t.data+i),g})(s.unshift?s.raw?(t=[].slice.call(arguments,1),r=a.p,s.reduce((e,a,s)=>{let i=t[s];if(i&&i.call){let e=i(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":d(e,""):!1===e?"":e}return e+a+(null==i?"":i)},"")):s.reduce((e,t)=>Object.assign(e,t&&t.call?t(a.p):t),{}):s,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||i})(a.target),a.g,a.o,a.k)}m.bind({g:1});let g,p,x,h=m.bind({k:1});function f(e,t){let r=this||{};return function(){let a=arguments;function s(i,o){let l=Object.assign({},i),n=l.className||s.className;r.p=Object.assign({theme:p&&p()},l),r.o=/ *go\d+/.test(n),l.className=m.apply(r,a)+(n?" "+n:""),t&&(l.ref=o);let d=e;return e[0]&&(d=l.as||e,delete l.as),x&&d[0]&&x(l),g(d,l)}return t?t(s):s}}var b=(e,t)=>"function"==typeof e?e(t):e,y=(t=0,()=>(++t).toString()),v=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},k="default",w=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:a}=t;return w(e,{type:+!!e.toasts.find(e=>e.id===a.id),toast:a});case 3:let{toastId:s}=t;return{...e,toasts:e.toasts.map(e=>e.id===s||void 0===s?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},j=[],N={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},$={},E=(e,t=k)=>{$[t]=w($[t]||N,e),j.forEach(([e,r])=>{e===t&&r($[t])})},T=e=>Object.keys($).forEach(t=>E(e,t)),O=(e=k)=>t=>{E(t,e)},C={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},I=e=>(t,r)=>{let a,s=((e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||y()}))(t,e,r);return O(s.toasterId||(a=s.id,Object.keys($).find(e=>$[e].toasts.some(e=>e.id===a))))({type:2,toast:s}),s.id},S=(e,t)=>I("blank")(e,t);S.error=I("error"),S.success=I("success"),S.loading=I("loading"),S.custom=I("custom"),S.dismiss=(e,t)=>{let r={type:3,toastId:e};t?O(t)(r):T(r)},S.dismissAll=e=>S.dismiss(void 0,e),S.remove=(e,t)=>{let r={type:4,toastId:e};t?O(t)(r):T(r)},S.removeAll=e=>S.remove(void 0,e),S.promise=(e,t,r)=>{let a=S.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let s=t.success?b(t.success,e):void 0;return s?S.success(s,{id:a,...r,...null==r?void 0:r.success}):S.dismiss(a),e}).catch(e=>{let s=t.error?b(t.error,e):void 0;s?S.error(s,{id:a,...r,...null==r?void 0:r.error}):S.dismiss(a)}),e};var A=1e3,D=h`
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
}`,M=h`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,P=f("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${D} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
    animation: ${M} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,L=h`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,z=f("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${L} 1s linear infinite;
`,R=h`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,W=h`
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
}`,H=f("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${R} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${W} 0.2s ease-out forwards;
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
`,Y=f("div")`
  position: absolute;
`,_=f("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,U=h`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Q=f("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${U} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,B=({toast:e})=>{let{icon:t,type:r,iconTheme:a}=e;return void 0!==t?"string"==typeof t?s.createElement(Q,null,t):t:"blank"===r?null:s.createElement(_,null,s.createElement(z,{...a}),"loading"!==r&&s.createElement(Y,null,"error"===r?s.createElement(P,{...a}):s.createElement(H,{...a})))},G=f("div")`
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
`];return{animation:t?`${h(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${h(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},o=s.createElement(B,{toast:e}),l=s.createElement(J,{...e.ariaProps},b(e.message,e));return s.createElement(G,{className:e.className,style:{...i,...r,...e.style}},"function"==typeof a?a({icon:o,message:l}):s.createElement(s.Fragment,null,o,l))});a=s.createElement,d.p=void 0,g=a,p=void 0,x=void 0;var Z=({id:e,className:t,style:r,onHeightUpdate:a,children:i})=>{let o=s.useCallback(t=>{if(t){let r=()=>{a(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return s.createElement("div",{ref:o,className:t,style:r},i)},q=m`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,V=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:a,children:i,toasterId:o,containerStyle:l,containerClassName:n})=>{let{toasts:d,handlers:c}=((e,t="default")=>{let{toasts:r,pausedAt:a}=((e={},t=k)=>{let[r,a]=(0,s.useState)($[t]||N),i=(0,s.useRef)($[t]);(0,s.useEffect)(()=>(i.current!==$[t]&&a($[t]),j.push([t,a]),()=>{let e=j.findIndex(([e])=>e===t);e>-1&&j.splice(e,1)}),[t]);let o=r.toasts.map(t=>{var r,a,s;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||C[t.type],style:{...e.style,...null==(s=e[t.type])?void 0:s.style,...t.style}}});return{...r,toasts:o}})(e,t),i=(0,s.useRef)(new Map).current,o=(0,s.useCallback)((e,t=A)=>{if(i.has(e))return;let r=setTimeout(()=>{i.delete(e),l({type:4,toastId:e})},t);i.set(e,r)},[]);(0,s.useEffect)(()=>{if(a)return;let e=Date.now(),s=r.map(r=>{if(r.duration===1/0)return;let a=(r.duration||0)+r.pauseDuration-(e-r.createdAt);if(a<0){r.visible&&S.dismiss(r.id);return}return setTimeout(()=>S.dismiss(r.id,t),a)});return()=>{s.forEach(e=>e&&clearTimeout(e))}},[r,a,t]);let l=(0,s.useCallback)(O(t),[t]),n=(0,s.useCallback)(()=>{l({type:5,time:Date.now()})},[l]),d=(0,s.useCallback)((e,t)=>{l({type:1,toast:{id:e,height:t}})},[l]),c=(0,s.useCallback)(()=>{a&&l({type:6,time:Date.now()})},[a,l]),u=(0,s.useCallback)((e,t)=>{let{reverseOrder:a=!1,gutter:s=8,defaultPosition:i}=t||{},o=r.filter(t=>(t.position||i)===(e.position||i)&&t.height),l=o.findIndex(t=>t.id===e.id),n=o.filter((e,t)=>t<l&&e.visible).length;return o.filter(e=>e.visible).slice(...a?[n+1]:[0,n]).reduce((e,t)=>e+(t.height||0)+s,0)},[r]);return(0,s.useEffect)(()=>{r.forEach(e=>{if(e.dismissed)o(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[r,o]),{toasts:r,handlers:{updateHeight:d,startPause:n,endPause:c,calculateOffset:u}}})(r,o);return s.createElement("div",{"data-rht-toaster":o||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...l},className:n,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(r=>{let o,l,n=r.position||t,d=c.calculateOffset(r,{reverseOrder:e,gutter:a,defaultPosition:t}),u=(o=n.includes("top"),l=n.includes("center")?{justifyContent:"center"}:n.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:v()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${d*(o?1:-1)}px)`,...o?{top:0}:{bottom:0},...l});return s.createElement(Z,{id:r.id,key:r.id,onHeightUpdate:c.updateHeight,className:r.visible?q:"",style:u},"custom"===r.type?b(r.message,r):i?i(r):s.createElement(K,{toast:r,position:n}))}))};e.s(["Toaster",()=>V,"default",()=>S],5766)},68577,e=>{"use strict";var t=e.i(43476),r=e.i(92199),a=e.i(22016);function s({onThemeToggle:e,currentTheme:s}){return(0,t.jsx)("header",{className:"sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 shadow-sm",children:(0,t.jsxs)("div",{className:"container mx-auto px-4 py-4 max-w-7xl",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between",children:[(0,t.jsxs)(a.default,{href:"/",className:"flex items-center gap-3 hover:opacity-80 transition-opacity",children:[(0,t.jsx)("div",{className:"text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent",children:"📊"}),(0,t.jsxs)("div",{children:[(0,t.jsx)("h1",{className:"text-2xl font-bold text-gray-900 dark:text-white",children:"Young Money"}),(0,t.jsx)("p",{className:"text-xs text-gray-500 dark:text-gray-400",children:"Trading Journal & Portfolio"})]})]}),(0,t.jsxs)("div",{className:"flex items-center gap-4",children:[(0,t.jsxs)("nav",{className:"hidden md:flex gap-6",children:[(0,t.jsx)(a.default,{href:"/",className:"text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors",children:"Dashboard"}),(0,t.jsx)(a.default,{href:"/analytics",className:"text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors",children:"Analytics"}),(0,t.jsx)(a.default,{href:"/calendar",className:"text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors",children:"Calendar"}),(0,t.jsx)(a.default,{href:"/planning",className:"text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors",children:"Planning"}),(0,t.jsx)(a.default,{href:"/insights",className:"text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors",children:"Insights"}),(0,t.jsx)(a.default,{href:"/review",className:"text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors",children:"Review"})]}),(0,t.jsx)("button",{onClick:e,className:"p-2 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors","aria-label":"Toggle theme",children:"dark"===s?(0,t.jsx)(r.FiSun,{className:"w-5 h-5"}):(0,t.jsx)(r.FiMoon,{className:"w-5 h-5"})})]})]}),(0,t.jsxs)("nav",{className:"md:hidden flex gap-3 mt-4 flex-wrap",children:[(0,t.jsx)(a.default,{href:"/",className:"text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 bg-gray-100 dark:bg-slate-800 px-3 py-1 rounded",children:"Dashboard"}),(0,t.jsx)(a.default,{href:"/analytics",className:"text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 bg-gray-100 dark:bg-slate-800 px-3 py-1 rounded",children:"Analytics"}),(0,t.jsx)(a.default,{href:"/calendar",className:"text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 bg-gray-100 dark:bg-slate-800 px-3 py-1 rounded",children:"Calendar"}),(0,t.jsx)(a.default,{href:"/planning",className:"text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 bg-gray-100 dark:bg-slate-800 px-3 py-1 rounded",children:"Planning"}),(0,t.jsx)(a.default,{href:"/insights",className:"text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 bg-gray-100 dark:bg-slate-800 px-3 py-1 rounded",children:"Insights"}),(0,t.jsx)(a.default,{href:"/review",className:"text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 bg-gray-100 dark:bg-slate-800 px-3 py-1 rounded",children:"Review"})]})]})})}e.s(["default",()=>s])},51720,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(68577),s=e.i(9876),i=e.i(5766),o=e.i(92199);function l(){let{theme:e,toggleTheme:l}=(0,s.useTheme)(),[n,d]=(0,r.useState)(!1),[c,u]=(0,r.useState)([]),[m,g]=(0,r.useState)([]);return((0,r.useEffect)(()=>{d(!0)},[]),(0,r.useEffect)(()=>{n&&(async()=>{try{let e=await fetch("/api/trades",{headers:{"x-user-id":"demo-user"}}),t=await e.json();u(t)}catch(e){console.error("Error fetching trades:",e)}})()},[n]),(0,r.useEffect)(()=>{if(0===c.length)return;let e=[],t={};c.forEach(e=>{t[e.pair]||(t[e.pair]={wins:0,losses:0,pnl:0}),"WIN"===e.outcome&&t[e.pair].wins++,"LOSS"===e.outcome&&t[e.pair].losses++,t[e.pair].pnl+=e.profitLoss||0});let r=Object.entries(t).sort((e,t)=>t[1].wins-e[1].wins)[0];r&&e.push({type:"strength",title:`${r[0]} is your best pair`,description:`You have a ${Math.round(r[1].wins/(r[1].wins+r[1].losses)*100)}% win rate on ${r[0]}. Consider trading it more often.`,icon:o.FiTrendingUp,color:"text-green-600 dark:text-green-400"});let a=c.filter(e=>e.emotionalState);if(a.length>0){let t={};a.forEach(e=>{t[e.emotionalState||""]||(t[e.emotionalState||""]={wins:0,losses:0}),"WIN"===e.outcome?t[e.emotionalState||""].wins++:t[e.emotionalState||""].losses++});let r=Object.entries(t).sort((e,t)=>t[1].wins-e[1].wins)[0];r&&e.push({type:"pattern",title:`You trade best when ${r[0]}`,description:`${r[1].wins} wins when ${r[0]} vs ${r[1].losses} losses. Remember this state for future trades.`,icon:o.FiZap,color:"text-blue-600 dark:text-blue-400"})}let s=c.filter(e=>"LONG"===e.direction),i=c.filter(e=>"SHORT"===e.direction),l=s.length>0?s.filter(e=>"WIN"===e.outcome).length/s.length*100:0,n=i.length>0?i.filter(e=>"WIN"===e.outcome).length/i.length*100:0;l>n&&l>40&&e.push({type:"improvement",title:"You are better at LONG trades",description:`Long win rate: ${Math.round(l)}% vs Short: ${Math.round(n)}%. Focus more on long setups.`,icon:o.FiTarget,color:"text-green-600 dark:text-green-400"});let d=c.filter(e=>e.mistakes).flatMap(e=>{try{return e.mistakes?JSON.parse(e.mistakes):[]}catch{return[]}});if(d.length>0){let t={};d.forEach(e=>{t[e]=(t[e]||0)+1});let r=Object.entries(t).sort((e,t)=>t[1]-e[1])[0];r&&r[1]>1&&e.push({type:"warning",title:`Repeated mistake: ${r[0]}`,description:`You've made this mistake ${r[1]} times. Create a checklist to prevent this.`,icon:o.FiAlertCircle,color:"text-orange-600 dark:text-orange-400"})}let u=c.filter(e=>{let t=new Date(e.entryTime).getHours();return t>=8&&t<12});if(u.length>5){let t=u.filter(e=>"WIN"===e.outcome).length/u.length*100;t>60&&e.push({type:"pattern",title:"You trade best in the morning",description:`Morning (8am-12pm) win rate: ${Math.round(t)}%. Schedule more trades during this time.`,icon:o.FiTrendingUp,color:"text-yellow-600 dark:text-yellow-400"})}g(e)},[c]),n)?(0,t.jsxs)("div",{className:"min-h-screen bg-white dark:bg-slate-950",children:[(0,t.jsx)(a.default,{onThemeToggle:l,currentTheme:e}),(0,t.jsxs)("main",{className:"container mx-auto px-4 py-8 max-w-4xl",children:[(0,t.jsxs)("div",{className:"mb-8",children:[(0,t.jsx)("h1",{className:"text-3xl font-bold text-gray-900 dark:text-white mb-2",children:"AI-Powered Insights"}),(0,t.jsx)("p",{className:"text-gray-600 dark:text-gray-400",children:"Get personalized trading improvements based on your data"})]}),m.length>0?(0,t.jsx)("div",{className:"space-y-4",children:m.map((e,r)=>{let a=e.icon,s="warning"===e.type?"bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-700":"strength"===e.type?"bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700":"improvement"===e.type?"bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700":"bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-700";return(0,t.jsx)("div",{className:`${s} border rounded-lg p-6`,children:(0,t.jsxs)("div",{className:"flex items-start gap-4",children:[(0,t.jsx)("div",{className:`p-3 rounded-lg ${e.color} bg-white dark:bg-slate-800`,children:(0,t.jsx)(a,{className:"w-6 h-6"})}),(0,t.jsxs)("div",{className:"flex-1",children:[(0,t.jsx)("h3",{className:"text-lg font-bold text-gray-900 dark:text-white mb-1",children:e.title}),(0,t.jsx)("p",{className:"text-gray-700 dark:text-gray-300",children:e.description})]})]})},r)})}):(0,t.jsxs)("div",{className:"bg-white dark:bg-slate-800 rounded-lg p-12 text-center border border-gray-200 dark:border-slate-700",children:[(0,t.jsx)("p",{className:"text-gray-600 dark:text-gray-400 mb-2",children:"Add more trades to get AI-powered insights"}),(0,t.jsx)("p",{className:"text-sm text-gray-500 dark:text-gray-500",children:"The more data you have, the better insights we can provide"})]}),c.length>0&&(0,t.jsxs)("div",{className:"mt-8 bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700",children:[(0,t.jsx)("h2",{className:"text-lg font-bold text-gray-900 dark:text-white mb-4",children:"This Week's Summary"}),(0,t.jsxs)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-4",children:[(0,t.jsxs)("div",{className:"bg-gray-50 dark:bg-slate-700 p-4 rounded-lg",children:[(0,t.jsx)("p",{className:"text-xs text-gray-600 dark:text-gray-400 mb-1",children:"Total Trades"}),(0,t.jsx)("p",{className:"text-2xl font-bold text-gray-900 dark:text-white",children:c.length})]}),(0,t.jsxs)("div",{className:"bg-gray-50 dark:bg-slate-700 p-4 rounded-lg",children:[(0,t.jsx)("p",{className:"text-xs text-gray-600 dark:text-gray-400 mb-1",children:"Win Rate"}),(0,t.jsxs)("p",{className:"text-2xl font-bold text-green-600 dark:text-green-400",children:[c.length>0?Math.round(c.filter(e=>"WIN"===e.outcome).length/c.length*100):0,"%"]})]}),(0,t.jsxs)("div",{className:"bg-gray-50 dark:bg-slate-700 p-4 rounded-lg",children:[(0,t.jsx)("p",{className:"text-xs text-gray-600 dark:text-gray-400 mb-1",children:"Total P&L"}),(0,t.jsx)("p",{className:`text-2xl font-bold ${c.reduce((e,t)=>e+(t.profitLoss||0),0)>=0?"text-green-600 dark:text-green-400":"text-red-600 dark:text-red-400"}`,children:(c.reduce((e,t)=>e+(t.profitLoss||0),0)||0).toFixed(2)})]}),(0,t.jsxs)("div",{className:"bg-gray-50 dark:bg-slate-700 p-4 rounded-lg",children:[(0,t.jsx)("p",{className:"text-xs text-gray-600 dark:text-gray-400 mb-1",children:"Avg Quality"}),(0,t.jsx)("p",{className:"text-2xl font-bold text-yellow-600 dark:text-yellow-400",children:c.filter(e=>e.setupQuality).length>0?(c.filter(e=>e.setupQuality).reduce((e,t)=>e+(t.setupQuality||0),0)/c.filter(e=>e.setupQuality).length).toFixed(1):"N/A"})]})]})]})]}),(0,t.jsx)(i.Toaster,{position:"bottom-right"})]}):(0,t.jsx)("div",{className:"min-h-screen bg-white dark:bg-slate-950"})}e.s(["default",()=>l])}]);