import { Reader, type ReaderProps } from "@omuso/react-reader";
import { createContext } from "omuso";
import en from "../.content/en.md" with { type: "text" };
import ru from "../.content/ru.md" with { type: "text" };
import CustomContent from "./CustomContent";

import "./index.css";

const config = {
	context: createContext({
		markdowns: { en, ru },
		slugStyle: "wiki",
		maxNavigationDepth: 2,
	}),
	language: "en",
	basePath: "/The_Pathway_of_Life",
	contentComponent: CustomContent,
} satisfies ReaderProps;

export function App() {
	return <Reader {...config} />;
}

export default App;
