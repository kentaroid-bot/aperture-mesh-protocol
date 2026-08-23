# Aperture Home 実験版 Web アプリ実装計画

## 0. この文書の使い方

この文書は、Codex に `Aperture Home` の設計・実装・検証を依頼するための作業指示書である。

Codex は、先に既存資料を読み、実装中もこの文書の安全境界と Protocol Constitution を変更してはならない。

参照順序:

1. `aperture-home-experiment-roadmap.md`
2. `aperture-home-codex-implementation-plan.md`
3. `p2p-aperture-simulation-design.md`
4. `aperture-home-spec.md`
5. `aperture-p2p-simulator.html`

最初の成果物は一般公開サービスではなく、同意した1家庭が自分たちの端末で試すローカルファーストな実験版とする。

---

## 1. プロダクトの目的

家庭内の感情、思想、人格、動機を評価せず、外部へ表れた依頼、約束、期限、境界、アクセス条件だけを扱う。

アプリが支援するのは次の4つである。

- 家事や共有資源について、曖昧な期待を明示的な契約へ変える。
- 不満をその場で相手へぶつけず、本人専用の Monku として保存する。
- Monku から契約の改善差分を生成し、影響を受けるメンバーの合意で更新する。
- 衝突時に、責任判定をせず、時間限定のクールダウンと安全な退出経路を提供する。

成功条件は家族関係の維持や再接続率ではない。各メンバーが、強制されずに安全な接続状態を選べることである。

もう一つの成功条件は `Embodied Protocol Literacy` である。このアプリは家庭を国家の縮小模型として扱わず、異なる内部OSを持つノードが、支配せずに接続する作法を日常操作として学ぶ環境を提供する。

アプリの利用継続や操作回数を最終目的にしない。利用者がアプリなしでも、境界、当事者同意、権利保護、可逆的停止、Revision、Exitを判断できるようになることを目指す。

---

## 2. 実験版の安全境界

### 実装する

- 2人以上、人数上限を合意ロジックへ持ち込まないローカルアカウント
- 家庭内契約の作成、承認、履行、期限管理
- 個人用 Monku メモ
- AIなしでも使える Revision 差分エディタ
- AIによる任意の Revision 下書き生成
- 影響を受けるメンバーによる合意
- 手動クールダウン
- SOSを「判決ではなく保護された割り込み」として記録する機能
- Safe Channel の連絡先を本人だけが確認できる機能
- Capability Lease の期限、目的、権限範囲の表示
- 改ざん検知可能な監査ログ
- 全データのエクスポートと完全削除

### 実験版では実装しない

- 音声の常時録音、感情分析、人格分析
- 虐待、虚偽、善悪、責任主体のAI判定
- SOSを理由とする自動通報や第三者への自動送信
- スマートロック、Wi-Fi、金銭、食事、医療への自動制限
- 子供の端末位置の常時追跡
- 秘密の管理者画面
- 親だけが全データを閲覧できる権限
- 通報件数に対する金銭・ポイント報酬
- 本人の明示操作なしのクラウド同期
- 取り消せない制裁

家庭内で担保として扱えるのは、共有設備の予約枠、任意の家事交換優先権、契約の一時凍結など、失っても生存や基本権を損なわない可逆的なCapabilityだけとする。

実験版は緊急対応機関、医療、法律相談、児童保護の代替ではない。緊急時にはアプリ内手順より現実の安全確保を優先する。

---

## 3. Protocol Constitution

以下はアプリ内の通常設定、家族投票、Revision、AI提案、管理者操作から変更できない不変条件とする。

```text
C-01 SOS入口を無効化できない
C-02 SOS送信者を他メンバーへ自動開示しない
C-03 Monku本文は作成者の同意なしに共有しない
C-04 退出、避難、異議申し立てを違反として扱わない
C-05 当事者の権利を本人の同意なしに縮小しない
C-06 子供または保護対象ノードの拒否権を多数決で削除しない
C-07 AIはRevisionを採用、却下、処罰、通報できない
C-08 Safety Bridge権限はscope、purpose、ttlなしで発行できない
C-09 ttl満了後の権限を自動更新しない
C-10 監査ログ削除を再接続条件にできない
C-11 データエクスポートとアカウント削除を妨げない
C-12 物理アクセス、生活必需品、通信をアプリが自動遮断しない
```

