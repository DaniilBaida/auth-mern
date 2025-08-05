export const VERIFY_ACCOUNT_EMAIL = {
    subject: "Verify your email!",
    html: `
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table align="center" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
          <tr>
            <td style="padding: 30px; text-align: center; background-color: #6c5ce7; color: #ffffff;">
              <h1 style="margin: 0; font-size: 24px;">Verify Your Account</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px; text-align: left;">
              <p style="font-size: 16px; color: #333;">Hi <strong>{userName}</strong>,</p>
              <p style="font-size: 16px; color: #333;">
                Please use the following verification code to confirm your email address:
              </p>
              <div style="text-align: center; margin: 30px 0;">
                <span style="display: inline-block; font-size: 32px; font-weight: bold; background-color: #f1f1f1; padding: 15px 30px; border-radius: 6px; letter-spacing: 3px; color: #6c5ce7;">
                  {verificationCode}
                </span>
              </div>
              <p style="font-size: 14px; color: #555;">
                This code is valid for the next 24 hours. If you didn’t request this, you can safely ignore this email.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`,
};

export const WELCOME_EMAIL = {
    subject: "Welcome to Our Community!",
    html: `
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table align="center" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
          <tr>
            <td style="padding: 30px; text-align: center; background-color: #6c5ce7; color: #ffffff;">
              <h1 style="margin: 0; font-size: 24px;">Welcome to the Family!</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px; text-align: left;">
              <p style="font-size: 16px; color: #333;">Hi <strong>{userName}</strong>,</p>
              <p style="font-size: 16px; color: #333;">
                We're thrilled to have you on board. Your account has been successfully created, and you're all set to start using our platform.
              </p>
              <p style="font-size: 16px; color: #333;">
                Here's what you can do next:
              </p>
              <ul style="font-size: 16px; color: #333; padding-left: 20px;">
                <li>📧 Verify your email (if not yet done)</li>
              </ul>
              <p style="font-size: 14px; color: #555;">
                If you have any questions, feel free to reach out. We're here to help!
              </p>
              <p style="font-size: 14px; color: #555;">
                Welcome aboard,<br>The Team
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`,
};

export const PASSWORD_RESET_EMAIL = {
    subject: "Password Reset Request",
    html: `
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table align="center" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
          <tr>
            <td style="padding: 30px; text-align: center; background-color: #6c5ce7; color: #ffffff;">
              <h1 style="margin: 0; font-size: 24px;">Reset Your Password</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px; text-align: left;">
              <p style="font-size: 16px; color: #333;">Hi <strong>{userName}</strong>,</p>
              <p style="font-size: 16px; color: #333;">
                We received a request to reset your password. Click the button below to set a new one.
              </p>
              <p style="text-align: center; margin: 30px 0;">
                <a href="{resetLink}" style="background-color: #6c5ce7; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 4px; display: inline-block; font-size: 16px;">
                  Reset Password
                </a>
              </p>
              <p style="font-size: 14px; color: #555;">
                If you didn’t request this, you can safely ignore this email. Your current password will remain unchanged.
              </p>
              <p style="font-size: 14px; color: #555;">
                Best regards,<br>The Team
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`,
};

export const PASSWORD_RESET_SUCCESS_EMAIL = {
    subject: "Your Password Has Been Reset Successfully",
    html: `
  <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <table align="center" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 40px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
            <tr>
              <td style="padding: 30px; text-align: center; background-color: #00b894; color: #ffffff;">
                <h1 style="margin: 0; font-size: 24px;">Password Changed</h1>
              </td>
            </tr>
            <tr>
              <td style="padding: 30px; text-align: left;">
                <p style="font-size: 16px; color: #333;">Hi <strong>{userName}</strong>,</p>
                <p style="font-size: 16px; color: #333;">
                  Your password has been reset successfully. If this was you, no further action is required.
                </p>
                <p style="font-size: 14px; color: #555;">
                  If you didn't perform this action, please reset your password immediately or contact our support team.
                </p>
                <p style="font-size: 14px; color: #555;">
                  Best regards,<br>The Team
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  `,
};
