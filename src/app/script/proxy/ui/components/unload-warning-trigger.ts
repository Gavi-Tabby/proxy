import { KlHistory } from '../../history/px-history';

export type TUnloadWarningTriggerParams = {
    pxHistory: KlHistory;
    getLastSavedHistoryIndex: () => number;
};

export class UnloadWarningTrigger {
    private readonly pxHistory: KlHistory;
    private readonly getLastSavedHistoryIndex: () => number;
    private readonly onBeforeUnload = (e: BeforeUnloadEvent) => {
        e.preventDefault();
        e.returnValue = '';
    };

    // ----------------------------------- public -----------------------------------
    constructor(p: TUnloadWarningTriggerParams) {
        this.pxHistory = p.pxHistory;
        this.getLastSavedHistoryIndex = p.getLastSavedHistoryIndex;
        p.pxHistory.addListener(() => this.update());
    }

    update(): void {
        const historyIndex = this.pxHistory.getTotalIndex();
        if (this.getLastSavedHistoryIndex() !== historyIndex) {
            window.addEventListener('beforeunload', this.onBeforeUnload);
        } else {
            window.removeEventListener('beforeunload', this.onBeforeUnload);
        }
    }

    destroy(): void {
        //...
    }
}
