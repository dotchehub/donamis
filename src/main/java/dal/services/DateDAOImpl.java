package dal.services;

import buiseness.dto.DateDTO;
import buiseness.factory.BizFactory;
import dal.DalBackService;
import jakarta.inject.Inject;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import utils.exception.FatalException;

public class DateDAOImpl implements DateDAO {

  @Inject
  private DalBackService myBackService;

  @Inject
  private BizFactory myBizzService;

  @Override
  public void addDate(int itemId) {
    try (PreparedStatement psDate = myBackService.getPreparedStatement(
        "insert into projet.dates (id_date,_date,item) values (DEFAULT,?,'" + itemId + "')")) {
      psDate.setTimestamp(1, Timestamp.valueOf(LocalDateTime.now()));
      psDate.executeUpdate();
    } catch (Exception e) {
      throw new FatalException(e);
    }
  }

  @Override
  public List<DateDTO> getAllDateItem(int itemId) {
    try (PreparedStatement ps = myBackService.getPreparedStatement(
        "select id_date,_date,item from projet.dates where item = " + itemId)) {
      List<DateDTO> dateDTOList = new ArrayList<>();
      try (ResultSet rs = ps.executeQuery()) {
        while (rs.next()) {
          DateDTO dateDTO = myBizzService.getDate();
          dateDTO.setIdDate(rs.getInt(1));
          dateDTO.setDate(rs.getTimestamp(2));
          dateDTO.setItem(rs.getInt(3));
          dateDTOList.add(dateDTO);
        }
        return dateDTOList;
      }
    } catch (SQLException e) {
      throw new FatalException(e);
    }
  }
}