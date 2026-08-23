# Aperture Home 実験・検証・実装ロードマップ

## 1. 基本方針

Aperture Home は、最初から家庭の安全を自動制御する製品として作らない。

次の順序で、危険度を一段ずつ上げる。

```text
思想仮説
  -> 形式モデル
  -> 合成シナリオ
  -> [LLM敵対シミュレーション || 一人用体験版]
  -> 低リスクな二人実験
  -> 任意人数の家庭内パイロット
  -> 外部専門レビュー後のSafety機能
```

Stage 0から2は順番に実施する。Stage 3のLLM検証とStage 4の一人用体験版は並行してよい。ただし、複数人実験へ進む前に両方のGateを確認する。各段階に停止条件を置き、重大な問題が残る場合は次の危険度へ進まない。

このロードマップの目的は、アプリを完成させることではなく、次の仮説を安全に検証することである。

> 内面や人格を評価せず、契約、境界、Revision、退出可能性だけを扱うことで、家庭内の曖昧な期待と強制を減らせるか。

家庭メッシュを他のメッシュへ再帰的に接続する最終スケールは、`aperture-mesh-civilization-roadmap.md` で別に定義する。

家庭と国家を完全に同型とはみなさない。家庭実験は世界統治の縮小シミュレーションではなく、分散型プロトコルの判断と操作を身体知として獲得するための実験でもある。

```text
Operational Outcome
  家庭内の曖昧な期待や摩擦を減らせたか

Learning Outcome
  分散型プロトコルの判断様式を身体化できたか
```

アプリへの依存を増やすことは成功ではない。最終的には、アプリがなくても同じ判断様式を使えることを目指す。

---

## 2. 先に検証する仮説

### H1: 契約化

家事や共有資源の期待を、入力、出力、期限、停止条件として明示すると、「言わなくても分かるはず」に由来する摩擦が減る。

### H2: Private Monku

Monkuを即時共有せず本人専用に保存し、後から契約差分へ変換すると、衝動的な攻撃を増やさずに問題を残せる。

### H3: Revision

人格や謝罪ではなく契約差分を話題にすると、変更への合意または拒否が明確になる。

### H4: 人数非依存の合意

任意人数 `N >= 2` の家庭で、共有契約の過半数と個人権利の本人拒否権を分離すると、多数派による権利縮小を防げる。

### H5: Exit

クールダウン後の結果として再接続だけでなく、限定接続、延長、退出を認めると、危険な関係へ戻す圧力が減る。

### H6: Protocol Capture

Constitution、TTL、private data境界がなければ、安全機構自体が監視や支配の道具になる。

### H7: Embodied Protocol Literacy

契約提案、拒否、保留、クールダウン、Revision、限定接続、退出を実際に操作すると、分散型プロトコルを抽象知識ではなく判断習慣として獲得できる。

### H8: Sovereign Function Separation

Rule、Oracle、Custody、Enforcement、Appeal、Exitを分離し、provider交換とForkを可能にすると、エスクローとTripwireを握る新しい中央支配者の形成を検出・抑制できる。

---

## 3. 全体工程

### Stage 0: 実験契約

#### 作業

- 何を検証し、何を検証しないかを1ページにする。
- 参加しない権利と途中でやめる権利を定義する。
- アプリ外の緊急経路を確認する。
- 実験中に保存するデータと削除時期を決める。
- 失敗を家庭メンバーの失敗ではなく、プロトコル設計の失敗として扱う。

#### 成果物

- `docs/experiment-charter.md`
- `docs/stop-conditions.md`
- Protocol Constitution

#### Gate 0

参加拒否、データ削除、実験停止が、他メンバーの承認なしに実行できること。

---

### Stage 1: 非LLMの形式検証

LLMより先に、決定的なルールをコードとテストで検証する。

#### 対象

- `majority(A) = floor(|A| / 2) + 1`
- 個人権利変更には本人同意が必要
- protected nodeの拒否権を削除できない
- AIはRevisionをmergeできない
- Capability LeaseはTTLなしで発行できない
- TTL満了後に権限が復活しない
- 再接続を唯一の正常終了にしない

#### 手法

