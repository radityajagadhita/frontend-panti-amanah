export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen bg-green-50 flex items-center justify-center"
    >
      <div className="text-center max-w-3xl px-6">
        <h1 className="text-6xl font-bold text-green-700 leading-tight">
          Bersama Membantu Anak-anak Panti
        </h1>

        <p className="mt-6 text-gray-600 text-lg">
          Mari berbagi kebahagiaan dan membantu masa depan
          anak-anak yang membutuhkan.
        </p>

        <a
          href="/donasi"
          className="inline-block mt-8 bg-green-700 text-white px-8 py-4 rounded-xl"
        >
          Donasi Sekarang
        </a>
      </div>
    </section>
  );
}