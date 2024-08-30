import ChatPeopleList from "components/chat/ChatPeopleList";
import Person from "components/chat/Person";
import React from "react";

export default function ChatPage() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <ChatPeopleList />
    </div>
  );
}
