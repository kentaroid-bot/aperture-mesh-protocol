const defaults = {
  home: { pressure: 46, threshold: 62, strength: 58, cooling: 72, redundancy: 64, oracle: 68, constitution: 84, bridgeTtl: 5, entropy: 12, trust: 82, stability: 94 },
  mesh: { pressure: 52, threshold: 58, strength: 76, cooling: 61, redundancy: 82, oracle: 62, constitution: 78, bridgeTtl: 5, entropy: 18, trust: 74, stability: 88 }
};

const state = {
  mode: "home",
  tick: 0,
  ...defaults.home,
  phase: "Normal Phase",
  auto: false,
  timer: null,
  logs: [],
  safetyEvent: null,
  bridgeRemaining: 0,
  captureRisk: 8,
  dangerousAccessRemoved: 0,
  outcome: "通常接続"
};

const controlIds = ["pressure", "threshold", "strength", "cooling", "redundancy", "oracle", "constitution", "bridgeTtl"];
const controls = Object.fromEntries(controlIds.map((id) => [id, document.getElementById(id)]));
const labels = Object.fromEntries(controlIds.map((id) => [id, document.getElementById(`${id}Value`)]));
const svg = document.getElementById("network");
const log = document.getElementById("log");

const scenarios = {
  home: {
    m1: "家庭の安全安定度",
    m3: "安全な選択肢幅",
    nodes: [
      { id: "Node-01", x: 112, y: 108 },
      { id: "Node-02", x: 280, y: 92 },
      { id: "Node-03", x: 112, y: 304 },
      { id: "Node-04", x: 280, y: 320 },
      { id: "Task API", x: 448, y: 122 },
      { id: "Monku Pool", x: 198, y: 206, type: "pool" },
      { id: "Revision", x: 486, y: 300, type: "revision" },
      { id: "Constitution", x: 390, y: 214, type: "constitution" }
    ],
    edges: [[0, 5], [1, 5], [2, 5], [3, 5], [0, 4], [1, 4], [2, 6], [3, 6], [5, 6], [6, 7], [7, 4]],
    safetySource: { x: 512, y: 300 },
    safetyNodes: [
      { id: "Safety Bridge", x: 628, y: 218, type: "bridge" },
      { id: "School", x: 704, y: 102 },
      { id: "Doctor", x: 708, y: 218 },
      { id: "Welfare", x: 704, y: 336 }
    ],
    safetyEdges: [[0, 1], [0, 2], [0, 3]]
  },
  mesh: {
    m1: "小国生存率",
    m3: "主権の選択肢幅",
    nodes: [
      { id: "Small-A", x: 120, y: 146 },
      { id: "Small-B", x: 268, y: 92 },
      { id: "Small-C", x: 424, y: 116 },
      { id: "Port Hub", x: 544, y: 216 },
      { id: "Escrow", x: 362, y: 258, type: "pool" },
      { id: "Energy API", x: 186, y: 302 },
      { id: "Aggressor", x: 544, y: 84, type: "aggressor" },
      { id: "Constitution", x: 494, y: 326, type: "constitution" }
    ],
    edges: [[0, 1], [1, 2], [2, 3], [0, 5], [5, 4], [4, 3], [0, 4], [1, 4], [2, 4], [6, 2], [6, 3], [4, 7]],
    safetySource: { x: 520, y: 326 },
    safetyNodes: [
      { id: "Safety Bridge", x: 628, y: 238, type: "bridge" },
      { id: "Satellite", x: 704, y: 104 },
      { id: "Insurer", x: 708, y: 238 },
      { id: "Audit", x: 704, y: 350 }
    ],
    safetyEdges: [[0, 1], [0, 2], [0, 3]]
  }
};

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function createSvg(tag, attributes = {}) {
  const element = document.createElementNS("http://www.w3.org/2000/svg", tag);
  Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value));
  return element;
}

function stopAuto() {
  state.auto = false;
  window.clearInterval(state.timer);
  const button = document.getElementById("autoButton");
  button.setAttribute("aria-pressed", "false");
  button.textContent = "自動実行";
}

function setMode(mode) {
  stopAuto();
  Object.assign(state, defaults[mode]);
  state.mode = mode;
  state.tick = 0;
  state.phase = "Normal Phase";
  state.logs = [];
  state.safetyEvent = null;
  state.bridgeRemaining = 0;
  state.captureRisk = 8;
  state.dangerousAccessRemoved = 0;
  state.outcome = "通常接続";
  document.querySelectorAll(".mode-switch button").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.mode === mode));
  });
  addLog("Normal Phase", mode === "home" ? "4つの家庭ノードを憲法層の内側で初期化しました。" : "小国メッシュを変更困難な主権保護ルールの内側で初期化しました。");
  update();
}

