import LogoutButton from "components/logout-button";
import { createServerSupabaseClient } from "utils/supabase/server";

export const metadata = {
  title: "Instagram",
  description: "Instagram Clone",
};

export default async function Home() {
  const supabase = await createServerSupabaseClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();
  return (
    <main className="w-full h-screen flex flex-col gap-2 items-center justify-center">
      <h1 className="text-xl font-bold">
        Welcome {`${session?.user?.email?.split("@")?.[0]}`}
      </h1>
      <LogoutButton />
    </main>
  );
}
