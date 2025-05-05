"use client";

import { MouseEventHandler, useState } from "react";

interface ToggleButtonOption {
    value: string,
    label: string
}

interface TriangleToggleButtonOptions {
    left: ToggleButtonOption,
    top: ToggleButtonOption,
    right: ToggleButtonOption
}

export type LabelPosition = "TOP" | "BOTTOM" | "LEFT" | "RIGHT" | "" | null;
type ThumbPosClass = "leftOption" | "topOption" | "rightOption";

interface TriangleToggleButtonProps {
    options: TriangleToggleButtonOptions,
    labelPosition: LabelPosition
}

interface TriangleToggleButtonState {
    currOption: ToggleButtonOption,
    thumbPosClass: ThumbPosClass
}

export const TriangleToggleButton = ({
    options,
    labelPosition,

}: TriangleToggleButtonProps) => {
    // Props.
    const { left: leftOption, top: topOption, right: rightOption } = options;

    // State.
    // The current selected option.
    const [ buttonState, setButtonState ] = useState<TriangleToggleButtonState>({
        currOption: leftOption,
        thumbPosClass: "leftOption"
    });
    // Whether or not to apply the transition css. Not applied on the first render.
    const [ applyTransition, setApplyTransition ] = useState<boolean>(false);

    // Gears & Levers.
    const labelPaddingY: number = 1;
    const labelPaddingX: number = 1;

    // Determine classes for the container and label based on labelPosition prop.
    let containerClasses: string = "flex items-center ";
    let labelClasses: string = "";
    switch (labelPosition) {
        case "TOP":
            containerClasses += "flex-col";
            labelClasses += `pb-${labelPaddingY}`;
            break;
        case "BOTTOM":
            containerClasses += "flex-col-reverse";
            labelClasses += `pt-${labelPaddingY}`;
            break;
        case "LEFT":
            containerClasses += "flex-row";
            labelClasses += `pr-${labelPaddingX}`;
            break;
        case "RIGHT":
            containerClasses += "flex-row-reverse";
            labelClasses += `pl-${labelPaddingX}`;
            break;
    }

    const createViableButtonState = (option: ToggleButtonOption): TriangleToggleButtonState => {
        let thumbClass: ThumbPosClass = "leftOption";
        switch (buttonState.currOption) {
            case topOption:
                thumbClass = "topOption";
                break;
            case rightOption:
                thumbClass = "rightOption";
                break;
        }
        
        return {
            currOption: option,
            thumbPosClass: thumbClass
        };
    }

    /**
     * Set the triangle toggle button's state to use the next option, using a round robin in this order: left, top, right.
     */
    const selectNextOption = () => {
        const newState: TriangleToggleButtonState = {
            currOption: topOption,
            thumbPosClass: "topOption"
        };

        switch (buttonState.currOption) {
            case topOption:
                newState.currOption = rightOption;
                newState.thumbPosClass = "rightOption";
                break;
            case rightOption:
                newState.currOption = leftOption;
                newState.thumbPosClass = "leftOption";
                break;
        };

        setButtonState(newState);
    }

    const handleTriangleToggleButtonClick = (/*e: MouseEventHandler<HTMLButtonElement>*/) => {
        // Transitions should be applied from now on.
        if (!applyTransition) setApplyTransition(true);
        selectNextOption();
    };

    return (
        // Container
        <div className={containerClasses}> 
            {/* Label */}
            {labelPosition &&
                <div className={labelClasses}>
                    {buttonState.currOption.label}
                </div>
            }
            {/* Button, which takes the shape of the trianle behind the thumb */}
            <button
                className={`triangle cursor-pointer shadow ${applyTransition && "transition-colors ease-in"}`}
                onClick={handleTriangleToggleButtonClick}
            >
                <div
                    className={`triangle thumb ${buttonState.thumbPosClass} ${applyTransition && "transition-all ease-in"}`}
                />
            </button>
        </div>
    );
}
