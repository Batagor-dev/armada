import { Blog } from "@/types/blog";

export const getBlogBySlug = (slug: string) => {
  return BLOGS_DATABASE.find((blog) => blog.slug === slug);
};

export const getBlogById = (id: number) => {
  return BLOGS_DATABASE.find((blog) => blog.id === id);
};

export const BLOGS_DATABASE: Blog[] = [
  {
    id: 1,
    slug: "tips-memilih-mobil-rental-untuk-perjalanan-jauh",
    title: "Tips Memilih Mobil Rental yang Tepat untuk Perjalanan Jauh",
    description:
      "Biar perjalanan kamu aman dan nyaman, ini hal-hal yang wajib kamu perhatiin sebelum sewa mobil.",
    tag: "Tips",
    date: "12 Jun 2026",
    readTime: "5 min read",
    author: "Admin ArmadaKita",
    authorRole: "Content Writer",
    img: "https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=600&h=400&q=80",
    content: [
      {
        body: "Perjalanan jarak jauh membutuhkan kendaraan yang nyaman, aman, dan sesuai kebutuhan. Memilih mobil rental yang tepat dapat membuat perjalanan lebih menyenangkan serta mengurangi risiko kendala di jalan.",
      },
      {
        heading: "Pilih Sesuai Jumlah Penumpang",
        body: "Pastikan kapasitas kendaraan sesuai dengan jumlah penumpang dan barang bawaan. Jangan memaksakan kendaraan kecil untuk perjalanan keluarga besar.",
      },
      {
        heading: "Perhatikan Kondisi Kendaraan",
        body: "Cek kondisi ban, rem, lampu, AC, dan kelengkapan dokumen kendaraan sebelum berangkat agar perjalanan tetap aman dan nyaman.",
      },
    ],
    relatedIds: [2, 3, 4],
  },

  {
    id: 2,
    slug: "kenapa-rental-mobil-lepas-kunci-lebih-fleksibel",
    title: "Kenapa Rental Mobil Lepas Kunci Lebih Fleksibel?",
    description:
      "Bebas atur waktu, rute, dan privasi. Tapi tetap ada hal penting yang harus kamu tahu.",
    tag: "Insight",
    date: "10 Jun 2026",
    readTime: "4 min read",
    author: "Admin ArmadaKita",
    authorRole: "Content Writer",
    img: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=600&h=400&q=80",
    content: [
      {
        body: "Layanan rental mobil lepas kunci semakin diminati karena memberikan kebebasan penuh kepada penyewa untuk mengatur perjalanan sesuai kebutuhan.",
      },
      {
        heading: "Lebih Privat",
        body: "Kamu bisa menikmati perjalanan bersama keluarga atau teman tanpa kehadiran pihak lain di dalam kendaraan.",
      },
      {
        heading: "Atur Jadwal Sendiri",
        body: "Tidak perlu menyesuaikan waktu dengan sopir sehingga lebih fleksibel untuk kebutuhan bisnis maupun liburan.",
      },
    ],
    relatedIds: [1, 3, 4],
  },

  {
    id: 3,
    slug: "perbedaan-sewa-harian-vs-mingguan",
    title: "Perbedaan Sewa Harian vs Mingguan, Mana Lebih Hemat?",
    description:
      "Jangan salah pilih paket. Kadang lebih lama justru lebih murah.",
    tag: "Panduan",
    date: "8 Jun 2026",
    readTime: "6 min read",
    author: "Admin ArmadaKita",
    authorRole: "Content Writer",
    img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&h=400&q=80",
    content: [
      {
        body: "Banyak penyewa bingung memilih antara paket harian dan mingguan. Padahal keduanya memiliki kelebihan masing-masing tergantung kebutuhan.",
      },
      {
        heading: "Sewa Harian",
        body: "Cocok untuk kebutuhan singkat seperti perjalanan bisnis, acara keluarga, atau wisata satu hingga dua hari.",
      },
      {
        heading: "Sewa Mingguan",
        body: "Biasanya menawarkan harga lebih ekonomis per hari sehingga cocok untuk perjalanan panjang atau kebutuhan operasional.",
      },
    ],
    relatedIds: [1, 2, 4],
  },

  {
    id: 4,
    slug: "cara-aman-sewa-mobil-untuk-pemula",
    title: "Cara Aman Sewa Mobil untuk Pemula",
    description:
      "Buat kamu yang baru pertama kali, ini checklist biar gak kena masalah di jalan.",
    tag: "Guide",
    date: "5 Jun 2026",
    readTime: "5 min read",
    author: "Admin ArmadaKita",
    authorRole: "Content Writer",
    img: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&h=400&q=80",
    content: [
      {
        body: "Menyewa mobil untuk pertama kali bisa terasa membingungkan. Dengan memahami beberapa langkah penting, proses sewa akan jauh lebih aman dan nyaman.",
      },
      {
        heading: "Periksa Dokumen",
        body: "Pastikan STNK kendaraan aktif dan data kendaraan sesuai dengan yang tercantum pada dokumen.",
      },
      {
        heading: "Dokumentasikan Kondisi Mobil",
        body: "Foto bagian luar dan dalam kendaraan sebelum digunakan untuk menghindari kesalahpahaman saat pengembalian.",
      },
    ],
    relatedIds: [1, 2, 3],
  },
];