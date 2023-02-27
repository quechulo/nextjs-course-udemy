import { useHistory } from "react-router-dom";

import NewMeetupForm from "../components/meetups/NewMeetupForm";

function NewMeetupPage() {
  const history = useHistory();

  const sendForm = (meetupData) => {
    fetch(
      "https://react-refresher-udemy-a11ca-default-rtdb.europe-west1.firebasedatabase.app/meetups.json",
      {
        method: "POST",
        body: JSON.stringify(meetupData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(() => {
        history.replace('/');
    })
  };
  return (
    <section>
      <h1>Add New Meetup</h1>
      <NewMeetupForm sendForm={sendForm} />
    </section>
  );
}

export default NewMeetupPage;
