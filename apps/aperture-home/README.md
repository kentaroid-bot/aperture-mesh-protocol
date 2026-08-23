# Aperture Home

家庭の感情・人格・動機を評価せず、外部へ表れた依頼、約束、期限、境界、アクセス条件だけを扱うローカルファーストPWAです。一般公開サービスではなく、目的と非目標に同意した1家庭向けの実験版です。

## 現在のMVP

- 2人以上のMember Nodeと人数非依存の合意計算
- Versionを上書きしない家庭内Contract
- 本人別にAES-GCM暗号化するprivate Monku
- Monku本文を共有しないローカルテンプレートRevision
- Constitution検査、差分表示、契約種別ごとの合意
- 手動Cooldownと、通常接続・限定接続・延長・退出の選択
- 1操作で開けるProtected Interrupt
- scope、purpose、TTL必須のCapability Leaseと自動失効・取消
- 秘密本文を含めないSHA-256監査ハッシュチェーン
- 暗号化エクスポート／インポートと全削除
- Service Worker、manifest、offline app shell

AI、クラウド同期、外部送信は初期状態で無効で、MVPには有効化操作もありません。外部ネットワークへ接続するコードやテレメトリーもありません。

## セットアップ

要件: Node.js 20以上、npm 10以上。

```bash
cd apps/aperture-home
npm install
npm run dev
```

表示された `http://127.0.0.1:5173/` をブラウザで開きます。初期設定では2人以上の名前、この端末利用者のPIN、任意のSafe Channelを登録します。サンプル契約の追加はチェックで選べます。

本番相当のローカル確認:

```bash
npm run build
npx vite preview --host 127.0.0.1
```

## テスト

```bash
npm run lint
npm run typecheck
npm test
npm run test:e2e
```

E2EはPlaywright Chromiumを使います。初回だけ `npx playwright install chromium` が必要です。mobile（Pixel 7相当）とdesktopで、初期設定、SOS導線、契約作成、private Monku、主要レスポンシブ表示を確認します。

## 主要4シナリオの試し方

1. **家事契約**: 初期設定でサンプル契約を追加するか、契約画面から入力・出力・期限・影響メンバーを指定します。
2. **Monku → Revision**: Monku画面で本人専用メモを保存し、「ローカルテンプレートで差分化」を選びます。元本文はRevisionへ含まれません。
3. **Cooldown**: Todayの「距離を置く」から対象、期間、許可チャネルを選びます。SOSは常に残り、終了後は再接続以外も選べます。
4. **Protected Interrupt**: どの通常画面からも右下のSOSを1回押して本人専用画面を開けます。端末内記録、Safe Channel確認、現実の緊急連絡先確認を選べますが、アプリは外部送信しません。

## データ保存と鍵

- 正本はブラウザのIndexedDB `aperture-home` です。サーバーはありません。
- Monku、Safety Incident、Safe Channelは、PINからPBKDF2（SHA-256、210,000回）で導出した非抽出AES-GCM鍵で暗号化します。
- PINと鍵は保存しません。saltとPIN検証用の暗号化markerは設定テーブル、暗号化本文はprivate recordsに分離します。
- 利用者を切り替えるとセッション鍵を破棄します。別ownerIdの秘密レコードはrepositoryから取得できません。
- エクスポートは10文字以上の別パスフレーズでAES-GCM暗号化したJSONのみです。
- ブラウザデータを消すと復元できません。暗号化バックアップとパスフレーズは別々に安全な場所へ保管してください。

## Protocol Constitution

12条は [`src/domain/constitution.ts`](src/domain/constitution.ts) の固定値と純粋関数で実装しています。通常設定、投票、Revision、AIから変更できません。必須の拒否ケースはunit testにあります。

設計上の前提は [`docs/assumptions.md`](docs/assumptions.md)、脅威とブラウザだけでは解決できない制約は [`docs/threat-model.md`](docs/threat-model.md) を参照してください。

## 既知の制約

- Webアプリは、OS管理者、ロック解除済み画面の覗き見、侵害済み端末を防げません。共有端末ではOSアカウント分離を併用してください。
- 初期設定でPINを持つのは最初の端末利用者です。他のNodeはロック画面で本人が最初のPINを初期登録できます。共有端末での初回登録は、別人による先取りを防ぐため家庭内で確認しながら行ってください。
- ブラウザ時計の巻き戻しは検知してLeaseを再確認待ちにできますが、信頼できる時刻証明ではありません。
- PWAのオフライン利用は一度オンラインで読み込み、Service Workerの登録が完了した後に有効です。
- 通知を送らないため、通知本文漏えいはありません。期限のOS通知もありません。
- AI adapterは無効なstubです。remote AI、送信前preview、redaction UIは将来フェーズで、有効化されていません。
- 外部送信はmock相当の説明表示だけです。電話、メッセージ、通報、クラウド同期は行いません。
- このアプリは緊急対応、医療、法律相談、児童保護の代替ではありません。

## 実装しない機能

常時録音、感情・人格・虐待・虚偽・善悪・責任主体のAI判定、自動通報、スマートロック・Wi-Fi・金銭・食事・医療の自動制限、子供の常時位置追跡、秘密管理者、親だけの全閲覧、通報報酬、明示操作なしの同期、取り消せない制裁は実装しません。
