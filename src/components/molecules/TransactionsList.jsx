import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import moment from 'moment';

import { Table } from 'antd';

const formatDate = date => moment(date).fromNow();

const formatAmount = (transaction) => {
  if (!Object.keys(transaction).length) {
    return null;
  }

  let amount = transaction.amount;

  if (transaction.amount > 0) {
    amount = `+${transaction.amount}`;
  }

  return `${amount} ${transaction.currency}`;
};

export const renderDate = text => (
  <span>
    {formatDate(text)}
  </span>
);

const columns = [{
  title: 'Created At',
  dataIndex: 'createdAt',
  render: renderDate,
}, {
  title: 'Comment',
  dataIndex: 'comment',
}, {
  title: 'Amount',
  dataIndex: 'amount',
  render: (text, record) => (
    <div>
      <div>{formatAmount(record)}</div>
      <div style={{ fontSize: 10 }}>{formatAmount(record.linked)}</div>
    </div>
  ),
}];

const TransactionsList = ({ items, groups }) => {
  const mapper = (key) => {
    const item = items[key];

    let linked = {};
    if (item.type === 'exchange') {
      const group = groups[item.transactionGroupId] ? groups[item.transactionGroupId] : [];
      const linkedTransactionId = group.find(transactionId => item.id !== transactionId);
      linked = items[linkedTransactionId];
    }

    return {
      key: item.id,
      createdAt: item.createdAt,
      comment: item.comment,
      amount: item.amount,
      currency: item.currency,
      linked,
    };
  };

  const data = Object.keys(items).map(mapper);

  return (
    <div className="transactions">
      <h2>Transactions</h2>
      <div>
        <Table showHeader={false} columns={columns} dataSource={data} scroll={{ y: 400 }} />
      </div>
    </div>
  );
};

TransactionsList.propTypes = {
  items: PropTypes.object.isRequired,
  groups: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  items: state.transactions.items,
  groups: state.transactions.groups,
});

export default connect(mapStateToProps)(TransactionsList);
