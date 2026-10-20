import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const cwd = fileURLToPath(new URL("../", import.meta.url));
const processes = [
  spawn(process.execPath, ["--env-file-if-exists=.env", "server/index.js"], {
    cwd,
    stdio: "inherit",
  }),
  spawn(process.execPath, ["node_modules/vite/bin/vite.js", ...process.argv.slice(2)], {
    cwd,
    stdio: ["pipe", "inherit", "inherit"],
  }),
];

let stopping = false;
function stop(code = 0) {
  if (stopping) return;
  stopping = true;
  process.exitCode = code;
  for (const child of processes) child.kill();
}

for (const child of processes) {
  child.on("error", (error) => {
    console.error(error.message);
    stop(1);
  });
  child.on("exit", (code) => stop(code ?? 1));
}
process.on("SIGINT", () => stop());
process.on("SIGTERM", () => stop());
