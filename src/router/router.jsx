import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register/Register";
import DashboardLayout from "../layout/DashboardLayout";
import MyProfile from "../pages/Dashboard/User/MyProfile";
import Agentprofile from "../pages/Dashboard/Agent/Agentprofile";
import AdminProfile from "../pages/Dashboard/Admin/AdminProfile";
import PrivateRoute from "./PrivateRoute";
import AllProperties from "../pages/AllProperties/AllProperties";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import AdminRoute from "./AdminRoute";
import AgentRoute from "./AgentRoute";
import AddProperty from "../pages/Dashboard/Agent/AddProperty";
import MyAddProperties from "../pages/Dashboard/Agent/MyAddProperties";
import MySoldProperties from "../pages/Dashboard/Agent/MySoldProperties";
import RequestedProperties from "../pages/Dashboard/Agent/RequestedProperties";
import UpdateProperty from "../pages/Dashboard/Agent/UpdateProperty";
import ManageProperties from "../pages/Dashboard/Admin/ManageProperties";
import PropertyDetails from "../pages/AllProperties/PropertyDetails";
import Wishlist from "../pages/Dashboard/User/WishList";
import MakeOffer from "../pages/Dashboard/User/MakeOffer";
import PropertyBought from "../pages/Dashboard/User/PropertyBought";
import MyReviews from "../pages/Dashboard/User/MyReviews";
import ManageReviews from "../pages/Dashboard/Admin/ManageReviews ";
import Payment from "../pages/Payments/Payment";
import AdvertiseProperty from "../pages/Dashboard/Admin/AdvertiseProperty";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "allProperties",
        element: (
          <PrivateRoute>
            <AllProperties></AllProperties>
          </PrivateRoute>
        ),
      },
      {
        path: "property-details/:id",
        element: (
          <PrivateRoute>
            <PropertyDetails></PropertyDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),

    children: [
      {
        index: true,
        Component: MyProfile,
      },
      {
        path: "myProfile",
        Component: MyProfile,
      },
      {
        path: "wishlist",
        Component: Wishlist,
      },
      {
        path: "make-offer/:id",
        Component: MakeOffer,
      },
      {
        path: "property-bought",
        Component: PropertyBought,
      },
      {
        path: "payment/:offerId",
        Component: Payment,
      },
      {
        path: "reviews",
        Component: MyReviews,
      },
      {
        path: "agentProfile",
        element: (
          <AgentRoute>
            <Agentprofile></Agentprofile>
          </AgentRoute>
        ),
      },
      {
        path: "addProperty",
        element: (
          <AgentRoute>
            <AddProperty></AddProperty>
          </AgentRoute>
        ),
      },
      {
        path: "/dashboard/update-property/:id",
        element: <UpdateProperty />,
      },
      {
        path: "myAddProperties",
        element: (
          <AgentRoute>
            <MyAddProperties></MyAddProperties>
          </AgentRoute>
        ),
      },
      {
        path: "mySoldProperties",
        element: (
          <AgentRoute>
            <MySoldProperties></MySoldProperties>
          </AgentRoute>
        ),
      },
      {
        path: "requestedProperties",
        element: (
          <AgentRoute>
            <RequestedProperties></RequestedProperties>
          </AgentRoute>
        ),
      },

      {
        path: "adminProfile",
        element: (
          <AdminRoute>
            <AdminProfile></AdminProfile>
          </AdminRoute>
        ),
      },
      {
        path: "manageProperties",
        element: (
          <AdminRoute>
            <ManageProperties></ManageProperties>
          </AdminRoute>
        ),
      },
      {
        path: "manageUser",
        element: (
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        ),
      },
      {
        path: "manage-review",
        element: (
          <AdminRoute>
            <ManageReviews></ManageReviews>
          </AdminRoute>
        ),
      },
      {
        path: "advertise-property",
        element: (
          <AdminRoute>
            <AdvertiseProperty></AdvertiseProperty>
          </AdminRoute>
        ),
      },
    ],
  },
]);
