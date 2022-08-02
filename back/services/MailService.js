const nodemailer = require('nodemailer')

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    })
  }

  async sendActivationMail(to, activateLink) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: `Activation account on ${process.env.API_URL}`,
      html: `
      <div>
        <h1>For activation click on this link</h1>
        <a href=${activateLink}>${activateLink}</a>
      </div>
      `,
    })
  }

  async sendOrderToUs(orderNumber, userName, userSurname) {
    // this.transporter.verify().then(console.log).catch(console.error)
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER,
      subject: `Order number ${orderNumber}`,
      html: `
      <div style="background:#685248; padding:10px">
        <div style="background:#685248; padding:10px; border:2px solid #fff;">
          <h1 style="color:#fff;">Order number: <span style="color:#c4c4c4; font-size:30px; width:100%" >${orderNumber}</span></h1>
          <h2 style="color:#fff;">Customer: <span style="color:#c4c4c4; font-size:25px; width:100%">${userName} ${userSurname}</span></h2>
          <p style="text-align:center">
            <a style="text-decoration: none; color:#c4c4c4; font-size:25px; text-align:center" href=${'http://localhost:3000/administration-page'}> 
            >>>>>>>>>> Click to process the order <<<<<<<<<<
            </a>
          </p>
        </div>
      </div>
      `,
    })
  }

  async sendOrderToUser(dtoOrder) {
    const { orderNumber, userName, userSurname, userEmail, userRegion, userAddress, userPhone, userCity, totalPrice } =
      dtoOrder

    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: userEmail,
      subject: `Time - shoes shop, order number ${orderNumber}`,
      html: `
      <div style="background:#685248; padding:10px">
        <div style="background:#685248; padding:10px; border:2px solid #fff;">
          <h1 style="color:#fff;">Order number: <span style="color:#c4c4c4; font-size:30px; width:100%" >${orderNumber}</span></h1>
          <h2 style="color:#fff;">Wait for confirmation of your order.</h2>
          <p style="text-align:center">
            Dear ${userName} ${userSurname}, Thank you for your order. Wait for confirmation of your order, we will notify you when it is ready, have a nice day.
          </p>
          <h3 style="color:#fff;">Your order Information:</h3>
          <p style="text-align:start">
            Address: ${userRegion}, ${userCity}, ${userAddress}
          </p>
          <p style="text-align:start">
          Phone: ${userPhone}
          </p>
          <p style="text-align:start">
            Total price: <span style="font-size:30px font-weight:600"> ${totalPrice}</span>
          </p>
          <h4 style="color:#fff;">Attention:</h4>
          <p style="text-align:center">
            ${userName} If you have any questions or want to clarify or change your order, please email or call us.
          </p>
          <h4 style="color:#fff;">Phone numbers: <a style="text-decoration: none" href='tel:+310 55-555-55'>+310 55-555-55 </a>, <a style="text-decoration: none" href='tel:+380 55-555-55'> +380 55-555-55</a> </h2>
          <h3 style="color:#fff;">Thank you ${userName} ${userSurname}.</h3>
        </div>
      </div>
      `,
    })
  }

  async sendConfirmOrderMail(dtoOrder) {
    const { orderNumber, userName, userSurname, userEmail, userRegion, userAddress, userCity } = dtoOrder
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: userEmail,
      subject: `Dear ${userName} ${userSurname} your order is confirmed !`,
      html: `
      <div style="background:#685248; padding:10px">
        <div style="background:#685248; padding:10px; border:2px solid #fff;">
          <h1 style="color:#fff;">Order number: <span style="color:#c4c4c4; font-size:30px; width:100%" >${orderNumber}</span></h1>
          <p style="text-align:start">
           Dear ${userName} ${userSurname} your order is confirmed and was sent
          </p>
          <h5 style="color:#fff;">Address where sent: <span style="color:#000;">${userRegion}, ${userCity}, ${userAddress}</span></h5>
          <h4 style="color:#fff;">Attention:</h4>
          <p style="text-align:start">
            ${userName} If you have any questions or want to clarify or change your order, please email or call us.
          </p>
          <h4 style="color:#fff;">Phone numbers: <a style="text-decoration: none" href='tel:+310 55-555-55'>+310 55-555-55 </a>, <a style="text-decoration: none" href='tel:+380 55-555-55'> +380 55-555-55</a> </h2>
          <h4 style="color:#fff;">Email: <span style="color:#000; text-decoration: none">${process.env.SMTP_USER}</span> </h2>
          <h3 style="color:#fff;">Thank you ${userName} ${userSurname}.</h3>
        </div>
      </div>
      `,
    })
  }

  async sendThatEmailChanged(userDto, isOldEmail) {
    const { name, email, surname } = userDto

    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: isOldEmail ? isOldEmail : email,
      subject: `Dear ${name} ${surname} your email was changed !`,
      html: `
      <div style="background:#685248; padding:10px">
        <div style="background:#685248; padding:10px; border:2px solid #fff;">
          <h1 style="color:#fff;">Email was successfully changed !!!</h1>
          <h4 style="color:#fff;">Attention:</h4>
          <p style="text-align:start">
            ${name} If you have any questions or haven't changed your email, please email or call us.
          </p>
          <h4 style="color:#fff;">Phone numbers: <a style="text-decoration: none" href='tel:+310 55-555-55'>+310 55-555-55 </a>, <a style="text-decoration: none" href='tel:+380 55-555-55'> +380 55-555-55</a> </h2>
          <h4 style="color:#fff;">Email: <span style="color:#000; text-decoration: none">${process.env.SMTP_USER}</span> </h2>
          <h3 style="color:#fff;">Thank you ${name} ${surname}.</h3>
        </div>
      </div>
      `,
    })
  }

  async sendCodeToConfirm(user, code) {
    const { name, email, surname } = user

    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: `Dear ${name} ${surname} open to get Code !`,
      html: `
      <div style="background:#685248; padding:10px">
        <div style="background:#685248; padding:10px; border:2px solid #fff;">
        <h1 style="color:#fff;">Code to Confirm: <span style="color:#c4c4c4; font-size:30px; width:100%" >${code}</span></h1>
          <h4 style="color:#fff;">Attention:</h4>
          <p style="text-align:start">
            ${name} If you have any questions, please email or call us.
          </p>
          <h4 style="color:#fff;">Phone numbers: <a style="text-decoration: none" href='tel:+310 55-555-55'>+310 55-555-55 </a>, <a style="text-decoration: none" href='tel:+380 55-555-55'> +380 55-555-55</a> </h2>
          <h4 style="color:#fff;">Email: <span style="color:#000; text-decoration: none">${process.env.SMTP_USER}</span> </h2>
          <h3 style="color:#fff;">Thank you ${name} ${surname}.</h3>
        </div>
      </div>
      `,
    })
  }

  async sendThatPasswordChanged(user) {
    const { name, email, surname } = user

    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: `Dear ${name} ${surname} your password was changed !`,
      html: `
      <div style="background:#685248; padding:10px">
        <div style="background:#685248; padding:10px; border:2px solid #fff;">
          <h1 style="color:#fff;">Password was successfully changed !!!</h1>
          <h4 style="color:#fff;">Attention:</h4>
          <p style="text-align:start">
            ${name} If you have any questions or haven't changed your password, please email or call us.
          </p>
          <h4 style="color:#fff;">Phone numbers: <a style="text-decoration: none" href='tel:+310 55-555-55'>+310 55-555-55 </a>, <a style="text-decoration: none" href='tel:+380 55-555-55'> +380 55-555-55</a> </h2>
          <h4 style="color:#fff;">Email: <span style="color:#000; text-decoration: none">${process.env.SMTP_USER}</span> </h2>
          <h3 style="color:#fff;">Thank you ${name} ${surname}.</h3>
        </div>
      </div>
      `,
    })
  }

  async sendThatDeleteAccount(user) {
    const { name, email, surname } = user

    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: `Dear ${name} ${surname} your account was deleted !`,
      html: `
      <div style="background:#685248; padding:10px">
        <div style="background:#685248; padding:10px; border:2px solid #fff;">
          <h1 style="color:#fff;">We apologize if something was wrong.</h1>
          <h4 style="color:#fff;">Attention:</h4>
          <p style="text-align:start">
            ${name} If you have any questions, please email or call us.
          </p>
          <h4 style="color:#fff;">Phone numbers: <a style="text-decoration: none" href='tel:+310 55-555-55'>+310 55-555-55 </a>, <a style="text-decoration: none" href='tel:+380 55-555-55'> +380 55-555-55</a> </h2>
          <h4 style="color:#fff;">Email: <span style="color:#000; text-decoration: none">${process.env.SMTP_USER}</span> </h2>
          <h3 style="color:#fff;">Thank you ${name} ${surname}.</h3>
        </div>
      </div>
      `,
    })
  }

  async sendAssignUser(user) {
    const { name, email, surname } = user

    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: `Dear ${name} ${surname} you have been appointed as an administrator !`,
      html: `
      <div style="background:#685248; padding:10px">
        <div style="background:#685248; padding:10px; border:2px solid #fff;">
          <h1 style="color:#fff;">Congratulations!!!</h1>
          <p>${name} ${surname} now you are Administrator</p>
          <h4 style="color:#fff;">Attention:</h4>
          <p style="text-align:start">
            ${name} If you have any questions, please email or call us.
          </p>
          <h4 style="color:#fff;">Phone numbers: <a style="text-decoration: none" href='tel:+310 55-555-55'>+310 55-555-55 </a>, <a style="text-decoration: none" href='tel:+380 55-555-55'> +380 55-555-55</a> </h2>
          <h4 style="color:#fff;">Email: <span style="color:#000; text-decoration: none">${process.env.SMTP_USER}</span> </h2>
          <h3 style="color:#fff;">Thank you ${name} ${surname}.</h3>
        </div>
      </div>
      `,
    })
  }

  async sendRemoveAssignUser(user) {
    const { name, email, surname } = user

    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: `Dear ${name} ${surname}, unfortunately, you are no longer an administrator !`,
      html: `
      <div style="background:#685248; padding:10px">
        <div style="background:#685248; padding:10px; border:2px solid #fff;">
          <h1 style="color:#fff;">Sorry, but you are no longer an administrator.</h1>
          <h4 style="color:#fff;">Attention:</h4>
          <p style="text-align:start">
            ${name} If you have any questions, please email or call us.
          </p>
          <h4 style="color:#fff;">Phone numbers: <a style="text-decoration: none" href='tel:+310 55-555-55'>+310 55-555-55 </a>, <a style="text-decoration: none" href='tel:+380 55-555-55'> +380 55-555-55</a> </h2>
          <h4 style="color:#fff;">Email: <span style="color:#000; text-decoration: none">${process.env.SMTP_USER}</span> </h2>
          <h3 style="color:#fff;">Thank you ${name} ${surname}.</h3>
        </div>
      </div>
      `,
    })
  }
}

module.exports = new MailService()
