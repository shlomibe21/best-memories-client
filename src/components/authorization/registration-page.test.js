import React from 'react';
import {shallow, mount} from 'enzyme';
import RegistrationForm from './registration-form.js'

it('Renders without crashing', () => {
    shallow(<RegistrationForm />);
});