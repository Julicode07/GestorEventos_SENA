import { PoolConnection } from "mariadb";
import { getConnection, pool } from "../../db/connection";
import { ISpaceInventory } from "./models";

export async function createSpaceInventory(
  spaceInventoryData: ISpaceInventory
): Promise<number> {
  const connection: PoolConnection = await getConnection(pool);
  try {
    const result = await connection.query(
      `
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
        console.log(`[inventory repository]: INVENTORY INSERTED SUCCESSFULLY.`);
        return 1;
      default:
        console.error(
          `[inventory repository]: ERROR CREATING spaces_inventory`
        );
        return -1;
    }
  } catch (err) {
    console.error(`[inventory repository]: ${err}`);
    return -1;
  } finally {
    connection.release();
  }
}

export async function getSpaceInventory(): Promise<number> {
  const connection: PoolConnection = await getConnection(pool);
  try {
    const result = await connection.query(`
      SELECT 
          *
      FROM
          space_inventory
          INNER JOIN spaces 
          ON space_inventory.id_space = spaces.id_space`);
    return result.length == 0 ? [] : result;
  } catch (err) {
    console.log(`[inventory repository]: ERROR GETTING INVENTORY: ${err}`);
    return -1;
  } finally {
    connection.release();
  }
}
