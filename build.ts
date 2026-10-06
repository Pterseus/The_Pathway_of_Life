import tailwind from "bun-plugin-tailwind";

const result = await Bun.build({
	entrypoints: ["./src/index.html"],
	outdir: "dist",
	sourcemap: "linked",
	target: "browser",
	minify: true,
	publicPath: "/The_Pathway_of_Life/",
	define: {
		"process.env.NODE_ENV": JSON.stringify("production"),
	},
	env: "BUN_PUBLIC_*",
	plugins: [tailwind],
});

if (!result.success) {
	for (const log of result.logs) console.error(log);
	process.exit(1);
}
