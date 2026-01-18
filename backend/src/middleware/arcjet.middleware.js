import aj from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const arcjetProtect = async (req, res, next) => {
  try {
    const decision = await aj.protect(req);

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res
          .status(429)
          .json({ message: "too many requests , please wait" });
      } else if (decision.reason.isBot()) {
        return res.status(403).json({ message: "Bot detected" });
      } else {
        return res
          .status(403)
          .json({ message: "accesss denied by security policy" });
      }
    }

    if (decision.results.some(isSpoofedBot)) {
      return res
        .status(403)
        .json({ message: "accesss denied by security policy" });
    }

    next();
  } catch (e) {
    console.log("Arject Protect middleware error:", e);
    next();
  }
};
