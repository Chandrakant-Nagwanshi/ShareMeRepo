// // export default UserProfile;
// import React, { useState, useEffect } from "react";
// import { AiOutlineLogout } from "react-icons/ai";
// import { useParams, useNavigate } from "react-router-dom";
// import { googleLogout } from "@react-oauth/google";

// import {
//   userCreatedPinsQuery,
//   userQuery,
//   userSavedPinsQuery,
// } from "../utils/data";
// import { client } from "../client";
// import MasonryLayout from "./MasonryLayout";
// import Spinner from "./Spinner";
// const activeBtnStyles =
//   "bg-red-500 text-white font-bolod p-2 rounded-full w-20 outline-none";
// const notActiveBtnStyles =
//   "bg-primary mr-4 text-black font-bolod p-2 rounded-full w-20 outline-none";
// const UserProfile = () => {
//   const [user, setUser] = useState(null);
//   const [pins, setPins] = useState(null);
//   const [text, setText] = useState("Created");
//   const [activeBtn, setActiveBtn] = useState("created");
//   const navigate = useNavigate();
//   const { userId } = useParams();
//   // const randomImage =
//   //   "https://source.unsplash.com/1600x900/?nature,photography,technology,space,ai";

//   useEffect(() => {
//     const query = userQuery(userId);
//     client.fetch(query).then((data) => {
//       setUser(data[0]);
//     });
//   }, [userId]);

//   useEffect(() => {
//     if (text === "Created") {
//       const createdPinsQuery = userCreatedPinsQuery(userId);
//       client.fetch(createdPinsQuery).then((data) => {
//         setPins(data);
//       });
//     } else {
//       const savedPinsQuery = userSavedPinsQuery(userId);
//       client.fetch(savedPinsQuery).then((data) => {
//         setPins(data);
//         console.log(data);
//       });
//     }
//   }, [text, userId]);

//   const handleLogout = () => {
//     googleLogout();
//     localStorage.clear();
//     navigate("/login");
//   };

//   if (!user) return <Spinner message="Loading Profile..." />;

//   return (
//     <div className="relative pb-2 h-full justify-center items-center ">
//       <div className="flex flex-col pb-5">
//         <div className="relative flex flex-col mb-7">
//           <div className="flex flex-col justify-center items-center">
//             <img
//               src={"https://picsum.photos/1600/900"}
//               alt="banner-pic"
//               className="w-full h-60 2xl:h-96 shadow-lg object-cover"
//             />
//             <img
//               src={user.image}
//               alt="user-pic"
//               className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
//             />
//             <h1 className="font-bold text-3xl text-center mt-3">
//               {user.userName}
//             </h1>
//             <div className="absolute top-0 right-0 p-2">
//               <button
//                 type="button"
//                 className="bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
//                 onClick={handleLogout}
//               >
//                 <AiOutlineLogout color="red" fontSize={21} />
//               </button>
//             </div>
//           </div>
//           <div className="text-center mb-7">
//             <button
//               type="button"
//               onClick={(e) => {
//                 setText("Created");
//                 setActiveBtn("created");
//               }}
//               className={`${
//                 activeBtn === "created" ? activeBtnStyles : notActiveBtnStyles
//               }`}
//             >
//               Created
//             </button>
//             <button
//               type="button"
//               onClick={(e) => {
//                 setText("Saved");
//                 setActiveBtn("saved");
//               }}
//               className={`${
//                 activeBtn === "saved" ? activeBtnStyles : notActiveBtnStyles
//               }`}
//             >
//               Saved
//             </button>
//           </div>
//           {pins?.length ? (
//             <div className="px-2">
//               <MasonryLayout pins={pins} />
//             </div>
//           ) : (
//             <div className="flex justify-center font-bold items-center w-full text-xl mt-2">
//               No Pins Found!
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;

import React, { useState, useEffect } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useParams, useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";

import {
  userCreatedPinsQuery,
  userQuery,
  userSavedPinsQuery,
} from "../utils/data";
import { client } from "../client";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

const activeBtnStyles =
  "bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none";
const notActiveBtnStyles =
  "bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [pins, setPins] = useState(null);
  const [text, setText] = useState("Created");
  const [activeBtn, setActiveBtn] = useState("created");
  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    const query = userQuery(userId);
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, [userId]);

  useEffect(() => {
    console.log(`Fetching ${text} pins for user: ${userId}`);
    if (text === "Created") {
      const createdPinsQuery = userCreatedPinsQuery(userId);
      client.fetch(createdPinsQuery).then((data) => {
        console.log("Created Pins:", data);
        setPins(data);
      });
    } else {
      const savedPinsQuery = userSavedPinsQuery(userId);
      client.fetch(savedPinsQuery).then((data) => {
        console.log("Saved Pins:", data);
        setPins(data);
      });
    }
  }, [text, userId]);

  const handleLogout = () => {
    googleLogout();
    localStorage.clear();
    navigate("/login");
  };

  if (!user) return <Spinner message="Loading Profile..." />;

  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img
              src={"https://picsum.photos/1600/900"}
              alt="banner-pic"
              className="w-full h-60 2xl:h-96 shadow-lg object-cover"
            />
            <img
              src={user.image}
              alt="user-pic"
              className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
            />
            <h1 className="font-bold text-3xl text-center mt-3">
              {user.userName}
            </h1>
            <div className="absolute top-0 right-0 p-2">
              <button
                type="button"
                className="bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
                onClick={handleLogout}
              >
                <AiOutlineLogout color="red" fontSize={21} />
              </button>
            </div>
          </div>
          <div className="text-center mb-7">
            <button
              type="button"
              onClick={() => {
                setText("Created");
                setActiveBtn("created");
              }}
              className={`${
                activeBtn === "created" ? activeBtnStyles : notActiveBtnStyles
              }`}
            >
              Created
            </button>
            <button
              type="button"
              onClick={() => {
                setText("Saved");
                setActiveBtn("saved");
              }}
              className={`${
                activeBtn === "saved" ? activeBtnStyles : notActiveBtnStyles
              }`}
            >
              Saved
            </button>
          </div>
          {pins?.length ? (
            <div className="px-2">
              <MasonryLayout pins={pins} />
            </div>
          ) : (
            <div className="flex justify-center font-bold items-center w-full text-xl mt-2">
              No Pins Found!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
