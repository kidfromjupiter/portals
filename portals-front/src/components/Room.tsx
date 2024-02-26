export default function Room({
	roomName,
	lastMessage,
	onlineCount,
}: {
	roomName: string;
	lastMessage: string;
	onlineCount: number;
}) {
	return (
		<div className="flex flex-col">
			<div className="flex justify-between pb-1">
				<div className="text-black text-xl font-medium">{roomName}</div>
				<div className="flex justify-between items-center">
					<div className="w-3 rounded-full h-3 bg-emerald-400 mr-1"></div>
					<div className="text-base text-slate-400">{onlineCount} online</div>
				</div>
			</div>
			<div className="text-base text-slate-500">{lastMessage}</div>
		</div>
	);
}
