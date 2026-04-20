import { Pool } from "pg";

declare global {
  // eslint-disable-next-line no-var
  var __toyRepublicPool: Pool | undefined;
}

const pool =
  global.__toyRepublicPool ??
  new Pool({
    connectionString:
      process.env.DATABASE_URL ??
      "postgres://toyrepublic:toyrepublic_dev_pw@localhost:5433/toy_republic",
    max: 10,
    idleTimeoutMillis: 30_000,
  });

if (process.env.NODE_ENV !== "production") {
  global.__toyRepublicPool = pool;
}

export async function query<T = Record<string, unknown>>(
  text: string,
  params: unknown[] = []
): Promise<T[]> {
  const res = await pool.query(text, params);
  return res.rows as T[];
}

export async function queryOne<T = Record<string, unknown>>(
  text: string,
  params: unknown[] = []
): Promise<T | null> {
  const rows = await query<T>(text, params);
  return rows[0] ?? null;
}

export { pool };
