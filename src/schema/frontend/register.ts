import * as Yup from "yup";
// import { format, isAfter, isEqual } from "date-fns";

const REQUIRED_FIELD = "This field is required";

export const registerSchema = () => {
  return Yup.object().shape({
    email: Yup.string().email().required(REQUIRED_FIELD),
    password: Yup.string().min(8).required(REQUIRED_FIELD)
  });
};

// const REQUIRED_FIELD = 'This field is required';
// const STARTS_AT_HOUR_MINOR_NOW = "The start hour can't be minor than now";
// const ENDS_AT_HOUR_MINOR_START = "The end hour can't be minor than start time";

// const NOW = new Date(new Date().getTime()).toTimeString();
// const DATE_NOW = new Date(format(new Date(), 'yyyy-MM-dd'));
// const DATE_TIME = new Date();

// export const discountFormSchema = () => {
//   return yup.object().shape({
//     name: yup.string().required(REQUIRED_FIELD),
//     startsAt: yup.string().required(REQUIRED_FIELD).nullable(),
//     endsAt: yup.string().required(REQUIRED_FIELD).nullable(),
//     startsAtHour: yup
//       .string()
//       .required(REQUIRED_FIELD)
//       .test('startsAtHourMinorNow', STARTS_AT_HOUR_MINOR_NOW, function (value) {
//         const startTime = format(new Date(value ? value : new Date()), 'HH:mm:ss');
//         const fullStartDate = `${format(
//           new Date(this.parent.startsAt ? this.parent.startsAt : new Date()),
//           'yyyy-MM-dd'
//         )} ${startTime}`;
//         return isEqual(DATE_TIME, new Date(fullStartDate)) || isAfter(new Date(fullStartDate), DATE_TIME);
//       }),
//     endsAtHour: yup
//       .string()
//       .required(REQUIRED_FIELD)
//       .test('endsAtHourMinorNow', ENDS_AT_HOUR_MINOR_START, function (value) {
//         return (
//           (isEqual(new Date(this.parent.startsAt), new Date(this.parent.endsAt)) && value > this.parent.startsAtHour) ||
//           isAfter(new Date(this.parent.endsAt), new Date(this.parent.startsAt))
//         );
//       }),
//     discountPercentage: yup.string().required(REQUIRED_FIELD),
//   });
// };

// password: Yup.string()
//         .required(TR.PASSWORD_ERROR_REQUIRED)
//         .min(8, TR.PASSWORD_ERROR)
//         .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(|(?=.*_))[^ ]+$/, {
//           message: TR.PASSWORD_ERROR,
//         })
//         .test(TR.PASSWORD, TR.PASSWORD_CHECKS_NAMES, (value, { parent }) => {
//           if (!parent || !value) return false;
//           const { first_name, last_name } = parent;

//           const passwordAllowed = passwordContainsUserData(
//             value,
//             first_name,
//             last_name
//           );
//           return !passwordAllowed;
//         }),

// const passwordContainsUserData = (password, firstName, lastName) => {
//   if (!firstName || !lastName) return false;
//   return (
//     password
//       .toLowerCase()
//       .includes(firstName.replace(/\s/g, "").toLowerCase()) ||
//     password.toLowerCase().includes(lastName.replace(/\s/g, "").toLowerCase())
//   );
// };

// export { getInitialValues, getSchema };
