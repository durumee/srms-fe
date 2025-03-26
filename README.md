yarn add -D tailwindcss @tailwindcss/postcss postcss

# postcss.config.mjs
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  }
}

# index.css
@import "tailwindcss";
