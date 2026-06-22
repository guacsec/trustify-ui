import{$ as e,At as t,Bt as n,Ct as r,Dt as i,Et as a,Ft as o,Gt as s,Ht as c,It as l,Jt as u,Kt as d,Lt as f,Mt as p,Nt as m,Ot as h,Pt as g,Q as _,Rt as v,St as y,Tt as b,Ut as x,Vt as S,Wt as C,Z as w,_t as T,at as ee,bt as E,ct as D,dt as te,et as O,ft as k,gt as ne,ht as A,it as re,jt as j,kt as M,lt as N,mt as P,nt as F,ot as ie,pt as I,qt as L,rt as R,st as z,tt as ae,ut as B,vt as V,xt as oe,yt as se,zt as ce}from"./index-xEM9J8X0.js";var le=!1,ue=e=>e!=null,de=e=>e.filter(ue);function fe(e){return(...t)=>{for(let n of e)n&&n(...t)}}var H=e=>typeof e==`function`&&!e.length?e():e,pe=e=>Array.isArray(e)?e:e?[e]:[];function me(e,...t){return typeof e==`function`?e(...t):e}var he=le?e=>r()?g(e):e:g;function ge(e,t,n,r){let i=e.length,a=t.length,o=0;if(!a){for(;o<i;o++)n(e[o]);return}if(!i){for(;o<a;o++)r(t[o]);return}for(;o<a&&t[o]===e[o];o++);let s,c;t=t.slice(o),e=e.slice(o);for(s of t)e.includes(s)||r(s);for(c of e)t.includes(c)||n(c)}function _e(e){let[t,n]=T(),r=e?.throw?(e,t)=>{throw n(e instanceof Error?e:Error(t)),e}:(e,t)=>{n(e instanceof Error?e:Error(t))},i=e?.api?Array.isArray(e.api)?e.api:[e.api]:[globalThis.localStorage].filter(Boolean),a=e?.prefix?`${e.prefix}.`:``,s=new Map,c=new Proxy({},{get(t,n){let o=s.get(n);o||(o=T(void 0,{equals:!1}),s.set(n,o)),o[0]();let c=i.reduce((e,t)=>{if(e!==null||!t)return e;try{return t.getItem(`${a}${n}`)}catch(e){return r(e,`Error reading ${a}${n} from ${t.name}`),null}},null);return c!==null&&e?.deserializer?e.deserializer(c,n,e.options):c}});return e?.sync!==!1&&o(()=>{let e=e=>{let t=!1;i.forEach(n=>{try{n!==e.storageArea&&e.key&&e.newValue!==n.getItem(e.key)&&(e.newValue?n.setItem(e.key,e.newValue):n.removeItem(e.key),t=!0)}catch(t){r(t,`Error synching api ${n.name} from storage event (${e.key}=${e.newValue})`)}}),t&&e.key&&s.get(e.key)?.[1]()};`addEventListener`in globalThis?(globalThis.addEventListener(`storage`,e),g(()=>globalThis.removeEventListener(`storage`,e))):(i.forEach(t=>t.addEventListener?.(`storage`,e)),g(()=>i.forEach(t=>t.removeEventListener?.(`storage`,e))))}),[c,(t,n,o)=>{let c=e?.serializer?e.serializer(n,t,o??e.options):n,l=`${a}${t}`;i.forEach(e=>{try{e.getItem(l)!==c&&e.setItem(l,c)}catch(n){r(n,`Error setting ${a}${t} to ${c} in ${e.name}`)}});let u=s.get(t);u&&u[1]()},{clear:()=>i.forEach(e=>{try{e.clear()}catch(t){r(t,`Error clearing ${e.name}`)}}),error:t,remove:e=>i.forEach(t=>{try{t.removeItem(`${a}${e}`)}catch(n){r(n,`Error removing ${a}${e} from ${t.name}`)}}),toJSON:()=>{let t={},n=(n,r)=>{if(!t.hasOwnProperty(n)){let i=r&&e?.deserializer?e.deserializer(r,n,e.options):r;i&&(t[n]=i)}};return i.forEach(e=>{if(typeof e.getAll==`function`){let t;try{t=e.getAll()}catch(t){r(t,`Error getting all values from in ${e.name}`)}for(let e of t)n(e,t[e])}else{let i=0,a;try{for(;a=e.key(i++);)t.hasOwnProperty(a)||n(a,e.getItem(a))}catch(t){r(t,`Error getting all values from ${e.name}`)}}}),t}}]}var ve=_e,ye=e=>(typeof e.clear==`function`||(e.clear=()=>{let t;for(;t=e.key(0);)e.removeItem(t)}),e),be=e=>{if(!e)return``;let t=``;for(let n in e){if(!e.hasOwnProperty(n))continue;let r=e[n];t+=r instanceof Date?`; ${n}=${r.toUTCString()}`:typeof r==`boolean`?`; ${n}`:`; ${n}=${r}`}return t},xe=ye({_cookies:[globalThis.document,`cookie`],getItem:e=>xe._cookies[0][xe._cookies[1]].match(`(^|;)\\s*`+e+`\\s*=\\s*([^;]+)`)?.pop()??null,setItem:(e,t,n)=>{let r=xe.getItem(e);xe._cookies[0][xe._cookies[1]]=`${e}=${t}${be(n)}`;let i=Object.assign(new Event(`storage`),{key:e,oldValue:r,newValue:t,url:globalThis.document.URL,storageArea:xe});window.dispatchEvent(i)},removeItem:e=>{xe._cookies[0][xe._cookies[1]]=`${e}=deleted${be({expires:new Date(0)})}`},key:e=>{let t=null,n=0;return xe._cookies[0][xe._cookies[1]].replace(/(?:^|;)\s*(.+?)\s*=\s*[^;]+/g,(r,i)=>(!t&&i&&n++===e&&(t=i),``)),t},get length(){let e=0;return xe._cookies[0][xe._cookies[1]].replace(/(?:^|;)\s*.+?\s*=\s*[^;]+/g,t=>(e+=+!!t,``)),e}}),Se=1024,Ce=796,we=700,Te=`bottom-right`,Ee=`bottom`,De=`system`,Oe=!1,ke=500,Ae=500,je=500,Me=Object.keys(ce)[0],Ne=1,Pe=Object.keys(p)[0],Fe=k({client:void 0,onlineManager:void 0,queryFlavor:``,version:``,shadowDOMTarget:void 0});function U(){return L(Fe)}var Ie=class extends Error{},Le=k(void 0),Re=e=>{let[t,n]=T(null),r=()=>{let e=t();e!=null&&(e.close(),n(null))},i=(r,i)=>{if(t()!=null)return;let a=window.open(``,`TSQD-Devtools-Panel`,`width=${r},height=${i},popup`);if(!a)throw new Ie(`Failed to open popup. Please allow popups for this site to view the devtools in picture-in-picture mode.`);a.document.head.innerHTML=``,a.document.body.innerHTML=``,D(a.document),a.document.title=`TanStack Query Devtools`,a.document.body.style.margin=`0`,a.addEventListener(`pagehide`,()=>{e.setLocalStore(`pip_open`,`false`),n(null)}),[...(U().shadowDOMTarget||document).styleSheets].forEach(e=>{try{let t=[...e.cssRules].map(e=>e.cssText).join(``),n=document.createElement(`style`),r=e.ownerNode,i=``;r&&`id`in r&&(i=r.id),i&&n.setAttribute(`id`,i),n.textContent=t,a.document.head.appendChild(n)}catch{let t=document.createElement(`link`);if(e.href==null)return;t.rel=`stylesheet`,t.type=e.type,t.media=e.media.toString(),t.href=e.href,a.document.head.appendChild(t)}}),se([`focusin`,`focusout`,`pointermove`,`keydown`,`pointerdown`,`pointerup`,`click`,`mousedown`,`input`],a.document),e.setLocalStore(`pip_open`,`true`),n(a)};I(()=>{if((e.localStore.pip_open??`false`)===`true`&&!e.disabled)try{i(Number(window.innerWidth),Number(e.localStore.height||Ae))}catch(t){if(t instanceof Ie){e.setLocalStore(`pip_open`,`false`),e.setLocalStore(`open`,`false`);return}throw t}}),I(()=>{let e=(U().shadowDOMTarget||document).querySelector(`#_goober`),n=t();if(e&&n){let t=new MutationObserver(()=>{let t=(U().shadowDOMTarget||n.document).querySelector(`#_goober`);t&&(t.textContent=e.textContent)});t.observe(e,{childList:!0,subtree:!0,characterDataOldValue:!0}),g(()=>{t.disconnect()})}});let a=P(()=>({pipWindow:t(),requestPipWindow:i,closePipWindow:r,disabled:e.disabled??!1}));return B(Le.Provider,{value:a,get children(){return e.children}})},ze=()=>P(()=>{let e=L(Le);if(!e)throw Error(`usePiPWindow must be used within a PiPProvider`);return e()}),Be=k(()=>`dark`);function W(){return L(Be)}var Ve={À:`A`,Á:`A`,Â:`A`,Ã:`A`,Ä:`A`,Å:`A`,Ấ:`A`,Ắ:`A`,Ẳ:`A`,Ẵ:`A`,Ặ:`A`,Æ:`AE`,Ầ:`A`,Ằ:`A`,Ȃ:`A`,Ç:`C`,Ḉ:`C`,È:`E`,É:`E`,Ê:`E`,Ë:`E`,Ế:`E`,Ḗ:`E`,Ề:`E`,Ḕ:`E`,Ḝ:`E`,Ȇ:`E`,Ì:`I`,Í:`I`,Î:`I`,Ï:`I`,Ḯ:`I`,Ȋ:`I`,Ð:`D`,Ñ:`N`,Ò:`O`,Ó:`O`,Ô:`O`,Õ:`O`,Ö:`O`,Ø:`O`,Ố:`O`,Ṍ:`O`,Ṓ:`O`,Ȏ:`O`,Ù:`U`,Ú:`U`,Û:`U`,Ü:`U`,Ý:`Y`,à:`a`,á:`a`,â:`a`,ã:`a`,ä:`a`,å:`a`,ấ:`a`,ắ:`a`,ẳ:`a`,ẵ:`a`,ặ:`a`,æ:`ae`,ầ:`a`,ằ:`a`,ȃ:`a`,ç:`c`,ḉ:`c`,è:`e`,é:`e`,ê:`e`,ë:`e`,ế:`e`,ḗ:`e`,ề:`e`,ḕ:`e`,ḝ:`e`,ȇ:`e`,ì:`i`,í:`i`,î:`i`,ï:`i`,ḯ:`i`,ȋ:`i`,ð:`d`,ñ:`n`,ò:`o`,ó:`o`,ô:`o`,õ:`o`,ö:`o`,ø:`o`,ố:`o`,ṍ:`o`,ṓ:`o`,ȏ:`o`,ù:`u`,ú:`u`,û:`u`,ü:`u`,ý:`y`,ÿ:`y`,Ā:`A`,ā:`a`,Ă:`A`,ă:`a`,Ą:`A`,ą:`a`,Ć:`C`,ć:`c`,Ĉ:`C`,ĉ:`c`,Ċ:`C`,ċ:`c`,Č:`C`,č:`c`,C̆:`C`,c̆:`c`,Ď:`D`,ď:`d`,Đ:`D`,đ:`d`,Ē:`E`,ē:`e`,Ĕ:`E`,ĕ:`e`,Ė:`E`,ė:`e`,Ę:`E`,ę:`e`,Ě:`E`,ě:`e`,Ĝ:`G`,Ǵ:`G`,ĝ:`g`,ǵ:`g`,Ğ:`G`,ğ:`g`,Ġ:`G`,ġ:`g`,Ģ:`G`,ģ:`g`,Ĥ:`H`,ĥ:`h`,Ħ:`H`,ħ:`h`,Ḫ:`H`,ḫ:`h`,Ĩ:`I`,ĩ:`i`,Ī:`I`,ī:`i`,Ĭ:`I`,ĭ:`i`,Į:`I`,į:`i`,İ:`I`,ı:`i`,Ĳ:`IJ`,ĳ:`ij`,Ĵ:`J`,ĵ:`j`,Ķ:`K`,ķ:`k`,Ḱ:`K`,ḱ:`k`,K̆:`K`,k̆:`k`,Ĺ:`L`,ĺ:`l`,Ļ:`L`,ļ:`l`,Ľ:`L`,ľ:`l`,Ŀ:`L`,ŀ:`l`,Ł:`l`,ł:`l`,Ḿ:`M`,ḿ:`m`,M̆:`M`,m̆:`m`,Ń:`N`,ń:`n`,Ņ:`N`,ņ:`n`,Ň:`N`,ň:`n`,ŉ:`n`,N̆:`N`,n̆:`n`,Ō:`O`,ō:`o`,Ŏ:`O`,ŏ:`o`,Ő:`O`,ő:`o`,Œ:`OE`,œ:`oe`,P̆:`P`,p̆:`p`,Ŕ:`R`,ŕ:`r`,Ŗ:`R`,ŗ:`r`,Ř:`R`,ř:`r`,R̆:`R`,r̆:`r`,Ȓ:`R`,ȓ:`r`,Ś:`S`,ś:`s`,Ŝ:`S`,ŝ:`s`,Ş:`S`,Ș:`S`,ș:`s`,ş:`s`,Š:`S`,š:`s`,Ţ:`T`,ţ:`t`,ț:`t`,Ț:`T`,Ť:`T`,ť:`t`,Ŧ:`T`,ŧ:`t`,T̆:`T`,t̆:`t`,Ũ:`U`,ũ:`u`,Ū:`U`,ū:`u`,Ŭ:`U`,ŭ:`u`,Ů:`U`,ů:`u`,Ű:`U`,ű:`u`,Ų:`U`,ų:`u`,Ȗ:`U`,ȗ:`u`,V̆:`V`,v̆:`v`,Ŵ:`W`,ŵ:`w`,Ẃ:`W`,ẃ:`w`,X̆:`X`,x̆:`x`,Ŷ:`Y`,ŷ:`y`,Ÿ:`Y`,Y̆:`Y`,y̆:`y`,Ź:`Z`,ź:`z`,Ż:`Z`,ż:`z`,Ž:`Z`,ž:`z`,ſ:`s`,ƒ:`f`,Ơ:`O`,ơ:`o`,Ư:`U`,ư:`u`,Ǎ:`A`,ǎ:`a`,Ǐ:`I`,ǐ:`i`,Ǒ:`O`,ǒ:`o`,Ǔ:`U`,ǔ:`u`,Ǖ:`U`,ǖ:`u`,Ǘ:`U`,ǘ:`u`,Ǚ:`U`,ǚ:`u`,Ǜ:`U`,ǜ:`u`,Ứ:`U`,ứ:`u`,Ṹ:`U`,ṹ:`u`,Ǻ:`A`,ǻ:`a`,Ǽ:`AE`,ǽ:`ae`,Ǿ:`O`,ǿ:`o`,Þ:`TH`,þ:`th`,Ṕ:`P`,ṕ:`p`,Ṥ:`S`,ṥ:`s`,X́:`X`,x́:`x`,Ѓ:`Г`,ѓ:`г`,Ќ:`К`,ќ:`к`,A̋:`A`,a̋:`a`,E̋:`E`,e̋:`e`,I̋:`I`,i̋:`i`,Ǹ:`N`,ǹ:`n`,Ồ:`O`,ồ:`o`,Ṑ:`O`,ṑ:`o`,Ừ:`U`,ừ:`u`,Ẁ:`W`,ẁ:`w`,Ỳ:`Y`,ỳ:`y`,Ȁ:`A`,ȁ:`a`,Ȅ:`E`,ȅ:`e`,Ȉ:`I`,ȉ:`i`,Ȍ:`O`,ȍ:`o`,Ȑ:`R`,ȑ:`r`,Ȕ:`U`,ȕ:`u`,B̌:`B`,b̌:`b`,Č̣:`C`,č̣:`c`,Ê̌:`E`,ê̌:`e`,F̌:`F`,f̌:`f`,Ǧ:`G`,ǧ:`g`,Ȟ:`H`,ȟ:`h`,J̌:`J`,ǰ:`j`,Ǩ:`K`,ǩ:`k`,M̌:`M`,m̌:`m`,P̌:`P`,p̌:`p`,Q̌:`Q`,q̌:`q`,Ř̩:`R`,ř̩:`r`,Ṧ:`S`,ṧ:`s`,V̌:`V`,v̌:`v`,W̌:`W`,w̌:`w`,X̌:`X`,x̌:`x`,Y̌:`Y`,y̌:`y`,A̧:`A`,a̧:`a`,B̧:`B`,b̧:`b`,Ḑ:`D`,ḑ:`d`,Ȩ:`E`,ȩ:`e`,Ɛ̧:`E`,ɛ̧:`e`,Ḩ:`H`,ḩ:`h`,I̧:`I`,i̧:`i`,Ɨ̧:`I`,ɨ̧:`i`,M̧:`M`,m̧:`m`,O̧:`O`,o̧:`o`,Q̧:`Q`,q̧:`q`,U̧:`U`,u̧:`u`,X̧:`X`,x̧:`x`,Z̧:`Z`,z̧:`z`},He=Object.keys(Ve).join(`|`),Ue=new RegExp(He,`g`);function We(e){return e.replace(Ue,e=>Ve[e])}var Ge={CASE_SENSITIVE_EQUAL:7,EQUAL:6,STARTS_WITH:5,WORD_STARTS_WITH:4,CONTAINS:3,ACRONYM:2,MATCHES:1,NO_MATCH:0};function Ke(e,t,n){if(n||={},n.threshold=n.threshold??Ge.MATCHES,!n.accessors){let r=qe(e,t,n);return{rankedValue:e,rank:r,accessorIndex:-1,accessorThreshold:n.threshold,passed:r>=n.threshold}}let r=Qe(e,n.accessors),i={rankedValue:e,rank:Ge.NO_MATCH,accessorIndex:-1,accessorThreshold:n.threshold,passed:!1};for(let e=0;e<r.length;e++){let a=r[e],o=qe(a.itemValue,t,n),{minRanking:s,maxRanking:c,threshold:l=n.threshold}=a.attributes;o<s&&o>=Ge.MATCHES?o=s:o>c&&(o=c),o=Math.min(o,c),o>=l&&o>i.rank&&(i.rank=o,i.passed=!0,i.accessorIndex=e,i.accessorThreshold=l,i.rankedValue=a.itemValue)}return i}function qe(e,t,n){return e=Xe(e,n),t=Xe(t,n),t.length>e.length?Ge.NO_MATCH:e===t?Ge.CASE_SENSITIVE_EQUAL:(e=e.toLowerCase(),t=t.toLowerCase(),e===t?Ge.EQUAL:e.startsWith(t)?Ge.STARTS_WITH:e.includes(` ${t}`)?Ge.WORD_STARTS_WITH:e.includes(t)?Ge.CONTAINS:t.length===1?Ge.NO_MATCH:Je(e).includes(t)?Ge.ACRONYM:Ye(e,t))}function Je(e){let t=``;return e.split(` `).forEach(e=>{e.split(`-`).forEach(e=>{t+=e.substr(0,1)})}),t}function Ye(e,t){let n=0,r=0;function i(e,t,r){for(let i=r,a=t.length;i<a;i++)if(t[i]===e)return n+=1,i+1;return-1}function a(e){let r=1/e,i=n/t.length;return Ge.MATCHES+i*r}let o=i(t[0],e,0);if(o<0)return Ge.NO_MATCH;r=o;for(let n=1,a=t.length;n<a;n++){let a=t[n];if(r=i(a,e,r),!(r>-1))return Ge.NO_MATCH}return a(r-o)}function Xe(e,t){let{keepDiacritics:n}=t;return e=`${e}`,n||(e=We(e)),e}function Ze(e,t){let n=t;typeof t==`object`&&(n=t.accessor);let r=n(e);return r==null?[]:Array.isArray(r)?r:[String(r)]}function Qe(e,t){let n=[];for(let r=0,i=t.length;r<i;r++){let i=t[r],a=et(i),o=Ze(e,i);for(let e=0,t=o.length;e<t;e++)n.push({itemValue:o[e],attributes:a})}return n}var $e={maxRanking:1/0,minRanking:-1/0};function et(e){return typeof e==`function`?$e:{...$e,...e}}var tt={data:``},nt=e=>{if(typeof window==`object`){let t=(e?e.querySelector(`#_goober`):window._goober)||Object.assign(document.createElement(`style`),{innerHTML:` `,id:`_goober`});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||tt},rt=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,it=/\/\*[^]*?\*\/|  +/g,at=/\n+/g,ot=(e,t)=>{let n=``,r=``,i=``;for(let a in e){let o=e[a];a[0]==`@`?a[1]==`i`?n=a+` `+o+`;`:r+=a[1]==`f`?ot(o,a):a+`{`+ot(o,a[1]==`k`?``:t)+`}`:typeof o==`object`?r+=ot(o,t?t.replace(/([^,])+/g,e=>a.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+` `+t:t)):a):o!=null&&(a=/^--/.test(a)?a:a.replace(/[A-Z]/g,`-$&`).toLowerCase(),i+=ot.p?ot.p(a,o):a+`:`+o+`;`)}return n+(t&&i?t+`{`+i+`}`:i)+r},st={},ct=e=>{if(typeof e==`object`){let t=``;for(let n in e)t+=n+ct(e[n]);return t}return e},lt=(e,t,n,r,i)=>{let a=ct(e),o=st[a]||(st[a]=(e=>{let t=0,n=11;for(;t<e.length;)n=101*n+e.charCodeAt(t++)>>>0;return`go`+n})(a));if(!st[o]){let t=a===e?(e=>{let t,n,r=[{}];for(;t=rt.exec(e.replace(it,``));)t[4]?r.shift():t[3]?(n=t[3].replace(at,` `).trim(),r.unshift(r[0][n]=r[0][n]||{})):r[0][t[1]]=t[2].replace(at,` `).trim();return r[0]})(e):e;st[o]=ot(i?{[`@keyframes `+o]:t}:t,n?``:`.`+o)}let s=n&&st.g?st.g:null;return n&&(st.g=st[o]),((e,t,n,r)=>{r?t.data=t.data.replace(r,e):t.data.indexOf(e)===-1&&(t.data=n?e+t.data:t.data+e)})(st[o],t,r,s),o},ut=(e,t,n)=>e.reduce((e,r,i)=>{let a=t[i];if(a&&a.call){let e=a(n),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;a=t?`.`+t:e&&typeof e==`object`?e.props?``:ot(e,``):!1===e?``:e}return e+r+(a??``)},``);function G(e){let t=this||{},n=e.call?e(t.p):e;return lt(n.unshift?n.raw?ut(n,[].slice.call(arguments,1),t.p):n.reduce((e,n)=>Object.assign(e,n&&n.call?n(t.p):n),{}):n,nt(t.target),t.g,t.o,t.k)}G.bind({g:1}),G.bind({k:1});function dt(e){var t,n,r=``;if(typeof e==`string`||typeof e==`number`)r+=e;else if(typeof e==`object`)if(Array.isArray(e)){var i=e.length;for(t=0;t<i;t++)e[t]&&(n=dt(e[t]))&&(r&&(r+=` `),r+=n)}else for(n in e)e[n]&&(r&&(r+=` `),r+=n);return r}function K(){for(var e,t,n=0,r=``,i=arguments.length;n<i;n++)(e=arguments[n])&&(t=dt(e))&&(r&&(r+=` `),r+=t);return r}function ft(e,t){let n=C(e),{onChange:r}=t,i=new Set(t.appear?void 0:n),a=new WeakSet,[o,s]=T([],{equals:!1}),[c]=u(),l=e=>{s(t=>(t.push.apply(t,e),t));for(let t of e)a.delete(t)},d=(e,t,n)=>e.splice(n,0,t);return P(t=>{let n=o(),s=e();if(s[w],C(c))return c(),t;if(n.length){let e=t.filter(e=>!n.includes(e));return n.length=0,r({list:e,added:[],removed:[],unchanged:e,finishRemoved:l}),e}return C(()=>{let e=new Set(s),n=s.slice(),o=[],c=[],u=[];for(let e of s)(i.has(e)?u:o).push(e);let f=!o.length;for(let r=0;r<t.length;r++){let i=t[r];e.has(i)||(a.has(i)||(c.push(i),a.add(i)),d(n,i,r)),f&&i!==n[r]&&(f=!1)}return!c.length&&f?t:(r({list:n,added:o,removed:c,unchanged:u,finishRemoved:l}),i=e,n)})},t.appear?[]:n.slice())}function pt(...e){return fe(e)}var mt=e=>e instanceof Element;function ht(e,t){if(t(e))return e;if(typeof e==`function`&&!e.length)return ht(e(),t);if(Array.isArray(e)){let n=[];for(let r of e){let e=ht(r,t);e&&(Array.isArray(e)?n.push.apply(n,e):n.push(e))}return n.length?n:null}return null}function gt(e,t=mt,n=mt){let r=P(e),i=P(()=>ht(r(),t));return i.toArray=()=>{let e=i();return Array.isArray(e)?e:e?[e]:[]},i}function _t(e){return P(()=>{let t=e.name||`s`;return{enterActive:(e.enterActiveClass||t+`-enter-active`).split(` `),enter:(e.enterClass||t+`-enter`).split(` `),enterTo:(e.enterToClass||t+`-enter-to`).split(` `),exitActive:(e.exitActiveClass||t+`-exit-active`).split(` `),exit:(e.exitClass||t+`-exit`).split(` `),exitTo:(e.exitToClass||t+`-exit-to`).split(` `),move:(e.moveClass||t+`-move`).split(` `)}})}function vt(e){requestAnimationFrame(()=>requestAnimationFrame(e))}function yt(e,t,n,r){let{onBeforeEnter:i,onEnter:a,onAfterEnter:o}=t;i?.(n),n.classList.add(...e.enter),n.classList.add(...e.enterActive),queueMicrotask(()=>{if(!n.parentNode)return r?.();a?.(n,()=>s())}),vt(()=>{n.classList.remove(...e.enter),n.classList.add(...e.enterTo),(!a||a.length<2)&&(n.addEventListener(`transitionend`,s),n.addEventListener(`animationend`,s))});function s(t){(!t||t.target===n)&&(n.removeEventListener(`transitionend`,s),n.removeEventListener(`animationend`,s),n.classList.remove(...e.enterActive),n.classList.remove(...e.enterTo),o?.(n))}}function bt(e,t,n,r){let{onBeforeExit:i,onExit:a,onAfterExit:o}=t;if(!n.parentNode)return r?.();i?.(n),n.classList.add(...e.exit),n.classList.add(...e.exitActive),a?.(n,()=>s()),vt(()=>{n.classList.remove(...e.exit),n.classList.add(...e.exitTo),(!a||a.length<2)&&(n.addEventListener(`transitionend`,s),n.addEventListener(`animationend`,s))});function s(t){(!t||t.target===n)&&(r?.(),n.removeEventListener(`transitionend`,s),n.removeEventListener(`animationend`,s),n.classList.remove(...e.exitActive),n.classList.remove(...e.exitTo),o?.(n))}}var xt=e=>{let t=_t(e);return ft(gt(()=>e.children).toArray,{appear:e.appear,onChange({added:n,removed:r,finishRemoved:i,list:a}){let o=t();for(let t of n)yt(o,e,t);let s=[];for(let e of a)e.isConnected&&(e instanceof HTMLElement||e instanceof SVGElement)&&s.push({el:e,rect:e.getBoundingClientRect()});queueMicrotask(()=>{let e=[];for(let{el:t,rect:n}of s)if(t.isConnected){let r=t.getBoundingClientRect(),i=n.left-r.left,a=n.top-r.top;(i||a)&&(t.style.transform=`translate(${i}px, ${a}px)`,t.style.transitionDuration=`0s`,e.push(t))}document.body.offsetHeight;for(let t of e){let e=function(n){(n.target===t||/transform$/.test(n.propertyName))&&(t.removeEventListener(`transitionend`,e),t.classList.remove(...o.move))};t.classList.add(...o.move),t.style.transform=t.style.transitionDuration=``,t.addEventListener(`transitionend`,e)}});for(let t of r)bt(o,e,t,()=>i([t]))}})},St=Symbol(`fallback`);function Ct(e){for(let t of e)t.dispose()}function wt(e,t,n,r={}){let i=new Map;return g(()=>Ct(i.values())),()=>{let n=e()||[];return n[w],C(()=>{if(!n.length)return Ct(i.values()),i.clear(),r.fallback?[ne(e=>(i.set(St,{dispose:e}),r.fallback()))]:[];let e=Array(n.length),o=i.get(St);if(!i.size||o){o?.dispose(),i.delete(St);for(let r=0;r<n.length;r++){let i=n[r],o=t(i,r);a(e,i,r,o)}return e}let s=new Set(i.keys());for(let r=0;r<n.length;r++){let o=n[r],c=t(o,r);s.delete(c);let l=i.get(c);l?(e[r]=l.mapped,l.setIndex?.(r),l.setItem(()=>o)):a(e,o,r,c)}for(let e of s)i.get(e)?.dispose(),i.delete(e);return e})};function a(e,t,r,a){ne(o=>{let[s,c]=T(t),l={setItem:c,dispose:o};if(n.length>1){let[e,t]=T(r);l.setIndex=t,l.mapped=n(s,e)}else l.mapped=n(s);i.set(a,l),e[r]=l.mapped})}}function Tt(e){let{by:t}=e;return P(wt(()=>e.each,typeof t==`function`?t:e=>e[t],e.children,`fallback`in e?{fallback:()=>e.fallback}:void 0))}function Et(e,t,n,r){return e.addEventListener(t,n,r),he(e.removeEventListener.bind(e,t,n,r))}function Dt(e,t,n,r){let i=()=>{pe(H(e)).forEach(e=>{e&&pe(H(t)).forEach(t=>Et(e,t,n,r))})};typeof e==`function`?I(i):A(i)}function Ot(e,t){let n=new ResizeObserver(e);return g(n.disconnect.bind(n)),{observe:e=>n.observe(e,t),unobserve:n.unobserve.bind(n)}}function kt(e,t,n){let r=new WeakMap,{observe:i,unobserve:a}=Ot(e=>{for(let n of e){let{contentRect:e,target:i}=n,a=Math.round(e.width),o=Math.round(e.height),s=r.get(i);(!s||s.width!==a||s.height!==o)&&(t(e,i,n),r.set(i,{width:a,height:o}))}},n);I(t=>{let n=de(pe(H(e)));return ge(n,t,i,a),n},[])}var At=/((?:--)?(?:\w+-?)+)\s*:\s*([^;]*)/g;function jt(e){let t={},n;for(;n=At.exec(e);)t[n[1]]=n[2];return t}function Mt(e,t){if(typeof e==`string`){if(typeof t==`string`)return`${e};${t}`;e=jt(e)}else typeof t==`string`&&(t=jt(t));return{...e,...t}}function Nt(e,t,n=-1){return n in e?[...e.slice(0,n),t,...e.slice(n)]:[...e,t]}function Pt(e,t){let n=[...e],r=n.indexOf(t);return r!==-1&&n.splice(r,1),n}function Ft(e){return typeof e==`number`}function It(e){return Object.prototype.toString.call(e)===`[object String]`}function Lt(e){return typeof e==`function`}function Rt(e){return t=>`${e()}-${t}`}function zt(e,t){return e?e===t||e.contains(t):!1}function Bt(e,t=!1){let{activeElement:n}=Ht(e);if(!n?.nodeName)return null;if(Ut(n)&&n.contentDocument)return Bt(n.contentDocument.body,t);if(t){let e=n.getAttribute(`aria-activedescendant`);if(e){let t=Ht(n).getElementById(e);if(t)return t}}return n}function Vt(e){return Ht(e).defaultView||window}function Ht(e){return e?e.ownerDocument||e:document}function Ut(e){return e.tagName===`IFRAME`}var Wt=(e=>(e.Escape=`Escape`,e.Enter=`Enter`,e.Tab=`Tab`,e.Space=` `,e.ArrowDown=`ArrowDown`,e.ArrowLeft=`ArrowLeft`,e.ArrowRight=`ArrowRight`,e.ArrowUp=`ArrowUp`,e.End=`End`,e.Home=`Home`,e.PageDown=`PageDown`,e.PageUp=`PageUp`,e))(Wt||{});function Gt(e){return typeof window<`u`&&window.navigator!=null?e.test(window.navigator.userAgentData?.platform||window.navigator.platform):!1}function Kt(){return Gt(/^Mac/i)}function qt(){return Gt(/^iPhone/i)}function Jt(){return Gt(/^iPad/i)||Kt()&&navigator.maxTouchPoints>1}function Yt(){return qt()||Jt()}function Xt(){return Kt()||Yt()}function q(e,t){return t&&(Lt(t)?t(e):t[0](t[1],e)),e?.defaultPrevented}function J(e){return t=>{for(let n of e)q(t,n)}}function Zt(e){return Kt()?e.metaKey&&!e.ctrlKey:e.ctrlKey&&!e.metaKey}function Qt(e){if(e)if(en())e.focus({preventScroll:!0});else{let t=tn(e);e.focus(),nn(t)}}var $t=null;function en(){if($t==null){$t=!1;try{document.createElement(`div`).focus({get preventScroll(){return $t=!0,!0}})}catch{}}return $t}function tn(e){let t=e.parentNode,n=[],r=document.scrollingElement||document.documentElement;for(;t instanceof HTMLElement&&t!==r;)(t.offsetHeight<t.scrollHeight||t.offsetWidth<t.scrollWidth)&&n.push({element:t,scrollTop:t.scrollTop,scrollLeft:t.scrollLeft}),t=t.parentNode;return r instanceof HTMLElement&&n.push({element:r,scrollTop:r.scrollTop,scrollLeft:r.scrollLeft}),n}function nn(e){for(let{element:t,scrollTop:n,scrollLeft:r}of e)t.scrollTop=n,t.scrollLeft=r}var rn=[`input:not([type='hidden']):not([disabled])`,`select:not([disabled])`,`textarea:not([disabled])`,`button:not([disabled])`,`a[href]`,`area[href]`,`[tabindex]`,`iframe`,`object`,`embed`,`audio[controls]`,`video[controls]`,`[contenteditable]:not([contenteditable='false'])`],an=[...rn,`[tabindex]:not([tabindex="-1"]):not([disabled])`],on=`${rn.join(`:not([hidden]),`)},[tabindex]:not([disabled]):not([hidden])`,sn=an.join(`:not([hidden]):not([tabindex="-1"]),`);function cn(e,t){let n=Array.from(e.querySelectorAll(on)).filter(ln);return t&&ln(e)&&n.unshift(e),n.forEach((e,t)=>{if(Ut(e)&&e.contentDocument){let r=e.contentDocument.body,i=cn(r,!1);n.splice(t,1,...i)}}),n}function ln(e){return un(e)&&!dn(e)}function un(e){return e.matches(on)&&fn(e)}function dn(e){return Number.parseInt(e.getAttribute(`tabindex`)||`0`,10)<0}function fn(e,t){return e.nodeName!==`#comment`&&pn(e)&&mn(e,t)&&(!e.parentElement||fn(e.parentElement,e))}function pn(e){if(!(e instanceof HTMLElement)&&!(e instanceof SVGElement))return!1;let{display:t,visibility:n}=e.style,r=t!==`none`&&n!==`hidden`&&n!==`collapse`;if(r){if(!e.ownerDocument.defaultView)return r;let{getComputedStyle:t}=e.ownerDocument.defaultView,{display:n,visibility:i}=t(e);r=n!==`none`&&i!==`hidden`&&i!==`collapse`}return r}function mn(e,t){return!e.hasAttribute(`hidden`)&&(e.nodeName===`DETAILS`&&t&&t.nodeName!==`SUMMARY`?e.hasAttribute(`open`):!0)}function hn(e,t,n){let r=t?.tabbable?sn:on,i=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode(e){return t?.from?.contains(e)?NodeFilter.FILTER_REJECT:e.matches(r)&&fn(e)&&(!t?.accept||t.accept(e))?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}});return t?.from&&(i.currentNode=t.from),i}function gn(e){let t=e;for(;t&&!_n(t);)t=t.parentElement;return t||document.scrollingElement||document.documentElement}function _n(e){let t=window.getComputedStyle(e);return/(auto|scroll)/.test(t.overflow+t.overflowX+t.overflowY)}function vn(){}function yn(e,t){let[n,r]=e,i=!1,a=t.length;for(let e=a,o=0,s=e-1;o<e;s=o++){let[a,c]=t[o],[l,u]=t[s],[,d]=t[s===0?e-1:s-1]||[0,0],f=(c-u)*(n-a)-(a-l)*(r-c);if(u<c){if(r>=u&&r<c){if(f===0)return!0;f>0&&(r===u?r>d&&(i=!i):i=!i)}}else if(c<u){if(r>c&&r<=u){if(f===0)return!0;f<0&&(r===u?r<d&&(i=!i):i=!i)}}else if(r===c&&(n>=l&&n<=a||n>=a&&n<=l))return!0}return i}function Y(e,t){return j(e,t)}var bn=new Map,xn=new Set;function Sn(){if(typeof window>`u`)return;let e=e=>{if(!e.target)return;let n=bn.get(e.target);n||(n=new Set,bn.set(e.target,n),e.target.addEventListener(`transitioncancel`,t)),n.add(e.propertyName)},t=e=>{if(!e.target)return;let n=bn.get(e.target);if(n&&(n.delete(e.propertyName),n.size===0&&(e.target.removeEventListener(`transitioncancel`,t),bn.delete(e.target)),bn.size===0)){for(let e of xn)e();xn.clear()}};document.body.addEventListener(`transitionrun`,e),document.body.addEventListener(`transitionend`,t)}typeof document<`u`&&(document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,Sn):Sn());function Cn(e,t){let n=wn(e,t,`left`),r=wn(e,t,`top`),i=t.offsetWidth,a=t.offsetHeight,o=e.scrollLeft,s=e.scrollTop,c=o+e.offsetWidth,l=s+e.offsetHeight;n<=o?o=n:n+i>c&&(o+=n+i-c),r<=s?s=r:r+a>l&&(s+=r+a-l),e.scrollLeft=o,e.scrollTop=s}function wn(e,t,n){let r=n===`left`?`offsetLeft`:`offsetTop`,i=0;for(;t.offsetParent&&(i+=t[r],t.offsetParent!==e);){if(t.offsetParent.contains(e)){i-=e[r];break}t=t.offsetParent}return i}function Tn(e,t){if(document.contains(e)){let t=document.scrollingElement||document.documentElement;if(window.getComputedStyle(t).overflow!==`hidden`){let{left:t,top:n}=e.getBoundingClientRect();e?.scrollIntoView?.({block:`nearest`});let{left:r,top:i}=e.getBoundingClientRect();(Math.abs(t-r)>1||Math.abs(n-i)>1)&&e.scrollIntoView?.({block:`nearest`})}else{let n=gn(e);for(;e&&n&&e!==t&&n!==t;)Cn(n,e),e=n,n=gn(e)}}}var En={border:`0`,clip:`rect(0 0 0 0)`,"clip-path":`inset(50%)`,height:`1px`,margin:`0 -1px -1px 0`,overflow:`hidden`,padding:`0`,position:`absolute`,width:`1px`,"white-space":`nowrap`};function Dn(e,t){let[n,r]=T(On(t?.()));return I(()=>{r(e()?.tagName.toLowerCase()||On(t?.()))}),n}function On(e){return It(e)?e:void 0}function X(e){let[t,r]=n(e,[`as`]);if(!t.as)throw Error("[kobalte]: Polymorphic is missing the required `as` prop.");return B(_,j(r,{get component(){return t.as}}))}var kn=Object.defineProperty,An=(e,t)=>{for(var n in t)kn(e,n,{get:t[n],enumerable:!0})};An({},{Button:()=>Pn,Root:()=>Nn});var jn=[`button`,`color`,`file`,`image`,`reset`,`submit`];function Mn(e){let t=e.tagName.toLowerCase();return t===`button`?!0:t===`input`&&e.type?jn.indexOf(e.type)!==-1:!1}function Nn(e){let t,[r,i]=n(Y({type:`button`},e),[`ref`,`type`,`disabled`]),a=Dn(()=>t,()=>`button`),o=P(()=>{let e=a();return e==null?!1:Mn({tagName:e,type:r.type})}),s=P(()=>a()===`input`),c=P(()=>a()===`a`&&t?.getAttribute(`href`)!=null);return B(X,j({as:`button`,ref(e){let n=pt(e=>t=e,r.ref);typeof n==`function`&&n(e)},get type(){return o()||s()?r.type:void 0},get role(){return!o()&&!c()?`button`:void 0},get tabIndex(){return!o()&&!c()&&!r.disabled?0:void 0},get disabled(){return o()||s()?r.disabled:void 0},get"aria-disabled"(){return!o()&&!s()&&r.disabled?!0:void 0},get"data-disabled"(){return r.disabled?``:void 0}},i))}var Pn=Nn;function Fn(e){let[t,n]=T(e.defaultValue?.()),r=P(()=>e.value?.()!==void 0),i=P(()=>r()?e.value?.():t());return[i,t=>{C(()=>{let a=me(t,i());return Object.is(a,i())||(r()||n(a),e.onChange?.(a)),a})}]}function In(e){let[t,n]=Fn(e);return[()=>t()??!1,n]}function Ln(e){let[t,n]=Fn(e);return[()=>t()??[],n]}function Rn(e={}){let[t,n]=In({value:()=>H(e.isSelected),defaultValue:()=>!!H(e.defaultIsSelected),onChange:t=>e.onSelectedChange?.(t)});return{isSelected:t,setIsSelected:t=>{!H(e.isReadOnly)&&!H(e.isDisabled)&&n(t)},toggle:()=>{!H(e.isReadOnly)&&!H(e.isDisabled)&&n(!t())}}}function zn(e){let t=e.startIndex??0,n=e.startLevel??0,r=[],i=t=>{if(t==null)return``;let n=e.getKey??`key`,r=It(n)?t[n]:n(t);return r==null?``:String(r)},a=t=>{if(t==null)return``;let n=e.getTextValue??`textValue`,r=It(n)?t[n]:n(t);return r==null?``:String(r)},o=t=>{if(t==null)return!1;let n=e.getDisabled??`disabled`;return(It(n)?t[n]:n(t))??!1},s=t=>{if(t!=null)return It(e.getSectionChildren)?t[e.getSectionChildren]:e.getSectionChildren?.(t)};for(let c of e.dataSource){if(It(c)||Ft(c)){r.push({type:`item`,rawValue:c,key:String(c),textValue:String(c),disabled:o(c),level:n,index:t}),t++;continue}if(s(c)!=null){r.push({type:`section`,rawValue:c,key:``,textValue:``,disabled:!1,level:n,index:t}),t++;let i=s(c)??[];if(i.length>0){let a=zn({dataSource:i,getKey:e.getKey,getTextValue:e.getTextValue,getDisabled:e.getDisabled,getSectionChildren:e.getSectionChildren,startIndex:t,startLevel:n+1});r.push(...a),t+=a.length}}else r.push({type:`item`,rawValue:c,key:i(c),textValue:a(c),disabled:o(c),level:n,index:t}),t++}return r}function Bn(e,t=[]){return P(()=>{let n=zn({dataSource:H(e.dataSource),getKey:H(e.getKey),getTextValue:H(e.getTextValue),getDisabled:H(e.getDisabled),getSectionChildren:H(e.getSectionChildren)});for(let e=0;e<t.length;e++)t[e]();return e.factory(n)})}var Vn=new Set([`Avst`,`Arab`,`Armi`,`Syrc`,`Samr`,`Mand`,`Thaa`,`Mend`,`Nkoo`,`Adlm`,`Rohg`,`Hebr`]),Hn=new Set([`ae`,`ar`,`arc`,`bcc`,`bqi`,`ckb`,`dv`,`fa`,`glk`,`he`,`ku`,`mzn`,`nqo`,`pnb`,`ps`,`sd`,`ug`,`ur`,`yi`]);function Un(e){if(Intl.Locale){let t=new Intl.Locale(e).maximize().script??``;return Vn.has(t)}let t=e.split(`-`)[0];return Hn.has(t)}function Wn(e){return Un(e)?`rtl`:`ltr`}function Gn(){let e=typeof navigator<`u`&&(navigator.language||navigator.userLanguage)||`en-US`;return{locale:e,direction:Wn(e)}}var Kn=Gn(),qn=new Set;function Jn(){Kn=Gn();for(let e of qn)e(Kn)}function Yn(){let[e,t]=T(Kn),n=P(()=>e());return o(()=>{qn.size===0&&window.addEventListener(`languagechange`,Jn),qn.add(t),g(()=>{qn.delete(t),qn.size===0&&window.removeEventListener(`languagechange`,Jn)})}),{locale:()=>n().locale,direction:()=>n().direction}}var Xn=k();function Zn(){let e=Yn();return L(Xn)||e}var Qn=new Map;function $n(e){let{locale:t}=Zn(),n=P(()=>t()+(e?Object.entries(e).sort((e,t)=>e[0]<t[0]?-1:1).join():``));return P(()=>{let r=n(),i;return Qn.has(r)&&(i=Qn.get(r)),i||(i=new Intl.Collator(t(),e),Qn.set(r,i)),i})}var er=class e extends Set{anchorKey;currentKey;constructor(t,n,r){super(t),t instanceof e?(this.anchorKey=n||t.anchorKey,this.currentKey=r||t.currentKey):(this.anchorKey=n,this.currentKey=r)}};function tr(e){let[t,n]=Fn(e);return[()=>t()??new er,n]}function nr(e){return Xt()?e.altKey:e.ctrlKey}function rr(e){return Kt()?e.metaKey:e.ctrlKey}function ir(e){return new er(e)}function ar(e,t){if(e.size!==t.size)return!1;for(let n of e)if(!t.has(n))return!1;return!0}function or(e){let t=Y({selectionMode:`none`,selectionBehavior:`toggle`},e),[n,r]=T(!1),[i,a]=T(),[o,s]=tr({value:P(()=>{let e=H(t.selectedKeys);return e==null?e:ir(e)}),defaultValue:P(()=>{let e=H(t.defaultSelectedKeys);return e==null?new er:ir(e)}),onChange:e=>t.onSelectionChange?.(e)}),[c,l]=T(H(t.selectionBehavior));return I(()=>{let e=o();H(t.selectionBehavior)===`replace`&&c()===`toggle`&&typeof e==`object`&&e.size===0&&l(`replace`)}),I(()=>{l(H(t.selectionBehavior)??`toggle`)}),{selectionMode:()=>H(t.selectionMode),disallowEmptySelection:()=>H(t.disallowEmptySelection)??!1,selectionBehavior:c,setSelectionBehavior:l,isFocused:n,setFocused:r,focusedKey:i,setFocusedKey:a,selectedKeys:o,setSelectedKeys:e=>{(H(t.allowDuplicateSelectionEvents)||!ar(e,o()))&&s(e)}}}function sr(e){let[t,n]=T(``),[r,i]=T(-1);return{typeSelectHandlers:{onKeyDown:a=>{if(H(e.isDisabled))return;let o=H(e.keyboardDelegate),s=H(e.selectionManager);if(!o.getKeyForSearch)return;let c=cr(a.key);if(!c||a.ctrlKey||a.metaKey)return;c===` `&&t().trim().length>0&&(a.preventDefault(),a.stopPropagation());let l=n(e=>e+c),u=o.getKeyForSearch(l,s.focusedKey())??o.getKeyForSearch(l);u==null&&lr(l)&&(l=l[0],u=o.getKeyForSearch(l,s.focusedKey())??o.getKeyForSearch(l)),u!=null&&(s.setFocusedKey(u),e.onTypeSelect?.(u)),clearTimeout(r()),i(window.setTimeout(()=>n(``),500))}}}}function cr(e){return e.length===1||!/^[A-Z]/i.test(e)?e:``}function lr(e){return e.split(``).every(t=>t===e[0])}function ur(e,t,n){let r=j({selectOnFocus:()=>H(e.selectionManager).selectionBehavior()===`replace`},e),i=()=>t(),{direction:a}=Zn(),s={top:0,left:0};Dt(()=>H(r.isVirtualized)?void 0:i(),`scroll`,()=>{let e=i();e&&(s={top:e.scrollTop,left:e.scrollLeft})});let{typeSelectHandlers:c}=sr({isDisabled:()=>H(r.disallowTypeAhead),keyboardDelegate:()=>H(r.keyboardDelegate),selectionManager:()=>H(r.selectionManager)}),l=()=>H(r.orientation)??`vertical`,u=e=>{q(e,c.onKeyDown),e.altKey&&e.key===`Tab`&&e.preventDefault();let n=t();if(!n?.contains(e.target))return;let i=H(r.selectionManager),o=H(r.selectOnFocus),s=t=>{t!=null&&(i.setFocusedKey(t),e.shiftKey&&i.selectionMode()===`multiple`?i.extendSelection(t):o&&!nr(e)&&i.replaceSelection(t))},u=H(r.keyboardDelegate),d=H(r.shouldFocusWrap),f=i.focusedKey();switch(e.key){case l()===`vertical`?`ArrowDown`:`ArrowRight`:if(u.getKeyBelow){e.preventDefault();let t;t=f==null?u.getFirstKey?.():u.getKeyBelow(f),t==null&&d&&(t=u.getFirstKey?.(f)),s(t)}break;case l()===`vertical`?`ArrowUp`:`ArrowLeft`:if(u.getKeyAbove){e.preventDefault();let t;t=f==null?u.getLastKey?.():u.getKeyAbove(f),t==null&&d&&(t=u.getLastKey?.(f)),s(t)}break;case l()===`vertical`?`ArrowLeft`:`ArrowUp`:if(u.getKeyLeftOf){e.preventDefault();let t=a()===`rtl`,n;n=f==null?t?u.getFirstKey?.():u.getLastKey?.():u.getKeyLeftOf(f),s(n)}break;case l()===`vertical`?`ArrowRight`:`ArrowDown`:if(u.getKeyRightOf){e.preventDefault();let t=a()===`rtl`,n;n=f==null?t?u.getLastKey?.():u.getFirstKey?.():u.getKeyRightOf(f),s(n)}break;case`Home`:if(u.getFirstKey){e.preventDefault();let t=u.getFirstKey(f,rr(e));t!=null&&(i.setFocusedKey(t),rr(e)&&e.shiftKey&&i.selectionMode()===`multiple`?i.extendSelection(t):o&&i.replaceSelection(t))}break;case`End`:if(u.getLastKey){e.preventDefault();let t=u.getLastKey(f,rr(e));t!=null&&(i.setFocusedKey(t),rr(e)&&e.shiftKey&&i.selectionMode()===`multiple`?i.extendSelection(t):o&&i.replaceSelection(t))}break;case`PageDown`:u.getKeyPageBelow&&f!=null&&(e.preventDefault(),s(u.getKeyPageBelow(f)));break;case`PageUp`:u.getKeyPageAbove&&f!=null&&(e.preventDefault(),s(u.getKeyPageAbove(f)));break;case`a`:rr(e)&&i.selectionMode()===`multiple`&&H(r.disallowSelectAll)!==!0&&(e.preventDefault(),i.selectAll());break;case`Escape`:e.defaultPrevented||(e.preventDefault(),H(r.disallowEmptySelection)||i.clearSelection());break;case`Tab`:if(!H(r.allowsTabNavigation)){if(e.shiftKey)n.focus();else{let e=hn(n,{tabbable:!0}),t,r;do r=e.lastChild(),r&&(t=r);while(r);t&&!t.contains(document.activeElement)&&Qt(t)}break}}},d=e=>{let t=H(r.selectionManager),n=H(r.keyboardDelegate),a=H(r.selectOnFocus);if(t.isFocused()){e.currentTarget.contains(e.target)||t.setFocused(!1);return}if(e.currentTarget.contains(e.target)){if(t.setFocused(!0),t.focusedKey()==null){let r=e=>{e!=null&&(t.setFocusedKey(e),a&&t.replaceSelection(e))},i=e.relatedTarget;i&&e.currentTarget.compareDocumentPosition(i)&Node.DOCUMENT_POSITION_FOLLOWING?r(t.lastSelectedKey()??n.getLastKey?.()):r(t.firstSelectedKey()??n.getFirstKey?.())}else if(!H(r.isVirtualized)){let e=i();if(e){e.scrollTop=s.top,e.scrollLeft=s.left;let n=e.querySelector(`[data-key="${t.focusedKey()}"]`);n&&(Qt(n),Cn(e,n))}}}},f=e=>{let t=H(r.selectionManager);e.currentTarget.contains(e.relatedTarget)||t.setFocused(!1)},p=e=>{i()===e.target&&e.preventDefault()},h=()=>{let e=H(r.autoFocus);if(!e)return;let n=H(r.selectionManager),i=H(r.keyboardDelegate),a;e===`first`&&(a=i.getFirstKey?.()),e===`last`&&(a=i.getLastKey?.());let o=n.selectedKeys();o.size&&(a=o.values().next().value),n.setFocused(!0),n.setFocusedKey(a);let s=t();s&&a==null&&!H(r.shouldUseVirtualFocus)&&Qt(s)};return o(()=>{r.deferAutoFocus?setTimeout(h,0):h()}),I(m([i,()=>H(r.isVirtualized),()=>H(r.selectionManager).focusedKey()],e=>{let[t,n,i]=e;if(n)i&&r.scrollToKey?.(i);else if(i&&t){let e=t.querySelector(`[data-key="${i}"]`);e&&Cn(t,e)}})),{tabIndex:P(()=>{if(!H(r.shouldUseVirtualFocus))return H(r.selectionManager).focusedKey()==null?0:-1}),onKeyDown:u,onMouseDown:p,onFocusIn:d,onFocusOut:f}}function dr(e,t){let n=()=>H(e.selectionManager),r=()=>H(e.key),i=()=>H(e.shouldUseVirtualFocus),a=e=>{n().selectionMode()!==`none`&&(n().selectionMode()===`single`?n().isSelected(r())&&!n().disallowEmptySelection()?n().toggleSelection(r()):n().replaceSelection(r()):e?.shiftKey?n().extendSelection(r()):n().selectionBehavior()===`toggle`||rr(e)||`pointerType`in e&&e.pointerType===`touch`?n().toggleSelection(r()):n().replaceSelection(r()))},o=()=>n().isSelected(r()),s=()=>H(e.disabled)||n().isDisabled(r()),c=()=>!s()&&n().canSelectItem(r()),l=null,u=t=>{c()&&(l=t.pointerType,t.pointerType===`mouse`&&t.button===0&&!H(e.shouldSelectOnPressUp)&&a(t))},d=t=>{c()&&t.pointerType===`mouse`&&t.button===0&&H(e.shouldSelectOnPressUp)&&H(e.allowsDifferentPressOrigin)&&a(t)},f=t=>{c()&&(H(e.shouldSelectOnPressUp)&&!H(e.allowsDifferentPressOrigin)||l!==`mouse`)&&a(t)},p=e=>{!c()||![`Enter`,` `].includes(e.key)||(nr(e)?n().toggleSelection(r()):a(e))},h=e=>{s()&&e.preventDefault()},g=e=>{let a=t();i()||s()||!a||e.target===a&&n().setFocusedKey(r())},_=P(()=>{if(!(i()||s()))return r()===n().focusedKey()?0:-1}),v=P(()=>H(e.virtualized)?void 0:r());return I(m([t,r,i,()=>n().focusedKey(),()=>n().isFocused()],([t,n,r,i,a])=>{t&&n===i&&a&&!r&&document.activeElement!==t&&(e.focus?e.focus():Qt(t))})),{isSelected:o,isDisabled:s,allowsSelection:c,tabIndex:_,dataKey:v,onPointerDown:u,onPointerUp:d,onClick:f,onKeyDown:p,onMouseDown:h,onFocus:g}}var fr=class{collection;state;constructor(e,t){this.collection=e,this.state=t}selectionMode(){return this.state.selectionMode()}disallowEmptySelection(){return this.state.disallowEmptySelection()}selectionBehavior(){return this.state.selectionBehavior()}setSelectionBehavior(e){this.state.setSelectionBehavior(e)}isFocused(){return this.state.isFocused()}setFocused(e){this.state.setFocused(e)}focusedKey(){return this.state.focusedKey()}setFocusedKey(e){(e==null||this.collection().getItem(e))&&this.state.setFocusedKey(e)}selectedKeys(){return this.state.selectedKeys()}isSelected(e){if(this.state.selectionMode()===`none`)return!1;let t=this.getKey(e);return t==null?!1:this.state.selectedKeys().has(t)}isEmpty(){return this.state.selectedKeys().size===0}isSelectAll(){if(this.isEmpty())return!1;let e=this.state.selectedKeys();return this.getAllSelectableKeys().every(t=>e.has(t))}firstSelectedKey(){let e;for(let t of this.state.selectedKeys()){let n=this.collection().getItem(t),r=n?.index!=null&&e?.index!=null&&n.index<e.index;(!e||r)&&(e=n)}return e?.key}lastSelectedKey(){let e;for(let t of this.state.selectedKeys()){let n=this.collection().getItem(t),r=n?.index!=null&&e?.index!=null&&n.index>e.index;(!e||r)&&(e=n)}return e?.key}extendSelection(e){if(this.selectionMode()===`none`)return;if(this.selectionMode()===`single`){this.replaceSelection(e);return}let t=this.getKey(e);if(t==null)return;let n=this.state.selectedKeys(),r=n.anchorKey||t,i=new er(n,r,t);for(let e of this.getKeyRange(r,n.currentKey||t))i.delete(e);for(let e of this.getKeyRange(t,r))this.canSelectItem(e)&&i.add(e);this.state.setSelectedKeys(i)}getKeyRange(e,t){let n=this.collection().getItem(e),r=this.collection().getItem(t);return n&&r?n.index!=null&&r.index!=null&&n.index<=r.index?this.getKeyRangeInternal(e,t):this.getKeyRangeInternal(t,e):[]}getKeyRangeInternal(e,t){let n=[],r=e;for(;r!=null;){let e=this.collection().getItem(r);if(e&&e.type===`item`&&n.push(r),r===t)return n;r=this.collection().getKeyAfter(r)}return[]}getKey(e){let t=this.collection().getItem(e);return t?!t||t.type!==`item`?null:t.key:e}toggleSelection(e){if(this.selectionMode()===`none`)return;if(this.selectionMode()===`single`&&!this.isSelected(e)){this.replaceSelection(e);return}let t=this.getKey(e);if(t==null)return;let n=new er(this.state.selectedKeys());n.has(t)?n.delete(t):this.canSelectItem(t)&&(n.add(t),n.anchorKey=t,n.currentKey=t),!(this.disallowEmptySelection()&&n.size===0)&&this.state.setSelectedKeys(n)}replaceSelection(e){if(this.selectionMode()===`none`)return;let t=this.getKey(e);if(t==null)return;let n=this.canSelectItem(t)?new er([t],t,t):new er;this.state.setSelectedKeys(n)}setSelectedKeys(e){if(this.selectionMode()===`none`)return;let t=new er;for(let n of e){let e=this.getKey(n);if(e!=null&&(t.add(e),this.selectionMode()===`single`))break}this.state.setSelectedKeys(t)}selectAll(){this.selectionMode()===`multiple`&&this.state.setSelectedKeys(new Set(this.getAllSelectableKeys()))}clearSelection(){let e=this.state.selectedKeys();!this.disallowEmptySelection()&&e.size>0&&this.state.setSelectedKeys(new er)}toggleSelectAll(){this.isSelectAll()?this.clearSelection():this.selectAll()}select(e,t){this.selectionMode()!==`none`&&(this.selectionMode()===`single`?this.isSelected(e)&&!this.disallowEmptySelection()?this.toggleSelection(e):this.replaceSelection(e):this.selectionBehavior()===`toggle`||t&&t.pointerType===`touch`?this.toggleSelection(e):this.replaceSelection(e))}isSelectionEqual(e){if(e===this.state.selectedKeys())return!0;let t=this.selectedKeys();if(e.size!==t.size)return!1;for(let n of e)if(!t.has(n))return!1;for(let n of t)if(!e.has(n))return!1;return!0}canSelectItem(e){if(this.state.selectionMode()===`none`)return!1;let t=this.collection().getItem(e);return t!=null&&!t.disabled}isDisabled(e){let t=this.collection().getItem(e);return!t||t.disabled}getAllSelectableKeys(){let e=[];return(t=>{for(;t!=null;){if(this.canSelectItem(t)){let n=this.collection().getItem(t);if(!n)continue;n.type===`item`&&e.push(t)}t=this.collection().getKeyAfter(t)}})(this.collection().getFirstKey()),e}},pr=class{keyMap=new Map;iterable;firstKey;lastKey;constructor(e){this.iterable=e;for(let t of e)this.keyMap.set(t.key,t);if(this.keyMap.size===0)return;let t,n=0;for(let[e,r]of this.keyMap)t?(t.nextKey=e,r.prevKey=t.key):(this.firstKey=e,r.prevKey=void 0),r.type===`item`&&(r.index=n++),t=r,t.nextKey=void 0;this.lastKey=t.key}*[Symbol.iterator](){yield*this.iterable}getSize(){return this.keyMap.size}getKeys(){return this.keyMap.keys()}getKeyBefore(e){return this.keyMap.get(e)?.prevKey}getKeyAfter(e){return this.keyMap.get(e)?.nextKey}getFirstKey(){return this.firstKey}getLastKey(){return this.lastKey}getItem(e){return this.keyMap.get(e)}at(e){let t=[...this.getKeys()];return this.getItem(t[e])}};function mr(e){let t=or(e),n=Bn({dataSource:()=>H(e.dataSource),getKey:()=>H(e.getKey),getTextValue:()=>H(e.getTextValue),getDisabled:()=>H(e.getDisabled),getSectionChildren:()=>H(e.getSectionChildren),factory:t=>e.filter?new pr(e.filter(t)):new pr(t)},[()=>e.filter]),r=new fr(n,t);return te(()=>{let e=t.focusedKey();e!=null&&!n().getItem(e)&&t.setFocusedKey(void 0)}),{collection:n,selectionManager:()=>r}}var hr=k();function gr(){return L(hr)}function _r(){let e=gr();if(e===void 0)throw Error("[kobalte]: `useDomCollectionContext` must be used within a `DomCollectionProvider` component");return e}function vr(e,t){return!!(t.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_PRECEDING)}function yr(e,t){let n=t.ref();if(!n)return-1;let r=e.length;if(!r)return-1;for(;r--;){let t=e[r]?.ref();if(t&&vr(t,n))return r+1}return 0}function br(e){let t=e.map((e,t)=>[t,e]),n=!1;return t.sort(([e,t],[r,i])=>{let a=t.ref(),o=i.ref();return a===o||!a||!o?0:vr(a,o)?(e>r&&(n=!0),-1):(e<r&&(n=!0),1)}),n?t.map(([e,t])=>t):e}function xr(e,t){let n=br(e);e!==n&&t(n)}function Sr(e){let t=e[0],n=e[e.length-1]?.ref(),r=t?.ref()?.parentElement;for(;r;){if(n&&r.contains(n))return r;r=r.parentElement}return Ht(r).body}function Cr(e,t){I(()=>{let n=setTimeout(()=>{xr(e(),t)});g(()=>clearTimeout(n))})}function wr(e,t){if(typeof IntersectionObserver!=`function`){Cr(e,t);return}let n=[];I(()=>{let r=()=>{let r=!!n.length;n=e(),r&&xr(e(),t)},i=Sr(e()),a=new IntersectionObserver(r,{root:i});for(let t of e()){let e=t.ref();e&&a.observe(e)}g(()=>a.disconnect())})}function Tr(e={}){let[t,n]=Ln({value:()=>H(e.items),onChange:t=>e.onItemsChange?.(t)});wr(t,n);let r=e=>(n(t=>Nt(t,e,yr(t,e))),()=>{n(t=>{let n=t.filter(t=>t.ref()!==e.ref());return t.length===n.length?t:n})});return{DomCollectionProvider:e=>B(hr.Provider,{value:{registerItem:r},get children(){return e.children}})}}function Er(e){let t=_r(),n=Y({shouldRegisterItem:!0},e);I(()=>{n.shouldRegisterItem&&g(t.registerItem(n.getItem()))})}var Dr=[`top`,`right`,`bottom`,`left`],Or=Math.min,kr=Math.max,Ar=Math.round,jr=Math.floor,Mr=e=>({x:e,y:e}),Nr={left:`right`,right:`left`,bottom:`top`,top:`bottom`};function Pr(e,t,n){return kr(e,Or(t,n))}function Fr(e,t){return typeof e==`function`?e(t):e}function Ir(e){return e.split(`-`)[0]}function Lr(e){return e.split(`-`)[1]}function Rr(e){return e===`x`?`y`:`x`}function zr(e){return e===`y`?`height`:`width`}function Br(e){let t=e[0];return t===`t`||t===`b`?`y`:`x`}function Vr(e){return Rr(Br(e))}function Hr(e,t,n){n===void 0&&(n=!1);let r=Lr(e),i=Vr(e),a=zr(i),o=i===`x`?r===(n?`end`:`start`)?`right`:`left`:r===`start`?`bottom`:`top`;return t.reference[a]>t.floating[a]&&(o=Zr(o)),[o,Zr(o)]}function Ur(e){let t=Zr(e);return[Wr(e),t,Wr(t)]}function Wr(e){return e.includes(`start`)?e.replace(`start`,`end`):e.replace(`end`,`start`)}var Gr=[`left`,`right`],Kr=[`right`,`left`],qr=[`top`,`bottom`],Jr=[`bottom`,`top`];function Yr(e,t,n){switch(e){case`top`:case`bottom`:return n?t?Kr:Gr:t?Gr:Kr;case`left`:case`right`:return t?qr:Jr;default:return[]}}function Xr(e,t,n,r){let i=Lr(e),a=Yr(Ir(e),n===`start`,r);return i&&(a=a.map(e=>e+`-`+i),t&&(a=a.concat(a.map(Wr)))),a}function Zr(e){let t=Ir(e);return Nr[t]+e.slice(t.length)}function Qr(e){return{top:0,right:0,bottom:0,left:0,...e}}function $r(e){return typeof e==`number`?{top:e,right:e,bottom:e,left:e}:Qr(e)}function ei(e){let{x:t,y:n,width:r,height:i}=e;return{width:r,height:i,top:n,left:t,right:t+r,bottom:n+i,x:t,y:n}}function ti(e,t,n){let{reference:r,floating:i}=e,a=Br(t),o=Vr(t),s=zr(o),c=Ir(t),l=a===`y`,u=r.x+r.width/2-i.width/2,d=r.y+r.height/2-i.height/2,f=r[s]/2-i[s]/2,p;switch(c){case`top`:p={x:u,y:r.y-i.height};break;case`bottom`:p={x:u,y:r.y+r.height};break;case`right`:p={x:r.x+r.width,y:d};break;case`left`:p={x:r.x-i.width,y:d};break;default:p={x:r.x,y:r.y}}switch(Lr(t)){case`start`:p[o]-=f*(n&&l?-1:1);break;case`end`:p[o]+=f*(n&&l?-1:1);break}return p}async function ni(e,t){t===void 0&&(t={});let{x:n,y:r,platform:i,rects:a,elements:o,strategy:s}=e,{boundary:c=`clippingAncestors`,rootBoundary:l=`viewport`,elementContext:u=`floating`,altBoundary:d=!1,padding:f=0}=Fr(t,e),p=$r(f),m=o[d?u===`floating`?`reference`:`floating`:u],h=ei(await i.getClippingRect({element:await(i.isElement==null?void 0:i.isElement(m))??!0?m:m.contextElement||await(i.getDocumentElement==null?void 0:i.getDocumentElement(o.floating)),boundary:c,rootBoundary:l,strategy:s})),g=u===`floating`?{x:n,y:r,width:a.floating.width,height:a.floating.height}:a.reference,_=await(i.getOffsetParent==null?void 0:i.getOffsetParent(o.floating)),v=await(i.isElement==null?void 0:i.isElement(_))&&await(i.getScale==null?void 0:i.getScale(_))||{x:1,y:1},y=ei(i.convertOffsetParentRelativeRectToViewportRelativeRect?await i.convertOffsetParentRelativeRectToViewportRelativeRect({elements:o,rect:g,offsetParent:_,strategy:s}):g);return{top:(h.top-y.top+p.top)/v.y,bottom:(y.bottom-h.bottom+p.bottom)/v.y,left:(h.left-y.left+p.left)/v.x,right:(y.right-h.right+p.right)/v.x}}var ri=50,ii=async(e,t,n)=>{let{placement:r=`bottom`,strategy:i=`absolute`,middleware:a=[],platform:o}=n,s=o.detectOverflow?o:{...o,detectOverflow:ni},c=await(o.isRTL==null?void 0:o.isRTL(t)),l=await o.getElementRects({reference:e,floating:t,strategy:i}),{x:u,y:d}=ti(l,r,c),f=r,p=0,m={};for(let n=0;n<a.length;n++){let h=a[n];if(!h)continue;let{name:g,fn:_}=h,{x:v,y,data:b,reset:x}=await _({x:u,y:d,initialPlacement:r,placement:f,strategy:i,middlewareData:m,rects:l,platform:s,elements:{reference:e,floating:t}});u=v??u,d=y??d,m[g]={...m[g],...b},x&&p<ri&&(p++,typeof x==`object`&&(x.placement&&(f=x.placement),x.rects&&(l=x.rects===!0?await o.getElementRects({reference:e,floating:t,strategy:i}):x.rects),{x:u,y:d}=ti(l,f,c)),n=-1)}return{x:u,y:d,placement:f,strategy:i,middlewareData:m}},ai=e=>({name:`arrow`,options:e,async fn(t){let{x:n,y:r,placement:i,rects:a,platform:o,elements:s,middlewareData:c}=t,{element:l,padding:u=0}=Fr(e,t)||{};if(l==null)return{};let d=$r(u),f={x:n,y:r},p=Vr(i),m=zr(p),h=await o.getDimensions(l),g=p===`y`,_=g?`top`:`left`,v=g?`bottom`:`right`,y=g?`clientHeight`:`clientWidth`,b=a.reference[m]+a.reference[p]-f[p]-a.floating[m],x=f[p]-a.reference[p],S=await(o.getOffsetParent==null?void 0:o.getOffsetParent(l)),C=S?S[y]:0;(!C||!await(o.isElement==null?void 0:o.isElement(S)))&&(C=s.floating[y]||a.floating[m]);let w=b/2-x/2,T=C/2-h[m]/2-1,ee=Or(d[_],T),E=Or(d[v],T),D=ee,te=C-h[m]-E,O=C/2-h[m]/2+w,k=Pr(D,O,te),ne=!c.arrow&&Lr(i)!=null&&O!==k&&a.reference[m]/2-(O<D?ee:E)-h[m]/2<0,A=ne?O<D?O-D:O-te:0;return{[p]:f[p]+A,data:{[p]:k,centerOffset:O-k-A,...ne&&{alignmentOffset:A}},reset:ne}}}),oi=function(e){return e===void 0&&(e={}),{name:`flip`,options:e,async fn(t){var n;let{placement:r,middlewareData:i,rects:a,initialPlacement:o,platform:s,elements:c}=t,{mainAxis:l=!0,crossAxis:u=!0,fallbackPlacements:d,fallbackStrategy:f=`bestFit`,fallbackAxisSideDirection:p=`none`,flipAlignment:m=!0,...h}=Fr(e,t);if((n=i.arrow)!=null&&n.alignmentOffset)return{};let g=Ir(r),_=Br(o),v=Ir(o)===o,y=await(s.isRTL==null?void 0:s.isRTL(c.floating)),b=d||(v||!m?[Zr(o)]:Ur(o)),x=p!==`none`;!d&&x&&b.push(...Xr(o,m,p,y));let S=[o,...b],C=await s.detectOverflow(t,h),w=[],T=i.flip?.overflows||[];if(l&&w.push(C[g]),u){let e=Hr(r,a,y);w.push(C[e[0]],C[e[1]])}if(T=[...T,{placement:r,overflows:w}],!w.every(e=>e<=0)){let e=(i.flip?.index||0)+1,t=S[e];if(t&&(!(u===`alignment`&&_!==Br(t))||T.every(e=>Br(e.placement)===_?e.overflows[0]>0:!0)))return{data:{index:e,overflows:T},reset:{placement:t}};let n=T.filter(e=>e.overflows[0]<=0).sort((e,t)=>e.overflows[1]-t.overflows[1])[0]?.placement;if(!n)switch(f){case`bestFit`:{let e=T.filter(e=>{if(x){let t=Br(e.placement);return t===_||t===`y`}return!0}).map(e=>[e.placement,e.overflows.filter(e=>e>0).reduce((e,t)=>e+t,0)]).sort((e,t)=>e[1]-t[1])[0]?.[0];e&&(n=e);break}case`initialPlacement`:n=o;break}if(r!==n)return{reset:{placement:n}}}return{}}}};function si(e,t){return{top:e.top-t.height,right:e.right-t.width,bottom:e.bottom-t.height,left:e.left-t.width}}function ci(e){return Dr.some(t=>e[t]>=0)}var li=function(e){return e===void 0&&(e={}),{name:`hide`,options:e,async fn(t){let{rects:n,platform:r}=t,{strategy:i=`referenceHidden`,...a}=Fr(e,t);switch(i){case`referenceHidden`:{let e=si(await r.detectOverflow(t,{...a,elementContext:`reference`}),n.reference);return{data:{referenceHiddenOffsets:e,referenceHidden:ci(e)}}}case`escaped`:{let e=si(await r.detectOverflow(t,{...a,altBoundary:!0}),n.floating);return{data:{escapedOffsets:e,escaped:ci(e)}}}default:return{}}}}},ui=new Set([`left`,`top`]);async function di(e,t){let{placement:n,platform:r,elements:i}=e,a=await(r.isRTL==null?void 0:r.isRTL(i.floating)),o=Ir(n),s=Lr(n),c=Br(n)===`y`,l=ui.has(o)?-1:1,u=a&&c?-1:1,d=Fr(t,e),{mainAxis:f,crossAxis:p,alignmentAxis:m}=typeof d==`number`?{mainAxis:d,crossAxis:0,alignmentAxis:null}:{mainAxis:d.mainAxis||0,crossAxis:d.crossAxis||0,alignmentAxis:d.alignmentAxis};return s&&typeof m==`number`&&(p=s===`end`?m*-1:m),c?{x:p*u,y:f*l}:{x:f*l,y:p*u}}var fi=function(e){return e===void 0&&(e=0),{name:`offset`,options:e,async fn(t){var n;let{x:r,y:i,placement:a,middlewareData:o}=t,s=await di(t,e);return a===o.offset?.placement&&(n=o.arrow)!=null&&n.alignmentOffset?{}:{x:r+s.x,y:i+s.y,data:{...s,placement:a}}}}},pi=function(e){return e===void 0&&(e={}),{name:`shift`,options:e,async fn(t){let{x:n,y:r,placement:i,platform:a}=t,{mainAxis:o=!0,crossAxis:s=!1,limiter:c={fn:e=>{let{x:t,y:n}=e;return{x:t,y:n}}},...l}=Fr(e,t),u={x:n,y:r},d=await a.detectOverflow(t,l),f=Br(Ir(i)),p=Rr(f),m=u[p],h=u[f];if(o){let e=p===`y`?`top`:`left`,t=p===`y`?`bottom`:`right`,n=m+d[e],r=m-d[t];m=Pr(n,m,r)}if(s){let e=f===`y`?`top`:`left`,t=f===`y`?`bottom`:`right`,n=h+d[e],r=h-d[t];h=Pr(n,h,r)}let g=c.fn({...t,[p]:m,[f]:h});return{...g,data:{x:g.x-n,y:g.y-r,enabled:{[p]:o,[f]:s}}}}}},mi=function(e){return e===void 0&&(e={}),{name:`size`,options:e,async fn(t){var n,r;let{placement:i,rects:a,platform:o,elements:s}=t,{apply:c=()=>{},...l}=Fr(e,t),u=await o.detectOverflow(t,l),d=Ir(i),f=Lr(i),p=Br(i)===`y`,{width:m,height:h}=a.floating,g,_;d===`top`||d===`bottom`?(g=d,_=f===(await(o.isRTL==null?void 0:o.isRTL(s.floating))?`start`:`end`)?`left`:`right`):(_=d,g=f===`end`?`top`:`bottom`);let v=h-u.top-u.bottom,y=m-u.left-u.right,b=Or(h-u[g],v),x=Or(m-u[_],y),S=!t.middlewareData.shift,C=b,w=x;if((n=t.middlewareData.shift)!=null&&n.enabled.x&&(w=y),(r=t.middlewareData.shift)!=null&&r.enabled.y&&(C=v),S&&!f){let e=kr(u.left,0),t=kr(u.right,0),n=kr(u.top,0),r=kr(u.bottom,0);p?w=m-2*(e!==0||t!==0?e+t:kr(u.left,u.right)):C=h-2*(n!==0||r!==0?n+r:kr(u.top,u.bottom))}await c({...t,availableWidth:w,availableHeight:C});let T=await o.getDimensions(s.floating);return m!==T.width||h!==T.height?{reset:{rects:!0}}:{}}}};function hi(){return typeof window<`u`}function gi(e){return yi(e)?(e.nodeName||``).toLowerCase():`#document`}function _i(e){var t;return(e==null||(t=e.ownerDocument)==null?void 0:t.defaultView)||window}function vi(e){return((yi(e)?e.ownerDocument:e.document)||window.document)?.documentElement}function yi(e){return hi()?e instanceof Node||e instanceof _i(e).Node:!1}function bi(e){return hi()?e instanceof Element||e instanceof _i(e).Element:!1}function xi(e){return hi()?e instanceof HTMLElement||e instanceof _i(e).HTMLElement:!1}function Si(e){return!hi()||typeof ShadowRoot>`u`?!1:e instanceof ShadowRoot||e instanceof _i(e).ShadowRoot}function Ci(e){let{overflow:t,overflowX:n,overflowY:r,display:i}=Pi(e);return/auto|scroll|overlay|hidden|clip/.test(t+r+n)&&i!==`inline`&&i!==`contents`}function wi(e){return/^(table|td|th)$/.test(gi(e))}function Ti(e){try{if(e.matches(`:popover-open`))return!0}catch{}try{return e.matches(`:modal`)}catch{return!1}}var Ei=/transform|translate|scale|rotate|perspective|filter/,Di=/paint|layout|strict|content/,Oi=e=>!!e&&e!==`none`,ki;function Ai(e){let t=bi(e)?Pi(e):e;return Oi(t.transform)||Oi(t.translate)||Oi(t.scale)||Oi(t.rotate)||Oi(t.perspective)||!Mi()&&(Oi(t.backdropFilter)||Oi(t.filter))||Ei.test(t.willChange||``)||Di.test(t.contain||``)}function ji(e){let t=Ii(e);for(;xi(t)&&!Ni(t);){if(Ai(t))return t;if(Ti(t))return null;t=Ii(t)}return null}function Mi(){return ki??=typeof CSS<`u`&&CSS.supports&&CSS.supports(`-webkit-backdrop-filter`,`none`),ki}function Ni(e){return/^(html|body|#document)$/.test(gi(e))}function Pi(e){return _i(e).getComputedStyle(e)}function Fi(e){return bi(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:{scrollLeft:e.scrollX,scrollTop:e.scrollY}}function Ii(e){if(gi(e)===`html`)return e;let t=e.assignedSlot||e.parentNode||Si(e)&&e.host||vi(e);return Si(t)?t.host:t}function Li(e){let t=Ii(e);return Ni(t)?e.ownerDocument?e.ownerDocument.body:e.body:xi(t)&&Ci(t)?t:Li(t)}function Ri(e,t,n){t===void 0&&(t=[]),n===void 0&&(n=!0);let r=Li(e),i=r===e.ownerDocument?.body,a=_i(r);if(i){let e=zi(a);return t.concat(a,a.visualViewport||[],Ci(r)?r:[],e&&n?Ri(e):[])}else return t.concat(r,Ri(r,[],n))}function zi(e){return e.parent&&Object.getPrototypeOf(e.parent)?e.frameElement:null}function Bi(e){let t=Pi(e),n=parseFloat(t.width)||0,r=parseFloat(t.height)||0,i=xi(e),a=i?e.offsetWidth:n,o=i?e.offsetHeight:r,s=Ar(n)!==a||Ar(r)!==o;return s&&(n=a,r=o),{width:n,height:r,$:s}}function Vi(e){return bi(e)?e:e.contextElement}function Hi(e){let t=Vi(e);if(!xi(t))return Mr(1);let n=t.getBoundingClientRect(),{width:r,height:i,$:a}=Bi(t),o=(a?Ar(n.width):n.width)/r,s=(a?Ar(n.height):n.height)/i;return(!o||!Number.isFinite(o))&&(o=1),(!s||!Number.isFinite(s))&&(s=1),{x:o,y:s}}var Ui=Mr(0);function Wi(e){let t=_i(e);return!Mi()||!t.visualViewport?Ui:{x:t.visualViewport.offsetLeft,y:t.visualViewport.offsetTop}}function Gi(e,t,n){return t===void 0&&(t=!1),!n||t&&n!==_i(e)?!1:t}function Ki(e,t,n,r){t===void 0&&(t=!1),n===void 0&&(n=!1);let i=e.getBoundingClientRect(),a=Vi(e),o=Mr(1);t&&(r?bi(r)&&(o=Hi(r)):o=Hi(e));let s=Gi(a,n,r)?Wi(a):Mr(0),c=(i.left+s.x)/o.x,l=(i.top+s.y)/o.y,u=i.width/o.x,d=i.height/o.y;if(a){let e=_i(a),t=r&&bi(r)?_i(r):r,n=e,i=zi(n);for(;i&&r&&t!==n;){let e=Hi(i),t=i.getBoundingClientRect(),r=Pi(i),a=t.left+(i.clientLeft+parseFloat(r.paddingLeft))*e.x,o=t.top+(i.clientTop+parseFloat(r.paddingTop))*e.y;c*=e.x,l*=e.y,u*=e.x,d*=e.y,c+=a,l+=o,n=_i(i),i=zi(n)}}return ei({width:u,height:d,x:c,y:l})}function qi(e,t){let n=Fi(e).scrollLeft;return t?t.left+n:Ki(vi(e)).left+n}function Ji(e,t){let n=e.getBoundingClientRect();return{x:n.left+t.scrollLeft-qi(e,n),y:n.top+t.scrollTop}}function Yi(e){let{elements:t,rect:n,offsetParent:r,strategy:i}=e,a=i===`fixed`,o=vi(r),s=t?Ti(t.floating):!1;if(r===o||s&&a)return n;let c={scrollLeft:0,scrollTop:0},l=Mr(1),u=Mr(0),d=xi(r);if((d||!d&&!a)&&((gi(r)!==`body`||Ci(o))&&(c=Fi(r)),d)){let e=Ki(r);l=Hi(r),u.x=e.x+r.clientLeft,u.y=e.y+r.clientTop}let f=o&&!d&&!a?Ji(o,c):Mr(0);return{width:n.width*l.x,height:n.height*l.y,x:n.x*l.x-c.scrollLeft*l.x+u.x+f.x,y:n.y*l.y-c.scrollTop*l.y+u.y+f.y}}function Xi(e){return Array.from(e.getClientRects())}function Zi(e){let t=vi(e),n=Fi(e),r=e.ownerDocument.body,i=kr(t.scrollWidth,t.clientWidth,r.scrollWidth,r.clientWidth),a=kr(t.scrollHeight,t.clientHeight,r.scrollHeight,r.clientHeight),o=-n.scrollLeft+qi(e),s=-n.scrollTop;return Pi(r).direction===`rtl`&&(o+=kr(t.clientWidth,r.clientWidth)-i),{width:i,height:a,x:o,y:s}}var Qi=25;function $i(e,t){let n=_i(e),r=vi(e),i=n.visualViewport,a=r.clientWidth,o=r.clientHeight,s=0,c=0;if(i){a=i.width,o=i.height;let e=Mi();(!e||e&&t===`fixed`)&&(s=i.offsetLeft,c=i.offsetTop)}let l=qi(r);if(l<=0){let e=r.ownerDocument,t=e.body,n=getComputedStyle(t),i=e.compatMode===`CSS1Compat`&&parseFloat(n.marginLeft)+parseFloat(n.marginRight)||0,o=Math.abs(r.clientWidth-t.clientWidth-i);o<=Qi&&(a-=o)}else l<=Qi&&(a+=l);return{width:a,height:o,x:s,y:c}}function ea(e,t){let n=Ki(e,!0,t===`fixed`),r=n.top+e.clientTop,i=n.left+e.clientLeft,a=xi(e)?Hi(e):Mr(1);return{width:e.clientWidth*a.x,height:e.clientHeight*a.y,x:i*a.x,y:r*a.y}}function ta(e,t,n){let r;if(t===`viewport`)r=$i(e,n);else if(t===`document`)r=Zi(vi(e));else if(bi(t))r=ea(t,n);else{let n=Wi(e);r={x:t.x-n.x,y:t.y-n.y,width:t.width,height:t.height}}return ei(r)}function na(e,t){let n=Ii(e);return n===t||!bi(n)||Ni(n)?!1:Pi(n).position===`fixed`||na(n,t)}function ra(e,t){let n=t.get(e);if(n)return n;let r=Ri(e,[],!1).filter(e=>bi(e)&&gi(e)!==`body`),i=null,a=Pi(e).position===`fixed`,o=a?Ii(e):e;for(;bi(o)&&!Ni(o);){let t=Pi(o),n=Ai(o);!n&&t.position===`fixed`&&(i=null),(a?!n&&!i:!n&&t.position===`static`&&i&&(i.position===`absolute`||i.position===`fixed`)||Ci(o)&&!n&&na(e,o))?r=r.filter(e=>e!==o):i=t,o=Ii(o)}return t.set(e,r),r}function ia(e){let{element:t,boundary:n,rootBoundary:r,strategy:i}=e,a=[...n===`clippingAncestors`?Ti(t)?[]:ra(t,this._c):[].concat(n),r],o=ta(t,a[0],i),s=o.top,c=o.right,l=o.bottom,u=o.left;for(let e=1;e<a.length;e++){let n=ta(t,a[e],i);s=kr(n.top,s),c=Or(n.right,c),l=Or(n.bottom,l),u=kr(n.left,u)}return{width:c-u,height:l-s,x:u,y:s}}function aa(e){let{width:t,height:n}=Bi(e);return{width:t,height:n}}function oa(e,t,n){let r=xi(t),i=vi(t),a=n===`fixed`,o=Ki(e,!0,a,t),s={scrollLeft:0,scrollTop:0},c=Mr(0);function l(){c.x=qi(i)}if(r||!r&&!a)if((gi(t)!==`body`||Ci(i))&&(s=Fi(t)),r){let e=Ki(t,!0,a,t);c.x=e.x+t.clientLeft,c.y=e.y+t.clientTop}else i&&l();a&&!r&&i&&l();let u=i&&!r&&!a?Ji(i,s):Mr(0);return{x:o.left+s.scrollLeft-c.x-u.x,y:o.top+s.scrollTop-c.y-u.y,width:o.width,height:o.height}}function sa(e){return Pi(e).position===`static`}function ca(e,t){if(!xi(e)||Pi(e).position===`fixed`)return null;if(t)return t(e);let n=e.offsetParent;return vi(e)===n&&(n=n.ownerDocument.body),n}function la(e,t){let n=_i(e);if(Ti(e))return n;if(!xi(e)){let t=Ii(e);for(;t&&!Ni(t);){if(bi(t)&&!sa(t))return t;t=Ii(t)}return n}let r=ca(e,t);for(;r&&wi(r)&&sa(r);)r=ca(r,t);return r&&Ni(r)&&sa(r)&&!Ai(r)?n:r||ji(e)||n}var ua=async function(e){let t=this.getOffsetParent||la,n=this.getDimensions,r=await n(e.floating);return{reference:oa(e.reference,await t(e.floating),e.strategy),floating:{x:0,y:0,width:r.width,height:r.height}}};function da(e){return Pi(e).direction===`rtl`}var fa={convertOffsetParentRelativeRectToViewportRelativeRect:Yi,getDocumentElement:vi,getClippingRect:ia,getOffsetParent:la,getElementRects:ua,getClientRects:Xi,getDimensions:aa,getScale:Hi,isElement:bi,isRTL:da};function pa(e,t){return e.x===t.x&&e.y===t.y&&e.width===t.width&&e.height===t.height}function ma(e,t){let n=null,r,i=vi(e);function a(){var e;clearTimeout(r),(e=n)==null||e.disconnect(),n=null}function o(s,c){s===void 0&&(s=!1),c===void 0&&(c=1),a();let l=e.getBoundingClientRect(),{left:u,top:d,width:f,height:p}=l;if(s||t(),!f||!p)return;let m=jr(d),h=jr(i.clientWidth-(u+f)),g=jr(i.clientHeight-(d+p)),_=jr(u),v={rootMargin:-m+`px `+-h+`px `+-g+`px `+-_+`px`,threshold:kr(0,Or(1,c))||1},y=!0;function b(t){let n=t[0].intersectionRatio;if(n!==c){if(!y)return o();n?o(!1,n):r=setTimeout(()=>{o(!1,1e-7)},1e3)}n===1&&!pa(l,e.getBoundingClientRect())&&o(),y=!1}try{n=new IntersectionObserver(b,{...v,root:i.ownerDocument})}catch{n=new IntersectionObserver(b,v)}n.observe(e)}return o(!0),a}function ha(e,t,n,r){r===void 0&&(r={});let{ancestorScroll:i=!0,ancestorResize:a=!0,elementResize:o=typeof ResizeObserver==`function`,layoutShift:s=typeof IntersectionObserver==`function`,animationFrame:c=!1}=r,l=Vi(e),u=i||a?[...l?Ri(l):[],...t?Ri(t):[]]:[];u.forEach(e=>{i&&e.addEventListener(`scroll`,n,{passive:!0}),a&&e.addEventListener(`resize`,n)});let d=l&&s?ma(l,n):null,f=-1,p=null;o&&(p=new ResizeObserver(e=>{let[r]=e;r&&r.target===l&&p&&t&&(p.unobserve(t),cancelAnimationFrame(f),f=requestAnimationFrame(()=>{var e;(e=p)==null||e.observe(t)})),n()}),l&&!c&&p.observe(l),t&&p.observe(t));let m,h=c?Ki(e):null;c&&g();function g(){let t=Ki(e);h&&!pa(h,t)&&n(),h=t,m=requestAnimationFrame(g)}return n(),()=>{var e;u.forEach(e=>{i&&e.removeEventListener(`scroll`,n),a&&e.removeEventListener(`resize`,n)}),d?.(),(e=p)==null||e.disconnect(),p=null,c&&cancelAnimationFrame(m)}}var ga=fi,_a=pi,va=oi,ya=mi,ba=li,xa=ai,Sa=(e,t,n)=>{let r=new Map,i={platform:fa,...n},a={...i.platform,_c:r};return ii(e,t,{...i,platform:a})},Ca=k();function wa(){let e=L(Ca);if(e===void 0)throw Error("[kobalte]: `usePopperContext` must be used within a `Popper` component");return e}var Ta=x(`<svg display="block" viewBox="0 0 30 30" style="transform:scale(1.02)"><g><path fill="none" d="M23,27.8c1.1,1.2,3.4,2.2,5,2.2h2H0h2c1.7,0,3.9-1,5-2.2l6.6-7.2c0.7-0.8,2-0.8,2.7,0L23,27.8L23,27.8z"></path><path stroke="none" d="M23,27.8c1.1,1.2,3.4,2.2,5,2.2h2H0h2c1.7,0,3.9-1,5-2.2l6.6-7.2c0.7-0.8,2-0.8,2.7,0L23,27.8L23,27.8z">`),Ea=30,Da=Ea/2,Oa={top:180,right:-90,bottom:0,left:90};function ka(e){let t=wa(),[r,i]=n(Y({size:Ea},e),[`ref`,`style`,`size`]),a=()=>t.currentPlacement().split(`-`)[0],o=Aa(t.contentRef),s=()=>o()?.getPropertyValue(`background-color`)||`none`,c=()=>o()?.getPropertyValue(`border-${a()}-color`)||`none`,l=()=>o()?.getPropertyValue(`border-${a()}-width`)||`0px`,u=()=>Number.parseInt(l())*2*(Ea/r.size),d=()=>`rotate(${Oa[a()]} ${Da} ${Da}) translate(0 2)`;return B(X,j({as:`div`,ref(e){let n=pt(t.setArrowRef,r.ref);typeof n==`function`&&n(e)},"aria-hidden":`true`,get style(){return Mt({position:`absolute`,"font-size":`${r.size}px`,width:`1em`,height:`1em`,"pointer-events":`none`,fill:s(),stroke:c(),"stroke-width":u()},r.style)}},i,{get children(){let e=Ta(),t=e.firstChild;return A(()=>f(t,`transform`,d())),e}}))}function Aa(e){let[t,n]=T();return I(()=>{let t=e();t&&n(Vt(t).getComputedStyle(t))}),t}function ja(e){let t=wa(),[r,i]=n(e,[`ref`,`style`]);return B(X,j({as:`div`,ref(e){let n=pt(t.setPositionerRef,r.ref);typeof n==`function`&&n(e)},"data-popper-positioner":``,get style(){return Mt({position:`absolute`,top:0,left:0,"min-width":`max-content`},r.style)}},i))}function Ma(e){let{x:t=0,y:n=0,width:r=0,height:i=0}=e??{};if(typeof DOMRect==`function`)return new DOMRect(t,n,r,i);let a={x:t,y:n,width:r,height:i,top:n,right:t+r,bottom:n+i,left:t};return{...a,toJSON:()=>a}}function Na(e,t){return{contextElement:e,getBoundingClientRect:()=>{let n=t(e);return n?Ma(n):e?e.getBoundingClientRect():Ma()}}}function Pa(e){return/^(?:top|bottom|left|right)(?:-(?:start|end))?$/.test(e)}var Fa={top:`bottom`,right:`left`,bottom:`top`,left:`right`};function Ia(e,t){let[n,r]=e.split(`-`),i=Fa[n];return r?n===`left`||n===`right`?`${i} ${r===`start`?`top`:`bottom`}`:r===`start`?`${i} ${t===`rtl`?`right`:`left`}`:`${i} ${t===`rtl`?`left`:`right`}`:`${i} center`}function La(e){let t=Y({getAnchorRect:e=>e?.getBoundingClientRect(),placement:`bottom`,gutter:0,shift:0,flip:!0,slide:!0,overlap:!1,sameWidth:!1,fitViewport:!1,hideWhenDetached:!1,detachedPadding:0,arrowPadding:4,overflowPadding:8},e),[n,r]=T(),[i,a]=T(),[o,s]=T(t.placement),c=()=>Na(t.anchorRef?.(),t.getAnchorRect),{direction:l}=Zn();async function u(){let e=c(),r=n(),a=i();if(!e||!r)return;let o=(a?.clientHeight||0)/2,u=typeof t.gutter==`number`?t.gutter+o:t.gutter??o;r.style.setProperty(`--kb-popper-content-overflow-padding`,`${t.overflowPadding}px`),e.getBoundingClientRect();let d=[ga(({placement:e})=>({mainAxis:u,crossAxis:e.split(`-`)[1]?void 0:t.shift,alignmentAxis:t.shift}))];if(t.flip!==!1){let e=typeof t.flip==`string`?t.flip.split(` `):void 0;if(e!==void 0&&!e.every(Pa))throw Error("`flip` expects a spaced-delimited list of placements");d.push(va({padding:t.overflowPadding,fallbackPlacements:e}))}(t.slide||t.overlap)&&d.push(_a({mainAxis:t.slide,crossAxis:t.overlap,padding:t.overflowPadding})),d.push(ya({padding:t.overflowPadding,apply({availableWidth:e,availableHeight:n,rects:i}){let a=Math.round(i.reference.width);e=Math.floor(e),n=Math.floor(n),r.style.setProperty(`--kb-popper-anchor-width`,`${a}px`),r.style.setProperty(`--kb-popper-content-available-width`,`${e}px`),r.style.setProperty(`--kb-popper-content-available-height`,`${n}px`),t.sameWidth&&(r.style.width=`${a}px`),t.fitViewport&&(r.style.maxWidth=`${e}px`,r.style.maxHeight=`${n}px`)}})),t.hideWhenDetached&&d.push(ba({padding:t.detachedPadding})),a&&d.push(xa({element:a,padding:t.arrowPadding}));let f=await Sa(e,r,{placement:t.placement,strategy:`absolute`,middleware:d,platform:{...fa,isRTL:()=>l()===`rtl`}});if(s(f.placement),t.onCurrentPlacementChange?.(f.placement),!r)return;r.style.setProperty(`--kb-popper-content-transform-origin`,Ia(f.placement,l()));let p=Math.round(f.x),m=Math.round(f.y),h;if(t.hideWhenDetached&&(h=f.middlewareData.hide?.referenceHidden?`hidden`:`visible`),Object.assign(r.style,{top:`0`,left:`0`,transform:`translate3d(${p}px, ${m}px, 0)`,visibility:h}),a&&f.middlewareData.arrow){let{x:e,y:t}=f.middlewareData.arrow,n=f.placement.split(`-`)[0];Object.assign(a.style,{left:e==null?``:`${e}px`,top:t==null?``:`${t}px`,[n]:`100%`})}}I(()=>{let e=c(),t=n();!e||!t||g(ha(e,t,u,{elementResize:typeof ResizeObserver==`function`}))}),I(()=>{let e=n(),r=t.contentRef?.();!e||!r||queueMicrotask(()=>{e.style.zIndex=getComputedStyle(r).zIndex})});let d={currentPlacement:o,contentRef:()=>t.contentRef?.(),setPositionerRef:r,setArrowRef:a};return B(Ca.Provider,{value:d,get children(){return t.children}})}var Ra=Object.assign(La,{Arrow:ka,Context:Ca,usePopperContext:wa,Positioner:ja}),za=`data-kb-top-layer`,Ba,Va=!1,Ha=[];function Ua(e){return Ha.findIndex(t=>t.node===e)}function Wa(e){return Ha[Ua(e)]}function Ga(e){return Ha[Ha.length-1].node===e}function Ka(){return Ha.filter(e=>e.isPointerBlocking)}function qa(){return[...Ka()].slice(-1)[0]}function Ja(){return Ka().length>0}function Ya(e){let t=Ua(qa()?.node);return Ua(e)<t}function Xa(e){Ha.push(e)}function Za(e){let t=Ua(e);t<0||Ha.splice(t,1)}function Qa(){for(let{node:e}of Ha)e.style.pointerEvents=Ya(e)?`none`:`auto`}function $a(e){if(Ja()&&!Va){let t=Ht(e);Ba=document.body.style.pointerEvents,t.body.style.pointerEvents=`none`,Va=!0}}function eo(e){if(Ja())return;let t=Ht(e);t.body.style.pointerEvents=Ba,t.body.style.length===0&&t.body.removeAttribute(`style`),Va=!1}var to={layers:Ha,isTopMostLayer:Ga,hasPointerBlockingLayer:Ja,isBelowPointerBlockingLayer:Ya,addLayer:Xa,removeLayer:Za,indexOf:Ua,find:Wa,assignPointerEventToLayers:Qa,disableBodyPointerEvents:$a,restoreBodyPointerEvents:eo},no=`interactOutside.pointerDownOutside`,ro=`interactOutside.focusOutside`;function io(e,t){let n,r=vn,i=()=>Ht(t()),a=t=>e.onPointerDownOutside?.(t),o=t=>e.onFocusOutside?.(t),s=t=>e.onInteractOutside?.(t),c=n=>{let r=n.target;return!(r instanceof Element)||r.closest(`[${za}]`)||!zt(i(),r)||zt(t(),r)?!1:!e.shouldExcludeElement?.(r)},l=e=>{function n(){let n=t(),r=e.target;if(!n||!r||!c(e))return;let i=J([a,s]);r.addEventListener(no,i,{once:!0});let o=new CustomEvent(no,{bubbles:!1,cancelable:!0,detail:{originalEvent:e,isContextMenu:e.button===2||Zt(e)&&e.button===0}});r.dispatchEvent(o)}e.pointerType===`touch`?(i().removeEventListener(`click`,n),r=n,i().addEventListener(`click`,n,{once:!0})):n()},u=e=>{let n=t(),r=e.target;if(!n||!r||!c(e))return;let i=J([o,s]);r.addEventListener(ro,i,{once:!0});let a=new CustomEvent(ro,{bubbles:!1,cancelable:!0,detail:{originalEvent:e,isContextMenu:!1}});r.dispatchEvent(a)};I(()=>{H(e.isDisabled)||(n=window.setTimeout(()=>{i().addEventListener(`pointerdown`,l,!0)},0),i().addEventListener(`focusin`,u,!0),g(()=>{window.clearTimeout(n),i().removeEventListener(`click`,r),i().removeEventListener(`pointerdown`,l,!0),i().removeEventListener(`focusin`,u,!0)}))})}function ao(e){let t=t=>{t.key===Wt.Escape&&e.onEscapeKeyDown?.(t)};I(()=>{if(H(e.isDisabled))return;let n=e.ownerDocument?.()??Ht();n.addEventListener(`keydown`,t),g(()=>{n.removeEventListener(`keydown`,t)})})}var oo=k();function so(){return L(oo)}function co(e){let t,r=so(),[i,a]=n(e,[`ref`,`disableOutsidePointerEvents`,`excludedElements`,`onEscapeKeyDown`,`onPointerDownOutside`,`onFocusOutside`,`onInteractOutside`,`onDismiss`,`bypassTopMostLayerCheck`]),s=new Set([]),c=e=>{s.add(e);let t=r?.registerNestedLayer(e);return()=>{s.delete(e),t?.()}};io({shouldExcludeElement:e=>t?i.excludedElements?.some(t=>zt(t(),e))||[...s].some(t=>zt(t,e)):!1,onPointerDownOutside:e=>{!t||to.isBelowPointerBlockingLayer(t)||!i.bypassTopMostLayerCheck&&!to.isTopMostLayer(t)||(i.onPointerDownOutside?.(e),i.onInteractOutside?.(e),e.defaultPrevented||i.onDismiss?.())},onFocusOutside:e=>{i.onFocusOutside?.(e),i.onInteractOutside?.(e),e.defaultPrevented||i.onDismiss?.()}},()=>t),ao({ownerDocument:()=>Ht(t),onEscapeKeyDown:e=>{!t||!to.isTopMostLayer(t)||(i.onEscapeKeyDown?.(e),!e.defaultPrevented&&i.onDismiss&&(e.preventDefault(),i.onDismiss()))}}),o(()=>{if(!t)return;to.addLayer({node:t,isPointerBlocking:i.disableOutsidePointerEvents,dismiss:i.onDismiss});let e=r?.registerNestedLayer(t);to.assignPointerEventToLayers(),to.disableBodyPointerEvents(t),g(()=>{t&&(to.removeLayer(t),e?.(),to.assignPointerEventToLayers(),to.restoreBodyPointerEvents(t))})}),I(m([()=>t,()=>i.disableOutsidePointerEvents],([e,t])=>{if(!e)return;let n=to.find(e);n&&n.isPointerBlocking!==t&&(n.isPointerBlocking=t,to.assignPointerEventToLayers()),t&&to.disableBodyPointerEvents(e),g(()=>{to.restoreBodyPointerEvents(e)})},{defer:!0}));let l={registerNestedLayer:c};return B(oo.Provider,{value:l,get children(){return B(X,j({as:`div`,ref(e){let n=pt(e=>t=e,i.ref);typeof n==`function`&&n(e)}},a))}})}function lo(e={}){let[t,n]=In({value:()=>H(e.open),defaultValue:()=>!!H(e.defaultOpen),onChange:t=>e.onOpenChange?.(t)}),r=()=>{n(!0)},i=()=>{n(!1)};return{isOpen:t,setIsOpen:n,open:r,close:i,toggle:()=>{t()?i():r()}}}function uo(e){return t=>(e(t),()=>e(void 0))}var fo=e=>typeof e==`function`?e():e,po=e=>{let t=P(()=>{let t=fo(e.element);if(t)return getComputedStyle(t)}),n=()=>t()?.animationName??`none`,[r,i]=T(fo(e.show)?`present`:`hidden`),a=`none`;return I(r=>{let o=fo(e.show);return C(()=>{if(r===o)return o;let e=a,s=n();o?i(`present`):s===`none`||t()?.display===`none`?i(`hidden`):i(r===!0&&e!==s?`hiding`:`hidden`)}),o}),I(()=>{let t=fo(e.element);if(!t)return;let o=e=>{e.target===t&&(a=n())},s=e=>{let a=n().includes(e.animationName);e.target===t&&a&&r()===`hiding`&&i(`hidden`)};t.addEventListener(`animationstart`,o),t.addEventListener(`animationcancel`,s),t.addEventListener(`animationend`,s),g(()=>{t.removeEventListener(`animationstart`,o),t.removeEventListener(`animationcancel`,s),t.removeEventListener(`animationend`,s)})}),{present:()=>r()===`present`||r()===`hiding`,state:r,setState:i}},mo=[`id`,`name`,`validationState`,`required`,`disabled`,`readOnly`];function ho(e){let t=Y({id:`form-control-${V()}`},e),[n,r]=T(),[i,a]=T(),[o,s]=T(),[c,l]=T();return{formControlContext:{name:()=>H(t.name)??H(t.id),dataset:P(()=>({"data-valid":H(t.validationState)===`valid`?``:void 0,"data-invalid":H(t.validationState)===`invalid`?``:void 0,"data-required":H(t.required)?``:void 0,"data-disabled":H(t.disabled)?``:void 0,"data-readonly":H(t.readOnly)?``:void 0})),validationState:()=>H(t.validationState),isRequired:()=>H(t.required),isDisabled:()=>H(t.disabled),isReadOnly:()=>H(t.readOnly),labelId:n,fieldId:i,descriptionId:o,errorMessageId:c,getAriaLabelledBy:(e,t,r)=>{let i=r!=null||n()!=null;return[r,n(),i&&t!=null?e:void 0].filter(Boolean).join(` `)||void 0},getAriaDescribedBy:e=>[o(),c(),e].filter(Boolean).join(` `)||void 0,generateId:Rt(()=>H(t.id)),registerLabel:uo(r),registerField:uo(a),registerDescription:uo(s),registerErrorMessage:uo(l)}}}var go=k();function _o(){let e=L(go);if(e===void 0)throw Error("[kobalte]: `useFormControlContext` must be used within a `FormControlContext.Provider` component");return e}function vo(e){let t=_o(),n=Y({id:t.generateId(`description`)},e);return I(()=>g(t.registerDescription(n.id))),B(X,j({as:`div`},()=>t.dataset(),n))}function yo(e){let r,i=_o(),[a,o]=n(Y({id:i.generateId(`label`)},e),[`ref`]),s=Dn(()=>r,()=>`label`);return I(()=>g(i.registerLabel(o.id))),B(X,j({as:`label`,ref(e){let t=pt(e=>r=e,a.ref);typeof t==`function`&&t(e)},get for(){return t(()=>s()===`label`)()?i.fieldId():void 0}},()=>i.dataset(),o))}function bo(e,t){I(m(e,e=>{if(e==null)return;let n=xo(e);n!=null&&(n.addEventListener(`reset`,t,{passive:!0}),g(()=>{n.removeEventListener(`reset`,t)}))}))}function xo(e){return So(e)?e.form:e.closest(`form`)}function So(e){return e.matches(`textarea, input, select, button`)}function Co(e){let t=_o(),[r,i]=n(Y({id:t.generateId(`error-message`)},e),[`forceMount`]),a=()=>t.validationState()===`invalid`;return I(()=>{a()&&g(t.registerErrorMessage(i.id))}),B(R,{get when(){return r.forceMount||a()},get children(){return B(X,j({as:`div`},()=>t.dataset(),i))}})}var wo=`focusScope.autoFocusOnMount`,To=`focusScope.autoFocusOnUnmount`,Eo={bubbles:!1,cancelable:!0},Do={stack:[],active(){return this.stack[0]},add(e){e!==this.active()&&this.active()?.pause(),this.stack=Pt(this.stack,e),this.stack.unshift(e)},remove(e){this.stack=Pt(this.stack,e),this.active()?.resume()}};function Oo(e,t){let[n,r]=T(!1),i={pause(){r(!0)},resume(){r(!1)}},a=null,o=t=>e.onMountAutoFocus?.(t),s=t=>e.onUnmountAutoFocus?.(t),c=()=>Ht(t()),l=()=>{let e=c().createElement(`span`);return e.setAttribute(`data-focus-trap`,``),e.tabIndex=0,Object.assign(e.style,En),e},u=()=>{let e=t();return e?cn(e,!0).filter(e=>!e.hasAttribute(`data-focus-trap`)):[]},d=()=>{let e=u();return e.length>0?e[0]:null},f=()=>{let e=u();return e.length>0?e[e.length-1]:null},p=()=>{let e=t();if(!e)return!1;let n=Bt(e);return!n||zt(e,n)?!1:un(n)};I(()=>{let e=t();if(!e)return;Do.add(i);let n=Bt(e);if(!zt(e,n)){let t=new CustomEvent(wo,Eo);e.addEventListener(wo,o),e.dispatchEvent(t),t.defaultPrevented||setTimeout(()=>{Qt(d()),Bt(e)===n&&Qt(e)},0)}g(()=>{e.removeEventListener(wo,o),setTimeout(()=>{let t=new CustomEvent(To,Eo);p()&&t.preventDefault(),e.addEventListener(To,s),e.dispatchEvent(t),t.defaultPrevented||Qt(n??c().body),e.removeEventListener(To,s),Do.remove(i)},0)})}),I(()=>{let r=t();if(!r||!H(e.trapFocus)||n())return;let i=e=>{let t=e.target;t?.closest(`[${za}]`)||(zt(r,t)?a=t:Qt(a))},o=e=>{let t=e.relatedTarget??Bt(r);t?.closest(`[${za}]`)||zt(r,t)||Qt(a)};c().addEventListener(`focusin`,i),c().addEventListener(`focusout`,o),g(()=>{c().removeEventListener(`focusin`,i),c().removeEventListener(`focusout`,o)})}),I(()=>{let r=t();if(!r||!H(e.trapFocus)||n())return;let i=l();r.insertAdjacentElement(`afterbegin`,i);let a=l();r.insertAdjacentElement(`beforeend`,a);function o(e){let t=d(),n=f();e.relatedTarget===t?Qt(n):Qt(t)}i.addEventListener(`focusin`,o),a.addEventListener(`focusin`,o);let s=new MutationObserver(e=>{for(let t of e)t.previousSibling===a&&(a.remove(),r.insertAdjacentElement(`beforeend`,a)),t.nextSibling===i&&(i.remove(),r.insertAdjacentElement(`afterbegin`,i))});s.observe(r,{childList:!0,subtree:!1}),g(()=>{i.removeEventListener(`focusin`,o),a.removeEventListener(`focusin`,o),i.remove(),a.remove(),s.disconnect()})})}var ko=`data-live-announcer`;function Ao(e){I(()=>{H(e.isDisabled)||g(No(H(e.targets),H(e.root)))})}var jo=new WeakMap,Mo=[];function No(e,t=document.body){let n=new Set(e),r=new Set,i=e=>{for(let t of e.querySelectorAll(`[${ko}], [${za}]`))n.add(t);let t=e=>{if(n.has(e)||e.parentElement&&r.has(e.parentElement)&&e.parentElement.getAttribute(`role`)!==`row`)return NodeFilter.FILTER_REJECT;for(let t of n)if(e.contains(t))return NodeFilter.FILTER_SKIP;return NodeFilter.FILTER_ACCEPT},i=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode:t}),o=t(e);if(o===NodeFilter.FILTER_ACCEPT&&a(e),o!==NodeFilter.FILTER_REJECT){let e=i.nextNode();for(;e!=null;)a(e),e=i.nextNode()}},a=e=>{let t=jo.get(e)??0;e.getAttribute(`aria-hidden`)===`true`&&t===0||(t===0&&e.setAttribute(`aria-hidden`,`true`),r.add(e),jo.set(e,t+1))};Mo.length&&Mo[Mo.length-1].disconnect(),i(t);let o=new MutationObserver(e=>{for(let t of e)if(!(t.type!==`childList`||t.addedNodes.length===0)&&![...n,...r].some(e=>e.contains(t.target))){for(let e of t.removedNodes)e instanceof Element&&(n.delete(e),r.delete(e));for(let e of t.addedNodes)(e instanceof HTMLElement||e instanceof SVGElement)&&(e.dataset.liveAnnouncer===`true`||e.dataset.reactAriaTopLayer===`true`)?n.add(e):e instanceof Element&&i(e)}});o.observe(t,{childList:!0,subtree:!0});let s={observe(){o.observe(t,{childList:!0,subtree:!0})},disconnect(){o.disconnect()}};return Mo.push(s),()=>{o.disconnect();for(let e of r){let t=jo.get(e);if(t==null)return;t===1?(e.removeAttribute(`aria-hidden`),jo.delete(e)):jo.set(e,t-1)}s===Mo[Mo.length-1]?(Mo.pop(),Mo.length&&Mo[Mo.length-1].observe()):Mo.splice(Mo.indexOf(s),1)}}var Po=(e,t)=>{if(e.contains(t))return!0;let n=t;for(;n;){if(n===e)return!0;n=n._$host??n.parentElement}return!1},Fo=new Map,Io=e=>{I(()=>{let t=fo(e.style)??{},n=fo(e.properties)??[],r={};for(let n in t)r[n]=e.element.style[n];let i=Fo.get(e.key);i?i.activeCount++:Fo.set(e.key,{activeCount:1,originalStyles:r,properties:n.map(e=>e.key)}),Object.assign(e.element.style,e.style);for(let t of n)e.element.style.setProperty(t.key,t.value);g(()=>{let t=Fo.get(e.key);if(t){if(t.activeCount!==1){t.activeCount--;return}Fo.delete(e.key);for(let[n,r]of Object.entries(t.originalStyles))e.element.style[n]=r;for(let n of t.properties)e.element.style.removeProperty(n);e.element.style.length===0&&e.element.removeAttribute(`style`),e.cleanup?.()}})})},Lo=(e,t)=>{switch(t){case`x`:return[e.clientWidth,e.scrollLeft,e.scrollWidth];case`y`:return[e.clientHeight,e.scrollTop,e.scrollHeight]}},Ro=(e,t)=>{let n=getComputedStyle(e),r=t===`x`?n.overflowX:n.overflowY;return r===`auto`||r===`scroll`||e.tagName===`HTML`&&r===`visible`},zo=(e,t,n)=>{let r=t===`x`&&window.getComputedStyle(e).direction===`rtl`?-1:1,i=e,a=0,o=0,s=!1;do{let[e,c,l]=Lo(i,t),u=l-e-r*c;(c!==0||u!==0)&&Ro(i,t)&&(a+=u,o+=c),i===(n??document.documentElement)?s=!0:i=i._$host??i.parentElement}while(i&&!s);return[a,o]},[Bo,Vo]=T([]),Ho=e=>Bo().indexOf(e)===Bo().length-1,Uo=e=>{let t=j({element:null,enabled:!0,hideScrollbar:!0,preventScrollbarShift:!0,preventScrollbarShiftMode:`padding`,restoreScrollPosition:!0,allowPinchZoom:!1},e),n=V(),r=[0,0],i=null,a=null;I(()=>{fo(t.enabled)&&(Vo(e=>[...e,n]),g(()=>{Vo(e=>e.filter(e=>e!==n))}))}),I(()=>{if(!fo(t.enabled)||!fo(t.hideScrollbar))return;let{body:e}=document,n=window.innerWidth-e.offsetWidth;if(fo(t.preventScrollbarShift)){let r={overflow:`hidden`},i=[];n>0&&(fo(t.preventScrollbarShiftMode)===`padding`?r.paddingRight=`calc(${window.getComputedStyle(e).paddingRight} + ${n}px)`:r.marginRight=`calc(${window.getComputedStyle(e).marginRight} + ${n}px)`,i.push({key:`--scrollbar-width`,value:`${n}px`}));let a=window.scrollY,o=window.scrollX;Io({key:`prevent-scroll`,element:e,style:r,properties:i,cleanup:()=>{fo(t.restoreScrollPosition)&&n>0&&window.scrollTo(o,a)}})}else Io({key:`prevent-scroll`,element:e,style:{overflow:`hidden`}})}),I(()=>{!Ho(n)||!fo(t.enabled)||(document.addEventListener(`wheel`,s,{passive:!1}),document.addEventListener(`touchstart`,o,{passive:!1}),document.addEventListener(`touchmove`,c,{passive:!1}),g(()=>{document.removeEventListener(`wheel`,s),document.removeEventListener(`touchstart`,o),document.removeEventListener(`touchmove`,c)}))});let o=e=>{r=Go(e),i=null,a=null},s=e=>{let n=e.target,r=fo(t.element),i=Wo(e),a=Math.abs(i[0])>Math.abs(i[1])?`x`:`y`,o=Ko(n,a,a===`x`?i[0]:i[1],r),s;s=r&&Po(r,n)?!o:!0,s&&e.cancelable&&e.preventDefault()},c=e=>{let n=fo(t.element),o=e.target,s;if(e.touches.length===2)s=!fo(t.allowPinchZoom);else{if(i==null||a===null){let t=Go(e).map((e,t)=>r[t]-e),n=Math.abs(t[0])>Math.abs(t[1])?`x`:`y`;i=n,a=n===`x`?t[0]:t[1]}if(o.type===`range`)s=!1;else{let e=Ko(o,i,a,n);s=n&&Po(n,o)?!e:!0}}s&&e.cancelable&&e.preventDefault()}},Wo=e=>[e.deltaX,e.deltaY],Go=e=>e.changedTouches[0]?[e.changedTouches[0].clientX,e.changedTouches[0].clientY]:[0,0],Ko=(e,t,n,r)=>{let[i,a]=zo(e,t,r!==null&&Po(r,e)?r:void 0);return!(n>0&&Math.abs(i)<=1||n<0&&Math.abs(a)<1)},qo=Uo,Jo={};An(Jo,{Description:()=>vo,ErrorMessage:()=>Co,Item:()=>$o,ItemControl:()=>es,ItemDescription:()=>ts,ItemIndicator:()=>ns,ItemInput:()=>rs,ItemLabel:()=>is,Label:()=>as,RadioGroup:()=>ss,Root:()=>os,useRadioGroupContext:()=>Xo});var Yo=k();function Xo(){let e=L(Yo);if(e===void 0)throw Error("[kobalte]: `useRadioGroupContext` must be used within a `RadioGroup` component");return e}var Zo=k();function Qo(){let e=L(Zo);if(e===void 0)throw Error("[kobalte]: `useRadioGroupItemContext` must be used within a `RadioGroup.Item` component");return e}function $o(e){let t=_o(),r=Xo(),[i,a]=n(Y({id:`${t.generateId(`item`)}-${V()}`},e),[`value`,`disabled`,`onPointerDown`]),[o,s]=T(),[c,l]=T(),[u,d]=T(),[f,p]=T(),[m,h]=T(!1),g=P(()=>r.isDefaultValue(i.value)),_=P(()=>r.isSelectedValue(i.value)),v=P(()=>i.disabled||t.isDisabled()||!1),y=e=>{q(e,i.onPointerDown),m()&&e.preventDefault()},b=P(()=>({...t.dataset(),"data-disabled":v()?``:void 0,"data-checked":_()?``:void 0})),x={value:()=>i.value,dataset:b,isDefault:g,isSelected:_,isDisabled:v,inputId:o,labelId:c,descriptionId:u,inputRef:f,select:()=>r.setSelectedValue(i.value),generateId:Rt(()=>a.id),registerInput:uo(s),registerLabel:uo(l),registerDescription:uo(d),setIsFocused:h,setInputRef:p};return B(Zo.Provider,{value:x,get children(){return B(X,j({as:`div`,role:`group`,onPointerDown:y},b,a))}})}function es(e){let t=Qo(),[r,i]=n(Y({id:t.generateId(`control`)},e),[`onClick`,`onKeyDown`]);return B(X,j({as:`div`,onClick:e=>{q(e,r.onClick),t.select(),t.inputRef()?.focus()},onKeyDown:e=>{q(e,r.onKeyDown),e.key===Wt.Space&&(t.select(),t.inputRef()?.focus())}},()=>t.dataset(),i))}function ts(e){let t=Qo(),n=Y({id:t.generateId(`description`)},e);return I(()=>g(t.registerDescription(n.id))),B(X,j({as:`div`},()=>t.dataset(),n))}function ns(e){let t=Qo(),[r,i]=n(Y({id:t.generateId(`indicator`)},e),[`ref`,`forceMount`]),[a,o]=T(),{present:s}=po({show:()=>r.forceMount||t.isSelected(),element:()=>a()??null});return B(R,{get when(){return s()},get children(){return B(X,j({as:`div`,ref(e){let t=pt(o,r.ref);typeof t==`function`&&t(e)}},()=>t.dataset(),i))}})}function rs(e){let t=_o(),r=Xo(),i=Qo(),[a,o]=n(Y({id:i.generateId(`input`)},e),[`ref`,`style`,`aria-labelledby`,`aria-describedby`,`onChange`,`onFocus`,`onBlur`]),s=()=>[a[`aria-labelledby`],i.labelId(),a[`aria-labelledby`]!=null&&o[`aria-label`]!=null?o.id:void 0].filter(Boolean).join(` `)||void 0,c=()=>[a[`aria-describedby`],i.descriptionId(),r.ariaDescribedBy()].filter(Boolean).join(` `)||void 0,[l,u]=T(!1);return I(m([()=>i.isSelected(),()=>i.value()],e=>{if(!e[0]&&e[1]===i.value())return;u(!0);let t=i.inputRef();t?.dispatchEvent(new Event(`input`,{bubbles:!0,cancelable:!0})),t?.dispatchEvent(new Event(`change`,{bubbles:!0,cancelable:!0}))},{defer:!0})),I(()=>g(i.registerInput(o.id))),B(X,j({as:`input`,ref(e){let t=pt(i.setInputRef,a.ref);typeof t==`function`&&t(e)},type:`radio`,get name(){return t.name()},get value(){return i.value()},get checked(){return i.isSelected()},get required(){return t.isRequired()},get disabled(){return i.isDisabled()},get readonly(){return t.isReadOnly()},get style(){return Mt({...En},a.style)},get"aria-labelledby"(){return s()},get"aria-describedby"(){return c()},onChange:e=>{if(q(e,a.onChange),e.stopPropagation(),!l()){r.setSelectedValue(i.value());let t=e.target;t.checked=i.isSelected()}u(!1)},onFocus:e=>{q(e,a.onFocus),i.setIsFocused(!0)},onBlur:e=>{q(e,a.onBlur),i.setIsFocused(!1)}},()=>i.dataset(),o))}function is(e){let t=Qo(),n=Y({id:t.generateId(`label`)},e);return I(()=>g(t.registerLabel(n.id))),B(X,j({as:`label`,get for(){return t.inputId()}},()=>t.dataset(),n))}function as(e){return B(yo,j({as:`span`},e))}function os(e){let t,[r,i,a]=n(Y({id:`radiogroup-${V()}`,orientation:`vertical`},e),[`ref`,`value`,`defaultValue`,`onChange`,`orientation`,`aria-labelledby`,`aria-describedby`],mo),[o,s]=Fn({value:()=>r.value,defaultValue:()=>r.defaultValue,onChange:e=>r.onChange?.(e)}),{formControlContext:c}=ho(i);bo(()=>t,()=>s(r.defaultValue??``));let l=()=>c.getAriaLabelledBy(H(i.id),a[`aria-label`],r[`aria-labelledby`]),u=()=>c.getAriaDescribedBy(r[`aria-describedby`]),d=t=>t===e.defaultValue,f=e=>e===o(),p={ariaDescribedBy:u,isDefaultValue:d,isSelectedValue:f,setSelectedValue:e=>{if(!(c.isReadOnly()||c.isDisabled())&&(s(e),t))for(let e of t.querySelectorAll(`[type='radio']`)){let t=e;t.checked=f(t.value)}}};return B(go.Provider,{value:c,get children(){return B(Yo.Provider,{value:p,get children(){return B(X,j({as:`div`,ref(e){let n=pt(e=>t=e,r.ref);typeof n==`function`&&n(e)},role:`radiogroup`,get id(){return H(i.id)},get"aria-invalid"(){return c.validationState()===`invalid`||void 0},get"aria-required"(){return c.isRequired()||void 0},get"aria-disabled"(){return c.isDisabled()||void 0},get"aria-readonly"(){return c.isReadOnly()||void 0},get"aria-orientation"(){return r.orientation},get"aria-labelledby"(){return l()},get"aria-describedby"(){return u()}},()=>c.dataset(),a))}})}})}var ss=Object.assign(os,{Description:vo,ErrorMessage:Co,Item:$o,ItemControl:es,ItemDescription:ts,ItemIndicator:ns,ItemInput:rs,ItemLabel:is,Label:as}),cs=class{collection;ref;collator;constructor(e,t,n){this.collection=e,this.ref=t,this.collator=n}getKeyBelow(e){let t=this.collection().getKeyAfter(e);for(;t!=null;){let e=this.collection().getItem(t);if(e&&e.type===`item`&&!e.disabled)return t;t=this.collection().getKeyAfter(t)}}getKeyAbove(e){let t=this.collection().getKeyBefore(e);for(;t!=null;){let e=this.collection().getItem(t);if(e&&e.type===`item`&&!e.disabled)return t;t=this.collection().getKeyBefore(t)}}getFirstKey(){let e=this.collection().getFirstKey();for(;e!=null;){let t=this.collection().getItem(e);if(t&&t.type===`item`&&!t.disabled)return e;e=this.collection().getKeyAfter(e)}}getLastKey(){let e=this.collection().getLastKey();for(;e!=null;){let t=this.collection().getItem(e);if(t&&t.type===`item`&&!t.disabled)return e;e=this.collection().getKeyBefore(e)}}getItem(e){return this.ref?.()?.querySelector(`[data-key="${e}"]`)??null}getKeyPageAbove(e){let t=this.ref?.(),n=this.getItem(e);if(!t||!n)return;let r=Math.max(0,n.offsetTop+n.offsetHeight-t.offsetHeight),i=e;for(;i&&n&&n.offsetTop>r;)i=this.getKeyAbove(i),n=i==null?null:this.getItem(i);return i}getKeyPageBelow(e){let t=this.ref?.(),n=this.getItem(e);if(!t||!n)return;let r=Math.min(t.scrollHeight,n.offsetTop-n.offsetHeight+t.offsetHeight),i=e;for(;i&&n&&n.offsetTop<r;)i=this.getKeyBelow(i),n=i==null?null:this.getItem(i);return i}getKeyForSearch(e,t){let n=this.collator?.();if(!n)return;let r=t==null?this.getFirstKey():this.getKeyBelow(t);for(;r!=null;){let t=this.collection().getItem(r);if(t){let i=t.textValue.slice(0,e.length);if(t.textValue&&n.compare(i,e)===0)return r}r=this.getKeyBelow(r)}}};function ls(e,t,n){let r=$n({usage:`search`,sensitivity:`base`});return ur({selectionManager:()=>H(e.selectionManager),keyboardDelegate:P(()=>H(e.keyboardDelegate)||new cs(e.collection,t,r)),autoFocus:()=>H(e.autoFocus),deferAutoFocus:()=>H(e.deferAutoFocus),shouldFocusWrap:()=>H(e.shouldFocusWrap),disallowEmptySelection:()=>H(e.disallowEmptySelection),selectOnFocus:()=>H(e.selectOnFocus),disallowTypeAhead:()=>H(e.disallowTypeAhead),shouldUseVirtualFocus:()=>H(e.shouldUseVirtualFocus),allowsTabNavigation:()=>H(e.allowsTabNavigation),isVirtualized:()=>H(e.isVirtualized),scrollToKey:t=>H(e.scrollToKey)?.(t),orientation:()=>H(e.orientation)},t)}var us=k();function ds(){return L(us)}var fs=k();function ps(){return L(fs)}var ms=k();function hs(){return L(ms)}function gs(){let e=hs();if(e===void 0)throw Error("[kobalte]: `useMenuContext` must be used within a `Menu` component");return e}var _s=k();function vs(){let e=L(_s);if(e===void 0)throw Error("[kobalte]: `useMenuItemContext` must be used within a `Menu.Item` component");return e}var ys=k();function bs(){let e=L(ys);if(e===void 0)throw Error("[kobalte]: `useMenuRootContext` must be used within a `MenuRoot` component");return e}function xs(e){let t,r=bs(),i=gs(),[a,o]=n(Y({id:r.generateId(`item-${V()}`)},e),[`ref`,`textValue`,`disabled`,`closeOnSelect`,`checked`,`indeterminate`,`onSelect`,`onPointerMove`,`onPointerLeave`,`onPointerDown`,`onPointerUp`,`onClick`,`onKeyDown`,`onMouseDown`,`onFocus`]),[s,c]=T(),[l,u]=T(),[d,f]=T(),p=()=>i.listState().selectionManager(),m=()=>o.id,h=()=>p().focusedKey()===m(),g=()=>{a.onSelect?.(),a.closeOnSelect&&setTimeout(()=>{i.close(!0)})};Er({getItem:()=>({ref:()=>t,type:`item`,key:m(),textValue:a.textValue??d()?.textContent??t?.textContent??``,disabled:a.disabled??!1})});let _=dr({key:m,selectionManager:p,shouldSelectOnPressUp:!0,allowsDifferentPressOrigin:!0,disabled:()=>a.disabled},()=>t),v=e=>{q(e,a.onPointerMove),e.pointerType===`mouse`&&(a.disabled?i.onItemLeave(e):(i.onItemEnter(e),e.defaultPrevented||(Qt(e.currentTarget),i.listState().selectionManager().setFocused(!0),i.listState().selectionManager().setFocusedKey(m()))))},y=e=>{q(e,a.onPointerLeave),e.pointerType===`mouse`&&i.onItemLeave(e)},b=e=>{q(e,a.onPointerUp),!a.disabled&&e.button===0&&g()},x=e=>{if(q(e,a.onKeyDown),!e.repeat&&!a.disabled)switch(e.key){case`Enter`:case` `:g();break}},S=P(()=>{if(a.indeterminate)return`mixed`;if(a.checked!=null)return a.checked}),C=P(()=>({"data-indeterminate":a.indeterminate?``:void 0,"data-checked":a.checked&&!a.indeterminate?``:void 0,"data-disabled":a.disabled?``:void 0,"data-highlighted":h()?``:void 0})),w={isChecked:()=>a.checked,dataset:C,setLabelRef:f,generateId:Rt(()=>o.id),registerLabel:uo(c),registerDescription:uo(u)};return B(_s.Provider,{value:w,get children(){return B(X,j({as:`div`,ref(e){let n=pt(e=>t=e,a.ref);typeof n==`function`&&n(e)},get tabIndex(){return _.tabIndex()},get"aria-checked"(){return S()},get"aria-disabled"(){return a.disabled},get"aria-labelledby"(){return s()},get"aria-describedby"(){return l()},get"data-key"(){return _.dataKey()},get onPointerDown(){return J([a.onPointerDown,_.onPointerDown])},get onPointerUp(){return J([b,_.onPointerUp])},get onClick(){return J([a.onClick,_.onClick])},get onKeyDown(){return J([x,_.onKeyDown])},get onMouseDown(){return J([a.onMouseDown,_.onMouseDown])},get onFocus(){return J([a.onFocus,_.onFocus])},onPointerMove:v,onPointerLeave:y},C,o))}})}function Ss(e){let[t,r]=n(Y({closeOnSelect:!1},e),[`checked`,`defaultChecked`,`onChange`,`onSelect`]),i=Rn({isSelected:()=>t.checked,defaultIsSelected:()=>t.defaultChecked,onSelectedChange:e=>t.onChange?.(e),isDisabled:()=>r.disabled});return B(xs,j({role:`menuitemcheckbox`,get checked(){return i.isSelected()},onSelect:()=>{t.onSelect?.(),i.toggle()}},r))}var Cs={next:(e,t)=>e===`ltr`?t===`horizontal`?`ArrowRight`:`ArrowDown`:t===`horizontal`?`ArrowLeft`:`ArrowUp`,previous:(e,t)=>Cs.next(e===`ltr`?`rtl`:`ltr`,t)},ws={first:e=>e===`horizontal`?`ArrowDown`:`ArrowRight`,last:e=>e===`horizontal`?`ArrowUp`:`ArrowLeft`};function Ts(e){let r=bs(),i=gs(),a=ds(),{direction:o}=Zn(),[s,c]=n(Y({id:r.generateId(`trigger`)},e),[`ref`,`id`,`disabled`,`onPointerDown`,`onClick`,`onKeyDown`,`onMouseOver`,`onFocus`]),l=()=>r.value();a!==void 0&&(l=()=>r.value()??s.id,a.lastValue()===void 0&&a.setLastValue(l));let u=Dn(()=>i.triggerRef(),()=>`button`),d=P(()=>u()===`a`&&i.triggerRef()?.getAttribute(`href`)!=null);I(m(()=>a?.value(),e=>{d()&&e===l()&&i.triggerRef()?.focus()}));let f=()=>{a===void 0?i.toggle(!0):i.isOpen()?a.value()===l()&&a.closeMenu():(a.autoFocusMenu()||a.setAutoFocusMenu(!0),i.open(!1))};return I(()=>g(i.registerTriggerId(s.id))),B(Nn,j({ref(e){let t=pt(i.setTriggerRef,s.ref);typeof t==`function`&&t(e)},get"data-kb-menu-value-trigger"(){return r.value()},get id(){return s.id},get disabled(){return s.disabled},"aria-haspopup":`true`,get"aria-expanded"(){return i.isOpen()},get"aria-controls"(){return t(()=>!!i.isOpen())()?i.contentId():void 0},get"data-highlighted"(){return l()!==void 0&&a?.value()===l()?!0:void 0},get tabIndex(){return a===void 0?void 0:a.value()===l()||a.lastValue()===l()?0:-1},onPointerDown:e=>{q(e,s.onPointerDown),e.currentTarget.dataset.pointerType=e.pointerType,!s.disabled&&e.pointerType!==`touch`&&e.button===0&&f()},onMouseOver:e=>{q(e,s.onMouseOver),i.triggerRef()?.dataset.pointerType!==`touch`&&!s.disabled&&a!==void 0&&a.value()!==void 0&&a.setValue(l)},onClick:e=>{q(e,s.onClick),s.disabled||e.currentTarget.dataset.pointerType===`touch`&&f()},onKeyDown:e=>{if(q(e,s.onKeyDown),!s.disabled){if(d())switch(e.key){case`Enter`:case` `:return}switch(e.key){case`Enter`:case` `:case ws.first(r.orientation()):e.stopPropagation(),e.preventDefault(),Tn(e.currentTarget),i.open(`first`),a?.setAutoFocusMenu(!0),a?.setValue(l);break;case ws.last(r.orientation()):e.stopPropagation(),e.preventDefault(),i.open(`last`);break;case Cs.next(o(),r.orientation()):if(a===void 0)break;e.stopPropagation(),e.preventDefault(),a.nextMenu();break;case Cs.previous(o(),r.orientation()):if(a===void 0)break;e.stopPropagation(),e.preventDefault(),a.previousMenu();break}}},onFocus:e=>{q(e,s.onFocus),a!==void 0&&e.currentTarget.dataset.pointerType!==`touch`&&a.setValue(l)},role:a===void 0?void 0:`menuitem`},()=>i.dataset(),c))}function Es(e){let r,i=bs(),a=gs(),o=ds(),s=ps(),{direction:c}=Zn(),[l,u]=n(Y({id:i.generateId(`content-${V()}`)},e),[`ref`,`id`,`style`,`onOpenAutoFocus`,`onCloseAutoFocus`,`onEscapeKeyDown`,`onFocusOutside`,`onPointerEnter`,`onPointerMove`,`onKeyDown`,`onMouseDown`,`onFocusIn`,`onFocusOut`]),d=0,f=()=>a.parentMenuContext()==null&&o===void 0&&i.isModal(),p=ls({selectionManager:a.listState().selectionManager,collection:a.listState().collection,autoFocus:a.autoFocus,deferAutoFocus:!0,shouldFocusWrap:!0,disallowTypeAhead:()=>!a.listState().selectionManager().isFocused(),orientation:()=>i.orientation()===`horizontal`?`vertical`:`horizontal`},()=>r);Oo({trapFocus:()=>f()&&a.isOpen(),onMountAutoFocus:e=>{o===void 0&&l.onOpenAutoFocus?.(e)},onUnmountAutoFocus:l.onCloseAutoFocus},()=>r);let m=e=>{if(zt(e.currentTarget,e.target)&&(e.key===`Tab`&&a.isOpen()&&e.preventDefault(),o!==void 0&&e.currentTarget.getAttribute(`aria-haspopup`)!==`true`))switch(e.key){case Cs.next(c(),i.orientation()):e.stopPropagation(),e.preventDefault(),a.close(!0),o.setAutoFocusMenu(!0),o.nextMenu();break;case Cs.previous(c(),i.orientation()):if(e.currentTarget.hasAttribute(`data-closed`))break;e.stopPropagation(),e.preventDefault(),a.close(!0),o.setAutoFocusMenu(!0),o.previousMenu();break}},h=e=>{l.onEscapeKeyDown?.(e),o?.setAutoFocusMenu(!1),a.close(!0)},_=e=>{l.onFocusOutside?.(e),i.isModal()&&e.preventDefault()},v=e=>{q(e,l.onPointerEnter),a.isOpen()&&(a.parentMenuContext()?.listState().selectionManager().setFocused(!1),a.parentMenuContext()?.listState().selectionManager().setFocusedKey(void 0))},y=e=>{if(q(e,l.onPointerMove),e.pointerType!==`mouse`)return;let t=e.target,n=d!==e.clientX;zt(e.currentTarget,t)&&n&&(a.setPointerDir(e.clientX>d?`right`:`left`),d=e.clientX)};I(()=>g(a.registerContentId(l.id))),g(()=>a.setContentRef(void 0));let b={ref:pt(e=>{a.setContentRef(e),r=e},l.ref),role:`menu`,get id(){return l.id},get tabIndex(){return p.tabIndex()},get"aria-labelledby"(){return a.triggerId()},onKeyDown:J([l.onKeyDown,p.onKeyDown,m]),onMouseDown:J([l.onMouseDown,p.onMouseDown]),onFocusIn:J([l.onFocusIn,p.onFocusIn]),onFocusOut:J([l.onFocusOut,p.onFocusOut]),onPointerEnter:v,onPointerMove:y,get"data-orientation"(){return i.orientation()}};return B(R,{get when(){return a.contentPresent()},get children(){return B(R,{get when(){return s===void 0||a.parentMenuContext()!=null},get fallback(){return B(X,j({as:`div`},()=>a.dataset(),b,u))},get children(){return B(Ra.Positioner,{get children(){return B(co,j({get disableOutsidePointerEvents(){return t(()=>!!f())()&&a.isOpen()},get excludedElements(){return[a.triggerRef]},bypassTopMostLayerCheck:!0,get style(){return Mt({"--kb-menu-content-transform-origin":`var(--kb-popper-content-transform-origin)`,position:`relative`},l.style)},onEscapeKeyDown:h,onFocusOutside:_,get onDismiss(){return a.close}},()=>a.dataset(),b,u))}})}})}})}function Ds(e){let t,r=bs(),i=gs(),[a,o]=n(e,[`ref`]);return qo({element:()=>t??null,enabled:()=>i.contentPresent()&&r.preventScroll()}),B(Es,j({ref(e){let n=pt(e=>{t=e},a.ref);typeof n==`function`&&n(e)}},o))}var Os=k();function ks(){let e=L(Os);if(e===void 0)throw Error("[kobalte]: `useMenuGroupContext` must be used within a `Menu.Group` component");return e}function As(e){let t=Y({id:bs().generateId(`group-${V()}`)},e),[n,r]=T(),i={generateId:Rt(()=>t.id),registerLabelId:uo(r)};return B(Os.Provider,{value:i,get children(){return B(X,j({as:`div`,role:`group`,get"aria-labelledby"(){return n()}},t))}})}function js(e){let t=ks(),[r,i]=n(Y({id:t.generateId(`label`)},e),[`id`]);return I(()=>g(t.registerLabelId(r.id))),B(X,j({as:`span`,get id(){return r.id},"aria-hidden":`true`},i))}function Ms(e){let t=gs();return B(X,j({as:`span`,"aria-hidden":`true`},()=>t.dataset(),Y({children:`▼`},e)))}function Ns(e){return B(xs,j({role:`menuitem`,closeOnSelect:!0},e))}function Ps(e){let t=vs(),[r,i]=n(Y({id:t.generateId(`description`)},e),[`id`]);return I(()=>g(t.registerDescription(r.id))),B(X,j({as:`div`,get id(){return r.id}},()=>t.dataset(),i))}function Fs(e){let t=vs(),[r,i]=n(Y({id:t.generateId(`indicator`)},e),[`forceMount`]);return B(R,{get when(){return r.forceMount||t.isChecked()},get children(){return B(X,j({as:`div`},()=>t.dataset(),i))}})}function Is(e){let t=vs(),[r,i]=n(Y({id:t.generateId(`label`)},e),[`ref`,`id`]);return I(()=>g(t.registerLabel(r.id))),B(X,j({as:`div`,ref(e){let n=pt(t.setLabelRef,r.ref);typeof n==`function`&&n(e)},get id(){return r.id}},()=>t.dataset(),i))}function Ls(e){let t=gs();return B(R,{get when(){return t.contentPresent()},get children(){return B(F,e)}})}var Rs=k();function zs(){let e=L(Rs);if(e===void 0)throw Error("[kobalte]: `useMenuRadioGroupContext` must be used within a `Menu.RadioGroup` component");return e}function Bs(e){let[t,r]=n(Y({id:bs().generateId(`radiogroup-${V()}`)},e),[`value`,`defaultValue`,`onChange`,`disabled`]),[i,a]=Fn({value:()=>t.value,defaultValue:()=>t.defaultValue,onChange:e=>t.onChange?.(e)});return B(Rs.Provider,{value:{isDisabled:()=>t.disabled,isSelectedValue:e=>e===i(),setSelectedValue:e=>a(e)},get children(){return B(As,r)}})}function Vs(e){let t=zs(),[r,i]=n(Y({closeOnSelect:!1},e),[`value`,`onSelect`]);return B(xs,j({role:`menuitemradio`,get checked(){return t.isSelectedValue(r.value)},onSelect:()=>{r.onSelect?.(),t.setSelectedValue(r.value)}},i))}function Hs(e,t,n){let r=e.split(`-`)[0],i=n.getBoundingClientRect(),a=[],o=t.clientX,s=t.clientY;switch(r){case`top`:a.push([o,s+5]),a.push([i.left,i.bottom]),a.push([i.left,i.top]),a.push([i.right,i.top]),a.push([i.right,i.bottom]);break;case`right`:a.push([o-5,s]),a.push([i.left,i.top]),a.push([i.right,i.top]),a.push([i.right,i.bottom]),a.push([i.left,i.bottom]);break;case`bottom`:a.push([o,s-5]),a.push([i.right,i.top]),a.push([i.right,i.bottom]),a.push([i.left,i.bottom]),a.push([i.left,i.top]);break;case`left`:a.push([o+5,s]),a.push([i.right,i.bottom]),a.push([i.left,i.bottom]),a.push([i.left,i.top]),a.push([i.right,i.top]);break}return a}function Us(e,t){return t?yn([e.clientX,e.clientY],t):!1}function Ws(e){let t=bs(),r=gr(),i=hs(),a=ds(),o=ps(),[s,c]=n(Y({placement:t.orientation()===`horizontal`?`bottom-start`:`right-start`},e),[`open`,`defaultOpen`,`onOpenChange`]),l=0,u=null,d=`right`,[f,p]=T(),[m,h]=T(),[_,v]=T(),[y,b]=T(),[x,S]=T(!0),[C,w]=T(c.placement),[ee,E]=T([]),[D,te]=T([]),{DomCollectionProvider:O}=Tr({items:D,onItemsChange:te}),k=lo({open:()=>s.open,defaultOpen:()=>s.defaultOpen,onOpenChange:e=>s.onOpenChange?.(e)}),{present:ne}=po({show:()=>t.forceMount()||k.isOpen(),element:()=>y()??null}),A=mr({selectionMode:`none`,dataSource:D}),re=e=>{S(e),k.open()},M=(e=!1)=>{k.close(),e&&i&&i.close(!0)},N=e=>{S(e),k.toggle()},F=()=>{let e=y();e&&(Qt(e),A.selectionManager().setFocused(!0),A.selectionManager().setFocusedKey(void 0))},ie=()=>{o==null?F():setTimeout(()=>F())},L=e=>{E(t=>[...t,e]);let t=i?.registerNestedMenu(e);return()=>{E(t=>Pt(t,e)),t?.()}},z=e=>d===u?.side&&Us(e,u?.area),ae=e=>{z(e)&&e.preventDefault()},V=e=>{z(e)||ie()},oe=e=>{z(e)&&e.preventDefault()};Ao({isDisabled:()=>!(i==null&&k.isOpen()&&t.isModal()),targets:()=>[y(),...ee()].filter(Boolean)}),I(()=>{let e=y();if(!e||!i)return;let t=i.registerNestedMenu(e);g(()=>{t()})}),I(()=>{i===void 0&&a?.registerMenu(t.value(),[y(),...ee()])}),I(()=>{i!==void 0||a===void 0||(a.value()===t.value()?(_()?.focus(),a.autoFocusMenu()&&re(!0)):M())}),I(()=>{i!==void 0||a===void 0||k.isOpen()&&a.setValue(t.value())}),g(()=>{i===void 0&&a?.unregisterMenu(t.value())});let se={dataset:P(()=>({"data-expanded":k.isOpen()?``:void 0,"data-closed":k.isOpen()?void 0:``})),isOpen:k.isOpen,contentPresent:ne,nestedMenus:ee,currentPlacement:C,pointerGraceTimeoutId:()=>l,autoFocus:x,listState:()=>A,parentMenuContext:()=>i,triggerRef:_,contentRef:y,triggerId:f,contentId:m,setTriggerRef:v,setContentRef:b,open:re,close:M,toggle:N,focusContent:ie,onItemEnter:ae,onItemLeave:V,onTriggerLeave:oe,setPointerDir:e=>d=e,setPointerGraceTimeoutId:e=>l=e,setPointerGraceIntent:e=>u=e,registerNestedMenu:L,registerItemToParentDomCollection:r?.registerItem,registerTriggerId:uo(p),registerContentId:uo(h)};return B(O,{get children(){return B(ms.Provider,{value:se,get children(){return B(R,{when:o===void 0,get fallback(){return c.children},get children(){return B(Ra,j({anchorRef:_,contentRef:y,onCurrentPlacementChange:w},c))}})}})}})}function Gs(e){let{direction:t}=Zn();return B(Ws,j({get placement(){return t()===`rtl`?`left-start`:`right-start`},flip:!0},e))}var Ks={close:(e,t)=>e===`ltr`?[t===`horizontal`?`ArrowLeft`:`ArrowUp`]:[t===`horizontal`?`ArrowRight`:`ArrowDown`]};function qs(e){let t=gs(),r=bs(),[i,a]=n(e,[`onFocusOutside`,`onKeyDown`]),{direction:o}=Zn();return B(Es,j({onOpenAutoFocus:e=>{e.preventDefault()},onCloseAutoFocus:e=>{e.preventDefault()},onFocusOutside:e=>{i.onFocusOutside?.(e);let n=e.target;zt(t.triggerRef(),n)||t.close()},onKeyDown:e=>{q(e,i.onKeyDown);let n=zt(e.currentTarget,e.target),a=Ks.close(o(),r.orientation()).includes(e.key),s=t.parentMenuContext()!=null;n&&a&&s&&(t.close(),Qt(t.triggerRef()))}},a))}var Js=[`Enter`,` `],Ys={open:(e,t)=>e===`ltr`?[...Js,t===`horizontal`?`ArrowRight`:`ArrowDown`]:[...Js,t===`horizontal`?`ArrowLeft`:`ArrowUp`]};function Xs(e){let r,i=bs(),a=gs(),[o,s]=n(Y({id:i.generateId(`sub-trigger-${V()}`)},e),[`ref`,`id`,`textValue`,`disabled`,`onPointerMove`,`onPointerLeave`,`onPointerDown`,`onPointerUp`,`onClick`,`onKeyDown`,`onMouseDown`,`onFocus`]),c=null,l=()=>{c&&window.clearTimeout(c),c=null},{direction:u}=Zn(),d=()=>o.id,f=()=>{let e=a.parentMenuContext();if(e==null)throw Error("[kobalte]: `Menu.SubTrigger` must be used within a `Menu.Sub` component");return e.listState().selectionManager()},p=()=>a.listState().collection(),h=()=>f().focusedKey()===d(),_=dr({key:d,selectionManager:f,shouldSelectOnPressUp:!0,allowsDifferentPressOrigin:!0,disabled:()=>o.disabled},()=>r),v=e=>{q(e,o.onClick),!a.isOpen()&&!o.disabled&&a.open(!0)},y=e=>{if(q(e,o.onPointerMove),e.pointerType!==`mouse`)return;let t=a.parentMenuContext();if(t?.onItemEnter(e),!e.defaultPrevented){if(o.disabled){t?.onItemLeave(e);return}!a.isOpen()&&!c&&(a.parentMenuContext()?.setPointerGraceIntent(null),c=window.setTimeout(()=>{a.open(!1),l()},100)),t?.onItemEnter(e),e.defaultPrevented||(a.listState().selectionManager().isFocused()&&(a.listState().selectionManager().setFocused(!1),a.listState().selectionManager().setFocusedKey(void 0)),Qt(e.currentTarget),t?.listState().selectionManager().setFocused(!0),t?.listState().selectionManager().setFocusedKey(d()))}},b=e=>{if(q(e,o.onPointerLeave),e.pointerType!==`mouse`)return;l();let t=a.parentMenuContext(),n=a.contentRef();if(n){t?.setPointerGraceIntent({area:Hs(a.currentPlacement(),e,n),side:a.currentPlacement().split(`-`)[0]}),window.clearTimeout(t?.pointerGraceTimeoutId());let r=window.setTimeout(()=>{t?.setPointerGraceIntent(null)},300);t?.setPointerGraceTimeoutId(r)}else{if(t?.onTriggerLeave(e),e.defaultPrevented)return;t?.setPointerGraceIntent(null)}t?.onItemLeave(e)},x=e=>{q(e,o.onKeyDown),!e.repeat&&(o.disabled||Ys.open(u(),i.orientation()).includes(e.key)&&(e.stopPropagation(),e.preventDefault(),f().setFocused(!1),f().setFocusedKey(void 0),a.isOpen()||a.open(`first`),a.focusContent(),a.listState().selectionManager().setFocused(!0),a.listState().selectionManager().setFocusedKey(p().getFirstKey())))};return I(()=>{if(a.registerItemToParentDomCollection==null)throw Error("[kobalte]: `Menu.SubTrigger` must be used within a `Menu.Sub` component");g(a.registerItemToParentDomCollection({ref:()=>r,type:`item`,key:d(),textValue:o.textValue??r?.textContent??``,disabled:o.disabled??!1}))}),I(m(()=>a.parentMenuContext()?.pointerGraceTimeoutId(),e=>{g(()=>{window.clearTimeout(e),a.parentMenuContext()?.setPointerGraceIntent(null)})})),I(()=>g(a.registerTriggerId(o.id))),g(()=>{l()}),B(X,j({as:`div`,ref(e){let t=pt(e=>{a.setTriggerRef(e),r=e},o.ref);typeof t==`function`&&t(e)},get id(){return o.id},role:`menuitem`,get tabIndex(){return _.tabIndex()},"aria-haspopup":`true`,get"aria-expanded"(){return a.isOpen()},get"aria-controls"(){return t(()=>!!a.isOpen())()?a.contentId():void 0},get"aria-disabled"(){return o.disabled},get"data-key"(){return _.dataKey()},get"data-highlighted"(){return h()?``:void 0},get"data-disabled"(){return o.disabled?``:void 0},get onPointerDown(){return J([o.onPointerDown,_.onPointerDown])},get onPointerUp(){return J([o.onPointerUp,_.onPointerUp])},get onClick(){return J([v,_.onClick])},get onKeyDown(){return J([x,_.onKeyDown])},get onMouseDown(){return J([o.onMouseDown,_.onMouseDown])},get onFocus(){return J([o.onFocus,_.onFocus])},onPointerMove:y,onPointerLeave:b},()=>a.dataset(),s))}function Zs(e){let t=ds(),[r,i]=n(Y({id:`menu-${V()}`,modal:!0},e),[`id`,`modal`,`preventScroll`,`forceMount`,`open`,`defaultOpen`,`onOpenChange`,`value`,`orientation`]),a=lo({open:()=>r.open,defaultOpen:()=>r.defaultOpen,onOpenChange:e=>r.onOpenChange?.(e)}),o={isModal:()=>r.modal??!0,preventScroll:()=>r.preventScroll??o.isModal(),forceMount:()=>r.forceMount??!1,generateId:Rt(()=>r.id),value:()=>r.value,orientation:()=>r.orientation??t?.orientation()??`horizontal`};return B(ys.Provider,{value:o,get children(){return B(Ws,j({get open(){return a.isOpen()},get onOpenChange(){return a.setIsOpen}},i))}})}An({},{Root:()=>Qs,Separator:()=>$s});function Qs(e){let t,[r,i]=n(Y({orientation:`horizontal`},e),[`ref`,`orientation`]),a=Dn(()=>t,()=>`hr`);return B(X,j({as:`hr`,ref(e){let n=pt(e=>t=e,r.ref);typeof n==`function`&&n(e)},get role(){return a()===`hr`?void 0:`separator`},get"aria-orientation"(){return r.orientation===`vertical`?`vertical`:void 0},get"data-orientation"(){return r.orientation}},i))}var $s=Qs,Z={};An(Z,{Arrow:()=>ka,CheckboxItem:()=>Ss,Content:()=>ec,DropdownMenu:()=>nc,Group:()=>As,GroupLabel:()=>js,Icon:()=>Ms,Item:()=>Ns,ItemDescription:()=>Ps,ItemIndicator:()=>Fs,ItemLabel:()=>Is,Portal:()=>Ls,RadioGroup:()=>Bs,RadioItem:()=>Vs,Root:()=>tc,Separator:()=>Qs,Sub:()=>Gs,SubContent:()=>qs,SubTrigger:()=>Xs,Trigger:()=>Ts});function ec(e){let t=bs(),r=gs(),[i,a]=n(e,[`onCloseAutoFocus`,`onInteractOutside`]),o=!1;return B(Ds,j({onCloseAutoFocus:e=>{i.onCloseAutoFocus?.(e),o||Qt(r.triggerRef()),o=!1,e.preventDefault()},onInteractOutside:e=>{i.onInteractOutside?.(e),(!t.isModal()||e.detail.isContextMenu)&&(o=!0)}},a))}function tc(e){return B(Zs,Y({id:`dropdownmenu-${V()}`},e))}var nc=Object.assign(tc,{Arrow:ka,CheckboxItem:Ss,Content:ec,Group:As,GroupLabel:js,Icon:Ms,Item:Ns,ItemDescription:Ps,ItemIndicator:Fs,ItemLabel:Is,Portal:Ls,RadioGroup:Bs,RadioItem:Vs,Separator:Qs,Sub:Gs,SubContent:qs,SubTrigger:Xs,Trigger:Ts}),Q={colors:{inherit:`inherit`,current:`currentColor`,transparent:`transparent`,black:`#000000`,white:`#ffffff`,neutral:{50:`#f9fafb`,100:`#f2f4f7`,200:`#eaecf0`,300:`#d0d5dd`,400:`#98a2b3`,500:`#667085`,600:`#475467`,700:`#344054`,800:`#1d2939`,900:`#101828`},darkGray:{50:`#525c7a`,100:`#49536e`,200:`#414962`,300:`#394056`,400:`#313749`,500:`#292e3d`,600:`#212530`,700:`#191c24`,800:`#111318`,900:`#0b0d10`},gray:{50:`#f9fafb`,100:`#f2f4f7`,200:`#eaecf0`,300:`#d0d5dd`,400:`#98a2b3`,500:`#667085`,600:`#475467`,700:`#344054`,800:`#1d2939`,900:`#101828`},blue:{25:`#F5FAFF`,50:`#EFF8FF`,100:`#D1E9FF`,200:`#B2DDFF`,300:`#84CAFF`,400:`#53B1FD`,500:`#2E90FA`,600:`#1570EF`,700:`#175CD3`,800:`#1849A9`,900:`#194185`},green:{25:`#F6FEF9`,50:`#ECFDF3`,100:`#D1FADF`,200:`#A6F4C5`,300:`#6CE9A6`,400:`#32D583`,500:`#12B76A`,600:`#039855`,700:`#027A48`,800:`#05603A`,900:`#054F31`},red:{50:`#fef2f2`,100:`#fee2e2`,200:`#fecaca`,300:`#fca5a5`,400:`#f87171`,500:`#ef4444`,600:`#dc2626`,700:`#b91c1c`,800:`#991b1b`,900:`#7f1d1d`,950:`#450a0a`},yellow:{25:`#FFFCF5`,50:`#FFFAEB`,100:`#FEF0C7`,200:`#FEDF89`,300:`#FEC84B`,400:`#FDB022`,500:`#F79009`,600:`#DC6803`,700:`#B54708`,800:`#93370D`,900:`#7A2E0E`},purple:{25:`#FAFAFF`,50:`#F4F3FF`,100:`#EBE9FE`,200:`#D9D6FE`,300:`#BDB4FE`,400:`#9B8AFB`,500:`#7A5AF8`,600:`#6938EF`,700:`#5925DC`,800:`#4A1FB8`,900:`#3E1C96`},teal:{25:`#F6FEFC`,50:`#F0FDF9`,100:`#CCFBEF`,200:`#99F6E0`,300:`#5FE9D0`,400:`#2ED3B7`,500:`#15B79E`,600:`#0E9384`,700:`#107569`,800:`#125D56`,900:`#134E48`},pink:{25:`#fdf2f8`,50:`#fce7f3`,100:`#fbcfe8`,200:`#f9a8d4`,300:`#f472b6`,400:`#ec4899`,500:`#db2777`,600:`#be185d`,700:`#9d174d`,800:`#831843`,900:`#500724`},cyan:{25:`#ecfeff`,50:`#cffafe`,100:`#a5f3fc`,200:`#67e8f9`,300:`#22d3ee`,400:`#06b6d4`,500:`#0891b2`,600:`#0e7490`,700:`#155e75`,800:`#164e63`,900:`#083344`}},alpha:{100:`ff`,90:`e5`,80:`cc`,70:`b3`,60:`99`,50:`80`,40:`66`,30:`4d`,20:`33`,10:`1a`,0:`00`},font:{size:{"2xs":`calc(var(--tsqd-font-size) * 0.625)`,xs:`calc(var(--tsqd-font-size) * 0.75)`,sm:`calc(var(--tsqd-font-size) * 0.875)`,md:`var(--tsqd-font-size)`,lg:`calc(var(--tsqd-font-size) * 1.125)`,xl:`calc(var(--tsqd-font-size) * 1.25)`,"2xl":`calc(var(--tsqd-font-size) * 1.5)`,"3xl":`calc(var(--tsqd-font-size) * 1.875)`,"4xl":`calc(var(--tsqd-font-size) * 2.25)`,"5xl":`calc(var(--tsqd-font-size) * 3)`,"6xl":`calc(var(--tsqd-font-size) * 3.75)`,"7xl":`calc(var(--tsqd-font-size) * 4.5)`,"8xl":`calc(var(--tsqd-font-size) * 6)`,"9xl":`calc(var(--tsqd-font-size) * 8)`},lineHeight:{xs:`calc(var(--tsqd-font-size) * 1)`,sm:`calc(var(--tsqd-font-size) * 1.25)`,md:`calc(var(--tsqd-font-size) * 1.5)`,lg:`calc(var(--tsqd-font-size) * 1.75)`,xl:`calc(var(--tsqd-font-size) * 2)`,"2xl":`calc(var(--tsqd-font-size) * 2.25)`,"3xl":`calc(var(--tsqd-font-size) * 2.5)`,"4xl":`calc(var(--tsqd-font-size) * 2.75)`,"5xl":`calc(var(--tsqd-font-size) * 3)`,"6xl":`calc(var(--tsqd-font-size) * 3.25)`,"7xl":`calc(var(--tsqd-font-size) * 3.5)`,"8xl":`calc(var(--tsqd-font-size) * 3.75)`,"9xl":`calc(var(--tsqd-font-size) * 4)`},weight:{thin:`100`,extralight:`200`,light:`300`,normal:`400`,medium:`500`,semibold:`600`,bold:`700`,extrabold:`800`,black:`900`}},breakpoints:{xs:`320px`,sm:`640px`,md:`768px`,lg:`1024px`,xl:`1280px`,"2xl":`1536px`},border:{radius:{none:`0px`,xs:`calc(var(--tsqd-font-size) * 0.125)`,sm:`calc(var(--tsqd-font-size) * 0.25)`,md:`calc(var(--tsqd-font-size) * 0.375)`,lg:`calc(var(--tsqd-font-size) * 0.5)`,xl:`calc(var(--tsqd-font-size) * 0.75)`,"2xl":`calc(var(--tsqd-font-size) * 1)`,"3xl":`calc(var(--tsqd-font-size) * 1.5)`,full:`9999px`}},size:{0:`0px`,.25:`calc(var(--tsqd-font-size) * 0.0625)`,.5:`calc(var(--tsqd-font-size) * 0.125)`,1:`calc(var(--tsqd-font-size) * 0.25)`,1.5:`calc(var(--tsqd-font-size) * 0.375)`,2:`calc(var(--tsqd-font-size) * 0.5)`,2.5:`calc(var(--tsqd-font-size) * 0.625)`,3:`calc(var(--tsqd-font-size) * 0.75)`,3.5:`calc(var(--tsqd-font-size) * 0.875)`,4:`calc(var(--tsqd-font-size) * 1)`,4.5:`calc(var(--tsqd-font-size) * 1.125)`,5:`calc(var(--tsqd-font-size) * 1.25)`,5.5:`calc(var(--tsqd-font-size) * 1.375)`,6:`calc(var(--tsqd-font-size) * 1.5)`,6.5:`calc(var(--tsqd-font-size) * 1.625)`,7:`calc(var(--tsqd-font-size) * 1.75)`,8:`calc(var(--tsqd-font-size) * 2)`,9:`calc(var(--tsqd-font-size) * 2.25)`,10:`calc(var(--tsqd-font-size) * 2.5)`,11:`calc(var(--tsqd-font-size) * 2.75)`,12:`calc(var(--tsqd-font-size) * 3)`,14:`calc(var(--tsqd-font-size) * 3.5)`,16:`calc(var(--tsqd-font-size) * 4)`,20:`calc(var(--tsqd-font-size) * 5)`,24:`calc(var(--tsqd-font-size) * 6)`,28:`calc(var(--tsqd-font-size) * 7)`,32:`calc(var(--tsqd-font-size) * 8)`,36:`calc(var(--tsqd-font-size) * 9)`,40:`calc(var(--tsqd-font-size) * 10)`,44:`calc(var(--tsqd-font-size) * 11)`,48:`calc(var(--tsqd-font-size) * 12)`,52:`calc(var(--tsqd-font-size) * 13)`,56:`calc(var(--tsqd-font-size) * 14)`,60:`calc(var(--tsqd-font-size) * 15)`,64:`calc(var(--tsqd-font-size) * 16)`,72:`calc(var(--tsqd-font-size) * 18)`,80:`calc(var(--tsqd-font-size) * 20)`,96:`calc(var(--tsqd-font-size) * 24)`},shadow:{xs:(e=`rgb(0 0 0 / 0.1)`)=>`0 1px 2px 0 rgb(0 0 0 / 0.05)`,sm:(e=`rgb(0 0 0 / 0.1)`)=>`0 1px 3px 0 ${e}, 0 1px 2px -1px ${e}`,md:(e=`rgb(0 0 0 / 0.1)`)=>`0 4px 6px -1px ${e}, 0 2px 4px -2px ${e}`,lg:(e=`rgb(0 0 0 / 0.1)`)=>`0 10px 15px -3px ${e}, 0 4px 6px -4px ${e}`,xl:(e=`rgb(0 0 0 / 0.1)`)=>`0 20px 25px -5px ${e}, 0 8px 10px -6px ${e}`,"2xl":(e=`rgb(0 0 0 / 0.25)`)=>`0 25px 50px -12px ${e}`,inner:(e=`rgb(0 0 0 / 0.05)`)=>`inset 0 2px 4px 0 ${e}`,none:()=>`none`},zIndices:{hide:-1,auto:`auto`,base:0,docked:10,dropdown:1e3,sticky:1100,banner:1200,overlay:1300,modal:1400,popover:1500,skipLink:1600,toast:1700,tooltip:1800}},rc=x(`<svg width=14 height=14 viewBox="0 0 14 14"fill=none xmlns=http://www.w3.org/2000/svg><path d="M13 13L9.00007 9M10.3333 5.66667C10.3333 8.244 8.244 10.3333 5.66667 10.3333C3.08934 10.3333 1 8.244 1 5.66667C1 3.08934 3.08934 1 5.66667 1C8.244 1 10.3333 3.08934 10.3333 5.66667Z"stroke=currentColor stroke-width=1.66667 stroke-linecap=round stroke-linejoin=round>`),ic=x(`<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M9 3H15M3 6H21M19 6L18.2987 16.5193C18.1935 18.0975 18.1409 18.8867 17.8 19.485C17.4999 20.0118 17.0472 20.4353 16.5017 20.6997C15.882 21 15.0911 21 13.5093 21H10.4907C8.90891 21 8.11803 21 7.49834 20.6997C6.95276 20.4353 6.50009 20.0118 6.19998 19.485C5.85911 18.8867 5.8065 18.0975 5.70129 16.5193L5 6M10 10.5V15.5M14 10.5V15.5"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),ac=x(`<svg width=10 height=6 viewBox="0 0 10 6"fill=none xmlns=http://www.w3.org/2000/svg><path d="M1 1L5 5L9 1"stroke=currentColor stroke-width=1.66667 stroke-linecap=round stroke-linejoin=round>`),oc=x(`<svg width=12 height=12 viewBox="0 0 16 16"fill=none xmlns=http://www.w3.org/2000/svg><path d="M8 13.3333V2.66667M8 2.66667L4 6.66667M8 2.66667L12 6.66667"stroke=currentColor stroke-width=1.66667 stroke-linecap=round stroke-linejoin=round>`),sc=x(`<svg width=12 height=12 viewBox="0 0 16 16"fill=none xmlns=http://www.w3.org/2000/svg><path d="M8 2.66667V13.3333M8 13.3333L4 9.33333M8 13.3333L12 9.33333"stroke=currentColor stroke-width=1.66667 stroke-linecap=round stroke-linejoin=round>`),cc=x(`<svg width=12 height=12 viewBox="0 0 16 16"fill=none xmlns=http://www.w3.org/2000/svg style=transform:rotate(90deg)><path d="M8 2.66667V13.3333M8 13.3333L4 9.33333M8 13.3333L12 9.33333"stroke=currentColor stroke-width=1.66667 stroke-linecap=round stroke-linejoin=round>`),lc=x(`<svg width=12 height=12 viewBox="0 0 16 16"fill=none xmlns=http://www.w3.org/2000/svg style=transform:rotate(-90deg)><path d="M8 2.66667V13.3333M8 13.3333L4 9.33333M8 13.3333L12 9.33333"stroke=currentColor stroke-width=1.66667 stroke-linecap=round stroke-linejoin=round>`),uc=x(`<svg viewBox="0 0 24 24"height=12 width=12 fill=none xmlns=http://www.w3.org/2000/svg><path d="M12 2v2m0 16v2M4 12H2m4.314-5.686L4.9 4.9m12.786 1.414L19.1 4.9M6.314 17.69 4.9 19.104m12.786-1.414 1.414 1.414M22 12h-2m-3 0a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),dc=x(`<svg viewBox="0 0 24 24"height=12 width=12 fill=none xmlns=http://www.w3.org/2000/svg><path d="M22 15.844a10.424 10.424 0 0 1-4.306.925c-5.779 0-10.463-4.684-10.463-10.462 0-1.536.33-2.994.925-4.307A10.464 10.464 0 0 0 2 11.538C2 17.316 6.684 22 12.462 22c4.243 0 7.896-2.526 9.538-6.156Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),fc=x(`<svg viewBox="0 0 24 24"height=12 width=12 fill=none xmlns=http://www.w3.org/2000/svg><path d="M8 21h8m-4-4v4m-5.2-4h10.4c1.68 0 2.52 0 3.162-.327a3 3 0 0 0 1.311-1.311C22 14.72 22 13.88 22 12.2V7.8c0-1.68 0-2.52-.327-3.162a3 3 0 0 0-1.311-1.311C19.72 3 18.88 3 17.2 3H6.8c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.311 1.311C2 5.28 2 6.12 2 7.8v4.4c0 1.68 0 2.52.327 3.162a3 3 0 0 0 1.311 1.311C4.28 17 5.12 17 6.8 17Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),pc=x(`<svg stroke=currentColor fill=currentColor stroke-width=0 viewBox="0 0 24 24"height=1em width=1em xmlns=http://www.w3.org/2000/svg><path fill=none d="M0 0h24v24H0z"></path><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3a4.237 4.237 0 00-6 0zm-4-4l2 2a7.074 7.074 0 0110 0l2-2C15.14 9.14 8.87 9.14 5 13z">`),mc=x(`<svg stroke-width=0 viewBox="0 0 24 24"height=1em width=1em xmlns=http://www.w3.org/2000/svg><path fill=none d="M24 .01c0-.01 0-.01 0 0L0 0v24h24V.01zM0 0h24v24H0V0zm0 0h24v24H0V0z"></path><path d="M22.99 9C19.15 5.16 13.8 3.76 8.84 4.78l2.52 2.52c3.47-.17 6.99 1.05 9.63 3.7l2-2zm-4 4a9.793 9.793 0 00-4.49-2.56l3.53 3.53.96-.97zM2 3.05L5.07 6.1C3.6 6.82 2.22 7.78 1 9l1.99 2c1.24-1.24 2.67-2.16 4.2-2.77l2.24 2.24A9.684 9.684 0 005 13v.01L6.99 15a7.042 7.042 0 014.92-2.06L18.98 20l1.27-1.26L3.29 1.79 2 3.05zM9 17l3 3 3-3a4.237 4.237 0 00-6 0z">`),hc=x(`<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M9.3951 19.3711L9.97955 20.6856C10.1533 21.0768 10.4368 21.4093 10.7958 21.6426C11.1547 21.8759 11.5737 22.0001 12.0018 22C12.4299 22.0001 12.8488 21.8759 13.2078 21.6426C13.5667 21.4093 13.8503 21.0768 14.024 20.6856L14.6084 19.3711C14.8165 18.9047 15.1664 18.5159 15.6084 18.26C16.0532 18.0034 16.5678 17.8941 17.0784 17.9478L18.5084 18.1C18.9341 18.145 19.3637 18.0656 19.7451 17.8713C20.1265 17.6771 20.4434 17.3763 20.6573 17.0056C20.8715 16.635 20.9735 16.2103 20.9511 15.7829C20.9286 15.3555 20.7825 14.9438 20.5307 14.5978L19.684 13.4344C19.3825 13.0171 19.2214 12.5148 19.224 12C19.2239 11.4866 19.3865 10.9864 19.6884 10.5711L20.5351 9.40778C20.787 9.06175 20.933 8.65007 20.9555 8.22267C20.978 7.79528 20.8759 7.37054 20.6618 7C20.4479 6.62923 20.131 6.32849 19.7496 6.13423C19.3681 5.93997 18.9386 5.86053 18.5129 5.90556L17.0829 6.05778C16.5722 6.11141 16.0577 6.00212 15.6129 5.74556C15.17 5.48825 14.82 5.09736 14.6129 4.62889L14.024 3.31444C13.8503 2.92317 13.5667 2.59072 13.2078 2.3574C12.8488 2.12408 12.4299 1.99993 12.0018 2C11.5737 1.99993 11.1547 2.12408 10.7958 2.3574C10.4368 2.59072 10.1533 2.92317 9.97955 3.31444L9.3951 4.62889C9.18803 5.09736 8.83798 5.48825 8.3951 5.74556C7.95032 6.00212 7.43577 6.11141 6.9251 6.05778L5.49066 5.90556C5.06499 5.86053 4.6354 5.93997 4.25397 6.13423C3.87255 6.32849 3.55567 6.62923 3.34177 7C3.12759 7.37054 3.02555 7.79528 3.04804 8.22267C3.07052 8.65007 3.21656 9.06175 3.46844 9.40778L4.3151 10.5711C4.61704 10.9864 4.77964 11.4866 4.77955 12C4.77964 12.5134 4.61704 13.0137 4.3151 13.4289L3.46844 14.5922C3.21656 14.9382 3.07052 15.3499 3.04804 15.7773C3.02555 16.2047 3.12759 16.6295 3.34177 17C3.55589 17.3706 3.8728 17.6712 4.25417 17.8654C4.63554 18.0596 5.06502 18.1392 5.49066 18.0944L6.92066 17.9422C7.43133 17.8886 7.94587 17.9979 8.39066 18.2544C8.83519 18.511 9.18687 18.902 9.3951 19.3711Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round></path><path d="M12 15C13.6568 15 15 13.6569 15 12C15 10.3431 13.6568 9 12 9C10.3431 9 8.99998 10.3431 8.99998 12C8.99998 13.6569 10.3431 15 12 15Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),gc=x(`<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M16 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V8M11.5 12.5L17 7M17 7H12M17 7V12M6.2 21H8.8C9.9201 21 10.4802 21 10.908 20.782C11.2843 20.5903 11.5903 20.2843 11.782 19.908C12 19.4802 12 18.9201 12 17.8V15.2C12 14.0799 12 13.5198 11.782 13.092C11.5903 12.7157 11.2843 12.4097 10.908 12.218C10.4802 12 9.92011 12 8.8 12H6.2C5.0799 12 4.51984 12 4.09202 12.218C3.71569 12.4097 3.40973 12.7157 3.21799 13.092C3 13.5198 3 14.0799 3 15.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),_c=x(`<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path class=copier d="M8 8V5.2C8 4.0799 8 3.51984 8.21799 3.09202C8.40973 2.71569 8.71569 2.40973 9.09202 2.21799C9.51984 2 10.0799 2 11.2 2H18.8C19.9201 2 20.4802 2 20.908 2.21799C21.2843 2.40973 21.5903 2.71569 21.782 3.09202C22 3.51984 22 4.0799 22 5.2V12.8C22 13.9201 22 14.4802 21.782 14.908C21.5903 15.2843 21.2843 15.5903 20.908 15.782C20.4802 16 19.9201 16 18.8 16H16M5.2 22H12.8C13.9201 22 14.4802 22 14.908 21.782C15.2843 21.5903 15.5903 21.2843 15.782 20.908C16 20.4802 16 19.9201 16 18.8V11.2C16 10.0799 16 9.51984 15.782 9.09202C15.5903 8.71569 15.2843 8.40973 14.908 8.21799C14.4802 8 13.9201 8 12.8 8H5.2C4.0799 8 3.51984 8 3.09202 8.21799C2.71569 8.40973 2.40973 8.71569 2.21799 9.09202C2 9.51984 2 10.0799 2 11.2V18.8C2 19.9201 2 20.4802 2.21799 20.908C2.40973 21.2843 2.71569 21.5903 3.09202 21.782C3.51984 22 4.07989 22 5.2 22Z"stroke-width=2 stroke-linecap=round stroke-linejoin=round stroke=currentColor>`),vc=x(`<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M2.5 21.4998L8.04927 19.3655C8.40421 19.229 8.58168 19.1607 8.74772 19.0716C8.8952 18.9924 9.0358 18.901 9.16804 18.7984C9.31692 18.6829 9.45137 18.5484 9.72028 18.2795L21 6.99982C22.1046 5.89525 22.1046 4.10438 21 2.99981C19.8955 1.89525 18.1046 1.89524 17 2.99981L5.72028 14.2795C5.45138 14.5484 5.31692 14.6829 5.20139 14.8318C5.09877 14.964 5.0074 15.1046 4.92823 15.2521C4.83911 15.4181 4.77085 15.5956 4.63433 15.9506L2.5 21.4998ZM2.5 21.4998L4.55812 16.1488C4.7054 15.7659 4.77903 15.5744 4.90534 15.4867C5.01572 15.4101 5.1523 15.3811 5.2843 15.4063C5.43533 15.4351 5.58038 15.5802 5.87048 15.8703L8.12957 18.1294C8.41967 18.4195 8.56472 18.5645 8.59356 18.7155C8.61877 18.8475 8.58979 18.9841 8.51314 19.0945C8.42545 19.2208 8.23399 19.2944 7.85107 19.4417L2.5 21.4998Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),yc=x(`<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M7.5 12L10.5 15L16.5 9M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z"stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),bc=x(`<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M9 9L15 15M15 9L9 15M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z"stroke=#F04438 stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),xc=x(`<svg width=24 height=24 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 xmlns=http://www.w3.org/2000/svg><rect class=list width=20 height=20 y=2 x=2 rx=2></rect><line class=list-item y1=7 y2=7 x1=6 x2=18></line><line class=list-item y2=12 y1=12 x1=6 x2=18></line><line class=list-item y1=17 y2=17 x1=6 x2=18>`),Sc=x(`<svg viewBox="0 0 24 24"height=20 width=20 fill=none xmlns=http://www.w3.org/2000/svg><path d="M3 7.8c0-1.68 0-2.52.327-3.162a3 3 0 0 1 1.311-1.311C5.28 3 6.12 3 7.8 3h8.4c1.68 0 2.52 0 3.162.327a3 3 0 0 1 1.311 1.311C21 5.28 21 6.12 21 7.8v8.4c0 1.68 0 2.52-.327 3.162a3 3 0 0 1-1.311 1.311C18.72 21 17.88 21 16.2 21H7.8c-1.68 0-2.52 0-3.162-.327a3 3 0 0 1-1.311-1.311C3 18.72 3 17.88 3 16.2V7.8Z"stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),Cc=x(`<svg width=14 height=14 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M7.5 12L10.5 15L16.5 9M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),wc=x(`<svg width=14 height=14 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M12 2V6M12 18V22M6 12H2M22 12H18M19.0784 19.0784L16.25 16.25M19.0784 4.99994L16.25 7.82837M4.92157 19.0784L7.75 16.25M4.92157 4.99994L7.75 7.82837"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round></path><animateTransform attributeName=transform attributeType=XML type=rotate from=0 to=360 dur=2s repeatCount=indefinite>`),Tc=x(`<svg width=14 height=14 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M15 9L9 15M9 9L15 15M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),Ec=x(`<svg width=14 height=14 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M9.5 15V9M14.5 15V9M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),Dc=x(`<svg version=1.0 viewBox="0 0 633 633"><linearGradient x1=-666.45 x2=-666.45 y1=163.28 y2=163.99 gradientTransform="matrix(633 0 0 633 422177 -103358)"gradientUnits=userSpaceOnUse><stop stop-color=#6BDAFF offset=0></stop><stop stop-color=#F9FFB5 offset=.32></stop><stop stop-color=#FFA770 offset=.71></stop><stop stop-color=#FF7373 offset=1></stop></linearGradient><circle cx=316.5 cy=316.5 r=316.5></circle><defs><filter x=-137.5 y=412 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=-137.5 y=412 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=89.5 cy=610.5 rx=214.5 ry=186 fill=#015064 stroke=#00CFE2 stroke-width=25></ellipse></g><defs><filter x=316.5 y=412 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=316.5 y=412 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=543.5 cy=610.5 rx=214.5 ry=186 fill=#015064 stroke=#00CFE2 stroke-width=25></ellipse></g><defs><filter x=-137.5 y=450 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=-137.5 y=450 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=89.5 cy=648.5 rx=214.5 ry=186 fill=#015064 stroke=#00A8B8 stroke-width=25></ellipse></g><defs><filter x=316.5 y=450 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=316.5 y=450 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=543.5 cy=648.5 rx=214.5 ry=186 fill=#015064 stroke=#00A8B8 stroke-width=25></ellipse></g><defs><filter x=-137.5 y=486 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=-137.5 y=486 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=89.5 cy=684.5 rx=214.5 ry=186 fill=#015064 stroke=#007782 stroke-width=25></ellipse></g><defs><filter x=316.5 y=486 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=316.5 y=486 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=543.5 cy=684.5 rx=214.5 ry=186 fill=#015064 stroke=#007782 stroke-width=25></ellipse></g><defs><filter x=272.2 y=308 width=176.9 height=129.3 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=272.2 y=308 width=176.9 height=129.3 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><line x1=436 x2=431 y1=403.2 y2=431.8 fill=none stroke=#000 stroke-linecap=round stroke-linejoin=bevel stroke-width=11></line><line x1=291 x2=280 y1=341.5 y2=403.5 fill=none stroke=#000 stroke-linecap=round stroke-linejoin=bevel stroke-width=11></line><line x1=332.9 x2=328.6 y1=384.1 y2=411.2 fill=none stroke=#000 stroke-linecap=round stroke-linejoin=bevel stroke-width=11></line><linearGradient x1=-670.75 x2=-671.59 y1=164.4 y2=164.49 gradientTransform="matrix(-184.16 -32.472 -11.461 64.997 -121359 -32126)"gradientUnits=userSpaceOnUse><stop stop-color=#EE2700 offset=0></stop><stop stop-color=#FF008E offset=1></stop></linearGradient><path d="m344.1 363 97.7 17.2c5.8 2.1 8.2 6.1 7.1 12.1s-4.7 9.2-11 9.9l-106-18.7-57.5-59.2c-3.2-4.8-2.9-9.1 0.8-12.8s8.3-4.4 13.7-2.1l55.2 53.6z"clip-rule=evenodd fill-rule=evenodd></path><line x1=428.2 x2=429.1 y1=384.5 y2=378 fill=none stroke=#fff stroke-linecap=round stroke-linejoin=bevel stroke-width=7></line><line x1=395.2 x2=396.1 y1=379.5 y2=373 fill=none stroke=#fff stroke-linecap=round stroke-linejoin=bevel stroke-width=7></line><line x1=362.2 x2=363.1 y1=373.5 y2=367.4 fill=none stroke=#fff stroke-linecap=round stroke-linejoin=bevel stroke-width=7></line><line x1=324.2 x2=328.4 y1=351.3 y2=347.4 fill=none stroke=#fff stroke-linecap=round stroke-linejoin=bevel stroke-width=7></line><line x1=303.2 x2=307.4 y1=331.3 y2=327.4 fill=none stroke=#fff stroke-linecap=round stroke-linejoin=bevel stroke-width=7></line></g><defs><filter x=73.2 y=113.8 width=280.6 height=317.4 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=73.2 y=113.8 width=280.6 height=317.4 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><linearGradient x1=-672.16 x2=-672.16 y1=165.03 y2=166.03 gradientTransform="matrix(-100.18 48.861 97.976 200.88 -83342 -93.059)"gradientUnits=userSpaceOnUse><stop stop-color=#A17500 offset=0></stop><stop stop-color=#5D2100 offset=1></stop></linearGradient><path d="m192.3 203c8.1 37.3 14 73.6 17.8 109.1 3.8 35.4 2.8 75.1-3 119.2l61.2-16.7c-15.6-59-25.2-97.9-28.6-116.6s-10.8-51.9-22.1-99.6l-25.3 4.6"clip-rule=evenodd fill-rule=evenodd></path><g stroke=#2F8A00><linearGradient x1=-660.23 x2=-660.23 y1=166.72 y2=167.72 gradientTransform="matrix(92.683 4.8573 -2.0259 38.657 61680 -3088.6)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m195 183.9s-12.6-22.1-36.5-29.9c-15.9-5.2-34.4-1.5-55.5 11.1 15.9 14.3 29.5 22.6 40.7 24.9 16.8 3.6 51.3-6.1 51.3-6.1z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><linearGradient x1=-661.36 x2=-661.36 y1=164.18 y2=165.18 gradientTransform="matrix(110 5.7648 -6.3599 121.35 73933 -15933)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m194.9 184.5s-47.5-8.5-83.2 15.7c-23.8 16.2-34.3 49.3-31.6 99.4 30.3-27.8 52.1-48.5 65.2-61.9 19.8-20.2 49.6-53.2 49.6-53.2z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><linearGradient x1=-656.79 x2=-656.79 y1=165.15 y2=166.15 gradientTransform="matrix(62.954 3.2993 -3.5023 66.828 42156 -8754.1)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m195 183.9c-0.8-21.9 6-38 20.6-48.2s29.8-15.4 45.5-15.3c-6.1 21.4-14.5 35.8-25.2 43.4s-24.4 14.2-40.9 20.1z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><linearGradient x1=-663.07 x2=-663.07 y1=165.44 y2=166.44 gradientTransform="matrix(152.47 7.9907 -3.0936 59.029 101884 -4318.7)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m194.9 184.5c31.9-30 64.1-39.7 96.7-29s50.8 30.4 54.6 59.1c-35.2-5.5-60.4-9.6-75.8-12.1-15.3-2.6-40.5-8.6-75.5-18z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><linearGradient x1=-662.57 x2=-662.57 y1=164.44 y2=165.44 gradientTransform="matrix(136.46 7.1517 -5.2163 99.533 91536 -11442)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m194.9 184.5c35.8-7.6 65.6-0.2 89.2 22s37.7 49 42.3 80.3c-39.8-9.7-68.3-23.8-85.5-42.4s-32.5-38.5-46-59.9z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><linearGradient x1=-656.43 x2=-656.43 y1=163.86 y2=164.86 gradientTransform="matrix(60.866 3.1899 -8.7773 167.48 41560 -25168)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m194.9 184.5c-33.6 13.8-53.6 35.7-60.1 65.6s-3.6 63.1 8.7 99.6c27.4-40.3 43.2-69.6 47.4-88s5.6-44.1 4-77.2z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><path d="m196.5 182.3c-14.8 21.6-25.1 41.4-30.8 59.4s-9.5 33-11.1 45.1"fill=none stroke-linecap=round stroke-width=8></path><path d="m194.9 185.7c-24.4 1.7-43.8 9-58.1 21.8s-24.7 25.4-31.3 37.8"fill=none stroke-linecap=round stroke-width=8></path><path d="m204.5 176.4c29.7-6.7 52-8.4 67-5.1s26.9 8.6 35.8 15.9"fill=none stroke-linecap=round stroke-width=8></path><path d="m196.5 181.4c20.3 9.9 38.2 20.5 53.9 31.9s27.4 22.1 35.1 32"fill=none stroke-linecap=round stroke-width=8></path></g></g><defs><filter x=50.5 y=399 width=532 height=633 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=50.5 y=399 width=532 height=633 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><linearGradient x1=-666.06 x2=-666.23 y1=163.36 y2=163.75 gradientTransform="matrix(532 0 0 633 354760 -102959)"gradientUnits=userSpaceOnUse><stop stop-color=#FFF400 offset=0></stop><stop stop-color=#3C8700 offset=1></stop></linearGradient><ellipse cx=316.5 cy=715.5 rx=266 ry=316.5></ellipse></g><defs><filter x=391 y=-24 width=288 height=283 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=391 y=-24 width=288 height=283 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><linearGradient x1=-664.56 x2=-664.56 y1=163.79 y2=164.79 gradientTransform="matrix(227 0 0 227 151421 -37204)"gradientUnits=userSpaceOnUse><stop stop-color=#FFDF00 offset=0></stop><stop stop-color=#FF9D00 offset=1></stop></linearGradient><circle cx=565.5 cy=89.5 r=113.5></circle><linearGradient x1=-644.5 x2=-645.77 y1=342 y2=342 gradientTransform="matrix(30 0 0 1 19770 -253)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=427 x2=397 y1=89 y2=89 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-641.56 x2=-642.83 y1=196.02 y2=196.07 gradientTransform="matrix(26.5 0 0 5.5 17439 -1025.5)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=430.5 x2=404 y1=55.5 y2=50 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-643.73 x2=-645 y1=185.83 y2=185.9 gradientTransform="matrix(29 0 0 8 19107 -1361)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=431 x2=402 y1=122 y2=130 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-638.94 x2=-640.22 y1=177.09 y2=177.39 gradientTransform="matrix(24 0 0 13 15783 -2145)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=442 x2=418 y1=153 y2=166 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-633.42 x2=-634.7 y1=172.41 y2=173.31 gradientTransform="matrix(20 0 0 19 13137 -3096)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=464 x2=444 y1=180 y2=199 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-619.05 x2=-619.52 y1=170.82 y2=171.82 gradientTransform="matrix(13.83 0 0 22.85 9050 -3703.4)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=491.4 x2=477.5 y1=203 y2=225.9 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-578.5 x2=-578.63 y1=170.31 y2=171.31 gradientTransform="matrix(7.5 0 0 24.5 4860 -3953)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=524.5 x2=517 y1=219.5 y2=244 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=666.5 x2=666.5 y1=170.31 y2=171.31 gradientTransform="matrix(.5 0 0 24.5 231.5 -3944)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=564.5 x2=565 y1=228.5 y2=253 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12>`);function Oc(){return rc()}function kc(){return ic()}function Ac(){return ac()}function jc(){return oc()}function Mc(){return sc()}function Nc(){return cc()}function Pc(){return lc()}function Fc(){return uc()}function Ic(){return dc()}function Lc(){return fc()}function Rc(){return pc()}function zc(){return mc()}function Bc(){return hc()}function Vc(){return gc()}function Hc(){return _c()}function Uc(){return vc()}function Wc(e){return(()=>{var t=yc(),n=t.firstChild;return A(()=>f(n,`stroke`,e.theme===`dark`?`#12B76A`:`#027A48`)),t})()}function Gc(){return bc()}function Kc(){return xc()}function qc(e){return[B(R,{get when(){return e.checked},get children(){var t=yc(),n=t.firstChild;return A(()=>f(n,`stroke`,e.theme===`dark`?`#9B8AFB`:`#6938EF`)),t}}),B(R,{get when(){return!e.checked},get children(){var t=Sc(),n=t.firstChild;return A(()=>f(n,`stroke`,e.theme===`dark`?`#9B8AFB`:`#6938EF`)),t}})]}function Jc(){return Cc()}function Yc(){return wc()}function Xc(){return Tc()}function Zc(){return Ec()}function Qc(){let e=V();return(()=>{var t=Dc(),n=t.firstChild,r=n.nextSibling,i=r.nextSibling,a=i.firstChild,o=i.nextSibling,s=o.firstChild,c=o.nextSibling,l=c.nextSibling,u=l.firstChild,d=l.nextSibling,p=d.firstChild,m=d.nextSibling,h=m.nextSibling,g=h.firstChild,_=h.nextSibling,v=_.firstChild,y=_.nextSibling,b=y.nextSibling,x=b.firstChild,S=b.nextSibling,C=S.firstChild,w=S.nextSibling,T=w.nextSibling,ee=T.firstChild,E=T.nextSibling,D=E.firstChild,te=E.nextSibling,O=te.nextSibling,k=O.firstChild,ne=O.nextSibling,A=ne.firstChild,re=ne.nextSibling,j=re.nextSibling,M=j.firstChild,N=j.nextSibling,P=N.firstChild,F=N.nextSibling,ie=F.firstChild.nextSibling.nextSibling.nextSibling,I=ie.nextSibling,L=F.nextSibling,R=L.firstChild,z=L.nextSibling,ae=z.firstChild,B=z.nextSibling,V=B.firstChild,oe=V.nextSibling,se=oe.nextSibling.firstChild,ce=se.nextSibling,le=ce.nextSibling,ue=le.nextSibling,de=ue.nextSibling,fe=de.nextSibling,H=fe.nextSibling,pe=H.nextSibling,me=pe.nextSibling,he=me.nextSibling,ge=he.nextSibling,_e=ge.nextSibling,ve=B.nextSibling,ye=ve.firstChild,be=ve.nextSibling,xe=be.firstChild,Se=be.nextSibling,Ce=Se.firstChild,we=Ce.nextSibling,Te=Se.nextSibling,Ee=Te.firstChild,De=Te.nextSibling,Oe=De.firstChild,ke=De.nextSibling,Ae=ke.firstChild,je=Ae.nextSibling,Me=je.nextSibling,Ne=Me.nextSibling,Pe=Ne.nextSibling,Fe=Pe.nextSibling,U=Fe.nextSibling,Ie=U.nextSibling,Le=Ie.nextSibling,Re=Le.nextSibling,ze=Re.nextSibling,Be=ze.nextSibling,W=Be.nextSibling,Ve=W.nextSibling,He=Ve.nextSibling,Ue=He.nextSibling,We=Ue.nextSibling,Ge=We.nextSibling;return f(n,`id`,`a-${e}`),f(r,`fill`,`url(#a-${e})`),f(a,`id`,`am-${e}`),f(o,`id`,`b-${e}`),f(s,`filter`,`url(#am-${e})`),f(c,`mask`,`url(#b-${e})`),f(u,`id`,`ah-${e}`),f(d,`id`,`k-${e}`),f(p,`filter`,`url(#ah-${e})`),f(m,`mask`,`url(#k-${e})`),f(g,`id`,`ae-${e}`),f(_,`id`,`j-${e}`),f(v,`filter`,`url(#ae-${e})`),f(y,`mask`,`url(#j-${e})`),f(x,`id`,`ai-${e}`),f(S,`id`,`i-${e}`),f(C,`filter`,`url(#ai-${e})`),f(w,`mask`,`url(#i-${e})`),f(ee,`id`,`aj-${e}`),f(E,`id`,`h-${e}`),f(D,`filter`,`url(#aj-${e})`),f(te,`mask`,`url(#h-${e})`),f(k,`id`,`ag-${e}`),f(ne,`id`,`g-${e}`),f(A,`filter`,`url(#ag-${e})`),f(re,`mask`,`url(#g-${e})`),f(M,`id`,`af-${e}`),f(N,`id`,`f-${e}`),f(P,`filter`,`url(#af-${e})`),f(F,`mask`,`url(#f-${e})`),f(ie,`id`,`m-${e}`),f(I,`fill`,`url(#m-${e})`),f(R,`id`,`ak-${e}`),f(z,`id`,`e-${e}`),f(ae,`filter`,`url(#ak-${e})`),f(B,`mask`,`url(#e-${e})`),f(V,`id`,`n-${e}`),f(oe,`fill`,`url(#n-${e})`),f(se,`id`,`r-${e}`),f(ce,`fill`,`url(#r-${e})`),f(le,`id`,`s-${e}`),f(ue,`fill`,`url(#s-${e})`),f(de,`id`,`q-${e}`),f(fe,`fill`,`url(#q-${e})`),f(H,`id`,`p-${e}`),f(pe,`fill`,`url(#p-${e})`),f(me,`id`,`o-${e}`),f(he,`fill`,`url(#o-${e})`),f(ge,`id`,`l-${e}`),f(_e,`fill`,`url(#l-${e})`),f(ye,`id`,`al-${e}`),f(be,`id`,`d-${e}`),f(xe,`filter`,`url(#al-${e})`),f(Se,`mask`,`url(#d-${e})`),f(Ce,`id`,`u-${e}`),f(we,`fill`,`url(#u-${e})`),f(Ee,`id`,`ad-${e}`),f(De,`id`,`c-${e}`),f(Oe,`filter`,`url(#ad-${e})`),f(ke,`mask`,`url(#c-${e})`),f(Ae,`id`,`t-${e}`),f(je,`fill`,`url(#t-${e})`),f(Me,`id`,`v-${e}`),f(Ne,`stroke`,`url(#v-${e})`),f(Pe,`id`,`aa-${e}`),f(Fe,`stroke`,`url(#aa-${e})`),f(U,`id`,`w-${e}`),f(Ie,`stroke`,`url(#w-${e})`),f(Le,`id`,`ac-${e}`),f(Re,`stroke`,`url(#ac-${e})`),f(ze,`id`,`ab-${e}`),f(Be,`stroke`,`url(#ab-${e})`),f(W,`id`,`y-${e}`),f(Ve,`stroke`,`url(#y-${e})`),f(He,`id`,`x-${e}`),f(Ue,`stroke`,`url(#x-${e})`),f(We,`id`,`z-${e}`),f(Ge,`stroke`,`url(#z-${e})`),t})()}var $c=x(`<span><svg width=16 height=16 viewBox="0 0 16 16"fill=none xmlns=http://www.w3.org/2000/svg><path d="M6 12L10 8L6 4"stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),el=x(`<button title="Copy object to clipboard">`),tl=x(`<button title="Remove all items"aria-label="Remove all items">`),nl=x(`<button title="Delete item"aria-label="Delete item">`),rl=x(`<button title="Toggle value"aria-label="Toggle value">`),il=x(`<button title="Bulk Edit Data"aria-label="Bulk Edit Data">`),al=x(`<div>`),ol=x(`<div><button> <span></span> <span> `),sl=x(`<input>`),cl=x(`<span>`),ll=x(`<div><label>:`),ul=x(`<div><div><button> [<!>...<!>]`);function dl(e,t){let n=0,r=[];for(;n<e.length;)r.push(e.slice(n,n+t)),n+=t;return r}var fl=e=>{let t=W(),n=U().shadowDOMTarget?G.bind({target:U().shadowDOMTarget}):G,r=P(()=>t()===`dark`?xl(n):bl(n));return(()=>{var t=$c();return A(()=>z(t,K(r().expander,n`
          transform: rotate(${e.expanded?90:0}deg);
        `,e.expanded&&n`
            & svg {
              top: -1px;
            }
          `))),t})()},pl=e=>{let t=W(),n=U().shadowDOMTarget?G.bind({target:U().shadowDOMTarget}):G,r=P(()=>t()===`dark`?xl(n):bl(n)),[i,a]=T(`NoCopy`);return(()=>{var n=el();return ee(n,`click`,i()===`NoCopy`?()=>{navigator.clipboard.writeText(c(e.value)).then(()=>{a(`SuccessCopy`),setTimeout(()=>{a(`NoCopy`)},1500)},e=>{a(`ErrorCopy`),setTimeout(()=>{a(`NoCopy`)},1500)})}:void 0,!0),M(n,B(re,{get children(){return[B(ae,{get when(){return i()===`NoCopy`},get children(){return B(Hc,{})}}),B(ae,{get when(){return i()===`SuccessCopy`},get children(){return B(Wc,{get theme(){return t()}})}}),B(ae,{get when(){return i()===`ErrorCopy`},get children(){return B(Gc,{})}})]}})),A(e=>{var t=r().actionButton,a=`${i()===`NoCopy`?`Copy object to clipboard`:i()===`SuccessCopy`?`Object copied to clipboard`:`Error copying object to clipboard`}`;return t!==e.e&&z(n,e.e=t),a!==e.t&&f(n,`aria-label`,e.t=a),e},{e:void 0,t:void 0}),n})()},ml=e=>{let t=W(),n=U().shadowDOMTarget?G.bind({target:U().shadowDOMTarget}):G,r=P(()=>t()===`dark`?xl(n):bl(n)),i=U().client;return(()=>{var t=tl();return t.$$click=()=>{let t=e.activeQuery.state.data,n=s(t,e.dataPath,[]);i.setQueryData(e.activeQuery.queryKey,n)},M(t,B(Kc,{})),A(()=>z(t,r().actionButton)),t})()},hl=e=>{let t=W(),n=U().shadowDOMTarget?G.bind({target:U().shadowDOMTarget}):G,r=P(()=>t()===`dark`?xl(n):bl(n)),i=U().client;return(()=>{var t=nl();return t.$$click=()=>{let t=e.activeQuery.state.data,n=E(t,e.dataPath);i.setQueryData(e.activeQuery.queryKey,n)},M(t,B(kc,{})),A(()=>z(t,K(r().actionButton))),t})()},gl=e=>{let t=W(),n=U().shadowDOMTarget?G.bind({target:U().shadowDOMTarget}):G,r=P(()=>t()===`dark`?xl(n):bl(n)),i=U().client;return(()=>{var a=rl();return a.$$click=()=>{let t=e.activeQuery.state.data,n=s(t,e.dataPath,!e.value);i.setQueryData(e.activeQuery.queryKey,n)},M(a,B(qc,{get theme(){return t()},get checked(){return e.value}})),A(()=>z(a,K(r().actionButton,n`
          width: ${Q.size[3.5]};
          height: ${Q.size[3.5]};
        `))),a})()};function _l(e){return Symbol.iterator in e}function vl(e){let n=W(),r=U().shadowDOMTarget?G.bind({target:U().shadowDOMTarget}):G,i=P(()=>n()===`dark`?xl(r):bl(r)),a=U().client,[o,c]=T((e.defaultExpanded||[]).includes(e.label)),u=()=>c(e=>!e),[d,p]=T([]),m=P(()=>Array.isArray(e.value)?e.value.map((e,t)=>({label:t.toString(),value:e})):e.value!==null&&typeof e.value==`object`&&_l(e.value)&&typeof e.value[Symbol.iterator]==`function`?e.value instanceof Map?Array.from(e.value,([e,t])=>({label:e,value:t})):Array.from(e.value,(e,t)=>({label:t.toString(),value:e})):typeof e.value==`object`&&e.value!==null?Object.entries(e.value).map(([e,t])=>({label:e,value:t})):[]),h=P(()=>Array.isArray(e.value)?`array`:e.value!==null&&typeof e.value==`object`&&_l(e.value)&&typeof e.value[Symbol.iterator]==`function`?`Iterable`:typeof e.value==`object`&&e.value!==null?`object`:typeof e.value),g=P(()=>dl(m(),100)),_=e.dataPath??[],v=V();return(()=>{var n=al();return M(n,B(R,{get when(){return g().length},get children(){return[(()=>{var n=ol(),r=n.firstChild,a=r.firstChild,s=a.nextSibling,c=s.nextSibling.nextSibling,d=c.firstChild;return r.$$click=()=>u(),M(r,B(fl,{get expanded(){return o()}}),a),M(s,()=>e.label),M(c,()=>String(h()).toLowerCase()===`iterable`?`(Iterable) `:``,d),M(c,()=>m().length,d),M(c,()=>m().length>1?`items`:`item`,null),M(n,B(R,{get when(){return e.editable},get children(){var n=al();return M(n,B(pl,{get value(){return e.value}}),null),M(n,B(R,{get when(){return t(()=>!!e.itemsDeletable)()&&e.activeQuery!==void 0},get children(){return B(hl,{get activeQuery(){return e.activeQuery},dataPath:_})}}),null),M(n,B(R,{get when(){return t(()=>h()===`array`)()&&e.activeQuery!==void 0},get children(){return B(ml,{get activeQuery(){return e.activeQuery},dataPath:_})}}),null),M(n,B(R,{get when(){return t(()=>!!e.onEdit)()&&!l(e.value).meta},get children(){var t=il();return t.$$click=()=>{e.onEdit?.()},M(t,B(Uc,{})),A(()=>z(t,i().actionButton)),t}}),null),A(()=>z(n,i().actions)),n}}),null),A(e=>{var t=i().expanderButtonContainer,a=i().expanderButton,s=o()?`true`:`false`,l=i().info;return t!==e.e&&z(n,e.e=t),a!==e.t&&z(r,e.t=a),s!==e.a&&f(r,`aria-expanded`,e.a=s),l!==e.o&&z(c,e.o=l),e},{e:void 0,t:void 0,a:void 0,o:void 0}),n})(),B(R,{get when(){return o()},get children(){return[B(R,{get when(){return g().length===1},get children(){var t=al();return M(t,B(Tt,{get each(){return m()},by:e=>e.label,children:t=>B(vl,{get defaultExpanded(){return e.defaultExpanded},get label(){return t().label},get value(){return t().value},get editable(){return e.editable},get dataPath(){return[..._,t().label]},get activeQuery(){return e.activeQuery},get itemsDeletable(){return h()===`array`||h()===`Iterable`||h()===`object`}})})),A(()=>z(t,i().subEntry)),t}}),B(R,{get when(){return g().length>1},get children(){var t=al();return M(t,B(O,{get each(){return g()},children:(t,n)=>(()=>{var r=ul(),a=r.firstChild,o=a.firstChild,s=o.firstChild,c=s.nextSibling,l=c.nextSibling.nextSibling;return l.nextSibling,o.$$click=()=>p(e=>e.includes(n)?e.filter(e=>e!==n):[...e,n]),M(o,B(fl,{get expanded(){return d().includes(n)}}),s),M(o,n*100,c),M(o,n*100+100-1,l),M(a,B(R,{get when(){return d().includes(n)},get children(){var n=al();return M(n,B(Tt,{get each(){return t()},by:e=>e.label,children:t=>B(vl,{get defaultExpanded(){return e.defaultExpanded},get label(){return t().label},get value(){return t().value},get editable(){return e.editable},get dataPath(){return[..._,t().label]},get activeQuery(){return e.activeQuery}})})),A(()=>z(n,i().subEntry)),n}}),null),A(e=>{var t=i().entry,n=i().expanderButton;return t!==e.e&&z(a,e.e=t),n!==e.t&&z(o,e.t=n),e},{e:void 0,t:void 0}),r})()})),A(()=>z(t,i().subEntry)),t}})]}})]}}),null),M(n,B(R,{get when(){return g().length===0},get children(){var n=ll(),r=n.firstChild,o=r.firstChild;return f(r,`for`,v),M(r,()=>e.label,o),M(n,B(R,{get when(){return t(()=>!!(e.editable&&e.activeQuery!==void 0))()&&(h()===`string`||h()===`number`||h()===`boolean`)},get fallback(){return(()=>{var t=cl();return M(t,()=>oe(e.value)),A(()=>z(t,i().value)),t})()},get children(){return[B(R,{get when(){return t(()=>!!(e.editable&&e.activeQuery!==void 0))()&&(h()===`string`||h()===`number`)},get children(){var t=sl();return t.addEventListener(`change`,t=>{let n=e.activeQuery.state.data,r=s(n,_,h()===`number`?t.target.valueAsNumber:t.target.value);a.setQueryData(e.activeQuery.queryKey,r)}),f(t,`id`,v),A(e=>{var n=h()===`number`?`number`:`text`,r=K(i().value,i().editableInput);return n!==e.e&&f(t,`type`,e.e=n),r!==e.t&&z(t,e.t=r),e},{e:void 0,t:void 0}),A(()=>t.value=e.value),t}}),B(R,{get when(){return h()===`boolean`},get children(){var t=cl();return M(t,B(gl,{get activeQuery(){return e.activeQuery},dataPath:_,get value(){return e.value}}),null),M(t,()=>oe(e.value),null),A(()=>z(t,K(i().value,i().actions,i().editableInput))),t}})]}}),null),M(n,B(R,{get when(){return t(()=>!!(e.editable&&e.itemsDeletable))()&&e.activeQuery!==void 0},get children(){return B(hl,{get activeQuery(){return e.activeQuery},dataPath:_})}}),null),A(e=>{var t=i().row,a=i().label;return t!==e.e&&z(n,e.e=t),a!==e.t&&z(r,e.t=a),e},{e:void 0,t:void 0}),n}}),null),A(()=>z(n,i().entry)),n})()}var yl=(e,t)=>{let{colors:n,font:r,size:i,border:a}=Q,o=(t,n)=>e===`light`?t:n;return{entry:t`
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
    `}},bl=e=>yl(`light`,e),xl=e=>yl(`dark`,e);se([`click`]);var Sl=x(`<div><div aria-hidden=true></div><button type=button aria-label="Open Tanstack query devtools"class=tsqd-open-btn>`),Cl=x(`<div>`),wl=x(`<div style=--tsqd-font-size:16px;max-height:100vh;height:100vh;width:100vw>`),Tl=x(`<div style=--tsqd-font-size:16px>`),El=x(`<aside aria-label="Tanstack query devtools"><div role=separator aria-label="Resize devtools panel"tabindex=0></div><button aria-label="Close tanstack query devtools">`),Dl=x(`<select name=tsqd-queries-filter-sort aria-label="Sort queries by">`),Ol=x(`<select name=tsqd-mutations-filter-sort aria-label="Sort mutations by">`),kl=x(`<span>Asc`),Al=x(`<span>Desc`),jl=x(`<button aria-label="Open in picture-in-picture mode"title="Open in picture-in-picture mode">`),Ml=x(`<div>Settings`),Nl=x(`<span>Position`),Pl=x(`<span>Top`),Fl=x(`<span>Bottom`),Il=x(`<span>Left`),Ll=x(`<span>Right`),Rl=x(`<span>Theme`),zl=x(`<span>Light`),Bl=x(`<span>Dark`),Vl=x(`<span>System`),Hl=x(`<span>Disabled Queries`),Ul=x(`<span>Show`),Wl=x(`<span>Hide`),Gl=x(`<div><div class=tsqd-queries-container>`),Kl=x(`<div><div class=tsqd-mutations-container>`),ql=x(`<div><div><div><button aria-label="Close Tanstack query devtools"><span>TANSTACK</span><span> v</span></button></div></div><div><div><div><input aria-label="Filter queries by query key"type=text placeholder=Filter name=tsqd-query-filter-input></div><div></div><button class=tsqd-query-filter-sort-order-btn></button></div><div><button aria-label="Clear query cache"></button><button>`),Jl=x(`<option>Sort by `),Yl=x(`<div class=tsqd-query-disabled-indicator aria-hidden=true>disabled`),Xl=x(`<div class=tsqd-query-static-indicator aria-hidden=true>static`),Zl=x(`<button><div></div><code class=tsqd-query-hash>`),Ql=x(`<div role=tooltip id=tsqd-status-tooltip>`),$l=x(`<span>`),eu=x(`<button><span aria-hidden=true></span><span>`),tu=x(`<button><span aria-hidden=true></span> Error`),nu=x(`<div><span aria-hidden=true></span>Trigger Error<select aria-label="Select error type to trigger"><option value disabled selected>`),ru=x(`<div class="tsqd-query-details-explorer-container tsqd-query-details-data-explorer">`),iu=x(`<form><textarea name=data aria-label="Edit query data as JSON"></textarea><div><span></span><div><button type=button>Cancel</button><button>Save`),au=x(`<div><div role=heading aria-level=2>Query Details</div><div><div class=tsqd-query-details-summary><pre><code></code></pre><span role=status aria-live=polite></span></div><div class=tsqd-query-details-observers-count><span>Observers:</span><span></span></div><div class=tsqd-query-details-last-updated><span>Last Updated:</span><span></span></div></div><div role=heading aria-level=2>Actions</div><div><button><span aria-hidden=true></span>Refetch</button><button><span aria-hidden=true></span>Invalidate</button><button><span aria-hidden=true></span>Reset</button><button><span aria-hidden=true></span>Remove</button><button><span aria-hidden=true></span> Loading</button></div><div role=heading aria-level=2>Data </div><div role=heading aria-level=2>Query Explorer</div><div class="tsqd-query-details-explorer-container tsqd-query-details-query-explorer">`),ou=x(`<option>`),su=x(`<div><div role=heading aria-level=2>Mutation Details</div><div><div class=tsqd-query-details-summary><pre><code></code></pre><span role=status aria-live=polite></span></div><div class=tsqd-query-details-last-updated><span>Submitted At:</span><span></span></div></div><div role=heading aria-level=2>Variables Details</div><div class="tsqd-query-details-explorer-container tsqd-query-details-query-explorer"></div><div role=heading aria-level=2>Context Details</div><div class="tsqd-query-details-explorer-container tsqd-query-details-query-explorer"></div><div role=heading aria-level=2>Data Explorer</div><div class="tsqd-query-details-explorer-container tsqd-query-details-query-explorer"></div><div role=heading aria-level=2>Mutations Explorer</div><div class="tsqd-query-details-explorer-container tsqd-query-details-query-explorer">`),[cu,lu]=T(null),[uu,du]=T(null),[fu,pu]=T(0),[mu,hu]=T(!1),gu=e=>{let n=W(),r=U().shadowDOMTarget?G.bind({target:U().shadowDOMTarget}):G,i=P(()=>n()===`dark`?Lu(r):Iu(r)),a=P(()=>U().onlineManager);o(()=>{let e=a().subscribe(e=>{hu(!e)});g(()=>{e()})});let s=ze(),c=P(()=>U().buttonPosition||Te),l=P(()=>e.localStore.open===`true`?!0:e.localStore.open===`false`?!1:U().initialIsOpen||Oe),u=P(()=>e.localStore.position||U().position||Ee),f;I(()=>{let t=f.parentElement,n=e.localStore.height||ke,r=e.localStore.width||je,i=u();t.style.setProperty(`--tsqd-panel-height`,`${i===`top`?`-`:``}${n}px`),t.style.setProperty(`--tsqd-panel-width`,`${i===`left`?`-`:``}${r}px`)}),o(()=>{let e=()=>{let e=f.parentElement,t=getComputedStyle(e).fontSize;e.style.setProperty(`--tsqd-font-size`,t)};e(),window.addEventListener(`focus`,e),g(()=>{window.removeEventListener(`focus`,e)})});let p=P(()=>e.localStore.pip_open??`false`);return[B(R,{get when(){return t(()=>!!s().pipWindow)()&&p()==`true`},get children(){return B(F,{get mount(){return s().pipWindow?.document.body},get children(){return B(_u,{get children(){return B(bu,e)}})}})}}),(()=>{var n=Cl(),a=f;return typeof a==`function`?d(a,n):f=n,M(n,B(xt,{name:`tsqd-panel-transition`,get children(){return B(R,{get when(){return t(()=>!!(l()&&!s().pipWindow))()&&p()==`false`},get children(){return B(yu,{get localStore(){return e.localStore},get setLocalStore(){return e.setLocalStore}})}})}}),null),M(n,B(xt,{name:`tsqd-button-transition`,get children(){return B(R,{get when(){return!l()},get children(){var t=Sl(),n=t.firstChild,r=n.nextSibling;return M(n,B(Qc,{})),r.$$click=()=>e.setLocalStore(`open`,`true`),M(r,B(Qc,{})),A(()=>z(t,K(i().devtoolsBtn,i()[`devtoolsBtn-position-${c()}`],`tsqd-open-btn-container`))),t}})}}),null),A(()=>z(n,K(r`
            & .tsqd-panel-transition-exit-active,
            & .tsqd-panel-transition-enter-active {
              transition:
                opacity 0.3s,
                transform 0.3s;
            }

            & .tsqd-panel-transition-exit-to,
            & .tsqd-panel-transition-enter {
              ${u()===`top`||u()===`bottom`?`transform: translateY(var(--tsqd-panel-height));`:`transform: translateX(var(--tsqd-panel-width));`}
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
          `,`tsqd-transitions-container`))),n})()]},_u=e=>{let t=ze(),n=W(),r=U().shadowDOMTarget?G.bind({target:U().shadowDOMTarget}):G,i=P(()=>n()===`dark`?Lu(r):Iu(r)),a=()=>{let{colors:e}=Q,t=(e,t)=>n()===`dark`?t:e;return fu()<Ce?r`
        flex-direction: column;
        background-color: ${t(e.gray[300],e.gray[600])};
      `:r`
      flex-direction: row;
      background-color: ${t(e.gray[200],e.darkGray[900])};
    `};return I(()=>{let e=t().pipWindow,n=()=>{e&&pu(e.innerWidth)};e&&(e.addEventListener(`resize`,n),n()),g(()=>{e&&e.removeEventListener(`resize`,n)})}),(()=>{var t=wl();return M(t,()=>e.children),A(()=>z(t,K(i().panel,a(),{[r`
            min-width: min-content;
          `]:fu()<we},`tsqd-main-panel`))),t})()},vu=e=>{let t=W(),n=U().shadowDOMTarget?G.bind({target:U().shadowDOMTarget}):G,r=P(()=>t()===`dark`?Lu(n):Iu(n)),i;o(()=>{kt(i,({width:e},t)=>{t===i&&pu(e)})});let a=()=>{let{colors:e}=Q,r=(e,n)=>t()===`dark`?n:e;return fu()<Ce?n`
        flex-direction: column;
        background-color: ${r(e.gray[300],e.gray[600])};
      `:n`
      flex-direction: row;
      background-color: ${r(e.gray[200],e.darkGray[900])};
    `};return(()=>{var t=Tl(),o=i;return typeof o==`function`?d(o,t):i=t,M(t,()=>e.children),A(()=>z(t,K(r().parentPanel,a(),{[n`
            min-width: min-content;
          `]:fu()<we},`tsqd-main-panel`))),t})()},yu=e=>{let t=W(),n=U().shadowDOMTarget?G.bind({target:U().shadowDOMTarget}):G,r=P(()=>t()===`dark`?Lu(n):Iu(n)),i;o(()=>{i.focus()});let[a,s]=T(!1),c=P(()=>e.localStore.position||U().position||Ee),l=t=>{let n=t.currentTarget.parentElement;if(!n)return;s(!0);let{height:r,width:i}=n.getBoundingClientRect(),o=t.clientX,l=t.clientY,u=0,d=N(3.5),f=N(12),p=t=>{if(t.preventDefault(),c()===`left`||c()===`right`){let r=c()===`right`?o-t.clientX:t.clientX-o;u=Math.round(i+r),u<f&&(u=f),e.setLocalStore(`width`,String(Math.round(u)));let a=n.getBoundingClientRect().width;Number(e.localStore.width)<a&&e.setLocalStore(`width`,String(a))}else{let n=c()===`bottom`?l-t.clientY:t.clientY-l;u=Math.round(r+n),u<d&&(u=d,lu(null)),e.setLocalStore(`height`,String(Math.round(u)))}},m=()=>{a()&&s(!1),document.removeEventListener(`mousemove`,p,!1),document.removeEventListener(`mouseup`,m,!1)};document.addEventListener(`mousemove`,p,!1),document.addEventListener(`mouseup`,m,!1)},u;o(()=>{kt(u,({width:e},t)=>{t===u&&pu(e)})}),I(()=>{let t=u.parentElement?.parentElement?.parentElement;if(!t)return;let n=h(`padding`,e.localStore.position||Ee),r=e.localStore.position===`left`||e.localStore.position===`right`,i=(({padding:e,paddingTop:t,paddingBottom:n,paddingLeft:r,paddingRight:i})=>({padding:e,paddingTop:t,paddingBottom:n,paddingLeft:r,paddingRight:i}))(t.style);t.style[n]=`${r?e.localStore.width:e.localStore.height}px`,g(()=>{Object.entries(i).forEach(([e,n])=>{t.style[e]=n})})});let p=()=>{let{colors:e}=Q,r=(e,n)=>t()===`dark`?n:e;return fu()<Ce?n`
        flex-direction: column;
        background-color: ${r(e.gray[300],e.gray[600])};
      `:n`
      flex-direction: row;
      background-color: ${r(e.gray[200],e.darkGray[900])};
    `};return(()=>{var t=El(),a=t.firstChild,o=a.nextSibling,s=u;typeof s==`function`?d(s,t):u=t,a.$$keydown=t=>{let n=N(3.5),r=N(12);if(c()===`top`||c()===`bottom`){if(t.key===`ArrowUp`||t.key===`ArrowDown`){t.preventDefault();let r=Number(e.localStore.height||ke),i=c()===`bottom`?t.key===`ArrowUp`?10:-10:t.key===`ArrowDown`?10:-10,a=Math.max(n,r+i);e.setLocalStore(`height`,String(a))}}else if(t.key===`ArrowLeft`||t.key===`ArrowRight`){t.preventDefault();let n=Number(e.localStore.width||je),i=c()===`right`?t.key===`ArrowLeft`?10:-10:t.key===`ArrowRight`?10:-10,a=Math.max(r,n+i);e.setLocalStore(`width`,String(a))}},a.$$mousedown=l,o.$$click=()=>e.setLocalStore(`open`,`false`);var m=i;return typeof m==`function`?d(m,o):i=o,M(o,B(Ac,{})),M(t,B(bu,e),null),A(i=>{var s=K(r().panel,r()[`panel-position-${c()}`],p(),{[n`
            min-width: min-content;
          `]:fu()<we&&(c()===`right`||c()===`left`)},`tsqd-main-panel`),l=c()===`bottom`||c()===`top`?`${e.localStore.height||ke}px`:`auto`,u=c()===`right`||c()===`left`?`${e.localStore.width||je}px`:`auto`,d=c()===`top`||c()===`bottom`?`horizontal`:`vertical`,m=c()===`top`||c()===`bottom`?N(3.5):N(12),h=c()===`top`||c()===`bottom`?Number(e.localStore.height||ke):Number(e.localStore.width||je),g=K(r().dragHandle,r()[`dragHandle-position-${c()}`],`tsqd-drag-handle`),_=K(r().closeBtn,r()[`closeBtn-position-${c()}`],`tsqd-minimize-btn`);return s!==i.e&&z(t,i.e=s),l!==i.t&&v(t,`height`,i.t=l),u!==i.a&&v(t,`width`,i.a=u),d!==i.o&&f(a,`aria-orientation`,i.o=d),m!==i.i&&f(a,`aria-valuemin`,i.i=m),h!==i.n&&f(a,`aria-valuenow`,i.n=h),g!==i.s&&z(a,i.s=g),_!==i.h&&z(o,i.h=_),i},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0,h:void 0}),t})()},bu=e=>{ku(),ju();let n,r=W(),i=U().shadowDOMTarget?G.bind({target:U().shadowDOMTarget}):G,a=P(()=>r()===`dark`?Lu(i):Iu(i)),o=ze(),[s,c]=T(`queries`),l=P(()=>e.localStore.sort||Me),u=P(()=>Number(e.localStore.sortOrder)||Ne),h=P(()=>e.localStore.mutationSort||Pe),g=P(()=>Number(e.localStore.mutationSortOrder)||Ne),_=P(()=>ce[l()]),v=P(()=>p[h()]),y=P(()=>U().onlineManager),b=P(()=>U().client.getQueryCache()),x=P(()=>U().client.getMutationCache()),S=$(e=>e().getAll().length,!1),C=P(m(()=>[S(),e.localStore.filter,l(),u(),e.localStore.hideDisabledQueries],()=>{let t=b().getAll(),n=e.localStore.filter?t.filter(t=>Ke(t.queryHash,e.localStore.filter||``).passed):[...t];return e.localStore.hideDisabledQueries===`true`&&(n=n.filter(e=>!e.isDisabled())),_()?n.sort((e,t)=>_()(e,t)*u()):n})),w=Mu(e=>e().getAll().length,!1),ee=P(m(()=>[w(),e.localStore.mutationFilter,h(),g()],()=>{let t=x().getAll(),n=e.localStore.mutationFilter?t.filter(t=>Ke(`${t.options.mutationKey?JSON.stringify(t.options.mutationKey)+` - `:``}${new Date(t.state.submittedAt).toLocaleString()}`,e.localStore.mutationFilter||``).passed):[...t];return v()?n.sort((e,t)=>v()(e,t)*g()):n})),E=t=>{e.setLocalStore(`position`,t)},D=e=>{let t=getComputedStyle(n).getPropertyValue(`--tsqd-font-size`);e.style.setProperty(`--tsqd-font-size`,t)};return[(()=>{var r=ql(),m=r.firstChild,_=m.firstChild,v=_.firstChild,S=v.firstChild,w=S.nextSibling,T=w.firstChild,te=m.nextSibling,O=te.firstChild,k=O.firstChild,ne=k.firstChild,re=k.nextSibling,j=re.nextSibling,N=O.nextSibling,P=N.firstChild,F=P.nextSibling,ie=n;return typeof ie==`function`?d(ie,r):n=r,v.$$click=()=>{if(!o().pipWindow&&!e.showPanelViewOnly){e.setLocalStore(`open`,`false`);return}e.onClose&&e.onClose()},M(w,()=>U().queryFlavor,T),M(w,()=>U().version,null),M(_,B(Jo.Root,{get class(){return K(a().viewToggle)},get value(){return s()},"aria-label":`Toggle between queries and mutations view`,onChange:e=>{c(e),lu(null),du(null)},get children(){return[B(Jo.Item,{value:`queries`,class:`tsqd-radio-toggle`,get children(){return[B(Jo.ItemInput,{}),B(Jo.ItemControl,{get children(){return B(Jo.ItemIndicator,{})}}),B(Jo.ItemLabel,{title:`Toggle Queries View`,children:`Queries`})]}}),B(Jo.Item,{value:`mutations`,class:`tsqd-radio-toggle`,get children(){return[B(Jo.ItemInput,{}),B(Jo.ItemControl,{get children(){return B(Jo.ItemIndicator,{})}}),B(Jo.ItemLabel,{title:`Toggle Mutations View`,children:`Mutations`})]}})]}}),null),M(m,B(R,{get when(){return s()===`queries`},get children(){return B(Cu,{})}}),null),M(m,B(R,{get when(){return s()===`mutations`},get children(){return B(wu,{})}}),null),M(k,B(Oc,{}),ne),ne.$$input=t=>{s()===`queries`?e.setLocalStore(`filter`,t.currentTarget.value):e.setLocalStore(`mutationFilter`,t.currentTarget.value)},M(re,B(R,{get when(){return s()===`queries`},get children(){var t=Dl();return t.addEventListener(`change`,t=>{e.setLocalStore(`sort`,t.currentTarget.value)}),M(t,()=>Object.keys(ce).map(e=>(()=>{var t=Jl();return t.firstChild,t.value=e,M(t,e,null),t})())),A(()=>t.value=l()),t}}),null),M(re,B(R,{get when(){return s()===`mutations`},get children(){var t=Ol();return t.addEventListener(`change`,t=>{e.setLocalStore(`mutationSort`,t.currentTarget.value)}),M(t,()=>Object.keys(p).map(e=>(()=>{var t=Jl();return t.firstChild,t.value=e,M(t,e,null),t})())),A(()=>t.value=h()),t}}),null),M(re,B(Ac,{}),null),j.$$click=()=>{s()===`queries`?e.setLocalStore(`sortOrder`,String(u()*-1)):e.setLocalStore(`mutationSortOrder`,String(g()*-1))},M(j,B(R,{get when(){return(s()===`queries`?u():g())===1},get children(){return[kl(),B(jc,{})]}}),null),M(j,B(R,{get when(){return(s()===`queries`?u():g())===-1},get children(){return[Al(),B(Mc,{})]}}),null),P.$$click=()=>{s()===`queries`?(Pu({type:`CLEAR_QUERY_CACHE`}),b().clear()):(Pu({type:`CLEAR_MUTATION_CACHE`}),x().clear())},M(P,B(kc,{})),F.$$click=()=>{y().setOnline(!y().isOnline())},M(F,(()=>{var e=t(()=>!!mu());return()=>e()?B(zc,{}):B(Rc,{})})()),M(N,B(R,{get when(){return t(()=>!o().pipWindow)()&&!o().disabled},get children(){var t=jl();return t.$$click=()=>{o().requestPipWindow(Number(window.innerWidth),Number(e.localStore.height??500))},M(t,B(Vc,{})),A(()=>z(t,K(a().actionsBtn,`tsqd-actions-btn`,`tsqd-action-open-pip`))),t}}),null),M(N,B(Z.Root,{gutter:4,get children(){return[B(Z.Trigger,{get class(){return K(a().actionsBtn,`tsqd-actions-btn`,`tsqd-action-settings`)},"aria-label":`Open settings menu`,title:`Open settings menu`,get children(){return B(Bc,{})}}),B(Z.Portal,{ref:e=>D(e),get mount(){return t(()=>!!o().pipWindow)()?o().pipWindow.document.body:document.body},get children(){return B(Z.Content,{get class(){return K(a().settingsMenu,`tsqd-settings-menu`)},get children(){return[(()=>{var e=Ml();return A(()=>z(e,K(a().settingsMenuHeader,`tsqd-settings-menu-header`))),e})(),B(R,{get when(){return!e.showPanelViewOnly},get children(){return B(Z.Sub,{overlap:!0,gutter:8,shift:-4,get children(){return[B(Z.SubTrigger,{get class(){return K(a().settingsSubTrigger,`tsqd-settings-menu-sub-trigger`,`tsqd-settings-menu-sub-trigger-position`)},get children(){return[Nl(),B(Ac,{})]}}),B(Z.Portal,{ref:e=>D(e),get mount(){return t(()=>!!o().pipWindow)()?o().pipWindow.document.body:document.body},get children(){return B(Z.SubContent,{get class(){return K(a().settingsMenu,`tsqd-settings-submenu`)},get children(){return B(Z.RadioGroup,{"aria-label":`Position settings`,get value(){return e.localStore.position},onChange:e=>E(e),get children(){return[B(Z.RadioItem,{value:`top`,get class(){return K(a().settingsSubButton,`tsqd-settings-menu-position-btn`,`tsqd-settings-menu-position-btn-top`)},get children(){return[Pl(),B(jc,{})]}}),B(Z.RadioItem,{value:`bottom`,get class(){return K(a().settingsSubButton,`tsqd-settings-menu-position-btn`,`tsqd-settings-menu-position-btn-bottom`)},get children(){return[Fl(),B(Mc,{})]}}),B(Z.RadioItem,{value:`left`,get class(){return K(a().settingsSubButton,`tsqd-settings-menu-position-btn`,`tsqd-settings-menu-position-btn-left`)},get children(){return[Il(),B(Nc,{})]}}),B(Z.RadioItem,{value:`right`,get class(){return K(a().settingsSubButton,`tsqd-settings-menu-position-btn`,`tsqd-settings-menu-position-btn-right`)},get children(){return[Ll(),B(Pc,{})]}})]}})}})}})]}})}}),B(Z.Sub,{overlap:!0,gutter:8,shift:-4,get children(){return[B(Z.SubTrigger,{get class(){return K(a().settingsSubTrigger,`tsqd-settings-menu-sub-trigger`,`tsqd-settings-menu-sub-trigger-position`)},get children(){return[Rl(),B(Ac,{})]}}),B(Z.Portal,{ref:e=>D(e),get mount(){return t(()=>!!o().pipWindow)()?o().pipWindow.document.body:document.body},get children(){return B(Z.SubContent,{get class(){return K(a().settingsMenu,`tsqd-settings-submenu`)},get children(){return B(Z.RadioGroup,{get value(){return e.localStore.theme_preference},onChange:t=>{e.setLocalStore(`theme_preference`,t)},"aria-label":`Theme preference`,get children(){return[B(Z.RadioItem,{value:`light`,get class(){return K(a().settingsSubButton,`tsqd-settings-menu-position-btn`,`tsqd-settings-menu-position-btn-top`)},get children(){return[zl(),B(Fc,{})]}}),B(Z.RadioItem,{value:`dark`,get class(){return K(a().settingsSubButton,`tsqd-settings-menu-position-btn`,`tsqd-settings-menu-position-btn-bottom`)},get children(){return[Bl(),B(Ic,{})]}}),B(Z.RadioItem,{value:`system`,get class(){return K(a().settingsSubButton,`tsqd-settings-menu-position-btn`,`tsqd-settings-menu-position-btn-left`)},get children(){return[Vl(),B(Lc,{})]}})]}})}})}})]}}),B(Z.Sub,{overlap:!0,gutter:8,shift:-4,get children(){return[B(Z.SubTrigger,{get class(){return K(a().settingsSubTrigger,`tsqd-settings-menu-sub-trigger`,`tsqd-settings-menu-sub-trigger-disabled-queries`)},get children(){return[Hl(),B(Ac,{})]}}),B(Z.Portal,{ref:e=>D(e),get mount(){return t(()=>!!o().pipWindow)()?o().pipWindow.document.body:document.body},get children(){return B(Z.SubContent,{get class(){return K(a().settingsMenu,`tsqd-settings-submenu`)},get children(){return B(Z.RadioGroup,{get value(){return e.localStore.hideDisabledQueries},"aria-label":`Hide disabled queries setting`,onChange:t=>e.setLocalStore(`hideDisabledQueries`,t),get children(){return[B(Z.RadioItem,{value:`false`,get class(){return K(a().settingsSubButton,`tsqd-settings-menu-position-btn`,`tsqd-settings-menu-position-btn-show`)},get children(){return[Ul(),B(R,{get when(){return e.localStore.hideDisabledQueries!==`true`},get children(){return B(Jc,{})}})]}}),B(Z.RadioItem,{value:`true`,get class(){return K(a().settingsSubButton,`tsqd-settings-menu-position-btn`,`tsqd-settings-menu-position-btn-hide`)},get children(){return[Wl(),B(R,{get when(){return e.localStore.hideDisabledQueries===`true`},get children(){return B(Jc,{})}})]}})]}})}})}})]}})]}})}})]}}),null),M(r,B(R,{get when(){return s()===`queries`},get children(){var e=Gl(),t=e.firstChild;return M(t,B(Tt,{by:e=>e.queryHash,get each(){return C()},children:e=>B(xu,{get query(){return e()}})})),A(()=>z(e,K(a().overflowQueryContainer,`tsqd-queries-overflow-container`))),e}}),null),M(r,B(R,{get when(){return s()===`mutations`},get children(){var e=Kl(),t=e.firstChild;return M(t,B(Tt,{by:e=>e.mutationId,get each(){return ee()},children:e=>B(Su,{get mutation(){return e()}})})),A(()=>z(e,K(a().overflowQueryContainer,`tsqd-mutations-overflow-container`))),e}}),null),A(e=>{var t=K(a().queriesContainer,fu()<Ce&&(cu()||uu())&&i`
              height: 50%;
              max-height: 50%;
            `,fu()<Ce&&!(cu()||uu())&&i`
              height: 100%;
              max-height: 100%;
            `,`tsqd-queries-container`),n=K(a().row,`tsqd-header`),o=a().logoAndToggleContainer,c=K(a().logo,`tsqd-text-logo-container`),l=K(a().tanstackLogo,`tsqd-text-logo-tanstack`),d=K(a().queryFlavorLogo,`tsqd-text-logo-query-flavor`),p=K(a().row,`tsqd-filters-actions-container`),h=K(a().filtersContainer,`tsqd-filters-container`),y=K(a().filterInput,`tsqd-query-filter-textfield-container`),b=K(`tsqd-query-filter-textfield`),x=K(a().filterSelect,`tsqd-query-filter-sort-container`),C=`Sort order ${(s()===`queries`?u():g())===-1?`descending`:`ascending`}`,T=(s()===`queries`?u():g())===-1,ee=K(a().actionsContainer,`tsqd-actions-container`),E=K(a().actionsBtn,`tsqd-actions-btn`,`tsqd-action-clear-cache`),D=`Clear ${s()} cache`,A=K(a().actionsBtn,mu()&&a().actionsBtnOffline,`tsqd-actions-btn`,`tsqd-action-mock-offline-behavior`),M=`${mu()?`Unset offline mocking behavior`:`Mock offline behavior`}`,ie=mu(),I=`${mu()?`Unset offline mocking behavior`:`Mock offline behavior`}`;return t!==e.e&&z(r,e.e=t),n!==e.t&&z(m,e.t=n),o!==e.a&&z(_,e.a=o),c!==e.o&&z(v,e.o=c),l!==e.i&&z(S,e.i=l),d!==e.n&&z(w,e.n=d),p!==e.s&&z(te,e.s=p),h!==e.h&&z(O,e.h=h),y!==e.r&&z(k,e.r=y),b!==e.d&&z(ne,e.d=b),x!==e.l&&z(re,e.l=x),C!==e.u&&f(j,`aria-label`,e.u=C),T!==e.c&&f(j,`aria-pressed`,e.c=T),ee!==e.w&&z(N,e.w=ee),E!==e.m&&z(P,e.m=E),D!==e.f&&f(P,`title`,e.f=D),A!==e.y&&z(F,e.y=A),M!==e.g&&f(F,`aria-label`,e.g=M),ie!==e.p&&f(F,`aria-pressed`,e.p=ie),I!==e.b&&f(F,`title`,e.b=I),e},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0,h:void 0,r:void 0,d:void 0,l:void 0,u:void 0,c:void 0,w:void 0,m:void 0,f:void 0,y:void 0,g:void 0,p:void 0,b:void 0}),A(()=>ne.value=s()===`queries`?e.localStore.filter||``:e.localStore.mutationFilter||``),r})(),B(R,{get when(){return t(()=>s()===`queries`)()&&cu()},get children(){return B(Eu,{})}}),B(R,{get when(){return t(()=>s()===`mutations`)()&&uu()},get children(){return B(Du,{})}})]},xu=e=>{let t=W(),n=U().shadowDOMTarget?G.bind({target:U().shadowDOMTarget}):G,r=P(()=>t()===`dark`?Lu(n):Iu(n)),{colors:i,alpha:a}=Q,o=(e,n)=>t()===`dark`?n:e,s=$(t=>t().find({queryKey:e.query.queryKey})?.state,!0,t=>t.query.queryHash===e.query.queryHash),c=$(t=>t().find({queryKey:e.query.queryKey})?.isDisabled()??!1,!0,t=>t.query.queryHash===e.query.queryHash),l=$(t=>t().find({queryKey:e.query.queryKey})?.isStatic()??!1,!0,t=>t.query.queryHash===e.query.queryHash),u=$(t=>t().find({queryKey:e.query.queryKey})?.isStale()??!1,!0,t=>t.query.queryHash===e.query.queryHash),d=$(t=>t().find({queryKey:e.query.queryKey})?.getObserversCount()??0,!0,t=>t.query.queryHash===e.query.queryHash),p=P(()=>b({queryState:s(),observerCount:d(),isStale:u()})),m=()=>p()===`gray`?n`
        background-color: ${o(i[p()][200],i[p()][700])};
        color: ${o(i[p()][700],i[p()][300])};
      `:n`
      background-color: ${o(i[p()][200]+a[80],i[p()][900])};
      color: ${o(i[p()][800],i[p()][300])};
    `;return B(R,{get when(){return s()},get children(){var t=Zl(),n=t.firstChild,i=n.nextSibling;return t.$$click=()=>lu(e.query.queryHash===cu()?null:e.query.queryHash),M(n,d),M(i,()=>e.query.queryHash),M(t,B(R,{get when(){return c()},get children(){return Yl()}}),null),M(t,B(R,{get when(){return l()},get children(){return Xl()}}),null),A(i=>{var a=K(r().queryRow,cu()===e.query.queryHash&&r().selectedQueryRow,`tsqd-query-row`),o=`Query key ${e.query.queryHash}${c()?`, disabled`:``}${l()?`, static`:``}`,s=K(m(),`tsqd-query-observer-count`);return a!==i.e&&z(t,i.e=a),o!==i.t&&f(t,`aria-label`,i.t=o),s!==i.a&&z(n,i.a=s),i},{e:void 0,t:void 0,a:void 0}),t}})},Su=e=>{let n=W(),r=U().shadowDOMTarget?G.bind({target:U().shadowDOMTarget}):G,i=P(()=>n()===`dark`?Lu(r):Iu(r)),{colors:a,alpha:o}=Q,s=(e,t)=>n()===`dark`?t:e,c=Mu(t=>t().getAll().find(t=>t.mutationId===e.mutation.mutationId)?.state),l=Mu(t=>{let n=t().getAll().find(t=>t.mutationId===e.mutation.mutationId);return n?n.state.isPaused:!1}),u=Mu(t=>{let n=t().getAll().find(t=>t.mutationId===e.mutation.mutationId);return n?n.state.status:`idle`}),d=P(()=>y({isPaused:l(),status:u()})),p=()=>d()===`gray`?r`
        background-color: ${s(a[d()][200],a[d()][700])};
        color: ${s(a[d()][700],a[d()][300])};
      `:r`
      background-color: ${s(a[d()][200]+o[80],a[d()][900])};
      color: ${s(a[d()][800],a[d()][300])};
    `;return B(R,{get when(){return c()},get children(){var n=Zl(),r=n.firstChild,a=r.nextSibling;return n.$$click=()=>{du(e.mutation.mutationId===uu()?null:e.mutation.mutationId)},M(r,B(R,{get when(){return d()===`purple`},get children(){return B(Zc,{})}}),null),M(r,B(R,{get when(){return d()===`green`},get children(){return B(Jc,{})}}),null),M(r,B(R,{get when(){return d()===`red`},get children(){return B(Xc,{})}}),null),M(r,B(R,{get when(){return d()===`yellow`},get children(){return B(Yc,{})}}),null),M(a,B(R,{get when(){return e.mutation.options.mutationKey},get children(){return[t(()=>JSON.stringify(e.mutation.options.mutationKey)),` -`,` `]}}),null),M(a,()=>new Date(e.mutation.state.submittedAt).toLocaleString(),null),A(t=>{var a=K(i().queryRow,uu()===e.mutation.mutationId&&i().selectedQueryRow,`tsqd-query-row`),o=`Mutation submitted at ${new Date(e.mutation.state.submittedAt).toLocaleString()}`,s=K(p(),`tsqd-query-observer-count`);return a!==t.e&&z(n,t.e=a),o!==t.t&&f(n,`aria-label`,t.t=o),s!==t.a&&z(r,t.a=s),t},{e:void 0,t:void 0,a:void 0}),n}})},Cu=()=>{let e=$(e=>e().getAll().filter(e=>i(e)===`stale`).length),t=$(e=>e().getAll().filter(e=>i(e)===`fresh`).length),n=$(e=>e().getAll().filter(e=>i(e)===`fetching`).length),r=$(e=>e().getAll().filter(e=>i(e)===`paused`).length),a=$(e=>e().getAll().filter(e=>i(e)===`inactive`).length),o=W(),s=U().shadowDOMTarget?G.bind({target:U().shadowDOMTarget}):G,c=P(()=>o()===`dark`?Lu(s):Iu(s));return(()=>{var i=Cl();return M(i,B(Tu,{label:`Fresh`,color:`green`,get count(){return t()}}),null),M(i,B(Tu,{label:`Fetching`,color:`blue`,get count(){return n()}}),null),M(i,B(Tu,{label:`Paused`,color:`purple`,get count(){return r()}}),null),M(i,B(Tu,{label:`Stale`,color:`yellow`,get count(){return e()}}),null),M(i,B(Tu,{label:`Inactive`,color:`gray`,get count(){return a()}}),null),A(()=>z(i,K(c().queryStatusContainer,`tsqd-query-status-container`))),i})()},wu=()=>{let e=Mu(e=>e().getAll().filter(e=>y({isPaused:e.state.isPaused,status:e.state.status})===`green`).length),t=Mu(e=>e().getAll().filter(e=>y({isPaused:e.state.isPaused,status:e.state.status})===`yellow`).length),n=Mu(e=>e().getAll().filter(e=>y({isPaused:e.state.isPaused,status:e.state.status})===`purple`).length),r=Mu(e=>e().getAll().filter(e=>y({isPaused:e.state.isPaused,status:e.state.status})===`red`).length),i=W(),a=U().shadowDOMTarget?G.bind({target:U().shadowDOMTarget}):G,o=P(()=>i()===`dark`?Lu(a):Iu(a));return(()=>{var i=Cl();return M(i,B(Tu,{label:`Paused`,color:`purple`,get count(){return n()}}),null),M(i,B(Tu,{label:`Pending`,color:`yellow`,get count(){return t()}}),null),M(i,B(Tu,{label:`Success`,color:`green`,get count(){return e()}}),null),M(i,B(Tu,{label:`Error`,color:`red`,get count(){return r()}}),null),A(()=>z(i,K(o().queryStatusContainer,`tsqd-query-status-container`))),i})()},Tu=e=>{let n=W(),r=U().shadowDOMTarget?G.bind({target:U().shadowDOMTarget}):G,i=P(()=>n()===`dark`?Lu(r):Iu(r)),{colors:a,alpha:o}=Q,s=(e,t)=>n()===`dark`?t:e,c,[l,u]=T(!1),[f,p]=T(!1),m=P(()=>!(cu()&&fu()<Se&&fu()>Ce||fu()<Ce));return(()=>{var n=eu(),h=n.firstChild,g=h.nextSibling,_=c;return typeof _==`function`?d(_,n):c=n,n.addEventListener(`mouseleave`,()=>{u(!1),p(!1)}),n.addEventListener(`mouseenter`,()=>u(!0)),n.addEventListener(`blur`,()=>p(!1)),n.addEventListener(`focus`,()=>p(!0)),S(n,j({get disabled(){return m()},get"aria-label"(){return`${e.label}: ${e.count}`},get class(){return K(i().queryStatusTag,!m()&&r`
            cursor: pointer;
            &:hover {
              background: ${s(a.gray[200],a.darkGray[400])}${o[80]};
            }
          `,`tsqd-query-status-tag`,`tsqd-query-status-tag-${e.label.toLowerCase()}`)}},()=>l()||f()?{"aria-describedby":`tsqd-status-tooltip`}:{}),!1,!0),M(n,B(R,{get when(){return t(()=>!m())()&&(l()||f())},get children(){var t=Ql();return M(t,()=>e.label),A(()=>z(t,K(i().statusTooltip,`tsqd-query-status-tooltip`))),t}}),h),M(n,B(R,{get when(){return m()},get children(){var t=$l();return M(t,()=>e.label),A(()=>z(t,K(i().queryStatusTagLabel,`tsqd-query-status-tag-label`))),t}}),g),M(g,()=>e.count),A(t=>{var n=K(r`
            width: ${Q.size[1.5]};
            height: ${Q.size[1.5]};
            border-radius: ${Q.border.radius.full};
            background-color: ${Q.colors[e.color][500]};
          `,`tsqd-query-status-tag-dot`),o=K(i().queryStatusCount,e.count>0&&e.color!==`gray`&&r`
              background-color: ${s(a[e.color][100],a[e.color][900])};
              color: ${s(a[e.color][700],a[e.color][300])};
            `,`tsqd-query-status-tag-count`);return n!==t.e&&z(h,t.e=n),o!==t.t&&z(g,t.t=o),t},{e:void 0,t:void 0}),n})()},Eu=()=>{let n=W(),r=U().shadowDOMTarget?G.bind({target:U().shadowDOMTarget}):G,o=P(()=>n()===`dark`?Lu(r):Iu(r)),{colors:s}=Q,c=(e,t)=>n()===`dark`?t:e,l=U().client,[u,d]=T(!1),[p,m]=T(`view`),[h,g]=T(!1),_=P(()=>U().errorTypes||[]),y=$(e=>e().getAll().find(e=>e.queryHash===cu()),!1),b=$(e=>e().getAll().find(e=>e.queryHash===cu()),!1),x=$(e=>e().getAll().find(e=>e.queryHash===cu())?.state,!1),S=$(e=>e().getAll().find(e=>e.queryHash===cu())?.state.data,!1),C=$(e=>{let t=e().getAll().find(e=>e.queryHash===cu());return t?i(t):`inactive`}),w=$(e=>{let t=e().getAll().find(e=>e.queryHash===cu());return t?t.state.status:`pending`}),ee=$(e=>e().getAll().find(e=>e.queryHash===cu())?.getObserversCount()??0),E=P(()=>a(C())),D=()=>{Pu({type:`REFETCH`,queryHash:y()?.queryHash}),(y()?.fetch())?.catch(()=>{})},te=e=>{let t=y();if(!t)return;Pu({type:`TRIGGER_ERROR`,queryHash:t.queryHash,metadata:{error:e?.name}});let n=e?.initializer(t)??Error(`Unknown error from devtools`),r=t.options;t.setState({data:void 0,status:`error`,error:n,fetchMeta:{...t.state.fetchMeta,__previousQueryOptions:r}})},O=()=>{let e=y();if(!e)return;Pu({type:`RESTORE_LOADING`,queryHash:e.queryHash});let t=e.state,n=e.state.fetchMeta?e.state.fetchMeta.__previousQueryOptions:null;e.cancel({silent:!0}),e.setState({...t,fetchStatus:`idle`,fetchMeta:null}),n&&e.fetch(n)};I(()=>{C()!==`fetching`&&d(!1)});let k=()=>E()===`gray`?r`
        background-color: ${c(s[E()][200],s[E()][700])};
        color: ${c(s[E()][700],s[E()][300])};
        border-color: ${c(s[E()][400],s[E()][600])};
      `:r`
      background-color: ${c(s[E()][100],s[E()][900])};
      color: ${c(s[E()][700],s[E()][300])};
      border-color: ${c(s[E()][400],s[E()][600])};
    `;return B(R,{get when(){return t(()=>!!y())()&&x()},get children(){var t=au(),n=t.firstChild,i=n.nextSibling,a=i.firstChild,T=a.firstChild,E=T.firstChild,ne=T.nextSibling,re=a.nextSibling,j=re.firstChild.nextSibling,N=re.nextSibling.firstChild.nextSibling,P=i.nextSibling,F=P.nextSibling,ie=F.firstChild,I=ie.firstChild,L=ie.nextSibling,ae=L.firstChild,V=L.nextSibling,se=V.firstChild,ce=V.nextSibling,le=ce.firstChild,ue=ce.nextSibling,de=ue.firstChild,fe=de.nextSibling,H=F.nextSibling;H.firstChild;var pe=H.nextSibling,me=pe.nextSibling;return M(E,()=>oe(y().queryKey,!0)),M(ne,C),M(j,ee),M(N,()=>new Date(x().dataUpdatedAt).toLocaleTimeString()),ie.$$click=D,L.$$click=()=>{Pu({type:`INVALIDATE`,queryHash:y()?.queryHash}),l.invalidateQueries({queryKey:y()?.queryKey,exact:!0})},V.$$click=()=>{Pu({type:`RESET`,queryHash:y()?.queryHash}),l.resetQueries({queryKey:y()?.queryKey,exact:!0})},ce.$$click=()=>{Pu({type:`REMOVE`,queryHash:y()?.queryHash}),l.removeQueries({queryKey:y()?.queryKey,exact:!0}),lu(null)},ue.$$click=()=>{if(y()?.state.data===void 0)d(!0),O();else{let e=y();if(!e)return;Pu({type:`TRIGGER_LOADING`,queryHash:e.queryHash});let t=e.options;e.fetch({...t,queryFn:()=>new Promise(()=>{}),gcTime:-1}),e.setState({data:void 0,status:`pending`,fetchMeta:{...e.state.fetchMeta,__previousQueryOptions:t}})}},M(ue,()=>w()===`pending`?`Restore`:`Trigger`,fe),M(F,B(R,{get when(){return _().length===0||w()===`error`},get children(){var e=tu(),t=e.firstChild,n=t.nextSibling;return e.$$click=()=>{y().state.error?(Pu({type:`RESTORE_ERROR`,queryHash:y()?.queryHash}),l.resetQueries({queryKey:y()?.queryKey})):te()},M(e,()=>w()===`error`?`Restore`:`Trigger`,n),A(n=>{var i=K(r`
                  color: ${c(s.red[500],s.red[400])};
                `,`tsqd-query-details-actions-btn`,`tsqd-query-details-action-error`),a=w()===`pending`,o=r`
                  background-color: ${c(s.red[500],s.red[400])};
                `;return i!==n.e&&z(e,n.e=i),a!==n.t&&(e.disabled=n.t=a),o!==n.a&&z(t,n.a=o),n},{e:void 0,t:void 0,a:void 0}),e}}),null),M(F,B(R,{get when(){return!(_().length===0||w()===`error`)},get children(){var t=nu(),n=t.firstChild,i=n.nextSibling.nextSibling;return i.firstChild,i.addEventListener(`change`,e=>{te(_().find(t=>t.name===e.currentTarget.value))}),M(i,B(e,{get each(){return _()},children:e=>(()=>{var t=ou();return M(t,()=>e.name),A(()=>t.value=e.name),t})()}),null),M(t,B(Ac,{}),null),A(e=>{var a=K(o().actionsSelect,`tsqd-query-details-actions-btn`,`tsqd-query-details-action-error-multiple`),s=r`
                  background-color: ${Q.colors.red[400]};
                `,c=w()===`pending`;return a!==e.e&&z(t,e.e=a),s!==e.t&&z(n,e.t=s),c!==e.a&&(i.disabled=e.a=c),e},{e:void 0,t:void 0,a:void 0}),t}}),null),M(H,()=>p()===`view`?`Explorer`:`Editor`,null),M(t,B(R,{get when(){return p()===`view`},get children(){var e=ru();return M(e,B(vl,{label:`Data`,defaultExpanded:[`Data`],get value(){return S()},editable:!0,onEdit:()=>m(`edit`),get activeQuery(){return y()}})),A(t=>v(e,`padding`,Q.size[2])),e}}),pe),M(t,B(R,{get when(){return p()===`edit`},get children(){var e=iu(),t=e.firstChild,n=t.nextSibling,i=n.firstChild,a=i.nextSibling,l=a.firstChild,u=l.nextSibling;return e.addEventListener(`submit`,e=>{e.preventDefault();let t=new FormData(e.currentTarget).get(`data`);try{let e=JSON.parse(t);y().setState({...y().state,data:e}),m(`view`)}catch{g(!0)}}),t.addEventListener(`focus`,()=>g(!1)),M(i,()=>h()?`Invalid Value`:``),l.$$click=()=>m(`view`),A(d=>{var p=K(o().devtoolsEditForm,`tsqd-query-details-data-editor`),m=o().devtoolsEditTextarea,g=h(),_=o().devtoolsEditFormActions,v=o().devtoolsEditFormError,y=o().devtoolsEditFormActionContainer,b=K(o().devtoolsEditFormAction,r`
                      color: ${c(s.gray[600],s.gray[300])};
                    `),x=K(o().devtoolsEditFormAction,r`
                      color: ${c(s.blue[600],s.blue[400])};
                    `);return p!==d.e&&z(e,d.e=p),m!==d.t&&z(t,d.t=m),g!==d.a&&f(t,`data-error`,d.a=g),_!==d.o&&z(n,d.o=_),v!==d.i&&z(i,d.i=v),y!==d.n&&z(a,d.n=y),b!==d.s&&z(l,d.s=b),x!==d.h&&z(u,d.h=x),d},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0,h:void 0}),A(()=>t.value=JSON.stringify(S(),null,2)),e}}),pe),M(me,B(vl,{label:`Query`,defaultExpanded:[`Query`,`queryKey`],get value(){return b()}})),A(e=>{var a=K(o().detailsContainer,`tsqd-query-details-container`),l=K(o().detailsHeader,`tsqd-query-details-header`),d=K(o().detailsBody,`tsqd-query-details-summary-container`),f=K(o().queryDetailsStatus,k()),p=K(o().detailsHeader,`tsqd-query-details-header`),m=K(o().actionsBody,`tsqd-query-details-actions-container`),h=K(r`
                color: ${c(s.blue[600],s.blue[400])};
              `,`tsqd-query-details-actions-btn`,`tsqd-query-details-action-refetch`),g=C()===`fetching`,_=r`
                background-color: ${c(s.blue[600],s.blue[400])};
              `,y=K(r`
                color: ${c(s.yellow[600],s.yellow[400])};
              `,`tsqd-query-details-actions-btn`,`tsqd-query-details-action-invalidate`),b=w()===`pending`,x=r`
                background-color: ${c(s.yellow[600],s.yellow[400])};
              `,S=K(r`
                color: ${c(s.gray[600],s.gray[300])};
              `,`tsqd-query-details-actions-btn`,`tsqd-query-details-action-reset`),T=w()===`pending`,ee=r`
                background-color: ${c(s.gray[600],s.gray[400])};
              `,E=K(r`
                color: ${c(s.pink[500],s.pink[400])};
              `,`tsqd-query-details-actions-btn`,`tsqd-query-details-action-remove`),D=C()===`fetching`,te=r`
                background-color: ${c(s.pink[500],s.pink[400])};
              `,O=K(r`
                color: ${c(s.cyan[500],s.cyan[400])};
              `,`tsqd-query-details-actions-btn`,`tsqd-query-details-action-loading`),A=u(),re=r`
                background-color: ${c(s.cyan[500],s.cyan[400])};
              `,j=K(o().detailsHeader,`tsqd-query-details-header`),M=K(o().detailsHeader,`tsqd-query-details-header`),N=Q.size[2];return a!==e.e&&z(t,e.e=a),l!==e.t&&z(n,e.t=l),d!==e.a&&z(i,e.a=d),f!==e.o&&z(ne,e.o=f),p!==e.i&&z(P,e.i=p),m!==e.n&&z(F,e.n=m),h!==e.s&&z(ie,e.s=h),g!==e.h&&(ie.disabled=e.h=g),_!==e.r&&z(I,e.r=_),y!==e.d&&z(L,e.d=y),b!==e.l&&(L.disabled=e.l=b),x!==e.u&&z(ae,e.u=x),S!==e.c&&z(V,e.c=S),T!==e.w&&(V.disabled=e.w=T),ee!==e.m&&z(se,e.m=ee),E!==e.f&&z(ce,e.f=E),D!==e.y&&(ce.disabled=e.y=D),te!==e.g&&z(le,e.g=te),O!==e.p&&z(ue,e.p=O),A!==e.b&&(ue.disabled=e.b=A),re!==e.T&&z(de,e.T=re),j!==e.A&&z(H,e.A=j),M!==e.O&&z(pe,e.O=M),N!==e.I&&v(me,`padding`,e.I=N),e},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0,h:void 0,r:void 0,d:void 0,l:void 0,u:void 0,c:void 0,w:void 0,m:void 0,f:void 0,y:void 0,g:void 0,p:void 0,b:void 0,T:void 0,A:void 0,O:void 0,I:void 0}),t}})},Du=()=>{let e=W(),t=U().shadowDOMTarget?G.bind({target:U().shadowDOMTarget}):G,n=P(()=>e()===`dark`?Lu(t):Iu(t)),{colors:r}=Q,i=(t,n)=>e()===`dark`?n:t,a=Mu(e=>{let t=e().getAll().find(e=>e.mutationId===uu());return t?t.state.isPaused:!1}),o=Mu(e=>{let t=e().getAll().find(e=>e.mutationId===uu());return t?t.state.status:`idle`}),s=P(()=>y({isPaused:a(),status:o()})),c=Mu(e=>e().getAll().find(e=>e.mutationId===uu()),!1),l=()=>s()===`gray`?t`
        background-color: ${i(r[s()][200],r[s()][700])};
        color: ${i(r[s()][700],r[s()][300])};
        border-color: ${i(r[s()][400],r[s()][600])};
      `:t`
      background-color: ${i(r[s()][100],r[s()][900])};
      color: ${i(r[s()][700],r[s()][300])};
      border-color: ${i(r[s()][400],r[s()][600])};
    `;return B(R,{get when(){return c()},get children(){var e=su(),t=e.firstChild,r=t.nextSibling,i=r.firstChild,a=i.firstChild,u=a.firstChild,d=a.nextSibling,f=i.nextSibling.firstChild.nextSibling,p=r.nextSibling,m=p.nextSibling,h=m.nextSibling,g=h.nextSibling,_=g.nextSibling,y=_.nextSibling,b=y.nextSibling,x=b.nextSibling;return M(u,B(R,{get when(){return c().options.mutationKey},fallback:`No mutationKey found`,get children(){return oe(c().options.mutationKey,!0)}})),M(d,B(R,{get when(){return s()===`purple`},children:`pending`}),null),M(d,B(R,{get when(){return s()!==`purple`},get children(){return o()}}),null),M(f,()=>new Date(c().state.submittedAt).toLocaleTimeString()),M(m,B(vl,{label:`Variables`,defaultExpanded:[`Variables`],get value(){return c().state.variables}})),M(g,B(vl,{label:`Context`,defaultExpanded:[`Context`],get value(){return c().state.context}})),M(y,B(vl,{label:`Data`,defaultExpanded:[`Data`],get value(){return c().state.data}})),M(x,B(vl,{label:`Mutation`,defaultExpanded:[`Mutation`],get value(){return c()}})),A(i=>{var a=K(n().detailsContainer,`tsqd-query-details-container`),o=K(n().detailsHeader,`tsqd-query-details-header`),s=K(n().detailsBody,`tsqd-query-details-summary-container`),c=K(n().queryDetailsStatus,l()),u=K(n().detailsHeader,`tsqd-query-details-header`),f=Q.size[2],S=K(n().detailsHeader,`tsqd-query-details-header`),C=Q.size[2],w=K(n().detailsHeader,`tsqd-query-details-header`),T=Q.size[2],ee=K(n().detailsHeader,`tsqd-query-details-header`),E=Q.size[2];return a!==i.e&&z(e,i.e=a),o!==i.t&&z(t,i.t=o),s!==i.a&&z(r,i.a=s),c!==i.o&&z(d,i.o=c),u!==i.i&&z(p,i.i=u),f!==i.n&&v(m,`padding`,i.n=f),S!==i.s&&z(h,i.s=S),C!==i.h&&v(g,`padding`,i.h=C),w!==i.r&&z(_,i.r=w),T!==i.d&&v(y,`padding`,i.d=T),ee!==i.l&&z(b,i.l=ee),E!==i.u&&v(x,`padding`,i.u=E),i},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0,h:void 0,r:void 0,d:void 0,l:void 0,u:void 0}),e}})},Ou=new Map,ku=()=>{let e=P(()=>U().client.getQueryCache()),t=e().subscribe(t=>{ie(()=>{for(let[n,r]of Ou.entries())r.shouldUpdate(t)&&r.setter(n(e))})});return g(()=>{Ou.clear(),t()}),t},$=(e,t=!0,n=()=>!0)=>{let r=P(()=>U().client.getQueryCache()),[i,a]=T(e(r),t?void 0:{equals:!1});return I(()=>{a(e(r))}),Ou.set(e,{setter:a,shouldUpdate:n}),g(()=>{Ou.delete(e)}),i},Au=new Map,ju=()=>{let e=P(()=>U().client.getMutationCache()),t=e().subscribe(()=>{for(let[t,n]of Au.entries())queueMicrotask(()=>{n(t(e))})});return g(()=>{Au.clear(),t()}),t},Mu=(e,t=!0)=>{let n=P(()=>U().client.getMutationCache()),[r,i]=T(e(n),t?void 0:{equals:!1});return I(()=>{i(e(n))}),Au.set(e,i),g(()=>{Au.delete(e)}),r},Nu=`@tanstack/query-devtools-event`,Pu=({type:e,queryHash:t,metadata:n})=>{let r=new CustomEvent(Nu,{detail:{type:e,queryHash:t,metadata:n},bubbles:!0,cancelable:!0});window.dispatchEvent(r)},Fu=(e,t)=>{let{colors:n,font:r,size:i,alpha:a,shadow:o,border:s}=Q,c=(t,n)=>e===`light`?t:n;return{devtoolsBtn:t`
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
    `}},Iu=e=>Fu(`light`,e),Lu=e=>Fu(`dark`,e);se([`click`,`mousedown`,`keydown`,`input`]);export{Fe as a,ve as c,Re as i,gu as n,De as o,vu as r,Be as s,bu as t};