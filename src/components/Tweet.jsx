import gabrielImg from '../assets/gabriel.png';
import style from './Tweet.module.css';

export default function Tweet(props) {
    return (
            <div className={style.tweetContainer}>
            <img className={style.avatar} src={gabrielImg} alt="Gabriel" />
            <div className={style.user}>
                <span className={style.userName}>Gabriel Coelho</span>
                <span className={style.userUserName}>@gabrielcoelho</span>
                <span className={style.date}>Há 12 horas</span>
            </div>
            <div className={style.tweetText}>
                {props.children}
                </div>
          </div>
    )
}