(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,33525,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"warnOnce",{enumerable:!0,get:function(){return n}});let n=e=>{}},5766,e=>{"use strict";let t,r;var n,o=e.i(71645);let a={data:""},i=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,s=/\/\*[^]*?\*\/|  +/g,l=/\n+/g,d=(e,t)=>{let r="",n="",o="";for(let a in e){let i=e[a];"@"==a[0]?"i"==a[1]?r=a+" "+i+";":n+="f"==a[1]?d(i,a):a+"{"+d(i,"k"==a[1]?"":t)+"}":"object"==typeof i?n+=d(i,t?t.replace(/([^,])+/g,e=>a.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):a):null!=i&&(a=/^--/.test(a)?a:a.replace(/[A-Z]/g,"-$&").toLowerCase(),o+=d.p?d.p(a,i):a+":"+i+";")}return r+(t&&o?t+"{"+o+"}":o)+n},u={},c=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+c(e[r]);return t}return e};function p(e){let t,r,n=this||{},o=e.call?e(n.p):e;return((e,t,r,n,o)=>{var a;let p=c(e),f=u[p]||(u[p]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(p));if(!u[f]){let t=p!==e?e:(e=>{let t,r,n=[{}];for(;t=i.exec(e.replace(s,""));)t[4]?n.shift():t[3]?(r=t[3].replace(l," ").trim(),n.unshift(n[0][r]=n[0][r]||{})):n[0][t[1]]=t[2].replace(l," ").trim();return n[0]})(e);u[f]=d(o?{["@keyframes "+f]:t}:t,r?"":"."+f)}let g=r&&u.g?u.g:null;return r&&(u.g=u[f]),a=u[f],g?t.data=t.data.replace(g,a):-1===t.data.indexOf(a)&&(t.data=n?a+t.data:t.data+a),f})(o.unshift?o.raw?(t=[].slice.call(arguments,1),r=n.p,o.reduce((e,n,o)=>{let a=t[o];if(a&&a.call){let e=a(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;a=t?"."+t:e&&"object"==typeof e?e.props?"":d(e,""):!1===e?"":e}return e+n+(null==a?"":a)},"")):o.reduce((e,t)=>Object.assign(e,t&&t.call?t(n.p):t),{}):o,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||a})(n.target),n.g,n.o,n.k)}p.bind({g:1});let f,g,h,m=p.bind({k:1});function b(e,t){let r=this||{};return function(){let n=arguments;function o(a,i){let s=Object.assign({},a),l=s.className||o.className;r.p=Object.assign({theme:g&&g()},s),r.o=/ *go\d+/.test(l),s.className=p.apply(r,n)+(l?" "+l:""),t&&(s.ref=i);let d=e;return e[0]&&(d=s.as||e,delete s.as),h&&d[0]&&h(s),f(d,s)}return t?t(o):o}}var y=(e,t)=>"function"==typeof e?e(t):e,x=(t=0,()=>(++t).toString()),v=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},j="default",w=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:n}=t;return w(e,{type:+!!e.toasts.find(e=>e.id===n.id),toast:n});case 3:let{toastId:o}=t;return{...e,toasts:e.toasts.map(e=>e.id===o||void 0===o?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let a=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+a}))}}},C=[],k={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},P={},S=(e,t=j)=>{P[t]=w(P[t]||k,e),C.forEach(([e,r])=>{e===t&&r(P[t])})},E=e=>Object.keys(P).forEach(t=>S(e,t)),T=(e=j)=>t=>{S(t,e)},O={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},_=e=>(t,r)=>{let n,o=((e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||x()}))(t,e,r);return T(o.toasterId||(n=o.id,Object.keys(P).find(e=>P[e].toasts.some(e=>e.id===n))))({type:2,toast:o}),o.id},M=(e,t)=>_("blank")(e,t);M.error=_("error"),M.success=_("success"),M.loading=_("loading"),M.custom=_("custom"),M.dismiss=(e,t)=>{let r={type:3,toastId:e};t?T(t)(r):E(r)},M.dismissAll=e=>M.dismiss(void 0,e),M.remove=(e,t)=>{let r={type:4,toastId:e};t?T(t)(r):E(r)},M.removeAll=e=>M.remove(void 0,e),M.promise=(e,t,r)=>{let n=M.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let o=t.success?y(t.success,e):void 0;return o?M.success(o,{id:n,...r,...null==r?void 0:r.success}):M.dismiss(n),e}).catch(e=>{let o=t.error?y(t.error,e):void 0;o?M.error(o,{id:n,...r,...null==r?void 0:r.error}):M.dismiss(n)}),e};var I=1e3,R=m`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,$=m`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,N=m`
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

  animation: ${R} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${$} 0.15s ease-out forwards;
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
    animation: ${N} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,A=m`
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
  animation: ${A} 1s linear infinite;
