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
} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import eyeHidden from 'src/assets/images/eyeHidden.png';
import eyeShow from 'src/assets/images/eyeShow.png';
import {Formik} from 'formik';
import {SignInSchema} from 'src/utils/SchemaValidation';
import {sendPost} from 'src/network/request';
import {Loader} from 'src/components';
import {useDispatch} from 'react-redux';
import {setUser} from 'src/redux/slice/user';
import {storeId, storeRefreshToken, storeToken} from 'src/utils/Func';

const App = ({navigation}) => {
    const dispatch = useDispatch();

    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const [loading, setLoading] = useState(false);

    // const [state, setState] = useState(giá trị khởi taajo);å
    // state => là 1 biến
    // setState => sẽ thay đổi giá trị của state bằng giá trị truyền vào.
    // Mỗi lần setState thì màn hình sẽ render lại

    const checkDisableLogin = (values, errors) => {
        if (!errors.email && (values.email === '' || values.password === '')) {
            return true;
        } else {
            if (!!errors.email || !!errors.password) {
                return true;
            }
        }
        return false;
    };

    const onLogin = async values => {
        //values là 1 object
        setLoading(true);
        sendPost('/users/login', {
            email: values.email,
            password: values.password,
        }).then(async res => {
            setLoading(false);
            if (res.status === 200) {
                await storeToken(res.data.token);

                await storeRefreshToken(res.data.refreshToken);

                await storeId(res.data._id);

                dispatch(setUser(res.data));
                // === kiểm tra thêm kiểu dữ liệu
                // lưu data user,token vào store
                return navigation.replace('HomeStack');
            } else {
                setLoading(false);

                Alert.alert('Tài khoản mật khẩu không đúng!!!');
            }
        });
    };

    const clickEyeIcon = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const iconEye = secureTextEntry ? eyeShow : eyeHidden;
    // điều kiện ? kết quả đúng : kết quả sai;

    return (
        <>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.flex1}>
                    <ImageBackground
                        source={require('src/assets/images/backGround2.png')}
                        resizeMode="cover"
                        opacity={0.3}
                        style={[styles.flex1]}>
                        <View
                            style={[
                                styles.flex2,
                                styles.justifyContentCenter,
                                styles.alignItemsCenter,
                            ]}>
                            <Text style={[styles.titleDN, styles.colorTitle]}>
                                App Film
                            </Text>
                        </View>
                        <View style={styles.flex2_5}>
                            <Formik
                                initialValues={{
                                    email: '',
                                    password: '',
                                }}
                                validationSchema={SignInSchema}
                                onSubmit={onLogin}>
                                {({
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                    values,
                                    errors,
                                    touched,
                                }) => (
                                    <>
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
                                                onBlur={handleBlur('password')}
                                                secureTextEntry={
                                                    secureTextEntry
                                                }
                                                onChangeText={handleChange(
                                                    'password',
                                                )}
                                                value={values.password}
                                                paddingLeft={10}
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

                                        <TouchableOpacity
                                            style={styles.buttonLogin}
                                            disabled={checkDisableLogin(
                                                values,
                                                errors,
                                            )}
                                            onPress={handleSubmit}>
                                            <Text
                                                style={[
                                                    styles.textAlignCenter,
                                                    styles.bold,
                                                ]}>
                                                Đăng nhập
                                            </Text>
                                        </TouchableOpacity>
                                    </>
                                )}
                            </Formik>
                            <View
                                style={[
                                    styles.flexRow,
                                    styles.justifyContentCenter,
                                ]}>
                                <Text>Bạn chưa có tài khoản? </Text>
                                <TouchableOpacity
                                    onPress={() =>
                                        navigation.navigate('SignUp')
                                    }>
                                    <Text style={styles.colorButton}>
                                        Đăng ký ngay
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.flex2} />
                    </ImageBackground>
                </View>
            </TouchableWithoutFeedback>
            <Loader loading={loading} />
        </>
    );
};

export default App;
