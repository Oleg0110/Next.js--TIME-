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
  - [Message with an order to the client and "Time"](#delivery-emails)
- [About Us](#about-us)
- [Shipping and Payment](#shipping-and-payment)
- [FAQ](#FAQ)
- [404 page](#404)
- [i18next](#i18next)

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
- [Add Product](#add-product)

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
<p style="margin-left: 20px"><em>If you are not authorized, you cannot add product to favorite.</em></p>


https://user-images.githubusercontent.com/81637612/186700893-20cf87c5-70c1-4adb-bb50-f4a2411c89ce.mp4


<a id="entry-registration"></a>

<h4 align="start" style="font-size: 20px; color: #685248">Entry / Registration</h4>
<p style="margin-left: 20px"><em>After registration, you will get email with activation link.</em></p>


https://user-images.githubusercontent.com/81637612/186705843-32b98dd6-5dde-4ae9-a187-464b29f04fbe.mp4


<a id="products-page"></a>

<h4 align="start" style="font-size: 20px; color: #685248">Products page</h4>


https://user-images.githubusercontent.com/81637612/186701049-760a224b-6c35-4703-8dd4-90b6762fc741.mp4


<a id="sorting-filter"></a>

<h5 align="start" style="color: #685248; margin-left: 10px">
<em>- Sorting / Filter</em>
</h5>


https://user-images.githubusercontent.com/81637612/186701194-afee990c-23b6-4a4c-9c9f-917613bd7854.mp4


<a id="product-page"></a>

<h4 align="start" style="font-size: 20px; color: #685248">Product page</h4>
<p style="margin-left: 20px"><em>If you are not authorized, you cannot add a review.</em></p>


https://user-images.githubusercontent.com/81637612/186701306-041cc46d-233a-48b3-b861-9e0a66f68be0.mp4


<a id="global-search"></a>

<h4 align="start" style="font-size: 20px; color: #685248">Products global search</h4>


https://user-images.githubusercontent.com/81637612/186701747-b122c954-6aa1-4e4d-ac49-badf1a035a63.mp4


<a id="shopping-bag"></a>

<h4 align="start" style="font-size: 20px; color: #685248">Shopping Bag</h4>


https://user-images.githubusercontent.com/81637612/186701866-2008a554-e511-405c-a198-9e15bf7dd5e9.mp4


<a id="bag-page"></a>

<h4 align="start" style="font-size: 20px; color: #685248">Bag page</h4>


https://user-images.githubusercontent.com/81637612/186702082-349647a3-23b0-44d3-91d6-7dbe011711da.mp4


<a id="delivery-details-page"></a>

<h4 align="start" style="font-size: 20px; color: #685248">Delivery details page</h4>

_If you are authorized, your data available to us will be filled. You can see it [here](#auth-delivery-details-page). After the order, a notification will be sent to your work email and to the customer's email._


https://user-images.githubusercontent.com/81637612/186702253-5bb40b92-ad2c-45c7-81a2-be6a6b4d32b3.mp4


<a id="delivery-emails"></a>

<h5 align="start" style="color: #685248; margin-left: 10px">
<em>- Messages with an order</em>
</h5>


https://user-images.githubusercontent.com/81637612/186702323-bc17174f-621f-45c2-9ae4-6bab68685ff1.mp4


<a id="about-us"></a>

<h4 align="start" style="font-size: 20px; color: #685248">About Us</h4>


https://user-images.githubusercontent.com/81637612/186702390-a5f9ff74-14f1-4d50-920e-be10d2eb1550.mp4


<a id="shipping-and-payment"></a>

<h4 align="start" style="font-size: 20px; color: #685248">Shipping and Payment</h4>


https://user-images.githubusercontent.com/81637612/186702518-177baac1-8485-4582-b9ad-6e09613d6967.mp4


<a id="FAQ"></a>

<h4 align="start" style="font-size: 20px; color: #685248">FAQ</h4>


https://user-images.githubusercontent.com/81637612/186702720-38616608-a539-42bd-8e95-82cc56099a39.mp4


<a id="404"></a>

<h4 align="start" style="font-size: 20px; color: #685248">404 page</h4>


https://user-images.githubusercontent.com/81637612/186702873-3038510c-94b7-46a0-a20a-04a78183219b.mp4


<a id="i18next"></a>

<h4 align="start" style="font-size: 20px; color: #685248">i18next</h4>
<p style="margin-left: 20px"><em>The entire site is multilingual, you can choose English or Ukrainian.</em></p>

https://user-images.githubusercontent.com/81637612/186703005-2d21061d-28bb-43d7-a0ce-84cbb130e478.mp4


> The Client is authorized

<a id="personal-office"></a>

<h4 align="start" style="font-size: 20px; color: #685248">Personal Office</h4>

<a id="change-name-surname"></a>

<h5 align="start" style="color: #685248; margin-left: 10px">
<em>- Change name / surname</em>
</h5>


https://user-images.githubusercontent.com/81637612/186703776-f4b5bfea-a14c-426b-b3a7-d070e89c1ea8.mp4


<a id="change-email"></a>

<h5 align="start" style="color: #685248; margin-left: 10px">
<em>- Change Email</em>
</h5>

<p style="margin-left: 20px"><em>To change your email, you need to confirm your password. After the change, you will receive an email notifying you of the email change.</em></p>


https://user-images.githubusercontent.com/81637612/186704005-5c1aa90f-e863-40c6-bf2f-04236e24a902.mp4


<a id="add-change-phone"></a>

<h5 align="start" style="color: #685248; margin-left: 10px">
<em>- Add or Change phone</em>
</h5>


https://user-images.githubusercontent.com/81637612/186704048-7de49144-7820-4afa-adc0-646459d762e9.mp4


<a id="change-password"></a>

<h5 align="start" style="color: #685248; margin-left: 10px">
<em>- Change Password</em>
</h5>

<p style="margin-left: 20px"><em>To change the password you will receive a confirmation code, after changing the password you will receive an e-mail that the password has been changed.</em></p>


https://user-images.githubusercontent.com/81637612/186704090-54d336e4-815e-4a5f-9ed7-d2686fe33b00.mp4


<a id="get-your-orders"></a>

<h5 align="start" style="color: #685248; margin-left: 10px">
<em>- Get your orders</em>
</h5>


https://user-images.githubusercontent.com/81637612/186704179-fb3e7232-a988-4493-aca4-368c0c0ead0e.mp4


<a id="delete-account"></a>

<h5 align="start" style="color: #685248; margin-left: 10px">
<em>- Delete Account</em>
</h5>

<p style="margin-left: 20px"><em>To delete your account, you need to confirm your password. After deletion, you will receive an email notifying you that your account has been deleted.</em></p>


https://user-images.githubusercontent.com/81637612/186704227-4cae580d-0fb1-40b7-9fe2-3d7e52fe93b9.mp4


<a id="favorite-bag"></a>

<h4 align="start" style="font-size: 20px; color: #685248">Favorite Bag</h4>


https://user-images.githubusercontent.com/81637612/186704303-2dd399a4-c6f2-4210-9b5f-418c712409e9.mp4


<a id="auth-product-page"></a>

<h4 align="start" style="font-size: 20px; color: #685248">Product page</h4>

<p style="margin-left: 20px"><em>On the product page, you can read people's reviews or add your review if you are authorized, choose another product from the recommended ones, add to shopping bag and favorites.<em></p>


https://user-images.githubusercontent.com/81637612/186704421-919ba048-d0c3-430f-8ad8-fb9a94253eff.mp4


<a id="auth-delivery-details-page"></a>

<h4 align="start" style="font-size: 20px; color: #685248">Delivery details page</h4>

_If you are authorized, your data available to us will be filled. After the order, a notification will be sent to your work email and to the customer's email. You can see it [here](#delivery-emails)._


https://user-images.githubusercontent.com/81637612/186704525-d00002f6-76ab-4992-bd6e-22f9aacce826.mp4


> Admin area

<a id="admin-orders"></a>

<h4 align="start" style="font-size: 20px; color: #685248">Orders</h4>

<p style="margin-left: 20px"><em>On this page we have confirmed and unconfirmed orders, after confirmation the customer receives an email that the order is confirmed.</em></p>


https://user-images.githubusercontent.com/81637612/186704599-4907c579-9118-4bd2-90ca-e0f1e129cbfc.mp4


<a id="user-management"></a>

<h4 align="start" style="font-size: 20px; color: #685248">User Management</h4>

<p style="margin-left: 20px"><em>Here, the owner or administrator can find and assign the user as an administrator or remove the assignment, and the user will receive an email with the assignment or removal of the assignment.</em></p>


https://user-images.githubusercontent.com/81637612/186704676-e3125d0e-0392-403b-9436-529af98c22d8.mp4


<a id="change-delete-product"></a>

<h4 align="start" style="font-size: 20px; color: #685248">Change or Delete product</h4>

<a id="change-product"></a>

<h5 align="start" style="color: #685248; margin-left: 10px">
<em>- Change</em>
</h5>


https://user-images.githubusercontent.com/81637612/186704775-ce097e59-f239-44d7-a43a-6555eec80493.mp4


<a id="delete-product"></a>

<h5 align="start" style="color: #685248; margin-left: 10px">
<em>- Delete</em>
</h5>


https://user-images.githubusercontent.com/81637612/186704842-f0410bef-44ca-41d4-9d49-a504d642b874.mp4


<a id="add-product"></a>

<h4 align="start" style="font-size: 20px; color: #685248">Add Product</h4>


https://user-images.githubusercontent.com/81637612/186704889-46bd5ac0-edea-403b-9363-a567d4a9d63d.mp4


---

<h2 align="center">Mobile version</h2>

<p style="font-size: 15px; font-weight: 600;">
The mobile version has the same functionality as the desktop version, so in this section I will only show the responsible design.
</p>

<a id="mobile-major-page"></a>

<h4 align="start" style="font-size: 20px; color: #685248">Major page / Entry / Registration / Products global search</h4>


https://user-images.githubusercontent.com/81637612/186704968-5f55e95b-5f79-4267-b8b2-79bfdbe8db9d.mp4


<a id="mobile-products-page"></a>

<h4 align="start" style="font-size: 20px; color: #685248">Products / Shopping Bag / Favorite Bag</h4>


https://user-images.githubusercontent.com/81637612/186705173-103830ea-1b79-40d7-8dc8-886cd9dc2b5c.mp4


<a id="mobile-product-page"></a>

<h4 align="start" style="font-size: 20px; color: #685248">Product page</h4>


https://user-images.githubusercontent.com/81637612/186705250-51e23bb9-a5d2-4b6f-afbf-0e5d26495e60.mp4


<a id="mobile-bag-delivery-page"></a>

<h4 align="start" style="font-size: 20px; color: #685248">Bag / Delivery details page</h4>


https://user-images.githubusercontent.com/81637612/186705341-379b653d-0720-463e-9946-bc1fd881ecc4.mp4


<a id="mobile-information"></a>

<h4 align="start" style="font-size: 20px; color: #685248">About Us / Shipping and Payment / FAQ</h4>


https://user-images.githubusercontent.com/81637612/186705445-a5b063d6-122a-430d-a54d-5bd1d6076316.mp4


<a id="mobile-personal-office"></a>

<h4 align="start" style="font-size: 20px; color: #685248">Personal Office</h4>


https://user-images.githubusercontent.com/81637612/186705535-36377c5c-b7d7-4b07-a4a7-5c8ab3acdc58.mp4


> Admin area

<a id="mobile-admin-page"></a>

<h4 align="start" style="font-size: 20px; color: #685248">Admin page</h4>


https://user-images.githubusercontent.com/81637612/186705615-543c6ce3-7cc5-4f16-8b18-565732cbee89.mp4

---

<p  style="font-size: 15px; font-weight: 600;">
Thank you for taking the time to familiarize yourself with my project, it is very important for me, thank you again and have a nice day)))
</p>

[Go to Top](#to-top)
