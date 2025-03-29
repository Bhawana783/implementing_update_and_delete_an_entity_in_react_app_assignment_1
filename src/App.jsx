import { useState, useEffect } from "react";
import UpdateItem from "./components/UpdateItem";

// API URI to fetch the doors
const API_URI = `http://${import.meta.env.VITE_API_URI}/doors/1`;

function App() {
  // State to store the fetched item
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the existing item from the server
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(API_URI);
        if (!response.ok) {
          throw new Error("Failed to fetch item");
        }
        const data = await response.json();
        setItem(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return <UpdateItem item={item} />;
}

export default App;
