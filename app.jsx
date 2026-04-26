/* ============================================================
   RDS Coffee — React App
   File: app.jsx  (dibungkus dalam <script type="text/babel">)
   ============================================================

   STRUKTUR FILE:
   1. DATA PRODUK      — ubah nama, warna, harga, foto di sini
   2. DATA SERVICE     — ubah 4 item layanan di sini
   3. Navbar           — logo header
   4. Hero             — ilustrasi botol, teks utama
   5. About            — logo + teks cerita brand
   6. Products         — zigzag layout + modal detail
   7. Service          — 4 kartu layanan
   8. Events           — Wedding / Birthday / Corporate
   9. Contact          — form kirim pesan
   10. Footer          — logo pink, links, copyright
   ============================================================ */

const { useState, useEffect } = React;


/* ============================================================
   1. DATA PRODUK
   ============================================================

   CARA MENGGANTI DATA PRODUK:
   Setiap objek di array ini = satu produk.
   Field yang bisa diubah:

   name       → nama besar produk (misal "WARM.")
   subtitle   → nama varian (misal "Aren Latte")
   tagline    → kalimat pendek di bawah botol
   description→ deskripsi panjang di modal
   details    → komposisi bahan (untuk modal)
   pricing    → array harga per jumlah botol
   color      → warna BOTOL (hex atau CSS variable)
   bg         → warna BACKGROUND sisi botol (hex terang)
   textOn     → warna TEKS di atas botol (harus kontras dengan color)
   bgRow      → warna BACKGROUND seluruh row (sisi info)

   ── FOTO PRODUK ─────────────────────────────────────────────
   photo      → path foto untuk MODAL DETAIL
                Taruh foto di folder images/
                Contoh: "images/foto-warm.jpg"
                Ukuran ideal: 400×600px (portrait)
                Kosongkan ("") untuk tampilkan ilustrasi botol

   photoHero  → (opsional) foto untuk ilustrasi hero
                Saat ini hero menggunakan ilustrasi botol CSS
   ─────────────────────────────────────────────────────────── */

