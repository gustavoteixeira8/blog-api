import 'reflect-metadata';
import express, { json, Router, urlencoded } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import http from 'http';
import { appConfig } from '@config/app';
import { closeConnectionDatabase, connectDatabase } from '../database';
import { setupRoutes } from './routes/index.routes';
import { logger } from '@shared/log';
import { corsConfig } from '@config/cors';

export class Server {
  private _app = express();
  private _server?: http.Server;
  private static _instance?: Server;

  static get instance(): Server {
    if (!this._instance) {
      this._instance = new Server();
    }
    return this._instance;
  }

  private constructor() {
    //
  }

  private setupRoutes(routes: Router): void {
    this._app.use(routes);
  }

  private setupMiddlewares(): void {
    this._app.use(cors(corsConfig));
    this._app.use(helmet());
    this._app.use(urlencoded({ extended: true }));
    this._app.use(json());
  }

  public async start(): Promise<void> {
    await connectDatabase();
    this.setupMiddlewares();
    this.setupRoutes(setupRoutes());
    this._server = http.createServer(this._app);
    this._server.listen(appConfig.serverPort, () =>
      logger.info('Server listening on port -> ' + appConfig.serverPort),
    );
  }

  public async close(): Promise<void | never> {
    await closeConnectionDatabase();

    if (this._server) {
      await new Promise((resolve, reject) => {
        this._server?.close((error) => (error ? reject(error) : resolve(null)));
      });
    }
  }
}
