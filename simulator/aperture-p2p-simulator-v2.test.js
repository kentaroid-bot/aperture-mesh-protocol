const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

function element(id = "") {
  return {
    id,
    value: "",
    textContent: "",
    dataset: {},
    children: [],
    attributes: {},
    listeners: {},
    setAttribute(name, value) { this.attributes[name] = String(value); },
    addEventListener(name, handler) { this.listeners[name] = handler; },
    appendChild(child) { this.children.push(child); return child; },
    append(...children) { this.children.push(...children); },
    replaceChildren(...children) { this.children = children; }
  };
}

const ids = [
  "pressure", "threshold", "strength", "cooling", "redundancy", "oracle", "constitution", "bridgeTtl",
  "pressureValue", "thresholdValue", "strengthValue", "coolingValue", "redundancyValue", "oracleValue", "constitutionValue", "bridgeTtlValue",
  "network", "log", "autoButton", "stepButton", "eventButton", "safetyButton", "falseReportButton", "resetButton",
  "m1Label", "m3Label", "stability", "entropy", "trust", "captureRisk", "phase", "step",
  "evidenceStatus", "scopeStatus", "ttlStatus", "outcomeStatus"
];
const elements = Object.fromEntries(ids.map((id) => [id, element(id)]));
const modeButtons = [element("homeMode"), element("meshMode")];
modeButtons[0].dataset.mode = "home";
modeButtons[1].dataset.mode = "mesh";

const context = vm.createContext({
  console,
  document: {
    getElementById: (id) => elements[id],
    querySelectorAll: (selector) => selector === ".mode-switch button" ? modeButtons : [],
    createElementNS: (_namespace, tag) => element(tag),
    createElement: (tag) => element(tag),
    createTextNode: (text) => ({ textContent: text })
  },
  window: {
    setInterval: () => 1,
    clearInterval: () => {}
  }
});

const source = fs.readFileSync(`${__dirname}/aperture-p2p-simulator-v2.js`, "utf8");
vm.runInContext(`${source}\nglobalThis.testApi = { state, setMode, injectSafetyEvent, runStep };`, context);
const api = context.testApi;

api.setMode("home");
api.injectSafetyEvent(true);
for (let step = 0; step < 4; step += 1) api.runStep(true);
assert.equal(api.state.phase, "Protected Exit");
assert.equal(api.state.outcome, "保護された退出");
assert.equal(api.state.bridgeRemaining, 0);

api.setMode("home");
api.injectSafetyEvent(false);
for (let step = 0; step < 4; step += 1) api.runStep(true);
assert.equal(api.state.phase, "Peaceful Closure");
assert.equal(api.state.outcome, "誤報を棄却・報復禁止");

api.setMode("home");
api.state.oracle = 0;
api.state.constitution = 0;
api.injectSafetyEvent(false);
api.runStep(true);
assert.equal(api.state.phase, "Protocol Capture");
assert.ok(api.state.captureRisk >= 90);

console.log("Aperture simulator state transitions: ok");
