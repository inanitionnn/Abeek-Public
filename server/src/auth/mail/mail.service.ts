import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { InternalServerError } from 'src/shared/errors';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}
  private readonly logger = new Logger(MailService.name);
  public sendWeDeleteYourAccountMail(emails: string[], reason: string): void {
    this.logger.log('Send delete your account mail (start)');
    this.mailerService
      .sendMail({
        to: emails, // List of receivers email address
        from: process.env.SMTP_USER, // Senders email address
        subject: process.env.CLIENT_URL + ' your account has been deleted', // Subject line
        html: `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Your account has been deleted</title>
                <style>
                      /* Inline CSS for styling */
                      body {
                          font-family: Arial, sans-serif;
                          background-color: #f4f4f4;
                          text-align: center;
                          padding: 24px;
                      }
                      .container {
                          background-color: #ffffff;
                          padding: 24px;
                          border-radius: 5px;
                          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                      }
                      h1 {
                          color: #333;
                      }
                      p {
                          font-size: 16px;
                          color: #555;
                      }
                      .btn {
                          display: inline-block;
                          background-color: #f24a71;
                          color: #ffffff !important; 
                          padding: 12px 24px;
                          text-decoration: none;
                          border-radius: 16px;
                      }
                  </style>
            </head>
            <body>
                <div class="container">
                    <h1>Your account has been deleted</h1>
                    <p>${reason}</p>
                </div>
            </body>
        </html>
        `, // HTML body content
      })
      .catch((err) => {
        this.logger.error('Send delete your account mailerror', err);
        throw new InternalServerError('Sending delete your account mailerror');
      });
    this.logger.log('Send delete your account mail(end)');
  }

  public sendActivationMail(email, link): void {
    this.logger.log('Send activation mail (start)');
    this.logger.verbose(`Activation link: ${link}. Email: ${email}.`);
    this.mailerService
      .sendMail({
        to: email, // List of receivers email address
        from: process.env.SMTP_USER, // Senders email address
        subject: process.env.CLIENT_URL + ' account activation', // Subject line
        html: `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>account activation</title>
                <style>
                      /* Inline CSS for styling */
                      body {
                          font-family: Arial, sans-serif;
                          background-color: #f4f4f4;
                          text-align: center;
                          padding: 24px;
                      }
                      .container {
                          background-color: #ffffff;
                          padding: 24px;
                          border-radius: 5px;
                          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                      }
                      h1 {
                          color: #333;
                      }
                      p {
                          font-size: 16px;
                          color: #555;
                      }
                      .btn {
                          display: inline-block;
                          background-color: #f24a71;
                          color: #ffffff !important; 
                          padding: 12px 24px;
                          text-decoration: none;
                          border-radius: 16px;
                      }
                  </style>
            </head>
            <body>
                <div class="container">
                    <h1>Account activation</h1>
                    <p>Thank you for registering on our website. To activate your account, click on the button below:</p>
                    <a class="btn" href="${link}">Activate your account</a>
                </div>
            </body>
        </html>
        `, // HTML body content
      })
      .catch((err) => {
        this.logger.error('Send activation mail error', err);
        throw new InternalServerError('Sending activation email error');
      });
    this.logger.log('Send activation mail (end)');
  }

  public sendResetPasswordMail(email, link): void {
    this.logger.log('Send reset mail (start)');
    this.logger.verbose(`Reset password link: ${link}. Email: ${email}.`);
    this.mailerService
      .sendMail({
        to: email, // List of receivers email address
        from: process.env.SMTP_USER, // Senders email address
        subject: process.env.CLIENT_URL + ' reset password', // Subject line
        html: `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Reset password</title>
                <style>
                      /* Inline CSS for styling */
                      body {
                          font-family: Arial, sans-serif;
                          background-color: #f4f4f4;
                          text-align: center;
                          padding: 24px;
                      }
                      .container {
                          background-color: #ffffff;
                          padding: 24px;
                          border-radius: 5px;
                          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                      }
                      h1 {
                          color: #333;
                      }
                      p {
                          font-size: 16px;
                          color: #555;
                      }
                      .btn {
                          display: inline-block;
                          background-color: #f24a71;
                          color: #ffffff !important; 
                          padding: 12px 24px;
                          text-decoration: none;
                          border-radius: 16px;
                      }
                  </style>
            </head>
            <body>
                <div class="container">
                    <h1>Reset password</h1>
                    <p>To reset your password account, click on the button below:</p>
                    <a class="btn" href="${link}" rel="noopener noreferrer">Reset password</a>
                </div>
            </body>
        </html>
        `, // HTML body content
      })
      .catch((err) => {
        this.logger.error('Send reset mail error', err);
        throw new InternalServerError('Sending reset password email error');
      });
    this.logger.log('Send reset mail (end)');
  }
}
