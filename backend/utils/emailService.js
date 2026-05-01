import transporter from '../config/nodemailer.js';

export const sendRefundNotificationEmail = async (userEmail, userName, amount, workerName, slotDate, slotTime) => {
    try {
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.warn('Email credentials not set. Skipping refund email.');
            return;
        }

        const mailOptions = {
            from: `"Homeaze Notifications" <${process.env.EMAIL_USER}>`,
            to: userEmail,
            subject: 'Booking Cancelled & Refund Initiated',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
                    <h2 style="color: #d9534f;">Booking Cancelled</h2>
                    <p>Dear <strong>${userName}</strong>,</p>
                    <p>We are writing to inform you that your booking with <strong>${workerName}</strong> on <strong>${slotDate}</strong> at <strong>${slotTime}</strong> has been cancelled.</p>
                    ${amount > 0 ? `<p>Since you had already paid for this booking, we have initiated a refund of <strong>₹${amount}</strong> to your original payment method.</p>
                    <p>Please allow 5-7 business days for the refund to reflect in your account.</p>` : `<p>Your booking has been successfully cancelled. Since no payment was made online, no refund is required.</p>`}
                    <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
                    <p style="font-size: 12px; color: #777;">If you have any questions, please contact our support team.</p>
                    <p style="font-size: 12px; color: #777;">&copy; ${new Date().getFullYear()} Homeaze. All rights reserved.</p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log(`Refund notification email sent to ${userEmail}`);
    } catch (error) {
        console.error('Error sending refund notification email:', error);
    }
};
