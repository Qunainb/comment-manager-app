export async function fetchComments() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/comments?_limit=5"
  );

  if (!response.ok) {
    throw new Error("Failed to get comments");
  }
  const data = await response.json();

  return data;
}
