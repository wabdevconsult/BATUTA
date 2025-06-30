import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Check if .env file exists, if not create it from .env.example
const envPath = join(__dirname, '.env');
const envExamplePath = join(__dirname, '.env.example');

if (!fs.existsSync(envPath) && fs.existsSync(envExamplePath)) {
  console.log('Creating .env file from .env.example');
  fs.copyFileSync(envExamplePath, envPath);
}

// Start the backend server
const serverProcess = spawn('node', ['server.js'], {
  stdio: 'inherit',
  shell: true,
});

// Start the frontend development server
const clientProcess = spawn('npm', ['run', 'dev:frontend'], {
  stdio: 'inherit',
  shell: true,
});

// Handle process termination
const cleanup = () => {
  serverProcess.kill();
  clientProcess.kill();
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
process.on('exit', cleanup);

console.log('Development servers started. Press Ctrl+C to stop.');