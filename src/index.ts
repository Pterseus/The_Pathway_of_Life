import { networkInterfaces } from "node:os";
import { serve } from "bun";
import index from "./index.html";

function getLocalIPv4() {
	const nets = networkInterfaces();

	for (const netInterface of Object.values(nets)) {
		if (!netInterface) continue;

		for (const net of netInterface) {
			if (net.family === "IPv4" && !net.internal) {
				return net.address;
			}
		}
	}

	return null;
}

const server = serve({
	hostname: "0.0.0.0",
	routes: {
		"/*": index,
	},

	development: process.env.NODE_ENV !== "production" && {
		hmr: true,
		console: true,
	},
});

const localIP = getLocalIPv4();

console.log(`🚀 Server running at ${server.url}`);
if (localIP) {
	console.log(`📱 Local network URL: http://${localIP}:${server.port}`);
} else {
	console.log("⚠️ Could not determine local network IP.");
}
