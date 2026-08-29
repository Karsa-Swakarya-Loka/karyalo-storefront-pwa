const fs = require("fs");
const path = require("path");
const https = require("https");

const IMAGES_TO_DOWNLOAD = [
  // Misc & Hero Banners
  {
    dest: "public/images/misc/hero-home.jpg",
    url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=85",
  },
  {
    dest: "public/images/misc/promo-flash-sale.jpg",
    url: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=85",
  },
  {
    dest: "public/images/misc/promo-new-arrival.jpg",
    url: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=85",
  },

  // Categories
  {
    dest: "public/images/categories/category-wanita.jpg",
    url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
  },
  {
    dest: "public/images/categories/category-pria.jpg",
    url: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80",
  },
  {
    dest: "public/images/categories/category-sepatu.jpg",
    url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80",
  },
  {
    dest: "public/images/categories/category-tas.jpg",
    url: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80",
  },
  {
    dest: "public/images/categories/category-aksesoris.jpg",
    url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
  },

  // 18 Products
  {
    dest: "public/images/products/product-blouse-linen-wanita-krem.jpg",
    url: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?auto=format&fit=crop&w=800&q=80",
  },
  {
    dest: "public/images/products/product-dress-midi-rayon-navy.jpg",
    url: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80",
  },
  {
    dest: "public/images/products/product-outer-cardigan-wanita-sage.jpg",
    url: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80",
  },
  {
    dest: "public/images/products/product-rok-plisket-wanita-hitam.jpg",
    url: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=800&q=80",
  },
  {
    dest: "public/images/products/product-kemeja-katun-pria-putih.jpg",
    url: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80",
  },
  {
    dest: "public/images/products/product-kaos-polos-pria-navy.jpg",
    url: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
  },
  {
    dest: "public/images/products/product-celana-chino-pria-khaki.jpg",
    url: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80",
  },
  {
    dest: "public/images/products/product-jaket-denim-pria-biru.jpg",
    url: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80",
  },
  {
    dest: "public/images/products/product-sneakers-canvas-putih.jpg",
    url: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80",
  },
  {
    dest: "public/images/products/product-flat-shoes-wanita-hitam.jpg",
    url: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80",
  },
  {
    dest: "public/images/products/product-boots-chelsea-cokelat.jpg",
    url: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=800&q=80",
  },
  {
    dest: "public/images/products/product-sandal-slide-krem.jpg",
    url: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=800&q=80",
  },
  {
    dest: "public/images/products/product-tote-bag-kanvas-natural.jpg",
    url: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
  },
  {
    dest: "public/images/products/product-sling-bag-mini-terracotta.jpg",
    url: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80",
  },
  {
    dest: "public/images/products/product-ransel-harian-navy.jpg",
    url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
  },
  {
    dest: "public/images/products/product-jam-tangan-minimalis-navy.jpg",
    url: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80",
  },
  {
    dest: "public/images/products/product-kacamata-hitam-bulat.jpg",
    url: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
  },
  {
    dest: "public/images/products/product-scarf-motif-earth-tone.jpg",
    url: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=800&q=80",
  },
];

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const fullPath = path.resolve(__dirname, "..", destPath);
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const file = fs.createWriteStream(fullPath);

    function get(reqUrl) {
      https
        .get(reqUrl, (response) => {
          // Handle HTTP redirects (301, 302, 307, 308)
          if (
            response.statusCode >= 300 &&
            response.statusCode < 400 &&
            response.headers.location
          ) {
            return get(response.headers.location);
          }

          if (response.statusCode !== 200) {
            file.close();
            fs.unlink(fullPath, () => {});
            return reject(
              new Error(`Failed to download ${reqUrl}: HTTP ${response.statusCode}`)
            );
          }

          response.pipe(file);
          file.on("finish", () => {
            file.close(() => resolve(destPath));
          });
        })
        .on("error", (err) => {
          file.close();
          fs.unlink(fullPath, () => {});
          reject(err);
        });
    }

    get(url);
  });
}

async function main() {
  console.log(`Starting download of ${IMAGES_TO_DOWNLOAD.length} realistic fashion images...`);
  let completed = 0;
  for (const item of IMAGES_TO_DOWNLOAD) {
    try {
      await downloadFile(item.url, item.dest);
      completed++;
      console.log(`[${completed}/${IMAGES_TO_DOWNLOAD.length}] Downloaded: ${item.dest}`);
    } catch (err) {
      console.error(`Error downloading ${item.dest}:`, err.message);
    }
  }
  console.log(`All realistic images downloaded successfully! (${completed}/${IMAGES_TO_DOWNLOAD.length})`);
}

main();
