const fs = require("fs");
const path = require("path");
const https = require("https");

const IMAGES_TO_DOWNLOAD = [
  // Secondary Angles for interactive PDP gallery
  {
    dest: "public/images/products/product-blouse-linen-wanita-krem-2.jpg",
    url: "https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=800&q=80",
  },
  {
    dest: "public/images/products/product-dress-midi-rayon-navy-2.jpg",
    url: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80",
  },
  {
    dest: "public/images/products/product-outer-cardigan-wanita-sage-2.jpg",
    url: "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&w=800&q=80",
  },
  {
    dest: "public/images/products/product-rok-plisket-wanita-hitam-2.jpg",
    url: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80",
  },
  {
    dest: "public/images/products/product-kemeja-katun-pria-putih-2.jpg",
    url: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
  },
  {
    dest: "public/images/products/product-kaos-polos-pria-navy-2.jpg",
    url: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80",
  },
  {
    dest: "public/images/products/product-celana-chino-pria-khaki-2.jpg",
    url: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80",
  },
  {
    dest: "public/images/products/product-jaket-denim-pria-biru-2.jpg",
    url: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
  },
  {
    dest: "public/images/products/product-sneakers-canvas-putih-2.jpg",
    url: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80",
  },
  {
    dest: "public/images/products/product-flat-shoes-wanita-hitam-2.jpg",
    url: "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=800&q=80",
  },
  {
    dest: "public/images/products/product-boots-chelsea-cokelat-2.jpg",
    url: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=800&q=80",
  },
  {
    dest: "public/images/products/product-sandal-slide-krem-2.jpg",
    url: "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?auto=format&fit=crop&w=800&q=80",
  },
  {
    dest: "public/images/products/product-tote-bag-kanvas-natural-2.jpg",
    url: "https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?auto=format&fit=crop&w=800&q=80",
  },
  {
    dest: "public/images/products/product-sling-bag-mini-terracotta-2.jpg",
    url: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=800&q=80",
  },
  {
    dest: "public/images/products/product-ransel-harian-navy-2.jpg",
    url: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80",
  },
  {
    dest: "public/images/products/product-jam-tangan-minimalis-navy-2.jpg",
    url: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80",
  },
  {
    dest: "public/images/products/product-kacamata-hitam-bulat-2.jpg",
    url: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80",
  },
  {
    dest: "public/images/products/product-scarf-motif-earth-tone-2.jpg",
    url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
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
  console.log(`Starting download of ${IMAGES_TO_DOWNLOAD.length} secondary realistic fashion angles...`);
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
  console.log(`All secondary realistic images downloaded successfully! (${completed}/${IMAGES_TO_DOWNLOAD.length})`);
}

main();
