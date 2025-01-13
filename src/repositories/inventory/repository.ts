import { PoolConnection } from "mariadb";
import { getConnection, pool } from "../../db/connection";
import { ISpaceInventory } from "./models";

export async function createSpaceInventory(
  spaceInventoryData: ISpaceInventory
): Promise<number> {
  const connection: PoolConnection = await getConnection(pool);
  try {
    await connection.beginTransaction();

    for (const item of Object.values(spaceInventoryData)) {
      await connection.query(
        `
        INSERT INTO 
        space_inventory (id_space, article_name, description, quantity, type)
        VALUES
          (?,?,?,?,?)`,
        [
          item.id_space,
          item.article_name,
          item.description,
          item.quantity,
          item.type,
        ]
      );
    }

    await connection.commit();
    console.log(`[inventory repository]: INVENTORY INSERTED SUCCESSFULLY.`);
    return 1;
  } catch (err) {
    await connection.rollback();
    console.error(`[inventory repository]: ${err}`);
    return -1;
  } finally {
    connection.release();
  }
}
