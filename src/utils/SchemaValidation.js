import * as Yup from 'yup';

const SignInSchema = Yup.object().shape({
    email: Yup.string().email('Chưa đúng định dạng email').required('Bắt buộc'),
    password: Yup.string()
        .required('Bắt buộc')
        .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
        .matches(/[0-9]/, 'Mật khẩu phải có ít nhất 1 số')
        .matches(/[a-z]/, 'Mật khẩu phải có ít nhất 1 chữ thường')
        .matches(/[A-Z]/, 'Mật khẩu phải có ít nhất 1 chữ hoa')
        .matches(/[^\w]/, 'Mật khẩu phải có ít nhất 1 ký tự'),
});

const SignUpSchema = Yup.object().shape({
    email: Yup.string().email('Chưa đúng định dạng email').required('Bắt buộc'),
    password: Yup.string()
        .required('Bắt buộc')
        .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
        .matches(/[0-9]/, 'Mật khẩu phải có ít nhất 1 số')
        .matches(/[a-z]/, 'Mật khẩu phải có ít nhất 1 chữ thường')
        .matches(/[A-Z]/, 'Mật khẩu phải có ít nhất 1 chữ hoa')
        .matches(/[^\w]/, 'Mật khẩu phải có ít nhất 1 ký tự'),
    confirmPassword: Yup.string().oneOf(
        [Yup.ref('password'), null],
        'Mật khẩu phải trùng khớp',
    ),
    name: Yup.string()
        .matches(/^[A-Za-z ]*$/, 'Vui lòng nhập tên hợp lệ')
        .min(2, 'Quá ngắn')
        .max(30, 'Quá dài')
        .required('Bắt buộc'),
});

export {SignInSchema, SignUpSchema};
