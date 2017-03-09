import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { Form, Input, Icon, Select, Row, Col } from 'antd';

import { storeFormFields } from '../../actions/runtime';
import { exchange } from '../../actions/transactions';

import LoadingButton from '../templates/LoadingButton';

const FormItem = Form.Item;
const Option = Select.Option;

class ExchangeForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateFromAmount = this.validateFromAmount.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { validateFieldsAndScroll, resetFields } = this.props.form;

    validateFieldsAndScroll((err, values) => {
      if (!err) {
        const amount = parseFloat(values.accountFromAmount);

        this.props.dispatch(exchange(values.accountFrom, values.accountTo, amount));
        resetFields(['accountToAmount', 'accountFromAmount']);
      }
    });
  }

  getAccountData(id) {
    const { accounts } = this.props;
    const account = accounts[id] || {};

    return {
      amount: account.amount.toFixed(2),
      currency: account.currency,
    };
  }

  validateInput(rule, value, cb) {
    if (!/^\d+(\.\d{1,2})?$/.test(value)) {
      cb('Incorrect amout');
    } else if (value <= 0) {
      cb('Amout should be greater than 0');
    }

    cb();
  }

  validateFromAmount(rule, value, cb) {
    const { getFieldValue } = this.props.form;
    const account = this.getAccountData(getFieldValue('accountFrom'));

    if (parseFloat(value) > parseFloat(account.amount)) {
      cb(`Amount can't be greater than ${account.amount}`);
    }

    cb();
  }

  selectAccount() {
    const { accounts } = this.props;

    return (
      <Select style={{ width: 70 }}>
        {Object.keys(accounts).map(id => <Option key={id} value={id}>{accounts[id].currency}</Option>)}
      </Select>
    );
  }

  get selectAccountTo() {
    const { getFieldDecorator } = this.props.form;

    return getFieldDecorator('accountTo')(
      this.selectAccount('accountTo')
    );
  }

  get inputAccountToAmount() {
    const { getFieldDecorator } = this.props.form;

    return getFieldDecorator('accountToAmount', {
      initialValue: 0,
    })(
      <Input addonAfter={this.selectAccountTo} readOnly />
    );
  }

  get selectAccountFrom() {
    const { getFieldDecorator } = this.props.form;

    return getFieldDecorator('accountFrom')(
      this.selectAccount('accountFrom')
    );
  }

  get inputAccountFromAmount() {
    const { getFieldDecorator } = this.props.form;

    return getFieldDecorator('accountFromAmount', {
      rules: [
        { required: true, message: 'Please, input the value' },
        { validator: this.validateInput },
        { validator: this.validateFromAmount },
      ],
    })(
      <Input placeholder="0" addonAfter={this.selectAccountFrom} />
    );
  }

  render() {
    const { getFieldValue } = this.props.form;
    const accountFrom = this.getAccountData(getFieldValue('accountFrom'));
    const accountTo = this.getAccountData(getFieldValue('accountTo'));

    return (
      <Form className="form" layout="inline" onSubmit={this.handleSubmit}>
        <div>
          <div>
            <div>
              You have: {accountFrom.amount} {accountFrom.currency}
            </div>
            <FormItem className="form__item" style={{ marginRight: 0 }}>
              {this.inputAccountFromAmount}
            </FormItem>
          </div>
          <div style={{ marginTop: 10 }}>
            <div>
              You have: {accountTo.amount} {accountTo.currency}
            </div>
            <FormItem className="form__item" style={{ marginRight: 0 }}>
              {this.inputAccountToAmount}
            </FormItem>
          </div>
          <div style={{ marginTop: 20 }}>
            <LoadingButton
              type="primary"
              htmlType="submit"
              style={{ width: '100%' }}
            >
              <span>
                Exchange
              </span>
            </LoadingButton>
          </div>
        </div>
      </Form>
    );
  }
}

ExchangeForm.propTypes = {
  accounts: PropTypes.object.isRequired,
  formState: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  accounts: state.accounts.items,
  formState: state.runtime.form,
});

const formParams = {
  mapPropsToFields(props) {
    return {
      ...props.formState,
    };
  },
  onFieldsChange(props, fields) {
    props.dispatch(storeFormFields(fields));
  },
};

export default connect(mapStateToProps)(Form.create(formParams)(ExchangeForm));
