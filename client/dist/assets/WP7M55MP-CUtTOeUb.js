import{$ as e,At as t,Bt as n,Ct as r,Dt as i,Et as a,Ft as o,Gt as s,Ht as c,It as l,J as u,Lt as d,Mt as f,Nt as p,Ot as m,Pt as h,Q as g,Rt as _,St as v,Tt as y,Ut as b,Vt as x,Wt as S,X as C,Y as w,Z as T,_t as E,at as D,ct as O,dt as k,et as A,ft as j,gt as ee,ht as M,it as N,jt as P,kt as te,lt as F,mt as I,nt as ne,ot as re,pt as ie,rt as L,st as R,tt as ae,ut as z,vt as oe,wt as se,yt as ce,zt as le}from"./index-BYa8O9vl.js";var ue=e=>e!=null,de=e=>e.filter(ue);function fe(e){return(...t)=>{for(let n of e)n&&n(...t)}}var B=e=>typeof e==`function`&&!e.length?e():e,pe=e=>Array.isArray(e)?e:e?[e]:[];function me(e,...t){return typeof e==`function`?e(...t):e}var he=P;function ge(e,t,n,r){let i=e.length,a=t.length,o=0;if(!a){for(;o<i;o++)n(e[o]);return}if(!i){for(;o<a;o++)r(t[o]);return}for(;o<a&&t[o]===e[o];o++);let s,c;t=t.slice(o),e=e.slice(o);for(s of t)e.includes(s)||r(s);for(c of e)t.includes(c)||n(c)}function _e(e){let[t,n]=I(),r=e?.throw?(e,t)=>{throw n(e instanceof Error?e:Error(t)),e}:(e,t)=>{n(e instanceof Error?e:Error(t))},i=e?.api?Array.isArray(e.api)?e.api:[e.api]:[globalThis.localStorage].filter(Boolean),a=e?.prefix?`${e.prefix}.`:``,o=new Map,s=new Proxy({},{get(t,n){let s=o.get(n);s||(s=I(void 0,{equals:!1}),o.set(n,s)),s[0]();let c=i.reduce((e,t)=>{if(e!==null||!t)return e;try{return t.getItem(`${a}${n}`)}catch(e){return r(e,`Error reading ${a}${n} from ${t.name}`),null}},null);return c!==null&&e?.deserializer?e.deserializer(c,n,e.options):c}});return e?.sync!==!1&&f(()=>{let e=e=>{let t=!1;i.forEach(n=>{try{n!==e.storageArea&&e.key&&e.newValue!==n.getItem(e.key)&&(e.newValue?n.setItem(e.key,e.newValue):n.removeItem(e.key),t=!0)}catch(t){r(t,`Error synching api ${n.name} from storage event (${e.key}=${e.newValue})`)}}),t&&e.key&&o.get(e.key)?.[1]()};`addEventListener`in globalThis?(globalThis.addEventListener(`storage`,e),P(()=>globalThis.removeEventListener(`storage`,e))):(i.forEach(t=>t.addEventListener?.(`storage`,e)),P(()=>i.forEach(t=>t.removeEventListener?.(`storage`,e))))}),[s,(t,n,s)=>{let c=e?.serializer?e.serializer(n,t,s??e.options):n,l=`${a}${t}`;i.forEach(e=>{try{e.getItem(l)!==c&&e.setItem(l,c)}catch(n){r(n,`Error setting ${a}${t} to ${c} in ${e.name}`)}});let u=o.get(t);u&&u[1]()},{clear:()=>i.forEach(e=>{try{e.clear()}catch(t){r(t,`Error clearing ${e.name}`)}}),error:t,remove:e=>i.forEach(t=>{try{t.removeItem(`${a}${e}`)}catch(n){r(n,`Error removing ${a}${e} from ${t.name}`)}}),toJSON:()=>{let t={},n=(n,r)=>{if(!t.hasOwnProperty(n)){let i=r&&e?.deserializer?e.deserializer(r,n,e.options):r;i&&(t[n]=i)}};return i.forEach(e=>{if(typeof e.getAll==`function`){let t;try{t=e.getAll()}catch(t){r(t,`Error getting all values from in ${e.name}`)}for(let e of t)n(e,t[e])}else{let i=0,a;try{for(;a=e.key(i++);)t.hasOwnProperty(a)||n(a,e.getItem(a))}catch(t){r(t,`Error getting all values from ${e.name}`)}}}),t}}]}var ve=_e,ye=e=>(typeof e.clear==`function`||(e.clear=()=>{let t;for(;t=e.key(0);)e.removeItem(t)}),e),be=e=>{if(!e)return``;let t=``;for(let n in e){if(!e.hasOwnProperty(n))continue;let r=e[n];t+=r instanceof Date?`; ${n}=${r.toUTCString()}`:typeof r==`boolean`?`; ${n}`:`; ${n}=${r}`}return t},xe=ye({_cookies:[globalThis.document,`cookie`],getItem:e=>xe._cookies[0][xe._cookies[1]].match(`(^|;)\\s*`+e+`\\s*=\\s*([^;]+)`)?.pop()??null,setItem:(e,t,n)=>{let r=xe.getItem(e);xe._cookies[0][xe._cookies[1]]=`${e}=${t}${be(n)}`;let i=Object.assign(new Event(`storage`),{key:e,oldValue:r,newValue:t,url:globalThis.document.URL,storageArea:xe});window.dispatchEvent(i)},removeItem:e=>{xe._cookies[0][xe._cookies[1]]=`${e}=deleted${be({expires:new Date(0)})}`},key:e=>{let t=null,n=0;return xe._cookies[0][xe._cookies[1]].replace(/(?:^|;)\s*(.+?)\s*=\s*[^;]+/g,(r,i)=>(!t&&i&&n++===e&&(t=i),``)),t},get length(){let e=0;return xe._cookies[0][xe._cookies[1]].replace(/(?:^|;)\s*.+?\s*=\s*[^;]+/g,t=>(e+=+!!t,``)),e}}),Se=1024,Ce=796,we=700,Te=`bottom-right`,Ee=`bottom`,De=`system`,Oe=!1,ke=500,Ae=500,je=500,Me=Object.keys(l)[0],Ne=1,Pe=Object.keys(te)[0],Fe=F({client:void 0,onlineManager:void 0,queryFlavor:``,version:``,shadowDOMTarget:void 0});function V(){return S(Fe)}var Ie=class extends Error{},Le=F(void 0),Re=e=>{let[t,n]=I(null),r=()=>{let e=t();e!=null&&(e.close(),n(null))},i=(r,i)=>{if(t()!=null)return;let a=window.open(``,`TSQD-Devtools-Panel`,`width=${r},height=${i},popup`);if(!a)throw new Ie(`Failed to open popup. Please allow popups for this site to view the devtools in picture-in-picture mode.`);a.document.head.innerHTML=``,a.document.body.innerHTML=``,D(a.document),a.document.title=`TanStack Query Devtools`,a.document.body.style.margin=`0`,a.addEventListener(`pagehide`,()=>{e.setLocalStore(`pip_open`,`false`),n(null)}),[...(V().shadowDOMTarget||document).styleSheets].forEach(e=>{try{let t=[...e.cssRules].map(e=>e.cssText).join(``),n=document.createElement(`style`),r=e.ownerNode,i=``;r&&`id`in r&&(i=r.id),i&&n.setAttribute(`id`,i),n.textContent=t,a.document.head.appendChild(n)}catch{let t=document.createElement(`link`);if(e.href==null)return;t.rel=`stylesheet`,t.type=e.type,t.media=e.media.toString(),t.href=e.href,a.document.head.appendChild(t)}}),ee([`focusin`,`focusout`,`pointermove`,`keydown`,`pointerdown`,`pointerup`,`click`,`mousedown`,`input`],a.document),e.setLocalStore(`pip_open`,`true`),n(a)};z(()=>{if((e.localStore.pip_open??`false`)===`true`&&!e.disabled)try{i(Number(window.innerWidth),Number(e.localStore.height||Ae))}catch(t){if(t instanceof Ie){e.setLocalStore(`pip_open`,`false`),e.setLocalStore(`open`,`false`);return}throw t}}),z(()=>{let e=(V().shadowDOMTarget||document).querySelector(`#_goober`),n=t();if(e&&n){let t=new MutationObserver(()=>{let t=(V().shadowDOMTarget||n.document).querySelector(`#_goober`);t&&(t.textContent=e.textContent)});t.observe(e,{childList:!0,subtree:!0,characterDataOldValue:!0}),P(()=>{t.disconnect()})}});let a=k(()=>({pipWindow:t(),requestPipWindow:i,closePipWindow:r,disabled:e.disabled??!1}));return R(Le.Provider,{value:a,get children(){return e.children}})},ze=()=>k(()=>{let e=S(Le);if(!e)throw Error(`usePiPWindow must be used within a PiPProvider`);return e()}),Be=F(()=>`dark`);function H(){return S(Be)}var Ve={À:`A`,Á:`A`,Â:`A`,Ã:`A`,Ä:`A`,Å:`A`,Ấ:`A`,Ắ:`A`,Ẳ:`A`,Ẵ:`A`,Ặ:`A`,Æ:`AE`,Ầ:`A`,Ằ:`A`,Ȃ:`A`,Ç:`C`,Ḉ:`C`,È:`E`,É:`E`,Ê:`E`,Ë:`E`,Ế:`E`,Ḗ:`E`,Ề:`E`,Ḕ:`E`,Ḝ:`E`,Ȇ:`E`,Ì:`I`,Í:`I`,Î:`I`,Ï:`I`,Ḯ:`I`,Ȋ:`I`,Ð:`D`,Ñ:`N`,Ò:`O`,Ó:`O`,Ô:`O`,Õ:`O`,Ö:`O`,Ø:`O`,Ố:`O`,Ṍ:`O`,Ṓ:`O`,Ȏ:`O`,Ù:`U`,Ú:`U`,Û:`U`,Ü:`U`,Ý:`Y`,à:`a`,á:`a`,â:`a`,ã:`a`,ä:`a`,å:`a`,ấ:`a`,ắ:`a`,ẳ:`a`,ẵ:`a`,ặ:`a`,æ:`ae`,ầ:`a`,ằ:`a`,ȃ:`a`,ç:`c`,ḉ:`c`,è:`e`,é:`e`,ê:`e`,ë:`e`,ế:`e`,ḗ:`e`,ề:`e`,ḕ:`e`,ḝ:`e`,ȇ:`e`,ì:`i`,í:`i`,î:`i`,ï:`i`,ḯ:`i`,ȋ:`i`,ð:`d`,ñ:`n`,ò:`o`,ó:`o`,ô:`o`,õ:`o`,ö:`o`,ø:`o`,ố:`o`,ṍ:`o`,ṓ:`o`,ȏ:`o`,ù:`u`,ú:`u`,û:`u`,ü:`u`,ý:`y`,ÿ:`y`,Ā:`A`,ā:`a`,Ă:`A`,ă:`a`,Ą:`A`,ą:`a`,Ć:`C`,ć:`c`,Ĉ:`C`,ĉ:`c`,Ċ:`C`,ċ:`c`,Č:`C`,č:`c`,C̆:`C`,c̆:`c`,Ď:`D`,ď:`d`,Đ:`D`,đ:`d`,Ē:`E`,ē:`e`,Ĕ:`E`,ĕ:`e`,Ė:`E`,ė:`e`,Ę:`E`,ę:`e`,Ě:`E`,ě:`e`,Ĝ:`G`,Ǵ:`G`,ĝ:`g`,ǵ:`g`,Ğ:`G`,ğ:`g`,Ġ:`G`,ġ:`g`,Ģ:`G`,ģ:`g`,Ĥ:`H`,ĥ:`h`,Ħ:`H`,ħ:`h`,Ḫ:`H`,ḫ:`h`,Ĩ:`I`,ĩ:`i`,Ī:`I`,ī:`i`,Ĭ:`I`,ĭ:`i`,Į:`I`,į:`i`,İ:`I`,ı:`i`,Ĳ:`IJ`,ĳ:`ij`,Ĵ:`J`,ĵ:`j`,Ķ:`K`,ķ:`k`,Ḱ:`K`,ḱ:`k`,K̆:`K`,k̆:`k`,Ĺ:`L`,ĺ:`l`,Ļ:`L`,ļ:`l`,Ľ:`L`,ľ:`l`,Ŀ:`L`,ŀ:`l`,Ł:`l`,ł:`l`,Ḿ:`M`,ḿ:`m`,M̆:`M`,m̆:`m`,Ń:`N`,ń:`n`,Ņ:`N`,ņ:`n`,Ň:`N`,ň:`n`,ŉ:`n`,N̆:`N`,n̆:`n`,Ō:`O`,ō:`o`,Ŏ:`O`,ŏ:`o`,Ő:`O`,ő:`o`,Œ:`OE`,œ:`oe`,P̆:`P`,p̆:`p`,Ŕ:`R`,ŕ:`r`,Ŗ:`R`,ŗ:`r`,Ř:`R`,ř:`r`,R̆:`R`,r̆:`r`,Ȓ:`R`,ȓ:`r`,Ś:`S`,ś:`s`,Ŝ:`S`,ŝ:`s`,Ş:`S`,Ș:`S`,ș:`s`,ş:`s`,Š:`S`,š:`s`,Ţ:`T`,ţ:`t`,ț:`t`,Ț:`T`,Ť:`T`,ť:`t`,Ŧ:`T`,ŧ:`t`,T̆:`T`,t̆:`t`,Ũ:`U`,ũ:`u`,Ū:`U`,ū:`u`,Ŭ:`U`,ŭ:`u`,Ů:`U`,ů:`u`,Ű:`U`,ű:`u`,Ų:`U`,ų:`u`,Ȗ:`U`,ȗ:`u`,V̆:`V`,v̆:`v`,Ŵ:`W`,ŵ:`w`,Ẃ:`W`,ẃ:`w`,X̆:`X`,x̆:`x`,Ŷ:`Y`,ŷ:`y`,Ÿ:`Y`,Y̆:`Y`,y̆:`y`,Ź:`Z`,ź:`z`,Ż:`Z`,ż:`z`,Ž:`Z`,ž:`z`,ſ:`s`,ƒ:`f`,Ơ:`O`,ơ:`o`,Ư:`U`,ư:`u`,Ǎ:`A`,ǎ:`a`,Ǐ:`I`,ǐ:`i`,Ǒ:`O`,ǒ:`o`,Ǔ:`U`,ǔ:`u`,Ǖ:`U`,ǖ:`u`,Ǘ:`U`,ǘ:`u`,Ǚ:`U`,ǚ:`u`,Ǜ:`U`,ǜ:`u`,Ứ:`U`,ứ:`u`,Ṹ:`U`,ṹ:`u`,Ǻ:`A`,ǻ:`a`,Ǽ:`AE`,ǽ:`ae`,Ǿ:`O`,ǿ:`o`,Þ:`TH`,þ:`th`,Ṕ:`P`,ṕ:`p`,Ṥ:`S`,ṥ:`s`,X́:`X`,x́:`x`,Ѓ:`Г`,ѓ:`г`,Ќ:`К`,ќ:`к`,A̋:`A`,a̋:`a`,E̋:`E`,e̋:`e`,I̋:`I`,i̋:`i`,Ǹ:`N`,ǹ:`n`,Ồ:`O`,ồ:`o`,Ṑ:`O`,ṑ:`o`,Ừ:`U`,ừ:`u`,Ẁ:`W`,ẁ:`w`,Ỳ:`Y`,ỳ:`y`,Ȁ:`A`,ȁ:`a`,Ȅ:`E`,ȅ:`e`,Ȉ:`I`,ȉ:`i`,Ȍ:`O`,ȍ:`o`,Ȑ:`R`,ȑ:`r`,Ȕ:`U`,ȕ:`u`,B̌:`B`,b̌:`b`,Č̣:`C`,č̣:`c`,Ê̌:`E`,ê̌:`e`,F̌:`F`,f̌:`f`,Ǧ:`G`,ǧ:`g`,Ȟ:`H`,ȟ:`h`,J̌:`J`,ǰ:`j`,Ǩ:`K`,ǩ:`k`,M̌:`M`,m̌:`m`,P̌:`P`,p̌:`p`,Q̌:`Q`,q̌:`q`,Ř̩:`R`,ř̩:`r`,Ṧ:`S`,ṧ:`s`,V̌:`V`,v̌:`v`,W̌:`W`,w̌:`w`,X̌:`X`,x̌:`x`,Y̌:`Y`,y̌:`y`,A̧:`A`,a̧:`a`,B̧:`B`,b̧:`b`,Ḑ:`D`,ḑ:`d`,Ȩ:`E`,ȩ:`e`,Ɛ̧:`E`,ɛ̧:`e`,Ḩ:`H`,ḩ:`h`,I̧:`I`,i̧:`i`,Ɨ̧:`I`,ɨ̧:`i`,M̧:`M`,m̧:`m`,O̧:`O`,o̧:`o`,Q̧:`Q`,q̧:`q`,U̧:`U`,u̧:`u`,X̧:`X`,x̧:`x`,Z̧:`Z`,z̧:`z`},He=Object.keys(Ve).join(`|`),Ue=new RegExp(He,`g`);function We(e){return e.replace(Ue,e=>Ve[e])}var U={CASE_SENSITIVE_EQUAL:7,EQUAL:6,STARTS_WITH:5,WORD_STARTS_WITH:4,CONTAINS:3,ACRONYM:2,MATCHES:1,NO_MATCH:0};function Ge(e,t,n){if(n||={},n.threshold=n.threshold??U.MATCHES,!n.accessors){let r=Ke(e,t,n);return{rankedValue:e,rank:r,accessorIndex:-1,accessorThreshold:n.threshold,passed:r>=n.threshold}}let r=Ze(e,n.accessors),i={rankedValue:e,rank:U.NO_MATCH,accessorIndex:-1,accessorThreshold:n.threshold,passed:!1};for(let e=0;e<r.length;e++){let a=r[e],o=Ke(a.itemValue,t,n),{minRanking:s,maxRanking:c,threshold:l=n.threshold}=a.attributes;o<s&&o>=U.MATCHES?o=s:o>c&&(o=c),o=Math.min(o,c),o>=l&&o>i.rank&&(i.rank=o,i.passed=!0,i.accessorIndex=e,i.accessorThreshold=l,i.rankedValue=a.itemValue)}return i}function Ke(e,t,n){return e=Ye(e,n),t=Ye(t,n),t.length>e.length?U.NO_MATCH:e===t?U.CASE_SENSITIVE_EQUAL:(e=e.toLowerCase(),t=t.toLowerCase(),e===t?U.EQUAL:e.startsWith(t)?U.STARTS_WITH:e.includes(` ${t}`)?U.WORD_STARTS_WITH:e.includes(t)?U.CONTAINS:t.length===1?U.NO_MATCH:qe(e).includes(t)?U.ACRONYM:Je(e,t))}function qe(e){let t=``;return e.split(` `).forEach(e=>{e.split(`-`).forEach(e=>{t+=e.substr(0,1)})}),t}function Je(e,t){let n=0,r=0;function i(e,t,r){for(let i=r,a=t.length;i<a;i++)if(t[i]===e)return n+=1,i+1;return-1}function a(e){let r=1/e,i=n/t.length;return U.MATCHES+i*r}let o=i(t[0],e,0);if(o<0)return U.NO_MATCH;r=o;for(let n=1,a=t.length;n<a;n++){let a=t[n];if(r=i(a,e,r),!(r>-1))return U.NO_MATCH}return a(r-o)}function Ye(e,t){let{keepDiacritics:n}=t;return e=`${e}`,n||(e=We(e)),e}function Xe(e,t){let n=t;typeof t==`object`&&(n=t.accessor);let r=n(e);return r==null?[]:Array.isArray(r)?r:[String(r)]}function Ze(e,t){let n=[];for(let r=0,i=t.length;r<i;r++){let i=t[r],a=$e(i),o=Xe(e,i);for(let e=0,t=o.length;e<t;e++)n.push({itemValue:o[e],attributes:a})}return n}var Qe={maxRanking:1/0,minRanking:-1/0};function $e(e){return typeof e==`function`?Qe:{...Qe,...e}}var et={data:``},tt=e=>{if(typeof window==`object`){let t=(e?e.querySelector(`#_goober`):window._goober)||Object.assign(document.createElement(`style`),{innerHTML:` `,id:`_goober`});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||et},nt=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,rt=/\/\*[^]*?\*\/|  +/g,it=/\n+/g,at=(e,t)=>{let n=``,r=``,i=``;for(let a in e){let o=e[a];a[0]==`@`?a[1]==`i`?n=a+` `+o+`;`:r+=a[1]==`f`?at(o,a):a+`{`+at(o,a[1]==`k`?``:t)+`}`:typeof o==`object`?r+=at(o,t?t.replace(/([^,])+/g,e=>a.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+` `+t:t)):a):o!=null&&(a=/^--/.test(a)?a:a.replace(/[A-Z]/g,`-$&`).toLowerCase(),i+=at.p?at.p(a,o):a+`:`+o+`;`)}return n+(t&&i?t+`{`+i+`}`:i)+r},ot={},st=e=>{if(typeof e==`object`){let t=``;for(let n in e)t+=n+st(e[n]);return t}return e},ct=(e,t,n,r,i)=>{let a=st(e),o=ot[a]||(ot[a]=(e=>{let t=0,n=11;for(;t<e.length;)n=101*n+e.charCodeAt(t++)>>>0;return`go`+n})(a));if(!ot[o]){let t=a===e?(e=>{let t,n,r=[{}];for(;t=nt.exec(e.replace(rt,``));)t[4]?r.shift():t[3]?(n=t[3].replace(it,` `).trim(),r.unshift(r[0][n]=r[0][n]||{})):r[0][t[1]]=t[2].replace(it,` `).trim();return r[0]})(e):e;ot[o]=at(i?{[`@keyframes `+o]:t}:t,n?``:`.`+o)}let s=n&&ot.g?ot.g:null;return n&&(ot.g=ot[o]),((e,t,n,r)=>{r?t.data=t.data.replace(r,e):t.data.indexOf(e)===-1&&(t.data=n?e+t.data:t.data+e)})(ot[o],t,r,s),o},lt=(e,t,n)=>e.reduce((e,r,i)=>{let a=t[i];if(a&&a.call){let e=a(n),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;a=t?`.`+t:e&&typeof e==`object`?e.props?``:at(e,``):!1===e?``:e}return e+r+(a??``)},``);function W(e){let t=this||{},n=e.call?e(t.p):e;return ct(n.unshift?n.raw?lt(n,[].slice.call(arguments,1),t.p):n.reduce((e,n)=>Object.assign(e,n&&n.call?n(t.p):n),{}):n,tt(t.target),t.g,t.o,t.k)}W.bind({g:1}),W.bind({k:1});function ut(e){var t,n,r=``;if(typeof e==`string`||typeof e==`number`)r+=e;else if(typeof e==`object`){if(Array.isArray(e)){var i=e.length;for(t=0;t<i;t++)e[t]&&(n=ut(e[t]))&&(r&&(r+=` `),r+=n)}else for(n in e)e[n]&&(r&&(r+=` `),r+=n)}return r}function G(){for(var e,t,n=0,r=``,i=arguments.length;n<i;n++)(e=arguments[n])&&(t=ut(e))&&(r&&(r+=` `),r+=t);return r}function dt(e,t){let n=x(e),{onChange:r}=t,i=new Set(t.appear?void 0:n),a=new WeakSet,[o,c]=I([],{equals:!1}),[l]=s(),d=e=>{c(t=>(t.push.apply(t,e),t));for(let t of e)a.delete(t)},f=(e,t,n)=>e.splice(n,0,t);return k(t=>{let n=o(),s=e();if(s[u],x(l))return l(),t;if(n.length){let e=t.filter(e=>!n.includes(e));return n.length=0,r({list:e,added:[],removed:[],unchanged:e,finishRemoved:d}),e}return x(()=>{let e=new Set(s),n=s.slice(),o=[],c=[],l=[];for(let e of s)(i.has(e)?l:o).push(e);let u=!o.length;for(let r=0;r<t.length;r++){let i=t[r];e.has(i)||(a.has(i)||(c.push(i),a.add(i)),f(n,i,r)),u&&i!==n[r]&&(u=!1)}return!c.length&&u?t:(r({list:n,added:o,removed:c,unchanged:l,finishRemoved:d}),i=e,n)})},t.appear?[]:n.slice())}function ft(...e){return fe(e)}var pt=e=>e instanceof Element;function mt(e,t){if(t(e))return e;if(typeof e==`function`&&!e.length)return mt(e(),t);if(Array.isArray(e)){let n=[];for(let r of e){let e=mt(r,t);e&&(Array.isArray(e)?n.push.apply(n,e):n.push(e))}return n.length?n:null}return null}function ht(e,t=pt,n=pt){let r=k(e),i=k(()=>mt(r(),t));return i.toArray=()=>{let e=i();return Array.isArray(e)?e:e?[e]:[]},i}function gt(e){return k(()=>{let t=e.name||`s`;return{enterActive:(e.enterActiveClass||t+`-enter-active`).split(` `),enter:(e.enterClass||t+`-enter`).split(` `),enterTo:(e.enterToClass||t+`-enter-to`).split(` `),exitActive:(e.exitActiveClass||t+`-exit-active`).split(` `),exit:(e.exitClass||t+`-exit`).split(` `),exitTo:(e.exitToClass||t+`-exit-to`).split(` `),move:(e.moveClass||t+`-move`).split(` `)}})}function _t(e){requestAnimationFrame(()=>requestAnimationFrame(e))}function vt(e,t,n,r){let{onBeforeEnter:i,onEnter:a,onAfterEnter:o}=t;i?.(n),n.classList.add(...e.enter),n.classList.add(...e.enterActive),queueMicrotask(()=>{if(!n.parentNode)return r?.();a?.(n,()=>s())}),_t(()=>{n.classList.remove(...e.enter),n.classList.add(...e.enterTo),(!a||a.length<2)&&(n.addEventListener(`transitionend`,s),n.addEventListener(`animationend`,s))});function s(t){t&&t.target!==n||(n.removeEventListener(`transitionend`,s),n.removeEventListener(`animationend`,s),n.classList.remove(...e.enterActive),n.classList.remove(...e.enterTo),o?.(n))}}function yt(e,t,n,r){let{onBeforeExit:i,onExit:a,onAfterExit:o}=t;if(!n.parentNode)return r?.();i?.(n),n.classList.add(...e.exit),n.classList.add(...e.exitActive),a?.(n,()=>s()),_t(()=>{n.classList.remove(...e.exit),n.classList.add(...e.exitTo),(!a||a.length<2)&&(n.addEventListener(`transitionend`,s),n.addEventListener(`animationend`,s))});function s(t){t&&t.target!==n||(r?.(),n.removeEventListener(`transitionend`,s),n.removeEventListener(`animationend`,s),n.classList.remove(...e.exitActive),n.classList.remove(...e.exitTo),o?.(n))}}var bt=e=>{let t=gt(e);return dt(ht(()=>e.children).toArray,{appear:e.appear,onChange({added:n,removed:r,finishRemoved:i,list:a}){let o=t();for(let t of n)vt(o,e,t);let s=[];for(let e of a)e.isConnected&&(e instanceof HTMLElement||e instanceof SVGElement)&&s.push({el:e,rect:e.getBoundingClientRect()});queueMicrotask(()=>{let e=[];for(let{el:t,rect:n}of s)if(t.isConnected){let r=t.getBoundingClientRect(),i=n.left-r.left,a=n.top-r.top;(i||a)&&(t.style.transform=`translate(${i}px, ${a}px)`,t.style.transitionDuration=`0s`,e.push(t))}document.body.offsetHeight;for(let t of e){let e=function(n){(n.target===t||/transform$/.test(n.propertyName))&&(t.removeEventListener(`transitionend`,e),t.classList.remove(...o.move))};t.classList.add(...o.move),t.style.transform=t.style.transitionDuration=``,t.addEventListener(`transitionend`,e)}});for(let t of r)yt(o,e,t,()=>i([t]))}})},xt=Symbol(`fallback`);function St(e){for(let t of e)t.dispose()}function Ct(e,t,n,r={}){let i=new Map;return P(()=>St(i.values())),()=>{let n=e()||[];return n[u],x(()=>{if(!n.length)return St(i.values()),i.clear(),r.fallback?[ie(e=>(i.set(xt,{dispose:e}),r.fallback()))]:[];let e=Array(n.length),o=i.get(xt);if(!i.size||o){o?.dispose(),i.delete(xt);for(let r=0;r<n.length;r++){let i=n[r],o=t(i,r);a(e,i,r,o)}return e}let s=new Set(i.keys());for(let r=0;r<n.length;r++){let o=n[r],c=t(o,r);s.delete(c);let l=i.get(c);l?(e[r]=l.mapped,l.setIndex?.(r),l.setItem(()=>o)):a(e,o,r,c)}for(let e of s)i.get(e)?.dispose(),i.delete(e);return e})};function a(e,t,r,a){ie(o=>{let[s,c]=I(t),l={setItem:c,dispose:o};if(n.length>1){let[e,t]=I(r);l.setIndex=t,l.mapped=n(s,e)}else l.mapped=n(s);i.set(a,l),e[r]=l.mapped})}}function wt(e){let{by:t}=e;return k(Ct(()=>e.each,typeof t==`function`?t:e=>e[t],e.children,`fallback`in e?{fallback:()=>e.fallback}:void 0))}function Tt(e,t,n,r){return e.addEventListener(t,n,r),he(e.removeEventListener.bind(e,t,n,r))}function Et(e,t,n,r){let i=()=>{pe(B(e)).forEach(e=>{e&&pe(B(t)).forEach(t=>Tt(e,t,n,r))})};typeof e==`function`?z(i):j(i)}function Dt(e,t){let n=new ResizeObserver(e);return P(n.disconnect.bind(n)),{observe:e=>n.observe(e,t),unobserve:n.unobserve.bind(n)}}function Ot(e,t,n){let r=new WeakMap,{observe:i,unobserve:a}=Dt(e=>{for(let n of e){let{contentRect:e,target:i}=n,a=Math.round(e.width),o=Math.round(e.height),s=r.get(i);s&&s.width===a&&s.height===o||(t(e,i,n),r.set(i,{width:a,height:o}))}},n);z(t=>{let n=de(pe(B(e)));return ge(n,t,i,a),n},[])}var kt=/((?:--)?(?:\w+-?)+)\s*:\s*([^;]*)/g;function At(e){let t={},n;for(;n=kt.exec(e);)t[n[1]]=n[2];return t}function jt(e,t){if(typeof e==`string`){if(typeof t==`string`)return`${e};${t}`;e=At(e)}else typeof t==`string`&&(t=At(t));return{...e,...t}}function Mt(e,t,n=-1){return n in e?[...e.slice(0,n),t,...e.slice(n)]:[...e,t]}function Nt(e,t){let n=[...e],r=n.indexOf(t);return r!==-1&&n.splice(r,1),n}function Pt(e){return typeof e==`number`}function Ft(e){return Object.prototype.toString.call(e)===`[object String]`}function It(e){return typeof e==`function`}function Lt(e){return t=>`${e()}-${t}`}function Rt(e,t){return e?e===t||e.contains(t):!1}function zt(e,t=!1){let{activeElement:n}=Vt(e);if(!n?.nodeName)return null;if(Ht(n)&&n.contentDocument)return zt(n.contentDocument.body,t);if(t){let e=n.getAttribute(`aria-activedescendant`);if(e){let t=Vt(n).getElementById(e);if(t)return t}}return n}function Bt(e){return Vt(e).defaultView||window}function Vt(e){return e?e.ownerDocument||e:document}function Ht(e){return e.tagName===`IFRAME`}var Ut=(e=>(e.Escape=`Escape`,e.Enter=`Enter`,e.Tab=`Tab`,e.Space=` `,e.ArrowDown=`ArrowDown`,e.ArrowLeft=`ArrowLeft`,e.ArrowRight=`ArrowRight`,e.ArrowUp=`ArrowUp`,e.End=`End`,e.Home=`Home`,e.PageDown=`PageDown`,e.PageUp=`PageUp`,e))(Ut||{});function Wt(e){return typeof window<`u`&&window.navigator!=null&&e.test(window.navigator.userAgentData?.platform||window.navigator.platform)}function Gt(){return Wt(/^Mac/i)}function Kt(){return Wt(/^iPhone/i)}function qt(){return Wt(/^iPad/i)||Gt()&&navigator.maxTouchPoints>1}function Jt(){return Kt()||qt()}function Yt(){return Gt()||Jt()}function K(e,t){return t&&(It(t)?t(e):t[0](t[1],e)),e?.defaultPrevented}function q(e){return t=>{for(let n of e)K(t,n)}}function Xt(e){return Gt()?e.metaKey&&!e.ctrlKey:e.ctrlKey&&!e.metaKey}function J(e){if(e){if(Qt())e.focus({preventScroll:!0});else{let t=$t(e);e.focus(),en(t)}}}var Zt=null;function Qt(){if(Zt==null){Zt=!1;try{document.createElement(`div`).focus({get preventScroll(){return Zt=!0,!0}})}catch{}}return Zt}function $t(e){let t=e.parentNode,n=[],r=document.scrollingElement||document.documentElement;for(;t instanceof HTMLElement&&t!==r;)(t.offsetHeight<t.scrollHeight||t.offsetWidth<t.scrollWidth)&&n.push({element:t,scrollTop:t.scrollTop,scrollLeft:t.scrollLeft}),t=t.parentNode;return r instanceof HTMLElement&&n.push({element:r,scrollTop:r.scrollTop,scrollLeft:r.scrollLeft}),n}function en(e){for(let{element:t,scrollTop:n,scrollLeft:r}of e)t.scrollTop=n,t.scrollLeft=r}var tn=[`input:not([type='hidden']):not([disabled])`,`select:not([disabled])`,`textarea:not([disabled])`,`button:not([disabled])`,`a[href]`,`area[href]`,`[tabindex]`,`iframe`,`object`,`embed`,`audio[controls]`,`video[controls]`,`[contenteditable]:not([contenteditable='false'])`],nn=[...tn,`[tabindex]:not([tabindex="-1"]):not([disabled])`],rn=`${tn.join(`:not([hidden]),`)},[tabindex]:not([disabled]):not([hidden])`,an=nn.join(`:not([hidden]):not([tabindex="-1"]),`);function on(e,t){let n=Array.from(e.querySelectorAll(rn)).filter(sn);return t&&sn(e)&&n.unshift(e),n.forEach((e,t)=>{if(Ht(e)&&e.contentDocument){let r=e.contentDocument.body,i=on(r,!1);n.splice(t,1,...i)}}),n}function sn(e){return cn(e)&&!ln(e)}function cn(e){return e.matches(rn)&&un(e)}function ln(e){return Number.parseInt(e.getAttribute(`tabindex`)||`0`,10)<0}function un(e,t){return e.nodeName!==`#comment`&&dn(e)&&fn(e,t)&&(!e.parentElement||un(e.parentElement,e))}function dn(e){if(!(e instanceof HTMLElement)&&!(e instanceof SVGElement))return!1;let{display:t,visibility:n}=e.style,r=t!==`none`&&n!==`hidden`&&n!==`collapse`;if(r){if(!e.ownerDocument.defaultView)return r;let{getComputedStyle:t}=e.ownerDocument.defaultView,{display:n,visibility:i}=t(e);r=n!==`none`&&i!==`hidden`&&i!==`collapse`}return r}function fn(e,t){return!e.hasAttribute(`hidden`)&&(e.nodeName===`DETAILS`&&t&&t.nodeName!==`SUMMARY`?e.hasAttribute(`open`):!0)}function pn(e,t,n){let r=t?.tabbable?an:rn,i=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode(e){return t?.from?.contains(e)?NodeFilter.FILTER_REJECT:e.matches(r)&&un(e)&&(!t?.accept||t.accept(e))?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}});return t?.from&&(i.currentNode=t.from),i}function mn(e){let t=e;for(;t&&!hn(t);)t=t.parentElement;return t||document.scrollingElement||document.documentElement}function hn(e){let t=window.getComputedStyle(e);return/(auto|scroll)/.test(t.overflow+t.overflowX+t.overflowY)}function gn(){}function _n(e,t){let[n,r]=e,i=!1,a=t.length;for(let e=a,o=0,s=e-1;o<e;s=o++){let[a,c]=t[o],[l,u]=t[s],[,d]=t[s===0?e-1:s-1]||[0,0],f=(c-u)*(n-a)-(a-l)*(r-c);if(u<c){if(r>=u&&r<c){if(f===0)return!0;f>0&&(r===u?r>d&&(i=!i):i=!i)}}else if(c<u){if(r>c&&r<=u){if(f===0)return!0;f<0&&(r===u?r<d&&(i=!i):i=!i)}}else if(r===c&&(n>=l&&n<=a||n>=a&&n<=l))return!0}return i}function Y(e,t){return m(e,t)}var vn=new Map,yn=new Set;function bn(){if(typeof window>`u`)return;let e=e=>{if(!e.target)return;let n=vn.get(e.target);n||(n=new Set,vn.set(e.target,n),e.target.addEventListener(`transitioncancel`,t)),n.add(e.propertyName)},t=e=>{if(!e.target)return;let n=vn.get(e.target);if(n&&(n.delete(e.propertyName),n.size===0&&(e.target.removeEventListener(`transitioncancel`,t),vn.delete(e.target)),vn.size===0)){for(let e of yn)e();yn.clear()}};document.body.addEventListener(`transitionrun`,e),document.body.addEventListener(`transitionend`,t)}typeof document<`u`&&(document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,bn):bn());function xn(e,t){let n=Sn(e,t,`left`),r=Sn(e,t,`top`),i=t.offsetWidth,a=t.offsetHeight,o=e.scrollLeft,s=e.scrollTop,c=o+e.offsetWidth,l=s+e.offsetHeight;n<=o?o=n:n+i>c&&(o+=n+i-c),r<=s?s=r:r+a>l&&(s+=r+a-l),e.scrollLeft=o,e.scrollTop=s}function Sn(e,t,n){let r=n===`left`?`offsetLeft`:`offsetTop`,i=0;for(;t.offsetParent&&(i+=t[r],t.offsetParent!==e);){if(t.offsetParent.contains(e)){i-=e[r];break}t=t.offsetParent}return i}function Cn(e,t){if(document.contains(e)){let t=document.scrollingElement||document.documentElement;if(window.getComputedStyle(t).overflow!==`hidden`){let{left:t,top:n}=e.getBoundingClientRect();e?.scrollIntoView?.({block:`nearest`});let{left:r,top:i}=e.getBoundingClientRect();(Math.abs(t-r)>1||Math.abs(n-i)>1)&&e.scrollIntoView?.({block:`nearest`})}else{let n=mn(e);for(;e&&n&&e!==t&&n!==t;)xn(n,e),e=n,n=mn(e)}}}var wn={border:`0`,clip:`rect(0 0 0 0)`,"clip-path":`inset(50%)`,height:`1px`,margin:`0 -1px -1px 0`,overflow:`hidden`,padding:`0`,position:`absolute`,width:`1px`,"white-space":`nowrap`};function Tn(e,t){let[n,r]=I(En(t?.()));return z(()=>{r(e()?.tagName.toLowerCase()||En(t?.()))}),n}function En(e){return Ft(e)?e:void 0}function X(e){let[t,n]=d(e,[`as`]);if(!t.as)throw Error("[kobalte]: Polymorphic is missing the required `as` prop.");return R(w,m(n,{get component(){return t.as}}))}var Dn=Object.defineProperty,On=(e,t)=>{for(var n in t)Dn(e,n,{get:t[n],enumerable:!0})};On({},{Button:()=>Mn,Root:()=>jn});var kn=[`button`,`color`,`file`,`image`,`reset`,`submit`];function An(e){let t=e.tagName.toLowerCase();return t===`button`?!0:t===`input`&&e.type?kn.indexOf(e.type)!==-1:!1}function jn(e){let t,n=Y({type:`button`},e),[r,i]=d(n,[`ref`,`type`,`disabled`]),a=Tn(()=>t,()=>`button`),o=k(()=>{let e=a();return e!=null&&An({tagName:e,type:r.type})}),s=k(()=>a()===`input`),c=k(()=>a()===`a`&&t?.getAttribute(`href`)!=null);return R(X,m({as:`button`,ref(e){let n=ft(e=>t=e,r.ref);typeof n==`function`&&n(e)},get type(){return o()||s()?r.type:void 0},get role(){return!o()&&!c()?`button`:void 0},get tabIndex(){return!o()&&!c()&&!r.disabled?0:void 0},get disabled(){return o()||s()?r.disabled:void 0},get"aria-disabled"(){return!o()&&!s()&&r.disabled?!0:void 0},get"data-disabled"(){return r.disabled?``:void 0}},i))}var Mn=jn;function Nn(e){let[t,n]=I(e.defaultValue?.()),r=k(()=>e.value?.()!==void 0),i=k(()=>r()?e.value?.():t());return[i,t=>{x(()=>{let a=me(t,i());return Object.is(a,i())||(r()||n(a),e.onChange?.(a)),a})}]}function Pn(e){let[t,n]=Nn(e);return[()=>t()??!1,n]}function Fn(e){let[t,n]=Nn(e);return[()=>t()??[],n]}function In(e={}){let[t,n]=Pn({value:()=>B(e.isSelected),defaultValue:()=>!!B(e.defaultIsSelected),onChange:t=>e.onSelectedChange?.(t)});return{isSelected:t,setIsSelected:t=>{!B(e.isReadOnly)&&!B(e.isDisabled)&&n(t)},toggle:()=>{!B(e.isReadOnly)&&!B(e.isDisabled)&&n(!t())}}}function Ln(e){let t=e.startIndex??0,n=e.startLevel??0,r=[],i=t=>{if(t==null)return``;let n=e.getKey??`key`,r=Ft(n)?t[n]:n(t);return r==null?``:String(r)},a=t=>{if(t==null)return``;let n=e.getTextValue??`textValue`,r=Ft(n)?t[n]:n(t);return r==null?``:String(r)},o=t=>{if(t==null)return!1;let n=e.getDisabled??`disabled`;return(Ft(n)?t[n]:n(t))??!1},s=t=>{if(t!=null)return Ft(e.getSectionChildren)?t[e.getSectionChildren]:e.getSectionChildren?.(t)};for(let c of e.dataSource)if(Ft(c)||Pt(c))r.push({type:`item`,rawValue:c,key:String(c),textValue:String(c),disabled:o(c),level:n,index:t}),t++;else if(s(c)!=null){r.push({type:`section`,rawValue:c,key:``,textValue:``,disabled:!1,level:n,index:t}),t++;let i=s(c)??[];if(i.length>0){let a=Ln({dataSource:i,getKey:e.getKey,getTextValue:e.getTextValue,getDisabled:e.getDisabled,getSectionChildren:e.getSectionChildren,startIndex:t,startLevel:n+1});r.push(...a),t+=a.length}}else r.push({type:`item`,rawValue:c,key:i(c),textValue:a(c),disabled:o(c),level:n,index:t}),t++;return r}function Rn(e,t=[]){return k(()=>{let n=Ln({dataSource:B(e.dataSource),getKey:B(e.getKey),getTextValue:B(e.getTextValue),getDisabled:B(e.getDisabled),getSectionChildren:B(e.getSectionChildren)});for(let e=0;e<t.length;e++)t[e]();return e.factory(n)})}var zn=new Set([`Avst`,`Arab`,`Armi`,`Syrc`,`Samr`,`Mand`,`Thaa`,`Mend`,`Nkoo`,`Adlm`,`Rohg`,`Hebr`]),Bn=new Set([`ae`,`ar`,`arc`,`bcc`,`bqi`,`ckb`,`dv`,`fa`,`glk`,`he`,`ku`,`mzn`,`nqo`,`pnb`,`ps`,`sd`,`ug`,`ur`,`yi`]);function Vn(e){if(Intl.Locale){let t=new Intl.Locale(e).maximize().script??``;return zn.has(t)}let t=e.split(`-`)[0];return Bn.has(t)}function Hn(e){return Vn(e)?`rtl`:`ltr`}function Un(){let e=typeof navigator<`u`&&(navigator.language||navigator.userLanguage)||`en-US`;return{locale:e,direction:Hn(e)}}var Wn=Un(),Gn=new Set;function Kn(){Wn=Un();for(let e of Gn)e(Wn)}function qn(){let[e,t]=I(Wn),n=k(()=>e());return f(()=>{Gn.size===0&&window.addEventListener(`languagechange`,Kn),Gn.add(t),P(()=>{Gn.delete(t),Gn.size===0&&window.removeEventListener(`languagechange`,Kn)})}),{locale:()=>n().locale,direction:()=>n().direction}}var Jn=F();function Yn(){let e=qn();return S(Jn)||e}var Xn=new Map;function Zn(e){let{locale:t}=Yn(),n=k(()=>t()+(e?Object.entries(e).sort((e,t)=>e[0]<t[0]?-1:1).join():``));return k(()=>{let r=n(),i;return Xn.has(r)&&(i=Xn.get(r)),i||(i=new Intl.Collator(t(),e),Xn.set(r,i)),i})}var Qn=class e extends Set{anchorKey;currentKey;constructor(t,n,r){super(t),t instanceof e?(this.anchorKey=n||t.anchorKey,this.currentKey=r||t.currentKey):(this.anchorKey=n,this.currentKey=r)}};function $n(e){let[t,n]=Nn(e);return[()=>t()??new Qn,n]}function er(e){return Yt()?e.altKey:e.ctrlKey}function tr(e){return Gt()?e.metaKey:e.ctrlKey}function nr(e){return new Qn(e)}function rr(e,t){if(e.size!==t.size)return!1;for(let n of e)if(!t.has(n))return!1;return!0}function ir(e){let t=Y({selectionMode:`none`,selectionBehavior:`toggle`},e),[n,r]=I(!1),[i,a]=I(),[o,s]=$n({value:k(()=>{let e=B(t.selectedKeys);return e==null?e:nr(e)}),defaultValue:k(()=>{let e=B(t.defaultSelectedKeys);return e==null?new Qn:nr(e)}),onChange:e=>t.onSelectionChange?.(e)}),[c,l]=I(B(t.selectionBehavior));return z(()=>{let e=o();B(t.selectionBehavior)===`replace`&&c()===`toggle`&&typeof e==`object`&&e.size===0&&l(`replace`)}),z(()=>{l(B(t.selectionBehavior)??`toggle`)}),{selectionMode:()=>B(t.selectionMode),disallowEmptySelection:()=>B(t.disallowEmptySelection)??!1,selectionBehavior:c,setSelectionBehavior:l,isFocused:n,setFocused:r,focusedKey:i,setFocusedKey:a,selectedKeys:o,setSelectedKeys:e=>{(B(t.allowDuplicateSelectionEvents)||!rr(e,o()))&&s(e)}}}function ar(e){let[t,n]=I(``),[r,i]=I(-1);return{typeSelectHandlers:{onKeyDown:a=>{if(B(e.isDisabled))return;let o=B(e.keyboardDelegate),s=B(e.selectionManager);if(!o.getKeyForSearch)return;let c=or(a.key);if(!c||a.ctrlKey||a.metaKey)return;c===` `&&t().trim().length>0&&(a.preventDefault(),a.stopPropagation());let l=n(e=>e+c),u=o.getKeyForSearch(l,s.focusedKey())??o.getKeyForSearch(l);u==null&&sr(l)&&(l=l[0],u=o.getKeyForSearch(l,s.focusedKey())??o.getKeyForSearch(l)),u!=null&&(s.setFocusedKey(u),e.onTypeSelect?.(u)),clearTimeout(r()),i(window.setTimeout(()=>n(``),500))}}}}function or(e){return e.length===1||!/^[A-Z]/i.test(e)?e:``}function sr(e){return e.split(``).every(t=>t===e[0])}function cr(e,n,r){let i=m({selectOnFocus:()=>B(e.selectionManager).selectionBehavior()===`replace`},e),a=()=>n(),{direction:o}=Yn(),s={top:0,left:0};Et(()=>B(i.isVirtualized)?void 0:a(),`scroll`,()=>{let e=a();e&&(s={top:e.scrollTop,left:e.scrollLeft})});let{typeSelectHandlers:c}=ar({isDisabled:()=>B(i.disallowTypeAhead),keyboardDelegate:()=>B(i.keyboardDelegate),selectionManager:()=>B(i.selectionManager)}),l=()=>B(i.orientation)??`vertical`,u=e=>{K(e,c.onKeyDown),e.altKey&&e.key===`Tab`&&e.preventDefault();let t=n();if(!t?.contains(e.target))return;let r=B(i.selectionManager),a=B(i.selectOnFocus),s=t=>{t!=null&&(r.setFocusedKey(t),e.shiftKey&&r.selectionMode()===`multiple`?r.extendSelection(t):a&&!er(e)&&r.replaceSelection(t))},u=B(i.keyboardDelegate),d=B(i.shouldFocusWrap),f=r.focusedKey();switch(e.key){case l()===`vertical`?`ArrowDown`:`ArrowRight`:if(u.getKeyBelow){e.preventDefault();let t;t=f==null?u.getFirstKey?.():u.getKeyBelow(f),t==null&&d&&(t=u.getFirstKey?.(f)),s(t)}break;case l()===`vertical`?`ArrowUp`:`ArrowLeft`:if(u.getKeyAbove){e.preventDefault();let t;t=f==null?u.getLastKey?.():u.getKeyAbove(f),t==null&&d&&(t=u.getLastKey?.(f)),s(t)}break;case l()===`vertical`?`ArrowLeft`:`ArrowUp`:if(u.getKeyLeftOf){e.preventDefault();let t=o()===`rtl`,n;n=f==null?t?u.getFirstKey?.():u.getLastKey?.():u.getKeyLeftOf(f),s(n)}break;case l()===`vertical`?`ArrowRight`:`ArrowDown`:if(u.getKeyRightOf){e.preventDefault();let t=o()===`rtl`,n;n=f==null?t?u.getLastKey?.():u.getFirstKey?.():u.getKeyRightOf(f),s(n)}break;case`Home`:if(u.getFirstKey){e.preventDefault();let t=u.getFirstKey(f,tr(e));t!=null&&(r.setFocusedKey(t),tr(e)&&e.shiftKey&&r.selectionMode()===`multiple`?r.extendSelection(t):a&&r.replaceSelection(t))}break;case`End`:if(u.getLastKey){e.preventDefault();let t=u.getLastKey(f,tr(e));t!=null&&(r.setFocusedKey(t),tr(e)&&e.shiftKey&&r.selectionMode()===`multiple`?r.extendSelection(t):a&&r.replaceSelection(t))}break;case`PageDown`:u.getKeyPageBelow&&f!=null&&(e.preventDefault(),s(u.getKeyPageBelow(f)));break;case`PageUp`:u.getKeyPageAbove&&f!=null&&(e.preventDefault(),s(u.getKeyPageAbove(f)));break;case`a`:tr(e)&&r.selectionMode()===`multiple`&&B(i.disallowSelectAll)!==!0&&(e.preventDefault(),r.selectAll());break;case`Escape`:e.defaultPrevented||(e.preventDefault(),B(i.disallowEmptySelection)||r.clearSelection());break;case`Tab`:if(!B(i.allowsTabNavigation)){if(e.shiftKey)t.focus();else{let e=pn(t,{tabbable:!0}),n,r;do r=e.lastChild(),r&&(n=r);while(r);n&&!n.contains(document.activeElement)&&J(n)}break}}},d=e=>{let t=B(i.selectionManager),n=B(i.keyboardDelegate),r=B(i.selectOnFocus);if(t.isFocused())e.currentTarget.contains(e.target)||t.setFocused(!1);else if(e.currentTarget.contains(e.target)){if(t.setFocused(!0),t.focusedKey()==null){let i=e=>{e!=null&&(t.setFocusedKey(e),r&&t.replaceSelection(e))},a=e.relatedTarget;a&&e.currentTarget.compareDocumentPosition(a)&Node.DOCUMENT_POSITION_FOLLOWING?i(t.lastSelectedKey()??n.getLastKey?.()):i(t.firstSelectedKey()??n.getFirstKey?.())}else if(!B(i.isVirtualized)){let e=a();if(e){e.scrollTop=s.top,e.scrollLeft=s.left;let n=e.querySelector(`[data-key="${t.focusedKey()}"]`);n&&(J(n),xn(e,n))}}}},p=e=>{let t=B(i.selectionManager);e.currentTarget.contains(e.relatedTarget)||t.setFocused(!1)},h=e=>{a()===e.target&&e.preventDefault()},g=()=>{let e=B(i.autoFocus);if(!e)return;let t=B(i.selectionManager),r=B(i.keyboardDelegate),a;e===`first`&&(a=r.getFirstKey?.()),e===`last`&&(a=r.getLastKey?.());let o=t.selectedKeys();o.size&&(a=o.values().next().value),t.setFocused(!0),t.setFocusedKey(a);let s=n();s&&a==null&&!B(i.shouldUseVirtualFocus)&&J(s)};return f(()=>{i.deferAutoFocus?setTimeout(g,0):g()}),z(t([a,()=>B(i.isVirtualized),()=>B(i.selectionManager).focusedKey()],e=>{let[t,n,r]=e;if(n)r&&i.scrollToKey?.(r);else if(r&&t){let e=t.querySelector(`[data-key="${r}"]`);e&&xn(t,e)}})),{tabIndex:k(()=>{if(!B(i.shouldUseVirtualFocus))return B(i.selectionManager).focusedKey()==null?0:-1}),onKeyDown:u,onMouseDown:h,onFocusIn:d,onFocusOut:p}}function lr(e,n){let r=()=>B(e.selectionManager),i=()=>B(e.key),a=()=>B(e.shouldUseVirtualFocus),o=e=>{r().selectionMode()!==`none`&&(r().selectionMode()===`single`?r().isSelected(i())&&!r().disallowEmptySelection()?r().toggleSelection(i()):r().replaceSelection(i()):e?.shiftKey?r().extendSelection(i()):r().selectionBehavior()===`toggle`||tr(e)||`pointerType`in e&&e.pointerType===`touch`?r().toggleSelection(i()):r().replaceSelection(i()))},s=()=>r().isSelected(i()),c=()=>B(e.disabled)||r().isDisabled(i()),l=()=>!c()&&r().canSelectItem(i()),u=null,d=t=>{l()&&(u=t.pointerType,t.pointerType===`mouse`&&t.button===0&&!B(e.shouldSelectOnPressUp)&&o(t))},f=t=>{l()&&t.pointerType===`mouse`&&t.button===0&&B(e.shouldSelectOnPressUp)&&B(e.allowsDifferentPressOrigin)&&o(t)},p=t=>{l()&&(B(e.shouldSelectOnPressUp)&&!B(e.allowsDifferentPressOrigin)||u!==`mouse`)&&o(t)},m=e=>{l()&&[`Enter`,` `].includes(e.key)&&(er(e)?r().toggleSelection(i()):o(e))},h=e=>{c()&&e.preventDefault()},g=e=>{let t=n();a()||c()||!t||e.target===t&&r().setFocusedKey(i())},_=k(()=>{if(!(a()||c()))return i()===r().focusedKey()?0:-1}),v=k(()=>B(e.virtualized)?void 0:i());return z(t([n,i,a,()=>r().focusedKey(),()=>r().isFocused()],([t,n,r,i,a])=>{t&&n===i&&a&&!r&&document.activeElement!==t&&(e.focus?e.focus():J(t))})),{isSelected:s,isDisabled:c,allowsSelection:l,tabIndex:_,dataKey:v,onPointerDown:d,onPointerUp:f,onClick:p,onKeyDown:m,onMouseDown:h,onFocus:g}}var ur=class{collection;state;constructor(e,t){this.collection=e,this.state=t}selectionMode(){return this.state.selectionMode()}disallowEmptySelection(){return this.state.disallowEmptySelection()}selectionBehavior(){return this.state.selectionBehavior()}setSelectionBehavior(e){this.state.setSelectionBehavior(e)}isFocused(){return this.state.isFocused()}setFocused(e){this.state.setFocused(e)}focusedKey(){return this.state.focusedKey()}setFocusedKey(e){(e==null||this.collection().getItem(e))&&this.state.setFocusedKey(e)}selectedKeys(){return this.state.selectedKeys()}isSelected(e){if(this.state.selectionMode()===`none`)return!1;let t=this.getKey(e);return t!=null&&this.state.selectedKeys().has(t)}isEmpty(){return this.state.selectedKeys().size===0}isSelectAll(){if(this.isEmpty())return!1;let e=this.state.selectedKeys();return this.getAllSelectableKeys().every(t=>e.has(t))}firstSelectedKey(){let e;for(let t of this.state.selectedKeys()){let n=this.collection().getItem(t),r=n?.index!=null&&e?.index!=null&&n.index<e.index;(!e||r)&&(e=n)}return e?.key}lastSelectedKey(){let e;for(let t of this.state.selectedKeys()){let n=this.collection().getItem(t),r=n?.index!=null&&e?.index!=null&&n.index>e.index;(!e||r)&&(e=n)}return e?.key}extendSelection(e){if(this.selectionMode()===`none`)return;if(this.selectionMode()===`single`){this.replaceSelection(e);return}let t=this.getKey(e);if(t==null)return;let n=this.state.selectedKeys(),r=n.anchorKey||t,i=new Qn(n,r,t);for(let e of this.getKeyRange(r,n.currentKey||t))i.delete(e);for(let e of this.getKeyRange(t,r))this.canSelectItem(e)&&i.add(e);this.state.setSelectedKeys(i)}getKeyRange(e,t){let n=this.collection().getItem(e),r=this.collection().getItem(t);return n&&r?n.index!=null&&r.index!=null&&n.index<=r.index?this.getKeyRangeInternal(e,t):this.getKeyRangeInternal(t,e):[]}getKeyRangeInternal(e,t){let n=[],r=e;for(;r!=null;){let e=this.collection().getItem(r);if(e&&e.type===`item`&&n.push(r),r===t)return n;r=this.collection().getKeyAfter(r)}return[]}getKey(e){let t=this.collection().getItem(e);return t?!t||t.type!==`item`?null:t.key:e}toggleSelection(e){if(this.selectionMode()===`none`)return;if(this.selectionMode()===`single`&&!this.isSelected(e)){this.replaceSelection(e);return}let t=this.getKey(e);if(t==null)return;let n=new Qn(this.state.selectedKeys());n.has(t)?n.delete(t):this.canSelectItem(t)&&(n.add(t),n.anchorKey=t,n.currentKey=t),this.disallowEmptySelection()&&n.size===0||this.state.setSelectedKeys(n)}replaceSelection(e){if(this.selectionMode()===`none`)return;let t=this.getKey(e);if(t==null)return;let n=this.canSelectItem(t)?new Qn([t],t,t):new Qn;this.state.setSelectedKeys(n)}setSelectedKeys(e){if(this.selectionMode()===`none`)return;let t=new Qn;for(let n of e){let e=this.getKey(n);if(e!=null&&(t.add(e),this.selectionMode()===`single`))break}this.state.setSelectedKeys(t)}selectAll(){this.selectionMode()===`multiple`&&this.state.setSelectedKeys(new Set(this.getAllSelectableKeys()))}clearSelection(){let e=this.state.selectedKeys();!this.disallowEmptySelection()&&e.size>0&&this.state.setSelectedKeys(new Qn)}toggleSelectAll(){this.isSelectAll()?this.clearSelection():this.selectAll()}select(e,t){this.selectionMode()!==`none`&&(this.selectionMode()===`single`?this.isSelected(e)&&!this.disallowEmptySelection()?this.toggleSelection(e):this.replaceSelection(e):this.selectionBehavior()===`toggle`||t&&t.pointerType===`touch`?this.toggleSelection(e):this.replaceSelection(e))}isSelectionEqual(e){if(e===this.state.selectedKeys())return!0;let t=this.selectedKeys();if(e.size!==t.size)return!1;for(let n of e)if(!t.has(n))return!1;for(let n of t)if(!e.has(n))return!1;return!0}canSelectItem(e){if(this.state.selectionMode()===`none`)return!1;let t=this.collection().getItem(e);return t!=null&&!t.disabled}isDisabled(e){let t=this.collection().getItem(e);return!t||t.disabled}getAllSelectableKeys(){let e=[];return(t=>{for(;t!=null;){if(this.canSelectItem(t)){let n=this.collection().getItem(t);if(!n)continue;n.type===`item`&&e.push(t)}t=this.collection().getKeyAfter(t)}})(this.collection().getFirstKey()),e}},dr=class{keyMap=new Map;iterable;firstKey;lastKey;constructor(e){this.iterable=e;for(let t of e)this.keyMap.set(t.key,t);if(this.keyMap.size===0)return;let t,n=0;for(let[e,r]of this.keyMap)t?(t.nextKey=e,r.prevKey=t.key):(this.firstKey=e,r.prevKey=void 0),r.type===`item`&&(r.index=n++),t=r,t.nextKey=void 0;this.lastKey=t.key}*[Symbol.iterator](){yield*this.iterable}getSize(){return this.keyMap.size}getKeys(){return this.keyMap.keys()}getKeyBefore(e){return this.keyMap.get(e)?.prevKey}getKeyAfter(e){return this.keyMap.get(e)?.nextKey}getFirstKey(){return this.firstKey}getLastKey(){return this.lastKey}getItem(e){return this.keyMap.get(e)}at(e){let t=[...this.getKeys()];return this.getItem(t[e])}};function fr(e){let t=ir(e),n=Rn({dataSource:()=>B(e.dataSource),getKey:()=>B(e.getKey),getTextValue:()=>B(e.getTextValue),getDisabled:()=>B(e.getDisabled),getSectionChildren:()=>B(e.getSectionChildren),factory:t=>e.filter?new dr(e.filter(t)):new dr(t)},[()=>e.filter]),r=new ur(n,t);return O(()=>{let e=t.focusedKey();e!=null&&!n().getItem(e)&&t.setFocusedKey(void 0)}),{collection:n,selectionManager:()=>r}}var pr=F();function mr(){return S(pr)}function hr(){let e=mr();if(e===void 0)throw Error("[kobalte]: `useDomCollectionContext` must be used within a `DomCollectionProvider` component");return e}function gr(e,t){return!!(t.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_PRECEDING)}function _r(e,t){let n=t.ref();if(!n)return-1;let r=e.length;if(!r)return-1;for(;r--;){let t=e[r]?.ref();if(t&&gr(t,n))return r+1}return 0}function vr(e){let t=e.map((e,t)=>[t,e]),n=!1;return t.sort(([e,t],[r,i])=>{let a=t.ref(),o=i.ref();return a===o||!a||!o?0:gr(a,o)?(e>r&&(n=!0),-1):(e<r&&(n=!0),1)}),n?t.map(([e,t])=>t):e}function yr(e,t){let n=vr(e);e!==n&&t(n)}function br(e){let t=e[0],n=e[e.length-1]?.ref(),r=t?.ref()?.parentElement;for(;r;){if(n&&r.contains(n))return r;r=r.parentElement}return Vt(r).body}function xr(e,t){z(()=>{let n=setTimeout(()=>{yr(e(),t)});P(()=>clearTimeout(n))})}function Sr(e,t){if(typeof IntersectionObserver!=`function`){xr(e,t);return}let n=[];z(()=>{let r=()=>{let r=!!n.length;n=e(),r&&yr(e(),t)},i=br(e()),a=new IntersectionObserver(r,{root:i});for(let t of e()){let e=t.ref();e&&a.observe(e)}P(()=>a.disconnect())})}function Cr(e={}){let[t,n]=Fn({value:()=>B(e.items),onChange:t=>e.onItemsChange?.(t)});Sr(t,n);let r=e=>(n(t=>Mt(t,e,_r(t,e))),()=>{n(t=>{let n=t.filter(t=>t.ref()!==e.ref());return t.length===n.length?t:n})});return{DomCollectionProvider:e=>R(pr.Provider,{value:{registerItem:r},get children(){return e.children}})}}function wr(e){let t=hr(),n=Y({shouldRegisterItem:!0},e);z(()=>{if(!n.shouldRegisterItem)return;let e=t.registerItem(n.getItem());P(e)})}var Tr=[`top`,`right`,`bottom`,`left`],Er=Math.min,Dr=Math.max,Or=Math.round,kr=Math.floor,Ar=e=>({x:e,y:e}),jr={left:`right`,right:`left`,bottom:`top`,top:`bottom`};function Mr(e,t,n){return Dr(e,Er(t,n))}function Nr(e,t){return typeof e==`function`?e(t):e}function Pr(e){return e.split(`-`)[0]}function Fr(e){return e.split(`-`)[1]}function Ir(e){return e===`x`?`y`:`x`}function Lr(e){return e===`y`?`height`:`width`}function Rr(e){let t=e[0];return t===`t`||t===`b`?`y`:`x`}function zr(e){return Ir(Rr(e))}function Br(e,t,n){n===void 0&&(n=!1);let r=Fr(e),i=zr(e),a=Lr(i),o=i===`x`?r===(n?`end`:`start`)?`right`:`left`:r===`start`?`bottom`:`top`;return t.reference[a]>t.floating[a]&&(o=Yr(o)),[o,Yr(o)]}function Vr(e){let t=Yr(e);return[Hr(e),t,Hr(t)]}function Hr(e){return e.includes(`start`)?e.replace(`start`,`end`):e.replace(`end`,`start`)}var Ur=[`left`,`right`],Wr=[`right`,`left`],Gr=[`top`,`bottom`],Kr=[`bottom`,`top`];function qr(e,t,n){switch(e){case`top`:case`bottom`:return n?t?Wr:Ur:t?Ur:Wr;case`left`:case`right`:return t?Gr:Kr;default:return[]}}function Jr(e,t,n,r){let i=Fr(e),a=qr(Pr(e),n===`start`,r);return i&&(a=a.map(e=>e+`-`+i),t&&(a=a.concat(a.map(Hr)))),a}function Yr(e){let t=Pr(e);return jr[t]+e.slice(t.length)}function Xr(e){return{top:0,right:0,bottom:0,left:0,...e}}function Zr(e){return typeof e==`number`?{top:e,right:e,bottom:e,left:e}:Xr(e)}function Qr(e){let{x:t,y:n,width:r,height:i}=e;return{width:r,height:i,top:n,left:t,right:t+r,bottom:n+i,x:t,y:n}}function $r(e,t,n){let{reference:r,floating:i}=e,a=Rr(t),o=zr(t),s=Lr(o),c=Pr(t),l=a===`y`,u=r.x+r.width/2-i.width/2,d=r.y+r.height/2-i.height/2,f=r[s]/2-i[s]/2,p;switch(c){case`top`:p={x:u,y:r.y-i.height};break;case`bottom`:p={x:u,y:r.y+r.height};break;case`right`:p={x:r.x+r.width,y:d};break;case`left`:p={x:r.x-i.width,y:d};break;default:p={x:r.x,y:r.y}}switch(Fr(t)){case`start`:p[o]-=f*(n&&l?-1:1);break;case`end`:p[o]+=f*(n&&l?-1:1)}return p}async function ei(e,t){t===void 0&&(t={});let{x:n,y:r,platform:i,rects:a,elements:o,strategy:s}=e,{boundary:c=`clippingAncestors`,rootBoundary:l=`viewport`,elementContext:u=`floating`,altBoundary:d=!1,padding:f=0}=Nr(t,e),p=Zr(f),m=o[d?u===`floating`?`reference`:`floating`:u],h=Qr(await i.getClippingRect({element:await(i.isElement==null?void 0:i.isElement(m))??!0?m:m.contextElement||await(i.getDocumentElement==null?void 0:i.getDocumentElement(o.floating)),boundary:c,rootBoundary:l,strategy:s})),g=u===`floating`?{x:n,y:r,width:a.floating.width,height:a.floating.height}:a.reference,_=await(i.getOffsetParent==null?void 0:i.getOffsetParent(o.floating)),v=await(i.isElement==null?void 0:i.isElement(_))&&await(i.getScale==null?void 0:i.getScale(_))||{x:1,y:1},y=Qr(i.convertOffsetParentRelativeRectToViewportRelativeRect?await i.convertOffsetParentRelativeRectToViewportRelativeRect({elements:o,rect:g,offsetParent:_,strategy:s}):g);return{top:(h.top-y.top+p.top)/v.y,bottom:(y.bottom-h.bottom+p.bottom)/v.y,left:(h.left-y.left+p.left)/v.x,right:(y.right-h.right+p.right)/v.x}}var ti=50,ni=async(e,t,n)=>{let{placement:r=`bottom`,strategy:i=`absolute`,middleware:a=[],platform:o}=n,s=o.detectOverflow?o:{...o,detectOverflow:ei},c=await(o.isRTL==null?void 0:o.isRTL(t)),l=await o.getElementRects({reference:e,floating:t,strategy:i}),{x:u,y:d}=$r(l,r,c),f=r,p=0,m={};for(let n=0;n<a.length;n++){let h=a[n];if(!h)continue;let{name:g,fn:_}=h,{x:v,y,data:b,reset:x}=await _({x:u,y:d,initialPlacement:r,placement:f,strategy:i,middlewareData:m,rects:l,platform:s,elements:{reference:e,floating:t}});u=v??u,d=y??d,m[g]={...m[g],...b},x&&p<ti&&(p++,typeof x==`object`&&(x.placement&&(f=x.placement),x.rects&&(l=x.rects===!0?await o.getElementRects({reference:e,floating:t,strategy:i}):x.rects),{x:u,y:d}=$r(l,f,c)),n=-1)}return{x:u,y:d,placement:f,strategy:i,middlewareData:m}},ri=e=>({name:`arrow`,options:e,async fn(t){let{x:n,y:r,placement:i,rects:a,platform:o,elements:s,middlewareData:c}=t,{element:l,padding:u=0}=Nr(e,t)||{};if(l==null)return{};let d=Zr(u),f={x:n,y:r},p=zr(i),m=Lr(p),h=await o.getDimensions(l),g=p===`y`,_=g?`top`:`left`,v=g?`bottom`:`right`,y=g?`clientHeight`:`clientWidth`,b=a.reference[m]+a.reference[p]-f[p]-a.floating[m],x=f[p]-a.reference[p],S=await(o.getOffsetParent==null?void 0:o.getOffsetParent(l)),C=S?S[y]:0;C&&await(o.isElement==null?void 0:o.isElement(S))||(C=s.floating[y]||a.floating[m]);let w=b/2-x/2,T=C/2-h[m]/2-1,E=Er(d[_],T),D=Er(d[v],T),O=E,k=C-h[m]-D,A=C/2-h[m]/2+w,j=Mr(O,A,k),ee=!c.arrow&&Fr(i)!=null&&A!==j&&a.reference[m]/2-(A<O?E:D)-h[m]/2<0,M=ee?A<O?A-O:A-k:0;return{[p]:f[p]+M,data:{[p]:j,centerOffset:A-j-M,...ee&&{alignmentOffset:M}},reset:ee}}}),ii=function(e){return e===void 0&&(e={}),{name:`flip`,options:e,async fn(t){var n;let{placement:r,middlewareData:i,rects:a,initialPlacement:o,platform:s,elements:c}=t,{mainAxis:l=!0,crossAxis:u=!0,fallbackPlacements:d,fallbackStrategy:f=`bestFit`,fallbackAxisSideDirection:p=`none`,flipAlignment:m=!0,...h}=Nr(e,t);if((n=i.arrow)!=null&&n.alignmentOffset)return{};let g=Pr(r),_=Rr(o),v=Pr(o)===o,y=await(s.isRTL==null?void 0:s.isRTL(c.floating)),b=d||(v||!m?[Yr(o)]:Vr(o)),x=p!==`none`;!d&&x&&b.push(...Jr(o,m,p,y));let S=[o,...b],C=await s.detectOverflow(t,h),w=[],T=i.flip?.overflows||[];if(l&&w.push(C[g]),u){let e=Br(r,a,y);w.push(C[e[0]],C[e[1]])}if(T=[...T,{placement:r,overflows:w}],!w.every(e=>e<=0)){let e=(i.flip?.index||0)+1,t=S[e];if(t&&(u!==`alignment`||_===Rr(t)||T.every(e=>Rr(e.placement)!==_||e.overflows[0]>0)))return{data:{index:e,overflows:T},reset:{placement:t}};let n=T.filter(e=>e.overflows[0]<=0).sort((e,t)=>e.overflows[1]-t.overflows[1])[0]?.placement;if(!n)switch(f){case`bestFit`:{let e=T.filter(e=>{if(x){let t=Rr(e.placement);return t===_||t===`y`}return!0}).map(e=>[e.placement,e.overflows.filter(e=>e>0).reduce((e,t)=>e+t,0)]).sort((e,t)=>e[1]-t[1])[0]?.[0];e&&(n=e);break}case`initialPlacement`:n=o}if(r!==n)return{reset:{placement:n}}}return{}}}};function ai(e,t){return{top:e.top-t.height,right:e.right-t.width,bottom:e.bottom-t.height,left:e.left-t.width}}function oi(e){return Tr.some(t=>e[t]>=0)}var si=function(e){return e===void 0&&(e={}),{name:`hide`,options:e,async fn(t){let{rects:n,platform:r}=t,{strategy:i=`referenceHidden`,...a}=Nr(e,t);switch(i){case`referenceHidden`:{let e=ai(await r.detectOverflow(t,{...a,elementContext:`reference`}),n.reference);return{data:{referenceHiddenOffsets:e,referenceHidden:oi(e)}}}case`escaped`:{let e=ai(await r.detectOverflow(t,{...a,altBoundary:!0}),n.floating);return{data:{escapedOffsets:e,escaped:oi(e)}}}default:return{}}}}},ci=new Set([`left`,`top`]);async function li(e,t){let{placement:n,platform:r,elements:i}=e,a=await(r.isRTL==null?void 0:r.isRTL(i.floating)),o=Pr(n),s=Fr(n),c=Rr(n)===`y`,l=ci.has(o)?-1:1,u=a&&c?-1:1,d=Nr(t,e),{mainAxis:f,crossAxis:p,alignmentAxis:m}=typeof d==`number`?{mainAxis:d,crossAxis:0,alignmentAxis:null}:{mainAxis:d.mainAxis||0,crossAxis:d.crossAxis||0,alignmentAxis:d.alignmentAxis};return s&&typeof m==`number`&&(p=s===`end`?m*-1:m),c?{x:p*u,y:f*l}:{x:f*l,y:p*u}}var ui=function(e){return e===void 0&&(e=0),{name:`offset`,options:e,async fn(t){var n;let{x:r,y:i,placement:a,middlewareData:o}=t,s=await li(t,e);return a===o.offset?.placement&&(n=o.arrow)!=null&&n.alignmentOffset?{}:{x:r+s.x,y:i+s.y,data:{...s,placement:a}}}}},di=function(e){return e===void 0&&(e={}),{name:`shift`,options:e,async fn(t){let{x:n,y:r,placement:i,platform:a}=t,{mainAxis:o=!0,crossAxis:s=!1,limiter:c={fn:e=>{let{x:t,y:n}=e;return{x:t,y:n}}},...l}=Nr(e,t),u={x:n,y:r},d=await a.detectOverflow(t,l),f=Rr(Pr(i)),p=Ir(f),m=u[p],h=u[f];if(o){let e=p===`y`?`top`:`left`,t=p===`y`?`bottom`:`right`,n=m+d[e],r=m-d[t];m=Mr(n,m,r)}if(s){let e=f===`y`?`top`:`left`,t=f===`y`?`bottom`:`right`,n=h+d[e],r=h-d[t];h=Mr(n,h,r)}let g=c.fn({...t,[p]:m,[f]:h});return{...g,data:{x:g.x-n,y:g.y-r,enabled:{[p]:o,[f]:s}}}}}},fi=function(e){return e===void 0&&(e={}),{name:`size`,options:e,async fn(t){var n,r;let{placement:i,rects:a,platform:o,elements:s}=t,{apply:c=()=>{},...l}=Nr(e,t),u=await o.detectOverflow(t,l),d=Pr(i),f=Fr(i),p=Rr(i)===`y`,{width:m,height:h}=a.floating,g,_;d===`top`||d===`bottom`?(g=d,_=f===(await(o.isRTL==null?void 0:o.isRTL(s.floating))?`start`:`end`)?`left`:`right`):(_=d,g=f===`end`?`top`:`bottom`);let v=h-u.top-u.bottom,y=m-u.left-u.right,b=Er(h-u[g],v),x=Er(m-u[_],y),S=!t.middlewareData.shift,C=b,w=x;if((n=t.middlewareData.shift)!=null&&n.enabled.x&&(w=y),(r=t.middlewareData.shift)!=null&&r.enabled.y&&(C=v),S&&!f){let e=Dr(u.left,0),t=Dr(u.right,0),n=Dr(u.top,0),r=Dr(u.bottom,0);p?w=m-2*(e!==0||t!==0?e+t:Dr(u.left,u.right)):C=h-2*(n!==0||r!==0?n+r:Dr(u.top,u.bottom))}await c({...t,availableWidth:w,availableHeight:C});let T=await o.getDimensions(s.floating);return m!==T.width||h!==T.height?{reset:{rects:!0}}:{}}}};function pi(){return typeof window<`u`}function mi(e){return _i(e)?(e.nodeName||``).toLowerCase():`#document`}function hi(e){var t;return(e==null||(t=e.ownerDocument)==null?void 0:t.defaultView)||window}function gi(e){return((_i(e)?e.ownerDocument:e.document)||window.document)?.documentElement}function _i(e){return pi()?e instanceof Node||e instanceof hi(e).Node:!1}function vi(e){return pi()?e instanceof Element||e instanceof hi(e).Element:!1}function yi(e){return pi()?e instanceof HTMLElement||e instanceof hi(e).HTMLElement:!1}function bi(e){return!pi()||typeof ShadowRoot>`u`?!1:e instanceof ShadowRoot||e instanceof hi(e).ShadowRoot}function xi(e){let{overflow:t,overflowX:n,overflowY:r,display:i}=Mi(e);return/auto|scroll|overlay|hidden|clip/.test(t+r+n)&&i!==`inline`&&i!==`contents`}function Si(e){return/^(table|td|th)$/.test(mi(e))}function Ci(e){try{if(e.matches(`:popover-open`))return!0}catch{}try{return e.matches(`:modal`)}catch{return!1}}var wi=/transform|translate|scale|rotate|perspective|filter/,Ti=/paint|layout|strict|content/,Ei=e=>!!e&&e!==`none`,Di;function Oi(e){let t=vi(e)?Mi(e):e;return Ei(t.transform)||Ei(t.translate)||Ei(t.scale)||Ei(t.rotate)||Ei(t.perspective)||!Ai()&&(Ei(t.backdropFilter)||Ei(t.filter))||wi.test(t.willChange||``)||Ti.test(t.contain||``)}function ki(e){let t=Pi(e);for(;yi(t)&&!ji(t);){if(Oi(t))return t;if(Ci(t))return null;t=Pi(t)}return null}function Ai(){return Di??=typeof CSS<`u`&&CSS.supports&&CSS.supports(`-webkit-backdrop-filter`,`none`),Di}function ji(e){return/^(html|body|#document)$/.test(mi(e))}function Mi(e){return hi(e).getComputedStyle(e)}function Ni(e){return vi(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:{scrollLeft:e.scrollX,scrollTop:e.scrollY}}function Pi(e){if(mi(e)===`html`)return e;let t=e.assignedSlot||e.parentNode||bi(e)&&e.host||gi(e);return bi(t)?t.host:t}function Fi(e){let t=Pi(e);return ji(t)?e.ownerDocument?e.ownerDocument.body:e.body:yi(t)&&xi(t)?t:Fi(t)}function Ii(e,t,n){t===void 0&&(t=[]),n===void 0&&(n=!0);let r=Fi(e),i=r===e.ownerDocument?.body,a=hi(r);if(i){let e=Li(a);return t.concat(a,a.visualViewport||[],xi(r)?r:[],e&&n?Ii(e):[])}return t.concat(r,Ii(r,[],n))}function Li(e){return e.parent&&Object.getPrototypeOf(e.parent)?e.frameElement:null}function Ri(e){let t=Mi(e),n=parseFloat(t.width)||0,r=parseFloat(t.height)||0,i=yi(e),a=i?e.offsetWidth:n,o=i?e.offsetHeight:r,s=Or(n)!==a||Or(r)!==o;return s&&(n=a,r=o),{width:n,height:r,$:s}}function zi(e){return vi(e)?e:e.contextElement}function Bi(e){let t=zi(e);if(!yi(t))return Ar(1);let n=t.getBoundingClientRect(),{width:r,height:i,$:a}=Ri(t),o=(a?Or(n.width):n.width)/r,s=(a?Or(n.height):n.height)/i;return o&&Number.isFinite(o)||(o=1),s&&Number.isFinite(s)||(s=1),{x:o,y:s}}var Vi=Ar(0);function Hi(e){let t=hi(e);return!Ai()||!t.visualViewport?Vi:{x:t.visualViewport.offsetLeft,y:t.visualViewport.offsetTop}}function Ui(e,t,n){return t===void 0&&(t=!1),!n||t&&n!==hi(e)?!1:t}function Wi(e,t,n,r){t===void 0&&(t=!1),n===void 0&&(n=!1);let i=e.getBoundingClientRect(),a=zi(e),o=Ar(1);t&&(r?vi(r)&&(o=Bi(r)):o=Bi(e));let s=Ui(a,n,r)?Hi(a):Ar(0),c=(i.left+s.x)/o.x,l=(i.top+s.y)/o.y,u=i.width/o.x,d=i.height/o.y;if(a){let e=hi(a),t=r&&vi(r)?hi(r):r,n=e,i=Li(n);for(;i&&r&&t!==n;){let e=Bi(i),t=i.getBoundingClientRect(),r=Mi(i),a=t.left+(i.clientLeft+parseFloat(r.paddingLeft))*e.x,o=t.top+(i.clientTop+parseFloat(r.paddingTop))*e.y;c*=e.x,l*=e.y,u*=e.x,d*=e.y,c+=a,l+=o,n=hi(i),i=Li(n)}}return Qr({width:u,height:d,x:c,y:l})}function Gi(e,t){let n=Ni(e).scrollLeft;return t?t.left+n:Wi(gi(e)).left+n}function Ki(e,t){let n=e.getBoundingClientRect();return{x:n.left+t.scrollLeft-Gi(e,n),y:n.top+t.scrollTop}}function qi(e){let{elements:t,rect:n,offsetParent:r,strategy:i}=e,a=i===`fixed`,o=gi(r),s=t?Ci(t.floating):!1;if(r===o||s&&a)return n;let c={scrollLeft:0,scrollTop:0},l=Ar(1),u=Ar(0),d=yi(r);if((d||!d&&!a)&&((mi(r)!==`body`||xi(o))&&(c=Ni(r)),d)){let e=Wi(r);l=Bi(r),u.x=e.x+r.clientLeft,u.y=e.y+r.clientTop}let f=o&&!d&&!a?Ki(o,c):Ar(0);return{width:n.width*l.x,height:n.height*l.y,x:n.x*l.x-c.scrollLeft*l.x+u.x+f.x,y:n.y*l.y-c.scrollTop*l.y+u.y+f.y}}function Ji(e){return Array.from(e.getClientRects())}function Yi(e){let t=gi(e),n=Ni(e),r=e.ownerDocument.body,i=Dr(t.scrollWidth,t.clientWidth,r.scrollWidth,r.clientWidth),a=Dr(t.scrollHeight,t.clientHeight,r.scrollHeight,r.clientHeight),o=-n.scrollLeft+Gi(e),s=-n.scrollTop;return Mi(r).direction===`rtl`&&(o+=Dr(t.clientWidth,r.clientWidth)-i),{width:i,height:a,x:o,y:s}}var Xi=25;function Zi(e,t){let n=hi(e),r=gi(e),i=n.visualViewport,a=r.clientWidth,o=r.clientHeight,s=0,c=0;if(i){a=i.width,o=i.height;let e=Ai();(!e||e&&t===`fixed`)&&(s=i.offsetLeft,c=i.offsetTop)}let l=Gi(r);if(l<=0){let e=r.ownerDocument,t=e.body,n=getComputedStyle(t),i=e.compatMode===`CSS1Compat`&&parseFloat(n.marginLeft)+parseFloat(n.marginRight)||0,o=Math.abs(r.clientWidth-t.clientWidth-i);o<=Xi&&(a-=o)}else l<=Xi&&(a+=l);return{width:a,height:o,x:s,y:c}}function Qi(e,t){let n=Wi(e,!0,t===`fixed`),r=n.top+e.clientTop,i=n.left+e.clientLeft,a=yi(e)?Bi(e):Ar(1);return{width:e.clientWidth*a.x,height:e.clientHeight*a.y,x:i*a.x,y:r*a.y}}function $i(e,t,n){let r;if(t===`viewport`)r=Zi(e,n);else if(t===`document`)r=Yi(gi(e));else if(vi(t))r=Qi(t,n);else{let n=Hi(e);r={x:t.x-n.x,y:t.y-n.y,width:t.width,height:t.height}}return Qr(r)}function ea(e,t){let n=Pi(e);return n===t||!vi(n)||ji(n)?!1:Mi(n).position===`fixed`||ea(n,t)}function ta(e,t){let n=t.get(e);if(n)return n;let r=Ii(e,[],!1).filter(e=>vi(e)&&mi(e)!==`body`),i=null,a=Mi(e).position===`fixed`,o=a?Pi(e):e;for(;vi(o)&&!ji(o);){let t=Mi(o),n=Oi(o);!n&&t.position===`fixed`&&(i=null),(a?!n&&!i:!n&&t.position===`static`&&i&&(i.position===`absolute`||i.position===`fixed`)||xi(o)&&!n&&ea(e,o))?r=r.filter(e=>e!==o):i=t,o=Pi(o)}return t.set(e,r),r}function na(e){let{element:t,boundary:n,rootBoundary:r,strategy:i}=e,a=[...n===`clippingAncestors`?Ci(t)?[]:ta(t,this._c):[].concat(n),r],o=$i(t,a[0],i),s=o.top,c=o.right,l=o.bottom,u=o.left;for(let e=1;e<a.length;e++){let n=$i(t,a[e],i);s=Dr(n.top,s),c=Er(n.right,c),l=Er(n.bottom,l),u=Dr(n.left,u)}return{width:c-u,height:l-s,x:u,y:s}}function ra(e){let{width:t,height:n}=Ri(e);return{width:t,height:n}}function ia(e,t,n){let r=yi(t),i=gi(t),a=n===`fixed`,o=Wi(e,!0,a,t),s={scrollLeft:0,scrollTop:0},c=Ar(0);function l(){c.x=Gi(i)}if(r||!r&&!a){if((mi(t)!==`body`||xi(i))&&(s=Ni(t)),r){let e=Wi(t,!0,a,t);c.x=e.x+t.clientLeft,c.y=e.y+t.clientTop}else i&&l()}a&&!r&&i&&l();let u=i&&!r&&!a?Ki(i,s):Ar(0);return{x:o.left+s.scrollLeft-c.x-u.x,y:o.top+s.scrollTop-c.y-u.y,width:o.width,height:o.height}}function aa(e){return Mi(e).position===`static`}function oa(e,t){if(!yi(e)||Mi(e).position===`fixed`)return null;if(t)return t(e);let n=e.offsetParent;return gi(e)===n&&(n=n.ownerDocument.body),n}function sa(e,t){let n=hi(e);if(Ci(e))return n;if(!yi(e)){let t=Pi(e);for(;t&&!ji(t);){if(vi(t)&&!aa(t))return t;t=Pi(t)}return n}let r=oa(e,t);for(;r&&Si(r)&&aa(r);)r=oa(r,t);return r&&ji(r)&&aa(r)&&!Oi(r)?n:r||ki(e)||n}var ca=async function(e){let t=this.getOffsetParent||sa,n=this.getDimensions,r=await n(e.floating);return{reference:ia(e.reference,await t(e.floating),e.strategy),floating:{x:0,y:0,width:r.width,height:r.height}}};function la(e){return Mi(e).direction===`rtl`}var ua={convertOffsetParentRelativeRectToViewportRelativeRect:qi,getDocumentElement:gi,getClippingRect:na,getOffsetParent:sa,getElementRects:ca,getClientRects:Ji,getDimensions:ra,getScale:Bi,isElement:vi,isRTL:la};function da(e,t){return e.x===t.x&&e.y===t.y&&e.width===t.width&&e.height===t.height}function fa(e,t){let n=null,r,i=gi(e);function a(){var e;clearTimeout(r),(e=n)==null||e.disconnect(),n=null}function o(s,c){s===void 0&&(s=!1),c===void 0&&(c=1),a();let l=e.getBoundingClientRect(),{left:u,top:d,width:f,height:p}=l;if(s||t(),!f||!p)return;let m=kr(d),h=kr(i.clientWidth-(u+f)),g=kr(i.clientHeight-(d+p)),_=kr(u),v={rootMargin:-m+`px `+-h+`px `+-g+`px `+-_+`px`,threshold:Dr(0,Er(1,c))||1},y=!0;function b(t){let n=t[0].intersectionRatio;if(n!==c){if(!y)return o();n?o(!1,n):r=setTimeout(()=>{o(!1,1e-7)},1e3)}n===1&&!da(l,e.getBoundingClientRect())&&o(),y=!1}try{n=new IntersectionObserver(b,{...v,root:i.ownerDocument})}catch{n=new IntersectionObserver(b,v)}n.observe(e)}return o(!0),a}function pa(e,t,n,r){r===void 0&&(r={});let{ancestorScroll:i=!0,ancestorResize:a=!0,elementResize:o=typeof ResizeObserver==`function`,layoutShift:s=typeof IntersectionObserver==`function`,animationFrame:c=!1}=r,l=zi(e),u=i||a?[...l?Ii(l):[],...t?Ii(t):[]]:[];u.forEach(e=>{i&&e.addEventListener(`scroll`,n,{passive:!0}),a&&e.addEventListener(`resize`,n)});let d=l&&s?fa(l,n):null,f=-1,p=null;o&&(p=new ResizeObserver(e=>{let[r]=e;r&&r.target===l&&p&&t&&(p.unobserve(t),cancelAnimationFrame(f),f=requestAnimationFrame(()=>{var e;(e=p)==null||e.observe(t)})),n()}),l&&!c&&p.observe(l),t&&p.observe(t));let m,h=c?Wi(e):null;c&&g();function g(){let t=Wi(e);h&&!da(h,t)&&n(),h=t,m=requestAnimationFrame(g)}return n(),()=>{var e;u.forEach(e=>{i&&e.removeEventListener(`scroll`,n),a&&e.removeEventListener(`resize`,n)}),d?.(),(e=p)==null||e.disconnect(),p=null,c&&cancelAnimationFrame(m)}}var ma=ui,ha=di,ga=ii,_a=fi,va=si,ya=ri,ba=(e,t,n)=>{let r=new Map,i={platform:ua,...n},a={...i.platform,_c:r};return ni(e,t,{...i,platform:a})},xa=F();function Sa(){let e=S(xa);if(e===void 0)throw Error("[kobalte]: `usePopperContext` must be used within a `Popper` component");return e}var Ca=n(`<svg display="block" viewBox="0 0 30 30" style="transform:scale(1.02)"><g><path fill="none" d="M23,27.8c1.1,1.2,3.4,2.2,5,2.2h2H0h2c1.7,0,3.9-1,5-2.2l6.6-7.2c0.7-0.8,2-0.8,2.7,0L23,27.8L23,27.8z"></path><path stroke="none" d="M23,27.8c1.1,1.2,3.4,2.2,5,2.2h2H0h2c1.7,0,3.9-1,5-2.2l6.6-7.2c0.7-0.8,2-0.8,2.7,0L23,27.8L23,27.8z">`),wa=30,Ta=wa/2,Ea={top:180,right:-90,bottom:0,left:90};function Da(e){let t=Sa(),n=Y({size:wa},e),[r,i]=d(n,[`ref`,`style`,`size`]),a=()=>t.currentPlacement().split(`-`)[0],o=Oa(t.contentRef),s=()=>o()?.getPropertyValue(`background-color`)||`none`,c=()=>o()?.getPropertyValue(`border-${a()}-color`)||`none`,l=()=>o()?.getPropertyValue(`border-${a()}-width`)||`0px`,u=()=>Number.parseInt(l())*2*(wa/r.size),f=()=>`rotate(${Ea[a()]} ${Ta} ${Ta}) translate(0 2)`;return R(X,m({as:`div`,ref(e){let n=ft(t.setArrowRef,r.ref);typeof n==`function`&&n(e)},"aria-hidden":`true`,get style(){return jt({position:`absolute`,"font-size":`${r.size}px`,width:`1em`,height:`1em`,"pointer-events":`none`,fill:s(),stroke:c(),"stroke-width":u()},r.style)}},i,{get children(){let e=Ca(),t=e.firstChild;return j(()=>h(t,`transform`,f())),e}}))}function Oa(e){let[t,n]=I();return z(()=>{let t=e();t&&n(Bt(t).getComputedStyle(t))}),t}function ka(e){let t=Sa(),[n,r]=d(e,[`ref`,`style`]);return R(X,m({as:`div`,ref(e){let r=ft(t.setPositionerRef,n.ref);typeof r==`function`&&r(e)},"data-popper-positioner":``,get style(){return jt({position:`absolute`,top:0,left:0,"min-width":`max-content`},n.style)}},r))}function Aa(e){let{x:t=0,y:n=0,width:r=0,height:i=0}=e??{};if(typeof DOMRect==`function`)return new DOMRect(t,n,r,i);let a={x:t,y:n,width:r,height:i,top:n,right:t+r,bottom:n+i,left:t};return{...a,toJSON:()=>a}}function ja(e,t){return{contextElement:e,getBoundingClientRect:()=>{let n=t(e);return n?Aa(n):e?e.getBoundingClientRect():Aa()}}}function Ma(e){return/^(?:top|bottom|left|right)(?:-(?:start|end))?$/.test(e)}var Na={top:`bottom`,right:`left`,bottom:`top`,left:`right`};function Pa(e,t){let[n,r]=e.split(`-`),i=Na[n];return r?n===`left`||n===`right`?`${i} ${r===`start`?`top`:`bottom`}`:r===`start`?`${i} ${t===`rtl`?`right`:`left`}`:`${i} ${t===`rtl`?`left`:`right`}`:`${i} center`}function Fa(e){let t=Y({getAnchorRect:e=>e?.getBoundingClientRect(),placement:`bottom`,gutter:0,shift:0,flip:!0,slide:!0,overlap:!1,sameWidth:!1,fitViewport:!1,hideWhenDetached:!1,detachedPadding:0,arrowPadding:4,overflowPadding:8},e),[n,r]=I(),[i,a]=I(),[o,s]=I(t.placement),c=()=>ja(t.anchorRef?.(),t.getAnchorRect),{direction:l}=Yn();async function u(){let e=c(),r=n(),a=i();if(!e||!r)return;let o=(a?.clientHeight||0)/2,u=typeof t.gutter==`number`?t.gutter+o:t.gutter??o;r.style.setProperty(`--kb-popper-content-overflow-padding`,`${t.overflowPadding}px`),e.getBoundingClientRect();let d=[ma(({placement:e})=>{let n=!!e.split(`-`)[1];return{mainAxis:u,crossAxis:n?void 0:t.shift,alignmentAxis:t.shift}})];if(t.flip!==!1){let e=typeof t.flip==`string`?t.flip.split(` `):void 0;if(e!==void 0&&!e.every(Ma))throw Error("`flip` expects a spaced-delimited list of placements");d.push(ga({padding:t.overflowPadding,fallbackPlacements:e}))}(t.slide||t.overlap)&&d.push(ha({mainAxis:t.slide,crossAxis:t.overlap,padding:t.overflowPadding})),d.push(_a({padding:t.overflowPadding,apply({availableWidth:e,availableHeight:n,rects:i}){let a=Math.round(i.reference.width);e=Math.floor(e),n=Math.floor(n),r.style.setProperty(`--kb-popper-anchor-width`,`${a}px`),r.style.setProperty(`--kb-popper-content-available-width`,`${e}px`),r.style.setProperty(`--kb-popper-content-available-height`,`${n}px`),t.sameWidth&&(r.style.width=`${a}px`),t.fitViewport&&(r.style.maxWidth=`${e}px`,r.style.maxHeight=`${n}px`)}})),t.hideWhenDetached&&d.push(va({padding:t.detachedPadding})),a&&d.push(ya({element:a,padding:t.arrowPadding}));let f=await ba(e,r,{placement:t.placement,strategy:`absolute`,middleware:d,platform:{...ua,isRTL:()=>l()===`rtl`}});if(s(f.placement),t.onCurrentPlacementChange?.(f.placement),!r)return;r.style.setProperty(`--kb-popper-content-transform-origin`,Pa(f.placement,l()));let p=Math.round(f.x),m=Math.round(f.y),h;if(t.hideWhenDetached&&(h=f.middlewareData.hide?.referenceHidden?`hidden`:`visible`),Object.assign(r.style,{top:`0`,left:`0`,transform:`translate3d(${p}px, ${m}px, 0)`,visibility:h}),a&&f.middlewareData.arrow){let{x:e,y:t}=f.middlewareData.arrow,n=f.placement.split(`-`)[0];Object.assign(a.style,{left:e==null?``:`${e}px`,top:t==null?``:`${t}px`,[n]:`100%`})}}z(()=>{let e=c(),t=n();if(!e||!t)return;let r=pa(e,t,u,{elementResize:typeof ResizeObserver==`function`});P(r)}),z(()=>{let e=n(),r=t.contentRef?.();e&&r&&queueMicrotask(()=>{e.style.zIndex=getComputedStyle(r).zIndex})});let d={currentPlacement:o,contentRef:()=>t.contentRef?.(),setPositionerRef:r,setArrowRef:a};return R(xa.Provider,{value:d,get children(){return t.children}})}var Ia=Object.assign(Fa,{Arrow:Da,Context:xa,usePopperContext:Sa,Positioner:ka}),La=`data-kb-top-layer`,Ra,za=!1,Ba=[];function Va(e){return Ba.findIndex(t=>t.node===e)}function Ha(e){return Ba[Va(e)]}function Ua(e){return Ba[Ba.length-1].node===e}function Wa(){return Ba.filter(e=>e.isPointerBlocking)}function Ga(){return[...Wa()].slice(-1)[0]}function Ka(){return Wa().length>0}function qa(e){let t=Va(Ga()?.node);return Va(e)<t}function Ja(e){Ba.push(e)}function Ya(e){let t=Va(e);t<0||Ba.splice(t,1)}function Xa(){for(let{node:e}of Ba)e.style.pointerEvents=qa(e)?`none`:`auto`}function Za(e){if(Ka()&&!za){let t=Vt(e);Ra=document.body.style.pointerEvents,t.body.style.pointerEvents=`none`,za=!0}}function Qa(e){if(Ka())return;let t=Vt(e);t.body.style.pointerEvents=Ra,t.body.style.length===0&&t.body.removeAttribute(`style`),za=!1}var $a={layers:Ba,isTopMostLayer:Ua,hasPointerBlockingLayer:Ka,isBelowPointerBlockingLayer:qa,addLayer:Ja,removeLayer:Ya,indexOf:Va,find:Ha,assignPointerEventToLayers:Xa,disableBodyPointerEvents:Za,restoreBodyPointerEvents:Qa},eo=`interactOutside.pointerDownOutside`,to=`interactOutside.focusOutside`;function no(e,t){let n,r=gn,i=()=>Vt(t()),a=t=>e.onPointerDownOutside?.(t),o=t=>e.onFocusOutside?.(t),s=t=>e.onInteractOutside?.(t),c=n=>{let r=n.target;return!(r instanceof Element)||r.closest(`[${La}]`)||!Rt(i(),r)||Rt(t(),r)?!1:!e.shouldExcludeElement?.(r)},l=e=>{function n(){let n=t(),r=e.target;if(!n||!r||!c(e))return;let i=q([a,s]);r.addEventListener(eo,i,{once:!0});let o=new CustomEvent(eo,{bubbles:!1,cancelable:!0,detail:{originalEvent:e,isContextMenu:e.button===2||Xt(e)&&e.button===0}});r.dispatchEvent(o)}e.pointerType===`touch`?(i().removeEventListener(`click`,n),r=n,i().addEventListener(`click`,n,{once:!0})):n()},u=e=>{let n=t(),r=e.target;if(!n||!r||!c(e))return;let i=q([o,s]);r.addEventListener(to,i,{once:!0});let a=new CustomEvent(to,{bubbles:!1,cancelable:!0,detail:{originalEvent:e,isContextMenu:!1}});r.dispatchEvent(a)};z(()=>{B(e.isDisabled)||(n=window.setTimeout(()=>{i().addEventListener(`pointerdown`,l,!0)},0),i().addEventListener(`focusin`,u,!0),P(()=>{window.clearTimeout(n),i().removeEventListener(`click`,r),i().removeEventListener(`pointerdown`,l,!0),i().removeEventListener(`focusin`,u,!0)}))})}function ro(e){let t=t=>{t.key===Ut.Escape&&e.onEscapeKeyDown?.(t)};z(()=>{if(B(e.isDisabled))return;let n=e.ownerDocument?.()??Vt();n.addEventListener(`keydown`,t),P(()=>{n.removeEventListener(`keydown`,t)})})}var io=F();function ao(){return S(io)}function oo(e){let n,r=ao(),[i,a]=d(e,[`ref`,`disableOutsidePointerEvents`,`excludedElements`,`onEscapeKeyDown`,`onPointerDownOutside`,`onFocusOutside`,`onInteractOutside`,`onDismiss`,`bypassTopMostLayerCheck`]),o=new Set([]),s=e=>{o.add(e);let t=r?.registerNestedLayer(e);return()=>{o.delete(e),t?.()}};no({shouldExcludeElement:e=>n?i.excludedElements?.some(t=>Rt(t(),e))||[...o].some(t=>Rt(t,e)):!1,onPointerDownOutside:e=>{n&&!$a.isBelowPointerBlockingLayer(n)&&(i.bypassTopMostLayerCheck||$a.isTopMostLayer(n))&&(i.onPointerDownOutside?.(e),i.onInteractOutside?.(e),e.defaultPrevented||i.onDismiss?.())},onFocusOutside:e=>{i.onFocusOutside?.(e),i.onInteractOutside?.(e),e.defaultPrevented||i.onDismiss?.()}},()=>n),ro({ownerDocument:()=>Vt(n),onEscapeKeyDown:e=>{n&&$a.isTopMostLayer(n)&&(i.onEscapeKeyDown?.(e),!e.defaultPrevented&&i.onDismiss&&(e.preventDefault(),i.onDismiss()))}}),f(()=>{if(!n)return;$a.addLayer({node:n,isPointerBlocking:i.disableOutsidePointerEvents,dismiss:i.onDismiss});let e=r?.registerNestedLayer(n);$a.assignPointerEventToLayers(),$a.disableBodyPointerEvents(n),P(()=>{n&&($a.removeLayer(n),e?.(),$a.assignPointerEventToLayers(),$a.restoreBodyPointerEvents(n))})}),z(t([()=>n,()=>i.disableOutsidePointerEvents],([e,t])=>{if(!e)return;let n=$a.find(e);n&&n.isPointerBlocking!==t&&(n.isPointerBlocking=t,$a.assignPointerEventToLayers()),t&&$a.disableBodyPointerEvents(e),P(()=>{$a.restoreBodyPointerEvents(e)})},{defer:!0}));let c={registerNestedLayer:s};return R(io.Provider,{value:c,get children(){return R(X,m({as:`div`,ref(e){let t=ft(e=>n=e,i.ref);typeof t==`function`&&t(e)}},a))}})}function so(e={}){let[t,n]=Pn({value:()=>B(e.open),defaultValue:()=>!!B(e.defaultOpen),onChange:t=>e.onOpenChange?.(t)}),r=()=>{n(!0)},i=()=>{n(!1)};return{isOpen:t,setIsOpen:n,open:r,close:i,toggle:()=>{t()?i():r()}}}function co(e){return t=>(e(t),()=>e(void 0))}var lo=e=>typeof e==`function`?e():e,uo=e=>{let t=k(()=>{let t=lo(e.element);if(t)return getComputedStyle(t)}),n=()=>t()?.animationName??`none`,[r,i]=I(lo(e.show)?`present`:`hidden`),a=`none`;return z(r=>{let o=lo(e.show);return x(()=>{if(r===o)return o;let e=a,s=n();o?i(`present`):s===`none`||t()?.display===`none`?i(`hidden`):i(r===!0&&e!==s?`hiding`:`hidden`)}),o}),z(()=>{let t=lo(e.element);if(!t)return;let o=e=>{e.target===t&&(a=n())},s=e=>{let a=n().includes(e.animationName);e.target===t&&a&&r()===`hiding`&&i(`hidden`)};t.addEventListener(`animationstart`,o),t.addEventListener(`animationcancel`,s),t.addEventListener(`animationend`,s),P(()=>{t.removeEventListener(`animationstart`,o),t.removeEventListener(`animationcancel`,s),t.removeEventListener(`animationend`,s)})}),{present:()=>r()===`present`||r()===`hiding`,state:r,setState:i}},fo=[`id`,`name`,`validationState`,`required`,`disabled`,`readOnly`];function po(e){let t=Y({id:`form-control-${M()}`},e),[n,r]=I(),[i,a]=I(),[o,s]=I(),[c,l]=I();return{formControlContext:{name:()=>B(t.name)??B(t.id),dataset:k(()=>({"data-valid":B(t.validationState)===`valid`?``:void 0,"data-invalid":B(t.validationState)===`invalid`?``:void 0,"data-required":B(t.required)?``:void 0,"data-disabled":B(t.disabled)?``:void 0,"data-readonly":B(t.readOnly)?``:void 0})),validationState:()=>B(t.validationState),isRequired:()=>B(t.required),isDisabled:()=>B(t.disabled),isReadOnly:()=>B(t.readOnly),labelId:n,fieldId:i,descriptionId:o,errorMessageId:c,getAriaLabelledBy:(e,t,r)=>{let i=r!=null||n()!=null;return[r,n(),i&&t!=null?e:void 0].filter(Boolean).join(` `)||void 0},getAriaDescribedBy:e=>[o(),c(),e].filter(Boolean).join(` `)||void 0,generateId:Lt(()=>B(t.id)),registerLabel:co(r),registerField:co(a),registerDescription:co(s),registerErrorMessage:co(l)}}}var mo=F();function ho(){let e=S(mo);if(e===void 0)throw Error("[kobalte]: `useFormControlContext` must be used within a `FormControlContext.Provider` component");return e}function go(e){let t=ho(),n=Y({id:t.generateId(`description`)},e);return z(()=>P(t.registerDescription(n.id))),R(X,m({as:`div`},()=>t.dataset(),n))}function _o(e){let t,n=ho(),r=Y({id:n.generateId(`label`)},e),[a,o]=d(r,[`ref`]),s=Tn(()=>t,()=>`label`);return z(()=>P(n.registerLabel(o.id))),R(X,m({as:`label`,ref(e){let n=ft(e=>t=e,a.ref);typeof n==`function`&&n(e)},get for(){return i(()=>s()===`label`)()?n.fieldId():void 0}},()=>n.dataset(),o))}function vo(e,n){z(t(e,e=>{if(e==null)return;let t=yo(e);t!=null&&(t.addEventListener(`reset`,n,{passive:!0}),P(()=>{t.removeEventListener(`reset`,n)}))}))}function yo(e){return bo(e)?e.form:e.closest(`form`)}function bo(e){return e.matches(`textarea, input, select, button`)}function xo(e){let t=ho(),n=Y({id:t.generateId(`error-message`)},e),[r,i]=d(n,[`forceMount`]),a=()=>t.validationState()===`invalid`;return z(()=>{a()&&P(t.registerErrorMessage(i.id))}),R(A,{get when(){return r.forceMount||a()},get children(){return R(X,m({as:`div`},()=>t.dataset(),i))}})}var So=`focusScope.autoFocusOnMount`,Co=`focusScope.autoFocusOnUnmount`,wo={bubbles:!1,cancelable:!0},To={stack:[],active(){return this.stack[0]},add(e){e!==this.active()&&this.active()?.pause(),this.stack=Nt(this.stack,e),this.stack.unshift(e)},remove(e){this.stack=Nt(this.stack,e),this.active()?.resume()}};function Eo(e,t){let[n,r]=I(!1),i={pause(){r(!0)},resume(){r(!1)}},a=null,o=t=>e.onMountAutoFocus?.(t),s=t=>e.onUnmountAutoFocus?.(t),c=()=>Vt(t()),l=()=>{let e=c().createElement(`span`);return e.setAttribute(`data-focus-trap`,``),e.tabIndex=0,Object.assign(e.style,wn),e},u=()=>{let e=t();return e?on(e,!0).filter(e=>!e.hasAttribute(`data-focus-trap`)):[]},d=()=>{let e=u();return e.length>0?e[0]:null},f=()=>{let e=u();return e.length>0?e[e.length-1]:null},p=()=>{let e=t();if(!e)return!1;let n=zt(e);return!n||Rt(e,n)?!1:cn(n)};z(()=>{let e=t();if(!e)return;To.add(i);let n=zt(e);if(!Rt(e,n)){let t=new CustomEvent(So,wo);e.addEventListener(So,o),e.dispatchEvent(t),t.defaultPrevented||setTimeout(()=>{J(d()),zt(e)===n&&J(e)},0)}P(()=>{e.removeEventListener(So,o),setTimeout(()=>{let t=new CustomEvent(Co,wo);p()&&t.preventDefault(),e.addEventListener(Co,s),e.dispatchEvent(t),t.defaultPrevented||J(n??c().body),e.removeEventListener(Co,s),To.remove(i)},0)})}),z(()=>{let r=t();if(!r||!B(e.trapFocus)||n())return;let i=e=>{let t=e.target;t?.closest(`[${La}]`)||(Rt(r,t)?a=t:J(a))},o=e=>{let t=e.relatedTarget??zt(r);t?.closest(`[${La}]`)||Rt(r,t)||J(a)};c().addEventListener(`focusin`,i),c().addEventListener(`focusout`,o),P(()=>{c().removeEventListener(`focusin`,i),c().removeEventListener(`focusout`,o)})}),z(()=>{let r=t();if(!r||!B(e.trapFocus)||n())return;let i=l();r.insertAdjacentElement(`afterbegin`,i);let a=l();r.insertAdjacentElement(`beforeend`,a);function o(e){let t=d(),n=f();e.relatedTarget===t?J(n):J(t)}i.addEventListener(`focusin`,o),a.addEventListener(`focusin`,o);let s=new MutationObserver(e=>{for(let t of e)t.previousSibling===a&&(a.remove(),r.insertAdjacentElement(`beforeend`,a)),t.nextSibling===i&&(i.remove(),r.insertAdjacentElement(`afterbegin`,i))});s.observe(r,{childList:!0,subtree:!1}),P(()=>{i.removeEventListener(`focusin`,o),a.removeEventListener(`focusin`,o),i.remove(),a.remove(),s.disconnect()})})}var Do=`data-live-announcer`;function Oo(e){z(()=>{B(e.isDisabled)||P(jo(B(e.targets),B(e.root)))})}var ko=new WeakMap,Ao=[];function jo(e,t=document.body){let n=new Set(e),r=new Set,i=e=>{for(let t of e.querySelectorAll(`[${Do}], [${La}]`))n.add(t);let t=e=>{if(n.has(e)||e.parentElement&&r.has(e.parentElement)&&e.parentElement.getAttribute(`role`)!==`row`)return NodeFilter.FILTER_REJECT;for(let t of n)if(e.contains(t))return NodeFilter.FILTER_SKIP;return NodeFilter.FILTER_ACCEPT},i=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode:t}),o=t(e);if(o===NodeFilter.FILTER_ACCEPT&&a(e),o!==NodeFilter.FILTER_REJECT){let e=i.nextNode();for(;e!=null;)a(e),e=i.nextNode()}},a=e=>{let t=ko.get(e)??0;(e.getAttribute(`aria-hidden`)!==`true`||t!==0)&&(t===0&&e.setAttribute(`aria-hidden`,`true`),r.add(e),ko.set(e,t+1))};Ao.length&&Ao[Ao.length-1].disconnect(),i(t);let o=new MutationObserver(e=>{for(let t of e)if(t.type===`childList`&&t.addedNodes.length!==0&&![...n,...r].some(e=>e.contains(t.target))){for(let e of t.removedNodes)e instanceof Element&&(n.delete(e),r.delete(e));for(let e of t.addedNodes)(e instanceof HTMLElement||e instanceof SVGElement)&&(e.dataset.liveAnnouncer===`true`||e.dataset.reactAriaTopLayer===`true`)?n.add(e):e instanceof Element&&i(e)}});o.observe(t,{childList:!0,subtree:!0});let s={observe(){o.observe(t,{childList:!0,subtree:!0})},disconnect(){o.disconnect()}};return Ao.push(s),()=>{o.disconnect();for(let e of r){let t=ko.get(e);if(t==null)return;t===1?(e.removeAttribute(`aria-hidden`),ko.delete(e)):ko.set(e,t-1)}s===Ao[Ao.length-1]?(Ao.pop(),Ao.length&&Ao[Ao.length-1].observe()):Ao.splice(Ao.indexOf(s),1)}}var Mo=(e,t)=>{if(e.contains(t))return!0;let n=t;for(;n;){if(n===e)return!0;n=n._$host??n.parentElement}return!1},No=new Map,Po=e=>{z(()=>{let t=lo(e.style)??{},n=lo(e.properties)??[],r={};for(let n in t)r[n]=e.element.style[n];let i=No.get(e.key);i?i.activeCount++:No.set(e.key,{activeCount:1,originalStyles:r,properties:n.map(e=>e.key)}),Object.assign(e.element.style,e.style);for(let t of n)e.element.style.setProperty(t.key,t.value);P(()=>{let t=No.get(e.key);if(t){if(t.activeCount!==1)t.activeCount--;else{No.delete(e.key);for(let[n,r]of Object.entries(t.originalStyles))e.element.style[n]=r;for(let n of t.properties)e.element.style.removeProperty(n);e.element.style.length===0&&e.element.removeAttribute(`style`),e.cleanup?.()}}})})},Fo=(e,t)=>{switch(t){case`x`:return[e.clientWidth,e.scrollLeft,e.scrollWidth];case`y`:return[e.clientHeight,e.scrollTop,e.scrollHeight]}},Io=(e,t)=>{let n=getComputedStyle(e),r=t===`x`?n.overflowX:n.overflowY;return r===`auto`||r===`scroll`||e.tagName===`HTML`&&r===`visible`},Lo=(e,t,n)=>{let r=t===`x`&&window.getComputedStyle(e).direction===`rtl`?-1:1,i=e,a=0,o=0,s=!1;do{let[e,c,l]=Fo(i,t),u=l-e-r*c;(c!==0||u!==0)&&Io(i,t)&&(a+=u,o+=c),i===(n??document.documentElement)?s=!0:i=i._$host??i.parentElement}while(i&&!s);return[a,o]},[Ro,zo]=I([]),Bo=e=>Ro().indexOf(e)===Ro().length-1,Vo=e=>{let t=m({element:null,enabled:!0,hideScrollbar:!0,preventScrollbarShift:!0,preventScrollbarShiftMode:`padding`,restoreScrollPosition:!0,allowPinchZoom:!1},e),n=M(),r=[0,0],i=null,a=null;z(()=>{lo(t.enabled)&&(zo(e=>[...e,n]),P(()=>{zo(e=>e.filter(e=>e!==n))}))}),z(()=>{if(!lo(t.enabled)||!lo(t.hideScrollbar))return;let{body:e}=document,n=window.innerWidth-e.offsetWidth;if(lo(t.preventScrollbarShift)){let r={overflow:`hidden`},i=[];n>0&&(lo(t.preventScrollbarShiftMode)===`padding`?r.paddingRight=`calc(${window.getComputedStyle(e).paddingRight} + ${n}px)`:r.marginRight=`calc(${window.getComputedStyle(e).marginRight} + ${n}px)`,i.push({key:`--scrollbar-width`,value:`${n}px`}));let a=window.scrollY,o=window.scrollX;Po({key:`prevent-scroll`,element:e,style:r,properties:i,cleanup:()=>{lo(t.restoreScrollPosition)&&n>0&&window.scrollTo(o,a)}})}else Po({key:`prevent-scroll`,element:e,style:{overflow:`hidden`}})}),z(()=>{Bo(n)&&lo(t.enabled)&&(document.addEventListener(`wheel`,s,{passive:!1}),document.addEventListener(`touchstart`,o,{passive:!1}),document.addEventListener(`touchmove`,c,{passive:!1}),P(()=>{document.removeEventListener(`wheel`,s),document.removeEventListener(`touchstart`,o),document.removeEventListener(`touchmove`,c)}))});let o=e=>{r=Uo(e),i=null,a=null},s=e=>{let n=e.target,r=lo(t.element),i=Ho(e),a=Math.abs(i[0])>Math.abs(i[1])?`x`:`y`,o=Wo(n,a,a===`x`?i[0]:i[1],r),s;s=r&&Mo(r,n)?!o:!0,s&&e.cancelable&&e.preventDefault()},c=e=>{let n=lo(t.element),o=e.target,s;if(e.touches.length===2)s=!lo(t.allowPinchZoom);else{if(i==null||a===null){let t=Uo(e).map((e,t)=>r[t]-e),n=Math.abs(t[0])>Math.abs(t[1])?`x`:`y`;i=n,a=n===`x`?t[0]:t[1]}if(o.type===`range`)s=!1;else{let e=Wo(o,i,a,n);s=n&&Mo(n,o)?!e:!0}}s&&e.cancelable&&e.preventDefault()}},Ho=e=>[e.deltaX,e.deltaY],Uo=e=>e.changedTouches[0]?[e.changedTouches[0].clientX,e.changedTouches[0].clientY]:[0,0],Wo=(e,t,n,r)=>{let[i,a]=Lo(e,t,r!==null&&Mo(r,e)?r:void 0);return!(n>0&&Math.abs(i)<=1||n<0&&Math.abs(a)<1)},Go=Vo,Ko={};On(Ko,{Description:()=>go,ErrorMessage:()=>xo,Item:()=>Zo,ItemControl:()=>Qo,ItemDescription:()=>$o,ItemIndicator:()=>es,ItemInput:()=>ts,ItemLabel:()=>ns,Label:()=>rs,RadioGroup:()=>as,Root:()=>is,useRadioGroupContext:()=>Jo});var qo=F();function Jo(){let e=S(qo);if(e===void 0)throw Error("[kobalte]: `useRadioGroupContext` must be used within a `RadioGroup` component");return e}var Yo=F();function Xo(){let e=S(Yo);if(e===void 0)throw Error("[kobalte]: `useRadioGroupItemContext` must be used within a `RadioGroup.Item` component");return e}function Zo(e){let t=ho(),n=Jo(),r=Y({id:`${t.generateId(`item`)}-${M()}`},e),[i,a]=d(r,[`value`,`disabled`,`onPointerDown`]),[o,s]=I(),[c,l]=I(),[u,f]=I(),[p,h]=I(),[g,_]=I(!1),v=k(()=>n.isDefaultValue(i.value)),y=k(()=>n.isSelectedValue(i.value)),b=k(()=>i.disabled||t.isDisabled()||!1),x=e=>{K(e,i.onPointerDown),g()&&e.preventDefault()},S=k(()=>({...t.dataset(),"data-disabled":b()?``:void 0,"data-checked":y()?``:void 0})),C={value:()=>i.value,dataset:S,isDefault:v,isSelected:y,isDisabled:b,inputId:o,labelId:c,descriptionId:u,inputRef:p,select:()=>n.setSelectedValue(i.value),generateId:Lt(()=>a.id),registerInput:co(s),registerLabel:co(l),registerDescription:co(f),setIsFocused:_,setInputRef:h};return R(Yo.Provider,{value:C,get children(){return R(X,m({as:`div`,role:`group`,onPointerDown:x},S,a))}})}function Qo(e){let t=Xo(),n=Y({id:t.generateId(`control`)},e),[r,i]=d(n,[`onClick`,`onKeyDown`]);return R(X,m({as:`div`,onClick:e=>{K(e,r.onClick),t.select(),t.inputRef()?.focus()},onKeyDown:e=>{K(e,r.onKeyDown),e.key===Ut.Space&&(t.select(),t.inputRef()?.focus())}},()=>t.dataset(),i))}function $o(e){let t=Xo(),n=Y({id:t.generateId(`description`)},e);return z(()=>P(t.registerDescription(n.id))),R(X,m({as:`div`},()=>t.dataset(),n))}function es(e){let t=Xo(),n=Y({id:t.generateId(`indicator`)},e),[r,i]=d(n,[`ref`,`forceMount`]),[a,o]=I(),{present:s}=uo({show:()=>r.forceMount||t.isSelected(),element:()=>a()??null});return R(A,{get when(){return s()},get children(){return R(X,m({as:`div`,ref(e){let t=ft(o,r.ref);typeof t==`function`&&t(e)}},()=>t.dataset(),i))}})}function ts(e){let n=ho(),r=Jo(),i=Xo(),a=Y({id:i.generateId(`input`)},e),[o,s]=d(a,[`ref`,`style`,`aria-labelledby`,`aria-describedby`,`onChange`,`onFocus`,`onBlur`]),c=()=>[o[`aria-labelledby`],i.labelId(),o[`aria-labelledby`]!=null&&s[`aria-label`]!=null?s.id:void 0].filter(Boolean).join(` `)||void 0,l=()=>[o[`aria-describedby`],i.descriptionId(),r.ariaDescribedBy()].filter(Boolean).join(` `)||void 0,[u,f]=I(!1);return z(t([()=>i.isSelected(),()=>i.value()],e=>{if(!e[0]&&e[1]===i.value())return;f(!0);let t=i.inputRef();t?.dispatchEvent(new Event(`input`,{bubbles:!0,cancelable:!0})),t?.dispatchEvent(new Event(`change`,{bubbles:!0,cancelable:!0}))},{defer:!0})),z(()=>P(i.registerInput(s.id))),R(X,m({as:`input`,ref(e){let t=ft(i.setInputRef,o.ref);typeof t==`function`&&t(e)},type:`radio`,get name(){return n.name()},get value(){return i.value()},get checked(){return i.isSelected()},get required(){return n.isRequired()},get disabled(){return i.isDisabled()},get readonly(){return n.isReadOnly()},get style(){return jt({...wn},o.style)},get"aria-labelledby"(){return c()},get"aria-describedby"(){return l()},onChange:e=>{if(K(e,o.onChange),e.stopPropagation(),!u()){r.setSelectedValue(i.value());let t=e.target;t.checked=i.isSelected()}f(!1)},onFocus:e=>{K(e,o.onFocus),i.setIsFocused(!0)},onBlur:e=>{K(e,o.onBlur),i.setIsFocused(!1)}},()=>i.dataset(),s))}function ns(e){let t=Xo(),n=Y({id:t.generateId(`label`)},e);return z(()=>P(t.registerLabel(n.id))),R(X,m({as:`label`,get for(){return t.inputId()}},()=>t.dataset(),n))}function rs(e){return R(_o,m({as:`span`},e))}function is(e){let t,n=Y({id:`radiogroup-${M()}`,orientation:`vertical`},e),[r,i,a]=d(n,[`ref`,`value`,`defaultValue`,`onChange`,`orientation`,`aria-labelledby`,`aria-describedby`],fo),[o,s]=Nn({value:()=>r.value,defaultValue:()=>r.defaultValue,onChange:e=>r.onChange?.(e)}),{formControlContext:c}=po(i);vo(()=>t,()=>s(r.defaultValue??``));let l=()=>c.getAriaLabelledBy(B(i.id),a[`aria-label`],r[`aria-labelledby`]),u=()=>c.getAriaDescribedBy(r[`aria-describedby`]),f=t=>t===e.defaultValue,p=e=>e===o(),h={ariaDescribedBy:u,isDefaultValue:f,isSelectedValue:p,setSelectedValue:e=>{if(!(c.isReadOnly()||c.isDisabled())&&(s(e),t))for(let e of t.querySelectorAll(`[type='radio']`)){let t=e;t.checked=p(t.value)}}};return R(mo.Provider,{value:c,get children(){return R(qo.Provider,{value:h,get children(){return R(X,m({as:`div`,ref(e){let n=ft(e=>t=e,r.ref);typeof n==`function`&&n(e)},role:`radiogroup`,get id(){return B(i.id)},get"aria-invalid"(){return c.validationState()===`invalid`||void 0},get"aria-required"(){return c.isRequired()||void 0},get"aria-disabled"(){return c.isDisabled()||void 0},get"aria-readonly"(){return c.isReadOnly()||void 0},get"aria-orientation"(){return r.orientation},get"aria-labelledby"(){return l()},get"aria-describedby"(){return u()}},()=>c.dataset(),a))}})}})}var as=Object.assign(is,{Description:go,ErrorMessage:xo,Item:Zo,ItemControl:Qo,ItemDescription:$o,ItemIndicator:es,ItemInput:ts,ItemLabel:ns,Label:rs}),os=class{collection;ref;collator;constructor(e,t,n){this.collection=e,this.ref=t,this.collator=n}getKeyBelow(e){let t=this.collection().getKeyAfter(e);for(;t!=null;){let e=this.collection().getItem(t);if(e&&e.type===`item`&&!e.disabled)return t;t=this.collection().getKeyAfter(t)}}getKeyAbove(e){let t=this.collection().getKeyBefore(e);for(;t!=null;){let e=this.collection().getItem(t);if(e&&e.type===`item`&&!e.disabled)return t;t=this.collection().getKeyBefore(t)}}getFirstKey(){let e=this.collection().getFirstKey();for(;e!=null;){let t=this.collection().getItem(e);if(t&&t.type===`item`&&!t.disabled)return e;e=this.collection().getKeyAfter(e)}}getLastKey(){let e=this.collection().getLastKey();for(;e!=null;){let t=this.collection().getItem(e);if(t&&t.type===`item`&&!t.disabled)return e;e=this.collection().getKeyBefore(e)}}getItem(e){return this.ref?.()?.querySelector(`[data-key="${e}"]`)??null}getKeyPageAbove(e){let t=this.ref?.(),n=this.getItem(e);if(!t||!n)return;let r=Math.max(0,n.offsetTop+n.offsetHeight-t.offsetHeight),i=e;for(;i&&n&&n.offsetTop>r;)i=this.getKeyAbove(i),n=i==null?null:this.getItem(i);return i}getKeyPageBelow(e){let t=this.ref?.(),n=this.getItem(e);if(!t||!n)return;let r=Math.min(t.scrollHeight,n.offsetTop-n.offsetHeight+t.offsetHeight),i=e;for(;i&&n&&n.offsetTop<r;)i=this.getKeyBelow(i),n=i==null?null:this.getItem(i);return i}getKeyForSearch(e,t){let n=this.collator?.();if(!n)return;let r=t==null?this.getFirstKey():this.getKeyBelow(t);for(;r!=null;){let t=this.collection().getItem(r);if(t){let i=t.textValue.slice(0,e.length);if(t.textValue&&n.compare(i,e)===0)return r}r=this.getKeyBelow(r)}}};function ss(e,t,n){let r=Zn({usage:`search`,sensitivity:`base`});return cr({selectionManager:()=>B(e.selectionManager),keyboardDelegate:k(()=>B(e.keyboardDelegate)||new os(e.collection,t,r)),autoFocus:()=>B(e.autoFocus),deferAutoFocus:()=>B(e.deferAutoFocus),shouldFocusWrap:()=>B(e.shouldFocusWrap),disallowEmptySelection:()=>B(e.disallowEmptySelection),selectOnFocus:()=>B(e.selectOnFocus),disallowTypeAhead:()=>B(e.disallowTypeAhead),shouldUseVirtualFocus:()=>B(e.shouldUseVirtualFocus),allowsTabNavigation:()=>B(e.allowsTabNavigation),isVirtualized:()=>B(e.isVirtualized),scrollToKey:t=>B(e.scrollToKey)?.(t),orientation:()=>B(e.orientation)},t)}var cs=F();function ls(){return S(cs)}var us=F();function ds(){return S(us)}var fs=F();function ps(){return S(fs)}function ms(){let e=ps();if(e===void 0)throw Error("[kobalte]: `useMenuContext` must be used within a `Menu` component");return e}var hs=F();function gs(){let e=S(hs);if(e===void 0)throw Error("[kobalte]: `useMenuItemContext` must be used within a `Menu.Item` component");return e}var _s=F();function vs(){let e=S(_s);if(e===void 0)throw Error("[kobalte]: `useMenuRootContext` must be used within a `MenuRoot` component");return e}function ys(e){let t,n=vs(),r=ms(),i=Y({id:n.generateId(`item-${M()}`)},e),[a,o]=d(i,[`ref`,`textValue`,`disabled`,`closeOnSelect`,`checked`,`indeterminate`,`onSelect`,`onPointerMove`,`onPointerLeave`,`onPointerDown`,`onPointerUp`,`onClick`,`onKeyDown`,`onMouseDown`,`onFocus`]),[s,c]=I(),[l,u]=I(),[f,p]=I(),h=()=>r.listState().selectionManager(),g=()=>o.id,_=()=>h().focusedKey()===g(),v=()=>{a.onSelect?.(),a.closeOnSelect&&setTimeout(()=>{r.close(!0)})};wr({getItem:()=>({ref:()=>t,type:`item`,key:g(),textValue:a.textValue??f()?.textContent??t?.textContent??``,disabled:a.disabled??!1})});let y=lr({key:g,selectionManager:h,shouldSelectOnPressUp:!0,allowsDifferentPressOrigin:!0,disabled:()=>a.disabled},()=>t),b=e=>{K(e,a.onPointerMove),e.pointerType===`mouse`&&(a.disabled?r.onItemLeave(e):(r.onItemEnter(e),e.defaultPrevented||(J(e.currentTarget),r.listState().selectionManager().setFocused(!0),r.listState().selectionManager().setFocusedKey(g()))))},x=e=>{K(e,a.onPointerLeave),e.pointerType===`mouse`&&r.onItemLeave(e)},S=e=>{K(e,a.onPointerUp),!a.disabled&&e.button===0&&v()},C=e=>{if(K(e,a.onKeyDown),!e.repeat&&!a.disabled)switch(e.key){case`Enter`:case` `:v()}},w=k(()=>{if(a.indeterminate)return`mixed`;if(a.checked!=null)return a.checked}),T=k(()=>({"data-indeterminate":a.indeterminate?``:void 0,"data-checked":a.checked&&!a.indeterminate?``:void 0,"data-disabled":a.disabled?``:void 0,"data-highlighted":_()?``:void 0})),E={isChecked:()=>a.checked,dataset:T,setLabelRef:p,generateId:Lt(()=>o.id),registerLabel:co(c),registerDescription:co(u)};return R(hs.Provider,{value:E,get children(){return R(X,m({as:`div`,ref(e){let n=ft(e=>t=e,a.ref);typeof n==`function`&&n(e)},get tabIndex(){return y.tabIndex()},get"aria-checked"(){return w()},get"aria-disabled"(){return a.disabled},get"aria-labelledby"(){return s()},get"aria-describedby"(){return l()},get"data-key"(){return y.dataKey()},get onPointerDown(){return q([a.onPointerDown,y.onPointerDown])},get onPointerUp(){return q([S,y.onPointerUp])},get onClick(){return q([a.onClick,y.onClick])},get onKeyDown(){return q([C,y.onKeyDown])},get onMouseDown(){return q([a.onMouseDown,y.onMouseDown])},get onFocus(){return q([a.onFocus,y.onFocus])},onPointerMove:b,onPointerLeave:x},T,o))}})}function bs(e){let t=Y({closeOnSelect:!1},e),[n,r]=d(t,[`checked`,`defaultChecked`,`onChange`,`onSelect`]),i=In({isSelected:()=>n.checked,defaultIsSelected:()=>n.defaultChecked,onSelectedChange:e=>n.onChange?.(e),isDisabled:()=>r.disabled});return R(ys,m({role:`menuitemcheckbox`,get checked(){return i.isSelected()},onSelect:()=>{n.onSelect?.(),i.toggle()}},r))}var xs={next:(e,t)=>e===`ltr`?t===`horizontal`?`ArrowRight`:`ArrowDown`:t===`horizontal`?`ArrowLeft`:`ArrowUp`,previous:(e,t)=>xs.next(e===`ltr`?`rtl`:`ltr`,t)},Ss={first:e=>e===`horizontal`?`ArrowDown`:`ArrowRight`,last:e=>e===`horizontal`?`ArrowUp`:`ArrowLeft`};function Cs(e){let n=vs(),r=ms(),a=ls(),{direction:o}=Yn(),s=Y({id:n.generateId(`trigger`)},e),[c,l]=d(s,[`ref`,`id`,`disabled`,`onPointerDown`,`onClick`,`onKeyDown`,`onMouseOver`,`onFocus`]),u=()=>n.value();a!==void 0&&(u=()=>n.value()??c.id,a.lastValue()===void 0&&a.setLastValue(u));let f=Tn(()=>r.triggerRef(),()=>`button`),p=k(()=>f()===`a`&&r.triggerRef()?.getAttribute(`href`)!=null);z(t(()=>a?.value(),e=>{p()&&e===u()&&r.triggerRef()?.focus()}));let h=()=>{a===void 0?r.toggle(!0):r.isOpen()?a.value()===u()&&a.closeMenu():(a.autoFocusMenu()||a.setAutoFocusMenu(!0),r.open(!1))};return z(()=>P(r.registerTriggerId(c.id))),R(jn,m({ref(e){let t=ft(r.setTriggerRef,c.ref);typeof t==`function`&&t(e)},get"data-kb-menu-value-trigger"(){return n.value()},get id(){return c.id},get disabled(){return c.disabled},"aria-haspopup":`true`,get"aria-expanded"(){return r.isOpen()},get"aria-controls"(){return i(()=>!!r.isOpen())()?r.contentId():void 0},get"data-highlighted"(){return u()!==void 0&&a?.value()===u()||void 0},get tabIndex(){return a===void 0?void 0:a.value()===u()||a.lastValue()===u()?0:-1},onPointerDown:e=>{K(e,c.onPointerDown),e.currentTarget.dataset.pointerType=e.pointerType,!c.disabled&&e.pointerType!==`touch`&&e.button===0&&h()},onMouseOver:e=>{K(e,c.onMouseOver),r.triggerRef()?.dataset.pointerType!==`touch`&&!c.disabled&&a!==void 0&&a.value()!==void 0&&a.setValue(u)},onClick:e=>{K(e,c.onClick),c.disabled||e.currentTarget.dataset.pointerType===`touch`&&h()},onKeyDown:e=>{if(K(e,c.onKeyDown),!c.disabled){if(p())switch(e.key){case`Enter`:case` `:return}switch(e.key){case`Enter`:case` `:case Ss.first(n.orientation()):e.stopPropagation(),e.preventDefault(),Cn(e.currentTarget),r.open(`first`),a?.setAutoFocusMenu(!0),a?.setValue(u);break;case Ss.last(n.orientation()):e.stopPropagation(),e.preventDefault(),r.open(`last`);break;case xs.next(o(),n.orientation()):if(a===void 0)break;e.stopPropagation(),e.preventDefault(),a.nextMenu();break;case xs.previous(o(),n.orientation()):if(a===void 0)break;e.stopPropagation(),e.preventDefault(),a.previousMenu()}}},onFocus:e=>{K(e,c.onFocus),a!==void 0&&e.currentTarget.dataset.pointerType!==`touch`&&a.setValue(u)},role:a===void 0?void 0:`menuitem`},()=>r.dataset(),l))}function ws(e){let t,n=vs(),r=ms(),a=ls(),o=ds(),{direction:s}=Yn(),c=Y({id:n.generateId(`content-${M()}`)},e),[l,u]=d(c,[`ref`,`id`,`style`,`onOpenAutoFocus`,`onCloseAutoFocus`,`onEscapeKeyDown`,`onFocusOutside`,`onPointerEnter`,`onPointerMove`,`onKeyDown`,`onMouseDown`,`onFocusIn`,`onFocusOut`]),f=0,p=()=>r.parentMenuContext()==null&&a===void 0&&n.isModal(),h=ss({selectionManager:r.listState().selectionManager,collection:r.listState().collection,autoFocus:r.autoFocus,deferAutoFocus:!0,shouldFocusWrap:!0,disallowTypeAhead:()=>!r.listState().selectionManager().isFocused(),orientation:()=>n.orientation()===`horizontal`?`vertical`:`horizontal`},()=>t);Eo({trapFocus:()=>p()&&r.isOpen(),onMountAutoFocus:e=>{a===void 0&&l.onOpenAutoFocus?.(e)},onUnmountAutoFocus:l.onCloseAutoFocus},()=>t);let g=e=>{if(Rt(e.currentTarget,e.target)&&(e.key===`Tab`&&r.isOpen()&&e.preventDefault(),a!==void 0&&e.currentTarget.getAttribute(`aria-haspopup`)!==`true`))switch(e.key){case xs.next(s(),n.orientation()):e.stopPropagation(),e.preventDefault(),r.close(!0),a.setAutoFocusMenu(!0),a.nextMenu();break;case xs.previous(s(),n.orientation()):if(e.currentTarget.hasAttribute(`data-closed`))break;e.stopPropagation(),e.preventDefault(),r.close(!0),a.setAutoFocusMenu(!0),a.previousMenu()}},_=e=>{l.onEscapeKeyDown?.(e),a?.setAutoFocusMenu(!1),r.close(!0)},v=e=>{l.onFocusOutside?.(e),n.isModal()&&e.preventDefault()},y=e=>{K(e,l.onPointerEnter),r.isOpen()&&(r.parentMenuContext()?.listState().selectionManager().setFocused(!1),r.parentMenuContext()?.listState().selectionManager().setFocusedKey(void 0))},b=e=>{if(K(e,l.onPointerMove),e.pointerType!==`mouse`)return;let t=e.target,n=f!==e.clientX;Rt(e.currentTarget,t)&&n&&(r.setPointerDir(e.clientX>f?`right`:`left`),f=e.clientX)};z(()=>P(r.registerContentId(l.id))),P(()=>r.setContentRef(void 0));let x={ref:ft(e=>{r.setContentRef(e),t=e},l.ref),role:`menu`,get id(){return l.id},get tabIndex(){return h.tabIndex()},get"aria-labelledby"(){return r.triggerId()},onKeyDown:q([l.onKeyDown,h.onKeyDown,g]),onMouseDown:q([l.onMouseDown,h.onMouseDown]),onFocusIn:q([l.onFocusIn,h.onFocusIn]),onFocusOut:q([l.onFocusOut,h.onFocusOut]),onPointerEnter:y,onPointerMove:b,get"data-orientation"(){return n.orientation()}};return R(A,{get when(){return r.contentPresent()},get children(){return R(A,{get when(){return o===void 0||r.parentMenuContext()!=null},get fallback(){return R(X,m({as:`div`},()=>r.dataset(),x,u))},get children(){return R(Ia.Positioner,{get children(){return R(oo,m({get disableOutsidePointerEvents(){return i(()=>!!p())()&&r.isOpen()},get excludedElements(){return[r.triggerRef]},bypassTopMostLayerCheck:!0,get style(){return jt({"--kb-menu-content-transform-origin":`var(--kb-popper-content-transform-origin)`,position:`relative`},l.style)},onEscapeKeyDown:_,onFocusOutside:v,get onDismiss(){return r.close}},()=>r.dataset(),x,u))}})}})}})}function Ts(e){let t,n=vs(),r=ms(),[i,a]=d(e,[`ref`]);return Go({element:()=>t??null,enabled:()=>r.contentPresent()&&n.preventScroll()}),R(ws,m({ref(e){let n=ft(e=>{t=e},i.ref);typeof n==`function`&&n(e)}},a))}var Es=F();function Ds(){let e=S(Es);if(e===void 0)throw Error("[kobalte]: `useMenuGroupContext` must be used within a `Menu.Group` component");return e}function Os(e){let t=Y({id:vs().generateId(`group-${M()}`)},e),[n,r]=I(),i={generateId:Lt(()=>t.id),registerLabelId:co(r)};return R(Es.Provider,{value:i,get children(){return R(X,m({as:`div`,role:`group`,get"aria-labelledby"(){return n()}},t))}})}function ks(e){let t=Ds(),n=Y({id:t.generateId(`label`)},e),[r,i]=d(n,[`id`]);return z(()=>P(t.registerLabelId(r.id))),R(X,m({as:`span`,get id(){return r.id},"aria-hidden":`true`},i))}function As(e){let t=ms(),n=Y({children:`▼`},e);return R(X,m({as:`span`,"aria-hidden":`true`},()=>t.dataset(),n))}function js(e){return R(ys,m({role:`menuitem`,closeOnSelect:!0},e))}function Ms(e){let t=gs(),n=Y({id:t.generateId(`description`)},e),[r,i]=d(n,[`id`]);return z(()=>P(t.registerDescription(r.id))),R(X,m({as:`div`,get id(){return r.id}},()=>t.dataset(),i))}function Ns(e){let t=gs(),n=Y({id:t.generateId(`indicator`)},e),[r,i]=d(n,[`forceMount`]);return R(A,{get when(){return r.forceMount||t.isChecked()},get children(){return R(X,m({as:`div`},()=>t.dataset(),i))}})}function Ps(e){let t=gs(),n=Y({id:t.generateId(`label`)},e),[r,i]=d(n,[`ref`,`id`]);return z(()=>P(t.registerLabel(r.id))),R(X,m({as:`div`,ref(e){let n=ft(t.setLabelRef,r.ref);typeof n==`function`&&n(e)},get id(){return r.id}},()=>t.dataset(),i))}function Fs(t){let n=ms();return R(A,{get when(){return n.contentPresent()},get children(){return R(e,t)}})}var Is=F();function Ls(){let e=S(Is);if(e===void 0)throw Error("[kobalte]: `useMenuRadioGroupContext` must be used within a `Menu.RadioGroup` component");return e}function Rs(e){let t=Y({id:vs().generateId(`radiogroup-${M()}`)},e),[n,r]=d(t,[`value`,`defaultValue`,`onChange`,`disabled`]),[i,a]=Nn({value:()=>n.value,defaultValue:()=>n.defaultValue,onChange:e=>n.onChange?.(e)});return R(Is.Provider,{value:{isDisabled:()=>n.disabled,isSelectedValue:e=>e===i(),setSelectedValue:e=>a(e)},get children(){return R(Os,r)}})}function zs(e){let t=Ls(),n=Y({closeOnSelect:!1},e),[r,i]=d(n,[`value`,`onSelect`]);return R(ys,m({role:`menuitemradio`,get checked(){return t.isSelectedValue(r.value)},onSelect:()=>{r.onSelect?.(),t.setSelectedValue(r.value)}},i))}function Bs(e,t,n){let r=e.split(`-`)[0],i=n.getBoundingClientRect(),a=[],o=t.clientX,s=t.clientY;switch(r){case`top`:a.push([o,s+5]),a.push([i.left,i.bottom]),a.push([i.left,i.top]),a.push([i.right,i.top]),a.push([i.right,i.bottom]);break;case`right`:a.push([o-5,s]),a.push([i.left,i.top]),a.push([i.right,i.top]),a.push([i.right,i.bottom]),a.push([i.left,i.bottom]);break;case`bottom`:a.push([o,s-5]),a.push([i.right,i.top]),a.push([i.right,i.bottom]),a.push([i.left,i.bottom]),a.push([i.left,i.top]);break;case`left`:a.push([o+5,s]),a.push([i.right,i.bottom]),a.push([i.left,i.bottom]),a.push([i.left,i.top]),a.push([i.right,i.top])}return a}function Vs(e,t){return t?_n([e.clientX,e.clientY],t):!1}function Hs(e){let t=vs(),n=mr(),r=ps(),i=ls(),a=ds(),o=Y({placement:t.orientation()===`horizontal`?`bottom-start`:`right-start`},e),[s,c]=d(o,[`open`,`defaultOpen`,`onOpenChange`]),l=0,u=null,f=`right`,[p,h]=I(),[g,_]=I(),[v,y]=I(),[b,x]=I(),[S,C]=I(!0),[w,T]=I(c.placement),[E,D]=I([]),[O,j]=I([]),{DomCollectionProvider:ee}=Cr({items:O,onItemsChange:j}),M=so({open:()=>s.open,defaultOpen:()=>s.defaultOpen,onOpenChange:e=>s.onOpenChange?.(e)}),{present:N}=uo({show:()=>t.forceMount()||M.isOpen(),element:()=>b()??null}),te=fr({selectionMode:`none`,dataSource:O}),F=e=>{C(e),M.open()},ne=(e=!1)=>{M.close(),e&&r&&r.close(!0)},re=e=>{C(e),M.toggle()},ie=()=>{let e=b();e&&(J(e),te.selectionManager().setFocused(!0),te.selectionManager().setFocusedKey(void 0))},L=()=>{a==null?ie():setTimeout(()=>ie())},ae=e=>{D(t=>[...t,e]);let t=r?.registerNestedMenu(e);return()=>{D(t=>Nt(t,e)),t?.()}},oe=e=>f===u?.side&&Vs(e,u?.area),se=e=>{oe(e)&&e.preventDefault()},ce=e=>{oe(e)||L()},le=e=>{oe(e)&&e.preventDefault()};Oo({isDisabled:()=>!(r==null&&M.isOpen()&&t.isModal()),targets:()=>[b(),...E()].filter(Boolean)}),z(()=>{let e=b();if(!e||!r)return;let t=r.registerNestedMenu(e);P(()=>{t()})}),z(()=>{r===void 0&&i?.registerMenu(t.value(),[b(),...E()])}),z(()=>{r===void 0&&i!==void 0&&(i.value()===t.value()?(v()?.focus(),i.autoFocusMenu()&&F(!0)):ne())}),z(()=>{r===void 0&&i!==void 0&&M.isOpen()&&i.setValue(t.value())}),P(()=>{r===void 0&&i?.unregisterMenu(t.value())});let ue={dataset:k(()=>({"data-expanded":M.isOpen()?``:void 0,"data-closed":M.isOpen()?void 0:``})),isOpen:M.isOpen,contentPresent:N,nestedMenus:E,currentPlacement:w,pointerGraceTimeoutId:()=>l,autoFocus:S,listState:()=>te,parentMenuContext:()=>r,triggerRef:v,contentRef:b,triggerId:p,contentId:g,setTriggerRef:y,setContentRef:x,open:F,close:ne,toggle:re,focusContent:L,onItemEnter:se,onItemLeave:ce,onTriggerLeave:le,setPointerDir:e=>f=e,setPointerGraceTimeoutId:e=>l=e,setPointerGraceIntent:e=>u=e,registerNestedMenu:ae,registerItemToParentDomCollection:n?.registerItem,registerTriggerId:co(h),registerContentId:co(_)};return R(ee,{get children(){return R(fs.Provider,{value:ue,get children(){return R(A,{when:a===void 0,get fallback(){return c.children},get children(){return R(Ia,m({anchorRef:v,contentRef:b,onCurrentPlacementChange:T},c))}})}})}})}function Us(e){let{direction:t}=Yn();return R(Hs,m({get placement(){return t()===`rtl`?`left-start`:`right-start`},flip:!0},e))}var Ws={close:(e,t)=>e===`ltr`?[t===`horizontal`?`ArrowLeft`:`ArrowUp`]:[t===`horizontal`?`ArrowRight`:`ArrowDown`]};function Gs(e){let t=ms(),n=vs(),[r,i]=d(e,[`onFocusOutside`,`onKeyDown`]),{direction:a}=Yn();return R(ws,m({onOpenAutoFocus:e=>{e.preventDefault()},onCloseAutoFocus:e=>{e.preventDefault()},onFocusOutside:e=>{r.onFocusOutside?.(e);let n=e.target;Rt(t.triggerRef(),n)||t.close()},onKeyDown:e=>{K(e,r.onKeyDown);let i=Rt(e.currentTarget,e.target),o=Ws.close(a(),n.orientation()).includes(e.key),s=t.parentMenuContext()!=null;i&&o&&s&&(t.close(),J(t.triggerRef()))}},i))}var Ks=[`Enter`,` `],qs={open:(e,t)=>e===`ltr`?[...Ks,t===`horizontal`?`ArrowRight`:`ArrowDown`]:[...Ks,t===`horizontal`?`ArrowLeft`:`ArrowUp`]};function Js(e){let n,r=vs(),a=ms(),o=Y({id:r.generateId(`sub-trigger-${M()}`)},e),[s,c]=d(o,[`ref`,`id`,`textValue`,`disabled`,`onPointerMove`,`onPointerLeave`,`onPointerDown`,`onPointerUp`,`onClick`,`onKeyDown`,`onMouseDown`,`onFocus`]),l=null,u=()=>{l&&window.clearTimeout(l),l=null},{direction:f}=Yn(),p=()=>s.id,h=()=>{let e=a.parentMenuContext();if(e==null)throw Error("[kobalte]: `Menu.SubTrigger` must be used within a `Menu.Sub` component");return e.listState().selectionManager()},g=()=>a.listState().collection(),_=()=>h().focusedKey()===p(),v=lr({key:p,selectionManager:h,shouldSelectOnPressUp:!0,allowsDifferentPressOrigin:!0,disabled:()=>s.disabled},()=>n),y=e=>{K(e,s.onClick),!a.isOpen()&&!s.disabled&&a.open(!0)},b=e=>{if(K(e,s.onPointerMove),e.pointerType!==`mouse`)return;let t=a.parentMenuContext();t?.onItemEnter(e),e.defaultPrevented||(s.disabled?t?.onItemLeave(e):(!a.isOpen()&&!l&&(a.parentMenuContext()?.setPointerGraceIntent(null),l=window.setTimeout(()=>{a.open(!1),u()},100)),t?.onItemEnter(e),e.defaultPrevented||(a.listState().selectionManager().isFocused()&&(a.listState().selectionManager().setFocused(!1),a.listState().selectionManager().setFocusedKey(void 0)),J(e.currentTarget),t?.listState().selectionManager().setFocused(!0),t?.listState().selectionManager().setFocusedKey(p()))))},x=e=>{if(K(e,s.onPointerLeave),e.pointerType!==`mouse`)return;u();let t=a.parentMenuContext(),n=a.contentRef();if(n){t?.setPointerGraceIntent({area:Bs(a.currentPlacement(),e,n),side:a.currentPlacement().split(`-`)[0]}),window.clearTimeout(t?.pointerGraceTimeoutId());let r=window.setTimeout(()=>{t?.setPointerGraceIntent(null)},300);t?.setPointerGraceTimeoutId(r)}else{if(t?.onTriggerLeave(e),e.defaultPrevented)return;t?.setPointerGraceIntent(null)}t?.onItemLeave(e)},S=e=>{K(e,s.onKeyDown),e.repeat||s.disabled||qs.open(f(),r.orientation()).includes(e.key)&&(e.stopPropagation(),e.preventDefault(),h().setFocused(!1),h().setFocusedKey(void 0),a.isOpen()||a.open(`first`),a.focusContent(),a.listState().selectionManager().setFocused(!0),a.listState().selectionManager().setFocusedKey(g().getFirstKey()))};return z(()=>{if(a.registerItemToParentDomCollection==null)throw Error("[kobalte]: `Menu.SubTrigger` must be used within a `Menu.Sub` component");let e=a.registerItemToParentDomCollection({ref:()=>n,type:`item`,key:p(),textValue:s.textValue??n?.textContent??``,disabled:s.disabled??!1});P(e)}),z(t(()=>a.parentMenuContext()?.pointerGraceTimeoutId(),e=>{P(()=>{window.clearTimeout(e),a.parentMenuContext()?.setPointerGraceIntent(null)})})),z(()=>P(a.registerTriggerId(s.id))),P(()=>{u()}),R(X,m({as:`div`,ref(e){let t=ft(e=>{a.setTriggerRef(e),n=e},s.ref);typeof t==`function`&&t(e)},get id(){return s.id},role:`menuitem`,get tabIndex(){return v.tabIndex()},"aria-haspopup":`true`,get"aria-expanded"(){return a.isOpen()},get"aria-controls"(){return i(()=>!!a.isOpen())()?a.contentId():void 0},get"aria-disabled"(){return s.disabled},get"data-key"(){return v.dataKey()},get"data-highlighted"(){return _()?``:void 0},get"data-disabled"(){return s.disabled?``:void 0},get onPointerDown(){return q([s.onPointerDown,v.onPointerDown])},get onPointerUp(){return q([s.onPointerUp,v.onPointerUp])},get onClick(){return q([y,v.onClick])},get onKeyDown(){return q([S,v.onKeyDown])},get onMouseDown(){return q([s.onMouseDown,v.onMouseDown])},get onFocus(){return q([s.onFocus,v.onFocus])},onPointerMove:b,onPointerLeave:x},()=>a.dataset(),c))}function Ys(e){let t=ls(),n=Y({id:`menu-${M()}`,modal:!0},e),[r,i]=d(n,[`id`,`modal`,`preventScroll`,`forceMount`,`open`,`defaultOpen`,`onOpenChange`,`value`,`orientation`]),a=so({open:()=>r.open,defaultOpen:()=>r.defaultOpen,onOpenChange:e=>r.onOpenChange?.(e)}),o={isModal:()=>r.modal??!0,preventScroll:()=>r.preventScroll??o.isModal(),forceMount:()=>r.forceMount??!1,generateId:Lt(()=>r.id),value:()=>r.value,orientation:()=>r.orientation??t?.orientation()??`horizontal`};return R(_s.Provider,{value:o,get children(){return R(Hs,m({get open(){return a.isOpen()},get onOpenChange(){return a.setIsOpen}},i))}})}On({},{Root:()=>Xs,Separator:()=>Zs});function Xs(e){let t,n=Y({orientation:`horizontal`},e),[r,i]=d(n,[`ref`,`orientation`]),a=Tn(()=>t,()=>`hr`);return R(X,m({as:`hr`,ref(e){let n=ft(e=>t=e,r.ref);typeof n==`function`&&n(e)},get role(){return a()===`hr`?void 0:`separator`},get"aria-orientation"(){return r.orientation===`vertical`?`vertical`:void 0},get"data-orientation"(){return r.orientation}},i))}var Zs=Xs,Z={};On(Z,{Arrow:()=>Da,CheckboxItem:()=>bs,Content:()=>Qs,DropdownMenu:()=>ec,Group:()=>Os,GroupLabel:()=>ks,Icon:()=>As,Item:()=>js,ItemDescription:()=>Ms,ItemIndicator:()=>Ns,ItemLabel:()=>Ps,Portal:()=>Fs,RadioGroup:()=>Rs,RadioItem:()=>zs,Root:()=>$s,Separator:()=>Xs,Sub:()=>Us,SubContent:()=>Gs,SubTrigger:()=>Js,Trigger:()=>Cs});function Qs(e){let t=vs(),n=ms(),[r,i]=d(e,[`onCloseAutoFocus`,`onInteractOutside`]),a=!1;return R(Ts,m({onCloseAutoFocus:e=>{r.onCloseAutoFocus?.(e),a||J(n.triggerRef()),a=!1,e.preventDefault()},onInteractOutside:e=>{r.onInteractOutside?.(e),(!t.isModal()||e.detail.isContextMenu)&&(a=!0)}},i))}function $s(e){let t=Y({id:`dropdownmenu-${M()}`},e);return R(Ys,t)}var ec=Object.assign($s,{Arrow:Da,CheckboxItem:bs,Content:Qs,Group:Os,GroupLabel:ks,Icon:As,Item:js,ItemDescription:Ms,ItemIndicator:Ns,ItemLabel:Ps,Portal:Fs,RadioGroup:Rs,RadioItem:zs,Separator:Xs,Sub:Us,SubContent:Gs,SubTrigger:Js,Trigger:Cs}),Q={colors:{inherit:`inherit`,current:`currentColor`,transparent:`transparent`,black:`#000000`,white:`#ffffff`,neutral:{50:`#f9fafb`,100:`#f2f4f7`,200:`#eaecf0`,300:`#d0d5dd`,400:`#98a2b3`,500:`#667085`,600:`#475467`,700:`#344054`,800:`#1d2939`,900:`#101828`},darkGray:{50:`#525c7a`,100:`#49536e`,200:`#414962`,300:`#394056`,400:`#313749`,500:`#292e3d`,600:`#212530`,700:`#191c24`,800:`#111318`,900:`#0b0d10`},gray:{50:`#f9fafb`,100:`#f2f4f7`,200:`#eaecf0`,300:`#d0d5dd`,400:`#98a2b3`,500:`#667085`,600:`#475467`,700:`#344054`,800:`#1d2939`,900:`#101828`},blue:{25:`#F5FAFF`,50:`#EFF8FF`,100:`#D1E9FF`,200:`#B2DDFF`,300:`#84CAFF`,400:`#53B1FD`,500:`#2E90FA`,600:`#1570EF`,700:`#175CD3`,800:`#1849A9`,900:`#194185`},green:{25:`#F6FEF9`,50:`#ECFDF3`,100:`#D1FADF`,200:`#A6F4C5`,300:`#6CE9A6`,400:`#32D583`,500:`#12B76A`,600:`#039855`,700:`#027A48`,800:`#05603A`,900:`#054F31`},red:{50:`#fef2f2`,100:`#fee2e2`,200:`#fecaca`,300:`#fca5a5`,400:`#f87171`,500:`#ef4444`,600:`#dc2626`,700:`#b91c1c`,800:`#991b1b`,900:`#7f1d1d`,950:`#450a0a`},yellow:{25:`#FFFCF5`,50:`#FFFAEB`,100:`#FEF0C7`,200:`#FEDF89`,300:`#FEC84B`,400:`#FDB022`,500:`#F79009`,600:`#DC6803`,700:`#B54708`,800:`#93370D`,900:`#7A2E0E`},purple:{25:`#FAFAFF`,50:`#F4F3FF`,100:`#EBE9FE`,200:`#D9D6FE`,300:`#BDB4FE`,400:`#9B8AFB`,500:`#7A5AF8`,600:`#6938EF`,700:`#5925DC`,800:`#4A1FB8`,900:`#3E1C96`},teal:{25:`#F6FEFC`,50:`#F0FDF9`,100:`#CCFBEF`,200:`#99F6E0`,300:`#5FE9D0`,400:`#2ED3B7`,500:`#15B79E`,600:`#0E9384`,700:`#107569`,800:`#125D56`,900:`#134E48`},pink:{25:`#fdf2f8`,50:`#fce7f3`,100:`#fbcfe8`,200:`#f9a8d4`,300:`#f472b6`,400:`#ec4899`,500:`#db2777`,600:`#be185d`,700:`#9d174d`,800:`#831843`,900:`#500724`},cyan:{25:`#ecfeff`,50:`#cffafe`,100:`#a5f3fc`,200:`#67e8f9`,300:`#22d3ee`,400:`#06b6d4`,500:`#0891b2`,600:`#0e7490`,700:`#155e75`,800:`#164e63`,900:`#083344`}},alpha:{100:`ff`,90:`e5`,80:`cc`,70:`b3`,60:`99`,50:`80`,40:`66`,30:`4d`,20:`33`,10:`1a`,0:`00`},font:{size:{"2xs":`calc(var(--tsqd-font-size) * 0.625)`,xs:`calc(var(--tsqd-font-size) * 0.75)`,sm:`calc(var(--tsqd-font-size) * 0.875)`,md:`var(--tsqd-font-size)`,lg:`calc(var(--tsqd-font-size) * 1.125)`,xl:`calc(var(--tsqd-font-size) * 1.25)`,"2xl":`calc(var(--tsqd-font-size) * 1.5)`,"3xl":`calc(var(--tsqd-font-size) * 1.875)`,"4xl":`calc(var(--tsqd-font-size) * 2.25)`,"5xl":`calc(var(--tsqd-font-size) * 3)`,"6xl":`calc(var(--tsqd-font-size) * 3.75)`,"7xl":`calc(var(--tsqd-font-size) * 4.5)`,"8xl":`calc(var(--tsqd-font-size) * 6)`,"9xl":`calc(var(--tsqd-font-size) * 8)`},lineHeight:{xs:`calc(var(--tsqd-font-size) * 1)`,sm:`calc(var(--tsqd-font-size) * 1.25)`,md:`calc(var(--tsqd-font-size) * 1.5)`,lg:`calc(var(--tsqd-font-size) * 1.75)`,xl:`calc(var(--tsqd-font-size) * 2)`,"2xl":`calc(var(--tsqd-font-size) * 2.25)`,"3xl":`calc(var(--tsqd-font-size) * 2.5)`,"4xl":`calc(var(--tsqd-font-size) * 2.75)`,"5xl":`calc(var(--tsqd-font-size) * 3)`,"6xl":`calc(var(--tsqd-font-size) * 3.25)`,"7xl":`calc(var(--tsqd-font-size) * 3.5)`,"8xl":`calc(var(--tsqd-font-size) * 3.75)`,"9xl":`calc(var(--tsqd-font-size) * 4)`},weight:{thin:`100`,extralight:`200`,light:`300`,normal:`400`,medium:`500`,semibold:`600`,bold:`700`,extrabold:`800`,black:`900`}},breakpoints:{xs:`320px`,sm:`640px`,md:`768px`,lg:`1024px`,xl:`1280px`,"2xl":`1536px`},border:{radius:{none:`0px`,xs:`calc(var(--tsqd-font-size) * 0.125)`,sm:`calc(var(--tsqd-font-size) * 0.25)`,md:`calc(var(--tsqd-font-size) * 0.375)`,lg:`calc(var(--tsqd-font-size) * 0.5)`,xl:`calc(var(--tsqd-font-size) * 0.75)`,"2xl":`calc(var(--tsqd-font-size) * 1)`,"3xl":`calc(var(--tsqd-font-size) * 1.5)`,full:`9999px`}},size:{0:`0px`,.25:`calc(var(--tsqd-font-size) * 0.0625)`,.5:`calc(var(--tsqd-font-size) * 0.125)`,1:`calc(var(--tsqd-font-size) * 0.25)`,1.5:`calc(var(--tsqd-font-size) * 0.375)`,2:`calc(var(--tsqd-font-size) * 0.5)`,2.5:`calc(var(--tsqd-font-size) * 0.625)`,3:`calc(var(--tsqd-font-size) * 0.75)`,3.5:`calc(var(--tsqd-font-size) * 0.875)`,4:`calc(var(--tsqd-font-size) * 1)`,4.5:`calc(var(--tsqd-font-size) * 1.125)`,5:`calc(var(--tsqd-font-size) * 1.25)`,5.5:`calc(var(--tsqd-font-size) * 1.375)`,6:`calc(var(--tsqd-font-size) * 1.5)`,6.5:`calc(var(--tsqd-font-size) * 1.625)`,7:`calc(var(--tsqd-font-size) * 1.75)`,8:`calc(var(--tsqd-font-size) * 2)`,9:`calc(var(--tsqd-font-size) * 2.25)`,10:`calc(var(--tsqd-font-size) * 2.5)`,11:`calc(var(--tsqd-font-size) * 2.75)`,12:`calc(var(--tsqd-font-size) * 3)`,14:`calc(var(--tsqd-font-size) * 3.5)`,16:`calc(var(--tsqd-font-size) * 4)`,20:`calc(var(--tsqd-font-size) * 5)`,24:`calc(var(--tsqd-font-size) * 6)`,28:`calc(var(--tsqd-font-size) * 7)`,32:`calc(var(--tsqd-font-size) * 8)`,36:`calc(var(--tsqd-font-size) * 9)`,40:`calc(var(--tsqd-font-size) * 10)`,44:`calc(var(--tsqd-font-size) * 11)`,48:`calc(var(--tsqd-font-size) * 12)`,52:`calc(var(--tsqd-font-size) * 13)`,56:`calc(var(--tsqd-font-size) * 14)`,60:`calc(var(--tsqd-font-size) * 15)`,64:`calc(var(--tsqd-font-size) * 16)`,72:`calc(var(--tsqd-font-size) * 18)`,80:`calc(var(--tsqd-font-size) * 20)`,96:`calc(var(--tsqd-font-size) * 24)`},shadow:{xs:(e=`rgb(0 0 0 / 0.1)`)=>`0 1px 2px 0 rgb(0 0 0 / 0.05)`,sm:(e=`rgb(0 0 0 / 0.1)`)=>`0 1px 3px 0 ${e}, 0 1px 2px -1px ${e}`,md:(e=`rgb(0 0 0 / 0.1)`)=>`0 4px 6px -1px ${e}, 0 2px 4px -2px ${e}`,lg:(e=`rgb(0 0 0 / 0.1)`)=>`0 10px 15px -3px ${e}, 0 4px 6px -4px ${e}`,xl:(e=`rgb(0 0 0 / 0.1)`)=>`0 20px 25px -5px ${e}, 0 8px 10px -6px ${e}`,"2xl":(e=`rgb(0 0 0 / 0.25)`)=>`0 25px 50px -12px ${e}`,inner:(e=`rgb(0 0 0 / 0.05)`)=>`inset 0 2px 4px 0 ${e}`,none:()=>`none`},zIndices:{hide:-1,auto:`auto`,base:0,docked:10,dropdown:1e3,sticky:1100,banner:1200,overlay:1300,modal:1400,popover:1500,skipLink:1600,toast:1700,tooltip:1800}},tc=n(`<svg width=14 height=14 viewBox="0 0 14 14"fill=none xmlns=http://www.w3.org/2000/svg><path d="M13 13L9.00007 9M10.3333 5.66667C10.3333 8.244 8.244 10.3333 5.66667 10.3333C3.08934 10.3333 1 8.244 1 5.66667C1 3.08934 3.08934 1 5.66667 1C8.244 1 10.3333 3.08934 10.3333 5.66667Z"stroke=currentColor stroke-width=1.66667 stroke-linecap=round stroke-linejoin=round>`),nc=n(`<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M9 3H15M3 6H21M19 6L18.2987 16.5193C18.1935 18.0975 18.1409 18.8867 17.8 19.485C17.4999 20.0118 17.0472 20.4353 16.5017 20.6997C15.882 21 15.0911 21 13.5093 21H10.4907C8.90891 21 8.11803 21 7.49834 20.6997C6.95276 20.4353 6.50009 20.0118 6.19998 19.485C5.85911 18.8867 5.8065 18.0975 5.70129 16.5193L5 6M10 10.5V15.5M14 10.5V15.5"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),rc=n(`<svg width=10 height=6 viewBox="0 0 10 6"fill=none xmlns=http://www.w3.org/2000/svg><path d="M1 1L5 5L9 1"stroke=currentColor stroke-width=1.66667 stroke-linecap=round stroke-linejoin=round>`),ic=n(`<svg width=12 height=12 viewBox="0 0 16 16"fill=none xmlns=http://www.w3.org/2000/svg><path d="M8 13.3333V2.66667M8 2.66667L4 6.66667M8 2.66667L12 6.66667"stroke=currentColor stroke-width=1.66667 stroke-linecap=round stroke-linejoin=round>`),ac=n(`<svg width=12 height=12 viewBox="0 0 16 16"fill=none xmlns=http://www.w3.org/2000/svg><path d="M8 2.66667V13.3333M8 13.3333L4 9.33333M8 13.3333L12 9.33333"stroke=currentColor stroke-width=1.66667 stroke-linecap=round stroke-linejoin=round>`),oc=n(`<svg width=12 height=12 viewBox="0 0 16 16"fill=none xmlns=http://www.w3.org/2000/svg style=transform:rotate(90deg)><path d="M8 2.66667V13.3333M8 13.3333L4 9.33333M8 13.3333L12 9.33333"stroke=currentColor stroke-width=1.66667 stroke-linecap=round stroke-linejoin=round>`),sc=n(`<svg width=12 height=12 viewBox="0 0 16 16"fill=none xmlns=http://www.w3.org/2000/svg style=transform:rotate(-90deg)><path d="M8 2.66667V13.3333M8 13.3333L4 9.33333M8 13.3333L12 9.33333"stroke=currentColor stroke-width=1.66667 stroke-linecap=round stroke-linejoin=round>`),cc=n(`<svg viewBox="0 0 24 24"height=12 width=12 fill=none xmlns=http://www.w3.org/2000/svg><path d="M12 2v2m0 16v2M4 12H2m4.314-5.686L4.9 4.9m12.786 1.414L19.1 4.9M6.314 17.69 4.9 19.104m12.786-1.414 1.414 1.414M22 12h-2m-3 0a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),lc=n(`<svg viewBox="0 0 24 24"height=12 width=12 fill=none xmlns=http://www.w3.org/2000/svg><path d="M22 15.844a10.424 10.424 0 0 1-4.306.925c-5.779 0-10.463-4.684-10.463-10.462 0-1.536.33-2.994.925-4.307A10.464 10.464 0 0 0 2 11.538C2 17.316 6.684 22 12.462 22c4.243 0 7.896-2.526 9.538-6.156Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),uc=n(`<svg viewBox="0 0 24 24"height=12 width=12 fill=none xmlns=http://www.w3.org/2000/svg><path d="M8 21h8m-4-4v4m-5.2-4h10.4c1.68 0 2.52 0 3.162-.327a3 3 0 0 0 1.311-1.311C22 14.72 22 13.88 22 12.2V7.8c0-1.68 0-2.52-.327-3.162a3 3 0 0 0-1.311-1.311C19.72 3 18.88 3 17.2 3H6.8c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.311 1.311C2 5.28 2 6.12 2 7.8v4.4c0 1.68 0 2.52.327 3.162a3 3 0 0 0 1.311 1.311C4.28 17 5.12 17 6.8 17Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),dc=n(`<svg stroke=currentColor fill=currentColor stroke-width=0 viewBox="0 0 24 24"height=1em width=1em xmlns=http://www.w3.org/2000/svg><path fill=none d="M0 0h24v24H0z"></path><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3a4.237 4.237 0 00-6 0zm-4-4l2 2a7.074 7.074 0 0110 0l2-2C15.14 9.14 8.87 9.14 5 13z">`),fc=n(`<svg stroke-width=0 viewBox="0 0 24 24"height=1em width=1em xmlns=http://www.w3.org/2000/svg><path fill=none d="M24 .01c0-.01 0-.01 0 0L0 0v24h24V.01zM0 0h24v24H0V0zm0 0h24v24H0V0z"></path><path d="M22.99 9C19.15 5.16 13.8 3.76 8.84 4.78l2.52 2.52c3.47-.17 6.99 1.05 9.63 3.7l2-2zm-4 4a9.793 9.793 0 00-4.49-2.56l3.53 3.53.96-.97zM2 3.05L5.07 6.1C3.6 6.82 2.22 7.78 1 9l1.99 2c1.24-1.24 2.67-2.16 4.2-2.77l2.24 2.24A9.684 9.684 0 005 13v.01L6.99 15a7.042 7.042 0 014.92-2.06L18.98 20l1.27-1.26L3.29 1.79 2 3.05zM9 17l3 3 3-3a4.237 4.237 0 00-6 0z">`),pc=n(`<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M9.3951 19.3711L9.97955 20.6856C10.1533 21.0768 10.4368 21.4093 10.7958 21.6426C11.1547 21.8759 11.5737 22.0001 12.0018 22C12.4299 22.0001 12.8488 21.8759 13.2078 21.6426C13.5667 21.4093 13.8503 21.0768 14.024 20.6856L14.6084 19.3711C14.8165 18.9047 15.1664 18.5159 15.6084 18.26C16.0532 18.0034 16.5678 17.8941 17.0784 17.9478L18.5084 18.1C18.9341 18.145 19.3637 18.0656 19.7451 17.8713C20.1265 17.6771 20.4434 17.3763 20.6573 17.0056C20.8715 16.635 20.9735 16.2103 20.9511 15.7829C20.9286 15.3555 20.7825 14.9438 20.5307 14.5978L19.684 13.4344C19.3825 13.0171 19.2214 12.5148 19.224 12C19.2239 11.4866 19.3865 10.9864 19.6884 10.5711L20.5351 9.40778C20.787 9.06175 20.933 8.65007 20.9555 8.22267C20.978 7.79528 20.8759 7.37054 20.6618 7C20.4479 6.62923 20.131 6.32849 19.7496 6.13423C19.3681 5.93997 18.9386 5.86053 18.5129 5.90556L17.0829 6.05778C16.5722 6.11141 16.0577 6.00212 15.6129 5.74556C15.17 5.48825 14.82 5.09736 14.6129 4.62889L14.024 3.31444C13.8503 2.92317 13.5667 2.59072 13.2078 2.3574C12.8488 2.12408 12.4299 1.99993 12.0018 2C11.5737 1.99993 11.1547 2.12408 10.7958 2.3574C10.4368 2.59072 10.1533 2.92317 9.97955 3.31444L9.3951 4.62889C9.18803 5.09736 8.83798 5.48825 8.3951 5.74556C7.95032 6.00212 7.43577 6.11141 6.9251 6.05778L5.49066 5.90556C5.06499 5.86053 4.6354 5.93997 4.25397 6.13423C3.87255 6.32849 3.55567 6.62923 3.34177 7C3.12759 7.37054 3.02555 7.79528 3.04804 8.22267C3.07052 8.65007 3.21656 9.06175 3.46844 9.40778L4.3151 10.5711C4.61704 10.9864 4.77964 11.4866 4.77955 12C4.77964 12.5134 4.61704 13.0137 4.3151 13.4289L3.46844 14.5922C3.21656 14.9382 3.07052 15.3499 3.04804 15.7773C3.02555 16.2047 3.12759 16.6295 3.34177 17C3.55589 17.3706 3.8728 17.6712 4.25417 17.8654C4.63554 18.0596 5.06502 18.1392 5.49066 18.0944L6.92066 17.9422C7.43133 17.8886 7.94587 17.9979 8.39066 18.2544C8.83519 18.511 9.18687 18.902 9.3951 19.3711Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round></path><path d="M12 15C13.6568 15 15 13.6569 15 12C15 10.3431 13.6568 9 12 9C10.3431 9 8.99998 10.3431 8.99998 12C8.99998 13.6569 10.3431 15 12 15Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),mc=n(`<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M16 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V8M11.5 12.5L17 7M17 7H12M17 7V12M6.2 21H8.8C9.9201 21 10.4802 21 10.908 20.782C11.2843 20.5903 11.5903 20.2843 11.782 19.908C12 19.4802 12 18.9201 12 17.8V15.2C12 14.0799 12 13.5198 11.782 13.092C11.5903 12.7157 11.2843 12.4097 10.908 12.218C10.4802 12 9.92011 12 8.8 12H6.2C5.0799 12 4.51984 12 4.09202 12.218C3.71569 12.4097 3.40973 12.7157 3.21799 13.092C3 13.5198 3 14.0799 3 15.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),hc=n(`<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path class=copier d="M8 8V5.2C8 4.0799 8 3.51984 8.21799 3.09202C8.40973 2.71569 8.71569 2.40973 9.09202 2.21799C9.51984 2 10.0799 2 11.2 2H18.8C19.9201 2 20.4802 2 20.908 2.21799C21.2843 2.40973 21.5903 2.71569 21.782 3.09202C22 3.51984 22 4.0799 22 5.2V12.8C22 13.9201 22 14.4802 21.782 14.908C21.5903 15.2843 21.2843 15.5903 20.908 15.782C20.4802 16 19.9201 16 18.8 16H16M5.2 22H12.8C13.9201 22 14.4802 22 14.908 21.782C15.2843 21.5903 15.5903 21.2843 15.782 20.908C16 20.4802 16 19.9201 16 18.8V11.2C16 10.0799 16 9.51984 15.782 9.09202C15.5903 8.71569 15.2843 8.40973 14.908 8.21799C14.4802 8 13.9201 8 12.8 8H5.2C4.0799 8 3.51984 8 3.09202 8.21799C2.71569 8.40973 2.40973 8.71569 2.21799 9.09202C2 9.51984 2 10.0799 2 11.2V18.8C2 19.9201 2 20.4802 2.21799 20.908C2.40973 21.2843 2.71569 21.5903 3.09202 21.782C3.51984 22 4.07989 22 5.2 22Z"stroke-width=2 stroke-linecap=round stroke-linejoin=round stroke=currentColor>`),gc=n(`<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M2.5 21.4998L8.04927 19.3655C8.40421 19.229 8.58168 19.1607 8.74772 19.0716C8.8952 18.9924 9.0358 18.901 9.16804 18.7984C9.31692 18.6829 9.45137 18.5484 9.72028 18.2795L21 6.99982C22.1046 5.89525 22.1046 4.10438 21 2.99981C19.8955 1.89525 18.1046 1.89524 17 2.99981L5.72028 14.2795C5.45138 14.5484 5.31692 14.6829 5.20139 14.8318C5.09877 14.964 5.0074 15.1046 4.92823 15.2521C4.83911 15.4181 4.77085 15.5956 4.63433 15.9506L2.5 21.4998ZM2.5 21.4998L4.55812 16.1488C4.7054 15.7659 4.77903 15.5744 4.90534 15.4867C5.01572 15.4101 5.1523 15.3811 5.2843 15.4063C5.43533 15.4351 5.58038 15.5802 5.87048 15.8703L8.12957 18.1294C8.41967 18.4195 8.56472 18.5645 8.59356 18.7155C8.61877 18.8475 8.58979 18.9841 8.51314 19.0945C8.42545 19.2208 8.23399 19.2944 7.85107 19.4417L2.5 21.4998Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),_c=n(`<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M7.5 12L10.5 15L16.5 9M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z"stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),vc=n(`<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M9 9L15 15M15 9L9 15M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z"stroke=#F04438 stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),yc=n(`<svg width=24 height=24 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 xmlns=http://www.w3.org/2000/svg><rect class=list width=20 height=20 y=2 x=2 rx=2></rect><line class=list-item y1=7 y2=7 x1=6 x2=18></line><line class=list-item y2=12 y1=12 x1=6 x2=18></line><line class=list-item y1=17 y2=17 x1=6 x2=18>`),bc=n(`<svg viewBox="0 0 24 24"height=20 width=20 fill=none xmlns=http://www.w3.org/2000/svg><path d="M3 7.8c0-1.68 0-2.52.327-3.162a3 3 0 0 1 1.311-1.311C5.28 3 6.12 3 7.8 3h8.4c1.68 0 2.52 0 3.162.327a3 3 0 0 1 1.311 1.311C21 5.28 21 6.12 21 7.8v8.4c0 1.68 0 2.52-.327 3.162a3 3 0 0 1-1.311 1.311C18.72 21 17.88 21 16.2 21H7.8c-1.68 0-2.52 0-3.162-.327a3 3 0 0 1-1.311-1.311C3 18.72 3 17.88 3 16.2V7.8Z"stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),xc=n(`<svg width=14 height=14 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M7.5 12L10.5 15L16.5 9M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),Sc=n(`<svg width=14 height=14 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M12 2V6M12 18V22M6 12H2M22 12H18M19.0784 19.0784L16.25 16.25M19.0784 4.99994L16.25 7.82837M4.92157 19.0784L7.75 16.25M4.92157 4.99994L7.75 7.82837"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round></path><animateTransform attributeName=transform attributeType=XML type=rotate from=0 to=360 dur=2s repeatCount=indefinite>`),Cc=n(`<svg width=14 height=14 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M15 9L9 15M9 9L15 15M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),wc=n(`<svg width=14 height=14 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M9.5 15V9M14.5 15V9M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),Tc=n(`<svg version=1.0 viewBox="0 0 633 633"><linearGradient x1=-666.45 x2=-666.45 y1=163.28 y2=163.99 gradientTransform="matrix(633 0 0 633 422177 -103358)"gradientUnits=userSpaceOnUse><stop stop-color=#6BDAFF offset=0></stop><stop stop-color=#F9FFB5 offset=.32></stop><stop stop-color=#FFA770 offset=.71></stop><stop stop-color=#FF7373 offset=1></stop></linearGradient><circle cx=316.5 cy=316.5 r=316.5></circle><defs><filter x=-137.5 y=412 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=-137.5 y=412 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=89.5 cy=610.5 rx=214.5 ry=186 fill=#015064 stroke=#00CFE2 stroke-width=25></ellipse></g><defs><filter x=316.5 y=412 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=316.5 y=412 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=543.5 cy=610.5 rx=214.5 ry=186 fill=#015064 stroke=#00CFE2 stroke-width=25></ellipse></g><defs><filter x=-137.5 y=450 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=-137.5 y=450 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=89.5 cy=648.5 rx=214.5 ry=186 fill=#015064 stroke=#00A8B8 stroke-width=25></ellipse></g><defs><filter x=316.5 y=450 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=316.5 y=450 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=543.5 cy=648.5 rx=214.5 ry=186 fill=#015064 stroke=#00A8B8 stroke-width=25></ellipse></g><defs><filter x=-137.5 y=486 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=-137.5 y=486 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=89.5 cy=684.5 rx=214.5 ry=186 fill=#015064 stroke=#007782 stroke-width=25></ellipse></g><defs><filter x=316.5 y=486 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=316.5 y=486 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=543.5 cy=684.5 rx=214.5 ry=186 fill=#015064 stroke=#007782 stroke-width=25></ellipse></g><defs><filter x=272.2 y=308 width=176.9 height=129.3 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=272.2 y=308 width=176.9 height=129.3 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><line x1=436 x2=431 y1=403.2 y2=431.8 fill=none stroke=#000 stroke-linecap=round stroke-linejoin=bevel stroke-width=11></line><line x1=291 x2=280 y1=341.5 y2=403.5 fill=none stroke=#000 stroke-linecap=round stroke-linejoin=bevel stroke-width=11></line><line x1=332.9 x2=328.6 y1=384.1 y2=411.2 fill=none stroke=#000 stroke-linecap=round stroke-linejoin=bevel stroke-width=11></line><linearGradient x1=-670.75 x2=-671.59 y1=164.4 y2=164.49 gradientTransform="matrix(-184.16 -32.472 -11.461 64.997 -121359 -32126)"gradientUnits=userSpaceOnUse><stop stop-color=#EE2700 offset=0></stop><stop stop-color=#FF008E offset=1></stop></linearGradient><path d="m344.1 363 97.7 17.2c5.8 2.1 8.2 6.1 7.1 12.1s-4.7 9.2-11 9.9l-106-18.7-57.5-59.2c-3.2-4.8-2.9-9.1 0.8-12.8s8.3-4.4 13.7-2.1l55.2 53.6z"clip-rule=evenodd fill-rule=evenodd></path><line x1=428.2 x2=429.1 y1=384.5 y2=378 fill=none stroke=#fff stroke-linecap=round stroke-linejoin=bevel stroke-width=7></line><line x1=395.2 x2=396.1 y1=379.5 y2=373 fill=none stroke=#fff stroke-linecap=round stroke-linejoin=bevel stroke-width=7></line><line x1=362.2 x2=363.1 y1=373.5 y2=367.4 fill=none stroke=#fff stroke-linecap=round stroke-linejoin=bevel stroke-width=7></line><line x1=324.2 x2=328.4 y1=351.3 y2=347.4 fill=none stroke=#fff stroke-linecap=round stroke-linejoin=bevel stroke-width=7></line><line x1=303.2 x2=307.4 y1=331.3 y2=327.4 fill=none stroke=#fff stroke-linecap=round stroke-linejoin=bevel stroke-width=7></line></g><defs><filter x=73.2 y=113.8 width=280.6 height=317.4 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=73.2 y=113.8 width=280.6 height=317.4 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><linearGradient x1=-672.16 x2=-672.16 y1=165.03 y2=166.03 gradientTransform="matrix(-100.18 48.861 97.976 200.88 -83342 -93.059)"gradientUnits=userSpaceOnUse><stop stop-color=#A17500 offset=0></stop><stop stop-color=#5D2100 offset=1></stop></linearGradient><path d="m192.3 203c8.1 37.3 14 73.6 17.8 109.1 3.8 35.4 2.8 75.1-3 119.2l61.2-16.7c-15.6-59-25.2-97.9-28.6-116.6s-10.8-51.9-22.1-99.6l-25.3 4.6"clip-rule=evenodd fill-rule=evenodd></path><g stroke=#2F8A00><linearGradient x1=-660.23 x2=-660.23 y1=166.72 y2=167.72 gradientTransform="matrix(92.683 4.8573 -2.0259 38.657 61680 -3088.6)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m195 183.9s-12.6-22.1-36.5-29.9c-15.9-5.2-34.4-1.5-55.5 11.1 15.9 14.3 29.5 22.6 40.7 24.9 16.8 3.6 51.3-6.1 51.3-6.1z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><linearGradient x1=-661.36 x2=-661.36 y1=164.18 y2=165.18 gradientTransform="matrix(110 5.7648 -6.3599 121.35 73933 -15933)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m194.9 184.5s-47.5-8.5-83.2 15.7c-23.8 16.2-34.3 49.3-31.6 99.4 30.3-27.8 52.1-48.5 65.2-61.9 19.8-20.2 49.6-53.2 49.6-53.2z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><linearGradient x1=-656.79 x2=-656.79 y1=165.15 y2=166.15 gradientTransform="matrix(62.954 3.2993 -3.5023 66.828 42156 -8754.1)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m195 183.9c-0.8-21.9 6-38 20.6-48.2s29.8-15.4 45.5-15.3c-6.1 21.4-14.5 35.8-25.2 43.4s-24.4 14.2-40.9 20.1z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><linearGradient x1=-663.07 x2=-663.07 y1=165.44 y2=166.44 gradientTransform="matrix(152.47 7.9907 -3.0936 59.029 101884 -4318.7)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m194.9 184.5c31.9-30 64.1-39.7 96.7-29s50.8 30.4 54.6 59.1c-35.2-5.5-60.4-9.6-75.8-12.1-15.3-2.6-40.5-8.6-75.5-18z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><linearGradient x1=-662.57 x2=-662.57 y1=164.44 y2=165.44 gradientTransform="matrix(136.46 7.1517 -5.2163 99.533 91536 -11442)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m194.9 184.5c35.8-7.6 65.6-0.2 89.2 22s37.7 49 42.3 80.3c-39.8-9.7-68.3-23.8-85.5-42.4s-32.5-38.5-46-59.9z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><linearGradient x1=-656.43 x2=-656.43 y1=163.86 y2=164.86 gradientTransform="matrix(60.866 3.1899 -8.7773 167.48 41560 -25168)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m194.9 184.5c-33.6 13.8-53.6 35.7-60.1 65.6s-3.6 63.1 8.7 99.6c27.4-40.3 43.2-69.6 47.4-88s5.6-44.1 4-77.2z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><path d="m196.5 182.3c-14.8 21.6-25.1 41.4-30.8 59.4s-9.5 33-11.1 45.1"fill=none stroke-linecap=round stroke-width=8></path><path d="m194.9 185.7c-24.4 1.7-43.8 9-58.1 21.8s-24.7 25.4-31.3 37.8"fill=none stroke-linecap=round stroke-width=8></path><path d="m204.5 176.4c29.7-6.7 52-8.4 67-5.1s26.9 8.6 35.8 15.9"fill=none stroke-linecap=round stroke-width=8></path><path d="m196.5 181.4c20.3 9.9 38.2 20.5 53.9 31.9s27.4 22.1 35.1 32"fill=none stroke-linecap=round stroke-width=8></path></g></g><defs><filter x=50.5 y=399 width=532 height=633 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=50.5 y=399 width=532 height=633 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><linearGradient x1=-666.06 x2=-666.23 y1=163.36 y2=163.75 gradientTransform="matrix(532 0 0 633 354760 -102959)"gradientUnits=userSpaceOnUse><stop stop-color=#FFF400 offset=0></stop><stop stop-color=#3C8700 offset=1></stop></linearGradient><ellipse cx=316.5 cy=715.5 rx=266 ry=316.5></ellipse></g><defs><filter x=391 y=-24 width=288 height=283 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=391 y=-24 width=288 height=283 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><linearGradient x1=-664.56 x2=-664.56 y1=163.79 y2=164.79 gradientTransform="matrix(227 0 0 227 151421 -37204)"gradientUnits=userSpaceOnUse><stop stop-color=#FFDF00 offset=0></stop><stop stop-color=#FF9D00 offset=1></stop></linearGradient><circle cx=565.5 cy=89.5 r=113.5></circle><linearGradient x1=-644.5 x2=-645.77 y1=342 y2=342 gradientTransform="matrix(30 0 0 1 19770 -253)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=427 x2=397 y1=89 y2=89 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-641.56 x2=-642.83 y1=196.02 y2=196.07 gradientTransform="matrix(26.5 0 0 5.5 17439 -1025.5)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=430.5 x2=404 y1=55.5 y2=50 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-643.73 x2=-645 y1=185.83 y2=185.9 gradientTransform="matrix(29 0 0 8 19107 -1361)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=431 x2=402 y1=122 y2=130 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-638.94 x2=-640.22 y1=177.09 y2=177.39 gradientTransform="matrix(24 0 0 13 15783 -2145)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=442 x2=418 y1=153 y2=166 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-633.42 x2=-634.7 y1=172.41 y2=173.31 gradientTransform="matrix(20 0 0 19 13137 -3096)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=464 x2=444 y1=180 y2=199 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-619.05 x2=-619.52 y1=170.82 y2=171.82 gradientTransform="matrix(13.83 0 0 22.85 9050 -3703.4)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=491.4 x2=477.5 y1=203 y2=225.9 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-578.5 x2=-578.63 y1=170.31 y2=171.31 gradientTransform="matrix(7.5 0 0 24.5 4860 -3953)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=524.5 x2=517 y1=219.5 y2=244 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=666.5 x2=666.5 y1=170.31 y2=171.31 gradientTransform="matrix(.5 0 0 24.5 231.5 -3944)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=564.5 x2=565 y1=228.5 y2=253 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12>`);function Ec(){return tc()}function Dc(){return nc()}function Oc(){return rc()}function kc(){return ic()}function Ac(){return ac()}function jc(){return oc()}function Mc(){return sc()}function Nc(){return cc()}function Pc(){return lc()}function Fc(){return uc()}function Ic(){return dc()}function Lc(){return fc()}function Rc(){return pc()}function zc(){return mc()}function Bc(){return hc()}function Vc(){return gc()}function Hc(e){return(()=>{var t=_c(),n=t.firstChild;return j(()=>h(n,`stroke`,e.theme===`dark`?`#12B76A`:`#027A48`)),t})()}function Uc(){return vc()}function Wc(){return yc()}function Gc(e){return[R(A,{get when(){return e.checked},get children(){var t=_c(),n=t.firstChild;return j(()=>h(n,`stroke`,e.theme===`dark`?`#9B8AFB`:`#6938EF`)),t}}),R(A,{get when(){return!e.checked},get children(){var t=bc(),n=t.firstChild;return j(()=>h(n,`stroke`,e.theme===`dark`?`#9B8AFB`:`#6938EF`)),t}})]}function Kc(){return xc()}function qc(){return Sc()}function Jc(){return Cc()}function Yc(){return wc()}function Xc(){let e=M();return(()=>{var t=Tc(),n=t.firstChild,r=n.nextSibling,i=r.nextSibling,a=i.firstChild,o=i.nextSibling,s=o.firstChild,c=o.nextSibling,l=c.nextSibling,u=l.firstChild,d=l.nextSibling,f=d.firstChild,p=d.nextSibling,m=p.nextSibling,g=m.firstChild,_=m.nextSibling,v=_.firstChild,y=_.nextSibling,b=y.nextSibling,x=b.firstChild,S=b.nextSibling,C=S.firstChild,w=S.nextSibling,T=w.nextSibling,E=T.firstChild,D=T.nextSibling,O=D.firstChild,k=D.nextSibling,A=k.nextSibling,j=A.firstChild,ee=A.nextSibling,M=ee.firstChild,N=ee.nextSibling,P=N.nextSibling,te=P.firstChild,F=P.nextSibling,I=F.firstChild,ne=F.nextSibling,re=ne.firstChild.nextSibling.nextSibling.nextSibling,ie=re.nextSibling,L=ne.nextSibling,R=L.firstChild,ae=L.nextSibling,z=ae.firstChild,oe=ae.nextSibling,se=oe.firstChild,ce=se.nextSibling,le=ce.nextSibling.firstChild,ue=le.nextSibling,de=ue.nextSibling,fe=de.nextSibling,B=fe.nextSibling,pe=B.nextSibling,me=pe.nextSibling,he=me.nextSibling,ge=he.nextSibling,_e=ge.nextSibling,ve=_e.nextSibling,ye=ve.nextSibling,be=oe.nextSibling,xe=be.firstChild,Se=be.nextSibling,Ce=Se.firstChild,we=Se.nextSibling,Te=we.firstChild,Ee=Te.nextSibling,De=we.nextSibling,Oe=De.firstChild,ke=De.nextSibling,Ae=ke.firstChild,je=ke.nextSibling,Me=je.firstChild,Ne=Me.nextSibling,Pe=Ne.nextSibling,Fe=Pe.nextSibling,V=Fe.nextSibling,Ie=V.nextSibling,Le=Ie.nextSibling,Re=Le.nextSibling,ze=Re.nextSibling,Be=ze.nextSibling,H=Be.nextSibling,Ve=H.nextSibling,He=Ve.nextSibling,Ue=He.nextSibling,We=Ue.nextSibling,U=We.nextSibling,Ge=U.nextSibling,Ke=Ge.nextSibling;return h(n,`id`,`a-${e}`),h(r,`fill`,`url(#a-${e})`),h(a,`id`,`am-${e}`),h(o,`id`,`b-${e}`),h(s,`filter`,`url(#am-${e})`),h(c,`mask`,`url(#b-${e})`),h(u,`id`,`ah-${e}`),h(d,`id`,`k-${e}`),h(f,`filter`,`url(#ah-${e})`),h(p,`mask`,`url(#k-${e})`),h(g,`id`,`ae-${e}`),h(_,`id`,`j-${e}`),h(v,`filter`,`url(#ae-${e})`),h(y,`mask`,`url(#j-${e})`),h(x,`id`,`ai-${e}`),h(S,`id`,`i-${e}`),h(C,`filter`,`url(#ai-${e})`),h(w,`mask`,`url(#i-${e})`),h(E,`id`,`aj-${e}`),h(D,`id`,`h-${e}`),h(O,`filter`,`url(#aj-${e})`),h(k,`mask`,`url(#h-${e})`),h(j,`id`,`ag-${e}`),h(ee,`id`,`g-${e}`),h(M,`filter`,`url(#ag-${e})`),h(N,`mask`,`url(#g-${e})`),h(te,`id`,`af-${e}`),h(F,`id`,`f-${e}`),h(I,`filter`,`url(#af-${e})`),h(ne,`mask`,`url(#f-${e})`),h(re,`id`,`m-${e}`),h(ie,`fill`,`url(#m-${e})`),h(R,`id`,`ak-${e}`),h(ae,`id`,`e-${e}`),h(z,`filter`,`url(#ak-${e})`),h(oe,`mask`,`url(#e-${e})`),h(se,`id`,`n-${e}`),h(ce,`fill`,`url(#n-${e})`),h(le,`id`,`r-${e}`),h(ue,`fill`,`url(#r-${e})`),h(de,`id`,`s-${e}`),h(fe,`fill`,`url(#s-${e})`),h(B,`id`,`q-${e}`),h(pe,`fill`,`url(#q-${e})`),h(me,`id`,`p-${e}`),h(he,`fill`,`url(#p-${e})`),h(ge,`id`,`o-${e}`),h(_e,`fill`,`url(#o-${e})`),h(ve,`id`,`l-${e}`),h(ye,`fill`,`url(#l-${e})`),h(xe,`id`,`al-${e}`),h(Se,`id`,`d-${e}`),h(Ce,`filter`,`url(#al-${e})`),h(we,`mask`,`url(#d-${e})`),h(Te,`id`,`u-${e}`),h(Ee,`fill`,`url(#u-${e})`),h(Oe,`id`,`ad-${e}`),h(ke,`id`,`c-${e}`),h(Ae,`filter`,`url(#ad-${e})`),h(je,`mask`,`url(#c-${e})`),h(Me,`id`,`t-${e}`),h(Ne,`fill`,`url(#t-${e})`),h(Pe,`id`,`v-${e}`),h(Fe,`stroke`,`url(#v-${e})`),h(V,`id`,`aa-${e}`),h(Ie,`stroke`,`url(#aa-${e})`),h(Le,`id`,`w-${e}`),h(Re,`stroke`,`url(#w-${e})`),h(ze,`id`,`ac-${e}`),h(Be,`stroke`,`url(#ac-${e})`),h(H,`id`,`ab-${e}`),h(Ve,`stroke`,`url(#ab-${e})`),h(He,`id`,`y-${e}`),h(Ue,`stroke`,`url(#y-${e})`),h(We,`id`,`x-${e}`),h(U,`stroke`,`url(#x-${e})`),h(Ge,`id`,`z-${e}`),h(Ke,`stroke`,`url(#z-${e})`),t})()}var Zc=n(`<span><svg width=16 height=16 viewBox="0 0 16 16"fill=none xmlns=http://www.w3.org/2000/svg><path d="M6 12L10 8L6 4"stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),Qc=n(`<button title="Copy object to clipboard">`),$c=n(`<button title="Remove all items"aria-label="Remove all items">`),el=n(`<button title="Delete item"aria-label="Delete item">`),tl=n(`<button title="Toggle value"aria-label="Toggle value">`),nl=n(`<button title="Bulk Edit Data"aria-label="Bulk Edit Data">`),rl=n(`<div>`),il=n(`<div><button> <span></span> <span> `),al=n(`<input>`),ol=n(`<span>`),sl=n(`<div><label>:`),cl=n(`<div><div><button> [<!>...<!>]`);function ll(e,t){let n=0,r=[];for(;n<e.length;)r.push(e.slice(n,n+t)),n+=t;return r}var ul=e=>{let t=H(),n=V().shadowDOMTarget?W.bind({target:V().shadowDOMTarget}):W,r=k(()=>t()===`dark`?yl(n):vl(n));return(()=>{var t=Zc();return j(()=>N(t,G(r().expander,n`
          transform: rotate(${e.expanded?90:0}deg);
        `,e.expanded&&n`
            & svg {
              top: -1px;
            }
          `))),t})()},dl=e=>{let t=H(),n=V().shadowDOMTarget?W.bind({target:V().shadowDOMTarget}):W,r=k(()=>t()===`dark`?yl(n):vl(n)),[i,o]=I(`NoCopy`);return(()=>{var n=Qc();return ne(n,`click`,i()===`NoCopy`?()=>{navigator.clipboard.writeText(le(e.value)).then(()=>{o(`SuccessCopy`),setTimeout(()=>{o(`NoCopy`)},1500)},e=>{o(`ErrorCopy`),setTimeout(()=>{o(`NoCopy`)},1500)})}:void 0,!0),a(n,R(ae,{get children(){return[R(g,{get when(){return i()===`NoCopy`},get children(){return R(Bc,{})}}),R(g,{get when(){return i()===`SuccessCopy`},get children(){return R(Hc,{get theme(){return t()}})}}),R(g,{get when(){return i()===`ErrorCopy`},get children(){return R(Uc,{})}})]}})),j(e=>{var t=r().actionButton,a=`${i()===`NoCopy`?`Copy object to clipboard`:i()===`SuccessCopy`?`Object copied to clipboard`:`Error copying object to clipboard`}`;return t!==e.e&&N(n,e.e=t),a!==e.t&&h(n,`aria-label`,e.t=a),e},{e:void 0,t:void 0}),n})()},fl=e=>{let t=H(),n=V().shadowDOMTarget?W.bind({target:V().shadowDOMTarget}):W,r=k(()=>t()===`dark`?yl(n):vl(n)),i=V().client;return(()=>{var t=$c();return t.$$click=()=>{let t=e.activeQuery.state.data,n=c(t,e.dataPath,[]);i.setQueryData(e.activeQuery.queryKey,n)},a(t,R(Wc,{})),j(()=>N(t,r().actionButton)),t})()},pl=e=>{let t=H(),n=V().shadowDOMTarget?W.bind({target:V().shadowDOMTarget}):W,r=k(()=>t()===`dark`?yl(n):vl(n)),i=V().client;return(()=>{var t=el();return t.$$click=()=>{let t=e.activeQuery.state.data,n=E(t,e.dataPath);i.setQueryData(e.activeQuery.queryKey,n)},a(t,R(Dc,{})),j(()=>N(t,G(r().actionButton))),t})()},ml=e=>{let t=H(),n=V().shadowDOMTarget?W.bind({target:V().shadowDOMTarget}):W,r=k(()=>t()===`dark`?yl(n):vl(n)),i=V().client;return(()=>{var o=tl();return o.$$click=()=>{let t=e.activeQuery.state.data,n=c(t,e.dataPath,!e.value);i.setQueryData(e.activeQuery.queryKey,n)},a(o,R(Gc,{get theme(){return t()},get checked(){return e.value}})),j(()=>N(o,G(r().actionButton,n`
          width: ${Q.size[3.5]};
          height: ${Q.size[3.5]};
        `))),o})()};function hl(e){return Symbol.iterator in e}function gl(e){let t=H(),n=V().shadowDOMTarget?W.bind({target:V().shadowDOMTarget}):W,r=k(()=>t()===`dark`?yl(n):vl(n)),o=V().client,[s,l]=I((e.defaultExpanded||[]).includes(e.label)),u=()=>l(e=>!e),[d,f]=I([]),m=k(()=>Array.isArray(e.value)?e.value.map((e,t)=>({label:t.toString(),value:e})):e.value!==null&&typeof e.value==`object`&&hl(e.value)&&typeof e.value[Symbol.iterator]==`function`?e.value instanceof Map?Array.from(e.value,([e,t])=>({label:e,value:t})):Array.from(e.value,(e,t)=>({label:t.toString(),value:e})):typeof e.value==`object`&&e.value!==null?Object.entries(e.value).map(([e,t])=>({label:e,value:t})):[]),g=k(()=>Array.isArray(e.value)?`array`:e.value!==null&&typeof e.value==`object`&&hl(e.value)&&typeof e.value[Symbol.iterator]==`function`?`Iterable`:typeof e.value==`object`&&e.value!==null?`object`:typeof e.value),_=k(()=>ll(m(),100)),v=e.dataPath??[],y=M();return(()=>{var t=rl();return a(t,R(A,{get when(){return _().length},get children(){return[(()=>{var t=il(),n=t.firstChild,o=n.firstChild,c=o.nextSibling,l=c.nextSibling.nextSibling,d=l.firstChild;return n.$$click=()=>u(),a(n,R(ul,{get expanded(){return s()}}),o),a(c,()=>e.label),a(l,()=>String(g()).toLowerCase()===`iterable`?`(Iterable) `:``,d),a(l,()=>m().length,d),a(l,()=>m().length>1?`items`:`item`,null),a(t,R(A,{get when(){return e.editable},get children(){var t=rl();return a(t,R(dl,{get value(){return e.value}}),null),a(t,R(A,{get when(){return i(()=>!!e.itemsDeletable)()&&e.activeQuery!==void 0},get children(){return R(pl,{get activeQuery(){return e.activeQuery},dataPath:v})}}),null),a(t,R(A,{get when(){return i(()=>g()===`array`)()&&e.activeQuery!==void 0},get children(){return R(fl,{get activeQuery(){return e.activeQuery},dataPath:v})}}),null),a(t,R(A,{get when(){return i(()=>!!e.onEdit)()&&!p(e.value).meta},get children(){var t=nl();return t.$$click=()=>{e.onEdit?.()},a(t,R(Vc,{})),j(()=>N(t,r().actionButton)),t}}),null),j(()=>N(t,r().actions)),t}}),null),j(e=>{var i=r().expanderButtonContainer,a=r().expanderButton,o=s()?`true`:`false`,c=r().info;return i!==e.e&&N(t,e.e=i),a!==e.t&&N(n,e.t=a),o!==e.a&&h(n,`aria-expanded`,e.a=o),c!==e.o&&N(l,e.o=c),e},{e:void 0,t:void 0,a:void 0,o:void 0}),t})(),R(A,{get when(){return s()},get children(){return[R(A,{get when(){return _().length===1},get children(){var t=rl();return a(t,R(wt,{get each(){return m()},by:e=>e.label,children:t=>R(gl,{get defaultExpanded(){return e.defaultExpanded},get label(){return t().label},get value(){return t().value},get editable(){return e.editable},get dataPath(){return[...v,t().label]},get activeQuery(){return e.activeQuery},get itemsDeletable(){return g()===`array`||g()===`Iterable`||g()===`object`}})})),j(()=>N(t,r().subEntry)),t}}),R(A,{get when(){return _().length>1},get children(){var t=rl();return a(t,R(T,{get each(){return _()},children:(t,n)=>(()=>{var i=cl(),o=i.firstChild,s=o.firstChild,c=s.firstChild,l=c.nextSibling,u=l.nextSibling.nextSibling;return u.nextSibling,s.$$click=()=>f(e=>e.includes(n)?e.filter(e=>e!==n):[...e,n]),a(s,R(ul,{get expanded(){return d().includes(n)}}),c),a(s,n*100,l),a(s,n*100+100-1,u),a(o,R(A,{get when(){return d().includes(n)},get children(){var n=rl();return a(n,R(wt,{get each(){return t()},by:e=>e.label,children:t=>R(gl,{get defaultExpanded(){return e.defaultExpanded},get label(){return t().label},get value(){return t().value},get editable(){return e.editable},get dataPath(){return[...v,t().label]},get activeQuery(){return e.activeQuery}})})),j(()=>N(n,r().subEntry)),n}}),null),j(e=>{var t=r().entry,n=r().expanderButton;return t!==e.e&&N(o,e.e=t),n!==e.t&&N(s,e.t=n),e},{e:void 0,t:void 0}),i})()})),j(()=>N(t,r().subEntry)),t}})]}})]}}),null),a(t,R(A,{get when(){return _().length===0},get children(){var t=sl(),n=t.firstChild,s=n.firstChild;return h(n,`for`,y),a(n,()=>e.label,s),a(t,R(A,{get when(){return i(()=>!!(e.editable&&e.activeQuery!==void 0))()&&(g()===`string`||g()===`number`||g()===`boolean`)},get fallback(){return(()=>{var t=ol();return a(t,()=>oe(e.value)),j(()=>N(t,r().value)),t})()},get children(){return[R(A,{get when(){return i(()=>!!(e.editable&&e.activeQuery!==void 0))()&&(g()===`string`||g()===`number`)},get children(){var t=al();return t.addEventListener(`change`,t=>{let n=e.activeQuery.state.data,r=c(n,v,g()===`number`?t.target.valueAsNumber:t.target.value);o.setQueryData(e.activeQuery.queryKey,r)}),h(t,`id`,y),j(e=>{var n=g()===`number`?`number`:`text`,i=G(r().value,r().editableInput);return n!==e.e&&h(t,`type`,e.e=n),i!==e.t&&N(t,e.t=i),e},{e:void 0,t:void 0}),j(()=>t.value=e.value),t}}),R(A,{get when(){return g()===`boolean`},get children(){var t=ol();return a(t,R(ml,{get activeQuery(){return e.activeQuery},dataPath:v,get value(){return e.value}}),null),a(t,()=>oe(e.value),null),j(()=>N(t,G(r().value,r().actions,r().editableInput))),t}})]}}),null),a(t,R(A,{get when(){return i(()=>!!(e.editable&&e.itemsDeletable))()&&e.activeQuery!==void 0},get children(){return R(pl,{get activeQuery(){return e.activeQuery},dataPath:v})}}),null),j(e=>{var i=r().row,a=r().label;return i!==e.e&&N(t,e.e=i),a!==e.t&&N(n,e.t=a),e},{e:void 0,t:void 0}),t}}),null),j(()=>N(t,r().entry)),t})()}var _l=(e,t)=>{let{colors:n,font:r,size:i,border:a}=Q,o=(t,n)=>e===`light`?t:n;return{entry:t`
      & * {
        font-size: ${r.size.xs};
        font-family:
          ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
          'Liberation Mono', 'Courier New', monospace;
      }
      position: relative;
      outline: none;
      word-break: break-word;
    `,subEntry:t`
      margin: 0 0 0 0.5em;
      padding-left: 0.75em;
      border-left: 2px solid ${o(n.gray[300],n.darkGray[400])};
      /* outline: 1px solid ${n.teal[400]}; */
    `,expander:t`
      & path {
        stroke: ${n.gray[400]};
      }
      & svg {
        width: ${i[3]};
        height: ${i[3]};
      }
      display: inline-flex;
      align-items: center;
      transition: all 0.1s ease;
      /* outline: 1px solid ${n.blue[400]}; */
    `,expanderButtonContainer:t`
      display: flex;
      align-items: center;
      line-height: ${i[4]};
      min-height: ${i[4]};
      gap: ${i[2]};
    `,expanderButton:t`
      cursor: pointer;
      color: inherit;
      font: inherit;
      outline: inherit;
      height: ${i[5]};
      background: transparent;
      border: none;
      padding: 0;
      display: inline-flex;
      align-items: center;
      gap: ${i[1]};
      position: relative;
      /* outline: 1px solid ${n.green[400]}; */

      &:focus-visible {
        border-radius: ${a.radius.xs};
        outline: 2px solid ${n.blue[800]};
      }

      & svg {
        position: relative;
        left: 1px;
      }
    `,info:t`
      color: ${o(n.gray[500],n.gray[500])};
      font-size: ${r.size.xs};
      margin-left: ${i[1]};
      /* outline: 1px solid ${n.yellow[400]}; */
    `,label:t`
      color: ${o(n.gray[700],n.gray[300])};
      white-space: nowrap;
    `,value:t`
      color: ${o(n.purple[600],n.purple[400])};
      flex-grow: 1;
    `,actions:t`
      display: inline-flex;
      gap: ${i[2]};
      align-items: center;
    `,row:t`
      display: inline-flex;
      gap: ${i[2]};
      width: 100%;
      margin: ${i[.25]} 0px;
      line-height: ${i[4.5]};
      align-items: center;
    `,editableInput:t`
      border: none;
      padding: ${i[.5]} ${i[1]} ${i[.5]} ${i[1.5]};
      flex-grow: 1;
      border-radius: ${a.radius.xs};
      background-color: ${o(n.gray[200],n.darkGray[500])};

      &:hover {
        background-color: ${o(n.gray[300],n.darkGray[600])};
      }
    `,actionButton:t`
      background-color: transparent;
      color: ${o(n.gray[500],n.gray[500])};
      border: none;
      display: inline-flex;
      padding: 0px;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      width: ${i[3]};
      height: ${i[3]};
      position: relative;
      z-index: 1;

      &:hover svg {
        color: ${o(n.gray[600],n.gray[400])};
      }

      &:focus-visible {
        border-radius: ${a.radius.xs};
        outline: 2px solid ${n.blue[800]};
        outline-offset: 2px;
      }
    `}},vl=e=>_l(`light`,e),yl=e=>_l(`dark`,e);ee([`click`]);var bl=n(`<div><div aria-hidden=true></div><button type=button aria-label="Open Tanstack query devtools"class=tsqd-open-btn>`),xl=n(`<div>`),Sl=n(`<div style=--tsqd-font-size:16px;max-height:100vh;height:100vh;width:100vw>`),Cl=n(`<div style=--tsqd-font-size:16px>`),wl=n(`<aside aria-label="Tanstack query devtools"><div role=separator aria-label="Resize devtools panel"tabindex=0></div><button aria-label="Close tanstack query devtools">`),Tl=n(`<select name=tsqd-queries-filter-sort aria-label="Sort queries by">`),El=n(`<select name=tsqd-mutations-filter-sort aria-label="Sort mutations by">`),Dl=n(`<span>Asc`),Ol=n(`<span>Desc`),kl=n(`<button aria-label="Open in picture-in-picture mode"title="Open in picture-in-picture mode">`),Al=n(`<div>Settings`),jl=n(`<span>Position`),Ml=n(`<span>Top`),Nl=n(`<span>Bottom`),Pl=n(`<span>Left`),Fl=n(`<span>Right`),Il=n(`<span>Theme`),Ll=n(`<span>Light`),Rl=n(`<span>Dark`),zl=n(`<span>System`),Bl=n(`<span>Disabled Queries`),Vl=n(`<span>Show`),Hl=n(`<span>Hide`),Ul=n(`<div><div class=tsqd-queries-container>`),Wl=n(`<div><div class=tsqd-mutations-container>`),Gl=n(`<div><div><div><button aria-label="Close Tanstack query devtools"><span>TANSTACK</span><span> v</span></button></div></div><div><div><div><input aria-label="Filter queries by query key"type=text placeholder=Filter name=tsqd-query-filter-input></div><div></div><button class=tsqd-query-filter-sort-order-btn></button></div><div><button aria-label="Clear query cache"></button><button>`),Kl=n(`<option>Sort by `),ql=n(`<div class=tsqd-query-disabled-indicator aria-hidden=true>disabled`),Jl=n(`<div class=tsqd-query-static-indicator aria-hidden=true>static`),Yl=n(`<button><div></div><code class=tsqd-query-hash>`),Xl=n(`<div role=tooltip id=tsqd-status-tooltip>`),Zl=n(`<span>`),Ql=n(`<button><span aria-hidden=true></span><span>`),$l=n(`<button><span aria-hidden=true></span> Error`),eu=n(`<div><span aria-hidden=true></span>Trigger Error<select aria-label="Select error type to trigger"><option value disabled selected>`),tu=n(`<div class="tsqd-query-details-explorer-container tsqd-query-details-data-explorer">`),nu=n(`<form><textarea name=data aria-label="Edit query data as JSON"></textarea><div><span></span><div><button type=button>Cancel</button><button>Save`),ru=n(`<div><div role=heading aria-level=2>Query Details</div><div><div class=tsqd-query-details-summary><pre><code></code></pre><span role=status aria-live=polite></span></div><div class=tsqd-query-details-observers-count><span>Observers:</span><span></span></div><div class=tsqd-query-details-last-updated><span>Last Updated:</span><span></span></div></div><div role=heading aria-level=2>Actions</div><div><button><span aria-hidden=true></span>Refetch</button><button><span aria-hidden=true></span>Invalidate</button><button><span aria-hidden=true></span>Reset</button><button><span aria-hidden=true></span>Remove</button><button><span aria-hidden=true></span> Loading</button></div><div role=heading aria-level=2>Data </div><div role=heading aria-level=2>Query Explorer</div><div class="tsqd-query-details-explorer-container tsqd-query-details-query-explorer">`),iu=n(`<option>`),au=n(`<div><div role=heading aria-level=2>Mutation Details</div><div><div class=tsqd-query-details-summary><pre><code></code></pre><span role=status aria-live=polite></span></div><div class=tsqd-query-details-last-updated><span>Submitted At:</span><span></span></div></div><div role=heading aria-level=2>Variables Details</div><div class="tsqd-query-details-explorer-container tsqd-query-details-query-explorer"></div><div role=heading aria-level=2>Context Details</div><div class="tsqd-query-details-explorer-container tsqd-query-details-query-explorer"></div><div role=heading aria-level=2>Data Explorer</div><div class="tsqd-query-details-explorer-container tsqd-query-details-query-explorer"></div><div role=heading aria-level=2>Mutations Explorer</div><div class="tsqd-query-details-explorer-container tsqd-query-details-query-explorer">`),[ou,su]=I(null),[cu,lu]=I(null),[uu,du]=I(0),[fu,pu]=I(!1),mu=t=>{let n=H(),r=V().shadowDOMTarget?W.bind({target:V().shadowDOMTarget}):W,o=k(()=>n()===`dark`?Fu(r):Pu(r)),s=k(()=>V().onlineManager);f(()=>{let e=s().subscribe(e=>{pu(!e)});P(()=>{e()})});let c=ze(),l=k(()=>V().buttonPosition||Te),u=k(()=>t.localStore.open===`true`?!0:t.localStore.open===`false`?!1:V().initialIsOpen||Oe),d=k(()=>t.localStore.position||V().position||Ee),p;z(()=>{let e=p.parentElement,n=t.localStore.height||ke,r=t.localStore.width||je,i=d();e.style.setProperty(`--tsqd-panel-height`,`${i===`top`?`-`:``}${n}px`),e.style.setProperty(`--tsqd-panel-width`,`${i===`left`?`-`:``}${r}px`)}),f(()=>{let e=()=>{let e=p.parentElement,t=getComputedStyle(e).fontSize;e.style.setProperty(`--tsqd-font-size`,t)};e(),window.addEventListener(`focus`,e),P(()=>{window.removeEventListener(`focus`,e)})});let m=k(()=>t.localStore.pip_open??`false`);return[R(A,{get when(){return i(()=>!!c().pipWindow)()&&m()==`true`},get children(){return R(e,{get mount(){return c().pipWindow?.document.body},get children(){return R(hu,{get children(){return R(vu,t)}})}})}}),(()=>{var e=xl(),n=p;return typeof n==`function`?b(n,e):p=e,a(e,R(bt,{name:`tsqd-panel-transition`,get children(){return R(A,{get when(){return i(()=>!(!u()||c().pipWindow))()&&m()==`false`},get children(){return R(_u,{get localStore(){return t.localStore},get setLocalStore(){return t.setLocalStore}})}})}}),null),a(e,R(bt,{name:`tsqd-button-transition`,get children(){return R(A,{get when(){return!u()},get children(){var e=bl(),n=e.firstChild,r=n.nextSibling;return a(n,R(Xc,{})),r.$$click=()=>t.setLocalStore(`open`,`true`),a(r,R(Xc,{})),j(()=>N(e,G(o().devtoolsBtn,o()[`devtoolsBtn-position-${l()}`],`tsqd-open-btn-container`))),e}})}}),null),j(()=>N(e,G(r`
            & .tsqd-panel-transition-exit-active,
            & .tsqd-panel-transition-enter-active {
              transition:
                opacity 0.3s,
                transform 0.3s;
            }

            & .tsqd-panel-transition-exit-to,
            & .tsqd-panel-transition-enter {
              ${d()===`top`||d()===`bottom`?`transform: translateY(var(--tsqd-panel-height));`:`transform: translateX(var(--tsqd-panel-width));`}
            }

            & .tsqd-button-transition-exit-active,
            & .tsqd-button-transition-enter-active {
              transition:
                opacity 0.3s,
                transform 0.3s;
              opacity: 1;
            }

            & .tsqd-button-transition-exit-to,
            & .tsqd-button-transition-enter {
              transform: ${l()===`relative`?`none;`:l()===`top-left`?`translateX(-72px);`:l()===`top-right`?`translateX(72px);`:`translateY(72px);`};
              opacity: 0;
            }
          `,`tsqd-transitions-container`))),e})()]},hu=e=>{let t=ze(),n=H(),r=V().shadowDOMTarget?W.bind({target:V().shadowDOMTarget}):W,i=k(()=>n()===`dark`?Fu(r):Pu(r)),o=()=>{let{colors:e}=Q,t=(e,t)=>n()===`dark`?t:e;return uu()<Ce?r`
        flex-direction: column;
        background-color: ${t(e.gray[300],e.gray[600])};
      `:r`
      flex-direction: row;
      background-color: ${t(e.gray[200],e.darkGray[900])};
    `};return z(()=>{let e=t().pipWindow,n=()=>{e&&du(e.innerWidth)};e&&(e.addEventListener(`resize`,n),n()),P(()=>{e&&e.removeEventListener(`resize`,n)})}),(()=>{var t=Sl();return a(t,()=>e.children),j(()=>N(t,G(i().panel,o(),{[r`
            min-width: min-content;
          `]:uu()<we},`tsqd-main-panel`))),t})()},gu=e=>{let t=H(),n=V().shadowDOMTarget?W.bind({target:V().shadowDOMTarget}):W,r=k(()=>t()===`dark`?Fu(n):Pu(n)),i;f(()=>{Ot(i,({width:e},t)=>{t===i&&du(e)})});let o=()=>{let{colors:e}=Q,r=(e,n)=>t()===`dark`?n:e;return uu()<Ce?n`
        flex-direction: column;
        background-color: ${r(e.gray[300],e.gray[600])};
      `:n`
      flex-direction: row;
      background-color: ${r(e.gray[200],e.darkGray[900])};
    `};return(()=>{var t=Cl(),s=i;return typeof s==`function`?b(s,t):i=t,a(t,()=>e.children),j(()=>N(t,G(r().parentPanel,o(),{[n`
            min-width: min-content;
          `]:uu()<we},`tsqd-main-panel`))),t})()},_u=e=>{let t=H(),n=V().shadowDOMTarget?W.bind({target:V().shadowDOMTarget}):W,r=k(()=>t()===`dark`?Fu(n):Pu(n)),i;f(()=>{i.focus()});let[s,c]=I(!1),l=k(()=>e.localStore.position||V().position||Ee),u=t=>{let n=t.currentTarget.parentElement;if(!n)return;c(!0);let{height:r,width:i}=n.getBoundingClientRect(),a=t.clientX,o=t.clientY,u=0,d=re(3.5),f=re(12),p=t=>{if(t.preventDefault(),l()===`left`||l()===`right`){let r=l()===`right`?a-t.clientX:t.clientX-a;u=Math.round(i+r),u<f&&(u=f),e.setLocalStore(`width`,String(Math.round(u)));let o=n.getBoundingClientRect().width;Number(e.localStore.width)<o&&e.setLocalStore(`width`,String(o))}else{let n=l()===`bottom`?o-t.clientY:t.clientY-o;u=Math.round(r+n),u<d&&(u=d,su(null)),e.setLocalStore(`height`,String(Math.round(u)))}},m=()=>{s()&&c(!1),document.removeEventListener(`mousemove`,p,!1),document.removeEventListener(`mouseup`,m,!1)};document.addEventListener(`mousemove`,p,!1),document.addEventListener(`mouseup`,m,!1)},d;f(()=>{Ot(d,({width:e},t)=>{t===d&&du(e)})}),z(()=>{let t=d.parentElement?.parentElement?.parentElement;if(!t)return;let n=e.localStore.position||Ee,r=y(`padding`,n),i=e.localStore.position===`left`||e.localStore.position===`right`,a=(({padding:e,paddingTop:t,paddingBottom:n,paddingLeft:r,paddingRight:i})=>({padding:e,paddingTop:t,paddingBottom:n,paddingLeft:r,paddingRight:i}))(t.style);t.style[r]=`${i?e.localStore.width:e.localStore.height}px`,P(()=>{Object.entries(a).forEach(([e,n])=>{t.style[e]=n})})});let p=()=>{let{colors:e}=Q,r=(e,n)=>t()===`dark`?n:e;return uu()<Ce?n`
        flex-direction: column;
        background-color: ${r(e.gray[300],e.gray[600])};
      `:n`
      flex-direction: row;
      background-color: ${r(e.gray[200],e.darkGray[900])};
    `};return(()=>{var t=wl(),s=t.firstChild,c=s.nextSibling,f=d;typeof f==`function`?b(f,t):d=t,s.$$keydown=t=>{let n=re(3.5),r=re(12);if(l()===`top`||l()===`bottom`){if(t.key===`ArrowUp`||t.key===`ArrowDown`){t.preventDefault();let r=Number(e.localStore.height||ke),i=l()===`bottom`?t.key===`ArrowUp`?10:-10:t.key===`ArrowDown`?10:-10,a=Math.max(n,r+i);e.setLocalStore(`height`,String(a))}}else if(t.key===`ArrowLeft`||t.key===`ArrowRight`){t.preventDefault();let n=Number(e.localStore.width||je),i=l()===`right`?t.key===`ArrowLeft`?10:-10:t.key===`ArrowRight`?10:-10,a=Math.max(r,n+i);e.setLocalStore(`width`,String(a))}},s.$$mousedown=u,c.$$click=()=>e.setLocalStore(`open`,`false`);var m=i;return typeof m==`function`?b(m,c):i=c,a(c,R(Oc,{})),a(t,R(vu,e),null),j(i=>{var a=G(r().panel,r()[`panel-position-${l()}`],p(),{[n`
            min-width: min-content;
          `]:uu()<we&&(l()===`right`||l()===`left`)},`tsqd-main-panel`),u=l()===`bottom`||l()===`top`?`${e.localStore.height||ke}px`:`auto`,d=l()===`right`||l()===`left`?`${e.localStore.width||je}px`:`auto`,f=l()===`top`||l()===`bottom`?`horizontal`:`vertical`,m=l()===`top`||l()===`bottom`?re(3.5):re(12),g=l()===`top`||l()===`bottom`?Number(e.localStore.height||ke):Number(e.localStore.width||je),_=G(r().dragHandle,r()[`dragHandle-position-${l()}`],`tsqd-drag-handle`),v=G(r().closeBtn,r()[`closeBtn-position-${l()}`],`tsqd-minimize-btn`);return a!==i.e&&N(t,i.e=a),u!==i.t&&o(t,`height`,i.t=u),d!==i.a&&o(t,`width`,i.a=d),f!==i.o&&h(s,`aria-orientation`,i.o=f),m!==i.i&&h(s,`aria-valuemin`,i.i=m),g!==i.n&&h(s,`aria-valuenow`,i.n=g),_!==i.s&&N(s,i.s=_),v!==i.h&&N(c,i.h=v),i},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0,h:void 0}),t})()},vu=e=>{Du(),ku();let n,r=H(),o=V().shadowDOMTarget?W.bind({target:V().shadowDOMTarget}):W,s=k(()=>r()===`dark`?Fu(o):Pu(o)),c=ze(),[u,d]=I(`queries`),f=k(()=>e.localStore.sort||Me),p=k(()=>Number(e.localStore.sortOrder)||Ne),m=k(()=>e.localStore.mutationSort||Pe),g=k(()=>Number(e.localStore.mutationSortOrder)||Ne),_=k(()=>l[f()]),v=k(()=>te[m()]),y=k(()=>V().onlineManager),x=k(()=>V().client.getQueryCache()),S=k(()=>V().client.getMutationCache()),C=$(e=>e().getAll().length,!1),w=k(t(()=>[C(),e.localStore.filter,f(),p(),e.localStore.hideDisabledQueries],()=>{let t=x().getAll(),n=e.localStore.filter?t.filter(t=>Ge(t.queryHash,e.localStore.filter||``).passed):[...t];return e.localStore.hideDisabledQueries===`true`&&(n=n.filter(e=>!e.isDisabled())),_()?n.sort((e,t)=>_()(e,t)*p()):n})),T=Au(e=>e().getAll().length,!1),E=k(t(()=>[T(),e.localStore.mutationFilter,m(),g()],()=>{let t=S().getAll(),n=e.localStore.mutationFilter?t.filter(t=>Ge(`${t.options.mutationKey?JSON.stringify(t.options.mutationKey)+` - `:``}${new Date(t.state.submittedAt).toLocaleString()}`,e.localStore.mutationFilter||``).passed):[...t];return v()?n.sort((e,t)=>v()(e,t)*g()):n})),D=t=>{e.setLocalStore(`position`,t)},O=e=>{let t=getComputedStyle(n).getPropertyValue(`--tsqd-font-size`);e.style.setProperty(`--tsqd-font-size`,t)};return[(()=>{var t=Gl(),r=t.firstChild,_=r.firstChild,v=_.firstChild,C=v.firstChild,T=C.nextSibling,k=T.firstChild,ee=r.nextSibling,M=ee.firstChild,P=M.firstChild,F=P.firstChild,I=P.nextSibling,ne=I.nextSibling,re=M.nextSibling,ie=re.firstChild,L=ie.nextSibling,ae=n;return typeof ae==`function`?b(ae,t):n=t,v.$$click=()=>{!c().pipWindow&&!e.showPanelViewOnly?e.setLocalStore(`open`,`false`):e.onClose&&e.onClose()},a(T,()=>V().queryFlavor,k),a(T,()=>V().version,null),a(_,R(Ko.Root,{get class(){return G(s().viewToggle)},get value(){return u()},"aria-label":`Toggle between queries and mutations view`,onChange:e=>{d(e),su(null),lu(null)},get children(){return[R(Ko.Item,{value:`queries`,class:`tsqd-radio-toggle`,get children(){return[R(Ko.ItemInput,{}),R(Ko.ItemControl,{get children(){return R(Ko.ItemIndicator,{})}}),R(Ko.ItemLabel,{title:`Toggle Queries View`,children:`Queries`})]}}),R(Ko.Item,{value:`mutations`,class:`tsqd-radio-toggle`,get children(){return[R(Ko.ItemInput,{}),R(Ko.ItemControl,{get children(){return R(Ko.ItemIndicator,{})}}),R(Ko.ItemLabel,{title:`Toggle Mutations View`,children:`Mutations`})]}})]}}),null),a(r,R(A,{get when(){return u()===`queries`},get children(){return R(xu,{})}}),null),a(r,R(A,{get when(){return u()===`mutations`},get children(){return R(Su,{})}}),null),a(P,R(Ec,{}),F),F.$$input=t=>{u()===`queries`?e.setLocalStore(`filter`,t.currentTarget.value):e.setLocalStore(`mutationFilter`,t.currentTarget.value)},a(I,R(A,{get when(){return u()===`queries`},get children(){var t=Tl();return t.addEventListener(`change`,t=>{e.setLocalStore(`sort`,t.currentTarget.value)}),a(t,()=>Object.keys(l).map(e=>(()=>{var t=Kl();return t.firstChild,t.value=e,a(t,e,null),t})())),j(()=>t.value=f()),t}}),null),a(I,R(A,{get when(){return u()===`mutations`},get children(){var t=El();return t.addEventListener(`change`,t=>{e.setLocalStore(`mutationSort`,t.currentTarget.value)}),a(t,()=>Object.keys(te).map(e=>(()=>{var t=Kl();return t.firstChild,t.value=e,a(t,e,null),t})())),j(()=>t.value=m()),t}}),null),a(I,R(Oc,{}),null),ne.$$click=()=>{u()===`queries`?e.setLocalStore(`sortOrder`,String(p()*-1)):e.setLocalStore(`mutationSortOrder`,String(g()*-1))},a(ne,R(A,{get when(){return(u()===`queries`?p():g())===1},get children(){return[Dl(),R(kc,{})]}}),null),a(ne,R(A,{get when(){return(u()===`queries`?p():g())===-1},get children(){return[Ol(),R(Ac,{})]}}),null),ie.$$click=()=>{u()===`queries`?(Mu({type:`CLEAR_QUERY_CACHE`}),x().clear()):(Mu({type:`CLEAR_MUTATION_CACHE`}),S().clear())},a(ie,R(Dc,{})),L.$$click=()=>{y().setOnline(!y().isOnline())},a(L,(()=>{var e=i(()=>!!fu());return()=>e()?R(Lc,{}):R(Ic,{})})()),a(re,R(A,{get when(){return i(()=>!c().pipWindow)()&&!c().disabled},get children(){var t=kl();return t.$$click=()=>{c().requestPipWindow(Number(window.innerWidth),Number(e.localStore.height??500))},a(t,R(zc,{})),j(()=>N(t,G(s().actionsBtn,`tsqd-actions-btn`,`tsqd-action-open-pip`))),t}}),null),a(re,R(Z.Root,{gutter:4,get children(){return[R(Z.Trigger,{get class(){return G(s().actionsBtn,`tsqd-actions-btn`,`tsqd-action-settings`)},"aria-label":`Open settings menu`,title:`Open settings menu`,get children(){return R(Rc,{})}}),R(Z.Portal,{ref:e=>O(e),get mount(){return i(()=>!!c().pipWindow)()?c().pipWindow.document.body:document.body},get children(){return R(Z.Content,{get class(){return G(s().settingsMenu,`tsqd-settings-menu`)},get children(){return[(()=>{var e=Al();return j(()=>N(e,G(s().settingsMenuHeader,`tsqd-settings-menu-header`))),e})(),R(A,{get when(){return!e.showPanelViewOnly},get children(){return R(Z.Sub,{overlap:!0,gutter:8,shift:-4,get children(){return[R(Z.SubTrigger,{get class(){return G(s().settingsSubTrigger,`tsqd-settings-menu-sub-trigger`,`tsqd-settings-menu-sub-trigger-position`)},get children(){return[jl(),R(Oc,{})]}}),R(Z.Portal,{ref:e=>O(e),get mount(){return i(()=>!!c().pipWindow)()?c().pipWindow.document.body:document.body},get children(){return R(Z.SubContent,{get class(){return G(s().settingsMenu,`tsqd-settings-submenu`)},get children(){return R(Z.RadioGroup,{"aria-label":`Position settings`,get value(){return e.localStore.position},onChange:e=>D(e),get children(){return[R(Z.RadioItem,{value:`top`,get class(){return G(s().settingsSubButton,`tsqd-settings-menu-position-btn`,`tsqd-settings-menu-position-btn-top`)},get children(){return[Ml(),R(kc,{})]}}),R(Z.RadioItem,{value:`bottom`,get class(){return G(s().settingsSubButton,`tsqd-settings-menu-position-btn`,`tsqd-settings-menu-position-btn-bottom`)},get children(){return[Nl(),R(Ac,{})]}}),R(Z.RadioItem,{value:`left`,get class(){return G(s().settingsSubButton,`tsqd-settings-menu-position-btn`,`tsqd-settings-menu-position-btn-left`)},get children(){return[Pl(),R(jc,{})]}}),R(Z.RadioItem,{value:`right`,get class(){return G(s().settingsSubButton,`tsqd-settings-menu-position-btn`,`tsqd-settings-menu-position-btn-right`)},get children(){return[Fl(),R(Mc,{})]}})]}})}})}})]}})}}),R(Z.Sub,{overlap:!0,gutter:8,shift:-4,get children(){return[R(Z.SubTrigger,{get class(){return G(s().settingsSubTrigger,`tsqd-settings-menu-sub-trigger`,`tsqd-settings-menu-sub-trigger-position`)},get children(){return[Il(),R(Oc,{})]}}),R(Z.Portal,{ref:e=>O(e),get mount(){return i(()=>!!c().pipWindow)()?c().pipWindow.document.body:document.body},get children(){return R(Z.SubContent,{get class(){return G(s().settingsMenu,`tsqd-settings-submenu`)},get children(){return R(Z.RadioGroup,{get value(){return e.localStore.theme_preference},onChange:t=>{e.setLocalStore(`theme_preference`,t)},"aria-label":`Theme preference`,get children(){return[R(Z.RadioItem,{value:`light`,get class(){return G(s().settingsSubButton,`tsqd-settings-menu-position-btn`,`tsqd-settings-menu-position-btn-top`)},get children(){return[Ll(),R(Nc,{})]}}),R(Z.RadioItem,{value:`dark`,get class(){return G(s().settingsSubButton,`tsqd-settings-menu-position-btn`,`tsqd-settings-menu-position-btn-bottom`)},get children(){return[Rl(),R(Pc,{})]}}),R(Z.RadioItem,{value:`system`,get class(){return G(s().settingsSubButton,`tsqd-settings-menu-position-btn`,`tsqd-settings-menu-position-btn-left`)},get children(){return[zl(),R(Fc,{})]}})]}})}})}})]}}),R(Z.Sub,{overlap:!0,gutter:8,shift:-4,get children(){return[R(Z.SubTrigger,{get class(){return G(s().settingsSubTrigger,`tsqd-settings-menu-sub-trigger`,`tsqd-settings-menu-sub-trigger-disabled-queries`)},get children(){return[Bl(),R(Oc,{})]}}),R(Z.Portal,{ref:e=>O(e),get mount(){return i(()=>!!c().pipWindow)()?c().pipWindow.document.body:document.body},get children(){return R(Z.SubContent,{get class(){return G(s().settingsMenu,`tsqd-settings-submenu`)},get children(){return R(Z.RadioGroup,{get value(){return e.localStore.hideDisabledQueries},"aria-label":`Hide disabled queries setting`,onChange:t=>e.setLocalStore(`hideDisabledQueries`,t),get children(){return[R(Z.RadioItem,{value:`false`,get class(){return G(s().settingsSubButton,`tsqd-settings-menu-position-btn`,`tsqd-settings-menu-position-btn-show`)},get children(){return[Vl(),R(A,{get when(){return e.localStore.hideDisabledQueries!==`true`},get children(){return R(Kc,{})}})]}}),R(Z.RadioItem,{value:`true`,get class(){return G(s().settingsSubButton,`tsqd-settings-menu-position-btn`,`tsqd-settings-menu-position-btn-hide`)},get children(){return[Hl(),R(A,{get when(){return e.localStore.hideDisabledQueries===`true`},get children(){return R(Kc,{})}})]}})]}})}})}})]}})]}})}})]}}),null),a(t,R(A,{get when(){return u()===`queries`},get children(){var e=Ul(),t=e.firstChild;return a(t,R(wt,{by:e=>e.queryHash,get each(){return w()},children:e=>R(yu,{get query(){return e()}})})),j(()=>N(e,G(s().overflowQueryContainer,`tsqd-queries-overflow-container`))),e}}),null),a(t,R(A,{get when(){return u()===`mutations`},get children(){var e=Wl(),t=e.firstChild;return a(t,R(wt,{by:e=>e.mutationId,get each(){return E()},children:e=>R(bu,{get mutation(){return e()}})})),j(()=>N(e,G(s().overflowQueryContainer,`tsqd-mutations-overflow-container`))),e}}),null),j(e=>{var n=G(s().queriesContainer,uu()<Ce&&(ou()||cu())&&o`
              height: 50%;
              max-height: 50%;
            `,uu()<Ce&&!(ou()||cu())&&o`
              height: 100%;
              max-height: 100%;
            `,`tsqd-queries-container`),i=G(s().row,`tsqd-header`),a=s().logoAndToggleContainer,c=G(s().logo,`tsqd-text-logo-container`),l=G(s().tanstackLogo,`tsqd-text-logo-tanstack`),d=G(s().queryFlavorLogo,`tsqd-text-logo-query-flavor`),f=G(s().row,`tsqd-filters-actions-container`),m=G(s().filtersContainer,`tsqd-filters-container`),y=G(s().filterInput,`tsqd-query-filter-textfield-container`),b=G(`tsqd-query-filter-textfield`),x=G(s().filterSelect,`tsqd-query-filter-sort-container`),S=`Sort order ${(u()===`queries`?p():g())===-1?`descending`:`ascending`}`,w=(u()===`queries`?p():g())===-1,E=G(s().actionsContainer,`tsqd-actions-container`),D=G(s().actionsBtn,`tsqd-actions-btn`,`tsqd-action-clear-cache`),O=`Clear ${u()} cache`,k=G(s().actionsBtn,fu()&&s().actionsBtnOffline,`tsqd-actions-btn`,`tsqd-action-mock-offline-behavior`),A=`${fu()?`Unset offline mocking behavior`:`Mock offline behavior`}`,j=fu(),te=`${fu()?`Unset offline mocking behavior`:`Mock offline behavior`}`;return n!==e.e&&N(t,e.e=n),i!==e.t&&N(r,e.t=i),a!==e.a&&N(_,e.a=a),c!==e.o&&N(v,e.o=c),l!==e.i&&N(C,e.i=l),d!==e.n&&N(T,e.n=d),f!==e.s&&N(ee,e.s=f),m!==e.h&&N(M,e.h=m),y!==e.r&&N(P,e.r=y),b!==e.d&&N(F,e.d=b),x!==e.l&&N(I,e.l=x),S!==e.u&&h(ne,`aria-label`,e.u=S),w!==e.c&&h(ne,`aria-pressed`,e.c=w),E!==e.w&&N(re,e.w=E),D!==e.m&&N(ie,e.m=D),O!==e.f&&h(ie,`title`,e.f=O),k!==e.y&&N(L,e.y=k),A!==e.g&&h(L,`aria-label`,e.g=A),j!==e.p&&h(L,`aria-pressed`,e.p=j),te!==e.b&&h(L,`title`,e.b=te),e},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0,h:void 0,r:void 0,d:void 0,l:void 0,u:void 0,c:void 0,w:void 0,m:void 0,f:void 0,y:void 0,g:void 0,p:void 0,b:void 0}),j(()=>F.value=u()===`queries`?e.localStore.filter||``:e.localStore.mutationFilter||``),t})(),R(A,{get when(){return i(()=>u()===`queries`)()&&ou()},get children(){return R(wu,{})}}),R(A,{get when(){return i(()=>u()===`mutations`)()&&cu()},get children(){return R(Tu,{})}})]},yu=e=>{let t=H(),n=V().shadowDOMTarget?W.bind({target:V().shadowDOMTarget}):W,r=k(()=>t()===`dark`?Fu(n):Pu(n)),{colors:i,alpha:o}=Q,s=(e,n)=>t()===`dark`?n:e,c=$(t=>t().find({queryKey:e.query.queryKey})?.state,!0,t=>t.query.queryHash===e.query.queryHash),l=$(t=>t().find({queryKey:e.query.queryKey})?.isDisabled()??!1,!0,t=>t.query.queryHash===e.query.queryHash),u=$(t=>t().find({queryKey:e.query.queryKey})?.isStatic()??!1,!0,t=>t.query.queryHash===e.query.queryHash),d=$(t=>t().find({queryKey:e.query.queryKey})?.isStale()??!1,!0,t=>t.query.queryHash===e.query.queryHash),f=$(t=>t().find({queryKey:e.query.queryKey})?.getObserversCount()??0,!0,t=>t.query.queryHash===e.query.queryHash),p=k(()=>v({queryState:c(),observerCount:f(),isStale:d()})),m=()=>p()===`gray`?n`
        background-color: ${s(i[p()][200],i[p()][700])};
        color: ${s(i[p()][700],i[p()][300])};
      `:n`
      background-color: ${s(i[p()][200]+o[80],i[p()][900])};
      color: ${s(i[p()][800],i[p()][300])};
    `;return R(A,{get when(){return c()},get children(){var t=Yl(),n=t.firstChild,i=n.nextSibling;return t.$$click=()=>su(e.query.queryHash===ou()?null:e.query.queryHash),a(n,f),a(i,()=>e.query.queryHash),a(t,R(A,{get when(){return l()},get children(){return ql()}}),null),a(t,R(A,{get when(){return u()},get children(){return Jl()}}),null),j(i=>{var a=G(r().queryRow,ou()===e.query.queryHash&&r().selectedQueryRow,`tsqd-query-row`),o=`Query key ${e.query.queryHash}${l()?`, disabled`:``}${u()?`, static`:``}`,s=G(m(),`tsqd-query-observer-count`);return a!==i.e&&N(t,i.e=a),o!==i.t&&h(t,`aria-label`,i.t=o),s!==i.a&&N(n,i.a=s),i},{e:void 0,t:void 0,a:void 0}),t}})},bu=e=>{let t=H(),n=V().shadowDOMTarget?W.bind({target:V().shadowDOMTarget}):W,r=k(()=>t()===`dark`?Fu(n):Pu(n)),{colors:o,alpha:s}=Q,c=(e,n)=>t()===`dark`?n:e,l=Au(t=>t().getAll().find(t=>t.mutationId===e.mutation.mutationId)?.state),u=Au(t=>{let n=t().getAll().find(t=>t.mutationId===e.mutation.mutationId);return n?n.state.isPaused:!1}),d=Au(t=>{let n=t().getAll().find(t=>t.mutationId===e.mutation.mutationId);return n?n.state.status:`idle`}),f=k(()=>ce({isPaused:u(),status:d()})),p=()=>f()===`gray`?n`
        background-color: ${c(o[f()][200],o[f()][700])};
        color: ${c(o[f()][700],o[f()][300])};
      `:n`
      background-color: ${c(o[f()][200]+s[80],o[f()][900])};
      color: ${c(o[f()][800],o[f()][300])};
    `;return R(A,{get when(){return l()},get children(){var t=Yl(),n=t.firstChild,o=n.nextSibling;return t.$$click=()=>{lu(e.mutation.mutationId===cu()?null:e.mutation.mutationId)},a(n,R(A,{get when(){return f()===`purple`},get children(){return R(Yc,{})}}),null),a(n,R(A,{get when(){return f()===`green`},get children(){return R(Kc,{})}}),null),a(n,R(A,{get when(){return f()===`red`},get children(){return R(Jc,{})}}),null),a(n,R(A,{get when(){return f()===`yellow`},get children(){return R(qc,{})}}),null),a(o,R(A,{get when(){return e.mutation.options.mutationKey},get children(){return[i(()=>JSON.stringify(e.mutation.options.mutationKey)),` -`,` `]}}),null),a(o,()=>new Date(e.mutation.state.submittedAt).toLocaleString(),null),j(i=>{var a=G(r().queryRow,cu()===e.mutation.mutationId&&r().selectedQueryRow,`tsqd-query-row`),o=`Mutation submitted at ${new Date(e.mutation.state.submittedAt).toLocaleString()}`,s=G(p(),`tsqd-query-observer-count`);return a!==i.e&&N(t,i.e=a),o!==i.t&&h(t,`aria-label`,i.t=o),s!==i.a&&N(n,i.a=s),i},{e:void 0,t:void 0,a:void 0}),t}})},xu=()=>{let e=$(e=>e().getAll().filter(e=>se(e)===`stale`).length),t=$(e=>e().getAll().filter(e=>se(e)===`fresh`).length),n=$(e=>e().getAll().filter(e=>se(e)===`fetching`).length),r=$(e=>e().getAll().filter(e=>se(e)===`paused`).length),i=$(e=>e().getAll().filter(e=>se(e)===`inactive`).length),o=H(),s=V().shadowDOMTarget?W.bind({target:V().shadowDOMTarget}):W,c=k(()=>o()===`dark`?Fu(s):Pu(s));return(()=>{var o=xl();return a(o,R(Cu,{label:`Fresh`,color:`green`,get count(){return t()}}),null),a(o,R(Cu,{label:`Fetching`,color:`blue`,get count(){return n()}}),null),a(o,R(Cu,{label:`Paused`,color:`purple`,get count(){return r()}}),null),a(o,R(Cu,{label:`Stale`,color:`yellow`,get count(){return e()}}),null),a(o,R(Cu,{label:`Inactive`,color:`gray`,get count(){return i()}}),null),j(()=>N(o,G(c().queryStatusContainer,`tsqd-query-status-container`))),o})()},Su=()=>{let e=Au(e=>e().getAll().filter(e=>ce({isPaused:e.state.isPaused,status:e.state.status})===`green`).length),t=Au(e=>e().getAll().filter(e=>ce({isPaused:e.state.isPaused,status:e.state.status})===`yellow`).length),n=Au(e=>e().getAll().filter(e=>ce({isPaused:e.state.isPaused,status:e.state.status})===`purple`).length),r=Au(e=>e().getAll().filter(e=>ce({isPaused:e.state.isPaused,status:e.state.status})===`red`).length),i=H(),o=V().shadowDOMTarget?W.bind({target:V().shadowDOMTarget}):W,s=k(()=>i()===`dark`?Fu(o):Pu(o));return(()=>{var i=xl();return a(i,R(Cu,{label:`Paused`,color:`purple`,get count(){return n()}}),null),a(i,R(Cu,{label:`Pending`,color:`yellow`,get count(){return t()}}),null),a(i,R(Cu,{label:`Success`,color:`green`,get count(){return e()}}),null),a(i,R(Cu,{label:`Error`,color:`red`,get count(){return r()}}),null),j(()=>N(i,G(s().queryStatusContainer,`tsqd-query-status-container`))),i})()},Cu=e=>{let t=H(),n=V().shadowDOMTarget?W.bind({target:V().shadowDOMTarget}):W,r=k(()=>t()===`dark`?Fu(n):Pu(n)),{colors:o,alpha:s}=Q,c=(e,n)=>t()===`dark`?n:e,l,[u,d]=I(!1),[f,p]=I(!1),h=k(()=>!(ou()&&uu()<Se&&uu()>Ce||uu()<Ce));return(()=>{var t=Ql(),g=t.firstChild,v=g.nextSibling,y=l;return typeof y==`function`?b(y,t):l=t,t.addEventListener(`mouseleave`,()=>{d(!1),p(!1)}),t.addEventListener(`mouseenter`,()=>d(!0)),t.addEventListener(`blur`,()=>p(!1)),t.addEventListener(`focus`,()=>p(!0)),_(t,m({get disabled(){return h()},get"aria-label"(){return`${e.label}: ${e.count}`},get class(){return G(r().queryStatusTag,!h()&&n`
            cursor: pointer;
            &:hover {
              background: ${c(o.gray[200],o.darkGray[400])}${s[80]};
            }
          `,`tsqd-query-status-tag`,`tsqd-query-status-tag-${e.label.toLowerCase()}`)}},()=>u()||f()?{"aria-describedby":`tsqd-status-tooltip`}:{}),!1,!0),a(t,R(A,{get when(){return i(()=>!h())()&&(u()||f())},get children(){var t=Xl();return a(t,()=>e.label),j(()=>N(t,G(r().statusTooltip,`tsqd-query-status-tooltip`))),t}}),g),a(t,R(A,{get when(){return h()},get children(){var t=Zl();return a(t,()=>e.label),j(()=>N(t,G(r().queryStatusTagLabel,`tsqd-query-status-tag-label`))),t}}),v),a(v,()=>e.count),j(t=>{var i=G(n`
            width: ${Q.size[1.5]};
            height: ${Q.size[1.5]};
            border-radius: ${Q.border.radius.full};
            background-color: ${Q.colors[e.color][500]};
          `,`tsqd-query-status-tag-dot`),a=G(r().queryStatusCount,e.count>0&&e.color!==`gray`&&n`
              background-color: ${c(o[e.color][100],o[e.color][900])};
              color: ${c(o[e.color][700],o[e.color][300])};
            `,`tsqd-query-status-tag-count`);return i!==t.e&&N(g,t.e=i),a!==t.t&&N(v,t.t=a),t},{e:void 0,t:void 0}),t})()},wu=()=>{let e=H(),t=V().shadowDOMTarget?W.bind({target:V().shadowDOMTarget}):W,n=k(()=>e()===`dark`?Fu(t):Pu(t)),{colors:s}=Q,c=(t,n)=>e()===`dark`?n:t,l=V().client,[u,d]=I(!1),[f,p]=I(`view`),[m,g]=I(!1),_=k(()=>V().errorTypes||[]),v=$(e=>e().getAll().find(e=>e.queryHash===ou()),!1),y=$(e=>e().getAll().find(e=>e.queryHash===ou()),!1),b=$(e=>e().getAll().find(e=>e.queryHash===ou())?.state,!1),x=$(e=>e().getAll().find(e=>e.queryHash===ou())?.state.data,!1),S=$(e=>{let t=e().getAll().find(e=>e.queryHash===ou());return t?se(t):`inactive`}),w=$(e=>{let t=e().getAll().find(e=>e.queryHash===ou());return t?t.state.status:`pending`}),T=$(e=>e().getAll().find(e=>e.queryHash===ou())?.getObserversCount()??0),E=k(()=>r(S())),D=()=>{Mu({type:`REFETCH`,queryHash:v()?.queryHash}),(v()?.fetch())?.catch(()=>{})},O=e=>{let t=v();if(!t)return;Mu({type:`TRIGGER_ERROR`,queryHash:t.queryHash,metadata:{error:e?.name}});let n=e?.initializer(t)??Error(`Unknown error from devtools`),r=t.options;t.setState({data:void 0,status:`error`,error:n,fetchMeta:{...t.state.fetchMeta,__previousQueryOptions:r}})},ee=()=>{let e=v();if(!e)return;Mu({type:`RESTORE_LOADING`,queryHash:e.queryHash});let t=e.state,n=e.state.fetchMeta?e.state.fetchMeta.__previousQueryOptions:null;e.cancel({silent:!0}),e.setState({...t,fetchStatus:`idle`,fetchMeta:null}),n&&e.fetch(n)};z(()=>{S()!==`fetching`&&d(!1)});let M=()=>E()===`gray`?t`
        background-color: ${c(s[E()][200],s[E()][700])};
        color: ${c(s[E()][700],s[E()][300])};
        border-color: ${c(s[E()][400],s[E()][600])};
      `:t`
      background-color: ${c(s[E()][100],s[E()][900])};
      color: ${c(s[E()][700],s[E()][300])};
      border-color: ${c(s[E()][400],s[E()][600])};
    `;return R(A,{get when(){return i(()=>!!v())()&&b()},get children(){var e=ru(),r=e.firstChild,i=r.nextSibling,E=i.firstChild,k=E.firstChild,P=k.firstChild,te=k.nextSibling,F=E.nextSibling,I=F.firstChild.nextSibling,ne=F.nextSibling.firstChild.nextSibling,re=i.nextSibling,ie=re.nextSibling,L=ie.firstChild,ae=L.firstChild,z=L.nextSibling,se=z.firstChild,ce=z.nextSibling,le=ce.firstChild,ue=ce.nextSibling,de=ue.firstChild,fe=ue.nextSibling,B=fe.firstChild,pe=B.nextSibling,me=ie.nextSibling;me.firstChild;var he=me.nextSibling,ge=he.nextSibling;return a(P,()=>oe(v().queryKey,!0)),a(te,S),a(I,T),a(ne,()=>new Date(b().dataUpdatedAt).toLocaleTimeString()),L.$$click=D,z.$$click=()=>{Mu({type:`INVALIDATE`,queryHash:v()?.queryHash}),l.invalidateQueries({queryKey:v()?.queryKey,exact:!0})},ce.$$click=()=>{Mu({type:`RESET`,queryHash:v()?.queryHash}),l.resetQueries({queryKey:v()?.queryKey,exact:!0})},ue.$$click=()=>{Mu({type:`REMOVE`,queryHash:v()?.queryHash}),l.removeQueries({queryKey:v()?.queryKey,exact:!0}),su(null)},fe.$$click=()=>{if(v()?.state.data===void 0)d(!0),ee();else{let e=v();if(!e)return;Mu({type:`TRIGGER_LOADING`,queryHash:e.queryHash});let t=e.options;e.fetch({...t,queryFn:()=>new Promise(()=>{}),gcTime:-1}),e.setState({data:void 0,status:`pending`,fetchMeta:{...e.state.fetchMeta,__previousQueryOptions:t}})}},a(fe,()=>w()===`pending`?`Restore`:`Trigger`,pe),a(ie,R(A,{get when(){return _().length===0||w()===`error`},get children(){var e=$l(),n=e.firstChild,r=n.nextSibling;return e.$$click=()=>{v().state.error?(Mu({type:`RESTORE_ERROR`,queryHash:v()?.queryHash}),l.resetQueries({queryKey:v()?.queryKey})):O()},a(e,()=>w()===`error`?`Restore`:`Trigger`,r),j(r=>{var i=G(t`
                  color: ${c(s.red[500],s.red[400])};
                `,`tsqd-query-details-actions-btn`,`tsqd-query-details-action-error`),a=w()===`pending`,o=t`
                  background-color: ${c(s.red[500],s.red[400])};
                `;return i!==r.e&&N(e,r.e=i),a!==r.t&&(e.disabled=r.t=a),o!==r.a&&N(n,r.a=o),r},{e:void 0,t:void 0,a:void 0}),e}}),null),a(ie,R(A,{get when(){return _().length!==0&&w()!==`error`},get children(){var e=eu(),r=e.firstChild,i=r.nextSibling.nextSibling;return i.firstChild,i.addEventListener(`change`,e=>{let t=_().find(t=>t.name===e.currentTarget.value);O(t)}),a(i,R(C,{get each(){return _()},children:e=>(()=>{var t=iu();return a(t,()=>e.name),j(()=>t.value=e.name),t})()}),null),a(e,R(Oc,{}),null),j(a=>{var o=G(n().actionsSelect,`tsqd-query-details-actions-btn`,`tsqd-query-details-action-error-multiple`),s=t`
                  background-color: ${Q.colors.red[400]};
                `,c=w()===`pending`;return o!==a.e&&N(e,a.e=o),s!==a.t&&N(r,a.t=s),c!==a.a&&(i.disabled=a.a=c),a},{e:void 0,t:void 0,a:void 0}),e}}),null),a(me,()=>f()===`view`?`Explorer`:`Editor`,null),a(e,R(A,{get when(){return f()===`view`},get children(){var e=tu();return a(e,R(gl,{label:`Data`,defaultExpanded:[`Data`],get value(){return x()},editable:!0,onEdit:()=>p(`edit`),get activeQuery(){return v()}})),j(t=>o(e,`padding`,Q.size[2])),e}}),he),a(e,R(A,{get when(){return f()===`edit`},get children(){var e=nu(),r=e.firstChild,i=r.nextSibling,o=i.firstChild,l=o.nextSibling,u=l.firstChild,d=u.nextSibling;return e.addEventListener(`submit`,e=>{e.preventDefault();let t=new FormData(e.currentTarget).get(`data`);try{let e=JSON.parse(t);v().setState({...v().state,data:e}),p(`view`)}catch{g(!0)}}),r.addEventListener(`focus`,()=>g(!1)),a(o,()=>m()?`Invalid Value`:``),u.$$click=()=>p(`view`),j(a=>{var f=G(n().devtoolsEditForm,`tsqd-query-details-data-editor`),p=n().devtoolsEditTextarea,g=m(),_=n().devtoolsEditFormActions,v=n().devtoolsEditFormError,y=n().devtoolsEditFormActionContainer,b=G(n().devtoolsEditFormAction,t`
                      color: ${c(s.gray[600],s.gray[300])};
                    `),x=G(n().devtoolsEditFormAction,t`
                      color: ${c(s.blue[600],s.blue[400])};
                    `);return f!==a.e&&N(e,a.e=f),p!==a.t&&N(r,a.t=p),g!==a.a&&h(r,`data-error`,a.a=g),_!==a.o&&N(i,a.o=_),v!==a.i&&N(o,a.i=v),y!==a.n&&N(l,a.n=y),b!==a.s&&N(u,a.s=b),x!==a.h&&N(d,a.h=x),a},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0,h:void 0}),j(()=>r.value=JSON.stringify(x(),null,2)),e}}),he),a(ge,R(gl,{label:`Query`,defaultExpanded:[`Query`,`queryKey`],get value(){return y()}})),j(a=>{var l=G(n().detailsContainer,`tsqd-query-details-container`),d=G(n().detailsHeader,`tsqd-query-details-header`),f=G(n().detailsBody,`tsqd-query-details-summary-container`),p=G(n().queryDetailsStatus,M()),m=G(n().detailsHeader,`tsqd-query-details-header`),h=G(n().actionsBody,`tsqd-query-details-actions-container`),g=G(t`
                color: ${c(s.blue[600],s.blue[400])};
              `,`tsqd-query-details-actions-btn`,`tsqd-query-details-action-refetch`),_=S()===`fetching`,v=t`
                background-color: ${c(s.blue[600],s.blue[400])};
              `,y=G(t`
                color: ${c(s.yellow[600],s.yellow[400])};
              `,`tsqd-query-details-actions-btn`,`tsqd-query-details-action-invalidate`),b=w()===`pending`,x=t`
                background-color: ${c(s.yellow[600],s.yellow[400])};
              `,C=G(t`
                color: ${c(s.gray[600],s.gray[300])};
              `,`tsqd-query-details-actions-btn`,`tsqd-query-details-action-reset`),T=w()===`pending`,E=t`
                background-color: ${c(s.gray[600],s.gray[400])};
              `,D=G(t`
                color: ${c(s.pink[500],s.pink[400])};
              `,`tsqd-query-details-actions-btn`,`tsqd-query-details-action-remove`),O=S()===`fetching`,k=t`
                background-color: ${c(s.pink[500],s.pink[400])};
              `,A=G(t`
                color: ${c(s.cyan[500],s.cyan[400])};
              `,`tsqd-query-details-actions-btn`,`tsqd-query-details-action-loading`),j=u(),ee=t`
                background-color: ${c(s.cyan[500],s.cyan[400])};
              `,P=G(n().detailsHeader,`tsqd-query-details-header`),F=G(n().detailsHeader,`tsqd-query-details-header`),I=Q.size[2];return l!==a.e&&N(e,a.e=l),d!==a.t&&N(r,a.t=d),f!==a.a&&N(i,a.a=f),p!==a.o&&N(te,a.o=p),m!==a.i&&N(re,a.i=m),h!==a.n&&N(ie,a.n=h),g!==a.s&&N(L,a.s=g),_!==a.h&&(L.disabled=a.h=_),v!==a.r&&N(ae,a.r=v),y!==a.d&&N(z,a.d=y),b!==a.l&&(z.disabled=a.l=b),x!==a.u&&N(se,a.u=x),C!==a.c&&N(ce,a.c=C),T!==a.w&&(ce.disabled=a.w=T),E!==a.m&&N(le,a.m=E),D!==a.f&&N(ue,a.f=D),O!==a.y&&(ue.disabled=a.y=O),k!==a.g&&N(de,a.g=k),A!==a.p&&N(fe,a.p=A),j!==a.b&&(fe.disabled=a.b=j),ee!==a.T&&N(B,a.T=ee),P!==a.A&&N(me,a.A=P),F!==a.O&&N(he,a.O=F),I!==a.I&&o(ge,`padding`,a.I=I),a},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0,h:void 0,r:void 0,d:void 0,l:void 0,u:void 0,c:void 0,w:void 0,m:void 0,f:void 0,y:void 0,g:void 0,p:void 0,b:void 0,T:void 0,A:void 0,O:void 0,I:void 0}),e}})},Tu=()=>{let e=H(),t=V().shadowDOMTarget?W.bind({target:V().shadowDOMTarget}):W,n=k(()=>e()===`dark`?Fu(t):Pu(t)),{colors:r}=Q,i=(t,n)=>e()===`dark`?n:t,s=Au(e=>{let t=e().getAll().find(e=>e.mutationId===cu());return t?t.state.isPaused:!1}),c=Au(e=>{let t=e().getAll().find(e=>e.mutationId===cu());return t?t.state.status:`idle`}),l=k(()=>ce({isPaused:s(),status:c()})),u=Au(e=>e().getAll().find(e=>e.mutationId===cu()),!1),d=()=>l()===`gray`?t`
        background-color: ${i(r[l()][200],r[l()][700])};
        color: ${i(r[l()][700],r[l()][300])};
        border-color: ${i(r[l()][400],r[l()][600])};
      `:t`
      background-color: ${i(r[l()][100],r[l()][900])};
      color: ${i(r[l()][700],r[l()][300])};
      border-color: ${i(r[l()][400],r[l()][600])};
    `;return R(A,{get when(){return u()},get children(){var e=au(),t=e.firstChild,r=t.nextSibling,i=r.firstChild,s=i.firstChild,f=s.firstChild,p=s.nextSibling,m=i.nextSibling.firstChild.nextSibling,h=r.nextSibling,g=h.nextSibling,_=g.nextSibling,v=_.nextSibling,y=v.nextSibling,b=y.nextSibling,x=b.nextSibling,S=x.nextSibling;return a(f,R(A,{get when(){return u().options.mutationKey},fallback:`No mutationKey found`,get children(){return oe(u().options.mutationKey,!0)}})),a(p,R(A,{get when(){return l()===`purple`},children:`pending`}),null),a(p,R(A,{get when(){return l()!==`purple`},get children(){return c()}}),null),a(m,()=>new Date(u().state.submittedAt).toLocaleTimeString()),a(g,R(gl,{label:`Variables`,defaultExpanded:[`Variables`],get value(){return u().state.variables}})),a(v,R(gl,{label:`Context`,defaultExpanded:[`Context`],get value(){return u().state.context}})),a(b,R(gl,{label:`Data`,defaultExpanded:[`Data`],get value(){return u().state.data}})),a(S,R(gl,{label:`Mutation`,defaultExpanded:[`Mutation`],get value(){return u()}})),j(i=>{var a=G(n().detailsContainer,`tsqd-query-details-container`),s=G(n().detailsHeader,`tsqd-query-details-header`),c=G(n().detailsBody,`tsqd-query-details-summary-container`),l=G(n().queryDetailsStatus,d()),u=G(n().detailsHeader,`tsqd-query-details-header`),f=Q.size[2],m=G(n().detailsHeader,`tsqd-query-details-header`),C=Q.size[2],w=G(n().detailsHeader,`tsqd-query-details-header`),T=Q.size[2],E=G(n().detailsHeader,`tsqd-query-details-header`),D=Q.size[2];return a!==i.e&&N(e,i.e=a),s!==i.t&&N(t,i.t=s),c!==i.a&&N(r,i.a=c),l!==i.o&&N(p,i.o=l),u!==i.i&&N(h,i.i=u),f!==i.n&&o(g,`padding`,i.n=f),m!==i.s&&N(_,i.s=m),C!==i.h&&o(v,`padding`,i.h=C),w!==i.r&&N(y,i.r=w),T!==i.d&&o(b,`padding`,i.d=T),E!==i.l&&N(x,i.l=E),D!==i.u&&o(S,`padding`,i.u=D),i},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0,h:void 0,r:void 0,d:void 0,l:void 0,u:void 0}),e}})},Eu=new Map,Du=()=>{let e=k(()=>V().client.getQueryCache()),t=e().subscribe(t=>{L(()=>{for(let[n,r]of Eu.entries())r.shouldUpdate(t)&&r.setter(n(e))})});return P(()=>{Eu.clear(),t()}),t},$=(e,t=!0,n=()=>!0)=>{let r=k(()=>V().client.getQueryCache()),[i,a]=I(e(r),t?void 0:{equals:!1});return z(()=>{a(e(r))}),Eu.set(e,{setter:a,shouldUpdate:n}),P(()=>{Eu.delete(e)}),i},Ou=new Map,ku=()=>{let e=k(()=>V().client.getMutationCache()),t=e().subscribe(()=>{for(let[t,n]of Ou.entries())queueMicrotask(()=>{n(t(e))})});return P(()=>{Ou.clear(),t()}),t},Au=(e,t=!0)=>{let n=k(()=>V().client.getMutationCache()),[r,i]=I(e(n),t?void 0:{equals:!1});return z(()=>{i(e(n))}),Ou.set(e,i),P(()=>{Ou.delete(e)}),r},ju=`@tanstack/query-devtools-event`,Mu=({type:e,queryHash:t,metadata:n})=>{let r=new CustomEvent(ju,{detail:{type:e,queryHash:t,metadata:n},bubbles:!0,cancelable:!0});window.dispatchEvent(r)},Nu=(e,t)=>{let{colors:n,font:r,size:i,alpha:a,shadow:o,border:s}=Q,c=(t,n)=>e===`light`?t:n;return{devtoolsBtn:t`
      z-index: 100000;
      position: fixed;
      padding: 4px;
      text-align: left;

      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 9999px;
      box-shadow: ${o.md()};
      overflow: hidden;

      & div {
        position: absolute;
        top: -8px;
        left: -8px;
        right: -8px;
        bottom: -8px;
        border-radius: 9999px;

        & svg {
          position: absolute;
          width: 100%;
          height: 100%;
        }
        filter: blur(6px) saturate(1.2) contrast(1.1);
      }

      &:focus-within {
        outline-offset: 2px;
        outline: 3px solid ${n.green[600]};
      }

      & button {
        position: relative;
        z-index: 1;
        padding: 0;
        border-radius: 9999px;
        background-color: transparent;
        border: none;
        height: 40px;
        display: flex;
        width: 40px;
        overflow: hidden;
        cursor: pointer;
        outline: none;
        & svg {
          position: absolute;
          width: 100%;
          height: 100%;
        }
      }
    `,panel:t`
      position: fixed;
      z-index: 9999;
      display: flex;
      gap: ${Q.size[.5]};
      & * {
        box-sizing: border-box;
        text-transform: none;
      }

      & *::-webkit-scrollbar {
        width: 7px;
      }

      & *::-webkit-scrollbar-track {
        background: transparent;
      }

      & *::-webkit-scrollbar-thumb {
        background: ${c(n.gray[300],n.darkGray[200])};
      }

      & *::-webkit-scrollbar-thumb:hover {
        background: ${c(n.gray[400],n.darkGray[300])};
      }
    `,parentPanel:t`
      z-index: 9999;
      display: flex;
      height: 100%;
      gap: ${Q.size[.5]};
      & * {
        box-sizing: border-box;
        text-transform: none;
      }

      & *::-webkit-scrollbar {
        width: 7px;
      }

      & *::-webkit-scrollbar-track {
        background: transparent;
      }

      & *::-webkit-scrollbar-thumb {
        background: ${c(n.gray[300],n.darkGray[200])};
      }

      & *::-webkit-scrollbar-thumb:hover {
        background: ${c(n.gray[400],n.darkGray[300])};
      }
    `,"devtoolsBtn-position-bottom-right":t`
      bottom: 12px;
      right: 12px;
    `,"devtoolsBtn-position-bottom-left":t`
      bottom: 12px;
      left: 12px;
    `,"devtoolsBtn-position-top-left":t`
      top: 12px;
      left: 12px;
    `,"devtoolsBtn-position-top-right":t`
      top: 12px;
      right: 12px;
    `,"devtoolsBtn-position-relative":t`
      position: relative;
    `,"panel-position-top":t`
      top: 0;
      right: 0;
      left: 0;
      max-height: 90%;
      min-height: ${i[14]};
      border-bottom: ${c(n.gray[400],n.darkGray[300])} 1px solid;
    `,"panel-position-bottom":t`
      bottom: 0;
      right: 0;
      left: 0;
      max-height: 90%;
      min-height: ${i[14]};
      border-top: ${c(n.gray[400],n.darkGray[300])} 1px solid;
    `,"panel-position-right":t`
      bottom: 0;
      right: 0;
      top: 0;
      border-left: ${c(n.gray[400],n.darkGray[300])} 1px solid;
      max-width: 90%;
    `,"panel-position-left":t`
      bottom: 0;
      left: 0;
      top: 0;
      border-right: ${c(n.gray[400],n.darkGray[300])} 1px solid;
      max-width: 90%;
    `,closeBtn:t`
      position: absolute;
      cursor: pointer;
      z-index: 5;
      display: flex;
      align-items: center;
      justify-content: center;
      outline: none;
      background-color: ${c(n.gray[50],n.darkGray[700])};
      &:hover {
        background-color: ${c(n.gray[200],n.darkGray[500])};
      }
      &:focus-visible {
        outline: 2px solid ${n.blue[600]};
      }
      & svg {
        color: ${c(n.gray[600],n.gray[400])};
        width: ${i[2]};
        height: ${i[2]};
      }
    `,"closeBtn-position-top":t`
      bottom: 0;
      right: ${i[2]};
      transform: translate(0, 100%);
      border-right: ${c(n.gray[400],n.darkGray[300])} 1px solid;
      border-left: ${c(n.gray[400],n.darkGray[300])} 1px solid;
      border-top: none;
      border-bottom: ${c(n.gray[400],n.darkGray[300])} 1px solid;
      border-radius: 0px 0px ${s.radius.sm} ${s.radius.sm};
      padding: ${i[.5]} ${i[1.5]} ${i[1]} ${i[1.5]};

      &::after {
        content: ' ';
        position: absolute;
        bottom: 100%;
        left: -${i[2.5]};
        height: ${i[1.5]};
        width: calc(100% + ${i[5]});
      }

      & svg {
        transform: rotate(180deg);
      }
    `,"closeBtn-position-bottom":t`
      top: 0;
      right: ${i[2]};
      transform: translate(0, -100%);
      border-right: ${c(n.gray[400],n.darkGray[300])} 1px solid;
      border-left: ${c(n.gray[400],n.darkGray[300])} 1px solid;
      border-top: ${c(n.gray[400],n.darkGray[300])} 1px solid;
      border-bottom: none;
      border-radius: ${s.radius.sm} ${s.radius.sm} 0px 0px;
      padding: ${i[1]} ${i[1.5]} ${i[.5]} ${i[1.5]};

      &::after {
        content: ' ';
        position: absolute;
        top: 100%;
        left: -${i[2.5]};
        height: ${i[1.5]};
        width: calc(100% + ${i[5]});
      }
    `,"closeBtn-position-right":t`
      bottom: ${i[2]};
      left: 0;
      transform: translate(-100%, 0);
      border-right: none;
      border-left: ${c(n.gray[400],n.darkGray[300])} 1px solid;
      border-top: ${c(n.gray[400],n.darkGray[300])} 1px solid;
      border-bottom: ${c(n.gray[400],n.darkGray[300])} 1px solid;
      border-radius: ${s.radius.sm} 0px 0px ${s.radius.sm};
      padding: ${i[1.5]} ${i[.5]} ${i[1.5]} ${i[1]};

      &::after {
        content: ' ';
        position: absolute;
        left: 100%;
        height: calc(100% + ${i[5]});
        width: ${i[1.5]};
      }

      & svg {
        transform: rotate(-90deg);
      }
    `,"closeBtn-position-left":t`
      bottom: ${i[2]};
      right: 0;
      transform: translate(100%, 0);
      border-left: none;
      border-right: ${c(n.gray[400],n.darkGray[300])} 1px solid;
      border-top: ${c(n.gray[400],n.darkGray[300])} 1px solid;
      border-bottom: ${c(n.gray[400],n.darkGray[300])} 1px solid;
      border-radius: 0px ${s.radius.sm} ${s.radius.sm} 0px;
      padding: ${i[1.5]} ${i[1]} ${i[1.5]} ${i[.5]};

      &::after {
        content: ' ';
        position: absolute;
        right: 100%;
        height: calc(100% + ${i[5]});
        width: ${i[1.5]};
      }

      & svg {
        transform: rotate(90deg);
      }
    `,queriesContainer:t`
      flex: 1 1 700px;
      background-color: ${c(n.gray[50],n.darkGray[700])};
      display: flex;
      flex-direction: column;
      & * {
        font-family: ui-sans-serif, Inter, system-ui, sans-serif, sans-serif;
      }
    `,dragHandle:t`
      position: absolute;
      transition: background-color 0.125s ease;
      &:hover {
        background-color: ${n.purple[400]}${c(``,a[90])};
      }
      &:focus {
        outline: none;
        background-color: ${n.purple[400]}${c(``,a[90])};
      }
      &:focus-visible {
        outline: 2px solid ${n.blue[800]};
        outline-offset: -2px;
        background-color: ${n.purple[400]}${c(``,a[90])};
      }
      z-index: 4;
    `,"dragHandle-position-top":t`
      bottom: 0;
      width: 100%;
      height: 3px;
      cursor: ns-resize;
    `,"dragHandle-position-bottom":t`
      top: 0;
      width: 100%;
      height: 3px;
      cursor: ns-resize;
    `,"dragHandle-position-right":t`
      left: 0;
      width: 3px;
      height: 100%;
      cursor: ew-resize;
    `,"dragHandle-position-left":t`
      right: 0;
      width: 3px;
      height: 100%;
      cursor: ew-resize;
    `,row:t`
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: ${Q.size[2]} ${Q.size[2.5]};
      gap: ${Q.size[2.5]};
      border-bottom: ${c(n.gray[300],n.darkGray[500])} 1px solid;
      align-items: center;
      & > button {
        padding: 0;
        background: transparent;
        border: none;
        display: flex;
        gap: ${i[.5]};
        flex-direction: column;
      }
    `,logoAndToggleContainer:t`
      display: flex;
      gap: ${Q.size[3]};
      align-items: center;
    `,logo:t`
      cursor: pointer;
      display: flex;
      flex-direction: column;
      background-color: transparent;
      border: none;
      gap: ${Q.size[.5]};
      padding: 0px;
      &:hover {
        opacity: 0.7;
      }
      &:focus-visible {
        outline-offset: 4px;
        border-radius: ${s.radius.xs};
        outline: 2px solid ${n.blue[800]};
      }
    `,tanstackLogo:t`
      font-size: ${r.size.md};
      font-weight: ${r.weight.bold};
      line-height: ${r.lineHeight.xs};
      white-space: nowrap;
      color: ${c(n.gray[600],n.gray[300])};
    `,queryFlavorLogo:t`
      font-weight: ${r.weight.semibold};
      font-size: ${r.size.xs};
      background: linear-gradient(
        to right,
        ${c(`#ea4037, #ff9b11`,`#dd524b, #e9a03b`)}
      );
      background-clip: text;
      -webkit-background-clip: text;
      line-height: 1;
      -webkit-text-fill-color: transparent;
      white-space: nowrap;
    `,queryStatusContainer:t`
      display: flex;
      gap: ${Q.size[2]};
      height: min-content;
    `,queryStatusTag:t`
      display: flex;
      gap: ${Q.size[1.5]};
      box-sizing: border-box;
      height: ${Q.size[6.5]};
      background: ${c(n.gray[50],n.darkGray[500])};
      color: ${c(n.gray[700],n.gray[300])};
      border-radius: ${Q.border.radius.sm};
      font-size: ${r.size.sm};
      padding: ${Q.size[1]};
      padding-left: ${Q.size[1.5]};
      align-items: center;
      font-weight: ${r.weight.medium};
      border: ${c(`1px solid `+n.gray[300],`1px solid transparent`)};
      user-select: none;
      position: relative;
      &:focus-visible {
        outline-offset: 2px;
        outline: 2px solid ${n.blue[800]};
      }
    `,queryStatusTagLabel:t`
      font-size: ${r.size.xs};
    `,queryStatusCount:t`
      font-size: ${r.size.xs};
      padding: 0 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${c(n.gray[500],n.gray[400])};
      background-color: ${c(n.gray[200],n.darkGray[300])};
      border-radius: 2px;
      font-variant-numeric: tabular-nums;
      height: ${Q.size[4.5]};
    `,statusTooltip:t`
      position: absolute;
      z-index: 1;
      background-color: ${c(n.gray[50],n.darkGray[500])};
      top: 100%;
      left: 50%;
      transform: translate(-50%, calc(${Q.size[2]}));
      padding: ${Q.size[.5]} ${Q.size[2]};
      border-radius: ${Q.border.radius.sm};
      font-size: ${r.size.xs};
      border: 1px solid ${c(n.gray[400],n.gray[600])};
      color: ${c(n.gray[600],n.gray[300])};

      &::before {
        top: 0px;
        content: ' ';
        display: block;
        left: 50%;
        transform: translate(-50%, -100%);
        position: absolute;
        border-color: transparent transparent
          ${c(n.gray[400],n.gray[600])} transparent;
        border-style: solid;
        border-width: 7px;
        /* transform: rotate(180deg); */
      }

      &::after {
        top: 0px;
        content: ' ';
        display: block;
        left: 50%;
        transform: translate(-50%, calc(-100% + 2px));
        position: absolute;
        border-color: transparent transparent
          ${c(n.gray[100],n.darkGray[500])} transparent;
        border-style: solid;
        border-width: 7px;
      }
    `,filtersContainer:t`
      display: flex;
      gap: ${Q.size[2]};
      & > button {
        cursor: pointer;
        padding: ${Q.size[.5]} ${Q.size[1.5]} ${Q.size[.5]}
          ${Q.size[2]};
        border-radius: ${Q.border.radius.sm};
        background-color: ${c(n.gray[100],n.darkGray[400])};
        border: 1px solid ${c(n.gray[300],n.darkGray[200])};
        color: ${c(n.gray[700],n.gray[300])};
        font-size: ${r.size.xs};
        display: flex;
        align-items: center;
        line-height: ${r.lineHeight.sm};
        gap: ${Q.size[1.5]};
        max-width: 160px;
        &:focus-visible {
          outline-offset: 2px;
          border-radius: ${s.radius.xs};
          outline: 2px solid ${n.blue[800]};
        }
        & svg {
          width: ${Q.size[3]};
          height: ${Q.size[3]};
          color: ${c(n.gray[500],n.gray[400])};
        }
      }
    `,filterInput:t`
      padding: ${i[.5]} ${i[2]};
      border-radius: ${Q.border.radius.sm};
      background-color: ${c(n.gray[100],n.darkGray[400])};
      display: flex;
      box-sizing: content-box;
      align-items: center;
      gap: ${Q.size[1.5]};
      max-width: 160px;
      min-width: 100px;
      border: 1px solid ${c(n.gray[300],n.darkGray[200])};
      height: min-content;
      color: ${c(n.gray[600],n.gray[400])};
      & > svg {
        width: ${i[3]};
        height: ${i[3]};
      }
      & input {
        font-size: ${r.size.xs};
        width: 100%;
        background-color: ${c(n.gray[100],n.darkGray[400])};
        border: none;
        padding: 0;
        line-height: ${r.lineHeight.sm};
        color: ${c(n.gray[700],n.gray[300])};
        &::placeholder {
          color: ${c(n.gray[700],n.gray[300])};
        }
        &:focus {
          outline: none;
        }
      }

      &:focus-within {
        outline-offset: 2px;
        border-radius: ${s.radius.xs};
        outline: 2px solid ${n.blue[800]};
      }
    `,filterSelect:t`
      padding: ${Q.size[.5]} ${Q.size[2]};
      border-radius: ${Q.border.radius.sm};
      background-color: ${c(n.gray[100],n.darkGray[400])};
      display: flex;
      align-items: center;
      gap: ${Q.size[1.5]};
      box-sizing: content-box;
      max-width: 160px;
      border: 1px solid ${c(n.gray[300],n.darkGray[200])};
      height: min-content;
      & > svg {
        color: ${c(n.gray[600],n.gray[400])};
        width: ${Q.size[2]};
        height: ${Q.size[2]};
      }
      & > select {
        appearance: none;
        color: ${c(n.gray[700],n.gray[300])};
        min-width: 100px;
        line-height: ${r.lineHeight.sm};
        font-size: ${r.size.xs};
        background-color: ${c(n.gray[100],n.darkGray[400])};
        border: none;
        &:focus {
          outline: none;
        }
      }
      &:focus-within {
        outline-offset: 2px;
        border-radius: ${s.radius.xs};
        outline: 2px solid ${n.blue[800]};
      }
    `,actionsContainer:t`
      display: flex;
      gap: ${Q.size[2]};
    `,actionsBtn:t`
      border-radius: ${Q.border.radius.sm};
      background-color: ${c(n.gray[100],n.darkGray[400])};
      border: 1px solid ${c(n.gray[300],n.darkGray[200])};
      width: ${Q.size[6.5]};
      height: ${Q.size[6.5]};
      justify-content: center;
      display: flex;
      align-items: center;
      gap: ${Q.size[1.5]};
      max-width: 160px;
      cursor: pointer;
      padding: 0;
      &:hover {
        background-color: ${c(n.gray[200],n.darkGray[500])};
      }
      & svg {
        color: ${c(n.gray[700],n.gray[300])};
        width: ${Q.size[3]};
        height: ${Q.size[3]};
      }
      &:focus-visible {
        outline-offset: 2px;
        border-radius: ${s.radius.xs};
        outline: 2px solid ${n.blue[800]};
      }
    `,actionsBtnOffline:t`
      & svg {
        stroke: ${c(n.yellow[700],n.yellow[500])};
        fill: ${c(n.yellow[700],n.yellow[500])};
      }
    `,overflowQueryContainer:t`
      flex: 1;
      overflow-y: auto;
      & > div {
        display: flex;
        flex-direction: column;
      }
    `,queryRow:t`
      display: flex;
      align-items: center;
      padding: 0;
      border: none;
      cursor: pointer;
      color: ${c(n.gray[700],n.gray[300])};
      background-color: ${c(n.gray[50],n.darkGray[700])};
      line-height: 1;
      &:focus {
        outline: none;
      }
      &:focus-visible {
        outline-offset: -2px;
        border-radius: ${s.radius.xs};
        outline: 2px solid ${n.blue[800]};
      }
      &:hover .tsqd-query-hash {
        background-color: ${c(n.gray[200],n.darkGray[600])};
      }

      & .tsqd-query-observer-count {
        padding: 0 ${Q.size[1]};
        user-select: none;
        min-width: ${Q.size[6.5]};
        align-self: stretch;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: ${r.size.xs};
        font-weight: ${r.weight.medium};
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom: 1px solid ${c(n.gray[300],n.darkGray[700])};
      }
      & .tsqd-query-hash {
        user-select: text;
        font-size: ${r.size.xs};
        display: flex;
        align-items: center;
        min-height: ${Q.size[6]};
        flex: 1;
        padding: ${Q.size[1]} ${Q.size[2]};
        font-family:
          ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
          'Liberation Mono', 'Courier New', monospace;
        border-bottom: 1px solid ${c(n.gray[300],n.darkGray[400])};
        text-align: left;
        text-overflow: clip;
        word-break: break-word;
      }

      & .tsqd-query-disabled-indicator {
        align-self: stretch;
        display: flex;
        align-items: center;
        padding: 0 ${Q.size[2]};
        color: ${c(n.gray[800],n.gray[300])};
        background-color: ${c(n.gray[300],n.darkGray[600])};
        border-bottom: 1px solid ${c(n.gray[300],n.darkGray[400])};
        font-size: ${r.size.xs};
      }

      & .tsqd-query-static-indicator {
        align-self: stretch;
        display: flex;
        align-items: center;
        padding: 0 ${Q.size[2]};
        color: ${c(n.teal[800],n.teal[300])};
        background-color: ${c(n.teal[100],n.teal[900])};
        border-bottom: 1px solid ${c(n.teal[300],n.teal[700])};
        font-size: ${r.size.xs};
      }
    `,selectedQueryRow:t`
      background-color: ${c(n.gray[200],n.darkGray[500])};
    `,detailsContainer:t`
      flex: 1 1 700px;
      background-color: ${c(n.gray[50],n.darkGray[700])};
      color: ${c(n.gray[700],n.gray[300])};
      font-family: ui-sans-serif, Inter, system-ui, sans-serif, sans-serif;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      display: flex;
      text-align: left;
    `,detailsHeader:t`
      font-family: ui-sans-serif, Inter, system-ui, sans-serif, sans-serif;
      position: sticky;
      top: 0;
      z-index: 2;
      background-color: ${c(n.gray[200],n.darkGray[600])};
      padding: ${Q.size[1.5]} ${Q.size[2]};
      font-weight: ${r.weight.medium};
      font-size: ${r.size.xs};
      line-height: ${r.lineHeight.xs};
      text-align: left;
    `,detailsBody:t`
      margin: ${Q.size[1.5]} 0px ${Q.size[2]} 0px;
      & > div {
        display: flex;
        align-items: stretch;
        padding: 0 ${Q.size[2]};
        line-height: ${r.lineHeight.sm};
        justify-content: space-between;
        & > span {
          font-size: ${r.size.xs};
        }
        & > span:nth-child(2) {
          font-variant-numeric: tabular-nums;
        }
      }

      & > div:first-child {
        margin-bottom: ${Q.size[1.5]};
      }

      & code {
        font-family:
          ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
          'Liberation Mono', 'Courier New', monospace;
        margin: 0;
        font-size: ${r.size.xs};
        line-height: ${r.lineHeight.xs};
        max-width: 100%;
        white-space: pre-wrap;
        overflow-wrap: anywhere;
        word-break: break-word;
      }

      & pre {
        margin: 0;
        display: flex;
        align-items: center;
      }
    `,queryDetailsStatus:t`
      border: 1px solid ${n.darkGray[200]};
      border-radius: ${Q.border.radius.sm};
      font-weight: ${r.weight.medium};
      padding: ${Q.size[1]} ${Q.size[2.5]};
    `,actionsBody:t`
      flex-wrap: wrap;
      margin: ${Q.size[2]} 0px ${Q.size[2]} 0px;
      display: flex;
      gap: ${Q.size[2]};
      padding: 0px ${Q.size[2]};
      & > button {
        font-family: ui-sans-serif, Inter, system-ui, sans-serif, sans-serif;
        font-size: ${r.size.xs};
        padding: ${Q.size[1]} ${Q.size[2]};
        display: flex;
        border-radius: ${Q.border.radius.sm};
        background-color: ${c(n.gray[100],n.darkGray[600])};
        border: 1px solid ${c(n.gray[300],n.darkGray[400])};
        align-items: center;
        gap: ${Q.size[2]};
        font-weight: ${r.weight.medium};
        line-height: ${r.lineHeight.xs};
        cursor: pointer;
        &:focus-visible {
          outline-offset: 2px;
          border-radius: ${s.radius.xs};
          outline: 2px solid ${n.blue[800]};
        }
        &:hover {
          background-color: ${c(n.gray[200],n.darkGray[500])};
        }

        &:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        & > span {
          width: ${i[1.5]};
          height: ${i[1.5]};
          border-radius: ${Q.border.radius.full};
        }
      }
    `,actionsSelect:t`
      font-size: ${r.size.xs};
      padding: ${Q.size[.5]} ${Q.size[2]};
      display: flex;
      border-radius: ${Q.border.radius.sm};
      overflow: hidden;
      background-color: ${c(n.gray[100],n.darkGray[600])};
      border: 1px solid ${c(n.gray[300],n.darkGray[400])};
      align-items: center;
      gap: ${Q.size[2]};
      font-weight: ${r.weight.medium};
      line-height: ${r.lineHeight.sm};
      color: ${c(n.red[500],n.red[400])};
      cursor: pointer;
      position: relative;
      &:hover {
        background-color: ${c(n.gray[200],n.darkGray[500])};
      }
      & > span {
        width: ${i[1.5]};
        height: ${i[1.5]};
        border-radius: ${Q.border.radius.full};
      }
      &:focus-within {
        outline-offset: 2px;
        border-radius: ${s.radius.xs};
        outline: 2px solid ${n.blue[800]};
      }
      & select {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        appearance: none;
        background-color: transparent;
        border: none;
        color: transparent;
        outline: none;
      }

      & svg path {
        stroke: ${Q.colors.red[400]};
      }
      & svg {
        width: ${Q.size[2]};
        height: ${Q.size[2]};
      }
    `,settingsMenu:t`
      display: flex;
      & * {
        font-family: ui-sans-serif, Inter, system-ui, sans-serif, sans-serif;
      }
      flex-direction: column;
      gap: ${i[.5]};
      border-radius: ${Q.border.radius.sm};
      border: 1px solid ${c(n.gray[300],n.gray[700])};
      background-color: ${c(n.gray[50],n.darkGray[600])};
      font-size: ${r.size.xs};
      color: ${c(n.gray[700],n.gray[300])};
      z-index: 99999;
      min-width: 120px;
      padding: ${i[.5]};
    `,settingsSubTrigger:t`
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-radius: ${Q.border.radius.xs};
      padding: ${Q.size[1]} ${Q.size[1]};
      cursor: pointer;
      background-color: transparent;
      border: none;
      color: ${c(n.gray[700],n.gray[300])};
      & svg {
        color: ${c(n.gray[600],n.gray[400])};
        transform: rotate(-90deg);
        width: ${Q.size[2]};
        height: ${Q.size[2]};
      }
      &:hover {
        background-color: ${c(n.gray[200],n.darkGray[500])};
      }
      &:focus-visible {
        outline-offset: 2px;
        outline: 2px solid ${n.blue[800]};
      }
      &.data-disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    `,settingsMenuHeader:t`
      padding: ${Q.size[1]} ${Q.size[1]};
      font-weight: ${r.weight.medium};
      border-bottom: 1px solid ${c(n.gray[300],n.darkGray[400])};
      color: ${c(n.gray[500],n.gray[400])};
      font-size: ${r.size.xs};
    `,settingsSubButton:t`
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: ${c(n.gray[700],n.gray[300])};
      font-size: ${r.size.xs};
      border-radius: ${Q.border.radius.xs};
      padding: ${Q.size[1]} ${Q.size[1]};
      cursor: pointer;
      background-color: transparent;
      border: none;
      & svg {
        color: ${c(n.gray[600],n.gray[400])};
      }
      &:hover {
        background-color: ${c(n.gray[200],n.darkGray[500])};
      }
      &:focus-visible {
        outline-offset: 2px;
        outline: 2px solid ${n.blue[800]};
      }
      &[data-checked] {
        background-color: ${c(n.purple[100],n.purple[900])};
        color: ${c(n.purple[700],n.purple[300])};
        & svg {
          color: ${c(n.purple[700],n.purple[300])};
        }
        &:hover {
          background-color: ${c(n.purple[100],n.purple[900])};
        }
      }
    `,viewToggle:t`
      border-radius: ${Q.border.radius.sm};
      background-color: ${c(n.gray[200],n.darkGray[600])};
      border: 1px solid ${c(n.gray[300],n.darkGray[200])};
      display: flex;
      padding: 0;
      font-size: ${r.size.xs};
      color: ${c(n.gray[700],n.gray[300])};
      overflow: hidden;

      &:has(:focus-visible) {
        outline: 2px solid ${n.blue[800]};
      }

      & .tsqd-radio-toggle {
        opacity: 0.5;
        display: flex;
        & label {
          display: flex;
          align-items: center;
          cursor: pointer;
          line-height: ${r.lineHeight.md};
        }

        & label:hover {
          background-color: ${c(n.gray[100],n.darkGray[500])};
        }
      }

      & > [data-checked] {
        opacity: 1;
        background-color: ${c(n.gray[100],n.darkGray[400])};
        & label:hover {
          background-color: ${c(n.gray[100],n.darkGray[400])};
        }
      }

      & .tsqd-radio-toggle:first-child {
        & label {
          padding: 0 ${Q.size[1.5]} 0 ${Q.size[2]};
        }
        border-right: 1px solid ${c(n.gray[300],n.darkGray[200])};
      }

      & .tsqd-radio-toggle:nth-child(2) {
        & label {
          padding: 0 ${Q.size[2]} 0 ${Q.size[1.5]};
        }
      }
    `,devtoolsEditForm:t`
      padding: ${i[2]};
      & > [data-error='true'] {
        outline: 2px solid ${c(n.red[200],n.red[800])};
        outline-offset: 2px;
        border-radius: ${s.radius.xs};
      }
    `,devtoolsEditTextarea:t`
      width: 100%;
      max-height: 500px;
      font-family: 'Fira Code', monospace;
      font-size: ${r.size.xs};
      border-radius: ${s.radius.sm};
      field-sizing: content;
      padding: ${i[2]};
      background-color: ${c(n.gray[100],n.darkGray[800])};
      color: ${c(n.gray[900],n.gray[100])};
      border: 1px solid ${c(n.gray[200],n.gray[700])};
      resize: none;
      &:focus {
        outline-offset: 2px;
        border-radius: ${s.radius.xs};
        outline: 2px solid ${c(n.blue[200],n.blue[800])};
      }
    `,devtoolsEditFormActions:t`
      display: flex;
      justify-content: space-between;
      gap: ${i[2]};
      align-items: center;
      padding-top: ${i[1]};
      font-size: ${r.size.xs};
    `,devtoolsEditFormError:t`
      color: ${c(n.red[700],n.red[500])};
    `,devtoolsEditFormActionContainer:t`
      display: flex;
      gap: ${i[2]};
    `,devtoolsEditFormAction:t`
      font-family: ui-sans-serif, Inter, system-ui, sans-serif, sans-serif;
      font-size: ${r.size.xs};
      padding: ${i[1]} ${Q.size[2]};
      display: flex;
      border-radius: ${s.radius.sm};
      background-color: ${c(n.gray[100],n.darkGray[600])};
      border: 1px solid ${c(n.gray[300],n.darkGray[400])};
      align-items: center;
      gap: ${i[2]};
      font-weight: ${r.weight.medium};
      line-height: ${r.lineHeight.xs};
      cursor: pointer;
      &:focus-visible {
        outline-offset: 2px;
        border-radius: ${s.radius.xs};
        outline: 2px solid ${n.blue[800]};
      }
      &:hover {
        background-color: ${c(n.gray[200],n.darkGray[500])};
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    `}},Pu=e=>Nu(`light`,e),Fu=e=>Nu(`dark`,e);ee([`click`,`mousedown`,`keydown`,`input`]);export{Fe as a,ve as c,Re as i,mu as n,De as o,gu as r,Be as s,vu as t};