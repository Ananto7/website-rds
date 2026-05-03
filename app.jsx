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

const {useState, useEffect} = React;


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

const DEFAULT_CONCEPT = "bottle"; /* ← UBAH DI SINI untuk ganti default tab */

const products = [
    {
        id: 1,
        name: "COAST.",
        subtitle: "Coconut Latte",
        tagline: "Tropical vibes dalam setiap tegukan",
        description: "Espresso berpadu dengan Coconut Milk yang memberikan nuansa tropis ringan dan menyegarkan. Pilihan unik untuk tamu yang ingin sesuatu yang berbeda.",
        color: "#f2619c",   /* Warna #f2619c = Pink Coast */
        bg: "#FEF0F3",
        textOn: "#7A0030",
        bgRow: "#FFFFFF",
        bottle: {
            details: "Espresso · Coconut Milk · Sweetened Condensed Milk · 150ml",
            pricing: [
                {qty: "50 PCS", price: "Rp 550.000"},
                {qty: "100 PCS", price: "Rp 1.000.000"},
                {qty: "200 PCS", price: "Rp 2.000.000"},
            ],
            /* ── GANTI FOTO DI SINI ─────────────────────────────── */
            photo: "images/foto-coast-detail.png",   /* foto modal detail  */
            photoOutside: "images/foto-coast-outside.png",  /* foto zigzag row    */
        },

        cup: {
            details: "Espresso · Coconut Milk · Sweetened Condensed Milk · 100ml",
            pricing: [
                {qty: "100 PCS", price: "Rp 600.000"},
                {qty: "200 PCS", price: "Rp 1.100.000"},
            ],
            /* GANTI FOTO CUP — taruh di folder images/ */
            photo: "images/foto-coast-cup-detail.png",
            photoOutside: "images/foto-coast-cup-outside.png",
        }
    },
    {
        id: 2,
        name: "WARM.",
        subtitle: "Aren Latte",
        tagline: "Manis alami dari gula aren asli",
        description: "Perpaduan espresso segar dengan gula aren pilihan yang menghadirkan rasa manis alami dan aroma aren. Favorit di setiap wedding dan gathering.",
        details: "Espresso · Fresh Milk · Aren Syrup",
        color: "#e7bef8",   /* Warna #e7bef8 = Purple Warm */
        bg: "#F8F0FE",
        textOn: "#5A1A8A",
        bgRow: "#FBF5FF",

        bottle: {
            details: "Espresso · Fresh Milk · Aren Syrup · 150ml",
            pricing: [
                {qty: "50 PCS", price: "Rp 550.000"},
                {qty: "100 PCS", price: "Rp 1.000.000"},
                {qty: "200 PCS", price: "Rp 2.000.000"},
            ],
            photo: "images/foto-warm-detail.png",
            photoOutside: "images/foto-warm-outside.png",
        },

        cup: {
            details: "Espresso · Fresh Milk · Aren Syrup · 100ml",
            pricing: [
                {qty: "100 PCS", price: "Rp 600.000"},
                {qty: "200 PCS", price: "Rp 1.100.000"},
            ],
            photo: "images/foto-warm-cup-detail.png",
            photoOutside: "images/foto-warm-cup-outside.png",
        },
    },
    {
        id: 3,
        name: "CLASSIC.",
        subtitle: "Creamy Latte",
        tagline: "Klasik yang tak pernah salah",
        description: "Kopi susu klasik dengan tekstur creamy yang sempurna. Cocok untuk semua kalangan dan semua jenis event — pilihan aman yang selalu memuaskan.",
        color: "#93abd9",   /* Warna #93abd9 = Biru Classic */
        bg: "#EDF3FA",
        textOn: "#1A3358",
        bgRow: "#FFFFFF",

        bottle: {
            details: "Espresso · Fresh Milk · Sweetened Condensed Milk · 150ml",
            pricing: [
                {qty: "50 PCS", price: "Rp 550.000"},
                {qty: "100 PCS", price: "Rp 1.000.000"},
                {qty: "200 PCS", price: "Rp 2.000.000"},
            ],
            photo: "images/foto-classic-detail.png",
            photoOutside: "images/foto-classic-outside.png",
        },

        cup: {
            details: "Espresso · Fresh Milk · Sweetened Condensed Milk · 100ml",
            pricing: [
                {qty: "100 PCS", price: "Rp 600.000"},
                {qty: "200 PCS", price: "Rp 1.100.000"},
            ],
            photo: "images/foto-classic-cup-detail.png",
            photoOutside: "images/foto-classic-cup-outside.png",
        },
    },
    {
        id: 4,
        name: "ROAST.",
        subtitle: "Almond Roast Latte",
        tagline: "Bold, nutty, unforgettable",
        description: "Dark roast espresso dengan sentuhan roasted almond syrup yang kaya. Profil rasa bold dan nuttiness yang khas untuk para pencinta kopi sejati.",
        details: "Espresso · Fresh Milk · Almond Roast Syrup",
        color: "#ede986",   /* Warna #ede986 = Kuning Roast */
        bg: "#FEFBE6",
        textOn: "#5C4800",
        bgRow: "#FFFDF0",

        bottle: {
            details: "Espresso · Fresh Milk · Almond Roast Syrup · 150ml",
            pricing: [
                {qty: "50 PCS", price: "Rp 600.000"},
                {qty: "100 PCS", price: "Rp 1.100.000"},
                {qty: "200 PCS", price: "Rp 2.100.000"},
            ],
            photo: "images/foto-roast-detail.png",
            photoOutside: "images/foto-roast-outside.png",
        },

        cup: {
            details: "Espresso · Fresh Milk · Almond Roast Syrup · 100ml",
            pricing: [
                {qty: "100 PCS", price: "Rp 650.000"},
                {qty: "200 PCS", price: "Rp 1.200.000"},
            ],
            photo: "images/foto-roast-cup-detail.png",
            photoOutside: "images/foto-roast-cup-outside.png",
        },
    },
];


