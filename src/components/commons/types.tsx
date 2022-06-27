export interface ShipPosition {
    blocksOccupied?: number[]
    shifted: boolean,
    shipLength: number 
}

export interface Shot {
    block: number,
    hit: boolean
}