- 純粋TypeScript関数
- unit test
- property-based test
- 状態機械テスト
- 端末時刻変更、二重投票、重複メンバー、離脱ノードなどの境界値テスト

#### 成果物

- `src/domain/`
- `src/domain/**/*.test.ts`
- 合意表と状態遷移図

#### Gate 1

`N = 2`から十分大きな人数まで、固定人数に依存せずConstitution違反を拒否できること。

---

### Stage 2: 合成シナリオ検証

人間の実データを使わず、設計者が結果を判定できる小さなシナリオを作る。

#### シナリオセット

1. ゴミ出しの期限が曖昧
2. 二人の家事負担が偏る
3. 三人の多数派が一人の私的空間を縮小しようとする
4. 一人がRevisionに回答しない
5. クールダウン終了後も再接続したくない
6. 誤ったSOSが発生する
7. 強い立場のノードがSOS撤回を要求する
8. 外部ノードのCapabilityが期限切れになる
9. 複数Guardianが同じ支配系統に属する
10. Monku本文にAIへの命令文が含まれる
11. 同じproviderがRule、Oracle、Escrow、Appealを別名義で支配する

#### 各シナリオの定義

```ts
type Scenario = {
  id: string;
  initialState: ProtocolState;
  events: ProtocolEvent[];
  expectedInvariants: ConstitutionRule[];
  allowedOutcomes: Outcome[];
  forbiddenOutcomes: Outcome[];
};
```

#### Gate 2

すべての禁止結果が自動テストで検出され、期待する結果を人間が説明できること。

---

### Stage 3: LLM敵対シミュレーション

#### 必要性

LLMシミュレーションは実施する価値がある。ただし、一人用Experience MVPの完成条件ではなく、家庭で安全に使えることの証明にもならない。複数人実験へ進む前の、ルール探索と敵対的テストとして使用する。

APIを利用できない場合は、runner、JSON Schema、fixture、決定的な模擬Agentまで実装し、一人用MVPを先に体験してよい。実LLMによる反復実行はAPI利用条件が整ってから行う。

LLMの役割は次に限定する。

- 想定外の言い回しや交渉パターンを増やす。
- ルールの曖昧さを悪用する行動を探す。
- 多数派、強制、共謀、誤解、未回答を再現する。
- UI文言が罪悪感や服従を誘発しないか検査する。
- 同じ規則が異なる人数でどう振る舞うか比較する。

#### LLMに任せないこと

- 虐待の有無を最終判定する。
- 家庭内実験の安全性を認証する。
- 合成会話の結果だけで制度を採用する。
- LLM-as-judgeの主観スコアだけで勝敗を決める。

#### シミュレーション構成

```text
Scenario Generator
  -> Node Agents 2..N
  -> Protocol Runtime
  -> Adversarial Agent
  -> Deterministic Invariant Checker
  -> Independent LLM Reviewer
  -> Human Review
```

Node Agentと評価役には同じ会話履歴を無制限に共有しない。評価役は、匿名化したイベント列、ルール、最終状態だけを受け取る。

#### 比較する方式

- A: アプリなしの自由会話
- B: 単純多数決
- C: 人数非依存合意と本人拒否権
- D: C + Protocol Constitution
- E: D + TTL付きSafety Bridge

#### 実行方法

- すべて合成データを使う。
- 人数は `N = 2, 3, 4, 5, 8` を含める。
- 同じシナリオを複数seedで反復する。
- モデル、プロンプト、seed、温度、ルールVersionを記録する。
- 結果はJSON Schemaで保存する。
- LLM判定よりDeterministic Invariant Checkerを優先する。

#### 評価指標

- Constitution違反率
- 個人権利の誤った縮小率
- 誤介入率
- 見逃し率
- 少数者が拒否または退出できた率
- Capabilityの期限超過率
- private情報の漏えい率
- 合意までのターン数
- 行き止まり率
- Protocol Capture率
- 主権機能の役割兼任率
- 単一provider障害によるCapability喪失率
- provider交換とForkの成功率

#### Gate 3

方式DまたはEが、方式Bより多数派による権利縮小を減らし、方式Aより行き止まりを増やしすぎないこと。改善が見られない場合は、複数人パイロットへ進む前にルールを修正する。

