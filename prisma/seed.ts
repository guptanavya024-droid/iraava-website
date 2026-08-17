import "dotenv/config";
import { hash } from "bcryptjs";
import { db } from "../src/lib/db";

async function seedAdminUser() {
  const email = process.env.ADMIN_EMAIL?.toLowerCase().trim();
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) {
    console.log("ADMIN_EMAIL/ADMIN_PASSWORD not set — skipping admin user seed.");
    return;
  }

  const passwordHash = await hash(password, 12);
  await db.adminUser.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash },
  });
  console.log(`Admin user ready: ${email}`);
}

async function main() {
  await seedAdminUser();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
