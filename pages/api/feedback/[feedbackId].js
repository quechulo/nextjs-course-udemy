import { getData } from ".";

function handler(req, res) {
  const feedbackId = req.query.feedbackId;
  const data = getData();
  const selectedFeedback = data.find(
    (feedback) => feedback.id === feedbackId
  );
  res.status(200).json({ feedback: selectedFeedback });
}

export default handler;
