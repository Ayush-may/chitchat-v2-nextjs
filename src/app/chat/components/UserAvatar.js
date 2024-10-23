import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Image from "next/image";
import { memo } from "react";

const UserAvatar = ({ user }) => {
  return (
    <>
      <img src={user.avatar} width={36} height={36} alt={user.name} />
    </>
  )
}

export default memo(UserAvatar);