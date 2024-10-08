import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Lessons() {
  const [lessons, setLessons] = useState([]);

  // This method fetches the lessons from the database.
  useEffect(() => {
    async function getLessons() {
      console.log(process.env.DOMAIN);
      const response = await fetch(`http://localhost:5050/lesson/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const lessons = await response.json();
      setLessons(lessons);
    }
    getLessons();
    return;
  }, [lessons.length]);

  return (
    <div className=" w-full py-20 px-20">
      <div className=" flex flex-col">
        <div className=" w-full h-[280px] bg-black rounded-2xl"></div>
        <h1 className=" text-center my-6">PIANO LESSONS</h1>
        <p className=" w-3/5">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur
          dolore nemo numquam architecto, a odio doloribus culpa iure reiciendis
          veniam est aliquam molestiae commodi ratione? Natus exercitationem,
          expedita distinctio explicabo.
        </p>
      </div>

      {/* LESSONS */}
      <ul className="flex flex-col mt-20">
        {lessons.map((lesson, i) => (
          <li key={lesson._id}>
            <Link to={`/lesson/${lesson._id}`}>
              <div className="flex bg-gray-200 w-full h-[35vh] rounded-[2rem] px-6 py-4 my-4">
                <div className=" min-w-[30%] h-full bg-black rounded-[1rem]"></div>
                <div className=" px-10">
                  <h3>
                    LESSON 0{i + 1}: {lesson.title}
                  </h3>
                  <p>{lesson.description}</p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Lessons;
