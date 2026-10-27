export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  is_available: boolean;
}

export interface MenuCategory {
  id: string;
  name: string;
  icon: string;
  items: MenuItem[];
}

export const menuData: MenuCategory[] = [
  {
    id: "starters",
    name: "Starters",
    icon: "🥗",
    items: [
      {
        id: "s1",
        name: "Caesar Salad",
        description: "Crisp romaine lettuce, parmesan, croutons, house dressing",
        price: 8.50,
        category: "starters",
        image_url: "🥗",
        is_available: true,
      },
      {
        id: "s2",
        name: "Bruschetta",
        description: "Toasted bread with fresh tomatoes, basil, garlic & olive oil",
        price: 7.00,
        category: "starters",
        image_url: "🍞",
        is_available: true,
      },
      {
        id: "s3",
        name: "Soup of the Day",
        description: "Chef's daily selection served with artisan bread",
        price: 6.50,
        category: "starters",
        image_url: "🍲",
        is_available: true,
      },
      {
        id: "s4",
        name: "Calamari Fritti",
        description: "Crispy fried squid rings with lemon aioli",
        price: 10.00,
        category: "starters",
        image_url: "🦑",
        is_available: true,
      },
    ],
  },
  {
    id: "mains",
    name: "Main Courses",
    icon: "🍽️",
    items: [
      {
        id: "m1",
        name: "Grilled Salmon",
        description: "Atlantic salmon with roasted vegetables & herb butter sauce",
        price: 22.00,
        category: "mains",
        image_url: "🐟",
        is_available: true,
      },
      {
        id: "m2",
        name: "Ribeye Steak",
        description: "300g prime ribeye, truffle mash, red wine jus",
        price: 28.00,
        category: "mains",
        image_url: "🥩",
        is_available: true,
      },
      {
        id: "m3",
        name: "Chicken Parmigiana",
        description: "Breaded chicken breast, marinara, mozzarella, spaghetti",
        price: 18.00,
        category: "mains",
        image_url: "🍗",
        is_available: true,
      },
      {
        id: "m4",
        name: "Mushroom Risotto",
        description: "Arborio rice, wild mushrooms, parmesan, truffle oil",
        price: 16.00,
        category: "mains",
        image_url: "🍚",
        is_available: true,
      },
      {
        id: "m5",
        name: "Fish & Chips",
        description: "Beer-battered cod, hand-cut chips, mushy peas, tartare",
        price: 15.00,
        category: "mains",
        image_url: "🐠",
        is_available: true,
      },
    ],
  },
  {
    id: "drinks",
    name: "Beverages",
    icon: "🥤",
    items: [
      {
        id: "d1",
        name: "Fresh Lemonade",
        description: "House-made with fresh lemons and mint",
        price: 4.50,
        category: "drinks",
        image_url: "🍋",
        is_available: true,
      },
      {
        id: "d2",
        name: "Espresso",
        description: "Double shot Italian espresso",
        price: 3.50,
        category: "drinks",
        image_url: "☕",
        is_available: true,
      },
      {
        id: "d3",
        name: "Craft Beer",
        description: "Rotating selection of local craft beers",
        price: 7.00,
        category: "drinks",
        image_url: "🍺",
        is_available: true,
      },
      {
        id: "d4",
        name: "House Wine (Glass)",
        description: "Red or white, ask your server for today's selection",
        price: 9.00,
        category: "drinks",
        image_url: "🍷",
        is_available: true,
      },
      {
        id: "d5",
        name: "Sparkling Water",
        description: "San Pellegrino 750ml",
        price: 4.00,
        category: "drinks",
        image_url: "💧",
        is_available: true,
      },
    ],
  },
  {
    id: "desserts",
    name: "Desserts",
    icon: "🍰",
    items: [
      {
        id: "de1",
        name: "Tiramisu",
        description: "Classic Italian coffee-flavored dessert with mascarpone",
        price: 9.00,
        category: "desserts",
        image_url: "🍰",
        is_available: true,
      },
      {
        id: "de2",
        name: "Chocolate Lava Cake",
        description: "Warm chocolate cake with molten center, vanilla ice cream",
        price: 10.00,
        category: "desserts",
        image_url: "🍫",
        is_available: true,
      },
      {
        id: "de3",
        name: "Crème Brûlée",
        description: "Classic vanilla custard with caramelized sugar top",
        price: 8.50,
        category: "desserts",
        image_url: "🍮",
        is_available: true,
      },
    ],
  },
];
