"use client";

import { useState } from "react";
import CreateRoomForm from "@/components/createRoomForm";
import type { Player, Room } from "@/types/room";
import RoomView from "@/components/rooms/RoomView";
import { leaveRoom } from "@/lib/api/room";
import { buffer } from "stream/consumers";

export default function Home() {
  const [room, setRoom] = useState<Room | null>(null);
  const [player, setPlayer] = useState<Player | null>(null);
  const [leaveError, setLeaveError] = useState("");

  function handleRoomCreated(createdRoom: Room) {
    setRoom(createdRoom);

    setPlayer(createdRoom.players[0]);
  }

  // handle leave room
  async function handleLeaveRoom() {
    if (!room || !player) return;

    try {
      setLeaveError("");

      await leaveRoom(room.id, player.id);

      setRoom(null);
      setPlayer(null);
    } catch (error) {
      setLeaveError(
        error instanceof Error ? error.message : "Could not leave room",
      );
    }
  }

  // If the user is inside a room
  if (room && player) {
    return (
      <>
        {leaveError && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
            {leaveError}
          </div>
        )}

        <RoomView room={room} player={player} onLeave={handleLeaveRoom} />
      </>
    );
  }

  // Landing page
  return (
    <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-center">Flow Rooms</h1>

        <p className="mt-3 text-center text-zinc-400">
          Create a room and connect with others.
        </p>

        <section className="mt-10 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="text-xl font-semibold mb-6">Create a new room</h2>

          <CreateRoomForm onRoomCreated={handleRoomCreated} />
        </section>
      </div>
    </main>
  );
}
