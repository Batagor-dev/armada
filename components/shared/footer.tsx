export default function Footer() {
  return (
    <footer id="footer" className="w-full pt-16 pb-8 bg-surface-container-lowest border-t border-outline-variant/10">
      <div className="max-w-[1280px] mx-auto px-4 md:px-16 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Column */}
        <div className="space-y-6">
          <span className="font-display text-2xl font-bold text-primary">Grand Touring</span>
          <p className="text-on-surface-variant text-sm pr-8 leading-relaxed">
            Penyedia layanan sewa mobil mewah terpercaya dengan koleksi armada eksklusif untuk gaya hidup prestisius Anda.
          </p>
          <div className="flex gap-4">
            <a
              className="w-10 h-10 rounded-full border border-outline-variant/30 flex items-center justify-center hover:bg-primary transition-all duration-300 group"
              href="#"
            >
              <span className="material-symbols-outlined text-on-surface-variant group-hover:text-on-primary">
                share
              </span>
            </a>
            <a
              className="w-10 h-10 rounded-full border border-outline-variant/30 flex items-center justify-center hover:bg-primary transition-all duration-300 group"
              href="#"
            >
              <span className="material-symbols-outlined text-on-surface-variant group-hover:text-on-primary">
                public
              </span>
            </a>
          </div>
        </div>

        {/* Links Column 1 */}
        <div className="space-y-6">
          <h5 className="text-primary font-bold uppercase tracking-widest text-xs">Layanan</h5>
          <ul className="space-y-4 text-sm">
            <li>
              <a className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer" href="#fleet">
                Exclusive Fleet
              </a>
            </li>
            <li>
              <a className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer" href="#features">
                24/7 Support
              </a>
            </li>
            <li>
              <a className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer" href="#features">
                Flexible Booking
              </a>
            </li>
          </ul>
        </div>

        {/* Links Column 2 */}
        <div className="space-y-6">
          <h5 className="text-primary font-bold uppercase tracking-widest text-xs">Perusahaan</h5>
          <ul className="space-y-4 text-sm">
            <li>
              <a className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer" href="#">
                Tentang Kami
              </a>
            </li>
            <li>
              <a className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer" href="#">
                Pusat Bantuan
              </a>
            </li>
            <li>
              <a className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer" href="#">
                Kebijakan Privasi
              </a>
            </li>
          </ul>
        </div>

        {/* Links Column 3 */}
        <div className="space-y-6">
          <h5 className="text-primary font-bold uppercase tracking-widest text-xs">Kontak</h5>
          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-2 text-on-surface-variant">
              <span className="material-symbols-outlined text-primary text-lg">mail</span>
              info@grandtouring.id
            </li>
            <li className="flex items-center gap-2 text-on-surface-variant">
              <span className="material-symbols-outlined text-primary text-lg">call</span>
              +62 21 555 0123
            </li>
            <li>
              <a className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer" href="#">
                Syarat & Ketentuan
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 md:px-16 mt-16 pt-8 border-t border-outline-variant/10 text-center">
        <p className="text-on-surface-variant text-sm">© 2026 Grand Touring. Seluruh hak cipta dilindungi.</p>
      </div>
    </footer>
  );
}
