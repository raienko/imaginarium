import auth from '@react-native-firebase/auth';

export const signInWithPhoneNumber = async (phoneNumber) => {
  return auth().signInWithPhoneNumber(phoneNumber);
};
