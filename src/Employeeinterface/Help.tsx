import React, { useState, useEffect } from "react";
import * as signalR from "@microsoft/signalr";
import { useSelector } from "react-redux";
import { RootState } from "../reduxstore/Store_";

interface IMessage {
  user: string;
  message: string;
}

const API_URL = import.meta.env.VITE_API_URL;

function Help() {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(
    null
  );
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [message, setMessage] = useState<string>("");
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const user3 = useSelector((state: RootState) => state.user.userData);
  const [user, setUser] = useState<any>(user3?.Name || "User");

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5160/chathub", {
        withCredentials: true,
      })
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);

    newConnection
      .start()
      .then(() => {
        console.log("Connected to ChatHub");
        setIsConnected(true);
      })
      .catch((err) => console.log("Connection failed: ", err));

    newConnection.on("ReceiveMessage", (user: string, message: string) => {
      setMessages((prevMessages) => [...prevMessages, { user, message }]);
    });

    return () => {
      newConnection.stop();
    };
  }, []);

  const sendMessage = () => {
    if (connection && isConnected && message.trim() !== "") {
      connection
        .invoke("SendMessage", user, message)
        .catch((err) => console.error(err));
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col max-w-xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl border  ">
      <h2 className="text-2xl font-semibold text-red-600 mb-4">
        Chat with Support
      </h2>

      <div className="flex flex-col gap-2 h-96 overflow-y-auto p-4 border rounded bg-gray-50">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg max-w-xs ${
              msg.user === user
                ? "bg-black text-white self-end"
                : "bg-gray-200 text-black self-start"
            }`}
          >
            <strong className="block text-sm">{msg.user}</strong>
            <span className="text-sm">{msg.message}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={sendMessage}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Help;
