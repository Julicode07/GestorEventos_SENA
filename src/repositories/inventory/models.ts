import { PoolConnection } from "mariadb";
import { getConnection, pool } from "../../db/connection";

export interface ISpaceInventory {
  id_inventory: number | undefined;
  id_space: number | undefined;
  article_name: string;
  description: string;
  quantity: number;
  type: string;
}

export async function createSpaceInventorySchema(): Promise<Number> {
  const connection: PoolConnection = await getConnection(pool);
  try {
    await connection.query(`CREATE TABLE IF NOT EXISTS space_inventory (
            id_inventory INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
            id_space INT NOT NULL,
            article_name VARCHAR(64) NOT NULL,
            description VARCHAR(255),
            quantity INT NOT NULL,
            type VARCHAR(45) NOT NULL,
            CONSTRAINT fk_space_inventory_has_space FOREIGN KEY (id_space) REFERENCES spaces(id_space)`);
    console.log(
      `[inventory repository - models]: CREATED space inventory SCHEMA.`
    );
    return 1;
  } catch (err) {
    console.error(
      `[inventory repository - models]: ERROR CREATING space inventory SCHEMA: ` +
        err
    );
    return -1;
  } finally {
    connection.release();
  }
}
