import React, { useEffect, useState } from 'react'
import styles from './Faqs.module.css';
import { Lang } from '../../lang.jsx';
import { toast } from 'react-toastify';

export default function Faqs() {

  const [activeIndex, setActiveIndex] = useState(null);
  const [faqs, setIsFaqs] = useState([]);
  const selectedLanguage = localStorage.getItem("lang") || 'en';
  const langValue = Lang[selectedLanguage];
  // Function to toggle the accordion
  const toggleFAQ = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null); // Close the currently open accordion
    } else {
      setActiveIndex(index); // Open the clicked accordion
    }
  };
  //////////////////////START GET FAQS////////////////////////////////
  const getFaqs = async () => {

    try {
      const response = await fetch(`https://moon-smy9.onrender.com/faq/get`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {

        setIsFaqs(data.allFaq)
        // console.log(data.footerContent.content);

      } else {
        switch (response.status) {
          case 500:
            console.log(data.message);
            break;
          default:
            toast('An error occurred. Please try again.');
        }
      }

    } catch (err) {
      console.error("Error Saving Content:", err);
    } finally {
    }
  };
  useEffect(() => {
    getFaqs()
  }, [])
  ////////////////////////END GET FAQS//////////////////////////////// 

  return (




    <>

      <section className="bg-[#040404] py-16 px-1" id='faqs'>
        <h1 className="text-[2rem] text-white text-center mb-5">{langValue['faqsTitle']}</h1>
        <div className="text-white p-4 rounded-lg max-w-2xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">

              <div
                className={`${styles.faqs_border} p-4 cursor-pointer border-solid border-2 rounded-lg flex justify-between items-center ${activeIndex === index ? "border-b border-blue-600 bg-white text-black" : ""
                  }`}
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-[1rem] font-semibold">{faq?.question}</h3>
                <span className='flex items-center justify-center'>

                  {activeIndex === index ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      onClick={() => toggleFAQ(index)}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      onClick={() => toggleFAQ(index)}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  )}

                </span>
              </div>


              <div
                className={`${activeIndex === index ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                  } overflow-hidden transition-all duration-500 ease-in-out`}
              >
                <div className="p-4 bg-[#F1F1F1] rounded-lg mt-2 ">
                  <p className="text-base text-black">{faq?.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>






  )
}
