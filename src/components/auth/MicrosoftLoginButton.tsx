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
    <button 
      onClick={onClick} 
      className="w-full px-4 py-3 bg-[#2F2F2F] hover:bg-[#3A3A3A] text-white rounded-lg font-medium text-sm transition duration-200 flex items-center justify-center gap-2 border border-border-secondary hover:border-border-primary"
    >
      <svg className="w-5 h-5" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="10" height="10" fill="#F25022"/>
        <rect x="12" y="0" width="10" height="10" fill="#7FBA00"/>
        <rect x="0" y="12" width="10" height="10" fill="#00A4EF"/>
        <rect x="12" y="12" width="10" height="10" fill="#FFB900"/>
      </svg>
      {label}
    </button>
  );
}


