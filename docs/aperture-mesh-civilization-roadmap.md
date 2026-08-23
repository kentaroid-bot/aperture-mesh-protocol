# Aperture Mesh Civilization Roadmap

## 1. この文書の位置づけ

この文書は、家庭から始まる分散型プロトコルを、組織、地域、都市、国家、国際社会へ再帰的に拡張し、中央集権的な単一法体系に依存しない意思決定ネットワークへ育てる長期ロードマップである。

家庭用 `Aperture Home` の実験・実装計画とは分離する。

- `aperture-home-experiment-roadmap.md`: 一人と家庭で安全に検証する工程
- `aperture-home-codex-implementation-plan.md`: 家庭用MVPの実装指示
- `p2p-aperture-simulation-design.md`: 共通プロトコルの設計原理
- `aperture-mesh-civilization-roadmap.md`: Mesh of Meshesへ拡張する長期構想

家庭MVPは世界統治を直接実装するものではない。家庭で検証するのは、より大きなメッシュでも再利用できる最小原理である。

### 家庭実験の意味

家庭と国家を完全に同型とはみなさない。家庭には養育、依存、愛着、身体的近接があり、国家には領域、徴税、軍事、人口規模がある。具体的な契約、合意方式、執行手段はスケールごとに設計し直す。

家庭実験の目的は、国家や世界統治を小さく再現することではない。

> Aperture Homeは世界統治の縮小模型ではない。異なる内部OSを持つノード同士が、支配せずに接続する作法を身体で学ぶ、最小のプロトコル環境である。

家庭で反復するのは、特定の制度ではなく、次の操作の型である。

```text
Node Sovereignty
Boundary Recognition
Affected-Node Consent
Rights Before Majority
Scoped Capability
Reversible Tripwire
Revision
Exit / Fork
Protocol Capture Audit
```

この操作の型を日常の経験として身体化することを `Embodied Protocol Literacy` と呼ぶ。

家庭で獲得したProtocol Literacyが、そのまま国家制度になるわけではない。異なるスケールの制度を設計、評価、参加するときに、中央へすべてを委ねず、接続条件、拒否権、権限範囲、退出可能性を考えるための認知基盤になる。

---

## 2. 最終ビジョン

個人は家庭メッシュのノードとして接続できる。家庭メッシュは、内部の個人情報や意思決定を公開せず、一つの限定されたノードとして地域メッシュへ接続できる。

地域メッシュは都市メッシュのノードとなり、都市、協同組合、企業、学校、病院、国家、インフラなどが、目的ごとに異なるメッシュを形成する。それらのメッシュが相互運用可能なAPI契約で接続される。

```text
Person Nodes
    -> Household Mesh
        -> Neighborhood / Cooperative Mesh
            -> City / Functional Mesh
                -> Regional Mesh
                    -> Sovereignty Mesh
                        -> Planetary Inter-Mesh Network
```

小さなメッシュは大きなメッシュへ吸収されない。大きなメッシュに対して、一つの主権的なSupernodeとして振る舞う。

最終状態は一つの「世界メッシュ」ではない。互いに重なり、接続し、離脱し、再編できる複数メッシュの生態系である。

---

## 3. 中央法に依存しないことの意味

中央集権的な法に依存しないことは、無法状態や強者支配を意味しない。

単一の主権者が全ノードの内部規範を定義する代わりに、次の組み合わせで秩序を形成する。

- 各メッシュのLocal Constitution
- メッシュ間のInterface Contract
- 検証可能な入力と出力
- Capability単位の限定権限
- 複数の独立Oracle
- 事前合意されたTripwire
- 可逆的な接続停止
- RevisionとVersion交渉
- Fork、Exit、代替経路
- 相互監査とProtocol Capture検知

したがって、法が消えるのではなく、法の機能が次へ分解される。

```text
単一の中央法
  -> Local Constitution
  + Inter-Mesh Contract
  + Verification Protocol
  + Reversible Enforcement
  + Conflict-of-Protocol Rules
```

### Trust Minimizationと限定エスクロー

分散型プロトコルの目的は、信頼を消すことではなく、信頼を接続の必須条件から外すことである。

> お互いを信頼し、愛し、同じ道徳を共有しなくても、検証可能な境界、限定された担保、可逆的なTripwire、安全な退出経路があれば、互いの内部主権を同一化せずに協力できる。

短く表現すれば、`信頼を要求せず、裏切りの被害を限定する` ことである。

ただし、エスクローと自動執行だけでは公平性を保証しない。自動化は入力された判断を高速に実行するが、その判断を正当化しない。

