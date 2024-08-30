import Person from "components/chat/Person";
import React from "react";

export default function ChatPage() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Person
        index={0}
        isActive={false}
        name={"YongMin"}
        onChatScreen={false}
        onlineAt={new Date().toISOString()}
        userId={"twy8939@naver.com"}
      />
    </div>
  );
}
