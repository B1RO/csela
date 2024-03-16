import React from 'react';
import { CartesianCoordiantesState } from './cartesian_coordinates';

export const CartesianCoordinateContext = React.createContext<CartesianCoordiantesState>({
    height: 0,
    offset: { x: 0, y: 0 },
    width: 0,
    zoom : 1,
})
