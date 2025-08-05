import { NODE_ENV } from "../config/env.js";
export const devLog = (...args) => {
    if (NODE_ENV === "development") console.log("[DEV]", ...args);
};
