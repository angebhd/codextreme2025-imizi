const { Server } = require("socket.io");
const Location = require("../models/Location");
const User = require("../models/User"); // Ensure your User model has family info

module.exports = (server) => {
  const io = new Server(server, { cors: { origin: "*" } });

  io.on("connection", async (socket) => {
    console.log("User connected:", socket.id);

    // Handle joining a family room
    socket.on("joinFamily", async ({ userId }) => {
      const user = await User.findById(userId);
      if (!user || !user.family) return;

      const familyRoom = `family_${user.family}`;
      socket.join(familyRoom);
      console.log(`User ${userId} joined room: ${familyRoom}`);
    });

    // Handle location updates
    socket.on("updateLocation", async ({ userId, latitude, longitude }) => {
      if (!userId) return;

      // Save/update location in DB
      await Location.findOneAndUpdate(
        { userId },
        { latitude, longitude, timestamp: new Date() },
        { upsert: true }
      );

      // Get user's family info
      const user = await User.findById(userId);
      if (!user || !user.family) return;

      const familyRoom = `family_${user.family}`;
      io.to(familyRoom).emit("locationUpdated", { userId, latitude, longitude });

      console.log(`Sent location update for user ${userId} to room ${familyRoom}`);
    });

    // Handle disconnection
    socket.on("disconnect", () => console.log(" User disconnected:", socket.id));
  });
};
