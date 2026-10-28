import{$ as e,At as t,Bt as n,Dt as r,Et as i,Ft as a,Gt as o,Ht as s,It as c,Jt as l,Kt as u,Lt as d,Mt as f,Nt as p,Ot as m,Pt as h,Q as g,Rt as _,St as v,Tt as y,Ut as b,Vt as x,Wt as S,Z as C,_t as w,at as T,bt as ee,ct as E,dt as D,et as te,ft as O,gt as ne,ht as k,it as re,jt as A,kt as j,lt as M,mt as N,nt as ie,ot as P,pt as F,qt as I,rt as L,st as R,tt as ae,ut as z,vt as B,xt as oe,yt as se,zt as ce}from"./index-G5CZtwRT.js";var le=e=>e!=null,ue=e=>e.filter(le);function de(e){return(...t)=>{for(let n of e)n&&n(...t)}}var V=e=>typeof e==`function`&&!e.length?e():e,fe=e=>Array.isArray(e)?e:e?[e]:[];function pe(e,...t){return typeof e==`function`?e(...t):e}var me=h;function he(e,t,n,r){let i=e.length,a=t.length,o=0;if(!a){for(;o<i;o++)n(e[o]);return}if(!i){for(;o<a;o++)r(t[o]);return}for(;o<a&&t[o]===e[o];o++);let s,c;t=t.slice(o),e=e.slice(o);for(s of t)e.includes(s)||r(s);for(c of e)t.includes(c)||n(c)}function ge(e){let[t,n]=w(),r=e?.throw?(e,t)=>{throw n(e instanceof Error?e:Error(t)),e}:(e,t)=>{n(e instanceof Error?e:Error(t))},i=e?.api?Array.isArray(e.api)?e.api:[e.api]:[globalThis.localStorage].filter(Boolean),o=e?.prefix?`${e.prefix}.`:``,s=new Map,c=new Proxy({},{get(t,n){let a=s.get(n);a||(a=w(void 0,{equals:!1}),s.set(n,a)),a[0]();let c=i.reduce((e,t)=>{if(e!==null||!t)return e;try{return t.getItem(`${o}${n}`)}catch(e){return r(e,`Error reading ${o}${n} from ${t.name}`),null}},null);return c!==null&&e?.deserializer?e.deserializer(c,n,e.options):c}});return e?.sync!==!1&&a(()=>{let e=e=>{let t=!1;i.forEach(n=>{try{n!==e.storageArea&&e.key&&e.newValue!==n.getItem(e.key)&&(e.newValue?n.setItem(e.key,e.newValue):n.removeItem(e.key),t=!0)}catch(t){r(t,`Error synching api ${n.name} from storage event (${e.key}=${e.newValue})`)}}),t&&e.key&&s.get(e.key)?.[1]()};`addEventListener`in globalThis?(globalThis.addEventListener(`storage`,e),h(()=>globalThis.removeEventListener(`storage`,e))):(i.forEach(t=>t.addEventListener?.(`storage`,e)),h(()=>i.forEach(t=>t.removeEventListener?.(`storage`,e))))}),[c,(t,n,a)=>{let c=e?.serializer?e.serializer(n,t,a??e.options):n,l=`${o}${t}`;i.forEach(e=>{try{e.getItem(l)!==c&&e.setItem(l,c)}catch(n){r(n,`Error setting ${o}${t} to ${c} in ${e.name}`)}});let u=s.get(t);u&&u[1]()},{clear:()=>i.forEach(e=>{try{e.clear()}catch(t){r(t,`Error clearing ${e.name}`)}}),error:t,remove:e=>i.forEach(t=>{try{t.removeItem(`${o}${e}`)}catch(n){r(n,`Error removing ${o}${e} from ${t.name}`)}}),toJSON:()=>{let t={},n=(n,r)=>{if(!t.hasOwnProperty(n)){let i=r&&e?.deserializer?e.deserializer(r,n,e.options):r;i&&(t[n]=i)}};return i.forEach(e=>{if(typeof e.getAll==`function`){let t;try{t=e.getAll()}catch(t){r(t,`Error getting all values from in ${e.name}`)}for(let e of t)n(e,t[e])}else{let i=0,a;try{for(;a=e.key(i++);)t.hasOwnProperty(a)||n(a,e.getItem(a))}catch(t){r(t,`Error getting all values from ${e.name}`)}}}),t}}]}var _e=ge,ve=e=>(typeof e.clear==`function`||(e.clear=()=>{let t;for(;t=e.key(0);)e.removeItem(t)}),e),ye=e=>{if(!e)return``;let t=``;for(let n in e){if(!e.hasOwnProperty(n))continue;let r=e[n];t+=r instanceof Date?`; ${n}=${r.toUTCString()}`:typeof r==`boolean`?`; ${n}`:`; ${n}=${r}`}return t},be=ve({_cookies:[globalThis.document,`cookie`],getItem:e=>be._cookies[0][be._cookies[1]].match(`(^|;)\\s*`+e+`\\s*=\\s*([^;]+)`)?.pop()??null,setItem:(e,t,n)=>{let r=be.getItem(e);be._cookies[0][be._cookies[1]]=`${e}=${t}${ye(n)}`;let i=Object.assign(new Event(`storage`),{key:e,oldValue:r,newValue:t,url:globalThis.document.URL,storageArea:be});window.dispatchEvent(i)},removeItem:e=>{be._cookies[0][be._cookies[1]]=`${e}=deleted${ye({expires:new Date(0)})}`},key:e=>{let t=null,n=0;return be._cookies[0][be._cookies[1]].replace(/(?:^|;)\s*(.+?)\s*=\s*[^;]+/g,(r,i)=>(!t&&i&&n++===e&&(t=i),``)),t},get length(){let e=0;return be._cookies[0][be._cookies[1]].replace(/(?:^|;)\s*.+?\s*=\s*[^;]+/g,t=>(e+=+!!t,``)),e}}),xe=1024,Se=796,Ce=700,we=`bottom-right`,Te=`bottom`,Ee=`system`,De=!1,Oe=500,ke=500,Ae=500,je=Object.keys(ce)[0],Me=1,Ne=Object.keys(f)[0],Pe=O({client:void 0,onlineManager:void 0,queryFlavor:``,version:``,shadowDOMTarget:void 0});function H(){return I(Pe)}var Fe=class extends Error{},Ie=O(void 0),Le=e=>{let[t,n]=w(null),r=()=>{let e=t();e!=null&&(e.close(),n(null))},i=(r,i)=>{if(t()!=null)return;let a=window.open(``,`TSQD-Devtools-Panel`,`width=${r},height=${i},popup`);if(!a)throw new Fe(`Failed to open popup. Please allow popups for this site to view the devtools in picture-in-picture mode.`);a.document.head.innerHTML=``,a.document.body.innerHTML=``,E(a.document),a.document.title=`TanStack Query Devtools`,a.document.body.style.margin=`0`,a.addEventListener(`pagehide`,()=>{e.setLocalStore(`pip_open`,`false`),n(null)}),[...(H().shadowDOMTarget||document).styleSheets].forEach(e=>{try{let t=[...e.cssRules].map(e=>e.cssText).join(``),n=document.createElement(`style`),r=e.ownerNode,i=``;r&&`id`in r&&(i=r.id),i&&n.setAttribute(`id`,i),n.textContent=t,a.document.head.appendChild(n)}catch{let t=document.createElement(`link`);if(e.href==null)return;t.rel=`stylesheet`,t.type=e.type,t.media=e.media.toString(),t.href=e.href,a.document.head.appendChild(t)}}),se([`focusin`,`focusout`,`pointermove`,`keydown`,`pointerdown`,`pointerup`,`click`,`mousedown`,`input`],a.document),e.setLocalStore(`pip_open`,`true`),n(a)};F(()=>{if((e.localStore.pip_open??`false`)===`true`&&!e.disabled)try{i(Number(window.innerWidth),Number(e.localStore.height||ke))}catch(t){if(t instanceof Fe){e.setLocalStore(`pip_open`,`false`),e.setLocalStore(`open`,`false`);return}throw t}}),F(()=>{let e=(H().shadowDOMTarget||document).querySelector(`#_goober`),n=t();if(e&&n){let t=new MutationObserver(()=>{let t=(H().shadowDOMTarget||n.document).querySelector(`#_goober`);t&&(t.textContent=e.textContent)});t.observe(e,{childList:!0,subtree:!0,characterDataOldValue:!0}),h(()=>{t.disconnect()})}});let a=N(()=>({pipWindow:t(),requestPipWindow:i,closePipWindow:r,disabled:e.disabled??!1}));return z(Ie.Provider,{value:a,get children(){return e.children}})},Re=()=>N(()=>{let e=I(Ie);if(!e)throw Error(`usePiPWindow must be used within a PiPProvider`);return e()}),ze=O(()=>`dark`);function U(){return I(ze)}var Be={À:`A`,Á:`A`,Â:`A`,Ã:`A`,Ä:`A`,Å:`A`,Ấ:`A`,Ắ:`A`,Ẳ:`A`,Ẵ:`A`,Ặ:`A`,Æ:`AE`,Ầ:`A`,Ằ:`A`,Ȃ:`A`,Ç:`C`,Ḉ:`C`,È:`E`,É:`E`,Ê:`E`,Ë:`E`,Ế:`E`,Ḗ:`E`,Ề:`E`,Ḕ:`E`,Ḝ:`E`,Ȇ:`E`,Ì:`I`,Í:`I`,Î:`I`,Ï:`I`,Ḯ:`I`,Ȋ:`I`,Ð:`D`,Ñ:`N`,Ò:`O`,Ó:`O`,Ô:`O`,Õ:`O`,Ö:`O`,Ø:`O`,Ố:`O`,Ṍ:`O`,Ṓ:`O`,Ȏ:`O`,Ù:`U`,Ú:`U`,Û:`U`,Ü:`U`,Ý:`Y`,à:`a`,á:`a`,â:`a`,ã:`a`,ä:`a`,å:`a`,ấ:`a`,ắ:`a`,ẳ:`a`,ẵ:`a`,ặ:`a`,æ:`ae`,ầ:`a`,ằ:`a`,ȃ:`a`,ç:`c`,ḉ:`c`,è:`e`,é:`e`,ê:`e`,ë:`e`,ế:`e`,ḗ:`e`,ề:`e`,ḕ:`e`,ḝ:`e`,ȇ:`e`,ì:`i`,í:`i`,î:`i`,ï:`i`,ḯ:`i`,ȋ:`i`,ð:`d`,ñ:`n`,ò:`o`,ó:`o`,ô:`o`,õ:`o`,ö:`o`,ø:`o`,ố:`o`,ṍ:`o`,ṓ:`o`,ȏ:`o`,ù:`u`,ú:`u`,û:`u`,ü:`u`,ý:`y`,ÿ:`y`,Ā:`A`,ā:`a`,Ă:`A`,ă:`a`,Ą:`A`,ą:`a`,Ć:`C`,ć:`c`,Ĉ:`C`,ĉ:`c`,Ċ:`C`,ċ:`c`,Č:`C`,č:`c`,C̆:`C`,c̆:`c`,Ď:`D`,ď:`d`,Đ:`D`,đ:`d`,Ē:`E`,ē:`e`,Ĕ:`E`,ĕ:`e`,Ė:`E`,ė:`e`,Ę:`E`,ę:`e`,Ě:`E`,ě:`e`,Ĝ:`G`,Ǵ:`G`,ĝ:`g`,ǵ:`g`,Ğ:`G`,ğ:`g`,Ġ:`G`,ġ:`g`,Ģ:`G`,ģ:`g`,Ĥ:`H`,ĥ:`h`,Ħ:`H`,ħ:`h`,Ḫ:`H`,ḫ:`h`,Ĩ:`I`,ĩ:`i`,Ī:`I`,ī:`i`,Ĭ:`I`,ĭ:`i`,Į:`I`,į:`i`,İ:`I`,ı:`i`,Ĳ:`IJ`,ĳ:`ij`,Ĵ:`J`,ĵ:`j`,Ķ:`K`,ķ:`k`,Ḱ:`K`,ḱ:`k`,K̆:`K`,k̆:`k`,Ĺ:`L`,ĺ:`l`,Ļ:`L`,ļ:`l`,Ľ:`L`,ľ:`l`,Ŀ:`L`,ŀ:`l`,Ł:`l`,ł:`l`,Ḿ:`M`,ḿ:`m`,M̆:`M`,m̆:`m`,Ń:`N`,ń:`n`,Ņ:`N`,ņ:`n`,Ň:`N`,ň:`n`,ŉ:`n`,N̆:`N`,n̆:`n`,Ō:`O`,ō:`o`,Ŏ:`O`,ŏ:`o`,Ő:`O`,ő:`o`,Œ:`OE`,œ:`oe`,P̆:`P`,p̆:`p`,Ŕ:`R`,ŕ:`r`,Ŗ:`R`,ŗ:`r`,Ř:`R`,ř:`r`,R̆:`R`,r̆:`r`,Ȓ:`R`,ȓ:`r`,Ś:`S`,ś:`s`,Ŝ:`S`,ŝ:`s`,Ş:`S`,Ș:`S`,ș:`s`,ş:`s`,Š:`S`,š:`s`,Ţ:`T`,ţ:`t`,ț:`t`,Ț:`T`,Ť:`T`,ť:`t`,Ŧ:`T`,ŧ:`t`,T̆:`T`,t̆:`t`,Ũ:`U`,ũ:`u`,Ū:`U`,ū:`u`,Ŭ:`U`,ŭ:`u`,Ů:`U`,ů:`u`,Ű:`U`,ű:`u`,Ų:`U`,ų:`u`,Ȗ:`U`,ȗ:`u`,V̆:`V`,v̆:`v`,Ŵ:`W`,ŵ:`w`,Ẃ:`W`,ẃ:`w`,X̆:`X`,x̆:`x`,Ŷ:`Y`,ŷ:`y`,Ÿ:`Y`,Y̆:`Y`,y̆:`y`,Ź:`Z`,ź:`z`,Ż:`Z`,ż:`z`,Ž:`Z`,ž:`z`,ſ:`s`,ƒ:`f`,Ơ:`O`,ơ:`o`,Ư:`U`,ư:`u`,Ǎ:`A`,ǎ:`a`,Ǐ:`I`,ǐ:`i`,Ǒ:`O`,ǒ:`o`,Ǔ:`U`,ǔ:`u`,Ǖ:`U`,ǖ:`u`,Ǘ:`U`,ǘ:`u`,Ǚ:`U`,ǚ:`u`,Ǜ:`U`,ǜ:`u`,Ứ:`U`,ứ:`u`,Ṹ:`U`,ṹ:`u`,Ǻ:`A`,ǻ:`a`,Ǽ:`AE`,ǽ:`ae`,Ǿ:`O`,ǿ:`o`,Þ:`TH`,þ:`th`,Ṕ:`P`,ṕ:`p`,Ṥ:`S`,ṥ:`s`,X́:`X`,x́:`x`,Ѓ:`Г`,ѓ:`г`,Ќ:`К`,ќ:`к`,A̋:`A`,a̋:`a`,E̋:`E`,e̋:`e`,I̋:`I`,i̋:`i`,Ǹ:`N`,ǹ:`n`,Ồ:`O`,ồ:`o`,Ṑ:`O`,ṑ:`o`,Ừ:`U`,ừ:`u`,Ẁ:`W`,ẁ:`w`,Ỳ:`Y`,ỳ:`y`,Ȁ:`A`,ȁ:`a`,Ȅ:`E`,ȅ:`e`,Ȉ:`I`,ȉ:`i`,Ȍ:`O`,ȍ:`o`,Ȑ:`R`,ȑ:`r`,Ȕ:`U`,ȕ:`u`,B̌:`B`,b̌:`b`,Č̣:`C`,č̣:`c`,Ê̌:`E`,ê̌:`e`,F̌:`F`,f̌:`f`,Ǧ:`G`,ǧ:`g`,Ȟ:`H`,ȟ:`h`,J̌:`J`,ǰ:`j`,Ǩ:`K`,ǩ:`k`,M̌:`M`,m̌:`m`,P̌:`P`,p̌:`p`,Q̌:`Q`,q̌:`q`,Ř̩:`R`,ř̩:`r`,Ṧ:`S`,ṧ:`s`,V̌:`V`,v̌:`v`,W̌:`W`,w̌:`w`,X̌:`X`,x̌:`x`,Y̌:`Y`,y̌:`y`,A̧:`A`,a̧:`a`,B̧:`B`,b̧:`b`,Ḑ:`D`,ḑ:`d`,Ȩ:`E`,ȩ:`e`,Ɛ̧:`E`,ɛ̧:`e`,Ḩ:`H`,ḩ:`h`,I̧:`I`,i̧:`i`,Ɨ̧:`I`,ɨ̧:`i`,M̧:`M`,m̧:`m`,O̧:`O`,o̧:`o`,Q̧:`Q`,q̧:`q`,U̧:`U`,u̧:`u`,X̧:`X`,x̧:`x`,Z̧:`Z`,z̧:`z`},Ve=Object.keys(Be).join(`|`),He=new RegExp(Ve,`g`);function Ue(e){return e.replace(He,e=>Be[e])}var W={CASE_SENSITIVE_EQUAL:7,EQUAL:6,STARTS_WITH:5,WORD_STARTS_WITH:4,CONTAINS:3,ACRONYM:2,MATCHES:1,NO_MATCH:0};function We(e,t,n){if(n||={},n.threshold=n.threshold??W.MATCHES,!n.accessors){let r=Ge(e,t,n);return{rankedValue:e,rank:r,accessorIndex:-1,accessorThreshold:n.threshold,passed:r>=n.threshold}}let r=Xe(e,n.accessors),i={rankedValue:e,rank:W.NO_MATCH,accessorIndex:-1,accessorThreshold:n.threshold,passed:!1};for(let e=0;e<r.length;e++){let a=r[e],o=Ge(a.itemValue,t,n),{minRanking:s,maxRanking:c,threshold:l=n.threshold}=a.attributes;o<s&&o>=W.MATCHES?o=s:o>c&&(o=c),o=Math.min(o,c),o>=l&&o>i.rank&&(i.rank=o,i.passed=!0,i.accessorIndex=e,i.accessorThreshold=l,i.rankedValue=a.itemValue)}return i}function Ge(e,t,n){return e=Je(e,n),t=Je(t,n),t.length>e.length?W.NO_MATCH:e===t?W.CASE_SENSITIVE_EQUAL:(e=e.toLowerCase(),t=t.toLowerCase(),e===t?W.EQUAL:e.startsWith(t)?W.STARTS_WITH:e.includes(` ${t}`)?W.WORD_STARTS_WITH:e.includes(t)?W.CONTAINS:t.length===1?W.NO_MATCH:Ke(e).includes(t)?W.ACRONYM:qe(e,t))}function Ke(e){let t=``;return e.split(` `).forEach(e=>{e.split(`-`).forEach(e=>{t+=e.substr(0,1)})}),t}function qe(e,t){let n=0,r=0;function i(e,t,r){for(let i=r,a=t.length;i<a;i++)if(t[i]===e)return n+=1,i+1;return-1}function a(e){let r=1/e,i=n/t.length;return W.MATCHES+i*r}let o=i(t[0],e,0);if(o<0)return W.NO_MATCH;r=o;for(let n=1,a=t.length;n<a;n++){let a=t[n];if(r=i(a,e,r),!(r>-1))return W.NO_MATCH}return a(r-o)}function Je(e,t){let{keepDiacritics:n}=t;return e=`${e}`,n||(e=Ue(e)),e}function Ye(e,t){let n=t;typeof t==`object`&&(n=t.accessor);let r=n(e);return r==null?[]:Array.isArray(r)?r:[String(r)]}function Xe(e,t){let n=[];for(let r=0,i=t.length;r<i;r++){let i=t[r],a=Qe(i),o=Ye(e,i);for(let e=0,t=o.length;e<t;e++)n.push({itemValue:o[e],attributes:a})}return n}var Ze={maxRanking:1/0,minRanking:-1/0};function Qe(e){return typeof e==`function`?Ze:{...Ze,...e}}var $e={data:``},et=e=>{if(typeof window==`object`){let t=(e?e.querySelector(`#_goober`):window._goober)||Object.assign(document.createElement(`style`),{innerHTML:` `,id:`_goober`});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||$e},tt=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,nt=/\/\*[^]*?\*\/|  +/g,rt=/\n+/g,it=(e,t)=>{let n=``,r=``,i=``;for(let a in e){let o=e[a];a[0]==`@`?a[1]==`i`?n=a+` `+o+`;`:r+=a[1]==`f`?it(o,a):a+`{`+it(o,a[1]==`k`?``:t)+`}`:typeof o==`object`?r+=it(o,t?t.replace(/([^,])+/g,e=>a.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+` `+t:t)):a):o!=null&&(a=/^--/.test(a)?a:a.replace(/[A-Z]/g,`-$&`).toLowerCase(),i+=it.p?it.p(a,o):a+`:`+o+`;`)}return n+(t&&i?t+`{`+i+`}`:i)+r},at={},ot=e=>{if(typeof e==`object`){let t=``;for(let n in e)t+=n+ot(e[n]);return t}return e},st=(e,t,n,r,i)=>{let a=ot(e),o=at[a]||(at[a]=(e=>{let t=0,n=11;for(;t<e.length;)n=101*n+e.charCodeAt(t++)>>>0;return`go`+n})(a));if(!at[o]){let t=a===e?(e=>{let t,n,r=[{}];for(;t=tt.exec(e.replace(nt,``));)t[4]?r.shift():t[3]?(n=t[3].replace(rt,` `).trim(),r.unshift(r[0][n]=r[0][n]||{})):r[0][t[1]]=t[2].replace(rt,` `).trim();return r[0]})(e):e;at[o]=it(i?{[`@keyframes `+o]:t}:t,n?``:`.`+o)}let s=n&&at.g?at.g:null;return n&&(at.g=at[o]),((e,t,n,r)=>{r?t.data=t.data.replace(r,e):t.data.indexOf(e)===-1&&(t.data=n?e+t.data:t.data+e)})(at[o],t,r,s),o},ct=(e,t,n)=>e.reduce((e,r,i)=>{let a=t[i];if(a&&a.call){let e=a(n),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;a=t?`.`+t:e&&typeof e==`object`?e.props?``:it(e,``):!1===e?``:e}return e+r+(a??``)},``);function G(e){let t=this||{},n=e.call?e(t.p):e;return st(n.unshift?n.raw?ct(n,[].slice.call(arguments,1),t.p):n.reduce((e,n)=>Object.assign(e,n&&n.call?n(t.p):n),{}):n,et(t.target),t.g,t.o,t.k)}G.bind({g:1}),G.bind({k:1});function lt(e){var t,n,r=``;if(typeof e==`string`||typeof e==`number`)r+=e;else if(typeof e==`object`){if(Array.isArray(e)){var i=e.length;for(t=0;t<i;t++)e[t]&&(n=lt(e[t]))&&(r&&(r+=` `),r+=n)}else for(n in e)e[n]&&(r&&(r+=` `),r+=n)}return r}function K(){for(var e,t,n=0,r=``,i=arguments.length;n<i;n++)(e=arguments[n])&&(t=lt(e))&&(r&&(r+=` `),r+=t);return r}function ut(e,t){let n=S(e),{onChange:r}=t,i=new Set(t.appear?void 0:n),a=new WeakSet,[o,s]=w([],{equals:!1}),[c]=l(),u=e=>{s(t=>(t.push.apply(t,e),t));for(let t of e)a.delete(t)},d=(e,t,n)=>e.splice(n,0,t);return N(t=>{let n=o(),s=e();if(s[C],S(c))return c(),t;if(n.length){let e=t.filter(e=>!n.includes(e));return n.length=0,r({list:e,added:[],removed:[],unchanged:e,finishRemoved:u}),e}return S(()=>{let e=new Set(s),n=s.slice(),o=[],c=[],l=[];for(let e of s)(i.has(e)?l:o).push(e);let f=!o.length;for(let r=0;r<t.length;r++){let i=t[r];e.has(i)||(a.has(i)||(c.push(i),a.add(i)),d(n,i,r)),f&&i!==n[r]&&(f=!1)}return!c.length&&f?t:(r({list:n,added:o,removed:c,unchanged:l,finishRemoved:u}),i=e,n)})},t.appear?[]:n.slice())}function dt(...e){return de(e)}var ft=e=>e instanceof Element;function pt(e,t){if(t(e))return e;if(typeof e==`function`&&!e.length)return pt(e(),t);if(Array.isArray(e)){let n=[];for(let r of e){let e=pt(r,t);e&&(Array.isArray(e)?n.push.apply(n,e):n.push(e))}return n.length?n:null}return null}function mt(e,t=ft,n=ft){let r=N(e),i=N(()=>pt(r(),t));return i.toArray=()=>{let e=i();return Array.isArray(e)?e:e?[e]:[]},i}function ht(e){return N(()=>{let t=e.name||`s`;return{enterActive:(e.enterActiveClass||t+`-enter-active`).split(` `),enter:(e.enterClass||t+`-enter`).split(` `),enterTo:(e.enterToClass||t+`-enter-to`).split(` `),exitActive:(e.exitActiveClass||t+`-exit-active`).split(` `),exit:(e.exitClass||t+`-exit`).split(` `),exitTo:(e.exitToClass||t+`-exit-to`).split(` `),move:(e.moveClass||t+`-move`).split(` `)}})}function gt(e){requestAnimationFrame(()=>requestAnimationFrame(e))}function _t(e,t,n,r){let{onBeforeEnter:i,onEnter:a,onAfterEnter:o}=t;i?.(n),n.classList.add(...e.enter),n.classList.add(...e.enterActive),queueMicrotask(()=>{if(!n.parentNode)return r?.();a?.(n,()=>s())}),gt(()=>{n.classList.remove(...e.enter),n.classList.add(...e.enterTo),(!a||a.length<2)&&(n.addEventListener(`transitionend`,s),n.addEventListener(`animationend`,s))});function s(t){(!t||t.target===n)&&(n.removeEventListener(`transitionend`,s),n.removeEventListener(`animationend`,s),n.classList.remove(...e.enterActive),n.classList.remove(...e.enterTo),o?.(n))}}function vt(e,t,n,r){let{onBeforeExit:i,onExit:a,onAfterExit:o}=t;if(!n.parentNode)return r?.();i?.(n),n.classList.add(...e.exit),n.classList.add(...e.exitActive),a?.(n,()=>s()),gt(()=>{n.classList.remove(...e.exit),n.classList.add(...e.exitTo),(!a||a.length<2)&&(n.addEventListener(`transitionend`,s),n.addEventListener(`animationend`,s))});function s(t){(!t||t.target===n)&&(r?.(),n.removeEventListener(`transitionend`,s),n.removeEventListener(`animationend`,s),n.classList.remove(...e.exitActive),n.classList.remove(...e.exitTo),o?.(n))}}var yt=e=>{let t=ht(e);return ut(mt(()=>e.children).toArray,{appear:e.appear,onChange({added:n,removed:r,finishRemoved:i,list:a}){let o=t();for(let t of n)_t(o,e,t);let s=[];for(let e of a)e.isConnected&&(e instanceof HTMLElement||e instanceof SVGElement)&&s.push({el:e,rect:e.getBoundingClientRect()});queueMicrotask(()=>{let e=[];for(let{el:t,rect:n}of s)if(t.isConnected){let r=t.getBoundingClientRect(),i=n.left-r.left,a=n.top-r.top;(i||a)&&(t.style.transform=`translate(${i}px, ${a}px)`,t.style.transitionDuration=`0s`,e.push(t))}document.body.offsetHeight;for(let t of e){let e=function(n){(n.target===t||/transform$/.test(n.propertyName))&&(t.removeEventListener(`transitionend`,e),t.classList.remove(...o.move))};t.classList.add(...o.move),t.style.transform=t.style.transitionDuration=``,t.addEventListener(`transitionend`,e)}});for(let t of r)vt(o,e,t,()=>i([t]))}})},bt=Symbol(`fallback`);function xt(e){for(let t of e)t.dispose()}function St(e,t,n,r={}){let i=new Map;return h(()=>xt(i.values())),()=>{let n=e()||[];return n[C],S(()=>{if(!n.length)return xt(i.values()),i.clear(),r.fallback?[ne(e=>(i.set(bt,{dispose:e}),r.fallback()))]:[];let e=Array(n.length),o=i.get(bt);if(!i.size||o){o?.dispose(),i.delete(bt);for(let r=0;r<n.length;r++){let i=n[r],o=t(i,r);a(e,i,r,o)}return e}let s=new Set(i.keys());for(let r=0;r<n.length;r++){let o=n[r],c=t(o,r);s.delete(c);let l=i.get(c);l?(e[r]=l.mapped,l.setIndex?.(r),l.setItem(()=>o)):a(e,o,r,c)}for(let e of s)i.get(e)?.dispose(),i.delete(e);return e})};function a(e,t,r,a){ne(o=>{let[s,c]=w(t),l={setItem:c,dispose:o};if(n.length>1){let[e,t]=w(r);l.setIndex=t,l.mapped=n(s,e)}else l.mapped=n(s);i.set(a,l),e[r]=l.mapped})}}function Ct(e){let{by:t}=e;return N(St(()=>e.each,typeof t==`function`?t:e=>e[t],e.children,`fallback`in e?{fallback:()=>e.fallback}:void 0))}function wt(e,t,n,r){return e.addEventListener(t,n,r),me(e.removeEventListener.bind(e,t,n,r))}function Tt(e,t,n,r){let i=()=>{fe(V(e)).forEach(e=>{e&&fe(V(t)).forEach(t=>wt(e,t,n,r))})};typeof e==`function`?F(i):k(i)}function Et(e,t){let n=new ResizeObserver(e);return h(n.disconnect.bind(n)),{observe:e=>n.observe(e,t),unobserve:n.unobserve.bind(n)}}function Dt(e,t,n){let r=new WeakMap,{observe:i,unobserve:a}=Et(e=>{for(let n of e){let{contentRect:e,target:i}=n,a=Math.round(e.width),o=Math.round(e.height),s=r.get(i);(!s||s.width!==a||s.height!==o)&&(t(e,i,n),r.set(i,{width:a,height:o}))}},n);F(t=>{let n=ue(fe(V(e)));return he(n,t,i,a),n},[])}var Ot=/((?:--)?(?:\w+-?)+)\s*:\s*([^;]*)/g;function kt(e){let t={},n;for(;n=Ot.exec(e);)t[n[1]]=n[2];return t}function At(e,t){if(typeof e==`string`){if(typeof t==`string`)return`${e};${t}`;e=kt(e)}else typeof t==`string`&&(t=kt(t));return{...e,...t}}function jt(e,t,n=-1){return n in e?[...e.slice(0,n),t,...e.slice(n)]:[...e,t]}function Mt(e,t){let n=[...e],r=n.indexOf(t);return r!==-1&&n.splice(r,1),n}function Nt(e){return typeof e==`number`}function Pt(e){return Object.prototype.toString.call(e)===`[object String]`}function Ft(e){return typeof e==`function`}function It(e){return t=>`${e()}-${t}`}function Lt(e,t){return e?e===t||e.contains(t):!1}function Rt(e,t=!1){let{activeElement:n}=Bt(e);if(!n?.nodeName)return null;if(Vt(n)&&n.contentDocument)return Rt(n.contentDocument.body,t);if(t){let e=n.getAttribute(`aria-activedescendant`);if(e){let t=Bt(n).getElementById(e);if(t)return t}}return n}function zt(e){return Bt(e).defaultView||window}function Bt(e){return e?e.ownerDocument||e:document}function Vt(e){return e.tagName===`IFRAME`}var Ht=(e=>(e.Escape=`Escape`,e.Enter=`Enter`,e.Tab=`Tab`,e.Space=` `,e.ArrowDown=`ArrowDown`,e.ArrowLeft=`ArrowLeft`,e.ArrowRight=`ArrowRight`,e.ArrowUp=`ArrowUp`,e.End=`End`,e.Home=`Home`,e.PageDown=`PageDown`,e.PageUp=`PageUp`,e))(Ht||{});function Ut(e){return typeof window<`u`&&window.navigator!=null&&e.test(window.navigator.userAgentData?.platform||window.navigator.platform)}function Wt(){return Ut(/^Mac/i)}function Gt(){return Ut(/^iPhone/i)}function Kt(){return Ut(/^iPad/i)||Wt()&&navigator.maxTouchPoints>1}function qt(){return Gt()||Kt()}function Jt(){return Wt()||qt()}function q(e,t){return t&&(Ft(t)?t(e):t[0](t[1],e)),e?.defaultPrevented}function J(e){return t=>{for(let n of e)q(t,n)}}function Yt(e){return Wt()?e.metaKey&&!e.ctrlKey:e.ctrlKey&&!e.metaKey}function Xt(e){if(e){if(Qt())e.focus({preventScroll:!0});else{let t=$t(e);e.focus(),en(t)}}}var Zt=null;function Qt(){if(Zt==null){Zt=!1;try{document.createElement(`div`).focus({get preventScroll(){return Zt=!0,!0}})}catch{}}return Zt}function $t(e){let t=e.parentNode,n=[],r=document.scrollingElement||document.documentElement;for(;t instanceof HTMLElement&&t!==r;)(t.offsetHeight<t.scrollHeight||t.offsetWidth<t.scrollWidth)&&n.push({element:t,scrollTop:t.scrollTop,scrollLeft:t.scrollLeft}),t=t.parentNode;return r instanceof HTMLElement&&n.push({element:r,scrollTop:r.scrollTop,scrollLeft:r.scrollLeft}),n}function en(e){for(let{element:t,scrollTop:n,scrollLeft:r}of e)t.scrollTop=n,t.scrollLeft=r}var tn=[`input:not([type='hidden']):not([disabled])`,`select:not([disabled])`,`textarea:not([disabled])`,`button:not([disabled])`,`a[href]`,`area[href]`,`[tabindex]`,`iframe`,`object`,`embed`,`audio[controls]`,`video[controls]`,`[contenteditable]:not([contenteditable='false'])`],nn=[...tn,`[tabindex]:not([tabindex="-1"]):not([disabled])`],rn=`${tn.join(`:not([hidden]),`)},[tabindex]:not([disabled]):not([hidden])`,an=nn.join(`:not([hidden]):not([tabindex="-1"]),`);function on(e,t){let n=Array.from(e.querySelectorAll(rn)).filter(sn);return t&&sn(e)&&n.unshift(e),n.forEach((e,t)=>{if(Vt(e)&&e.contentDocument){let r=e.contentDocument.body,i=on(r,!1);n.splice(t,1,...i)}}),n}function sn(e){return cn(e)&&!ln(e)}function cn(e){return e.matches(rn)&&un(e)}function ln(e){return Number.parseInt(e.getAttribute(`tabindex`)||`0`,10)<0}function un(e,t){return e.nodeName!==`#comment`&&dn(e)&&fn(e,t)&&(!e.parentElement||un(e.parentElement,e))}function dn(e){if(!(e instanceof HTMLElement)&&!(e instanceof SVGElement))return!1;let{display:t,visibility:n}=e.style,r=t!==`none`&&n!==`hidden`&&n!==`collapse`;if(r){if(!e.ownerDocument.defaultView)return r;let{getComputedStyle:t}=e.ownerDocument.defaultView,{display:n,visibility:i}=t(e);r=n!==`none`&&i!==`hidden`&&i!==`collapse`}return r}function fn(e,t){return!e.hasAttribute(`hidden`)&&(e.nodeName===`DETAILS`&&t&&t.nodeName!==`SUMMARY`?e.hasAttribute(`open`):!0)}function pn(e,t,n){let r=t?.tabbable?an:rn,i=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode(e){return t?.from?.contains(e)?NodeFilter.FILTER_REJECT:e.matches(r)&&un(e)&&(!t?.accept||t.accept(e))?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}});return t?.from&&(i.currentNode=t.from),i}function mn(e){let t=e;for(;t&&!hn(t);)t=t.parentElement;return t||document.scrollingElement||document.documentElement}function hn(e){let t=window.getComputedStyle(e);return/(auto|scroll)/.test(t.overflow+t.overflowX+t.overflowY)}function gn(){}function _n(e,t){let[n,r]=e,i=!1,a=t.length;for(let e=a,o=0,s=e-1;o<e;s=o++){let[a,c]=t[o],[l,u]=t[s],[,d]=t[s===0?e-1:s-1]||[0,0],f=(c-u)*(n-a)-(a-l)*(r-c);if(u<c){if(r>=u&&r<c){if(f===0)return!0;f>0&&(r===u?r>d&&(i=!i):i=!i)}}else if(c<u){if(r>c&&r<=u){if(f===0)return!0;f<0&&(r===u?r<d&&(i=!i):i=!i)}}else if(r===c&&(n>=l&&n<=a||n>=a&&n<=l))return!0}return i}function Y(e,t){return A(e,t)}var vn=new Map,yn=new Set;function bn(){if(typeof window>`u`)return;let e=e=>{if(!e.target)return;let n=vn.get(e.target);n||(n=new Set,vn.set(e.target,n),e.target.addEventListener(`transitioncancel`,t)),n.add(e.propertyName)},t=e=>{if(!e.target)return;let n=vn.get(e.target);if(n&&(n.delete(e.propertyName),n.size===0&&(e.target.removeEventListener(`transitioncancel`,t),vn.delete(e.target)),vn.size===0)){for(let e of yn)e();yn.clear()}};document.body.addEventListener(`transitionrun`,e),document.body.addEventListener(`transitionend`,t)}typeof document<`u`&&(document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,bn):bn());function xn(e,t){let n=Sn(e,t,`left`),r=Sn(e,t,`top`),i=t.offsetWidth,a=t.offsetHeight,o=e.scrollLeft,s=e.scrollTop,c=o+e.offsetWidth,l=s+e.offsetHeight;n<=o?o=n:n+i>c&&(o+=n+i-c),r<=s?s=r:r+a>l&&(s+=r+a-l),e.scrollLeft=o,e.scrollTop=s}function Sn(e,t,n){let r=n===`left`?`offsetLeft`:`offsetTop`,i=0;for(;t.offsetParent&&(i+=t[r],t.offsetParent!==e);){if(t.offsetParent.contains(e)){i-=e[r];break}t=t.offsetParent}return i}function Cn(e,t){if(document.contains(e)){let t=document.scrollingElement||document.documentElement;if(window.getComputedStyle(t).overflow!==`hidden`){let{left:t,top:n}=e.getBoundingClientRect();e?.scrollIntoView?.({block:`nearest`});let{left:r,top:i}=e.getBoundingClientRect();(Math.abs(t-r)>1||Math.abs(n-i)>1)&&e.scrollIntoView?.({block:`nearest`})}else{let n=mn(e);for(;e&&n&&e!==t&&n!==t;)xn(n,e),e=n,n=mn(e)}}}var wn={border:`0`,clip:`rect(0 0 0 0)`,"clip-path":`inset(50%)`,height:`1px`,margin:`0 -1px -1px 0`,overflow:`hidden`,padding:`0`,position:`absolute`,width:`1px`,"white-space":`nowrap`};function Tn(e,t){let[n,r]=w(En(t?.()));return F(()=>{r(e()?.tagName.toLowerCase()||En(t?.()))}),n}function En(e){return Pt(e)?e:void 0}function X(e){let[t,r]=n(e,[`as`]);if(!t.as)throw Error("[kobalte]: Polymorphic is missing the required `as` prop.");return z(g,A(r,{get component(){return t.as}}))}var Dn=Object.defineProperty,On=(e,t)=>{for(var n in t)Dn(e,n,{get:t[n],enumerable:!0})};On({},{Button:()=>Mn,Root:()=>jn});var kn=[`button`,`color`,`file`,`image`,`reset`,`submit`];function An(e){let t=e.tagName.toLowerCase();return t===`button`?!0:t===`input`&&e.type?kn.indexOf(e.type)!==-1:!1}function jn(e){let t,r=Y({type:`button`},e),[i,a]=n(r,[`ref`,`type`,`disabled`]),o=Tn(()=>t,()=>`button`),s=N(()=>{let e=o();return e!=null&&An({tagName:e,type:i.type})}),c=N(()=>o()===`input`),l=N(()=>o()===`a`&&t?.getAttribute(`href`)!=null);return z(X,A({as:`button`,ref(e){let n=dt(e=>t=e,i.ref);typeof n==`function`&&n(e)},get type(){return s()||c()?i.type:void 0},get role(){return!s()&&!l()?`button`:void 0},get tabIndex(){return!s()&&!l()&&!i.disabled?0:void 0},get disabled(){return s()||c()?i.disabled:void 0},get"aria-disabled"(){return!s()&&!c()&&i.disabled?!0:void 0},get"data-disabled"(){return i.disabled?``:void 0}},a))}var Mn=jn;function Nn(e){let[t,n]=w(e.defaultValue?.()),r=N(()=>e.value?.()!==void 0),i=N(()=>r()?e.value?.():t());return[i,t=>{S(()=>{let a=pe(t,i());return Object.is(a,i())||(r()||n(a),e.onChange?.(a)),a})}]}function Pn(e){let[t,n]=Nn(e);return[()=>t()??!1,n]}function Fn(e){let[t,n]=Nn(e);return[()=>t()??[],n]}function In(e={}){let[t,n]=Pn({value:()=>V(e.isSelected),defaultValue:()=>!!V(e.defaultIsSelected),onChange:t=>e.onSelectedChange?.(t)});return{isSelected:t,setIsSelected:t=>{!V(e.isReadOnly)&&!V(e.isDisabled)&&n(t)},toggle:()=>{!V(e.isReadOnly)&&!V(e.isDisabled)&&n(!t())}}}function Ln(e){let t=e.startIndex??0,n=e.startLevel??0,r=[],i=t=>{if(t==null)return``;let n=e.getKey??`key`,r=Pt(n)?t[n]:n(t);return r==null?``:String(r)},a=t=>{if(t==null)return``;let n=e.getTextValue??`textValue`,r=Pt(n)?t[n]:n(t);return r==null?``:String(r)},o=t=>{if(t==null)return!1;let n=e.getDisabled??`disabled`;return(Pt(n)?t[n]:n(t))??!1},s=t=>{if(t!=null)return Pt(e.getSectionChildren)?t[e.getSectionChildren]:e.getSectionChildren?.(t)};for(let c of e.dataSource)if(Pt(c)||Nt(c))r.push({type:`item`,rawValue:c,key:String(c),textValue:String(c),disabled:o(c),level:n,index:t}),t++;else if(s(c)!=null){r.push({type:`section`,rawValue:c,key:``,textValue:``,disabled:!1,level:n,index:t}),t++;let i=s(c)??[];if(i.length>0){let a=Ln({dataSource:i,getKey:e.getKey,getTextValue:e.getTextValue,getDisabled:e.getDisabled,getSectionChildren:e.getSectionChildren,startIndex:t,startLevel:n+1});r.push(...a),t+=a.length}}else r.push({type:`item`,rawValue:c,key:i(c),textValue:a(c),disabled:o(c),level:n,index:t}),t++;return r}function Rn(e,t=[]){return N(()=>{let n=Ln({dataSource:V(e.dataSource),getKey:V(e.getKey),getTextValue:V(e.getTextValue),getDisabled:V(e.getDisabled),getSectionChildren:V(e.getSectionChildren)});for(let e=0;e<t.length;e++)t[e]();return e.factory(n)})}var zn=new Set([`Avst`,`Arab`,`Armi`,`Syrc`,`Samr`,`Mand`,`Thaa`,`Mend`,`Nkoo`,`Adlm`,`Rohg`,`Hebr`]),Bn=new Set([`ae`,`ar`,`arc`,`bcc`,`bqi`,`ckb`,`dv`,`fa`,`glk`,`he`,`ku`,`mzn`,`nqo`,`pnb`,`ps`,`sd`,`ug`,`ur`,`yi`]);function Vn(e){if(Intl.Locale){let t=new Intl.Locale(e).maximize().script??``;return zn.has(t)}let t=e.split(`-`)[0];return Bn.has(t)}function Hn(e){return Vn(e)?`rtl`:`ltr`}function Un(){let e=typeof navigator<`u`&&(navigator.language||navigator.userLanguage)||`en-US`;return{locale:e,direction:Hn(e)}}var Wn=Un(),Gn=new Set;function Kn(){Wn=Un();for(let e of Gn)e(Wn)}function qn(){let[e,t]=w(Wn),n=N(()=>e());return a(()=>{Gn.size===0&&window.addEventListener(`languagechange`,Kn),Gn.add(t),h(()=>{Gn.delete(t),Gn.size===0&&window.removeEventListener(`languagechange`,Kn)})}),{locale:()=>n().locale,direction:()=>n().direction}}var Jn=O();function Yn(){let e=qn();return I(Jn)||e}var Xn=new Map;function Zn(e){let{locale:t}=Yn(),n=N(()=>t()+(e?Object.entries(e).sort((e,t)=>e[0]<t[0]?-1:1).join():``));return N(()=>{let r=n(),i;return Xn.has(r)&&(i=Xn.get(r)),i||(i=new Intl.Collator(t(),e),Xn.set(r,i)),i})}var Qn=class e extends Set{anchorKey;currentKey;constructor(t,n,r){super(t),t instanceof e?(this.anchorKey=n||t.anchorKey,this.currentKey=r||t.currentKey):(this.anchorKey=n,this.currentKey=r)}};function $n(e){let[t,n]=Nn(e);return[()=>t()??new Qn,n]}function er(e){return Jt()?e.altKey:e.ctrlKey}function tr(e){return Wt()?e.metaKey:e.ctrlKey}function nr(e){return new Qn(e)}function rr(e,t){if(e.size!==t.size)return!1;for(let n of e)if(!t.has(n))return!1;return!0}function ir(e){let t=Y({selectionMode:`none`,selectionBehavior:`toggle`},e),[n,r]=w(!1),[i,a]=w(),[o,s]=$n({value:N(()=>{let e=V(t.selectedKeys);return e==null?e:nr(e)}),defaultValue:N(()=>{let e=V(t.defaultSelectedKeys);return e==null?new Qn:nr(e)}),onChange:e=>t.onSelectionChange?.(e)}),[c,l]=w(V(t.selectionBehavior));return F(()=>{let e=o();V(t.selectionBehavior)===`replace`&&c()===`toggle`&&typeof e==`object`&&e.size===0&&l(`replace`)}),F(()=>{l(V(t.selectionBehavior)??`toggle`)}),{selectionMode:()=>V(t.selectionMode),disallowEmptySelection:()=>V(t.disallowEmptySelection)??!1,selectionBehavior:c,setSelectionBehavior:l,isFocused:n,setFocused:r,focusedKey:i,setFocusedKey:a,selectedKeys:o,setSelectedKeys:e=>{(V(t.allowDuplicateSelectionEvents)||!rr(e,o()))&&s(e)}}}function ar(e){let[t,n]=w(``),[r,i]=w(-1);return{typeSelectHandlers:{onKeyDown:a=>{if(V(e.isDisabled))return;let o=V(e.keyboardDelegate),s=V(e.selectionManager);if(!o.getKeyForSearch)return;let c=or(a.key);if(!c||a.ctrlKey||a.metaKey)return;c===` `&&t().trim().length>0&&(a.preventDefault(),a.stopPropagation());let l=n(e=>e+c),u=o.getKeyForSearch(l,s.focusedKey())??o.getKeyForSearch(l);u==null&&sr(l)&&(l=l[0],u=o.getKeyForSearch(l,s.focusedKey())??o.getKeyForSearch(l)),u!=null&&(s.setFocusedKey(u),e.onTypeSelect?.(u)),clearTimeout(r()),i(window.setTimeout(()=>n(``),500))}}}}function or(e){return e.length===1||!/^[A-Z]/i.test(e)?e:``}function sr(e){return e.split(``).every(t=>t===e[0])}function cr(e,t,n){let r=A({selectOnFocus:()=>V(e.selectionManager).selectionBehavior()===`replace`},e),i=()=>t(),{direction:o}=Yn(),s={top:0,left:0};Tt(()=>V(r.isVirtualized)?void 0:i(),`scroll`,()=>{let e=i();e&&(s={top:e.scrollTop,left:e.scrollLeft})});let{typeSelectHandlers:c}=ar({isDisabled:()=>V(r.disallowTypeAhead),keyboardDelegate:()=>V(r.keyboardDelegate),selectionManager:()=>V(r.selectionManager)}),l=()=>V(r.orientation)??`vertical`,u=e=>{q(e,c.onKeyDown),e.altKey&&e.key===`Tab`&&e.preventDefault();let n=t();if(!n?.contains(e.target))return;let i=V(r.selectionManager),a=V(r.selectOnFocus),s=t=>{t!=null&&(i.setFocusedKey(t),e.shiftKey&&i.selectionMode()===`multiple`?i.extendSelection(t):a&&!er(e)&&i.replaceSelection(t))},u=V(r.keyboardDelegate),d=V(r.shouldFocusWrap),f=i.focusedKey();switch(e.key){case l()===`vertical`?`ArrowDown`:`ArrowRight`:if(u.getKeyBelow){e.preventDefault();let t;t=f==null?u.getFirstKey?.():u.getKeyBelow(f),t==null&&d&&(t=u.getFirstKey?.(f)),s(t)}break;case l()===`vertical`?`ArrowUp`:`ArrowLeft`:if(u.getKeyAbove){e.preventDefault();let t;t=f==null?u.getLastKey?.():u.getKeyAbove(f),t==null&&d&&(t=u.getLastKey?.(f)),s(t)}break;case l()===`vertical`?`ArrowLeft`:`ArrowUp`:if(u.getKeyLeftOf){e.preventDefault();let t=o()===`rtl`,n;n=f==null?t?u.getFirstKey?.():u.getLastKey?.():u.getKeyLeftOf(f),s(n)}break;case l()===`vertical`?`ArrowRight`:`ArrowDown`:if(u.getKeyRightOf){e.preventDefault();let t=o()===`rtl`,n;n=f==null?t?u.getLastKey?.():u.getFirstKey?.():u.getKeyRightOf(f),s(n)}break;case`Home`:if(u.getFirstKey){e.preventDefault();let t=u.getFirstKey(f,tr(e));t!=null&&(i.setFocusedKey(t),tr(e)&&e.shiftKey&&i.selectionMode()===`multiple`?i.extendSelection(t):a&&i.replaceSelection(t))}break;case`End`:if(u.getLastKey){e.preventDefault();let t=u.getLastKey(f,tr(e));t!=null&&(i.setFocusedKey(t),tr(e)&&e.shiftKey&&i.selectionMode()===`multiple`?i.extendSelection(t):a&&i.replaceSelection(t))}break;case`PageDown`:u.getKeyPageBelow&&f!=null&&(e.preventDefault(),s(u.getKeyPageBelow(f)));break;case`PageUp`:u.getKeyPageAbove&&f!=null&&(e.preventDefault(),s(u.getKeyPageAbove(f)));break;case`a`:tr(e)&&i.selectionMode()===`multiple`&&V(r.disallowSelectAll)!==!0&&(e.preventDefault(),i.selectAll());break;case`Escape`:e.defaultPrevented||(e.preventDefault(),V(r.disallowEmptySelection)||i.clearSelection());break;case`Tab`:if(!V(r.allowsTabNavigation)){if(e.shiftKey)n.focus();else{let e=pn(n,{tabbable:!0}),t,r;do r=e.lastChild(),r&&(t=r);while(r);t&&!t.contains(document.activeElement)&&Xt(t)}break}}},d=e=>{let t=V(r.selectionManager),n=V(r.keyboardDelegate),a=V(r.selectOnFocus);if(t.isFocused())e.currentTarget.contains(e.target)||t.setFocused(!1);else if(e.currentTarget.contains(e.target)){if(t.setFocused(!0),t.focusedKey()==null){let r=e=>{e!=null&&(t.setFocusedKey(e),a&&t.replaceSelection(e))},i=e.relatedTarget;i&&e.currentTarget.compareDocumentPosition(i)&Node.DOCUMENT_POSITION_FOLLOWING?r(t.lastSelectedKey()??n.getLastKey?.()):r(t.firstSelectedKey()??n.getFirstKey?.())}else if(!V(r.isVirtualized)){let e=i();if(e){e.scrollTop=s.top,e.scrollLeft=s.left;let n=e.querySelector(`[data-key="${t.focusedKey()}"]`);n&&(Xt(n),xn(e,n))}}}},f=e=>{let t=V(r.selectionManager);e.currentTarget.contains(e.relatedTarget)||t.setFocused(!1)},m=e=>{i()===e.target&&e.preventDefault()},h=()=>{let e=V(r.autoFocus);if(!e)return;let n=V(r.selectionManager),i=V(r.keyboardDelegate),a;e===`first`&&(a=i.getFirstKey?.()),e===`last`&&(a=i.getLastKey?.());let o=n.selectedKeys();o.size&&(a=o.values().next().value),n.setFocused(!0),n.setFocusedKey(a);let s=t();s&&a==null&&!V(r.shouldUseVirtualFocus)&&Xt(s)};return a(()=>{r.deferAutoFocus?setTimeout(h,0):h()}),F(p([i,()=>V(r.isVirtualized),()=>V(r.selectionManager).focusedKey()],e=>{let[t,n,i]=e;if(n)i&&r.scrollToKey?.(i);else if(i&&t){let e=t.querySelector(`[data-key="${i}"]`);e&&xn(t,e)}})),{tabIndex:N(()=>{if(!V(r.shouldUseVirtualFocus))return V(r.selectionManager).focusedKey()==null?0:-1}),onKeyDown:u,onMouseDown:m,onFocusIn:d,onFocusOut:f}}function lr(e,t){let n=()=>V(e.selectionManager),r=()=>V(e.key),i=()=>V(e.shouldUseVirtualFocus),a=e=>{n().selectionMode()!==`none`&&(n().selectionMode()===`single`?n().isSelected(r())&&!n().disallowEmptySelection()?n().toggleSelection(r()):n().replaceSelection(r()):e?.shiftKey?n().extendSelection(r()):n().selectionBehavior()===`toggle`||tr(e)||`pointerType`in e&&e.pointerType===`touch`?n().toggleSelection(r()):n().replaceSelection(r()))},o=()=>n().isSelected(r()),s=()=>V(e.disabled)||n().isDisabled(r()),c=()=>!s()&&n().canSelectItem(r()),l=null,u=t=>{c()&&(l=t.pointerType,t.pointerType===`mouse`&&t.button===0&&!V(e.shouldSelectOnPressUp)&&a(t))},d=t=>{c()&&t.pointerType===`mouse`&&t.button===0&&V(e.shouldSelectOnPressUp)&&V(e.allowsDifferentPressOrigin)&&a(t)},f=t=>{c()&&(V(e.shouldSelectOnPressUp)&&!V(e.allowsDifferentPressOrigin)||l!==`mouse`)&&a(t)},m=e=>{c()&&[`Enter`,` `].includes(e.key)&&(er(e)?n().toggleSelection(r()):a(e))},h=e=>{s()&&e.preventDefault()},g=e=>{let a=t();i()||s()||!a||e.target===a&&n().setFocusedKey(r())},_=N(()=>{if(!(i()||s()))return r()===n().focusedKey()?0:-1}),v=N(()=>V(e.virtualized)?void 0:r());return F(p([t,r,i,()=>n().focusedKey(),()=>n().isFocused()],([t,n,r,i,a])=>{t&&n===i&&a&&!r&&document.activeElement!==t&&(e.focus?e.focus():Xt(t))})),{isSelected:o,isDisabled:s,allowsSelection:c,tabIndex:_,dataKey:v,onPointerDown:u,onPointerUp:d,onClick:f,onKeyDown:m,onMouseDown:h,onFocus:g}}var ur=class{collection;state;constructor(e,t){this.collection=e,this.state=t}selectionMode(){return this.state.selectionMode()}disallowEmptySelection(){return this.state.disallowEmptySelection()}selectionBehavior(){return this.state.selectionBehavior()}setSelectionBehavior(e){this.state.setSelectionBehavior(e)}isFocused(){return this.state.isFocused()}setFocused(e){this.state.setFocused(e)}focusedKey(){return this.state.focusedKey()}setFocusedKey(e){(e==null||this.collection().getItem(e))&&this.state.setFocusedKey(e)}selectedKeys(){return this.state.selectedKeys()}isSelected(e){if(this.state.selectionMode()===`none`)return!1;let t=this.getKey(e);return t!=null&&this.state.selectedKeys().has(t)}isEmpty(){return this.state.selectedKeys().size===0}isSelectAll(){if(this.isEmpty())return!1;let e=this.state.selectedKeys();return this.getAllSelectableKeys().every(t=>e.has(t))}firstSelectedKey(){let e;for(let t of this.state.selectedKeys()){let n=this.collection().getItem(t),r=n?.index!=null&&e?.index!=null&&n.index<e.index;(!e||r)&&(e=n)}return e?.key}lastSelectedKey(){let e;for(let t of this.state.selectedKeys()){let n=this.collection().getItem(t),r=n?.index!=null&&e?.index!=null&&n.index>e.index;(!e||r)&&(e=n)}return e?.key}extendSelection(e){if(this.selectionMode()===`none`)return;if(this.selectionMode()===`single`){this.replaceSelection(e);return}let t=this.getKey(e);if(t==null)return;let n=this.state.selectedKeys(),r=n.anchorKey||t,i=new Qn(n,r,t);for(let e of this.getKeyRange(r,n.currentKey||t))i.delete(e);for(let e of this.getKeyRange(t,r))this.canSelectItem(e)&&i.add(e);this.state.setSelectedKeys(i)}getKeyRange(e,t){let n=this.collection().getItem(e),r=this.collection().getItem(t);return n&&r?n.index!=null&&r.index!=null&&n.index<=r.index?this.getKeyRangeInternal(e,t):this.getKeyRangeInternal(t,e):[]}getKeyRangeInternal(e,t){let n=[],r=e;for(;r!=null;){let e=this.collection().getItem(r);if(e&&e.type===`item`&&n.push(r),r===t)return n;r=this.collection().getKeyAfter(r)}return[]}getKey(e){let t=this.collection().getItem(e);return t?!t||t.type!==`item`?null:t.key:e}toggleSelection(e){if(this.selectionMode()===`none`)return;if(this.selectionMode()===`single`&&!this.isSelected(e)){this.replaceSelection(e);return}let t=this.getKey(e);if(t==null)return;let n=new Qn(this.state.selectedKeys());n.has(t)?n.delete(t):this.canSelectItem(t)&&(n.add(t),n.anchorKey=t,n.currentKey=t),!(this.disallowEmptySelection()&&n.size===0)&&this.state.setSelectedKeys(n)}replaceSelection(e){if(this.selectionMode()===`none`)return;let t=this.getKey(e);if(t==null)return;let n=this.canSelectItem(t)?new Qn([t],t,t):new Qn;this.state.setSelectedKeys(n)}setSelectedKeys(e){if(this.selectionMode()===`none`)return;let t=new Qn;for(let n of e){let e=this.getKey(n);if(e!=null&&(t.add(e),this.selectionMode()===`single`))break}this.state.setSelectedKeys(t)}selectAll(){this.selectionMode()===`multiple`&&this.state.setSelectedKeys(new Set(this.getAllSelectableKeys()))}clearSelection(){let e=this.state.selectedKeys();!this.disallowEmptySelection()&&e.size>0&&this.state.setSelectedKeys(new Qn)}toggleSelectAll(){this.isSelectAll()?this.clearSelection():this.selectAll()}select(e,t){this.selectionMode()!==`none`&&(this.selectionMode()===`single`?this.isSelected(e)&&!this.disallowEmptySelection()?this.toggleSelection(e):this.replaceSelection(e):this.selectionBehavior()===`toggle`||t&&t.pointerType===`touch`?this.toggleSelection(e):this.replaceSelection(e))}isSelectionEqual(e){if(e===this.state.selectedKeys())return!0;let t=this.selectedKeys();if(e.size!==t.size)return!1;for(let n of e)if(!t.has(n))return!1;for(let n of t)if(!e.has(n))return!1;return!0}canSelectItem(e){if(this.state.selectionMode()===`none`)return!1;let t=this.collection().getItem(e);return t!=null&&!t.disabled}isDisabled(e){let t=this.collection().getItem(e);return!t||t.disabled}getAllSelectableKeys(){let e=[];return(t=>{for(;t!=null;){if(this.canSelectItem(t)){let n=this.collection().getItem(t);if(!n)continue;n.type===`item`&&e.push(t)}t=this.collection().getKeyAfter(t)}})(this.collection().getFirstKey()),e}},dr=class{keyMap=new Map;iterable;firstKey;lastKey;constructor(e){this.iterable=e;for(let t of e)this.keyMap.set(t.key,t);if(this.keyMap.size===0)return;let t,n=0;for(let[e,r]of this.keyMap)t?(t.nextKey=e,r.prevKey=t.key):(this.firstKey=e,r.prevKey=void 0),r.type===`item`&&(r.index=n++),t=r,t.nextKey=void 0;this.lastKey=t.key}*[Symbol.iterator](){yield*this.iterable}getSize(){return this.keyMap.size}getKeys(){return this.keyMap.keys()}getKeyBefore(e){return this.keyMap.get(e)?.prevKey}getKeyAfter(e){return this.keyMap.get(e)?.nextKey}getFirstKey(){return this.firstKey}getLastKey(){return this.lastKey}getItem(e){return this.keyMap.get(e)}at(e){let t=[...this.getKeys()];return this.getItem(t[e])}};function fr(e){let t=ir(e),n=Rn({dataSource:()=>V(e.dataSource),getKey:()=>V(e.getKey),getTextValue:()=>V(e.getTextValue),getDisabled:()=>V(e.getDisabled),getSectionChildren:()=>V(e.getSectionChildren),factory:t=>e.filter?new dr(e.filter(t)):new dr(t)},[()=>e.filter]),r=new ur(n,t);return D(()=>{let e=t.focusedKey();e!=null&&!n().getItem(e)&&t.setFocusedKey(void 0)}),{collection:n,selectionManager:()=>r}}var pr=O();function mr(){return I(pr)}function hr(){let e=mr();if(e===void 0)throw Error("[kobalte]: `useDomCollectionContext` must be used within a `DomCollectionProvider` component");return e}function gr(e,t){return!!(t.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_PRECEDING)}function _r(e,t){let n=t.ref();if(!n)return-1;let r=e.length;if(!r)return-1;for(;r--;){let t=e[r]?.ref();if(t&&gr(t,n))return r+1}return 0}function vr(e){let t=e.map((e,t)=>[t,e]),n=!1;return t.sort(([e,t],[r,i])=>{let a=t.ref(),o=i.ref();return a===o||!a||!o?0:gr(a,o)?(e>r&&(n=!0),-1):(e<r&&(n=!0),1)}),n?t.map(([e,t])=>t):e}function yr(e,t){let n=vr(e);e!==n&&t(n)}function br(e){let t=e[0],n=e[e.length-1]?.ref(),r=t?.ref()?.parentElement;for(;r;){if(n&&r.contains(n))return r;r=r.parentElement}return Bt(r).body}function xr(e,t){F(()=>{let n=setTimeout(()=>{yr(e(),t)});h(()=>clearTimeout(n))})}function Sr(e,t){if(typeof IntersectionObserver!=`function`){xr(e,t);return}let n=[];F(()=>{let r=()=>{let r=!!n.length;n=e(),r&&yr(e(),t)},i=br(e()),a=new IntersectionObserver(r,{root:i});for(let t of e()){let e=t.ref();e&&a.observe(e)}h(()=>a.disconnect())})}function Cr(e={}){let[t,n]=Fn({value:()=>V(e.items),onChange:t=>e.onItemsChange?.(t)});Sr(t,n);let r=e=>(n(t=>jt(t,e,_r(t,e))),()=>{n(t=>{let n=t.filter(t=>t.ref()!==e.ref());return t.length===n.length?t:n})});return{DomCollectionProvider:e=>z(pr.Provider,{value:{registerItem:r},get children(){return e.children}})}}function wr(e){let t=hr(),n=Y({shouldRegisterItem:!0},e);F(()=>{if(!n.shouldRegisterItem)return;let e=t.registerItem(n.getItem());h(e)})}var Tr=[`top`,`right`,`bottom`,`left`],Er=Math.min,Dr=Math.max,Or=Math.round,kr=Math.floor,Ar=e=>({x:e,y:e}),jr={left:`right`,right:`left`,bottom:`top`,top:`bottom`};function Mr(e,t,n){return Dr(e,Er(t,n))}function Nr(e,t){return typeof e==`function`?e(t):e}function Pr(e){return e.split(`-`)[0]}function Fr(e){return e.split(`-`)[1]}function Ir(e){return e===`x`?`y`:`x`}function Lr(e){return e===`y`?`height`:`width`}function Rr(e){let t=e[0];return t===`t`||t===`b`?`y`:`x`}function zr(e){return Ir(Rr(e))}function Br(e,t,n){n===void 0&&(n=!1);let r=Fr(e),i=zr(e),a=Lr(i),o=i===`x`?r===(n?`end`:`start`)?`right`:`left`:r===`start`?`bottom`:`top`;return t.reference[a]>t.floating[a]&&(o=Yr(o)),[o,Yr(o)]}function Vr(e){let t=Yr(e);return[Hr(e),t,Hr(t)]}function Hr(e){return e.includes(`start`)?e.replace(`start`,`end`):e.replace(`end`,`start`)}var Ur=[`left`,`right`],Wr=[`right`,`left`],Gr=[`top`,`bottom`],Kr=[`bottom`,`top`];function qr(e,t,n){switch(e){case`top`:case`bottom`:return n?t?Wr:Ur:t?Ur:Wr;case`left`:case`right`:return t?Gr:Kr;default:return[]}}function Jr(e,t,n,r){let i=Fr(e),a=qr(Pr(e),n===`start`,r);return i&&(a=a.map(e=>e+`-`+i),t&&(a=a.concat(a.map(Hr)))),a}function Yr(e){let t=Pr(e);return jr[t]+e.slice(t.length)}function Xr(e){return{top:0,right:0,bottom:0,left:0,...e}}function Zr(e){return typeof e==`number`?{top:e,right:e,bottom:e,left:e}:Xr(e)}function Qr(e){let{x:t,y:n,width:r,height:i}=e;return{width:r,height:i,top:n,left:t,right:t+r,bottom:n+i,x:t,y:n}}function $r(e,t,n){let{reference:r,floating:i}=e,a=Rr(t),o=zr(t),s=Lr(o),c=Pr(t),l=a===`y`,u=r.x+r.width/2-i.width/2,d=r.y+r.height/2-i.height/2,f=r[s]/2-i[s]/2,p;switch(c){case`top`:p={x:u,y:r.y-i.height};break;case`bottom`:p={x:u,y:r.y+r.height};break;case`right`:p={x:r.x+r.width,y:d};break;case`left`:p={x:r.x-i.width,y:d};break;default:p={x:r.x,y:r.y}}switch(Fr(t)){case`start`:p[o]-=f*(n&&l?-1:1);break;case`end`:p[o]+=f*(n&&l?-1:1)}return p}async function ei(e,t){t===void 0&&(t={});let{x:n,y:r,platform:i,rects:a,elements:o,strategy:s}=e,{boundary:c=`clippingAncestors`,rootBoundary:l=`viewport`,elementContext:u=`floating`,altBoundary:d=!1,padding:f=0}=Nr(t,e),p=Zr(f),m=o[d?u===`floating`?`reference`:`floating`:u],h=Qr(await i.getClippingRect({element:await(i.isElement==null?void 0:i.isElement(m))??!0?m:m.contextElement||await(i.getDocumentElement==null?void 0:i.getDocumentElement(o.floating)),boundary:c,rootBoundary:l,strategy:s})),g=u===`floating`?{x:n,y:r,width:a.floating.width,height:a.floating.height}:a.reference,_=await(i.getOffsetParent==null?void 0:i.getOffsetParent(o.floating)),v=await(i.isElement==null?void 0:i.isElement(_))&&await(i.getScale==null?void 0:i.getScale(_))||{x:1,y:1},y=Qr(i.convertOffsetParentRelativeRectToViewportRelativeRect?await i.convertOffsetParentRelativeRectToViewportRelativeRect({elements:o,rect:g,offsetParent:_,strategy:s}):g);return{top:(h.top-y.top+p.top)/v.y,bottom:(y.bottom-h.bottom+p.bottom)/v.y,left:(h.left-y.left+p.left)/v.x,right:(y.right-h.right+p.right)/v.x}}var ti=50,ni=async(e,t,n)=>{let{placement:r=`bottom`,strategy:i=`absolute`,middleware:a=[],platform:o}=n,s=o.detectOverflow?o:{...o,detectOverflow:ei},c=await(o.isRTL==null?void 0:o.isRTL(t)),l=await o.getElementRects({reference:e,floating:t,strategy:i}),{x:u,y:d}=$r(l,r,c),f=r,p=0,m={};for(let n=0;n<a.length;n++){let h=a[n];if(!h)continue;let{name:g,fn:_}=h,{x:v,y,data:b,reset:x}=await _({x:u,y:d,initialPlacement:r,placement:f,strategy:i,middlewareData:m,rects:l,platform:s,elements:{reference:e,floating:t}});u=v??u,d=y??d,m[g]={...m[g],...b},x&&p<ti&&(p++,typeof x==`object`&&(x.placement&&(f=x.placement),x.rects&&(l=x.rects===!0?await o.getElementRects({reference:e,floating:t,strategy:i}):x.rects),{x:u,y:d}=$r(l,f,c)),n=-1)}return{x:u,y:d,placement:f,strategy:i,middlewareData:m}},ri=e=>({name:`arrow`,options:e,async fn(t){let{x:n,y:r,placement:i,rects:a,platform:o,elements:s,middlewareData:c}=t,{element:l,padding:u=0}=Nr(e,t)||{};if(l==null)return{};let d=Zr(u),f={x:n,y:r},p=zr(i),m=Lr(p),h=await o.getDimensions(l),g=p===`y`,_=g?`top`:`left`,v=g?`bottom`:`right`,y=g?`clientHeight`:`clientWidth`,b=a.reference[m]+a.reference[p]-f[p]-a.floating[m],x=f[p]-a.reference[p],S=await(o.getOffsetParent==null?void 0:o.getOffsetParent(l)),C=S?S[y]:0;(!C||!await(o.isElement==null?void 0:o.isElement(S)))&&(C=s.floating[y]||a.floating[m]);let w=b/2-x/2,T=C/2-h[m]/2-1,ee=Er(d[_],T),E=Er(d[v],T),D=ee,te=C-h[m]-E,O=C/2-h[m]/2+w,ne=Mr(D,O,te),k=!c.arrow&&Fr(i)!=null&&O!==ne&&a.reference[m]/2-(O<D?ee:E)-h[m]/2<0,re=k?O<D?O-D:O-te:0;return{[p]:f[p]+re,data:{[p]:ne,centerOffset:O-ne-re,...k&&{alignmentOffset:re}},reset:k}}}),ii=function(e){return e===void 0&&(e={}),{name:`flip`,options:e,async fn(t){var n;let{placement:r,middlewareData:i,rects:a,initialPlacement:o,platform:s,elements:c}=t,{mainAxis:l=!0,crossAxis:u=!0,fallbackPlacements:d,fallbackStrategy:f=`bestFit`,fallbackAxisSideDirection:p=`none`,flipAlignment:m=!0,...h}=Nr(e,t);if((n=i.arrow)!=null&&n.alignmentOffset)return{};let g=Pr(r),_=Rr(o),v=Pr(o)===o,y=await(s.isRTL==null?void 0:s.isRTL(c.floating)),b=d||(v||!m?[Yr(o)]:Vr(o)),x=p!==`none`;!d&&x&&b.push(...Jr(o,m,p,y));let S=[o,...b],C=await s.detectOverflow(t,h),w=[],T=i.flip?.overflows||[];if(l&&w.push(C[g]),u){let e=Br(r,a,y);w.push(C[e[0]],C[e[1]])}if(T=[...T,{placement:r,overflows:w}],!w.every(e=>e<=0)){let e=(i.flip?.index||0)+1,t=S[e];if(t&&(u!==`alignment`||_===Rr(t)||T.every(e=>Rr(e.placement)!==_||e.overflows[0]>0)))return{data:{index:e,overflows:T},reset:{placement:t}};let n=T.filter(e=>e.overflows[0]<=0).sort((e,t)=>e.overflows[1]-t.overflows[1])[0]?.placement;if(!n)switch(f){case`bestFit`:{let e=T.filter(e=>{if(x){let t=Rr(e.placement);return t===_||t===`y`}return!0}).map(e=>[e.placement,e.overflows.filter(e=>e>0).reduce((e,t)=>e+t,0)]).sort((e,t)=>e[1]-t[1])[0]?.[0];e&&(n=e);break}case`initialPlacement`:n=o}if(r!==n)return{reset:{placement:n}}}return{}}}};function ai(e,t){return{top:e.top-t.height,right:e.right-t.width,bottom:e.bottom-t.height,left:e.left-t.width}}function oi(e){return Tr.some(t=>e[t]>=0)}var si=function(e){return e===void 0&&(e={}),{name:`hide`,options:e,async fn(t){let{rects:n,platform:r}=t,{strategy:i=`referenceHidden`,...a}=Nr(e,t);switch(i){case`referenceHidden`:{let e=ai(await r.detectOverflow(t,{...a,elementContext:`reference`}),n.reference);return{data:{referenceHiddenOffsets:e,referenceHidden:oi(e)}}}case`escaped`:{let e=ai(await r.detectOverflow(t,{...a,altBoundary:!0}),n.floating);return{data:{escapedOffsets:e,escaped:oi(e)}}}default:return{}}}}},ci=new Set([`left`,`top`]);async function li(e,t){let{placement:n,platform:r,elements:i}=e,a=await(r.isRTL==null?void 0:r.isRTL(i.floating)),o=Pr(n),s=Fr(n),c=Rr(n)===`y`,l=ci.has(o)?-1:1,u=a&&c?-1:1,d=Nr(t,e),{mainAxis:f,crossAxis:p,alignmentAxis:m}=typeof d==`number`?{mainAxis:d,crossAxis:0,alignmentAxis:null}:{mainAxis:d.mainAxis||0,crossAxis:d.crossAxis||0,alignmentAxis:d.alignmentAxis};return s&&typeof m==`number`&&(p=s===`end`?m*-1:m),c?{x:p*u,y:f*l}:{x:f*l,y:p*u}}var ui=function(e){return e===void 0&&(e=0),{name:`offset`,options:e,async fn(t){var n;let{x:r,y:i,placement:a,middlewareData:o}=t,s=await li(t,e);return a===o.offset?.placement&&(n=o.arrow)!=null&&n.alignmentOffset?{}:{x:r+s.x,y:i+s.y,data:{...s,placement:a}}}}},di=function(e){return e===void 0&&(e={}),{name:`shift`,options:e,async fn(t){let{x:n,y:r,placement:i,platform:a}=t,{mainAxis:o=!0,crossAxis:s=!1,limiter:c={fn:e=>{let{x:t,y:n}=e;return{x:t,y:n}}},...l}=Nr(e,t),u={x:n,y:r},d=await a.detectOverflow(t,l),f=Rr(Pr(i)),p=Ir(f),m=u[p],h=u[f];if(o){let e=p===`y`?`top`:`left`,t=p===`y`?`bottom`:`right`,n=m+d[e],r=m-d[t];m=Mr(n,m,r)}if(s){let e=f===`y`?`top`:`left`,t=f===`y`?`bottom`:`right`,n=h+d[e],r=h-d[t];h=Mr(n,h,r)}let g=c.fn({...t,[p]:m,[f]:h});return{...g,data:{x:g.x-n,y:g.y-r,enabled:{[p]:o,[f]:s}}}}}},fi=function(e){return e===void 0&&(e={}),{name:`size`,options:e,async fn(t){var n,r;let{placement:i,rects:a,platform:o,elements:s}=t,{apply:c=()=>{},...l}=Nr(e,t),u=await o.detectOverflow(t,l),d=Pr(i),f=Fr(i),p=Rr(i)===`y`,{width:m,height:h}=a.floating,g,_;d===`top`||d===`bottom`?(g=d,_=f===(await(o.isRTL==null?void 0:o.isRTL(s.floating))?`start`:`end`)?`left`:`right`):(_=d,g=f===`end`?`top`:`bottom`);let v=h-u.top-u.bottom,y=m-u.left-u.right,b=Er(h-u[g],v),x=Er(m-u[_],y),S=!t.middlewareData.shift,C=b,w=x;if((n=t.middlewareData.shift)!=null&&n.enabled.x&&(w=y),(r=t.middlewareData.shift)!=null&&r.enabled.y&&(C=v),S&&!f){let e=Dr(u.left,0),t=Dr(u.right,0),n=Dr(u.top,0),r=Dr(u.bottom,0);p?w=m-2*(e!==0||t!==0?e+t:Dr(u.left,u.right)):C=h-2*(n!==0||r!==0?n+r:Dr(u.top,u.bottom))}await c({...t,availableWidth:w,availableHeight:C});let T=await o.getDimensions(s.floating);return m!==T.width||h!==T.height?{reset:{rects:!0}}:{}}}};function pi(){return typeof window<`u`}function mi(e){return _i(e)?(e.nodeName||``).toLowerCase():`#document`}function hi(e){var t;return(e==null||(t=e.ownerDocument)==null?void 0:t.defaultView)||window}function gi(e){return((_i(e)?e.ownerDocument:e.document)||window.document)?.documentElement}function _i(e){return pi()?e instanceof Node||e instanceof hi(e).Node:!1}function vi(e){return pi()?e instanceof Element||e instanceof hi(e).Element:!1}function yi(e){return pi()?e instanceof HTMLElement||e instanceof hi(e).HTMLElement:!1}function bi(e){return!pi()||typeof ShadowRoot>`u`?!1:e instanceof ShadowRoot||e instanceof hi(e).ShadowRoot}function xi(e){let{overflow:t,overflowX:n,overflowY:r,display:i}=Mi(e);return/auto|scroll|overlay|hidden|clip/.test(t+r+n)&&i!==`inline`&&i!==`contents`}function Si(e){return/^(table|td|th)$/.test(mi(e))}function Ci(e){try{if(e.matches(`:popover-open`))return!0}catch{}try{return e.matches(`:modal`)}catch{return!1}}var wi=/transform|translate|scale|rotate|perspective|filter/,Ti=/paint|layout|strict|content/,Ei=e=>!!e&&e!==`none`,Di;function Oi(e){let t=vi(e)?Mi(e):e;return Ei(t.transform)||Ei(t.translate)||Ei(t.scale)||Ei(t.rotate)||Ei(t.perspective)||!Ai()&&(Ei(t.backdropFilter)||Ei(t.filter))||wi.test(t.willChange||``)||Ti.test(t.contain||``)}function ki(e){let t=Pi(e);for(;yi(t)&&!ji(t);){if(Oi(t))return t;if(Ci(t))return null;t=Pi(t)}return null}function Ai(){return Di??=typeof CSS<`u`&&CSS.supports&&CSS.supports(`-webkit-backdrop-filter`,`none`),Di}function ji(e){return/^(html|body|#document)$/.test(mi(e))}function Mi(e){return hi(e).getComputedStyle(e)}function Ni(e){return vi(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:{scrollLeft:e.scrollX,scrollTop:e.scrollY}}function Pi(e){if(mi(e)===`html`)return e;let t=e.assignedSlot||e.parentNode||bi(e)&&e.host||gi(e);return bi(t)?t.host:t}function Fi(e){let t=Pi(e);return ji(t)?e.ownerDocument?e.ownerDocument.body:e.body:yi(t)&&xi(t)?t:Fi(t)}function Ii(e,t,n){t===void 0&&(t=[]),n===void 0&&(n=!0);let r=Fi(e),i=r===e.ownerDocument?.body,a=hi(r);if(i){let e=Li(a);return t.concat(a,a.visualViewport||[],xi(r)?r:[],e&&n?Ii(e):[])}return t.concat(r,Ii(r,[],n))}function Li(e){return e.parent&&Object.getPrototypeOf(e.parent)?e.frameElement:null}function Ri(e){let t=Mi(e),n=parseFloat(t.width)||0,r=parseFloat(t.height)||0,i=yi(e),a=i?e.offsetWidth:n,o=i?e.offsetHeight:r,s=Or(n)!==a||Or(r)!==o;return s&&(n=a,r=o),{width:n,height:r,$:s}}function zi(e){return vi(e)?e:e.contextElement}function Bi(e){let t=zi(e);if(!yi(t))return Ar(1);let n=t.getBoundingClientRect(),{width:r,height:i,$:a}=Ri(t),o=(a?Or(n.width):n.width)/r,s=(a?Or(n.height):n.height)/i;return(!o||!Number.isFinite(o))&&(o=1),(!s||!Number.isFinite(s))&&(s=1),{x:o,y:s}}var Vi=Ar(0);function Hi(e){let t=hi(e);return!Ai()||!t.visualViewport?Vi:{x:t.visualViewport.offsetLeft,y:t.visualViewport.offsetTop}}function Ui(e,t,n){return t===void 0&&(t=!1),!n||t&&n!==hi(e)?!1:t}function Wi(e,t,n,r){t===void 0&&(t=!1),n===void 0&&(n=!1);let i=e.getBoundingClientRect(),a=zi(e),o=Ar(1);t&&(r?vi(r)&&(o=Bi(r)):o=Bi(e));let s=Ui(a,n,r)?Hi(a):Ar(0),c=(i.left+s.x)/o.x,l=(i.top+s.y)/o.y,u=i.width/o.x,d=i.height/o.y;if(a){let e=hi(a),t=r&&vi(r)?hi(r):r,n=e,i=Li(n);for(;i&&r&&t!==n;){let e=Bi(i),t=i.getBoundingClientRect(),r=Mi(i),a=t.left+(i.clientLeft+parseFloat(r.paddingLeft))*e.x,o=t.top+(i.clientTop+parseFloat(r.paddingTop))*e.y;c*=e.x,l*=e.y,u*=e.x,d*=e.y,c+=a,l+=o,n=hi(i),i=Li(n)}}return Qr({width:u,height:d,x:c,y:l})}function Gi(e,t){let n=Ni(e).scrollLeft;return t?t.left+n:Wi(gi(e)).left+n}function Ki(e,t){let n=e.getBoundingClientRect();return{x:n.left+t.scrollLeft-Gi(e,n),y:n.top+t.scrollTop}}function qi(e){let{elements:t,rect:n,offsetParent:r,strategy:i}=e,a=i===`fixed`,o=gi(r),s=t?Ci(t.floating):!1;if(r===o||s&&a)return n;let c={scrollLeft:0,scrollTop:0},l=Ar(1),u=Ar(0),d=yi(r);if((d||!d&&!a)&&((mi(r)!==`body`||xi(o))&&(c=Ni(r)),d)){let e=Wi(r);l=Bi(r),u.x=e.x+r.clientLeft,u.y=e.y+r.clientTop}let f=o&&!d&&!a?Ki(o,c):Ar(0);return{width:n.width*l.x,height:n.height*l.y,x:n.x*l.x-c.scrollLeft*l.x+u.x+f.x,y:n.y*l.y-c.scrollTop*l.y+u.y+f.y}}function Ji(e){return Array.from(e.getClientRects())}function Yi(e){let t=gi(e),n=Ni(e),r=e.ownerDocument.body,i=Dr(t.scrollWidth,t.clientWidth,r.scrollWidth,r.clientWidth),a=Dr(t.scrollHeight,t.clientHeight,r.scrollHeight,r.clientHeight),o=-n.scrollLeft+Gi(e),s=-n.scrollTop;return Mi(r).direction===`rtl`&&(o+=Dr(t.clientWidth,r.clientWidth)-i),{width:i,height:a,x:o,y:s}}var Xi=25;function Zi(e,t){let n=hi(e),r=gi(e),i=n.visualViewport,a=r.clientWidth,o=r.clientHeight,s=0,c=0;if(i){a=i.width,o=i.height;let e=Ai();(!e||e&&t===`fixed`)&&(s=i.offsetLeft,c=i.offsetTop)}let l=Gi(r);if(l<=0){let e=r.ownerDocument,t=e.body,n=getComputedStyle(t),i=e.compatMode===`CSS1Compat`&&parseFloat(n.marginLeft)+parseFloat(n.marginRight)||0,o=Math.abs(r.clientWidth-t.clientWidth-i);o<=Xi&&(a-=o)}else l<=Xi&&(a+=l);return{width:a,height:o,x:s,y:c}}function Qi(e,t){let n=Wi(e,!0,t===`fixed`),r=n.top+e.clientTop,i=n.left+e.clientLeft,a=yi(e)?Bi(e):Ar(1);return{width:e.clientWidth*a.x,height:e.clientHeight*a.y,x:i*a.x,y:r*a.y}}function $i(e,t,n){let r;if(t===`viewport`)r=Zi(e,n);else if(t===`document`)r=Yi(gi(e));else if(vi(t))r=Qi(t,n);else{let n=Hi(e);r={x:t.x-n.x,y:t.y-n.y,width:t.width,height:t.height}}return Qr(r)}function ea(e,t){let n=Pi(e);return n===t||!vi(n)||ji(n)?!1:Mi(n).position===`fixed`||ea(n,t)}function ta(e,t){let n=t.get(e);if(n)return n;let r=Ii(e,[],!1).filter(e=>vi(e)&&mi(e)!==`body`),i=null,a=Mi(e).position===`fixed`,o=a?Pi(e):e;for(;vi(o)&&!ji(o);){let t=Mi(o),n=Oi(o);!n&&t.position===`fixed`&&(i=null),(a?!n&&!i:!n&&t.position===`static`&&i&&(i.position===`absolute`||i.position===`fixed`)||xi(o)&&!n&&ea(e,o))?r=r.filter(e=>e!==o):i=t,o=Pi(o)}return t.set(e,r),r}function na(e){let{element:t,boundary:n,rootBoundary:r,strategy:i}=e,a=[...n===`clippingAncestors`?Ci(t)?[]:ta(t,this._c):[].concat(n),r],o=$i(t,a[0],i),s=o.top,c=o.right,l=o.bottom,u=o.left;for(let e=1;e<a.length;e++){let n=$i(t,a[e],i);s=Dr(n.top,s),c=Er(n.right,c),l=Er(n.bottom,l),u=Dr(n.left,u)}return{width:c-u,height:l-s,x:u,y:s}}function ra(e){let{width:t,height:n}=Ri(e);return{width:t,height:n}}function ia(e,t,n){let r=yi(t),i=gi(t),a=n===`fixed`,o=Wi(e,!0,a,t),s={scrollLeft:0,scrollTop:0},c=Ar(0);function l(){c.x=Gi(i)}if(r||!r&&!a){if((mi(t)!==`body`||xi(i))&&(s=Ni(t)),r){let e=Wi(t,!0,a,t);c.x=e.x+t.clientLeft,c.y=e.y+t.clientTop}else i&&l()}a&&!r&&i&&l();let u=i&&!r&&!a?Ki(i,s):Ar(0);return{x:o.left+s.scrollLeft-c.x-u.x,y:o.top+s.scrollTop-c.y-u.y,width:o.width,height:o.height}}function aa(e){return Mi(e).position===`static`}function oa(e,t){if(!yi(e)||Mi(e).position===`fixed`)return null;if(t)return t(e);let n=e.offsetParent;return gi(e)===n&&(n=n.ownerDocument.body),n}function sa(e,t){let n=hi(e);if(Ci(e))return n;if(!yi(e)){let t=Pi(e);for(;t&&!ji(t);){if(vi(t)&&!aa(t))return t;t=Pi(t)}return n}let r=oa(e,t);for(;r&&Si(r)&&aa(r);)r=oa(r,t);return r&&ji(r)&&aa(r)&&!Oi(r)?n:r||ki(e)||n}var ca=async function(e){let t=this.getOffsetParent||sa,n=this.getDimensions,r=await n(e.floating);return{reference:ia(e.reference,await t(e.floating),e.strategy),floating:{x:0,y:0,width:r.width,height:r.height}}};function la(e){return Mi(e).direction===`rtl`}var ua={convertOffsetParentRelativeRectToViewportRelativeRect:qi,getDocumentElement:gi,getClippingRect:na,getOffsetParent:sa,getElementRects:ca,getClientRects:Ji,getDimensions:ra,getScale:Bi,isElement:vi,isRTL:la};function da(e,t){return e.x===t.x&&e.y===t.y&&e.width===t.width&&e.height===t.height}function fa(e,t){let n=null,r,i=gi(e);function a(){var e;clearTimeout(r),(e=n)==null||e.disconnect(),n=null}function o(s,c){s===void 0&&(s=!1),c===void 0&&(c=1),a();let l=e.getBoundingClientRect(),{left:u,top:d,width:f,height:p}=l;if(s||t(),!f||!p)return;let m=kr(d),h=kr(i.clientWidth-(u+f)),g=kr(i.clientHeight-(d+p)),_=kr(u),v={rootMargin:-m+`px `+-h+`px `+-g+`px `+-_+`px`,threshold:Dr(0,Er(1,c))||1},y=!0;function b(t){let n=t[0].intersectionRatio;if(n!==c){if(!y)return o();n?o(!1,n):r=setTimeout(()=>{o(!1,1e-7)},1e3)}n===1&&!da(l,e.getBoundingClientRect())&&o(),y=!1}try{n=new IntersectionObserver(b,{...v,root:i.ownerDocument})}catch{n=new IntersectionObserver(b,v)}n.observe(e)}return o(!0),a}function pa(e,t,n,r){r===void 0&&(r={});let{ancestorScroll:i=!0,ancestorResize:a=!0,elementResize:o=typeof ResizeObserver==`function`,layoutShift:s=typeof IntersectionObserver==`function`,animationFrame:c=!1}=r,l=zi(e),u=i||a?[...l?Ii(l):[],...t?Ii(t):[]]:[];u.forEach(e=>{i&&e.addEventListener(`scroll`,n,{passive:!0}),a&&e.addEventListener(`resize`,n)});let d=l&&s?fa(l,n):null,f=-1,p=null;o&&(p=new ResizeObserver(e=>{let[r]=e;r&&r.target===l&&p&&t&&(p.unobserve(t),cancelAnimationFrame(f),f=requestAnimationFrame(()=>{var e;(e=p)==null||e.observe(t)})),n()}),l&&!c&&p.observe(l),t&&p.observe(t));let m,h=c?Wi(e):null;c&&g();function g(){let t=Wi(e);h&&!da(h,t)&&n(),h=t,m=requestAnimationFrame(g)}return n(),()=>{var e;u.forEach(e=>{i&&e.removeEventListener(`scroll`,n),a&&e.removeEventListener(`resize`,n)}),d?.(),(e=p)==null||e.disconnect(),p=null,c&&cancelAnimationFrame(m)}}var ma=ui,ha=di,ga=ii,_a=fi,va=si,ya=ri,ba=(e,t,n)=>{let r=new Map,i={platform:ua,...n},a={...i.platform,_c:r};return ni(e,t,{...i,platform:a})},xa=O();function Sa(){let e=I(xa);if(e===void 0)throw Error("[kobalte]: `usePopperContext` must be used within a `Popper` component");return e}var Ca=b(`<svg display="block" viewBox="0 0 30 30" style="transform:scale(1.02)"><g><path fill="none" d="M23,27.8c1.1,1.2,3.4,2.2,5,2.2h2H0h2c1.7,0,3.9-1,5-2.2l6.6-7.2c0.7-0.8,2-0.8,2.7,0L23,27.8L23,27.8z"></path><path stroke="none" d="M23,27.8c1.1,1.2,3.4,2.2,5,2.2h2H0h2c1.7,0,3.9-1,5-2.2l6.6-7.2c0.7-0.8,2-0.8,2.7,0L23,27.8L23,27.8z">`),wa=30,Ta=wa/2,Ea={top:180,right:-90,bottom:0,left:90};function Da(e){let t=Sa(),r=Y({size:wa},e),[i,a]=n(r,[`ref`,`style`,`size`]),o=()=>t.currentPlacement().split(`-`)[0],s=Oa(t.contentRef),c=()=>s()?.getPropertyValue(`background-color`)||`none`,l=()=>s()?.getPropertyValue(`border-${o()}-color`)||`none`,u=()=>s()?.getPropertyValue(`border-${o()}-width`)||`0px`,f=()=>Number.parseInt(u())*2*(wa/i.size),p=()=>`rotate(${Ea[o()]} ${Ta} ${Ta}) translate(0 2)`;return z(X,A({as:`div`,ref(e){let n=dt(t.setArrowRef,i.ref);typeof n==`function`&&n(e)},"aria-hidden":`true`,get style(){return At({position:`absolute`,"font-size":`${i.size}px`,width:`1em`,height:`1em`,"pointer-events":`none`,fill:c(),stroke:l(),"stroke-width":f()},i.style)}},a,{get children(){let e=Ca(),t=e.firstChild;return k(()=>d(t,`transform`,p())),e}}))}function Oa(e){let[t,n]=w();return F(()=>{let t=e();t&&n(zt(t).getComputedStyle(t))}),t}function ka(e){let t=Sa(),[r,i]=n(e,[`ref`,`style`]);return z(X,A({as:`div`,ref(e){let n=dt(t.setPositionerRef,r.ref);typeof n==`function`&&n(e)},"data-popper-positioner":``,get style(){return At({position:`absolute`,top:0,left:0,"min-width":`max-content`},r.style)}},i))}function Aa(e){let{x:t=0,y:n=0,width:r=0,height:i=0}=e??{};if(typeof DOMRect==`function`)return new DOMRect(t,n,r,i);let a={x:t,y:n,width:r,height:i,top:n,right:t+r,bottom:n+i,left:t};return{...a,toJSON:()=>a}}function ja(e,t){return{contextElement:e,getBoundingClientRect:()=>{let n=t(e);return n?Aa(n):e?e.getBoundingClientRect():Aa()}}}function Ma(e){return/^(?:top|bottom|left|right)(?:-(?:start|end))?$/.test(e)}var Na={top:`bottom`,right:`left`,bottom:`top`,left:`right`};function Pa(e,t){let[n,r]=e.split(`-`),i=Na[n];return r?n===`left`||n===`right`?`${i} ${r===`start`?`top`:`bottom`}`:r===`start`?`${i} ${t===`rtl`?`right`:`left`}`:`${i} ${t===`rtl`?`left`:`right`}`:`${i} center`}function Fa(e){let t=Y({getAnchorRect:e=>e?.getBoundingClientRect(),placement:`bottom`,gutter:0,shift:0,flip:!0,slide:!0,overlap:!1,sameWidth:!1,fitViewport:!1,hideWhenDetached:!1,detachedPadding:0,arrowPadding:4,overflowPadding:8},e),[n,r]=w(),[i,a]=w(),[o,s]=w(t.placement),c=()=>ja(t.anchorRef?.(),t.getAnchorRect),{direction:l}=Yn();async function u(){let e=c(),r=n(),a=i();if(!e||!r)return;let o=(a?.clientHeight||0)/2,u=typeof t.gutter==`number`?t.gutter+o:t.gutter??o;r.style.setProperty(`--kb-popper-content-overflow-padding`,`${t.overflowPadding}px`),e.getBoundingClientRect();let d=[ma(({placement:e})=>{let n=!!e.split(`-`)[1];return{mainAxis:u,crossAxis:n?void 0:t.shift,alignmentAxis:t.shift}})];if(t.flip!==!1){let e=typeof t.flip==`string`?t.flip.split(` `):void 0;if(e!==void 0&&!e.every(Ma))throw Error("`flip` expects a spaced-delimited list of placements");d.push(ga({padding:t.overflowPadding,fallbackPlacements:e}))}(t.slide||t.overlap)&&d.push(ha({mainAxis:t.slide,crossAxis:t.overlap,padding:t.overflowPadding})),d.push(_a({padding:t.overflowPadding,apply({availableWidth:e,availableHeight:n,rects:i}){let a=Math.round(i.reference.width);e=Math.floor(e),n=Math.floor(n),r.style.setProperty(`--kb-popper-anchor-width`,`${a}px`),r.style.setProperty(`--kb-popper-content-available-width`,`${e}px`),r.style.setProperty(`--kb-popper-content-available-height`,`${n}px`),t.sameWidth&&(r.style.width=`${a}px`),t.fitViewport&&(r.style.maxWidth=`${e}px`,r.style.maxHeight=`${n}px`)}})),t.hideWhenDetached&&d.push(va({padding:t.detachedPadding})),a&&d.push(ya({element:a,padding:t.arrowPadding}));let f=await ba(e,r,{placement:t.placement,strategy:`absolute`,middleware:d,platform:{...ua,isRTL:()=>l()===`rtl`}});if(s(f.placement),t.onCurrentPlacementChange?.(f.placement),!r)return;r.style.setProperty(`--kb-popper-content-transform-origin`,Pa(f.placement,l()));let p=Math.round(f.x),m=Math.round(f.y),h;if(t.hideWhenDetached&&(h=f.middlewareData.hide?.referenceHidden?`hidden`:`visible`),Object.assign(r.style,{top:`0`,left:`0`,transform:`translate3d(${p}px, ${m}px, 0)`,visibility:h}),a&&f.middlewareData.arrow){let{x:e,y:t}=f.middlewareData.arrow,n=f.placement.split(`-`)[0];Object.assign(a.style,{left:e==null?``:`${e}px`,top:t==null?``:`${t}px`,[n]:`100%`})}}F(()=>{let e=c(),t=n();if(!e||!t)return;let r=pa(e,t,u,{elementResize:typeof ResizeObserver==`function`});h(r)}),F(()=>{let e=n(),r=t.contentRef?.();e&&r&&queueMicrotask(()=>{e.style.zIndex=getComputedStyle(r).zIndex})});let d={currentPlacement:o,contentRef:()=>t.contentRef?.(),setPositionerRef:r,setArrowRef:a};return z(xa.Provider,{value:d,get children(){return t.children}})}var Ia=Object.assign(Fa,{Arrow:Da,Context:xa,usePopperContext:Sa,Positioner:ka}),La=`data-kb-top-layer`,Ra,za=!1,Ba=[];function Va(e){return Ba.findIndex(t=>t.node===e)}function Ha(e){return Ba[Va(e)]}function Ua(e){return Ba[Ba.length-1].node===e}function Wa(){return Ba.filter(e=>e.isPointerBlocking)}function Ga(){return[...Wa()].slice(-1)[0]}function Ka(){return Wa().length>0}function qa(e){let t=Va(Ga()?.node);return Va(e)<t}function Ja(e){Ba.push(e)}function Ya(e){let t=Va(e);t<0||Ba.splice(t,1)}function Xa(){for(let{node:e}of Ba)e.style.pointerEvents=qa(e)?`none`:`auto`}function Za(e){if(Ka()&&!za){let t=Bt(e);Ra=document.body.style.pointerEvents,t.body.style.pointerEvents=`none`,za=!0}}function Qa(e){if(Ka())return;let t=Bt(e);t.body.style.pointerEvents=Ra,t.body.style.length===0&&t.body.removeAttribute(`style`),za=!1}var $a={layers:Ba,isTopMostLayer:Ua,hasPointerBlockingLayer:Ka,isBelowPointerBlockingLayer:qa,addLayer:Ja,removeLayer:Ya,indexOf:Va,find:Ha,assignPointerEventToLayers:Xa,disableBodyPointerEvents:Za,restoreBodyPointerEvents:Qa},eo=`interactOutside.pointerDownOutside`,to=`interactOutside.focusOutside`;function no(e,t){let n,r=gn,i=()=>Bt(t()),a=t=>e.onPointerDownOutside?.(t),o=t=>e.onFocusOutside?.(t),s=t=>e.onInteractOutside?.(t),c=n=>{let r=n.target;return!(r instanceof Element)||r.closest(`[${La}]`)||!Lt(i(),r)||Lt(t(),r)?!1:!e.shouldExcludeElement?.(r)},l=e=>{function n(){let n=t(),r=e.target;if(!n||!r||!c(e))return;let i=J([a,s]);r.addEventListener(eo,i,{once:!0});let o=new CustomEvent(eo,{bubbles:!1,cancelable:!0,detail:{originalEvent:e,isContextMenu:e.button===2||Yt(e)&&e.button===0}});r.dispatchEvent(o)}e.pointerType===`touch`?(i().removeEventListener(`click`,n),r=n,i().addEventListener(`click`,n,{once:!0})):n()},u=e=>{let n=t(),r=e.target;if(!n||!r||!c(e))return;let i=J([o,s]);r.addEventListener(to,i,{once:!0});let a=new CustomEvent(to,{bubbles:!1,cancelable:!0,detail:{originalEvent:e,isContextMenu:!1}});r.dispatchEvent(a)};F(()=>{V(e.isDisabled)||(n=window.setTimeout(()=>{i().addEventListener(`pointerdown`,l,!0)},0),i().addEventListener(`focusin`,u,!0),h(()=>{window.clearTimeout(n),i().removeEventListener(`click`,r),i().removeEventListener(`pointerdown`,l,!0),i().removeEventListener(`focusin`,u,!0)}))})}function ro(e){let t=t=>{t.key===Ht.Escape&&e.onEscapeKeyDown?.(t)};F(()=>{if(V(e.isDisabled))return;let n=e.ownerDocument?.()??Bt();n.addEventListener(`keydown`,t),h(()=>{n.removeEventListener(`keydown`,t)})})}var io=O();function ao(){return I(io)}function oo(e){let t,r=ao(),[i,o]=n(e,[`ref`,`disableOutsidePointerEvents`,`excludedElements`,`onEscapeKeyDown`,`onPointerDownOutside`,`onFocusOutside`,`onInteractOutside`,`onDismiss`,`bypassTopMostLayerCheck`]),s=new Set([]),c=e=>{s.add(e);let t=r?.registerNestedLayer(e);return()=>{s.delete(e),t?.()}};no({shouldExcludeElement:e=>t?i.excludedElements?.some(t=>Lt(t(),e))||[...s].some(t=>Lt(t,e)):!1,onPointerDownOutside:e=>{t&&!$a.isBelowPointerBlockingLayer(t)&&(i.bypassTopMostLayerCheck||$a.isTopMostLayer(t))&&(i.onPointerDownOutside?.(e),i.onInteractOutside?.(e),e.defaultPrevented||i.onDismiss?.())},onFocusOutside:e=>{i.onFocusOutside?.(e),i.onInteractOutside?.(e),e.defaultPrevented||i.onDismiss?.()}},()=>t),ro({ownerDocument:()=>Bt(t),onEscapeKeyDown:e=>{t&&$a.isTopMostLayer(t)&&(i.onEscapeKeyDown?.(e),!e.defaultPrevented&&i.onDismiss&&(e.preventDefault(),i.onDismiss()))}}),a(()=>{if(!t)return;$a.addLayer({node:t,isPointerBlocking:i.disableOutsidePointerEvents,dismiss:i.onDismiss});let e=r?.registerNestedLayer(t);$a.assignPointerEventToLayers(),$a.disableBodyPointerEvents(t),h(()=>{t&&($a.removeLayer(t),e?.(),$a.assignPointerEventToLayers(),$a.restoreBodyPointerEvents(t))})}),F(p([()=>t,()=>i.disableOutsidePointerEvents],([e,t])=>{if(!e)return;let n=$a.find(e);n&&n.isPointerBlocking!==t&&(n.isPointerBlocking=t,$a.assignPointerEventToLayers()),t&&$a.disableBodyPointerEvents(e),h(()=>{$a.restoreBodyPointerEvents(e)})},{defer:!0}));let l={registerNestedLayer:c};return z(io.Provider,{value:l,get children(){return z(X,A({as:`div`,ref(e){let n=dt(e=>t=e,i.ref);typeof n==`function`&&n(e)}},o))}})}function so(e={}){let[t,n]=Pn({value:()=>V(e.open),defaultValue:()=>!!V(e.defaultOpen),onChange:t=>e.onOpenChange?.(t)}),r=()=>{n(!0)},i=()=>{n(!1)};return{isOpen:t,setIsOpen:n,open:r,close:i,toggle:()=>{t()?i():r()}}}function co(e){return t=>(e(t),()=>e(void 0))}var lo=e=>typeof e==`function`?e():e,uo=e=>{let t=N(()=>{let t=lo(e.element);if(t)return getComputedStyle(t)}),n=()=>t()?.animationName??`none`,[r,i]=w(lo(e.show)?`present`:`hidden`),a=`none`;return F(r=>{let o=lo(e.show);return S(()=>{if(r===o)return o;let e=a,s=n();o?i(`present`):s===`none`||t()?.display===`none`?i(`hidden`):i(r===!0&&e!==s?`hiding`:`hidden`)}),o}),F(()=>{let t=lo(e.element);if(!t)return;let o=e=>{e.target===t&&(a=n())},s=e=>{let a=n().includes(e.animationName);e.target===t&&a&&r()===`hiding`&&i(`hidden`)};t.addEventListener(`animationstart`,o),t.addEventListener(`animationcancel`,s),t.addEventListener(`animationend`,s),h(()=>{t.removeEventListener(`animationstart`,o),t.removeEventListener(`animationcancel`,s),t.removeEventListener(`animationend`,s)})}),{present:()=>r()===`present`||r()===`hiding`,state:r,setState:i}},fo=[`id`,`name`,`validationState`,`required`,`disabled`,`readOnly`];function po(e){let t=Y({id:`form-control-${B()}`},e),[n,r]=w(),[i,a]=w(),[o,s]=w(),[c,l]=w();return{formControlContext:{name:()=>V(t.name)??V(t.id),dataset:N(()=>({"data-valid":V(t.validationState)===`valid`?``:void 0,"data-invalid":V(t.validationState)===`invalid`?``:void 0,"data-required":V(t.required)?``:void 0,"data-disabled":V(t.disabled)?``:void 0,"data-readonly":V(t.readOnly)?``:void 0})),validationState:()=>V(t.validationState),isRequired:()=>V(t.required),isDisabled:()=>V(t.disabled),isReadOnly:()=>V(t.readOnly),labelId:n,fieldId:i,descriptionId:o,errorMessageId:c,getAriaLabelledBy:(e,t,r)=>{let i=r!=null||n()!=null;return[r,n(),i&&t!=null?e:void 0].filter(Boolean).join(` `)||void 0},getAriaDescribedBy:e=>[o(),c(),e].filter(Boolean).join(` `)||void 0,generateId:It(()=>V(t.id)),registerLabel:co(r),registerField:co(a),registerDescription:co(s),registerErrorMessage:co(l)}}}var mo=O();function ho(){let e=I(mo);if(e===void 0)throw Error("[kobalte]: `useFormControlContext` must be used within a `FormControlContext.Provider` component");return e}function go(e){let t=ho(),n=Y({id:t.generateId(`description`)},e);return F(()=>h(t.registerDescription(n.id))),z(X,A({as:`div`},()=>t.dataset(),n))}function _o(e){let r,i=ho(),a=Y({id:i.generateId(`label`)},e),[o,s]=n(a,[`ref`]),c=Tn(()=>r,()=>`label`);return F(()=>h(i.registerLabel(s.id))),z(X,A({as:`label`,ref(e){let t=dt(e=>r=e,o.ref);typeof t==`function`&&t(e)},get for(){return t(()=>c()===`label`)()?i.fieldId():void 0}},()=>i.dataset(),s))}function vo(e,t){F(p(e,e=>{if(e==null)return;let n=yo(e);n!=null&&(n.addEventListener(`reset`,t,{passive:!0}),h(()=>{n.removeEventListener(`reset`,t)}))}))}function yo(e){return bo(e)?e.form:e.closest(`form`)}function bo(e){return e.matches(`textarea, input, select, button`)}function xo(e){let t=ho(),r=Y({id:t.generateId(`error-message`)},e),[i,a]=n(r,[`forceMount`]),o=()=>t.validationState()===`invalid`;return F(()=>{o()&&h(t.registerErrorMessage(a.id))}),z(L,{get when(){return i.forceMount||o()},get children(){return z(X,A({as:`div`},()=>t.dataset(),a))}})}var So=`focusScope.autoFocusOnMount`,Co=`focusScope.autoFocusOnUnmount`,wo={bubbles:!1,cancelable:!0},To={stack:[],active(){return this.stack[0]},add(e){e!==this.active()&&this.active()?.pause(),this.stack=Mt(this.stack,e),this.stack.unshift(e)},remove(e){this.stack=Mt(this.stack,e),this.active()?.resume()}};function Eo(e,t){let[n,r]=w(!1),i={pause(){r(!0)},resume(){r(!1)}},a=null,o=t=>e.onMountAutoFocus?.(t),s=t=>e.onUnmountAutoFocus?.(t),c=()=>Bt(t()),l=()=>{let e=c().createElement(`span`);return e.setAttribute(`data-focus-trap`,``),e.tabIndex=0,Object.assign(e.style,wn),e},u=()=>{let e=t();return e?on(e,!0).filter(e=>!e.hasAttribute(`data-focus-trap`)):[]},d=()=>{let e=u();return e.length>0?e[0]:null},f=()=>{let e=u();return e.length>0?e[e.length-1]:null},p=()=>{let e=t();if(!e)return!1;let n=Rt(e);return!n||Lt(e,n)?!1:cn(n)};F(()=>{let e=t();if(!e)return;To.add(i);let n=Rt(e);if(!Lt(e,n)){let t=new CustomEvent(So,wo);e.addEventListener(So,o),e.dispatchEvent(t),t.defaultPrevented||setTimeout(()=>{Xt(d()),Rt(e)===n&&Xt(e)},0)}h(()=>{e.removeEventListener(So,o),setTimeout(()=>{let t=new CustomEvent(Co,wo);p()&&t.preventDefault(),e.addEventListener(Co,s),e.dispatchEvent(t),t.defaultPrevented||Xt(n??c().body),e.removeEventListener(Co,s),To.remove(i)},0)})}),F(()=>{let r=t();if(!r||!V(e.trapFocus)||n())return;let i=e=>{let t=e.target;t?.closest(`[${La}]`)||(Lt(r,t)?a=t:Xt(a))},o=e=>{let t=e.relatedTarget??Rt(r);t?.closest(`[${La}]`)||Lt(r,t)||Xt(a)};c().addEventListener(`focusin`,i),c().addEventListener(`focusout`,o),h(()=>{c().removeEventListener(`focusin`,i),c().removeEventListener(`focusout`,o)})}),F(()=>{let r=t();if(!r||!V(e.trapFocus)||n())return;let i=l();r.insertAdjacentElement(`afterbegin`,i);let a=l();r.insertAdjacentElement(`beforeend`,a);function o(e){let t=d(),n=f();e.relatedTarget===t?Xt(n):Xt(t)}i.addEventListener(`focusin`,o),a.addEventListener(`focusin`,o);let s=new MutationObserver(e=>{for(let t of e)t.previousSibling===a&&(a.remove(),r.insertAdjacentElement(`beforeend`,a)),t.nextSibling===i&&(i.remove(),r.insertAdjacentElement(`afterbegin`,i))});s.observe(r,{childList:!0,subtree:!1}),h(()=>{i.removeEventListener(`focusin`,o),a.removeEventListener(`focusin`,o),i.remove(),a.remove(),s.disconnect()})})}var Do=`data-live-announcer`;function Oo(e){F(()=>{V(e.isDisabled)||h(jo(V(e.targets),V(e.root)))})}var ko=new WeakMap,Ao=[];function jo(e,t=document.body){let n=new Set(e),r=new Set,i=e=>{for(let t of e.querySelectorAll(`[${Do}], [${La}]`))n.add(t);let t=e=>{if(n.has(e)||e.parentElement&&r.has(e.parentElement)&&e.parentElement.getAttribute(`role`)!==`row`)return NodeFilter.FILTER_REJECT;for(let t of n)if(e.contains(t))return NodeFilter.FILTER_SKIP;return NodeFilter.FILTER_ACCEPT},i=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode:t}),o=t(e);if(o===NodeFilter.FILTER_ACCEPT&&a(e),o!==NodeFilter.FILTER_REJECT){let e=i.nextNode();for(;e!=null;)a(e),e=i.nextNode()}},a=e=>{let t=ko.get(e)??0;(e.getAttribute(`aria-hidden`)!==`true`||t!==0)&&(t===0&&e.setAttribute(`aria-hidden`,`true`),r.add(e),ko.set(e,t+1))};Ao.length&&Ao[Ao.length-1].disconnect(),i(t);let o=new MutationObserver(e=>{for(let t of e)if(t.type===`childList`&&t.addedNodes.length!==0&&![...n,...r].some(e=>e.contains(t.target))){for(let e of t.removedNodes)e instanceof Element&&(n.delete(e),r.delete(e));for(let e of t.addedNodes)(e instanceof HTMLElement||e instanceof SVGElement)&&(e.dataset.liveAnnouncer===`true`||e.dataset.reactAriaTopLayer===`true`)?n.add(e):e instanceof Element&&i(e)}});o.observe(t,{childList:!0,subtree:!0});let s={observe(){o.observe(t,{childList:!0,subtree:!0})},disconnect(){o.disconnect()}};return Ao.push(s),()=>{o.disconnect();for(let e of r){let t=ko.get(e);if(t==null)return;t===1?(e.removeAttribute(`aria-hidden`),ko.delete(e)):ko.set(e,t-1)}s===Ao[Ao.length-1]?(Ao.pop(),Ao.length&&Ao[Ao.length-1].observe()):Ao.splice(Ao.indexOf(s),1)}}var Mo=(e,t)=>{if(e.contains(t))return!0;let n=t;for(;n;){if(n===e)return!0;n=n._$host??n.parentElement}return!1},No=new Map,Po=e=>{F(()=>{let t=lo(e.style)??{},n=lo(e.properties)??[],r={};for(let n in t)r[n]=e.element.style[n];let i=No.get(e.key);i?i.activeCount++:No.set(e.key,{activeCount:1,originalStyles:r,properties:n.map(e=>e.key)}),Object.assign(e.element.style,e.style);for(let t of n)e.element.style.setProperty(t.key,t.value);h(()=>{let t=No.get(e.key);if(t){if(t.activeCount!==1)t.activeCount--;else{No.delete(e.key);for(let[n,r]of Object.entries(t.originalStyles))e.element.style[n]=r;for(let n of t.properties)e.element.style.removeProperty(n);e.element.style.length===0&&e.element.removeAttribute(`style`),e.cleanup?.()}}})})},Fo=(e,t)=>{switch(t){case`x`:return[e.clientWidth,e.scrollLeft,e.scrollWidth];case`y`:return[e.clientHeight,e.scrollTop,e.scrollHeight]}},Io=(e,t)=>{let n=getComputedStyle(e),r=t===`x`?n.overflowX:n.overflowY;return r===`auto`||r===`scroll`||e.tagName===`HTML`&&r===`visible`},Lo=(e,t,n)=>{let r=t===`x`&&window.getComputedStyle(e).direction===`rtl`?-1:1,i=e,a=0,o=0,s=!1;do{let[e,c,l]=Fo(i,t),u=l-e-r*c;(c!==0||u!==0)&&Io(i,t)&&(a+=u,o+=c),i===(n??document.documentElement)?s=!0:i=i._$host??i.parentElement}while(i&&!s);return[a,o]},[Ro,zo]=w([]),Bo=e=>Ro().indexOf(e)===Ro().length-1,Vo=e=>{let t=A({element:null,enabled:!0,hideScrollbar:!0,preventScrollbarShift:!0,preventScrollbarShiftMode:`padding`,restoreScrollPosition:!0,allowPinchZoom:!1},e),n=B(),r=[0,0],i=null,a=null;F(()=>{lo(t.enabled)&&(zo(e=>[...e,n]),h(()=>{zo(e=>e.filter(e=>e!==n))}))}),F(()=>{if(!lo(t.enabled)||!lo(t.hideScrollbar))return;let{body:e}=document,n=window.innerWidth-e.offsetWidth;if(lo(t.preventScrollbarShift)){let r={overflow:`hidden`},i=[];n>0&&(lo(t.preventScrollbarShiftMode)===`padding`?r.paddingRight=`calc(${window.getComputedStyle(e).paddingRight} + ${n}px)`:r.marginRight=`calc(${window.getComputedStyle(e).marginRight} + ${n}px)`,i.push({key:`--scrollbar-width`,value:`${n}px`}));let a=window.scrollY,o=window.scrollX;Po({key:`prevent-scroll`,element:e,style:r,properties:i,cleanup:()=>{lo(t.restoreScrollPosition)&&n>0&&window.scrollTo(o,a)}})}else Po({key:`prevent-scroll`,element:e,style:{overflow:`hidden`}})}),F(()=>{Bo(n)&&lo(t.enabled)&&(document.addEventListener(`wheel`,s,{passive:!1}),document.addEventListener(`touchstart`,o,{passive:!1}),document.addEventListener(`touchmove`,c,{passive:!1}),h(()=>{document.removeEventListener(`wheel`,s),document.removeEventListener(`touchstart`,o),document.removeEventListener(`touchmove`,c)}))});let o=e=>{r=Uo(e),i=null,a=null},s=e=>{let n=e.target,r=lo(t.element),i=Ho(e),a=Math.abs(i[0])>Math.abs(i[1])?`x`:`y`,o=Wo(n,a,a===`x`?i[0]:i[1],r),s;s=r&&Mo(r,n)?!o:!0,s&&e.cancelable&&e.preventDefault()},c=e=>{let n=lo(t.element),o=e.target,s;if(e.touches.length===2)s=!lo(t.allowPinchZoom);else{if(i==null||a===null){let t=Uo(e).map((e,t)=>r[t]-e),n=Math.abs(t[0])>Math.abs(t[1])?`x`:`y`;i=n,a=n===`x`?t[0]:t[1]}if(o.type===`range`)s=!1;else{let e=Wo(o,i,a,n);s=n&&Mo(n,o)?!e:!0}}s&&e.cancelable&&e.preventDefault()}},Ho=e=>[e.deltaX,e.deltaY],Uo=e=>e.changedTouches[0]?[e.changedTouches[0].clientX,e.changedTouches[0].clientY]:[0,0],Wo=(e,t,n,r)=>{let[i,a]=Lo(e,t,r!==null&&Mo(r,e)?r:void 0);return!(n>0&&Math.abs(i)<=1||n<0&&Math.abs(a)<1)},Go=Vo,Ko={};On(Ko,{Description:()=>go,ErrorMessage:()=>xo,Item:()=>Zo,ItemControl:()=>Qo,ItemDescription:()=>$o,ItemIndicator:()=>es,ItemInput:()=>ts,ItemLabel:()=>ns,Label:()=>rs,RadioGroup:()=>as,Root:()=>is,useRadioGroupContext:()=>Jo});var qo=O();function Jo(){let e=I(qo);if(e===void 0)throw Error("[kobalte]: `useRadioGroupContext` must be used within a `RadioGroup` component");return e}var Yo=O();function Xo(){let e=I(Yo);if(e===void 0)throw Error("[kobalte]: `useRadioGroupItemContext` must be used within a `RadioGroup.Item` component");return e}function Zo(e){let t=ho(),r=Jo(),i=Y({id:`${t.generateId(`item`)}-${B()}`},e),[a,o]=n(i,[`value`,`disabled`,`onPointerDown`]),[s,c]=w(),[l,u]=w(),[d,f]=w(),[p,m]=w(),[h,g]=w(!1),_=N(()=>r.isDefaultValue(a.value)),v=N(()=>r.isSelectedValue(a.value)),y=N(()=>a.disabled||t.isDisabled()||!1),b=e=>{q(e,a.onPointerDown),h()&&e.preventDefault()},x=N(()=>({...t.dataset(),"data-disabled":y()?``:void 0,"data-checked":v()?``:void 0})),S={value:()=>a.value,dataset:x,isDefault:_,isSelected:v,isDisabled:y,inputId:s,labelId:l,descriptionId:d,inputRef:p,select:()=>r.setSelectedValue(a.value),generateId:It(()=>o.id),registerInput:co(c),registerLabel:co(u),registerDescription:co(f),setIsFocused:g,setInputRef:m};return z(Yo.Provider,{value:S,get children(){return z(X,A({as:`div`,role:`group`,onPointerDown:b},x,o))}})}function Qo(e){let t=Xo(),r=Y({id:t.generateId(`control`)},e),[i,a]=n(r,[`onClick`,`onKeyDown`]);return z(X,A({as:`div`,onClick:e=>{q(e,i.onClick),t.select(),t.inputRef()?.focus()},onKeyDown:e=>{q(e,i.onKeyDown),e.key===Ht.Space&&(t.select(),t.inputRef()?.focus())}},()=>t.dataset(),a))}function $o(e){let t=Xo(),n=Y({id:t.generateId(`description`)},e);return F(()=>h(t.registerDescription(n.id))),z(X,A({as:`div`},()=>t.dataset(),n))}function es(e){let t=Xo(),r=Y({id:t.generateId(`indicator`)},e),[i,a]=n(r,[`ref`,`forceMount`]),[o,s]=w(),{present:c}=uo({show:()=>i.forceMount||t.isSelected(),element:()=>o()??null});return z(L,{get when(){return c()},get children(){return z(X,A({as:`div`,ref(e){let t=dt(s,i.ref);typeof t==`function`&&t(e)}},()=>t.dataset(),a))}})}function ts(e){let t=ho(),r=Jo(),i=Xo(),a=Y({id:i.generateId(`input`)},e),[o,s]=n(a,[`ref`,`style`,`aria-labelledby`,`aria-describedby`,`onChange`,`onFocus`,`onBlur`]),c=()=>[o[`aria-labelledby`],i.labelId(),o[`aria-labelledby`]!=null&&s[`aria-label`]!=null?s.id:void 0].filter(Boolean).join(` `)||void 0,l=()=>[o[`aria-describedby`],i.descriptionId(),r.ariaDescribedBy()].filter(Boolean).join(` `)||void 0,[u,d]=w(!1);return F(p([()=>i.isSelected(),()=>i.value()],e=>{if(!e[0]&&e[1]===i.value())return;d(!0);let t=i.inputRef();t?.dispatchEvent(new Event(`input`,{bubbles:!0,cancelable:!0})),t?.dispatchEvent(new Event(`change`,{bubbles:!0,cancelable:!0}))},{defer:!0})),F(()=>h(i.registerInput(s.id))),z(X,A({as:`input`,ref(e){let t=dt(i.setInputRef,o.ref);typeof t==`function`&&t(e)},type:`radio`,get name(){return t.name()},get value(){return i.value()},get checked(){return i.isSelected()},get required(){return t.isRequired()},get disabled(){return i.isDisabled()},get readonly(){return t.isReadOnly()},get style(){return At({...wn},o.style)},get"aria-labelledby"(){return c()},get"aria-describedby"(){return l()},onChange:e=>{if(q(e,o.onChange),e.stopPropagation(),!u()){r.setSelectedValue(i.value());let t=e.target;t.checked=i.isSelected()}d(!1)},onFocus:e=>{q(e,o.onFocus),i.setIsFocused(!0)},onBlur:e=>{q(e,o.onBlur),i.setIsFocused(!1)}},()=>i.dataset(),s))}function ns(e){let t=Xo(),n=Y({id:t.generateId(`label`)},e);return F(()=>h(t.registerLabel(n.id))),z(X,A({as:`label`,get for(){return t.inputId()}},()=>t.dataset(),n))}function rs(e){return z(_o,A({as:`span`},e))}function is(e){let t,r=Y({id:`radiogroup-${B()}`,orientation:`vertical`},e),[i,a,o]=n(r,[`ref`,`value`,`defaultValue`,`onChange`,`orientation`,`aria-labelledby`,`aria-describedby`],fo),[s,c]=Nn({value:()=>i.value,defaultValue:()=>i.defaultValue,onChange:e=>i.onChange?.(e)}),{formControlContext:l}=po(a);vo(()=>t,()=>c(i.defaultValue??``));let u=()=>l.getAriaLabelledBy(V(a.id),o[`aria-label`],i[`aria-labelledby`]),d=()=>l.getAriaDescribedBy(i[`aria-describedby`]),f=t=>t===e.defaultValue,p=e=>e===s(),m={ariaDescribedBy:d,isDefaultValue:f,isSelectedValue:p,setSelectedValue:e=>{if(!(l.isReadOnly()||l.isDisabled())&&(c(e),t))for(let e of t.querySelectorAll(`[type='radio']`)){let t=e;t.checked=p(t.value)}}};return z(mo.Provider,{value:l,get children(){return z(qo.Provider,{value:m,get children(){return z(X,A({as:`div`,ref(e){let n=dt(e=>t=e,i.ref);typeof n==`function`&&n(e)},role:`radiogroup`,get id(){return V(a.id)},get"aria-invalid"(){return l.validationState()===`invalid`||void 0},get"aria-required"(){return l.isRequired()||void 0},get"aria-disabled"(){return l.isDisabled()||void 0},get"aria-readonly"(){return l.isReadOnly()||void 0},get"aria-orientation"(){return i.orientation},get"aria-labelledby"(){return u()},get"aria-describedby"(){return d()}},()=>l.dataset(),o))}})}})}var as=Object.assign(is,{Description:go,ErrorMessage:xo,Item:Zo,ItemControl:Qo,ItemDescription:$o,ItemIndicator:es,ItemInput:ts,ItemLabel:ns,Label:rs}),os=class{collection;ref;collator;constructor(e,t,n){this.collection=e,this.ref=t,this.collator=n}getKeyBelow(e){let t=this.collection().getKeyAfter(e);for(;t!=null;){let e=this.collection().getItem(t);if(e&&e.type===`item`&&!e.disabled)return t;t=this.collection().getKeyAfter(t)}}getKeyAbove(e){let t=this.collection().getKeyBefore(e);for(;t!=null;){let e=this.collection().getItem(t);if(e&&e.type===`item`&&!e.disabled)return t;t=this.collection().getKeyBefore(t)}}getFirstKey(){let e=this.collection().getFirstKey();for(;e!=null;){let t=this.collection().getItem(e);if(t&&t.type===`item`&&!t.disabled)return e;e=this.collection().getKeyAfter(e)}}getLastKey(){let e=this.collection().getLastKey();for(;e!=null;){let t=this.collection().getItem(e);if(t&&t.type===`item`&&!t.disabled)return e;e=this.collection().getKeyBefore(e)}}getItem(e){return this.ref?.()?.querySelector(`[data-key="${e}"]`)??null}getKeyPageAbove(e){let t=this.ref?.(),n=this.getItem(e);if(!t||!n)return;let r=Math.max(0,n.offsetTop+n.offsetHeight-t.offsetHeight),i=e;for(;i&&n&&n.offsetTop>r;)i=this.getKeyAbove(i),n=i==null?null:this.getItem(i);return i}getKeyPageBelow(e){let t=this.ref?.(),n=this.getItem(e);if(!t||!n)return;let r=Math.min(t.scrollHeight,n.offsetTop-n.offsetHeight+t.offsetHeight),i=e;for(;i&&n&&n.offsetTop<r;)i=this.getKeyBelow(i),n=i==null?null:this.getItem(i);return i}getKeyForSearch(e,t){let n=this.collator?.();if(!n)return;let r=t==null?this.getFirstKey():this.getKeyBelow(t);for(;r!=null;){let t=this.collection().getItem(r);if(t){let i=t.textValue.slice(0,e.length);if(t.textValue&&n.compare(i,e)===0)return r}r=this.getKeyBelow(r)}}};function ss(e,t,n){let r=Zn({usage:`search`,sensitivity:`base`});return cr({selectionManager:()=>V(e.selectionManager),keyboardDelegate:N(()=>V(e.keyboardDelegate)||new os(e.collection,t,r)),autoFocus:()=>V(e.autoFocus),deferAutoFocus:()=>V(e.deferAutoFocus),shouldFocusWrap:()=>V(e.shouldFocusWrap),disallowEmptySelection:()=>V(e.disallowEmptySelection),selectOnFocus:()=>V(e.selectOnFocus),disallowTypeAhead:()=>V(e.disallowTypeAhead),shouldUseVirtualFocus:()=>V(e.shouldUseVirtualFocus),allowsTabNavigation:()=>V(e.allowsTabNavigation),isVirtualized:()=>V(e.isVirtualized),scrollToKey:t=>V(e.scrollToKey)?.(t),orientation:()=>V(e.orientation)},t)}var cs=O();function ls(){return I(cs)}var us=O();function ds(){return I(us)}var fs=O();function ps(){return I(fs)}function ms(){let e=ps();if(e===void 0)throw Error("[kobalte]: `useMenuContext` must be used within a `Menu` component");return e}var hs=O();function gs(){let e=I(hs);if(e===void 0)throw Error("[kobalte]: `useMenuItemContext` must be used within a `Menu.Item` component");return e}var _s=O();function vs(){let e=I(_s);if(e===void 0)throw Error("[kobalte]: `useMenuRootContext` must be used within a `MenuRoot` component");return e}function ys(e){let t,r=vs(),i=ms(),a=Y({id:r.generateId(`item-${B()}`)},e),[o,s]=n(a,[`ref`,`textValue`,`disabled`,`closeOnSelect`,`checked`,`indeterminate`,`onSelect`,`onPointerMove`,`onPointerLeave`,`onPointerDown`,`onPointerUp`,`onClick`,`onKeyDown`,`onMouseDown`,`onFocus`]),[c,l]=w(),[u,d]=w(),[f,p]=w(),m=()=>i.listState().selectionManager(),h=()=>s.id,g=()=>m().focusedKey()===h(),_=()=>{o.onSelect?.(),o.closeOnSelect&&setTimeout(()=>{i.close(!0)})};wr({getItem:()=>({ref:()=>t,type:`item`,key:h(),textValue:o.textValue??f()?.textContent??t?.textContent??``,disabled:o.disabled??!1})});let v=lr({key:h,selectionManager:m,shouldSelectOnPressUp:!0,allowsDifferentPressOrigin:!0,disabled:()=>o.disabled},()=>t),y=e=>{q(e,o.onPointerMove),e.pointerType===`mouse`&&(o.disabled?i.onItemLeave(e):(i.onItemEnter(e),e.defaultPrevented||(Xt(e.currentTarget),i.listState().selectionManager().setFocused(!0),i.listState().selectionManager().setFocusedKey(h()))))},b=e=>{q(e,o.onPointerLeave),e.pointerType===`mouse`&&i.onItemLeave(e)},x=e=>{q(e,o.onPointerUp),!o.disabled&&e.button===0&&_()},S=e=>{if(q(e,o.onKeyDown),!e.repeat&&!o.disabled)switch(e.key){case`Enter`:case` `:_()}},C=N(()=>{if(o.indeterminate)return`mixed`;if(o.checked!=null)return o.checked}),T=N(()=>({"data-indeterminate":o.indeterminate?``:void 0,"data-checked":o.checked&&!o.indeterminate?``:void 0,"data-disabled":o.disabled?``:void 0,"data-highlighted":g()?``:void 0})),ee={isChecked:()=>o.checked,dataset:T,setLabelRef:p,generateId:It(()=>s.id),registerLabel:co(l),registerDescription:co(d)};return z(hs.Provider,{value:ee,get children(){return z(X,A({as:`div`,ref(e){let n=dt(e=>t=e,o.ref);typeof n==`function`&&n(e)},get tabIndex(){return v.tabIndex()},get"aria-checked"(){return C()},get"aria-disabled"(){return o.disabled},get"aria-labelledby"(){return c()},get"aria-describedby"(){return u()},get"data-key"(){return v.dataKey()},get onPointerDown(){return J([o.onPointerDown,v.onPointerDown])},get onPointerUp(){return J([x,v.onPointerUp])},get onClick(){return J([o.onClick,v.onClick])},get onKeyDown(){return J([S,v.onKeyDown])},get onMouseDown(){return J([o.onMouseDown,v.onMouseDown])},get onFocus(){return J([o.onFocus,v.onFocus])},onPointerMove:y,onPointerLeave:b},T,s))}})}function bs(e){let t=Y({closeOnSelect:!1},e),[r,i]=n(t,[`checked`,`defaultChecked`,`onChange`,`onSelect`]),a=In({isSelected:()=>r.checked,defaultIsSelected:()=>r.defaultChecked,onSelectedChange:e=>r.onChange?.(e),isDisabled:()=>i.disabled});return z(ys,A({role:`menuitemcheckbox`,get checked(){return a.isSelected()},onSelect:()=>{r.onSelect?.(),a.toggle()}},i))}var xs={next:(e,t)=>e===`ltr`?t===`horizontal`?`ArrowRight`:`ArrowDown`:t===`horizontal`?`ArrowLeft`:`ArrowUp`,previous:(e,t)=>xs.next(e===`ltr`?`rtl`:`ltr`,t)},Ss={first:e=>e===`horizontal`?`ArrowDown`:`ArrowRight`,last:e=>e===`horizontal`?`ArrowUp`:`ArrowLeft`};function Cs(e){let r=vs(),i=ms(),a=ls(),{direction:o}=Yn(),s=Y({id:r.generateId(`trigger`)},e),[c,l]=n(s,[`ref`,`id`,`disabled`,`onPointerDown`,`onClick`,`onKeyDown`,`onMouseOver`,`onFocus`]),u=()=>r.value();a!==void 0&&(u=()=>r.value()??c.id,a.lastValue()===void 0&&a.setLastValue(u));let d=Tn(()=>i.triggerRef(),()=>`button`),f=N(()=>d()===`a`&&i.triggerRef()?.getAttribute(`href`)!=null);F(p(()=>a?.value(),e=>{f()&&e===u()&&i.triggerRef()?.focus()}));let m=()=>{a===void 0?i.toggle(!0):i.isOpen()?a.value()===u()&&a.closeMenu():(a.autoFocusMenu()||a.setAutoFocusMenu(!0),i.open(!1))};return F(()=>h(i.registerTriggerId(c.id))),z(jn,A({ref(e){let t=dt(i.setTriggerRef,c.ref);typeof t==`function`&&t(e)},get"data-kb-menu-value-trigger"(){return r.value()},get id(){return c.id},get disabled(){return c.disabled},"aria-haspopup":`true`,get"aria-expanded"(){return i.isOpen()},get"aria-controls"(){return t(()=>!!i.isOpen())()?i.contentId():void 0},get"data-highlighted"(){return u()!==void 0&&a?.value()===u()||void 0},get tabIndex(){return a===void 0?void 0:a.value()===u()||a.lastValue()===u()?0:-1},onPointerDown:e=>{q(e,c.onPointerDown),e.currentTarget.dataset.pointerType=e.pointerType,!c.disabled&&e.pointerType!==`touch`&&e.button===0&&m()},onMouseOver:e=>{q(e,c.onMouseOver),i.triggerRef()?.dataset.pointerType!==`touch`&&!c.disabled&&a!==void 0&&a.value()!==void 0&&a.setValue(u)},onClick:e=>{q(e,c.onClick),c.disabled||e.currentTarget.dataset.pointerType===`touch`&&m()},onKeyDown:e=>{if(q(e,c.onKeyDown),!c.disabled){if(f())switch(e.key){case`Enter`:case` `:return}switch(e.key){case`Enter`:case` `:case Ss.first(r.orientation()):e.stopPropagation(),e.preventDefault(),Cn(e.currentTarget),i.open(`first`),a?.setAutoFocusMenu(!0),a?.setValue(u);break;case Ss.last(r.orientation()):e.stopPropagation(),e.preventDefault(),i.open(`last`);break;case xs.next(o(),r.orientation()):if(a===void 0)break;e.stopPropagation(),e.preventDefault(),a.nextMenu();break;case xs.previous(o(),r.orientation()):if(a===void 0)break;e.stopPropagation(),e.preventDefault(),a.previousMenu()}}},onFocus:e=>{q(e,c.onFocus),a!==void 0&&e.currentTarget.dataset.pointerType!==`touch`&&a.setValue(u)},role:a===void 0?void 0:`menuitem`},()=>i.dataset(),l))}function ws(e){let r,i=vs(),a=ms(),o=ls(),s=ds(),{direction:c}=Yn(),l=Y({id:i.generateId(`content-${B()}`)},e),[u,d]=n(l,[`ref`,`id`,`style`,`onOpenAutoFocus`,`onCloseAutoFocus`,`onEscapeKeyDown`,`onFocusOutside`,`onPointerEnter`,`onPointerMove`,`onKeyDown`,`onMouseDown`,`onFocusIn`,`onFocusOut`]),f=0,p=()=>a.parentMenuContext()==null&&o===void 0&&i.isModal(),m=ss({selectionManager:a.listState().selectionManager,collection:a.listState().collection,autoFocus:a.autoFocus,deferAutoFocus:!0,shouldFocusWrap:!0,disallowTypeAhead:()=>!a.listState().selectionManager().isFocused(),orientation:()=>i.orientation()===`horizontal`?`vertical`:`horizontal`},()=>r);Eo({trapFocus:()=>p()&&a.isOpen(),onMountAutoFocus:e=>{o===void 0&&u.onOpenAutoFocus?.(e)},onUnmountAutoFocus:u.onCloseAutoFocus},()=>r);let g=e=>{if(Lt(e.currentTarget,e.target)&&(e.key===`Tab`&&a.isOpen()&&e.preventDefault(),o!==void 0&&e.currentTarget.getAttribute(`aria-haspopup`)!==`true`))switch(e.key){case xs.next(c(),i.orientation()):e.stopPropagation(),e.preventDefault(),a.close(!0),o.setAutoFocusMenu(!0),o.nextMenu();break;case xs.previous(c(),i.orientation()):if(e.currentTarget.hasAttribute(`data-closed`))break;e.stopPropagation(),e.preventDefault(),a.close(!0),o.setAutoFocusMenu(!0),o.previousMenu()}},_=e=>{u.onEscapeKeyDown?.(e),o?.setAutoFocusMenu(!1),a.close(!0)},v=e=>{u.onFocusOutside?.(e),i.isModal()&&e.preventDefault()},y=e=>{q(e,u.onPointerEnter),a.isOpen()&&(a.parentMenuContext()?.listState().selectionManager().setFocused(!1),a.parentMenuContext()?.listState().selectionManager().setFocusedKey(void 0))},b=e=>{if(q(e,u.onPointerMove),e.pointerType!==`mouse`)return;let t=e.target,n=f!==e.clientX;Lt(e.currentTarget,t)&&n&&(a.setPointerDir(e.clientX>f?`right`:`left`),f=e.clientX)};F(()=>h(a.registerContentId(u.id))),h(()=>a.setContentRef(void 0));let x={ref:dt(e=>{a.setContentRef(e),r=e},u.ref),role:`menu`,get id(){return u.id},get tabIndex(){return m.tabIndex()},get"aria-labelledby"(){return a.triggerId()},onKeyDown:J([u.onKeyDown,m.onKeyDown,g]),onMouseDown:J([u.onMouseDown,m.onMouseDown]),onFocusIn:J([u.onFocusIn,m.onFocusIn]),onFocusOut:J([u.onFocusOut,m.onFocusOut]),onPointerEnter:y,onPointerMove:b,get"data-orientation"(){return i.orientation()}};return z(L,{get when(){return a.contentPresent()},get children(){return z(L,{get when(){return s===void 0||a.parentMenuContext()!=null},get fallback(){return z(X,A({as:`div`},()=>a.dataset(),x,d))},get children(){return z(Ia.Positioner,{get children(){return z(oo,A({get disableOutsidePointerEvents(){return t(()=>!!p())()&&a.isOpen()},get excludedElements(){return[a.triggerRef]},bypassTopMostLayerCheck:!0,get style(){return At({"--kb-menu-content-transform-origin":`var(--kb-popper-content-transform-origin)`,position:`relative`},u.style)},onEscapeKeyDown:_,onFocusOutside:v,get onDismiss(){return a.close}},()=>a.dataset(),x,d))}})}})}})}function Ts(e){let t,r=vs(),i=ms(),[a,o]=n(e,[`ref`]);return Go({element:()=>t??null,enabled:()=>i.contentPresent()&&r.preventScroll()}),z(ws,A({ref(e){let n=dt(e=>{t=e},a.ref);typeof n==`function`&&n(e)}},o))}var Es=O();function Ds(){let e=I(Es);if(e===void 0)throw Error("[kobalte]: `useMenuGroupContext` must be used within a `Menu.Group` component");return e}function Os(e){let t=Y({id:vs().generateId(`group-${B()}`)},e),[n,r]=w(),i={generateId:It(()=>t.id),registerLabelId:co(r)};return z(Es.Provider,{value:i,get children(){return z(X,A({as:`div`,role:`group`,get"aria-labelledby"(){return n()}},t))}})}function ks(e){let t=Ds(),r=Y({id:t.generateId(`label`)},e),[i,a]=n(r,[`id`]);return F(()=>h(t.registerLabelId(i.id))),z(X,A({as:`span`,get id(){return i.id},"aria-hidden":`true`},a))}function As(e){let t=ms(),n=Y({children:`▼`},e);return z(X,A({as:`span`,"aria-hidden":`true`},()=>t.dataset(),n))}function js(e){return z(ys,A({role:`menuitem`,closeOnSelect:!0},e))}function Ms(e){let t=gs(),r=Y({id:t.generateId(`description`)},e),[i,a]=n(r,[`id`]);return F(()=>h(t.registerDescription(i.id))),z(X,A({as:`div`,get id(){return i.id}},()=>t.dataset(),a))}function Ns(e){let t=gs(),r=Y({id:t.generateId(`indicator`)},e),[i,a]=n(r,[`forceMount`]);return z(L,{get when(){return i.forceMount||t.isChecked()},get children(){return z(X,A({as:`div`},()=>t.dataset(),a))}})}function Ps(e){let t=gs(),r=Y({id:t.generateId(`label`)},e),[i,a]=n(r,[`ref`,`id`]);return F(()=>h(t.registerLabel(i.id))),z(X,A({as:`div`,ref(e){let n=dt(t.setLabelRef,i.ref);typeof n==`function`&&n(e)},get id(){return i.id}},()=>t.dataset(),a))}function Fs(e){let t=ms();return z(L,{get when(){return t.contentPresent()},get children(){return z(ie,e)}})}var Is=O();function Ls(){let e=I(Is);if(e===void 0)throw Error("[kobalte]: `useMenuRadioGroupContext` must be used within a `Menu.RadioGroup` component");return e}function Rs(e){let t=Y({id:vs().generateId(`radiogroup-${B()}`)},e),[r,i]=n(t,[`value`,`defaultValue`,`onChange`,`disabled`]),[a,o]=Nn({value:()=>r.value,defaultValue:()=>r.defaultValue,onChange:e=>r.onChange?.(e)});return z(Is.Provider,{value:{isDisabled:()=>r.disabled,isSelectedValue:e=>e===a(),setSelectedValue:e=>o(e)},get children(){return z(Os,i)}})}function zs(e){let t=Ls(),r=Y({closeOnSelect:!1},e),[i,a]=n(r,[`value`,`onSelect`]);return z(ys,A({role:`menuitemradio`,get checked(){return t.isSelectedValue(i.value)},onSelect:()=>{i.onSelect?.(),t.setSelectedValue(i.value)}},a))}function Bs(e,t,n){let r=e.split(`-`)[0],i=n.getBoundingClientRect(),a=[],o=t.clientX,s=t.clientY;switch(r){case`top`:a.push([o,s+5]),a.push([i.left,i.bottom]),a.push([i.left,i.top]),a.push([i.right,i.top]),a.push([i.right,i.bottom]);break;case`right`:a.push([o-5,s]),a.push([i.left,i.top]),a.push([i.right,i.top]),a.push([i.right,i.bottom]),a.push([i.left,i.bottom]);break;case`bottom`:a.push([o,s-5]),a.push([i.right,i.top]),a.push([i.right,i.bottom]),a.push([i.left,i.bottom]),a.push([i.left,i.top]);break;case`left`:a.push([o+5,s]),a.push([i.right,i.bottom]),a.push([i.left,i.bottom]),a.push([i.left,i.top]),a.push([i.right,i.top])}return a}function Vs(e,t){return t?_n([e.clientX,e.clientY],t):!1}function Hs(e){let t=vs(),r=mr(),i=ps(),a=ls(),o=ds(),s=Y({placement:t.orientation()===`horizontal`?`bottom-start`:`right-start`},e),[c,l]=n(s,[`open`,`defaultOpen`,`onOpenChange`]),u=0,d=null,f=`right`,[p,m]=w(),[g,_]=w(),[v,y]=w(),[b,x]=w(),[S,C]=w(!0),[T,ee]=w(l.placement),[E,D]=w([]),[te,O]=w([]),{DomCollectionProvider:ne}=Cr({items:te,onItemsChange:O}),k=so({open:()=>c.open,defaultOpen:()=>c.defaultOpen,onOpenChange:e=>c.onOpenChange?.(e)}),{present:re}=uo({show:()=>t.forceMount()||k.isOpen(),element:()=>b()??null}),j=fr({selectionMode:`none`,dataSource:te}),M=e=>{C(e),k.open()},ie=(e=!1)=>{k.close(),e&&i&&i.close(!0)},P=e=>{C(e),k.toggle()},I=()=>{let e=b();e&&(Xt(e),j.selectionManager().setFocused(!0),j.selectionManager().setFocusedKey(void 0))},R=()=>{o==null?I():setTimeout(()=>I())},ae=e=>{D(t=>[...t,e]);let t=i?.registerNestedMenu(e);return()=>{D(t=>Mt(t,e)),t?.()}},B=e=>f===d?.side&&Vs(e,d?.area),oe=e=>{B(e)&&e.preventDefault()},se=e=>{B(e)||R()},ce=e=>{B(e)&&e.preventDefault()};Oo({isDisabled:()=>!(i==null&&k.isOpen()&&t.isModal()),targets:()=>[b(),...E()].filter(Boolean)}),F(()=>{let e=b();if(!e||!i)return;let t=i.registerNestedMenu(e);h(()=>{t()})}),F(()=>{i===void 0&&a?.registerMenu(t.value(),[b(),...E()])}),F(()=>{i===void 0&&a!==void 0&&(a.value()===t.value()?(v()?.focus(),a.autoFocusMenu()&&M(!0)):ie())}),F(()=>{i===void 0&&a!==void 0&&k.isOpen()&&a.setValue(t.value())}),h(()=>{i===void 0&&a?.unregisterMenu(t.value())});let le={dataset:N(()=>({"data-expanded":k.isOpen()?``:void 0,"data-closed":k.isOpen()?void 0:``})),isOpen:k.isOpen,contentPresent:re,nestedMenus:E,currentPlacement:T,pointerGraceTimeoutId:()=>u,autoFocus:S,listState:()=>j,parentMenuContext:()=>i,triggerRef:v,contentRef:b,triggerId:p,contentId:g,setTriggerRef:y,setContentRef:x,open:M,close:ie,toggle:P,focusContent:R,onItemEnter:oe,onItemLeave:se,onTriggerLeave:ce,setPointerDir:e=>f=e,setPointerGraceTimeoutId:e=>u=e,setPointerGraceIntent:e=>d=e,registerNestedMenu:ae,registerItemToParentDomCollection:r?.registerItem,registerTriggerId:co(m),registerContentId:co(_)};return z(ne,{get children(){return z(fs.Provider,{value:le,get children(){return z(L,{when:o===void 0,get fallback(){return l.children},get children(){return z(Ia,A({anchorRef:v,contentRef:b,onCurrentPlacementChange:ee},l))}})}})}})}function Us(e){let{direction:t}=Yn();return z(Hs,A({get placement(){return t()===`rtl`?`left-start`:`right-start`},flip:!0},e))}var Ws={close:(e,t)=>e===`ltr`?[t===`horizontal`?`ArrowLeft`:`ArrowUp`]:[t===`horizontal`?`ArrowRight`:`ArrowDown`]};function Gs(e){let t=ms(),r=vs(),[i,a]=n(e,[`onFocusOutside`,`onKeyDown`]),{direction:o}=Yn();return z(ws,A({onOpenAutoFocus:e=>{e.preventDefault()},onCloseAutoFocus:e=>{e.preventDefault()},onFocusOutside:e=>{i.onFocusOutside?.(e);let n=e.target;Lt(t.triggerRef(),n)||t.close()},onKeyDown:e=>{q(e,i.onKeyDown);let n=Lt(e.currentTarget,e.target),a=Ws.close(o(),r.orientation()).includes(e.key),s=t.parentMenuContext()!=null;n&&a&&s&&(t.close(),Xt(t.triggerRef()))}},a))}var Ks=[`Enter`,` `],qs={open:(e,t)=>e===`ltr`?[...Ks,t===`horizontal`?`ArrowRight`:`ArrowDown`]:[...Ks,t===`horizontal`?`ArrowLeft`:`ArrowUp`]};function Js(e){let r,i=vs(),a=ms(),o=Y({id:i.generateId(`sub-trigger-${B()}`)},e),[s,c]=n(o,[`ref`,`id`,`textValue`,`disabled`,`onPointerMove`,`onPointerLeave`,`onPointerDown`,`onPointerUp`,`onClick`,`onKeyDown`,`onMouseDown`,`onFocus`]),l=null,u=()=>{l&&window.clearTimeout(l),l=null},{direction:d}=Yn(),f=()=>s.id,m=()=>{let e=a.parentMenuContext();if(e==null)throw Error("[kobalte]: `Menu.SubTrigger` must be used within a `Menu.Sub` component");return e.listState().selectionManager()},g=()=>a.listState().collection(),_=()=>m().focusedKey()===f(),v=lr({key:f,selectionManager:m,shouldSelectOnPressUp:!0,allowsDifferentPressOrigin:!0,disabled:()=>s.disabled},()=>r),y=e=>{q(e,s.onClick),!a.isOpen()&&!s.disabled&&a.open(!0)},b=e=>{if(q(e,s.onPointerMove),e.pointerType!==`mouse`)return;let t=a.parentMenuContext();t?.onItemEnter(e),!e.defaultPrevented&&(s.disabled?t?.onItemLeave(e):(!a.isOpen()&&!l&&(a.parentMenuContext()?.setPointerGraceIntent(null),l=window.setTimeout(()=>{a.open(!1),u()},100)),t?.onItemEnter(e),e.defaultPrevented||(a.listState().selectionManager().isFocused()&&(a.listState().selectionManager().setFocused(!1),a.listState().selectionManager().setFocusedKey(void 0)),Xt(e.currentTarget),t?.listState().selectionManager().setFocused(!0),t?.listState().selectionManager().setFocusedKey(f()))))},x=e=>{if(q(e,s.onPointerLeave),e.pointerType!==`mouse`)return;u();let t=a.parentMenuContext(),n=a.contentRef();if(n){t?.setPointerGraceIntent({area:Bs(a.currentPlacement(),e,n),side:a.currentPlacement().split(`-`)[0]}),window.clearTimeout(t?.pointerGraceTimeoutId());let r=window.setTimeout(()=>{t?.setPointerGraceIntent(null)},300);t?.setPointerGraceTimeoutId(r)}else{if(t?.onTriggerLeave(e),e.defaultPrevented)return;t?.setPointerGraceIntent(null)}t?.onItemLeave(e)},S=e=>{q(e,s.onKeyDown),!e.repeat&&(s.disabled||qs.open(d(),i.orientation()).includes(e.key)&&(e.stopPropagation(),e.preventDefault(),m().setFocused(!1),m().setFocusedKey(void 0),a.isOpen()||a.open(`first`),a.focusContent(),a.listState().selectionManager().setFocused(!0),a.listState().selectionManager().setFocusedKey(g().getFirstKey())))};return F(()=>{if(a.registerItemToParentDomCollection==null)throw Error("[kobalte]: `Menu.SubTrigger` must be used within a `Menu.Sub` component");let e=a.registerItemToParentDomCollection({ref:()=>r,type:`item`,key:f(),textValue:s.textValue??r?.textContent??``,disabled:s.disabled??!1});h(e)}),F(p(()=>a.parentMenuContext()?.pointerGraceTimeoutId(),e=>{h(()=>{window.clearTimeout(e),a.parentMenuContext()?.setPointerGraceIntent(null)})})),F(()=>h(a.registerTriggerId(s.id))),h(()=>{u()}),z(X,A({as:`div`,ref(e){let t=dt(e=>{a.setTriggerRef(e),r=e},s.ref);typeof t==`function`&&t(e)},get id(){return s.id},role:`menuitem`,get tabIndex(){return v.tabIndex()},"aria-haspopup":`true`,get"aria-expanded"(){return a.isOpen()},get"aria-controls"(){return t(()=>!!a.isOpen())()?a.contentId():void 0},get"aria-disabled"(){return s.disabled},get"data-key"(){return v.dataKey()},get"data-highlighted"(){return _()?``:void 0},get"data-disabled"(){return s.disabled?``:void 0},get onPointerDown(){return J([s.onPointerDown,v.onPointerDown])},get onPointerUp(){return J([s.onPointerUp,v.onPointerUp])},get onClick(){return J([y,v.onClick])},get onKeyDown(){return J([S,v.onKeyDown])},get onMouseDown(){return J([s.onMouseDown,v.onMouseDown])},get onFocus(){return J([s.onFocus,v.onFocus])},onPointerMove:b,onPointerLeave:x},()=>a.dataset(),c))}function Ys(e){let t=ls(),r=Y({id:`menu-${B()}`,modal:!0},e),[i,a]=n(r,[`id`,`modal`,`preventScroll`,`forceMount`,`open`,`defaultOpen`,`onOpenChange`,`value`,`orientation`]),o=so({open:()=>i.open,defaultOpen:()=>i.defaultOpen,onOpenChange:e=>i.onOpenChange?.(e)}),s={isModal:()=>i.modal??!0,preventScroll:()=>i.preventScroll??s.isModal(),forceMount:()=>i.forceMount??!1,generateId:It(()=>i.id),value:()=>i.value,orientation:()=>i.orientation??t?.orientation()??`horizontal`};return z(_s.Provider,{value:s,get children(){return z(Hs,A({get open(){return o.isOpen()},get onOpenChange(){return o.setIsOpen}},a))}})}On({},{Root:()=>Xs,Separator:()=>Zs});function Xs(e){let t,r=Y({orientation:`horizontal`},e),[i,a]=n(r,[`ref`,`orientation`]),o=Tn(()=>t,()=>`hr`);return z(X,A({as:`hr`,ref(e){let n=dt(e=>t=e,i.ref);typeof n==`function`&&n(e)},get role(){return o()===`hr`?void 0:`separator`},get"aria-orientation"(){return i.orientation===`vertical`?`vertical`:void 0},get"data-orientation"(){return i.orientation}},a))}var Zs=Xs,Z={};On(Z,{Arrow:()=>Da,CheckboxItem:()=>bs,Content:()=>Qs,DropdownMenu:()=>ec,Group:()=>Os,GroupLabel:()=>ks,Icon:()=>As,Item:()=>js,ItemDescription:()=>Ms,ItemIndicator:()=>Ns,ItemLabel:()=>Ps,Portal:()=>Fs,RadioGroup:()=>Rs,RadioItem:()=>zs,Root:()=>$s,Separator:()=>Xs,Sub:()=>Us,SubContent:()=>Gs,SubTrigger:()=>Js,Trigger:()=>Cs});function Qs(e){let t=vs(),r=ms(),[i,a]=n(e,[`onCloseAutoFocus`,`onInteractOutside`]),o=!1;return z(Ts,A({onCloseAutoFocus:e=>{i.onCloseAutoFocus?.(e),o||Xt(r.triggerRef()),o=!1,e.preventDefault()},onInteractOutside:e=>{i.onInteractOutside?.(e),(!t.isModal()||e.detail.isContextMenu)&&(o=!0)}},a))}function $s(e){let t=Y({id:`dropdownmenu-${B()}`},e);return z(Ys,t)}var ec=Object.assign($s,{Arrow:Da,CheckboxItem:bs,Content:Qs,Group:Os,GroupLabel:ks,Icon:As,Item:js,ItemDescription:Ms,ItemIndicator:Ns,ItemLabel:Ps,Portal:Fs,RadioGroup:Rs,RadioItem:zs,Separator:Xs,Sub:Us,SubContent:Gs,SubTrigger:Js,Trigger:Cs}),Q={colors:{inherit:`inherit`,current:`currentColor`,transparent:`transparent`,black:`#000000`,white:`#ffffff`,neutral:{50:`#f9fafb`,100:`#f2f4f7`,200:`#eaecf0`,300:`#d0d5dd`,400:`#98a2b3`,500:`#667085`,600:`#475467`,700:`#344054`,800:`#1d2939`,900:`#101828`},darkGray:{50:`#525c7a`,100:`#49536e`,200:`#414962`,300:`#394056`,400:`#313749`,500:`#292e3d`,600:`#212530`,700:`#191c24`,800:`#111318`,900:`#0b0d10`},gray:{50:`#f9fafb`,100:`#f2f4f7`,200:`#eaecf0`,300:`#d0d5dd`,400:`#98a2b3`,500:`#667085`,600:`#475467`,700:`#344054`,800:`#1d2939`,900:`#101828`},blue:{25:`#F5FAFF`,50:`#EFF8FF`,100:`#D1E9FF`,200:`#B2DDFF`,300:`#84CAFF`,400:`#53B1FD`,500:`#2E90FA`,600:`#1570EF`,700:`#175CD3`,800:`#1849A9`,900:`#194185`},green:{25:`#F6FEF9`,50:`#ECFDF3`,100:`#D1FADF`,200:`#A6F4C5`,300:`#6CE9A6`,400:`#32D583`,500:`#12B76A`,600:`#039855`,700:`#027A48`,800:`#05603A`,900:`#054F31`},red:{50:`#fef2f2`,100:`#fee2e2`,200:`#fecaca`,300:`#fca5a5`,400:`#f87171`,500:`#ef4444`,600:`#dc2626`,700:`#b91c1c`,800:`#991b1b`,900:`#7f1d1d`,950:`#450a0a`},yellow:{25:`#FFFCF5`,50:`#FFFAEB`,100:`#FEF0C7`,200:`#FEDF89`,300:`#FEC84B`,400:`#FDB022`,500:`#F79009`,600:`#DC6803`,700:`#B54708`,800:`#93370D`,900:`#7A2E0E`},purple:{25:`#FAFAFF`,50:`#F4F3FF`,100:`#EBE9FE`,200:`#D9D6FE`,300:`#BDB4FE`,400:`#9B8AFB`,500:`#7A5AF8`,600:`#6938EF`,700:`#5925DC`,800:`#4A1FB8`,900:`#3E1C96`},teal:{25:`#F6FEFC`,50:`#F0FDF9`,100:`#CCFBEF`,200:`#99F6E0`,300:`#5FE9D0`,400:`#2ED3B7`,500:`#15B79E`,600:`#0E9384`,700:`#107569`,800:`#125D56`,900:`#134E48`},pink:{25:`#fdf2f8`,50:`#fce7f3`,100:`#fbcfe8`,200:`#f9a8d4`,300:`#f472b6`,400:`#ec4899`,500:`#db2777`,600:`#be185d`,700:`#9d174d`,800:`#831843`,900:`#500724`},cyan:{25:`#ecfeff`,50:`#cffafe`,100:`#a5f3fc`,200:`#67e8f9`,300:`#22d3ee`,400:`#06b6d4`,500:`#0891b2`,600:`#0e7490`,700:`#155e75`,800:`#164e63`,900:`#083344`}},alpha:{100:`ff`,90:`e5`,80:`cc`,70:`b3`,60:`99`,50:`80`,40:`66`,30:`4d`,20:`33`,10:`1a`,0:`00`},font:{size:{"2xs":`calc(var(--tsqd-font-size) * 0.625)`,xs:`calc(var(--tsqd-font-size) * 0.75)`,sm:`calc(var(--tsqd-font-size) * 0.875)`,md:`var(--tsqd-font-size)`,lg:`calc(var(--tsqd-font-size) * 1.125)`,xl:`calc(var(--tsqd-font-size) * 1.25)`,"2xl":`calc(var(--tsqd-font-size) * 1.5)`,"3xl":`calc(var(--tsqd-font-size) * 1.875)`,"4xl":`calc(var(--tsqd-font-size) * 2.25)`,"5xl":`calc(var(--tsqd-font-size) * 3)`,"6xl":`calc(var(--tsqd-font-size) * 3.75)`,"7xl":`calc(var(--tsqd-font-size) * 4.5)`,"8xl":`calc(var(--tsqd-font-size) * 6)`,"9xl":`calc(var(--tsqd-font-size) * 8)`},lineHeight:{xs:`calc(var(--tsqd-font-size) * 1)`,sm:`calc(var(--tsqd-font-size) * 1.25)`,md:`calc(var(--tsqd-font-size) * 1.5)`,lg:`calc(var(--tsqd-font-size) * 1.75)`,xl:`calc(var(--tsqd-font-size) * 2)`,"2xl":`calc(var(--tsqd-font-size) * 2.25)`,"3xl":`calc(var(--tsqd-font-size) * 2.5)`,"4xl":`calc(var(--tsqd-font-size) * 2.75)`,"5xl":`calc(var(--tsqd-font-size) * 3)`,"6xl":`calc(var(--tsqd-font-size) * 3.25)`,"7xl":`calc(var(--tsqd-font-size) * 3.5)`,"8xl":`calc(var(--tsqd-font-size) * 3.75)`,"9xl":`calc(var(--tsqd-font-size) * 4)`},weight:{thin:`100`,extralight:`200`,light:`300`,normal:`400`,medium:`500`,semibold:`600`,bold:`700`,extrabold:`800`,black:`900`}},breakpoints:{xs:`320px`,sm:`640px`,md:`768px`,lg:`1024px`,xl:`1280px`,"2xl":`1536px`},border:{radius:{none:`0px`,xs:`calc(var(--tsqd-font-size) * 0.125)`,sm:`calc(var(--tsqd-font-size) * 0.25)`,md:`calc(var(--tsqd-font-size) * 0.375)`,lg:`calc(var(--tsqd-font-size) * 0.5)`,xl:`calc(var(--tsqd-font-size) * 0.75)`,"2xl":`calc(var(--tsqd-font-size) * 1)`,"3xl":`calc(var(--tsqd-font-size) * 1.5)`,full:`9999px`}},size:{0:`0px`,.25:`calc(var(--tsqd-font-size) * 0.0625)`,.5:`calc(var(--tsqd-font-size) * 0.125)`,1:`calc(var(--tsqd-font-size) * 0.25)`,1.5:`calc(var(--tsqd-font-size) * 0.375)`,2:`calc(var(--tsqd-font-size) * 0.5)`,2.5:`calc(var(--tsqd-font-size) * 0.625)`,3:`calc(var(--tsqd-font-size) * 0.75)`,3.5:`calc(var(--tsqd-font-size) * 0.875)`,4:`calc(var(--tsqd-font-size) * 1)`,4.5:`calc(var(--tsqd-font-size) * 1.125)`,5:`calc(var(--tsqd-font-size) * 1.25)`,5.5:`calc(var(--tsqd-font-size) * 1.375)`,6:`calc(var(--tsqd-font-size) * 1.5)`,6.5:`calc(var(--tsqd-font-size) * 1.625)`,7:`calc(var(--tsqd-font-size) * 1.75)`,8:`calc(var(--tsqd-font-size) * 2)`,9:`calc(var(--tsqd-font-size) * 2.25)`,10:`calc(var(--tsqd-font-size) * 2.5)`,11:`calc(var(--tsqd-font-size) * 2.75)`,12:`calc(var(--tsqd-font-size) * 3)`,14:`calc(var(--tsqd-font-size) * 3.5)`,16:`calc(var(--tsqd-font-size) * 4)`,20:`calc(var(--tsqd-font-size) * 5)`,24:`calc(var(--tsqd-font-size) * 6)`,28:`calc(var(--tsqd-font-size) * 7)`,32:`calc(var(--tsqd-font-size) * 8)`,36:`calc(var(--tsqd-font-size) * 9)`,40:`calc(var(--tsqd-font-size) * 10)`,44:`calc(var(--tsqd-font-size) * 11)`,48:`calc(var(--tsqd-font-size) * 12)`,52:`calc(var(--tsqd-font-size) * 13)`,56:`calc(var(--tsqd-font-size) * 14)`,60:`calc(var(--tsqd-font-size) * 15)`,64:`calc(var(--tsqd-font-size) * 16)`,72:`calc(var(--tsqd-font-size) * 18)`,80:`calc(var(--tsqd-font-size) * 20)`,96:`calc(var(--tsqd-font-size) * 24)`},shadow:{xs:(e=`rgb(0 0 0 / 0.1)`)=>`0 1px 2px 0 rgb(0 0 0 / 0.05)`,sm:(e=`rgb(0 0 0 / 0.1)`)=>`0 1px 3px 0 ${e}, 0 1px 2px -1px ${e}`,md:(e=`rgb(0 0 0 / 0.1)`)=>`0 4px 6px -1px ${e}, 0 2px 4px -2px ${e}`,lg:(e=`rgb(0 0 0 / 0.1)`)=>`0 10px 15px -3px ${e}, 0 4px 6px -4px ${e}`,xl:(e=`rgb(0 0 0 / 0.1)`)=>`0 20px 25px -5px ${e}, 0 8px 10px -6px ${e}`,"2xl":(e=`rgb(0 0 0 / 0.25)`)=>`0 25px 50px -12px ${e}`,inner:(e=`rgb(0 0 0 / 0.05)`)=>`inset 0 2px 4px 0 ${e}`,none:()=>`none`},zIndices:{hide:-1,auto:`auto`,base:0,docked:10,dropdown:1e3,sticky:1100,banner:1200,overlay:1300,modal:1400,popover:1500,skipLink:1600,toast:1700,tooltip:1800}},tc=b(`<svg width=14 height=14 viewBox="0 0 14 14"fill=none xmlns=http://www.w3.org/2000/svg><path d="M13 13L9.00007 9M10.3333 5.66667C10.3333 8.244 8.244 10.3333 5.66667 10.3333C3.08934 10.3333 1 8.244 1 5.66667C1 3.08934 3.08934 1 5.66667 1C8.244 1 10.3333 3.08934 10.3333 5.66667Z"stroke=currentColor stroke-width=1.66667 stroke-linecap=round stroke-linejoin=round>`),nc=b(`<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M9 3H15M3 6H21M19 6L18.2987 16.5193C18.1935 18.0975 18.1409 18.8867 17.8 19.485C17.4999 20.0118 17.0472 20.4353 16.5017 20.6997C15.882 21 15.0911 21 13.5093 21H10.4907C8.90891 21 8.11803 21 7.49834 20.6997C6.95276 20.4353 6.50009 20.0118 6.19998 19.485C5.85911 18.8867 5.8065 18.0975 5.70129 16.5193L5 6M10 10.5V15.5M14 10.5V15.5"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),rc=b(`<svg width=10 height=6 viewBox="0 0 10 6"fill=none xmlns=http://www.w3.org/2000/svg><path d="M1 1L5 5L9 1"stroke=currentColor stroke-width=1.66667 stroke-linecap=round stroke-linejoin=round>`),ic=b(`<svg width=12 height=12 viewBox="0 0 16 16"fill=none xmlns=http://www.w3.org/2000/svg><path d="M8 13.3333V2.66667M8 2.66667L4 6.66667M8 2.66667L12 6.66667"stroke=currentColor stroke-width=1.66667 stroke-linecap=round stroke-linejoin=round>`),ac=b(`<svg width=12 height=12 viewBox="0 0 16 16"fill=none xmlns=http://www.w3.org/2000/svg><path d="M8 2.66667V13.3333M8 13.3333L4 9.33333M8 13.3333L12 9.33333"stroke=currentColor stroke-width=1.66667 stroke-linecap=round stroke-linejoin=round>`),oc=b(`<svg width=12 height=12 viewBox="0 0 16 16"fill=none xmlns=http://www.w3.org/2000/svg style=transform:rotate(90deg)><path d="M8 2.66667V13.3333M8 13.3333L4 9.33333M8 13.3333L12 9.33333"stroke=currentColor stroke-width=1.66667 stroke-linecap=round stroke-linejoin=round>`),sc=b(`<svg width=12 height=12 viewBox="0 0 16 16"fill=none xmlns=http://www.w3.org/2000/svg style=transform:rotate(-90deg)><path d="M8 2.66667V13.3333M8 13.3333L4 9.33333M8 13.3333L12 9.33333"stroke=currentColor stroke-width=1.66667 stroke-linecap=round stroke-linejoin=round>`),cc=b(`<svg viewBox="0 0 24 24"height=12 width=12 fill=none xmlns=http://www.w3.org/2000/svg><path d="M12 2v2m0 16v2M4 12H2m4.314-5.686L4.9 4.9m12.786 1.414L19.1 4.9M6.314 17.69 4.9 19.104m12.786-1.414 1.414 1.414M22 12h-2m-3 0a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),lc=b(`<svg viewBox="0 0 24 24"height=12 width=12 fill=none xmlns=http://www.w3.org/2000/svg><path d="M22 15.844a10.424 10.424 0 0 1-4.306.925c-5.779 0-10.463-4.684-10.463-10.462 0-1.536.33-2.994.925-4.307A10.464 10.464 0 0 0 2 11.538C2 17.316 6.684 22 12.462 22c4.243 0 7.896-2.526 9.538-6.156Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),uc=b(`<svg viewBox="0 0 24 24"height=12 width=12 fill=none xmlns=http://www.w3.org/2000/svg><path d="M8 21h8m-4-4v4m-5.2-4h10.4c1.68 0 2.52 0 3.162-.327a3 3 0 0 0 1.311-1.311C22 14.72 22 13.88 22 12.2V7.8c0-1.68 0-2.52-.327-3.162a3 3 0 0 0-1.311-1.311C19.72 3 18.88 3 17.2 3H6.8c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.311 1.311C2 5.28 2 6.12 2 7.8v4.4c0 1.68 0 2.52.327 3.162a3 3 0 0 0 1.311 1.311C4.28 17 5.12 17 6.8 17Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),dc=b(`<svg stroke=currentColor fill=currentColor stroke-width=0 viewBox="0 0 24 24"height=1em width=1em xmlns=http://www.w3.org/2000/svg><path fill=none d="M0 0h24v24H0z"></path><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3a4.237 4.237 0 00-6 0zm-4-4l2 2a7.074 7.074 0 0110 0l2-2C15.14 9.14 8.87 9.14 5 13z">`),fc=b(`<svg stroke-width=0 viewBox="0 0 24 24"height=1em width=1em xmlns=http://www.w3.org/2000/svg><path fill=none d="M24 .01c0-.01 0-.01 0 0L0 0v24h24V.01zM0 0h24v24H0V0zm0 0h24v24H0V0z"></path><path d="M22.99 9C19.15 5.16 13.8 3.76 8.84 4.78l2.52 2.52c3.47-.17 6.99 1.05 9.63 3.7l2-2zm-4 4a9.793 9.793 0 00-4.49-2.56l3.53 3.53.96-.97zM2 3.05L5.07 6.1C3.6 6.82 2.22 7.78 1 9l1.99 2c1.24-1.24 2.67-2.16 4.2-2.77l2.24 2.24A9.684 9.684 0 005 13v.01L6.99 15a7.042 7.042 0 014.92-2.06L18.98 20l1.27-1.26L3.29 1.79 2 3.05zM9 17l3 3 3-3a4.237 4.237 0 00-6 0z">`),pc=b(`<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M9.3951 19.3711L9.97955 20.6856C10.1533 21.0768 10.4368 21.4093 10.7958 21.6426C11.1547 21.8759 11.5737 22.0001 12.0018 22C12.4299 22.0001 12.8488 21.8759 13.2078 21.6426C13.5667 21.4093 13.8503 21.0768 14.024 20.6856L14.6084 19.3711C14.8165 18.9047 15.1664 18.5159 15.6084 18.26C16.0532 18.0034 16.5678 17.8941 17.0784 17.9478L18.5084 18.1C18.9341 18.145 19.3637 18.0656 19.7451 17.8713C20.1265 17.6771 20.4434 17.3763 20.6573 17.0056C20.8715 16.635 20.9735 16.2103 20.9511 15.7829C20.9286 15.3555 20.7825 14.9438 20.5307 14.5978L19.684 13.4344C19.3825 13.0171 19.2214 12.5148 19.224 12C19.2239 11.4866 19.3865 10.9864 19.6884 10.5711L20.5351 9.40778C20.787 9.06175 20.933 8.65007 20.9555 8.22267C20.978 7.79528 20.8759 7.37054 20.6618 7C20.4479 6.62923 20.131 6.32849 19.7496 6.13423C19.3681 5.93997 18.9386 5.86053 18.5129 5.90556L17.0829 6.05778C16.5722 6.11141 16.0577 6.00212 15.6129 5.74556C15.17 5.48825 14.82 5.09736 14.6129 4.62889L14.024 3.31444C13.8503 2.92317 13.5667 2.59072 13.2078 2.3574C12.8488 2.12408 12.4299 1.99993 12.0018 2C11.5737 1.99993 11.1547 2.12408 10.7958 2.3574C10.4368 2.59072 10.1533 2.92317 9.97955 3.31444L9.3951 4.62889C9.18803 5.09736 8.83798 5.48825 8.3951 5.74556C7.95032 6.00212 7.43577 6.11141 6.9251 6.05778L5.49066 5.90556C5.06499 5.86053 4.6354 5.93997 4.25397 6.13423C3.87255 6.32849 3.55567 6.62923 3.34177 7C3.12759 7.37054 3.02555 7.79528 3.04804 8.22267C3.07052 8.65007 3.21656 9.06175 3.46844 9.40778L4.3151 10.5711C4.61704 10.9864 4.77964 11.4866 4.77955 12C4.77964 12.5134 4.61704 13.0137 4.3151 13.4289L3.46844 14.5922C3.21656 14.9382 3.07052 15.3499 3.04804 15.7773C3.02555 16.2047 3.12759 16.6295 3.34177 17C3.55589 17.3706 3.8728 17.6712 4.25417 17.8654C4.63554 18.0596 5.06502 18.1392 5.49066 18.0944L6.92066 17.9422C7.43133 17.8886 7.94587 17.9979 8.39066 18.2544C8.83519 18.511 9.18687 18.902 9.3951 19.3711Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round></path><path d="M12 15C13.6568 15 15 13.6569 15 12C15 10.3431 13.6568 9 12 9C10.3431 9 8.99998 10.3431 8.99998 12C8.99998 13.6569 10.3431 15 12 15Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),mc=b(`<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M16 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V8M11.5 12.5L17 7M17 7H12M17 7V12M6.2 21H8.8C9.9201 21 10.4802 21 10.908 20.782C11.2843 20.5903 11.5903 20.2843 11.782 19.908C12 19.4802 12 18.9201 12 17.8V15.2C12 14.0799 12 13.5198 11.782 13.092C11.5903 12.7157 11.2843 12.4097 10.908 12.218C10.4802 12 9.92011 12 8.8 12H6.2C5.0799 12 4.51984 12 4.09202 12.218C3.71569 12.4097 3.40973 12.7157 3.21799 13.092C3 13.5198 3 14.0799 3 15.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),hc=b(`<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path class=copier d="M8 8V5.2C8 4.0799 8 3.51984 8.21799 3.09202C8.40973 2.71569 8.71569 2.40973 9.09202 2.21799C9.51984 2 10.0799 2 11.2 2H18.8C19.9201 2 20.4802 2 20.908 2.21799C21.2843 2.40973 21.5903 2.71569 21.782 3.09202C22 3.51984 22 4.0799 22 5.2V12.8C22 13.9201 22 14.4802 21.782 14.908C21.5903 15.2843 21.2843 15.5903 20.908 15.782C20.4802 16 19.9201 16 18.8 16H16M5.2 22H12.8C13.9201 22 14.4802 22 14.908 21.782C15.2843 21.5903 15.5903 21.2843 15.782 20.908C16 20.4802 16 19.9201 16 18.8V11.2C16 10.0799 16 9.51984 15.782 9.09202C15.5903 8.71569 15.2843 8.40973 14.908 8.21799C14.4802 8 13.9201 8 12.8 8H5.2C4.0799 8 3.51984 8 3.09202 8.21799C2.71569 8.40973 2.40973 8.71569 2.21799 9.09202C2 9.51984 2 10.0799 2 11.2V18.8C2 19.9201 2 20.4802 2.21799 20.908C2.40973 21.2843 2.71569 21.5903 3.09202 21.782C3.51984 22 4.07989 22 5.2 22Z"stroke-width=2 stroke-linecap=round stroke-linejoin=round stroke=currentColor>`),gc=b(`<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M2.5 21.4998L8.04927 19.3655C8.40421 19.229 8.58168 19.1607 8.74772 19.0716C8.8952 18.9924 9.0358 18.901 9.16804 18.7984C9.31692 18.6829 9.45137 18.5484 9.72028 18.2795L21 6.99982C22.1046 5.89525 22.1046 4.10438 21 2.99981C19.8955 1.89525 18.1046 1.89524 17 2.99981L5.72028 14.2795C5.45138 14.5484 5.31692 14.6829 5.20139 14.8318C5.09877 14.964 5.0074 15.1046 4.92823 15.2521C4.83911 15.4181 4.77085 15.5956 4.63433 15.9506L2.5 21.4998ZM2.5 21.4998L4.55812 16.1488C4.7054 15.7659 4.77903 15.5744 4.90534 15.4867C5.01572 15.4101 5.1523 15.3811 5.2843 15.4063C5.43533 15.4351 5.58038 15.5802 5.87048 15.8703L8.12957 18.1294C8.41967 18.4195 8.56472 18.5645 8.59356 18.7155C8.61877 18.8475 8.58979 18.9841 8.51314 19.0945C8.42545 19.2208 8.23399 19.2944 7.85107 19.4417L2.5 21.4998Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),_c=b(`<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M7.5 12L10.5 15L16.5 9M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z"stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),vc=b(`<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M9 9L15 15M15 9L9 15M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z"stroke=#F04438 stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),yc=b(`<svg width=24 height=24 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 xmlns=http://www.w3.org/2000/svg><rect class=list width=20 height=20 y=2 x=2 rx=2></rect><line class=list-item y1=7 y2=7 x1=6 x2=18></line><line class=list-item y2=12 y1=12 x1=6 x2=18></line><line class=list-item y1=17 y2=17 x1=6 x2=18>`),bc=b(`<svg viewBox="0 0 24 24"height=20 width=20 fill=none xmlns=http://www.w3.org/2000/svg><path d="M3 7.8c0-1.68 0-2.52.327-3.162a3 3 0 0 1 1.311-1.311C5.28 3 6.12 3 7.8 3h8.4c1.68 0 2.52 0 3.162.327a3 3 0 0 1 1.311 1.311C21 5.28 21 6.12 21 7.8v8.4c0 1.68 0 2.52-.327 3.162a3 3 0 0 1-1.311 1.311C18.72 21 17.88 21 16.2 21H7.8c-1.68 0-2.52 0-3.162-.327a3 3 0 0 1-1.311-1.311C3 18.72 3 17.88 3 16.2V7.8Z"stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),xc=b(`<svg width=14 height=14 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M7.5 12L10.5 15L16.5 9M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),Sc=b(`<svg width=14 height=14 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M12 2V6M12 18V22M6 12H2M22 12H18M19.0784 19.0784L16.25 16.25M19.0784 4.99994L16.25 7.82837M4.92157 19.0784L7.75 16.25M4.92157 4.99994L7.75 7.82837"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round></path><animateTransform attributeName=transform attributeType=XML type=rotate from=0 to=360 dur=2s repeatCount=indefinite>`),Cc=b(`<svg width=14 height=14 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M15 9L9 15M9 9L15 15M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),wc=b(`<svg width=14 height=14 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M9.5 15V9M14.5 15V9M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),Tc=b(`<svg version=1.0 viewBox="0 0 633 633"><linearGradient x1=-666.45 x2=-666.45 y1=163.28 y2=163.99 gradientTransform="matrix(633 0 0 633 422177 -103358)"gradientUnits=userSpaceOnUse><stop stop-color=#6BDAFF offset=0></stop><stop stop-color=#F9FFB5 offset=.32></stop><stop stop-color=#FFA770 offset=.71></stop><stop stop-color=#FF7373 offset=1></stop></linearGradient><circle cx=316.5 cy=316.5 r=316.5></circle><defs><filter x=-137.5 y=412 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=-137.5 y=412 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=89.5 cy=610.5 rx=214.5 ry=186 fill=#015064 stroke=#00CFE2 stroke-width=25></ellipse></g><defs><filter x=316.5 y=412 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=316.5 y=412 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=543.5 cy=610.5 rx=214.5 ry=186 fill=#015064 stroke=#00CFE2 stroke-width=25></ellipse></g><defs><filter x=-137.5 y=450 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=-137.5 y=450 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=89.5 cy=648.5 rx=214.5 ry=186 fill=#015064 stroke=#00A8B8 stroke-width=25></ellipse></g><defs><filter x=316.5 y=450 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=316.5 y=450 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=543.5 cy=648.5 rx=214.5 ry=186 fill=#015064 stroke=#00A8B8 stroke-width=25></ellipse></g><defs><filter x=-137.5 y=486 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=-137.5 y=486 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=89.5 cy=684.5 rx=214.5 ry=186 fill=#015064 stroke=#007782 stroke-width=25></ellipse></g><defs><filter x=316.5 y=486 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=316.5 y=486 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=543.5 cy=684.5 rx=214.5 ry=186 fill=#015064 stroke=#007782 stroke-width=25></ellipse></g><defs><filter x=272.2 y=308 width=176.9 height=129.3 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=272.2 y=308 width=176.9 height=129.3 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><line x1=436 x2=431 y1=403.2 y2=431.8 fill=none stroke=#000 stroke-linecap=round stroke-linejoin=bevel stroke-width=11></line><line x1=291 x2=280 y1=341.5 y2=403.5 fill=none stroke=#000 stroke-linecap=round stroke-linejoin=bevel stroke-width=11></line><line x1=332.9 x2=328.6 y1=384.1 y2=411.2 fill=none stroke=#000 stroke-linecap=round stroke-linejoin=bevel stroke-width=11></line><linearGradient x1=-670.75 x2=-671.59 y1=164.4 y2=164.49 gradientTransform="matrix(-184.16 -32.472 -11.461 64.997 -121359 -32126)"gradientUnits=userSpaceOnUse><stop stop-color=#EE2700 offset=0></stop><stop stop-color=#FF008E offset=1></stop></linearGradient><path d="m344.1 363 97.7 17.2c5.8 2.1 8.2 6.1 7.1 12.1s-4.7 9.2-11 9.9l-106-18.7-57.5-59.2c-3.2-4.8-2.9-9.1 0.8-12.8s8.3-4.4 13.7-2.1l55.2 53.6z"clip-rule=evenodd fill-rule=evenodd></path><line x1=428.2 x2=429.1 y1=384.5 y2=378 fill=none stroke=#fff stroke-linecap=round stroke-linejoin=bevel stroke-width=7></line><line x1=395.2 x2=396.1 y1=379.5 y2=373 fill=none stroke=#fff stroke-linecap=round stroke-linejoin=bevel stroke-width=7></line><line x1=362.2 x2=363.1 y1=373.5 y2=367.4 fill=none stroke=#fff stroke-linecap=round stroke-linejoin=bevel stroke-width=7></line><line x1=324.2 x2=328.4 y1=351.3 y2=347.4 fill=none stroke=#fff stroke-linecap=round stroke-linejoin=bevel stroke-width=7></line><line x1=303.2 x2=307.4 y1=331.3 y2=327.4 fill=none stroke=#fff stroke-linecap=round stroke-linejoin=bevel stroke-width=7></line></g><defs><filter x=73.2 y=113.8 width=280.6 height=317.4 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=73.2 y=113.8 width=280.6 height=317.4 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><linearGradient x1=-672.16 x2=-672.16 y1=165.03 y2=166.03 gradientTransform="matrix(-100.18 48.861 97.976 200.88 -83342 -93.059)"gradientUnits=userSpaceOnUse><stop stop-color=#A17500 offset=0></stop><stop stop-color=#5D2100 offset=1></stop></linearGradient><path d="m192.3 203c8.1 37.3 14 73.6 17.8 109.1 3.8 35.4 2.8 75.1-3 119.2l61.2-16.7c-15.6-59-25.2-97.9-28.6-116.6s-10.8-51.9-22.1-99.6l-25.3 4.6"clip-rule=evenodd fill-rule=evenodd></path><g stroke=#2F8A00><linearGradient x1=-660.23 x2=-660.23 y1=166.72 y2=167.72 gradientTransform="matrix(92.683 4.8573 -2.0259 38.657 61680 -3088.6)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m195 183.9s-12.6-22.1-36.5-29.9c-15.9-5.2-34.4-1.5-55.5 11.1 15.9 14.3 29.5 22.6 40.7 24.9 16.8 3.6 51.3-6.1 51.3-6.1z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><linearGradient x1=-661.36 x2=-661.36 y1=164.18 y2=165.18 gradientTransform="matrix(110 5.7648 -6.3599 121.35 73933 -15933)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m194.9 184.5s-47.5-8.5-83.2 15.7c-23.8 16.2-34.3 49.3-31.6 99.4 30.3-27.8 52.1-48.5 65.2-61.9 19.8-20.2 49.6-53.2 49.6-53.2z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><linearGradient x1=-656.79 x2=-656.79 y1=165.15 y2=166.15 gradientTransform="matrix(62.954 3.2993 -3.5023 66.828 42156 -8754.1)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m195 183.9c-0.8-21.9 6-38 20.6-48.2s29.8-15.4 45.5-15.3c-6.1 21.4-14.5 35.8-25.2 43.4s-24.4 14.2-40.9 20.1z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><linearGradient x1=-663.07 x2=-663.07 y1=165.44 y2=166.44 gradientTransform="matrix(152.47 7.9907 -3.0936 59.029 101884 -4318.7)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m194.9 184.5c31.9-30 64.1-39.7 96.7-29s50.8 30.4 54.6 59.1c-35.2-5.5-60.4-9.6-75.8-12.1-15.3-2.6-40.5-8.6-75.5-18z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><linearGradient x1=-662.57 x2=-662.57 y1=164.44 y2=165.44 gradientTransform="matrix(136.46 7.1517 -5.2163 99.533 91536 -11442)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m194.9 184.5c35.8-7.6 65.6-0.2 89.2 22s37.7 49 42.3 80.3c-39.8-9.7-68.3-23.8-85.5-42.4s-32.5-38.5-46-59.9z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><linearGradient x1=-656.43 x2=-656.43 y1=163.86 y2=164.86 gradientTransform="matrix(60.866 3.1899 -8.7773 167.48 41560 -25168)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m194.9 184.5c-33.6 13.8-53.6 35.7-60.1 65.6s-3.6 63.1 8.7 99.6c27.4-40.3 43.2-69.6 47.4-88s5.6-44.1 4-77.2z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><path d="m196.5 182.3c-14.8 21.6-25.1 41.4-30.8 59.4s-9.5 33-11.1 45.1"fill=none stroke-linecap=round stroke-width=8></path><path d="m194.9 185.7c-24.4 1.7-43.8 9-58.1 21.8s-24.7 25.4-31.3 37.8"fill=none stroke-linecap=round stroke-width=8></path><path d="m204.5 176.4c29.7-6.7 52-8.4 67-5.1s26.9 8.6 35.8 15.9"fill=none stroke-linecap=round stroke-width=8></path><path d="m196.5 181.4c20.3 9.9 38.2 20.5 53.9 31.9s27.4 22.1 35.1 32"fill=none stroke-linecap=round stroke-width=8></path></g></g><defs><filter x=50.5 y=399 width=532 height=633 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=50.5 y=399 width=532 height=633 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><linearGradient x1=-666.06 x2=-666.23 y1=163.36 y2=163.75 gradientTransform="matrix(532 0 0 633 354760 -102959)"gradientUnits=userSpaceOnUse><stop stop-color=#FFF400 offset=0></stop><stop stop-color=#3C8700 offset=1></stop></linearGradient><ellipse cx=316.5 cy=715.5 rx=266 ry=316.5></ellipse></g><defs><filter x=391 y=-24 width=288 height=283 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=391 y=-24 width=288 height=283 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><linearGradient x1=-664.56 x2=-664.56 y1=163.79 y2=164.79 gradientTransform="matrix(227 0 0 227 151421 -37204)"gradientUnits=userSpaceOnUse><stop stop-color=#FFDF00 offset=0></stop><stop stop-color=#FF9D00 offset=1></stop></linearGradient><circle cx=565.5 cy=89.5 r=113.5></circle><linearGradient x1=-644.5 x2=-645.77 y1=342 y2=342 gradientTransform="matrix(30 0 0 1 19770 -253)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=427 x2=397 y1=89 y2=89 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-641.56 x2=-642.83 y1=196.02 y2=196.07 gradientTransform="matrix(26.5 0 0 5.5 17439 -1025.5)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=430.5 x2=404 y1=55.5 y2=50 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-643.73 x2=-645 y1=185.83 y2=185.9 gradientTransform="matrix(29 0 0 8 19107 -1361)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=431 x2=402 y1=122 y2=130 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-638.94 x2=-640.22 y1=177.09 y2=177.39 gradientTransform="matrix(24 0 0 13 15783 -2145)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=442 x2=418 y1=153 y2=166 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-633.42 x2=-634.7 y1=172.41 y2=173.31 gradientTransform="matrix(20 0 0 19 13137 -3096)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=464 x2=444 y1=180 y2=199 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-619.05 x2=-619.52 y1=170.82 y2=171.82 gradientTransform="matrix(13.83 0 0 22.85 9050 -3703.4)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=491.4 x2=477.5 y1=203 y2=225.9 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-578.5 x2=-578.63 y1=170.31 y2=171.31 gradientTransform="matrix(7.5 0 0 24.5 4860 -3953)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=524.5 x2=517 y1=219.5 y2=244 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=666.5 x2=666.5 y1=170.31 y2=171.31 gradientTransform="matrix(.5 0 0 24.5 231.5 -3944)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=564.5 x2=565 y1=228.5 y2=253 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12>`);function Ec(){return tc()}function Dc(){return nc()}function Oc(){return rc()}function kc(){return ic()}function Ac(){return ac()}function jc(){return oc()}function Mc(){return sc()}function Nc(){return cc()}function Pc(){return lc()}function Fc(){return uc()}function Ic(){return dc()}function Lc(){return fc()}function Rc(){return pc()}function zc(){return mc()}function Bc(){return hc()}function Vc(){return gc()}function Hc(e){return(()=>{var t=_c(),n=t.firstChild;return k(()=>d(n,`stroke`,e.theme===`dark`?`#12B76A`:`#027A48`)),t})()}function Uc(){return vc()}function Wc(){return yc()}function Gc(e){return[z(L,{get when(){return e.checked},get children(){var t=_c(),n=t.firstChild;return k(()=>d(n,`stroke`,e.theme===`dark`?`#9B8AFB`:`#6938EF`)),t}}),z(L,{get when(){return!e.checked},get children(){var t=bc(),n=t.firstChild;return k(()=>d(n,`stroke`,e.theme===`dark`?`#9B8AFB`:`#6938EF`)),t}})]}function Kc(){return xc()}function qc(){return Sc()}function Jc(){return Cc()}function Yc(){return wc()}function Xc(){let e=B();return(()=>{var t=Tc(),n=t.firstChild,r=n.nextSibling,i=r.nextSibling,a=i.firstChild,o=i.nextSibling,s=o.firstChild,c=o.nextSibling,l=c.nextSibling,u=l.firstChild,f=l.nextSibling,p=f.firstChild,m=f.nextSibling,h=m.nextSibling,g=h.firstChild,_=h.nextSibling,v=_.firstChild,y=_.nextSibling,b=y.nextSibling,x=b.firstChild,S=b.nextSibling,C=S.firstChild,w=S.nextSibling,T=w.nextSibling,ee=T.firstChild,E=T.nextSibling,D=E.firstChild,te=E.nextSibling,O=te.nextSibling,ne=O.firstChild,k=O.nextSibling,re=k.firstChild,A=k.nextSibling,j=A.nextSibling,M=j.firstChild,N=j.nextSibling,ie=N.firstChild,P=N.nextSibling,F=P.firstChild.nextSibling.nextSibling.nextSibling,I=F.nextSibling,L=P.nextSibling,R=L.firstChild,ae=L.nextSibling,z=ae.firstChild,B=ae.nextSibling,oe=B.firstChild,se=oe.nextSibling,ce=se.nextSibling.firstChild,le=ce.nextSibling,ue=le.nextSibling,de=ue.nextSibling,V=de.nextSibling,fe=V.nextSibling,pe=fe.nextSibling,me=pe.nextSibling,he=me.nextSibling,ge=he.nextSibling,_e=ge.nextSibling,ve=_e.nextSibling,ye=B.nextSibling,be=ye.firstChild,xe=ye.nextSibling,Se=xe.firstChild,Ce=xe.nextSibling,we=Ce.firstChild,Te=we.nextSibling,Ee=Ce.nextSibling,De=Ee.firstChild,Oe=Ee.nextSibling,ke=Oe.firstChild,Ae=Oe.nextSibling,je=Ae.firstChild,Me=je.nextSibling,Ne=Me.nextSibling,Pe=Ne.nextSibling,H=Pe.nextSibling,Fe=H.nextSibling,Ie=Fe.nextSibling,Le=Ie.nextSibling,Re=Le.nextSibling,ze=Re.nextSibling,U=ze.nextSibling,Be=U.nextSibling,Ve=Be.nextSibling,He=Ve.nextSibling,Ue=He.nextSibling,W=Ue.nextSibling,We=W.nextSibling,Ge=We.nextSibling;return d(n,`id`,`a-${e}`),d(r,`fill`,`url(#a-${e})`),d(a,`id`,`am-${e}`),d(o,`id`,`b-${e}`),d(s,`filter`,`url(#am-${e})`),d(c,`mask`,`url(#b-${e})`),d(u,`id`,`ah-${e}`),d(f,`id`,`k-${e}`),d(p,`filter`,`url(#ah-${e})`),d(m,`mask`,`url(#k-${e})`),d(g,`id`,`ae-${e}`),d(_,`id`,`j-${e}`),d(v,`filter`,`url(#ae-${e})`),d(y,`mask`,`url(#j-${e})`),d(x,`id`,`ai-${e}`),d(S,`id`,`i-${e}`),d(C,`filter`,`url(#ai-${e})`),d(w,`mask`,`url(#i-${e})`),d(ee,`id`,`aj-${e}`),d(E,`id`,`h-${e}`),d(D,`filter`,`url(#aj-${e})`),d(te,`mask`,`url(#h-${e})`),d(ne,`id`,`ag-${e}`),d(k,`id`,`g-${e}`),d(re,`filter`,`url(#ag-${e})`),d(A,`mask`,`url(#g-${e})`),d(M,`id`,`af-${e}`),d(N,`id`,`f-${e}`),d(ie,`filter`,`url(#af-${e})`),d(P,`mask`,`url(#f-${e})`),d(F,`id`,`m-${e}`),d(I,`fill`,`url(#m-${e})`),d(R,`id`,`ak-${e}`),d(ae,`id`,`e-${e}`),d(z,`filter`,`url(#ak-${e})`),d(B,`mask`,`url(#e-${e})`),d(oe,`id`,`n-${e}`),d(se,`fill`,`url(#n-${e})`),d(ce,`id`,`r-${e}`),d(le,`fill`,`url(#r-${e})`),d(ue,`id`,`s-${e}`),d(de,`fill`,`url(#s-${e})`),d(V,`id`,`q-${e}`),d(fe,`fill`,`url(#q-${e})`),d(pe,`id`,`p-${e}`),d(me,`fill`,`url(#p-${e})`),d(he,`id`,`o-${e}`),d(ge,`fill`,`url(#o-${e})`),d(_e,`id`,`l-${e}`),d(ve,`fill`,`url(#l-${e})`),d(be,`id`,`al-${e}`),d(xe,`id`,`d-${e}`),d(Se,`filter`,`url(#al-${e})`),d(Ce,`mask`,`url(#d-${e})`),d(we,`id`,`u-${e}`),d(Te,`fill`,`url(#u-${e})`),d(De,`id`,`ad-${e}`),d(Oe,`id`,`c-${e}`),d(ke,`filter`,`url(#ad-${e})`),d(Ae,`mask`,`url(#c-${e})`),d(je,`id`,`t-${e}`),d(Me,`fill`,`url(#t-${e})`),d(Ne,`id`,`v-${e}`),d(Pe,`stroke`,`url(#v-${e})`),d(H,`id`,`aa-${e}`),d(Fe,`stroke`,`url(#aa-${e})`),d(Ie,`id`,`w-${e}`),d(Le,`stroke`,`url(#w-${e})`),d(Re,`id`,`ac-${e}`),d(ze,`stroke`,`url(#ac-${e})`),d(U,`id`,`ab-${e}`),d(Be,`stroke`,`url(#ab-${e})`),d(Ve,`id`,`y-${e}`),d(He,`stroke`,`url(#y-${e})`),d(Ue,`id`,`x-${e}`),d(W,`stroke`,`url(#x-${e})`),d(We,`id`,`z-${e}`),d(Ge,`stroke`,`url(#z-${e})`),t})()}var Zc=b(`<span><svg width=16 height=16 viewBox="0 0 16 16"fill=none xmlns=http://www.w3.org/2000/svg><path d="M6 12L10 8L6 4"stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),Qc=b(`<button title="Copy object to clipboard">`),$c=b(`<button title="Remove all items"aria-label="Remove all items">`),el=b(`<button title="Delete item"aria-label="Delete item">`),tl=b(`<button title="Toggle value"aria-label="Toggle value">`),nl=b(`<button title="Bulk Edit Data"aria-label="Bulk Edit Data">`),rl=b(`<div>`),il=b(`<div><button> <span></span> <span> `),al=b(`<input>`),ol=b(`<span>`),sl=b(`<div><label>:`),cl=b(`<div><div><button> [<!>...<!>]`);function ll(e,t){let n=0,r=[];for(;n<e.length;)r.push(e.slice(n,n+t)),n+=t;return r}var ul=e=>{let t=U(),n=H().shadowDOMTarget?G.bind({target:H().shadowDOMTarget}):G,r=N(()=>t()===`dark`?yl(n):vl(n));return(()=>{var t=Zc();return k(()=>R(t,K(r().expander,n`
          transform: rotate(${e.expanded?90:0}deg);
        `,e.expanded&&n`
            & svg {
              top: -1px;
            }
          `))),t})()},dl=e=>{let t=U(),n=H().shadowDOMTarget?G.bind({target:H().shadowDOMTarget}):G,r=N(()=>t()===`dark`?yl(n):vl(n)),[i,a]=w(`NoCopy`);return(()=>{var n=Qc();return T(n,`click`,i()===`NoCopy`?()=>{navigator.clipboard.writeText(s(e.value)).then(()=>{a(`SuccessCopy`),setTimeout(()=>{a(`NoCopy`)},1500)},e=>{a(`ErrorCopy`),setTimeout(()=>{a(`NoCopy`)},1500)})}:void 0,!0),j(n,z(re,{get children(){return[z(ae,{get when(){return i()===`NoCopy`},get children(){return z(Bc,{})}}),z(ae,{get when(){return i()===`SuccessCopy`},get children(){return z(Hc,{get theme(){return t()}})}}),z(ae,{get when(){return i()===`ErrorCopy`},get children(){return z(Uc,{})}})]}})),k(e=>{var t=r().actionButton,a=`${i()===`NoCopy`?`Copy object to clipboard`:i()===`SuccessCopy`?`Object copied to clipboard`:`Error copying object to clipboard`}`;return t!==e.e&&R(n,e.e=t),a!==e.t&&d(n,`aria-label`,e.t=a),e},{e:void 0,t:void 0}),n})()},fl=e=>{let t=U(),n=H().shadowDOMTarget?G.bind({target:H().shadowDOMTarget}):G,r=N(()=>t()===`dark`?yl(n):vl(n)),i=H().client;return(()=>{var t=$c();return t.$$click=()=>{let t=e.activeQuery.state.data,n=o(t,e.dataPath,[]);i.setQueryData(e.activeQuery.queryKey,n)},j(t,z(Wc,{})),k(()=>R(t,r().actionButton)),t})()},pl=e=>{let t=U(),n=H().shadowDOMTarget?G.bind({target:H().shadowDOMTarget}):G,r=N(()=>t()===`dark`?yl(n):vl(n)),i=H().client;return(()=>{var t=el();return t.$$click=()=>{let t=e.activeQuery.state.data,n=ee(t,e.dataPath);i.setQueryData(e.activeQuery.queryKey,n)},j(t,z(Dc,{})),k(()=>R(t,K(r().actionButton))),t})()},ml=e=>{let t=U(),n=H().shadowDOMTarget?G.bind({target:H().shadowDOMTarget}):G,r=N(()=>t()===`dark`?yl(n):vl(n)),i=H().client;return(()=>{var a=tl();return a.$$click=()=>{let t=e.activeQuery.state.data,n=o(t,e.dataPath,!e.value);i.setQueryData(e.activeQuery.queryKey,n)},j(a,z(Gc,{get theme(){return t()},get checked(){return e.value}})),k(()=>R(a,K(r().actionButton,n`
          width: ${Q.size[3.5]};
          height: ${Q.size[3.5]};
        `))),a})()};function hl(e){return Symbol.iterator in e}function gl(e){let n=U(),r=H().shadowDOMTarget?G.bind({target:H().shadowDOMTarget}):G,i=N(()=>n()===`dark`?yl(r):vl(r)),a=H().client,[s,l]=w((e.defaultExpanded||[]).includes(e.label)),u=()=>l(e=>!e),[f,p]=w([]),m=N(()=>Array.isArray(e.value)?e.value.map((e,t)=>({label:t.toString(),value:e})):e.value!==null&&typeof e.value==`object`&&hl(e.value)&&typeof e.value[Symbol.iterator]==`function`?e.value instanceof Map?Array.from(e.value,([e,t])=>({label:e,value:t})):Array.from(e.value,(e,t)=>({label:t.toString(),value:e})):typeof e.value==`object`&&e.value!==null?Object.entries(e.value).map(([e,t])=>({label:e,value:t})):[]),h=N(()=>Array.isArray(e.value)?`array`:e.value!==null&&typeof e.value==`object`&&hl(e.value)&&typeof e.value[Symbol.iterator]==`function`?`Iterable`:typeof e.value==`object`&&e.value!==null?`object`:typeof e.value),g=N(()=>ll(m(),100)),_=e.dataPath??[],v=B();return(()=>{var n=rl();return j(n,z(L,{get when(){return g().length},get children(){return[(()=>{var n=il(),r=n.firstChild,a=r.firstChild,o=a.nextSibling,l=o.nextSibling.nextSibling,f=l.firstChild;return r.$$click=()=>u(),j(r,z(ul,{get expanded(){return s()}}),a),j(o,()=>e.label),j(l,()=>String(h()).toLowerCase()===`iterable`?`(Iterable) `:``,f),j(l,()=>m().length,f),j(l,()=>m().length>1?`items`:`item`,null),j(n,z(L,{get when(){return e.editable},get children(){var n=rl();return j(n,z(dl,{get value(){return e.value}}),null),j(n,z(L,{get when(){return t(()=>!!e.itemsDeletable)()&&e.activeQuery!==void 0},get children(){return z(pl,{get activeQuery(){return e.activeQuery},dataPath:_})}}),null),j(n,z(L,{get when(){return t(()=>h()===`array`)()&&e.activeQuery!==void 0},get children(){return z(fl,{get activeQuery(){return e.activeQuery},dataPath:_})}}),null),j(n,z(L,{get when(){return t(()=>!!e.onEdit)()&&!c(e.value).meta},get children(){var t=nl();return t.$$click=()=>{e.onEdit?.()},j(t,z(Vc,{})),k(()=>R(t,i().actionButton)),t}}),null),k(()=>R(n,i().actions)),n}}),null),k(e=>{var t=i().expanderButtonContainer,a=i().expanderButton,o=s()?`true`:`false`,c=i().info;return t!==e.e&&R(n,e.e=t),a!==e.t&&R(r,e.t=a),o!==e.a&&d(r,`aria-expanded`,e.a=o),c!==e.o&&R(l,e.o=c),e},{e:void 0,t:void 0,a:void 0,o:void 0}),n})(),z(L,{get when(){return s()},get children(){return[z(L,{get when(){return g().length===1},get children(){var t=rl();return j(t,z(Ct,{get each(){return m()},by:e=>e.label,children:t=>z(gl,{get defaultExpanded(){return e.defaultExpanded},get label(){return t().label},get value(){return t().value},get editable(){return e.editable},get dataPath(){return[..._,t().label]},get activeQuery(){return e.activeQuery},get itemsDeletable(){return h()===`array`||h()===`Iterable`||h()===`object`}})})),k(()=>R(t,i().subEntry)),t}}),z(L,{get when(){return g().length>1},get children(){var t=rl();return j(t,z(te,{get each(){return g()},children:(t,n)=>(()=>{var r=cl(),a=r.firstChild,o=a.firstChild,s=o.firstChild,c=s.nextSibling,l=c.nextSibling.nextSibling;return l.nextSibling,o.$$click=()=>p(e=>e.includes(n)?e.filter(e=>e!==n):[...e,n]),j(o,z(ul,{get expanded(){return f().includes(n)}}),s),j(o,n*100,c),j(o,n*100+100-1,l),j(a,z(L,{get when(){return f().includes(n)},get children(){var n=rl();return j(n,z(Ct,{get each(){return t()},by:e=>e.label,children:t=>z(gl,{get defaultExpanded(){return e.defaultExpanded},get label(){return t().label},get value(){return t().value},get editable(){return e.editable},get dataPath(){return[..._,t().label]},get activeQuery(){return e.activeQuery}})})),k(()=>R(n,i().subEntry)),n}}),null),k(e=>{var t=i().entry,n=i().expanderButton;return t!==e.e&&R(a,e.e=t),n!==e.t&&R(o,e.t=n),e},{e:void 0,t:void 0}),r})()})),k(()=>R(t,i().subEntry)),t}})]}})]}}),null),j(n,z(L,{get when(){return g().length===0},get children(){var n=sl(),r=n.firstChild,s=r.firstChild;return d(r,`for`,v),j(r,()=>e.label,s),j(n,z(L,{get when(){return t(()=>!!(e.editable&&e.activeQuery!==void 0))()&&(h()===`string`||h()===`number`||h()===`boolean`)},get fallback(){return(()=>{var t=ol();return j(t,()=>oe(e.value)),k(()=>R(t,i().value)),t})()},get children(){return[z(L,{get when(){return t(()=>!!(e.editable&&e.activeQuery!==void 0))()&&(h()===`string`||h()===`number`)},get children(){var t=al();return t.addEventListener(`change`,t=>{let n=e.activeQuery.state.data,r=o(n,_,h()===`number`?t.target.valueAsNumber:t.target.value);a.setQueryData(e.activeQuery.queryKey,r)}),d(t,`id`,v),k(e=>{var n=h()===`number`?`number`:`text`,r=K(i().value,i().editableInput);return n!==e.e&&d(t,`type`,e.e=n),r!==e.t&&R(t,e.t=r),e},{e:void 0,t:void 0}),k(()=>t.value=e.value),t}}),z(L,{get when(){return h()===`boolean`},get children(){var t=ol();return j(t,z(ml,{get activeQuery(){return e.activeQuery},dataPath:_,get value(){return e.value}}),null),j(t,()=>oe(e.value),null),k(()=>R(t,K(i().value,i().actions,i().editableInput))),t}})]}}),null),j(n,z(L,{get when(){return t(()=>!!(e.editable&&e.itemsDeletable))()&&e.activeQuery!==void 0},get children(){return z(pl,{get activeQuery(){return e.activeQuery},dataPath:_})}}),null),k(e=>{var t=i().row,a=i().label;return t!==e.e&&R(n,e.e=t),a!==e.t&&R(r,e.t=a),e},{e:void 0,t:void 0}),n}}),null),k(()=>R(n,i().entry)),n})()}var _l=(e,t)=>{let{colors:n,font:r,size:i,border:a}=Q,o=(t,n)=>e===`light`?t:n;return{entry:t`
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
    `}},vl=e=>_l(`light`,e),yl=e=>_l(`dark`,e);se([`click`]);var bl=b(`<div><div aria-hidden=true></div><button type=button aria-label="Open Tanstack query devtools"class=tsqd-open-btn>`),xl=b(`<div>`),Sl=b(`<div style=--tsqd-font-size:16px;max-height:100vh;height:100vh;width:100vw>`),Cl=b(`<div style=--tsqd-font-size:16px>`),wl=b(`<aside aria-label="Tanstack query devtools"><div role=separator aria-label="Resize devtools panel"tabindex=0></div><button aria-label="Close tanstack query devtools">`),Tl=b(`<select name=tsqd-queries-filter-sort aria-label="Sort queries by">`),El=b(`<select name=tsqd-mutations-filter-sort aria-label="Sort mutations by">`),Dl=b(`<span>Asc`),Ol=b(`<span>Desc`),kl=b(`<button aria-label="Open in picture-in-picture mode"title="Open in picture-in-picture mode">`),Al=b(`<div>Settings`),jl=b(`<span>Position`),Ml=b(`<span>Top`),Nl=b(`<span>Bottom`),Pl=b(`<span>Left`),Fl=b(`<span>Right`),Il=b(`<span>Theme`),Ll=b(`<span>Light`),Rl=b(`<span>Dark`),zl=b(`<span>System`),Bl=b(`<span>Disabled Queries`),Vl=b(`<span>Show`),Hl=b(`<span>Hide`),Ul=b(`<div><div class=tsqd-queries-container>`),Wl=b(`<div><div class=tsqd-mutations-container>`),Gl=b(`<div><div><div><button aria-label="Close Tanstack query devtools"><span>TANSTACK</span><span> v</span></button></div></div><div><div><div><input aria-label="Filter queries by query key"type=text placeholder=Filter name=tsqd-query-filter-input></div><div></div><button class=tsqd-query-filter-sort-order-btn></button></div><div><button aria-label="Clear query cache"></button><button>`),Kl=b(`<option>Sort by `),ql=b(`<div class=tsqd-query-disabled-indicator aria-hidden=true>disabled`),Jl=b(`<div class=tsqd-query-static-indicator aria-hidden=true>static`),Yl=b(`<button><div></div><code class=tsqd-query-hash>`),Xl=b(`<div role=tooltip id=tsqd-status-tooltip>`),Zl=b(`<span>`),Ql=b(`<button><span aria-hidden=true></span><span>`),$l=b(`<button><span aria-hidden=true></span> Error`),eu=b(`<div><span aria-hidden=true></span>Trigger Error<select aria-label="Select error type to trigger"><option value disabled selected>`),tu=b(`<div class="tsqd-query-details-explorer-container tsqd-query-details-data-explorer">`),nu=b(`<form><textarea name=data aria-label="Edit query data as JSON"></textarea><div><span></span><div><button type=button>Cancel</button><button>Save`),ru=b(`<div><div role=heading aria-level=2>Query Details</div><div><div class=tsqd-query-details-summary><pre><code></code></pre><span role=status aria-live=polite></span></div><div class=tsqd-query-details-observers-count><span>Observers:</span><span></span></div><div class=tsqd-query-details-last-updated><span>Last Updated:</span><span></span></div></div><div role=heading aria-level=2>Actions</div><div><button><span aria-hidden=true></span>Refetch</button><button><span aria-hidden=true></span>Invalidate</button><button><span aria-hidden=true></span>Reset</button><button><span aria-hidden=true></span>Remove</button><button><span aria-hidden=true></span> Loading</button></div><div role=heading aria-level=2>Data </div><div role=heading aria-level=2>Query Explorer</div><div class="tsqd-query-details-explorer-container tsqd-query-details-query-explorer">`),iu=b(`<option>`),au=b(`<div><div role=heading aria-level=2>Mutation Details</div><div><div class=tsqd-query-details-summary><pre><code></code></pre><span role=status aria-live=polite></span></div><div class=tsqd-query-details-last-updated><span>Submitted At:</span><span></span></div></div><div role=heading aria-level=2>Variables Details</div><div class="tsqd-query-details-explorer-container tsqd-query-details-query-explorer"></div><div role=heading aria-level=2>Context Details</div><div class="tsqd-query-details-explorer-container tsqd-query-details-query-explorer"></div><div role=heading aria-level=2>Data Explorer</div><div class="tsqd-query-details-explorer-container tsqd-query-details-query-explorer"></div><div role=heading aria-level=2>Mutations Explorer</div><div class="tsqd-query-details-explorer-container tsqd-query-details-query-explorer">`),[ou,su]=w(null),[cu,lu]=w(null),[uu,du]=w(0),[fu,pu]=w(!1),mu=e=>{let n=U(),r=H().shadowDOMTarget?G.bind({target:H().shadowDOMTarget}):G,i=N(()=>n()===`dark`?Fu(r):Pu(r)),o=N(()=>H().onlineManager);a(()=>{let e=o().subscribe(e=>{pu(!e)});h(()=>{e()})});let s=Re(),c=N(()=>H().buttonPosition||we),l=N(()=>e.localStore.open===`true`?!0:e.localStore.open===`false`?!1:H().initialIsOpen||De),d=N(()=>e.localStore.position||H().position||Te),f;F(()=>{let t=f.parentElement,n=e.localStore.height||Oe,r=e.localStore.width||Ae,i=d();t.style.setProperty(`--tsqd-panel-height`,`${i===`top`?`-`:``}${n}px`),t.style.setProperty(`--tsqd-panel-width`,`${i===`left`?`-`:``}${r}px`)}),a(()=>{let e=()=>{let e=f.parentElement,t=getComputedStyle(e).fontSize;e.style.setProperty(`--tsqd-font-size`,t)};e(),window.addEventListener(`focus`,e),h(()=>{window.removeEventListener(`focus`,e)})});let p=N(()=>e.localStore.pip_open??`false`);return[z(L,{get when(){return t(()=>!!s().pipWindow)()&&p()==`true`},get children(){return z(ie,{get mount(){return s().pipWindow?.document.body},get children(){return z(hu,{get children(){return z(vu,e)}})}})}}),(()=>{var n=xl(),a=f;return typeof a==`function`?u(a,n):f=n,j(n,z(yt,{name:`tsqd-panel-transition`,get children(){return z(L,{get when(){return t(()=>!(!l()||s().pipWindow))()&&p()==`false`},get children(){return z(_u,{get localStore(){return e.localStore},get setLocalStore(){return e.setLocalStore}})}})}}),null),j(n,z(yt,{name:`tsqd-button-transition`,get children(){return z(L,{get when(){return!l()},get children(){var t=bl(),n=t.firstChild,r=n.nextSibling;return j(n,z(Xc,{})),r.$$click=()=>e.setLocalStore(`open`,`true`),j(r,z(Xc,{})),k(()=>R(t,K(i().devtoolsBtn,i()[`devtoolsBtn-position-${c()}`],`tsqd-open-btn-container`))),t}})}}),null),k(()=>R(n,K(r`
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
              transform: ${c()===`relative`?`none;`:c()===`top-left`?`translateX(-72px);`:c()===`top-right`?`translateX(72px);`:`translateY(72px);`};
              opacity: 0;
            }
          `,`tsqd-transitions-container`))),n})()]},hu=e=>{let t=Re(),n=U(),r=H().shadowDOMTarget?G.bind({target:H().shadowDOMTarget}):G,i=N(()=>n()===`dark`?Fu(r):Pu(r)),a=()=>{let{colors:e}=Q,t=(e,t)=>n()===`dark`?t:e;return uu()<Se?r`
        flex-direction: column;
        background-color: ${t(e.gray[300],e.gray[600])};
      `:r`
      flex-direction: row;
      background-color: ${t(e.gray[200],e.darkGray[900])};
    `};return F(()=>{let e=t().pipWindow,n=()=>{e&&du(e.innerWidth)};e&&(e.addEventListener(`resize`,n),n()),h(()=>{e&&e.removeEventListener(`resize`,n)})}),(()=>{var t=Sl();return j(t,()=>e.children),k(()=>R(t,K(i().panel,a(),{[r`
            min-width: min-content;
          `]:uu()<Ce},`tsqd-main-panel`))),t})()},gu=e=>{let t=U(),n=H().shadowDOMTarget?G.bind({target:H().shadowDOMTarget}):G,r=N(()=>t()===`dark`?Fu(n):Pu(n)),i;a(()=>{Dt(i,({width:e},t)=>{t===i&&du(e)})});let o=()=>{let{colors:e}=Q,r=(e,n)=>t()===`dark`?n:e;return uu()<Se?n`
        flex-direction: column;
        background-color: ${r(e.gray[300],e.gray[600])};
      `:n`
      flex-direction: row;
      background-color: ${r(e.gray[200],e.darkGray[900])};
    `};return(()=>{var t=Cl(),a=i;return typeof a==`function`?u(a,t):i=t,j(t,()=>e.children),k(()=>R(t,K(r().parentPanel,o(),{[n`
            min-width: min-content;
          `]:uu()<Ce},`tsqd-main-panel`))),t})()},_u=e=>{let t=U(),n=H().shadowDOMTarget?G.bind({target:H().shadowDOMTarget}):G,r=N(()=>t()===`dark`?Fu(n):Pu(n)),i;a(()=>{i.focus()});let[o,s]=w(!1),c=N(()=>e.localStore.position||H().position||Te),l=t=>{let n=t.currentTarget.parentElement;if(!n)return;s(!0);let{height:r,width:i}=n.getBoundingClientRect(),a=t.clientX,l=t.clientY,u=0,d=M(3.5),f=M(12),p=t=>{if(t.preventDefault(),c()===`left`||c()===`right`){let r=c()===`right`?a-t.clientX:t.clientX-a;u=Math.round(i+r),u<f&&(u=f),e.setLocalStore(`width`,String(Math.round(u)));let o=n.getBoundingClientRect().width;Number(e.localStore.width)<o&&e.setLocalStore(`width`,String(o))}else{let n=c()===`bottom`?l-t.clientY:t.clientY-l;u=Math.round(r+n),u<d&&(u=d,su(null)),e.setLocalStore(`height`,String(Math.round(u)))}},m=()=>{o()&&s(!1),document.removeEventListener(`mousemove`,p,!1),document.removeEventListener(`mouseup`,m,!1)};document.addEventListener(`mousemove`,p,!1),document.addEventListener(`mouseup`,m,!1)},f;a(()=>{Dt(f,({width:e},t)=>{t===f&&du(e)})}),F(()=>{let t=f.parentElement?.parentElement?.parentElement;if(!t)return;let n=e.localStore.position||Te,r=m(`padding`,n),i=e.localStore.position===`left`||e.localStore.position===`right`,a=(({padding:e,paddingTop:t,paddingBottom:n,paddingLeft:r,paddingRight:i})=>({padding:e,paddingTop:t,paddingBottom:n,paddingLeft:r,paddingRight:i}))(t.style);t.style[r]=`${i?e.localStore.width:e.localStore.height}px`,h(()=>{Object.entries(a).forEach(([e,n])=>{t.style[e]=n})})});let p=()=>{let{colors:e}=Q,r=(e,n)=>t()===`dark`?n:e;return uu()<Se?n`
        flex-direction: column;
        background-color: ${r(e.gray[300],e.gray[600])};
      `:n`
      flex-direction: row;
      background-color: ${r(e.gray[200],e.darkGray[900])};
    `};return(()=>{var t=wl(),a=t.firstChild,o=a.nextSibling,s=f;typeof s==`function`?u(s,t):f=t,a.$$keydown=t=>{let n=M(3.5),r=M(12);if(c()===`top`||c()===`bottom`){if(t.key===`ArrowUp`||t.key===`ArrowDown`){t.preventDefault();let r=Number(e.localStore.height||Oe),i=c()===`bottom`?t.key===`ArrowUp`?10:-10:t.key===`ArrowDown`?10:-10,a=Math.max(n,r+i);e.setLocalStore(`height`,String(a))}}else if(t.key===`ArrowLeft`||t.key===`ArrowRight`){t.preventDefault();let n=Number(e.localStore.width||Ae),i=c()===`right`?t.key===`ArrowLeft`?10:-10:t.key===`ArrowRight`?10:-10,a=Math.max(r,n+i);e.setLocalStore(`width`,String(a))}},a.$$mousedown=l,o.$$click=()=>e.setLocalStore(`open`,`false`);var m=i;return typeof m==`function`?u(m,o):i=o,j(o,z(Oc,{})),j(t,z(vu,e),null),k(i=>{var s=K(r().panel,r()[`panel-position-${c()}`],p(),{[n`
            min-width: min-content;
          `]:uu()<Ce&&(c()===`right`||c()===`left`)},`tsqd-main-panel`),l=c()===`bottom`||c()===`top`?`${e.localStore.height||Oe}px`:`auto`,u=c()===`right`||c()===`left`?`${e.localStore.width||Ae}px`:`auto`,f=c()===`top`||c()===`bottom`?`horizontal`:`vertical`,m=c()===`top`||c()===`bottom`?M(3.5):M(12),h=c()===`top`||c()===`bottom`?Number(e.localStore.height||Oe):Number(e.localStore.width||Ae),g=K(r().dragHandle,r()[`dragHandle-position-${c()}`],`tsqd-drag-handle`),v=K(r().closeBtn,r()[`closeBtn-position-${c()}`],`tsqd-minimize-btn`);return s!==i.e&&R(t,i.e=s),l!==i.t&&_(t,`height`,i.t=l),u!==i.a&&_(t,`width`,i.a=u),f!==i.o&&d(a,`aria-orientation`,i.o=f),m!==i.i&&d(a,`aria-valuemin`,i.i=m),h!==i.n&&d(a,`aria-valuenow`,i.n=h),g!==i.s&&R(a,i.s=g),v!==i.h&&R(o,i.h=v),i},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0,h:void 0}),t})()},vu=e=>{Du(),ku();let n,r=U(),i=H().shadowDOMTarget?G.bind({target:H().shadowDOMTarget}):G,a=N(()=>r()===`dark`?Fu(i):Pu(i)),o=Re(),[s,c]=w(`queries`),l=N(()=>e.localStore.sort||je),m=N(()=>Number(e.localStore.sortOrder)||Me),h=N(()=>e.localStore.mutationSort||Ne),g=N(()=>Number(e.localStore.mutationSortOrder)||Me),_=N(()=>ce[l()]),v=N(()=>f[h()]),y=N(()=>H().onlineManager),b=N(()=>H().client.getQueryCache()),x=N(()=>H().client.getMutationCache()),S=$(e=>e().getAll().length,!1),C=N(p(()=>[S(),e.localStore.filter,l(),m(),e.localStore.hideDisabledQueries],()=>{let t=b().getAll(),n=e.localStore.filter?t.filter(t=>We(t.queryHash,e.localStore.filter||``).passed):[...t];return e.localStore.hideDisabledQueries===`true`&&(n=n.filter(e=>!e.isDisabled())),_()?n.sort((e,t)=>_()(e,t)*m()):n})),T=Au(e=>e().getAll().length,!1),ee=N(p(()=>[T(),e.localStore.mutationFilter,h(),g()],()=>{let t=x().getAll(),n=e.localStore.mutationFilter?t.filter(t=>We(`${t.options.mutationKey?JSON.stringify(t.options.mutationKey)+` - `:``}${new Date(t.state.submittedAt).toLocaleString()}`,e.localStore.mutationFilter||``).passed):[...t];return v()?n.sort((e,t)=>v()(e,t)*g()):n})),E=t=>{e.setLocalStore(`position`,t)},D=e=>{let t=getComputedStyle(n).getPropertyValue(`--tsqd-font-size`);e.style.setProperty(`--tsqd-font-size`,t)};return[(()=>{var r=Gl(),p=r.firstChild,_=p.firstChild,v=_.firstChild,S=v.firstChild,w=S.nextSibling,T=w.firstChild,te=p.nextSibling,O=te.firstChild,ne=O.firstChild,re=ne.firstChild,A=ne.nextSibling,M=A.nextSibling,N=O.nextSibling,ie=N.firstChild,P=ie.nextSibling,F=n;return typeof F==`function`?u(F,r):n=r,v.$$click=()=>{!o().pipWindow&&!e.showPanelViewOnly?e.setLocalStore(`open`,`false`):e.onClose&&e.onClose()},j(w,()=>H().queryFlavor,T),j(w,()=>H().version,null),j(_,z(Ko.Root,{get class(){return K(a().viewToggle)},get value(){return s()},"aria-label":`Toggle between queries and mutations view`,onChange:e=>{c(e),su(null),lu(null)},get children(){return[z(Ko.Item,{value:`queries`,class:`tsqd-radio-toggle`,get children(){return[z(Ko.ItemInput,{}),z(Ko.ItemControl,{get children(){return z(Ko.ItemIndicator,{})}}),z(Ko.ItemLabel,{title:`Toggle Queries View`,children:`Queries`})]}}),z(Ko.Item,{value:`mutations`,class:`tsqd-radio-toggle`,get children(){return[z(Ko.ItemInput,{}),z(Ko.ItemControl,{get children(){return z(Ko.ItemIndicator,{})}}),z(Ko.ItemLabel,{title:`Toggle Mutations View`,children:`Mutations`})]}})]}}),null),j(p,z(L,{get when(){return s()===`queries`},get children(){return z(xu,{})}}),null),j(p,z(L,{get when(){return s()===`mutations`},get children(){return z(Su,{})}}),null),j(ne,z(Ec,{}),re),re.$$input=t=>{s()===`queries`?e.setLocalStore(`filter`,t.currentTarget.value):e.setLocalStore(`mutationFilter`,t.currentTarget.value)},j(A,z(L,{get when(){return s()===`queries`},get children(){var t=Tl();return t.addEventListener(`change`,t=>{e.setLocalStore(`sort`,t.currentTarget.value)}),j(t,()=>Object.keys(ce).map(e=>(()=>{var t=Kl();return t.firstChild,t.value=e,j(t,e,null),t})())),k(()=>t.value=l()),t}}),null),j(A,z(L,{get when(){return s()===`mutations`},get children(){var t=El();return t.addEventListener(`change`,t=>{e.setLocalStore(`mutationSort`,t.currentTarget.value)}),j(t,()=>Object.keys(f).map(e=>(()=>{var t=Kl();return t.firstChild,t.value=e,j(t,e,null),t})())),k(()=>t.value=h()),t}}),null),j(A,z(Oc,{}),null),M.$$click=()=>{s()===`queries`?e.setLocalStore(`sortOrder`,String(m()*-1)):e.setLocalStore(`mutationSortOrder`,String(g()*-1))},j(M,z(L,{get when(){return(s()===`queries`?m():g())===1},get children(){return[Dl(),z(kc,{})]}}),null),j(M,z(L,{get when(){return(s()===`queries`?m():g())===-1},get children(){return[Ol(),z(Ac,{})]}}),null),ie.$$click=()=>{s()===`queries`?(Mu({type:`CLEAR_QUERY_CACHE`}),b().clear()):(Mu({type:`CLEAR_MUTATION_CACHE`}),x().clear())},j(ie,z(Dc,{})),P.$$click=()=>{y().setOnline(!y().isOnline())},j(P,(()=>{var e=t(()=>!!fu());return()=>e()?z(Lc,{}):z(Ic,{})})()),j(N,z(L,{get when(){return t(()=>!o().pipWindow)()&&!o().disabled},get children(){var t=kl();return t.$$click=()=>{o().requestPipWindow(Number(window.innerWidth),Number(e.localStore.height??500))},j(t,z(zc,{})),k(()=>R(t,K(a().actionsBtn,`tsqd-actions-btn`,`tsqd-action-open-pip`))),t}}),null),j(N,z(Z.Root,{gutter:4,get children(){return[z(Z.Trigger,{get class(){return K(a().actionsBtn,`tsqd-actions-btn`,`tsqd-action-settings`)},"aria-label":`Open settings menu`,title:`Open settings menu`,get children(){return z(Rc,{})}}),z(Z.Portal,{ref:e=>D(e),get mount(){return t(()=>!!o().pipWindow)()?o().pipWindow.document.body:document.body},get children(){return z(Z.Content,{get class(){return K(a().settingsMenu,`tsqd-settings-menu`)},get children(){return[(()=>{var e=Al();return k(()=>R(e,K(a().settingsMenuHeader,`tsqd-settings-menu-header`))),e})(),z(L,{get when(){return!e.showPanelViewOnly},get children(){return z(Z.Sub,{overlap:!0,gutter:8,shift:-4,get children(){return[z(Z.SubTrigger,{get class(){return K(a().settingsSubTrigger,`tsqd-settings-menu-sub-trigger`,`tsqd-settings-menu-sub-trigger-position`)},get children(){return[jl(),z(Oc,{})]}}),z(Z.Portal,{ref:e=>D(e),get mount(){return t(()=>!!o().pipWindow)()?o().pipWindow.document.body:document.body},get children(){return z(Z.SubContent,{get class(){return K(a().settingsMenu,`tsqd-settings-submenu`)},get children(){return z(Z.RadioGroup,{"aria-label":`Position settings`,get value(){return e.localStore.position},onChange:e=>E(e),get children(){return[z(Z.RadioItem,{value:`top`,get class(){return K(a().settingsSubButton,`tsqd-settings-menu-position-btn`,`tsqd-settings-menu-position-btn-top`)},get children(){return[Ml(),z(kc,{})]}}),z(Z.RadioItem,{value:`bottom`,get class(){return K(a().settingsSubButton,`tsqd-settings-menu-position-btn`,`tsqd-settings-menu-position-btn-bottom`)},get children(){return[Nl(),z(Ac,{})]}}),z(Z.RadioItem,{value:`left`,get class(){return K(a().settingsSubButton,`tsqd-settings-menu-position-btn`,`tsqd-settings-menu-position-btn-left`)},get children(){return[Pl(),z(jc,{})]}}),z(Z.RadioItem,{value:`right`,get class(){return K(a().settingsSubButton,`tsqd-settings-menu-position-btn`,`tsqd-settings-menu-position-btn-right`)},get children(){return[Fl(),z(Mc,{})]}})]}})}})}})]}})}}),z(Z.Sub,{overlap:!0,gutter:8,shift:-4,get children(){return[z(Z.SubTrigger,{get class(){return K(a().settingsSubTrigger,`tsqd-settings-menu-sub-trigger`,`tsqd-settings-menu-sub-trigger-position`)},get children(){return[Il(),z(Oc,{})]}}),z(Z.Portal,{ref:e=>D(e),get mount(){return t(()=>!!o().pipWindow)()?o().pipWindow.document.body:document.body},get children(){return z(Z.SubContent,{get class(){return K(a().settingsMenu,`tsqd-settings-submenu`)},get children(){return z(Z.RadioGroup,{get value(){return e.localStore.theme_preference},onChange:t=>{e.setLocalStore(`theme_preference`,t)},"aria-label":`Theme preference`,get children(){return[z(Z.RadioItem,{value:`light`,get class(){return K(a().settingsSubButton,`tsqd-settings-menu-position-btn`,`tsqd-settings-menu-position-btn-top`)},get children(){return[Ll(),z(Nc,{})]}}),z(Z.RadioItem,{value:`dark`,get class(){return K(a().settingsSubButton,`tsqd-settings-menu-position-btn`,`tsqd-settings-menu-position-btn-bottom`)},get children(){return[Rl(),z(Pc,{})]}}),z(Z.RadioItem,{value:`system`,get class(){return K(a().settingsSubButton,`tsqd-settings-menu-position-btn`,`tsqd-settings-menu-position-btn-left`)},get children(){return[zl(),z(Fc,{})]}})]}})}})}})]}}),z(Z.Sub,{overlap:!0,gutter:8,shift:-4,get children(){return[z(Z.SubTrigger,{get class(){return K(a().settingsSubTrigger,`tsqd-settings-menu-sub-trigger`,`tsqd-settings-menu-sub-trigger-disabled-queries`)},get children(){return[Bl(),z(Oc,{})]}}),z(Z.Portal,{ref:e=>D(e),get mount(){return t(()=>!!o().pipWindow)()?o().pipWindow.document.body:document.body},get children(){return z(Z.SubContent,{get class(){return K(a().settingsMenu,`tsqd-settings-submenu`)},get children(){return z(Z.RadioGroup,{get value(){return e.localStore.hideDisabledQueries},"aria-label":`Hide disabled queries setting`,onChange:t=>e.setLocalStore(`hideDisabledQueries`,t),get children(){return[z(Z.RadioItem,{value:`false`,get class(){return K(a().settingsSubButton,`tsqd-settings-menu-position-btn`,`tsqd-settings-menu-position-btn-show`)},get children(){return[Vl(),z(L,{get when(){return e.localStore.hideDisabledQueries!==`true`},get children(){return z(Kc,{})}})]}}),z(Z.RadioItem,{value:`true`,get class(){return K(a().settingsSubButton,`tsqd-settings-menu-position-btn`,`tsqd-settings-menu-position-btn-hide`)},get children(){return[Hl(),z(L,{get when(){return e.localStore.hideDisabledQueries===`true`},get children(){return z(Kc,{})}})]}})]}})}})}})]}})]}})}})]}}),null),j(r,z(L,{get when(){return s()===`queries`},get children(){var e=Ul(),t=e.firstChild;return j(t,z(Ct,{by:e=>e.queryHash,get each(){return C()},children:e=>z(yu,{get query(){return e()}})})),k(()=>R(e,K(a().overflowQueryContainer,`tsqd-queries-overflow-container`))),e}}),null),j(r,z(L,{get when(){return s()===`mutations`},get children(){var e=Wl(),t=e.firstChild;return j(t,z(Ct,{by:e=>e.mutationId,get each(){return ee()},children:e=>z(bu,{get mutation(){return e()}})})),k(()=>R(e,K(a().overflowQueryContainer,`tsqd-mutations-overflow-container`))),e}}),null),k(e=>{var t=K(a().queriesContainer,uu()<Se&&(ou()||cu())&&i`
              height: 50%;
              max-height: 50%;
            `,uu()<Se&&!(ou()||cu())&&i`
              height: 100%;
              max-height: 100%;
            `,`tsqd-queries-container`),n=K(a().row,`tsqd-header`),o=a().logoAndToggleContainer,c=K(a().logo,`tsqd-text-logo-container`),l=K(a().tanstackLogo,`tsqd-text-logo-tanstack`),u=K(a().queryFlavorLogo,`tsqd-text-logo-query-flavor`),f=K(a().row,`tsqd-filters-actions-container`),h=K(a().filtersContainer,`tsqd-filters-container`),y=K(a().filterInput,`tsqd-query-filter-textfield-container`),b=K(`tsqd-query-filter-textfield`),x=K(a().filterSelect,`tsqd-query-filter-sort-container`),C=`Sort order ${(s()===`queries`?m():g())===-1?`descending`:`ascending`}`,T=(s()===`queries`?m():g())===-1,ee=K(a().actionsContainer,`tsqd-actions-container`),E=K(a().actionsBtn,`tsqd-actions-btn`,`tsqd-action-clear-cache`),D=`Clear ${s()} cache`,k=K(a().actionsBtn,fu()&&a().actionsBtnOffline,`tsqd-actions-btn`,`tsqd-action-mock-offline-behavior`),j=`${fu()?`Unset offline mocking behavior`:`Mock offline behavior`}`,F=fu(),I=`${fu()?`Unset offline mocking behavior`:`Mock offline behavior`}`;return t!==e.e&&R(r,e.e=t),n!==e.t&&R(p,e.t=n),o!==e.a&&R(_,e.a=o),c!==e.o&&R(v,e.o=c),l!==e.i&&R(S,e.i=l),u!==e.n&&R(w,e.n=u),f!==e.s&&R(te,e.s=f),h!==e.h&&R(O,e.h=h),y!==e.r&&R(ne,e.r=y),b!==e.d&&R(re,e.d=b),x!==e.l&&R(A,e.l=x),C!==e.u&&d(M,`aria-label`,e.u=C),T!==e.c&&d(M,`aria-pressed`,e.c=T),ee!==e.w&&R(N,e.w=ee),E!==e.m&&R(ie,e.m=E),D!==e.f&&d(ie,`title`,e.f=D),k!==e.y&&R(P,e.y=k),j!==e.g&&d(P,`aria-label`,e.g=j),F!==e.p&&d(P,`aria-pressed`,e.p=F),I!==e.b&&d(P,`title`,e.b=I),e},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0,h:void 0,r:void 0,d:void 0,l:void 0,u:void 0,c:void 0,w:void 0,m:void 0,f:void 0,y:void 0,g:void 0,p:void 0,b:void 0}),k(()=>re.value=s()===`queries`?e.localStore.filter||``:e.localStore.mutationFilter||``),r})(),z(L,{get when(){return t(()=>s()===`queries`)()&&ou()},get children(){return z(wu,{})}}),z(L,{get when(){return t(()=>s()===`mutations`)()&&cu()},get children(){return z(Tu,{})}})]},yu=e=>{let t=U(),n=H().shadowDOMTarget?G.bind({target:H().shadowDOMTarget}):G,r=N(()=>t()===`dark`?Fu(n):Pu(n)),{colors:i,alpha:a}=Q,o=(e,n)=>t()===`dark`?n:e,s=$(t=>t().find({queryKey:e.query.queryKey})?.state,!0,t=>t.query.queryHash===e.query.queryHash),c=$(t=>t().find({queryKey:e.query.queryKey})?.isDisabled()??!1,!0,t=>t.query.queryHash===e.query.queryHash),l=$(t=>t().find({queryKey:e.query.queryKey})?.isStatic()??!1,!0,t=>t.query.queryHash===e.query.queryHash),u=$(t=>t().find({queryKey:e.query.queryKey})?.isStale()??!1,!0,t=>t.query.queryHash===e.query.queryHash),f=$(t=>t().find({queryKey:e.query.queryKey})?.getObserversCount()??0,!0,t=>t.query.queryHash===e.query.queryHash),p=N(()=>y({queryState:s(),observerCount:f(),isStale:u()})),m=()=>p()===`gray`?n`
        background-color: ${o(i[p()][200],i[p()][700])};
        color: ${o(i[p()][700],i[p()][300])};
      `:n`
      background-color: ${o(i[p()][200]+a[80],i[p()][900])};
      color: ${o(i[p()][800],i[p()][300])};
    `;return z(L,{get when(){return s()},get children(){var t=Yl(),n=t.firstChild,i=n.nextSibling;return t.$$click=()=>su(e.query.queryHash===ou()?null:e.query.queryHash),j(n,f),j(i,()=>e.query.queryHash),j(t,z(L,{get when(){return c()},get children(){return ql()}}),null),j(t,z(L,{get when(){return l()},get children(){return Jl()}}),null),k(i=>{var a=K(r().queryRow,ou()===e.query.queryHash&&r().selectedQueryRow,`tsqd-query-row`),o=`Query key ${e.query.queryHash}${c()?`, disabled`:``}${l()?`, static`:``}`,s=K(m(),`tsqd-query-observer-count`);return a!==i.e&&R(t,i.e=a),o!==i.t&&d(t,`aria-label`,i.t=o),s!==i.a&&R(n,i.a=s),i},{e:void 0,t:void 0,a:void 0}),t}})},bu=e=>{let n=U(),r=H().shadowDOMTarget?G.bind({target:H().shadowDOMTarget}):G,i=N(()=>n()===`dark`?Fu(r):Pu(r)),{colors:a,alpha:o}=Q,s=(e,t)=>n()===`dark`?t:e,c=Au(t=>t().getAll().find(t=>t.mutationId===e.mutation.mutationId)?.state),l=Au(t=>{let n=t().getAll().find(t=>t.mutationId===e.mutation.mutationId);return n?n.state.isPaused:!1}),u=Au(t=>{let n=t().getAll().find(t=>t.mutationId===e.mutation.mutationId);return n?n.state.status:`idle`}),f=N(()=>v({isPaused:l(),status:u()})),p=()=>f()===`gray`?r`
        background-color: ${s(a[f()][200],a[f()][700])};
        color: ${s(a[f()][700],a[f()][300])};
      `:r`
      background-color: ${s(a[f()][200]+o[80],a[f()][900])};
      color: ${s(a[f()][800],a[f()][300])};
    `;return z(L,{get when(){return c()},get children(){var n=Yl(),r=n.firstChild,a=r.nextSibling;return n.$$click=()=>{lu(e.mutation.mutationId===cu()?null:e.mutation.mutationId)},j(r,z(L,{get when(){return f()===`purple`},get children(){return z(Yc,{})}}),null),j(r,z(L,{get when(){return f()===`green`},get children(){return z(Kc,{})}}),null),j(r,z(L,{get when(){return f()===`red`},get children(){return z(Jc,{})}}),null),j(r,z(L,{get when(){return f()===`yellow`},get children(){return z(qc,{})}}),null),j(a,z(L,{get when(){return e.mutation.options.mutationKey},get children(){return[t(()=>JSON.stringify(e.mutation.options.mutationKey)),` -`,` `]}}),null),j(a,()=>new Date(e.mutation.state.submittedAt).toLocaleString(),null),k(t=>{var a=K(i().queryRow,cu()===e.mutation.mutationId&&i().selectedQueryRow,`tsqd-query-row`),o=`Mutation submitted at ${new Date(e.mutation.state.submittedAt).toLocaleString()}`,s=K(p(),`tsqd-query-observer-count`);return a!==t.e&&R(n,t.e=a),o!==t.t&&d(n,`aria-label`,t.t=o),s!==t.a&&R(r,t.a=s),t},{e:void 0,t:void 0,a:void 0}),n}})},xu=()=>{let e=$(e=>e().getAll().filter(e=>r(e)===`stale`).length),t=$(e=>e().getAll().filter(e=>r(e)===`fresh`).length),n=$(e=>e().getAll().filter(e=>r(e)===`fetching`).length),i=$(e=>e().getAll().filter(e=>r(e)===`paused`).length),a=$(e=>e().getAll().filter(e=>r(e)===`inactive`).length),o=U(),s=H().shadowDOMTarget?G.bind({target:H().shadowDOMTarget}):G,c=N(()=>o()===`dark`?Fu(s):Pu(s));return(()=>{var r=xl();return j(r,z(Cu,{label:`Fresh`,color:`green`,get count(){return t()}}),null),j(r,z(Cu,{label:`Fetching`,color:`blue`,get count(){return n()}}),null),j(r,z(Cu,{label:`Paused`,color:`purple`,get count(){return i()}}),null),j(r,z(Cu,{label:`Stale`,color:`yellow`,get count(){return e()}}),null),j(r,z(Cu,{label:`Inactive`,color:`gray`,get count(){return a()}}),null),k(()=>R(r,K(c().queryStatusContainer,`tsqd-query-status-container`))),r})()},Su=()=>{let e=Au(e=>e().getAll().filter(e=>v({isPaused:e.state.isPaused,status:e.state.status})===`green`).length),t=Au(e=>e().getAll().filter(e=>v({isPaused:e.state.isPaused,status:e.state.status})===`yellow`).length),n=Au(e=>e().getAll().filter(e=>v({isPaused:e.state.isPaused,status:e.state.status})===`purple`).length),r=Au(e=>e().getAll().filter(e=>v({isPaused:e.state.isPaused,status:e.state.status})===`red`).length),i=U(),a=H().shadowDOMTarget?G.bind({target:H().shadowDOMTarget}):G,o=N(()=>i()===`dark`?Fu(a):Pu(a));return(()=>{var i=xl();return j(i,z(Cu,{label:`Paused`,color:`purple`,get count(){return n()}}),null),j(i,z(Cu,{label:`Pending`,color:`yellow`,get count(){return t()}}),null),j(i,z(Cu,{label:`Success`,color:`green`,get count(){return e()}}),null),j(i,z(Cu,{label:`Error`,color:`red`,get count(){return r()}}),null),k(()=>R(i,K(o().queryStatusContainer,`tsqd-query-status-container`))),i})()},Cu=e=>{let n=U(),r=H().shadowDOMTarget?G.bind({target:H().shadowDOMTarget}):G,i=N(()=>n()===`dark`?Fu(r):Pu(r)),{colors:a,alpha:o}=Q,s=(e,t)=>n()===`dark`?t:e,c,[l,d]=w(!1),[f,p]=w(!1),m=N(()=>!(ou()&&uu()<xe&&uu()>Se||uu()<Se));return(()=>{var n=Ql(),h=n.firstChild,g=h.nextSibling,_=c;return typeof _==`function`?u(_,n):c=n,n.addEventListener(`mouseleave`,()=>{d(!1),p(!1)}),n.addEventListener(`mouseenter`,()=>d(!0)),n.addEventListener(`blur`,()=>p(!1)),n.addEventListener(`focus`,()=>p(!0)),x(n,A({get disabled(){return m()},get"aria-label"(){return`${e.label}: ${e.count}`},get class(){return K(i().queryStatusTag,!m()&&r`
            cursor: pointer;
            &:hover {
              background: ${s(a.gray[200],a.darkGray[400])}${o[80]};
            }
          `,`tsqd-query-status-tag`,`tsqd-query-status-tag-${e.label.toLowerCase()}`)}},()=>l()||f()?{"aria-describedby":`tsqd-status-tooltip`}:{}),!1,!0),j(n,z(L,{get when(){return t(()=>!m())()&&(l()||f())},get children(){var t=Xl();return j(t,()=>e.label),k(()=>R(t,K(i().statusTooltip,`tsqd-query-status-tooltip`))),t}}),h),j(n,z(L,{get when(){return m()},get children(){var t=Zl();return j(t,()=>e.label),k(()=>R(t,K(i().queryStatusTagLabel,`tsqd-query-status-tag-label`))),t}}),g),j(g,()=>e.count),k(t=>{var n=K(r`
            width: ${Q.size[1.5]};
            height: ${Q.size[1.5]};
            border-radius: ${Q.border.radius.full};
            background-color: ${Q.colors[e.color][500]};
          `,`tsqd-query-status-tag-dot`),o=K(i().queryStatusCount,e.count>0&&e.color!==`gray`&&r`
              background-color: ${s(a[e.color][100],a[e.color][900])};
              color: ${s(a[e.color][700],a[e.color][300])};
            `,`tsqd-query-status-tag-count`);return n!==t.e&&R(h,t.e=n),o!==t.t&&R(g,t.t=o),t},{e:void 0,t:void 0}),n})()},wu=()=>{let n=U(),a=H().shadowDOMTarget?G.bind({target:H().shadowDOMTarget}):G,o=N(()=>n()===`dark`?Fu(a):Pu(a)),{colors:s}=Q,c=(e,t)=>n()===`dark`?t:e,l=H().client,[u,f]=w(!1),[p,m]=w(`view`),[h,g]=w(!1),v=N(()=>H().errorTypes||[]),y=$(e=>e().getAll().find(e=>e.queryHash===ou()),!1),b=$(e=>e().getAll().find(e=>e.queryHash===ou()),!1),x=$(e=>e().getAll().find(e=>e.queryHash===ou())?.state,!1),S=$(e=>e().getAll().find(e=>e.queryHash===ou())?.state.data,!1),C=$(e=>{let t=e().getAll().find(e=>e.queryHash===ou());return t?r(t):`inactive`}),T=$(e=>{let t=e().getAll().find(e=>e.queryHash===ou());return t?t.state.status:`pending`}),ee=$(e=>e().getAll().find(e=>e.queryHash===ou())?.getObserversCount()??0),E=N(()=>i(C())),D=()=>{Mu({type:`REFETCH`,queryHash:y()?.queryHash}),(y()?.fetch())?.catch(()=>{})},te=e=>{let t=y();if(!t)return;Mu({type:`TRIGGER_ERROR`,queryHash:t.queryHash,metadata:{error:e?.name}});let n=e?.initializer(t)??Error(`Unknown error from devtools`),r=t.options;t.setState({data:void 0,status:`error`,error:n,fetchMeta:{...t.state.fetchMeta,__previousQueryOptions:r}})},O=()=>{let e=y();if(!e)return;Mu({type:`RESTORE_LOADING`,queryHash:e.queryHash});let t=e.state,n=e.state.fetchMeta?e.state.fetchMeta.__previousQueryOptions:null;e.cancel({silent:!0}),e.setState({...t,fetchStatus:`idle`,fetchMeta:null}),n&&e.fetch(n)};F(()=>{C()!==`fetching`&&f(!1)});let ne=()=>E()===`gray`?a`
        background-color: ${c(s[E()][200],s[E()][700])};
        color: ${c(s[E()][700],s[E()][300])};
        border-color: ${c(s[E()][400],s[E()][600])};
      `:a`
      background-color: ${c(s[E()][100],s[E()][900])};
      color: ${c(s[E()][700],s[E()][300])};
      border-color: ${c(s[E()][400],s[E()][600])};
    `;return z(L,{get when(){return t(()=>!!y())()&&x()},get children(){var t=ru(),n=t.firstChild,r=n.nextSibling,i=r.firstChild,w=i.firstChild,E=w.firstChild,re=w.nextSibling,A=i.nextSibling,M=A.firstChild.nextSibling,N=A.nextSibling.firstChild.nextSibling,ie=r.nextSibling,P=ie.nextSibling,F=P.firstChild,I=F.firstChild,ae=F.nextSibling,B=ae.firstChild,se=ae.nextSibling,ce=se.firstChild,le=se.nextSibling,ue=le.firstChild,de=le.nextSibling,V=de.firstChild,fe=V.nextSibling,pe=P.nextSibling;pe.firstChild;var me=pe.nextSibling,he=me.nextSibling;return j(E,()=>oe(y().queryKey,!0)),j(re,C),j(M,ee),j(N,()=>new Date(x().dataUpdatedAt).toLocaleTimeString()),F.$$click=D,ae.$$click=()=>{Mu({type:`INVALIDATE`,queryHash:y()?.queryHash}),l.invalidateQueries({queryKey:y()?.queryKey,exact:!0})},se.$$click=()=>{Mu({type:`RESET`,queryHash:y()?.queryHash}),l.resetQueries({queryKey:y()?.queryKey,exact:!0})},le.$$click=()=>{Mu({type:`REMOVE`,queryHash:y()?.queryHash}),l.removeQueries({queryKey:y()?.queryKey,exact:!0}),su(null)},de.$$click=()=>{if(y()?.state.data===void 0)f(!0),O();else{let e=y();if(!e)return;Mu({type:`TRIGGER_LOADING`,queryHash:e.queryHash});let t=e.options;e.fetch({...t,queryFn:()=>new Promise(()=>{}),gcTime:-1}),e.setState({data:void 0,status:`pending`,fetchMeta:{...e.state.fetchMeta,__previousQueryOptions:t}})}},j(de,()=>T()===`pending`?`Restore`:`Trigger`,fe),j(P,z(L,{get when(){return v().length===0||T()===`error`},get children(){var e=$l(),t=e.firstChild,n=t.nextSibling;return e.$$click=()=>{y().state.error?(Mu({type:`RESTORE_ERROR`,queryHash:y()?.queryHash}),l.resetQueries({queryKey:y()?.queryKey})):te()},j(e,()=>T()===`error`?`Restore`:`Trigger`,n),k(n=>{var r=K(a`
                  color: ${c(s.red[500],s.red[400])};
                `,`tsqd-query-details-actions-btn`,`tsqd-query-details-action-error`),i=T()===`pending`,o=a`
                  background-color: ${c(s.red[500],s.red[400])};
                `;return r!==n.e&&R(e,n.e=r),i!==n.t&&(e.disabled=n.t=i),o!==n.a&&R(t,n.a=o),n},{e:void 0,t:void 0,a:void 0}),e}}),null),j(P,z(L,{get when(){return v().length!==0&&T()!==`error`},get children(){var t=eu(),n=t.firstChild,r=n.nextSibling.nextSibling;return r.firstChild,r.addEventListener(`change`,e=>{let t=v().find(t=>t.name===e.currentTarget.value);te(t)}),j(r,z(e,{get each(){return v()},children:e=>(()=>{var t=iu();return j(t,()=>e.name),k(()=>t.value=e.name),t})()}),null),j(t,z(Oc,{}),null),k(e=>{var i=K(o().actionsSelect,`tsqd-query-details-actions-btn`,`tsqd-query-details-action-error-multiple`),s=a`
                  background-color: ${Q.colors.red[400]};
                `,c=T()===`pending`;return i!==e.e&&R(t,e.e=i),s!==e.t&&R(n,e.t=s),c!==e.a&&(r.disabled=e.a=c),e},{e:void 0,t:void 0,a:void 0}),t}}),null),j(pe,()=>p()===`view`?`Explorer`:`Editor`,null),j(t,z(L,{get when(){return p()===`view`},get children(){var e=tu();return j(e,z(gl,{label:`Data`,defaultExpanded:[`Data`],get value(){return S()},editable:!0,onEdit:()=>m(`edit`),get activeQuery(){return y()}})),k(t=>_(e,`padding`,Q.size[2])),e}}),me),j(t,z(L,{get when(){return p()===`edit`},get children(){var e=nu(),t=e.firstChild,n=t.nextSibling,r=n.firstChild,i=r.nextSibling,l=i.firstChild,u=l.nextSibling;return e.addEventListener(`submit`,e=>{e.preventDefault();let t=new FormData(e.currentTarget).get(`data`);try{let e=JSON.parse(t);y().setState({...y().state,data:e}),m(`view`)}catch{g(!0)}}),t.addEventListener(`focus`,()=>g(!1)),j(r,()=>h()?`Invalid Value`:``),l.$$click=()=>m(`view`),k(f=>{var p=K(o().devtoolsEditForm,`tsqd-query-details-data-editor`),m=o().devtoolsEditTextarea,g=h(),_=o().devtoolsEditFormActions,v=o().devtoolsEditFormError,y=o().devtoolsEditFormActionContainer,b=K(o().devtoolsEditFormAction,a`
                      color: ${c(s.gray[600],s.gray[300])};
                    `),x=K(o().devtoolsEditFormAction,a`
                      color: ${c(s.blue[600],s.blue[400])};
                    `);return p!==f.e&&R(e,f.e=p),m!==f.t&&R(t,f.t=m),g!==f.a&&d(t,`data-error`,f.a=g),_!==f.o&&R(n,f.o=_),v!==f.i&&R(r,f.i=v),y!==f.n&&R(i,f.n=y),b!==f.s&&R(l,f.s=b),x!==f.h&&R(u,f.h=x),f},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0,h:void 0}),k(()=>t.value=JSON.stringify(S(),null,2)),e}}),me),j(he,z(gl,{label:`Query`,defaultExpanded:[`Query`,`queryKey`],get value(){return b()}})),k(e=>{var i=K(o().detailsContainer,`tsqd-query-details-container`),l=K(o().detailsHeader,`tsqd-query-details-header`),d=K(o().detailsBody,`tsqd-query-details-summary-container`),f=K(o().queryDetailsStatus,ne()),p=K(o().detailsHeader,`tsqd-query-details-header`),m=K(o().actionsBody,`tsqd-query-details-actions-container`),h=K(a`
                color: ${c(s.blue[600],s.blue[400])};
              `,`tsqd-query-details-actions-btn`,`tsqd-query-details-action-refetch`),g=C()===`fetching`,v=a`
                background-color: ${c(s.blue[600],s.blue[400])};
              `,y=K(a`
                color: ${c(s.yellow[600],s.yellow[400])};
              `,`tsqd-query-details-actions-btn`,`tsqd-query-details-action-invalidate`),b=T()===`pending`,x=a`
                background-color: ${c(s.yellow[600],s.yellow[400])};
              `,S=K(a`
                color: ${c(s.gray[600],s.gray[300])};
              `,`tsqd-query-details-actions-btn`,`tsqd-query-details-action-reset`),w=T()===`pending`,ee=a`
                background-color: ${c(s.gray[600],s.gray[400])};
              `,E=K(a`
                color: ${c(s.pink[500],s.pink[400])};
              `,`tsqd-query-details-actions-btn`,`tsqd-query-details-action-remove`),D=C()===`fetching`,te=a`
                background-color: ${c(s.pink[500],s.pink[400])};
              `,O=K(a`
                color: ${c(s.cyan[500],s.cyan[400])};
              `,`tsqd-query-details-actions-btn`,`tsqd-query-details-action-loading`),k=u(),A=a`
                background-color: ${c(s.cyan[500],s.cyan[400])};
              `,j=K(o().detailsHeader,`tsqd-query-details-header`),M=K(o().detailsHeader,`tsqd-query-details-header`),N=Q.size[2];return i!==e.e&&R(t,e.e=i),l!==e.t&&R(n,e.t=l),d!==e.a&&R(r,e.a=d),f!==e.o&&R(re,e.o=f),p!==e.i&&R(ie,e.i=p),m!==e.n&&R(P,e.n=m),h!==e.s&&R(F,e.s=h),g!==e.h&&(F.disabled=e.h=g),v!==e.r&&R(I,e.r=v),y!==e.d&&R(ae,e.d=y),b!==e.l&&(ae.disabled=e.l=b),x!==e.u&&R(B,e.u=x),S!==e.c&&R(se,e.c=S),w!==e.w&&(se.disabled=e.w=w),ee!==e.m&&R(ce,e.m=ee),E!==e.f&&R(le,e.f=E),D!==e.y&&(le.disabled=e.y=D),te!==e.g&&R(ue,e.g=te),O!==e.p&&R(de,e.p=O),k!==e.b&&(de.disabled=e.b=k),A!==e.T&&R(V,e.T=A),j!==e.A&&R(pe,e.A=j),M!==e.O&&R(me,e.O=M),N!==e.I&&_(he,`padding`,e.I=N),e},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0,h:void 0,r:void 0,d:void 0,l:void 0,u:void 0,c:void 0,w:void 0,m:void 0,f:void 0,y:void 0,g:void 0,p:void 0,b:void 0,T:void 0,A:void 0,O:void 0,I:void 0}),t}})},Tu=()=>{let e=U(),t=H().shadowDOMTarget?G.bind({target:H().shadowDOMTarget}):G,n=N(()=>e()===`dark`?Fu(t):Pu(t)),{colors:r}=Q,i=(t,n)=>e()===`dark`?n:t,a=Au(e=>{let t=e().getAll().find(e=>e.mutationId===cu());return t?t.state.isPaused:!1}),o=Au(e=>{let t=e().getAll().find(e=>e.mutationId===cu());return t?t.state.status:`idle`}),s=N(()=>v({isPaused:a(),status:o()})),c=Au(e=>e().getAll().find(e=>e.mutationId===cu()),!1),l=()=>s()===`gray`?t`
        background-color: ${i(r[s()][200],r[s()][700])};
        color: ${i(r[s()][700],r[s()][300])};
        border-color: ${i(r[s()][400],r[s()][600])};
      `:t`
      background-color: ${i(r[s()][100],r[s()][900])};
      color: ${i(r[s()][700],r[s()][300])};
      border-color: ${i(r[s()][400],r[s()][600])};
    `;return z(L,{get when(){return c()},get children(){var e=au(),t=e.firstChild,r=t.nextSibling,i=r.firstChild,a=i.firstChild,u=a.firstChild,d=a.nextSibling,f=i.nextSibling.firstChild.nextSibling,p=r.nextSibling,m=p.nextSibling,h=m.nextSibling,g=h.nextSibling,v=g.nextSibling,y=v.nextSibling,b=y.nextSibling,x=b.nextSibling;return j(u,z(L,{get when(){return c().options.mutationKey},fallback:`No mutationKey found`,get children(){return oe(c().options.mutationKey,!0)}})),j(d,z(L,{get when(){return s()===`purple`},children:`pending`}),null),j(d,z(L,{get when(){return s()!==`purple`},get children(){return o()}}),null),j(f,()=>new Date(c().state.submittedAt).toLocaleTimeString()),j(m,z(gl,{label:`Variables`,defaultExpanded:[`Variables`],get value(){return c().state.variables}})),j(g,z(gl,{label:`Context`,defaultExpanded:[`Context`],get value(){return c().state.context}})),j(y,z(gl,{label:`Data`,defaultExpanded:[`Data`],get value(){return c().state.data}})),j(x,z(gl,{label:`Mutation`,defaultExpanded:[`Mutation`],get value(){return c()}})),k(i=>{var a=K(n().detailsContainer,`tsqd-query-details-container`),o=K(n().detailsHeader,`tsqd-query-details-header`),s=K(n().detailsBody,`tsqd-query-details-summary-container`),c=K(n().queryDetailsStatus,l()),u=K(n().detailsHeader,`tsqd-query-details-header`),f=Q.size[2],S=K(n().detailsHeader,`tsqd-query-details-header`),C=Q.size[2],w=K(n().detailsHeader,`tsqd-query-details-header`),T=Q.size[2],ee=K(n().detailsHeader,`tsqd-query-details-header`),E=Q.size[2];return a!==i.e&&R(e,i.e=a),o!==i.t&&R(t,i.t=o),s!==i.a&&R(r,i.a=s),c!==i.o&&R(d,i.o=c),u!==i.i&&R(p,i.i=u),f!==i.n&&_(m,`padding`,i.n=f),S!==i.s&&R(h,i.s=S),C!==i.h&&_(g,`padding`,i.h=C),w!==i.r&&R(v,i.r=w),T!==i.d&&_(y,`padding`,i.d=T),ee!==i.l&&R(b,i.l=ee),E!==i.u&&_(x,`padding`,i.u=E),i},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0,h:void 0,r:void 0,d:void 0,l:void 0,u:void 0}),e}})},Eu=new Map,Du=()=>{let e=N(()=>H().client.getQueryCache()),t=e().subscribe(t=>{P(()=>{for(let[n,r]of Eu.entries())r.shouldUpdate(t)&&r.setter(n(e))})});return h(()=>{Eu.clear(),t()}),t},$=(e,t=!0,n=()=>!0)=>{let r=N(()=>H().client.getQueryCache()),[i,a]=w(e(r),t?void 0:{equals:!1});return F(()=>{a(e(r))}),Eu.set(e,{setter:a,shouldUpdate:n}),h(()=>{Eu.delete(e)}),i},Ou=new Map,ku=()=>{let e=N(()=>H().client.getMutationCache()),t=e().subscribe(()=>{for(let[t,n]of Ou.entries())queueMicrotask(()=>{n(t(e))})});return h(()=>{Ou.clear(),t()}),t},Au=(e,t=!0)=>{let n=N(()=>H().client.getMutationCache()),[r,i]=w(e(n),t?void 0:{equals:!1});return F(()=>{i(e(n))}),Ou.set(e,i),h(()=>{Ou.delete(e)}),r},ju=`@tanstack/query-devtools-event`,Mu=({type:e,queryHash:t,metadata:n})=>{let r=new CustomEvent(ju,{detail:{type:e,queryHash:t,metadata:n},bubbles:!0,cancelable:!0});window.dispatchEvent(r)},Nu=(e,t)=>{let{colors:n,font:r,size:i,alpha:a,shadow:o,border:s}=Q,c=(t,n)=>e===`light`?t:n;return{devtoolsBtn:t`
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
    `}},Pu=e=>Nu(`light`,e),Fu=e=>Nu(`dark`,e);se([`click`,`mousedown`,`keydown`,`input`]);export{Pe as a,_e as c,Le as i,mu as n,Ee as o,gu as r,ze as s,vu as t};