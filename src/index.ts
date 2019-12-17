import "./shim";
import buildBody from "./body";

let METHODS = {
  "GET": "get",
  "POST": "post",
  "CANCEl": "cancel"
};

let Horses = class {
  opts: object;
  _isXdr: boolean;
  _ctx: any

  constructor(options: object) {
    this.opts = Object.assign({
      root: "http://127.0.0.1",
      baseUrl: "",
      errHandler: err => {
        console.error(err);
      }
    }, options);

    this._isXdr = window.XDomainRequest ? true : false;

    this._ctx = window.XDomainRequest
      ? new window.XDomainRequest()
      : new XMLHttpRequest() || new ActiveXObject("Microsoft.XMLHTTP");

    this[METHODS.GET] = buildBody(METHODS.GET, this);
    this[METHODS.POST] = buildBody(METHODS.POST, this);
  }
};

export default Horses;