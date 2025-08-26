import gabrielImg from '../assets/gabriel.png';

export default function Tweet(props) {
    return (
            <div className={style.tweetContainer}>
            <img src={gabrielImg} alt="Gabriel" />
            <div className={style.user}>
                <span>Gabriel Coelho</span>
                <span>@gabrielcoelho</span>
                <span>Há 12 horas</span>
            </div>
            <div className={style.tweetText}>
                {props.children}
                </div>
          </div>
    )
}