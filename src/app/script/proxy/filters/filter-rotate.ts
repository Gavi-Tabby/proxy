import { BB } from '../../bb/bb';
import { TFilterApply, TFilterGetDialogParam, TFilterGetDialogResult } from '../px-types';
import { SMALL_PREVIEW } from '../ui/utils/preview-size';
import { Destroyer } from '../../bb/base/base';

export type TFilterRotateInput = {
    deg: number;
};

export const filterRotate = {
    getDialog(params: TFilterGetDialogParam) {
        const pxCanvas = params.pxCanvas;
        if (!pxCanvas) {
            return false;
        }

        const fit = BB.fitInto(pxCanvas.getWidth(), pxCanvas.getHeight(), 280, 200, 1);
        const w = parseInt('' + fit.width),
            h = parseInt('' + fit.height);

        const previewFactor = w / pxCanvas.getWidth();
        const tempCanvas = BB.canvas(w, h);
        tempCanvas.style.display = 'block';
        BB.ctx(tempCanvas).drawImage(pxCanvas.getCanvas(previewFactor), 0, 0, w, h);

        const rootEl = BB.el();
        const destroyer = new Destroyer();
        const result: TFilterGetDialogResult<TFilterRotateInput> = {
            element: rootEl,
        };
        let deg = 0;

        function update(): void {
            canvasWrapper.style.transform = 'rotate(' + deg + 'deg)';
            if (Math.abs(deg % 180) === 90) {
                //height has to fit width because of rotation
                const fit = BB.fitInto(h, w, 280, 200, 1);
                const scale = parseInt('' + fit.height) / w;
                canvasWrapper.style.transform = 'rotate(' + deg + 'deg) scale(' + scale + ')';
            }
        }

        const minusBtn = BB.el({
            tagName: 'button',
            className: 'px-button',
            content: [
                BB.el({
                    tagName: 'span',
                    content: '⟲',
                    css: {
                        fontSize: '1.3em',
                    },
                }),
                ' 90°',
            ],
            destroyer,
            onClick: () => {
                deg -= 90;
                update();
            },
        });
        const plusBtn = BB.el({
            tagName: 'button',
            className: 'px-button',
            content: [
                BB.el({
                    tagName: 'span',
                    content: '⟳',
                    css: {
                        fontSize: '1.3em',
                    },
                }),
                ' 90°',
            ],
            destroyer,
            onClick: () => {
                deg += 90;
                update();
            },
            css: {
                marginLeft: 5,
            },
        });

        rootEl.append(minusBtn, plusBtn);

        const previewWrapper = BB.el({
            className: 'px-preview-wrapper',
            css: {
                width: SMALL_PREVIEW.width,
                height: SMALL_PREVIEW.height,
                display: 'table',
            },
        });

        const previewcell = BB.el({
            parent: previewWrapper,
            css: {
                display: 'table-cell',
                verticalAlign: 'middle',
            },
        });
        const canvasWrapper = BB.el({
            parent: previewcell,
            content: tempCanvas,
            className: 'px-preview-wrapper__canvas',
            css: {
                width: w,
                height: h,
                marginLeft: 'auto',
                marginRight: 'auto',
                overflow: 'hidden',
                background: 'var(--px-checkerboard-background)',
                backgroundSize: 16,
            },
        });

        canvasWrapper.style.transition = 'transform 0.2s ease-out';

        rootEl.append(previewWrapper);
        update();

        result.destroy = (): void => {
            destroyer.destroy();
        };
        result.getInput = function (): TFilterRotateInput {
            result.destroy!();
            return {
                deg: deg,
            };
        };
        return result;
    },

    apply(params: TFilterApply<TFilterRotateInput>): boolean {
        const pxCanvas = params.pxCanvas;
        if (!pxCanvas) {
            return false;
        }
        pxCanvas.rotate(params.input.deg);
        return true;
    },
};
