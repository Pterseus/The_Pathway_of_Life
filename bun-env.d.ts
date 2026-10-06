declare module "*.svg" {
	const path: `${string}.svg`;
	export = path;
}

declare module "*.md" {
	const text: string;
	export default text;
}

declare module "*.css" {}

declare module "*.module.css" {
	const classes: { readonly [key: string]: string };
	export = classes;
}
