import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Colors } from 'Theme';
import { injectIntl } from 'react-intl';
import moment from 'moment';
import messages from './messages';

const useStyles = makeStyles({
  wrapper: {
    borderBottom: `solid 2px ${Colors.mercury}`,
    paddingTop: '16px',
    paddingBottom: '16px',
  },
  date: {
    color: Colors.lunarGreen,
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '4px',
  },
  title: {
    color: Colors.lunarGreen,
    fontSize: '16px',
    fontWeight: 'normal',
    lineHeight: '24px',
    marginBottom: '4px',
  },
  description: {
    color: Colors.lunarGreen,
    fontSize: '14px',
    fontWeight: 'normal',
    marginBottom: '8px',
  },
  author: {
    color: Colors.mountainMeadow,
    fontSize: '12px',
    fontWeight: 'normal',
    marginBottom: '1px',
  },
});

/**
 * @method AuditLogItem
 * Generates the AuditLogItem component to display the logs from AuditLog.
 * The dateFormat updates the date format received by the backend into
 * something readable by the user.
 * @property {Object} itemData receives all the data of the record to render.
 * @return {void}
 */
const AuditLogItem = (itemData) => {
  const { formatMessage } = itemData.intl;
  const classes = useStyles();
  const dateFormat = 'MMM DD, YYYY, hh:mm:ss a';
  const formattedDate = moment(itemData.date).format(dateFormat);
  return (
    <div
      className={classes.wrapper}
      data-testid="auditLogItemId"
      key={itemData.siteId}
    >
      <div className={classes.date} data-testid="auditLogItemDate">
        {formattedDate}
      </div>
      <div className={classes.title} data-testid="auditLogItemTitle">
        {itemData.title}
      </div>
      <div
        className={classes.description}
        data-testid="auditLogItemDescription"
      >
        {itemData.description}
      </div>
      <div className={classes.author} data-testid="auditLogItemAuthor">
        {`${formatMessage(messages.changeBySourceLabel)} ${itemData.author}`}
      </div>
    </div>
  );
};

export default injectIntl(AuditLogItem);
