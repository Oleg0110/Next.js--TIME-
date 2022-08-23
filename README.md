<a id="to-top"></a>

<div align="center"> 
   
  <img src="./README/high-heels.png" alt="Logo" width="200px"/>
   
  <h1 align="center">This is my NEXT.js pet-project.</h1>
  <p><strong>"TIME"</strong> is shoes store.</p>
</div>

---

<p style="font-size: 15px; font-weight: 600;">
In this presentation I will try to show and introduce You to all the features that
I added while writing this project. Thank You for your time.
</p>

<h2 align="start">Website information</h2>

> **_About Project_** : When I created this website, it was my first experience with Next.js, Redux Toolkit, Material UI, Formik, Swiper. This store is absolutely responsive. The website is multilingual and it is possible to translate into one of two languages.

> **_What I used to create this project_** : Next.js, Redux Toolkit, TypeScript, SASS, Material UI, Node.js, MongoDB, Mongoose, next-i18next, React-Toastify, Formik, Swiper, axios, bcryptjs, CORS, nodemailer, cookie.

---

<h3 align="start">Contents</h3>

<h5 align="start">Desktop version :</h5>

> General opportunities

- [Major page](#major-page)
- [Entry / Registration](#entry-registration)
  - [Activate account](#entry-registration)
- [Products page](#products-page)
  - [Sorting / Filter](#sorting-filter)
- [Product page](#product-page)
- [Products global search](#global-search)
- [Shopping Bag](#shopping-bag)
- [Bag page](#bag-page)
- [Delivery details page](#delivery-details-page)
  - [Message with an order to the client and "Time"](#delivery-details-page)
- [About Us](#about-us)
- [Shipping and Payment](#shipping-and-payment)
- [FAQ](#FAQ)
- [404 page](#404)

> The Client is authorized

- [Personal Office](#personal-office)
  - [Change Name / Surname](#change-name-surname)
  - [Change Email](#change-email)
    - [Email change notification](#change-email)
  - [Add or Change Phone](#add-change-phone)
  - [Change Password](#change-password)
  - [Get your orders](#get-your-orders)
  - [Delete Account](#delete-account)
    - [Delete account notification](#delete-account)
- [Favorite Bag](#favorite-bag)
- [Product page](#auth-product-page)
  - [Add Review](#auth-product-page)
  - [Add to favorite](#auth-product-page)
- [Delivery details page](#auth-delivery-details-page)

> Admin area

- [Orders](#admin-orders)
  - [Confirm order](#admin-orders)
  - [Customer confirmation message](#admin-orders)
  - [Search confirmed orders](#admin-orders)
- [User Management](#user-management)
  - [Find and change status](#user-management)
    - [Message with assign](#user-management)
    - [Message with remove assign](#user-management)
- [Change or Delete product](#change-delete-product)
  - [Change](#change-product)
  - [Delete](#delete-product)
- [Add Product](#create-product)

---

<h5 align="start">Mobile version :</h5>

- [Major page / Entry / Registration / Products global search](#mobile-major-page)
- [Products page / Shopping Bag / Favorite Bag](#mobile-products-page)
- [Product Page](#mobile-product-page)
- [Bag / Delivery details page](#mobile-bag-delivery-page)
- [About Us / Shipping and Payment / FAQ](#mobile-information)
- [Personal Office](#mobile-personal-office)

> Admin area

- [Admin page](#mobile-admin-page)

---

<h2 align="center">Desktop version</h2>

> General opportunities

<a id="major-page"></a>

<h4 align="start" style="font-size: 20px; color: #685248">Major page</h4>
<!--sale carousel add to bag add to favorite open product-->
<p style="margin-left: 20px"><em>If you are not authorized, you cannot add product to favorite.</em></p>

<a id="entry-registration"></a>

<h4 align="start" style="font-size: 20px; color: #685248">Entry / Registration</h4>
<p style="margin-left: 20px"><em>After registration, you will get email with activation link.</em></p>

<a id="products-page"></a>

<h4 align="start" style="font-size: 20px; color: #685248">Products page</h4>

<a id="sorting-filter"></a>

<h5 align="start" style="color: #685248; margin-left: 10px">
<em>- Sorting / Filter</em>
</h5>
<!--filter sorting add to bag add to favorite-->

<a id="product-page"></a>

<h4 align="start" style="font-size: 20px; color: #685248">Product page</h4>
<!--recommended carousel add to bag add to favorite open product, review delivery-->
<p style="margin-left: 20px"><em>If you are not authorized, you cannot add a review.</em></p>

<a id="global-search"></a>

<h4 align="start" style="font-size: 20px; color: #685248">Products global search</h4>

<a id="shopping-bag"></a>

<h4 align="start" style="font-size: 20px; color: #685248">Shopping Bag</h4>
<!--remove product-->

<a id="bag-page"></a>

<h4 align="start" style="font-size: 20px; color: #685248">Bag page</h4>
<!--remove product change count-->

<a id="delivery-details-page"></a>

<h4 align="start" style="font-size: 20px; color: #685248">Delivery details page</h4>

_If you are authorized, your data available to us will be filled. You can see it [here](#auth-delivery-details-page). After the order, a notification will be sent to your work email and to the customer's email._

<a id="about-us"></a>

<h4 align="start" style="font-size: 20px; color: #685248">About Us</h4>

<a id="shipping-and-payment"></a>

<h4 align="start" style="font-size: 20px; color: #685248">Shipping and Payment</h4>

<a id="FAQ"></a>

<h4 align="start" style="font-size: 20px; color: #685248">FAQ</h4>

<a id="404"></a>

<h4 align="start" style="font-size: 20px; color: #685248">404 page</h4>

> The Client is authorized

<a id="personal-office"></a>

<h4 align="start" style="font-size: 20px; color: #685248">Personal Office</h4>

<a id="change-name-surname"></a>

<h5 align="start" style="color: #685248; margin-left: 10px">
<em>- Change name / surname</em>
</h5>

<a id="change-email"></a>

<h5 align="start" style="color: #685248; margin-left: 10px">
<em>- Change Email</em>
</h5>

<p style="margin-left: 20px"><em>To change your email, you need to confirm your password. After the change, you will receive an email notifying you of the email change.</em></p>

<a id="add-change-phone"></a>

<h5 align="start" style="color: #685248; margin-left: 10px">
<em>- Add or Change phone</em>
</h5>

<a id="change-password"></a>

<h5 align="start" style="color: #685248; margin-left: 10px">
<em>- Change Password</em>
</h5>

<p style="margin-left: 20px"><em>To change the password you will receive a confirmation code, after changing the password you will receive an e-mail that the password has been changed.</em></p>

<a id="get-your-orders"></a>

<h5 align="start" style="color: #685248; margin-left: 10px">
<em>- Get your orders</em>
</h5>

<a id="delete-account"></a>

<h5 align="start" style="color: #685248; margin-left: 10px">
<em>- Delete Account</em>
</h5>

<p style="margin-left: 20px"><em>To delete your account, you need to confirm your password. After deletion, you will receive an email notifying you that your account has been deleted.</em></p>

<a id="favorite-bag"></a>

<h4 align="start" style="font-size: 20px; color: #685248">Favorite Bag</h4>
<!--remove product-->

<a id="auth-product-page"></a>

<h4 align="start" style="font-size: 20px; color: #685248">Product page</h4>

<p style="margin-left: 20px"><em>On the product page, you can read people's reviews or add your review if you are authorized, choose another product from the recommended ones, add to shopping bag and favorites.<em></p>

<a id="auth-delivery-details-page"></a>

<h4 align="start" style="font-size: 20px; color: #685248">Delivery details page</h4>

<p style="margin-left: 20px"><em></em></p>

> Admin area

<a id="admin-orders"></a>

<h4 align="start" style="font-size: 20px; color: #685248">Orders</h4>

<p style="margin-left: 20px"><em>On this page we have confirmed and unconfirmed orders, after confirmation the customer receives an email that the order is confirmed.</em></p>

<a id="user-management"></a>

<h4 align="start" style="font-size: 20px; color: #685248">User Management</h4>

<p style="margin-left: 20px"><em>Here, the owner or administrator can find and assign the user as an administrator or remove the assignment, and the user will receive an email with the assignment or removal of the assignment.</em></p>

<a id="change-delete-product"></a>

<h4 align="start" style="font-size: 20px; color: #685248">Change or Delete product</h4>

<a id="change-product"></a>

<h5 align="start" style="color: #685248; margin-left: 10px">
<em>- Change</em>
</h5>

<a id="delete-product"></a>

<h5 align="start" style="color: #685248; margin-left: 10px">
<em>- Delete</em>
</h5>

<a id="add-product"></a>

<h4 align="start" style="font-size: 20px; color: #685248">Add Product</h4>

---

<h2 align="center">Mobile version</h2>

<p style="font-size: 15px; font-weight: 600;">
The mobile version has the same functionality as the desktop version, so in this section I will only show the responsible design.
</p>

<!--General opportunities-->

<a id="mobile-major-page"></a>

<h4 align="start" style="font-size: 20px; color: #685248">Major page / Entry / Registration / Products global search</h4>

<a id="mobile-products-page"></a>

<h4 align="start" style="font-size: 20px; color: #685248">Products / Shopping Bag / Favorite Bag</h4>

<a id="mobile-product-page"></a>

<h4 align="start" style="font-size: 20px; color: #685248">Product page</h4>

<a id="mobile-bag-delivery-page"></a>

<h4 align="start" style="font-size: 20px; color: #685248">Bag / Delivery details page</h4>

<a id="mobile-information"></a>

<h4 align="start" style="font-size: 20px; color: #685248">About Us / Shipping and Payment / FAQ</h4>

<a id="mobile-personal-office"></a>

<h4 align="start" style="font-size: 20px; color: #685248">Personal Office</h4>

> Admin area

<a id="mobile-admin-page"></a>

<h4 align="start" style="font-size: 20px; color: #685248">Admin page</h4>

[Go to Top](#to-top)
