import { Reader, type ReaderProps } from "@omuso/react-reader";
import { context } from "omuso";
import en from "../.content/en.md" with { type: "text" };
import ru from "../.content/ru.md" with { type: "text" };

import "./index.css";

const config = {
	context: context.init({
		markdowns: { en, ru },
		defaultLanguage: "en",
	}),
	language: "en",
	basePath: "/The_Pathway_of_Life",
} as ReaderProps;

export function App() {
	return <Reader {...config} />;
}

export default App;
