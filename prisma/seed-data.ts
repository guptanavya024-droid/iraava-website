// Source: "Irava - Product List.xlsx" (Master Product List sheet for the
// full 45-product catalog; Product List sheet for the 14 products that had
// full descriptions/ingredients already written). The other 31 get concise,
// on-brand descriptions written for this catalog, since the spreadsheet had no
// copy for them beyond a category/type/name. `image` matches a filename in
// "Iraava Website/Iraava Naturals/".

export interface SeedProduct {
  category: "FACE_CARE" | "BODY_CARE";
  type: string;
  name: string;
  description: string;
  otherDetails?: string;
  ingredients?: string;
  referenceLink?: string;
  image: string;
}

export const SEED_PRODUCTS: SeedProduct[] = [
  // Face Care: Face Wash
  {
    category: "FACE_CARE",
    type: "Face Wash",
    name: "Aloe Vera Face Wash with Neem & Tulsi",
    description:
      "Enriched with fresh aloe vera extract, this mild cleanser removes dirt, excess oil and impurities without stripping the skin's natural moisture. Ideal for daily use, it leaves your skin soft, clean and naturally glowing.",
    otherDetails:
      "A completely natural face wash with a blend of natural herbs and flowers for a moisturizing skin effect. Specially formulated for oily and sensitive skins. It gently cleans off dirt, unclogs pores and retains the moisture balance of your skin.",
    ingredients:
      "Aqua/Water, Cocamidopropyl Betaine, Aloe Vera Juice, Glycerin, Neem, Tulsi, Rosemary, Rose Flower Extract, Cocodiethanolamide, Hydroxypropyltrimonium Chloride, Potassium Sorbate.",
    referenceLink: "https://vedzonederma.com/products/natural-organic-aloe-vera-face-wash-for-pimples",
    image: "Aloe Vera Face Wash with Neem & Tulsi.png",
  },
  {
    category: "FACE_CARE",
    type: "Face Wash",
    name: "Papaya Face Wash",
    description:
      "Enriched with skin-brightening botanicals and mild cleansing agents, it targets dark spots, tan, acne marks and uneven skin tone while maintaining essential moisture. Suitable for daily use and all skin types.",
    ingredients:
      "Aqua/Water, Cocamidopropyl Betaine, Aloe Vera Juice, Glycerin, Papaya, Aloe Vera & Rose Extract, Cocodiethanolamide, Guar Hydroxypropyltrimonium Chloride, Potassium Sorbate, Harsingar, Manjistha and other natural ingredients.",
    referenceLink: "https://vedzonederma.com/products/anti-pigmentation-papaya-face-wash-for-wrinkles-fine-lines",
    image: "Papaya Face Wash.png",
  },
  {
    category: "FACE_CARE",
    type: "Face Wash",
    name: "Moringa Face Wash",
    description:
      "A gentle daily cleanser with moringa extract, formulated to clear impurities while keeping skin soft and balanced.",
    image: "Moringa Face Wash.png",
  },
  {
    category: "FACE_CARE",
    type: "Face Wash",
    name: "Charcoal Face Wash",
    description:
      "Activated charcoal draws out dirt and excess oil for a deep, gentle cleanse, leaving skin feeling fresh and clear.",
    image: "Charcoal Face Wash.png",
  },
  {
    category: "FACE_CARE",
    type: "Face Wash",
    name: "Honey Moisturizing Face Wash",
    description:
      "A moisturizing cleanser enriched with honey, formulated to clean without stripping the skin's natural softness.",
    image: "Honey Moisturizing Face Wash.png",
  },
  {
    category: "FACE_CARE",
    type: "Face Wash",
    name: "Black Rice Face Wash",
    description:
      "A brightening cleanser with black rice extract, traditionally valued in Indian skincare for evening out skin tone.",
    image: "Black Rice Face Wash.png",
  },
  {
    category: "FACE_CARE",
    type: "Face Wash",
    name: "Lime and Basil Cleansing Face Wash",
    description:
      "A refreshing cleanser with lime and basil (tulsi), formulated to clear daily grime while leaving skin feeling revived.",
    image: "Lime and Basil Cleansing Face Wash.png",
  },
  {
    category: "FACE_CARE",
    type: "Face Wash",
    name: "Rejuvenating Face Wash - Pomegranate",
    description:
      "A rejuvenating cleanser with pomegranate extract, formulated to gently clarify skin while supporting a healthy glow.",
    image: "Rejuvenating Face Wash - Pomegranate.png",
  },

  // Face Care: Face Scrub
  {
    category: "FACE_CARE",
    type: "Face Scrub",
    name: "Exfoliating Black Rice Water Face Scrub",
    description:
      "A gentle exfoliating scrub with black rice water, formulated to lift away dead skin cells and reveal smoother skin.",
    image: "Exfoliating Black Rice Water Face Scrub.png",
  },

  // Face Care: Face Cream
  {
    category: "FACE_CARE",
    type: "Face Cream",
    name: "Papaya Face Cream",
    description:
      "A brightening face cream with papaya extract, formulated to even out skin tone and keep skin nourished through the day.",
    image: "Papaya Face Cream.png",
  },
  {
    category: "FACE_CARE",
    type: "Face Cream",
    name: "Aloe Vera Face Cream",
    description:
      "A lightweight, hydrating cream with aloe vera, formulated to soothe and moisturize skin without feeling heavy.",
    image: "Aloe Vera Face Cream.png",
  },
  {
    category: "FACE_CARE",
    type: "Face Cream",
    name: "Nalpamaradi Face Cream",
    description:
      "Based on the Ayurvedic Nalpamaradi formulation, this cream is designed to brighten skin tone with traditional Indian botanicals.",
    image: "Nalpamaradi Face Cream.png",
  },
  {
    category: "FACE_CARE",
    type: "Face Cream",
    name: "Ubtan Face Cream",
    description:
      "Inspired by the traditional Indian ubtan, this cream blends time-honoured botanicals to gently brighten and nourish skin.",
    image: "Ubtan Face Cream.png",
  },
  {
    category: "FACE_CARE",
    type: "Face Cream",
    name: "Coconut Brightening Face Cream",
    description:
      "A brightening face cream with coconut, formulated to hydrate deeply while supporting a naturally radiant look.",
    image: "Coconut Brightening Face Cream.png",
  },

  // Face Care: Face Serum
  {
    category: "FACE_CARE",
    type: "Face Serum",
    name: "Over-Night Face Serum with Pure Silver",
    description:
      "A natural, anti-aging skin-repair serum designed to restore radiance and vitality. This 30ml serum combines pure silver and herbal ingredients to help tighten the look of pores, support cell renewal, and reduce the appearance of dark spots, marks and fine lines. Its lightweight, non-greasy formula provides hydration, balances sebum levels, and leaves skin soft, plump and supple.",
    otherDetails: "Free from parabens and sulphates, and dermatologically tested for safe, gentle care.",
    ingredients:
      "Almond Oil, Walnut Oil, Basil Oil, Olive Oil, Clove Oil, Eucalyptus Oil, Pure Silver Flakes, Rosemary Oil, Thyme Oil, Lavender Oil, Lemongrass Oil.",
    referenceLink:
      "https://vedzonederma.com/products/face-serum-with-silver-skin-repair-serum-30ml-anti-aging-organic-serum-paraben-sulphate-free",
    image: "Overnight Silver Face Serum.jpg",
  },
  {
    category: "FACE_CARE",
    type: "Face Serum",
    name: "Ayurvedic Face Serum With Basil & Cinnamon",
    description:
      "A powerful blend of Ayurvedic botanicals and modern skin science in a lightweight, fast-absorbing serum. Infused with basil (tulsi) and cinnamon extract, it helps brighten dull skin, deeply hydrate, and improve firmness for a youthful, radiant glow. Suitable for all skin types.",
    ingredients:
      "D.M. Water, Glycerine, extracts of Aloe Vera, Rose, Neem, Papaya, Basil, Cinnamon, Hydroxyethyl Cellulose, Hyaluronic Acid, fragrance, etc.",
    referenceLink: "https://vedzonederma.com/products/face-serum-for-brightens-hydrates-firms-skins-with-basil-cinnamon",
    image: "Basil & Cinnamon Face Serum.png",
  },
  {
    category: "FACE_CARE",
    type: "Face Serum",
    name: "Nalpamaradi Serum",
    description:
      "An Ayurvedic Nalpamaradi-inspired serum formulated to brighten skin tone and support an even, radiant complexion.",
    image: "Nalpamaradi Serum.png",
  },
  {
    category: "FACE_CARE",
    type: "Face Serum",
    name: "Pomegranate Radiant Glow Firming Serum",
    description:
      "A firming serum with pomegranate extract, formulated to support skin elasticity and a radiant, glowing look.",
    image: "Pomegranate Radiant Glow Firming Serum.png",
  },

  // Face Care: Toner
  {
    category: "FACE_CARE",
    type: "Toner",
    name: "Rose Water Toner",
    description:
      "Crafted from fresh rose petals using traditional distillation methods, this refreshing floral mist instantly hydrates, calms and rejuvenates the skin, leaving it soft, radiant and naturally glowing. Suitable for all skin types.",
    ingredients: "Rose Water.",
    referenceLink: "https://vedzonederma.com/products/natural-rose-water-face-body-mist-makeup-remover",
    image: "Rose Water Toner.png",
  },
  {
    category: "FACE_CARE",
    type: "Toner",
    name: "Cucumber Pore Tightening Toner",
    description:
      "A cooling toner with cucumber extract, formulated to refine the look of pores and refresh skin after cleansing.",
    image: "Cucumber Pore Tightening Toner.png",
  },
  {
    category: "FACE_CARE",
    type: "Toner",
    name: "Neem & Tulsi Toner",
    description:
      "A clarifying toner with neem and tulsi, two staples of Indian skincare, formulated to balance and refresh skin.",
    image: "Neem & Tulsi Toner.png",
  },
  {
    category: "FACE_CARE",
    type: "Toner",
    name: "Honey Glow Toner",
    description: "A hydrating toner with honey, formulated to refresh skin and support a naturally healthy glow.",
    image: "Honey Glow Toner.png",
  },
  {
    category: "FACE_CARE",
    type: "Toner",
    name: "Rice Brightening Toner",
    description:
      "A brightening toner with rice extract, a traditional skincare ingredient, formulated to even out skin tone.",
    image: "Rice Brightening Toner.png",
  },
  {
    category: "FACE_CARE",
    type: "Toner",
    name: "Pomegranate Toner",
    description: "A refreshing toner with pomegranate extract, formulated to tone and revive skin after cleansing.",
    image: "Pomegranate Toner.png",
  },

  // Face Care: Face Gel
  {
    category: "FACE_CARE",
    type: "Face Gel",
    name: "Pure Aloe Vera Face Gel",
    description:
      "Crafted from fresh aloe leaves and gently processed to retain maximum nutrients, this multi-purpose gel calms irritated skin, repairs dryness, and supports healthier skin, hair and scalp. Perfect for daily use on all skin types.",
    otherDetails:
      "Lightweight and non-greasy, suiting all skin types and weather conditions. Hydrates skin while keeping it glowing and healthy.",
    ingredients:
      "Aqua, Organic Aloe Barbadensis Leaf Extract, Acrylates/C10-30 Alkyl Acrylate Crosspolymer, Phenoxyethanol, Ethylhexylglycerin.",
    referenceLink: "https://vedzonederma.com/products/pure-aloe-vera-facial-gel",
    image: "Pure Aloe Vera Gel.jpg",
  },
  {
    category: "FACE_CARE",
    type: "Face Gel",
    name: "Ayurvedic D-Tan Charcoal Face Gel Scrub",
    description:
      "Crafted with activated charcoal and Ayurvedic botanicals, this refreshing gel-based scrub removes dead skin cells, unclogs pores and draws out impurities without stripping the skin's natural moisture. Suitable for all skin types, including sensitive skin.",
    ingredients:
      "Activated Charcoal, Aloe Vera, Neem, Tulsi, Turmeric, Licorice, Walnut Shell Powder / Natural Cellulose Beads, Vitamin E, Glycerin, Essential Oils, Xanthan Gum, Citric Acid, Sodium Benzoate, Potassium Sorbate, Purified Water, Coconut Charcoal Powder.",
    referenceLink: "https://vedzonederma.com/products/d-tan-charcoal-face-gel-scrub",
    image: "D-Tan Charcoal Face Gel Scrub.jpg",
  },
  {
    category: "FACE_CARE",
    type: "Face Gel",
    name: "Anti Acne Face Gel For Oily Skin",
    description:
      "Enriched with neem, tea and tulsi, this gel is formulated to help with pimples and acne, regulate sebum production, and gently reduce the look of scars and dead skin cells. Silver present in the formula helps purify skin and balance its pH while deep-cleaning pores.",
    ingredients: "Purified Aqua, Glycerin, Carbomer, Clove, Phenoxyethanol, Extracts of Neem, Aloe Vera, Rosemary, Curcuma Longa (Turmeric), Fragrance, etc.",
    referenceLink: "https://vedzonederma.com/products/natural-organic-anti-acne-face-gel-cream",
    image: "Anti Acne Face Gel.jpg",
  },
  {
    category: "FACE_CARE",
    type: "Face Gel",
    name: "Ayurvedic Papaya Face Gel",
    description:
      "Specially formulated to support a smooth, even skin tone. Helps minimize the look of dark spots, patches and pigmentation. Natural flower extracts support skin structure and help maintain its pH balance.",
    ingredients: "Almond Oil, Basil Oil, Walnut Oil, Extracts of Marigold, Jasmine, Harsingar, Aloe Vera, Rose & Papaya.",
    referenceLink: "https://vedzonederma.com/products/anti-pigmentation-papaya-gel",
    image: "Anti Pigmentation Papaya face Gel.jpg",
  },
  {
    category: "FACE_CARE",
    type: "Face Gel",
    name: "Pomegranate Face Gel",
    description:
      "A lightweight gel with pomegranate extract, formulated to hydrate skin while supporting a healthy, even tone.",
    image: "Pomegranate Face Gel.png",
  },

  // Face Care: Lip Scrub / Lip Balm
  {
    category: "FACE_CARE",
    type: "Lip Scrub",
    name: "Lip Scrub",
    description: "For dark, damaged and chapped lips, formulated with natural oils and butters.",
    ingredients:
      "Walnut Oil, Almond Oil, Vitamin A & E, Olive Oil, Basil (Tulsi) Oil, Orchid Flower Extract, Theobroma Cacao (Cocoa) Seed Butter, Copernicia Cerifera (Carnauba) Wax, Natural Flavour, Cocoa Extract, etc.",
    referenceLink: "https://vedzonederma.com/products/natural-organic-lip-scrub",
    image: "Organic Lip Scrub.jpg",
  },
  {
    category: "FACE_CARE",
    type: "Lip Balm",
    name: "Hydrating Lip Balm",
    description:
      "Crafted with natural ingredients to deeply moisturize, repair and protect dry, chapped lips. With a smooth, buttery texture, it melts instantly to leave lips soft, supple and naturally radiant.",
    ingredients: "Shea & Kokum Butter, Walnut Oil, Coconut Oil, Almond Oil, Carnauba Wax, Fragrance Oil, etc.",
    referenceLink: "https://vedzonederma.com/products/lip-balm-for-hydrating-soft-nourishing-lip",
    image: "Hydrating Lip Balm.jpg",
  },

  // Body Care: Body Lotion
  {
    category: "BODY_CARE",
    type: "Body Lotion",
    name: "Aloe Body Lotion",
    description:
      "A lightweight body lotion with aloe vera, formulated to hydrate skin and leave it feeling soft, not greasy.",
    image: "Aloe Body Lotion.png",
  },
  {
    category: "BODY_CARE",
    type: "Body Lotion",
    name: "Nourishing Milk Body Lotion",
    description:
      "A nourishing body lotion with milk extract, formulated to deeply moisturize and leave skin feeling soft all day.",
    image: "Nourishing Milk Body Lotion.png",
  },
  {
    category: "BODY_CARE",
    type: "Body Lotion",
    name: "Lavender Softening Body Lotion",
    description:
      "A softening body lotion with lavender, formulated to hydrate skin while leaving a calm, soothing fragrance.",
    image: "Lavender Softening Body Lotion.png",
  },
  {
    category: "BODY_CARE",
    type: "Body Lotion",
    name: "Floral Breeze Body Lotion",
    description:
      "A lightly fragranced body lotion with a floral blend, formulated to hydrate skin and leave it feeling refreshed.",
    image: "Floral Breeze Body Lotion.png",
  },

  // Body Care: Body Scrub
  {
    category: "BODY_CARE",
    type: "Body Scrub",
    name: "Citrus Sugar Body Scrub",
    description:
      "An exfoliating sugar scrub with citrus, formulated to buff away dead skin cells and leave skin feeling smooth.",
    image: "Citrus Sugar Scrub.png",
  },
  {
    category: "BODY_CARE",
    type: "Body Scrub",
    name: "Coffee, Walnut and Pink Salt Body Scrub",
    description:
      "A luxurious exfoliating ritual crafted from powerful natural exfoliators and mineral-rich botanicals. This dry scrub gently buffs away dead skin cells, supports skin texture and circulation, leaving skin smooth, glowing and revitalized.",
    otherDetails:
      "Purifies the body and boosts hydration while leaving skin feeling soft. Made with coffee and walnut to help address the look of dead cells, blackheads, impurities and uneven tanning.",
    ingredients: "Walnut Grit, Pink Salt, Coffee Grit.",
    referenceLink: "https://vedzonederma.com/products/coffee-and-walnut-face-body-scrub",
    image: "iraava_coffee_walnut_scrub.png",
  },
  {
    category: "BODY_CARE",
    type: "Body Scrub",
    name: "Rose and Mogra Body Scrub",
    description:
      "An exfoliating scrub with rose and mogra, formulated to gently buff skin while leaving a delicate floral fragrance.",
    image: "Rose and Mogra Body Scrub.png",
  },
  {
    category: "BODY_CARE",
    type: "Body Scrub",
    name: "Sandalwood & Turmeric Body Scrub",
    description:
      "An exfoliating scrub with sandalwood and turmeric, two staples of Indian skincare, formulated to brighten and smooth skin.",
    image: "Sandalwood & Turmeric Body Scrub.png",
  },

  // Body Care: Body Wash
  {
    category: "BODY_CARE",
    type: "Body Wash",
    name: "Neroli & Hibiscus Body Wash",
    description:
      "A gentle body wash with neroli and hibiscus, formulated to cleanse skin while leaving a light floral fragrance.",
    image: "Neroli & Hibiscus Body Wash.png",
  },
  {
    category: "BODY_CARE",
    type: "Body Wash",
    name: "Almond Oil Ultra-Rich Body Wash",
    description:
      "A rich, moisturizing body wash with almond oil, formulated to cleanse without stripping skin of its natural softness.",
    image: "Almond Oil Ultra-Rich Body Wash.png",
  },
  {
    category: "BODY_CARE",
    type: "Body Wash",
    name: "Body Wash with Mint & Cucumber",
    description:
      "A refreshing body wash with mint and cucumber, formulated to cleanse and cool skin, ideal for everyday use.",
    image: "Body Wash with Mint & Cucumber.png",
  },
  {
    category: "BODY_CARE",
    type: "Body Wash",
    name: "Lemon Refreshing Shower Gel",
    description:
      "A refreshing shower gel with lemon, formulated to cleanse and revive skin with a bright, citrus fragrance.",
    image: "Lemon Refreshing Shower Gel.png",
  },
  {
    category: "BODY_CARE",
    type: "Body Wash",
    name: "Aloe Vera Body Wash",
    description:
      "Enriched with powerful herbs like neem, basil and turmeric, this pure, natural aloe vera body wash cleanses deeply while maintaining skin's natural softness. The refreshing gel formula lathers well and leaves skin smooth and nourished.",
    ingredients: "Glycerin, Basil, Flax Seed, Marigold, Jasmine, Harsingar, Aloe Vera, Rose, Neem, Ashwagandha, Kojic Acid.",
    referenceLink: "https://vedzonederma.com/products/aloe-vera-body-wash-for-cleanse-refresh-brighten",
    image: "Aloe Vera Body Wash.jpg",
  },

  // Body Care: Foot Butter Balm
  {
    category: "BODY_CARE",
    type: "Foot Butter Balm",
    name: "Foot Butter Balm",
    description:
      "For dry, cracked feet, with shea, mango, kokum & cocoa butter. Fantastic for a relaxing foot massage, both rebalancing and softening. This intensive balm nourishes even the driest feet, ideal for cracked heels: you'll notice the difference by morning.",
    ingredients:
      "Shea, Cocoa, Mango & Kokum Butters, Olive Oil, Coconut Oil, Basil Essential Oil, Carnauba Wax, Walnut Oil, Almond Oil, Castor Oil.",
    referenceLink: "https://vedzonederma.com/products/foot-butter-balm",
    image: "Foot Butter Balm - Labelled.jpg",
  },
];
