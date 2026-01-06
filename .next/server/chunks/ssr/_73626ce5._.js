module.exports=[6704,a=>{"use strict";let b,c;var d,e=a.i(72131);let f={data:""},g=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,h=/\/\*[^]*?\*\/|  +/g,i=/\n+/g,j=(a,b)=>{let c="",d="",e="";for(let f in a){let g=a[f];"@"==f[0]?"i"==f[1]?c=f+" "+g+";":d+="f"==f[1]?j(g,f):f+"{"+j(g,"k"==f[1]?"":b)+"}":"object"==typeof g?d+=j(g,b?b.replace(/([^,])+/g,a=>f.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,b=>/&/.test(b)?b.replace(/&/g,a):a?a+" "+b:b)):f):null!=g&&(f=/^--/.test(f)?f:f.replace(/[A-Z]/g,"-$&").toLowerCase(),e+=j.p?j.p(f,g):f+":"+g+";")}return c+(b&&e?b+"{"+e+"}":e)+d},k={},l=a=>{if("object"==typeof a){let b="";for(let c in a)b+=c+l(a[c]);return b}return a};function m(a){let b,c,d=this||{},e=a.call?a(d.p):a;return((a,b,c,d,e)=>{var f;let m=l(a),n=k[m]||(k[m]=(a=>{let b=0,c=11;for(;b<a.length;)c=101*c+a.charCodeAt(b++)>>>0;return"go"+c})(m));if(!k[n]){let b=m!==a?a:(a=>{let b,c,d=[{}];for(;b=g.exec(a.replace(h,""));)b[4]?d.shift():b[3]?(c=b[3].replace(i," ").trim(),d.unshift(d[0][c]=d[0][c]||{})):d[0][b[1]]=b[2].replace(i," ").trim();return d[0]})(a);k[n]=j(e?{["@keyframes "+n]:b}:b,c?"":"."+n)}let o=c&&k.g?k.g:null;return c&&(k.g=k[n]),f=k[n],o?b.data=b.data.replace(o,f):-1===b.data.indexOf(f)&&(b.data=d?f+b.data:b.data+f),n})(e.unshift?e.raw?(b=[].slice.call(arguments,1),c=d.p,e.reduce((a,d,e)=>{let f=b[e];if(f&&f.call){let a=f(c),b=a&&a.props&&a.props.className||/^go/.test(a)&&a;f=b?"."+b:a&&"object"==typeof a?a.props?"":j(a,""):!1===a?"":a}return a+d+(null==f?"":f)},"")):e.reduce((a,b)=>Object.assign(a,b&&b.call?b(d.p):b),{}):e,d.target||f,d.g,d.o,d.k)}m.bind({g:1});let n,o,p,q=m.bind({k:1});function r(a,b){let c=this||{};return function(){let d=arguments;function e(f,g){let h=Object.assign({},f),i=h.className||e.className;c.p=Object.assign({theme:o&&o()},h),c.o=/ *go\d+/.test(i),h.className=m.apply(c,d)+(i?" "+i:""),b&&(h.ref=g);let j=a;return a[0]&&(j=h.as||a,delete h.as),p&&j[0]&&p(h),n(j,h)}return b?b(e):e}}var s=(a,b)=>"function"==typeof a?a(b):a,t=(b=0,()=>(++b).toString()),u="default",v=(a,b)=>{let{toastLimit:c}=a.settings;switch(b.type){case 0:return{...a,toasts:[b.toast,...a.toasts].slice(0,c)};case 1:return{...a,toasts:a.toasts.map(a=>a.id===b.toast.id?{...a,...b.toast}:a)};case 2:let{toast:d}=b;return v(a,{type:+!!a.toasts.find(a=>a.id===d.id),toast:d});case 3:let{toastId:e}=b;return{...a,toasts:a.toasts.map(a=>a.id===e||void 0===e?{...a,dismissed:!0,visible:!1}:a)};case 4:return void 0===b.toastId?{...a,toasts:[]}:{...a,toasts:a.toasts.filter(a=>a.id!==b.toastId)};case 5:return{...a,pausedAt:b.time};case 6:let f=b.time-(a.pausedAt||0);return{...a,pausedAt:void 0,toasts:a.toasts.map(a=>({...a,pauseDuration:a.pauseDuration+f}))}}},w=[],x={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},y={},z=(a,b=u)=>{y[b]=v(y[b]||x,a),w.forEach(([a,c])=>{a===b&&c(y[b])})},A=a=>Object.keys(y).forEach(b=>z(a,b)),B=(a=u)=>b=>{z(b,a)},C={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},D=a=>(b,c)=>{let d,e=((a,b="blank",c)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:b,ariaProps:{role:"status","aria-live":"polite"},message:a,pauseDuration:0,...c,id:(null==c?void 0:c.id)||t()}))(b,a,c);return B(e.toasterId||(d=e.id,Object.keys(y).find(a=>y[a].toasts.some(a=>a.id===d))))({type:2,toast:e}),e.id},E=(a,b)=>D("blank")(a,b);E.error=D("error"),E.success=D("success"),E.loading=D("loading"),E.custom=D("custom"),E.dismiss=(a,b)=>{let c={type:3,toastId:a};b?B(b)(c):A(c)},E.dismissAll=a=>E.dismiss(void 0,a),E.remove=(a,b)=>{let c={type:4,toastId:a};b?B(b)(c):A(c)},E.removeAll=a=>E.remove(void 0,a),E.promise=(a,b,c)=>{let d=E.loading(b.loading,{...c,...null==c?void 0:c.loading});return"function"==typeof a&&(a=a()),a.then(a=>{let e=b.success?s(b.success,a):void 0;return e?E.success(e,{id:d,...c,...null==c?void 0:c.success}):E.dismiss(d),a}).catch(a=>{let e=b.error?s(b.error,a):void 0;e?E.error(e,{id:d,...c,...null==c?void 0:c.error}):E.dismiss(d)}),a};var F=1e3,G=q`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,H=q`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,I=q`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,J=r("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${a=>a.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${G} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${H} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${a=>a.secondary||"#fff"};
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
`,K=q`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,L=r("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${a=>a.secondary||"#e0e0e0"};
  border-right-color: ${a=>a.primary||"#616161"};
  animation: ${K} 1s linear infinite;
`,M=q`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,N=q`
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
}`,O=r("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${a=>a.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${M} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${N} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${a=>a.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,P=r("div")`
  position: absolute;
