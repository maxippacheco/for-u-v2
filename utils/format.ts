import moment from 'moment';

export const formatTime = ( time: string ) => {

	return moment(time).startOf('hour').fromNow();
}