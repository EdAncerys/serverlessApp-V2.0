import { _deleteOneTouchUser } from '../mongoDB/_deleteOneTouchUser.js';
import { _errorMessage } from '../_errorMessage.js';
import { _spinner } from '../_spinner.js';

async function _oneTouchUsers() {
  console.log('Fetching users from db...');
  _spinner(true);
  const URL = '/oneTouch/users';
  const oneTouchUsers = document.querySelector('oneTouchUsers');

  const response = await fetch(URL);
  const data = await response.json();
  console.log(data);

  let userData = '';
  data.map((user) => {
    userData += `<div class="boxContainer hoverBackground">
                    <div class="dataContainer">
                      <div class="userDataContainer">
                        <div class="tableCell">${user.name}</div>
                        <div class="tableCell">${user.email}</div>
                      </div>
                      <div class="manageUserDataComponent">
                        <btnDeleteUser id='${user._id}' value='${user._id}' class="btnB01" role="button">
                          More
                        </btnDeleteUser>
                        <btnDeleteUser id='${user._id}' value='${user._id}' class="btnB01" role="button">
                          Update
                        </btnDeleteUser>
                          <btnDeleteUser id='${user._id}' value='${user._id}' class="btnB01" role="button">
                          Delete
                        </btnDeleteUser>
                      </div>
                    </div>
                  </div>`;
  });

  oneTouchUsers.innerHTML = `<div class="boxContainer font_2 backgroundSecondary colorWhite">
                              <div class="userDataContainer">
                                <div class="tableCell">Name</div>
                                <div class="tableCell">Email</div>
                              </div>
                              ${userData}
                            </div>`;

  // document // Manage btn
  //   .getElementById('oneTouchUserTable')
  //   .addEventListener('click', (event) => {
  //     const isButton = event.target.nodeName === 'BTNDELETEUSER';

  //     if (!isButton) {
  //       return;
  //     }

  //     _deleteOneTouchUser(event.target.id);
  //   });

  _spinner(false);

  // fetch(URL)
  //   .then((res) => res.json())
  //   .then((data) => {
  //     _spinner(false);
  //     let list = '';

  //     data.map((user) => {
  //       list += `<div class="alignHorizontally">
  //                 <div class="boxContainer hoverBackground">
  //                   <div class="tableRowNo5">
  //                     <div class="tableCell">${user.name}</div>
  //                     <div class="tableCell">${user.username}</div>
  //                     <div class="tableCell">${user.phone}</div>
  //                     <div class="tableCell">${user.email}</div>
  //                     <div class="tableCell">
  //                       <btnDeleteUser id='${user._id}' value='${user._id}' class="btnOneTouch_V01" role="button">
  //                         Delete
  //                       </btnDeleteUser>
  //                     </div>
  //                   </div>
  //                 </div>
  //               </div>`;
  //     });

  //     oneTouchUsers.innerHTML = `<div class="alignHorizontally">
  //                                 <div id='oneTouchUserTable' class="boxContainer width_90 height_40">
  //                                   <div class="boxContainer font_2 backgroundSecondary colorWhite">
  //                                     <div class="tableRowNo5">
  //                                       <div class="tableCell">Name</div>
  //                                       <div class="tableCell">Username</div>
  //                                       <div class="tableCell">Phone</div>
  //                                       <div class="tableCell">Email</div>
  //                                       <div class="tableCell">Delete User</div>
  //                                     </div>
  //                                   </div>
  //                                   ${list}
  //                                 </div>
  //                               </div>`;

  //     document
  //       .getElementById('oneTouchUserTable')
  //       .addEventListener('click', (event) => {
  //         const isButton = event.target.nodeName === 'BTNDELETEUSER';

  //         if (!isButton) {
  //           return;
  //         }

  //         _deleteOneTouchUser(event.target.id);
  //       });

  //     console.log(data);
  //   })
  //   .catch((err) => {
  //     _spinner(false);
  //     _errorMessage(err);
  //     console.log(err);
  //   });
}

export { _oneTouchUsers };