function syncControls() {
  controlIds.forEach((id) => {
    controls[id].value = state[id];
    labels[id].textContent = Math.round(state[id]);
  });
}

function safetyBridgeActive() {
  return Boolean(state.safetyEvent && !state.safetyEvent.resolved && state.bridgeRemaining > 0);
}

function computeCaptureRisk() {
  const sourceDependence = (100 - state.oracle) * 0.34;
  const mutableRights = (100 - state.constitution) * 0.42;
  const ttlExposure = safetyBridgeActive() ? Math.max(0, state.bridgeTtl - 5) * 2.2 : 0;
  const falseIntervention = state.safetyEvent?.groundTruth === false && state.safetyEvent.confirmed ? 28 : 0;
  return clamp(sourceDependence + mutableRights + ttlExposure + falseIntervention, 0, 100);
}

function computePhase() {
  const event = state.safetyEvent;
  if (event) {
    if (event.resolved) return event.finalPhase;
    if (event.confirmed && event.groundTruth) return "Safety Override";
    if (event.confirmed) return "False Intervention";
    if (state.bridgeRemaining <= 0) return "Review Required";
    return "Verification Phase";
  }
  const excess = state.pressure - state.threshold;
  if (excess < -15) return "Normal Phase";
  if (excess < 0) return "Friction Phase";
  if (excess < 18) return "Tripwire Phase";
  if (state.cooling + state.redundancy > state.strength + state.pressure * 0.6) return "Cooling Phase";
  return "Fragmentation Risk";
}

function progressSafetyEvent() {
  const event = state.safetyEvent;
  if (!event || event.resolved) return;
  event.age += 1;
  if (state.bridgeRemaining > 0) state.bridgeRemaining -= 1;

  const independenceGain = 4 + state.oracle / 11;
  const falseSignal = state.oracle >= 55 ? -independenceGain : (55 - state.oracle) * 0.9;
  event.confidence = clamp(event.confidence + (event.groundTruth ? independenceGain : falseSignal), 0, 100);
  if (event.confidence >= 72) event.confirmed = true;

  if (!event.groundTruth && event.confidence <= 24) {
    event.resolved = true;
    event.finalPhase = "Peaceful Closure";
    state.bridgeRemaining = 0;
    state.outcome = "誤報を棄却・報復禁止";
    state.trust = clamp(state.trust - 1, 0, 100);
    addLog("Peaceful Closure", "誤報を確認。通報者を処罰せず、監視権限とBridgeを失効させました。");
    return;
  }

  if (event.confirmed && !event.groundTruth && state.constitution < 55) {
    event.resolved = true;
    event.finalPhase = "Protocol Capture";
    state.bridgeRemaining = 0;
    state.outcome = "誤介入・憲法層が破断";
    state.trust = clamp(state.trust - 18, 0, 100);
    addLog("Protocol Capture", "独立性の低い観測が誤介入へ進みました。Revision権限の停止が必要です。");
    return;
  }

  if (event.confirmed && !event.groundTruth && state.bridgeRemaining <= 0) {
    event.resolved = true;
    event.finalPhase = "Constitutional Veto";
    state.outcome = "強い介入を拒否・再審査";
    addLog("Constitutional Veto", "証拠閾値は超えましたが、不可逆な介入を憲法層が拒否しました。");
    return;
  }

  if (event.confirmed && event.groundTruth) {
    state.dangerousAccessRemoved = clamp(state.dangerousAccessRemoved + state.strength / 18, 0, 100);
    state.pressure = clamp(state.pressure - state.strength / 16, 0, 100);
    state.trust = clamp(state.trust + state.redundancy / 60, 0, 100);
    state.outcome = "危険アクセスを限定停止";
    if (event.age >= 4 || state.bridgeRemaining <= 0) {
      event.resolved = true;
      state.bridgeRemaining = 0;
      const exitIsSafer = state.redundancy + state.constitution >= 145;
      event.finalPhase = exitIsSafer ? "Protected Exit" : "Limited Connection";
      state.outcome = exitIsSafer ? "保護された退出" : "長期限定接続";
      addLog(event.finalPhase, exitIsSafer ? "再接続を成功条件にせず、安全な退出と生活継続を選択しました。" : "全面再接続を避け、監督付きの限定接続へ移行しました。");
      return;
    }
  }

  if (state.bridgeRemaining <= 0 && !event.confirmed && !event.reviewLogged) {
    event.reviewLogged = true;
    state.outcome = "Bridge失効・再審査待ち";
    addLog("Review Required", "TTLが満了しました。外部メッシュの継続アクセスは自動更新されません。");
  }
}