const products = [
  {
    id: 1,
    name: "COAST.",
    subtitle: "Coconut Latte",
    tagline: "Tropical vibes dalam setiap tegukan",
    description: "Espresso berpadu dengan kelapa segar yang memberikan nuansa tropis ringan dan menyegarkan. Pilihan unik untuk tamu yang ingin sesuatu yang berbeda.",
    details: "Espresso · Coconut Milk · Fresh Milk",
    pricing: [
      { qty: "50 PCS",  price: "Rp 550.000" },
      { qty: "100 PCS", price: "Rp 1.000.000" },
      { qty: "200 PCS", price: "Rp 2.000.000" },
    ],
    color:  "#f2619c",   /* Warna #f2619c = Pink Coast */
    bg:     "#FEF0F3",
    textOn: "#7A0030",
    bgRow:  "#FFFFFF",

    /* ── GANTI FOTO DI SINI ─────────────────────────────── */
    photo:        "images/foto-coast-detail.png",   /* foto modal detail  */
    photoOutside: "images/foto-coast-outside.png",  /* foto zigzag row    */
    /* ──────────────────────────────────────────────────── */
  },
  {
    id: 2,
    name: "WARM.",
    subtitle: "Aren Latte",
    tagline: "Manis alami dari gula aren asli",
    description: "Perpaduan espresso segar dengan gula aren pilihan yang menghadirkan rasa manis alami dan aroma karamel lembut. Favorit di setiap wedding dan gathering.",
    details: "Espresso · Fresh Milk · Aren Syrup",
    pricing: [
      { qty: "50 PCS",  price: "Rp 550.000" },
      { qty: "100 PCS", price: "Rp 1.000.000" },
      { qty: "200 PCS", price: "Rp 2.000.000" },
    ],
    color:  "#e7bef8",   /* Warna #e7bef8 = Purple Warm */
    bg:     "#F8F0FE",
    textOn: "#5A1A8A",
    bgRow:  "#FBF5FF",

    /* ── GANTI FOTO DI SINI ─────────────────────────────── */
    photo:        "images/foto-warm-detail.png",
    photoOutside: "images/foto-warm-outside.png",
    /* ──────────────────────────────────────────────────── */
  },
  {
    id: 3,
    name: "CLASSIC.",
    subtitle: "Creamy Latte",
    tagline: "Klasik yang tak pernah salah",
    description: "Kopi susu klasik dengan tekstur creamy yang sempurna. Cocok untuk semua kalangan dan semua jenis event — pilihan aman yang selalu memuaskan.",
    details: "Espresso · Fresh Milk · Cream",
    pricing: [
      { qty: "50 PCS",  price: "Rp 550.000" },
      { qty: "100 PCS", price: "Rp 1.000.000" },
      { qty: "200 PCS", price: "Rp 2.000.000" },
    ],
    color:  "#93abd9",   /* Warna #93abd9 = Biru Classic */
    bg:     "#EDF3FA",
    textOn: "#1A3358",
    bgRow:  "#FFFFFF",

    /* ── GANTI FOTO DI SINI ─────────────────────────────── */
    photo:        "images/foto-classic-detail.png",
    photoOutside: "images/foto-classic-outside.png",
    /* ──────────────────────────────────────────────────── */
  },
  {
    id: 4,
    name: "ROAST.",
    subtitle: "Almond Roast Latte",
    tagline: "Bold, nutty, unforgettable",
    description: "Dark roast espresso dengan sentuhan almond syrup yang kaya. Profil rasa bold dan nuttiness yang khas untuk para pencinta kopi sejati.",
    details: "Espresso · Fresh Milk · Almond Roast Syrup",
    pricing: [
      { qty: "50 PCS",  price: "Rp 600.000" },
      { qty: "100 PCS", price: "Rp 1.100.000" },
      { qty: "200 PCS", price: "Rp 2.100.000" },
    ],
    color:  "#ede986",   /* Warna #ede986 = Kuning Roast */
    bg:     "#FEFBE6",
    textOn: "#5C4800",
    bgRow:  "#FFFDF0",

    /* ── GANTI FOTO DI SINI ─────────────────────────────── */
    photo:        "images/foto-roast-detail.png",
    photoOutside: "images/foto-roast-outside.png",
    /* ──────────────────────────────────────────────────── */
  },
];


/* ============================================================
   2. DATA SERVICE
   ============================================================
   Ubah label dan desc untuk mengganti teks kartu layanan.
   ============================================================ */

const services = [
  { label: "Include Acrylic",       desc: "Display akrilik premium untuk presentasi botol yang elegan di venue eventmu." },
  { label: "Include Ice Cube",       desc: "Es batu disediakan agar kopi tetap dingin dan segar sepanjang event berlangsung." },
  { label: "Max Stand 2 Jam",        desc: "Stand beroperasi maksimal 2 jam demi kesegaran produk yang terjaga optimal." },
  { label: "Free Transport Depok",   desc: "Pengiriman gratis untuk area Depok. Hubungi kami untuk info di luar area." },
];

/* Service card backgrounds — index 0-3 sesuai urutan services[] */
const serviceBgs = [
  "#FFFFFF",      /* Acrylic  — putih bersih */
  "#EDF3FA",      /* Ice Cube — biru sky */
  "#FFFFFF",      /* Stand    — putih bersih */
  "#FEFBE6",      /* Transport— kuning butter */
];


/* ============================================================
   3. NAVBAR
   ============================================================

   CARA MENGGANTI LOGO NAVBAR:
   Ubah src di bawah ke path logo yang diinginkan.
   File harus ada di folder images/.
   Filter CSS mengubah warna — hapus className "navbar-logo"
   jika sudah tidak ingin filter warna otomatis.

   Logo yang tersedia:
   - images/logo-bw.png     → hitam putih (dari logo_stiker_5)
   - images/logo-purple.png → ungu/lilac
   - images/logo-pink.png   → pink
   ============================================================ */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      {/* LOGO NAVBAR — ubah src untuk ganti logo */}
      <img
        className="navbar-logo"
        src="images/logo-bw.png"
        alt="RDS Coffee"
      />
      <div className="navbar-links">
        {[
          ["Produk",  "#produk"],
          ["Service", "#service"],
          ["Event",   "#event"],
          ["Tentang", "#tentang"],
          ["Kontak",  "#kontak"],
        ].map(([label, href]) => (
          <a key={label} href={href} className="navbar-link">{label}</a>
        ))}
        <a href="#kontak" className="navbar-cta">Order</a>
      </div>
    </nav>
  );
}


