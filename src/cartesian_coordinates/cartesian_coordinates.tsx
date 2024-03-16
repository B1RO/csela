import { MeasureDiv } from "./measure_div";
import { CartesianCoordinatesPresentational } from "./cartesian_corodinates_presentational";
import styled from 'styled-components';
import { UsePanState, usePan } from "./use_pan.tsx";
import { Vec2 } from "../Vec2.tsx";
import { useState } from "react";


const RootDiv = styled(MeasureDiv)`
    width : 100%;
    height : 100%;
`;


export type CartesianCoordiantesState = UsePanState & { width: number, height: number, zoom : number }


export function CartesianCoordinates(props: { children?: React.ReactNode, initialOffset? : Vec2}) {
    const [panState, callbacks] = usePan(props.initialOffset);
    const [zoom, setZoom] = useState(1);

    const handleWheel = (event: React.WheelEvent) => {
        event.stopPropagation();
        const zoomFactor = 0.01; // Determines how much we zoom with each wheel event
        const direction = event.deltaY < 0 ? 1 : -1; // Determines zoom in or out
        setZoom(prevZoomLevel => Math.max(prevZoomLevel + (zoomFactor * direction), 0.1)); // Update zoom level, prevent zooming out too much
    };

    return (
        <RootDiv onWheel={handleWheel}>
            {({ width, height }) => {
                return <CartesianCoordinatesPresentational callbacks={callbacks} state={{ ...panState, width, height, zoom : zoom }} >
                    {props.children}
                </CartesianCoordinatesPresentational>
            }}
        </RootDiv>
    );
}
