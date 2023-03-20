import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { getData } from "../api/feedback/index";

function FeedbackPage(props) {
  const router = useRouter();
  const [details, setDetails] = useState();
  const showDetailsHandler = (id) => {
    // router.push(`/feedback/${id}`)
    fetch(`/api/feedback/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setDetails(data.feedback);
      });
  };
  if (!props.feedbackItems) {
    return <p>Loading...</p>;
  } else {
    return (
      <Fragment>
        {details && <p>{details.email}</p>}
        <ul>
          {props.feedbackItems.map((item) => (
            <li key={item.id}>
              {item.feedback}{" "}
              <button onClick={showDetailsHandler.bind(null, item.id)}>
                Show Details
              </button>
            </li>
          ))}
        </ul>
      </Fragment>
    );
  }
}
export async function getStaticProps() {
  const fetchedData = getData();

  return {
    props: {
      feedbackItems: fetchedData,
    },
  };
}

export default FeedbackPage;
