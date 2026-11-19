Original code made by bitbof at <a href="https://klecks.org">klecks.org</a>

# Changes
- Larger canvas size
    - can go to 4096x4096 (may cause issues with image storage and recovery due to exessive sizes)
- Modified icons
    - this is a prefrence change, this doesn't *need* to exist, i just wanted to.
- Only pixel brush
    - another prefrence change, truly i just prefer the pixel brush over the others.
- Default canvas
    - By default the canvas is 1024x1024 and transparent, I just like it more.
- A reload button
    - next to the save button (might be a bad idea) you can reload the page to discard the current drawing.
- Layer max increase
    - it's been set to 32 instead of 16. this may be too much.

# Commands
- initialize via `npm ci` (requires node and npm to be installed already)
- `npm run icon:build` - generate icon files necessary to run Proxy
- `npm run lang:build` - generate language files necessary to run Proxy
- `npm run lang:build -- --missing` - generate language files and list all keys with a missing translation.
- `npm run start` - dev server (to run `standalone` locally)
- `npm run build` - build `standalone` into `/dist/`
- `npm run build:embed` - build `embed` into `/dist/`

## deno equivalents (same order)
I only added this as a reminder to myself since I cannot use npm on my school's given computer.
- `deno ci`
- `deno task icon:build`
- `deno task lang:build`
- `deno task lang:build -- --missing`
- `deno task start`
- `deno task build`
- `deno task build:embed`
