import { Coordinatee, ShipPosition } from "../components/commons/types";

export const convertPositionsToBackendPositions = (positions: ShipPosition[]) => {
    return positions.map(position => position.blocksOccupied?.map(block => ({x: Math.floor(block % 10), y: Math.floor(block / 10)})).flat())
}

export const convertCoordinateToNumber = (coordinate: Coordinatee) => {
    return coordinate.y * 10 + coordinate.x
}

export const getShipPositions = (positions: Coordinatee[]):ShipPosition => {
    return {
        blocksOccupied: positions.map(pos => convertCoordinateToNumber(pos)),
        shifted: positions[0].y === positions[1].y,
        shipLength: positions.length
    }
}
