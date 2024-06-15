"use client";

export enum chatType {
	leave = "chat.leave",
	initial = "chat.initial",
	message = "chat.message",
}

export class chatMessage {
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
export class chatInitial {
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