次の条件を一組として扱う。

```text
Trust Minimization
+ Verifiable Boundaries
+ Limited Escrow
+ Independent Oracles
+ Reversible Tripwires
+ Protocol Constitution
+ Safe Exit
+ Alternative Routes
+ Continuous Revision
```

担保は、失ってもNodeの生存と基本権を破壊しない資産またはCapabilityに限定する。食料、住居、医療、教育、基礎通信、SOS、安全な退出経路を担保化しない。

また、形式的な退出権だけでは不十分である。退出後も生存、通信、取引、移動を継続できる代替経路を、プロトコルの外部条件として育てる必要がある。

### 革命の定義

Apertureにおける革命は、中央主体を削除して没収と遮断を自動化することではない。

> 中央が独占してきた、ルールを作る力、事実を認定する力、資産を預かる力、接続を止める力、誤りを訂正する力、退出先を支配する力を分離し、どの主体もそれらを再統合できない状態を作ることである。

```text
Aperture Revolution
  = Distributed Rule-making
  + Independent Oracles
  + Limited / Non-custodial Escrow
  + Reversible Tripwires
  + Independent Appeal
  + Real Exit Alternatives
  + Forkable Protocol
  + Continuous Capture Audit
```

エスクローとTripwireは、従属していた主体へ拒否、交渉、退出の実効的なカードを配る触媒である。しかし、その管理権が別の単一主体へ移るだけなら、革命ではなく支配者の交代である。

#### 再集中を防ぐ条件

1. **Role Separation**
   Rule-maker、Oracle、Escrow、Tripwire Executor、Appeal、Identity Providerを論理的・運用的に分離する。

2. **No Unilateral Critical Path**
   一主体の判断、署名、障害だけで、資産没収、永久遮断、基本権変更を実行できない。

3. **Provider Substitutability**
   Oracle、Escrow、仲裁、Identity、AIを複数実装から選択でき、契約Versionを維持したまま交換できる。

4. **Minimal Custody**
   預託量、期間、対象を取引に必要な最小限へ限定する。可能な場合は非カストディアルまたは複数署名を使う。

5. **Scoped and Expiring Authority**
   すべての強い権限へscope、purpose、ttl、review、appealを付け、緊急権限を自動失効させる。

6. **Forkability and Version Pluralism**
   Protocol、client、contract schemaをForkできる。単一の標準Versionへの参加を生存条件にしない。

7. **Independent Appeal**
   執行主体と異なる経路から、停止、証拠確認、補償、Revisionを要求できる。

8. **Real Exit Infrastructure**
   Exit後に使える通信、決済、物流、住居、安全経路を複数確保する。形式上の退出ボタンだけでは条件を満たさない。

9. **Open Verification**
   契約、状態遷移、権限構成、監査証明を検証可能にする。ただし、private dataや内部OSの公開は要求しない。

10. **Capture Thresholds**
    役割兼任率、Oracle相関、資産集中、単一provider依存、期限超過を測定し、閾値超過時に新規Capability発行を停止する。

#### 禁止する役割集中

```text
Rule-maker + Final Oracle + Executor
Custodian + Sole Appeal
Identity Provider + Universal Transaction Gate
Guardian + Permanent Monitor + Revision Merger
AI Proposer + AI Judge + AI Executor
```

一組織が複数の実装を別ブランドで提供しても、資本、指揮系統、データ、障害ドメインが同じなら独立とは数えない。

#### 革命の判定

次の問いのいずれかに「いいえ」と答える場合、ノード化は未完成である。

- Nodeは特定providerの許可なしに契約を終了できるか。
- 誤作動時に執行者と異なる異議経路を使えるか。
- Oracle、Escrow、Identityを交換できるか。
- Forkしても生活と取引を継続できるか。
- 強い権限は期限切れになるか。
- 小さなMeshは内部OSを公開せずに接続できるか。
- Protocol Captureを外部から検証できるか。

したがってApertureの革命性は、中央をなくしたことではなく、中央が再発生しても検出、拒否、交換、退出できることにある。

---

## 4. 再帰的なMeshモデル

### Node

個人、家庭、組織、都市、国家など、内部状態を持ち、外部へ限定APIを公開する主体。

### Mesh

複数Nodeが、共通の目的、契約、合意方式、監査方法によって形成する接続領域。

### Supernode

内部では複数NodeからなるMeshだが、外部メッシュに対しては一つのNodeとして振る舞う主体。

