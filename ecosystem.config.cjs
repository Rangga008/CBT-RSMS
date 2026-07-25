module.exports = {
	apps: [
		{
			name: "cbt-rsms-backend",
			script: "./backend/src/app.js",
			node_args: "--experimental-vm-modules",
			instances: 1,
			exec_mode: "fork",
			watch: false,
			max_memory_restart: "512M",
			env: {
				NODE_ENV: "production",
				PORT: 3000,
			},
		},
		{
			name: "bk-rsms-backend",
			script: "./backend-bk/src/app.js",
			node_args: "--experimental-vm-modules",
			instances: 1,
			exec_mode: "fork",
			watch: false,
			max_memory_restart: "256M",
			env: {
				NODE_ENV: "production",
				PORT: 3001,
			},
		},
	],
};
