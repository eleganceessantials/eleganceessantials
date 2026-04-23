import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import fs from "fs";
import path from "path";
import { MongoClient } from "mongodb";

type Product = {
    name: string;
    slug: string;
    price: number;
    discountPrice?: number;
    category: string;
    image: string;
    description: string;
};

type PdfRow = {
    name: string;
    price?: number;
    description?: string;
};

type ParsedImage = {
    fileName: string;
    sourcePath: string;
    publicPath: string;
    normalizedTitle: string;
    title: string;
    price?: number;
    discountPrice?: number;
};

const uri = process.env.MONGODB_URI;

if (!uri) {
    throw new Error("MONGODB_URI is not defined in environment variables");
}

const DB_NAME = "elegance_essentials";
const COLLECTION_NAME = "products";
const CATEGORY = "test";

const SCRIPT_IMG_DIR = path.join(process.cwd(), "scripts", "imgs");
const PUBLIC_IMG_DIR = path.join(process.cwd(), "public", "seed-images");
const PUBLIC_IMG_PREFIX = "/seed-images";
const PLACEHOLDER_IMAGE = "https://placehold.co/600x600/png?text=Product+Image";

function slugify(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/&/g, " and ")
        .replace(/\+/g, " plus ")
        .replace(/[^a-z0-9\s-]/g, " ")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
}

function cleanTypos(text: string): string {
    return text
        .toUpperCase()
        .replace(/\bWHITINING\b/g, "WHITENING")
        .replace(/\bWNITENING\b/g, "WHITENING")
        .replace(/\bWHTENING\b/g, "WHITENING")
        .replace(/\bLET\b/g, "LEE")
        .replace(/\bLMON\b/g, "LEMON")
        .replace(/\bVOUME\b/g, "VOLUME")
        .replace(/\bWHITENINER\b/g, "WHITENING")
        .replace(/\bSOOTHING LOTION\b/g, "SOOTHING")
        .replace(/\bSKIN GLOW SCRUB 9 1\b/g, "SKIN GLOW 9 1")
        .replace(/\bSKIN GLOW SCRUB 9\+1\b/g, "SKIN GLOW 9 1")
        .replace(/\bSKIN GLOW 9\+1\b/g, "SKIN GLOW 9 1")
        .replace(/\bHERBAL ROOTER AMPOULS\b/g, "HERBAL ROOTER")
        .replace(/\bANTI ACNE ASTRIGENT\b/g, "ANTI ACNE ASTRINGENT");
}

function normalizeTitle(text: string): string {
    const cleaned = cleanTypos(text)
        .replace(/\.[a-z0-9]+$/i, "")
        .replace(/^\s*\d+\s*-\s*\d+\s*/g, "")
        .replace(/\(\d+\)\s*$/g, "")
        .replace(/[·&,+()/]/g, " ")
        .replace(/[^A-Z0-9\s-]/g, " ")
        .replace(/\s+/g, " ")
        .trim();

    return cleaned;
}

function tokenize(text: string): string[] {
    return normalizeTitle(text)
        .split(" ")
        .map((t) => t.trim())
        .filter(Boolean);
}

function similarityScore(a: string, b: string): number {
    const aTokens = new Set(tokenize(a));
    const bTokens = new Set(tokenize(b));

    if (aTokens.size === 0 || bTokens.size === 0) return 0;

    let intersection = 0;
    for (const token of aTokens) {
        if (bTokens.has(token)) intersection++;
    }

    const union = new Set([...aTokens, ...bTokens]).size;
    let score = intersection / union;

    if (normalizeTitle(a) === normalizeTitle(b)) {
        score += 2;
    }

    return score;
}

function ensureDir(dirPath: string) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

