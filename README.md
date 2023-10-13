# Abeek: A Miniature Social Network

## Introduction

Abeek is a passion project that marks my initial foray into software development. It's important to acknowledge that this project might contain architectural imperfections that I've chosen not to rectify. Nevertheless, it offers a wealth of functionality that can prove valuable to users. I'm open to any feedback or suggestions, which you can send to my email at tarolv.work@gmail.com.

## Description

Abeek is a miniature social network that allows users to curate collections of their favorite movies, books, TV series, comics, and more. Users can also share their collections with friends and keep track of statistics related to their interests.

![screenshot](/screenshot.jpg)

## Technology Stack

- **Languages:** TypeScript, Nodejs, PostgreSQL
- **Frontend:** React, Redux Toolkit, Apollo Client, Tailwind CSS, Framer Motion
- **UI Library:** DaisyUI
- **Backend:** NestJS, PassportJS, Apollo Server, Pg (raw SQL), Cheerio
- **APIs:** GPT API, Google Images API, Google Search API
- **Devops:** PM2, Nginx
- Notable features:
  - Wikipedia parsing
  - Recommendation system using GPT embeddings and PgVector
  - Gradual loading of posts
  - Virus scanning of files via Clamav
  - Moderation system

I single-handedly developed Abeek from its conceptualization, design, and development to its deployment on hosting.

## Installation and Usage

Before running Abeek, please follow these steps:

1. Start ClamAV if you wish to use antivirus image scanning. Otherwise, go to the `fileService` and remove the `virusCheck` function.
2. Create a database with the necessary name (by default, it's "Abeek").
3. Fill in the `.env` file with your information.

- **Client Folder:**
  - Run `pnpm i`
  - Run `pnpm run codegen`
  
- **Server Folder:**
  - Run `pnpm i`
  - Run `pnpm run migrate up`

### Development Build

To start the development build:

- **Client Folder:** Run `pnpm run dev`
- **Server Folder:** Run `pnpm run dev`

### Production Build

For the production build:

- **Client Folder:**
  - Run `pnpm run build`

- **Server Folder:**
  - In the `app.module` file, uncomment the `ServeStaticModule`.

To start the production build:

- **Server Folder:** Run `pnpm run prod`

For any inquiries or feedback, please feel free to contact me at tarolv.work@gmail.com.

## Important Notes

- This project was primarily a learning experience and might contain architectural flaws.
- The project is no longer actively maintained, but it still offers a substantial range of features.
- I welcome contributions and feedback from the community.

Explore your collections with Abeek and enjoy the journey!
