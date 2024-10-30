import React, { useState } from 'react';
import { Button, Container, Divider, Header as SemanticHeader, Form, Image } from 'semantic-ui-react';
import { TextField } from '@mui/material';
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