function copyImageToPublic(fileName: string, sourcePath: string): string {
    ensureDir(PUBLIC_IMG_DIR);

    const targetPath = path.join(PUBLIC_IMG_DIR, fileName);
    if (!fs.existsSync(targetPath)) {
        fs.copyFileSync(sourcePath, targetPath);
    }

    return `${PUBLIC_IMG_PREFIX}/${encodeURIComponent(fileName)}`;
}

function parseImageFile(filePath: string): ParsedImage {
    const fileName = path.basename(filePath);
    const rawName = fileName.replace(path.extname(fileName), "").trim();

    const priceMatch = rawName.match(/^(\d+)\s*-\s*(\d+)\s+(.+)$/i);

    let title = rawName;
    let price: number | undefined;
    let discountPrice: number | undefined;

    if (priceMatch) {
        const first = Number(priceMatch[1]);
        const second = Number(priceMatch[2]);
        title = priceMatch[3].trim();

        price = Math.max(first, second);
        discountPrice = Math.min(first, second);
    }

    title = title.replace(/\(\d+\)\s*$/g, "").trim();

    return {
        fileName,
        sourcePath: filePath,
        publicPath: copyImageToPublic(fileName, filePath),
        normalizedTitle: normalizeTitle(title),
        title,
        price,
        discountPrice,
    };
}

function loadImages(): ParsedImage[] {
    if (!fs.existsSync(SCRIPT_IMG_DIR)) {
        console.warn(`Image folder not found: ${SCRIPT_IMG_DIR}`);
        return [];
    }

    const allowedExts = new Set([".jpg", ".jpeg", ".png", ".webp"]);
    const files = fs
        .readdirSync(SCRIPT_IMG_DIR)
        .filter((file) => allowedExts.has(path.extname(file).toLowerCase()))
        .map((file) => path.join(SCRIPT_IMG_DIR, file));

    return files.map(parseImageFile);
}

function findBestImageForProduct(
    productName: string,
    fallbackPrice: number | undefined,
    images: ParsedImage[]
): ParsedImage | undefined {
    const target = normalizeTitle(productName);

    const candidates = images
        .map((img) => {
            const score = similarityScore(target, img.normalizedTitle);
            const priceDistance =
                typeof fallbackPrice === "number" && typeof img.price === "number"
                    ? Math.abs(fallbackPrice - img.price)
                    : Number.MAX_SAFE_INTEGER;

            return { img, score, priceDistance };
        })
        .filter((item) => item.score >= 0.45)
        .sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score;
            if (a.priceDistance !== b.priceDistance) return a.priceDistance - b.priceDistance;
            return a.img.fileName.localeCompare(b.img.fileName);
        });

    return candidates[0]?.img;
}

function uniqueSlug(base: string, used: Set<string>): string {
    if (!used.has(base)) {
        used.add(base);
        return base;
    }

    let count = 2;
    while (used.has(`${base}-${count}`)) {
        count++;
    }

    const next = `${base}-${count}`;
    used.add(next);
    return next;
}

