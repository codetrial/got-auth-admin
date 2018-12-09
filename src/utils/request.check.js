const STATUS = {
  OK: '200',
};

export function isOK(status = {}) {
  return status === STATUS.OK;
}

export function isNotOK(status = {}) {
  return status !== STATUS.OK;
}
