import Sidebar from "@/components/sidebar";

export default function layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="grid md:grid-cols-[0.25fr_0.75fr] min-h-screen bg-slate-50">
			<div className="absolute md:relative">
				<Sidebar />
			</div>
			<div className="">{children}</div>
		</div>
	);
}
