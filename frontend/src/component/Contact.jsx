import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Contact = () => {
  const contactItems = [
    {
      name: 'Facebook',
      link: 'https://www.facebook.com',
      icon: 'fa-facebook',
      color: 'text-blue-600',
    },
    {
      name: 'Twitter',
      link: 'https://www.twitter.com',
      icon: 'fa-twitter',
      color: 'text-blue-400',
    },
    {
      name: 'Instagram',
      link: 'https://www.instagram.com',
      icon: 'fa-instagram',
      color: 'text-pink-500',
    },
    {
      name: 'LinkedIn',
      link: 'https://www.linkedin.com/in/aryanastic',
      icon: 'fa-linkedin',
      color: 'text-blue-700',
    },
    {
      name: '24x7 Support',
      link: '#',
      icon: 'fa-headset',
      color: 'text-teal-700',
    },
    {
      name: 'Call Us',
      link: 'tel:+919131629794',
      icon: 'fa-phone',
      color: 'text-green-600',
    },
  ];

  const isSocialIcon = (icon) =>
    ['fa-facebook', 'fa-twitter', 'fa-instagram', 'fa-linkedin'].includes(icon);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 my-10 bg-white/20 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-4xl font-bold text-center mb-12 text-teal-700">Get in Touch</h2>
      <p className="text-center max-w-xl mx-auto mb-12 text-gray-700">
        We'd love to hear from you! Whether it's feedback, inquiries, or support, connect with us through any of the following channels.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {contactItems.map((item) => (
          <a
            key={item.name}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group transform transition-transform duration-300 hover:scale-105"
          >
            <div className="p-6 bg-white/40 backdrop-blur-xl rounded-xl shadow-xl hover:shadow-2xl hover:shadow-teal-500/50 transition-shadow duration-300 border border-white/30 group-hover:shadow-2xl group-hover:shadow-teal-500/50">
              <div className="flex items-center space-x-4">
                <i
                  className={`${isSocialIcon(item.icon) ? 'fab' : 'fas'} ${item.icon} ${item.color} text-3xl drop-shadow`}
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-600 group-hover:text-teal-700 transition-colors">
                    {item.name === 'Call Us'
                      ? 'Give us a ring anytime!'
                      : item.name === '24x7 Support'
                      ? 'We’re always here for you.'
                      : `Visit our ${item.name} page`}
                  </p>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Contact;
