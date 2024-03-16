import React, {useState} from "react";
import { Vec2 } from "../Vec2";

export interface UsePanState {
    offset: Vec2
}

export interface UsePanCallbacks {
    onMouseDown: (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
    onMouseMove: (event: MouseEvent) => void;
    onMouseUp: () => void;
}

export function usePan(initialOffset = [0,0]): [UsePanState, UsePanCallbacks] {
    const [isPanning, setIsPanning] = useState(false);
    const [startPoint, setStartPoint] = useState([0,0]);
    const [offset, setOffset] = useState(initialOffset);
    const [lastOffset, setLastOffset] = useState(initialOffset);

    const onMouseDown = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        setIsPanning(true);
        setStartPoint([event.clientX, event.clientY]);
    };

    const onMouseMove = (event: MouseEvent) => {
        if (!isPanning) return;
        const dx = event.clientX - startPoint[0] + lastOffset[0];
        const dy = event.clientY - startPoint[1] + lastOffset[1];
        setOffset([dx, dy]);
    };

    const onMouseUp = () => {
        setIsPanning(false);
        setLastOffset(offset);
    };

    const state: UsePanState = { offset };
    const callbacks: UsePanCallbacks = { onMouseDown, onMouseMove, onMouseUp };

    return [state, callbacks];
}
