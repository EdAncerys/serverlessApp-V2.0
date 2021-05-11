import { persistDOMData } from '../../../persistDOMData.js';
import { _errorMessage } from '../../_errorMessage.js';
import { _spinner } from '../../_spinner.js';

async function _oneTouchContracts() {
  console.log('Fetching customers from db...');
  _spinner(true, 'Loading Active Users...');
  const URL = '/oneTouch/orders/userPlacedOrders';
  const access_token = sessionStorage.getItem('access_token');

  const body = {
    access_token,
  };
  const config = {
    method: 'POST',
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(URL, config);
    const data = await response.json();

    if (!response.ok) throw new Error(data);

    const oneTouchBroadband = data.oneTouchBroadband;
    console.log(oneTouchBroadband);

    let manageDataContainer = '';
    let dataContainer = '';
    let oneTouchContractData = '';
    let totalPendingContracts = 0;

    oneTouchBroadband.map((contract) => {
      console.log(contract);
      const liveContract = contract.contractStartDay;
      if (!liveContract) totalPendingContracts += 1;
      const oneTouchCustomerData = contract.oneTouchCustomer;
      let oneTouchCustomer = [];
      if (oneTouchCustomerData)
        oneTouchCustomer = contract.oneTouchCustomer.oneTouchCustomer;
      const id = contract._id;

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

      let btnClass = 'btnB01';
      let rowComponent = 'rowComponent-3';
      let pendingOrder = '';
      if (!liveContract) btnClass = 'btnB01 btnDisable';
      if (!liveContract) rowComponent = 'rowComponent-3 rowInactive';
      if (!liveContract) pendingOrder = 'Pending Order...';

      manageDataContainer = `<div class="manageDataContainer">
                            <contractInfo id='${id}' class="${btnClass}" role="button">
                              Info
                            </contractInfo>
                            <deleteContract id='${id}' class="${btnClass} bgDanger" role="button">
                              Delete
                            </deleteContract>
                          </div>`;

      dataContainer += `<div class="rowContainer bgGradientSilver">
                          <div class="pendingOrder">${pendingOrder}</div>
                          <div class="${rowComponent}">
                            <div class="rowComponentWrapper">
                              <div>${oneTouchCustomer.companyName}</div>
                              <div class="bottomDataRow">${oneTouchCustomer.customerFullName}</div>
                            </div>
                            <div class="rowComponentWrapper">
                              <div>${thoroughfare_number} ${premises_name} ${sub_premises} ${thoroughfare_name} ${county}</div>
                              <div class="bottomDataRow">${postcode}</div>
                            </div>
                            <div class="rowComponentWrapper">
                              ${manageDataContainer}
                            </div>
                          </div>
                        </div>`;
    });

    const totalContracts = oneTouchBroadband.length;

    oneTouchContractData = `<div class="features">
                          <div class="flex-container-40">
                            <div class="oneTouchFormContainer bgGradientSilver">
                              <div class="alignHorizontally fontH3">Contract Overview</div>
                              <div class="fontH2">
                                Manage and overview contracts - anytime, anywhere
                              </div>
                              <div class="dataSummaryContainer textSilver fontH2">
                                <div class="dataRowSummaryContainer justifyText">
                                  <div class="rowDisplayStart">Total Contracts</div>
                                  <div class="rowDisplayEnd">${totalContracts}</div>
                                </div>
                                <div class="dataRowSummaryContainer justifyText">
                                  <div class="rowDisplayStart">Pending Contracts</div>
                                  <div class="rowDisplayEnd">${totalPendingContracts}</div>
                                </div>
                                <div class="dataRowSummaryContainer justifyText textWhite bgGreen">
                                  <div class="rowDisplayStart">
                                    Contracts with exp date > 6 month
                                  </div>
                                  <div class="rowDisplayEnd">0</div>
                                </div>
                                <div class="dataRowSummaryContainer justifyText textWhite bgWarning">
                                  <div class="rowDisplayStart">
                                    Contracts with exp date < 6 month
                                  </div>
                                  <div class="rowDisplayEnd">0</div>
                                </div>
                                <div class="dataRowSummaryContainer justifyText textWhite bgDanger">
                                  <div class="rowDisplayStart">Expired Contracts</div>
                                  <div class="rowDisplayEnd">0</div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="contractWrapper">
                            <div class="flex-container-60">
                              <div class="headerText">
                                <div class="fontH4">Live Contracts & Customer List</div>
                                <div class="fontH2">
                                  Manage all customers in one place. View address, contact
                                  information, etc. & any personal notes.
                                </div>
                              </div>
                              <div id='dataWrapper' class='dataWrapper'>
                                <div class="rowComponent-3 boxContainer bgGray">
                                  <div class="rowComponentWrapper">Business Contact</div>
                                  <div class="rowComponentWrapper">Address</div>
                                  <div class="rowComponentWrapper">Manage</div>
                                </div>
                                  ${dataContainer}
                              </div>
                            </div>
                          </div>
                        </div>`;

    if (oneTouchBroadband.length === 0) {
      _errorMessage('Have No Placed Contract!', 'warning');

      oneTouchContractData = `<section class="features">
                                <div class="flex-container-30">
                                  <div class="headerText alignHorizontally">
                                    <div class="fontH3">Your Have No Contracts Added!</div>
                                    <addNewContract class="btnOneTouch">Add New Contract</addNewContract>
                                  </div>
                                </div>
                              </section>`;
    }

    const liveConnections = document.querySelector('#liveConnections');
    // Removing user previous data
    const removeData = document.querySelector('#oneTouchContracts');
    if (removeData) removeData.remove();

    const oneTouchContracts = document.createElement('div');
    oneTouchContracts.id = 'oneTouchContracts';
    oneTouchContracts.innerHTML = oneTouchContractData;

    liveConnections.appendChild(oneTouchContracts);

    const endPoint = location.href.split('/').slice(-1)[0];
    persistDOMData(endPoint);
    _spinner(false);
  } catch (error) {
    console.log(error);
    _spinner(false);
    _errorMessage(error.msg);
  }
}

export { _oneTouchContracts };
