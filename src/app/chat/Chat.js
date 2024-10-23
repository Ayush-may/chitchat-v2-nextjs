"use client"
import { useEffect } from "react";
import { useSubscription, gql } from '@apollo/client';
// import { gql } from "graphql-tag"

const NOTIFICATION = gql`
  subscription {
    notification {
      uid
      username
    }
  }
`

const Chat = () => {
  const { loading, data } = useSubscription(NOTIFICATION);


  if (loading) {
    console.log(data)

    return <h1>Loading Subscription...</h1>
  }


  return (
    <div>
      {
        data && <p>Data is here</p>
      }
    </div>
  );
};

export default Chat;