const pdfRows: PdfRow[] = [
    {
        name: "LEE WHITENING SKIN SHINER",
        price: 839,
        description: "Removes skin dirt and enhances skin in natural glow 500 ML",
    },
    {
        name: "LEE WHITENING CLEANSER",
        price: 829,
        description: "Removes Impurities works deeply without dryness 500 ML",
    },
    {
        name: "LEE WHITENING SKIN TONER",
        price: 824,
        description: "Beauty Secret Skin Softner Skin Tonic 500 ML",
    },
    {
        name: "LEE WHITENING SOOTHING LOTION",
        price: 839,
        description: "Act as an antifungal antiseptic disinfectant 500 ML",
    },
    {
        name: "LEE WHITENING FACE WASH",
        price: 943,
        description: "Act as a antiseptic Remove Dirt & Oil 500 ML",
    },
    {
        name: "LEE DOUBLE ACTION",
        price: 1065,
        description: "Daily Moisturizer Anti-Wrinkle Cream",
    },
    {
        name: "LEE WHITENING MULTI ACTION",
        price: 1184,
        description: "LEE WHITENING MULTI ACTION",
    },
    {
        name: "LEE SKIN GLOW SCRUB 9+1",
        price: 1051,
        description: "Full of Multi-Vitamin 9 in 1",
    },
    {
        name: "LEE MASSAGE CREAM",
        price: 1068,
        description: "For all skin types.Removes Skin dead cells gently",
    },
    {
        name: "LEE EXTRA MASSAGE",
        price: 1056,
        description: "For all skin types remove extra skin dead cells gently",
    },
    {
        name: "LEE MUD MASK",
        price: 1139,
        description: "Hydrating & Brightening Feel beautiful in 5 minutes",
    },
    {
        name: "LEE WHITENINER MASK",
        price: 932,
        description: "Feel Beautiful in 5 minutes 500 ML",
    },
    {
        name: "LEE APRICOT SCRUB",
        price: 999,
        description: "with natural apricot grains Removes Skin Dirt",
    },
    {
        name: "LEE HERBAL SCRUB",
        price: 1199,
        description: "Herbal Scrub",
    },
    {
        name: "LEE ANTI ACNE ASTRIGENT",
        price: 1199,
        description: "Oil Control 500 ML",
    },
    {
        name: "LEE WHITINING LMON FACE WASH",
        price: 1199,
        description: "Oil Clear Cleansing Foam Beauty secret Oil Clear Skin 500 ML",
    },
    {
        name: "LEE ANTI ACNE CREAM",
        price: 1139,
        description: "Leaves your skin without any Blemish",
    },
    {
        name: "LEE ANTI ACNE MASK",
        price: 1056,
        description: "LEE ANTI ACNE MASK",
    },
    {
        name: "LEE BLONDER GEL",
        price: 1476,
        description: "Jelly-Powder for Highest Bleaching",
    },
    {
        name: "LEE VOLUME 20",
        price: 1163,
        description: "LEE VOLUME 20",
    },
    {
        name: "LEE VOUME 40",
        price: 1260,
        description: "LEE VOUME 40",
    },
    {
        name: "LEE HERBAL ROOTER",
        price: 1439,
        description: "LEE HERBAL ROOTER",
    },

    { name: "LEE WHITENING SKIN SHINER", price: 299, description: "LEE WHITENING SKIN SHINER" },
    { name: "LEE WNITENING CLEANSER", price: 299, description: "LEE WNITENING CLEANSER" },
    { name: "LEE WHITENING TONER", price: 299, description: "LEE WHITENING TONER" },
    { name: "LEE WHITENING SOOTHING", price: 299, description: "LEE WHITENING SOOTHING" },
    { name: "LEE WHITENING FACE WASH", price: 359, description: "LEE WHITENING FACE WASH" },
    { name: "LEE DOUBLE ACTION", price: 348, description: "Daily Moisturizer Anti-Wrinkle Cream" },
    { name: "LEE WHITENING MULTI ACTION", price: 384, description: "LEE WHITENING MULTI ACTION" },
    { name: "LEE SKIN GLOW 9+1", price: 351, description: "LEE SKIN GLOW 9+1" },
    { name: "LEE WHITENING MASSAGE CREAM", price: 337, description: "LEE WHITENING MASSAGE CREAM" },
    { name: "LEE WHITENING EXTRA MASSAGE", price: 358, description: "LEE WHITENING EXTRA MASSAGE" },
    { name: "LEE MUD HYDRATING MASK", price: 359, description: "LEE MUD HYDRATING MASK" },
    { name: "LEE WHITENING MASK", price: 335, description: "LEE WHITENING MASK" },
    { name: "LEE WHITENING APRICOT SCRUB", price: 342, description: "LEE WHITENING APRICOT SCRUB" },
    { name: "LEE WHITENING HERBAL SCRUB", price: 336, description: "LEE WHITENING HERBAL SCRUB" },
    { name: "LEE ANTI ACNE CREAM", price: 294, description: "LEE ANTI ACNE CREAM" },
    { name: "LEE ANTI ACNE MASK", price: 348, description: "LEE ANTI ACNE MASK" },
    { name: "LEE BLONDER GEL", price: 421, description: "LEE BLONDER GEL" },
    { name: "LEE VOLUME 20", price: 330, description: "LEE VOLUME 20" },

    { name: "LEE WHITENING SKIN SHINER", price: 1559, description: "LEE WHITENING SKIN SHINER" },
    { name: "LEE WHTENING CLEANSER", price: 1559, description: "LEE WHTENING CLEANSER" },
    { name: "LET WHITENING TONER", price: 1559, description: "LET WHITENING TONER" },
    { name: "LEE WHITENING SOOTHING", price: 1559, description: "LEE WHITENING SOOTHING" },
    { name: "LEE WHITENING FACE WASH", price: 1679, description: "LEE WHITENING FACE WASH" },
    { name: "LEE VOLUME 20", price: 5159, description: "LEE VOLUME 20" },
    { name: "LEE VOLUME 40", price: 5399, description: "LEE VOLUME 40" },
    { name: "LEE HERBAL ROOTER AMPOULS", price: 5280, description: "LEE HERBAL ROOTER AMPOULS" },
    { name: "GOOD GIRL SIRIUS AMPOULS", price: 2699, description: "GOOD GIRL SIRIUS AMPOULS" },
    { name: "GOOD GIRL RIGIL AMPOULS", price: 2699, description: "GOOD GIRL RIGIL AMPOULS" },
    { name: "GOOD GIRL CANOPUS 3 IN 1 AMPOULS", price: 2699, description: "GOOD GIRL CANOPUS 3 IN 1 AMPOULS" },

    {
        name: "BELLA LUJO SKIN POLISH",
        price: 1679,
        description: "ESMALTE DE PIEL Ultra Whitening Ultra Blanqueamiento",
    },
    {
        name: "BELLA LUJO VITAMIN C SERUM",
        price: 5159,
        description: "Makes your skin healthier and attractive",
    },
    {
        name: "BELLA LUJO ANTI ACNE SERUM",
        price: 5399,
        description: "Acne clear serum Blemishless skin",
    },
    {
        name: "BELLA LUJO MULTIVITAMIN SERUM",
        price: 5280,
        description: "Multivitamin serum Natural & Baby skin Special Edition",
    },
    {
        name: "BELLA LUJO HAIR SERUM",
        price: 2699,
        description: "Luxurious Nourishment For Healthy Hair.",
    },
    {
        name: "BELLA LUJO SKIN LIGHTENING SERUM AMPOULS",
        price: 2699,
        description: "Aclaramiento De Piel",
    },
    {
        name: "BELLA LUJO ANTI ACNE FACE WASH",
        price: 2699,
        description: "Purify Clear Calm, Sulfate Free, Controls oil",
    },
    {
        name: "BELLA LUJO ORGANIC SKIN LIGHTENING FACE WASH",
        price: 5988,
        description:
            "Low-Foaming Luxury Face Wash Organic Gentle Botanical Purity For Sensitive Dry & Balanced Skin Enriched with Aloe Chamomile & Green Tea Silky cleanse Without Dryness Vegan, Cruelty-Free.",
    },
    {
        name: "BELLA LUJO VITAMIN C FACE WASH",
        price: 4560,
        description:
            "Brighten Cleanse, Glow Dermatologically Tested Pure Ascorbic Acid Vitamin C For All Skin Types. Gently removes impurities & dullness. Restores skin's natural glow and clarity.",
    },
    {
        name: "BELLA LUJO SKIN LIGHTENING SERUM FOR MEN",
        price: 4560,
        description: "Skin Lightening Serum Aclaramiento De Piel JUST FOR MEN",
    },
    {
        name: "LEE WHITENING SOOTHING",
        price: 4560,
        description: "LEE WHITENING SOOTHING",
    },
];

