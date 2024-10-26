import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Image from "next/image";
import { memo } from "react";

const UserAvatar = ({ width = 36, height = 36, user }) => {
  return (
    <>
      <img src={user.avatar} width={width} height={height} alt={user.username} />
    </>
  )
}

export default memo(UserAvatar);