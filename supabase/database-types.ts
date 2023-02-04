import { Database } from "./db-generated-types";
export type SBTypes = Database;
export type Tables = SBTypes["public"]["Tables"];
export type Notes = Tables["notes"]["Row"];
