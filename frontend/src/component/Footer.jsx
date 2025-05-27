import React from 'react'

const Footer = () => {
  return ( 
    <>
    <footer className="bg-teal-600 text-white py-6">
      <div className="max-w-screen-xl mx-auto text-center">
        <p className="text-sm">© 2025 Health Advisor. All rights reserved.</p>
        <div className="mt-4 flex justify-center space-x-8">
          <a href="/privacy" className="hover:underline">Privacy Policy</a>
          <a href="/terms" className="hover:underline">Terms of Service</a>
          <a href="/contactus" className="hover:underline">Contact Us</a>
        </div>
        <div className="mt-4">
          <a href="https://facebook.com" className="text-lg mx-4 hover:text-teal-200">Facebook</a>
          <a href="https://twitter.com" className="text-lg mx-4 hover:text-teal-200">Twitter</a>
          <a href="https://linkedin.com" className="text-lg mx-4 hover:text-teal-200">LinkedIn</a>
        </div>
      </div>
    </footer>
    </>
  
  
   
  )
}

export default Footer;