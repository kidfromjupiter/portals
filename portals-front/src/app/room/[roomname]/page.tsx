"use client";
import ChatBubble from "@/components/ChatBubble";
import Send from "@/icons/Send";
import { Button, Input } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import React from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
//types : chat.newUserJoined, chat.userLeft, chat.message,
export enum chatType {
	leave = "chat.leave",
	initial = "chat.initial",
	message = "chat.message",
}

class chatMessage {
	type: chatType;
	message?: string;
	username: string;
	constructor(message: string, username: string) {
		this.type = chatType.message;
		this.message = message;
		this.username = username;
	}
	toJSON() {
		return JSON.stringify({
			type: this.type,
			message: this.message,
			username: this.username,
		});
	}
}
class chatUserLeft {
	type: chatType;
	username: string;
	constructor(username: string) {
		this.type = chatType.leave;
		this.username = username;
	}
	toJSON() {
		return JSON.stringify({
			type: this.type,
			username: this.username,
		});
	}
}

class chatInitial {
	type: chatType;
	username: string;
	constructor(username: string) {
		this.type = chatType.initial;
		this.username = username;
	}
	toJSON() {
		return JSON.stringify({
			type: this.type,
			username: this.username,
		});
	}
}
export default function Page({ params }: { params: { roomname: string } }) {
	const [chatSocket, setChatSocket] = useState<WebSocket | null>(null);
	const [username, setUsername] = useState<string | null>("");
	const [messages, setMessages] = useState<
		{ type: chatType; message?: string; username: string }[]
	>([]);
	const [inputValue, setInputValue] = useState<string>("");
	const updateMessages = (data: any) => {
		setMessages([...messages, data]);
	};
	const { sendMessage, lastMessage, readyState } = useWebSocket(
		"ws://localhost:8000/ws/chat/" + params.roomname + "/",
		{
			onOpen: () => {
				//@ts-ignore
				sendMessage(new chatInitial(username).toJSON());
			},
			onMessage: (e) => {
				let data = JSON.parse(e.data);
				console.log(data);

				updateMessages(data);
				// if (data.type === "chat.message") {
				// }
			},
		}
	);
	useEffect(() => {
		if (localStorage) {
			setUsername(localStorage.getItem("username"));
		}
	}, []);
	return (
		<div className="grid grid-rows-[10%_auto_10%] h-screen">
			<div id="header" className="p-3 border-b-slate-200 border-1">
				<div className="flex justify-between pb-1">
					<div className="text-black text-2xl font-medium">Test room</div>
					<div className="flex justify-between items-center">
						<div className="w-3 rounded-full h-3 bg-emerald-400 mr-1"></div>
						<div className="text-base text-slate-400">{10} online</div>
					</div>
				</div>
				<div className="text-base text-slate-500">Jen is typing...</div>
			</div>
			<motion.div
				id="messageArea"
				layout
				className="overflow-auto p-3 flex flex-col"
			>
				{messages.map((message, index) => (
					<ChatBubble message={message} index={index} username={username} />
				))}
			</motion.div>
			<div
				id="footer"
				className="flex items-center border-t-slate-200 border-1 p-5"
			>
				<Input
					variant="bordered"
					placeholder="Type here"
					value={inputValue}
					onValueChange={(e) => setInputValue(e)}
					className="text-black"
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							sendMessage(
								//@ts-ignore
								new chatMessage(inputValue, username).toJSON()
							);
							setInputValue("");
						}
					}}
				/>
				<Button
					isIconOnly
					aria-label="Like"
					className="bg-orange-600 ml-5"
					variant="shadow"
					onClick={() => {
						sendMessage(
							//@ts-ignore
							new chatMessage(inputValue, username).toJSON()
						);
						setInputValue("");
					}}
				>
					<Send className=" stroke-white fill-transparent m-2" />
				</Button>
			</div>
		</div>
	);
}