function runStep(manual = true) {
  state.tick += 1;
  progressSafetyEvent();
  const noise = Math.sin(state.tick * 1.8) * 3 + (manual ? 1 : 0);
  const tripwireActive = state.pressure >= state.threshold;
  const pressureDecay = (state.cooling + state.redundancy * 0.35) / 28;
  state.pressure = clamp(state.pressure + noise - pressureDecay + (tripwireActive ? -state.strength / 35 : 1.3), 0, 100);

  const phase = computePhase();
  const safetyReduction = phase === "Safety Override" ? state.strength / 14 : 0;
  const conversion = phase === "Cooling Phase" ? state.cooling / 18 : phase === "Tripwire Phase" ? state.strength / 34 : safetyReduction;
  const entropyDrift = phase === "Normal Phase" ? -2.3 : phase === "Friction Phase" ? 2.1 : phase === "Tripwire Phase" ? 5.2 : -conversion;
  state.entropy = clamp(state.entropy + entropyDrift, 0, 100);

  const toxicRisk = Math.max(0, state.pressure - state.threshold) / 10;
  const overreach = ["Fragmentation Risk", "False Intervention", "Protocol Capture"].includes(phase) ? 8 : Math.max(0, state.strength - state.cooling - state.redundancy * 0.25) / 16;
  const apertureGain = ["Normal Phase", "Cooling Phase", "Protected Exit", "Peaceful Closure"].includes(phase) ? 1.2 : -0.5;
  state.trust = clamp(state.trust + apertureGain + state.redundancy / 90 - toxicRisk - overreach, 0, 100);
  const meshBonus = state.mode === "mesh" ? state.redundancy * 0.08 : state.cooling * 0.05;
  state.stability = clamp(100 - state.entropy * 0.44 - state.pressure * 0.2 + state.trust * 0.22 + meshBonus - overreach, 0, 100);
  state.captureRisk = computeCaptureRisk();

  const previous = state.phase;
  state.phase = phase;
  const alreadyLogged = ["Peaceful Closure", "Protected Exit", "Limited Connection", "Protocol Capture", "Review Required"].includes(phase);
  if (previous !== phase && !alreadyLogged) addLog(phase, messageForPhase(phase));
  update();
}

function injectEvent() {
  state.pressure = clamp(state.pressure + (state.mode === "home" ? 22 : 28), 0, 100);
  state.entropy = clamp(state.entropy + 9, 0, 100);
  addLog("Friction Event", "通常の契約摩擦です。Safety Bridgeは開かず、内部のTripwireとCoolingで処理します。");
  update();
}

function injectSafetyEvent(groundTruth) {
  const initialConfidence = clamp(42 + state.oracle * 0.12 + Math.sin(state.tick + 1) * 5, 20, 68);
  state.safetyEvent = { groundTruth, confidence: initialConfidence, age: 0, confirmed: false, resolved: false, finalPhase: null, reviewLogged: false };
  state.bridgeRemaining = state.bridgeTtl;
  state.pressure = clamp(state.pressure + (groundTruth ? 34 : 8), 0, 100);
  state.entropy = clamp(state.entropy + (groundTruth ? 18 : 5), 0, 100);
  state.outcome = "安全確認中";
  addLog("Protected Interrupt", groundTruth ? "重大SOSを受理。判決ではなく、目的・範囲・TTL付きの安全確認を開始しました。" : "誤報シナリオを投入。強い制裁を遅延し、独立した観測源で検証します。");
  update();
}

function messageForPhase(phase) {
  const messages = {
    "Normal Phase": "安全な接続オプションを維持。監視は境界値に限定されています。",
    "Friction Phase": "摩擦が蓄積。Monku Poolに低強度ログを退避します。",
    "Tripwire Phase": "閾値超過。裁定なしで危険な接続権を一時停止します。",
    "Cooling Phase": "ログをRevision案と安全な代替経路へ変換しています。",
    "Verification Phase": "独立した外部ノードが証拠を照合中。強い制裁は保留します。",
    "Safety Override": "危害を確認。人格ではなく危険なアクセス権を限定停止します。",
    "False Intervention": "誤った確認が強い介入へ進んでいます。憲法層の拒否が必要です。"
  };
  return messages[phase] || "応答が過剰です。外科的な接続遮断へ再設計が必要です。";
}

