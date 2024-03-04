"use client";
import ChatBubble from "@/components/ChatBubble";
import Send from "@/icons/Send";
import { Button, Input } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import React from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { chatInitial, chatMessage, chatType } from "../../../components/types";
//types : chat.newUserJoined, chat.userLeft, chat.message,

export default function Page({ params }: { params: { roomname: string } }) {
	const [username, setUsername] = useState<string | null>("");
	const [messages, setMessages] = useState<
		{ type: chatType; message?: string; username: string }[]
	>([]);
	const [inputValue, setInputValue] = useState<string>("");
	const updateMessages = (data: any) => {
		setMessages([...messages, data]);
	};
	const [onlineCount, setOnlineCount] = useState<number>(0);
	const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout>();
	const [currentlyTyping, setCurrentlyTyping] = useState<string | null>("");
	const { sendMessage, lastMessage, readyState } = useWebSocket(
		"ws://localhost:8000/ws/chat/" + params.roomname + "/",
		{
			onOpen: () => {
				//@ts-ignore
				sendMessage(new chatInitial(username).toJSON());
			},
			onMessage: (e) => {
				let data = JSON.parse(e.data);
				if (data.type == "context.onlinecount") {
					setOnlineCount(data.count);
					return null;
				}
				if (data.type == "context.starttyping" && data.username != username) {
					setCurrentlyTyping(data.username);
					return null;
				}
				if (data.type == "context.stoptyping") {
					setCurrentlyTyping(null);
					return null;
				}
				updateMessages(data);
				// if type is context.joinedrooms
			},
		}
	);
	useEffect(() => {
		if (localStorage) {
			setUsername(localStorage.getItem("username"));

			//set recent room in localstorage
			const recent = JSON.parse(localStorage.getItem("recentRoom") || "[]");
			if (recent.includes(params.roomname)) {
				return;
			}
			recent.push(params.roomname);
			localStorage.setItem("recentRoom", JSON.stringify(recent));
		}
	}, []);
	useEffect(() => {
		if (readyState === ReadyState.OPEN) {
			//@ts-ignore
			sendMessage(JSON.stringify({ type: "context.onlinecount" }));
		}
	}, [readyState]);
	return (
		<div className="grid grid-rows-[10%_auto_10%] h-screen">
			<div id="header" className="p-3 border-b-slate-200 border-1">
				<div className="flex justify-between pb-1">
					<div className="text-black text-2xl font-medium ml-8 md:ml-0">
						{params.roomname}
					</div>
					<div className="flex justify-between items-center">
						<div className="w-3 rounded-full h-3 bg-emerald-400 mr-1"></div>
						<div className="text-base text-slate-400">{onlineCount} online</div>
					</div>
				</div>
				<div className="text-base text-slate-500">
					{currentlyTyping ? `${currentlyTyping} is typing...` : ""}
				</div>
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
					onChange={() => {}}
					onKeyDown={(e) => {
						sendMessage(
							JSON.stringify({
								type: "context.starttyping",
								username: username,
							})
						);
						if (typingTimeout) clearTimeout(typingTimeout);
						if (e.key === "Enter") {
							sendMessage(
								//@ts-ignore
								new chatMessage(inputValue, username).toJSON()
							);
							setInputValue("");
						}
					}}
					onKeyUp={() => {
						setTypingTimeout(
							setTimeout(() => {
								sendMessage(
									JSON.stringify({
										type: "context.stoptyping",
										username: username,
									})
								);
							}, 3000)
						);
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
