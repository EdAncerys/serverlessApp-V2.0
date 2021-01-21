import { _warningMessage } from '../_warningMessage.js';
import { _clearDOMData } from './_clearDOMData.js';
import { _sortBroadbandData } from './_sortBroadbandData.js';
import { _handleBroadbandSelection } from './_handleBroadbandSelection.js';

const _getBroadbandAvailability = () => {
  _clearDOMData('msgBroadband');
  console.log('Getting Broadband Availability...');

  const URL = '/ndg/broadbandAvailability';
  let msg = document.querySelector('msg');
  let broadbandDeals = document.querySelector('broadbandDeals');
  let value = document.getElementById('selectedAddress').value;

  if (value === 'selectionID') {
    msg.innerHTML = _warningMessage('Please Choose Address');
  } else {
    let body = {
      sub_premises: localStorage.getItem('sub_premises'),
      premises_name: localStorage.getItem('premises_name'),
      thoroughfare_number: localStorage.getItem('thoroughfare_number'),
      thoroughfare_name: localStorage.getItem('thoroughfare_name'),
      locality: localStorage.getItem('locality'),
      post_town: localStorage.getItem('post_town'),
      county: localStorage.getItem('county'),
      postcode: localStorage.getItem('postcode'),
      district_id: localStorage.getItem('district_id'),
      nad_key: localStorage.getItem('nad_key'),
    };

    const config = {
      method: 'POST',
      body: JSON.stringify(body),
    };

    fetch(URL, config)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        let count = -1;

        if (data.name === 'Error') {
          const err = 'No Deals Available for selected address';
          msg.innerHTML = _warningMessage(err);
          console.log(err);
        } else {
          let content = _sortBroadbandData(data, 'name', true).map(
            (product) => {
              count += 1;
              return `<tr class="broadbandData">
                        <td>${count}</td>
                        <td>${product.name}</td>
                        <td>${product.provider}</td>
                        <td>${product.likely_down_speed}</td>
                        <td>${product.likely_up_speed}</td>
                        <td>${product.speed_range}</td>
                        <td>${product.technology}</td>
                        <td>${product.price}</td>
                        <td>${product.installation}</td>
                      </tr>`;
            }
          );

          broadbandDeals.innerHTML = `<h3 class="displayCenter mt-4">Available Broadband Deals</h3>
                                      <table id='broadbandData' class="table table-hover table-light">
                                        <thead>
                                        <tr>
                                          <th scope="col">#</th>
                                          <th scope="col">Supplier</th>
                                          <th scope="col">Provider</th>
                                          <th scope="col">Download</th>
                                          <th scope="col">Upload</th>
                                          <th scope="col">Speed Range</th>
                                          <th scope="col">Technology</th>
                                          <th scope="col">Price</th>
                                          <th scope="col">Installation</th>
                                        </tr>
                                        </thead>
                                          <tbody>
                                            ${content}
                                          </tbody>
                                      </table>`;
          document
            .getElementById('broadbandData')
            .addEventListener('click', _handleBroadbandSelection);
          console.log('Data submitted successfully...');
        }
      })
      .catch((err) => {
        msg.innerHTML = _warningMessage(
          'woops...something went wrong please try again'
        );

        console.log('error');
        console.log(err);
      });
  }
};

export { _getBroadbandAvailability };
