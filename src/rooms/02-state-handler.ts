import { Room, Client } from "colyseus";
import { Schema, type, MapSchema } from "@colyseus/schema";

export class Player extends Schema {
    @type("number")
    positionX = Math.floor(Math.random() * 50) - 25;
    @type("number")
    positionY = 0;
    @type("number")
    positionZ = Math.floor(Math.random() * 50) - 25;

    @type("number")
    velocityX = 0;
    @type("number")
    velocityY = 0;
    @type("number")
    velocityZ = 0;
}

export class State extends Schema {
    @type({ map: Player })
    players = new MapSchema<Player>();

    something = "This attribute won't be sent to the client-side";

    createPlayer(sessionId: string) {
        this.players.set(sessionId, new Player());
    }

    removePlayer(sessionId: string) {
        this.players.delete(sessionId);
    }

    movePlayer (sessionId: string, data: any) {
        this.players.get(sessionId).positionX += data.positionX;
        this.players.get(sessionId).positionY += data.positionY;
        this.players.get(sessionId).positionZ += data.positionZ;

        this.players.get(sessionId).velocityX += data.velocityX;
        this.players.get(sessionId).velocityY += data.velocityY;
        this.players.get(sessionId).velocityZ += data.velocityZ;
    }
}

export class StateHandlerRoom extends Room<State> {
    maxClients = 4;

    onCreate (options) {
        console.log("StateHandlerRoom created!", options);

        this.setState(new State());

        this.onMessage("move", (client, data) => {
            //console.log("StateHandlerRoom received message from", client.sessionId, ":", data);
            this.state.movePlayer(client.sessionId, data);
        });
    }

    onAuth(client, options, req) {
        return true;
    }

    onJoin (client: Client) {
        client.send("hello", "world");
        this.state.createPlayer(client.sessionId);
    }

    onLeave (client) {
        this.state.removePlayer(client.sessionId);
    }

    onDispose () {
        console.log("Dispose StateHandlerRoom");
    }

}
