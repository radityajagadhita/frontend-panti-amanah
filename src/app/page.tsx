import Sidebar from "../components/admin/Sidebar";
import Navbar from "../components/admin/Navbar";
import Hero from "../components/Hero";
import ProgramSection from "../components/ProgramSection";

export const metadata = {
  title: "Panti Amanah",
  description:
    "Panti Amanah adalah sebuah organisasi yang didedikasikan untuk memberikan bantuan dan dukungan kepada anak-anak yatim piatu, kaum dhuafa, dan masyarakat kurang mampu. Kami berkomitmen untuk menciptakan lingkungan yang aman, nyaman, dan penuh kasih sayang bagi mereka yang membutuhkan. Melalui berbagai program sosial, pendidikan, dan kesehatan, kami berusaha untuk meningkatkan kualitas hidup mereka dan memberikan harapan untuk masa depan yang lebih baik.",
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