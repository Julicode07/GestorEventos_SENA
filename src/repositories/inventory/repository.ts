import { PoolConnection } from "mariadb";
import { getConnection, pool } from "../../db/connection";
import { ISpaceInventory } from "./models";

export async function createSpaceInventory(
  spaceInventoryData: ISpaceInventory
): Promise<number> {
  const connection: PoolConnection = await getConnection(pool);
  try {
    const result = await connection.query(`
      INSERT INTO 
          space_inventory (id_space, article_name, description, quantity, type)
      VALUES
          (?,?,?,?,?)`,
      [
        spaceInventoryData.id_space,
        spaceInventoryData.article_name,
        spaceInventoryData.description,
        spaceInventoryData.quantity,
        spaceInventoryData.type,
      ]
    );
    switch (result.affectedRows) {
      case 1:
        console.log(
          `[inventory repository]: Space inventory ${result.insertId}: INSERTED SUCCESSFULLY.`
        );
        return 1;
      default:
        console.error(`[inventory repository]: ERROR CREATING SPACE INVENTORY`);
        return -1;
    }
  } catch (err) {
    console.error(`[inventory repository]: ${err}`);
    return -1;
  } finally {
    connection.release();
  }
}
