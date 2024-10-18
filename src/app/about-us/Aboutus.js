import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@radix-ui/react-hover-card";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";

export default function Aboutus() {
    return (
        <div className="w-full h-full flex flex-col">
            <Navbar />
            <div className="pattern-cross-dots-lg w-full h-full flex justify-center">
                <Card className="max-w-[600px] h-fit flex-grow">
                    <CardHeader>
                        <CardTitle>Team Members</CardTitle>
                        <CardDescription>Number of peoples who worked in this project!</CardDescription>
                        <CardContent className="p-0 pt-3">
                            <div className="grid grid-cols-2">
                                <HoverCard className="p-0 m-0">
                                    <HoverCardTrigger>
                                        <Button variant="link" className="p-0">@Ayush-may</Button>
                                    </HoverCardTrigger>
                                    <HoverCardContent>
                                        <Card className="mt-3">
                                            <CardHeader>
                                                <CardTitle>Ayush Sharma</CardTitle>
                                                <CardDescription>Frontend Designer</CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <div>
                                                    <Label>Github: </Label>
                                                    <Link href={"https://github.com/ayush-may"} target="_blank" className="text-blue-500">Ayush-may</Link>
                                                </div>
                                                <div>
                                                    <Label>Linkedin: </Label>
                                                    <Link href={"https://www.linkedin.com/in/ayush14may/"} className="text-blue-500">Ayush-may</Link>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </HoverCardContent>
                                </HoverCard>

                                <HoverCard className="ms-3">
                                    <HoverCardTrigger>
                                        <Button variant="link" className="p-0">@Vishal-pathak</Button>
                                    </HoverCardTrigger>
                                    <HoverCardContent>
                                        <Card className="mt-3">
                                            <CardHeader>
                                                <CardTitle>Vishal Pathak</CardTitle>
                                                <CardDescription>Backend Developer</CardDescription>
                                            </CardHeader>
                                        </Card>
                                    </HoverCardContent>
                                </HoverCard>
                            </div>
                        </CardContent>
                    </CardHeader>
                </Card>
            </div>
        </div>
    )
}