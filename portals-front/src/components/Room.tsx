import { useRouter } from "next/navigation";

export default function Room({
	roomName,
	selected,
}: {
	roomName: string;
	selected: boolean;
}) {
	const router = useRouter();
	return (
		<div
			className={`flex flex-col cursor-pointer hover:bg-slate-300 ${
				selected ? "bg-slate-200" : ""
			}`}
			onClick={() => {
				router.push(`/room/${roomName}`);
			}}
		>
			<div className="flex justify-between py-3 items-center px-2">
				<div className="text-black text-xl font-medium">{roomName}</div>
				{/* <div className="flex justify-between items-center">
					<div className="w-3 rounded-full h-3 bg-emerald-400 mr-1"></div>
					<div className="text-base text-slate-400">{onlineCount} online</div>
				</div> */}
			</div>
			{/* <div className="text-base text-slate-500">{lastMessage}</div> */}
		</div>
	);
}
