export const VERIFY_ACCOUNT_EMAIL = `
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
`;
