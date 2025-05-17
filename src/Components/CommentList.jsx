import { useEffect, useState } from "react";
import { fetchComments } from "../api/comments";

export default function CommentList() {
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

  console.log(comments);

  return (
    <div>
      <h1>Comments</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {isLoading && <p>Loading...</p>}
      {!error &&
        !isLoading &&
        comments.map((comment) => (
          <div key={comment.id}>
            <h2>{comment.name}</h2>
            <p>{comment.body}</p>
          </div>
        ))}
    </div>
  );
}
