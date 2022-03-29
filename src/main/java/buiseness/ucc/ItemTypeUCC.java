package buiseness.ucc;

import buiseness.dto.ItemTypeDTO;
import java.util.List;

public interface ItemTypeUCC {

  /**
   * call the itemTypeDAO to add the item.
   *
   * @param itemType the itemType
   * @return the itemType id added
   */
  int addItemType(String itemType);

  /**
   * retrives to get all itemType as a list.
   *
   * @return a list of all the itemType
   */
  List<ItemTypeDTO> getAllItemType();
}