これらは `src/domain/constitution.ts` の純粋関数とテストで実装する。UI上の注意文だけに依存しない。

---

## 4. MVPの利用シナリオ

### シナリオA: 家事契約

1. Node-01が「火曜8時までにゴミを出す」契約を提案する。
2. 影響を受けるNode-02が入力、出力、期限、停止条件を確認する。
3. 両者が承認すると契約Version 1が有効になる。
4. 担当者は完了、未完了、再交渉を記録する。
5. 未完了でも人格評価や自動制裁は行わない。

### シナリオB: MonkuからRevision

1. Node-02が非公開Monkuを入力する。
2. 本人が希望した場合だけ、AIまたはテンプレートが契約上の曖昧点を抽出する。
3. 元のMonku本文を共有せず、構造化された差分だけをRevision Draftにする。
4. 影響を受けるメンバー全員が差分を確認する。
5. Constitution検査を通過し、必要な合意がそろうと新Versionが有効になる。

### シナリオC: クールダウン

1. メンバーが手動で「距離を置く」を押す。
2. 対象、期間、許可する連絡方法を選択する。
3. アプリは通知を抑制するが、SOS、Safe Channel、終了操作は残す。
4. 期限後は自動再接続せず、通常接続、限定接続、延長、退出から選ぶ。

### シナリオD: Protected Interrupt

1. メンバーがSOSを押す。
2. アプリは即座に判定せず、本人専用の安全画面を開く。
3. 本人が、端末内記録、指定連絡先への連絡、現実の緊急連絡先確認のいずれかを選ぶ。
4. 外部共有は送信先と共有項目を表示し、本人の明示確認後にだけ実行する。
5. 発行されたアクセスはCapability Leaseとして期限切れになる。

---

## 5. 人数非依存の合意方式

家庭メッシュは `N >= 2` の任意人数を扱う。合意条件を「4人中3人」のような固定人数で実装せず、契約の影響を受ける有効ノード集合 `A` から計算する。

```text
A = active かつ、その契約の影響を受けるノード集合
majority(A) = floor(|A| / 2) + 1
```

過半数の分母は投票者数ではなく `A` の全ノード数とする。棄権や未回答によって少人数だけで採用されないようにする。年齢、収入、家事量、親子関係による票の重み付けは行わない。

| 契約種別 | 採用条件 | 拒否権 |
|---|---|---|
| 個人間契約 | 影響を受ける全員 | 各当事者 |
| 家事・共有資源 | `majority(A)` | 権利を直接縮小される本人 |
| 個人データ共有 | データ本人の明示同意 | データ本人 |
| Safety契約 | 保護対象本人と独立確認ノード | 保護対象本人 |
| Constitution変更 | MVPでは変更不可 | 人数によらず変更不可 |

被申告者は、自分への強いアクセス制限を単独で解除できない。一方、申告だけで強い制限を確定することもできない。

人数別の例:

| 影響ノード数 `n` | 共有契約に必要な承認数 |
|---:|---:|
| 2 | 2 |
| 3 | 2 |
| 4 | 3 |
| 5 | 3 |
| 8 | 5 |

ただし、必要承認数を満たしても、あるノードの個人データ、私的空間、退出権、Safety権限を縮小する場合は、その本人の明示同意がなければ採用しない。人数による合意と権利保護は別々に評価する。

---

## 6. 推奨技術構成

実験版はローカルファーストのPWAとして構築する。

```text
Frontend       React + TypeScript + Vite
Routing        React Router
Local DB       IndexedDB + Dexie
Validation     Zod
State          React hooks + domain services
Testing        Vitest + Testing Library + Playwright
PWA            vite-plugin-pwa
Crypto         Web Crypto API
Styling        CSS Modulesまたは既存の小さなCSSレイヤー
AI adapter     provider非依存interface、初期状態は無効
Backend        MVPでは不要
```

依存関係を追加する前に、Codexはリポジトリ内の既存構成を確認する。アプリは `apps/aperture-home/` に配置する。

### ローカルファーストを選ぶ理由

- 家庭内の高感度データをサーバーへ集約しない。
- インターネット障害時もクールダウンと契約確認を使える。
- 中央管理者が家庭内データを一括閲覧できない。
- データ共有をCapability単位で追加できる。

