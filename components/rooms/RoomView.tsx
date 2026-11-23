"use client";

import type { Player, Room } from "@/types/room";

type RoomViewProps = {
  room: Room;
  player: Player;
  onLeave: () => void;
};

export default function RoomView({ room, player, onLeave }: RoomViewProps) {
  return (
    <main className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="mx-auto max-w-5xl">
        {/* Room header */}
        <header className="flex items-center justify-between border-b border-zinc-800 pb-6">
          <div>
            <h1 className="text-3xl font-bold">{room.name}</h1>
            <p className="mt-2 text-sm text-zinc-400">Room ID: {room.id}</p>
          </div>

          <button
            onClick={onLeave}
            className="rounded-lg border border-zinc-700 px-4 py-2 text-sm hover:bg-zinc-800 transition"
          >
            Leave room
          </button>
        </header>

        {/* Room content */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-[1fr_260px]">
          {/* Chat area */}
          <section className="flex min-h-[500px] flex-col rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <div>
              <h2 className="text-lg font-semibold">Room chat</h2>
              <p className="mt-1 text-sm text-zinc-500">
                Chat functionality is coming next.
              </p>
            </div>

            <div className="flex flex-1 items-center justify-center">
              <div className="text-center">
                <p className="text-zinc-500">No messages yet</p>
                <p className="mt-2 text-sm text-zinc-600">
                  Start a conversation when chat becomes available.
                </p>
              </div>
            </div>

            {/* Temporary disabled message input */}
            <div className="flex gap-2 border-t border-zinc-800 pt-4">
              <input
                disabled
                placeholder="Chat will be available soon..."
                className="flex-1 rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm outline-none opacity-50"
              />

              <button
                disabled
                className="rounded-lg bg-indigo-600 px-4 py-3 text-sm font-medium opacity-50"
              >
                Send
              </button>
            </div>
          </section>

          {/* Players sidebar */}
          <aside className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">Players</h2>
              <span className="rounded-full bg-zinc-800 px-2.5 py-1 text-xs text-zinc-400">
                {room.players.length}/{room.maxPlayers}
              </span>
            </div>

            <div className="mt-5 flex flex-col gap-3">
              {room.players.map((roomPlayer) => (
                <div
                  key={roomPlayer.id}
                  className="flex items-center gap-3 rounded-lg bg-zinc-800/60 p-3"
                >
                  <div className="flex size-9 items-center justify-center rounded-full bg-indigo-500/15 font-semibold text-indigo-400">
                    {roomPlayer.username.charAt(0).toUpperCase()}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">
                      {roomPlayer.username}
                    </p>

                    <p className="text-xs text-zinc-500">
                      {roomPlayer.id === player.id ? "You" : "Player"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
