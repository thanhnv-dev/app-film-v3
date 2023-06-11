import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    ImageBackground,
    TouchableWithoutFeedback,
    Keyboard,
    Image,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import eyeHidden from 'src/assets/images/eyeHidden.png';
import eyeShow from 'src/assets/images/eyeShow.png';
import {Formik} from 'formik';
import {SignUpSchema} from 'src/utils/SchemaValidation';
import {sendPost} from 'src/network/request';
import {Loader} from 'src/components';
import {useDispatch} from 'react-redux';
import {setUser} from 'src/redux/slice/user';
import {storeId, storeRefreshToken, storeToken} from 'src/utils/Func';
import Icon from 'react-native-vector-icons/Ionicons';

const SignUp = ({navigation}) => {
    const dispatch = useDispatch();

    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const [secureTextEntry1, setSecureTextEntry1] = useState(true);

    const [loading, setLoading] = useState(false);

    // const [state, setState] = useState(giá trị khởi taajo);å
    // state => là 1 biến
    // setState => sẽ thay đổi giá trị của state bằng giá trị truyền vào.
    // Mỗi lần setState thì màn hình sẽ render lại

    const checkDisableSignUp = (values, errors) => {
        if (
            !errors.email &&
            (values.email === '' ||
                values.password === '' ||
                values.name === '' ||
                values.confirmPassword === '')
        ) {
            return true;
        } else {
            if (
                !!errors.email ||
                !!errors.password ||
                !!errors.name ||
                !!errors.confirmPassword
            ) {
                return true;
            }
        }
        return false;
    };

    const onSignUp = values => {
        setLoading(true);

        sendPost('/users/signUp', {
            email: values.email,
            password: values.password,
            name: values.name,
        }).then(async res => {
            setLoading(false);
            if (res.status === 200) {
                // lưu data user, token vào store
                await storeToken(res.data.token);

                await storeRefreshToken(res.data.refreshToken);

                await storeId(res.data._id);

                dispatch(setUser(res.data));

                navigation.replace('HomeStack');
            } else {
                Alert.alert(res.data.msg);
            }
        });
    };

    const clickEyeIcon = () => {
        setSecureTextEntry(!secureTextEntry);
    };
    const clickEyeIcon1 = () => {
        setSecureTextEntry1(!secureTextEntry1);
    };

    const iconEye = secureTextEntry ? eyeShow : eyeHidden;
    const iconEye1 = secureTextEntry1 ? eyeShow : eyeHidden;
    // điều kiện ? kết quả đúng : kết quả sai;

    return (
        <>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.flex1}>
                    <ImageBackground
                        source={require('../../assets/images/backGround2.png')}
                        resizeMode="cover"
                        opacity={0.3}
                        style={[styles.flex1]}>
                        <KeyboardAvoidingView
                            behavior={
                                Platform.OS === 'ios' ? 'padding' : 'height'
                            }
                            style={styles.flex5}>
                            <View
                                style={[
                                    styles.flex2,
                                    styles.justifyContentCenter,
                                    styles.alignItemsCenter,
                                ]}>
                                <Text
                                    style={[styles.titleDK, styles.colorTitle]}>
                                    Tạo tài khoản mới
                                </Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => navigation.goBack()}
                                style={[
                                    styles.postionAbsolute,
                                    styles.viewButtonBack,
                                ]}>
                                <Icon
                                    name="chevron-back"
                                    size={30}
                                    style={styles.iconArrowLeft}
                                />
                            </TouchableOpacity>

                            <Formik
                                initialValues={{
                                    name: '',
                                    email: '',
                                    password: '',
                                    confirmPassword: '',
                                }}
                                validationSchema={SignUpSchema}
                                onSubmit={onSignUp}>
                                {({
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                    values,
                                    errors,
                                    touched,
                                }) => (
                                    <View style={styles.flex4}>
                                        <Text
                                            style={[
                                                styles.mh30,
                                                styles.mv5,
                                                styles.bold,
                                            ]}>
                                            Tên tài khoản
                                        </Text>
                                        <TextInput
                                            style={styles.input}
                                            placeholder={'Nguyễn Văn A'}
                                            onChangeText={handleChange('name')}
                                            onBlur={handleBlur('name')}
                                            paddingLeft={10}
                                            value={values.name}
                                        />
                                        {errors.name && touched.name ? (
                                            <Text
                                                style={[
                                                    styles.mh30,
                                                    {color: 'red'},
                                                ]}>
                                                {errors.name}
                                            </Text>
                                        ) : null}

                                        <Text
                                            style={[
                                                styles.mh30,
                                                styles.mv5,
                                                styles.bold,
                                            ]}>
                                            Email
                                        </Text>
                                        <TextInput
                                            style={styles.input}
                                            keyboardType={'email-address'}
                                            placeholder={'acb@gmail.com'}
                                            onChangeText={handleChange('email')}
                                            onBlur={handleBlur('email')}
                                            paddingLeft={10}
                                            value={values.email}
                                        />
                                        {errors.email && touched.email ? (
                                            <Text
                                                style={[
                                                    styles.mh30,
                                                    {color: 'red'},
                                                ]}>
                                                {errors.email}
                                            </Text>
                                        ) : null}

                                        <Text
                                            style={[
                                                styles.mh30,
                                                styles.mv5,
                                                styles.bold,
                                            ]}>
                                            Mật khẩu
                                        </Text>
                                        <View
                                            style={[
                                                styles.flexRow,
                                                styles.mh30,
                                            ]}>
                                            <TextInput
                                                style={styles.inputPassword}
                                                placeholder={'Password'}
                                                secureTextEntry={
                                                    secureTextEntry
                                                }
                                                onChangeText={handleChange(
                                                    'password',
                                                )}
                                                onBlur={handleBlur('password')}
                                                paddingLeft={10}
                                                value={values.password}
                                            />
                                            <View
                                                style={[
                                                    styles.flex1,
                                                    styles.justifyContentCenter,
                                                    styles.alignItemsCenter,
                                                    styles.mv5,
                                                    styles.borderIcon,
                                                ]}>
                                                <TouchableOpacity
                                                    onPress={clickEyeIcon}>
                                                    <Image
                                                        source={iconEye}
                                                        style={styles.iconEye}
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        {errors.password && touched.password ? (
                                            <Text
                                                style={[
                                                    styles.mh30,
                                                    {color: 'red'},
                                                ]}>
                                                {errors.password}
                                            </Text>
                                        ) : null}

                                        <Text
                                            style={[
                                                styles.mh30,
                                                styles.mv5,
                                                styles.bold,
                                            ]}>
                                            Xác nhận mật khẩu
                                        </Text>
                                        <View
                                            style={[
                                                styles.flexRow,
                                                styles.mh30,
                                            ]}>
                                            <TextInput
                                                style={styles.inputPassword}
                                                placeholder={'Password'}
                                                secureTextEntry={
                                                    secureTextEntry1
                                                }
                                                onChangeText={handleChange(
                                                    'confirmPassword',
                                                )}
                                                onBlur={handleBlur(
                                                    'confirmPassword',
                                                )}
                                                paddingLeft={10}
                                                value={values.confirmPassword}
                                            />
                                            <View
                                                style={[
                                                    styles.flex1,
                                                    styles.justifyContentCenter,
                                                    styles.alignItemsCenter,
                                                    styles.mv5,
                                                    styles.borderIcon,
                                                ]}>
                                                <TouchableOpacity
                                                    onPress={clickEyeIcon1}>
                                                    <Image
                                                        source={iconEye1}
                                                        style={styles.iconEye}
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        {errors.confirmPassword &&
                                        touched.confirmPassword ? (
                                            <Text
                                                style={[
                                                    styles.mh30,
                                                    {color: 'red'},
                                                ]}>
                                                {errors.confirmPassword}
                                            </Text>
                                        ) : null}

                                        <TouchableOpacity
                                            disabled={checkDisableSignUp(
                                                values,
                                                errors,
                                            )}
                                            style={styles.buttonSignUp}
                                            onPress={handleSubmit}>
                                            <Text
                                                style={[
                                                    styles.textAlignCenter,
                                                    styles.bold,
                                                ]}>
                                                Đăng ký
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </Formik>
                        </KeyboardAvoidingView>
                        <View style={styles.flex1} />
                    </ImageBackground>
                </View>
            </TouchableWithoutFeedback>
            <Loader loading={loading} />
        </>
    );
};

export default SignUp;
