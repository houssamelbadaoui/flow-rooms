import type { Room } from "@/types/room";

type CreateRoomInput = {
  userName: string;
  roomName: string;
};

type CreateRoomResponse = {
  message: string;
  room: Room;
};

export async function createRoom(
  data: CreateRoomInput,
): Promise<CreateRoomResponse> {
  // send request to the api endpoint
  const response = await fetch("/api/rooms", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      typeof result.error === "string" ? result.error : "Could not create room",
    );
  }

  return result as CreateRoomResponse;
}
