import React, { useState } from "react";

const FAQItem = ({
  question,
  answer,
  isOpen,
  onClick,
  isFirst,
  onInputChange,
  inputValue,
  onSubmit,
}) => {
  return (
    <div>
      <h4
        onClick={onClick}
        style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
        id="faq-head"
        className="mb-5"
      >
        <i
          className="fa fa-question"
          style={{ marginRight: "8px" }}
          id="question"
        ></i>
        {question}
      </h4>
      {isOpen && answer && <p className="mb-5">{answer}</p>}
      {isOpen && isFirst && (
        <div className="d-flex ">
          {/* <input
            type="text"
            placeholder="Ask a question"
            value={inputValue}
            onChange={onInputChange}
            style={{ width: "100%", padding: "10px", border: "none" }}
            required
          />
          <button
            onClick={onSubmit}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Submit
          </button> */}
        </div>
      )}
    </div>
  );
};

export default function Faq() {
  // Store open indices as an array (initially open FAQ 0 and 1)
  const [openIndices, setOpenIndices] = useState([0, 0]);
  const [questionInput, setQuestionInput] = useState("");
  const [submittedQuestion, setSubmittedQuestion] = useState("");

  const faqs = [
   
    {
      question: "What Is the Purpose of a Car Transmission?",
      answer:
        "Transmissions in automobiles are either automatic or manual. Automobiles with manual gearboxes are also known as clutches or stick-shift vehicles. Automatic transmissions are the most widespread and are most likely what you drive. A transmission’s primary function is to translate speeds and torques along a vehicle’s drive system. This means that it changes a vehicle’s gear ratios automatically, allowing it to drive within its limited speed range while yet producing a wide variety of torque and output speeds.",
    },
    {
      question: "Is Regular Transmission Maintenance Necessary?",
      answer:
        "Yes, maintaining your car’s transmission is important for dependable performance and long-term durability. Routine services, including regular inspections and tune-ups, are the key preventative measures to avoid costly repairs. Additionally, using the correct fuel and fuel additives can enhance both the performance and lifespan of your car’s engine and transmission, ensuring smoother drives and fewer breakdowns.",
    },
    {
      question:
        "What is the expected lifespan of the engine or transmission I’m purchasing?",
      answer:
        "The engine or transmission you're considering has undergone a thorough inspection and is built to deliver dependable, long-lasting performance. With the right care, a new engine or transmission should last anywhere from 150,000 to 200,000 miles, or even longer. We thoroughly examine and recondition our used engines and transmissions to make sure they operate like new, providing you with great value at a reduced cost. The longevity of your purchase can be greatly increased by adhering to routine maintenance procedures, such as timely fluid checks and oil changes. By choosing our product, you are making an investment in long-term performance and quality, supported by our dedication to guaranteeing client happiness.When you work with us, you're ensuring dependability for the future, not just a product.",
    },
  ];

  // Handle the toggle of FAQ open/close
  const handleToggle = (index) => {
    setOpenIndices((prevIndices) =>
      prevIndices.includes(index)
        ? prevIndices.filter((i) => i !== index) // Close it if it's already open
        : [...prevIndices, index] // Open it if it's not open
    );
  };

  const handleInputChange = (e) => {
    setQuestionInput(e.target.value);
  };

  const handleSubmit = () => {
    if (questionInput) {
      setSubmittedQuestion(questionInput);
      setQuestionInput(""); // Reset input field after submission
      alert("Question submitted: " + questionInput); // Or send to backend if needed
    }
  };

  return (
    <>
      <div className="process text-center mb-5 head1">
        <h3>FAQ'S</h3>
        <h4>General frequently asked questions</h4>
      </div>
      <div className="faq">
        <div className="container">
          <div className="row mt-5 align-items-center">
            <div className="col-lg-4">
              <img
                src="/assets/Car-Engine-PNG-HD.png"
                alt=""
                className="w-100"
              />
            </div>
            <div className="col-lg-8">
              <div className="mb-5 ps-5">
                {faqs.map((faq, index) => (
                  <FAQItem
                    key={index}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openIndices.includes(index)} // Check if the index is in the openIndices array
                    onClick={() => handleToggle(index)} // Toggle the FAQ
                    isFirst={index === 0} // Show input field only for the first FAQ
                    inputValue={questionInput}
                    onInputChange={handleInputChange}
                    onSubmit={handleSubmit}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
