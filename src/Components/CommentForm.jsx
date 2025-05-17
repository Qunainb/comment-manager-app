import { useState } from "react";

export default function CommenForm() {
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState();

  async function addComment() {
    if (!input.trim()) return;

    // Creating Temporary Comment
    const tempId = Date.now();
    const newComment = { id: tempId, text: input };

    // Optimistically update UI
    setComments((prev) => [...prev, newComment]);
    setInput("");

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/comments",
        {
          method: "POST",
          body: JSON.stringify({ body: input }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add comments");
      }

      const data = await response.json();

      //  Optionally update the ID with real one from server
      setComments((prev) =>
        prev.map((comment) =>
          comment.id === tempId ? { ...comment, id: data.id } : comment
        )
      );
    } catch (error) {
      setComments((prev) => prev.filter((comment) => comment.id !== tempId));
      setError(error.message);
    }
  }

  return (
    <div>
      <h2>Comment Form</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          setError(null);
        }}
      />
      <button onClick={addComment}>Add Comment</button>

      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.text}</li>
        ))}
      </ul>
    </div>
  );
}
