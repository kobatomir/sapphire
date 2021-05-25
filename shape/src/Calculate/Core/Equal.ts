import { Coordinate } from "ol/coordinate";

export function Equal(a: Coordinate, b: Coordinate) {
    return a[0] === b[0] && a[1] === b[1];
}