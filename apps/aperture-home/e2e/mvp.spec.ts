import { expect, test } from "@playwright/test";

async function onboard(page: import("@playwright/test").Page) {
  await page.goto("/");
  await page.getByRole("button", { name: /理解してはじめる/ }).click();
  await page.getByRole("button", { name: /次へ/ }).click();
  await page.getByLabel(/PIN/).fill("123456");
  await page.getByLabel(/サンプル契約を追加/).uncheck();
  await page.getByRole("button", { name: /端末内に作成/ }).click();
  await expect(page.getByRole("heading", { name: /おかえりなさい/ })).toBeVisible();
}

test("onboarding keeps external capabilities off and SOS reachable", async ({ page }, testInfo) => {
  await onboard(page);
  await page.getByRole("link", { name: /SOS/ }).click();
  await expect(page.getByRole("heading", { name: "安全な選択肢" })).toBeVisible();
  await expect(page.getByText("SOSは判決ではありません。")).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath("safety.png"), fullPage: true });
});

test("creates a contract and stores a private Monku", async ({ page }, testInfo) => {
  await onboard(page);
  await page.getByRole("link", { name: "契約" }).click();
  await page.getByRole("button", { name: /新しい契約/ }).click();
  await page.getByLabel("タイトル").fill("火曜のゴミ出し");
  await page.getByLabel("入力・依頼").fill("分別済みの袋");
  await page.getByLabel("出力・完了条件").fill("集積所へ移動");
  await page.getByRole("button", { name: "端末内に保存" }).click();
  await expect(page.getByRole("heading", { name: "火曜のゴミ出し" })).toBeVisible();
  await page.getByRole("link", { name: "Monku" }).click();
  await page.getByLabel("いま残しておきたいこと").fill("期限が少し曖昧だった");
  await page.getByRole("button", { name: /非公開で保存/ }).click();
  await expect(page.getByText("期限が少し曖昧だった")).toBeVisible();
  await expect(page.getByText("非公開", { exact: true })).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath("monku.png"), fullPage: true });
});

test("mobile Today layout is usable", async ({ page }, testInfo) => {
  await onboard(page);
  await expect(page.getByText("選べる接続を、")).toBeVisible();
  await expect(page.getByRole("navigation", { name: "メインナビゲーション" })).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath("today.png"), fullPage: true });
});
