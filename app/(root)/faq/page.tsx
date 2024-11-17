import React from 'react';

const FAQPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions (FAQs)</h1>

      <div className="space-y-6">
        {/* Question 1 */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">What is Munshii?</h2>
          <p className="text-gray-700 text-lg">
            <strong>Munshii</strong> is a comprehensive cash flow tracking app that helps you record, track, and manage your financial transactions easily. Whether you're managing daily expenses or handling complex financial data, Munshii offers a secure and intuitive platform to stay in control of your finances.
          </p>
        </div>

        {/* Question 2 */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">How does Munshii ensure the security of my data?</h2>
          <p className="text-gray-700 text-lg">
            Your data's security is our top priority. Munshii uses industry-standard encryption (AES-256) to protect your data. All information is securely stored on Amazon Web Services (AWS), ensuring high levels of reliability and security. Additionally, Munshii integrates Google authentication to provide a safe and seamless login experience.
          </p>
        </div>

        {/* Question 3 */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">What features does Munshii offer?</h2>
          <p className="text-gray-700 text-lg">
            Munshii provides various features, including:
          </p>
          <ul className="list-disc list-inside text-gray-700 text-lg">
            <li>Recording and managing financial transactions</li>
            <li>Tracking income, expenses, and balances</li>
            <li>Providing an easy-to-use interface for better user experience</li>
            <li>Secure data storage and integration with Google authentication</li>
          </ul>
        </div>

        {/* Question 4 */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Is Munshii compliant with financial regulations?</h2>
          <p className="text-gray-700 text-lg">
            Yes, Munshii is designed to comply with financial regulations. It follows guidelines set by the Reserve Bank of India (RBI) and other applicable laws, including the Indian Contract Act, 1872, and the Interest Act, 1978.
          </p>
        </div>

        {/* Question 5 */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Can I use Munshii for private lending?</h2>
          <p className="text-gray-700 text-lg">
            Yes, Munshii offers features for private lending. However, users must comply with all applicable laws and regulations, such as state-specific money lending acts and RBI guidelines. Munshii does not facilitate or arrange loans, nor does it guarantee repayments or interest.
          </p>
        </div>

        {/* Question 6 */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">How do I delete my account or data from Munshii?</h2>
          <p className="text-gray-700 text-lg">
            You can request account deletion directly through the app settings or by contacting our support team at [support@munshii.com]. Your data will be retained for up to 5 years after account deletion for analytics and improvement purposes, as per our data retention policy.
          </p>
        </div>

        {/* Question 7 */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">How do I contact Munshii for support?</h2>
          <p className="text-gray-700 text-lg">
            If you have any questions or need assistance, feel free to contact us at [support@munshii.com]. Our team is here to help!
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
