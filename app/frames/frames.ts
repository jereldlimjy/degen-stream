import { createFrames } from "frames.js/next";
import { farcasterHubContext } from "frames.js/middleware";

export const frames: any = createFrames({
    basePath: "/frames",
    middleware: [farcasterHubContext()],
});
