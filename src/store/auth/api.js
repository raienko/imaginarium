import auth from '@react-native-firebase/auth';

export const signInWithPhoneNumber = async (phoneNumber) => {
  return auth().signInWithPhoneNumber(phoneNumber);
};

export const signOut = async () => {
  // inform backend that user signed out
  return auth().signOut();
};
