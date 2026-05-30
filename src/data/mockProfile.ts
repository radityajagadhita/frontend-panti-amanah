export interface OrganizationProfile {
  sambutan: {
    name: string;
    title: string;
    message: string;
  };
  vision: string;
  mission: string[];
  motto: string;
  history: {
    year: number;
    title: string;
    description: string;
  }[];
}

export const organizationProfile: OrganizationProfile = {
  sambutan: {
    name: "H. Muhammad Ridwan, S.Pd.I",
    title: "Ketua Yayasan Panti Amanah",
    message:
      "Assalamu'alaikum Warahmatullahi Wabarakatuh. Alhamdulillah, segala puji bagi Allah SWT yang telah memberikan rahmat dan hidayah-Nya sehingga Panti Amanah dapat terus berdiri dan berkembang hingga saat ini. Atas nama seluruh keluarga besar Panti Amanah, saya mengucapkan terima kasih yang sebesar-besarnya kepada seluruh donatur, relawan, dan masyarakat yang telah memberikan dukungan tanpa henti. Setiap bantuan yang diberikan, sekecil apapun, sangat berarti bagi anak-anak kami. Mari bersama-sama kita wujudkan masa depan yang lebih cerah bagi generasi penerus bangsa. Jazakumullahu Khairan Katsiran.",
  },
  vision:
    "Menjadikan PSAA Amanah sebagai pusat kegiatan Islam dalam membentuk generasi muslim yang kaffah.",
  mission: [
    "Menerapkan pola didik kepada anak asuh sesuai dengan sunah Rasulullah SAW.",
    "Memfasilitasi anak asuh untuk memperoleh pendidikan formal sampai tingkat perguruuan tinggi.",
    "Mem,bentuk dan membina anak asuh yang berdedikasi tinggi serta konsen terhadap perkembangan dan kemajuan.",
    "Membentuk dan membina anak asuh agar memiliki akhlaqul karimah terhadap masyarakat."
  ],
  motto: "Merawat Dengan Kasih, Mendidik Dengan Hati, Membangun Masa Depan Gemilang",
  history: [
    {
      year: 2013,
      title: "Awal Pendirian",
      description:
        "Panti Amanah didirikan oleh sekelompok tokoh masyarakat yang prihatin terhadap kondisi anak-anak yatim piatu di lingkungan sekitar. Dimulai dengan 5 anak asuh dan sebuah rumah sederhana.",
    },
    {
      year: 2015,
      title: "Pembangunan Gedung Baru",
      description:
        "Berkat dukungan donatur, Panti Amanah berhasil membangun gedung baru yang lebih layak dengan fasilitas pendidikan dan tempat tinggal yang memadai.",
    },
    {
      year: 2018,
      title: "Perluasan Program",
      description:
        "Program panti diperluas dengan menambahkan kelas komputer, les bahasa Inggris, dan pelatihan keterampilan bagi anak-anak yang lebih besar.",
    },
    {
      year: 2020,
      title: "Adaptasi di Masa Pandemi",
      description:
        "Panti Amanah berhasil beradaptasi selama pandemi COVID-19 dengan menyelenggarakan pembelajaran daring dan tetap menjaga kesehatan seluruh penghuni.",
    },
    {
      year: 2023,
      title: "Pencapaian 10 Tahun",
      description:
        "Merayakan satu dekade dengan lebih dari 40 anak asuh aktif, puluhan alumni yang sukses, dan jaringan donatur yang terus berkembang.",
    },
    {
      year: 2025,
      title: "Era Digital",
      description:
        "Meluncurkan platform digital untuk memperluas jangkauan dan transparansi, memudahkan donatur untuk berpartisipasi dan memantau perkembangan anak-anak asuh.",
    },
  ],
};
