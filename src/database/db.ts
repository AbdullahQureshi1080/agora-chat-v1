import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

import auth, {firebase} from '@react-native-firebase/auth';

export const addUserToDatabase = (user: any) => {
  firestore()
    .collection('Users')
    .add(user)
    .then(res => {
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

export const registerWithEmailAndPassword = (
  email: string,
  password: string,
) => {
  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      console.log(
        'Firebase: registerWithEmailAndPassword -> User account created & signed in!',
      );
      return {
        message: 'User created',
        code: 200,
      };
    })
    .catch(error => {
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
          code: 409,
        };
      }
      console.error(error);
    });
};

export const loginWithEmailAndPassword = (email: string, password: string) => {
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log(
        'Firebase: loginWithEmailAndPassword -> User account logged in!',
      );
      return {
        message: 'logged In',
        code: 200,
      };
    })
    .catch(error => {
      console.error(error);
    });
};

export const signOut = () => {
  auth()
    .signOut()
    .then(() => console.log('User signed out!'));
};
