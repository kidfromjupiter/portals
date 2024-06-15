import React from "react";

function Menu(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 24 24">
			<path
				stroke="inherit"
				strokeLinecap="round"
				strokeWidth="1.5"
				d="M20 7H4M20 12H4M20 17H4"
			></path>
		</svg>
	);
}

export default Menu;
