function emailValidation(value, element) {
  return this.optional(element) || /[a-z]+@[a-z]+\.[a-z]+/.test(value);
}

function passwordConfirmValidation(value, element) {
  return this.optional(element) || value === $('#password').val();
}

function nameValidation(value, element) {
  return this.optional(element) || /^[a-z," ",ñ,á,é,í,ó,ú,ü]+$/i.test(value);
}

function telephoneValidation(value, element) {
  return this.optional(element) || /[0-9\-]/.test(value);
}

function dateIsGreaterThan(value, element) {
  return moment($('#endDate').val(), 'DD-MM-YYYY').isSameOrAfter(moment(value, 'DD-MM-YYYY'));
}

function exactlength(value, element, length) {

}
