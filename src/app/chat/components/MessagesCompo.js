import { useMutation, useQuery } from "@tanstack/react-query"
import MessageBox from "./MessageBox"
import axiosConfig from "@/lib/axiosConfig"
import { useEffect, useRef, useState } from "react";
import EmojiPopover from "./EmojiPopover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImagePlus, Send } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";


const getLoggedUserAndSelectedUserMessages = async ({ loggedUid, selectedUid }) => {
  try {
    const res = await axiosConfig.get(`/users/${loggedUid}/messages/${selectedUid}`);
    return res.data;
  } catch (error) {
    return error.message;
  }
}


const handleSendMessageFromLoggedToSelectedUser = async ({ loggedUid, selectedUid, text, send_at }) => {
  try {
    const res = await axiosConfig.post(`/users/${loggedUid}/messages/${selectedUid}`, {
      text, send_at
    });
    return res.data;
  } catch (error) {
    return error.message;
  }
}

// COMPONENT
const MessagesCompo = ({ selectedUser, loggedUid, setUsers, io, setSelectedUser }) => {
  const [messages, setMessages] = useState([]);
  const [inputFieldText, setInputFieldText] = useState("")
  const inputRef = useRef(null);
  const dummy = useRef(null);
  const [lastMessage, setLastMessage] = useState({})
  const [imagePreview, setimagePreview] = useState(null)
  const [open, setOpen] = useState(false)
  const imageSendRef = useRef(null)

  // Reacy query- Runs every time
  const getLoggedUserAndSelectedUserMessagesQuery = useQuery(
    ['getLoggedUserAndSelectedUserMessages', loggedUid, selectedUser?.uid],
    () => {
      const selectedUid = selectedUser.uid;
      return getLoggedUserAndSelectedUserMessages({ loggedUid, selectedUid, lastMessage })
    },
    {
      // cacheTime: 5000
      // enabled: !!loggedUid && !!selectedUser.uid,
      // staleTime: 0,
      // refetchInterval: 5000,
      // refetchIntervalInBackground: true
    }
  );
  const handleSendMessageFromLoggedToSelectedUserMutation = useMutation(handleSendMessageFromLoggedToSelectedUser, {
    // onSuccess: () => { getLoggedUserAndSelectedUserMessagesQuery.refetch() },
  });


  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key.toLowerCase();

      if (key === 'r') {
        console.log('Reply to selected message.');
      }
      else if (key === '/') {
        event.preventDefault();
        inputRef.current.focus()
        console.log('Focus message input.');
      }
      else if (event.ctrlKey && key === 'i') {
        console.log('Open image send dialog.');
      }
      else if (event.ctrlKey && key === 'f') {
        event.preventDefault();
        console.log('Focus searchbar.');
      }
      else if (key === 'escape') {
        setSelectedUser(null)
        console.log('Clear selected user.');
      }
      else if (event.ctrlKey && key === 'd') {
        console.log('Delete mode activated! Press 1, 2, or 3...');
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown); // Cleanup!
    };
  }, [])

  useEffect(() => {
    if (io.current) {
      io.current.on('message_receive', (data) => {
        setMessageIntoExistingMessage(data.text, data.sid)
        setLastMessage(new Date(data.send_at).toISOString())
        dummy.current.scrollIntoView({ behaviour: "smooth" });
      })
    }

    document.addEventListener('keydown', function (event) {
      if (event.ctrlKey && event.key === 'c' && event.key === 'i') {
        console.log('Ctrl + S was pressed!');
      }
    });

    return () => {
      io.current.off('message_receive');
    }
  }, [])

  useEffect(() => {
    setMessages([]);

    if (
      selectedUser &&
      !getLoggedUserAndSelectedUserMessagesQuery.isLoading &&
      Array.isArray(getLoggedUserAndSelectedUserMessagesQuery.data
      )) {
      setMessages(getLoggedUserAndSelectedUserMessagesQuery.data);
    }
    else {
      setMessages([]);
    }

    dummy.current.scrollIntoView({ behaviour: "smooth" });
  }, [
    loggedUid,
    selectedUser.uid,
    getLoggedUserAndSelectedUserMessagesQuery.isLoading,
    getLoggedUserAndSelectedUserMessagesQuery.data
  ]);


  const updateUserListPosition = () => {
    setUsers((prev) => {
      const index = prev.findIndex(user => user.uid === selectedUser.uid);

      const updated = [...prev];
      const [selected] = updated.splice(index, 1);
      return [selected, ...updated];
    })
  }

  const setMessageIntoExistingMessage = (text, senderId) => {
    setMessages((prev) => {
      const newMessage = {
        sender: senderId,
        text: text,
      }

      return [...prev, newMessage]
    })
  }

  const handleImageSelection = (event) => {
    const file = event.target.files[0]
    console.log(file, event)
    if (file) {
      const filereader = new FileReader()
      filereader.onload = (data) => {
        setimagePreview(filereader.result)
        if (imageSendRef.current) {
          imageSendRef.current.focus()
        }
      }
      filereader.readAsDataURL(file)
    }
  }

  const handleDialogToggling = () => {
    if (!open) {
      setOpen(false)
      setimagePreview(null);
    }
  }

  const sendSelectedImage = () => {
    const option = {
      type: 'image',
      data: imagePreview,
      sender: loggedUid,
    }
    setMessages(prev => ([...prev, option]))
  }

  return (
    <>

      < div className="px-2 pt-5 flex-grow flex flex-col gap-2 pb-5 relative overflow-y-scroll scroll-smooth">
        {
          messages.length == 0 ?
            <>
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" width={150} height={150}
                className="mx-auto flex items-center justify-center"
              />
            </>
            :
            Array.isArray(messages)
            && messages.length > 0
            && messages.map((message, index) => {
              let avatar = null;
              let username = null;

              if (message.sender == selectedUser.uid) {
                avatar = message?.senderData?.profile_pic;
                username = message?.senderData?.username;
              }
              else {
                avatar = message?.senderData?.profile_pic;
                username = "You";
              }

              if (message.type == 'image') {
                return (
                  <div className="flex" >
                    <div className={`${message.sender == loggedUid ? 'ms-auto' : ''}`} >
                      <Dialog >
                        <DialogTrigger >
                          <div className="border p-2 max-w-[300px] rounded-md shadow flex flex-col ">
                            <img
                              src={message.data}
                              alt="Full Preview"
                              className="w-full max-h-[300px] object-contain rounded-md"
                            />
                            {
                              message.text &&
                              <Label className="mt-2 leading-relaxed">Ayush ye dekho aaj hm ye Ayush ye dekho aaj hm ye Ayush ye dekho aaj hm ye Ayush ye dekho aaj hm ye Ayush ye dekho aaj hm ye  </Label>
                            }
                          </div>
                        </DialogTrigger>
                        <DialogContent >
                          <img
                            src={message.data}
                            alt="Full Preview"
                            className="w-full object-contain rounded-md"
                          />
                          {/* <p>Ayush sharma is geate </p> */}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                )
              }
              else {
                return (
                  < MessageBox
                    key={message?.mid}
                    text={message.text}
                    selectedUser={selectedUser}
                    avatar={avatar}
                    username={username} />
                )
              }
            })

        }
        <div className="border p-2 max-w-[300px] rounded-md shadow flex flex-col ">
          <img
            src={"https://placehold.co/5000x3000"}
            alt="Full Preview"
            className="w-full max-h-[300px] object-contain rounded-md"
          />
          <Label className="mt-2 leading-relaxed">Ayush ye dekho aaj hm ye Ayush ye dekho aaj hm ye Ayush ye dekho aaj hm ye Ayush ye dekho aaj hm ye Ayush ye dekho aaj hm ye  </Label>
        </div>

        {/* dummy extra box */}
        <div ref={dummy} className="flex-shrink-0 h-[100px]"></div>
      </div >
      <div className='border p-2 flex gap-2'>
        <EmojiPopover />

        <Dialog onOpenChange={handleDialogToggling} >
          <DialogTrigger asChild >
            <Button variant="outline" >
              <ImagePlus className="h-5 w-5 text-gray-500" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[80vh] overflow-y-auto" >
            <DialogHeader>
              <DialogTitle>Send Image</DialogTitle>
              <DialogDescription>
                Choose an image to send in the chat.
              </DialogDescription>
            </DialogHeader>

            {
              imagePreview &&
              <img
                src={imagePreview}
                alt="Selected Preview"
                className="w-full max-h-[400px] rounded-md object-contain"
              />
            }

            {
              !imagePreview &&
              <label className="border-2 border-dashed border-gray-300 rounded-md w-full h-[100px] flex items-center justify-center cursor-pointer hover:bg-gray-100 duration-200 transition-all">
                <span className="text-gray-600">Click/Paste image</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageSelection}
                />
              </label>
            }
            <DialogFooter>
              <DialogClose>
                <Button variant="ghost" >
                  {/* <Send className='h-4 w-4 text-gray-300' /> */}
                  <Label className='ms-2'>Clear</Label>
                </Button>
                {
                  imagePreview &&
                  <Button ref={imageSendRef} onClick={sendSelectedImage} >
                    <Send className='h-4 w-4 text-gray-300' />
                    <Label className='ms-2'>Send</Label>
                  </Button>
                }
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Input
          ref={inputRef}
          type="text"
          className="rounded"
          placeholder="Type your message here..."
          value={inputFieldText}
          onChange={(e) => setInputFieldText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              let send_at = Date.now()

              // if (io.current) {
              io.current.emit("message_send", {
                sid: loggedUid,
                rid: selectedUser.uid,
                text: inputFieldText,
                send_at: send_at,
                is_read: "unread"
              })
              // }

              handleSendMessageFromLoggedToSelectedUserMutation.mutate({
                loggedUid,
                text: inputFieldText,
                selectedUid: selectedUser.uid,
                send_at,
              });

              setMessageIntoExistingMessage(inputFieldText, loggedUid)
              setInputFieldText("");
              dummy.current.scrollIntoView({ behaviour: "smooth" });
              updateUserListPosition()
            }
          }}
        />
        <Button className="rounded-md w-fit" size="">
          <Send className='h-4 w-4 text-gray-300' />
          <Label className='ms-2'>Send</Label>
        </Button>
      </div>

    </>
  )
}

export default MessagesCompo;