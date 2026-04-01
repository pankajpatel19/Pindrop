import {
  Bell,
  HomeIcon,
  Layout,
  MessageCircle,
  Settings,
  Upload,
} from "lucide-react";
import Link from "next/link";
function HomeComponent() {
  return (
    <>
      <aside className="sticky top-0 left-0 h-screen w-20 flex flex-col items-center py-5 gap-5 border-r bg-white">
        <Link
          href="/"
          className="p-3 rounded-full hover:bg-gray-100 transition-colors text-gray-800"
        >
          <HomeIcon size={25} />
        </Link>

        <Link
          href="/create"
          className="p-3 rounded-full hover:bg-gray-100 transition-colors text-gray-800"
        >
          <Upload size={25} />
        </Link>

        <Link
          href="/layout"
          className="p-3 rounded-full hover:bg-gray-100 transition-colors text-gray-800"
        >
          <Layout size={25} />
        </Link>

        <Link
          href="/updates"
          className="p-3 rounded-full hover:bg-gray-100 transition-colors text-gray-800 relative"
        >
          <Bell size={25} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-600 rounded-full border-2 border-white"></span>
        </Link>

        <Link
          href="/messages"
          className="p-3 rounded-full hover:bg-gray-100 transition-colors text-gray-800"
        >
          <MessageCircle size={25} />
        </Link>

        <div className="mt-auto mb-4">
          <Link
            href="/setting"
            className="p-3 rounded-full hover:bg-gray-100 transition-colors text-gray-800"
          >
            <Settings size={25} />
          </Link>
        </div>
      </aside>
    </>
  );
}

export default HomeComponent;
