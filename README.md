# Training for climbing

I'm making this application to be able to create and track my training cycles for rock climbing.

# Technologies

Scaffolded with t3.gg

- [Next.js](https://nextjs.org)
- [Clerk Authentication](https://clerk.com/)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)
- [Planetscale](https://planetscale.com/)
- [Axiom](https://axiom.co/)

# Contributing

You will likely need to make a clerk account to get the .env secret for this to test locally. [Clerk env docs](https://clerk.com/docs/nextjs/set-environment-keys)
You'll also need to make a free mySQL database with [Planetscale](https://planetscale.com/). Once you create the database, select 'connect' and choose 'Connect with Prisma'. Add your database password to the generated url and place it in your .env. Then run "npm install" and "npx prisma db push".

Theres some pretty simple things in issues right now that you can work on. A good place to start might be helping me with the event modals. In schedules.ts I defined a bunch of default events. You can use those as a baseline extend the info-modal as I've been doing for a few events.

If you have any issues just let me know and feel free to ask questions. I'm typically around outside of CST business hours.
