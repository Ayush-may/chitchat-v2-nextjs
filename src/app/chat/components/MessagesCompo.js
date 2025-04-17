import { useMutation, useQuery } from "@tanstack/react-query"
import MessageBox from "./MessageBox"
import axiosConfig from "@/lib/axiosConfig"
import { useEffect, useRef, useState } from "react";
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


const handleSendMessageFromLoggedToSelectedUser = async ({ loggedUid, selectedUid, text, send_at }) => {
  try {
    const res = await axiosConfig.post(`/users/${loggedUid}/messages/${selectedUid}`, {
      text, send_at
    });
    return res.data;
  } catch (error) {
    return error.message;
  }
}

// COMPONENT
const MessagesCompo = ({ selectedUser, loggedUid, setUsers, io }) => {
  const [messages, setMessages] = useState([]);
  const [inputFieldText, setInputFieldText] = useState("")
  const inputRef = useRef(null);
  const dummy = useRef(null);
  const [lastMessage, setLastMessage] = useState({})

  // Reacy query- Runs every time
  const getLoggedUserAndSelectedUserMessagesQuery = useQuery(
    ['getLoggedUserAndSelectedUserMessages', loggedUid, selectedUser?.uid],
    () => {
      const selectedUid = selectedUser.uid;
      return getLoggedUserAndSelectedUserMessages({ loggedUid, selectedUid, lastMessage })
    },
    {
      cacheTime: 5000
      // enabled: !!loggedUid && !!selectedUser.uid,
      // staleTime: 0,
      // refetchInterval: 5000,
      // refetchIntervalInBackground: true
    }
  );
  const handleSendMessageFromLoggedToSelectedUserMutation = useMutation(handleSendMessageFromLoggedToSelectedUser, {
    // onSuccess: () => { getLoggedUserAndSelectedUserMessagesQuery.refetch() },
  });


  useEffect(() => {
    if (io.current) {
      io.current.on('message_receive', (data) => {
        setMessageIntoExistingMessage(data.text, data.sid)
        setLastMessage(new Date(data.send_at).toISOString())
        dummy.current.scrollIntoView({ behaviour: "smooth" });
      })
    }
  }, [])

  useEffect(() => {
    setMessages([]);

    if (
      selectedUser &&
      !getLoggedUserAndSelectedUserMessagesQuery.isLoading &&
      Array.isArray(getLoggedUserAndSelectedUserMessagesQuery.data
      )) {
      setMessages(getLoggedUserAndSelectedUserMessagesQuery.data);
    }
    else {
      setMessages([]);
    }

    dummy.current.scrollIntoView({ behaviour: "smooth" });
  }, [
    loggedUid,
    selectedUser.uid,
    getLoggedUserAndSelectedUserMessagesQuery.isLoading,
    getLoggedUserAndSelectedUserMessagesQuery.data
  ]);


  const updateUserListPosition = () => {
    setUsers((prev) => {
      const index = prev.findIndex(user => user.uid === selectedUser.uid);

      const updated = [...prev];
      const [selected] = updated.splice(index, 1);
      return [selected, ...updated];
    })
  }

  const setMessageIntoExistingMessage = (text, senderId) => {
    setMessages((prev) => {
      const newMessage = {
        sender: senderId,
        text: text,
      }

      return [...prev, newMessage]
    })
  }

  return (
    <>

      < div className="px-2 pt-5 flex-grow flex flex-col gap-2 pb-5 relative overflow-y-scroll scroll-smooth">
        {
          messages.length == 0 ?
            <>
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" width={150} height={150}
                className="mx-auto flex items-center justify-center"
              />
            </>
            :
            Array.isArray(messages)
            && messages.length > 0
            && messages.map((message, index) => {
              let avatar = null;
              let username = null;

              if (message.sender == selectedUser.uid) {
                avatar = message?.senderData?.profile_pic;
                username = message?.senderData?.username;
              }
              else {
                avatar = message?.senderData?.profile_pic;
                username = "You";
              }

              return (
                < MessageBox
                  key={message?.mid}
                  text={message.text}
                  selectedUser={selectedUser}
                  avatar={avatar}
                  username={username} />
              )
            })
        }
        {/* dummy extra box */}
        <div ref={dummy} className="flex-shrink-0 h-[100px]"></div>
      </div >
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
              let send_at = Date.now()

              handleSendMessageFromLoggedToSelectedUserMutation.mutate({
                loggedUid,
                text: inputFieldText,
                selectedUid: selectedUser.uid,
                send_at,
              });

              if (io.current) {
                io.current.emit("message_send", {
                  sid: loggedUid,
                  text: inputFieldText,
                  rid: selectedUser.uid,
                  send_at: send_at,
                  is_read: "unread"
                })
                console.log('message is send to backend')
              }

              setMessageIntoExistingMessage(inputFieldText, loggedUid)
              setInputFieldText("");
              dummy.current.scrollIntoView({ behaviour: "smooth" });
              updateUserListPosition()
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