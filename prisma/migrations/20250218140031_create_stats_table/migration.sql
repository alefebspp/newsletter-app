-- CreateTable
CREATE TABLE "newsletter_stats" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "utm_source" TEXT,
    "utm_medium" TEXT,
    "utm_campaign" TEXT,
    "utm_channel" TEXT,

    CONSTRAINT "newsletter_stats_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "newsletter_stats" ADD CONSTRAINT "newsletter_stats_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "newsletter_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
