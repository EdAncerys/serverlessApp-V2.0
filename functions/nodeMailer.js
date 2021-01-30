const nodemailer = require('nodemailer');
require('dotenv').config(); // Enabling to load Environment variables from a .env File

const emailTemplate = `<div style="display: grid; justify-content: center">
                        <table style="background-color: #f4f4f4; min-width: 400px; margin: 20px">
                          <tr>
                            <th
                            colspan="2"
                            style="
                              color: #f4f4f4;
                              background: #2b2b2b;
                              border: 1px solid #343a45;
                              text-align: center;
                              text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
                              vertical-align: middle;
                              padding: 10px;
                            "
                            >
                              <div style="display: grid; justify-content: center">
                                <img src="cid:${ndgLogo}" alt="ndgLogo"/>
                              </div>
                            </th>
                          </tr>

                          <tr style="padding: 5px">
                            <th
                            ${tableCellStyle}
                            >
                              Name
                            </th>
                            <th
                              ${tableCellStyle}
                            >
                              ${name}
                            </th>
                          </tr>
                          <tr style="padding: 5px">
                            <th
                              ${tableCellStyle}
                            >
                              Email
                            </th>
                            <th
                              ${tableCellStyle}
                            >
                              ${email}
                            </th>
                          </tr>
                          <tr style="padding: 5px">
                            <th
                              ${tableCellStyle}
                            >
                              Subject
                            </th>
                            <th
                              ${tableCellStyle}
                            >
                              ${subject}
                            </th>
                          </tr>
                          <tr style="padding: 5px">
                            <th
                              ${tableCellStyle}
                            >
                              Description
                            </th>
                            <th
                              ${tableCellStyle}
                            >
                              ${description}
                            </th>
                          </tr>
                        </table>
                        </div>`;
exports.handler = (event, context, callback) => {
  const body = JSON.parse(event.body);

  let name = body.name;
  let email = body.email;
  let subject = body.subject;
  let description = body.description;

  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE, // replace with service provider
    auth: {
      user: process.env.EMAIL_NAME, // replace with your email
      pass: process.env.EMAIL_PASSWORD, // replace with your password
    },
  });

  const mailOptions = {
    from: 'process.env.EMAIL_FROM', // replace with your email
    to: process.env.GMAIL_MAILING_LIST, // replace with your mailing list
    subject: `${body.subject}`,
    // html: `${body.description}`,
    html: emailTemplate,
    attachments: [
      {
        filename: 'NDGlogo.png',
        path: __dirname + '/../dist/images/NDGlogo.png',
        cid: 'ndgLogo', //same cid value as in the html img src
      },
    ],
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      callback(error);
      console.log('Error sending email');
    } else {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(body),
      });

      console.log(body);
      console.log('Email sent successfully');
    }
  });
};
