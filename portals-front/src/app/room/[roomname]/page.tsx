"use client";
import { useEffect, useRef, useState } from "react";
import React from "react";

//types : chat.newUserJoined, chat.userLeft, chat.message,

export default function Page({ params }: { params: { roomname: string } }) {
	console.log("Page");
	const [chatSocket, setChatSocket] = useState<WebSocket | null>(null);
	const inputref = useRef<HTMLInputElement>(null);
	const username = `test-user ${Math.random() * 100}`;
	useEffect(() => {
		let socket = new WebSocket(
			"ws://localhost:8000/ws/chat/" + params.roomname + "/"
		);
		socket.onopen = () => {
			console.log("Connected to chat room");
			socket.send(JSON.stringify({ username, type: "chat.newUserJoined" }));
		};
		socket.onmessage = (e) => {
			//generate react components from the message
			console.log("sent from server", e.data);
		};

		setChatSocket(socket);

		return () => {
			chatSocket?.close();
		};
	}, []);
	return (
		<div>
			<input ref={inputref} />
			<button
				onClick={() => {
					chatSocket?.send(
						JSON.stringify({ message: inputref.current?.value })
					);
					inputref.current!.value = "";
				}}
			>
				Send
			</button>
		</div>
	);
}
