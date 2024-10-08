import { useRef, useState } from "react";

import { Link, useOutletContext } from "react-router-dom";
import { Switch } from "@mui/material";

function Home() {
  const { isSpeakOn, handleSwitchChange } = useOutletContext();

  return (
    <div className="flex flex-col">
      {/* #################### 01 #################### */}
      <div className=" w-full h-screen px-20 pt-32 pb-10 flex">
        {/* IMG */}
        <div className=" w-1/2 h-full flex flex-col items-center pr-20 justify-between ">
          <div className=" w-full h-[48%] bg-black rounded-2xl overflow-hidden flexcenter">
            <img src="/IMG/01.jpg" alt="01" />
          </div>
          <div className=" w-full h-[48%] bg-black rounded-2xl flexcenter overflow-hidden">
            <img src="/IMG/02.jpg" alt="02" />
          </div>
        </div>

        <div className=" w-1/2 flex flex-col justify-between">
          <div>
            <h1>THE KEY OF SIGHT</h1>
            <p className=" w-3/4">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab porro
              omnis vitae reprehenderit perspiciatis iste rerum sit laboriosam,
              sapiente ipsa eveniet facilis velit harum sed obcaecati ut
              voluptatibus nobis nesciunt veniam doloremque ex debitis! Autem
              repellat consectetur nemo praesentium quam.
            </p>
          </div>

          <div className=" flex items-center justify-between">
            <div className=" bg-black w-[100px] h-[50px]"></div>
            <div className=" flex items-center">
              <p>Voice Assistant</p>
              {/* <button className=" w-12 h-6 bg-black mx-4"></button> */}
              {/* <div className=" flex items-center w-full"> */}
              <Switch
                checked={isSpeakOn}
                onChange={handleSwitchChange}
                color="secondary"
              />
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* #################### 02 #################### */}
      <div className=" w-full flex flex-col px-20 py-10">
        <div className="flex">
          <h1 className=" min-w-fit">ABOUT US</h1>
          <p className=" pl-10">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo odio in
            voluptatibus atque sapiente, vel illo tempore, laborum cum aut et
            laboriosam eveniet doloribus ab libero praesentium possimus
            blanditiis commodi quas repellat nulla officiis deserunt. Adipisci
            debitis temporibus et recusandae?
          </p>
        </div>

        <div className=" bg-black w-full h-[260px] rounded-2xl my-8 overflow-hidden flexcenter relative">
          <Link
            to={"/about"}
            className=" bg-black text-white px-12 py-2 rounded-full absolute bottom-0 left-0 m-4"
          >
            <p>Learn More</p>
          </Link>
          <img src="/IMG/03.jpg" alt="03" />
        </div>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum ipsam
          aspernatur ea soluta ut iure voluptatum assumenda suscipit blanditiis
          veniam vel ab molestias accusamus, eaque veritatis natus distinctio
          laudantium, temporibus accusantium provident quis aperiam. Deleniti
          magnam, sint accusantium maxime quam voluptates dolores repudiandae
          eum voluptate nisi, corporis minus ab. Blanditiis, adipisci. Eum ab
          recusandae repellendus sint illum, placeat eos quisquam sapiente id
          dolore debitis ex, ad blanditiis velit repellat eveniet expedita
          quibusdam quod alias quae fugiat commodi accusantium dolorem! Qui enim
          rerum deserunt veniam natus! Provident reprehenderit voluptates omnis
          consectetur sunt nobis tenetur mollitia? Voluptatum, odio. Enim animi
          fugiat itaque.
        </p>
      </div>

      {/* #################### 03 #################### */}
      <div className=" w-full h-[90vh] flex">
        <div className=" flex flex-col items-center justify-between w-1/2 h-full px-20 py-10 border-r-2 border-black">
          <div>
            <h1 className="mb-6">LESSONS</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque
              sed hic consequatur dolorum ea labore iusto dolores accusantium
              repellendus magnam magni aperiam, perspiciatis unde nam debitis
              saepe sunt quam adipisci vel veniam. Iure, eligendi numquam.
              Ipsum, ipsam. Hic, mollitia illo? Odio minima est explicabo eius
              repellat sunt dolorum, laudantium sequi perspiciatis? Nisi minima
              exercitationem reiciendis, nesciunt repudiandae nostrum optio
              molestias iste quibusdam ut consequuntur a temporibus autem, quo
              esse excepturi doloremque alias dolor beatae aliquid voluptatum
              officiis iure? Exercitationem ab nulla laborum perspiciatis
              voluptates corrupti assumenda, officiis sint veritatis reiciendis
              harum aspernatur eos deleniti odit aut tempore ad vero. Ad!
            </p>
          </div>
          <Link
            to={"/lessons"}
            className=" w-full py-2 bg-black text-white rounded-full flexcenter"
          >
            <p>GO TO LESSONS</p>
          </Link>
        </div>
        <div className=" flex flex-col items-center justify-between w-1/2 px-20 py-10">
          <div>
            <h1 className=" text-center mb-6">SOUND BANK</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque
              sed hic consequatur dolorum ea labore iusto dolores accusantium
              repellendus magnam magni aperiam, perspiciatis unde nam debitis
              saepe sunt quam adipisci vel veniam. Iure, eligendi numquam.
              Ipsum, ipsam. Hic, mollitia illo? Odio minima est explicabo eius
              repellat sunt dolorum, laudantium sequi perspiciatis? Nisi minima
              exercitationem reiciendis, nesciunt repudiandae nostrum optio
              molestias iste quibusdam ut consequuntur a temporibus autem, quo
              esse excepturi doloremque alias dolor beatae aliquid voluptatum
              officiis iure? Exercitationem ab nulla laborum perspiciatis
              voluptates corrupti assumenda, officiis sint veritatis reiciendis
              harum aspernatur eos deleniti odit aut tempore ad vero. Ad!
            </p>
          </div>
          <Link
            to={"/sound bank"}
            className=" w-full py-2 bg-black text-white rounded-full flexcenter"
          >
            <p>GO TO SOUND BANK</p>
          </Link>
        </div>
      </div>

      {/* #################### 04 #################### */}
      <div className=" w-full px-20 py-20 flex">
        <div className="w-1/2">
          <h2 className=" font-black w-min">FREQUENTLY ASKED QUESTIONS</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
            consequatur asperiores architecto beatae aperiam? Voluptas, itaque
            assumenda? Ullam, velit impedit!
          </p>
        </div>
        <div className=" w-1/2">
          <ul className=" bg-gray-200 rounded-2xl py-10 px-8 h-[80vh] overflow-y-scroll">
            <li className=" py-4 border-b-2 border-black">Question 01</li>
            <li className=" py-4 border-b-2 border-black">Question 01</li>
            <li className=" py-4 border-b-2 border-black">Question 01</li>
            <li className=" py-4 border-b-2 border-black">Question 01</li>
            <li className=" py-4 border-b-2 border-black">Question 01</li>
            <li className=" py-4 border-b-2 border-black">Question 01</li>
            <li className=" py-4 border-b-2 border-black">Question 01</li>
          </ul>
        </div>
      </div>

      {/* #################### 05 #################### */}
      <div className=" w-full flex px-20 py-10">
        <div className=" w-2/3 flex flex-col pr-20">
          <h1>CONTACT US</h1>
          <p className=" w-1/2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit nulla facilis ipsam laudantium adipisci repellat,
            cumque quaerat consequatur soluta? Est?
          </p>

          <form className=" flex flex-col py-20 contact">
            <input type="text" name="name" id="name" placeholder="name" />
            <input type="text" name="email" id="email" placeholder="email" />
            <textarea
              name="message"
              id="message"
              placeholder="message"
            ></textarea>
            <span>
              <input
                type="submit"
                value="SUBMIT"
                className=" w-full bg-black text-white py-2 rounded-full my-4"
              />
            </span>
          </form>
        </div>

        <div className=" w-1/3">
          <div className=" w-full bg-black flexcenter rounded-t-full overflow-hidden">
            <img src="/IMG/04.jpg" alt="04" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
