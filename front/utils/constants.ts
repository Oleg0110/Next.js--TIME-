import { IButtonProps } from './interface/buttonInterface';
import { ColorType, MaterialType, SizeType, StyleType } from './types/form';
import Swiper from 'swiper';

export const ROUTES = {
  home: '/',
  new: '/product/new',
  newWomen: '/product/new-women',
  newMen: '/product/new-men',
  women: '/product/women',
  men: '/product/men',
  sale: '/product/sale',
  saleWomen: '/product/sale-women',
  saleMen: '/product/sale-men',
  authRegistration: '/auth/registration',
  authActivate: '/auth/activate',
  authLogin: '/auth/login',
  authLogout: '/auth/logout',
  authRefreshToken: '/auth//refreshToken',
  product: '/product',
  adminPage: '/administration-page',
  adminUsersManagement: '/users-management',
  adminOrdersManagement: '/administration-page/order-management',
  adminProductManagement: '/administration-page/products-management',
  adminAddProduct: '/products-management/add-product',
  adminChangeProduct: '/products-management/change-product',
  adminDeleteProduct: '/products-management/delete-product',
  aboutUs: '/about-us',
  shipping: '/shipping-and-payment',
  FAQ: '/FAQ',
  personalOffice: '/personal-office',
  bag: '/bag',
  delivery: '/delivery-details',
};

export const BUTTONS: IButtonProps[] = [
  {
    id: '1',
    name: 'new',
    hoverBlock: true,
    buttonsHoverArr: [
      { id: '1', name: 'Men New', link: ROUTES.newMen },
      { id: '2', name: 'Women New', link: ROUTES.newWomen },
    ],
  },
  {
    id: '2',
    name: 'women',
    link: ROUTES.women,
    hoverBlock: false,
  },
  {
    id: '3',
    name: 'men',
    link: ROUTES.men,
    hoverBlock: false,
  },
  {
    id: '4',
    name: 'sale',
    hoverBlock: true,
    buttonsHoverArr: [
      { id: '1', name: 'Men Sale', link: ROUTES.saleMen },
      { id: '2', name: 'Women Sale', link: ROUTES.saleWomen },
    ],
  },
];

export const sizeArray: SizeType[] = [
  { id: '1', size: '35' },
  { id: '2', size: '36' },
  { id: '3', size: '37' },
  { id: '4', size: '38' },
  { id: '5', size: '39' },
  { id: '6', size: '40' },
  { id: '7', size: '41' },
  { id: '8', size: '42' },
  { id: '9', size: '43' },
  { id: '10', size: '44' },
  { id: '11', size: '45' },
];

export const colorArray: ColorType[] = [
  { id: '12', color: 'black', colorName: 'Black' },
  { id: '13', color: 'gray', colorName: 'Gray' },
  { id: '14', color: 'white', colorName: 'White' },
  { id: '15', color: 'brown', colorName: 'Brown' },
  { id: '16', color: 'blue', colorName: 'Blue' },
  { id: '17', color: 'pink', colorName: 'Pink' },
  { id: '18', color: 'green', colorName: 'Green' },
];

export const styleArray: StyleType[] = [
  { id: '21', style: 'boots', styleName: 'Boots' },
  { id: '19', style: 'sneakers', styleName: 'Sneakers' },
  { id: '20', style: 'loafers', styleName: 'Loafers' },
  { id: '22', style: 'bootforts', styleName: 'Bootforts' },
  { id: '23', style: 'sandals', styleName: 'Sandals' },
  { id: '24', style: 'shoes', styleName: 'Shoes' },
  { id: '25', style: 'slippers', styleName: 'Slippers' },
];

export const materialArray: MaterialType[] = [
  { id: '28', material: 'leather', materialName: 'Leather' },
  { id: '26', material: 'genuine leather', materialName: 'Genuine leather' },
  { id: '27', material: 'eco leather', materialName: 'ECO leather' },
  { id: '29', material: 'suede', materialName: 'Suede' },
  { id: '30', material: 'nylon', materialName: 'Nylon' },
  { id: '31', material: 'velor', materialName: 'Velor' },
  {
    id: '32',
    material: 'artificial materials',
    materialName: 'Artificial materials',
  },
  {
    id: '33',
    material: 'fiber',
    materialName: 'Fiber',
  },
];

export const filterDataName = 'filterData';
export const sortingDataName = 'sorting';
export const shoppingBagDataName = 'products in Shopping Bag';

export const sizesArray = [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45];

export const filterReset = {
  productColor: [],
  productStyleName: [],
  productStyleMaterial: [],
  productPriceFrom: 0,
  productPriceTo: 15000,
  productSize: [],
};

export const swiper = new Swiper('.swiper', {
  navigation: {
    prevEl: '.swiper-button-prev',
    nextEl: '.swiper-button-next',
  },
});

export const phoneRegExp = /^(?:\+38)?(0\d{9})$/;
export const stringRegExp = /^[A-ZА-Я]?[a-zа-яA-ZА-Я]+$/;
export const placeRegExp = /^[A-ZА-Я][a-zа-яA-ZА-Я-/]+$/;
export const addressRegExp = /^[A-ZА-Я][a-zа-яA-ZА-Я / 0-9]+$/;
