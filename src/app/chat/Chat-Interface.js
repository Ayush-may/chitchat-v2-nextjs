'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, Send, Search, Phone, Video, X, Smile, Paperclip, Menu, ArrowLeft, UserPlus, Plus, Loader, Loader2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useRouter } from 'next/navigation'
import AddFriendButton from './components/AddFriendButton'
import EmojiPopover from './components/EmojiPopover'
import UserAvatar from './components/UserAvatar'
import axiosConfig from '@/lib/axiosConfig'
import { useMutation, useQuery } from '@tanstack/react-query'
import UserList from './components/UsersList'
import { Label } from '@radix-ui/react-label'
import MessagesCompo from './components/MessagesCompo'
import { Textarea } from '@/components/ui/textarea'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import axios from 'axios'
import Link from 'next/link'
import { toast } from 'sonner'

const getLoggedUserFriends = async (loggedUser) => {
  try {
    const res = await axiosConfig.get(`/users/friends/${loggedUser}`);
    return res.data;
  } catch (error) {
    return error.message;
  }
}

const changeOnlineStatusToOffline = async (uid) => {
  try {
    const res = axiosConfig.put(`users/to_offline/${uid}`);
    return res.data;
  } catch (error) {
    return error.message;
  }
}

// COMPONENT
export default function ChatInterface() {
  const [loggedUser, setLoggedUser] = useState(null);
  const [users, setUsers] = useState(null);
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [inputMessage, setInputMessage] = useState("")
  const [showUserList, setShowUserList] = useState(true)
  const [isLogOut, setIsLogOut] = useState(false);
  const scrollRef = useRef(null);
  const router = useRouter();
  const screenRef = useRef(null);

  useEffect(() => {
    setLoggedUser(localStorage.getItem("uid"));
  }, []);

  const changeOnlineStatusToOfflineMutation = useMutation(changeOnlineStatusToOffline,
    {
      onSuccess: () => getLoggedUserFriendsQuery.refetch(),
      cacheTime: 3000
    });

  const getLoggedUserFriendsQuery = useQuery(
    ['getLoggedUserFriends', loggedUser],
    () => getLoggedUserFriends(loggedUser),
    {
      refetchInterval: "20000",
      refetchOnWindowFocus: true,
      cacheTime: "10000",
      enabled: !!loggedUser
    }
  );

  useEffect(() => {
    if (loggedUser && Array.isArray(getLoggedUserFriendsQuery?.data)) {
      const usersTemp = getLoggedUserFriendsQuery?.data
        ?.map(user => ({
          uid: user.uid,
          username: user.username,
          avatar: user.profile_pic,
          status: user.status,
          created_at: user.created_at,
          is_online: user.is_online
        }));
      setUsers(usersTemp);
    }
  }, [loggedUser, getLoggedUserFriendsQuery.data]);

  const handleSendMessage = () => {

  }

  const handleLogout = async () => {
    setIsLogOut(true);
    localStorage.clear();

    toast
      .promise(
        changeOnlineStatusToOfflineMutation.mutateAsync(loggedUser),
        {
          loading: "Logging out...",
          success: "Logged-Off",
          error: "unable to logged-Off"
        }
      )
      
    router.replace("/");
  }

  const handleEmojiSelect = (emoji) => {
    setInputMessage(inputMessage + emoji)
  }


  const refetchAllAddedFriends = () => {
    getLoggedUserFriendsQuery.refetch();
  }

  return (
    <div ref={screenRef} className="flex h-full w-full overflow-hidden ">
      {
        isLogOut
          ?
          <>
            <p>Logging off...</p>
          </>
          :
          <>
            {/* Sidebar for larger screens */}
            {/* upper  */}
            <div className="hidden sm:flex md:w-80 border-r flex-col shadow-md">
              <div className="p-4 bg-primary flex justify-between items-center bg-dark">
                <h2 className="text-white text-xl font-bold">Chats</h2>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="destructive" size="icon" onClick={handleLogout}>
                        <LogOut className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Logout</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="p-2">
                <div className="relative flex items-center ">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search chats" className="pl-8" />
                  <AddFriendButton loggedUser={loggedUser} refetchAllAddedFriends={refetchAllAddedFriends} />
                </div>
              </div>
              <UserList users={users} setSelectedUser={setSelectedUser} />
            </div>

            {/* Main area (user list or chat) for small screens */}
            <div className="flex-1 flex flex-col bg-white sm:hidden">
              {showUserList
                ? (
                  <>
                    <div className="p-4 bg-primary flex justify-between items-center">
                      <h2 className="text-primary-foreground text-xl font-bold">Chats</h2>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={handleLogout}>
                              <LogOut className="h-5 w-5 text-primary-foreground" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Logout</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="p-2">
                      <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search chats" className="pl-8" />
                      </div>
                    </div>
                    {/* <UserList /> */}
                  </>
                )
                : selectedUser
                  ? (
                    <>
                      <div className="bg-primary p-4 flex items-center justify-between shadow-md">
                        <div className="flex items-center space-x-4">
                          <Button variant="ghost" size="icon" onClick={() => setShowUserList(true)}>
                            <ArrowLeft className="h-5 w-5 text-primary-foreground" />
                          </Button>
                          <Avatar>
                            <AvatarImage src={selectedUser.avatar} alt={selectedUser.username} />
                            {/* <AvatarFallback>{selectedUser.username}</AvatarFallback> */}
                          </Avatar>
                          <h1 className="text-primary-foreground text-xl font-bold">{selectedUser.name}</h1>
                        </div>
                      </div>

                      <div className="p-4 bg-gray-100">
                        <div className="flex space-x-2 items-center">
                          <EmojiPopover />
                          <Button variant="ghost" size="icon" onClick={handleMediaUpload}>
                            <Paperclip className="h-5 w-5 text-gray-500" />
                          </Button>
                          <Input
                            placeholder="Type a message"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                            className="flex-grow"
                          />
                          <Button onClick={handleSendMessage}>
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex-grow flex items-center justify-center bg-gray-50">
                      <p className="text-muted-foreground">Select a chat to start messaging</p>
                    </div>
                  )}
            </div>

            {/* Main chat area for larger screens */}
            <div className="hidden sm:flex sm:flex-1 flex-col bg-white">
              {
                selectedUser ?
                  <>
                    {/* nav */}
                    <div className='bg-secondary flex w-full border-2 border-back p-2 items-center'>
                      <div className='flex items-center'>
                        <Popover>
                          <PopoverTrigger className='flex items-center cursor-pointer hover:bg-gray-200 px-3 py-2 rounded-md select-none'>
                            <UserAvatar user={selectedUser} />
                            <Label className='font-bold ms-2 text-stone-800 cursor-pointer'>{selectedUser.username}</Label>
                          </PopoverTrigger>
                          <PopoverContent>
                            <div className='flex flex-col gap-2 items-center'>
                              <UserAvatar width={124} height={124} user={selectedUser} />
                              <Label className='font-bold ms-2 text-stone-800 '>{selectedUser.username.toUpperCase()}</Label>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                    {/* center part */}
                    {/* <ScrollArea className="px-2 flex-grow gap-2 relative"> */}
                    <MessagesCompo selectedUser={selectedUser} loggedUid={loggedUser} />
                    {/* </ScrollArea> */}
                    {/* input area */}
                    {/* <div className='border p-2 flex gap-2'>
                <EmojiPopover />
                <Input type="text" className="rounded" placeholder="Type your message here..." />
                <Button className="rounded-md w-fit" size="">
                  <Send className='h-4 w-4 text-gray-300' />
                  <Label className='ms-2'>Send</Label>
                </Button>
              </div> */}
                  </>
                  :
                  <>
                    <div className="flex-grow text-md opacity-80 flex flex-col text-muted-foreground text-center items-center justify-center bg-gray-50">
                      <Label className="">
                        Select a chat to start messaging
                      </Label>
                      <Label className='capitalize'>
                        Chat Application Designed and Developed by Ayush Sharma, Undergraduate Student
                      </Label>
                      <Label className='text-xs text-blue-500'>
                        <Link href={"#"}>
                          See more
                        </Link>
                      </Label>
                    </div>
                  </>
              }
            </div>
          </>
      }


    </div>
  )
}