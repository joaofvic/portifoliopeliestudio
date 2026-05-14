import bcrypt from 'bcryptjs';

const pwd = process.argv[2];
if (!pwd) {
  console.error('Usage: tsx scripts/hash-password.ts <password>');
  process.exit(1);
}

bcrypt.hash(pwd, 10).then((hash) => {
  const b64 = Buffer.from(hash).toString('base64');
  console.log('\nCole no .env.local:');
  console.log(`ADMIN_PASSWORD_HASH_B64=${b64}\n`);
});
