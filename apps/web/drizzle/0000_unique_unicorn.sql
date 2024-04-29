CREATE TABLE IF NOT EXISTS "emails" (
	"email" varchar(254) PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