/* ============================================================
   2. DATA SERVICE PER KONSEP
   ============================================================
   serviceData.bottle → ditampilkan saat tab Bottle aktif
   serviceData.cup    → ditampilkan saat tab Cup aktif
   ============================================================ */

const services = [
    {label: "Include Acrylic", desc: "Display akrilik premium untuk presentasi botol yang elegan di venue eventmu."},
    {
        label: "Include Ice Cube",
        desc: "Es batu disediakan agar kopi tetap dingin dan segar sepanjang event berlangsung."
    },
    {label: "Max Stand 2 Jam", desc: "Stand beroperasi maksimal 2 jam demi kesegaran produk yang terjaga optimal."},
    {label: "Free Transport Depok", desc: "Pengiriman gratis untuk area Depok. Hubungi kami untuk info di luar area."},
    {
        label: "Include Barista",
        desc: "Siap membantu penyajian dan memastikan setiap tamu mendapatkan pengalaman menikmati kopi yang maksimal."
    }
];

/* Service card backgrounds — index 0-3 sesuai urutan services[] */
const serviceBgs = [
    "#FFFFFF",      /* Acrylic  — putih bersih */
    "#EDF3FA",      /* Ice Cube — biru sky */
    "#FFFFFF",      /* Stand    — putih bersih */
    "#FEFBE6",      /* Transport— kuning butter */
    "#EDF3FA",      /* Ice Cube — biru sky */
];

