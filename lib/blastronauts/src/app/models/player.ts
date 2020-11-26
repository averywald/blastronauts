export interface IPlayer {
    id: string;
    body: {};
    health: number;
    ammo: [
        bullets: number,
        rockets: number
    ];
}
