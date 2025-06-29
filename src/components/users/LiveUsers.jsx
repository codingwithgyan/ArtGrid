import React from 'react';
import { useOthers, useSelf } from "@liveblocks/react";
import Avatars from "./Avatars";
import "./users.scss";
import { useMemo } from "react";

const generateRandomName = () => {
  const adjectives = [
    "Fast",
    "Happy",
    "Clever",
    "Brave",
    "Silent",
    "Witty",
    "Chill",
    "Cool",
    "Bright",
  ];
  const animals = [
    "Tiger",
    "Panda",
    "Eagle",
    "Shark",
    "Wolf",
    "Otter",
    "Falcon",
    "Koala",
    "Lion",
  ];
  const number = Math.floor(Math.random() * 1000);

  const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomAnimal = animals[Math.floor(Math.random() * animals.length)];

  return `${randomAdj}${randomAnimal}${number}`;
};

const LiveUsers = () => {
  const users = useOthers();
  const currentUser = useSelf();
  const hasMoreUsers = users.length > 3;

  const memoisedUser = useMemo(
    () => {
    return (
      <main className="liver-user-main-container">
        <div className="inner-wrapper">
          {currentUser && (
            <Avatars
              name="You"
              userkey="YOUSELF"
            />
          )}

          {users.slice(0, 3).map(({ connectionId, info }) => {
            return <Avatars key={connectionId} name={generateRandomName()} />;
          })}

          {hasMoreUsers && (
            <div className="avatar-more-box">+{users.length - 3}</div>
          )}
        </div>
      </main>
      
    )},
    [users?.length]
  );
  return memoisedUser;
};

export default LiveUsers;
