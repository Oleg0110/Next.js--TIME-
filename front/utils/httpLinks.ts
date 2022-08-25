import { ROUTES } from './constants';

export const BASIC_URL = 'http://localhost:5000';

//Product
export const GET_PRODUCTS = `${BASIC_URL}${ROUTES.product}`;
export const GET_FAVORITE_PRODUCTS = `/get-favorite`;
export const ADD_PRODUCT_REVIEW = `${BASIC_URL}${ROUTES.product}/add-review`;
export const ADD_PRODUCT_TO_FAVORITE = `${ROUTES.product}/add-to-favorite`;
export const REMOVE_PRODUCT_FROM_FAVORITE = `${ROUTES.product}/remove-from-favorite`;
export const ADMIN_CHANGE_ORDER_STATUS = `${ROUTES.adminPage}/change-order-status`;
export const ADMIN_ADD_PRODUCT = `${ROUTES.adminPage}${ROUTES.adminAddProduct}`;
export const ADMIN_ADD_PRODUCT_PHOTOS = `${ROUTES.adminPage}${ROUTES.adminAddProduct}/add-photos`;
export const ADMIN_CHANGE_PRODUCT = `${ROUTES.adminPage}${ROUTES.adminChangeProduct}`;
export const ADMIN_DELETE_PRODUCT = `${ROUTES.adminPage}${ROUTES.adminDeleteProduct}`;
export const ADMIN_USER_MANAGEMENT = `${ROUTES.adminPage}${ROUTES.adminUsersManagement}`;
export const GET_UNCONFIRMED_ORDERS = '/get-unconfirmed-orders';
export const GET_CONFIRMED_ORDERS = `${ROUTES.adminPage}/get-confirmed-orders`;

//User
export const GET_ORDERS = '/get-orders';
export const GET_TEAM = `${ROUTES.adminPage}${ROUTES.adminUsersManagement}/team/get-user-in-team`;
export const USER_ASSIGNMENT = `${ROUTES.adminPage}${ROUTES.adminUsersManagement}/team/user-assignment`;
export const REMOVE_USER_ASSIGNMENT = `${ROUTES.adminPage}${ROUTES.adminUsersManagement}/team/remove-user-assignment`;
export const REFRESH_TOKEN = `${BASIC_URL}/refreshToken`;
export const CHECK_PASSWORD = '/check-password';
export const SEND_CONFIRM_CODE = '/send-confirm-code';
export const CREATE_ORDER = `${BASIC_URL}/delivery-details/create-order`;
export const CHANGE_USER_DATA = '/change-user-data';
export const ADD_USER_PHONE = '/add-user-phone';
