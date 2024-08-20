import LogoutButton from "components/logout-button";

export const metadata = {
  title: "Instagram",
  description: "Instagram Clone",
};

export default function Home() {
  return (
    <main className="w-full h-screen flex flex-col gap-2 items-center justify-center">
      <h1 className="text-xl font-bold">Welcome {`"Kim YongMin"`}</h1>
      <LogoutButton />
    </main>
  );
}