```text
External Mesh sees:

HouseholdMesh {
  publicCapabilities
  contractVersion
  consentProof
  boundaryConditions
  auditCommitment
}

External Mesh cannot see:

memberThoughts
privateMonku
internalVotesUnlessDisclosureRequired
internalRelationships
unrelatedActivity
```

この入れ子構造を、家庭、地域、都市、国家の各段階で繰り返す。

---

## 5. 全スケールで維持するProtocol Constitution

規模が変わっても、次の原則を不変条件として維持する。

```text
G-01 Subsidiarity
     下位メッシュで解決できることを上位メッシュが奪わない

G-02 Internal OS Sovereignty
     接続条件に不要な内部思想、文化、家族規範、政治体制を書き換えない

G-03 Non-Domination
     資源、規模、接続数を他ノードの恒久支配権へ変換できない

G-04 Right to Exit and Fork
     安全な退出、契約終了、プロトコル分岐を犯罪化しない

G-05 Rights Before Majority
     多数決で少数ノードの基本的安全と退出権を削除しない

G-06 Capability Limitation
     権限にはscope、purpose、ttl、review、appealを必要とする

G-07 No Permanent Guardian
     Guardian機能を単一主体の恒久的主権へ変換しない

G-08 Evidence Independence
     情報源の数と実効独立性を区別する

G-09 Reversible First Response
     最初の応答は停止、凍結、迂回など可逆的なものを優先する

G-10 Protocol Auditability
     プロトコル自身の権力集中、共謀、期限超過を監査可能にする

G-11 Interoperability Without Assimilation
     接続のために内部制度の同一化を要求しない

G-12 Safe Non-Participation
     参加しないノードを生存不能にする独占メッシュを作らない

G-13 Essential Needs Are Not Collateral
     食料、住居、医療、教育、基礎通信、SOS、退出経路を担保化しない

G-14 Automation Is Not Legitimacy
     自動執行されたこと自体を公平性、真実、正当性の証明とみなさない

G-15 No Recomposition of Sovereign Functions
     Rule、Oracle、Custody、Enforcement、Appeal、Exitを一主体へ再統合しない

G-16 Replaceability and Forkability
     基幹providerとProtocol Versionを交換・Forkできない接続を恒久依存にしない
```

---

## 6. 意思決定の基本フロー

メッシュ規模にかかわらず、変更は次の順序で扱う。

```text
Proposal
  -> Impact Set Calculation
  -> Constitution Check
  -> Affected Node Consent
  -> Safety Veto Check
  -> Capability and TTL Assignment
  -> Version Activation
  -> Outcome Audit
  -> Revision / Exit / Fork
```

### Proposal

Node、AI、監査機関、別メッシュが変更案を提出できる。AIはDraftを作れるが採用できない。

### Impact Set

変更の影響を直接受けるノード集合を計算する。全体投票が必要とは限らず、逆に全体多数決だけで当事者権利を変更できない。

### Consent

資源配分には人数またはステークを用いた合意を使えるが、基本権と主権境界には本人または当該メッシュの拒否権を残す。

### Version Activation

契約を上書きせず、新Versionとして発効する。互換性がないノードには、旧Version継続、変換Gateway、限定接続、Exitを用意する。

---

## 7. スケール別ロードマップ

### Scale 0: Protocol Lab

対象:

- 合意式
- Constitution
- Revision
- Tripwire
- Capability Lease
- Oracle独立性
- ExitとFork

検証:

- 形式検証
- property-based test
- agent-based simulation
- LLM敵対シミュレーション

Gate:

固定人数や単一管理者に依存せず、権利侵害、期限超過、Protocol Captureを検出できること。

### Scale 1: Individual and Household Mesh

対象:

- 日常契約
- Private Monku
- Revision
- Manual Cooldown
- Reconnect / Limited / Extend / Exit

Gate:

参加しない家族を不利にせず、本人データと退出権を守ったまま低リスク契約を運用できること。

### Scale 2: Inter-Household Mesh

例:

- 近隣の共同購入
- 子育て協力
- 共有設備
- 地域の移動支援
- 小規模な相互扶助

追加要件:

- 家庭内部を公開しないSupernode identity
- 家庭ごとの代表権限と失効
- 家庭間Contract
- 共同資源からの安全な退出
- 家庭メッシュ間の紛争Protocol

Gate:

一家庭が他家庭の内部規範や個人情報を支配せず、共有資源を共同運用できること。

### Scale 3: Cooperative and Functional Mesh

例:

