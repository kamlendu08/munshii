


import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 min-h-screen rounded-xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Contact Me</h1>

      <div className="flex items-center space-x-8">
        {/* Profile Picture */}
        <div className="w-48 h-48 rounded-full overflow-hidden">
          {/* Replace the src with your image link */}
          <img src="/assets/me.jpeg" alt="Kamlendu Bala" className="w-full h-full object-cover" />
        </div>

        {/* Contact Details */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Kamlendu Bala</h2>
          <p className="text-lg text-gray-700">
            <strong>Phone:</strong> 8223823005
          </p>
          <p className="text-lg text-gray-700">
            <strong>Email:</strong> 
            <a href="mailto:kamlendubala@gmail.com" className="text-blue-500 hover:underline">kamlendubala@gmail.com</a>
          </p>
          <p className="text-lg text-gray-700">
            <strong>LinkedIn:</strong>
            <a href="https://www.linkedin.com/in/kamlendu-bala-296a9223a/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              View Profile
            </a>
          </p>
        </div>
      </div>

      {/* Additional Section */}
      <div className="mt-8 text-center">
        <p className="text-gray-600 text-lg">
          Feel free to reach out with any questions, feedback, or just to say hi. I’m always happy to connect!
        </p>
      </div>
    </div>
  );
};

export default ContactPage;
