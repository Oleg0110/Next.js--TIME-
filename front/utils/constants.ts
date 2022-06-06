import { IButtonProps } from './interface/buttonInterface';

export const ROUTES = {
  home: '/',
  new: '/new',
  women: '/women',
  men: '/men',
  sale: '/sale',
  authRegistration: '/auth/registration',
  authActivate: '/auth/activate',
  authLogin: '/auth/login',
  authLogout: '/auth/logout',
  authRefreshToken: '/auth//refreshToken',
  shoe: '/shoe',
  settingsUserManagement: '/settings/users-management',
  settingsProductManagement: '/settings/products-management',
  settingsAddProduct: '/settings/products-management/add-shoe',
  settingsChangeProduct: '/settings/products-management/change-product',
  settingsDeleteProduct: '/settings/products-management/delete-product',
  aboutUs: '/about-us',
  shipping: '/shipping-and-payment',
  FAQ: '/FAQ',
  personalOffice: '/personal-office',
};

export const BUTTONS: IButtonProps[] = [
  {
    id: '1',
    name: 'new',
    link: ROUTES.new,
  },
  {
    id: '2',
    name: 'women',
    link: ROUTES.women,
  },
  {
    id: '3',
    name: 'men',
    link: ROUTES.men,
  },
  {
    id: '4',
    name: 'sale',
    link: ROUTES.sale,
  },
];
