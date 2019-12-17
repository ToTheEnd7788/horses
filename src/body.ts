export default (type, instance) => {
  function serialize(data) {
    let query = "?";

    for (let key in data) {
      query += `${key}=${data[key]}&`;
    }

    return query.slice(0, -1);
  }

  return (url: string, data?: object, configs?: object) => {
    let {
      opts
    } = instance;
    let _isXdr = window.XDomainRequest ? true : false;

    let _ctx = window.XDomainRequest
      ? new window.XDomainRequest()
      : new XMLHttpRequest() || new ActiveXObject("Microsoft.XMLHTTP");
    let {
      root,
      baseUrl,
      errHandler
    } = Object.assign(opts, configs),
      reqUrl = `${root}${baseUrl}${url}`,
      sendData = type === "get"
        ? null
        : JSON.stringify(data),
      caller = null,
      then = (callback) => {
          caller = callback;
          return _ctx;
      };

    if (type === "get") reqUrl += serialize(data);

    _ctx.open(type, reqUrl);
    _ctx.send(sendData);

    _ctx.onload = function() {
      if (_isXdr) caller && caller(JSON.parse(_ctx.responseText));
      else {
        if (_ctx.readyState === 4) {
          if (_ctx.status === 200 || _ctx.status === 304) caller && caller(JSON.parse(_ctx.responseText));
          else errHandler(_ctx);
        }
      }
    }

    _ctx.then = then;

    return _ctx;
  };
}