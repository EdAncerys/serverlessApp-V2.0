import { persistDOMData } from './persistDOMData.js';
import { _errorMessage } from './helperFunctions/_errorMessage.js';
import { _searchBox } from './helperFunctions/_searchBox.js';
import { _deleteOneTouchBroadband } from './helperFunctions/mongoDB/oneTouchBroadband/_deleteOneTouchBroadband.js';
import { _oneTouchAllPlacedOrders } from './helperFunctions/mongoDB/oneTouchBroadband/_oneTouchAllPlacedOrders.js';
import { _oneTouchContractInfo } from './helperFunctions/mongoDB/oneTouchContracts/_oneTouchContractInfo.js';
import { _oneTouchActivateContract } from './helperFunctions/mongoDB/oneTouchContracts/_oneTouchActivateContract.js';

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
    return;
  }

  console.log('Fetching Orders');
  _oneTouchAllPlacedOrders();
});

const asyncDeleteContract = async (id) => {
  await _deleteOneTouchBroadband(id);
  await _oneTouchAllPlacedOrders();
  return;
};

const asyncActivateContract = async (event) => {
  event.preventDefault();
  _oneTouchActivateContract();
};

document.querySelector('body').addEventListener('click', (event) => {
  const contractInfo = event.target.nodeName === 'CONTRACTINFO';
  const deleteContract = event.target.nodeName === 'DELETECONTRACT';
  const placeNewOrder = event.target.nodeName === 'PLACENEWORDER';
  const activateContract =
    event.target.getAttribute('id') === 'activateContract';
  const goBackBtn =
    event.target.nodeName === 'BTNLABEL' || event.target.nodeName === 'INNER';

  let id = event.target.getAttribute('id');

  if (goBackBtn) {
    sessionStorage.removeItem('oneTouchBroadband');
    const oneTouchContracts = document.querySelector('#oneTouchContracts');
    const removeData = document.querySelector('#oneTouchContractInfo');
    oneTouchContracts.classList.remove('hidden');
    removeData.remove();
    const endPoint = location.href.split('/').slice(-1)[0];
    persistDOMData(endPoint);
  }
  if (contractInfo) {
    _oneTouchContractInfo(id);
  }
  if (deleteContract) {
    asyncDeleteContract(id);
  }
  if (placeNewOrder) {
    window.location.replace('/views/oneTouch/connection-checker.html');
  }
  if (activateContract) {
    asyncActivateContract(event);
  }
});

document.querySelector('body').addEventListener('keyup', (event) => {
  _searchBox()
});
