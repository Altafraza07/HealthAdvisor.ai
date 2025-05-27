import { useState } from "react";



const faqData = [
  {
    question: "What is Health Advisor?",
    answer: "Health Advisor is a platform that helps you understand your symptoms and provides health-related guidance with AI.",
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. We take privacy seriously and use secure methods to store and handle your data.",
  },
  {
    question: "Can I use it without signing up?",
    answer: "Some features are available without signup, but personalized advice requires an account.",
  },
  {
    question: "How accurate is the advice?",
    answer: " Highly accurate, the highly trained AI model is disgned to be your personalized health advisor",

  },
  {
    question: "If your query is not mentioned here",
    answer: "Feel free to contact us, our customer support team is at your service 24x7.",
    
  },
   {
    question: "How accurate is the advice?",
    answer: "Our suggestions are based on expert-reviewed content, but we always recommend seeing a doctor for serious conditions.",
    
  },
  // {
  //   question: "You wanna fuck me daddy?",
  //   answer: "  YES.",
    
  // },
];

const Faqsection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="min-h-[80vh] bg-teal-50 py-12 px-4 sm:px-6 lg:px-8  flex justify-center items-center">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-xl w-full">
        <h2 className="text-3xl font-bold text-teal-700 text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4 w-full">
          {faqData.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-lg">
              <button
                onClick={() => toggle(index)}
                className="w-full text-left px-4 py-3 font-medium text-gray-800 hover:bg-teal-100 rounded-t-lg flex justify-between items-center"
              >
                {item.question}
                <span className="text-teal-600">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-4 py-3 text-gray-600 border-t border-gray-200 bg-gray-50 transition duration-300">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faqsection ;