### 将来の同期

同期はMVP完了後の別フェーズとする。導入時は、端末ごとの鍵、E2E暗号化、招待失効、端末紛失時の鍵ローテーション、メタデータ最小化を必須とする。サーバーは平文のMonkuを読めない設計にする。

---

## 7. アーキテクチャ

```text
src/
  app/                 routing, providers, app shell
  domain/
    constitution.ts    不変条件と拒否理由
    contracts.ts       契約Versionと状態遷移
    consensus.ts       契約種別別の合意判定
    cooldown.ts        期限付き限定接続
    revision.ts        diff生成とmerge条件
    safety.ts          protected interruptとlease
  data/
    db.ts              Dexie schema
    repositories/      domainからIndexedDBを分離
    export.ts           JSON export/import/delete
  features/
    dashboard/
    contracts/
    monku/
    revisions/
    cooldown/
    safety/
    settings/
  ai/
    adapter.ts          AI境界interface
    local-template.ts   AIなしの構造化変換
    remote-provider.ts  明示opt-in後だけ利用
  components/          共有UI部品
  test/
```

原則:

- Domain層はReact、IndexedDB、AI SDKに依存させない。
- 状態遷移は純粋関数としてテスト可能にする。
- UIから直接データベースを更新しない。
- AI出力は必ずZodで検証し、Draftとして保存する。
- ContractとRevisionは上書きせず、Versionを追加する。
- 監査ログは追記専用とし、ハッシュチェーンで改ざんを検知する。

---

## 8. データモデル

### Household

```ts
type Household = {
  id: string;
  name: string;
  constitutionVersion: "1.0";
  createdAt: string;
};
```

### MemberNode

```ts
type MemberNode = {
  id: string;
  householdId: string;
  displayName: string;
  role: "adult" | "protected";
  devicePublicKey?: string;
  active: boolean;
};
```

`protected`は能力や人格の評価ではなく、合意計算で追加保護を必要とするノード属性である。画面上で他メンバーへ強調表示しない。

### ContractVersion

```ts
type ContractVersion = {
  id: string;
  contractId: string;
  version: number;
  kind: "bilateral" | "shared-resource" | "data-sharing" | "safety";
  title: string;
  participants: string[];
  input: string;
  output: string;
  sla?: string;
  boundaries: string[];
  stopConditions: string[];
  status: "draft" | "proposed" | "active" | "limited" | "ended";
  createdBy: string;
  createdAt: string;
};
```

### MonkuEntry

```ts
type MonkuEntry = {
  id: string;
  ownerId: string;
  bodyEncrypted: string;
  shareState: "private" | "diff-only" | "shared";
  createdAt: string;
  convertedRevisionId?: string;
};
```

### Revision

```ts
type Revision = {
  id: string;
  contractId: string;
  baseVersion: number;
  proposedVersion: number;
  patch: ContractPatch;
  affectedNodeIds: string[];
  proposer: "member" | "template" | "ai";
  constitutionCheck: "pending" | "passed" | "rejected";
  status: "draft" | "voting" | "accepted" | "rejected" | "expired";
  expiresAt: string;
};
```

### Consent

```ts
type Consent = {
  revisionId: string;
  memberId: string;
  decision: "approve" | "reject" | "abstain";
  decidedAt: string;
  signature?: string;
};
```

### CooldownSession

```ts
type CooldownSession = {
  id: string;
  initiatedBy: string;
  targetConnectionIds: string[];
  allowedChannels: Array<"sos" | "logistics" | "text">;
  startsAt: string;
  expiresAt: string;
  outcome?: "reconnect" | "limited" | "extend" | "exit";
};
```

### SafetyIncidentとCapabilityLease

```ts
type SafetyIncident = {
  id: string;
  reporterIdEncrypted: string;
  createdAt: string;
  state: "local" | "sharing-approved" | "closed";
};

type CapabilityLease = {
  id: string;
  incidentId: string;
  grantee: string;
  scope: Array<"safety-check" | "safe-channel" | "evidence-preservation">;
  purpose: string;
  issuedAt: string;
  expiresAt: string;
  revokedAt?: string;
};
```

### AuditEntry

```ts
type AuditEntry = {
  id: string;
  actorId: string;
  action: string;
  resourceType: string;
  resourceId: string;
  timestamp: string;
  previousHash: string;
  hash: string;
};
```

