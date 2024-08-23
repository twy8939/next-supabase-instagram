"use client";
import { Button } from "@material-tailwind/react";
import React from "react";
import { createBrowserSupabaseClient } from "utils/supabase/client";

export default async function LogoutButton() {
  const supabase = createBrowserSupabaseClient();
  return (
    <Button
      onClick={async () => {
        supabase.auth.signOut();
      }}
      color="red"
    >
      로그아웃
    </Button>
  );
}
