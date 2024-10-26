import { memo } from "react";

const { Avatar, AvatarImage, AvatarFallback } = require("@/components/ui/avatar")
const { Label } = require("@/components/ui/label")

const MessageBox = ({ selectedUser, text, avatar }) => {
  return (
    <div className='rounded-md p-4 -mt-1 flex gap-2 '>
      <div className="">
        <Avatar className="w-[1.2rem] h-[1.2rem]">
          <AvatarImage src={avatar} alt={selectedUser.username} />
          <AvatarFallback>{selectedUser.username}</AvatarFallback>
        </Avatar>
      </div>
      <div className="align-self-start -mt-1">
        <Label className='text-stone-400 text-[10px] font-bold uppercase '>{selectedUser.username}</Label>
        <p className='text-sm text-gray-600'>
          {text}
        </p>
      </div>
    </div>
  )
}

export default memo(MessageBox);