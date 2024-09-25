import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function Forgetpassword() {
    return (
        <div className="w-full h-fit border flex justify-center border-stone-400 bg-white">
            <form className="p-5 max-w-lg flex flex-col items-center gap-5">
                <Label className="text-3xl text-center font-bold uppercase">Forget Password.</Label>
                <Input type="text" id="username" placeholder="username" className="bg-stone-100 border-blue-200" />
                <Input type="text" id="password" placeholder="password" className="bg-stone-100 border-blue-200" />
                {/* <Label className="-my-2 text-sm">Forget password</Label> */}
                <Button type="submit" className="rounded-none">Change password</Button>
            </form>
        </div>
    )
}