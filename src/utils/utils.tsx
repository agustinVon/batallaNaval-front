import { ShipPosition } from "../components/commons/types";

export const convertPositionsToBackendPositions = (positions: ShipPosition[]) => {
    return positions.map(position => position.blocksOccupied?.map(block => ({x: Math.floor(block % 10), y: Math.floor(block / 10)})).flat())
}
