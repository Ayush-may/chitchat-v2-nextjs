import { ScrollArea } from "@radix-ui/react-scroll-area";
import UserAvatar from "./UserAvatar";
import { useRouter } from "next/navigation";
import { Rotate3D } from "lucide-react";

const UserList = ({ users, setSelectedUser }) => {

  if (!users || users.length === 0) {
    return <p>No users found</p>;
  }

  const router = useRouter();


  return (
    <ScrollArea className="flex-grow overflow-y-scroll">
      {users.map(user => (
        <div
          key={user.uid}
          className={`flex items-center space-x-4 p-4 hover:bg-gray-100 cursor-pointer transition-colors duration-200`}
          // ${user?.uid && selectedUser?.uid === user?.uid ? 'bg-gray-100' : ''}
          // onClick={() => handleSelectUser(user)}
          onMouseOver={() => {
            router.prefetch(`/chat/${user.uid}`);
          }}

          onClick={() => {
            setSelectedUser(user);
            // router.push(`chat/${user.uid}`);
          }}

        >
          <UserAvatar user={user} />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{user?.username}</p>
            <p className="text-sm text-gray-400 truncate">todo</p>
          </div>
        </div>
      ))}
    </ScrollArea>
  )
}

export default UserList;