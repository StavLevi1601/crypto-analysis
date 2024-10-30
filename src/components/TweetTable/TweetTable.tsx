// TweetTable.tsx
import React from "react";
import { Table } from "antd";
import { AIDetails } from "@/types";
import AIDetailsComponent from "../AIDetails/AI";

type TweetTableProps = {
    data: Array<{
        key: number;
        tokenName: string;
        tweetDate: string;
        tweet: string;
        username: string;
        aiDetails: AIDetails;
    }>;
};

const columns = [
    {
        title: "Token Name",
        dataIndex: "tokenName",
        key: "tokenName",
    },
    {
        title: "Tweet Date",
        dataIndex: "tweetDate",
        key: "tweetDate",
    },
    {
        title: "Tweet",
        dataIndex: "tweet",
        key: "tweet",
    },
    {
        title: "Username",
        dataIndex: "username",
        key: "username",
    },
    {
        title: "AI Details",
        dataIndex: "aiDetails",
        key: "aiDetails",
        render: (aiDetails: AIDetails) => <AIDetailsComponent aiDetails={aiDetails} />,
    },
];

const TweetTable: React.FC<TweetTableProps> = ({ data }) => {
    return (
        <Table
            dataSource={data}
            columns={columns}
        />
    );
};

export default TweetTable;
