"use client";

import { useState } from "react";

interface TriangleToggleButtonValues {
    left: string,
    top: string,
    right: string
}

export type LabelPosition = "TOP" | "BOTTOM" | "LEFT" | "RIGHT" | "" | null;

interface TriangleToggleButtonProps {
    values: TriangleToggleButtonValues,
    labelPosition: LabelPosition
}

export const TriangleToggleButton = ({
    values,
    labelPosition,

}: TriangleToggleButtonProps) => {
    // Props.
    const { left: leftValue, top: topValue, right: rightValue } = values;

    // State.
    const [ label, setLabel ] = useState<string>("");

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

    return (
        // Container
        <div className={containerClasses}> 
            {/* Label */}
            {labelPosition &&
                <div className={labelClasses}>
                    {label}
                </div>
            }
            {/* Button, which takes the shape of the trianle behind the thumb */}
            <button className="triangle bg-red-700">
                
            </button>
        </div>
    );
}
