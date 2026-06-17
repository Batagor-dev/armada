export default function Footer() {
  return (
    <footer id="footer" className="w-full pt-16 pb-8 bg-slate-900 text-slate-400 border-t border-slate-800">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-16 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Column */}
        <div className="space-y-6">
          <span className="font-sans text-2xl font-black text-white">
            Armada<span className="text-primary">Kita</span>
          </span>
          <p className="text-slate-400 text-sm pr-8 leading-relaxed">
            Penyedia layanan sewa mobil terpercaya dengan koleksi armada eksklusif dan prima untuk kenyamanan gaya hidup dan perjalanan Anda.
          </p>
          <div className="flex gap-4">
            <a
              className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300 group"
              href="#"
              aria-label="Share"
            >
              <span className="material-symbols-outlined text-slate-400 group-hover:text-white">
                share
              </span>
            </a>
            <a
              className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300 group"
              href="#"
              aria-label="Website"
            >
              <span className="material-symbols-outlined text-slate-400 group-hover:text-white">
                public
              </span>
            </a>
          </div>
        </div>

        {/* Links Column 1 */}
        <div className="space-y-6">
          <h5 className="text-white font-bold uppercase tracking-widest text-xs">Layanan</h5>
          <ul className="space-y-4 text-sm">
            <li>
              <a className="text-slate-400 hover:text-white transition-colors cursor-pointer" href="#fleet">
                Daftar Armada
              </a>
            </li>
            <li>
              <a className="text-slate-400 hover:text-white transition-colors cursor-pointer" href="#about">
                Tentang Kami
              </a>
            </li>
            <li>
              <a className="text-slate-400 hover:text-white transition-colors cursor-pointer" href="#tutorial">
                Cara Sewa
              </a>
            </li>
          </ul>
        </div>

        {/* Links Column 2 */}
        <div className="space-y-6">
          <h5 className="text-white font-bold uppercase tracking-widest text-xs">Perusahaan</h5>
          <ul className="space-y-4 text-sm">
            <li>
              <a className="text-slate-400 hover:text-white transition-colors cursor-pointer" href="#about">
                Tentang Kami
              </a>
            </li>
            <li>
              <a className="text-slate-400 hover:text-white transition-colors cursor-pointer" href="#blog">
                Blog & Berita
              </a>
            </li>
            <li>
              <a className="text-slate-400 hover:text-white transition-colors cursor-pointer" href="#">
                Pusat Bantuan
              </a>
            </li>
          </ul>
        </div>

        {/* Links Column 3 */}
        <div className="space-y-6">
          <h5 className="text-white font-bold uppercase tracking-widest text-xs">Kontak</h5>
          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-2 text-slate-400">
              <span className="material-symbols-outlined text-primary text-lg">mail</span>
              info@armadakita.com
            </li>
            <li className="flex items-center gap-2 text-slate-400">
              <span className="material-symbols-outlined text-primary text-lg">call</span>
              +62 21 555 0123
            </li>
            <li>
              <a className="text-slate-400 hover:text-white transition-colors cursor-pointer" href="#">
                Syarat & Ketentuan
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-16 mt-16 pt-8 border-t border-slate-850 text-center">
        <p className="text-slate-500 text-sm">© 2026 ArmadaKita. Seluruh hak cipta dilindungi.</p>
      </div>
    </footer>
  );
}