const serviceData = {
    bottle: {
        title: "Bottle Concept.",
        subtitle: "Untuk tampilan elegan yang siap disajikan",
        items: [
            {
                label: "Include Acrylic",
                desc: "Display akrilik premium untuk presentasi botol yang elegan di venue eventmu."
            },
            {
                label: "Include Ice Cube",
                desc: "Es batu disediakan agar kopi tetap dingin dan segar sepanjang event berlangsung."
            },
            {
                label: "Max Stand 2 Jam",
                desc: "Stand beroperasi maksimal 2 jam demi kesegaran produk yang terjaga optimal."
            },
            {
                label: "Free Transport Depok",
                desc: "Pengiriman gratis untuk area Depok. Hubungi kami untuk info di luar area."
            },
            {
                label: "Include Barista",
                desc: "Siap membantu penyajian dan memastikan setiap tamu mendapatkan pengalaman menikmati kopi yang maksimal."
            }
        ],
        /* Service card backgrounds — index 0-3 sesuai urutan services[] */
        bgs: [
            "#FFFFFF",      /* Acrylic  — putih bersih */
            "#EDF3FA",      /* Ice Cube — biru sky */
            "#FFFFFF",      /* Stand    — putih bersih */
            "#FEFBE6",      /* Transport— kuning butter */
            "#EDF3FA",      /* Ice Cube — biru sky */
        ],
    },
    cup: {
        title: "Cup Concept.",
        subtitle: "Disajikan dingin, langsung dari dispenser",
        items: [
            {
                label: "Dispenser 5L Display",
                desc: "Dispenser 5 liter disediakan untuk sajian langsung yang praktis dan menarik di venue."
            },
            {
                label: "Cup 6.5oz Included",
                desc: "Cup 6.5oz sudah termasuk, siap pakai untuk setiap tamu tanpa perlu perlengkapan tambahan."
            },
            {label: "Ice Cube Included", desc: "Es batu tersedia untuk minuman dingin yang segar di setiap event."},
            {
                label: "Free Transport Depok",
                desc: "Pengiriman gratis untuk area Depok. 2 hours standby service sudah termasuk."
            },
            {
                label: "Include Barista",
                desc: "Siap membantu penyajian dan memastikan setiap tamu mendapatkan pengalaman menikmati kopi yang maksimal."
            }
        ],
        bgs: [
            "#FFFFFF",      /* Acrylic  — putih bersih */
            "#EDF3FA",      /* Ice Cube — biru sky */
            "#FFFFFF",      /* Stand    — putih bersih */
            "#FEFBE6",      /* Transport— kuning butter */
            "#EDF3FA",      /* Ice Cube — biru sky */
        ],
    },
};

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
        const fn = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", fn);
        return () => window.removeEventListener("scroll", fn);
    }, []);
    return (
        <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
            <img className="navbar-logo" src="images/logo-bw.png" alt="RDS Coffee"/>
            <div className="navbar-links">
                {[["Produk", "#produk"], ["Service", "#service"], ["Event", "#event"], ["Tentang", "#tentang"], ["Kontak", "#kontak"]].map(([l, h]) => (
                    <a key={l} href={h} className="navbar-link">{l}</a>
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
            <div className="hero-blob hero-blob-1"/>
            <div className="hero-blob hero-blob-2"/>
            <div className="hero-blob hero-blob-3"/>
            <div className="hero-inner">
                <div className="hero-grid">
                    <div>
                        <p className="hero-eyebrow">Coffee Experience</p>
                        <h1 className="hero-title">A Sip of<br/><em>Something</em><br/>Beautiful.</h1>
                        <div className="hero-divider"/>
                        <p className="hero-desc">
                            Setiap momen spesialmu layak ditemani oleh secangkir kopi terbaik —
                            kini hadir dalam botol elegan untuk tamu undanganmu.
                        </p>
                        <div className="hero-buttons">
                            <a href="#produk" className="btn-primary">Lihat Produk</a>
                            <a href="#kontak" className="btn-outline">Pesan Sekarang</a>
                        </div>
                    </div>
                    <div className="hero-bottles">
                        {products.map((p, i) => (
                            <div key={p.id} className="hero-bottle" style={{
                                width: "108px", height: "290px", background: p.color,
                                left: `${i * 24}%`, top: i % 2 === 0 ? "60px" : "110px",
                                transform: `rotate(${[-8, -2, 2, 8][i]}deg)`,
                                boxShadow: `0 20px 50px rgba(0,0,0,0.07), 0 6px 16px ${p.color}50`,
                            }}>
                                <div className="hero-bottle-cap"/>
                                <span className="hero-bottle-name"
                                      style={{fontSize: "2.2rem", color: p.textOn}}>{p.name}</span>
                                <div className="hero-bottle-divider" style={{background: `${p.textOn}40`}}/>
                                <span className="hero-bottle-sub" style={{color: `${p.textOn}80`}}>{p.subtitle}</span>
                            </div>
                        ))}
                    </div>
                </div>
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
                <div className="about-logo-box">
                    <img className="about-logo" src="images/logo-purple.png" alt="RDS Coffee"/>
                    <p className="about-quote">"Kami menciptakan kopi bukan hanya untuk diminum, tetapi untuk menjadi
                        bagian dari momen."</p>
                    <div className="about-quote-divider"/>
                    <p className="about-est">RDS Coffee · Est. 2023</p>
                </div>
                <div>
                    <p className="label-gold">Tentang Kami</p>
                    <h2 className="about-story-title">Dibuat Dengan<br/><em>Penuh Perhatian.</em></h2>
                    <div className="about-story">
                        {[
                            [true, "RDS berawal dari sebuah tempat sederhana — tempat untuk rehat dan singgah."],
                            [true, "Hari ini, kami membawa perasaan itu ke dalam setiap botol yang kami sajikan."],
                            [false, "Kami menciptakan kopi bukan hanya untuk diminum, tetapi untuk menjadi bagian dari momen — dari pertemuan kecil hingga perayaan besar."],
                            [false, "Setiap rasa dibuat dengan penuh perhatian, agar setiap tegukan terasa ringan, hangat, dan berkesan."],
                            [true, "Karena pada akhirnya, ini bukan hanya tentang kopi, tapi tentang momen yang menyertainya."],
                        ].map(([italic, text], i) => (
                            <p key={i} style={{
                                fontFamily: "var(--ff-serif)",
                                fontSize: "1rem",
                                fontWeight: 300,
                                color: italic ? "var(--mid)" : "var(--charcoal)",
                                lineHeight: 1.9,
                                fontStyle: italic ? "italic" : "normal"
                            }}>{text}</p>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ============================================================
   6. PRODUCTS — dengan tab BOTTLE / CUP
   ============================================================ */


/* Ilustrasi botol CSS fallback */
function BottleIllustration({product}) {
    return (
        <>
            <div className="product-bottle-circle" style={{background: `${product.color}22`}}/>
            <div className="product-bottle"
                 style={{background: product.color, boxShadow: `0 30px 70px ${product.color}55`}}>
                <div className="product-bottle-cap"/>
                <span className="product-bottle-name" style={{color: product.textOn}}>{product.name}</span>
                <div className="product-bottle-line" style={{background: `${product.textOn}30`}}/>
                <span className="product-bottle-sub" style={{color: `${product.textOn}80`}}>{product.subtitle}</span>
            </div>
            <p className="product-tagline" style={{color: `${product.textOn}90`}}>"{product.flavor}"</p>
        </>
    );
}

/* Modal detail produk */
function ProductModal({product, concept, onClose}) {
    if (!product) return null;
    const data = product[concept]; /* bottle atau cup */
    const [imgErr, setImgErr] = useState(false);
    const hasPhoto = data.photo && data.photo !== "" && !imgErr;

    /* Reset error state saat produk berganti */
    useEffect(() => {
        setImgErr(false);
    }, [product.id, concept]);

    const conceptLabel = concept === "bottle" ? "Bottle · 150ml" : "Cup · 100ml";

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-box" onClick={e => e.stopPropagation()}
                 style={{borderTop: `3px solid ${product.color}`}}>

                {/* Kolom kiri — foto */}
                <div className="modal-photo-side" style={{background: product.bg}}>
                    {hasPhoto ? (
                        <img className="modal-photo" src={data.photo} alt={product.name}
                             onError={() => setImgErr(true)}/>
                    ) : (
                        <div className="modal-photo-placeholder" style={{background: product.bg}}>
                            <div className="modal-photo-bottle"
                                 style={{background: product.color, boxShadow: `0 24px 60px ${product.color}60`}}>
                                <div className="modal-photo-bottle-cap"/>
                                <span style={{
                                    fontFamily: "var(--ff-serif)",
                                    fontWeight: 500,
                                    fontSize: "2.8rem",
                                    color: product.textOn,
                                    writingMode: "vertical-rl",
                                    transform: "rotate(180deg)",
                                    letterSpacing: "0.03em"
                                }}>{product.name}</span>
                                <div style={{width: "30px", height: "1px", background: `${product.textOn}30`}}/>
                                <span style={{
                                    fontFamily: "var(--ff-body)",
                                    fontSize: "0.55rem",
                                    color: `${product.textOn}80`,
                                    letterSpacing: "0.14em",
                                    textTransform: "uppercase",
                                    writingMode: "vertical-rl",
                                    transform: "rotate(180deg)"
                                }}>{product.subtitle}</span>
                            </div>
                            <p style={{
                                fontFamily: "var(--ff-body)",
                                fontSize: "0.6rem",
                                color: `${product.textOn}50`,
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                marginTop: "1rem",
                                textAlign: "center",
                                padding: "0 1rem"
                            }}>
                                Tambah foto:<br/>{data.photo}
                            </p>
                        </div>
                    )}
                </div>

                {/* Kolom kanan — info */}
                <div className="modal-info-side">
                    <button className="modal-close" onClick={onClose}>✕ TUTUP</button>

                    {/* Badge konsep */}
                    <div style={{display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem"}}>
                        <p className="modal-badge" style={{margin: 0}}>Detail Produk</p>
                        <span style={{
                            fontFamily: "var(--ff-body)", fontSize: "0.62rem", letterSpacing: "0.18em",
                            textTransform: "uppercase", background: product.color, color: product.textOn,
                            padding: "0.2rem 0.65rem", fontWeight: 500,
                        }}>{conceptLabel}</span>
                    </div>

                    <h3 className="modal-name">{product.name}</h3>
                    <p className="modal-subtitle">{product.subtitle}</p>
                    <p style={{
                        fontFamily: "var(--ff-body)",
                        fontSize: "0.78rem",
                        color: "var(--muted)",
                        letterSpacing: "0.08em",
                        marginBottom: "1rem"
                    }}>{product.flavor}</p>
                    <p className="modal-desc">{product.description}</p>
                    <p className="modal-ingredients">{data.details}</p>

                    <div className="modal-pricing">
                        {data.pricing.map(row => (
                            <div key={row.qty} className="modal-price-row">
                                <span className="modal-price-qty">{row.qty}</span>
                                <span className="modal-price-val">{row.price}</span>
                            </div>
                        ))}
                    </div>

                    <p style={{ fontFamily:"var(--ff-body)", fontSize:"0.7rem", color:"var(--muted)", marginBottom:"1rem", fontStyle:"italic" }}>
                        {concept === "bottle"
                            ? "*Minimal order 50 pcs/varian"
                            : "*Minimal order 100 pcs/varian"}
                    </p>

                    <a href="#kontak" onClick={onClose} className="modal-cta">Pesan Sekarang</a>
                </div>
            </div>
        </div>
    );
}

/* Satu row produk zigzag */
function ProductRow({product, index, concept, onSelect}) {
    const data = product[concept];
    const [outsideErr, setOutsideErr] = useState(false);
    const hasOutside = data.photoOutside && data.photoOutside !== "" && !outsideErr;
    const bottleLeft = index % 2 === 0;

    useEffect(() => {
        setOutsideErr(false);
    }, [concept]);

    return (
        <div className="product-row" style={{
            background: product.bgRow,
            borderTopColor: `${product.color}70`,
            borderBottomColor: `${product.color}70`
        }}>
            <div className="product-row-inner">

                {/* Sisi visual */}
                <div className="product-bottle-side" style={{
                    order: bottleLeft ? 1 : 2,
                    background: product.bg,
                    borderRight: bottleLeft ? `1px solid ${product.color}60` : "none",
                    borderLeft: !bottleLeft ? `1px solid ${product.color}60` : "none",
                    padding: hasOutside ? "0" : "4rem",
                    overflow: "hidden",
                }}>
                    {hasOutside ? (
                        <img src={data.photoOutside} alt={product.name} onError={() => setOutsideErr(true)}
                             style={{
                                 width: "100%",
                                 height: "100%",
                                 objectFit: "cover",
                                 display: "block",
                                 minHeight: "480px"
                             }}/>
                    ) : (
                        <BottleIllustration product={product}/>
                    )}
                </div>

                {/* Sisi info */}
                <div className="product-info-side" style={{order: bottleLeft ? 2 : 1}}>
          <span className="product-badge" style={{borderBottomColor: product.color}}>
            {`0${index + 1} — Signature`}
          </span>
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-subtitle">{product.subtitle}</p>
                    <p style={{
                        fontFamily: "var(--ff-body)",
                        fontSize: "0.75rem",
                        color: "var(--muted)",
                        letterSpacing: "0.1em",
                        marginBottom: "1rem"
                    }}>{product.flavor}</p>
                    <p className="product-desc">{product.description}</p>
                    <p className="product-ingredients">{data.details}</p>

                    {/* Harga */}
                    <div className="product-pricing">
                        {data.pricing.map(row => (
                            <div key={row.qty} className="product-price-row">
                                <span className="product-price-qty">{row.qty}</span>
                                <span className="product-price-val">{row.price}</span>
                            </div>
                        ))}
                    </div>

                    <button className="btn-order" onClick={() => onSelect(product)}>Detail &amp; Pesan</button>
                </div>
            </div>
        </div>
    );
}

/* Section produk utama dengan tab */
function Products({concept, setConcept}) {
    const [selected, setSelected] = useState(null);

    /* Reset modal saat konsep berganti */
    useEffect(() => {
        setSelected(null);
    }, [concept]);

    return (
        <section id="produk" style={{background: "var(--ivory)", paddingTop: "7rem"}}>

            {/* Header + Tab Selector */}
            <div style={{maxWidth: "1280px", margin: "0 auto", padding: "0 3rem 3.5rem"}}>
                <p className="label-gold">Menu Kami</p>
                <div style={{
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "2rem"
                }}>
                    <h2 className="products-title">Four Signature<br/><em>Flavours.</em></h2>

                    {/* ── TAB BOTTLE / CUP — sekarang JELAS terlihat sebagai tombol ── */}
                    <div className="concept-toggle-wrap">
                        <span className="concept-toggle-label">Pilih Konsep</span>
                        <div className="concept-toggle" role="tablist" aria-label="Pilih konsep produk">
                            {[
                                {key: "bottle", label: "Bottle", sub: "150ml", icon: "🍾"},
                                {key: "cup", label: "Cup", sub: "100ml", icon: "☕"},
                            ].map(tab => (
                                <button
                                    key={tab.key}
                                    type="button"
                                    role="tab"
                                    aria-selected={concept === tab.key}
                                    onClick={() => setConcept(tab.key)}
                                    className={`concept-tab ${concept === tab.key ? "active" : ""}`}
                                >
                                    <span className="tab-icon">{tab.icon}</span>
                                    <span>{tab.label}</span>
                                    <span className="tab-sub">{tab.sub}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Keterangan konsep */}
                <div style={{
                    marginTop: "1.5rem", padding: "1rem 1.5rem",
                    background: concept === "bottle" ? "rgba(242,97,156,0.06)" : "rgba(147,171,217,0.08)",
                    borderLeft: `3px solid ${concept === "bottle" ? "#f2619c" : "#93abd9"}`,
                    display: "flex", alignItems: "center", gap: "1rem",
                }}>
                    <span style={{fontSize: "1.2rem"}}>{concept === "bottle" ? "🍾" : "☕"}</span>
                    <div>
                        <p style={{
                            fontFamily: "var(--ff-body)",
                            fontSize: "0.72rem",
                            letterSpacing: "0.15em",
                            color: "var(--charcoal)",
                            textTransform: "uppercase",
                            fontWeight: 500
                        }}>
                            {concept === "bottle" ? "Bottle Concept — 150ml · Min. 50 pcs/varian" : "Cup Concept — 100ml · Min. 100 pcs/varian"}
                        </p>
                        <p style={{
                            fontFamily: "var(--ff-serif)",
                            fontStyle: "italic",
                            fontSize: "0.88rem",
                            color: "var(--mid)",
                            marginTop: "0.15rem"
                        }}>
                            {concept === "bottle"
                                ? "Botol plastik premium dengan label custom, disajikan dingin dalam akrilik display."
                                : "Paper cup 6.5oz, disajikan langsung dari dispenser 5L dengan ice cube tersedia."}
                        </p>
                    </div>
                </div>
            </div>

            {/* Zigzag rows — harga & foto berubah sesuai konsep */}
            {products.map((p, i) => (
                <ProductRow key={p.id} product={p} index={i} concept={concept} onSelect={setSelected}/>
            ))}

            <ProductModal product={selected} concept={concept} onClose={() => setSelected(null)}/>
        </section>
    );
}


/* ============================================================
   7. SERVICE
   ============================================================ */

function Service({concept}) {
    const svc = serviceData[concept];

    return (
        <section id="service" className="service" style={{
            background: concept === "bottle" ? "var(--blush)" : "#F0F5FC",
            transition: "background 0.4s ease",
        }}>
            <div className="service-inner">
                <div className="service-header">
                    <p className="label-gold">{concept === "bottle" ? "Bottle Package" : "Cup Package"}</p>
                    <h2 className="service-title">Service<br/><em>{svc.title}</em></h2>
                    <p style={{
                        fontFamily: "var(--ff-serif)",
                        fontStyle: "italic",
                        fontSize: "1rem",
                        color: "var(--mid)",
                        marginTop: "1rem"
                    }}>
                        {svc.subtitle}
                    </p>
                </div>

                <div className="service-grid">
                    {svc.items.map((s, i) => (
                        <div key={s.label} className="service-card" style={{background: svc.bgs[i]}}>
                            <span className="service-number">0{i + 1}</span>
                            <h4 className="service-label">{s.label}</h4>
                            <div className="service-divider"/>
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
            bg: "#FFFFFF",
            desc: "Tambah kesan intimate dengan welcome drink berbranding personal yang membuat tamu undangan terkesan dan mengingat momenmu.",
        },
        {
            label: "Birthday",
            bg: "#EDF3FA",
            desc: "Hadirkan party favor yang berkesan dan bisa langsung dinikmati. Label botol bisa dikustomisasi sesuai tema ulang tahun.",
        },
        {
            label: "Corporate",
            bg: "#FFFFFF",
            desc: "Tingkatkan image brand dengan coffee hamper eksklusif untuk klien dan tim. Custom label tersedia sesuai identitas perusahaan.",
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
                            style={{background: ev.bg}}
                        >
                            <div className="event-line"/>
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
   9. CONTACT — dengan integrasi FORMSPREE
   ============================================================

   ┌─ CARA SETUP FORMSPREE (5 menit, GRATIS 50 email/bulan) ─┐
   │                                                          │
   │  1. Buka https://formspree.io/register                   │
   │  2. Daftar pakai email kacamataramah48@gmail.com         │
   │  3. Verifikasi email (cek inbox Gmail)                   │
   │  4. Login → klik "+ New form" → beri nama bebas          │
   │  5. Akan muncul endpoint seperti:                        │
   │       https://formspree.io/f/xyzabc123                   │
   │  6. Copy ID setelah /f/  (contoh: xyzabc123)             │
   │  7. Paste ke variabel FORMSPREE_ID di bawah ↓            │
   │  8. Email PERTAMA yang masuk akan minta konfirmasi —     │
   │     cek Gmail dan klik link "Confirm" dari Formspree     │
   │                                                          │
   └──────────────────────────────────────────────────────────┘

   ── GANTI NILAI INI dengan ID Formspree Anda ── */
const FORMSPREE_ID = "xrejeakr";  /* contoh: "xyzabc123" */
/* ── ^^^ JANGAN sertakan https://formspree.io/f/ — hanya ID-nya saja ── */


function Contact() {
    const [form, setForm] = useState({name: "", email: "", whatsapp: "", event: "", message: ""});
    const [status, setStatus] = useState("");  /* "" | "sending" | "sent" | "error" */
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("sending");
        setErrorMsg("");

        /* Validasi: pastikan FORMSPREE_ID sudah diisi */
        if (!FORMSPREE_ID || FORMSPREE_ID === "REPLACE_WITH_YOUR_ID") {
            setStatus("error");
            setErrorMsg("Form belum disetup. Silakan hubungi langsung via WhatsApp di +62 851-5624-9026.");
            return;
        }

        try {
            const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({
                    /* Field-field ini akan jadi isi email yang Anda terima */
                    name: form.name,
                    email: form.email,
                    whatsapp: form.whatsapp,
                    event: form.event,
                    message: form.message,
                    /* _subject mengubah subject email yang masuk ke Gmail Anda */
                    _subject: `RDS Coffee — Inquiry Event ${form.event || ""} dari ${form.name}`,
                    /* _replyto memungkinkan Anda klik "Reply" dan langsung balas ke pelanggan */
                    _replyto: form.email,
                }),
            });

            if (response.ok) {
                setStatus("sent");
                setForm({name: "", email: "", whatsapp: "", event: "", message: ""});  /* reset form */
            } else {
                /* Coba ambil pesan error dari Formspree */
                const data = await response.json().catch(() => ({}));
                const msg = data?.errors?.[0]?.message || "Gagal mengirim pesan. Silakan coba lagi.";
                setStatus("error");
                setErrorMsg(msg);
            }
        } catch (err) {
            /* Network error / offline */
            setStatus("error");
            setErrorMsg("Tidak dapat terhubung. Periksa koneksi internet Anda.");
        }
    };

    /* Reset form supaya bisa kirim pesan baru */
    const resetForm = () => {
        setStatus("");
        setErrorMsg("");
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
                    <div className="gold-line" style={{marginBottom: "2rem"}}/>
                    <p style={{
                        fontFamily: "var(--ff-body)",
                        fontSize: "0.88rem",
                        fontWeight: 300,
                        color: "var(--mid)",
                        lineHeight: 1.85,
                        marginBottom: "3rem"
                    }}>
                        Konsultasikan kebutuhanmu bersama kami. Kami akan bantu memilih varian terbaik dan tampilan
                        botol yang sesuai tema eventmu.
                    </p>

                    {/*
            INFO KONTAK:
            Ubah nilai di bawah untuk mengganti data kontak owner.
          */}
                    {[
                        ["Lokasi", "Depok, Jawa Barat, Indonesia"],
                        ["Email Owner", "kacamataramah48@gmail.com"],
                        ["WhatsApp", "+62 851-5624-9026"],
                        ["Free Transport", "Area Depok"],
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
                            <button
                                type="button"
                                onClick={resetForm}
                                className="btn-submit"
                                style={{marginTop: "2rem"}}
                            >
                                Kirim Pesan Lain
                            </button>
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
                                    onChange={e => setForm(p => ({...p, name: e.target.value}))}
                                />
                            </div>
                            <div>
                                <label className="form-label">Email</label>
                                <input
                                    type="email" required
                                    placeholder="email@example.com"
                                    className="form-input"
                                    value={form.email}
                                    onChange={e => setForm(p => ({...p, email: e.target.value}))}
                                />
                            </div>
                            <div>
                                <label className="form-label">Nomor WhatsApp</label>
                                <input
                                    type="tel" required
                                    placeholder="08xx-xxxx-xxxx atau +62 8xx"
                                    className="form-input"
                                    value={form.whatsapp}
                                    onChange={e => setForm(p => ({...p, whatsapp: e.target.value}))}
                                    /* Pattern: terima 08xx, +628xx, atau 628xx, panjang 9-15 digit
                                       Karakter -, spasi, dan ( ) diperbolehkan untuk readability */
                                    pattern="^(\+?62|0)[\s\-]?8[1-9][0-9]{1}[\s\-]?[0-9]{3,4}[\s\-]?[0-9]{3,5}$"
                                    title="Format: 08xx-xxxx-xxxx atau +62 8xx-xxxx-xxxx"
                                    inputMode="tel"
                                />
                            </div>
                            <div>
                                <label className="form-label">Jenis Event</label>
                                <select
                                    className="form-select"
                                    value={form.event}
                                    onChange={e => setForm(p => ({...p, event: e.target.value}))}
                                    style={{color: form.event ? "var(--charcoal)" : "var(--muted)"}}
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
                                    onChange={e => setForm(p => ({...p, message: e.target.value}))}
                                />
                            </div>

                            {/* Tampilan error — muncul kalau gagal kirim */}
                            {status === "error" && (
                                <div className="form-error">
                                    <strong>Gagal mengirim:</strong> {errorMsg}
                                </div>
                            )}

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
                        src="images/logo-footer.png"
                        alt="RDS Coffee"
                    />

                    <nav className="footer-links">
                        {[
                            ["Produk", "#produk"],
                            ["Service", "#service"],
                            ["Event", "#event"],
                            ["Tentang", "#tentang"],
                            ["Kontak", "#kontak"],
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
    const [concept, setConcept] = useState(DEFAULT_CONCEPT);
    return (
        <>
            <Navbar/>
            <Hero/>
            <About/>
            <Products concept={concept} setConcept={setConcept}/>
            <Service concept={concept}/>
            <Events/>
            <Contact/>
            <Footer/>
        </>
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
