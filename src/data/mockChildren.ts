export interface Child {
  id: number;
  name: string;
  age: number;
  dateOfBirth: string;
  hobby: string;
  gender: "L" | "P";
  bio: string;
  imageUrl: string | null;
}

export const children: Child[] = [
  {
    id: 1,
    name: "Ahmad Fauzan",
    age: 12,
    dateOfBirth: "2014-03-15",
    hobby: "Sepak Bola",
    gender: "L",
    bio: "Ahmad adalah anak yang ceria dan penuh semangat. Ia sangat menyukai olahraga, terutama sepak bola. Di sekolah, Ahmad dikenal sebagai siswa yang rajin dan suka membantu teman-temannya.",
    imageUrl: null,
  },
  {
    id: 2,
    name: "Siti Aisyah",
    age: 10,
    dateOfBirth: "2016-07-22",
    hobby: "Menggambar",
    gender: "P",
    bio: "Siti memiliki bakat seni yang luar biasa. Setiap hari ia menghabiskan waktu untuk menggambar dan mewarnai. Cita-citanya adalah menjadi seorang desainer grafis.",
    imageUrl: null,
  },
  {
    id: 3,
    name: "Rizky Pratama",
    age: 14,
    dateOfBirth: "2012-01-08",
    hobby: "Membaca",
    gender: "L",
    bio: "Rizky adalah kutu buku sejati. Ia bisa menghabiskan berjam-jam membaca buku cerita dan ensiklopedia. Ia bercita-cita menjadi seorang ilmuwan.",
    imageUrl: null,
  },
  {
    id: 4,
    name: "Fatimah Az-Zahra",
    age: 9,
    dateOfBirth: "2017-11-30",
    hobby: "Memasak",
    gender: "P",
    bio: "Fatimah senang membantu di dapur dan belajar memasak berbagai hidangan. Ia sering membuatkan kue untuk teman-temannya di panti.",
    imageUrl: null,
  },
  {
    id: 5,
    name: "Dimas Ardiansyah",
    age: 13,
    dateOfBirth: "2013-05-17",
    hobby: "Bermain Musik",
    gender: "L",
    bio: "Dimas sangat berbakat dalam musik. Ia bisa memainkan gitar dan rebana dengan sangat baik. Ia sering tampil di acara-acara panti.",
    imageUrl: null,
  },
  {
    id: 6,
    name: "Nur Haliza",
    age: 11,
    dateOfBirth: "2015-09-03",
    hobby: "Menari",
    gender: "P",
    bio: "Haliza adalah penari yang berbakat. Ia aktif mengikuti berbagai lomba tari tradisional dan modern. Semangatnya selalu menginspirasi teman-temannya.",
    imageUrl: null,
  },
  {
    id: 7,
    name: "Budi Santoso",
    age: 15,
    dateOfBirth: "2011-12-25",
    hobby: "Coding",
    gender: "L",
    bio: "Budi tertarik dengan teknologi sejak kecil. Ia sedang belajar pemrograman dasar dan bermimpi membuat aplikasi yang bermanfaat bagi masyarakat.",
    imageUrl: null,
  },
  {
    id: 8,
    name: "Aisyah Putri",
    age: 8,
    dateOfBirth: "2018-04-12",
    hobby: "Bernyanyi",
    gender: "P",
    bio: "Aisyah memiliki suara yang merdu. Ia sering menjadi penyanyi utama dalam acara-acara panti dan kegiatan keagamaan.",
    imageUrl: null,
  },
];
