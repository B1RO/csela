import React, { useRef, useState } from 'react';
import styled from "styled-components";
import { UsePanCallbacks, UsePanState, usePan } from "./use_pan.tsx";
import { CartesianCoordinateContext } from './cartesian_coordinate_context.tsx';
import { CartesianCoordiantesState } from './cartesian_coordinates.tsx';

export const StyledSvg = styled.svg`
    display : block;
    background-color : #212121;
    width : 100%;
    height : 100%;
    border-radius : 1rem;
`;



export type CartesianCoordinatesPresentationalProps = {
    callbacks: UsePanCallbacks,
    state: CartesianCoordiantesState
    children?: React.ReactNode
};



export function CartesianCoordinatesPresentational(props: CartesianCoordinatesPresentationalProps) {
    const svgRef = useRef<SVGSVGElement>(null);

    const viewBoxWidth = props.state.width / props.state.zoom;
    const viewBoxHeight = props.state.height / props.state.zoom;

    const viewBoxX = -props.state.offset[0] - viewBoxWidth / 2;
    const viewBoxY = -props.state.offset[1] - viewBoxHeight / 2;

    // Adjust the start and end points of the lines based on the offset and zoom level
    const horizontalLineStartX = (-props.state.offset[0] - viewBoxWidth / 2);
    const horizontalLineEndX = (viewBoxWidth / 2 - props.state.offset[0]);
    const verticalLineStartY = (-props.state.offset[1] - viewBoxHeight / 2);
    const verticalLineEndY = (viewBoxHeight / 2 - props.state.offset[1]);

    const tickInterval = 100;

    const startTickY = Math.floor(props.state.offset[1] / (tickInterval));
    const numberOfTicksY = Math.ceil((viewBoxHeight) / tickInterval);


    console.log()

    return (
        <CartesianCoordinateContext.Provider value={props.state}>
            <StyledSvg
                ref={svgRef}
                viewBox={`${viewBoxX} ${viewBoxY} ${viewBoxWidth} ${viewBoxHeight}`}
                onMouseDown={props.callbacks.onMouseDown}
                onMouseMove={props.callbacks.onMouseMove}
                onMouseUp={props.callbacks.onMouseUp}
                onMouseLeave={props.callbacks.onMouseUp}
            >
                {[...Array(Math.ceil((viewBoxWidth + viewBoxX) / tickInterval)).keys()].map(i => {
                    const tickPositionX = (i * tickInterval);
                    return (
                        <line key={`x-line-${i}`} x1={tickPositionX} y1={verticalLineStartY} x2={tickPositionX} y2={verticalLineEndY} stroke="#757575" strokeWidth={1} />
                    );
                })} 
                {[...Array(Math.max(Math.ceil((-viewBoxX) / tickInterval),0)).keys()].map(i => {
                    const tickPositionX = (i * tickInterval);
                    return (
                        <line key={`x-line-${i}`} x1={-tickPositionX} y1={verticalLineStartY} x2={-tickPositionX} y2={verticalLineEndY} stroke="#757575" strokeWidth={1} />
                    );
                })}
                {[...Array(Math.ceil((-viewBoxY) / tickInterval)).keys()].map(i => {
                    const tickPositionY = (i * tickInterval);
                    return (
                        <line key={`y-line-${i}`} x1={horizontalLineStartX} y1={-tickPositionY} x2={horizontalLineEndX} y2={-tickPositionY} stroke="#757575" strokeWidth={1} />
                    );
                })}
                 {[...Array(Math.ceil((viewBoxHeight + viewBoxY) / tickInterval)).keys()].map(i => {
                    const tickPositionY = (i * tickInterval);
                    return (
                        <line key={`y-line-${i}`} x1={horizontalLineStartX} y1={tickPositionY} x2={horizontalLineEndX} y2={tickPositionY} stroke="#757575" strokeWidth={1} />
                    );
                })} 
                <text x={5} y={-5} fill="white" style={{ userSelect: "none" }}>0</text>
                <line x1="0" y1={verticalLineStartY} x2="0" y2={verticalLineEndY} stroke="#F5F5F5" strokeWidth={2 / props.state.zoom} />
                <line x1={horizontalLineStartX} y1="0" x2={horizontalLineEndX} y2="0" stroke="#F5F5F5" strokeWidth={2 / props.state.zoom} />
                {[...Array(Math.max(Math.ceil((viewBoxWidth + viewBoxX) / tickInterval))).keys()].map(i => {
                    const tickPositionX = (i * tickInterval);
                    return (
                        <>{i!=0 && <text key={`x-tick-${i}`} x={tickPositionX} y={-5} stroke="white">{i}</text>}</>
                    );
                })}
                {[...Array(Math.max(Math.ceil((-viewBoxX) / tickInterval),0)).keys()].map(i => {
                    const tickPositionX = (i * tickInterval);
                    return (
                        <>{i!=0 && <text key={`x-tick-${-i}`} x={-tickPositionX} y={-5} stroke="white">{-i}</text>}</>
                    );
                })}
                {[...Array(Math.ceil((-viewBoxY) / tickInterval)).keys()].map(i => {
                    const tickPositionY = (i * tickInterval);
                    return (
                        <>{i!=0 && <text key={`y-tick-${i}`} y={-tickPositionY} x={5} stroke="white">{i}</text>}</>
                    );
                })}
                 {[...Array(Math.ceil((viewBoxHeight + viewBoxY) / tickInterval)).keys()].map(i => {
                    const tickPositionY = (i * tickInterval);
                    return (
                        <>{i!=0 && <text key={`y-tick-${i}`} y={tickPositionY} x={5} stroke="white">{-i}</text>}</>
                    );
                })} 
                {props.children}
            </StyledSvg>
        </CartesianCoordinateContext.Provider>
    );
}

