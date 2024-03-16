import { Vec2 } from '../Vec2';
import { CartesianCoordiantesState } from './cartesian_coordinates';


export function getTransformToImageSpace(state: CartesianCoordiantesState) {
    return (pos: Vec2): Vec2 => {
        const xImagespace = (pos[0] * 100);
        const yImagespace = (pos[1] * 100);
        return [xImagespace, yImagespace];
    };
}

export function getTransformFromImageSpace(state: CartesianCoordiantesState) {
    return (pos: Vec2): Vec2 => {
        const xCartesian = (pos[0]) / 100;
        const yCartesian = (pos[1]) / 100;
        return [xCartesian, yCartesian];
    };
}
