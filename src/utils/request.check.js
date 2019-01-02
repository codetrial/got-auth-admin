const STATUS = {
  OK: ['200', 'OK'],
};

export function isOK(status) {
  return status == null || STATUS.OK.indexOf(String(status)) >= 0;
}

export function isNotOK(status) {
  return status != null && STATUS.OK.indexOf(String(status)) < 0;
}
