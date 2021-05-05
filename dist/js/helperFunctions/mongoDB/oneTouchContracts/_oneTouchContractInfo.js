import { persistDOMData } from '../../../persistDOMData.js';
import { _errorMessage } from '../../_errorMessage.js';
import { _spinner } from '../../_spinner.js';

async function _oneTouchContractInfo(findOneById) {
  console.log('Fetching contract information...');
  _spinner(true, 'Loading Active Contract...');
  const URL = '/oneTouch/contract/findContractById';
  const access_token = sessionStorage.getItem('access_token');

  let contractInfoData = '';

  const body = {
    access_token,
    findOneById,
  };
  const config = {
    method: 'POST',
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(URL, config);
    const data = await response.json();
    console.log(data);

    if (!response.ok) throw new Error(data);

    const oneTouchBroadband = data.oneTouchBroadband;
    const oneTouchCustomer = data.oneTouchCustomer.oneTouchCustomer;
    const oneTouchSuperUser = data.oneTouchSuperUser;

    let thoroughfare_number =
      oneTouchCustomer.thoroughfare_number === 'null'
        ? ''
        : oneTouchCustomer.thoroughfare_number;
    let premises_name =
      oneTouchCustomer.premises_name === 'null'
        ? ''
        : oneTouchCustomer.premises_name;
    let sub_premises =
      oneTouchCustomer.sub_premises === 'null'
        ? ''
        : oneTouchCustomer.sub_premises;
    let thoroughfare_name =
      oneTouchCustomer.thoroughfare_name === 'null'
        ? ''
        : oneTouchCustomer.thoroughfare_name;
    let county =
      oneTouchCustomer.county === 'null' ? '' : oneTouchCustomer.county;
    let postcode = oneTouchCustomer.postcode;

    contractInfoData = `
      <div class="outer">
        <inner class="inner">
          <btnLabel>Back</btnLabel>
        </inner>
      </div>

      <div class="features">
        <div class="flex-container-50">
          <div class="oneTouchFormContainer">
            <div class="fontH3">Company Information</div>
            <div class="dataSummaryContainer textSilver fontH2">
              <div class="dataRowSummaryContainer justifyText">
                <div class="rowDisplayStart">Company Name</div>
                <div class="rowDisplayEnd">${oneTouchCustomer.companyName}</div>
              </div>
              <div class="dataRowSummaryContainer justifyText">
                <div class="rowDisplayStart">Product Type</div>
                <div class="rowDisplayEnd">${oneTouchCustomer.productType}</div>
              </div>

              <div class="dataRowSummaryContainer justifyText">
                <div class="rowDisplayStart">Company Email</div>
                <div class="rowDisplayEnd">${
                  oneTouchCustomer.companyEmail
                }</div>
              </div>
              <div class="dataRowSummaryContainer justifyText">
                <div class="rowDisplayStart">Company Phone Number</div>
                <div class="rowDisplayEnd">${
                  oneTouchCustomer.companyPhoneNumber
                }</div>
              </div>

              <div class="dataRowSummaryContainer justifyText">
                <div class="rowDisplayStart">Account Manager</div>
                <div class="rowDisplayEnd">${
                  oneTouchCustomer.accountManager
                }</div>
              </div>
              <div class="dataRowSummaryContainer justifyText">
                <div class="rowDisplayStart">Company Registration</div>
                <div class="rowDisplayEnd">${
                  oneTouchCustomer.companyRegistration
                }</div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex-container-50">
          <div class="oneTouchFormContainer">
            <div class="fontH3">Customer Information</div>
            <div class="dataSummaryContainer textSilver fontH2">
              <div class="dataRowSummaryContainer justifyText">
                <div class="rowDisplayStart">Full Name</div>
                <div class="rowDisplayEnd">${oneTouchCustomer.fullName}</div>
              </div>
              <div class="dataRowSummaryContainer justifyText">
                <div class="rowDisplayStart">Phone Number</div>
                <div class="rowDisplayEnd">${
                  oneTouchCustomer.customerPhoneNumber
                }</div>
              </div>

              <div class="dataRowSummaryContainer justifyText">
                <div class="rowDisplayStart">Customer Email</div>
                <div class="rowDisplayEnd">${
                  oneTouchCustomer.customerEmail
                }</div>
              </div>
              <div class="dataRowSummaryContainer justifyText">
                <div class="rowDisplayStart">
                  Personal Notes: <br />
                  ${oneTouchCustomer.customerNotes}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="features">
        <div class="flex-container-40">
          <div class="oneTouchFormContainer">
            <div class="fontH3">Broadband Information</div>
            <div class="dataSummaryContainer textSilver fontH2">
              <div class="dataRowSummaryContainer justifyText">
                <div class="rowDisplayStart">Broadband Name</div>
                <div class="rowDisplayEnd">${oneTouchBroadband.name}</div>
              </div>
              <div class="dataRowSummaryContainer justifyText">
                <div class="rowDisplayStart">Broadband Provider</div>
                <div class="rowDisplayEnd">${oneTouchBroadband.provider}</div>
              </div>
              <div class="dataRowSummaryContainer justifyText">
                <div class="rowDisplayStart">Broadband Technology</div>
                <div class="rowDisplayEnd">${oneTouchBroadband.technology}</div>
              </div>
              <div class="dataRowSummaryContainer justifyText">
                <div class="rowDisplayStart">Up Speed</div>
                <div class="rowDisplayEnd">${
                  oneTouchBroadband.likely_up_speed
                }</div>
              </div>
              <div class="dataRowSummaryContainer justifyText">
                <div class="rowDisplayStart">Down Speed</div>
                <div class="rowDisplayEnd">${
                  oneTouchBroadband.likely_down_speed
                }</div>
              </div>
              <div class="dataRowSummaryContainer justifyText">
                <div class="rowDisplayStart">Broadband Price</div>
                <div class="rowDisplayEnd">${oneTouchBroadband.price}</div>
              </div>
              <div class="dataRowSummaryContainer justifyText">
                <div class="rowDisplayStart">
                  Broadband Installation Price
                </div>
                <div class="rowDisplayEnd">${
                  oneTouchBroadband.installation
                }</div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex-container-30">
          <div class="oneTouchFormContainer">
            <div class="fontH3">Contract Details</div>
            <div class="dataSummaryContainer textSilver fontH2">
              <div class="dataRowSummaryContainer justifyText">
                <div class="rowDisplayStart">Installation Date</div>
                <div class="rowDisplayEnd">${
                  oneTouchBroadband.installationDate
                }</div>
              </div>
              <div class="dataRowSummaryContainer justifyText">
                <div class="rowDisplayStart">Contact Expiration Date</div>
                <div class="rowDisplayEnd">${
                  oneTouchBroadband.expansionDate
                }</div>
              </div>

              <div class="dataRowSummaryContainer justifyText">
                <div class="rowDisplayStart">Contact Length</div>
                <div class="rowDisplayEnd">${
                  oneTouchBroadband.contractLength
                }</div>
              </div>
              <div class="dataRowSummaryContainer justifyText">
                <div class="rowDisplayStart">Contract Price</div>
                <div class="rowDisplayEnd">${oneTouchBroadband.price}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex-container-30">
          <div class="oneTouchFormContainer">
            <div class="fontH3">Site Installation Details</div>
            <div class="dataSummaryContainer textSilver fontH2">
              <div class="dataRowSummaryContainer justifyText">
                <div class="rowDisplayStart">Contact Name</div>
                <div class="rowDisplayEnd">${oneTouchCustomer.contactName}</div>
              </div>
              <div class="dataRowSummaryContainer justifyText">
                <div class="rowDisplayStart">Contact Phone Number</div>
                <div class="rowDisplayEnd">${
                  oneTouchCustomer.contactPhoneNumber
                }</div>
              </div>

              <div class="dataRowSummaryContainer justifyText">
                <div class="rowDisplayStart">Contact Email</div>
                <div class="rowDisplayEnd">${
                  oneTouchCustomer.contactEmail
                }</div>
              </div>
              <div class="dataRowSummaryContainer justifyText">
                <div class="rowDisplayStart">
                  Installation Address: <br />
                  ${thoroughfare_number} ${premises_name} ${sub_premises} ${thoroughfare_name} ${county} ${postcode}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="features-align-left">
        <div class="flex-container-50">
          <div class="oneTouchFormContainer">
            <div class="fontH3">Extra Metrics</div>
            <div class="dataSummaryContainer textSilver fontH2">
              <div class="dataRowSummaryContainer justifyText">
                <div class="rowDisplayStart">Extra Metrics</div>
                <div class="rowDisplayEnd">${'extra metrics'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>`;

    const oneTouchContractInfo = document.createElement('div');
    oneTouchContractInfo.id = 'oneTouchManageCustomerPageTwo';
    oneTouchContractInfo.innerHTML = contractInfoData;

    const manageCustomerWrapper = document.querySelector(
      '#manageCustomerWrapper'
    );

    const removeData = document.querySelector(
      '#oneTouchManageCustomerPageThree'
    );
    if (removeData) removeData.remove();

    const oneTouchManageCustomerPageOne = document.querySelector(
      '#oneTouchManageCustomerPageOne'
    );
    oneTouchManageCustomerPageOne.classList.add('hidden');
    manageCustomerWrapper.appendChild(oneTouchContractInfo);

    const endPoint = location.href.split('/').slice(-1)[0];
    persistDOMData(endPoint);
    _spinner(false);
  } catch (err) {
    console.log(err);
    _spinner(false);
    _errorMessage(err);
  }
}

export { _oneTouchContractInfo };
