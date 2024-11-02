import React, { useState } from 'react';
import Header from '../components/Header';
import User from '../components/User';

import '../assets/styles/user_account.css';

function UserAccount() {
    return (
        <div >
          <Header />
          <User />
        </div>
      );
}

export default UserAccount;
