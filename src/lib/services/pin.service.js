import ConnectDB from "@/config/db.config";
import Save from "@/models/saves.model";
import Pin from "@/models/pin.model";

/**
 * Fetches all pins saved by a specific user.
 * @param {string} userId - The ID of the user whose pins to fetch.
 * @returns {Promise<Array>} - A list of pins.
 */
export async function getSavedPins(userId) {
  try {
    await ConnectDB();

    if (!userId) {
      throw new Error("User ID is required to fetch saved pins.");
    }

    const savedRecords = await Save.find({ user: userId })
      .populate({
        path: "pin",
        select: "-createdAt -updatedAt -__v -user",
      })
      .lean();

    // Extract the pin details and filter out any nulls (if a pin was deleted but the save record remained)
    return savedRecords.map((record) => record.pin).filter(Boolean);
  } catch (error) {
    console.error("Error in getSavedPins service:", error);
    throw error;
  }
}
