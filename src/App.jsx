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

  async function handleDeleteComment(id) {
    const originalComments = [...comments];

    // Optimistically remove
    setComments((prev) => prev.filter((comment) => comment.id !== id));

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/comments/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete comment");
      }
    } catch (error) {
      setComments(originalComments);
      setError(error.message);
    }
  }
  return (
    <>
      <CommenForm comments={comments} setComments={setComments} />
      <CommentList
        comments={comments}
        isLoading={isLoading}
        error={error}
        onDelete={handleDeleteComment}
      />
    </>
  );
}

export default App;
