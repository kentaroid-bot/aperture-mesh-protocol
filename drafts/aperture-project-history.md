# Aperture Mesh Protocol: Epistemic Version History

**Status:** `proposal`

**Implementation status:** 記録Draft。Protocol仕様ではない

**Last updated:** 2026-09-01

## 1. Purpose

この文書は、Aperture Mesh Protocolがどのような違和感、反例、設計修正を経て現在の形になったかを記録する。

一般的なVersion Historyが成果物の差分を示すのに対し、この履歴は次の差分を扱う。

- どのMonkuが出発点になったか
- 当初の仮説にどの反例が加わったか
- AIが何を設計候補として提示したか
- 人間が何を採用、修正、保留、却下したか
- どの時点でGit上の文書または実装として固定されたか

目的は、創始者の物語を正当化することではない。Protocol自身に適用されたRevisionを監査可能にし、別のNodeが前提を批判、再現、Forkできるようにすることである。

## 2. Reading Rules

### 2.1 Evidence labels

| Label | Meaning |
|---|---|
| `Human Monku` | 人間が提出した違和感、反例、価値判断、設計要求 |
| `AI Proposal` | Gemini NotebookまたはCodexが生成した要約、仮説、設計候補 |
| `Dialogue Revision` | 会話の中で人間の追問を受けて修正された判断 |
| `Human Confirmation` | 人間が順序、意図、境界を明示確認した記録。同時代資料とは限らない |
| `Contemporaneous Record` | 出来事に近い時期に作成されたWorkspace記録。内容の正しさを自動保証しない |
| `Git Record` | commitとして固定され、日時と差分を検証できる成果 |
| `Tool Observation` | 接続時に確認した外部Toolの状態。Protocolの正しさを意味しない |
| `Reconstruction` | 複数資料から再構成した説明。逐語記録ではない |

### 2.2 Epistemic boundary

- AIの回答は、採用済み仕様、実証結果、独立した意思主体の証言ではない。
- AIが「完全」「安全」「共有している」と表現していても、その語を事実として継承しない。
- 会話の順序とGitの順序は一致しないことがある。Gitは成果物の確定順を示し、会話は発想とRevisionの経路を示す。
- この文書は全発言の逐語録ではない。Protocolの設計判断に影響した転換点を選んだ記録である。
- NotebookおよびPrivate Monkuの非公開情報は転載せず、公開可能な論点だけを要約する。
- 初期思想からApertureへの連続性は、影響関係についての再構成である。必然的進化、形式的証明、単一の正史を意味しない。
- 認証情報、Wallet、非公開Channel、個人データなど、思想系譜に不要な運用情報をPublic Historyへ移さない。

## 3. Source Topology

この履歴は、単一の「正史」ではなく、互いに異なる役割を持つ資料を接続して作成した。

