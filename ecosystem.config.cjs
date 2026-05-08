module.exports = {
	apps: [
		{
			name: "cbt-rsms-backend",
			script: "./backend/src/app.js",
			node_args: "--experimental-vm-modules",
			instances: "max", // Gunakan semua CPU core
			exec_mode: "cluster", // Cluster mode untuk ribuan user
			watch: false,
			max_memory_restart: "512M",
			env: {
				NODE_ENV: "production",
				PORT: 3000,
			},
		},
	],
};
