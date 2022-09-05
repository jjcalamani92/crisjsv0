import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useReducer } from "react";
import { Site } from "../../interfaces";
import { UiContext, uiReducer } from "./";

export interface UiState {
	isMenuOpen: boolean;
	isSearchOpen: boolean;
	isCartOpen: boolean;
	
}
const client = [
	{
		_id: "123456",
		title: "piccoletti",
		logo: "https://res.cloudinary.com/dvcyhn0lj/image/upload/v1647095547/piccoletti-logo_j6hxbw.jpg",	
	},
	{
		_id: "1234567",
		title: "hardware",
		logo: "https://res.cloudinary.com/dvcyhn0lj/image/upload/v1647095547/piccoletti-logo_j6hxbw.jpg",	
	},
	{
		_id: "1234568",
		title: "corales",
		logo: "https://res.cloudinary.com/dvcyhn0lj/image/upload/v1647095547/piccoletti-logo_j6hxbw.jpg",	
	}
]

const data = {
	title: "Piccoletti",
	logo: "https://res.cloudinary.com/dvcyhn0lj/image/upload/v1656384574/React-jj/blogs/Screenshot_2_m0jqqs.png",
}
const UI_INITIAL_STATE: UiState = {
	isMenuOpen: false,
	isSearchOpen: false,
	isCartOpen: false,
	
};

export const UiProvider = ({ children }: React.PropsWithChildren<{}>) => {
	const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);
	
	// useEffect(() => {
	//   fetch('http://localhost:8000/api/robots')
	//     .then(res => res.json())
	//     .then(data => {
	//       dispatch({
	// 				type: '[UI] - initialSite',
	//         payload: {
	//           ...UI_INITIAL_STATE,
	//           sites: data?.data,
	//         }
	//       });
	//     });
	// }, []);


	const toggleSideMenu = () => {
		dispatch({ type: "[UI] - ToggleMenu" });
	};
	const toggleSideSearch = () => {
		dispatch({ type: "[UI] - ToggleSearch" });
	};
	const toggleSideCart = () => {
		dispatch({ type: "[UI] - ToggleCart" });
	};

	return (
		<UiContext.Provider
			value={{
				...state,

				// Methods
				toggleSideMenu,
				toggleSideSearch,
				toggleSideCart,

			}}
		>
			{children}
		</UiContext.Provider>
	);
};
