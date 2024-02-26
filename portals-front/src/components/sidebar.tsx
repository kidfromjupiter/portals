import Plus from "@/icons/Plus";
import { Button } from "@nextui-org/react";
import Room from "./Room";
import Downchevron from "@/icons/DownChevron";
import localFont from "next/font/local";
const LilyScriptOne = localFont({
	src: "../fonts/LilyScriptOne.ttf",
	display: "swap",
});

export default function Sidebar() {
	return (
		<div className="grid grid-rows-[50%_40%_10%] h-screen border-r-slate-200 border-1 z-50">
			<div className=" w-full px-3 pt-5 flex-col h-full flex">
				<div className="flex justify-between w-full  ">
					<div className="text-orange-600 text-3xl font-medium pb-3">
						Your Rooms
					</div>
					<Button
						isIconOnly
						aria-label="Like"
						className="bg-orange-600"
						variant="shadow"
					>
						<Plus
							className="fill-slate-100 stroke-slate-100"
							height={20}
							width={20}
						/>
					</Button>
				</div>
				<div className="grid grid-flow-row gap-5 overflow-auto ">
					{Array.from({ length: 10 }).map((_, i) => (
						<Room
							roomName={`test Room ${i}`}
							lastMessage="Jen: Let's meet up tomorrow"
							onlineCount={100}
						/>
					))}
				</div>
			</div>
			<div className=" w-full px-3  flex-col h-full bg-slate-50 flex border-t-slate-200 border-1">
				<div className="flex justify-between w-full py-3 ">
					<div className="text-orange-600 text-3xl font-medium">
						Popular rooms
					</div>
					<Button
						isIconOnly
						aria-label="Like"
						className="bg-orange-600"
						variant="shadow"
					>
						<Downchevron
							className="fill-slate-100 stroke-slate-100"
							height={20}
							width={20}
						/>
					</Button>
				</div>
				<div className="grid grid-flow-row gap-5  overflow-auto ">
					{Array.from({ length: 10 }).map((_, i) => (
						<Room
							roomName={`test Room ${i}`}
							lastMessage="Jen: Let's meet up tomorrow"
							onlineCount={100}
						/>
					))}
				</div>
			</div>
			<div className="flex flex-col items-center justify-evenly bg-slate-100">
				<div className="text-black">Logged in as: manMan</div>
				<div className={`${LilyScriptOne.className} text-xl text-orange-600`}>
					Portals
				</div>
			</div>
		</div>
	);
}
