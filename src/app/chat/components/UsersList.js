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
    <div className="flex-grow overflow-y-scroll scroll-smooth">
      {users.map(user => (
        <div
          key={user.uid}
          className={`flex items-center space-x-4 p-4 hover:bg-gray-100 cursor-pointer transition-colors duration-200`}

          onClick={() => {
            setSelectedUser(user);
          }}
        >
          <UserAvatar user={user} />
          {
            console.log(user)
          }
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{user?.username}</p>
            <p className="text-sm text-gray-400 truncate">todo</p>
          </div>
          {
            user.is_online == "online" && <div className="w-2 h-2 bg-green-400 rounded-full" ></div>
          }
        </div>
      ))}
    </div>
  )
}

export default UserList;