function addLog(title, body) {
  state.logs.unshift({ tick: state.tick, title, body });
  state.logs = state.logs.slice(0, 10);
}

function updateMetrics() {
  const scenario = scenarios[state.mode];
  document.getElementById("m1Label").textContent = scenario.m1;
  document.getElementById("m3Label").textContent = scenario.m3;
  document.getElementById("stability").textContent = `${Math.round(state.stability)}%`;
  document.getElementById("entropy").textContent = `${Math.round(state.entropy)}`;
  document.getElementById("trust").textContent = `${Math.round(state.trust)}%`;
  document.getElementById("captureRisk").textContent = `${Math.round(state.captureRisk)}%`;
  document.getElementById("phase").textContent = state.phase;
  document.getElementById("step").textContent = `step ${state.tick}`;

  const event = state.safetyEvent;
  document.getElementById("evidenceStatus").textContent = event ? `${Math.round(event.confidence)}% / ${event.confirmed ? "確認" : "照合中"}` : "待機中";
  document.getElementById("scopeStatus").textContent = safetyBridgeActive() ? "Safety checkのみ" : "閉鎖";
  document.getElementById("ttlStatus").textContent = `${state.bridgeRemaining} step / 手動再承認`;
  document.getElementById("outcomeStatus").textContent = state.outcome;
}

function edgeColor() {
  if (["Normal Phase", "Peaceful Closure"].includes(state.phase)) return "var(--green)";
  if (["Friction Phase", "Verification Phase", "Review Required"].includes(state.phase)) return "var(--gold)";
  if (["Tripwire Phase", "Fragmentation Risk", "Safety Override", "False Intervention", "Protocol Capture"].includes(state.phase)) return "var(--red)";
  return "var(--blue)";
}

function drawSafetyMesh(scenario, active, intensity) {
  const opacity = active ? 0.82 : 0.16;
  const dash = active ? "6 5" : "2 8";
  const bridge = scenario.safetyNodes[0];
  svg.appendChild(createSvg("line", { x1: 600, y1: 60, x2: 600, y2: 376, stroke: "var(--line)", "stroke-width": 1, "stroke-dasharray": "5 8" }));
  svg.appendChild(createSvg("line", { x1: scenario.safetySource.x, y1: scenario.safetySource.y, x2: bridge.x, y2: bridge.y, stroke: "var(--violet)", "stroke-width": active ? 4 : 2, "stroke-opacity": opacity, "stroke-dasharray": dash }));

  scenario.safetyEdges.forEach(([a, b]) => {
    const from = scenario.safetyNodes[a];
    const to = scenario.safetyNodes[b];
    svg.appendChild(createSvg("line", { x1: from.x, y1: from.y, x2: to.x, y2: to.y, stroke: "var(--violet)", "stroke-width": active ? 3 : 1.5, "stroke-opacity": opacity * (0.45 + state.oracle / 180), "stroke-dasharray": dash }));
  });

  const label = createSvg("text", { x: 680, y: 60, "text-anchor": "middle", "font-size": 12, "font-weight": 700, fill: "var(--violet)", "fill-opacity": active ? 0.95 : 0.38 });
  label.textContent = active ? `Safety Mesh: scoped / TTL ${state.bridgeRemaining}` : "Safety Mesh: standby";
  svg.appendChild(label);

  scenario.safetyNodes.forEach((node) => {
    svg.appendChild(createSvg("circle", { cx: node.x, cy: node.y, r: node.type === "bridge" ? 21 : 18, fill: "var(--violet)", "fill-opacity": active ? 0.76 : 0.18, stroke: "var(--surface)", "stroke-width": 4 }));
    if (active && node.type === "bridge") {
      svg.appendChild(createSvg("circle", { cx: node.x, cy: node.y, r: 34 + intensity * 14, fill: "none", stroke: "var(--violet)", "stroke-width": 2, "stroke-opacity": 0.34 }));
    }
    const text = createSvg("text", { x: node.x, y: node.y + (node.type === "bridge" ? 40 : 34), "text-anchor": "middle", "font-size": 11, "font-weight": 700, fill: "var(--ink)", "fill-opacity": active ? 0.9 : 0.42 });
    text.textContent = node.id;
    svg.appendChild(text);
  });
}

