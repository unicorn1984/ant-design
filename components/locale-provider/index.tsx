import * as React from 'react';
import PropTypes from 'prop-types';
import { ModalLocale, changeConfirmLocale } from '../modal/locale';

export interface LocaleProviderProps {
  locale: {
    setMomentLocale?: () => void;
    Pagination?: Object,
    DatePicker?: Object,
    TimePicker?: Object,
    Calendar?: Object,
    Table?: Object,
    Modal?: ModalLocale,
    Popconfirm?: Object,
    Transfer?: Object,
    Select?: Object,
    Upload?: Object,
  };
  children?: React.ReactElement<any>;
}

function setMomentLocale(props: LocaleProviderProps) {
  const { locale } = props;
  if (locale && locale.setMomentLocale) {
    locale.setMomentLocale();
  }
}

export default class LocaleProvider extends React.Component<LocaleProviderProps, any> {
  static propTypes = {
    locale: PropTypes.object,
  };

  static childContextTypes = {
    antLocale: PropTypes.object,
  };

  constructor(props: LocaleProviderProps) {
    super(props);
    setMomentLocale(props);
  }

  getChildContext() {
    return {
      antLocale: {
        ...this.props.locale,
        exist: true,
      },
    };
  }

  componentWillMount() {
    this.componentDidUpdate();
  }

  componentWillReceiveProps(nextProps: LocaleProviderProps) {
    setMomentLocale(nextProps);
  }

  componentDidUpdate() {
    const { locale } = this.props;
    changeConfirmLocale(locale && locale.Modal);
  }

  componentWillUnMount() {
    changeConfirmLocale();
  }

  render() {
    return React.Children.only(this.props.children);
  }
}
