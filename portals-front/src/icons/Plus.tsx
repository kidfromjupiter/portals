import React from "react";

function Plus(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 24 24">
			<path
				stroke="inherit"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="M4 12h16m-8-8v16"
			></path>
		</svg>
	);
}

export default Plus;
