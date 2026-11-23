import { rooms } from "@/lib/rooms/store";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ roomId: string; playerId: string }> },
) {
  // read the dynamic route params
  const { roomId, playerId } = await params;

  // find the room
  const room = rooms.get(roomId);
  if (!room) {
    return Response.json({ error: "Room not found" }, { status: 404 });
  }

  // find the player inside the room
  const PlayerIndex = room.players.findIndex(
    (player) => player.id === playerId,
  );

  if (PlayerIndex === -1) {
    return Response.json(
      { error: "Player not found in this room" },
      { status: 404 },
    );
  }

  // remove the player
  room.players.splice(PlayerIndex, 1);

  // delete room if now its empty
  if (room.players.length === 0) {
    rooms.delete(roomId);

    return Response.json({
      message: "Player left. Empty room deleted.",
      roomDeleted: true,
    });
  }

  // Return the updated room information
  return Response.json({
    message: "Successfully left the room",
    roomDeleted: false,
    room,
  });
}
