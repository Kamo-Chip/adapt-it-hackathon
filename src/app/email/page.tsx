"use client"
import { useState } from 'react';
import sgMail from '@sendgrid/mail';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  // This is not secure for production!
  sgMail.setApiKey('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');

  const sendEmail = async () => {
    setLoading(true);
    setResponseMessage('');

    const msg = {
      to: 'muaaazbayat@gmail.com', // Recipient email
      from: 'office@sebenzo.africa', // Your verified sender email from SendGrid
      subject: 'Sending with SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };

    try {
      await sgMail.send(msg);
      setResponseMessage('Email sent successfully!');
    } catch (error) {
      console.error(error);
      setResponseMessage('Error sending email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Send an Email</h1>
      <button onClick={sendEmail} disabled={loading}>
        {loading ? 'Sending...' : 'Send Email'}
      </button>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}
