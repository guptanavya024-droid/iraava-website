-- CreateEnum
CREATE TYPE "SocialPlatform" AS ENUM ('INSTAGRAM', 'FACEBOOK', 'WHATSAPP', 'LINKEDIN', 'TWITTER', 'YOUTUBE', 'OTHER');

-- CreateEnum
CREATE TYPE "ProductCategory" AS ENUM ('FACE_CARE', 'BODY_CARE');

-- CreateEnum
CREATE TYPE "BuyerType" AS ENUM ('BRAND', 'IMPORTER', 'DISTRIBUTOR', 'OTHER');

-- CreateEnum
CREATE TYPE "EnquiryType" AS ENUM ('CATALOGUE_PRICING', 'PRIVATE_LABEL', 'CUSTOMIZATION', 'EXPORT_DISTRIBUTION', 'GENERAL');

-- CreateEnum
CREATE TYPE "EnquiryStatus" AS ENUM ('NEW', 'READ', 'ARCHIVED');

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" TEXT NOT NULL DEFAULT 'singleton',
    "logoUrl" TEXT,
    "siteName" TEXT NOT NULL DEFAULT 'Iraava Naturals',
    "tagline" TEXT NOT NULL DEFAULT 'Nourished by India.',
    "email" TEXT,
    "phone" TEXT,
    "addressLine1" TEXT,
    "addressLine2" TEXT,
    "city" TEXT,
    "state" TEXT,
    "pincode" TEXT,
    "country" TEXT DEFAULT 'India',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SocialLink" (
    "id" TEXT NOT NULL,
    "platform" "SocialPlatform" NOT NULL,
    "url" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "SocialLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HomeContent" (
    "id" TEXT NOT NULL DEFAULT 'singleton',
    "heroHeading" TEXT NOT NULL,
    "heroSubheading" TEXT NOT NULL,
    "whereWeFromText" TEXT NOT NULL,
    "whatWeDoText" TEXT NOT NULL,
    "productRangeIntro" TEXT NOT NULL,
    "buyerCtaHeading" TEXT NOT NULL,
    "buyerCtaBody" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HomeContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WhyUsPoint" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "WhyUsPoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AboutContent" (
    "id" TEXT NOT NULL DEFAULT 'singleton',
    "headline" TEXT NOT NULL,
    "subheading" TEXT NOT NULL,
    "brandStory" TEXT NOT NULL,
    "closingStatement" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AboutContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApproachPrinciple" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ApproachPrinciple_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductRangeContent" (
    "id" TEXT NOT NULL DEFAULT 'singleton',
    "headline" TEXT NOT NULL,
    "subheading" TEXT NOT NULL,
    "introText" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductRangeContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkWithUsContent" (
    "id" TEXT NOT NULL DEFAULT 'singleton',
    "intro" TEXT NOT NULL,
    "catalogueBlurb" TEXT NOT NULL,
    "bulletPoints" JSONB NOT NULL,
    "madeInIndiaText" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkWithUsContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "category" "ProductCategory" NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "variant" TEXT,
    "description" TEXT NOT NULL,
    "ingredients" TEXT,
    "otherDetails" TEXT,
    "referenceLink" TEXT,
    "imageUrl" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EnquirySubmission" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "workEmail" TEXT NOT NULL,
    "phone" TEXT,
    "country" TEXT NOT NULL,
    "buyerType" "BuyerType" NOT NULL,
    "productCategories" JSONB NOT NULL,
    "enquiryType" "EnquiryType" NOT NULL,
    "message" TEXT NOT NULL,
    "status" "EnquiryStatus" NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EnquirySubmission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");
