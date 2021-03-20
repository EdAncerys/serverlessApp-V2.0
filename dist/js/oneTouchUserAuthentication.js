async function oneTouchUserAuthentication() {
  console.log('User Authentication middleware');

  const URL = '/oneTouch/oneTouchUserAuthentication';
  const access_token = sessionStorage.getItem('access_token');

  const body = {
    access_token,
  };
  console.log(body);

  const config = {
    method: 'POST',
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(URL, config);
    const data = await response.json();
    if (!response.ok) throw new Error(data.msg);

    console.log(data);
    return true;
  } catch (err) {
    window.location.replace('/views/oneTouch/one-touch-login.html');
    return false;
  }
}

export { oneTouchUserAuthentication };
