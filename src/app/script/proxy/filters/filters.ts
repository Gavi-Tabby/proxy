import { getIconUrl } from '../../icon/icon';
import { TFilter } from '../px-types';
import invertImg from 'url:/src/app/img/ui/edit-invert.png';
import glTiltShiftImg from 'url:/src/app/img/ui/edit-tilt-shift.png';
import glBlurImg from 'url:/src/app/img/ui/edit-triangle-blur.png';
import glUnsharpMaskImg from 'url:/src/app/img/ui/edit-unsharp-mask.png';

import glBrightnessContrastImg from 'url:/src/app/img/ui/edit-brightness-contrast.png';
import cropExtendImg from 'url:/src/app/img/ui/edit-crop.png';
import glCurvesImg from 'url:/src/app/img/ui/edit-curves.png';
import flipImg from 'url:/src/app/img/ui/edit-flip.png';
import glHueSaturationImg from 'url:/src/app/img/ui/edit-hue-saturation.png';
import glPerspectiveImg from 'url:/src/app/img/ui/edit-perspective.png';
import resizeImg from 'url:/src/app/img/ui/edit-resize.png';
import rotateImg from 'url:/src/app/img/ui/edit-rotate.png';
import toAlphaImg from 'url:/src/app/img/ui/edit-to-alpha.png';
import transformImg from 'url:/src/app/img/ui/edit-transform.png';
import gridImg from 'url:/src/app/img/ui/edit-grid.png';
import noiseImg from 'url:/src/app/img/ui/edit-noise.png';
import patternImg from 'url:/src/app/img/ui/edit-pattern.png';
import vanishPointImg from 'url:/src/app/img/ui/edit-vanish-point.png';
import distortImg from 'url:/src/app/img/ui/edit-distort.png';

export const FILTER_LIB_STATUS = {
    isLoaded: false,
};
export const FILTER_LIB: {
    [key: string]: TFilter;
} = {
    brightnessContrast: {
        lang: {
            name: 'filter-bright-contrast-title',
            button: 'filter-bright-contrast',
            description: 'filter-bright-contrast-description',
        },
        icon: glBrightnessContrastImg,
        updatePos: false,
        getDialog: null,
        apply: null,
        inEmbed: true,
        webGL: true,
    },
    cropExtend: {
        lang: {
            name: 'filter-crop-title',
            button: 'filter-crop-extend',
            description: 'filter-crop-description',
        },
        icon: cropExtendImg,
        updatePos: true,
        getDialog: null,
        apply: null,
        inEmbed: false,
    },
    curves: {
        lang: {
            name: 'filter-curves-title',
            button: 'filter-curves',
            description: 'filter-curves-description',
        },
        icon: glCurvesImg,
        updatePos: false,
        getDialog: null,
        apply: null,
        inEmbed: true,
        webGL: true,
    },
    distort: {
        lang: {
            name: 'filter-distort',
            button: 'filter-distort',
            description: 'filter-distort-description',
        },
        icon: distortImg,
        updatePos: false,
        getDialog: null,
        apply: null,
        inEmbed: true,
        webGL: true,
    },
    flip: {
        lang: {
            name: 'filter-flip-title',
            button: 'filter-flip',
            description: 'filter-flip-description',
        },
        icon: flipImg,
        updatePos: false,
        getDialog: null,
        apply: null,
        inEmbed: true,
    },
    hueSaturation: {
        lang: {
            name: 'filter-hue-sat-title',
            button: 'filter-hue-sat',
            description: 'filter-hue-sat-description',
        },
        icon: glHueSaturationImg,
        updatePos: false,
        getDialog: null,
        apply: null,
        inEmbed: true,
        darkNoInvert: true,
        webGL: true,
    },
    invert: {
        lang: {
            name: 'filter-invert',
            button: 'filter-invert',
        },
        icon: invertImg,
        updatePos: false,
        isInstant: true,
        getDialog: null,
        apply: null,
        inEmbed: true,
        darkNoInvert: true,
        webGL: true,
    },
    perspective: {
        lang: {
            name: 'filter-perspective-title',
            button: 'filter-perspective',
            description: 'filter-perspective-description',
        },
        icon: glPerspectiveImg,
        updatePos: false,
        getDialog: null,
        apply: null,
        inEmbed: true,
        webGL: true,
    },
    resize: {
        lang: {
            name: 'filter-resize-title',
            button: 'filter-resize',
            description: 'filter-resize-description',
        },
        icon: resizeImg,
        updatePos: true,
        getDialog: null,
        apply: null,
        inEmbed: false,
    },
    rotate: {
        lang: {
            name: 'filter-rotate-title',
            button: 'filter-rotate',
            description: 'filter-rotate-description',
        },
        icon: rotateImg,
        updatePos: true,
        getDialog: null,
        apply: null,
        inEmbed: false,
    },
    tiltShift: {
        lang: {
            name: 'filter-tilt-shift-title',
            button: 'filter-tilt-shift',
            description: 'filter-tilt-shift-description',
        },
        icon: glTiltShiftImg,
        updatePos: false,
        getDialog: null,
        apply: null,
        inEmbed: true,
        webGL: true,
    },
    toAlpha: {
        lang: {
            name: 'filter-to-alpha-title',
            button: 'filter-to-alpha',
            description: 'filter-to-alpha-description',
        },
        icon: toAlphaImg,
        updatePos: false,
        getDialog: null,
        apply: null,
        inEmbed: true,
        darkNoInvert: true,
        webGL: true,
    },
    transform: {
        lang: {
            name: 'filter-transform-title',
            button: 'filter-transform',
            description: 'filter-transform-description',
        },
        icon: transformImg,
        updatePos: false,
        getDialog: null,
        apply: null,
        inEmbed: true,
    },
    blur: {
        lang: {
            name: 'filter-triangle-blur-title',
            button: 'filter-triangle-blur',
            description: 'filter-triangle-blur-description',
        },
        icon: glBlurImg,
        updatePos: false,
        getDialog: null,
        apply: null,
        inEmbed: true,
        darkNoInvert: true,
        webGL: true,
    },
    unsharpMask: {
        lang: {
            name: 'filter-unsharp-mask-title',
            button: 'filter-unsharp-mask',
            description: 'filter-unsharp-mask-description',
        },
        icon: glUnsharpMaskImg,
        updatePos: false,
        getDialog: null,
        apply: null,
        inEmbed: true,
        darkNoInvert: true,
        webGL: true,
    },
    grid: {
        lang: {
            name: 'filter-grid',
            button: 'filter-grid',
            description: 'filter-grid-description',
        },
        icon: gridImg,
        updatePos: false,
        getDialog: null,
        apply: null,
        inEmbed: true,
    },
    noise: {
        lang: {
            name: 'filter-noise',
            button: 'filter-noise',
            description: 'filter-noise-description',
        },
        icon: noiseImg,
        updatePos: false,
        getDialog: null,
        apply: null,
        inEmbed: true,
        webGL: true,
    },
    pattern: {
        lang: {
            name: 'filter-pattern',
            button: 'filter-pattern',
            description: 'filter-pattern-description',
        },
        icon: patternImg,
        updatePos: false,
        getDialog: null,
        apply: null,
        inEmbed: true,
    },
    vanishPoint: {
        lang: {
            name: 'filter-vanish-point-title',
            button: 'filter-vanish-point',
            description: 'filter-vanish-point-description',
        },
        icon: vanishPointImg,
        updatePos: false,
        getDialog: null,
        apply: null,
        inEmbed: true,
    },
};
