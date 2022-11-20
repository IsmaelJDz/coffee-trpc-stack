import * as Yup from "yup";
// import { format, isAfter, isEqual } from "date-fns";

const REQUIRED_FIELD = "This field is required";

type ParentProps = {
  parent: {
    name: string;
    email: string;
    password: string;
  };
};

export const getInitialValues = () => ({
  name: "",
  email: "",
  password: ""
});

export const registerSchema = () => {
  return Yup.object().shape({
    name: Yup.string().required(REQUIRED_FIELD),
    email: Yup.string().email().required(REQUIRED_FIELD),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(|(?=.*_))[^ ]+$/, {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      })
      .test("Password", "Password can't be name or last name", (value: string | undefined, { parent }: ParentProps) => {
        if (!parent || !value) return false;
        const { name } = parent;

        const passwordAllowed = passwordContainsUserData(value, name);
        return !passwordAllowed;
      })
  });
};

const passwordContainsUserData = (password: string, name: string) => {
  // if (!name || !lastName) return false;
  if (!name) return false;
  return password.toLowerCase().includes(name.replace(/\s/g, "").toLowerCase());
  // password.toLowerCase().includes(firstName.replace(/\s/g, "").toLowerCase()) ||
  // password.toLowerCase().includes(lastName.replace(/\s/g, "").toLowerCase())
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
