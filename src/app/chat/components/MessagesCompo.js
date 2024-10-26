import { useMutation, useQuery } from "@tanstack/react-query"
import MessageBox from "./MessageBox"
import axiosConfig from "@/lib/axiosConfig"
import { useEffect, useRef, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import EmojiPopover from "./EmojiPopover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { Label } from "@/components/ui/label";

const getLoggedUserAndSelectedUserMessages = async ({ loggedUid, selectedUid }) => {
  try {
    const res = await axiosConfig.get(`/users/${loggedUid}/messages/${selectedUid}`);
    return res.data;
  } catch (error) {
    return error.message;
  }
}

const handleSendMessageFromLoggedToSelectedUser = async ({ loggedUid, selectedUid, text }) => {
  try {
    const res = await axiosConfig.post(`/users/${loggedUid}/messages/${selectedUid}`, {
      text
    });
    return res.data;
  } catch (error) {
    return error.message;
  }
}

// COMPONENT
const MessagesCompo = ({ selectedUser, loggedUid }) => {
  const getLoggedUserAndSelectedUserMessagesQuery = useQuery(
    ['getLoggedUserAndSelectedUserMessages', loggedUid, selectedUser?.uid],
    () => {
      const selectedUid = selectedUser.uid;
      return getLoggedUserAndSelectedUserMessages({ loggedUid, selectedUid })
    },
    {
      enabled: !!loggedUid && !!selectedUser.uid,
      staleTime: 0,
      refetchInterval: 100,
      refetchIntervalInBackground: true
    }
  );
  const handleSendMessageFromLoggedToSelectedUserMutation = useMutation(handleSendMessageFromLoggedToSelectedUser, {
    onSuccess: () => { getLoggedUserAndSelectedUserMessagesQuery.refetch() },
  });

  const [messages, setMessages] = useState([]);
  const [inputFieldText, setInputFieldText] = useState("")
  const inputRef = useRef(null);

  useEffect(() => {
    setMessages([]);

    if (selectedUser && !getLoggedUserAndSelectedUserMessagesQuery.isLoading && Array.isArray(getLoggedUserAndSelectedUserMessagesQuery.data)) {
      setMessages(getLoggedUserAndSelectedUserMessagesQuery.data);
      console.log(getLoggedUserAndSelectedUserMessagesQuery.data);
    } else
      setMessages([]);

  }, [loggedUid, selectedUser.uid, getLoggedUserAndSelectedUserMessagesQuery.isLoading, getLoggedUserAndSelectedUserMessagesQuery.data]);

  return (
    <>
      <ScrollArea className="px-2 flex-grow gap-2 relative">
        {
          Array.isArray(messages)
          &&
          messages.map(message => {
            let avatar = null;
            if (message.senderData.uid == loggedUid) {
              avatar = message.senderData.profile_pic;
            }
            else {
              avatar = message.recieverData.profile_pic;
            }

            return (
              < MessageBox
                key={message.mid}
                text={message.text}
                selectedUser={selectedUser}
                avatar={avatar}
              />
            )
          })
        }
      </ScrollArea>
      <div className='border p-2 flex gap-2'>
        <EmojiPopover />
        <Input
          ref={inputRef}
          type="text"
          className="rounded"
          placeholder="Type your message here..."
          value={inputFieldText}
          onChange={(e) => setInputFieldText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessageFromLoggedToSelectedUserMutation.mutate({
                loggedUid,
                text: inputFieldText,
                selectedUid: selectedUser.uid,
              });
              setInputFieldText("");
            }
          }}
        />
        <Button className="rounded-md w-fit" size="">
          <Send className='h-4 w-4 text-gray-300' />
          <Label className='ms-2'>Send</Label>
        </Button>
      </div>

    </>
  )
}

export default MessagesCompo;