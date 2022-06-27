export interface Coordinates {
    x:number,
    y:number
}

export interface ShipPosition {
    blocksOccupied?: Coordinates[]
    shifted: boolean,
    shipLength: number 
}

export interface Shot {
    block: number,
    hit: boolean
}