import React from 'react'
const rp = require('request-promise');
const Mining = () => {
    
const requestOptions = {
  method: 'GET',
  uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
  qs: {
    'start': '1',
    'limit': '5000',
    'convert': 'USD'
  },
  headers: {
    'X-CMC_PRO_API_KEY': 'dab965e2-ce7c-4e2a-88f2-49baabf7131c'
  },
  json: true,
  gzip: true
};

rp(requestOptions).then(response => {
  console.log('API call response:', response);
}).catch((err) => {
  console.log('API call error:', err.message);
});

    return (
        <div>
            hi
        </div>
    )
}

export default Mining



