import { TMixMode } from '../px-types';

export function getMixModeStr(mixModeStr?: TMixMode): TMixMode {
    return mixModeStr ?? 'source-over';
}
