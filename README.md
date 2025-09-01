not a lot to say

### how to run locally

```
git clone https://github.com/espcaa/website
bun i
bun run dev
```

### how to build for ssr

```
bun run build
bun dist/server/entry.mjs
```

### random scripts

please run before building/running locally

```
bun run scripts/optimize-wallpapers.ts
bun run scripts/extract-wallpaper-color.ts
```
