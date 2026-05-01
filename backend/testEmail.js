import dotenv from 'dotenv';
dotenv.config();

import transporter from './config/nodemailer.js';
import { sendRefundNotificationEmail } from './utils/emailService.js';

async function test() {
    try {
        console.log("Testing email with user:", process.env.EMAIL_USER);
        
        const mailOptions = {
            from: `"Homeaze Notifications" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER, // Send to yourself
            subject: 'Test Email',
            text: 'This is a test email.'
        };
        
        let info = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully!", info.messageId);

        console.log("Testing emailService method...");
        await sendRefundNotificationEmail(
            process.env.EMAIL_USER, 
            "Test User", 
            100, 
            "Test Worker", 
            "2026-05-02", 
            "10:00 AM"
        );
        console.log("Email service tested.");

    } catch (error) {
        console.error("Error sending email:", error);
    }
}

test();
