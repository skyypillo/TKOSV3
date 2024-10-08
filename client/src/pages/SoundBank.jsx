import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function SoundBank() {
  const [sounds, setSounds] = useState([]);

  // This method fetches the lessons from the database.
  useEffect(() => {
    async function getSounds() {
      const response = await fetch(`http://localhost:5050/sound/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const sounds = await response.json();
      setSounds(sounds);
    }
    getSounds();
    return;
  }, [sounds.length]);

  return (
    <div className=" w-full py-20 flex flex-col items-center">
      <h1>SoundBank</h1>
      <div className=" w-full grid grid-cols-3 px-20 pt-28">
        {sounds.map((sound, i) => (
          <Link to={`/sound/${sound._id}`} key={sound._id}>
            <div className=" w-[26vw] h-[26vw] mx-auto my-4 bg-gray-300 rounded-[2rem] p-6 flex flex-col">
              <h3 className=" pb-6">{sound.title}</h3>
              <div className=" w-full h-full bg-black rounded-[2rem]"></div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SoundBank;
