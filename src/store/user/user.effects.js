import { call, put } from 'redux-saga/effects';
import { actionsTypes } from './user.actions';
import { FirebaseAPI } from '../../firebase/firebase-api';
import { PersistentAuth } from '../../components/Auth/persistent-auth';

export function* login(action) {
	try {
		const response = yield call(FirebaseAPI.login, action.payload);
		PersistentAuth.saveUser(response.user);
		yield put({ type: actionsTypes.LOGIN_SUCCESS, user: response.user });
	} catch (error) {
		yield put({ type: actionsTypes.LOGIN_FAILURE, error });
	}
}


export function* loginAnonymously(action) {
	try {
		const response = yield call(FirebaseAPI.loginAnonymously);
		PersistentAuth.removeUserFromStorage(response.user);
		yield put({ type: actionsTypes.LOGIN_SUCCESS, user: response.user });
	} catch (error) {
		yield put({ type: actionsTypes.LOGIN_FAILURE, error });
	}
}

export function* signup(action) {
	try {
		const response = yield call(FirebaseAPI.signup, action.payload);
		PersistentAuth.removeUserFromStorage(response.user);
		yield put({ type: actionsTypes.SIGNUP_SUCCESS, user: response.user });
	} catch (error) {
		yield put({ type: actionsTypes.SIGNUP_FAILURE, error });
	}
}

export function* logout() {
	yield call(FirebaseAPI.signout);
	PersistentAuth.removeUserFromStorage();
	yield put({ type: actionsTypes.LOGOUT });
}