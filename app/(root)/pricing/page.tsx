import React from 'react';

const PricingPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Pricing</h1>
      
      <div className="space-y-6">
        {/* Pricing Information */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">How much does Munshii cost?</h2>
          <p className="text-gray-700 text-lg">
            Well, prepare yourself for some big news... <strong>Absolutely nothing!</strong> That's right. For now, Munshii is completely free. You get all the amazing features, security, and financial tracking tools with no cost whatsoever. It’s like we’re giving away financial magic for free—just because we can! 
          </p>
        </div>

        {/* Sarcastic section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">But wait... is there a catch?</h2>
          <p className="text-gray-700 text-lg">
            Catch? Haha, no catch. You didn’t miss anything. The app is free to use, and we’re not trying to sneak in hidden charges under the rug. We’re just here to help you manage your finances without the hassle of paying for something that should be accessible to everyone. 
          </p>
        </div>

        {/* Future Pricing */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Will it always be free?</h2>
          <p className="text-gray-700 text-lg">
            Well, we like to think of ourselves as "future millionaires," so who knows? But for now, enjoy this lovely, no-cost experience while it lasts. We're keeping it free to make sure you get a taste of just how awesome financial tracking can be without worrying about subscriptions. We’ll keep you posted if that changes—cross our fingers, it doesn’t!
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
