import { z } from "zod";
import { rooms, type Player } from "@/lib/rooms/store";
import { randomUUID } from "node:crypto";

// joining a room schema, validate username
const joiningRoomSchema = z.object({
  username: z.string().trim().min(2).max(20),
});

export async function POST(
  request: Request,
  { params }: { params: Promise<{ roomId: string }> },
) {
  // read the roomId from the params
  const { roomId } = await params;

  // read data from the request body
  const body = await request.json();
  const result = joiningRoomSchema.safeParse(body); // validate

  if (!result.success) {
    return Response.json({ error: result.error.issues }, { status: 400 });
  }

  // we find the room inside rooms
  const room = rooms.get(roomId);
  if (!room) {
    return Response.json({ error: "Room not found" }, { status: 404 });
  }

  // we check if room can accept more players
  if (room.players.length >= room.maxPlayers) {
    return Response.json({ error: "Room is full" }, { status: 409 });
  }

  // check if username already exists
  const username = result.data.username;
  const usernameExists = room.players.some(
    (player) => player.username.toLowerCase() === username.toLowerCase(),
  );

  if (usernameExists) {
    return Response.json({ error: "Username already exists" }, { status: 409 });
  }

  // create new player
  const newPlayer: Player = {
    id: randomUUID(),
    username,
    joinedAt: new Date().toISOString(),
  };

  // add player to the room
  room.players.push(newPlayer);

  return Response.json(
    { message: "Successfully joined room", room },
    { status: 200 },
  );
}
