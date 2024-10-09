import fs from "fs";
import path from "path";
import { faker } from "@faker-js/faker";

// Example status values you might want to randomize
const statuses = ["Active", "Inactive"];

const tasks = Array.from({ length: 100 }, () => ({
  id: faker.string.uuid(),
  bn_id: `BN${faker.string.alphanumeric(8)}`, // Generate something like BNxxxxxxx
  address: faker.finance.ethereumAddress(),
  date_time: faker.date.future().toLocaleString(), // Generate a future date and format it
  directTeam: faker.number.int({ min: 1, max: 50 }), // Generate a random number for directTeam
  totalTeam: faker.number.int({ min: 10, max: 100 }), // Generate a random number for totalTeam
  status: faker.helpers.arrayElement(statuses), // Randomly select between "Active" and "Inactive"
}));

fs.writeFileSync(
  path.join(__dirname, "tasks.json"),
  JSON.stringify(tasks, null, 2)
);

console.log("✅ Tasks data generated.");
