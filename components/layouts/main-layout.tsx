import Sidebar from "components/sidebar";

export default async function MainLayout({ children }) {
  return (
    <main>
      <Sidebar />
      {children}
    </main>
  );
}
