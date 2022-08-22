import { get } from ".";
import { MenuItem } from "../types/Menu";

const getAllMenuItemsQuery = "/menu/items";

export function getMenuItems(): Promise<MenuItem[]> {
  return get<MenuItem[]>({ path: getAllMenuItemsQuery });
}
