import { KlCanvas } from './px-canvas';
import { Matrix } from 'transformation-matrix';
import {
    getSelectionBoundsFromSample,
    getSelectionSampleBounds,
} from '../transform/get-selection-sample-bounds';
import { MultiPolygon } from 'polygon-clipping';
import { matrixToTuple } from '../../bb/math/matrix-to-tuple';
import { setContextAlgorithm } from '../utils/set-context-algorithm';
import { freeTransformToMatrix, transformSelection } from '../transform/composed-transformation';
import { TFreeTransform } from '../transform/transform-types';
import { TSelectionSample } from '../transform/selection-sample';
import { indexBoundsInArea } from '../../bb/math/math';
import {
    createHistoryEntryFromChanges,
    TChangeListEntry,
} from '../history/push-helpers/create-history-entry-from-changes';
import { TInterpolationAlgorithm } from '../px-types';

function drawTransformedSelectionSample(
    algorithm: TInterpolationAlgorithm,
    selectionSample: TSelectionSample,
    ctx: CanvasRenderingContext2D,
    transformation: Matrix,
): void {
    ctx.save();
    ctx.setTransform(...matrixToTuple(transformation));
    setContextAlgorithm(ctx, algorithm);
    ctx.drawImage(selectionSample.image, selectionSample.x, selectionSample.y);
    ctx.restore();
}

/**
 * Transforms the selected region in pxCanvas and sets the new selection.
 */
export function pxCanvasTransform(p: {
    pxCanvas: KlCanvas;
    selectionSample: TSelectionSample;
    // you can transform without an active selection
    selection?: MultiPolygon;
    // in relation to selection sample, selection bounds
    freeTransform: TFreeTransform;
    // erases selected/sample region on this layer
    eraseLayerIndex?: number;
    // sample will be transformed/cloned on this layer
    targetLayerIndex: number;
    algorithm: TInterpolationAlgorithm;
    backgroundIsTransparent?: boolean; // default false
}): void {
    const backgroundIsTransparent = p.backgroundIsTransparent ?? false;
    const pxHistory = p.pxCanvas.getKlHistory();
    const layers = p.pxCanvas.getLayersReference();
    const targetLayer = layers[p.targetLayerIndex];
    const matrix = freeTransformToMatrix(
        p.freeTransform,
        getSelectionBoundsFromSample(p.selectionSample),
    );

    let transformedSelection: MultiPolygon | undefined;
    pxHistory.pause(true);
    try {
        if (p.eraseLayerIndex !== undefined) {
            p.pxCanvas.eraseLayer({
                layerIndex: p.eraseLayerIndex,
                useSelection: true,
                useAlphaLock: p.eraseLayerIndex === 0 && !backgroundIsTransparent,
            });
        }
        drawTransformedSelectionSample(p.algorithm, p.selectionSample, targetLayer.context, matrix);
        transformedSelection = p.selection
            ? transformSelection({ type: 'free', freeTransform: p.freeTransform }, p.selection)
            : undefined;
        p.pxCanvas.setSelection(transformedSelection);
    } finally {
        pxHistory.pause(false);
    }

    if (!pxHistory.isPaused()) {
        const eraseLayer = p.eraseLayerIndex !== undefined ? layers[p.eraseLayerIndex!] : undefined;
        const targetBounds = indexBoundsInArea(
            getSelectionSampleBounds(p.selectionSample, matrix),
            p.pxCanvas.getWidth(),
            p.pxCanvas.getHeight(),
        );
        const changes: TChangeListEntry[] = [];
        transformedSelection && changes.push({ selection: transformedSelection });
        eraseLayer &&
            changes.push({
                layerId: eraseLayer.id,
                bounds: getSelectionSampleBounds(p.selectionSample),
            });
        targetBounds && changes.push({ layerId: targetLayer.id, bounds: targetBounds });
        pxHistory.push(createHistoryEntryFromChanges(layers, changes));
    }
}
