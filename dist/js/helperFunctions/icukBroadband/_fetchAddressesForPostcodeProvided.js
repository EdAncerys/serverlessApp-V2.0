import { persistDOMData } from '../../persistDOMData.js';
import { _errorMessage } from '../_errorMessage.js';
import { _sortAddresses } from './_sortAddresses.js';
import { _spinner } from '../_spinner.js';

async function _fetchAddressesForPostcodeProvided(postcode) {
  console.log('Fetching addresses for postcode provided...');
  _spinner(true);
  const URL = '/oneTouch/icUK/addressesForPostcodeProvided';

  const body = {
    postcode: postcode,
  };
  console.log(body);

  const config = {
    method: 'POST',
    body: JSON.stringify(body),
  };
  console.log(config);

  // Removing user previous data
  const removeData = document.querySelector('#oneTouchCustomerList');
  if (removeData) removeData.remove();

  const oneTouchBroadbandContainer = document.querySelector(
    '#oneTouchBroadbandContainer'
  );
  const oneTouchBroadbandOrderPageOne = document.querySelector(
    '#oneTouchBroadbandOrderPageOne'
  );
  const orderAddressContainer = document.createElement('div');
  orderAddressContainer.id = 'oneTouchCustomerList';

  try {
    const response = await fetch(URL, config);
    console.log(response);
    if (!response.ok) throw new Error(response.statusText);

    const data = await response.json();
    console.log(data);
    let value = 0;

    if (data.message === 'Request failed with status code 403') {
      console.log('IP not whitelisted...');
      _errorMessage('IP not whitelisted');
      _spinner(false);
      return;
    }
    if (data.addresses.length === 0) {
      _errorMessage('Provided postcode not valid');
      _spinner(false);
      return;
    }

    let sortedJASON = _sortAddresses(data, 'thoroughfare_number', true);

    let content = sortedJASON.map((address) => {
      let thoroughfare_number =
        address.thoroughfare_number === null ? '' : address.thoroughfare_number;
      let premises_name =
        address.premises_name === null ? '' : address.premises_name;
      let sub_premises =
        address.sub_premises === null ? '' : address.sub_premises;
      let thoroughfare_name =
        address.thoroughfare_name === null ? '' : address.thoroughfare_name;
      let county = address.county === null ? '' : address.county;
      let postcode = address.postcode;

      value += 1;
      return `<option value="${value}"
                thoroughfare_number="${address.thoroughfare_number}" 
                thoroughfare_name="${address.thoroughfare_name}" 
                premises_name="${address.premises_name}" 
                sub_premises="${address.sub_premises}"
                locality="${address.locality}" 
                post_town="${address.post_town}" 
                county="${address.county}"  
                postcode="${address.postcode}"  
                district_id="${address.district_id}"
                nad_key="${address.nad_key}"    
                >${thoroughfare_number} ${premises_name} ${sub_premises} ${thoroughfare_name} ${county} ${postcode}</option>`;
    });
    _spinner(false);

    orderAddressContainer.innerHTML = `<div class='alignHorizontally'>
                                        <div class='boxContainer addressSearchContainer bgGradientSilver'>
                                          <div class='oneTouchIcon'></div>
                                          <div class='alignHorizontally'>
                                            <div class='fontH4'>Please Choose Address</div>
                                            <div class='fontH2'>Postcode provided: ${postcode}</div>
                                          </div>
                                          <select id="selectedAddress" name="selectedAddress">
                                            <option selected disabled hidden value='selectAddress'>Please Choose Your Address</option>
                                            ${content}
                                          </select>
                                          <getBroadbandAvailability class="btnOneTouch bgPrimary" role="button">
                                            Check Availability
                                          </getBroadbandAvailability>
                                        </div>
                                      <div>
                                      <div class='navComponent'>
                                        <goPageBack id='pageOne' class="btnOneTouch btnBack" role="button">
                                          Go Back
                                        </goPageBack>
                                      </div>`;

    oneTouchBroadbandContainer.appendChild(orderAddressContainer);
    oneTouchBroadbandOrderPageOne.classList.add('hidden');
    const endPoint = location.href.split('/').slice(-1)[0];
    persistDOMData(endPoint);
  } catch (err) {
    console.log(err);
    _errorMessage(err);
    _spinner(false);
  }
}

export { _fetchAddressesForPostcodeProvided };