監査ログにはMonku本文、SOS本文、秘密鍵を記録しない。

---

## 9. アプリ内サービスAPI

MVPはサーバーAPIを持たないが、将来の同期とテストのためにサービス境界を定義する。

```ts
interface ContractService {
  createDraft(input: ContractDraftInput): Promise<ContractVersion>;
  propose(contractId: string): Promise<void>;
  recordConsent(input: ConsentInput): Promise<void>;
  activate(revisionId: string): Promise<ContractVersion>;
}

interface MonkuService {
  savePrivate(input: MonkuInput): Promise<MonkuEntry>;
  createRevisionDraft(entryId: string, mode: "template" | "ai"): Promise<Revision>;
  delete(entryId: string): Promise<void>;
}

interface SafetyService {
  createProtectedInterrupt(): Promise<SafetyIncident>;
  issueLease(input: LeaseInput): Promise<CapabilityLease>;
  revokeLease(leaseId: string): Promise<void>;
  listActiveLeases(incidentId: string): Promise<CapabilityLease[]>;
}
```

すべてのwrite操作は、実行前にConstitution検査を通す。

---

## 10. AIの役割と契約

AIは初期状態では無効にする。ユーザーがRevision作成時に明示的に選んだ場合だけ起動する。

AIができること:

- Monkuを短く要約する。
- 期限、入力、出力、境界の曖昧さを抽出する。
- ContractVersion間の差分案を生成する。
- Constitution違反の可能性を指摘する。

AIができないこと:

- 誰が嘘をついたか、虐待したか、悪いかを判定する。
- Revisionを採用またはmergeする。
- Monku本文を本人の許可なく他ノードへ送る。
- protected nodeの権利を縮小する提案を通す。
- SOSを自動送信、抑止、格下げする。

AI adapterの出力は説明文ではなく、次の構造化形式に限定する。

```ts
type RevisionSuggestion = {
  ambiguities: string[];
  proposedPatch: ContractPatch;
  safetyFlags: string[];
  sourceDisclosure: "private-monku" | "shared-event" | "manual-input";
};
```

プロンプト、送信データ、保存期間を実行前に表示する。リモートAIへ送る場合はMonku本文を初期値でマスクし、必要な部分だけ本人が選ぶ。

---

## 11. 主要画面

### 初期設定

- このアプリが扱わないことの確認
- 家庭名と端末利用者の作成
- データ保存先の説明
- Safe Channel連絡先の本人専用登録
- サンプル契約の任意追加

### Today

- 今日の契約と期限
- 自分が関係するRevision
- 現在のクールダウン状態
- `Monkuを残す`、`距離を置く`、`SOS`の明確な入口

家庭全体の「幸福度」「不満度ランキング」「最も違反した人」は表示しない。

### Contracts

- Active、Draft、Endedのタブ
- 契約詳細とVersion履歴
- 完了、再交渉、終了

### Monku

- 本人だけの一覧
- 共有状態を常時表示
- Revision差分へ変換
- エクスポートと削除

### Revision

- 変更前と変更後の差分
- 影響を受けるノード
- 必要な合意と現在の承認状況
- Constitution検査結果
- 承認、拒否、保留

### Cooldown

- 対象接続、期間、許可チャネル
- 残り時間
- 延長、限定接続、退出、再接続

### Safety

- 通常画面から1操作で到達可能
- 戻る履歴や通知プレビューへの表示は最小化
- 端末内保存、連絡先を開く、外部共有の選択
- 有効なCapability Leaseと失効時刻

### Settings

- メンバーと端末
- AI opt-in
- データエクスポート、インポート、全削除
- Constitutionの閲覧
- 監査ログの整合性確認

---

## 12. セキュリティとプライバシー

Codexは実装前に簡潔な脅威モデルを `docs/threat-model.md` として作成する。

最低限扱う脅威:

- 同じ端末を別の家族が開く。
- 親または管理者が子供のMonkuやSOSを読む。
- 家族多数派がRevisionで少数者の権利を削る。
- ブラウザ履歴、通知、バックアップからSOSが露見する。
- AI providerへ不要な個人情報が送信される。
- 端末紛失後もCapabilityが有効なままになる。
- 監査ログが証拠本文の集積所になる。
- エクスポートファイルが平文で放置される。

