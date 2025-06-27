import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog"
import { Loader2, Plus, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import axiosConfig from "@/lib/axiosConfig"
import { useMutation, useQuery } from "@tanstack/react-query"
import { toast } from "sonner"
import { memo, useEffect, useState } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const addToFriend = async ({ frnduid, loggedUser }) => {
  try {
    const res = await axiosConfig.post(`/users/friends`, {
      loggedUser,
      frnduid
    });
    return res.data;
  } catch (error) {
    return error.message;
  }
}

const getAllLoggedUserNoFriends = async (loggedUser) => {
  try {
    const res = await axiosConfig.get(`/users/no_friends/${loggedUser}`);
    return res.data || [];
  } catch (error) {
    return error.message;
  }
}

// COMPONENT HERE
const AddFriendButton = ({ loggedUser, refetchAllAddedFriends }) => {
  const addToFriendMutation = useMutation(addToFriend, {
    onSuccess: () => getAllLoggedUserNoFriendsQuery.refetch()
  });
  const getAllLoggedUserNoFriendsQuery = useQuery(
    ['getAllNoFriends', loggedUser],
    () => {
      refetchAllAddedFriends();
      return getAllLoggedUserNoFriends(loggedUser);
    },
    {
      enabled: !!loggedUser,
      // cacheTime: "8000",
      // refetchInterval: 10000,
      staleTime: 0,
      refetchOnWindowFocus: true,
      refetchOnMount: true,
    }
  );

  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (getAllLoggedUserNoFriendsQuery.data) {
      setUsers(getAllLoggedUserNoFriendsQuery.data);
    }
  }, [loggedUser, getAllLoggedUserNoFriendsQuery.data]);

  const handleAddFriend = async (frnduid) => {
    const data = { frnduid, loggedUser };
    await addToFriendMutation.mutateAsync(data);
  }

  useEffect(() => {
    if (addToFriendMutation.isSuccess) toast.success("Added to friend list");
    if (addToFriendMutation.isError) toast.error("Something went wrong");
  }, [addToFriendMutation.isSuccess, addToFriendMutation.isError]);


  return (
    <Dialog className="mx-10 text-start">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button variant="outline" className="ms-2" >
                <UserPlus className="w-5 h-5 " />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add Friends to Your Friendlist.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent className="max-h-[80%] text-start max-w-80 md:max-w-xl pb-3 rounded-md overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Add Friend</DialogTitle>
          <DialogDescription>Select users from the list below to start your conversation.</DialogDescription>
        </DialogHeader>
        <div className="grid w-full h-full overflow-hidden">
          <ScrollArea className=" ">
            {
              Array.isArray(users) &&
              users.map((user) => {
                return (
                  <div
                    key={user.uid}
                    className='flex items-center gap-3 p-2 hover:bg-gray-100 transition-colors duration-300 rounded-md'>
                    <Avatar>
                      <AvatarImage src={user.profile_pi} alt={user.username} />
                      <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-sm font-medium text-gray-900 truncate">{user.username}</div>
                    <div title='Add to friend'>
                      {addToFriendMutation.isLoading
                        ?
                        <Loader2 className="aniamate-spin" />
                        :
                        <Button variant='outline' size='icon' className='me-2'>
                          <Plus
                            className='w-5 h-5'
                            onClick={() => handleAddFriend(user.uid)} />
                        </Button>
                      }
                    </div>
                  </div>
                )
              })
            }
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddFriendButton;