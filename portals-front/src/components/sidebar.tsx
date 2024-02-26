"use client";
import Plus from "@/icons/Plus";
import { Button } from "@nextui-org/react";
import Room from "./Room";
import Downchevron from "@/icons/DownChevron";
import localFont from "next/font/local";
import { useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";
const LilyScriptOne = localFont({
	src: "../fonts/LilyScriptOne.ttf",
	display: "swap",
});

export default function Sidebar() {
	const [recent_rooms, setRecentRooms] = useState<string[] | null>(null);
	const params = useParams();
	useEffect(() => {
		if (localStorage) {
			console.log(localStorage.getItem("recentRoom") || "[]");

			setRecentRooms(JSON.parse(localStorage.getItem("recentRoom") || "[]"));
		}
	}, []);

	return (
		<div className="grid grid-rows-[90%_10%] h-screen border-r-slate-200 border-1 z-50">
			<div className=" w-full pt-5 flex-col h-full flex">
				<div className="flex justify-between w-full px-3  ">
					<div className="text-orange-600 text-3xl font-medium pb-3">
						Recent Rooms
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
				<div className="grid grid-flow-row overflow-auto  divide-y ">
					{recent_rooms?.map((roomname, i) => (
						<Room
							roomName={roomname}
							selected={roomname == params.roomname}
							key={roomname}
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
