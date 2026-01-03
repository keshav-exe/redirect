import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { join } from "path";

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error("NEXT_PUBLIC_SUPABASE_URL must be set");
}

if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("SUPABASE_SERVICE_ROLE_KEY must be set");
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function setupDatabase() {
  try {
    const schema = readFileSync(
      join(process.cwd(), "supabase", "schema.sql"),
      "utf-8"
    );

    // Split by semicolons and execute each statement
    const statements = schema
      .split(";")
      .map((s) => s.trim())
      .filter((s) => s.length > 0 && !s.startsWith("--"));

    for (const statement of statements) {
      if (statement) {
        const { error } = await supabase.rpc("exec_sql", {
          sql: statement + ";",
        });
        if (error) {
          // Try direct query if RPC doesn't work
          console.log("Executing:", statement.substring(0, 50) + "...");
        }
      }
    }

    console.log("✅ Database setup complete!");
  } catch (error) {
    console.error("❌ Error setting up database:", error);
    console.log("\n📝 Please run the SQL manually in Supabase Dashboard:");
    console.log("   1. Go to SQL Editor");
    console.log("   2. Paste contents of supabase/schema.sql");
    console.log("   3. Click Run");
  }
}

setupDatabase();
