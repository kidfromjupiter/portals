import { chatType } from "@/app/room/[roomname]/page";
import { motion } from "framer-motion";

export default function ChatBubble({
	message,
	index,
	username,
}: {
	message: { message?: string | undefined; username: string; type: chatType };
	index: number;
	username: string | null;
}) {
	if (message.type == chatType.initial) {
		return (
			<motion.div
				layout
				animate={{ opacity: 1, y: 0 }}
				initial={{ opacity: 0, y: -10, zIndex: 0 }}
				key={index}
				className="bg-amber-200 text-amber-800 self-center rounded-md px-5 py-1 my-1"
			>
				{`${message.username} joined the chat`}
			</motion.div>
		);
	} else if (message.type == chatType.leave) {
		return (
			<motion.div
				layout
				animate={{ opacity: 1, y: 0 }}
				initial={{ opacity: 0, y: -10, zIndex: 0 }}
				key={index}
				className="bg-red-200 text-red-700 self-center rounded-md px-5 py-1 my-1"
			>
				{`${message.username} left the chat`}
			</motion.div>
		);
	} else if (message.type == chatType.message) {
		return (
			<motion.div
				layout
				animate={{ opacity: 1, x: 0 }}
				initial={{
					opacity: 0,
					x: message.username == username ? 100 : -100,
					zIndex: 0,
				}}
				key={index}
				className={`bg-slate-800 rounded-xl p-3 max-w-[60%] ${
					message.username == username ? "self-end" : "self-start"
				} my-1`}
			>
				{message.username == username ? null : (
					<div className="font-bold text-sm text-white pb-1">
						{message.username}
					</div>
				)}

				<div className="text-white text-lg">{message?.message}</div>
			</motion.div>
		);
	}
}
