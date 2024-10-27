import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link2Icon } from "lucide-react";
import Link from "next/link";

export default function Aboutus() {
 return (
  <div className="w-full h-full flex flex-col">
   <Navbar />
   <div className="pattern-cross-dots-lg w-full h-full px-10 md:px-0 flex justify-center items-center">
    <Card className="max-w-[600px] h-fit flex-grow shadow-md">
     <CardHeader>
      <CardTitle>About this project</CardTitle>
      <CardDescription>
       This is our major project: A <b>Chat Application</b> for Vikrant Institute of Technology and Management.
      </CardDescription>
      <CardContent className="p-0 pt-3 px-3">
       <div className="flex flex-col items-start gap-2">

        <Button className="w-full">
         <Link href={""}>Frontend</Link>
         <Link2Icon className="w-5 h-5 ml-2" />
        </Button>
        <Button className="w-full">
         <Link href={""}>Backend</Link>
         <Link2Icon className="w-5 h-5 ml-2" />
        </Button>

       </div>
      </CardContent>
     </CardHeader>
    </Card>
   </div>
  </div >
 )
}