import { databaseConfig } from '@config/database';
import { ConnectionManager, createConnection } from 'typeorm';

export async function connectDatabase(): Promise<void> {
  await createConnection(databaseConfig.postgres);
}

export async function closeConnectionDatabase(): Promise<void> {
  const connectionManager = new ConnectionManager();

  connectionManager.connections.forEach(async (connection) => await connection.close());
}
