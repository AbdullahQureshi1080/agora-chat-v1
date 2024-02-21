import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

import auth, {firebase} from '@react-native-firebase/auth';

export const addUserToDatabase = (user: any) => {
  const record = firestore().collection('Users').doc(user.userId);
  record.set(user).then(res => {
    console.log(`User added! ${JSON.stringify(user)}`);
  });
};

export const updateUserInDatabase = (user: any) => {
  firestore()
    .collection('Users')
    .doc(user.id)
    .update(user)
    .then(() => {
      console.log(`User updated! ${JSON.stringify(user)}`);
    });
};

export const getAllUsersFromDatabase = async () => {
  const users = await firestore().collection('Users').get();
  const extractUsers = users.docs.map(doc => {
    return {...doc.data(), id: doc.id};
  });
  console.log('Users from database,', extractUsers);
  return extractUsers;
};

export const getUserFromDatabase = async (id: string) => {
  const user = await firestore().collection('Users').doc(id).get();
  // console.log('User from database', user);
  const extractUser = {...user.data(), id: user.id};
  console.log('User from database', extractUser);
  return extractUser;
};

// Live Changes
function onResult(QuerySnapshot: FirebaseFirestoreTypes.QuerySnapshot) {
  console.log('Firebase: onResult -> Got Users collection result.');
}

function onError(error: string) {
  console.error('Firebase: onError', error);
}

firestore()
  .collection('Users')
  .onSnapshot(onResult as any, onError as any);

export const registerWithEmailAndPassword = async (
  email: string,
  password: string,
) => {
  try {
    const createUser = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    if (createUser && createUser.user) {
      console.log(
        'Firebase: registerWithEmailAndPassword -> createUser',
        createUser.user,
        createUser.additionalUserInfo,
      );
      return {...createUser, message: 'User loggedIn', code: 200};
    }
  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      console.log(
        'Firebase: registerWithEmailAndPassword -> That email address is already in use!',
      );
      return {
        message: 'auth/email-already-in-use',
        code: 409,
      };
    }
    if (error.code === 'auth/invalid-email') {
      console.log(
        'Firebase: registerWithEmailAndPassword -> That email address is invalid!',
      );
      return {
        message: 'auth/invalid-email',
        code: 400,
      };
    }
    console.error(error);
    return {
      message: error,
      code: 400,
    };
  }
};

export const loginWithEmailAndPassword = async (
  email: string,
  password: string,
) => {
  try {
    const userLogin = await auth().signInWithEmailAndPassword(email, password);
    if (userLogin && userLogin.user) {
      console.log(
        'Firebase: loginWithEmailAndPassword -> userLogin',
        userLogin,
      );
      return {...userLogin, message: 'User logged In', code: 200};
    }
  } catch (error: any) {
    if (error.code === 'auth/invalid-email') {
      return {
        message: 'auth/invalid-email',
        code: 400,
      };
    }
    if (error.code === 'auth/wrong-password ') {
      return {
        message: 'auth/email or password is wrong',
        code: 400,
      };
    }
    if (error.code === 'auth/auth/user-not-found ') {
      return {
        message: 'auth/user-not-found',
        code: 400,
      };
    }
    console.error(error);
    return {
      message: error,
      code: 400,
    };
  }
};

export const signOut = () => {
  auth()
    .signOut()
    .then(() => console.log('User signed out!'));
};
