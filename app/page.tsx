"use client";

import { useState } from "react";
import CreateRoomForm from "@/components/createRoomForm";
import type { Player, Room } from "@/types/room";

export default function Home() {
  const [room, setRoom] = useState<Room | null>(null);
  const [player, setPlayer] = useState<Player | null>(null);

  function handleRoomCreated(createdRoom: Room) {
    setRoom(createdRoom);

    setPlayer(createdRoom.players[0]);
  }

  // If the user is inside a room
  if (room && player) {
    return (
      <main className="min-h-screen bg-zinc-950 text-white p-8">
        <h1 className="text-3xl font-bold">{room.name}</h1>

        <p className="mt-2 text-zinc-400">Room ID: {room.id}</p>

        <div className="mt-8">
          <h2 className="text-xl font-semibold">Players</h2>

          {room.players.map((roomPlayer) => (
            <div key={roomPlayer.id} className="mt-3">
              {roomPlayer.username}
              {roomPlayer.id === player.id && " (You)"}
            </div>
          ))}
        </div>
      </main>
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
