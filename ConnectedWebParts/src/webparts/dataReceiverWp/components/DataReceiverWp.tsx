import * as React from 'react';
import styles from './DataReceiverWp.module.scss';
import { IDataReceiverWpProps } from './IDataReceiverWpProps';
import { escape } from '@microsoft/sp-lodash-subset';

import { IDataReceiverWpState } from './IDataReceiverWpState';
import IEventData from '../../RxJsEventEmitter/IEventData';
import {RxJsEventEmitter} from '../../RxJsEventEmitter/RxJsEventEmitter';

export default class DataReceiverWp extends React.Component<IDataReceiverWpProps, IDataReceiverWpState> 
{
  private readonly eventEmitter: RxJsEventEmitter = RxJsEventEmitter.getInstance();

  public constructor(props:IDataReceiverWpProps, state:IDataReceiverWpState){
    super(props);
    this.state = {
      userName:"",
      password:""
    };

    this.eventEmitter.on("shareData", this.receiveData.bind(this));
  }

  public render(): React.ReactElement<IDataReceiverWpProps> {
    return (
      <div className={styles.dataReceiverWp}>
        <h2>Receiver web part</h2>
        <div><span>User Name: </span><span>{this.state.userName}</span></div>
        <div><span>Password: </span><span>{this.state.password}</span></div>
      </div>
    );
  }

  private receiveData(data: IEventData) {
    this.setState({
      userName: data.sharedUserName,
      password:data.sharedUserPassword
    });
  }
}
