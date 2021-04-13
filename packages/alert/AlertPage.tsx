import React from 'react';

interface AlertPageProps {
  text: string;
}

const AlertPage  = (props: AlertPageProps) =>  {
    const { text } = props;
    return (
      <div
        style={{
          background: '#ffffff',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          alignContent: 'sapce-around',
        }}
      >
        <div
          style={{
            flex: 1,
            fontSize: 18,
            textAlign: 'center',
            color: '#8E98AE'
          }}
        >
          {text}
        </div>
      </div>
    );
}

export default AlertPage;