function drawNetwork() {
  const scenario = scenarios[state.mode];
  const intensity = clamp(state.pressure / 100, 0.08, 1);
  const activeColor = edgeColor();
  const bridgeActive = safetyBridgeActive();
  svg.replaceChildren();

  scenario.edges.forEach(([a, b], index) => {
    const from = scenario.nodes[a];
    const to = scenario.nodes[b];
    const stopped = ["Tripwire Phase", "Safety Override", "Limited Connection", "Protected Exit"].includes(state.phase) && index % 3 === 0;
    svg.appendChild(createSvg("line", {
      x1: from.x, y1: from.y, x2: to.x, y2: to.y,
      stroke: activeColor,
      "stroke-width": stopped ? 4 : 2,
      "stroke-opacity": stopped ? 0.22 : 0.28 + intensity * 0.42,
      "stroke-dasharray": stopped || ["Cooling Phase", "Limited Connection", "Protected Exit"].includes(state.phase) ? "8 8" : "0"
    }));
  });

  drawSafetyMesh(scenario, bridgeActive, intensity);

  scenario.nodes.forEach((node, index) => {
    const nodeColor = node.type === "aggressor" ? "var(--red)" : node.type === "constitution" ? "var(--ink)" : node.type === "pool" ? "var(--violet)" : index % 2 ? "var(--blue)" : "var(--green)";
    const radius = node.type === "aggressor" ? 31 : node.type === "constitution" ? 25 : 28;
    if (node.type === "constitution" && state.constitution >= 70) {
      svg.appendChild(createSvg("circle", { cx: node.x, cy: node.y, r: radius + 11, fill: "none", stroke: "var(--ink)", "stroke-width": 2, "stroke-opacity": 0.28 }));
    }
    svg.appendChild(createSvg("circle", { cx: node.x, cy: node.y, r: radius, fill: nodeColor, "fill-opacity": 0.84, stroke: "var(--surface)", "stroke-width": 5 }));
    svg.appendChild(createSvg("circle", { cx: node.x, cy: node.y, r: 8 + intensity * 5, fill: "var(--surface)", "fill-opacity": 0.72 }));
    const text = createSvg("text", { x: node.x, y: node.y + 50, "text-anchor": "middle", "font-size": 13, "font-weight": 700, fill: "var(--ink)" });
    text.textContent = node.id;
    svg.appendChild(text);
  });

  const summary = createSvg("text", { x: 22, y: 34, "font-size": 13, fill: "var(--muted)" });
  summary.textContent = `pressure ${Math.round(state.pressure)} / threshold ${Math.round(state.threshold)} / oracle ${Math.round(state.oracle)} / constitution ${Math.round(state.constitution)}`;
  svg.appendChild(summary);
}

function renderLog() {
  log.replaceChildren();
  state.logs.forEach((entry) => {
    const row = document.createElement("div");
    row.className = "log-entry";
    const time = document.createElement("time");
    time.textContent = `t+${entry.tick}`;
    const body = document.createElement("div");
    const title = document.createElement("strong");
    title.textContent = entry.title;
    body.append(title, document.createElement("br"), document.createTextNode(entry.body));
    row.append(time, body);
    log.appendChild(row);
  });
}

function update() {
  state.phase = computePhase();
  state.captureRisk = computeCaptureRisk();
  syncControls();
  updateMetrics();
  drawNetwork();
  renderLog();
}

controlIds.forEach((id) => {
  controls[id].addEventListener("input", (event) => {
    state[id] = Number(event.target.value);
    update();
  });
});
document.querySelectorAll(".mode-switch button").forEach((button) => button.addEventListener("click", () => setMode(button.dataset.mode)));
document.getElementById("stepButton").addEventListener("click", () => runStep(true));
document.getElementById("eventButton").addEventListener("click", injectEvent);
document.getElementById("safetyButton").addEventListener("click", () => injectSafetyEvent(true));
document.getElementById("falseReportButton").addEventListener("click", () => injectSafetyEvent(false));
document.getElementById("resetButton").addEventListener("click", () => setMode(state.mode));
document.getElementById("autoButton").addEventListener("click", (event) => {
  state.auto = !state.auto;
  event.currentTarget.setAttribute("aria-pressed", String(state.auto));
  event.currentTarget.textContent = state.auto ? "停止" : "自動実行";
  if (state.auto) state.timer = window.setInterval(() => runStep(false), 900);
  else window.clearInterval(state.timer);
});

addLog("Normal Phase", "4ノードを初期化。RevisionはConstitutionを越えて基本権を縮小できません。");
update();
