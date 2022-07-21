import { Coordinatee, ShipPosition } from "../components/commons/types";

export const convertPositionsToBackendPositions = (positions: ShipPosition[]) => {
    return positions.map(position => position.blocksOccupied?.map(block => convertNumberToCoordinates(block)).flat())
}

export const convertNumberToCoordinates = (number: number) => {
    return {x: Math.floor(number % 10), y: Math.floor(number / 10)}
}

export const convertCoordinateToNumber = (coordinate: Coordinatee) => {
    return coordinate.y * 10 + coordinate.x
}

export const getShipPositions = (positions: Coordinatee[]):ShipPosition => {
    return {
        blocksOccupied: positions.map(pos => convertCoordinateToNumber(pos)),
        shifted: positions[0].y !== positions[1].y,
        shipLength: positions.length
    }
}
