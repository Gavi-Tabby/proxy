Original code made by bitbof at <a href="https://klecks.org">klecks.org</a>

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
