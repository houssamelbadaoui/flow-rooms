import { z } from "zod";
import { randomUUID } from "node:crypto";

// define types
type Player = {
  id: string;
  username: string;
  joinedAt: string;
};

type Room = {
  id: string;
  name: string;
  players: Player[];
  maxPlayers: number;
  createdAt: string;
};

const rooms = new Map<string, Room>(); // a temporary storage for created rooms

// define room schema
const createRoomSchema = z.object({
  username: z.string().trim().min(2).max(20),
  roomName: z.string().trim().min(3).max(40),
});

// POST handler to create a room
export async function POST(request: Request) {
  const body = await request.json(); // read tge body

  // validate data using zod
  const result = createRoomSchema.safeParse(body);

  if (!result.success) {
    return Response.json({ error: result.error.issues }, { status: 400 });
  }

  // retrieve data
  const { username, roomName } = result.data;

  // create player
  const player: Player = {
    id: randomUUID(),
    username,
    joinedAt: new Date().toISOString(),
  };

  // create new room
  const room: Room = {
    id: randomUUID(),
    name: roomName,
    players: [player],
    maxPlayers: 10,
    createdAt: new Date().toISOString(),
  };

  // store the room inside MAP
  rooms.set(room.id, room);

  return Response.json(
    {
      message: "Room created successfully",
      room,
    },
    { status: 201 },
  );
}
