import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Munshii Privacy</h1>
      <p className="text-gray-700 mb-2">Effective Date: [Jan/2024]</p>
      <p className="text-gray-700 mb-6">
        Munshii ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we
        collect, use, disclose, and protect your personal data when you use our mobile application (Munshii).
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3">1. Collection of Personal Data</h2>
      <p className="text-gray-700 mb-4">We collect the following types of personal data:</p>
      <ul className="list-disc list-inside text-gray-700 mb-6">
        <li>Registration information (name, email, password)</li>
        <li>Financial data (transaction history, account balances, income)</li>
        <li>Device information (device ID, operating system, browser type)</li>
        <li>Location information (city, state, country)</li>
        <li>SMS and call log data (for transaction tracking)</li>
      </ul>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3">2. Purpose of Collection</h2>
      <p className="text-gray-700 mb-6">
        We collect personal data to:
        <ul className="list-disc list-inside mt-2">
          <li>Provide and improve our services</li>
          <li>Enhance user experience</li>
          <li>Offer personalized financial insights and recommendations</li>
          <li>Communicate with you about updates and promotions</li>
        </ul>
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3">3. Data Storage and Security</h2>
      <p className="text-gray-700 mb-6">
        We store your data securely using:
        <ul className="list-disc list-inside mt-2">
          <li>Encryption (AES-256)</li>
          <li>Secure servers (AWS or Google Cloud)</li>
          <li>Regular backups and disaster recovery</li>
        </ul>
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3">4. Data Sharing</h2>
      <p className="text-gray-700 mb-6">
        We share your data with:
        <ul className="list-disc list-inside mt-2">
          <li>Third-party service providers (e.g., payment gateways, data analytics)</li>
          <li>Financial institutions (for account linking)</li>
          <li>Law enforcement agencies (if required by law)</li>
        </ul>
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3">5. User Rights</h2>
      <p className="text-gray-700 mb-6">
        You have the right to:
        <ul className="list-disc list-inside mt-2">
          <li>Access and correct your data</li>
          <li>Delete your account and data</li>
          <li>Opt-out of promotional communications</li>
          <li>Request data portability</li>
        </ul>
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3">6. Data Retention</h2>
      <p className="text-gray-700 mb-6">
        We retain your data for:
        <ul className="list-disc list-inside mt-2">
          <li>As long as your account is active</li>
          <li>5 years after account deletion (for analytics and improvement)</li>
        </ul>
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3">7. Cookies and Tracking</h2>
      <p className="text-gray-700 mb-6">
        We use:
        <ul className="list-disc list-inside mt-2">
          <li>Cookies to track app usage and preferences</li>
          <li>Analytics tools (e.g., Google Analytics) to monitor app performance</li>
        </ul>
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3">8. Changes to Privacy Policy</h2>
      <p className="text-gray-700 mb-6">
        We reserve the right to update this policy. Changes will be posted on our website and app.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3">9. Contact Us</h2>
      <p className="text-gray-700 mb-6">For questions or concerns, email us at [support@munshii.com].</p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3">10. Governing Law</h2>
      <p className="text-gray-700 mb-6">This policy is governed by and construed in accordance with the laws of India.</p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3">Consent</h2>
      <p className="text-gray-700">
        By using Munshii, you consent to this Privacy Policy.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
