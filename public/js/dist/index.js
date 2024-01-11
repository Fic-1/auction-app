// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"2Ex4i":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "e11d6d8652f6bc9f";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws;
    try {
        ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/");
    } catch (err) {
        if (err.message) console.error(err.message);
        ws = {};
    }
    // Web extension context
    var extCtx = typeof browser === "undefined" ? typeof chrome === "undefined" ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                }
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        if (e.message) console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute("href");
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", // $FlowFixMe
    href.split("?")[0] + "?" + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            });
            // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"f2QDv":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _isomorphicWs = require("isomorphic-ws");
var _isomorphicWsDefault = parcelHelpers.interopDefault(_isomorphicWs);
var _loginJs = require("./login.js");
var _productPageJs = require("./productPage.js");
var _signupJs = require("./signup.js");
var _resetPasswordJs = require("./resetPassword.js");
var _updateSettings = require("./updateSettings");
var _paginateJs = require("./paginate.js");
var _alertsJs = require("./alerts.js");
var _stripeJs = require("./stripe.js");
const currentUrl = window.location.href;
const url = new URL(currentUrl);
const loginForm = document.querySelector(".form--login");
const logOutBtn = document.querySelector(".logoutbtn");
const signupForm = document.querySelector(".form--signup");
const userDataForm = document.querySelector(".user-data");
const productTabs = document.querySelector(".nav-tabs");
const coverImageForm = document.querySelector(".product-cover-form");
const wsForm = document.querySelector(".websocket-form");
const productPhotosForm = document.querySelector(".product-photos-form");
const userPasswordForm = document.querySelector(".change-password");
const productDataForm = document.querySelector(".product-data-form");
const forgotPasswordForm = document.querySelector(".form--forgot-password");
const resetPasswordForm = document.querySelector(".form--reset-password");
const btnAddBid = document.getElementById("btnAddBid");
const liveBiddingElement = document.querySelector(".imessage");
const addProduct = document.querySelector(".add-product");
const addProductFormDiv = document.querySelector(".add-product-form-div");
const addProductBtn = document.querySelector(".add-product-btn");
const addProductBtnToggled = document.querySelector(".add-product-btn-toggled");
const addProductForm = document.querySelector(".add-product-form");
const paginateDiv = document.querySelectorAll(".paginateDiv");
const allProductsPage = document.querySelector(".allProducts");
const productPhotos = document.querySelector(".product-photos");
const mainImage = document.querySelector(".product-img");
const checkoutBtn = document.getElementById("checkoutBtn");
const forgotPasswordBtn = document.getElementById("forgotPasswordBtn");
const pageControl = ()=>{
    const pagesTop = document.getElementById("pagesTop");
    const pagesBottom = document.getElementById("pagesBottom");
    let currentPage = parseInt(url.searchParams.get("page")) || 1;
    const resultsNumberOfPages = Math.ceil(Number(pagesTop.dataset.pages) / 5);
    pagesTop.textContent = `${currentPage - 1 <= 0 ? "" : currentPage - 1} [${currentPage}] ${currentPage + 1 > resultsNumberOfPages ? "" : currentPage + 1}`;
    pagesBottom.textContent = pagesTop.textContent;
    paginateDiv.forEach((el)=>{
        el.addEventListener("click", (e)=>{
            if (e.target.closest(".nextPage")) (0, _paginateJs.nextPage)();
            if (e.target.closest(".previousPage")) (0, _paginateJs.previousPage)();
        });
    });
};
if (checkoutBtn) checkoutBtn.addEventListener("click", (e)=>{
    e.target.textContent = "Processing...";
    const productId = e.target.dataset.productid;
    (0, _stripeJs.checkoutProduct)(productId);
});
if (allProductsPage) pageControl();
if (addProduct) {
    addProduct.addEventListener("click", (e)=>{
        addProductBtn.classList.toggle("hidden");
        addProductBtnToggled.classList.toggle("hidden");
        addProductFormDiv.classList.toggle("hidden");
    });
    addProductForm.addEventListener("submit", (e)=>{
        const elementArray = [
            addProductForm,
            addProductBtnToggled,
            addProductFormDiv
        ];
        const formData = new FormData();
        formData.append("name", document.getElementById("create-form--name").value);
        formData.append("description", document.getElementById("create-form--description").value);
        formData.append("startingBid", document.getElementById("create-form--price").value);
        formData.append("coverImage", document.getElementById("coverImage").files[0]);
        formData.append("endDate", document.getElementById("create-form--date").value);
        (0, _updateSettings.createNewProduct)(formData, elementArray);
    });
    pageControl();
}
if (coverImageForm) {
    const productId = document.querySelector(".label-id").dataset.id;
    //*UPDATE COVER IMAGE
    coverImageForm.addEventListener("submit", (e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("coverImage", document.getElementById("coverImage").files[0]);
        (0, _updateSettings.updateCover)(formData, productId);
    });
    //* UPDATE PRODUCT DATA
    productDataForm.addEventListener("submit", (e)=>{
        e.preventDefault();
        const productName = document.getElementById("product-data--name").value;
        const productDescription = document.getElementById("product-data--description").value;
        const productEndDate = document.getElementById("product-data--endDate").value;
        const updateObject = {
            name: productName,
            description: productDescription,
            endDate: productEndDate
        };
        (0, _updateSettings.updateProductData)(updateObject, productId, "data");
    });
    productPhotosForm.addEventListener("submit", (e)=>{
        e.preventDefault();
        const formData = new FormData();
        const productPhotos = document.getElementById("photos");
        for(let i = 0; i < productPhotos.files.length; i++)formData.append("photos", productPhotos.files[i]);
        (0, _updateSettings.updateProductData)(formData, productId, "photos");
    });
}
if (loginForm) loginForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    (0, _loginJs.login)(email, password);
});
if (signupForm) signupForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const firstName = document.getElementById("fname").value;
    const lastName = document.getElementById("lname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("passwordConfirm").value;
    (0, _signupJs.signup)(firstName, lastName, email, password, passwordConfirm);
});
if (logOutBtn) logOutBtn.addEventListener("click", (0, _loginJs.logout));
if (productTabs) productTabs.addEventListener("click", (0, _productPageJs.switchTabs));
if (userDataForm) userDataForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const formData = new FormData();
    // updateSettings(form, 'data');
    formData.append("name", document.getElementById("name").value);
    formData.append("email", document.getElementById("email").value);
    formData.append("photo", document.getElementById("photo").files[0]);
    (0, _updateSettings.updateSettings)(formData, "data");
});
if (userPasswordForm) userPasswordForm.addEventListener("submit", async (e)=>{
    e.preventDefault();
    document.querySelector(".btn--save-password ").textContent = "Updating...";
    const passwordCurrent = document.getElementById("password-current").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("password-confirm").value;
    await (0, _updateSettings.updateSettings)({
        passwordCurrent,
        password,
        passwordConfirm
    }, "password");
    document.querySelector(".btn--save-password ").textContent = "Change password";
    document.getElementById("password-current").value = "";
    document.getElementById("password").value = "";
    document.getElementById("password-confirm").value = "";
});
if (productPhotos) productPhotos.addEventListener("click", (e)=>{
    if (e.target.closest(".product-photo")) mainImage.src = e.target.closest(".product-photo").src;
});
/*----- Websocket logic -----*/ let productId;
if (productTabs) productId = document.getElementById("product").dataset.id;
const updateBiddingUI = (state, newBid, messageData, updateElement)=>{
    let markup;
    productId = document.getElementById("product").dataset.id;
    if (messageData.type === "initialBids") {
        markup = state.map((bid)=>{
            let formatedAmount = numeral(bid.amount).format("0,0.00");
            return `<p class=${bid.bidder === userEmail ? "from-me" : "from-them"}>${bid.bidder} <br><span>Added bid: </span><strong>${formatedAmount} \u{20AC}</strong></p>`;
        }).join(" ");
        updateElement.innerHTML = markup;
    }
    if (messageData.type === "newBid") {
        const formatedAmount = numeral(newBid.amount).format("0,0.00");
        markup = `<p class=${newBid.bidder === userEmail ? "from-me" : "from-them"}>${newBid.bidder} <br><span>Added bid: </span><strong>${formatedAmount} \u{20AC}</strong></p>`;
        if (productId === newBid._id) updateElement.innerHTML += markup;
    }
    if (messageData.type === "over") {
        markup = `<p class=over> Auction has ended </p>`;
        updateElement.innerHTML += markup;
    }
};
if (productTabs) {
    userEmail = document.cookie.split(";").filter((el)=>el.includes("user"))[0].trim().split("=")[1].replace("%40", "@");
    const uri = `ws://${window.location.host.split(":")[0]}:8080`;
    const ws = new (0, _isomorphicWsDefault.default)(uri);
    const wsBidding = (formValue)=>{
        const id = document.getElementById("product").dataset.id;
        if (!+formValue) {
            (0, _alertsJs.showAlert)("error", "Please enter the valid number");
            return;
        }
        const messageData = {
            _id: id,
            amount: formValue,
            bidder: userEmail
        };
        const message = JSON.stringify(messageData);
        if (userEmail === messageData.bidder) ws.send(message);
    };
    ws.onopen = function open() {
        console.log("connected");
    };
    ws.onclose = function close() {
        ws.close();
        console.log("disconnected");
    };
    ws.onmessage = (event)=>{
        const message = JSON.parse(event.data);
        const biddingState = message._activeBids;
        const newBid = message.bid;
        updateBiddingUI(biddingState, newBid, message, liveBiddingElement);
    };
    if (btnAddBid) {
        wsForm.addEventListener("keydown", (e)=>{
            if (e.key === "Enter") {
                wsBidding(wsForm.value);
                wsForm.value = "";
            }
        });
        btnAddBid.addEventListener("click", (e)=>{
            e.preventDefault;
            wsBidding(wsForm.value);
            wsForm.value = "";
        });
    }
    window.addEventListener("unload", function() {
        if (ws.readyState == (0, _isomorphicWsDefault.default).OPEN) ws.close();
    });
}
if (forgotPasswordForm) forgotPasswordForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const email = document.getElementById("email").value;
    (0, _resetPasswordJs.forgotPassword)(email);
});
if (resetPasswordForm) resetPasswordForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const token = document.getElementById("resetPasswordBtn").dataset.token;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("passwordConfirm").value;
    (0, _resetPasswordJs.resetPassword)(password, passwordConfirm, token);
});

},{"isomorphic-ws":"5nVUE","./login.js":"7yHem","./productPage.js":"c9xgY","./signup.js":"fNY2o","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","./updateSettings":"l3cGY","./paginate.js":"cv9JK","./alerts.js":"6Mcnf","./stripe.js":"10tSC","./resetPassword.js":"eRWSh"}],"5nVUE":[function(require,module,exports) {
// https://github.com/maxogden/websocket-stream/blob/48dc3ddf943e5ada668c31ccd94e9186f02fafbd/ws-fallback.js
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var global = arguments[3];
var ws = null;
if (typeof WebSocket !== "undefined") ws = WebSocket;
else if (typeof MozWebSocket !== "undefined") ws = MozWebSocket;
else if (typeof global !== "undefined") ws = global.WebSocket || global.MozWebSocket;
else if (typeof window !== "undefined") ws = window.WebSocket || window.MozWebSocket;
else if (typeof self !== "undefined") ws = self.WebSocket || self.MozWebSocket;
exports.default = ws;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"7yHem":[function(require,module,exports) {
/*eslint-disable */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "login", ()=>login);
parcelHelpers.export(exports, "logout", ()=>logout);
var _alertsJs = require("./alerts.js");
const login = async (email, password)=>{
    try {
        const res = await axios({
            method: "POST",
            url: "/api/v1/users/login",
            data: {
                email,
                password
            }
        });
        if (res.data.status === "success") {
            (0, _alertsJs.showAlert)("success", "Logged in successfuly!");
            window.setTimeout(()=>{
                location.assign("/");
            }, 1500);
        }
    } catch (error) {
        (0, _alertsJs.showAlert)("danger", error.response.data.message);
    }
};
const logout = async ()=>{
    try {
        const res = await axios({
            method: "GET",
            url: "/api/v1/users/logout"
        });
        if (res.data.status === "success") location.reload(true);
    } catch (error) {
        (0, _alertsJs.showAlert)("error", "Error logging out! Try again.");
    }
};

},{"./alerts.js":"6Mcnf","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6Mcnf":[function(require,module,exports) {
/*eslint-disable */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "hideAlert", ()=>hideAlert);
parcelHelpers.export(exports, "showAlert", ()=>showAlert);
const hideAlert = ()=>{
    const el = document.querySelector(".alert");
    if (el) el.parentElement.removeChild(el);
};
const showAlert = (type, msg)=>{
    hideAlert();
    const markup = `<div class="alert alert-${type}">${msg}</div>`;
    document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
    window.setTimeout(hideAlert, 5000);
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"c9xgY":[function(require,module,exports) {
/*eslint-disable */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "switchTabs", ()=>switchTabs);
var _isomorphicWs = require("isomorphic-ws");
var _isomorphicWsDefault = parcelHelpers.interopDefault(_isomorphicWs);
const switchTabs = (e)=>{
    const allLinks = document.querySelectorAll(".nav-link");
    const allContent = document.querySelectorAll(".card-body");
    const liveBids = document.querySelector(".websocket-background");
    const tabProduct = e.target.closest("#product");
    const tabLive = e.target.closest("#liveBid");
    const tabCheckout = e.target.closest("#checkoutLink");
    const product = document.getElementById("product");
    const productContent = document.getElementById("productContent");
    const live = document.getElementById("liveBid");
    const liveContent = document.getElementById("liveBidContent");
    const checkout = document.getElementById("checkoutLink");
    const checkoutContent = document.getElementById("checkoutContent");
    if (!tabProduct && !tabLive && !tabCheckout) return;
    allContent.forEach((element)=>{
        element.classList.remove("card-flex");
        element.classList.add("none");
    });
    allLinks.forEach((el, i)=>{
        el.classList.remove("active");
    });
    e.target.closest(".nav-link").classList.add("active");
    allContent.forEach((element, i)=>{
        if (i == e.target.closest(".nav-link").dataset.tab) element.classList.add("card-flex");
    });
};

},{"isomorphic-ws":"5nVUE","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fNY2o":[function(require,module,exports) {
/*eslint-disable */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "signup", ()=>signup);
var _alertsJs = require("./alerts.js");
const signup = async (firstName, lastName, email, password, passwordConfirm)=>{
    const name = `${firstName}  ${lastName}`;
    if (password !== passwordConfirm) (0, _alertsJs.showAlert)("danger", "Passwords do not match");
    if (!email || !password || !passwordConfirm) (0, _alertsJs.showAlert)("danger", "Please enter valid information");
    try {
        const res = await axios({
            method: "POST",
            url: "/api/v1/users/signup",
            data: {
                name,
                email,
                password,
                passwordConfirm
            }
        });
        if (res.data.status === "success") {
            (0, _alertsJs.showAlert)("success", "Signed in successfuly!");
            window.setTimeout(()=>{
                location.assign("/"); //* Poslje dodati rutu /me
            }, 1500);
        }
    } catch (error) {
        (0, _alertsJs.showAlert)("danger", error.response.data.message);
    }
};

},{"./alerts.js":"6Mcnf","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"l3cGY":[function(require,module,exports) {
/* eslint-disable */ // Update data function
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "updateSettings", ()=>updateSettings);
parcelHelpers.export(exports, "updateCover", ()=>updateCover);
parcelHelpers.export(exports, "updateProductData", ()=>updateProductData);
parcelHelpers.export(exports, "createNewProduct", ()=>createNewProduct);
var _alerts = require("./alerts");
const updateSettings = async (data, type)=>{
    try {
        const url = type === "password" ? "/api/v1/users/updateMyPassword" : "/api/v1/users/updateMe";
        const res = await axios({
            method: "PATCH",
            url,
            data
        });
        if (res.data.status === "Success") {
            (0, _alerts.showAlert)("success", `${type.toUpperCase()} changed successfuly!`);
            setTimeout(()=>window.location.reload(), 3000);
        }
    } catch (err) {
        (0, _alerts.showAlert)("error", err.response.data.message);
    }
};
const updateCover = async (data, id)=>{
    try {
        const url = `/my-products/${id}/edit/uploadCover`;
        const res = await axios({
            method: "PATCH",
            url,
            data
        });
        if (res.data.status === "Success") {
            (0, _alerts.showAlert)("success", `COVER IMAGE changed successfuly!`);
            setTimeout(()=>window.location.reload(), 3000);
        }
    } catch (err) {
        (0, _alerts.showAlert)("error", err.response.data.message);
    }
};
const updateProductData = async (data, id, type)=>{
    try {
        const url = type === "photos" ? `/my-products/${id}/edit-photos` : `/my-products/${id}/edit-data`;
        const res = await axios({
            method: "PATCH",
            url,
            data
        });
        if (res.data.status === "Success") (0, _alerts.showAlert)("success", `PRODUCT DATA changed successfuly!`);
    } catch (err) {
        (0, _alerts.showAlert)("error", err.response.data.message);
    }
};
const createNewProduct = async (data, elementArray)=>{
    try {
        const res = await axios({
            method: "POST",
            url: "/api/v1/products/create-my-product",
            data
        });
        if (res.data.status === "Success") {
            (0, _alerts.showAlert)("success", `PRODUCT created successfuly!`);
            elementArray.array.forEach((el)=>{
                el.classList.toggle("hidden");
            });
        }
    } catch (err) {
        (0, _alerts.showAlert)("error", err.response.data.message);
    }
};

},{"./alerts":"6Mcnf","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"cv9JK":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "nextPage", ()=>nextPage);
parcelHelpers.export(exports, "previousPage", ()=>previousPage);
const nextPage = ()=>{
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    let currentPage = parseInt(url.searchParams.get("page")) || 1;
    currentPage++;
    url.searchParams.set("page", currentPage);
    window.location.href = url.href;
};
const previousPage = ()=>{
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    let currentPage = parseInt(url.searchParams.get("page")) || 1;
    currentPage--;
    url.searchParams.set("page", currentPage);
    window.location.href = url.href;
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"10tSC":[function(require,module,exports) {
/* eslint-disable */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "checkoutProduct", ()=>checkoutProduct);
var _alerts = require("./alerts");
const stripe = Stripe("pk_test_51OUuIUBhYQwhtBdpefIQnW6Nsn4TFQh9ezwLyra1a1ugaAY1Og40fYiQNZbwoiursdFpCg9WfmCIp7M7JZu8Sz9H00HVEnECJS");
const checkoutProduct = async (productId)=>{
    try {
        // 1) Get the session from the API endpoint
        const session = await axios(`/api/v1/checkouts/checkout-session/${productId}`);
        // 2) Create checkout form + charge credit card
        await stripe.redirectToCheckout({
            sessionId: session.data.session.id
        });
    } catch (err) {
        console.error(err);
        (0, _alerts.showAlert)("error", err);
    }
};

},{"./alerts":"6Mcnf","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"eRWSh":[function(require,module,exports) {
/*eslint-disable */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "forgotPassword", ()=>forgotPassword);
parcelHelpers.export(exports, "resetPassword", ()=>resetPassword);
var _alertsJs = require("./alerts.js");
const forgotPassword = async (email)=>{
    try {
        const res = await axios({
            method: "POST",
            url: "/api/v1/users/forgot-password",
            data: {
                email
            }
        });
        if (res.data.status === "success") {
            (0, _alertsJs.showAlert)("success", "Password reset token sent! Please check your email.");
            window.setTimeout(()=>{
                location.assign("/login");
            }, 1500);
        }
    } catch (error) {
        (0, _alertsJs.showAlert)("danger", error.response.data.message);
    }
};
const resetPassword = async (password, passwordConfirm, token)=>{
    try {
        const res = await axios({
            method: "PATCH",
            url: `/api/v1/users/reset-password/${token}`,
            data: {
                password,
                passwordConfirm
            }
        });
        if (res.data.status === "success") {
            (0, _alertsJs.showAlert)("success", "Password changed successfuly!");
            window.setTimeout(()=>{
                location.assign("/");
            }, 1500);
        }
    } catch (error) {
        (0, _alertsJs.showAlert)("danger", error.response.data.message);
    }
};

},{"./alerts.js":"6Mcnf","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["2Ex4i","f2QDv"], "f2QDv", "parcelRequire37fe")

//# sourceMappingURL=index.js.map
