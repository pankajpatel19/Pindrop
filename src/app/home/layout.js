import HomeComponent from "@/components/ui/SIdeBar";

function HomeLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <main className="flex-1 h-full overflow-y-auto p-5 bg-gray-50">
        {children}
      </main>
    </div>
  );
}

export default HomeLayout;
