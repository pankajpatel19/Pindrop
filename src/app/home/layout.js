import HomeComponent from "@/components/Home/HomeComponent";

function HomeLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-20 shrink-0">
        <HomeComponent />
      </div>

      <main className="flex-1 h-full overflow-y-auto p-5 bg-gray-50">
        {children}
      </main>
    </div>
  );
}

export default HomeLayout;