- 学校
- 医療
- 食料
- エネルギー
- 物流
- 地域通貨
- 協同組合

特徴:

一人または一家庭は、目的ごとに異なるMeshへ同時参加できる。居住地、勤務先、医療、教育が一つの中央IDと支配系統に統合されないようにする。

追加要件:

- 目的別identityとcredential
- selective disclosure
- zero-knowledge proofを含む最小証明
- 複数Mesh間の利益相反管理
- サービス停止時の代替経路
- 参加しない人への最低限アクセス

Gate:

一つのFunctional Meshから排除されても、生活全体が停止しないこと。

### Scale 4: City and Regional Mesh

対象:

- インフラ調整
- 災害対応
- 土地と移動
- 地域間資源交換
- 公共財の共同調達

追加要件:

- Mesh Directory
- Contract discovery
- protocol translation gateway
- 公共財の負担計算
- minority mesh protection
- emergency capabilityの厳格なTTL
- 市民によるProtocol Capture監査

Gate:

緊急権限が恒久権力へ変わらず、地域内の異なるメッシュが同一文化や同一制度へ吸収されないこと。

### Scale 5: Sovereignty Mesh

対象:

- 小国
- 都市国家
- 自治地域
- 港湾
- エネルギー網
- 決済網
- 保険、エスクロー、通信

追加要件:

- 国境・物流・決済の機械可読Contract
- 侵略、封鎖、サイバー攻撃のMulti-Oracle
- 自動エスクローと供給迂回
- 誤検知時の可逆的停止
- 小国が大国へ単独依存しないMesh redundancy
- 難民、外部被害、越境汚染を扱うExternality API

Gate:

中央Guardianを置かずに境界侵害への応答を開始でき、誤検知時には全面破壊へ進まず復旧できること。

### Scale 6: Planetary Inter-Mesh Network

対象:

- 気候
- 海洋
- 宇宙
- パンデミック
- AIと計算資源
- 大量破壊兵器
- 国境を越える金融・情報・環境外部性

最終構造:

- 単一の世界政府を置かない。
- 単一の世界法を全内部OSへ強制しない。
- 外部性ごとに目的限定Meshを構成する。
- 各Meshは別MeshへSupernodeとして接続する。
- 複数のOracle、保険、エスクロー、供給網が相互Tripwireを形成する。
- 危険なMeshからのExitとForkを可能にする。
- どのMeshも世界全体のidentity、決済、通信、裁定を独占できない。

Gate:

グローバルな問題へ共同応答できる一方、応答機構そのものが不可逆な世界主権へ成長しないこと。

---

## 8. Inter-Mesh接続契約

各Meshは、外部へ次のManifestを公開する。

```ts
type MeshManifest = {
  meshId: string;
  protocolVersions: string[];
  publicCapabilities: CapabilityDescriptor[];
  acceptedCredentials: CredentialType[];
  contractEndpoints: ContractEndpoint[];
  boundaryConditions: BoundaryCondition[];
  oraclePolicy: OraclePolicy;
  auditCommitment: string;
  exitProtocol: ExitProtocol;
  forkPolicy: ForkPolicy;
};
```

接続Handshake:

```text
discoverManifest()
  -> negotiateProtocolVersion()
  -> verifyConstitutionCompatibility()
  -> discloseMinimumCredentials()
  -> agreeBoundaryContract()
  -> issueScopedCapabilities()
  -> activateConnection()
```

Constitution Compatibilityは内部制度の同一性を要求しない。接続に必要な境界条件と外部性の処理能力だけを確認する。

---

## 9. 中央裁判所を置かない紛争処理

紛争を一つの最終裁判所へ集約しない。段階的に処理する。

```text
1. Contract self-check
2. Temporary capability freeze
3. Independent evidence preservation
4. Bilateral Revision
5. Multi-mesh mediation market
6. Competing arbitration panels
7. Limited disconnection
8. Exit / Fork / alternative route
```

仲裁Meshは判決市場を独占できない。各仲裁結果には、適用範囲、根拠、TTL、異議経路を付ける。

重大な危害への即時保護と、最終的な責任認定を分離する。緊急停止は早く、不可逆な処分は遅くする。

---

## 10. 共通資源とインセンティブ

接続数、資産、人口、計算能力を、そのまま投票権へ変換しない。

評価するのは接続の質である。

- 可逆性
- 代替可能性
- 相互依存の対称性
- 監査可能性
- Exit可能性
- 外部性の負担
- 障害時の復元性

良い行動へのインセンティブ:

