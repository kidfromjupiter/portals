"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function Home() {
	const inputRef = useRef<HTMLInputElement>(null);
	const router = useRouter();
	return (
		<div className="h-full w-full">
			<input ref={inputRef} />
			<button onClick={() => router.push(`/room/${inputRef.current?.value}`)}>
				go to room
			</button>
		</div>
	);
}
