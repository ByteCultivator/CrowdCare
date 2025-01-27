import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendNotificationEmail(to: string, subject: string, content: string) {
  try {
    await resend.emails.send({
      from: "CrowdCare <notifications@crowdcare.app>",
      to,
      subject,
      html: content,
    })
  } catch (error) {
    console.error("Error sending email:", error)
    throw error
  }
}

export function generateDonationEmail(donorName: string, amount: string, requestTitle: string) {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h1>Thank you for your donation!</h1>
      <p>Dear ${donorName},</p>
      <p>Thank you for your generous donation of ${amount} to "${requestTitle}".</p>
      <p>Your support makes a real difference in our community.</p>
      <p>Best regards,<br>The CrowdCare Team</p>
    </div>
  `
}

export function generateRequestApprovedEmail(userName: string, requestTitle: string, amount: string) {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h1>Your Fund Request was Approved!</h1>
      <p>Dear ${userName},</p>
      <p>We're pleased to inform you that your fund request "${requestTitle}" for ${amount} has been approved by the community.</p>
      <p>The funds will be transferred to your wallet shortly.</p>
      <p>Best regards,<br>The CrowdCare Team</p>
    </div>
  `
}

