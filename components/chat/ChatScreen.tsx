"use client";

import React from "react";
import Person from "./Person";
import Message from "./Message";
import { useRecoilValue } from "recoil";
import { selectedIndexState } from "utils/recoil/atoms";

export default function ChatScreen() {
  const selectedIndex = useRecoilValue(selectedIndexState);

  return selectedIndex !== null ? (
    <div className="w-full h-screen flex flex-col">
      <Person
        index={0}
        isActive={false}
        name={"YongMin"}
        onChatScreen={false}
        onlineAt={new Date().toISOString()}
        userId={"twy8939@naver.com"}
      />

      <div className="w-full flex-1 flex flex-col p-4 gap-3">
        <Message isFromMe={true} message={"Hello"} />
        <Message isFromMe={false} message={"Hi"} />
        <Message isFromMe={true} message={"Hello"} />
        <Message isFromMe={true} message={"Hello"} />
        <Message isFromMe={false} message={"Hi"} />
        <Message isFromMe={false} message={"Hi"} />
      </div>

      <div className="flex">
        <input
          className="p-3 w-full border-2 border-light-blue-600"
          placeholder="메시지를 입력해주세요."
        />
        <button
          className="min-w-20 p-1 bg-light-blue-700 text-white"
          color="light-blue"
        >
          <span>전송</span>
        </button>
      </div>
    </div>
  ) : (
    <div className="w-full"></div>
  );
}
