"use client";

import React, { useEffect, useState } from "react";
import Person from "./Person";
import Message from "./Message";
import { useRecoilValue } from "recoil";
import {
  presenceState,
  selectedUserIdState,
  selectedUserIndexState,
} from "utils/recoil/atoms";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserById } from "actions/chatActions";
import { Spinner } from "@material-tailwind/react";
import { createBrowserSupabaseClient } from "utils/supabase/client";

export async function sendMessage({ message, chatUserId }) {
  const supabase = createBrowserSupabaseClient();

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error || !session.user) {
    throw new Error("User is not authenticated");
  }

  const { data, error: sendMessageError } = await supabase
    .from("message")
    .insert({
      message,
      receiver: chatUserId,
      // sender: session.user.id,
    });

  if (sendMessageError) {
    throw new Error(sendMessageError.message);
  }

  return data;
}

export async function getAllMessages({ chatUserId }) {
  const supabase = createBrowserSupabaseClient();
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  const { data, error: getMessagesError } = await supabase
    .from("message")
    .select("*")
    .or(`receiver.eq.${chatUserId},receiver.eq.${session.user.id}`)
    .or(`sender.eq.${chatUserId},sender.eq.${session.user.id}`)
    .order("created_at", { ascending: true });

  if (getMessagesError) {
    return [];
  }

  return data;
}

export default function ChatScreen() {
  const supabase = createBrowserSupabaseClient();

  const selectedUserId = useRecoilValue(selectedUserIdState);
  const selectedUserIndex = useRecoilValue(selectedUserIndexState);
  const presence = useRecoilValue(presenceState);

  const [message, setMessage] = useState("");

  const selectedUserQuery = useQuery({
    queryKey: ["user", selectedUserId],
    queryFn: () => getUserById(selectedUserId),
  });

  const sendMessageMutation = useMutation({
    mutationFn: () =>
      sendMessage({
        message,
        chatUserId: selectedUserId,
      }),
    onSuccess: () => {
      setMessage("");
      getAllMessagesQuery.refetch();
    },
  });

  const getAllMessagesQuery = useQuery({
    queryKey: ["messages", selectedUserId],
    queryFn: () => getAllMessages({ chatUserId: selectedUserId }),
  });

  useEffect(() => {
    const channel = supabase
      .channel("messages_postgres_changes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "message" },
        (payload) => {
          if (payload.eventType === "INSERT" && !payload.errors) {
            getAllMessagesQuery.refetch();
          }
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  return selectedUserQuery.data !== null ? (
    <div className="w-full h-screen flex flex-col">
      <Person
        index={selectedUserIndex}
        isActive={false}
        name={selectedUserQuery.data?.user?.email.split("@")[0]}
        onChatScreen={false}
        onlineAt={presence?.[selectedUserId]?.[0]?.onlineAt}
        userId={selectedUserQuery.data?.user.id}
      />

      <div className="w-full overflow-y-scroll flex-1 flex flex-col p-4 gap-3">
        {getAllMessagesQuery.data?.map((message) => (
          <Message
            key={message.id}
            message={message.message}
            isFromMe={message.receiver === selectedUserId}
          />
        ))}
      </div>

      <div className="flex">
        <input
          className="p-3 w-full border-2 border-light-blue-600"
          placeholder="메시지를 입력해주세요."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="min-w-20 p-1 bg-light-blue-700 text-white"
          color="light-blue"
          onClick={() => sendMessageMutation.mutate()}
        >
          {sendMessageMutation.isPending ? <Spinner /> : <span>전송</span>}
        </button>
      </div>
    </div>
  ) : (
    <div className="w-full"></div>
  );
}
