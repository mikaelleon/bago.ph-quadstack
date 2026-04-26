(function () {
  const GOV_EMAIL_RE = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.gov\.ph$/i;
  const PH_MOBILE_RE = /^09\d{9}$/;
  const PIN_RE = /^\d{4}$/;

  function validGovEmail(v) {
    return GOV_EMAIL_RE.test(String(v || ""));
  }

  function validPhMobile(v) {
    return PH_MOBILE_RE.test(String(v || ""));
  }

  function validPin(v) {
    return PIN_RE.test(String(v || ""));
  }

  function validBarangayName(v) {
    return String(v || "").trim().length >= 2;
  }

  window.BAGOXmlValidators = {
    validGovEmail: validGovEmail,
    validPhMobile: validPhMobile,
    validPin: validPin,
    validBarangayName: validBarangayName
  };
})();
