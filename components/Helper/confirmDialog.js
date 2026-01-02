import * as React from 'react';
import { confirmable, createConfirmation } from 'react-confirm';
const ConfirmationDialog = ({ show, proceed, confirmation }) => (
 <div>
   <p>{confirmation}</p>
   <button onClick={() => proceed(false)}>Cancel</button>
   <button onClick={() => proceed(true)}>OK</button>
 </div>
);
const ConfirmableDialog = confirmable(ConfirmationDialog);
const confirm = createConfirmation(ConfirmableDialog);
const handleOnClick = async () => {
 if (await confirm({ confirmation: 'Are you sure?' })) {
   console.log('Confirmed');
 } else {
   console.log('Cancelled');
 }
};