/* ============================================================
   4. HERO
   ============================================================ */

function Hero() {
  return (
    <section className="hero">
      {/* Blob dekoratif background — warna diambil dari CSS */}
      <div className="hero-blob hero-blob-1" />
      <div className="hero-blob hero-blob-2" />
      <div className="hero-blob hero-blob-3" />

      <div className="hero-inner">
        <div className="hero-grid">

          {/* Kolom teks kiri */}
          <div>
            <p className="hero-eyebrow">Bottled Coffee Experience</p>
            <h1 className="hero-title">
              A Sip of<br/>
              <em>Something</em><br/>
              Beautiful.
            </h1>
            <div className="hero-divider" />
            <p className="hero-desc">
              Setiap momen spesialmu layak ditemani oleh secangkir kopi terbaik —
              kini hadir dalam botol elegan untuk tamu undanganmu.
            </p>
            <div className="hero-buttons">
              <a href="#produk"  className="btn-primary">Lihat Produk</a>
              <a href="#kontak"  className="btn-outline">Pesan Sekarang</a>
            </div>
          </div>

          {/* Kolom ilustrasi botol kanan */}
          <div className="hero-bottles">
            {/*
              ILUSTRASI BOTOL HERO:
              Setiap botol dirender otomatis dari data products[].
              Warna botol = products[i].color
              Teks botol  = products[i].name + products[i].subtitle
              Untuk menggantinya cukup ubah `color` di DATA PRODUK di atas.
            */}
            {products.map((p, i) => (
              <div
                key={p.id}
                className="hero-bottle"
                style={{
                  width:      "108px",
                  height:     "290px",
                  background: p.color,
                  left:       `${i * 24}%`,
                  top:        i % 2 === 0 ? "60px" : "110px",
                  transform:  `rotate(${[-8, -2, 2, 8][i]}deg)`,
                  boxShadow:  `0 20px 50px rgba(0,0,0,0.07), 0 6px 16px ${p.color}50`,
                }}
              >
                <div className="hero-bottle-cap" />
                <span
                  className="hero-bottle-name"
                  style={{ fontSize: "2.2rem", color: p.textOn }}
                >
                  {p.name}
                </span>
                <div
                  className="hero-bottle-divider"
                  style={{ background: `${p.textOn}40` }}
                />
                <span
                  className="hero-bottle-sub"
                  style={{ color: `${p.textOn}80` }}
                >
                  {p.subtitle}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Strip bawah */}
        <div className="hero-strip">
          <span className="hero-strip-label">Available for —</span>
          {["Wedding", "Birthday", "Corporate"].map(e => (
            <span key={e} className="hero-strip-item">{e}</span>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ============================================================
   5. ABOUT
   ============================================================

   CARA MENGGANTI LOGO DI ABOUT:
   Ubah src pada <img className="about-logo" .../> di bawah.
   File harus ada di folder images/.
   ============================================================ */

function About() {
  return (
    <section id="tentang" className="about">
      <div className="about-inner">

        {/* Kotak logo + quote kiri */}
        <div className="about-logo-box">
          {/*
            LOGO ABOUT US — ubah src untuk ganti logo
            Logo tersedia: logo-bw.png / logo-purple.png / logo-pink.png
          */}
          <img
            className="about-logo"
            src="images/logo-purple.png"
            alt="RDS Coffee"
          />
          <p className="about-quote">
            "Kami menciptakan kopi bukan hanya untuk diminum,
            tetapi untuk menjadi bagian dari momen."
          </p>
          <div className="about-quote-divider" />
          <p className="about-est">RDS Coffee · Est. 2022</p>
        </div>

        {/* Teks cerita kanan */}
        <div>
          <p className="label-gold">Tentang Kami</p>
          <h2 className="about-story-title">
            Dibuat Dengan<br/><em>Penuh Perhatian.</em>
          </h2>
          <div className="about-story">
            {/*
              TEKS CERITA ABOUT:
              Ubah paragraf di bawah untuk mengubah isi cerita brand.
              Paragraf italic = kalimat pembuka
              Paragraf biasa  = isi utama
            */}
            <p style={{ fontFamily: "var(--ff-serif)", fontSize: "1rem", fontWeight: 300, color: "var(--mid)", lineHeight: 1.9, fontStyle: "italic" }}>
              RDS berawal dari sebuah tempat sederhana — tempat untuk rehat dan singgah.
            </p>
            <p style={{ fontFamily: "var(--ff-serif)", fontSize: "1rem", fontWeight: 300, color: "var(--mid)", lineHeight: 1.9, fontStyle: "italic" }}>
              Hari ini, kami membawa perasaan itu ke dalam setiap botol yang kami sajikan.
            </p>
            <p style={{ fontFamily: "var(--ff-serif)", fontSize: "1rem", fontWeight: 300, color: "var(--charcoal)", lineHeight: 1.9 }}>
              Kami menciptakan kopi bukan hanya untuk diminum, tetapi untuk menjadi bagian dari momen — dari pertemuan kecil hingga perayaan besar.
            </p>
            <p style={{ fontFamily: "var(--ff-serif)", fontSize: "1rem", fontWeight: 300, color: "var(--charcoal)", lineHeight: 1.9 }}>
              Setiap rasa dibuat dengan penuh perhatian, agar setiap tegukan terasa ringan, hangat, dan berkesan.
            </p>
            <p style={{ fontFamily: "var(--ff-serif)", fontSize: "1rem", fontWeight: 300, color: "var(--mid)", lineHeight: 1.9, fontStyle: "italic" }}>
              Karena pada akhirnya, ini bukan hanya tentang kopi, tapi tentang momen yang menyertainya.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


/* ============================================================
   6. PRODUCTS
   ============================================================ */

/* Modal detail produk */
function ProductModal({ product, onClose }) {
  if (!product) return null;

  /*
    CEK APAKAH FOTO TERSEDIA:
    Jika field `photo` diisi dan file ada di images/,
    foto akan tampil di kolom kiri modal.
    Jika kosong atau file tidak ditemukan,
    akan tampil ilustrasi botol sebagai fallback.
  */
  const [imgError, setImgError] = useState(false);
  const hasPhoto = product.photo && product.photo !== "" && !imgError;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}
           style={{ borderTop: `3px solid ${product.color}` }}>

        {/* Kolom kiri — foto atau ilustrasi botol */}
        <div
          className="modal-photo-side"
          style={{ background: product.bg }}
        >
          {hasPhoto ? (
            /*
              FOTO PRODUK DI MODAL:
              Path foto diambil dari products[].photo
              Ubah nilai photo di DATA PRODUK untuk mengganti foto
              Format didukung: .jpg .jpeg .png .webp
            */
            <img
              className="modal-photo"
              src={product.photo}
              alt={product.name}
              onError={() => setImgError(true)}
            />
          ) : (
            /* Fallback ilustrasi botol jika foto belum ada */
            <div className="modal-photo-placeholder" style={{ background: product.bg }}>
              <div
                className="modal-photo-bottle"
                style={{
                  background:  product.color,
                  boxShadow:   `0 24px 60px ${product.color}60`,
                }}
              >
                <div className="modal-photo-bottle-cap" />
                <span style={{
                  fontFamily:   "var(--ff-serif)",
                  fontWeight:   500,
                  fontSize:     "2.8rem",
                  color:        product.textOn,
                  writingMode:  "vertical-rl",
                  transform:    "rotate(180deg)",
                  letterSpacing:"0.03em",
                }}>
                  {product.name}
                </span>
                <div style={{ width:"30px", height:"1px", background:`${product.textOn}30` }} />
                <span style={{
                  fontFamily:   "var(--ff-body)",
                  fontSize:     "0.55rem",
                  color:        `${product.textOn}80`,
                  letterSpacing:"0.14em",
                  textTransform:"uppercase",
                  writingMode:  "vertical-rl",
                  transform:    "rotate(180deg)",
                }}>
                  {product.subtitle}
                </span>
              </div>
              {/* Label panduan — hapus jika tidak perlu */}
              <p style={{
                fontFamily: "var(--ff-body)", fontSize: "0.65rem",
                color: `${product.textOn}50`, letterSpacing: "0.12em",
                textTransform: "uppercase", marginTop: "1rem",
              }}>
                Tambah foto di<br/>images/foto-{product.name.toLowerCase().replace(".","")}.jpg
              </p>
            </div>
          )}
        </div>

        {/* Kolom kanan — info produk */}
        <div className="modal-info-side">
          <button className="modal-close" onClick={onClose}>✕ TUTUP</button>

          <p className="modal-badge" style={{ color: "var(--gold)" }}>Detail Produk</p>
          <h3 className="modal-name">{product.name}</h3>
          <p className="modal-subtitle">{product.subtitle}</p>
          <p className="modal-desc">{product.description}</p>
          <p className="modal-ingredients">{product.details}</p>

          {/* Tabel harga */}
          <div className="modal-pricing">
            {product.pricing.map(row => (
              <div key={row.qty} className="modal-price-row">
                <span className="modal-price-qty">{row.qty}</span>
                <span className="modal-price-val">{row.price}</span>
              </div>
            ))}
          </div>

          <a href="#kontak" onClick={onClose} className="modal-cta">
            Pesan Sekarang
          </a>
        </div>
      </div>
    </div>
  );
}

/* Satu row zigzag produk */
function ProductRow({ product, index, onSelect }) {
  /*
    FOTO OUTSIDE (photoOutside):
    Menggantikan ilustrasi botol CSS di sisi kiri/kanan zigzag.
    Jika foto gagal load atau field kosong → fallback ke botol CSS.
    Path foto: diambil dari field `photoOutside` di DATA PRODUK
  */
  const [outsideErr, setOutsideErr] = useState(false);
  const hasOutside = product.photoOutside && product.photoOutside !== "" && !outsideErr;

  const bottleLeft = index % 2 === 0;

  return (
      <div className="product-row" style={{
        background: product.bgRow,
        borderTopColor:    `${product.color}70`,
        borderBottomColor: `${product.color}70`,
      }}>
        <div className="product-row-inner">

          {/* ── SISI VISUAL (botol / foto outside) ── */}
          <div className="product-bottle-side" style={{
            order:       bottleLeft ? 1 : 2,
            background:  product.bg,
            borderRight: bottleLeft  ? `1px solid ${product.color}60` : "none",
            borderLeft:  !bottleLeft ? `1px solid ${product.color}60` : "none",
            padding:     hasOutside ? "0" : "4rem",      /* foto full-bleed, botol ada padding */
            overflow:    "hidden",
          }}>
            {hasOutside ? (
                /*
                  FOTO OUTSIDE DI ZIGZAG:
                  Diambil dari: products[i].photoOutside
                  Ganti nilai photoOutside di DATA PRODUK untuk mengubah foto ini
                  Nama file contoh: "images/foto-coast-outside.png"
                  Foto akan di-cover (fill) ke seluruh area sisi botol
                */
                <img
                    src={product.photoOutside}
                    alt={product.name}
                    onError={() => setOutsideErr(true)}
                    style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", minHeight:"480px" }}
                />
            ) : (
                /* Fallback ilustrasi botol CSS */
                <BottleIllustration product={product} />
            )}
          </div>

          {/* ── SISI INFO ── */}
          <div className="product-info-side" style={{ order: bottleLeft ? 2 : 1 }}>
          <span className="product-badge" style={{ borderBottomColor: product.color }}>
            {`0${index + 1} — Signature`}
          </span>
            <h3 className="product-name">{product.name}</h3>
            <p className="product-subtitle">{product.subtitle}</p>
            <p className="product-desc">{product.description}</p>
            <p className="product-ingredients">{product.details}</p>
            <div className="product-pricing">
              {product.pricing.map(row => (
                  <div key={row.qty} className="product-price-row">
                    <span className="product-price-qty">{row.qty}</span>
                    <span className="product-price-val">{row.price}</span>
                  </div>
              ))}
            </div>
            <button className="btn-order" onClick={() => onSelect(product)}>
              Detail &amp; Pesan
            </button>
          </div>
        </div>
      </div>
  );
}

function Products() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="produk" className="products">
      <div className="products-header">
        <p className="label-gold">Menu Kami</p>
        <h2 className="products-title">
          Four Signature<br/><em>Flavours.</em>
        </h2>
      </div>

      {/* Render setiap produk sebagai row zigzag */}
      {products.map((p, i) => (
        <ProductRow
          key={p.id}
          product={p}
          index={i}
          onSelect={setSelected}
        />
      ))}

      {/* Modal detail — muncul saat tombol "Detail & Pesan" diklik */}
      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </section>
  );
}


/* ============================================================
   7. SERVICE
   ============================================================ */

function Service() {
  return (
    <section id="service" className="service">
      <div className="service-inner">
        <div className="service-header">
          <p className="label-gold">Apa yang Kami Sediakan</p>
          <h2 className="service-title">
            Service<br/><em>Bottle Concept.</em>
          </h2>
        </div>

        <div className="service-grid">
          {services.map((s, i) => (
            <div
              key={s.label}
              className="service-card"
              style={{ background: serviceBgs[i] }}
            >
              <span className="service-number">0{i + 1}</span>
              <h4 className="service-label">{s.label}</h4>
              <div className="service-divider" />
              <p className="service-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ============================================================
   8. EVENTS
   ============================================================ */

function Events() {
  const items = [
    {
      label: "Wedding",
      bg:    "#FFFFFF",
      desc:  "Tambah kesan intimate dengan welcome drink berbranding personal yang membuat tamu undangan terkesan dan mengingat momenmu.",
    },
    {
      label: "Birthday",
      bg:    "#EDF3FA",
      desc:  "Hadirkan party favor yang berkesan dan bisa langsung dinikmati. Label botol bisa dikustomisasi sesuai tema ulang tahun.",
    },
    {
      label: "Corporate",
      bg:    "#FFFFFF",
      desc:  "Tingkatkan image brand dengan coffee hamper eksklusif untuk klien dan tim. Custom label tersedia sesuai identitas perusahaan.",
    },
  ];

  return (
    <section id="event" className="events">
      <div className="events-inner">
        <p className="label-gold">Tersedia Untuk</p>
        <h2 className="events-title">
          Every Celebration,<br/><em>Every Moment.</em>
        </h2>

        <div className="events-grid">
          {items.map(ev => (
            <div
              key={ev.label}
              className="event-card"
              style={{ background: ev.bg }}
            >
              <div className="event-line" />
              <h3 className="event-name">{ev.label}.</h3>
              <p className="event-desc">{ev.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ============================================================
   9. CONTACT
   ============================================================

   Untuk menghubungkan form ke email owner:
   1. Buat akun di emailjs.com (gratis)
   2. Ganti blok simulasi `await new Promise(...)` dengan:

   import emailjs from 'emailjs-com';
   await emailjs.send('SERVICE_ID', 'TEMPLATE_ID', form, 'USER_ID');

   Atau gunakan Formspree:
   await fetch('https://formspree.io/f/YOUR_ID', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify(form),
   });
   ============================================================ */

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", event: "", message: "" });
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    /* GANTI BAGIAN INI dengan EmailJS / Formspree di production */
    await new Promise(r => setTimeout(r, 1200));

    setStatus("sent");
  };

  return (
    <section id="kontak" className="contact">
      <div className="contact-inner">

        {/* Kolom info kiri */}
        <div>
          <p className="label-gold">Hubungi Kami</p>
          <h2 className="contact-title">
            Let's Brew<br/><em>Together.</em>
          </h2>
          <div className="gold-line" style={{ marginBottom: "2rem" }} />
          <p style={{ fontFamily: "var(--ff-body)", fontSize: "0.88rem", fontWeight: 300, color: "var(--mid)", lineHeight: 1.85, marginBottom: "3rem" }}>
            Konsultasikan kebutuhanmu bersama kami. Kami akan bantu memilih varian terbaik dan tampilan botol yang sesuai tema eventmu.
          </p>

          {/*
            INFO KONTAK:
            Ubah nilai di bawah untuk mengganti data kontak owner.
          */}
          {[
            ["Lokasi",          "Depok, Jawa Barat, Indonesia"],
            ["Email Owner",     "kacamataramah48@gmail.com"],
            ["WhatsApp",        "+62 851-5624-9026"],
            ["Free Transport",  "Area Depok"],
          ].map(([key, val]) => (
            <div key={key} className="contact-info-row">
              <p className="contact-info-key">{key}</p>
              <p className="contact-info-val">{val}</p>
            </div>
          ))}
        </div>

        {/* Kolom form kanan */}
        <div>
          {status === "sent" ? (
            <div className="contact-success">
              <p className="contact-success-label">Pesan terkirim</p>
              <p className="contact-success-title">Terima<br/>Kasih.</p>
              <p className="contact-success-note">Kami akan menghubungimu dalam 1×24 jam.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="form-group">
              <div>
                <label className="form-label">Nama Lengkap</label>
                <input
                  type="text" required
                  placeholder="Nama kamu"
                  className="form-input"
                  value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                />
              </div>
              <div>
                <label className="form-label">Email</label>
                <input
                  type="email" required
                  placeholder="email@example.com"
                  className="form-input"
                  value={form.email}
                  onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                />
              </div>
              <div>
                <label className="form-label">Jenis Event</label>
                <select
                  className="form-select"
                  value={form.event}
                  onChange={e => setForm(p => ({ ...p, event: e.target.value }))}
                  style={{ color: form.event ? "var(--charcoal)" : "var(--muted)" }}
                >
                  <option value="">Pilih jenis event</option>
                  {["Wedding", "Birthday", "Corporate", "Other"].map(o => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="form-label">Pesan</label>
                <textarea
                  rows={4}
                  placeholder="Ceritakan kebutuhan eventmu, jumlah tamu, tanggal, dll..."
                  className="form-textarea"
                  value={form.message}
                  onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                />
              </div>
              <button
                type="submit"
                className="btn-submit"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Mengirim..." : "Kirim Pesan"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}


/* ============================================================
   10. FOOTER
   ============================================================

   CARA MENGGANTI LOGO FOOTER:
   Ubah src pada <img className="footer-logo" .../> di bawah.
   File harus ada di folder images/.

   Logo yang tersedia:
   - images/logo-bw.png     → hitam putih
   - images/logo-purple.png → ungu/lilac
   - images/logo-pink.png   → pink (saat ini dipakai)
   ============================================================ */

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          {/*
            LOGO FOOTER — ubah src untuk ganti logo
            Saat ini menggunakan logo pink
          */}
          <img
            className="footer-logo"
            src="images/logo-pink.png"
            alt="RDS Coffee"
          />

          <nav className="footer-links">
            {[
              ["Produk",  "#produk"],
              ["Service", "#service"],
              ["Event",   "#event"],
              ["Tentang", "#tentang"],
              ["Kontak",  "#kontak"],
            ].map(([label, href]) => (
              <a key={label} href={href} className="footer-link">{label}</a>
            ))}
          </nav>

          <div className="footer-contact">
            {/*
              KONTAK FOOTER — ubah teks di bawah
            */}
            <p className="footer-email">kacamataramah48@gmail.com</p>
            <p className="footer-location">Depok, Jawa Barat</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-tagline">Wedding · Birthday · Corporate</p>
          <p className="footer-copy">© 2025 RDS Coffee. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}


/* ============================================================
   APP ROOT
   ============================================================ */

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Products />
      <Service />
      <Events />
      <Contact />
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
