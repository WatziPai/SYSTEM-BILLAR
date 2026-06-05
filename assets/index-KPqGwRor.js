(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();const _f=()=>{};var Ac={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ru=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},vf=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=n[t++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=n[t++],a=n[t++],c=n[t++],u=((s&7)<<18|(i&63)<<12|(a&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const i=n[t++],a=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|a&63)}}return e.join("")},su={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const i=n[s],a=s+1<n.length,c=a?n[s+1]:0,u=s+2<n.length,d=u?n[s+2]:0,f=i>>2,g=(i&3)<<4|c>>4;let w=(c&15)<<2|d>>6,C=d&63;u||(C=64,a||(w=64)),r.push(t[f],t[g],t[w],t[C])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(ru(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):vf(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const i=t[n.charAt(s++)],c=s<n.length?t[n.charAt(s)]:0;++s;const d=s<n.length?t[n.charAt(s)]:64;++s;const g=s<n.length?t[n.charAt(s)]:64;if(++s,i==null||c==null||d==null||g==null)throw new Ef;const w=i<<2|c>>4;if(r.push(w),d!==64){const C=c<<4&240|d>>2;if(r.push(C),g!==64){const M=d<<6&192|g;r.push(M)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Ef extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const wf=function(n){const e=ru(n);return su.encodeByteArray(e,!0)},Ss=function(n){return wf(n).replace(/\./g,"")},iu=function(n){try{return su.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tf(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bf=()=>Tf().__FIREBASE_DEFAULTS__,If=()=>{if(typeof process>"u"||typeof Ac>"u")return;const n=Ac.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Af=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&iu(n[1]);return e&&JSON.parse(e)},Ks=()=>{try{return _f()||bf()||If()||Af()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},ou=n=>{var e,t;return(t=(e=Ks())==null?void 0:e.emulatorHosts)==null?void 0:t[n]},Cf=n=>{const e=ou(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},au=()=>{var n;return(n=Ks())==null?void 0:n.config},cu=n=>{var e;return(e=Ks())==null?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sf{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rf(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",s=n.iat||0,i=n.sub||n.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a={iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...n};return[Ss(JSON.stringify(t)),Ss(JSON.stringify(a)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ke(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Pf(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(ke())}function xf(){var e;const n=(e=Ks())==null?void 0:e.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function kf(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Df(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Vf(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Lf(){const n=ke();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Mf(){return!xf()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Nf(){try{return typeof indexedDB=="object"}catch{return!1}}function Of(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var i;e(((i=s.error)==null?void 0:i.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ff="FirebaseError";class gt extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=Ff,Object.setPrototypeOf(this,gt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,kr.prototype.create)}}class kr{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],a=i?$f(i,r):"Error",c=`${this.serviceName}: ${a} (${s}).`;return new gt(s,c,r)}}function $f(n,e){return n.replace(Uf,(t,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const Uf=/\{\$([^}]+)}/g;function Bf(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function tn(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const i=n[s],a=e[s];if(Cc(i)&&Cc(a)){if(!tn(i,a))return!1}else if(i!==a)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function Cc(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dr(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function or(n){const e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,i]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function ar(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function jf(n,e){const t=new zf(n,e);return t.subscribe.bind(t)}class zf{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");qf(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=Ni),s.error===void 0&&(s.error=Ni),s.complete===void 0&&(s.complete=Ni);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function qf(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Ni(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ne(n){return n&&n._delegate?n._delegate:n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vr(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function lu(n){return(await fetch(n,{credentials:"include"})).ok}class nn{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yt="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hf{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new Sf;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),r=(e==null?void 0:e.optional)??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Wf(e))try{this.getOrInitializeService({instanceIdentifier:Yt})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=Yt){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Yt){return this.instances.has(e)}getOptions(e=Yt){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[i,a]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);r===c&&a.resolve(s)}return s}onInit(e,t){const r=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(r)??new Set;s.add(e),this.onInitCallbacks.set(r,s);const i=this.instances.get(r);return i&&e(i,r),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Gf(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Yt){return this.component?this.component.multipleInstances?e:Yt:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Gf(n){return n===Yt?void 0:n}function Wf(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kf{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Hf(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Z;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(Z||(Z={}));const Yf={debug:Z.DEBUG,verbose:Z.VERBOSE,info:Z.INFO,warn:Z.WARN,error:Z.ERROR,silent:Z.SILENT},Qf=Z.INFO,Jf={[Z.DEBUG]:"log",[Z.VERBOSE]:"log",[Z.INFO]:"info",[Z.WARN]:"warn",[Z.ERROR]:"error"},Xf=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=Jf[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class So{constructor(e){this.name=e,this._logLevel=Qf,this._logHandler=Xf,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in Z))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Yf[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,Z.DEBUG,...e),this._logHandler(this,Z.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,Z.VERBOSE,...e),this._logHandler(this,Z.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,Z.INFO,...e),this._logHandler(this,Z.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,Z.WARN,...e),this._logHandler(this,Z.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,Z.ERROR,...e),this._logHandler(this,Z.ERROR,...e)}}const Zf=(n,e)=>e.some(t=>n instanceof t);let Sc,Rc;function em(){return Sc||(Sc=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function tm(){return Rc||(Rc=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const uu=new WeakMap,Xi=new WeakMap,du=new WeakMap,Oi=new WeakMap,Ro=new WeakMap;function nm(n){const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("success",i),n.removeEventListener("error",a)},i=()=>{t(Pt(n.result)),s()},a=()=>{r(n.error),s()};n.addEventListener("success",i),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&uu.set(t,n)}).catch(()=>{}),Ro.set(e,n),e}function rm(n){if(Xi.has(n))return;const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",a),n.removeEventListener("abort",a)},i=()=>{t(),s()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",i),n.addEventListener("error",a),n.addEventListener("abort",a)});Xi.set(n,e)}let Zi={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Xi.get(n);if(e==="objectStoreNames")return n.objectStoreNames||du.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Pt(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function sm(n){Zi=n(Zi)}function im(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(Fi(this),e,...t);return du.set(r,e.sort?e.sort():[e]),Pt(r)}:tm().includes(n)?function(...e){return n.apply(Fi(this),e),Pt(uu.get(this))}:function(...e){return Pt(n.apply(Fi(this),e))}}function om(n){return typeof n=="function"?im(n):(n instanceof IDBTransaction&&rm(n),Zf(n,em())?new Proxy(n,Zi):n)}function Pt(n){if(n instanceof IDBRequest)return nm(n);if(Oi.has(n))return Oi.get(n);const e=om(n);return e!==n&&(Oi.set(n,e),Ro.set(e,n)),e}const Fi=n=>Ro.get(n);function am(n,e,{blocked:t,upgrade:r,blocking:s,terminated:i}={}){const a=indexedDB.open(n,e),c=Pt(a);return r&&a.addEventListener("upgradeneeded",u=>{r(Pt(a.result),u.oldVersion,u.newVersion,Pt(a.transaction),u)}),t&&a.addEventListener("blocked",u=>t(u.oldVersion,u.newVersion,u)),c.then(u=>{i&&u.addEventListener("close",()=>i()),s&&u.addEventListener("versionchange",d=>s(d.oldVersion,d.newVersion,d))}).catch(()=>{}),c}const cm=["get","getKey","getAll","getAllKeys","count"],lm=["put","add","delete","clear"],$i=new Map;function Pc(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if($i.get(e))return $i.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,s=lm.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||cm.includes(t)))return;const i=async function(a,...c){const u=this.transaction(a,s?"readwrite":"readonly");let d=u.store;return r&&(d=d.index(c.shift())),(await Promise.all([d[t](...c),s&&u.done]))[0]};return $i.set(e,i),i}sm(n=>({...n,get:(e,t,r)=>Pc(e,t)||n.get(e,t,r),has:(e,t)=>!!Pc(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class um{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(dm(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function dm(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const eo="@firebase/app",xc="0.14.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ht=new So("@firebase/app"),hm="@firebase/app-compat",fm="@firebase/analytics-compat",mm="@firebase/analytics",pm="@firebase/app-check-compat",gm="@firebase/app-check",ym="@firebase/auth",_m="@firebase/auth-compat",vm="@firebase/database",Em="@firebase/data-connect",wm="@firebase/database-compat",Tm="@firebase/functions",bm="@firebase/functions-compat",Im="@firebase/installations",Am="@firebase/installations-compat",Cm="@firebase/messaging",Sm="@firebase/messaging-compat",Rm="@firebase/performance",Pm="@firebase/performance-compat",xm="@firebase/remote-config",km="@firebase/remote-config-compat",Dm="@firebase/storage",Vm="@firebase/storage-compat",Lm="@firebase/firestore",Mm="@firebase/ai",Nm="@firebase/firestore-compat",Om="firebase",Fm="12.14.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const to="[DEFAULT]",$m={[eo]:"fire-core",[hm]:"fire-core-compat",[mm]:"fire-analytics",[fm]:"fire-analytics-compat",[gm]:"fire-app-check",[pm]:"fire-app-check-compat",[ym]:"fire-auth",[_m]:"fire-auth-compat",[vm]:"fire-rtdb",[Em]:"fire-data-connect",[wm]:"fire-rtdb-compat",[Tm]:"fire-fn",[bm]:"fire-fn-compat",[Im]:"fire-iid",[Am]:"fire-iid-compat",[Cm]:"fire-fcm",[Sm]:"fire-fcm-compat",[Rm]:"fire-perf",[Pm]:"fire-perf-compat",[xm]:"fire-rc",[km]:"fire-rc-compat",[Dm]:"fire-gcs",[Vm]:"fire-gcs-compat",[Lm]:"fire-fst",[Nm]:"fire-fst-compat",[Mm]:"fire-vertex","fire-js":"fire-js",[Om]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rs=new Map,Um=new Map,no=new Map;function kc(n,e){try{n.container.addComponent(e)}catch(t){ht.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Rn(n){const e=n.name;if(no.has(e))return ht.debug(`There were multiple attempts to register component ${e}.`),!1;no.set(e,n);for(const t of Rs.values())kc(t,n);for(const t of Um.values())kc(t,n);return!0}function Po(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function Ue(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bm={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},xt=new kr("app","Firebase",Bm);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jm{constructor(e,t,r){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new nn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw xt.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mn=Fm;function hu(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r={name:to,automaticDataCollectionEnabled:!0,...e},s=r.name;if(typeof s!="string"||!s)throw xt.create("bad-app-name",{appName:String(s)});if(t||(t=au()),!t)throw xt.create("no-options");const i=Rs.get(s);if(i){if(tn(t,i.options)&&tn(r,i.config))return i;throw xt.create("duplicate-app",{appName:s})}const a=new Kf(s);for(const u of no.values())a.addComponent(u);const c=new jm(t,r,a);return Rs.set(s,c),c}function fu(n=to){const e=Rs.get(n);if(!e&&n===to&&au())return hu();if(!e)throw xt.create("no-app",{appName:n});return e}function kt(n,e,t){let r=$m[n]??n;t&&(r+=`-${t}`);const s=r.match(/\s|\//),i=e.match(/\s|\//);if(s||i){const a=[`Unable to register library "${r}" with version "${e}":`];s&&a.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&i&&a.push("and"),i&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),ht.warn(a.join(" "));return}Rn(new nn(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zm="firebase-heartbeat-database",qm=1,_r="firebase-heartbeat-store";let Ui=null;function mu(){return Ui||(Ui=am(zm,qm,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(_r)}catch(t){console.warn(t)}}}}).catch(n=>{throw xt.create("idb-open",{originalErrorMessage:n.message})})),Ui}async function Hm(n){try{const t=(await mu()).transaction(_r),r=await t.objectStore(_r).get(pu(n));return await t.done,r}catch(e){if(e instanceof gt)ht.warn(e.message);else{const t=xt.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});ht.warn(t.message)}}}async function Dc(n,e){try{const r=(await mu()).transaction(_r,"readwrite");await r.objectStore(_r).put(e,pu(n)),await r.done}catch(t){if(t instanceof gt)ht.warn(t.message);else{const r=xt.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});ht.warn(r.message)}}}function pu(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gm=1024,Wm=30;class Km{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Qm(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Vc();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(a=>a.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats.length>Wm){const a=Jm(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){ht.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Vc(),{heartbeatsToSend:r,unsentEntries:s}=Ym(this._heartbeatsCache.heartbeats),i=Ss(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return ht.warn(t),""}}}function Vc(){return new Date().toISOString().substring(0,10)}function Ym(n,e=Gm){const t=[];let r=n.slice();for(const s of n){const i=t.find(a=>a.agent===s.agent);if(i){if(i.dates.push(s.date),Lc(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),Lc(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class Qm{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Nf()?Of().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Hm(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Dc(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Dc(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function Lc(n){return Ss(JSON.stringify({version:2,heartbeats:n})).length}function Jm(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xm(n){Rn(new nn("platform-logger",e=>new um(e),"PRIVATE")),Rn(new nn("heartbeat",e=>new Km(e),"PRIVATE")),kt(eo,xc,n),kt(eo,xc,"esm2020"),kt("fire-js","")}Xm("");var Zm="firebase",ep="12.14.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */kt(Zm,ep,"app");var Mc=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Dt,gu;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(_,y){function E(){}E.prototype=y.prototype,_.F=y.prototype,_.prototype=new E,_.prototype.constructor=_,_.D=function(b,T,A){for(var v=Array(arguments.length-2),Oe=2;Oe<arguments.length;Oe++)v[Oe-2]=arguments[Oe];return y.prototype[T].apply(b,v)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(r,t),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(_,y,E){E||(E=0);const b=Array(16);if(typeof y=="string")for(var T=0;T<16;++T)b[T]=y.charCodeAt(E++)|y.charCodeAt(E++)<<8|y.charCodeAt(E++)<<16|y.charCodeAt(E++)<<24;else for(T=0;T<16;++T)b[T]=y[E++]|y[E++]<<8|y[E++]<<16|y[E++]<<24;y=_.g[0],E=_.g[1],T=_.g[2];let A=_.g[3],v;v=y+(A^E&(T^A))+b[0]+3614090360&4294967295,y=E+(v<<7&4294967295|v>>>25),v=A+(T^y&(E^T))+b[1]+3905402710&4294967295,A=y+(v<<12&4294967295|v>>>20),v=T+(E^A&(y^E))+b[2]+606105819&4294967295,T=A+(v<<17&4294967295|v>>>15),v=E+(y^T&(A^y))+b[3]+3250441966&4294967295,E=T+(v<<22&4294967295|v>>>10),v=y+(A^E&(T^A))+b[4]+4118548399&4294967295,y=E+(v<<7&4294967295|v>>>25),v=A+(T^y&(E^T))+b[5]+1200080426&4294967295,A=y+(v<<12&4294967295|v>>>20),v=T+(E^A&(y^E))+b[6]+2821735955&4294967295,T=A+(v<<17&4294967295|v>>>15),v=E+(y^T&(A^y))+b[7]+4249261313&4294967295,E=T+(v<<22&4294967295|v>>>10),v=y+(A^E&(T^A))+b[8]+1770035416&4294967295,y=E+(v<<7&4294967295|v>>>25),v=A+(T^y&(E^T))+b[9]+2336552879&4294967295,A=y+(v<<12&4294967295|v>>>20),v=T+(E^A&(y^E))+b[10]+4294925233&4294967295,T=A+(v<<17&4294967295|v>>>15),v=E+(y^T&(A^y))+b[11]+2304563134&4294967295,E=T+(v<<22&4294967295|v>>>10),v=y+(A^E&(T^A))+b[12]+1804603682&4294967295,y=E+(v<<7&4294967295|v>>>25),v=A+(T^y&(E^T))+b[13]+4254626195&4294967295,A=y+(v<<12&4294967295|v>>>20),v=T+(E^A&(y^E))+b[14]+2792965006&4294967295,T=A+(v<<17&4294967295|v>>>15),v=E+(y^T&(A^y))+b[15]+1236535329&4294967295,E=T+(v<<22&4294967295|v>>>10),v=y+(T^A&(E^T))+b[1]+4129170786&4294967295,y=E+(v<<5&4294967295|v>>>27),v=A+(E^T&(y^E))+b[6]+3225465664&4294967295,A=y+(v<<9&4294967295|v>>>23),v=T+(y^E&(A^y))+b[11]+643717713&4294967295,T=A+(v<<14&4294967295|v>>>18),v=E+(A^y&(T^A))+b[0]+3921069994&4294967295,E=T+(v<<20&4294967295|v>>>12),v=y+(T^A&(E^T))+b[5]+3593408605&4294967295,y=E+(v<<5&4294967295|v>>>27),v=A+(E^T&(y^E))+b[10]+38016083&4294967295,A=y+(v<<9&4294967295|v>>>23),v=T+(y^E&(A^y))+b[15]+3634488961&4294967295,T=A+(v<<14&4294967295|v>>>18),v=E+(A^y&(T^A))+b[4]+3889429448&4294967295,E=T+(v<<20&4294967295|v>>>12),v=y+(T^A&(E^T))+b[9]+568446438&4294967295,y=E+(v<<5&4294967295|v>>>27),v=A+(E^T&(y^E))+b[14]+3275163606&4294967295,A=y+(v<<9&4294967295|v>>>23),v=T+(y^E&(A^y))+b[3]+4107603335&4294967295,T=A+(v<<14&4294967295|v>>>18),v=E+(A^y&(T^A))+b[8]+1163531501&4294967295,E=T+(v<<20&4294967295|v>>>12),v=y+(T^A&(E^T))+b[13]+2850285829&4294967295,y=E+(v<<5&4294967295|v>>>27),v=A+(E^T&(y^E))+b[2]+4243563512&4294967295,A=y+(v<<9&4294967295|v>>>23),v=T+(y^E&(A^y))+b[7]+1735328473&4294967295,T=A+(v<<14&4294967295|v>>>18),v=E+(A^y&(T^A))+b[12]+2368359562&4294967295,E=T+(v<<20&4294967295|v>>>12),v=y+(E^T^A)+b[5]+4294588738&4294967295,y=E+(v<<4&4294967295|v>>>28),v=A+(y^E^T)+b[8]+2272392833&4294967295,A=y+(v<<11&4294967295|v>>>21),v=T+(A^y^E)+b[11]+1839030562&4294967295,T=A+(v<<16&4294967295|v>>>16),v=E+(T^A^y)+b[14]+4259657740&4294967295,E=T+(v<<23&4294967295|v>>>9),v=y+(E^T^A)+b[1]+2763975236&4294967295,y=E+(v<<4&4294967295|v>>>28),v=A+(y^E^T)+b[4]+1272893353&4294967295,A=y+(v<<11&4294967295|v>>>21),v=T+(A^y^E)+b[7]+4139469664&4294967295,T=A+(v<<16&4294967295|v>>>16),v=E+(T^A^y)+b[10]+3200236656&4294967295,E=T+(v<<23&4294967295|v>>>9),v=y+(E^T^A)+b[13]+681279174&4294967295,y=E+(v<<4&4294967295|v>>>28),v=A+(y^E^T)+b[0]+3936430074&4294967295,A=y+(v<<11&4294967295|v>>>21),v=T+(A^y^E)+b[3]+3572445317&4294967295,T=A+(v<<16&4294967295|v>>>16),v=E+(T^A^y)+b[6]+76029189&4294967295,E=T+(v<<23&4294967295|v>>>9),v=y+(E^T^A)+b[9]+3654602809&4294967295,y=E+(v<<4&4294967295|v>>>28),v=A+(y^E^T)+b[12]+3873151461&4294967295,A=y+(v<<11&4294967295|v>>>21),v=T+(A^y^E)+b[15]+530742520&4294967295,T=A+(v<<16&4294967295|v>>>16),v=E+(T^A^y)+b[2]+3299628645&4294967295,E=T+(v<<23&4294967295|v>>>9),v=y+(T^(E|~A))+b[0]+4096336452&4294967295,y=E+(v<<6&4294967295|v>>>26),v=A+(E^(y|~T))+b[7]+1126891415&4294967295,A=y+(v<<10&4294967295|v>>>22),v=T+(y^(A|~E))+b[14]+2878612391&4294967295,T=A+(v<<15&4294967295|v>>>17),v=E+(A^(T|~y))+b[5]+4237533241&4294967295,E=T+(v<<21&4294967295|v>>>11),v=y+(T^(E|~A))+b[12]+1700485571&4294967295,y=E+(v<<6&4294967295|v>>>26),v=A+(E^(y|~T))+b[3]+2399980690&4294967295,A=y+(v<<10&4294967295|v>>>22),v=T+(y^(A|~E))+b[10]+4293915773&4294967295,T=A+(v<<15&4294967295|v>>>17),v=E+(A^(T|~y))+b[1]+2240044497&4294967295,E=T+(v<<21&4294967295|v>>>11),v=y+(T^(E|~A))+b[8]+1873313359&4294967295,y=E+(v<<6&4294967295|v>>>26),v=A+(E^(y|~T))+b[15]+4264355552&4294967295,A=y+(v<<10&4294967295|v>>>22),v=T+(y^(A|~E))+b[6]+2734768916&4294967295,T=A+(v<<15&4294967295|v>>>17),v=E+(A^(T|~y))+b[13]+1309151649&4294967295,E=T+(v<<21&4294967295|v>>>11),v=y+(T^(E|~A))+b[4]+4149444226&4294967295,y=E+(v<<6&4294967295|v>>>26),v=A+(E^(y|~T))+b[11]+3174756917&4294967295,A=y+(v<<10&4294967295|v>>>22),v=T+(y^(A|~E))+b[2]+718787259&4294967295,T=A+(v<<15&4294967295|v>>>17),v=E+(A^(T|~y))+b[9]+3951481745&4294967295,_.g[0]=_.g[0]+y&4294967295,_.g[1]=_.g[1]+(T+(v<<21&4294967295|v>>>11))&4294967295,_.g[2]=_.g[2]+T&4294967295,_.g[3]=_.g[3]+A&4294967295}r.prototype.v=function(_,y){y===void 0&&(y=_.length);const E=y-this.blockSize,b=this.C;let T=this.h,A=0;for(;A<y;){if(T==0)for(;A<=E;)s(this,_,A),A+=this.blockSize;if(typeof _=="string"){for(;A<y;)if(b[T++]=_.charCodeAt(A++),T==this.blockSize){s(this,b),T=0;break}}else for(;A<y;)if(b[T++]=_[A++],T==this.blockSize){s(this,b),T=0;break}}this.h=T,this.o+=y},r.prototype.A=function(){var _=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);_[0]=128;for(var y=1;y<_.length-8;++y)_[y]=0;y=this.o*8;for(var E=_.length-8;E<_.length;++E)_[E]=y&255,y/=256;for(this.v(_),_=Array(16),y=0,E=0;E<4;++E)for(let b=0;b<32;b+=8)_[y++]=this.g[E]>>>b&255;return _};function i(_,y){var E=c;return Object.prototype.hasOwnProperty.call(E,_)?E[_]:E[_]=y(_)}function a(_,y){this.h=y;const E=[];let b=!0;for(let T=_.length-1;T>=0;T--){const A=_[T]|0;b&&A==y||(E[T]=A,b=!1)}this.g=E}var c={};function u(_){return-128<=_&&_<128?i(_,function(y){return new a([y|0],y<0?-1:0)}):new a([_|0],_<0?-1:0)}function d(_){if(isNaN(_)||!isFinite(_))return g;if(_<0)return S(d(-_));const y=[];let E=1;for(let b=0;_>=E;b++)y[b]=_/E|0,E*=4294967296;return new a(y,0)}function f(_,y){if(_.length==0)throw Error("number format error: empty string");if(y=y||10,y<2||36<y)throw Error("radix out of range: "+y);if(_.charAt(0)=="-")return S(f(_.substring(1),y));if(_.indexOf("-")>=0)throw Error('number format error: interior "-" character');const E=d(Math.pow(y,8));let b=g;for(let A=0;A<_.length;A+=8){var T=Math.min(8,_.length-A);const v=parseInt(_.substring(A,A+T),y);T<8?(T=d(Math.pow(y,T)),b=b.j(T).add(d(v))):(b=b.j(E),b=b.add(d(v)))}return b}var g=u(0),w=u(1),C=u(16777216);n=a.prototype,n.m=function(){if(O(this))return-S(this).m();let _=0,y=1;for(let E=0;E<this.g.length;E++){const b=this.i(E);_+=(b>=0?b:4294967296+b)*y,y*=4294967296}return _},n.toString=function(_){if(_=_||10,_<2||36<_)throw Error("radix out of range: "+_);if(M(this))return"0";if(O(this))return"-"+S(this).toString(_);const y=d(Math.pow(_,6));var E=this;let b="";for(;;){const T=Y(E,y).g;E=P(E,T.j(y));let A=((E.g.length>0?E.g[0]:E.h)>>>0).toString(_);if(E=T,M(E))return A+b;for(;A.length<6;)A="0"+A;b=A+b}},n.i=function(_){return _<0?0:_<this.g.length?this.g[_]:this.h};function M(_){if(_.h!=0)return!1;for(let y=0;y<_.g.length;y++)if(_.g[y]!=0)return!1;return!0}function O(_){return _.h==-1}n.l=function(_){return _=P(this,_),O(_)?-1:M(_)?0:1};function S(_){const y=_.g.length,E=[];for(let b=0;b<y;b++)E[b]=~_.g[b];return new a(E,~_.h).add(w)}n.abs=function(){return O(this)?S(this):this},n.add=function(_){const y=Math.max(this.g.length,_.g.length),E=[];let b=0;for(let T=0;T<=y;T++){let A=b+(this.i(T)&65535)+(_.i(T)&65535),v=(A>>>16)+(this.i(T)>>>16)+(_.i(T)>>>16);b=v>>>16,A&=65535,v&=65535,E[T]=v<<16|A}return new a(E,E[E.length-1]&-2147483648?-1:0)};function P(_,y){return _.add(S(y))}n.j=function(_){if(M(this)||M(_))return g;if(O(this))return O(_)?S(this).j(S(_)):S(S(this).j(_));if(O(_))return S(this.j(S(_)));if(this.l(C)<0&&_.l(C)<0)return d(this.m()*_.m());const y=this.g.length+_.g.length,E=[];for(var b=0;b<2*y;b++)E[b]=0;for(b=0;b<this.g.length;b++)for(let T=0;T<_.g.length;T++){const A=this.i(b)>>>16,v=this.i(b)&65535,Oe=_.i(T)>>>16,zt=_.i(T)&65535;E[2*b+2*T]+=v*zt,F(E,2*b+2*T),E[2*b+2*T+1]+=A*zt,F(E,2*b+2*T+1),E[2*b+2*T+1]+=v*Oe,F(E,2*b+2*T+1),E[2*b+2*T+2]+=A*Oe,F(E,2*b+2*T+2)}for(_=0;_<y;_++)E[_]=E[2*_+1]<<16|E[2*_];for(_=y;_<2*y;_++)E[_]=0;return new a(E,0)};function F(_,y){for(;(_[y]&65535)!=_[y];)_[y+1]+=_[y]>>>16,_[y]&=65535,y++}function q(_,y){this.g=_,this.h=y}function Y(_,y){if(M(y))throw Error("division by zero");if(M(_))return new q(g,g);if(O(_))return y=Y(S(_),y),new q(S(y.g),S(y.h));if(O(y))return y=Y(_,S(y)),new q(S(y.g),y.h);if(_.g.length>30){if(O(_)||O(y))throw Error("slowDivide_ only works with positive integers.");for(var E=w,b=y;b.l(_)<=0;)E=L(E),b=L(b);var T=V(E,1),A=V(b,1);for(b=V(b,2),E=V(E,2);!M(b);){var v=A.add(b);v.l(_)<=0&&(T=T.add(E),A=v),b=V(b,1),E=V(E,1)}return y=P(_,T.j(y)),new q(T,y)}for(T=g;_.l(y)>=0;){for(E=Math.max(1,Math.floor(_.m()/y.m())),b=Math.ceil(Math.log(E)/Math.LN2),b=b<=48?1:Math.pow(2,b-48),A=d(E),v=A.j(y);O(v)||v.l(_)>0;)E-=b,A=d(E),v=A.j(y);M(A)&&(A=w),T=T.add(A),_=P(_,v)}return new q(T,_)}n.B=function(_){return Y(this,_).h},n.and=function(_){const y=Math.max(this.g.length,_.g.length),E=[];for(let b=0;b<y;b++)E[b]=this.i(b)&_.i(b);return new a(E,this.h&_.h)},n.or=function(_){const y=Math.max(this.g.length,_.g.length),E=[];for(let b=0;b<y;b++)E[b]=this.i(b)|_.i(b);return new a(E,this.h|_.h)},n.xor=function(_){const y=Math.max(this.g.length,_.g.length),E=[];for(let b=0;b<y;b++)E[b]=this.i(b)^_.i(b);return new a(E,this.h^_.h)};function L(_){const y=_.g.length+1,E=[];for(let b=0;b<y;b++)E[b]=_.i(b)<<1|_.i(b-1)>>>31;return new a(E,_.h)}function V(_,y){const E=y>>5;y%=32;const b=_.g.length-E,T=[];for(let A=0;A<b;A++)T[A]=y>0?_.i(A+E)>>>y|_.i(A+E+1)<<32-y:_.i(A+E);return new a(T,_.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,gu=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.B,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=d,a.fromString=f,Dt=a}).apply(typeof Mc<"u"?Mc:typeof self<"u"?self:typeof window<"u"?window:{});var as=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var yu,cr,_u,ms,ro,vu,Eu,wu;(function(){var n,e=Object.defineProperty;function t(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof as=="object"&&as];for(var l=0;l<o.length;++l){var h=o[l];if(h&&h.Math==Math)return h}throw Error("Cannot find global object")}var r=t(this);function s(o,l){if(l)e:{var h=r;o=o.split(".");for(var p=0;p<o.length-1;p++){var I=o[p];if(!(I in h))break e;h=h[I]}o=o[o.length-1],p=h[o],l=l(p),l!=p&&l!=null&&e(h,o,{configurable:!0,writable:!0,value:l})}}s("Symbol.dispose",function(o){return o||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(o){return o||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(o){return o||function(l){var h=[],p;for(p in l)Object.prototype.hasOwnProperty.call(l,p)&&h.push([p,l[p]]);return h}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var i=i||{},a=this||self;function c(o){var l=typeof o;return l=="object"&&o!=null||l=="function"}function u(o,l,h){return o.call.apply(o.bind,arguments)}function d(o,l,h){return d=u,d.apply(null,arguments)}function f(o,l){var h=Array.prototype.slice.call(arguments,1);return function(){var p=h.slice();return p.push.apply(p,arguments),o.apply(this,p)}}function g(o,l){function h(){}h.prototype=l.prototype,o.Z=l.prototype,o.prototype=new h,o.prototype.constructor=o,o.Ob=function(p,I,R){for(var N=Array(arguments.length-2),K=2;K<arguments.length;K++)N[K-2]=arguments[K];return l.prototype[I].apply(p,N)}}var w=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?o=>o&&AsyncContext.Snapshot.wrap(o):o=>o;function C(o){const l=o.length;if(l>0){const h=Array(l);for(let p=0;p<l;p++)h[p]=o[p];return h}return[]}function M(o,l){for(let p=1;p<arguments.length;p++){const I=arguments[p];var h=typeof I;if(h=h!="object"?h:I?Array.isArray(I)?"array":h:"null",h=="array"||h=="object"&&typeof I.length=="number"){h=o.length||0;const R=I.length||0;o.length=h+R;for(let N=0;N<R;N++)o[h+N]=I[N]}else o.push(I)}}class O{constructor(l,h){this.i=l,this.j=h,this.h=0,this.g=null}get(){let l;return this.h>0?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function S(o){a.setTimeout(()=>{throw o},0)}function P(){var o=_;let l=null;return o.g&&(l=o.g,o.g=o.g.next,o.g||(o.h=null),l.next=null),l}class F{constructor(){this.h=this.g=null}add(l,h){const p=q.get();p.set(l,h),this.h?this.h.next=p:this.g=p,this.h=p}}var q=new O(()=>new Y,o=>o.reset());class Y{constructor(){this.next=this.g=this.h=null}set(l,h){this.h=l,this.g=h,this.next=null}reset(){this.next=this.g=this.h=null}}let L,V=!1,_=new F,y=()=>{const o=Promise.resolve(void 0);L=()=>{o.then(E)}};function E(){for(var o;o=P();){try{o.h.call(o.g)}catch(h){S(h)}var l=q;l.j(o),l.h<100&&(l.h++,o.next=l.g,l.g=o)}V=!1}function b(){this.u=this.u,this.C=this.C}b.prototype.u=!1,b.prototype.dispose=function(){this.u||(this.u=!0,this.N())},b.prototype[Symbol.dispose]=function(){this.dispose()},b.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function T(o,l){this.type=o,this.g=this.target=l,this.defaultPrevented=!1}T.prototype.h=function(){this.defaultPrevented=!0};var A=function(){if(!a.addEventListener||!Object.defineProperty)return!1;var o=!1,l=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const h=()=>{};a.addEventListener("test",h,l),a.removeEventListener("test",h,l)}catch{}return o}();function v(o){return/^[\s\xa0]*$/.test(o)}function Oe(o,l){T.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o&&this.init(o,l)}g(Oe,T),Oe.prototype.init=function(o,l){const h=this.type=o.type,p=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;this.target=o.target||o.srcElement,this.g=l,l=o.relatedTarget,l||(h=="mouseover"?l=o.fromElement:h=="mouseout"&&(l=o.toElement)),this.relatedTarget=l,p?(this.clientX=p.clientX!==void 0?p.clientX:p.pageX,this.clientY=p.clientY!==void 0?p.clientY:p.pageY,this.screenX=p.screenX||0,this.screenY=p.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=o.pointerType,this.state=o.state,this.i=o,o.defaultPrevented&&Oe.Z.h.call(this)},Oe.prototype.h=function(){Oe.Z.h.call(this);const o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var zt="closure_listenable_"+(Math.random()*1e6|0),$h=0;function Uh(o,l,h,p,I){this.listener=o,this.proxy=null,this.src=l,this.type=h,this.capture=!!p,this.ha=I,this.key=++$h,this.da=this.fa=!1}function Gr(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function Wr(o,l,h){for(const p in o)l.call(h,o[p],p,o)}function Bh(o,l){for(const h in o)l.call(void 0,o[h],h,o)}function Ia(o){const l={};for(const h in o)l[h]=o[h];return l}const Aa="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Ca(o,l){let h,p;for(let I=1;I<arguments.length;I++){p=arguments[I];for(h in p)o[h]=p[h];for(let R=0;R<Aa.length;R++)h=Aa[R],Object.prototype.hasOwnProperty.call(p,h)&&(o[h]=p[h])}}function Kr(o){this.src=o,this.g={},this.h=0}Kr.prototype.add=function(o,l,h,p,I){const R=o.toString();o=this.g[R],o||(o=this.g[R]=[],this.h++);const N=fi(o,l,p,I);return N>-1?(l=o[N],h||(l.fa=!1)):(l=new Uh(l,this.src,R,!!p,I),l.fa=h,o.push(l)),l};function hi(o,l){const h=l.type;if(h in o.g){var p=o.g[h],I=Array.prototype.indexOf.call(p,l,void 0),R;(R=I>=0)&&Array.prototype.splice.call(p,I,1),R&&(Gr(l),o.g[h].length==0&&(delete o.g[h],o.h--))}}function fi(o,l,h,p){for(let I=0;I<o.length;++I){const R=o[I];if(!R.da&&R.listener==l&&R.capture==!!h&&R.ha==p)return I}return-1}var mi="closure_lm_"+(Math.random()*1e6|0),pi={};function Sa(o,l,h,p,I){if(Array.isArray(l)){for(let R=0;R<l.length;R++)Sa(o,l[R],h,p,I);return null}return h=xa(h),o&&o[zt]?o.J(l,h,c(p)?!!p.capture:!1,I):jh(o,l,h,!1,p,I)}function jh(o,l,h,p,I,R){if(!l)throw Error("Invalid event type");const N=c(I)?!!I.capture:!!I;let K=yi(o);if(K||(o[mi]=K=new Kr(o)),h=K.add(l,h,p,N,R),h.proxy)return h;if(p=zh(),h.proxy=p,p.src=o,p.listener=h,o.addEventListener)A||(I=N),I===void 0&&(I=!1),o.addEventListener(l.toString(),p,I);else if(o.attachEvent)o.attachEvent(Pa(l.toString()),p);else if(o.addListener&&o.removeListener)o.addListener(p);else throw Error("addEventListener and attachEvent are unavailable.");return h}function zh(){function o(h){return l.call(o.src,o.listener,h)}const l=qh;return o}function Ra(o,l,h,p,I){if(Array.isArray(l))for(var R=0;R<l.length;R++)Ra(o,l[R],h,p,I);else p=c(p)?!!p.capture:!!p,h=xa(h),o&&o[zt]?(o=o.i,R=String(l).toString(),R in o.g&&(l=o.g[R],h=fi(l,h,p,I),h>-1&&(Gr(l[h]),Array.prototype.splice.call(l,h,1),l.length==0&&(delete o.g[R],o.h--)))):o&&(o=yi(o))&&(l=o.g[l.toString()],o=-1,l&&(o=fi(l,h,p,I)),(h=o>-1?l[o]:null)&&gi(h))}function gi(o){if(typeof o!="number"&&o&&!o.da){var l=o.src;if(l&&l[zt])hi(l.i,o);else{var h=o.type,p=o.proxy;l.removeEventListener?l.removeEventListener(h,p,o.capture):l.detachEvent?l.detachEvent(Pa(h),p):l.addListener&&l.removeListener&&l.removeListener(p),(h=yi(l))?(hi(h,o),h.h==0&&(h.src=null,l[mi]=null)):Gr(o)}}}function Pa(o){return o in pi?pi[o]:pi[o]="on"+o}function qh(o,l){if(o.da)o=!0;else{l=new Oe(l,this);const h=o.listener,p=o.ha||o.src;o.fa&&gi(o),o=h.call(p,l)}return o}function yi(o){return o=o[mi],o instanceof Kr?o:null}var _i="__closure_events_fn_"+(Math.random()*1e9>>>0);function xa(o){return typeof o=="function"?o:(o[_i]||(o[_i]=function(l){return o.handleEvent(l)}),o[_i])}function Ce(){b.call(this),this.i=new Kr(this),this.M=this,this.G=null}g(Ce,b),Ce.prototype[zt]=!0,Ce.prototype.removeEventListener=function(o,l,h,p){Ra(this,o,l,h,p)};function De(o,l){var h,p=o.G;if(p)for(h=[];p;p=p.G)h.push(p);if(o=o.M,p=l.type||l,typeof l=="string")l=new T(l,o);else if(l instanceof T)l.target=l.target||o;else{var I=l;l=new T(p,o),Ca(l,I)}I=!0;let R,N;if(h)for(N=h.length-1;N>=0;N--)R=l.g=h[N],I=Yr(R,p,!0,l)&&I;if(R=l.g=o,I=Yr(R,p,!0,l)&&I,I=Yr(R,p,!1,l)&&I,h)for(N=0;N<h.length;N++)R=l.g=h[N],I=Yr(R,p,!1,l)&&I}Ce.prototype.N=function(){if(Ce.Z.N.call(this),this.i){var o=this.i;for(const l in o.g){const h=o.g[l];for(let p=0;p<h.length;p++)Gr(h[p]);delete o.g[l],o.h--}}this.G=null},Ce.prototype.J=function(o,l,h,p){return this.i.add(String(o),l,!1,h,p)},Ce.prototype.K=function(o,l,h,p){return this.i.add(String(o),l,!0,h,p)};function Yr(o,l,h,p){if(l=o.i.g[String(l)],!l)return!0;l=l.concat();let I=!0;for(let R=0;R<l.length;++R){const N=l[R];if(N&&!N.da&&N.capture==h){const K=N.listener,ge=N.ha||N.src;N.fa&&hi(o.i,N),I=K.call(ge,p)!==!1&&I}}return I&&!p.defaultPrevented}function Hh(o,l){if(typeof o!="function")if(o&&typeof o.handleEvent=="function")o=d(o.handleEvent,o);else throw Error("Invalid listener argument");return Number(l)>2147483647?-1:a.setTimeout(o,l||0)}function ka(o){o.g=Hh(()=>{o.g=null,o.i&&(o.i=!1,ka(o))},o.l);const l=o.h;o.h=null,o.m.apply(null,l)}class Gh extends b{constructor(l,h){super(),this.m=l,this.l=h,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:ka(this)}N(){super.N(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Bn(o){b.call(this),this.h=o,this.g={}}g(Bn,b);var Da=[];function Va(o){Wr(o.g,function(l,h){this.g.hasOwnProperty(h)&&gi(l)},o),o.g={}}Bn.prototype.N=function(){Bn.Z.N.call(this),Va(this)},Bn.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var vi=a.JSON.stringify,Wh=a.JSON.parse,Kh=class{stringify(o){return a.JSON.stringify(o,void 0)}parse(o){return a.JSON.parse(o,void 0)}};function La(){}function Ma(){}var jn={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function Ei(){T.call(this,"d")}g(Ei,T);function wi(){T.call(this,"c")}g(wi,T);var qt={},Na=null;function Qr(){return Na=Na||new Ce}qt.Ia="serverreachability";function Oa(o){T.call(this,qt.Ia,o)}g(Oa,T);function zn(o){const l=Qr();De(l,new Oa(l))}qt.STAT_EVENT="statevent";function Fa(o,l){T.call(this,qt.STAT_EVENT,o),this.stat=l}g(Fa,T);function Ve(o){const l=Qr();De(l,new Fa(l,o))}qt.Ja="timingevent";function $a(o,l){T.call(this,qt.Ja,o),this.size=l}g($a,T);function qn(o,l){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return a.setTimeout(function(){o()},l)}function Hn(){this.g=!0}Hn.prototype.ua=function(){this.g=!1};function Yh(o,l,h,p,I,R){o.info(function(){if(o.g)if(R){var N="",K=R.split("&");for(let se=0;se<K.length;se++){var ge=K[se].split("=");if(ge.length>1){const we=ge[0];ge=ge[1];const Ke=we.split("_");N=Ke.length>=2&&Ke[1]=="type"?N+(we+"="+ge+"&"):N+(we+"=redacted&")}}}else N=null;else N=R;return"XMLHTTP REQ ("+p+") [attempt "+I+"]: "+l+`
`+h+`
`+N})}function Qh(o,l,h,p,I,R,N){o.info(function(){return"XMLHTTP RESP ("+p+") [ attempt "+I+"]: "+l+`
`+h+`
`+R+" "+N})}function fn(o,l,h,p){o.info(function(){return"XMLHTTP TEXT ("+l+"): "+Xh(o,h)+(p?" "+p:"")})}function Jh(o,l){o.info(function(){return"TIMEOUT: "+l})}Hn.prototype.info=function(){};function Xh(o,l){if(!o.g)return l;if(!l)return null;try{const R=JSON.parse(l);if(R){for(o=0;o<R.length;o++)if(Array.isArray(R[o])){var h=R[o];if(!(h.length<2)){var p=h[1];if(Array.isArray(p)&&!(p.length<1)){var I=p[0];if(I!="noop"&&I!="stop"&&I!="close")for(let N=1;N<p.length;N++)p[N]=""}}}}return vi(R)}catch{return l}}var Jr={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},Ua={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},Ba;function Ti(){}g(Ti,La),Ti.prototype.g=function(){return new XMLHttpRequest},Ba=new Ti;function Gn(o){return encodeURIComponent(String(o))}function Zh(o){var l=1;o=o.split(":");const h=[];for(;l>0&&o.length;)h.push(o.shift()),l--;return o.length&&h.push(o.join(":")),h}function _t(o,l,h,p){this.j=o,this.i=l,this.l=h,this.S=p||1,this.V=new Bn(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new ja}function ja(){this.i=null,this.g="",this.h=!1}var za={},bi={};function Ii(o,l,h){o.M=1,o.A=Zr(We(l)),o.u=h,o.R=!0,qa(o,null)}function qa(o,l){o.F=Date.now(),Xr(o),o.B=We(o.A);var h=o.B,p=o.S;Array.isArray(p)||(p=[String(p)]),rc(h.i,"t",p),o.C=0,h=o.j.L,o.h=new ja,o.g=wc(o.j,h?l:null,!o.u),o.P>0&&(o.O=new Gh(d(o.Y,o,o.g),o.P)),l=o.V,h=o.g,p=o.ba;var I="readystatechange";Array.isArray(I)||(I&&(Da[0]=I.toString()),I=Da);for(let R=0;R<I.length;R++){const N=Sa(h,I[R],p||l.handleEvent,!1,l.h||l);if(!N)break;l.g[N.key]=N}l=o.J?Ia(o.J):{},o.u?(o.v||(o.v="POST"),l["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.B,o.v,o.u,l)):(o.v="GET",o.g.ea(o.B,o.v,null,l)),zn(),Yh(o.i,o.v,o.B,o.l,o.S,o.u)}_t.prototype.ba=function(o){o=o.target;const l=this.O;l&&wt(o)==3?l.j():this.Y(o)},_t.prototype.Y=function(o){try{if(o==this.g)e:{const K=wt(this.g),ge=this.g.ya(),se=this.g.ca();if(!(K<3)&&(K!=3||this.g&&(this.h.h||this.g.la()||uc(this.g)))){this.K||K!=4||ge==7||(ge==8||se<=0?zn(3):zn(2)),Ai(this);var l=this.g.ca();this.X=l;var h=ef(this);if(this.o=l==200,Qh(this.i,this.v,this.B,this.l,this.S,K,l),this.o){if(this.U&&!this.L){t:{if(this.g){var p,I=this.g;if((p=I.g?I.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!v(p)){var R=p;break t}}R=null}if(o=R)fn(this.i,this.l,o,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,Ci(this,o);else{this.o=!1,this.m=3,Ve(12),Ht(this),Wn(this);break e}}if(this.R){o=!0;let we;for(;!this.K&&this.C<h.length;)if(we=tf(this,h),we==bi){K==4&&(this.m=4,Ve(14),o=!1),fn(this.i,this.l,null,"[Incomplete Response]");break}else if(we==za){this.m=4,Ve(15),fn(this.i,this.l,h,"[Invalid Chunk]"),o=!1;break}else fn(this.i,this.l,we,null),Ci(this,we);if(Ha(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),K!=4||h.length!=0||this.h.h||(this.m=1,Ve(16),o=!1),this.o=this.o&&o,!o)fn(this.i,this.l,h,"[Invalid Chunked Response]"),Ht(this),Wn(this);else if(h.length>0&&!this.W){this.W=!0;var N=this.j;N.g==this&&N.aa&&!N.P&&(N.j.info("Great, no buffering proxy detected. Bytes received: "+h.length),Li(N),N.P=!0,Ve(11))}}else fn(this.i,this.l,h,null),Ci(this,h);K==4&&Ht(this),this.o&&!this.K&&(K==4?yc(this.j,this):(this.o=!1,Xr(this)))}else gf(this.g),l==400&&h.indexOf("Unknown SID")>0?(this.m=3,Ve(12)):(this.m=0,Ve(13)),Ht(this),Wn(this)}}}catch{}finally{}};function ef(o){if(!Ha(o))return o.g.la();const l=uc(o.g);if(l==="")return"";let h="";const p=l.length,I=wt(o.g)==4;if(!o.h.i){if(typeof TextDecoder>"u")return Ht(o),Wn(o),"";o.h.i=new a.TextDecoder}for(let R=0;R<p;R++)o.h.h=!0,h+=o.h.i.decode(l[R],{stream:!(I&&R==p-1)});return l.length=0,o.h.g+=h,o.C=0,o.h.g}function Ha(o){return o.g?o.v=="GET"&&o.M!=2&&o.j.Aa:!1}function tf(o,l){var h=o.C,p=l.indexOf(`
`,h);return p==-1?bi:(h=Number(l.substring(h,p)),isNaN(h)?za:(p+=1,p+h>l.length?bi:(l=l.slice(p,p+h),o.C=p+h,l)))}_t.prototype.cancel=function(){this.K=!0,Ht(this)};function Xr(o){o.T=Date.now()+o.H,Ga(o,o.H)}function Ga(o,l){if(o.D!=null)throw Error("WatchDog timer not null");o.D=qn(d(o.aa,o),l)}function Ai(o){o.D&&(a.clearTimeout(o.D),o.D=null)}_t.prototype.aa=function(){this.D=null;const o=Date.now();o-this.T>=0?(Jh(this.i,this.B),this.M!=2&&(zn(),Ve(17)),Ht(this),this.m=2,Wn(this)):Ga(this,this.T-o)};function Wn(o){o.j.I==0||o.K||yc(o.j,o)}function Ht(o){Ai(o);var l=o.O;l&&typeof l.dispose=="function"&&l.dispose(),o.O=null,Va(o.V),o.g&&(l=o.g,o.g=null,l.abort(),l.dispose())}function Ci(o,l){try{var h=o.j;if(h.I!=0&&(h.g==o||Si(h.h,o))){if(!o.L&&Si(h.h,o)&&h.I==3){try{var p=h.Ba.g.parse(l)}catch{p=null}if(Array.isArray(p)&&p.length==3){var I=p;if(I[0]==0){e:if(!h.v){if(h.g)if(h.g.F+3e3<o.F)ss(h),ns(h);else break e;Vi(h),Ve(18)}}else h.xa=I[1],0<h.xa-h.K&&I[2]<37500&&h.F&&h.A==0&&!h.C&&(h.C=qn(d(h.Va,h),6e3));Ya(h.h)<=1&&h.ta&&(h.ta=void 0)}else Wt(h,11)}else if((o.L||h.g==o)&&ss(h),!v(l))for(I=h.Ba.g.parse(l),l=0;l<I.length;l++){let se=I[l];const we=se[0];if(!(we<=h.K))if(h.K=we,se=se[1],h.I==2)if(se[0]=="c"){h.M=se[1],h.ba=se[2];const Ke=se[3];Ke!=null&&(h.ka=Ke,h.j.info("VER="+h.ka));const Kt=se[4];Kt!=null&&(h.za=Kt,h.j.info("SVER="+h.za));const Tt=se[5];Tt!=null&&typeof Tt=="number"&&Tt>0&&(p=1.5*Tt,h.O=p,h.j.info("backChannelRequestTimeoutMs_="+p)),p=h;const bt=o.g;if(bt){const os=bt.g?bt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(os){var R=p.h;R.g||os.indexOf("spdy")==-1&&os.indexOf("quic")==-1&&os.indexOf("h2")==-1||(R.j=R.l,R.g=new Set,R.h&&(Ri(R,R.h),R.h=null))}if(p.G){const Mi=bt.g?bt.g.getResponseHeader("X-HTTP-Session-Id"):null;Mi&&(p.wa=Mi,ie(p.J,p.G,Mi))}}h.I=3,h.l&&h.l.ra(),h.aa&&(h.T=Date.now()-o.F,h.j.info("Handshake RTT: "+h.T+"ms")),p=h;var N=o;if(p.na=Ec(p,p.L?p.ba:null,p.W),N.L){Qa(p.h,N);var K=N,ge=p.O;ge&&(K.H=ge),K.D&&(Ai(K),Xr(K)),p.g=N}else pc(p);h.i.length>0&&rs(h)}else se[0]!="stop"&&se[0]!="close"||Wt(h,7);else h.I==3&&(se[0]=="stop"||se[0]=="close"?se[0]=="stop"?Wt(h,7):Di(h):se[0]!="noop"&&h.l&&h.l.qa(se),h.A=0)}}zn(4)}catch{}}var nf=class{constructor(o,l){this.g=o,this.map=l}};function Wa(o){this.l=o||10,a.PerformanceNavigationTiming?(o=a.performance.getEntriesByType("navigation"),o=o.length>0&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(a.chrome&&a.chrome.loadTimes&&a.chrome.loadTimes()&&a.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function Ka(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function Ya(o){return o.h?1:o.g?o.g.size:0}function Si(o,l){return o.h?o.h==l:o.g?o.g.has(l):!1}function Ri(o,l){o.g?o.g.add(l):o.h=l}function Qa(o,l){o.h&&o.h==l?o.h=null:o.g&&o.g.has(l)&&o.g.delete(l)}Wa.prototype.cancel=function(){if(this.i=Ja(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function Ja(o){if(o.h!=null)return o.i.concat(o.h.G);if(o.g!=null&&o.g.size!==0){let l=o.i;for(const h of o.g.values())l=l.concat(h.G);return l}return C(o.i)}var Xa=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function rf(o,l){if(o){o=o.split("&");for(let h=0;h<o.length;h++){const p=o[h].indexOf("=");let I,R=null;p>=0?(I=o[h].substring(0,p),R=o[h].substring(p+1)):I=o[h],l(I,R?decodeURIComponent(R.replace(/\+/g," ")):"")}}}function vt(o){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let l;o instanceof vt?(this.l=o.l,Kn(this,o.j),this.o=o.o,this.g=o.g,Yn(this,o.u),this.h=o.h,Pi(this,sc(o.i)),this.m=o.m):o&&(l=String(o).match(Xa))?(this.l=!1,Kn(this,l[1]||"",!0),this.o=Qn(l[2]||""),this.g=Qn(l[3]||"",!0),Yn(this,l[4]),this.h=Qn(l[5]||"",!0),Pi(this,l[6]||"",!0),this.m=Qn(l[7]||"")):(this.l=!1,this.i=new Xn(null,this.l))}vt.prototype.toString=function(){const o=[];var l=this.j;l&&o.push(Jn(l,Za,!0),":");var h=this.g;return(h||l=="file")&&(o.push("//"),(l=this.o)&&o.push(Jn(l,Za,!0),"@"),o.push(Gn(h).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),h=this.u,h!=null&&o.push(":",String(h))),(h=this.h)&&(this.g&&h.charAt(0)!="/"&&o.push("/"),o.push(Jn(h,h.charAt(0)=="/"?af:of,!0))),(h=this.i.toString())&&o.push("?",h),(h=this.m)&&o.push("#",Jn(h,lf)),o.join("")},vt.prototype.resolve=function(o){const l=We(this);let h=!!o.j;h?Kn(l,o.j):h=!!o.o,h?l.o=o.o:h=!!o.g,h?l.g=o.g:h=o.u!=null;var p=o.h;if(h)Yn(l,o.u);else if(h=!!o.h){if(p.charAt(0)!="/")if(this.g&&!this.h)p="/"+p;else{var I=l.h.lastIndexOf("/");I!=-1&&(p=l.h.slice(0,I+1)+p)}if(I=p,I==".."||I==".")p="";else if(I.indexOf("./")!=-1||I.indexOf("/.")!=-1){p=I.lastIndexOf("/",0)==0,I=I.split("/");const R=[];for(let N=0;N<I.length;){const K=I[N++];K=="."?p&&N==I.length&&R.push(""):K==".."?((R.length>1||R.length==1&&R[0]!="")&&R.pop(),p&&N==I.length&&R.push("")):(R.push(K),p=!0)}p=R.join("/")}else p=I}return h?l.h=p:h=o.i.toString()!=="",h?Pi(l,sc(o.i)):h=!!o.m,h&&(l.m=o.m),l};function We(o){return new vt(o)}function Kn(o,l,h){o.j=h?Qn(l,!0):l,o.j&&(o.j=o.j.replace(/:$/,""))}function Yn(o,l){if(l){if(l=Number(l),isNaN(l)||l<0)throw Error("Bad port number "+l);o.u=l}else o.u=null}function Pi(o,l,h){l instanceof Xn?(o.i=l,uf(o.i,o.l)):(h||(l=Jn(l,cf)),o.i=new Xn(l,o.l))}function ie(o,l,h){o.i.set(l,h)}function Zr(o){return ie(o,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),o}function Qn(o,l){return o?l?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function Jn(o,l,h){return typeof o=="string"?(o=encodeURI(o).replace(l,sf),h&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function sf(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var Za=/[#\/\?@]/g,of=/[#\?:]/g,af=/[#\?]/g,cf=/[#\?@]/g,lf=/#/g;function Xn(o,l){this.h=this.g=null,this.i=o||null,this.j=!!l}function Gt(o){o.g||(o.g=new Map,o.h=0,o.i&&rf(o.i,function(l,h){o.add(decodeURIComponent(l.replace(/\+/g," ")),h)}))}n=Xn.prototype,n.add=function(o,l){Gt(this),this.i=null,o=mn(this,o);let h=this.g.get(o);return h||this.g.set(o,h=[]),h.push(l),this.h+=1,this};function ec(o,l){Gt(o),l=mn(o,l),o.g.has(l)&&(o.i=null,o.h-=o.g.get(l).length,o.g.delete(l))}function tc(o,l){return Gt(o),l=mn(o,l),o.g.has(l)}n.forEach=function(o,l){Gt(this),this.g.forEach(function(h,p){h.forEach(function(I){o.call(l,I,p,this)},this)},this)};function nc(o,l){Gt(o);let h=[];if(typeof l=="string")tc(o,l)&&(h=h.concat(o.g.get(mn(o,l))));else for(o=Array.from(o.g.values()),l=0;l<o.length;l++)h=h.concat(o[l]);return h}n.set=function(o,l){return Gt(this),this.i=null,o=mn(this,o),tc(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[l]),this.h+=1,this},n.get=function(o,l){return o?(o=nc(this,o),o.length>0?String(o[0]):l):l};function rc(o,l,h){ec(o,l),h.length>0&&(o.i=null,o.g.set(mn(o,l),C(h)),o.h+=h.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],l=Array.from(this.g.keys());for(let p=0;p<l.length;p++){var h=l[p];const I=Gn(h);h=nc(this,h);for(let R=0;R<h.length;R++){let N=I;h[R]!==""&&(N+="="+Gn(h[R])),o.push(N)}}return this.i=o.join("&")};function sc(o){const l=new Xn;return l.i=o.i,o.g&&(l.g=new Map(o.g),l.h=o.h),l}function mn(o,l){return l=String(l),o.j&&(l=l.toLowerCase()),l}function uf(o,l){l&&!o.j&&(Gt(o),o.i=null,o.g.forEach(function(h,p){const I=p.toLowerCase();p!=I&&(ec(this,p),rc(this,I,h))},o)),o.j=l}function df(o,l){const h=new Hn;if(a.Image){const p=new Image;p.onload=f(Et,h,"TestLoadImage: loaded",!0,l,p),p.onerror=f(Et,h,"TestLoadImage: error",!1,l,p),p.onabort=f(Et,h,"TestLoadImage: abort",!1,l,p),p.ontimeout=f(Et,h,"TestLoadImage: timeout",!1,l,p),a.setTimeout(function(){p.ontimeout&&p.ontimeout()},1e4),p.src=o}else l(!1)}function hf(o,l){const h=new Hn,p=new AbortController,I=setTimeout(()=>{p.abort(),Et(h,"TestPingServer: timeout",!1,l)},1e4);fetch(o,{signal:p.signal}).then(R=>{clearTimeout(I),R.ok?Et(h,"TestPingServer: ok",!0,l):Et(h,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(I),Et(h,"TestPingServer: error",!1,l)})}function Et(o,l,h,p,I){try{I&&(I.onload=null,I.onerror=null,I.onabort=null,I.ontimeout=null),p(h)}catch{}}function ff(){this.g=new Kh}function xi(o){this.i=o.Sb||null,this.h=o.ab||!1}g(xi,La),xi.prototype.g=function(){return new es(this.i,this.h)};function es(o,l){Ce.call(this),this.H=o,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}g(es,Ce),n=es.prototype,n.open=function(o,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=o,this.D=l,this.readyState=1,er(this)},n.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const l={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};o&&(l.body=o),(this.H||a).fetch(new Request(this.D,l)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,Zn(this)),this.readyState=0},n.Pa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,er(this)),this.g&&(this.readyState=3,er(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof a.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;ic(this)}else o.text().then(this.Oa.bind(this),this.ga.bind(this))};function ic(o){o.j.read().then(o.Ma.bind(o)).catch(o.ga.bind(o))}n.Ma=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var l=o.value?o.value:new Uint8Array(0);(l=this.B.decode(l,{stream:!o.done}))&&(this.response=this.responseText+=l)}o.done?Zn(this):er(this),this.readyState==3&&ic(this)}},n.Oa=function(o){this.g&&(this.response=this.responseText=o,Zn(this))},n.Na=function(o){this.g&&(this.response=o,Zn(this))},n.ga=function(){this.g&&Zn(this)};function Zn(o){o.readyState=4,o.l=null,o.j=null,o.B=null,er(o)}n.setRequestHeader=function(o,l){this.A.append(o,l)},n.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],l=this.h.entries();for(var h=l.next();!h.done;)h=h.value,o.push(h[0]+": "+h[1]),h=l.next();return o.join(`\r
`)};function er(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(es.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function oc(o){let l="";return Wr(o,function(h,p){l+=p,l+=":",l+=h,l+=`\r
`}),l}function ki(o,l,h){e:{for(p in h){var p=!1;break e}p=!0}p||(h=oc(h),typeof o=="string"?h!=null&&Gn(h):ie(o,l,h))}function ue(o){Ce.call(this),this.headers=new Map,this.L=o||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}g(ue,Ce);var mf=/^https?$/i,pf=["POST","PUT"];n=ue.prototype,n.Fa=function(o){this.H=o},n.ea=function(o,l,h,p){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);l=l?l.toUpperCase():"GET",this.D=o,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():Ba.g(),this.g.onreadystatechange=w(d(this.Ca,this));try{this.B=!0,this.g.open(l,String(o),!0),this.B=!1}catch(R){ac(this,R);return}if(o=h||"",h=new Map(this.headers),p)if(Object.getPrototypeOf(p)===Object.prototype)for(var I in p)h.set(I,p[I]);else if(typeof p.keys=="function"&&typeof p.get=="function")for(const R of p.keys())h.set(R,p.get(R));else throw Error("Unknown input type for opt_headers: "+String(p));p=Array.from(h.keys()).find(R=>R.toLowerCase()=="content-type"),I=a.FormData&&o instanceof a.FormData,!(Array.prototype.indexOf.call(pf,l,void 0)>=0)||p||I||h.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[R,N]of h)this.g.setRequestHeader(R,N);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(o),this.v=!1}catch(R){ac(this,R)}};function ac(o,l){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=l,o.o=5,cc(o),ts(o)}function cc(o){o.A||(o.A=!0,De(o,"complete"),De(o,"error"))}n.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=o||7,De(this,"complete"),De(this,"abort"),ts(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),ts(this,!0)),ue.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?lc(this):this.Xa())},n.Xa=function(){lc(this)};function lc(o){if(o.h&&typeof i<"u"){if(o.v&&wt(o)==4)setTimeout(o.Ca.bind(o),0);else if(De(o,"readystatechange"),wt(o)==4){o.h=!1;try{const R=o.ca();e:switch(R){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break e;default:l=!1}var h;if(!(h=l)){var p;if(p=R===0){let N=String(o.D).match(Xa)[1]||null;!N&&a.self&&a.self.location&&(N=a.self.location.protocol.slice(0,-1)),p=!mf.test(N?N.toLowerCase():"")}h=p}if(h)De(o,"complete"),De(o,"success");else{o.o=6;try{var I=wt(o)>2?o.g.statusText:""}catch{I=""}o.l=I+" ["+o.ca()+"]",cc(o)}}finally{ts(o)}}}}function ts(o,l){if(o.g){o.m&&(clearTimeout(o.m),o.m=null);const h=o.g;o.g=null,l||De(o,"ready");try{h.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function wt(o){return o.g?o.g.readyState:0}n.ca=function(){try{return wt(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(o){if(this.g){var l=this.g.responseText;return o&&l.indexOf(o)==0&&(l=l.substring(o.length)),Wh(l)}};function uc(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.F){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function gf(o){const l={};o=(o.g&&wt(o)>=2&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let p=0;p<o.length;p++){if(v(o[p]))continue;var h=Zh(o[p]);const I=h[0];if(h=h[1],typeof h!="string")continue;h=h.trim();const R=l[I]||[];l[I]=R,R.push(h)}Bh(l,function(p){return p.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function tr(o,l,h){return h&&h.internalChannelParams&&h.internalChannelParams[o]||l}function dc(o){this.za=0,this.i=[],this.j=new Hn,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=tr("failFast",!1,o),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=tr("baseRetryDelayMs",5e3,o),this.Za=tr("retryDelaySeedMs",1e4,o),this.Ta=tr("forwardChannelMaxRetries",2,o),this.va=tr("forwardChannelRequestTimeoutMs",2e4,o),this.ma=o&&o.xmlHttpFactory||void 0,this.Ua=o&&o.Rb||void 0,this.Aa=o&&o.useFetchStreams||!1,this.O=void 0,this.L=o&&o.supportsCrossDomainXhr||!1,this.M="",this.h=new Wa(o&&o.concurrentRequestLimit),this.Ba=new ff,this.S=o&&o.fastHandshake||!1,this.R=o&&o.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=o&&o.Pb||!1,o&&o.ua&&this.j.ua(),o&&o.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&o&&o.detectBufferingProxy||!1,this.ia=void 0,o&&o.longPollingTimeout&&o.longPollingTimeout>0&&(this.ia=o.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=dc.prototype,n.ka=8,n.I=1,n.connect=function(o,l,h,p){Ve(0),this.W=o,this.H=l||{},h&&p!==void 0&&(this.H.OSID=h,this.H.OAID=p),this.F=this.X,this.J=Ec(this,null,this.W),rs(this)};function Di(o){if(hc(o),o.I==3){var l=o.V++,h=We(o.J);if(ie(h,"SID",o.M),ie(h,"RID",l),ie(h,"TYPE","terminate"),nr(o,h),l=new _t(o,o.j,l),l.M=2,l.A=Zr(We(h)),h=!1,a.navigator&&a.navigator.sendBeacon)try{h=a.navigator.sendBeacon(l.A.toString(),"")}catch{}!h&&a.Image&&(new Image().src=l.A,h=!0),h||(l.g=wc(l.j,null),l.g.ea(l.A)),l.F=Date.now(),Xr(l)}vc(o)}function ns(o){o.g&&(Li(o),o.g.cancel(),o.g=null)}function hc(o){ns(o),o.v&&(a.clearTimeout(o.v),o.v=null),ss(o),o.h.cancel(),o.m&&(typeof o.m=="number"&&a.clearTimeout(o.m),o.m=null)}function rs(o){if(!Ka(o.h)&&!o.m){o.m=!0;var l=o.Ea;L||y(),V||(L(),V=!0),_.add(l,o),o.D=0}}function yf(o,l){return Ya(o.h)>=o.h.j-(o.m?1:0)?!1:o.m?(o.i=l.G.concat(o.i),!0):o.I==1||o.I==2||o.D>=(o.Sa?0:o.Ta)?!1:(o.m=qn(d(o.Ea,o,l),_c(o,o.D)),o.D++,!0)}n.Ea=function(o){if(this.m)if(this.m=null,this.I==1){if(!o){this.V=Math.floor(Math.random()*1e5),o=this.V++;const I=new _t(this,this.j,o);let R=this.o;if(this.U&&(R?(R=Ia(R),Ca(R,this.U)):R=this.U),this.u!==null||this.R||(I.J=R,R=null),this.S)e:{for(var l=0,h=0;h<this.i.length;h++){t:{var p=this.i[h];if("__data__"in p.map&&(p=p.map.__data__,typeof p=="string")){p=p.length;break t}p=void 0}if(p===void 0)break;if(l+=p,l>4096){l=h;break e}if(l===4096||h===this.i.length-1){l=h+1;break e}}l=1e3}else l=1e3;l=mc(this,I,l),h=We(this.J),ie(h,"RID",o),ie(h,"CVER",22),this.G&&ie(h,"X-HTTP-Session-Id",this.G),nr(this,h),R&&(this.R?l="headers="+Gn(oc(R))+"&"+l:this.u&&ki(h,this.u,R)),Ri(this.h,I),this.Ra&&ie(h,"TYPE","init"),this.S?(ie(h,"$req",l),ie(h,"SID","null"),I.U=!0,Ii(I,h,null)):Ii(I,h,l),this.I=2}}else this.I==3&&(o?fc(this,o):this.i.length==0||Ka(this.h)||fc(this))};function fc(o,l){var h;l?h=l.l:h=o.V++;const p=We(o.J);ie(p,"SID",o.M),ie(p,"RID",h),ie(p,"AID",o.K),nr(o,p),o.u&&o.o&&ki(p,o.u,o.o),h=new _t(o,o.j,h,o.D+1),o.u===null&&(h.J=o.o),l&&(o.i=l.G.concat(o.i)),l=mc(o,h,1e3),h.H=Math.round(o.va*.5)+Math.round(o.va*.5*Math.random()),Ri(o.h,h),Ii(h,p,l)}function nr(o,l){o.H&&Wr(o.H,function(h,p){ie(l,p,h)}),o.l&&Wr({},function(h,p){ie(l,p,h)})}function mc(o,l,h){h=Math.min(o.i.length,h);const p=o.l?d(o.l.Ka,o.l,o):null;e:{var I=o.i;let K=-1;for(;;){const ge=["count="+h];K==-1?h>0?(K=I[0].g,ge.push("ofs="+K)):K=0:ge.push("ofs="+K);let se=!0;for(let we=0;we<h;we++){var R=I[we].g;const Ke=I[we].map;if(R-=K,R<0)K=Math.max(0,I[we].g-100),se=!1;else try{R="req"+R+"_"||"";try{var N=Ke instanceof Map?Ke:Object.entries(Ke);for(const[Kt,Tt]of N){let bt=Tt;c(Tt)&&(bt=vi(Tt)),ge.push(R+Kt+"="+encodeURIComponent(bt))}}catch(Kt){throw ge.push(R+"type="+encodeURIComponent("_badmap")),Kt}}catch{p&&p(Ke)}}if(se){N=ge.join("&");break e}}N=void 0}return o=o.i.splice(0,h),l.G=o,N}function pc(o){if(!o.g&&!o.v){o.Y=1;var l=o.Da;L||y(),V||(L(),V=!0),_.add(l,o),o.A=0}}function Vi(o){return o.g||o.v||o.A>=3?!1:(o.Y++,o.v=qn(d(o.Da,o),_c(o,o.A)),o.A++,!0)}n.Da=function(){if(this.v=null,gc(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var o=4*this.T;this.j.info("BP detection timer enabled: "+o),this.B=qn(d(this.Wa,this),o)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,Ve(10),ns(this),gc(this))};function Li(o){o.B!=null&&(a.clearTimeout(o.B),o.B=null)}function gc(o){o.g=new _t(o,o.j,"rpc",o.Y),o.u===null&&(o.g.J=o.o),o.g.P=0;var l=We(o.na);ie(l,"RID","rpc"),ie(l,"SID",o.M),ie(l,"AID",o.K),ie(l,"CI",o.F?"0":"1"),!o.F&&o.ia&&ie(l,"TO",o.ia),ie(l,"TYPE","xmlhttp"),nr(o,l),o.u&&o.o&&ki(l,o.u,o.o),o.O&&(o.g.H=o.O);var h=o.g;o=o.ba,h.M=1,h.A=Zr(We(l)),h.u=null,h.R=!0,qa(h,o)}n.Va=function(){this.C!=null&&(this.C=null,ns(this),Vi(this),Ve(19))};function ss(o){o.C!=null&&(a.clearTimeout(o.C),o.C=null)}function yc(o,l){var h=null;if(o.g==l){ss(o),Li(o),o.g=null;var p=2}else if(Si(o.h,l))h=l.G,Qa(o.h,l),p=1;else return;if(o.I!=0){if(l.o)if(p==1){h=l.u?l.u.length:0,l=Date.now()-l.F;var I=o.D;p=Qr(),De(p,new $a(p,h)),rs(o)}else pc(o);else if(I=l.m,I==3||I==0&&l.X>0||!(p==1&&yf(o,l)||p==2&&Vi(o)))switch(h&&h.length>0&&(l=o.h,l.i=l.i.concat(h)),I){case 1:Wt(o,5);break;case 4:Wt(o,10);break;case 3:Wt(o,6);break;default:Wt(o,2)}}}function _c(o,l){let h=o.Qa+Math.floor(Math.random()*o.Za);return o.isActive()||(h*=2),h*l}function Wt(o,l){if(o.j.info("Error code "+l),l==2){var h=d(o.bb,o),p=o.Ua;const I=!p;p=new vt(p||"//www.google.com/images/cleardot.gif"),a.location&&a.location.protocol=="http"||Kn(p,"https"),Zr(p),I?df(p.toString(),h):hf(p.toString(),h)}else Ve(2);o.I=0,o.l&&o.l.pa(l),vc(o),hc(o)}n.bb=function(o){o?(this.j.info("Successfully pinged google.com"),Ve(2)):(this.j.info("Failed to ping google.com"),Ve(1))};function vc(o){if(o.I=0,o.ja=[],o.l){const l=Ja(o.h);(l.length!=0||o.i.length!=0)&&(M(o.ja,l),M(o.ja,o.i),o.h.i.length=0,C(o.i),o.i.length=0),o.l.oa()}}function Ec(o,l,h){var p=h instanceof vt?We(h):new vt(h);if(p.g!="")l&&(p.g=l+"."+p.g),Yn(p,p.u);else{var I=a.location;p=I.protocol,l=l?l+"."+I.hostname:I.hostname,I=+I.port;const R=new vt(null);p&&Kn(R,p),l&&(R.g=l),I&&Yn(R,I),h&&(R.h=h),p=R}return h=o.G,l=o.wa,h&&l&&ie(p,h,l),ie(p,"VER",o.ka),nr(o,p),p}function wc(o,l,h){if(l&&!o.L)throw Error("Can't create secondary domain capable XhrIo object.");return l=o.Aa&&!o.ma?new ue(new xi({ab:h})):new ue(o.ma),l.Fa(o.L),l}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Tc(){}n=Tc.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function is(){}is.prototype.g=function(o,l){return new $e(o,l)};function $e(o,l){Ce.call(this),this.g=new dc(l),this.l=o,this.h=l&&l.messageUrlParams||null,o=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(o?o["X-WebChannel-Content-Type"]=l.messageContentType:o={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.sa&&(o?o["X-WebChannel-Client-Profile"]=l.sa:o={"X-WebChannel-Client-Profile":l.sa}),this.g.U=o,(o=l&&l.Qb)&&!v(o)&&(this.g.u=o),this.A=l&&l.supportsCrossDomainXhr||!1,this.v=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!v(l)&&(this.g.G=l,o=this.h,o!==null&&l in o&&(o=this.h,l in o&&delete o[l])),this.j=new pn(this)}g($e,Ce),$e.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},$e.prototype.close=function(){Di(this.g)},$e.prototype.o=function(o){var l=this.g;if(typeof o=="string"){var h={};h.__data__=o,o=h}else this.v&&(h={},h.__data__=vi(o),o=h);l.i.push(new nf(l.Ya++,o)),l.I==3&&rs(l)},$e.prototype.N=function(){this.g.l=null,delete this.j,Di(this.g),delete this.g,$e.Z.N.call(this)};function bc(o){Ei.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var l=o.__sm__;if(l){e:{for(const h in l){o=h;break e}o=void 0}(this.i=o)&&(o=this.i,l=l!==null&&o in l?l[o]:void 0),this.data=l}else this.data=o}g(bc,Ei);function Ic(){wi.call(this),this.status=1}g(Ic,wi);function pn(o){this.g=o}g(pn,Tc),pn.prototype.ra=function(){De(this.g,"a")},pn.prototype.qa=function(o){De(this.g,new bc(o))},pn.prototype.pa=function(o){De(this.g,new Ic)},pn.prototype.oa=function(){De(this.g,"b")},is.prototype.createWebChannel=is.prototype.g,$e.prototype.send=$e.prototype.o,$e.prototype.open=$e.prototype.m,$e.prototype.close=$e.prototype.close,wu=function(){return new is},Eu=function(){return Qr()},vu=qt,ro={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},Jr.NO_ERROR=0,Jr.TIMEOUT=8,Jr.HTTP_ERROR=6,ms=Jr,Ua.COMPLETE="complete",_u=Ua,Ma.EventType=jn,jn.OPEN="a",jn.CLOSE="b",jn.ERROR="c",jn.MESSAGE="d",Ce.prototype.listen=Ce.prototype.J,cr=Ma,ue.prototype.listenOnce=ue.prototype.K,ue.prototype.getLastError=ue.prototype.Ha,ue.prototype.getLastErrorCode=ue.prototype.ya,ue.prototype.getStatus=ue.prototype.ca,ue.prototype.getResponseJson=ue.prototype.La,ue.prototype.getResponseText=ue.prototype.la,ue.prototype.send=ue.prototype.ea,ue.prototype.setWithCredentials=ue.prototype.Fa,yu=ue}).apply(typeof as<"u"?as:typeof self<"u"?self:typeof window<"u"?window:{});/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pe{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Pe.UNAUTHENTICATED=new Pe(null),Pe.GOOGLE_CREDENTIALS=new Pe("google-credentials-uid"),Pe.FIRST_PARTY=new Pe("first-party-uid"),Pe.MOCK_USER=new Pe("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Nn="12.14.0";function tp(n){Nn=n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rn=new So("@firebase/firestore");function gn(){return rn.logLevel}function $(n,...e){if(rn.logLevel<=Z.DEBUG){const t=e.map(xo);rn.debug(`Firestore (${Nn}): ${n}`,...t)}}function ft(n,...e){if(rn.logLevel<=Z.ERROR){const t=e.map(xo);rn.error(`Firestore (${Nn}): ${n}`,...t)}}function sn(n,...e){if(rn.logLevel<=Z.WARN){const t=e.map(xo);rn.warn(`Firestore (${Nn}): ${n}`,...t)}}function xo(n){if(typeof n=="string")return n;try{return function(t){return JSON.stringify(t)}(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function z(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,Tu(n,r,t)}function Tu(n,e,t){let r=`FIRESTORE (${Nn}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw ft(r),new Error(r)}function re(n,e,t,r){let s="Unexpected state";typeof t=="string"?s=t:r=t,n||Tu(e,s,r)}function W(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const D={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class U extends gt{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vt{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bu{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class np{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(Pe.UNAUTHENTICATED))}shutdown(){}}class rp{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class sp{constructor(e){this.t=e,this.currentUser=Pe.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){re(this.o===void 0,42304);let r=this.i;const s=u=>this.i!==r?(r=this.i,t(u)):Promise.resolve();let i=new Vt;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Vt,e.enqueueRetryable(()=>s(this.currentUser))};const a=()=>{const u=i;e.enqueueRetryable(async()=>{await u.promise,await s(this.currentUser)})},c=u=>{$("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(u=>c(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?c(u):($("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Vt)}},0),a()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?($("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(re(typeof r.accessToken=="string",31837,{l:r}),new bu(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return re(e===null||typeof e=="string",2055,{h:e}),new Pe(e)}}class ip{constructor(e,t,r){this.P=e,this.T=t,this.I=r,this.type="FirstParty",this.user=Pe.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);const e=this.A();return e&&this.R.set("Authorization",e),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}}class op{constructor(e,t,r){this.P=e,this.T=t,this.I=r}getToken(){return Promise.resolve(new ip(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(Pe.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Nc{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class ap{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Ue(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){re(this.o===void 0,3512);const r=i=>{i.error!=null&&$("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const a=i.token!==this.m;return this.m=i.token,$("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>r(i))};const s=i=>{$("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):$("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new Nc(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(re(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new Nc(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cp(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ko{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=cp(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<t&&(r+=e.charAt(s[i]%62))}return r}}function J(n,e){return n<e?-1:n>e?1:0}function so(n,e){const t=Math.min(n.length,e.length);for(let r=0;r<t;r++){const s=n.charAt(r),i=e.charAt(r);if(s!==i)return Bi(s)===Bi(i)?J(s,i):Bi(s)?1:-1}return J(n.length,e.length)}const lp=55296,up=57343;function Bi(n){const e=n.charCodeAt(0);return e>=lp&&e<=up}function Pn(n,e,t){return n.length===e.length&&n.every((r,s)=>t(r,e[s]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Oc="__name__";class Ye{constructor(e,t,r){t===void 0?t=0:t>e.length&&z(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&z(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return Ye.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof Ye?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let s=0;s<r;s++){const i=Ye.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return J(e.length,t.length)}static compareSegments(e,t){const r=Ye.isNumericId(e),s=Ye.isNumericId(t);return r&&!s?-1:!r&&s?1:r&&s?Ye.extractNumericId(e).compare(Ye.extractNumericId(t)):so(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Dt.fromString(e.substring(4,e.length-2))}}class le extends Ye{construct(e,t,r){return new le(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new U(D.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(s=>s.length>0))}return new le(t)}static emptyPath(){return new le([])}}const dp=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Ie extends Ye{construct(e,t,r){return new Ie(e,t,r)}static isValidIdentifier(e){return dp.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Ie.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Oc}static keyField(){return new Ie([Oc])}static fromServerFormat(e){const t=[];let r="",s=0;const i=()=>{if(r.length===0)throw new U(D.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let a=!1;for(;s<e.length;){const c=e[s];if(c==="\\"){if(s+1===e.length)throw new U(D.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[s+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new U(D.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=u,s+=2}else c==="`"?(a=!a,s++):c!=="."||a?(r+=c,s++):(i(),s++)}if(i(),a)throw new U(D.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Ie(t)}static emptyPath(){return new Ie([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class B{constructor(e){this.path=e}static fromPath(e){return new B(le.fromString(e))}static fromName(e){return new B(le.fromString(e).popFirst(5))}static empty(){return new B(le.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&le.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return le.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new B(new le(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hp(n,e,t){if(!t)throw new U(D.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function fp(n,e,t,r){if(e===!0&&r===!0)throw new U(D.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function Fc(n){if(!B.isDocumentKey(n))throw new U(D.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Iu(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function Do(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":z(12329,{type:typeof n})}function Lt(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new U(D.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=Do(n);throw new U(D.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pe(n,e){const t={typeString:n};return e&&(t.value=e),t}function Lr(n,e){if(!Iu(n))throw new U(D.INVALID_ARGUMENT,"JSON must be an object");let t;for(const r in e)if(e[r]){const s=e[r].typeString,i="value"in e[r]?{value:e[r].value}:void 0;if(!(r in n)){t=`JSON missing required field: '${r}'`;break}const a=n[r];if(s&&typeof a!==s){t=`JSON field '${r}' must be a ${s}.`;break}if(i!==void 0&&a!==i.value){t=`Expected '${r}' field to equal '${i.value}'`;break}}if(t)throw new U(D.INVALID_ARGUMENT,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $c=-62135596800,Uc=1e6;class oe{static now(){return oe.fromMillis(Date.now())}static fromDate(e){return oe.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*Uc);return new oe(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new U(D.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new U(D.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<$c)throw new U(D.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new U(D.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Uc}_compareTo(e){return this.seconds===e.seconds?J(this.nanoseconds,e.nanoseconds):J(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:oe._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Lr(e,oe._jsonSchema))return new oe(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-$c;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}oe._jsonSchemaVersion="firestore/timestamp/1.0",oe._jsonSchema={type:pe("string",oe._jsonSchemaVersion),seconds:pe("number"),nanoseconds:pe("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class H{static fromTimestamp(e){return new H(e)}static min(){return new H(new oe(0,0))}static max(){return new H(new oe(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vr=-1;function mp(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=H.fromTimestamp(r===1e9?new oe(t+1,0):new oe(t,r));return new Mt(s,B.empty(),e)}function pp(n){return new Mt(n.readTime,n.key,vr)}class Mt{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new Mt(H.min(),B.empty(),vr)}static max(){return new Mt(H.max(),B.empty(),vr)}}function gp(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=B.comparator(n.documentKey,e.documentKey),t!==0?t:J(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yp="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class _p{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function On(n){if(n.code!==D.FAILED_PRECONDITION||n.message!==yp)throw n;$("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class k{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&z(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new k((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(r,s)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof k?t:k.resolve(t)}catch(t){return k.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):k.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):k.reject(t)}static resolve(e){return new k((t,r)=>{t(e)})}static reject(e){return new k((t,r)=>{r(e)})}static waitFor(e){return new k((t,r)=>{let s=0,i=0,a=!1;e.forEach(c=>{++s,c.next(()=>{++i,a&&i===s&&t()},u=>r(u))}),a=!0,i===s&&t()})}static or(e){let t=k.resolve(!1);for(const r of e)t=t.next(s=>s?k.resolve(s):r());return t}static forEach(e,t){const r=[];return e.forEach((s,i)=>{r.push(t.call(this,s,i))}),this.waitFor(r)}static mapArray(e,t){return new k((r,s)=>{const i=e.length,a=new Array(i);let c=0;for(let u=0;u<i;u++){const d=u;t(e[d]).next(f=>{a[d]=f,++c,c===i&&r(a)},f=>s(f))}})}static doWhile(e,t){return new k((r,s)=>{const i=()=>{e()===!0?t().next(()=>{i()},s):r()};i()})}}function vp(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function Fn(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ys{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>t.writeSequenceNumber(r))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}Ys.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vo=-1;function Qs(n){return n==null}function Ps(n){return n===0&&1/n==-1/0}function Ep(n){return typeof n=="number"&&Number.isInteger(n)&&!Ps(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Au="";function wp(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=Bc(e)),e=Tp(n.get(t),e);return Bc(e)}function Tp(n,e){let t=e;const r=n.length;for(let s=0;s<r;s++){const i=n.charAt(s);switch(i){case"\0":t+="";break;case Au:t+="";break;default:t+=i}}return t}function Bc(n){return n+Au+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jc(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function cn(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function Cu(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ce{constructor(e,t){this.comparator=e,this.root=t||be.EMPTY}insert(e,t){return new ce(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,be.BLACK,null,null))}remove(e){return new ce(this.comparator,this.root.remove(e,this.comparator).copy(null,null,be.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){const e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new cs(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new cs(this.root,e,this.comparator,!1)}getReverseIterator(){return new cs(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new cs(this.root,e,this.comparator,!0)}}class cs{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?r(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class be{constructor(e,t,r,s,i){this.key=e,this.value=t,this.color=r??be.RED,this.left=s??be.EMPTY,this.right=i??be.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,i){return new be(e??this.key,t??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,r),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return be.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return be.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,be.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,be.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw z(43730,{key:this.key,value:this.value});if(this.right.isRed())throw z(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw z(27949);return e+(this.isRed()?0:1)}}be.EMPTY=null,be.RED=!0,be.BLACK=!1;be.EMPTY=new class{constructor(){this.size=0}get key(){throw z(57766)}get value(){throw z(16141)}get color(){throw z(16727)}get left(){throw z(29726)}get right(){throw z(36894)}copy(e,t,r,s,i){return this}insert(e,t,r){return new be(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ee{constructor(e){this.comparator=e,this.data=new ce(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new zc(this.data.getIterator())}getIteratorFrom(e){return new zc(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof Ee)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new Ee(this.comparator);return t.data=e,t}}class zc{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ze{constructor(e){this.fields=e,e.sort(Ie.comparator)}static empty(){return new ze([])}unionWith(e){let t=new Ee(Ie.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new ze(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Pn(this.fields,e.fields,(t,r)=>t.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Su extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ae{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new Su("Invalid base64 string: "+i):i}}(e);return new Ae(t)}static fromUint8Array(e){const t=function(s){let i="";for(let a=0;a<s.length;++a)i+=String.fromCharCode(s[a]);return i}(e);return new Ae(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return J(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Ae.EMPTY_BYTE_STRING=new Ae("");const bp=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Nt(n){if(re(!!n,39018),typeof n=="string"){let e=0;const t=bp.exec(n);if(re(!!t,46558,{timestamp:n}),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:he(n.seconds),nanos:he(n.nanos)}}function he(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Ot(n){return typeof n=="string"?Ae.fromBase64String(n):Ae.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ru="server_timestamp",Pu="__type__",xu="__previous_value__",ku="__local_write_time__";function Lo(n){var t,r;return((r=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[Pu])==null?void 0:r.stringValue)===Ru}function Js(n){const e=n.mapValue.fields[xu];return Lo(e)?Js(e):e}function Er(n){const e=Nt(n.mapValue.fields[ku].timestampValue);return new oe(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ip{constructor(e,t,r,s,i,a,c,u,d,f,g){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=a,this.autoDetectLongPolling=c,this.longPollingOptions=u,this.useFetchStreams=d,this.isUsingEmulator=f,this.apiKey=g}}const xs="(default)";class wr{constructor(e,t){this.projectId=e,this.database=t||xs}static empty(){return new wr("","")}get isDefaultDatabase(){return this.database===xs}isEqual(e){return e instanceof wr&&e.projectId===this.projectId&&e.database===this.database}}function Ap(n,e){if(!Object.prototype.hasOwnProperty.apply(n.options,["projectId"]))throw new U(D.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new wr(n.options.projectId,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Du="__type__",Cp="__max__",ls={mapValue:{}},Vu="__vector__",ks="value";function Ft(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Lo(n)?4:Rp(n)?9007199254740991:Sp(n)?10:11:z(28295,{value:n})}function st(n,e){if(n===e)return!0;const t=Ft(n);if(t!==Ft(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return Er(n).isEqual(Er(e));case 3:return function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const a=Nt(s.timestampValue),c=Nt(i.timestampValue);return a.seconds===c.seconds&&a.nanos===c.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(s,i){return Ot(s.bytesValue).isEqual(Ot(i.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(s,i){return he(s.geoPointValue.latitude)===he(i.geoPointValue.latitude)&&he(s.geoPointValue.longitude)===he(i.geoPointValue.longitude)}(n,e);case 2:return function(s,i){if("integerValue"in s&&"integerValue"in i)return he(s.integerValue)===he(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const a=he(s.doubleValue),c=he(i.doubleValue);return a===c?Ps(a)===Ps(c):isNaN(a)&&isNaN(c)}return!1}(n,e);case 9:return Pn(n.arrayValue.values||[],e.arrayValue.values||[],st);case 10:case 11:return function(s,i){const a=s.mapValue.fields||{},c=i.mapValue.fields||{};if(jc(a)!==jc(c))return!1;for(const u in a)if(a.hasOwnProperty(u)&&(c[u]===void 0||!st(a[u],c[u])))return!1;return!0}(n,e);default:return z(52216,{left:n})}}function Tr(n,e){return(n.values||[]).find(t=>st(t,e))!==void 0}function xn(n,e){if(n===e)return 0;const t=Ft(n),r=Ft(e);if(t!==r)return J(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return J(n.booleanValue,e.booleanValue);case 2:return function(i,a){const c=he(i.integerValue||i.doubleValue),u=he(a.integerValue||a.doubleValue);return c<u?-1:c>u?1:c===u?0:isNaN(c)?isNaN(u)?0:-1:1}(n,e);case 3:return qc(n.timestampValue,e.timestampValue);case 4:return qc(Er(n),Er(e));case 5:return so(n.stringValue,e.stringValue);case 6:return function(i,a){const c=Ot(i),u=Ot(a);return c.compareTo(u)}(n.bytesValue,e.bytesValue);case 7:return function(i,a){const c=i.split("/"),u=a.split("/");for(let d=0;d<c.length&&d<u.length;d++){const f=J(c[d],u[d]);if(f!==0)return f}return J(c.length,u.length)}(n.referenceValue,e.referenceValue);case 8:return function(i,a){const c=J(he(i.latitude),he(a.latitude));return c!==0?c:J(he(i.longitude),he(a.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return Hc(n.arrayValue,e.arrayValue);case 10:return function(i,a){var w,C,M,O;const c=i.fields||{},u=a.fields||{},d=(w=c[ks])==null?void 0:w.arrayValue,f=(C=u[ks])==null?void 0:C.arrayValue,g=J(((M=d==null?void 0:d.values)==null?void 0:M.length)||0,((O=f==null?void 0:f.values)==null?void 0:O.length)||0);return g!==0?g:Hc(d,f)}(n.mapValue,e.mapValue);case 11:return function(i,a){if(i===ls.mapValue&&a===ls.mapValue)return 0;if(i===ls.mapValue)return 1;if(a===ls.mapValue)return-1;const c=i.fields||{},u=Object.keys(c),d=a.fields||{},f=Object.keys(d);u.sort(),f.sort();for(let g=0;g<u.length&&g<f.length;++g){const w=so(u[g],f[g]);if(w!==0)return w;const C=xn(c[u[g]],d[f[g]]);if(C!==0)return C}return J(u.length,f.length)}(n.mapValue,e.mapValue);default:throw z(23264,{he:t})}}function qc(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return J(n,e);const t=Nt(n),r=Nt(e),s=J(t.seconds,r.seconds);return s!==0?s:J(t.nanos,r.nanos)}function Hc(n,e){const t=n.values||[],r=e.values||[];for(let s=0;s<t.length&&s<r.length;++s){const i=xn(t[s],r[s]);if(i)return i}return J(t.length,r.length)}function kn(n){return io(n)}function io(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const r=Nt(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return Ot(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return B.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",s=!0;for(const i of t.values||[])s?s=!1:r+=",",r+=io(i);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){const r=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const a of r)i?i=!1:s+=",",s+=`${a}:${io(t.fields[a])}`;return s+"}"}(n.mapValue):z(61005,{value:n})}function ps(n){switch(Ft(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=Js(n);return e?16+ps(e):16;case 5:return 2*n.stringValue.length;case 6:return Ot(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((s,i)=>s+ps(i),0)}(n.arrayValue);case 10:case 11:return function(r){let s=0;return cn(r.fields,(i,a)=>{s+=i.length+ps(a)}),s}(n.mapValue);default:throw z(13486,{value:n})}}function br(n){return!!n&&"integerValue"in n}function Lu(n){return br(n)||function(t){return!!t&&"doubleValue"in t}(n)}function Mo(n){return!!n&&"arrayValue"in n}function Gc(n){return!!n&&"nullValue"in n}function Wc(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function gs(n){return!!n&&"mapValue"in n}function Sp(n){var t,r;return((r=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[Du])==null?void 0:r.stringValue)===Vu}function fr(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const e={mapValue:{fields:{}}};return cn(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=fr(r)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=fr(n.arrayValue.values[t]);return e}return{...n}}function Rp(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===Cp}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Be{constructor(e){this.value=e}static empty(){return new Be({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!gs(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=fr(t)}setAll(e){let t=Ie.emptyPath(),r={},s=[];e.forEach((a,c)=>{if(!t.isImmediateParentOf(c)){const u=this.getFieldsMap(t);this.applyChanges(u,r,s),r={},s=[],t=c.popLast()}a?r[c.lastSegment()]=fr(a):s.push(c.lastSegment())});const i=this.getFieldsMap(t);this.applyChanges(i,r,s)}delete(e){const t=this.field(e.popLast());gs(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return st(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];gs(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){cn(t,(s,i)=>e[s]=i);for(const s of r)delete e[s]}clone(){return new Be(fr(this.value))}}function Mu(n){const e=[];return cn(n.fields,(t,r)=>{const s=new Ie([t]);if(gs(r)){const i=Mu(r.mapValue).fields;if(i.length===0)e.push(s);else for(const a of i)e.push(s.child(a))}else e.push(s)}),new ze(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xe{constructor(e,t,r,s,i,a,c){this.key=e,this.documentType=t,this.version=r,this.readTime=s,this.createTime=i,this.data=a,this.documentState=c}static newInvalidDocument(e){return new xe(e,0,H.min(),H.min(),H.min(),Be.empty(),0)}static newFoundDocument(e,t,r,s){return new xe(e,1,t,H.min(),r,s,0)}static newNoDocument(e,t){return new xe(e,2,t,H.min(),H.min(),Be.empty(),0)}static newUnknownDocument(e,t){return new xe(e,3,t,H.min(),H.min(),Be.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(H.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Be.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Be.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=H.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof xe&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new xe(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ds{constructor(e,t){this.position=e,this.inclusive=t}}function Kc(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){const i=e[s],a=n.position[s];if(i.field.isKeyField()?r=B.comparator(B.fromName(a.referenceValue),t.key):r=xn(a,t.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function Yc(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!st(n.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vs{constructor(e,t="asc"){this.field=e,this.dir=t}}function Pp(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nu{}class _e extends Nu{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new kp(e,t,r):t==="array-contains"?new Lp(e,r):t==="in"?new Mp(e,r):t==="not-in"?new Np(e,r):t==="array-contains-any"?new Op(e,r):new _e(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new Dp(e,r):new Vp(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(xn(t,this.value)):t!==null&&Ft(this.value)===Ft(t)&&this.matchesComparison(xn(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return z(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class it extends Nu{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new it(e,t)}matches(e){return Ou(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function Ou(n){return n.op==="and"}function Fu(n){return xp(n)&&Ou(n)}function xp(n){for(const e of n.filters)if(e instanceof it)return!1;return!0}function oo(n){if(n instanceof _e)return n.field.canonicalString()+n.op.toString()+kn(n.value);if(Fu(n))return n.filters.map(e=>oo(e)).join(",");{const e=n.filters.map(t=>oo(t)).join(",");return`${n.op}(${e})`}}function $u(n,e){return n instanceof _e?function(r,s){return s instanceof _e&&r.op===s.op&&r.field.isEqual(s.field)&&st(r.value,s.value)}(n,e):n instanceof it?function(r,s){return s instanceof it&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((i,a,c)=>i&&$u(a,s.filters[c]),!0):!1}(n,e):void z(19439)}function Uu(n){return n instanceof _e?function(t){return`${t.field.canonicalString()} ${t.op} ${kn(t.value)}`}(n):n instanceof it?function(t){return t.op.toString()+" {"+t.getFilters().map(Uu).join(" ,")+"}"}(n):"Filter"}class kp extends _e{constructor(e,t,r){super(e,t,r),this.key=B.fromName(r.referenceValue)}matches(e){const t=B.comparator(e.key,this.key);return this.matchesComparison(t)}}class Dp extends _e{constructor(e,t){super(e,"in",t),this.keys=Bu("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class Vp extends _e{constructor(e,t){super(e,"not-in",t),this.keys=Bu("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function Bu(n,e){var t;return(((t=e.arrayValue)==null?void 0:t.values)||[]).map(r=>B.fromName(r.referenceValue))}class Lp extends _e{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Mo(t)&&Tr(t.arrayValue,this.value)}}class Mp extends _e{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Tr(this.value.arrayValue,t)}}class Np extends _e{constructor(e,t){super(e,"not-in",t)}matches(e){if(Tr(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!Tr(this.value.arrayValue,t)}}class Op extends _e{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Mo(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>Tr(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fp{constructor(e,t=null,r=[],s=[],i=null,a=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=a,this.endAt=c,this.Te=null}}function Qc(n,e=null,t=[],r=[],s=null,i=null,a=null){return new Fp(n,e,t,r,s,i,a)}function No(n){const e=W(n);if(e.Te===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>oo(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(i){return i.field.canonicalString()+i.dir}(r)).join(","),Qs(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>kn(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>kn(r)).join(",")),e.Te=t}return e.Te}function Oo(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!Pp(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!$u(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Yc(n.startAt,e.startAt)&&Yc(n.endAt,e.endAt)}function ao(n){return B.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xs{constructor(e,t=null,r=[],s=[],i=null,a="F",c=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=a,this.startAt=c,this.endAt=u,this.Ie=null,this.Ee=null,this.Re=null,this.startAt,this.endAt}}function $p(n,e,t,r,s,i,a,c){return new Xs(n,e,t,r,s,i,a,c)}function Zs(n){return new Xs(n)}function Jc(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Up(n){return B.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function Bp(n){return n.collectionGroup!==null}function mr(n){const e=W(n);if(e.Ie===null){e.Ie=[];const t=new Set;for(const i of e.explicitOrderBy)e.Ie.push(i),t.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let c=new Ee(Ie.comparator);return a.filters.forEach(u=>{u.getFlattenedFilters().forEach(d=>{d.isInequality()&&(c=c.add(d.field))})}),c})(e).forEach(i=>{t.has(i.canonicalString())||i.isKeyField()||e.Ie.push(new Vs(i,r))}),t.has(Ie.keyField().canonicalString())||e.Ie.push(new Vs(Ie.keyField(),r))}return e.Ie}function Ze(n){const e=W(n);return e.Ee||(e.Ee=jp(e,mr(n))),e.Ee}function jp(n,e){if(n.limitType==="F")return Qc(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(s=>{const i=s.dir==="desc"?"asc":"desc";return new Vs(s.field,i)});const t=n.endAt?new Ds(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Ds(n.startAt.position,n.startAt.inclusive):null;return Qc(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function co(n,e,t){return new Xs(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function ei(n,e){return Oo(Ze(n),Ze(e))&&n.limitType===e.limitType}function ju(n){return`${No(Ze(n))}|lt:${n.limitType}`}function yn(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(s=>Uu(s)).join(", ")}]`),Qs(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(s=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(s)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(s=>kn(s)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(s=>kn(s)).join(",")),`Target(${r})`}(Ze(n))}; limitType=${n.limitType})`}function ti(n,e){return e.isFoundDocument()&&function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):B.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)}(n,e)&&function(r,s){for(const i of mr(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(n,e)&&function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0}(n,e)&&function(r,s){return!(r.startAt&&!function(a,c,u){const d=Kc(a,c,u);return a.inclusive?d<=0:d<0}(r.startAt,mr(r),s)||r.endAt&&!function(a,c,u){const d=Kc(a,c,u);return a.inclusive?d>=0:d>0}(r.endAt,mr(r),s))}(n,e)}function zp(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function zu(n){return(e,t)=>{let r=!1;for(const s of mr(n)){const i=qp(s,e,t);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function qp(n,e,t){const r=n.field.isKeyField()?B.comparator(e.key,t.key):function(i,a,c){const u=a.data.field(i),d=c.data.field(i);return u!==null&&d!==null?xn(u,d):z(42886)}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return z(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ln{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){cn(this.inner,(t,r)=>{for(const[s,i]of r)e(s,i)})}isEmpty(){return Cu(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hp=new ce(B.comparator);function mt(){return Hp}const qu=new ce(B.comparator);function lr(...n){let e=qu;for(const t of n)e=e.insert(t.key,t);return e}function Hu(n){let e=qu;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function Xt(){return pr()}function Gu(){return pr()}function pr(){return new ln(n=>n.toString(),(n,e)=>n.isEqual(e))}const Gp=new ce(B.comparator),Wp=new Ee(B.comparator);function X(...n){let e=Wp;for(const t of n)e=e.add(t);return e}const Kp=new Ee(J);function Yp(){return Kp}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ni(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Ps(e)?"-0":e}}function Fo(n){return{integerValue:""+n}}function Qp(n,e){return Ep(e)?Fo(e):ni(n,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ri{constructor(){this._=void 0}}function Jp(n,e,t){return n instanceof Ir?function(s,i){const a={fields:{[Pu]:{stringValue:Ru},[ku]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&Lo(i)&&(i=Js(i)),i&&(a.fields[xu]=i),{mapValue:a}}(t,e):n instanceof Ar?Ku(n,e):n instanceof Cr?Yu(n,e):n instanceof Sr?function(s,i){const a=Wu(s,i),c=Ns(a)+Ns(s.Ae);return br(a)&&br(s.Ae)?Fo(c):ni(s.serializer,c)}(n,e):n instanceof Ls?function(s,i){return Xc(s,i,Math.min)}(n,e):n instanceof Ms?function(s,i){return Xc(s,i,Math.max)}(n,e):void 0}function Xp(n,e,t){return n instanceof Ar?Ku(n,e):n instanceof Cr?Yu(n,e):t}function Wu(n,e){return n instanceof Sr?Lu(e)?e:{integerValue:0}:null}class Ir extends ri{}class Ar extends ri{constructor(e){super(),this.elements=e}}function Ku(n,e){const t=Qu(e);for(const r of n.elements)t.some(s=>st(s,r))||t.push(r);return{arrayValue:{values:t}}}class Cr extends ri{constructor(e){super(),this.elements=e}}function Yu(n,e){let t=Qu(e);for(const r of n.elements)t=t.filter(s=>!st(s,r));return{arrayValue:{values:t}}}class $o extends ri{constructor(e,t){super(),this.serializer=e,this.Ae=t}}class Sr extends $o{}class Ls extends $o{}class Ms extends $o{}function Xc(n,e,t){if(!Lu(e))return n.Ae;const r=t(Ns(e),Ns(n.Ae));return br(e)&&br(n.Ae)?Fo(r):ni(n.serializer,r)}function Ns(n){return he(n.integerValue||n.doubleValue)}function Qu(n){return Mo(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zp{constructor(e,t){this.field=e,this.transform=t}}function eg(n,e){return n.field.isEqual(e.field)&&function(r,s){return r instanceof Ar&&s instanceof Ar||r instanceof Cr&&s instanceof Cr?Pn(r.elements,s.elements,st):r instanceof Sr&&s instanceof Sr||r instanceof Ls&&s instanceof Ls||r instanceof Ms&&s instanceof Ms?st(r.Ae,s.Ae):r instanceof Ir&&s instanceof Ir}(n.transform,e.transform)}class tg{constructor(e,t){this.version=e,this.transformResults=t}}class ut{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new ut}static exists(e){return new ut(void 0,e)}static updateTime(e){return new ut(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function ys(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class si{}function Ju(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new Zu(n.key,ut.none()):new Mr(n.key,n.data,ut.none());{const t=n.data,r=Be.empty();let s=new Ee(Ie.comparator);for(let i of e.fields)if(!s.has(i)){let a=t.field(i);a===null&&i.length>1&&(i=i.popLast(),a=t.field(i)),a===null?r.delete(i):r.set(i,a),s=s.add(i)}return new un(n.key,r,new ze(s.toArray()),ut.none())}}function ng(n,e,t){n instanceof Mr?function(s,i,a){const c=s.value.clone(),u=el(s.fieldTransforms,i,a.transformResults);c.setAll(u),i.convertToFoundDocument(a.version,c).setHasCommittedMutations()}(n,e,t):n instanceof un?function(s,i,a){if(!ys(s.precondition,i))return void i.convertToUnknownDocument(a.version);const c=el(s.fieldTransforms,i,a.transformResults),u=i.data;u.setAll(Xu(s)),u.setAll(c),i.convertToFoundDocument(a.version,u).setHasCommittedMutations()}(n,e,t):function(s,i,a){i.convertToNoDocument(a.version).setHasCommittedMutations()}(0,e,t)}function gr(n,e,t,r){return n instanceof Mr?function(i,a,c,u){if(!ys(i.precondition,a))return c;const d=i.value.clone(),f=tl(i.fieldTransforms,u,a);return d.setAll(f),a.convertToFoundDocument(a.version,d).setHasLocalMutations(),null}(n,e,t,r):n instanceof un?function(i,a,c,u){if(!ys(i.precondition,a))return c;const d=tl(i.fieldTransforms,u,a),f=a.data;return f.setAll(Xu(i)),f.setAll(d),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),c===null?null:c.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(g=>g.field))}(n,e,t,r):function(i,a,c){return ys(i.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):c}(n,e,t)}function rg(n,e){let t=null;for(const r of n.fieldTransforms){const s=e.data.field(r.field),i=Wu(r.transform,s||null);i!=null&&(t===null&&(t=Be.empty()),t.set(r.field,i))}return t||null}function Zc(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&Pn(r,s,(i,a)=>eg(i,a))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class Mr extends si{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class un extends si{constructor(e,t,r,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function Xu(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}}),e}function el(n,e,t){const r=new Map;re(n.length===t.length,32656,{Ve:t.length,de:n.length});for(let s=0;s<t.length;s++){const i=n[s],a=i.transform,c=e.data.field(i.field);r.set(i.field,Xp(a,c,t[s]))}return r}function tl(n,e,t){const r=new Map;for(const s of n){const i=s.transform,a=t.data.field(s.field);r.set(s.field,Jp(i,a,e))}return r}class Zu extends si{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class sg extends si{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ig{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&ng(i,e,r[s])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=gr(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=gr(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=Gu();return this.mutations.forEach(s=>{const i=e.get(s.key),a=i.overlayedDocument;let c=this.applyToLocalView(a,i.mutatedFields);c=t.has(s.key)?null:c;const u=Ju(a,c);u!==null&&r.set(s.key,u),a.isValidDocument()||a.convertToNoDocument(H.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),X())}isEqual(e){return this.batchId===e.batchId&&Pn(this.mutations,e.mutations,(t,r)=>Zc(t,r))&&Pn(this.baseMutations,e.baseMutations,(t,r)=>Zc(t,r))}}class Uo{constructor(e,t,r,s){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=s}static from(e,t,r){re(e.mutations.length===r.length,58842,{me:e.mutations.length,fe:r.length});let s=function(){return Gp}();const i=e.mutations;for(let a=0;a<i.length;a++)s=s.insert(i[a].key,r[a].version);return new Uo(e,t,r,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class og{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ag{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var me,ee;function cg(n){switch(n){case D.OK:return z(64938);case D.CANCELLED:case D.UNKNOWN:case D.DEADLINE_EXCEEDED:case D.RESOURCE_EXHAUSTED:case D.INTERNAL:case D.UNAVAILABLE:case D.UNAUTHENTICATED:return!1;case D.INVALID_ARGUMENT:case D.NOT_FOUND:case D.ALREADY_EXISTS:case D.PERMISSION_DENIED:case D.FAILED_PRECONDITION:case D.ABORTED:case D.OUT_OF_RANGE:case D.UNIMPLEMENTED:case D.DATA_LOSS:return!0;default:return z(15467,{code:n})}}function ed(n){if(n===void 0)return ft("GRPC error has no .code"),D.UNKNOWN;switch(n){case me.OK:return D.OK;case me.CANCELLED:return D.CANCELLED;case me.UNKNOWN:return D.UNKNOWN;case me.DEADLINE_EXCEEDED:return D.DEADLINE_EXCEEDED;case me.RESOURCE_EXHAUSTED:return D.RESOURCE_EXHAUSTED;case me.INTERNAL:return D.INTERNAL;case me.UNAVAILABLE:return D.UNAVAILABLE;case me.UNAUTHENTICATED:return D.UNAUTHENTICATED;case me.INVALID_ARGUMENT:return D.INVALID_ARGUMENT;case me.NOT_FOUND:return D.NOT_FOUND;case me.ALREADY_EXISTS:return D.ALREADY_EXISTS;case me.PERMISSION_DENIED:return D.PERMISSION_DENIED;case me.FAILED_PRECONDITION:return D.FAILED_PRECONDITION;case me.ABORTED:return D.ABORTED;case me.OUT_OF_RANGE:return D.OUT_OF_RANGE;case me.UNIMPLEMENTED:return D.UNIMPLEMENTED;case me.DATA_LOSS:return D.DATA_LOSS;default:return z(39323,{code:n})}}(ee=me||(me={}))[ee.OK=0]="OK",ee[ee.CANCELLED=1]="CANCELLED",ee[ee.UNKNOWN=2]="UNKNOWN",ee[ee.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",ee[ee.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",ee[ee.NOT_FOUND=5]="NOT_FOUND",ee[ee.ALREADY_EXISTS=6]="ALREADY_EXISTS",ee[ee.PERMISSION_DENIED=7]="PERMISSION_DENIED",ee[ee.UNAUTHENTICATED=16]="UNAUTHENTICATED",ee[ee.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",ee[ee.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",ee[ee.ABORTED=10]="ABORTED",ee[ee.OUT_OF_RANGE=11]="OUT_OF_RANGE",ee[ee.UNIMPLEMENTED=12]="UNIMPLEMENTED",ee[ee.INTERNAL=13]="INTERNAL",ee[ee.UNAVAILABLE=14]="UNAVAILABLE",ee[ee.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lg(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ug=new Dt([4294967295,4294967295],0);function nl(n){const e=lg().encode(n),t=new gu;return t.update(e),new Uint8Array(t.digest())}function rl(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new Dt([t,r],0),new Dt([s,i],0)]}class Bo{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new ur(`Invalid padding: ${t}`);if(r<0)throw new ur(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new ur(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new ur(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=Dt.fromNumber(this.ge)}ye(e,t,r){let s=e.add(t.multiply(Dt.fromNumber(r)));return s.compare(ug)===1&&(s=new Dt([s.getBits(0),s.getBits(1)],0)),s.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const t=nl(e),[r,s]=rl(t);for(let i=0;i<this.hashCount;i++){const a=this.ye(r,s,i);if(!this.we(a))return!1}return!0}static create(e,t,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),a=new Bo(i,s,t);return r.forEach(c=>a.insert(c)),a}insert(e){if(this.ge===0)return;const t=nl(e),[r,s]=rl(t);for(let i=0;i<this.hashCount;i++){const a=this.ye(r,s,i);this.Se(a)}}Se(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class ur extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nr{constructor(e,t,r,s,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const s=new Map;return s.set(e,Or.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new Nr(H.min(),s,new ce(J),mt(),X())}}class Or{constructor(e,t,r,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new Or(r,t,X(),X(),X())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _s{constructor(e,t,r,s){this.be=e,this.removedTargetIds=t,this.key=r,this.De=s}}class td{constructor(e,t){this.targetId=e,this.Ce=t}}class nd{constructor(e,t,r=Ae.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=s}}class sl{constructor(e){this.targetId=e,this.ve=0,this.Fe=il(),this.Me=Ae.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=X(),t=X(),r=X();return this.Fe.forEach((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:r=r.add(s);break;default:z(38017,{changeType:i})}}),new Or(this.Me,this.xe,e,t,r)}qe(){this.Oe=!1,this.Fe=il()}Ke(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}Ue(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}$e(){this.ve+=1}We(){this.ve-=1,re(this.ve>=0,3241,{ve:this.ve,targetId:this.targetId})}Qe(){this.Oe=!0,this.xe=!0}}const rr="WatchChangeAggregator";class dg{constructor(e){this.Ge=e,this.ze=new Map,this.je=mt(),this.Je=us(),this.He=us(),this.Ze=new ce(J)}Xe(e){for(const t of e.be)e.De&&e.De.isFoundDocument()?this.Ye(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,t=>{const r=this.ze.get(t);if(r)switch(e.state){case 0:this.nt(t)&&r.Le(e.resumeToken);break;case 1:r.We(),r.Ne||r.qe(),r.Le(e.resumeToken);break;case 2:r.We(),r.Ne||this.removeTarget(t);break;case 3:this.nt(t)&&(r.Qe(),r.Le(e.resumeToken));break;case 4:this.nt(t)&&(this.rt(t),r.Le(e.resumeToken));break;default:z(56790,{state:e.state})}else $(rr,`handleTargetChange received targetChange for untracked target ID (${t}) with state (${e.state})`)})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach((r,s)=>{this.nt(s)&&t(s)})}it(e){const t=e.targetId,r=e.Ce.count,s=this.st(t);if(s){const i=s.target;if(ao(i))if(r===0){const a=new B(i.path);this.et(t,a,xe.newNoDocument(a,H.min()))}else re(r===1,20013,{expectedCount:r});else{const a=this.ot(t);if(a!==r){const c=this._t(e),u=c?this.ut(c,e,a):1;if(u!==0){this.rt(t);const d=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(t,d)}}}}}_t(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=t;let a,c;try{a=Ot(r).toUint8Array()}catch(u){if(u instanceof Su)return sn("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{c=new Bo(a,s,i)}catch(u){return sn(u instanceof ur?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return c.ge===0?null:c}ut(e,t,r){return t.Ce.count===r-this.ht(e,t.targetId)?0:2}ht(e,t){const r=this.Ge.getRemoteKeysForTarget(t);let s=0;return r.forEach(i=>{const a=this.Ge.lt(),c=`projects/${a.projectId}/databases/${a.database}/documents/${i.path.canonicalString()}`;e.mightContain(c)||(this.et(t,i,null),s++)}),s}Pt(e){const t=new Map;this.ze.forEach((i,a)=>{const c=this.st(a);if(c){if(i.current&&ao(c.target)){const u=new B(c.target.path);this.Tt(u).has(a)||this.It(a,u)||this.et(a,u,xe.newNoDocument(u,e))}i.Be&&(t.set(a,i.ke()),i.qe())}});let r=X();this.He.forEach((i,a)=>{let c=!0;a.forEachWhile(u=>{const d=this.st(u);return!d||d.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(r=r.add(i))}),this.je.forEach((i,a)=>a.setReadTime(e));const s=new Nr(e,t,this.Ze,this.je,r);return this.je=mt(),this.Je=us(),this.He=us(),this.Ze=new ce(J),s}Ye(e,t){const r=this.ze.get(e);if(!r||!this.nt(e))return void $(rr,`addDocumentToTarget received document for unknown inactive target (${e})`);const s=this.It(e,t.key)?2:0;r.Ke(t.key,s),this.je=this.je.insert(t.key,t),this.Je=this.Je.insert(t.key,this.Tt(t.key).add(e)),this.He=this.He.insert(t.key,this.Et(t.key).add(e))}et(e,t,r){const s=this.ze.get(e);s&&this.nt(e)?(this.It(e,t)?s.Ke(t,1):s.Ue(t),this.He=this.He.insert(t,this.Et(t).delete(e)),this.He=this.He.insert(t,this.Et(t).add(e)),r&&(this.je=this.je.insert(t,r))):$(rr,`removeDocumentFromTarget received document for unknown or inactive target (${e})`)}removeTarget(e){this.ze.delete(e)}ot(e){const t=this.ze.get(e);if(!t)return 0;const r=t.ke();return this.Ge.getRemoteKeysForTarget(e).size+r.addedDocuments.size-r.removedDocuments.size}$e(e){let t=this.ze.get(e);t||($(rr,`recordPendingTargetRequest set up tracking for target ID ${e}`),t=new sl(e),this.ze.set(e,t)),t.$e()}Et(e){let t=this.He.get(e);return t||(t=new Ee(J),this.He=this.He.insert(e,t)),t}Tt(e){let t=this.Je.get(e);return t||(t=new Ee(J),this.Je=this.Je.insert(e,t)),t}nt(e){const t=this.st(e)!==null;return t||$(rr,"Detected inactive target",e),t}st(e){const t=this.ze.get(e);return t===void 0||t.Ne?null:this.Ge.Rt(e)}rt(e){this.ze.set(e,new sl(e)),this.Ge.getRemoteKeysForTarget(e).forEach(t=>{this.et(e,t,null)})}It(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function us(){return new ce(B.comparator)}function il(){return new ce(B.comparator)}const hg={asc:"ASCENDING",desc:"DESCENDING"},fg={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},mg={and:"AND",or:"OR"};class pg{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function lo(n,e){return n.useProto3Json||Qs(e)?e:{value:e}}function Os(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function rd(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function gg(n,e){return Os(n,e.toTimestamp())}function et(n){return re(!!n,49232),H.fromTimestamp(function(t){const r=Nt(t);return new oe(r.seconds,r.nanos)}(n))}function jo(n,e){return uo(n,e).canonicalString()}function uo(n,e){const t=function(s){return new le(["projects",s.projectId,"databases",s.database])}(n).child("documents");return e===void 0?t:t.child(e)}function sd(n){const e=le.fromString(n);return re(ld(e),10190,{key:e.toString()}),e}function ho(n,e){return jo(n.databaseId,e.path)}function ji(n,e){const t=sd(e);if(t.get(1)!==n.databaseId.projectId)throw new U(D.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new U(D.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new B(od(t))}function id(n,e){return jo(n.databaseId,e)}function yg(n){const e=sd(n);return e.length===4?le.emptyPath():od(e)}function fo(n){return new le(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function od(n){return re(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function ol(n,e,t){return{name:ho(n,e),fields:t.value.mapValue.fields}}function _g(n,e){let t;if("targetChange"in e){e.targetChange;const r=function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:z(39313,{state:d})}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(d,f){return d.useProto3Json?(re(f===void 0||typeof f=="string",58123),Ae.fromBase64String(f||"")):(re(f===void 0||f instanceof Buffer||f instanceof Uint8Array,16193),Ae.fromUint8Array(f||new Uint8Array))}(n,e.targetChange.resumeToken),a=e.targetChange.cause,c=a&&function(d){const f=d.code===void 0?D.UNKNOWN:ed(d.code);return new U(f,d.message||"")}(a);t=new nd(r,s,i,c||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=ji(n,r.document.name),i=et(r.document.updateTime),a=r.document.createTime?et(r.document.createTime):H.min(),c=new Be({mapValue:{fields:r.document.fields}}),u=xe.newFoundDocument(s,i,a,c),d=r.targetIds||[],f=r.removedTargetIds||[];t=new _s(d,f,u.key,u)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=ji(n,r.document),i=r.readTime?et(r.readTime):H.min(),a=xe.newNoDocument(s,i),c=r.removedTargetIds||[];t=new _s([],c,a.key,a)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=ji(n,r.document),i=r.removedTargetIds||[];t=new _s([],i,s,null)}else{if(!("filter"in e))return z(11601,{At:e});{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,a=new ag(s,i),c=r.targetId;t=new td(c,a)}}return t}function vg(n,e){let t;if(e instanceof Mr)t={update:ol(n,e.key,e.value)};else if(e instanceof Zu)t={delete:ho(n,e.key)};else if(e instanceof un)t={update:ol(n,e.key,e.data),updateMask:Rg(e.fieldMask)};else{if(!(e instanceof sg))return z(16599,{Vt:e.type});t={verify:ho(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(i,a){const c=a.transform;if(c instanceof Ir)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof Ar)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof Cr)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof Sr)return{fieldPath:a.field.canonicalString(),increment:c.Ae};if(c instanceof Ls)return{fieldPath:a.field.canonicalString(),minimum:c.Ae};if(c instanceof Ms)return{fieldPath:a.field.canonicalString(),maximum:c.Ae};throw z(20930,{transform:a.transform})}(0,r))),e.precondition.isNone||(t.currentDocument=function(s,i){return i.updateTime!==void 0?{updateTime:gg(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:z(27497)}(n,e.precondition)),t}function Eg(n,e){return n&&n.length>0?(re(e!==void 0,14353),n.map(t=>function(s,i){let a=s.updateTime?et(s.updateTime):et(i);return a.isEqual(H.min())&&(a=et(i)),new tg(a,s.transformResults||[])}(t,e))):[]}function wg(n,e){return{documents:[id(n,e.path)]}}function Tg(n,e){const t={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=id(n,s);const i=function(d){if(d.length!==0)return cd(it.create(d,"and"))}(e.filters);i&&(t.structuredQuery.where=i);const a=function(d){if(d.length!==0)return d.map(f=>function(w){return{field:_n(w.field),direction:Ag(w.dir)}}(f))}(e.orderBy);a&&(t.structuredQuery.orderBy=a);const c=lo(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=function(d){return{before:d.inclusive,values:d.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(d){return{before:!d.inclusive,values:d.position}}(e.endAt)),{dt:t,parent:s}}function bg(n){let e=yg(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let s=null;if(r>0){re(r===1,65062);const f=t.from[0];f.allDescendants?s=f.collectionId:e=e.child(f.collectionId)}let i=[];t.where&&(i=function(g){const w=ad(g);return w instanceof it&&Fu(w)?w.getFilters():[w]}(t.where));let a=[];t.orderBy&&(a=function(g){return g.map(w=>function(M){return new Vs(vn(M.field),function(S){switch(S){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(M.direction))}(w))}(t.orderBy));let c=null;t.limit&&(c=function(g){let w;return w=typeof g=="object"?g.value:g,Qs(w)?null:w}(t.limit));let u=null;t.startAt&&(u=function(g){const w=!!g.before,C=g.values||[];return new Ds(C,w)}(t.startAt));let d=null;return t.endAt&&(d=function(g){const w=!g.before,C=g.values||[];return new Ds(C,w)}(t.endAt)),$p(e,s,a,i,c,"F",u,d)}function Ig(n,e){const t=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return z(28987,{purpose:s})}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function ad(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=vn(t.unaryFilter.field);return _e.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=vn(t.unaryFilter.field);return _e.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=vn(t.unaryFilter.field);return _e.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=vn(t.unaryFilter.field);return _e.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return z(61313);default:return z(60726)}}(n):n.fieldFilter!==void 0?function(t){return _e.create(vn(t.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return z(58110);default:return z(50506)}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return it.create(t.compositeFilter.filters.map(r=>ad(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return z(1026)}}(t.compositeFilter.op))}(n):z(30097,{filter:n})}function Ag(n){return hg[n]}function Cg(n){return fg[n]}function Sg(n){return mg[n]}function _n(n){return{fieldPath:n.canonicalString()}}function vn(n){return Ie.fromServerFormat(n.fieldPath)}function cd(n){return n instanceof _e?function(t){if(t.op==="=="){if(Wc(t.value))return{unaryFilter:{field:_n(t.field),op:"IS_NAN"}};if(Gc(t.value))return{unaryFilter:{field:_n(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Wc(t.value))return{unaryFilter:{field:_n(t.field),op:"IS_NOT_NAN"}};if(Gc(t.value))return{unaryFilter:{field:_n(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:_n(t.field),op:Cg(t.op),value:t.value}}}(n):n instanceof it?function(t){const r=t.getFilters().map(s=>cd(s));return r.length===1?r[0]:{compositeFilter:{op:Sg(t.op),filters:r}}}(n):z(54877,{filter:n})}function Rg(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function ld(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}function ud(n){return!!n&&typeof n._toProto=="function"&&n._protoValueType==="ProtoValue"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class at{constructor(e,t,r,s,i=H.min(),a=H.min(),c=Ae.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=c,this.expectedCount=u}withSequenceNumber(e){return new at(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new at(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new at(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new at(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pg{constructor(e){this.gt=e}}function xg(n){const e=bg({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?co(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kg{constructor(){this.Sn=new Dg}addToCollectionParentIndex(e,t){return this.Sn.add(t),k.resolve()}getCollectionParents(e,t){return k.resolve(this.Sn.getEntries(t))}addFieldIndex(e,t){return k.resolve()}deleteFieldIndex(e,t){return k.resolve()}deleteAllFieldIndexes(e){return k.resolve()}createTargetIndexes(e,t){return k.resolve()}getDocumentsMatchingTarget(e,t){return k.resolve(null)}getIndexType(e,t){return k.resolve(0)}getFieldIndexes(e,t){return k.resolve([])}getNextCollectionGroupToUpdate(e){return k.resolve(null)}getMinOffset(e,t){return k.resolve(Mt.min())}getMinOffsetFromCollectionGroup(e,t){return k.resolve(Mt.min())}updateCollectionGroup(e,t,r){return k.resolve()}updateIndexEntries(e,t){return k.resolve()}}class Dg{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new Ee(le.comparator),i=!s.has(r);return this.index[t]=s.add(r),i}has(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new Ee(le.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const al={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},dd=41943040;class Fe{static withCacheSize(e){return new Fe(e,Fe.DEFAULT_COLLECTION_PERCENTILE,Fe.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Fe.DEFAULT_COLLECTION_PERCENTILE=10,Fe.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Fe.DEFAULT=new Fe(dd,Fe.DEFAULT_COLLECTION_PERCENTILE,Fe.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Fe.DISABLED=new Fe(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $t{constructor(e){this.ir=e}next(){return this.ir+=2,this.ir}static sr(){return new $t(0)}static _r(){return new $t(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cl="LruGarbageCollector",Vg=1048576;function ll([n,e],[t,r]){const s=J(n,t);return s===0?J(e,r):s}class Lg{constructor(e){this.hr=e,this.buffer=new Ee(ll),this.Pr=0}Tr(){return++this.Pr}Ir(e){const t=[e,this.Tr()];if(this.buffer.size<this.hr)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();ll(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class Mg{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Er=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Rr(6e4)}stop(){this.Er&&(this.Er.cancel(),this.Er=null)}get started(){return this.Er!==null}Rr(e){$(cl,`Garbage collection scheduled in ${e}ms`),this.Er=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Er=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){Fn(t)?$(cl,"Ignoring IndexedDB error during garbage collection: ",t):await On(t)}await this.Rr(3e5)})}}class Ng{constructor(e,t){this.Ar=e,this.params=t}calculateTargetCount(e,t){return this.Ar.Vr(e).next(r=>Math.floor(t/100*r))}nthSequenceNumber(e,t){if(t===0)return k.resolve(Ys.ce);const r=new Lg(t);return this.Ar.forEachTarget(e,s=>r.Ir(s.sequenceNumber)).next(()=>this.Ar.dr(e,s=>r.Ir(s))).next(()=>r.maxValue)}removeTargets(e,t,r){return this.Ar.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.Ar.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?($("LruGarbageCollector","Garbage collection skipped; disabled"),k.resolve(al)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?($("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),al):this.mr(e,t))}getCacheSize(e){return this.Ar.getCacheSize(e)}mr(e,t){let r,s,i,a,c,u,d;const f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(g=>(g>this.params.maximumSequenceNumbersToCollect?($("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${g}`),s=this.params.maximumSequenceNumbersToCollect):s=g,a=Date.now(),this.nthSequenceNumber(e,s))).next(g=>(r=g,c=Date.now(),this.removeTargets(e,r,t))).next(g=>(i=g,u=Date.now(),this.removeOrphanedDocuments(e,r))).next(g=>(d=Date.now(),gn()<=Z.DEBUG&&$("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-f}ms
	Determined least recently used ${s} in `+(c-a)+`ms
	Removed ${i} targets in `+(u-c)+`ms
	Removed ${g} documents in `+(d-u)+`ms
Total Duration: ${d-f}ms`),k.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:g})))}}function Og(n,e){return new Ng(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fg{constructor(){this.changes=new ln(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,xe.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?k.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $g{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ug{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(s=>(r=s,this.remoteDocumentCache.getEntry(e,t))).next(s=>(r!==null&&gr(r.mutation,s,ze.empty(),oe.now()),s))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,X()).next(()=>r))}getLocalViewOfDocuments(e,t,r=X()){const s=Xt();return this.populateOverlays(e,s,t).next(()=>this.computeViews(e,t,s,r).next(i=>{let a=lr();return i.forEach((c,u)=>{a=a.insert(c,u.overlayedDocument)}),a}))}getOverlayedDocuments(e,t){const r=Xt();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,X()))}populateOverlays(e,t,r){const s=[];return r.forEach(i=>{t.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(e,s).next(i=>{i.forEach((a,c)=>{t.set(a,c)})})}computeViews(e,t,r,s){let i=mt();const a=pr(),c=function(){return pr()}();return t.forEach((u,d)=>{const f=r.get(d.key);s.has(d.key)&&(f===void 0||f.mutation instanceof un)?i=i.insert(d.key,d):f!==void 0?(a.set(d.key,f.mutation.getFieldMask()),gr(f.mutation,d,f.mutation.getFieldMask(),oe.now())):a.set(d.key,ze.empty())}),this.recalculateAndSaveOverlays(e,i).next(u=>(u.forEach((d,f)=>a.set(d,f)),t.forEach((d,f)=>c.set(d,new $g(f,a.get(d)??null))),c))}recalculateAndSaveOverlays(e,t){const r=pr();let s=new ce((a,c)=>a-c),i=X();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(a=>{for(const c of a)c.keys().forEach(u=>{const d=t.get(u);if(d===null)return;let f=r.get(u)||ze.empty();f=c.applyToLocalView(d,f),r.set(u,f);const g=(s.get(c.batchId)||X()).add(u);s=s.insert(c.batchId,g)})}).next(()=>{const a=[],c=s.getReverseIterator();for(;c.hasNext();){const u=c.getNext(),d=u.key,f=u.value,g=Gu();f.forEach(w=>{if(!i.has(w)){const C=Ju(t.get(w),r.get(w));C!==null&&g.set(w,C),i=i.add(w)}}),a.push(this.documentOverlayCache.saveOverlays(e,d,g))}return k.waitFor(a)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,s){return Up(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Bp(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,s):this.getDocumentsMatchingCollectionQuery(e,t,r,s)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next(i=>{const a=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-i.size):k.resolve(Xt());let c=vr,u=i;return a.next(d=>k.forEach(d,(f,g)=>(c<g.largestBatchId&&(c=g.largestBatchId),i.get(f)?k.resolve():this.remoteDocumentCache.getEntry(e,f).next(w=>{u=u.insert(f,w)}))).next(()=>this.populateOverlays(e,d,i)).next(()=>this.computeViews(e,u,d,X())).next(f=>({batchId:c,changes:Hu(f)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new B(t)).next(r=>{let s=lr();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(e,t,r,s){const i=t.collectionGroup;let a=lr();return this.indexManager.getCollectionParents(e,i).next(c=>k.forEach(c,u=>{const d=function(g,w){return new Xs(w,null,g.explicitOrderBy.slice(),g.filters.slice(),g.limit,g.limitType,g.startAt,g.endAt)}(t,u.child(i));return this.getDocumentsMatchingCollectionQuery(e,d,r,s).next(f=>{f.forEach((g,w)=>{a=a.insert(g,w)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(e,t,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(a=>(i=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s))).next(a=>{i.forEach((u,d)=>{const f=d.getKey();a.get(f)===null&&(a=a.insert(f,xe.newInvalidDocument(f)))});let c=lr();return a.forEach((u,d)=>{const f=i.get(u);f!==void 0&&gr(f.mutation,d,ze.empty(),oe.now()),ti(t,d)&&(c=c.insert(u,d))}),c})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bg{constructor(e){this.serializer=e,this.Or=new Map,this.Nr=new Map}getBundleMetadata(e,t){return k.resolve(this.Or.get(t))}saveBundleMetadata(e,t){return this.Or.set(t.id,function(s){return{id:s.id,version:s.version,createTime:et(s.createTime)}}(t)),k.resolve()}getNamedQuery(e,t){return k.resolve(this.Nr.get(t))}saveNamedQuery(e,t){return this.Nr.set(t.name,function(s){return{name:s.name,query:xg(s.bundledQuery),readTime:et(s.readTime)}}(t)),k.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jg{constructor(){this.overlays=new ce(B.comparator),this.Br=new Map}getOverlay(e,t){return k.resolve(this.overlays.get(t))}getOverlays(e,t){const r=Xt();return k.forEach(t,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((s,i)=>{this.wt(e,t,i)}),k.resolve()}removeOverlaysForBatchId(e,t,r){const s=this.Br.get(r);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.Br.delete(r)),k.resolve()}getOverlaysForCollection(e,t,r){const s=Xt(),i=t.length+1,a=new B(t.child("")),c=this.overlays.getIteratorFrom(a);for(;c.hasNext();){const u=c.getNext().value,d=u.getKey();if(!t.isPrefixOf(d.path))break;d.path.length===i&&u.largestBatchId>r&&s.set(u.getKey(),u)}return k.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let i=new ce((d,f)=>d-f);const a=this.overlays.getIterator();for(;a.hasNext();){const d=a.getNext().value;if(d.getKey().getCollectionGroup()===t&&d.largestBatchId>r){let f=i.get(d.largestBatchId);f===null&&(f=Xt(),i=i.insert(d.largestBatchId,f)),f.set(d.getKey(),d)}}const c=Xt(),u=i.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((d,f)=>c.set(d,f)),!(c.size()>=s)););return k.resolve(c)}wt(e,t,r){const s=this.overlays.get(r.key);if(s!==null){const a=this.Br.get(s.largestBatchId).delete(r.key);this.Br.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new og(t,r));let i=this.Br.get(t);i===void 0&&(i=X(),this.Br.set(t,i)),this.Br.set(t,i.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zg{constructor(){this.sessionToken=Ae.EMPTY_BYTE_STRING}getSessionToken(e){return k.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,k.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zo{constructor(){this.Lr=new Ee(Te.kr),this.qr=new Ee(Te.Kr)}isEmpty(){return this.Lr.isEmpty()}addReference(e,t){const r=new Te(e,t);this.Lr=this.Lr.add(r),this.qr=this.qr.add(r)}Ur(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.$r(new Te(e,t))}Wr(e,t){e.forEach(r=>this.removeReference(r,t))}Qr(e){const t=new B(new le([])),r=new Te(t,e),s=new Te(t,e+1),i=[];return this.qr.forEachInRange([r,s],a=>{this.$r(a),i.push(a.key)}),i}Gr(){this.Lr.forEach(e=>this.$r(e))}$r(e){this.Lr=this.Lr.delete(e),this.qr=this.qr.delete(e)}zr(e){const t=new B(new le([])),r=new Te(t,e),s=new Te(t,e+1);let i=X();return this.qr.forEachInRange([r,s],a=>{i=i.add(a.key)}),i}containsKey(e){const t=new Te(e,0),r=this.Lr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class Te{constructor(e,t){this.key=e,this.jr=t}static kr(e,t){return B.comparator(e.key,t.key)||J(e.jr,t.jr)}static Kr(e,t){return J(e.jr,t.jr)||B.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qg{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Xn=1,this.Jr=new Ee(Te.kr)}checkEmpty(e){return k.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){const i=this.Xn;this.Xn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new ig(i,t,r,s);this.mutationQueue.push(a);for(const c of s)this.Jr=this.Jr.add(new Te(c.key,i)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return k.resolve(a)}lookupMutationBatch(e,t){return k.resolve(this.Hr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=this.Zr(r),i=s<0?0:s;return k.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return k.resolve(this.mutationQueue.length===0?Vo:this.Xn-1)}getAllMutationBatches(e){return k.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new Te(t,0),s=new Te(t,Number.POSITIVE_INFINITY),i=[];return this.Jr.forEachInRange([r,s],a=>{const c=this.Hr(a.jr);i.push(c)}),k.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new Ee(J);return t.forEach(s=>{const i=new Te(s,0),a=new Te(s,Number.POSITIVE_INFINITY);this.Jr.forEachInRange([i,a],c=>{r=r.add(c.jr)})}),k.resolve(this.Xr(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1;let i=r;B.isDocumentKey(i)||(i=i.child(""));const a=new Te(new B(i),0);let c=new Ee(J);return this.Jr.forEachWhile(u=>{const d=u.key.path;return!!r.isPrefixOf(d)&&(d.length===s&&(c=c.add(u.jr)),!0)},a),k.resolve(this.Xr(c))}Xr(e){const t=[];return e.forEach(r=>{const s=this.Hr(r);s!==null&&t.push(s)}),t}removeMutationBatch(e,t){re(this.Yr(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Jr;return k.forEach(t.mutations,s=>{const i=new Te(s.key,t.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.Jr=r})}tr(e){}containsKey(e,t){const r=new Te(t,0),s=this.Jr.firstAfterOrEqual(r);return k.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,k.resolve()}Yr(e,t){return this.Zr(e)}Zr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Hr(e){const t=this.Zr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hg{constructor(e){this.ei=e,this.docs=function(){return new ce(B.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,s=this.docs.get(r),i=s?s.size:0,a=this.ei(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:a}),this.size+=a-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return k.resolve(r?r.document.mutableCopy():xe.newInvalidDocument(t))}getEntries(e,t){let r=mt();return t.forEach(s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():xe.newInvalidDocument(s))}),k.resolve(r)}getDocumentsMatchingQuery(e,t,r,s){let i=mt();const a=t.path,c=new B(a.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(c);for(;u.hasNext();){const{key:d,value:{document:f}}=u.getNext();if(!a.isPrefixOf(d.path))break;d.path.length>a.length+1||gp(pp(f),r)<=0||(s.has(f.key)||ti(t,f))&&(i=i.insert(f.key,f.mutableCopy()))}return k.resolve(i)}getAllFromCollectionGroup(e,t,r,s){z(9500)}ti(e,t){return k.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new Gg(this)}getSize(e){return k.resolve(this.size)}}class Gg extends Fg{constructor(e){super(),this.Fr=e}applyChanges(e){const t=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?t.push(this.Fr.addEntry(e,s)):this.Fr.removeEntry(r)}),k.waitFor(t)}getFromCache(e,t){return this.Fr.getEntry(e,t)}getAllFromCache(e,t){return this.Fr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wg{constructor(e){this.persistence=e,this.ni=new ln(t=>No(t),Oo),this.lastRemoteSnapshotVersion=H.min(),this.highestTargetId=0,this.ri=0,this.ii=new zo,this.targetCount=0,this.si=$t.sr()}forEachTarget(e,t){return this.ni.forEach((r,s)=>t(s)),k.resolve()}getLastRemoteSnapshotVersion(e){return k.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return k.resolve(this.ri)}allocateTargetId(e){return this.highestTargetId=this.si.next(),k.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.ri&&(this.ri=t),k.resolve()}cr(e){this.ni.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.si=new $t(t),this.highestTargetId=t),e.sequenceNumber>this.ri&&(this.ri=e.sequenceNumber)}addTargetData(e,t){return this.cr(t),this.targetCount+=1,k.resolve()}updateTargetData(e,t){return this.cr(t),k.resolve()}removeTargetData(e,t){return this.ni.delete(t.target),this.ii.Qr(t.targetId),this.targetCount-=1,k.resolve()}removeTargets(e,t,r){let s=0;const i=[];return this.ni.forEach((a,c)=>{c.sequenceNumber<=t&&r.get(c.targetId)===null&&(this.ni.delete(a),i.push(this.removeMatchingKeysForTargetId(e,c.targetId)),s++)}),k.waitFor(i).next(()=>s)}getTargetCount(e){return k.resolve(this.targetCount)}getTargetData(e,t){const r=this.ni.get(t)||null;return k.resolve(r)}addMatchingKeys(e,t,r){return this.ii.Ur(t,r),k.resolve()}removeMatchingKeys(e,t,r){this.ii.Wr(t,r);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach(a=>{i.push(s.markPotentiallyOrphaned(e,a))}),k.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.ii.Qr(t),k.resolve()}getMatchingKeysForTargetId(e,t){const r=this.ii.zr(t);return k.resolve(r)}containsKey(e,t){return k.resolve(this.ii.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hd{constructor(e,t){this.oi={},this.overlays={},this._i=new Ys(0),this.ai=!1,this.ai=!0,this.ui=new zg,this.referenceDelegate=e(this),this.ci=new Wg(this),this.indexManager=new kg,this.remoteDocumentCache=function(s){return new Hg(s)}(r=>this.referenceDelegate.li(r)),this.serializer=new Pg(t),this.hi=new Bg(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ai=!1,Promise.resolve()}get started(){return this.ai}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new jg,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.oi[e.toKey()];return r||(r=new qg(t,this.referenceDelegate),this.oi[e.toKey()]=r),r}getGlobalsCache(){return this.ui}getTargetCache(){return this.ci}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.hi}runTransaction(e,t,r){$("MemoryPersistence","Starting transaction:",e);const s=new Kg(this._i.next());return this.referenceDelegate.Pi(),r(s).next(i=>this.referenceDelegate.Ti(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}Ii(e,t){return k.or(Object.values(this.oi).map(r=>()=>r.containsKey(e,t)))}}class Kg extends _p{constructor(e){super(),this.currentSequenceNumber=e}}class qo{constructor(e){this.persistence=e,this.Ei=new zo,this.Ri=null}static Ai(e){return new qo(e)}get Vi(){if(this.Ri)return this.Ri;throw z(60996)}addReference(e,t,r){return this.Ei.addReference(r,t),this.Vi.delete(r.toString()),k.resolve()}removeReference(e,t,r){return this.Ei.removeReference(r,t),this.Vi.add(r.toString()),k.resolve()}markPotentiallyOrphaned(e,t){return this.Vi.add(t.toString()),k.resolve()}removeTarget(e,t){this.Ei.Qr(t.targetId).forEach(s=>this.Vi.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(s=>{s.forEach(i=>this.Vi.add(i.toString()))}).next(()=>r.removeTargetData(e,t))}Pi(){this.Ri=new Set}Ti(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return k.forEach(this.Vi,r=>{const s=B.fromPath(r);return this.di(e,s).next(i=>{i||t.removeEntry(s,H.min())})}).next(()=>(this.Ri=null,t.apply(e)))}updateLimboDocument(e,t){return this.di(e,t).next(r=>{r?this.Vi.delete(t.toString()):this.Vi.add(t.toString())})}li(e){return 0}di(e,t){return k.or([()=>k.resolve(this.Ei.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ii(e,t)])}}class Fs{constructor(e,t){this.persistence=e,this.mi=new ln(r=>wp(r.path),(r,s)=>r.isEqual(s)),this.garbageCollector=Og(this,t)}static Ai(e,t){return new Fs(e,t)}Pi(){}Ti(e){return k.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}Vr(e){const t=this.gr(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>t.next(s=>r+s))}gr(e){let t=0;return this.dr(e,r=>{t++}).next(()=>t)}dr(e,t){return k.forEach(this.mi,(r,s)=>this.yr(e,r,s).next(i=>i?k.resolve():t(s)))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.ti(e,a=>this.yr(e,a,t).next(c=>{c||(r++,i.removeEntry(a,H.min()))})).next(()=>i.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,t){return this.mi.set(t,e.currentSequenceNumber),k.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.mi.set(r,e.currentSequenceNumber),k.resolve()}removeReference(e,t,r){return this.mi.set(r,e.currentSequenceNumber),k.resolve()}updateLimboDocument(e,t){return this.mi.set(t,e.currentSequenceNumber),k.resolve()}li(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=ps(e.data.value)),t}yr(e,t,r){return k.or([()=>this.persistence.Ii(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.mi.get(t);return k.resolve(s!==void 0&&s>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ho{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.Ps=r,this.Ts=s}static Is(e,t){let r=X(),s=X();for(const i of t.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new Ho(e,t.fromCache,r,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yg{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qg{constructor(){this.Es=!1,this.Rs=!1,this.As=100,this.Vs=function(){return Mf()?8:vp(ke())>0?6:4}()}initialize(e,t){this.ds=e,this.indexManager=t,this.Es=!0}getDocumentsMatchingQuery(e,t,r,s){const i={result:null};return this.fs(e,t).next(a=>{i.result=a}).next(()=>{if(!i.result)return this.gs(e,t,s,r).next(a=>{i.result=a})}).next(()=>{if(i.result)return;const a=new Yg;return this.ps(e,t,a).next(c=>{if(i.result=c,this.Rs)return this.ys(e,t,a,c.size)})}).next(()=>i.result)}ys(e,t,r,s){return r.documentReadCount<this.As?(gn()<=Z.DEBUG&&$("QueryEngine","SDK will not create cache indexes for query:",yn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.As,"documents"),k.resolve()):(gn()<=Z.DEBUG&&$("QueryEngine","Query:",yn(t),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.Vs*s?(gn()<=Z.DEBUG&&$("QueryEngine","The SDK decides to create cache indexes for query:",yn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Ze(t))):k.resolve())}fs(e,t){if(Jc(t))return k.resolve(null);let r=Ze(t);return this.indexManager.getIndexType(e,r).next(s=>s===0?null:(t.limit!==null&&s===1&&(t=co(t,null,"F"),r=Ze(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(i=>{const a=X(...i);return this.ds.getDocuments(e,a).next(c=>this.indexManager.getMinOffset(e,r).next(u=>{const d=this.ws(t,c);return this.Ss(t,d,a,u.readTime)?this.fs(e,co(t,null,"F")):this.bs(e,d,t,u)}))})))}gs(e,t,r,s){return Jc(t)||s.isEqual(H.min())?k.resolve(null):this.ds.getDocuments(e,r).next(i=>{const a=this.ws(t,i);return this.Ss(t,a,r,s)?k.resolve(null):(gn()<=Z.DEBUG&&$("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),yn(t)),this.bs(e,a,t,mp(s,vr)).next(c=>c))})}ws(e,t){let r=new Ee(zu(e));return t.forEach((s,i)=>{ti(e,i)&&(r=r.add(i))}),r}Ss(e,t,r,s){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}ps(e,t,r){return gn()<=Z.DEBUG&&$("QueryEngine","Using full collection scan to execute query:",yn(t)),this.ds.getDocumentsMatchingQuery(e,t,Mt.min(),r)}bs(e,t,r,s){return this.ds.getDocumentsMatchingQuery(e,r,s).next(i=>(t.forEach(a=>{i=i.insert(a.key,a)}),i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Go="LocalStore",Jg=3e8;class Xg{constructor(e,t,r,s){this.persistence=e,this.Ds=t,this.serializer=s,this.Cs=new ce(J),this.vs=new ln(i=>No(i),Oo),this.Fs=new Map,this.Ms=e.getRemoteDocumentCache(),this.ci=e.getTargetCache(),this.hi=e.getBundleCache(),this.xs(r)}xs(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Ug(this.Ms,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ms.setIndexManager(this.indexManager),this.Ds.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Cs))}}function Zg(n,e,t,r){return new Xg(n,e,t,r)}async function fd(n,e){const t=W(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next(i=>(s=i,t.xs(e),t.mutationQueue.getAllMutationBatches(r))).next(i=>{const a=[],c=[];let u=X();for(const d of s){a.push(d.batchId);for(const f of d.mutations)u=u.add(f.key)}for(const d of i){c.push(d.batchId);for(const f of d.mutations)u=u.add(f.key)}return t.localDocuments.getDocuments(r,u).next(d=>({Os:d,removedBatchIds:a,addedBatchIds:c}))})})}function ey(n,e){const t=W(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=e.batch.keys(),i=t.Ms.newChangeBuffer({trackRemovals:!0});return function(c,u,d,f){const g=d.batch,w=g.keys();let C=k.resolve();return w.forEach(M=>{C=C.next(()=>f.getEntry(u,M)).next(O=>{const S=d.docVersions.get(M);re(S!==null,48541),O.version.compareTo(S)<0&&(g.applyToRemoteDocument(O,d),O.isValidDocument()&&(O.setReadTime(d.commitVersion),f.addEntry(O)))})}),C.next(()=>c.mutationQueue.removeMutationBatch(u,g))}(t,r,e,i).next(()=>i.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(c){let u=X();for(let d=0;d<c.mutationResults.length;++d)c.mutationResults[d].transformResults.length>0&&(u=u.add(c.batch.mutations[d].key));return u}(e))).next(()=>t.localDocuments.getDocuments(r,s))})}function md(n){const e=W(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.ci.getLastRemoteSnapshotVersion(t))}function ty(n,e){const t=W(n),r=e.snapshotVersion;let s=t.Cs;return t.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const a=t.Ms.newChangeBuffer({trackRemovals:!0});s=t.Cs;const c=[];e.targetChanges.forEach((f,g)=>{const w=s.get(g);if(!w)return;c.push(t.ci.removeMatchingKeys(i,f.removedDocuments,g).next(()=>t.ci.addMatchingKeys(i,f.addedDocuments,g)));let C=w.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(g)!==null?C=C.withResumeToken(Ae.EMPTY_BYTE_STRING,H.min()).withLastLimboFreeSnapshotVersion(H.min()):f.resumeToken.approximateByteSize()>0&&(C=C.withResumeToken(f.resumeToken,r)),s=s.insert(g,C),function(O,S,P){return O.resumeToken.approximateByteSize()===0||S.snapshotVersion.toMicroseconds()-O.snapshotVersion.toMicroseconds()>=Jg?!0:P.addedDocuments.size+P.modifiedDocuments.size+P.removedDocuments.size>0}(w,C,f)&&c.push(t.ci.updateTargetData(i,C))});let u=mt(),d=X();if(e.documentUpdates.forEach(f=>{e.resolvedLimboDocuments.has(f)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(i,f))}),c.push(ny(i,a,e.documentUpdates).next(f=>{u=f.Ns,d=f.Bs})),!r.isEqual(H.min())){const f=t.ci.getLastRemoteSnapshotVersion(i).next(g=>t.ci.setTargetsMetadata(i,i.currentSequenceNumber,r));c.push(f)}return k.waitFor(c).next(()=>a.apply(i)).next(()=>t.localDocuments.getLocalViewOfDocuments(i,u,d)).next(()=>u)}).then(i=>(t.Cs=s,i))}function ny(n,e,t){let r=X(),s=X();return t.forEach(i=>r=r.add(i)),e.getEntries(n,r).next(i=>{let a=mt();return t.forEach((c,u)=>{const d=i.get(c);u.isFoundDocument()!==d.isFoundDocument()&&(s=s.add(c)),u.isNoDocument()&&u.version.isEqual(H.min())?(e.removeEntry(c,u.readTime),a=a.insert(c,u)):!d.isValidDocument()||u.version.compareTo(d.version)>0||u.version.compareTo(d.version)===0&&d.hasPendingWrites?(e.addEntry(u),a=a.insert(c,u)):$(Go,"Ignoring outdated watch update for ",c,". Current version:",d.version," Watch version:",u.version)}),{Ns:a,Bs:s}})}function ry(n,e){const t=W(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=Vo),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function sy(n,e){const t=W(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return t.ci.getTargetData(r,e).next(i=>i?(s=i,k.resolve(s)):t.ci.allocateTargetId(r).next(a=>(s=new at(e,a,"TargetPurposeListen",r.currentSequenceNumber),t.ci.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=t.Cs.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.Cs=t.Cs.insert(r.targetId,r),t.vs.set(e,r.targetId)),r})}async function mo(n,e,t){const r=W(n),s=r.Cs.get(e),i=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",i,a=>r.persistence.referenceDelegate.removeTarget(a,s))}catch(a){if(!Fn(a))throw a;$(Go,`Failed to update sequence numbers for target ${e}: ${a}`)}r.Cs=r.Cs.remove(e),r.vs.delete(s.target)}function ul(n,e,t){const r=W(n);let s=H.min(),i=X();return r.persistence.runTransaction("Execute query","readwrite",a=>function(u,d,f){const g=W(u),w=g.vs.get(f);return w!==void 0?k.resolve(g.Cs.get(w)):g.ci.getTargetData(d,f)}(r,a,Ze(e)).next(c=>{if(c)return s=c.lastLimboFreeSnapshotVersion,r.ci.getMatchingKeysForTargetId(a,c.targetId).next(u=>{i=u})}).next(()=>r.Ds.getDocumentsMatchingQuery(a,e,t?s:H.min(),t?i:X())).next(c=>(iy(r,zp(e),c),{documents:c,Ls:i})))}function iy(n,e,t){let r=n.Fs.get(e)||H.min();t.forEach((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)}),n.Fs.set(e,r)}class dl{constructor(){this.activeTargetIds=Yp()}Ws(e){this.activeTargetIds=this.activeTargetIds.add(e)}Qs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}$s(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class oy{constructor(){this.Co=new dl,this.vo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.Co.Ws(e),this.vo[e]||"not-current"}updateQueryState(e,t,r){this.vo[e]=t}removeLocalQueryTarget(e){this.Co.Qs(e)}isLocalQueryTarget(e){return this.Co.activeTargetIds.has(e)}clearQueryState(e){delete this.vo[e]}getAllActiveQueryTargets(){return this.Co.activeTargetIds}isActiveQueryTarget(e){return this.Co.activeTargetIds.has(e)}start(){return this.Co=new dl,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ay{Fo(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hl="ConnectivityMonitor";class fl{constructor(){this.Mo=()=>this.xo(),this.Oo=()=>this.No(),this.Bo=[],this.Lo()}Fo(e){this.Bo.push(e)}shutdown(){window.removeEventListener("online",this.Mo),window.removeEventListener("offline",this.Oo)}Lo(){window.addEventListener("online",this.Mo),window.addEventListener("offline",this.Oo)}xo(){$(hl,"Network connectivity changed: AVAILABLE");for(const e of this.Bo)e(0)}No(){$(hl,"Network connectivity changed: UNAVAILABLE");for(const e of this.Bo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ds=null;function po(){return ds===null?ds=function(){return 268435456+Math.round(2147483648*Math.random())}():ds++,"0x"+ds.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zi="RestConnection",cy={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class ly{get ko(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.qo=t+"://"+e.host,this.Ko=`projects/${r}/databases/${s}`,this.Uo=this.databaseId.database===xs?`project_id=${r}`:`project_id=${r}&database_id=${s}`}$o(e,t,r,s,i){const a=po(),c=this.Wo(e,t.toUriEncodedString());$(zi,`Sending RPC '${e}' ${a}:`,c,r);const u={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Uo};this.Qo(u,s,i);const{host:d}=new URL(c),f=Vr(d);return this.Go(e,c,u,r,f).then(g=>($(zi,`Received RPC '${e}' ${a}: `,g),g),g=>{throw sn(zi,`RPC '${e}' ${a} failed with error: `,g,"url: ",c,"request:",r),g})}zo(e,t,r,s,i,a){return this.$o(e,t,r,s,i)}Qo(e,t,r){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Nn}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((s,i)=>e[i]=s),r&&r.headers.forEach((s,i)=>e[i]=s)}Wo(e,t){const r=cy[e];let s=`${this.qo}/v1/${t}:${r}`;return this.databaseInfo.apiKey&&(s=`${s}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),s}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uy{constructor(e){this.jo=e.jo,this.Jo=e.Jo}Ho(e){this.Zo=e}Xo(e){this.Yo=e}e_(e){this.t_=e}onMessage(e){this.n_=e}close(){this.Jo()}send(e){this.jo(e)}r_(){this.Zo()}i_(){this.Yo()}s_(e){this.t_(e)}o_(e){this.n_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Se="WebChannelConnection",sr=(n,e,t)=>{n.listen(e,r=>{try{t(r)}catch(s){setTimeout(()=>{throw s},0)}})};class Tn extends ly{constructor(e){super(e),this.__=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static a_(){if(!Tn.u_){const e=Eu();sr(e,vu.STAT_EVENT,t=>{t.stat===ro.PROXY?$(Se,"STAT_EVENT: detected buffering proxy"):t.stat===ro.NOPROXY&&$(Se,"STAT_EVENT: detected no buffering proxy")}),Tn.u_=!0}}Go(e,t,r,s,i){const a=po();return new Promise((c,u)=>{const d=new yu;d.setWithCredentials(!0),d.listenOnce(_u.COMPLETE,()=>{try{switch(d.getLastErrorCode()){case ms.NO_ERROR:const g=d.getResponseJson();$(Se,`XHR for RPC '${e}' ${a} received:`,JSON.stringify(g)),c(g);break;case ms.TIMEOUT:$(Se,`RPC '${e}' ${a} timed out`),u(new U(D.DEADLINE_EXCEEDED,"Request time out"));break;case ms.HTTP_ERROR:const w=d.getStatus();if($(Se,`RPC '${e}' ${a} failed with status:`,w,"response text:",d.getResponseText()),w>0){let C=d.getResponseJson();Array.isArray(C)&&(C=C[0]);const M=C==null?void 0:C.error;if(M&&M.status&&M.message){const O=function(P){const F=P.toLowerCase().replace(/_/g,"-");return Object.values(D).indexOf(F)>=0?F:D.UNKNOWN}(M.status);u(new U(O,M.message))}else u(new U(D.UNKNOWN,"Server responded with status "+d.getStatus()))}else u(new U(D.UNAVAILABLE,"Connection failed."));break;default:z(9055,{c_:e,streamId:a,l_:d.getLastErrorCode(),h_:d.getLastError()})}}finally{$(Se,`RPC '${e}' ${a} completed.`)}});const f=JSON.stringify(s);$(Se,`RPC '${e}' ${a} sending request:`,s),d.send(t,"POST",f,r,15)})}P_(e,t,r){const s=po(),i=[this.qo,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=this.createWebChannelTransport(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},u=this.longPollingOptions.timeoutSeconds;u!==void 0&&(c.longPollingTimeout=Math.round(1e3*u)),this.useFetchStreams&&(c.useFetchStreams=!0),this.Qo(c.initMessageHeaders,t,r),c.encodeInitMessageHeaders=!0;const d=i.join("");$(Se,`Creating RPC '${e}' stream ${s}: ${d}`,c);const f=a.createWebChannel(d,c);this.T_(f);let g=!1,w=!1;const C=new uy({jo:M=>{w?$(Se,`Not sending because RPC '${e}' stream ${s} is closed:`,M):(g||($(Se,`Opening RPC '${e}' stream ${s} transport.`),f.open(),g=!0),$(Se,`RPC '${e}' stream ${s} sending:`,M),f.send(M))},Jo:()=>f.close()});return sr(f,cr.EventType.OPEN,()=>{w||($(Se,`RPC '${e}' stream ${s} transport opened.`),C.r_())}),sr(f,cr.EventType.CLOSE,()=>{w||(w=!0,$(Se,`RPC '${e}' stream ${s} transport closed`),C.s_(),this.I_(f))}),sr(f,cr.EventType.ERROR,M=>{w||(w=!0,sn(Se,`RPC '${e}' stream ${s} transport errored. Name:`,M.name,"Message:",M.message),C.s_(new U(D.UNAVAILABLE,"The operation could not be completed")))}),sr(f,cr.EventType.MESSAGE,M=>{var O;if(!w){const S=M.data[0];re(!!S,16349);const P=S,F=(P==null?void 0:P.error)||((O=P[0])==null?void 0:O.error);if(F){$(Se,`RPC '${e}' stream ${s} received error:`,F);const q=F.status;let Y=function(_){const y=me[_];if(y!==void 0)return ed(y)}(q),L=F.message;q==="NOT_FOUND"&&L.includes("database")&&L.includes("does not exist")&&L.includes(this.databaseId.database)&&sn(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),Y===void 0&&(Y=D.INTERNAL,L="Unknown error status: "+q+" with message "+F.message),w=!0,C.s_(new U(Y,L)),f.close()}else $(Se,`RPC '${e}' stream ${s} received:`,S),C.o_(S)}}),Tn.a_(),setTimeout(()=>{C.i_()},0),C}terminate(){this.__.forEach(e=>e.close()),this.__=[]}T_(e){this.__.push(e)}I_(e){this.__=this.__.filter(t=>t===e)}Qo(e,t,r){super.Qo(e,t,r),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return wu()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dy(n){return new Tn(n)}function qi(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ii(n){return new pg(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Tn.u_=!1;class pd{constructor(e,t,r=1e3,s=1.5,i=6e4){this.Di=e,this.timerId=t,this.E_=r,this.R_=s,this.A_=i,this.V_=0,this.d_=null,this.m_=Date.now(),this.reset()}reset(){this.V_=0}f_(){this.V_=this.A_}g_(e){this.cancel();const t=Math.floor(this.V_+this.p_()),r=Math.max(0,Date.now()-this.m_),s=Math.max(0,t-r);s>0&&$("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.V_} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.d_=this.Di.enqueueAfterDelay(this.timerId,s,()=>(this.m_=Date.now(),e())),this.V_*=this.R_,this.V_<this.E_&&(this.V_=this.E_),this.V_>this.A_&&(this.V_=this.A_)}y_(){this.d_!==null&&(this.d_.skipDelay(),this.d_=null)}cancel(){this.d_!==null&&(this.d_.cancel(),this.d_=null)}p_(){return(Math.random()-.5)*this.V_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ml="PersistentStream";class gd{constructor(e,t,r,s,i,a,c,u){this.Di=e,this.w_=r,this.S_=s,this.connection=i,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=c,this.listener=u,this.state=0,this.b_=0,this.D_=null,this.C_=null,this.stream=null,this.v_=0,this.F_=new pd(e,t)}M_(){return this.state===1||this.state===5||this.x_()}x_(){return this.state===2||this.state===3}start(){this.v_=0,this.state!==4?this.auth():this.O_()}async stop(){this.M_()&&await this.close(0)}N_(){this.state=0,this.F_.reset()}B_(){this.x_()&&this.D_===null&&(this.D_=this.Di.enqueueAfterDelay(this.w_,6e4,()=>this.L_()))}k_(e){this.q_(),this.stream.send(e)}async L_(){if(this.x_())return this.close(0)}q_(){this.D_&&(this.D_.cancel(),this.D_=null)}K_(){this.C_&&(this.C_.cancel(),this.C_=null)}async close(e,t){this.q_(),this.K_(),this.F_.cancel(),this.b_++,e!==4?this.F_.reset():t&&t.code===D.RESOURCE_EXHAUSTED?(ft(t.toString()),ft("Using maximum backoff delay to prevent overloading the backend."),this.F_.f_()):t&&t.code===D.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.U_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.e_(t)}U_(){}auth(){this.state=1;const e=this.W_(this.b_),t=this.b_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.b_===t&&this.Q_(r,s)},r=>{e(()=>{const s=new U(D.UNKNOWN,"Fetching auth token failed: "+r.message);return this.G_(s)})})}Q_(e,t){const r=this.W_(this.b_);this.stream=this.z_(e,t),this.stream.Ho(()=>{r(()=>this.listener.Ho())}),this.stream.Xo(()=>{r(()=>(this.state=2,this.C_=this.Di.enqueueAfterDelay(this.S_,1e4,()=>(this.x_()&&(this.state=3),Promise.resolve())),this.listener.Xo()))}),this.stream.e_(s=>{r(()=>this.G_(s))}),this.stream.onMessage(s=>{r(()=>++this.v_==1?this.j_(s):this.onNext(s))})}O_(){this.state=5,this.F_.g_(async()=>{this.state=0,this.start()})}G_(e){return $(ml,`close with error: ${e}`),this.stream=null,this.close(4,e)}W_(e){return t=>{this.Di.enqueueAndForget(()=>this.b_===e?t():($(ml,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class hy extends gd{constructor(e,t,r,s,i,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}z_(e,t){return this.connection.P_("Listen",e,t)}j_(e){return this.onNext(e)}onNext(e){this.F_.reset();const t=_g(this.serializer,e),r=function(i){if(!("targetChange"in i))return H.min();const a=i.targetChange;return a.targetIds&&a.targetIds.length?H.min():a.readTime?et(a.readTime):H.min()}(e);return this.listener.J_(t,r)}H_(e){const t={};t.database=fo(this.serializer),t.addTarget=function(i,a){let c;const u=a.target;if(c=ao(u)?{documents:wg(i,u)}:{query:Tg(i,u).dt},c.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){c.resumeToken=rd(i,a.resumeToken);const d=lo(i,a.expectedCount);d!==null&&(c.expectedCount=d)}else if(a.snapshotVersion.compareTo(H.min())>0){c.readTime=Os(i,a.snapshotVersion.toTimestamp());const d=lo(i,a.expectedCount);d!==null&&(c.expectedCount=d)}return c}(this.serializer,e);const r=Ig(this.serializer,e);r&&(t.labels=r),this.k_(t)}Z_(e){const t={};t.database=fo(this.serializer),t.removeTarget=e,this.k_(t)}}class fy extends gd{constructor(e,t,r,s,i,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}get X_(){return this.v_>0}start(){this.lastStreamToken=void 0,super.start()}U_(){this.X_&&this.Y_([])}z_(e,t){return this.connection.P_("Write",e,t)}j_(e){return re(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,re(!e.writeResults||e.writeResults.length===0,55816),this.listener.ea()}onNext(e){re(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.F_.reset();const t=Eg(e.writeResults,e.commitTime),r=et(e.commitTime);return this.listener.ta(r,t)}na(){const e={};e.database=fo(this.serializer),this.k_(e)}Y_(e){const t={streamToken:this.lastStreamToken,writes:e.map(r=>vg(this.serializer,r))};this.k_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class my{}class py extends my{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.ra=!1}ia(){if(this.ra)throw new U(D.FAILED_PRECONDITION,"The client has already been terminated.")}$o(e,t,r,s){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,a])=>this.connection.$o(e,uo(t,r),s,i,a)).catch(i=>{throw i.name==="FirebaseError"?(i.code===D.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new U(D.UNKNOWN,i.toString())})}zo(e,t,r,s,i){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,c])=>this.connection.zo(e,uo(t,r),s,a,c,i)).catch(a=>{throw a.name==="FirebaseError"?(a.code===D.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new U(D.UNKNOWN,a.toString())})}terminate(){this.ra=!0,this.connection.terminate()}}function gy(n,e,t,r){return new py(n,e,t,r)}class yy{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.sa=0,this.oa=null,this._a=!0}aa(){this.sa===0&&(this.ua("Unknown"),this.oa=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.oa=null,this.ca("Backend didn't respond within 10 seconds."),this.ua("Offline"),Promise.resolve())))}la(e){this.state==="Online"?this.ua("Unknown"):(this.sa++,this.sa>=1&&(this.ha(),this.ca(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ua("Offline")))}set(e){this.ha(),this.sa=0,e==="Online"&&(this._a=!1),this.ua(e)}ua(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}ca(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this._a?(ft(t),this._a=!1):$("OnlineStateTracker",t)}ha(){this.oa!==null&&(this.oa.cancel(),this.oa=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ot="RemoteStore";class _y{constructor(e,t,r,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.Pa=[],this.Ta=new Map,this.Ia=new Map,this.Ea=new Map,this.Ra=new $t(1e3),this.Aa=new $t(1001),this.Va=new Set,this.da=[],this.ma=i,this.ma.Fo(a=>{r.enqueueAndForget(async()=>{dn(this)&&($(ot,"Restarting streams for network reachability change."),await async function(u){const d=W(u);d.Va.add(4),await Fr(d),d.fa.set("Unknown"),d.Va.delete(4),await oi(d)}(this))})}),this.fa=new yy(r,s)}}async function oi(n){if(dn(n))for(const e of n.da)await e(!0)}async function Fr(n){for(const e of n.da)await e(!1)}function go(n,e){return n.Ia.get(e)||void 0}function yd(n,e){const t=W(n),r=go(t,e.targetId);if(r!==void 0&&t.Ta.has(r))return;const s=function(c,u){const d=go(c,u);d!==void 0&&c.Ea.delete(d);const f=function(w,C){return C%2!=0?w.Aa.next():w.Ra.next()}(c,u);return c.Ia.set(u,f),c.Ea.set(f,u),f}(t,e.targetId);$(ot,"remoteStoreListen mapping SDK target ID to remote",e.targetId,s);const i=new at(e.target,s,e.purpose,e.sequenceNumber,e.snapshotVersion,e.lastLimboFreeSnapshotVersion,e.resumeToken);t.Ta.set(s,i),Qo(t)?Yo(t):$n(t).x_()&&Ko(t,i)}function Wo(n,e){const t=W(n),r=$n(t),s=go(t,e);$(ot,"remoteStoreUnlisten removing mapping of SDK target ID to remote",e,s),t.Ta.delete(s),t.Ia.delete(e),t.Ea.delete(s),r.x_()&&_d(t,s),t.Ta.size===0&&(r.x_()?r.B_():dn(t)&&t.fa.set("Unknown"))}function Ko(n,e){if(n.ga.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(H.min())>0){const t=n.Ea.get(e.targetId);if(t===void 0)return void $(ot,"SDK target ID not found for remote ID: "+e.targetId);const r=n.remoteSyncer.getRemoteKeysForTarget(t).size;e=e.withExpectedCount(r)}$n(n).H_(e)}function _d(n,e){n.ga.$e(e),$n(n).Z_(e)}function Yo(n){n.ga=new dg({getRemoteKeysForTarget:e=>{const t=n.Ea.get(e);return t!==void 0?n.remoteSyncer.getRemoteKeysForTarget(t):X()},Rt:e=>n.Ta.get(e)||null,lt:()=>n.datastore.serializer.databaseId}),$n(n).start(),n.fa.aa()}function Qo(n){return dn(n)&&!$n(n).M_()&&n.Ta.size>0}function dn(n){return W(n).Va.size===0}function vd(n){n.ga=void 0}async function vy(n){n.fa.set("Online")}async function Ey(n){n.Ta.forEach((e,t)=>{Ko(n,e)})}async function wy(n,e){vd(n),Qo(n)?(n.fa.la(e),Yo(n)):n.fa.set("Unknown")}async function Ty(n,e,t){if(n.fa.set("Online"),e instanceof nd&&e.state===2&&e.cause)try{await async function(s,i){const a=i.cause;for(const c of i.targetIds){if(s.Ta.has(c)){const u=s.Ea.get(c);u!==void 0&&(await s.remoteSyncer.rejectListen(u,a),s.Ia.delete(u),s.Ea.delete(c)),s.Ta.delete(c)}s.ga.removeTarget(c)}}(n,e)}catch(r){$(ot,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await $s(n,r)}else if(e instanceof _s?n.ga.Xe(e):e instanceof td?n.ga.it(e):n.ga.tt(e),!t.isEqual(H.min()))try{const r=await md(n.localStore);t.compareTo(r)>=0&&await function(i,a){const c=i.ga.Pt(a);c.targetChanges.forEach((d,f)=>{if(d.resumeToken.approximateByteSize()>0){const g=i.Ta.get(f);g&&i.Ta.set(f,g.withResumeToken(d.resumeToken,a))}}),c.targetMismatches.forEach((d,f)=>{const g=i.Ta.get(d);if(!g)return;i.Ta.set(d,g.withResumeToken(Ae.EMPTY_BYTE_STRING,g.snapshotVersion)),_d(i,d);const w=new at(g.target,d,f,g.sequenceNumber);Ko(i,w)});const u=function(f,g){const w=new Map;g.targetChanges.forEach((M,O)=>{const S=f.Ea.get(O);S!==void 0&&w.set(S,M)});let C=new ce(J);return g.targetMismatches.forEach((M,O)=>{const S=f.Ea.get(M);S!==void 0&&(C=C.insert(S,O))}),new Nr(g.snapshotVersion,w,C,g.documentUpdates,g.resolvedLimboDocuments)}(i,c);return i.remoteSyncer.applyRemoteEvent(u)}(n,t)}catch(r){$(ot,"Failed to raise snapshot:",r),await $s(n,r)}}async function $s(n,e,t){if(!Fn(e))throw e;n.Va.add(1),await Fr(n),n.fa.set("Offline"),t||(t=()=>md(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{$(ot,"Retrying IndexedDB access"),await t(),n.Va.delete(1),await oi(n)})}function Ed(n,e){return e().catch(t=>$s(n,t,e))}async function ai(n){const e=W(n),t=Ut(e);let r=e.Pa.length>0?e.Pa[e.Pa.length-1].batchId:Vo;for(;by(e);)try{const s=await ry(e.localStore,r);if(s===null){e.Pa.length===0&&t.B_();break}r=s.batchId,Iy(e,s)}catch(s){await $s(e,s)}wd(e)&&Td(e)}function by(n){return dn(n)&&n.Pa.length<10}function Iy(n,e){n.Pa.push(e);const t=Ut(n);t.x_()&&t.X_&&t.Y_(e.mutations)}function wd(n){return dn(n)&&!Ut(n).M_()&&n.Pa.length>0}function Td(n){Ut(n).start()}async function Ay(n){Ut(n).na()}async function Cy(n){const e=Ut(n);for(const t of n.Pa)e.Y_(t.mutations)}async function Sy(n,e,t){const r=n.Pa.shift(),s=Uo.from(r,e,t);await Ed(n,()=>n.remoteSyncer.applySuccessfulWrite(s)),await ai(n)}async function Ry(n,e){e&&Ut(n).X_&&await async function(r,s){if(function(a){return cg(a)&&a!==D.ABORTED}(s.code)){const i=r.Pa.shift();Ut(r).N_(),await Ed(r,()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s)),await ai(r)}}(n,e),wd(n)&&Td(n)}async function pl(n,e){const t=W(n);t.asyncQueue.verifyOperationInProgress(),$(ot,"RemoteStore received new credentials");const r=dn(t);t.Va.add(3),await Fr(t),r&&t.fa.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Va.delete(3),await oi(t)}async function Py(n,e){const t=W(n);e?(t.Va.delete(2),await oi(t)):e||(t.Va.add(2),await Fr(t),t.fa.set("Unknown"))}function $n(n){return n.pa||(n.pa=function(t,r,s){const i=W(t);return i.ia(),new hy(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{Ho:vy.bind(null,n),Xo:Ey.bind(null,n),e_:wy.bind(null,n),J_:Ty.bind(null,n)}),n.da.push(async e=>{e?(n.pa.N_(),Qo(n)?Yo(n):n.fa.set("Unknown")):(await n.pa.stop(),vd(n))})),n.pa}function Ut(n){return n.ya||(n.ya=function(t,r,s){const i=W(t);return i.ia(),new fy(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{Ho:()=>Promise.resolve(),Xo:Ay.bind(null,n),e_:Ry.bind(null,n),ea:Cy.bind(null,n),ta:Sy.bind(null,n)}),n.da.push(async e=>{e?(n.ya.N_(),await ai(n)):(await n.ya.stop(),n.Pa.length>0&&($(ot,`Stopping write stream with ${n.Pa.length} pending writes`),n.Pa=[]))})),n.ya}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jo{constructor(e,t,r,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new Vt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,i){const a=Date.now()+r,c=new Jo(e,t,a,s,i);return c.start(r),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new U(D.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Xo(n,e){if(ft("AsyncQueue",`${e}: ${n}`),Fn(n))return new U(D.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bn{static emptySet(e){return new bn(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||B.comparator(t.key,r.key):(t,r)=>B.comparator(t.key,r.key),this.keyedMap=lr(),this.sortedSet=new ce(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof bn)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new bn;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gl{constructor(){this.wa=new ce(B.comparator)}track(e){const t=e.doc.key,r=this.wa.get(t);r?e.type!==0&&r.type===3?this.wa=this.wa.insert(t,e):e.type===3&&r.type!==1?this.wa=this.wa.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.wa=this.wa.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.wa=this.wa.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.wa=this.wa.remove(t):e.type===1&&r.type===2?this.wa=this.wa.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.wa=this.wa.insert(t,{type:2,doc:e.doc}):z(63341,{At:e,Sa:r}):this.wa=this.wa.insert(t,e)}ba(){const e=[];return this.wa.inorderTraversal((t,r)=>{e.push(r)}),e}}class Dn{constructor(e,t,r,s,i,a,c,u,d){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=a,this.syncStateChanged=c,this.excludesMetadataChanges=u,this.hasCachedResults=d}static fromInitialDocuments(e,t,r,s,i){const a=[];return t.forEach(c=>{a.push({type:0,doc:c})}),new Dn(e,t,bn.emptySet(t),a,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&ei(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==r[s].type||!t[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xy{constructor(){this.Da=void 0,this.Ca=[]}va(){return this.Ca.some(e=>e.Fa())}}class ky{constructor(){this.queries=yl(),this.onlineState="Unknown",this.Ma=new Set}terminate(){(function(t,r){const s=W(t),i=s.queries;s.queries=yl(),i.forEach((a,c)=>{for(const u of c.Ca)u.onError(r)})})(this,new U(D.ABORTED,"Firestore shutting down"))}}function yl(){return new ln(n=>ju(n),ei)}async function bd(n,e){const t=W(n);let r=3;const s=e.query;let i=t.queries.get(s);i?!i.va()&&e.Fa()&&(r=2):(i=new xy,r=e.Fa()?0:1);try{switch(r){case 0:i.Da=await t.onListen(s,!0);break;case 1:i.Da=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(a){const c=Xo(a,`Initialization of query '${yn(e.query)}' failed`);return void e.onError(c)}t.queries.set(s,i),i.Ca.push(e),e.xa(t.onlineState),i.Da&&e.Oa(i.Da)&&Zo(t)}async function Id(n,e){const t=W(n),r=e.query;let s=3;const i=t.queries.get(r);if(i){const a=i.Ca.indexOf(e);a>=0&&(i.Ca.splice(a,1),i.Ca.length===0?s=e.Fa()?0:1:!i.va()&&e.Fa()&&(s=2))}switch(s){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function Dy(n,e){const t=W(n);let r=!1;for(const s of e){const i=s.query,a=t.queries.get(i);if(a){for(const c of a.Ca)c.Oa(s)&&(r=!0);a.Da=s}}r&&Zo(t)}function Vy(n,e,t){const r=W(n),s=r.queries.get(e);if(s)for(const i of s.Ca)i.onError(t);r.queries.delete(e)}function Zo(n){n.Ma.forEach(e=>{e.next()})}var yo,_l;(_l=yo||(yo={})).Na="default",_l.Cache="cache";class Ad{constructor(e,t,r){this.query=e,this.Ba=t,this.La=!1,this.ka=null,this.onlineState="Unknown",this.options=r||{}}Oa(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new Dn(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.La?this.qa(e)&&(this.Ba.next(e),t=!0):this.Ka(e,this.onlineState)&&(this.Ua(e),t=!0),this.ka=e,t}onError(e){this.Ba.error(e)}xa(e){this.onlineState=e;let t=!1;return this.ka&&!this.La&&this.Ka(this.ka,e)&&(this.Ua(this.ka),t=!0),t}Ka(e,t){if(!e.fromCache||!this.Fa())return!0;const r=t!=="Offline";return(!this.options.$a||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}qa(e){if(e.docChanges.length>0)return!0;const t=this.ka&&this.ka.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}Ua(e){e=Dn.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.La=!0,this.Ba.next(e)}Fa(){return this.options.source!==yo.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cd{constructor(e){this.key=e}}class Sd{constructor(e){this.key=e}}class Ly{constructor(e,t){this.query=e,this.eu=t,this.tu=null,this.hasCachedResults=!1,this.current=!1,this.nu=X(),this.mutatedKeys=X(),this.ru=zu(e),this.iu=new bn(this.ru)}get su(){return this.eu}ou(e,t){const r=t?t._u:new gl,s=t?t.iu:this.iu;let i=t?t.mutatedKeys:this.mutatedKeys,a=s,c=!1;const u=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,d=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((f,g)=>{const w=s.get(f),C=ti(this.query,g)?g:null,M=!!w&&this.mutatedKeys.has(w.key),O=!!C&&(C.hasLocalMutations||this.mutatedKeys.has(C.key)&&C.hasCommittedMutations);let S=!1;w&&C?w.data.isEqual(C.data)?M!==O&&(r.track({type:3,doc:C}),S=!0):this.au(w,C)||(r.track({type:2,doc:C}),S=!0,(u&&this.ru(C,u)>0||d&&this.ru(C,d)<0)&&(c=!0)):!w&&C?(r.track({type:0,doc:C}),S=!0):w&&!C&&(r.track({type:1,doc:w}),S=!0,(u||d)&&(c=!0)),S&&(C?(a=a.add(C),i=O?i.add(f):i.delete(f)):(a=a.delete(f),i=i.delete(f)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const f=this.query.limitType==="F"?a.last():a.first();a=a.delete(f.key),i=i.delete(f.key),r.track({type:1,doc:f})}return{iu:a,_u:r,Ss:c,mutatedKeys:i}}au(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,s){const i=this.iu;this.iu=e.iu,this.mutatedKeys=e.mutatedKeys;const a=e._u.ba();a.sort((f,g)=>function(C,M){const O=S=>{switch(S){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return z(20277,{At:S})}};return O(C)-O(M)}(f.type,g.type)||this.ru(f.doc,g.doc)),this.uu(r),s=s??!1;const c=t&&!s?this.cu():[],u=this.nu.size===0&&this.current&&!s?1:0,d=u!==this.tu;return this.tu=u,a.length!==0||d?{snapshot:new Dn(this.query,e.iu,i,a,e.mutatedKeys,u===0,d,!1,!!r&&r.resumeToken.approximateByteSize()>0),lu:c}:{lu:c}}xa(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({iu:this.iu,_u:new gl,mutatedKeys:this.mutatedKeys,Ss:!1},!1)):{lu:[]}}hu(e){return!this.eu.has(e)&&!!this.iu.has(e)&&!this.iu.get(e).hasLocalMutations}uu(e){e&&(e.addedDocuments.forEach(t=>this.eu=this.eu.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.eu=this.eu.delete(t)),this.current=e.current)}cu(){if(!this.current)return[];const e=this.nu;this.nu=X(),this.iu.forEach(r=>{this.hu(r.key)&&(this.nu=this.nu.add(r.key))});const t=[];return e.forEach(r=>{this.nu.has(r)||t.push(new Sd(r))}),this.nu.forEach(r=>{e.has(r)||t.push(new Cd(r))}),t}Pu(e){this.eu=e.Ls,this.nu=X();const t=this.ou(e.documents);return this.applyChanges(t,!0)}Tu(){return Dn.fromInitialDocuments(this.query,this.iu,this.mutatedKeys,this.tu===0,this.hasCachedResults)}}const ea="SyncEngine";class My{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class Ny{constructor(e){this.key=e,this.Iu=!1}}class Oy{constructor(e,t,r,s,i,a){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=a,this.Eu={},this.Ru=new ln(c=>ju(c),ei),this.Au=new Map,this.Vu=new Set,this.du=new ce(B.comparator),this.mu=new Map,this.fu=new zo,this.gu={},this.pu=new Map,this.yu=$t._r(),this.onlineState="Unknown",this.wu=void 0}get isPrimaryClient(){return this.wu===!0}}async function Fy(n,e,t=!0){const r=Vd(n);let s;const i=r.Ru.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.Tu()):s=await Rd(r,e,t,!0),s}async function $y(n,e){const t=Vd(n);await Rd(t,e,!0,!1)}async function Rd(n,e,t,r){const s=await sy(n.localStore,Ze(e)),i=s.targetId,a=n.sharedClientState.addLocalQueryTarget(i,t);let c;return r&&(c=await Uy(n,e,i,a==="current",s.resumeToken)),n.isPrimaryClient&&t&&yd(n.remoteStore,s),c}async function Uy(n,e,t,r,s){n.Su=(g,w,C)=>async function(O,S,P,F){let q=S.view.ou(P);q.Ss&&(q=await ul(O.localStore,S.query,!1).then(({documents:_})=>S.view.ou(_,q)));const Y=F&&F.targetChanges.get(S.targetId),L=F&&F.targetMismatches.get(S.targetId)!=null,V=S.view.applyChanges(q,O.isPrimaryClient,Y,L);return El(O,S.targetId,V.lu),V.snapshot}(n,g,w,C);const i=await ul(n.localStore,e,!0),a=new Ly(e,i.Ls),c=a.ou(i.documents),u=Or.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",s),d=a.applyChanges(c,n.isPrimaryClient,u);El(n,t,d.lu);const f=new My(e,t,a);return n.Ru.set(e,f),n.Au.has(t)?n.Au.get(t).push(e):n.Au.set(t,[e]),d.snapshot}async function By(n,e,t){const r=W(n),s=r.Ru.get(e),i=r.Au.get(s.targetId);if(i.length>1)return r.Au.set(s.targetId,i.filter(a=>!ei(a,e))),void r.Ru.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await mo(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),t&&Wo(r.remoteStore,s.targetId),_o(r,s.targetId)}).catch(On)):(_o(r,s.targetId),await mo(r.localStore,s.targetId,!0))}async function jy(n,e){const t=W(n),r=t.Ru.get(e),s=t.Au.get(r.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),Wo(t.remoteStore,r.targetId))}async function zy(n,e,t){const r=Qy(n);try{const s=await function(a,c){const u=W(a),d=oe.now(),f=c.reduce((C,M)=>C.add(M.key),X());let g,w;return u.persistence.runTransaction("Locally write mutations","readwrite",C=>{let M=mt(),O=X();return u.Ms.getEntries(C,f).next(S=>{M=S,M.forEach((P,F)=>{F.isValidDocument()||(O=O.add(P))})}).next(()=>u.localDocuments.getOverlayedDocuments(C,M)).next(S=>{g=S;const P=[];for(const F of c){const q=rg(F,g.get(F.key).overlayedDocument);q!=null&&P.push(new un(F.key,q,Mu(q.value.mapValue),ut.exists(!0)))}return u.mutationQueue.addMutationBatch(C,d,P,c)}).next(S=>{w=S;const P=S.applyToLocalDocumentSet(g,O);return u.documentOverlayCache.saveOverlays(C,S.batchId,P)})}).then(()=>({batchId:w.batchId,changes:Hu(g)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),function(a,c,u){let d=a.gu[a.currentUser.toKey()];d||(d=new ce(J)),d=d.insert(c,u),a.gu[a.currentUser.toKey()]=d}(r,s.batchId,t),await $r(r,s.changes),await ai(r.remoteStore)}catch(s){const i=Xo(s,"Failed to persist write");t.reject(i)}}async function Pd(n,e){const t=W(n);try{const r=await ty(t.localStore,e);e.targetChanges.forEach((s,i)=>{const a=t.mu.get(i);a&&(re(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?a.Iu=!0:s.modifiedDocuments.size>0?re(a.Iu,14607):s.removedDocuments.size>0&&(re(a.Iu,42227),a.Iu=!1))}),await $r(t,r,e)}catch(r){await On(r)}}function vl(n,e,t){const r=W(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const s=[];r.Ru.forEach((i,a)=>{const c=a.view.xa(e);c.snapshot&&s.push(c.snapshot)}),function(a,c){const u=W(a);u.onlineState=c;let d=!1;u.queries.forEach((f,g)=>{for(const w of g.Ca)w.xa(c)&&(d=!0)}),d&&Zo(u)}(r.eventManager,e),s.length&&r.Eu.J_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function qy(n,e,t){const r=W(n);r.sharedClientState.updateQueryState(e,"rejected",t);const s=r.mu.get(e),i=s&&s.key;if(i){let a=new ce(B.comparator);a=a.insert(i,xe.newNoDocument(i,H.min()));const c=X().add(i),u=new Nr(H.min(),new Map,new ce(J),a,c);await Pd(r,u),r.du=r.du.remove(i),r.mu.delete(e),ta(r)}else await mo(r.localStore,e,!1).then(()=>_o(r,e,t)).catch(On)}async function Hy(n,e){const t=W(n),r=e.batch.batchId;try{const s=await ey(t.localStore,e);kd(t,r,null),xd(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await $r(t,s)}catch(s){await On(s)}}async function Gy(n,e,t){const r=W(n);try{const s=await function(a,c){const u=W(a);return u.persistence.runTransaction("Reject batch","readwrite-primary",d=>{let f;return u.mutationQueue.lookupMutationBatch(d,c).next(g=>(re(g!==null,37113),f=g.keys(),u.mutationQueue.removeMutationBatch(d,g))).next(()=>u.mutationQueue.performConsistencyCheck(d)).next(()=>u.documentOverlayCache.removeOverlaysForBatchId(d,f,c)).next(()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,f)).next(()=>u.localDocuments.getDocuments(d,f))})}(r.localStore,e);kd(r,e,t),xd(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await $r(r,s)}catch(s){await On(s)}}function xd(n,e){(n.pu.get(e)||[]).forEach(t=>{t.resolve()}),n.pu.delete(e)}function kd(n,e,t){const r=W(n);let s=r.gu[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),r.gu[r.currentUser.toKey()]=s}}function _o(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Au.get(e))n.Ru.delete(r),t&&n.Eu.bu(r,t);n.Au.delete(e),n.isPrimaryClient&&n.fu.Qr(e).forEach(r=>{n.fu.containsKey(r)||Dd(n,r)})}function Dd(n,e){n.Vu.delete(e.path.canonicalString());const t=n.du.get(e);t!==null&&(Wo(n.remoteStore,t),n.du=n.du.remove(e),n.mu.delete(t),ta(n))}function El(n,e,t){for(const r of t)r instanceof Cd?(n.fu.addReference(r.key,e),Wy(n,r)):r instanceof Sd?($(ea,"Document no longer in limbo: "+r.key),n.fu.removeReference(r.key,e),n.fu.containsKey(r.key)||Dd(n,r.key)):z(19791,{Du:r})}function Wy(n,e){const t=e.key,r=t.path.canonicalString();n.du.get(t)||n.Vu.has(r)||($(ea,"New document in limbo: "+t),n.Vu.add(r),ta(n))}function ta(n){for(;n.Vu.size>0&&n.du.size<n.maxConcurrentLimboResolutions;){const e=n.Vu.values().next().value;n.Vu.delete(e);const t=new B(le.fromString(e)),r=n.yu.next();n.mu.set(r,new Ny(t)),n.du=n.du.insert(t,r),yd(n.remoteStore,new at(Ze(Zs(t.path)),r,"TargetPurposeLimboResolution",Ys.ce))}}async function $r(n,e,t){const r=W(n),s=[],i=[],a=[];r.Ru.isEmpty()||(r.Ru.forEach((c,u)=>{a.push(r.Su(u,e,t).then(d=>{var f;if((d||t)&&r.isPrimaryClient){const g=d?!d.fromCache:(f=t==null?void 0:t.targetChanges.get(u.targetId))==null?void 0:f.current;r.sharedClientState.updateQueryState(u.targetId,g?"current":"not-current")}if(d){s.push(d);const g=Ho.Is(u.targetId,d);i.push(g)}}))}),await Promise.all(a),r.Eu.J_(s),await async function(u,d){const f=W(u);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",g=>k.forEach(d,w=>k.forEach(w.Ps,C=>f.persistence.referenceDelegate.addReference(g,w.targetId,C)).next(()=>k.forEach(w.Ts,C=>f.persistence.referenceDelegate.removeReference(g,w.targetId,C)))))}catch(g){if(!Fn(g))throw g;$(Go,"Failed to update sequence numbers: "+g)}for(const g of d){const w=g.targetId;if(!g.fromCache){const C=f.Cs.get(w),M=C.snapshotVersion,O=C.withLastLimboFreeSnapshotVersion(M);f.Cs=f.Cs.insert(w,O)}}}(r.localStore,i))}async function Ky(n,e){const t=W(n);if(!t.currentUser.isEqual(e)){$(ea,"User change. New user:",e.toKey());const r=await fd(t.localStore,e);t.currentUser=e,function(i,a){i.pu.forEach(c=>{c.forEach(u=>{u.reject(new U(D.CANCELLED,a))})}),i.pu.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await $r(t,r.Os)}}function Yy(n,e){const t=W(n),r=t.mu.get(e);if(r&&r.Iu)return X().add(r.key);{let s=X();const i=t.Au.get(e);if(!i)return s;for(const a of i){const c=t.Ru.get(a);s=s.unionWith(c.view.su)}return s}}function Vd(n){const e=W(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=Pd.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=Yy.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=qy.bind(null,e),e.Eu.J_=Dy.bind(null,e.eventManager),e.Eu.bu=Vy.bind(null,e.eventManager),e}function Qy(n){const e=W(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=Hy.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=Gy.bind(null,e),e}class Us{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=ii(e.databaseInfo.databaseId),this.sharedClientState=this.Fu(e),this.persistence=this.Mu(e),await this.persistence.start(),this.localStore=this.xu(e),this.gcScheduler=this.Ou(e,this.localStore),this.indexBackfillerScheduler=this.Nu(e,this.localStore)}Ou(e,t){return null}Nu(e,t){return null}xu(e){return Zg(this.persistence,new Qg,e.initialUser,this.serializer)}Mu(e){return new hd(qo.Ai,this.serializer)}Fu(e){return new oy}async terminate(){var e,t;(e=this.gcScheduler)==null||e.stop(),(t=this.indexBackfillerScheduler)==null||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Us.provider={build:()=>new Us};class Jy extends Us{constructor(e){super(),this.cacheSizeBytes=e}Ou(e,t){re(this.persistence.referenceDelegate instanceof Fs,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new Mg(r,e.asyncQueue,t)}Mu(e){const t=this.cacheSizeBytes!==void 0?Fe.withCacheSize(this.cacheSizeBytes):Fe.DEFAULT;return new hd(r=>Fs.Ai(r,t),this.serializer)}}class vo{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>vl(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=Ky.bind(null,this.syncEngine),await Py(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new ky}()}createDatastore(e){const t=ii(e.databaseInfo.databaseId),r=dy(e.databaseInfo);return gy(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,s,i,a,c){return new _y(r,s,i,a,c)}(this.localStore,this.datastore,e.asyncQueue,t=>vl(this.syncEngine,t,0),function(){return fl.v()?new fl:new ay}())}createSyncEngine(e,t){return function(s,i,a,c,u,d,f){const g=new Oy(s,i,a,c,u,d);return f&&(g.wu=!0),g}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(s){const i=W(s);$(ot,"RemoteStore shutting down."),i.Va.add(5),await Fr(i),i.ma.shutdown(),i.fa.set("Unknown")}(this.remoteStore),(e=this.datastore)==null||e.terminate(),(t=this.eventManager)==null||t.terminate()}}vo.provider={build:()=>new vo};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ld{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Lu(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Lu(this.observer.error,e):ft("Uncaught Error in snapshot listener:",e.toString()))}ku(){this.muted=!0}Lu(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bt="FirestoreClient";class Xy{constructor(e,t,r,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this._databaseInfo=s,this.user=Pe.UNAUTHENTICATED,this.clientId=ko.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,async a=>{$(Bt,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(r,a=>($(Bt,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Vt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=Xo(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function Hi(n,e){n.asyncQueue.verifyOperationInProgress(),$(Bt,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async s=>{r.isEqual(s)||(await fd(e.localStore,s),r=s)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function wl(n,e){n.asyncQueue.verifyOperationInProgress();const t=await Zy(n);$(Bt,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>pl(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,s)=>pl(e.remoteStore,s)),n._onlineComponents=e}async function Zy(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){$(Bt,"Using user provided OfflineComponentProvider");try{await Hi(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(s){return s.name==="FirebaseError"?s.code===D.FAILED_PRECONDITION||s.code===D.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(t))throw t;sn("Error using user provided cache. Falling back to memory cache: "+t),await Hi(n,new Us)}}else $(Bt,"Using default OfflineComponentProvider"),await Hi(n,new Jy(void 0));return n._offlineComponents}async function Md(n){return n._onlineComponents||(n._uninitializedComponentsProvider?($(Bt,"Using user provided OnlineComponentProvider"),await wl(n,n._uninitializedComponentsProvider._online)):($(Bt,"Using default OnlineComponentProvider"),await wl(n,new vo))),n._onlineComponents}function e_(n){return Md(n).then(e=>e.syncEngine)}async function Eo(n){const e=await Md(n),t=e.eventManager;return t.onListen=Fy.bind(null,e.syncEngine),t.onUnlisten=By.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=$y.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=jy.bind(null,e.syncEngine),t}function t_(n,e,t,r){const s=new Ld(r),i=new Ad(e,s,t);return n.asyncQueue.enqueueAndForget(async()=>bd(await Eo(n),i)),()=>{s.ku(),n.asyncQueue.enqueueAndForget(async()=>Id(await Eo(n),i))}}function n_(n,e,t={}){const r=new Vt;return n.asyncQueue.enqueueAndForget(async()=>function(i,a,c,u,d){const f=new Ld({next:w=>{f.ku(),a.enqueueAndForget(()=>Id(i,g));const C=w.docs.has(c);!C&&w.fromCache?d.reject(new U(D.UNAVAILABLE,"Failed to get document because the client is offline.")):C&&w.fromCache&&u&&u.source==="server"?d.reject(new U(D.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):d.resolve(w)},error:w=>d.reject(w)}),g=new Ad(Zs(c.path),f,{includeMetadataChanges:!0,$a:!0});return bd(i,g)}(await Eo(n),n.asyncQueue,e,t,r)),r.promise}function r_(n,e){const t=new Vt;return n.asyncQueue.enqueueAndForget(async()=>zy(await e_(n),e,t)),t.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nd(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const s_="ComponentProvider",Tl=new Map;function i_(n,e,t,r,s){return new Ip(n,e,t,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,Nd(s.experimentalLongPollingOptions),s.useFetchStreams,s.isUsingEmulator,r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Od="firestore.googleapis.com",bl=!0;class Il{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new U(D.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Od,this.ssl=bl}else this.host=e.host,this.ssl=e.ssl??bl;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=dd;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<Vg)throw new U(D.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}fp("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Nd(e.experimentalLongPollingOptions??{}),function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new U(D.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new U(D.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new U(D.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class na{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Il({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new U(D.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new U(D.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Il(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new np;switch(r.type){case"firstParty":return new op(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new U(D.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const r=Tl.get(t);r&&($(s_,"Removing Datastore"),Tl.delete(t),r.terminate())}(this),Promise.resolve()}}function o_(n,e,t,r={}){var d;n=Lt(n,na);const s=Vr(e),i=n._getSettings(),a={...i,emulatorOptions:n._getEmulatorOptions()},c=`${e}:${t}`;s&&lu(`https://${c}`),i.host!==Od&&i.host!==c&&sn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const u={...i,host:c,ssl:s,emulatorOptions:r};if(!tn(u,a)&&(n._setSettings(u),r.mockUserToken)){let f,g;if(typeof r.mockUserToken=="string")f=r.mockUserToken,g=Pe.MOCK_USER;else{f=Rf(r.mockUserToken,(d=n._app)==null?void 0:d.options.projectId);const w=r.mockUserToken.sub||r.mockUserToken.user_id;if(!w)throw new U(D.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");g=new Pe(w)}n._authCredentials=new rp(new bu(f,g))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ci{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new ci(this.firestore,e,this._query)}}class ve{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Rr(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new ve(this.firestore,e,this._key)}toJSON(){return{type:ve._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(Lr(t,ve._jsonSchema))return new ve(e,r||null,new B(le.fromString(t.referencePath)))}}ve._jsonSchemaVersion="firestore/documentReference/1.0",ve._jsonSchema={type:pe("string",ve._jsonSchemaVersion),referencePath:pe("string")};class Rr extends ci{constructor(e,t,r){super(e,t,Zs(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new ve(this.firestore,null,new B(e))}withConverter(e){return new Rr(this.firestore,e,this._path)}}function Gi(n,e,...t){if(n=Ne(n),arguments.length===1&&(e=ko.newId()),hp("doc","path",e),n instanceof na){const r=le.fromString(e,...t);return Fc(r),new ve(n,null,new B(r))}{if(!(n instanceof ve||n instanceof Rr))throw new U(D.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(le.fromString(e,...t));return Fc(r),new ve(n.firestore,n instanceof Rr?n.converter:null,new B(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Al="AsyncQueue";class Cl{constructor(e=Promise.resolve()){this.nc=[],this.rc=!1,this.sc=[],this.oc=null,this._c=!1,this.ac=!1,this.uc=[],this.F_=new pd(this,"async_queue_retry"),this.cc=()=>{const r=qi();r&&$(Al,"Visibility state changed to "+r.visibilityState),this.F_.y_()},this.lc=e;const t=qi();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.cc)}get isShuttingDown(){return this.rc}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.hc(),this.Pc(e)}enterRestrictedMode(e){if(!this.rc){this.rc=!0,this.ac=e||!1;const t=qi();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.cc)}}enqueue(e){if(this.hc(),this.rc)return new Promise(()=>{});const t=new Vt;return this.Pc(()=>this.rc&&this.ac?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.nc.push(e),this.Tc()))}async Tc(){if(this.nc.length!==0){try{await this.nc[0](),this.nc.shift(),this.F_.reset()}catch(e){if(!Fn(e))throw e;$(Al,"Operation failed with retryable error: "+e)}this.nc.length>0&&this.F_.g_(()=>this.Tc())}}Pc(e){const t=this.lc.then(()=>(this._c=!0,e().catch(r=>{throw this.oc=r,this._c=!1,ft("INTERNAL UNHANDLED ERROR: ",Sl(r)),r}).then(r=>(this._c=!1,r))));return this.lc=t,t}enqueueAfterDelay(e,t,r){this.hc(),this.uc.indexOf(e)>-1&&(t=0);const s=Jo.createAndSchedule(this,e,t,r,i=>this.Ic(i));return this.sc.push(s),s}hc(){this.oc&&z(47125,{Ec:Sl(this.oc)})}verifyOperationInProgress(){}async Rc(){let e;do e=this.lc,await e;while(e!==this.lc)}Ac(e){for(const t of this.sc)if(t.timerId===e)return!0;return!1}Vc(e){return this.Rc().then(()=>{this.sc.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(const t of this.sc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Rc()})}dc(e){this.uc.push(e)}Ic(e){const t=this.sc.indexOf(e);this.sc.splice(t,1)}}function Sl(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}class Pr extends na{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new Cl,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Cl(e),this._firestoreClient=void 0,await e}}}function a_(n,e){const t=typeof n=="object"?n:fu(),r=typeof n=="string"?n:xs,s=Po(t,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=Cf("firestore");i&&o_(s,...i)}return s}function ra(n){if(n._terminated)throw new U(D.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||c_(n),n._firestoreClient}function c_(n){var r,s,i,a;const e=n._freezeSettings(),t=i_(n._databaseId,((r=n._app)==null?void 0:r.options.appId)||"",n._persistenceKey,(s=n._app)==null?void 0:s.options.apiKey,e);n._componentsProvider||(i=e.localCache)!=null&&i._offlineComponentProvider&&((a=e.localCache)!=null&&a._onlineComponentProvider)&&(n._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),n._firestoreClient=new Xy(n._authCredentials,n._appCheckCredentials,n._queue,t,n._componentsProvider&&function(u){const d=u==null?void 0:u._online.build();return{_offline:u==null?void 0:u._offline.build(d),_online:d}}(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class je{constructor(e){this._byteString=e}static fromBase64String(e){try{return new je(Ae.fromBase64String(e))}catch(t){throw new U(D.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new je(Ae.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:je._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(Lr(e,je._jsonSchema))return je.fromBase64String(e.bytes)}}je._jsonSchemaVersion="firestore/bytes/1.0",je._jsonSchema={type:pe("string",je._jsonSchemaVersion),bytes:pe("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fd{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new U(D.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Ie(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sa{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tt{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new U(D.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new U(D.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return J(this._lat,e._lat)||J(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:tt._jsonSchemaVersion}}static fromJSON(e){if(Lr(e,tt._jsonSchema))return new tt(e.latitude,e.longitude)}}tt._jsonSchemaVersion="firestore/geoPoint/1.0",tt._jsonSchema={type:pe("string",tt._jsonSchemaVersion),latitude:pe("number"),longitude:pe("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class He{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0}(this._values,e._values)}toJSON(){return{type:He._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Lr(e,He._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(t=>typeof t=="number"))return new He(e.vectorValues);throw new U(D.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}He._jsonSchemaVersion="firestore/vectorValue/1.0",He._jsonSchema={type:pe("string",He._jsonSchemaVersion),vectorValues:pe("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const l_=/^__.*__$/;class u_{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new un(e,this.data,this.fieldMask,t,this.fieldTransforms):new Mr(e,this.data,t,this.fieldTransforms)}}function $d(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw z(40011,{dataSource:n})}}class ia{constructor(e,t,r,s,i,a){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.mc(),this.fieldTransforms=i||[],this.fieldMask=a||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}i(e){return new ia({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}gc(e){var s;const t=(s=this.path)==null?void 0:s.child(e),r=this.i({path:t,arrayElement:!1});return r.yc(e),r}wc(e){var s;const t=(s=this.path)==null?void 0:s.child(e),r=this.i({path:t,arrayElement:!1});return r.mc(),r}Sc(e){return this.i({path:void 0,arrayElement:!0})}bc(e){return Bs(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}mc(){if(this.path)for(let e=0;e<this.path.length;e++)this.yc(this.path.get(e))}yc(e){if(e.length===0)throw this.bc("Document fields must not be empty");if($d(this.dataSource)&&l_.test(e))throw this.bc('Document fields cannot begin and end with "__"')}}class d_{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||ii(e)}V(e,t,r,s=!1){return new ia({dataSource:e,methodName:t,targetDoc:r,path:Ie.emptyPath(),arrayElement:!1,hasConverter:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function h_(n){const e=n._freezeSettings(),t=ii(n._databaseId);return new d_(n._databaseId,!!e.ignoreUndefinedProperties,t)}function f_(n,e,t,r,s,i={}){const a=n.V(i.merge||i.mergeFields?2:0,e,t,s);zd("Data must be an object, but it was:",a,r);const c=Bd(r,a);let u,d;if(i.merge)u=new ze(a.fieldMask),d=a.fieldTransforms;else if(i.mergeFields){const f=[];for(const g of i.mergeFields){const w=aa(e,g,t);if(!a.contains(w))throw new U(D.INVALID_ARGUMENT,`Field '${w}' is specified in your field mask but missing from your input data.`);g_(f,w)||f.push(w)}u=new ze(f),d=a.fieldTransforms.filter(g=>u.covers(g.field))}else u=null,d=a.fieldTransforms;return new u_(new Be(c),u,d)}class oa extends sa{_toFieldTransform(e){return new Zp(e.path,new Ir)}isEqual(e){return e instanceof oa}}function Ud(n,e){if(jd(n=Ne(n)))return zd("Unsupported field value:",e,n),Bd(n,e);if(n instanceof sa)return function(r,s){if(!$d(s.dataSource))throw s.bc(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.bc(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.arrayElement&&e.dataSource!==4)throw e.bc("Nested arrays are not supported");return function(r,s){const i=[];let a=0;for(const c of r){let u=Ud(c,s.Sc(a));u==null&&(u={nullValue:"NULL_VALUE"}),i.push(u),a++}return{arrayValue:{values:i}}}(n,e)}return function(r,s){if((r=Ne(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return Qp(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=oe.fromDate(r);return{timestampValue:Os(s.serializer,i)}}if(r instanceof oe){const i=new oe(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Os(s.serializer,i)}}if(r instanceof tt)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof je)return{bytesValue:rd(s.serializer,r._byteString)};if(r instanceof ve){const i=s.databaseId,a=r.firestore._databaseId;if(!a.isEqual(i))throw s.bc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:jo(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof He)return function(a,c){const u=a instanceof He?a.toArray():a;return{mapValue:{fields:{[Du]:{stringValue:Vu},[ks]:{arrayValue:{values:u.map(f=>{if(typeof f!="number")throw c.bc("VectorValues must only contain numeric values.");return ni(c.serializer,f)})}}}}}}(r,s);if(ud(r))return r._toProto(s.serializer);throw s.bc(`Unsupported field value: ${Do(r)}`)}(n,e)}function Bd(n,e){const t={};return Cu(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):cn(n,(r,s)=>{const i=Ud(s,e.gc(r));i!=null&&(t[r]=i)}),{mapValue:{fields:t}}}function jd(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof oe||n instanceof tt||n instanceof je||n instanceof ve||n instanceof sa||n instanceof He||ud(n))}function zd(n,e,t){if(!jd(t)||!Iu(t)){const r=Do(t);throw r==="an object"?e.bc(n+" a custom object"):e.bc(n+" "+r)}}function aa(n,e,t){if((e=Ne(e))instanceof Fd)return e._internalPath;if(typeof e=="string")return p_(n,e);throw Bs("Field path arguments must be of type string or ",n,!1,void 0,t)}const m_=new RegExp("[~\\*/\\[\\]]");function p_(n,e,t){if(e.search(m_)>=0)throw Bs(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new Fd(...e.split("."))._internalPath}catch{throw Bs(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function Bs(n,e,t,r,s){const i=r&&!r.isEmpty(),a=s!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let u="";return(i||a)&&(u+=" (found",i&&(u+=` in field ${r}`),a&&(u+=` in document ${s}`),u+=")"),new U(D.INVALID_ARGUMENT,c+n+u)}function g_(n,e){return n.some(t=>t.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class y_{convertValue(e,t="none"){switch(Ft(e)){case 0:return null;case 1:return e.booleanValue;case 2:return he(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Ot(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw z(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return cn(e,(s,i)=>{r[s]=this.convertValue(i,t)}),r}convertVectorValue(e){var r,s,i;const t=(i=(s=(r=e.fields)==null?void 0:r[ks].arrayValue)==null?void 0:s.values)==null?void 0:i.map(a=>he(a.doubleValue));return new He(t)}convertGeoPoint(e){return new tt(he(e.latitude),he(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":const r=Js(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(Er(e));default:return null}}convertTimestamp(e){const t=Nt(e);return new oe(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=le.fromString(e);re(ld(r),9688,{name:e});const s=new wr(r.get(1),r.get(3)),i=new B(r.popFirst(5));return s.isEqual(t)||ft(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qd extends y_{constructor(e){super(),this.firestore=e}convertBytes(e){return new je(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new ve(this.firestore,null,t)}}function __(){return new oa("serverTimestamp")}const Rl="@firebase/firestore",Pl="4.15.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xl(n){return function(t,r){if(typeof t!="object"||t===null)return!1;const s=t;for(const i of r)if(i in s&&typeof s[i]=="function")return!0;return!1}(n,["next","error","complete"])}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hd{constructor(e,t,r,s,i){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new ve(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new v_(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){var e;return((e=this._document)==null?void 0:e.data.clone().value.mapValue.fields)??void 0}get(e){if(this._document){const t=this._document.data.field(aa("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class v_ extends Hd{data(){return super.data()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function E_(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new U(D.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}function w_(n,e,t){let r;return r=n?n.toFirestore(e):e,r}class dr{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Zt extends Hd{constructor(e,t,r,s,i,a){super(e,t,r,s,a),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new vs(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(aa("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new U(D.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=Zt._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}Zt._jsonSchemaVersion="firestore/documentSnapshot/1.0",Zt._jsonSchema={type:pe("string",Zt._jsonSchemaVersion),bundleSource:pe("string","DocumentSnapshot"),bundleName:pe("string"),bundle:pe("string")};class vs extends Zt{data(e={}){return super.data(e)}}class In{constructor(e,t,r,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new dr(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new vs(this._firestore,this._userDataWriter,r.key,r,new dr(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new U(D.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(s,i){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map(c=>{const u=new vs(s._firestore,s._userDataWriter,c.doc.key,c.doc,new dr(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);return c.doc,{type:"added",doc:u,oldIndex:-1,newIndex:a++}})}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(c=>i||c.type!==3).map(c=>{const u=new vs(s._firestore,s._userDataWriter,c.doc.key,c.doc,new dr(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);let d=-1,f=-1;return c.type!==0&&(d=a.indexOf(c.doc.key),a=a.delete(c.doc.key)),c.type!==1&&(a=a.add(c.doc),f=a.indexOf(c.doc.key)),{type:T_(c.type),doc:u,oldIndex:d,newIndex:f}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new U(D.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=In._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=ko.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],r=[],s=[];return this.docs.forEach(i=>{i._document!==null&&(t.push(i._document),r.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function T_(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return z(61501,{type:n})}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */In._jsonSchemaVersion="firestore/querySnapshot/1.0",In._jsonSchema={type:pe("string",In._jsonSchemaVersion),bundleSource:pe("string","QuerySnapshot"),bundleName:pe("string"),bundle:pe("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function b_(n){n=Lt(n,ve);const e=Lt(n.firestore,Pr),t=ra(e);return n_(t,n._key).then(r=>Gd(e,n,r))}function I_(n,e,t){n=Lt(n,ve);const r=Lt(n.firestore,Pr),s=w_(n.converter,e),i=h_(r);return C_(r,[f_(i,"setDoc",n._key,s,n.converter!==null,t).toMutation(n._key,ut.none())])}function A_(n,...e){var d,f,g;n=Ne(n);let t={includeMetadataChanges:!1,source:"default"},r=0;typeof e[r]!="object"||xl(e[r])||(t=e[r++]);const s={includeMetadataChanges:t.includeMetadataChanges,source:t.source};if(xl(e[r])){const w=e[r];e[r]=(d=w.next)==null?void 0:d.bind(w),e[r+1]=(f=w.error)==null?void 0:f.bind(w),e[r+2]=(g=w.complete)==null?void 0:g.bind(w)}let i,a,c;if(n instanceof ve)a=Lt(n.firestore,Pr),c=Zs(n._key.path),i={next:w=>{e[r]&&e[r](Gd(a,n,w))},error:e[r+1],complete:e[r+2]};else{const w=Lt(n,ci);a=Lt(w.firestore,Pr),c=w._query;const C=new qd(a);i={next:M=>{e[r]&&e[r](new In(a,C,w,M))},error:e[r+1],complete:e[r+2]},E_(n._query)}const u=ra(a);return t_(u,c,s,i)}function C_(n,e){const t=ra(n);return r_(t,e)}function Gd(n,e,t){const r=t.docs.get(e._key),s=new qd(n);return new Zt(n,s,e._key,r,new dr(t.hasPendingWrites,t.fromCache),e.converter)}(function(e,t=!0){tp(Mn),Rn(new nn("firestore",(r,{instanceIdentifier:s,options:i})=>{const a=r.getProvider("app").getImmediate(),c=new Pr(new sp(r.getProvider("auth-internal")),new ap(a,r.getProvider("app-check-internal")),Ap(a,s),a);return i={useFetchStreams:t,...i},c._setSettings(i),c},"PUBLIC").setMultipleInstances(!0)),kt(Rl,Pl,e),kt(Rl,Pl,"esm2020")})();function Wd(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const S_=Wd,Kd=new kr("auth","Firebase",Wd());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const js=new So("@firebase/auth");function R_(n,...e){js.logLevel<=Z.WARN&&js.warn(`Auth (${Mn}): ${n}`,...e)}function Es(n,...e){js.logLevel<=Z.ERROR&&js.error(`Auth (${Mn}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ge(n,...e){throw ca(n,...e)}function nt(n,...e){return ca(n,...e)}function Yd(n,e,t){const r={...S_(),[e]:t};return new kr("auth","Firebase",r).create(e,{appName:n.name})}function dt(n){return Yd(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function ca(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return Kd.create(n,...e)}function j(n,e,...t){if(!n)throw ca(e,...t)}function ct(n){const e="INTERNAL ASSERTION FAILED: "+n;throw Es(e),new Error(e)}function pt(n,e){n||ct(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wo(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.href)||""}function P_(){return kl()==="http:"||kl()==="https:"}function kl(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function x_(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(P_()||Df()||"connection"in navigator)?navigator.onLine:!0}function k_(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ur{constructor(e,t){this.shortDelay=e,this.longDelay=t,pt(t>e,"Short delay should be less than long delay!"),this.isMobile=Pf()||Vf()}get(){return x_()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function la(n,e){pt(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qd{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;ct("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;ct("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;ct("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const D_={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const V_=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],L_=new Ur(3e4,6e4);function jt(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function yt(n,e,t,r,s={}){return Jd(n,s,async()=>{let i={},a={};r&&(e==="GET"?a=r:i={body:JSON.stringify(r)});const c=Dr({key:n.config.apiKey,...a}).slice(1),u=await n._getAdditionalHeaders();u["Content-Type"]="application/json",n.languageCode&&(u["X-Firebase-Locale"]=n.languageCode);const d={method:e,headers:u,...i};return kf()||(d.referrerPolicy="no-referrer"),n.emulatorConfig&&Vr(n.emulatorConfig.host)&&(d.credentials="include"),Qd.fetch()(await Xd(n,n.config.apiHost,t,c),d)})}async function Jd(n,e,t){n._canInitEmulator=!1;const r={...D_,...e};try{const s=new N_(n),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const a=await i.json();if("needConfirmation"in a)throw hs(n,"account-exists-with-different-credential",a);if(i.ok&&!("errorMessage"in a))return a;{const c=i.ok?a.errorMessage:a.error.message,[u,d]=c.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw hs(n,"credential-already-in-use",a);if(u==="EMAIL_EXISTS")throw hs(n,"email-already-in-use",a);if(u==="USER_DISABLED")throw hs(n,"user-disabled",a);const f=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw Yd(n,f,d);Ge(n,f)}}catch(s){if(s instanceof gt)throw s;Ge(n,"network-request-failed",{message:String(s)})}}async function Br(n,e,t,r,s={}){const i=await yt(n,e,t,r,s);return"mfaPendingCredential"in i&&Ge(n,"multi-factor-auth-required",{_serverResponse:i}),i}async function Xd(n,e,t,r){const s=`${e}${t}?${r}`,i=n,a=i.config.emulator?la(n.config,s):`${n.config.apiScheme}://${s}`;return V_.includes(t)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(a).toString():a}function M_(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class N_{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(nt(this.auth,"network-request-failed")),L_.get())})}}function hs(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const s=nt(n,e,r);return s.customData._tokenResponse=t,s}function Dl(n){return n!==void 0&&n.enterprise!==void 0}class O_{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return M_(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function F_(n,e){return yt(n,"GET","/v2/recaptchaConfig",jt(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $_(n,e){return yt(n,"POST","/v1/accounts:delete",e)}async function zs(n,e){return yt(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yr(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function U_(n,e=!1){const t=Ne(n),r=await t.getIdToken(e),s=ua(r);j(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,a=i==null?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:yr(Wi(s.auth_time)),issuedAtTime:yr(Wi(s.iat)),expirationTime:yr(Wi(s.exp)),signInProvider:a||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function Wi(n){return Number(n)*1e3}function ua(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return Es("JWT malformed, contained fewer than 3 sections"),null;try{const s=iu(t);return s?JSON.parse(s):(Es("Failed to decode base64 JWT payload"),null)}catch(s){return Es("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function Vl(n){const e=ua(n);return j(e,"internal-error"),j(typeof e.exp<"u","internal-error"),j(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Vn(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof gt&&B_(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function B_({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class j_{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class To{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=yr(this.lastLoginAt),this.creationTime=yr(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qs(n){var g;const e=n.auth,t=await n.getIdToken(),r=await Vn(n,zs(e,{idToken:t}));j(r==null?void 0:r.users.length,e,"internal-error");const s=r.users[0];n._notifyReloadListener(s);const i=(g=s.providerUserInfo)!=null&&g.length?Zd(s.providerUserInfo):[],a=q_(n.providerData,i),c=n.isAnonymous,u=!(n.email&&s.passwordHash)&&!(a!=null&&a.length),d=c?u:!1,f={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new To(s.createdAt,s.lastLoginAt),isAnonymous:d};Object.assign(n,f)}async function z_(n){const e=Ne(n);await qs(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function q_(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function Zd(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function H_(n,e){const t=await Jd(n,{},async()=>{const r=Dr({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,a=await Xd(n,s,"/v1/token",`key=${i}`),c=await n._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";const u={method:"POST",headers:c,body:r};return n.emulatorConfig&&Vr(n.emulatorConfig.host)&&(u.credentials="include"),Qd.fetch()(a,u)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function G_(n,e){return yt(n,"POST","/v2/accounts:revokeToken",jt(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class An{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){j(e.idToken,"internal-error"),j(typeof e.idToken<"u","internal-error"),j(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Vl(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){j(e.length!==0,"internal-error");const t=Vl(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(j(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:s,expiresIn:i}=await H_(e,t);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:s,expirationTime:i}=t,a=new An;return r&&(j(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),s&&(j(typeof s=="string","internal-error",{appName:e}),a.accessToken=s),i&&(j(typeof i=="number","internal-error",{appName:e}),a.expirationTime=i),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new An,this.toJSON())}_performRefresh(){return ct("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function It(n,e){j(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class qe{constructor({uid:e,auth:t,stsTokenManager:r,...s}){this.providerId="firebase",this.proactiveRefresh=new j_(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new To(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await Vn(this,this.stsTokenManager.getToken(this.auth,e));return j(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return U_(this,e)}reload(){return z_(this)}_assign(e){this!==e&&(j(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new qe({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){j(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await qs(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Ue(this.auth.app))return Promise.reject(dt(this.auth));const e=await this.getIdToken();return await Vn(this,$_(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const r=t.displayName??void 0,s=t.email??void 0,i=t.phoneNumber??void 0,a=t.photoURL??void 0,c=t.tenantId??void 0,u=t._redirectEventId??void 0,d=t.createdAt??void 0,f=t.lastLoginAt??void 0,{uid:g,emailVerified:w,isAnonymous:C,providerData:M,stsTokenManager:O}=t;j(g&&O,e,"internal-error");const S=An.fromJSON(this.name,O);j(typeof g=="string",e,"internal-error"),It(r,e.name),It(s,e.name),j(typeof w=="boolean",e,"internal-error"),j(typeof C=="boolean",e,"internal-error"),It(i,e.name),It(a,e.name),It(c,e.name),It(u,e.name),It(d,e.name),It(f,e.name);const P=new qe({uid:g,auth:e,email:s,emailVerified:w,displayName:r,isAnonymous:C,photoURL:a,phoneNumber:i,tenantId:c,stsTokenManager:S,createdAt:d,lastLoginAt:f});return M&&Array.isArray(M)&&(P.providerData=M.map(F=>({...F}))),u&&(P._redirectEventId=u),P}static async _fromIdTokenResponse(e,t,r=!1){const s=new An;s.updateFromServerResponse(t);const i=new qe({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await qs(i),i}static async _fromGetAccountInfoResponse(e,t,r){const s=t.users[0];j(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?Zd(s.providerUserInfo):[],a=!(s.email&&s.passwordHash)&&!(i!=null&&i.length),c=new An;c.updateFromIdToken(r);const u=new qe({uid:s.localId,auth:e,stsTokenManager:c,isAnonymous:a}),d={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new To(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(i!=null&&i.length)};return Object.assign(u,d),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ll=new Map;function lt(n){pt(n instanceof Function,"Expected a class definition");let e=Ll.get(n);return e?(pt(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Ll.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eh{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}eh.type="NONE";const Ml=eh;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ws(n,e,t){return`firebase:${n}:${e}:${t}`}class Cn{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=ws(this.userKey,s.apiKey,i),this.fullPersistenceKey=ws("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await zs(this.auth,{idToken:e}).catch(()=>{});return t?qe._fromGetAccountInfoResponse(this.auth,t,e):null}return qe._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new Cn(lt(Ml),e,r);const s=(await Promise.all(t.map(async d=>{if(await d._isAvailable())return d}))).filter(d=>d);let i=s[0]||lt(Ml);const a=ws(r,e.config.apiKey,e.name);let c=null;for(const d of t)try{const f=await d._get(a);if(f){let g;if(typeof f=="string"){const w=await zs(e,{idToken:f}).catch(()=>{});if(!w)break;g=await qe._fromGetAccountInfoResponse(e,w,f)}else g=qe._fromJSON(e,f);d!==i&&(c=g),i=d;break}}catch{}const u=s.filter(d=>d._shouldAllowMigration);return!i._shouldAllowMigration||!u.length?new Cn(i,e,r):(i=u[0],c&&await i._set(a,c.toJSON()),await Promise.all(t.map(async d=>{if(d!==i)try{await d._remove(a)}catch{}})),new Cn(i,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nl(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(sh(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(th(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(oh(e))return"Blackberry";if(ah(e))return"Webos";if(nh(e))return"Safari";if((e.includes("chrome/")||rh(e))&&!e.includes("edge/"))return"Chrome";if(ih(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function th(n=ke()){return/firefox\//i.test(n)}function nh(n=ke()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function rh(n=ke()){return/crios\//i.test(n)}function sh(n=ke()){return/iemobile/i.test(n)}function ih(n=ke()){return/android/i.test(n)}function oh(n=ke()){return/blackberry/i.test(n)}function ah(n=ke()){return/webos/i.test(n)}function da(n=ke()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function W_(n=ke()){var e;return da(n)&&!!((e=window.navigator)!=null&&e.standalone)}function K_(){return Lf()&&document.documentMode===10}function ch(n=ke()){return da(n)||ih(n)||ah(n)||oh(n)||/windows phone/i.test(n)||sh(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lh(n,e=[]){let t;switch(n){case"Browser":t=Nl(ke());break;case"Worker":t=`${Nl(ke())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Mn}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Y_{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=i=>new Promise((a,c)=>{try{const u=e(i);a(u)}catch(u){c(u)}});r.onAbort=t,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Q_(n,e={}){return yt(n,"GET","/v2/passwordPolicy",jt(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const J_=6;class X_{constructor(e){var r;const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??J_,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((r=e.allowedNonAlphanumericCharacters)==null?void 0:r.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Z_{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Ol(this),this.idTokenSubscription=new Ol(this),this.beforeStateQueue=new Y_(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Kd,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=lt(t)),this._initializationPromise=this.queue(async()=>{var r,s,i;if(!this._deleted&&(this.persistenceManager=await Cn.create(this,e),(r=this._resolvePersistenceManagerAvailable)==null||r.call(this),!this._deleted)){if((s=this._popupRedirectResolver)!=null&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)==null?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await zs(this,{idToken:e}),r=await qe._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var i;if(Ue(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(c,c))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let r=t,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(i=this.redirectUser)==null?void 0:i._redirectEventId,c=r==null?void 0:r._redirectEventId,u=await this.tryRedirectSignIn(e);(!a||a===c)&&(u!=null&&u.user)&&(r=u.user,s=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(r)}catch(a){r=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return j(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await qs(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=k_()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Ue(this.app))return Promise.reject(dt(this));const t=e?Ne(e):null;return t&&j(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&j(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Ue(this.app)?Promise.reject(dt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Ue(this.app)?Promise.reject(dt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(lt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Q_(this),t=new X_(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new kr("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await G_(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&lt(e)||this._popupRedirectResolver;j(t,this,"argument-error"),this.redirectPersistenceManager=await Cn.create(this,[lt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)==null?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)==null?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((t=this.currentUser)==null?void 0:t.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let a=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(j(c,this,"internal-error"),c.then(()=>{a||i(this.currentUser)}),typeof t=="function"){const u=e.addObserver(t,r,s);return()=>{a=!0,u()}}else{const u=e.addObserver(t);return()=>{a=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return j(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=lh(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var s;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await((s=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:s.getHeartbeatsHeader());t&&(e["X-Firebase-Client"]=t);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){var t;if(Ue(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((t=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:t.getToken());return e!=null&&e.error&&R_(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function hn(n){return Ne(n)}class Ol{constructor(e){this.auth=e,this.observer=null,this.addObserver=jf(t=>this.observer=t)}get next(){return j(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let li={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function ev(n){li=n}function uh(n){return li.loadJS(n)}function tv(){return li.recaptchaEnterpriseScript}function nv(){return li.gapiScript}function rv(n){return`__${n}${Math.floor(Math.random()*1e6)}`}class sv{constructor(){this.enterprise=new iv}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class iv{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const ov="recaptcha-enterprise",dh="NO_RECAPTCHA";class av{constructor(e){this.type=ov,this.auth=hn(e)}async verify(e="verify",t=!1){async function r(i){if(!t){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(a,c)=>{F_(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(u=>{if(u.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{const d=new O_(u);return i.tenantId==null?i._agentRecaptchaConfig=d:i._tenantRecaptchaConfigs[i.tenantId]=d,a(d.siteKey)}}).catch(u=>{c(u)})})}function s(i,a,c){const u=window.grecaptcha;Dl(u)?u.enterprise.ready(()=>{u.enterprise.execute(i,{action:e}).then(d=>{a(d)}).catch(()=>{a(dh)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new sv().execute("siteKey",{action:"verify"}):new Promise((i,a)=>{r(this.auth).then(c=>{if(!t&&Dl(window.grecaptcha))s(c,i,a);else{if(typeof window>"u"){a(new Error("RecaptchaVerifier is only supported in browser"));return}let u=tv();u.length!==0&&(u+=c),uh(u).then(()=>{s(c,i,a)}).catch(d=>{a(d)})}}).catch(c=>{a(c)})})}}async function Fl(n,e,t,r=!1,s=!1){const i=new av(n);let a;if(s)a=dh;else try{a=await i.verify(t)}catch{a=await i.verify(t,!0)}const c={...e};if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in c){const u=c.phoneEnrollmentInfo.phoneNumber,d=c.phoneEnrollmentInfo.recaptchaToken;Object.assign(c,{phoneEnrollmentInfo:{phoneNumber:u,recaptchaToken:d,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in c){const u=c.phoneSignInInfo.recaptchaToken;Object.assign(c,{phoneSignInInfo:{recaptchaToken:u,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return c}return r?Object.assign(c,{captchaResp:a}):Object.assign(c,{captchaResponse:a}),Object.assign(c,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(c,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),c}async function bo(n,e,t,r,s){var i;if((i=n._getRecaptchaConfig())!=null&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const a=await Fl(n,e,t,t==="getOobCode");return r(n,a)}else return r(n,e).catch(async a=>{if(a.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const c=await Fl(n,e,t,t==="getOobCode");return r(n,c)}else return Promise.reject(a)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cv(n,e){const t=Po(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(tn(i,e??{}))return s;Ge(s,"already-initialized")}return t.initialize({options:e})}function lv(n,e){const t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(lt);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function uv(n,e,t){const r=hn(n);j(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=hh(e),{host:a,port:c}=dv(e),u=c===null?"":`:${c}`,d={url:`${i}//${a}${u}/`},f=Object.freeze({host:a,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){j(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),j(tn(d,r.config.emulator)&&tn(f,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=d,r.emulatorConfig=f,r.settings.appVerificationDisabledForTesting=!0,Vr(a)?lu(`${i}//${a}${u}`):hv()}function hh(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function dv(n){const e=hh(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:$l(r.substr(i.length+1))}}else{const[i,a]=r.split(":");return{host:i,port:$l(a)}}}function $l(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function hv(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ha{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return ct("not implemented")}_getIdTokenResponse(e){return ct("not implemented")}_linkToIdToken(e,t){return ct("not implemented")}_getReauthenticationResolver(e){return ct("not implemented")}}async function fv(n,e){return yt(n,"POST","/v1/accounts:update",e)}async function mv(n,e){return yt(n,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function pv(n,e){return Br(n,"POST","/v1/accounts:signInWithPassword",jt(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function gv(n,e){return Br(n,"POST","/v1/accounts:signInWithEmailLink",jt(n,e))}async function yv(n,e){return Br(n,"POST","/v1/accounts:signInWithEmailLink",jt(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xr extends ha{constructor(e,t,r,s=null){super("password",r),this._email=e,this._password=t,this._tenantId=s}static _fromEmailAndPassword(e,t){return new xr(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new xr(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return bo(e,t,"signInWithPassword",pv);case"emailLink":return gv(e,{email:this._email,oobCode:this._password});default:Ge(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return bo(e,r,"signUpPassword",mv);case"emailLink":return yv(e,{idToken:t,email:this._email,oobCode:this._password});default:Ge(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Sn(n,e){return Br(n,"POST","/v1/accounts:signInWithIdp",jt(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _v="http://localhost";class on extends ha{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new on(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Ge("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s,...i}=t;if(!r||!s)return null;const a=new on(r,s);return a.idToken=i.idToken||void 0,a.accessToken=i.accessToken||void 0,a.secret=i.secret,a.nonce=i.nonce,a.pendingToken=i.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return Sn(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,Sn(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Sn(e,t)}buildRequest(){const e={requestUri:_v,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Dr(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vv(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Ev(n){const e=or(ar(n)).link,t=e?or(ar(e)).deep_link_id:null,r=or(ar(n)).deep_link_id;return(r?or(ar(r)).link:null)||r||t||e||n}class fa{constructor(e){const t=or(ar(e)),r=t.apiKey??null,s=t.oobCode??null,i=vv(t.mode??null);j(r&&s&&i,"argument-error"),this.apiKey=r,this.operation=i,this.code=s,this.continueUrl=t.continueUrl??null,this.languageCode=t.lang??null,this.tenantId=t.tenantId??null}static parseLink(e){const t=Ev(e);try{return new fa(t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Un{constructor(){this.providerId=Un.PROVIDER_ID}static credential(e,t){return xr._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const r=fa.parseLink(t);return j(r,"argument-error"),xr._fromEmailAndCode(e,r.code,r.tenantId)}}Un.PROVIDER_ID="password";Un.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Un.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fh{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jr extends fh{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class At extends jr{constructor(){super("facebook.com")}static credential(e){return on._fromParams({providerId:At.PROVIDER_ID,signInMethod:At.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return At.credentialFromTaggedObject(e)}static credentialFromError(e){return At.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return At.credential(e.oauthAccessToken)}catch{return null}}}At.FACEBOOK_SIGN_IN_METHOD="facebook.com";At.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ct extends jr{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return on._fromParams({providerId:Ct.PROVIDER_ID,signInMethod:Ct.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Ct.credentialFromTaggedObject(e)}static credentialFromError(e){return Ct.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return Ct.credential(t,r)}catch{return null}}}Ct.GOOGLE_SIGN_IN_METHOD="google.com";Ct.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class St extends jr{constructor(){super("github.com")}static credential(e){return on._fromParams({providerId:St.PROVIDER_ID,signInMethod:St.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return St.credentialFromTaggedObject(e)}static credentialFromError(e){return St.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return St.credential(e.oauthAccessToken)}catch{return null}}}St.GITHUB_SIGN_IN_METHOD="github.com";St.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rt extends jr{constructor(){super("twitter.com")}static credential(e,t){return on._fromParams({providerId:Rt.PROVIDER_ID,signInMethod:Rt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Rt.credentialFromTaggedObject(e)}static credentialFromError(e){return Rt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return Rt.credential(t,r)}catch{return null}}}Rt.TWITTER_SIGN_IN_METHOD="twitter.com";Rt.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function wv(n,e){return Br(n,"POST","/v1/accounts:signUp",jt(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class an{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){const i=await qe._fromIdTokenResponse(e,r,s),a=Ul(r);return new an({user:i,providerId:a,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const s=Ul(r);return new an({user:e,providerId:s,_tokenResponse:r,operationType:t})}}function Ul(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hs extends gt{constructor(e,t,r,s){super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,Hs.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new Hs(e,t,r,s)}}function mh(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?Hs._fromErrorAndOperation(n,i,e,r):i})}async function Tv(n,e,t=!1){const r=await Vn(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return an._forOperation(n,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function bv(n,e,t=!1){const{auth:r}=n;if(Ue(r.app))return Promise.reject(dt(r));const s="reauthenticate";try{const i=await Vn(n,mh(r,s,e,n),t);j(i.idToken,r,"internal-error");const a=ua(i.idToken);j(a,r,"internal-error");const{sub:c}=a;return j(n.uid===c,r,"user-mismatch"),an._forOperation(n,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&Ge(r,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ph(n,e,t=!1){if(Ue(n.app))return Promise.reject(dt(n));const r="signIn",s=await mh(n,r,e),i=await an._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(i.user),i}async function Iv(n,e){return ph(hn(n),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function gh(n){const e=hn(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function Av(n,e,t){if(Ue(n.app))return Promise.reject(dt(n));const r=hn(n),a=await bo(r,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",wv).catch(u=>{throw u.code==="auth/password-does-not-meet-requirements"&&gh(n),u}),c=await an._fromIdTokenResponse(r,"signIn",a);return await r._updateCurrentUser(c.user),c}function Cv(n,e,t){return Ue(n.app)?Promise.reject(dt(n)):Iv(Ne(n),Un.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&gh(n),r})}function Sv(n,e){return Rv(Ne(n),null,e)}async function Rv(n,e,t){const{auth:r}=n,i={idToken:await n.getIdToken(),returnSecureToken:!0};t&&(i.password=t);const a=await Vn(n,fv(r,i));await n._updateTokensIfNecessary(a,!0)}function Pv(n,e,t,r){return Ne(n).onIdTokenChanged(e,t,r)}function xv(n,e,t){return Ne(n).beforeAuthStateChanged(e,t)}function kv(n,e,t,r){return Ne(n).onAuthStateChanged(e,t,r)}function Dv(n){return Ne(n).signOut()}const Gs="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yh{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Gs,"1"),this.storage.removeItem(Gs),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vv=1e3,Lv=10;class _h extends yh{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=ch(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,c,u)=>{this.notifyListeners(a,u)});return}const r=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const a=this.storage.getItem(r);!t&&this.localCache[r]===a||this.notifyListeners(r,a)},i=this.storage.getItem(r);K_()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,Lv):s()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},Vv)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}_h.type="LOCAL";const Mv=_h;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vh extends yh{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}vh.type="SESSION";const Eh=vh;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nv(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ui{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const r=new ui(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:s,data:i}=t.data,a=this.handlersMap[s];if(!(a!=null&&a.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const c=Array.from(a).map(async d=>d(t.origin,i)),u=await Nv(c);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:u})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}ui.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ma(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ov{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,a;return new Promise((c,u)=>{const d=ma("",20);s.port1.start();const f=setTimeout(()=>{u(new Error("unsupported_event"))},r);a={messageChannel:s,onMessage(g){const w=g;if(w.data.eventId===d)switch(w.data.status){case"ack":clearTimeout(f),i=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(w.data.response);break;default:clearTimeout(f),clearTimeout(i),u(new Error("invalid_response"));break}}},this.handlers.add(a),s.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:d,data:t},[s.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rt(){return window}function Fv(n){rt().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wh(){return typeof rt().WorkerGlobalScope<"u"&&typeof rt().importScripts=="function"}async function $v(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Uv(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)==null?void 0:n.controller)||null}function Bv(){return wh()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Th="firebaseLocalStorageDb",jv=1,Ws="firebaseLocalStorage",bh="fbase_key";class zr{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function di(n,e){return n.transaction([Ws],e?"readwrite":"readonly").objectStore(Ws)}function zv(){const n=indexedDB.deleteDatabase(Th);return new zr(n).toPromise()}function Ih(){const n=indexedDB.open(Th,jv);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(Ws,{keyPath:bh})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(Ws)?e(r):(r.close(),await zv(),e(await Ih()))})})}async function Bl(n,e,t){const r=di(n,!0).put({[bh]:e,value:t});return new zr(r).toPromise()}async function qv(n,e){const t=di(n,!1).get(e),r=await new zr(t).toPromise();return r===void 0?null:r.value}function jl(n,e){const t=di(n,!0).delete(e);return new zr(t).toPromise()}const Hv=800,Gv=3;class Ah{constructor(){this.type="LOCAL",this.dbPromise=null,this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.dbPromise?this.dbPromise:(this.dbPromise=Ih(),this.dbPromise.catch(()=>{this.dbPromise=null}),this.dbPromise)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>Gv)throw r;this.dbPromise&&((await this.dbPromise).close(),this.dbPromise=null)}}async initializeServiceWorkerMessaging(){return wh()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=ui._getInstance(Bv()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var t,r;if(this.activeServiceWorker=await $v(),!this.activeServiceWorker)return;this.sender=new Ov(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(t=e[0])!=null&&t.fulfilled&&(r=e[0])!=null&&r.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Uv()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{return indexedDB?(await this._withRetries(async e=>{await Bl(e,Gs,"1"),await jl(e,Gs)}),!0):!1}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>Bl(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>qv(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>jl(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=di(s,!1).getAll();return new zr(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Hv)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Ah.type="LOCAL";const Wv=Ah;new Ur(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kv(n,e){return e?lt(e):(j(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pa extends ha{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Sn(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Sn(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Sn(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function Yv(n){return ph(n.auth,new pa(n),n.bypassAuthState)}function Qv(n){const{auth:e,user:t}=n;return j(t,e,"internal-error"),bv(t,new pa(n),n.bypassAuthState)}async function Jv(n){const{auth:e,user:t}=n;return j(t,e,"internal-error"),Tv(t,new pa(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ch{constructor(e,t,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:s,tenantId:i,error:a,type:c}=e;if(a){this.reject(a);return}const u={auth:this.auth,requestUri:t,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(u))}catch(d){this.reject(d)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Yv;case"linkViaPopup":case"linkViaRedirect":return Jv;case"reauthViaPopup":case"reauthViaRedirect":return Qv;default:Ge(this.auth,"internal-error")}}resolve(e){pt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){pt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xv=new Ur(2e3,1e4);class wn extends Ch{constructor(e,t,r,s,i){super(e,t,s,i),this.provider=r,this.authWindow=null,this.pollId=null,wn.currentPopupAction&&wn.currentPopupAction.cancel(),wn.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return j(e,this.auth,"internal-error"),e}async onExecution(){pt(this.filter.length===1,"Popup operations only handle one event");const e=ma();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(nt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(nt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,wn.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if((r=(t=this.authWindow)==null?void 0:t.window)!=null&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(nt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Xv.get())};e()}}wn.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zv="pendingRedirect",Ts=new Map;class eE extends Ch{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=Ts.get(this.auth._key());if(!e){try{const r=await tE(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}Ts.set(this.auth._key(),e)}return this.bypassAuthState||Ts.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function tE(n,e){const t=sE(e),r=rE(n);if(!await r._isAvailable())return!1;const s=await r._get(t)==="true";return await r._remove(t),s}function nE(n,e){Ts.set(n._key(),e)}function rE(n){return lt(n._redirectPersistence)}function sE(n){return ws(Zv,n.config.apiKey,n.name)}async function iE(n,e,t=!1){if(Ue(n.app))return Promise.reject(dt(n));const r=hn(n),s=Kv(r,e),a=await new eE(r,s,t).execute();return a&&!t&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oE=10*60*1e3;class aE{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!cE(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!Sh(e)){const s=((r=e.error.code)==null?void 0:r.split("auth/")[1])||"internal-error";t.onError(nt(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=oE&&this.cachedEventUids.clear(),this.cachedEventUids.has(zl(e))}saveEventToCache(e){this.cachedEventUids.add(zl(e)),this.lastProcessedEventTime=Date.now()}}function zl(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Sh({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function cE(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Sh(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function lE(n,e={}){return yt(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uE=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,dE=/^https?/;async function hE(n){if(n.config.emulator)return;const{authorizedDomains:e}=await lE(n);for(const t of e)try{if(fE(t))return}catch{}Ge(n,"unauthorized-domain")}function fE(n){const e=wo(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===r}if(!dE.test(t))return!1;if(uE.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mE=new Ur(3e4,6e4);function ql(){const n=rt().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function pE(n){return new Promise((e,t)=>{var s,i,a;function r(){ql(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{ql(),t(nt(n,"network-request-failed"))},timeout:mE.get()})}if((i=(s=rt().gapi)==null?void 0:s.iframes)!=null&&i.Iframe)e(gapi.iframes.getContext());else if((a=rt().gapi)!=null&&a.load)r();else{const c=rv("iframefcb");return rt()[c]=()=>{gapi.load?r():t(nt(n,"network-request-failed"))},uh(`${nv()}?onload=${c}`).catch(u=>t(u))}}).catch(e=>{throw bs=null,e})}let bs=null;function gE(n){return bs=bs||pE(n),bs}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yE=new Ur(5e3,15e3),_E="__/auth/iframe",vE="emulator/auth/iframe",EE={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},wE=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function TE(n){const e=n.config;j(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?la(e,vE):`https://${n.config.authDomain}/${_E}`,r={apiKey:e.apiKey,appName:n.name,v:Mn},s=wE.get(n.config.apiHost);s&&(r.eid=s);const i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${t}?${Dr(r).slice(1)}`}async function bE(n){const e=await gE(n),t=rt().gapi;return j(t,n,"internal-error"),e.open({where:document.body,url:TE(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:EE,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const a=nt(n,"network-request-failed"),c=rt().setTimeout(()=>{i(a)},yE.get());function u(){rt().clearTimeout(c),s(r)}r.ping(u).then(u,()=>{i(a)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const IE={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},AE=500,CE=600,SE="_blank",RE="http://localhost";class Hl{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function PE(n,e,t,r=AE,s=CE){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const u={...IE,width:r.toString(),height:s.toString(),top:i,left:a},d=ke().toLowerCase();t&&(c=rh(d)?SE:t),th(d)&&(e=e||RE,u.scrollbars="yes");const f=Object.entries(u).reduce((w,[C,M])=>`${w}${C}=${M},`,"");if(W_(d)&&c!=="_self")return xE(e||"",c),new Hl(null);const g=window.open(e||"",c,f);j(g,n,"popup-blocked");try{g.focus()}catch{}return new Hl(g)}function xE(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kE="__/auth/handler",DE="emulator/auth/handler",VE=encodeURIComponent("fac");async function Gl(n,e,t,r,s,i){j(n.config.authDomain,n,"auth-domain-config-required"),j(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:Mn,eventId:s};if(e instanceof fh){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",Bf(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,g]of Object.entries({}))a[f]=g}if(e instanceof jr){const f=e.getScopes().filter(g=>g!=="");f.length>0&&(a.scopes=f.join(","))}n.tenantId&&(a.tid=n.tenantId);const c=a;for(const f of Object.keys(c))c[f]===void 0&&delete c[f];const u=await n._getAppCheckToken(),d=u?`#${VE}=${encodeURIComponent(u)}`:"";return`${LE(n)}?${Dr(c).slice(1)}${d}`}function LE({config:n}){return n.emulator?la(n,DE):`https://${n.authDomain}/${kE}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ki="webStorageSupport";class ME{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Eh,this._completeRedirectFn=iE,this._overrideRedirectResult=nE}async _openPopup(e,t,r,s){var a;pt((a=this.eventManagers[e._key()])==null?void 0:a.manager,"_initialize() not called before _openPopup()");const i=await Gl(e,t,r,wo(),s);return PE(e,i,ma())}async _openRedirect(e,t,r,s){await this._originValidation(e);const i=await Gl(e,t,r,wo(),s);return Fv(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(pt(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await bE(e),r=new aE(e);return t.register("authEvent",s=>(j(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Ki,{type:Ki},s=>{var a;const i=(a=s==null?void 0:s[0])==null?void 0:a[Ki];i!==void 0&&t(!!i),Ge(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=hE(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return ch()||nh()||da()}}const NE=ME;var Wl="@firebase/auth",Kl="1.13.2";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class OE{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){j(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function FE(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function $E(n){Rn(new nn("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:a,authDomain:c}=r.options;j(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:a,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:lh(n)},d=new Z_(r,s,i,u);return lv(d,t),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Rn(new nn("auth-internal",e=>{const t=hn(e.getProvider("auth").getImmediate());return(r=>new OE(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),kt(Wl,Kl,FE(n)),kt(Wl,Kl,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const UE=5*60,BE=cu("authIdTokenMaxAge")||UE;let Yl=null;const jE=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>BE)return;const s=t==null?void 0:t.token;Yl!==s&&(Yl=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function zE(n=fu()){const e=Po(n,"auth");if(e.isInitialized())return e.getImmediate();const t=cv(n,{popupRedirectResolver:NE,persistence:[Wv,Mv,Eh]}),r=cu("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const a=jE(i.toString());xv(t,a,()=>a(t.currentUser)),Pv(t,c=>a(c))}}const s=ou("auth");return s&&uv(t,`http://${s}`),t}function qE(){var n;return((n=document.getElementsByTagName("head"))==null?void 0:n[0])??document}ev({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{const i=nt("internal-error");i.customData=s,t(i)},r.type="text/javascript",r.charset="UTF-8",qE().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});$E("Browser");const HE={apiKey:"AIzaSyCMJbPKQ434-pSvCXnleNkancO1RN7kn_Y",authDomain:"billar-system.firebaseapp.com",projectId:"billar-system",storageBucket:"billar-system.firebasestorage.app",messagingSenderId:"503671587493",appId:"1:503671587493:web:88e1a1ddfb7bd21ba4c34c"},Rh=hu(HE),Yi=a_(Rh),ir=zE(Rh);const G={USUARIOS:"usuarios",VENTAS:"ventas",PRODUCTOS:"productos",MESAS:"mesas",ERRORES:"errores",CIERRES:"cierres",CONSUMOS:"consumos",CONFIGURACION:"configuracion",CAJA:"caja",LOTES:"lotes_agotados"},Q={TODOS:"todos",TODAS:"todas",BILLAR:"billar",CONSUMO:"consumo",HISTORIAL:"historial",DUENO:"dueno",GENERAL:"general"},Ph={TIEMPO_EXPIRACION:30*60*1e3},Je={signIn:async(n,e)=>Cv(ir,n,e),signOut:async()=>Dv(ir),onAuthChange:n=>kv(ir,n),getCurrentUser:()=>ir.currentUser,createUser:async(n,e)=>Av(ir,n,e),updatePassword:async(n,e)=>Sv(n,e)};let xh=!1;setTimeout(()=>{xh=!0},500);const Le={isReady:()=>xh,get:async(n,e)=>{try{`${n}${e}`;const t=Gi(Yi,n,e),r=await b_(t);return r.exists()?r.data():(`${n}${e}`,null)}catch(t){throw t}},listen:(n,e,t)=>{try{`${n}${e}`;const r=Gi(Yi,n,e);return A_(r,s=>{s.exists()?t(s.data()):t(null)},s=>{`${n}${e}`})}catch(r){throw r}},set:async(n,e,t)=>{try{`${n}${e}`;const r=Gi(Yi,n,e),s={...t,ultimaActualizacion:__()};return await I_(r,s),!0}catch(r){throw r}}};class GE{constructor(){this.container=null,this.initContainer()}initContainer(){this.container||(this.container=document.createElement("div"),this.container.id="toastContainer",this.container.className="toast-container",document.body.appendChild(this.container))}show(e,t,r=3500){this.initContainer();const s=document.createElement("div");s.className=`toast toast-${e}`;const i={success:"✅",error:"❌",warning:"⚠️",info:"ℹ️"};s.innerHTML=`
      <span class="toast-icon">${i[e]||""}</span>
      <span class="toast-message">${t}</span>
      <span class="toast-close">&times;</span>
    `,this.container.appendChild(s),`${e.toUpperCase()}${t}`,requestAnimationFrame(()=>{s.classList.add("toast-show")});const a=s.querySelector(".toast-close"),c=()=>{s.classList.remove("toast-show"),s.classList.add("out"),s.addEventListener("animationend",()=>{s.remove()})};a.addEventListener("click",c),setTimeout(()=>{s.parentNode&&c()},r)}success(e,t){this.show("success",e,t)}error(e,t){this.show("error",e,t)}warning(e,t){this.show("warning",e,t)}info(e,t){this.show("info",e,t)}}const x=new GE;window.toast=x;const m={usuarioActual:null,usuarios:[],mesas:[],mesasConsumo:[],ventas:[],productos:[],erroresReportados:[],cierres:[],lotesAgotados:[],consumosDueno:[],movimientos:[],ultimoCierre:null,config:{tarifaHora:5,tarifaExtra5Min:1},limiteVentas:20,limiteMovimientos:20,limiteCierres:10,tabActual:null,ordenInventarioActual:"default",timers:{},modulosCargados:{ventas:!1,caja:!1,inventario:!1,reportes:!1,errores:!1,consumoDueno:!1}};async function WE(){const n=Date.now();try{const[e,t,r,s,i,a,c]=await Promise.all([Le.get(G.USUARIOS,Q.TODOS),Le.get(G.CONFIGURACION,Q.GENERAL),Le.get(G.PRODUCTOS,Q.TODOS),Le.get(G.MESAS,Q.BILLAR),Le.get(G.MESAS,Q.CONSUMO),Le.get(G.VENTAS,Q.TODAS),Le.get(G.CIERRES,Q.HISTORIAL)]);if(m.usuarios=(e==null?void 0:e.lista)||[],t){m.config={tarifaHora:parseFloat(t.tarifaHora)||5,tarifaExtra5Min:parseFloat(t.tarifaExtra5Min)||1};const d=document.getElementById("tarifaHora"),f=document.getElementById("tarifaExtra5Min");d&&(d.value=m.config.tarifaHora.toFixed(2)),f&&(f.value=m.config.tarifaExtra5Min.toFixed(2))}m.productos=(r==null?void 0:r.lista)||[],s&&s.lista?m.mesas=s.lista:(m.mesas=Array.from({length:4},(d,f)=>({id:f+1,ocupada:!1,inicio:null,tiempoTranscurrido:0,consumos:[]})),await ae(G.MESAS,Q.BILLAR,{lista:m.mesas},!0)),i&&i.lista?m.mesasConsumo=i.lista:(m.mesasConsumo=Array.from({length:2},(d,f)=>({id:f+1,ocupada:!1,consumos:[],total:0})),await ae(G.MESAS,Q.CONSUMO,{lista:m.mesasConsumo},!0)),m.ventas=(a==null?void 0:a.lista)||[],m.modulosCargados.ventas=!0,m.cierres=(c==null?void 0:c.lista)||[],m.cierres.length>0&&(m.ultimoCierre=m.cierres[m.cierres.length-1].timestamp);const u=Date.now()-n;`${u}`}catch(e){throw e}}async function KE(n){const e=m.modulosCargados;try{switch(n){case"caja":{if(e.caja)return;const t=await Le.get(G.CAJA,Q.HISTORIAL);m.movimientos=(t==null?void 0:t.lista)||[],e.caja=!0;break}case"inventario":{if(e.inventario)return;const[t,r]=await Promise.all([Le.get(G.PRODUCTOS,Q.TODOS),Le.get(G.LOTES,Q.TODOS)]);m.productos=(t==null?void 0:t.lista)||[],m.lotesAgotados=(r==null?void 0:r.lista)||[],e.inventario=!0;break}case"ventas":{if(e.ventas)return;e.ventas=!0;break}case"reportes":case"dashboard":case"mensual":{if(e.reportes)return;const[t]=await Promise.all([Le.get(G.CONSUMOS,Q.DUENO)]);m.consumosDueno=((t==null?void 0:t.lista)||[]).map(r=>({...r,total:r.total!==void 0?r.total:r.totalVenta||0})),e.reportes=!0,e.consumoDueno=!0,e.ventas=!0;break}case"errores":{if(e.errores)return;const t=await Le.get(G.ERRORES,Q.TODOS);m.erroresReportados=(t==null?void 0:t.lista)||[],e.errores=!0;break}case"consumoDueno":{if(e.consumoDueno)return;const t=await Le.get(G.CONSUMOS,Q.DUENO);m.consumosDueno=((t==null?void 0:t.lista)||[]).map(r=>({...r,total:r.total!==void 0?r.total:r.totalVenta||0})),e.consumoDueno=!0;break}default:break}}catch(t){throw t}}async function ae(n,e,t,r=!1){try{if(!r&&t&&Array.isArray(t.lista))try{const s=await Le.get(n,e);if(s&&Array.isArray(s.lista)){const i=new Map;t.lista.forEach(c=>{c&&c.id&&i.set(c.id,c)});let a=!1;s.lista.forEach(c=>{c&&c.id&&!i.has(c.id)&&(t.lista.push(c),a=!0)}),a&&(n===G.CAJA||n===G.CONSUMOS?t.lista.sort((c,u)=>u.id-c.id):(n===G.VENTAS||n===G.CIERRES)&&t.lista.sort((c,u)=>c.id-u.id),n===G.VENTAS&&(m.ventas=t.lista),n===G.CAJA&&(m.movimientos=t.lista),n===G.PRODUCTOS&&(m.productos=t.lista),n===G.CONSUMOS&&(m.consumosDueno=t.lista),`${n}${e}`,void 0)}}catch(s){console.warn("⚠️ No se pudo sincronizar antes de guardar:",s)}return await Le.set(n,e,t),`${n}${e}`,!0}catch{return x.error(`Error al guardar datos en ${n}`),!1}}class YE{constructor(){this.dialogEl=null}show(e,t,r={}){const{confirmText:s="Aceptar",cancelText:i="Cancelar",isDestructive:a=!1}=r;return new Promise(c=>{this.close(),this.dialogEl=document.createElement("div"),this.dialogEl.className="confirm-dialog-overlay";const u=a?"btn-red":"btn-green";this.dialogEl.innerHTML=`
        <div class="confirm-dialog">
          <div class="confirm-header ${a?"destructive":""}">
            <h3>${e}</h3>
          </div>
          <div class="confirm-body">
            <p>${t.replace(/\n/g,"<br>")}</p>
          </div>
          <div class="confirm-dialog-btns">
            <button id="confirmCancelBtn" class="btn btn-gray">${i}</button>
            <button id="confirmOkBtn" class="btn ${u}">${s}</button>
          </div>
        </div>
      `,document.body.appendChild(this.dialogEl),requestAnimationFrame(()=>{this.dialogEl.classList.add("confirm-overlay-show"),this.dialogEl.querySelector(".confirm-dialog").classList.add("confirm-card-show")});const d=this.dialogEl.querySelector("#confirmCancelBtn"),f=this.dialogEl.querySelector("#confirmOkBtn"),g=C=>{c(C),this.close()};d.addEventListener("click",()=>g(!1)),f.addEventListener("click",()=>g(!0));const w=C=>{C.key==="Escape"&&(document.removeEventListener("keydown",w),g(!1))};document.addEventListener("keydown",w)})}close(){if(this.dialogEl&&this.dialogEl.parentNode){const e=this.dialogEl.querySelector(".confirm-dialog");e&&e.classList.remove("confirm-card-show"),this.dialogEl.classList.remove("confirm-overlay-show");const t=this.dialogEl;this.dialogEl=null,setTimeout(()=>{t.parentNode&&t.remove()},250)}}}const fe=new YE;window.confirmDialog=fe;let Is=null,Ql=0;function Io(){if(m.usuarioActual){const n=Date.now();n-Ql>1e3&&(localStorage.setItem("ultimaActividad",n.toString()),Ql=n)}}function QE(){if(!m.usuarioActual)return;const n=parseInt(localStorage.getItem("ultimaActividad")||"0");Date.now()-n>=Ph.TIEMPO_EXPIRACION&&XE()}function JE(){Io(),["mousedown","mousemove","keypress","scroll","touchstart","click"].forEach(e=>{document.addEventListener(e,Io,!0)}),Is=setInterval(QE,6e4)}function kh(){Is&&(clearInterval(Is),Is=null),["mousedown","mousemove","keypress","scroll","touchstart","click"].forEach(e=>{document.removeEventListener(e,Io,!0)})}async function XE(){m.usuarioActual=null,localStorage.removeItem("ultimaActividad"),kh();try{await Je.signOut()}catch(n){console.warn("Error cerrando sesión Firebase:",n)}Dh(),x.warning("🔒 Tu sesión se cerró automáticamente por 30 minutos de inactividad.")}function Dh(){var n,e;(n=document.getElementById("loginScreen"))==null||n.classList.remove("hidden"),(e=document.getElementById("mainScreen"))==null||e.classList.add("hidden")}function ZE(){const n=document.getElementById("loginScreen"),e=document.getElementById("mainScreen");if(!n||!e){x.error("Error: Elementos de la interfaz no encontrados. Recarga la página.");return}n.classList.add("hidden"),e.classList.remove("hidden");const t=document.getElementById("userName"),r=document.getElementById("userRole");t&&(t.textContent=m.usuarioActual.nombre),r&&(r.textContent=(m.usuarioActual.rol||"").toUpperCase()),JE(),ew()}function ew(){var t;const n=(((t=m.usuarioActual)==null?void 0:t.rol)||"").toLowerCase(),e=(r,s)=>{const i=document.getElementById(r);i&&(s?i.classList.remove("hidden"):i.classList.add("hidden"))};n==="admin"?(e("btnUsuarios",!0),e("btnAgregarMesa",!0),e("btnAgregarMesaConsumo",!0),e("btnTabErrores",!0),e("btnReportarError",!1),e("btnAgregarProducto",!0),e("btnTabConsumoDueno",!0),e("btnTabDashboard",!0),e("btnTabCaja",!0),e("btnTabMensual",!0),e("btnEliminarVentas",!0),e("btnAjusteChica",!0),e("btnAjusteLocal",!0),e("btnAjusteYape",!0),e("btnLimpiarMovimientos",!0)):n==="encargado"?(e("btnUsuarios",!1),e("btnAgregarMesa",!1),e("btnAgregarMesaConsumo",!1),e("btnTabErrores",!1),e("btnReportarError",!0),e("btnAgregarProducto",!0),e("btnTabConsumoDueno",!0),e("btnTabDashboard",!1),e("btnTabCaja",!0),e("btnTabMensual",!1),e("btnEliminarVentas",!1),e("btnAjusteChica",!1),e("btnAjusteLocal",!1),e("btnAjusteYape",!1),e("btnLimpiarMovimientos",!1)):(e("btnUsuarios",!1),e("btnAgregarMesa",!1),e("btnAgregarMesaConsumo",!1),e("btnTabErrores",!1),e("btnReportarError",!0),e("btnAgregarProducto",!0),e("btnTabConsumoDueno",!1),e("btnTabDashboard",!1),e("btnTabCaja",!1),e("btnTabMensual",!1),e("btnEliminarVentas",!1),e("btnAjusteChica",!1),e("btnAjusteLocal",!1),e("btnAjusteYape",!1),e("btnLimpiarMovimientos",!1))}async function Ao(){var s,i;const n=document.getElementById("btnLogin"),e=(s=document.getElementById("loginUsername"))==null?void 0:s.value.trim(),t=(i=document.getElementById("loginPassword"))==null?void 0:i.value,r=document.getElementById("loginError");if(!e||!t){r.textContent="Por favor completa todos los campos",r.classList.remove("hidden");return}n.disabled=!0,n.textContent="Iniciando...";try{let a=e;e.includes("@")||(a=`${e}@billar.app`),await Je.signIn(a,t),r.classList.add("hidden"),document.getElementById("loginUsername").value="",document.getElementById("loginPassword").value=""}catch(a){console.error("❌ Error en login:",a);const c={"auth/user-not-found":"Usuario no existe","auth/wrong-password":"Contraseña incorrecta","auth/invalid-email":"Email inválido","auth/invalid-credential":"Credenciales incorrectas","auth/too-many-requests":"Demasiados intentos. Espera un momento."};r.textContent=c[a.code]||"Error al iniciar sesión. Intenta nuevamente.",r.classList.remove("hidden"),a.code||a.message}finally{n.disabled=!1,n.textContent="Iniciar Sesión"}}async function tw(){var e;(e=m.usuarioActual)==null||e.nombre;try{await Je.signOut()}catch(t){console.error("❌ Error al cerrar sesión:",t)}m.usuarioActual=null,sessionStorage.removeItem("billar_active_session"),localStorage.removeItem("ultimaActividad"),kh(),Dh();const n=document.getElementById("btnLogin");n&&(n.disabled=!1,n.textContent="Iniciar Sesión")}async function nw(n){Je.onAuthChange(async e=>{var t,r,s;if(e){e.uid;const i=parseInt(localStorage.getItem("ultimaActividad")||"0"),a=Date.now()-i;if(i>0&&a>=Ph.TIEMPO_EXPIRACION){await Je.signOut(),localStorage.removeItem("ultimaActividad"),x.warning("🔒 Tu sesión expiró por inactividad. Por favor, inicia sesión nuevamente."),(t=document.getElementById("loadingOverlay"))==null||t.classList.add("hidden");return}try{await WE();const c=e.email.split("@")[0],u=m.usuarios.find(d=>d.username===c);u?(m.usuarioActual=u,m.usuarioActual.uid=e.uid,localStorage.setItem("ultimaActividad",Date.now().toString()),ZE(),typeof n=="function"&&n()):(await Je.signOut(),x.error("Error: Tu usuario no está registrado en el sistema. Contacta al administrador."))}catch(c){c.code==="permission-denied"||(r=c.message)!=null&&r.includes("permissions")?(await Je.signOut(),x.error("Error de permisos. Por favor, inicia sesión nuevamente.")):x.error("Error al cargar datos: "+c.message)}}(s=document.getElementById("loadingOverlay"))==null||s.classList.add("hidden")})}function rw(){document.addEventListener("keydown",n=>{if(n.key==="Enter"){const e=document.getElementById("loginScreen");if(e&&!e.classList.contains("hidden")){n.preventDefault(),Ao();return}const t=document.querySelector(".modal.show");if(t){const r=t.querySelector(".btn-green, .btn-primary, .btn-blue");r&&!r.disabled&&(n.preventDefault(),r.click())}}if(n.key==="Escape"){const e=document.querySelector(".modal.show");if(e){n.preventDefault();const t=e.querySelector(".close-btn, .btn-gray");t&&t.click()}}})}function sw(){var n;document.addEventListener("click",e=>{(e.target.id==="btnLogin"||e.target.closest("#btnLogin"))&&Ao(),(e.target.id==="btnLogout"||e.target.closest("#btnLogout"))&&tw()}),(n=document.getElementById("loginPassword"))==null||n.addEventListener("keydown",e=>{e.key==="Enter"&&Ao()})}const iw=n=>({Golosinas:"🍬",Gaseosas:"🥤",Licores:"🍺",Otros:"📦"})[n]||"📦",ye={save:async(n=!1)=>await ae(G.PRODUCTOS,Q.TODOS,{lista:m.productos},n),saveLotes:async()=>await ae(G.LOTES,Q.TODOS,{lista:m.lotesAgotados}),saveProduct:async(n,e=!1,t=null)=>{try{if(e){const r=m.productos.findIndex(s=>s.id===t);r!==-1&&(m.productos[r]={...m.productos[r],...n},x.success("✅ Producto actualizado con éxito"))}else{const r={id:Date.now(),unidadesVendidas:0,gananciaAcumulada:0,unidadesConsumidasDueno:0,conteoAcumuladoLote:0,fechaUltimaReposicion:Date.now(),...n,stock:n.stockInicial||0};m.productos.push(r),x.success("✅ Producto agregado con éxito")}return await ye.save(),!0}catch{return x.error("❌ Error al guardar el producto"),!1}},deleteProduct:async n=>(m.usuarioActual.rol||"").toLowerCase()!=="admin"?(x.error("⚠️ Solo los administradores pueden eliminar productos"),!1):await fe.show("🗑️ Eliminar Producto","¿Estás seguro de eliminar este producto del inventario?",{confirmText:"Eliminar",cancelText:"Cancelar",isDestructive:!0})?(m.productos=m.productos.filter(t=>t.id!==n),await ye.save(!0),x.success("✅ Producto eliminado del inventario"),!0):!1,adjustStock:async(n,e)=>{if(isNaN(e)||e===0)return x.error("⚠️ Por favor ingresa un valor de ajuste válido"),!1;if((m.usuarioActual.rol||"").toLowerCase()!=="admin"&&e<0)return x.error("⚠️ Los empleados solo pueden agregar stock (números positivos)"),!1;const t=n.stock+e;return t<0?(x.error("⚠️ El stock no puede ser menor a 0"),!1):((m.usuarioActual.rol||"").toLowerCase()==="admin"&&e>0&&(n.unidadesVendidas||0)>0?await fe.show("📦 Reposición de Stock",`¿Deseas tratar este ingreso como una REPOSICIÓN DE STOCK?

Esto archivará las estadísticas actuales (unidades vendidas: ${n.unidadesVendidas}) y reiniciará el contador de ganancia para este nuevo lote.`,{confirmText:"Sí, es reposición",cancelText:"Solo agregar stock",isDestructive:!1})&&(await ye.generarReporteAgotamiento(n,!1),n.stockInicial=t,n.unidadesVendidas=0,n.unidadesConsumidasDueno=0,n.gananciaAcumulada=0,n.conteoAcumuladoLote=0,n.fechaUltimaReposicion=Date.now()):(m.usuarioActual.rol||"").toLowerCase()==="admin"&&e>0&&(n.unidadesVendidas||0)===0&&(n.stockInicial=t,n.fechaUltimaReposicion=n.fechaUltimaReposicion||Date.now()),n.stock=t,await ye.save(),x.success("✅ Stock ajustado correctamente"),!0)},generarReporteAgotamiento:async(n,e=!1)=>{let t=0,r=0;if(e?(t=n.tamanoLote,r=((n.precio||0)-(n.precioCosto||0))*t):(t=n.unidadesVendidas||0,r=n.gananciaAcumulada||0),t===0&&!e)return;const s={id:Date.now(),productoId:n.id,nombre:n.nombre,categoria:n.categoria||"Otros",stockInicial:e?n.tamanoLote:n.stockInicial||0,unidadesVendidas:t,unidadesConsumidasDueno:e?0:n.unidadesConsumidasDueno||0,precioCosto:n.precioCosto||0,precioVendido:n.precio||0,gananciaGenerada:r,fechaInicio:n.fechaUltimaReposicion||Date.now(),fechaFin:Date.now(),tipo:e?"Lote Acumulado":"Stock Agotado"};m.lotesAgotados.unshift(s),e?(n.unidadesVendidas=Math.max(0,(n.unidadesVendidas||0)-t),n.gananciaAcumulada=Math.max(0,(n.gananciaAcumulada||0)-r)):(n.unidadesVendidas=0,n.unidadesConsumidasDueno=0,n.gananciaAcumulada=0,n.fechaUltimaReposicion=Date.now(),n.conteoAcumuladoLote=0),await ye.saveLotes();const i=new CustomEvent("lotesUpdated");window.dispatchEvent(i)},notificarAgotamiento:async n=>{const e=n.stockInicial||0,t=n.gananciaAcumulada||0,r=n.fechaUltimaReposicion||Date.now(),s=Math.ceil((Date.now()-r)/(1e3*60*60*24));let i=`🎉 ¡PRODUCTO AGOTADO!

`;if(i+=`${iw(n.categoria)} ${n.nombre}
`,i+=`━━━━━━━━━━━━━━━━━━━━
`,i+=`📦 Unidades vendidas: ${n.unidadesVendidas||e}
`,t>0&&(i+=`💰 Ganancia del Lote: S/ ${t.toFixed(2)}
`),s>0&&(i+=`📅 Tiempo de venta: ${s} día${s!==1?"s":""}
`),i+=`━━━━━━━━━━━━━━━━━━━━

¿Deseas reponer el stock de este lote ahora?`,await fe.show("🚨 Producto Agotado",i,{confirmText:"Reponer ahora",cancelText:"Cerrar"})){const c=new CustomEvent("triggerAdjustStock",{detail:{id:n.id}});window.dispatchEvent(c)}},procesarConsumoProducto:async(n,e,t=!1)=>{const r=m.productos.find(c=>c.id===n);if(!r)return 0;const s=r.stock||0;if(s<e)throw x.error(`⚠️ No hay suficiente stock de ${r.nombre} (Stock: ${s})`),new Error("Sin stock");r.stock=s-e;const i=(r.precio||0)-(r.precioCosto||0),a=t?0:i*e;if(t?r.unidadesConsumidasDueno=(r.unidadesConsumidasDueno||0)+e:(r.unidadesVendidas=(r.unidadesVendidas||0)+e,r.gananciaAcumulada=(r.gananciaAcumulada||0)+a),r.nombre,r.stock,r.tamanoLote&&r.tamanoLote>0&&(r.conteoAcumuladoLote||(r.conteoAcumuladoLote=0),r.conteoAcumuladoLote+=e,r.conteoAcumuladoLote>=r.tamanoLote)){const c=Math.floor(r.conteoAcumuladoLote/r.tamanoLote),u=r.conteoAcumuladoLote%r.tamanoLote;for(let d=0;d<c;d++)await ye.generarReporteAgotamiento(r,!0);r.conteoAcumuladoLote=u,r.nombre}return r.stock===0&&(await ye.generarReporteAgotamiento(r,!1),setTimeout(()=>ye.notificarAgotamiento(r),100)),await ye.save(),a}};function ga(n,e=m.config){const t=parseFloat(e.tarifaHora)||5,r=parseFloat(e.tarifaExtra5Min)||1,s=Math.floor(n/60),i=Math.floor(s/60),a=s%60,c=i*t;let u=0;if(a>5){const d=a-5;u=Math.ceil(d/10)*r}return{costo:c+u,minutos:s,horas:i,minutosExtra:a,bloques:a>5?Math.ceil((a-5)/10):0}}const te={saveMesas:async(n=!1)=>await ae(G.MESAS,Q.BILLAR,{lista:m.mesas},n),saveMesasConsumo:async(n=!1)=>await ae(G.MESAS,Q.CONSUMO,{lista:m.mesasConsumo},n),agregarMesa:async()=>{if((m.usuarioActual.rol||"").toLowerCase()!=="admin")return x.error("⚠️ Solo los administradores pueden agregar mesas"),!1;const n=m.mesas.length>0?Math.max(...m.mesas.map(e=>e.id))+1:1;return m.mesas.push({id:n,ocupada:!1,inicio:null,tiempoTranscurrido:0,consumos:[]}),te.saveMesas().catch(console.error),x.success(`✅ Agregando mesa de billar ${n}...`),!0},eliminarMesa:async n=>{if((m.usuarioActual.rol||"").toLowerCase()!=="admin")return x.error("⚠️ Solo los administradores pueden eliminar mesas"),!1;const e=m.mesas.find(r=>r.id===n);return e&&e.ocupada?(x.error("⚠️ No puedes eliminar una mesa ocupada. Finalízala primero."),!1):await fe.show("🗑️ Eliminar Mesa",`¿Estás seguro de eliminar la Mesa ${n} del billar?`,{confirmText:"Eliminar",cancelText:"Cancelar",isDestructive:!0})?(m.mesas=m.mesas.filter(r=>r.id!==n),m.timers[n]&&(clearInterval(m.timers[n]),delete m.timers[n]),te.saveMesas(!0).catch(console.error),x.success(`✅ Eliminando mesa ${n}...`),!0):!1},iniciarMesa:async n=>{const e=m.mesas.find(t=>t.id===n);return e?(e.ocupada=!0,e.inicio=Date.now(),e.tiempoTranscurrido=0,e.consumos=[],te.saveMesas().catch(console.error),x.success(`▶️ Iniciando mesa de billar ${n}...`),!0):!1},finalizarMesa:async(n,e)=>{const t=m.mesas.find(w=>w.id===n);if(!t||!t.ocupada)return!1;const r=new Date(t.inicio).toLocaleString("es-PE",{hour:"2-digit",minute:"2-digit"}),s=new Date().toLocaleString("es-PE",{hour:"2-digit",minute:"2-digit"}),i=ga(t.tiempoTranscurrido),a=i.costo;let c=0,u=[];t.consumos&&t.consumos.length>0&&t.consumos.forEach(w=>{const C=w.precio*w.cantidad;c+=C,u.push({producto:w.nombre,cantidad:w.cantidad,precioUnitario:w.precio,subtotal:C})});const d=a+c;if(d<=0)return m.timers[n]&&(clearInterval(m.timers[n]),delete m.timers[n]),t.ocupada=!1,t.inicio=null,t.tiempoTranscurrido=0,t.consumos=[],te.saveMesas().catch(console.error),x.info(`⏹️ Cerrando mesa ${n} sin costo...`),!0;let f=a;t.consumos.forEach(w=>{const C=m.productos.find(O=>O.id===w.id),M=C&&C.precioCosto||0;f+=(w.precio-M)*w.cantidad});const g={id:Date.now(),tipo:"Mesa Billar",tipoDetalle:`Mesa ${t.id}`,monto:d,ganancia:f,metodoPago:e.metodoPago,montoEfectivo:e.montoEfectivo,montoYape:e.montoYape,fecha:new Date().toLocaleString("es-PE"),usuario:m.usuarioActual.nombre,detalle:{mesaId:t.id,horaInicio:r,horaFin:s,tiempoMinutos:i.minutos,tiempoHoras:i.horas,tiempoMinutosExtra:i.minutosExtra,costoTiempo:a,consumos:u,totalConsumos:c}};return m.ventas.push(g),ae(G.VENTAS,Q.TODAS,{lista:m.ventas}).catch(console.error),m.timers[n]&&(clearInterval(m.timers[n]),delete m.timers[n]),t.ocupada=!1,t.inicio=null,t.tiempoTranscurrido=0,t.consumos=[],te.saveMesas().catch(console.error),x.success(`✅ Procesando cobro de Mesa ${n} (S/ ${d.toFixed(2)})...`),!0},agregarMesaConsumo:async()=>{if((m.usuarioActual.rol||"").toLowerCase()!=="admin")return x.error("⚠️ Solo los administradores pueden agregar mesas"),!1;const n=m.mesasConsumo.length>0?Math.max(...m.mesasConsumo.map(e=>e.id))+1:1;return m.mesasConsumo.push({id:n,ocupada:!1,consumos:[],total:0}),te.saveMesasConsumo().catch(console.error),x.success(`✅ Agregando mesa de consumo ${n}...`),!0},eliminarMesaConsumo:async n=>{if((m.usuarioActual.rol||"").toLowerCase()!=="admin")return x.error("⚠️ Solo los administradores pueden eliminar mesas"),!1;const e=m.mesasConsumo.find(r=>r.id===n);return e&&e.ocupada?(x.error("⚠️ No puedes eliminar una mesa ocupada. Finalízala primero."),!1):await fe.show("🗑️ Eliminar Mesa Consumo",`¿Estás seguro de eliminar la Mesa de Consumo ${n}?`,{confirmText:"Eliminar",cancelText:"Cancelar",isDestructive:!0})?(m.mesasConsumo=m.mesasConsumo.filter(r=>r.id!==n),te.saveMesasConsumo(!0).catch(console.error),x.success(`✅ Eliminando mesa de consumo ${n}...`),!0):!1},iniciarMesaConsumo:async n=>{const e=m.mesasConsumo.find(t=>t.id===n);return e?(e.ocupada=!0,e.consumos=[],e.total=0,te.saveMesasConsumo().catch(console.error),x.success(`▶️ Iniciando mesa de consumo ${n}...`),!0):!1},finalizarMesaConsumo:async(n,e)=>{const t=m.mesasConsumo.find(c=>c.id===n);if(!t||!t.ocupada)return!1;if(t.total<=0)return t.ocupada=!1,t.consumos=[],t.total=0,te.saveMesasConsumo().catch(console.error),x.info(`⏹️ Cerrando mesa de consumo ${n} sin costo...`),!0;let r=[];t.consumos.forEach(c=>{const u=c.precio*c.cantidad;r.push({producto:c.nombre,cantidad:c.cantidad,precioUnitario:c.precio,subtotal:u})});let s=0;t.consumos.forEach(c=>{const u=m.productos.find(f=>f.id===c.id),d=u&&u.precioCosto||0;s+=(c.precio-d)*c.cantidad});const i={id:Date.now(),tipo:"Mesa Consumo",tipoDetalle:`Mesa Consumo ${t.id}`,monto:t.total,ganancia:s,metodoPago:e.metodoPago,montoEfectivo:e.montoEfectivo,montoYape:e.montoYape,fecha:new Date().toLocaleString("es-PE"),usuario:m.usuarioActual.nombre,detalle:{mesaId:t.id,consumos:r,totalConsumos:t.total}};m.ventas.push(i),ae(G.VENTAS,Q.TODAS,{lista:m.ventas}).catch(console.error);const a=t.total;return t.ocupada=!1,t.consumos=[],t.total=0,te.saveMesasConsumo().catch(console.error),x.success(`✅ Procesando cobro de Mesa de consumo ${n} (S/ ${a.toFixed(2)})...`),!0},agregarConsumo:async(n,e,t)=>{const r=m.productos.find(a=>a.id===n);if(!r||r.stock<=0)return x.error("⚠️ El producto no tiene stock disponible"),!1;let s=t==="billar"?m.mesas.find(a=>a.id===e):m.mesasConsumo.find(a=>a.id===e);if(!s||!s.ocupada)return x.error("⚠️ La mesa seleccionada no está ocupada"),!1;s.consumos||(s.consumos=[]);const i=s.consumos.find(a=>a.id===n);return i?i.cantidad++:s.consumos.push({id:n,nombre:r.nombre,precio:r.precio,cantidad:1}),ye.procesarConsumoProducto(n,1,!1).catch(console.error),t==="consumo"&&(s.total=s.consumos.reduce((a,c)=>a+c.precio*c.cantidad,0)),t==="billar"?te.saveMesas().catch(console.error):te.saveMesasConsumo().catch(console.error),x.success(`➕ ${r.nombre} agregado a la mesa`),!0},eliminarConsumo:async(n,e,t)=>{let r=t==="billar"?m.mesas.find(a=>a.id===e):m.mesasConsumo.find(a=>a.id===e);if(!r)return!1;const s=r.consumos.find(a=>a.id===n);if(!s)return!1;const i=m.productos.find(a=>a.id===n);if(i){i.stock+=s.cantidad;const c=((i.precio||0)-(i.precioCosto||0))*s.cantidad;i.unidadesVendidas=Math.max(0,(i.unidadesVendidas||0)-s.cantidad),i.gananciaAcumulada=Math.max(0,(i.gananciaAcumulada||0)-c),i.tamanoLote&&i.tamanoLote>0&&(i.conteoAcumuladoLote=Math.max(0,(i.conteoAcumuladoLote||0)-s.cantidad)),ye.save().catch(console.error)}return r.consumos=r.consumos.filter(a=>a.id!==n),t==="consumo"&&(r.total=r.consumos.reduce((a,c)=>a+c.precio*c.cantidad,0)),t==="billar"?te.saveMesas(!0).catch(console.error):te.saveMesasConsumo(!0).catch(console.error),x.success("🗑️ Producto removido de la mesa"),!0},editarConsumo:async(n,e,t,r)=>{let s=t==="billar"?m.mesas.find(d=>d.id===e):m.mesasConsumo.find(d=>d.id===e);if(!s)return!1;const i=s.consumos.find(d=>d.id===n);if(!i)return!1;const a=m.productos.find(d=>d.id===n),c=parseInt(r);if(isNaN(c)||c<0)return x.error("⚠️ Por favor ingresa una cantidad numérica válida"),!1;if(c===0)return await fe.show("🗑️ Eliminar Consumo",`¿Deseas remover por completo "${i.nombre}" de la mesa?`,{confirmText:"Remover",cancelText:"Cancelar",isDestructive:!0})&&await te.eliminarConsumo(n,e,t),!0;const u=c-i.cantidad;if(u>0&&a&&a.stock<u)return x.error(`⚠️ Stock insuficiente. Disponible en estante: ${a.stock}`),!1;if(a){a.stock-=u;const d=(a.precio||0)-(a.precioCosto||0);if(u>0)a.unidadesVendidas=(a.unidadesVendidas||0)+u,a.gananciaAcumulada=(a.gananciaAcumulada||0)+d*u,a.tamanoLote&&a.tamanoLote>0&&(a.conteoAcumuladoLote=(a.conteoAcumuladoLote||0)+u);else if(u<0){const f=Math.abs(u);a.unidadesVendidas=Math.max(0,(a.unidadesVendidas||0)-f),a.gananciaAcumulada=Math.max(0,(a.gananciaAcumulada||0)-d*f),a.tamanoLote&&a.tamanoLote>0&&(a.conteoAcumuladoLote=Math.max(0,(a.conteoAcumuladoLote||0)-f))}ye.save().catch(console.error)}return i.cantidad=c,t==="consumo"&&(s.total=s.consumos.reduce((d,f)=>d+f.precio*f.cantidad,0)),t==="billar"?te.saveMesas().catch(console.error):te.saveMesasConsumo().catch(console.error),x.success("✅ Consumos modificados correctamente"),!0}},Qi=new Map,Ji=new Map,en={open:n=>{const e=document.getElementById(n);if(!e)return;e.classList.remove("hidden"),requestAnimationFrame(()=>{e.classList.add("show")});const t=s=>{s.key==="Escape"&&en.close(n)};document.addEventListener("keydown",t),Qi.set(n,t);const r=s=>{s.target===e&&en.close(n)};e.addEventListener("click",r),Ji.set(n,r)},close:n=>{const e=document.getElementById(n);if(!e)return;e.classList.remove("show");const t=Qi.get(n);t&&(document.removeEventListener("keydown",t),Qi.delete(n));const r=Ji.get(n);r&&(e.removeEventListener("click",r),Ji.delete(n)),setTimeout(()=>{e.classList.contains("show")||e.classList.add("hidden")},200)}};window.openModal=en.open;window.closeModal=en.close;function ow(n){return`S/ ${(typeof n=="number"?n:parseFloat(n||0)).toFixed(2)}`}class aw{constructor(){this.modalId="modalConfirmacionPago",this.total=0,this.resolvePromise=null}show(e,t="Resumen de cobro"){return this.total=Number(e||0),`${this.total.toFixed(2)}`,new Promise(r=>{this.resolvePromise=r;const s=document.getElementById("pagoDetalle"),i=document.getElementById("pagoMonto"),a=document.getElementById("pagoMixtoEfectivo"),c=document.getElementById("pagoMixtoYape"),u=document.getElementById("pagoMixtoInputs");s&&(s.textContent=t),i&&(i.textContent=ow(this.total)),a&&(a.value=""),c&&(c.value=""),u&&u.classList.add("hidden");const d=document.querySelector('input[name="metodoPagoConf"][value="Efectivo"]');d&&(d.checked=!0),en.open(this.modalId),this.initEvents()})}initEvents(){const e=document.getElementById("pagoMixtoInputs"),t=document.getElementById("pagoMixtoEfectivo"),r=document.getElementById("pagoMixtoYape");document.querySelectorAll('input[name="metodoPagoConf"]').forEach(c=>{c.onchange=()=>{c.value==="Mixto"?(e.classList.remove("hidden"),t&&(t.value="",t.focus()),r&&(r.value=this.total.toFixed(2))):e.classList.add("hidden")}}),t&&(t.oninput=()=>{let c=parseFloat(t.value)||0;c>this.total?(c=this.total,t.value=this.total.toFixed(2)):c<0&&(c=0,t.value="0.00");const u=this.total-c;r&&(r.value=u.toFixed(2))});const i=document.getElementById("btnConfirmarPagoFinal");i&&(i.onclick=()=>{const c=document.querySelector('input[name="metodoPagoConf"]:checked'),u=c?c.value:"Efectivo";let d={metodoPago:u,monto:this.total,montoEfectivo:0,montoYape:0};if(u==="Efectivo")d.montoEfectivo=this.total;else if(u==="Yape")d.montoYape=this.total;else if(u==="Mixto"){const f=parseFloat(t.value)||0,g=this.total-f;if(f<=0||f>=this.total){alert("⚠️ Por favor ingresa un monto de efectivo válido entre 0 y el total.");return}d.montoEfectivo=f,d.montoYape=g}en.close(this.modalId),this.resolvePromise&&(this.resolvePromise(d),this.resolvePromise=null)});const a=document.getElementById("btnAtrasPago");a&&(a.onclick=()=>{en.close(this.modalId),this.resolvePromise&&(this.resolvePromise(null),this.resolvePromise=null)})}}const ya=new aw;window.paymentModal=ya;function Jl(n){const e=m.mesas.find(d=>d.id===n);if(!e||!e.ocupada)return;e.tiempoTranscurrido=Math.floor((Date.now()-e.inicio)/1e3);const t=Math.floor(e.tiempoTranscurrido/3600),r=Math.floor(e.tiempoTranscurrido%3600/60),s=e.tiempoTranscurrido%60,i=`${String(t).padStart(2,"0")}:${String(r).padStart(2,"0")}:${String(s).padStart(2,"0")}`,a=ga(e.tiempoTranscurrido),c=document.querySelector(`#mesa-${n} .timer-display`),u=document.querySelector(`#mesa-${n} .costo-display`);c&&(c.textContent=i),u&&(u.textContent=`S/ ${a.costo.toFixed(2)}`)}function Qt(){const n=document.getElementById("mesasContainer");if(!n||!m.usuarioActual)return;m.mesas.length,Object.keys(m.timers).forEach(r=>{m.mesas.find(s=>s.id===parseInt(r))||(clearInterval(m.timers[r]),delete m.timers[r])});const e=Array.from(n.children).map(r=>parseInt(r.id.replace("mesa-",""))),t=m.mesas.map(r=>r.id);e.forEach(r=>{var s;t.includes(r)||(s=document.getElementById(`mesa-${r}`))==null||s.remove()}),m.mesas.forEach(r=>{let s=document.getElementById(`mesa-${r.id}`);!s&&(s=document.createElement("div"),s.id=`mesa-${r.id}`,n.appendChild(s));const a=`mesa-card ${r.ocupada?"mesa-ocupada":"mesa-disponible"}`;s.className!==a&&(s.className=a);const u=`
      ${(m.usuarioActual.rol||"").toLowerCase()==="admin"?`<button class="delete-mesa-btn" data-action="eliminar-mesa" data-id="${r.id}">×</button>`:""}
      <h3>Mesa ${r.id}</h3>
      <span class="mesa-status ${r.ocupada?"status-ocupada":"status-disponible"}">
        ${r.ocupada?"OCUPADA":"DISPONIBLE"}
      </span>
      <div id="timer-${r.id}" class="mesa-timer ${r.ocupada?"":"hidden"}">
        <div class="timer-display">00:00:00</div>
        <div class="costo-display">S/ 0.00</div>
      </div>
      <button class="btn ${r.ocupada?"btn-red":"btn-primary"}" 
        data-action="toggle-mesa" data-id="${r.id}"
        style="width: 100%; margin-bottom: 8px;">
        ${r.ocupada?"⏹️ Finalizar":"▶️ Iniciar"}
      </button>
      ${r.ocupada?`<button class="btn btn-blue" data-action="abrir-consumo" data-id="${r.id}" data-tipo="billar" style="width: 100%;">🛒 Consumo</button>`:""}
    `;s.innerHTML!==u&&(s.innerHTML=u),r.ocupada&&r.inicio?(r.tiempoTranscurrido=Math.floor((Date.now()-r.inicio)/1e3),Jl(r.id),m.timers[r.id]||(m.timers[r.id]=setInterval(()=>Jl(r.id),1e3))):m.timers[r.id]&&(clearInterval(m.timers[r.id]),delete m.timers[r.id])})}async function cw(n){const e=m.mesas.find(t=>t.id===n);if(e){if(e.ocupada){const t=Math.floor((Date.now()-e.inicio)/1e3),r=ga(t),s=e.consumos?e.consumos.reduce((a,c)=>a+c.precio*c.cantidad,0):0,i=r.costo+s;if(i<=0){if(!await fe.show("⏹️ Cerrar Mesa",`¿Finalizar Mesa ${n}?

No hay cobro (tiempo y consumos mínimos).`,{confirmText:"Cerrar",cancelText:"Cancelar"}))return;await te.finalizarMesa(n,{metodoPago:"Sin cobro",montoEfectivo:0,montoYape:0})}else{const a=await ya.show(i,`Cierre de Mesa Billar ${n}`);if(!a||!a.metodoPago)return;await te.finalizarMesa(n,a)}}else await te.iniciarMesa(n);Qt(),document.dispatchEvent(new CustomEvent("ventas:changed")),document.dispatchEvent(new CustomEvent("caja:changed")),document.dispatchEvent(new CustomEvent("dashboard:changed"))}}function Jt(){const n=document.getElementById("mesasConsumoContainer");!n||!m.usuarioActual||(m.mesasConsumo.length,n.innerHTML="",m.mesasConsumo.forEach(e=>{const t=(m.usuarioActual.rol||"").toLowerCase()==="admin",r=document.createElement("div");r.id=`mesa-consumo-${e.id}`,r.className=`mesa-card ${e.ocupada?"mesa-ocupada":"mesa-disponible"}`,r.innerHTML=`
      ${t?`<button class="delete-mesa-btn" data-action="eliminar-mesa-consumo" data-id="${e.id}">×</button>`:""}
      <h3>Mesa C-${e.id}</h3>
      <span class="mesa-status ${e.ocupada?"status-ocupada":"status-disponible"}">
        ${e.ocupada?"OCUPADA":"DISPONIBLE"}
      </span>
      ${e.ocupada?`
        <div class="mesa-timer">
          <div class="costo-display">S/ ${(e.total||0).toFixed(2)}</div>
        </div>
        <div style="font-size: 12px; color: #666; margin-bottom: 8px;">
          ${(e.consumos||[]).length} consumo(s) registrado(s)
        </div>
      `:""}
      <button class="btn ${e.ocupada?"btn-red":"btn-primary"}"
        data-action="toggle-mesa-consumo" data-id="${e.id}"
        style="width: 100%; margin-bottom: 8px;">
        ${e.ocupada?"⏹️ Finalizar":"▶️ Iniciar"}
      </button>
      ${e.ocupada?`
        <button class="btn btn-blue" data-action="abrir-consumo" data-id="${e.id}" data-tipo="consumo" style="width: 100%;">
          🛒 Agregar Consumo
        </button>
      `:""}
    `,n.appendChild(r)}))}async function lw(n){const e=m.mesasConsumo.find(t=>t.id===n);if(e){if(e.ocupada)if(e.total<=0){if(!await fe.show("⏹️ Cerrar Mesa Consumo",`¿Finalizar Mesa Consumo ${n}? No hay consumos registrados.`,{confirmText:"Cerrar",cancelText:"Cancelar"}))return;await te.finalizarMesaConsumo(n,{metodoPago:"Sin cobro",montoEfectivo:0,montoYape:0})}else{const t=await ya.show(e.total,`Cierre de Mesa Consumo ${n}`);if(!t||!t.metodoPago)return;await te.finalizarMesaConsumo(n,t)}else await te.iniciarMesaConsumo(n);Jt(),document.dispatchEvent(new CustomEvent("ventas:changed")),document.dispatchEvent(new CustomEvent("caja:changed")),document.dispatchEvent(new CustomEvent("dashboard:changed"))}}let Vh={mesaId:null,tipo:null};function uw(n,e){Vh={mesaId:n,tipo:e};const t=document.getElementById("modalConsumo");if(!t)return;const r=document.getElementById("modalConsumoTitulo");r&&(r.textContent=e==="billar"?`🎱 Consumos - Mesa Billar ${n}`:`🪑 Consumos - Mesa Consumo ${n}`),As(),t.classList.add("show")}function As(){const{mesaId:n,tipo:e}=Vh,t=e==="billar"?m.mesas.find(c=>c.id===n):m.mesasConsumo.find(c=>c.id===n),r=document.getElementById("listaConsumosMesa"),s=document.getElementById("productosConsumoContainer");if(!t)return;const i=t.consumos||[];if(i.length===0)r.innerHTML='<p style="color: #999; text-align: center; padding: 15px;">Sin consumos aún</p>';else{const c=i.reduce((u,d)=>u+d.precio*d.cantidad,0);r.innerHTML=`
      ${i.map(u=>`
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px; border-bottom: 1px solid #eee;">
          <span>${u.nombre} x${u.cantidad}</span>
          <span>S/ ${(u.precio*u.cantidad).toFixed(2)}</span>
          <div style="display: flex; gap: 4px;">
            <button class="btn-small btn-blue" data-action="editar-consumo" data-producto-id="${u.id}" data-mesa-id="${n}" data-tipo="${e}" style="padding: 3px 8px; font-size: 11px;" title="Editar cantidad">✏️</button>
            <button class="btn-small btn-red" data-action="eliminar-consumo" data-producto-id="${u.id}" data-mesa-id="${n}" data-tipo="${e}" style="padding: 3px 8px; font-size: 11px;" title="Remover producto">✕</button>
          </div>
        </div>
      `).join("")}
      <div style="padding: 10px; font-weight: bold; text-align: right; background: #f0fdf4; border-radius: 6px; margin-top: 8px;">
        Total: S/ ${c.toFixed(2)}
      </div>
    `}if(!s)return;const a=dw(m.productos);if(a.length===0){s.innerHTML='<p style="color: #999; text-align: center; padding: 20px;">No hay productos disponibles</p>';return}s.innerHTML=a.map(c=>{const u=c.stock>0;return`
      <div class="producto-venta-card ${u?"":"no-stock"}">
        <h4>${c.nombre}</h4>
        <div class="producto-precio-venta">S/ ${c.precio.toFixed(2)}</div>
        <div style="font-size: 13px; color: ${c.stock<=5?"#dc3545":"#6c757d"};">Stock: ${c.stock}</div>
        ${u?`<button class="btn btn-green" data-action="agregar-consumo" data-producto-id="${c.id}" data-mesa-id="${n}" data-tipo="${e}" style="width: 100%; margin-top: 8px;">
              ➕ Agregar
             </button>`:'<button class="btn btn-red" disabled style="width: 100%; margin-top: 8px;">Agotado</button>'}
      </div>
    `}).join("")}function dw(n){const e={Licores:1,Gaseosas:2,Golosinas:3,Otros:4};return[...n].sort((t,r)=>{const s=e[t.categoria]||99,i=e[r.categoria]||99;return s!==i?s-i:t.nombre.localeCompare(r.nombre)})}function hw(){var n;document.addEventListener("click",async e=>{var u,d;const t=(u=e.target.closest("[data-action]"))==null?void 0:u.dataset.action;if(!t)return;const r=e.target.closest("[data-action]"),s=parseInt(r==null?void 0:r.dataset.id),i=r==null?void 0:r.dataset.tipo,a=parseInt(r==null?void 0:r.dataset.productoId),c=parseInt(r==null?void 0:r.dataset.mesaId);switch(t){case"toggle-mesa":await cw(s);break;case"eliminar-mesa":await te.eliminarMesa(s)&&Qt();break;case"toggle-mesa-consumo":await lw(s);break;case"eliminar-mesa-consumo":await te.eliminarMesaConsumo(s)&&Jt();break;case"abrir-consumo":uw(s,i);break;case"agregar-consumo":await te.agregarConsumo(a,c,i)&&(As(),i==="billar"?Qt():Jt());break;case"eliminar-consumo":await te.eliminarConsumo(a,c,i)&&(As(),i==="billar"?Qt():Jt());break;case"editar-consumo":{const f=prompt("Ingrese la nueva cantidad:");f!==null&&f.trim()!==""&&await te.editarConsumo(a,c,i,f)&&(As(),i==="billar"?Qt():Jt());break}case"agregar-mesa":await te.agregarMesa()&&Qt();break;case"agregar-mesa-consumo":await te.agregarMesaConsumo()&&Jt();break;case"close-modal-consumo":(d=document.getElementById("modalConsumo"))==null||d.classList.remove("show");break}}),(n=document.getElementById("modalConsumo"))==null||n.addEventListener("click",e=>{e.target===e.currentTarget&&e.currentTarget.classList.remove("show")})}function qr(){const n=document.getElementById("ventasTable");if(!n)return;if(m.ventas.length===0){n.innerHTML='<tr><td colspan="6" style="text-align: center; padding: 30px; color: #999;">No hay ventas registradas</td></tr>';return}const t=[...m.ventas].reverse().slice(0,m.limiteVentas);n.innerHTML=t.map(r=>{var u;const s=r.metodoPago||"Efectivo",i=s==="Yape"?"#742284":s==="Mixto"?"#0ea5e9":"#10b981",a=s==="Mixto"?`Ef: S/${(r.montoEfectivo||0).toFixed(2)} | Yp: S/${(r.montoYape||0).toFixed(2)}`:s,c=(((u=m.usuarioActual)==null?void 0:u.rol)||"").toLowerCase()==="admin";return`
      <tr>
        <td style="font-size: 13px;">${r.fecha}</td>
        <td>${r.tipoDetalle||r.tipo}</td>
        <td style="font-size: 13px; color: #666;">${r.usuario}</td>
        <td style="text-align: right; font-weight: 600; color: #2d7a4d;">S/ ${r.monto.toFixed(2)}</td>
        <td style="text-align: center;">
          <span style="background: ${i}; color: white; padding: 2px 6px; border-radius: 4px; font-size: 11px;">${a}</span>
        </td>
        <td style="text-align: center;">
          ${c?`<button class="delete-btn" data-action="eliminar-venta" data-id="${r.id}">🗑️</button>`:"-"}
        </td>
      </tr>
    `}).join(""),m.ventas.length>m.limiteVentas&&(n.innerHTML+=`
      <tr>
        <td colspan="6" style="text-align: center; padding: 15px;">
          <button data-action="cargar-mas-ventas" style="background: #3b82f6; color: white; border: none; padding: 8px 20px; border-radius: 6px; cursor: pointer; font-weight: bold; font-size: 13px;">
            Ver más ventas (+20)
          </button>
          <p style="font-size: 11px; color: #666; margin-top: 5px;">Mostrando ${m.limiteVentas} de ${m.ventas.length} ventas</p>
        </td>
      </tr>
    `)}function Hr(){const e=(m.ultimoCierre?m.ventas.filter(r=>r.id>m.ultimoCierre):m.ventas).reduce((r,s)=>r+s.monto,0),t=document.getElementById("totalDia");t&&(t.textContent=`S/ ${e.toFixed(2)}`)}function fw(){const n=document.getElementById("modalVentaManual");n&&(document.getElementById("ventaDescripcionManual").value="",document.getElementById("ventaMontoManual").value="",n.classList.add("show"))}function Lh(){var n;(n=document.getElementById("modalVentaManual"))==null||n.classList.remove("show")}async function mw(){var i,a,c;const n=document.getElementById("btnGuardarVentaManual"),e=(i=document.getElementById("ventaDescripcionManual"))==null?void 0:i.value.trim(),t=parseFloat((a=document.getElementById("ventaMontoManual"))==null?void 0:a.value),r=(c=document.getElementById("metodoPagoManual"))==null?void 0:c.value;if(!e||isNaN(t)||t<=0){x.error("Por favor completa todos los campos correctamente");return}n.disabled=!0,n.textContent="Guardando...";const s={id:Date.now(),tipo:"Venta Manual",tipoDetalle:e,monto:t,ganancia:t,metodoPago:r||"Efectivo",montoEfectivo:r==="Efectivo"?t:0,montoYape:r==="Yape"?t:0,fecha:new Date().toLocaleString("es-PE"),usuario:m.usuarioActual.nombre};m.ventas.push(s),Lh(),qr(),Hr(),document.dispatchEvent(new CustomEvent("dashboard:changed")),document.dispatchEvent(new CustomEvent("caja:changed")),x.success("✅ Guardando venta..."),ae(G.VENTAS,Q.TODAS,{lista:m.ventas}).catch(u=>{console.error("Error al guardar venta:",u),x.error("❌ Error al sincronizar venta con la nube")}),n.disabled=!1,n.textContent="Guardar"}let _a="";function pw(n){const e={Licores:1,Gaseosas:2,Golosinas:3,Otros:4};return[...n].sort((t,r)=>{const s=e[t.categoria]||99,i=e[r.categoria]||99;return s!==i?s-i:t.nombre.localeCompare(r.nombre)})}function va(){const n=document.getElementById("productosVentaContainer");if(!n)return;const e=_a.toLowerCase().trim();let t=pw(m.productos);if(e&&(t=t.filter(r=>r.nombre.toLowerCase().includes(e))),t.length===0){n.innerHTML='<p style="text-align: center; padding: 30px; color: #999;">No se encontraron productos</p>';return}n.innerHTML=t.map(r=>{const s=r.stock>0;return`
      <div class="producto-venta-card ${s?"":"no-stock"}">
        <h4>${r.nombre}</h4>
        <div class="producto-precio-venta">S/ ${r.precio.toFixed(2)}</div>
        <div style="font-size: 14px; color: ${r.stock<=5?"#dc3545":"#6c757d"};">Stock: ${r.stock}</div>
        ${s?`
            <div style="display: flex; gap: 5px; margin-top: 10px;">
              <input type="number" id="qty-${r.id}" value="1" min="1" max="${r.stock}"
                style="width: 60px; text-align: center; border: 1px solid #ccc; border-radius: 5px; padding: 5px;">
              <button class="btn btn-green" id="btn-vender-${r.id}"
                data-action="vender-producto" data-id="${r.id}" style="flex: 1;">
                Vender
              </button>
            </div>
          `:'<button class="btn btn-red" disabled style="width: 100%; margin-top: 10px;">Agotado</button>'}
      </div>
    `}).join("")}function gw(){const n=document.getElementById("modalVentaProductos");if(n){_a="";const e=document.getElementById("buscarVentaProducto");e&&(e.value=""),va(),n.classList.add("show")}}function yw(){var n;(n=document.getElementById("modalVentaProductos"))==null||n.classList.remove("show")}async function _w(n){var u;const e=document.getElementById(`btn-vender-${n}`);if(e!=null&&e.disabled)return;e&&(e.disabled=!0,e.textContent="Procesando...");const t=document.getElementById(`qty-${n}`),r=parseInt(t==null?void 0:t.value),s=m.productos.find(d=>d.id===n);if(!s||isNaN(r)||r<=0||r>s.stock){x.error("Cantidad inválida o stock insuficiente"),e&&(e.disabled=!1,e.textContent="Vender");return}const i=s.precio*r,a=((u=document.getElementById("metodoPagoDirecto"))==null?void 0:u.value)||"Efectivo",c={id:Date.now(),tipo:"Venta Directa",tipoDetalle:`${s.nombre} x${r}`,monto:i,metodoPago:a,montoEfectivo:a==="Efectivo"?i:0,montoYape:a==="Yape"?i:0,fecha:new Date().toLocaleString("es-PE"),usuario:m.usuarioActual.nombre,detalle:{consumos:[{producto:s.nombre,cantidad:r,precioUnitario:s.precio,subtotal:i}],totalConsumos:i}};m.ventas.push(c),s.stock-=r,ye.procesarConsumoProducto(n,r,!1).then(d=>{c.ganancia=d,ae(G.VENTAS,Q.TODAS,{lista:m.ventas})}).catch(d=>console.error(d)),va(),qr(),Hr(),document.dispatchEvent(new CustomEvent("inventario:changed")),document.dispatchEvent(new CustomEvent("dashboard:changed")),document.dispatchEvent(new CustomEvent("caja:changed")),x.success(`✅ Procesando venta de ${r}x ${s.nombre}...`),e&&(e.disabled=!1,e.textContent="Vender")}async function vw(n){var t;if((((t=m.usuarioActual)==null?void 0:t.rol)||"").toLowerCase()!=="admin"){x.error("Solo los administradores pueden eliminar ventas");return}await fe.show("🗑️ Eliminar Venta","¿Estás seguro de eliminar esta venta? Esta acción no se puede deshacer.",{confirmText:"Eliminar",cancelText:"Cancelar",isDestructive:!0})&&(m.ventas=m.ventas.filter(r=>r.id!==n),qr(),Hr(),x.success("✅ Eliminando venta..."),ae(G.VENTAS,Q.TODAS,{lista:m.ventas},!0).catch(r=>{console.error("Error al eliminar venta:",r),x.error("❌ Error al sincronizar eliminación con la nube")}))}function Ew(){var n;document.addEventListener("click",async e=>{var s,i;const t=e.target.closest("[data-action]");switch(t==null?void 0:t.dataset.action){case"eliminar-venta":await vw(parseInt(t.dataset.id));break;case"vender-producto":await _w(parseInt(t.dataset.id));break;case"cargar-mas-ventas":m.limiteVentas+=20,qr();break;case"show-venta-manual":fw();break;case"close-venta-manual":Lh();break;case"guardar-venta-manual":await mw();break;case"show-venta-productos":gw();break;case"close-venta-productos":yw();break;case"show-eliminar-ventas":(s=document.getElementById("modalEliminarVentas"))==null||s.classList.add("show");break;case"close-eliminar-ventas":(i=document.getElementById("modalEliminarVentas"))==null||i.classList.remove("show");break}}),(n=document.getElementById("buscarVentaProducto"))==null||n.addEventListener("input",e=>{_a=e.target.value,va()})}const ww={Golosinas:"🍬",Gaseosas:"🥤",Licores:"🍺",Otros:"📦"};function Tw(n){const e={Licores:1,Gaseosas:2,Golosinas:3,Otros:4};return[...n].sort((t,r)=>{const s=e[t.categoria]||99,i=e[r.categoria]||99;return s!==i?s-i:t.nombre.localeCompare(r.nombre)})}function Ln(){var r;const n=document.getElementById("inventarioGrid");if(!n)return;const e=(((r=m.usuarioActual)==null?void 0:r.rol)||"").toLowerCase()==="admin";let t=[...m.productos];if(m.ordenInventarioActual==="masVendidos"?t.sort((s,i)=>(i.unidadesVendidas||0)-(s.unidadesVendidas||0)):m.ordenInventarioActual==="menosStock"?t.sort((s,i)=>s.stock-i.stock):m.ordenInventarioActual==="categoria"&&(t=Tw(t)),t.length===0){n.innerHTML='<p style="grid-column:1/-1;text-align:center;padding:40px;color:#999;">No hay productos en el inventario</p>';return}n.innerHTML=t.map((s,i)=>{const a=s.stock<=s.stockMin,c=s.precioCosto||0,u=s.precio||0,d=u-c,f=c>0?d/u*100:0,g=s.stockInicial||s.stock,w=s.unidadesVendidas||0,C=s.gananciaAcumulada||0,M=d*s.stock,O=C+M,S=g>0?w/g*100:0,P=ww[s.categoria]||"📦";let F="";if(m.ordenInventarioActual==="categoria"){const q=t[i-1];(!q||q.categoria!==s.categoria)&&(F=`<div style="grid-column:1/-1;margin-top:15px;margin-bottom:5px;border-bottom:2px solid #e5e7eb;padding-bottom:5px;font-weight:bold;color:#4b5563;">${P} ${s.categoria||"Sin Categoría"}</div>`)}return`
      ${F}
      <div class="producto-card" style="border-left:4px solid ${a?"#dc3545":"#10b981"};">
        <div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:10px;">
          <div>
            <h4 style="margin:0;">${P} ${s.nombre}</h4>
            <small style="color:#666;">${s.categoria||"Sin categoría"}</small>
          </div>
          ${e?`<div style="display:flex;gap:5px;">
                <button class="btn-small btn-blue" data-action="show-stock" data-id="${s.id}" title="Ajustar Stock">📊</button>
                <button class="btn-small btn-green" data-action="editar-producto" data-id="${s.id}" title="Editar">✏️</button>
                <button class="btn-small btn-red" data-action="eliminar-producto" data-id="${s.id}" title="Eliminar">🗑️</button>
              </div>`:`<button class="btn-small btn-green" data-action="show-stock" data-id="${s.id}" style="font-size:11px;">➕ Stock</button>`}
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px;">
          ${e&&c>0?`<div style="background:#f3f4f6;padding:8px;border-radius:6px;"><small style="color:#666;display:block;">💰 Costo</small><strong>S/ ${c.toFixed(2)}</strong></div>
               <div style="background:#f3f4f6;padding:8px;border-radius:6px;"><small style="color:#666;display:block;">💵 Venta</small><strong>S/ ${u.toFixed(2)}</strong></div>`:`<div style="background:#f3f4f6;padding:8px;border-radius:6px;grid-column:1/-1;"><small style="color:#666;display:block;">💵 Precio de Venta</small><strong>S/ ${u.toFixed(2)}</strong></div>`}
        </div>

        ${e&&c>0&&f>0?`<div style="background:linear-gradient(135deg,#10b981 0%,#059669 100%);color:white;padding:8px;border-radius:6px;margin-bottom:12px;text-align:center;">
               <small style="opacity:.9;display:block;">📊 Margen</small>
               <strong style="font-size:16px;">${f.toFixed(1)}%</strong>
               <span style="font-size:12px;">(S/ ${d.toFixed(2)}/u)</span>
             </div>`:""}

        <div style="margin-bottom:12px;">
          <div style="display:flex;justify-content:space-between;margin-bottom:5px;">
            <span style="color:#666;font-size:13px;">📦 Stock: <strong class="${a?"stock-bajo":""}">${s.stock}</strong> / ${g}</span>
            ${w>0?`<span style="color:#10b981;font-size:13px;">✅ ${w} vendidas</span>`:""}
          </div>
          ${g>0?`<div style="background:#e5e7eb;height:8px;border-radius:4px;overflow:hidden;">
                <div style="background:linear-gradient(90deg,#10b981,#059669);height:100%;width:${S}%;transition:width .3s;"></div>
               </div>
               <small style="color:#666;font-size:11px;">${S.toFixed(0)}% vendido</small>`:""}
        </div>

        ${e&&c>0&&(C>0||M>0)?`<div style="background:#f0f9ff;border:2px solid #3b82f6;padding:10px;border-radius:6px;margin-bottom:8px;">
               ${C>0?`<div style="display:flex;justify-content:space-between;margin-bottom:5px;"><span style="color:#1e40af;font-size:13px;">💚 Ganancia Acum.:</span><strong style="color:#10b981;">S/ ${C.toFixed(2)}</strong></div>`:""}
               ${M>0?`<div style="display:flex;justify-content:space-between;margin-bottom:5px;"><span style="color:#1e40af;font-size:13px;">💛 Potencial:</span><strong style="color:#f59e0b;">S/ ${M.toFixed(2)}</strong></div>`:""}
               <div style="border-top:1px dashed #3b82f6;margin:8px 0 5px;padding-top:5px;display:flex;justify-content:space-between;">
                 <span style="color:#1e40af;font-weight:600;">🎯 Total Lote:</span>
                 <strong style="color:#1e40af;font-size:16px;">S/ ${O.toFixed(2)}</strong>
               </div>
             </div>`:""}

        ${a?'<div style="padding:8px;background:#fff3cd;border-radius:5px;font-size:12px;color:#856404;">⚠️ Stock bajo</div>':""}
      </div>
    `}).join("")}function Ea(){const n=document.getElementById("lotesAgotadosContainer");if(!n)return;if(m.lotesAgotados.length===0){n.innerHTML='<p style="text-align:center;color:#991b1b;padding:20px;">No hay reportes de lotes agotados aún</p>';return}let e=0;const t=m.lotesAgotados.map(r=>{const s=(r.unidadesVendidas||0)*(r.precioCosto||0),i=r.gananciaGenerada||0,a=s+i;e+=i;const c=r.tipo==="Lote Acumulado";return`
      <tr style="border-bottom:1px solid ${c?"#bae6fd":"#fecaca"};background:${c?"#f0f9ff":"#fff5f5"};">
        <td style="padding:10px;"><strong>${r.nombre}</strong><br><small style="color:#666;">${r.categoria} • ${c?"📦":"📉"} ${r.tipo||"Stock Agotado"}</small></td>
        <td style="padding:10px;text-align:center;">${r.unidadesVendidas} / ${r.stockInicial}</td>
        <td style="padding:10px;text-align:center;color:#856404;">${r.unidadesConsumidasDueno||0}</td>
        <td style="padding:10px;text-align:right;">S/ ${s.toFixed(2)}</td>
        <td style="padding:10px;text-align:right;font-weight:600;color:#1e40af;">S/ ${a.toFixed(2)}</td>
        <td style="padding:10px;text-align:right;color:#10b981;font-weight:bold;">+ S/ ${i.toFixed(2)}</td>
        <td style="padding:10px;text-align:center;font-size:11px;color:#666;">${new Date(r.fechaInicio).toLocaleDateString()}<br>--<br>${new Date(r.fechaFin).toLocaleDateString()}</td>
      </tr>
    `}).join("");n.innerHTML=`
    <table class="ventas-table" style="width:100%;border-collapse:collapse;font-size:13px;">
      <thead>
        <tr style="background:#e5e7eb;color:#374151;border-bottom:2px solid #d1d5db;">
          <th style="padding:10px;text-align:left;">Producto</th>
          <th style="padding:10px;text-align:center;">Vendido</th>
          <th style="padding:10px;text-align:center;">Consumo</th>
          <th style="padding:10px;text-align:right;">Costo Total</th>
          <th style="padding:10px;text-align:right;">VENTA TOTAL</th>
          <th style="padding:10px;text-align:right;">GANANCIA</th>
          <th style="padding:10px;text-align:center;">Fecha</th>
        </tr>
      </thead>
      <tbody>${t}</tbody>
      <tfoot style="background:#fef2f2;font-weight:bold;color:#991b1b;border-top:2px solid #fecaca;">
        <tr>
          <td colspan="3" style="padding:15px;text-align:right;font-size:14px;">TOTAL HISTÓRICO LOTES:</td>
          <td style="padding:15px;text-align:right;font-size:14px;">-</td>
          <td style="padding:15px;text-align:right;font-size:14px;color:#1e40af;">-</td>
          <td style="padding:15px;text-align:right;font-size:14px;color:#10b981;">S/ ${e.toFixed(2)}</td>
          <td></td>
        </tr>
      </tfoot>
    </table>
  `}let ne=null;function Xl(n=null){var i,a,c,u,d;const e=(((i=m.usuarioActual)==null?void 0:i.rol)||"").toLowerCase()==="admin",t=(((a=m.usuarioActual)==null?void 0:a.rol)||"").toLowerCase()==="empleado";if(t&&n!==null){x.error("Los empleados no pueden editar productos existentes");return}if(!e&&!t){x.error("No tienes permisos para gestionar productos");return}ne=n!==null&&m.productos.find(f=>f.id===n)||null;const r=document.getElementById("modalProducto"),s=document.getElementById("productoModalTitle");ne?(s.textContent="Editar Producto",document.getElementById("productoNombre").value=ne.nombre,document.getElementById("productoPrecio").value=ne.precio,document.getElementById("productoPrecioCosto").value=ne.precioCosto||"",document.getElementById("productoCategoria").value=ne.categoria||"Otros",document.getElementById("productoStock").value=ne.stock,document.getElementById("productoStockMin").value=ne.stockMin,document.getElementById("productoTamanoLote").value=ne.tamanoLote||"",setTimeout(()=>Mh(),100)):(s.textContent="Agregar Producto",["productoNombre","productoPrecio","productoPrecioCosto","productoStock","productoTamanoLote"].forEach(f=>{const g=document.getElementById(f);g&&(g.value="")}),document.getElementById("productoCategoria").value="Otros",document.getElementById("productoStockMin").value="5",(c=document.getElementById("margenIndicador"))==null||c.classList.add("hidden"),(u=document.getElementById("gananciaTotalIndicador"))==null||u.classList.add("hidden")),(d=document.getElementById("productoError"))==null||d.classList.add("hidden"),r==null||r.classList.add("show")}function Mh(){var i,a,c;const n=parseFloat((i=document.getElementById("productoPrecio"))==null?void 0:i.value)||0,e=parseFloat((a=document.getElementById("productoPrecioCosto"))==null?void 0:a.value)||0,t=parseInt((c=document.getElementById("productoStock"))==null?void 0:c.value)||0,r=document.getElementById("margenIndicador"),s=document.getElementById("gananciaTotalIndicador");if(n>0&&e>0&&e<n){const u=n-e,d=u/n*100;document.getElementById("margenPorcentaje").textContent=d.toFixed(1)+"%",document.getElementById("margenMonto").textContent=u.toFixed(2),r==null||r.classList.remove("hidden"),t>0?(document.getElementById("gananciaTotalEsperada").textContent=(u*t).toFixed(2),s==null||s.classList.remove("hidden")):s==null||s.classList.add("hidden")}else r==null||r.classList.add("hidden"),s==null||s.classList.add("hidden")}async function bw(){var f,g,w,C,M,O,S,P,F,q;const n=(((f=m.usuarioActual)==null?void 0:f.rol)||"").toLowerCase()==="admin",e=(((g=m.usuarioActual)==null?void 0:g.rol)||"").toLowerCase()==="empleado";if(e&&ne){x.error("Los empleados no pueden editar productos");return}if(!n&&!e)return;const t=(w=document.getElementById("productoNombre"))==null?void 0:w.value.trim(),r=parseFloat((C=document.getElementById("productoPrecio"))==null?void 0:C.value),s=parseFloat((M=document.getElementById("productoPrecioCosto"))==null?void 0:M.value),i=(O=document.getElementById("productoCategoria"))==null?void 0:O.value,a=parseInt((S=document.getElementById("productoStock"))==null?void 0:S.value),c=parseInt((P=document.getElementById("productoStockMin"))==null?void 0:P.value),u=parseInt((F=document.getElementById("productoTamanoLote"))==null?void 0:F.value)||0,d=document.getElementById("productoError");if(!t||isNaN(r)||r<0||isNaN(a)||a<0||isNaN(c)||c<0){d.textContent="Por favor completa todos los campos correctamente",d==null||d.classList.remove("hidden");return}if(!isNaN(s)&&s>0&&s>=r){d.textContent="⚠️ El precio de costo debe ser menor que el precio de venta",d==null||d.classList.remove("hidden");return}ne?(Object.assign(ne,{nombre:t,precio:r,precioCosto:s||0,categoria:i,stock:a,stockMin:c,tamanoLote:u}),ne.stockInicial||Object.assign(ne,{stockInicial:a,unidadesVendidas:0,gananciaAcumulada:0,fechaUltimaReposicion:Date.now()})):m.productos.push({id:Date.now(),nombre:t,precio:r,precioCosto:s||0,categoria:i,stock:a,stockInicial:a,stockMin:c,tamanoLote:u,unidadesVendidas:0,gananciaAcumulada:0,conteoAcumuladoLote:0,fechaUltimaReposicion:Date.now()}),Ln(),(q=document.getElementById("modalProducto"))==null||q.classList.remove("show"),ne=null,x.success("✅ Guardando producto..."),ye.save().catch(Y=>{console.error("Error al guardar producto:",Y),x.error("❌ Error al sincronizar con la nube")})}function Iw(n){var s,i;const e=m.productos.find(a=>a.id===n);if(!e)return;ne=e,document.getElementById("stockProductoNombre").textContent=e.nombre,document.getElementById("stockActual").textContent=e.stock,document.getElementById("stockAjuste").value="";const t=(((s=m.usuarioActual)==null?void 0:s.rol)||"").toLowerCase()==="admin",r=document.getElementById("stockAjuste");r&&(r.placeholder=t?"Ej: +10 o -5":"Ej: +10 (solo positivos)",r.setAttribute("min",t?"":"1")),(i=document.getElementById("modalStock"))==null||i.classList.add("show")}async function Aw(){var r,s,i;const n=parseInt((r=document.getElementById("stockAjuste"))==null?void 0:r.value);if(isNaN(n)||n===0){x.error("Por favor ingresa un valor válido");return}const e=(((s=m.usuarioActual)==null?void 0:s.rol)||"").toLowerCase()==="admin";if(!e&&n<0){x.error("Los empleados solo pueden agregar stock");return}const t=ne.stock+n;if(t<0){x.error("El stock no puede ser negativo");return}e&&n>0&&(ne.unidadesVendidas||0)>0?await fe.show("📦 Reposición de Stock",`¿Tratar este ingreso como REPOSICIÓN?

Esto archivará las estadísticas actuales (${ne.unidadesVendidas} vendidas) y reiniciará el contador.`,{confirmText:"Sí, reponer",cancelText:"Solo agregar stock"})?(await ye.generarReporteAgotamiento(ne),Object.assign(ne,{stockInicial:t,unidadesVendidas:0,unidadesConsumidasDueno:0,gananciaAcumulada:0,conteoAcumuladoLote:0,fechaUltimaReposicion:Date.now()})):n>0&&(ne.stockInicial=t):e&&n>0&&(ne.unidadesVendidas||0)===0&&(ne.stockInicial=t,ne.fechaUltimaReposicion=ne.fechaUltimaReposicion||Date.now()),ne.stock=t,Ln(),Ea(),(i=document.getElementById("modalStock"))==null||i.classList.remove("show"),ne=null,x.success("✅ Ajustando stock..."),ye.save().catch(a=>{console.error("Error al ajustar stock:",a),x.error("❌ Error al sincronizar con la nube")})}async function Cw(n){var t;if((((t=m.usuarioActual)==null?void 0:t.rol)||"").toLowerCase()!=="admin"){x.error("Solo los administradores pueden eliminar productos");return}await fe.show("🗑️ Eliminar Producto","¿Estás seguro de eliminar este producto?",{confirmText:"Eliminar",cancelText:"Cancelar",isDestructive:!0})&&(m.productos=m.productos.filter(r=>r.id!==n),Ln(),x.success("✅ Eliminando producto..."),ye.save(!0).catch(r=>{console.error("Error al eliminar producto:",r),x.error("❌ Error al sincronizar eliminación con la nube")}))}function Sw(){document.addEventListener("click",async n=>{var s,i;const e=n.target.closest("[data-action]"),t=e==null?void 0:e.dataset.action,r=parseInt(e==null?void 0:e.dataset.id);switch(t){case"show-modal-producto":Xl(null);break;case"editar-producto":Xl(r);break;case"eliminar-producto":await Cw(r);break;case"guardar-producto":await bw();break;case"close-modal-producto":(s=document.getElementById("modalProducto"))==null||s.classList.remove("show"),ne=null;break;case"show-stock":Iw(r);break;case"ajustar-stock":await Aw();break;case"close-modal-stock":(i=document.getElementById("modalStock"))==null||i.classList.remove("show"),ne=null;break;case"cambiar-orden-inventario":m.ordenInventarioActual=e.dataset.valor||"default",Ln();break}}),["productoPrecio","productoPrecioCosto","productoStock"].forEach(n=>{var e;(e=document.getElementById(n))==null||e.addEventListener("input",Mh)}),document.addEventListener("inventario:changed",()=>{Ln(),Ea()})}const de={saveMovimientos:async(n=!1)=>await ae(G.CAJA,Q.HISTORIAL,{lista:m.movimientos},n),calcularBalances:()=>{let n=0,e=0;for(const S of m.ventas)S.metodoPago==="Mixto"?(n+=S.montoEfectivo||0,e+=S.montoYape||0):(S.metodoPago||"Efectivo")==="Efectivo"?n+=S.monto||0:S.metodoPago==="Yape"&&(e+=S.monto||0);let t=0,r=0,s=0,i=0,a=0,c=0,u=0,d=0,f=0,g=0;for(const S of m.movimientos){const P=S.monto||0;S.caja==="local"?S.tipo==="ingreso"?t+=P:["egreso","retiro","reposicion"].includes(S.tipo)?r+=P:S.tipo==="transferencia"?s+=P:S.tipo==="ajuste"&&(i+=S.ajusteTipo==="positivo"?P:-P):S.caja==="chica"?S.tipo==="ingreso"?a+=P:["egreso","retiro","reposicion"].includes(S.tipo)?c+=P:S.tipo==="ajuste"&&(u+=S.ajusteTipo==="positivo"?P:-P):S.caja==="yape"&&(S.tipo==="ajuste"?f+=S.ajusteTipo==="positivo"?P:-P:["egreso","retiro","reposicion"].includes(S.tipo)&&(g+=P)),S.origenYape===!0&&(d+=P)}const w=n+t-r-s+i,C=a+s-c+u,M=e-d-g+f,O=r+c+g;return{balLocal:w,balChica:C,balYape:M,totalEgresosTotal:O}},guardarMovimiento:async(n,e,t,r)=>{const s=parseFloat(t);if(!e||isNaN(s)||s<=0)return x.error("⚠️ Por favor completa todos los campos con valores válidos"),!1;if(n==="egreso"||n==="retiro"||n==="reposicion"){const i=de.calcularBalances();let a=0;if(r==="local"?a=i.balLocal:r==="chica"?a=i.balChica:r==="yape"&&(a=i.balYape),s>a)return x.error(`⚠️ Saldo insuficiente en la caja seleccionada (Disponible: S/ ${a.toFixed(2)})`),!1}try{const i={id:Date.now(),fecha:new Date().toLocaleString("es-PE"),descripcion:e,monto:s,tipo:n,caja:r,usuario:m.usuarioActual.nombre};return m.movimientos.unshift(i),de.saveMovimientos().catch(console.error),x.success("✅ Registrando movimiento..."),!0}catch{return x.error("❌ Error al guardar el movimiento"),!1}},guardarTransferencia:async n=>{const e=parseFloat(n);if(isNaN(e)||e<=0)return x.error("⚠️ Ingresa un monto de transferencia válido"),!1;const t=de.calcularBalances();if(e>t.balLocal)return x.error(`⚠️ No puedes transferir S/ ${e.toFixed(2)} porque solo tienes S/ ${t.balLocal.toFixed(2)} en Caja Local.`),!1;try{const r={id:Date.now(),fecha:new Date().toLocaleString("es-PE"),descripcion:"Transferencia a Caja Chica",monto:e,tipo:"transferencia",caja:"local",usuario:m.usuarioActual.nombre};return m.movimientos.unshift(r),de.saveMovimientos().catch(console.error),x.success(`✅ Registrando transferencia de S/ ${e.toFixed(2)}...`),!0}catch{return x.error("❌ Error al procesar la transferencia"),!1}},guardarTransferenciaYape:async(n,e)=>{const t=parseFloat(n);if(isNaN(t)||t<=0)return x.error("⚠️ Ingresa un monto válido mayor a 0"),!1;const r=de.calcularBalances();if(t>r.balYape)return x.error(`⚠️ Saldo insuficiente en Yape (Disponible: S/ ${r.balYape.toFixed(2)})`),!1;try{const s={id:Date.now(),fecha:new Date().toLocaleString("es-PE"),descripcion:"Transferencia desde Yape",monto:t,tipo:"ingreso",caja:e,origenYape:!0,usuario:m.usuarioActual.nombre};return m.movimientos.unshift(s),de.saveMovimientos().catch(console.error),x.success(`✅ Registrando transferencia de Yape a Caja ${e==="local"?"Local":"Chica"} por S/ ${t.toFixed(2)}...`),!0}catch{return x.error("❌ Error al guardar la transferencia"),!1}},guardarAjusteCaja:async(n,e)=>{const t=parseFloat(e);if(isNaN(t)||t<0)return x.error("⚠️ Ingresa un monto de ajuste válido (puede ser 0)"),!1;const r=de.calcularBalances();let s=0;n==="local"?s=r.balLocal:n==="chica"?s=r.balChica:s=r.balYape;const i=t-s;if(Math.abs(i)<.01)return x.info("ℹ️ El saldo coincide. No se generó ningún ajuste."),!0;try{const a=n==="local"?"Local":n==="chica"?"Chica":"Yape",c={id:Date.now(),fecha:new Date().toLocaleString("es-PE"),descripcion:`Ajuste manual de Caja ${a}`,monto:Math.abs(i),tipo:"ajuste",ajusteTipo:i>0?"positivo":"negativo",caja:n,usuario:m.usuarioActual.nombre};return m.movimientos.unshift(c),de.saveMovimientos().catch(console.error),x.success(`✅ Ajustando Caja ${a}...`),!0}catch{return x.error("❌ Error al guardar el ajuste de caja"),!1}},eliminarMovimiento:async n=>await fe.show("🗑️ Deshacer Operación",`¿Deseas DESHACER esta operación?

La transacción se anulará y el dinero volverá a su estado original en el saldo.`,{confirmText:"Deshacer",cancelText:"Cancelar",isDestructive:!0})?(m.movimientos=m.movimientos.filter(t=>t.id!==n),de.saveMovimientos(!0).catch(console.error),x.success("✅ Revirtiendo operación..."),!0):!1,borrarRegistroSinEfecto:async n=>{if(!await fe.show("🗣️ Ocultar Registro",`¿Borrar registro del historial?

El registro desaparecerá de la lista, pero se creará un ajuste neutro para que el dinero acumulado en caja NO se altere.`,{confirmText:"Ocultar",cancelText:"Cancelar",isDestructive:!1}))return!1;const t=m.movimientos.findIndex(i=>i.id===n);if(t===-1)return x.error("❌ Error: No se encontró el registro."),!1;const r=m.movimientos[t];let s=["egreso","retiro","reposicion","transferencia"].includes(r.tipo);return r.tipo==="ajuste"&&(s=r.ajusteTipo==="negativo"),m.movimientos[t].tipo="ajuste",m.movimientos[t].ajusteTipo=s?"negativo":"positivo",m.movimientos[t].oculto=!0,de.saveMovimientos().catch(console.error),x.success("✅ Ocultando registro..."),!0},limpiarHistorialMovimientos:async()=>{if((m.usuarioActual.rol||"").toLowerCase()!=="admin")return x.error("⚠️ Solo el administrador puede limpiar el historial de movimientos"),!1;const n=m.movimientos.length;return n===0?(x.info("ℹ️ El historial de movimientos ya está vacío."),!0):await fe.show("🧹 Limpiar Historial de Caja",`Estás a punto de borrar los ${n} registros de movimientos.

✅ Las VENTAS no se tocarán.
⚠️ Los saldos volverán a calcularse a partir de las ventas.

¿Deseas continuar?`,{confirmText:"Limpiar Todo",cancelText:"Cancelar",isDestructive:!0})?(m.movimientos=[],de.saveMovimientos(!0).catch(console.error),x.success("✅ Limpiando historial..."),!0):!1}};function Xe(){const n=document.getElementById("movimientosTable");if(!n)return;const e=de.calcularBalances(),t=(i,a)=>{const c=document.getElementById(i);c&&(c.textContent=a)};t("saldoCajaLocal",`S/ ${(e.balLocal||0).toFixed(2)}`),t("saldoCajaChica",`S/ ${(e.balChica||0).toFixed(2)}`),t("saldoYape",`S/ ${(e.balYape||0).toFixed(2)}`),t("totalEgresos",`S/ ${(e.totalEgresosTotal||0).toFixed(2)}`);const r=m.movimientos;if(r.length===0){n.innerHTML='<tr><td colspan="6" style="text-align:center;padding:30px;color:#999;">No hay movimientos registrados</td></tr>';return}const s=r.slice(0,m.limiteMovimientos);n.innerHTML=s.map(i=>{var C;if(i.oculto)return"";const a={egreso:"Egreso",ingreso:"Ingreso",transferencia:"Transferencia",retiro:"Retiro",reposicion:"Reposición",ajuste:`Ajuste (${i.ajusteTipo==="positivo"?"+":"-"})`}[i.tipo]||i.tipo,c={local:"💼 Local",chica:"💰 Chica",yape:"📱 Yape"}[i.caja]||i.caja,u=["egreso","retiro","reposicion","transferencia"].includes(i.tipo),d=i.tipo==="ajuste"&&i.ajusteTipo==="negativo",f=u||d?"#dc3545":"#10b981",g=u||d?"-":"+",w=(((C=m.usuarioActual)==null?void 0:C.rol)||"").toLowerCase()==="admin";return`
      <tr>
        <td style="font-size:13px;">${i.fecha}</td>
        <td>${i.descripcion}</td>
        <td style="text-align:center;">
          <span style="background:#e5e7eb;padding:2px 8px;border-radius:4px;font-size:12px;">${c}</span>
        </td>
        <td style="text-align:center;font-size:12px;">${a}</td>
        <td style="text-align:right;font-weight:600;color:${f};">${g} S/ ${(i.monto||0).toFixed(2)}</td>
        <td style="text-align:center;">
          ${w?`<div style="display:flex;gap:4px;justify-content:center;">
                <button class="btn-small btn-red" data-action="eliminar-movimiento" data-id="${i.id}" title="Deshacer" style="padding:3px 7px;font-size:11px;">↩️</button>
                <button class="btn-small btn-gray" data-action="ocultar-movimiento" data-id="${i.id}" title="Ocultar" style="padding:3px 7px;font-size:11px;">🙈</button>
              </div>`:"-"}
        </td>
      </tr>
    `}).join(""),r.length>m.limiteMovimientos&&(n.innerHTML+=`
      <tr><td colspan="6" style="text-align:center;padding:15px;">
        <button data-action="cargar-mas-movimientos" style="background:#3b82f6;color:white;border:none;padding:8px 20px;border-radius:6px;cursor:pointer;font-weight:bold;">
          Ver más (+20)
        </button>
        <p style="font-size:11px;color:#666;margin-top:5px;">Mostrando ${m.limiteMovimientos} de ${r.length}</p>
      </td></tr>
    `)}function Rw(){var e;const n=document.getElementById("modalMovimiento");n&&((e=document.getElementById("movDesc"))==null||e.setAttribute("value",""),document.getElementById("movDesc")&&(document.getElementById("movDesc").value=""),document.getElementById("movMonto")&&(document.getElementById("movMonto").value=""),n.classList.add("show"))}async function Pw(){var s,i,a,c,u;const n=(s=document.getElementById("movTipo"))==null?void 0:s.value,e=(i=document.getElementById("movDesc"))==null?void 0:i.value.trim(),t=(a=document.getElementById("movMonto"))==null?void 0:a.value,r=(c=document.getElementById("movCaja"))==null?void 0:c.value;await de.guardarMovimiento(n,e,t,r)&&((u=document.getElementById("modalMovimiento"))==null||u.classList.remove("show"),Xe())}async function xw(){var e;const n=(e=document.getElementById("montoTransferencia"))==null?void 0:e.value;await de.guardarTransferencia(n)&&(document.getElementById("montoTransferencia")&&(document.getElementById("montoTransferencia").value=""),Xe())}async function kw(){var t,r;const n=(t=document.getElementById("montoTransYape"))==null?void 0:t.value,e=((r=document.getElementById("destinoTransYape"))==null?void 0:r.value)||"local";await de.guardarTransferenciaYape(n,e)&&(document.getElementById("montoTransYape")&&(document.getElementById("montoTransYape").value=""),Xe())}async function fs(n){var r;const e={local:"ajusteMontoLocal",chica:"ajusteMontoChica",yape:"ajusteMontoYape"}[n],t=(r=document.getElementById(e))==null?void 0:r.value;await de.guardarAjusteCaja(n,t)&&(document.getElementById(e)&&(document.getElementById(e).value=""),Xe())}async function Dw(){await de.limpiarHistorialMovimientos()&&Xe()}function Vw(){document.addEventListener("click",async n=>{var s,i,a,c,u,d,f,g,w;const e=n.target.closest("[data-action]"),t=e==null?void 0:e.dataset.action,r=parseInt(e==null?void 0:e.dataset.id);switch(t){case"show-modal-movimiento":Rw();break;case"close-modal-movimiento":(s=document.getElementById("modalMovimiento"))==null||s.classList.remove("show");break;case"show-modal-transferencia":(i=document.getElementById("modalTransferencia"))==null||i.classList.add("show");break;case"close-modal-transferencia":(a=document.getElementById("modalTransferencia"))==null||a.classList.remove("show");break;case"show-modal-transferencia-yape":(c=document.getElementById("modalTransferenciaYape"))==null||c.classList.add("show");break;case"close-modal-transferencia-yape":(u=document.getElementById("modalTransferenciaYape"))==null||u.classList.remove("show");break;case"show-modal-ajuste-caja":{const C=e==null?void 0:e.dataset.caja,M=document.getElementById("modalAjusteCaja");if(M){const O=document.getElementById("ajusteTitulo");O&&(O.textContent=`⚖️ Ajustar Saldo ${C==="local"?"Caja Local":C==="chica"?"Caja Chica":"Yape"}`),M.dataset.cajaTarget=C,(d=document.getElementById("ajusteMontoLocal"))==null||d.classList.toggle("hidden",C!=="local"),(f=document.getElementById("ajusteMontoChica"))==null||f.classList.toggle("hidden",C!=="chica"),(g=document.getElementById("ajusteMontoYape"))==null||g.classList.toggle("hidden",C!=="yape"),["ajusteMontoLocal","ajusteMontoChica","ajusteMontoYape"].forEach(S=>{const P=document.getElementById(S);P&&(P.value="")}),M.classList.add("show")}break}case"close-modal-ajuste-caja":(w=document.getElementById("modalAjusteCaja"))==null||w.classList.remove("show");break;case"guardar-ajuste-caja":{const C=document.getElementById("modalAjusteCaja"),M=(C==null?void 0:C.dataset.cajaTarget)||"local";await fs(M),C==null||C.classList.remove("show");break}case"guardar-movimiento":await Pw();break;case"guardar-transferencia":await xw();break;case"guardar-transferencia-yape":await kw();break;case"ajuste-local":await fs("local");break;case"ajuste-chica":await fs("chica");break;case"ajuste-yape":await fs("yape");break;case"limpiar-movimientos":await Dw();break;case"eliminar-movimiento":await de.eliminarMovimiento(r)&&Xe();break;case"ocultar-movimiento":await de.borrarRegistroSinEfecto(r)&&Xe();break;case"cargar-mas-movimientos":m.limiteMovimientos+=20,Xe();break}}),document.addEventListener("caja:changed",()=>Xe())}const Qe={saveCierres:async(n=!1)=>await ae(G.CIERRES,Q.HISTORIAL,{lista:m.cierres},n),saveConsumosDueno:async(n=!1)=>await ae(G.CONSUMOS,Q.DUENO,{lista:m.consumosDueno},n),registrarConsumoDueno:async n=>{if(n.length===0)return x.error("⚠️ El carrito de consumos está vacío"),!1;try{const e=n.reduce((s,i)=>s+i.precio*i.cantidad,0);let t=0;const r={id:Date.now(),fecha:new Date().toLocaleString("es-PE"),tipo:"Consumo Dueño",productos:n.map(s=>{const i=m.productos.find(c=>c.id===s.id),a=i&&i.precioCosto||0;return t+=a*s.cantidad,{nombre:s.nombre,precio:s.precio,precioCosto:a,cantidad:s.cantidad}}),totalVenta:e,total:e,totalCosto:t};for(const s of n){const i=m.productos.find(a=>a.id===s.id);i&&(i.stock-=s.cantidad,i.unidadesConsumidasDueno=(i.unidadesConsumidasDueno||0)+s.cantidad,i.stock===0&&(await Qe.saveConsumosDueno(),setTimeout(()=>{if(confirm(`⚠️ El producto ${i.nombre} se ha agotado. ¿Deseas reponerlo ahora?`)){const c=new CustomEvent("triggerAdjustStock",{detail:{id:i.id}});window.dispatchEvent(c)}},100)))}return m.consumosDueno.push(r),await ae(G.PRODUCTOS,Q.TODOS,{lista:m.productos}),await Qe.saveConsumosDueno(),x.success("✅ Consumo del dueño registrado."),!0}catch{return x.error("❌ Error al guardar el consumo"),!1}},eliminarConsumoDueno:async n=>{if(!await fe.show("🗑️ Eliminar Registro de Consumo",`¿Estás seguro de eliminar este registro de consumo del dueño?

📦 Las unidades se devolverán al inventario.`,{confirmText:"Eliminar",cancelText:"Cancelar",isDestructive:!0}))return!1;const t=m.consumosDueno.find(r=>r.id===n);return t?(t.productos.forEach(r=>{const s=m.productos.find(i=>i.nombre===r.nombre);s&&(s.stock+=r.cantidad,s.unidadesConsumidasDueno=Math.max(0,(s.unidadesConsumidasDueno||0)-r.cantidad))}),m.consumosDueno=m.consumosDueno.filter(r=>r.id!==n),await ae(G.PRODUCTOS,Q.TODOS,{lista:m.productos}),await Qe.saveConsumosDueno(!0),x.success("✅ Registro eliminado y stock devuelto"),!0):!1},cerrarDia:async()=>{const n=m.ultimoCierre?m.ventas.filter(S=>S.id>m.ultimoCierre):m.ventas;if(n.length===0)return x.warning("⚠️ No hay ventas nuevas para cerrar"),!1;const e=n.reduce((S,P)=>S+(P.monto||0),0),t=n.reduce((S,P)=>P.metodoPago==="Mixto"?S+(P.montoEfectivo||0):(P.metodoPago||"Efectivo")==="Efectivo"?S+(P.monto||0):S,0),r=n.reduce((S,P)=>P.metodoPago==="Mixto"?S+(P.montoYape||0):P.metodoPago==="Yape"?S+(P.monto||0):S,0);if(!await fe.show("📊 Confirmar Cierre de Turno",`RESUMEN DE CIERRE DE CAJA
━━━━━━━━━━━━━━━━━━━━
🛒 Ventas Totales: S/ ${e.toFixed(2)}
   💵 Efectivo : S/ ${t.toFixed(2)}
   📱 Yape/Plin: S/ ${r.toFixed(2)}

¿Estás seguro de registrar el cierre? Se archivarán estas ventas y se descargará el reporte en PDF.`,{confirmText:"Confirmar Cierre",cancelText:"Volver",isDestructive:!1}))return!1;const i=m.ultimoCierre?m.consumosDueno.filter(S=>S.id>m.ultimoCierre):m.consumosDueno,a=i.reduce((S,P)=>S+(P.totalVenta||P.total||0),0),c=i.reduce((S,P)=>S+(P.totalCosto||0),0),u=m.ultimoCierre?m.movimientos.filter(S=>S.id>m.ultimoCierre):m.movimientos,d=u.filter(S=>S.tipo==="ingreso").reduce((S,P)=>S+P.monto,0),f=u.filter(S=>["egreso","retiro","reposicion"].includes(S.tipo)).reduce((S,P)=>S+P.monto,0),g=n.reduce((S,P)=>S+(P.ganancia||0),0),w=g+d-f-c,C=de.calcularBalances(),M=n.filter(S=>S.tipo==="Mesa Billar"&&S.detalle).reduce((S,P)=>S+(P.detalle.tiempoMinutos||0),0)/60,O={id:Date.now(),timestamp:Date.now(),fecha:new Date().toLocaleString("es-PE"),usuario:m.usuarioActual.nombre,cantidadVentas:n.length,total:e,totalEfectivo:t,totalYape:r,balanceLocal:C.balLocal,balanceChica:C.balChica,gananciaVentas:g,totalEgresos:f,totalIngresosExtra:d,utilidadNeta:w,ventas:n.map(S=>({...S})),ventasMesas:n.filter(S=>S.tipo==="Mesa Billar").reduce((S,P)=>S+P.monto,0),ventasProductos:n.filter(S=>S.tipo!=="Mesa Billar").reduce((S,P)=>S+P.monto,0),consumosDueno:i.map(S=>({...S})),totalConsumosDuenoVenta:a,totalConsumosDuenoCosto:c,horasBillar:M};return m.cierres.push(O),m.ultimoCierre=O.timestamp,await Qe.saveCierres(),x.success("✅ Cierre registrado y archivado"),Qe.descargarReporteCierre(O),!0},eliminarCierre:async n=>(m.usuarioActual.rol||"").toLowerCase()!=="admin"?(x.error("⚠️ Solo el administrador puede eliminar cierres."),!1):await fe.show("🗑️ Deshacer Cierre de Turno",`¿Estás seguro de deshacer este cierre?

Las ventas y consumos vuelven a estar activos en el periodo actual. El cierre se borrará permanentemente.`,{confirmText:"Deshacer Cierre",cancelText:"Volver",isDestructive:!0})?(m.cierres=m.cierres.filter(t=>t.id!==n),m.cierres.length>0?m.ultimoCierre=m.cierres[m.cierres.length-1].timestamp:m.ultimoCierre=null,await Qe.saveCierres(!0),x.success("✅ Cierre eliminado. Ventas reactivadas."),!0):!1,descargarReporteCierre:n=>{const e=window.open("","_blank","width=850,height=600");if(!e){x.error("⚠️ El navegador bloqueó la ventana emergente. Por favor habilítalas.");return}e.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8">
    <title>Cierre - ${n.fecha}</title>
    <style>
      *{margin:0;padding:0;box-sizing:border-box}
      body{font-family:'Segoe UI',Arial,sans-serif;padding:30px;background:#f5f5f5;color:#333;font-size:13px}
      .container{max-width:850px;margin:0 auto;background:white;padding:30px;border-radius:8px;box-shadow:0 2px 10px rgba(0,0,0,0.1)}
      h1{color:#2d7a4d;margin-bottom:20px;text-align:center;font-size:26px;border-bottom:3px solid #2d7a4d;padding-bottom:15px}
      .info-grid{display:grid;grid-template-columns:1fr 1fr;gap:15px;margin-bottom:25px;padding:15px;background:#f8f9fa;border-radius:6px}
      .info-item{display:flex;flex-direction:column}
      .info-label{font-size:11px;color:#666;margin-bottom:4px}
      .info-value{font-size:15px;font-weight:600}
      .summary-box{background:linear-gradient(135deg,#2d7a4d,#1e5a35);color:white;padding:20px;border-radius:8px;margin-bottom:25px}
      .summary-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:15px}
      .summary-item{text-align:center}
      .summary-label{font-size:12px;opacity:.9;margin-bottom:5px}
      .summary-value{font-size:22px;font-weight:bold}
      .section{margin-bottom:25px}
      .section-title{font-size:16px;color:#2d7a4d;margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid #dee2e6;font-weight:700}
      table{width:100%;border-collapse:collapse;font-size:12px}
      th{background:#f8f9fa;padding:10px;text-align:left;color:#495057;border-bottom:2px solid #dee2e6}
      td{padding:10px;border-bottom:1px solid #f0f0f0}
      .monto{color:#2d7a4d;font-weight:600;text-align:right}
      .right{text-align:right} .center{text-align:center}
      .consumo-dueno{background:#fff3cd;padding:15px;border-radius:6px;border-left:4px solid #ff9800}
      .consumo-item{padding:5px 0;border-bottom:1px solid #f0e5c9}
      .consumo-item:last-child{border-bottom:none}
      @media print{.no-print{display:none}body{background:white;padding:0}.container{box-shadow:none}}
    </style></head><body>
    <div class="no-print" style="margin-bottom:20px"><button onclick="window.print()" style="background:#2d7a4d;color:white;border:none;padding:10px 25px;border-radius:5px;cursor:pointer;font-weight:bold;">🖨️ Imprimir Cierre</button></div>
    <div class="container">
      <h1>📊 REPORTE DE CIERRE DE CAJA</h1>
      <div class="info-grid">
        <div class="info-item"><span class="info-label">Fecha del Reporte</span><span class="info-value">${n.fecha}</span></div>
        <div class="info-item"><span class="info-label">Responsable</span><span class="info-value">${n.usuario}</span></div>
      </div>
      <div class="summary-box">
        <div class="summary-grid">
          <div class="summary-item"><div class="summary-label">Total Recaudado</div><div class="summary-value">S/ ${n.total.toFixed(2)}</div></div>
          <div class="summary-item"><div class="summary-label">Operaciones</div><div class="summary-value">${n.cantidadVentas}</div></div>
          <div class="summary-item"><div class="summary-label">💵 Efectivo (Caja)</div><div class="summary-value">S/ ${n.totalEfectivo.toFixed(2)}</div></div>
          <div class="summary-item"><div class="summary-label">📱 Yape/Plin</div><div class="summary-value">S/ ${n.totalYape.toFixed(2)}</div></div>
          <div class="summary-item" style="grid-column: 1 / -1; margin-top: 10px; border-top: 1px dashed rgba(255,255,255,0.3); padding-top: 10px;">
            <div class="summary-label">🎱 Tiempo de Alquiler de Billar</div><div class="summary-value">${n.horasBillar.toFixed(1)} hrs</div>
          </div>
        </div>
      </div>
      
      <div class="section">
        <div class="section-title">🏠 Resumen Estimado Cajas Físicas</div>
        <table style="max-width:500px">
          <tr><td>Caja Local (Físico Estimado):</td><td style="font-weight:600;text-align:right">S/ ${n.balanceLocal.toFixed(2)}</td></tr>
          <tr><td>Caja Chica:</td><td style="font-weight:600;text-align:right">S/ ${n.balanceChica.toFixed(2)}</td></tr>
        </table>
      </div>

      <div class="section">
        <div class="section-title">📋 Detalle de Ventas del Período</div>
        <table>
          <thead><tr><th>Fecha</th><th>Tipo</th><th>Descripción</th><th>Pago</th><th class="right">Monto</th></tr></thead>
          <tbody>
            ${n.ventas.map(t=>{var s;let r="";return t.detalle?t.tipo==="Mesa Billar"?(r=`${t.tipoDetalle} | ${t.detalle.horaInicio}-${t.detalle.horaFin} (${t.detalle.tiempoMinutos}min)`,t.detalle.consumos.length>0&&(r+=" + Consumos")):t.tipo==="Cobro Parcial"?r=t.detalle.consumos.map(i=>`${i.producto} x${i.cantidad}`).join(", "):t.detalle.consumos&&(r=t.detalle.consumos.map(i=>`${i.producto} x${i.cantidad}`).join(", ")):r=t.tipoDetalle||t.tipo,`<tr>
                <td>${((s=t.fecha.split(",")[1])==null?void 0:s.trim())||t.fecha}</td>
                <td>${t.tipo}</td>
                <td>${r}</td>
                <td class="center">${t.metodoPago||"Efectivo"}</td>
                <td class="monto">S/ ${t.monto.toFixed(2)}</td>
              </tr>`}).join("")}
          </tbody>
        </table>
      </div>

      ${n.consumosDueno&&n.consumosDueno.length>0?`
      <div class="section">
        <div class="section-title">🍽️ Consumo del Dueño (Descontado de Utilidades)</div>
        <div class="consumo-dueno">
          ${n.consumosDueno.map(t=>{var r;return`
            <div class="consumo-item">
              <span style="font-weight:600">${((r=t.fecha.split(",")[1])==null?void 0:r.trim())||t.fecha}</span>: 
              ${t.productos.map(s=>`${s.nombre} x${s.cantidad}`).join(", ")}
              <strong style="float:right;color:#d97706">S/ ${t.totalCosto.toFixed(2)} (Costo)</strong>
            </div>
          `}).join("")}
          <div style="margin-top:10px;text-align:right;font-weight:bold;color:#b45309">Valor Costo Total Lote: S/ ${n.totalConsumosDuenoCosto.toFixed(2)}</div>
        </div>
      </div>`:""}

      <footer style="margin-top:40px;text-align:center;color:#aaa;font-size:11px;border-top:1px solid #eee;padding-top:15px">
        Sistema de Gestión de Billar • Reporte Cierre de Caja
      </footer>
    </div>
    <script>window.onload=function(){setTimeout(()=>window.print(),600)}<\/script>
    </body></html>`),e.document.close()},descargarConsumoDuenoPDF:()=>{const n=m.ultimoCierre?m.consumosDueno.filter(r=>r.id>m.ultimoCierre):m.consumosDueno;if(n.length===0){x.warning("⚠️ No hay consumos para descargar");return}const e=n.reduce((r,s)=>r+(s.total||s.totalVenta||0),0),t=window.open("","_blank","width=850,height=600");if(!t){x.error("⚠️ El navegador bloqueó la ventana emergente. Por favor habilítalas.");return}t.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8">
    <title>Consumo del Dueño</title>
    <style>
      *{margin:0;padding:0;box-sizing:border-box}
      body{font-family:'Segoe UI',Arial,sans-serif;padding:30px;color:#333;font-size:13px}
      .header{text-align:center;border-bottom:3px solid #ff9800;padding-bottom:20px;margin-bottom:25px}
      h1{color:#ff9800;font-size:26px;margin-bottom:10px}
      .total-box{background:#fff3cd;padding:20px;border-radius:8px;margin-bottom:30px;border-left:4px solid #ff9800}
      .consumo-item{background:#f9f9f9;padding:15px;border-radius:6px;margin-bottom:12px;border-left:4px solid #ff9800;page-break-inside:avoid}
      .consumo-header{display:flex;justify-content:space-between;margin-bottom:10px;padding-bottom:10px;border-bottom:1px solid #e0e0e0}
      .footer{margin-top:40px;text-align:center;color:#999;font-size:11px;border-top:1px solid #e0e0e0;padding-top:15px}
      @media print{.no-print{display:none}body{padding:15px}}
    </style></head><body>
    <div class="no-print"><button onclick="window.print()" style="background:#ff9800;color:white;border:none;padding:10px 25px;border-radius:5px;cursor:pointer;font-weight:bold;margin-bottom:20px">🖨️ Imprimir / Guardar como PDF</button></div>
    <div class="header">
      <h1>🍽️ REPORTE DE CONSUMO DEL DUEÑO</h1>
      <p style="color:#666">Generado: ${new Date().toLocaleString("es-PE")}</p>
      <p style="color:#856404;margin-top:10px;font-size:13px">⚠️ Estos consumos NO fueron cobrados pero se restaron de la utilidad final por costo de stock.</p>
    </div>
    <div class="total-box">
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <div><strong>Total Consumo del Período</strong><div style="font-size:11px;color:#856404">${n.length} registros</div></div>
        <div style="font-size:30px;font-weight:bold;color:#ff9800">S/ ${e.toFixed(2)}</div>
      </div>
    </div>
    
    ${n.reverse().map(r=>`
      <div class="consumo-item">
        <div class="consumo-header">
          <div style="font-weight:bold">${r.fecha}</div>
          <div style="font-size:18px;font-weight:bold;color:#ff9800">S/ ${(r.total||r.totalVenta||0).toFixed(2)}</div>
        </div>
        <div style="background:#fff3cd;padding:10px;border-radius:4px">
          ${r.productos.map(s=>`
            <div style="display:flex;justify-content:space-between;padding:3px 0;color:#856404;font-size:12px">
              <span>• ${s.nombre} x${s.cantidad} (S/ ${(s.precio||0).toFixed(2)} c/u)</span>
              <strong>S/ ${((s.precio||0)*s.cantidad).toFixed(2)}</strong>
            </div>
          `).join("")}
        </div>
      </div>
    `).join("")}
    
    <div class="footer"><p>Sistema de Gestión de Billar • Consumos Dueño</p></div>
    </body></html>`),t.document.close()},descargarReporteMensualPDF:(n,e)=>{const r=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"][e],s=L=>{let V;if(typeof L=="number")V=new Date(L);else if(typeof L=="string"){const _=L.split(",")[0].trim().split("/");_.length===3?V=new Date(`${_[2]}-${_[1].padStart(2,"0")}-${_[0].padStart(2,"0")}`):V=new Date(L)}else V=new Date;return{anio:V.getFullYear(),mes:V.getMonth()}},i=m.ventas.filter(L=>{const V=s(L.fecha||L.id);return V.anio===n&&V.mes===e}),a=m.movimientos.filter(L=>{const V=s(L.fecha||L.id);return V.anio===n&&V.mes===e}),c=m.consumosDueno.filter(L=>{const V=s(L.fecha||L.id);return V.anio===n&&V.mes===e}),u=i.reduce((L,V)=>L+(V.monto||0),0);i.reduce((L,V)=>V.metodoPago==="Mixto"?L+(V.montoEfectivo||0):(V.metodoPago||"Efectivo")==="Efectivo"?L+(V.monto||0):L,0),i.reduce((L,V)=>V.metodoPago==="Mixto"?L+(V.montoYape||0):V.metodoPago==="Yape"?L+(V.monto||0):L,0);const d=a.filter(L=>["egreso","retiro","reposicion"].includes(L.tipo)).reduce((L,V)=>L+(V.monto||0),0),f=a.filter(L=>L.tipo==="ingreso").reduce((L,V)=>L+(V.monto||0),0),g=i.reduce((L,V)=>L+(V.ganancia||0),0),w=c.reduce((L,V)=>L+(V.totalCosto||0),0),C=g+f-d-w,M=i.filter(L=>L.tipo==="Mesa Billar").reduce((L,V)=>{var _;return L+(((_=V.detalle)==null?void 0:_.tiempoMinutos)||0)},0),O=Math.floor(M/60),S=M%60,P={};i.forEach(L=>{L.detalle&&L.detalle.consumos&&L.detalle.consumos.forEach(V=>{const _=V.producto||"Desconocido";P[_]||(P[_]={cant:0,total:0}),P[_].cant+=V.cantidad||0,P[_].total+=V.subtotal||0})});const F=Object.entries(P).sort((L,V)=>V[1].cant-L[1].cant);let q="";F.length>0&&(q=`
        <div class="section">
          <div class="section-title">📦 PRODUCTOS VENDIDOS (UNIDADES Y MONTO)</div>
          <table>
            <thead><tr><th>Producto</th><th class="center">Unidades</th><th class="right">Subtotal</th></tr></thead>
            <tbody>
              ${F.map(([L,V])=>`
                <tr><td style="font-weight:600">${L}</td><td class="center" style="font-size:14px;font-weight:800;color:#1e40af">${V.cant}</td><td class="right green">S/ ${V.total.toFixed(2)}</td></tr>
              `).join("")}
            </tbody>
            <tfoot><tr style="background:#f8fafc;font-weight:800;"><td style="padding:10px;">TOTAL</td><td class="center">${F.reduce((L,V)=>L+V[1].cant,0)}</td><td class="right">S/ ${F.reduce((L,V)=>L+V[1].total,0).toFixed(2)}</td></tr></tfoot>
          </table>
        </div>`);const Y=window.open("","_blank","width=850,height=700");if(!Y){x.error("⚠️ El navegador bloqueó la ventana emergente.");return}Y.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8">
    <title>Reporte - ${r} ${n}</title>
    <style>
      *{margin:0;padding:0;box-sizing:border-box}
      body{font-family:'Segoe UI',Arial,sans-serif;padding:30px;background:white;color:#333;font-size:13px}
      .header{text-align:center;border-bottom:4px solid #2d7a4d;padding-bottom:20px;margin-bottom:25px}
      h1{color:#2d7a4d;font-size:26px;margin-bottom:6px}
      .subtitle{color:#666;font-size:14px}
      .kpi-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:15px;margin-bottom:25px}
      .kpi{padding:18px;border-radius:8px;text-align:center;color:white}
      .kpi-label{font-size:11px;font-weight:600;margin-bottom:6px;opacity:.8}
      .kpi-val{font-size:20px;font-weight:800}
      .section{margin-bottom:25px}
      .section-title{font-size:16px;font-weight:700;color:#2d7a4d;border-bottom:2px solid #e5e7eb;padding-bottom:8px;margin-bottom:12px}
      table{width:100%;border-collapse:collapse;font-size:12px}
      th{background:#f0fdf4;padding:9px;text-align:left;color:#1e5a35;border-bottom:2px solid #2d7a4d}
      td{padding:9px;border-bottom:1px solid #f0f0f0}
      .right{text-align:right} .center{text-align:center} .green{color:#16a34a;font-weight:700} .red{color:#dc2626;font-weight:700}
      .badge{display:inline-block;padding:2px 8px;border-radius:10px;font-size:11px;font-weight:600}
      .badge-green{background:#dcfce7;color:#15803d} .badge-purple{background:#f3e8ff;color:#7e22ce}
      .badge-info{background:#e0f2fe;color:#0369a1}
      .utilidad-box{background:#eff6ff;border:2px solid #2563eb;border-radius:10px;padding:20px;display:flex;justify-content:space-between;align-items:center;margin-bottom:25px}
      @media print{.no-print{display:none}body{padding:10px}}
    </style></head><body>
    <div class="no-print"><button onclick="window.print()" style="background:#2d7a4d;color:white;border:none;padding:10px 25px;border-radius:6px;cursor:pointer;margin-bottom:20px;font-weight:bold;">🖨️ Imprimir Reporte Mensual</button></div>
    <div class="header"><h1>📅 REPORTE MENSUAL</h1><div class="subtitle">${r} ${n}</div></div>

    <div class="kpi-grid">
      <div class="kpi" style="background:linear-gradient(135deg,#2d7a4d,#4ade80)"><div class="kpi-label">Ventas</div><div class="kpi-val">S/ ${u.toFixed(2)}</div></div>
      <div class="kpi" style="background:linear-gradient(135deg,#991b1b,#ef4444)"><div class="kpi-label">Gastos</div><div class="kpi-val">S/ ${d.toFixed(2)}</div></div>
      <div class="kpi" style="background:linear-gradient(135deg,#1e40af,#3b82f6)"><div class="kpi-label">Margen</div><div class="kpi-val">S/ ${g.toFixed(2)}</div></div>
      <div class="kpi" style="background:linear-gradient(135deg,#64748b,#94a3b8)"><div class="kpi-label">🎱 Billar</div><div class="kpi-val">${O}h ${S}min</div></div>
    </div>

    <div class="utilidad-box">
      <div><div style="font-weight:700;color:#1e40af">🚀 UTILIDAD NETA DEL MES</div></div>
      <div style="font-size:26px;font-weight:900;color:${C>=0?"#1e40af":"#dc2626"}">S/ ${C.toFixed(2)}</div>
    </div>

    ${q}

    <div class="section">
      <div class="section-title">🧾 Detalle de Ventas del Mes</div>
      <table><thead><tr><th>Fecha</th><th>Tipo</th><th>Usuario</th><th class="center">Pago</th><th class="right">Monto</th></tr></thead>
      <tbody>
        ${i.map(L=>{const V=L.metodoPago==="Mixto"?`Ef: S/${(L.montoEfectivo||0).toFixed(2)} / Yp: S/${(L.montoYape||0).toFixed(2)}`:L.metodoPago||"Efectivo",_=L.metodoPago==="Yape"?"badge-purple":L.metodoPago==="Mixto"?"badge-info":"badge-green";return`<tr>
            <td>${L.fecha}</td>
            <td>${L.tipo} (${L.tipoDetalle||""})</td>
            <td>${L.usuario}</td>
            <td class="center"><span class="badge ${_}">${V}</span></td>
            <td class="monto">S/ ${L.monto.toFixed(2)}</td>
          </tr>`}).join("")}
      </tbody></table>
    </div>

    ${c.length>0?`
    <div class="section">
      <div class="section-title">🍽️ Consumos del Dueño</div>
      <table>
        <thead><tr><th>Fecha</th><th>Productos</th><th class="right">Costo</th></tr></thead>
        <tbody>
          ${c.map(L=>`<tr>
            <td>${L.fecha}</td>
            <td>${L.productos.map(V=>`${V.nombre} x${V.cantidad}`).join(", ")}</td>
            <td class="right red">S/ ${L.totalCosto.toFixed(2)}</td>
          </tr>`).join("")}
        </tbody>
      </table>
    </div>`:""}

    <footer style="margin-top:30px;text-align:center;color:#aaa;font-size:11px;border-top:1px solid #eee;padding-top:15px">
      Sistema de Gestión de Billar
    </footer>
    <script>window.onload=function(){setTimeout(()=>window.print(),600)}<\/script>
    </body></html>`),Y.document.close()}};function hr(){if(!m.usuarioActual)return;const n=m.ultimoCierre?m.ventas.filter(f=>f.id>m.ultimoCierre):m.ventas,e=n.reduce((f,g)=>f+(g.monto||0),0),t=n.filter(f=>f.tipo==="Mesa Billar").reduce((f,g)=>f+(g.monto||0),0),r=n.filter(f=>f.tipo!=="Mesa Billar").reduce((f,g)=>f+(g.monto||0),0),s=n.reduce((f,g)=>g.metodoPago==="Mixto"?f+(g.montoEfectivo||0):(g.metodoPago||"Efectivo")==="Efectivo"?f+(g.monto||0):f,0),i=n.reduce((f,g)=>g.metodoPago==="Mixto"?f+(g.montoYape||0):g.metodoPago==="Yape"?f+(g.monto||0):f,0),c=(m.ultimoCierre?m.consumosDueno.filter(f=>f.id>m.ultimoCierre):m.consumosDueno).reduce((f,g)=>f+(g.totalCosto||0),0),u=(f,g)=>{const w=document.getElementById(f);w&&(w.textContent=g)};u("reporteTotalVentas",`S/ ${e.toFixed(2)}`),u("reporteVentasMesas",`S/ ${t.toFixed(2)}`),u("reporteVentasProductos",`S/ ${r.toFixed(2)}`),u("reporteTransacciones",n.length.toString()),u("reporteConsumoDueno",`S/ ${c.toFixed(2)}`),u("reporteTotalEfectivo",`S/ ${s.toFixed(2)}`),u("reporteTotalYape",`S/ ${i.toFixed(2)}`);const d=document.getElementById("reporteDetalleTable");d&&(n.length===0?d.innerHTML='<tr><td colspan="5" style="text-align:center;padding:30px;color:#999;">No hay ventas en el período actual</td></tr>':d.innerHTML=[...n].reverse().map(f=>{const g=f.metodoPago||"Efectivo",w=g==="Yape"?"#742284":g==="Mixto"?"#0ea5e9":"#10b981",C=g==="Mixto"?`Ef:S/${(f.montoEfectivo||0).toFixed(2)} / Yp:S/${(f.montoYape||0).toFixed(2)}`:g;return`
          <tr>
            <td style="font-size:13px;">${f.fecha}</td>
            <td>${f.tipoDetalle||f.tipo}</td>
            <td style="font-size:13px;color:#666;">${f.usuario}</td>
            <td style="text-align:right;font-weight:600;color:#2d7a4d;">S/ ${f.monto.toFixed(2)}</td>
            <td style="text-align:center;">
              <span style="background:${w};color:white;padding:2px 6px;border-radius:4px;font-size:11px;">${C}</span>
            </td>
          </tr>`}).join("")),Nh()}function Nh(){var i;const n=document.getElementById("historialCierresContainer");if(!n)return;if(m.cierres.length===0){n.innerHTML='<p style="text-align:center;color:#999;padding:20px;">No hay cierres registrados aún</p>';return}const e=(((i=m.usuarioActual)==null?void 0:i.rol)||"").toLowerCase()==="admin",t=[...m.cierres].reverse(),r=m.limiteCierres||10,s=t.slice(0,r);n.innerHTML=s.map(a=>`
    <div style="background:#f8f9fa;border-radius:12px;padding:16px;margin-bottom:12px;border-left:4px solid #10b981;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
      <div>
        <strong style="font-size:14px;">${a.fecha}</strong>
        <small style="display:block;color:#666;">${a.usuario} • ${a.cantidadVentas} transacciones</small>
      </div>
      <div style="text-align:center;">
        <div style="font-size:22px;font-weight:800;color:#2d7a4d;">S/ ${(a.total||0).toFixed(2)}</div>
        <small style="color:#666;">Ef: S/${(a.totalEfectivo||0).toFixed(2)} | Yp: S/${(a.totalYape||0).toFixed(2)}</small>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        <button class="btn-small btn-blue" data-action="descargar-cierre" data-id="${a.id}">📥 PDF</button>
        ${e?`<button class="btn-small btn-red" data-action="eliminar-cierre" data-id="${a.id}">🗑️</button>`:""}
      </div>
    </div>
  `).join(""),m.cierres.length>r&&(n.innerHTML+=`
      <div style="text-align: center; padding: 15px;">
        <button data-action="cargar-mas-cierres" style="background: #3b82f6; color: white; border: none; padding: 8px 20px; border-radius: 6px; cursor: pointer; font-weight: bold; font-size: 13px;">
          Ver más reportes (+10)
        </button>
        <p style="font-size: 11px; color: #666; margin-top: 5px;">Mostrando ${r} de ${m.cierres.length} reportes</p>
      </div>
    `)}const Oh=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];function En(n){let e;if(typeof n=="number")e=new Date(n);else if(typeof n=="string"){const t=n.split(",")[0].trim().split("/");t.length===3?e=new Date(`${t[2]}-${t[1].padStart(2,"0")}-${t[0].padStart(2,"0")}`):e=new Date(n)}else e=new Date;return{anio:e.getFullYear(),mes:e.getMonth()}}function Cs(){const n=document.getElementById("filtroAnioMensual");if(!n)return;const e=new Set;m.ventas.forEach(f=>{const g=En(f.fecha||f.id);isNaN(g.anio)||e.add(g.anio)}),m.cierres.forEach(f=>{const g=En(f.fecha||f.id);isNaN(g.anio)||e.add(g.anio)});const t=[...e].sort((f,g)=>g-f);t.length===0&&t.push(new Date().getFullYear()),parseInt(n.value)||t[0],(!n.value||!t.includes(parseInt(n.value)))&&(n.innerHTML=t.map(f=>`<option value="${f}">${f}</option>`).join(""),n.value=t[0]);const r=parseInt(n.value)||t[0],s=document.getElementById("tablaMensualBody");if(!s)return;let i=0,a=0,c=0,u=0;const d=Oh.map((f,g)=>{const w=m.ventas.filter(V=>{const _=En(V.fecha||V.id);return _.anio===r&&_.mes===g}),C=m.movimientos.filter(V=>{const _=En(V.fecha||V.id);return _.anio===r&&_.mes===g}),M=m.consumosDueno.filter(V=>{const _=En(V.fecha||V.id);return _.anio===r&&_.mes===g});if(w.length===0&&C.length===0)return null;const O=w.reduce((V,_)=>V+(_.monto||0),0),S=w.reduce((V,_)=>_.metodoPago==="Mixto"?V+(_.montoEfectivo||0):(_.metodoPago||"Efectivo")==="Efectivo"?V+(_.monto||0):V,0),P=w.reduce((V,_)=>_.metodoPago==="Mixto"?V+(_.montoYape||0):_.metodoPago==="Yape"?V+(_.monto||0):V,0),F=C.filter(V=>["egreso","retiro","reposicion"].includes(V.tipo)).reduce((V,_)=>V+(_.monto||0),0),q=w.reduce((V,_)=>V+(_.ganancia||0),0),Y=M.reduce((V,_)=>V+(_.totalCosto||0),0),L=q-F-Y;return i+=O,a+=F,c+=q,u+=L,`
      <tr>
        <td style="font-weight:600;">${f}</td>
        <td style="text-align:right;font-weight:700;color:#2d7a4d;">S/ ${O.toFixed(2)}</td>
        <td style="text-align:right;">S/ ${S.toFixed(2)}</td>
        <td style="text-align:right;">S/ ${P.toFixed(2)}</td>
        <td style="text-align:right;color:#ef4444;">S/ ${F.toFixed(2)}</td>
        <td style="text-align:right;color:#3b82f6;">S/ ${q.toFixed(2)}</td>
        <td style="text-align:right;font-weight:700;color:${L>=0?"#2d7a4d":"#ef4444"};">S/ ${L.toFixed(2)}</td>
        <td style="text-align:center;">${w.length}</td>
        <td style="text-align:center;">
          <button class="btn-small btn-blue" data-action="descargar-mensual" data-mes="${g}" data-anio="${r}" style="font-size:11px;">📥 PDF</button>
        </td>
      </tr>
    `}).filter(Boolean);d.length===0?s.innerHTML=`<tr><td colspan="9" style="text-align:center;padding:30px;color:#999;">Sin datos para ${r}</td></tr>`:s.innerHTML=d.join("")+`
      <tr style="background:#f0fdf4;font-weight:800;border-top:2px solid #10b981;">
        <td>📊 TOTAL ${r}</td>
        <td style="text-align:right;color:#2d7a4d;">S/ ${i.toFixed(2)}</td>
        <td style="text-align:right;">-</td>
        <td style="text-align:right;">-</td>
        <td style="text-align:right;color:#ef4444;">S/ ${a.toFixed(2)}</td>
        <td style="text-align:right;color:#3b82f6;">S/ ${c.toFixed(2)}</td>
        <td style="text-align:right;color:${u>=0?"#2d7a4d":"#ef4444"};">S/ ${u.toFixed(2)}</td>
        <td colspan="2"></td>
      </tr>
    `,Mw(r),Lw(r,i,a,c,u)}function Lw(n,e,t,r,s){const i=document.getElementById("resumenAnualContainer");if(!i)return;const a=[{label:"🛒 Ventas Totales",value:`S/ ${e.toFixed(2)}`,color:"#2d7a4d"},{label:"📉 Gastos Totales",value:`S/ ${t.toFixed(2)}`,color:"#ef4444"},{label:"📈 Margen Bruto",value:`S/ ${r.toFixed(2)}`,color:"#3b82f6"},{label:"💰 Utilidad Neta",value:`S/ ${s.toFixed(2)}`,color:s>=0?"#2d7a4d":"#ef4444"}];i.innerHTML=a.map(c=>`
    <div style="background:white;border-radius:12px;padding:18px;text-align:center;box-shadow:0 2px 8px rgba(0,0,0,.08);border-top:4px solid ${c.color};">
      <small style="color:#666;font-weight:600;display:block;margin-bottom:8px;">${c.label}</small>
      <div style="font-size:22px;font-weight:800;color:${c.color};">${c.value}</div>
    </div>
  `).join("")}function Mw(n,e){const t=document.getElementById("graficaMensualContainer");if(!t)return;const r=Oh.map((i,a)=>{const c=m.ventas.filter(u=>{const d=En(u.fecha||u.id);return d.anio===n&&d.mes===a});return{nombre:i.substring(0,3),total:c.reduce((u,d)=>u+(d.monto||0),0)}}),s=Math.max(...r.map(i=>i.total),1);t.innerHTML=`
    <div style="display:flex;gap:8px;align-items:flex-end;height:140px;padding:10px 0;">
      ${r.map(i=>{const a=i.total/s*100;return`
          <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:4px;height:100%;">
            <span style="font-size:10px;color:#666;font-weight:600;margin-bottom:2px;">${i.total>0?"S/"+Math.round(i.total):""}</span>
            <div style="width:80%;max-width:40px;background:linear-gradient(180deg,#10b981,#059669);border-radius:6px 6px 0 0;height:${a}%;min-height:${i.total>0?4:0}px;transition:height .5s ease;"></div>
            <span style="font-size:10px;color:#666;font-weight:600;margin-top:4px;">${i.nombre}</span>
          </div>
        `}).join("")}
    </div>
  `}function Fh(){var S;if(!m.usuarioActual||!((((S=m.usuarioActual)==null?void 0:S.rol)||"").toLowerCase()==="admin"))return;const e=de.calcularBalances(),t=(e.balLocal||0)+(e.balChica||0),r=m.ventas.reduce((P,F)=>P+(F.ganancia||0),0),s=m.productos.reduce((P,F)=>P+(F.precioCosto||0)*F.stock,0),i=m.productos.reduce((P,F)=>{const q=(F.precio||0)-(F.precioCosto||0);return P+(q>0?q*F.stock:0)},0),a=m.movimientos.filter(P=>["egreso","retiro","reposicion"].includes(P.tipo)).reduce((P,F)=>P+F.monto,0),c=m.movimientos.filter(P=>P.tipo==="ingreso").reduce((P,F)=>P+F.monto,0),u=m.consumosDueno.reduce((P,F)=>P+(F.totalCosto||0),0),d=r+c-a-u,f=m.ventas.reduce((P,F)=>P+(F.monto||0),0),g=f>0?r/f*100:0,w=(P,F)=>{const q=document.getElementById(P);q&&(q.textContent=F)};w("dashDineroCaja",`S/ ${t.toFixed(2)}`),w("dashGananciaBruta",`S/ ${r.toFixed(2)}`),w("dashGananciaPotencial",`S/ ${i.toFixed(2)}`),w("dashUtilidadNeta",`S/ ${d.toFixed(2)}`),w("dashInversionStock",`S/ ${s.toFixed(2)}`),w("dashMargenPromedio",`${g.toFixed(1)}%`);const C=document.getElementById("dashAlertasContainer");if(C){const P=m.productos.filter(F=>F.stock<=F.stockMin&&F.stockMin>0);P.length>0?C.innerHTML=`
        <div style="background:#fef3c7;border:2px solid #f59e0b;border-radius:12px;padding:16px;margin-bottom:15px;">
          <strong style="color:#92400e;">⚠️ ${P.length} producto(s) con stock bajo:</strong>
          <div style="margin-top:8px;display:flex;flex-wrap:wrap;gap:8px;">
            ${P.map(F=>`<span style="background:#fff3cd;border:1px solid #fcd34d;padding:3px 10px;border-radius:8px;font-size:13px;color:#92400e;">${F.nombre} (${F.stock})</span>`).join("")}
          </div>
        </div>
      `:C.innerHTML=""}const M=document.getElementById("dashCategoriasContainer");if(M){const P={};m.productos.forEach(Y=>{P[Y.categoria]||(P[Y.categoria]={ganancia:0,stock:0,nombre:Y.categoria}),(Y.precio||0)-(Y.precioCosto||0),P[Y.categoria].ganancia+=Y.gananciaAcumulada||0,P[Y.categoria].stock+=Y.stock});const F=Object.values(P).sort((Y,L)=>L.ganancia-Y.ganancia),q=Math.max(...F.map(Y=>Y.ganancia),1);M.innerHTML=F.map(Y=>{const L=Y.ganancia/q*100;return`
        <div style="margin-bottom:12px;">
          <div style="display:flex;justify-content:space-between;margin-bottom:4px;font-size:13px;">
            <span style="font-weight:600;">${Y.nombre||"Sin cat."}</span>
            <span style="color:#2d7a4d;font-weight:700;">S/ ${Y.ganancia.toFixed(2)}</span>
          </div>
          <div style="background:#e5e7eb;height:10px;border-radius:5px;overflow:hidden;">
            <div style="background:linear-gradient(90deg,#10b981,#059669);height:100%;width:${L}%;border-radius:5px;transition:width .5s;"></div>
          </div>
        </div>
      `}).join("")||"<p style='color:#999;'>Sin datos</p>"}const O=document.getElementById("dashTopProductos");if(O){const P=[...m.productos].sort((F,q)=>(q.gananciaAcumulada||0)-(F.gananciaAcumulada||0)).slice(0,5);O.innerHTML=P.map((F,q)=>`
      <div style="display:flex;justify-content:space-between;align-items:center;padding:10px;background:${q%2===0?"#f8f9fa":"white"};border-radius:8px;margin-bottom:6px;">
        <span style="font-weight:600;font-size:14px;">${["🥇","🥈","🥉","4️⃣","5️⃣"][q]} ${F.nombre}</span>
        <span style="color:#2d7a4d;font-weight:700;">S/ ${(F.gananciaAcumulada||0).toFixed(2)}</span>
      </div>
    `).join("")||"<p style='color:#999;'>Sin ventas aún</p>"}}function Nw(){var n,e;document.addEventListener("click",async t=>{const r=t.target.closest("[data-action]");switch(r==null?void 0:r.dataset.action){case"cerrar-dia":await Qe.cerrarDia()&&(hr(),document.dispatchEvent(new CustomEvent("caja:changed")));break;case"descargar-cierre":{const i=parseInt(r.dataset.id),a=m.cierres.find(c=>c.id===i);a&&Qe.descargarReporteCierre(a);break}case"eliminar-cierre":{const i=parseInt(r.dataset.id);await Qe.eliminarCierre(i)&&hr();break}case"descargar-mensual":{const i=parseInt(r.dataset.mes),a=parseInt(r.dataset.anio);Qe.descargarReporteMensualPDF(a,i);break}case"actualizar-mensual":Cs();break;case"cargar-mas-cierres":m.limiteCierres=(m.limiteCierres||10)+10,Nh();break}}),(n=document.getElementById("btnActualizarMensual"))==null||n.addEventListener("click",()=>Cs()),(e=document.getElementById("filtroAnioMensual"))==null||e.addEventListener("change",()=>Cs()),document.addEventListener("ventas:changed",()=>hr()),document.addEventListener("dashboard:changed",()=>{Fh(),hr()})}function wa(){const n=document.getElementById("tabErrores");if(!n)return;let e=n.querySelector("#erroresContainer");if(e||(e=document.createElement("div"),e.id="erroresContainer",e.style.padding="20px",e.style.minHeight="300px",n.appendChild(e)),m.erroresReportados.length===0){e.innerHTML=`
      <div style="text-align:center;padding:50px;background:#f0f0f0;border-radius:10px;border:3px solid #28a745;min-height:300px;">
        <p style="font-size:64px;margin:0;">✅</p>
        <p style="margin-top:20px;font-size:18px;font-weight:600;color:#333;">No hay errores reportados</p>
        <p style="margin-top:10px;font-size:14px;color:#666;">El sistema está funcionando correctamente</p>
      </div>
    `;return}const t=[...m.erroresReportados].reverse();e.innerHTML=t.map(r=>`
    <div class="error-card ${r.estado==="resuelto"?"error-resuelto":""}" 
      style="background:white;border:3px solid #dc3545;border-radius:8px;margin-bottom:12px;padding:15px;box-shadow:0 4px 8px rgba(0,0,0,.2);">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
        <span style="padding:5px 12px;border-radius:15px;font-size:12px;font-weight:600;${r.estado==="pendiente"?"background:#ffc107;color:#000;":"background:#28a745;color:white;}"}">
          ${r.estado==="pendiente"?"⏳ Pendiente":"✅ Resuelto"}
        </span>
        <span style="font-size:13px;color:#666;font-weight:bold;">${r.fecha}</span>
      </div>
      <div style="margin:12px 0;background:#f8f9fa;padding:10px;border-radius:5px;">
        <p style="margin:8px 0;"><strong style="color:#dc3545;">📝 Descripción:</strong> ${r.descripcion}</p>
        <p style="margin:8px 0;color:#666;"><strong>👤 Reportado por:</strong> ${r.usuario}</p>
      </div>
      <div style="display:flex;gap:8px;margin-top:12px;">
        <button class="btn-small btn-blue" data-action="toggle-error" data-id="${r.id}" style="flex:1;padding:8px 12px;font-size:13px;font-weight:bold;">
          ${r.estado==="pendiente"?"✓ Marcar Resuelto":"↻ Reabrir"}
        </button>
        <button class="btn-small btn-red" data-action="eliminar-error" data-id="${r.id}" style="padding:8px 12px;font-size:13px;font-weight:bold;">
          🗑️ Eliminar
        </button>
      </div>
    </div>
  `).join("")}async function Ow(){var t,r;const n=(t=document.getElementById("errorMensaje"))==null?void 0:t.value.trim();if(!n){x.error("Por favor describe el error");return}const e={id:Date.now(),descripcion:n,fecha:new Date().toLocaleString("es-PE"),usuario:m.usuarioActual.nombre,estado:"pendiente"};m.erroresReportados.push(e),await ae(G.ERRORES,Q.TODOS,{lista:m.erroresReportados}),x.success("✅ Error reportado correctamente. Gracias."),(r=document.getElementById("modalError"))==null||r.classList.remove("show")}async function Fw(n){const e=m.erroresReportados.find(t=>t.id===n);e&&(e.estado=e.estado==="pendiente"?"resuelto":"pendiente",await ae(G.ERRORES,Q.TODOS,{lista:m.erroresReportados}),wa())}async function $w(n){await fe.show("🗑️ Eliminar Error","¿Estás seguro de eliminar este reporte?",{confirmText:"Eliminar",cancelText:"Cancelar",isDestructive:!0})&&(m.erroresReportados=m.erroresReportados.filter(t=>t.id!==n),await ae(G.ERRORES,Q.TODOS,{lista:m.erroresReportados},!0),wa())}function Uw(){document.addEventListener("click",async n=>{var s,i;const e=n.target.closest("[data-action]"),t=e==null?void 0:e.dataset.action,r=parseInt(e==null?void 0:e.dataset.id);switch(t){case"show-modal-error":document.getElementById("errorMensaje")&&(document.getElementById("errorMensaje").value=""),(s=document.getElementById("modalError"))==null||s.classList.add("show");break;case"close-modal-error":(i=document.getElementById("modalError"))==null||i.classList.remove("show");break;case"reportar-error":await Ow();break;case"toggle-error":await Fw(r);break;case"eliminar-error":await $w(r);break}})}function Ta(){var i;const n=document.getElementById("consumoDuenoContainer");if(!n)return;const e=m.ultimoCierre?m.consumosDueno.filter(a=>a.id>m.ultimoCierre):m.consumosDueno,t=(((i=m.usuarioActual)==null?void 0:i.rol)||"").toLowerCase()==="admin";if(e.length===0){n.innerHTML=`
      <div style="text-align:center;padding:50px;color:#666;background:white;border-radius:10px;box-shadow:0 2px 10px rgba(0,0,0,.1);min-height:300px;">
        <p style="font-size:64px;margin:0;">🍽️</p>
        <p style="margin-top:20px;font-size:18px;font-weight:600;color:#333;">No hay consumos registrados</p>
        <p style="margin-top:10px;font-size:14px;color:#666;">${m.ultimoCierre?"desde el último cierre":"en el sistema"}</p>
        <button class="btn btn-primary" data-action="show-modal-consumo-dueno" style="margin-top:30px;padding:15px 40px;font-size:16px;">
          ➕ Registrar Primer Consumo
        </button>
      </div>
    `;return}const r=e.reduce((a,c)=>a+(c.total||c.totalVenta||0),0),s=e.slice().reverse().map(a=>`
    <div style="background:white;border:1px solid #e0e0e0;border-radius:8px;padding:15px;margin-bottom:10px;box-shadow:0 2px 5px rgba(0,0,0,.05);">
      <div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:10px;">
        <div style="font-weight:600;font-size:15px;color:#333;">🍽️ ${a.fecha}</div>
        <div style="font-size:20px;font-weight:bold;color:#ff9800;">S/ ${(a.total||a.totalVenta||0).toFixed(2)}</div>
      </div>
      <div style="background:#fff3cd;padding:10px;border-radius:4px;margin-top:10px;">
        ${a.productos.map(c=>`
          <div style="display:flex;justify-content:space-between;padding:3px 0;font-size:13px;color:#856404;">
            <span>• ${c.nombre} x${c.cantidad} (S/ ${(c.precio||0).toFixed(2)} c/u)</span>
            <strong>S/ ${((c.precio||0)*c.cantidad).toFixed(2)}</strong>
          </div>
        `).join("")}
      </div>
      ${t?`<div style="margin-top:10px;display:flex;justify-content:flex-end;">
            <button class="btn btn-red btn-small" data-action="eliminar-consumo-dueno" data-id="${a.id}">🗑️ Eliminar</button>
           </div>`:""}
    </div>
  `).join("");n.innerHTML=`
    <div style="background:#fff3cd;padding:15px;border-radius:8px;margin-bottom:20px;border-left:4px solid #ff9800;">
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <div>
          <strong style="font-size:16px;color:#856404;">💰 Total Consumido</strong>
          <div style="font-size:13px;color:#856404;margin-top:5px;">
            ${e.length} ${e.length===1?"registro":"registros"}
            ${m.ultimoCierre?"desde el último cierre":""}
          </div>
        </div>
        <div style="font-size:28px;font-weight:bold;color:#ff9800;">S/ ${r.toFixed(2)}</div>
      </div>
      ${t?'<button class="btn btn-blue" data-action="descargar-consumo-pdf" style="width:100%;margin-top:15px;">📄 Descargar Reporte PDF</button>':""}
    </div>
    ${s}
  `}let Me=[];function Co(){const n=document.getElementById("carritoConsumoDueno"),e=document.getElementById("totalConsumoDueno");if(!n)return;const t=Me.reduce((r,s)=>r+s.precio*s.cantidad,0);if(e&&(e.textContent=`S/ ${t.toFixed(2)}`),Me.length===0){n.innerHTML='<p style="color:#999;text-align:center;padding:20px;">No hay productos seleccionados</p>';return}n.innerHTML=Me.map(r=>`
    <div style="display:flex;justify-content:space-between;align-items:center;padding:10px;border-bottom:1px solid #eee;">
      <div>
        <strong>${r.nombre}</strong><br>
        <small style="color:#666;">S/ ${r.precio.toFixed(2)} x ${r.cantidad}</small>
      </div>
      <div style="display:flex;align-items:center;gap:8px;">
        <strong style="color:#ff9800;">S/ ${(r.precio*r.cantidad).toFixed(2)}</strong>
        <button class="btn-small btn-red" data-action="quitar-carrito-dueno" data-id="${r.id}" style="padding:3px 7px;">✕</button>
      </div>
    </div>
  `).join("")}function Bw(){const n=document.getElementById("productosConsumoDuenoGrid");if(!n)return;const e={Licores:1,Gaseosas:2,Golosinas:3,Otros:4},t=[...m.productos].sort((r,s)=>{const i=e[r.categoria]||99,a=e[s.categoria]||99;return i!==a?i-a:r.nombre.localeCompare(s.nombre)});n.innerHTML=t.filter(r=>r.stock>0).map(r=>`
    <div style="background:#f9f9f9;padding:12px;border-radius:8px;border:1px solid #e0e0e0;text-align:center;">
      <div style="font-weight:600;font-size:14px;margin-bottom:5px;">${r.nombre}</div>
      <div style="font-size:12px;color:#666;margin-bottom:8px;">Stock: ${r.stock}</div>
      <button class="btn btn-orange btn-small" data-action="agregar-carrito-dueno" data-id="${r.id}"
        style="width:100%;background:#ff9800;color:white;border:none;padding:6px 10px;border-radius:5px;cursor:pointer;font-size:12px;">
        ➕ Agregar
      </button>
    </div>
  `).join(""),t.filter(r=>r.stock>0).length===0&&(n.innerHTML='<p style="color:#999;text-align:center;padding:20px;grid-column:1/-1;">No hay productos con stock disponible</p>')}function jw(){var n;Me=[],Bw(),Co(),(n=document.getElementById("modalConsumoDueno"))==null||n.classList.add("show")}async function zw(){var e;if(Me.length===0){x.error("⚠️ Selecciona al menos un producto");return}const n=document.getElementById("btnGuardarConsumoDueno");try{n&&(n.disabled=!0,n.textContent="Guardando...");const t=Me.reduce((i,a)=>i+a.precio*a.cantidad,0);let r=0;const s={id:Date.now(),fecha:new Date().toLocaleString("es-PE"),tipo:"Consumo Dueño",productos:Me.map(i=>{const a=m.productos.find(u=>u.id===i.id),c=a&&a.precioCosto||0;return r+=c*i.cantidad,{nombre:i.nombre,precio:i.precio,precioCosto:c,cantidad:i.cantidad}}),totalVenta:t,total:t,totalCosto:r};for(const i of Me){const a=m.productos.find(c=>c.id===i.id);a&&(a.stock-=i.cantidad,await ye.procesarConsumoProducto(i.id,i.cantidad,!0))}m.consumosDueno.push(s),await ae(G.CONSUMOS,Q.DUENO,{lista:m.consumosDueno}),x.success(`✅ Consumo registrado. Valor: S/ ${t.toFixed(2)} | Costo: S/ ${r.toFixed(2)}`),Me=[],(e=document.getElementById("modalConsumoDueno"))==null||e.classList.remove("show"),Ta(),document.dispatchEvent(new CustomEvent("inventario:changed")),document.dispatchEvent(new CustomEvent("dashboard:changed"))}catch{x.error("No se pudo guardar el consumo. Intenta de nuevo.")}finally{n&&(n.disabled=!1,n.textContent="Guardar Consumo")}}async function qw(n){if(!await fe.show("🗑️ Eliminar Consumo","¿Estás seguro de eliminar este registro?",{confirmText:"Eliminar",cancelText:"Cancelar",isDestructive:!0}))return;const t=m.consumosDueno.find(r=>r.id===n);t&&(t.productos.forEach(r=>{const s=m.productos.find(i=>i.nombre===r.nombre);s&&(s.stock+=r.cantidad)}),m.consumosDueno=m.consumosDueno.filter(r=>r.id!==n),await ae(G.CONSUMOS,Q.DUENO,{lista:m.consumosDueno},!0),await ye.save(!0),Ta(),document.dispatchEvent(new CustomEvent("inventario:changed")),x.success("✅ Registro eliminado y stock devuelto"))}function Hw(){const n=m.ultimoCierre?m.consumosDueno.filter(r=>r.id>m.ultimoCierre):m.consumosDueno;if(n.length===0){x.warning("⚠️ No hay consumos para descargar");return}const e=n.reduce((r,s)=>r+(s.total||s.totalVenta||0),0),t=window.open("","_blank","width=800,height=600");t.document.write(`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Consumo del Dueño</title>
  <style>
    * { margin:0;padding:0;box-sizing:border-box; }
    body { font-family:'Segoe UI',Arial,sans-serif;padding:30px;background:white;color:#333; }
    .header { text-align:center;border-bottom:3px solid #ff9800;padding-bottom:20px;margin-bottom:25px; }
    h1 { color:#ff9800;font-size:28px;margin-bottom:10px; }
    .total-box { background:#fff3cd;padding:20px;border-radius:8px;margin-bottom:30px;border-left:4px solid #ff9800; }
    .consumo-item { background:#f9f9f9;padding:15px;border-radius:6px;margin-bottom:12px;border-left:4px solid #ff9800;page-break-inside:avoid; }
    .btn-imprimir { background:#ff9800;color:white;border:none;padding:12px 30px;border-radius:5px;cursor:pointer;font-size:14px;margin:15px 0; }
    @media print { .no-print { display:none; } @page { margin:1cm; } }
  </style>
</head>
<body>
  <div class="no-print"><button class="btn-imprimir" onclick="window.print()">🖨️ Imprimir / Guardar como PDF</button></div>
  <div class="header">
    <h1>🍽️ CONSUMO DEL DUEÑO</h1>
    <p style="color:#666;margin-top:5px;">Generado: ${new Date().toLocaleString("es-PE")}</p>
    <p style="color:#856404;margin-top:10px;font-size:14px;">⚠️ Estos consumos NO fueron cobrados pero se descontaron del stock</p>
  </div>
  <div class="total-box">
    <div style="display:flex;justify-content:space-between;align-items:center;">
      <div>
        <strong style="font-size:16px;color:#856404;">Total Consumido</strong>
        <div style="font-size:13px;color:#856404;margin-top:5px;">${n.length} registros</div>
      </div>
      <div style="font-size:32px;font-weight:bold;color:#ff9800;">S/ ${e.toFixed(2)}</div>
    </div>
  </div>
  ${n.slice().reverse().map(r=>`
    <div class="consumo-item">
      <div style="display:flex;justify-content:space-between;margin-bottom:10px;padding-bottom:10px;border-bottom:1px solid #e0e0e0;">
        <div style="font-weight:bold;">${r.fecha}</div>
        <div style="font-size:20px;font-weight:bold;color:#ff9800;">S/ ${(r.total||r.totalVenta||0).toFixed(2)}</div>
      </div>
      <div style="background:#fff3cd;padding:10px;border-radius:4px;">
        ${r.productos.map(s=>`
          <div style="display:flex;justify-content:space-between;padding:3px 0;font-size:13px;color:#856404;">
            <span>• ${s.nombre} x${s.cantidad} (S/ ${(s.precio||0).toFixed(2)} c/u)</span>
            <strong>S/ ${((s.precio||0)*s.cantidad).toFixed(2)}</strong>
          </div>
        `).join("")}
      </div>
    </div>
  `).join("")}
  <div style="margin-top:30px;text-align:center;color:#999;font-size:11px;border-top:1px solid #e0e0e0;padding-top:15px;">
    <p>Sistema de Gestión de Billar • Reporte generado automáticamente</p>
  </div>
</body>
</html>`),t.document.close(),setTimeout(()=>t.focus(),250)}function Gw(){document.addEventListener("click",async n=>{var s;const e=n.target.closest("[data-action]"),t=e==null?void 0:e.dataset.action,r=parseInt(e==null?void 0:e.dataset.id);switch(t){case"show-modal-consumo-dueno":jw();break;case"close-modal-consumo-dueno":(s=document.getElementById("modalConsumoDueno"))==null||s.classList.remove("show");break;case"guardar-consumo-dueno":await zw();break;case"agregar-carrito-dueno":{const i=m.productos.find(c=>c.id===r);if(!i||i.stock<=0){x.error("Sin stock disponible");break}const a=Me.find(c=>c.id===r);if(a)if(a.cantidad<i.stock)a.cantidad++;else{x.warning("No hay más stock disponible");break}else Me.push({id:i.id,nombre:i.nombre,precio:i.precio,cantidad:1});Co();break}case"quitar-carrito-dueno":{const i=Me.findIndex(a=>a.id===r);i!==-1&&(Me[i].cantidad--,Me[i].cantidad<=0&&Me.splice(i,1)),Co();break}case"eliminar-consumo-dueno":await qw(r);break;case"descargar-consumo-pdf":Hw();break}})}let Re=null;function ba(){const n=document.getElementById("usuariosTable");if(n){if(m.usuarios.length===0){n.innerHTML='<tr><td colspan="4" style="text-align:center;padding:30px;color:#999;">No hay usuarios registrados</td></tr>';return}n.innerHTML=m.usuarios.map(e=>{var t;return`
    <tr>
      <td>${e.username}</td>
      <td>${e.nombre}</td>
      <td style="text-align:center;">
        <span class="badge ${e.rol==="admin"?"badge-success":"badge-info"}">${e.rol.toUpperCase()}</span>
      </td>
      <td style="text-align:center;">
        <button class="btn-small btn-green" data-action="editar-usuario" data-id="${e.id}" style="margin-right:5px;">✏️</button>
        ${((t=m.usuarioActual)==null?void 0:t.id)!==e.id?`<button class="btn-small btn-red" data-action="eliminar-usuario" data-id="${e.id}">🗑️</button>`:""}
      </td>
    </tr>
  `}).join(""),m.usuarios.length}}function Ww(){const n=document.getElementById("usuariosPanel");n&&(n.classList.contains("hidden")?(n.classList.remove("hidden"),ba()):n.classList.add("hidden"))}function Zl(n=null){var r,s;if((((r=m.usuarioActual)==null?void 0:r.rol)||"").toLowerCase()!=="admin")return;Re=n!==null&&m.usuarios.find(i=>i.id===n)||null;const e=document.getElementById("modalUsuario"),t=document.getElementById("usuarioModalTitle");Re?(t.textContent="Editar Usuario",document.getElementById("nuevoNombre").value=Re.nombre,document.getElementById("nuevoUsername").value=Re.username,document.getElementById("nuevoPassword").value="",document.getElementById("nuevoRol").value=Re.rol):(t.textContent="Agregar Usuario",["nuevoNombre","nuevoUsername","nuevoPassword"].forEach(i=>{const a=document.getElementById(i);a&&(a.value="")}),document.getElementById("nuevoRol").value="empleado"),(s=document.getElementById("usuarioError"))==null||s.classList.add("hidden"),e==null||e.classList.add("show")}async function Kw(){var c,u,d,f,g;const n=(c=document.getElementById("nuevoNombre"))==null?void 0:c.value.trim(),e=(u=document.getElementById("nuevoUsername"))==null?void 0:u.value.trim(),t=(d=document.getElementById("nuevoPassword"))==null?void 0:d.value,r=(f=document.getElementById("nuevoRol"))==null?void 0:f.value,s=document.getElementById("usuarioError"),i=`${e}@billar.app`;if(s==null||s.classList.add("hidden"),!n||!e||!Re&&!t){s&&(s.textContent="Por favor completa todos los campos"),s==null||s.classList.remove("hidden");return}if(m.usuarios.find(w=>w.username===e&&w.id!==((Re==null?void 0:Re.id)??null))){s&&(s.textContent="El nombre de usuario ya existe"),s==null||s.classList.remove("hidden");return}try{if(Re){if(Re.nombre=n,Re.username=e,Re.rol=r,t){const w=Je.getCurrentUser();w&&w.uid===Re.uid?(await Je.updatePassword(w,t),x.success("✅ Contraseña actualizada correctamente")):(s&&(s.textContent="⚠️ Solo puedes cambiar tu propia contraseña desde aquí."),s==null||s.classList.remove("hidden"))}}else{const{user:w}=await Je.createUser(i,t);m.usuarios.push({id:Date.now(),nombre:n,username:e,rol:r,uid:w.uid}),x.success("✅ Usuario creado correctamente")}await ae(G.USUARIOS,Q.TODOS,{lista:m.usuarios},!0),ba(),(g=document.getElementById("modalUsuario"))==null||g.classList.remove("show"),Re=null}catch(w){console.error("Error guardando usuario:",w),s&&(s.textContent="Error al crear usuario: "+w.message),s==null||s.classList.remove("hidden")}}async function Yw(n){var t,r;if((((t=m.usuarioActual)==null?void 0:t.rol)||"").toLowerCase()!=="admin")return;if(((r=m.usuarioActual)==null?void 0:r.id)===n){x.error("No puedes eliminar tu propia cuenta");return}await fe.show("🗑️ Eliminar Usuario","¿Estás seguro de eliminar este usuario?",{confirmText:"Eliminar",cancelText:"Cancelar",isDestructive:!0})&&(m.usuarios=m.usuarios.filter(s=>s.id!==n),await ae(G.USUARIOS,Q.TODOS,{lista:m.usuarios},!0),ba(),x.success("✅ Usuario eliminado"))}function Qw(){document.addEventListener("click",async n=>{var s;const e=n.target.closest("[data-action]"),t=e==null?void 0:e.dataset.action,r=parseInt(e==null?void 0:e.dataset.id);switch(t){case"toggle-usuarios":Ww();break;case"show-modal-usuario":Zl(null);break;case"editar-usuario":Zl(r);break;case"eliminar-usuario":await Yw(r);break;case"guardar-usuario":await Kw();break;case"close-modal-usuario":(s=document.getElementById("modalUsuario"))==null||s.classList.remove("show"),Re=null;break}})}const Jw={mesas:()=>{Qt(),Jt()},ventas:()=>{qr(),Hr()},inventario:()=>{Ln(),Ea()},reportes:()=>hr(),dashboard:()=>Fh(),caja:()=>Xe(),mensual:()=>Cs(),errores:()=>wa(),consumoDueno:()=>Ta()},Xw=new Set(["caja","inventario","ventas","reportes","dashboard","mensual","errores","consumoDueno"]);function Zw(n){if(n.querySelector("#lazy-loading-overlay"))return;const e=document.createElement("div");e.id="lazy-loading-overlay",e.style.cssText=["position:absolute","inset:0","z-index:10","display:flex","flex-direction:column","align-items:center","justify-content:center","gap:14px","background:rgba(255,255,255,0.85)","border-radius:8px","color:#6b7280","pointer-events:none"].join(";"),e.innerHTML=`
    <div style="width:38px;height:38px;border:4px solid #e5e7eb;border-top-color:#3b82f6;border-radius:50%;animation:spin 0.8s linear infinite;"></div>
    <span style="font-size:14px;font-weight:500;">Cargando datos...</span>
  `;const t=n.style.position;n.style.position="relative",n._prevPosition=t,n.appendChild(e)}function eu(n){const e=n==null?void 0:n.querySelector("#lazy-loading-overlay");e&&e.remove(),n&&n._prevPosition!==void 0&&(n.style.position=n._prevPosition||"",delete n._prevPosition)}async function tu(n){if(m.tabActual===n)return;m.tabActual=n,document.querySelectorAll(".tab").forEach(s=>{const i=s.dataset.tab===n;s.classList.toggle("active",i)});let e=null;document.querySelectorAll(".tab-content").forEach(s=>{const i=s.id.replace("tab","").toLowerCase(),a=n.toLowerCase(),c=i===a||s.id===`tab${eT(n)}`;s.classList.toggle("active",c),c&&(e=s)});const t=Jw[n];if(!t)return;if(Xw.has(n)&&!m.modulosCargados[n]){e&&Zw(e);try{await KE(n)}catch(s){console.error(`Error cargando datos del módulo ${n}:`,s),eu(e);return}eu(e)}try{t()}catch(s){console.error(`Error rendering tab ${n}:`,s)}}function eT(n){return n.charAt(0).toUpperCase()+n.slice(1)}function tT(){document.addEventListener("click",e=>{const t=e.target.closest("[data-tab]");if(!t)return;const r=t.dataset.tab;r&&tu(r)});const n=m.tabActual||"mesas";tu(n),Hr()}function nT(){document.addEventListener("click",async n=>{var r,s;const e=n.target.closest("[data-action]");if((e==null?void 0:e.dataset.action)==="guardar-configuracion"){const i=parseFloat((r=document.getElementById("tarifaHora"))==null?void 0:r.value),a=parseFloat((s=document.getElementById("tarifaExtra5Min"))==null?void 0:s.value);if(isNaN(i)||isNaN(a)){x.error("Por favor ingresa valores válidos");return}m.config.tarifaHora=i,m.config.tarifaExtra5Min=a,await ae(G.CONFIGURACION,Q.GENERAL,{tarifaHora:i,tarifaExtra5Min:a},!0),x.success("✅ Configuración guardada correctamente")}if(n.target.closest(".close-btn")||n.target.closest(".btn-gray")&&n.target.closest(".btn-gray").textContent.trim().toLowerCase()==="cancelar"){const i=n.target.closest(".modal");i&&i.classList.remove("show")}})}function rT(){tT()}async function nu(){sw(),rw(),hw(),Ew(),Sw(),Vw(),Nw(),Uw(),Gw(),Qw(),nT(),await nw(rT)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",nu):nu();
