import * as Hapi from "@hapi/hapi";
import Routes from "./routes/routes.js";

const init = async () => {
    const server = Hapi.server({
        port: 9000,
        host: 'localhost',
    });

    const routes = new Routes();
    server.route(routes.extractRoutes());

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
}

init();