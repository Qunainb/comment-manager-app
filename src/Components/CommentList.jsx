export default function CommentList({ isLoading, error, comments }) {
  return (
    <div>
      <h1>Comments</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {isLoading && <p>Loading...</p>}
      {!error &&
        !isLoading &&
        comments.map((comment) => (
          <div key={comment.id}>
            <h2>Name: {comment.name}</h2>
            <p>
              <strong>Comment:</strong> {comment.body}
            </p>
          </div>
        ))}
    </div>
  );
}
