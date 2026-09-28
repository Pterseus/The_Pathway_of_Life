import { Reader } from "@omuso/react-reader";
import { context } from "omuso";
import en from "../.content/en.md" with { type: "text" };
import ru from "../.content/ru.md" with { type: "text" };

import "@omuso/react-reader/styles.css";
import "./index.css";

const ctx = context.init({
	markdowns: { en, ru },
	defaultLanguage: "en",
});

export function App() {
	return <Reader context={ctx} language="en" />;
}

export default App;
