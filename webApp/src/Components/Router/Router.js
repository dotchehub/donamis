import LoginPage from "../Pages/LoginPage";
import HomePage from "../Pages/HomePage";
import ItemPage from "../Pages/ItemPage";
import AddItemPage from "../Pages/AddItem";
import Register from "../Pages/Register";
import Logout from "../Logout/Logout";
import UserHandler from "../Pages/admin/UserHandler";
import MesOffres from "../Pages/MesOffres";
import MemberList from "../Pages/admin/MemberList";
import MyItems from "../Pages/myItems";
import UpdateItem from "../Pages/UpdateItem";
import PickRecipient from "../Pages/PickRecipient";
import MonProfile from "../Pages/MyProfilePage";
// Configure your routes here
const routes = {
  '/': HomePage,
  "/login": LoginPage,
  "/logout": Logout,
  '/item': ItemPage,
  '/register': Register,
  '/additem': AddItemPage,
  '/userhandeler': UserHandler,
  '/mesOffres': MesOffres,
  '/memberList': MemberList,
  '/monProfile': MonProfile,
  '/myitems': MyItems,
  '/updateitem': UpdateItem,
  '/pickrecipient': PickRecipient,
};

/**
 * Deal with call and auto-render of Functional Components following click events
 * on Navbar, Load / Refresh operations, Browser history operation (back or next) or redirections.
 * A Functional Component is responsible to auto-render itself : Pages, Header...
 */

const Router = () => {
  /* Manage click on the Navbar */
  let navbarWrapper = document.querySelector("#navbarWrapper");
  navbarWrapper.addEventListener("click", (e) => {
    // To get a data attribute through the dataset object, get the property by the part of the attribute name after data- (note that dashes are converted to camelCase).
    let uri = e.target.dataset.uri;
    console.log(uri);
    if (uri) {
      e.preventDefault();
      /* use Web History API to add current page URL to the user's navigation history
       & set right URL in the browser (instead of "#") */
      window.history.pushState({}, uri, window.location.origin + uri);
      /* render the requested component
      NB : for the components that include JS, we want to assure that the JS included
      is not runned when the JS file is charged by the browser
      therefore, those components have to be either a function or a class*/
      const componentToRender = routes[uri];
      if (routes[uri]) {
        componentToRender();
      } else {
        throw Error("The " + uri + " ressource does not exist");
      }
    }
  });

  /* Route the right component when the page is loaded / refreshed */
  window.addEventListener("load", (e) => {
    const componentToRender = routes[window.location.pathname];
    if (!componentToRender) {
      throw Error(
          "The " + window.location.pathname + " ressource does not exist."
      );
    }

    componentToRender();
  });

  // Route the right component when the user use the browsing history
  window.addEventListener("popstate", () => {
    const componentToRender = routes[window.location.pathname];
    componentToRender();
  });
};

/**
 * Call and auto-render of Functional Components associated to the given URL
 * @param {*} uri - Provides an URL that is associated to a functional component in the
 * routes array of the Router
 */



const Redirect = (uri, params) => {
  // use Web History API to add current page URL to the user's navigation history & set right URL in the browser (instead of "#")
  if (params) {
    var url = window.location.origin + uri + "?";

    var i = 0;
    while (i < params.length) {
      url += params[i].key + "=" + params[i].value;
      i++;
      if (i < params.length) {
        url += "&";
      }
    }
    window.history.pushState({}, uri, url);

  } else {
    window.history.pushState({}, uri, window.location.origin + uri)
  }

  // render the requested component

  const componentToRender = routes[uri];
  if (routes[uri]) {
    componentToRender();
  } else {
    throw Error("The " + uri + " ressource does not exist");
  }
};

export {Router, Redirect};
