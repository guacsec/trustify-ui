import{$ as e,At as t,Bt as n,Ct as r,Dt as i,Et as a,Ft as o,Ht as s,It as c,J as l,Lt as u,Mt as d,Nt as f,Ot as p,Pt as m,Q as h,Rt as g,St as _,Tt as v,Ut as y,Vt as b,Wt as x,X as S,Y as C,Z as w,_t as T,at as E,ct as D,dt as O,et as ee,ft as k,gt as te,ht as A,it as j,jt as ne,kt as M,lt as N,mt as P,nt as re,ot as F,pt as I,q as ie,rt as L,st as ae,tt as oe,ut as R,vt as z,wt as se,xt as ce,zt as B}from"./index-DaKtPmO9.js";var le=e=>e!=null,ue=e=>e.filter(le);function de(e){return(...t)=>{for(let n of e)n&&n(...t)}}var V=e=>typeof e==`function`&&!e.length?e():e,fe=e=>Array.isArray(e)?e:e?[e]:[];function pe(e,...t){return typeof e==`function`?e(...t):e}var me=t;function he(e,t,n,r){let i=e.length,a=t.length,o=0;if(!a){for(;o<i;o++)n(e[o]);return}if(!i){for(;o<a;o++)r(t[o]);return}for(;o<a&&t[o]===e[o];o++);let s,c;t=t.slice(o),e=e.slice(o);for(s of t)e.includes(s)||r(s);for(c of e)t.includes(c)||n(c)}function ge(e){let[n,r]=I(),i=e?.throw?(e,t)=>{throw r(e instanceof Error?e:Error(t)),e}:(e,t)=>{r(e instanceof Error?e:Error(t))},a=e?.api?Array.isArray(e.api)?e.api:[e.api]:[globalThis.localStorage].filter(Boolean),o=e?.prefix?`${e.prefix}.`:``,s=new Map,c=new Proxy({},{get(t,n){let r=s.get(n);r||(r=I(void 0,{equals:!1}),s.set(n,r)),r[0]();let c=a.reduce((e,t)=>{if(e!==null||!t)return e;try{return t.getItem(`${o}${n}`)}catch(e){return i(e,`Error reading ${o}${n} from ${t.name}`),null}},null);return c!==null&&e?.deserializer?e.deserializer(c,n,e.options):c}});return e?.sync!==!1&&ne(()=>{let e=e=>{let t=!1;a.forEach(n=>{try{n!==e.storageArea&&e.key&&e.newValue!==n.getItem(e.key)&&(e.newValue?n.setItem(e.key,e.newValue):n.removeItem(e.key),t=!0)}catch(t){i(t,`Error synching api ${n.name} from storage event (${e.key}=${e.newValue})`)}}),t&&e.key&&s.get(e.key)?.[1]()};`addEventListener`in globalThis?(globalThis.addEventListener(`storage`,e),t(()=>globalThis.removeEventListener(`storage`,e))):(a.forEach(t=>t.addEventListener?.(`storage`,e)),t(()=>a.forEach(t=>t.removeEventListener?.(`storage`,e))))}),[c,(t,n,r)=>{let c=e?.serializer?e.serializer(n,t,r??e.options):n,l=`${o}${t}`;a.forEach(e=>{try{e.getItem(l)!==c&&e.setItem(l,c)}catch(n){i(n,`Error setting ${o}${t} to ${c} in ${e.name}`)}});let u=s.get(t);u&&u[1]()},{clear:()=>a.forEach(e=>{try{e.clear()}catch(t){i(t,`Error clearing ${e.name}`)}}),error:n,remove:e=>a.forEach(t=>{try{t.removeItem(`${o}${e}`)}catch(n){i(n,`Error removing ${o}${e} from ${t.name}`)}}),toJSON:()=>{let t={},n=(n,r)=>{if(!t.hasOwnProperty(n)){let i=r&&e?.deserializer?e.deserializer(r,n,e.options):r;i&&(t[n]=i)}};return a.forEach(e=>{if(typeof e.getAll==`function`){let t;try{t=e.getAll()}catch(t){i(t,`Error getting all values from in ${e.name}`)}for(let e of t)n(e,t[e])}else{let r=0,a;try{for(;a=e.key(r++);)t.hasOwnProperty(a)||n(a,e.getItem(a))}catch(t){i(t,`Error getting all values from ${e.name}`)}}}),t}}]}var _e=ge,ve=e=>(typeof e.clear==`function`||(e.clear=()=>{let t;for(;t=e.key(0);)e.removeItem(t)}),e),ye=e=>{if(!e)return``;let t=``;for(let n in e){if(!e.hasOwnProperty(n))continue;let r=e[n];t+=r instanceof Date?`; ${n}=${r.toUTCString()}`:typeof r==`boolean`?`; ${n}`:`; ${n}=${r}`}return t},be=ve({_cookies:[globalThis.document,`cookie`],getItem:e=>be._cookies[0][be._cookies[1]].match(`(^|;)\\s*`+e+`\\s*=\\s*([^;]+)`)?.pop()??null,setItem:(e,t,n)=>{let r=be.getItem(e);be._cookies[0][be._cookies[1]]=`${e}=${t}${ye(n)}`;let i=Object.assign(new Event(`storage`),{key:e,oldValue:r,newValue:t,url:globalThis.document.URL,storageArea:be});window.dispatchEvent(i)},removeItem:e=>{be._cookies[0][be._cookies[1]]=`${e}=deleted${ye({expires:new Date(0)})}`},key:e=>{let t=null,n=0;return be._cookies[0][be._cookies[1]].replace(/(?:^|;)\s*(.+?)\s*=\s*[^;]+/g,(r,i)=>(!t&&i&&n++===e&&(t=i),``)),t},get length(){let e=0;return be._cookies[0][be._cookies[1]].replace(/(?:^|;)\s*.+?\s*=\s*[^;]+/g,t=>(e+=+!!t,``)),e}}),xe=1024,Se=796,Ce=700,we=`bottom-right`,Te=`bottom`,Ee=`system`,De=!1,Oe=500,ke=500,Ae=500,je=Object.keys(o)[0],Me=1,Ne=Object.keys(p)[0],Pe=D({client:void 0,onlineManager:void 0,queryFlavor:``,version:``,shadowDOMTarget:void 0});function H(){return y(Pe)}var Fe=class extends Error{},Ie=D(void 0),Le=e=>{let[n,r]=I(null),i=()=>{let e=n();e!=null&&(e.close(),r(null))},a=(t,i)=>{if(n()!=null)return;let a=window.open(``,`TSQD-Devtools-Panel`,`width=${t},height=${i},popup`);if(!a)throw new Fe(`Failed to open popup. Please allow popups for this site to view the devtools in picture-in-picture mode.`);a.document.head.innerHTML=``,a.document.body.innerHTML=``,j(a.document),a.document.title=`TanStack Query Devtools`,a.document.body.style.margin=`0`,a.addEventListener(`pagehide`,()=>{e.setLocalStore(`pip_open`,`false`),r(null)}),[...(H().shadowDOMTarget||document).styleSheets].forEach(e=>{try{let t=[...e.cssRules].map(e=>e.cssText).join(``),n=document.createElement(`style`),r=e.ownerNode,i=``;r&&`id`in r&&(i=r.id),i&&n.setAttribute(`id`,i),n.textContent=t,a.document.head.appendChild(n)}catch{let t=document.createElement(`link`);if(e.href==null)return;t.rel=`stylesheet`,t.type=e.type,t.media=e.media.toString(),t.href=e.href,a.document.head.appendChild(t)}}),A([`focusin`,`focusout`,`pointermove`,`keydown`,`pointerdown`,`pointerup`,`click`,`mousedown`,`input`],a.document),e.setLocalStore(`pip_open`,`true`),r(a)};N(()=>{if((e.localStore.pip_open??`false`)===`true`&&!e.disabled)try{a(Number(window.innerWidth),Number(e.localStore.height||ke))}catch(t){if(t instanceof Fe){e.setLocalStore(`pip_open`,`false`),e.setLocalStore(`open`,`false`);return}throw t}}),N(()=>{let e=(H().shadowDOMTarget||document).querySelector(`#_goober`),r=n();if(e&&r){let n=new MutationObserver(()=>{let t=(H().shadowDOMTarget||r.document).querySelector(`#_goober`);t&&(t.textContent=e.textContent)});n.observe(e,{childList:!0,subtree:!0,characterDataOldValue:!0}),t(()=>{n.disconnect()})}});let o=R(()=>({pipWindow:n(),requestPipWindow:a,closePipWindow:i,disabled:e.disabled??!1}));return F(Ie.Provider,{value:o,get children(){return e.children}})},Re=()=>R(()=>{let e=y(Ie);if(!e)throw Error(`usePiPWindow must be used within a PiPProvider`);return e()}),ze=D(()=>`dark`);function U(){return y(ze)}var Be={À:`A`,Á:`A`,Â:`A`,Ã:`A`,Ä:`A`,Å:`A`,Ấ:`A`,Ắ:`A`,Ẳ:`A`,Ẵ:`A`,Ặ:`A`,Æ:`AE`,Ầ:`A`,Ằ:`A`,Ȃ:`A`,Ç:`C`,Ḉ:`C`,È:`E`,É:`E`,Ê:`E`,Ë:`E`,Ế:`E`,Ḗ:`E`,Ề:`E`,Ḕ:`E`,Ḝ:`E`,Ȇ:`E`,Ì:`I`,Í:`I`,Î:`I`,Ï:`I`,Ḯ:`I`,Ȋ:`I`,Ð:`D`,Ñ:`N`,Ò:`O`,Ó:`O`,Ô:`O`,Õ:`O`,Ö:`O`,Ø:`O`,Ố:`O`,Ṍ:`O`,Ṓ:`O`,Ȏ:`O`,Ù:`U`,Ú:`U`,Û:`U`,Ü:`U`,Ý:`Y`,à:`a`,á:`a`,â:`a`,ã:`a`,ä:`a`,å:`a`,ấ:`a`,ắ:`a`,ẳ:`a`,ẵ:`a`,ặ:`a`,æ:`ae`,ầ:`a`,ằ:`a`,ȃ:`a`,ç:`c`,ḉ:`c`,è:`e`,é:`e`,ê:`e`,ë:`e`,ế:`e`,ḗ:`e`,ề:`e`,ḕ:`e`,ḝ:`e`,ȇ:`e`,ì:`i`,í:`i`,î:`i`,ï:`i`,ḯ:`i`,ȋ:`i`,ð:`d`,ñ:`n`,ò:`o`,ó:`o`,ô:`o`,õ:`o`,ö:`o`,ø:`o`,ố:`o`,ṍ:`o`,ṓ:`o`,ȏ:`o`,ù:`u`,ú:`u`,û:`u`,ü:`u`,ý:`y`,ÿ:`y`,Ā:`A`,ā:`a`,Ă:`A`,ă:`a`,Ą:`A`,ą:`a`,Ć:`C`,ć:`c`,Ĉ:`C`,ĉ:`c`,Ċ:`C`,ċ:`c`,Č:`C`,č:`c`,C̆:`C`,c̆:`c`,Ď:`D`,ď:`d`,Đ:`D`,đ:`d`,Ē:`E`,ē:`e`,Ĕ:`E`,ĕ:`e`,Ė:`E`,ė:`e`,Ę:`E`,ę:`e`,Ě:`E`,ě:`e`,Ĝ:`G`,Ǵ:`G`,ĝ:`g`,ǵ:`g`,Ğ:`G`,ğ:`g`,Ġ:`G`,ġ:`g`,Ģ:`G`,ģ:`g`,Ĥ:`H`,ĥ:`h`,Ħ:`H`,ħ:`h`,Ḫ:`H`,ḫ:`h`,Ĩ:`I`,ĩ:`i`,Ī:`I`,ī:`i`,Ĭ:`I`,ĭ:`i`,Į:`I`,į:`i`,İ:`I`,ı:`i`,Ĳ:`IJ`,ĳ:`ij`,Ĵ:`J`,ĵ:`j`,Ķ:`K`,ķ:`k`,Ḱ:`K`,ḱ:`k`,K̆:`K`,k̆:`k`,Ĺ:`L`,ĺ:`l`,Ļ:`L`,ļ:`l`,Ľ:`L`,ľ:`l`,Ŀ:`L`,ŀ:`l`,Ł:`l`,ł:`l`,Ḿ:`M`,ḿ:`m`,M̆:`M`,m̆:`m`,Ń:`N`,ń:`n`,Ņ:`N`,ņ:`n`,Ň:`N`,ň:`n`,ŉ:`n`,N̆:`N`,n̆:`n`,Ō:`O`,ō:`o`,Ŏ:`O`,ŏ:`o`,Ő:`O`,ő:`o`,Œ:`OE`,œ:`oe`,P̆:`P`,p̆:`p`,Ŕ:`R`,ŕ:`r`,Ŗ:`R`,ŗ:`r`,Ř:`R`,ř:`r`,R̆:`R`,r̆:`r`,Ȓ:`R`,ȓ:`r`,Ś:`S`,ś:`s`,Ŝ:`S`,ŝ:`s`,Ş:`S`,Ș:`S`,ș:`s`,ş:`s`,Š:`S`,š:`s`,Ţ:`T`,ţ:`t`,ț:`t`,Ț:`T`,Ť:`T`,ť:`t`,Ŧ:`T`,ŧ:`t`,T̆:`T`,t̆:`t`,Ũ:`U`,ũ:`u`,Ū:`U`,ū:`u`,Ŭ:`U`,ŭ:`u`,Ů:`U`,ů:`u`,Ű:`U`,ű:`u`,Ų:`U`,ų:`u`,Ȗ:`U`,ȗ:`u`,V̆:`V`,v̆:`v`,Ŵ:`W`,ŵ:`w`,Ẃ:`W`,ẃ:`w`,X̆:`X`,x̆:`x`,Ŷ:`Y`,ŷ:`y`,Ÿ:`Y`,Y̆:`Y`,y̆:`y`,Ź:`Z`,ź:`z`,Ż:`Z`,ż:`z`,Ž:`Z`,ž:`z`,ſ:`s`,ƒ:`f`,Ơ:`O`,ơ:`o`,Ư:`U`,ư:`u`,Ǎ:`A`,ǎ:`a`,Ǐ:`I`,ǐ:`i`,Ǒ:`O`,ǒ:`o`,Ǔ:`U`,ǔ:`u`,Ǖ:`U`,ǖ:`u`,Ǘ:`U`,ǘ:`u`,Ǚ:`U`,ǚ:`u`,Ǜ:`U`,ǜ:`u`,Ứ:`U`,ứ:`u`,Ṹ:`U`,ṹ:`u`,Ǻ:`A`,ǻ:`a`,Ǽ:`AE`,ǽ:`ae`,Ǿ:`O`,ǿ:`o`,Þ:`TH`,þ:`th`,Ṕ:`P`,ṕ:`p`,Ṥ:`S`,ṥ:`s`,X́:`X`,x́:`x`,Ѓ:`Г`,ѓ:`г`,Ќ:`К`,ќ:`к`,A̋:`A`,a̋:`a`,E̋:`E`,e̋:`e`,I̋:`I`,i̋:`i`,Ǹ:`N`,ǹ:`n`,Ồ:`O`,ồ:`o`,Ṑ:`O`,ṑ:`o`,Ừ:`U`,ừ:`u`,Ẁ:`W`,ẁ:`w`,Ỳ:`Y`,ỳ:`y`,Ȁ:`A`,ȁ:`a`,Ȅ:`E`,ȅ:`e`,Ȉ:`I`,ȉ:`i`,Ȍ:`O`,ȍ:`o`,Ȑ:`R`,ȑ:`r`,Ȕ:`U`,ȕ:`u`,B̌:`B`,b̌:`b`,Č̣:`C`,č̣:`c`,Ê̌:`E`,ê̌:`e`,F̌:`F`,f̌:`f`,Ǧ:`G`,ǧ:`g`,Ȟ:`H`,ȟ:`h`,J̌:`J`,ǰ:`j`,Ǩ:`K`,ǩ:`k`,M̌:`M`,m̌:`m`,P̌:`P`,p̌:`p`,Q̌:`Q`,q̌:`q`,Ř̩:`R`,ř̩:`r`,Ṧ:`S`,ṧ:`s`,V̌:`V`,v̌:`v`,W̌:`W`,w̌:`w`,X̌:`X`,x̌:`x`,Y̌:`Y`,y̌:`y`,A̧:`A`,a̧:`a`,B̧:`B`,b̧:`b`,Ḑ:`D`,ḑ:`d`,Ȩ:`E`,ȩ:`e`,Ɛ̧:`E`,ɛ̧:`e`,Ḩ:`H`,ḩ:`h`,I̧:`I`,i̧:`i`,Ɨ̧:`I`,ɨ̧:`i`,M̧:`M`,m̧:`m`,O̧:`O`,o̧:`o`,Q̧:`Q`,q̧:`q`,U̧:`U`,u̧:`u`,X̧:`X`,x̧:`x`,Z̧:`Z`,z̧:`z`},Ve=Object.keys(Be).join(`|`),He=new RegExp(Ve,`g`);function Ue(e){return e.replace(He,e=>Be[e])}var W={CASE_SENSITIVE_EQUAL:7,EQUAL:6,STARTS_WITH:5,WORD_STARTS_WITH:4,CONTAINS:3,ACRONYM:2,MATCHES:1,NO_MATCH:0};function We(e,t,n){if(n||={},n.threshold=n.threshold??W.MATCHES,!n.accessors){let r=Ge(e,t,n);return{rankedValue:e,rank:r,accessorIndex:-1,accessorThreshold:n.threshold,passed:r>=n.threshold}}let r=Xe(e,n.accessors),i={rankedValue:e,rank:W.NO_MATCH,accessorIndex:-1,accessorThreshold:n.threshold,passed:!1};for(let e=0;e<r.length;e++){let a=r[e],o=Ge(a.itemValue,t,n),{minRanking:s,maxRanking:c,threshold:l=n.threshold}=a.attributes;o<s&&o>=W.MATCHES?o=s:o>c&&(o=c),o=Math.min(o,c),o>=l&&o>i.rank&&(i.rank=o,i.passed=!0,i.accessorIndex=e,i.accessorThreshold=l,i.rankedValue=a.itemValue)}return i}function Ge(e,t,n){return e=Je(e,n),t=Je(t,n),t.length>e.length?W.NO_MATCH:e===t?W.CASE_SENSITIVE_EQUAL:(e=e.toLowerCase(),t=t.toLowerCase(),e===t?W.EQUAL:e.startsWith(t)?W.STARTS_WITH:e.includes(` ${t}`)?W.WORD_STARTS_WITH:e.includes(t)?W.CONTAINS:t.length===1?W.NO_MATCH:Ke(e).includes(t)?W.ACRONYM:qe(e,t))}function Ke(e){let t=``;return e.split(` `).forEach(e=>{e.split(`-`).forEach(e=>{t+=e.substr(0,1)})}),t}function qe(e,t){let n=0,r=0;function i(e,t,r){for(let i=r,a=t.length;i<a;i++)if(t[i]===e)return n+=1,i+1;return-1}function a(e){let r=1/e,i=n/t.length;return W.MATCHES+i*r}let o=i(t[0],e,0);if(o<0)return W.NO_MATCH;r=o;for(let n=1,a=t.length;n<a;n++){let a=t[n];if(r=i(a,e,r),!(r>-1))return W.NO_MATCH}return a(r-o)}function Je(e,t){let{keepDiacritics:n}=t;return e=`${e}`,n||(e=Ue(e)),e}function Ye(e,t){let n=t;typeof t==`object`&&(n=t.accessor);let r=n(e);return r==null?[]:Array.isArray(r)?r:[String(r)]}function Xe(e,t){let n=[];for(let r=0,i=t.length;r<i;r++){let i=t[r],a=Qe(i),o=Ye(e,i);for(let e=0,t=o.length;e<t;e++)n.push({itemValue:o[e],attributes:a})}return n}var Ze={maxRanking:1/0,minRanking:-1/0};function Qe(e){return typeof e==`function`?Ze:{...Ze,...e}}var $e={data:``},et=e=>{if(typeof window==`object`){let t=(e?e.querySelector(`#_goober`):window._goober)||Object.assign(document.createElement(`style`),{innerHTML:` `,id:`_goober`});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||$e},tt=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,nt=/\/\*[^]*?\*\/|  +/g,rt=/\n+/g,it=(e,t)=>{let n=``,r=``,i=``;for(let a in e){let o=e[a];a[0]==`@`?a[1]==`i`?n=a+` `+o+`;`:r+=a[1]==`f`?it(o,a):a+`{`+it(o,a[1]==`k`?``:t)+`}`:typeof o==`object`?r+=it(o,t?t.replace(/([^,])+/g,e=>a.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+` `+t:t)):a):o!=null&&(a=/^--/.test(a)?a:a.replace(/[A-Z]/g,`-$&`).toLowerCase(),i+=it.p?it.p(a,o):a+`:`+o+`;`)}return n+(t&&i?t+`{`+i+`}`:i)+r},at={},ot=e=>{if(typeof e==`object`){let t=``;for(let n in e)t+=n+ot(e[n]);return t}return e},st=(e,t,n,r,i)=>{let a=ot(e),o=at[a]||(at[a]=(e=>{let t=0,n=11;for(;t<e.length;)n=101*n+e.charCodeAt(t++)>>>0;return`go`+n})(a));if(!at[o]){let t=a===e?(e=>{let t,n,r=[{}];for(;t=tt.exec(e.replace(nt,``));)t[4]?r.shift():t[3]?(n=t[3].replace(rt,` `).trim(),r.unshift(r[0][n]=r[0][n]||{})):r[0][t[1]]=t[2].replace(rt,` `).trim();return r[0]})(e):e;at[o]=it(i?{[`@keyframes `+o]:t}:t,n?``:`.`+o)}let s=n&&at.g?at.g:null;return n&&(at.g=at[o]),((e,t,n,r)=>{r?t.data=t.data.replace(r,e):t.data.indexOf(e)===-1&&(t.data=n?e+t.data:t.data+e)})(at[o],t,r,s),o},ct=(e,t,n)=>e.reduce((e,r,i)=>{let a=t[i];if(a&&a.call){let e=a(n),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;a=t?`.`+t:e&&typeof e==`object`?e.props?``:it(e,``):!1===e?``:e}return e+r+(a??``)},``);function G(e){let t=this||{},n=e.call?e(t.p):e;return st(n.unshift?n.raw?ct(n,[].slice.call(arguments,1),t.p):n.reduce((e,n)=>Object.assign(e,n&&n.call?n(t.p):n),{}):n,et(t.target),t.g,t.o,t.k)}G.bind({g:1}),G.bind({k:1});function lt(e){var t,n,r=``;if(typeof e==`string`||typeof e==`number`)r+=e;else if(typeof e==`object`){if(Array.isArray(e)){var i=e.length;for(t=0;t<i;t++)e[t]&&(n=lt(e[t]))&&(r&&(r+=` `),r+=n)}else for(n in e)e[n]&&(r&&(r+=` `),r+=n)}return r}function K(){for(var e,t,n=0,r=``,i=arguments.length;n<i;n++)(e=arguments[n])&&(t=lt(e))&&(r&&(r+=` `),r+=t);return r}function ut(e,t){let r=n(e),{onChange:i}=t,a=new Set(t.appear?void 0:r),o=new WeakSet,[s,c]=I([],{equals:!1}),[l]=x(),u=e=>{c(t=>(t.push.apply(t,e),t));for(let t of e)o.delete(t)},d=(e,t,n)=>e.splice(n,0,t);return R(t=>{let r=s(),c=e();if(c[ie],n(l))return l(),t;if(r.length){let e=t.filter(e=>!r.includes(e));return r.length=0,i({list:e,added:[],removed:[],unchanged:e,finishRemoved:u}),e}return n(()=>{let e=new Set(c),n=c.slice(),r=[],s=[],l=[];for(let e of c)(a.has(e)?l:r).push(e);let f=!r.length;for(let r=0;r<t.length;r++){let i=t[r];e.has(i)||(o.has(i)||(s.push(i),o.add(i)),d(n,i,r)),f&&i!==n[r]&&(f=!1)}return!s.length&&f?t:(i({list:n,added:r,removed:s,unchanged:l,finishRemoved:u}),a=e,n)})},t.appear?[]:r.slice())}function dt(...e){return de(e)}var ft=e=>e instanceof Element;function pt(e,t){if(t(e))return e;if(typeof e==`function`&&!e.length)return pt(e(),t);if(Array.isArray(e)){let n=[];for(let r of e){let e=pt(r,t);e&&(Array.isArray(e)?n.push.apply(n,e):n.push(e))}return n.length?n:null}return null}function mt(e,t=ft,n=ft){let r=R(e),i=R(()=>pt(r(),t));return i.toArray=()=>{let e=i();return Array.isArray(e)?e:e?[e]:[]},i}function ht(e){return R(()=>{let t=e.name||`s`;return{enterActive:(e.enterActiveClass||t+`-enter-active`).split(` `),enter:(e.enterClass||t+`-enter`).split(` `),enterTo:(e.enterToClass||t+`-enter-to`).split(` `),exitActive:(e.exitActiveClass||t+`-exit-active`).split(` `),exit:(e.exitClass||t+`-exit`).split(` `),exitTo:(e.exitToClass||t+`-exit-to`).split(` `),move:(e.moveClass||t+`-move`).split(` `)}})}function gt(e){requestAnimationFrame(()=>requestAnimationFrame(e))}function _t(e,t,n,r){let{onBeforeEnter:i,onEnter:a,onAfterEnter:o}=t;i?.(n),n.classList.add(...e.enter),n.classList.add(...e.enterActive),queueMicrotask(()=>{if(!n.parentNode)return r?.();a?.(n,()=>s())}),gt(()=>{n.classList.remove(...e.enter),n.classList.add(...e.enterTo),(!a||a.length<2)&&(n.addEventListener(`transitionend`,s),n.addEventListener(`animationend`,s))});function s(t){t&&t.target!==n||(n.removeEventListener(`transitionend`,s),n.removeEventListener(`animationend`,s),n.classList.remove(...e.enterActive),n.classList.remove(...e.enterTo),o?.(n))}}function vt(e,t,n,r){let{onBeforeExit:i,onExit:a,onAfterExit:o}=t;if(!n.parentNode)return r?.();i?.(n),n.classList.add(...e.exit),n.classList.add(...e.exitActive),a?.(n,()=>s()),gt(()=>{n.classList.remove(...e.exit),n.classList.add(...e.exitTo),(!a||a.length<2)&&(n.addEventListener(`transitionend`,s),n.addEventListener(`animationend`,s))});function s(t){t&&t.target!==n||(r?.(),n.removeEventListener(`transitionend`,s),n.removeEventListener(`animationend`,s),n.classList.remove(...e.exitActive),n.classList.remove(...e.exitTo),o?.(n))}}var yt=e=>{let t=ht(e);return ut(mt(()=>e.children).toArray,{appear:e.appear,onChange({added:n,removed:r,finishRemoved:i,list:a}){let o=t();for(let t of n)_t(o,e,t);let s=[];for(let e of a)e.isConnected&&(e instanceof HTMLElement||e instanceof SVGElement)&&s.push({el:e,rect:e.getBoundingClientRect()});queueMicrotask(()=>{let e=[];for(let{el:t,rect:n}of s)if(t.isConnected){let r=t.getBoundingClientRect(),i=n.left-r.left,a=n.top-r.top;(i||a)&&(t.style.transform=`translate(${i}px, ${a}px)`,t.style.transitionDuration=`0s`,e.push(t))}document.body.offsetHeight;for(let t of e){let e=function(n){(n.target===t||/transform$/.test(n.propertyName))&&(t.removeEventListener(`transitionend`,e),t.classList.remove(...o.move))};t.classList.add(...o.move),t.style.transform=t.style.transitionDuration=``,t.addEventListener(`transitionend`,e)}});for(let t of r)vt(o,e,t,()=>i([t]))}})},bt=Symbol(`fallback`);function xt(e){for(let t of e)t.dispose()}function St(e,r,i,a={}){let o=new Map;return t(()=>xt(o.values())),()=>{let t=e()||[];return t[ie],n(()=>{if(!t.length)return xt(o.values()),o.clear(),a.fallback?[k(e=>(o.set(bt,{dispose:e}),a.fallback()))]:[];let e=Array(t.length),n=o.get(bt);if(!o.size||n){n?.dispose(),o.delete(bt);for(let n=0;n<t.length;n++){let i=t[n],a=r(i,n);s(e,i,n,a)}return e}let i=new Set(o.keys());for(let n=0;n<t.length;n++){let a=t[n],c=r(a,n);i.delete(c);let l=o.get(c);l?(e[n]=l.mapped,l.setIndex?.(n),l.setItem(()=>a)):s(e,a,n,c)}for(let e of i)o.get(e)?.dispose(),o.delete(e);return e})};function s(e,t,n,r){k(a=>{let[s,c]=I(t),l={setItem:c,dispose:a};if(i.length>1){let[e,t]=I(n);l.setIndex=t,l.mapped=i(s,e)}else l.mapped=i(s);o.set(r,l),e[n]=l.mapped})}}function Ct(e){let{by:t}=e;return R(St(()=>e.each,typeof t==`function`?t:e=>e[t],e.children,`fallback`in e?{fallback:()=>e.fallback}:void 0))}function wt(e,t,n,r){return e.addEventListener(t,n,r),me(e.removeEventListener.bind(e,t,n,r))}function Tt(e,t,n,r){let i=()=>{fe(V(e)).forEach(e=>{e&&fe(V(t)).forEach(t=>wt(e,t,n,r))})};typeof e==`function`?N(i):O(i)}function Et(e,n){let r=new ResizeObserver(e);return t(r.disconnect.bind(r)),{observe:e=>r.observe(e,n),unobserve:r.unobserve.bind(r)}}function Dt(e,t,n){let r=new WeakMap,{observe:i,unobserve:a}=Et(e=>{for(let n of e){let{contentRect:e,target:i}=n,a=Math.round(e.width),o=Math.round(e.height),s=r.get(i);s&&s.width===a&&s.height===o||(t(e,i,n),r.set(i,{width:a,height:o}))}},n);N(t=>{let n=ue(fe(V(e)));return he(n,t,i,a),n},[])}var Ot=/((?:--)?(?:\w+-?)+)\s*:\s*([^;]*)/g;function kt(e){let t={},n;for(;n=Ot.exec(e);)t[n[1]]=n[2];return t}function At(e,t){if(typeof e==`string`){if(typeof t==`string`)return`${e};${t}`;e=kt(e)}else typeof t==`string`&&(t=kt(t));return{...e,...t}}function jt(e,t,n=-1){return n in e?[...e.slice(0,n),t,...e.slice(n)]:[...e,t]}function Mt(e,t){let n=[...e],r=n.indexOf(t);return r!==-1&&n.splice(r,1),n}function Nt(e){return typeof e==`number`}function Pt(e){return Object.prototype.toString.call(e)===`[object String]`}function Ft(e){return typeof e==`function`}function It(e){return t=>`${e()}-${t}`}function Lt(e,t){return e?e===t||e.contains(t):!1}function Rt(e,t=!1){let{activeElement:n}=Bt(e);if(!n?.nodeName)return null;if(Vt(n)&&n.contentDocument)return Rt(n.contentDocument.body,t);if(t){let e=n.getAttribute(`aria-activedescendant`);if(e){let t=Bt(n).getElementById(e);if(t)return t}}return n}function zt(e){return Bt(e).defaultView||window}function Bt(e){return e?e.ownerDocument||e:document}function Vt(e){return e.tagName===`IFRAME`}var Ht=(e=>(e.Escape=`Escape`,e.Enter=`Enter`,e.Tab=`Tab`,e.Space=` `,e.ArrowDown=`ArrowDown`,e.ArrowLeft=`ArrowLeft`,e.ArrowRight=`ArrowRight`,e.ArrowUp=`ArrowUp`,e.End=`End`,e.Home=`Home`,e.PageDown=`PageDown`,e.PageUp=`PageUp`,e))(Ht||{});function Ut(e){return typeof window<`u`&&window.navigator!=null&&e.test(window.navigator.userAgentData?.platform||window.navigator.platform)}function Wt(){return Ut(/^Mac/i)}function Gt(){return Ut(/^iPhone/i)}function Kt(){return Ut(/^iPad/i)||Wt()&&navigator.maxTouchPoints>1}function qt(){return Gt()||Kt()}function Jt(){return Wt()||qt()}function q(e,t){return t&&(Ft(t)?t(e):t[0](t[1],e)),e?.defaultPrevented}function J(e){return t=>{for(let n of e)q(t,n)}}function Yt(e){return Wt()?e.metaKey&&!e.ctrlKey:e.ctrlKey&&!e.metaKey}function Xt(e){if(e){if(Qt())e.focus({preventScroll:!0});else{let t=$t(e);e.focus(),en(t)}}}var Zt=null;function Qt(){if(Zt==null){Zt=!1;try{document.createElement(`div`).focus({get preventScroll(){return Zt=!0,!0}})}catch{}}return Zt}function $t(e){let t=e.parentNode,n=[],r=document.scrollingElement||document.documentElement;for(;t instanceof HTMLElement&&t!==r;)(t.offsetHeight<t.scrollHeight||t.offsetWidth<t.scrollWidth)&&n.push({element:t,scrollTop:t.scrollTop,scrollLeft:t.scrollLeft}),t=t.parentNode;return r instanceof HTMLElement&&n.push({element:r,scrollTop:r.scrollTop,scrollLeft:r.scrollLeft}),n}function en(e){for(let{element:t,scrollTop:n,scrollLeft:r}of e)t.scrollTop=n,t.scrollLeft=r}var tn=[`input:not([type='hidden']):not([disabled])`,`select:not([disabled])`,`textarea:not([disabled])`,`button:not([disabled])`,`a[href]`,`area[href]`,`[tabindex]`,`iframe`,`object`,`embed`,`audio[controls]`,`video[controls]`,`[contenteditable]:not([contenteditable='false'])`],nn=[...tn,`[tabindex]:not([tabindex="-1"]):not([disabled])`],rn=`${tn.join(`:not([hidden]),`)},[tabindex]:not([disabled]):not([hidden])`,an=nn.join(`:not([hidden]):not([tabindex="-1"]),`);function on(e,t){let n=Array.from(e.querySelectorAll(rn)).filter(sn);return t&&sn(e)&&n.unshift(e),n.forEach((e,t)=>{if(Vt(e)&&e.contentDocument){let r=e.contentDocument.body,i=on(r,!1);n.splice(t,1,...i)}}),n}function sn(e){return cn(e)&&!ln(e)}function cn(e){return e.matches(rn)&&un(e)}function ln(e){return Number.parseInt(e.getAttribute(`tabindex`)||`0`,10)<0}function un(e,t){return e.nodeName!==`#comment`&&dn(e)&&fn(e,t)&&(!e.parentElement||un(e.parentElement,e))}function dn(e){if(!(e instanceof HTMLElement)&&!(e instanceof SVGElement))return!1;let{display:t,visibility:n}=e.style,r=t!==`none`&&n!==`hidden`&&n!==`collapse`;if(r){if(!e.ownerDocument.defaultView)return r;let{getComputedStyle:t}=e.ownerDocument.defaultView,{display:n,visibility:i}=t(e);r=n!==`none`&&i!==`hidden`&&i!==`collapse`}return r}function fn(e,t){return!e.hasAttribute(`hidden`)&&(e.nodeName===`DETAILS`&&t&&t.nodeName!==`SUMMARY`?e.hasAttribute(`open`):!0)}function pn(e,t,n){let r=t?.tabbable?an:rn,i=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode(e){return t?.from?.contains(e)?NodeFilter.FILTER_REJECT:e.matches(r)&&un(e)&&(!t?.accept||t.accept(e))?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}});return t?.from&&(i.currentNode=t.from),i}function mn(e){let t=e;for(;t&&!hn(t);)t=t.parentElement;return t||document.scrollingElement||document.documentElement}function hn(e){let t=window.getComputedStyle(e);return/(auto|scroll)/.test(t.overflow+t.overflowX+t.overflowY)}function gn(){}function _n(e,t){let[n,r]=e,i=!1,a=t.length;for(let e=a,o=0,s=e-1;o<e;s=o++){let[a,c]=t[o],[l,u]=t[s],[,d]=t[s===0?e-1:s-1]||[0,0],f=(c-u)*(n-a)-(a-l)*(r-c);if(u<c){if(r>=u&&r<c){if(f===0)return!0;f>0&&(r===u?r>d&&(i=!i):i=!i)}}else if(c<u){if(r>c&&r<=u){if(f===0)return!0;f<0&&(r===u?r<d&&(i=!i):i=!i)}}else if(r===c&&(n>=l&&n<=a||n>=a&&n<=l))return!0}return i}function Y(e,t){return i(e,t)}var vn=new Map,yn=new Set;function bn(){if(typeof window>`u`)return;let e=e=>{if(!e.target)return;let n=vn.get(e.target);n||(n=new Set,vn.set(e.target,n),e.target.addEventListener(`transitioncancel`,t)),n.add(e.propertyName)},t=e=>{if(!e.target)return;let n=vn.get(e.target);if(n&&(n.delete(e.propertyName),n.size===0&&(e.target.removeEventListener(`transitioncancel`,t),vn.delete(e.target)),vn.size===0)){for(let e of yn)e();yn.clear()}};document.body.addEventListener(`transitionrun`,e),document.body.addEventListener(`transitionend`,t)}typeof document<`u`&&(document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,bn):bn());function xn(e,t){let n=Sn(e,t,`left`),r=Sn(e,t,`top`),i=t.offsetWidth,a=t.offsetHeight,o=e.scrollLeft,s=e.scrollTop,c=o+e.offsetWidth,l=s+e.offsetHeight;n<=o?o=n:n+i>c&&(o+=n+i-c),r<=s?s=r:r+a>l&&(s+=r+a-l),e.scrollLeft=o,e.scrollTop=s}function Sn(e,t,n){let r=n===`left`?`offsetLeft`:`offsetTop`,i=0;for(;t.offsetParent&&(i+=t[r],t.offsetParent!==e);){if(t.offsetParent.contains(e)){i-=e[r];break}t=t.offsetParent}return i}function Cn(e,t){if(document.contains(e)){let t=document.scrollingElement||document.documentElement;if(window.getComputedStyle(t).overflow!==`hidden`){let{left:t,top:n}=e.getBoundingClientRect();e?.scrollIntoView?.({block:`nearest`});let{left:r,top:i}=e.getBoundingClientRect();(Math.abs(t-r)>1||Math.abs(n-i)>1)&&e.scrollIntoView?.({block:`nearest`})}else{let n=mn(e);for(;e&&n&&e!==t&&n!==t;)xn(n,e),e=n,n=mn(e)}}}var wn={border:`0`,clip:`rect(0 0 0 0)`,"clip-path":`inset(50%)`,height:`1px`,margin:`0 -1px -1px 0`,overflow:`hidden`,padding:`0`,position:`absolute`,width:`1px`,"white-space":`nowrap`};function Tn(e,t){let[n,r]=I(En(t?.()));return N(()=>{r(e()?.tagName.toLowerCase()||En(t?.()))}),n}function En(e){return Pt(e)?e:void 0}function X(e){let[t,n]=c(e,[`as`]);if(!t.as)throw Error("[kobalte]: Polymorphic is missing the required `as` prop.");return F(l,i(n,{get component(){return t.as}}))}var Dn=Object.defineProperty,On=(e,t)=>{for(var n in t)Dn(e,n,{get:t[n],enumerable:!0})};On({},{Button:()=>Mn,Root:()=>jn});var kn=[`button`,`color`,`file`,`image`,`reset`,`submit`];function An(e){let t=e.tagName.toLowerCase();return t===`button`?!0:t===`input`&&e.type?kn.indexOf(e.type)!==-1:!1}function jn(e){let t,n=Y({type:`button`},e),[r,a]=c(n,[`ref`,`type`,`disabled`]),o=Tn(()=>t,()=>`button`),s=R(()=>{let e=o();return e!=null&&An({tagName:e,type:r.type})}),l=R(()=>o()===`input`),u=R(()=>o()===`a`&&t?.getAttribute(`href`)!=null);return F(X,i({as:`button`,ref(e){let n=dt(e=>t=e,r.ref);typeof n==`function`&&n(e)},get type(){return s()||l()?r.type:void 0},get role(){return!s()&&!u()?`button`:void 0},get tabIndex(){return!s()&&!u()&&!r.disabled?0:void 0},get disabled(){return s()||l()?r.disabled:void 0},get"aria-disabled"(){return!s()&&!l()&&r.disabled?!0:void 0},get"data-disabled"(){return r.disabled?``:void 0}},a))}var Mn=jn;function Nn(e){let[t,r]=I(e.defaultValue?.()),i=R(()=>e.value?.()!==void 0),a=R(()=>i()?e.value?.():t());return[a,t=>{n(()=>{let n=pe(t,a());return Object.is(n,a())||(i()||r(n),e.onChange?.(n)),n})}]}function Pn(e){let[t,n]=Nn(e);return[()=>t()??!1,n]}function Fn(e){let[t,n]=Nn(e);return[()=>t()??[],n]}function In(e={}){let[t,n]=Pn({value:()=>V(e.isSelected),defaultValue:()=>!!V(e.defaultIsSelected),onChange:t=>e.onSelectedChange?.(t)});return{isSelected:t,setIsSelected:t=>{!V(e.isReadOnly)&&!V(e.isDisabled)&&n(t)},toggle:()=>{!V(e.isReadOnly)&&!V(e.isDisabled)&&n(!t())}}}function Ln(e){let t=e.startIndex??0,n=e.startLevel??0,r=[],i=t=>{if(t==null)return``;let n=e.getKey??`key`,r=Pt(n)?t[n]:n(t);return r==null?``:String(r)},a=t=>{if(t==null)return``;let n=e.getTextValue??`textValue`,r=Pt(n)?t[n]:n(t);return r==null?``:String(r)},o=t=>{if(t==null)return!1;let n=e.getDisabled??`disabled`;return(Pt(n)?t[n]:n(t))??!1},s=t=>{if(t!=null)return Pt(e.getSectionChildren)?t[e.getSectionChildren]:e.getSectionChildren?.(t)};for(let c of e.dataSource)if(Pt(c)||Nt(c))r.push({type:`item`,rawValue:c,key:String(c),textValue:String(c),disabled:o(c),level:n,index:t}),t++;else if(s(c)!=null){r.push({type:`section`,rawValue:c,key:``,textValue:``,disabled:!1,level:n,index:t}),t++;let i=s(c)??[];if(i.length>0){let a=Ln({dataSource:i,getKey:e.getKey,getTextValue:e.getTextValue,getDisabled:e.getDisabled,getSectionChildren:e.getSectionChildren,startIndex:t,startLevel:n+1});r.push(...a),t+=a.length}}else r.push({type:`item`,rawValue:c,key:i(c),textValue:a(c),disabled:o(c),level:n,index:t}),t++;return r}function Rn(e,t=[]){return R(()=>{let n=Ln({dataSource:V(e.dataSource),getKey:V(e.getKey),getTextValue:V(e.getTextValue),getDisabled:V(e.getDisabled),getSectionChildren:V(e.getSectionChildren)});for(let e=0;e<t.length;e++)t[e]();return e.factory(n)})}var zn=new Set([`Avst`,`Arab`,`Armi`,`Syrc`,`Samr`,`Mand`,`Thaa`,`Mend`,`Nkoo`,`Adlm`,`Rohg`,`Hebr`]),Bn=new Set([`ae`,`ar`,`arc`,`bcc`,`bqi`,`ckb`,`dv`,`fa`,`glk`,`he`,`ku`,`mzn`,`nqo`,`pnb`,`ps`,`sd`,`ug`,`ur`,`yi`]);function Vn(e){if(Intl.Locale){let t=new Intl.Locale(e).maximize().script??``;return zn.has(t)}let t=e.split(`-`)[0];return Bn.has(t)}function Hn(e){return Vn(e)?`rtl`:`ltr`}function Un(){let e=typeof navigator<`u`&&(navigator.language||navigator.userLanguage)||`en-US`;return{locale:e,direction:Hn(e)}}var Wn=Un(),Gn=new Set;function Kn(){Wn=Un();for(let e of Gn)e(Wn)}function qn(){let[e,n]=I(Wn),r=R(()=>e());return ne(()=>{Gn.size===0&&window.addEventListener(`languagechange`,Kn),Gn.add(n),t(()=>{Gn.delete(n),Gn.size===0&&window.removeEventListener(`languagechange`,Kn)})}),{locale:()=>r().locale,direction:()=>r().direction}}var Jn=D();function Yn(){let e=qn();return y(Jn)||e}var Xn=new Map;function Zn(e){let{locale:t}=Yn(),n=R(()=>t()+(e?Object.entries(e).sort((e,t)=>e[0]<t[0]?-1:1).join():``));return R(()=>{let r=n(),i;return Xn.has(r)&&(i=Xn.get(r)),i||(i=new Intl.Collator(t(),e),Xn.set(r,i)),i})}var Qn=class e extends Set{anchorKey;currentKey;constructor(t,n,r){super(t),t instanceof e?(this.anchorKey=n||t.anchorKey,this.currentKey=r||t.currentKey):(this.anchorKey=n,this.currentKey=r)}};function $n(e){let[t,n]=Nn(e);return[()=>t()??new Qn,n]}function er(e){return Jt()?e.altKey:e.ctrlKey}function tr(e){return Wt()?e.metaKey:e.ctrlKey}function nr(e){return new Qn(e)}function rr(e,t){if(e.size!==t.size)return!1;for(let n of e)if(!t.has(n))return!1;return!0}function ir(e){let t=Y({selectionMode:`none`,selectionBehavior:`toggle`},e),[n,r]=I(!1),[i,a]=I(),[o,s]=$n({value:R(()=>{let e=V(t.selectedKeys);return e==null?e:nr(e)}),defaultValue:R(()=>{let e=V(t.defaultSelectedKeys);return e==null?new Qn:nr(e)}),onChange:e=>t.onSelectionChange?.(e)}),[c,l]=I(V(t.selectionBehavior));return N(()=>{let e=o();V(t.selectionBehavior)===`replace`&&c()===`toggle`&&typeof e==`object`&&e.size===0&&l(`replace`)}),N(()=>{l(V(t.selectionBehavior)??`toggle`)}),{selectionMode:()=>V(t.selectionMode),disallowEmptySelection:()=>V(t.disallowEmptySelection)??!1,selectionBehavior:c,setSelectionBehavior:l,isFocused:n,setFocused:r,focusedKey:i,setFocusedKey:a,selectedKeys:o,setSelectedKeys:e=>{(V(t.allowDuplicateSelectionEvents)||!rr(e,o()))&&s(e)}}}function ar(e){let[t,n]=I(``),[r,i]=I(-1);return{typeSelectHandlers:{onKeyDown:a=>{if(V(e.isDisabled))return;let o=V(e.keyboardDelegate),s=V(e.selectionManager);if(!o.getKeyForSearch)return;let c=or(a.key);if(!c||a.ctrlKey||a.metaKey)return;c===` `&&t().trim().length>0&&(a.preventDefault(),a.stopPropagation());let l=n(e=>e+c),u=o.getKeyForSearch(l,s.focusedKey())??o.getKeyForSearch(l);u==null&&sr(l)&&(l=l[0],u=o.getKeyForSearch(l,s.focusedKey())??o.getKeyForSearch(l)),u!=null&&(s.setFocusedKey(u),e.onTypeSelect?.(u)),clearTimeout(r()),i(window.setTimeout(()=>n(``),500))}}}}function or(e){return e.length===1||!/^[A-Z]/i.test(e)?e:``}function sr(e){return e.split(``).every(t=>t===e[0])}function cr(e,t,n){let r=i({selectOnFocus:()=>V(e.selectionManager).selectionBehavior()===`replace`},e),a=()=>t(),{direction:o}=Yn(),s={top:0,left:0};Tt(()=>V(r.isVirtualized)?void 0:a(),`scroll`,()=>{let e=a();e&&(s={top:e.scrollTop,left:e.scrollLeft})});let{typeSelectHandlers:c}=ar({isDisabled:()=>V(r.disallowTypeAhead),keyboardDelegate:()=>V(r.keyboardDelegate),selectionManager:()=>V(r.selectionManager)}),l=()=>V(r.orientation)??`vertical`,u=e=>{q(e,c.onKeyDown),e.altKey&&e.key===`Tab`&&e.preventDefault();let n=t();if(!n?.contains(e.target))return;let i=V(r.selectionManager),a=V(r.selectOnFocus),s=t=>{t!=null&&(i.setFocusedKey(t),e.shiftKey&&i.selectionMode()===`multiple`?i.extendSelection(t):a&&!er(e)&&i.replaceSelection(t))},u=V(r.keyboardDelegate),d=V(r.shouldFocusWrap),f=i.focusedKey();switch(e.key){case l()===`vertical`?`ArrowDown`:`ArrowRight`:if(u.getKeyBelow){e.preventDefault();let t;t=f==null?u.getFirstKey?.():u.getKeyBelow(f),t==null&&d&&(t=u.getFirstKey?.(f)),s(t)}break;case l()===`vertical`?`ArrowUp`:`ArrowLeft`:if(u.getKeyAbove){e.preventDefault();let t;t=f==null?u.getLastKey?.():u.getKeyAbove(f),t==null&&d&&(t=u.getLastKey?.(f)),s(t)}break;case l()===`vertical`?`ArrowLeft`:`ArrowUp`:if(u.getKeyLeftOf){e.preventDefault();let t=o()===`rtl`,n;n=f==null?t?u.getFirstKey?.():u.getLastKey?.():u.getKeyLeftOf(f),s(n)}break;case l()===`vertical`?`ArrowRight`:`ArrowDown`:if(u.getKeyRightOf){e.preventDefault();let t=o()===`rtl`,n;n=f==null?t?u.getLastKey?.():u.getFirstKey?.():u.getKeyRightOf(f),s(n)}break;case`Home`:if(u.getFirstKey){e.preventDefault();let t=u.getFirstKey(f,tr(e));t!=null&&(i.setFocusedKey(t),tr(e)&&e.shiftKey&&i.selectionMode()===`multiple`?i.extendSelection(t):a&&i.replaceSelection(t))}break;case`End`:if(u.getLastKey){e.preventDefault();let t=u.getLastKey(f,tr(e));t!=null&&(i.setFocusedKey(t),tr(e)&&e.shiftKey&&i.selectionMode()===`multiple`?i.extendSelection(t):a&&i.replaceSelection(t))}break;case`PageDown`:u.getKeyPageBelow&&f!=null&&(e.preventDefault(),s(u.getKeyPageBelow(f)));break;case`PageUp`:u.getKeyPageAbove&&f!=null&&(e.preventDefault(),s(u.getKeyPageAbove(f)));break;case`a`:tr(e)&&i.selectionMode()===`multiple`&&V(r.disallowSelectAll)!==!0&&(e.preventDefault(),i.selectAll());break;case`Escape`:e.defaultPrevented||(e.preventDefault(),V(r.disallowEmptySelection)||i.clearSelection());break;case`Tab`:if(!V(r.allowsTabNavigation)){if(e.shiftKey)n.focus();else{let e=pn(n,{tabbable:!0}),t,r;do r=e.lastChild(),r&&(t=r);while(r);t&&!t.contains(document.activeElement)&&Xt(t)}break}}},d=e=>{let t=V(r.selectionManager),n=V(r.keyboardDelegate),i=V(r.selectOnFocus);if(t.isFocused())e.currentTarget.contains(e.target)||t.setFocused(!1);else if(e.currentTarget.contains(e.target)){if(t.setFocused(!0),t.focusedKey()==null){let r=e=>{e!=null&&(t.setFocusedKey(e),i&&t.replaceSelection(e))},a=e.relatedTarget;a&&e.currentTarget.compareDocumentPosition(a)&Node.DOCUMENT_POSITION_FOLLOWING?r(t.lastSelectedKey()??n.getLastKey?.()):r(t.firstSelectedKey()??n.getFirstKey?.())}else if(!V(r.isVirtualized)){let e=a();if(e){e.scrollTop=s.top,e.scrollLeft=s.left;let n=e.querySelector(`[data-key="${t.focusedKey()}"]`);n&&(Xt(n),xn(e,n))}}}},f=e=>{let t=V(r.selectionManager);e.currentTarget.contains(e.relatedTarget)||t.setFocused(!1)},p=e=>{a()===e.target&&e.preventDefault()},m=()=>{let e=V(r.autoFocus);if(!e)return;let n=V(r.selectionManager),i=V(r.keyboardDelegate),a;e===`first`&&(a=i.getFirstKey?.()),e===`last`&&(a=i.getLastKey?.());let o=n.selectedKeys();o.size&&(a=o.values().next().value),n.setFocused(!0),n.setFocusedKey(a);let s=t();s&&a==null&&!V(r.shouldUseVirtualFocus)&&Xt(s)};return ne(()=>{r.deferAutoFocus?setTimeout(m,0):m()}),N(M([a,()=>V(r.isVirtualized),()=>V(r.selectionManager).focusedKey()],e=>{let[t,n,i]=e;if(n)i&&r.scrollToKey?.(i);else if(i&&t){let e=t.querySelector(`[data-key="${i}"]`);e&&xn(t,e)}})),{tabIndex:R(()=>{if(!V(r.shouldUseVirtualFocus))return V(r.selectionManager).focusedKey()==null?0:-1}),onKeyDown:u,onMouseDown:p,onFocusIn:d,onFocusOut:f}}function lr(e,t){let n=()=>V(e.selectionManager),r=()=>V(e.key),i=()=>V(e.shouldUseVirtualFocus),a=e=>{n().selectionMode()!==`none`&&(n().selectionMode()===`single`?n().isSelected(r())&&!n().disallowEmptySelection()?n().toggleSelection(r()):n().replaceSelection(r()):e?.shiftKey?n().extendSelection(r()):n().selectionBehavior()===`toggle`||tr(e)||`pointerType`in e&&e.pointerType===`touch`?n().toggleSelection(r()):n().replaceSelection(r()))},o=()=>n().isSelected(r()),s=()=>V(e.disabled)||n().isDisabled(r()),c=()=>!s()&&n().canSelectItem(r()),l=null,u=t=>{c()&&(l=t.pointerType,t.pointerType===`mouse`&&t.button===0&&!V(e.shouldSelectOnPressUp)&&a(t))},d=t=>{c()&&t.pointerType===`mouse`&&t.button===0&&V(e.shouldSelectOnPressUp)&&V(e.allowsDifferentPressOrigin)&&a(t)},f=t=>{c()&&(V(e.shouldSelectOnPressUp)&&!V(e.allowsDifferentPressOrigin)||l!==`mouse`)&&a(t)},p=e=>{c()&&[`Enter`,` `].includes(e.key)&&(er(e)?n().toggleSelection(r()):a(e))},m=e=>{s()&&e.preventDefault()},h=e=>{let a=t();i()||s()||!a||e.target===a&&n().setFocusedKey(r())},g=R(()=>{if(!(i()||s()))return r()===n().focusedKey()?0:-1}),_=R(()=>V(e.virtualized)?void 0:r());return N(M([t,r,i,()=>n().focusedKey(),()=>n().isFocused()],([t,n,r,i,a])=>{t&&n===i&&a&&!r&&document.activeElement!==t&&(e.focus?e.focus():Xt(t))})),{isSelected:o,isDisabled:s,allowsSelection:c,tabIndex:g,dataKey:_,onPointerDown:u,onPointerUp:d,onClick:f,onKeyDown:p,onMouseDown:m,onFocus:h}}var ur=class{collection;state;constructor(e,t){this.collection=e,this.state=t}selectionMode(){return this.state.selectionMode()}disallowEmptySelection(){return this.state.disallowEmptySelection()}selectionBehavior(){return this.state.selectionBehavior()}setSelectionBehavior(e){this.state.setSelectionBehavior(e)}isFocused(){return this.state.isFocused()}setFocused(e){this.state.setFocused(e)}focusedKey(){return this.state.focusedKey()}setFocusedKey(e){(e==null||this.collection().getItem(e))&&this.state.setFocusedKey(e)}selectedKeys(){return this.state.selectedKeys()}isSelected(e){if(this.state.selectionMode()===`none`)return!1;let t=this.getKey(e);return t!=null&&this.state.selectedKeys().has(t)}isEmpty(){return this.state.selectedKeys().size===0}isSelectAll(){if(this.isEmpty())return!1;let e=this.state.selectedKeys();return this.getAllSelectableKeys().every(t=>e.has(t))}firstSelectedKey(){let e;for(let t of this.state.selectedKeys()){let n=this.collection().getItem(t),r=n?.index!=null&&e?.index!=null&&n.index<e.index;(!e||r)&&(e=n)}return e?.key}lastSelectedKey(){let e;for(let t of this.state.selectedKeys()){let n=this.collection().getItem(t),r=n?.index!=null&&e?.index!=null&&n.index>e.index;(!e||r)&&(e=n)}return e?.key}extendSelection(e){if(this.selectionMode()===`none`)return;if(this.selectionMode()===`single`){this.replaceSelection(e);return}let t=this.getKey(e);if(t==null)return;let n=this.state.selectedKeys(),r=n.anchorKey||t,i=new Qn(n,r,t);for(let e of this.getKeyRange(r,n.currentKey||t))i.delete(e);for(let e of this.getKeyRange(t,r))this.canSelectItem(e)&&i.add(e);this.state.setSelectedKeys(i)}getKeyRange(e,t){let n=this.collection().getItem(e),r=this.collection().getItem(t);return n&&r?n.index!=null&&r.index!=null&&n.index<=r.index?this.getKeyRangeInternal(e,t):this.getKeyRangeInternal(t,e):[]}getKeyRangeInternal(e,t){let n=[],r=e;for(;r!=null;){let e=this.collection().getItem(r);if(e&&e.type===`item`&&n.push(r),r===t)return n;r=this.collection().getKeyAfter(r)}return[]}getKey(e){let t=this.collection().getItem(e);return t?!t||t.type!==`item`?null:t.key:e}toggleSelection(e){if(this.selectionMode()===`none`)return;if(this.selectionMode()===`single`&&!this.isSelected(e)){this.replaceSelection(e);return}let t=this.getKey(e);if(t==null)return;let n=new Qn(this.state.selectedKeys());n.has(t)?n.delete(t):this.canSelectItem(t)&&(n.add(t),n.anchorKey=t,n.currentKey=t),this.disallowEmptySelection()&&n.size===0||this.state.setSelectedKeys(n)}replaceSelection(e){if(this.selectionMode()===`none`)return;let t=this.getKey(e);if(t==null)return;let n=this.canSelectItem(t)?new Qn([t],t,t):new Qn;this.state.setSelectedKeys(n)}setSelectedKeys(e){if(this.selectionMode()===`none`)return;let t=new Qn;for(let n of e){let e=this.getKey(n);if(e!=null&&(t.add(e),this.selectionMode()===`single`))break}this.state.setSelectedKeys(t)}selectAll(){this.selectionMode()===`multiple`&&this.state.setSelectedKeys(new Set(this.getAllSelectableKeys()))}clearSelection(){let e=this.state.selectedKeys();!this.disallowEmptySelection()&&e.size>0&&this.state.setSelectedKeys(new Qn)}toggleSelectAll(){this.isSelectAll()?this.clearSelection():this.selectAll()}select(e,t){this.selectionMode()!==`none`&&(this.selectionMode()===`single`?this.isSelected(e)&&!this.disallowEmptySelection()?this.toggleSelection(e):this.replaceSelection(e):this.selectionBehavior()===`toggle`||t&&t.pointerType===`touch`?this.toggleSelection(e):this.replaceSelection(e))}isSelectionEqual(e){if(e===this.state.selectedKeys())return!0;let t=this.selectedKeys();if(e.size!==t.size)return!1;for(let n of e)if(!t.has(n))return!1;for(let n of t)if(!e.has(n))return!1;return!0}canSelectItem(e){if(this.state.selectionMode()===`none`)return!1;let t=this.collection().getItem(e);return t!=null&&!t.disabled}isDisabled(e){let t=this.collection().getItem(e);return!t||t.disabled}getAllSelectableKeys(){let e=[];return(t=>{for(;t!=null;){if(this.canSelectItem(t)){let n=this.collection().getItem(t);if(!n)continue;n.type===`item`&&e.push(t)}t=this.collection().getKeyAfter(t)}})(this.collection().getFirstKey()),e}},dr=class{keyMap=new Map;iterable;firstKey;lastKey;constructor(e){this.iterable=e;for(let t of e)this.keyMap.set(t.key,t);if(this.keyMap.size===0)return;let t,n=0;for(let[e,r]of this.keyMap)t?(t.nextKey=e,r.prevKey=t.key):(this.firstKey=e,r.prevKey=void 0),r.type===`item`&&(r.index=n++),t=r,t.nextKey=void 0;this.lastKey=t.key}*[Symbol.iterator](){yield*this.iterable}getSize(){return this.keyMap.size}getKeys(){return this.keyMap.keys()}getKeyBefore(e){return this.keyMap.get(e)?.prevKey}getKeyAfter(e){return this.keyMap.get(e)?.nextKey}getFirstKey(){return this.firstKey}getLastKey(){return this.lastKey}getItem(e){return this.keyMap.get(e)}at(e){let t=[...this.getKeys()];return this.getItem(t[e])}};function fr(e){let t=ir(e),n=Rn({dataSource:()=>V(e.dataSource),getKey:()=>V(e.getKey),getTextValue:()=>V(e.getTextValue),getDisabled:()=>V(e.getDisabled),getSectionChildren:()=>V(e.getSectionChildren),factory:t=>e.filter?new dr(e.filter(t)):new dr(t)},[()=>e.filter]),r=new ur(n,t);return ae(()=>{let e=t.focusedKey();e!=null&&!n().getItem(e)&&t.setFocusedKey(void 0)}),{collection:n,selectionManager:()=>r}}var pr=D();function mr(){return y(pr)}function hr(){let e=mr();if(e===void 0)throw Error("[kobalte]: `useDomCollectionContext` must be used within a `DomCollectionProvider` component");return e}function gr(e,t){return!!(t.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_PRECEDING)}function _r(e,t){let n=t.ref();if(!n)return-1;let r=e.length;if(!r)return-1;for(;r--;){let t=e[r]?.ref();if(t&&gr(t,n))return r+1}return 0}function vr(e){let t=e.map((e,t)=>[t,e]),n=!1;return t.sort(([e,t],[r,i])=>{let a=t.ref(),o=i.ref();return a===o||!a||!o?0:gr(a,o)?(e>r&&(n=!0),-1):(e<r&&(n=!0),1)}),n?t.map(([e,t])=>t):e}function yr(e,t){let n=vr(e);e!==n&&t(n)}function br(e){let t=e[0],n=e[e.length-1]?.ref(),r=t?.ref()?.parentElement;for(;r;){if(n&&r.contains(n))return r;r=r.parentElement}return Bt(r).body}function xr(e,n){N(()=>{let r=setTimeout(()=>{yr(e(),n)});t(()=>clearTimeout(r))})}function Sr(e,n){if(typeof IntersectionObserver!=`function`){xr(e,n);return}let r=[];N(()=>{let i=()=>{let t=!!r.length;r=e(),t&&yr(e(),n)},a=br(e()),o=new IntersectionObserver(i,{root:a});for(let t of e()){let e=t.ref();e&&o.observe(e)}t(()=>o.disconnect())})}function Cr(e={}){let[t,n]=Fn({value:()=>V(e.items),onChange:t=>e.onItemsChange?.(t)});Sr(t,n);let r=e=>(n(t=>jt(t,e,_r(t,e))),()=>{n(t=>{let n=t.filter(t=>t.ref()!==e.ref());return t.length===n.length?t:n})});return{DomCollectionProvider:e=>F(pr.Provider,{value:{registerItem:r},get children(){return e.children}})}}function wr(e){let n=hr(),r=Y({shouldRegisterItem:!0},e);N(()=>{if(!r.shouldRegisterItem)return;let e=n.registerItem(r.getItem());t(e)})}var Tr=[`top`,`right`,`bottom`,`left`],Er=Math.min,Dr=Math.max,Or=Math.round,kr=Math.floor,Ar=e=>({x:e,y:e}),jr={left:`right`,right:`left`,bottom:`top`,top:`bottom`};function Mr(e,t,n){return Dr(e,Er(t,n))}function Nr(e,t){return typeof e==`function`?e(t):e}function Pr(e){return e.split(`-`)[0]}function Fr(e){return e.split(`-`)[1]}function Ir(e){return e===`x`?`y`:`x`}function Lr(e){return e===`y`?`height`:`width`}function Rr(e){let t=e[0];return t===`t`||t===`b`?`y`:`x`}function zr(e){return Ir(Rr(e))}function Br(e,t,n){n===void 0&&(n=!1);let r=Fr(e),i=zr(e),a=Lr(i),o=i===`x`?r===(n?`end`:`start`)?`right`:`left`:r===`start`?`bottom`:`top`;return t.reference[a]>t.floating[a]&&(o=Yr(o)),[o,Yr(o)]}function Vr(e){let t=Yr(e);return[Hr(e),t,Hr(t)]}function Hr(e){return e.includes(`start`)?e.replace(`start`,`end`):e.replace(`end`,`start`)}var Ur=[`left`,`right`],Wr=[`right`,`left`],Gr=[`top`,`bottom`],Kr=[`bottom`,`top`];function qr(e,t,n){switch(e){case`top`:case`bottom`:return n?t?Wr:Ur:t?Ur:Wr;case`left`:case`right`:return t?Gr:Kr;default:return[]}}function Jr(e,t,n,r){let i=Fr(e),a=qr(Pr(e),n===`start`,r);return i&&(a=a.map(e=>e+`-`+i),t&&(a=a.concat(a.map(Hr)))),a}function Yr(e){let t=Pr(e);return jr[t]+e.slice(t.length)}function Xr(e){return{top:0,right:0,bottom:0,left:0,...e}}function Zr(e){return typeof e==`number`?{top:e,right:e,bottom:e,left:e}:Xr(e)}function Qr(e){let{x:t,y:n,width:r,height:i}=e;return{width:r,height:i,top:n,left:t,right:t+r,bottom:n+i,x:t,y:n}}function $r(e,t,n){let{reference:r,floating:i}=e,a=Rr(t),o=zr(t),s=Lr(o),c=Pr(t),l=a===`y`,u=r.x+r.width/2-i.width/2,d=r.y+r.height/2-i.height/2,f=r[s]/2-i[s]/2,p;switch(c){case`top`:p={x:u,y:r.y-i.height};break;case`bottom`:p={x:u,y:r.y+r.height};break;case`right`:p={x:r.x+r.width,y:d};break;case`left`:p={x:r.x-i.width,y:d};break;default:p={x:r.x,y:r.y}}switch(Fr(t)){case`start`:p[o]-=f*(n&&l?-1:1);break;case`end`:p[o]+=f*(n&&l?-1:1)}return p}async function ei(e,t){t===void 0&&(t={});let{x:n,y:r,platform:i,rects:a,elements:o,strategy:s}=e,{boundary:c=`clippingAncestors`,rootBoundary:l=`viewport`,elementContext:u=`floating`,altBoundary:d=!1,padding:f=0}=Nr(t,e),p=Zr(f),m=o[d?u===`floating`?`reference`:`floating`:u],h=Qr(await i.getClippingRect({element:await(i.isElement==null?void 0:i.isElement(m))??!0?m:m.contextElement||await(i.getDocumentElement==null?void 0:i.getDocumentElement(o.floating)),boundary:c,rootBoundary:l,strategy:s})),g=u===`floating`?{x:n,y:r,width:a.floating.width,height:a.floating.height}:a.reference,_=await(i.getOffsetParent==null?void 0:i.getOffsetParent(o.floating)),v=await(i.isElement==null?void 0:i.isElement(_))&&await(i.getScale==null?void 0:i.getScale(_))||{x:1,y:1},y=Qr(i.convertOffsetParentRelativeRectToViewportRelativeRect?await i.convertOffsetParentRelativeRectToViewportRelativeRect({elements:o,rect:g,offsetParent:_,strategy:s}):g);return{top:(h.top-y.top+p.top)/v.y,bottom:(y.bottom-h.bottom+p.bottom)/v.y,left:(h.left-y.left+p.left)/v.x,right:(y.right-h.right+p.right)/v.x}}var ti=50,ni=async(e,t,n)=>{let{placement:r=`bottom`,strategy:i=`absolute`,middleware:a=[],platform:o}=n,s=o.detectOverflow?o:{...o,detectOverflow:ei},c=await(o.isRTL==null?void 0:o.isRTL(t)),l=await o.getElementRects({reference:e,floating:t,strategy:i}),{x:u,y:d}=$r(l,r,c),f=r,p=0,m={};for(let n=0;n<a.length;n++){let h=a[n];if(!h)continue;let{name:g,fn:_}=h,{x:v,y,data:b,reset:x}=await _({x:u,y:d,initialPlacement:r,placement:f,strategy:i,middlewareData:m,rects:l,platform:s,elements:{reference:e,floating:t}});u=v??u,d=y??d,m[g]={...m[g],...b},x&&p<ti&&(p++,typeof x==`object`&&(x.placement&&(f=x.placement),x.rects&&(l=x.rects===!0?await o.getElementRects({reference:e,floating:t,strategy:i}):x.rects),{x:u,y:d}=$r(l,f,c)),n=-1)}return{x:u,y:d,placement:f,strategy:i,middlewareData:m}},ri=e=>({name:`arrow`,options:e,async fn(t){let{x:n,y:r,placement:i,rects:a,platform:o,elements:s,middlewareData:c}=t,{element:l,padding:u=0}=Nr(e,t)||{};if(l==null)return{};let d=Zr(u),f={x:n,y:r},p=zr(i),m=Lr(p),h=await o.getDimensions(l),g=p===`y`,_=g?`top`:`left`,v=g?`bottom`:`right`,y=g?`clientHeight`:`clientWidth`,b=a.reference[m]+a.reference[p]-f[p]-a.floating[m],x=f[p]-a.reference[p],S=await(o.getOffsetParent==null?void 0:o.getOffsetParent(l)),C=S?S[y]:0;C&&await(o.isElement==null?void 0:o.isElement(S))||(C=s.floating[y]||a.floating[m]);let w=b/2-x/2,T=C/2-h[m]/2-1,E=Er(d[_],T),D=Er(d[v],T),O=E,ee=C-h[m]-D,k=C/2-h[m]/2+w,te=Mr(O,k,ee),A=!c.arrow&&Fr(i)!=null&&k!==te&&a.reference[m]/2-(k<O?E:D)-h[m]/2<0,j=A?k<O?k-O:k-ee:0;return{[p]:f[p]+j,data:{[p]:te,centerOffset:k-te-j,...A&&{alignmentOffset:j}},reset:A}}}),ii=function(e){return e===void 0&&(e={}),{name:`flip`,options:e,async fn(t){var n;let{placement:r,middlewareData:i,rects:a,initialPlacement:o,platform:s,elements:c}=t,{mainAxis:l=!0,crossAxis:u=!0,fallbackPlacements:d,fallbackStrategy:f=`bestFit`,fallbackAxisSideDirection:p=`none`,flipAlignment:m=!0,...h}=Nr(e,t);if((n=i.arrow)!=null&&n.alignmentOffset)return{};let g=Pr(r),_=Rr(o),v=Pr(o)===o,y=await(s.isRTL==null?void 0:s.isRTL(c.floating)),b=d||(v||!m?[Yr(o)]:Vr(o)),x=p!==`none`;!d&&x&&b.push(...Jr(o,m,p,y));let S=[o,...b],C=await s.detectOverflow(t,h),w=[],T=i.flip?.overflows||[];if(l&&w.push(C[g]),u){let e=Br(r,a,y);w.push(C[e[0]],C[e[1]])}if(T=[...T,{placement:r,overflows:w}],!w.every(e=>e<=0)){let e=(i.flip?.index||0)+1,t=S[e];if(t&&(u!==`alignment`||_===Rr(t)||T.every(e=>Rr(e.placement)!==_||e.overflows[0]>0)))return{data:{index:e,overflows:T},reset:{placement:t}};let n=T.filter(e=>e.overflows[0]<=0).sort((e,t)=>e.overflows[1]-t.overflows[1])[0]?.placement;if(!n)switch(f){case`bestFit`:{let e=T.filter(e=>{if(x){let t=Rr(e.placement);return t===_||t===`y`}return!0}).map(e=>[e.placement,e.overflows.filter(e=>e>0).reduce((e,t)=>e+t,0)]).sort((e,t)=>e[1]-t[1])[0]?.[0];e&&(n=e);break}case`initialPlacement`:n=o}if(r!==n)return{reset:{placement:n}}}return{}}}};function ai(e,t){return{top:e.top-t.height,right:e.right-t.width,bottom:e.bottom-t.height,left:e.left-t.width}}function oi(e){return Tr.some(t=>e[t]>=0)}var si=function(e){return e===void 0&&(e={}),{name:`hide`,options:e,async fn(t){let{rects:n,platform:r}=t,{strategy:i=`referenceHidden`,...a}=Nr(e,t);switch(i){case`referenceHidden`:{let e=ai(await r.detectOverflow(t,{...a,elementContext:`reference`}),n.reference);return{data:{referenceHiddenOffsets:e,referenceHidden:oi(e)}}}case`escaped`:{let e=ai(await r.detectOverflow(t,{...a,altBoundary:!0}),n.floating);return{data:{escapedOffsets:e,escaped:oi(e)}}}default:return{}}}}},ci=new Set([`left`,`top`]);async function li(e,t){let{placement:n,platform:r,elements:i}=e,a=await(r.isRTL==null?void 0:r.isRTL(i.floating)),o=Pr(n),s=Fr(n),c=Rr(n)===`y`,l=ci.has(o)?-1:1,u=a&&c?-1:1,d=Nr(t,e),{mainAxis:f,crossAxis:p,alignmentAxis:m}=typeof d==`number`?{mainAxis:d,crossAxis:0,alignmentAxis:null}:{mainAxis:d.mainAxis||0,crossAxis:d.crossAxis||0,alignmentAxis:d.alignmentAxis};return s&&typeof m==`number`&&(p=s===`end`?m*-1:m),c?{x:p*u,y:f*l}:{x:f*l,y:p*u}}var ui=function(e){return e===void 0&&(e=0),{name:`offset`,options:e,async fn(t){var n;let{x:r,y:i,placement:a,middlewareData:o}=t,s=await li(t,e);return a===o.offset?.placement&&(n=o.arrow)!=null&&n.alignmentOffset?{}:{x:r+s.x,y:i+s.y,data:{...s,placement:a}}}}},di=function(e){return e===void 0&&(e={}),{name:`shift`,options:e,async fn(t){let{x:n,y:r,placement:i,platform:a}=t,{mainAxis:o=!0,crossAxis:s=!1,limiter:c={fn:e=>{let{x:t,y:n}=e;return{x:t,y:n}}},...l}=Nr(e,t),u={x:n,y:r},d=await a.detectOverflow(t,l),f=Rr(Pr(i)),p=Ir(f),m=u[p],h=u[f];if(o){let e=p===`y`?`top`:`left`,t=p===`y`?`bottom`:`right`,n=m+d[e],r=m-d[t];m=Mr(n,m,r)}if(s){let e=f===`y`?`top`:`left`,t=f===`y`?`bottom`:`right`,n=h+d[e],r=h-d[t];h=Mr(n,h,r)}let g=c.fn({...t,[p]:m,[f]:h});return{...g,data:{x:g.x-n,y:g.y-r,enabled:{[p]:o,[f]:s}}}}}},fi=function(e){return e===void 0&&(e={}),{name:`size`,options:e,async fn(t){var n,r;let{placement:i,rects:a,platform:o,elements:s}=t,{apply:c=()=>{},...l}=Nr(e,t),u=await o.detectOverflow(t,l),d=Pr(i),f=Fr(i),p=Rr(i)===`y`,{width:m,height:h}=a.floating,g,_;d===`top`||d===`bottom`?(g=d,_=f===(await(o.isRTL==null?void 0:o.isRTL(s.floating))?`start`:`end`)?`left`:`right`):(_=d,g=f===`end`?`top`:`bottom`);let v=h-u.top-u.bottom,y=m-u.left-u.right,b=Er(h-u[g],v),x=Er(m-u[_],y),S=!t.middlewareData.shift,C=b,w=x;if((n=t.middlewareData.shift)!=null&&n.enabled.x&&(w=y),(r=t.middlewareData.shift)!=null&&r.enabled.y&&(C=v),S&&!f){let e=Dr(u.left,0),t=Dr(u.right,0),n=Dr(u.top,0),r=Dr(u.bottom,0);p?w=m-2*(e!==0||t!==0?e+t:Dr(u.left,u.right)):C=h-2*(n!==0||r!==0?n+r:Dr(u.top,u.bottom))}await c({...t,availableWidth:w,availableHeight:C});let T=await o.getDimensions(s.floating);return m!==T.width||h!==T.height?{reset:{rects:!0}}:{}}}};function pi(){return typeof window<`u`}function mi(e){return _i(e)?(e.nodeName||``).toLowerCase():`#document`}function hi(e){var t;return(e==null||(t=e.ownerDocument)==null?void 0:t.defaultView)||window}function gi(e){return((_i(e)?e.ownerDocument:e.document)||window.document)?.documentElement}function _i(e){return pi()?e instanceof Node||e instanceof hi(e).Node:!1}function vi(e){return pi()?e instanceof Element||e instanceof hi(e).Element:!1}function yi(e){return pi()?e instanceof HTMLElement||e instanceof hi(e).HTMLElement:!1}function bi(e){return!pi()||typeof ShadowRoot>`u`?!1:e instanceof ShadowRoot||e instanceof hi(e).ShadowRoot}function xi(e){let{overflow:t,overflowX:n,overflowY:r,display:i}=Mi(e);return/auto|scroll|overlay|hidden|clip/.test(t+r+n)&&i!==`inline`&&i!==`contents`}function Si(e){return/^(table|td|th)$/.test(mi(e))}function Ci(e){try{if(e.matches(`:popover-open`))return!0}catch{}try{return e.matches(`:modal`)}catch{return!1}}var wi=/transform|translate|scale|rotate|perspective|filter/,Ti=/paint|layout|strict|content/,Ei=e=>!!e&&e!==`none`,Di;function Oi(e){let t=vi(e)?Mi(e):e;return Ei(t.transform)||Ei(t.translate)||Ei(t.scale)||Ei(t.rotate)||Ei(t.perspective)||!Ai()&&(Ei(t.backdropFilter)||Ei(t.filter))||wi.test(t.willChange||``)||Ti.test(t.contain||``)}function ki(e){let t=Pi(e);for(;yi(t)&&!ji(t);){if(Oi(t))return t;if(Ci(t))return null;t=Pi(t)}return null}function Ai(){return Di??=typeof CSS<`u`&&CSS.supports&&CSS.supports(`-webkit-backdrop-filter`,`none`),Di}function ji(e){return/^(html|body|#document)$/.test(mi(e))}function Mi(e){return hi(e).getComputedStyle(e)}function Ni(e){return vi(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:{scrollLeft:e.scrollX,scrollTop:e.scrollY}}function Pi(e){if(mi(e)===`html`)return e;let t=e.assignedSlot||e.parentNode||bi(e)&&e.host||gi(e);return bi(t)?t.host:t}function Fi(e){let t=Pi(e);return ji(t)?e.ownerDocument?e.ownerDocument.body:e.body:yi(t)&&xi(t)?t:Fi(t)}function Ii(e,t,n){t===void 0&&(t=[]),n===void 0&&(n=!0);let r=Fi(e),i=r===e.ownerDocument?.body,a=hi(r);if(i){let e=Li(a);return t.concat(a,a.visualViewport||[],xi(r)?r:[],e&&n?Ii(e):[])}return t.concat(r,Ii(r,[],n))}function Li(e){return e.parent&&Object.getPrototypeOf(e.parent)?e.frameElement:null}function Ri(e){let t=Mi(e),n=parseFloat(t.width)||0,r=parseFloat(t.height)||0,i=yi(e),a=i?e.offsetWidth:n,o=i?e.offsetHeight:r,s=Or(n)!==a||Or(r)!==o;return s&&(n=a,r=o),{width:n,height:r,$:s}}function zi(e){return vi(e)?e:e.contextElement}function Bi(e){let t=zi(e);if(!yi(t))return Ar(1);let n=t.getBoundingClientRect(),{width:r,height:i,$:a}=Ri(t),o=(a?Or(n.width):n.width)/r,s=(a?Or(n.height):n.height)/i;return o&&Number.isFinite(o)||(o=1),s&&Number.isFinite(s)||(s=1),{x:o,y:s}}var Vi=Ar(0);function Hi(e){let t=hi(e);return!Ai()||!t.visualViewport?Vi:{x:t.visualViewport.offsetLeft,y:t.visualViewport.offsetTop}}function Ui(e,t,n){return t===void 0&&(t=!1),!n||t&&n!==hi(e)?!1:t}function Wi(e,t,n,r){t===void 0&&(t=!1),n===void 0&&(n=!1);let i=e.getBoundingClientRect(),a=zi(e),o=Ar(1);t&&(r?vi(r)&&(o=Bi(r)):o=Bi(e));let s=Ui(a,n,r)?Hi(a):Ar(0),c=(i.left+s.x)/o.x,l=(i.top+s.y)/o.y,u=i.width/o.x,d=i.height/o.y;if(a){let e=hi(a),t=r&&vi(r)?hi(r):r,n=e,i=Li(n);for(;i&&r&&t!==n;){let e=Bi(i),t=i.getBoundingClientRect(),r=Mi(i),a=t.left+(i.clientLeft+parseFloat(r.paddingLeft))*e.x,o=t.top+(i.clientTop+parseFloat(r.paddingTop))*e.y;c*=e.x,l*=e.y,u*=e.x,d*=e.y,c+=a,l+=o,n=hi(i),i=Li(n)}}return Qr({width:u,height:d,x:c,y:l})}function Gi(e,t){let n=Ni(e).scrollLeft;return t?t.left+n:Wi(gi(e)).left+n}function Ki(e,t){let n=e.getBoundingClientRect();return{x:n.left+t.scrollLeft-Gi(e,n),y:n.top+t.scrollTop}}function qi(e){let{elements:t,rect:n,offsetParent:r,strategy:i}=e,a=i===`fixed`,o=gi(r),s=t?Ci(t.floating):!1;if(r===o||s&&a)return n;let c={scrollLeft:0,scrollTop:0},l=Ar(1),u=Ar(0),d=yi(r);if((d||!d&&!a)&&((mi(r)!==`body`||xi(o))&&(c=Ni(r)),d)){let e=Wi(r);l=Bi(r),u.x=e.x+r.clientLeft,u.y=e.y+r.clientTop}let f=o&&!d&&!a?Ki(o,c):Ar(0);return{width:n.width*l.x,height:n.height*l.y,x:n.x*l.x-c.scrollLeft*l.x+u.x+f.x,y:n.y*l.y-c.scrollTop*l.y+u.y+f.y}}function Ji(e){return Array.from(e.getClientRects())}function Yi(e){let t=gi(e),n=Ni(e),r=e.ownerDocument.body,i=Dr(t.scrollWidth,t.clientWidth,r.scrollWidth,r.clientWidth),a=Dr(t.scrollHeight,t.clientHeight,r.scrollHeight,r.clientHeight),o=-n.scrollLeft+Gi(e),s=-n.scrollTop;return Mi(r).direction===`rtl`&&(o+=Dr(t.clientWidth,r.clientWidth)-i),{width:i,height:a,x:o,y:s}}var Xi=25;function Zi(e,t){let n=hi(e),r=gi(e),i=n.visualViewport,a=r.clientWidth,o=r.clientHeight,s=0,c=0;if(i){a=i.width,o=i.height;let e=Ai();(!e||e&&t===`fixed`)&&(s=i.offsetLeft,c=i.offsetTop)}let l=Gi(r);if(l<=0){let e=r.ownerDocument,t=e.body,n=getComputedStyle(t),i=e.compatMode===`CSS1Compat`&&parseFloat(n.marginLeft)+parseFloat(n.marginRight)||0,o=Math.abs(r.clientWidth-t.clientWidth-i);o<=Xi&&(a-=o)}else l<=Xi&&(a+=l);return{width:a,height:o,x:s,y:c}}function Qi(e,t){let n=Wi(e,!0,t===`fixed`),r=n.top+e.clientTop,i=n.left+e.clientLeft,a=yi(e)?Bi(e):Ar(1);return{width:e.clientWidth*a.x,height:e.clientHeight*a.y,x:i*a.x,y:r*a.y}}function $i(e,t,n){let r;if(t===`viewport`)r=Zi(e,n);else if(t===`document`)r=Yi(gi(e));else if(vi(t))r=Qi(t,n);else{let n=Hi(e);r={x:t.x-n.x,y:t.y-n.y,width:t.width,height:t.height}}return Qr(r)}function ea(e,t){let n=Pi(e);return n===t||!vi(n)||ji(n)?!1:Mi(n).position===`fixed`||ea(n,t)}function ta(e,t){let n=t.get(e);if(n)return n;let r=Ii(e,[],!1).filter(e=>vi(e)&&mi(e)!==`body`),i=null,a=Mi(e).position===`fixed`,o=a?Pi(e):e;for(;vi(o)&&!ji(o);){let t=Mi(o),n=Oi(o);!n&&t.position===`fixed`&&(i=null),(a?!n&&!i:!n&&t.position===`static`&&i&&(i.position===`absolute`||i.position===`fixed`)||xi(o)&&!n&&ea(e,o))?r=r.filter(e=>e!==o):i=t,o=Pi(o)}return t.set(e,r),r}function na(e){let{element:t,boundary:n,rootBoundary:r,strategy:i}=e,a=[...n===`clippingAncestors`?Ci(t)?[]:ta(t,this._c):[].concat(n),r],o=$i(t,a[0],i),s=o.top,c=o.right,l=o.bottom,u=o.left;for(let e=1;e<a.length;e++){let n=$i(t,a[e],i);s=Dr(n.top,s),c=Er(n.right,c),l=Er(n.bottom,l),u=Dr(n.left,u)}return{width:c-u,height:l-s,x:u,y:s}}function ra(e){let{width:t,height:n}=Ri(e);return{width:t,height:n}}function ia(e,t,n){let r=yi(t),i=gi(t),a=n===`fixed`,o=Wi(e,!0,a,t),s={scrollLeft:0,scrollTop:0},c=Ar(0);function l(){c.x=Gi(i)}if(r||!r&&!a){if((mi(t)!==`body`||xi(i))&&(s=Ni(t)),r){let e=Wi(t,!0,a,t);c.x=e.x+t.clientLeft,c.y=e.y+t.clientTop}else i&&l()}a&&!r&&i&&l();let u=i&&!r&&!a?Ki(i,s):Ar(0);return{x:o.left+s.scrollLeft-c.x-u.x,y:o.top+s.scrollTop-c.y-u.y,width:o.width,height:o.height}}function aa(e){return Mi(e).position===`static`}function oa(e,t){if(!yi(e)||Mi(e).position===`fixed`)return null;if(t)return t(e);let n=e.offsetParent;return gi(e)===n&&(n=n.ownerDocument.body),n}function sa(e,t){let n=hi(e);if(Ci(e))return n;if(!yi(e)){let t=Pi(e);for(;t&&!ji(t);){if(vi(t)&&!aa(t))return t;t=Pi(t)}return n}let r=oa(e,t);for(;r&&Si(r)&&aa(r);)r=oa(r,t);return r&&ji(r)&&aa(r)&&!Oi(r)?n:r||ki(e)||n}var ca=async function(e){let t=this.getOffsetParent||sa,n=this.getDimensions,r=await n(e.floating);return{reference:ia(e.reference,await t(e.floating),e.strategy),floating:{x:0,y:0,width:r.width,height:r.height}}};function la(e){return Mi(e).direction===`rtl`}var ua={convertOffsetParentRelativeRectToViewportRelativeRect:qi,getDocumentElement:gi,getClippingRect:na,getOffsetParent:sa,getElementRects:ca,getClientRects:Ji,getDimensions:ra,getScale:Bi,isElement:vi,isRTL:la};function da(e,t){return e.x===t.x&&e.y===t.y&&e.width===t.width&&e.height===t.height}function fa(e,t){let n=null,r,i=gi(e);function a(){var e;clearTimeout(r),(e=n)==null||e.disconnect(),n=null}function o(s,c){s===void 0&&(s=!1),c===void 0&&(c=1),a();let l=e.getBoundingClientRect(),{left:u,top:d,width:f,height:p}=l;if(s||t(),!f||!p)return;let m=kr(d),h=kr(i.clientWidth-(u+f)),g=kr(i.clientHeight-(d+p)),_=kr(u),v={rootMargin:-m+`px `+-h+`px `+-g+`px `+-_+`px`,threshold:Dr(0,Er(1,c))||1},y=!0;function b(t){let n=t[0].intersectionRatio;if(n!==c){if(!y)return o();n?o(!1,n):r=setTimeout(()=>{o(!1,1e-7)},1e3)}n===1&&!da(l,e.getBoundingClientRect())&&o(),y=!1}try{n=new IntersectionObserver(b,{...v,root:i.ownerDocument})}catch{n=new IntersectionObserver(b,v)}n.observe(e)}return o(!0),a}function pa(e,t,n,r){r===void 0&&(r={});let{ancestorScroll:i=!0,ancestorResize:a=!0,elementResize:o=typeof ResizeObserver==`function`,layoutShift:s=typeof IntersectionObserver==`function`,animationFrame:c=!1}=r,l=zi(e),u=i||a?[...l?Ii(l):[],...t?Ii(t):[]]:[];u.forEach(e=>{i&&e.addEventListener(`scroll`,n,{passive:!0}),a&&e.addEventListener(`resize`,n)});let d=l&&s?fa(l,n):null,f=-1,p=null;o&&(p=new ResizeObserver(e=>{let[r]=e;r&&r.target===l&&p&&t&&(p.unobserve(t),cancelAnimationFrame(f),f=requestAnimationFrame(()=>{var e;(e=p)==null||e.observe(t)})),n()}),l&&!c&&p.observe(l),t&&p.observe(t));let m,h=c?Wi(e):null;c&&g();function g(){let t=Wi(e);h&&!da(h,t)&&n(),h=t,m=requestAnimationFrame(g)}return n(),()=>{var e;u.forEach(e=>{i&&e.removeEventListener(`scroll`,n),a&&e.removeEventListener(`resize`,n)}),d?.(),(e=p)==null||e.disconnect(),p=null,c&&cancelAnimationFrame(m)}}var ma=ui,ha=di,ga=ii,_a=fi,va=si,ya=ri,ba=(e,t,n)=>{let r=new Map,i={platform:ua,...n},a={...i.platform,_c:r};return ni(e,t,{...i,platform:a})},xa=D();function Sa(){let e=y(xa);if(e===void 0)throw Error("[kobalte]: `usePopperContext` must be used within a `Popper` component");return e}var Ca=B(`<svg display="block" viewBox="0 0 30 30" style="transform:scale(1.02)"><g><path fill="none" d="M23,27.8c1.1,1.2,3.4,2.2,5,2.2h2H0h2c1.7,0,3.9-1,5-2.2l6.6-7.2c0.7-0.8,2-0.8,2.7,0L23,27.8L23,27.8z"></path><path stroke="none" d="M23,27.8c1.1,1.2,3.4,2.2,5,2.2h2H0h2c1.7,0,3.9-1,5-2.2l6.6-7.2c0.7-0.8,2-0.8,2.7,0L23,27.8L23,27.8z">`),wa=30,Ta=wa/2,Ea={top:180,right:-90,bottom:0,left:90};function Da(e){let t=Sa(),n=Y({size:wa},e),[r,a]=c(n,[`ref`,`style`,`size`]),o=()=>t.currentPlacement().split(`-`)[0],s=Oa(t.contentRef),l=()=>s()?.getPropertyValue(`background-color`)||`none`,u=()=>s()?.getPropertyValue(`border-${o()}-color`)||`none`,d=()=>s()?.getPropertyValue(`border-${o()}-width`)||`0px`,p=()=>Number.parseInt(d())*2*(wa/r.size),m=()=>`rotate(${Ea[o()]} ${Ta} ${Ta}) translate(0 2)`;return F(X,i({as:`div`,ref(e){let n=dt(t.setArrowRef,r.ref);typeof n==`function`&&n(e)},"aria-hidden":`true`,get style(){return At({position:`absolute`,"font-size":`${r.size}px`,width:`1em`,height:`1em`,"pointer-events":`none`,fill:l(),stroke:u(),"stroke-width":p()},r.style)}},a,{get children(){let e=Ca(),t=e.firstChild;return O(()=>f(t,`transform`,m())),e}}))}function Oa(e){let[t,n]=I();return N(()=>{let t=e();t&&n(zt(t).getComputedStyle(t))}),t}function ka(e){let t=Sa(),[n,r]=c(e,[`ref`,`style`]);return F(X,i({as:`div`,ref(e){let r=dt(t.setPositionerRef,n.ref);typeof r==`function`&&r(e)},"data-popper-positioner":``,get style(){return At({position:`absolute`,top:0,left:0,"min-width":`max-content`},n.style)}},r))}function Aa(e){let{x:t=0,y:n=0,width:r=0,height:i=0}=e??{};if(typeof DOMRect==`function`)return new DOMRect(t,n,r,i);let a={x:t,y:n,width:r,height:i,top:n,right:t+r,bottom:n+i,left:t};return{...a,toJSON:()=>a}}function ja(e,t){return{contextElement:e,getBoundingClientRect:()=>{let n=t(e);return n?Aa(n):e?e.getBoundingClientRect():Aa()}}}function Ma(e){return/^(?:top|bottom|left|right)(?:-(?:start|end))?$/.test(e)}var Na={top:`bottom`,right:`left`,bottom:`top`,left:`right`};function Pa(e,t){let[n,r]=e.split(`-`),i=Na[n];return r?n===`left`||n===`right`?`${i} ${r===`start`?`top`:`bottom`}`:r===`start`?`${i} ${t===`rtl`?`right`:`left`}`:`${i} ${t===`rtl`?`left`:`right`}`:`${i} center`}function Fa(e){let n=Y({getAnchorRect:e=>e?.getBoundingClientRect(),placement:`bottom`,gutter:0,shift:0,flip:!0,slide:!0,overlap:!1,sameWidth:!1,fitViewport:!1,hideWhenDetached:!1,detachedPadding:0,arrowPadding:4,overflowPadding:8},e),[r,i]=I(),[a,o]=I(),[s,c]=I(n.placement),l=()=>ja(n.anchorRef?.(),n.getAnchorRect),{direction:u}=Yn();async function d(){let e=l(),t=r(),i=a();if(!e||!t)return;let o=(i?.clientHeight||0)/2,s=typeof n.gutter==`number`?n.gutter+o:n.gutter??o;t.style.setProperty(`--kb-popper-content-overflow-padding`,`${n.overflowPadding}px`),e.getBoundingClientRect();let d=[ma(({placement:e})=>{let t=!!e.split(`-`)[1];return{mainAxis:s,crossAxis:t?void 0:n.shift,alignmentAxis:n.shift}})];if(n.flip!==!1){let e=typeof n.flip==`string`?n.flip.split(` `):void 0;if(e!==void 0&&!e.every(Ma))throw Error("`flip` expects a spaced-delimited list of placements");d.push(ga({padding:n.overflowPadding,fallbackPlacements:e}))}(n.slide||n.overlap)&&d.push(ha({mainAxis:n.slide,crossAxis:n.overlap,padding:n.overflowPadding})),d.push(_a({padding:n.overflowPadding,apply({availableWidth:e,availableHeight:r,rects:i}){let a=Math.round(i.reference.width);e=Math.floor(e),r=Math.floor(r),t.style.setProperty(`--kb-popper-anchor-width`,`${a}px`),t.style.setProperty(`--kb-popper-content-available-width`,`${e}px`),t.style.setProperty(`--kb-popper-content-available-height`,`${r}px`),n.sameWidth&&(t.style.width=`${a}px`),n.fitViewport&&(t.style.maxWidth=`${e}px`,t.style.maxHeight=`${r}px`)}})),n.hideWhenDetached&&d.push(va({padding:n.detachedPadding})),i&&d.push(ya({element:i,padding:n.arrowPadding}));let f=await ba(e,t,{placement:n.placement,strategy:`absolute`,middleware:d,platform:{...ua,isRTL:()=>u()===`rtl`}});if(c(f.placement),n.onCurrentPlacementChange?.(f.placement),!t)return;t.style.setProperty(`--kb-popper-content-transform-origin`,Pa(f.placement,u()));let p=Math.round(f.x),m=Math.round(f.y),h;if(n.hideWhenDetached&&(h=f.middlewareData.hide?.referenceHidden?`hidden`:`visible`),Object.assign(t.style,{top:`0`,left:`0`,transform:`translate3d(${p}px, ${m}px, 0)`,visibility:h}),i&&f.middlewareData.arrow){let{x:e,y:t}=f.middlewareData.arrow,n=f.placement.split(`-`)[0];Object.assign(i.style,{left:e==null?``:`${e}px`,top:t==null?``:`${t}px`,[n]:`100%`})}}N(()=>{let e=l(),n=r();if(!e||!n)return;let i=pa(e,n,d,{elementResize:typeof ResizeObserver==`function`});t(i)}),N(()=>{let e=r(),t=n.contentRef?.();e&&t&&queueMicrotask(()=>{e.style.zIndex=getComputedStyle(t).zIndex})});let f={currentPlacement:s,contentRef:()=>n.contentRef?.(),setPositionerRef:i,setArrowRef:o};return F(xa.Provider,{value:f,get children(){return n.children}})}var Ia=Object.assign(Fa,{Arrow:Da,Context:xa,usePopperContext:Sa,Positioner:ka}),La=`data-kb-top-layer`,Ra,za=!1,Ba=[];function Va(e){return Ba.findIndex(t=>t.node===e)}function Ha(e){return Ba[Va(e)]}function Ua(e){return Ba[Ba.length-1].node===e}function Wa(){return Ba.filter(e=>e.isPointerBlocking)}function Ga(){return[...Wa()].slice(-1)[0]}function Ka(){return Wa().length>0}function qa(e){let t=Va(Ga()?.node);return Va(e)<t}function Ja(e){Ba.push(e)}function Ya(e){let t=Va(e);t<0||Ba.splice(t,1)}function Xa(){for(let{node:e}of Ba)e.style.pointerEvents=qa(e)?`none`:`auto`}function Za(e){if(Ka()&&!za){let t=Bt(e);Ra=document.body.style.pointerEvents,t.body.style.pointerEvents=`none`,za=!0}}function Qa(e){if(Ka())return;let t=Bt(e);t.body.style.pointerEvents=Ra,t.body.style.length===0&&t.body.removeAttribute(`style`),za=!1}var $a={layers:Ba,isTopMostLayer:Ua,hasPointerBlockingLayer:Ka,isBelowPointerBlockingLayer:qa,addLayer:Ja,removeLayer:Ya,indexOf:Va,find:Ha,assignPointerEventToLayers:Xa,disableBodyPointerEvents:Za,restoreBodyPointerEvents:Qa},eo=`interactOutside.pointerDownOutside`,to=`interactOutside.focusOutside`;function no(e,n){let r,i=gn,a=()=>Bt(n()),o=t=>e.onPointerDownOutside?.(t),s=t=>e.onFocusOutside?.(t),c=t=>e.onInteractOutside?.(t),l=t=>{let r=t.target;return!(r instanceof Element)||r.closest(`[${La}]`)||!Lt(a(),r)||Lt(n(),r)?!1:!e.shouldExcludeElement?.(r)},u=e=>{function t(){let t=n(),r=e.target;if(!t||!r||!l(e))return;let i=J([o,c]);r.addEventListener(eo,i,{once:!0});let a=new CustomEvent(eo,{bubbles:!1,cancelable:!0,detail:{originalEvent:e,isContextMenu:e.button===2||Yt(e)&&e.button===0}});r.dispatchEvent(a)}e.pointerType===`touch`?(a().removeEventListener(`click`,t),i=t,a().addEventListener(`click`,t,{once:!0})):t()},d=e=>{let t=n(),r=e.target;if(!t||!r||!l(e))return;let i=J([s,c]);r.addEventListener(to,i,{once:!0});let a=new CustomEvent(to,{bubbles:!1,cancelable:!0,detail:{originalEvent:e,isContextMenu:!1}});r.dispatchEvent(a)};N(()=>{V(e.isDisabled)||(r=window.setTimeout(()=>{a().addEventListener(`pointerdown`,u,!0)},0),a().addEventListener(`focusin`,d,!0),t(()=>{window.clearTimeout(r),a().removeEventListener(`click`,i),a().removeEventListener(`pointerdown`,u,!0),a().removeEventListener(`focusin`,d,!0)}))})}function ro(e){let n=t=>{t.key===Ht.Escape&&e.onEscapeKeyDown?.(t)};N(()=>{if(V(e.isDisabled))return;let r=e.ownerDocument?.()??Bt();r.addEventListener(`keydown`,n),t(()=>{r.removeEventListener(`keydown`,n)})})}var io=D();function ao(){return y(io)}function oo(e){let n,r=ao(),[a,o]=c(e,[`ref`,`disableOutsidePointerEvents`,`excludedElements`,`onEscapeKeyDown`,`onPointerDownOutside`,`onFocusOutside`,`onInteractOutside`,`onDismiss`,`bypassTopMostLayerCheck`]),s=new Set([]),l=e=>{s.add(e);let t=r?.registerNestedLayer(e);return()=>{s.delete(e),t?.()}};no({shouldExcludeElement:e=>n?a.excludedElements?.some(t=>Lt(t(),e))||[...s].some(t=>Lt(t,e)):!1,onPointerDownOutside:e=>{n&&!$a.isBelowPointerBlockingLayer(n)&&(a.bypassTopMostLayerCheck||$a.isTopMostLayer(n))&&(a.onPointerDownOutside?.(e),a.onInteractOutside?.(e),e.defaultPrevented||a.onDismiss?.())},onFocusOutside:e=>{a.onFocusOutside?.(e),a.onInteractOutside?.(e),e.defaultPrevented||a.onDismiss?.()}},()=>n),ro({ownerDocument:()=>Bt(n),onEscapeKeyDown:e=>{n&&$a.isTopMostLayer(n)&&(a.onEscapeKeyDown?.(e),!e.defaultPrevented&&a.onDismiss&&(e.preventDefault(),a.onDismiss()))}}),ne(()=>{if(!n)return;$a.addLayer({node:n,isPointerBlocking:a.disableOutsidePointerEvents,dismiss:a.onDismiss});let e=r?.registerNestedLayer(n);$a.assignPointerEventToLayers(),$a.disableBodyPointerEvents(n),t(()=>{n&&($a.removeLayer(n),e?.(),$a.assignPointerEventToLayers(),$a.restoreBodyPointerEvents(n))})}),N(M([()=>n,()=>a.disableOutsidePointerEvents],([e,n])=>{if(!e)return;let r=$a.find(e);r&&r.isPointerBlocking!==n&&(r.isPointerBlocking=n,$a.assignPointerEventToLayers()),n&&$a.disableBodyPointerEvents(e),t(()=>{$a.restoreBodyPointerEvents(e)})},{defer:!0}));let u={registerNestedLayer:l};return F(io.Provider,{value:u,get children(){return F(X,i({as:`div`,ref(e){let t=dt(e=>n=e,a.ref);typeof t==`function`&&t(e)}},o))}})}function so(e={}){let[t,n]=Pn({value:()=>V(e.open),defaultValue:()=>!!V(e.defaultOpen),onChange:t=>e.onOpenChange?.(t)}),r=()=>{n(!0)},i=()=>{n(!1)};return{isOpen:t,setIsOpen:n,open:r,close:i,toggle:()=>{t()?i():r()}}}function co(e){return t=>(e(t),()=>e(void 0))}var lo=e=>typeof e==`function`?e():e,uo=e=>{let r=R(()=>{let t=lo(e.element);if(t)return getComputedStyle(t)}),i=()=>r()?.animationName??`none`,[a,o]=I(lo(e.show)?`present`:`hidden`),s=`none`;return N(t=>{let a=lo(e.show);return n(()=>{if(t===a)return a;let e=s,n=i();a?o(`present`):n===`none`||r()?.display===`none`?o(`hidden`):o(t===!0&&e!==n?`hiding`:`hidden`)}),a}),N(()=>{let n=lo(e.element);if(!n)return;let r=e=>{e.target===n&&(s=i())},c=e=>{let t=i().includes(e.animationName);e.target===n&&t&&a()===`hiding`&&o(`hidden`)};n.addEventListener(`animationstart`,r),n.addEventListener(`animationcancel`,c),n.addEventListener(`animationend`,c),t(()=>{n.removeEventListener(`animationstart`,r),n.removeEventListener(`animationcancel`,c),n.removeEventListener(`animationend`,c)})}),{present:()=>a()===`present`||a()===`hiding`,state:a,setState:o}},fo=[`id`,`name`,`validationState`,`required`,`disabled`,`readOnly`];function po(e){let t=Y({id:`form-control-${P()}`},e),[n,r]=I(),[i,a]=I(),[o,s]=I(),[c,l]=I();return{formControlContext:{name:()=>V(t.name)??V(t.id),dataset:R(()=>({"data-valid":V(t.validationState)===`valid`?``:void 0,"data-invalid":V(t.validationState)===`invalid`?``:void 0,"data-required":V(t.required)?``:void 0,"data-disabled":V(t.disabled)?``:void 0,"data-readonly":V(t.readOnly)?``:void 0})),validationState:()=>V(t.validationState),isRequired:()=>V(t.required),isDisabled:()=>V(t.disabled),isReadOnly:()=>V(t.readOnly),labelId:n,fieldId:i,descriptionId:o,errorMessageId:c,getAriaLabelledBy:(e,t,r)=>{let i=r!=null||n()!=null;return[r,n(),i&&t!=null?e:void 0].filter(Boolean).join(` `)||void 0},getAriaDescribedBy:e=>[o(),c(),e].filter(Boolean).join(` `)||void 0,generateId:It(()=>V(t.id)),registerLabel:co(r),registerField:co(a),registerDescription:co(s),registerErrorMessage:co(l)}}}var mo=D();function ho(){let e=y(mo);if(e===void 0)throw Error("[kobalte]: `useFormControlContext` must be used within a `FormControlContext.Provider` component");return e}function go(e){let n=ho(),r=Y({id:n.generateId(`description`)},e);return N(()=>t(n.registerDescription(r.id))),F(X,i({as:`div`},()=>n.dataset(),r))}function _o(e){let n,r=ho(),o=Y({id:r.generateId(`label`)},e),[s,l]=c(o,[`ref`]),u=Tn(()=>n,()=>`label`);return N(()=>t(r.registerLabel(l.id))),F(X,i({as:`label`,ref(e){let t=dt(e=>n=e,s.ref);typeof t==`function`&&t(e)},get for(){return a(()=>u()===`label`)()?r.fieldId():void 0}},()=>r.dataset(),l))}function vo(e,n){N(M(e,e=>{if(e==null)return;let r=yo(e);r!=null&&(r.addEventListener(`reset`,n,{passive:!0}),t(()=>{r.removeEventListener(`reset`,n)}))}))}function yo(e){return bo(e)?e.form:e.closest(`form`)}function bo(e){return e.matches(`textarea, input, select, button`)}function xo(n){let r=ho(),a=Y({id:r.generateId(`error-message`)},n),[o,s]=c(a,[`forceMount`]),l=()=>r.validationState()===`invalid`;return N(()=>{l()&&t(r.registerErrorMessage(s.id))}),F(e,{get when(){return o.forceMount||l()},get children(){return F(X,i({as:`div`},()=>r.dataset(),s))}})}var So=`focusScope.autoFocusOnMount`,Co=`focusScope.autoFocusOnUnmount`,wo={bubbles:!1,cancelable:!0},To={stack:[],active(){return this.stack[0]},add(e){e!==this.active()&&this.active()?.pause(),this.stack=Mt(this.stack,e),this.stack.unshift(e)},remove(e){this.stack=Mt(this.stack,e),this.active()?.resume()}};function Eo(e,n){let[r,i]=I(!1),a={pause(){i(!0)},resume(){i(!1)}},o=null,s=t=>e.onMountAutoFocus?.(t),c=t=>e.onUnmountAutoFocus?.(t),l=()=>Bt(n()),u=()=>{let e=l().createElement(`span`);return e.setAttribute(`data-focus-trap`,``),e.tabIndex=0,Object.assign(e.style,wn),e},d=()=>{let e=n();return e?on(e,!0).filter(e=>!e.hasAttribute(`data-focus-trap`)):[]},f=()=>{let e=d();return e.length>0?e[0]:null},p=()=>{let e=d();return e.length>0?e[e.length-1]:null},m=()=>{let e=n();if(!e)return!1;let t=Rt(e);return!t||Lt(e,t)?!1:cn(t)};N(()=>{let e=n();if(!e)return;To.add(a);let r=Rt(e);if(!Lt(e,r)){let t=new CustomEvent(So,wo);e.addEventListener(So,s),e.dispatchEvent(t),t.defaultPrevented||setTimeout(()=>{Xt(f()),Rt(e)===r&&Xt(e)},0)}t(()=>{e.removeEventListener(So,s),setTimeout(()=>{let t=new CustomEvent(Co,wo);m()&&t.preventDefault(),e.addEventListener(Co,c),e.dispatchEvent(t),t.defaultPrevented||Xt(r??l().body),e.removeEventListener(Co,c),To.remove(a)},0)})}),N(()=>{let i=n();if(!i||!V(e.trapFocus)||r())return;let a=e=>{let t=e.target;t?.closest(`[${La}]`)||(Lt(i,t)?o=t:Xt(o))},s=e=>{let t=e.relatedTarget??Rt(i);t?.closest(`[${La}]`)||Lt(i,t)||Xt(o)};l().addEventListener(`focusin`,a),l().addEventListener(`focusout`,s),t(()=>{l().removeEventListener(`focusin`,a),l().removeEventListener(`focusout`,s)})}),N(()=>{let i=n();if(!i||!V(e.trapFocus)||r())return;let a=u();i.insertAdjacentElement(`afterbegin`,a);let o=u();i.insertAdjacentElement(`beforeend`,o);function s(e){let t=f(),n=p();e.relatedTarget===t?Xt(n):Xt(t)}a.addEventListener(`focusin`,s),o.addEventListener(`focusin`,s);let c=new MutationObserver(e=>{for(let t of e)t.previousSibling===o&&(o.remove(),i.insertAdjacentElement(`beforeend`,o)),t.nextSibling===a&&(a.remove(),i.insertAdjacentElement(`afterbegin`,a))});c.observe(i,{childList:!0,subtree:!1}),t(()=>{a.removeEventListener(`focusin`,s),o.removeEventListener(`focusin`,s),a.remove(),o.remove(),c.disconnect()})})}var Do=`data-live-announcer`;function Oo(e){N(()=>{V(e.isDisabled)||t(jo(V(e.targets),V(e.root)))})}var ko=new WeakMap,Ao=[];function jo(e,t=document.body){let n=new Set(e),r=new Set,i=e=>{for(let t of e.querySelectorAll(`[${Do}], [${La}]`))n.add(t);let t=e=>{if(n.has(e)||e.parentElement&&r.has(e.parentElement)&&e.parentElement.getAttribute(`role`)!==`row`)return NodeFilter.FILTER_REJECT;for(let t of n)if(e.contains(t))return NodeFilter.FILTER_SKIP;return NodeFilter.FILTER_ACCEPT},i=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode:t}),o=t(e);if(o===NodeFilter.FILTER_ACCEPT&&a(e),o!==NodeFilter.FILTER_REJECT){let e=i.nextNode();for(;e!=null;)a(e),e=i.nextNode()}},a=e=>{let t=ko.get(e)??0;(e.getAttribute(`aria-hidden`)!==`true`||t!==0)&&(t===0&&e.setAttribute(`aria-hidden`,`true`),r.add(e),ko.set(e,t+1))};Ao.length&&Ao[Ao.length-1].disconnect(),i(t);let o=new MutationObserver(e=>{for(let t of e)if(t.type===`childList`&&t.addedNodes.length!==0&&![...n,...r].some(e=>e.contains(t.target))){for(let e of t.removedNodes)e instanceof Element&&(n.delete(e),r.delete(e));for(let e of t.addedNodes)(e instanceof HTMLElement||e instanceof SVGElement)&&(e.dataset.liveAnnouncer===`true`||e.dataset.reactAriaTopLayer===`true`)?n.add(e):e instanceof Element&&i(e)}});o.observe(t,{childList:!0,subtree:!0});let s={observe(){o.observe(t,{childList:!0,subtree:!0})},disconnect(){o.disconnect()}};return Ao.push(s),()=>{o.disconnect();for(let e of r){let t=ko.get(e);if(t==null)return;t===1?(e.removeAttribute(`aria-hidden`),ko.delete(e)):ko.set(e,t-1)}s===Ao[Ao.length-1]?(Ao.pop(),Ao.length&&Ao[Ao.length-1].observe()):Ao.splice(Ao.indexOf(s),1)}}var Mo=(e,t)=>{if(e.contains(t))return!0;let n=t;for(;n;){if(n===e)return!0;n=n._$host??n.parentElement}return!1},No=new Map,Po=e=>{N(()=>{let n=lo(e.style)??{},r=lo(e.properties)??[],i={};for(let t in n)i[t]=e.element.style[t];let a=No.get(e.key);a?a.activeCount++:No.set(e.key,{activeCount:1,originalStyles:i,properties:r.map(e=>e.key)}),Object.assign(e.element.style,e.style);for(let t of r)e.element.style.setProperty(t.key,t.value);t(()=>{let t=No.get(e.key);if(t){if(t.activeCount!==1)t.activeCount--;else{No.delete(e.key);for(let[n,r]of Object.entries(t.originalStyles))e.element.style[n]=r;for(let n of t.properties)e.element.style.removeProperty(n);e.element.style.length===0&&e.element.removeAttribute(`style`),e.cleanup?.()}}})})},Fo=(e,t)=>{switch(t){case`x`:return[e.clientWidth,e.scrollLeft,e.scrollWidth];case`y`:return[e.clientHeight,e.scrollTop,e.scrollHeight]}},Io=(e,t)=>{let n=getComputedStyle(e),r=t===`x`?n.overflowX:n.overflowY;return r===`auto`||r===`scroll`||e.tagName===`HTML`&&r===`visible`},Lo=(e,t,n)=>{let r=t===`x`&&window.getComputedStyle(e).direction===`rtl`?-1:1,i=e,a=0,o=0,s=!1;do{let[e,c,l]=Fo(i,t),u=l-e-r*c;(c!==0||u!==0)&&Io(i,t)&&(a+=u,o+=c),i===(n??document.documentElement)?s=!0:i=i._$host??i.parentElement}while(i&&!s);return[a,o]},[Ro,zo]=I([]),Bo=e=>Ro().indexOf(e)===Ro().length-1,Vo=e=>{let n=i({element:null,enabled:!0,hideScrollbar:!0,preventScrollbarShift:!0,preventScrollbarShiftMode:`padding`,restoreScrollPosition:!0,allowPinchZoom:!1},e),r=P(),a=[0,0],o=null,s=null;N(()=>{lo(n.enabled)&&(zo(e=>[...e,r]),t(()=>{zo(e=>e.filter(e=>e!==r))}))}),N(()=>{if(!lo(n.enabled)||!lo(n.hideScrollbar))return;let{body:e}=document,t=window.innerWidth-e.offsetWidth;if(lo(n.preventScrollbarShift)){let r={overflow:`hidden`},i=[];t>0&&(lo(n.preventScrollbarShiftMode)===`padding`?r.paddingRight=`calc(${window.getComputedStyle(e).paddingRight} + ${t}px)`:r.marginRight=`calc(${window.getComputedStyle(e).marginRight} + ${t}px)`,i.push({key:`--scrollbar-width`,value:`${t}px`}));let a=window.scrollY,o=window.scrollX;Po({key:`prevent-scroll`,element:e,style:r,properties:i,cleanup:()=>{lo(n.restoreScrollPosition)&&t>0&&window.scrollTo(o,a)}})}else Po({key:`prevent-scroll`,element:e,style:{overflow:`hidden`}})}),N(()=>{Bo(r)&&lo(n.enabled)&&(document.addEventListener(`wheel`,l,{passive:!1}),document.addEventListener(`touchstart`,c,{passive:!1}),document.addEventListener(`touchmove`,u,{passive:!1}),t(()=>{document.removeEventListener(`wheel`,l),document.removeEventListener(`touchstart`,c),document.removeEventListener(`touchmove`,u)}))});let c=e=>{a=Uo(e),o=null,s=null},l=e=>{let t=e.target,r=lo(n.element),i=Ho(e),a=Math.abs(i[0])>Math.abs(i[1])?`x`:`y`,o=Wo(t,a,a===`x`?i[0]:i[1],r),s;s=r&&Mo(r,t)?!o:!0,s&&e.cancelable&&e.preventDefault()},u=e=>{let t=lo(n.element),r=e.target,i;if(e.touches.length===2)i=!lo(n.allowPinchZoom);else{if(o==null||s===null){let t=Uo(e).map((e,t)=>a[t]-e),n=Math.abs(t[0])>Math.abs(t[1])?`x`:`y`;o=n,s=n===`x`?t[0]:t[1]}if(r.type===`range`)i=!1;else{let e=Wo(r,o,s,t);i=t&&Mo(t,r)?!e:!0}}i&&e.cancelable&&e.preventDefault()}},Ho=e=>[e.deltaX,e.deltaY],Uo=e=>e.changedTouches[0]?[e.changedTouches[0].clientX,e.changedTouches[0].clientY]:[0,0],Wo=(e,t,n,r)=>{let[i,a]=Lo(e,t,r!==null&&Mo(r,e)?r:void 0);return!(n>0&&Math.abs(i)<=1||n<0&&Math.abs(a)<1)},Go=Vo,Ko={};On(Ko,{Description:()=>go,ErrorMessage:()=>xo,Item:()=>Zo,ItemControl:()=>Qo,ItemDescription:()=>$o,ItemIndicator:()=>es,ItemInput:()=>ts,ItemLabel:()=>ns,Label:()=>rs,RadioGroup:()=>as,Root:()=>is,useRadioGroupContext:()=>Jo});var qo=D();function Jo(){let e=y(qo);if(e===void 0)throw Error("[kobalte]: `useRadioGroupContext` must be used within a `RadioGroup` component");return e}var Yo=D();function Xo(){let e=y(Yo);if(e===void 0)throw Error("[kobalte]: `useRadioGroupItemContext` must be used within a `RadioGroup.Item` component");return e}function Zo(e){let t=ho(),n=Jo(),r=Y({id:`${t.generateId(`item`)}-${P()}`},e),[a,o]=c(r,[`value`,`disabled`,`onPointerDown`]),[s,l]=I(),[u,d]=I(),[f,p]=I(),[m,h]=I(),[g,_]=I(!1),v=R(()=>n.isDefaultValue(a.value)),y=R(()=>n.isSelectedValue(a.value)),b=R(()=>a.disabled||t.isDisabled()||!1),x=e=>{q(e,a.onPointerDown),g()&&e.preventDefault()},S=R(()=>({...t.dataset(),"data-disabled":b()?``:void 0,"data-checked":y()?``:void 0})),C={value:()=>a.value,dataset:S,isDefault:v,isSelected:y,isDisabled:b,inputId:s,labelId:u,descriptionId:f,inputRef:m,select:()=>n.setSelectedValue(a.value),generateId:It(()=>o.id),registerInput:co(l),registerLabel:co(d),registerDescription:co(p),setIsFocused:_,setInputRef:h};return F(Yo.Provider,{value:C,get children(){return F(X,i({as:`div`,role:`group`,onPointerDown:x},S,o))}})}function Qo(e){let t=Xo(),n=Y({id:t.generateId(`control`)},e),[r,a]=c(n,[`onClick`,`onKeyDown`]);return F(X,i({as:`div`,onClick:e=>{q(e,r.onClick),t.select(),t.inputRef()?.focus()},onKeyDown:e=>{q(e,r.onKeyDown),e.key===Ht.Space&&(t.select(),t.inputRef()?.focus())}},()=>t.dataset(),a))}function $o(e){let n=Xo(),r=Y({id:n.generateId(`description`)},e);return N(()=>t(n.registerDescription(r.id))),F(X,i({as:`div`},()=>n.dataset(),r))}function es(t){let n=Xo(),r=Y({id:n.generateId(`indicator`)},t),[a,o]=c(r,[`ref`,`forceMount`]),[s,l]=I(),{present:u}=uo({show:()=>a.forceMount||n.isSelected(),element:()=>s()??null});return F(e,{get when(){return u()},get children(){return F(X,i({as:`div`,ref(e){let t=dt(l,a.ref);typeof t==`function`&&t(e)}},()=>n.dataset(),o))}})}function ts(e){let n=ho(),r=Jo(),a=Xo(),o=Y({id:a.generateId(`input`)},e),[s,l]=c(o,[`ref`,`style`,`aria-labelledby`,`aria-describedby`,`onChange`,`onFocus`,`onBlur`]),u=()=>[s[`aria-labelledby`],a.labelId(),s[`aria-labelledby`]!=null&&l[`aria-label`]!=null?l.id:void 0].filter(Boolean).join(` `)||void 0,d=()=>[s[`aria-describedby`],a.descriptionId(),r.ariaDescribedBy()].filter(Boolean).join(` `)||void 0,[f,p]=I(!1);return N(M([()=>a.isSelected(),()=>a.value()],e=>{if(!e[0]&&e[1]===a.value())return;p(!0);let t=a.inputRef();t?.dispatchEvent(new Event(`input`,{bubbles:!0,cancelable:!0})),t?.dispatchEvent(new Event(`change`,{bubbles:!0,cancelable:!0}))},{defer:!0})),N(()=>t(a.registerInput(l.id))),F(X,i({as:`input`,ref(e){let t=dt(a.setInputRef,s.ref);typeof t==`function`&&t(e)},type:`radio`,get name(){return n.name()},get value(){return a.value()},get checked(){return a.isSelected()},get required(){return n.isRequired()},get disabled(){return a.isDisabled()},get readonly(){return n.isReadOnly()},get style(){return At({...wn},s.style)},get"aria-labelledby"(){return u()},get"aria-describedby"(){return d()},onChange:e=>{if(q(e,s.onChange),e.stopPropagation(),!f()){r.setSelectedValue(a.value());let t=e.target;t.checked=a.isSelected()}p(!1)},onFocus:e=>{q(e,s.onFocus),a.setIsFocused(!0)},onBlur:e=>{q(e,s.onBlur),a.setIsFocused(!1)}},()=>a.dataset(),l))}function ns(e){let n=Xo(),r=Y({id:n.generateId(`label`)},e);return N(()=>t(n.registerLabel(r.id))),F(X,i({as:`label`,get for(){return n.inputId()}},()=>n.dataset(),r))}function rs(e){return F(_o,i({as:`span`},e))}function is(e){let t,n=Y({id:`radiogroup-${P()}`,orientation:`vertical`},e),[r,a,o]=c(n,[`ref`,`value`,`defaultValue`,`onChange`,`orientation`,`aria-labelledby`,`aria-describedby`],fo),[s,l]=Nn({value:()=>r.value,defaultValue:()=>r.defaultValue,onChange:e=>r.onChange?.(e)}),{formControlContext:u}=po(a);vo(()=>t,()=>l(r.defaultValue??``));let d=()=>u.getAriaLabelledBy(V(a.id),o[`aria-label`],r[`aria-labelledby`]),f=()=>u.getAriaDescribedBy(r[`aria-describedby`]),p=t=>t===e.defaultValue,m=e=>e===s(),h={ariaDescribedBy:f,isDefaultValue:p,isSelectedValue:m,setSelectedValue:e=>{if(!(u.isReadOnly()||u.isDisabled())&&(l(e),t))for(let e of t.querySelectorAll(`[type='radio']`)){let t=e;t.checked=m(t.value)}}};return F(mo.Provider,{value:u,get children(){return F(qo.Provider,{value:h,get children(){return F(X,i({as:`div`,ref(e){let n=dt(e=>t=e,r.ref);typeof n==`function`&&n(e)},role:`radiogroup`,get id(){return V(a.id)},get"aria-invalid"(){return u.validationState()===`invalid`||void 0},get"aria-required"(){return u.isRequired()||void 0},get"aria-disabled"(){return u.isDisabled()||void 0},get"aria-readonly"(){return u.isReadOnly()||void 0},get"aria-orientation"(){return r.orientation},get"aria-labelledby"(){return d()},get"aria-describedby"(){return f()}},()=>u.dataset(),o))}})}})}var as=Object.assign(is,{Description:go,ErrorMessage:xo,Item:Zo,ItemControl:Qo,ItemDescription:$o,ItemIndicator:es,ItemInput:ts,ItemLabel:ns,Label:rs}),os=class{collection;ref;collator;constructor(e,t,n){this.collection=e,this.ref=t,this.collator=n}getKeyBelow(e){let t=this.collection().getKeyAfter(e);for(;t!=null;){let e=this.collection().getItem(t);if(e&&e.type===`item`&&!e.disabled)return t;t=this.collection().getKeyAfter(t)}}getKeyAbove(e){let t=this.collection().getKeyBefore(e);for(;t!=null;){let e=this.collection().getItem(t);if(e&&e.type===`item`&&!e.disabled)return t;t=this.collection().getKeyBefore(t)}}getFirstKey(){let e=this.collection().getFirstKey();for(;e!=null;){let t=this.collection().getItem(e);if(t&&t.type===`item`&&!t.disabled)return e;e=this.collection().getKeyAfter(e)}}getLastKey(){let e=this.collection().getLastKey();for(;e!=null;){let t=this.collection().getItem(e);if(t&&t.type===`item`&&!t.disabled)return e;e=this.collection().getKeyBefore(e)}}getItem(e){return this.ref?.()?.querySelector(`[data-key="${e}"]`)??null}getKeyPageAbove(e){let t=this.ref?.(),n=this.getItem(e);if(!t||!n)return;let r=Math.max(0,n.offsetTop+n.offsetHeight-t.offsetHeight),i=e;for(;i&&n&&n.offsetTop>r;)i=this.getKeyAbove(i),n=i==null?null:this.getItem(i);return i}getKeyPageBelow(e){let t=this.ref?.(),n=this.getItem(e);if(!t||!n)return;let r=Math.min(t.scrollHeight,n.offsetTop-n.offsetHeight+t.offsetHeight),i=e;for(;i&&n&&n.offsetTop<r;)i=this.getKeyBelow(i),n=i==null?null:this.getItem(i);return i}getKeyForSearch(e,t){let n=this.collator?.();if(!n)return;let r=t==null?this.getFirstKey():this.getKeyBelow(t);for(;r!=null;){let t=this.collection().getItem(r);if(t){let i=t.textValue.slice(0,e.length);if(t.textValue&&n.compare(i,e)===0)return r}r=this.getKeyBelow(r)}}};function ss(e,t,n){let r=Zn({usage:`search`,sensitivity:`base`});return cr({selectionManager:()=>V(e.selectionManager),keyboardDelegate:R(()=>V(e.keyboardDelegate)||new os(e.collection,t,r)),autoFocus:()=>V(e.autoFocus),deferAutoFocus:()=>V(e.deferAutoFocus),shouldFocusWrap:()=>V(e.shouldFocusWrap),disallowEmptySelection:()=>V(e.disallowEmptySelection),selectOnFocus:()=>V(e.selectOnFocus),disallowTypeAhead:()=>V(e.disallowTypeAhead),shouldUseVirtualFocus:()=>V(e.shouldUseVirtualFocus),allowsTabNavigation:()=>V(e.allowsTabNavigation),isVirtualized:()=>V(e.isVirtualized),scrollToKey:t=>V(e.scrollToKey)?.(t),orientation:()=>V(e.orientation)},t)}var cs=D();function ls(){return y(cs)}var us=D();function ds(){return y(us)}var fs=D();function ps(){return y(fs)}function ms(){let e=ps();if(e===void 0)throw Error("[kobalte]: `useMenuContext` must be used within a `Menu` component");return e}var hs=D();function gs(){let e=y(hs);if(e===void 0)throw Error("[kobalte]: `useMenuItemContext` must be used within a `Menu.Item` component");return e}var _s=D();function vs(){let e=y(_s);if(e===void 0)throw Error("[kobalte]: `useMenuRootContext` must be used within a `MenuRoot` component");return e}function ys(e){let t,n=vs(),r=ms(),a=Y({id:n.generateId(`item-${P()}`)},e),[o,s]=c(a,[`ref`,`textValue`,`disabled`,`closeOnSelect`,`checked`,`indeterminate`,`onSelect`,`onPointerMove`,`onPointerLeave`,`onPointerDown`,`onPointerUp`,`onClick`,`onKeyDown`,`onMouseDown`,`onFocus`]),[l,u]=I(),[d,f]=I(),[p,m]=I(),h=()=>r.listState().selectionManager(),g=()=>s.id,_=()=>h().focusedKey()===g(),v=()=>{o.onSelect?.(),o.closeOnSelect&&setTimeout(()=>{r.close(!0)})};wr({getItem:()=>({ref:()=>t,type:`item`,key:g(),textValue:o.textValue??p()?.textContent??t?.textContent??``,disabled:o.disabled??!1})});let y=lr({key:g,selectionManager:h,shouldSelectOnPressUp:!0,allowsDifferentPressOrigin:!0,disabled:()=>o.disabled},()=>t),b=e=>{q(e,o.onPointerMove),e.pointerType===`mouse`&&(o.disabled?r.onItemLeave(e):(r.onItemEnter(e),e.defaultPrevented||(Xt(e.currentTarget),r.listState().selectionManager().setFocused(!0),r.listState().selectionManager().setFocusedKey(g()))))},x=e=>{q(e,o.onPointerLeave),e.pointerType===`mouse`&&r.onItemLeave(e)},S=e=>{q(e,o.onPointerUp),!o.disabled&&e.button===0&&v()},C=e=>{if(q(e,o.onKeyDown),!e.repeat&&!o.disabled)switch(e.key){case`Enter`:case` `:v()}},w=R(()=>{if(o.indeterminate)return`mixed`;if(o.checked!=null)return o.checked}),T=R(()=>({"data-indeterminate":o.indeterminate?``:void 0,"data-checked":o.checked&&!o.indeterminate?``:void 0,"data-disabled":o.disabled?``:void 0,"data-highlighted":_()?``:void 0})),E={isChecked:()=>o.checked,dataset:T,setLabelRef:m,generateId:It(()=>s.id),registerLabel:co(u),registerDescription:co(f)};return F(hs.Provider,{value:E,get children(){return F(X,i({as:`div`,ref(e){let n=dt(e=>t=e,o.ref);typeof n==`function`&&n(e)},get tabIndex(){return y.tabIndex()},get"aria-checked"(){return w()},get"aria-disabled"(){return o.disabled},get"aria-labelledby"(){return l()},get"aria-describedby"(){return d()},get"data-key"(){return y.dataKey()},get onPointerDown(){return J([o.onPointerDown,y.onPointerDown])},get onPointerUp(){return J([S,y.onPointerUp])},get onClick(){return J([o.onClick,y.onClick])},get onKeyDown(){return J([C,y.onKeyDown])},get onMouseDown(){return J([o.onMouseDown,y.onMouseDown])},get onFocus(){return J([o.onFocus,y.onFocus])},onPointerMove:b,onPointerLeave:x},T,s))}})}function bs(e){let t=Y({closeOnSelect:!1},e),[n,r]=c(t,[`checked`,`defaultChecked`,`onChange`,`onSelect`]),a=In({isSelected:()=>n.checked,defaultIsSelected:()=>n.defaultChecked,onSelectedChange:e=>n.onChange?.(e),isDisabled:()=>r.disabled});return F(ys,i({role:`menuitemcheckbox`,get checked(){return a.isSelected()},onSelect:()=>{n.onSelect?.(),a.toggle()}},r))}var xs={next:(e,t)=>e===`ltr`?t===`horizontal`?`ArrowRight`:`ArrowDown`:t===`horizontal`?`ArrowLeft`:`ArrowUp`,previous:(e,t)=>xs.next(e===`ltr`?`rtl`:`ltr`,t)},Ss={first:e=>e===`horizontal`?`ArrowDown`:`ArrowRight`,last:e=>e===`horizontal`?`ArrowUp`:`ArrowLeft`};function Cs(e){let n=vs(),r=ms(),o=ls(),{direction:s}=Yn(),l=Y({id:n.generateId(`trigger`)},e),[u,d]=c(l,[`ref`,`id`,`disabled`,`onPointerDown`,`onClick`,`onKeyDown`,`onMouseOver`,`onFocus`]),f=()=>n.value();o!==void 0&&(f=()=>n.value()??u.id,o.lastValue()===void 0&&o.setLastValue(f));let p=Tn(()=>r.triggerRef(),()=>`button`),m=R(()=>p()===`a`&&r.triggerRef()?.getAttribute(`href`)!=null);N(M(()=>o?.value(),e=>{m()&&e===f()&&r.triggerRef()?.focus()}));let h=()=>{o===void 0?r.toggle(!0):r.isOpen()?o.value()===f()&&o.closeMenu():(o.autoFocusMenu()||o.setAutoFocusMenu(!0),r.open(!1))};return N(()=>t(r.registerTriggerId(u.id))),F(jn,i({ref(e){let t=dt(r.setTriggerRef,u.ref);typeof t==`function`&&t(e)},get"data-kb-menu-value-trigger"(){return n.value()},get id(){return u.id},get disabled(){return u.disabled},"aria-haspopup":`true`,get"aria-expanded"(){return r.isOpen()},get"aria-controls"(){return a(()=>!!r.isOpen())()?r.contentId():void 0},get"data-highlighted"(){return f()!==void 0&&o?.value()===f()||void 0},get tabIndex(){return o===void 0?void 0:o.value()===f()||o.lastValue()===f()?0:-1},onPointerDown:e=>{q(e,u.onPointerDown),e.currentTarget.dataset.pointerType=e.pointerType,!u.disabled&&e.pointerType!==`touch`&&e.button===0&&h()},onMouseOver:e=>{q(e,u.onMouseOver),r.triggerRef()?.dataset.pointerType!==`touch`&&!u.disabled&&o!==void 0&&o.value()!==void 0&&o.setValue(f)},onClick:e=>{q(e,u.onClick),u.disabled||e.currentTarget.dataset.pointerType===`touch`&&h()},onKeyDown:e=>{if(q(e,u.onKeyDown),!u.disabled){if(m())switch(e.key){case`Enter`:case` `:return}switch(e.key){case`Enter`:case` `:case Ss.first(n.orientation()):e.stopPropagation(),e.preventDefault(),Cn(e.currentTarget),r.open(`first`),o?.setAutoFocusMenu(!0),o?.setValue(f);break;case Ss.last(n.orientation()):e.stopPropagation(),e.preventDefault(),r.open(`last`);break;case xs.next(s(),n.orientation()):if(o===void 0)break;e.stopPropagation(),e.preventDefault(),o.nextMenu();break;case xs.previous(s(),n.orientation()):if(o===void 0)break;e.stopPropagation(),e.preventDefault(),o.previousMenu()}}},onFocus:e=>{q(e,u.onFocus),o!==void 0&&e.currentTarget.dataset.pointerType!==`touch`&&o.setValue(f)},role:o===void 0?void 0:`menuitem`},()=>r.dataset(),d))}function ws(n){let r,o=vs(),s=ms(),l=ls(),u=ds(),{direction:d}=Yn(),f=Y({id:o.generateId(`content-${P()}`)},n),[p,m]=c(f,[`ref`,`id`,`style`,`onOpenAutoFocus`,`onCloseAutoFocus`,`onEscapeKeyDown`,`onFocusOutside`,`onPointerEnter`,`onPointerMove`,`onKeyDown`,`onMouseDown`,`onFocusIn`,`onFocusOut`]),h=0,g=()=>s.parentMenuContext()==null&&l===void 0&&o.isModal(),_=ss({selectionManager:s.listState().selectionManager,collection:s.listState().collection,autoFocus:s.autoFocus,deferAutoFocus:!0,shouldFocusWrap:!0,disallowTypeAhead:()=>!s.listState().selectionManager().isFocused(),orientation:()=>o.orientation()===`horizontal`?`vertical`:`horizontal`},()=>r);Eo({trapFocus:()=>g()&&s.isOpen(),onMountAutoFocus:e=>{l===void 0&&p.onOpenAutoFocus?.(e)},onUnmountAutoFocus:p.onCloseAutoFocus},()=>r);let v=e=>{if(Lt(e.currentTarget,e.target)&&(e.key===`Tab`&&s.isOpen()&&e.preventDefault(),l!==void 0&&e.currentTarget.getAttribute(`aria-haspopup`)!==`true`))switch(e.key){case xs.next(d(),o.orientation()):e.stopPropagation(),e.preventDefault(),s.close(!0),l.setAutoFocusMenu(!0),l.nextMenu();break;case xs.previous(d(),o.orientation()):if(e.currentTarget.hasAttribute(`data-closed`))break;e.stopPropagation(),e.preventDefault(),s.close(!0),l.setAutoFocusMenu(!0),l.previousMenu()}},y=e=>{p.onEscapeKeyDown?.(e),l?.setAutoFocusMenu(!1),s.close(!0)},b=e=>{p.onFocusOutside?.(e),o.isModal()&&e.preventDefault()},x=e=>{q(e,p.onPointerEnter),s.isOpen()&&(s.parentMenuContext()?.listState().selectionManager().setFocused(!1),s.parentMenuContext()?.listState().selectionManager().setFocusedKey(void 0))},S=e=>{if(q(e,p.onPointerMove),e.pointerType!==`mouse`)return;let t=e.target,n=h!==e.clientX;Lt(e.currentTarget,t)&&n&&(s.setPointerDir(e.clientX>h?`right`:`left`),h=e.clientX)};N(()=>t(s.registerContentId(p.id))),t(()=>s.setContentRef(void 0));let C={ref:dt(e=>{s.setContentRef(e),r=e},p.ref),role:`menu`,get id(){return p.id},get tabIndex(){return _.tabIndex()},get"aria-labelledby"(){return s.triggerId()},onKeyDown:J([p.onKeyDown,_.onKeyDown,v]),onMouseDown:J([p.onMouseDown,_.onMouseDown]),onFocusIn:J([p.onFocusIn,_.onFocusIn]),onFocusOut:J([p.onFocusOut,_.onFocusOut]),onPointerEnter:x,onPointerMove:S,get"data-orientation"(){return o.orientation()}};return F(e,{get when(){return s.contentPresent()},get children(){return F(e,{get when(){return u===void 0||s.parentMenuContext()!=null},get fallback(){return F(X,i({as:`div`},()=>s.dataset(),C,m))},get children(){return F(Ia.Positioner,{get children(){return F(oo,i({get disableOutsidePointerEvents(){return a(()=>!!g())()&&s.isOpen()},get excludedElements(){return[s.triggerRef]},bypassTopMostLayerCheck:!0,get style(){return At({"--kb-menu-content-transform-origin":`var(--kb-popper-content-transform-origin)`,position:`relative`},p.style)},onEscapeKeyDown:y,onFocusOutside:b,get onDismiss(){return s.close}},()=>s.dataset(),C,m))}})}})}})}function Ts(e){let t,n=vs(),r=ms(),[a,o]=c(e,[`ref`]);return Go({element:()=>t??null,enabled:()=>r.contentPresent()&&n.preventScroll()}),F(ws,i({ref(e){let n=dt(e=>{t=e},a.ref);typeof n==`function`&&n(e)}},o))}var Es=D();function Ds(){let e=y(Es);if(e===void 0)throw Error("[kobalte]: `useMenuGroupContext` must be used within a `Menu.Group` component");return e}function Os(e){let t=Y({id:vs().generateId(`group-${P()}`)},e),[n,r]=I(),a={generateId:It(()=>t.id),registerLabelId:co(r)};return F(Es.Provider,{value:a,get children(){return F(X,i({as:`div`,role:`group`,get"aria-labelledby"(){return n()}},t))}})}function ks(e){let n=Ds(),r=Y({id:n.generateId(`label`)},e),[a,o]=c(r,[`id`]);return N(()=>t(n.registerLabelId(a.id))),F(X,i({as:`span`,get id(){return a.id},"aria-hidden":`true`},o))}function As(e){let t=ms(),n=Y({children:`▼`},e);return F(X,i({as:`span`,"aria-hidden":`true`},()=>t.dataset(),n))}function js(e){return F(ys,i({role:`menuitem`,closeOnSelect:!0},e))}function Ms(e){let n=gs(),r=Y({id:n.generateId(`description`)},e),[a,o]=c(r,[`id`]);return N(()=>t(n.registerDescription(a.id))),F(X,i({as:`div`,get id(){return a.id}},()=>n.dataset(),o))}function Ns(t){let n=gs(),r=Y({id:n.generateId(`indicator`)},t),[a,o]=c(r,[`forceMount`]);return F(e,{get when(){return a.forceMount||n.isChecked()},get children(){return F(X,i({as:`div`},()=>n.dataset(),o))}})}function Ps(e){let n=gs(),r=Y({id:n.generateId(`label`)},e),[a,o]=c(r,[`ref`,`id`]);return N(()=>t(n.registerLabel(a.id))),F(X,i({as:`div`,ref(e){let t=dt(n.setLabelRef,a.ref);typeof t==`function`&&t(e)},get id(){return a.id}},()=>n.dataset(),o))}function Fs(t){let n=ms();return F(e,{get when(){return n.contentPresent()},get children(){return F(h,t)}})}var Is=D();function Ls(){let e=y(Is);if(e===void 0)throw Error("[kobalte]: `useMenuRadioGroupContext` must be used within a `Menu.RadioGroup` component");return e}function Rs(e){let t=Y({id:vs().generateId(`radiogroup-${P()}`)},e),[n,r]=c(t,[`value`,`defaultValue`,`onChange`,`disabled`]),[i,a]=Nn({value:()=>n.value,defaultValue:()=>n.defaultValue,onChange:e=>n.onChange?.(e)});return F(Is.Provider,{value:{isDisabled:()=>n.disabled,isSelectedValue:e=>e===i(),setSelectedValue:e=>a(e)},get children(){return F(Os,r)}})}function zs(e){let t=Ls(),n=Y({closeOnSelect:!1},e),[r,a]=c(n,[`value`,`onSelect`]);return F(ys,i({role:`menuitemradio`,get checked(){return t.isSelectedValue(r.value)},onSelect:()=>{r.onSelect?.(),t.setSelectedValue(r.value)}},a))}function Bs(e,t,n){let r=e.split(`-`)[0],i=n.getBoundingClientRect(),a=[],o=t.clientX,s=t.clientY;switch(r){case`top`:a.push([o,s+5]),a.push([i.left,i.bottom]),a.push([i.left,i.top]),a.push([i.right,i.top]),a.push([i.right,i.bottom]);break;case`right`:a.push([o-5,s]),a.push([i.left,i.top]),a.push([i.right,i.top]),a.push([i.right,i.bottom]),a.push([i.left,i.bottom]);break;case`bottom`:a.push([o,s-5]),a.push([i.right,i.top]),a.push([i.right,i.bottom]),a.push([i.left,i.bottom]),a.push([i.left,i.top]);break;case`left`:a.push([o+5,s]),a.push([i.right,i.bottom]),a.push([i.left,i.bottom]),a.push([i.left,i.top]),a.push([i.right,i.top])}return a}function Vs(e,t){return t?_n([e.clientX,e.clientY],t):!1}function Hs(n){let r=vs(),a=mr(),o=ps(),s=ls(),l=ds(),u=Y({placement:r.orientation()===`horizontal`?`bottom-start`:`right-start`},n),[d,f]=c(u,[`open`,`defaultOpen`,`onOpenChange`]),p=0,m=null,h=`right`,[g,_]=I(),[v,y]=I(),[b,x]=I(),[S,C]=I(),[w,T]=I(!0),[E,D]=I(f.placement),[O,ee]=I([]),[k,te]=I([]),{DomCollectionProvider:A}=Cr({items:k,onItemsChange:te}),j=so({open:()=>d.open,defaultOpen:()=>d.defaultOpen,onOpenChange:e=>d.onOpenChange?.(e)}),{present:ne}=uo({show:()=>r.forceMount()||j.isOpen(),element:()=>S()??null}),M=fr({selectionMode:`none`,dataSource:k}),P=e=>{T(e),j.open()},re=(e=!1)=>{j.close(),e&&o&&o.close(!0)},ie=e=>{T(e),j.toggle()},L=()=>{let e=S();e&&(Xt(e),M.selectionManager().setFocused(!0),M.selectionManager().setFocusedKey(void 0))},ae=()=>{l==null?L():setTimeout(()=>L())},oe=e=>{ee(t=>[...t,e]);let t=o?.registerNestedMenu(e);return()=>{ee(t=>Mt(t,e)),t?.()}},z=e=>h===m?.side&&Vs(e,m?.area),se=e=>{z(e)&&e.preventDefault()},ce=e=>{z(e)||ae()},B=e=>{z(e)&&e.preventDefault()};Oo({isDisabled:()=>!(o==null&&j.isOpen()&&r.isModal()),targets:()=>[S(),...O()].filter(Boolean)}),N(()=>{let e=S();if(!e||!o)return;let n=o.registerNestedMenu(e);t(()=>{n()})}),N(()=>{o===void 0&&s?.registerMenu(r.value(),[S(),...O()])}),N(()=>{o===void 0&&s!==void 0&&(s.value()===r.value()?(b()?.focus(),s.autoFocusMenu()&&P(!0)):re())}),N(()=>{o===void 0&&s!==void 0&&j.isOpen()&&s.setValue(r.value())}),t(()=>{o===void 0&&s?.unregisterMenu(r.value())});let le={dataset:R(()=>({"data-expanded":j.isOpen()?``:void 0,"data-closed":j.isOpen()?void 0:``})),isOpen:j.isOpen,contentPresent:ne,nestedMenus:O,currentPlacement:E,pointerGraceTimeoutId:()=>p,autoFocus:w,listState:()=>M,parentMenuContext:()=>o,triggerRef:b,contentRef:S,triggerId:g,contentId:v,setTriggerRef:x,setContentRef:C,open:P,close:re,toggle:ie,focusContent:ae,onItemEnter:se,onItemLeave:ce,onTriggerLeave:B,setPointerDir:e=>h=e,setPointerGraceTimeoutId:e=>p=e,setPointerGraceIntent:e=>m=e,registerNestedMenu:oe,registerItemToParentDomCollection:a?.registerItem,registerTriggerId:co(_),registerContentId:co(y)};return F(A,{get children(){return F(fs.Provider,{value:le,get children(){return F(e,{when:l===void 0,get fallback(){return f.children},get children(){return F(Ia,i({anchorRef:b,contentRef:S,onCurrentPlacementChange:D},f))}})}})}})}function Us(e){let{direction:t}=Yn();return F(Hs,i({get placement(){return t()===`rtl`?`left-start`:`right-start`},flip:!0},e))}var Ws={close:(e,t)=>e===`ltr`?[t===`horizontal`?`ArrowLeft`:`ArrowUp`]:[t===`horizontal`?`ArrowRight`:`ArrowDown`]};function Gs(e){let t=ms(),n=vs(),[r,a]=c(e,[`onFocusOutside`,`onKeyDown`]),{direction:o}=Yn();return F(ws,i({onOpenAutoFocus:e=>{e.preventDefault()},onCloseAutoFocus:e=>{e.preventDefault()},onFocusOutside:e=>{r.onFocusOutside?.(e);let n=e.target;Lt(t.triggerRef(),n)||t.close()},onKeyDown:e=>{q(e,r.onKeyDown);let i=Lt(e.currentTarget,e.target),a=Ws.close(o(),n.orientation()).includes(e.key),s=t.parentMenuContext()!=null;i&&a&&s&&(t.close(),Xt(t.triggerRef()))}},a))}var Ks=[`Enter`,` `],qs={open:(e,t)=>e===`ltr`?[...Ks,t===`horizontal`?`ArrowRight`:`ArrowDown`]:[...Ks,t===`horizontal`?`ArrowLeft`:`ArrowUp`]};function Js(e){let n,r=vs(),o=ms(),s=Y({id:r.generateId(`sub-trigger-${P()}`)},e),[l,u]=c(s,[`ref`,`id`,`textValue`,`disabled`,`onPointerMove`,`onPointerLeave`,`onPointerDown`,`onPointerUp`,`onClick`,`onKeyDown`,`onMouseDown`,`onFocus`]),d=null,f=()=>{d&&window.clearTimeout(d),d=null},{direction:p}=Yn(),m=()=>l.id,h=()=>{let e=o.parentMenuContext();if(e==null)throw Error("[kobalte]: `Menu.SubTrigger` must be used within a `Menu.Sub` component");return e.listState().selectionManager()},g=()=>o.listState().collection(),_=()=>h().focusedKey()===m(),v=lr({key:m,selectionManager:h,shouldSelectOnPressUp:!0,allowsDifferentPressOrigin:!0,disabled:()=>l.disabled},()=>n),y=e=>{q(e,l.onClick),!o.isOpen()&&!l.disabled&&o.open(!0)},b=e=>{if(q(e,l.onPointerMove),e.pointerType!==`mouse`)return;let t=o.parentMenuContext();t?.onItemEnter(e),e.defaultPrevented||(l.disabled?t?.onItemLeave(e):(!o.isOpen()&&!d&&(o.parentMenuContext()?.setPointerGraceIntent(null),d=window.setTimeout(()=>{o.open(!1),f()},100)),t?.onItemEnter(e),e.defaultPrevented||(o.listState().selectionManager().isFocused()&&(o.listState().selectionManager().setFocused(!1),o.listState().selectionManager().setFocusedKey(void 0)),Xt(e.currentTarget),t?.listState().selectionManager().setFocused(!0),t?.listState().selectionManager().setFocusedKey(m()))))},x=e=>{if(q(e,l.onPointerLeave),e.pointerType!==`mouse`)return;f();let t=o.parentMenuContext(),n=o.contentRef();if(n){t?.setPointerGraceIntent({area:Bs(o.currentPlacement(),e,n),side:o.currentPlacement().split(`-`)[0]}),window.clearTimeout(t?.pointerGraceTimeoutId());let r=window.setTimeout(()=>{t?.setPointerGraceIntent(null)},300);t?.setPointerGraceTimeoutId(r)}else{if(t?.onTriggerLeave(e),e.defaultPrevented)return;t?.setPointerGraceIntent(null)}t?.onItemLeave(e)},S=e=>{q(e,l.onKeyDown),e.repeat||l.disabled||qs.open(p(),r.orientation()).includes(e.key)&&(e.stopPropagation(),e.preventDefault(),h().setFocused(!1),h().setFocusedKey(void 0),o.isOpen()||o.open(`first`),o.focusContent(),o.listState().selectionManager().setFocused(!0),o.listState().selectionManager().setFocusedKey(g().getFirstKey()))};return N(()=>{if(o.registerItemToParentDomCollection==null)throw Error("[kobalte]: `Menu.SubTrigger` must be used within a `Menu.Sub` component");let e=o.registerItemToParentDomCollection({ref:()=>n,type:`item`,key:m(),textValue:l.textValue??n?.textContent??``,disabled:l.disabled??!1});t(e)}),N(M(()=>o.parentMenuContext()?.pointerGraceTimeoutId(),e=>{t(()=>{window.clearTimeout(e),o.parentMenuContext()?.setPointerGraceIntent(null)})})),N(()=>t(o.registerTriggerId(l.id))),t(()=>{f()}),F(X,i({as:`div`,ref(e){let t=dt(e=>{o.setTriggerRef(e),n=e},l.ref);typeof t==`function`&&t(e)},get id(){return l.id},role:`menuitem`,get tabIndex(){return v.tabIndex()},"aria-haspopup":`true`,get"aria-expanded"(){return o.isOpen()},get"aria-controls"(){return a(()=>!!o.isOpen())()?o.contentId():void 0},get"aria-disabled"(){return l.disabled},get"data-key"(){return v.dataKey()},get"data-highlighted"(){return _()?``:void 0},get"data-disabled"(){return l.disabled?``:void 0},get onPointerDown(){return J([l.onPointerDown,v.onPointerDown])},get onPointerUp(){return J([l.onPointerUp,v.onPointerUp])},get onClick(){return J([y,v.onClick])},get onKeyDown(){return J([S,v.onKeyDown])},get onMouseDown(){return J([l.onMouseDown,v.onMouseDown])},get onFocus(){return J([l.onFocus,v.onFocus])},onPointerMove:b,onPointerLeave:x},()=>o.dataset(),u))}function Ys(e){let t=ls(),n=Y({id:`menu-${P()}`,modal:!0},e),[r,a]=c(n,[`id`,`modal`,`preventScroll`,`forceMount`,`open`,`defaultOpen`,`onOpenChange`,`value`,`orientation`]),o=so({open:()=>r.open,defaultOpen:()=>r.defaultOpen,onOpenChange:e=>r.onOpenChange?.(e)}),s={isModal:()=>r.modal??!0,preventScroll:()=>r.preventScroll??s.isModal(),forceMount:()=>r.forceMount??!1,generateId:It(()=>r.id),value:()=>r.value,orientation:()=>r.orientation??t?.orientation()??`horizontal`};return F(_s.Provider,{value:s,get children(){return F(Hs,i({get open(){return o.isOpen()},get onOpenChange(){return o.setIsOpen}},a))}})}On({},{Root:()=>Xs,Separator:()=>Zs});function Xs(e){let t,n=Y({orientation:`horizontal`},e),[r,a]=c(n,[`ref`,`orientation`]),o=Tn(()=>t,()=>`hr`);return F(X,i({as:`hr`,ref(e){let n=dt(e=>t=e,r.ref);typeof n==`function`&&n(e)},get role(){return o()===`hr`?void 0:`separator`},get"aria-orientation"(){return r.orientation===`vertical`?`vertical`:void 0},get"data-orientation"(){return r.orientation}},a))}var Zs=Xs,Z={};On(Z,{Arrow:()=>Da,CheckboxItem:()=>bs,Content:()=>Qs,DropdownMenu:()=>ec,Group:()=>Os,GroupLabel:()=>ks,Icon:()=>As,Item:()=>js,ItemDescription:()=>Ms,ItemIndicator:()=>Ns,ItemLabel:()=>Ps,Portal:()=>Fs,RadioGroup:()=>Rs,RadioItem:()=>zs,Root:()=>$s,Separator:()=>Xs,Sub:()=>Us,SubContent:()=>Gs,SubTrigger:()=>Js,Trigger:()=>Cs});function Qs(e){let t=vs(),n=ms(),[r,a]=c(e,[`onCloseAutoFocus`,`onInteractOutside`]),o=!1;return F(Ts,i({onCloseAutoFocus:e=>{r.onCloseAutoFocus?.(e),o||Xt(n.triggerRef()),o=!1,e.preventDefault()},onInteractOutside:e=>{r.onInteractOutside?.(e),(!t.isModal()||e.detail.isContextMenu)&&(o=!0)}},a))}function $s(e){let t=Y({id:`dropdownmenu-${P()}`},e);return F(Ys,t)}var ec=Object.assign($s,{Arrow:Da,CheckboxItem:bs,Content:Qs,Group:Os,GroupLabel:ks,Icon:As,Item:js,ItemDescription:Ms,ItemIndicator:Ns,ItemLabel:Ps,Portal:Fs,RadioGroup:Rs,RadioItem:zs,Separator:Xs,Sub:Us,SubContent:Gs,SubTrigger:Js,Trigger:Cs}),Q={colors:{inherit:`inherit`,current:`currentColor`,transparent:`transparent`,black:`#000000`,white:`#ffffff`,neutral:{50:`#f9fafb`,100:`#f2f4f7`,200:`#eaecf0`,300:`#d0d5dd`,400:`#98a2b3`,500:`#667085`,600:`#475467`,700:`#344054`,800:`#1d2939`,900:`#101828`},darkGray:{50:`#525c7a`,100:`#49536e`,200:`#414962`,300:`#394056`,400:`#313749`,500:`#292e3d`,600:`#212530`,700:`#191c24`,800:`#111318`,900:`#0b0d10`},gray:{50:`#f9fafb`,100:`#f2f4f7`,200:`#eaecf0`,300:`#d0d5dd`,400:`#98a2b3`,500:`#667085`,600:`#475467`,700:`#344054`,800:`#1d2939`,900:`#101828`},blue:{25:`#F5FAFF`,50:`#EFF8FF`,100:`#D1E9FF`,200:`#B2DDFF`,300:`#84CAFF`,400:`#53B1FD`,500:`#2E90FA`,600:`#1570EF`,700:`#175CD3`,800:`#1849A9`,900:`#194185`},green:{25:`#F6FEF9`,50:`#ECFDF3`,100:`#D1FADF`,200:`#A6F4C5`,300:`#6CE9A6`,400:`#32D583`,500:`#12B76A`,600:`#039855`,700:`#027A48`,800:`#05603A`,900:`#054F31`},red:{50:`#fef2f2`,100:`#fee2e2`,200:`#fecaca`,300:`#fca5a5`,400:`#f87171`,500:`#ef4444`,600:`#dc2626`,700:`#b91c1c`,800:`#991b1b`,900:`#7f1d1d`,950:`#450a0a`},yellow:{25:`#FFFCF5`,50:`#FFFAEB`,100:`#FEF0C7`,200:`#FEDF89`,300:`#FEC84B`,400:`#FDB022`,500:`#F79009`,600:`#DC6803`,700:`#B54708`,800:`#93370D`,900:`#7A2E0E`},purple:{25:`#FAFAFF`,50:`#F4F3FF`,100:`#EBE9FE`,200:`#D9D6FE`,300:`#BDB4FE`,400:`#9B8AFB`,500:`#7A5AF8`,600:`#6938EF`,700:`#5925DC`,800:`#4A1FB8`,900:`#3E1C96`},teal:{25:`#F6FEFC`,50:`#F0FDF9`,100:`#CCFBEF`,200:`#99F6E0`,300:`#5FE9D0`,400:`#2ED3B7`,500:`#15B79E`,600:`#0E9384`,700:`#107569`,800:`#125D56`,900:`#134E48`},pink:{25:`#fdf2f8`,50:`#fce7f3`,100:`#fbcfe8`,200:`#f9a8d4`,300:`#f472b6`,400:`#ec4899`,500:`#db2777`,600:`#be185d`,700:`#9d174d`,800:`#831843`,900:`#500724`},cyan:{25:`#ecfeff`,50:`#cffafe`,100:`#a5f3fc`,200:`#67e8f9`,300:`#22d3ee`,400:`#06b6d4`,500:`#0891b2`,600:`#0e7490`,700:`#155e75`,800:`#164e63`,900:`#083344`}},alpha:{100:`ff`,90:`e5`,80:`cc`,70:`b3`,60:`99`,50:`80`,40:`66`,30:`4d`,20:`33`,10:`1a`,0:`00`},font:{size:{"2xs":`calc(var(--tsqd-font-size) * 0.625)`,xs:`calc(var(--tsqd-font-size) * 0.75)`,sm:`calc(var(--tsqd-font-size) * 0.875)`,md:`var(--tsqd-font-size)`,lg:`calc(var(--tsqd-font-size) * 1.125)`,xl:`calc(var(--tsqd-font-size) * 1.25)`,"2xl":`calc(var(--tsqd-font-size) * 1.5)`,"3xl":`calc(var(--tsqd-font-size) * 1.875)`,"4xl":`calc(var(--tsqd-font-size) * 2.25)`,"5xl":`calc(var(--tsqd-font-size) * 3)`,"6xl":`calc(var(--tsqd-font-size) * 3.75)`,"7xl":`calc(var(--tsqd-font-size) * 4.5)`,"8xl":`calc(var(--tsqd-font-size) * 6)`,"9xl":`calc(var(--tsqd-font-size) * 8)`},lineHeight:{xs:`calc(var(--tsqd-font-size) * 1)`,sm:`calc(var(--tsqd-font-size) * 1.25)`,md:`calc(var(--tsqd-font-size) * 1.5)`,lg:`calc(var(--tsqd-font-size) * 1.75)`,xl:`calc(var(--tsqd-font-size) * 2)`,"2xl":`calc(var(--tsqd-font-size) * 2.25)`,"3xl":`calc(var(--tsqd-font-size) * 2.5)`,"4xl":`calc(var(--tsqd-font-size) * 2.75)`,"5xl":`calc(var(--tsqd-font-size) * 3)`,"6xl":`calc(var(--tsqd-font-size) * 3.25)`,"7xl":`calc(var(--tsqd-font-size) * 3.5)`,"8xl":`calc(var(--tsqd-font-size) * 3.75)`,"9xl":`calc(var(--tsqd-font-size) * 4)`},weight:{thin:`100`,extralight:`200`,light:`300`,normal:`400`,medium:`500`,semibold:`600`,bold:`700`,extrabold:`800`,black:`900`}},breakpoints:{xs:`320px`,sm:`640px`,md:`768px`,lg:`1024px`,xl:`1280px`,"2xl":`1536px`},border:{radius:{none:`0px`,xs:`calc(var(--tsqd-font-size) * 0.125)`,sm:`calc(var(--tsqd-font-size) * 0.25)`,md:`calc(var(--tsqd-font-size) * 0.375)`,lg:`calc(var(--tsqd-font-size) * 0.5)`,xl:`calc(var(--tsqd-font-size) * 0.75)`,"2xl":`calc(var(--tsqd-font-size) * 1)`,"3xl":`calc(var(--tsqd-font-size) * 1.5)`,full:`9999px`}},size:{0:`0px`,.25:`calc(var(--tsqd-font-size) * 0.0625)`,.5:`calc(var(--tsqd-font-size) * 0.125)`,1:`calc(var(--tsqd-font-size) * 0.25)`,1.5:`calc(var(--tsqd-font-size) * 0.375)`,2:`calc(var(--tsqd-font-size) * 0.5)`,2.5:`calc(var(--tsqd-font-size) * 0.625)`,3:`calc(var(--tsqd-font-size) * 0.75)`,3.5:`calc(var(--tsqd-font-size) * 0.875)`,4:`calc(var(--tsqd-font-size) * 1)`,4.5:`calc(var(--tsqd-font-size) * 1.125)`,5:`calc(var(--tsqd-font-size) * 1.25)`,5.5:`calc(var(--tsqd-font-size) * 1.375)`,6:`calc(var(--tsqd-font-size) * 1.5)`,6.5:`calc(var(--tsqd-font-size) * 1.625)`,7:`calc(var(--tsqd-font-size) * 1.75)`,8:`calc(var(--tsqd-font-size) * 2)`,9:`calc(var(--tsqd-font-size) * 2.25)`,10:`calc(var(--tsqd-font-size) * 2.5)`,11:`calc(var(--tsqd-font-size) * 2.75)`,12:`calc(var(--tsqd-font-size) * 3)`,14:`calc(var(--tsqd-font-size) * 3.5)`,16:`calc(var(--tsqd-font-size) * 4)`,20:`calc(var(--tsqd-font-size) * 5)`,24:`calc(var(--tsqd-font-size) * 6)`,28:`calc(var(--tsqd-font-size) * 7)`,32:`calc(var(--tsqd-font-size) * 8)`,36:`calc(var(--tsqd-font-size) * 9)`,40:`calc(var(--tsqd-font-size) * 10)`,44:`calc(var(--tsqd-font-size) * 11)`,48:`calc(var(--tsqd-font-size) * 12)`,52:`calc(var(--tsqd-font-size) * 13)`,56:`calc(var(--tsqd-font-size) * 14)`,60:`calc(var(--tsqd-font-size) * 15)`,64:`calc(var(--tsqd-font-size) * 16)`,72:`calc(var(--tsqd-font-size) * 18)`,80:`calc(var(--tsqd-font-size) * 20)`,96:`calc(var(--tsqd-font-size) * 24)`},shadow:{xs:(e=`rgb(0 0 0 / 0.1)`)=>`0 1px 2px 0 rgb(0 0 0 / 0.05)`,sm:(e=`rgb(0 0 0 / 0.1)`)=>`0 1px 3px 0 ${e}, 0 1px 2px -1px ${e}`,md:(e=`rgb(0 0 0 / 0.1)`)=>`0 4px 6px -1px ${e}, 0 2px 4px -2px ${e}`,lg:(e=`rgb(0 0 0 / 0.1)`)=>`0 10px 15px -3px ${e}, 0 4px 6px -4px ${e}`,xl:(e=`rgb(0 0 0 / 0.1)`)=>`0 20px 25px -5px ${e}, 0 8px 10px -6px ${e}`,"2xl":(e=`rgb(0 0 0 / 0.25)`)=>`0 25px 50px -12px ${e}`,inner:(e=`rgb(0 0 0 / 0.05)`)=>`inset 0 2px 4px 0 ${e}`,none:()=>`none`},zIndices:{hide:-1,auto:`auto`,base:0,docked:10,dropdown:1e3,sticky:1100,banner:1200,overlay:1300,modal:1400,popover:1500,skipLink:1600,toast:1700,tooltip:1800}},tc=B(`<svg width=14 height=14 viewBox="0 0 14 14"fill=none xmlns=http://www.w3.org/2000/svg><path d="M13 13L9.00007 9M10.3333 5.66667C10.3333 8.244 8.244 10.3333 5.66667 10.3333C3.08934 10.3333 1 8.244 1 5.66667C1 3.08934 3.08934 1 5.66667 1C8.244 1 10.3333 3.08934 10.3333 5.66667Z"stroke=currentColor stroke-width=1.66667 stroke-linecap=round stroke-linejoin=round>`),nc=B(`<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M9 3H15M3 6H21M19 6L18.2987 16.5193C18.1935 18.0975 18.1409 18.8867 17.8 19.485C17.4999 20.0118 17.0472 20.4353 16.5017 20.6997C15.882 21 15.0911 21 13.5093 21H10.4907C8.90891 21 8.11803 21 7.49834 20.6997C6.95276 20.4353 6.50009 20.0118 6.19998 19.485C5.85911 18.8867 5.8065 18.0975 5.70129 16.5193L5 6M10 10.5V15.5M14 10.5V15.5"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),rc=B(`<svg width=10 height=6 viewBox="0 0 10 6"fill=none xmlns=http://www.w3.org/2000/svg><path d="M1 1L5 5L9 1"stroke=currentColor stroke-width=1.66667 stroke-linecap=round stroke-linejoin=round>`),ic=B(`<svg width=12 height=12 viewBox="0 0 16 16"fill=none xmlns=http://www.w3.org/2000/svg><path d="M8 13.3333V2.66667M8 2.66667L4 6.66667M8 2.66667L12 6.66667"stroke=currentColor stroke-width=1.66667 stroke-linecap=round stroke-linejoin=round>`),ac=B(`<svg width=12 height=12 viewBox="0 0 16 16"fill=none xmlns=http://www.w3.org/2000/svg><path d="M8 2.66667V13.3333M8 13.3333L4 9.33333M8 13.3333L12 9.33333"stroke=currentColor stroke-width=1.66667 stroke-linecap=round stroke-linejoin=round>`),oc=B(`<svg width=12 height=12 viewBox="0 0 16 16"fill=none xmlns=http://www.w3.org/2000/svg style=transform:rotate(90deg)><path d="M8 2.66667V13.3333M8 13.3333L4 9.33333M8 13.3333L12 9.33333"stroke=currentColor stroke-width=1.66667 stroke-linecap=round stroke-linejoin=round>`),sc=B(`<svg width=12 height=12 viewBox="0 0 16 16"fill=none xmlns=http://www.w3.org/2000/svg style=transform:rotate(-90deg)><path d="M8 2.66667V13.3333M8 13.3333L4 9.33333M8 13.3333L12 9.33333"stroke=currentColor stroke-width=1.66667 stroke-linecap=round stroke-linejoin=round>`),cc=B(`<svg viewBox="0 0 24 24"height=12 width=12 fill=none xmlns=http://www.w3.org/2000/svg><path d="M12 2v2m0 16v2M4 12H2m4.314-5.686L4.9 4.9m12.786 1.414L19.1 4.9M6.314 17.69 4.9 19.104m12.786-1.414 1.414 1.414M22 12h-2m-3 0a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),lc=B(`<svg viewBox="0 0 24 24"height=12 width=12 fill=none xmlns=http://www.w3.org/2000/svg><path d="M22 15.844a10.424 10.424 0 0 1-4.306.925c-5.779 0-10.463-4.684-10.463-10.462 0-1.536.33-2.994.925-4.307A10.464 10.464 0 0 0 2 11.538C2 17.316 6.684 22 12.462 22c4.243 0 7.896-2.526 9.538-6.156Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),uc=B(`<svg viewBox="0 0 24 24"height=12 width=12 fill=none xmlns=http://www.w3.org/2000/svg><path d="M8 21h8m-4-4v4m-5.2-4h10.4c1.68 0 2.52 0 3.162-.327a3 3 0 0 0 1.311-1.311C22 14.72 22 13.88 22 12.2V7.8c0-1.68 0-2.52-.327-3.162a3 3 0 0 0-1.311-1.311C19.72 3 18.88 3 17.2 3H6.8c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.311 1.311C2 5.28 2 6.12 2 7.8v4.4c0 1.68 0 2.52.327 3.162a3 3 0 0 0 1.311 1.311C4.28 17 5.12 17 6.8 17Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),dc=B(`<svg stroke=currentColor fill=currentColor stroke-width=0 viewBox="0 0 24 24"height=1em width=1em xmlns=http://www.w3.org/2000/svg><path fill=none d="M0 0h24v24H0z"></path><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3a4.237 4.237 0 00-6 0zm-4-4l2 2a7.074 7.074 0 0110 0l2-2C15.14 9.14 8.87 9.14 5 13z">`),fc=B(`<svg stroke-width=0 viewBox="0 0 24 24"height=1em width=1em xmlns=http://www.w3.org/2000/svg><path fill=none d="M24 .01c0-.01 0-.01 0 0L0 0v24h24V.01zM0 0h24v24H0V0zm0 0h24v24H0V0z"></path><path d="M22.99 9C19.15 5.16 13.8 3.76 8.84 4.78l2.52 2.52c3.47-.17 6.99 1.05 9.63 3.7l2-2zm-4 4a9.793 9.793 0 00-4.49-2.56l3.53 3.53.96-.97zM2 3.05L5.07 6.1C3.6 6.82 2.22 7.78 1 9l1.99 2c1.24-1.24 2.67-2.16 4.2-2.77l2.24 2.24A9.684 9.684 0 005 13v.01L6.99 15a7.042 7.042 0 014.92-2.06L18.98 20l1.27-1.26L3.29 1.79 2 3.05zM9 17l3 3 3-3a4.237 4.237 0 00-6 0z">`),pc=B(`<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M9.3951 19.3711L9.97955 20.6856C10.1533 21.0768 10.4368 21.4093 10.7958 21.6426C11.1547 21.8759 11.5737 22.0001 12.0018 22C12.4299 22.0001 12.8488 21.8759 13.2078 21.6426C13.5667 21.4093 13.8503 21.0768 14.024 20.6856L14.6084 19.3711C14.8165 18.9047 15.1664 18.5159 15.6084 18.26C16.0532 18.0034 16.5678 17.8941 17.0784 17.9478L18.5084 18.1C18.9341 18.145 19.3637 18.0656 19.7451 17.8713C20.1265 17.6771 20.4434 17.3763 20.6573 17.0056C20.8715 16.635 20.9735 16.2103 20.9511 15.7829C20.9286 15.3555 20.7825 14.9438 20.5307 14.5978L19.684 13.4344C19.3825 13.0171 19.2214 12.5148 19.224 12C19.2239 11.4866 19.3865 10.9864 19.6884 10.5711L20.5351 9.40778C20.787 9.06175 20.933 8.65007 20.9555 8.22267C20.978 7.79528 20.8759 7.37054 20.6618 7C20.4479 6.62923 20.131 6.32849 19.7496 6.13423C19.3681 5.93997 18.9386 5.86053 18.5129 5.90556L17.0829 6.05778C16.5722 6.11141 16.0577 6.00212 15.6129 5.74556C15.17 5.48825 14.82 5.09736 14.6129 4.62889L14.024 3.31444C13.8503 2.92317 13.5667 2.59072 13.2078 2.3574C12.8488 2.12408 12.4299 1.99993 12.0018 2C11.5737 1.99993 11.1547 2.12408 10.7958 2.3574C10.4368 2.59072 10.1533 2.92317 9.97955 3.31444L9.3951 4.62889C9.18803 5.09736 8.83798 5.48825 8.3951 5.74556C7.95032 6.00212 7.43577 6.11141 6.9251 6.05778L5.49066 5.90556C5.06499 5.86053 4.6354 5.93997 4.25397 6.13423C3.87255 6.32849 3.55567 6.62923 3.34177 7C3.12759 7.37054 3.02555 7.79528 3.04804 8.22267C3.07052 8.65007 3.21656 9.06175 3.46844 9.40778L4.3151 10.5711C4.61704 10.9864 4.77964 11.4866 4.77955 12C4.77964 12.5134 4.61704 13.0137 4.3151 13.4289L3.46844 14.5922C3.21656 14.9382 3.07052 15.3499 3.04804 15.7773C3.02555 16.2047 3.12759 16.6295 3.34177 17C3.55589 17.3706 3.8728 17.6712 4.25417 17.8654C4.63554 18.0596 5.06502 18.1392 5.49066 18.0944L6.92066 17.9422C7.43133 17.8886 7.94587 17.9979 8.39066 18.2544C8.83519 18.511 9.18687 18.902 9.3951 19.3711Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round></path><path d="M12 15C13.6568 15 15 13.6569 15 12C15 10.3431 13.6568 9 12 9C10.3431 9 8.99998 10.3431 8.99998 12C8.99998 13.6569 10.3431 15 12 15Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),mc=B(`<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M16 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V8M11.5 12.5L17 7M17 7H12M17 7V12M6.2 21H8.8C9.9201 21 10.4802 21 10.908 20.782C11.2843 20.5903 11.5903 20.2843 11.782 19.908C12 19.4802 12 18.9201 12 17.8V15.2C12 14.0799 12 13.5198 11.782 13.092C11.5903 12.7157 11.2843 12.4097 10.908 12.218C10.4802 12 9.92011 12 8.8 12H6.2C5.0799 12 4.51984 12 4.09202 12.218C3.71569 12.4097 3.40973 12.7157 3.21799 13.092C3 13.5198 3 14.0799 3 15.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),hc=B(`<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path class=copier d="M8 8V5.2C8 4.0799 8 3.51984 8.21799 3.09202C8.40973 2.71569 8.71569 2.40973 9.09202 2.21799C9.51984 2 10.0799 2 11.2 2H18.8C19.9201 2 20.4802 2 20.908 2.21799C21.2843 2.40973 21.5903 2.71569 21.782 3.09202C22 3.51984 22 4.0799 22 5.2V12.8C22 13.9201 22 14.4802 21.782 14.908C21.5903 15.2843 21.2843 15.5903 20.908 15.782C20.4802 16 19.9201 16 18.8 16H16M5.2 22H12.8C13.9201 22 14.4802 22 14.908 21.782C15.2843 21.5903 15.5903 21.2843 15.782 20.908C16 20.4802 16 19.9201 16 18.8V11.2C16 10.0799 16 9.51984 15.782 9.09202C15.5903 8.71569 15.2843 8.40973 14.908 8.21799C14.4802 8 13.9201 8 12.8 8H5.2C4.0799 8 3.51984 8 3.09202 8.21799C2.71569 8.40973 2.40973 8.71569 2.21799 9.09202C2 9.51984 2 10.0799 2 11.2V18.8C2 19.9201 2 20.4802 2.21799 20.908C2.40973 21.2843 2.71569 21.5903 3.09202 21.782C3.51984 22 4.07989 22 5.2 22Z"stroke-width=2 stroke-linecap=round stroke-linejoin=round stroke=currentColor>`),gc=B(`<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M2.5 21.4998L8.04927 19.3655C8.40421 19.229 8.58168 19.1607 8.74772 19.0716C8.8952 18.9924 9.0358 18.901 9.16804 18.7984C9.31692 18.6829 9.45137 18.5484 9.72028 18.2795L21 6.99982C22.1046 5.89525 22.1046 4.10438 21 2.99981C19.8955 1.89525 18.1046 1.89524 17 2.99981L5.72028 14.2795C5.45138 14.5484 5.31692 14.6829 5.20139 14.8318C5.09877 14.964 5.0074 15.1046 4.92823 15.2521C4.83911 15.4181 4.77085 15.5956 4.63433 15.9506L2.5 21.4998ZM2.5 21.4998L4.55812 16.1488C4.7054 15.7659 4.77903 15.5744 4.90534 15.4867C5.01572 15.4101 5.1523 15.3811 5.2843 15.4063C5.43533 15.4351 5.58038 15.5802 5.87048 15.8703L8.12957 18.1294C8.41967 18.4195 8.56472 18.5645 8.59356 18.7155C8.61877 18.8475 8.58979 18.9841 8.51314 19.0945C8.42545 19.2208 8.23399 19.2944 7.85107 19.4417L2.5 21.4998Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),_c=B(`<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M7.5 12L10.5 15L16.5 9M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z"stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),vc=B(`<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M9 9L15 15M15 9L9 15M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z"stroke=#F04438 stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),yc=B(`<svg width=24 height=24 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 xmlns=http://www.w3.org/2000/svg><rect class=list width=20 height=20 y=2 x=2 rx=2></rect><line class=list-item y1=7 y2=7 x1=6 x2=18></line><line class=list-item y2=12 y1=12 x1=6 x2=18></line><line class=list-item y1=17 y2=17 x1=6 x2=18>`),bc=B(`<svg viewBox="0 0 24 24"height=20 width=20 fill=none xmlns=http://www.w3.org/2000/svg><path d="M3 7.8c0-1.68 0-2.52.327-3.162a3 3 0 0 1 1.311-1.311C5.28 3 6.12 3 7.8 3h8.4c1.68 0 2.52 0 3.162.327a3 3 0 0 1 1.311 1.311C21 5.28 21 6.12 21 7.8v8.4c0 1.68 0 2.52-.327 3.162a3 3 0 0 1-1.311 1.311C18.72 21 17.88 21 16.2 21H7.8c-1.68 0-2.52 0-3.162-.327a3 3 0 0 1-1.311-1.311C3 18.72 3 17.88 3 16.2V7.8Z"stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),xc=B(`<svg width=14 height=14 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M7.5 12L10.5 15L16.5 9M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),Sc=B(`<svg width=14 height=14 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M12 2V6M12 18V22M6 12H2M22 12H18M19.0784 19.0784L16.25 16.25M19.0784 4.99994L16.25 7.82837M4.92157 19.0784L7.75 16.25M4.92157 4.99994L7.75 7.82837"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round></path><animateTransform attributeName=transform attributeType=XML type=rotate from=0 to=360 dur=2s repeatCount=indefinite>`),Cc=B(`<svg width=14 height=14 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M15 9L9 15M9 9L15 15M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),wc=B(`<svg width=14 height=14 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M9.5 15V9M14.5 15V9M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),Tc=B(`<svg version=1.0 viewBox="0 0 633 633"><linearGradient x1=-666.45 x2=-666.45 y1=163.28 y2=163.99 gradientTransform="matrix(633 0 0 633 422177 -103358)"gradientUnits=userSpaceOnUse><stop stop-color=#6BDAFF offset=0></stop><stop stop-color=#F9FFB5 offset=.32></stop><stop stop-color=#FFA770 offset=.71></stop><stop stop-color=#FF7373 offset=1></stop></linearGradient><circle cx=316.5 cy=316.5 r=316.5></circle><defs><filter x=-137.5 y=412 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=-137.5 y=412 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=89.5 cy=610.5 rx=214.5 ry=186 fill=#015064 stroke=#00CFE2 stroke-width=25></ellipse></g><defs><filter x=316.5 y=412 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=316.5 y=412 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=543.5 cy=610.5 rx=214.5 ry=186 fill=#015064 stroke=#00CFE2 stroke-width=25></ellipse></g><defs><filter x=-137.5 y=450 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=-137.5 y=450 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=89.5 cy=648.5 rx=214.5 ry=186 fill=#015064 stroke=#00A8B8 stroke-width=25></ellipse></g><defs><filter x=316.5 y=450 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=316.5 y=450 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=543.5 cy=648.5 rx=214.5 ry=186 fill=#015064 stroke=#00A8B8 stroke-width=25></ellipse></g><defs><filter x=-137.5 y=486 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=-137.5 y=486 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=89.5 cy=684.5 rx=214.5 ry=186 fill=#015064 stroke=#007782 stroke-width=25></ellipse></g><defs><filter x=316.5 y=486 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=316.5 y=486 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=543.5 cy=684.5 rx=214.5 ry=186 fill=#015064 stroke=#007782 stroke-width=25></ellipse></g><defs><filter x=272.2 y=308 width=176.9 height=129.3 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=272.2 y=308 width=176.9 height=129.3 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><line x1=436 x2=431 y1=403.2 y2=431.8 fill=none stroke=#000 stroke-linecap=round stroke-linejoin=bevel stroke-width=11></line><line x1=291 x2=280 y1=341.5 y2=403.5 fill=none stroke=#000 stroke-linecap=round stroke-linejoin=bevel stroke-width=11></line><line x1=332.9 x2=328.6 y1=384.1 y2=411.2 fill=none stroke=#000 stroke-linecap=round stroke-linejoin=bevel stroke-width=11></line><linearGradient x1=-670.75 x2=-671.59 y1=164.4 y2=164.49 gradientTransform="matrix(-184.16 -32.472 -11.461 64.997 -121359 -32126)"gradientUnits=userSpaceOnUse><stop stop-color=#EE2700 offset=0></stop><stop stop-color=#FF008E offset=1></stop></linearGradient><path d="m344.1 363 97.7 17.2c5.8 2.1 8.2 6.1 7.1 12.1s-4.7 9.2-11 9.9l-106-18.7-57.5-59.2c-3.2-4.8-2.9-9.1 0.8-12.8s8.3-4.4 13.7-2.1l55.2 53.6z"clip-rule=evenodd fill-rule=evenodd></path><line x1=428.2 x2=429.1 y1=384.5 y2=378 fill=none stroke=#fff stroke-linecap=round stroke-linejoin=bevel stroke-width=7></line><line x1=395.2 x2=396.1 y1=379.5 y2=373 fill=none stroke=#fff stroke-linecap=round stroke-linejoin=bevel stroke-width=7></line><line x1=362.2 x2=363.1 y1=373.5 y2=367.4 fill=none stroke=#fff stroke-linecap=round stroke-linejoin=bevel stroke-width=7></line><line x1=324.2 x2=328.4 y1=351.3 y2=347.4 fill=none stroke=#fff stroke-linecap=round stroke-linejoin=bevel stroke-width=7></line><line x1=303.2 x2=307.4 y1=331.3 y2=327.4 fill=none stroke=#fff stroke-linecap=round stroke-linejoin=bevel stroke-width=7></line></g><defs><filter x=73.2 y=113.8 width=280.6 height=317.4 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=73.2 y=113.8 width=280.6 height=317.4 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><linearGradient x1=-672.16 x2=-672.16 y1=165.03 y2=166.03 gradientTransform="matrix(-100.18 48.861 97.976 200.88 -83342 -93.059)"gradientUnits=userSpaceOnUse><stop stop-color=#A17500 offset=0></stop><stop stop-color=#5D2100 offset=1></stop></linearGradient><path d="m192.3 203c8.1 37.3 14 73.6 17.8 109.1 3.8 35.4 2.8 75.1-3 119.2l61.2-16.7c-15.6-59-25.2-97.9-28.6-116.6s-10.8-51.9-22.1-99.6l-25.3 4.6"clip-rule=evenodd fill-rule=evenodd></path><g stroke=#2F8A00><linearGradient x1=-660.23 x2=-660.23 y1=166.72 y2=167.72 gradientTransform="matrix(92.683 4.8573 -2.0259 38.657 61680 -3088.6)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m195 183.9s-12.6-22.1-36.5-29.9c-15.9-5.2-34.4-1.5-55.5 11.1 15.9 14.3 29.5 22.6 40.7 24.9 16.8 3.6 51.3-6.1 51.3-6.1z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><linearGradient x1=-661.36 x2=-661.36 y1=164.18 y2=165.18 gradientTransform="matrix(110 5.7648 -6.3599 121.35 73933 -15933)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m194.9 184.5s-47.5-8.5-83.2 15.7c-23.8 16.2-34.3 49.3-31.6 99.4 30.3-27.8 52.1-48.5 65.2-61.9 19.8-20.2 49.6-53.2 49.6-53.2z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><linearGradient x1=-656.79 x2=-656.79 y1=165.15 y2=166.15 gradientTransform="matrix(62.954 3.2993 -3.5023 66.828 42156 -8754.1)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m195 183.9c-0.8-21.9 6-38 20.6-48.2s29.8-15.4 45.5-15.3c-6.1 21.4-14.5 35.8-25.2 43.4s-24.4 14.2-40.9 20.1z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><linearGradient x1=-663.07 x2=-663.07 y1=165.44 y2=166.44 gradientTransform="matrix(152.47 7.9907 -3.0936 59.029 101884 -4318.7)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m194.9 184.5c31.9-30 64.1-39.7 96.7-29s50.8 30.4 54.6 59.1c-35.2-5.5-60.4-9.6-75.8-12.1-15.3-2.6-40.5-8.6-75.5-18z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><linearGradient x1=-662.57 x2=-662.57 y1=164.44 y2=165.44 gradientTransform="matrix(136.46 7.1517 -5.2163 99.533 91536 -11442)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m194.9 184.5c35.8-7.6 65.6-0.2 89.2 22s37.7 49 42.3 80.3c-39.8-9.7-68.3-23.8-85.5-42.4s-32.5-38.5-46-59.9z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><linearGradient x1=-656.43 x2=-656.43 y1=163.86 y2=164.86 gradientTransform="matrix(60.866 3.1899 -8.7773 167.48 41560 -25168)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m194.9 184.5c-33.6 13.8-53.6 35.7-60.1 65.6s-3.6 63.1 8.7 99.6c27.4-40.3 43.2-69.6 47.4-88s5.6-44.1 4-77.2z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><path d="m196.5 182.3c-14.8 21.6-25.1 41.4-30.8 59.4s-9.5 33-11.1 45.1"fill=none stroke-linecap=round stroke-width=8></path><path d="m194.9 185.7c-24.4 1.7-43.8 9-58.1 21.8s-24.7 25.4-31.3 37.8"fill=none stroke-linecap=round stroke-width=8></path><path d="m204.5 176.4c29.7-6.7 52-8.4 67-5.1s26.9 8.6 35.8 15.9"fill=none stroke-linecap=round stroke-width=8></path><path d="m196.5 181.4c20.3 9.9 38.2 20.5 53.9 31.9s27.4 22.1 35.1 32"fill=none stroke-linecap=round stroke-width=8></path></g></g><defs><filter x=50.5 y=399 width=532 height=633 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=50.5 y=399 width=532 height=633 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><linearGradient x1=-666.06 x2=-666.23 y1=163.36 y2=163.75 gradientTransform="matrix(532 0 0 633 354760 -102959)"gradientUnits=userSpaceOnUse><stop stop-color=#FFF400 offset=0></stop><stop stop-color=#3C8700 offset=1></stop></linearGradient><ellipse cx=316.5 cy=715.5 rx=266 ry=316.5></ellipse></g><defs><filter x=391 y=-24 width=288 height=283 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=391 y=-24 width=288 height=283 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><linearGradient x1=-664.56 x2=-664.56 y1=163.79 y2=164.79 gradientTransform="matrix(227 0 0 227 151421 -37204)"gradientUnits=userSpaceOnUse><stop stop-color=#FFDF00 offset=0></stop><stop stop-color=#FF9D00 offset=1></stop></linearGradient><circle cx=565.5 cy=89.5 r=113.5></circle><linearGradient x1=-644.5 x2=-645.77 y1=342 y2=342 gradientTransform="matrix(30 0 0 1 19770 -253)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=427 x2=397 y1=89 y2=89 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-641.56 x2=-642.83 y1=196.02 y2=196.07 gradientTransform="matrix(26.5 0 0 5.5 17439 -1025.5)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=430.5 x2=404 y1=55.5 y2=50 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-643.73 x2=-645 y1=185.83 y2=185.9 gradientTransform="matrix(29 0 0 8 19107 -1361)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=431 x2=402 y1=122 y2=130 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-638.94 x2=-640.22 y1=177.09 y2=177.39 gradientTransform="matrix(24 0 0 13 15783 -2145)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=442 x2=418 y1=153 y2=166 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-633.42 x2=-634.7 y1=172.41 y2=173.31 gradientTransform="matrix(20 0 0 19 13137 -3096)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=464 x2=444 y1=180 y2=199 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-619.05 x2=-619.52 y1=170.82 y2=171.82 gradientTransform="matrix(13.83 0 0 22.85 9050 -3703.4)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=491.4 x2=477.5 y1=203 y2=225.9 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-578.5 x2=-578.63 y1=170.31 y2=171.31 gradientTransform="matrix(7.5 0 0 24.5 4860 -3953)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=524.5 x2=517 y1=219.5 y2=244 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=666.5 x2=666.5 y1=170.31 y2=171.31 gradientTransform="matrix(.5 0 0 24.5 231.5 -3944)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=564.5 x2=565 y1=228.5 y2=253 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12>`);function Ec(){return tc()}function Dc(){return nc()}function Oc(){return rc()}function kc(){return ic()}function Ac(){return ac()}function jc(){return oc()}function Mc(){return sc()}function Nc(){return cc()}function Pc(){return lc()}function Fc(){return uc()}function Ic(){return dc()}function Lc(){return fc()}function Rc(){return pc()}function zc(){return mc()}function Bc(){return hc()}function Vc(){return gc()}function Hc(e){return(()=>{var t=_c(),n=t.firstChild;return O(()=>f(n,`stroke`,e.theme===`dark`?`#12B76A`:`#027A48`)),t})()}function Uc(){return vc()}function Wc(){return yc()}function Gc(t){return[F(e,{get when(){return t.checked},get children(){var e=_c(),n=e.firstChild;return O(()=>f(n,`stroke`,t.theme===`dark`?`#9B8AFB`:`#6938EF`)),e}}),F(e,{get when(){return!t.checked},get children(){var e=bc(),n=e.firstChild;return O(()=>f(n,`stroke`,t.theme===`dark`?`#9B8AFB`:`#6938EF`)),e}})]}function Kc(){return xc()}function qc(){return Sc()}function Jc(){return Cc()}function Yc(){return wc()}function Xc(){let e=P();return(()=>{var t=Tc(),n=t.firstChild,r=n.nextSibling,i=r.nextSibling,a=i.firstChild,o=i.nextSibling,s=o.firstChild,c=o.nextSibling,l=c.nextSibling,u=l.firstChild,d=l.nextSibling,p=d.firstChild,m=d.nextSibling,h=m.nextSibling,g=h.firstChild,_=h.nextSibling,v=_.firstChild,y=_.nextSibling,b=y.nextSibling,x=b.firstChild,S=b.nextSibling,C=S.firstChild,w=S.nextSibling,T=w.nextSibling,E=T.firstChild,D=T.nextSibling,O=D.firstChild,ee=D.nextSibling,k=ee.nextSibling,te=k.firstChild,A=k.nextSibling,j=A.firstChild,ne=A.nextSibling,M=ne.nextSibling,N=M.firstChild,P=M.nextSibling,re=P.firstChild,F=P.nextSibling,I=F.firstChild.nextSibling.nextSibling.nextSibling,ie=I.nextSibling,L=F.nextSibling,ae=L.firstChild,oe=L.nextSibling,R=oe.firstChild,z=oe.nextSibling,se=z.firstChild,ce=se.nextSibling,B=ce.nextSibling.firstChild,le=B.nextSibling,ue=le.nextSibling,de=ue.nextSibling,V=de.nextSibling,fe=V.nextSibling,pe=fe.nextSibling,me=pe.nextSibling,he=me.nextSibling,ge=he.nextSibling,_e=ge.nextSibling,ve=_e.nextSibling,ye=z.nextSibling,be=ye.firstChild,xe=ye.nextSibling,Se=xe.firstChild,Ce=xe.nextSibling,we=Ce.firstChild,Te=we.nextSibling,Ee=Ce.nextSibling,De=Ee.firstChild,Oe=Ee.nextSibling,ke=Oe.firstChild,Ae=Oe.nextSibling,je=Ae.firstChild,Me=je.nextSibling,Ne=Me.nextSibling,Pe=Ne.nextSibling,H=Pe.nextSibling,Fe=H.nextSibling,Ie=Fe.nextSibling,Le=Ie.nextSibling,Re=Le.nextSibling,ze=Re.nextSibling,U=ze.nextSibling,Be=U.nextSibling,Ve=Be.nextSibling,He=Ve.nextSibling,Ue=He.nextSibling,W=Ue.nextSibling,We=W.nextSibling,Ge=We.nextSibling;return f(n,`id`,`a-${e}`),f(r,`fill`,`url(#a-${e})`),f(a,`id`,`am-${e}`),f(o,`id`,`b-${e}`),f(s,`filter`,`url(#am-${e})`),f(c,`mask`,`url(#b-${e})`),f(u,`id`,`ah-${e}`),f(d,`id`,`k-${e}`),f(p,`filter`,`url(#ah-${e})`),f(m,`mask`,`url(#k-${e})`),f(g,`id`,`ae-${e}`),f(_,`id`,`j-${e}`),f(v,`filter`,`url(#ae-${e})`),f(y,`mask`,`url(#j-${e})`),f(x,`id`,`ai-${e}`),f(S,`id`,`i-${e}`),f(C,`filter`,`url(#ai-${e})`),f(w,`mask`,`url(#i-${e})`),f(E,`id`,`aj-${e}`),f(D,`id`,`h-${e}`),f(O,`filter`,`url(#aj-${e})`),f(ee,`mask`,`url(#h-${e})`),f(te,`id`,`ag-${e}`),f(A,`id`,`g-${e}`),f(j,`filter`,`url(#ag-${e})`),f(ne,`mask`,`url(#g-${e})`),f(N,`id`,`af-${e}`),f(P,`id`,`f-${e}`),f(re,`filter`,`url(#af-${e})`),f(F,`mask`,`url(#f-${e})`),f(I,`id`,`m-${e}`),f(ie,`fill`,`url(#m-${e})`),f(ae,`id`,`ak-${e}`),f(oe,`id`,`e-${e}`),f(R,`filter`,`url(#ak-${e})`),f(z,`mask`,`url(#e-${e})`),f(se,`id`,`n-${e}`),f(ce,`fill`,`url(#n-${e})`),f(B,`id`,`r-${e}`),f(le,`fill`,`url(#r-${e})`),f(ue,`id`,`s-${e}`),f(de,`fill`,`url(#s-${e})`),f(V,`id`,`q-${e}`),f(fe,`fill`,`url(#q-${e})`),f(pe,`id`,`p-${e}`),f(me,`fill`,`url(#p-${e})`),f(he,`id`,`o-${e}`),f(ge,`fill`,`url(#o-${e})`),f(_e,`id`,`l-${e}`),f(ve,`fill`,`url(#l-${e})`),f(be,`id`,`al-${e}`),f(xe,`id`,`d-${e}`),f(Se,`filter`,`url(#al-${e})`),f(Ce,`mask`,`url(#d-${e})`),f(we,`id`,`u-${e}`),f(Te,`fill`,`url(#u-${e})`),f(De,`id`,`ad-${e}`),f(Oe,`id`,`c-${e}`),f(ke,`filter`,`url(#ad-${e})`),f(Ae,`mask`,`url(#c-${e})`),f(je,`id`,`t-${e}`),f(Me,`fill`,`url(#t-${e})`),f(Ne,`id`,`v-${e}`),f(Pe,`stroke`,`url(#v-${e})`),f(H,`id`,`aa-${e}`),f(Fe,`stroke`,`url(#aa-${e})`),f(Ie,`id`,`w-${e}`),f(Le,`stroke`,`url(#w-${e})`),f(Re,`id`,`ac-${e}`),f(ze,`stroke`,`url(#ac-${e})`),f(U,`id`,`ab-${e}`),f(Be,`stroke`,`url(#ab-${e})`),f(Ve,`id`,`y-${e}`),f(He,`stroke`,`url(#y-${e})`),f(Ue,`id`,`x-${e}`),f(W,`stroke`,`url(#x-${e})`),f(We,`id`,`z-${e}`),f(Ge,`stroke`,`url(#z-${e})`),t})()}var Zc=B(`<span><svg width=16 height=16 viewBox="0 0 16 16"fill=none xmlns=http://www.w3.org/2000/svg><path d="M6 12L10 8L6 4"stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),Qc=B(`<button title="Copy object to clipboard">`),$c=B(`<button title="Remove all items"aria-label="Remove all items">`),el=B(`<button title="Delete item"aria-label="Delete item">`),tl=B(`<button title="Toggle value"aria-label="Toggle value">`),nl=B(`<button title="Bulk Edit Data"aria-label="Bulk Edit Data">`),rl=B(`<div>`),il=B(`<div><button> <span></span> <span> `),al=B(`<input>`),ol=B(`<span>`),sl=B(`<div><label>:`),cl=B(`<div><div><button> [<!>...<!>]`);function ll(e,t){let n=0,r=[];for(;n<e.length;)r.push(e.slice(n,n+t)),n+=t;return r}var ul=e=>{let t=U(),n=H().shadowDOMTarget?G.bind({target:H().shadowDOMTarget}):G,r=R(()=>t()===`dark`?yl(n):vl(n));return(()=>{var t=Zc();return O(()=>L(t,K(r().expander,n`
          transform: rotate(${e.expanded?90:0}deg);
        `,e.expanded&&n`
            & svg {
              top: -1px;
            }
          `))),t})()},dl=e=>{let t=U(),n=H().shadowDOMTarget?G.bind({target:H().shadowDOMTarget}):G,r=R(()=>t()===`dark`?yl(n):vl(n)),[i,a]=I(`NoCopy`);return(()=>{var n=Qc();return oe(n,`click`,i()===`NoCopy`?()=>{navigator.clipboard.writeText(g(e.value)).then(()=>{a(`SuccessCopy`),setTimeout(()=>{a(`NoCopy`)},1500)},e=>{a(`ErrorCopy`),setTimeout(()=>{a(`NoCopy`)},1500)})}:void 0,!0),v(n,F(ee,{get children(){return[F(w,{get when(){return i()===`NoCopy`},get children(){return F(Bc,{})}}),F(w,{get when(){return i()===`SuccessCopy`},get children(){return F(Hc,{get theme(){return t()}})}}),F(w,{get when(){return i()===`ErrorCopy`},get children(){return F(Uc,{})}})]}})),O(e=>{var t=r().actionButton,a=`${i()===`NoCopy`?`Copy object to clipboard`:i()===`SuccessCopy`?`Object copied to clipboard`:`Error copying object to clipboard`}`;return t!==e.e&&L(n,e.e=t),a!==e.t&&f(n,`aria-label`,e.t=a),e},{e:void 0,t:void 0}),n})()},fl=e=>{let t=U(),n=H().shadowDOMTarget?G.bind({target:H().shadowDOMTarget}):G,r=R(()=>t()===`dark`?yl(n):vl(n)),i=H().client;return(()=>{var t=$c();return t.$$click=()=>{let t=e.activeQuery.state.data,n=b(t,e.dataPath,[]);i.setQueryData(e.activeQuery.queryKey,n)},v(t,F(Wc,{})),O(()=>L(t,r().actionButton)),t})()},pl=e=>{let t=U(),n=H().shadowDOMTarget?G.bind({target:H().shadowDOMTarget}):G,r=R(()=>t()===`dark`?yl(n):vl(n)),i=H().client;return(()=>{var t=el();return t.$$click=()=>{let t=e.activeQuery.state.data,n=te(t,e.dataPath);i.setQueryData(e.activeQuery.queryKey,n)},v(t,F(Dc,{})),O(()=>L(t,K(r().actionButton))),t})()},ml=e=>{let t=U(),n=H().shadowDOMTarget?G.bind({target:H().shadowDOMTarget}):G,r=R(()=>t()===`dark`?yl(n):vl(n)),i=H().client;return(()=>{var a=tl();return a.$$click=()=>{let t=e.activeQuery.state.data,n=b(t,e.dataPath,!e.value);i.setQueryData(e.activeQuery.queryKey,n)},v(a,F(Gc,{get theme(){return t()},get checked(){return e.value}})),O(()=>L(a,K(r().actionButton,n`
          width: ${Q.size[3.5]};
          height: ${Q.size[3.5]};
        `))),a})()};function hl(e){return Symbol.iterator in e}function gl(t){let n=U(),r=H().shadowDOMTarget?G.bind({target:H().shadowDOMTarget}):G,i=R(()=>n()===`dark`?yl(r):vl(r)),o=H().client,[s,c]=I((t.defaultExpanded||[]).includes(t.label)),l=()=>c(e=>!e),[u,p]=I([]),m=R(()=>Array.isArray(t.value)?t.value.map((e,t)=>({label:t.toString(),value:e})):t.value!==null&&typeof t.value==`object`&&hl(t.value)&&typeof t.value[Symbol.iterator]==`function`?t.value instanceof Map?Array.from(t.value,([e,t])=>({label:e,value:t})):Array.from(t.value,(e,t)=>({label:t.toString(),value:e})):typeof t.value==`object`&&t.value!==null?Object.entries(t.value).map(([e,t])=>({label:e,value:t})):[]),h=R(()=>Array.isArray(t.value)?`array`:t.value!==null&&typeof t.value==`object`&&hl(t.value)&&typeof t.value[Symbol.iterator]==`function`?`Iterable`:typeof t.value==`object`&&t.value!==null?`object`:typeof t.value),g=R(()=>ll(m(),100)),_=t.dataPath??[],y=P();return(()=>{var n=rl();return v(n,F(e,{get when(){return g().length},get children(){return[(()=>{var n=il(),r=n.firstChild,o=r.firstChild,c=o.nextSibling,u=c.nextSibling.nextSibling,p=u.firstChild;return r.$$click=()=>l(),v(r,F(ul,{get expanded(){return s()}}),o),v(c,()=>t.label),v(u,()=>String(h()).toLowerCase()===`iterable`?`(Iterable) `:``,p),v(u,()=>m().length,p),v(u,()=>m().length>1?`items`:`item`,null),v(n,F(e,{get when(){return t.editable},get children(){var n=rl();return v(n,F(dl,{get value(){return t.value}}),null),v(n,F(e,{get when(){return a(()=>!!t.itemsDeletable)()&&t.activeQuery!==void 0},get children(){return F(pl,{get activeQuery(){return t.activeQuery},dataPath:_})}}),null),v(n,F(e,{get when(){return a(()=>h()===`array`)()&&t.activeQuery!==void 0},get children(){return F(fl,{get activeQuery(){return t.activeQuery},dataPath:_})}}),null),v(n,F(e,{get when(){return a(()=>!!t.onEdit)()&&!d(t.value).meta},get children(){var e=nl();return e.$$click=()=>{t.onEdit?.()},v(e,F(Vc,{})),O(()=>L(e,i().actionButton)),e}}),null),O(()=>L(n,i().actions)),n}}),null),O(e=>{var t=i().expanderButtonContainer,a=i().expanderButton,o=s()?`true`:`false`,c=i().info;return t!==e.e&&L(n,e.e=t),a!==e.t&&L(r,e.t=a),o!==e.a&&f(r,`aria-expanded`,e.a=o),c!==e.o&&L(u,e.o=c),e},{e:void 0,t:void 0,a:void 0,o:void 0}),n})(),F(e,{get when(){return s()},get children(){return[F(e,{get when(){return g().length===1},get children(){var e=rl();return v(e,F(Ct,{get each(){return m()},by:e=>e.label,children:e=>F(gl,{get defaultExpanded(){return t.defaultExpanded},get label(){return e().label},get value(){return e().value},get editable(){return t.editable},get dataPath(){return[..._,e().label]},get activeQuery(){return t.activeQuery},get itemsDeletable(){return h()===`array`||h()===`Iterable`||h()===`object`}})})),O(()=>L(e,i().subEntry)),e}}),F(e,{get when(){return g().length>1},get children(){var n=rl();return v(n,F(S,{get each(){return g()},children:(n,r)=>(()=>{var a=cl(),o=a.firstChild,s=o.firstChild,c=s.firstChild,l=c.nextSibling,d=l.nextSibling.nextSibling;return d.nextSibling,s.$$click=()=>p(e=>e.includes(r)?e.filter(e=>e!==r):[...e,r]),v(s,F(ul,{get expanded(){return u().includes(r)}}),c),v(s,r*100,l),v(s,r*100+100-1,d),v(o,F(e,{get when(){return u().includes(r)},get children(){var e=rl();return v(e,F(Ct,{get each(){return n()},by:e=>e.label,children:e=>F(gl,{get defaultExpanded(){return t.defaultExpanded},get label(){return e().label},get value(){return e().value},get editable(){return t.editable},get dataPath(){return[..._,e().label]},get activeQuery(){return t.activeQuery}})})),O(()=>L(e,i().subEntry)),e}}),null),O(e=>{var t=i().entry,n=i().expanderButton;return t!==e.e&&L(o,e.e=t),n!==e.t&&L(s,e.t=n),e},{e:void 0,t:void 0}),a})()})),O(()=>L(n,i().subEntry)),n}})]}})]}}),null),v(n,F(e,{get when(){return g().length===0},get children(){var n=sl(),r=n.firstChild,s=r.firstChild;return f(r,`for`,y),v(r,()=>t.label,s),v(n,F(e,{get when(){return a(()=>!!(t.editable&&t.activeQuery!==void 0))()&&(h()===`string`||h()===`number`||h()===`boolean`)},get fallback(){return(()=>{var e=ol();return v(e,()=>T(t.value)),O(()=>L(e,i().value)),e})()},get children(){return[F(e,{get when(){return a(()=>!!(t.editable&&t.activeQuery!==void 0))()&&(h()===`string`||h()===`number`)},get children(){var e=al();return e.addEventListener(`change`,e=>{let n=t.activeQuery.state.data,r=b(n,_,h()===`number`?e.target.valueAsNumber:e.target.value);o.setQueryData(t.activeQuery.queryKey,r)}),f(e,`id`,y),O(t=>{var n=h()===`number`?`number`:`text`,r=K(i().value,i().editableInput);return n!==t.e&&f(e,`type`,t.e=n),r!==t.t&&L(e,t.t=r),t},{e:void 0,t:void 0}),O(()=>e.value=t.value),e}}),F(e,{get when(){return h()===`boolean`},get children(){var e=ol();return v(e,F(ml,{get activeQuery(){return t.activeQuery},dataPath:_,get value(){return t.value}}),null),v(e,()=>T(t.value),null),O(()=>L(e,K(i().value,i().actions,i().editableInput))),e}})]}}),null),v(n,F(e,{get when(){return a(()=>!!(t.editable&&t.itemsDeletable))()&&t.activeQuery!==void 0},get children(){return F(pl,{get activeQuery(){return t.activeQuery},dataPath:_})}}),null),O(e=>{var t=i().row,a=i().label;return t!==e.e&&L(n,e.e=t),a!==e.t&&L(r,e.t=a),e},{e:void 0,t:void 0}),n}}),null),O(()=>L(n,i().entry)),n})()}var _l=(e,t)=>{let{colors:n,font:r,size:i,border:a}=Q,o=(t,n)=>e===`light`?t:n;return{entry:t`
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
    `}},vl=e=>_l(`light`,e),yl=e=>_l(`dark`,e);A([`click`]);var bl=B(`<div><div aria-hidden=true></div><button type=button aria-label="Open Tanstack query devtools"class=tsqd-open-btn>`),xl=B(`<div>`),Sl=B(`<div style=--tsqd-font-size:16px;max-height:100vh;height:100vh;width:100vw>`),Cl=B(`<div style=--tsqd-font-size:16px>`),wl=B(`<aside aria-label="Tanstack query devtools"><div role=separator aria-label="Resize devtools panel"tabindex=0></div><button aria-label="Close tanstack query devtools">`),Tl=B(`<select name=tsqd-queries-filter-sort aria-label="Sort queries by">`),El=B(`<select name=tsqd-mutations-filter-sort aria-label="Sort mutations by">`),Dl=B(`<span>Asc`),Ol=B(`<span>Desc`),kl=B(`<button aria-label="Open in picture-in-picture mode"title="Open in picture-in-picture mode">`),Al=B(`<div>Settings`),jl=B(`<span>Position`),Ml=B(`<span>Top`),Nl=B(`<span>Bottom`),Pl=B(`<span>Left`),Fl=B(`<span>Right`),Il=B(`<span>Theme`),Ll=B(`<span>Light`),Rl=B(`<span>Dark`),zl=B(`<span>System`),Bl=B(`<span>Disabled Queries`),Vl=B(`<span>Show`),Hl=B(`<span>Hide`),Ul=B(`<div><div class=tsqd-queries-container>`),Wl=B(`<div><div class=tsqd-mutations-container>`),Gl=B(`<div><div><div><button aria-label="Close Tanstack query devtools"><span>TANSTACK</span><span> v</span></button></div></div><div><div><div><input aria-label="Filter queries by query key"type=text placeholder=Filter name=tsqd-query-filter-input></div><div></div><button class=tsqd-query-filter-sort-order-btn></button></div><div><button aria-label="Clear query cache"></button><button>`),Kl=B(`<option>Sort by `),ql=B(`<div class=tsqd-query-disabled-indicator aria-hidden=true>disabled`),Jl=B(`<div class=tsqd-query-static-indicator aria-hidden=true>static`),Yl=B(`<button><div></div><code class=tsqd-query-hash>`),Xl=B(`<div role=tooltip id=tsqd-status-tooltip>`),Zl=B(`<span>`),Ql=B(`<button><span aria-hidden=true></span><span>`),$l=B(`<button><span aria-hidden=true></span> Error`),eu=B(`<div><span aria-hidden=true></span>Trigger Error<select aria-label="Select error type to trigger"><option value disabled selected>`),tu=B(`<div class="tsqd-query-details-explorer-container tsqd-query-details-data-explorer">`),nu=B(`<form><textarea name=data aria-label="Edit query data as JSON"></textarea><div><span></span><div><button type=button>Cancel</button><button>Save`),ru=B(`<div><div role=heading aria-level=2>Query Details</div><div><div class=tsqd-query-details-summary><pre><code></code></pre><span role=status aria-live=polite></span></div><div class=tsqd-query-details-observers-count><span>Observers:</span><span></span></div><div class=tsqd-query-details-last-updated><span>Last Updated:</span><span></span></div></div><div role=heading aria-level=2>Actions</div><div><button><span aria-hidden=true></span>Refetch</button><button><span aria-hidden=true></span>Invalidate</button><button><span aria-hidden=true></span>Reset</button><button><span aria-hidden=true></span>Remove</button><button><span aria-hidden=true></span> Loading</button></div><div role=heading aria-level=2>Data </div><div role=heading aria-level=2>Query Explorer</div><div class="tsqd-query-details-explorer-container tsqd-query-details-query-explorer">`),iu=B(`<option>`),au=B(`<div><div role=heading aria-level=2>Mutation Details</div><div><div class=tsqd-query-details-summary><pre><code></code></pre><span role=status aria-live=polite></span></div><div class=tsqd-query-details-last-updated><span>Submitted At:</span><span></span></div></div><div role=heading aria-level=2>Variables Details</div><div class="tsqd-query-details-explorer-container tsqd-query-details-query-explorer"></div><div role=heading aria-level=2>Context Details</div><div class="tsqd-query-details-explorer-container tsqd-query-details-query-explorer"></div><div role=heading aria-level=2>Data Explorer</div><div class="tsqd-query-details-explorer-container tsqd-query-details-query-explorer"></div><div role=heading aria-level=2>Mutations Explorer</div><div class="tsqd-query-details-explorer-container tsqd-query-details-query-explorer">`),[ou,su]=I(null),[cu,lu]=I(null),[uu,du]=I(0),[fu,pu]=I(!1),mu=n=>{let r=U(),i=H().shadowDOMTarget?G.bind({target:H().shadowDOMTarget}):G,o=R(()=>r()===`dark`?Fu(i):Pu(i)),c=R(()=>H().onlineManager);ne(()=>{let e=c().subscribe(e=>{pu(!e)});t(()=>{e()})});let l=Re(),u=R(()=>H().buttonPosition||we),d=R(()=>n.localStore.open===`true`?!0:n.localStore.open===`false`?!1:H().initialIsOpen||De),f=R(()=>n.localStore.position||H().position||Te),p;N(()=>{let e=p.parentElement,t=n.localStore.height||Oe,r=n.localStore.width||Ae,i=f();e.style.setProperty(`--tsqd-panel-height`,`${i===`top`?`-`:``}${t}px`),e.style.setProperty(`--tsqd-panel-width`,`${i===`left`?`-`:``}${r}px`)}),ne(()=>{let e=()=>{let e=p.parentElement,t=getComputedStyle(e).fontSize;e.style.setProperty(`--tsqd-font-size`,t)};e(),window.addEventListener(`focus`,e),t(()=>{window.removeEventListener(`focus`,e)})});let m=R(()=>n.localStore.pip_open??`false`);return[F(e,{get when(){return a(()=>!!l().pipWindow)()&&m()==`true`},get children(){return F(h,{get mount(){return l().pipWindow?.document.body},get children(){return F(hu,{get children(){return F(vu,n)}})}})}}),(()=>{var t=xl(),r=p;return typeof r==`function`?s(r,t):p=t,v(t,F(yt,{name:`tsqd-panel-transition`,get children(){return F(e,{get when(){return a(()=>!(!d()||l().pipWindow))()&&m()==`false`},get children(){return F(_u,{get localStore(){return n.localStore},get setLocalStore(){return n.setLocalStore}})}})}}),null),v(t,F(yt,{name:`tsqd-button-transition`,get children(){return F(e,{get when(){return!d()},get children(){var e=bl(),t=e.firstChild,r=t.nextSibling;return v(t,F(Xc,{})),r.$$click=()=>n.setLocalStore(`open`,`true`),v(r,F(Xc,{})),O(()=>L(e,K(o().devtoolsBtn,o()[`devtoolsBtn-position-${u()}`],`tsqd-open-btn-container`))),e}})}}),null),O(()=>L(t,K(i`
            & .tsqd-panel-transition-exit-active,
            & .tsqd-panel-transition-enter-active {
              transition:
                opacity 0.3s,
                transform 0.3s;
            }

            & .tsqd-panel-transition-exit-to,
            & .tsqd-panel-transition-enter {
              ${f()===`top`||f()===`bottom`?`transform: translateY(var(--tsqd-panel-height));`:`transform: translateX(var(--tsqd-panel-width));`}
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
              transform: ${u()===`relative`?`none;`:u()===`top-left`?`translateX(-72px);`:u()===`top-right`?`translateX(72px);`:`translateY(72px);`};
              opacity: 0;
            }
          `,`tsqd-transitions-container`))),t})()]},hu=e=>{let n=Re(),r=U(),i=H().shadowDOMTarget?G.bind({target:H().shadowDOMTarget}):G,a=R(()=>r()===`dark`?Fu(i):Pu(i)),o=()=>{let{colors:e}=Q,t=(e,t)=>r()===`dark`?t:e;return uu()<Se?i`
        flex-direction: column;
        background-color: ${t(e.gray[300],e.gray[600])};
      `:i`
      flex-direction: row;
      background-color: ${t(e.gray[200],e.darkGray[900])};
    `};return N(()=>{let e=n().pipWindow,r=()=>{e&&du(e.innerWidth)};e&&(e.addEventListener(`resize`,r),r()),t(()=>{e&&e.removeEventListener(`resize`,r)})}),(()=>{var t=Sl();return v(t,()=>e.children),O(()=>L(t,K(a().panel,o(),{[i`
            min-width: min-content;
          `]:uu()<Ce},`tsqd-main-panel`))),t})()},gu=e=>{let t=U(),n=H().shadowDOMTarget?G.bind({target:H().shadowDOMTarget}):G,r=R(()=>t()===`dark`?Fu(n):Pu(n)),i;ne(()=>{Dt(i,({width:e},t)=>{t===i&&du(e)})});let a=()=>{let{colors:e}=Q,r=(e,n)=>t()===`dark`?n:e;return uu()<Se?n`
        flex-direction: column;
        background-color: ${r(e.gray[300],e.gray[600])};
      `:n`
      flex-direction: row;
      background-color: ${r(e.gray[200],e.darkGray[900])};
    `};return(()=>{var t=Cl(),o=i;return typeof o==`function`?s(o,t):i=t,v(t,()=>e.children),O(()=>L(t,K(r().parentPanel,a(),{[n`
            min-width: min-content;
          `]:uu()<Ce},`tsqd-main-panel`))),t})()},_u=e=>{let n=U(),r=H().shadowDOMTarget?G.bind({target:H().shadowDOMTarget}):G,i=R(()=>n()===`dark`?Fu(r):Pu(r)),a;ne(()=>{a.focus()});let[o,c]=I(!1),l=R(()=>e.localStore.position||H().position||Te),u=t=>{let n=t.currentTarget.parentElement;if(!n)return;c(!0);let{height:r,width:i}=n.getBoundingClientRect(),a=t.clientX,s=t.clientY,u=0,d=E(3.5),f=E(12),p=t=>{if(t.preventDefault(),l()===`left`||l()===`right`){let r=l()===`right`?a-t.clientX:t.clientX-a;u=Math.round(i+r),u<f&&(u=f),e.setLocalStore(`width`,String(Math.round(u)));let o=n.getBoundingClientRect().width;Number(e.localStore.width)<o&&e.setLocalStore(`width`,String(o))}else{let n=l()===`bottom`?s-t.clientY:t.clientY-s;u=Math.round(r+n),u<d&&(u=d,su(null)),e.setLocalStore(`height`,String(Math.round(u)))}},m=()=>{o()&&c(!1),document.removeEventListener(`mousemove`,p,!1),document.removeEventListener(`mouseup`,m,!1)};document.addEventListener(`mousemove`,p,!1),document.addEventListener(`mouseup`,m,!1)},d;ne(()=>{Dt(d,({width:e},t)=>{t===d&&du(e)})}),N(()=>{let n=d.parentElement?.parentElement?.parentElement;if(!n)return;let r=e.localStore.position||Te,i=se(`padding`,r),a=e.localStore.position===`left`||e.localStore.position===`right`,o=(({padding:e,paddingTop:t,paddingBottom:n,paddingLeft:r,paddingRight:i})=>({padding:e,paddingTop:t,paddingBottom:n,paddingLeft:r,paddingRight:i}))(n.style);n.style[i]=`${a?e.localStore.width:e.localStore.height}px`,t(()=>{Object.entries(o).forEach(([e,t])=>{n.style[e]=t})})});let p=()=>{let{colors:e}=Q,t=(e,t)=>n()===`dark`?t:e;return uu()<Se?r`
        flex-direction: column;
        background-color: ${t(e.gray[300],e.gray[600])};
      `:r`
      flex-direction: row;
      background-color: ${t(e.gray[200],e.darkGray[900])};
    `};return(()=>{var t=wl(),n=t.firstChild,o=n.nextSibling,c=d;typeof c==`function`?s(c,t):d=t,n.$$keydown=t=>{let n=E(3.5),r=E(12);if(l()===`top`||l()===`bottom`){if(t.key===`ArrowUp`||t.key===`ArrowDown`){t.preventDefault();let r=Number(e.localStore.height||Oe),i=l()===`bottom`?t.key===`ArrowUp`?10:-10:t.key===`ArrowDown`?10:-10,a=Math.max(n,r+i);e.setLocalStore(`height`,String(a))}}else if(t.key===`ArrowLeft`||t.key===`ArrowRight`){t.preventDefault();let n=Number(e.localStore.width||Ae),i=l()===`right`?t.key===`ArrowLeft`?10:-10:t.key===`ArrowRight`?10:-10,a=Math.max(r,n+i);e.setLocalStore(`width`,String(a))}},n.$$mousedown=u,o.$$click=()=>e.setLocalStore(`open`,`false`);var h=a;return typeof h==`function`?s(h,o):a=o,v(o,F(Oc,{})),v(t,F(vu,e),null),O(a=>{var s=K(i().panel,i()[`panel-position-${l()}`],p(),{[r`
            min-width: min-content;
          `]:uu()<Ce&&(l()===`right`||l()===`left`)},`tsqd-main-panel`),c=l()===`bottom`||l()===`top`?`${e.localStore.height||Oe}px`:`auto`,u=l()===`right`||l()===`left`?`${e.localStore.width||Ae}px`:`auto`,d=l()===`top`||l()===`bottom`?`horizontal`:`vertical`,h=l()===`top`||l()===`bottom`?E(3.5):E(12),g=l()===`top`||l()===`bottom`?Number(e.localStore.height||Oe):Number(e.localStore.width||Ae),_=K(i().dragHandle,i()[`dragHandle-position-${l()}`],`tsqd-drag-handle`),v=K(i().closeBtn,i()[`closeBtn-position-${l()}`],`tsqd-minimize-btn`);return s!==a.e&&L(t,a.e=s),c!==a.t&&m(t,`height`,a.t=c),u!==a.a&&m(t,`width`,a.a=u),d!==a.o&&f(n,`aria-orientation`,a.o=d),h!==a.i&&f(n,`aria-valuemin`,a.i=h),g!==a.n&&f(n,`aria-valuenow`,a.n=g),_!==a.s&&L(n,a.s=_),v!==a.h&&L(o,a.h=v),a},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0,h:void 0}),t})()},vu=t=>{Du(),ku();let n,r=U(),i=H().shadowDOMTarget?G.bind({target:H().shadowDOMTarget}):G,c=R(()=>r()===`dark`?Fu(i):Pu(i)),l=Re(),[u,d]=I(`queries`),m=R(()=>t.localStore.sort||je),h=R(()=>Number(t.localStore.sortOrder)||Me),g=R(()=>t.localStore.mutationSort||Ne),_=R(()=>Number(t.localStore.mutationSortOrder)||Me),y=R(()=>o[m()]),b=R(()=>p[g()]),x=R(()=>H().onlineManager),S=R(()=>H().client.getQueryCache()),C=R(()=>H().client.getMutationCache()),w=$(e=>e().getAll().length,!1),T=R(M(()=>[w(),t.localStore.filter,m(),h(),t.localStore.hideDisabledQueries],()=>{let e=S().getAll(),n=t.localStore.filter?e.filter(e=>We(e.queryHash,t.localStore.filter||``).passed):[...e];return t.localStore.hideDisabledQueries===`true`&&(n=n.filter(e=>!e.isDisabled())),y()?n.sort((e,t)=>y()(e,t)*h()):n})),E=Au(e=>e().getAll().length,!1),D=R(M(()=>[E(),t.localStore.mutationFilter,g(),_()],()=>{let e=C().getAll(),n=t.localStore.mutationFilter?e.filter(e=>We(`${e.options.mutationKey?JSON.stringify(e.options.mutationKey)+` - `:``}${new Date(e.state.submittedAt).toLocaleString()}`,t.localStore.mutationFilter||``).passed):[...e];return b()?n.sort((e,t)=>b()(e,t)*_()):n})),ee=e=>{t.setLocalStore(`position`,e)},k=e=>{let t=getComputedStyle(n).getPropertyValue(`--tsqd-font-size`);e.style.setProperty(`--tsqd-font-size`,t)};return[(()=>{var r=Gl(),y=r.firstChild,b=y.firstChild,w=b.firstChild,E=w.firstChild,te=E.nextSibling,A=te.firstChild,j=y.nextSibling,ne=j.firstChild,M=ne.firstChild,N=M.firstChild,P=M.nextSibling,re=P.nextSibling,I=ne.nextSibling,ie=I.firstChild,ae=ie.nextSibling,oe=n;return typeof oe==`function`?s(oe,r):n=r,w.$$click=()=>{!l().pipWindow&&!t.showPanelViewOnly?t.setLocalStore(`open`,`false`):t.onClose&&t.onClose()},v(te,()=>H().queryFlavor,A),v(te,()=>H().version,null),v(b,F(Ko.Root,{get class(){return K(c().viewToggle)},get value(){return u()},"aria-label":`Toggle between queries and mutations view`,onChange:e=>{d(e),su(null),lu(null)},get children(){return[F(Ko.Item,{value:`queries`,class:`tsqd-radio-toggle`,get children(){return[F(Ko.ItemInput,{}),F(Ko.ItemControl,{get children(){return F(Ko.ItemIndicator,{})}}),F(Ko.ItemLabel,{title:`Toggle Queries View`,children:`Queries`})]}}),F(Ko.Item,{value:`mutations`,class:`tsqd-radio-toggle`,get children(){return[F(Ko.ItemInput,{}),F(Ko.ItemControl,{get children(){return F(Ko.ItemIndicator,{})}}),F(Ko.ItemLabel,{title:`Toggle Mutations View`,children:`Mutations`})]}})]}}),null),v(y,F(e,{get when(){return u()===`queries`},get children(){return F(xu,{})}}),null),v(y,F(e,{get when(){return u()===`mutations`},get children(){return F(Su,{})}}),null),v(M,F(Ec,{}),N),N.$$input=e=>{u()===`queries`?t.setLocalStore(`filter`,e.currentTarget.value):t.setLocalStore(`mutationFilter`,e.currentTarget.value)},v(P,F(e,{get when(){return u()===`queries`},get children(){var e=Tl();return e.addEventListener(`change`,e=>{t.setLocalStore(`sort`,e.currentTarget.value)}),v(e,()=>Object.keys(o).map(e=>(()=>{var t=Kl();return t.firstChild,t.value=e,v(t,e,null),t})())),O(()=>e.value=m()),e}}),null),v(P,F(e,{get when(){return u()===`mutations`},get children(){var e=El();return e.addEventListener(`change`,e=>{t.setLocalStore(`mutationSort`,e.currentTarget.value)}),v(e,()=>Object.keys(p).map(e=>(()=>{var t=Kl();return t.firstChild,t.value=e,v(t,e,null),t})())),O(()=>e.value=g()),e}}),null),v(P,F(Oc,{}),null),re.$$click=()=>{u()===`queries`?t.setLocalStore(`sortOrder`,String(h()*-1)):t.setLocalStore(`mutationSortOrder`,String(_()*-1))},v(re,F(e,{get when(){return(u()===`queries`?h():_())===1},get children(){return[Dl(),F(kc,{})]}}),null),v(re,F(e,{get when(){return(u()===`queries`?h():_())===-1},get children(){return[Ol(),F(Ac,{})]}}),null),ie.$$click=()=>{u()===`queries`?(Mu({type:`CLEAR_QUERY_CACHE`}),S().clear()):(Mu({type:`CLEAR_MUTATION_CACHE`}),C().clear())},v(ie,F(Dc,{})),ae.$$click=()=>{x().setOnline(!x().isOnline())},v(ae,(()=>{var e=a(()=>!!fu());return()=>e()?F(Lc,{}):F(Ic,{})})()),v(I,F(e,{get when(){return a(()=>!l().pipWindow)()&&!l().disabled},get children(){var e=kl();return e.$$click=()=>{l().requestPipWindow(Number(window.innerWidth),Number(t.localStore.height??500))},v(e,F(zc,{})),O(()=>L(e,K(c().actionsBtn,`tsqd-actions-btn`,`tsqd-action-open-pip`))),e}}),null),v(I,F(Z.Root,{gutter:4,get children(){return[F(Z.Trigger,{get class(){return K(c().actionsBtn,`tsqd-actions-btn`,`tsqd-action-settings`)},"aria-label":`Open settings menu`,title:`Open settings menu`,get children(){return F(Rc,{})}}),F(Z.Portal,{ref:e=>k(e),get mount(){return a(()=>!!l().pipWindow)()?l().pipWindow.document.body:document.body},get children(){return F(Z.Content,{get class(){return K(c().settingsMenu,`tsqd-settings-menu`)},get children(){return[(()=>{var e=Al();return O(()=>L(e,K(c().settingsMenuHeader,`tsqd-settings-menu-header`))),e})(),F(e,{get when(){return!t.showPanelViewOnly},get children(){return F(Z.Sub,{overlap:!0,gutter:8,shift:-4,get children(){return[F(Z.SubTrigger,{get class(){return K(c().settingsSubTrigger,`tsqd-settings-menu-sub-trigger`,`tsqd-settings-menu-sub-trigger-position`)},get children(){return[jl(),F(Oc,{})]}}),F(Z.Portal,{ref:e=>k(e),get mount(){return a(()=>!!l().pipWindow)()?l().pipWindow.document.body:document.body},get children(){return F(Z.SubContent,{get class(){return K(c().settingsMenu,`tsqd-settings-submenu`)},get children(){return F(Z.RadioGroup,{"aria-label":`Position settings`,get value(){return t.localStore.position},onChange:e=>ee(e),get children(){return[F(Z.RadioItem,{value:`top`,get class(){return K(c().settingsSubButton,`tsqd-settings-menu-position-btn`,`tsqd-settings-menu-position-btn-top`)},get children(){return[Ml(),F(kc,{})]}}),F(Z.RadioItem,{value:`bottom`,get class(){return K(c().settingsSubButton,`tsqd-settings-menu-position-btn`,`tsqd-settings-menu-position-btn-bottom`)},get children(){return[Nl(),F(Ac,{})]}}),F(Z.RadioItem,{value:`left`,get class(){return K(c().settingsSubButton,`tsqd-settings-menu-position-btn`,`tsqd-settings-menu-position-btn-left`)},get children(){return[Pl(),F(jc,{})]}}),F(Z.RadioItem,{value:`right`,get class(){return K(c().settingsSubButton,`tsqd-settings-menu-position-btn`,`tsqd-settings-menu-position-btn-right`)},get children(){return[Fl(),F(Mc,{})]}})]}})}})}})]}})}}),F(Z.Sub,{overlap:!0,gutter:8,shift:-4,get children(){return[F(Z.SubTrigger,{get class(){return K(c().settingsSubTrigger,`tsqd-settings-menu-sub-trigger`,`tsqd-settings-menu-sub-trigger-position`)},get children(){return[Il(),F(Oc,{})]}}),F(Z.Portal,{ref:e=>k(e),get mount(){return a(()=>!!l().pipWindow)()?l().pipWindow.document.body:document.body},get children(){return F(Z.SubContent,{get class(){return K(c().settingsMenu,`tsqd-settings-submenu`)},get children(){return F(Z.RadioGroup,{get value(){return t.localStore.theme_preference},onChange:e=>{t.setLocalStore(`theme_preference`,e)},"aria-label":`Theme preference`,get children(){return[F(Z.RadioItem,{value:`light`,get class(){return K(c().settingsSubButton,`tsqd-settings-menu-position-btn`,`tsqd-settings-menu-position-btn-top`)},get children(){return[Ll(),F(Nc,{})]}}),F(Z.RadioItem,{value:`dark`,get class(){return K(c().settingsSubButton,`tsqd-settings-menu-position-btn`,`tsqd-settings-menu-position-btn-bottom`)},get children(){return[Rl(),F(Pc,{})]}}),F(Z.RadioItem,{value:`system`,get class(){return K(c().settingsSubButton,`tsqd-settings-menu-position-btn`,`tsqd-settings-menu-position-btn-left`)},get children(){return[zl(),F(Fc,{})]}})]}})}})}})]}}),F(Z.Sub,{overlap:!0,gutter:8,shift:-4,get children(){return[F(Z.SubTrigger,{get class(){return K(c().settingsSubTrigger,`tsqd-settings-menu-sub-trigger`,`tsqd-settings-menu-sub-trigger-disabled-queries`)},get children(){return[Bl(),F(Oc,{})]}}),F(Z.Portal,{ref:e=>k(e),get mount(){return a(()=>!!l().pipWindow)()?l().pipWindow.document.body:document.body},get children(){return F(Z.SubContent,{get class(){return K(c().settingsMenu,`tsqd-settings-submenu`)},get children(){return F(Z.RadioGroup,{get value(){return t.localStore.hideDisabledQueries},"aria-label":`Hide disabled queries setting`,onChange:e=>t.setLocalStore(`hideDisabledQueries`,e),get children(){return[F(Z.RadioItem,{value:`false`,get class(){return K(c().settingsSubButton,`tsqd-settings-menu-position-btn`,`tsqd-settings-menu-position-btn-show`)},get children(){return[Vl(),F(e,{get when(){return t.localStore.hideDisabledQueries!==`true`},get children(){return F(Kc,{})}})]}}),F(Z.RadioItem,{value:`true`,get class(){return K(c().settingsSubButton,`tsqd-settings-menu-position-btn`,`tsqd-settings-menu-position-btn-hide`)},get children(){return[Hl(),F(e,{get when(){return t.localStore.hideDisabledQueries===`true`},get children(){return F(Kc,{})}})]}})]}})}})}})]}})]}})}})]}}),null),v(r,F(e,{get when(){return u()===`queries`},get children(){var e=Ul(),t=e.firstChild;return v(t,F(Ct,{by:e=>e.queryHash,get each(){return T()},children:e=>F(yu,{get query(){return e()}})})),O(()=>L(e,K(c().overflowQueryContainer,`tsqd-queries-overflow-container`))),e}}),null),v(r,F(e,{get when(){return u()===`mutations`},get children(){var e=Wl(),t=e.firstChild;return v(t,F(Ct,{by:e=>e.mutationId,get each(){return D()},children:e=>F(bu,{get mutation(){return e()}})})),O(()=>L(e,K(c().overflowQueryContainer,`tsqd-mutations-overflow-container`))),e}}),null),O(e=>{var t=K(c().queriesContainer,uu()<Se&&(ou()||cu())&&i`
              height: 50%;
              max-height: 50%;
            `,uu()<Se&&!(ou()||cu())&&i`
              height: 100%;
              max-height: 100%;
            `,`tsqd-queries-container`),n=K(c().row,`tsqd-header`),a=c().logoAndToggleContainer,o=K(c().logo,`tsqd-text-logo-container`),s=K(c().tanstackLogo,`tsqd-text-logo-tanstack`),l=K(c().queryFlavorLogo,`tsqd-text-logo-query-flavor`),d=K(c().row,`tsqd-filters-actions-container`),p=K(c().filtersContainer,`tsqd-filters-container`),m=K(c().filterInput,`tsqd-query-filter-textfield-container`),g=K(`tsqd-query-filter-textfield`),v=K(c().filterSelect,`tsqd-query-filter-sort-container`),x=`Sort order ${(u()===`queries`?h():_())===-1?`descending`:`ascending`}`,S=(u()===`queries`?h():_())===-1,C=K(c().actionsContainer,`tsqd-actions-container`),T=K(c().actionsBtn,`tsqd-actions-btn`,`tsqd-action-clear-cache`),D=`Clear ${u()} cache`,O=K(c().actionsBtn,fu()&&c().actionsBtnOffline,`tsqd-actions-btn`,`tsqd-action-mock-offline-behavior`),ee=`${fu()?`Unset offline mocking behavior`:`Mock offline behavior`}`,k=fu(),A=`${fu()?`Unset offline mocking behavior`:`Mock offline behavior`}`;return t!==e.e&&L(r,e.e=t),n!==e.t&&L(y,e.t=n),a!==e.a&&L(b,e.a=a),o!==e.o&&L(w,e.o=o),s!==e.i&&L(E,e.i=s),l!==e.n&&L(te,e.n=l),d!==e.s&&L(j,e.s=d),p!==e.h&&L(ne,e.h=p),m!==e.r&&L(M,e.r=m),g!==e.d&&L(N,e.d=g),v!==e.l&&L(P,e.l=v),x!==e.u&&f(re,`aria-label`,e.u=x),S!==e.c&&f(re,`aria-pressed`,e.c=S),C!==e.w&&L(I,e.w=C),T!==e.m&&L(ie,e.m=T),D!==e.f&&f(ie,`title`,e.f=D),O!==e.y&&L(ae,e.y=O),ee!==e.g&&f(ae,`aria-label`,e.g=ee),k!==e.p&&f(ae,`aria-pressed`,e.p=k),A!==e.b&&f(ae,`title`,e.b=A),e},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0,h:void 0,r:void 0,d:void 0,l:void 0,u:void 0,c:void 0,w:void 0,m:void 0,f:void 0,y:void 0,g:void 0,p:void 0,b:void 0}),O(()=>N.value=u()===`queries`?t.localStore.filter||``:t.localStore.mutationFilter||``),r})(),F(e,{get when(){return a(()=>u()===`queries`)()&&ou()},get children(){return F(wu,{})}}),F(e,{get when(){return a(()=>u()===`mutations`)()&&cu()},get children(){return F(Tu,{})}})]},yu=t=>{let n=U(),r=H().shadowDOMTarget?G.bind({target:H().shadowDOMTarget}):G,i=R(()=>n()===`dark`?Fu(r):Pu(r)),{colors:a,alpha:o}=Q,s=(e,t)=>n()===`dark`?t:e,c=$(e=>e().find({queryKey:t.query.queryKey})?.state,!0,e=>e.query.queryHash===t.query.queryHash),l=$(e=>e().find({queryKey:t.query.queryKey})?.isDisabled()??!1,!0,e=>e.query.queryHash===t.query.queryHash),u=$(e=>e().find({queryKey:t.query.queryKey})?.isStatic()??!1,!0,e=>e.query.queryHash===t.query.queryHash),d=$(e=>e().find({queryKey:t.query.queryKey})?.isStale()??!1,!0,e=>e.query.queryHash===t.query.queryHash),p=$(e=>e().find({queryKey:t.query.queryKey})?.getObserversCount()??0,!0,e=>e.query.queryHash===t.query.queryHash),m=R(()=>ce({queryState:c(),observerCount:p(),isStale:d()})),h=()=>m()===`gray`?r`
        background-color: ${s(a[m()][200],a[m()][700])};
        color: ${s(a[m()][700],a[m()][300])};
      `:r`
      background-color: ${s(a[m()][200]+o[80],a[m()][900])};
      color: ${s(a[m()][800],a[m()][300])};
    `;return F(e,{get when(){return c()},get children(){var n=Yl(),r=n.firstChild,a=r.nextSibling;return n.$$click=()=>su(t.query.queryHash===ou()?null:t.query.queryHash),v(r,p),v(a,()=>t.query.queryHash),v(n,F(e,{get when(){return l()},get children(){return ql()}}),null),v(n,F(e,{get when(){return u()},get children(){return Jl()}}),null),O(e=>{var a=K(i().queryRow,ou()===t.query.queryHash&&i().selectedQueryRow,`tsqd-query-row`),o=`Query key ${t.query.queryHash}${l()?`, disabled`:``}${u()?`, static`:``}`,s=K(h(),`tsqd-query-observer-count`);return a!==e.e&&L(n,e.e=a),o!==e.t&&f(n,`aria-label`,e.t=o),s!==e.a&&L(r,e.a=s),e},{e:void 0,t:void 0,a:void 0}),n}})},bu=t=>{let n=U(),r=H().shadowDOMTarget?G.bind({target:H().shadowDOMTarget}):G,i=R(()=>n()===`dark`?Fu(r):Pu(r)),{colors:o,alpha:s}=Q,c=(e,t)=>n()===`dark`?t:e,l=Au(e=>e().getAll().find(e=>e.mutationId===t.mutation.mutationId)?.state),u=Au(e=>{let n=e().getAll().find(e=>e.mutationId===t.mutation.mutationId);return n?n.state.isPaused:!1}),d=Au(e=>{let n=e().getAll().find(e=>e.mutationId===t.mutation.mutationId);return n?n.state.status:`idle`}),p=R(()=>z({isPaused:u(),status:d()})),m=()=>p()===`gray`?r`
        background-color: ${c(o[p()][200],o[p()][700])};
        color: ${c(o[p()][700],o[p()][300])};
      `:r`
      background-color: ${c(o[p()][200]+s[80],o[p()][900])};
      color: ${c(o[p()][800],o[p()][300])};
    `;return F(e,{get when(){return l()},get children(){var n=Yl(),r=n.firstChild,o=r.nextSibling;return n.$$click=()=>{lu(t.mutation.mutationId===cu()?null:t.mutation.mutationId)},v(r,F(e,{get when(){return p()===`purple`},get children(){return F(Yc,{})}}),null),v(r,F(e,{get when(){return p()===`green`},get children(){return F(Kc,{})}}),null),v(r,F(e,{get when(){return p()===`red`},get children(){return F(Jc,{})}}),null),v(r,F(e,{get when(){return p()===`yellow`},get children(){return F(qc,{})}}),null),v(o,F(e,{get when(){return t.mutation.options.mutationKey},get children(){return[a(()=>JSON.stringify(t.mutation.options.mutationKey)),` -`,` `]}}),null),v(o,()=>new Date(t.mutation.state.submittedAt).toLocaleString(),null),O(e=>{var a=K(i().queryRow,cu()===t.mutation.mutationId&&i().selectedQueryRow,`tsqd-query-row`),o=`Mutation submitted at ${new Date(t.mutation.state.submittedAt).toLocaleString()}`,s=K(m(),`tsqd-query-observer-count`);return a!==e.e&&L(n,e.e=a),o!==e.t&&f(n,`aria-label`,e.t=o),s!==e.a&&L(r,e.a=s),e},{e:void 0,t:void 0,a:void 0}),n}})},xu=()=>{let e=$(e=>e().getAll().filter(e=>r(e)===`stale`).length),t=$(e=>e().getAll().filter(e=>r(e)===`fresh`).length),n=$(e=>e().getAll().filter(e=>r(e)===`fetching`).length),i=$(e=>e().getAll().filter(e=>r(e)===`paused`).length),a=$(e=>e().getAll().filter(e=>r(e)===`inactive`).length),o=U(),s=H().shadowDOMTarget?G.bind({target:H().shadowDOMTarget}):G,c=R(()=>o()===`dark`?Fu(s):Pu(s));return(()=>{var r=xl();return v(r,F(Cu,{label:`Fresh`,color:`green`,get count(){return t()}}),null),v(r,F(Cu,{label:`Fetching`,color:`blue`,get count(){return n()}}),null),v(r,F(Cu,{label:`Paused`,color:`purple`,get count(){return i()}}),null),v(r,F(Cu,{label:`Stale`,color:`yellow`,get count(){return e()}}),null),v(r,F(Cu,{label:`Inactive`,color:`gray`,get count(){return a()}}),null),O(()=>L(r,K(c().queryStatusContainer,`tsqd-query-status-container`))),r})()},Su=()=>{let e=Au(e=>e().getAll().filter(e=>z({isPaused:e.state.isPaused,status:e.state.status})===`green`).length),t=Au(e=>e().getAll().filter(e=>z({isPaused:e.state.isPaused,status:e.state.status})===`yellow`).length),n=Au(e=>e().getAll().filter(e=>z({isPaused:e.state.isPaused,status:e.state.status})===`purple`).length),r=Au(e=>e().getAll().filter(e=>z({isPaused:e.state.isPaused,status:e.state.status})===`red`).length),i=U(),a=H().shadowDOMTarget?G.bind({target:H().shadowDOMTarget}):G,o=R(()=>i()===`dark`?Fu(a):Pu(a));return(()=>{var i=xl();return v(i,F(Cu,{label:`Paused`,color:`purple`,get count(){return n()}}),null),v(i,F(Cu,{label:`Pending`,color:`yellow`,get count(){return t()}}),null),v(i,F(Cu,{label:`Success`,color:`green`,get count(){return e()}}),null),v(i,F(Cu,{label:`Error`,color:`red`,get count(){return r()}}),null),O(()=>L(i,K(o().queryStatusContainer,`tsqd-query-status-container`))),i})()},Cu=t=>{let n=U(),r=H().shadowDOMTarget?G.bind({target:H().shadowDOMTarget}):G,o=R(()=>n()===`dark`?Fu(r):Pu(r)),{colors:c,alpha:l}=Q,d=(e,t)=>n()===`dark`?t:e,f,[p,m]=I(!1),[h,g]=I(!1),_=R(()=>!(ou()&&uu()<xe&&uu()>Se||uu()<Se));return(()=>{var n=Ql(),y=n.firstChild,b=y.nextSibling,x=f;return typeof x==`function`?s(x,n):f=n,n.addEventListener(`mouseleave`,()=>{m(!1),g(!1)}),n.addEventListener(`mouseenter`,()=>m(!0)),n.addEventListener(`blur`,()=>g(!1)),n.addEventListener(`focus`,()=>g(!0)),u(n,i({get disabled(){return _()},get"aria-label"(){return`${t.label}: ${t.count}`},get class(){return K(o().queryStatusTag,!_()&&r`
            cursor: pointer;
            &:hover {
              background: ${d(c.gray[200],c.darkGray[400])}${l[80]};
            }
          `,`tsqd-query-status-tag`,`tsqd-query-status-tag-${t.label.toLowerCase()}`)}},()=>p()||h()?{"aria-describedby":`tsqd-status-tooltip`}:{}),!1,!0),v(n,F(e,{get when(){return a(()=>!_())()&&(p()||h())},get children(){var e=Xl();return v(e,()=>t.label),O(()=>L(e,K(o().statusTooltip,`tsqd-query-status-tooltip`))),e}}),y),v(n,F(e,{get when(){return _()},get children(){var e=Zl();return v(e,()=>t.label),O(()=>L(e,K(o().queryStatusTagLabel,`tsqd-query-status-tag-label`))),e}}),b),v(b,()=>t.count),O(e=>{var n=K(r`
            width: ${Q.size[1.5]};
            height: ${Q.size[1.5]};
            border-radius: ${Q.border.radius.full};
            background-color: ${Q.colors[t.color][500]};
          `,`tsqd-query-status-tag-dot`),i=K(o().queryStatusCount,t.count>0&&t.color!==`gray`&&r`
              background-color: ${d(c[t.color][100],c[t.color][900])};
              color: ${d(c[t.color][700],c[t.color][300])};
            `,`tsqd-query-status-tag-count`);return n!==e.e&&L(y,e.e=n),i!==e.t&&L(b,e.t=i),e},{e:void 0,t:void 0}),n})()},wu=()=>{let t=U(),n=H().shadowDOMTarget?G.bind({target:H().shadowDOMTarget}):G,i=R(()=>t()===`dark`?Fu(n):Pu(n)),{colors:o}=Q,s=(e,n)=>t()===`dark`?n:e,c=H().client,[l,u]=I(!1),[d,p]=I(`view`),[h,g]=I(!1),y=R(()=>H().errorTypes||[]),b=$(e=>e().getAll().find(e=>e.queryHash===ou()),!1),x=$(e=>e().getAll().find(e=>e.queryHash===ou()),!1),S=$(e=>e().getAll().find(e=>e.queryHash===ou())?.state,!1),w=$(e=>e().getAll().find(e=>e.queryHash===ou())?.state.data,!1),E=$(e=>{let t=e().getAll().find(e=>e.queryHash===ou());return t?r(t):`inactive`}),D=$(e=>{let t=e().getAll().find(e=>e.queryHash===ou());return t?t.state.status:`pending`}),ee=$(e=>e().getAll().find(e=>e.queryHash===ou())?.getObserversCount()??0),k=R(()=>_(E())),te=()=>{Mu({type:`REFETCH`,queryHash:b()?.queryHash}),(b()?.fetch())?.catch(()=>{})},A=e=>{let t=b();if(!t)return;Mu({type:`TRIGGER_ERROR`,queryHash:t.queryHash,metadata:{error:e?.name}});let n=e?.initializer(t)??Error(`Unknown error from devtools`),r=t.options;t.setState({data:void 0,status:`error`,error:n,fetchMeta:{...t.state.fetchMeta,__previousQueryOptions:r}})},j=()=>{let e=b();if(!e)return;Mu({type:`RESTORE_LOADING`,queryHash:e.queryHash});let t=e.state,n=e.state.fetchMeta?e.state.fetchMeta.__previousQueryOptions:null;e.cancel({silent:!0}),e.setState({...t,fetchStatus:`idle`,fetchMeta:null}),n&&e.fetch(n)};N(()=>{E()!==`fetching`&&u(!1)});let ne=()=>k()===`gray`?n`
        background-color: ${s(o[k()][200],o[k()][700])};
        color: ${s(o[k()][700],o[k()][300])};
        border-color: ${s(o[k()][400],o[k()][600])};
      `:n`
      background-color: ${s(o[k()][100],o[k()][900])};
      color: ${s(o[k()][700],o[k()][300])};
      border-color: ${s(o[k()][400],o[k()][600])};
    `;return F(e,{get when(){return a(()=>!!b())()&&S()},get children(){var t=ru(),r=t.firstChild,a=r.nextSibling,_=a.firstChild,k=_.firstChild,M=k.firstChild,N=k.nextSibling,P=_.nextSibling,re=P.firstChild.nextSibling,I=P.nextSibling.firstChild.nextSibling,ie=a.nextSibling,ae=ie.nextSibling,oe=ae.firstChild,R=oe.firstChild,z=oe.nextSibling,se=z.firstChild,ce=z.nextSibling,B=ce.firstChild,le=ce.nextSibling,ue=le.firstChild,de=le.nextSibling,V=de.firstChild,fe=V.nextSibling,pe=ae.nextSibling;pe.firstChild;var me=pe.nextSibling,he=me.nextSibling;return v(M,()=>T(b().queryKey,!0)),v(N,E),v(re,ee),v(I,()=>new Date(S().dataUpdatedAt).toLocaleTimeString()),oe.$$click=te,z.$$click=()=>{Mu({type:`INVALIDATE`,queryHash:b()?.queryHash}),c.invalidateQueries({queryKey:b()?.queryKey,exact:!0})},ce.$$click=()=>{Mu({type:`RESET`,queryHash:b()?.queryHash}),c.resetQueries({queryKey:b()?.queryKey,exact:!0})},le.$$click=()=>{Mu({type:`REMOVE`,queryHash:b()?.queryHash}),c.removeQueries({queryKey:b()?.queryKey,exact:!0}),su(null)},de.$$click=()=>{if(b()?.state.data===void 0)u(!0),j();else{let e=b();if(!e)return;Mu({type:`TRIGGER_LOADING`,queryHash:e.queryHash});let t=e.options;e.fetch({...t,queryFn:()=>new Promise(()=>{}),gcTime:-1}),e.setState({data:void 0,status:`pending`,fetchMeta:{...e.state.fetchMeta,__previousQueryOptions:t}})}},v(de,()=>D()===`pending`?`Restore`:`Trigger`,fe),v(ae,F(e,{get when(){return y().length===0||D()===`error`},get children(){var e=$l(),t=e.firstChild,r=t.nextSibling;return e.$$click=()=>{b().state.error?(Mu({type:`RESTORE_ERROR`,queryHash:b()?.queryHash}),c.resetQueries({queryKey:b()?.queryKey})):A()},v(e,()=>D()===`error`?`Restore`:`Trigger`,r),O(r=>{var i=K(n`
                  color: ${s(o.red[500],o.red[400])};
                `,`tsqd-query-details-actions-btn`,`tsqd-query-details-action-error`),a=D()===`pending`,c=n`
                  background-color: ${s(o.red[500],o.red[400])};
                `;return i!==r.e&&L(e,r.e=i),a!==r.t&&(e.disabled=r.t=a),c!==r.a&&L(t,r.a=c),r},{e:void 0,t:void 0,a:void 0}),e}}),null),v(ae,F(e,{get when(){return y().length!==0&&D()!==`error`},get children(){var e=eu(),t=e.firstChild,r=t.nextSibling.nextSibling;return r.firstChild,r.addEventListener(`change`,e=>{let t=y().find(t=>t.name===e.currentTarget.value);A(t)}),v(r,F(C,{get each(){return y()},children:e=>(()=>{var t=iu();return v(t,()=>e.name),O(()=>t.value=e.name),t})()}),null),v(e,F(Oc,{}),null),O(a=>{var o=K(i().actionsSelect,`tsqd-query-details-actions-btn`,`tsqd-query-details-action-error-multiple`),s=n`
                  background-color: ${Q.colors.red[400]};
                `,c=D()===`pending`;return o!==a.e&&L(e,a.e=o),s!==a.t&&L(t,a.t=s),c!==a.a&&(r.disabled=a.a=c),a},{e:void 0,t:void 0,a:void 0}),e}}),null),v(pe,()=>d()===`view`?`Explorer`:`Editor`,null),v(t,F(e,{get when(){return d()===`view`},get children(){var e=tu();return v(e,F(gl,{label:`Data`,defaultExpanded:[`Data`],get value(){return w()},editable:!0,onEdit:()=>p(`edit`),get activeQuery(){return b()}})),O(t=>m(e,`padding`,Q.size[2])),e}}),me),v(t,F(e,{get when(){return d()===`edit`},get children(){var e=nu(),t=e.firstChild,r=t.nextSibling,a=r.firstChild,c=a.nextSibling,l=c.firstChild,u=l.nextSibling;return e.addEventListener(`submit`,e=>{e.preventDefault();let t=new FormData(e.currentTarget).get(`data`);try{let e=JSON.parse(t);b().setState({...b().state,data:e}),p(`view`)}catch{g(!0)}}),t.addEventListener(`focus`,()=>g(!1)),v(a,()=>h()?`Invalid Value`:``),l.$$click=()=>p(`view`),O(d=>{var p=K(i().devtoolsEditForm,`tsqd-query-details-data-editor`),m=i().devtoolsEditTextarea,g=h(),_=i().devtoolsEditFormActions,v=i().devtoolsEditFormError,y=i().devtoolsEditFormActionContainer,b=K(i().devtoolsEditFormAction,n`
                      color: ${s(o.gray[600],o.gray[300])};
                    `),x=K(i().devtoolsEditFormAction,n`
                      color: ${s(o.blue[600],o.blue[400])};
                    `);return p!==d.e&&L(e,d.e=p),m!==d.t&&L(t,d.t=m),g!==d.a&&f(t,`data-error`,d.a=g),_!==d.o&&L(r,d.o=_),v!==d.i&&L(a,d.i=v),y!==d.n&&L(c,d.n=y),b!==d.s&&L(l,d.s=b),x!==d.h&&L(u,d.h=x),d},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0,h:void 0}),O(()=>t.value=JSON.stringify(w(),null,2)),e}}),me),v(he,F(gl,{label:`Query`,defaultExpanded:[`Query`,`queryKey`],get value(){return x()}})),O(e=>{var c=K(i().detailsContainer,`tsqd-query-details-container`),u=K(i().detailsHeader,`tsqd-query-details-header`),d=K(i().detailsBody,`tsqd-query-details-summary-container`),f=K(i().queryDetailsStatus,ne()),p=K(i().detailsHeader,`tsqd-query-details-header`),h=K(i().actionsBody,`tsqd-query-details-actions-container`),g=K(n`
                color: ${s(o.blue[600],o.blue[400])};
              `,`tsqd-query-details-actions-btn`,`tsqd-query-details-action-refetch`),_=E()===`fetching`,v=n`
                background-color: ${s(o.blue[600],o.blue[400])};
              `,y=K(n`
                color: ${s(o.yellow[600],o.yellow[400])};
              `,`tsqd-query-details-actions-btn`,`tsqd-query-details-action-invalidate`),b=D()===`pending`,x=n`
                background-color: ${s(o.yellow[600],o.yellow[400])};
              `,S=K(n`
                color: ${s(o.gray[600],o.gray[300])};
              `,`tsqd-query-details-actions-btn`,`tsqd-query-details-action-reset`),C=D()===`pending`,w=n`
                background-color: ${s(o.gray[600],o.gray[400])};
              `,T=K(n`
                color: ${s(o.pink[500],o.pink[400])};
              `,`tsqd-query-details-actions-btn`,`tsqd-query-details-action-remove`),O=E()===`fetching`,ee=n`
                background-color: ${s(o.pink[500],o.pink[400])};
              `,k=K(n`
                color: ${s(o.cyan[500],o.cyan[400])};
              `,`tsqd-query-details-actions-btn`,`tsqd-query-details-action-loading`),te=l(),A=n`
                background-color: ${s(o.cyan[500],o.cyan[400])};
              `,j=K(i().detailsHeader,`tsqd-query-details-header`),M=K(i().detailsHeader,`tsqd-query-details-header`),P=Q.size[2];return c!==e.e&&L(t,e.e=c),u!==e.t&&L(r,e.t=u),d!==e.a&&L(a,e.a=d),f!==e.o&&L(N,e.o=f),p!==e.i&&L(ie,e.i=p),h!==e.n&&L(ae,e.n=h),g!==e.s&&L(oe,e.s=g),_!==e.h&&(oe.disabled=e.h=_),v!==e.r&&L(R,e.r=v),y!==e.d&&L(z,e.d=y),b!==e.l&&(z.disabled=e.l=b),x!==e.u&&L(se,e.u=x),S!==e.c&&L(ce,e.c=S),C!==e.w&&(ce.disabled=e.w=C),w!==e.m&&L(B,e.m=w),T!==e.f&&L(le,e.f=T),O!==e.y&&(le.disabled=e.y=O),ee!==e.g&&L(ue,e.g=ee),k!==e.p&&L(de,e.p=k),te!==e.b&&(de.disabled=e.b=te),A!==e.T&&L(V,e.T=A),j!==e.A&&L(pe,e.A=j),M!==e.O&&L(me,e.O=M),P!==e.I&&m(he,`padding`,e.I=P),e},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0,h:void 0,r:void 0,d:void 0,l:void 0,u:void 0,c:void 0,w:void 0,m:void 0,f:void 0,y:void 0,g:void 0,p:void 0,b:void 0,T:void 0,A:void 0,O:void 0,I:void 0}),t}})},Tu=()=>{let t=U(),n=H().shadowDOMTarget?G.bind({target:H().shadowDOMTarget}):G,r=R(()=>t()===`dark`?Fu(n):Pu(n)),{colors:i}=Q,a=(e,n)=>t()===`dark`?n:e,o=Au(e=>{let t=e().getAll().find(e=>e.mutationId===cu());return t?t.state.isPaused:!1}),s=Au(e=>{let t=e().getAll().find(e=>e.mutationId===cu());return t?t.state.status:`idle`}),c=R(()=>z({isPaused:o(),status:s()})),l=Au(e=>e().getAll().find(e=>e.mutationId===cu()),!1),u=()=>c()===`gray`?n`
        background-color: ${a(i[c()][200],i[c()][700])};
        color: ${a(i[c()][700],i[c()][300])};
        border-color: ${a(i[c()][400],i[c()][600])};
      `:n`
      background-color: ${a(i[c()][100],i[c()][900])};
      color: ${a(i[c()][700],i[c()][300])};
      border-color: ${a(i[c()][400],i[c()][600])};
    `;return F(e,{get when(){return l()},get children(){var t=au(),n=t.firstChild,i=n.nextSibling,a=i.firstChild,o=a.firstChild,d=o.firstChild,f=o.nextSibling,p=a.nextSibling.firstChild.nextSibling,h=i.nextSibling,g=h.nextSibling,_=g.nextSibling,y=_.nextSibling,b=y.nextSibling,x=b.nextSibling,S=x.nextSibling,C=S.nextSibling;return v(d,F(e,{get when(){return l().options.mutationKey},fallback:`No mutationKey found`,get children(){return T(l().options.mutationKey,!0)}})),v(f,F(e,{get when(){return c()===`purple`},children:`pending`}),null),v(f,F(e,{get when(){return c()!==`purple`},get children(){return s()}}),null),v(p,()=>new Date(l().state.submittedAt).toLocaleTimeString()),v(g,F(gl,{label:`Variables`,defaultExpanded:[`Variables`],get value(){return l().state.variables}})),v(y,F(gl,{label:`Context`,defaultExpanded:[`Context`],get value(){return l().state.context}})),v(x,F(gl,{label:`Data`,defaultExpanded:[`Data`],get value(){return l().state.data}})),v(C,F(gl,{label:`Mutation`,defaultExpanded:[`Mutation`],get value(){return l()}})),O(e=>{var a=K(r().detailsContainer,`tsqd-query-details-container`),o=K(r().detailsHeader,`tsqd-query-details-header`),s=K(r().detailsBody,`tsqd-query-details-summary-container`),c=K(r().queryDetailsStatus,u()),l=K(r().detailsHeader,`tsqd-query-details-header`),d=Q.size[2],p=K(r().detailsHeader,`tsqd-query-details-header`),v=Q.size[2],w=K(r().detailsHeader,`tsqd-query-details-header`),T=Q.size[2],E=K(r().detailsHeader,`tsqd-query-details-header`),D=Q.size[2];return a!==e.e&&L(t,e.e=a),o!==e.t&&L(n,e.t=o),s!==e.a&&L(i,e.a=s),c!==e.o&&L(f,e.o=c),l!==e.i&&L(h,e.i=l),d!==e.n&&m(g,`padding`,e.n=d),p!==e.s&&L(_,e.s=p),v!==e.h&&m(y,`padding`,e.h=v),w!==e.r&&L(b,e.r=w),T!==e.d&&m(x,`padding`,e.d=T),E!==e.l&&L(S,e.l=E),D!==e.u&&m(C,`padding`,e.u=D),e},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0,h:void 0,r:void 0,d:void 0,l:void 0,u:void 0}),t}})},Eu=new Map,Du=()=>{let e=R(()=>H().client.getQueryCache()),n=e().subscribe(t=>{re(()=>{for(let[n,r]of Eu.entries())r.shouldUpdate(t)&&r.setter(n(e))})});return t(()=>{Eu.clear(),n()}),n},$=(e,n=!0,r=()=>!0)=>{let i=R(()=>H().client.getQueryCache()),[a,o]=I(e(i),n?void 0:{equals:!1});return N(()=>{o(e(i))}),Eu.set(e,{setter:o,shouldUpdate:r}),t(()=>{Eu.delete(e)}),a},Ou=new Map,ku=()=>{let e=R(()=>H().client.getMutationCache()),n=e().subscribe(()=>{for(let[t,n]of Ou.entries())queueMicrotask(()=>{n(t(e))})});return t(()=>{Ou.clear(),n()}),n},Au=(e,n=!0)=>{let r=R(()=>H().client.getMutationCache()),[i,a]=I(e(r),n?void 0:{equals:!1});return N(()=>{a(e(r))}),Ou.set(e,a),t(()=>{Ou.delete(e)}),i},ju=`@tanstack/query-devtools-event`,Mu=({type:e,queryHash:t,metadata:n})=>{let r=new CustomEvent(ju,{detail:{type:e,queryHash:t,metadata:n},bubbles:!0,cancelable:!0});window.dispatchEvent(r)},Nu=(e,t)=>{let{colors:n,font:r,size:i,alpha:a,shadow:o,border:s}=Q,c=(t,n)=>e===`light`?t:n;return{devtoolsBtn:t`
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
    `}},Pu=e=>Nu(`light`,e),Fu=e=>Nu(`dark`,e);A([`click`,`mousedown`,`keydown`,`input`]);export{Pe as a,_e as c,Le as i,mu as n,Ee as o,gu as r,ze as s,vu as t};