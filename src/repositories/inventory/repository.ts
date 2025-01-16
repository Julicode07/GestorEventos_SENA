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

export async function getSpaceInventoryById(id_space: number): Promise<number> {
  const connection: PoolConnection = await getConnection(pool);
  try {
    const result = await connection.query(
      `
        SELECT 
            space_inventory.id_inventory,
            spaces.name,
            space_inventory.article_name,
            space_inventory.description,
            space_inventory.quantity,
            space_inventory.type
        FROM
            space_inventory
            INNER JOIN spaces 
            ON space_inventory.id_space = spaces.id_space
            WHERE spaces.id_space = ?`,
      [id_space]
    );
    return result.length == 0 ? [] : result;
  } catch (err) {
    console.log(`[inventory repository]: ERROR GETTING INVENTORY: ${err}`);
    return -1;
  } finally {
    connection.release();
  }
}

export async function updateSpaceInventoryById(
  id_inventory: number,
  spaceInventoryData: ISpaceInventory
): Promise<Number> {
  const connection: PoolConnection = await getConnection(pool);
  try {
    const result = await connection.query(
      `
      UPDATE 
          space_inventory
      SET
          id_space = IFNULL(?, id_space),
          article_name = IFNULL(?, article_name),
          description = IFNULL(?, description),
          quantity = IFNULL(?, quantity),
          type = IFNULL(?, type)
      WHERE id_inventory = ?`,
      [
        spaceInventoryData.id_space,
        spaceInventoryData.article_name,
        spaceInventoryData.description,
        spaceInventoryData.quantity,
        spaceInventoryData.type,
        id_inventory,
      ]
    );
    if (result.affectedRows > 0) return 1;
    else throw new Error(`Could not update inventory ${id_inventory}`);
  } catch (err) {
    console.error(`[inventory repository]: ${err}`);
    return -1;
  } finally {
    connection.release();
  }
}
