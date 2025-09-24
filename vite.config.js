import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  define: {
    global:
      {} /** https://dev.to/richardbray/how-to-fix-the-referenceerror-global-is-not-defined-error-in-sveltekitvite-2i49 */,
  },
  plugins: [react()],
});
