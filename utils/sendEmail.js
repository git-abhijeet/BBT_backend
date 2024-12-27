const transporter = require('../config/emailConfig');
const dotenv = require('dotenv');

dotenv.config();

const sendWelcomeEmail = (recipientEmail, firstName, lastName, userName, mobileNum, password) => {
    const mailOptions = {
        from: process.env.EMAIL_SENDER,
        to: recipientEmail,
        subject: 'Welcome to Our Service!',
        text: `Hi ${firstName}! Welcome to our service. We are excited to have you on board.`,
        html: `
            <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        color: #333;
                        background-color: #f4f4f4;
                        padding: 20px;
                    }
                    .container {
                        background-color: #ffffff;
                        border-radius: 8px;
                        padding: 30px;
                        max-width: 600px;
                        margin: 0 auto;
                        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                    }
                    h1 {
                        color: #007BFF;
                    }
                    p {
                        font-size: 16px;
                        line-height: 1.5;
                    }
                    .details {
                        background-color: #f9f9f9;
                        padding: 10px;
                        margin-top: 20px;
                        border-radius: 4px;
                    }
                    .details strong {
                        color: #333;
                    }
                    .footer {
                        font-size: 12px;
                        text-align: center;
                        color: #888;
                        margin-top: 20px;
                    }
                    .login-link {
                        display: inline-block;
                        margin-top: 20px;
                        padding: 10px 20px;
                        background-color: #007BFF;
                        color: #ffffff;
                        text-decoration: none;
                        border-radius: 4px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Welcome to Our Service, ${firstName}!</h1>
                    <p>We are excited to have you on board. Below are your account details:</p>
                    <div class="details">
                        <p><strong>First Name:</strong> ${firstName}</p>
                        <p><strong>Last Name:</strong> ${lastName}</p>
                        <p><strong>User Name:</strong> ${userName}</p>
                        <p><strong>Email Address:</strong> ${recipientEmail}</p>
                        <p><strong>Mobile Number:</strong> ${mobileNum}</p>
                        <p><strong>Your Password:</strong> ${password}</p>
                    </div>
                    <p>If you have any questions, feel free to reach out to us.</p>
                    <a href="${process.env.LOGIN_URL}" class="login-link">Login to Your Account</a>
                    <p>Best regards,<br>The Team</p>
                </div>
                <div class="footer">
                    <p>&copy; 2024 Our Service. All rights reserved.</p>
                </div>
            </body>
            </html>
        `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

module.exports = { sendWelcomeEmail };