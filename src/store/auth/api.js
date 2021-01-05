import auth from '@react-native-firebase/auth';
import {appleAuth} from '@invertase/react-native-apple-authentication';

export const signInWithPhoneNumber = async (phoneNumber) => {
  return auth().signInWithPhoneNumber(phoneNumber);
};

export const signInWithApple = async () => {
  const options = {
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  };
  const authRequest = await appleAuth.performRequest(options);

  const credentialState = await appleAuth.getCredentialStateForUser(
    authRequest.user,
  );
  console.log({credentialState, authRequest});
  if (credentialState === appleAuth.State.AUTHORIZED) {
    return true;
  } else {
    return false;
  }
};

export const signOut = async () => {
  // inform backend that user signed out
  return auth().signOut();
};
