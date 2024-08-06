import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
    private transporter;

    constructor(private configService: ConfigService) {
        this.transporter = nodemailer.createTransport({
            host: this.configService.get<string>('EMAIL_HOST'),
            port: Number(this.configService.get<number>('EMAIL_PORT')) || 587,
            secure: false,
            auth: {
                user: this.configService.get<string>('EMAIL_USERNAME'),
                pass: this.configService.get<string>('EMAIL_PASSWORD'),
            },
        });
    }

    async sendVerificationEmail(to: string, token: string): Promise<void> {
        try {
            await this.transporter.sendMail({
                to,
                from: this.configService.get<string>('EMAIL_FROM'),
                subject: 'Email Verification',
                text: `Please verify your email using this token: ${token}`,
                html: `<b>Please verify your email using this token: ${token}</b>`,
            });
        } catch (error) {
            console.error('Error sending email:', error);
            throw new Error('Failed to send email');
        }
    }

    async sendResetPasswordEmail(to: string, token: string): Promise<void> {
        try {
            await this.transporter.sendMail({
                to,
                from: this.configService.get<string>('EMAIL_FROM'),
                subject: 'Password Reset',
                text: `Please reset your password using this token: ${token}`,
                html: `<b>Please reset your password using this token: ${token}</b>`,
            });
        } catch (error) {
            console.error('Error sending email:', error);
            throw new Error('Failed to send email');
        }
    }
}
