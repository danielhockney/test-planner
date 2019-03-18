import CONFIGS from './configs';

export const GET = async url => {
  try {
    let response = await fetch(`${CONFIGS.DOMAIN}/${url}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    let responseObj = response.json();

    return responseObj;
  } catch (error) {
    throw new Error(error.message);
  }
}

export const POST = async (url, data) => {
  try {
    let response = await fetch(`${CONFIGS.DOMAIN}/${url}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    let responseObj = response.json();

    return responseObj;
  } catch (error) {
    throw new Error(error.message);
  }
}

export const PUT = async (url, data) => {
  try {
    let response = await fetch(`${CONFIGS.DOMAIN}/${url}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    let responseObj = response.json();

    return responseObj;
  } catch (error) {
    throw new Error(error.message);
  }
}

export const DELETE = async (url, data) => {
  try {
    let response = await fetch(`${CONFIGS.DOMAIN}/${url}`, {
      method: 'DELETE',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    let responseObj = response.json();

    return responseObj;
  } catch (error) {
    throw new Error(error.message);
  }
}
