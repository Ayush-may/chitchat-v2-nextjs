import UserAvatar from "./UserAvatar";
import { Label } from "@/components/ui/label";

const UserList = ({ users, setSelectedUser, setShowUserList, io }) => {
 if (!users || users.length === 0) {
  return <Label className="text-center text-gray-400 text-md w-full">No users found</Label>
 }

 return (
  <div className="flex-grow overflow-y-scroll scroll-smooth">
   {users.map(user => (
    <div
     key={user.uid}
     className={`flex items-center space-x-4 p-4 hover:bg-gray-100 cursor-pointer transition-colors duration-200 border-0 border-b`}
     onClick={() => {
      setSelectedUser(user);
      setShowUserList(false);

      if (io.current) {
       io.current.emit('selected_user', { selectedUserId: user.uid })
      }

     }}
    >
     <UserAvatar user={user} />
     <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-gray-900 truncate">{user?.username}</p>
      <p className="text-sm text-gray-400 truncate">todo</p>
     </div>
     {
      user.is_online == "online" && <div className="w-2 h-2 bg-green-400 rounded-full" ></div>
     }
     <div className="px-1 bg-blue-400 rounded-full text-black text-sm" >1</div>
    </div>
   ))}
  </div>
 )
}

export default UserList;