import { Database } from "./database.types";

declare global {
type DB = Database;
// Optional shortcuts
type Goal = Database["public"]["Tables"]["goals"]["Row"];
type Session = Database["public"]["Tables"]["sessions"]["Row"];
type ReflectionOld = Database["public"]["Tables"]["reflections_old"]["Row"];
type Output = Database["public"]["Tables"]["outputs"]["Row"];
type Reflection = Database["public"]["Tables"]["reflections"]["Row"];
}
