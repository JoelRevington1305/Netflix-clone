import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const Movie = ({ item, handleClick }) => {
  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const { user } = UserAuth();
  const movieID = doc(db, "users", `${user?.email}`);

  const saveShow = async () => {
    if (user?.email) {
      setLike(!like);
      setSaved(true);
      const collectionName = "users"
      const userUid = user.uid;
      const userDocRef = doc(db,collectionName, userUid);
      const userDocSnap = await getDoc(userDocRef);
      if(userDocSnap.exists()){
        await updateDoc(userDocRef, {
          savedShows: arrayUnion({
            id:item.id,
            title: item.title,
            img:item.backdrop_path,
          }),
        });
        console.log("Show saved successfully")  
      } else {
        await setDoc(userDocRef, {
          savedShows: [{
            id: item.id,
            title: item.title,
            img: item.backdrop_path,
          }],
        });
        console.log("User document created")
      }
    } else {
      alert("Please log in to save a movie");
    }
  };

  return (
    <div className="w-[160px] sm:w-[200px] md:w[240px] lg:w-[280px] inline-block cursor-pointer relative p-2">
      <img
        onClick={() => handleClick(item)}
        className="transform transition inline-block duration-500 hover:scale-105"
        src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`}
        alt={item.title}
      />
      <div>
        <p onClick={saveShow}>
          {like ? (
            <FaHeart className="absolute top-4 left-4 text-gray-300" />
          ) : (
            <FaRegHeart className="absolute top-4 left-4 text-gray-300" />
          )}
        </p>
      </div>
    </div>
  );
};

export default Movie;