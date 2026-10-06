import * as Reader from "@omuso/react-reader";
import type { ContentElement } from "omuso";
import { useEffect } from "react";

const PREV_ICON =
	"M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z";
const NEXT_ICON =
	"M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z";

function NavButton({
	section,
	label,
	icon,
}: {
	section?: ContentElement;
	label: string;
	icon: string;
}) {
	const svg = (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 20 20"
			fill="currentColor"
			className="size-4.5"
			aria-hidden="true"
		>
			<path fillRule="evenodd" d={icon} clipRule="evenodd" />
		</svg>
	);

	if (!section) return <span className="p-2 sm:p-1 opacity-30">{svg}</span>;

	return (
		<Reader.ReaderLink
			path={section.path}
			aria-label={label}
			className="p-2 sm:p-1 hover:bg-(--foreground)/2 active:bg-(--foreground)/8 rounded active:translate-y-px"
		>
			{svg}
		</Reader.ReaderLink>
	);
}

export default function CustomContent({
	context,
}: {
	context: Reader.ReaderContext;
}) {
	const { session, manifest, navigate } = context;
	const { currentSection, breadcrumbs, search } = session;
	const { tableOfContents } = manifest;
	const { content = [], depth } = currentSection ?? {};
	const [chapter, subchapter, cite] = breadcrumbs;

	const currentItem = tableOfContents
		.find((item) => item.path === chapter?.path)
		?.content.find((item) => item.path === subchapter?.path);

	const childrenSections =
		currentItem?.type === "section" ? currentItem.content : [];

	const redirectPath = !cite ? childrenSections[0]?.path : undefined;

	useEffect(() => {
		if (redirectPath) navigate({ path: redirectPath });
	}, [redirectPath, navigate]);

	if (redirectPath) return null;

	if (!depth || depth <= 2 || !subchapter) return <Reader.ReaderContent />;

	const index = childrenSections.findIndex((item) => item.path === cite?.path);

	return (
		<>
			<Reader.ReaderContentHeader
				query={search.query}
				breadcrumbs={breadcrumbs.slice(0, -1)}
			/>
			<div className="px-8 p-4 max-w-xl mx-auto text-center">
				{depth > 3 && (
					<Reader.ReaderHeading
						value={Reader.highlightMatches(subchapter.title, search.query)}
						depth={depth - 1}
					/>
				)}
				{cite && (
					<nav className="mb-8 text-xl flex gap-5 items-center justify-center">
						<NavButton
							section={childrenSections[index - 1]}
							label="Previous"
							icon={PREV_ICON}
						/>
						<span className="text-sm font-serif">{`${cite.title} / ${childrenSections.length}`}</span>
						<NavButton
							section={childrenSections[index + 1]}
							label="Next"
							icon={NEXT_ICON}
						/>
					</nav>
				)}
				{content.map((item: ContentElement) => {
					if (item.type === "paragraph")
						return (
							<Reader.ReaderParagraph
								key={item.path}
								id={item.path}
								value={Reader.highlightMatches(item.value, search.query)}
								className="text-sm"
							/>
						);
					return null;
				})}
			</div>
		</>
	);
}
