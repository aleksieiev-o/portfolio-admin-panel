### Portfolio admin panel application
###### An application for content control of the [Portfolio application](https://aleksieiev-portfolio.vercel.app/home)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

###### To run the project in development mode with database and storage emulations using empty database, you have to run this script:

`fb_em_start`

###### To seed the emulated project database you have to create a database using client app or an db-example.json-import in the emulator using correct schema and run this script:

`npm run fb_em_export`

After this database files are created in the directory _'/data-meter-keep/src/lib/firebase/seed.development/database_export'_.

###### To run the project in development mode with database and storage emulations, you have to run this script:

`npm run fb_em_import`

###### To run the project in development mode with database and storage emulations with auto-save changes after shut down the emulators, you have to run this script:

`npm run fb_em`

