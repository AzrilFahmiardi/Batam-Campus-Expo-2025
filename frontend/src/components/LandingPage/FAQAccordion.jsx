import { useState } from "react";
import FButton from "../../assets/images/LandingPage/FAQ-button.png";

const FAQAccordion = ({ question, answer }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="relative mt-5 w-full drop-shadow-2xl">
      <div className="FAQ-border p-5 sm:p-5 md:p-7 lg:p-10">
        <article className="flex flex-row items-center justify-between">
          <h3 className="font-pixelify text-sm font-bold md:text-xl lg:text-3xl">
            {question}
          </h3>
          <button onClick={() => setExpanded(!expanded)} className="ml-4 mt-0">
            <img
              src={FButton}
              className={`w-[40%] transform transition-transform duration-300 sm:w-[50%] md:w-[65%] lg:w-[80%] ${
                expanded ? "rotate-180" : ""
              }`}
            />
          </button>
        </article>

        <div
          className={`mt-4 overflow-hidden font-montserrat text-xs transition-all duration-500 ease-in-out sm:text-sm ${
            expanded ? "max-h-screen" : "max-h-0"
          }`}
        >
          <article className="min-h-20">
            <p>{answer}</p>
          </article>
        </div>
      </div>
    </div>
  );
};
export default FAQAccordion;
