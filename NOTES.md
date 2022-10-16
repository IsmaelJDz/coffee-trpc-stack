## Bootstrap application

`yarn create next-app trpc-tutorial-pre --typescript`

## Install dependencies

`yarn add @trpc/client @trpc/server @trpc/react @trpc/next zod react-query superjson jotai @prisma/client react-hook-form jsonwebtoken cookie nodemailer`

`yarn add @types/jsonwebtoken @types/cookie @types/nodemailer -D`

## TailwindCSS

`yarn add -D tailwindcss@latest postcss@latest autoprefixer@latest`
`npx tailwindcss init -p`

## ESLint

`yarn add -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-config-next eslint-config-standard eslint-plugin-import eslint-plugin-n eslint-plugin-promise eslint-plugin-react`

## Runners

` "lint": "next lint", "eslint": "eslint . --fix"`

## Jest and React Testing Library

`yarn add -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom`

## Prisma

`npx prisma init`

`npx prisma migrate dev --name`

`npx prisma format` => #format prisma schema, add relation between user and post (example)

`npx prisma migrate dev --name (single model created example("Post"))`
