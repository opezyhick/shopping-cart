const yup = require("yup");

exports.addToCartValidationSchema = yup.object({
  userId: yup.string().label("User Id").required(),
  productId: yup.string().label("Product Id").required(),
  quantity: yup
    .number()
    .positive(`Postive values only`)
    .label("Quantity")
    .required(),
});

exports.updateCartValidationSchema = yup.object({
  userId: yup.string().label("User Id").required(),
  productId: yup.string().label("Product Id").required(),
});

exports.checkoutValidationSchema = yup.object({
  userId: yup.string().label("User Id").required(),
});

exports.userIdValidationSchema = yup.object({
  userId: yup.string().label("User Id").required(),
});
