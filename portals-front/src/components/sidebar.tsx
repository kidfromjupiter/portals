"use client";
import Plus from "@/icons/Plus";
import { Button } from "@nextui-org/react";
import Room from "./Room";
import Downchevron from "@/icons/DownChevron";
import localFont from "next/font/local";
import { useEffect, useRef, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import Menu from "@/icons/Menu";
import { motion } from "framer-motion";
import CreateRoom from "./CreateRoom";
const LilyScriptOne = localFont({
	src: "../fonts/LilyScriptOne.ttf",
	display: "swap",
});

export default function Sidebar() {
	const [recent_rooms, setRecentRooms] = useState<string[] | null>(null);
	const ref = useRef<HTMLDivElement>(null);
	const params = useParams();
	const [newRoomModal, setNewRoomModal] = useState<boolean>(false);
	useEffect(() => {
		if (localStorage) {
			console.log(localStorage.getItem("recentRoom") || "[]");

			setRecentRooms(JSON.parse(localStorage.getItem("recentRoom") || "[]"));
		}
	}, []);

	return (
		<>
			<div
				className="absolute md:relative grid grid-rows-[90%_10%] h-screen border-r-slate-200 border-1 z-30 translate-x-[-300px] md:translate-x-0 bg-slate-50  min-w-[80vw] md:min-w-0 shadow-2xl md:shadow-none transition-all ease-in-out duration-300"
				ref={ref}
			>
				<div className=" w-full pt-5 flex-col h-full flex">
					<div className="flex justify-between w-full px-3 items-center md:items-start ">
						<div className="text-orange-600 text-3xl font-medium md:pb-3 mx-auto md:mx-0">
							Recent Rooms
						</div>
						<Plus
							className="fill-slate-100 stroke-orange-600 rotate-45 md:hidden block"
							height={45}
							width={45}
							onClick={() => {
								ref.current?.classList.toggle("translate-x-[-300px]");
							}}
						/>
						<Button
							isIconOnly
							aria-label="Like"
							className="bg-orange-600 hidden md:flex"
							variant="shadow"
							onClick={() => {
								setNewRoomModal(true);
							}}
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
					<Button
						isIconOnly
						aria-label="Like"
						className="bg-orange-600 md:hidden flex mx-auto mt-5 self-end"
						variant="shadow"
						onClick={() => {
							setNewRoomModal(true);
						}}
						size="lg"
					>
						<Plus
							className="fill-slate-100 stroke-slate-100"
							height={30}
							width={30}
						/>
					</Button>
				</div>
				<div className="flex flex-col items-center justify-evenly bg-slate-100">
					<div className="text-black">Logged in as: manMan</div>
					<div className={`${LilyScriptOne.className} text-xl text-orange-600`}>
						Portals
					</div>
				</div>
			</div>
			<Menu
				className="md:hidden block stroke-orange-600 absolute top-4 left-0 z-20"
				height={35}
				width={35}
				onClick={() => {
					ref.current?.classList.toggle("translate-x-[-300px]");
				}}
			/>
			{newRoomModal && (
				<CreateRoom removeModal={() => setNewRoomModal(false)} />
			)}
		</>
	);
}