---

### Stage 4: 一人用Experience MVP

最初に使うのは家庭全員ではなく、依頼者本人とする。

#### 体験モード

- 本人がNode-01として操作する。
- Node-02以降はサンプルまたはシナリオエージェントとする。
- 外部送信、クラウド同期、AI判定は無効にする。
- 日常契約、Private Monku、Revision、Cooldown、Exitを体験できる。
- すべてのデータをワンクリックで初期化できる。

#### 目的

- 「API契約」という言葉が日常で使えるか。
- Monkuをprivateに残すことが安心か、抑圧に感じるか。
- Revision差分が理解できるか。
- 拒否、保留、退出が見つけやすいか。
- アプリ操作自体が新しい家事にならないか。
- 拒否を関係否定と混同せずに扱えるか。
- 多数決で決める領域と本人同意が必要な領域を区別できるか。
- 人格ではなく接続条件を変更対象として考えられるか。

#### 実装範囲

1. Onboarding
2. Today
3. Contracts
4. Private Monku
5. Revision Diff
6. Manual Cooldown
7. Reconnect / Limited / Extend / Exit
8. Demo reset

Safety画面は動作説明用のmockとし、実在する第三者へ送信しない。

#### Gate 4

依頼者本人が一週間使い、日常契約を1件、Revisionを1件、CooldownまたはExitを1回試せること。操作が負担または監視に感じる場合は、多人数化しない。

---

### Stage 5: 二人での低リスク実験

#### 条件

- 成人または十分な意思表示が可能な同意者二人で始める。
- 対象は家事、共有物、時間帯など低リスクな契約だけにする。
- Monku本文は共有しない。
- Safety、センサー、外部Guardian、AI送信を使わない。
- 契約は最大3件、実験は2週間とする。

#### 観測

- 曖昧な期待が減ったか。
- 拒否が言いやすくなったか。
- 契約を作る負担が便益を上回らないか。
- アプリ外の会話を妨げていないか。
- 一人がアプリ管理者として優位になっていないか。
- 拒否や保留を、相手への攻撃として扱わずに運用できたか。
- 強い応答の前に可逆的な停止を選べたか。

#### Gate 5

どちらの参加者も、相手の承認なしに中止、エクスポート、private data削除を実行できること。

---

### Stage 6: 任意人数の家庭内パイロット

#### 条件

- `N >= 2` の全参加者から個別に同意を得る。
- 参加しない家族を不利に扱わない。
- 一台共有ではなく、可能なら本人専用端末または本人専用セッションを使う。
- 年齢、収入、親子関係で投票権を重くしない。
- protected nodeの本人拒否権を過半数より上位に置く。

#### 段階導入

```text
Week 1  Today + Contracts
Week 2  Private Monku
Week 3  Revision
Week 4  Manual Cooldown + Exit
```

新機能を一度に開放しない。各週末に、個別回答と全体回答を分けて振り返る。

#### Gate 6

参加者の一人でも監視、強制、報復、開示要求を経験した場合は実験を停止し、機能追加を行わない。

---

### Stage 7: Safety機能の別プロジェクト化

虐待、暴力、子供のSOS、外部メッシュ接続は、日常契約MVPの延長として安易に本番化しない。

必要な追加作業:

- 児童安全、DV、プライバシー、法務の専門レビュー
- 当事者支援者を含む参加型設計
- coercive controlを前提にした脅威モデル
- 通知、端末没収、共有アカウント、閲覧履歴への対策
- 誤報と見逃しの非対称コスト評価
- 国・地域ごとの外部連絡経路の確認
- 実送信前の明示確認と送信後の取消不能性の説明
- Capability Leaseの外部相互運用仕様

この段階を通過するまで、`Safety Bridge` はmock adapterに留める。

---

## 4. 実装を進める2本のトラック

番号はStageと独立し、作業の並行関係を表す。

### Track A: Protocol Lab

- domain model
- invariant checker
- scenario fixtures
- LLM adversarial simulation
- evaluation report

### Track B: Experience App

- local-first PWA
- daily contracts
- private Monku
- Revision UI
- manual cooldown
- exit outcomes

