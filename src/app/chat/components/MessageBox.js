import { memo } from "react";

const { Avatar, AvatarImage, AvatarFallback } = require("@/components/ui/avatar")
const { Label } = require("@/components/ui/label")

const MessageBox = ({ selectedUser, text, avatar, username }) => {
  return (
    <div className={`w-fit rounded-md mt-3 flex gap-2   ${username == 'You' ? 'place-self-end' : ''}`}>
      {
        username == 'You'
          ?
          <>
            <div className="align-self-start -mt-4 flex flex-col">
              <Label className=' text-[10px] text-end w-full font-bold uppercase mb-1'>{username}</Label>
              <p className='text-sm bg-stone-200 rounded-lg p-1.5'>
                {text}
              </p>
            </div>
            <div className={``}>
              <Avatar className="w-[1.2rem] h-[1.2rem]">
                <AvatarImage src={avatar} alt={username} />
                <AvatarFallback>{username}</AvatarFallback>
              </Avatar>
            </div>
          </>
          :
          <>
            <div className={``}>
              <Avatar className="w-[1.2rem] h-[1.2rem]">
                <AvatarImage src={avatar} alt={username} />
                <AvatarFallback>{username}</AvatarFallback>
              </Avatar>
            </div>
            <div className="align-self-start -mt-4">
              <Label className=' text-[10px] font-bold uppercase '>{username}</Label>
              <p className='text-sm bg-blue-200 rounded-lg p-1.5'>
                {text}
              </p>
            </div>
          </>
      }
    </div>
  )
}

export default memo(MessageBox);