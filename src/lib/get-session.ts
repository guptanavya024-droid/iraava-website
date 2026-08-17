import { cache } from "react";
import { auth } from "./auth";

// Deduplicates auth() calls within a single request — the admin layout and
// each admin page both call this.
export const getSession = cache(auth);
