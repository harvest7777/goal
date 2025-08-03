import { Database } from "./database.types";

declare global {
type DB = Database;
// Optional shortcuts
type Goal = Database["public"]["Tables"]["goals"]["Row"];
type Session = Database["public"]["Tables"]["sessions"]["Row"];
type Win = Database["public"]["Tables"]["wins"]["Row"];
}
