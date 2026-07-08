"use client";

import { authClient } from "@/lib/auth-client";

export default function AuthPage() {
  return (
    <div>
      <button
        onClick={async () => {
          await authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
          });
        }}
      >
        Continue with google
      </button>
      <button
        onClick={async () => {
          await authClient.signIn.social({
            provider: "github",
            callbackURL: "/",
          });
        }}
      >
        Continue with github
      </button>
    </div>
  );
}
