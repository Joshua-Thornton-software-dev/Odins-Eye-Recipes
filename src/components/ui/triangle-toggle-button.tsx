"use client";

import { useState } from "react";

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

    // Determine classes for the container and label based on labelPosition prop.
    let containerClasses: string = "flex justify-start items-center ";
    let labelWrapperClasses: string = "w-12 sm:w-13 md:14 lg:w-15 flex-shrink-0 ";
    let labelTextClasses: string = "";
    switch (labelPosition) {
        case "TOP":
            containerClasses += "flex-col";
            labelWrapperClasses = "pb-1";
            break;
        case "BOTTOM":
            containerClasses += "flex-col-reverse";
            labelWrapperClasses = "pt-1";
            break;
        case "LEFT":
            containerClasses += "flex-row";
            labelWrapperClasses += "pr-1.5 text-right";
            labelTextClasses += "truncate";
            break;
        case "RIGHT":
            containerClasses += "flex-row-reverse";
            labelWrapperClasses += "pl-1.5 text-left";
            labelTextClasses += "truncate";
            break;
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
        selectNextOption();
    };
    
    return (
        // Container
        <div className={containerClasses}> 
            {/* Label */}
            {labelPosition &&
            <div className={labelWrapperClasses}>
                <div className={labelTextClasses}>
                    {buttonState.currOption.label}
                </div>
            </div>
            }
            {/* Button, which takes the shape of the trianle behind the thumb */}
            <div className="flex-shrink-0 w-5.5 sm:w-6 md:w-6.5 lg:w-7">
                <button
                    className={`triangle cursor-pointer shadow`}
                    onClick={handleTriangleToggleButtonClick}
                >
                    <div
                        className={`triangle thumb ${buttonState.thumbPosClass}`}
                    />
                </button>
            </div>
        </div>
    );
}
