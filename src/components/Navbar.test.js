import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Navbar } from "./Navbar";

configure({ adapter: new Adapter() });

describe("<Navbar />", () => {
  it("should count nav links to 3 when authenticated", async () => {
    const wrapper = shallow(<Navbar isAuthenticated={true} />);
    expect(wrapper.find(".nav-item")).toHaveLength(3);
  });
});

//TEST CASES BEFORE USING REDUX AUTHENTICATION
//AUTHCONTEXT TEST CASES
//TESTING FOR NAV ITEMS WHEN USER AUTHENTICATED

// it("should count nav links to 3 when authenticated", async () => {
//   jest.spyOn(MyContextModule, "useAuthContext").mockImplementation(() => ({
//     currentUser: { userId: true },
//     logout: () => {},
//     login: () => {},
//   }));

//   const wrapper = shallow(
//     <AuthContext.Provider>
//       <Navbar />
//     </AuthContext.Provider>
//   ).dive();
//   expect(wrapper.find(".nav-item")).toHaveLength(3);
// });

// it("should count nav links to 2 when un-authenticated", async () => {
//   jest.spyOn(MyContextModule, "useAuthContext").mockImplementation(() => ({
//     currentUser: { userId: false },
//     logout: () => {},
//     login: () => {},
//   }));

//   const wrapper = shallow(
//     <AuthContext.Provider>
//       <Navbar />
//     </AuthContext.Provider>
//   ).dive();
//   expect(wrapper.find(".nav-item")).toHaveLength(2);
// });
