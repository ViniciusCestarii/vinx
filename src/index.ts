import { run } from "@drizzle-team/brocli";
import * as commands from "./commands/index"

const commandFunctions = Object.values(commands);

run(commandFunctions, {
  name: "vinx",
  version: process.env.VINX_VERSION,
});