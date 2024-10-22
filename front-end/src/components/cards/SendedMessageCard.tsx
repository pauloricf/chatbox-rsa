import React from "react";
import { Message } from "../../@types/chat";

const SendedMessageCard: React.FC<{ message: Message }> = ({ message }) => {
  return (
    <div className="flex justify-end mb-4 cursor-pointer">
      <div className="flex max-w-96 flex-wrap bg-indigo-500 text-white rounded-lg p-3 gap-3">
        <p style={{ wordBreak: "break-all" }}>{message.encrypted_message}</p>
      </div>
      <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
        <img
          src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
          alt="My Avatar"
          className="w-8 h-8 rounded-full"
        />
      </div>
    </div>
  );
};

export default SendedMessageCard;
