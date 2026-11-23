"use client";

import React, { useState } from "react";
import { createRoom } from "@/lib/api/room";
import type { Room } from "@/types/room";

type CreateRoomFormProps = {
  onRoomCreated: (room: Room) => void;
};

export default function CreateRoomForm({ onRoomCreated }: CreateRoomFormProps) {
  const [username, setUsername] = useState("");
  const [roomName, setRoomName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const result = await createRoom({
        username,
        roomName,
      });

      onRoomCreated(result.room);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex gap-3">
        <label htmlFor="username">Your username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Enter your username"
          minLength={2}
          maxLength={20}
          required
        />
      </div>

      <div className="flex gap-3">
        <label htmlFor="roomName">Room name</label>
        <input
          type="text"
          id="roomName"
          value={roomName}
          onChange={(event) => setRoomName(event.target.value)}
          placeholder="Give your room a name"
          minLength={3}
          maxLength={40}
          required
        />
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create room"}
      </button>
    </form>
  );
}
