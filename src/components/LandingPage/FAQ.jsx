import React, { useState } from "react";

import FAQbg from "../../assets/images/LandingPage/FAQ-bg.png";
import FButton from "../../assets/images/LandingPage/FAQ-button.png";
import QSMark from "../../assets/images/LandingPage/QuestionMark.png";
import SQSMark from "../../assets/images/LandingPage/Single-Question-Mark.png";
import Coin from "../../assets/images/LandingPage/FAQ-Coin.png";

const FAQ = () => {
  const [expanded, setExpanded] = useState(Array(3).fill(false));

  const handleClick = (index) => {
    setExpanded((prev) =>
      prev.map((isExpanded, i) => (i === index ? !isExpanded : isExpanded)),
    );
  };

  return (
    <section className="relative h-auto">
      <img src={FAQbg} className="opacity-1 absolute w-full" />
      <img
        src={SQSMark}
        className="absolute left-10 top-[150px] w-[20%] sm:left-5 sm:top-[230px] md:top-[300px] lg:left-10 lg:top-[400px]"
      />
      <img
        src={Coin}
        className="absolute right-[4%] top-[17%] w-[20%] sm:right-[4%] sm:top-[20%] sm:w-[15%] md:right-[8%] md:top-[24%] lg:right-[1%] lg:top-[20%] lg:w-[20%]"
      />

      <div className="md mx-auto flex max-w-[380px] flex-col items-center justify-center p-5 pt-10 sm:max-w-[700px] sm:p-20 sm:pt-5 md:max-w-[800px] md:pt-20 lg:max-w-[1100px] lg:pt-40">
        <div className="relative mb-2 flex max-w-[200px] flex-col self-start pt-10 sm:mb-5 sm:max-w-[400px] sm:pt-20 md:max-w-[400px] lg:max-w-[600px]">
          <h2 className="bg-orange-red-gradient bg-clip-text font-pixelify text-lg font-bold text-transparent sm:text-3xl md:text-4xl lg:text-5xl">
            Frequently Asked Questions
          </h2>
          <img
            src={QSMark}
            className="absolute right-[5%] top-[20%] w-[20%] sm:right-[17%] sm:top-[30%] sm:block sm:w-[20%] md:right-[6%] md:top-[30%] lg:right-[15%] lg:top-0"
          />
        </div>

        {faqData.map((item, index) => (
          <div key={index} className="relative mt-5 w-full drop-shadow-2xl">
            <div className="FAQ-border p-5 sm:p-5 md:p-7 lg:p-10">
              <article className="flex flex-row items-center justify-between">
                <h3 className="font-pixelify text-sm font-bold md:text-xl lg:text-3xl">
                  {item.question}
                </h3>
                <button
                  onClick={() => handleClick(index)}
                  className="ml-4 mt-0"
                >
                  <img
                    src={FButton}
                    className={`w-[40%] transform transition-transform duration-300 sm:w-[50%] md:w-[65%] lg:w-[80%] ${
                      expanded[index] ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </article>

              {expanded[index] && (
                <article className="mt-4 font-montserrat text-xs sm:text-sm">
                  <p>{item.answer}</p>
                </article>
              )}
            </div>
          </div>
        ))}

        <div className="mt-5 w-full text-center drop-shadow-2xl">
          <div className="FAQ-border p-4 sm:p-6 lg:p-9">
            <button className="font-pixelify text-sm font-bold md:text-xl lg:text-3xl">
              More questions?
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const faqData = [
  {
    question: "What is Lorem Ipsum?",
    answer:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    question: "Why do we use it?",
    answer:
      "It is a long established fact that a reader will be distracted by the readable content of a page.",
  },
  {
    question: "Where does it come from?",
    answer:
      "Contrary to popular belief, Lorem Ipsum is not simply random text.",
  },
];

export default FAQ;
