import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

function Home() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch("http://localhost:5050/user/profile", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (!response.ok) {
          if (data.error) {
            toast.error(data.error);
          } else {
            toast.error(`HTTP error! status: ${response.status}`);
          }
          return;
          // throw new Error(`HTTP error! status: ${response.status}`);
        }

        setUserData(data);
      } catch (error) {
        setError(
          "A problem occurred with your fetch operation: " + error.message
        );
      }
    }

    getData();
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      <h1>HOME</h1>

      {userData ? (
        <div>
          <p>User Email: {userData.email}</p>
          <p> Hi {userData.username}!!!</p>
          {/* Render more user data as needed */}
        </div>
      ) : (
        <p>Hello</p>
      )}
    </div>
  );
}

export default Home;
