"use client";

import React from "react";
import Person from "./Person";
import { useRecoilState } from "recoil";
import { selectedIndexState } from "utils/recoil/atoms";

export default function ChatPeopleList() {
  const [selectedIndex, setSelectedIndex] = useRecoilState(selectedIndexState);
  return (
    <div className="h-screen min-w-60 flex flex-col bg-gray-50">
      <Person
        onClick={() => setSelectedIndex(0)}
        index={0}
        isActive={selectedIndex === 0}
        name={"YongMin"}
        onChatScreen={false}
        onlineAt={new Date().toISOString()}
        userId={"twy8939@naver.com"}
      />
      <Person
        onClick={() => setSelectedIndex(1)}
        index={1}
        isActive={selectedIndex === 1}
        name={"Jerry"}
        onChatScreen={false}
        onlineAt={new Date().toISOString()}
        userId={"jerry@naver.com"}
      />
    </div>
  );
}
