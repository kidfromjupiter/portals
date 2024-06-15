"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import localFont from "next/font/local";
import { Button, Input } from "@nextui-org/react";
const LilyScriptOne = localFont({
	src: "../fonts/LilyScriptOne.ttf",
	display: "swap",
});
export default function Home() {
	const [username, setUsername] = useState<string>("");
	const [roomname, setRoomname] = useState<string>("");
	const router = useRouter();
	const handleConnect = () => {
		router.push(`/room/${roomname}`);
		localStorage.setItem("username", username);
	};
	return (
		<div className="h-screen w-full bg-slate-800 flex justify-center items-center">
			<div className="py-16 rounded-xl shadow-lg bg-slate-100  px-36 grid grid-flow-row justify-items-center items-center gap-5">
				<div className={`${LilyScriptOne.className} text-8xl text-orange-600`}>
					Portals
				</div>
				<div className="text-base  font-medium text-black">
					Connect with random people
				</div>
				<div className="grid grid-flow-row gap-2 py-5">
					<Input
						size={"lg"}
						label="Username"
						placeholder="Enter any username"
						variant="bordered"
						value={username}
						onValueChange={(e) => setUsername(e)}
						classNames={{
							label:
								"dark:text-orange-600 text-orange-600 group-data-[filled-within=true]:text-orange-600",
							input: "text-black",
						}}
					/>
					<Input
						size={"lg"}
						label="Room name"
						placeholder="Any room you want"
						variant="bordered"
						value={roomname}
						onValueChange={(e) => setRoomname(e)}
						classNames={{
							label:
								"dark:text-orange-600 text-orange-600 group-data-[filled-within=true]:text-orange-600",
							input: "text-black",
						}}
					/>
				</div>

				<Button
					color="primary"
					variant="shadow"
					className="bg-orange-600 shadow-orange-600/40"
					onClick={handleConnect}
				>
					Let&apos;s meet people
				</Button>
			</div>
		</div>
	);
}
