import bcrypt from "bcryptjs";

const hashedPassword = "$2b$10$yxmTEMonXxoWH2He1YE7H.yMRQYvfdFS68fOGjFPgFf0YVAzwwX2e"; // DB se
const inputPassword = "12345";

const run = async () => {
  const match = await bcrypt.compare(inputPassword, hashedPassword);
  console.log("Test match result:", match);
};

run();