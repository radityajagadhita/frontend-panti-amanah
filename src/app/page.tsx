import Sidebar from "../components/admin/Sidebar";
import Navbar from "../components/admin/Navbar";
import Hero from "../components/Hero";
import ProgramSection from "../components/ProgramSection";

export const metadata = {
  title: "Panti Amanah",
  description:
    "Panti Amanah adalah sebuah organisasi yang didedikasikan untuk membantu anak-anak yatim piatu dan masyarakat kurang mampu.",
};

export default function HomePage() {

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main className="p-8">
          <Hero />
          <ProgramSection />
        </main>
      </div>
    </div>
  );
}