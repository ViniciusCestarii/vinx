import { command, positional, run } from "@drizzle-team/brocli";
import crypto from "crypto";

const sha = command({
  name: "sha",
  options: {
    text: positional().desc("Text to hash").required(),
    algorithm: positional().desc("Hash algorithm").default("sha256"),
  },
  handler: (opts) => {
    try {
      const hash = crypto.createHash(opts.algorithm);
      hash.update(opts.text);
      console.log(hash.digest("hex"));
    } catch (error) {
      console.error(`Error: Invalid hash algorithm '${opts.algorithm}'`);
    }
  },
});

export default sha;