| Source | Role in this history | Boundary |
|---|---|---|
| Gemini Notebook「MonkuAi」 | 認識論的アライメント以前の探索 | 全対話を公開資料とはみなさない |
| Gemini Notebook「MonkuAi: The Epistemic Alignment Manifesto」 | Cognitive Apertureと残余を保持する態度 | AIの評価表現は採用判断から除外 |
| Gemini Notebook「MonkuAi: 原則の修正」 | 有限ゲームと無限ゲームの原則修正 | 人間の訂正をRevisionの中心に置く |
| Gemini Notebook「分散型コンセンサスのアイデア」 | 外部性、Escrow、Tripwire、Mesh接続の初期検討 | 設計候補であり安全性の証明ではない |
| Gemini Notebook「トポロジー空間の身体知を獲得するための方法論」 | 片付け、共有空間、Compatibility Wrapperの検討 | 家庭と国家の同型性を仮定しない |
| [Morphidism Lineage](https://github.com/super-morphist-sukezo/morphidism-lineage) | MorphidismからApertureまでの人間確認済み再構成 | 2026-09-01に編集された二次資料。事実と解釈を分離して読む |
| OpenClaw workspaceの選別された同時代記録 | 2026-02以降の名称、活動、日付の照合 | Private source。本文、識別子、認証・運用情報は転載しない |
| 関連Repository metadata | Ampfinity、Fusion、Feedmonk、Monku_Ai、Apertureの公開時期 | Repository作成日は概念誕生日時と同じとは限らない |
| Codexとの設計対話 | 家庭Mesh、Revision、Guardian、MVP、開発Meshの具体化 | 会話だけで正式仕様にしない |
| Git repository | 公開可能な文書、実装、差分の固定 | commitは正しさではなく再現可能性を与える |

公開Repository内で特に関係する成果物は、[Project overview](../docs/00-overview.md)、[Civilization Roadmap](../docs/aperture-mesh-civilization-roadmap.md)、[Epistemic and Embodied Consensus](../docs/epistemic-and-embodied-consensus.md)、[Simulation Design](../docs/p2p-aperture-simulation-design.md)、[Home Experiment Roadmap](../docs/aperture-home-experiment-roadmap.md)である。

外部Lineageの事実、解釈、運用記録の分離に関する訂正候補は、[morphidism-lineage Issue #1](https://github.com/super-morphist-sukezo/morphidism-lineage/issues/1)で追跡する。

## 4. Version Lineage

### prehistory-a: Morphidism and the recurring AND question

**Period:** 2026-02

**Evidence:** `Human Confirmation`, `Contemporaneous Record`, `Reconstruction`

Aperture以前の源流として、「対立する選択肢を一方の勝利で終わらせず、両者の接続条件を再設計できないか」というMorphidismの問いがあった。後にApertureで現れる`AND, not OR`は、2026-08に突然生まれた語ではなく、この問いの再出現として読める。

ただし、MorphidismとApertureは同一ではない。Morphidismは価値的・創造的な方向を示し、Apertureは権限、境界、Consent、Exit、失敗時の回復を検査可能な形へ分解する。Apertureを利用またはForkするために、Morphidismの世界観へ同意する必要はない。

### prehistory-b: Morphire Army and embodied coordination through play

**Period:** 2026-02-15から2026-02-16

**Evidence:** `Human Confirmation`, `Contemporaneous Record`, `Reconstruction`

Morphire Armyは、複数の役割を持つAI Agentを召喚し、遊びの中で協調させる空想ゲームとして記録されている。ここではProtocolの安全性や分散性はまだ定義されていないが、抽象理論より先に、複数Node、役割分担、継続するゲームを身体的・物語的に経験する経路があった。

この経験を、後のTopological ClearingやDevelopment Meshの直接的証明とは扱わない。人間が「思想を理解してから実践する」だけでなく、「遊びや操作を通して関係構造を先に体感する」設計を繰り返してきた、という系譜仮説として保持する。

### prehistory-c: Ampfinity as symbolic amplification

**Period:** 2026-02-18に概念記録、2026-03-10にRepository作成

**Evidence:** `Human Confirmation`, `Contemporaneous Record`, `Git Record`, `Reconstruction`

Ampfinityは、AmpersandとInfinityを接続し、MorphidismのANDを反復・増幅する象徴体系として記録された。概念記録とRepository公開を同じ日付にせず、次の二つを区別する。

- 2026-02-18: 名称、manifest、象徴的な`&^&`表現の記録
- 2026-03-10: `ampfinityio`および`ampfinity-fusion`のGitHub Repository作成

`&^&`は創造的・象徴的な記法であり、Apertureのスケーラビリティ、無限性、数学的妥当性を形式証明するものではない。資金自給、取引bot、Wallet運用も隣接する技術実験であり、Apertureの思想的前提から除外する。

### prehistory-d: Interface experiments for AND and Monku

**Period:** 2026-03-10から2026-03-24

**Evidence:** `Git Record`, `Human Confirmation`, `Reconstruction`

二つのApplicationが、後のApertureへつながる異なる操作を試した。

- [`ampfinity-fusion`](https://github.com/super-morphist-sukezo/ampfinity-fusion): 対立語をANDで接続し、別の表現候補へ変換するInterface
- [`feedmonk`](https://github.com/kentaroid-bot/feedmonk): 文句や違和感を消さず、感情核と複数の変換候補として返すInterface

これらは、ApertureのConsent、Constitution、Tripwireを実装したものではない。しかし、対立を排除で終わらせないことと、残余を次のRevision入力として保持することが、思想だけでなく操作可能なUIとして試されていた。

N-Zero Arithmeticは同時期の隣接仮説だが、Apertureの採用済みInvariantまたは科学的根拠ではない。将来接続する場合も独立したEvidence Reviewを必要とする。

### pre-v0.1-a: Monku as residual, not noise

**Period:** 2026-08上旬

**Evidence:** `Human Monku`, `AI Proposal`, `Reconstruction`

出発点は、整合しない発言、弱い違和感、未整理な感覚を、ノイズとして除去すると重要な変化の兆候まで失うのではないか、という問題意識だった。

ここから次の語彙が形成された。

- **Monku:** まだ命題になっていない違和感を保持する入口
- **Cognitive Aperture:** 既存の分類からはみ出す情報を、早すぎる否定で閉じない認識の開口
- **Epistemic Alignment:** 結論への同意ではなく、何を根拠として扱い、何を未確定として残すかを調整する過程

この段階では、まだ分散型Protocolではない。しかし後のRevision機構にとって、異議を消さずに構造化するという認識論的基盤になった。

### pre-v0.1-b: From finite victory to continuing relations

**Period:** 2026-08中旬

**Evidence:** `Human Monku`, `Dialogue Revision`, `Reconstruction`

初期原則には、生存や再生産そのものを有限ゲームとして退けるように読める表現があった。これに対し、人間側から次の修正が入った。

> 否定すべきなのは生存や継続ではなく、地位、所有、支配の最大化を唯一の勝利条件にすることである。

Revision後は、生存と継続をゼロサム競争から協力可能な無限ゲームへ移すことが中心になった。後のAperture Meshでも、制裁による勝利より、境界を守りながら関係をRevisionまたはExitできることが優先される。

### pre-v0.1-c: Externality becomes an explicit contract problem

**Period:** 2026-08-22

**Evidence:** `Human Monku`, `AI Proposal`, `Dialogue Revision`

共有資源の利用において、あるNodeの選択が他Nodeへ費用を移転する場面から、分散型コンセンサスの検討が始まった。最初の重要な変換は、人格やマナーの評価を、観測可能な外部性と補償条件へ分離することだった。

```text
「配慮がない」
        ↓
誰が、どの共有資源に、どの測定可能な負荷を与えたか
        ↓
どの範囲を許容し、超過分をどう補償し、いつRevisionするか
```

この段階で、Escrow、Oracle、Tripwire、自動執行という強い案が登場した。一方で、それらを持つだけで公平になるとの証明はなかった。

### v0.0-a: Household Mesh and API contracts

**Period:** 2026-08-22から2026-08-23

**Evidence:** `Human Monku`, `AI Proposal`, `Dialogue Revision`, `Reconstruction`

家庭を最初の実験環境とし、家族一人ひとりをNode、共有生活の約束をAPI Contractとして表現する案が具体化した。

初期モデルは、契約違反を検知すると接続を停止し、冷却、対話、Revision、再合意を経て接続を回復する状態遷移だった。

```text
Connected
  -> Alleged Breach
  -> Safe Pause
  -> Review
  -> Revision Proposal
  -> Consent or Fork
  -> Limited Reconnect
  -> Connected
```

ここで重要な未解決問題が現れた。

- 誰が違反を判定するのか
- 誰がRevisionを生成するのか
- 誰の合意が必要なのか
- 誤報、虚偽通報、報復通報をどう扱うのか
- 接続停止が弱いNodeの生活基盤を奪わないか

AIはRevision案の生成と矛盾検査を補助できるが、当事者の合意を代行しない、という役割境界がここで形成された。

### v0.0-b: The abuse and false-reporting challenge

**Period:** 2026-08-23

**Evidence:** `Human Monku`, `Dialogue Revision`

StewardまたはGuardianを家庭内の保護者や家族会議として表現した直後、「親が虐待者なら誰が子どもを守るのか」という反例が提出された。さらに「子ども側が通報を悪用する可能性」も加わった。

この二つのMonkuにより、単純な多数決、家庭内だけのOracle、通報即制裁は安全設計として不十分になった。

Revisionの方向は次の通りである。

- 通報は判決ではなく、安全確認を開始するSignalである
- 緊急の保護と、事後の事実認定を分離する
- Safe Pauseは可逆的かつ最小範囲にする
- 食事、住居、医療、教育、基本通信、SOS、Safe ExitをCollateralにしない
- 虚偽通報への対応も自動報復にせず、権力差と萎縮効果を評価する
- 現実の緊急、医療、法的、児童保護サービスへの接続をProtocolで遅らせない

「接続そのものの破壊を最大の罰にする」という比喩も再検討された。関係全体の破壊は核兵器型Tripwireになり得るため、目的は相互破壊ではなく、能力を限定し、被害経路を止め、回復または安全なExitを可能にすることへ移った。

### v0.0-c: Connection count is not sovereignty

**Period:** 2026-08-23

**Evidence:** `Human Monku`, `Dialogue Revision`

「接続が増えるほど必ず有利で、減るほど必ず不利なのか」という問いにより、Meshの価値を次数や規模で評価する案が退けられた。

現在の区別は次の通りである。

- 接続数は選択肢を増やすことがあるが、監視、義務、感染、依存も増やし得る
- 少数の高品質な接続は、多数の支配的接続より主権を高め得る
- Exit後に代替経路がない場合、形式的な切断権は実質的な主権ではない
- 財産やDeposit能力を参加権、発言権、基本的安全の条件にしない
- Meshの健全性は、接続数ではなく、接続の可逆性、代替可能性、権力集中、被害上限で測る

このRevisionは、富裕Nodeが多数のEscrowを置いて政治力を得るMesh Feudalismへの防波堤になった。

### v0.0-d: Revision consensus is scoped, not a universal majority

**Period:** 2026-08-23

**Evidence:** `Human Monku`, `Dialogue Revision`

「家族4人なら3人の賛成でAPIを採用できるか」という問いから、単純な4分の3多数決では個人の権利を上書きできることが明確になった。

Revisionは、固定された家族人数ではなく、2人以上の任意のMeshを扱う設計へ変更された。合意方式は案件の影響範囲で分ける。

| Change class | Minimum condition |
|---|---|
| 個人設定 | 当該Node本人の同意 |
| 2者間API | 接続する両Nodeの同意 |
| 共有資源 | 影響を受けるNode集合の所定合意 |
| 基本権、安全、Exit | 多数決で剥奪不可。本人同意だけでもCollateral化不可 |
| Constitution変更 | 通常Revisionより高い閾値、熟慮期間、Fork可能性 |

人数はQuorumの入力であって、正当性そのものではない。AIはRevision候補、影響範囲、反例を提示できるが、Voteを持たない。

### v0.0-e: Guardian becomes an inter-mesh capability

**Period:** 2026-08-23

**Evidence:** `Human Monku`, `Dialogue Revision`

家庭外のGuardian Nodeを置く案に対し、「現代のICCのような中央機関になるのではないか」というMonkuが提出された。

解決方向は、Guardianを恒久的な組織や最高裁として設置せず、別Meshとの限定接続として実装することだった。

```text
Home Mesh
  -> scoped safety request
  -> Inter-Mesh Safety Bridge
  -> multiple replaceable external Meshes
  -> minimal, time-limited capabilities
```

Guardian機能は、次の条件を持つCapability Leaseとして扱う。

- 発動理由と対象範囲が限定される
- 期限切れになる
- 複数の独立経路から選べる
- 単独でOracle、Custody、Enforcement、Appealを兼ねない
- 家庭の一般ルールを書き換えない
- 接続履歴と介入範囲を監査できる
- Captureの兆候があれば停止、交換、Forkできる

これにより、外部支援を拒絶せず、外部支援者を新しい主権者にしない構造が目標になった。

### v0.0-f: Escrow and Tripwire are necessary but insufficient

**Period:** 2026-08-23

**Evidence:** `Human Monku`, `Dialogue Revision`

分散型Protocolの神髄を「信頼や道徳を共有しなくても、Escrowと自動Tripwireがあれば共生できる」と表現する強い仮説が提示された。この仮説は、中央管理者が独占してきた取引保証と制裁をProtocolへ移せる点を明瞭にした。

同時に、次の危険も明らかになった。

- Escrowへ資産を置けないNodeが排除される
- Oracleを握る者が事実を支配する
- Tripwireを設計する者が新しい警察になる
- 誤作動が生活基盤や安全を奪う
- Appealを同じ主体が握れば自動化された専制になる
- Exit先のないNodeには同意拒否ができない

したがって革命の定義は、EscrowとTripwireの分散だけでは完了しない。

> Rule-making、Oracle、Custody、Enforcement、Appeal、Exitを一主体が再結合できず、各役割が限定的、交換可能、監査可能であり、誤作動から回復できるときにのみ、Node sovereigntyへ近づく。

この条件は現在のRepository READMEの中心命題になっている。

### v0.0-g: AND, not OR

**Period:** 2026-08-23

**Evidence:** `Human Monku`, `Dialogue Revision`

文明ロードマップの初期表現は、既存の中央制度をMeshが置き換えるOR型の革命として読めた。これに対して、Meshは既存制度と並行し、比較され、必要に応じて接続されるAND型であるべきだという修正が入った。

- 法や行政を宣言だけで消さない
- Slack、Discord、Google Workspaceなど既存ツールをCompatibility Wrapperとして利用できる
- 既存制度に残るNodeを未熟または非主権的と決めつけない
- Meshは代替経路を増やし、失敗時の単一依存を減らす
- 実証なしに文明スケールへ昇格させない

### v0.0-h: Topological Clearing becomes embodied protocol practice

**Period:** 2026-08-23

**Evidence:** `Human Monku`, `AI Proposal`, `Dialogue Revision`, `Git Record`

片付けを「正しい位置へ戻す」操作と捉えると、中心が理想状態を定義し、周縁がそれに従うピラミッド型の認知が身体化される。このMonkuから、片付けをNode、Edge、Boundary、Capacity、Flow、Revisionとして経験するTopological Clearingが形成された。

重要なのは、これがMeshの説明用メタファーに留まらないという人間側の訂正である。

Topological Clearingは、次を身体で学ぶ最初のProtocol実験として位置づけられた。

- 物には永久の正位置ではなく、利用と関係から変化する配置がある
- 共有空間は所有者の命令ではなく、接続境界として交渉できる
- 内部の片付け方式が異なっても、境界APIが互換なら接続できる
- 散らかりは人格の失敗ではなく、容量、流量、接続条件のMismatchかもしれない
- Revisionはルール違反者の矯正ではなく、Topologyの再設計である

この考えは、家庭と国家が完全に同型だという主張ではない。家庭で得るのは、異なるスケールにそのまま複製できる制度ではなく、境界、相互依存、代替経路、Revisionを認識する身体知である。

### v0.1-concept: Public repository and executable experiments

**Period:** 2026-08-23

**Evidence:** `Git Record`

概念は公開Repositoryとして分離され、批判、検証、Forkが可能な成果物になった。

| Commit | Recorded change |
|---|---|
| `db23ecd` | Initial Aperture Mesh protocol release |
| `d81322d` | GitHub Actions runtime update |
| `0b714b8` | Epistemic and embodied consensusを定義 |
| `dfa7512` | Topological Clearingを身体的実践の中心へ修正 |

公開時点のRepositoryは、文明ロードマップ、共通Protocol設計、家庭実験ロードマップ、Aperture Home MVP、概念Simulator、安全境界を含む。

MVPは意図的に、自動通報、虐待判定、Truth判定、Smart Lock制御、金融制裁、位置追跡、不可逆制裁を実装しない。LLMシミュレーションは反例探索や敵対的シナリオ生成に使えるが、安全性の証明または現実の当事者の代替にはならない。

### v0.1-draft: Workplace and Development Mesh

**Period:** 2026-08-23から2026-08-24

**Evidence:** `Human Monku`, `Dialogue Revision`, `Git Record`

家庭だけでなく、小規模事業所も実験環境になり得るという案が追加された。ただし「家庭が市町村へ、市町村が国家へ」と上位階層へ統合される梯子ではなく、家庭、職場、地域などが重なり合うMeshとして再定義された。

開発Workspace自体にもApertureの意思決定フローが適用された。

| Git / Workspace | Aperture meaning |
|---|---|
| Private Monku | まだ共有しない個人的、未整理な違和感 |
| Issue / Shared Monku | Workspaceへ提出することを選んだ問題提起 |
| `drafts/` | 問題を消さず、仮説、反例、設計候補へ構造化する場所 |
| Branch | 本流を壊さない限定接続 |
| Review | 異議、反例、影響範囲の確認 |
| Commit | 変更内容の固定と監査記録 |
| Merge | Revisionの採用 |
| Revert | 可逆的Tripwire |
| Fork | 合意不能時の別経路 |

このDraft群は、`codex/workplace-draft` branchとDraft PR #1で公開レビュー待ちになった。

| Commit | Recorded change |
|---|---|
| `ef1083a` | 小規模事業所PilotのDraft |
| `56ea874` | Monku、Draft、Git、CodexによるDevelopment MeshのDraft |
| `dcdc727` | GitHubとApertureの意思決定フロー比較 |

### v0.1-draft.1: Notebook as a read-only external Mesh

**Period:** 2026-08-24

**Evidence:** `Human Monku`, `Tool Observation`, `Reconstruction`

Gemini Notebook MCPをCodex Workspaceへ接続し、過去のNotebookを外部Meshとして参照する実験を行った。最初のCapability Leaseは読み取り専用とし、Notebookの変更、追加、共有、削除、Query生成を無効化した。

この接続は、次の設計原則を実際の開発手順で確認した。

- 外部Meshは内部状態の所有権を渡さずに接続できる
- Capabilityは目的に必要な最小範囲へ限定できる
- 接続は履歴を自動的に正式仕様へ昇格させない
- AI間の出力は合意ではなく、Review対象のProposalである
- 人間が公開範囲と採否を決める

本Version Historyは、この限定接続から得た資料を使う最初のDraftである。

### v0.1-draft.2: Development Mesh applies its own protocol

**Period:** 2026-08-24から2026-09-01

**Evidence:** `Human Monku`, `Git Record`, `Tool Observation`, `Dialogue Revision`

Development MeshのDraft、Version History、AI代理Reviewの権限境界を、GitHub上の実運用で検査した。

| Record | Revision |
|---|---|
| [PR #1](https://github.com/kentaroid-bot/aperture-mesh-protocol/pull/1) / `7822c04` | WorkplaceとDevelopment Mesh Draftを外部Review後に公開保存 |
| [PR #2](https://github.com/kentaroid-bot/aperture-mesh-protocol/pull/2) / `1f2b0bf` | Epistemic Version HistoryをProvenance付きAI代理Review後に公開保存 |
| [Issue #3](https://github.com/kentaroid-bot/aperture-mesh-protocol/issues/3) | 無人AI ApproveとIssue操作の境界をShared Monkuとして提出 |
| [PR #4](https://github.com/kentaroid-bot/aperture-mesh-protocol/pull/4) / `4890e68` | PR・Issue権限、Provenance、役割分解、`Closes`の意味をRevisionしてMerge |

この運用から、GitHub account表示とGovernance上の主体を分ける必要が明確になった。

```text
PR Submitter / Gateway Identity: kentaroid-bot
Revision Implementer: CodexなどのScoped Execution Node
Revision Sponsor / Merge Authority: Human Project Steward
Reviewer / Monku Submitter: super-morphist-sukezoなど
Platform Executor: GitHub
```

AIはCronで検知、分析、テスト、Comment、通知を行える。`APPROVE`はHuman Stewardが対象PRとhead commitを指定した場合だけ代理投稿でき、Provenanceを必要とする。AIによる無人Mergeは認めない。`Closes #N`はAIもResolution Proposalとして記述できるが、Human Stewardが可視のclosing keywordを含むPRをMergeすることがIssue closeの最終承認になる。

この一連の出来事は、Protocolが自らへのMonkuを受け、Review、Revision、再Review、Merge、Closeまで循環させた最初の公開実例である。同時に、制度化とAI生成速度が人間の認知容量を上回る危険も観測された。

## 5. Revision Ledger

| Monku / counterexample | Earlier assumption | Current revision | State |
|---|---|---|---|
| 未整理な違和感が失われる | 整合しない情報はノイズ | Monkuとして保持し、後で構造化する | adopted principle |
| 生存も有限ゲームなのか | 生存、再生産から離脱する | 支配的な勝利条件を外し、継続を協力可能にする | revised principle |
| 外部性を誰が負担するか | マナーで調整する | 観測、許容幅、補償、Revisionへ分解する | design basis |
| 親が虐待者ならGuardianになれない | 家庭内Stewardが安全を守る | 外部経路、Safe Pause、基本権非Collateral化 | safety invariant |
| 通報も悪用され得る | 通報がTripwireを直接発火する | Signal、保護、事実認定、Appealを分離する | safety invariant |
| 接続破壊は核兵器型ではないか | 最大制裁が抑止を生む | 最小範囲、可逆性、回復、Safe Exitを優先する | revised design |
| 接続数が力になる | 多接続ほど有利 | 品質、代替性、Capture、被害上限を測る | adopted principle |
| 4人中3人なら採用か | 一律多数決 | 影響範囲別Consentと不可侵領域を使う | adopted design |
| GuardianがICC化する | 外部機関が最終判断する | 複数Meshへの限定Capability Lease | design candidate |
| Escrow保有量が政治力になる | Depositが誠実さを保証する | 基本権と参加権を資産から分離する | safety invariant |
| Tripwire管理者が支配者になる | 自動化すれば中立 | 役割分離、監査、交換、Appeal、Exitを必須にする | constitutional principle |
| 既存制度を置換するのか | Meshか中央制度かのOR | 並行経路とCompatibility WrapperのAND | revised roadmap |
| 家庭と国家は同じか | 小Meshを拡大すれば世界になる | 制度はスケール固有、身体知と一部Invariantだけを移す | adopted boundary |
| 片付けは比喩にすぎないか | Meshを説明する教材 | Topological Clearing自体を最初の身体的Protocol実験にする | adopted principle |
| AIも同じ動機を持つのか | 会話上の同調を主体性とみなす | AIはProposal生成と検査を行うScoped Execution Node | adopted boundary |
| Apertureは2026-08に単独で始まったのか | Repository作成を思想の起点とみなす | Morphidism、遊び、Interface実験を前史として保持し、必然的進化とは区別する | history revision |
| GitHub accountが実装者と決定者を表すのか | `author`表示を主体とみなす | Submitter、Implementer、Sponsor、Reviewer、Merge Authority、Executorを分離する | adopted operating boundary |
| AI Reviewを定期化すればApproveも自動化できるか | Review結果とConsentを同一視する | 無人処理はCommentまで。代理Approveはhead単位の明示委任とProvenanceを要求する | adopted operating boundary |
| `Closes #N`は無人Issue closeか | closing keywordの記述をClose実行とみなす | Implementerが提案し、Reviewerが検査し、Human StewardのMergeで有効化する | adopted operating boundary |

## 6. Current Constitutional Claims

現時点で比較的安定しているが、なお反証可能な中心命題は次の通りである。

1. Nodeの内部思想、感情、道徳を統一せず、接続境界と検証可能な約束を調整する。
2. 基本的な生存、安全、通信、教育、医療、SOS、ExitをEscrowまたは制裁の担保にしない。
3. 通報、保護、事実認定、執行、Appealを分離する。
4. Tripwireは最小権限、期限付き、可逆的であり、回復経路を持つ。
5. Rule、Oracle、Custody、Enforcement、Appeal、Exitを一主体へ再結合させない。
6. AIはRevisionを提案できるが、当事者のConsent、Vote、権利を代行しない。
7. 多数決は万能ではなく、影響範囲と不可侵領域によって制限される。
8. 接続数、資産量、Deposit能力を主権または人格価値の尺度にしない。
9. Guardianは中央機関ではなく、交換可能なInter-Mesh Capabilityとして設計する。
10. Meshは既存制度を即時置換せず、並行する代替経路として比較、検証される。
11. 家庭、職場、地域、国家は完全に同型ではない。移植するInvariantとスケール固有部分を分ける。
12. Protocolは自らのMonku、Draft、Review、Revert、Forkを許容しなければならない。
13. GitHub account、AI実装者、人間Sponsor、Reviewer、Merge Authority、Platform Executorを同一主体とみなさない。
14. AIによる分析とConsentを分離し、無人Approveと無人Mergeを行わない。

## 7. Claims Deliberately Weakened or Rejected

次の表現は発想を進める力を持ったが、そのままでは現行方針ではない。

| Strong formulation | Why it was weakened |
|---|---|
| 信頼は不要である | 信頼依存を減らせても、観測、保守、緊急支援、ケアには関係的信頼が残る |
| EscrowとTripwireさえあれば公平になる | Oracle、資産格差、誤作動、Appeal、Exitの支配が残る |
| 違反者の接続を自動破壊する | 集団罰、生活基盤剥奪、回復不能、報復連鎖を起こし得る |
| 接続が多いNodeほど強い | 中央性と依存を権力へ変換し、Mesh Feudalismを生む |
| 多数決なら合意である | 少数者の身体、安全、Exit、個人境界を上書きし得る |
| 外部Guardianが最終判断する | Guardian自身が中央主権者またはCapture点になる |
| 家庭から国家まで同じProtocolで動く | 権力、匿名性、強制力、法的責任、時間尺度が異なる |
| Meshが中央制度を置き換える | 単一の革命経路となり、失敗時の代替と現実の保護制度を失う |
| AIは人間と動機を共有するNodeである | AIの同調表現を持続的主体性やConsentと誤認する危険がある |
| Simulationが安全性を証明する | 仮定内の挙動しか示さず、現実の権力差や被害を保証しない |
| MorphidismからApertureは必然的に進化した | 系譜は人間確認済みの影響関係だが、他の解釈、断絶、Fork可能性を排除しない |
| `&^&`またはN-ZeroがMeshを数学的に証明する | 象徴表現または独立仮説であり、Protocolの形式検証とは別である |

## 8. Open Holds

以下は未解決であり、次Versionへ自動的に採用しない。

- Oracleの独立性を、資本、データ、クラウド、Identityの共有まで含めてどう測るか
- Inter-Mesh GuardianのSybil攻撃、談合、同一資金源による擬似分散をどう検知するか
- 子ども、被扶養者、従業員など、退出コストが非対称なNodeのConsentをどう評価するか
- False positiveとFalse negativeの被害を、誰の視点でどのように比較するか
- 基本権を守りながら、金銭以外の有限資源を公平に割り当てる方法
- Compatibility Wrapperが、既存プラットフォームの権力を不可視化しない条件
- 小規模実験から文明ロードマップへ進むためのEvidence Gate
- Protocol Captureを検知したとき、停止、移行、Forkのどれを選ぶか
- 忘れられる権利と、監査ログの保持をどう両立するか
- Version History自体を、誰が訂正、反証、分岐できるようにするか
- 初期系譜について、同時代記録、人間の後日確認、Git記録の不一致をどう表示するか
- AI Agentの自己記述を、人格同一性または独立証言として過大評価せずにどう保存するか
- 制度化とRevision速度が人間のReview容量を超える閾値をどう観測するか

## 9. Proposed Next Versions

| Candidate | Goal | Evidence gate |
|---|---|---|
| `v0.1.1-history` | この履歴を外部Reviewにかける | 出典境界、欠落、誤帰属の指摘を反映 |
| `v0.2-home-pilot` | 家庭で低リスクな記録、提案、Consentを試す | 基本権非Collateral、停止条件、参加者の継続同意 |
| `v0.2-workplace-pilot` | 小規模事業所で境界APIとRevisionを試す | 労務上の権力差、報復防止、任意参加、外部相談経路 |
| `v0.3-inter-mesh-sim` | 複数Meshの限定接続とGuardian分散を検証する | Capture、Sybil、Oracle相関、Forkの敵対的試験 |
| `v0.4-federated-experiment` | 独立運営される複数Pilotを接続する | 共通Identityや中央管理者なしでの相互運用 |

Version番号は成果の大きさではなく、検証済みの境界を示すべきである。文明スケールの主張は、小規模な成功から自動的には導出しない。

## 10. Maintenance Protocol

この履歴への変更は、次の手順を推奨する。

1. 誤り、欠落、異議をIssueまたはShared Monkuとして提出する。
2. 修正案を`drafts/`または専用Branchに作る。
3. 事実訂正、解釈変更、Protocol変更を区別する。
4. Private Monkuを本人のConsentなく公開しない。
5. AI生成の要約には、参照範囲と不確実性を記録する。
6. Reviewでは、創始者への忠実性より反例と影響範囲を優先する。
7. Merge後も以前のVersionをGit履歴から検証可能にする。
8. 合意不能な解釈は、単一の正史へ強制せずFork可能にする。
9. 外部Lineageを参照するときは、Normative Dependencyではなく、帰属付きのOrigin Hypothesisとして接続する。

## 11. Decisions Needed

このDraftを正式なVersion Historyへ昇格する前に、次を決める必要がある。

1. 正式配置を`docs/version-history.md`とするか、独立した`HISTORY.md`とするか。
2. Notebook由来の出来事を、タイトルと日付だけで十分に検証可能とみなすか。
3. 会話からの再構成に、どの粒度で人間の明示承認を必要とするか。
4. Revision LedgerをProtocol Versionごとに追記するか、重要な認識論的転換だけに限定するか。
5. Public HistoryとPrivate Monku Logの境界を、誰がどの手順で監査するか。
6. Morphidism以前を含む系譜に、どのSourceを検証可能なPublic Evidenceとして要求するか。
7. 役割名の日本語定訳と、Revision速度・人間Review容量の運用上限を定義するか。

この文書のMergeは、記載された全設計の実装、安全性、有効性への承認を意味しない。意味するのは、現時点の起源、Revision、未解決点を、外部Nodeが批判できる形で公開することへの合意だけである。