function buildPdfProducts(images: ParsedImage[]): Product[] {
    const usedSlugs = new Set<string>();

    return pdfRows.map((row) => {
        const matchedImage = findBestImageForProduct(row.name, row.price, images);

        const finalPrice =
            typeof matchedImage?.price === "number" ? matchedImage.price : row.price ?? 0;

        const finalDiscount =
            typeof matchedImage?.discountPrice === "number"
                ? matchedImage.discountPrice
                : undefined;

        const slugBase = slugify(
            `${row.name}-${finalPrice}${typeof finalDiscount === "number" ? `-${finalDiscount}` : ""}`
        );

        return {
            name: row.name,
            slug: uniqueSlug(slugBase, usedSlugs),
            price: finalPrice,
            discountPrice: finalDiscount,
            category: CATEGORY,
            image: matchedImage?.publicPath ?? PLACEHOLDER_IMAGE,
            description: row.description?.trim() || row.name,
        };
    });
}

function buildImageOnlyProducts(images: ParsedImage[], existing: Product[]): Product[] {
    const usedSlugs = new Set(existing.map((p) => p.slug));
    const existingNormalizedNames = new Set(existing.map((p) => normalizeTitle(p.name)));

    const imageOnlyProducts: Product[] = [];

    for (const img of images) {
        const normalized = normalizeTitle(img.title);

        if (existingNormalizedNames.has(normalized)) {
            continue;
        }

        const productName = img.title.trim();
        const finalPrice = typeof img.price === "number" ? img.price : 0;
        const finalDiscount =
            typeof img.discountPrice === "number" ? img.discountPrice : undefined;

        const slugBase = slugify(
            `${productName}-${finalPrice}${typeof finalDiscount === "number" ? `-${finalDiscount}` : ""}`
        );

        imageOnlyProducts.push({
            name: productName,
            slug: uniqueSlug(slugBase, usedSlugs),
            price: finalPrice,
            discountPrice: finalDiscount,
            category: CATEGORY,
            image: img.publicPath,
            description: productName,
        });
    }

    return imageOnlyProducts;
}

