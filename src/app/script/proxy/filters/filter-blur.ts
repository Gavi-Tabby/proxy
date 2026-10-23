import { KlSlider } from '../ui/components/px-slider';
import { EVENT_RES_MS } from './filters-consts';
import { TFilterApply, TFilterGetDialogParam, TFilterGetDialogResult } from '../px-types';
import { LANG } from '../../language/language';
import { FxPreviewRenderer } from '../ui/project-viewport/fx-preview-renderer';
import { Preview } from '../ui/project-viewport/preview';
import { TProjectViewportProject } from '../ui/project-viewport/project-viewport';
import { BB } from '../../bb/bb';
import { testIsSmall } from '../ui/utils/test-is-small';
import { getPreviewHeight, getPreviewWidth } from '../ui/utils/preview-size';
import { applyFxFilter } from './apply-fx-filter';
import { css } from '../../bb/base/base';

export type TFilterBlurInput = {
    radius: number;
};

export const filterBlur = {
    getDialog(params: TFilterGetDialogParam) {
        const pxCanvas = params.pxCanvas;
        const selectedLayerIndex = params.selectedLayerIndex;
        const layer = pxCanvas.getLayer(selectedLayerIndex);
        const layers = pxCanvas.getLayers();

        const rootEl = BB.el();
        const result: TFilterGetDialogResult<TFilterBlurInput> = {
            element: rootEl,
        };
        const isSmall = testIsSmall();
        if (!isSmall) {
            result.width = getPreviewWidth(isSmall);
        }

        let radius = 10;
        const fxPreviewRenderer = new FxPreviewRenderer({
            original: layer.canvas,
            onUpdate: (fxCanvas, transform) => {
                return fxCanvas
                    .multiplyAlpha()
                    .triangleBlur(radius * transform.scaleX)
                    .unmultiplyAlpha();
            },
            selection: pxCanvas.getSelection(),
        });

        const radiusSlider = new KlSlider({
            label: LANG('radius'),
            width: 300,
            height: 30,
            min: 1,
            max: 200,
            value: radius,
            eventResMs: EVENT_RES_MS,
            onChange: (val): void => {
                radius = val;
                preview.render();
            },
        });
        radiusSlider.getElement().style.marginBottom = '10px';
        rootEl.append(radiusSlider.getElement());

        const previewLayerArr: TProjectViewportProject['layers'] = [];
        {
            for (let i = 0; i < layers.length; i++) {
                previewLayerArr.push({
                    image: i === selectedLayerIndex ? fxPreviewRenderer.render : layers[i].canvas,
                    isVisible: layers[i].isVisible,
                    opacity: layers[i].opacity,
                    mixModeStr: layers[i].mixModeStr,
                    hasClipping: layers[i].hasClipping,
                });
            }
        }

        const preview = new Preview({
            width: getPreviewWidth(isSmall),
            height: getPreviewHeight(isSmall),
            project: {
                width: layer.canvas.width,
                height: layer.canvas.height,
                layers: previewLayerArr,
            },
            selection: pxCanvas.getSelection(),
        });
        preview.render();
        css(preview.getElement(), {
            marginLeft: -20,
            marginRight: -20,
        });
        rootEl.append(preview.getElement());

        result.destroy = (): void => {
            radiusSlider.destroy();
            fxPreviewRenderer.destroy();
            preview.destroy();
        };
        result.getInput = function (): TFilterBlurInput {
            result.destroy!();
            return {
                radius: radius,
            };
        };

        return result;
    },

    apply(params: TFilterApply<TFilterBlurInput>): boolean {
        const context = params.layer.context;
        const pxHistory = params.pxHistory;
        const radius = params.input.radius;
        if (!context || !radius) {
            return false;
        }
        return applyFxFilter(
            context,
            params.pxCanvas.getSelection(),
            (fxCanvas) => {
                fxCanvas.multiplyAlpha().triangleBlur(radius).unmultiplyAlpha();
            },
            pxHistory,
        );
    },
};