- 信頼できるCapabilityの拡張
- 保険料と担保負担の低下
- 代替Meshへの接続容易性
- 監査頻度の低下
- 共同資源への優先参加

境界侵害への応答:

- 危険なCapabilityの停止
- 担保凍結
- 供給経路の迂回
- 監督付き限定接続
- 信用範囲の縮小

人格、民族、思想、制度全体を罰するのではなく、違反に使われた具体的な接続能力を対象とする。

---

## 11. 最大の失敗モード

### De facto Centralization

形式上は分散していても、identity、決済、クラウド、Oracle、AI、通信が一社または一国へ集中する。

### Mesh Feudalism

大きなMeshが小さなMeshへ不利なContractを強制し、Exitを生存不能にする。

### Guardian Capture

安全確認Meshが恒久的な監視、裁定、規範輸出を行う。

### Oracle Collusion

複数の情報源が実際には同じ資金、データ、指揮系統に依存する。

### Majority Laundering

基本権の侵害を「民主的な多数決」として正当化する。

### Protocol Ossification

初期のContractや技術標準が変更不能となり、後発Meshを従属させる。

### Exit Without Destination

形式的な退出権はあるが、代替住居、通信、決済、物流がなく実質的に退出できない。

### AI Constitutional Capture

AIが翻訳、提案、評価を独占し、事実上の立法者または裁判官になる。

---

## 12. 検証プログラム

### Formal Verification

- 合意ルール
- Capability境界
- TTL
- Version互換性
- 権限昇格
- Exit後の権限失効

### Agent-Based Simulation

- 人数と規模の増加
- 資源格差
- 共謀
- Sybil attack
- Oracle failure
- 通信分断
- Mesh splitとmerge

### LLM Adversarial Simulation

- 契約の言語的曖昧さ
- 説得と強制の境界
- ルールの抜け穴
- 多文化間のProtocol翻訳
- AIによる規範の暗黙的注入

### Field Experiment

- 家庭
- 協同組合
- 小規模な共有資源
- 地域間連携
- サンドボックス化した越境Contract

LLMシミュレーションはシナリオ発見に使う。制度の正当性、安全性、現実の有効性は、形式検証、実地実験、独立監査を組み合わせて判断する。

---

## 13. 成熟度指標

接続数や参加人口だけを成長指標にしない。

- 小規模Meshの生存率
- Exit後の生活・取引継続率
- 単一障害点の減少
- Oracleの実効独立性
- Capability期限超過率
- Protocol Capture検出時間
- 誤介入と見逃し
- 代替経路への切替時間
- 少数ノードの拒否成功率
- Fork後の相互運用維持率
- 外部性の未処理量
- 上位Meshによる下位Mesh介入率
- Protocol Literacyをアプリ外でも再現できる参加者の比率
- Rule、Oracle、Custody、Enforcement、Appealの役割兼任率
- 単一providerが停止した場合に失われるCapabilityの比率
- provider交換とProtocol Forkの成功率
- Capture閾値超過からCapability発行停止までの時間

最終KPIは「世界の統一度」ではない。

> 異なる内部OSを持つノードが、互いを同一化せず、境界侵害を抑えながら共同問題を処理できる範囲。

---

## 14. 次の研究単位

家庭MVPと並行して、世界スケール全体を実装しない。次の研究単位だけを切り出す。

```text
Research Milestone A
Household MeshをSupernodeとして扱うInter-Mesh Contract Simulator
```

最小構成:

- 3つの家庭Mesh
- 1つの共有資源Mesh
- 各家庭内部は非公開
- Household Mesh Manifest
- 共有資源Contract
- 任意人数の内部合意proof
- Capability Lease
- 一家庭のExit
- Oracleの故障または共謀
- Protocol Capture監査

この実験により、「家庭内で成立したルールが、家庭間でも再帰的に成立するか」を検証する。

---

## 15. 長期的な到達像

この構想の到達点は、すべての人が一つのルールへ従う世界ではない。

各ノードが内部の価値観を保持したまま、外部へ与える影響についてだけ機械可読な契約を結び、違反時には中央の道徳的裁定を待たず、限定的で可逆的な応答が起きる世界である。

```text
No world sovereign.
No universal internal OS.
No permanent Guardian.

Shared interfaces.
Verifiable boundaries.
Scoped capabilities.
Reversible enforcement.
Plural exits.
Continuous revision.
```

世界を一つの巨大なMeshへ統合しない。

小さなMeshが小さいまま生存でき、それでも必要なときには大きな共同問題へ参加できるネットワークを作る。
