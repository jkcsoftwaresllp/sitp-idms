import { defineConfig } from 'drizzle-kit';

// @ts-ignore
export default defineConfig({
	schema: './src/shared/database/schema/index.js',
	out: './src/shared/database/migrations/',
	dialect: 'mysql',
	dbCredentials: {
	  host: process.env.DB_HOST,
	  user: process.env.DB_USER,
	  port: process.env.DB_PORT,
	  password: process.env.DB_PASSWORD,
	  database: process.env.DB_NAME,
	},
  });
