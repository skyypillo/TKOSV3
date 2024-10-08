import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FaCirclePause } from "react-icons/fa6";
import { FaFastForward, FaFastBackward } from "react-icons/fa";

function Sound() {
  const [sound, setSound] = useState({
    title: "",
    description: "",
    comments: [
      {
        username: "",
        comment: "",
      },
    ],
  });

  const [comment, setComment] = useState({
    username: "temp_user",
    comment: "",
  });

  const [userData, setUserData] = useState(null);

  const params = useParams();
  const navigate = useNavigate();

  const audioRef = useRef(null);
  const [isPaused, setIsPaused] = useState(true);
  const [currentTime, setCurrentTime] = useState(0); // State for tracking the current time
  const [duration, setDuration] = useState(0); // State for tracking the audio duration

  // Update the current time as the audio plays
  useEffect(() => {
    const audio = audioRef.current;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
    };

    const updateDuration = () => {
      setDuration(audio.duration);
    };

    // Attach event listeners
    if (audio) {
      audio.addEventListener("timeupdate", updateTime);
      audio.addEventListener("loadedmetadata", updateDuration);
    }

    // Cleanup listeners on unmount
    return () => {
      if (audio) {
        audio.removeEventListener("timeupdate", updateTime);
        audio.removeEventListener("loadedmetadata", updateDuration);
      }
    };
  }, []);

  const handleFastBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 5; // Fast backward by 5 seconds
    }
  };

  const handlePausePlay = () => {
    if (audioRef.current) {
      if (isPaused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
      setIsPaused(!isPaused); // Toggle play/pause state
    }
  };

  const handleFastForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 5; // Fast forward by 5 seconds
    }
  };

  const handleProgressChange = (e) => {
    const newTime = e.target.value;
    if (audioRef.current) {
      audioRef.current.currentTime = newTime; // Set audio current time when progress bar is dragged
    }
    setCurrentTime(newTime);
  };

  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString() || undefined;
      if (!id) return;
      const response = await fetch(
        `http://localhost:5050/sound/${params.id.toString()}`
      );
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const result = await response.json();
      if (!result) {
        console.warn(`Record with id ${id} not found`);
        navigate("/");
        return;
      }
      setSound(result);
    }
    fetchData();

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
        console.log(
          "A problem occurred with your fetch operation: " + error.message
        );
        toast.error("An unexpected error occurred. Please try again later.");
        // setError(
        //   "A problem occurred with your fetch operation: " + error.message
        // );
      }
    }

    getData();
    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setComment((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();

    if (userData) {
      setComment((prev) => ({
        ...prev,
        username: userData.username,
      }));
    }

    const updatedComment = {
      ...comment,
      username: userData ? userData.username : "temp_user",
    };

    const updatedComments = [...sound.comments, updatedComment];
    const user = { ...sound, comments: updatedComments };

    try {
      let response;
      response = await fetch(`http://localhost:5050/sound/${params.id}`, {
        method: "PATCH",
        credentials: "include", // Ensure cookies are included

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const result = await response.json();

      console.log("Response JSON:", result); // Log the response for debugging

      if (!response.ok) {
        if (result.error) {
          toast.error(result.error);
        } else {
          toast.error(`HTTP error! status: ${response.status}`);
        }
        return;
      } else {
        setSound({
          ...sound,
          comments: updatedComments,
        });
      }
    } catch (error) {
      console.log("A problem occurred with your fetch operation: ", error);
      toast.error("An unexpected error occurred. Please try again later.");
    }

    //     if (!response.ok) {
    //       throw new Error(`HTTP error! status: ${response.status}`);
    //     } else {
    //       setSound({
    //         ...sound,
    //         comments: updatedComments,
    //       });
    //     }
    //   } catch (error) {
    //     console.error("A problem occurred with your fetch operation: ", error);
    //   }
  }

  return (
    <div className=" w-full py-16 px-20">
      <div className=" w-full h-[76vh] flex py-10">
        <div className=" w-1/2">
          <div className=" w-full h-full bg-black rounded-[2rem]"></div>
        </div>
        <div className=" w-1/2 pl-10">
          <h1>{sound.title}</h1>
          <p>{sound.description}</p>
        </div>
      </div>

      <div className="w-full px-20 h-16 flex items-center justify-center">
        <button onClick={handleFastBackward}>
          <FaFastBackward className="w-20 h-20" />
        </button>
        <button onClick={handlePausePlay}>
          <FaCirclePause className="w-20 h-20 mx-10" />
        </button>
        <button onClick={handleFastForward}>
          <FaFastForward className="w-20 h-20" />
        </button>
      </div>

      <div className="w-full px-20 mt-4">
        <audio ref={audioRef} src={`/SOUND/${sound._id}.mp3`} />
      </div>

      <div className="w-full px-20 mt-4 mb-10">
        {/* Progress bar */}
        <input
          type="range"
          min="0"
          max={duration || 0} // Max is the total duration of the audio
          value={currentTime}
          onChange={handleProgressChange} // Update time when progress is dragged
          className="w-full"
        />
      </div>

      <form
        className=" w-full bg-gray-200 flex flex-col items-start p-6 rounded-2xl"
        onSubmit={onSubmit}
      >
        <textarea
          type="text"
          name="comment"
          id="comment"
          placeholder="comment"
          className=" w-full py-2 px-6 border-2 border-black bg-black text-white rounded-2xl mb-2"
          onChange={(e) => updateForm({ comment: e.target.value })}
        />
        <input
          type="submit"
          value="POST"
          className=" bg-black text-white rounded-full px-12 py-2"
        />
      </form>

      <div className=" w-full flex flex-col items-center py-10">
        <h1
          className=" mb-10"
          onClick={() => {
            console.log(userData);
          }}
        >
          COMMENTS
        </h1>

        {sound.comments.map((comment, i) => (
          <div
            className=" w-full bg-gray-200 flex flex-col px-6 py-4 rounded-xl mb-4"
            key={i}
          >
            <div className=" w-full flex items-center justify-between font-bold">
              <p>{comment.username}</p>
              <p>Date</p>
            </div>
            <p>{comment.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sound;
