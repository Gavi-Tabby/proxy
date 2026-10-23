import { KlHistory } from './px-history';
import { KlTempHistory } from './px-temp-history';

export type THistoryExecutionType = 'undo' | 'redo' | 'tempUndo' | 'tempRedo';

export type TKlHistoryExecutionResult = {
    type: THistoryExecutionType;
};

export type TKlHistoryExecutorParams = {
    pxHistory: KlHistory;
    tempHistory: KlTempHistory;
    onCanUndoRedoChange: (canUndo: boolean, canRedo: boolean) => void;
};

/**
 * performs undo/redo in pxHistory and tempHistory
 */
export class KlHistoryExecutor {
    // from params
    private readonly pxHistory: KlHistory;
    private readonly tempHistory: KlTempHistory;
    private readonly onCanUndoRedoChange: (canUndo: boolean, canRedo: boolean) => void;

    private doIgnore = false;
    private lastCanUndo = false;
    private lastCanRedo = false;

    /**
     * If UI is frozen while pressing undo/redo, the user might click multiple times
     * because they think the click wasn't registered.
     * This test prevents multiple undo/redo at once.
     * true = skip
     */
    private testShouldSkip(): boolean {
        if (this.doIgnore) {
            return true;
        }
        this.doIgnore = true;
        setTimeout(() => {
            this.doIgnore = false;
        }, 0);
        return false;
    }

    private canUndo(): boolean {
        return (
            (this.tempHistory.getIsActive() && this.tempHistory.canDecreaseIndex()) ||
            this.pxHistory.canUndo()
        );
    }

    private canRedo(): boolean {
        if (this.tempHistory.getIsActive()) {
            return this.tempHistory.canIncreaseIndex();
        }
        return this.pxHistory.canRedo();
    }

    // ----------------------------------- public -----------------------------------
    constructor(p: TKlHistoryExecutorParams) {
        this.pxHistory = p.pxHistory;
        this.tempHistory = p.tempHistory;
        this.onCanUndoRedoChange = p.onCanUndoRedoChange;

        const emitCanUndoRedo = () => {
            const canUndo = this.canUndo();
            const canRedo = this.canRedo();
            if (this.lastCanUndo === canUndo && this.lastCanRedo === canRedo) {
                return;
            }
            this.lastCanUndo = canUndo;
            this.lastCanRedo = canRedo;
            this.onCanUndoRedoChange(canUndo, canRedo);
        };

        this.pxHistory.addListener(emitCanUndoRedo);
        this.tempHistory.addListener(emitCanUndoRedo);
    }

    // returns undefined if it can't undo
    undo(): undefined | TKlHistoryExecutionResult {
        if (this.testShouldSkip()) {
            return undefined;
        }
        if (this.tempHistory.getIsActive() && this.tempHistory.canDecreaseIndex()) {
            this.tempHistory.decreaseIndex();
            return {
                type: 'tempUndo',
            };
        }
        if (!this.pxHistory.canUndo()) {
            return undefined;
        }
        this.pxHistory.decreaseIndex();

        return {
            type: 'undo',
        };
    }

    // returns undefined if it can't redo
    redo(): undefined | TKlHistoryExecutionResult {
        if (this.testShouldSkip()) {
            return undefined;
        }
        if (this.tempHistory.getIsActive() && this.tempHistory.canIncreaseIndex()) {
            this.tempHistory.increaseIndex();
            return {
                type: 'tempRedo',
            };
        }
        if (!this.pxHistory.canRedo()) {
            return undefined;
        }
        this.pxHistory.increaseIndex();

        return {
            type: 'redo',
        };
    }
}
