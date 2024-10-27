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
 const dummy = useRef(null);

 useEffect(() => {
  setMessages([]);

  if (selectedUser && !getLoggedUserAndSelectedUserMessagesQuery.isLoading && Array.isArray(getLoggedUserAndSelectedUserMessagesQuery.data))
   setMessages(getLoggedUserAndSelectedUserMessagesQuery.data);
  else
   setMessages([]);

  dummy.current.scrollIntoView({ behaviour: "smooth" });
 }, [loggedUid, selectedUser.uid, getLoggedUserAndSelectedUserMessagesQuery.isLoading, getLoggedUserAndSelectedUserMessagesQuery.data]);

 return (
  <>
   <div className="px-2 pt-5 flex-grow flex flex-col gap-2 pb-5 relative overflow-y-scroll scroll-smooth">
    {
     Array.isArray(messages)
     && messages.length > 0
     && messages.map((message, index) => {
      let avatar = null;
      let username = null;

      if (message.sender == selectedUser.uid) {
       avatar = message.senderData?.profile_pic;
       username = message.senderData.username;
      }
      else {
       avatar = message.senderData.profile_pic;
       username = "You";
      }

      return (
       < MessageBox
        key={message.mid}
        text={message.text}
        selectedUser={selectedUser}
        avatar={avatar}
        username={username} />
      )
     })
    }
    {/* dummy extra box */}
    <div ref={dummy} className="flex-shrink-0 h-[100px]"></div>
   </div>
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
       dummy.current.scrollIntoView({ behaviour: "smooth" });
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