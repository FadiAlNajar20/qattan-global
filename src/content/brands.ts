// Verified brand logo URLs from Shopify CDN (qattanglobal.com store)
// These are used in the brand showcase sections

export interface BrandLogo {
  name: string;
  url: string;
  category:
    | "perfume"
    | "appliance"
    | "cosmetics"
    | "watch"
    | "sunglass"
    | "fashion"
    | "skincare";
}

const CDN = "https://cdn.shopify.com/s/files/1/0983/7936/6698/collections";

export const brandLogos: BrandLogo[] = [
  // Perfumes
  {
    name: "Guerlain",
    url: `${CDN}/GUERLAIN-LOGO.webp?v=1777130729&width=500`,
    category: "perfume",
  },
  {
    name: "Bvlgari",
    url: `${CDN}/BVLGARI-LOGO.webp?v=1777130726&width=500`,
    category: "perfume",
  },
  {
    name: "Xerjoff",
    url: `${CDN}/XERJOFF-LOGO.webp?v=1777130736&width=500`,
    category: "perfume",
  },
  {
    name: "Yves Saint Laurent",
    url: `${CDN}/YVES-SAINT-LAURENT-LOGO.webp?v=1777130732&width=500`,
    category: "perfume",
  },
  {
    name: "Tom Ford",
    url: `${CDN}/TOM-FORD-LOGO.webp?v=1777130731&width=500`,
    category: "perfume",
  },
  {
    name: "Tiziana Terenzi",
    url: `${CDN}/TIZIANA-TERENZI-LOGO.webp?v=1777130733&width=500`,
    category: "perfume",
  },
  {
    name: "Mancera",
    url: `${CDN}/MANCERA-LOGO.webp?v=1777130729&width=500`,
    category: "perfume",
  },
  {
    name: "Montale",
    url: `${CDN}/MONTALE-LOGO.webp?v=1777130733&width=500`,
    category: "perfume",
  },
  {
    name: "Initio",
    url: `${CDN}/INITIO-LOGO.webp?v=1777130737&width=500`,
    category: "perfume",
  },
  {
    name: "Amouage",
    url: `${CDN}/AMOUAGE-LOGO.webp?v=1777130736&width=500`,
    category: "perfume",
  },
  {
    name: "Lattafa",
    url: `${CDN}/LATTAFA-LOGO.webp?v=1777130734&width=500`,
    category: "perfume",
  },
  {
    name: "Carolina Herrera",
    url: `${CDN}/CAROLINA-HERRERA-LOGO.webp?v=1777130725&width=500`,
    category: "perfume",
  },
  {
    name: "Hermès",
    url: `${CDN}/HERMES-LOGO.webp?v=1777130730&width=500`,
    category: "perfume",
  },
  {
    name: "Chanel",
    url: `${CDN}/CHANEL-LOGO.webp?v=1777130725&width=500`,
    category: "perfume",
  },
  {
    name: "Lancôme",
    url: `${CDN}/LANCOME-LOGO.webp?v=1777130729&width=500`,
    category: "perfume",
  },
  {
    name: "Dior",
    url: `${CDN}/CHRISTIAN-DIOR-LOGO_422ffc43-1c8a-4c6e-8f33-882156687a46.webp?v=1777130737&width=500`,
    category: "perfume",
  },
  {
    name: "Giorgio Armani",
    url: `${CDN}/GIORGIO-ARMANI-LOGO.webp?v=1777130729&width=500`,
    category: "perfume",
  },
  {
    name: "Hugo Boss",
    url: `${CDN}/HUGO-BOSS-LOGO.webp?v=1777130729&width=500`,
    category: "perfume",
  },
  {
    name: "Givenchy",
    url: `${CDN}/GIVENCHY-LOGO.webp?v=1777130725&width=500`,
    category: "perfume",
  },
  {
    name: "Paco Rabanne",
    url: `${CDN}/PACO-RABANNE-LOGO.webp?v=1777130733&width=500`,
    category: "perfume",
  },
  {
    name: "Dolce & Gabbana",
    url: `${CDN}/DOLCE-_-GABBANA-LOGO.webp?v=1777130729&width=500`,
    category: "perfume",
  },
  {
    name: "Burberry",
    url: `${CDN}/BURBERRY-LOGO.webp?v=1777130726&width=500`,
    category: "perfume",
  },
  {
    name: "Gucci",
    url: `${CDN}/GUCCI-LOGO.webp?v=1777130730&width=500`,
    category: "perfume",
  },
  {
    name: "Prada",
    url: `${CDN}/PRADA-LOGO.webp?v=1777130729&width=500`,
    category: "perfume",
  },
  {
    name: "Valentino",
    url: `${CDN}/VALENTINO-LOGO.webp?v=1777130733&width=500`,
    category: "perfume",
  },
  {
    name: "Kenzo",
    url: `${CDN}/KENZO-LOGO.webp?v=1777130729&width=500`,
    category: "perfume",
  },
  {
    name: "Cartier",
    url: `${CDN}/CARTIER-LOGO.webp?v=1777130725&width=500`,
    category: "perfume",
  },
  {
    name: "Davidoff",
    url: `${CDN}/DAVIDOFF-LOGO.webp?v=1777130725&width=500`,
    category: "perfume",
  },
  {
    name: "Azzaro",
    url: `${CDN}/AZZARO-LOGO.webp?v=1777130724&width=500`,
    category: "perfume",
  },
  {
    name: "Cacharel",
    url: `${CDN}/CACHAREL-LOGO.webp?v=1777130725&width=500`,
    category: "perfume",
  },
  {
    name: "Dunhill",
    url: `${CDN}/DUNHILL-LOGO.webp?v=1777130725&width=500`,
    category: "perfume",
  },
  {
    name: "Elie Saab",
    url: `${CDN}/ELIE-SAAB-LOGO.webp?v=1777130730&width=500`,
    category: "perfume",
  },
  {
    name: "Bond No.9",
    url: `${CDN}/BOND-NO.9-LOGO.webp?v=1777130737&width=500`,
    category: "perfume",
  },
  {
    name: "Narciso Rodriguez",
    url: `${CDN}/NARCISO-RODRIGUEZ-LOGO.webp?v=1777130730&width=500`,
    category: "perfume",
  },
  {
    name: "Lalique",
    url: `${CDN}/LALIQUE-LOGO.webp?v=1777130729&width=500`,
    category: "perfume",
  },
  {
    name: "Versace",
    url: `${CDN}/VERSACE-LOGO.webp?v=1777130733&width=500`,
    category: "watch",
  },
  // Home Appliances
  {
    name: "Moulinex",
    url: `${CDN}/moulinex_logo_square.webp?v=1780573100&width=500`,
    category: "appliance",
  },
  {
    name: "Philips",
    url: `${CDN}/PHILIPS-LOGO.webp?v=1777130732&width=500`,
    category: "appliance",
  },
  {
    name: "Xiaomi",
    url: `${CDN}/Xiaomi_Square_Logo.webp?v=1780574286&width=500`,
    category: "appliance",
  },
  {
    name: "Braun",
    url: `${CDN}/BRAUN-LOGO.webp?v=1777130725&width=500`,
    category: "appliance",
  },
  {
    name: "Tefal",
    url: `${CDN}/tefal_logo_square.webp?v=1780573057&width=500`,
    category: "appliance",
  },
  {
    name: "Kenwood",
    url: `${CDN}/kenwood_logo_square.webp?v=1780572964&width=500`,
    category: "appliance",
  },
  {
    name: "Kärcher",
    url: `${CDN}/KARCHER_5a8f70e7-acb4-4ad8-b768-2173604a8cfe.webp?v=1780576012&width=500`,
    category: "appliance",
  },
  {
    name: "BaByliss",
    url: `${CDN}/BABYLISS-LOGO.webp?v=1777130725&width=500`,
    category: "appliance",
  },
  {
    name: "De'Longhi",
    url: `${CDN}/delonghi_logo_square.webp?v=1780573147&width=500`,
    category: "appliance",
  },
  {
    name: "Ninja",
    url: `${CDN}/NINJA-LOGO.webp?v=1777130736&width=500`,
    category: "appliance",
  },
  {
    name: "Krups",
    url: `${CDN}/KRUPS_daa86dde-32a0-467f-b7e3-0a2065720c61.webp?v=1780576074&width=500`,
    category: "appliance",
  },
  {
    name: "Bissell",
    url: `${CDN}/BISELL_LOGO_SQUARE.webp?v=1780574145&width=500`,
    category: "appliance",
  },
  // Skincare
  {
    name: "La Roche-Posay",
    url: `${CDN}/LA-ROCHE-POSAY-LOGO.webp?v=1777130730&width=500`,
    category: "skincare",
  },
  {
    name: "Vichy",
    url: `${CDN}/VICHY-LOGO.webp?v=1777130733&width=500`,
    category: "skincare",
  },
  {
    name: "CeraVe",
    url: `${CDN}/CERAVE-LOGO.webp?v=1777130735&width=500`,
    category: "skincare",
  },
  {
    name: "Cetaphil",
    url: `${CDN}/CETAPHIL-LOGO.webp?v=1777130725&width=500`,
    category: "skincare",
  },
  {
    name: "Bioderma",
    url: `${CDN}/BIODERMA-LOGO.webp?v=1777130725&width=500`,
    category: "skincare",
  },
  {
    name: "Avène",
    url: `${CDN}/Avene_d07af72c-90e8-4f51-8471-bde706155c6f.webp?v=1777130725&width=500`,
    category: "skincare",
  },
  {
    name: "Eucerin",
    url: `${CDN}/EUCERIN-LOGO.webp?v=1777130728&width=500`,
    category: "skincare",
  },
  {
    name: "The Ordinary",
    url: `${CDN}/THE-ORDINARY-LOGO.webp?v=1777130734&width=500`,
    category: "skincare",
  },
  // Cosmetics
  {
    name: "L'Oréal",
    url: `${CDN}/LOREAL-LOGO.webp?v=1777130729&width=500`,
    category: "cosmetics",
  },
  {
    name: "Maybelline",
    url: `${CDN}/MAYBELLINE-LOGO.webp?v=1777130730&width=500`,
    category: "cosmetics",
  },
  {
    name: "Max Factor",
    url: `${CDN}/MAX-FACTOR-LOGO.webp?v=1777130730&width=500`,
    category: "cosmetics",
  },
  {
    name: "Bobbi Brown",
    url: `${CDN}/BOBBI-BROWN-LOGO.webp?v=1777130726&width=500`,
    category: "cosmetics",
  },
  {
    name: "Clinique",
    url: `${CDN}/CLINIQUE-LOGO.webp?v=1777130725&width=500`,
    category: "cosmetics",
  },
  {
    name: "Benefit",
    url: `${CDN}/BENEFIT-LOGO.webp?v=1777130725&width=500`,
    category: "cosmetics",
  },
  {
    name: "Make Up For Ever",
    url: `${CDN}/MAKE-UP-FOR-EVER-LOGO.webp?v=1777130730&width=500`,
    category: "cosmetics",
  },
  // Watches
  {
    name: "Swatch",
    url: `${CDN}/SWATCH-LOGO.webp?v=1777130732&width=500`,
    category: "watch",
  },
  {
    name: "Calvin Klein",
    url: `${CDN}/CALVIN-KLEIN-LOGO.webp?v=1777130725&width=500`,
    category: "watch",
  },
  {
    name: "Tissot",
    url: `${CDN}/TISSOT-LOGO.webp?v=1777130732&width=500`,
    category: "watch",
  },
  {
    name: "Roberto Cavalli",
    url: `${CDN}/ROBERTO-CAVALLI-LOGO.webp?v=1777130733&width=500`,
    category: "watch",
  },
  {
    name: "Victorinox",
    url: `${CDN}/VICTORINOX-LOGO.webp?v=1777130733&width=500`,
    category: "watch",
  },
  {
    name: "Lacoste",
    url: `${CDN}/LACOSTE-LOGO.webp?v=1777130729&width=500`,
    category: "watch",
  },
  {
    name: "Freelook",
    url: `${CDN}/FREELOOK-LOGO.webp?v=1777130737&width=500`,
    category: "watch",
  },
  // Fashion
  {
    name: "Pierre Cardin",
    url: `${CDN}/PIERRE-CARDIN-LOGO_232606eb-a3e3-47c6-adad-390a339e2946.webp?v=1777130735&width=500`,
    category: "fashion",
  },
  {
    name: "Tommy Hilfiger",
    url: `${CDN}/TOMMY-HILFIGER-LOGO.webp?v=1777130733&width=500`,
    category: "fashion",
  },
  {
    name: "Lacoste",
    url: `${CDN}/LACOSTE-LOGO.webp?v=1777130729&width=500`,
    category: "fashion",
  },
  // Sunglasses
  {
    name: "Police",
    url: `${CDN}/POLICE-LOGO.webp?v=1777130729&width=500`,
    category: "sunglass",
  },
  {
    name: "Guess",
    url: `${CDN}/GUESS-LOGO.webp?v=1777130733&width=500`,
    category: "sunglass",
  },
];

// Marquee selection — a curated subset for the home page brand wall
export const marqueeLogos: BrandLogo[] = brandLogos.slice(0, 24);