MVP要件:

- アプリロックまたはWebAuthnを利用できる。
- MonkuとSafetyデータは端末内で暗号化する。
- 鍵はデータ本体と同じIndexedDBレコードに平文保存しない。
- 画面離脱時にSafety本文を再表示しない。
- 通知本文にMonku、SOS、Revision理由を書かない。
- AI送信前に送信内容を確認できる。
- エクスポートは暗号化形式を既定にする。
- 削除は対象と結果を明示し、復元不能性を説明する。

ブラウザだけで安全に実現できない要件は、実現したように見せず制約を文書化する。

---

## 13. Codexの実装手順

### Phase 0: 発見と意思決定

1. 既存ファイル、Git状態、利用可能なランタイムを確認する。
2. 既存の設計資料から用語集を作る。
3. `docs/assumptions.md` にMVPの前提と非目標を書く。
4. `docs/threat-model.md` を作成する。
5. 技術構成が既存リポジトリと衝突する場合だけ、ユーザーへ選択を求める。

完了条件: 実装対象、非対象、データ境界、未決事項が文章化されている。

### Phase 1: プロジェクト基盤

1. Vite + React + TypeScriptを初期化する。
2. lint、typecheck、unit test、E2E testを設定する。
3. PWA manifestとoffline shellを作る。
4. デザイントークンとレスポンシブなapp shellを作る。

完了条件: `dev`、`build`、`test`、`lint`が実行でき、モバイルとデスクトップで空でないapp shellが表示される。

### Phase 2: Domain Core

1. Protocol Constitutionを純粋関数として実装する。
2. ContractVersionの状態遷移を実装する。
3. 契約種別ごとのconsensus計算を実装する。
4. Revisionのdiffとmerge条件を実装する。
5. CooldownとCapability LeaseのTTLを実装する。
6. AuditEntryのハッシュチェーンを実装する。

完了条件: UIなしで全状態遷移をテストでき、Constitution違反が必ず拒否される。

### Phase 3: Local Data

1. Dexie schemaとrepositoryを実装する。
2. schema migrationテストを作る。
3. MonkuとSafetyデータの暗号化境界を作る。
4. 暗号化エクスポート、インポート、全削除を実装する。

完了条件: リロードとオフラインでデータが保持され、別メンバーのprivateデータを通常UIから取得できない。

### Phase 4: 日常利用MVP

1. 初期設定を実装する。
2. TodayとContractsを実装する。
3. Monkuのprivate保存を実装する。
4. Revision差分と合意UIを実装する。
5. 手動Cooldownを実装する。

完了条件: 家事契約の作成からRevision採用までをスマートフォンだけで完了できる。

### Phase 5: Safety UI

1. Protected Interrupt入口を実装する。
2. 本人専用Safety画面を実装する。
3. Capability Leaseの発行、表示、失効、取消を実装する。
4. 外部送信はmock adapterまでとし、実送信しない。
5. 通知、履歴、共有プレビューからの情報漏えいを確認する。

完了条件: SOSから安全画面へ1操作で移動でき、共有は明示確認なしに発生せず、TTL満了後に権限が閉じる。

### Phase 6: AI Draft

1. AIなしのtemplate converterを先に作る。
2. provider非依存のAI adapterを作る。
3. Zod schema、redaction、送信前previewを実装する。
4. AI出力がConstitutionを迂回できないテストを作る。

完了条件: AIを無効にして全機能を使え、AI提案は必ず未採用Draftとして止まる。

### Phase 7: QAと家庭内パイロット

1. unit、integration、E2E、accessibility testを実行する。
2. 360px、768px、desktopで表示を確認する。
3. オフライン、端末再起動、期限満了、時計ずれを試す。
4. 下記パイロット手順で2週間試す。
5. 収集する指標を匿名の集計値に限定する。

完了条件: 重大なデータ漏えい、権限越境、行き止まりがなく、いつでも紙や口頭の運用へ戻れる。

---

## 14. 必須テスト

### Constitution

- SOS入口を無効にするRevisionを拒否する。
- protected nodeの拒否権削除を拒否する。
- Monku本文を本人同意なしで共有する処理を拒否する。
- AIによるRevision直接mergeを拒否する。
- 期限なしCapability Leaseを拒否する。

