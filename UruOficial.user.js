// ==UserScript==
// @name         UruOficial (Blue Marble Mod)
// @namespace    https://github.com/Santiagorich
// @version      0.83.0
// @description  A userscript to automate and/or enhance the user experience on Wplace.live. Make sure to comply with the site's Terms of Service, and rules! This script is not affiliated with Wplace.live in any way, use at your own risk. This script is not affiliated with TamperMonkey. The author of this userscript is not responsible for any damages, issues, loss of data, or punishment that may occur as a result of using this script.
// @author       ValRab
// @license      MPL-2.0
// @supportURL   https://discord.gg/uruoficial
// @homepageURL  https://github.com/Santiagorich/UruWPlace
// @icon         https://github.com/Santiagorich/UruWPlace/blob/master/LogoTextBlueLogo.png?raw=true
// @updateURL    https://uruoficial.s3.us-east-2.amazonaws.com/UruOficial.user.js
// @downloadURL  https://uruoficial.s3.us-east-2.amazonaws.com/UruOficial.user.js
// @run-at       document-start
// @match        *://*.wplace.live/*
// @grant        GM_getResourceText
// @grant        GM_addStyle
// @grant        GM.setValue
// @grant        GM_getValue
// @resource     CSS-BM-File https://raw.githubusercontent.com/SwingTheVine/Wplace-BlueMarble/a3b4a288514dc48a9232b1aeeb6b377af6fdfe7c/dist/BlueMarble.user.css
// ==/UserScript==

// Wplace  --> https://wplace.live
// License --> https://www.mozilla.org/en-US/MPL/2.0/
try {
  localStorage.removeItem('lp');
} catch (e) {}

(function () {
  "use strict";
  try {
    if (localStorage.getItem("uruoficial-dark-mode") === "true") {
      const basemapJson =
        "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";
      const script = document.createElement("script");
      script.textContent = `
        (function() {
          const originalFetch = window.fetch;
          window.fetch = async function(input, init) {
            const url = input instanceof Request ? input.url : input;
            if (url === "https://maps.wplace.live/styles/liberty") {
              try {
                const darkStyleResponse = await originalFetch("${basemapJson}");
                const darkStyleData = await darkStyleResponse.json();
                return new Response(JSON.stringify(darkStyleData), {
                  status: 200,
                  statusText: "OK",
                  headers: {
                    "Content-Type": "application/json"
                  }
                });
              } catch (error) {
                return originalFetch.apply(this, arguments);
              }
            }
            return originalFetch.apply(this, arguments);
          };
          console.log("🔧 Userscript loaded - Dark Mode Map active (page context)");
        })();
      `;
      document.documentElement.appendChild(script);
      script.remove();
    }
  } catch (e) {
    
  }
})();

function preloadLeaderboard() {
  const waitForAllianceButton = () => {
    const allianceButton = document.querySelector('button[title="Alliance"]');
    if (allianceButton) {
      console.log("Precargando leaderboard...");

      allianceButton.click();

      setTimeout(() => {
        const escapeEvent = new KeyboardEvent("keydown", {
          key: "Escape",
          code: "Escape",
          keyCode: 27,
          which: 27,
          bubbles: true,
          cancelable: true,
        });
        document.dispatchEvent(escapeEvent);
      }, 100);
    } else {
      setTimeout(waitForAllianceButton, 1000);
    }
  };

  setTimeout(waitForAllianceButton, 2000);
}
function simulateLastPixelClick(userId) {
  if (!userId) {
    console.log("No se puede simular click - ID de usuario no disponible");
    return;
  }

  const findAndClickLastPixel = () => {
    const userRows = document.querySelectorAll("tbody tr");

    for (const row of userRows) {
      const userIdSpan = row.querySelector("span.font-semibold span.ml-0\\.5");
      if (userIdSpan && userIdSpan.textContent.includes(`#${userId}`)) {
        const lastPixelButton = row.querySelector(
          'button[data-tip="Last pixel"]'
        );
        if (lastPixelButton) {
          console.log(
            `Simulando click en "Last pixel" para usuario ID ${userId}`
          );
          lastPixelButton.click();
          return true;
        }
      }
    }
    return false;
  };

  if (findAndClickLastPixel()) {
    return;
  }

  const allianceButton = document.querySelector('button[title="Alliance"]');
  if (allianceButton) {
    console.log("Leaderboard no encontrado, abriendo manualmente...");

    allianceButton.click();

    setTimeout(() => {
      console.log("Presionando ESC para cerrar modal");
      const escapeEvent = new KeyboardEvent("keydown", {
        key: "Escape",
        code: "Escape",
        keyCode: 27,
        which: 27,
        bubbles: true,
        cancelable: true,
      });
      document.dispatchEvent(escapeEvent);
    }, 100);
    setTimeout(() => {
      if (!findAndClickLastPixel()) {
        console.log(
          `No se encontró botón "Last pixel" para usuario ID ${userId} después de abrir leaderboard`
        );
      } else {
        console.log("Last pixel encontrado, cerrando modal con ESC");
      }
    }, 500);
  } else {
    console.log("No se encontró el botón Alliance para abrir el leaderboard");
  }
}

function checkUruOficialAlliance() {
  const allianceSection = document.querySelector("section");
  if (!allianceSection) {
    console.log("No se encontró la sección de alianza en el DOM");
    return;
  }

  const allianceTitle = document.querySelector(
    "section h2.text-xl.font-semibold, section h2.text-3xl.font-semibold"
  );

  if (allianceTitle && allianceTitle.textContent.includes("UruOficial")) {
    console.log("✅ Conectado a la alianza UruOficial");
    console.log("🇺🇾 ¡Conectado a la alianza UruOficial!");
  } else {
    console.log("❌ No estás en la alianza UruOficial, redirigiendo...");
    console.log("🔄 Uniéndose a la alianza UruOficial...");

    setTimeout(() => {
      window.location.href =
        "https://wplace.live/join?id=0198ab5b-8ed6-7e68-ac15-1d89c8a22bf4";
    }, 1000);
  }
}

