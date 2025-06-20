import { command, positional} from "@drizzle-team/brocli";
import crypto from "crypto";

const hash = command({
  name: "hash",
  help: `Usage:
  vinx hash <text> [algorithm] [flags]

Global flags:
  -h, --help      help for hash
  -v, --version   version for vinx
  
Available Hash Algorithms:
  ${crypto.getHashes().join(", ")}`,
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

export default hash;