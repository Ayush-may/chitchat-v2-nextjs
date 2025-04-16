'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, Search, ArrowLeft, User } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useRouter } from 'next/navigation'
import AddFriendButton from './components/AddFriendButton'
import UserAvatar from './components/UserAvatar'
import axiosConfig from '@/lib/axiosConfig'
import { useMutation, useQuery } from '@tanstack/react-query'
import UserList from './components/UsersList'
import { Label } from '@radix-ui/react-label'
import MessagesCompo from './components/MessagesCompo'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import Link from 'next/link'
import { toast } from 'sonner'
import { useSocketIo } from '@/hooks/useSocketIo'
import { io } from 'socket.io-client'

// returns friend list
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
  const io = useSocketIo()

  // const socketio = io("ws://localhost:8000")

  useEffect(() => {
    const uid = localStorage.getItem("uid");

    // socketio.emit('welcome', { uid })
    io.current.emit('welcome', { uid })


    return () => {
      // socketio.disconnect();
      io.current.disconnect();
    };
  }, [io.current])

  useEffect(() => {
    setLoggedUser(localStorage.getItem("uid"));
  }, []);

  const changeOnlineStatusToOfflineMutation = useMutation(changeOnlineStatusToOffline, {
    onSuccess: () => getLoggedUserFriendsQuery.refetch()
  }, {
    cacheTime: 3000,
  });

  const getLoggedUserFriendsQuery = useQuery(
    ['getLoggedUserFriends', loggedUser],
    () => getLoggedUserFriends(loggedUser),
    {
      refetchInterval: 5000,
      refetchOnWindowFocus: true,
      cacheTime: 4000,
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

  const handleLogout = async () => {
    setIsLogOut(true);
    localStorage.clear();

    // socketio.emit('logout', {
    io.current.emit('logout', {
      uid: loggedUser
    })
    toast.success("Logged out")

    // toast
    //   .promise(
    //     changeOnlineStatusToOfflineMutation.mutateAsync(loggedUser),
    //     {
    //       loading: "Logging out...",
    //       success: () => {
    //         io.emit('logout', {
    //           uid: loggedUid
    //         })

    //         return "logged Out"
    //       },
    //       error: "unable to logged-Off"
    //     }
    //   )

    router.replace("/");
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
            <div className="hidden sm:flex md:w-96 border-r flex-col shadow-md">
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

              {/* user list area and account */}
              <div className='flex h-full'>
                <div className='border w-16 flex flex-col items-center pb-5' >
                  {/* TODO: add logged user's data here in seperate component*/}
                  <Button variant="ghost" size="icon" title="No functionality is added" className="mt-auto rounded-full">
                    <User />
                  </Button>
                </div>
                <div className='w-full h-full flex '>
                  <UserList users={users} setShowUserList={setShowUserList} setSelectedUser={setSelectedUser} />
                </div>
              </div>

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
                    <div className="pt-2 pl-2 pr-2 ">
                      <div className="relative flex items-center ">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search chats" className="pl-8" />
                        <AddFriendButton loggedUser={loggedUser} refetchAllAddedFriends={refetchAllAddedFriends} />
                      </div>
                    </div>
                    {/* user list area and account */}
                    <div className='flex h-full'>
                      <div className='shadow-lg w-16 flex flex-col items-center pb-5' >
                        <Button variant="ghost" size="icon" className="mt-auto rounded-full">
                          <User />
                        </Button>
                      </div>
                      <div className='pt-2 w-full h-full flex '>
                        <UserList users={users} setShowUserList={setShowUserList} setSelectedUser={setSelectedUser} />
                      </div>
                    </div>
                  </>
                )
                : selectedUser
                  ? (
                    <>
                      <div className="bg-primary p-4 flex items-center justify-between shadow-md">
                        <div className="flex items-center space-x-4">
                          <Button variant="" size="icon" onClick={() => setShowUserList(true)}>
                            <ArrowLeft className="h-5 w-5 text-primary-foreground" />
                          </Button>
                          <Avatar>
                            <AvatarImage src={selectedUser.avatar} alt={selectedUser.username} />
                            <AvatarFallback>{selectedUser.username}</AvatarFallback>
                          </Avatar>
                          <h1 className="text-primary-foreground text-xl font-bold">{selectedUser.username}</h1>
                        </div>
                      </div>

                      {/* message and input area */}
                      <MessagesCompo selectedUser={selectedUser} loggedUid={loggedUser} />

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
                    <div className='bg-primary flex w-full border-2 border-black p-2 items-center'>
                      <div className='flex items-center'>
                        <Popover>
                          <PopoverTrigger className='flex items-center cursor-pointer hover:bg-gray-200 px-3 py-2 rounded-md select-none'>
                            <UserAvatar user={selectedUser} />
                            <Label className='font-bold ms-2 text-primary-foreground cursor-pointer'>{selectedUser.username}</Label>
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
                    <MessagesCompo selectedUser={selectedUser} setUsers={setUsers} loggedUid={loggedUser} />
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