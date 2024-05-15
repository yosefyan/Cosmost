const phoneRegex = /0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/;

const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

const urlRegex =
  /^(?:blob:)?(?:http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+/;

const postsUsersRegex = /(\buse|user|u\w*|post|po|p\w*\b)/;

const postsRegex = /(\post|po|p\w*\b)/;

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{7,}$/;

const usersRegex = /(\buse|user|u\w*\b)/;

const authRegex = /(\baut|auth|a\w*\b)/;

export {
  phoneRegex,
  emailRegex,
  urlRegex,
  passwordRegex,
  postsUsersRegex,
  postsRegex,
  usersRegex,
  authRegex,
};
