import { Reader, type ReaderProps } from "@omuso/react-reader";
import { createContext } from "omuso";
import en from "../.content/en.md" with { type: "text" };
import ru from "../.content/ru.md" with { type: "text" };

import "./index.css";

const config = {
	context: createContext().init({
		markdowns: { en, ru },
		slugStyle: "wiki",
	}),
	language: "en",
	basePath: "/The_Pathway_of_Life",
} as ReaderProps;

export function App() {
	return <Reader {...config} />;
}

export default App;