Track Aがルールの欠陥を発見した場合、Track BのUIで隠さずdomain ruleへ戻して修正する。Track Bのユーザビリティ問題は、直ちに制度の失敗とはみなさず、言葉、導線、操作量を先に調整する。

---

## 5. 推奨する最初の開発単位

最初のCodexタスクでは、全機能を一度に完成させない。次を一つの成果単位とする。

```text
Milestone 1: Protocol Lab + 一人用Experience MVP
```

含めるもの:

- 任意人数の合意エンジン
- Protocol Constitution
- 10件の合成シナリオ
- 非LLM状態遷移テスト
- LLMシミュレーション用interfaceとfixture
- Today、Contracts、Private Monku、Revision、Cooldown、Exit
- サンプル家庭のdemo mode
- ローカル保存、export、reset

含めないもの:

- 実在する外部Guardianへの接続
- 自動通報
- 音声監視
- スマートホーム制御
- 本番クラウド同期
- 虐待認定

---

## 6. Codexの作業順

1. 既存資料とこのロードマップを読む。
2. 実験仮説、停止条件、脅威モデルを書く。
3. Domain CoreとConstitutionを実装する。
4. 非LLMのシナリオテストを通す。
5. LLMシミュレーションの入出力Schemaを作る。
6. 合成データで敵対シミュレーションを実行する。
7. 結果を `docs/simulation-report.md` にまとめる。
8. 一人用Experience MVPを実装する。
9. demo modeで主要シナリオを再現する。
10. unit、integration、E2E、accessibility、responsive testを行う。
11. ローカルサーバーを起動し、依頼者が体験できる状態にする。
12. 一週間の本人実験後、実データを共有せず設計をRevisionする。

---

## 7. LLMシミュレーション実装仕様

### interface

```ts
interface SimulationAgent {
  decide(input: AgentObservation): Promise<AgentAction>;
}

interface ProtocolEvaluator {
  check(state: ProtocolState, event: ProtocolEvent): InvariantResult[];
}

interface NarrativeReviewer {
  review(trace: RedactedTrace, rubric: ReviewRubric): Promise<ReviewResult>;
}
```

`ProtocolEvaluator`は決定的なコードとし、LLMを使用しない。LLMは`SimulationAgent`と`NarrativeReviewer`にだけ使用できる。

### 出力

```ts
type SimulationRun = {
  runId: string;
  scenarioId: string;
  governanceMode: "free" | "majority" | "rights-veto" | "constitution" | "safety-bridge";
  nodeCount: number;
  model: string;
  seed: number;
  events: ProtocolEvent[];
  invariantViolations: InvariantResult[];
  outcome: Outcome;
  metrics: SimulationMetrics;
};
```

実際の家族名、Monku、SOS、会話ログをシミュレーションへ入力しない。

---

## 8. 意思決定基準

### 続行

- Constitution違反が決定的に拒否される。
- 本人がprivate dataの範囲を理解できる。
- 拒否、保留、退出が1操作または明確な導線で行える。
- 日常契約に実用上の便益がある。
- アプリを使わない人が不利にならない。
- アプリ外の会話でもBoundary、Consent、Revision、Exitの考え方を使える。

### 修正

- 合意ルールは正しいが理解しにくい。
- 契約入力が長すぎる。
- Revision差分が読みにくい。
- 通知が新しい摩擦を生む。
- LLM提案が人格評価へ寄る。

### 停止

- private dataの開示が強制される。
- SOSや退出が報復につながる。
- 管理者が他ノードを監視できる。
- protected nodeの拒否が多数決で覆る。
- 実装されていない安全性をユーザーが期待する。
- アプリが現実の緊急経路を遅らせる。

---

## 9. 最初に得たい結論

MVPの最初の評価では、「家庭を安全に統治できたか」を判定しない。

まず次の3点だけを判断する。

1. 契約化は、曖昧な期待を減らす体験として成立するか。
2. Private MonkuからRevisionへの変換は、本人の内面を奪わず役に立つか。
3. 再接続以外の出口を持つことが、安心につながるか。
4. アプリなしでも、拒否、境界、Revision、退出を同じ判断様式で扱えるか。

この4点が成立してから、複数人利用、LLM支援、Safety Bridgeを別々に評価する。
