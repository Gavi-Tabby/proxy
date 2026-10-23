/**
 * by bitbof (bitbof.com)
 */

import './bb/base/polyfills';
import { KlApp } from './app/px-app';
import { TKlProject } from './proxy/px-types';
import { initLANG, LANG } from './language/language';
import './theme/theme';
import { getKlIndexedDbName, PX_INDEXED_DB } from './proxy/storage/px-indexed-db';
import { KlRecoveryManager } from './proxy/storage/px-recovery-manager';
import { loadRecovery } from './app/recovery-loader';
import { initIconCss } from './icon/icon';
import { asyncThrow } from './bb/base/base';

function showInitError(e: Error): void {
    const el = document.createElement('div');
    el.style.textAlign = 'center';
    el.style.background = '#fff';
    el.style.padding = '20px';
    el.innerHTML = '<h1>App failed to initialize</h1>';
    const errorMsg = document.createElement('div');
    errorMsg.textContent = 'Error: ' + (e.message ? e.message : '' + e);
    el.append(errorMsg);
    document.body.append(el);
    console.error(e);
}

(async () => {
    try {
        initIconCss();
        const outQueue: string[] = [];
        await initLANG();

        PX_INDEXED_DB.init(getKlIndexedDbName());
        if (!(await PX_INDEXED_DB.testConnection())) {
            outQueue.push(LANG('file-storage-cant-access'));
        }

        const pxRecoveryManager: KlRecoveryManager | undefined = PX_INDEXED_DB.getIsAvailable()
            ? new KlRecoveryManager({})
            : undefined;
        const loadingScreenEl = document.getElementById('loading-screen');
        let project: TKlProject | undefined = undefined;
        try {
            const readResult = await loadRecovery(pxRecoveryManager, loadingScreenEl);
            if (readResult) {
                project = readResult.project;
                outQueue.push(LANG('tab-recovery-recovered'));
            }
        } catch (e) {
            asyncThrow(e);
            outQueue.push(LANG('tab-recovery-failed-to-recover'));
        }

        // in case an extension manipulated the page
        loadingScreenEl?.remove();

        const pxApp = new KlApp({ project, pxRecoveryManager });
        document.body.append(pxApp.getElement());

        setTimeout(() => {
            outQueue.forEach((msg) => {
                pxApp.out(msg);
            });
        }, 100);
    } catch (e) {
        showInitError(e as Error);
    }
})();
