"use client";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateRoom({
	removeModal,
}: {
	removeModal: () => void;
}) {
	const [roomName, setRoomName] = useState<string>("");
	const [error, setError] = useState<boolean>(false);
	const router = useRouter();
	const createRoom = () => {
		const recent = JSON.parse(localStorage.getItem("recentRoom") || "[]");
		if (recent.includes(roomName)) {
			return;
		}
		recent.push(roomName);
		localStorage.setItem("recentRoom", JSON.stringify(recent));
		router.push(`/room/${roomName}`);
		removeModal();
	};
	return (
		<div
			className="absolute top-0 right-0 bottom-0 left-0 w-screen h-screen flex justify-center items-center z-40"
			style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
			onClick={removeModal}
		>
			<div className="rounded-xl shadow-xl bg-slate-100 z-50 flex  flex-col px-8 py-5">
				<div className="text-3xl font-semibold text-black pb-5">
					Create new room
				</div>
				<div>
					<Input
						variant="bordered"
						placeholder="Enter room name"
						value={roomName}
						onValueChange={(e) => setRoomName(e)}
						onClick={(e) => e.stopPropagation()}
						classNames={{
							label:
								"dark:text-orange-600 text-orange-600 group-data-[filled-within=true]:text-orange-600 ",
							input: "text-black",
							inputWrapper: "mb-5",
						}}
						label="Room name"
					/>
				</div>
				<div className="flex justify-center">
					<Button
						variant="shadow"
						startContent={<div>Create</div>}
						className="bg-orange-600 text-white"
						onClick={() => createRoom()}
					/>
				</div>
			</div>
		</div>
	);
}
