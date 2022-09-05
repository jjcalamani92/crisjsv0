import { createContext } from "react";
import { Site } from "../../interfaces";

interface ContextProps {
	isMenuOpen: boolean;
	isSearchOpen: boolean;
	isCartOpen: boolean;
	// Methods
	toggleSideMenu: () => void;
	toggleSideSearch: () => void;
	toggleSideCart: () => void;
}
export const UiContext = createContext({} as ContextProps);
