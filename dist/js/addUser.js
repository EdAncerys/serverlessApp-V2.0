import { _fetchUserAddress } from './_helperFunctions/mongoDB/oneTouchAddUsers/_fetchUserAddress.js';
import { _handleUserAddressSelection } from './_helperFunctions/mongoDB/oneTouchAddUsers/_handleUserAddressSelection.js';
import { _saveAddressData } from './_helperFunctions/_icukBroadband/_saveAddressData.js';
import { _errorMessage } from './_helperFunctions/_errorMessage.js';

document.addEventListener('DOMContentLoaded', () => {
  document
    .getElementById('userAddressSearch')
    .addEventListener('click', userAddressSearch);
});

const userAddressSearch = (ev) => {
  ev.preventDefault();
  _fetchUserAddress();
};

document.querySelector('body').addEventListener('click', (event) => {
  const selectUserAddress = event.target.nodeName === 'SELECTUSERADDRESS';
  const goBackBtn = event.target.nodeName === 'GOBACKBTN';

  // console.log(event.target);
  if (selectUserAddress) {
    const userSelection = document.getElementById('selectedAddress').value;
    if (userSelection !== 'userSelection') {
      _handleUserAddressSelection();
    } else {
      _errorMessage('Please Select User Address From The List Provided!');
    }
    return;
  }
  if (goBackBtn) {
    document.querySelector('#selectAddressContainer').remove();
    document.querySelector('#userPostcodeContainer').classList.remove('hidden');
    document.querySelector('#postcode').value = '';
    return;
  }
});

document.querySelector('body').addEventListener('change', (event) => {
  const saveAddressData = event.target.nodeName === 'SELECT';
  if (saveAddressData) {
    _saveAddressData();
    console.log(event.target);
    return;
  }
});
