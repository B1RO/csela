import React, { useState, useCallback, useContext } from 'react';
import { Vec2 } from '../Vec2';
import { CartesianCoordinateContext } from './cartesian_coordinate_context';
import { getTransformFromImageSpace, getTransformToImageSpace } from './getTransformToImageSpace';

export interface PointProps {
    initialPos: Vec2;
    onDrag?: (pos: Vec2) => void;
}

export const Point: React.FC<PointProps> = ({ initialPos, onDrag }) => {
    const panState = useContext(CartesianCoordinateContext);
    const toImageSpace = getTransformToImageSpace(panState)
    const fromImageSpace = getTransformFromImageSpace(panState)
    const [position, setPosition] = useState(toImageSpace(initialPos));

    const [isDragging, setIsDragging] = useState(false);

    const handleDragStart = useCallback((event: React.MouseEvent<SVGCircleElement, MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();
        setIsDragging(true);
    }, []);

    const handleDragEnd = useCallback((event: React.MouseEvent<SVGCircleElement, MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleDragMove = useCallback((event: React.MouseEvent<SVGCircleElement, MouseEvent>) => {
        if (isDragging) {
            const svgElement = event.currentTarget.ownerSVGElement;
            if (!svgElement) return;

            const rect = svgElement.getBoundingClientRect();
            const x = ((event.clientX - rect.left - panState.offset[0]) - (panState.width / 2))/panState.zoom;
            const y = ((event.clientY - rect.top - panState.offset[1]) - (panState.height / 2))/panState.zoom;

            setPosition([x, y]);
            // onDrag?.(fromImageSpace([x,y]));
        }
        event.preventDefault()
        event.stopPropagation();
    }, [isDragging, onDrag]);

    return (
        <>
            <circle
                cx={position[0]}
                cy={position[1]}
                r="10"
                fill="#E91E63"
            />
            <circle
                cx={position[0]}
                cy={position[1]}
                r="50"
                fill="transparent"
                onMouseDown={handleDragStart}
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
            />
        </>
    );
};