async function seedProducts() {
    const client = new MongoClient(uri!);

    try {
        const images = loadImages();
        console.log(`Found ${images.length} images in scripts/imgs`);

        const pdfProducts = buildPdfProducts(images);
        const imageOnlyProducts = buildImageOnlyProducts(images, pdfProducts);
        const allProducts = [...pdfProducts, ...imageOnlyProducts];

        console.log(`PDF products: ${pdfProducts.length}`);
        console.log(`Extra image-only products: ${imageOnlyProducts.length}`);
        console.log(`Total products to process: ${allProducts.length}`);

        await client.connect();

        const db = client.db(DB_NAME);
        const collection = db.collection<Product>(COLLECTION_NAME);

        const operations = allProducts.map((product) => ({
            updateOne: {
                filter: { slug: product.slug },
                update: { $set: product },
                upsert: true,
            },
        }));

        const result = await collection.bulkWrite(operations);

        console.log("Seed completed.");
        console.log(`Matched: ${result.matchedCount}`);
        console.log(`Modified: ${result.modifiedCount}`);
        console.log(`Upserted: ${result.upsertedCount}`);

        const noImageCount = allProducts.filter((p) => p.image === PLACEHOLDER_IMAGE).length;
        const noDiscountCount = allProducts.filter((p) => typeof p.discountPrice !== "number").length;

        console.log(`Using placeholder image: ${noImageCount}`);
        console.log(`Without discountPrice: ${noDiscountCount}`);
    } catch (error) {
        console.error("Seed failed:", error);
        process.exitCode = 1;
    } finally {
        await client.close();
    }
}

seedProducts();