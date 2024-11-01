import React from 'react';
import style from './style.module.scss';
import { RxQuestionMarkCircled } from 'react-icons/rx';
import { formatDistanceToNow } from 'date-fns';

type TotalDataProps = {
    totalCoins: number | undefined;
    totalTweets: number | undefined;
    lastTweetDate: string | undefined;
};

const TotalData: React.FC<TotalDataProps> = ({ totalCoins, totalTweets, lastTweetDate }) => {
    const timeAgo = lastTweetDate ? formatDistanceToNow(new Date(lastTweetDate), { addSuffix: true }) : 'N/A';

    const totalData = [
        { label: 'Total Coins', value: totalCoins },
        { label: 'Total Tweets', value: totalTweets },
        { label: 'Last Tweet Date', value: timeAgo },
    ];

    return (
        <div className={style.totalData}>
            {totalData.map((data, index) => (
                <div className={style.total} key={index}>
                    <div className={style.titleWithIcon}>
                        <span className={style.icon}><RxQuestionMarkCircled /></span>
                        <p>{data.label}</p>
                    </div>
                    <h3>{data.value !== undefined ? data.value : 'N/A'}</h3>
                </div>
            ))}
        </div>
    );
};

export default TotalData;
