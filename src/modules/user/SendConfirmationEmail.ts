import nodemailer from 'nodemailer'

export async function sendConfirmationEmail(
  email: string,
  urlToConfirm: string
) {
  // while building up we don't want to send actual emails
  const testAccount = await nodemailer.createTestAccount()

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  })

  await transporter.sendMail({
    from: `"Ents 👻" <donotreply@ents.com>`,
    to: email,
    subject: 'Hello ✔', // Subject line
    text: `Go to ${urlToConfirm} to confirm your account`, // plain text body
    html: `<a href={${urlToConfirm}}>Click here to confirm your account</a>`, // html body
  })

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', urlToConfirm)
}
