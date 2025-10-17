type props = {
  user: {
    email: string,
    name: string
  },
  url: string
}
export function AuthResetEmailTemplate({ user, url }: props) {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">
  <head>
    <meta name="viewport" content="width=device-width" />
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta
      name="format-detection"
      content="telephone=no,address=no,email=no,date=no,url=no" />
    <meta name="color-scheme" content="light" />
    <meta name="supported-color-schemes" content="light" />
    <!--$-->
    <style>
      @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        mso-font-alt: 'sans-serif';
        src: url(https://rsms.me/inter/font-files/Inter-Regular.woff2?v=3.19) format('woff2');
      }

      * {
        font-family: 'Inter', sans-serif;
      }
    </style>
    <style>
      blockquote,h1,h2,h3,img,li,ol,p,ul{margin-top:0;margin-bottom:0}@media only screen and (max-width:425px){.tab-row-full{width:100%!important}.tab-col-full{display:block!important;width:100%!important}.tab-pad{padding:0!important}}
    </style>
  </head>
  <body style="background-color:#ffffff">
    <table
      border="0"
      width="100%"
      cellpadding="0"
      cellspacing="0"
      role="presentation"
      align="center">
      <tbody>
        <tr>
          <td
            style="margin:0px;background-color:#ffffff;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px">
            <table
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="max-width:600px;width:100%;margin-left:auto;margin-right:auto;border-style:solid;background-color:#ffffff;min-width:300px;padding-top:0.5rem;padding-right:0.5rem;padding-bottom:0.5rem;padding-left:0.5rem;border-radius:0px;border-width:0px;border-color:transparent">
              <tbody>
                <tr style="width:100%">
                  <td>
                    <table
                      align="center"
                      width="100%"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="margin-top:0px;margin-bottom:0px">
                      <tbody style="width:100%">
                        <tr style="width:100%">
                          <td align="left" data-id="__react-email-column">
                            <img
                              title="Logo"
                              alt="Logo"
                              style="display:block;outline:none;border:none;text-decoration:none;width:48px;height:48px" />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table
                      align="center"
                      width="100%"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="max-width:37.5em;height:64px">
                      <tbody>
                        <tr style="width:100%">
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                    <h2
                      style="margin-left:0px;margin-right:0px;margin-top:0px;margin-bottom:12px;text-align:left;color:#111827;font-size:30px;line-height:36px;font-weight:700">
                      <strong>Password Reset Request</strong>
                    </h2>
                    <p
                      style="font-size:15px;line-height:26.25px;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;color:#374151;margin:0 0 20px 0;margin-top:0;margin-right:0;margin-bottom:20px;margin-left:0">
                      Hi ${user.name},
                    </p>
                    <p
                      style="font-size:15px;line-height:26.25px;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;color:#374151;margin:0 0 20px 0;margin-top:0;margin-right:0;margin-bottom:20px;margin-left:0">
                      Someone requested a password reset for your account. If
                      this was you, you can set a new password by clicking the
                      button below.
                    </p>
                    <table
                      align="center"
                      width="100%"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="max-width:100%;text-align:left;margin-bottom:0px">
                      <tbody>
                        <tr style="width:100%">
                          <td>
                            <a
                              href="${url}"
                              style="line-height:100%;text-decoration:none;display:inline-block;max-width:100%;mso-padding-alt:0px;color:#ffffff;background-color:#000000;border-color:#000000;border-width:2px;border-style:solid;font-size:14px;font-weight:500;border-radius:9999px;padding:12px 32px 12px 32px;padding-top:12px;padding-right:32px;padding-bottom:12px;padding-left:32px"
                              target="_blank"
                              ><span
                                ><!--[if mso]><i style="mso-font-width:400%;mso-text-raise:18" hidden>&#8202;&#8202;&#8202;&#8202;</i><![endif]--></span
                              ><span
                                style="max-width:100%;display:inline-block;line-height:120%;mso-padding-alt:0px;mso-text-raise:9px"
                                >Reset Your Password</span
                              ><span
                                ><!--[if mso]><i style="mso-font-width:400%" hidden>&#8202;&#8202;&#8202;&#8202;&#8203;</i><![endif]--></span
                              ></a
                            >
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table
                      align="center"
                      width="100%"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="max-width:37.5em;height:64px">
                      <tbody>
                        <tr style="width:100%">
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                    <p
                      style="font-size:15px;line-height:26.25px;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;color:#374151;margin:0 0 20px 0;margin-top:0;margin-right:0;margin-bottom:20px;margin-left:0">
                      <span style="color:rgb(9, 9, 11)"
                        >If you did not request a password reset, you can safely
                        ignore this email. Only a person with access to your
                        email can reset your account password.</span
                      >
                    </p>
                    <p
                      style="font-size:14px;line-height:24px;color:#64748B;margin-top:0px;margin-bottom:20px;text-align:center;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale">
                      Custom Eco © 2025
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    <!--/$-->
  </body>
</html>
`
}