const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'backend', 'data');
const ADMINS_FILE = path.join(DATA_DIR, 'admins.json');

console.log('--- Debug Auth Script ---');
console.log('Resolving path:', ADMINS_FILE);

if (!fs.existsSync(ADMINS_FILE)) {
    console.error('ERROR: File does not exist!');
    process.exit(1);
} else {
    console.log('SUCCESS: File exists.');
}

try {
    const rawData = fs.readFileSync(ADMINS_FILE, 'utf8');
    console.log('Raw File Content:', rawData);

    const admins = JSON.parse(rawData);
    console.log('Parsed Data:', JSON.stringify(admins, null, 2));

    const testUser = 'admin';
    const testPass = 'password123';

    const admin = admins.find(a => a.username === testUser && a.password === testPass);

    if (admin) {
        console.log('SUCCESS: Credentials matched!');
    } else {
        console.log('FAILURE: Credentials did NOT match.');
        console.log('Comparing against:', { testUser, testPass });
        admins.forEach((a, i) => {
            console.log(`Entry ${i}: username '${a.username}' (${a.username.length}), password '${a.password}' (${a.password.length})`);
            console.log(`Match Username: ${a.username === testUser}`);
            console.log(`Match Password: ${a.password === testPass}`);
        });
    }

} catch (e) {
    console.error('ERROR: Exception during read/parse:', e);
}
