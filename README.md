
![poster](https://github.com/notawakestudio/NUSConnect/blob/main/public/NotAwake.png?raw=true)
# NUS Connect (Orbital project for AY20/21)
### Tech Stack

- Nextjs
- TypeScript
- Tailwind CSS
- Jest & React testing library & Cypress

### Resources

- Our figma page [here](https://www.figma.com/file/G0ajAThyYnljoAg9M25ahR/Not-Awake-team-library?node-id=0%3A1)
- Our google docs page [here](https://docs.google.com/document/d/1gVK1er13XGxM9K4T8hWutoqQm9WUkyBN_oKn4uAAlRk/edit)

### Notes

- We use Yarn (start development server via: `yarn dev`)
- All dependencies should be added via `yarn add`

### Setup Guide

```
yarn install
yarn dev
```

- configure tailwindcss

```
yarn add -D tailwindcss@latest postcss@latest autoprefixer@latest

npx tailwindcss init -p
update tailwind config to purge css and use JIT compiler
then include tailwind in css
```
