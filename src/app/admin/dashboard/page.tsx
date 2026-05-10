export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-2">
            Programs
          </h2>

          <p className="text-3xl font-bold text-green-700">
            10
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-2">
            Galleries
          </h2>

          <p className="text-3xl font-bold text-green-700">
            8
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-2">
            Anak Asuh
          </h2>

          <p className="text-3xl font-bold text-green-700">
            25
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-2">
            Donations
          </h2>

          <p className="text-3xl font-bold text-green-700">
            15
          </p>
        </div>

      </div>
    </div>
  );
}