"use client";

import React from "react";
import { getRandomImage } from "utils/random";

export default function Person({
  index,
  userId,
  name,
  onlineAt,
  isActive,
  onChatScreen,
}) {
  return (
    <div
      className={`flex gap-4 items-center p-4 ${
        !onChatScreen && isActive && "bg-light-blue-50"
      }
       ${!onChatScreen && !isActive && "bg-gray-50"}
       ${onChatScreen && "bg-gray-500"}`}
    >
      <img
        src={getRandomImage(index)}
        alt={name}
        className="w-10 h-10 rounded-full"
      />
      <div>
        <p className="text-black font-bold text-lg">{name}</p>
        <p className="text-gray-500 text-sm">{onlineAt}</p>
      </div>
    </div>
  );
}
