var t=require("fs-extra"),n=require("path"),e=require("glob-promise");function r(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}var o=/*#__PURE__*/r(t),i=/*#__PURE__*/r(n),u=/*#__PURE__*/r(e),f="undefined"!=typeof Symbol?Symbol.iterator||(Symbol.iterator=Symbol("Symbol.iterator")):"@@iterator";function a(t,n,e){if(!t.s){if(e instanceof l){if(!e.s)return void(e.o=a.bind(null,t,n));1&n&&(n=e.s),e=e.v}if(e&&e.then)return void e.then(a.bind(null,t,n),a.bind(null,t,2));t.s=n,t.v=e;var r=t.o;r&&r(t)}}var l=/*#__PURE__*/function(){function t(){}return t.prototype.then=function(n,e){var r=new t,o=this.s;if(o){var i=1&o?n:e;if(i){try{a(r,1,i(this.v))}catch(t){a(r,2,t)}return r}return this}return this.o=function(t){try{var o=t.v;1&t.s?a(r,1,n?n(o):o):e?a(r,1,e(o)):a(r,2,o)}catch(t){a(r,2,t)}},r},t}();function d(t){return t instanceof l&&1&t.s}module.exports=function(t){try{var n=t.root,e=t.filePattern,r=void 0===e?"**/*.*":e,c=t.ignoreFilePattern,s=void 0===c?["**/bin/**","**/node_modules/**","**/obj/**"]:c,h=t.fileContentPattern,v=t.loadFileContent,b=void 0!==v&&v,m=t.parseJson,y=void 0!==m&&m,p=t.dot,w=void 0===p||p,P=t.nocase,g=void 0===P||P;if(!b&&y)throw new Error("findFileExtra: parseJson is only available when loadFileContent is true");return Promise.resolve(u.default(r,{ignore:s,cwd:n,nocase:g,dot:w})).then(function(t){var e=[],r=function(t,n,e){if("function"==typeof t[f]){var r,o,i,u=t[f]();if(function t(e){try{for(;!(r=u.next()).done;)if((e=n(r.value))&&e.then){if(!d(e))return void e.then(t,i||(i=a.bind(null,o=new l,2)));e=e.v}o?a(o,1,e):o=e}catch(t){a(o||(o=new l),2,t)}}(),u.return){var c=function(t){try{r.done||u.return()}catch(t){}return t};if(o&&o.then)return o.then(c,function(t){throw c(t)});c()}return o}if(!("length"in t))throw new TypeError("Object is not iterable");for(var s=[],h=0;h<t.length;h++)s.push(t[h]);return function(t,n,e){var r,o,i=-1;return function e(u){try{for(;++i<t.length;)if((u=n(i))&&u.then){if(!d(u))return void u.then(e,o||(o=a.bind(null,r=new l,2)));u=u.v}r?a(r,1,u):r=u}catch(t){a(r||(r=new l),2,t)}}(),r}(s,function(t){return n(s[t])})}(t,function(t){function r(){b||(u=void 0),u&&y&&".json"===c&&(s=JSON.parse(u)),e.push({fullPath:f,pathFromRoot:t,dirPathFromRoot:d,fileName:a,dirFullPath:l,ext:c,json:s,content:b?u:void 0})}var u,f=i.default.join(n,t),a=i.default.basename(f),l=i.default.dirname(f),d=i.default.dirname(t),c=i.default.extname(f),s=void 0,v=function(){if(h||b)return Promise.resolve(o.default.readFile(f,"utf8")).then(function(t){if(u=t,h)if(h instanceof RegExp&&!h.test(u));else if("string"==typeof h&&-1===u.indexOf(h))return})}();return v&&v.then?v.then(r):r()});return r&&r.then?r.then(function(){return e}):e})}catch(t){return Promise.reject(t)}};
//# sourceMappingURL=findFilesExtra.cjs.map