`,Q=r("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,R=q`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,S=r("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${R} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,T=({toast:a})=>{let{icon:b,type:c,iconTheme:d}=a;return void 0!==b?"string"==typeof b?e.createElement(S,null,b):b:"blank"===c?null:e.createElement(Q,null,e.createElement(L,{...d}),"loading"!==c&&e.createElement(P,null,"error"===c?e.createElement(J,{...d}):e.createElement(O,{...d})))},U=r("div")`
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
`,V=r("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,W=e.memo(({toast:a,position:b,style:d,children:f})=>{let g=a.height?((a,b)=>{let d=a.includes("top")?1:-1,[e,f]=c?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*d}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*d}%,-1px) scale(.6); opacity:0;}
`];return{animation:b?`${q(e)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${q(f)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(a.position||b||"top-center",a.visible):{opacity:0},h=e.createElement(T,{toast:a}),i=e.createElement(V,{...a.ariaProps},s(a.message,a));return e.createElement(U,{className:a.className,style:{...g,...d,...a.style}},"function"==typeof f?f({icon:h,message:i}):e.createElement(e.Fragment,null,h,i))});d=e.createElement,j.p=void 0,n=d,o=void 0,p=void 0;var X=({id:a,className:b,style:c,onHeightUpdate:d,children:f})=>{let g=e.useCallback(b=>{if(b){let c=()=>{d(a,b.getBoundingClientRect().height)};c(),new MutationObserver(c).observe(b,{subtree:!0,childList:!0,characterData:!0})}},[a,d]);return e.createElement("div",{ref:g,className:b,style:c},f)},Y=m`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,Z=({reverseOrder:a,position:b="top-center",toastOptions:d,gutter:f,children:g,toasterId:h,containerStyle:i,containerClassName:j})=>{let{toasts:k,handlers:l}=((a,b="default")=>{let{toasts:c,pausedAt:d}=((a={},b=u)=>{let[c,d]=(0,e.useState)(y[b]||x),f=(0,e.useRef)(y[b]);(0,e.useEffect)(()=>(f.current!==y[b]&&d(y[b]),w.push([b,d]),()=>{let a=w.findIndex(([a])=>a===b);a>-1&&w.splice(a,1)}),[b]);let g=c.toasts.map(b=>{var c,d,e;return{...a,...a[b.type],...b,removeDelay:b.removeDelay||(null==(c=a[b.type])?void 0:c.removeDelay)||(null==a?void 0:a.removeDelay),duration:b.duration||(null==(d=a[b.type])?void 0:d.duration)||(null==a?void 0:a.duration)||C[b.type],style:{...a.style,...null==(e=a[b.type])?void 0:e.style,...b.style}}});return{...c,toasts:g}})(a,b),f=(0,e.useRef)(new Map).current,g=(0,e.useCallback)((a,b=F)=>{if(f.has(a))return;let c=setTimeout(()=>{f.delete(a),h({type:4,toastId:a})},b);f.set(a,c)},[]);(0,e.useEffect)(()=>{if(d)return;let a=Date.now(),e=c.map(c=>{if(c.duration===1/0)return;let d=(c.duration||0)+c.pauseDuration-(a-c.createdAt);if(d<0){c.visible&&E.dismiss(c.id);return}return setTimeout(()=>E.dismiss(c.id,b),d)});return()=>{e.forEach(a=>a&&clearTimeout(a))}},[c,d,b]);let h=(0,e.useCallback)(B(b),[b]),i=(0,e.useCallback)(()=>{h({type:5,time:Date.now()})},[h]),j=(0,e.useCallback)((a,b)=>{h({type:1,toast:{id:a,height:b}})},[h]),k=(0,e.useCallback)(()=>{d&&h({type:6,time:Date.now()})},[d,h]),l=(0,e.useCallback)((a,b)=>{let{reverseOrder:d=!1,gutter:e=8,defaultPosition:f}=b||{},g=c.filter(b=>(b.position||f)===(a.position||f)&&b.height),h=g.findIndex(b=>b.id===a.id),i=g.filter((a,b)=>b<h&&a.visible).length;return g.filter(a=>a.visible).slice(...d?[i+1]:[0,i]).reduce((a,b)=>a+(b.height||0)+e,0)},[c]);return(0,e.useEffect)(()=>{c.forEach(a=>{if(a.dismissed)g(a.id,a.removeDelay);else{let b=f.get(a.id);b&&(clearTimeout(b),f.delete(a.id))}})},[c,g]),{toasts:c,handlers:{updateHeight:j,startPause:i,endPause:k,calculateOffset:l}}})(d,h);return e.createElement("div",{"data-rht-toaster":h||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...i},className:j,onMouseEnter:l.startPause,onMouseLeave:l.endPause},k.map(d=>{let h,i,j=d.position||b,k=l.calculateOffset(d,{reverseOrder:a,gutter:f,defaultPosition:b}),m=(h=j.includes("top"),i=j.includes("center")?{justifyContent:"center"}:j.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:c?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${k*(h?1:-1)}px)`,...h?{top:0}:{bottom:0},...i});return e.createElement(X,{id:d.id,key:d.id,onHeightUpdate:l.updateHeight,className:d.visible?Y:"",style:m},"custom"===d.type?s(d.message,d):g?g(d):e.createElement(W,{toast:d,position:j}))}))};a.s(["Toaster",()=>Z,"default",()=>E],6704)},63418,a=>{"use strict";var b=a.i(87924),c=a.i(27348),d=a.i(38246);function e({onThemeToggle:a,currentTheme:e}){return(0,b.jsx)("header",{className:"sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 shadow-sm",children:(0,b.jsxs)("div",{className:"container mx-auto px-4 py-4 max-w-7xl",children:[(0,b.jsxs)("div",{className:"flex items-center justify-between",children:[(0,b.jsxs)(d.default,{href:"/",className:"flex items-center gap-3 hover:opacity-80 transition-opacity",children:[(0,b.jsx)("div",{className:"text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent",children:"📊"}),(0,b.jsxs)("div",{children:[(0,b.jsx)("h1",{className:"text-2xl font-bold text-gray-900 dark:text-white",children:"Young Money"}),(0,b.jsx)("p",{className:"text-xs text-gray-500 dark:text-gray-400",children:"Trading Journal & Portfolio"})]})]}),(0,b.jsxs)("div",{className:"flex items-center gap-4",children:[(0,b.jsxs)("nav",{className:"hidden md:flex gap-6",children:[(0,b.jsx)(d.default,{href:"/",className:"text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors",children:"Dashboard"}),(0,b.jsx)(d.default,{href:"/analytics",className:"text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors",children:"Analytics"}),(0,b.jsx)(d.default,{href:"/calendar",className:"text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors",children:"Calendar"}),(0,b.jsx)(d.default,{href:"/planning",className:"text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors",children:"Planning"}),(0,b.jsx)(d.default,{href:"/insights",className:"text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors",children:"Insights"}),(0,b.jsx)(d.default,{href:"/review",className:"text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors",children:"Review"})]}),(0,b.jsx)("button",{onClick:a,className:"p-2 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors","aria-label":"Toggle theme",children:"dark"===e?(0,b.jsx)(c.FiSun,{className:"w-5 h-5"}):(0,b.jsx)(c.FiMoon,{className:"w-5 h-5"})})]})]}),(0,b.jsxs)("nav",{className:"md:hidden flex gap-3 mt-4 flex-wrap",children:[(0,b.jsx)(d.default,{href:"/",className:"text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 bg-gray-100 dark:bg-slate-800 px-3 py-1 rounded",children:"Dashboard"}),(0,b.jsx)(d.default,{href:"/analytics",className:"text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 bg-gray-100 dark:bg-slate-800 px-3 py-1 rounded",children:"Analytics"}),(0,b.jsx)(d.default,{href:"/calendar",className:"text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 bg-gray-100 dark:bg-slate-800 px-3 py-1 rounded",children:"Calendar"}),(0,b.jsx)(d.default,{href:"/planning",className:"text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 bg-gray-100 dark:bg-slate-800 px-3 py-1 rounded",children:"Planning"}),(0,b.jsx)(d.default,{href:"/insights",className:"text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 bg-gray-100 dark:bg-slate-800 px-3 py-1 rounded",children:"Insights"}),(0,b.jsx)(d.default,{href:"/review",className:"text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 bg-gray-100 dark:bg-slate-800 px-3 py-1 rounded",children:"Review"})]})]})})}a.s(["default",()=>e])},73497,a=>{"use strict";var b=a.i(87924),c=a.i(72131),d=a.i(63418),e=a.i(42029),f=a.i(6704);function g(){let{theme:a,toggleTheme:g}=(0,e.useTheme)(),[h,i]=(0,c.useState)(!1),[j,k]=(0,c.useState)([]),[l,m]=(0,c.useState)(new Date),[n,o]=(0,c.useState)(null);(0,c.useEffect)(()=>{i(!0)},[]),(0,c.useEffect)(()=>{h&&(async()=>{try{let a=await fetch("/api/trades",{headers:{"x-user-id":"demo-user"}}),b=await a.json();k(b)}catch(a){console.error("Error fetching trades:",a)}})()},[h]);let p=(0,c.useMemo)(()=>{let a={};return j.forEach(b=>{let c=new Date(b.entryTime).toISOString().split("T")[0];a[c]||(a[c]=[]),a[c].push(b)}),a},[j]),q=Array.from({length:new Date(l.getFullYear(),l.getMonth()+1,0).getDate()},(a,b)=>b+1),r=[...Array.from({length:new Date(l.getFullYear(),l.getMonth(),1).getDay()},(a,b)=>null),...q],s=n&&p[n]||[];return h?(0,b.jsxs)("div",{className:"min-h-screen bg-white dark:bg-slate-950",children:[(0,b.jsx)(d.default,{onThemeToggle:g,currentTheme:a}),(0,b.jsxs)("main",{className:"container mx-auto px-4 py-8 max-w-6xl",children:[(0,b.jsxs)("div",{className:"mb-8",children:[(0,b.jsx)("h1",{className:"text-3xl font-bold text-gray-900 dark:text-white mb-2",children:"Trading Calendar"}),(0,b.jsx)("p",{className:"text-gray-600 dark:text-gray-400",children:"View your trades by day"})]}),(0,b.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-8",children:[(0,b.jsxs)("div",{className:"lg:col-span-2 bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700",children:[(0,b.jsxs)("div",{className:"flex items-center justify-between mb-6",children:[(0,b.jsx)("h2",{className:"text-lg font-bold text-gray-900 dark:text-white",children:l.toLocaleString("default",{month:"long",year:"numeric"})}),(0,b.jsxs)("div",{className:"flex gap-2",children:[(0,b.jsx)("button",{onClick:()=>m(new Date(l.getFullYear(),l.getMonth()-1)),className:"px-3 py-2 rounded-lg bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors",children:"← Prev"}),(0,b.jsx)("button",{onClick:()=>m(new Date),className:"px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors text-sm font-semibold",children:"Today"}),(0,b.jsx)("button",{onClick:()=>m(new Date(l.getFullYear(),l.getMonth()+1)),className:"px-3 py-2 rounded-lg bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors",children:"Next →"})]})]}),(0,b.jsx)("div",{className:"grid grid-cols-7 gap-2 mb-2",children:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(a=>(0,b.jsx)("div",{className:"text-center font-semibold text-gray-700 dark:text-gray-300 text-xs p-2",children:a},a))}),(0,b.jsx)("div",{className:"grid grid-cols-7 gap-2",children:r.map((a,c)=>{let d,e,f;if(null===a)return(0,b.jsx)("div",{className:"aspect-square"},`empty-${c}`);let g=new Date(l.getFullYear(),l.getMonth(),a).toISOString().split("T")[0],h=(e=(d=p[new Date(l.getFullYear(),l.getMonth(),a).toISOString().split("T")[0]]||[]).reduce((a,b)=>a+(b.profitLoss||0),0),f=d.filter(a=>"WIN"===a.outcome).length,{count:d.length,pnl:e,wins:f}),i=n===g;return(0,b.jsxs)("button",{onClick:()=>o(i?null:g),className:`aspect-square p-2 rounded-lg border-2 transition-colors text-xs font-semibold ${i?"bg-blue-600 border-blue-600 text-white dark:bg-blue-700 dark:border-blue-700":h.count>0?h.pnl>=0?"bg-green-100 border-green-300 dark:bg-green-900/30 dark:border-green-700 text-green-900 dark:text-green-100":"bg-red-100 border-red-300 dark:bg-red-900/30 dark:border-red-700 text-red-900 dark:text-red-100":"bg-gray-100 border-gray-300 dark:bg-slate-700 dark:border-slate-600 text-gray-600 dark:text-gray-400"}`,children:[(0,b.jsx)("div",{children:a}),h.count>0&&(0,b.jsxs)("div",{className:"text-[10px]",children:[h.count,"T"]})]},a)})}),(0,b.jsxs)("div",{className:"mt-6 flex flex-wrap gap-4 text-xs",children:[(0,b.jsxs)("div",{className:"flex items-center gap-2",children:[(0,b.jsx)("div",{className:"w-4 h-4 bg-green-100 dark:bg-green-900/30 rounded border-2 border-green-300 dark:border-green-700"}),(0,b.jsx)("span",{className:"text-gray-700 dark:text-gray-300",children:"Winning Day"})]}),(0,b.jsxs)("div",{className:"flex items-center gap-2",children:[(0,b.jsx)("div",{className:"w-4 h-4 bg-red-100 dark:bg-red-900/30 rounded border-2 border-red-300 dark:border-red-700"}),(0,b.jsx)("span",{className:"text-gray-700 dark:text-gray-300",children:"Losing Day"})]}),(0,b.jsxs)("div",{className:"flex items-center gap-2",children:[(0,b.jsx)("div",{className:"w-4 h-4 bg-gray-100 dark:bg-slate-700 rounded border-2 border-gray-300 dark:border-slate-600"}),(0,b.jsx)("span",{className:"text-gray-700 dark:text-gray-300",children:"No Trades"})]})]})]}),(0,b.jsxs)("div",{className:"bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700 h-fit",children:[(0,b.jsx)("h2",{className:"text-lg font-bold text-gray-900 dark:text-white mb-4",children:n?new Date(n+"T00:00:00").toLocaleDateString():"Select a date"}),s.length>0?(0,b.jsx)("div",{className:"space-y-3",children:s.map(a=>(0,b.jsxs)("div",{className:"bg-gray-50 dark:bg-slate-700 p-3 rounded-lg",children:[(0,b.jsxs)("div",{className:"flex items-center justify-between mb-1",children:[(0,b.jsx)("span",{className:"font-semibold text-gray-900 dark:text-white text-sm",children:a.pair}),(0,b.jsx)("span",{className:`text-xs font-semibold px-2 py-1 rounded ${"WIN"===a.outcome?"bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400":"bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"}`,children:a.outcome||"Open"})]}),(0,b.jsxs)("div",{className:"flex items-center justify-between text-xs",children:[(0,b.jsx)("span",{className:"text-gray-600 dark:text-gray-400",children:a.direction}),(0,b.jsx)("span",{className:a.profitLoss&&a.profitLoss>=0?"text-green-600 dark:text-green-400":"text-red-600 dark:text-red-400",children:void 0!==a.profitLoss?`${a.profitLoss>=0?"+":""}${a.profitLoss.toFixed(2)}`:"N/A"})]})]},a.id))}):(0,b.jsx)("p",{className:"text-sm text-gray-500 dark:text-gray-400",children:n?"No trades on this date":"Select a date to view trades"})]})]})]}),(0,b.jsx)(f.Toaster,{position:"bottom-right"})]}):(0,b.jsx)("div",{className:"min-h-screen bg-white dark:bg-slate-950"})}a.s(["default",()=>g])}];

//# sourceMappingURL=_73626ce5._.js.map