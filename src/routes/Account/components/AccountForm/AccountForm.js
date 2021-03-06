import React, { PropTypes } from 'react'

import classes from './AccountForm.scss'
import ProviderDataForm from '../ProviderDataForm/ProviderDataForm'

import { Field, reduxForm } from 'redux-form'
import TextField from '../../../../components/TextField'
import { connect } from 'react-redux'
import { helpers } from 'react-redux-firebase'
const { pathToJS } = helpers

export const AccountForm = ({ account, handleSubmit, submitting }) => (
  <div className={classes['Account']}>
    <h4>Account</h4>
    <div>
      <Field
        name='username'
        component={TextField}
        label='Username'
      />
    </div>
    <div>
      <Field
        name='email'
        component={TextField}
        label='Email'
      />
    </div>
    <div>
      <h4>Linked Accounts</h4>
      {
        account.providerData &&
          <ProviderDataForm
            providerData={account.providerData}
          />
      }
    </div>
  </div>
)

AccountForm.propTypes = {
  account: PropTypes.shape({
    providerData: PropTypes.array
  }),
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool
}

const AccountReduxForm = reduxForm({
  form: 'Account'
})(AccountForm)

export default connect(({firebase}) => (
  {
    initialValues: pathToJS(firebase, 'profile'),
    account: pathToJS(firebase, 'profile')
  }
))(AccountReduxForm)
