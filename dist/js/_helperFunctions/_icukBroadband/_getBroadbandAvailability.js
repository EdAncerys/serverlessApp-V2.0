import { _errorMessage } from '../_errorMessage.js';
import { _sortBroadbandData } from './_sortBroadbandData.js';
import { _handleBroadbandSelection } from './_handleBroadbandSelection.js';
import { _manageOrderData } from './_manageOrderData.js';
import { _spinner } from '../_spinner.js';

async function _getBroadbandAvailability() {
  console.log('Getting Broadband Availability...');
  _spinner(true);

  const URL = '/ndg/broadbandAvailability';
  const validateInput = document.getElementById('selectedAddress').value;
  const oneTouchOrderSlider = document.querySelector('#oneTouchOrderSlider');
  const broadbandQuoteContainer = document.querySelector(
    '#broadbandQuoteContainer'
  );
  const orderAddressContainer = document.querySelector(
    '#orderAddressContainer'
  );

  if (validateInput === 'selectionID') {
    _spinner(false);
    _errorMessage('Please Choose Address', 'warning');
  } else {
    let body = {
      sub_premises: sessionStorage.getItem('sub_premises'),
      premises_name: sessionStorage.getItem('premises_name'),
      thoroughfare_number: sessionStorage.getItem('thoroughfare_number'),
      thoroughfare_name: sessionStorage.getItem('thoroughfare_name'),
      locality: sessionStorage.getItem('locality'),
      post_town: sessionStorage.getItem('post_town'),
      county: sessionStorage.getItem('county'),
      postcode: sessionStorage.getItem('postcode'),
      district_id: sessionStorage.getItem('district_id'),
      nad_key: sessionStorage.getItem('nad_key'),
    };
    console.log(body);

    const config = {
      method: 'POST',
      body: JSON.stringify(body),
    };

    fetch(URL, config)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.name === 'Error') {
          const err = 'Fall back. No Deals Available for selected address';
          _spinner(false);
          _errorMessage(err, 'warning');
          _getAreaBroadbandAvailability();
          console.log(err);
          return;
        }
        let list = '';
        _sortBroadbandData(data, 'name', true).map((data) => {
          list += `<div class="">
                    <div class="boxContainer hoverBackground">
                      <div class="tableRowBroadbandOrder font_1">
                        <div class="tableCell">${data.name}</div>
                        <div class="tableCell">${data.provider}</div>
                        <div class="tableCell">${data.likely_down_speed}</div>
                        <div class="tableCell">${data.likely_up_speed}</div>
                        <div class="tableCell">${data.price}</div>
                        <div class="tableCell">${data.installation}</div>
                        <div class="tableCell">
                          <btnSelectOrder name='${data.name}' 
                                          provider='${data.provider}' 
                                          likely_down_speed='${data.likely_down_speed}' 
                                          likely_up_speed='${data.likely_up_speed}' 
                                          price='${data.price}' 
                                          installation='${data.installation}' 
                                          class="btnOneTouch_V01" role="button">
                            Select
                          </btnSelectOrder>
                        </div>
                      </div>
                    </div>
                  </div>`;
        });
        _spinner(false);
        const oneTouchOrderTable = document.createElement('div');

        oneTouchOrderTable.innerHTML = `<div class="alignHorizontally">
                                          <div id='oneTouchOrderTable' class="width_90 height_40 alignHorizontally">
                                            <div class="boxContainer font_2 backgroundSecondary colorWhite">
                                              <div class="tableRowBroadbandOrder">
                                                <div class="tableCell">Supplier</div>
                                                <div class="tableCell">Provider</div>
                                                <div class="tableCell">Download</div>
                                                <div class="tableCell">Upload</div>
                                                <div class="tableCell">Price</div>
                                                <div class="tableCell">Installation</div>
                                                <div class="tableCell">Select</div>
                                              </div>
                                            </div>
                                            ${list}
                                          </div>
                                        </div>`;

        broadbandQuoteContainer.classList.add('hidden');
        orderAddressContainer.classList.add('hidden');
        oneTouchOrderSlider.appendChild(oneTouchOrderTable);

        document
          .getElementById('oneTouchOrderTable')
          .addEventListener('click', (event) => {
            const isButton = event.target.nodeName === 'BTNSELECTORDER';

            if (!isButton) {
              return;
            }
            _manageOrderData(
              event.target.getAttribute('name'),
              event.target.getAttribute('provider'),
              event.target.getAttribute('likely_down_speed'),
              event.target.getAttribute('likely_up_speed'),
              event.target.getAttribute('price'),
              event.target.getAttribute('installation')
            );
          });
      })
      .catch((err) => {
        _spinner(false);
        _errorMessage('woops...something went wrong please try again: ' + err);

        console.log('error');
        console.log(err);
      });
  }
}

const _getAreaBroadbandAvailability = () => {
  const oderPostcode = _handlePostcode(sessionStorage.getItem('postcode'));

  const URL = '/ndg/getAreaBroadbandAvailability/' + oderPostcode;
  console.log(URL);
  fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      _spinner(false);
      _errorMessage('Area Deal Fallback helper function...', 'warning');
      console.table(data);
    })
    .catch((err) => {
      _spinner(false);
      _errorMessage(
        'Fall back function. woops...something went wrong please try again',
        'warning'
      );

      console.log('error');
      console.log(err);
    });
};

const _handlePostcode = (postcode) => {
  postcode = postcode.replace(/\+|\(|\)|\-|\s/gi, '');
  return postcode;
};

export { _getBroadbandAvailability };
