# Architecture

## I. High-Level
The system is a simple client-server architecture. This consists of an express API (server interface) and an angular frontend (client app).  Matter.js is used for the game's physics and rendering; to make the game multiplayer, a canoncial data model of the game is to be kept in the backend.  

Updates are sent bi-directionally between the client and server, but the rendering should be kept to the frontend only.

It makes the most sense (to me) to have the actual physics engine (Matter.Engine) live on the backend, where it can perform the physics computations, and broadcast them to all connected clients (tbd: load-balance with different lobbies?).