`,F=m`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,D=m`
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
}`,U=b("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${F} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${D} 0.2s ease-out forwards;
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
`,B=b("div")`
  position: absolute;
`,W=b("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,X=m`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,K=b("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${X} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,Y=({toast:e})=>{let{icon:t,type:r,iconTheme:n}=e;return void 0!==t?"string"==typeof t?o.createElement(K,null,t):t:"blank"===r?null:o.createElement(W,null,o.createElement(z,{...n}),"loading"!==r&&o.createElement(B,null,"error"===r?o.createElement(L,{...n}):o.createElement(U,{...n})))},H=b("div")`
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
`,Q=o.memo(({toast:e,position:t,style:r,children:n})=>{let a=e.height?((e,t)=>{let r=e.includes("top")?1:-1,[n,o]=v()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*r}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*r}%,-1px) scale(.6); opacity:0;}
`];return{animation:t?`${m(n)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${m(o)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},i=o.createElement(Y,{toast:e}),s=o.createElement(q,{...e.ariaProps},y(e.message,e));return o.createElement(H,{className:e.className,style:{...a,...r,...e.style}},"function"==typeof n?n({icon:i,message:s}):o.createElement(o.Fragment,null,i,s))});n=o.createElement,d.p=void 0,f=n,g=void 0,h=void 0;var Z=({id:e,className:t,style:r,onHeightUpdate:n,children:a})=>{let i=o.useCallback(t=>{if(t){let r=()=>{n(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,n]);return o.createElement("div",{ref:i,className:t,style:r},a)},G=p`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,J=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:n,children:a,toasterId:i,containerStyle:s,containerClassName:l})=>{let{toasts:d,handlers:u}=((e,t="default")=>{let{toasts:r,pausedAt:n}=((e={},t=j)=>{let[r,n]=(0,o.useState)(P[t]||k),a=(0,o.useRef)(P[t]);(0,o.useEffect)(()=>(a.current!==P[t]&&n(P[t]),C.push([t,n]),()=>{let e=C.findIndex(([e])=>e===t);e>-1&&C.splice(e,1)}),[t]);let i=r.toasts.map(t=>{var r,n,o;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(n=e[t.type])?void 0:n.duration)||(null==e?void 0:e.duration)||O[t.type],style:{...e.style,...null==(o=e[t.type])?void 0:o.style,...t.style}}});return{...r,toasts:i}})(e,t),a=(0,o.useRef)(new Map).current,i=(0,o.useCallback)((e,t=I)=>{if(a.has(e))return;let r=setTimeout(()=>{a.delete(e),s({type:4,toastId:e})},t);a.set(e,r)},[]);(0,o.useEffect)(()=>{if(n)return;let e=Date.now(),o=r.map(r=>{if(r.duration===1/0)return;let n=(r.duration||0)+r.pauseDuration-(e-r.createdAt);if(n<0){r.visible&&M.dismiss(r.id);return}return setTimeout(()=>M.dismiss(r.id,t),n)});return()=>{o.forEach(e=>e&&clearTimeout(e))}},[r,n,t]);let s=(0,o.useCallback)(T(t),[t]),l=(0,o.useCallback)(()=>{s({type:5,time:Date.now()})},[s]),d=(0,o.useCallback)((e,t)=>{s({type:1,toast:{id:e,height:t}})},[s]),u=(0,o.useCallback)(()=>{n&&s({type:6,time:Date.now()})},[n,s]),c=(0,o.useCallback)((e,t)=>{let{reverseOrder:n=!1,gutter:o=8,defaultPosition:a}=t||{},i=r.filter(t=>(t.position||a)===(e.position||a)&&t.height),s=i.findIndex(t=>t.id===e.id),l=i.filter((e,t)=>t<s&&e.visible).length;return i.filter(e=>e.visible).slice(...n?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+o,0)},[r]);return(0,o.useEffect)(()=>{r.forEach(e=>{if(e.dismissed)i(e.id,e.removeDelay);else{let t=a.get(e.id);t&&(clearTimeout(t),a.delete(e.id))}})},[r,i]),{toasts:r,handlers:{updateHeight:d,startPause:l,endPause:u,calculateOffset:c}}})(r,i);return o.createElement("div",{"data-rht-toaster":i||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...s},className:l,onMouseEnter:u.startPause,onMouseLeave:u.endPause},d.map(r=>{let i,s,l=r.position||t,d=u.calculateOffset(r,{reverseOrder:e,gutter:n,defaultPosition:t}),c=(i=l.includes("top"),s=l.includes("center")?{justifyContent:"center"}:l.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:v()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${d*(i?1:-1)}px)`,...i?{top:0}:{bottom:0},...s});return o.createElement(Z,{id:r.id,key:r.id,onHeightUpdate:u.updateHeight,className:r.visible?G:"",style:c},"custom"===r.type?y(r.message,r):a?a(r):o.createElement(Q,{toast:r,position:l}))}))};e.s(["Toaster",()=>J,"default",()=>M],5766)},9876,e=>{"use strict";var t=e.i(43476),r=e.i(71645);let n=(0,r.createContext)(void 0);function o({children:e}){let[o,a]=(0,r.useState)(()=>{try{let e=localStorage.getItem("theme");if(e)return e;return window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}catch(e){return"dark"}}),[i,s]=(0,r.useState)(()=>!0);return(0,r.useEffect)(()=>{if(!i)return;localStorage.setItem("theme",o);let e=document.documentElement;"dark"===o?e.classList.add("dark"):e.classList.remove("dark")},[o,i]),(0,t.jsx)(n.Provider,{value:{theme:o,toggleTheme:()=>{a(e=>"dark"===e?"light":"dark")}},children:e})}function a(){let e=(0,r.useContext)(n);if(!e)throw Error("useTheme must be used within ThemeProvider");return e}e.s(["ThemeProvider",()=>o,"useTheme",()=>a])},67585,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"BailoutToCSR",{enumerable:!0,get:function(){return o}});let n=e.r(32061);function o({reason:e,children:t}){if("undefined"==typeof window)throw Object.defineProperty(new n.BailoutToCSRError(e),"__NEXT_ERROR_CODE",{value:"E394",enumerable:!1,configurable:!0});return t}},9885,(e,t,r)=>{"use strict";function n(e){return e.split("/").map(e=>encodeURIComponent(e)).join("/")}Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"encodeURIPath",{enumerable:!0,get:function(){return n}})},52157,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"PreloadChunks",{enumerable:!0,get:function(){return l}});let n=e.r(43476),o=e.r(74080),a=e.r(63599),i=e.r(9885),s=e.r(43369);function l({moduleIds:e}){if("undefined"!=typeof window)return null;let t=a.workAsyncStorage.getStore();if(void 0===t)return null;let r=[];if(t.reactLoadableManifest&&e){let n=t.reactLoadableManifest;for(let t of e){if(!n[t])continue;let e=n[t].files;r.push(...e)}}if(0===r.length)return null;let l=(0,s.getDeploymentIdQueryOrEmptyString)();return(0,n.jsx)(n.Fragment,{children:r.map(e=>{let r=`${t.assetPrefix}/_next/${(0,i.encodeURIPath)(e)}${l}`;return e.endsWith(".css")?(0,n.jsx)("link",{precedence:"dynamic",href:r,rel:"stylesheet",as:"style",nonce:t.nonce},e):((0,o.preload)(r,{as:"script",fetchPriority:"low",nonce:t.nonce}),null)})})}},69093,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"default",{enumerable:!0,get:function(){return d}});let n=e.r(43476),o=e.r(71645),a=e.r(67585),i=e.r(52157);function s(e){return{default:e&&"default"in e?e.default:e}}let l={loader:()=>Promise.resolve(s(()=>null)),loading:null,ssr:!0},d=function(e){let t={...l,...e},r=(0,o.lazy)(()=>t.loader().then(s)),d=t.loading;function u(e){let s=d?(0,n.jsx)(d,{isLoading:!0,pastDelay:!0,error:null}):null,l=!t.ssr||!!t.loading,u=l?o.Suspense:o.Fragment,c=t.ssr?(0,n.jsxs)(n.Fragment,{children:["undefined"==typeof window?(0,n.jsx)(i.PreloadChunks,{moduleIds:t.modules}):null,(0,n.jsx)(r,{...e})]}):(0,n.jsx)(a.BailoutToCSR,{reason:"next/dynamic",children:(0,n.jsx)(r,{...e})});return(0,n.jsx)(u,{...l?{fallback:s}:{},children:c})}return u.displayName="LoadableComponent",u}},70703,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"default",{enumerable:!0,get:function(){return o}});let n=e.r(55682)._(e.r(69093));function o(e,t){let r={};"function"==typeof e&&(r.loader=e);let o={...r,...t};return(0,n.default)({...o,modules:o.loadableGenerated?.modules})}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},98183,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={assign:function(){return l},searchParamsToUrlQuery:function(){return a},urlQueryToSearchParams:function(){return s}};for(var o in n)Object.defineProperty(r,o,{enumerable:!0,get:n[o]});function a(e){let t={};for(let[r,n]of e.entries()){let e=t[r];void 0===e?t[r]=n:Array.isArray(e)?e.push(n):t[r]=[e,n]}return t}function i(e){return"string"==typeof e?e:("number"!=typeof e||isNaN(e))&&"boolean"!=typeof e?"":String(e)}function s(e){let t=new URLSearchParams;for(let[r,n]of Object.entries(e))if(Array.isArray(n))for(let e of n)t.append(r,i(e));else t.set(r,i(n));return t}function l(e,...t){for(let r of t){for(let t of r.keys())e.delete(t);for(let[t,n]of r.entries())e.append(t,n)}return e}},95057,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={formatUrl:function(){return s},formatWithValidation:function(){return d},urlObjectKeys:function(){return l}};for(var o in n)Object.defineProperty(r,o,{enumerable:!0,get:n[o]});let a=e.r(90809)._(e.r(98183)),i=/https?|ftp|gopher|file/;function s(e){let{auth:t,hostname:r}=e,n=e.protocol||"",o=e.pathname||"",s=e.hash||"",l=e.query||"",d=!1;t=t?encodeURIComponent(t).replace(/%3A/i,":")+"@":"",e.host?d=t+e.host:r&&(d=t+(~r.indexOf(":")?`[${r}]`:r),e.port&&(d+=":"+e.port)),l&&"object"==typeof l&&(l=String(a.urlQueryToSearchParams(l)));let u=e.search||l&&`?${l}`||"";return n&&!n.endsWith(":")&&(n+=":"),e.slashes||(!n||i.test(n))&&!1!==d?(d="//"+(d||""),o&&"/"!==o[0]&&(o="/"+o)):d||(d=""),s&&"#"!==s[0]&&(s="#"+s),u&&"?"!==u[0]&&(u="?"+u),o=o.replace(/[?#]/g,encodeURIComponent),u=u.replace("#","%23"),`${n}${d}${o}${u}${s}`}let l=["auth","hash","host","hostname","href","path","pathname","port","protocol","query","search","slashes"];function d(e){return s(e)}},18581,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"useMergedRef",{enumerable:!0,get:function(){return o}});let n=e.r(71645);function o(e,t){let r=(0,n.useRef)(null),o=(0,n.useRef)(null);return(0,n.useCallback)(n=>{if(null===n){let e=r.current;e&&(r.current=null,e());let t=o.current;t&&(o.current=null,t())}else e&&(r.current=a(e,n)),t&&(o.current=a(t,n))},[e,t])}function a(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let r=e(t);return"function"==typeof r?r:()=>e(null)}}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},18967,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={DecodeError:function(){return b},MiddlewareNotFoundError:function(){return j},MissingStaticPage:function(){return v},NormalizeError:function(){return y},PageNotFoundError:function(){return x},SP:function(){return h},ST:function(){return m},WEB_VITALS:function(){return a},execOnce:function(){return i},getDisplayName:function(){return c},getLocationOrigin:function(){return d},getURL:function(){return u},isAbsoluteUrl:function(){return l},isResSent:function(){return p},loadGetInitialProps:function(){return g},normalizeRepeatedSlashes:function(){return f},stringifyError:function(){return w}};for(var o in n)Object.defineProperty(r,o,{enumerable:!0,get:n[o]});let a=["CLS","FCP","FID","INP","LCP","TTFB"];function i(e){let t,r=!1;return(...n)=>(r||(r=!0,t=e(...n)),t)}let s=/^[a-zA-Z][a-zA-Z\d+\-.]*?:/,l=e=>s.test(e);function d(){let{protocol:e,hostname:t,port:r}=window.location;return`${e}//${t}${r?":"+r:""}`}function u(){let{href:e}=window.location,t=d();return e.substring(t.length)}function c(e){return"string"==typeof e?e:e.displayName||e.name||"Unknown"}function p(e){return e.finished||e.headersSent}function f(e){let t=e.split("?");return t[0].replace(/\\/g,"/").replace(/\/\/+/g,"/")+(t[1]?`?${t.slice(1).join("?")}`:"")}async function g(e,t){let r=t.res||t.ctx&&t.ctx.res;if(!e.getInitialProps)return t.ctx&&t.Component?{pageProps:await g(t.Component,t.ctx)}:{};let n=await e.getInitialProps(t);if(r&&p(r))return n;if(!n)throw Object.defineProperty(Error(`"${c(e)}.getInitialProps()" should resolve to an object. But found "${n}" instead.`),"__NEXT_ERROR_CODE",{value:"E394",enumerable:!1,configurable:!0});return n}let h="undefined"!=typeof performance,m=h&&["mark","measure","getEntriesByName"].every(e=>"function"==typeof performance[e]);class b extends Error{}class y extends Error{}class x extends Error{constructor(e){super(),this.code="ENOENT",this.name="PageNotFoundError",this.message=`Cannot find module for page: ${e}`}}class v extends Error{constructor(e,t){super(),this.message=`Failed to load static file for page: ${e} ${t}`}}class j extends Error{constructor(){super(),this.code="ENOENT",this.message="Cannot find the middleware module"}}function w(e){return JSON.stringify({message:e.message,stack:e.stack})}},73668,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"isLocalURL",{enumerable:!0,get:function(){return a}});let n=e.r(18967),o=e.r(52817);function a(e){if(!(0,n.isAbsoluteUrl)(e))return!0;try{let t=(0,n.getLocationOrigin)(),r=new URL(e,t);return r.origin===t&&(0,o.hasBasePath)(r.pathname)}catch(e){return!1}}},84508,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"errorOnce",{enumerable:!0,get:function(){return n}});let n=e=>{}},22016,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={default:function(){return b},useLinkStatus:function(){return x}};for(var o in n)Object.defineProperty(r,o,{enumerable:!0,get:n[o]});let a=e.r(90809),i=e.r(43476),s=a._(e.r(71645)),l=e.r(95057),d=e.r(8372),u=e.r(18581),c=e.r(18967),p=e.r(5550);e.r(33525);let f=e.r(91949),g=e.r(73668),h=e.r(9396);function m(e){return"string"==typeof e?e:(0,l.formatUrl)(e)}function b(t){var r;let n,o,a,[l,b]=(0,s.useOptimistic)(f.IDLE_LINK_STATUS),x=(0,s.useRef)(null),{href:v,as:j,children:w,prefetch:C=null,passHref:k,replace:P,shallow:S,scroll:E,onClick:T,onMouseEnter:O,onTouchStart:_,legacyBehavior:M=!1,onNavigate:I,ref:R,unstable_dynamicOnHover:$,...N}=t;n=w,M&&("string"==typeof n||"number"==typeof n)&&(n=(0,i.jsx)("a",{children:n}));let L=s.default.useContext(d.AppRouterContext),A=!1!==C,z=!1!==C?null===(r=C)||"auto"===r?h.FetchStrategy.PPR:h.FetchStrategy.Full:h.FetchStrategy.PPR,{href:F,as:D}=s.default.useMemo(()=>{let e=m(v);return{href:e,as:j?m(j):e}},[v,j]);if(M){if(n?.$$typeof===Symbol.for("react.lazy"))throw Object.defineProperty(Error("`<Link legacyBehavior>` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's `<a>` tag."),"__NEXT_ERROR_CODE",{value:"E863",enumerable:!1,configurable:!0});o=s.default.Children.only(n)}let U=M?o&&"object"==typeof o&&o.ref:R,B=s.default.useCallback(e=>(null!==L&&(x.current=(0,f.mountLinkInstance)(e,F,L,z,A,b)),()=>{x.current&&((0,f.unmountLinkForCurrentNavigation)(x.current),x.current=null),(0,f.unmountPrefetchableInstance)(e)}),[A,F,L,z,b]),W={ref:(0,u.useMergedRef)(B,U),onClick(t){M||"function"!=typeof T||T(t),M&&o.props&&"function"==typeof o.props.onClick&&o.props.onClick(t),!L||t.defaultPrevented||function(t,r,n,o,a,i,l){if("undefined"!=typeof window){let d,{nodeName:u}=t.currentTarget;if("A"===u.toUpperCase()&&((d=t.currentTarget.getAttribute("target"))&&"_self"!==d||t.metaKey||t.ctrlKey||t.shiftKey||t.altKey||t.nativeEvent&&2===t.nativeEvent.which)||t.currentTarget.hasAttribute("download"))return;if(!(0,g.isLocalURL)(r)){a&&(t.preventDefault(),location.replace(r));return}if(t.preventDefault(),l){let e=!1;if(l({preventDefault:()=>{e=!0}}),e)return}let{dispatchNavigateAction:c}=e.r(99781);s.default.startTransition(()=>{c(n||r,a?"replace":"push",i??!0,o.current)})}}(t,F,D,x,P,E,I)},onMouseEnter(e){M||"function"!=typeof O||O(e),M&&o.props&&"function"==typeof o.props.onMouseEnter&&o.props.onMouseEnter(e),L&&A&&(0,f.onNavigationIntent)(e.currentTarget,!0===$)},onTouchStart:function(e){M||"function"!=typeof _||_(e),M&&o.props&&"function"==typeof o.props.onTouchStart&&o.props.onTouchStart(e),L&&A&&(0,f.onNavigationIntent)(e.currentTarget,!0===$)}};return(0,c.isAbsoluteUrl)(D)?W.href=D:M&&!k&&("a"!==o.type||"href"in o.props)||(W.href=(0,p.addBasePath)(D)),a=M?s.default.cloneElement(o,W):(0,i.jsx)("a",{...N,...W,children:n}),(0,i.jsx)(y.Provider,{value:l,children:a})}e.r(84508);let y=(0,s.createContext)(f.IDLE_LINK_STATUS),x=()=>(0,s.useContext)(y);("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},18566,(e,t,r)=>{t.exports=e.r(76562)},49830,e=>{"use strict";var t=e.i(43476),r=e.i(71645),n=e.i(92199),o=e.i(9876),a=e.i(51013);function i(){let[e,i]=(0,r.useState)(!1),{theme:s,toggleTheme:l}=(0,o.useTheme)();return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("header",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 16px",borderBottom:"1px solid var(--card-border)",backgroundColor:"transparent",minHeight:"56px",position:"sticky",top:0,zIndex:100},role:"banner",children:[(0,t.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[(0,t.jsx)("h1",{style:{fontSize:"18px",fontWeight:"700",color:"var(--foreground)",margin:0},children:"Young Money FX"}),(0,t.jsx)("span",{style:{fontSize:"13px",color:"var(--neutral-color)"},children:"Trading Journal"})]}),(0,t.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,t.jsx)("button",{style:{display:"flex",alignItems:"center",justifyContent:"center",width:"36px",height:"36px",borderRadius:"8px",border:"1px solid var(--card-border)",backgroundColor:"transparent",color:"var(--foreground)",cursor:"pointer",transition:"all 0.2s ease"},onMouseEnter:e=>{e.currentTarget.style.borderColor="rgba(139,92,246,0.12)",e.currentTarget.style.boxShadow="0 6px 18px rgba(139,92,246,0.06)"},onMouseLeave:e=>{e.currentTarget.style.borderColor="var(--card-border)",e.currentTarget.style.boxShadow="none"},"aria-label":"Notifications",children:(0,t.jsx)(n.FiBell,{size:16})}),(0,t.jsx)("button",{style:{display:"flex",alignItems:"center",justifyContent:"center",width:"36px",height:"36px",borderRadius:"8px",border:"1px solid var(--card-border)",backgroundColor:"transparent",color:"var(--foreground)",cursor:"pointer",transition:"all 0.2s ease"},onMouseEnter:e=>{e.currentTarget.style.borderColor="rgba(139,92,246,0.12)",e.currentTarget.style.boxShadow="0 6px 18px rgba(139,92,246,0.06)"},onMouseLeave:e=>{e.currentTarget.style.borderColor="var(--card-border)",e.currentTarget.style.boxShadow="none"},"aria-label":"Settings",children:(0,t.jsx)(n.FiSettings,{size:16})}),(0,t.jsx)("button",{onClick:l,style:{display:"flex",alignItems:"center",justifyContent:"center",width:"36px",height:"36px",borderRadius:"8px",border:"1px solid var(--card-border)",backgroundColor:"transparent",color:"var(--foreground)",cursor:"pointer",transition:"all 0.2s ease"},onMouseEnter:e=>{e.currentTarget.style.borderColor="rgba(139,92,246,0.12)",e.currentTarget.style.boxShadow="0 6px 18px rgba(139,92,246,0.06)"},onMouseLeave:e=>{e.currentTarget.style.borderColor="var(--card-border)",e.currentTarget.style.boxShadow="none"},"aria-label":`Switch to ${"dark"===s?"light":"dark"} mode`,children:"dark"===s?(0,t.jsx)(n.FiSun,{size:16}):(0,t.jsx)(n.FiMoon,{size:16})}),(0,t.jsx)("button",{onClick:()=>i(!0),style:{background:"linear-gradient(135deg, var(--purple-base) 0%, var(--purple-dark) 100%)",color:"white",padding:"8px 16px",borderRadius:"8px",border:"none",cursor:"pointer",fontWeight:"600",fontSize:"13px",transition:"all 0.2s ease",whiteSpace:"nowrap"},onMouseEnter:e=>{e.currentTarget.style.transform="translateY(-2px)",e.currentTarget.style.boxShadow="0 8px 20px rgba(139, 92, 246, 0.4)"},onMouseLeave:e=>{e.currentTarget.style.transform="translateY(0)",e.currentTarget.style.boxShadow="none"},children:"+ Add Trade"})]})]}),e&&(0,t.jsx)(a.default,{onClose:()=>i(!1),onTradeAdded:()=>i(!1)})]})}var s=e.i(22016),l=e.i(18566);let d=[{href:"/",label:"Dashboard",icon:n.FiHome},{href:"/analytics",label:"Analytics",icon:n.FiBarChart2},{href:"/calendar",label:"Calendar",icon:n.FiCalendar},{href:"/planning",label:"Planning",icon:n.FiCheckSquare},{href:"/insights",label:"Insights",icon:n.FiZap},{href:"/review",label:"Review",icon:n.FiBookOpen}];function u(){let e=(0,l.usePathname)(),[o,a]=(0,r.useState)(!1);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("aside",{style:{flexDirection:"column",gap:"10px",width:"64px",padding:"10px",height:"100vh",position:"sticky",top:0,backgroundColor:"var(--background)",borderRight:"1px solid var(--panel-muted)"},className:"hidden md:flex",role:"navigation","aria-label":"Main navigation",children:[(0,t.jsx)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",height:"48px",marginBottom:"8px"},children:(0,t.jsx)("div",{style:{width:"40px",height:"40px",borderRadius:"10px",display:"flex",alignItems:"center",justifyContent:"center",background:"linear-gradient(135deg, var(--purple-base) 0%, var(--purple-dark) 100%)",color:"white",fontWeight:"700",fontSize:"14px",boxShadow:"var(--shadow-floating)"},children:"YM"})}),(0,t.jsx)("nav",{style:{display:"flex",flexDirection:"column",gap:"10px",alignItems:"center",flex:1},children:d.map(r=>{let n=r.icon,o=e===r.href;return(0,t.jsxs)(s.default,{href:r.href,title:r.label,"aria-current":o?"page":void 0,style:{width:"44px",height:"44px",borderRadius:"10px",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s ease",background:o?"linear-gradient(135deg, var(--purple-base) 0%, rgba(139,92,246,0.12) 100%)":"transparent",color:o?"white":"var(--neutral-color)",border:o?"none":"1px solid var(--card-border)",boxShadow:o?"0 6px 18px rgba(139, 92, 246, 0.12)":"none",cursor:"pointer",position:"relative",overflow:"visible"},onMouseEnter:e=>{o||(e.currentTarget.style.borderColor="rgba(139,92,246,0.12)",e.currentTarget.style.boxShadow="0 6px 18px rgba(139,92,246,0.06)")},onMouseLeave:e=>{o||(e.currentTarget.style.borderColor="var(--card-border)",e.currentTarget.style.boxShadow="none")},children:[o&&(0,t.jsx)("span",{style:{position:"absolute",left:"-8px",width:"4px",height:"24px",borderRadius:"4px",background:"linear-gradient(180deg, var(--purple-base), var(--purple-dark))"},"aria-hidden":!0}),(0,t.jsx)(n,{style:{width:"18px",height:"18px"}})]},r.href)})}),(0,t.jsx)("div",{style:{marginTop:"auto",fontSize:"12px",color:"var(--neutral-color)",textAlign:"center",paddingBottom:"8px"},children:"v0.1"})]}),(0,t.jsx)("button",{className:"md:hidden",onClick:()=>a(!o),style:{position:"fixed",bottom:"20px",left:"20px",zIndex:40,width:"48px",height:"48px",borderRadius:"12px",backgroundColor:"var(--purple-base)",border:"none",color:"white",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"var(--shadow-floating)"},"aria-label":o?"Close navigation":"Open navigation",children:o?(0,t.jsx)(n.FiX,{size:24}):(0,t.jsx)(n.FiMenu,{size:24})}),o&&(0,t.jsx)("div",{style:{position:"fixed",top:0,left:0,width:"100%",height:"100%",backgroundColor:"rgba(0, 0, 0, 0.5)",zIndex:30},onClick:()=>a(!1)}),(0,t.jsxs)("aside",{style:{position:"fixed",left:0,top:0,width:"280px",height:"100%",backgroundColor:"var(--background)",borderRight:"1px solid var(--panel-muted)",transform:o?"translateX(0)":"translateX(-100%)",transition:"transform 0.3s ease",zIndex:35,padding:"20px",overflowY:"auto"},role:"navigation","aria-label":"Mobile navigation","aria-hidden":!o,children:[(0,t.jsx)("div",{style:{marginBottom:"30px"},children:(0,t.jsx)("div",{style:{width:"40px",height:"40px",borderRadius:"10px",display:"flex",alignItems:"center",justifyContent:"center",background:"linear-gradient(135deg, var(--purple-base) 0%, var(--purple-dark) 100%)",color:"white",fontWeight:"700",fontSize:"14px"},children:"YM"})}),(0,t.jsx)("nav",{style:{display:"flex",flexDirection:"column",gap:"12px"},children:d.map(r=>{let n=r.icon,o=e===r.href;return(0,t.jsxs)(s.default,{href:r.href,onClick:()=>a(!1),"aria-current":o?"page":void 0,style:{display:"flex",alignItems:"center",gap:"12px",padding:"12px 16px",borderRadius:"10px",backgroundColor:o?"linear-gradient(135deg, var(--purple-base) 0%, rgba(139,92,246,0.12) 100%)":"transparent",color:o?"white":"var(--neutral-color)",border:o?"none":"1px solid var(--card-border)",textDecoration:"none",transition:"all 0.2s ease",cursor:"pointer"},children:[(0,t.jsx)(n,{style:{width:"20px",height:"20px"}}),(0,t.jsx)("span",{style:{fontSize:"16px",fontWeight:"500"},children:r.label})]},r.href)})}),(0,t.jsx)("div",{style:{marginTop:"auto",paddingTop:"30px",borderTop:"1px solid var(--card-border)",fontSize:"12px",color:"var(--neutral-color)",textAlign:"center"},children:"Young Money FX v0.1"})]})]})}var c=e.i(70703),p=e.i(5766);function f({children:n}){let{theme:a}=(0,o.useTheme)(),[s,l]=(0,r.useState)(!1),d=(0,c.default)(()=>e.A(76728),{loadableGenerated:{modules:[22179]},ssr:!1});return((0,r.useEffect)(()=>{l(!0)},[]),s)?(0,t.jsxs)("div",{style:{display:"flex",minHeight:"100vh",backgroundColor:"var(--background)",color:"var(--foreground)"},children:[(0,t.jsx)("a",{href:"#main-content",className:"sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-indigo-600 text-white px-3 py-1 rounded z-50","aria-label":"Skip to main content",children:"Skip to content"}),(0,t.jsx)(u,{}),(0,t.jsxs)("div",{style:{display:"flex",flexDirection:"column",flex:1,overflow:"hidden",width:"100%"},children:[(0,t.jsx)(i,{}),(0,t.jsx)("main",{id:"main-content",style:{flex:1,overflowY:"auto",overflowX:"hidden",padding:"20px",maxWidth:"1400px",margin:"0 auto",width:"100%"},role:"main",children:n}),(0,t.jsx)(d,{})]}),(0,t.jsx)(p.Toaster,{position:"bottom-right",reverseOrder:!1,gutter:8,toastOptions:{duration:4e3,style:{background:"var(--card-bg)",color:"var(--foreground)",border:"1px solid var(--card-border)",borderRadius:"8px"}}})]}):null}e.s(["default",()=>f],49830)},76728,e=>{e.v(t=>Promise.all(["static/chunks/181122853c8efd89.js"].map(t=>e.l(t))).then(()=>t(22179)))}]);