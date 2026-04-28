import { AppData, Category, Product, Store, Subscription, User } from "../types";
import { addDays, nowIso } from "../utils/dateUtils";

const image = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`;
const createdAt = nowIso();
const ownerId = "user-demo-owner";
const storeId = "store-burger-do-diego";
const trialEndsAt = addDays(new Date(), 7).toISOString();

export const demoUser: User = {
  id: ownerId,
  name: "Diego Silva",
  email: "demo@zappedido.com",
  phone: "11999999999",
  passwordHash: btoa("123456"),
  createdAt,
  updatedAt: createdAt,
};

export const demoStore: Store = {
  id: storeId,
  ownerId,
  name: "Burger do Diego",
  slug: "burger-do-diego",
  businessType: "Hamburgueria",
  description: "Hambúrguer artesanal, batata crocante e combos especiais.",
  whatsappNumber: "5511999999999",
  logoUrl: image("photo-1551782450-a2132b4ba21d"),
  coverImageUrl: image("photo-1568901346375-23c9450c58cd"),
  address: "Rua das Laranjeiras, 120",
  city: "São Paulo",
  state: "SP",
  openingHours: "Segunda a domingo, 18h às 23h",
  instagramUrl: "https://instagram.com/burgerdodieogo",
  minimumOrderValue: 15,
  deliveryFee: 5,
  acceptsDelivery: true,
  acceptsPickup: true,
  isOpen: true,
  isActive: true,
  subscriptionStatus: "trialing",
  plan: "trial",
  trialEndsAt,
  createdAt,
  updatedAt: createdAt,
};

export const demoCategories: Category[] = [
  { id: "cat-burgers", storeId, name: "Hambúrgueres", description: "Clássicos e artesanais", active: true, sortOrder: 1, createdAt, updatedAt: createdAt },
  { id: "cat-combos", storeId, name: "Combos", description: "Pedidos completos", active: true, sortOrder: 2, createdAt, updatedAt: createdAt },
  { id: "cat-drinks", storeId, name: "Bebidas", description: "Geladas para acompanhar", active: true, sortOrder: 3, createdAt, updatedAt: createdAt },
  { id: "cat-sides", storeId, name: "Porções", description: "Para dividir", active: true, sortOrder: 4, createdAt, updatedAt: createdAt },
  { id: "cat-desserts", storeId, name: "Sobremesas", description: "Final feliz", active: true, sortOrder: 5, createdAt, updatedAt: createdAt },
];

const product = (
  id: string,
  categoryId: string,
  name: string,
  description: string,
  price: number,
  imageUrl: string,
  featured = false,
  promotionalPrice?: number,
): Product => ({
  id,
  storeId,
  categoryId,
  name,
  description,
  price,
  promotionalPrice,
  imageUrl,
  available: true,
  featured,
  preparationTime: "20 min",
  createdAt,
  updatedAt: createdAt,
});

export const demoProducts: Product[] = [
  product("prod-x-bacon", "cat-burgers", "X-Bacon Artesanal", "Blend bovino 160g, queijo prato, bacon crocante e maionese da casa.", 24.9, image("photo-1571091718767-18b5b1457add"), true, 21.9),
  product("prod-smash-duplo", "cat-burgers", "Smash Duplo", "Dois smash burgers, cheddar, picles e molho especial no brioche.", 28.9, image("photo-1594212699903-ec8a3eca50f5"), true),
  product("prod-chicken", "cat-burgers", "Chicken Crispy", "Frango empanado crocante, queijo, alface americana e molho ranch.", 23.9, image("photo-1606755962773-d324e0a13086")),
  product("prod-veggie", "cat-burgers", "Veggie Burger", "Burger vegetal, queijo, rúcula, tomate confit e maionese verde.", 25.9, image("photo-1520072959219-c595dc870360")),
  product("prod-cheddar", "cat-burgers", "Cheddar Melt", "Burger 180g, cheddar duplo, cebola caramelizada e molho barbecue.", 29.9, image("photo-1553979459-d2229ba7433b"), true),
  product("prod-classic", "cat-burgers", "Classic Salad", "Burger artesanal, queijo, alface, tomate, cebola roxa e maionese.", 22.9, image("photo-1568901346375-23c9450c58cd")),
  product("prod-combo-classic", "cat-combos", "Combo Classic", "X-Bacon, batata pequena e bebida lata.", 36.9, image("photo-1610614819513-58e34989848b"), true, 32.9),
  product("prod-combo-casal", "cat-combos", "Combo Casal", "Dois burgers, batata grande e duas bebidas.", 69.9, image("photo-1550547660-d9450f859349"), true),
  product("prod-combo-kids", "cat-combos", "Combo Kids", "Mini burger, batata pequena e suco.", 29.9, image("photo-1541592106381-b31e9677c0e5")),
  product("prod-combo-premium", "cat-combos", "Combo Premium", "Burger premium, onion rings e milkshake.", 49.9, image("photo-1460306855393-0410f61241c7")),
  product("prod-refri", "cat-drinks", "Refrigerante Lata", "Lata 350ml gelada. Consulte sabores disponíveis.", 6, image("photo-1629203851122-3726ecdf080e")),
  product("prod-suco", "cat-drinks", "Suco Natural", "Suco 500ml feito na hora.", 9.9, image("photo-1600271886742-f049cd451bba")),
  product("prod-agua", "cat-drinks", "Água Mineral", "Garrafa 500ml com ou sem gás.", 4.5, image("photo-1523362628745-0c100150b504")),
  product("prod-cha", "cat-drinks", "Chá Gelado", "Chá gelado artesanal de limão.", 8.9, image("photo-1556679343-c7306c1976bc")),
  product("prod-batata", "cat-sides", "Batata com Cheddar e Bacon", "Batata crocante com cheddar cremoso e bacon em cubos.", 22.9, image("photo-1639024471283-03518883512d"), true),
  product("prod-onion", "cat-sides", "Onion Rings", "Anéis de cebola empanados com molho barbecue.", 18.9, image("photo-1639945274405-b6c118b07644")),
  product("prod-nuggets", "cat-sides", "Nuggets Crocantes", "Porção com 10 unidades e molho especial.", 19.9, image("photo-1562967916-eb82221dfb36")),
  product("prod-mandioca", "cat-sides", "Mandioca Frita", "Mandioca dourada com sal e ervas.", 17.9, image("photo-1625944525533-473f1a3d54e7")),
  product("prod-brownie", "cat-desserts", "Brownie da Casa", "Brownie chocolatudo com casquinha crocante.", 12.9, image("photo-1606313564200-e75d5e30476c")),
  product("prod-milkshake", "cat-desserts", "Milkshake Cremoso", "Milkshake 400ml de chocolate, morango ou baunilha.", 17.9, image("photo-1572490122747-3968b75cc699"), true),
  product("prod-pudim", "cat-desserts", "Pudim Individual", "Pudim cremoso com calda de caramelo.", 10.9, image("photo-1514517604298-cf80e0fb7f1e")),
];

export const demoSubscription: Subscription = {
  id: "sub-demo",
  userId: ownerId,
  storeId,
  plan: "trial",
  status: "trialing",
  paymentProvider: "manual_whatsapp",
  startedAt: createdAt,
  expiresAt: trialEndsAt,
  createdAt,
  updatedAt: createdAt,
};

export const demoData: AppData = {
  users: [demoUser],
  stores: [demoStore],
  categories: demoCategories,
  products: demoProducts,
  orders: [],
  subscriptions: [demoSubscription],
};
