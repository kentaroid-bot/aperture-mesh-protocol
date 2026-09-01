# Drafts

このディレクトリには、会話で生まれたものの、まだ正式仕様、ロードマップ、実装計画として採用されていない提案を置く。

Draftは次のいずれも意味しない。

- Aperture Mesh Protocolへの正式採用
- 実装または安全性検証の完了
- 法務、労務、医療、福祉上の妥当性
- シミュレーションまたは実地実験による有効性の証明

## Status

各Draftは冒頭に次の状態を記載する。

```text
idea         問題提起または初期構想
proposal     設計候補と境界が記述されている
experiment   反証可能な仮説と検証方法が定義されている
candidate    正式文書への統合候補
superseded   別文書または実装に置き換えられた
rejected     理由を記録して不採用になった
```

## Promotion Gate

Draftを `docs/` または `apps/` へ移す前に、最低限次を確認する。

1. 目的、対象Node、非目標が明確である。
2. Constitutionと既存の安全境界に矛盾しない。
3. 権力差、監視、報復、退出妨害、Protocol Captureを検討している。
4. 反証可能な仮説と停止条件がある。
5. 実装する場合、最小の低リスク範囲とテスト方法が定義されている。
6. 正式文書へ統合するか、独立文書として維持するかが決まっている。

## Handoff

新しいCodexタスクでは、次の順で読む。

1. [`../README.md`](../README.md)
2. [`../docs/00-overview.md`](../docs/00-overview.md)
3. [`../docs/aperture-mesh-civilization-roadmap.md`](../docs/aperture-mesh-civilization-roadmap.md)
4. [`../docs/epistemic-and-embodied-consensus.md`](../docs/epistemic-and-embodied-consensus.md)
5. 対象のDraft

Draftの「Decisions Needed」を確認し、会話だけで確定した扱いにしない。設計判断を行った場合は、判断理由と却下した代案をDraftへ追記する。

## Current Drafts

- [`aperture-development-mesh.md`](aperture-development-mesh.md): Monku、Draft、Git、Codexを用いたWorkspace運用モデル
- [`aperture-project-history.md`](aperture-project-history.md): Morphidism前史、Monku、反例、Revision、Git記録を接続する認識論的Version History
- [`aperture-workplace-pilot.md`](aperture-workplace-pilot.md): 小規模事業所を第二の実験環境として扱う提案
