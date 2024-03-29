import { auth, database, provider } from "../../config/firebase";

//Register the user using email and password
export function register(data, callback) {
    const { email, password, username } = data;
    console.log(email, password, username);
    auth.createUserWithEmailAndPassword(email, password)
        .then((resp) => createUser({ username, uid:resp.user.uid }, callback))
        .catch((error) => {
            console.log(error);
            callback(false, null, error);
        });
}

//Create the user object in realtime database
export function createUser (user, callback) {
    const userRef = database.ref().child('users');

    userRef.child(user.uid).update({ ...user })
        .then(() => callback(true, user, null))
        .catch((error) => callback(false, null, {message: error}));
}

//Sign the user in with their email and password
export function login(data, callback) {
    const { email, password } = data;
    auth.signInWithEmailAndPassword(email, password)
        .then((resp) => getUser(resp.user, callback))
        .catch((error) => callback(false, null, error));
}

//Get the user object from the realtime database
export function getUser(user, callback) {
    database.ref('users').child(user.uid).once('value')
        .then(function(snapshot) {

            const exists = (snapshot.val() !== null);

            //if the user exist in the DB, replace the user variable with the returned snapshot
            if (exists) {
                user = snapshot.val();
                // userBD = snapshot.val();
                // userNew = {
                //     uid: userBD ? userBD.uid : null,
                //     username: userBD ? userBD.username : null,
                //     displayName: user.displayName,
                //     email: user.email,
                //     photoURL: user.photoURL
                // }
                // user = userNew
            }

            const data = { exists, user }
            callback(true, data, null);
        })
        .catch(error => callback(false, null, error));
}

//Send Password Reset Email
export function resetPassword(data, callback) {
    const { email } = data;
    auth.sendPasswordResetEmail(email)
        .then((user) => callback(true, null, null))
        .catch((error) => callback(false, null, error));
}

export function signOut (callback) {
    auth.signOut()
        .then(() => {
            if (callback) callback(true, null, null)
        })
        .catch((error) => {
            if (callback) callback(false, null, error)
        });
}


//Sign user in using Facebook
export function signInWithFacebook (fbToken, callback) {
    const credential = provider.credential(fbToken);
    auth.signInWithCredential(credential)
    // auth.signInAndRetrieveDataWithCredential(credential)
        .then((user) => getUser(user, callback))
        .catch((error) => {
            var errorCode = error.code;
            if (errorCode === 'auth/account-exists-with-different-credential') {
                callback(false, null, { 
                    message: "Este mail ya esta asociado a otra cuenta, pruebe iniciar sesion con mail y contraseña, de lo contrario recuperela."
                });
            } else {
                callback(false, null, error);
            }
        });
}