import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { timeframes } from "../src/features/home/components/Contact/contactFormConfig.js";

test("PHP contact endpoint accepts every timeframe the forms offer", async () => {
  const php = await readFile(new URL("../public/api/contact.php", import.meta.url), "utf8");
  const accepted = php.match(/const TIMEFRAMES = \[(.*)\];/)?.[1];
  assert.ok(accepted, "TIMEFRAMES constant not found in contact.php");
  assert.deepEqual(
    [...accepted.matchAll(/'([^']*)'/g)].map((match) => match[1]),
    timeframes,
  );
});
