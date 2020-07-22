import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { SinglePost } from "./SinglePost";

configure({ adapter: new Adapter() });

describe("<SinglePost />", () => {
  it("should show buttons when user own post", async () => {
    const wrapper = shallow(
      <SinglePost
        onDeletePost={() => {}}
        isAuthenticated={true}
        currentUser={{ _id: "1" }}
        post={{ userId: { _id: "1" } }}
      />
    );
    expect(wrapper.find(".user-controls")).toHaveLength(1);
  });

  // it("receiving authenticated prop", async () => {
  //   const wrapper = shallow(<SinglePost isAuthenticated={true} />);
  //   expect(wrapper.props().isAuthenticated).toEqual(true);
  // });
});

//TESTING FOR USER ACTIONS IF USER OWN POST
// it("should show buttons when user own post", async () => {
//   jest.spyOn(MyContextModule, "useAuthContext").mockImplementation(() => ({
//     currentUser: { userId: 2 },
//     logout: () => {},
//     login: () => {},
//   }));
//   let wrapper;
//   wrapper = shallow(
//     <AuthContext.Provider>
//       <SinglePost />
//     </AuthContext.Provider>
//   ).dive();
//   wrapper.setProps({
//     post: {
//       userId: {
//         _id: 2,
//       },
//     },
//   });
//   expect(wrapper.find(".user-controls")).toHaveLength(1);
// });
