import { installServiceWorker } from './install-service-worker';

installServiceWorker({
    cachePrefix: 'proxy-app-cache-',
    getNavigationCacheUrl: (requestUrl, appScopeUrl, navigationAssetUrls): string | undefined => {
        
        // const website = "localhost:1234"

        // requestUrl: website + `f{website}/paint/help`
        // appScopeUrl.href: `f{website}/paint/`
        // navigationAssetUrls: [
        //     `f{website}/paint/`,
        //     `f{website}/paint/proxy-index.html`,
        //     `f{website}/paint/help.html`,
        // ]
        const url = new URL(requestUrl);
        // e.g. https://foo.com !== https://bar.com
        if (url.origin !== appScopeUrl.origin) {
            return undefined;
        }

        for (const navigationAssetUrl of navigationAssetUrls) {
            const assetUrl = new URL(navigationAssetUrl);
            // e.g. /paint/ === /paint/ or /paint/help.html === /paint/help.html
            if (url.pathname === assetUrl.pathname) {
                return assetUrl.href;
            }

            if (!assetUrl.pathname.endsWith('.html')) {
                continue;
            }

            // it's possible the server removed the .html at the end
            assetUrl.pathname = assetUrl.pathname.slice(0, -'.html'.length);
            // e.g. /index === /index
            if (url.pathname === assetUrl.pathname) {
                return assetUrl.href;
            }
        }
        // The request does not correspond to an HTML asset from the Parcel manifest.
        return undefined;
    },
});
