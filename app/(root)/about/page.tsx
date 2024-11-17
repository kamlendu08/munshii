import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">About Munshii</h1>
      <p className="text-lg text-gray-700 leading-relaxed">
        <strong>Munshii</strong> is a powerful and user-friendly cash flow tracking app designed to make managing your finances easier and more efficient. With Munshii, you can seamlessly record, track, and manage all your financial transactions, providing you with a clear overview of your income, expenses, and balances. Whether you're monitoring daily expenses or handling complex transactions, Munshii simplifies the process, empowering you to stay in control of your finances effortlessly. 

        Your data's security is our top priority. Munshii uses industry-standard encryption and securely stores all information on Amazon Web Services (AWS), ensuring the highest levels of data protection. Additionally, the app integrates Google authentication for a safe and seamless login experience, giving you peace of mind every time you use it. 

        Munshii is designed to be intuitive and accessible, offering an easy-to-navigate interface that works for everyone, regardless of technical experience. Manage your cash flow confidently, knowing your financial data is securely handled and always available at your fingertips.
      </p>
    </div>
  );
};

export default AboutSection;
