'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, Send, Search, Phone, Video, X, Image, Smile, Paperclip, Menu, ArrowLeft } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const emojis = ['😀', '😂', '😍', '🥳', '😎', '🤔', '👍', '❤️', '🎉', '🌟']

export default function ChatInterface() {
  const [users, setUsers] = useState([
    { id: 1, name: "Alice", avatar: "/placeholder.svg?height=32&width=32", lastMessage: "Hey, how are you?" },
    { id: 2, name: "Bob", avatar: "/placeholder.svg?height=32&width=32", lastMessage: "Did you see the game last night?" },
    { id: 3, name: "Charlie", avatar: "/placeholder.svg?height=32&width=32", lastMessage: "Meeting at 3 PM" },
    { id: 4, name: "David", avatar: "/placeholder.svg?height=32&width=32", lastMessage: "Thanks for your help!" },
    { id: 5, name: "Eva", avatar: "/placeholder.svg?height=32&width=32", lastMessage: "Let's catch up soon" },
  ])

  const [selectedUser, setSelectedUser] = useState(null)
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState("")
  const [isCallActive, setIsCallActive] = useState(false)
  const [isVideoCall, setIsVideoCall] = useState(false)
  const [showUserList, setShowUserList] = useState(true)

  const handleSelectUser = (user) => {
    setSelectedUser(user)
    setShowUserList(false)
    setMessages([
      { id: 1, text: `Hello, ${user.name}!`, sender: 'other', timestamp: '10:00 AM', type: 'text', read: true },
      { id: 2, text: "Hi there! How are you?", sender: 'user', timestamp: '10:01 AM', type: 'text', read: true },
      { id: 3, text: "I'm doing great, thanks for asking!", sender: 'other', timestamp: '10:02 AM', type: 'text', read: true },
      { id: 4, text: "That's wonderful to hear. Any plans for the weekend?", sender: 'user', timestamp: '10:03 AM', type: 'text', read: true },
      { id: 5, text: "/placeholder.svg?height=200&width=300", sender: 'other', timestamp: '10:04 AM', type: 'image', read: false },
    ])
  }

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "" && selectedUser) {
      const newMessage = {
        id: messages.length + 1,
        text: inputMessage,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'text',
        read: false
      }
      setMessages([...messages, newMessage])
      setInputMessage("")
      
      setUsers(users.map(user => 
        user.id === selectedUser.id ? { ...user, lastMessage: inputMessage } : user
      ))
    }
  }

  const handleCall = (video) => {
    setIsCallActive(true)
    setIsVideoCall(video)
  }

  const handleEndCall = () => {
    setIsCallActive(false)
    setIsVideoCall(false)
  }

  const handleLogout = () => {
    alert("Logout functionality would be implemented here")
  }

  const handleEmojiSelect = (emoji) => {
    setInputMessage(inputMessage + emoji)
  }

  const handleMediaUpload = () => {
    // This is a placeholder for media upload functionality
    const imageUrl = "/placeholder.svg?height=200&width=300"
    const newMessage = {
      id: messages.length + 1,
      text: imageUrl,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'image',
      read: false
    }
    setMessages([...messages, newMessage])
  }

  const UserList = () => (
    <ScrollArea className="flex-grow">
      {users.map(user => (
        <div
          key={user.id}
          className={`flex items-center space-x-4 p-4 hover:bg-gray-100 cursor-pointer transition-colors duration-200 ${selectedUser?.id === user.id ? 'bg-gray-100' : ''}`}
          onClick={() => handleSelectUser(user)}
        >
          <Avatar>
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
            <p className="text-sm text-gray-500 truncate">{user.lastMessage}</p>
          </div>
        </div>
      ))}
    </ScrollArea>
  )

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-100">
      {/* Sidebar for larger screens */}
      <div className="hidden md:flex md:w-80 border-r flex-col bg-white shadow-md">
        <div className="p-4 bg-primary flex justify-between items-center">
          <h2 className="text-primary-foreground text-xl font-bold">Chats</h2>
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="h-5 w-5 text-primary-foreground" />
          </Button>
        </div>
        <div className="p-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search chats" className="pl-8" />
          </div>
        </div>
        <UserList />
      </div>

      {/* Main area (user list or chat) for small screens */}
      <div className="flex-1 flex flex-col bg-white md:hidden">
        {showUserList ? (
          <>
            <div className="p-4 bg-primary flex justify-between items-center">
              <h2 className="text-primary-foreground text-xl font-bold">Chats</h2>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-5 w-5 text-primary-foreground" />
              </Button>
            </div>
            <div className="p-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search chats" className="pl-8" />
              </div>
            </div>
            <UserList />
          </>
        ) : selectedUser ? (
          <>
            <div className="bg-primary p-4 flex items-center justify-between shadow-md">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" onClick={() => setShowUserList(true)}>
                  <ArrowLeft className="h-5 w-5 text-primary-foreground" />
                </Button>
                <Avatar>
                  <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} />
                  <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h1 className="text-primary-foreground text-xl font-bold">{selectedUser.name}</h1>
              </div>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon" onClick={() => handleCall(false)}>
                  <Phone className="h-5 w-5 text-primary-foreground" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleCall(true)}>
                  <Video className="h-5 w-5 text-primary-foreground" />
                </Button>
              </div>
            </div>
            <ScrollArea className="flex-grow p-4 bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 ${
                    message.sender === "user" ? "text-right" : "text-left"
                  }`}
                >
                  <div
                    className={`inline-block p-2 rounded-lg ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-white text-gray-800 border border-gray-200"
                    }`}
                  >
                    {message.type === 'text' ? (
                      message.text
                    ) : (
                      <img src={message.text} alt="Shared image" className="max-w-xs rounded-lg" />
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {message.timestamp}
                    {message.sender === 'user' && (
                      <span className="ml-2">
                        {message.read ? '✓✓' : '✓'}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </ScrollArea>
            <div className="p-4 bg-gray-100">
              <div className="flex space-x-2 items-center">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Smile className="h-5 w-5 text-gray-500" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64">
                    <div className="grid grid-cols-5 gap-2">
                      {emojis.map((emoji, index) => (
                        <Button
                          key={index}
                          variant="ghost"
                          className="text-2xl"
                          onClick={() => handleEmojiSelect(emoji)}
                        >
                          {emoji}
                        </Button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
                <Button variant="ghost" size="icon" onClick={handleMediaUpload}>
                  <Paperclip className="h-5 w-5 text-gray-500" />
                </Button>
                <Input
                  placeholder="Type a message"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-grow"
                />
                <Button onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-grow flex items-center justify-center bg-gray-50">
            <p className="text-muted-foreground">Select a chat to start messaging</p>
          </div>
        )}
      </div>

      {/* Main chat area for larger screens */}
      <div className="hidden md:flex md:flex-1 flex-col bg-white">
        {selectedUser ? (
          <>
            <div className="bg-primary p-4 flex items-center justify-between shadow-md">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} />
                  <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h1 className="text-primary-foreground text-xl font-bold">{selectedUser.name}</h1>
              </div>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon" onClick={() => handleCall(false)}>
                  <Phone className="h-5 w-5 text-primary-foreground" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleCall(true)}>
                  <Video className="h-5 w-5 text-primary-foreground" />
                </Button>
              </div>
            </div>
            <ScrollArea className="flex-grow p-4 bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 ${
                    message.sender === "user" ? "text-right" : "text-left"
                  }`}
                >
                  <div
                    className={`inline-block p-2 rounded-lg ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-white text-gray-800 border border-gray-200"
                    }`}
                  >
                    {message.type === 'text' ? (
                      message.text
                    ) : (
                      <img src={message.text} alt="Shared image" className="max-w-xs rounded-lg" />
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {message.timestamp}
                    {message.sender === 'user' && (
                      <span className="ml-2">
                        {message.read ? '✓✓' : '✓'}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </ScrollArea>
            <div className="p-4 bg-gray-100">
              <div className="flex space-x-2 items-center">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Smile className="h-5 w-5 text-gray-500" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64">
                    <div className="grid grid-cols-5 gap-2">
                      {emojis.map((emoji, index) => (
                        <Button
                          key={index}
                          variant="ghost"
                          className="text-2xl"
                          onClick={() => handleEmojiSelect(emoji)}
                        >
                          {emoji}
                        </Button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
                <Button variant="ghost" size="icon" onClick={handleMediaUpload}>
                  <Paperclip className="h-5 w-5 text-gray-500" />
                </Button>
                <Input
                  placeholder="Type a message"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-grow"
                />
                <Button onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-grow flex items-center justify-center bg-gray-50">
            <p className="text-muted-foreground">Select a chat to start messaging</p>
          </div>
        )}
      </div>

      {/* Call Dialog */}
      <Dialog open={isCallActive} onOpenChange={setIsCallActive}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{isVideoCall ? "Video Call" : "Voice Call"}</DialogTitle>
            <DialogDescription>
              {isVideoCall ? "Video calling" : "Calling"} {selectedUser?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center items-center h-40">
            {isVideoCall ? (
              <Video className="h-20 w-20 text-primary" />
            ) : (
              <Phone className="h-20 w-20 text-primary" />
            )}
          </div>
          <Button variant="destructive" onClick={handleEndCall}>
            <X className="h-4 w-4 mr-2" />
            End Call
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}