export type Player = {
  id: string;
  username: string;
  joinedAt: string;
};

export type Room = {
  id: string;
  name: string;
  players: Player[];
  maxPlayers: number;
  createdAt: string;
};

export const rooms = new Map<string, Room>();
