import React from 'react';

const TermsOfService: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Munshii Terms of Service</h1>
      <p className="text-gray-700 mb-2">Effective Date: [Jan/2024]</p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3">Introduction</h2>
      <p className="text-gray-700 mb-6">
        Welcome to Munshii, a mobile application provided by Munshii. These Terms of Service ("Terms") govern
        your use of our app, website, and services.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3">Definitions</h2>
      <ul className="list-disc list-inside text-gray-700 mb-6">
        <li><strong>"App"</strong> means the Munshii mobile application.</li>
        <li><strong>"Services"</strong> means the features, tools, and information provided through the App.</li>
        <li><strong>"User"</strong> means you, the individual using the App.</li>
        <li><strong>"Content"</strong> means any data, information, or materials provided or generated through the App.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3">Terms of Use</h2>
      <ol className="list-decimal list-inside text-gray-700 mb-6">
        <li><strong>Eligibility:</strong> You must be at least 18 years old to use the App.</li>
        <li><strong>Registration:</strong> You must provide accurate and complete registration information.</li>
        <li>
          <strong>Password Security:</strong> You are responsible for maintaining the confidentiality of your password.
        </li>
        <li>
          <strong>Prohibited Use:</strong> You shall not:
          <ul className="list-disc list-inside mt-2 ml-6">
            <li>Use the App for unlawful or unauthorized purposes.</li>
            <li>Interfere with or disrupt App operations.</li>
            <li>Upload or transmit harmful or malicious content.</li>
            <li>Use automated scripts or bots.</li>
          </ul>
        </li>
        <li>
          <strong>Intellectual Property:</strong> Munshii and its content are owned and copyrighted by [Company Name].
        </li>
        <li>
          <strong>User-Generated Content:</strong> You grant us a non-exclusive license to use and display your content.
        </li>
      </ol>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3">Disclaimer of Warranties</h2>
      <ol className="list-decimal list-inside text-gray-700 mb-6">
        <li><strong>No Warranty:</strong> The App and Services are provided "as-is" and "as-available."</li>
        <li><strong>No Liability:</strong> We disclaim liability for any damages, losses, or expenses arising from App use.</li>
      </ol>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3">Limitation of Liability</h2>
      <p className="text-gray-700 mb-6">
        We shall not be liable for:
        <ul className="list-disc list-inside mt-2 ml-6">
          <li>Indirect or Consequential Damages</li>
          <li>Special or Punitive Damages</li>
          <li>Damages Exceeding [Amount]</li>
        </ul>
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3">Termination</h2>
      <ol className="list-decimal list-inside text-gray-700 mb-6">
        <li>We reserve the right to terminate or suspend your account and access.</li>
        <li>We reserve the right to modify or discontinue the App or Services.</li>
      </ol>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3">Governing Law</h2>
      <p className="text-gray-700 mb-6">
        These Terms shall be governed by and construed in accordance with the laws of India.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3">Dispute Resolution</h2>
      <p className="text-gray-700 mb-6">
        Any disputes arising from these Terms shall be resolved through:
        <ul className="list-disc list-inside mt-2 ml-6">
          <li>Arbitration in accordance with the Indian Arbitration and Conciliation Act, 1996.</li>
          <li>Jurisdiction: Courts of [City], India.</li>
        </ul>
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3">Changes to Terms</h2>
      <p className="text-gray-700 mb-6">
        We reserve the right to update these Terms. Changes will be posted on our website and App.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3">Contact Us</h2>
      <p className="text-gray-700 mb-6">For questions or concerns, email us at [kamlendubala@gmail.com].</p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3">Acceptance</h2>
      <p className="text-gray-700">
        By using Munshii, you acknowledge that you have read, understood, and agree to these Terms.
      </p>
    </div>
  );
};

export default TermsOfService;
