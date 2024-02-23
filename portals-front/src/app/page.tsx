"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import localFont from "next/font/local";
import { Button, Input } from "@nextui-org/react";
const LilyScriptOne = localFont({
	src: "fonts/LilyScriptOne.ttf",
	display: "swap",
});
export default function Home() {
	const inputRef = useRef<HTMLInputElement>(null);
	const router = useRouter();
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
						classNames={{
							label:
								"dark:text-orange-600 text-orange-600 group-data-[filled-within=true]:text-orange-600",
						}}
					/>
					<Input
						size={"lg"}
						label="Room name"
						placeholder="Any room you want"
						classNames={{
							label:
								"dark:text-orange-600 text-orange-600 group-data-[filled-within=true]:text-orange-600",
						}}
					/>
				</div>

				<Button
					color="primary"
					variant="shadow"
					className="bg-orange-600 shadow-orange-600/40"
				>
					Let&apos;s meet people
				</Button>
			</div>
		</div>
	);
}
