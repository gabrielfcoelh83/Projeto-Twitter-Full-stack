import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import style from './Tweet.module.css';

export default function Tweet({tweet}) {
    const publishedToNew = formatDistanceToNow(new Date(tweet.date), {
        locale: ptBR,
        addSuffix: true
    });
    return (
        <div className={style.tweetContainer}>
            <img className={style.avatar} src={tweet.user.image} alt="Gabriel" />
            <div className={style.user}>
                <span className={style.userName}>{tweet.user.name}</span>
                <span className={style.userUserName}>{tweet.user.username}</span>
                <span className={style.date}>- {publishedToNew}</span>
            </div>
            <div className={style.tweetText}>
                {tweet.text}
            </div>
        </div>
    )
}