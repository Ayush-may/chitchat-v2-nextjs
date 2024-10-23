import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog"
import { Plus, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"

const AddFriendButton = ({ userFrnd }) => {

  const handleAddFriend = (selectedUserId) => {
    try {
      const uid = localStorage.getItem("uid");

      // toast.promise();
    } catch (error) {

    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="ms-2" >
          <UserPlus />
        </Button>
      </DialogTrigger>
      <DialogContent className="h-30" >
        <DialogHeader>
          <DialogTitle>Add Friend</DialogTitle>
          <DialogDescription>Select users from the list below to start your conversation.</DialogDescription>
        </DialogHeader>
        <div className="grid w-full h-40">
          <ScrollArea className="w-full h-full">
            {
              !userFrnd.loading
              &&
              userFrnd.data.getUsers.filter(user => user.uid != localStorage.getItem("uid")).map((user) => {
                return (
                  <div
                    key={user.uid}
                    className='flex items-center gap-3 p-2 hover:bg-gray-100 transition-bg rounded-md'
                  >
                    <Avatar>
                      <AvatarImage src={""} alt={user.username} />
                      <AvatarFallback>{user.username.toUpperCase().charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-sm font-medium text-gray-900 truncate">{user.username}</div>
                    <div title='Add to friend'>
                      <Plus
                        className='cursor-pointer hover:text-gray-500'
                        onClick={() => handleAddFriend(user.uid)}
                      />
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