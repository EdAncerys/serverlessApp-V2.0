import { _handleFormValidation } from './_helperFunctions/_handleFormValidation.js';
import { _freshDeskTickets } from './_helperFunctions/_freshDesk/_freshDeskTickets.js';

document.addEventListener('DOMContentLoaded', () => {
  document
    .getElementById('freshDeskTickets')
    .addEventListener('click', getFreshDeskTicket);
  document
    .getElementById('submitTicket')
    .addEventListener('click', submitFreshDeskTicket);
});

const submitFreshDeskTicket = (ev) => {
  ev.preventDefault();
  _handleFormValidation('_submitTicket');
};

const getFreshDeskTicket = (ev) => {
  ev.preventDefault();
  _freshDeskTickets();
};
