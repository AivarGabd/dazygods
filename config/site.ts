export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "DazyGoods",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Главная",
      href: "/",
    },
    {
      label: "Корзина",
      href: "/cart",
    },
    {
      label: "Избранное",
      href: "/favorites",
    }
  ]
};