(() => {
  var t,
    e,
    n = (t) => {
      throw TypeError(t);
    },
    i = (t, e, i) =>
      e.has(t)
        ? n("Cannot add the same private member more than once")
        : e instanceof WeakSet
        ? e.add(t)
        : e.set(t, i),
    s = (t, e, i) => (
      ((t, e) => {
        e.has(t) || n("Cannot access private method");
      })(t, e),
      i
    ),
    o = class {
      constructor(e, n) {
        i(this, t),
          (this.name = e),
          (this.version = n),
          (this.t = null),
          (this.i = "bm-b"),
          (this.o = null),
          (this.l = null),
          (this.h = []);
      }
      u(t) {
        this.t = t;
      }
      m() {
        return this.h.length > 0 && (this.l = this.h.pop()), this;
      }
      p(t) {
        t?.appendChild(this.o), (this.o = null), (this.l = null), (this.h = []);
      }
      v(n = {}, i = () => {}) {
        return i(this, s(this, t, e).call(this, "div", {}, n)), this;
      }
      M(n = {}, i = () => {}) {
        return i(this, s(this, t, e).call(this, "p", {}, n)), this;
      }
      $(n = {}, i = () => {}) {
        return i(this, s(this, t, e).call(this, "small", {}, n)), this;
      }
      C(n = {}, i = () => {}) {
        return i(this, s(this, t, e).call(this, "img", {}, n)), this;
      }
      D(n, i = {}, o = () => {}) {
        return o(this, s(this, t, e).call(this, "h" + n, {}, i)), this;
      }
      T(n = {}, i = () => {}) {
        return i(this, s(this, t, e).call(this, "hr", {}, n)), this;
      }
      I(n = {}, i = () => {}) {
        return i(this, s(this, t, e).call(this, "br", {}, n)), this;
      }
      k(n = {}, i = () => {}) {
        const o = s(this, t, e).call(this, "label", {
          textContent: n.textContent ?? "",
        });
        delete n.textContent;
        const a = s(this, t, e).call(this, "input", { type: "checkbox" }, n);
        return o.insertBefore(a, o.firstChild), this.m(), i(this, o, a), this;
      }
      N(n = {}, i = () => {}) {
        return i(this, s(this, t, e).call(this, "button", {}, n)), this;
      }
      S(n = {}, i = () => {}) {
        const o = n.title ?? n.textContent ?? "Ayuda: Sin información";
        delete n.textContent, (n.title = `Ayuda: ${o}`);
        const a = {
          textContent: "?",
          className: "bm-q",
          onclick: () => {
            this.B(this.i, o);
          },
        };
        return i(this, s(this, t, e).call(this, "button", a, n)), this;
      }
      O(n = {}, i = () => {}) {
        return i(this, s(this, t, e).call(this, "input", {}, n)), this;
      }
      L(n = {}, i = () => {}) {
        const o = n.textContent ?? "";
        delete n.textContent;
        const a = s(this, t, e).call(this, "div"),
          r = s(this, t, e).call(
            this,
            "input",
            {
              type: "file",
              style:
                "display: none !important; visibility: hidden !important; position: absolute !important; left: -9999px !important; width: 0 !important; height: 0 !important; opacity: 0 !important;",
            },
            n
          );
        this.m();
        const c = s(this, t, e).call(this, "button", { textContent: o });
        return (
          this.m(),
          this.m(),
          r.setAttribute("tabindex", "-1"),
          r.setAttribute("aria-hidden", "true"),
          c.addEventListener("click", () => {
            r.click();
          }),
          r.addEventListener("change", () => {
            (c.style.maxWidth = `${c.offsetWidth}px`),
              r.files.length > 0
                ? (c.textContent = r.files[0].name)
                : (c.textContent = o);
          }),
          i(this, a, r, c),
          this
        );
      }
      H(n = {}, i = () => {}) {
        return i(this, s(this, t, e).call(this, "textarea", {}, n)), this;
      }
      B(t, e, n = !1) {
        const i = document.getElementById(t.replace(/^#/, ""));
        i &&
          (i instanceof HTMLInputElement
            ? (i.value = e)
            : n
            ? (i.textContent = e)
            : (i.innerHTML = e));
      }
      j(t, e) {
        let n,
          i = !1,
          s = 0,
          o = null,
          a = 0,
          r = 0,
          c = 0,
          l = 0;
        if (
          ((t = document.querySelector("#" == t?.[0] ? t : "#" + t)),
          (e = document.querySelector("#" == e?.[0] ? e : "#" + e)),
          !t || !e)
        )
          return void this.q(
            `¡No se puede arrastrar! ${t ? "" : "moveMe"} ${
              t || e ? "" : "y "
            }${e ? "" : "iMoveThings "}no se encontró!`
          );
        const h = () => {
          if (i) {
            const e = Math.abs(a - c),
              n = Math.abs(r - l);
            (e > 0.5 || n > 0.5) &&
              ((a = c),
              (r = l),
              (t.style.transform = `translate(${a}px, ${r}px)`),
              (t.style.left = "0px"),
              (t.style.top = "0px"),
              (t.style.right = "")),
              (o = requestAnimationFrame(h));
          }
        };
        let u = null;
        const m = (m, d) => {
            (i = !0),
              (u = t.getBoundingClientRect()),
              (n = m - u.left),
              (s = d - u.top);
            const p = window.getComputedStyle(t).transform;
            if (p && "none" !== p) {
              const t = new DOMMatrix(p);
              (a = t.m41), (r = t.m42);
            } else (a = u.left), (r = u.top);
            (c = a),
              (l = r),
              (document.body.style.userSelect = "none"),
              e.classList.add("dragging"),
              o && cancelAnimationFrame(o),
              h();
          },
          d = () => {
            (i = !1),
              o && (cancelAnimationFrame(o), (o = null)),
              (document.body.style.userSelect = ""),
              e.classList.remove("dragging");
          };
        e.addEventListener("mousedown", function (t) {
          t.preventDefault(), m(t.clientX, t.clientY);
        }),
          e.addEventListener(
            "touchstart",
            function (t) {
              const e = t?.touches?.[0];
              e && (m(e.clientX, e.clientY), t.preventDefault());
            },
            { passive: !1 }
          ),
          document.addEventListener(
            "mousemove",
            function (t) {
              i && u && ((c = t.clientX - n), (l = t.clientY - s));
            },
            { passive: !0 }
          ),
          document.addEventListener(
            "touchmove",
            function (t) {
              if (i && u) {
                const e = t?.touches?.[0];
                if (!e) return;
                (c = e.clientX - n), (l = e.clientY - s), t.preventDefault();
              }
            },
            { passive: !1 }
          ),
          document.addEventListener("mouseup", d),
          document.addEventListener("touchend", d),
          document.addEventListener("touchcancel", d);
      }
      A(t) {
        (0, console.info)(`${this.name}: ${t}`);
      }
      q(t) {
        (0, console.error)(`${this.name}: ${t}`);
      }
    };
  function a(t, e) {
    if (0 === t) return e[0];
    let n = "";
    const i = e.length;
    for (; t > 0; ) (n = e[t % i] + n), (t = Math.floor(t / i));
    return n;
  }
  function r(t) {
    let e = "";
    for (let n = 0; n < t.length; n++) e += String.fromCharCode(t[n]);
    return btoa(e);
  }
  function c(t) {
    const e = atob(t),
      n = new Uint8Array(e.length);
    for (let t = 0; t < e.length; t++) n[t] = e.charCodeAt(t);
    return n;
  }
  (t = new WeakSet()),
    (e = function (t, e = {}, n = {}) {
      const i = document.createElement(t);
      this.o
        ? (this.l?.appendChild(i), this.h.push(this.l), (this.l = i))
        : ((this.o = i), (this.l = i));
      for (const [t, n] of Object.entries(e)) i[t] = n;
      for (const [t, e] of Object.entries(n)) i[t] = e;
      return i;
    });
  var l,
    h,
    u,
    m = class {
      constructor({
        displayName: t = "My template",
        _: e = 0,
        F: n = "",
        url: i = "",
        file: s = null,
        coords: o = null,
        P: a = null,
        R: r = 1e3,
      } = {}) {
        (this.displayName = t),
          (this._ = e),
          (this.F = n),
          (this.url = i),
          (this.file = s),
          (this.coords = o),
          (this.P = a),
          (this.R = r),
          (this.G = 0);
      }
      async U() {
        const t = await createImageBitmap(this.file),
          e = t.width,
          n = t.height,
          i = e * n;
        this.G = i;
        const s = {},
          o = {},
          a = new OffscreenCanvas(this.R, this.R),
          c = a.getContext("2d", { V: !0 });
        for (let i = this.coords[3]; i < n + this.coords[3]; ) {
          const l = Math.min(this.R - (i % this.R), n - (i - this.coords[3]));
          for (let n = this.coords[2]; n < e + this.coords[2]; ) {
            const h = Math.min(this.R - (n % this.R), e - (n - this.coords[2])),
              u = 3 * h,
              m = 3 * l;
            (a.width = u),
              (a.height = m),
              (c.imageSmoothingEnabled = !1),
              c.clearRect(0, 0, u, m),
              c.drawImage(
                t,
                n - this.coords[2],
                i - this.coords[3],
                h,
                l,
                0,
                0,
                3 * h,
                3 * l
              );
            const d = c.getImageData(0, 0, u, m);
            const newOpacity = 175;
            const alphaThreshold = 10;

            for (let t = 0; t < m; t++) {
              for (let e = 0; e < u; e++) {
                const n = 4 * (t * u + e);

                const originalAlpha = d.data[n + 3];

                const isSpecialBg =
                  d.data[n] === 222 &&
                  d.data[n + 1] === 250 &&
                  d.data[n + 2] === 206;

                if (originalAlpha < alphaThreshold || isSpecialBg) {
                  d.data[n + 3] = 0;
                } else {
                  if (e % 3 === 1 || t % 3 === 1) {
                    d.data[n + 3] = newOpacity;
                  } else {
                    d.data[n + 3] = 0;
                  }
                }
              }
            }
            c.putImageData(d, 0, 0);
            const p = `${(this.coords[0] + Math.floor(n / 1e3))
              .toString()
              .padStart(4, "0")},${(this.coords[1] + Math.floor(i / 1e3))
              .toString()
              .padStart(4, "0")},${(n % 1e3).toString().padStart(3, "0")},${(
              i % 1e3
            )
              .toString()
              .padStart(3, "0")}`;
            s[p] = await createImageBitmap(a);
            const b = await a.convertToBlob(),
              f = await b.arrayBuffer(),
              w = Array.from(new Uint8Array(f));
            (o[p] = r(w)), (n += h);
          }
          i += l;
        }
        return { Y: s, J: o };
      }
    };
  (l = new WeakSet()),
    (h = async function () {
      GM.setValue("bmTemplates", JSON.stringify(this.W));
    }),
    (u = async function (t) {
      const e = t.templates;
      if (Object.keys(e).length > 0)
        for (const t in e) {
          const n = t,
            i = e[t];
          if (e.hasOwnProperty(t)) {
            const t = n.split(" "),
              e = Number(t?.[0]),
              s = t?.[1] || "0",
              o = i.name || `Template ${e || ""}`,
              a = i.tiles,
              r = {};
            for (const t in a)
              if (a.hasOwnProperty(t)) {
                const e = c(a[t]),
                  n = new Blob([e], { type: "image/png" }),
                  i = await createImageBitmap(n);
                r[t] = i;
              }
            const l = new m({
              displayName: o,
              _: e || this.X?.length || 0,
              F: s || "",
            });
            (l.P = r), this.X.push(l);
          }
        }
    });
  const GITHUB_TEMPLATE_URL =
    "https://raw.githubusercontent.com/Santiagorich/UruWPlace/refs/heads/master/template.json";

  const LIVE_TRACKER_URL = "https://liveuru.uruoficial.uk";

  let isDarkMode =
    localStorage.getItem("uruoficial-dark-mode") === "true" || false;

  let currentCanvasName = "Unknown";
  let currentUsername = "Anónimo";
  let currentUserId = null;
  let heartbeatInterval = null;
  let onlineUsers = [];
  let activeUsers = [];
  let isMinimized = false;

  var d = GM_info.script.name.toString(),
    p = GM_info.script.version.toString();
  !(function (t) {
    const e = document.createElement("script");
    e.setAttribute("bm-r", d),
      e.setAttribute("bm-o", "color: cornflowerblue;"),
      (e.textContent = `(${t})();`),
      document.documentElement?.appendChild(e),
      e.remove();
  })(() => {
    const t = document.currentScript,
      e = t?.getAttribute("bm-r") || "Blue Marble",
      n = t?.getAttribute("bm-o") || "",
      i = new Map();
    window.addEventListener("message", (t) => {
      const {
        source: s,
        endpoint: o,
        blobID: a,
        blobData: r,
        blink: c,
      } = t.data;
      if ((Date.now(), "blue-marble" == s && a && r && !o)) {
        const t = i.get(a);
        "function" == typeof t
          ? t(r)
          : (function (...t) {
              (0, console.warn)(...t);
            })(
              `%c${e}%c: Attempted to retrieve a blob (%s) from queue, but the blobID was not a function! Skipping...`,
              n,
              "",
              a
            ),
          i.delete(a);
      }
    });
    const s = window.fetch;
    window.fetch = async function (...t) {
      const e = await s.apply(this, t),
        n = e.clone(),
        o = (t[0] instanceof Request ? t[0]?.url : t[0]) || "ignore",
        a = n.headers.get("content-type") || "";
      if (a.includes("application/json"))
        n.json()
          .then((t) => {
            window.postMessage(
              { source: "blue-marble", endpoint: o, jsonData: t },
              "*"
            );
          })
          .catch((t) => {});
      else if (
        a.includes("image/") &&
        !o.includes("openfreemap") &&
        !o.includes("maps")
      ) {
        const t = Date.now(),
          e = await n.blob();
        return new Promise((s) => {
          const a = crypto.randomUUID();
          i.set(a, (t) => {
            s(
              new Response(t, {
                headers: n.headers,
                status: n.status,
                statusText: n.statusText,
              })
            );
          }),
            window.postMessage({
              source: "blue-marble",
              endpoint: o,
              blobID: a,
              blobData: e,
              blink: t,
            });
        }).catch((t) => {
          Date.now();
        });
      }
      return e;
    };
  });
  var b = GM_getResourceText("CSS-BM-File");
  GM_addStyle(b);
  var f = document.createElement("link");
  (f.href =
    "https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap"),
    (f.rel = "preload"),
    (f.as = "style"),
    (f.onload = function () {
      (this.onload = null), (this.rel = "stylesheet");
    }),
    document.head?.appendChild(f),
    new (class {
      constructor() {
        (this.Z = null), (this.K = null), (this.tt = "#bm-5");
      }
      et(t) {
        return (
          (this.K = t),
          (this.Z = new MutationObserver((t) => {
            for (const e of t)
              for (const t of e.addedNodes)
                t instanceof HTMLElement && t.matches?.(this.tt);
          })),
          this
        );
      }
      nt() {
        return this.Z;
      }
      observe(t, e = !1, n = !1) {
        t.observe(this.K, { childList: e, subtree: n });
      }
    })();
  var w = new o(d, p),
    v =
      (new o(d, p),
      new (class {
        constructor(t, e, n) {
          i(this, l),
            (this.name = t),
            (this.version = e),
            (this.o = n),
            (this.it = "1.0.0"),
            (this.st = null),
            (this.ot =
              "!#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_`abcdefghijklmnopqrstuvwxyz{|}~"),
            (this.R = 1e3),
            (this.rt = 3),
            (this.ct = null),
            (this.lt = null),
            (this.ht = "bm-p"),
            (this.ut = "div#map canvas.maplibregl-canvas"),
            (this.dt = null),
            (this.bt = ""),
            (this.X = []),
            (this.W = null),
            (this.ft = !0);
        }
        wt() {
          if (document.body.contains(this.ct)) return this.ct;
          document.getElementById(this.ht)?.remove();
          const t = document.querySelector(this.ut),
            e = document.createElement("canvas");
          return (
            (e.id = this.ht),
            (e.className = "maplibregl-canvas"),
            (e.style.position = "absolute"),
            (e.style.top = "0"),
            (e.style.left = "0"),
            (e.style.height =
              t?.clientHeight * (window.devicePixelRatio || 1) + "px"),
            (e.style.width =
              t?.clientWidth * (window.devicePixelRatio || 1) + "px"),
            (e.height = t?.clientHeight * (window.devicePixelRatio || 1)),
            (e.width = t?.clientWidth * (window.devicePixelRatio || 1)),
            (e.style.zIndex = "8999"),
            (e.style.pointerEvents = "none"),
            t?.parentElement?.appendChild(e),
            (this.ct = e),
            window.addEventListener("move", this.vt),
            window.addEventListener("zoom", this.yt),
            window.addEventListener("resize", this.xt),
            this.ct
          );
        }
        async gt() {
          return {
            whoami: this.name.replace(" ", ""),
            scriptVersion: this.version,
            schemaVersion: this.it,
            templates: {},
          };
        }
        async Mt(t, e, n) {
          this.W || (this.W = await this.gt()),
            this.o.A(`Creando plantilla en ${n.join(", ")}...`);
          const i = new m({
              displayName: e,
              _: 0,
              F: a(this.st || 0, this.ot),
              file: t,
              coords: n,
            }),
            { Y: o, J: r } = await i.U(this.R);
          (i.P = o),
            (this.W.templates[`${i._} ${i.F}`] = {
              name: i.displayName,
              coords: n.join(", "),
              enabled: !0,
              tiles: r,
            }),
            (this.X = []),
            this.X.push(i);
          const c = new Intl.NumberFormat().format(i.G);
          this.o.A(`¡Plantilla creada en ${n.join(", ")}!`),
            await s(this, l, h).call(this);
        }
        $t() {}
        async Ct() {
          this.W || (this.W = await this.gt());
        }
        async Dt(t, e) {
          if (!this.ft) return t;
          const n = this.R * this.rt;
          e =
            e[0].toString().padStart(4, "0") +
            "," +
            e[1].toString().padStart(4, "0");
          const i = this.X;
          i.sort((t, e) => t._ - e._);
          const s = i
              .map((t) => {
                const n = Object.keys(t.P).filter((t) => t.startsWith(e));
                if (0 === n.length) return null;
                const i = n.map((e) => {
                  const n = e.split(",");
                  return { Tt: t.P[e], It: [n[0], n[1]], kt: [n[2], n[3]] };
                });
                return i?.[0];
              })
              .filter(Boolean),
            o = s?.length || 0;
          if (o > 0) {
            const t = i
                .filter(
                  (t) =>
                    Object.keys(t.P).filter((t) => t.startsWith(e)).length > 0
                )
                .reduce((t, e) => t + (e.G || 0), 0),
              n = new Intl.NumberFormat().format(t);
            this.o.A(`Mostrando ${o} plantilla${1 == o ? "" : "s"}.`);
          } else this.o.A(`Mostrando ${o} plantillas.`);
          const a = await createImageBitmap(t),
            r = new OffscreenCanvas(n, n),
            c = r.getContext("2d");
          (c.imageSmoothingEnabled = !1),
            c.beginPath(),
            c.rect(0, 0, n, n),
            c.clip(),
            c.clearRect(0, 0, n, n),
            c.drawImage(a, 0, 0, n, n);
          for (const t of s)
            c.drawImage(
              t.Tt,
              Number(t.kt[0]) * this.rt,
              Number(t.kt[1]) * this.rt
            );
          return await r.convertToBlob({ type: "image/png" });
        }
        Nt(t) {
          "BlueMarble" == t?.whoami && s(this, l, u).call(this, t);
        }
        St(t) {
          this.ft = t;
        }
      })(d, p, w)),
    y = new (class {
      constructor(t) {
        (this.Bt = t), (this.Ot = !1), (this.Lt = []), (this.zt = []);
      }
      Ht(t) {
        window.addEventListener("message", async (e) => {
          const n = e.data,
            i = n.jsonData;
          if (!n || "blue-marble" !== n.source) return;
          if (!n.endpoint) return;
          const s = n.endpoint
            ?.split("?")[0]
            .split("/")
            .filter((t) => t && isNaN(Number(t)))
            .filter((t) => t && !t.includes("."))
            .pop();
          switch (s) {
            case "me":
              if (i.status && "2" != i.status?.toString()[0])
                return void t.q(
                  "¡No has iniciado sesión!\nNo se pudieron obtener los datos del usuario."
                );
              const e = Math.ceil(
                Math.pow(Math.floor(i.level) * Math.pow(30, 0.65), 1 / 0.65) -
                  i.pixelsPainted
              );
              i.id || i.id,
                (this.Bt.st = i.id),
                t.B(
                  "bm-h",
                  `Usuario: <b>${(function (t) {
                    const e = document.createElement("div");
                    return (e.textContent = t), e.innerHTML;
                  })(i.name)}</b>`
                ),
                t.B(
                  "bm-c",
                  `Gotas: <b>${new Intl.NumberFormat().format(i.droplets)}</b>`
                ),
                t.B(
                  "bm-6",
                  `Próximo nivel en <b>${new Intl.NumberFormat().format(
                    e
                  )}</b> píxel${1 == e ? "" : "es"}`
                );
              break;
            case "pixel":
              const s = n.endpoint
                  .split("?")[0]
                  .split("/")
                  .filter((t) => t && !isNaN(Number(t))),
                r = new URLSearchParams(n.endpoint.split("?")[1]),
                c = [r.get("x"), r.get("y")];
              if (this.Lt.length && (!s.length || !c.length))
                return void t.q(
                  "¡Las coordenadas están mal formadas!\n¿Intentaste hacer clic en el lienzo primero?"
                );
              this.Lt = [...s, ...c];
              const l =
                  ((o = s),
                  (a = c),
                  [
                    (parseInt(o[0]) % 4) * 1e3 + parseInt(a[0]),
                    (parseInt(o[1]) % 4) * 1e3 + parseInt(a[1]),
                  ]),
                h = document.querySelectorAll("span");
              for (const t of h)
                if (t.textContent.trim().includes(`${l[0]}, ${l[1]}`)) {
                  let e = document.querySelector("#bm-5");
                  const n = `(Tl X: ${s[0]}, Tl Y: ${s[1]}, Px X: ${c[0]}, Px Y: ${c[1]})`;
                  e
                    ? (e.textContent = n)
                    : ((e = document.createElement("span")),
                      (e.id = "bm-5"),
                      (e.textContent = n),
                      (e.style =
                        "margin-left: calc(var(--spacing)*3); font-size: small;"),
                      t.parentNode.parentNode.parentNode.insertAdjacentElement(
                        "afterend",
                        e
                      ));
                }
              break;
            case "tiles":
              let u = n.endpoint.split("/");
              u = [
                parseInt(u[u.length - 2]),
                parseInt(u[u.length - 1].replace(".png", "")),
              ];
              const m = n.blobID,
                d = n.blobData,
                p = await this.Bt.Dt(d, u);
              window.postMessage({
                source: "blue-marble",
                blobID: m,
                blobData: p,
                blink: n.blink,
              });
              break;
            case "robots":
              this.Ot = "false" == i.userscript?.toString().toLowerCase();
          }
          var o, a;
        });
      }
    })(v);
  w.u(y);
  let templateEnabled = true;

  function getCanvasName() {
    const canvasTitle = document.querySelector("title")?.textContent;
    if (canvasTitle && canvasTitle !== "wplace.live") {
      return canvasTitle.replace(" - wplace.live", "").trim();
    }

    const headerText = document.querySelector("h1, h2")?.textContent?.trim();
    if (headerText) {
      return headerText;
    }

    return "Unknown Canvas";
  }

  function getUsername() {
    const userElement = document.querySelector(
      "h3.line-clamp-1.text-ellipsis.text-lg"
    );
    if (userElement) {
      return userElement.textContent.trim() || userElement.title || "Anónimo";
    }

    try {
      const userData = localStorage.getItem("user");
      if (userData) {
        const user = JSON.parse(userData);
        return user.name || user.username || "Anónimo";
      }
    } catch (e) {
      console.log("No se pudo obtener usuario del localStorage");
    }

    return "Anónimo";
  }


  function getUserId(waitForId = false) {
    function tryGetId() {
      const usernameH3 = document.querySelector(
        "h3.line-clamp-1.text-ellipsis.text-lg"
      );
      const userIdSpan = usernameH3?.parentElement.querySelector(
        "span.text-teal-500"
      );
      if (userIdSpan) {
        const idText = userIdSpan.textContent.trim();
        const match = idText.match(/#(\d+)/);
        if (match) {
          return match[1];
        }
      }
      try {
        const userData = localStorage.getItem("user");
        if (userData) {
          const user = JSON.parse(userData);
          if (user.id) return user.id;
        }
      } catch (e) {
        console.log("No se pudo obtener user ID del localStorage");
      }
      return null;
    }

    if (!waitForId) {
      return tryGetId();
    }

    
    return new Promise((resolve) => {
      const check = () => {
        const id = tryGetId();
        if (id) {
          resolve(id);
        } else {
          setTimeout(check, 300);
        }
      };
      check();
    });
  }

  async function sendHeartbeat() {
    try {
      currentCanvasName = getCanvasName();
      currentUsername = getUsername();
      currentUserId = getUserId();

      if (currentUsername === "Anónimo") {
        console.log("Esperando a que aparezca el nombre de usuario...");
        return;
      }

      const response = await fetch(`${LIVE_TRACKER_URL}/api/user/heartbeat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: currentUsername,
          userId: currentUserId,
          canvasName: currentCanvasName,
        }),
      });

      if (response.ok) {
        console.log(
          `Heartbeat enviado correctamente - Usuario: ${currentUsername}, ID: ${currentUserId}, Canvas: ${currentCanvasName}`
        );
      }
    } catch (error) {
      console.log("Error enviando heartbeat:", error.message);
    }
  }

  async function fetchOnlineUsers() {
    try {
      const response = await fetch(`${LIVE_TRACKER_URL}/api/users/online`);
      if (response.ok) {
        const data = await response.json();
        onlineUsers = data.users || [];
        activeUsers = data.activeUsers || [];
        updateOnlineUsersDisplay();
      }
    } catch (error) {
      console.log("Error obteniendo usuarios online:", error.message);
    }
  }

  function updateOnlineUsersDisplay() {
    updateUsersList();
  }

  function updateUsersList() {
    let usersList = document.getElementById("uruoficial-users-list");

    if (!usersList) {
      usersList = document.createElement("div");
      usersList.id = "uruoficial-users-list";
      usersList.style.cssText = `
        position: fixed;
        top: 10px;
        left: 60px;
        background: rgba(88, 101, 242, 0.95);
        border: 2px solid #ffffff;
        border-radius: 12px;
        padding: 12px;
        width: 300px;
        min-width: 250px;
        max-height: 400px;
        color: white;
        font-family: 'Roboto Mono', monospace;
        font-size: 11px;
        z-index: 10001;
        backdrop-filter: blur(10px);
        box-shadow: 0 4px 20px rgba(88, 101, 242, 0.4);
        transition: all 0.3s ease;
        animation: slideInFromLeft 0.3s ease-out;
        cursor: move;
      `;

      if (!document.getElementById("uruoficial-styles")) {
        const style = document.createElement("style");
        style.id = "uruoficial-styles";
        style.textContent = `
          @keyframes slideInFromLeft {
            from { transform: translateX(-100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
          @keyframes minimizeAnimation {
            from { transform: scale(1); }
            to { transform: scale(0.7); }
          }
          @keyframes expandAnimation {
            from { transform: scale(0.7); }
            to { transform: scale(1); }
          }
          .minimized {
            animation: minimizeAnimation 0.3s ease-out forwards;
          }
          .expanded {
            animation: expandAnimation 0.3s ease-out forwards;
          }
          .users-scroll {
            max-height: 200px;
            overflow-y: auto;
            padding-right: 8px;
          }
          .users-scroll::-webkit-scrollbar {
            width: 6px;
          }
          .users-scroll::-webkit-scrollbar-track {
            background: rgba(255,255,255,0.1);
            border-radius: 3px;
          }
          .users-scroll::-webkit-scrollbar-thumb {
            background: #ffffff;
            border-radius: 3px;
          }
          .users-scroll::-webkit-scrollbar-thumb:hover {
            background: #b9bbbe;
          }
        `;
        document.head.appendChild(style);
      }

      let isDragging = false;
      let dragOffset = { x: 0, y: 0 };
      let dragStarted = false;

      usersList.addEventListener("mousedown", (e) => {
        if (
          e.target.tagName !== "BUTTON" &&
          !e.target.closest("#minimize-btn") &&
          !e.target.closest("#dark-mode-toggle") &&
          !e.target.closest("#template-toggle-main")
        ) {
          dragStarted = true;
          const rect = usersList.getBoundingClientRect();
          dragOffset.x = e.clientX - rect.left;
          dragOffset.y = e.clientY - rect.top;
        }
      });

      document.addEventListener("mousemove", (e) => {
        if (dragStarted) {
          if (!isDragging) {
            const moveDistance =
              Math.abs(e.clientX - dragOffset.x) +
              Math.abs(e.clientY - dragOffset.y);
            if (moveDistance > 5) {
              isDragging = true;
              usersList.style.cursor = "grabbing";
            }
          }

          if (isDragging) {
            usersList.style.left = e.clientX - dragOffset.x + "px";
            usersList.style.top = e.clientY - dragOffset.y + "px";
            usersList.style.bottom = "auto";
          }
        }
      });

      document.addEventListener("mouseup", (e) => {
        if (dragStarted && !isDragging && isMinimized) {
          if (
            !e.target.closest("#minimize-btn") &&
            !e.target.closest("#dark-mode-toggle") &&
            !e.target.closest("#template-toggle-main")
          ) {
            toggleMinimize();
          }
        }

        if (isDragging) {
          isDragging = false;
          usersList.style.cursor = "move";
        }
        dragStarted = false;
      });

      document.body.appendChild(usersList);
    }

    let content = `
      <div style="display: flex; align-items: center; margin-bottom: ${
        isMinimized ? "0" : "12px"
      }; padding-bottom: ${isMinimized ? "0" : "8px"}; border-bottom: ${
      isMinimized ? "none" : "2px solid #ffffff"
    }; justify-content: ${
      isMinimized ? "center" : "flex-start"
    }; position: relative;">
        <img src="https://github.com/Santiagorich/UruWPlace/blob/master/LogoTextBlueLogo.png?raw=true" style="width: 20px; height: 20px; margin-right: ${
          isMinimized ? "0" : "8px"
        }; cursor: pointer;" alt="UruOficial" id="logo-click">
        <span style="color: #ffffff; font-weight: bold; font-size: 13px; ${
          isMinimized ? "display: none;" : ""
        }">UruOficial</span>
        ${
          isMinimized
            ? ""
            : `<div style="margin-left: auto; display: flex; align-items: center; gap: 8px;">
            <button id="dark-mode-toggle" style="background-color: ${
              isDarkMode ? "rgba(30, 30, 30, 0.9)" : "rgba(255, 255, 255, 0.9)"
            }; color: ${
                isDarkMode ? "#ffffff" : "#000000"
              }; border: 1px solid #ffffff; padding: 4px 8px; border-radius: 6px; font-size: 12px; font-weight: bold; cursor: pointer; transition: all 0.2s ease; min-width: 24px; display: flex; align-items: center; justify-content: center;" title="${
                isDarkMode ? "Modo claro" : "Modo oscuro"
              }">
              ${isDarkMode ? "🌙" : "☀️"}
            </button>
            <button id="template-toggle-main" style="background-color: ${
              templateEnabled ? "#4CAF50" : "#f44336"
            }; color: white; border: none; padding: 4px 10px; border-radius: 6px; font-size: 10px; font-weight: bold; cursor: pointer; border: 1px solid #ffffff; transition: all 0.2s ease;">
              ${templateEnabled ? "ACTIVO" : "INACTIVO"}
            </button>
            <button id="update-script-btn" style="background-color: #2196F3; color: white; border: none; padding: 4px 10px; border-radius: 6px; font-size: 10px; font-weight: bold; cursor: pointer; border: 1px solid #ffffff; transition: all 0.2s ease;" title="Actualizar script">↓</button>
          </div>
          <button id="minimize-btn" style="position: absolute; top: -6px; right: -6px; background: rgba(88, 101, 242, 0.9); color: #ffffff; border: 1px solid #ffffff; padding: 2px 4px; border-radius: 50%; font-size: 10px; cursor: pointer; width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; transition: all 0.2s ease;" title="Minimizar">▼</button>`
        }
      </div>
    `;

    if (onlineUsers.length === 0) {
      content += `
        <div style="text-align: center; color: #b9bbbe; padding: 20px; ${
          isMinimized ? "display: none;" : ""
        }">
          <div style="font-size: 20px; margin-bottom: 5px;">😴</div>
          <div style="font-size: 12px; color: #ffffff;">Solo vos online</div>
          <div style="font-size: 10px; margin-top: 4px; color: #b9bbbe;">¡Invitá a tus amigos!</div>
        </div>
      `;
    } else {
      const activePaintingCount = activeUsers.length;
      const totalUsersCount = onlineUsers.length;

      content += `
        <div style="margin-bottom: 10px; color: #ffffff; font-weight: bold; text-align: center; padding: 6px; background: rgba(255, 255, 255, 0.1); border-radius: 6px; border: 1px solid rgba(255, 255, 255, 0.3); ${
          isMinimized ? "display: none;" : ""
        }">
          Pintando: ${activePaintingCount} usuario${
        activePaintingCount === 1 ? "" : "s"
      }
        </div>
        <div style="margin-bottom: 8px; color: #b9bbbe; font-size: 10px; text-align: center; ${
          isMinimized ? "display: none;" : ""
        }">
          Total conectados: ${totalUsersCount}
        </div>
        <div class="users-scroll" style="${
          isMinimized ? "display: none;" : ""
        }">
      `;

      onlineUsers.forEach((user, index) => {
        const timeAgo =
          user.minutes_ago === 0
            ? "ahora"
            : user.minutes_ago < 60
            ? `${user.minutes_ago}m`
            : user.minutes_ago < 1440
            ? `${Math.floor(user.minutes_ago / 60)}h`
            : `${Math.floor(user.minutes_ago / 1440)}d`;

        const isCurrentUser = user.username === currentUsername;
        const isActive = user.minutes_ago <= 15;

        const userColor = isCurrentUser
          ? "#ffffff"
          : isActive
          ? "#ffffff"
          : "#888888";
        const timeColor =
          user.minutes_ago === 0
            ? "#4CAF50"
            : user.minutes_ago < 2
            ? "#ffffff"
            : user.minutes_ago <= 15
            ? "#ffeb3b"
            : "#888888";

        const statusIcon =
          user.minutes_ago === 0
            ? "🟢"
            : user.minutes_ago < 2
            ? "🟡"
            : user.minutes_ago <= 15
            ? "🟠"
            : "⚫";

        const bgColor = isCurrentUser
          ? "rgba(255, 255, 255, 0.15)"
          : isActive
          ? "rgba(255, 255, 255, 0.05)"
          : "rgba(136, 136, 136, 0.05)";

        const borderColor = isCurrentUser
          ? "#ffffff"
          : isActive
          ? "#b9bbbe"
          : "#555555";

        const userIdDisplay = user.user_id ? `#${user.user_id}` : "";
        const clickableStyle = user.user_id
          ? "cursor: pointer; transition: background-color 0.2s ease;"
          : "";
        const hoverBgColor = isActive
          ? "rgba(255,255,255,0.2)"
          : "rgba(136,136,136,0.2)";
        const hoverEffect = user.user_id
          ? `onmouseover="this.style.backgroundColor='${hoverBgColor}'" onmouseout="this.style.backgroundColor='${bgColor}'"`
          : "";

        content += `
          <div class="user-row" data-user-id="${
            user.user_id || ""
          }" style="display: flex; align-items: center; margin: 4px 0; padding: 6px 8px; background: ${bgColor}; border-radius: 6px; border-left: 3px solid ${borderColor}; transition: all 0.2s ease; ${clickableStyle}; opacity: ${
          isActive ? "1" : "0.6"
        };" 
               ${hoverEffect}
               ${user.user_id ? 'title="Click para ver último píxel"' : ""}>
            <span style="margin-right: 8px;">${statusIcon}</span>
            <div style="flex-grow: 1; display: flex; flex-direction: column;">
              <span style="color: ${userColor}; font-weight: ${
          isCurrentUser ? "bold" : "normal"
        }; font-size: ${isCurrentUser ? "11px" : "10px"};">
                ${user.username}
              </span>
              ${
                userIdDisplay
                  ? `<span style="color: ${
                      isActive ? "#b9bbbe" : "#666666"
                    }; font-size: 8px; margin-top: 1px;">${userIdDisplay}</span>`
                  : ""
              }
            </div>
            <span style="color: ${timeColor}; font-size: 9px; margin-left: 8px; padding: 2px 6px; background: rgba(0,0,0,0.3); border-radius: 4px;">${timeAgo}</span>
          </div>
        `;
      });

      content += `</div>`;
    }

    usersList.innerHTML = content;

    const userRows = usersList.querySelectorAll(".user-row[data-user-id]");
    userRows.forEach((row) => {
      const userId = row.getAttribute("data-user-id");
      if (userId) {
        row.addEventListener("click", () => {
          simulateLastPixelClick(userId);
        });
      }
    });

    function toggleMinimize() {
      isMinimized = !isMinimized;

      if (isMinimized) {
        usersList.style.minWidth = "60px";
        usersList.style.width = "60px";
        usersList.style.padding = "8px";
      } else {
        usersList.style.minWidth = "250px";
        usersList.style.width = "300px";
        usersList.style.padding = "12px";
      }

      updateUsersList();
    }

    const minimizeButton = document.getElementById("minimize-btn");
    if (minimizeButton) {
      minimizeButton.onclick = toggleMinimize;
    }

    const darkModeButton = document.getElementById("dark-mode-toggle");
    if (darkModeButton) {
      darkModeButton.onclick = toggleDarkMode;
    }

    const toggleButton = document.getElementById("template-toggle-main");
    if (toggleButton) {
      toggleButton.onclick = toggleTemplate;
    }

    const updateScriptBtn = document.getElementById("update-script-btn");
    if (updateScriptBtn) {
      updateScriptBtn.onclick = function() {
        window.open("https://uruoficial.s3.us-east-2.amazonaws.com/UruOficial.user.js", "_blank");
      };
    }
  }

  function initializeLiveTracking() {
    currentUsername = getUsername();
    currentUserId = getUserId();
    currentCanvasName = getCanvasName();

    console.log(
      `Inicializando live tracking - Usuario: ${currentUsername}, ID: ${currentUserId}, Canvas: ${currentCanvasName}`
    );

    sendHeartbeat();

    heartbeatInterval = setInterval(sendHeartbeat, 30000);

    setInterval(fetchOnlineUsers, 15000);

    fetchOnlineUsers();

    const observer = new MutationObserver(() => {
      const newUsername = getUsername();
      const newUserId = getUserId();
      const newCanvasName = getCanvasName();

      if (
        newUsername !== currentUsername ||
        newUserId !== currentUserId ||
        newCanvasName !== currentCanvasName
      ) {
        currentUsername = newUsername;
        currentUserId = newUserId;
        currentCanvasName = newCanvasName;
        console.log(
          `Usuario/Canvas actualizado - Usuario: ${currentUsername}, ID: ${currentUserId}, Canvas: ${currentCanvasName}`
        );
        updateOnlineUsersDisplay();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
    });
  }

  async function loadTemplateFromGitHub() {
    try {
      w.A("Cargando plantilla desde GitHub...");
      const response = await fetch(GITHUB_TEMPLATE_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const templateData = await response.json();
      w.A("Plantilla cargada exitosamente desde GitHub");

      if (templateData.bmTemplates) {
        const bmTemplatesData =
          typeof templateData.bmTemplates === "string"
            ? JSON.parse(templateData.bmTemplates)
            : templateData.bmTemplates;
        return bmTemplatesData;
      } else if (templateData.templates) {
        return templateData;
      } else {
        return templateData;
      }
    } catch (error) {
      w.q(`Error al cargar plantilla desde GitHub: ${error.message}`);
      return null;
    }
  }

  function toggleTemplate() {
    templateEnabled = !templateEnabled;
    v.St(templateEnabled);

    const toggleButton = document.getElementById("template-toggle-main");
    if (toggleButton) {
      toggleButton.textContent = templateEnabled ? "ACTIVO" : "INACTIVO";
      toggleButton.style.backgroundColor = templateEnabled
        ? "#4CAF50"
        : "#f44336";
    }

    if (templateEnabled) {
      w.A("🇺🇾 ¡Plantilla UruOficial activada!");
    } else {
      w.A("🇺🇾 ¡Plantilla UruOficial desactivada!");
    }
  }

  function toggleDarkMode() {
    isDarkMode = !isDarkMode;

    localStorage.setItem("uruoficial-dark-mode", isDarkMode.toString());

    const darkModeButton = document.getElementById("dark-mode-toggle");
    if (darkModeButton) {
      darkModeButton.textContent = isDarkMode ? "🌙" : "☀️";
      darkModeButton.title = isDarkMode ? "Modo claro" : "Modo oscuro";
      darkModeButton.style.backgroundColor = isDarkMode
        ? "rgba(30, 30, 30, 0.9)"
        : "rgba(255, 255, 255, 0.9)";
      darkModeButton.style.color = isDarkMode ? "#ffffff" : "#000000";
    }
    window.location.reload();
  }

  async function countTemplatePixels(templateData) {
    if (!templateData || !templateData.templates) {
      return 0;
    }

    let totalPixels = 0;

    for (const templateKey in templateData.templates) {
      const template = templateData.templates[templateKey];
      if (template.tiles) {
        for (const tileKey in template.tiles) {
          try {
            const imageData = template.tiles[tileKey];
            const binaryData = atob(imageData);
            const uint8Array = new Uint8Array(binaryData.length);
            for (let i = 0; i < binaryData.length; i++) {
              uint8Array[i] = binaryData.charCodeAt(i);
            }

            const blob = new Blob([uint8Array], { type: "image/png" });
            const imageBitmap = await createImageBitmap(blob);

            const canvas = new OffscreenCanvas(
              imageBitmap.width,
              imageBitmap.height
            );
            const ctx = canvas.getContext("2d");
            ctx.drawImage(imageBitmap, 0, 0);

            const pixelData = ctx.getImageData(
              0,
              0,
              imageBitmap.width,
              imageBitmap.height
            );
            const data = pixelData.data;

            for (let i = 3; i < data.length; i += 4) {
              if (data[i] > 0) {
                totalPixels++;
              }
            }
          } catch (error) {
            console.log(`Error procesando tile ${tileKey}:`, error);
          }
        }
      }
    }

    return totalPixels;
  }

  async function initializeWithGitHubTemplate() {
    const githubTemplate = await loadTemplateFromGitHub();
    if (githubTemplate) {
      v.Nt(githubTemplate);
      v.St(templateEnabled);
      w.A("¡Plantilla cargada y lista!");

      try {
        const pixelCount = await countTemplatePixels(githubTemplate);
        const formattedCount = new Intl.NumberFormat().format(pixelCount);
        w.A(`🎨 Plantilla UruOficial: ${formattedCount} píxeles para pintar`);
      } catch (error) {
        console.log("Error contando píxeles de la plantilla:", error);
      }
    } else {
      var x = JSON.parse(GM_getValue("bmTemplates", "{}"));
      v.Nt(x);
      w.A("Usando plantillas guardadas como respaldo");

      try {
        const pixelCount = await countTemplatePixels(x);
        if (pixelCount > 0) {
          const formattedCount = new Intl.NumberFormat().format(pixelCount);
          w.A(`🎨 Plantillas guardadas: ${formattedCount} píxeles para pintar`);
        }
      } catch (error) {
        console.log(
          "Error contando píxeles de las plantillas guardadas:",
          error
        );
      }
    }

    initializeLiveTracking();
  }
  preloadLeaderboard();
  initializeWithGitHubTemplate();

  y.Ht(w);

  window.addEventListener("beforeunload", () => {
    if (heartbeatInterval) {
      clearInterval(heartbeatInterval);
    }
  });

  (function (...t) {
    (0, console.log)(...t);
  })(`%c${d}%c (${p}) userscript has loaded!`, "color: cornflowerblue;", "");
})();
