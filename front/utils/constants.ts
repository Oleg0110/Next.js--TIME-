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
  product: '/product',
  adminPage: '/administration-page',
  adminCustomersManagement: '/administration-page/customers-management',
  adminOrdersManagement: '/administration-page/order-management',
  adminProductManagement: '/administration-page/products-management',
  adminAddProduct: '/products-management/add-product',
  adminChangeProduct: '/administration-page/products-management/change-product',
  adminDeleteProduct: '/administration-page/products-management/delete-product',
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
