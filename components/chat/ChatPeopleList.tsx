import React from "react";
import Person from "./Person";

export default function ChatPeopleList() {
  return (
    <div className="h-screen min-w-60 flex flex-col bg-gray-50">
      <Person
        index={0}
        isActive={true}
        name={"YongMin"}
        onChatScreen={false}
        onlineAt={new Date().toISOString()}
        userId={"twy8939@naver.com"}
      />
      <Person
        index={0}
        isActive={false}
        name={"Jerry"}
        onChatScreen={false}
        onlineAt={new Date().toISOString()}
        userId={"twy8939@naver.com"}
      />
    </div>
  );
}
