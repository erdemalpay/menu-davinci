export type MenuCategory = {
  name: string;
  order: number;
};

export type MenuItem = {
  _id: string;
  name: string;
  category: MenuCategory;
  priceBahceli: number;
  priceNeorama: number;
};