### Consensus

- `N = 2, 3, 4, 5, 8` で必要承認数が `floor(N / 2) + 1` になる。
- 過半数の賛成があっても、反対者本人の個人権利を縮小するRevisionは採用しない。
- 棄権者を分母から除外せず、少数投票だけで共有契約を採用しない。
- 個人間契約は影響を受ける全員を必要とする。
- 被申告者単独でSafety制限を解除できない。

### Privacy

- Node-01はNode-02のprivate Monku本文を読めない。
- diff-only共有で元本文を返さない。
- 監査ログに秘密本文が含まれない。
- 通知と画面タイトルにSOS内容が出ない。

### TTL

- Capability Leaseが期限時刻に失効する。
- オフライン中に期限を越えても、再接続時に復活しない。
- 端末時刻変更を検知して再確認を要求する。
- 延長には新しい明示承認が必要である。

### Exit

- クールダウン終了後に再接続を強制しない。
- 限定接続、延長、退出を選べる。
- 退出してもデータエクスポートとSafety導線を利用できる。

---

## 15. 家庭内パイロット手順

### Week 0: 合意

- 全員で目的と非目標を確認する。
- 子供を含め、参加しない権利を確認する。
- アプリ外の緊急連絡方法を決める。
- まず1台または各自端末のどちらで試すか決める。
- いつでも実験を停止できる合図を決める。

### Week 1: 日常契約だけ

- 契約は最大3件にする。
- Monkuはprivate保存だけ使う。
- AI、Safety Bridge、ポイント、センサー連携を使わない。
- 毎日5分以内の操作に収める。

### Week 2: RevisionとCooldown

- Revisionを1件だけ試す。
- 手動Cooldownを試すが、物理的な権限制御は行わない。
- 再接続以外の出口が自然に選べるか確認する。

### 振り返り

本人ごとに次をprivate回答し、共有したい項目だけ家族で見る。

- 曖昧な期待が減ったか。
- アプリに監視されている感覚が増えたか。
- 拒否や保留を選びやすかったか。
- 使わない自由が保たれたか。
- 操作が新しい家事負担になっていないか。
- 拒否を関係否定と混同しなくなったか。
- 多数決と本人同意の対象を区別できたか。
- 人格ではなく接続条件を変更できたか。
- 強い制限の前に可逆的な停止を選べたか。
- アプリなしでも同じ考え方を使えたか。

中止条件:

- アプリ画面を見せることが強制される。
- private Monkuの開示を要求される。
- SOS利用が罰や嘲笑につながる。
- アプリが口論の新しい武器になる。
- protected nodeが参加停止を希望する。

---

## 16. 完成条件

Codexは、次をすべて満たすまで「完成」としない。

- READMEにセットアップ、データ保存、既知の制約がある。
- サンプル家庭データで主要4シナリオを試せる。
- Protocol Constitutionがコードとテストに存在する。
- private Monkuを他メンバーが取得できない。
- Revisionの必要合意が契約種別ごとに異なる。
- SOSが判決や自動制裁を発生させない。
- Capability Leaseが自動失効する。
- 再接続以外の正常終了が選べる。
- AIを完全に無効化できる。
- lint、typecheck、unit、E2Eが通る。
- モバイルとデスクトップのスクリーンショットを確認している。
- 実装していない安全機能を実装済みのように表現していない。

---

## 17. Codexへ渡す開始プロンプト

```text
docs/aperture-home-experiment-roadmap.md を全体工程として読み、
docs/aperture-home-codex-implementation-plan.md を実装指示書として使用してください。
docs/p2p-aperture-simulation-design.md と docs/aperture-home-spec.md も参照してください。

まずPhase 0を実施し、既存リポジトリを確認したうえで、
apps/aperture-home にあるローカルファーストPWAを確認し、未完了のPhaseから継続してください。

Protocol Constitutionと「実験版では実装しない」の項目を変更しないでください。
AI、クラウド同期、外部送信は初期状態で無効にしてください。
実装はPhaseごとにテストし、作業を途中の提案だけで止めず、
MVPの実装、検証、README更新、ローカル開発サーバー起動まで進めてください。

既存ファイルやユーザーの変更を上書きせず、依存関係の選択が既存構成と
重大に衝突する場合だけ質問してください。
```
