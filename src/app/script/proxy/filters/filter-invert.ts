import { TFilterApply } from '../px-types';
import { applyFxFilter } from './apply-fx-filter';

export type TFilterInvertInput = null;

export const filterInvert = {
    apply(params: TFilterApply<TFilterInvertInput>): boolean {
        const context = params.layer.context;
        const pxHistory = params.pxHistory;
        if (!context) {
            return false;
        }
        return applyFxFilter(
            context,
            params.pxCanvas.getSelection(),
            (fxCanvas) => {
                fxCanvas.invert();
            },
            pxHistory,
        );
    },
};
