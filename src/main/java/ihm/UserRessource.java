package ihm;

import buiseness.ucc.UserUCC;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.WebApplicationException;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Singleton
@Path("/auths")
public class UserRessource {
  
  /*
   * @Inject
   * private UserDAO myUserDataService;
   */

  @Inject
  private UserUCC myUserUCC;

  /**
   * permet de connecter l'utilisateur.
   *
   * @param user les données que l'utilisateur à entré mise sous format json
   * @return le token associé à l'utilisateur, sinon une erreur en cas d'échec
   */
  @POST
  @Path("login")
  @Consumes(MediaType.APPLICATION_JSON)
  @Produces(MediaType.APPLICATION_JSON)
  public ObjectNode login(JsonNode user) {
    if (!user.hasNonNull("pseudo") || !user.hasNonNull("mdp")) {
      throw new WebApplicationException(Response.status(Response.Status.BAD_REQUEST)
          .entity("login or password required").type("text/plain").build());
    }
    String pseudo = user.get("pseudo").asText();
    String mdp = user.get("mdp").asText();
    ObjectNode token = myUserUCC.seConnecter(pseudo, mdp);
    if (token == null) {
      throw new WebApplicationException();
    }
    return token;
  }
}