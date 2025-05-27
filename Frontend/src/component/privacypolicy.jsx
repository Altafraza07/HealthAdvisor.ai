 import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="pt-24 px-6 pb-16 bg-gradient-to-b from-white to-teal-50 min-h-screen text-gray-800">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-teal-600 text-center mb-12 drop-shadow-md">
          Privacy Policy
        </h1>

        <div className="space-y-12">
          {[
            {
              title: 'Introduction',
              content:
                'At Health Advisor.AI, we respect and protect your privacy. This Privacy Policy explains how we collect, use, and protect your personal data when you use our website and services. By using our website, you agree to the collection and use of information in accordance with this policy.',
            },
            {
              title: 'Information We Collect',
              content: (
                <>
                  <p className="mb-2">
                    We collect the following types of information:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <b>Personal Information:</b> Name, email address, and other information you provide when you sign up.
                    </li>
                    <li>
                      <b>Usage Data:</b> Information about how you use the site, such as search queries, interactions, etc.
                    </li>
                    <li>
                      <b>Device Info:</b> IP address, browser, operating system, and related data.
                    </li>
                  </ul>
                </>
              ),
            },
            {
              title: 'How We Use Your Information',
              content: (
                <>
                  <p className="mb-2">We use the collected data to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provide, maintain, and improve our services.</li>
                    <li>Personalize your experience.</li>
                    <li>Communicate updates and promotions.</li>
                    <li>Analyze usage and improve performance.</li>
                  </ul>
                </>
              ),
            },
            {
              title: 'How We Protect Your Information',
              content:
                'We implement security protocols to protect your data. However, due to the nature of the internet, absolute security cannot be guaranteed.',
            },
            {
              title: 'Cookies and Tracking Technologies',
              content:
                'We use cookies and similar tools to enhance user experience. You can manage cookie settings via your browser.',
            },
            {
              title: 'Third-Party Services',
              content:
                'We may use tools like analytics or ads platforms. These services are required to protect your data and not misuse it.',
            },
            {
              title: 'Your Rights',
              content:
                'You can access, update, or delete your data, and opt out of marketing by contacting us or using unsubscribe links.',
            },
            {
              title: 'Changes to This Privacy Policy',
              content:
                'We may update this policy occasionally. Any significant changes will be announced via email or on this page.',
            },
            {
              title: 'Contact Us',
              content: (
                <>
                  <p>If you have questions or concerns, contact us at:</p>
                  <p className="font-semibold mt-2">Email: support@healthadvisor.ai</p>
                </>
              ),
            },
          ].map((section, index) => (
            <section
              key={index}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <h2 className="text-2xl font-semibold text-teal-500 mb-4">{section.title}</h2>
              <div className="text-lg">{section.content}</div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
