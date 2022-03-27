import { SpaceProps } from "styled-system";
export declare const scales: {
    readonly SM: "sm";
    readonly MD: "md";
    readonly LG: "lg";
};
export declare type Scales = typeof scales[keyof typeof scales];
export interface TextareaProps extends SpaceProps {
    scale?: Scales;
    isSuccess?: boolean;
    isWarning?: boolean;
}
