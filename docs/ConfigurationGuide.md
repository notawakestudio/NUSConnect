## **Table Of Content**

* Table of Contents 
{:toc}

### Notes

- We use Yarn (start development server via: `yarn dev`)
- All dependencies should be added via `yarn add`

### Setup Guide

```
npx create-next-app nus-game
yarn dev
```

- tailwindcss

```
yarn add -D tailwindcss@latest postcss@latest autoprefixer@latest

npx tailwindcss init -p
update tailwind config to purge css and use JIT compiler
then include tailwind in css
```
