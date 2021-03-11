import { _newOrderPostcodeValidation } from './helperFunctions/icukBroadband/_newOrderPostcodeValidation.js';
import { _errorMessage } from './helperFunctions/_errorMessage.js';
import { _placeBroadbandOrder } from './helperFunctions/icukBroadband/_placeBroadbandOrder.js';
import { _saveAddressData } from './helperFunctions/icukBroadband/_saveAddressData.js';
import { _manageOrderData } from './helperFunctions/icukBroadband/_manageOrderData.js';
import { _termsAndConditions } from './helperFunctions/icukBroadband/_termsAndConditions.js';
import { _getBroadbandAvailability } from './helperFunctions/icukBroadband/_getBroadbandAvailability.js';
import { persistDOMData } from './persistDOMData.js';
import { _fetchOneTouchUsersFromDB } from './helperFunctions/mongoDB/oneTouchManageUsers/_fetchOneTouchUsersFromDB.js';

import { _spinner } from './helperFunctions/_spinner.js';

document.addEventListener('DOMContentLoaded', () => {
  // Persist user data on reload
  const oneTouchDOMBody = sessionStorage.getItem('oneTouchDOMBody') === null;
  const oneTouchBodyName =
    sessionStorage.getItem('oneTouchBodyName') === 'order-new-connection';

  if (!oneTouchDOMBody && oneTouchBodyName) {
    console.log('Page Reloaded');
    const oneTouchDOMBody = document.querySelector('#oneTouchBodyContainer');
    oneTouchDOMBody.innerHTML = sessionStorage.getItem('oneTouchDOMBody');
  }
  // Btn event listeners
  document
    .getElementById('getAddressForPostcodeProvided')
    .addEventListener('click', getAddressForPostcodeProvided);
  document
    .getElementById('oneTouchUsers')
    .addEventListener('click', oneTouchUsers);
});

const getAddressForPostcodeProvided = (ev) => {
  ev.preventDefault();
  _newOrderPostcodeValidation();
};

const oneTouchUsers = (ev) => {
  ev.preventDefault();
  _fetchOneTouchUsersFromDB('order-new-connection');
};

document.querySelector('body').addEventListener('click', (event) => {
  const getBroadbandAvailability =
    event.target.nodeName === 'GETBROADBANDAVAILABILITY';
  const selectOrder = event.target.nodeName === 'SELECTORDER';
  const termsAndConditions = event.target.nodeName === 'TERMSANDCONDITIONS';
  const agreeWithTermsAndConditions =
    event.target.nodeName === 'LABEL' || 'INPUT';
  const oneTouchPlaceOrder = event.target.nodeName === 'ONETOUCHPLACEORDER';
  const userInfo = event.target.nodeName === 'USERINFO';
  const selectUser = event.target.nodeName === 'SELECTUSER';
  // Slider nav functionality
  const goBackBtn = event.target.nodeName === 'GOBACKBTN';

  async function asyncGetBroadbandAvailability(
    fullName,
    email,
    sub_premises,
    premises_name,
    thoroughfare_number,
    thoroughfare_name,
    locality,
    post_town,
    county,
    postcode,
    district_id,
    nad_key
  ) {
    await sessionStorage.setItem('fullName', fullName);
    await sessionStorage.setItem('email', email);
    await sessionStorage.setItem('sub_premises', sub_premises);
    await sessionStorage.setItem('premises_name', premises_name);
    await sessionStorage.setItem('thoroughfare_number', thoroughfare_number);
    await sessionStorage.setItem('thoroughfare_name', thoroughfare_name);
    await sessionStorage.setItem('locality', locality);
    await sessionStorage.setItem('post_town', post_town);
    await sessionStorage.setItem('county', county);
    await sessionStorage.setItem('postcode', postcode);
    await sessionStorage.setItem('district_id', district_id);
    await sessionStorage.setItem('nad_key', nad_key);
    console.log(fullName, email);
    _getBroadbandAvailability();
  }

  // console.log(event.target);
  if (getBroadbandAvailability) {
    _getBroadbandAvailability();
    return;
  }
  if (selectOrder) {
    _manageOrderData(
      event.target.getAttribute('name'),
      event.target.getAttribute('provider'),
      event.target.getAttribute('likely_down_speed'),
      event.target.getAttribute('likely_up_speed'),
      event.target.getAttribute('price'),
      event.target.getAttribute('installation')
    );
    return;
  }
  if (termsAndConditions) {
    _termsAndConditions();
    return;
  }
  if (agreeWithTermsAndConditions && event.target.type === 'checkbox') {
    let checkbox = event.target.checked;
    let oneTouchPlaceOrder = document.querySelector('oneTouchPlaceOrder');

    if (checkbox) {
      oneTouchPlaceOrder.classList.remove('btnDisable');
    } else {
      oneTouchPlaceOrder.classList.add('btnDisable');
    }
  }
  if (oneTouchPlaceOrder) {
    _placeBroadbandOrder();
    return;
  }
  if (userInfo) {
    _errorMessage('User Info', 'warning');
    return;
  }
  if (selectUser) {
    const fullName = event.target.getAttribute('fullName');
    const email = event.target.getAttribute('email');
    const sub_premises = event.target.getAttribute('sub_premises');
    const premises_name = event.target.getAttribute('premises_name');
    const thoroughfare_number = event.target.getAttribute(
      'thoroughfare_number'
    );
    const thoroughfare_name = event.target.getAttribute('thoroughfare_name');
    const locality = event.target.getAttribute('locality');
    const post_town = event.target.getAttribute('post_town');
    const county = event.target.getAttribute('county');
    const postcode = event.target.getAttribute('postcode');
    const district_id = event.target.getAttribute('district_id');
    const nad_key = event.target.getAttribute('nad_key');

    asyncGetBroadbandAvailability(
      fullName,
      email,
      sub_premises,
      premises_name,
      thoroughfare_number,
      thoroughfare_name,
      locality,
      post_town,
      county,
      postcode,
      district_id,
      nad_key
    );
    return;
  }
  if (goBackBtn) {
    const id = event.target.id;
    console.log(event.target.id);
    if (id === 'pageOne') {
      document.querySelector('#oneTouchBroadbandOrderPageTwo').remove();
      document
        .querySelector('#oneTouchBroadbandOrderPageOne')
        .classList.remove('hidden');
    }
    if (id === 'pageTwo') {
      document.querySelector('#oneTouchBroadbandOrderPageThree').remove();
      document
        .querySelector('#oneTouchBroadbandOrderPageTwo')
        .classList.remove('hidden');
    }
    if (id === 'pageThree') {
      document.querySelector('#oneTouchBroadbandOrderPageFour').remove();
      document
        .querySelector('#oneTouchBroadbandOrderPageThree')
        .classList.remove('hidden');
    }
    if (id === 'pageFour') {
      document.querySelector('#oneTouchBroadbandOrderPageFive').remove();
      document
        .querySelector('#oneTouchBroadbandOrderPageFour')
        .classList.remove('hidden');
    }

    persistDOMData('oneTouchBodyContainer', 'order-new-connection');
    return;
  }
});

document.querySelector('body').addEventListener('change', (event) => {
  const saveAddressData = event.target.nodeName === 'SELECT';
  if (saveAddressData) {
    _saveAddressData();
    return;
  }
});
