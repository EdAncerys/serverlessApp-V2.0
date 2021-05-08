import { persistDOMData } from './persistDOMData.js';
import { _deleteOneTouchBroadband } from './helperFunctions/mongoDB/oneTouchBroadband/_deleteOneTouchBroadband.js';
import { _errorMessage } from './helperFunctions/_errorMessage.js';
import { _oneTouchAllPlacedOrders } from './helperFunctions/mongoDB/oneTouchBroadband/_oneTouchAllPlacedOrders.js';
import { _oneTouchPendingContractInfo } from './helperFunctions/mongoDB/oneTouchContracts/_oneTouchPendingContractInfo.js';

document.addEventListener('DOMContentLoaded', () => {
  // Persist user data on reload
  const endPoint = location.href.split('/').slice(-1)[0];
  const oneTouchDOMBody = sessionStorage.getItem('oneTouchDOMBody') === null;
  const oneTouchPageName =
    sessionStorage.getItem('oneTouchPageName') === endPoint;

  if (!oneTouchDOMBody && oneTouchPageName) {
    console.log('Page Reloaded');
    const oneTouchDOMBody = document.querySelector('#oneTouchBodyContainer');
    oneTouchDOMBody.innerHTML = sessionStorage.getItem('oneTouchDOMBody');
  } else {
    console.log('Fetching Orders');
    _oneTouchAllPlacedOrders();
  }
});

const asyncDeletePlacedOrder = async (id) => {
  await _deleteOneTouchBroadband(id);
  await _oneTouchAllPlacedOrders();
};

document.querySelector('body').addEventListener('click', (event) => {
  const orderInfo = event.target.nodeName === 'ORDERINFO';
  const deleteOrder = event.target.nodeName === 'DELETEORDER';
  const placeNewOrder = event.target.nodeName === 'PLACENEWORDER';
  const goBackBtn =
    event.target.nodeName === 'BTNLABEL' || event.target.nodeName === 'INNER';

  let id = event.target.getAttribute('id');

  if (goBackBtn) {
    const oneTouchContracts = document.querySelector('#oneTouchContracts');
    const removeData = document.querySelector('#oneTouchContracts');

    oneTouchContracts.classList.remove('hidden');
    removeData.remove();
    const endPoint = location.href.split('/').slice(-1)[0];
    persistDOMData(endPoint);
  }
  if (orderInfo) {
    _oneTouchPendingContractInfo(id);
  }
  if (deleteOrder) {
    asyncDeletePlacedOrder(id);
  }
  if (placeNewOrder) {
    window.location.replace('/views/oneTouch/connection-checker.html');
  }
});
