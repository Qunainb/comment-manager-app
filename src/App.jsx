import { useEffect, useState } from "react";

import CommenForm from "./Components/CommentForm";
import CommentList from "./Components/CommentList";
import { fetchComments } from "./api/comments";

function App() {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getComments() {
      setIsLoading(true);
      try {
        const data = await fetchComments();

        setComments(data);
      } catch (error) {
        setError(error.message);
      }

      setIsLoading(false);
    }

    getComments();
  }, []);
  return (
    <>
      <CommenForm comments={comments} setComments={setComments} />
      <CommentList comments={comments} isLoading={isLoading} error={error} />
    </>
  );
}

export default App;
