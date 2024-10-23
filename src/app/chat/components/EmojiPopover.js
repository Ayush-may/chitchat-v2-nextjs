"use client"
import { useState } from "react";
const { Button } = require("@/components/ui/button")
const { Popover, PopoverTrigger, PopoverContent } = require("@radix-ui/react-popover")
const { Smile } = require("lucide-react")

const EmojiPopover = () => {

  const [emojis, _] = useState(['😀', '😂', '😍', '🥳', '😎', '🤔', '👍', '❤️', '🎉', '🌟']);

  return (
    <Popover className="bg-white">
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <Smile className="h-5 w-5 text-gray-500" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 bg-white border p-2 rounded-md">
        <div className="grid grid-cols-5 gap-2">
          {emojis.map((emoji, index) => (
            <Button
              key={index}
              variant="ghost"
              className="text-2xl"
            // onClick={() => handleEmojiSelect(emoji)}
            >
              {emoji}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default EmojiPopover;