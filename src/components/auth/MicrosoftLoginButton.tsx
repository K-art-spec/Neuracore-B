"use client";

import React from "react";
import { createClient } from "@/app/lib/supabase/client";

type Props = {
  label?: string; // Optional button label
  redirectTo?: string; // Optional custom redirect URI (defaults to current origin)
};

export default function MicrosoftLoginButton({ label = "Sign in with Microsoft", redirectTo }: Props) {
  const onClick = async () => {
    const supabase = createClient();
    const redirect = redirectTo ?? `${window.location.origin}`;
    // Use Supabase OAuth for Microsoft (azure). No extra libs.
    await supabase.auth.signInWithOAuth({
      provider: "azure",
      options: {
        redirectTo: redirect,
        queryParams: {
          // Request basic scopes for profile and email
          scope: "openid profile email",
        },
      },
    });
  };

  return (
    <button onClick={onClick} className="px-3 py-2 rounded border">
      {label}
    </button>
  );
}


