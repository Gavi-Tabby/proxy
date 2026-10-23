import { showModal, showError } from '../base/show-modal';
import { BB } from '../../../../bb/bb';
import { RecoveryManagerPanel } from './recovery-manager-panel';
import { KlRecoveryManager } from '../../../storage/px-recovery-manager';
import { PX_INDEXED_DB } from '../../../storage/px-indexed-db';
import { LANG } from '../../../../language/language';

export function showRecoveryManagerPanel(pxRecoveryManager?: KlRecoveryManager) {
    if (!pxRecoveryManager || !PX_INDEXED_DB.getIsAvailable()) {
        showError(LANG('file-storage-cant-access'));
        return;
    }

    const recoveryManager = new RecoveryManagerPanel({ pxRecoveryManager });

    const rootEl = BB.el({ content: [recoveryManager.getElement()] });

    const modal = showModal({
        message: `<b>${LANG('tab-recovery-recover-tabs')}</b>`,
        div: rootEl,
        buttons: [{ id: 'close', label: LANG('modal-close') }],
        callback: () => {
            recoveryManager.destroy();
        },
        style: {
            width: 'calc(100% - 50px)',
            maxWidth: 1000,
            minWidth: 300,
            boxSizing: 'border-box',
        },
    });
}
