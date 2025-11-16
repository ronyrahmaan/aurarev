-- AlterTable
ALTER TABLE "User" ADD COLUMN     "emailVerificationToken" TEXT,
ADD COLUMN     "passwordResetExpiry" TIMESTAMP(3),
ADD COLUMN     "passwordResetToken" TEXT;
