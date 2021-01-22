import { _warningMessage } from '../_warningMessage.js';
import { _sortAddresses } from './_sortAddresses.js';
import { _saveAddressData } from './_saveAddressData.js';
import { _getBroadbandAvailability } from './_getBroadbandAvailability.js';
import { _spinner } from '../_spinner.js';

const _getAddress = (postcode) => {
  console.log('Fetching addresses for postcode provided...');
  _spinner(true);
  const URL = '/ndg/getAddresses/' + postcode;
  console.log(URL);
  const msg = document.querySelector('msg');
  const msgBroadband = document.querySelector('msgBroadband');

  fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      let value = 0;
      console.log(data);
      if (data.message === 'Request failed with status code 403') {
        console.log('ApiExceptionMessage. Making request for area...');
        msg.innerHTML = _warningMessage('IP not whitelisted');
        return;
      }
      if (data.addresses.length === 0) {
        msg.innerHTML = _warningMessage('Postcode not valid');
      } else {
        let sortedJASON = _sortAddresses(data, 'thoroughfare_number', true);

        let content = sortedJASON.map((address) => {
          let thoroughfare_number =
            address.thoroughfare_number === null
              ? ''
              : address.thoroughfare_number;
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
        msgBroadband.innerHTML = `<h4>Choose your address:</h4>
                          <select name="selectedAddress" id="selectedAddress" style="width:600px">
                            <option selected disabled hidden value='selectionID'>Please Choose Your Address</option>
                            ${content}
                          </select>
                            <button id='getBroadbandAvailability' class="btn btn-danger mt-4" role="button">
                              Check Availability
                            </button>`;

        document
          .getElementById('selectedAddress')
          .addEventListener('change', _saveAddressData);
        document
          .getElementById('getBroadbandAvailability')
          .addEventListener('click', _getBroadbandAvailability);

        // console.log(data.addresses);
        console.log('Done fetching addresses...');
      }
    })
    .catch((err) => {
      let msg = document.querySelector('msg');
      _spinner(false);
      msg.innerHTML = _warningMessage(err);
      console.log(err);
    });
};

export { _getAddress };
