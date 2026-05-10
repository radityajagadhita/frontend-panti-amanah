export default function Navbar() {
  return (
    <nav className="w-full px-10 py-5 flex items-center justify-between bg-white shadow-sm">
      <h1 className="text-2xl font-bold text-green-700">
        Panti Amanah
      </h1>

      <div className="flex gap-6 text-sm font-medium">
        <a href="#home">Home</a>
        <a href="#program">Program</a>
        <a href="#gallery">Gallery</a>
        <a href="#donasi">Donasi</a>
      </div>
    </nav>
  );
}