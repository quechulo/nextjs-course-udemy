import { useRef, useState } from "react";

function HomePage() {
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();
  const [allFeedback, setAllFeedback] = useState([]);

  const submitFormHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;

    // {email: 'eldorado@op.pl', text: 'You make good job'}
    fetch("/api/feedback", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: enteredEmail, text: enteredFeedback }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success from index:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const loadAllFeedbackHandler = () => {
    fetch("/api/feedback")
      .then((response) => response.json())
      .then((data) => {
        setAllFeedback(data.feedback);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">Your email address</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback">Your feedback</label>
          <textarea id="feedback" rows="5" ref={feedbackInputRef}></textarea>
        </div>
        <button>Send Feedback</button>
      </form>
      <hr />
      <button onClick={loadAllFeedbackHandler}>Load all feedback</button>
      <ul>
        {allFeedback.map((feedback) => (
          <li key={feedback.id}>
            { feedback.feedback }
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
