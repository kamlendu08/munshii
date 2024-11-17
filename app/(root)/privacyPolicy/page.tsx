import React from 'react';

const TermsOfService: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Munshii Privacy Policy</h1>
      <p className="text-gray-700 mb-6">
        By using the private lending features of the Munshii app, you acknowledge that you have read, understood, and
        agree to the following terms:
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3">Private Lending Terms</h2>
      <ol className="list-decimal list-inside text-gray-700 mb-6">
        <li>
          <strong>Compliance with Laws:</strong> You shall comply with all applicable laws and regulations related to
          private lending, including:
          <ul className="list-disc list-inside mt-2 ml-6">
            <li>The Indian Contract Act, 1872</li>
            <li>The Interest Act, 1978</li>
            <li>The Reserve Bank of India (RBI) guidelines on private lending</li>
            <li>State-specific money lending acts and regulations</li>
          </ul>
        </li>
        <li><strong>Lending Limits:</strong> You shall not lend or borrow amounts exceeding the limits prescribed by law.</li>
        <li><strong>Interest Rates:</strong> You shall not charge or pay interest rates exceeding the maximum rates prescribed by law.</li>
        <li>
          <strong>Disclosure:</strong> You shall provide clear and transparent disclosure of loan terms, interest rates, and repayment schedules.
        </li>
        <li>
          <strong>Security:</strong> You shall not provide security or collateral for loans without complying with applicable laws.
        </li>
        <li><strong>Repayment:</strong> You shall ensure timely repayment of loans and interest.</li>
        <li>
          <strong>Default:</strong> You shall notify the App and relevant authorities in case of default or non-payment.
        </li>
      </ol>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3">Government Guidelines</h2>
      <p className="text-gray-700 mb-6">
        You acknowledge that you have read and understood the government guidelines on private lending, including:
      </p>
      <ul className="list-disc list-inside text-gray-700 mb-6">
        <li>RBI's Guidelines on Private Lending (2022)</li>
        <li>State-specific money lending acts and regulations</li>
        <li>The Indian Finance Ministry's guidelines on peer-to-peer lending</li>
      </ul>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3">Representation and Warranties</h2>
      <ol className="list-decimal list-inside text-gray-700 mb-6">
        <li>You are eligible to lend or borrow under applicable laws.</li>
        <li>You have provided accurate and complete information.</li>
        <li>You will comply with all applicable laws and regulations.</li>
      </ol>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3">Disclaimer</h2>
      <ol className="list-decimal list-inside text-gray-700 mb-6">
        <li>The App does not facilitate or arrange loans.</li>
        <li>The App does not provide lending or investment advice.</li>
        <li>The App does not guarantee loan repayment or interest.</li>
      </ol>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3">Indemnification</h2>
      <p className="text-gray-700">
        You agree to indemnify and hold harmless Munshii and its affiliates against any losses, damages, or claims
        arising from your use of the private lending features.
      </p>
    </div>
  );
};

export default TermsOfService;
